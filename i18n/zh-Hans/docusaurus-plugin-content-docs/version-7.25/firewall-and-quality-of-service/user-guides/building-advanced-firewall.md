---
sidebar_key: "firewall-and-quality-of-service/user-guides/building-advanced-firewall"
sidebar_position: 2
title: "构建高级防火墙"
sidebar_label: "构建高级防火墙"
description: "本页介绍如何在 MikroTik RouterOS 上构建高级防火墙：配置接口列表、IPv4 和 IPv6 过滤规则，在接受 ICMP/DHCPv6 的同时阻止无效地址，并管理 WAN 与 LAN 接口之间的流量。"
tags:
  - 'firewall'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/user-guides/building-advanced-firewall
captured_at: '2026-11-04T11:17:19+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

基于我们目前讨论的所有内容，现在来构建一个高级防火墙。在本示例中，我们将实现尽可能多的防火墙功能，以演示它们如何工作以及何时应正确使用它们。

大部分过滤将在 RAW 防火墙中处理。标准防火墙配置通常只包含一组基本规则，用于接受 established、related 和 untracked 连接，同时丢弃所有并非源自 LAN 接口的其他内容，从而为路由器提供全面保护。

### 接口列表 {#interface-lists}

定义了两个接口列表：**WAN** 和 **LAN**。这些列表根据接口的网络角色对其进行分组，从而简化未来的管理。WAN 列表包含连接到全球互联网的接口，例如本配置中的 *ether1*。LAN 列表包含本地网络接口，例如 bridge 接口。

```ros
/interface/list
  add comment=defconf name=WAN
  add comment=defconf name=LAN
/interface/list/member
  add comment=defconf interface=bridge list=LAN
  add comment=defconf interface=ether1 list=WAN
```

此配置将 bridge 接口分配到 LAN 列表，将 ether1 分配到 WAN 列表，从而能够跨这些接口组一致地应用防火墙规则。

### 保护设备 {#protect-the-device}

这里的主要目标是仅允许从 LAN 访问路由器，并丢弃其他所有内容。

请注意，这里也接受 ICMP；它用于接受已通过 RAW 规则的 ICMP 数据包。

```ros
/ip/firewall/filter
  add action=accept chain=input comment="defconf: accept ICMP after RAW" protocol=icmp
  add action=accept chain=input comment="defconf: accept established,related,untracked" connection-state=established,related,untracked
  add action=drop chain=input comment="defconf: drop all not coming from LAN" in-interface-list=!LAN
```

IPv6 部分稍微复杂一些，此外，按照 RFC 建议，还接受 UDP traceroute、DHCPv6 客户端 PD 和 IPSec（IKE、AH、ESP）。

```ros
/ipv6/firewall/filter
add action=accept chain=input comment="defconf: accept ICMPv6 after RAW" protocol=icmpv6
add action=accept chain=input comment="defconf: accept established,related,untracked" connection-state=established,related,untracked
add action=accept chain=input comment="defconf: accept UDP traceroute" dst-port=33434-33534 protocol=udp 
add action=accept chain=input comment="defconf: accept DHCPv6-Client prefix delegation." dst-port=546 protocol=udp src-address=fe80::/10
add action=accept chain=input comment="defconf: accept IKE" dst-port=500,4500 protocol=udp
add action=accept chain=input comment="defconf: accept IPSec AH" protocol=ipsec-ah
add action=accept chain=input comment="defconf: accept IPSec ESP" protocol=ipsec-esp
add action=drop chain=input comment="defconf: drop all not coming from LAN" in-interface-list=!LAN
```

:::warning
在某些使用 DHCPv6 中继的设置中，数据包的源地址可能不在 link-local 范围内。在这种情况下，必须删除或调整规则 #4 的 src-address 参数，以接受中继地址。
:::

### 保护客户端 {#protect-the-clients}

在配置防火墙规则集之前，请创建一个地址列表，其中包含所有不应被转发的 IPv4 和 IPv6 地址。此列表可防止无效或保留地址通过您的网络进行路由。

