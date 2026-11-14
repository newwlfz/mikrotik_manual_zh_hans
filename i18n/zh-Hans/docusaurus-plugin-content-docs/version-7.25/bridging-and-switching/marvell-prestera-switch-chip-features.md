---
sidebar_key: "bridging-and-switching/marvell-prestera-switch-chip-features"
sidebar_position: 1
title: "Marvell Prestera 交换芯片功能"
sidebar_label: "Marvell Prestera 交换芯片功能"
description: "搭载 Marvell Prestera 交换芯片的 MikroTik 设备提供高性能的二层和三层功能，包括高级转发、路由卸载、VLAN 支持、QoS、镜像，以及用于精确计时的 PTP 同步。"
tags:
  - 'crs3xx'
  - 'crs5xx'
  - 'crs4xx'
  - 'crs8xx'
  - 'prestera'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/marvell-prestera-switch-chip-features
captured_at: '2026-11-04T11:14:26+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

---

部分 MikroTik 设备使用高性能、功能丰富的 Marvell Prestera 以太网交换机。这些设备可设计用于各种以太网应用，包括非管理型交换机、二层管理型交换机、运营商交换机、VLAN 间路由器和有线统一数据包处理器。

:::warning
本文仅适用于配备 Marvell Prestera 交换机的 MikroTik 设备，不适用于 [CRS1xx/CRS2xx 系列交换机](./user-guides/crs1xx-2xx-series-switches-examples.md)。
:::

### 功能 {#features}

<WideTable>

