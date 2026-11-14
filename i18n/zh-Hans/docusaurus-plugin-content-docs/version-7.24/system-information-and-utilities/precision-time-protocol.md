---
sidebar_key: "system-information-and-utilities/precision-time-protocol"
sidebar_position: 13
title: "精确时间协议"
sidebar_label: "精确时间协议"
description: "MikroTik RouterOS 文档介绍了精确时间协议（PTP），用于在网络中实现亚微秒级时钟同步，支持带硬件时间戳的 IEEE 1588-2008，并提供多种配置文件选项，包括面向特定行业的 802.1AS、AES67、G.8275.1 和 SMPTE。"
tags:
  - 'ptp'
  - 'precision-time-protocol'
  - 'ieee-1588'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/precision-time-protocol
captured_at: '2026-11-04T11:33:34+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

精确时间协议 (PTP) 由电气电子工程师学会 (IEEE) 制定，是一种用于在局域网内同步时钟的协议。在电信、金融和工业自动化等对精确计时至关重要的行业和应用中，它不可或缺。PTP 通常可确保亚微秒级的时间精度，但在满足硬件要求时，也可以实现纳秒级精度。MikroTik 的 PTP 实现支持 IEEE 1588-2008 (PTPv2)，并包含硬件时间戳功能，可确保在纳秒范围内实现同步。有关 MikroTik PTP 功能的更多详细信息，请参阅下面的列表。

- 两步式普通时钟和边界时钟。
- 硬件时间戳，确保在纳秒 (ns) 范围内实现时钟同步。
- IPv4 和二层 (L2) 组播传输模式。
- 端到端 (E2E) 和对等 (P2P) 延迟机制。
- IEEE 1588-2008 (PTPv2)。
- 配置档支持：
  - 802.1AS：用于音频视频桥接 (AVB) 和时间敏感网络 (TSN) 的计时与同步，基于 IEEE 802.1AS-2020。
  - AES67：高性能的 IP 音频互操作性。
  - G.8275.1：在支持 PTP 的网络中进行频率和相位同步。
  - SMPTE：专业广播环境中的音频/视频同步。