请注意，此列表中包含一个组播地址范围。由于大多数网络通常不使用组播，因此此条目默认会阻止组播流量。如果您的网络需要组播转发，请禁用此地址列表条目。

```ros
/ip/firewall/address-list
  add address=0.0.0.0/8 comment="defconf: RFC6890" list=no_forward_ipv4
  add address=169.254.0.0/16 comment="defconf: RFC6890" list=no_forward_ipv4
  add address=224.0.0.0/4 comment="defconf: multicast" list=no_forward_ipv4
  add address=255.255.255.255/32 comment="defconf: RFC6890" list=no_forward_ipv4
```

对于 IPv6，应用相同的原则：如果需要组播转发，请禁用地址列表中的组播条目。

```ros
/ipv6/firewall/address-list
  add address=fe80::/10  comment="defconf: RFC6890 Link-Scoped Unicast" list=no_forward_ipv6
  add address=ff00::/8  comment="defconf: multicast" list=no_forward_ipv6
```

Forward 链包含的规则比 Input 链更多，并执行以下操作：

- 接受 established、related 和 untracked 连接
- 对 established 和 related 连接进行 FastTrack（仅 IPv4）
- 丢弃 invalid 连接状态
- 丢弃不应被路由的错误转发 IP 地址
- 丢弃从互联网（WAN 侧）发起且未被目标 NAT 的连接尝试
- 丢弃不应被转发的 bogon IP 地址

此配置会丢弃所有未被目标 NAT 的 IPv4 数据包，以在外部攻击者知道您的内部 LAN 网络范围时保护客户端设备免受直接攻击。虽然此规则通常不必要，因为 RAW 过滤已经丢弃了这些数据包，但它在 RAW 规则配置被意外修改时提供了额外的安全层。

```ros
/ip/firewall/filter
  add action=accept chain=forward comment="defconf: accept all that matches IPSec policy" ipsec-policy=in,ipsec disabled=yes
  add action=fasttrack-connection chain=forward comment="defconf: fasttrack" connection-state=established,related
  add action=accept chain=forward comment="defconf: accept established,related, untracked" connection-state=established,related,untracked
  add action=drop chain=forward comment="defconf: drop invalid" connection-state=invalid
  add action=drop chain=forward comment="defconf:  drop all from WAN not DSTNATed" connection-nat-state=!dstnat connection-state=new in-interface-list=WAN
  add action=drop chain=forward src-address-list=no_forward_ipv4 comment="defconf: drop bad forward IPs"
  add action=drop chain=forward dst-address-list=no_forward_ipv4 comment="defconf: drop bad forward IPs"
```

IPv6 Forward 链遵循类似的结构，并增加了按照 RFC 标准建议接受 IPsec 和 HIP 协议的规则。hop-limit 为 1 的 ICMPv6 数据包会被丢弃。

```ros
/ipv6/firewall/filter
add action=accept chain=forward comment="defconf: accept established,related,untracked" connection-state=established,related,untracked
add action=drop chain=forward comment="defconf: drop invalid" connection-state=invalid
add action=drop chain=forward src-address-list=no_forward_ipv6 comment="defconf: drop bad forward IPs"
add action=drop chain=forward dst-address-list=no_forward_ipv6 comment="defconf: drop bad forward IPs"
add action=drop chain=forward comment="defconf: rfc4890 drop hop-limit=1" hop-limit=equal:1 protocol=icmpv6
add action=accept chain=forward comment="defconf: accept ICMPv6 after RAW" protocol=icmpv6
add action=accept chain=forward comment="defconf: accept HIP" protocol=139
add action=accept chain=forward comment="defconf: accept IKE" protocol=udp dst-port=500,4500
add action=accept chain=forward comment="defconf: accept AH" protocol=ipsec-ah
add action=accept chain=forward comment="defconf: accept ESP" protocol=ipsec-esp
add action=accept chain=forward comment="defconf: accept all that matches IPSec policy" ipsec-policy=in,ipsec
add action=drop chain=forward comment="defconf: drop everything else not coming from LAN" in-interface-list=!LAN
```

