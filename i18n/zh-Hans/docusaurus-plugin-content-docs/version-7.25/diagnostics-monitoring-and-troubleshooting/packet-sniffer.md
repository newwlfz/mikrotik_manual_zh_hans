---
title: "数据包嗅探器"
description: "RouterOS 数据包嗅探器：在路由器上捕获数据包，对其进行过滤，在控制台中实时查看，将其保存到 pcapng 文件以供 Wireshark 使用，或通过 TZSP 将其流式传输到 PC，并了解嗅探器无法看到的内容。"
tags:
  - 'packet-sniffer'
  - 'filtering'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/packet-sniffer
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

数据包嗅探器可捕获路由器接收、发送和转发的数据包。使用它诊断网络问题：设备是否发送请求并收到应答、哪些数据包到达某个接口，或协议交互过程是什么样。你可以在控制台实时查看数据包，将其保存到文件中供 [Wireshark](https://www.wireshark.org/) 使用，或在捕获时将其流式传输到 PC。

嗅探器将捕获的数据包保存在内存中，默认大小为 100 KiB。过滤器决定捕获哪些数据包；没有过滤器时，它会捕获每个接口上的所有流量，在繁忙的路由器上会很快填满内存。捕获内容包含用户流量，因此应像处理其他私有数据一样处理这些文件。

## 捕获数据包并在 Wireshark 中打开 {#capture-packets-and-open-them-in-wireshark}

192.168.88.50 上的计算机无法打开网站。在 LAN 网桥上启动嗅探器，并为该计算机的地址设置过滤器，复现问题，停止嗅探器并将数据包保存到文件：

```ros
/tool/sniffer/start interface=bridge ip-address=192.168.88.50/32
/tool/sniffer/stop
/tool/sniffer/save file-name=capture.pcap
```

在 LAN 侧捕获：在 WAN 接口上，源 NAT 已将计算机的地址替换为路由器的地址。

从路由器的文件中下载 `capture.pcap`（WinBox 或 WebFig 中的 Files 菜单，或 `scp admin@192.168.88.1:capture.pcap .`），并在 Wireshark 中打开。该文件为 pcapng 格式，无论其扩展名是什么，并为每个数据包记录接口、方向和具有纳秒分辨率的时间戳。

要在嗅探器运行时将数据包写入文件，请先设置文件名：

```ros
/tool/sniffer/set file-name=capture.pcap file-limit=10000KiB
/tool/sniffer/start interface=bridge ip-address=192.168.88.50/32
```

每次启动都会覆盖该文件。当文件达到 `file-limit` 时，嗅探器会停止写入该文件，但会继续运行。对于长时间捕获，请将文件写入 USB 磁盘或 [RAM disk](/docs/storage/tmpfs)，而不是路由器的闪存，路径例如 `file-name=usb1/capture.pcap`。要停止写入文件，请设置 `file-name=""`。

## 实时查看数据包 {#watch-packets-live}

`quick` 会在数据包到达时在控制台中显示匹配的数据包，不会更改设置。它会一直运行，直到你按下 <kbd>Q</kbd>，或运行到 `duration` 指定的时长；`proplist` 用于选择列。要查看路由器 ether1 上的 DHCP 客户端是否收到应答，请按端口过滤：DHCP 客户端启动时没有地址，因此地址过滤会漏掉它的首批数据包：

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

`TIME` 表示自开始以来的秒数，`<-` 表示接收的数据包，`->` 表示发送的数据包。未指定 `interface` 时，经由网桥进出路由器的数据包会出现两次：一次在网桥上，一次在网桥端口上。sniffer 启动后，`quick` 不会运行。

## 在控制台中查看捕获内容 {#look-at-a-capture-in-the-console}

执行 `stop` 后，捕获的数据包会在内存中保留 10 分钟，或保留到下一次 `start`，并有四个菜单可显示它们。要更长时间保存，请将它们保存到文件：

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

`/tool/sniffer/protocol/print` 按协议、IP 协议和端口统计数据包和字节数，以及它们在捕获内容中的占比。`/tool/sniffer/host/print` 按地址显示速率、峰值速率和总字节数，每个地址均显示两个值：发往该地址和来自该地址。速率在捕获停止时计算：

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

要查看当前哪些主机占用的带宽最多，请改用 [Torch](/docs/diagnostics-monitoring-and-troubleshooting/torch)：它会实时显示速率。

## 将数据包流式传输到 Wireshark {#stream-packets-to-wireshark}

sniffer 可以通过 TaZmen Sniffer Protocol（TZSP）将每个捕获的数据包发送到 PC，使 Wireshark 在捕获时显示这些数据包。将 PC 的地址设置为 `streaming-server`（端口默认为 37008），并启用 `filter-stream`：

```ros
/tool/sniffer/set streaming-enabled=yes streaming-server=192.168.88.10 \
    filter-stream=yes
/tool/sniffer/start interface=ether1
```

仅指定 `interface` 时，sniffer 会流式传输 ether1 的所有流量。每个捕获的数据包都会再次穿越网络，并封装在未加密的 UDP 数据包中，因此对繁忙接口进行流式传输会增加通往 PC 的路径负载。

`filter-stream=yes` 可防止 sniffer 捕获自身的流式传输数据包。如果不启用它（默认为 `no`），当流从被嗅探的接口发出时，sniffer 会捕获这些流数据包并再次流式传输，形成循环。启用 `yes` 后，即使流式传输关闭，sniffer 也会排除往返 PC 的 ICMP 数据包。

在 Wireshark 中，使用捕获过滤器 `udp port 37008` 在 PC 的网络接口上捕获，或使用显示过滤器 `udp.port==37008` 仅显示流。Wireshark 会解码 TZSP 数据包，并显示其中的捕获帧：

![Wireshark display filter bar with the filter udp.port==37008](/img/f97b4838589f3f84.webp)

要停止流式传输，请设置 `streaming-enabled=no`；该设置会一直保留，直到你更改它。

## 选择要捕获的内容 {#choose-what-to-capture}

使用 `/tool/sniffer/set` 设置过滤器，使其对每次捕获都保留；也可以将过滤器作为参数提供给 `start` 或 `quick`，仅用于一次运行。参数是不带 `filter-` 的过滤器名称（`interface`、`ip-address`、`port`），以及对应 `filter-vlan` 的 `vlan-id`。使用参数时，仅应用指定的过滤器：未重复指定的已保存过滤器在该次运行中被忽略。不使用参数时，将应用已保存的过滤器，因此请使用 `/tool/sniffer/print` 检查它们，并使用 `/tool/sniffer/reset` 清除所有设置。

- `filter-interface` - 要嗅探的接口。为空表示所有接口。
- `filter-ip-address`、`filter-src-ip-address`、`filter-dst-ip-address` 以及 IPv6 和 MAC 地址变体 - 任一方向上的地址，可作为源地址或目的地址。对于流的单一方向，请使用源地址和目的地址过滤器。
- `filter-port`、`filter-src-port`、`filter-dst-port` - 端口，按编号或名称指定（`ssh`、`dns`、`bootps`）。
- `filter-ip-protocol`、`filter-mac-protocol` - 协议，按名称或编号指定。
- `filter-vlan` - 承载带标签帧的端口上的 VLAN ID。地址和协议过滤器匹配标签内的数据包。在 VLAN 接口本身上，数据包不带标签。
- `filter-direction` - `rx` 表示在嗅探接口上收到的数据包，`tx` 表示发送的数据包，`any`（默认）表示两者。
- `filter-operator-between-entries` - 使用 `or`（默认）时，数据包匹配过滤器的任一条目即匹配；使用 `and` 时，必须匹配所有条目，例如 `ip-address=192.168.88.50/32,192.168.88.1/32` 中的两个地址。

用逗号分隔多个值，并在值前加 `!` 以排除该值。不同过滤器始终组合匹配：只有当数据包匹配所有已设置的过滤器时，才会被捕获。

嗅探器在内存中最多保留 `memory-limit` 个数据包。使用 `memory-scroll=yes`（默认）时，内存已满后新数据包会替换最旧的数据包，因此内存中保留最新的数据包：问题出现后立即停止嗅探器。使用 `no` 时，嗅探器保留最初的数据包，不再存储更多数据包。`only-headers=yes` 仅保留和保存数据包头，从而可在相同内存或文件中容纳更多数据包。请将 `memory-limit` 设置为远低于路由器的可用内存（`/system/resource/print`）。

所有设置请参阅 CLI 参考中的 [`/tool/sniffer`](/docs/cli-reference/tool/sniffer)。

## 嗅探器可见的内容 {#what-the-sniffer-sees}

- 嗅探器在防火墙和 NAT 之前捕获收到的数据包，在防火墙和 NAT 之后捕获发送的数据包。它显示随后被防火墙丢弃的数据包（仅显示为已收到），并按线路上的实际形式显示地址和端口。
- 嗅探器运行时，路由器会关闭 IPv4 [fast path](/docs/firewall-and-quality-of-service/packet-flow-in-routeros#fast-path)，并同时关闭 FastTrack，因此转发流量会占用更多 CPU。
- 由网桥通过硬件转发（硬件卸载）的数据包不会到达路由器的 CPU，也不会被捕获；广播、组播和未知单播等泛洪数据包可以被捕获。
- 启用客户端到客户端转发的无线客户端之间的单播流量不会经过嗅探器。
- [traffic generator](/docs/diagnostics-monitoring-and-troubleshooting/traffic-generator) 的数据包在同一接口上不可见，除非其 `fast-path` 参数已设置。

## 技术细节 {#technical-details}

- 数据包列表显示自捕获开始以来的时间，单位为秒，并包含微秒。
- `save` 和 `file-name` 从 RouterOS 7.20 开始写入 pcapng 文件；早期版本写入 pcap。流量生成器的 `inject-pcap` 从 RouterOS 7.21 开始读取 pcapng 文件。
- TZSP 流使用 TZSP version 1 和 Ethernet 封装，并完整承载每个捕获的帧。
