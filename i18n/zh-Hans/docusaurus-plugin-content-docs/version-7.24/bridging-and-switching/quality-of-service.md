---
sidebar_key: "bridging-and-switching/quality-of-service"
sidebar_position: 3
title: "服务质量"
sidebar_label: "服务质量"
description: "本文档介绍 MikroTik RouterOS 中适用于搭载 Marvell Prestera 交换芯片设备的服务质量（QoS）功能，详细说明 QoS 优先级、流量整形和拥塞管理。内容涵盖 RouterOS v7.23 的增强功能，如无损流量支持、动态缓冲区，以及针对各种交换机型号的 QoS 设备兼容性表。"
tags:
  - 'qos'
  - 'marvell-prestera'
  - 'active-queue-management'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/quality-of-service
captured_at: '2026-11-04T11:27:19+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本文档介绍在配备 **[Marvell Prestera 交换芯片](./marvell-prestera-switch-chip-features.md)** 的设备上，RouterOS 中 **服务质量（QoS）** 的实现。

QoS 是网络交换机中的一组功能，允许网络管理员对流量划分优先级并分配网络资源，以确保关键数据流能够以低延迟顺畅传输。

网络交换机中 QoS 的主要功能是以满足不同类型网络应用特定需求的方式来管理流量。例如，语音和视频数据需要低延迟和最小丢包，以确保高质量通信；而文件传输和其他数据应用则可以承受更高的延迟和丢包。

QoS 通过识别流经交换机的流量类型，并根据其需求分配优先级来工作。然后，交换机会使用这些信息修改数据包报头并确定流量传输的优先级，从而确保高优先级流量比低优先级流量获得优先处理。

需要 RouterOS v7.15 或更高版本才能支持所有 QoS 功能：

1. **QoS 标记。** 根据入站数据包报头匹配 QoS 配置文件，然后按照分配的 QoS 配置文件修改出站报头。
2. **QoS 强制执行。** 根据分配的 QoS 配置文件和流量整形来避免或解决拥塞。
3. **QoS 策略。** 通过 ACL 规则分配 QoS 配置文件。
4. 主动队列管理：**WRED**（加权随机早期检测）、**ECN** 通知与处理、**PFC**（基于优先级的流量控制）。
5. 流量整形。

### RouterOS v7.23 中的 QoS 变更 {#qos-changes-in-routeros-v723}

RouterOS v7.23 对服务质量（QoS）卸载进行了重大更改。这些更改简化了配置过程，并新增了对“无损”流量类别的支持。尽管硬件资源是有限的，但当所有连接的设备都支持这些功能并正确配置时，使用 ECN 和/或 PFC 的主动队列管理可以防止丢包。此前的 RouterOS 版本已经支持 ECN 和 PFC，但 v7.23 简化了它们的设置方式。

:::info
并非所有设备都支持无损流量。请查看 QoS 设备支持表。
:::

#### 配置变更摘要 {#configuration-change-summary}

- QoS 设置：大多数更改默认设为“auto”，允许 RouterOS 为当前设置选择最合适的已知设置。
- QoS 设置：新增 `lossless-traffic-class` 和 `lossless-buffers`，允许显式指定无损流量并为其预留队列资源。用户也可以将这些字段保留为“auto”。
- QoS 监控：分别显示有损和无损共享池的使用情况。
- Tx 队列：移除了共享池索引。RouterOS 会根据流量类型（有损或无损）自动选择共享池。
- QoS 配置文件：新增到指定 PCP 和 DSCP 值的自动映射（默认启用）。例如，添加一个 DSCP=46 的 QoS 配置文件会自动将该配置文件应用于从受信任端口接收的流量。

## QoS 术语 {#qos-terminology}

本节定义本文档中使用的关键术语和缩写：

