---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/torch"
sidebar_position: 3
title: "Torch"
sidebar_label: "Torch"
description: "Torch 显示当前经过一个接口的流量，按地址、协议、端口和 DSCP 分组为流，并显示每个方向上的速率。找出占用带宽的主机，监视某个协议或端口，检查 VLAN 标签和 DSCP 标记，查看防火墙丢弃的流量，并查看由哪个 CPU 处理。"
tags:
  - 'traffic-monitoring'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/torch
captured_at: '2026-11-04T11:15:34+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Torch 显示当前通过某个接口的流量。它把数据包按流分组，每一行对应地址、协议、端口和 DSCP 值的一种组合，并显示每条流在两个方向上的速率。用它来查明谁在使用某条链路、链路上运行哪些协议，或者某个连接的报文是否到达。

Torch 在防火墙过滤之前就看到收到的报文，因此被防火墙规则丢弃的流量仍会显示在其到达的接口上。路由器发出的报文在离开时被计数，因此在 forward 链中被丢弃的流量不会出现在出接口上。Torch 运行期间，路由器会关闭 IP fast path 和 FastTrack，与使用[数据包嗅探器](./packet-sniffer.md)时一样；在繁忙的路由器上，这段时间 CPU 负载会升高。若要查看报文内容或将其保存到文件，请改用数据包嗅探器。

Torch 会一直运行，直到你用 <kbd>Control</kbd>+<kbd>C</kbd> 停止它。若要在一段设定时间后停止，请添加 `duration`，例如 `duration=10s`。

