---
title: "服务质量"
description: "本文档介绍 MikroTik RouterOS 中适用于搭载 Marvell Prestera 交换芯片设备的 Quality of Service（QoS）功能，详细说明 QoS 优先级、流量整形和拥塞管理。文档涵盖 RouterOS v7.23 的增强功能，例如无损流量支持、动态缓冲区，以及适用于各种交换机型号的 QoS 设备兼容性表。"
tags:
  - 'qos'
  - 'marvell-prestera'
  - 'active-queue-management'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/quality-of-service
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本文档介绍在配备 **[Marvell Prestera switch chips](/docs/7.24/bridging-and-switching/marvell-prestera-switch-chip-features)** 的设备上，RouterOS 中 **Quality of Service (QoS)** 的实现。

QoS 是网络交换机中的一组功能，可让网络管理员对流量进行优先级划分并分配网络资源，以确保关键数据以低延迟顺畅传输。

网络交换机中 QoS 的主要功能是以满足不同类型网络应用特定要求的方式管理流量。例如，语音和视频数据需要低延迟和最小数据包丢失，以确保高质量通信；而文件传输和其他数据应用可以容忍较高水平的延迟和数据包丢失。

QoS 通过识别流经交换机的流量类型，并根据其要求为其分配优先级来工作。随后，交换机使用此信息修改数据包头并对流量进行优先级排序，确保高优先级流量比低优先级流量获得优先处理。

支持所有 QoS 功能需要 RouterOS v7.15 或更高版本：

1. **QoS Marking。** 根据入站数据包头匹配 QoS profile，然后根据分配的 QoS profile 修改出站数据包头。
2. **QoS Enforcement。** 根据分配的 QoS profile 和流量整形避免或解决拥塞。
3. **QoS Policy。** 通过 ACL 规则分配 QoS profile。
4. 主动队列管理：**WRED**（Weighted Random Early Detection）、**ECN** 通知和处理、**PFC**（Priority-based Flow Control）。
5. 流量整形。

### RouterOS v7.23 中的 QoS 变更 {#qos-changes-in-routeros-v723}

RouterOS v7.23 对 Quality of Service (QoS) 卸载进行了重大变更。这些变更简化了配置过程，并增加了对“无损”流量类别的支持。尽管硬件资源有限，但当所有连接的设备都支持并正确配置这些功能时，使用 ECN 和/或 PFC 的主动队列管理可以防止数据包丢失。以前的 RouterOS 版本已经支持 ECN 和 PFC，但 v7.23 简化了它们的设置方式。

:::info
并非所有设备都支持无损流量。请查看 QoS Device Support 表。
:::

#### 配置变更摘要 {#configuration-change-summary}

- QoS Settings：大多数更改默认设为“auto”，使 RouterOS 能够为该配置选择已知的最佳设置。
- QoS Settings：新增 `lossless-traffic-class` 和 `lossless-buffers`，可显式指定无损流量并为其预留队列资源。用户也可以将这些字段保留为“auto”。
- QoS Monitor：分别显示有损和无损流量的共享池使用情况。
- Tx Queue：移除了共享池索引。RouterOS 会根据流量类型（有损或无损）自动选择共享池。
- QoS Profile：新增到指定 PCP 和 DSCP 值的自动映射（默认启用）。例如，添加 DSCP=46 的 QoS profile 会自动将该 profile 应用于从受信任端口接收的流量。

## QoS 术语 {#qos-terminology}

本节定义本文档中使用的关键术语和缩写：

