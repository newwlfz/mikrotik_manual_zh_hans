---
title: "以太网"
description: "MikroTik RouterOS 支持从 10Mbps 到 100Gbps 的多种以太网接口，包括铜缆和光纤选项以及 combo 接口。它支持控制链路速度、双工模式、自动协商和 SFP/QSFP 接口配置，并可通过手动 advertise 设置精确指定链路模式。"
tags:
  - 'ethernet'
  - 'auto-negotiation'
  - 'link-modes'
source: https://manual.mikrotik.com/docs/7.24/wired-connections/ethernet
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "wired-connections"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MikroTik RouterOS 支持多种类型的以太网接口，包括通过铜缆双绞线实现的 10Mbps 至 10Gbps 以太网、1Gbps、10Gbps、25Gbps SFP/SFP+/SFP28 接口，以及 40Gbps、100Gbps、200Gbps、400Gbps QSFP+/QSFP28/QSFP56/QSFP56-DD 接口。某些 RouterBoard 设备配备 combo 接口，同时包含两种接口类型（例如双绞线以太网和 SFP/SFP+ 接口），可选择最合适的选项，或创建物理链路故障切换。通过 RouterOS，可以控制不同的以太网相关属性，例如链路速度、自动协商、双工模式等，监控收发器诊断信息，并查看各种以太网相关统计信息。

:::info
有关 MikroTik SFP 和 QSFP 类型接口及其兼容性的更多信息，请参阅 [有线接口兼容性](/docs/wired-connections/mikrotik-wired-interface-compatibility) 页面。
:::

## 自动协商和强制链路模式 {#auto-negotiation-and-forced-link-mode}

自动协商是通过双绞线电缆连接的以太网设备使用的一种通信方法和一组步骤。它使这些设备能够就关键传输设置达成一致，包括速度、双工模式和流控。在此过程中，连接的设备首先交换有关这些设置的能力信息。随后，它们共同选择双方都能有效支持的最佳传输模式。

但是，在 RouterOS 中，SFP/QSFP 端口上的自动协商行为与标准 RJ45 以太网端口不同。对于 SFP/QSFP 接口，协商过程不涉及已通告能力的交换（不共享通告位）。相反，RouterOS 会尝试使用每侧支持的最高模式建立链路。要成功连接，两台设备必须通告相同的最高公共模式。

## 例如 {#for-example}

- 设备 A 通告 `10G-baseCR` 和 `25G-baseCR`。
- 设备 B 仅通告 `10G-baseCR`。

在这种情况下，链路将无法建立，因为设备 A 优先使用 25G，而设备 B 仅通告 10G。

## 确保链路成功建立 {#to-ensure-a-successful-link}

- Device A 和 Device B 必须具有相同的最大通告模式。  
  因此，如果 Device B 通告 `25G-baseCR`，并且 Device A 也将 `25G-baseCR` 作为其最大通告模式，则会建立链路。

总之，配置 SFP/QSFP 接口时，请确保两端支持的最高模式一致，以保证链路正常建立。

### Advertise

在 RouterOS 7.12 之前，启用自动协商时，接口会尝试猜测另一端接口的最大可用速率（这会使 advertise 设置不适用于 SFP/QSFP 接口）。

在 RouterOS 7.12 之后，你可以手动设置 advertise bits，以指定要使用的链路模式。speed 参数也已修订，以提供更清晰的表示，因为之前的值过于模糊。此外，full-duplex 设置已被移除，因为新的链路模式已包含双工选项（见下表）。

| 链路模式（用于 advertise 和 speed 属性） | 说明 |
| :-- | :-- |
| 10M-baseT-half | 10M 双绞线半双工 |
| 10M-baseT-full | 10M 双绞线全双工 |
| 100M-baseT-half | 100M 双绞线半双工 |
| 100M-baseT-full | 100M 双绞线全双工 |
| 100M-baseFX-full | 100M 光纤 |
| 1G-baseT-half | 1G 双绞线半双工 |
| 1G-baseT-full | 1G 双绞线全双工 |
| 1G-baseX | 1G 光纤 |
| 2.5G-baseT | 2.5G 双绞线全双工 |
| 2.5G-baseX | 2.5G 光纤 |
| 5G-baseT | 5G 双绞线全双工 |
| 10G-baseT | 10G 双绞线全双工 |
| 10G-baseSR-LR | 10G 光纤 |
| 10G-baseCR | 10G 双轴铜缆 |
| 40G-baseSR4-LR4 | 4x10G 光纤 |
| 40G-baseCR4 | 4x10G 双轴铜缆 |
| 25G-baseSR-LR | 25G 光纤 |
| 25G-baseCR | 25G 双轴铜缆 |
| 50G-baseSR2-LR2 | 2x25G 光纤 |
| 50G-baseCR2 | 2x25G 双轴铜缆 |
| 100G-baseSR4-LR4 | 4x25G 光纤 |
| 100G-baseCR4 | 4x25G 双轴铜缆 |
| 50G-baseSR-LR | 50G 光纤 |
| 50G-baseCR | 50G 双轴铜缆 |
| 100G-baseSR2-LR2 | 2x50G 光纤 |
| 100G-baseCR2 | 2x50G 双轴铜缆 |
| 200G-baseSR4-LR4 | 4x50G 光纤 |
| 200G-baseCR4 | 4x50G 双轴铜缆 |
| 400G-baseSR8-LR8 | 8x50G 光纤 |
| 400G-baseCR8 | 8x50G 双轴铜缆 |

:::info
**链路模式命名规则**

**传输速率**：第一个数字后跟 'M' 或 'G'（例如 10M、100M、1G）表示以兆比特每秒或吉比特每秒为单位的数据传输速率。

**接口类型**：“base”后面的符号表示接口类型：

- **T**：表示双绞线布线，后跟双工模式（half 或 full）。
- **SR-LR**：表示“短距”和“长距”光模块，包括 LRM、ER、ZR 等其他变体。这些链路模式应与光模块一起使用。
- **CR**：表示双轴铜缆，用于直连线缆（DAC）。对于 1Gbps DAC，应使用链路模式 1G-baseX。
- **FX:** 表示通过光纤线缆传输的快速以太网。这也包括 LX（长波长标准）。

