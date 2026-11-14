---
sidebar_key: "system-information-and-utilities/precision-time-protocol"
sidebar_position: 12
title: "精确时间协议"
sidebar_label: "精确时间协议"
description: "RouterOS 上的精确时间协议（PTP，IEEE 1588-2008）时钟同步：支持的硬件、配置文件（802.1AS、AES67、G.8275.1、SMPTE 2059）、端口、硬件时间戳与同步监控。"
tags:
  - 'ptp'
  - 'precision-time-protocol'
  - 'ieee-1588'
source: https://manual.mikrotik.com/docs/system-information-and-utilities/precision-time-protocol
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Precision Time Protocol（PTP，IEEE 1588-2008，也称为 PTPv2）可在局域网内同步时钟，这在电信、广播、音频制作和工业自动化中非常重要。MikroTik 的实现具有以下特性：

- 两步 Ordinary Clock 和 Boundary Clock。
- 硬件时间戳，可将时钟同步精度提升到纳秒级。
- IPv4 和二层组播传输模式。
- 端到端（E2E）和对等（P2P）延迟机制。
- 配置文件：802.1AS（AVB/TSN，依据 IEEE 802.1AS-2020）、AES67（IP 音频）、G.8275.1（电信频率与相位同步）和 SMPTE 2059（专业广播）。