:::info
MikroTik PTP 支持取决于硬件；请参阅[支持的设备。](./precision-time-protocol.md#supported-devices)
:::

## 常规属性 {#general-properties}

**子菜单：** `/system/ptp`

| 属性 | 描述 |
| :-- | :-- |
| **port** | 用于添加、删除或查看已分配端口的子菜单。 |
| **status** | 显示 PTP 端口、其状态以及从端口延迟的子菜单。 |
| **comment** (*string*; 默认值： ) | PTP 配置档的简短描述。 |
| **name** (*string*; 默认值： ) | PTP 配置档的名称。 |
| **domain** (默认值：**auto**) | 用于区分不同 PTP 实例的标识符。每个 PTP 配置档定义自己允许的 domain 范围和默认值：• 802.1AS 范围：0–127，默认值：0 (auto) • AES67 范围：0–127，默认值：0 (auto) • G.8275.1 范围：24–43，默认值：24 (auto) • SMPTE 范围：0–127，默认值：127 (auto) • Default 范围：0–127，默认值：0 (auto) 注意：- “auto” 会选择该配置档的默认 domain 值。 |
| **delay-mode** (*auto \| e2e \| p2p*; 默认值：**auto**) | auto - 根据所使用的配置档自动选择延迟模式。e2e - 使用延迟请求-响应机制。p2p - 使用对等延迟机制。 |
| **priority1** (*integer [0..255]*; auto; 默认值：**auto**) | 参与 grandmaster 时钟选举的参数。 |
| **priority2** (*integer [0..255]*; auto; 默认值：**auto**) | 参与备用 grandmaster 时钟选举的参数。 |
| **profile**(*802.1as; aes67; g8275.1; smpte; default;* 默认值：**default**) | 每个配置档都附带自己预定义的 PTP 运行参数和选项 auto 值：802.1as 是 PTP 的适配版本，用于音频视频桥接 (AVB) 和时间敏感网络 (TSN)。默认 (auto) 值：priority1=246, priority2=248, transport=l2-non-forwardable, delay-mode=p2p。aes67 配置档用于高性能的 IP 音频互操作性。默认 (auto) 值：priority1=128, priority2=128, domain=0, transport=ipv4, delay-mode=e2e。g8275.1 配置档用于全 PTP 感知网络中的频率和相位同步。默认 (auto) 值：priority1=128, priority2=128, domain=24, transport=l2-non-forwardable, delay-mode=e2e。smpte 配置档用于专业广播环境中音频/视频设备的同步。默认 (auto) 值：priority1=128, priority2=128, domain=127, transport=ipv4, delay-mode=e2e。default 配置档为 PTPv2 默认配置，允许比其他配置档更多的配置选项。默认 (auto) 值：priority1=128, priority2=128, domain=0, transport=ipv4, delay-mode=e2e。 |
| **transport** (*auto; ipv4; l2-forwardable; l2-non-forwardable;* 默认值：**auto**) | 要使用的传输协议：auto - 根据所使用的 PTP 配置档自动选择传输模式。ipv4 - 使用 IPv4 组播地址 224.0.1.129 用于 PTP 主消息，224.0.0.107 用于 PTP 对等延迟消息。l2-forwardable - 使用组播 MAC 地址 <code>01-1B-19-00-00-00</code>，该地址会通过不支持 PTP 的网络设备转发。l2-non-forwardable - 使用组播 MAC 地址 <code>01-80-C2-00-00-0E</code>，确保 PTP 消息不会通过不支持 PTP 的网络设备转发。 |

## 配置 {#configuration}

在 MikroTik 设备上配置精确时间协议 (PTP) 是一个简单的过程。主要步骤包括创建 PTP 配置档，并将相关端口分配给此配置档以进行 PTP 操作。

#### 创建 PTP 配置档 {#create-a-ptp-profile}

要创建 PTP 配置档，请使用以下命令。在此示例中，我们使用 802.1as 配置档，但你可以根据需要选择其他可用配置档：

```ros
/system/ptp/add name=ptp1 profile=802.1as
```

要验证配置档是否已成功创建，请执行：

```routeros
/system/ptp/print
```

输出将显示已创建的配置档及其当前设置：

```routeros
 Flags: I - inactive, X - disabled 
 0   name="ptp1" priority1=auto priority2=auto delay-mode=auto transport=auto profile=802.1as domain=auto  
```

:::note
默认情况下，每个配置档的参数都设置为“auto”，它会根据所选配置档自动选择合适的值。在进行手动调整之前，请验证设置符合相关标准（例如 ITU-T G.8275.1、IEEE 802.1as、SMPTE、AES67）。
:::

#### 为 PTP 配置档分配端口 {#assign-ports-to-the-ptp-profile}

作为最后一步，分配将参与 PTP 的端口。例如，让我们包含几个 sfp28 接口。SFP28-12 连接到 grandmaster 时钟，而 SFP28-1 和 SFP28-2 连接到普通时钟/从时钟：

```ros
/system/ptp/port/add interface=sfp28-1 ptp=ptp1
/system/ptp/port/add interface=sfp28-2 ptp=ptp1
/system/ptp/port/add interface=sfp28-12 ptp=ptp1
```

#### VLAN 端口上的 PTP {#ptp-on-vlan-ports}

当 PTP 端口同时也是边界时钟设备上 VLAN 的一部分时，对于包含 PTP 端口的每个条目，你必须在[桥 VLAN 表](../bridging-and-switching/user-guides/bridge-vlan-table.md)中将桥接口添加为未标记端口。

这是必要的，因为桥接口充当通往 CPU 的桥端口。因此，它必须与 PTP 端口一起包含在 VLAN 表中，以确保数据包可以从物理端口正确接收，并通过桥转发到 CPU。让我们继续使用之前的配置来更清楚地说明这一点：

```routeros
# 创建新的桥接接口
/interface/bridge/add name=bridge1

# 分配将属于此桥接的端口
/interface/bridge/port/add bridge=bridge1 interface=sfp28-1 pvid=10
/interface/bridge/port/add bridge=bridge1 interface=sfp28-2 pvid=20

# 为 Bridge VLAN Table 创建新条目
/interface/bridge/vlan/add bridge=bridge1 vlan-ids=10 untagged=bridge1,sfp28-1
/interface/bridge/vlan/add bridge=bridge1 vlan-ids=20 untagged=bridge1,sfp28-2
```

:::note
这适用于 IPv4 和 l2-forwardable (01-1B-19-00-00-00) 传输模式。唯一的例外是 l2-non-forwardable (01-80-C2-00-00-0E)，在这种情况下，无需将桥接口作为未标记端口添加到桥 VLAN 表中。

要检查每个配置档的默认 (auto) 传输模式值，请参阅“[常规属性](./precision-time-protocol.md#general-properties)”部分。
:::

#### 使用 IGMP Snooping 的 PTP {#ptp-with-igmp-snooping}

如果桥上启用了 IGMP snooping，并且 VLAN 按上一个示例配置，则必须为每个包含使用 **IPv4** (224.0.1.129) 作为传输模式的 PTP 端口的 VLAN 手动添加静态组播数据库 (MDB) 条目。这可确保 PTP 组播流量正确转发。

```routeros
/interface/bridge/mdb/add group=224.0.1.129 bridge=bridge1 ports=bridge1 vid=10
/interface/bridge/mdb/add group=224.0.1.129 bridge=bridge1 ports=bridge1 vid=20
```

:::note
在 PTP 设置中，仅当 IGMP snooping 与 VLAN 一起启用时，才需要静态 MDB 条目。
:::

## 监控 {#monitoring}

要监控 PTP 配置档的状态和性能，请使用以下命令：

```ros
/system/ptp/monitor 0
```

输出将提供有关配置档运行状态的详细信息：

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

此信息包括时钟 ID、优先级值和时间偏移等关键细节，这些对于监控 PTP 设置的准确性和同步至关重要。

#### 监控属性 {#monitor-properties}

| 属性 | 描述 |
| :-- | :-- |
| **clock-id:** | 本地时钟标识符，用于在 PTP 网络中唯一标识该时钟。 |
| **priority1:** | 用于 grandmaster 时钟选举的优先级参数。值越低表示优先级越高。 |
| **priority2:** | 用于备用 grandmaster 时钟选举的优先级参数。值越低表示优先级越高。 |
| **i-am-gm:** yes | no | 指示设备是否为 grandmaster 时钟（`yes`）或不是（`no`）。 |
| **gm-clock-id:** | grandmaster 时钟的标识符。这是提供主时间源的时钟。 |
| **gm-priority1:** | 从从设备看到的 grandmaster 时钟的 `priority1` 值。 |
| **gm-priority2:** | 从从设备看到的 grandmaster 时钟的 `priority2` 值。 |
| **master-clock-id:** | PTP 通信路径中 master 时钟的标识符。根据网络拓扑，它可能是 grandmaster 时钟或边界时钟。 |
| **slave-port:** | 设备上连接到 master 或 grandmaster 时钟的端口。 |
| **freq-drift:** | master 时钟与从时钟之间的频率漂移，以十亿分之一 (ppb) 为单位。这表示从时钟的频率偏离 master 时钟频率的程度。 |
| **offset:** | master 时钟与从时钟之间的时间差，以纳秒 (ns) 为单位。这反映同步精度。 |
| **hw-offset:** | 与硬件时钟的偏移差。 |
| **slave-port-delay:** | 数据包在两个设备之间传输的时间延迟，以纳秒 (ns) 为单位。此延迟可能受网络中使用的电缆和收发器质量的影响。 |
| **name**  | PTP 配置档的名称。 |

## 支持的设备 {#supported-devices}

- **CRS326-24G-2S+：** 仅在千兆以太网端口上支持。
- **CRS328-24P-4S+：** 仅在千兆以太网端口上支持。
- **CRS317-1G-16S+：** 在所有端口上支持。
- **CRS326-24S+2Q+：** 在 SFP+ 和 QSFP+ 接口上支持。
- **CRS312-4C+8XG：** 在所有端口上支持。
- **CRS318-16P-2S+：** 仅在千兆以太网端口上支持。
- **CRS318-1Fi-15Fr-2S：** 仅在千兆以太网端口上支持。

### RouterOS 7.16 及更高版本中新增的 PTP 支持 {#ptp-support-added-in-routeros-version-716-and-later}

- **CCR2116-12G-4S+：** 在所有端口上支持。
- **CCR2216-1G-12XS-2XQ：** 在所有端口上支持。
- **CRS518-16XS-2XQ：** 在所有端口上支持。
- **CRS504-4XQ：** 在所有端口上支持。
- **CRS510-8XS-2XQ：** 在所有端口上支持。
- **CRS520-4XS-16XQ：** 在所有端口上支持。

### RouterOS 7.17 及更高版本中新增的 PTP 支持 {#ptp-support-added-in-routeros-version-717-and-later}

- **CRS320-8P-8B-4S+RM：** 仅在千兆以太网端口上支持。
- **CRS326-4C+20G+2Q+：** 在所有端口上支持。

### RouterOS 7.20 及更高版本中新增的 PTP 支持 {#ptp-support-added-in-routeros-version-720-and-later}

- **RDS2216-2XG-4S+4XS-2XQ：** 在所有端口上支持。

:::info
本节未列出的设备不支持 Precision Time Protocol。
:::
:::info
任何设备上的 MGMT（管理）端口都不支持 PTP。“所有端口”指所有数据接口，不包括 MGMT 端口。
:::
