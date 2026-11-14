---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/traceroute"
sidebar_position: 2
title: "跟踪路由"
sidebar_label: "跟踪路由"
description: "RouterOS traceroute 工具：列出到主机的路径上的路由器，读取每一跳的丢包和往返统计信息，找出路径在何处中断、形成环路或被过滤，并从 VRF 或选定的源地址进行跟踪。"
tags:
  - 'traceroute'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/traceroute
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Traceroute 会列出数据包在前往远程主机的途中经过的路由器，并针对每台路由器显示它响应了多少个探测包以及响应耗时。可用它来定位连接失败或变慢的位置：是在你自己的网络中、在 ISP 网关处，还是更远的地方。如果只想测试某台主机是否有响应，请使用 [ping](./ping.md)。

Traceroute 依赖于 IP 头中的生存时间（TTL）字段，该字段用于防止路由环路：每台路由器在转发数据包时会将其 TTL 减一，当 TTL 减到零时，路由器丢弃该数据包并向发送方回送一条 ICMP time exceeded 消息。Traceroute 发出的第一个探测包 TTL 为 1，因此路径上的第一台路由器会响应；下一个探测包 TTL 为 2，可以到达第二台路由器，依此类推，直到探测包到达目的地，由目的地自身响应探测包。

RouterOS 使用 ICMP echo request 作为探测包，最远探测 30 跳。一轮结束后，它会启动下一轮，最多每秒一轮，并像 `mtr` 工具那样为每一跳保存统计信息，直到你用 <kbd>Control</kbd>+<kbd>C</kbd> 停止它，或者它已完成 `count` 轮，或已运行满 `duration`。其他系统有类似的工具：类 Unix 系统上的 `traceroute` 或 `tracepath`，以及 Windows 上的 `tracert`。

## 跟踪到主机的路径 {#trace-the-path-to-a-host}

要跟踪到某台服务器的路径，并进行三轮探测：

```ros
/tool/traceroute 198.51.100.10 count=3
```

```text
Columns: ADDRESS, LOSS, SENT, LAST, AVG, BEST, WORST, STD-DEV
#  ADDRESS        LOSS  SENT  LAST   AVG  BEST  WORST  STD-DEV
0  203.0.113.1    0%       3  0.3ms  0.4  0.3   0.4          0
1  203.0.113.6    0%       3  0.4ms  0.4  0.4   0.4          0
2  198.51.100.10  0%       3  0.5ms  0.5  0.5   0.5          0
```

数据包在到达服务器之前经过两台路由器，203.0.113.1 和 203.0.113.6。`#` 列从 0 开始，因此第 0 行是第一跳。每轮结束后表格会原地更新。各列含义如下：

- `ADDRESS` - 为该跳做出响应的路由器的地址：即它发送响应时使用的地址，通常是指向你这一侧的接口地址。
- `LOSS` - 发往该跳的探测包中没有得到响应的比例。
- `SENT` - 发往该跳的探测包数量。
- `LAST`、`AVG`、`BEST`、`WORST` - 最近一次响应的往返时间，以及平均、最短和最长往返时间，单位为毫秒。当最近一次探测没有得到响应时，`LAST` 显示 `timeout`。
- `STD-DEV` - 往返时间的标准差，单位为毫秒：即各轮之间往返时间的波动程度。
- `STATUS` - 当某一跳返回的是错误而不是 time exceeded 时显示，例如防火墙拒绝了该流量。

## 显示主机名 {#show-host-names}

设置 `use-dns=yes` 后，traceroute 会显示每一跳的主机名而不是其地址。路由器通过自身的 [DNS 解析器](../network-management/dns.md)以反向 DNS 查询来解析这些名称，因此没有反向 DNS 记录的那一跳仍会显示其地址。目的地也可以是主机名：

```ros
/tool/traceroute server.example.com count=3 use-dns=yes
```

```text
Columns: ADDRESS, LOSS, SENT, LAST, AVG, BEST, WORST, STD-DEV
#  ADDRESS                 LOSS  SENT  LAST   AVG  BEST  WORST  STD-DEV
0  edge1.isp.example.net.  0%       3  0.4ms  0.5  0.4   0.5    0
1  core1.isp.example.net.  0%       3  0.4ms  0.5  0.4   0.6    0.1
2  server.example.com.     0%       3  0.6ms  0.6  0.5   0.7    0.1
```

主机名可以显示出某台路由器属于哪个网络或哪个位置。

## 找出路径中断的位置 {#find-where-the-path-breaks}

当某台主机没有响应时，traceroute 会显示数据包能到达多远。以下每种输出展示一种典型结果。

### 后续跳不再响应 {#hops-stop-answering}

```ros
/tool/traceroute 198.51.100.10 count=1 max-hops=4
```