观看[关于 Torch 的视频](https://youtu.be/45E2uwI3xhc)。

## 查看通过某个接口的流量 {#see-what-passes-an-interface}

为 Torch 指定要监视的接口。接口名可以不写 `interface=`：

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

表格每秒更新一次，直到你停止 Torch。在本例中，192.168.88.21 向路由器发送 ping，192.168.88.20 运行带宽测试，从路由器接收 2 Mbps。

每一行是两个地址之间的一条流：

- `SRC-ADDRESS` 和 `SRC-PORT` - 接口远端的地址和端口：即接口从其一侧接收流量的那一端。即使会话由路由器发起，或者流量由路由器转发，这一点同样成立。
- `DST-ADDRESS` 和 `DST-PORT` - 流的另一端。端口号会连同其服务名称一起显示，例如 `2000 (btserv)`。
- `RX` - 接口从 `SRC-ADDRESS` 接收流量的速率，单位为比特每秒。
- `TX` - 接口向 `SRC-ADDRESS` 发送流量的速率，单位为比特每秒。
- `TX-PACKETS` 和 `RX-PACKETS` - 同样这两个方向上的包速率。

只有当某条流在某一列有值时，该列才会出现：仅当存在 TCP 或 UDP 流时，端口列才会出现。

## 找出占用带宽的主机 {#find-the-host-that-uses-the-bandwidth}

在 LAN 接口上，`SRC-ADDRESS` 是 LAN 主机，因此 `TX` 是该主机下载的流量，`RX` 是其上传的流量。速率最高的行显示谁在使用连接。连接很多的主机（例如网页浏览器）会有很多行；按其地址过滤即可一起查看。请监视 LAN 接口，而不是 WAN 接口：经过源 NAT 后，WAN 接口上的流携带的是路由器的公网地址，而不是各主机的地址。

要监视某一台主机，请按其地址过滤：

```ros
/tool/torch bridge src-address=192.168.88.21/32
```

```text
Columns: MAC-PROTOCOL, IP-PROTOCOL, DSCP, SRC-ADDRESS, DST-ADDRESS, TX, RX, TX-PACKETS, RX-PACKETS
MAC-PROTOCOL  IP-PROTOCOL  DSCP  SRC-ADDRESS    DST-ADDRESS   TX         RX         TX-PACKETS  RX-PACKETS
ip            icmp            0  192.168.88.21  192.168.88.1  197.3kbps  197.3kbps          48          48
```

地址过滤器按 Torch 显示的各列进行匹配：`src-address` 匹配 `SRC-ADDRESS`，即接口远端，`dst-address` 匹配 `DST-ADDRESS`。在 LAN 接口上，请用 `src-address` 过滤主机；把 `dst-address` 设为 LAN 主机在该接口上通常匹配不到任何内容。对于 IPv6，请使用 `src-address6` 和 `dst-address6`。

## 监视某一种协议或端口 {#watch-one-protocol-or-port}

要只显示某一种 IP 协议或某一个端口，请使用 `ip-protocol` 和 `port`：

```ros
/tool/torch bridge ip-protocol=tcp port=443
```

`port` 匹配 `SRC-PORT` 或 `DST-PORT`。它只接受一个端口或 `any`；像 `port=80,443` 这样的列表会失败并报 `expected end of command`。端口过滤只适用于带端口的流：不带端口的流（例如 ICMP）在设置端口过滤后仍会出现。

## 检查 VLAN 标签和 DSCP 标记 {#check-vlan-tags-and-dscp-marking}

在承载带标签 VLAN 的接口上，Torch 会为带标签的流量增加一个 `VLAN-ID` 列。要检查流量是否以正确的 DSCP 值到达正确的 VLAN，例如 VLAN 99 中 DSCP 46（Expedited Forwarding）的语音流量，请监视父接口。在本例中，一个标记为 DSCP 46 的测试 ping 在 VLAN 99 中运行：

```ros
/tool/torch ether1
```

```text
Columns: VLAN-ID, MAC-PROTOCOL, IP-PROTOCOL, DSCP, SRC-ADDRESS, DST-ADDRESS, TX, RX, TX-PACKETS, RX-PACKETS
VLAN-ID  MAC-PROTOCOL  IP-PROTOCOL  DSCP  SRC-ADDRESS   DST-ADDRESS   TX         RX         TX-PACKETS  RX-PACKETS
     99  ip            icmp           46  198.51.100.1  198.51.100.2  237.3kbps  235.7kbps          48          48
         ip            icmp            0  203.0.113.1   203.0.113.2   120.5kbps  120.5kbps          48          48
```

第一行带有 VLAN 99 标签并标记为 DSCP 46；第二行不带标签。`vlan-id=99` 或 `dscp=46` 只显示匹配的流。在 VLAN 接口本身上，帧已经不带标签，因此在那里不会出现 `VLAN-ID` 列。对于不带标签的设备（例如接在网桥端口上的电话），请监视网桥并按该电话的地址过滤，例如 `src-address=192.168.88.30/32`。

DSCP 值是流的一部分，因此当一次会话的两个方向标记不同时，它们会显示为两行：一行只有 `RX`，一行只有 `TX`。此处请求以 DSCP 46 到达，应答以 DSCP 0 发出：

```ros
/tool/torch ether1
```

```text
Columns: MAC-PROTOCOL, IP-PROTOCOL, DSCP, SRC-ADDRESS, DST-ADDRESS, TX, RX, TX-PACKETS, RX-PACKETS
MAC-PROTOCOL  IP-PROTOCOL  DSCP  SRC-ADDRESS  DST-ADDRESS  TX         RX         TX-PACKETS  RX-PACKETS
ip            icmp            0  203.0.113.1  203.0.113.2  165.6kbps  0bps               50           0
ip            icmp           46  203.0.113.1  203.0.113.2  0bps       165.6kbps           0          50
```

Torch 不显示帧的 VLAN 优先级（PCP）；请使用[数据包嗅探器](./packet-sniffer.md)检查。

## 查看被防火墙丢弃的流量 {#see-traffic-that-the-firewall-drops}

Torch 在防火墙之前统计报文，因此它会显示被防火墙规则丢弃的流量。在本例中，input 链中的一条规则丢弃来自 192.168.88.21 的 ping：

```ros
/tool/torch bridge src-address=192.168.88.21/32
```

```text
Columns: MAC-PROTOCOL, IP-PROTOCOL, DSCP, SRC-ADDRESS, DST-ADDRESS, TX, RX, TX-PACKETS, RX-PACKETS
MAC-PROTOCOL  IP-PROTOCOL  DSCP  SRC-ADDRESS    DST-ADDRESS   TX    RX         TX-PACKETS  RX-PACKETS
ip            icmp            0  192.168.88.21  192.168.88.1  0bps  197.3kbps           0          48
```

请求到达（`RX`），而路由器没有回送任何内容（`TX` 为 0）。流量只在一个方向上出现，这种情形也可能表示某个连接的应答走了另一条路径或根本没有到来，因此请检查该规则自身的计数器以确认它丢弃了流量：`/ip/firewall/filter/print stats`（见[过滤器](../firewall-and-quality-of-service/firewall/filter.md)）。

## 查看由哪个 CPU 处理流量 {#see-which-cpu-handles-the-traffic}

在多 CPU 的路由器上，`cpu=any` 会增加一个 `CPU` 列，每个处理过某条流中报文的 CPU 各占一行。用它来查看一条大流量是否让单个 CPU 一直繁忙：

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

此处路由器发往 192.168.88.20 的 ping 从 CPU 0、1 和 3 发出，而应答在 CPU 0 上接收。

## 技术细节 {#technical-details}

### 快速路径 {#fast-path}

Torch 运行期间，路由器会为所有流量关闭 IP fast path 和 FastTrack，而不仅是在被监视的接口上。Torch 停止后两者都会恢复。

### Torch 看不到的流量 {#traffic-that-torch-does-not-see}

Torch 能看到在被监视接口上到达路由器 CPU 的报文：

- 在启用硬件卸载的网桥上，交换芯片在端口之间转发流量而不经过 CPU，因此 Torch 看不到它。未知单播、广播和部分组播流量仍会到达 CPU，因而仍然可见。参见[启用硬件卸载和 MAC 学习时的报文流](../bridging-and-switching/user-guides/layer2-misconfiguration.md#packet-flow-with-hardware-offloading-and-mac-learning)。
- 使用 [L3 硬件卸载](../bridging-and-switching/l3-hardware-offloading.md)时，由交换芯片转发的路由流量同样不会到达 CPU。
- 启用客户端到客户端转发时，无线客户端之间的单播流量对 Torch 不可见。

Torch 显示协议和 IP 地址，而不显示 MAC 地址。要查找主机的 MAC 地址，请查看它在 [DHCP 服务器](../network-management/dhcp/server.md#leases)中的租约。

有关所有参数，请参见 CLI 参考中的 [`/tool/torch`](../cli-reference/tool/torch.md)。
