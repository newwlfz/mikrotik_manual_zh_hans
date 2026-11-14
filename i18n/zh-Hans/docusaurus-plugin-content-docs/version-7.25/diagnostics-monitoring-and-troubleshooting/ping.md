---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/ping"
sidebar_position: 1
title: "Ping"
sidebar_label: "Ping"
description: "RouterOS ping 工具：检查主机或互联网是否可达，读取每个回复的状态，查找路径 MTU，从选定的地址、接口或 VRF 发起 ping，使用 ARP 和 ND ping 访问阻止 ICMP 的主机，发现 IPv6 主机，ping MAC 地址，并在脚本中使用 ping。"
tags:
  - 'icmp'
  - 'ping'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/ping
captured_at: '2026-11-04T11:15:28+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Ping 检查主机是否响应以及响应需要多长时间。路由器向主机发送 Internet Control Message Protocol (ICMP) 回显请求（类型 8），主机则用回显应答（类型 0）逐一回应。请求与其应答之间的时间就是往返时间。如果某个请求的应答未在 `interval`（默认 1 秒）内到达，则会报告为超时。

每个应答还会显示其生存时间（TTL）。每台转发数据包的路由器都会将其 TTL 减一，TTL 耗尽的数据包会被丢弃。TTL 列显示应答到达时的 TTL，因此它大致说明应答经过了多少台路由器：大多数系统以 TTL 64、128 或 255 发送，所以到达时 TTL 为 62 的应答经过了两台路由器。路由器发送自己的请求时使用 TTL 255（IPv4）或跳数限制 64（IPv6）。

`/ping` 是 `/tool/ping` 的简写形式。要查明数据包在路径上的何处停止，请使用 [跟踪路由](./traceroute.md)。

## 检查主机是否可达 {#check-that-a-host-is-reachable}

要检查互联网连接，请先 ping 一个公共地址，然后 ping 一个名称：

```ros
/ping 1.1.1.1 count=3
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 1.1.1.1                                    56  60 1ms45us
    1 1.1.1.1                                    56  60 1ms89us
    2 1.1.1.1                                    56  60 1ms163us
    sent=3 received=3 packet-loss=0% min-rtt=1ms45us avg-rtt=1ms99us max-rtt=1ms163us
```

```ros
/ping mikrotik.com count=3
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 159.148.172.205                            56  55 1ms582us
    1 159.148.172.205                            56  55 1ms450us
    2 159.148.172.205                            56  55 1ms513us
    sent=3 received=3 packet-loss=0% min-rtt=1ms450us avg-rtt=1ms515us max-rtt=1ms582us
```