请注意 IPsec 策略匹配规则。关键是 IPsec 封装流量必须绕过 FastTrack 连接功能。因此，包含了一条已禁用的规则，用于接受匹配 IPsec 策略的流量。每当路由器上使用 IPsec 隧道时，请启用此规则。IPv6 不需要考虑这一点，因为它不支持 FastTrack。

处理 IPsec 流量的另一种方法是添加 RAW 规则，这将在本文档的 RAW 部分中介绍。

### 伪装本地网络 {#masquerade-local-network}

为了让路由器后面的本地设备能够访问互联网，必须对本地网络进行伪装。在大多数情况下，建议使用 src-nat 而不是 masquerade，但是，在 WAN 地址为动态地址的情况下，这是唯一的选择。

```ros
/ip/firewall/nat
  add action=accept chain=srcnat comment="defconf: accept all that matches IPSec policy" ipsec-policy=out,ipsec disabled=yes
  add action=masquerade chain=srcnat comment="defconf: masquerade" out-interface-list=WAN
```

请注意这条已禁用的策略匹配规则，与防火墙过滤器中相同，必须将 IPSec 流量排除在 NAT 之外（除非在特定场景中，IPsec 策略配置为匹配经过 NAT 的地址）。因此，每当路由器上使用 IPsec 隧道时，都必须启用此规则。

## RAW 过滤 {#raw-filtering}

### IPv4 地址列表 {#ipv4-address-lists}

在设置 RAW 规则之前，让我们创建一些过滤策略所需的地址列表。将以 RFC 6890 作为参考。

首先，*address-list* 包含所有不能用作 src/dst/转发等的 IPv4 地址（如果看到此类地址，将立即丢弃）

```ros
/ip/firewall/address-list
  add address=127.0.0.0/8 comment="defconf: RFC6890" list=bad_ipv4
  add address=192.0.0.0/24 comment="defconf: RFC6890" list=bad_ipv4
  add address=192.0.2.0/24 comment="defconf: RFC6890 documentation" list=bad_ipv4
  add address=198.51.100.0/24 comment="defconf: RFC6890 documentation" list=bad_ipv4
  add address=203.0.113.0/24 comment="defconf: RFC6890 documentation" list=bad_ipv4
  add address=240.0.0.0/4 comment="defconf: RFC6890 reserved" list=bad_ipv4
```

另一个地址列表包含所有无法在全球范围内路由的 IPv4 地址。

```ros
/ip/firewall/address-list
  add address=0.0.0.0/8 comment="defconf: RFC6890" list=not_global_ipv4
  add address=10.0.0.0/8 comment="defconf: RFC6890" list=not_global_ipv4
  add address=100.64.0.0/10 comment="defconf: RFC6890" list=not_global_ipv4
  add address=169.254.0.0/16 comment="defconf: RFC6890" list=not_global_ipv4
  add address=172.16.0.0/12 comment="defconf: RFC6890" list=not_global_ipv4
  add address=192.0.0.0/29 comment="defconf: RFC6890" list=not_global_ipv4
  add address=192.168.0.0/16 comment="defconf: RFC6890" list=not_global_ipv4
  add address=198.18.0.0/15 comment="defconf: RFC6890 benchmark" list=not_global_ipv4
  add address=255.255.255.255/32 comment="defconf: RFC6890" list=not_global_ipv4
```

最后两个地址列表用于不能用作目标地址或源地址的地址。

```ros
/ip/firewall/address-list
  add address=224.0.0.0/4 comment="defconf: multicast" list=bad_src_ipv4
  add address=255.255.255.255/32 comment="defconf: RFC6890" list=bad_src_ipv4
  add address=0.0.0.0/8 comment="defconf: RFC6890" list=bad_dst_ipv4
  add address=224.0.0.0/4 comment="defconf: RFC6890" list=bad_dst_ipv4
```

### IPv4 RAW 规则 {#ipv4-raw-rules}

RAW IPv4 规则将执行以下操作：