:::info
PTP 支持取决于硬件；请参阅[支持的设备](#supported-devices)。未列在那里的设备根本没有 `/system/ptp` 菜单。MGMT（管理）端口在任何设备上都不支持 PTP；“所有端口”指所有数据接口，不包括 MGMT 端口。
:::

## 配置 PTP {#configure-ptp}

配置分为两步：在 [`/system/ptp`](../cli-reference/system/ptp/index.md) 中创建 PTP 配置文件，然后在 [`/system/ptp/port`](../cli-reference/system/ptp/port.md) 中分配参与该配置文件的端口。

创建一个配置文件实例（本示例使用 802.1AS 配置文件）：

```ros
/system/ptp/add name=ptp1 profile=802.1as
```

只有当链路上的所有时钟运行同一个配置文件时，PTP 才会同步，因此请使该配置文件（以及随之确定的域、传输和延迟模式）与您的 grandmaster 及 PTP 网络中的其余部分相匹配。

保留为 `auto` 的配置文件参数会采用其配置文件所定义的值（例如 802.1AS 会设置 `priority1=246`、`priority2=248`、二层传输和 P2P 延迟测量——各配置文件的预设值列在 CLI 参考行中）。只有在所选标准允许时才手动更改它们；G.8275.1、802.1AS、SMPTE 2059 和 AES67 各自定义了自己所需的值。

```ros
[admin@MikroTik] > /system/ptp/print
 Flags: I - inactive, X - disabled
 0   name="ptp1" priority1=auto priority2=auto delay-mode=auto transport=auto profile=802.1as domain=auto
```

然后分配该配置文件的端口。此处 sfp28-12 连接到 grandmaster 时钟，而 sfp28-1 和 sfp28-2 连接到普通时钟（从时钟）：

```ros
/system/ptp/port/add interface=sfp28-1 ptp=ptp1
/system/ptp/port/add interface=sfp28-2 ptp=ptp1
/system/ptp/port/add interface=sfp28-12 ptp=ptp1
```

端口也可以固定其角色，而不是让最佳主时钟算法决定：使用 `role=bmca` 时，该算法选择 master 或 slave；在已知拓扑中，可以直接用 `role=master` 或 `role=slave` 固定端口。[`/system/ptp`](../cli-reference/system/ptp/index.md) 中的 `ptp-mode` 用于在 ordinary-clock 和 transparent-clock 行为之间进行选择。

### VLAN 端口上的 PTP {#ptp-on-vlan-ports}

当 PTP 端口同时也是你的边界时钟设备上 VLAN 的一部分时，对于每个包含 PTP 端口的条目，你必须在[桥 VLAN 表](../bridging-and-switching/user-guides/bridge-vlan-table.md)中将桥接口添加为未标记端口。继续使用 sfp28-1 位于 VLAN 10、sfp28-2 位于 VLAN 20 的示例：

```ros
/interface/bridge/add name=bridge1
/interface/bridge/port/add bridge=bridge1 interface=sfp28-1 pvid=10
/interface/bridge/port/add bridge=bridge1 interface=sfp28-2 pvid=20
/interface/bridge/vlan/add bridge=bridge1 vlan-ids=10 \
    untagged=bridge1,sfp28-1
/interface/bridge/vlan/add bridge=bridge1 vlan-ids=20 \
    untagged=bridge1,sfp28-2
```

这是必要的，因为桥接口充当通往 CPU 的桥端口。因此，必须将其与 PTP 端口一起包含在 VLAN 表中，以便数据包能够从物理端口正确接收，并通过桥转发到 CPU。

如果 PTP 改为通过 trunk 端口以带标记方式到达，请直接在 PTP 端口上使用 [`/system/ptp/port`](../cli-reference/system/ptp/port.md) 中的 `vlan-id` 设置标记。

:::note
这适用于 IPv4 和 L2-forwardable (01-1B-19-00-00-00) 传输模式。唯一的例外是 L2-non-forwardable (01-80-C2-00-00-0E)，在这种情况下，网桥不必包含在 bridge VLAN 表中。

要查看每个配置文件的默认（auto）传输模式值，请参阅 CLI 参考中 [`transport`](../cli-reference/system/ptp/index.md) 的说明。
:::

### PTP 与 IGMP snooping {#ptp-with-igmp-snooping}

如果已在桥上启用 IGMP snooping，并且 VLAN 按如上所示配置，请为每个包含使用 **IPv4** (224.0.1.129) 作为传输模式的 PTP 端口的 VLAN 手动添加静态组播数据库 (MDB) 条目。这可确保 PTP 组播流量正确转发：

```ros
/interface/bridge/mdb/add group=224.0.1.129 bridge=bridge1 \
    ports=bridge1 vid=10
/interface/bridge/mdb/add group=224.0.1.129 bridge=bridge1 \
    ports=bridge1 vid=20
```

在 PTP 设置中，仅当 IGMP snooping 与 VLAN 一起启用时，才需要静态 MDB 条目。

## 监控同步 {#monitor-synchronization}

首先检查端口是否已启动并正常运行：

```ros
/system/ptp/status/print
```

`state`、`delay` 和 `as-capable` 列显示在同步稳定之前端口卡在哪里。

然后使用 [`/system/ptp/monitor`](../cli-reference/system/ptp/monitor.md) 监控 profile 实例（按编号或名称）：

```ros
/system/ptp/monitor ptp1
```

同步时钟的示例：

```text
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

要关注的数值：`i-am-gm`/`gm-clock-id` 表示谁是 grandmaster，`offset` 是相对于主时钟的时间误差，`freq-drift` 是长期时钟频率校正，`slave-port-delay` 是测得的从端口单向路径延迟。

## 支持的设备 {#supported-devices}

- **CRS326-24G-2S+:** 仅支持千兆以太网端口。
- **CRS328-24P-4S+:** 仅支持千兆以太网端口。
- **CRS317-1G-16S+:** 所有端口均支持。
- **CRS326-24S+2Q+:** 支持 SFP+ 和 QSFP+ 接口。
- **CRS312-4C+8XG:** 所有端口均支持。
- **CRS318-16P-2S+:** 仅支持千兆以太网端口。
- **CRS318-1Fi-15Fr-2S:** 仅支持 100M 以太网端口。
- **CCR2116-12G-4S+:** 所有端口均支持。
- **CCR2216-1G-12XS-2XQ:** 所有端口均支持。
- **CRS518-16XS-2XQ:** 所有端口均支持。
- **CRS504-4XQ:** 所有端口均支持。
- **CRS510-8XS-2XQ:** 所有端口均支持。
- **CRS520-4XS-16XQ:** 所有端口均支持。
- **CRS320-8P-8B-4S+RM:** 仅支持千兆以太网端口。
- **CRS326-4C+20G+2Q+:** 所有端口均支持。
- **RDS2216-2XG-4S+4XS-2XQ:** 所有端口均支持。

:::info
本节未列出的设备不支持 Precision Time Protocol。
:::

## 技术细节 {#technical-details}

配置文件会预设那些你保留为 `auto` 的参数值：

| 配置文件 | priority1 | priority2 | 域 | transport | delay-mode |
| :-- | :-- | :-- | :-- | :-- |  :-- |
| default | 128 | 128 | 0 | ipv4 | e2e |
| 802.1AS | 246 | 248 | 0 | l2-non-forwardable | p2p |
| AES67 | 128 | 128 | 0 | ipv4 | e2e |
| G.8275.1 | 128 | 128 | 24 | l2-non-forwardable | e2e |
| SMPTE 2059 | 128 | 128 | 127 | ipv4 | e2e |

- IPv4 transport 将 PTP 主消息组播到 224.0.1.129，并将对等延迟消息组播到 224.0.0.107。
- L2-forwardable 使用组播 MAC 01-1B-19-00-00-00，PTP-unaware 网桥会转发它；L2-non-forwardable 使用 01-80-C2-00-00-0E，符合标准的网桥无法转发它，因此 PTP 通信保持在本地链路上。
- 域将同一网络上的独立 PTP 实例分隔开；允许的范围因配置文件而异（大多数配置文件为 0-127，G.8275.1 为 24-43）。

有关所有参数，请参阅 [`/system/ptp`](../cli-reference/system/ptp/index.md)、[`/system/ptp/port`](../cli-reference/system/ptp/port.md)、[`/system/ptp/status`](../cli-reference/system/ptp/status.md) 和 [`/system/ptp/monitor`](../cli-reference/system/ptp/monitor.md) CLI 参考页面。
