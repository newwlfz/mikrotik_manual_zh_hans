---
sidebar_key: "firewall-and-quality-of-service/firewall/raw"
sidebar_position: 7
title: "RAW"
sidebar_label: 'RAW'
description: 'The RAW firewall table in RouterOS processes packets before connection tracking. Use it to drop unwanted packets early, or to exclude traffic from connection tracking with action=notrack.'
tags:
  - 'firewall'
  - 'raw'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/firewall/raw
---

防火墙 RAW 表在连接跟踪之前处理数据包。它有两种用途：

- 在连接跟踪以及 mangle、NAT 和 filter 规则处理这些数据包之前，丢弃不需要的数据包。
- 使用 `action=notrack` 将流量排除在连接跟踪之外。

在这两种情况下，路由器都不会为该数据包创建连接跟踪条目。

IPv4 的 RAW 规则位于 `/ip/firewall/raw`，IPv6 的 RAW 规则位于 `/ipv6/firewall/raw`。该表有两个内置链：

- **prerouting** - 进入路由器的每个数据包，包括发往路由器本身的数据包和经过路由器的数据包。
- **output** - 路由器自身发送的数据包。

RAW 规则是无状态的：规则单独查看每个数据包，并不知道该数据包属于哪个连接。

## 在连接跟踪之前丢弃不需要的流量

丢弃从互联网到达且源地址在互联网上始终无效的数据包。`WAN` 是默认配置中包含互联网端口的接口列表：

```ros
/ip/firewall/address-list
add list=bad_src address=0.0.0.0/8 comment="This network"
add list=bad_src address=127.0.0.0/8 comment="Loopback"
add list=bad_src address=224.0.0.0/4 comment="Multicast"
add list=bad_src address=240.0.0.0/4 comment="Reserved"
/ip/firewall/raw
add chain=prerouting action=drop in-interface-list=WAN \
    src-address-list=bad_src comment="Drop invalid source addresses"
```

该规则会在路由器为其创建连接跟踪条目之前，丢弃来自这些地址并经 WAN 到达的每个数据包。由于该规则是无状态的，因此它还会丢弃你自己的主机向这些地址发起的连接所对应的回复。只将绝不应到达你的地址放入列表。有关如何维护列表，请参阅[地址列表](/docs/firewall-and-quality-of-service/firewall/address-lists)。

要检查该规则是否生效，请查看其计数器：

```ros
[admin@MikroTik] > /ip/firewall/raw/print stats
Flags: D - DYNAMIC
Columns: CHAIN, ACTION, BYTES, PACKETS
#   CHAIN       ACTION       BYTES  PACKETS
;;; special dummy rule to show fasttrack counters
0 D prerouting  passthrough      0        0
;;; Drop invalid source addresses
1   prerouting  drop           168        3
```

