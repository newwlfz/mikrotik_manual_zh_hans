---
title: "过滤器"
description: "MikroTik RouterOS 中的防火墙过滤器通过预定义链（input、forward、output）允许或阻止流量来控制数据包流，并可接受特定服务或丢弃恶意数据包。IPv4 配置通过 `/ip/firewall/filter` 完成，IPv6 配置通过 `/ipv6/firewall/filter` 完成，并提供了用于保护路由器和 LAN 设备的示例。"
tags:
  - 'firewall'
  - 'filtering'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/firewall/filter
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

防火墙过滤器用于允许或阻止转发到本地区域网络、源自路由器或发往路由器的特定数据包。

有两种设置过滤的方法：

- 允许特定流量，丢弃其他所有流量。
- 仅丢弃恶意流量，允许其他所有流量。

两种方法各有优缺点。例如，从安全角度看，第一种方法更安全，但每当需要接受新服务的流量时，都需要管理员输入。该策略可很好地控制流量，并降低因服务配置错误而导致入侵的可能性。

另一方面，在保护客户网络时，接受用户可能使用的所有服务会成为管理上的难题。因此，在高级配置中，仔细规划防火墙至关重要。

防火墙过滤器由三个无法删除的预定义链组成：

![](/img/654f8f9e527fd6f8.webp)

- **input** - 用于处理通过某个接口**进入路由器**且目的 IP 地址为路由器地址之一的数据包。通过路由器的数据包不会按 input 链规则进行处理。
- **forward** - 用于处理**通过路由器**的数据包。
- **output** - 用于处理**源自路由器**并通过某个接口离开路由器的数据包。通过路由器的数据包不会按 output 链规则进行处理。

IPv4 的防火墙过滤器配置可在 `/ip/firewall/filter` 菜单中访问，IPv6 的防火墙过滤器配置可在 `/ipv6/firewall/filter` 菜单中访问。

## 防火墙示例 {#firewall-example}

下面查看一个基础防火墙示例，用于保护路由器本身和路由器后的客户端，同时适用于 IPv4 和 IPv6 协议。

### IPv4 防火墙 {#ipv4-firewall}

#### 保护路由器本身 {#protect-the-router-itself}

配置防火墙时遵循的经验规则：

- 使用 `new` 连接，以降低路由器负载。
- 接受所需流量。
- `drop` 其他所有流量，可设置 `log=yes` 记录部分攻击者，但请注意，在遭受大量攻击时可能会增加 CPU 负载。

我们始终先接受已知且已允许的连接，因此第一条规则应接受“established”和“related”连接。

```ros
/ip/firewall/filter
add action=accept chain=input comment="default configuration" connection-state=established,related
```

接下来可以接受一些新连接。在示例中，我们希望允许任意地址访问 ICMP 协议，其他流量仅允许来自 192.168.88.2-192.168.88.254 地址范围。为此，我们创建一个地址列表和两条防火墙规则。

```ros
/ip/firewall/address-list
add address=192.168.88.2-192.168.88.254 list=allowed_to_router
/ip/firewall/filter
add action=accept chain=input src-address-list=allowed_to_router
add action=accept chain=input protocol=icmp

```

最后丢弃其他所有流量：

```ros
add action=drop chain=input
```

刚创建的完整规则集：

```ros
/ip/firewall/filter
add action=accept chain=input comment="default configuration" connection-state=established,related
add action=accept chain=input src-address-list=allowed_to_router
add action=accept chain=input protocol=icmp
add action=drop chain=input
/ip/firewall/address-list
add address=192.168.88.2-192.168.88.254 list=allowed_to_router
```

#### 保护 LAN 设备 {#protect-the-lan-devices}

保护用户的概念非常相似，只是在这种情况下，我们会阻止不需要的流量并接受其他所有流量。

首先，创建一个名为“not\_in\_internet”的 `address-list`，并将其用于防火墙过滤规则：

