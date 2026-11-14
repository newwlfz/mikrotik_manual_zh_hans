---
sidebar_key: "hardware/mtu-in-routeros"
sidebar_position: 5
title: "RouterOS 中的 MTU"
sidebar_label: "RouterOS 中的 MTU"
description: "本页介绍 MikroTik RouterOS 中的最大传输单元 (MTU) 配置，说明其对网络效率和兼容性的重要性。内容涵盖不同的 MTU 类型，包括 Layer-2/L3 MTU 和完整帧 MTU，并详细说明各种 RouterBoard 型号所支持的取值。"
tags:
  - 'mtu'
  - 'l2mtu'
source: https://manual.mikrotik.com/docs/hardware/mtu-in-routeros
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 简介 {#introduction}

管理员必须配置最大传输单元（MTU），以确保预期的服务和应用能够在网络中成功部署。换言之，管理员负责配置 MTU 值，使数据包大小不超过网络设备的能力。

最初，MTU 的引入是由于高误码率和低通信速度。对数据流进行分片，可以只重传损坏的分片而不是整个数据流，从而纠正损坏错误。此外，在调制解调器等低速连接上，传输大分片会耗费过多时间，因此只有使用较小的分片才能进行通信。

如今，误码率已大大降低，通信速度也显著提高。这为增大 MTU 值提供了机会。增大 MTU 可减少协议开销并降低 CPU 利用率，这主要得益于中断次数的减少。因此，出现了一些非标准帧大小：

- **Giant** 或 **Jumbo** 帧 —— 超过标准（IEEE）以太网 MTU 的帧。
- **Baby Giant** 或 **Baby Jumbo** 帧 —— 略微大于标准（IEEE）以太网 MTU 的帧。

如今，以太网接口支持高于标准的物理 MTU 值已很常见，但这不能想当然。还必须考虑其他网络设备的能力。例如，如果两块带以太网接口、支持物理 MTU 1526 的路由器板通过一台以太网交换机连接，那么该交换机也必须支持转发这些大型以太网帧，应用才能正常工作。

## 最大传输单元 {#maximum-transmission-unit}

|  |  |
| :-- | :-- |
| ![](/img/9536d9b1ecab1e58.webp)  |  Mikrotik RouterOS 可识别几种类型的 MTU：IP/Layer-3/L3 MTU、MPLS/Layer-2.5/L2.5 MTU、MAC/Layer-2/L2 MTU、完整帧 MTU |

### 完整帧 MTU {#full-frame-mtu}

完整帧 MTU 表示特定接口所发送帧的实际大小。帧校验和（FCS）不包含在此数值中，因为当帧到达目的地时，以太网驱动会立即将其移除。

### MAC/Layer-2/L2 MTU {#maclayer-2l2-mtu}

L2MTU 表示该接口可以发送的、不含 MAC 头的帧的最大大小。

在 RouterOS 中，可以在 "/interface" 菜单中查看 L2MTU 值。所有与 Routerboard 相关的以太网接口、VLAN、Bridge、VPLS 和无线接口均已添加 L2MTU 支持。其中部分接口支持配置 L2MTU 值。所有其他以太网接口仅在其芯片组与 Routerboard 以太网相同时才会显示 L2MTU。

这样用户就能检查所需的配置是否可行。用户可以利用额外的字节来承载 VLAN 和 MPLS 标签，或者简单地增大接口 MTU 以消除一些不必要的分片。

下表列出了 Mikrotik RouterBoard 支持的 *max-l2mtu*（可在 `/interface/print` 菜单中以只读选项 "max-l2mtu" 的值查看）：

|  |  |
| :-- | :-- |
| **型号名称** | **MTU 说明** |
| **RB SXT 系列, RB LHG, RB LDF, PL6411-2nD, PL7411-2nD, RB711 系列, wAP R-2nD, RB912R-2nD-LTm (LtAP mini), RB Metal 系列, RB SXT Lite 系列, RB Groove 系列, Cube Lite60, LHG Lite60** | ether1:2028 |
| **RB SXT G 系列, RB DynaDish, wAP ac, RB QRT 系列, RB711G 系列, RB911G, RB912UAG** | ether1:4076 |
| **RB OmniTik 系列, RB750, RB750UP, RB751U-2HnD, RB951-2n** | ether1:4076; ether2-ether5:2028 |
| **RB OmniTik ac 系列, RB750GL, RB750Gr2** | ether1-ether5:4074 |
| **RB mAP, RB mAP lite, RB cAP, RB wAP** | ether1-ether2:2028 |
| **RB750r2, RB750P-PBr2, RB750UPr2, RB941-2nD, RB951Ui/RB952Ui 系列** | ether1-ether5:2028 |
| **RB750Gr3** | ether1-ether5:2026 |
| **RB751G-2HnD, RB951G-2HnD** | ether1-ether5:4074 |
| **RB962UiGS, RB960PGS** | ether1-ether5:4074; sfp1:4076 |
| **RB LHGG 系列** | ether1:9214 |
| **LHG XL 52 ac** | ether1:9214; sfp1:9214 |
| **RB1100Hx2, RB1100AHx2** | ether1-ether10:9498; ether11:9500; ether12-ether13:9116 |
| **RB4011iGS+ series** | ether1-ether10:9578; sfp-sfpplus1:9982 |
| **CCR1009 系列** | ether1-ether4:10224; ether5-ether8:10226; sfp1:10226; sfp-sfpplus1:10226 |
| **CCR1016 系列** | ether1-ether12:10226; sfp1-sfp12:10226; sfp-sfpplus1:10226 |
| **CCR1036 系列** | ether1-ether12:10226; sfp1-sfp4:10226; sfp-sfpplus1-sfp-sfpplus2:10226 |
| **CCR1072 系列** | ether1:9116; sfp-sfpplus1-sfp-sfpplus8:10226 |
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
| **RB260GS 系列, CSS106-5G-1S, CSS106-1G-4P-1S** | ether1-ether5:9198; sfp1:9198 |
| **RBFTC11** | ether1:4046; sfp1:4046 |
| **RBM33G** | ether1-ether3:2026 |
| **RBM11G** | ether1:2026 |
| **RB760iGS** | ether1-ether5:2026; sfp1:2026 |
| **E50UG** | ether1:2048; ether2-ether5:2026 |
| **RB411 系列** | ether1:1526 |
| **RB433 系列, RB450, RB493 系列** | ether1:1526; ether2-ether3:1522 |
| **RB450Gx4** | ether1-ether5:9214 |
| **RB411GL** | ether1:1520 |
| **RB433GL, RB435G, RB450G, RB493G** | ether1-ether3:1520 |
| **RB800** | ether1-ether2:9500; ether3:9116 |
| **RB850Gx2** | ether1-ether5:1580 |
| **RB921UAGS, RB922UAGS** | ether1:4076; sfp1:4076 |
| **D23UGS-5HPacD2HnD (NetMetal ac²)** | ether1:9214; sfp1:9214 |
| **L23UGSR-5HaxD2HaxD (NetMetal ax)** | ether1:8158; sfp1:8158 |
| **RB953GS** | ether1-ether2:4074; sfp1:4074; sfp2:4076 |
| **RB2011 系列** | ether1-ether5:4074; ether6-ether10:2028; sfp1:4074 |
| **RB3011 系列** | ether1-ether5:8156; ether6-ether10:8156; sfp1:8158 |
| **RB5009 系列** | ether1-ether8: 9796; sfp-sfpplus1: 9796 |
| **L009 系列** | ether1: 8158; ether2-ether8: 8154; sfp1: 8154 |
| **RB44Ge** | ether1-ether4:9116 |

RouterOS 中的所有无线接口（包括 Nstreme2）都支持 2290 字节的 L2MTU。

:::danger
L2MTU 配置变更会因必要的内部处理过程而触发所有接口重载（link down/link up）。  
建议谨慎配置 L2MTU，并牢记这可能会对所连接的设备造成短暂中断。

:::

### MPLS/Layer-2.5/L2.5 MTU {#mplslayer-25l25-mtu}

MPLS MTU 在 `/mpls/interface` 菜单中配置，用于指定可通过特定接口发送的、包含 MPLS 标签的最大数据包大小。

请确保 MPLS MTU 值小于或等于 L2MTU。根据 MPLS 路由器所执行的操作不同，MPLS MTU 对数据包的影响也不同。由于 MPLS MTU 对 MPLS 交换数据包的影响，强烈建议在组成 MPLS 云的所有路由器上配置相同的 MPLS MTU 值。这一要求意味着，加入 MPLS 云的所有接口都必须配置为参与接口中最小的 MPLS MTU 值；因此，在选择要使用的硬件时必须仔细斟酌。

### MPLS 交换 {#mpls-switching}

当包含 MPLS 标签的数据包超过配置的 MPLS MTU 时，路由器会尝试判断 MPLS 帧内承载的协议类型：

- **IP 数据包**：如果被封装的​数据包是 IP 数据包，MPLS 会生成 ICMP "Need Fragmentation" 错误消息。此行为与标准 IP 协议的处理方式一致。请注意，该 ICMP 错误不会直接路由回数据包发起者；而是沿标签交换路径（LSP）向末端交换，由出口路由器将其路由回源端。

- **非 IP 数据包**：如果被封装的​数据包不是 IP 数据包，MPLS 会直接将其丢弃，因为路由器无法解析数据包内容。此行为对 VPLS 等 MPLS 应用尤为重要，因为穿越 MPLS 网络的帧并非 IP 数据包，而是被封装的以太网帧。如果 LSP 沿途任一接口上配置的 MPLS MTU 小于入口路由器准备的​数据包大小，这些帧将被静默丢弃。

#### IP 入口 {#ip-ingress}

当路由器首次为 IP 数据包压入标签，且包含 MPLS 标签后得到的​数据包大小超过 MPLS MTU 时，路由器的行为就如同超出了接口 MTU。它要么在附加标签后将数据包分片为不超过 MPLS MTU 的分片（如果 IP 的 Don't Fragment 位未置位），要么生成 ICMP Need Fragmentation 错误并发送回发起者。

#### VPLS 入口 {#vpls-ingress}

当路由器封装以太网帧以便通过 VPLS 伪线转发时，它会检查数据包大小（包括 VPLS 控制字（4 字节）以及任何必要的标签（通常为 2 个标签，即增加 8 字节））是否超过出接口的 MPLS MTU。如果超过，VPLS 会对数据包进行分片，使其符合出接口的 MPLS MTU。数据包将在 VPLS 伪线的出口点重新组装。

## 配置示例 {#setup-examples}

在这些示例中，我们将查看通过以太网接口进入和离开路由器的帧。

### 简单路由 {#simple-routing}

该图显示了简单路由情况下的数据包 MTU 大小，数据包大小不会被修改。

![](/img/ef8a175a467f76f2.webp)

### 带 VLAN 封装的路由 {#routing-with-vlan-encap}

每个 VLAN 标签长度为 4 字节。VLAN 标签由路由器添加。L2-MTU 增加 4 字节。

![](/img/28a6b9c3bc3236ce.webp)

### 带标签的简单 MPLS {#simple-mpls-with-tags}

当 MPLS 用作 IP 路由的简单替代方案时，每个数据包只附加一个标签，因此数据包大小增加 4 字节。而我们面对的是有两个 MPLS 标签的情况。为了能够在不分片的情况下转发标准大小（1500 字节）的 IP 数据包，对于两个 MPLS 标签，MPLS MTU 必须至少设置为 1508。

![](/img/5e9c949dd091d2e4.webp)

### VPLS 隧道 {#vpls-tunnel}

当对端未直接连接时，会存在两个 MPLS 标签。一个 MPLS 标签用于到达对端；第二个标签用于标识 VPLS 隧道。

![](/img/89d4d59759cf7056.webp)

## 高级配置示例 {#advanced-setup-examples}

在本示例中，我们将进一步了解所有类以太网接口（包括 Bridge、VLAN 和 VPLS 接口）所需的 L2MTU。

在此配置中，我们将使用 3 台路由器：

- Q-in-Q 路由器 - 该路由器将接收标准的 1500 字节以太网帧，并为数据包添加两个 VLAN 标签。然后，数据包将通过以太网网络发送到第二台路由器。

- VPLS 路由器 - 该路由器将移除外层 VLAN 标签，并将带有剩余 VLAN 标签的数据包与 VPLS 隧道进行桥接。VPLS 隧道将携带数据包穿过 MPLS 网络到达第三台路由器。

- MPLS 边缘路由器 - 将移除 VPLS 和 VLAN 标签，并将数据包桥接到客户端以太网网络。

![](/img/84458d44b3e328e4.webp)
