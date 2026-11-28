---
title: "精确时间协议（Precision Time Protocol）"
description: "MikroTik RouterOS 文档介绍了 Precision Time Protocol（PTP），用于跨网络实现亚微秒级时钟同步，支持带硬件时间戳的 IEEE 1588-2008，并提供多种 profile 选项，包括面向特定行业的 802.1AS、AES67、G.8275.1 和 SMPTE。"
tags:
  - 'ptp'
  - 'precision-time-protocol'
  - 'ieee-1588'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/precision-time-protocol
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

由电气电子工程师学会（Institute of Electrical and Electronics Engineers，IEEE）开发的精确时间协议（Precision Time Protocol，PTP）用于在局域网中同步时钟。在对精确时序要求较高的行业和应用中，例如电信、金融和工业自动化，PTP 至关重要。PTP 通常可确保亚微秒级的时间精度，但在满足硬件要求时也可实现纳秒级精度。MikroTik 的 PTP 实现支持 IEEE 1588-2008（PTPv2），并包含硬件时间戳功能，可确保纳秒级范围内的同步。有关 MikroTik PTP 功能的更多详情，请参阅以下列表。

- 双步 Ordinary Clock 和 Boundary Clock。
- 硬件时间戳，确保纳秒（ns）级时钟同步。
- IPv4 和 Layer 2（L2）组播传输模式。
- End-to-End（E2E）和 Peer-to-Peer（P2P）延迟机制。
- IEEE 1588-2008（PTPv2）。
- 支持的 Profile：
  - 802.1AS：基于 IEEE 802.1AS-2020，为 Audio Video Bridging（AVB）和 Time-Sensitive Networking（TSN）提供时序和同步。
  - AES67：高性能 audio-over-IP 互操作性。
  - G.8275.1：支持 PTP 的网络中的频率和相位同步。
  - SMPTE：专业广播环境中的音频/视频同步。