```ros
/ip/firewall/address-list
add address=0.0.0.0/8 comment=RFC6890 list=not_in_internet
add address=172.16.0.0/12 comment=RFC6890 list=not_in_internet
add address=192.168.0.0/16 comment=RFC6890 list=not_in_internet
add address=10.0.0.0/8 comment=RFC6890 list=not_in_internet
add address=169.254.0.0/16 comment=RFC6890 list=not_in_internet
add address=127.0.0.0/8 comment=RFC6890 list=not_in_internet
add address=224.0.0.0/4 comment=Multicast list=not_in_internet
add address=198.18.0.0/15 comment=RFC6890 list=not_in_internet
add address=192.0.0.0/24 comment=RFC6890 list=not_in_internet
add address=192.0.2.0/24 comment=RFC6890 list=not_in_internet
add address=198.51.100.0/24 comment=RFC6890 list=not_in_internet
add address=203.0.113.0/24 comment=RFC6890 list=not_in_internet
add address=100.64.0.0/10 comment=RFC6890 list=not_in_internet
add address=240.0.0.0/4 comment=RFC6890 list=not_in_internet
```

防火墙过滤规则简要说明：

- 将 *connection-state=established,related* 的数据包添加到 FastTrack，以提高数据吞吐量，防火墙仅处理新连接。
- 丢弃 *invalid* 连接，并使用前缀“invalid”记录日志。
- 丢弃从本地网络访问非公共地址的尝试，在此之前应用 *address-list=not\_in\_internet*，“bridge”是本地网络接口，使用 log=yes 记录尝试，并添加前缀“!public\_from\_LAN”。
- 丢弃未进行 NAT 的入站数据包，ether1 是公共接口，使用“!NAT”前缀记录尝试。
- 跳转到 ICMP 链，以丢弃不需要的 ICMP 消息。
- 丢弃来自 Internet 且源地址不是公共 IP 地址的入站数据包，ether1 是公共接口，使用前缀“!public”记录尝试。
- 丢弃来自 LAN 且源地址不是 LAN IP 的数据包，192.168.88.0/24 是本地网络子网。

```ros
/ip/firewall/filter
add action=fasttrack-connection chain=forward comment=FastTrack connection-state=established,related
add action=accept chain=forward comment="Established, Related" connection-state=established,related
add action=drop chain=forward comment="Drop invalid" connection-state=invalid log=yes log-prefix=invalid
add action=drop chain=forward comment="Drop tries to reach not public addresses from LAN" dst-address-list=not_in_internet in-interface=bridge log=yes log-prefix=!public_from_LAN out-interface=!bridge
add action=drop chain=forward comment="Drop incoming packets that are not NAT`ted" connection-nat-state=!dstnat connection-state=new in-interface=ether1 log=yes log-prefix=!NAT
add action=jump chain=forward protocol=icmp jump-target=icmp comment="jump to ICMP filters"
add action=drop chain=forward comment="Drop incoming from internet which is not public IP" in-interface=ether1 log=yes log-prefix=!public src-address-list=not_in_internet
add action=drop chain=forward comment="Drop packets from LAN that do not have LAN IP" in-interface=bridge log=yes log-prefix=LAN_!LAN src-address=!192.168.88.0/24
```

在“icmp”链中仅允许所需的 ICMP 代码：

```ros
/ip/firewall/filter
  add chain=icmp protocol=icmp icmp-options=0:0 action=accept \
    comment="echo reply"
  add chain=icmp protocol=icmp icmp-options=3:0 action=accept \
    comment="net unreachable"
  add chain=icmp protocol=icmp icmp-options=3:1 action=accept \
    comment="host unreachable"
  add chain=icmp protocol=icmp icmp-options=3:4 action=accept \
    comment="host unreachable fragmentation required"
  add chain=icmp protocol=icmp icmp-options=8:0 action=accept \
    comment="allow echo request"
  add chain=icmp protocol=icmp icmp-options=11:0 action=accept \
    comment="allow time exceed"
  add chain=icmp protocol=icmp icmp-options=12:0 action=accept \
    comment="allow parameter bad"
  add chain=icmp action=drop comment="deny all other types"
