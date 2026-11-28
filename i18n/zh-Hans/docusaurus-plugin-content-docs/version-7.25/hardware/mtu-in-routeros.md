---
title: "RouterOS 中的 MTU"
description: "本页介绍 MikroTik RouterOS 中的最大传输单元（MTU）配置，说明其对网络效率和兼容性的重要性。内容涵盖不同的 MTU 类型，包括 Layer-2/L3 MTU 和完整帧 MTU，并详细说明各种 RouterBoard 型号支持的值。"
tags:
  - 'mtu'
  - 'l2mtu'
source: https://manual.mikrotik.com/docs/7.25/hardware/mtu-in-routeros
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

管理员必须配置最大传输单元（MTU），以确保预期服务和应用程序能够在网络中成功部署。换句话说，管理员负责配置 MTU 值，使数据包大小不超过网络设备的能力。

最初引入 MTU 是因为错误率较高且通信速度较低。对数据流进行分片后，只需重传损坏的分片即可纠正损坏错误，而无需重传整个数据流。此外，在调制解调器等低速连接上，传输较大的分片可能耗时过长，只有使用较小的分片才能实现通信。

如今，错误率已大幅降低，通信速度也显著提高。这使得增大 MTU 值成为可能。增大 MTU 可减少协议开销，并降低 CPU 利用率，这主要是由于中断次数减少。因此，出现了一些非标准帧大小：

- **Giant** 或 **Jumbo** 帧 —— 超过标准（IEEE）以太网 MTU 的帧。
- **Baby Giant** 或 **Baby Jumbo** 帧 —— 略大于标准（IEEE）以太网 MTU 的帧。

现在，以太网接口支持高于标准值的物理 MTU 已很常见，但不能将此视为理所当然。还必须考虑其他网络设备的能力。例如，如果两台具有支持物理 MTU 1526 的以太网接口的路由器板卡通过以太网交换机连接，则该交换机也必须支持转发这些大型以太网帧，应用才能正常运行。

## 最大传输单元 {#maximum-transmission-unit}

|  |  |
| :-- | :-- |
| ![](/img/9536d9b1ecab1e58.webp) | <br/> MikroTik RouterOS 可识别多种 MTU 类型： <br/><ul><li>IP/Layer-3/L3 MTU</li><li>MPLS/Layer-2.5/L2.5 MTU</li><li>MAC/Layer-2/L2 MTU</li><li>完整帧 MTU</li></ul> |

### 完整帧 MTU {#full-frame-mtu}

Full frame MTU 表示由特定接口传输的帧的实际大小。该值不包含帧校验序列（FCS），因为帧到达目的地址后，以太网驱动会立即将其移除。

### MAC/二层/L2 MTU {#maclayer-2l2-mtu}

L2MTU 表示该接口可发送的不含 MAC 头的帧的最大大小。

在 RouterOS 中，可在“/interface”菜单中查看 L2MTU 值。所有 Routerboard 相关以太网接口、VLAN、Bridge、VPLS 和无线接口均添加了 L2MTU 支持。其中部分接口支持配置 L2MTU 值。其他以太网接口只有在芯片组与 Routerboard 以太网相同时，才可能显示 L2MTU。

这使用户能够检查所需配置是否可行。用户可利用额外字节承载 VLAN 和 MPLS 标签，或直接增大接口 MTU 以减少一些不必要的分片。

下表显示 MikroTik RouterBoards 支持的 *max-l2mtu*（在 `/interface/print` 菜单中作为只读选项 "max-l2mtu" 的值提供）：

