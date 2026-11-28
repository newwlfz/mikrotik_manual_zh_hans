---
title: "Ping"
description: "RouterOS ping 工具：检查主机或互联网是否可达，查看每个回复的状态，发现路径 MTU，从指定地址、接口或 VRF 执行 ping，通过 ARP 和 ND ping 访问阻止 ICMP 的主机，发现 IPv6 主机，ping MAC 地址，并在脚本中使用 ping。"
tags:
  - 'icmp'
  - 'ping'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/ping
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "diagnostics-monitoring-and-troubleshooting"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Ping 检查主机是否应答以及应答所需时间。路由器向主机发送 Internet Control Message Protocol（ICMP）echo 请求（type 8），主机用 echo 应答（type 0）回复每个请求。请求与其应答之间的时间为往返时间。如果请求的应答未在 `interval` 内到达（默认为 1 秒），则报告为超时。

每个应答还会显示其 Time to Live（TTL）。每转发一个数据包的路由器都会将其 TTL 减 1，TTL 耗尽的数据包会被丢弃。TTL 列显示应答到达时的 TTL，因此可大致判断应答经过了多少台路由器：大多数系统以 TTL 64、128 或 255 发送，因此到达时 TTL 为 62 的应答经过了 2 台路由器。路由器发送自身请求时使用 TTL 255（IPv4）或 hop limit 64（IPv6）。

`/ping` 是 `/tool/ping` 的简写。要确定数据包在路径中的何处停止，请使用 [Traceroute](/docs/diagnostics-monitoring-and-troubleshooting/traceroute)。

## 检查主机是否可达 {#check-that-a-host-is-reachable}

要检查互联网连接，先 ping 一个公共地址，再 ping 一个名称：

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