```text
Columns: ADDRESS, LOSS, SENT, LAST, AVG, BEST, WORST, STD-DEV
#  ADDRESS      LOSS  SENT  LAST     AVG  BEST  WORST  STD-DEV
0  203.0.113.1  0%       1  0.4ms    0.4  0.4   0.4          0
1               100%     1  timeout
2               100%     1  timeout
3               100%     1  timeout
```

第一台路由器有响应，而它之后的都不响应。问题出在最后一台有响应的跳之后：可能是链路中断、缺少路由、缺少返回你地址的路由（例如你以 `src-address` 设为某个 LAN 地址进行跟踪，而远端网络没有回程路由到该地址），或者是有防火墙在不作响应的情况下丢弃了数据包。请检查路由器 203.0.113.1：检查它到目的地的路由，以及它到下一跳的链路。如果不设置 `max-hops`，跟踪会继续以超时状态进行，最多到 30 跳。

当路径上的所有路由器都有响应、但目的地本身丢弃了 ICMP echo request 时，也会出现同样的输出：最后一台路由器之后的行保持为空。请对目的地执行 [Ping](./ping.md)，或者当目的地位于直连子网时使用 [ARP ping](./ping.md#find-a-host-that-does-not-answer-ping)。

### 某台路由器拒绝该流量 {#a-router-rejects-the-traffic}

```ros
/tool/traceroute 198.51.100.10 count=1
```

```text
Columns: ADDRESS, LOSS, SENT, LAST, AVG, BEST, WORST, STD-DEV, STATUS
#  ADDRESS      LOSS  SENT  LAST   AVG  BEST  WORST  STD-DEV  STATUS
0  203.0.113.1  0%       1  0.4ms  0.4  0.4   0.4          0
1  203.0.113.1  0%       1  0.3ms  0.3  0.3   0.3          0  host unreachable from 203.0.113.1
2               0%       0  0ms
```

路由器 203.0.113.1 对第二个探测包返回了错误而不是将其转发，跟踪就此结束；它之后的那一行空行表示探测包没有到达的那一跳。`host unreachable from 203.0.113.1` 表示该路由器无法把数据包投递到主机；使用 `reject-with=icmp-host-unreachable` 拒绝数据包的防火墙规则会给出相同的响应。`network unreachable from 203.0.113.1` 表示该路由器没有到目的地网络的路由，或者有防火墙规则以默认的 `reject` 动作拒绝了该数据包。`packet filtered from 203.0.113.1` 表示该路由器上的防火墙以 administratively prohibited 为由拒绝了该数据包（`reject-with=icmp-admin-prohibited`）；[ping](./ping.md) 会把同样的响应显示为 `admin prohibited`。

### 同样的路由器重复出现 {#the-same-routers-repeat}

```ros
/tool/traceroute 198.51.100.10 count=1 max-hops=8
```

```text
Columns: ADDRESS, LOSS, SENT, LAST, AVG, BEST, WORST, STD-DEV
#  ADDRESS      LOSS  SENT  LAST   AVG  BEST  WORST  STD-DEV
0  203.0.113.1  0%       1  0.4ms  0.4  0.4   0.4          0
1  203.0.113.6  0%       1  0.4ms  0.4  0.4   0.4          0
2  203.0.113.1  0%       1  0.4ms  0.4  0.4   0.4          0
3  203.0.113.6  0%       1  0.6ms  0.6  0.6   0.6          0
4  203.0.113.1  0%       1  0.5ms  0.5  0.5   0.5          0
5  203.0.113.6  0%       1  0.6ms  0.6  0.6   0.6          0
6  203.0.113.1  0%       1  0.7ms  0.7  0.7   0.7          0
7  203.0.113.6  0%       1  0.8ms  0.8  0.8   0.8          0
```

两台路由器交替出现：这是一个路由环路。它们各自把目的地路由到对方，因此数据包在两者之间来回转发，直到 TTL 耗尽。请检查这两台路由器上到目的地的路由。此时对目的地执行 [ping](./ping.md) 会收到其中一台路由器返回的 `TTL exceeded`，而不是正常回复。

路由器 203.0.113.1 从与来自你这一侧的探测包不同的接口上收到来自 203.0.113.6 的环路数据包，但它每次都用自己指向你这一侧的地址做出响应。

### 某一跳显示丢包，而后续跳不丢包 {#one-hop-shows-loss-later-hops-do-not}

```ros
/tool/traceroute 198.51.100.10 count=10
```

```text
Columns: ADDRESS, LOSS, SENT, LAST, AVG, BEST, WORST, STD-DEV
#  ADDRESS        LOSS  SENT  LAST     AVG  BEST  WORST  STD-DEV
0  203.0.113.1    0%      10  0.2ms    0.2  0.2   0.4    0.1
1  203.0.113.6    90%     10  timeout  0.4  0.4   0.4    0
2  198.51.100.10  0%      10  0.8ms    0.8  0.5   0.8    0.1
```

路由器 203.0.113.6 在十个探测包中只响应了一个，但所有经过同一台路由器发往服务器的探测包都得到了响应。许多路由器会限制其发送 time exceeded 消息的频率，或给这类消息较低的优先级，因此没有延续到后续跳的丢包并不是路径上的真实丢包。真正的丢包从某一跳开始，并会出现在它之后的每一跳上。完全不发送 time exceeded 消息的路由器会显示为一跳 100% 丢包且无地址，夹在有响应的各跳之间。

### 往返时间增长 {#round-trip-times-grow}

某一跳的往返时间包含从该路由器返回你这一侧的路径。若往返时间在某一跳上升，并在之后的每一跳都保持更高，说明该跳之前存在一条速度慢、距离远或拥塞的链路。若只有某一跳的往返时间偏高或 `STD-DEV` 很大，而其后的时间正常，说明这台路由器响应慢，而不是经过它的流量慢。

## 找出 MTU 较小的那一跳 {#find-the-hop-with-the-smaller-mtu}

使用 `do-not-fragment` 并设置较大的 `size` 后，探测包无法被分片，而必须把这些包转发到 MTU 较小链路上的路由器会改为返回错误：

```ros
/tool/traceroute 198.51.100.10 size=1500 do-not-fragment count=1
```

```text
Columns: ADDRESS, LOSS, SENT, LAST, AVG, BEST, WORST, STD-DEV, STATUS
#  ADDRESS      LOSS  SENT  LAST   AVG  BEST  WORST  STD-DEV  STATUS
0  203.0.113.1  0%       1  0.5ms  0.5  0.5   0.5          0
1  203.0.113.6  0%       1  0.6ms  0.6  0.6   0.6          0
2  203.0.113.6  0%       1  0.6ms  0.6  0.6   0.6          0  fragmentation needed from 203.0.113.6
3               0%       0  0ms
```

路由器 203.0.113.6 上有较小的链路。要找出路径的 MTU，请参阅 ping 页面中的 [查找路径 MTU](./ping.md#find-the-path-mtu)。

## 从 VRF 或指定源地址进行跟踪 {#trace-from-a-vrf-or-a-specific-source}

默认情况下，traceroute 使用主路由表、以出口接口的地址发送探测包。在运营商路由器上，客户网络通常位于 [VRF](../user-guides/routing-and-networking-protocols/vrf.md) 中；`vrf` 会跟踪客户流量所走的路径：

```ros
/tool/traceroute 198.51.100.10 vrf=customer1
```

`vrf` 只接受 VRF。为策略路由创建的路由表不是 VRF，命令会拒绝它。

要按某个特定网络所看到的流量路径进行跟踪，例如从 LAN 地址而不是 WAN 地址出发，请设置探测包的源地址。匹配该源地址的[路由规则](../user-guides/routing-and-networking-protocols/policy-routing.md)也会作用于探测包，因此 `src-address` 也能跟踪策略路由表所走的路径：

```ros
/tool/traceroute 198.51.100.10 src-address=192.168.88.1
```

`interface` 会从某一个接口发出探测包。当该接口上没有覆盖目的地的路由时，路由器会把目的地视为该接口上的直连地址并为其发送 ARP 请求，因此跟踪只会一直超时。

## 技术细节 {#technical-details}

### 探测包 {#probes}

- 探测包是 ICMP echo request。`size` 是整个 IP 包的大小：默认的 28 字节是一个 IPv4 头加一个不带任何负载的 ICMP 头。
- 一轮中的第一个探测包 TTL 为 1，之后每个探测包依次加一。一个探测包最多等待 `timeout`（默认 1 秒）以获得响应；一旦响应到达或超时时间到，就立即发送下一个探测包。
- 当目的地做出响应、某台路由器返回 destination unreachable 消息，或已发出 `max-hops`（默认 30）个探测包时，该轮结束。下一轮在该轮结束后开始，最早在上一轮开始后一秒。
- 使用 `protocol=udp` 时，探测包是发往 `port`（默认 33434）的 UDP 数据报。目的端口对每个探测包都相同；源端口则逐跳变化。目的地会以 ICMP port unreachable 消息代替 echo reply 做出响应。

### WinBox 和 WebFig 中的主机名 {#host-names-in-winbox-and-webfig}

当你在 WinBox 4 或 WebFig 的 Tools > Traceroute 中输入主机名时，路由器会使用自身的 [DNS 解析器](../network-management/dns.md)解析该名称。WinBox 3 则在其运行所在的计算机上解析该名称。

有关所有参数，请参阅 CLI 参考中的 [`/tool/traceroute`](../cli-reference/tool/traceroute.md)。