| 功能 | 描述 |
| :-- | :-- |
| **转发** | <ul class="bullets"><li>可配置端口用于交换或路由</li><li>全非阻塞线速交换</li><li>用于二层单播转发的大型单播 FDB</li><li>转发数据库基于 IVL 工作</li><li>支持巨型帧</li><li>支持 IGMP/MLD Snooping</li><li>支持 DHCP Snooping，带有自定义 Option 82（Circuit ID、Remote ID）</li><li>支持 DHCPv6 Snooping，带有自定义 Option 18（Interface ID）和 Option 37（Remote ID）</li><li>支持 RA Guard</li></ul> |
| **路由** | 三层硬件卸载：IPv4、IPv6 单播路由支持以太网、网桥、链路聚合和 VLAN 接口ECMP黑洞卸载的 Fasttrack 连接 <sup>1</sup>用于 Fasttrack 连接的卸载 NAT <sup>1</sup>硬件卸载 VRF <sup>1</sup>多个 MTU 配置文件**重要：** 1. 仅适用于[某些交换机型号](./l3-hardware-offloading.md#l3hw-device-support)  |
| **生成树协议** | <ul class="bullets"><li>STP</li><li>RSTP</li><li>MSTP</li><li>Edge port、BPDU Guard、Root Guard</li></ul> |
| **镜像** | <ul class="bullets"><li>多种镜像类型：<ul class="bullets"><li>基于端口的镜像</li><li>基于 VLAN 的镜像</li><li>基于 MAC 的镜像</li><li>Remote Switch Port Analyzer (RSPAN)</li></ul></li></ul> |
| **VLAN** | <ul class="bullets"><li>完全兼容 IEEE802.1Q 和 IEEE802.1ad VLAN</li><li>4k 活动 VLAN</li><li>灵活的 VLAN 分配：<ul class="bullets"><li>基于端口的 VLAN</li><li>基于协议的 VLAN</li><li>基于 MAC 的 VLAN</li></ul></li><li>VLAN 过滤</li><li>入向 VLAN 转换</li><li>Multiple VLAN Registration protocol (MVRP)</li></ul> |
| **Bonding** | <ul class="bullets"><li>支持 802.3ad (LACP)、balance-xor 和 active-backup 模式</li><li>每个 Bonding 接口最多 8 个成员端口</li><li>硬件自动故障转移和负载均衡</li><li>MLAG</li></ul> |
| **服务质量 (QoS)** | <ul class="bullets"><li>每端口八个输出队列</li><li>DSCP 和 802.1p PCP 映射</li><li>基于端口的二层和三层信任设置</li><li>基于端口和队列的出向速率限制器</li><li>通过 ACL 规则实现基于策略的 QoS</li><li>Strict Priority (SP) 和 Shaped Deficit Weighted Round Robin (SDWRR) 排队</li><li>Enhanced Transmission Selection (ETS) 调度</li><li>Weighted Random Early Detection (WRED) <sup>1</sup></li><li>Explicit Congestion Notification (ECN) <sup>1</sup></li><li>Priority-based Flow Control (PFC) <sup>1</sup></li><li>资源分配控制（基于队列、shared-pool 和组播）并提供广泛的监控能力</li><li>兼容 Dante 环境</li><li>兼容 RDMA over Converged Ethernet (RoCE) 环境 <sup>1</sup></li><li>入向流量限制（基于端口或通过 ACL 规则）</li><li>流量风暴控制</li></ul><br/><strong>重要：</strong> 1. 仅适用于[某些交换机型号](./quality-of-service.md#qos-device-support)<br/> |
| **端口隔离** | <ul class="bullets"><li>适用于 Private VLAN 实施</li></ul> |
| **访问控制列表** | <ul class="bullets"><li>入向 ACL 表</li><li>基于端口、L2、L3、L4 协议头字段进行分类</li><li>ACL 操作包括过滤、转发和修改协议头字段</li></ul> |
| **PTP** | <ul class="alternate"><li>两步 Ordinary Clock 和 Boundary Clock。</li><li>硬件时间戳，确保纳秒(ns)范围内的时钟同步。</li><li>IPv4 和二层 (L2) 组播传输模式。</li><li>End-to-End (E2E) 和 Peer-to-Peer (P2P) 延迟机制。</li><li>IEEE 1588-2008 (PTPv2)。</li><li>支持的 Profile：<ul><li>802.1AS：用于 Audio Video Bridging (AVB) 和 Time-Sensitive Networking (TSN) 的定时与同步。</li><li>AES67：高性能 audio-over-IP 互操作性。</li><li>G.8275.1：在 PTP-aware 网络中的频率和相位同步。</li><li>SMPTE：专业广播环境中的音频/视频同步。</li></ul></li></ul><br/><strong>重要：</strong> PTP 支持取决于硬件，请参阅[支持的设备](../system-information-and-utilities/precision-time-protocol.md#supported-devices)列表。<br/> |

:::info
有关三层硬件卸载功能支持和硬件限制，请参阅[功能支持](./l3-hardware-offloading.md#l3hw-device-support)用户手册。
:::

:::note
有关 QoS 硬件卸载功能支持和硬件限制，请参阅[服务质量（QoS）](./quality-of-service.md)用户手册。
:::

</WideTable>

### 型号 {#models}

下表说明了 Cloud Router Switch 型号与 CCR 路由器之间的主要差异。

<WideTable>

|  |  |  |  |  |  |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **型号** | **交换芯片** | **CPU** | **内存大小** | **以太网** | **[PoE 输出](../hardware/poe-out.md)** | **ACL 规则** | **单播 FDB 条目** | **巨型帧（字节）** |
| **CRS318-1Fi-15Fr-2S-OUT (netPower 15FR)** | Marvell-98DX224S | ARM 2-core 800MHz | 256 MB | 16x 10/100M 以太网  2x 1G SFP | 1x passive | 128 | 最高 16K | 10218 |
| **CRS318-16P-2S+OUT (netPower 16P)** | Marvell-98DX226S | ARM 2-core 800MHz | 256 MB | 16x 10/100/1000M 以太网  2x 10G SFP+ | 16x 802.3af/at | 128 | 最高 16K | 10218 |
| **CRS310-1G-5S-4S+ (netFiber 9/IN)** | Marvell-98DX226S | ARM 2-core 800MHz | 256 MB | 1x 10/100/1000M 以太网  5x 1G SFP  4x 10G SFP+ |  | 128 | 最高 16K | 10218 |
| **CRS310-8G+2S+IN** | Marvell-98DX226S | ARM 2-core 800MHz | 256 MB | 8x 2.5G 以太网  2x 10G SFP+ |  | 128 | 最高 16K | 10218 |
| **CRS320-8P-8B-4S+RM** | Marvell-98DX226S | ARM 2-core 800MHz | 256 MB | 16x 10/100/1000M 以太网  4x 10G SFP+ | 8x 802.3af/at  8x 802.3bt | 128 | 最高 16K | 10218 |
| **CRS304-4XG-IN** | Marvell-98DX2528 | ARM64 2-core 1200MHz | 512 MB | 4x 1/2.5/5/10G 以太网 |  | 128 | 最高 16K | 10218 |
| **CRS326-24G-2S+ (RM/IN)** | Marvell-98DX3236 | ARM 2-core 800MHz | 512 MB | 24x 10/100/1000M 以太网  2x 10G SFP+ |  | 128 | 最高 16K | 10218 |
| **CRS328-24P-4S+RM** | Marvell-98DX3236 | ARM 1-core 800MHz | 512 MB | 24x 10/100/1000M 以太网  4x 10G SFP+ | 24x 802.3af/at | 128 | 最高 16K | 10218 |
| **CRS328-4C-20S-4S+RM** | Marvell-98DX3236 | ARM 2-core 800MHz | 512 MB | 20x 1G SFP  4x 1G combo  4x 10G SFP+ |  | 128 | 最高 16K | 10218 |
| **CRS305-1G-4S+IN** | Marvell-98DX3236 | ARM 2-core 800MHz | 512 MB | 1x 10/100/1000M 以太网  4x 10G SFP+ |  | 128 | 最高 16K | 10218 |
| **CRS305-1G-4S+OUT (FiberBox Plus)** | Marvell-98DX226S | ARM 2-core 800MHz | 256 MB | 1x 10/100/1000M 以太网  4x 10G SFP+ |  | 128 | 最高 16K | 10218 |
| **CRS309-1G-8S+IN** | Marvell-98DX8208 | ARM 2-core 800MHz | 512 MB | 1x 10/100/1000M 以太网  8x 10G SFP+ |  | 1024 | 最高 32K | 10218 |
| **CRS317-1G-16S+RM** | Marvell-98DX8216 | ARM 2-core 800MHz | 1 GB | 1x 10/100/1000M 以太网  16x 10G SFP+ |  | 1024 | 最高 128K | 10218 |
| **CRS312-4C+8XG-RM** | Marvell-98DX8212 | MIPSBE 1-core 650MHz | 64 MB | 4x 10G combo  8x 1/2.5/5/10G 以太网 |  | 512 | 最高 32K | 10218 |
| **CRS326-24S+2Q+RM** | Marvell-98DX8332 | MIPSBE 1-core 650MHz | 128 MB | 24x 10G SFP+  2x 40G QSFP+ |  | 256 | 最高 32K | 10218 |
| **CRS326-4C+20G+2Q+RM** | Marvell-98DX8332 | MIPSBE 1-core 650MHz | 128 MB | 4x 2.5G 以太网/10G SFP+ combo  20x 2.5G 以太网  2x 40G QSFP+ |  | 256 | 最高 32K | 10218 |
| **CRS354-48G-4S+2Q+RM** | Marvell-98DX3257 | MIPSBE 1-core 650MHz | 128 MB | 48x 10/100/1000M 以太网  4x 10G SFP+  2x 40G QSFP+ |  | 170 | 最高 32K | 10218 |
| **CRS354-48P-4S+2Q+RM** | Marvell-98DX3257 | MIPSBE 1-core 650MHz | 128 MB | 48x 10/100/1000M 以太网  4x 10G SFP+  2x 40G QSFP+ | 48x 802.3af/at | 170 | 最高 32K | 10218 |
| **CRS418-8P-8G-2S+RM**  **CRS418-8P-8G-2S+5axQ2axQ-RM** | Marvell-98DX226S | ARM64 4-core 2208MHz | 1 GB | 16x 10/100/1000M 以太网  2x 10G SFP+ | 8x 802.3af/at | 128 | 最高 16K | 10218 |
| **CRS504-4XQ (IN/OUT)** | Marvell-98DX4310 | MIPSBE 1-core 650MHz | 64 MB | 4x 100G QSFP28 |  | 1024 | 最高 128K | 10218 |
| **CRS510-8XS-2XQ-IN** | Marvell-98DX4310 | MIPSBE 1-core 650MHz | 128 MB | 8x 25G SFP28  2x 100G QSFP28 |  | 1024 | 最高 128K | 10218 |
| **CRS518-16XS-2XQ-RM** | Marvell-98DX8525 | MIPSBE 1-core 650MHz | 64 MB | 16x 25G SFP28  2x 100G QSFP28 |  | 1024 | 最高 128K | 10218 |
| **CRS520-4XS-16XQ-RM** | Marvell-98CX8410 | ARM64 4-core 2000MHz | 4 GB | 4x 25G SFP28  16x 100G QSFP28 |  | 682 | 最高 256K | 9570 |
| **CRS812-8DS-2DQ-2DDQ-RM** | Marvell-98DX7335 | ARM64 4-core 2000MHz | 4 GB | 8x 50G SFP56  2x 200G QSFP56  2x 400G QSFP56-DD |  | 1365 | 最高 128K | 9570 |
| **CRS804-4DDQ-hRM** | Marvell-98DX7335 | ARM64 4-core 2000MHz | 4 GB | 4x 400G QSFP56-DD |  | 1365 | 最高 128K | 9570 |
| **CCR2116-12G-4S+** | Marvell-98DX3255 | ARM64 16-core 2000MHz | 16 GB | 12x 10/100/1000M 以太网  4x 10G SFP+ |  | 512 | 最高 32K | 9570 |
| **CCR2216-1G-12XS-2XQ** | Marvell-98DX8525 | ARM64 16-core 2000MHz | 16 GB | 12x 25G SFP28  2x 100G QSFP28 |  | 1024 | 最高 128K | 9570 |
| **RDS2216-2XG-4S+4XS-2XQ** | Marvell-98DX4310 | ARM64 16-core 2000MHz | 32 GB | 2x 1/2.5/5/10G 以太网  4x 10G SFP+  4x 25G SFP28  2x 100G QSFP28 |  | 1024 | 最高 128K | 9570 |

</WideTable>

### 缩写 {#abbreviations}

- FDB - 转发数据库。
- MDB - 组播数据库。
- SVL - 共享 VLAN 学习。
- IVL - 独立 VLAN 学习。
- PVID - 端口 VLAN ID。
- ACL - 访问控制列表。
- CVID - 客户 VLAN ID。
- SVID - 服务 VLAN ID。

## 端口交换 {#port-switching}

---

要设置端口交换，请参阅[网桥硬件卸载](./index.md#bridge-hardware-offloading)页面。

:::danger
目前只能创建一个启用硬件卸载的网桥。使用 `hw=yes/no` 参数选择哪个网桥将使用硬件卸载。
:::

:::warning
网桥 STP/RSTP/MSTP、IGMP Snooping 和 VLAN 过滤设置不会影响硬件卸载。自 RouterOS v6.42 起，Bonding 接口也支持硬件卸载。
:::

## VLAN {#vlan}

---

自 RouterOS 6.41 起，网桥在网桥内提供 VLAN 感知的二层转发和 VLAN 标签修改。这组功能使网桥操作更像传统以太网交换机，并且与将隧道式 VLAN 接口加入网桥的配置相比，可克服生成树兼容性问题。强烈建议配置网桥 VLAN 过滤，以符合 STP（802.1D）、RSTP（802.1w）标准；在 RouterOS 中启用 MSTP（802.1s）支持则是强制要求。

### VLAN 过滤 {#vlan-filtering}

详细的架构概念和配置步骤请参阅主要的[网桥 VLAN 过滤](./index.md#bridge-vlan-filtering)章节。

#### 支持的 VLAN 实现 {#supported-vlan-implementations}

根据网络设计，您可以实施多种硬件卸载的 VLAN 拓扑：

- **基于端口的 VLAN：** 请参阅[网桥 VLAN 过滤](./index.md#bridge-vlan-filtering)章节中的分步配置指南。
- **基于协议的 VLAN：** 通过交换机规则表进行配置，以映射特定网络协议。
- **基于 MAC 的 VLAN：** 将特定源 MAC 地址映射到指定的 VLAN ID。

---

### 基于 MAC 的 VLAN 配置 {#mac-based-vlan-configuration}

:::warning 硬件与转发限制

- **规则容量：** 此功能使用硬件交换机规则表。请参阅[交换芯片型号容量表](./marvell-prestera-switch-chip-features.md#models)以确认您的特定设备支持多少条规则。
- **CPU 转发限制：** 基于 MAC 的 VLAN 严格适用于在硬件端口之间交换的流量。如果数据包被路由或转发到 CPU，则强制执行网桥端口的默认 `pvid`，而不是 ACL 规则中定义的 `new-vlan-id` 动作。
- **DHCP 冲突：** 如果网桥上启用了 `dhcp-snooping=yes`，基于 MAC 的 VLAN 匹配将无法处理 DHCP 数据包。
:::

#### 配置示例 {#configuration-example}

通过创建启用硬件卸载的网桥来启用端口交换：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
```

在网桥 VLAN 表中添加 VLAN 并指定端口：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether2 untagged=ether7 vlan-ids=200,300,400
```

添加根据 MAC 地址分配 VLAN ID 的交换机规则：

```ros
/interface/ethernet/switch/rule
add switch=switch1 ports=ether7 src-mac-address=A4:12:6D:77:94:43/FF:FF:FF:FF:FF:FF new-vlan-id=200
add switch=switch1 ports=ether7 src-mac-address=84:37:62:DF:04:20/FF:FF:FF:FF:FF:FF new-vlan-id=300
add switch=switch1 ports=ether7 src-mac-address=E7:16:34:A1:CD:18/FF:FF:FF:FF:FF:FF new-vlan-id=400
```

#### 基于协议的 VLAN {#protocol-based-vlan}

:::warning

- 交换机规则表用于基于协议的 VLAN 功能，请参阅[此表](./marvell-prestera-switch-chip-features.md#models)了解每台设备支持多少条规则。
- 基于协议的 VLAN 仅在交换机端口之间正常工作，而在交换机端口与 CPU 之间不能正常工作。当数据包被转发到 CPU 时，将始终使用网桥端口的 `pvid` 属性，而不是 ACL 规则中的 `new-vlan-id`。
- 启用 DHCP snooping 时，基于协议的 VLAN 将不适用于 DHCP 数据包。

:::

通过创建启用硬件卸载的网桥来启用端口交换：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

在网桥 VLAN 表中添加 VLAN 并指定端口：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether2 untagged=ether6 vlan-ids=200
add bridge=bridge1 tagged=ether2 untagged=ether7 vlan-ids=300
add bridge=bridge1 tagged=ether2 untagged=ether8 vlan-ids=400
```

添加根据 MAC 协议分配 VLAN ID 的交换机规则：

```ros
/interface/ethernet/switch/rule
add mac-protocol=ip new-vlan-id=200 ports=ether6 switch=switch1
add mac-protocol=ipx new-vlan-id=300 ports=ether7 switch=switch1
add mac-protocol=0x80F3 new-vlan-id=400 ports=ether8 switch=switch1
```

#### VLAN 隧道（Q-in-Q） {#vlan-tunneling-q-in-q}

自 RouterOS v6.43 起，可以同时使用提供商网桥（IEEE 802.1ad）和标签堆叠 VLAN 过滤以及硬件卸载。配置在[网桥 VLAN 隧道（Q-in-Q）](./vlan.md#q-in-q)章节中描述。

:::danger
使用 Marvell-98DX3257 交换芯片的设备（例如 CRS354 系列）在 1Gbps 以太网接口上不支持其他 VLAN 类型（`0x88a8` 和 `0x9100`）的 VLAN 过滤。
:::

### 入口 VLAN 转换 {#ingress-vlan-translation}

可以使用入口端口上的 ACL 规则将某个 VLAN ID 转换为不同的 VLAN ID。在此示例中，我们创建两条 ACL 规则，以允许双向通信。可按以下步骤完成。

创建新网桥并向其中添加启用硬件卸载的端口：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=no
/interface/bridge/port
add interface=ether1 bridge=bridge1 hw=yes
add interface=ether2 bridge=bridge1 hw=yes
```

添加 ACL 规则以在每个方向上转换 VLAN ID：

```ros
/interface/ethernet/switch/rule
add new-dst-ports=ether2 new-vlan-id=20 ports=ether1 switch=switch1 vlan-id=10
add new-dst-ports=ether1 new-vlan-id=10 ports=ether2 switch=switch1 vlan-id=20
```

将两个 VLAN ID 都添加到网桥 VLAN 表：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1 vlan-ids=10
add bridge=bridge1 tagged=ether2 vlan-ids=20
```

启用网桥 VLAN 过滤：

```ros
/interface/bridge/set bridge1 vlan-filtering=yes
```

:::warning
双向通信仅限于两个交换机端口之间。在更多端口之间转换 VLAN ID 可能导致流量泛洪或同一 VLAN 端口之间的错误转发。

**注意：** 启用 `vlan-filtering` 后，您将过滤掉发往 CPU 的流量。在启用 VLAN 过滤之前，应确保已设置[管理端口](./index.md#management-access-configuration)。
:::

## (R/M)STP {#rmstp}

---

配备 Marvell Prestera 交换机的 MikroTik 设备能够在硬件层面运行 STP、RSTP 和 MSTP。有关更多详细信息，请查看[生成树协议](./user-guides/spanning-tree-protocol.md)手册页；有关相关配置/监控选项，请参阅[网桥与交换](./index.md)页面。

## 链路聚合 {#bonding}

---

配备 Marvell Prestera 交换机的 MikroTik 设备支持链路聚合接口的硬件卸载。仅 `802.3ad`（LACP）、`balance-xor`（静态 LAG）和 `active-backup` 链路聚合模式支持硬件卸载；其他链路聚合模式将使用 CPU 资源。有关链路聚合接口的更多信息，请参阅[链路聚合接口](../high-availability-solutions/bonding.md)章节。

要创建硬件卸载的链路聚合接口，必须使用受支持的链路聚合模式创建链路聚合接口：

```ros
/interface/bonding
add mode=802.3ad name=bond1 slaves=ether1,ether2
```

此接口可与其他接口一起添加到网桥：

```ros
/interface/bridge
add name=bridge
/interface/bridge/port
add bridge=bridge interface=bond1 hw=yes
add bridge=bridge interface=ether3 hw=yes
add bridge=bridge interface=ether4 hw=yes
```

:::warning
不要将已在 bond 中的接口添加到网桥；RouterOS 不允许将已是链路聚合从端口的接口添加到网桥。
:::

通过检查 "H" 标志，确保链路聚合接口已硬件卸载：

```text
/interface/bridge/port/print 
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload 
 #     INTERFACE                                 BRIDGE                                 HW
 0   H bond1                                     bridge                                 yes
 1   H ether3                                    bridge                                 yes
 2   H ether4                                    bridge                                 yes
```

:::warning
对于硬件卸载的链路聚合接口，内置交换芯片将始终使用 Layer2+Layer3+Layer4 作为发送哈希策略；手动更改发送哈希策略将不会生效。
:::

### 配置示例 - 使用链路聚合的 VLAN {#configuration-example---vlans-with-bonds}

本节将展示如何配置多台交换机以使用链路聚合接口和基于端口的 VLAN，并展示一个包含 DHCP 服务器、VLAN 间路由、管理 IP 和无效 VLAN 过滤配置的完整示例。

对于此网络拓扑，我们将使用两台 CRS326-24G-2S+、一台 CRS317-1G-16S+ 和一台 CCR1072-1G-8S+。

![CRS3xx VLANs with Bonds](/img/4664a0d68abb9987.webp)

在此设置中，SwitchA 和 SwitchC 会将来自端口 ether1-ether8 的所有流量标记为 VLAN ID 10，将 ether9-ether16 标记为 VLAN ID 20，并将 ether17-ether24 标记为 VLAN ID 30。只有当用户从 SwitchA 或 SwitchB 上的 ether1 使用 VLAN ID 99 的带标签流量连接时，才能进行管理。也可以从路由器使用 VLAN ID 99 的带标签流量连接到所有设备。此设置中的 SFP+ 端口将用作 VLAN 干道端口，同时处于 bond 中以创建 LAG 接口。

#### 配置链路聚合 {#configure-bonding}

当需要更大带宽时，使用链路聚合接口。这通过创建链路聚合组来完成，该组还为交换机提供硬件自动故障转移和负载均衡。通过将两个 10Gbps 接口加入链路聚合，可以将理论带宽上限提高到 20Gbps。请确保所有聚合接口都以相同速率连接。

:::info
使用硬件卸载网桥时，交换机使用内置交换芯片聚合流量，而不占用 CPU 资源。
:::

要在 SwitchA 与 SwitchB 之间以及 SwitchC 与 SwitchB 之间，使用 sfp-sfpplus1 和 sfp-sfpplus2 创建 20Gbps 链路聚合接口，请在 **SwitchA** 和 **SwitchC** 上使用以下命令：

```ros
/interface/bonding
add mode=802.3ad name=bond_1-2 slaves=sfp-sfpplus1,sfp-sfpplus2
```

要在 SwitchB 与路由器之间创建 40Gbps 链路聚合接口，并在 SwitchA 与 SwitchC 之间创建 20Gbps 链路聚合接口，请在 **SwitchB** 上使用以下命令：

```ros
/interface/bonding
add mode=802.3ad name=bond_1-2 slaves=sfp-sfpplus1,sfp-sfpplus2
add mode=802.3ad name=bond_3-4 slaves=sfp-sfpplus3,sfp-sfpplus4
add mode=802.3ad name=bond_5-6-7-8 slaves=sfp-sfpplus5,sfp-sfpplus6,sfp-sfpplus7,sfp-sfpplus8
```

在我们的场景中，路由器需要基于软件的链路聚合接口。请在**路由器**上使用以下命令：

```ros
/interface/bonding
add mode=802.3ad name=bond_1-2-3-4 slaves=sfp-sfpplus1,sfp-sfpplus2,sfp-sfpplus3,sfp-sfpplus4
```

:::info
接口聚合不会创建具有更大链路速度的接口。接口聚合会创建一个虚拟接口，可以在多个接口上对流量进行负载均衡。更多详细信息请参阅 [LAG 接口与负载均衡](./user-guides/layer2-misconfiguration.md#lag-interfaces-and-load-balancing)页面。
:::

#### 配置端口交换 {#configure-port-switching}

此设置中的所有交换机都要求将所有使用的端口一起交换。对于链路聚合，应将链路聚合接口作为网桥端口添加，而不是添加各个聚合端口。请在 **SwitchA** 和 **SwitchC** 上使用以下命令：

```ros
/interface/bridge
add name=bridge vlan-filtering=no
/interface/bridge/port
add bridge=bridge interface=ether1 pvid=10
add bridge=bridge interface=ether2 pvid=10
add bridge=bridge interface=ether3 pvid=10
add bridge=bridge interface=ether4 pvid=10
add bridge=bridge interface=ether5 pvid=10
add bridge=bridge interface=ether6 pvid=10
add bridge=bridge interface=ether7 pvid=10
add bridge=bridge interface=ether8 pvid=10
add bridge=bridge interface=ether9 pvid=20
add bridge=bridge interface=ether10 pvid=20
add bridge=bridge interface=ether11 pvid=20
add bridge=bridge interface=ether12 pvid=20
add bridge=bridge interface=ether13 pvid=20
add bridge=bridge interface=ether14 pvid=20
add bridge=bridge interface=ether15 pvid=20
add bridge=bridge interface=ether16 pvid=20
add bridge=bridge interface=ether17 pvid=30
add bridge=bridge interface=ether18 pvid=30
add bridge=bridge interface=ether19 pvid=30
add bridge=bridge interface=ether20 pvid=30
add bridge=bridge interface=ether21 pvid=30
add bridge=bridge interface=ether22 pvid=30
add bridge=bridge interface=ether23 pvid=30
add bridge=bridge interface=ether24 pvid=30
add bridge=bridge interface=bond_1-2
```

使用以下命令在 **SwitchB** 上将所有链路聚合接口添加到单个网桥：

```ros
/interface/bridge
add name=bridge vlan-filtering=no
/interface/bridge/port
add bridge=bridge interface=bond_1-2
add bridge=bridge interface=bond_3-4
add bridge=bridge interface=bond_5-6-7-8
```

#### 配置管理 IP {#configure-management-ip}

创建管理接口并为其分配 IP 地址以保留对交换机的访问非常有用。这在更新交换机时也非常有用，因为启用无效 VLAN 过滤时，发往交换机的此类流量将被阻止。

在 **SwitchA**、**SwitchB** 和 **SwitchC** 上创建可路由的 VLAN 接口：

```ros
/interface/vlan
add interface=bridge name=MGMT vlan-id=99
```

路由器需要在链路聚合接口上创建可路由的 VLAN 接口。使用以下命令在**路由器**上创建 VLAN 接口：

```ros
/interface/vlan
add interface=bond_1-2-3-4 name=MGMT vlan-id=99
```

本指南将为每台设备使用以下地址：

| 设备 | 地址 |
| :-- | :-- |
| 路由器 | 192.168.99.1 |
| SwitchA | 192.168.99.2 |
| SwitchB | 192.168.99.3 |
| SwitchC | 192.168.99.4 |

在 VLAN 接口上为每台交换机设备添加 IP 地址（将 X 改为相应的数字）：

```ros
/ip/address
add address=192.168.99.X/24 interface=MGMT
```

不要忘记在交换机设备上添加默认网关并指定 DNS 服务器：

```ros
/ip/route
add gateway=192.168.99.1
/ip/dns
set servers=192.168.99.1
```

在**路由器**上添加 IP 地址：

```ros
/ip/address
add address=192.168.99.1/24 interface=MGMT
```

#### 配置无效 VLAN 过滤 {#configure-invalid-vlan-filtering}

由于 SwitchA 和 SwitchC 上的大多数端口将作为接入端口，您可以将所有端口设置为仅接受特定类型的数据包；在本例中，我们希望 SwitchA 和 SwitchC 仅接受未标记数据包。请在 **SwitchA** 和 **SwitchC** 上使用以下命令：

```ros
/interface/bridge/port
set [ find ] frame-types=admit-only-untagged-and-priority-tagged
```

SwitchA 和 SwitchC 上的帧类型有一个例外。在此设置中，需要从 ether1 和链路聚合接口访问管理。它们要求可以转发带标签流量。请在 **SwitchA** 和 **SwitchC** 上使用以下命令：

```ros
/interface/bridge/port
set [find where interface=ether1] frame-types=admit-all
set [find where interface=bond_1-2] frame-types=admit-only-vlan-tagged
```

在 SwitchB 上应仅转发带标签数据包，请在 **SwitchB** 上使用以下命令：

```ros
/interface/bridge/port
set [ find ] frame-types=admit-only-vlan-tagged
```

可选步骤是在网桥接口上设置 `frame-types=admit-only-vlan-tagged`，以禁用默认的未标记 VLAN 1（`pvid=1`）。我们使用网桥上的带标签 VLAN 进行管理访问，因此无需在网桥上接受未标记流量。请在 **SwitchA**、**SwitchB** 和 **SwitchC** 上使用以下命令：

```ros
/interface/bridge/set [find name=bridge] frame-types=admit-only-vlan-tagged
```

需要设置网桥 VLAN 表。在此网络设置中，我们需要在 ether1-ether8 上允许 VLAN 10，在 ether9-ether16 上允许 VLAN 20，在 ether17-ether24 上允许 VLAN 30，在 bond\_1-2 上允许 VLAN 10、20、30、99，并且对 ether1 做特殊处理，以允许在 SwitchA 和 SwitchC 上转发 VLAN 99。请在 **SwitchA** 和 **SwitchC** 上使用以下命令：

```ros
/interface/bridge/vlan
add bridge=bridge tagged=bond_1-2 vlan-ids=10
add bridge=bridge tagged=bond_1-2 vlan-ids=20
add bridge=bridge tagged=bond_1-2 vlan-ids=30
add bridge=bridge tagged=bridge,bond_1-2,ether1 vlan-ids=99
```

:::warning
将 `frame-types` 设置为 `admit-all` 或 `admit-only-untagged-and-priority-tagged` 的网桥端口会自动添加为 `pvid` VLAN 的未标记端口。
:::

同样，需要为 SwitchB 设置网桥 VLAN 表。请在 **SwitchB** 上使用以下命令：

```ros
/interface/bridge/vlan
add bridge=bridge tagged=bond_1-2,bond_3-4,bond_5-6-7-8 vlan-ids=10,20,30
add bridge=bridge tagged=bond_1-2,bond_3-4,bond_5-6-7-8,bridge vlan-ids=99
```

配置完成后，即可启用 VLAN 过滤。请在 **SwitchA**、**SwitchB** 和 **SwitchC** 上使用以下命令：

```ros
/interface/bridge
set bridge vlan-filtering=yes
```

:::danger
请仔细检查基于端口的 VLAN 是否设置正确。如果出错，您可能会失去对交换机的访问权限，只能通过重置配置或使用串行控制台来恢复连接。
:::

:::note
VLAN 过滤在[网桥 VLAN 过滤](./index.md#bridge-vlan-filtering)章节中有更详细的描述。
:::

#### 配置 VLAN 间路由 {#configure-intervlan-routing}

要创建 VLAN 间路由，必须在路由器上为每个客户 VLAN ID 创建 VLAN 接口，并且必须为其分配 IP 地址。VLAN 接口必须创建在先前创建的链路聚合接口上。

请在**路由器**上使用以下命令：

```ros
/interface/vlan
add interface=bond_1-2-3-4 name=VLAN10 vlan-id=10
add interface=bond_1-2-3-4 name=VLAN20 vlan-id=20
add interface=bond_1-2-3-4 name=VLAN30 vlan-id=30
/ip/address
add address=192.168.10.1/24 interface=VLAN10
add address=192.168.20.1/24 interface=VLAN20
add address=192.168.30.1/24 interface=VLAN30
```

:::info
这些命令是 DHCP 服务器设置所必需的。如果不希望进行 VLAN 间路由，但需要在单台路由器上使用 DHCP 服务器，请使用[防火墙过滤](../firewall-and-quality-of-service/firewall/filter.md)规则阻止不同子网之间的通信。
:::

:::note
自 RouterOS v7 起，可以在受支持的硬件上使用三层硬件卸载来路由流量。更多详细信息请参阅[三层硬件卸载](./l3-hardware-offloading.md)章节。
:::

#### 配置 DHCP 服务器 {#configure-dhcp-server}

要让 DHCP 服务器为每个 VLAN ID 工作，必须在先前创建的 VLAN 接口上设置服务器（每个 VLAN ID 一个服务器）。最好每个 VLAN ID 都有自己的子网和自己的 IP 池。DNS 服务器可以指定为特定 VLAN ID 的路由器 IP 地址，也可以使用全局 DNS 服务器，但该地址必须可达。

要设置 DHCP 服务器，请在**路由器**上使用以下命令：

```ros
/ip/pool
add name=VLAN10_POOL ranges=192.168.10.100-192.168.10.200
add name=VLAN20_POOL ranges=192.168.20.100-192.168.20.200
add name=VLAN30_POOL ranges=192.168.30.100-192.168.30.200
/ip/dhcp-server
add address-pool=VLAN10_POOL disabled=no interface=VLAN10 name=VLAN10_DHCP
add address-pool=VLAN20_POOL disabled=no interface=VLAN20 name=VLAN20_DHCP
add address-pool=VLAN30_POOL disabled=no interface=VLAN30 name=VLAN30_DHCP
/ip/dhcp-server/network
add address=192.168.10.0/24 dns-server=192.168.10.1 gateway=192.168.10.1
add address=192.168.20.0/24 dns-server=192.168.20.1 gateway=192.168.20.1
add address=192.168.30.0/24 dns-server=192.168.30.1 gateway=192.168.30.1
```

如果使用路由器的 DNS 服务器，请不要忘记允许远程请求，并确保在路由器上配置了 DNS 服务器。请在**路由器**上使用以下命令：

```ros
/ip/dns
set allow-remote-requests=yes servers=8.8.8.8
```

:::danger
当将 `allow-remote-requests` 设置为 `yes` 时，请确保使用防火墙从外部保护本地 DNS 服务器，因为如果任何人都可以从 Internet 访问您的 DNS 服务器，它可能被用于 DDoS 攻击。
:::

不要忘记创建 NAT；假设 sfp-sfpplus8 用作 WAN 端口，请在**路由器**上使用以下命令：

```ros
/ip/firewall/nat
add action=masquerade chain=srcnat out-interface=sfp-sfpplus8
```

#### 配置巨型帧 {#configure-jumbo-frames}

在这样的设置中，可以通过启用巨型帧来提高总吞吐量。这通过增加最大传输单元（MTU）来减少数据包开销。如果网络中的某台设备不支持巨型帧，则它不会从更大的 MTU 中受益。通常，整个网络并不都支持巨型帧，但在支持巨型帧的设备之间发送数据时（包括路径中的所有交换机），您仍然可以受益。

在这种情况下，如果 SwitchA 后面的客户端和 SwitchC 后面的客户端支持巨型帧，那么启用巨型帧将是有益的。在启用巨型帧之前，使用以下命令确定 MAX-L2MTU：

```ros
[admin@SwitchA] > interface print 
Flags: R - RUNNING
Columns: NAME, TYPE, ACTUAL-MTU, L2MTU, MAX-L2MTU, MAC-ADDRESS
 #   NAME           TYPE   ACTUAL-MTU  L2MTU  MAX-L2MTU  MAC-ADDRESS      
 1 R sfp-sfpplus1   ether        1500   1584      10218  64:D1:54:FF:E3:7F

```

:::info
更多信息请参阅 [MTU 手册](../hardware/mtu-in-routeros.md)页面。
:::

确定 MAX-L2MTU 后，根据网络上的流量选择 MTU 大小，并在 **SwitchA**、**SwitchB** 和 **SwitchC** 上使用以下命令：

```ros
/interface/ethernet
set [ find ] l2mtu=10218 mtu=10218
```

:::info
不要忘记也更改客户端设备上的 MTU，否则上述设置将不会生效。
:::

## 多机箱链路聚合组 {#multi-chassis-link-aggregation-group}

---

RouterOS 中的 MLAG（多机箱链路聚合组）实现允许在两台独立设备上配置 LACP bond，而客户端设备认为它连接到同一台机器。这在交换机故障时提供物理冗余。配备 Marvell Prestera 交换机的 MikroTik 设备可以配置硬件卸载的 MLAG。更多信息请阅读[此处](../high-availability-solutions/multi-chassis-link-aggregation-group.md)。

## 三层硬件卸载 {#l3-hardware-offloading}

---

三层硬件卸载（也称为 IP 交换或硬件路由）允许将部分路由器功能卸载到交换芯片上。这使得在路由数据包时能够达到线速，而这仅靠 CPU 是不可能实现的。

卸载功能集取决于所使用的芯片组。更多信息请阅读[此处](./l3-hardware-offloading.md)。

## 端口隔离 {#port-isolation}

---

自 RouterOS v6.43 起，可以创建私有 VLAN 设置，示例可在[交换芯片端口隔离](./switch-chip-features.md#port-isolation)手册页中找到。硬件卸载的链路聚合接口不包括在交换机端口隔离菜单中，但仍可以在链路的每个辅助接口上单独配置端口隔离。

:::warning
端口隔离可与启用 vlan-filtering 的网桥一起使用，并且可以隔离属于同一 VLAN 的端口。隔离按端口生效；无法按 VLAN 隔离端口。
:::

## IGMP/MLD 监听 {#igmpmld-snooping}

---

配备 Marvell Prestera 交换机的 MikroTik 设备能够在硬件层面使用 IGMP/MLD Snooping。要查看更详细的信息，请查看 [网桥 IGMP/MLD 侦听](./user-guides/bridge-igmp-mld-snooping.md)手册页。

## DHCP Snooping 与 DHCP Option 82 {#dhcp-snooping-and-dhcp-option-82}

---

配备 Marvell Prestera 交换机的 MikroTik 设备能够在硬件层面使用带自定义 Option 82（Circuit ID、Remote ID）的 DHCP Snooping。交换机会创建动态 ACL 规则来捕获 DHCP 数据包，并将其重定向到主 CPU 以进行进一步处理。要查看更详细的信息，请访问 [DHCP Snooping 与 DHCP Option 82](./index.md#dhcp-snooping-and-dhcp-option-82)手册页。

:::info
从 RouterOS v7.17 开始，DHCP snooping 支持硬件卸载的链路聚合接口。
:::

## DHCPv6 Snooping 与 DHCP Option 18、Option 37 {#dhcpv6-snooping-and-dhcp-option-18-option-37}

---

自 RouterOS v7.23 起，配备 Marvell Prestera 交换机的 MikroTik 设备能够在硬件层面使用带自定义 Option 18（Interface ID）和 Option 37（Remote ID）的 DHCPv6 Snooping。交换机会创建动态 ACL 规则来捕获 DHCPv6 数据包，并将其重定向到主 CPU 以进行进一步处理。要查看更详细的信息，请访问 [DHCPv6 Snooping / DHCPv6 Shield](./index.md#dhcpv6-snooping--dhcpv6-shield)手册页。

## RA 防护 {#ra-guard}

---

自 RouterOS v7.22 起，配备 Marvell Prestera 交换机的 MikroTik 设备能够在硬件层面使用 RA Guard。交换机会创建动态 ACL 规则来捕获相关 IPv6 数据包，并将其重定向到主 CPU 以进行进一步处理。要查看更详细的信息，请访问 [RA Guard](./index.md#ra-guard)手册页。

## 镜像 {#mirroring}

---

镜像是允许网络交换机复制通过它的所有数据，并将副本发送到另一个指定端口（称为 `mirror-target`）的功能。此功能对于设置分流设备很有用，可通过单独的设备分析网络流量。您可以通过指定源端口以简单方式设置镜像（请参阅 `/interface/ethernet/switch/port` 中的 `mirror-egress` 和 `mirror-ingress`），也可以根据不同条件配置更高级的镜像（请参阅 `/interface/ethernet/switch/rule` 中的 `mirror`）。

需要注意的是，`mirror-target` 端口必须位于同一交换机上。您可以查看设备框图，或导航到 `/interface/ethernet` 菜单，以确定哪些接口连接到哪里。在设置配置时，不必将 `mirror-target` 接口添加到设置源端口的同一硬件卸载网桥。`mirror-target` 端口可以是独立接口（未配置为网桥端口），也可以位于网桥设置中。在将 `mirror-target` 与网桥一起使用时，请注意数据和镜像流量可能都在同一 LAN 上传输。在这种情况下，请考虑使用 RSPAN（远程交换机端口分析器），其中镜像流量在通过网络传输之前被封装到单独的 VLAN 中。

此外，您可以将 `mirror-target` 端口设置为特殊值 "cpu"，这意味着复制的数据包将被发送到交换芯片的 CPU 端口。

### 配置示例 {#configuration-examples}

---

#### 基于端口的镜像 {#port-based-mirroring}

从 RouterOS 7.15 版本开始，可以配置多个源端口，并选择性选择镜像传入流量、传出流量或两者。在此示例中，来自 **ether2** 接口的传入和传出流量都将被复制并发送到 **ether3** 接口以进行监控或分析。

```ros
# 自 RouterOS v7.15 起
/interface/ethernet/switch/port
set ether2 mirror-egress=yes mirror-ingress=yes
/interface/ethernet/switch
set switch1 mirror-target=ether3

# 较旧的 RouterOS：
/interface/ethernet/switch
set switch1 mirror-source=ether2 mirror-target=ether3
```

#### 基于 VLAN 的镜像 {#vlan-based-mirroring}

使用 ACL 规则，可以通过 `ports` 设置镜像来自多个接口的数据包。此外，还可以指定更详细的条件，例如 VLAN ID、MAC/IP 地址或 TCP/UDP 端口。只有**入口**数据包会被镜像到 `mirror-target` 接口。此示例将镜像来自 **ether2** 接口的传入 VLAN 11 流量，并将副本发送到 **ether3** 接口。要使用带 `vlan-id` 匹配器的 ACL 规则，需要启用[网桥 vlan-filtering](./index.md#bridge-vlan-filtering)。

```ros
/interface/bridge
set bridge1 vlan-filtering=yes
/interface/ethernet/switch
set switch1 mirror-target=ether3
/interface/ethernet/switch/rule
add mirror=yes ports=ether1 switch=switch1 vlan-id=11
```

#### 基于 MAC 的镜像 {#mac-based-mirroring}

此示例将镜像来自 **ether1** 接口且具有 64:D1:54:D9:27:E6 MAC 目标地址或源地址的传入流量，并将副本发送到 **ether3** 接口。

```ros
/interface/ethernet/switch
set switch1 mirror-target=ether3
/interface/ethernet/switch/rule
add mirror=yes ports=ether1 switch=switch1 dst-mac-address=64:D1:54:D9:27:E6/FF:FF:FF:FF:FF:FF
add mirror=yes ports=ether1 switch=switch1 src-mac-address=64:D1:54:D9:27:E6/FF:FF:FF:FF:FF:FF
```

#### 基于 IP 的镜像 {#ip-based-mirroring}

此示例将镜像来自 **ether1** 接口且 IP 目标地址或源地址为 192.168.88.0/24 的传入流量，并将副本发送到 **ether3** 接口。

```ros
/interface/ethernet/switch
set switch1 mirror-target=ether3 mirror-source=none
/interface/ethernet/switch/rule
add mirror=yes ports=ether1 switch=switch1 src-address=192.168.88.0/24
add mirror=yes ports=ether1 switch=switch1 dst-address=192.168.88.0/24
```

还有其他选项，请查看 [ACL 章节](./marvell-prestera-switch-chip-features.md#switch-rules-acl)以了解可用于匹配数据包的所有可能参数。

#### 远程交换机端口分析器 {#remote-switch-port-analyzer}

此示例将镜像来自 **ether2** 接口的传入和传出流量，副本将使用 999 作为 VLAN ID 封装在 802.1Q VLAN 中，数据包将被发送到 **ether3** 接口。如果原始流量已带有 VLAN 标签，RSPAN 将再添加一层 VLAN 标签作为外层标签。这会导致镜像流量被标记两次。如果 `mirror-target` 端口包含在启用 vlan-filtering 的网桥中，则无需在 RSPAN 的 `/interface/bridge/vlan` 菜单下将该接口设为带标签 VLAN 成员。

```ros
/interface/ethernet/switch/port
set ether2 mirror-egress=yes mirror-ingress=yes
/interface/ethernet/switch
set switch1 mirror-target=ether3 rspan=yes rspan-egress-vlan-id=999 rspan-ingress-vlan-id=999
```

### 属性参考 {#property-reference}

**子菜单：** `/interface/ethernet/switch`

| 属性 | 描述 |
| :-- | :-- |
| **mirror-target** (*cpu \| name \| none*; 默认值：**none**) | 选择单个镜像目标端口。来自 `mirror-egress` 和 `mirror-ingress`（`/interface/ethernet/switch/port`）以及 mirror（`/interface/ethernet/switch/rule`）的数据包将被发送到所选端口。 |
| **rspan** (*no \| yes*; 默认值：**no**) | 在 `mirror-target` 上启用远程交换机端口分析器（RSPAN）功能。标记为入口或出口镜像的流量通过指定的远程分析器 VLAN 承载 - `rspan-egress-vlan-id` 和 `rspan-ingress-vlan-id`。 |
| **rspan-egress-vlan-id** (*integer: 1..4095*; 默认值：**1**) | 选择标记的出口流量的 VLAN ID。仅在启用 `rspan` 时适用。 |
| **rspan-ingress-vlan-id** (*integer: 1..4095*; 默认值：**1**) | 选择标记的入口流量的 VLAN ID。仅在启用 `rspan` 时适用。 |

**子菜单：** `/interface/ethernet/switch/port`

| 属性 | 描述 |
| :-- | :-- |
| **mirror-egress** (*no \| yes*; 默认值：**no**) | 是否将出口数据包副本发送到 `mirror-target` 端口。 |
| **mirror-ingress** (*no \| yes*; 默认值：**no**) | 是否将入口数据包副本发送到 `mirror-target` 端口。 |

**子菜单：** `/interface/ethernet/switch/rule`

| 属性 | 描述 |
| :-- | :-- |
| **mirror** (*no \| yes*; 默认值：**no**) | 是否将数据包副本发送到 `mirror-target` 端口。 |

## 流量整形 {#traffic-shaping}

---

可以使用 ACL 规则限制匹配特定参数的入口流量，也可以按端口限制入口/出口流量。策略器用于入口流量，整形器用于出口流量。入口策略器通过丢弃数据包来控制接收的流量。所有超过定义限制的内容都会被丢弃。这可能影响端主机上的 TCP 拥塞控制机制，实际达到的带宽可能小于定义值。出口整形器会尝试将超过限制的数据包排队，而不是丢弃它们。最终，当输出队列满时它也会丢弃数据包；不过，它应能更好地利用定义的吞吐量。

### 基于端口的流量策略和整形 {#port-based-traffic-police-and-shaper}

```ros
/interface/ethernet/switch/port
set ether1 ingress-rate=10M egress-rate=5M
```

### 基于 MAC 的流量策略器 {#mac-based-traffic-policer}

```ros
/interface/ethernet/switch/rule
add ports=ether1 switch=switch1 src-mac-address=64:D1:54:D9:27:E6/FF:FF:FF:FF:FF:FF rate=10M
```

### 基于 VLAN 的流量策略器 {#vlan-based-traffic-policer}

```ros
/interface/bridge
set bridge1 vlan-filtering=yes
/interface/ethernet/switch/rule
add ports=ether1 switch=switch1 vlan-id=11 rate=10M
```

:::danger
启用 `vlan-filtering` 后，您将过滤掉发往 CPU 的流量。在启用 VLAN 过滤之前，应确保已设置[管理端口](./index.md#management-access-configuration)。
:::

### 基于协议的流量策略器 {#protocol-based-traffic-policer}

```ros
/interface/ethernet/switch/rule
add ports=ether1 switch=switch1 mac-protocol=ipx rate=10M
```

还有其他选项，请查看 [ACL 章节](./marvell-prestera-switch-chip-features.md#switch-rules-acl)以了解可用于匹配数据包的所有可能参数。

:::warning
交换机规则表用于 QoS 功能。请参阅[此表](./marvell-prestera-switch-chip-features.md#models)了解每台设备支持多少条规则。
:::

:::danger
由于硬件限制，当 10Gbps 交换机端口以 10/100Mbps、1/2.5/5Gbps 连接时，`egress-rate` 和 `storm-rate` 设置无法正常工作。这适用于 98DX224S、98DX226S、98DX2528、98DX3236 交换芯片。
:::

## 流量风暴控制 {#traffic-storm-control}

---

自 RouterOS v6.42 起，可以启用流量风暴控制。当某些帧在网络中被持续泛洪时，可能出现流量风暴。风暴控制设置通常配置在非上行端口上，以限制这些特定端口上的传入风暴流量。这通过最小化流量风暴对整个网络的影响来帮助保护整个交换机及其连接的端口。

例如，如果创建了网络环路且未使用环路避免机制（例如[生成树协议](./user-guides/spanning-tree-protocol.md)），广播或组播帧可能迅速淹没网络，导致网络性能下降甚至网络完全崩溃。使用配备 Marvell Prestera 交换机的 MikroTik 设备，可以限制广播、未知组播和未知单播流量。当交换机不包含目标 MAC 地址的主机条目时，视为未知单播流量。当交换机在 `/interface/bridge/mdb` 菜单中不包含组播组条目时，视为未知组播流量。风暴控制设置应应用于入口端口；出口流量将受到限制。

![Traffic Storm](/img/f275b4060eca4083.webp)

:::warning
风暴控制参数指定为链路速度的百分比（%）。如果链路速度为 1Gbps，则将 `storm-rate` 指定为 `10` 将仅允许 100Mbps 的广播、未知组播和/或未知单播流量被转发。
:::

**子菜单：** `/interface/ethernet/switch/port`

| 属性 | 描述 |
| :-- | :-- |
| **limit-broadcasts** (*yes \| no*; 默认值：**yes**) | 限制交换机端口上的广播流量。 |
| **limit-unknown-multicasts** (*yes \| no*; 默认值：**no**) | 限制交换机端口上的未知组播流量。 |
| **limit-unknown-unicasts** (*yes \| no*; 默认值：**no**) | 限制交换机端口上的未知单播流量。 |
| **storm-rate** (*integer 0..100*; 默认值：**100**) | 广播、未知组播和/或未知单播流量限制为链路速度的百分比。 |

:::danger
配备 98DX224S、98DX226S、98DX2528、98DX3236 交换芯片的设备无法区分未知组播流量与所有组播流量。例如，CRS326-24G-2S+ 在使用 `limit-unknown-multicasts` 和 `storm-rate` 时将限制所有组播流量。对于其他设备，例如 CRS317-1G-16S+，`limit-unknown-multicasts` 参数将仅限制未知组播流量（地址未出现在 `/interface/bridge/mdb` 中）。
:::

例如，要将 ether1（1Gbps）上的广播和未知单播流量限制为 1%（10Mbps），请使用以下命令：

```ros
/interface/ethernet/switch/port
set ether1 storm-rate=1 limit-broadcasts=yes limit-unknown-unicasts=yes
```

:::warning
由于硬件限制，当 10Gbps 交换机端口以 10/100Mbps、1/2.5/5Gbps 连接时，`egress-rate` 和 `storm-rate` 设置无法正常工作。这适用于 98DX224S、98DX226S、98DX2528、98DX3236 交换芯片。
:::

## MPLS 硬件卸载 {#mpls-hardware-offloading}

---

自 RouterOS v6.41 起，可以将某些 MPLS 功能卸载到交换芯片。交换机必须在 PE-P-PE 设置中作为 Provider 路由器，才能实现硬件卸载。设置示例可在 [LDP 示例设置](../user-guides/routing-and-networking-protocols/mpls/ldp.md#example-setup)中找到。仅当 LDP 接口配置为物理交换机接口（例如以太网、SFP、SFP+）时，才会进行硬件卸载。

:::warning
目前，只有使用 RouterOS v6.41 及更新版本的 `CRS317-1G-16S+` 和 `CRS309-1G-8S+` 能够硬件卸载某些 MPLS 功能。`CRS317-1G-16S+` 和 `CRS309-1G-8S+` 的内置交换芯片无法从数据包中弹出 MPLS 标签；在 PE-P-PE 设置中，您必须使用显式 null 或禁用 MPLS 网络中的 TTL 传播，才能实现硬件卸载。

**注意：** 自 RouterOS v7 起，MPLS 硬件卸载已被移除。
:::

## 交换机规则（ACL） {#switch-rules-acl}

---

访问控制列表包含入口策略引擎和出口策略引擎。请参阅[此表](./marvell-prestera-switch-chip-features.md#models)了解每台设备支持多少条规则。它是一种高级工具，可基于二层、三层和四层协议头字段条件进行线速数据包过滤、转发和修改。

对每个接收到的数据包检查 ACL 规则，直到找到匹配项。如果有多个规则可以匹配，则只会触发第一个规则。没有任何动作参数的规则是接受数据包的规则。

启用 IGMP snooping、DHCP snooping、RoMON、PTP 或 loop-protect 等功能会自动创建动态 ACL 规则。添加新的 ACL 条目时应考虑这些规则。创建新规则时使用 `place-before` 属性，或使用 `move` 命令调整 ACL 规则顺序。

:::warning
使用 L3 或 L4 匹配器时，不需要将 `mac-protocol` 设置为特定 IP 版本；但是，在过滤任何 IP 数据包时，建议设置 `mac-protocol=ip` 或 `mac-protocol=ipv6`。
:::

:::danger
修改交换机 ACL 规则时（例如添加、删除、禁用、启用或移动），现有交换机规则会在短时间内处于非活动状态。这可能在 ACL 规则修改期间导致一些数据包泄漏。
:::

**子菜单：** `/interface/ethernet/switch/rule`

| 属性 | 描述 |
| :-- | :-- |
| **copy-to-cpu** (*no \| yes*; Default: **no**) | 克隆匹配的数据包并将其发送到 CPU。 |
| **disabled** (*yes \| no*; Default: **no**) | 启用或禁用 ACL 条目。 |
| **dscp** (*0..63*) | 匹配数据包的 DSCP 字段（仅适用于 IPv4 数据包）。 |
| **dst-address** (*IP address/Mask*) | 匹配目标 IPv4 地址和掩码。如果指定了 `mac-protocol=arp`，则匹配 ARP 数据包中的目标 IP。未指定 `mac-protocol` 时，仅匹配 IPv4 数据包。 |
| **dst-address6** (*IPv6 address/Mask*) | 匹配目标 IPv6 地址和掩码。 |
| **dst-mac-address** (*MAC address/Mask*) | 匹配目标 MAC 地址和掩码。 |
| **dst-port** (*0..65535*) | 匹配目标协议端口号（如果未指定 `mac-protocol`，则适用于 IPv4 和 IPv6 数据包）。 |
| **flow-label** (*0..1048575*) | 匹配 IPv6 流标签。 |
| **mac-protocol** (*802.2 \| arp \| capsman \| dot1x \| homeplug-av \| ip \| ipv6 \| ipx \| lacp \| lldp \| loop-protect \| macsec \| mpls-multicast \| mpls-unicast \| mvrp \| packing-compr \| packing-simple \| pppoe \| pppoe-discovery \| rarp \| romon \| service-vlan \| vlan \| or 0..65535 \| or 0x0000-0xffff*) | 匹配由协议名称或编号指定的特定 MAC 协议 |
| **mirror** (*no \| yes*) | 克隆匹配的数据包并将其发送到 mirror-target 端口。 |
| **new-dst-ports** (*ports \| bond \| all*) | 将目标端口更改为指定值： <br/><ul><li>如果该设置为空（例如 <code>new-dst-ports=""</code>），数据包将被丢弃；</li><li>如果指定了端口或 [ hardware-offloaded bonding ](./marvell-prestera-switch-chip-features.md)接口，数据包将被重定向到该端口。仅支持单个端口或 bond 接口；</li><li>如果使用 <code>all</code> 参数，将允许数据包进入出口处理而不会被丢弃；</li><li>如果未使用此参数，数据包将按原样接受。</li></ul> |
| **new-vlan-id** (*0..4095*) | 将 VLAN ID 更改为指定值。需要 `vlan-filtering=yes`。 |
| **new-vlan-priority** (*0..7*) | 更改 VLAN 优先级（优先级代码点）。需要 `vlan-filtering=yes`。 |
| **new-vrf** (*vrf name*) | 将入口流量分配到指定的 VRF。需要交换机芯片支持 [硬件卸载 VRF](./l3-hardware-offloading.md#l3hw-feature-support)。在 VRF-unaware 交换机（98DX3xxx 和 98DX2xxx 系列）上，将 `new-vrf` 设置为 `main` 以外的任何值都将被视为 `redirect-to-cpu=yes`。 |
| **ports** (*ports \| bond*) | 匹配规则将应用于入站流量的交换机接口。可以选择多个端口和 [hardware-offloaded bonding](./marvell-prestera-switch-chip-features.md#bonding) 接口。请注意，无法选择 `switch1-cpu` 端口。如果 `ports` 属性留空，则规则将应用于所有交换机接口。 |
| **protocol** (*dccp \| ddp \| egp \| encap \| etherip \| ggp \| gre \| hmp \| icmp \| icmpv6 \| idpr-cmtp \| igmp \| ipencap \| ipip \| ipsec-ah \| ipsec-esp \| ipv6 \| ipv6-frag \| ipv6-nonxt \| ipv6-opts \| ipv6-route \| iso-tp4 \| l2tp \| ospf \| pim \| pup \| rdp \| rspf \| rsvp \| sctp \| st \| tcp \| udp \| udp-lite \| vmtp \| vrrp \| xns-idp \| xtp \| or 0..255*) | 匹配由协议名称或编号指定的特定 IP 协议。仅在未指定 `mac-protocol` 时适用于 IPv4 数据包。要匹配某些 IPv6 协议，请使用 `mac-protocol=ipv6` 设置。 |
| **rate** (*0..4294967295*) | 为匹配的流量设置入口流量限制（比特每秒）。 |
| **redirect-to-cpu** (*no \| yes*) | 将匹配数据包的目标端口更改为 CPU。 |
| **src-address** (*IP address/Mask*) | 匹配源 IPv4 地址和掩码。如果指定了 `mac-protocol=arp`，则匹配 ARP 数据包中的源 IP。未指定 `mac-protocol` 时，仅匹配 IPv4 数据包。 |
| **src-address6** (*IPv6 address/Mask*) | 匹配源 IPv6 地址和掩码。 |
| **src-mac-address** (*MAC address/Mask*) | 匹配源 MAC 地址和掩码。 |
| **src-port** (*0..65535*) | 匹配源协议端口号（如果未指定 `mac-protocol`，则适用于 IPv4 和 IPv6 数据包）。 |
| **switch** (*switch group*) | 匹配规则将应用于的交换机组。 |
| **traffic-class** (*0..255*) | 匹配 IPv6 流量类别。 |
| **vlan-id** (*0..4095*) | 匹配 VLAN ID。需要 `vlan-filtering=yes`。 |
| **vlan-header** (*not-present \| present*) | 匹配 VLAN 头，无论 VLAN 头是否存在。需要 `vlan-filtering=yes`。 |
| **vlan-priority** (*0..7*) | 匹配 VLAN 优先级（优先级代码点）。 |

### 动作参数 {#action-parameters}

- copy-to-cpu
- redirect-to-cpu
- mirror
- new-dst-ports（可用于丢弃数据包）
- new-vlan-id
- new-vlan-priority
- new-vrf
- rate

### 二层条件参数 {#layer2-condition-parameters}

- dst-mac-address
- mac-protocol
- src-mac-address
- vlan-id
- vlan-header
- vlan-priority

### 三层条件参数 {#layer3-condition-parameters}

- dscp
- protocol
- IPv4 条件：
  - dst-address
  - src-address
- IPv6 条件：
  - dst-address6
  - flow-label
  - src-address6
  - traffic-class

### 四层条件参数 {#layer4-condition-parameters}

- dst-port
- src-port

:::warning
要使 VLAN 相关匹配器或 VLAN 相关动作参数生效，需要在网桥接口上启用 `vlan-filtering`，并确保这些端口上启用了硬件卸载，否则这些参数将不会产生任何效果。
:::
:::warning
当网桥接口 `ether-type` 设置为 `0x8100` 时，VLAN 相关 ACL 规则适用于使用常规/客户 VLAN（TPID 0x8100）标记的帧；这包括 `vlan-id` 和 `new-vlan-id`。当网桥接口 `ether-type` 设置为 `0x88a8` 时，ACL 规则适用于带有 802.1ad 服务标签（TPID 0x88a8）的帧。
:::

### 规则计数器 {#rule-counters}

每条 ACL 规则都会统计其匹配的数据包和字节数。这些计数器可用于验证规则是否按预期工作以及它处理多少流量。

默认 `print` 命令不会显示计数器，请在 `/interface/ethernet/switch/rule` 菜单中使用 `print stats` 显示它们：

```ros
[admin@MikroTik] > /interface/ethernet/switch/rule/print stats
Columns: SWITCH, COPY-TO-CPU, REDIRECT-TO-CPU, BYTES, PACKETS
# SWITCH   COPY-TO-CPU  REDIRECT-TO-CPU  BYTES  PACKETS
;;; count incoming ICMP
0 switch1  yes          no               68716      366
;;; drop ICMP to 192.168.99.1
1 switch1  no           no                   0        0
```

在本示例中，第一条规则已匹配 366 个数据包（68716 字节），而第二条规则尚未匹配任何流量。

使用 `reset-counters` 命令清除所选规则的计数器，或使用 `reset-counters [find]` 一次性清除所有规则的计数器：

```ros
[admin@MikroTik] > /interface/ethernet/switch/rule/reset-counters 0
```

## 端口安全 {#port-security}

---

可以限制单个交换机端口上允许的 MAC 地址。例如，要允许交换机端口上的 64:D1:54:81:EF:8E MAC 地址，首先将多个端口交换在一起。在此示例中，64:D1:54:81:EF:8E 将位于 **ether1** 后面。

创建 ACL 规则以允许给定 MAC 地址，并丢弃 **ether1** 上的所有其他流量（对于入口流量）：

```ros
/interface/ethernet/switch/rule
add ports=ether1 src-mac-address=64:D1:54:81:EF:8E/FF:FF:FF:FF:FF:FF switch=switch1
add new-dst-ports="" ports=ether1 switch=switch1
```

出口流量仍可能包含不应到达未知 MAC 地址设备的信息。  
假设端口已交换，请在 **ether1** 上禁用 MAC 学习和未知单播泛洪：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1 hw=yes learn=no unknown-unicast-flood=no
add bridge=bridge1 interface=ether2 hw=yes
```

禁用 MAC 学习后，需要为 64:D1:54:81:EF:8E 添加静态主机条目（用于出口流量）：

```ros
/interface/bridge/host
add bridge=bridge1 interface=ether1 mac-address=64:D1:54:81:EF:8E
```

:::warning
广播和组播流量仍会从 **ether1** 发出。您可以使用 `broadcast-flood` 和 `unknown-multicast-flood` 参数来阻止它。请注意，某些解决方案可能依赖这些设置，例如流媒体协议和 DHCP。
:::

## 双启动 {#dual-boot}

---

“双启动”功能允许您选择希望在 CRS3xx 系列交换机上使用的操作系统：RouterOS 或 SwOS。可以使用以下方式更改设备操作系统：

- 命令行（`/system/routerboard/settings/set boot-os=swos`）
- Winbox
- Webfig
- 串行控制台

有关 SwOS 的更多详细信息，请参见：[SwOS 手册](https://help.mikrotik.com/docs/display/SWOS/SwOS)。

:::warning
要检查某型号是否支持启动到 SwOS，请参阅 [SwOS 型号表](https://help.mikrotik.com/docs/spaces/SWOS/pages/76415036/CRS3xx+and+CSS3xx+series+Manual#CRS3xxandCSS3xxseriesManual-Models)以及产品页面“规格”下的“操作系统”。
:::

## 使用 RouterOS 配置 SwOS {#configuring-swos-using-routeros}

---

自 RouterOS 6.43 起，可以使用 RouterOS 为 CRS3xx 系列交换机加载、保存和重置 SwOS 配置，以及升级 SwOS 和设置 IP 地址：

- 使用 `/system/swos/save-config` 保存配置。

:::warning
配置将保存在同一设备上，文件名为 `swos.config`。请确保从设备下载该文件，因为配置文件将在重启后被删除。
:::

- 使用 `/system/swos/load-config` 加载配置。
- 使用 `/system/swos/password` 更改密码。
- 使用 `/system/swos/reset-config` 重置配置。
- 使用 `/system/swos/upgrade` 从 RouterOS 升级 SwOS。

:::warning
升级命令将自动安装最新的可用 SwOS 主备份版本；请确保您的设备可以访问 Internet，以便升级过程正常运行。当设备启动到 SwOS 时，版本号将包含字母 "p"，表示主备份版本。然后，您可以从 SwOS 的“升级”菜单安装最新的可用 SwOS 次主版本。
:::

:::warning
从 RouterOS 7.17 版本开始，device-mode 限制双启动的 SwOS/RouterOS 切换；要启用：`/system/device-mode/update routerboard=yes`
:::

| 属性 | 描述 |
| :-- | :-- |
| **address-acquisition-mode** (*dhcp-only \| dhcp-with-fallback \| static*; 默认值：**dhcp-with-fallback**) | 更改地址获取方法：dhcp-only - 仅使用 DHCP 客户端获取地址  dhcp-with-fallback - 在前 10 秒内，它将尝试使用 DHCP 客户端获取地址。如果请求不成功，则地址回退到由 static-ip-address 属性定义的静态地址  static - 地址按 static-ip-address 属性定义设置 |
| **allow-from** (*IP/Mask*; 默认值：**0.0.0.0/0**) | 可访问交换机的 IP 地址或网络。默认情况下，交换机可由任何 IP 地址访问。 |
| **allow-from-ports** (*name*; 默认值：) | 可访问设备的交换机端口列表。默认情况下，允许所有端口访问交换机 |
| **allow-from-vlan** (*integer: 0..4094*; 默认值：**0**) | 可访问设备的 VLAN ID。默认情况下，允许所有 VLAN |
| **identity** (*name*; 默认值：**Mikrotik**) | 交换机名称（用于 Mikrotik 邻居发现协议） |
| **static-ip-address** (*IP*; 默认值：**192.168.88.1**) | 当 address-acquisition-mode 设置为 dhcp-with-fallback 或 static 时交换机的 IP 地址。通过设置静态 IP 地址，地址获取过程不会改变，默认仍为带回退的 DHCP。这意味着配置的静态 IP 地址仅在同一个广播域中没有 DHCP 服务器时才会生效 |

## 另请参阅 {#see-also}

[基本 VLAN 交换](./user-guides/basic-vlan-switching.md)

[网桥硬件卸载](./index.md#bridge-hardware-offloading)

[L3HW 路由硬件卸载](./l3-hardware-offloading.md)

[服务质量](./quality-of-service.md)

[生成树协议](./user-guides/spanning-tree-protocol.md)

[RouterBOARD 上的 MTU](../hardware/mtu-in-routeros.md)

[二层错误配置](./user-guides/layer2-misconfiguration.md)

[网桥 VLAN 表](./user-guides/bridge-vlan-table.md)

[网桥 IGMP/MLD snooping](./user-guides/bridge-igmp-mld-snooping.md)

[多机箱链路聚合组](../high-availability-solutions/multi-chassis-link-aggregation-group.md)
