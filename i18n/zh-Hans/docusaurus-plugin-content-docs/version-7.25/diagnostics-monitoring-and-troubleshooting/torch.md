---
title: "Torch"
description: "Torch 显示当前通过某个接口的流量，并按地址、协议、端口和 DSCP 将其分组为流，同时显示每个方向的速率。查找占用带宽的主机，观察某个协议或端口，检查 VLAN 标签和 DSCP 标记，查看防火墙丢弃的流量，并查看由哪个 CPU 处理该流量。"
tags:
  - 'traffic-monitoring'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/torch
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Torch 显示当前通过一个接口的数据流量。它将数据包按流分组，每个地址、协议、端口和 DSCP 值组合对应一行，并显示每个流在两个方向上的速率。使用它可查明谁在使用链路、链路上运行哪些协议，或者某个连接的数据包是否到达。

Torch 在防火墙过滤之前查看收到的数据包，因此被防火墙规则丢弃的流量仍会显示在数据包到达的接口上。路由器发送的数据包在离开时计数，因此在 forward 链中丢弃的流量不会显示在出接口上。Torch 运行时，路由器会关闭 IP fast path 和 FastTrack，与 [packet sniffer](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer) 的行为相同；在繁忙的路由器上，此期间 CPU 负载会升高。要查看数据包内容或将其保存到文件，请改用 packet sniffer。

Torch 会一直运行，直到你使用 <kbd>Control</kbd>+<kbd>C</kbd> 停止它。要在指定时间后停止，请添加 `duration`，例如 `duration=10s`。