- **添加禁用的 "accept" 规则** - 可用于快速禁用 RAW 过滤，而无需禁用所有 RAW 规则。
- **接受** DHCP 发现 - 大多数 DHCP 数据包不会被 IP 防火墙看到，但其中一些会，因此请确保它们被接受。
- **丢弃**使用 bogon IP 的数据包。
- **丢弃**来自无效 SRC 和 DST IP 的数据包。
- **丢弃**来自 WAN 的全局不可路由 IP。
- **丢弃**来自 LAN 且源地址不等于 192.168.88.0/24（默认 IP 范围）的数据包。
- **丢弃**从 WAN 发来并要转发到 192.168.88.0/24 网络的数据包；如果攻击者知道内部网络，这将提供保护。
- **丢弃**错误的 ICMP、UDP 和 TCP。
- **接受**来自 WAN 和 LAN 的所有其他内容。
- **接受**路由器接口之间的本地流量。
- **丢弃**所有其他内容，以确保任何新添加的接口（例如到服务提供商的 PPPoE 连接）都受到保护，避免意外错误配置。

```ros
/ip/firewall/raw
add action=accept chain=prerouting comment="defconf: enable for transparent firewall" disabled=yes
add action=accept chain=prerouting comment="defconf: accept DHCP discover" dst-address=255.255.255.255 dst-port=67 in-interface-list=LAN protocol=udp src-address=0.0.0.0 src-port=68
add action=drop chain=prerouting comment="defconf: drop bogon IP's" src-address-list=bad_ipv4
add action=drop chain=prerouting comment="defconf: drop bogon IP's" dst-address-list=bad_ipv4
add action=drop chain=prerouting comment="defconf: drop bogon IP's" src-address-list=bad_src_ipv4
add action=drop chain=prerouting comment="defconf: drop bogon IP's" dst-address-list=bad_dst_ipv4
add action=drop chain=prerouting comment="defconf: drop non global from WAN" src-address-list=not_global_ipv4 in-interface-list=WAN
add action=drop chain=prerouting comment="defconf: drop forward to local lan from WAN" in-interface-list=WAN dst-address=192.168.88.0/24
add action=drop chain=prerouting comment="defconf: drop local if not from default IP range" in-interface-list=LAN src-address=!192.168.88.0/24
add action=drop chain=prerouting comment="defconf: drop bad UDP" port=0 protocol=udp
add action=jump chain=prerouting comment="defconf: jump to ICMP chain" jump-target=icmp4 protocol=icmp
add action=jump chain=prerouting comment="defconf: jump to TCP chain" jump-target=bad_tcp protocol=tcp
add action=accept chain=prerouting comment="defconf: accept everything else from LAN" in-interface-list=LAN
add action=accept chain=prerouting comment="defconf: accept everything else from WAN" in-interface-list=WAN
add action=accept chain=prerouting comment="defconf: accept local traffic between router interfaces" src-address-type=local
add action=drop chain=prerouting comment="defconf: drop the rest"
```

请注意，我们使用了一些可选链，第一个 **TCP** 链用于丢弃已知为 *invalid* 的 **TCP** 数据包。

```ros
/ip/firewall/raw
add action=drop chain=bad_tcp comment="defconf: TCP flag filter" protocol=tcp tcp-flags=!fin,!syn,!rst,!ack
add action=drop chain=bad_tcp comment=defconf protocol=tcp tcp-flags=fin,syn
add action=drop chain=bad_tcp comment=defconf protocol=tcp tcp-flags=fin,rst
add action=drop chain=bad_tcp comment=defconf protocol=tcp tcp-flags=fin,!ack
add action=drop chain=bad_tcp comment=defconf protocol=tcp tcp-flags=fin,urg
add action=drop chain=bad_tcp comment=defconf protocol=tcp tcp-flags=syn,rst
add action=drop chain=bad_tcp comment=defconf protocol=tcp tcp-flags=rst,urg
add action=drop chain=bad_tcp comment="defconf: TCP port 0 drop" port=0 protocol=tcp
```

