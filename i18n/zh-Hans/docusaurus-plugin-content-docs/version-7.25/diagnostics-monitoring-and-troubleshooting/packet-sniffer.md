---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/packet-sniffer"
sidebar_position: 4
title: "数据包嗅探器"
sidebar_label: "数据包嗅探器"
description: "RouterOS 数据包嗅探器：在路由器上捕获数据包，对其进行过滤，在控制台中实时查看，将其保存到 pcapng 文件以供 Wireshark 使用，或通过 TZSP 将其流式传输到 PC，并了解嗅探器无法看到的内容。"
tags:
  - 'packet-sniffer'
  - 'filtering'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/packet-sniffer
captured_at: '2026-11-04T11:15:27+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

数据包嗅探器会捕获路由器接收、发送和转发的数据包。用它来诊断网络问题：设备是否发送请求并收到应答、哪些数据包到达某个接口，或者一次协议交互是什么样子。你可以在控制台中实时查看数据包，将它们保存到文件供 [Wireshark](https://www.wireshark.org/) 使用，或者在捕获时将数据包流式传输到 PC。

嗅探器将捕获的数据包保存在内存中，默认 100 KiB。过滤器决定它捕获哪些数据包；没有过滤器时，它会捕获每个接口上的所有内容，在繁忙的路由器上这会很快填满内存。捕获内容包含用户的流量，因此请像对待其他私有数据一样对待这些文件。

## 捕获数据包并在 Wireshark 中打开 {#capture-packets-and-open-them-in-wireshark}

192.168.88.50 上的一台计算机无法打开网站。在 LAN 网桥上启动嗅探器，并使用针对该计算机地址的过滤器，复现问题，停止嗅探器并将数据包保存到文件：

```ros
/tool/sniffer/start interface=bridge ip-address=192.168.88.50/32
/tool/sniffer/stop
/tool/sniffer/save file-name=capture.pcap
```

在 LAN 侧捕获：在 WAN 接口上，源 NAT 已经将计算机的地址替换为路由器的地址。

从路由器的文件中下载 `capture.pcap`（WinBox 或 WebFig 中的 Files 菜单，或 `scp admin@192.168.88.1:capture.pcap .`），并在 Wireshark 中打开它。无论扩展名是什么，该文件都是 pcapng 格式，并为每个数据包记录接口、方向以及纳秒级分辨率的时间戳。

要在嗅探器运行时将数据包写入文件，请先设置文件名：

```ros
/tool/sniffer/set file-name=capture.pcap file-limit=10000KiB
/tool/sniffer/start interface=bridge ip-address=192.168.88.50/32
```

每次启动都会覆盖该文件。当文件达到 `file-limit` 时，嗅探器会停止写入该文件，但会继续运行。对于长时间捕获，请将文件写入 USB 磁盘或 [RAM 磁盘](../storage/tmpfs.md) 而不是路由器的闪存，并使用类似 `file-name=usb1/capture.pcap` 的路径。要停止写入文件，请设置 `file-name=""`。

## 实时查看数据包 {#watch-packets-live}

`quick` 会在匹配的数据包到达时在控制台中显示它们，而不更改设置。它会一直运行，直到你按下 <kbd>Q</kbd>，或者运行到 `duration`；`proplist` 选择列。要查看 ether1 上路由器的 DHCP 客户端是否收到应答，请按端口过滤：DHCP 客户端启动时没有地址，因此地址过滤器会漏掉它的最初几个数据包：

```ros
/tool/sniffer/quick interface=ether1 port=bootps,bootpc duration=10s \
    proplist=time,dir,src-address,dst-address,size
```

```text
Columns: TIME, DIR, SRC-ADDRESS, DST-ADDRESS, SIZE
TIME      DIR  SRC-ADDRESS                DST-ADDRESS                SIZE
4.922348  ->   192.168.88.24:68 (bootpc)  192.168.88.1:67 (bootps)    342
4.923657  <-   192.168.88.1:67 (bootps)   192.168.88.24:68 (bootpc)   342
```

`TIME` 计算自开始以来的秒数，`<-` 标记接收的数据包，`->` 标记发送的数据包。没有 `interface` 时，经过网桥发往路由器或从路由器发出的数据包会出现两次：一次在网桥上，一次在网桥端口上。嗅探器启动时，`quick` 不会运行。

## 在控制台中查看捕获内容 {#look-at-a-capture-in-the-console}

执行 `stop` 后，捕获的数据包会在内存中保留 10 分钟，或直到下一次 `start`，并且有四个菜单显示它们。将它们保存到文件可以保留更长时间：

```ros
/tool/sniffer/packet/print
```

```text
Columns: TIME, INTERFACE, SRC-ADDRESS, DST-ADDRESS, IP-PROTOCOL, SIZE, CPU
#  TIME      INTERFACE  SRC-ADDRESS    DST-ADDRESS    IP-PROTOCOL  SIZE  CPU
0  1.191491  bridge     192.168.88.1   192.168.88.10  icmp           70    3
1  1.191726  bridge     192.168.88.10  192.168.88.1   icmp           70    0
2  2.193866  bridge     192.168.88.1   192.168.88.10  icmp           70    2
3  2.194027  bridge     192.168.88.10  192.168.88.1   icmp           70    0
```

`/tool/sniffer/protocol/print` 按协议、IP 协议和端口统计数据包和字节数，以及它们在捕获内容中的占比。`/tool/sniffer/host/print` 显示每个地址的速率、峰值速率和总字节数，每一项都是两个值：发往该地址和从该地址发出。速率在捕获停止时计算：

```text
Columns: ADDRESS, RATE, PEAK-RATE, TOTAL
#  ADDRESS        RATE           PEAK-RATE      TOTAL
0  192.168.88.1   560bps/560bps  560bps/560bps  280/280
1  192.168.88.10  560bps/560bps  560bps/560bps  280/280
```

`/tool/sniffer/connection/print` 列出 TCP 连接及其每个方向上的字节数、重传次数和 MSS：

```text
Columns: SRC-ADDRESS, DST-ADDRESS, BYTES, RESENDS, MSS
# SRC-ADDRESS          DST-ADDRESS              BYTES     RESENDS  MSS
0 192.168.88.1:55042   192.168.88.10:80 (http)  104/1536  0/0      1460/1460
```

要查看当前哪些主机使用最多带宽，请改用 [Torch](./torch.md)：它会实时显示速率。

## 将数据包流式传输到 Wireshark {#stream-packets-to-wireshark}

嗅探器可以通过 TaZmen Sniffer Protocol (TZSP) 将每个捕获的数据包发送到 PC，因此 Wireshark 可以在捕获数据包时显示它们。将 PC 的地址设置为 `streaming-server`（端口默认为 37008），并开启 `filter-stream`：

```ros
/tool/sniffer/set streaming-enabled=yes streaming-server=192.168.88.10 \
    filter-stream=yes
/tool/sniffer/start interface=ether1
```

仅指定 `interface` 时，嗅探器会流式传输 ether1 的所有流量。每个捕获的数据包都会再次以未加密的 UDP 数据包形式穿过网络，因此流式传输繁忙接口会增加通往 PC 的路径负载。

`filter-stream=yes` 可防止嗅探器捕获它自己的流数据包。没有它时（默认值为 `no`），当流经过被嗅探的接口离开时，嗅探器会捕获这些流数据包并再次流式传输它们，形成循环。使用 `yes` 时，嗅探器还会排除发往 PC 和来自 PC 的 ICMP 数据包，即使流式传输已关闭也是如此。

在 Wireshark 中，使用捕获过滤器 `udp port 37008` 在 PC 的网络接口上捕获，或使用显示过滤器 `udp.port==37008` 仅显示该流。Wireshark 会解码 TZSP 数据包，并在其中显示捕获的帧：

![Wireshark display filter bar with the filter udp.port==37008](/img/f97b4838589f3f84.webp)

要停止流式传输，请设置 `streaming-enabled=no`；该设置会一直保留，直到你更改它。

## 选择要捕获的内容 {#choose-what-to-capture}

使用 `/tool/sniffer/set` 设置过滤器，以便在每次捕获时保留它们，或者将它们提供给 `start` 或 `quick` 以用于一次运行。参数是去掉 `filter-` 的过滤器名称（`interface`、`ip-address`、`port`），以及用于 `filter-vlan` 的 `vlan-id`。带参数时，只有给出的过滤器生效：未重复给出的已保存过滤器在该次运行中会被忽略。不带参数时，已保存的过滤器会生效，因此请用 `/tool/sniffer/print` 检查它们，并用 `/tool/sniffer/reset` 清除所有设置。

- `filter-interface` - 要嗅探的接口。空表示所有接口。
- `filter-ip-address`、`filter-src-ip-address`、`filter-dst-ip-address` 以及 IPv6 和 MAC 地址变体 - 任一方向上的地址，作为源或作为目标。对于流的单个方向，请使用源和目标过滤器。
- `filter-port`、`filter-src-port`、`filter-dst-port` - 端口，按编号或名称（`ssh`、`dns`、`bootps`）。
- `filter-ip-protocol`、`filter-mac-protocol` - 协议，按名称或编号。
- `filter-vlan` - 承载带标签帧的端口上这些帧的 VLAN ID。地址和协议过滤器匹配标签内部的数据包。在 VLAN 接口本身上，数据包是不带标签的。
- `filter-direction` - `rx` 表示在被嗅探接口上接收的数据包，`tx` 表示发送的数据包，`any`（默认）表示两者。
- `filter-operator-between-entries` - 使用 `or`（默认）时，匹配过滤器中任一条目的数据包即匹配；使用 `and` 时，它必须匹配所有条目，例如 `ip-address=192.168.88.50/32,192.168.88.1/32` 中的两个地址。

用逗号分隔多个值，并在值前加上 `!` 以排除它。不同过滤器总是组合生效：只有当数据包匹配所有已设置的过滤器时才会被捕获。

嗅探器最多在内存中保留 `memory-limit` 个数据包。使用 `memory-scroll=yes`（默认）时，内存已满时新数据包会替换最旧的数据包，因此内存中保存的是最新数据包：问题出现后立即停止嗅探器。使用 `no` 时，嗅探器保留最初的数据包，不再存储更多数据包。`only-headers=yes` 仅保留并保存数据包头，这样同样的内存或文件可以容纳更多数据包。请让 `memory-limit` 远低于路由器的可用内存（`/system/resource/print`）。

有关所有设置，请参阅 CLI 参考中的 [`/tool/sniffer`](../cli-reference/tool/sniffer/index.md)。

## 嗅探器能看到什么 {#what-the-sniffer-sees}

- 嗅探器在防火墙和 NAT 之前捕获接收的数据包，在它们之后捕获发送的数据包。它会显示随后被防火墙丢弃的数据包，但仅作为接收的数据包显示，并且会按数据包在网络线上的原样显示地址和端口。
- 嗅探器运行时，路由器会关闭 IPv4 [快速路径](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path)，并随之关闭 FastTrack，因此转发的流量会占用更多 CPU。
- 网桥在硬件中转发（硬件卸载）的数据包永远不会到达路由器的 CPU，也不会被捕获；泛洪的数据包，例如广播、组播和未知单播，则可以被捕获。
- 启用了客户端到客户端转发的无线客户端之间的单播流量不会经过嗅探器。
- 除非设置了 [流量生成器](./traffic-generator.md) 的 `fast-path` 参数，否则在同一接口上看不到它的数据包。

## 技术细节 {#technical-details}

- 数据包列表显示自捕获开始以来的时间（秒），精确到微秒。
- 从 RouterOS 7.20 起，`save` 和 `file-name` 写入 pcapng 文件；更早的版本写入 pcap。流量生成器的 `inject-pcap` 从 RouterOS 7.21 起读取 pcapng 文件。
- TZSP 流使用 TZSP 版本 1 和以太网封装，并完整承载每个捕获的帧。