观看 [有关 Torch 的视频](https://youtu.be/45E2uwI3xhc)。

## 查看通过接口的内容 {#see-what-passes-an-interface}

指定 Torch 要监视的接口。接口名称可以不带 `interface=` 给出：

```ros
/tool/torch bridge
```

```text
Columns: MAC-PROTOCOL, IP-PROTOCOL, DSCP, SRC-ADDRESS, SRC-PORT, DST-ADDRESS, DST-PORT, TX, RX, TX-PACKETS, RX-PACKETS
MAC-PROTOCOL  IP-PROTOCOL  DSCP  SRC-ADDRESS    SRC-PORT  DST-ADDRESS   DST-PORT        TX         RX         TX-PACKETS  RX-PACKETS
ip            icmp            0  192.168.88.21            192.168.88.1                  197.3kbps  197.3kbps          48          48
ip            tcp             0  192.168.88.20     58910  192.168.88.1  2000 (btserv)   1152bps    1152bps             2           2
ip            udp             0  192.168.88.20      2257  192.168.88.1  2001 (glimpse)  2.0Mbps    0bps              172           0
```

该表每秒更新一次，直到你停止 Torch。在此示例中，192.168.88.21 对路由器执行 ping 操作，192.168.88.20 运行带宽测试，从路由器接收 2 Mbps 的流量。

每一行表示两个地址之间的一个流：

- `SRC-ADDRESS` 和 `SRC-PORT` - 接口远端的地址和端口：接口接收其流量的那一侧。即使会话由路由器发起，或流量由路由器转发，也是如此。
- `DST-ADDRESS` 和 `DST-PORT` - 流的另一端。端口号会显示对应的服务名称，例如 `2000 (btserv)`。
- `RX` - 接口从 `SRC-ADDRESS` 接收流量的速率，单位为比特每秒。
- `TX` - 接口向 `SRC-ADDRESS` 发送流量的速率，单位为比特每秒。
- `TX-PACKETS` 和 `RX-PACKETS` - 相同两个方向的速率，单位为数据包每秒。

只有当流具有对应值时才会显示列：仅当存在 TCP 或 UDP 流时，才会显示端口列。

## 查找占用带宽的主机 {#find-the-host-that-uses-the-bandwidth}

在 LAN 接口上，`SRC-ADDRESS` 是 LAN 主机，因此 `TX` 表示该主机下载的数据量，`RX` 表示其上传的数据量。速率最高的行显示了谁正在使用连接。具有许多连接的主机（例如 Web 浏览器）会有多行；按其地址过滤即可集中查看这些行。请监控 LAN 接口，而不是 WAN 接口：经过源 NAT 后，WAN 接口上的流使用路由器的公网地址，而不是各主机的地址。

要监控某一主机，请按其地址过滤：

```ros
/tool/torch bridge src-address=192.168.88.21/32
```

```text
Columns: MAC-PROTOCOL, IP-PROTOCOL, DSCP, SRC-ADDRESS, DST-ADDRESS, TX, RX, TX-PACKETS, RX-PACKETS
MAC-PROTOCOL  IP-PROTOCOL  DSCP  SRC-ADDRESS    DST-ADDRESS   TX         RX         TX-PACKETS  RX-PACKETS
ip            icmp            0  192.168.88.21  192.168.88.1  197.3kbps  197.3kbps          48          48
```

地址过滤与 Torch 显示的列匹配：`src-address` 匹配 `SRC-ADDRESS`，即接口远端；`dst-address` 匹配 `DST-ADDRESS`。在 LAN 接口上，使用 `src-address` 过滤主机；将 `dst-address` 设置为 LAN 主机通常不会匹配到任何内容。对于 IPv6，请使用 `src-address6` 和 `dst-address6`。

## 监控单个协议或端口 {#watch-one-protocol-or-port}

要仅显示一个 IP 协议或一个端口，请使用 `ip-protocol` 和 `port`：

```ros
/tool/torch bridge ip-protocol=tcp port=443
```

`port` 匹配 `SRC-PORT` 或 `DST-PORT`。它接受一个端口或 `any`；诸如 `port=80,443` 的列表会失败，并提示 `expected end of command`。端口过滤仅适用于具有端口的流：没有端口的流（例如 ICMP）仍会在使用端口过滤时显示。

## 检查 VLAN 标签和 DSCP 标记 {#check-vlan-tags-and-dscp-marking}

在承载带标签 VLAN 的接口上，Torch 会为带标签的流量添加 `VLAN-ID` 列。要检查流量是否以正确的 VLAN 和正确的 DSCP 值到达，例如 VLAN 99 中 DSCP 为 46（Expedited Forwarding）的语音流量，请监控父接口。在本例中，标记为 DSCP 46 的测试 ping 在 VLAN 99 中运行：

```ros
/tool/torch ether1
```

```text
Columns: VLAN-ID, MAC-PROTOCOL, IP-PROTOCOL, DSCP, SRC-ADDRESS, DST-ADDRESS, TX, RX, TX-PACKETS, RX-PACKETS
VLAN-ID  MAC-PROTOCOL  IP-PROTOCOL  DSCP  SRC-ADDRESS   DST-ADDRESS   TX         RX         TX-PACKETS  RX-PACKETS
     99  ip            icmp           46  198.51.100.1  198.51.100.2  237.3kbps  235.7kbps          48          48
         ip            icmp            0  203.0.113.1   203.0.113.2   120.5kbps  120.5kbps          48          48
```

第一行带有 VLAN 99 标签并标记为 DSCP 46；第二行未带标签。`vlan-id=99` 或 `dscp=46` 仅显示匹配的流。在 VLAN 接口本身上，帧已经去掉标签，因此那里不会显示 `VLAN-ID` 列。对于未带标签的设备，例如网桥端口上的电话，请监控网桥并按电话地址过滤，例如 `src-address=192.168.88.30/32`。

DSCP 值是流的一部分，因此当会话的两个方向标记不同时，它们会显示为两行：一行只有 `RX`，另一行只有 `TX`。此处请求以 DSCP 46 到达，应答以 DSCP 0 离开：

```ros
/tool/torch ether1
```

```text
Columns: MAC-PROTOCOL, IP-PROTOCOL, DSCP, SRC-ADDRESS, DST-ADDRESS, TX, RX, TX-PACKETS, RX-PACKETS
MAC-PROTOCOL  IP-PROTOCOL  DSCP  SRC-ADDRESS  DST-ADDRESS  TX         RX         TX-PACKETS  RX-PACKETS
ip            icmp            0  203.0.113.1  203.0.113.2  165.6kbps  0bps               50           0
ip            icmp           46  203.0.113.1  203.0.113.2  0bps       165.6kbps           0          50
```

Torch 不显示帧的 VLAN 优先级（PCP）；请使用 [packet sniffer](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer) 进行检查。

## 查看防火墙丢弃的流量 {#see-traffic-that-the-firewall-drops}

Torch 在防火墙之前统计数据包，因此它会显示被防火墙规则丢弃的流量。在本例中，input 链中的一条规则丢弃来自 192.168.88.21 的 ping：

```ros
/tool/torch bridge src-address=192.168.88.21/32
```

```text
Columns: MAC-PROTOCOL, IP-PROTOCOL, DSCP, SRC-ADDRESS, DST-ADDRESS, TX, RX, TX-PACKETS, RX-PACKETS
MAC-PROTOCOL  IP-PROTOCOL  DSCP  SRC-ADDRESS    DST-ADDRESS   TX    RX         TX-PACKETS  RX-PACKETS
ip            icmp            0  192.168.88.21  192.168.88.1  0bps  197.3kbps           0          48
```

请求到达（`RX`），但路由器未发送任何响应（`TX` 为 0）。同样，如果流量仅单向传输，也说明连接的回复走了另一条路径或从未返回，因此请检查规则本身的计数器，以确认其丢弃了流量：`/ip/firewall/filter/print stats`（请参阅 [Filter](/docs/firewall-and-quality-of-service/firewall/filter)）。

## 查看处理流量的 CPU {#see-which-cpu-handles-the-traffic}

在具有多个 CPU 的路由器上，`cpu=any` 会添加 `CPU` 列，并为处理某个流的数据包的每个 CPU 显示一行。使用它可查看某个重负载流是否使单个 CPU 繁忙：

```ros
/tool/torch bridge cpu=any
```

```text
Columns: CPU, MAC-PROTOCOL, IP-PROTOCOL, DSCP, SRC-ADDRESS, DST-ADDRESS, TX, RX, TX-PACKETS, RX-PACKETS
CPU  MAC-PROTOCOL  IP-PROTOCOL  DSCP  SRC-ADDRESS    DST-ADDRESS   TX         RX         TX-PACKETS  RX-PACKETS
  0  ip            icmp            0  192.168.88.20  192.168.88.1  170.3kbps  389.3kbps          21          48
  0  ip            icmp            0  192.168.88.21  192.168.88.1  201.4kbps  201.4kbps          49          49
  1  ip            icmp            0  192.168.88.20  192.168.88.1  32.4kbps   0bps                4           0
  3  ip            icmp            0  192.168.88.20  192.168.88.1  186.5kbps  0bps               23           0
```

此处，路由器发往 192.168.88.20 的 ping 从 CPU 0、1 和 3 发出，回复由 CPU 0 接收。

## 技术细节 {#technical-details}

### 快速路径 {#fast-path}

Torch 运行时，路由器会对所有流量关闭 IP fast path 和 FastTrack，而不仅是在被监视的接口上。Torch 停止后，两者都会恢复。

### Torch 无法看到的流量 {#traffic-that-torch-does-not-see}

Torch 会查看在受监视接口上到达路由器 CPU 的数据包：

- 在启用硬件卸载的网桥上，交换芯片会在端口之间转发流量而不经过 CPU，因此 Torch 看不到这些流量。未知单播、广播和部分组播流量仍会到达 CPU 并保持可见。请参阅[硬件卸载和 MAC 学习时的数据包流程](/docs/bridging-and-switching/user-guides/layer2-misconfiguration#packet-flow-with-hardware-offloading-and-mac-learning)。
- 使用 [L3 hardware offloading](/docs/bridging-and-switching/l3-hardware-offloading) 时，由交换芯片转发的路由流量也不会到达 CPU。
- 启用 client-to-client forwarding 时，无线客户端之间的单播流量对 Torch 不可见。

Torch 显示协议和 IP 地址，不显示 MAC 地址。要查找主机的 MAC 地址，请在 [DHCP server](/docs/network-management/dhcp/server#leases) 中查看其租约。

有关所有参数，请参阅 CLI 参考中的 [`/tool/torch`](/docs/cli-reference/tool/torch)。