:::info
MikroTik 的 PTP 支持取决于硬件；请参阅[支持的设备列表。](/docs/system-information-and-utilities/precision-time-protocol#supported-devices)
:::

## 常规属性 {#general-properties}

**子菜单：** `/system/ptp`

| 属性 | 说明 |
| :-- | :-- |
| **port** | 用于添加、删除或查看已分配端口的子菜单。 |
| **status** | 显示 PTP 端口、其状态以及从端口延迟的子菜单。 |
| **comment** (*string*; Default: ) | PTP 配置的简短描述。 |
| **name** (*string*; Default: ) | PTP 配置的名称。 |
| **domain** (Default: **auto**) | 用于区分不同 PTP 实例的标识符。 <br/> 每个 PTP 配置定义其允许的域范围和默认值： <br/> • 802.1AS 范围：0–127，默认值：0（auto） • AES67 范围：0–127，默认值：0（auto） • G.8275.1 范围：24–43，默认值：24（auto） • SMPTE 范围：0–127，默认值：127（auto） • Default 范围：0–127，默认值：0（auto） <br/> 注：- “auto”选择配置的默认域值。 |
| **delay-mode** (*auto \| e2e \| p2p*; Default: **auto**) | <ul><li>auto - 根据所使用的配置自动选择延迟模式。</li><li>e2e - 使用延迟请求-响应机制。</li><li>p2p - 使用对等延迟机制。</li></ul> |
| **priority1** (*integer [0..255]*; auto; Default: **auto**) | 参与主时钟选举的参数。 |
| **priority2** (*integer [0..255]*; auto; Default: **auto**) | 参与备用主时钟选举的参数。 |
| **profile**(*802.1as; aes67; g8275.1; smpte; default;* Default: **default**) | 每个配置都带有 PTP 运行参数和选项的预定义 auto 值： <br/><ul><li>802.1as 是 PTP 针对 Audio Video Bridging 和 Time-Sensitive Networking 的适配。<u>默认</u>（auto）值：priority1=246，priority2=248，transport=l2-non-forwardable，delay-mode=p2p。</li></ul><ul><li>aes67 配置用于高性能 audio-over-IP 互操作。<u>默认</u>（auto）值：priority1=128，priority2=128，domain=0，transport=ipv4，delay-mode=e2e。</li></ul><ul><li>g8275.1 配置用于在完全支持 PTP 的网络中进行频率和相位同步。<u>默认</u>（auto）值：priority1=128，priority2=128，domain=24，transport=l2-non-forwardable，delay-mode=e2e。</li></ul><ul><li>smpte 配置用于专业广播环境中音视频设备的同步。<u>默认</u>（auto）值：priority1=128，priority2=128，domain=127，transport=ipv4，delay-mode=e2e。</li></ul><ul><li>default 配置为 PTPv2 默认配置，与其他配置相比允许更多配置选项。<u>默认</u>（auto）值：priority1=128，priority2=128，domain=0，transport=ipv4，delay-mode=e2e。</li></ul> |
| **transport** (*auto; ipv4; l2-forwardable; l2-non-forwardable;* Default: **auto**) | 要使用的传输协议： <br/><ul><li>auto - 根据所使用的 PTP 配置自动选择传输模式。</li><li>ipv4 - 使用 IPv4 组播地址 224.0.1.129 传输 PTP 主消息，使用 224.0.0.107 传输 PTP 对等延迟消息。</li><li>l2-forwardable - 使用组播 MAC 地址 <code>01-1B-19-00-00-00</code>，该地址会被不支持 PTP 的网络设备转发。</li><li>l2-non-forwardable - 使用组播 MAC 地址 <code>01-80-C2-00-00-0E</code>，确保 PTP 消息不会被不支持 PTP 的网络设备转发。</li></ul> |

## 配置 {#configuration}

在 MikroTik 设备上配置 Precision Time Protocol（PTP）是一个简单的过程。主要步骤包括创建 PTP profile，并将相关端口分配给该 profile 以进行 PTP 操作。

#### 创建 PTP profile {#create-a-ptp-profile}

要创建 PTP profile，请使用以下命令。在本示例中，我们使用 802.1as profile，但你可以根据需要选择其他可用 profile：

```ros
/system/ptp/add name=ptp1 profile=802.1as
```

要验证 profile 是否已成功创建，请执行：

```routeros
/system/ptp/print
```

输出将显示已创建的 profile 及其当前设置：

```routeros
 Flags: I - inactive, X - disabled 
 0   name="ptp1" priority1=auto priority2=auto delay-mode=auto transport=auto profile=802.1as domain=auto  
```

:::note
默认情况下，每个 profile 的参数都配置为“auto”，它会根据所选 profile 自动选择适当的值。在进行手动调整之前，请验证设置是否符合相关标准（例如 ITU-T G.8275.1、IEEE 802.1as、SMPTE、AES67）。
:::

#### 将端口分配给 PTP profile {#assign-ports-to-the-ptp-profile}

作为最后一步，分配将参与 PTP 的端口。例如，加入几个 sfp28 接口。SFP28-12 连接到 grandmaster clock，而 SFP28-1 和 SFP28-2 连接到 ordinary clock/slave：

```ros
/system/ptp/port/add interface=sfp28-1 ptp=ptp1
/system/ptp/port/add interface=sfp28-2 ptp=ptp1
/system/ptp/port/add interface=sfp28-12 ptp=ptp1
```

#### VLAN 端口上的 PTP {#ptp-on-vlan-ports}

当 PTP 端口同时也是边界时钟设备上 VLAN 的一部分时，必须在 [Bridge VLAN Table](/docs/bridging-and-switching/user-guides/bridge-vlan-table) 中为每个包含 PTP 端口的条目添加一个网桥接口作为 untagged 端口。

这是必要的，因为网桥接口作为面向 CPU 的网桥端口工作。因此，必须将其与 PTP 端口一起加入 VLAN 表，以确保数据包可以从物理端口正确接收，并通过网桥转发到 CPU。让我们继续之前的配置，以便更清楚地说明：

```routeros
# Create a new bridge interface
/interface/bridge/add name=bridge1

# Assign the ports that will be part of this bridge
/interface/bridge/port/add bridge=bridge1 interface=sfp28-1 pvid=10
/interface/bridge/port/add bridge=bridge1 interface=sfp28-2 pvid=20

# Create new entries for Bridge VLAN Table
/interface/bridge/vlan/add bridge=bridge1 vlan-ids=10 untagged=bridge1,sfp28-1
/interface/bridge/vlan/add bridge=bridge1 vlan-ids=20 untagged=bridge1,sfp28-2
```

:::note
这适用于 IPv4 和可 L2 转发（01-1B-19-00-00-00）传输模式。唯一的例外是不可 L2 转发（01-80-C2-00-00-0E），此时无需在 Bridge VLAN Table 中添加网桥接口作为 untagged 端口。

要检查每个 profile 的默认（auto）传输模式值，请参阅 [“General Properties](/docs/system-information-and-utilities/precision-time-protocol#general-properties)”部分。
:::

#### 使用 IGMP Snooping 的 PTP {#ptp-with-igmp-snooping}

如果在网桥上启用了 IGMP snooping，并且 VLAN 按上一示例所示配置，则必须为每个包含使用 **IPv4**（224.0.1.129）作为传输模式的 PTP 端口的 VLAN 手动添加静态 Multicast Database（MDB）条目。这可确保 PTP 组播流量正确转发。

```routeros
/interface/bridge/mdb/add group=224.0.1.129 bridge=bridge1 ports=bridge1 vid=10
/interface/bridge/mdb/add group=224.0.1.129 bridge=bridge1 ports=bridge1 vid=20
```

:::note
PTP 配置中的静态 MDB 条目仅在启用 IGMP snooping 且同时使用 VLAN 时才需要。
:::

## 监控 {#monitoring}

要监控 PTP profile 的状态和性能，请使用以下命令：

```ros
/system/ptp/monitor 0
```

输出将提供有关 profile 运行状态的详细信息：

```routeros
name: ptp1
clock-id: 64:D1:54:FF:FE:EB:AD:C7
priority1: 246
priority2: 248
i-am-gm: no
gm-clock-id: 64:D1:54:FF:FE:EB:AE:C3
gm-priority1: 100
gm-priority2: 248
master-clock-id: 64:D1:54:FF:FE:EB:AE:C3
slave-port: ether1
freq-drift: 2690 ppb
offset: 3 ns
hw-offset: -889419842 ns
slave-port-delay: 306 ns
```

此信息包括时钟 ID、优先级值和时间偏移等关键详情，可用于监控 PTP 设置的准确性和同步状态。

#### Monitor 属性 {#monitor-properties}

| 属性 | 说明 |
| :-- | :-- |
| <strong>clock-id:</strong> | 本地时钟标识符，用于在 PTP 网络中唯一标识该时钟。 |
| <strong>priority1:</strong> | 用于 grandmaster 时钟选举的优先级参数。值越小，优先级越高。 |
| <strong>priority2:</strong> | 用于备用 grandmaster 时钟选举的优先级参数。值越小，优先级越高。 |
| <strong>i-am-gm:</strong> yes | no |
| <strong>gm-clock-id:</strong> | grandmaster 时钟的标识符。这是提供主要时间源的时钟。 |
| <strong>gm-priority1:</strong> | 从 slave 设备看到的 grandmaster 时钟的 <code>priority1</code> 值。 |
| <strong>gm-priority2:</strong> | 从 slave 设备看到的 grandmaster 时钟的 <code>priority2</code> 值。 |
| <strong>master-clock-id:</strong> | PTP 通信路径中 master 时钟的标识符。根据网络拓扑，它可能是 grandmaster 时钟或 boundary 时钟。 |
| <strong>slave-port:</strong> | 设备上连接到 master 或 grandmaster 时钟的端口。 |
| <strong>freq-drift:</strong> | master 时钟和 slave 时钟之间的频率漂移，以十亿分之一（ppb）为单位。该值表示 slave 时钟频率相对于 master 时钟频率的偏差程度。 |
| <strong>offset:</strong> | master 时钟和 slave 时钟之间的时间差，以纳秒（ns）为单位。该值反映同步精度。 |
| <strong>hw-offset:</strong> | 与硬件时钟之间的偏移差。 |
| <strong>slave-port-delay:</strong> | 数据包在两个设备之间传输的时间延迟，以纳秒（ns）为单位。该延迟可能受网络中使用的线缆和收发器质量影响。 |
| <strong>name</strong> | PTP profile 的名称。 |

## 支持的设备 {#supported-devices}

- **CRS326-24G-2S+：** 仅在千兆以太网端口上支持。
- **CRS328-24P-4S+：** 仅在千兆以太网端口上支持。
- **CRS317-1G-16S+：** 在所有端口上支持。
- **CRS326-24S+2Q+：** 在 SFP+ 和 QSFP+ 接口上支持。
- **CRS312-4C+8XG：** 在所有端口上支持。
- **CRS318-16P-2S+：** 仅在千兆以太网端口上支持。
- **CRS318-1Fi-15Fr-2S：** 仅在千兆以太网端口上支持。

### RouterOS 7.16 及更高版本中添加的 PTP 支持 {#ptp-support-added-in-routeros-version-716-and-later}

- **CCR2116-12G-4S+：** 所有端口均支持。
- **CCR2216-1G-12XS-2XQ：** 所有端口均支持。
- **CRS518-16XS-2XQ：** 所有端口均支持。
- **CRS504-4XQ：** 所有端口均支持。
- **CRS510-8XS-2XQ：** 所有端口均支持。
- **CRS520-4XS-16XQ：** 所有端口均支持。

### RouterOS 7.17 及更高版本新增的 PTP 支持 {#ptp-support-added-in-routeros-version-717-and-later}

- **CRS320-8P-8B-4S+RM：** 仅 Gigabit Ethernet 端口支持。
- **CRS326-4C+20G+2Q+：** 所有端口均支持。

### RouterOS 7.20 及更高版本新增的 PTP 支持 {#ptp-support-added-in-routeros-version-720-and-later}

- **RDS2216-2XG-4S+4XS-2XQ：** 所有端口均支持。

:::info
本节未列出的设备不支持 Precision Time Protocol。
:::
:::info
任何设备上的 MGMT（管理）端口均不支持 PTP。“所有端口”指除 MGMT 端口外的所有数据接口。
:::