- **QoS** - 服务质量，一组允许网络管理员对流量划分优先级并分配网络资源的功能。
- **ACL** - 访问控制列表，一组用于根据指定条件过滤网络流量的交换机规则。
- **AQM** - 主动队列管理，一种拥塞控制机制，通过在队列溢出前丢弃或标记数据包来管理流量。
- **DSCP** - 差分服务代码点，IP 报头中的 6 位字段，用于对网络流量划分优先级。
- **ECN** - 显式拥塞通知，一种允许路由器向端点设备发出拥塞信号而不丢弃数据包的机制。
- **ETS** - 增强传输选择，一种流量调度方法，使用加权轮询在多个队列组之间分配带宽。
- **PCP** - 优先级代码点，VLAN 报头中的 3 位字段，用于在 VLAN 内对流量划分优先级。
- **PFC** - 基于优先级的流量控制（IEEE 802.1Qbb），一种流控制机制，会暂停特定优先级队列上的流量以防止丢包。
- **RoCE** - 融合以太网上的 RDMA，一种支持在以太网上进行远程直接内存访问的协议。
- **WRED** - 加权随机早期检测，一种拥塞避免机制，在队列接近容量时随机丢弃数据包。
- **/in/eth/sw/** - `/interface/ethernet/switch/` 的 CLI 快捷方式。

## 新一代 Marvell Prestera 交换芯片中的 QoS 增强 {#qos-enhancements-in-new-generation-marvell-prestera-switch-chips}

配备新一代 Marvell Prestera 交换芯片的 MikroTik 设备（例如运行 [switch-marvell 软件包](../getting-started/installation-and-upgrade/packages.md#extra-packages) 的 CRS8xx 系列）提供了新的 QoS 强制执行方式。此前的型号需要在保证 Tx 队列缓冲区和共享 Tx 队列缓冲区之间做出权衡。通过提高共享缓冲区百分比，设备可以吸收更大的流量突发，但与此同时，一个拥塞端口可能会占用所有共享缓冲区，从而限制其他端口的 QoS 能力。使用新一代交换芯片可以兼顾两者优势，因为它引入了**动态缓冲区**。交换芯片会根据当前拥塞程度动态调整端口和队列缓冲区限制。如果设备内部没有拥塞，单个端口可以吸收大量突发流量，从而防止丢包。当多个端口的 Tx 队列大小增加时，设备会降低每端口和每队列限制，强制公平使用共享资源，同时确保非拥塞队列有足够缓冲区继续转发流量。整个过程完全自动化，无需用户配置。

新一代 Marvell Prestera 交换芯片的另一项改进是消除了用于存储控制数据的入队数据包描述符短缺问题。上一代设备有 Packet Cap 和 Use 统计。当设备收到小数据包突发时，即使有足够的队列缓冲区存储有效载荷，也可能因为达到 Packet Cap 而开始尾部丢弃数据包。新一代设备确保始终有足够内存存储控制数据，只受动态缓冲区大小的限制。这就是新一代设备没有 Packet Cap/Use 统计的原因。

新一代设备要求始终启用 QoS 硬件卸载（**qos-hw-offloading=yes**）。RouterOS 会忽略用户禁用它请求，同时保留该字段以保持向后兼容。

## QoS 设备支持 {#qos-device-support}

<WideTable>

| 交换芯片 | 型号 | QoS 配置文件 | QoS 映射 | Tx 管理器 | WRED | ECN | PFC | 无损缓冲区 | 动态缓冲区 | 端口/队列使用统计 |
| :-- | :-- | --: | --: | --: | :-- | :-- | :-- | :-- | :-- | :-- |
| **98DX3236** | CRS305-1G-4S+IN  CRS326-24G-2S+ (RM/IN)  CRS328-24P-4S+RM  CRS328-4C-20S-4S+RM | 128 | 1 | 8 |  |  |  |  |  | 当前值 |
| **98DX226S** | CRS305-1G-4S+OUT (FiberBox Plus)  CRS310-1G-5S-4S+ (netFiber 9/IN)  CRS310-8G+2S+IN  CRS318-16P-2S+OUT (netPower 16P)  CRS320-8P-8B-4S+RM  CRS418-8P-8G-2S+RM  CRS418-8P-8G-2S+5axQ2axQ-RM | 128 | 1 | 8 |  |  |  |  |  | 当前值 |
| **98DX224S** | CRS318-1Fi-15Fr-2S-OUT (netPower 15FR) | 128 | 1 | 8 |  |  |  |  |  | 当前值 |
| **98DX2528** | CRS304-4XG-IN | 128 | 1 | 8 |  |  |  |  |  | 当前值 |
| **98DX8525** | CCR2216-1G-12XS-2XQ  CRS518-16XS-2XQ-RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 最大占用 <sup>1</sup> |
| **98DX4310** | CRS504-4XQ (IN/OUT)  CRS510-8XS-2XQ-IN  RDS2216-2XG-4S+4XS-2XQ | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 最大占用 <sup>1</sup> |
| **98DX8208** | CRS309-1G-8S+IN | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98DX8212** | CRS312-4C+8XG-RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98DX8216** | CRS317-1G-16S+RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98DX8332** | CRS326-24S+2Q+RM  CRS326-4C+20G+2Q+RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98DX3257** | CRS354-48G-4S+2Q+RM  CRS354-48P-4S+2Q+RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98DX3255** | CCR2116-12G-4S+ | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98CX8410** | CRS520-4XS-16XQ-RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 不可用 <sup>3</sup> |
| **98DX7335** | CRS812-8DS-2DQ-2DDQ-RM  CRS804-4DDQ-hRM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ | ✔ | 当前值 + 最大占用 |

</WideTable>

<sup>**1**</sup> 设备会收集最大队列占用统计信息，而不是显示当前使用值。使用 `reset-counters` 命令清除这些统计信息。  
<sup>**2**</sup> 由于硬件限制，某些交换芯片型号在读取或轮询 QoS 端口/队列使用数据时，可能会出现临时流量中断。  
<sup>**3**</sup> 无法获取端口上各个队列的使用数据；只能访问整个物理端口的汇总总使用量。

## 应用与使用示例 {#applications-and-usage-examples}

---

### 基础配置示例 {#basic-configuration-example}

本示例演示如何在标准 Best Effort 类之上为 VoIP（IP 电话）配置单一 QoS 级别。该配置使用 CRS326-24G-2S+ 设备，设置如下：

- 所有端口均已桥接并使用 **[vlan-filtering](./index.md#bridge-vlan-filtering)**；
- sfp-sfpplus1 作为 VLAN 中继连接到另一台交换机；
- ether1 到 ether9 是 IP 电话专用端口；
- ether10 到 ether24 是用于连接主机的标准端口。

首先，定义 QoS 配置文件。该配置文件指定将应用于出站转发数据包的 DSCP 和 PCP 值：

```ros
/interface/ethernet/switch/qos/profile
add dscp=46 name=voip pcp=5 traffic-class=5
```

接下来，将 VoIP QoS 配置文件分配给 IP 电话专用端口。这会将配置文件应用于这些端口的入站流量。所有其他以太网端口将使用默认配置文件（其中 dscp=0 且 pcp=0）：

```ros
/interface/ethernet/switch/qos/port
set ether1 profile=voip
set ether2 profile=voip
set ether3 profile=voip
set ether4 profile=voip
set ether5 profile=voip
set ether6 profile=voip
set ether7 profile=voip
set ether8 profile=voip
set ether9 profile=voip
```

中继端口会接收两种 QoS 流量。为了区分它们，请启用 trust-l3 和 trust-l2：

```ros
/interface/ethernet/switch/qos/port
set sfp-sfpplus1 trust-l3=trust trust-l2=trust
```

> **注意：** 如果运行的是 RouterOS 7.23 或更高版本，VLAN 优先级和 IP DSCP 映射会自动创建，因此此步骤不是必需的。如果使用的是较早的 RouterOS 版本，则必须通过 QoS 配置文件手动创建 VLAN 优先级和 IP DSCP 映射：

```routeros
/interface/ethernet/switch/qos/map/ip
add dscp=46 profile=voip

/interface/ethernet/switch/qos/map/vlan
add pcp=5 profile=voip
```

最后，启用 QoS 硬件卸载，使上述设置生效：

```ros
/interface/ethernet/switch
set switch1 qos-hw-offloading=yes
```

可以使用 `print` 命令验证端口 QoS 设置：

```ros
[admin@MikroTik] /interface/ethernet/switch/qos/port/print
Column: NAME, SWITCH, PROFILE, MAP, TRUST-L2, TRUST-L3
 # NAME          SWITCH   PROFILE  MAP      TRUST-L2  TRUST-L3  TX-MANAGER
 0 ether1        switch1  voip     default  ignore    ignore    default
 1 ether2        switch1  voip     default  ignore    ignore    default
 2 ether3        switch1  voip     default  ignore    ignore    default
 3 ether4        switch1  voip     default  ignore    ignore    default
 4 ether5        switch1  voip     default  ignore    ignore    default
 5 ether6        switch1  voip     default  ignore    ignore    default
 6 ether7        switch1  voip     default  ignore    ignore    default
 7 ether8        switch1  voip     default  ignore    ignore    default
 8 ether9        switch1  voip     default  ignore    ignore    default
 9 ether10       switch1  default  default  ignore    ignore    default
10 ether11       switch1  default  default  ignore    ignore    default
11 ether12       switch1  default  default  ignore    ignore    default
12 ether13       switch1  default  default  ignore    ignore    default
13 ether14       switch1  default  default  ignore    ignore    default
14 ether15       switch1  default  default  ignore    ignore    default
15 ether16       switch1  default  default  ignore    ignore    default
16 ether17       switch1  default  default  ignore    ignore    default
17 ether18       switch1  default  default  ignore    ignore    default
18 ether19       switch1  default  default  ignore    ignore    default
19 ether20       switch1  default  default  ignore    ignore    default
20 ether21       switch1  default  default  ignore    ignore    default
21 ether22       switch1  default  default  ignore    ignore    default
22 ether23       switch1  default  default  ignore    ignore    default
23 ether24       switch1  default  default  ignore    ignore    default
24 sfp-sfpplus1  switch1  default  default  trust     ignore    default
25 sfp-sfpplus2  switch1  default  default  ignore    ignore    default
26 switch1-cpu   switch1   
```

使用此配置时，端口 ether1 到 ether9 上的入站数据包会标记为优先级代码点（PCP）值 5 和差分服务代码点（DSCP）值 46。端口 ether10 到 ether24 上的入站数据包会标记为 PCP 和 DSCP 值 0。当在 sfp-sfpplus1 端口上收到数据包时，任何 PCP 值为 5 的数据包会保留其 PCP 值 5 和 DSCP 值 46，而所有其他数据包会标记为 PCP 和 DSCP 值 0。

## Dante {#dante}

从 RouterOS v7.15 开始，所有支持 QoS 的 MikroTik 设备都与 Dante 音频网络兼容。

Dante 硬件使用以下 DSCP/Diffserv 优先级值进行流量优先级划分：

| Dante 优先级 | 用途 | DSCP 标签 | DSCP 值 |
| :-- | :-- | :-- | --: |
| High | 时间关键的 PTP 事件 | CS7 | 56 |
| Medium | 音频、PTP | EF | 46 |
| None | 其他流量 | BE | 0 |

本示例假设交换机使用其默认配置，其中包括一个默认桥接接口，所有以太网接口都已作为桥接端口加入。这些接口中的任何一个都可以用于 Dante。

首先，创建 QoS 配置文件以匹配 Dante 流量类别。已经存在一个预先存在的“default”配置文件，它对应 Dante 的 None 优先级。

```ros
/interface/ethernet/switch/qos/profile
add name=dante-ptp dscp=56 pcp=7 traffic-class=7
add name=dante-audio dscp=46 pcp=5 traffic-class=5
```

如果运行的是 RouterOS 7.23 或更高版本，IP DSCP 映射会自动创建，因此此步骤不是必需的。如果使用的是较早的 RouterOS 版本，请创建基于 DSCP 值匹配 QoS 配置文件的 QoS 映射：

```ros
/interface/ethernet/switch/qos/map/ip
add dscp=56 profile=dante-ptp
add dscp=46 profile=dante-audio
```

配置硬件队列以对 Dante 流量强制执行 QoS：

```ros
/interface/ethernet/switch/qos/tx-manager/queue
set [find where traffic-class=7] schedule=strict-priority
set [find where traffic-class=5] schedule=strict-priority
```

Dante 的 High 和 Medium 优先级流量按严格优先级顺序调度。设备会持续发送时间关键的 PTP 数据包，直到 queue7 为空，然后继续发送音频（queue5）。只有在 PTP 和音频队列为空时，才会发送其他流量。

下一步是为入站三层数据包启用信任模式（IP DSCP 字段）：

```ros
/interface/ethernet/switch/qos/port
set [find] trust-l3=keep
```

最后，启用 QoS 硬件卸载，使上述设置生效：

```ros
/interface/ethernet/switch
set switch1 qos-hw-offloading=yes
```

在以组播模式使用 Dante 时，建议在交换机上启用 IGMP snooping。此功能只会将流量定向到已订阅设备的端口，从而防止不必要的泛洪。此外，启用 IGMP querier（如果同一 LAN 中的另一台设备尚未启用）、调整查询间隔并激活 fast-leave，可以进一步优化组播性能。

```ros
/interface/bridge
set [find name=bridge] igmp-snooping=yes multicast-querier=yes query-interval=60s

/interface/bridge/port
set [find] fast-leave=yes
```

## 融合以太网上的 RDMA（RoCE） {#rdma-over-converged-ethernet-roce}

RoCE 支持通过以太网网络直接内存访问远程存储系统，而无需主机 CPU 参与。这显著降低了延迟和 CPU 开销，使 RoCE 非常适合高性能计算和数据中心环境。RoCE 还支持融合网络，其中各种服务（如数据存储、网络和多媒体）在单一以太网基础设施上运行，从而简化网络管理，并降低维护独立网络的成本和复杂性。

RoCE 通过使用 **ECN** 和 **PFC** 机制来实现这一点。这些功能有助于防止网络拥塞和丢包，确保可靠、无损的通信。有关兼容交换机，请参阅[设备功能表](./quality-of-service.md#qos-device-support)。虽然交换机可以支持 RoCE 环境，但终端主机也必须兼容 RoCE 协议，并配备支持 RDMA 的网络接口卡（NIC）。

RoCE 有两个主要版本。RoCEv1 作为以太网链路层协议运行，并使用 Ethertype 0x8915。RoCEv2 在标准 IP 网络上运行，使用 UDP 目标端口号 4791。IP 报头中的 ECN 位会被标记以表示网络拥塞，并使用拥塞通知数据包（CNP）向发送方确认拥塞。对于流量优先级划分，RoCEv2 流量使用 DSCP 26，而 CNP 使用 DSCP 48。

以下示例可用于带有 PFC 和 ECN 的无损 RoCEv2，并假设交换机使用其默认配置，其中包括一个默认桥接接口，所有以太网接口都已作为桥接端口加入。建议的最低 RouterOS 版本为 7.17。

首先，配置附加配置文件。非 RoCE 流量将分配到已存在的“default”配置文件，其 traffic-class 为 1；RoCEv2 分配到 traffic-class 3；CNP 分配到 traffic-class 6。

```routeros
/interface/ethernet/switch/qos/profile
add dscp=26 name=roce traffic-class=3
add dscp=48 name=cnp traffic-class=6
```

如果运行的是 RouterOS 7.23 或更高版本，IP DSCP 映射会自动创建，因此此步骤不是必需的。如果使用的是较早的 RouterOS 版本，请创建基于 DSCP 值匹配 QoS 配置文件的 QoS 映射。

```routeros
/interface/ethernet/switch/qos/map/ip
add dscp=26 profile=roce
add dscp=48 profile=cnp
```

配置硬件队列和调度器。对 traffic-class 1 和 traffic-class 3 使用 ETS（`schedule=high-priority-group`），各分配 50% 带宽（`weight=1`），并对 traffic-class 6 使用严格优先级调度。此外，为 traffic-class 3 启用 ECN（`ecn=yes`），以在交换机中标记经历拥塞的 IP 数据包。

```routeros
/interface/ethernet/switch/qos/tx-manager/queue
set 1 schedule=high-priority-group weight=1
set 3 schedule=high-priority-group weight=1 ecn=yes
set 6 schedule=strict-priority
```

:::tip
尽管使用 `schedule=low-priority-group` 可以为另一组流量类别创建单独的 ETS 调度和带宽分配，但不建议将此设置与 `lldp-dcbx=yes` 一起使用。原因是 ETS Configuration/Recommendation TLV 设计为跨流量类别处理单一带宽分配，因此应改用 `schedule=high-priority-group`。
:::

为 traffic-class 3 配置 PFC 配置文件，以确保 RoCEv2 流量处于无损环境。

```routeros
/interface/ethernet/switch/qos/priority-flow-control
add name=pfc-tc3 rx=yes traffic-class=3 tx=yes
```

在预期会有 RoCEv2 流量的交换机端口上设置三层信任模式（`trust-l3=keep`）。设置 PFC（`pfc=pfc-tc3`）以及 queue3 的出站速率，以满足 PFC 要求（`egress-rate-queue3=10.0Gbps`）。在本示例中，使用的是 10Gbps SFP+ 接口，出站速率可以设置为与接口物理速率匹配。请根据接口速率更改此属性。

```routeros
/interface/ethernet/switch/qos/port
set sfp-sfpplus1 egress-rate-queue3=10.0Gbps pfc=pfc-tc3 trust-l3=keep
set sfp-sfpplus2 egress-rate-queue3=10.0Gbps pfc=pfc-tc3 trust-l3=keep
set sfp-sfpplus3 egress-rate-queue3=10.0Gbps pfc=pfc-tc3 trust-l3=keep
set sfp-sfpplus4 egress-rate-queue3=10.0Gbps pfc=pfc-tc3 trust-l3=keep
```

启用 QoS 硬件卸载，使上述设置开始生效。

```routeros
/interface/ethernet/switch
set switch1 qos-hw-offloading=yes
```

启用 LLDP 数据中心桥接能力交换协议（DCBX），以与其他相邻设备共享 QoS 设置和能力。

```routeros
/ip/neighbor/discovery-settings
set lldp-dcbx=yes
```

作为可选步骤，增加 L2MTU 以容纳更大的数据包。

```routeros
/interface/ethernet
set [find switch=switch1] l2mtu=9500
```

## QoS 标记 {#qos-marking}

---

### 理解映射范围 {#understanding-map-ranges}

为了避免逐个定义所有可能的 PCP 和 DSCP 映射，RouterOS 允许在创建 QoS 配置文件映射时为 PCP 和 DSCP 指定多个值或范围。

在此示例中，PCP 值 0 和 2 使用默认 QoS 配置文件，值 1 和 3-4 使用 streaming 配置文件，值 5 使用 voip 配置文件，值 6-7 使用 control 配置文件：

```ros
/interface/ethernet/switch/qos/map/vlan
add pcp=1,3-4 profile=streaming
add pcp=5 profile=voip
add pcp=6-7 profile=control
```

这种方法通过将相关优先级值分组在一起，而不是为每个单独值创建单独的映射规则，从而简化了配置。

### 理解端口、配置文件与映射的关系 {#understanding-port-profile-and-map-relation}

每个交换机端口都有二层和三层信任设置，这些设置会改变入站数据包如何分类到 QoS 配置文件，以及将使用哪些 PCP 和 DSCP 值。下表描述了所有可能的选项：

| **qos-trust-l2** | **qos-trust-l3** | 行为 |
| :-- | :-- | :-- |
| **ignore** | **ignore** | 该端口被视为不受信任。两个报头都会被忽略，并且端口的 **profile** 会强制应用于所有入站数据包。这是默认设置。 |
| **ignore** | **trust** | 信任三层报头。使用入站数据包 IP 报头中的 DSCP 字段进行 QoS 配置文件查找（参见 `/in/eth/sw/qos/map/ip`）。如果查找失败（没有 QoS 配置文件映射到给定 DSCP 值），则使用 **default** QoS 配置文件（不是交换机端口的 QoS 配置文件）。交换机端口的 **profile** 字段仅用于非 IP 流量。 |
| **ignore** | **keep** | 信任三层报头。使用入站数据包 IP 报头中的 DSCP 字段进行 QoS 配置文件查找（参见 `/in/eth/sw/qos/map/ip`）。如果查找失败，则使用 **default** QoS 配置文件。交换机端口的 **profile** 字段仅用于非 IP 流量。如果转发/路由的数据包带有 VLAN 标签，其 PCP 值会根据所选 QoS 配置文件设置。但是，数据包的原始 DSCP 值保持不变。 |
| **trust** | **ignore** | 信任二层报头，但忽略三层。如果入站数据包带有 VLAN 标签，则使用 VLAN 报头中的 PCP 字段进行 QoS 配置文件查找（参见 `/in/eth/sw/qos/map/vlan`）。如果查找失败（没有 QoS 配置文件映射到给定 PCP 值），则使用 **default** QoS 配置文件。交换机端口的 **profile** 字段仅用于未打标签的流量。 |
| **trust** | **trust** | 信任两个报头，但三层具有更高优先级。对于 IP 数据包，使用 DSCP 字段进行 QoS 配置文件查找（参见 `/in/eth/sw/qos/map/ip`）。如果 DSCP 到 QoS 的查找失败，则使用 **default** 配置文件。如果数据包不是 IP 数据包但带有 VLAN 标签，则使用 VLAN 报头中的 PCP 字段进行 QoS 配置文件查找（参见 `/in/eth/sw/qos/map/vlan`）。如果 VLAN 到 QoS 的查找失败，则使用 **default** QoS 配置文件。非 IP 且未打标签的数据包使用交换机端口的 **profile**。 |
| **trust** | **keep** | 与 **trust+trust** 相同，但在转发/路由的数据包中保留原始 DSCP 值。 |
| **keep** | **ignore** | 信任二层报头，但忽略三层。如果入站数据包带有 VLAN 标签，则使用 VLAN 报头中的 PCP 字段进行 QoS 配置文件查找（参见 `/in/eth/sw/qos/map/vlan`）。如果查找失败（没有 QoS 配置文件映射到给定 PCP 值），则使用 **default** QoS 配置文件。交换机端口的 **profile** 字段仅用于未打标签的流量。如果数据包在入站和出站时都带有 VLAN 标签，则保留原始 PCP 值。 |
| **keep** | **trust** | 信任两个报头，但三层具有更高优先级。对于 IP 数据包，使用 DSCP 字段进行 QoS 配置文件查找（参见 `/in/eth/sw/qos/map/ip`）。如果 DSCP 到 QoS 的查找失败，则使用 **default** 配置文件。如果数据包不是 IP 数据包但带有 VLAN 标签，则使用 VLAN 报头中的 PCP 字段进行 QoS 配置文件查找（参见 `/in/eth/sw/qos/map/vlan`）。如果 VLAN 到 QoS 的查找失败，则使用 **default** QoS 配置文件。非 IP 且未打标签的数据包使用交换机端口的 **profile**。如果数据包在入站和出站时都带有 VLAN 标签，则保留原始 PCP 值。转发/路由的数据包中的 DSCP 值会根据所选 QoS 配置文件设置。 |
| **keep** | **keep** | 信任两个报头，但三层具有更高优先级。对于 IP 数据包，使用 DSCP 字段进行 QoS 配置文件查找（参见 `/in/eth/sw/qos/map/ip`）。如果 DSCP 到 QoS 的查找失败，则使用 **default** 配置文件。如果数据包不是 IP 数据包但带有 VLAN 标签，则使用 VLAN 报头中的 PCP 字段进行 QoS 配置文件查找（参见 `/in/eth/sw/qos/map/vlan`）。如果 VLAN 到 QoS 的查找失败，则使用 **default** QoS 配置文件。非 IP 且未打标签的数据包使用交换机端口的 **profile**。对于带 VLAN 标签和/或 IP 数据包，分别保留原始 PCP 和/或 DSCP 值。 |

<WideTable>

| **端口设置** |  | 所选 QoS 配置文件以及转发/路由数据包中 PCP / DSCP 字段值的来源 |  |  |  |  |  |  |  |  |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **qos-trust-l2** | **qos-trust-l3** | 带 VLAN 标签的 IP |  |  | 未打标签的 IP |  |  | 带 VLAN 标签的非 IP |  |  | 未打标签的非 IP |  |  |
|  |  | QoS 配置文件 | PCP | DSCP | QoS 配置文件 | PCP <sup>1</sup> | DSCP | QoS 配置文件 | PCP | DSCP | QoS 配置文件 | PCP <sup>1</sup> | DSCP |
| ignore | ignore | profile | profile | profile | profile | profile | profile | profile | profile | - | profile | profile | - |
| ignore | trust | map/ip | map/ip | map/ip | map/ip | map/ip | map/ip | profile | profile | - | profile | profile | - |
| ignore | keep | `/map/ip` | `/map/ip` | 原始值 | `/map/ip` | `/map/ip` | 原始值 | profile | profile | - | profile | profile | - |
| trust | ignore | map/vlan | map/vlan | map/vlan | profile | profile | profile | map/vlan | map/vlan | - | profile | profile | - |
| trust | trust | `/map/ip` | `/map/ip` | `/map/ip` | `/map/ip` | `/map/ip` | `/map/ip` | `/map/vlan` | `/map/vlan` | - | profile | profile | - |
| trust | keep | `/map/ip` | `/map/ip` | 原始值 | `/map/ip` | `/map/ip` | 原始值 | `/map/vlan` | `/map/vlan` | - | profile | profile | - |
| keep | ignore | map/vlan | 原始值 | map/vlan | profile | profile | profile | map/vlan | 原始值 | - | profile | profile | - |
| keep | trust | map/ip | 原始值 | map/ip | map/ip | profile | map/ip | map/vlan | 原始值 | - | profile | profile | - |
| keep | keep | map/ip | 原始值 | 原始值 | map/ip | profile | 原始值 | map/vlan | 原始值 | - | profile | profile | - |

</WideTable>

<sup>**1**</sup> 仅在入站流量未打标签，但出站接口要求帧带 VLAN 标签时适用。

### 通过交换机规则（ACL）进行 QoS 标记 {#qos-marking-via-switch-rules-acl}

从 **RouterOS v7.15** 开始，可以使用交换机规则（ACL）为网络流量分配 QoS 配置文件。此方法允许根据各种数据包属性灵活地对流量进行分类。

**子菜单：** `/interface/ethernet/switch/rule`

| 新增/变更属性 | 说明 |
| :-- | :-- |
| **new-qos-profile** (*name*) | 要分配给匹配数据包的 [QoS 配置文件](#qos-profile) 的名称。 |
| **keep-qos-fields** (*yes \| no*；默认：**no**) | 应保留 QoS 字段（PCP、DSCP）的原始值（*yes*），还是将其替换为分配的 QoS 配置文件中的值（*no*）？仅在设置了 **new-qos-profile** 时相关。 |
| **new-vlan-priority** (*0..7*) | 已弃用，应替换为相应的 **new-qos-profile**。保留以保持向后兼容。仅在 qos-hw-offloading=no 时相关。 |

以下示例根据源 MAC 地址分配 QoS 配置文件：

```ros
/interface/ethernet/switch/rule
add new-qos-profile=stream port=ether1,ether2 src-mac-address=00:01:02:00:00:00/FF:FF:FF:00:00:00 switch=switch1
add new-qos-profile=voip port=ether1,ether2 src-mac-address=04:05:06:00:00:00/FF:FF:FF:00:00:00 switch=switch1
```

## QoS 强制执行 {#qos-enforcement}

### 硬件队列 {#hardware-queues}

每个交换机端口都有八个硬件传输（Tx）队列（queue0 到 queue7）。每个队列对应一个由 [QoS 配置文件](#qos-profile) 定义的流量类别（tc0 到 tc7）。当数据包进入交换机时，会获得一个 QoS 配置文件分配，这决定了流量类别，并因此选择适当的出站队列进行传输。

硬件队列具有由 [传输管理器](#transmission-manager) 配置的可变大小。此外，多个端口和队列可以通过称为*共享缓冲区*的机制相互共享资源。例如，一台有 25 个端口的设备，其缓冲区内存足以排队 1200 个数据包。如果资源平均分配，每个端口获得 48 个独占缓冲区，每队列最多 6 个数据包（48 除以 8），这通常不足以吸收甚至很短的流量突发。但是，如果分配 50% 的缓冲区用于共享，则每个端口保留 24 个独占缓冲区（每队列 3 个），同时允许单个队列增长到 603 个缓冲区（3 个独占加 600 个共享）。

RouterOS 允许为每个队列单独启用或禁用共享池。此功能有助于防止低优先级流量消耗所有可用硬件内存。此外，端口缓冲区限制可以限制单个低速端口占用整个共享池。更多详细信息，请参阅 [QoS 设置](#qos-settings) 和 [传输管理器](#transmission-manager)。

:::info
默认的 best-effort 流量类别（PCP=0，DSCP=0）是流量类别 1，而最低优先级流量（PCP=1）使用流量类别 0。
:::

## 硬件资源 {#hardware-resources}

交换芯片的硬件资源（内存）有限。与 QoS 操作相关的两个主要硬件资源是：

- **数据包描述符** - 包含数据包控制信息，例如目标端口、报头修改和其他元数据。
- **数据缓冲区** - 存储实际数据包有效载荷的内存块。缓冲区大小因交换芯片型号而异；通常为 256 字节。

一个数据包描述符可能使用多个缓冲区（取决于有效载荷大小），并且在组播或广播流量情况下，缓冲区可能由多个描述符共享。如果硬件没有足够的空闲描述符或缓冲区，数据包会被丢弃（尾部丢弃）。

硬件资源可以按目的地类型（组播/单播）、按端口和按 TX 队列进行限制。当达到任何这些限制时，无法再将要传输的数据包入队，后续数据包会被丢弃。

RouterOS 抽象了底层硬件细节，允许以数据包数量或总量百分比的形式配置资源限制。RouterOS 会根据用户指定的数据包限制和端口 MTU 自动计算所需的硬件描述符和缓冲区数量。此外，RouterOS 包含预配置的硬件资源，在常见 QoS 场景中无需手动配置。

:::danger
在运行时修改任何硬件资源分配参数会导致设备临时停止，在此期间无法将数据包入队或传输。设备转发流量时预计会出现临时丢包。
:::

## 节省资源（上一代设备） {#resource-saving-previous-generation-devices}

:::info
本节仅适用于**不**支持**动态缓冲区**的设备。
:::

由于硬件资源无法在运行时重新分配，RouterOS 无法自动释放为未活动端口预留的队列缓冲区。这些缓冲区会保持未使用状态。但是，如果您知道某个特定端口永远不会使用（例如，它始终保持物理断开），则可以通过分配具有最小资源的内置“offline”tx-manager 来手动释放相应队列资源：

```ros
/interface/ethernet/switch/qos/port
set sfp-sfpplus1 tx-manager=offline
set sfp-sfpplus2 tx-manager=offline
```

:::danger
不要在 **switch-cpu** 端口上配置“offline”tx-manager。
:::
:::warning
为 QSFP+ 或 QSFP28 接口配置 `tx-manager` 设置时，必须对该端口的所有四个子接口应用相同的配置。例如，如果接口 qsfp28-1-1 处于活动状态并以 100Gbps 连接，而子接口（qsfp28-1-2、qsfp28-1-3、qsfp28-1-4）显示非运行标志，**不要将“offline”tx-manager 分配给这些非运行的子接口**。这样做也会影响 100Gbps 链路。但是，如果四个子接口都未运行，则可以安全地分配“offline”tx-manager 设置。
:::

## 流量优先级划分 {#traffic-prioritization}

硬件支持两种流量传输优先级划分方式：

- **严格优先级** - 来自较高队列的流量始终优先传输。
- **增强传输选择（ETS）** - 多个队列同时使用加权轮询参与数据包传输调度。

**严格优先级**排队很简单。如果最高优先级队列（Q7）有数据包，则这些数据包会优先传输。当 Q7 为空时，来自 Q6 的数据包会被传输，依此类推。只有当所有其他队列都为空时，才会传输最低优先级队列（Q0）中的数据包。

严格优先级划分的缺点是，在“过度优先”高优先级队列的同时，会增加低优先级队列的延迟。假设 TC5 的可接受延迟为 20ms，TC3 为 50ms。由于队列的严格优先级，出现在 Q5 中的流量会立即传输，从而给低优先级队列（Q4..Q0）中的每个数据包增加额外延迟。Q5 中的数据包突发（例如语音通话开始）可能会暂时“瘫痪”Q3，使 TC3 延迟增加到超过可接受的 50ms（甚至由于队列满而导致丢包），而 TC5 数据包则以 &lt;1ms 传输（远低于 20ms 限制）。如果通过在中间传输 TC3 数据包来稍微牺牲 TC5 的延迟，就能让所有流量都满意。这正是 **ETS** 的用途。

**增强传输选择（ETS）** 以加权轮询方式调度来自多个队列（组成员）的流量进行传输。队列的权重设置每轮从该队列传输的数据包数量。例如，如果 Q2、Q1 和 Q0 是组成员，其权重分别为 3、2 和 1，则调度器会从 Q2 传输 3 个数据包，从 Q1 传输 2 个，从 Q0 传输 1 个。上述示例每轮的实际传输顺序是“Q2、Q1、Q0、Q2、Q1、Q2”——以实现更公平的调度。

有两个硬件组：`low-priority-group` 和 `high-priority-group`。两个组之间存在严格优先级顺序：只有当高优先级组中的*所有*队列都为空时，低优先级组才会传输。但是，也可以所有队列只使用一个组。

下面列出了默认（内置）RouterOS 队列设置。Q3-Q5 在高优先级组内共享带宽，当 Q6 和 Q7 为空时传输数据包。Q0-Q2 是低优先级组的成员，当 Q3-Q7 为空时传输数据包。

```ros
[admin@MikroTik] /interface/ethernet/switch/qos/tx-manager/queue> print 
Columns: TX-MANAGER, TRAFFIC-CLASS, SCHEDULE, WEIGHT, QUEUE-BUFFERS, USE-SHARED-BUFFERS
#  TX-MANAGER  TRAFFIC-CLASS  SCHEDULE             WEIGHT  QUEUE-BUFFERS  USE-SHARED-BUFFERS
0  default     0              low-priority-group   1       auto           no                
1  default     1              low-priority-group   2       auto           yes                
2  default     2              low-priority-group   3       auto           yes                
3  default     3              high-priority-group  3       auto           yes               
4  default     4              high-priority-group  4       auto           yes               
5  default     5              high-priority-group  5       auto           yes               
6  default     6              strict-priority              auto           yes               
7  default     7              strict-priority              auto           yes 
```

:::tip
建议所有组成员彼此相邻。
:::

## 主动队列管理（AQM） {#active-queue-management-aqm}

### 加权随机早期检测（WRED） {#weighted-random-early-detection-wred}

WRED 是一种基于每队列运行的拥塞控制机制。它通过在队列溢出前丢弃数据包，向端点设备发出拥塞事件信号。WRED 依赖于端点中对丢包做出响应的速率限制机制，例如 TCP/IP。

WRED 使用随机丢包算法来预测拥塞事件，并在拥塞实际发生前通过限制流量速率来响应。WRED 的随机性可防止 TCP 流全局同步导致吞吐量崩溃。

可以在每个 Tx 管理器中按队列启用或禁用 WRED。对于无损流量类别，请禁用 WRED。对于高速端口，也没有理由启用 WRED，因为这些端口本来就不应该发生拥塞。

该行为通过 WRED 阈值控制。WRED 阈值定义可以超过队列共享缓冲区限制（上限）的最大数据包数或字节数。当队列使用量超过其相应容量时，开始随机丢包：

- `queueX-packet-use > queueX-shared-packet-cap`，或
- `queueX-byte-use > queueX-shared-byte-cap`。

使用量超过容量越多，丢包概率越高，并在 `queueX-shared-packet-cap + wred-packet-threshold`（或等效字节数）时达到 100%。

RouterOS 会根据队列或共享池容量自动选择实际 WRED 阈值。用户可以通过 QoS 设置调整阈值。

:::danger
WRED 要求相应的 Tx 队列使用共享缓冲区（**use-shared-buffers=yes**）。
:::

选择 WRED 阈值需要在拥塞预测和突发吸收之间进行权衡。设置较高的 WRED 阈值可能会导致更早地限制流量速率，从而解决拥塞。但是，高阈值会导致有限的流量突发中发生丢包，而这些突发原本可以由队列缓冲区吸收并无损传输（如果 WRED 未激活）。

例如，发起远程数据库连接通常在初始化阶段以较重流量（“数据包突发”）开始，然后流量速率降至“合理”水平。初始化阶段的任何丢包都会因需要重传而导致数据库连接变慢。因此，建议对此类流量降低 WRED 阈值或完全禁用 WRED。相反的情况是视频流，早期拥塞检测有助于选择合适的流速率，而不会因重传损失过多带宽或牺牲质量级别。

:::info
使用交换机规则（ACL）或其他 QoS 标记技术来区分流量，并将数据包放入具有所需 WRED 设置的队列中。
:::

以下脚本通过将 TCP/IP 流量重定向到 queue2，仅对其应用 WRED。UDP 和其他数据包保留在 queue1 中，因为它们的端点通常无法对早期丢弃做出响应。Queue1 和 queue2 以同等方式调度，不会优先于另一个队列：

```ros
/interface/ethernet/switch/qos/profile
add name=tcp-wred traffic-class=2 pcp=0 dscp=0

# 将 TCP 流量移到 queue2
/interface/ethernet/switch/rule
add new-qos-profile=tcp-wred ports=ether1,ether2,ether3,ether4 protocol=tcp switch=switch1

# 在 queue1 和 queue2 之间设置相同的调度优先级（权重）
# 仅对 queue2 - TCP 流量应用 WRED
/interface/ethernet/switch/qos/tx-manager/queue/
set [find where traffic-class=1] weight=2 schedule=low-priority-group use-shared-buffers=yes wred=no
set [find where traffic-class=2] weight=2 schedule=low-priority-group use-shared-buffers=yes wred=yes
```

## 显式拥塞通知（ECN） {#explicit-congestion-notification-ecn}

某些交换芯片型号支持符合 RFC 3168 的硬件级 IP 数据包 ECN 标记。此机制的运行方式与 WRED 类似，但在拥塞期间不是丢弃数据包，而是在 ECN 字段中将其标记为 CE（拥塞经历，二进制 11）标志。只有支持 ECN 的 IP 数据包才能收到此标记——即 ECN 字段值设置为 ECT(1) 或 ECT(0)（二进制 01 或 10）的数据包。不支持 ECN 的传输数据包（ECN=00）永远不会被标记。如果数据包已经带有 CE 标记（ECN=11），则无论设备是否经历拥塞，它都会保留此标记。

通过在所需的 [Tx 管理器队列](./quality-of-service.md#transmission-manager) 上设置 **ecn=yes** 来启用 ECN 标记。

:::danger
ECN 标记机制要求相应的 Tx 队列使用共享缓冲区（**use-shared-buffers=yes**）。
:::

当**所有**以下条件满足时，数据包会收到 CE 标记：

1. 数据包是 IPv4 或 IPv6。
2. IP 报头中的 ECN 字段值为 ECT(1) 或 ECT(0)。
3. 出站端口的 Tx 队列启用了 **ecn=yes** 并使用共享缓冲区（**use-shared-buffers=yes**）。
4. 队列使用量超过共享缓冲区容量：`queueX-packet-use > queueX-shared-packet-cap` 或 `queueX-byte-use > queueX-shared-byte-cap`。

:::danger
由于启用 ECN（ecn=yes）会阻止丢弃支持 ECN 的数据包，如果流量发送方没有及时响应拥塞通知，队列使用量可能会超过 WRED 阈值。
:::

## 基于优先级的流量控制（PFC） {#priority-based-flow-control-pfc}

基于优先级的流量控制（PFC）可为最多八个流量类别实现无损运行，确保一个流量类别中的拥塞不会暂停其他类别中的流量。这允许对丢包敏感和可容忍丢包的流量类型在同一网络中共存。

支持 PFC 的交换芯片符合 IEEE 802.1Qbb PFC 标准，这意味着它们可以生成并响应 PFC 帧。当出站端口发生拥塞时，源端口会为受影响的流量类别发送 PFC 帧。生成的 PFC 帧使用计时器值 0xFFFF 表示暂停（XOFF），0x0 表示恢复（XON），并在优先级启用向量中设置相应位。在接收端，PFC 帧会在 PFC 帧指定的持续时间内暂停目标端口上的特定优先级队列。

在 RouterOS 中，PFC 配置按配置文件组织。每个端口可以分配到一个特定的 PFC 配置文件，该配置文件定义了要启用 PFC 的流量类别、发送 XOFF 和 XON 帧的暂停和恢复阈值，以及分配的端口应发送和/或接收 PFC 帧。

当出站端口发生拥塞时，会在入站端口上触发 PFC。必须使用共享缓冲区，才能将入站流量数量与 Tx 队列中等待的数据包关联起来。对于每个启用 PFC 的流量类别，请在相应的 Tx 队列上设置 **use-shared-buffers=yes**。

:::info
RouterOS 实现流量类别与 Tx 队列之间 1:1 的映射。流量类别为 0 的数据包进入 queue0，TC1 进入 queue1，依此类推，直到 TC7 进入 queue7。因此，在本文档中，“流量类别”和“Tx 队列”这两个术语可以互换使用。
:::

选择暂停和恢复阈值时，请考虑传输和处理 PFC 帧的延迟。例如，设备 A 在时间 T 经历拥塞，向设备 B 发送 PFC 暂停帧，B 处理该帧并在时间 T+D 停止传输。在增量时间 D 内，设备 B 会继续发送流量。如果设备 A 将暂停阈值配置为 100%，则它没有空闲缓冲区可用，数据包可能会被丢弃，这对于无损流量类别是不可接受的。设置较低的暂停阈值（例如 80%），可在仍有空闲内存吸收增量时间 D 内流量的情况下发送 PFC 暂停帧。同样的原则适用于恢复阈值。将其设置为 0% 会使设备在增量时间内保持空闲，从而降低整体吞吐量。

PFC 接收要求为所有相关队列设置出站速率，以计算暂停时间，即使它与线速匹配。例如，如果 PFC 运行在流量类别 3 上，则分配的端口需要设置 `egress-rate-queue3`。

```routeros
/interface/ethernet/switch/qos/priority-flow-control/add name=pfctc3 traffic-class=3 rx=yes
/interface/ethernet/switch/qos/port/set sfp-sfpplus1,sfp-sfpplus2 pfc=pfctc3 egress-rate-queue3=10G
```

## 属性参考 {#property-reference}

### 交换机设置 {#switch-settings}

**子菜单：** `/interface/ethernet/switch`

交换机 QoS 设置（在现有设置之外）。

| 属性 | 描述 |
| :-- | :-- |
| **qos-hw-offloading** (*yes \| no*；默认：**no**) | 允许为给定交换芯片启用 QoS（如果它支持 QoS）。新一代设备会始终强制 **qos-hw-offloading=yes**。 |

:::tip
启用 QoS 后，关闭 **qos-hw-offloading** 设置不会完全恢复到之前的功能。建议在禁用它后重启设备。
:::

### 端口设置 {#port-settings}

**子菜单：** `/interface/ethernet/switch/qos/port`

此子菜单用于配置单个交换机端口的 QoS 设置。它允许您为到达特定端口的入站数据包分配 QoS 配置文件。如果端口配置为受信任，则分配的配置文件可能会被基于数据包报头值的匹配规则覆盖。

默认情况下，所有端口都不受信任，并接收默认 QoS 配置文件（Best-Effort，PCP=0，DSCP=0）。在此默认状态下，优先级字段会从出站数据包中清除。

#### 端口统计 {#port-stats}

**示例**

```ros
[admin@Mikrotik] /interface/ethernet/switch/qos/port> print stats where name=ether2
                  name:     ether2
             tx-packet:      2 887
               tx-byte:  3 938 897
           drop-packet:      1 799
             drop-byte:  2 526 144
      tx-queue0-packet:         50
      tx-queue1-packet:      1 871
      tx-queue3-packet:        774
      tx-queue5-packet:        192
        tx-queue0-byte:      3 924
        tx-queue1-byte:  2 468 585
        tx-queue3-byte:  1 174 932
        tx-queue5-byte:    291 456
    drop-queue1-packet:      1 799
      drop-queue1-byte:  2 526 144
```

| 属性 | 说明 |
| :-- | :-- |
| **name** | 端口名称。 |
| **tx-packet** | 通过此端口传输的数据包总数。 |
| **tx-byte** | 通过此端口传输的字节总数。 |
| **drop-packet** | 本应通过此端口传输，但由于资源不足（例如队列缓冲区）或 QoS 强制执行而被丢弃的数据包总数。 |
| **drop-byte** | 本应通过此端口传输但被丢弃的字节总数。 |
| **tx-queue0-packet** .. **tx-queue7-packet** | 通过此端口从相应队列传输的数据包数量。 |
| **tx-queue0-byte** .. **tx-queue7-byte** | 通过此端口从相应队列传输的字节数。 |
| **drop-queue0-packet** .. **drop-queue7-packet** | 从相应队列丢弃（或因资源不足根本未入队）的数据包数量。 |
| **drop-queue0-byte** .. **drop-queue7-byte** | 从相应队列丢弃的字节数。 |

#### 端口资源/使用情况 {#port-resourcesusage}

:::danger
由于硬件限制，某些交换芯片型号在访问 QoS 端口 `usage` 数据时可能会中断流量。端口 `usage` 仅用于诊断/故障排除。若要监控，请改用 QoS `monitor` 或端口 `stats`。
:::

**示例**

```ros
[admin@crs326] /interface/ethernet/switch/qos/port> print usage where name=ether2
                 name:  ether2
           packet-cap:     136
           packet-use:       5
             byte-cap:  35 840
             byte-use:   9 472
    queue0-packet-cap:     130
    queue0-packet-use:       1
    queue1-packet-cap:       5
    queue1-packet-use:       4
    queue3-packet-cap:      65
    queue3-packet-use:       2
      queue0-byte-cap:  24 576
      queue0-byte-use:     256
      queue1-byte-cap:   7 680
      queue1-byte-use:   6 144
      queue3-byte-cap:  14 080
      queue3-byte-use:   3 072
```

| 属性 | 说明 |
| :-- | :-- |
| **name** | 端口名称。 |
| **packet-cap** | 端口的数据包容量。可通过该端口排队传输的最大数据包数量。 |
| **packet-use** <sup>1</sup> | 端口的数据包使用量。当前在所有端口队列中排队的数据包数量。 |
| **byte-cap** | 端口的字节容量（缓冲区大小）。可通过该端口排队传输的最大字节数。 |
| **byte-use** <sup>1</sup> | 端口的字节使用量。当前为已入队数据包分配的硬件缓冲区大小（字节）。由于缓冲区按块分配（通常每块 256B），分配缓冲区大小可能大于实际有效载荷。 |
| **queue0-packet-cap** .. **queue7-packet-cap** <sup>2</sup> | 单个队列容量。可在相应队列中排队（除非启用了**共享缓冲区**）的最大数据包数量。 |
| **queue0-shared-packet-cap** .. **queue7-shared-packet-cap** <sup>2</sup> | 共享队列容量（单个队列容量 + 共享缓冲区）。可在相应队列中排队的最大数据包数量。 |
| **queue0-packet-use** .. **queue7-packet-use** <sup>2</sup> | 队列数据包使用量。相应队列中已入队的数据包数量。 |
| **queue0-byte-cap** .. **queue7-byte-cap** <sup>2</sup> | 单个队列容量。可在相应队列中排队（除非启用了**共享缓冲区**）的最大字节数。 |
| **queue0-shared-byte-cap** .. **queue7-shared-byte-cap** <sup>2</sup> | 共享队列容量（单个队列容量 + 共享缓冲区）。可在相应队列中排队的最大字节数。 |
| **queue0-byte-use** .. **queue7-byte-use** <sup>2</sup> | 队列缓冲区使用量（字节）。当前为相应队列中的数据包分配的硬件缓冲区大小（字节）。 |
| **queue0-byte-max** .. **queue7-byte-max** <sup>2</sup> | 最大队列缓冲区占用水平（字节）。仅在提供队列统计服务的设备上可用。使用 `reset-counters` 命令重置值。 |

<sup>**1**</sup> 如果启用了共享缓冲区，端口的数据包/字节使用量可能超过容量。  
<sup>**2**</sup> 仅打印正在使用的队列。

#### 端口 PFC 统计（上一代） {#port-pfc-stats-previous-generations}

**示例**

```ros
[admin@crs317] /interface/ethernet/switch/qos/port> print pfc interval=1 where running
                 name:  sfp-sfpplus1 sfp-sfpplus2   ether1
                  pfc:          roce     disabled disabled
               pfc-tx:            46            
        pfc-paused-tc:             3            
 pfc3-pause-threshold:     1 048 576            
pfc3-resume-threshold:        10 240            
             pfc3-use:     1 075 200
```

| 属性 | 说明 |
| :-- | :-- |
| **name** | 端口名称。 |
| **pfc** | PFC 配置文件名称。 |
| **pfc-rx** | 接收到的 PFC 帧数量。 |
| **pfc-tx** | 发送的 PFC 帧数量。 |
| **pfc-paused-tc** | 应暂停的流量类别列表（从发送方角度看）。会定期发送 PFC 暂停帧（XOFF），其中列出的计时器由该端口设置。 |
| **pfc0-pause-threshold .. pfc7-pause-threshold** | 相应流量类别的暂停阈值。仅显示启用 PFC 的流量类别。 |
| **pfc0-resume-threshold .. pfc7-resume-threshold** | 相应流量类别的恢复阈值。仅显示启用 PFC 的流量类别。 |
| **pfc0-use .. pfc7-use** | 相应流量类别的当前缓冲区使用量（字节）。换句话说，它是从该端口接收的所有端口上所有排队数据包的总大小。仅显示启用 PFC 的流量类别。 |

#### 端口 PFC 统计（新一代） {#port-pfc-stats-new-generations}

**示例**

```routeros
[admin@crs812] /interface/ethernet/switch/qos/port> print pfc interval=1 where pfc=roce
                 name:       sfp56-5 
                  pfc:          roce
             rx-pause:           287              
             tx-pause:            46             
             pfc3-use:     2 184 200 
```

| 属性 | 说明 |
| :-- | :-- |
| **name** | 端口名称。 |
| **pfc** | PFC 配置文件名称。 |
| **pfc0-use .. pfc7-use** | 相应流量类别的当前缓冲区使用量（字节）。换句话说，它是从该端口接收的所有端口上所有排队数据包的总大小。仅显示启用 PFC 的流量类别。 |
| **rx-pause** | 接收到的暂停帧数量。 |
| **tx-pause** | 发送的暂停帧数量。 |

### QoS 菜单 {#qos-menu}

**子菜单：** `/interface/ethernet/switch/qos`

整个 QoS 硬件配置位于 `/in/eth/sw/qos` 下。这种集中式方法允许您将所有 QoS 相关配置项存储在一个位置，便于使用 `/in/eth/sw/qos/export` 监控和导出设置。

QoS 条目有两个主要标志指示符：

- **H** - 硬件卸载条目。
- **I** - 非活动条目。

### QoS 设置 {#qos-settings}

**子菜单：** `/interface/ethernet/switch/qos/settings`

| 属性 | 描述 |
| :-- | :-- |
| **mirror-buffers** (*percent**: 1..90*；默认：**auto**) | 用于[镜像](./marvell-prestera-switch-chip-features.md#mirroring)流量的最大数据包缓冲区数量（占总缓冲区内存的百分比）。 |
| **mirror-profile** (*name*；默认：**default**) | 要分配给[镜像](#qos-profile)数据包的 [QoS 配置文件](./marvell-prestera-switch-chip-features.md#mirroring) 名称（参见 **`/in/eth/sw/qos/profile`**）。 |
| **multicast-buffers** (*percent**: 1..90*；默认：**auto**) | 用于组播/广播流量的最大数据包缓冲区数量（占总缓冲区内存的百分比）。 |
| **shared-buffers** (*percent**: 0..90*；默认：**auto**) | 端口之间共享的最大数据包缓冲区数量（占总缓冲区内存的百分比）。将其设置为 0 会禁用缓冲区共享。剩余的缓冲区内存会在端口之间分配。在使用**动态缓冲区**的新一代交换芯片上，所有缓冲区都按共享方式处理。交换芯片会根据当前拥塞程度自动调整端口和队列缓冲区限制。使用 auto 值可让设备利用 100% 的可用缓冲区内存，这是大多数场景下的推荐设置。在延迟比避免丢包更重要的特定用例中，可以手动降低缓冲区限制。 |
| **lossless-buffers**(*percent**: 0..100*；默认：**auto**) | 如果设备支持多个共享缓冲池，此设置允许调整无损池的大小（占*共享*缓冲区内存的百分比，其中 100% 表示由 **shared-buffers** 设置分配的所有共享缓冲区）。例如，如果 shared-buffers=50 且 lossless-buffers=80，则无损池获得总缓冲区内存的 40%（50% 的 80%，即“0.8 \* 0.5 = 0.4”），有损池获得剩余 10% 的共享缓冲区。 |
| **lossless-traffic-class**(*integer array: 0..7*；默认：**auto**) | 无损流量类别列表。 |
| **wred-threshold**(*low \| medium \| high;*默认：**medium**) | 超过共享队列上限（`queueX-shared-packet-cap` 或 `queueX-shared-byte-cap`）后发生随机丢包的相对数据包数量。此阈值仅适用于启用了 [加权随机早期检测](./quality-of-service.md#weighted-random-early-detection-wred)（**wred=yes**）并使用共享缓冲区（****use-shared-buffers=yes)**** 的队列。队列缓冲区占用水平越高，丢包概率越高。*low* 阈值意味着随机尾部丢弃开始得更晚；*high* 则更早。 |

### QoS 监控 {#qos-monitor}

**命令：**`/interface/ethernet/switch/qos/monitor`

#### 示例 {#example}

```ros
[admin@crs312] /interface/ethernet/switch/qos> monitor once
           total-packet-cap: 11 480   
           total-packet-use: 0        
             total-byte-cap: 2648.0KiB
             total-byte-use: 0        
       multicast-packet-cap: 1 148    
       multicast-packet-use: 0        
         multicast-byte-cap: 264.8KiB 
         multicast-byte-use: 0        
  mirror-ingress-packet-cap: 1 148    
  mirror-ingress-packet-use: 0        
    mirror-ingress-byte-cap: 264.8KiB 
    mirror-ingress-byte-use: 0        
   mirror-egress-packet-cap: 1 148    
   mirror-egress-packet-use: 0        
     mirror-egress-byte-cap: 264.8KiB 
     mirror-egress-byte-use: 0        
      lossy-pool-packet-cap: 2 301    
      lossy-pool-packet-use: 0        
   lossless-pool-packet-cap: 2 301    
   lossless-pool-packet-use: 0        
        lossy-pool-byte-cap: 530.0KiB 
        lossy-pool-byte-use: 0        
     lossless-pool-byte-cap: 530.0KiB 
     lossless-pool-byte-use: 0 
```

监控硬件 QoS 资源。

| 属性 | 说明 |
| :-- | :-- |
| **total-packet-cap** *(integer)* | 总数据包容量。设备可在所有队列中存储的硬件数据包描述符最大数量。 |
| **total-packet-use** *(integer)* | 总数据包使用量。当前驻留在硬件内存中的数据包描述符数量。 |
| **total-byte-cap** *(byte)* | Tx 内存总容量。 |
| **total-byte-use** *(byte)* | Tx 内存总使用量。所有 tx 队列中数据包当前占用的字节数。 |
| **multicast-packet-cap***(integer)* | 组播数据包容量。组播/广播流量可使用的硬件数据包描述符最大数量。取决于 **multicast-buffers** 设置。 |
| **multicast-packet-use** *(integer)* | 组播数据包使用量。硬件会为每个组播目的地复制一份数据包描述符。 |
| **mirror-ingress-packet-cap** *(integer)* | 入站镜像数据包容量。入站镜像流量可使用的硬件数据包描述符最大数量。取决于 **mirror-buffers** 设置。 |
| **mirror-ingress-packet-use** *(integer)* | 入站镜像数据包使用量。 |
| **mirror-ingress-byte-cap** *(byte)* | 入站镜像字节容量。取决于 **mirror-buffers** 设置。 |
| **mirror-ingress-byte-use** *(byte)* | 入站镜像字节使用量。 |
| **mirror-egress-packet-cap** *(integer)* | 出站镜像数据包容量。出站镜像流量可使用的硬件数据包描述符最大数量。取决于 **mirror-buffers** 设置。 |
| **mirror-egress-packet-use** *(integer)* | 出站镜像数据包使用量。 |
| **mirror-egress-byte-cap** *(byte)* | 出站镜像字节容量。取决于 **mirror-buffers** 设置。 |
| **mirror-egress-byte-use** *(byte)* | 出站镜像字节使用量。 |
| **shared-packet-cap** *(integer)* | 共享数据包容量。端口和 tx 队列之间可共享的硬件数据包描述符最大数量。取决于 **shared-buffers** 设置。 |
| **shared-packet-use** *(integer)* | 共享数据包使用量。所有 tx 队列当前使用的共享数据包描述符数量。 |
| **shared-byte-cap** *(byte)* | 共享 Tx 内存容量。取决于 **shared-buffers** 设置。 |
| **shared-byte-use** *(byte)* | 共享 Tx 内存使用量。所有 tx 队列中数据包当前占用的共享缓冲区数量。 |
| **lossy-pool-packet-cap**(integer) | 有损池的共享数据包容量。如果设备不支持多个共享池，则省略该字段。 |
| **lossy-pool-packet-use (integer)** | 有损池的共享数据包使用量。如果设备不支持多个共享池，则省略该字段。 |
| **lossless-pool-packet-cap (integer)** | 无损池的共享数据包容量。如果设备不支持多个共享池，则省略该字段。 |
| **lossless-pool-packet-use (integer)** | 无损池的共享数据包使用量。如果设备不支持多个共享池，则省略该字段。 |
| **wred-packet-cap** *(integer)* | 队列可超过共享上限（`/in/eth/sw/qos/port/print usage` 中的 `queueX-shared-packet-cap`）以触发随机尾部丢弃的最大数据包数量。例如，如果 `queue1-shared-packet-cap=3072` 且 `wred-packet-cap=512`，则当 `queue1-packet-use` 超过 3072 时触发 WRED，并在 3072+512=3584 个数据包时达到 100% 丢弃率。 |
| **wred-byte-cap** *(integer)* | 队列可超过共享上限（`queueX-shared-byte-cap`）以触发随机尾部丢弃的最大字节数。例如，如果 `queue1-shared-byte-cap=768KiB` 且 `wred-byte-cap=128KiB`，则当 `queue1-packet-use` 超过 768KiB 时触发 WRED，并在 768+128=896KiB 时达到 100% 丢弃率。 |

### QoS 配置文件 {#qos-profile}

**子菜单：** `/interface/ethernet/switch/qos/profile`

QoS 配置文件决定转发/路由数据包的优先级字段值（PCP、DSCP）。拥塞避免/解决基于 QoS 配置文件。每个数据包会根据入站交换机端口 QoS 设置获得一个 QoS 配置文件分配（参见 `/in/eth/sw/port`）。

| 属性 | 说明 |
| :-- | :-- |
| ****color**** (*green \| yellow \| red*；默认：**green**) | 用于颜色感知丢弃优先级管理的流量颜色。对于颜色盲丢弃优先级管理，请保留默认值（green）。 |
| ****dscp**** (*integer: 0..63*；默认：**0**) | 分配给该 QoS 配置文件的出站数据包的 IPv4/IPv6 DSCP 字段值。 |
| **name** (*string*；默认：) | 用户定义的 QoS 配置文件名称。 |
| **pcp** (*integer: 0..7*；默认：**0**) | VLAN 优先级值（IEEE 802.1q PCP - 优先级代码点）。仅在分配给该 QoS 配置文件的出站数据包带有 VLAN 标签（具有 802.1q 报头）时使用。该值可通过 QoS Egress Map 进一步修改。 |
| **traffic-class** (*integer: 0..7*；默认：**0**) | 流量类别决定数据包优先级和出站队列（参见 **tx-manager**）。队列号通常与流量类别相同（tc0 的数据包进入 queue0，tc1 - queue1，... tc7 - queue7）。与 pcp 不同（其中 0 表示默认优先级，而 1 表示最低优先级，且可进一步自定义），流量类别严格有序。TC0 始终选择最低优先级，依此类推。 |
| ******automap******(yes*\| no*；默认：**yes**) | 自动将具有匹配 PCP 或 DSCP 值的数据包映射到此 QoS 配置文件。仅适用于**受信任**端口。 |

### QoS 映射 {#qos-mapping}

**子菜单：** `/interface/ethernet/switch/qos/map`

用于受信任数据包的优先级到配置文件映射表。所有交换芯片都有一个内置映射表 - **default**。此外，某些型号允许用户定义自定义映射表，并通过 **qos-map** 属性为不同交换机端口分配不同映射表：

- 基于 **Marvell Prestera **98DX224S、98DX226S**** 或 ****98DX3236**** 交换芯片型号的设备仅支持一个映射表 - default。
- 基于 **Marvell Prestera 98DX8xxx**、**98DX4xxx** 交换芯片或 **98DX325x** 型号设备的设备最多支持 12 个映射表（默认 + 11 个用户定义）。

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*；默认：) | 用户定义的映射表名称。 |

#### `VLAN Map` {#vlan-map}

**子菜单：** `/interface/ethernet/switch/qos/map/vlan`

将 VLAN 优先级（802.1p PCP/DEI 字段）匹配到 QoS 配置文件。默认情况下，所有值都匹配到默认 QoS 配置文件。

| 属性 | 说明 |
| :-- | :-- |
| ****dei-only**** (yes *\| no*；默认：**no**) | 仅映射 VLAN 报头中设置了 DEI（原 CFI）位的数据包。 |
| **map** (*name*；默认：**default**) | 映射表名称。 |
| **profile** (*name*；默认：) | 要分配给匹配数据包的 QoS 配置文件名称。 |
| **pcp** (*range: 0..7*；默认：**0**) | 用于查找的 VLAN 优先级（PCP）值。 |

#### DSCP 映射 {#dscp-map}

**子菜单：** `/interface/ethernet/switch/qos/map/ip`

将 DSCP 值匹配到 QoS 配置文件。

| 属性 | 说明 |
| :-- | :-- |
| **dscp** (*range: 0..63*；默认：**0**) | 用于查找的 DSCP 值。 |
| **map** (*name*；默认：**default**) | 映射表名称。如果未设置，则会修改标准（内置）映射表。 |
| **profile** (*name*；默认：) | 要分配给匹配数据包的 QoS 配置文件名称。 |

### 传输管理器 {#transmission-manager}

**子菜单：** `/interface/ethernet/switch/qos/tx-manager`

传输（Tx）管理器控制数据包入队传输和传输顺序。不同的交换机端口可以分配到不同的 Tx 管理器。硬件 Tx 管理器的最大数量取决于交换芯片型号。

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*；默认：) | 用户定义的 Tx 管理器名称 |
| **queue-buffers***(percent: 0%..100% \| bytes \| auto;*默认：**auto**) | 分配给链接到此 Tx 管理器的所有端口的总硬件 Tx 缓冲区数量。除 **auto** 外的任何值都**不会**按端口数量缩放。例如，如果 queue-buffers=30%，并且有 3 个端口使用此 Tx 管理器，则每个相应端口获得总可用资源的 10%。再向该 Tx 管理器添加两个端口会将每端口缓冲区降至 6%（30/5）。 |

:::info
端口状态不会影响已分配的资源。如果运行中的端口与断开或禁用的端口都分配到同一 Tx 管理器，则它们会获得相同数量的队列缓冲区。
:::

#### 传输队列调度器 {#transmission-queue-scheduler}

**子菜单：** `/interface/ethernet/switch/qos/tx-manager/queue`

每个端口有八个 Tx 队列。分配的 Tx 管理器控制数据包入队并调度传输顺序。每个队列可以具有严格优先级（其中具有最高流量类别的数据包始终优先传输），也可以分组在一起进行加权轮询 tx 调度。

创建 Tx 管理器会自动创建所有八个相应的队列调度器。

:::danger
更改 Tx 管理器或队列的任何属性都会在卸载过程中完全停止流量入队和传输。设备转发流量时预计会出现临时丢包。
:::

| 属性 | 描述 |
| :-- | :-- |
| **tx-manager** (*name*；*read-only*) | 链接的 Tx 管理器 |
| **traffic-class** (*integer: 0..7*；*read-only*) | 调度器控制的流量类别（tc0..tc7）及相应端口队列（queue0..queue7）。 |
| **schedule**(*strict-priority \| high-priority-group \| low-priority-group* ) | strict-priority - 相应队列中的数据包始终在转到较低流量类别之前被调度。在当前队列为空之前，不会传输较低流量类别的数据包。high-priority-group - 组中的所有队列通过加权轮询原则一起调度。例如，如果 TC5 的权重为 4，TC4 为 3，TC3 为 2，则调度器在一轮中从 queue5 传输 4 个数据包，从 Q4 传输 3 个，从 Q3 传输 2 个。为实现更低延迟，每轮会在组中的所有队列之间“切片”。换句话说，上述示例每轮的数据包顺序是“Q5、Q4、Q3、Q5、Q4、Q3、Q5、Q4、Q5”。low-priority-group - 逻辑与 high-priority-group 类似，但只有在高优先级组中的所有队列都为空时，才会调度 low-priority-group。 |
| **weight** *(integer: 0..255;* 默认：**1**) | 如果流量类别是调度组成员，则为该流量类别的权重值。在严格优先级调度的情况下不使用该字段。 |
| ****queue-buffers*****(percent: 0%..100% \| bytes \| auto;*默认：**auto**) | 分配给此队列的硬件 Tx 缓冲区数量。除 **auto** 外的任何值都**不会**按端口数量缩放，即该值会分配到链接到 Tx 管理器的端口上。以百分比给出时，表示 tx-manager 的 queue-buffers 值的百分比。 |
| ****use-shared-buffers**** *(yes \| no)* | 允许队列在 **queue-buffers** 已满时使用共享缓冲池。如果队列已满且共享缓冲区已禁用，则数据包会被丢弃。如果启用了共享缓冲区，则队列最多可使用共享池中的 **shared-packet-cap** 或 **shared-poolX-packet-cap** 个数据包（详情参见 [QoS 设置](#qos-settings)）。 |
| ****wred****(*yes \| no*；默认：**no)** | 为给定队列启用/禁用 [加权随机早期检测](./quality-of-service.md#weighted-random-early-detection-wred)。 |
| *****ecn (******yes \| no; 默认：**no**)* | 启用/禁用传输数据包的 [ECN 标记](http://help.mikrotik.com#ecn)。 |
| ****wred-actual****(*yes \| no*；只读) | 实际 WRED 值。 |
| ****ecn-actual**** (*yes \| no*；只读) | 实际 ECN 值。 |

:::danger
在某些设备型号上，由于硬件限制，在一个队列上启用 ECN 会为所有队列上支持 ECN 的数据包开启 CE 标记。在这种情况下，尽管 `ecn=no`，但 `ecn-actual=yes`。
:::

### 基于优先级的流量控制（PFC） {#priority-based-flow-control-pfc-1}

**子菜单：** `/interface/ethernet/switch/qos/priority-flow-control`

[PFC](./quality-of-service.md#priority-based-flow-control-pfc) 配置按配置文件组织。不同的交换机端口可以分配到不同的 PFC 配置文件。硬件 Tx 管理器的最大数量取决于交换芯片型号。名为“**disabled**”的内置配置文件无法更改。

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*；默认：) | 用户定义的 PFC 配置文件名称 |
| **pause-threshold** (*percent: 0%..100% \| bytes \| auto;* 默认：**auto)** | 当已入队数据包总大小达到此阈值时，发送暂停帧（XOFF）。已入队数据包按入站端口计数。仅在 **tx=yes** 时适用。该值可以显式以字节或相应共享池大小（**shared-poolX-byte-cap**）的百分比给出。 |
| **resume-threshold** (*percent: 0%..100% \| bytes \| auto;* 默认：**auto)** | 当已入队数据包总大小降到该阈值时，发送恢复帧（XON）。已入队数据包按入站端口计数。仅在 **tx=yes** 时适用。该值可以显式以字节或相应共享池大小（**shared-poolX-byte-cap**）的百分比给出。 |
| ****rx**** (*yes \| no*；默认：**no)** | 启用接收 PFC 帧。收到的 PFC 帧会在 PFC 帧指定的持续时间内暂停接收到该 PFC 帧的端口上的特定优先级队列。禁用 rx 会禁用队列暂停。 |
| **traffic-class** (*integer array: 0..7*) | 启用 PFC 的流量类别列表。 |
| **tx** (*yes \| no*；默认：**no)** | 启用发送 PFC 帧。 |