另一个链用于 **ICMP**。请注意，如果你想要非常严格的防火墙，则可以使用这种严格的 **ICMP** 过滤，但在大多数情况下，这没有必要，只会增加路由器 CPU 的负载。大多数情况下，ICMP 速率限制也没有必要，因为 Linux 内核已经将 ICMP 数据包限制为 100pps。

```ros
/ip/firewall/raw
add action=accept chain=icmp4 comment="defconf: echo reply" icmp-options=0:0 limit=5,10:packet protocol=icmp
add action=accept chain=icmp4 comment="defconf: net unreachable" icmp-options=3:0 protocol=icmp
add action=accept chain=icmp4 comment="defconf: host unreachable" icmp-options=3:1 protocol=icmp
add action=accept chain=icmp4 comment="defconf: protocol unreachable" icmp-options=3:2 protocol=icmp
add action=accept chain=icmp4 comment="defconf: port unreachable" icmp-options=3:3 protocol=icmp
add action=accept chain=icmp4 comment="defconf: fragmentation needed" icmp-options=3:4 protocol=icmp
add action=accept chain=icmp4 comment="defconf: echo" icmp-options=8:0 limit=5,10:packet protocol=icmp
add action=accept chain=icmp4 comment="defconf: time exceeded " icmp-options=11:0-255 protocol=icmp
add action=drop chain=icmp4 comment="defconf: drop other icmp" protocol=icmp
```

### IPv6 地址列表 {#ipv6-address-lists}

#### 应立即丢弃的 IPv6 地址列表 {#list-of-ipv6-addresses-that-should-be-dropped-instantly}

```ros
/ipv6/firewall/address-list
add address=::1/128 comment="defconf: RFC6890 lo" list=bad_ipv6
add address=::ffff:0:0/96 comment="defconf: RFC6890 IPv4 mapped" list=bad_ipv6
add address=2001::/23 comment="defconf: RFC6890" list=bad_ipv6
add address=2001:db8::/32 comment="defconf: RFC6890 documentation" list=bad_ipv6
add address=2001:10::/28 comment="defconf: RFC6890 orchid" list=bad_ipv6
add address=::/96 comment="defconf: ipv4 compat" list=bad_ipv6
```

#### 全局不可路由的 IPv6 地址列表 {#list-of-ipv6-addresses-that-are-not-globally-routable}

```ros
/ipv6/firewall/address-list
add address=100::/64 comment="defconf: RFC6890 Discard-only" list=not_global_ipv6
add address=2001::/32 comment="defconf: RFC6890 TEREDO" list=not_global_ipv6
add address=2001:2::/48 comment="defconf: RFC6890 Benchmark" list=not_global_ipv6
add address=fc00::/7 comment="defconf: RFC6890 Unique-Local" list=not_global_ipv6
```

#### 作为无效目标地址的地址列表 {#list-of-addresses-as-an-invalid-destination-address}

```ros
/ipv6/firewall/address-list/add address=::/128 comment="defconf: unspecified" list=bad_dst_ipv6
```

#### 作为无效源地址的地址列表 {#list-of-addresses-as-an-invalid-source-address}

```ros
/ipv6/firewall/address-list
  add address=::/128 comment="defconf: unspecified" list=bad_src_ipv6
  add address=ff00::/8  comment="defconf: multicast" list=bad_src_ipv6
```

### IPv6 RAW 规则 {#ipv6-raw-rules}

RAW IPv6 规则将执行以下操作：

- **添加一条禁用的 accept 规则** - 可用于快速禁用 RAW 过滤，而无需禁用所有 RAW 规则。
- **丢弃**使用 bogon IP 的数据包。
- **丢弃**来自无效 SRC 和 DST IP 的数据包。
- **丢弃**来自 WAN 的全局不可路由 IP。
- **丢弃**错误的 ICMP。
- **接受**来自 WAN 和 LAN 的所有其他内容。
- **丢弃**所有其他内容，以确保任何新添加的接口（例如到服务提供商的 PPPoE 连接）都受到保护，避免意外错误配置。

