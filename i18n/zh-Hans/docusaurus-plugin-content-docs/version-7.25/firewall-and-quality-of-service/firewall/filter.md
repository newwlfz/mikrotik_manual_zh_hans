---
sidebar_key: "firewall-and-quality-of-service/firewall/filter"
sidebar_position: 3
title: "筛选"
sidebar_label: "筛选"
description: "MikroTik RouterOS 中的防火墙过滤器通过预定义的链（input、forward、output）允许或阻止流量，并可通过选项接受特定服务或丢弃恶意数据包，从而控制数据包流。IPv4 的配置通过 `/ip/firewall/filter` 完成，IPv6 的配置通过 `/ipv6/firewall/filter` 完成，文中还提供了保护路由器和 LAN 设备的示例。"
tags:
  - 'firewall'
  - 'filtering'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/firewall/filter
captured_at: '2026-11-04T11:15:47+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

防火墙过滤器用于允许或阻止转发到本地网络、源自路由器或发往路由器的特定数据包。

设置过滤有两种方法：

- 允许特定流量，并丢弃其余所有流量。
- 仅丢弃恶意流量，允许其余所有流量。

这两种方法都有优缺点；例如，从安全角度来看，第一种方法安全得多，但每当需要接受新服务的流量时，都需要管理员介入。这种策略可以很好地控制流量，并降低因服务配置错误而遭到入侵的可能性。

另一方面，在保护客户网络时，接受用户可能使用的所有服务将是一场管理噩梦。因此，在高级设置中，仔细规划防火墙至关重要。

防火墙过滤器由三个无法删除的预定义链组成：

![](/img/654f8f9e527fd6f8.webp)

- **input** - 用于处理通过某个接口**进入路由器**的数据包，其目标 IP 地址是路由器的某个地址。经过路由器的数据包不会按 input 链的规则进行处理。
- **forward** - 用于处理**经过路由器**的数据包。
- **output** - 用于处理**源自路由器**并通过某个接口离开路由器的数据包。经过路由器的数据包不会按 output 链的规则进行处理。

防火墙过滤器配置可从 IPv4 的 `/ip/firewall/filter` 菜单和 IPv6 的 `/ipv6/firewall/filter` 菜单访问。

## 防火墙示例 {#firewall-example}

我们来看一个基本的防火墙示例，用于保护路由器本身以及路由器后面的客户端，适用于 IPv4 和 IPv6 协议。

### IPv4 防火墙 {#ipv4-firewall}

#### 保护路由器本身 {#protect-the-router-itself}

设置防火墙时遵循的经验法则：

- 处理 `new` 连接以减少路由器负载。
- 接受你需要的流量。
- `drop` 其余所有流量；可以设置 `log=yes` 来记录部分攻击者，但请记住，在严重攻击时这可能会增加 CPU 负载。

我们始终先接受已知且已接受的连接，因此第一条规则应该是接受 "established" 和 "related" 连接。

```ros
/ip/firewall/filter
add action=accept chain=input comment="default configuration" connection-state=established,related
```

现在我们可以继续接受一些新连接，在我们的示例中，我们希望允许从任何地址访问 ICMP 协议，而其他所有流量只允许来自 192.168.88.2-192.168.88.254 地址范围。为此，我们创建一个地址列表和两条防火墙规则。

```ros
/ip/firewall/address-list
add address=192.168.88.2-192.168.88.254 list=allowed_to_router
/ip/firewall/filter
add action=accept chain=input src-address-list=allowed_to_router
add action=accept chain=input protocol=icmp

```

最后，我们丢弃其余所有流量：

```ros
add action=drop chain=input
```

刚刚创建的完整规则集：

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

保护用户的概念非常相似，不同之处在于这里我们阻止不需要的流量，并接受其余所有流量。

首先，我们将创建一个名为 "not\_in\_internet" 的 `address-list`，用于防火墙过滤规则：

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