- **QoS** - Quality of Service，一组使网络管理员能够优先处理流量并分配网络资源的功能。
- **ACL** - Access Control List，一组交换机规则，用于根据指定条件过滤网络流量。
- **AQM** - Active Queue Management，一种拥塞控制机制，通过在队列溢出之前丢弃或标记数据包来管理流量。
- **DSCP** - Differentiated Services Code Point，IP 报头中的 6 位字段，用于优先处理网络流量。
- **ECN** - Explicit Congestion Notification，一种机制，使路由器能够在不丢弃数据包的情况下向端点设备指示拥塞。
- **ETS** - Enhanced Transmission Selection，一种流量调度方法，使用加权轮询在多个队列组之间分配带宽。
- **PCP** - Priority Code Point，VLAN 报头中的 3 位字段，用于在 VLAN 内优先处理流量。
- **PFC** - Priority-based Flow Control（IEEE 802.1Qbb），一种流控机制，用于暂停特定优先级队列上的流量以防止数据包丢失。
- **RoCE** - RDMA over Converged Ethernet，一种协议，支持通过以太网网络进行远程直接内存访问。
- **WRED** - Weighted Random Early Detection，一种拥塞避免机制，在队列接近容量时随机丢弃数据包。
- **/in/eth/sw/** - `/interface/ethernet/switch/` 的 CLI 快捷方式。

## 新一代 Marvell Prestera 交换芯片中的 QoS 增强 {#qos-enhancements-in-new-generation-marvell-prestera-switch-chips}

搭载新一代 Marvell Prestera 交换芯片的 MikroTik 设备（例如运行 [switch-marvell package](/docs/7.24/getting-started/installation-and-upgrade/packages#extra-packages) 的 CRS8xx 系列）提供了一种新的 QoS 实施方法。以前的型号需要在保证缓冲区和共享 Tx 队列缓冲区之间进行权衡。通过提高共享缓冲区百分比，设备可以吸收更大的流量突发，但同时，一个拥塞端口可能占用所有共享缓冲区，从而限制其他端口的 QoS 能力。使用新一代交换芯片可通过引入 **Dynamic Buffers** 兼顾两者优势。交换芯片会根据当前拥塞级别动态调整端口和队列缓冲区限制。如果设备内没有拥塞，单个端口可以吸收大量突发流量，从而防止数据包丢失。当多个端口的 Tx 队列大小增加时，设备会降低每端口和每队列限制，在确保非拥塞队列有足够缓冲区继续转发流量的同时，强制公平使用共享资源。整个过程自动完成，用户无需配置。

新一代 Marvell Prestera 交换芯片的另一项改进，是消除了用于存储控制数据的入队数据包描述符不足的问题。上一代设备具有 Packet Cap 和 Use 统计。当设备收到小数据包突发流量时，即使有足够的队列缓冲区存储有效载荷，也可能因达到 Packet Cap 而开始尾部丢弃数据包。新一代设备确保始终有足够的内存存储控制数据，使 Dynamic Buffer 大小成为唯一的限制因素。因此，新一代设备中没有 Packet Cap/Use 统计。

新一代设备要求始终启用 QoS HW Offloading（**qos-hw-offloading=yes**）。RouterOS 会忽略用户禁用它的请求，但为保持向后兼容性仍保留该字段。

## QoS 设备支持 {#qos-device-support}

<WideTable>

| 交换芯片 | 型号 | QoS Profiles | QoS Maps | Tx Managers | WRED | ECN | PFC | Lossless Buffers | Dynamic Buffers | 端口/队列使用统计 |
| :-- | :-- | --: | --: | --: | :-- | :-- | :-- | :-- | :-- | :-- |
| **98DX3236** | CRS305-1G-4S+IN <br/> CRS326-24G-2S+ (RM/IN) <br/> CRS328-24P-4S+RM <br/> CRS328-4C-20S-4S+RM | 128 | 1 | 8 |  |  |  |  |  | 当前值 |
| **98DX226S** | CRS305-1G-4S+OUT (FiberBox Plus) <br/> CRS310-1G-5S-4S+ (netFiber 9/IN) <br/> CRS310-8G+2S+IN <br/> CRS318-16P-2S+OUT (netPower 16P) <br/> CRS320-8P-8B-4S+RM <br/> CRS418-8P-8G-2S+RM <br/> CRS418-8P-8G-2S+5axQ2axQ-RM | 128 | 1 | 8 |  |  |  |  |  | 当前值 |
| **98DX224S** | CRS318-1Fi-15Fr-2S-OUT (netPower 15FR) | 128 | 1 | 8 |  |  |  |  |  | 当前值 |
| **98DX2528** | CRS304-4XG-IN | 128 | 1 | 8 |  |  |  |  |  | 当前值 |
| **98DX8525** | CCR2216-1G-12XS-2XQ <br/> CRS518-16XS-2XQ-RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 最大填充量 <sup>1</sup> |
| **98DX4310** | CRS504-4XQ (IN/OUT) <br/> CRS510-8XS-2XQ-IN <br/> RDS2216-2XG-4S+4XS-2XQ | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 最大填充量 <sup>1</sup> |
| **98DX8208** | CRS309-1G-8S+IN | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98DX8212** | CRS312-4C+8XG-RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98DX8216** | CRS317-1G-16S+RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98DX8332** | CRS326-24S+2Q+RM <br/> CRS326-4C+20G+2Q+RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98DX3257** | CRS354-48G-4S+2Q+RM <br/> CRS354-48P-4S+2Q+RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98DX3255** | CCR2116-12G-4S+ | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 当前值 <sup>2</sup> |
| **98CX8410** | CRS520-4XS-16XQ-RM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ |  | 不可用 <sup>3</sup> |
| **98DX7335** | CRS812-8DS-2DQ-2DDQ-RM <br/> CRS804-4DDQ-hRM | 1024 | 12 | 15 | ✔ | ✔ | ✔ | ✔ | ✔ | 当前值 + 最大填充量 |

</WideTable>

<sup>**1**</sup> The device gathers max queue fill statistics instead of displaying the current usage values. Use the `reset-counters` command to clear those stats.  
<sup>**2**</sup> Due to hardware limitations, some switch chip models may experience temporary traffic flow disruption while reading or polling QoS port/queue usage data.  
<sup>**3**</sup> Usage data for individual queues on a port is unavailable; only the aggregate total usage for the entire physical port can be accessed.

## 应用和使用示例 {#applications-and-usage-examples}

---

### 基本配置示例 {#basic-configuration-example}

本示例演示如何在标准 Best Effort 类之上，为 VoIP（IP 电话）配置单个 QoS 级别。配置使用 CRS326-24G-2S+ 设备，并采用以下设置：

- 所有端口均已加入网桥并使用 **[vlan-filtering](/docs/7.24/bridging-and-switching/quality-of-service#bridge-vlan-filtering)**；
- sfp-sfpplus1 用作连接到另一台交换机的 VLAN trunk；
- ether1 至 ether9 是 IP 电话的专用端口；
- ether10 至 ether24 是用于连接主机的标准端口。

首先，定义一个 QoS 配置。该配置指定将应用于出口转发数据包的 DSCP 和 PCP 值：

```ros
/interface/ethernet/switch/qos/profile
add dscp=46 name=voip pcp=5 traffic-class=5
```

接下来，将 VoIP QoS 配置分配给 IP 电话专用端口。这会将该配置应用于这些端口上的入口流量。所有其他以太网端口将使用默认配置（其中 dscp=0 和 pcp=0）：

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

trunk 端口接收两种 QoS 流量。要区分它们，请启用 trust-l3 和 trust-l2：

```ros
/interface/ethernet/switch/qos/port
set sfp-sfpplus1 trust-l3=trust trust-l2=trust
```

> **注意：** 如果运行的是 RouterOS 7.23 或更高版本，VLAN 优先级和 IP DSCP 映射会自动创建，因此无需执行此步骤。如果使用更早的 RouterOS 版本，则必须使用 QoS 配置手动创建 VLAN 优先级和 IP DSCP 映射：

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

使用此配置时，端口 ether1 至 ether9 上的传入数据包会被标记为优先级代码点（PCP）值 5 和差分服务代码点（DSCP）值 46。端口 ether10 至 ether24 上的传入数据包会被标记为 PCP 和 DSCP 值 0。当数据包在 sfp-sfpplus1 端口上接收时，任何 PCP 值为 5 的数据包都会保留其 PCP 值 5 和 DSCP 值 46，而所有其他数据包都会被标记为 PCP 和 DSCP 值 0。

## Dante

从 RouterOS v7.15 开始，所有支持 QoS 的 MikroTik 设备均兼容 Dante 音频网络。

Dante 硬件使用以下 DSCP/Diffserv 优先级值进行流量优先级划分：

| Dante Priority | 用途 | DSCP 标签 | DSCP 值 |
| :-- | :-- | :-- | --: |
| High | 时间关键的 PTP 事件 | CS7 | 56 |
| Medium | 音频、PTP | EF | 46 |
| None | 其他流量 | BE | 0 |

此示例假设交换机使用默认配置，其中包括一个默认网桥接口，所有以太网接口均已添加为网桥端口。这些接口中的任意一个均可用于 Dante。

首先，创建 QoS 配置文件以匹配 Dante 流量类别。已存在一个预先创建的“default”配置文件，对应 Dante 的 None 优先级。

```ros
/interface/ethernet/switch/qos/profile
add name=dante-ptp dscp=56 pcp=7 traffic-class=7
add name=dante-audio dscp=46 pcp=5 traffic-class=5
```

如果运行的是 RouterOS 7.23 或更高版本，IP DSCP 映射会自动创建，因此无需执行此步骤。如果使用较早的 RouterOS 版本，请创建 QoS 映射，以根据 DSCP 值匹配 QoS 配置文件：

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

Dante 的 High 和 Medium 优先级流量按严格优先级顺序调度。设备会先发送时间关键的 PTP 数据包，直到 queue7 为空，然后处理音频流量（queue5）。其他流量仅在 PTP 和音频队列为空时发送。

下一步是为传入的第 3 层数据包（IP DSCP 字段）启用信任模式：

```ros
/interface/ethernet/switch/qos/port
set [find] trust-l3=keep
```

最后，启用 QoS 硬件卸载，使上述设置生效：

```ros
/interface/ethernet/switch
set switch1 qos-hw-offloading=yes
```

在组播模式下使用 Dante 时，建议在交换机上启用 IGMP snooping。该功能仅将流量定向到存在已订阅设备的端口，防止不必要的泛洪。此外，启用 IGMP querier（如果同一 LAN 中的其他设备尚未启用）、调整查询间隔并启用 fast-leave，可以进一步优化组播性能。

```ros
/interface/bridge
set [find name=bridge] igmp-snooping=yes multicast-querier=yes query-interval=60s

/interface/bridge/port
set [find] fast-leave=yes
```

## 基于融合以太网的 RDMA（RoCE） {#rdma-over-converged-ethernet-roce}

RoCE 支持通过以太网网络直接访问远程存储系统，而无需主机 CPU 参与。这可显著降低延迟和 CPU 开销，使 RoCE 成为高性能计算和数据中心环境的理想选择。RoCE 还支持融合网络，使各种服务（例如数据存储、网络和多媒体）运行在单一以太网基础设施上，从而简化网络管理，并降低维护独立网络的成本和复杂性。

RoCE 通过使用 **ECN** 和 **PFC** 机制实现这一点。这些功能有助于防止网络拥塞和数据包丢失，确保可靠、无损的通信。有关兼容交换机，请参阅[设备功能表](/docs/7.24/bridging-and-switching/quality-of-service#qos-device-support)。虽然交换机可以支持 RoCE 环境，但终端主机也必须兼容 RoCE 协议，并配备支持 RDMA 的网络接口卡（NIC）。

RoCE 有两个主要版本。RoCEv1 作为以太网链路层协议运行，使用 Ethertype 0x8915。RoCEv2 工作在标准 IP 网络上，使用 UDP 目标端口号 4791。IP 头中的 ECN 位被标记以指示网络拥塞，并使用拥塞通知数据包（CNP）向发送方确认拥塞。对于流量优先级，DSCP 26 用于 RoCEv2 流量，DSCP 48 用于 CNP。

以下示例可用于通过 PFC 和 ECN 实现无损 RoCEv2，并假设交换机使用默认配置，其中包括一个默认网桥接口，且所有以太网接口均已添加为网桥端口。推荐的最低 RouterOS 版本为 7.17。

首先，配置额外的 profile。非 RoCE 流量将分配到现有的“default”profile，traffic-class 为 1；RoCEv2 分配到 traffic-class 3；CNP 分配到 traffic-class 6。

```routeros
/interface/ethernet/switch/qos/profile
add dscp=26 name=roce traffic-class=3
add dscp=48 name=cnp traffic-class=6
```

如果运行的是 RouterOS 7.23 或更高版本，IP DSCP 映射会自动创建，因此无需执行此步骤。如果使用更早的 RouterOS 版本，请创建 QoS 映射，以根据 DSCP 值匹配 QoS 配置文件。

```routeros
/interface/ethernet/switch/qos/map/ip
add dscp=26 profile=roce
add dscp=48 profile=cnp
```

配置硬件队列和调度器。对 traffic-class 1 和 traffic-class 3 使用 ETS（`schedule=high-priority-group`），并分别分配 50% 带宽（`weight=1`）；对 traffic-class 6 使用严格优先级调度。此外，为 traffic-class 3 启用 ECN（`ecn=yes`），以在交换机中标记经历拥塞的 IP 数据包。

```routeros
/interface/ethernet/switch/qos/tx-manager/queue
set 1 schedule=high-priority-group weight=1
set 3 schedule=high-priority-group weight=1 ecn=yes
set 6 schedule=strict-priority
```

:::tip
虽然使用 `schedule=low-priority-group` 可以为另一组 traffic-class 创建独立的 ETS 调度和带宽分配，但不建议将该设置与 `lldp-dcbx=yes` 一起使用。原因是 ETS Configuration/Recommendation TLV 设计用于处理跨 traffic class 的单一带宽分配，因此应改用 `schedule=high-priority-group`。
:::

为 traffic-class 3 配置 PFC 配置文件，以确保 RoCEv2 流量处于无损环境。

```routeros
/interface/ethernet/switch/qos/priority-flow-control
add name=pfc-tc3 rx=yes traffic-class=3 tx=yes
```

在预期有 RoCEv2 流量的交换机端口上设置 Layer3 信任模式（`trust-l3=keep`）。设置 PFC（`pfc=pfc-tc3`）和 queue3 的出口速率，以满足 PFC 要求（`egress-rate-queue3=10.0Gbps`）。本示例使用 10Gbps SFP+ 接口，出口速率可设置为与接口物理速率一致。请根据接口速率更改该属性。

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

启用 LLDP Data Center Bridging Capability Exchange Protocol（DCBX），与其他相邻设备共享 QoS 设置和能力。

```routeros
/ip/neighbor/discovery-settings
set lldp-dcbx=yes
```

作为可选步骤，增大 L2MTU 以容纳更大的数据包。

```routeros
/interface/ethernet
set [find switch=switch1] l2mtu=9500
```

## QoS 标记 {#qos-marking}

---

### 理解映射范围 {#understanding-map-ranges}

为避免逐个定义所有可能的 PCP 和 DSCP 映射，RouterOS 允许在创建 QoS profile 映射时为 PCP 和 DSCP 指定多个值或范围。

在本示例中，PCP 值 0 和 2 使用默认 QoS profile，值 1 和 3-4 使用 streaming profile，值 5 使用 voip profile，值 6-7 使用 control profile：

```ros
/interface/ethernet/switch/qos/map/vlan
add pcp=1,3-4 profile=streaming
add pcp=5 profile=voip
add pcp=6-7 profile=control
```

这种方法将相关优先级值分组处理，而不是为每个单独的值创建独立的映射规则，从而简化配置。

### 理解端口、profile 和映射的关系 {#understanding-port-profile-and-map-relation}

每个交换机端口都有 Layer2 和 Layer3 trust 设置，这些设置会改变入站数据包分类到 QoS profile 的方式，以及使用的 PCP 和 DSCP 值。下表描述了所有可能的选项：

| **qos-trust-l2** | **qos-trust-l3** | 行为 |
| :-- | :-- | :-- |
| **ignore** | **ignore** | 该端口被视为不可信。两个报头都会被忽略，所有入站数据包都会强制使用该端口的 **profile**。这是默认设置。 |
| **ignore** | **trust** | 信任 Layer 3 报头。使用入站数据包 IP 报头中的 DSCP 字段查找 QoS profile（请参阅 `/in/eth/sw/qos/map/ip`）。如果查找失败（没有 QoS profile 映射到给定的 DSCP 值），则使用 **default** QoS profile（而不是交换机端口的 QoS profile）。交换机端口的 **profile** 字段仅用于非 IP 流量。 |
| **ignore** | **keep** | 信任 Layer 3 报头。使用入站数据包 IP 报头中的 DSCP 字段查找 QoS profile（请参阅 `/in/eth/sw/qos/map/ip`）。如果查找失败，则使用 **default** QoS profile。交换机端口的 **profile** 字段仅用于非 IP 流量。如果转发/路由的数据包带有 VLAN 标签，则其 PCP 值由所选 QoS profile 设置。不过，数据包的原始 DSCP 值保持不变。 |
| **trust** | **ignore** | 信任 Layer 2 报头，但忽略 L3。如果入站数据包带有 VLAN 标签，则使用 VLAN 报头中的 PCP 字段查找 QoS profile（请参阅 `/in/eth/sw/qos/map/vlan`）。如果查找失败（没有 QoS profile 映射到给定的 PCP 值），则使用 **default** QoS profile。交换机端口的 **profile** 字段仅用于未带标签的流量。 |
| **trust** | **trust** | 信任两个报头，但 Layer 3 优先级更高。对于 IP 数据包，使用 DSCP 字段查找 QoS profile（请参阅 `/in/eth/sw/qos/map/ip`）。如果 DSCP 到 QoS 的查找失败，则使用 **default** profile。如果数据包不是 IP 数据包但带有 VLAN 标签，则使用 VLAN 报头中的 PCP 字段查找 QoS profile（请参阅 `/in/eth/sw/qos/map/vlan`）。如果 VLAN 到 QoS 的查找失败，则使用 **default** QoS profile。非 IP 未带标签的数据包使用交换机端口的 **profile**。 |
| **trust** | **keep** | 与 **trust+trust** 相同，但在转发/路由的数据包中保留原始 DSCP 值。 |
| **keep** | **ignore** | 信任 Layer 2 报头，但忽略 L3。如果入站数据包带有 VLAN 标签，则使用 VLAN 报头中的 PCP 字段查找 QoS profile（请参阅 `/in/eth/sw/qos/map/vlan`）。如果查找失败（没有 QoS profile 映射到给定的 PCP 值），则使用 **default** QoS profile。交换机端口的 **profile** 字段仅用于未带标签的流量。如果数据包在入站和出站时都带有 VLAN 标签，则保留原始 PCP 值。 |
| **keep** | **trust** | 信任两个报头，但 Layer 3 优先级更高。对于 IP 数据包，使用 DSCP 字段查找 QoS profile（请参阅 `/in/eth/sw/qos/map/ip`）。如果 DSCP 到 QoS 的查找失败，则使用 **default** profile。如果数据包不是 IP 数据包但带有 VLAN 标签，则使用 VLAN 报头中的 PCP 字段查找 QoS profile（请参阅 `/in/eth/sw/qos/map/vlan`）。如果 VLAN 到 QoS 的查找失败，则使用 **default** QoS profile。非 IP 未带标签的数据包使用交换机端口的 **profile**。如果数据包在入站和出站时都带有 VLAN 标签，则保留原始 PCP 值。转发/路由数据包中的 DSCP 值由所选 QoS profile 设置。 |
| **keep** | **keep** | 信任两个报头，但 Layer 3 优先级更高。对于 IP 数据包，使用 DSCP 字段查找 QoS profile（请参阅 `/in/eth/sw/qos/map/ip`）。如果 DSCP 到 QoS 的查找失败，则使用 **default** profile。如果数据包不是 IP 数据包但带有 VLAN 标签，则使用 VLAN 报头中的 PCP 字段查找 QoS profile（请参阅 `/in/eth/sw/qos/map/vlan`）。如果 VLAN 到 QoS 的查找失败，则使用 **default** QoS profile。非 IP 未带标签的数据包使用交换机端口的 **profile**。对于带有 VLAN 标签和/或 IP 的数据包，分别保持原始 PCP 和/或 DSCP 值不变。 |

<WideTable>

| **端口设置** |  | 转发/路由数据包中所选 QoS 配置文件以及 PCP / DSCP 字段值的来源 |  |  |  |  |  |  |  |  |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **qos-trust-l2** | **qos-trust-l3** | VLAN-Tagged IP |  |  | Untagged IP |  |  | VLAN-Tagged Non-IP |  |  | Untagged Non-IP |  |  |
|  |  | QoS Profile | PCP | DSCP | QoS Profile | PCP <sup>1</sup> | DSCP | QoS Profile | PCP | DSCP | QoS Profile | PCP <sup>1</sup> | DSCP |
| ignore | ignore | profile | profile | profile | profile | profile | profile | profile | profile | - | profile | profile | - |
| ignore | trust | map/ip | map/ip | map/ip | map/ip | map/ip | map/ip | profile | profile | - | profile | profile | - |
| ignore | keep | `/map/ip` | `/map/ip` | original | `/map/ip` | `/map/ip` | original | profile | profile | - | profile | profile | - |
| trust | ignore | map/vlan | map/vlan | map/vlan | profile | profile | profile | map/vlan | map/vlan | - | profile | profile | - |
| trust | trust | `/map/ip` | `/map/ip` | `/map/ip` | `/map/ip` | `/map/ip` | `/map/ip` | `/map/vlan` | `/map/vlan` | - | profile | profile | - |
| trust | keep | `/map/ip` | `/map/ip` | original | `/map/ip` | `/map/ip` | original | `/map/vlan` | `/map/vlan` | - | profile | profile | - |
| keep | ignore | map/vlan | original | map/vlan | profile | profile | profile | map/vlan | original | - | profile | profile | - |
| keep | trust | map/ip | original | map/ip | map/ip | profile | map/ip | map/vlan | original | - | profile | profile | - |
| keep | keep | map/ip | original | original | map/ip | profile | original | map/vlan | original | - | profile | profile | - |

</WideTable>

<sup>**1**</sup> Applies only when ingress traffic is untagged, but the egress interface requires the frames to be VLAN-tagged.

### 通过交换规则（ACL）进行 QoS 标记 {#qos-marking-via-switch-rules-acl}

从 **RouterOS v7.15** 开始，可以使用 Switch Rules（ACL）为网络流量分配 QoS 配置文件。该方法支持基于各种数据包属性进行灵活的流量分类。

以下示例根据源 MAC 地址分配 QoS 配置文件：

```ros
/interface/ethernet/switch/rule
add new-qos-profile=stream port=ether1,ether2 src-mac-address=00:01:02:00:00:00/FF:FF:FF:00:00:00 switch=switch1
add new-qos-profile=voip port=ether1,ether2 src-mac-address=04:05:06:00:00:00/FF:FF:FF:00:00:00 switch=switch1
```

## QoS 强制执行 {#qos-enforcement}

### 硬件队列 {#hardware-queues}

每个交换机端口都有 8 个硬件发送（Tx）队列（queue0 至 queue7）。每个队列对应一个由 [QoS profile](/docs/cli-reference/interface/ethernet/switch/qos/profile) 定义的流量类别（tc0 至 tc7）。当数据包进入交换机时，会获得 QoS profile 分配，该分配决定流量类别，并据此选择相应的出接口队列进行发送。

硬件队列的大小可通过 [Transmission Manager](/docs/cli-reference/interface/ethernet/switch/qos/tx-manager) 配置。此外，多个端口和队列可以通过称为 *Shared Buffers* 的机制相互共享资源。例如，具有 25 个端口的设备，其缓冲区内存足以总共排队 1200 个数据包。如果资源平均分配，则每个端口获得 48 个独占缓冲区，每个队列最多 6 个数据包（48 除以 8），这通常不足以吸收即使是短暂的流量突发。但是，将 50% 的缓冲区分配给共享后，每个端口保留 24 个独占缓冲区（每个队列 3 个），同时允许单个队列增长到最多 603 个缓冲区（3 个独占缓冲区加 600 个共享缓冲区）。

RouterOS 支持为每个队列单独启用或禁用共享池。此功能有助于防止低优先级流量占用所有可用硬件内存。此外，端口缓冲区限制可以限制单个低速端口占用整个共享池。详情请参阅 [QoS Settings](/docs/cli-reference/interface/ethernet/switch/qos/settings) 和 [Transmission Manager](/docs/cli-reference/interface/ethernet/switch/qos/tx-manager)。

:::info
默认的最佳努力流量类别（PCP=0，DSCP=0）是流量类别 1，而最低优先级流量（PCP=1）使用流量类别 0。
:::

## 硬件资源 {#hardware-resources}

交换芯片的硬件资源（内存）有限。与 QoS 操作相关的硬件资源主要有两类：

- **Packet descriptor** - 包含数据包控制信息，例如目标端口、报头修改和其他元数据。
- **Data buffer** - 存储实际数据包载荷的内存块。缓冲区大小取决于交换芯片型号；通常为 256 字节。

一个数据包描述符可能会使用多个缓冲区（取决于载荷大小），在组播或广播流量情况下，缓冲区也可能由多个描述符共享。如果硬件没有足够的空闲描述符或缓冲区，数据包将被丢弃（tail-drop）。

硬件资源可以按目标类型（multicast/unicast）、端口和 TX 队列进行限制。当达到其中任一限制时，无法再将其他数据包加入发送队列，后续数据包将被丢弃。

RouterOS 抽象底层硬件细节，允许以数据包数量或占总量的百分比来配置资源限制。RouterOS 会根据用户指定的数据包限制和端口 MTU 自动计算所需的硬件描述符和缓冲区数量。此外，RouterOS 包含预配置的硬件资源，因此在常见 QoS 场景中无需手动配置。

:::danger
在运行时修改任何硬件资源分配参数都会导致设备短暂停止工作，在此期间无法将数据包加入队列或发送。设备转发流量时会出现短暂丢包。
:::

## 资源节省（上一代设备） {#resource-saving-previous-generation-devices}

:::info
本节仅适用于**不**支持 **Dynamic Buffers** 的设备。
:::

由于硬件资源无法在运行时重新分配，RouterOS 无法自动释放为非活动端口预留的队列缓冲区。这些缓冲区将保持未使用状态。不过，如果确定某个端口永远不会使用（例如，该端口始终保持物理断开状态），可以通过分配具有最小资源的内置“offline”tx-manager 手动释放相应的队列资源：

```ros
/interface/ethernet/switch/qos/port
set sfp-sfpplus1 tx-manager=offline
set sfp-sfpplus2 tx-manager=offline
```

:::danger
不要在 **switch-cpu** 端口上配置“offline”tx-manager。
:::
:::warning
为 QSFP+ 或 QSFP28 接口配置 `tx-manager` 设置时，必须对该端口的全部四个子接口应用相同配置。例如，如果接口 qsfp28-1-1 处于活动状态并以 100Gbps 链路运行，而子接口（qsfp28-1-2、qsfp28-1-3、qsfp28-1-4）显示 non-running 标志，**不要为这些 non-running 子接口分配“offline”tx-manager**。这样做也会影响 100Gbps 链路。不过，如果四个子接口均未运行，则可以安全地分配“offline”tx-manager 设置。
:::

## 流量优先级 {#traffic-prioritization}

硬件支持两种流量传输优先级类型：

- **Strict Priority** - 来自较高队列的流量始终优先传输。
- **Enhanced Transmission Selection (ETS)** - 多个队列通过加权轮询同时参与数据包传输调度。

**Strict Priority** 排队方式很直接。如果最高优先级队列（Q7）中有数据包，则先传输这些数据包。Q7 为空时，传输 Q6 中的数据包，依此类推。只有所有其他队列均为空时，才传输最低优先级队列（Q0）中的数据包。

严格优先级的缺点是，在“过度优先”高优先级队列时，会增加低优先级队列的延迟。假设 TC5 的可接受延迟为 20ms，TC3 为 50ms。由于队列的严格优先级，出现在 Q5 中的流量会立即传输，从而给较低队列（Q4..Q0）中的每个数据包增加额外延迟。Q5 中的数据包突发（例如语音通话开始）可能暂时“瘫痪”Q3，使 TC3 延迟超过可接受的 50ms（甚至因队列已满而导致数据包丢弃），而 TC5 数据包则以 &lt;1ms 传输（远低于 20ms 限制）。如果在传输 TC3 数据包时略微牺牲 TC5 延迟，就能兼顾各方。这正是 **ETS** 的用途。

**Enhanced Transmission Selection (ETS)** 以加权轮询方式调度来自多个队列（组成员）的流量传输。队列的权重设置每轮从该队列传输的数据包数量。例如，如果 Q2、Q1 和 Q0 是组成员，其权重分别为 3、2 和 1，则调度器每轮从 Q2 传输 3 个数据包，从 Q1 传输 2 个，从 Q0 传输 1 个。上述示例中每轮的实际传输顺序为“Q2、Q1、Q0、Q2、Q1、Q2”，以实现更公平的调度。

硬件中有两个组：`low-priority-group` 和 `high-priority-group`。两个组之间采用严格优先级顺序：仅当 high-priority-group 中*所有*队列均为空时，low-priority-group 才传输流量。不过，也可以只使用一个组来处理所有队列。

下面列出了默认（内置）RouterOS 队列设置。Q3-Q5 在 high-priority group 内共享带宽，当 Q6 和 Q7 为空时传输数据包。Q0-Q2 是 low-priority-group 的成员，当 Q3-Q7 为空时传输数据包。

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

WRED 是一种基于每个队列运行的拥塞控制机制。它通过在队列溢出发生之前丢弃数据包，向端点设备发送拥塞事件信号。WRED 依赖端点中对数据包丢失作出响应的速率限制机制，例如 TCP/IP。

WRED 使用随机数据包丢弃算法来预测拥塞事件，并在拥塞实际发生之前通过限制流量速率作出响应。WRED 的随机特性可防止由 TCP 流全局同步导致的吞吐量崩溃。

可以在每个 Tx Manager 中按队列启用或禁用 WRED。对无损流量类别禁用 WRED。对于不应发生拥塞的高速端口，也没有理由启用 WRED。

该行为由 WRED 阈值控制。WRED 阈值定义可超过队列共享缓冲区限制（cap）的数据包或字节的最大数量。当队列使用量超过其相应容量时，开始随机丢弃数据包：

- `queueX-packet-use > queueX-shared-packet-cap`，或
- `queueX-byte-use > queueX-shared-byte-cap`。

使用量超过容量的程度越高，数据包丢弃概率越高，在 `queueX-shared-packet-cap + wred-packet-threshold`（或等效字节值）处达到 100%。

RouterOS 会根据队列或共享池容量自动选择实际的 WRED 阈值。用户可以通过 QoS Settings 调整阈值。

:::danger
WRED 要求相应的 Tx 队列使用共享缓冲区（**use-shared-buffers=yes**）。
:::

选择 WRED 阈值需要在拥塞预判和突发吸收之间进行权衡。设置较高的 WRED 阈值可能导致更早限制流量速率，从而缓解拥塞。但是，较高的阈值会导致有限流量突发期间出现数据包丢弃，而这些突发本可由队列缓冲区吸收，并在 WRED 未激活时无损传输。

例如，发起远程数据库连接时，通常在初始化阶段会产生较大的流量（“数据包突发”），随后流量速率下降到“合理”水平。初始化阶段发生的任何数据包丢弃都会因需要重传而导致数据库连接变慢。因此，建议对此类流量降低 WRED 阈值，或完全禁用 WRED。相反的情况是视频流，早期拥塞检测有助于选择合适的流媒体速率，而不会因重传浪费过多带宽或牺牲质量等级。

:::info
使用 Switch Rules（ACL）或其他 QoS Marking 技术区分流量，并将数据包放入具有所需 WRED 设置的队列。
:::

以下脚本通过将 TCP/IP 流量重定向到 queue2，仅对该流量应用 WRED。UDP 和其他数据包保留在 queue1 中，因为其端点通常无法响应早期丢弃。Queue1 和 queue2 按相同方式调度，不优先处理任一队列：

```ros
/interface/ethernet/switch/qos/profile
add name=tcp-wred traffic-class=2 pcp=0 dscp=0

# move TCP traffic to queue2
/interface/ethernet/switch/rule
add new-qos-profile=tcp-wred ports=ether1,ether2,ether3,ether4 protocol=tcp switch=switch1

# set the same scheduling priority (weight) between queue1 and queue2
# apply WRED only to queue2 - TCP traffic
/interface/ethernet/switch/qos/tx-manager/queue/
set [find where traffic-class=1] weight=2 schedule=low-priority-group use-shared-buffers=yes wred=no
set [find where traffic-class=2] weight=2 schedule=low-priority-group use-shared-buffers=yes wred=yes
```

## 显式拥塞通知（ECN） {#explicit-congestion-notification-ecn}

某些交换机芯片型号支持符合 RFC 3168 的 IP 数据包硬件级 ECN 标记。该机制的运行方式类似 WRED，但在拥塞期间不会丢弃数据包，而是在 ECN 字段中将其标记为 CE（Congestion Experienced，二进制 11）标志。只有支持 ECN 的 IP 数据包才能接收该标记，即 ECN 字段值为 ECT(1) 或 ECT(0)（二进制 01 或 10）的数据包。不支持 ECN 的传输数据包（ECN=00）不会被标记。如果数据包已带有 CE 标记（ECN=11），则无论设备是否发生拥塞，都会保留该标记。

通过在目标 [Tx Manager Queue](/docs/7.24/bridging-and-switching/quality-of-service#transmission-manager) 上设置 **ecn=yes** 来启用 ECN 标记。

:::danger
ECN 标记机制要求相应的 Tx 队列使用共享缓冲区（**use-shared-buffers=yes**）。
:::

当满足以下**所有**条件时，数据包会收到 CE 标记：

1. 数据包为 IPv4 或 IPv6。
2. IP 报头中的 ECN 字段值为 ECT(1) 或 ECT(0)。
3. 出端口的 Tx Queue 已启用 **ecn=yes**，并使用共享缓冲区（**use-shared-buffers=yes**）。
4. 队列使用量超过共享缓冲区容量：`queueX-packet-use > queueX-shared-packet-cap` 或 `queueX-byte-use > queueX-shared-byte-cap`。

:::danger
由于启用 ECN（ecn=yes）会阻止丢弃支持 ECN 的数据包，如果流量发送方未及时响应拥塞通知，队列使用量可能会超过 WRED 阈值。
:::

## 基于优先级的流控（PFC） {#priority-based-flow-control-pfc}

基于优先级的流控（PFC）可为最多八个流量类别启用无损运行，确保一个流量类别中的拥塞不会暂停其他类别的流量。这使丢包敏感型流量与丢包容忍型流量可以在同一网络中共存。

支持 PFC 的交换芯片符合 IEEE 802.1Qbb PFC 标准，这意味着它们可以生成并响应 PFC 帧。当出端口发生拥塞时，源端口会针对受影响的流量类别发送 PFC 帧。生成的 PFC 帧使用定时器值 0xFFFF 表示暂停（XOFF），使用 0x0 表示恢复（XON），并在优先级使能向量中设置相应比特位。在接收端，PFC 帧会在 PFC 帧指定的持续时间内暂停目标端口上的特定优先级队列。

在 RouterOS 中，PFC 配置按配置文件组织。每个端口都可以分配到特定的 PFC 配置文件，该文件定义要启用 PFC 的流量类别、用于发送 XOFF 和 XON 帧的暂停和恢复阈值，以及分配的端口是否发送和/或接收 PFC 帧。

当出端口发生拥塞时，会在入端口触发 PFC。必须使用共享缓冲区将入向流量与 Tx 队列中等待的数据包关联起来。对于每个启用 PFC 的流量类别，在对应的 Tx 队列上设置 **use-shared-buffers=yes**。

:::info
RouterOS 在流量类别和 Tx 队列之间实现 1:1 映射。流量类别 0 的数据包进入 queue0，TC1 进入 queue1，依此类推，直到 TC7 进入 queue7。因此，本文档中“流量类别”和“Tx 队列”可互换使用。
:::

选择暂停和恢复阈值时，应考虑发送和处理 PFC 帧的延迟。例如，设备 A 在时间 T 发生拥塞，向设备 B 发送 PFC 暂停帧，B 处理该帧并在时间 T+D 停止发送。在时间间隔 D 内，设备 B 继续发送流量。如果设备 A 将暂停阈值配置为 100%，则没有可用缓冲区，数据包可能丢弃，这对于无损流量类别是不可接受的。将暂停阈值设置为较低值（例如 80%），可以在仍保留可用内存以吸收时间间隔 D 内流量的同时发送 PFC 暂停帧。同样的原则适用于恢复阈值。将其设置为 0% 会使设备在时间间隔内保持空闲，从而降低整体吞吐量。

PFC 接收需要为所有关联队列设置出速率，以计算暂停时间，即使该速率与线路速率相同也是如此。例如，如果 PFC 在流量类别 3 上运行，则分配的端口需要 `egress-rate-queue3` 设置。

```routeros
/interface/ethernet/switch/qos/priority-flow-control/add name=pfctc3 traffic-class=3 rx=yes
/interface/ethernet/switch/qos/port/set sfp-sfpplus1,sfp-sfpplus2 pfc=pfctc3 egress-rate-queue3=10G
```