路由器使用自身的 [DNS](/docs/network-management/dns) 设置解析名称。当地址有应答而名称无应答时，说明连接正常，故障出在 DNS 配置。无法解析的名称会以 `failure: resolve failed` 失败；请参阅 DNS 页面上的 [Check and troubleshoot](/docs/network-management/dns#check-and-troubleshoot)。在 [WinBox](/docs/management-tools/winbox) 4 和 [WebFig](/docs/management-tools/webfig) 中，Tools > Ping 会将名称发送给路由器，路由器也会使用其 DNS 解析该名称；WinBox 3 则在运行它的计算机上解析名称。

每一行对应一个应答：

- `SEQ` - 该行所应答请求的编号。
- `HOST` - 应答来源地址：主机，或路径中发送错误的路由器。
- `SIZE` - 收到的数据包大小，单位为字节。
- `TTL` - 收到的数据包的 TTL。
- `TIME` - 往返时间。
- `STATUS` - IPv4 应答为空，IPv6 应答为 `echo reply`；其他情况表示出现了什么问题。

最后一行汇总本次运行情况：已发送请求数、已接收回复数、丢失请求占比，以及最短、平均和最长往返时间。未指定 `count` 时，ping 会持续运行，直到你使用 <kbd>Control</kbd>+<kbd>C</kbd> 停止。

## 查看 status 列 {#read-the-status-column}

| Status | 含义 |
| :-- | :-- |
| `timeout` | 在 `interval` 内未收到回复。主机已关闭、不响应 ping、路径上的防火墙丢弃请求或回复，或者往返时间长于 `interval`。 |
| `net unreachable` | `HOST` 中显示的路由器没有到目标网络的路由，或者该处的防火墙规则使用默认 `reject` 动作拒绝数据包。 |
| `host unreachable` | `HOST` 中显示的路由器报告无法到达该主机，或者该处的防火墙规则使用 `reject-with=icmp-host-unreachable` 拒绝数据包。 |
| `admin prohibited` | `HOST` 中显示的路由器上的防火墙规则使用 `reject-with=icmp-admin-prohibited` 拒绝数据包。Traceroute 将相同响应显示为 `packet filtered`。 |
| `TTL exceeded` | TTL 在 `HOST` 中显示的路由器上耗尽。通常是路由环路。 |
| `fragmentation needed and DF set` | `HOST` 中显示的路由器必须通过 MTU 更小的链路转发数据包，但 Don't Fragment 标志阻止了分片。 |
| `packet too large and cannot be fragmented` | 数据包大于出接口的 MTU，或大于路由器已学习到的路径 MTU，并且设置了 Don't Fragment 标志。 |
| `no route to host` | 路由器没有到该地址的路由。对于 ND ping，该地址不在直连子网内。 |
| `echo reply` | IPv6 echo 回复。IPv4 回复的 status 为空。 |

路由环路会使数据包在两台路由器之间来回发送，直到 TTL 耗尽。TTL 首先耗尽的路由器会报告此情况：

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

当路径上某条链路的最大传输单元（MTU）小于相邻链路时，例如 PPPoE 连接或隧道，小数据包可以通过，大数据包会丢失：ping 正常，但网页仅部分加载，文件传输停滞。要查找能够通过该路径的最大数据包，请使用 Don't Fragment 标志执行 ping。从 1500 开始，在 PPPoE 连接上则从 1492 开始，逐步降低 `size`，直到收到回复：能收到回复的最大大小即为路径 MTU。

`size` 是整个 IP 数据包的大小，包括 IP 头。`size=1500` 是以太网链路上的完整大小数据包，对应 Windows 上的 `ping -l 1472` 和 Linux 上的 `ping -s 1472`，后两者只统计数据部分。对于 IPv6，头部为 40 字节，因此 `size=1500` 对应 `ping -s 1452`。

```ros
/ping 198.51.100.10 size=1500 do-not-fragment count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 203.0.113.6                               576  63 893us      fragmentation needed and DF set
    1                                                              packet too large and cannot be fragmented
    sent=2 received=0 packet-loss=100%
```

203.0.113.6 处的路由器具有 MTU 较小的链路，并以 `fragmentation needed and DF set` 响应第一个请求；`SIZE` 576 是该错误消息的大小，不是 MTU。该消息会告知路由器该链路的 MTU，路由器会在一段时间内将其记为该目标的路径 MTU：随后较大的 ping 会立即失败，显示 `packet too large and cannot be fragmented`，且数据包不会离开路由器。当 `size` 大于出接口的 MTU 时，也会出现相同的 status。

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

1400 是可获得回复的最大大小：路径 MTU 为 1400 字节。未使用 `do-not-fragment` 时，较大的 ping 会被分片并获得回复，因此无法显示 MTU 问题。当路径上的防火墙丢弃需要分片消息时，超过路径 MTU 的 ping 只会超时。

要查看路径上哪台路由器的链路较小，请运行[带 `do-not-fragment` 的 traceroute](/docs/diagnostics-monitoring-and-troubleshooting/traceroute#find-the-hop-with-the-smaller-mtu)。要使 TCP 连接能够跨越此类链路正常工作，请使用 [mangle 规则](/docs/firewall-and-quality-of-service/firewall/mangle#change-mss)限制 TCP MSS。

## 从指定地址、接口或 VRF 执行 ping {#ping-from-a-specific-address-interface-or-vrf}

默认情况下，路由器会按照其他流量的方式选择源地址：如果路由设置了 `pref-src`，则使用该地址；否则使用出站接口的地址。这并不总是测试所需的地址。例如，[IPsec](/docs/virtual-private-networks/ipsec) 站点到站点隧道仅承载两个 LAN 之间的流量：从路由器 WAN 地址发往远端 LAN 的 ping 不匹配 IPsec 策略，也不会进入隧道。要测试该隧道，请从路由器的 LAN 地址执行 ping：

```ros
/ping 192.168.2.10 src-address=192.168.88.1 count=3
```

`interface=` 设置请求发出时经过的接口。当没有通过该接口的路由覆盖目标时，路由器会将目标视为在该接口上直连，并为其发送 ARP 请求。ARP ping、发往全局地址的 ND ping 以及发往 IPv6 链路本地地址的 ping 需要 `interface=`。

`vrf=` 在 [VRF](/docs/user-guides/routing-and-networking-protocols/vrf) 中发送 ping：

```ros
/ping 10.0.0.1 vrf=customer1 count=3
```

仅接受 VRF。为策略路由而存在的路由表不是 VRF，ping 会被拒绝，并返回 `input does not match any value of vrf`。要测试此类路由表，请将 `src-address` 设置为由[路由规则](/docs/user-guides/routing-and-networking-protocols/policy-routing)发送到该表的地址：这些规则适用于路由器自身发出的 ping。

## 查找不响应 ping 的主机 {#find-a-host-that-does-not-answer-ping}

许多主机会丢弃 ICMP echo 请求，例如启用了防火墙的计算机，因此正常工作的主机可能看起来像已宕机：

```ros
/ping 192.168.88.20 count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 192.168.88.20                                                timeout
    1 192.168.88.20                                                timeout
    sent=2 received=0 packet-loss=100%
```

与路由器位于同一子网的主机仍必须响应 ARP，否则它无法接收任何流量。使用 `arp-ping=yes` 时，路由器会发送 ARP 请求而不是 ICMP echo 请求，`HOST` 会显示作出响应的主机的 MAC 地址。ARP ping 适用于直连子网上的 IPv4 地址，并且需要 `interface=`，即在该子网上具有路由器地址的接口（默认配置中为 `bridge`）；如果没有指定，ping 将失败并返回 `interface needs to be specified for arp ping`。

```ros
/ping 192.168.88.20 arp-ping=yes interface=bridge count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 FE:14:80:BE:47:5B                                 386us
    1 FE:14:80:BE:47:5B                                 346us
    sent=2 received=2 packet-loss=0% min-rtt=346us avg-rtt=366us max-rtt=386us
```

要确定哪个设备具有该 MAC 地址，请在 [DHCP server leases](/docs/network-management/dhcp/server#leases) 中查找，或查看设备标签。

对于 IPv6，`nd-ping=yes` 使用 Neighbor Discovery 执行相同操作：路由器发送 Neighbor Solicitations（NS）而不是 ICMPv6 echo 请求，并将 Neighbor Advertisement（NA）计为回复。它确认主机存在且 Neighbor Discovery 正常工作，即使主机上过滤或关闭了 ICMPv6 echo。ND ping 仅适用于直连 IPv6 子网上的地址；其他子网上的地址会返回 `no route to host` 错误。全局地址需要 `interface=`，否则 ping 将失败并返回 `interface needs to be specified for ND ping`；链路本地地址在其 `%interface` 后缀中携带接口：

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

在 WinBox 中，Tools > Ping 在 ARP Ping 旁边有一个 ND Ping 复选框，并带有接口选择器。

## 发现链路上的 IPv6 主机 {#discover-ipv6-hosts-on-a-link}

大多数 IPv6 主机会响应发送到 all-nodes 组播地址 `ff02::1` 的 echo 请求；防火墙丢弃此类请求的主机不会响应。在某个接口上 ping 该地址，可列出该链路上的 IPv6 主机：

```ros
/ping ff02::1%ether1 count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 fe80::fc89:f0ff:fe95:7d86                  56  64 395us      echo reply
    0 fe80::fc14:80ff:febe:475b                  56  64 1ms87us    echo reply
    sent=1 received=2 packet-loss=-100% min-rtt=395us avg-rtt=741us max-rtt=1ms87us
```

所有主机都会响应同一请求，因此多行共享一个 `SEQ`，并且列表中包括路由器在该接口上的自身地址。每个响应都会计入 `count` 和汇总行，因此汇总行显示的回复数会多于请求数。

## Ping MAC 地址 {#ping-a-mac-address}

MAC ping 可在同一二层网段内通过 MAC 地址访问 MikroTik 设备，无需 IP 配置。目标设备的 MAC ping server 启用时会响应，默认已启用（请参阅 [MAC server](/docs/management-tools/mac-server)）：

```ros
/tool/mac-server/ping/set enabled=yes
```

Ping MAC 地址，并在 `%` 后指定接口名称：

```ros
/ping FE:14:80:BE:47:5B%ether1 count=2
```

```text
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 FE:14:80:BE:47:5B                          70     775us
    1 FE:14:80:BE:47:5B                          70     579us
    sent=2 received=2 packet-loss=0% min-rtt=579us avg-rtt=677us max-rtt=775us
```

不使用 `%interface` 后缀时，路由器会从每个接口发送每个请求。这会增加所有接口的流量，并且当目标可通过多个接口到达时，会返回重复回复。

## 在脚本中使用 ping {#use-ping-in-a-script}

在脚本中，ping 返回收到的回复数量：

```ros
:if ([/ping 198.51.100.10 count=3] = 0) do={
    :log warning "Server 198.51.100.10 does not answer"
}
```

当地址是无法解析的名称时，ping 会失败并返回 `resolve failed`，同时停止脚本；可将其放入 `:do { ... } on-error={ ... }` 以处理该情况。要定期运行检查，请将脚本添加到 [scheduler](/docs/system-information-and-utilities/scheduler)。

使用 `as-value` 时，ping 会为每条回复返回一个条目，包含回复的 `host`、`seq`、`size`、`ttl` 和 `time`，失败时则返回其 `status`。要持续监控主机并在其宕机或恢复时运行脚本，请使用 [Netwatch](/docs/diagnostics-monitoring-and-troubleshooting/netwatch)，而不是定时 ping。

## 技术细节 {#technical-details}

### 数据包大小 {#packet-size}

`size` 设置整个数据包的大小，包括 IP 头：IPv4 为 28 到 65535 字节，IPv6 为 48 到 65535 字节（较小的 IPv6 大小会失败，并返回 `packet size is too small`），默认值为 56。大于出站接口 MTU 的数据包会被分片，除非设置了 `do-not-fragment`。`SIZE` 列显示接收到的数据包大小；对于来自路由器的错误消息，该大小是消息本身的大小（本页示例中为 576 和 84）。

### 间隔和计数 {#interval-and-count}

路由器每个 `interval` 发送一个请求，范围为 10 ms 到 5 s，默认值为 1 s。晚于 `interval` 到达的回复会被计为超时，因此在往返时间较长的链路上，例如卫星链路或拥塞的移动链路，请将 `interval` 设置为大于往返时间。未指定 `count` 时，路由器会持续发送请求，直到你停止它。

### TTL 和跳数限制 {#ttl-and-hop-limit}

`ttl` 设置 IPv4 请求的 TTL 和 IPv6 请求的跳数限制，范围为 1 到 255。未指定时，IPv4 请求以 TTL 255 发出，IPv6 请求以跳数限制 64 发出。

### DSCP

`dscp` 设置请求 IP 头中的 Differentiated Services Code Point，范围为 0 到 63。`dscp=46`（Expedited Forwarding）对应的 ToS 字节为 `0xb8`。使用它可检查路径如何处理某个 QoS 类别的流量。

### 链路本地地址 {#link-local-addresses}

每条链路上都存在 IPv6 链路本地地址（`fe80::/10`），因此需要以接口作为后缀：`fe80::1%ether1`。

有关所有参数，请参阅 [`/tool/ping` CLI 参考](/docs/cli-reference/tool/ping)。