|  |  |
| :-- | :-- |
| **型号名称** | **MTU 说明** |
| **RB SXT series, RB LHG, RB LDF, PL6411-2nD, PL7411-2nD, RB711 series, wAP R-2nD, RB912R-2nD-LTm (LtAP mini), RB Metal series, RB SXT Lite series, RB Groove series, Cube Lite60, LHG Lite60** | ether1:2028 |
| **RB SXT G series, RB DynaDish, wAP ac, RB QRT series, RB711G series, RB911G, RB912UAG** | ether1:4076 |
| **RB OmniTik series, RB750, RB750UP, RB751U-2HnD, RB951-2n** | ether1:4076; ether2-ether5:2028 |
| **RB OmniTik ac series, RB750GL, RB750Gr2** | ether1-ether5:4074 |
| **RB mAP, RB mAP lite, RB cAP, RB wAP** | ether1-ether2:2028 |
| **RB750r2, RB750P-PBr2, RB750UPr2, RB941-2nD, RB951Ui/RB952Ui series** | ether1-ether5:2028 |
| **RB750Gr3** | ether1-ether5:2026 |
| **RB751G-2HnD, RB951G-2HnD** | ether1-ether5:4074 |
| **RB962UiGS, RB960PGS** | ether1-ether5:4074; sfp1:4076 |
| **RB LHGG series** | ether1:9214 |
| **LHG XL 52 ac** | ether1:9214; sfp1:9214 |
| **RB1100Hx2, RB1100AHx2** | ether1-ether10:9498; ether11:9500; ether12-ether13:9116 |
| **RB4011iGS+ series** | ether1-ether10:9578; sfp-sfpplus1:9982 |
| **CCR1009 series** | ether1-ether4:10224; ether5-ether8:10226; sfp1:10226; sfp-sfpplus1:10226 |
| **CCR1016 series** | ether1-ether12:10226; sfp1-sfp12:10226; sfp-sfpplus1:10226 |
| **CCR1036 series** | ether1-ether12:10226; sfp1-sfp4:10226; sfp-sfpplus1-sfp-sfpplus2:10226 |
| **CCR1072 series** | ether1:9116; sfp-sfpplus1-sfp-sfpplus8:10226 |
| **CCR2004-1G-12S+2XS** | ether1:9586; sfp-sfpplus1-sfp-sfpplus12:9578; sfp28-1 - sfp28-2:9578 |
| **CCR2004-16G-2S+** | ether1-ether16:9582; sfp-sfpplus1-sfp-sfpplus2:9586 |
| **CCR2116-12G-4S+** | ether1-ether12:9570; ether13:9586; sfp-sfpplus1-sfp-sfpplus4:9570 |
| **CCR2216-1G-12XS-2XQ** | ether1:9586; sfp28-1 - sfp28-12:9570; qsfp28-1-1 - qsfp28-2-4:9570 |
| **CRS109-8G-1S** | ether1-ether8:4064; sfp1:4064 |
| **CRS125-24G-1S** | ether1-ether24:4064; sfp1:4064 |
| **CRS112-8G-4S, CRS112-8P-4S** | ether1-ether8:9204; sfp9-sfp12:9204 |
| **CRS106-1C-5S** | sfp1-sfp5:9204; combo1:9204 |
| **CRS210-8G-2S+** | ether1-ether8:9204; sfp-sfpplus1:9204; sfpplus2:9204 |
| **CRS212-1G-10S-1S+** | ether1:9204; sfp1-sfp10:9204; sfpplus1:9204 |
| **CRS226-24G-2S+** | ether1-ether24:9204; sfp-sfpplus1:9204; sfpplus2:9204 |
| **CRS326-24G-2S+, CSS326-24G-2S+** | ether1-ether24:10218; sfp-sfpplus1:10218; sfpplus2:10218 |
| **CRS317-1G-16S+** | ether1:10218; sfp-sfpplus1-sfp-sfpplus16:10218 |
| **CRS328-24P-4S+** | ether1-ether24:10218; sfp-sfpplus1-sfp-sfpplus4:10218 |
| **CRS328-4C-20S-4S+** | combo1-combo4:10218; sfp1-sfp20:10218; sfp-sfpplus1-sfp-sfpplus4:10218 |
| **CRS305-1G-4S+** | ether1:10218; sfp-sfpplus1-sfp-sfpplus4:10218 |
| **CRS304-4XG** | ether1-ether4:10218; ether5:9676 |
| **CRS309-1G-8S+** | ether1:10218; sfp-sfpplus1-sfp-sfpplus8:10218 |
| **netFiber 9/IN (CRS310-1G-5S-4S+)** | sfp1-sfp5:10218; sfp-sfpplus1-sfp-sfpplus4:10218 |
| **CRS310-8G+2S+IN** | ether1-ether8:10218; sfp-sfpplus1-sfp-sfpplus2:10218 |
| **CRS312-4C+8XG** | combo1-combo4:10218; ether1-ether8:10218; ether9:2028 |
| **netPower 15FR (CRS318-1Fi-15Fr-2S)** | ether1-ether16:10218; sfp1-sfp2:10218 |
| **netPower 16P (CRS318-16P-2S+)** | ether1-ether16:10218; sfp-sfpplus1-sfp-sfpplus2:10218 |
| **CRS326-4C+20G+2Q+** | combo1-combo4:10218; ether1-ether20:10218; qsfpplus1-1-qsfpplus2-4:10218; ether21:2028 |
| **CRS326-24S+2Q+** | sfp-sfpplus1-sfp-sfpplus24:10218; qsfpplus1-1-qsfpplus2-4:10218; ether1:2028 |
| **CRS354-48G-4S+2Q+, CRS354-48P-4S+2Q+** | sfp-sfpplus1-sfp-sfpplus4:10218; qsfpplus1-1-qsfpplus2-4:10218; ether1-ether48:10218; ether49:2028 |
| **CRS418-8P-8G-2S+RM** | ether1-ether16:10218; ether17:9018; sfp-sfpplus1-sfp-sfpplus2: 10218 |
| **CRS504-4XQ-IN** | ether1:2028; qsfp28-1-1 - qsfp28-4-4:10218 |
| **CRS510-8XS-2XQ-IN** | ether1:2028; sfp28-1 - sfp28-8:10218; qsfp28-1-1 - qsfp28-2-4:10218 |
| **CRS518-16XS-2XQ** | ether1:2028; sfp28-1 - sfp28-16:10218; qsfp28-1-1 - qsfp28-2-4:10218 |
| **CRS812-8DS-2DQ-2DDQ-RM** | ether1-ether2:9586; qsfp56-1-1 - qsfp56-2-4:9570; qsfp56-dd-1-1 - qsfp56-dd-2-8:9570; sfp56-1 - sfp56-8:9570 |
| **CSS610-8G-2S+, CSS610-8P-2S+** | ether1-ether8:10218; sfp-sfpplus1-sfp-sfpplus2:10218 |
| **D52G-5HacD2HnD (hAP ac²)** | ether1-ether5:9124 |
| **C52iG-5HaxD2HaxD (hAP ax[^2])** | ether1-ether5:9214 |
| **C53UiG+5HPaxD2HPaxD (hAP ax[^3])** | ether1-ether5:9214 |
| **L41G-2axD (hAP ax lite)** | ether1-ether4:2026 |
| **cAP ac** | ether1-ether2:9124 |
| **GPEN21** | ether1-ether2:10222; sfp1: 10222 |
| **wAP60G, LHG60G** | ether1:9124 |
| **RB260GS series, CSS106-5G-1S, CSS106-1G-4P-1S** | ether1-ether5:9198; sfp1:9198 |
| **RBFTC11** | ether1:4046; sfp1:4046 |
| **RBM33G** | ether1-ether3:2026 |
| **RBM11G** | ether1:2026 |
| **RB760iGS** | ether1-ether5:2026; sfp1:2026 |
| **E50UG** | ether1:2048; ether2-ether5:2026 |
| **RB411 series** | ether1:1526 |
| **RB433 series, RB450, RB493 series** | ether1:1526; ether2-ether3:1522 |
| **RB450Gx4** | ether1-ether5:9214 |
| **RB411GL** | ether1:1520 |
| **RB433GL, RB435G, RB450G, RB493G** | ether1-ether3:1520 |
| **RB800** | ether1-ether2:9500; ether3:9116 |
| **RB850Gx2** | ether1-ether5:1580 |
| **RB921UAGS, RB922UAGS** | ether1:4076; sfp1:4076 |
| **D23UGS-5HPacD2HnD (NetMetal ac²)** | ether1:9214; sfp1:9214 |
| **L23UGSR-5HaxD2HaxD (NetMetal ax)** | ether1:8158; sfp1:8158 |
| **RB953GS** | ether1-ether2:4074; sfp1:4074; sfp2:4076 |
| **RB2011 series** | ether1-ether5:4074; ether6-ether10:2028; sfp1:4074 |
| **RB3011 series** | ether1-ether5:8156; ether6-ether10:8156; sfp1:8158 |
| **RB5009 series** | ether1-ether8: 9796; sfp-sfpplus1: 9796 |
| **L009 series** | ether1: 8158; ether2-ether8: 8154; sfp1: 8154 |
| **RB44Ge** | ether1-ether4:9116 |