- 带有 *connection-state=established,related* 的数据包会被加入 FastTrack 以获得更快的数据吞吐量，防火墙将只处理新连接。
- 丢弃 *invalid* 连接，并使用前缀 "invalid" 记录它们。
- 丢弃从本地网络尝试访问非公共地址的流量；此前已应用 *address-list=not\_in\_internet*；"bridge" 是本地网络接口；使用前缀 "!public\_from\_LAN" 记录（log=yes）这些尝试。
- 丢弃未经过 NAT 的传入数据包；ether1 是公共接口；使用 "!NAT" 前缀记录尝试。
- 跳转到 ICMP 链以丢弃不需要的 ICMP 消息。
- 丢弃来自互联网的传入数据包，这些数据包不是公共 IP 地址；ether1 是公共接口；使用前缀 "!public" 记录尝试。
- 丢弃来自 LAN 但没有 LAN IP 的数据包；192.168.88.0/24 是本地网络子网。

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

在 "icmp" 链中只允许需要的 ICMP 代码：

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

与 IPv4 设置非常相似，只是我们必须处理 IPv6 正常工作所需的更多协议。

首先，我们创建一个 `address-list`，用于允许访问设备：

```ros
/ipv6/firewall/address-list/add address=fd12:672e:6f65:8899::/64 list=allowed
```

IPv6 防火墙过滤规则简要说明：

- 处理 *new* 数据包，接受 *established/related* 数据包。
- 从 Internet（公共）接口/接口列表中丢弃 *link-local* 地址。
- 接受来自 *link-local* 地址对路由器的访问，接受用于管理目的的 *multicast* 地址，接受你的源 *address-list* 以访问路由器。
- 丢弃其余所有流量。

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
在某些使用 DHCPv6 中继的设置中，数据包的源地址可能不在 link-local 范围内。在这种情况下，必须删除或调整规则 #4 的 src-address 参数，以接受中继地址。
:::

#### 保护 LAN 设备 {#protect-the-lan-devices-1}

这一步比 IPv4 中更重要。在 IPv4 设置中，客户端大多拥有本地地址范围内的地址，并通过 NAT 转换为公共 IP，因此它们无法从公共网络直接访问。

IPv6 则是另一回事。在大多数常见设置中，启用 IPv6 会使你的客户端可从公共网络访问，因此必须使用适当的防火墙过滤规则来保护你的客户。

简而言之，非常基本的 LAN 保护应该：

- 接受 *established/related*，并处理 *new* 数据包。
- 丢弃 *invalid* 数据包。
- 接受 ICMPv6 数据包。
- 仅接受源自你的客户端到公共网络的 *new* 连接。
- 丢弃其余所有流量。

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

RAW 过滤器配置可从 IPv4 的 `/ip/firewall/raw` 菜单和 IPv6 的 `/ipv6/firewall/raw` 菜单访问。

RAW 表没有依赖连接跟踪的匹配器（例如 connection-state、layer7 等）。
如果数据包被标记为绕过连接跟踪，则不会进行数据包分片重组。

此外，RAW 防火墙只能在两个链中设置规则：

- **prerouting** - 用于处理进入路由器的任何数据包。
- **output** - 用于处理源自路由器并通过某个接口离开路由器的数据包。经过路由器的数据包不会按 output 链的规则进行处理。

### 基本 RAW 示例 {#basic-raw-example}

假设我们有 OSPF 配置，但由于连接跟踪，OSPF 出现了邻接问题。我们可以使用 RAW 规则来解决此问题，方法是不将 OSPF 数据包发送到连接跟踪。

```ros
/ip/firewall/raw
add chain=prerouting protocol=ospf action=notrack
add chain=output protocol=ospf action=notrack
```

## 阅读更多 {#read-more}

- [构建高级防火墙](../user-guides/building-advanced-firewall.md)
- [连接速率](../user-guides/connection-rate.md)
- [SSH 暴力破解防护](../user-guides/bruteforce-prevention.md)
- [Syn/DoS 防护](../user-guides/ddos-protection.md)