**线路数量**：

- **SR2-LR2/CR2**：表示两条线路。
- **SR4-LR4/CR4**：表示四条线路。
- **SR8-LR8/CR8:** 表示八条线路。
:::

在手动配置接口的 advertise bits 之前，请先执行 `/interface/ethernet/monitor` 命令并检查“supported”列表，以确定支持哪些 bits。你还可以在“sfp-supported”字段中查看收发器支持的 advertise bits。此外，“advertising”将显示 RouterOS 自动设置的 bits。该列表通过比较接口和收发器上可用的最大链路模式值，并选择匹配项生成。

```ros
[admin@MikroTik] > /interface/ethernet/monitor qsfp28-1-1
                      name: qsfp28-1-1
                 supported: 10M-baseT-half,10M-baseT-full,100M-baseT-half,100M-baseT-full,1G-baseT-half,1G-baseT-full,
                            1G-baseX,2.5G-baseT,2.5G-baseX,5G-baseT,10G-baseT,10G-baseSR-LR,10G-baseCR,40G-baseSR4-LR4,
                            40G-baseCR4,25G-baseSR-LR,25G-baseCR,50G-baseSR2-LR2,50G-baseCR2,100G-baseSR4-LR4,100G-baseCR4
             sfp-supported: 10G-baseSR-LR,25G-baseSR-LR,100G-baseSR4-LR4
               advertising: 10G-baseSR-LR,25G-baseSR-LR,100G-baseSR4-LR4
... 
```

手动设置 advertise 设置的一个应用场景是 QSFP 下的所有子接口。整体配置过程从最上层启用的端口开始。如果所选模式有效且受支持，则会应用该模式。如果该链路模式需要多个通道，则下一个接口的 advertise 和 speed 配置会被忽略，但该接口应保持**启用**。下一个可用的空闲通道或端口会遵循类似过程。

```ros
/interface/ethernet
set [ find default-name=qsfp28-1-1 ] advertise=50G-baseCR2
set [ find default-name=qsfp28-1-3 ] advertise=25G-baseCR
set [ find default-name=qsfp28-1-4 ] advertise=25G-baseCR
```

:::warning
**注意**：多通道接口链路模式（50G-baseCR2、50G-baseSR2-LR2 ）无法为单通道接口（SFP28/SFP56）配置。

IEEE 802.3az Energy Efficient Ethernet（EEE）功能在所有产品中均已禁用。没有手动启用或禁用 EEE 设置的选项。
:::

### 以太网 LED 行为 {#ethernet-led-behavior}

#### 绿色 LED（链路/速率） {#green-led-linkspeed}

- 常亮 – 最大速率

#### 黄色/琥珀色 LED（活动/速率） {#yellowamber-led-activityspeed}

- 常亮 - 链路已建立。  
- 熄灭 – 无链路。  
- 闪烁 – 正在传输数据。

### 强制模式 {#forced-mode}

连接 DAC 线缆或光模块后，日志中可能出现警告消息，例如：

```ros
10:20:47 interface,warning sfp-sfpplus1 module auto-initialization failed, try forced-mode
```

这可能表示所连接的线缆或模块的 EEPROM 校验和损坏或错误，导致自动连接配置失败。该功能在 RouterOS 7.12 中引入，可能会影响过去因错误假定模块或线缆属性而正常工作的链路，这可能导致与链路连接和设备功能相关的各种问题。

在这种情况下，可以尝试手动设置链路模式，这可能有助于建立可用链路。以下是强制端口设置示例：

- 适用于 DAC 线缆以及 1G/10G/25G 连接速率。

```ros
/interface/ethernet
set [ find default-name=sfp-sfpplus1 ] auto-negotiation=no speed=1G-baseX
set [ find default-name=sfp-sfpplus1 ] auto-negotiation=no speed=10G-baseCR
set [ find default-name=sfp-sfpplus1 ] auto-negotiation=no speed=25G-baseCR
```

:::info
注意：选择接口速率设置时，请确认 DAC 线缆支持的速率（检查线缆规格数据）
:::

- 适用于光模块以及 1G/10G/25G 连接速率。

```ros
/interface/ethernet
set [ find default-name=sfp-sfpplus1 ] auto-negotiation=no speed=1G-baseX
set [ find default-name=sfp-sfpplus1 ] auto-negotiation=no speed=10G-baseSR-LR
set [ find default-name=sfp-sfpplus1 ] auto-negotiation=no speed=25G-baseSR-LR
```

:::warning
注意：选择接口速率设置时，请确认光模块支持的速率（检查模块规格数据）

EEPROM 校验和错误的模块不会向 Ethernet 监控输出任何 EEPROM 信息，这也意味着 SFP DDM 监控对此类模块不起作用。
:::

### FEC

FEC（Forward Error Correction）是一种数字信号处理方法，通过在发送端向数据中添加信息（奇偶校验位）来改善 SFP28、QSFP+ 和 QSFP28 链路的误码率。接收端随后使用这些信息检测并纠正传输过程中可能引入的错误。