RouterOS 中的所有无线接口（包括 Nstreme2）均支持 2290 字节 L2MTU。

:::danger
L2MTU 配置更改会触发所有接口重新加载（链路断开/链路恢复），这是必要的内部流程所致。  
建议谨慎配置 L2MTU，并注意它可能导致已连接设备短暂中断。
:::

### MPLS/Layer-2.5/L2.5 MTU

MPLS MTU 在 `/mpls/interface` 菜单中配置，用于指定可通过特定接口发送的最大数据包大小，包括 MPLS 标签。

确保 MPLS MTU 值小于或等于 L2MTU。MPLS MTU 对数据包的影响取决于 MPLS 路由器执行的动作。由于 MPLS MTU 会影响 MPLS 交换的数据包，强烈建议在组成 MPLS 云的所有路由器上配置相同的 MPLS MTU 值。该要求意味着参与 MPLS 云的所有接口都必须配置为参与接口中最小的 MPLS MTU 值；因此，选择要使用的硬件时必须仔细考虑。

### MPLS 交换 {#mpls-switching}

当包含 MPLS 标签的数据包超过配置的 MPLS MTU 时，路由器会尝试确定 MPLS 帧内承载的协议类型：

- **IP packets**：如果封装的数据包是 IP 数据包，MPLS 会生成 ICMP“Need Fragmentation”错误消息。此行为与标准 IP 协议处理方式一致。请注意，该 ICMP 错误不会直接路由回数据包发起方；相反，它会沿标签交换路径（LSP）交换到末端，使出口路由器能够将其路由回源端。