顶部的动态规则属于 [FastTrack](/docs/firewall-and-quality-of-service/packet-flow-in-routeros#fasttrack)。要将计数器重置为零，请使用 `/ip/firewall/raw/reset-counters-all`。

要检测并丢弃针对单一目标的洪水攻击，请参阅 [DDoS 防护](/docs/firewall-and-quality-of-service/user-guides/ddos-protection)。

## 从连接跟踪中排除流量

在两个本地网络之间进行路由的路由器，只要该流量不应用 NAT 和有状态过滤，就无需对该流量进行连接跟踪。在本示例中，网络为 192.168.88.0/24 和 192.168.99.0/24。

本示例适用于不对该流量进行 FastTrack 的路由器，例如，因为你移除了 FastTrack 规则以便在该路由器上使用队列。默认配置包含一条针对已建立连接的 FastTrack 规则，而 FastTrack 规则不匹配未跟踪的数据包，因此在默认配置中，以下规则会使该流量不经过 FastTrack。

一个连接在两个方向上都有数据包，因此请为每个方向各添加一条规则：

```ros
/ip/firewall/raw
add chain=prerouting action=notrack src-address=192.168.88.0/24 \
    dst-address=192.168.99.0/24 comment="Do not track LAN to LAN"
add chain=prerouting action=notrack src-address=192.168.99.0/24 \
    dst-address=192.168.88.0/24 comment="Do not track LAN to LAN"
```

匹配 `action=notrack` 的数据包会继续经过剩余的 RAW 规则，并经过 mangle 和 filter 规则，但路由器不会在 `/ip/firewall/connection` 中为它们创建条目。在 mangle 和 filter 中，它们的连接状态为 `untracked`。

filter 规则必须接受 untracked 数据包。默认配置会这样做：其在 input 和 forward 链中接受 established 和 related 连接的规则也列出了 `untracked`。检查防火墙：

```ros
[admin@MikroTik] > /ip/firewall/filter/print where connection-state~"untracked"
0  ;;; defconf: accept established,related,untracked
   chain=input action=accept connection-state=established,related,untracked

1  ;;; defconf: accept established,related, untracked
   chain=forward action=accept connection-state=established,related,untracked
```

如果你的规则只接受 established 和 related 连接，请将 `untracked` 添加到这些规则中：

```ros
/ip/firewall/filter
set [find action=accept connection-state="established,related"] \
    connection-state=established,related,untracked
```

要检查流量是否不再被跟踪，请从另一个网络对 192.168.88.0/24 中的主机执行五次 ping。ping 之后立即统计两个网络之间的连接条目：

```ros
/ip/firewall/connection/print count-only \
    where src-address~"^192.168.99\\." and dst-address~"^192.168.88\\."
```

该命令输出 `0`。如果没有 `notrack` 规则，同样的 ping 会留下一个条目，该条目会在最后一个数据包之后 10 秒过期。计数器不依赖时序，而 `notrack` 规则会显示每个方向的五个数据包：

```ros
[admin@MikroTik] > /ip/firewall/raw/print stats
Flags: D - DYNAMIC
Columns: CHAIN, ACTION, BYTES, PACKETS
#   CHAIN       ACTION       BYTES  PACKETS
;;; special dummy rule to show fasttrack counters
0 D prerouting  passthrough      0        0
;;; Drop invalid source addresses
1   prerouting  drop           168        3
;;; Do not track LAN to LAN
2   prerouting  notrack        280        5
;;; Do not track LAN to LAN
3   prerouting  notrack        280        5
```

:::warning
untracked 数据包没有连接，因此所有依赖连接的内容都不适用于它们：

- NAT 规则不会处理它们。不要对需要源 NAT 或目标 NAT 的流量使用 `notrack`，例如通过 masquerade 规则离开的流量。
- 读取连接条目的匹配器（例如 `connection-mark`）不会匹配它们，`action=mark-connection` 对它们也没有效果。`connection-state=untracked` 会匹配它们。
:::

添加规则时已打开的连接会继续工作。从那时起，它们的数据包处于 untracked 状态，旧条目会保留在连接表中，直到超时。添加规则期间，防火墙可能会将这些连接中的少量数据包视为无效数据包丢弃。

### 排除某个服务

当仅排除某个服务而不是整个网络时，处理回复的规则必须匹配服务器的源地址和源端口。例如，排除服务器 192.168.88.2 使用 UDP 的 DNS 流量：

```ros
/ip/firewall/raw
add chain=prerouting action=notrack protocol=udp dst-port=53 \
    dst-address=192.168.88.2 comment="Do not track DNS queries"
add chain=prerouting action=notrack protocol=udp src-port=53 \
    src-address=192.168.88.2 comment="Do not track DNS replies"
```

要检查规则，从另一网络通过该服务器解析域名，并查看计数器。每条规则统计一个数据包：

```ros
[admin@MikroTik] > /ip/firewall/raw/print stats where comment~"DNS"
Columns: CHAIN, ACTION, BYTES, PACKETS
# CHAIN       ACTION   BYTES  PACKETS
;;; Do not track DNS queries
2 prerouting  notrack     54        1
;;; Do not track DNS replies
3 prerouting  notrack     70        1
```

如果没有第二条规则，回复仍会被跟踪。连接跟踪没有看到该查询，因此会把 UDP 回复视为从服务器到客户端的新连接，并为其创建条目。对于 TCP 服务，连接跟踪会把回复视为无效，默认防火墙会将其丢弃。

当服务运行在路由器本身上时，回复不会经过 prerouting 链。将处理回复的规则放在 output 链中。在本示例中，路由器的地址为 192.168.88.1：

```ros
/ip/firewall/raw
add chain=prerouting action=notrack protocol=udp dst-port=53 \
    dst-address=192.168.88.1 comment="Do not track DNS to the router"
add chain=output action=notrack protocol=udp src-port=53 \
    src-address=192.168.88.1 comment="Do not track DNS from the router"
```

## 在链中分组规则

可以将规则分组到自定义链中。使用新链名添加第一条规则时，RouterOS 会创建一条链。数据包通过带 `action=jump` 的规则进入该链。它会通过 `action=return` 返回到调用链的下一条规则，或在到达该链末尾时返回。没有跳转规则指向的链中的规则不会被处理。

让来自互联网的 UDP 数据包经过一条链，该链会丢弃常被滥用于放大攻击的服务的回复：Chargen（端口 19）、SSDP（端口 1900）和 Memcached（端口 11211）。来自 `trusted` 列表中地址的数据包会跳过检查：

```ros
/ip/firewall/address-list
add list=trusted address=198.51.100.20 comment="Office router"
/ip/firewall/raw
add chain=prerouting action=jump jump-target=udp-check \
    in-interface-list=WAN protocol=udp comment="Check UDP from the WAN"
add chain=udp-check action=return src-address-list=trusted \
    comment="Do not check trusted addresses"
add chain=udp-check action=drop protocol=udp src-port=19,1900,11211 \
    comment="Drop replies of common amplification services"
```

计数器显示有多少数据包进入了该链，以及它们的处理结果。此处有两个 UDP 数据包进入该链。其中一个的源端口为 1900，已被丢弃；另一个到达链末尾并返回：

```ros
[admin@MikroTik] > /ip/firewall/raw/print stats
Flags: D - DYNAMIC
Columns: CHAIN, ACTION, BYTES, PACKETS
#   CHAIN       ACTION       BYTES  PACKETS
;;; special dummy rule to show fasttrack counters
0 D prerouting  passthrough      0        0
;;; Drop invalid source addresses
1   prerouting  drop           168        3
;;; Do not track LAN to LAN
2   prerouting  notrack        280        5
;;; Do not track LAN to LAN
3   prerouting  notrack        280        5
;;; Check UDP from the WAN
4   prerouting  jump           292        2
;;; Do not check trusted addresses
5   udp-check   return           0        0
;;; Drop replies of common amplification services
6   udp-check   drop            57        1
```

## IPv6

IPv6 RAW 表是独立的，并且具有相同的链和动作。例如，丢弃来自互联网、源地址为文档前缀的数据包：

```ros
/ipv6/firewall/raw
add chain=prerouting action=drop in-interface-list=WAN \
    src-address=2001:db8::/32 comment="Drop the documentation prefix"
```

匹配器有几处不同。IPv6 规则具有 `headers` 和 `hop-limit`。它们没有 `fragment`、`hotspot`、`ipv4-options`、`psd` 和 `ttl`。

## RAW 规则的行为方式

### 在数据包流中的位置

RAW 规则是数据包遇到的第一批 IP 防火墙规则。完整示意图请参阅 [Packet Flow in RouterOS](/docs/firewall-and-quality-of-service/packet-flow-in-routeros)。该位置具有以下影响：

- 连接跟踪尚未见到该数据包，因此 RAW 规则没有依赖连接跟踪的匹配器。
- NAT 尚未应用。在 prerouting 链中，`dst-address` 是目的 NAT 之前数据包的目的地址。
- 在 RAW 表中丢弃的数据包不会创建连接跟踪条目。

### 规则处理

规则从链的顶部开始处理。`accept`、`drop` 和 `notrack` 的区别在于后续发生的情况：

- `accept` - 数据包跳过剩余的 RAW 规则，继续进入连接跟踪。
- `drop` - 数据包被丢弃。
- `notrack` - 数据包被标记为绕过连接跟踪，并继续进入下一条 RAW 规则。

其他动作 `log`、`passthrough`、`add-src-to-address-list` 和 `add-dst-to-address-list` 会执行相应操作，然后将数据包传递给下一条规则。`jump` 和 `return` 在链之间移动数据包。

没有 `action` 的规则会接受数据包。未匹配任何规则的数据包也会被接受。

路由器会拒绝在 prerouting 链中使用 `out-interface` 的规则，以及在 output 链中使用 `in-interface` 的规则。

### 与 filter 的区别

| | Filter | RAW |
| :-- | :-- | :-- |
| 内置链 | input、forward、output | prerouting、output |
| 位置 | 连接跟踪之后 | 连接跟踪之前 |
| 依赖连接跟踪的匹配项 | 是 | 否 |
| 另一张表缺少的动作 | `fasttrack-connection`、`reject`、`tarpit` | `notrack` |

以下 filter 属性在 RAW 表中不可用：`connection-bytes`、`connection-limit`、`connection-mark`、`connection-nat-state`、`connection-rate`、`connection-state`、`connection-type`、`hw-offload`、`layer7-protocol`、`p2p`、`realm`、`reject-with` 和 `routing-mark`。

### 分片数据包

IPv4 和 IPv6 的 RAW 规则对分片数据包的识别方式不同：

- **IPv4** - 即使启用了连接跟踪，RAW 规则也会在数据包被重组之前逐个查看每个分片。`fragment=yes` 匹配除第一个分片之外的所有分片，`packet-size` 匹配的是单个分片的大小，而不是整个数据包的大小。经过 RAW 表之后，连接跟踪会重组数据包，其他防火墙表看到的是一个完整的数据包。
- **IPv6** - RAW 规则看到的是已重组的数据包。

通过 `action=notrack` 绕过连接跟踪的 IPv4 数据包不会被重组。路由器转发该数据包时，它在 mangle 和 filter 规则中仍保持分片状态，其中只有第一个分片带有端口号。发往路由器自身的数据包会在 input 链之前完成重组。

## 更多信息

- [Filter](/docs/firewall-and-quality-of-service/firewall/filter)
- [Address lists](/docs/firewall-and-quality-of-service/firewall/address-lists)
- [Connection tracking](/docs/firewall-and-quality-of-service/connection-tracking)
- [Building advanced firewall](/docs/firewall-and-quality-of-service/user-guides/building-advanced-firewall)

有关所有规则属性的说明，请参阅 [`/ip/firewall/raw`](/docs/cli-reference/ip/firewall/raw/) 和 [`/ipv6/firewall/raw`](/docs/cli-reference/ipv6/firewall/raw/) 的 CLI 参考。