为确保链路成功建立，链路两端应使用相同的 *fec-mode*。RouterOS 默认使用禁用的 *fec-mode*，但可以将其更改为 *fec74*（也称为 FC-FEC）或 *fec91*（也称为 RS-FEC）。有关 FEC 模式选项的详情，请参阅 [property](/docs/wired-connections/ethernet#properties) 说明。下表列出了链路模式和支持 FEC 模式：

| Link Modes（适用于 advertise 和 speed 属性） | 支持的 FEC 模式 |
| :-- | :-- |
| 40G-baseSR4-LR4 | fec74 |
| 40G-baseCR4 | fec74 |
| 25G-baseSR-LR | fec74, fec91\* |
| 25G-baseCR | fec74, fec91\* |
| 50G-baseSR2-LR2 | fec74, fec91 |
| 50G-baseCR2 | fec74, fec91 |
| 100G-baseSR4-LR4 | fec91 |
| 100G-baseCR4 | fec91 |
| 50G-baseSR-LR | fec91（必需） |
| 50G-baseCR | fec91（必需） |
| 100G-baseSR2-LR2 | fec91（必需） |
| 100G-baseCR2 | fec91（必需） |
| 200G-baseSR4-LR4 | fec91（必需） |
| 200G-baseCR4 | fec91（必需） |
| 400G-baseSR8-LR8 | fec91（必需） |
| 400G-baseCR8 | fec91（必需） |

:::warning
**注意**：CCR2004-1G-2XS-PCIe 设备在 SFP28 接口上不支持 fec91。
:::

## 属性 {#properties}

**子菜单：** `/interface/ethernet`

本节介绍以太网接口配置项。

| 属性 | 说明 |
| :-- | :-- |
| <strong>advertise</strong>（自 RouterOS v7.12 起：<em>10M-baseT-half &#124; 10M-baseT-full&#124; 100M-baseT-half &#124; 100M-baseT-full &#124; 1G-baseT-half &#124; 1G-baseT-full &#124; 1G-baseX &#124; 2.5G-baseT &#124; 2.5G-baseX &#124; 5G-baseT &#124; 10G-baseT &#124; 10G-baseSR-LR &#124; 10G-baseCR &#124; 40G-baseSR4-LR4 &#124; 40G-baseCR4 &#124; 25G-baseSR-LR &#124; 25G-baseCR &#124; 50G-baseSR2-LR2 &#124; 50G-baseCR2 &#124; 100G-baseSR4-LR4 &#124; 100G-baseCR4;</em> 默认：）<br/>（旧版 RouterOS：<em>10M-full &#124; 10M-half &#124; 100M-full &#124; 100M-half &#124; 1000M-full &#124; 1000M-half &#124; 2500M-full &#124; 5000M-full &#124; 10000M-full</em>；默认：） | 通告的链路模式，仅在启用自动协商时生效。通告高于接口实际支持速率的模式可能导致未定义行为。允许多个选项。 |
| **arp**（*disabled \| enabled \| local-proxy-arp \| proxy-arp \| reply-only*；默认：**enabled**） | 地址解析协议模式：<ul><li>disabled - 接口不使用 ARP</li><li>enabled - 接口使用 ARP</li><li>local-proxy-arp - 路由器在接口上执行代理 ARP，并将回复发送到同一接口</li><li>proxy-arp - 路由器在接口上执行代理 ARP，并将回复发送到其他接口</li><li>reply-only - 接口仅回复来自匹配 IP 地址/MAC 地址组合的请求，这些组合必须作为静态条目输入 <a href="/docs/network-management/arp" rel="nofollow">ARP</a> 表。ARP 表中不会自动保存动态条目。因此，要使通信成功，必须已存在有效的静态条目。</li></ul> |
| **arp-timeout**（*auto \| integer*；默认：**auto**） | 在不再从 IP 收到数据包后，ARP 记录在 ARP 表中保留的时间。值 `auto` 等于 IP/Settings 中的 `arp-timeout` 值，默认值为 30s。 |
| **auto-negotiation**（*yes \| no*；默认：**yes**） | 启用后，接口会“通告”其最大能力，以尽可能建立最佳连接。<ul><li><strong>Note1:</strong> 不应只在一端禁用自动协商，否则以太网接口可能无法正常工作。</li><li><strong>Note2:</strong> Gigabit Ethernet 和 NBASE-T Ethernet 链路无法在禁用自动协商时工作。</li></ul> |
| **bandwidth**（*integer/integer*；默认：**unlimited/unlimited**） | 设置接口可处理的最大 rx/tx 带宽，单位为 kbps。所有 Atheros [switch-chip](/docs/bridging-and-switching/switch-chip-features) 端口均支持 TX 限制。仅 Atheros8327/QCA8337 switch-chip 端口支持 RX 限制。 |
| **cable-setting**（*default \| short \| standard*；默认：**default**） | 更改网线长度设置（仅适用于 NS DP83815/6 网卡） |
| **combo-mode**（*auto \| copper \| sfp*；默认：**auto**） | 选择 auto 模式时，最先连接的端口将建立链路。如果该链路失败，另一个端口将尝试建立新链路。重启后，两个端口中的任意一个都可能运行，这取决于哪个端口先成功建立链路。选择 sfp 模式时，接口仅通过 SFP/SFP+ cage 工作。选择 copper 模式时，接口仅通过 RJ45 Ethernet 端口工作。 |
| **comment**（*string*；默认：） | 项目的描述性名称 |
| **disable-running-check**（*yes \| no*；默认：**yes**） | 禁用运行检查。如果该值设置为“no”，路由器会自动检测 NIC 是否连接到网络中的设备。默认值为“yes”，因为较旧的 NIC 不支持该功能。（仅与 CHR 和 x86 相关） |
| **fec-mode**（*auto \| fec74 \| fec91 \| off;*；默认：**auto**） | 更改 SFP28、QSFP+ 和 QSFP28 接口的 Forward Error Correction（FEC）模式。链路两端应使用相同模式，否则 FEC 不匹配可能导致链路无法工作，甚至出现虚假链路建立。 <br/><strong>建议启用 FEC，尤其是在 CRS3xx、CRS5xx 系列交换机之间创建链路时。某些光模块可能依赖 MAC 中的 FEC 功能。</strong><br/><ul><li>auto - 与 off 相同</li><li>fec74 - 启用 IEEE 802.3 clause 74 FEC（也称 FC-FEC），可用于 25Gbps、40Gbps 和 50Gbps 链路模式</li><li>fec91 - 启用 IEEE 802.3 clause 91 FEC（也称 RS-FEC），可用于 25Gbps、50Gbps、100Gbps、200Gbps 和 400Gbps 链路模式</li><li>off - 禁用 FEC。</li></ul> |
| **tx-flow-control**（*on \| off \| auto*；默认：**off**） | 设置为 on 时，端口将向上游设备生成暂停帧，以临时停止数据包传输。仅当路由器的某个输出接口拥塞且无法继续传输数据包时，才会生成暂停帧。**auto** 与 **on** 相同，但当 auto-negotiation=yes 时，流控状态会根据对端通告的内容确定。 |
| **rx-flow-control**（*on \| off \| auto*；默认：**off**） | 设置为 on 时，端口将处理收到的暂停帧，并在需要时暂停传输。**auto** 与 **on** 相同，但当 auto-negotiation=yes 时，流控状态会根据对端通告的内容确定。 |
| **full-duplex**（*yes \| no*；默认：**yes**） | 定义数据传输是否同时在两个方向进行，仅在禁用自动协商时生效。自 RouterOS v7.12 起，该设置已替换为新的链路速率模式。 |
| **l2mtu**（*integer [0..65536]*；默认：） | Layer2 最大传输单元。[详情请参阅](/docs/hardware/mtu-in-routeros)。 |
| **mac-address**（*MAC*；默认：） | 接口的 Media Access Control 编号。 |
| **mdix-enable**（*yes \| no*；默认：**yes**） | 是否为端口启用 MDI/X 自动交叉网线校正功能（取决于硬件，例如 RB500 上的 ether1 可设置为 yes/no。其他硬件固定为“yes”。） |
| **mtu**（*integer [0..65536]*；默认：**1500**） | Layer3 最大传输单元 |
| **name**（*string*；默认：） | 接口名称 |
| **orig-mac-address**（*read-only: MAC*；默认：） | 接口的原始 Media Access Control 编号。 |
| **passthrough-interface**（*interface*；默认：） | 在 CCR2004-1G-2XS-PCIe 设备上将某个接口设置为 passthrough 模式。默认情况下，PCIe 接口会显示为四个虚拟以太网接口。其中两个接口处于 passthrough 模式，连接到 25G SFP28 cage。其余两个虚拟 Ethernet-PCIe 接口与 Gigabit Ethernet 端口桥接，用于管理访问。 |
| **poe-out**（*auto-on \| forced-on \| off*；默认：**off**） | PoE Out 设置。[`详情请参阅`](/docs/hardware/poe-out)。 |
| **poe-priority**（*integer [0..99]*；默认：） | PoE Out 设置。[`详情请参阅`](/docs/hardware/poe-out)。 |
| **sfp-shutdown-temperature**（*integer*；默认：**95** \| **80**） | 当检测到 SFP 模块温度过高时，接口将临时关闭的温度值，单位为摄氏度（v6.48 引入）。SFP/SFP+/SFP28 接口的默认值为 95，QSFP+/QSFP28 接口的默认值为 80（v7.6 引入）。 |
| **sfp-rate-select**（*high \| low*；默认：**high**） | 允许控制 SFP 端口的 rate select 引脚。 |
| <strong>speed</strong>（自 RouterOS v7.12 起：<em>10M-baseT-half &#124; 10M-baseT-full&#124; 100M-baseT-half &#124; 100M-baseT-full &#124; 1G-baseT-half &#124; 1G-baseT-full &#124; 1G-baseX &#124; 2.5G-baseT &#124; 2.5G-baseX &#124; 5G-baseT &#124; 10G-baseT &#124; 10G-baseSR-LR &#124; 10G-baseCR &#124; 40G-baseSR4-LR4 &#124; 40G-baseCR4 &#124; 25G-baseSR-LR &#124; 25G-baseCR &#124; 50G-baseSR2-LR2 &#124; 50G-baseCR2 &#124; 100G-baseSR4-LR4 &#124; 100G-baseCR4;</em> 默认：）<br/>（旧版 RouterOS：<em>10Mbps &#124; 10Gbps &#124; 100Mbps &#124; 1Gbps &#124; 2.5Gbps &#124; 5Gbps &#124; 25Gbps &#124; 40Gbps &#124; 100Gbps</em>；默认：） | 设置接口数据传输速率，仅在禁用自动协商时生效。设置高于接口实际支持速率的速率可能导致未定义行为。仅允许一个选项。 |

**只读属性**

| 属性 | 说明 |
| :-- | :-- |
| **running** (*yes \| no*) | 接口是否正在运行。请注意，某些接口没有运行检查，始终报告为“running”。 |
| **slave** (*yes \| no*) | 接口是否配置为另一个接口的从接口（例如 [Bonding](/docs/high-availability-solutions/bonding) 或 [Bridge](/docs/bridging-and-switching) |
| **switch** (*integer*) | 接口所属交换芯片的 ID。 |

## 菜单专用命令 {#menu-specific-commands}

| Property | Description |
| :-- | :-- |
| **blink** (*[id, name]*) | 闪烁以太网 LED |
| **monitor** (*[id, name]*) | 监控以太网状态。 [Read more](/docs/wired-connections/ethernet#monitor)。 |
| **reset-counters** (*[id, name]*) | 重置统计计数器。 [Read more](/docs/wired-connections/ethernet#stats)。 |
| **reset-mac-address** (*[id, name]*) | 将 MAC 地址重置为制造商默认值。 |
| **cable-test** (*string*) | 显示检测到的线缆线对问题。 [`Read More`](/docs/wired-connections/ethernet#detect-cable-problems)。 |

## Monitor

要打印当前链路速率和其他以太网相关属性，或查看收发器的详细诊断信息，请使用 `/interface/ethernet/monitor` 命令。提供的信息可能因接口类型（例如双绞线以太网或 SFP 接口）或不同收发器（例如 SFP 和 QSFP）而异。

### 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **advertising**（自 RouterOS v7.12 起：*10M-baseT-half \| 10M-baseT-full\| 100M-baseT-half \| 100M-baseT-full \| 1G-baseT-half \| 1G-baseT-full \| 1G-baseX \| 2.5G-baseT \| 2.5G-baseX \| 5G-baseT \| 10G-baseT \| 10G-baseSR-LR \| 10G-baseCR \| 40G-baseSR4-LR4 \| 40G-baseCR4 \| 25G-baseSR-LR \| 25G-baseCR \| 50G-baseSR2-LR2 \| 50G-baseCR2 \| 100G-baseSR4-LR4 \| 100G-baseCR4*）（旧版 RouterOS：*10M-full \| 10M-half \| 100M-full \| 100M-half \| 1000M-full \| 1000M-half \| 2500M-full \| 5000M-full \| 10000M-full*） | 通告的链路模式仅在启用自动协商时生效 |
| **auto-negotiation**（*disabled \| done \| failed \| incomplete*） | 当前自动协商状态：<ul><li>disabled - 协商已禁用</li><li>done - 协商已完成</li><li>failed - 协商失败</li><li>incomplete - 协商尚未完成</li></ul> |
| **default-cable-settings**（*short \| standard*） | 默认线缆长度设置（仅适用于 NS DP83815/6 网卡）<ul><li>short - 支持短线缆</li><li>standard - 支持标准线缆</li></ul> |
| **fec**（*fec74 \| fec91 \| off*） | 当前 FEC 模式。 |
| **full-duplex**（*yes \| no*） | 数据传输是否在两个方向上同时进行 |
| **link-partner-advertising**（自 RouterOS v7.12 起：*10M-baseT-half \| 10M-baseT-full\| 100M-baseT-half \| 100M-baseT-full \| 1G-baseT-half \| 1G-baseT-full \| 1G-baseX \| 2.5G-baseT \| 2.5G-baseX \| 5G-baseT \| 10G-baseT \| 10G-baseSR-LR \| 10G-baseCR \| 40G-baseSR4-LR4 \| 40G-baseCR4 \| 25G-baseSR-LR \| 25G-baseCR \| 50G-baseSR2-LR2 \| 50G-baseCR2 \| 100G-baseSR4-LR4 \| 100G-baseCR4*）（旧版 RouterOS：*10M-full \| 10M-half \| 100M-full \| 100M-half \| 1000M-full \| 1000M-half \| 2500M-full \| 5000M-full \| 10000M-full*） | 链路对端通告的链路模式仅在启用自动协商时生效 |
| **rate**（*10Mbps \| 100Mbps \| 1Gbps \| 2.5Gbps \| 5Gbps \| 10Gbps \| 25Gbps \| 40Gbps \| 50Gbps \| 100Gbps \| 200Gbps \| 400Gbps*） | 连接的实际数据速率。 |
| **status**（*link-ok \| no-link \| unknown*） | 接口的当前链路状态<ul><li>link-ok - 网卡已连接到网络</li><li>no-link - 网卡未连接到网络</li><li>unknown - 无法识别连接状态（网卡未报告连接状态）</li></ul> |
| **tx-flow-control**（*yes \| no*） | 是否使用 TX 流控 |
| **rx-flow-control**（*yes \| no*） | 是否使用 RX 流控 |
| **combo-state**（*copper \| sfp*） | combo 接口使用的 combo 模式 |
| **sfp-module-present**（*yes \| no*） | 光模块笼中是否插入了收发器 |
| **sfp-rx-loss**（*yes \| no*） | 是否丢失接收信号 |
| **sfp-tx-fault**（*yes \| no*） | 收发器发射器是否处于故障状态 |
| **sfp-type**（*SFP/SFP+/SFP28/SFP56 \| DWDM-SFP/SFP+ \| QSFP \| QSFP+ \| QSFP28/QSFP56 \| QSFPDD*） | 使用的收发器类型 |
| **sfp-cmis-revision** *(string)* | 收发器 CMIS 版本号 |
| **sfp-connector-type**（*SC \| LC \| optical-pigtail \| copper-pigtail \| multifiber-parallel-optic-1x12 \| multifiber-parallel-optic-1x16 \| no-separable-connector \| RJ45*） | 使用的收发器连接器类型 |
| **sfp-link-length-9um**（*m*） | 收发器支持的 9/125um 单模光纤链路长度 |
| **sfp-link-length-sm** *(km)* | 收发器支持的单模光纤链路长度 |
| **sfp-link-length-om3**（*m*） | 收发器支持的多模光纤（OM3）链路长度 |
| **sfp-link-length-om4**（*m*） | 收发器支持的多模光纤（OM4）链路长度 |
| **sfp-link-length-om5**（*m*） | 收发器支持的多模光纤（OM5）链路长度 |
| **sfp-link-length-om2**（*m*） | 收发器支持的 50/125um 多模光纤链路长度（OM2） |
| **sfp-link-length-om1**（*m*） | 收发器支持的 62.5/125um 多模光纤链路长度（OM1） |
| **sfp-link-length-copper**（*m*） | 铜缆收发器支持的链路长度 |
| **sfp-vendor-name**（*string*） | 收发器制造商 |
| **sfp-vendor-part-number**（*string*） | 收发器部件号 |
| **sfp-vendor-revision**（*string*） | 收发器版本号 |
| **sfp-vendor-serial**（*string*） | 收发器序列号 |
| **sfp-manufacturing-date**（*date*） | 收发器生产日期 |
| **sfp-power-class** *(string)* | 收发器功率等级 |
| **sfp-max-power** *(W)* | 收发器最大功耗 |
| **sfp-wavelength** *(nm)* | 收发器发射器光信号波长 |
| **sfp-temperature***(C)* | 收发器温度 |
| **sfp-supply-voltage** *(V)* | 收发器供电电压 |
| **sfp-tx-bias-current** *(mA)* | 收发器 Tx 偏置电流 |
| **sfp-tx-power** *(dBm)* | 收发器发射光功率 |
| **sfp-rx-power** *(dBm)* | 收发器接收光功率 |
| **sfp-supported**(*10M-baseT-half \| 10M-baseT-full\| 100M-baseT-half \| 100M-baseT-full \| 1G-baseT-half \| 1G-baseT-full \| 1G-baseX \| 2.5G-baseT \| 2.5G-baseX \| 5G-baseT \| 10G-baseT \| 10G-baseSR-LR \| 10G-baseCR \| 40G-baseSR4-LR4 \| 40G-baseCR4 \| 25G-baseSR-LR \| 25G-baseCR \| 50G-baseSR2-LR2 \| 50G-baseCR2 \| 100G-baseSR4-LR4 \| 100G-baseCR4 \| 50G-baseSR-LR \| 50G-baseCR \| 100G-baseSR2-LR2 \| 100G-baseCR2 \| 200G-baseSR4-LR4 \| 200G-baseCR4 \| 400G-baseSR8-LR8 \| 400G-baseCR8*) | 模块支持的链路模式。该属性仅适用于特定设备。 |
| **supported**（*10M-baseT-half \| 10M-baseT-full\| 100M-baseT-half \| 100M-baseT-full \| 1G-baseT-half \| 1G-baseT-full \| 1G-baseX \| 2.5G-baseT \| 2.5G-baseX \| 5G-baseT \| 10G-baseT \| 10G-baseSR-LR \| 10G-baseCR \| 40G-baseSR4-LR4 \| 40G-baseCR4 \| 25G-baseSR-LR \| 25G-baseCR \| 50G-baseSR2-LR2 \| 50G-baseCR2 \| 100G-baseSR4-LR4 \| 100G-baseCR4 \| 50G-baseSR-LR \| 50G-baseCR \| 100G-baseSR2-LR2 \| 100G-baseCR2 \| 200G-baseSR4-LR4 \| 200G-baseCR4 \| 400G-baseSR8-LR8 \| 400G-baseCR8*） | 显示接口硬件支持的链路模式能力。 |
| **eeprom-checksum** *(good \| bad)* | EEPROM 校验和是否正确 |
| **eeprom** *(hex dump)* | 收发器的原始 EEPROM |

以太网状态输出示例：

```ros
[admin@MikroTik] > /interface/ethernet/monitor ether2 
                      name: ether2
                    status: link-ok
          auto-negotiation: done
                      rate: 1Gbps
               full-duplex: yes
           tx-flow-control: no
           rx-flow-control: no
                 supported: 10M-baseT-half,10M-baseT-full,100M-baseT-half,100M-baseT-full,1G-baseT-half,1G-baseT-full
               advertising: 10M-baseT-half,10M-baseT-full,100M-baseT-half,100M-baseT-full,1G-baseT-half,1G-baseT-full
  link-partner-advertising: 10M-baseT-half,10M-baseT-full,100M-baseT-half,100M-baseT-full,1G-baseT-half,1G-baseT-full
```

SFP 状态输出示例：

```ros
[admin@MikroTik] > /interface/ethernet/monitor sfp3
                      name: sfp3
                    status: link-ok
          auto-negotiation: done
                       rate: 1Gbps
                full-duplex: yes
            tx-flow-control: no
           rx-flow-control: no
                 supported: 10M-baseT-half,10M-baseT-full,100M-baseT-half,100M-baseT-full,1G-baseT-half,1G-baseT-full,1G-baseX
             sfp-supported: 1G-baseX
               advertising: 1G-baseX
  link-partner-advertising: 
        sfp-module-present: yes
               sfp-rx-loss: no
              sfp-tx-fault: no
                  sfp-type: SFP/SFP+/SFP28/SFP56
        sfp-connector-type: LC
       sfp-link-length-om1: 500m
       sfp-link-length-om2: 550m
           sfp-vendor-name: Mikrotik
    sfp-vendor-part-number: S-85DLC05D
         sfp-vendor-serial: SG85M31401687
    sfp-manufacturing-date: 13-04-24
            sfp-wavelength: 850nm
           sfp-temperature: 33C
        sfp-supply-voltage: 3.237V
       sfp-tx-bias-current: 2mA
              sfp-tx-power: -5.792dBm
              sfp-rx-power: -5.22dBm
           eeprom-checksum: good
                    eeprom: 0000: 03 04 07 00 00 00 01 00  00 00 00 03 0d 00 00 00  ........ ........
                            0010: 37 32 00 00 4d 69 6b 72  6f 74 69 6b 20 20 20 20  72..Mikr otik    
                            0020: 20 20 20 20 00 00 00 00  53 2d 38 35 44 4c 43 30      .... S-85DLC0
                            0030: 35 44 20 20 20 20 20 20  00 00 00 00 03 52 00 50  5D       .....R.P
                            0040: 00 1a 00 00 53 47 38 35  4d 33 31 34 30 31 36 38  ....SG85 M3140168
                            0050: 37 20 20 20 31 33 30 34  32 34 20 20 68 b0 01 f3  7   1304 24  h...
                            0060: 00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ........ ........
                            *
                            0080: 64 00 d2 ff 5a 00 d7 ff  8c a0 75 30 88 b8 79 18  d...Z... ..u0..y.
                            0090: 75 30 00 fa 61 a8 01 f4  1f 07 03 1a 18 a5 03 e7  u0..a... ........
                            00a0: 31 2e 00 13 27 12 00 27  00 00 00 00 00 00 00 00  1...'..' ........
                            00b0: 00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ........ ........
                            00c0: 00 00 00 00 3f 80 00 00  00 00 00 00 01 00 00 00  ....?... ........
                            00d0: 01 00 00 00 01 00 00 00  01 00 00 00 00 00 00 23  ........ .......#
                            00e0: 21 7c 7e 72 05 27 0a 4b  0b be 00 00 00 00 00 94  !|~r.'.K ........
                            00f0: 00 00 00 00 00 00 00 00  20 21 2a ff ff ff ff 00  ........  !*.....

```

## 检测线缆问题 {#detect-cable-problems}

如果线缆另一端未插入，因此出现“no-link”，线缆测试可以检测问题或测量大致的线缆长度。RouterOS 将显示：

- 哪一对线缆损坏
- 到问题点的距离
- 线缆具体如何损坏——短路还是断路

如果另一端只是未插入，该方法同样有效；在这种情况下，将显示线缆总长度。

以下是输出示例：

```ros
[admin@CCR] > interface ethernet cable-test ether2 
name: ether2 
status: no-link 
cable-pairs: open:4,open:4,open:4,open:4
```

在上例中，线缆未短路，而是在 4 米处“开路”；所有线对在距离交换芯片相同位置处均存在故障。

目前以下设备支持 `cable-test`：

| 设备 |  |  |
| :-- | :-- | :-- |
| CCR1xxx series | RB952Ui-5ac2nD | RBLHGG-5acD |
| CRS1xx series | RB962UiGS-5HacT2HnT | RB5009 series (eth1) |
| CRS2xx series | RB1100AHx2 | C52iG-5HaxD2HaxD |
| OmniTIK series | RB1100x4 | C53UiG+5HPaxD2HPaxD |
| RB450G series | RBD52G-5HacD2HnD | S53UG+5HaxD2HaxD series |
| RB951 series | RBD53G-5HacD2HnD series | H53UiG-5HaxQ2HaxQ |
| RB2011 series | RBcAPGi-5acD2nD |  |
| RB4011 series | RBmAPL-2nD |  |
| RB750Gr2 | RBmAP2nD |  |
| RB750UPr2 | RBwsAP-5Hac2nD |  |
| RB751U-2HnD | RB3011UiAS-RM |  |
| RB850Gx2 | RBMetal 2SHPn |  |
| RB931-2nD | RBDynaDishG-5HacD |  |
| RB941-2nD | RBLDFG-5acD |  |

:::warning
目前 Combo 端口不支持 `cable-test`。
:::

## 统计信息 {#stats}

使用 `/interface/ethernet/print stats` 命令，可以查看各种以太网相关统计信息。由于以太网驱动程序不同，不同 RouterBoard 设备上的统计信息列表可能有所不同。以下列表包含所有 RouterBoard 设备上可用的计数器。大多数以太网统计信息可以通过 [SNMP](/docs/diagnostics-monitoring-and-troubleshooting/snmp) 和 MIKROTIK-MIB 进行远程监控。

| 属性 | 说明 |
| :-- | :-- |
| **driver-rx-byte** (*integer*) | 设备 CPU 接收的字节总数 |
| **driver-rx-packet** (*integer*) | 设备 CPU 接收的数据包总数 |
| **driver-tx-byte** (*integer*) | 设备 CPU 发送的字节总数 |
| **driver-tx-packet** (*integer*) | 设备 CPU 发送的数据包总数 |
| **fc-fec-block-corrected** (*integer*) | FC-FEC 已纠正块的总数。仅在使用 fec74 模式时适用。 |
| **fc-fec-block-uncorrected** (*integer*) | FC-FEC 未纠正块的总数。仅在使用 fec74 模式时适用。 |
| **fc-fec-rx-block** (*integer*) | FC-FEC 接收块的总数。仅在使用 fec74 模式时适用。 |
| **rs-fec-corrected** (*integer*) | RS-FEC 已纠正码字的总数。仅在使用 fec91 模式时适用。 |
| **rs-fec-symbol-error** (*integer*) | RS-FEC 符号错误的总数。仅在使用 fec91 模式时适用。 |
| **rs-fec-uncorrected** (*integer*) | RS-FEC 未纠正码字的总数。仅在使用 fec91 模式时适用。 |
| **rx-64** (*integer*) | 接收的 64 字节帧总数 |
| **rx-65-127** (*integer*) | 接收的 65 至 127 字节帧总数 |
| **rx-128-255** (*integer*) | 接收的 128 至 255 字节帧总数 |
| **rx-256-511** (*integer*) | 接收的 256 至 511 字节帧总数 |
| **rx-512-1023** (*integer*) | 接收的 512 至 1023 字节帧总数 |
| **rx-1024-1518** (*integer*) | 接收的 1024 至 1518 字节帧总数 |
| **rx-1519-max** (*integer*) | 接收的大于 1519 字节的帧总数 |
| **rx-align-error** (*integer*) | 接收的对齐错误事件总数，即比特未按八位组边界对齐的数据包 |
| **rx-broadcast** (*integer*) | 接收的广播帧总数 |
| **rx-bytes** (*integer*) | 接收的字节总数 |
| **rx-carrier-error** (*integer*) | 接收的载波侦听错误帧总数 |
| **rx-code-error** (*integer*) | 接收的代码错误帧总数 |
| **rx-control** (*integer*) | 接收的控制帧或暂停帧总数 |
| **rx-error-events** (*integer*) | 接收的带有活动错误事件的帧总数 |
| **rx-fcs-error** (*integer*) | 接收的校验和错误帧总数 |
| **rx-fragment** (*integer*) | 接收的碎片帧总数（与 IP 分片无关） |
| **rx-ip-header-checksum-error** (*integer*) | 接收的 IP 报头校验和错误帧总数 |
| **rx-jabber** (*integer*) | 接收的超长数据包总数，即发送长度超过最大数据包长度的数据包 |
| **rx-length-error** (*integer*) | 接收的帧长度错误帧总数 |
| **rx-multicast** (*integer*) | 接收的组播帧总数 |
| **rx-overflow** (*integer*) | 接收的溢出帧总数，当设备资源不足以接收某个帧时可能导致该情况 |
| **rx-pause** (*integer*) | 接收的暂停帧总数 |
| **rx-runt** (*integer*) | 接收的短于最小 64 字节的帧总数，通常由冲突导致 |
| **rx-tcp-checksum-error** (*integer*) | 接收的 TCP 报头校验和错误帧总数 |
| **rx-too-long** (*integer*) | 接收的大于网络设备支持的最大帧大小的帧总数，请参阅 max-l2mtu 属性 |
| **rx-too-short** (*integer*) | 接收的短于最小 64 字节的帧总数 |
| **rx-udp-checksum-error** (*integer*) | 接收的 UDP 报头校验和错误帧总数 |
| **rx-unicast** (*integer*) | 接收的单播帧总数 |
| **rx-unknown-op** (*integer*) | 接收的具有未知以太网协议的帧总数 |
| **tx-64** (*integer*) | 发送的 64 字节帧总数 |
| **tx-65-127** (*integer*) | 发送的 65 至 127 字节帧总数 |
| **tx-128-255** (*integer*) | 发送的 128 至 255 字节帧总数 |
| **tx-256-511** (*integer*) | 发送的 256 至 511 字节帧总数 |
| **tx-512-1023** (*integer*) | 发送的 512 至 1023 字节帧总数 |
| **tx-1024-1518** (*integer*) | 发送的 1024 至 1518 字节帧总数 |
| **tx-1519-max** (*integer*) | 发送的大于 1519 字节的帧总数 |
| **tx-align-error** (*integer*) | 发送的对齐错误事件总数，即比特未按八位组边界对齐的数据包 |
| **tx-broadcast** (*integer*) | 发送的广播帧总数 |
| **tx-bytes** (*integer*) | 发送的字节总数 |
| **tx-collision** (*integer*) | 发送时发生冲突的帧总数 |
| **tx-control** (*integer*) | 发送的控制帧或暂停帧总数 |
| **tx-deferred** (*integer*) | 因介质已忙而在首次发送尝试时延迟的帧总数 |
| **tx-drop** (*integer*) | 因输出队列已满而丢弃的发送帧总数 |
| **tx-excessive-collision** (*integer*) | 已发生多次冲突且从未成功发送的帧总数 |
| **tx-excessive-deferred** (*integer*) | 因介质已忙而延迟过长时间的帧总数 |
| **tx-fcs-error** (*integer*) | 发送的校验和错误帧总数 |
| **tx-fragment** (*integer*) | 发送的碎片帧总数（与 IP 分片无关） |
| **tx-carrier-sense-error** (*integer*) | 发送的载波侦听错误帧总数 |
| **tx-late-collision** (*integer*) | 发送已过半后发生冲突的帧总数 |
| **tx-multicast** (*integer*) | 发送的组播帧总数 |
| **tx-multiple-collision** (*integer*) | 发生多次冲突后仍成功发送的帧总数 |
| **tx-overflow** (*integer*) | 发送的溢出帧总数 |
| **tx-pause** (*integer*) | 发送的暂停帧总数 |
| **tx-all-queue-drop-byte** (*integer*) | 被所有输出队列丢弃的发送字节总数 |
| **tx-all-queue-drop-packet** (*integer*) | 被所有输出队列丢弃的发送数据包总数 |
| **tx-queueX-byte** (*integer*) | 某个队列上的发送字节总数，**X** 应替换为队列编号 |
| **tx-queueX-packet** (*integer*) | 某个队列上的发送帧总数，**X** 应替换为队列编号 |
| **tx-runt** (*integer*) | 发送的短于最小 64 字节的帧总数，通常由冲突导致 |
| **tx-too-short** (*integer*) | 发送的短于最小 64 字节的帧总数 |
| **tx-rx-64** (*integer*) | 发送和接收的 64 字节帧总数 |
| **tx-rx-64-127** (*integer*) | 发送和接收的 64 至 127 字节帧总数 |
| **tx-rx-128-255** (*integer*) | 发送和接收的 128 至 255 字节帧总数 |
| **tx-rx-256-511** (*integer*) | 发送和接收的 256 至 511 字节帧总数 |
| **tx-rx-512-1023** (*integer*) | 发送和接收的 512 至 1023 字节帧总数 |
| **tx-rx-1024-max** (*integer*) | 发送和接收的大于 1024 字节的帧总数 |
| **tx-single-collision** (*integer*) | 仅发生一次冲突后仍成功发送的帧总数 |
| **tx-too-long** (*integer*) | 发送的大于最大数据包大小的数据包总数 |
| **tx-underrun** (*integer*) | underrun 帧总数，当设备资源不足以发送某个帧时可能导致该情况 |
| **tx-unicast** (*integer*) | 发送的单播帧总数 |

例如，hAP ac2 设备上的以太网统计信息输出：

```ros
[admin@MikroTik] > /interface/ethernet/print stats
                      name:           ether1 ether2         ether3        ether4 ether5
            driver-rx-byte:  182 334 805 898      0  5 836 927 820    24 895 692      0
          driver-rx-packet:    4 449 562 546      0  4 320 155 362       259 449      0
            driver-tx-byte:   15 881 099 971      0 70 502 669 211    60 498 056     53
          driver-tx-packet:       52 724 428      0     54 231 229       106 498      1
                  rx-bytes:  178 663 398 808      0  5 983 590 739 1 358 140 795      0
              rx-too-short:                0      0              0             0      0
                     rx-64:       12 749 144      0        362 459       125 917      0
                 rx-65-127:        9 612 406      0     20 366 513       292 189      0
                rx-128-255:        6 259 883      0      1 672 588       261 013      0
                rx-256-511:        2 950 578      0        211 380       278 147      0
               rx-512-1023:        3 992 258      0        185 666       163 241      0
              rx-1024-1518:      119 034 611      0      2 796 559       696 254      0
               rx-1519-max:                0      0              0             0      0
               rx-too-long:                0      0              0             0      0
              rx-broadcast:       12 025 189      0      1 006 377        64 178      0
                  rx-pause:                0      0              0             0      0
              rx-multicast:        4 687 869      0         36 188       220 136      0
              rx-fcs-error:                0      0              0             0      0
            rx-align-error:                0      0              0             0      0
               rx-fragment:                0      0              0             0      0
               rx-overflow:                0      0              0             0      0
                  tx-bytes:   16 098 535 973      0 72 066 425 886   225 001 772      0
                     tx-64:        1 063 375      0        924 855        37 877      0
                 tx-65-127:       26 924 514      0      2 442 200       959 209      0
                tx-128-255:       14 588 113      0        924 746       295 961      0
                tx-256-511:        1 323 733      0      1 036 515        33 252      0
               tx-512-1023:        1 287 464      0      2 281 554         3 625      0
              tx-1024-1518:        7 537 154      0     48 212 304        64 659      0
               tx-1519-max:                0      0              0             0      0
               tx-too-long:                0      0              0             0      0
              tx-broadcast:              590      0        145 800       823 038      0
                  tx-pause:                0      0              0             0      0
              tx-multicast:                0      0      1 039 243        41 716      0
               tx-underrun:                0      0              0             0      0
              tx-collision:                0      0              0             0      0
    tx-excessive-collision:                0      0              0             0      0
     tx-multiple-collision:                0      0              0             0      0
       tx-single-collision:                0      0              0             0      0
     tx-excessive-deferred:                0      0              0             0      0
               tx-deferred:                0      0              0             0      0
         tx-late-collision:                0      0              0             0      0
```