- **非 IP 数据包**：如果封装后的数据包不是 IP 数据包，MPLS 会直接丢弃它，因为路由器无法解析数据包内容。此行为对于 VPLS 等 MPLS 应用尤其重要，在 VPLS 中，通过 MPLS 网络传送的帧不是 IP 数据包，而是封装后的以太网帧。如果 LSP 上任意接口配置的 MPLS MTU 小于入口路由器准备的数据包大小，这些帧将被静默丢弃。

#### IP 入口 {#ip-ingress}

当路由器首次将标签压入 IP 数据包，并且包含 MPLS 标签的结果数据包大小超过 MPLS MTU 时，路由器的行为与接口 MTU 超限相同。它要么将数据包分片为附加标签后不超过 MPLS MTU 的分片（如果未设置 IP Don't Fragment 位），要么生成 ICMP Need Fragmentation 错误并发送回发起方。

#### VPLS 入口 {#vpls-ingress}

当路由器封装以太网帧以通过 VPLS pseudowire 转发时，它会检查数据包大小（包括 VPLS Control Word（4 字节）和所有必要标签（通常为 2 个标签，增加 8 字节））是否超过出接口的 MPLS MTU。如果超过，VPLS 会对数据包进行分片，使其遵守出接口的 MPLS MTU。数据包将在 VPLS pseudowire 的出口点重新组装。

## 设置示例 {#setup-examples}

在这些示例中，将查看通过 Ethernet 接口进入和离开路由器的数据帧。

### 简单路由 {#simple-routing}

图中显示了简单路由的数据包 MTU 大小，数据包大小不会被修改。

![](/img/ef8a175a467f76f2.webp)

### 使用 VLAN 封装的路由 {#routing-with-vlan-encap}

每个 VLAN 标签长 4 字节。VLAN 标签由路由器添加。L2-MTU 增加 4 字节。

![](/img/28a6b9c3bc3236ce.webp)

### 带标签的简单 MPLS {#simple-mpls-with-tags}

当 MPLS 用作 IP 路由的直接替代方案时，每个数据包只附加一个标签，因此数据包大小增加 4 字节。这里有两个 MPLS 标签的情况。为了能够转发标准大小（1500 字节）的 IP 数据包而不进行分片，对于两个 MPLS 标签，MPLS MTU 必须至少设置为 1508。

![](/img/5e9c949dd091d2e4.webp)

### VPLS 隧道 {#vpls-tunnel}

当远端端点未直接连接时，会存在两个 MPLS 标签。一个 MPLS 标签用于到达远端端点；第二个标签用于标识 VPLS 隧道。

![](/img/89d4d59759cf7056.webp)

## 高级设置示例 {#advanced-setup-examples}

在本示例中，将详细了解所有类以太网接口所需的 L2MTU，包括 Bridge、VLAN 和 VPLS 接口。

本设置中包含 3 台路由器：

- Q-in-Q router - 该路由器将接收标准 1500 字节以太网帧，并向数据包添加两个 VLAN 标签。随后通过以太网网络将数据包发送至第二台路由器。

- VPLS router - 该路由器将移除外层 VLAN 标签，并将带有剩余 VLAN 标签的数据包通过 VPLS 隧道进行网桥转发。VPLS 隧道将通过 MPLS 网络把数据包传送至第三台路由器。

- MPLS Edge router - 将移除 VPLS 和 VLAN 标签，并将数据包网桥转发至客户端以太网网络。

![](/img/84458d44b3e328e4.webp)