```

### IPv6 防火墙 {#ipv6-firewall}

#### 保护路由器本身 {#protect-the-router-itself-1}

与 IPv4 设置非常相似，不同之处在于需要处理 IPv6 正常运行所需的更多协议。

首先，创建一个允许访问设备的 `address-list`：

```ros
/ipv6/firewall/address-list/add address=fd12:672e:6f65:8899::/64 list=allowed
```

IPv6 防火墙过滤规则简要说明：

- 处理 *new* 数据包，接受 *established/related* 数据包。
- 在 Internet（公共）接口/接口列表中丢弃 *link-local* 地址。
- 允许来自 *link-local* 地址访问路由器，接受用于管理的 *multicast* 地址，接受用于路由器访问的源 *address-list*。
- 丢弃其他所有流量。

```ros
/ipv6/firewall/filter
add action=accept chain=input comment="allow established and related" connection-state=established,related
add chain=input action=accept protocol=icmpv6 comment="accept ICMPv6"
add chain=input action=accept protocol=udp port=33434-33534 comment="defconf: accept UDP traceroute"
add chain=input action=accept protocol=udp dst-port=546 src-address=fe80::/10 comment="accept DHCPv6-Client prefix delegation."
add action=drop chain=input in-interface=in_interface_name log=yes log-prefix=dropLL_from_public src-address=fe80::/10
add action=accept chain=input comment="allow allowed addresses" src-address-list=allowed
add action=drop chain=input
/ipv6/firewall/address-list
add address=fe80::/10 list=allowed
add address=xxxx::/48 list=allowed
add address=ff02::/16 comment=multicast list=allowed
```

:::warning
在使用 DHCPv6 中继的某些配置中，数据包的 src 地址可能不来自 link-local 范围。在这种情况下，必须移除或调整规则 #4 的 src-address 参数，以接受中继地址。
:::

#### 保护 LAN 设备 {#protect-the-lan-devices-1}

这一步比 IPv4 中更重要。在 IPv4 配置中，客户端通常使用本地地址段中的地址，并通过 NAT 转换为公网 IP，因此它们无法从公共网络直接访问。

IPv6 则不同。在最常见的配置中，启用 IPv6 会使客户端可从公共网络访问，因此必须使用适当的防火墙过滤规则来保护客户。

简而言之，非常基础的 LAN 保护应：

- 接受 *established/related* 数据包，并处理 *new* 数据包。
- 丢弃 *invalid* 数据包。
- 接受 ICMPv6 数据包。
- 接受仅由客户端发往公共网络的 *new* 连接。
- 丢弃其他所有数据包。

```ros
/ipv6/firewall/filter
add action=accept chain=forward comment=established,related connection-state=established,related
add action=drop chain=forward comment=invalid connection-state=invalid log=yes log-prefix=ipv6,invalid
add action=accept chain=forward comment=icmpv6 in-interface=!in_interface_name protocol=icmpv6
add action=accept chain=forward comment="local network" in-interface=!in_interface_name src-address-list=allowed
add action=drop chain=forward log-prefix=IPV6
```

## RAW 过滤 {#raw-filtering}

防火墙 RAW 表允许在连接跟踪之前有选择地绕过或丢弃数据包，从而显著降低 CPU 负载。该工具对于缓解 DoS/DDoS 攻击非常有用。

RAW 过滤配置可通过 IPv4 的 `/ip/firewall/raw` 菜单和 IPv6 的 `/ipv6/firewall/raw` 菜单访问。

RAW 表没有依赖连接跟踪的匹配器（如 connection-state、layer7 等）。
如果数据包被标记为绕过连接跟踪，则不会进行数据包分片重组。

RAW 防火墙也只能在两个链中包含规则：

- **prerouting** - 用于处理进入路由器的任何数据包。
- **output** - 用于处理源自路由器并通过某个接口离开的数据包。通过路由器转发的数据包不会按 output 链的规则进行处理。

### 基本 RAW 示例 {#basic-raw-example}

假设我们已配置 OSPF，但由于连接跟踪导致 OSPF 邻接出现问题。可以使用 RAW 规则解决此问题，方法是不将 OSPF 数据包发送到连接跟踪。

```ros
/ip/firewall/raw
add chain=prerouting protocol=ospf action=notrack
add chain=output protocol=ospf action=notrack
```

## 延伸阅读 {#read-more}

- [Building advanced firewall](/docs/firewall-and-quality-of-service/user-guides/building-advanced-firewall)
- [Connection Rate](/docs/firewall-and-quality-of-service/user-guides/connection-rate)
- [SSH brute-force protection](/docs/firewall-and-quality-of-service/user-guides/bruteforce-prevention)
- [Syn/DoS protection](/docs/firewall-and-quality-of-service/user-guides/ddos-protection)
