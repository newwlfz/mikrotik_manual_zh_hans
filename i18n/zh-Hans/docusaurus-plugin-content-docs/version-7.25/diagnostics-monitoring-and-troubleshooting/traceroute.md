---
title: "Traceroute"
description: "RouterOS traceroute 工具：列出到目标主机的路径上的路由器，查看每跳的丢包和往返统计信息，定位路径中断、环路或被过滤的位置，并从 VRF 或指定的源地址进行追踪。"
tags:
  - 'traceroute'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/traceroute
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Traceroute 列出数据包到达远程主机途中经过的路由器，并显示每个路由器响应的探测次数以及响应时间。使用它可定位连接失败或变慢的位置：在你的网络中、ISP 网关处或更远的位置。若只需测试某台主机是否响应，请使用 [ping](/docs/diagnostics-monitoring-and-troubleshooting/ping)。

Traceroute 依赖 IP 头中的 time to live（TTL）字段，该字段可防止路由环路：每台路由器转发数据包时都会递减其 TTL，当 TTL 降为零时，路由器会丢弃该数据包，并向发送方发回 ICMP time exceeded 消息。Traceroute 发送第一个探测包时将 TTL 设为 1，因此路径上的第一台路由器会响应；下一个探测包的 TTL 为 2，可到达第二台路由器，依此类推，直到探测包到达目标，由目标自身响应。

RouterOS 发送 ICMP echo 请求作为探测包，最多可探测 30 跳。一轮完成后，它会开始下一轮，最快每秒一次，并像 `mtr` 工具一样保留每一跳的统计信息，直到你使用 <kbd>Control</kbd>+<kbd>C</kbd> 停止它，或完成 `count` 轮，或运行达到 `duration`。其他系统也有类似工具：类 Unix 系统上的 `traceroute` 或 `tracepath`，以及 Windows 上的 `tracert`。

## 跟踪到主机的路径 {#trace-the-path-to-a-host}

要跟踪到服务器的路径，执行三轮探测：

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

数据包在到达服务器前经过两台路由器：203.0.113.1 和 203.0.113.6。`#` 列从 0 开始，因此第 0 行是第一跳。表格会在每轮后原地更新。各列含义如下：

- `ADDRESS` - 为该跳响应的路由器地址：即它发送响应时使用的地址，通常是其面向你的接口地址。
- `LOSS` - 发往该跳但未收到响应的探测包所占比例。
- `SENT` - 发往该跳的探测包数量。
- `LAST`、`AVG`、`BEST`、`WORST` - 最后一次响应的往返时间，以及平均、最短和最长往返时间，单位为毫秒。当最后一个探测包未收到响应时，`LAST` 显示 `timeout`。
- `STD-DEV` - 往返时间的标准差，单位为毫秒：表示各轮之间往返时间的变化程度。
- `STATUS` - 当某跳以错误而非 time exceeded 响应时显示，例如防火墙拒绝流量时。

## 显示主机名 {#show-host-names}

使用 `use-dns=yes` 时，traceroute 会显示每一跳的主机名，而不是其地址。路由器会通过自身的 [DNS 解析器](/docs/network-management/dns) 使用反向 DNS 查询来查找名称，因此没有反向 DNS 记录的跳会保留其地址。目标也可以主机名表示：

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

名称可以显示路由器所属的网络或位置。

## 查找路径中断位置 {#find-where-the-path-breaks}

当主机不响应时，traceroute 会显示数据包能够到达的距离。以下每个输出都显示一种典型结果。

### 跳点停止响应 {#hops-stop-answering}

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

第一台路由器响应，之后的设备均不响应。问题位于最后一个响应的跳点之后：链路断开、缺少路由、缺少返回你的地址的路由（例如，当使用设置为远程网络不会回程路由的 LAN 地址的 `src-address` 进行跟踪时），或者防火墙丢弃数据包且不作响应。检查路由器 203.0.113.1：其到目标的路由以及到下一跳的链路。未设置 `max-hops` 时，跟踪会继续显示超时，最多 30 跳。

