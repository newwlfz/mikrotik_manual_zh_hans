---
title: "交换芯片功能"
description: "本页介绍 MikroTik RouterOS 交换芯片功能，详细说明各型号支持的 Port Switching 和 Mirroring 等功能，以及带宽控制和 VLAN 配置方面的限制。"
tags:
  - 'switch-chip'
  - 'port-mirroring'
  - 'vlan'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/switch-chip-features
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

---

Routerboard 上有多种类型的交换芯片，它们支持不同的功能集。

:::info
Cloud Router Switch（CRS）系列设备内置高度先进的交换芯片，支持多种功能。对于搭载 Marvell Prestera 交换芯片的 MikroTik 设备（例如 CRS3xx），请参阅 [Marvell Prestera switch chip features](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册。有关 CRS1xx/CRS2xx 系列设备交换芯片功能的更多详情，请查看 [CRS1xx/CRS2xx series switches](/docs/bridging-and-switching/crs1xx-and-2xx-series-switches) 手册。
:::

| 交换芯片 | 端口交换 | 端口镜像 | TX 限制¹ | RX 限制¹ | 主机表 | VLAN 表² | 规则表 |
| :-- | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 88E6393X | ✓ | ✓ | ✓ | ✓ | 最多 16K | 最多 4K | 最多 256 条规则 |
| 88E6191X, 88E6190 | ✓ | ✓ | ✓ | ✓ | 最多 16K | 最多 4K | ✗ |
| MT7621, MT7531, RTL8367 | ✓ | ✓ | ✓ | ✓ | 最多 2K | 最多 4K | ✗ |
| EN7523 | ✓ | ✓ | ✓ | ✓ | 最多 1K | 最多 4K | ✗ |
| QCA8337, Atheros8327 | ✓ | ✓ | ✓ | ✓ | 最多 2K | 最多 4K | 最多 92 条规则 |
| Atheros8316 | ✓ | ✓ | ✓ | ✗ | 最多 2K | 最多 4K | 最多 32 条规则 |
| Atheros8227 | ✓ | ✓ | ✓ | ✗ | 最多 1K | 最多 4K | ✗ |
| Atheros7240 | ✓ | ✓ | ✓ | ✗ | 最多 2K | 16 | ✗ |
| ICPlus175D | ✓ | ✓ | ✗ | ✗ | 最多 2K | ✗ | ✗ |
| IPQ-PPE | ✓ | ✗ | ✗ | ✗ | 最多 2K | ✗ | ✗ |
| PIPE 98PX1012, QCA8386 | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

1. 对于 RTL8367、88E6393X、88E6191X、88E6190、MT7621、MT7531 和 EN7523，可通过 `/interface/ethernet/switch/port` 菜单中的 `egress-rate` 和 `ingress-rate` 属性修改 Tx/Rx 速率限制。对于 QCA8337、Atheros8327、Atheros8316、Atheros8227 和 Atheros7240，可通过 `/interface/ethernet` 菜单中的 `bandwidth` 属性修改 Tx/Rx 速率限制，详情请参阅 [Ethernet manual](/docs/wired-connections/ethernet)。
2. 对于 88E6393X、88E6191X、88E6190、MT7621、MT7531、EN7523、RTL8367 交换芯片，VLAN 表通过 `/interface/bridge` 菜单中的 [bridge HW vlan-filtering](/docs/bridging-and-switching/switch-chip-features#bridge-vlan-filtering) 配置。对于其他支持 VLAN 表的交换机，请参阅 [VLAN Table](/docs/bridging-and-switching/switch-chip-features#vlan-table)，并使用 `/interface/ethernet/switch/vlan` 菜单配置 VLAN 表。

| RouterBoard | 交换芯片说明 |
| :-- | :-- |
| **MA53UG+HbeH (hAP be³ Media)** | QCA8386（ether2-ether5） |
| **C52iG-5HaxD2HaxD-TC (hAP ax²), C53UiG+5HPaxD2HPaxD (hAP ax³), Chateau ax series** | IPQ-PPE（ether1-ether5） |
| **cAPGi-5HaxD2HaxD (cAP ax)** | IPQ-PPE（ether1-ether2） |
| **L009 series** | 88E6190（ether2-ether8，sfp1） |
| **RB5009 series** | 88E6393X（ether1-ether8，sfp-sfpplus1） |
| **CCR2004-16G-2S+** | 88E6191X（ether1-ether8）；88E6191X（ether9-ether16）； |
| **RB4011iGS+** | RTL8367（ether1-ether5）；RTL8367（ether6-ether10）； |
| **RB1100AHx4** | RTL8367（ether1-ether5）；RTL8367（ether6-ether10）；RTL8367（ether11-ether13） |
| **L41G-2axD (hAP ax lite)** | MT7531（ether1-ether4） |
| **RB750Gr3 (hEX), RB760iGS (hEX S)** | MT7621（ether1-ether5） |
| **E50UG (hEX Refresh)** | EN7523（ether2-ether5） |
| **RBM33G** | MT7621（ether1-ether3） |
| **RB3011 series** | QCA8337（ether1-ether5）；QCA8337（ether6-ether10） |
| **RB OmniTik ac series** | QCA8337（ether1-ether5） |
| **RBwsAP-5Hac2nD (wsAP ac lite)** | Atheros8227（ether1-ether3） |
| **RB941-2nD (hAP lite)** | Atheros8227（ether1-ether4） |
| **RB951Ui-2nD (hAP); RB952Ui-5ac2nD (hAP ac lite); RB750r2 (hEX lite); RB750UPr2 (hEX PoE lite); RB750P-PBr2 (PowerBox); RB750P r2; RBOmniTikU-5HnDr2 (OmniTIK 5); RBOmniTikUPA-5HnDr2 (OmniTIK 5 PoE)** | Atheros8227（ether1-ether5） |
| **RB750Gr2 (hEX); RB962UiGS-5HacT2HnT (hAP ac); RB960PGS (hEX PoE); RB960PGS-PB (PowerBox Pro)** | QCA8337（ether1-ether5） |
| **RB953GS** | Atheros8327（ether1-ether3+sfp1） |
| **RB850Gx2** | Atheros8327（ether1-ether5），ether1 可选 |
| **RB2011 series** | Atheros8327（ether1-ether5+sfp1）；Atheros8227（ether6-ether10） |
| **RB750GL; RB751G-2HnD; RB951G-2HnD; RBD52G-5HacD2HnD (hAP ac²), RBD53iG-5HacD2HnD (hAP ac³), RBD53GR-5HacD2HnD&R11e-LTE6 (hAP ac³ LTE6 kit), RBD53G-5HacD2HnD-TC&EG12-EA (Chateau LTE12)** | Atheros8327（ether1-ether5） |
| **RBcAPGi-5acD2nD (cAP ac), RBwAPGR-5HacD2HnD (wAP R ac and wAP ac LTE series), RBwAPG-5HacD2HnD (wAP ac), RBD25G-5HPacQD2HPnD (Audience), RBD25GR-5HPacQD2HPnD&R11e-LTE6 (Audience LTE6 kit),** | Atheros8327（ether1-ether2） |
| **RBD22UGS-5HPacD2HnD (mANTBox 52 15s)** | Atheros8327（ether1-sfp1） |
| **RB1100AH** | Atheros8327（ether1-ether5）；Atheros8327（ether6-ether10） |
| **RB1100AHx2** | Atheros8327（ether1-ether5）；Atheros8327（ether6-ether10） |
| **CCR1009-8G-1S-1S+; CCR1009-8G-1S** | Atheros8327（ether1-ether4） |
| **RB493G** | Atheros8316（ether1+ether6-ether9）；Atheros8316（ether2-ether5） |
| **RB435G** | Atheros8316（ether1-ether3），ether1 可选 |
| **RB450G** | Atheros8316（ether1-ether5），ether1 可选 |
| **RB450Gx4** | Atheros8327（ether1-ether5） |
| **RB433GL** | Atheros8327（ether1-ether3） |
| **RB750G** | Atheros8316（ether1-ether5） |
| **RB1200** | Atheros8316（ether1-ether5） |
| **RB1100** | Atheros8316（ether1-ether5）；Atheros8316（ether6-ether10） |
| **DISC Lite5** | Atheros8227（ether1） |
| **RBmAP2nD** | Atheros8227（ether1-ether2） |
| **RBmAP2n** | Atheros7240（ether1-ether2） |
| **RB750** | Atheros7240（ether2-ether5） |
| **RB750UP** | Atheros7240（ether2-ether5） |
| **RB751U-2HnD** | Atheros7240（ether2-ether5） |
| **RB951-2n** | Atheros7240（ether2-ether5） |
| **RB951Ui-2HnD** | Atheros8227（ether1-ether5） |
| **RB433 series** | ICPlus175D（ether2-ether3）；旧型号使用 ICPlus175C |
| **RB450** | ICPlus175D（ether2-ether5）；旧型号使用 ICPlus175C |
| **RB493 series** | ICPlus178C（ether2-ether9） |
| **RB816** | ICPlus178C（ether1-ether16） |

命令行配置位于 switch 菜单下。该菜单包含系统中所有交换芯片的列表以及一些子菜单。

```ros
[admin@MikroTik] > /interface/ethernet/switch/print 
Flags: I - invalid 
 #   NAME         TYPE             MIRROR-SOURCE       MIRROR-TARGET       SWITCH-ALL-PORTS
 0   switch1      Atheros-8327     none                none               
 1   switch2      Atheros-8227     none                none               
```

根据交换机类型，可用的配置能力可能不同。

## 功能 {#features}

---

### 端口交换 {#port-switching}

要在非 CRS 系列设备上设置端口交换，请查看 [Bridge Hardware Offloading](/docs/bridging-and-switching/switch-chip-features#bridge-hardware-offloading) 页面。

:::warning
RouterOS v6.41 及更新版本中的端口交换通过 bridge 配置完成。RouterOS v6.41 之前，端口交换通过 master-port 属性完成。
:::

#### 交换所有端口功能 {#switch-all-ports-feature}

RB450G/RB435G/RB850Gx2 设备上的 Ether1 端口具有一项功能，可将其从默认交换组中移除或添加到默认交换组。该设置位于 `/interface/ethernet/switch` 菜单中。默认情况下，ether1 端口将包含在交换组中。

![Switch 4](/img/913fb84cea71ea81.webp)

| 属性 | 说明 |
| :-- | :-- |
| **switch-all-ports**（no*\| yes*；默认：**yes**） | 仅更改 RB450G/RB435G/RB850Gx2 设备上的 ether1 交换组。 <br/><ul><li><code>yes</code> - ether1 属于交换机的一部分，支持交换分组以及 Atheros8316/Atheros8327 的所有其他高级功能，包括扩展统计信息（<code><code>/interface/ethernet/print</code> stats</code>）。</li><li><code>no</code> - ether1 不属于交换机的一部分，实际上使其成为独立的以太网端口，从而提高其在桥接和路由模式下与其他端口的吞吐量，但会移除该端口的交换能力。</li></ul> |

### 端口镜像 {#port-mirroring}

端口镜像可让交换机复制某个端口（`mirror-source`）的所有入站和出站流量，并将这些复制的帧发送到其他端口（`mirror-target`）。该功能可用于轻松设置一个“tap”设备，使其接收某个特定端口的所有入站和出站流量。请注意，`mirror-source` 和 `mirror-target` 端口必须属于同一交换机（可在 `/interface/ethernet` 菜单中查看哪个端口属于哪个交换机）。此外，mirror-target 可以使用特殊的 `cpu` 值，表示镜像数据包应发送到交换芯片的 CPU 端口。端口镜像独立于已设置或未设置的交换组运行。

**子菜单：** `/interface/ethernet/switch`

| 属性 | 说明 |
| :-- | :-- |
| **mirror-source** (*name \| none*；默认：**none**) | 选择单个镜像源端口。入站和出站流量将发送到 `mirror-target` 端口。请注意，`mirror-target` 端口必须属于同一交换机（可在 `/interface/ethernet` 菜单中查看哪个端口属于哪个交换机）。 |
| **mirror-target** (*name \| none \| cpu*；默认：**none**) | 选择单个镜像目标端口。来自 `mirror-source` 和 `mirror` 的镜像数据包（请参阅规则和主机表中的属性）将发送到所选端口。 |
| **mirror-egress-target** (*name \| none*；默认：**none**) | 选择单个镜像出站目标端口，仅适用于 **88E6393X**、**88E6191X** 和 **88E6190** 交换芯片。来自 `mirror-egress` 的镜像数据包（请参阅端口菜单中的属性）将发送到所选端口。 |

**子菜单：** `/interface/ethernet/switch/rule`

| 属性 | 说明 |
| :-- | :-- |
| **mirror** (*no \| yes*；默认：**no**) | 是否将数据包副本发送到 `mirror-target` 端口。 |
| **mirror-ports** (*name*；默认：) | 选择多个镜像目标端口，仅适用于 **88E6393X** 交换芯片。ACL 规则中匹配的数据包将被复制并发送到所选端口。 |

**子菜单：** `/interface/ethernet/switch/host`

| 属性 | 说明 |
| :-- | :-- |
| **mirror** (*no \| yes*；默认：**no**) | 是否将具有匹配 MAC 目的地址的帧的副本发送到 `mirror-target` 端口（CRS3xx 系列交换机匹配目的地址或源地址） |

**子菜单：** `/interface/ethernet/switch/port`

| 属性 | 说明 |
| :-- | :-- |
| **mirror-egress** (*no \| yes*；默认：**no**) | 是否将出站数据包副本发送到 `mirror-egress-target` 端口，仅适用于 **88E6393X**、**88E6191X** 和 **88E6190** 交换芯片。 |
| **mirror-ingress** (*no \| yes*；默认：**no**) | 是否将入站数据包副本发送到 `mirror-ingress-target` 端口，仅适用于 **88E6393X**、**88E6191X** 和 **88E6190** 交换芯片。 |
| **mirror-ingress-target** (*name \| none*；默认：**none**) | 选择单个镜像入站目标端口，仅适用于 **88E6393X**、**88E6191X** 和 **88E6190** 交换芯片。来自 `mirror-ingress` 的镜像数据包将发送到所选端口。 |

端口镜像配置示例：

```ros
/interface/ethernet/switch
set switch1 mirror-source=ether2 mirror-target=ether3
```

:::danger
如果将 mirror-source 设置为具有至少两个交换芯片的设备的以太网端口，并且这些 mirror-source 端口位于同一个网桥中，同时两个交换芯片的 mirror-target 都设置为将数据包发送到 CPU，则会产生环路，可能导致设备无法访问。
:::

### 端口设置 {#port-settings}

此菜单下的属性用于为支持 VLAN Table 的交换芯片配置 VLAN 交换和过滤选项。这些属性仅对支持 VLAN Table 的交换芯片可用。请查看 [Switch Chip Features](/docs/bridging-and-switching/switch-chip-features) 表，确认设备支持该功能。

:::danger
Ingress 流量被视为发送到某个端口 **IN** 的流量；该端口有时称为 **ingress port**。Egress 流量被视为从某个端口 **OUT** 发出的流量；该端口有时称为 **egress port**。正确设置 VLAN 过滤时，区分二者非常重要，因为某些属性仅适用于 ingress 或 egress 流量。
:::

| 属性 | 说明 |
| :-- | :-- |
| **vlan-mode** (*check \| disabled \| fallback \| secure*；默认值：**disabled**) | 针对 ingress 流量，更改依据 <a href="/docs/bridging-and-switching/switch-chip-features#vlan-table">VLAN Table</a> 进行的 VLAN 查找机制。<ul><li><code>disabled</code> - 完全禁用针对 ingress 流量检查 VLAN Table。在 ingress 端口上设置时，不会丢弃任何流量。</li><li><code>fallback</code> - 针对 ingress 流量，依据 VLAN Table 检查带标签流量，并转发所有未带标签流量。如果 ingress 流量带标签，且在 VLAN Table 中找不到对应 VLAN ID 的 egress 端口，则丢弃流量。如果在 VLAN Table 中找不到 VLAN ID，则转发流量。用于仅允许已知 VLAN 通过特定端口。</li><li><code>check</code> - 针对 ingress 流量，依据 VLAN Table 检查带标签流量，并丢弃所有未带标签流量。如果 ingress 流量带标签，且在 VLAN Table 中找不到对应 VLAN ID 的 egress 端口，则丢弃流量。</li><li><code>secure</code> - 针对 ingress 流量，依据 VLAN Table 检查带标签流量，并丢弃所有未带标签流量。对于相应的 VLAN ID，ingress 端口和 egress 端口都必须在 VLAN Table 中找到，否则丢弃流量。</li></ul> |
| **vlan-header** (*add-if-missing \| always-strip \| leave-as-is*；默认值：**leave-as-is**) | 设置端口对 egress 流量执行的操作。<ul><li><code>add-if-missing</code> - 在 egress 流量上添加 VLAN 标签，并使用 ingress 端口的 default-vlan-id。应用于 trunk 端口。</li><li><code>always-strip</code> - 移除 egress 流量上的 VLAN 标签。应用于 access 端口。</li><li><code>leave-as-is</code> - 不在 egress 流量上添加或移除 VLAN 标签。应用于 hybrid 端口。</li></ul> |
| **default-vlan-id** (*auto \| integer: 0..4095*；默认值：**auto**) | 在端口上所有未带标签的 ingress 流量中添加具有指定 VLAN ID 的 VLAN 标签。应将该属性与端口上的 vlan-header=`always-strip` 配合使用，以将端口配置为 access 端口。对于 hybrid 端口，default-vlan-id 用于为未带标签流量添加标签。如果两个端口具有相同的 default-vlan-id，则不会添加 VLAN 标签，因为交换芯片会认为流量是在 access 端口之间转发。 |

:::warning
在 **QCA8337** 和 **Atheros8327** 交换芯片上，应使用默认属性 `vlan-header=leave-as-is`。交换芯片将通过 `default-vlan-id` 属性确定哪些端口是 access 端口。`default-vlan-id` 仅应在 access/hybrid 端口上使用，以指定未带标签 ingress 流量被分配到哪个 VLAN。
:::

### VLAN 表 {#vlan-table}

VLAN 表为带有特定 802.1Q 标签的数据包指定某些转发规则。这些规则的优先级高于使用 [Bridge Hardware Offloading](/docs/bridging-and-switching/switch-chip-features#bridge-hardware-offloading) 功能配置的交换组。基本上，该表包含将特定 VLAN 标签 ID 映射到一组一个或多个端口的条目。带有 VLAN 标签的数据包通过对应表条目中设置的一个或多个端口离开交换芯片。控制带有 VLAN 标签的数据包如何处理的具体逻辑由 `vlan-mode` 参数控制，该参数可按交换端口更改。

基于 VLAN ID 的转发会考虑在主机表中动态学习或手动添加的 MAC 地址。QCA8337 和 Atheros8327 交换芯片还支持 Independent VLAN Learning（IVL），它基于 MAC 地址和 VLAN ID 进行学习，因此允许同一 MAC 用于多个 VLAN。

没有 VLAN 标签的数据包会被视为带有端口 `default-vlan-id` 的 VLAN 标签。如果配置了 `vlan-mode=check` 或 `vlan=mode=secure`，要转发没有 VLAN 标签的数据包，必须根据 `default-vlan-id` 在 VLAN 表中添加具有相同 VLAN ID 的条目。

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*no \| yes*；默认值：**no**) | 启用或禁用交换 VLAN 条目。 |
| **independent-learning** (no*\| yes*；默认值：**yes**) | 使用 shared-VLAN-learning（SVL）还是 independent-VLAN-learning（IVL）。 |
| **ports** (*name*；默认值：**none**) | 相应 VLAN 的接口成员列表。该设置接受以逗号分隔的值。例如 `ports=ether1,ether2`。 |
| **switch** (*name*；默认值：**none**) | 相应 VLAN 条目所属的交换机名称。 |
| **vlan-id** (*integer: 0..4095*；默认值：) | 某些交换端口配置的 VLAN ID。 |

:::warning
带有 **MT7621**、**MT7531**、**EN7523, RTL8367**、**88E6393X**、**88E6191X**、**88E6190** 交换芯片的设备在 RouterOS v7 中支持 [HW offloaded vlan-filtering](/docs/bridging-and-switching/switch-chip-features#bridge-vlan-filtering)。`/interface/ethernet/switch` 菜单中的 VLAN 相关配置不可用。
:::

#### VLAN 转发 {#vlan-forwarding}

`vlan-mode` 和 `vlan-header` 以及 VLAN 表均可用于配置 VLAN 标记、去除标记和过滤。可以进行多种组合，每种组合都会产生不同的结果。下表列出了在每种 VLAN Mode 下，当入口端口收到特定流量时，将通过出口端口发送哪类流量。

**NOTES:**

- **L** - `vlan-header` 设置为 `leave-as-is`
- **S** - `vlan-header` 设置为 `always-strip`
- **A** - `vlan-header` 设置为 `add-if-missing`
- **U** - 发送未标记流量
- **T** - 发送带标签流量，入口端口上已存在标签
- **TA** - 发送带标签流量，标签是在入口端口添加的
- **DI** - 由于 vlan-mode 中选择的模式，流量在入口端口被丢弃
- **DE** - 由于在 VLAN 表中未找到出口端口，流量在出口端口被丢弃
- **VID match** - 入口流量的 VLAN 标签中的 VLAN ID 存在于 VLAN 表中
- **Port match** - 入口端口存在于 VLAN 表中对应 VLAN ID 的条目中

|  |  |  |  |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| *VLAN Mode = disabled* | Egress 端口不在 VLAN Table 中 |  |  | Egress 端口在 VLAN Table 中 |  |  |
|  | L | S | A | L | S | A |
| 未标记流量 | U | U | TA | U | U | TA |
| 带标记流量；无 VID 匹配 | T | U | T |  |  |  |
| 带标记流量；VID 匹配；无 Port 匹配 | T | U | T | T | U | T |
| 带标记流量；VID 匹配；Port 匹配 | T | U | T | T | U | T |

|  |  |  |  |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| *VLAN Mode = fallback* | Egress 端口不在 VLAN Table 中 |  |  | Egress 端口在 VLAN Table 中 |  |  |
|  | L | S | A | L | S | A |
| 未标记流量 | U | U | TA | U | U | TA |
| 带标记流量；无 VID 匹配 | T | U | T |  |  |  |
| 带标记流量；VID 匹配；无 Port 匹配 | DE | DE | DE | T | U | T |
| 带标记流量；VID 匹配；Port 匹配 | DE | DE | DE | T | U | T |

|  |  |  |  |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| *VLAN Mode = check* | Egress 端口不在 VLAN Table 中 |  |  | Egress 端口在 VLAN Table 中 |  |  |
|  | L | S | A | L | S | A |
| 未标记流量 |  |  |  |  |  |  |
| 带标记流量；无 VID 匹配 | DI | DI | DI |  |  |  |
| 带标记流量；VID 匹配；无 Port 匹配 | DE | DE | DE | T | U | T |
| 带标记流量；VID 匹配；Port 匹配 | DE | DE | DE | T | U | T |

|  |  |  |  |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| *VLAN Mode = secure* | Egress 端口不在 VLAN Table 中 |  |  | Egress 端口在 VLAN Table 中 |  |  |
|  | L | S | A | L | S | A |
| 未标记流量 |  |  |  |  |  |  |
| 带标记流量；无 VID 匹配 | DI | DI | DI |  |  |  |
| 带标记流量；VID 匹配；无 Port 匹配 | DI | DI | DI | DI | DI | DI |
| 带标记流量；VID 匹配；Port 匹配 | DE | DE | DE | T | U | T |

:::warning
上表适用于更高级的配置，并用于再次确认你对每个 VLAN 相关属性如何处理数据包的理解。
:::

### 主机表 {#host-table}

Host Table 表示交换芯片内部的 MAC 地址到端口映射。它可以包含两类条目：动态条目和静态条目。动态条目会自动添加。这也称为学习过程：当交换芯片从某个端口收到数据包时，它会将该数据包的源 MAC 地址以及收到该数据包的端口添加到 Host Table，因此当收到具有相同目的 MAC 地址的数据包时，它知道应将数据包转发到哪个端口。如果 Host Table 中不存在该目的 MAC 地址（即所谓的未知单播流量），则它会将数据包转发到组中的所有端口。动态条目约 5 分钟后超时。学习仅在配置为交换组一部分的端口上启用，因此如果未设置端口交换，将看不到动态条目。此外，可以添加静态条目；如果已存在具有相同 MAC 地址的动态条目，静态条目将接管该动态条目。由于端口交换是通过启用硬件卸载的网桥配置的，因此在一个表中创建的任何静态条目（bridge host 或 switch host）都会作为动态条目出现在另一个表中。在 switch host table 中添加静态条目可访问由以下参数控制的更多功能：

| Property | Description |
| :-- | :-- |
| **copy-to-cpu** (*no \| yes*; Default: **no**) | 是否将具有匹配 MAC 目的地址的数据帧的副本发送到交换 CPU 端口（对于 CRS3xx 系列交换机，匹配目的地址或源地址） |
| **drop** (*no \| yes*; Default: **no**) | 是否丢弃在某个端口上收到的具有匹配 MAC 源地址的数据帧（对于 CRS3xx 系列交换机，匹配目的地址或源地址） |
| **mac-address** (*MAC;* Default: **00:00:00:00:00:00**) | 主机的 MAC 地址 |
| **mirror** (*no \| yes*; Default: **no**) | 是否将具有匹配 MAC 目的地址的数据帧的副本发送到 `mirror-target` 端口（对于 CRS3xx 系列交换机，匹配目的地址或源地址） |
| **ports** (*name*; Default: **none**) | 接口名称，一个静态 MAC 地址可以映射到多个端口，包括交换 CPU 端口 |
| **redirect-to-cpu** (*no \| yes*; Default: **no**) | 是否将具有匹配 MAC 目的地址的数据帧重定向到交换 CPU 端口（对于 CRS3xx 系列交换机，匹配目的地址或源地址） |
| **share-vlan-learned**(*no \| yes*; Default: **no**) | 静态主机 MAC 地址查找是否使用 shared-VLAN-learning（SVL）或 independent-VLAN-learning（IVL）。对于不支持 IVL 或 IVL 已禁用（independent-learning=no）的 VLAN 条目，使用 SVL 模式 |
| **switch** (*name*; Default: **none**) | 要分配 MAC 地址的交换机名称 |
| **vlan-id** (*integer: 0..4095*; Default:) | 静态添加 MAC 地址条目的 VLAN ID |

:::warning
每个交换芯片可存储的 MAC 地址数量有限，具体主机表大小请参阅 Introduction 表。主机表满后，可采用不同技术应对该情况，例如，交换机可以移除较旧的条目，为较新的 MAC 地址释放空间（用于 QCA-8337 和 Atheros-8327 交换芯片）；另一种选择是直接忽略新的 MAC 地址，仅在超时后移除条目（用于 Atheros8316、Atheros8227、Atheros-7240、ICPlus175D 和 Realtek-RTL8367 交换芯片）；最后一种选择是前两种的组合，仅允许一定数量的条目更新，并保留其他主机部分直到超时（用于 MediaTek-MT7621、MT7531、EN7523 交换芯片）。这些技术无法通过配置更改。
:::

:::warning
对于 Atheros8316、Atheros8227 和 Atheros-7240 交换芯片，当交换组中至少有一个硬件卸载的网桥端口处于活动状态时，switch-cpu 端口将始终参与主机学习过程。这会导致 switch-cpu 端口从非 HW 卸载接口学习 MAC 地址。当一个网桥同时包含 HW 和非 HW 卸载接口时，可能会导致数据包丢失。此外，如果同一交换组中使用重复的 MAC 地址，即使主机位于不同逻辑网络中，也可能出现数据包丢失。建议仅在所有网桥端口均可使用 HW 卸载时使用 HW 卸载；当一个或多个网桥端口无法配置为 HW 卸载时，请在所有交换端口上保持禁用。
:::

:::note
交换芯片 **QCA-8337** 和 **Atheros-8327** 会在创建带有 `forward-reserved-addresses=no` 和 `protocol-mode=stp/rstp` 的硬件卸载网桥时，自动将保留的组播 MAC 地址（01:80:C2:00:00:0x）添加到主机表中。这些 MAC 不应由兼容 802.1Q 的网桥转发，并且对于 R/STP 的正确运行至关重要。由于交换机的主机表条目数量有限，这些 MAC 地址仅分配给 VLAN 1。
:::

:::info
要确保具有这些目标 MAC 地址的数据包得到正确处理：

- 交换端口应设置为默认 VLAN 1（`default-vlan-id=auto` 或 `default-vlan-id=1`）。
- 如果显式配置了 VLAN 1，则必须使用独立 VLAN 学习（`independent-learning=yes`）。
:::

### 规则表 {#rule-table}

Rule table 是一个功能强大的工具，可基于 L2、L3 和 L4 协议头字段条件实现线速数据包过滤、转发和 VLAN 标记。该菜单包含有序的规则列表，类似于 `/ip/firewall/filter`，因此会针对每个数据包检查 ACL 规则，直到找到匹配项。如果多条规则均可匹配，则仅触发第一条规则。没有任何 action 参数的规则是接受数据包的规则。

每条规则包含条件部分和动作部分。动作部分由以下参数控制：

| Property | Description |
| :-- | :-- |
| **copy-to-cpu** (*no \| yes*; Default: **no**) | 是否将数据包副本发送到交换机 CPU 端口 |
| **mirror** (*no \| yes*; Default: **no**) | 是否将数据包副本发送到 `mirror-target` 端口 |
| **new-dst-ports** (*name*; Default: **none**) | 按指定内容更改目标端口，允许多个端口，包括交换机 CPU 端口。空设置将丢弃数据包。未使用该参数时，数据包将被接受 |
| **new-vlan-id** (*integer: 0..4095*) | 将 VLAN ID 更改为指定值；如果原本不存在 VLAN 标记，则添加新的 VLAN 标记（该属性仅适用于 **Atheros8316** 和 **88E6393X** 交换芯片（**注意**：对于 88E6393X 交换芯片，还需要 vlan-filtering=yes）） |
| **new-vlan-priority** (*integer: 0..7*) | 更改 VLAN 优先级字段（priority code point；该属性仅适用于 **Atheros8327**、**QCA8337** 和 **Atheros8316** 交换芯片） |
| **rate** (*integer: 0..4294967295*) | 为匹配流量设置入站流量限制（位/秒），且只能应用于前 32 个规则槽位（该属性仅适用于 **Atheros8327/QCA8337** 交换芯片） |
| **redirect-to-cpu** (*no \| yes*; Default: **no**) | 将匹配数据包的目标端口更改为交换机 CPU |

条件部分由其余参数控制：

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*no \| yes*；默认值：**no**) | 启用或禁用该交换规则 |
| **dscp** (*integer: 0..63*) | 匹配数据包的 DSCP 字段 |
| **dst-address** (*IP address/Mask*) | 匹配目标 IP 地址和掩码 |
| **dst-address6** (*IPv6 address/Mask*) | 匹配目标 IPv6 地址和掩码 |
| **dst-mac-address** (*MAC address/Mask*) | 匹配目标 MAC 地址和掩码 |
| **dst-port** (*integer:* *0..65535*) | 匹配目标协议端口号或端口范围 |
| **flow-label** (*integer:* *0..1048575*) | 匹配 IPv6 流标签 |
| **mac-protocol** (*802.2 \| arp \| capsman \| dot1x \| homeplug-av \| ip \| ipv6 \| ipx \| lacp \| lldp \| loop-protect \| macsec \| mpls-multicast \| mpls-unicast \| mvrp \| packing-compr \| packing-simple \| pppoe \| pppoe-discovery \| rarp \| romon \| service-vlan \| vlan \| or 0..65535 \| or 0x0000-0xffff*) | 匹配由协议名称或编号指定的特定 MAC 协议（如有 VLAN 标签，则跳过 VLAN 标签） |
| **ports** (*name*) | 规则将应用于接收流量的接口名称，可指定多个端口。如果 ports 属性留空，则规则将应用于所有交换机接口 |
| **protocol** (*dccp \| ddp \| egp \| encap \| etherip \| ggp \| gre \| hmp \| icmp \| icmpv6 \| idpr-cmtp \| igmp \| ipencap \| ipip \| ipsec-ah \| ipsec-esp \| ipv6 \| ipv6-frag \| ipv6-nonxt \| ipv6-opts \| ipv6-route \| iso-tp4 \| l2tp \| ospf \| pim \| pup \| rdp \| rspf \| rsvp \| sctp \| st \| tcp \| udp \| udp-lite \| vmtp \| vrrp \| xns-idp \| xtp \| or 0..255*) | 匹配由协议名称或编号指定的特定 IP 协议 |
| **src-address** (*IP address/Mask*) | 匹配源 IP 地址和掩码 |
| **src-address6** (*IPv6 address/Mask*) | 匹配源 IPv6 地址和掩码 |
| **src-mac-address** (*MAC address/Mask*) | 匹配源 MAC 地址和掩码 |
| **src-port** (*0..65535*) | 匹配源协议端口号或端口范围 |
| **switch** (*switch group*) | 匹配规则将应用的交换机组 |
| **traffic-class** (*0..255*) | 匹配 IPv6 流量类别 |
| **vlan-id** (*0..4095*) | 匹配 VLAN ID（该属性仅适用于 Atheros8316、Atheros8327、QCA8337、88E6393X 交换芯片） |
| **vlan-header** (*not-present \| present*) | 匹配 VLAN 头，即 VLAN 头是否存在（该属性仅适用于 Atheros8316、Atheros8327、QCA8337、88E6393X 交换芯片。对于 **88E6393X** 交换芯片，还需要 vlan-filtering=yes） |
| **vlan-priority** (*0..7*) | 匹配 VLAN 优先级（优先级代码点） |

:::warning
同一规则中不能同时存在 IPv4 和 IPv6 特定条件。
:::

:::warning
由于规则表完全在交换芯片硬件中处理，因此可拥有的规则数量存在限制。根据规则中使用的条件数量（MAC 层、IP 层、IPv6、L4 层），Atheros8316 交换芯片的活动规则数可能为 8 到 32 条，Atheros8327/QCA8337 交换芯片可能为 8 到 92 条，88E6393X 交换芯片可能为 42 到 256 条。修改规则集后，始终可以执行 `/interface/ethernet/switch/rule/print`，查看列表末尾是否有规则为“invalid”，这表示这些规则无法放入交换芯片。
:::

### 端口隔离 {#port-isolation}

端口隔离可将网络中的特定部分划分（隔离）。当您需要确保某些设备无法访问其他设备时，这很有用。可通过隔离交换机端口实现。端口隔离仅在同一交换机内的端口之间生效。自 RouterOS v6.43 起，所有交换芯片均支持交换机端口隔离。

| 属性 | 说明 |
| :-- | :-- |
| **forwarding-override** (*interface*；默认值：) | 强制将入站流量转发到指定接口。多个接口可用逗号分隔指定。 |

:::info
(R/M)STP 仅在 PVLAN 配置中正常工作。在存在多个隔离交换机组的配置中，(R/M)STP 将无法正常工作，因为交换机组可能无法正确接收 BPDU，从而无法检测网络环路。
:::

:::warning
`forwarding-override` 属性仅影响入站流量。未指定 `forwarding-override` 的交换端口可以通过所有交换端口发送数据包。
:::

:::warning
支持 VLAN 表的交换芯片（**QCA8337**、**Atheros8327**、**Atheros8316**、**Atheros8227** 和 **Atheros7240**）在交换端口启用 VLAN 查找时（`vlan-mode` 设置为 `fallback`、`check` 或 `secure`）可以覆盖端口隔离配置。如果同一 VLAN 中的端口之间需要额外的端口隔离，可以使用带有 new-dst-ports 属性的交换规则。其他不支持交换规则的设备无法规避此限制。
:::

#### 私有 VLAN {#private-vlan}

在某些场景中，可能需要将所有流量转发到上行端口，同时使所有其他端口彼此隔离。这种配置称为 **Private VLAN** 配置。**Switch** 会将所有以太网帧直接转发到上行端口，使 **Router** 能够过滤不需要的数据包，并限制交换端口后设备之间的访问。

![Port Isolation](/img/ae49133a966da305.webp)

要配置交换端口隔离，需要切换所有所需端口：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add interface=sfp1 bridge=bridge1 hw=yes
add interface=ether1 bridge=bridge1 hw=yes
add interface=ether2 bridge=bridge1 hw=yes
add interface=ether3 bridge=bridge1 hw=yes
```

:::warning
默认情况下，网桥接口的 `protocol-mode` 设置为 `rstp`。对于某些设备，这可能会禁用硬件卸载，因为特定交换芯片不支持该功能。请参阅 [Bridge Hardware Offloading](/docs/bridging-and-switching/switch-chip-features#bridge-hardware-offloading) 部分，了解支持的功能。
:::

为每个需要隔离的交换端口（不包括上行端口）覆盖出站端口：

```ros
/interface/ethernet/switch/port-isolation
set ether1 forwarding-override=sfp1
set ether2 forwarding-override=sfp1
set ether3 forwarding-override=sfp1
```

:::warning
可以为单个交换芯片设置多个上行端口，方法是指定多个接口并用逗号分隔。
:::

#### 隔离的交换机组 {#isolated-switch-groups}

在某些情况下，可能需要将一组设备与其他组隔离。可以使用交换机端口隔离功能实现。当你有多个网络但希望使用单个交换机时，这很有用。通过端口隔离，可以允许某些交换机端口仅与一组交换机端口通信。在本示例中，**ether1-3** 上的设备只能与 **ether1-3** 上的设备通信，而 **ether4-5** 上的设备只能与 **ether4-5** 上的设备通信（**ether1-3** 无法与 **ether4-5** 通信）。

:::warning
端口隔离仅在属于同一交换机的端口之间可用。
:::

![Port Isolation 2](/img/af23c24ae48bc2f6.webp)

要配置隔离的交换机组，必须先切换所有端口：

```ros
/interface/bridge
add name=bridge
/interface/bridge/port
add bridge=bridge1 interface=ether1 hw=yes
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether3 hw=yes
add bridge=bridge1 interface=ether4 hw=yes
add bridge=bridge1 interface=ether5 hw=yes
```

:::warning
默认情况下，网桥接口的 `protocol-mode` 设置为 `rstp`。对于某些设备，这可能会禁用硬件卸载，因为特定交换芯片不支持此功能。请参阅 [Bridge Hardware Offloading](/docs/bridging-and-switching/switch-chip-features#bridge-hardware-offloading) 部分，了解支持的功能。
:::

然后在 `forwarding-override` 属性中指定要放入同一隔离交换机组的所有端口（应用该属性的端口除外）。例如，为 **A** 设备创建隔离交换机组：

```ros
/interface/ethernet/switch/port-isolation
set ether1 forwarding-override=ether2,ether3
set ether2 forwarding-override=ether1,ether3
set ether3 forwarding-override=ether1,ether2
```

为 **B** 设备创建隔离交换机组：

```ros
/interface/ethernet/switch/port-isolation
set ether4 forwarding-override=ether5
set ether5 forwarding-override=ether4
```

### CPU 流控 {#cpu-flow-control}

所有交换芯片都有一个特殊端口，称为 **switchX-cpu**。这是交换芯片的 CPU 端口，用于将数据包从交换芯片转发到 CPU。管理流量和路由功能需要该端口。默认情况下，交换芯片会确保该特殊 CPU 端口不会拥塞，并在链路容量超出时发送 Pause Frames，以确保端口不会过载。该功能称为 **CPU Flow Control**。如果没有该功能，对路由或管理至关重要的可能会被丢弃。

自 RouterOS v6.43 起，可以在使用以下交换芯片的部分设备上禁用 CPU Flow Control 功能：QCA8337、Atheros8227、Atheros8327、Atheros7240、Atheros8316、88E6191X 和 88E6393X。其他交换芯片默认启用该功能，且无法更改。要禁用 CPU Flow Control，请使用以下命令：

```ros
/interface/ethernet/switch/set switch1 cpu-flow-control=no
```

### 统计信息 {#statistics}

部分交换芯片能够报告统计信息，这可用于监控内置交换芯片向 CPU 发送了多少数据包。这些统计信息也可用于监控 CPU Flow Control。以下示例展示了交换芯片的统计信息：

```ros
[admin@MikroTik] > /interface/ethernet/switch/print stats

                      name:      switch1
            driver-rx-byte:  221 369 701
          driver-rx-packet:    1 802 975
            driver-tx-byte:   42 621 969
          driver-tx-packet:      310 485
                  rx-bytes:  414 588 529
                 rx-packet:    2 851 236
              rx-too-short:            0
               rx-too-long:            0
              rx-broadcast:    1 040 309
                  rx-pause:            0
              rx-multicast:      486 321
              rx-fcs-error:            0
            rx-align-error:            0
               rx-fragment:            0
                rx-control:            0
             rx-unknown-op:            0
           rx-length-error:            0
             rx-code-error:            0
          rx-carrier-error:            0
                 rx-jabber:            0
                   rx-drop:            0
                  tx-bytes:   44 071 621
                 tx-packet:      312 597
              tx-too-short:            0
               tx-too-long:        8 397
              tx-broadcast:        2 518
                  tx-pause:        2 112
              tx-multicast:        7 142
    tx-excessive-collision:            0
     tx-multiple-collision:            0
       tx-single-collision:            0
     tx-excessive-deferred:            0
               tx-deferred:            0
         tx-late-collision:            0
        tx-total-collision:            0
                   tx-drop:            0
                 tx-jabber:            0
              tx-fcs-error:            0
                tx-control:        2 112
               tx-fragment:            0
                  tx-rx-64:        6 646
              tx-rx-65-127:    1 509 891
             tx-rx-128-255:    1 458 299
             tx-rx-256-511:      178 975
            tx-rx-512-1023:          953
           tx-rx-1024-1518:          672
            tx-rx-1519-max:            0
```

部分设备具有多个 CPU 核心，这些核心通过独立的数据通道直接连接到内置交换芯片。这些设备可以报告数据包是通过哪条数据通道在交换芯片和 CPU 端口之间转发的。对于此类设备，每行会额外增加一行：第一行表示通过第一条数据通道发送的数据，第二行表示通过第二条数据线发送的数据，依此类推。以下示例展示了具有多条连接 CPU 和内置交换芯片的数据通道的设备的交换芯片统计信息：

```ros
[admin@MikroTik] > /interface/ethernet/switch/print stats
                  name:      switch1
        driver-rx-byte:  226 411 248
                                   0
      driver-rx-packet:    1 854 971
                                   0
        driver-tx-byte:   45 988 067
                                   0
      driver-tx-packet:      345 282
                                   0
              rx-bytes:  233 636 763
                                   0
             rx-packet:    1 855 018
                                   0
          rx-too-short:            0
                                   0
           rx-too-long:            0
                                   0
              rx-pause:            0
                                   0
          rx-fcs-error:            0
                                   0
           rx-overflow:            0
                                   0
              tx-bytes:   47 433 203
                                   0
             tx-packet:      345 282
                                   0
    tx-total-collision:            0
                                   0
```

## 设置示例 {#setup-examples}

---

:::info
使用安全 `vlan-mode` 时，请确保已将所有需要的接口添加到 VLAN 表中。要使同一设备上通过安全 `vlan-mode` 端口实现路由功能正常工作，需要允许这些端口访问 CPU；可以通过将 switchX-cpu 接口本身添加到 VLAN 表中来实现。示例请参阅 [Management port](/docs/bridging-and-switching/switch-chip-features#management-access-configuration) 部分。
:::

:::note
可以同时使用内置交换芯片和 CPU 创建 Switch-Router 配置，使设备同时充当交换机和路由器。配置示例请参阅 [Switch-Router](/docs/bridging-and-switching/switch-chip-features#inter-vlan-routing) 部分。
:::

:::warning
允许访问 CPU 时，即允许从特定端口访问实际路由器/交换机。这并不总是符合需求。当允许从特定 VLAN ID 和端口访问 CPU 时，请确保实施适当的防火墙过滤规则以保护设备。使用防火墙过滤规则仅允许访问特定服务。
:::

:::warning
采用 **MT7621**、**MT7531**、**EN7523, RTL8367**、**88E6393X**、**88E6191X,** **88E6190** 交换芯片的设备在 RouterOS v7 中支持 [HW offloaded vlan-filtering](/docs/bridging-and-switching/switch-chip-features#bridge-vlan-filtering)。`/interface/ethernet/switch` 菜单中的 VLAN 相关配置不可用。
:::

:::warning
要使 VLAN 相关匹配器或 VLAN 相关操作参数在 **88E6393X** 交换芯片上生效，需要在网桥接口上启用 vlan-filtering，并确保这些端口上启用了硬件卸载，否则这些参数不会生效。
:::

### VLAN 示例 1（Trunk 和 Access 端口） {#vlan-example-1-trunk-and-access-ports}

带有 Atheros 交换芯片的 RouterBOARD 可用于 802.1Q Trunking。RouterOS v6 中该功能由 **QCA8337, Atheros8316, Atheros8327, Atheros8227** 和 **Atheros7240** 交换芯片支持。本示例中，**ether3**、**ether4,** 和 **ether5** 接口是 access 端口，**ether2** 是 trunk 端口。各 access 端口的 VLAN ID：ether3 - 200，ether4 - 300，ether5 - 400。

![Access Ports](/img/d235e6fd5caac3d6.webp)

将所需端口交换在一起：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether3 hw=yes
add bridge=bridge1 interface=ether4 hw=yes
add bridge=bridge1 interface=ether5 hw=yes
```

:::warning
默认情况下，网桥接口的 `protocol-mode` 设置为 `rstp`。对于某些设备，这可能会禁用硬件卸载，因为特定交换芯片不支持该功能。请参阅 [Bridge Hardware Offloading](/docs/bridging-and-switching/switch-chip-features#bridge-hardware-offloading) 部分，了解支持的功能。
:::

添加 VLAN 表项，以允许具有特定 VLAN ID 的帧在端口之间传输：

```ros
/interface/ethernet/switch/vlan
add ports=ether2,ether3 switch=switch1 vlan-id=200
add ports=ether2,ether4 switch=switch1 vlan-id=300
add ports=ether2,ether5 switch=switch1 vlan-id=400
```

为每个端口设置 `vlan-mode` 和 `vlan-header` 模式，并为每个 access 端口设置 ingress 的 `default-vlan-id`：

```ros
/interface/ethernet/switch/port
set ether2 vlan-mode=secure vlan-header=add-if-missing
set ether3 vlan-mode=secure vlan-header=always-strip default-vlan-id=200
set ether4 vlan-mode=secure vlan-header=always-strip default-vlan-id=300
set ether5 vlan-mode=secure vlan-header=always-strip default-vlan-id=400
```

- 设置 `vlan-mode=secure` 可确保严格使用 VLAN 表。
- 为 access 端口设置 `vlan-header=always-strip`，可在帧离开交换芯片时移除 VLAN 头。
- 为 trunk 端口设置 `vlan-header=add-if-missing`，可向未标记帧添加 VLAN 头。
- `default-vlan-id` 指定为 access 端口的未标记 ingress 流量添加哪个 VLAN ID。

:::warning
在 **QCA8337** 和 **Atheros8327** 交换芯片上，应使用默认的 `vlan-header=leave-as-is` 属性。交换芯片将通过 `default-vlan-id` 属性确定哪些端口是 access 端口。`default-vlan-id` 仅应在 access/hybrid 端口上使用，以指定未标记 ingress 流量被分配到哪个 VLAN。
:::

### VLAN 示例 2（Trunk 和 Hybrid 端口） {#vlan-example-2-trunk-and-hybrid-ports}

VLAN Hybrid 端口可以同时转发带标记和未标记的流量。此配置仅受部分千兆交换芯片支持（**QCA8337, Atheros8327**）。

![Hybrid Ports](/img/238fa201dac1535f.webp)

将所需端口交换在一起：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether3 hw=yes
add bridge=bridge1 interface=ether4 hw=yes
add bridge=bridge1 interface=ether5 hw=yes
```

:::warning
默认情况下，网桥接口的 `protocol-mode` 设置为 `rstp`。对于某些设备，这可能会禁用硬件卸载，因为特定交换芯片不支持此功能。请参阅 [Bridge Hardware Offloading](/docs/bridging-and-switching/switch-chip-features#bridge-hardware-offloading) 部分，了解支持的功能。
:::

添加 VLAN 表条目，以允许具有特定 VLAN ID 的帧在端口之间传输。

```ros
/interface/ethernet/switch/vlan
add ports=ether2,ether3,ether4,ether5 switch=switch1 vlan-id=200
add ports=ether2,ether3,ether4,ether5 switch=switch1 vlan-id=300
add ports=ether2,ether3,ether4,ether5 switch=switch1 vlan-id=400
```

在 switch port 菜单中，在所有端口上设置 `vlan-mode`，并在计划的 hybrid 端口上设置 `default-vlan-id`：

```ros
/interface/ethernet/switch/port
set ether2 vlan-mode=secure vlan-header=leave-as-is
set ether3 vlan-mode=secure vlan-header=leave-as-is default-vlan-id=200
set ether4 vlan-mode=secure vlan-header=leave-as-is default-vlan-id=300
set ether5 vlan-mode=secure vlan-header=leave-as-is default-vlan-id=400
```

- `vlan-mode=secure` 将确保严格使用 VLAN 表。
- `default-vlan-id` 将定义端口上未标记入站流量的 VLAN。
- 在 QCA8337 和 Atheros8327 芯片中，当使用 `vlan-mode=secure` 时，会忽略 switch port 的 `vlan-header` 选项。VLAN 表项处理所有出站标记/取消标记，并在所有端口上按 `vlan-header=leave-as-is` 工作。这意味着带标记进入的帧在出站时也带标记，只有 `default-vlan-id` 帧在出站端口上未标记。

### 管理访问配置 {#management-access-configuration}

在这些示例中，将展示多种场景的配置示例，但每种场景都要求你已交换端口。下文说明如何交换多个端口：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add interface=ether1 bridge=bridge1 hw=yes
add interface=ether2 bridge=bridge1 hw=yes
```

:::warning
默认情况下，网桥接口的 `protocol-mode` 设置为 `rstp`。对于某些设备，这可能会禁用硬件卸载，因为特定交换芯片不支持该功能。请参阅 [Bridge Hardware Offloading](/docs/bridging-and-switching/switch-chip-features#bridge-hardware-offloading) 部分，了解支持的功能。
:::

在这些示例中，假设 **ether1** 是 trunk 端口，**ether2** 是 access 端口，配置如下：

```ros
/interface/ethernet/switch/port
set ether1 vlan-header=add-if-missing
set ether2 default-vlan-id=100 vlan-header=always-strip
/interface/ethernet/switch/vlan
add ports=ether1,ether2,switch1-cpu switch=switch1 vlan-id=100
```

#### Tagged

要使设备仅可从某个 VLAN 访问，需要在网桥接口上创建新的 VLAN 接口，并为其分配 IP 地址：

```ros
/interface/vlan
add name=MGMT vlan-id=99 interface=bridge1
/ip/address
add address=192.168.99.1/24 interface=MGMT
```

指定允许从哪些接口访问设备：

```ros
/interface/ethernet/switch/vlan
add ports=ether1,switch1-cpu switch=switch1 vlan-id=99
```

:::warning
仅在此 VLAN 表条目中指定 trunk 端口。无法通过 access 端口允许带标签流量访问 CPU，因为 access 端口会使用指定的 `default-vlan-id` 值为所有入站流量添加标签。
:::

配置 VLAN 表后，可以启用 `vlan-mode=secure` 以限制对 CPU 的访问：

```ros
/interface/ethernet/switch/port
set ether1 vlan-header=add-if-missing vlan-mode=secure
set ether2 default-vlan-id=100 vlan-header=always-strip vlan-mode=secure
set switch1-cpu vlan-header=leave-as-is vlan-mode=secure
```

#### Untagged

要使设备可从 access 端口访问，请创建一个 VLAN ID 与 `default-vlan-id` 中设置值相同的 VLAN 接口，例如 VLAN 100，并为其添加 IP 地址：

```ros
/interface/vlan
add name=VLAN100 vlan-id=100 interface=bridge1
/ip/address
add address=192.168.100.1/24 interface=VLAN100
```

指定允许访问 CPU 的 access（untagged）端口：

```ros
/interface/ethernet/switch/vlan
add ports=ether1,ether2,switch1-cpu switch=switch1 vlan-id=100
```

:::danger
通常情况下，access（untagged）端口会与 trunk（tagged）端口配合使用。在以 untagged 方式访问 CPU 时，必须同时指定 access 端口和 trunk 端口。这也会允许从 trunk 端口访问 CPU。这并非总是所需结果，可能需要在 VLAN 过滤之上配置防火墙。
:::

配置 VLAN 表后，可以启用 `vlan-mode=secure` 以限制对 CPU 的访问：

```ros
/interface/ethernet/switch/port
set ether1 vlan-header=add-if-missing vlan-mode=secure
set ether2 default-vlan-id=100 vlan-header=always-strip vlan-mode=secure
set switch1-cpu vlan-header=leave-as-is vlan-mode=secure
```

:::warning
要在配备 **Atheros7240** 交换芯片的设备上使用 untagged 流量设置管理端口，需要为 CPU 端口设置 `vlan-header=add-if-missing`。
:::

#### 从 tagged 端口转换为 untagged {#untagged-from-tagged-port}

可以允许通过 trunk（tagged）端口使用 untagged 流量访问设备。为此，请为网桥接口分配 IP 地址：

```ros
/ip/address
add address=10.0.0.1/24 interface=bridge1
```

指定允许访问 CPU 的端口。对 switch-cpu 和 trunk 端口使用 `default-vlan-id` 中使用的 `vlan-id`，默认设置为 0 或 1。

```ros
/interface/ethernet/switch/vlan
add ports=ether1,switch1-cpu switch=switch1 vlan-id=1
```

配置 VLAN 表后，可以启用 `vlan-mode=secure` 以限制对 CPU 的访问：

```ros
/interface/ethernet/switch/port
set ether1 default-vlan-id=1 vlan-header=add-if-missing vlan-mode=secure
set switch1-cpu default-vlan-id=1 vlan-header=leave-as-is vlan-mode=secure
```

:::warning
此配置示例不适用于使用 **Atheros8316** 和 **Atheros7240** 交换芯片的设备。对于使用 **QCA8337** 和 **Atheros8327** 交换芯片的设备，可以使用任何其他 `default-vlan-id`，只要 switch-cpu 和 trunk 端口上的值保持一致即可。对于使用 **Atheros8227** 交换芯片的设备，只能使用 `default-vlan-id=0`，并且 trunk 端口必须使用 `vlan-header=leave-as-is`。
:::

### VLAN 间路由 {#inter-vlan-routing}

许多 MikroTik 设备内置交换芯片，正确配置后可显著提高整体吞吐量。带交换芯片的设备可以同时用作路由器和交换机。这使你可以使用单台设备，而不是多台设备来构建网络。

![Switch Router](/img/b6d5d8808c9eda44.webp)

要使此类配置正常工作，必须将所有所需端口交换在一起

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether3 hw=yes
```

为每个 VLAN ID 创建一个 VLAN 接口，并为其分配 IP 地址：

```ros
/interface/vlan
add interface=bridge1 name=VLAN10 vlan-id=10
add interface=bridge1 name=VLAN20 vlan-id=20
/ip/address
add address=192.168.10.1/24 interface=VLAN10
add address=192.168.20.1/24 interface=VLAN20
```

为每个 VLAN 设置 DHCP Server：

```ros
/ip/pool
add name=POOL10 ranges=192.168.10.100-192.168.10.200
add name=POOL20 ranges=192.168.20.100-192.168.20.200
/ip/dhcp-server
add address-pool=POOL10 disabled=no interface=VLAN10 name=DHCP10
add address-pool=POOL20 disabled=no interface=VLAN20 name=DHCP20
/ip/dhcp-server/network
add address=192.168.10.0/24 dns-server=8.8.8.8 gateway=192.168.10.1
add address=192.168.20.0/24 dns-server=8.8.8.8 gateway=192.168.20.1
```

在设备上启用 NAT：

```ros
/ip/firewall/nat
add action=masquerade chain=srcnat out-interface=ether1
```

将每个端口添加到 VLAN 表，并允许这些端口访问 CPU，以使 DHCP 和路由正常工作：

```ros
/interface/ethernet/switch/vlan
add independent-learning=yes ports=ether2,switch1-cpu switch=switch1 vlan-id=10
add independent-learning=yes ports=ether3,switch1-cpu switch=switch1 vlan-id=20
```

将每个端口指定为 access 端口，并在每个端口和 switch1-cpu 端口上启用安全 VLAN 模式：

```ros
/interface/ethernet/switch/port
set ether2 default-vlan-id=10 vlan-header=always-strip vlan-mode=secure
set ether3 default-vlan-id=20 vlan-header=always-strip vlan-mode=secure
set switch1-cpu vlan-mode=secure
```

:::warning
在 **QCA8337** 和 **Atheros8327** 交换芯片上，应使用默认的 `vlan-header=leave-as-is` 属性。交换芯片将通过 `default-vlan-id` 属性确定哪些端口是 access 端口。`default-vlan-id` 仅应在 access/hybrid 端口上使用，用于指定未标记 ingress 流量被分配到哪个 VLAN。
:::

如果设备具有交换规则表，则可以在硬件层面限制 VLAN 之间的访问。一旦在 VLAN 接口上添加 IP 地址，就会启用 VLAN 间路由，但可以在硬件层面进行限制，同时保留 DHCP Server 和其他路由器相关服务。为此，请使用这些 ACL 规则。通过这种配置，可以使用 VLAN 实现隔离的端口组。

```ros
/interface/ethernet/switch/rule
add dst-address=192.168.20.0/24 new-dst-ports="" ports=ether2 switch=switch1
add dst-address=192.168.10.0/24 new-dst-ports="" ports=ether3 switch=switch1
```

## 另请参阅 {#see-also}

- [Switch Router](/docs/bridging-and-switching/switch-chip-features#inter-vlan-routing)
- [Basic VLAN Switching](/docs/bridging-and-switching/user-guides/basic-vlan-switching)
- [Bridge Hardware Offloading](/docs/bridging-and-switching/switch-chip-features#bridge-hardware-offloading)
- [Spanning Tree Protocol](/docs/bridging-and-switching/user-guides/spanning-tree-protocol)
- [DHCP Snooping and Option 82](/docs/bridging-and-switching/switch-chip-features#dhcp-snooping-and-dhcp-option-82)
- [MTU on RouterBOARD](/docs/hardware/mtu-in-routeros)
- [Layer2 misconfiguration](/docs/bridging-and-switching/user-guides/layer2-misconfiguration)