```ros
/ipv6/firewall/raw
add action=accept chain=prerouting comment="defconf: enable for transparent firewall" disabled=yes
add action=accept chain=prerouting comment="defconf: RFC4291, section 2.7.1" src-address=::/128 dst-address=ff02:0:0:0:0:1:ff00::/104 icmp-options=135 protocol=icmpv6
add action=drop chain=prerouting comment="defconf: drop bogon IP's" src-address-list=bad_ipv6
add action=drop chain=prerouting comment="defconf: drop bogon IP's" dst-address-list=bad_ipv6
add action=drop chain=prerouting comment="defconf: drop packets with bad SRC ipv6" src-address-list=bad_src_ipv6
add action=drop chain=prerouting comment="defconf: drop packets with bad dst ipv6" dst-address-list=bad_dst_ipv6
add action=drop chain=prerouting comment="defconf: drop non global from WAN" src-address-list=not_global_ipv6 in-interface-list=WAN
add action=jump chain=prerouting comment="defconf: jump to ICMPv6 chain" jump-target=icmp6 protocol=icmpv6
add action=accept chain=prerouting comment="defconf: accept local multicast scope" dst-address=ff02::/16
add action=drop chain=prerouting comment="defconf: drop other multicast destinations" dst-address=ff00::/8
add action=accept chain=prerouting comment="defconf: accept everything else from WAN" in-interface-list=WAN
add action=accept chain=prerouting comment="defconf: accept everything else from LAN" in-interface-list=LAN
add action=drop chain=prerouting comment="defconf: drop the rest"
```

请注意，使用了可选的 **ICMP** 链。如果你想要非常严格的防火墙，则可以使用这种严格的 **ICMP** 过滤，但在大多数情况下，这没有必要，只会增加路由器 CPU 的负载。大多数情况下，ICMP 速率限制也没有必要，因为 Linux 内核已经将 ICMP 数据包限制为 100pps。

```ros
/ipv6/firewall/raw
# 请注意，不同的操作系统发出的数据包具有不同的默认 TTL 值
add action=drop chain=icmp6 comment="defconf: rfc4890 drop ll if hop-limit!=255" dst-address=fe80::/10 hop-limit=not-equal:255 protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: dst unreachable" icmp-options=1:0-255 protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: packet too big" icmp-options=2:0-255 protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: limit exceeded" icmp-options=3:0-1 protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: bad header" icmp-options=4:0-2 protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: Mobile home agent address discovery" icmp-options=144:0-255 protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: Mobile home agent address discovery" icmp-options=145:0-255 protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: Mobile prefix solic" icmp-options=146:0-255 protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: Mobile prefix advert" icmp-options=147:0-255 protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: echo request limit 5,10" icmp-options=128:0-255 limit=5,10:packet protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: echo reply limit 5,10" icmp-options=129:0-255 limit=5,10:packet protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: rfc4890 router solic limit 5,10 only LAN" hop-limit=equal:255 icmp-options=133:0-255 in-interface-list=LAN limit=5,10:packet protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: rfc4890 router advert limit 5,10 only LAN" hop-limit=equal:255 icmp-options=134:0-255 in-interface-list=LAN limit=5,10:packet protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: rfc4890 neighbor solic limit 5,10 only LAN" hop-limit=equal:255 icmp-options=135:0-255 in-interface-list=LAN limit=5,10:packet protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: rfc4890 neighbor advert limit 5,10 only LAN" hop-limit=equal:255 icmp-options=136:0-255 in-interface-list=LAN limit=5,10:packet protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: rfc4890 inverse ND solic limit 5,10 only LAN" hop-limit=equal:255 icmp-options=141:0-255 in-interface-list=LAN limit=5,10:packet protocol=icmpv6
add action=accept chain=icmp6 comment="defconf: rfc4890 inverse ND advert limit 5,10 only LAN" hop-limit=equal:255 icmp-options=142:0-255 in-interface-list=LAN limit=5,10:packet protocol=icmpv6
add action=drop chain=icmp6 comment="defconf: drop other icmp" protocol=icmpv6

```