当路径上的每台路由器都响应，但目标本身丢弃 ICMP echo 请求时，也会出现相同的输出：最后一跳路由器之后的行保持为空。[Ping](/docs/diagnostics-monitoring-and-troubleshooting/ping) 目标，或在目标位于直连子网时使用的 [ARP ping](/docs/diagnostics-monitoring-and-troubleshooting/ping#find-a-host-that-does-not-answer-ping)。

### 路由器拒绝流量 {#a-router-rejects-the-traffic}

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

路由器 203.0.113.1 用错误响应第二个探测包，而不是转发它，跟踪到此结束；其后的空行是探测包未到达的跳。`host unreachable from 203.0.113.1` 表示路由器无法将数据包送达主机；使用 `reject-with=icmp-host-unreachable` 拒绝数据包的防火墙规则会给出相同响应。`network unreachable from 203.0.113.1` 表示路由器没有到目标网络的路由，或者防火墙规则使用默认 `reject` 动作拒绝数据包。`packet filtered from 203.0.113.1` 表示路由器上的防火墙以管理上禁止的方式拒绝数据包（`reject-with=icmp-admin-prohibited`）；[ping](/docs/diagnostics-monitoring-and-troubleshooting/ping) 会显示与 `admin prohibited` 相同的响应。

### 相同的路由器重复出现 {#the-same-routers-repeat}

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

两台路由器交替出现：这是路由环路。它们各自将目标路由到另一台路由器，因此数据包来回传递，直到 TTL 耗尽。检查两台路由器上到目标的路由。此时，到目标的 [ping](/docs/diagnostics-monitoring-and-troubleshooting/ping) 会从其中一台路由器报告 `TTL exceeded`，而不是收到回复。

路由器 203.0.113.1 在与来自你的探测包不同的接口上接收来自 203.0.113.6 的环路数据包，但它始终使用朝向你的地址进行响应。

### 一跳显示丢包，后续跳不显示 {#one-hop-shows-loss-later-hops-do-not}

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

路由器 203.0.113.6 在十个探测包中只响应了一个，但所有到服务器的探测包都得到了响应，而这些探测包都经过同一台路由器。许多路由器会限制发送 time exceeded 消息的频率，或为其分配较低优先级，因此未在后续跳继续出现的丢包并不是路径上的数据包丢失。真正的数据包丢失从某一跳开始，并在其后的每一跳上显示。从不发送 time exceeded 消息的路由器会显示为 100% 丢包且在没有响应的跳之间没有地址的跳。

### 往返时间增长 {#round-trip-times-grow}

某一跳的往返时间包括从该路由器返回你的路径。如果某一跳的时间上升，并且后续每一跳都保持较高，说明该跳之前存在缓慢、过长或拥塞的链路。如果只有某一跳的时间很高或 `STD-DEV` 很大，而后续时间正常，则表示该路由器响应较慢，而不是经过它的流量较慢。

## 查找 MTU 较小的跳 {#find-the-hop-with-the-smaller-mtu}

使用 `do-not-fragment` 和较大的 `size` 时，探测包无法分片，必须通过 MTU 较小的链路转发它们的路由器会返回错误：

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

路由器 203.0.113.6 的链路 MTU 较小。要查找路径 MTU，请参阅 ping 页面上的 [查找路径 MTU](/docs/diagnostics-monitoring-and-troubleshooting/ping#find-the-path-mtu)。

## 从 VRF 或指定源地址进行跟踪 {#trace-from-a-vrf-or-a-specific-source}

默认情况下，traceroute 使用主路由表发送探测包，源地址为出接口的地址。在运营商路由器上，客户网络通常位于 [VRF](/docs/user-guides/routing-and-networking-protocols/vrf) 中；`vrf` 可跟踪客户流量所经过的路径：

```ros
/tool/traceroute 198.51.100.10 vrf=customer1
```

`vrf` 只接受 VRF。为策略路由创建的路由表不是 VRF，命令会拒绝它。

要按特定网络中的流量所见的路径进行跟踪，例如从 LAN 地址而不是 WAN 地址跟踪，请设置探测包的源地址。匹配源地址的 [路由规则](/docs/user-guides/routing-and-networking-protocols/policy-routing) 也适用于探测包，因此 `src-address` 也可跟踪策略路由表的路径：

```ros
/tool/traceroute 198.51.100.10 src-address=192.168.88.1
```

`interface` 通过一个接口发送探测包。当没有经过该接口的路由覆盖目标时，路由器会将目标视为在该接口上直连，并为其发送 ARP 请求，因此跟踪只会超时。

## 技术细节 {#technical-details}

### Probes

- 探测包是 ICMP echo 请求。`size` 是整个 IP 数据包的大小：默认值 28 字节包含 IPv4 头部和 ICMP 头部，不含任何有效载荷。
- 一轮中的第一个探测包 TTL 为 1，之后每个探测包的 TTL 增加 1。探测包最多等待 `timeout` 秒以接收应答，默认值为 1 秒；应答到达或超时到期后，立即发送下一个探测包。
- 当目的地应答、路由器以目标不可达消息应答，或发送了 `max-hops` 个探测包时，一轮结束，默认值为 30。下一轮在该轮完成后开始，最早为上一轮开始后 1 秒。
- 使用 `protocol=udp` 时，探测包是发往 `port` 的 UDP 数据报，默认端口为 33434。每个探测包的目的端口相同；源端口随跳数变化。目的地以 ICMP 端口不可达消息应答，而不是 echo reply。

### WinBox 和 WebFig 中的主机名 {#host-names-in-winbox-and-webfig}

当你在 WinBox 4 或 WebFig 的 Tools > Traceroute 中输入主机名时，路由器会使用自身的 [DNS 解析器](/docs/network-management/dns)解析该名称。WinBox 3 会在运行它的计算机上解析该名称。

有关所有参数，请参阅 CLI 参考中的 [`/tool/traceroute`](/docs/cli-reference/tool/traceroute)。