路由器使用自己的 [DNS](../network-management/dns.md) 设置解析名称。当地址有应答而名称没有时，说明连接正常，问题出在 DNS 配置。无法解析的名称会失败并显示 `failure: resolve failed`；请参阅 DNS 页面上的 [检查与故障排除](../network-management/dns.md#check-and-troubleshoot)。在 [WinBox](../management-tools/winbox.md) 4 和 [WebFig](../management-tools/webfig.md) 中，Tools > Ping 会把名称发送给路由器，由路由器也使用其 DNS 进行解析；WinBox 3 则在其运行的计算机上解析名称。

每一行代表一个应答：

- `SEQ` - 该行所应答请求的编号。
- `HOST` - 应答来自的地址：主机，或路径上发送错误的路由器。
- `SIZE` - 接收数据包的大小，以字节为单位。
- `TTL` - 接收数据包的 TTL。
- `TIME` - 往返时间。
- `STATUS` - IPv4 应答为空，IPv6 应答为 `echo reply`；否则表示出错原因。

最后一行汇总本次运行：发送的请求数、收到的应答数、丢失请求的比例，以及最短、平均和最长往返时间。如果不指定 `count`，ping 会一直运行，直到你用 <kbd>Control</kbd>+<kbd>C</kbd> 停止它。

## 读取状态列 {#read-the-status-column}

| 状态 | 含义 |
| :-- | :-- |
| `timeout` | 在 `interval` 内没有应答到达。主机宕机、不响应 ping、路径上的防火墙丢弃请求或应答，或者往返时间长于 `interval`。 |
| `net unreachable` | `HOST` 中显示的路由器没有通往目标网络的路由，或者那里的防火墙规则使用默认 `reject` 动作拒绝该数据包。 |
| `host unreachable` | `HOST` 中显示的路由器报告无法到达该主机，或者那里的防火墙规则使用 `reject-with=icmp-host-unreachable` 拒绝该数据包。 |
| `admin prohibited` | `HOST` 中显示的路由器上的防火墙规则使用 `reject-with=icmp-admin-prohibited` 拒绝该数据包。Traceroute 会将同样的应答显示为 `packet filtered`。 |
| `TTL exceeded` | TTL 在 `HOST` 中显示的路由器上耗尽。通常是路由环路。 |
| `fragmentation needed and DF set` | `HOST` 中显示的路由器必须通过 MTU 更小的链路转发该数据包，而 Don't Fragment 标志阻止了这样做。 |
| `packet too large and cannot be fragmented` | 数据包大于出接口的 MTU，或大于路由器已学习到的路径 MTU，并且已设置 Don't Fragment 标志。 |
| `no route to host` | 路由器没有通往该地址的路由。对于 ND ping，该地址不在直连子网上。 |
| `echo reply` | IPv6 回显应答。IPv4 应答的状态列留空。 |

路由环路会让数据包在两台路由器之间来回发送，直到其 TTL 耗尽。TTL 最先耗尽的路由器会报告该情况：

```ros
/ping 198.51.100.10 count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 203.0.113.1                                84  64 20ms894us  TTL exceeded
    1 203.0.113.1                                84  64 20ms404us  TTL exceeded
    sent=2 received=0 packet-loss=100%
```

## 查找路径 MTU {#find-the-path-mtu}

当路径上某条链路的 MTU（最大传输单元）比其周围链路更小（例如 PPPoE 连接或隧道）时，小数据包能通过，大数据包会丢失：ping 正常，但网页只能部分加载，文件传输会停滞。要找出能穿过该路径的最大数据包，请使用 Don't Fragment 标志进行 ping。先从 1500 开始，PPPoE 连接则从 1492 开始，然后降低 `size`，直到有应答到达：能收到应答的最大大小就是路径 MTU。

`size` 是整个 IP 数据包的大小，包括 IP 头。`size=1500` 是以太网链路上的全尺寸数据包，相当于 Windows 上的 `ping -l 1472` 和 Linux 上的 `ping -s 1472`，后者只计算数据部分。对于 IPv6，头部为 40 字节，因此 `size=1500` 相当于 `ping -s 1452`。

```ros
/ping 198.51.100.10 size=1500 do-not-fragment count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 203.0.113.6                               576  63 893us      fragmentation needed and DF set
    1                                                              packet too large and cannot be fragmented
    sent=2 received=0 packet-loss=100%
```

203.0.113.6 处的路由器连接着 MTU 更小的链路，并用 `fragmentation needed and DF set` 应答第一个请求；`SIZE` 576 是该错误消息的大小，而不是 MTU。该消息会告知路由器该链路的 MTU，路由器会在一段时间内将其记为此目标的路径 MTU：随后更大的 ping 会立即失败并显示 `packet too large and cannot be fragmented`，而不会离开路由器。当 `size` 大于出接口的 MTU 时，也会出现相同的状态。

```ros
/ping 198.51.100.10 size=1401 do-not-fragment count=1
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0                                                              packet too large and cannot be fragmented
    sent=1 received=0 packet-loss=100%
```

```ros
/ping 198.51.100.10 size=1400 do-not-fragment count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 198.51.100.10                            1400  62 1ms347us
    1 198.51.100.10                            1400  62 1ms41us
    sent=2 received=2 packet-loss=0% min-rtt=1ms41us avg-rtt=1ms194us max-rtt=1ms347us
```

1400 是能收到应答的最大大小：路径 MTU 为 1400 字节。如果不使用 `do-not-fragment`，更大的 ping 会被分片并收到应答，因此不会显示 MTU 问题。当路径上的防火墙丢弃“需要分片”消息时，超过路径 MTU 的 ping 只会超时。

要查看路径上哪台路由器连接着更小的链路，请运行 [带 `do-not-fragment` 的 traceroute](./traceroute.md#find-the-hop-with-the-smaller-mtu)。要让 TCP 连接跨越此类链路正常工作，请使用 [mangle 规则](../firewall-and-quality-of-service/firewall/mangle.md#change-mss) 钳制 TCP MSS。

## 从指定地址、接口或 VRF 执行 Ping {#ping-from-a-specific-address-interface-or-vrf}

默认情况下，路由器会像处理其他流量一样选择源地址：如果路由设置了 `pref-src`，则使用该值，否则使用出接口的地址。测试所需的地址并不总是这个地址。例如，[IPsec](../virtual-private-networks/ipsec/index.md) 站点到站点隧道只承载两个 LAN 之间的流量：从路由器 WAN 地址向远程 LAN 发送的 ping 不匹配 IPsec 策略，因此不会进入隧道。要测试隧道，请从路由器的 LAN 地址执行 ping：

```ros
/ping 192.168.2.10 src-address=192.168.88.1 count=3
```

`interface=` 设置请求离开时所经过的接口。当没有经过该接口且覆盖目标的路由时，路由器会把目标视为该接口上直连，并为其发送 ARP 请求。ARP ping、发往全局地址的 ND ping，以及发往 IPv6 链路本地地址的 ping 都需要 `interface=`。

`vrf=` 会在 [VRF](../user-guides/routing-and-networking-protocols/vrf.md) 中发送 ping：

```ros
/ping 10.0.0.1 vrf=customer1 count=3
```

只接受 VRF。为策略路由而存在的路由表不是 VRF，ping 会被拒绝并显示 `input does not match any value of vrf`。要测试这样的表，请将 `src-address` 设置为某个地址，使 [路由规则](../user-guides/routing-and-networking-protocols/policy-routing.md) 将该地址发送到该表：这些规则适用于路由器自身的 ping。

## 查找不响应 ping 的主机 {#find-a-host-that-does-not-answer-ping}

许多主机会丢弃 ICMP 回显请求，例如启用了防火墙的计算机，因此正常工作的主机可能看起来像是宕机：

```ros
/ping 192.168.88.20 count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 192.168.88.20                                                timeout
    1 192.168.88.20                                                timeout
    sent=2 received=0 packet-loss=100%
```

与路由器在同一子网中的主机仍必须应答 ARP，否则它无法接收任何流量。使用 `arp-ping=yes` 时，路由器发送 ARP 请求而不是 ICMP 回显请求，`HOST` 会显示做出应答的主机的 MAC 地址。ARP ping 适用于直连子网上的 IPv4 地址，并且需要 `interface=`，即在该子网上具有路由器地址的接口（默认配置中为 `bridge`）；如果不指定，ping 会失败并显示 `interface needs to be specified for arp ping`。

```ros
/ping 192.168.88.20 arp-ping=yes interface=bridge count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 FE:14:80:BE:47:5B                                 386us
    1 FE:14:80:BE:47:5B                                 346us
    sent=2 received=2 packet-loss=0% min-rtt=346us avg-rtt=366us max-rtt=386us
```

要查明哪个设备具有该 MAC 地址，请在 [DHCP 服务器租约](../network-management/dhcp/server.md#leases) 中查找，或查看设备标签。

对于 IPv6，`nd-ping=yes` 通过邻居发现实现相同的功能：路由器发送邻居请求（NS）而不是 ICMPv6 回显请求，并将邻居通告（NA）计为应答。它可确认主机存在且邻居发现正常工作，即使主机上过滤或关闭了 ICMPv6 回显。ND ping 仅适用于直连 IPv6 子网上的地址；其他子网上的地址会返回 `no route to host` 错误。全局地址需要 `interface=`，否则 ping 会失败并显示 `interface needs to be specified for ND ping`；链路本地地址在其 `%interface` 后缀中带有接口：

```ros
/ping fe80::fc14:80ff:febe:475b%ether1 nd-ping=yes count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 fe80::fc14:80ff:febe:475b                         622us
    1 fe80::fc14:80ff:febe:475b                         581us
    sent=2 received=2 packet-loss=0% min-rtt=581us avg-rtt=601us max-rtt=622us
```

```ros
/ping 2001:db8:0:1::2 nd-ping=yes interface=ether1
```

在 WinBox 中，Tools > Ping 在 ARP Ping 旁边有一个 ND Ping 复选框，并带有一个接口选择器。

## 发现链路上的 IPv6 主机 {#discover-ipv6-hosts-on-a-link}

大多数 IPv6 主机会应答发送到全节点组播地址 `ff02::1` 的回显请求；防火墙丢弃此类请求的主机则不会。在某个接口上 ping 该地址，可列出该链路上的 IPv6 主机：

```ros
/ping ff02::1%ether1 count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 fe80::fc89:f0ff:fe95:7d86                  56  64 395us      echo reply
    0 fe80::fc14:80ff:febe:475b                  56  64 1ms87us    echo reply
    sent=1 received=2 packet-loss=-100% min-rtt=395us avg-rtt=741us max-rtt=1ms87us
```

所有主机都会应答同一个请求，因此多行会共享同一个 `SEQ`，并且列表中包含路由器在该接口上的自身地址。每个应答都会计入 `count` 和汇总行，因此汇总行显示的应答数会多于请求数。

## Ping 一个 MAC 地址 {#ping-a-mac-address}

MAC ping 可在同一二层网段上，无需 IP 配置，通过 MAC 地址访问 MikroTik 设备。当目标的 MAC ping 服务器启用时（默认已启用），目标会做出应答（请参阅 [MAC 服务器](../management-tools/mac-server.md)）：

```ros
/tool/mac-server/ping/set enabled=yes
```

Ping 该 MAC 地址，并在 `%` 后指定接口：

```ros
/ping FE:14:80:BE:47:5B%ether1 count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 FE:14:80:BE:47:5B                          70     775us
    1 FE:14:80:BE:47:5B                          70     579us
    sent=2 received=2 packet-loss=0% min-rtt=579us avg-rtt=677us max-rtt=775us
```

如果没有 `%interface` 后缀，路由器会从每个接口发出每个请求。这会增加所有接口上的流量，并且当目标可通过多个接口到达时会返回重复应答。

## 在脚本中使用 ping {#use-ping-in-a-script}

在脚本中，ping 返回其收到的应答数：

```ros
:if ([/ping 198.51.100.10 count=3] = 0) do={
    :log warning "Server 198.51.100.10 does not answer"
}
```

当地址是无法解析的名称时，ping 会失败并显示 `resolve failed`，并停止脚本；将它放入 `:do { ... } on-error={ ... }` 中以处理这种情况。要定期运行该检查，请将脚本添加到 [调度器](../system-information-and-utilities/scheduler.md)。

使用 `as-value` 时，ping 会为每个应答返回一个条目，包含应答的 `host`、`seq`、`size`、`ttl` 和 `time`，失败时则包含其 `status`。要持续监视主机并在其宕机或恢复时运行脚本，请使用 [网络监控](./netwatch.md)，而不是定时 ping。

## 技术细节 {#technical-details}

### 数据包大小 {#packet-size}

`size` 设置整个数据包的大小，包括 IP 头：IPv4 为 28 到 65535 字节，IPv6 为 48 到 65535 字节（更小的 IPv6 大小会失败并显示 `packet size is too small`），默认 56。大于出接口 MTU 的数据包会被分片，除非设置了 `do-not-fragment`。`SIZE` 列显示接收数据包的大小；对于来自路由器的错误消息，该值为该消息的大小（本页示例中为 576 和 84）。

### 间隔与计数 {#interval-and-count}

路由器每隔 `interval` 发送一个请求，范围为 10 ms 到 5 s，默认 1 s。晚于 `interval` 到达的应答会被计为超时，因此在往返时间较长的链路上（例如卫星链路或拥塞的移动链路），请将 `interval` 提高到往返时间以上。如果不指定 `count`，它会持续发送请求，直到你停止它。

### TTL 与跳数限制 {#ttl-and-hop-limit}

`ttl` 设置 IPv4 请求的 TTL 和 IPv6 请求的跳数限制，范围为 1 到 255。如果不指定，IPv4 请求以 TTL 255 发出，IPv6 请求以跳数限制 64 发出。

### DSCP {#dscp}

`dscp` 设置请求 IP 头中的差异化服务代码点，范围为 0 到 63。`dscp=46`（Expedited Forwarding）会得到 `0xb8` 的 ToS 字节。可用它检查路径如何处理某个 QoS 类别的流量。

### 链路本地地址 {#link-local-addresses}

IPv6 链路本地地址（`fe80::/10`）存在于每条链路上，因此需要以接口作为后缀：`fe80::1%ether1`。

有关所有参数，请参阅 [`/tool/ping` CLI 参考](../cli-reference/tool/ping.md)。
