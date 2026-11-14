---
sidebar_key: "wired-connections/mikrotik-wired-interface-compatibility"
sidebar_position: 2
title: "MikroTik 有线接口兼容性"
sidebar_label: "MikroTik 有线接口兼容性"
description: "MikroTik SFP/SFP+/SFP28/QSFP+/QSFP28/QSFP56-DD 兼容性"
tags:
  - 'sfp'
  - 'ethernet'
source: https://manual.mikrotik.com/docs/7.25/wired-connections/mikrotik-wired-interface-compatibility
captured_at: '2026-11-04T11:23:48+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## MikroTik SFP/SFP+/SFP28/QSFP+/QSFP28/QSFP56-DD 兼容性 {#mikrotik-sfpsfpsfp28qsfpqsfp28qsfp56-dd-compatibility}

本文介绍 MikroTik 设备与 SFP、SFP+、SFP28、QSFP+、QSFP28 和 QSFP56-DD 收发器的兼容性。文中提供了详细的兼容性表格，可帮助深入了解哪些收发器适合与 MikroTik 设备配合使用。此外，还提供了一些使用 RouterOS CLI 设置不同数据传输速率的实用配置示例。有关属性的更详细说明，请参阅 [以太网](./ethernet.md) 用户手册。

:::info
MikroTik 设备与 SFP、SFP+、SFP28、QSFP+、QSFP28 和 QSFP56-DD 模块对其他厂商的设备没有任何限制。

虽然 MikroTik 无法保证与所有制造商的模块完全兼容，但只要其他厂商的模块和设备符合收发器多源协议（MSA），它们就应当能与 MikroTik 兼容。

**警告：** RouterOS 将禁用的 **FEC** 模式作为 SFP28 和 QSFP28 接口的默认设置。为确保与其他厂商设备成功建立链路，您可能需要通过将 FEC 模式配置为 `fec74` 或 `fec91` 来启用它。更多信息请参阅 [以太网](./ethernet.md) 用户手册。
:::

### 1G SFP {#1g-sfp}

<WideTable>

|  |  |  |  |  |  |  |  |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **型号** | **[S-RJ01](https://mikrotik.com/product/S-RJ01)** | **[S-85DLC05D](https://mikrotik.com/product/S-85DLC05D-180)** | **[S-31DLC20D](https://mikrotik.com/product/S-31DLC20D-181)** | **[S-3553LC20D](https://mikrotik.com/product/S-3553LC20D)** | **[S-55DLC80D](https://mikrotik.com/product/s_55dlc80d)** | **[S-4554LC80D](https://mikrotik.com/product/s_4554lc80d)** | **[SFP CWDM](https://i.mt.lv/cdn/product_files/splitter_modules_180841.pdf)** | **SFP [1m](https://mikrotik.com/product/SplusDA0001)/[3m](https://mikrotik.com/product/SplusDA0003) DAC** | **[S+AO0005](https://mikrotik.com/product/s_ao0005) AOC** | **SFP28 [1m](https://mikrotik.com/product/xs_da0001)/[3m](https://mikrotik.com/product/xs_da0003) DAC** |
| CCR1072-1G-8S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CCR1036-12G-4S | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CCR1036-8G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CCR1016-12S-1S+ | **+ 1** | **+ 1** | **+ 1** | **+ 1** | **+ 1** | **+ 1** | **+** | **+** | **+** | **+** |
| CCR1009-7G-1C | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CCR1009-8G-1S-1S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CCR1009-7G-1C-1S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CCR2004-1G-2XS-PCIe | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** |
| CCR2004-1G-12S+2XS | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CCR2004-16G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CCR2116-12G-4S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CCR2216-1G-12XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| RDS2216-2XG-4S+4XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS125-24G-1S | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS305-1G-4S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS309-1G-8S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS312-4C+8XG | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS318-1Fi-15Fr-2S | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS318-16P-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CSS318-16G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS320-8P-8B-4S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS326-4C+20G+2Q+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS326-24S+2Q+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS354-48G/P-4S+2Q+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS418-8P-8G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS520-4XS-16XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS518-16XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS510-8XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CSS/CRS326-24G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS317-1G-16S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS328-4C-20S-4S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS328-24P-4S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS226-24G-2S+ | **-** | **+ 2** | **+ 2** | **+ 2** | **+ 2** | **+ 2** | **+** | **+** | **+** | **+** |
| CRS212-1G-10S-1S+ | **+ 1** | **+ 1** | **+ 1** | **+ 1** | **+ 1** | **+ 1** | **+** | **+** | **+** | **+** |
| CRS210-8G-2S+ | **-** | **+ 2** | **+ 2** | **+ 2** | **+ 2** | **+ 2** | **+** | **+** | **+** | **+** |
| CRS112-8G/P-4S | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS109-8G-1S | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS106-1C-5S/FiberBox | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| RB5009 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| RB4011 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| RB3011 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| RB2011 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| L009 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 14** | **+ 14** | **+ 14** |
| RB260/CSS106 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| RB922/921 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| RB953GS | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| hAP AC | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| hAP ax S | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 14** | **+ 14** | **+ 14** |
| hEX PoE/PowerBox Pro | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| hEX S | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| hEX S (2025) | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 14** | **+ 14** | **+ 14** |
| RBFTC11 | **+** | **+ 8** | **+ 8** | **+ 8** | **+ 8** | **+ 8** | **+ 8** | **+ 8** | **+ 8** | **+ 8** |
| FTC11XG | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| FTC21 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 14** | **+ 14** | **+ 14** |
| LHG XL 52 ac | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| RBD22/D23 mANTBox 52 15s/NetMetal ac² | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| L22/mANTBox ax 15s L23/NetMetal ax | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 14** | **+ 14** | **+ 14** |
| GPEN21 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CSS610 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS310-1G-5S-4S+/netFiber 9 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS310-8G+2S+IN | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS812-8DS-2DQ-2DDQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS804-4DDQ | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** |

</WideTable>

### 10G SFP+/25G SFP28 {#10g-sfp25g-sfp28}

<WideTable>

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **型号** | **[S+RJ10](https://mikrotik.com/product/s_rj10)** | **[S+85DLC03D](https://mikrotik.com/product/Splus85DLC03D)** | **[S+31DLC10D](https://mikrotik.com/product/s_31dlc10d)** | **[S+2332LC10D](https://mikrotik.com/product/Splus2332LC10D)** | **[SFP+ CWDM](https://i.mt.lv/cdn/product_files/splitter_modules_180841.pdf)** | **SFP+ [1m](https://mikrotik.com/product/SplusDA0001)/[3m](https://mikrotik.com/product/SplusDA0003) DAC** | **[S+AO0005](https://mikrotik.com/product/s_ao0005) AOC** | **[Q+BC0003-S+](https://mikrotik.com/product/q_bc0003_s)** | **[XQ+BC0003-XS+](https://mikrotik.com/product/xq_bc0003_xs_)** | **SFP28 [1m](https://mikrotik.com/product/xs_da0001)/[3m](https://mikrotik.com/product/xs_da0003) DAC** | **SFP28 [XS+31LC10D](https://mikrotik.com/product/xs_31lc10d)** | **SFP28 [XS+2733LC15D](https://mikrotik.com/product/xs_2733lc15d)** | **SFP28 [XS+85LC01D](https://mikrotik.com/product/xs_85lc01d)** |
| CCR1072-1G-8S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CCR1036-12G-4S | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| CCR1036-8G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CCR1016-12S-1S+ | **+ 10** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 1,5** | **+ 1,5** | **+** | **+** | **+** | **+** |
| CCR1009-7G-1C | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| CCR1009-8G-1S-1S+ | **+ 10** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CCR1009-7G-1C-1S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CCR2004-1G-2XS-PCIe | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CCR2004-1G-12S+2XS | **+ 11** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CCR2004-16G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CCR2116-12G-4S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CCR2216-1G-12XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| RDS2216-2XG-4S+4XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS125-24G-1S | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| CRS305-1G-4S+ | **+ 7** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS309-1G-8S+ | **+ 4** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS312-4C+8XG | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS318-1Fi-15Fr-2S | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| CRS318-16P-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CSS318-16G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS320-8P-8B-4S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS326-4C+20G+2Q+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS326-24S+2Q+ | **+ 6** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS354-48G/P-4S+2Q+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS418-8P-8G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS520-4XS-16XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS518-16XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS510-8XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CSS/CRS326-24G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+ 9** | **+ 9** | **+** |
| CRS317-1G-16S+ | **+ 3** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS328-4C-20S-4S+ | **+ 10** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS328-24P-4S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+ 9** | **+ 9** | **+** |
| CRS226-24G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS212-1G-10S-1S+ | **+ 10** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS210-8G-2S+ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS112-8G/P-4S | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| CRS109-8G-1S | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| CRS106-1C-5S/FiberBox | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| RB5009 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| RB4011 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| RB3011 | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| RB2011 | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| L009 | **-** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** |
| RB260/CSS106 | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| RB922/921 | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| RB953GS | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| hAP AC | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| hAP ax S | **-** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** |
| hEX PoE/PowerBox Pro | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| hEX S | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| hEX S (2025) | **-** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** |
| RBFTC11 | **-** | **+ 8** | **+ 8** | **+ 8** | **+ 8** | **+ 8** | **+ 8** | **-** | **-** | **+ 8** | **+ 8** | **+ 8** | **+ 8** |
| FTC11XG | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| FTC21 | **-** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** |
| LHG XL 52 ac | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| RBD22/D23 mANTBox 52 15s/NetMetal ac² | **-** | **+** | **+** | **+** | **+** | **+** | **+** | **-** | **-** | **+** | **+** | **+** | **+** |
| L22/mANTBox ax 15s L23/NetMetal ax | **-** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** | **+ 14** |
| CSS610 | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS310-1G-5S-4S+/netFiber 9 | **+ 10** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS310-8G+2S+IN | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+ 5** | **+ 5** | **+** | **+** | **+** | **+** |
| CRS812-8DS-2DQ-2DDQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS804-4DDQ | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** | **-** |

</WideTable>

### 40G QSFP+ {#40g-qsfp}

|  |  |  |  |
| :-- | :-- | :-- | :-- |
| **型号** | **QSFP+ [Q+DA0001](https://mikrotik.com/product/q_da0001)** | **[Q+85MP01D](https://mikrotik.com/product/q_85mp01d)** | **[Q+BC0003-S+](https://mikrotik.com/product/q_bc0003_s)** |
| CRS326-4C+20G+2Q+ | **+** | **+** | **+** |
| CRS326-24S+2Q+ | **+** | **+** | **+** |
| CRS354-48G/P-4S+2Q+ | **+** | **+** | **+** |
| CRS504-4XQ-IN | **+** | **+** | **+** |
| CRS504-4XQ-OUT | **+13** | **+** | **+13** |
| CRS510-8XS-2XQ | **+** | **+** | **+** |
| CRS518-16XS-2XQ | **+** | **+** | **+** |
| CRS520-4XS-16XQ | **+** | **+** | **+** |
| CCR2216-1G-12XS-2XQ | **+** | **+** | **+** |
| RDS2216-2XG-4S+4XS-2XQ | **+** | **+** | **+** |
| CRS812-8DS-2DQ-2DDQ | **+** | **+** | **+** |
| CRS804-4DDQ | **+** | **+** | **+** |

### 100G QSFP28 {#100g-qsfp28}

<WideTable>

|  |  |  |  |  |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **型号** | **[XQ+31LC10D](https://mikrotik.com/product/xq_31lc10d)** | **[XQ+31LC02D](https://mikrotik.com/product/xq_31lc02d)** | **[XQ+85MP01D](https://mikrotik.com/product/xq_85mp01d)** | **[XQ+DA0001](https://mikrotik.com/product/xq_da0001)** | **[XQ+DA0003](https://mikrotik.com/product/xq_da0003)** | **[XQ+BC0003-XS+](https://mikrotik.com/product/xq_bc0003_xs_)** | **[XQ+CM0000-XS+](https://mikrotik.com/product/xq_cm0000_xs_)** |
| CRS326-4C+20G+2Q+ | **-** | **-** | **+** | **+** | **+** | **+** | **+** |
| CRS326-24S+2Q+ | **-** | **-** | **+** | **+** | **+** | **+** | **+** |
| CRS354-48G/P-4S+2Q+ | **-** | **-** | **+** | **+** | **+** | **+** | **+** |
| CRS504-4XQ-IN | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS504-4XQ-OUT | **+** | **+** | **+** | **+13** | **+13** | **+13** | **+** |
| CRS510-8XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS518-16XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS520-4XS-16XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CCR2216-1G-12XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| RDS2216-2XG-4S+4XS-2XQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS812-8DS-2DQ-2DDQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** |
| CRS804-4DDQ | **+** | **+** | **+** | **+** | **+** | **+** | **+** |

</WideTable>

### 400G QSFP56-DD {#400g-qsfp56-dd}

|  |  |  |  |
| :-- | :-- | :-- | :-- |
| **型号** | **[DDQ+DA0001](https://mikrotik.com/product/ddq_da0001)** | **[DDQ+DA0003](https://mikrotik.com/product/ddq_da0003)** | **[DDQ+85MP01D](https://mikrotik.com/product/ddq_85mp01d)** |
| CRS812-8DS-2DQ-2DDQ | **+** | **+** | **+** |
| CRS804-4DDQ | **+** | **+** | **+** |

|  |  |  |
| :-- | :-- | :-- |
| **图例** |  |  |
| 颜色代码： | 不支持 | 请查看下方注释 |

:::note
注释：

1. **CCR1016-12S-1S+**、**CRS212-1G-10S-1S+** - SFP+1 接口在除 10G 以外的任何链路速度下都无法工作（不支持 1.25G 光纤收发器）
2. **CRS226-24G-2S+**、**CRS210-8G-2S+**- SFP+1 接口还支持 SFP 1.25G 光纤收发器，SFP+2 仅适用于 10G 收发器/链路。
3. **CSS/CRS317-1G-16S+**- 电源控制器最多支持 10 个同时使用的 S+RJ10 模块。
4. **CSS/CRS309-1G-8S+**- 最多支持 4 个同时使用的 S+RJ10 模块。我们不建议在没有额外散热的情况下将 S+RJ10 用于被动散热设备，因为它们的功耗相对较高，工作温度也相应较高。
5. **Q+BC0003-S+**、**XQ+BC0003-XS+**- 在 SFP+/SFP28 端口笼中支持 SFP+ 连接器
6. **CSS/CRS326-24S+2Q+**- 最多支持 12 个同时使用的 S+RJ10 模块
7. **CSS/CRS305-1G-4S+**- 最多支持 2 个同时使用的 S+RJ10 模块。
8. **RBFTC11**- 连接到另一台设备的 1G SFP 端口时可正常工作。
9. **XS+31LC10D**、**XS+2733LC15D** - 自 2021 年 10 月起生产的 CSS/CRS326-24G-2S+ 和 CRS328-24P-4S+ 交换机已添加完整支持。
10. **S+RJ10** - 在 SFP+ 端口笼中提供支持。
11. **CCR2004-1G-12S+2XS**- 最多支持 6 个同时使用的 S+RJ10 模块。
12. **CCR2004-1G-2XS-PCIe**- 两个 SFP28 端口仅支持相同速度（2 x 25G 或 2 x 10G 模式）。
13. **CRS504-4XQ-OUT**- [IP 防护等级从 IP66 降低至 IP54。](https://help.mikrotik.com/docs/display/UM/CRS504-4XQ-OUT#heading-Quickstart)
14. **10G SFP+/25G SFP28 模块** - 设备 SFP 最高支持 2.5G 速率，需要手动设置速度才能工作。
15. **CRS312-4C+8XG、CRS326-4C+20G+2Q+** - Combo SFP+ 接口支持 1G 和 10G 速度（不支持 2.5G 和 5G）

:::

## S-RJ01 {#s-rj01}

该表说明 S-RJ01 模块安装在特定 MikroTik 设备中时可工作的链路速率。请仅在启用自动协商的情况下使用这些模块。不支持强制链路速度。它们会协商到正确的双工模式和最高可能的速率。

|  |  |  |  |
| :-- | :-- | :-- | :-- |
| **型号** | **1000** | **100** | **10** |
| RB5009 | **+** | **+** | **+** |
| RB4011 | **+** | **+** | **+** |
| RB3011 | **+** | **+** | **+** |
| RB922 | **+** | **+** | **+** |
| RB921 | **+** | **+** | **+** |
| hAP ac | **+** | **+** | **+** |
| hEX PoE | **+** | **+** | **+** |
| hEX S | **+** | **-** | **-** |
| RB953 | **+/+** | **-/+** | **-/+** |
| RB2011 | **+** | **-** | **-** |
| RB260/CSS106 | **+** | **-** | **-** |
| RBFTC11 | **+** | **-** | **-** |
| LHG XL 52 ac | **-** | **-** | **-** |
| RBD22/D23 mANTBox 52 15s/NetMetal ac² | **-** | **-** | **-** |
| CRS106 | **+** | **+** | **+** |
| CRS112 | **+** | **+** | **+** |
| CRS125/CRS109 | **+** | **+** | **+** |
| CRS212 | **+** | **+** | **+** |
| CRS226/CRS210 | **-** | **-** | **-** |
| CSS/CRS305-1G-4S+ | **+** | **+** | **+** |
| CSS/CRS309-1G-8S+ | **+** | **+** | **+** |
| CRS318-1Fi-15Fr-2S | **+** | **+** | **+** |
| CRS318-16P-2S+ | **+** | **+** | **+** |
| CSS/CRS326-24G-2S+ | **+** | **+** | **+** |
| CRS354 | **+** | **+** | **+** |
| CSS/CRS328-4C-20S-4S+ | **+** | **+** | **+** |
| CSS/CRS328-24P-4S+ | **+** | **+** | **+** |
| CSS/CRS317-1G-16S+ | **+** | **+** | **+** |
| CRS326-4C+20G+2Q+ | **+** | **+** | **+** |
| CRS326-24S+2Q+ | **+** | **+** | **+** |
| CSS610 | **+** | **+** | **+** |
| FTC11XG | **+** | **+** | **+** |
| CRS310-1G-5S-4S+/netFiber 9 | **+** | **+** | **+** |
| CRS310-8G+2S+IN | **+** | **+** | **+** |
| CCR1009 | **+/+** | **+/+** | **+/+** |
| CCR1016-12S-1S+ | **+** | **+** | **+** |
| CCR1036-12G-4S | **+** | **+** | **+** |
| CCR1036-8G-2S+ | **+** | **+** | **+** |
| CCR1072-1G-8S+ | **+** | **+** | **+** |

:::note
注释

- 该速率可正常工作：**+**
- 该速率无法工作：**-**
- RB953：SFP1/SFP2
- CCR1009：SFP+/SFP

:::

## 10 千兆以太网 {#10-gigabit-ethernet}

### S+RJ10 {#srj10}

请**仅在启用自动协商的 10G SFP+ 端口**中使用这些模块。不支持强制链路速度和可配置的链路速度通告。它们会协商到正确的双工模式和最高可能的速率。有关 S+RJ10 模块的正确安装方法和推荐使用场景，请参阅 [S+RJ10 通用指南](../hardware/s-plus-rj10-general-guidance.md)。

| 速度 | 线缆类型 | S+RJ10 到以太网端口 |
| :-- | :-- | :-- |
| 10BASE-T | Cat5e/6 | 100m |
| 100BASE-T | Cat5e/6 | 100m |
| 1000BASE-T | Cat5e/6 | 100m |
| 2.5GBASE-T | Cat5e/6 UTP | 100m |
| 2.5GBASE-T | Cat5e/6 STP | 100m |
| 5GBASE-T | Cat5e/6 | 100m |
| 10GBASE-T | Cat6/7 | 30m |

:::info
协商速度在很大程度上取决于所用线缆的质量和长度。

**重要：** S+RJ10 到 S+RJ10 始终会协商到最高可能的速率。
:::

S+RJ10 的最新版本在序列号末尾包含 "/r2"。它带来以下改进：

- 在 2.5G、5G 和 10G 速度下支持高达 10218 字节的巨型帧。
- 实际链路速度报告。
- DDM 监控（供电电压、模块温度）。

| 链路速度 | 最大 MTU |
| :-- | --: |
| 10Gbps | 10218 |
| 5Gbps | 10218 |
| 2.5Gbps | 10218 |
| 1000Mbps | 1504 |
| 100Mbps | 1504 |
| 10Mbps | 1504 |

### CRS312-4C+8XG {#crs312-4c8xg}

10GE 端口支持的最大线缆长度。

| 速度 | 线缆类型 | 10 千兆以太网端口 |
| :-- | :-- | :-- |
| 10BASE-T | Cat5e/6 | 100m |
| 100BASE-T | Cat5e/6 | 100m |
| 1000BASE-T | Cat5e/6 | 100m |
| 2.5GBASE-T | Cat5e/6 | 100m |
| 5GBASE-T | Cat5e/6 | 100m |
| 10GBASE-T | Cat6/7 | 30m |

:::warning
协商速度在很大程度上取决于所用线缆的质量和长度。

**注意：** 10GE 端口在使用强制链路速度时不支持半双工模式。
:::

## SFP 接口与 100M 光收发器的兼容性 {#sfp-interface-compatibility-with-100m-optical-transceivers}

所列设备上的 SFP 接口与[快速以太网光纤](https://en.wikipedia.org/wiki/Fast_Ethernet#Fiber_optics)链路兼容。

### 兼容设备（接口） {#compatible-devices-interface}

- CCR1009-7G-1C (combo1)
- CCR1009-7G-1C-1S+ (combo1)
- CRS106-1C-5S (combo1)
- CRS328-4C-20S-4S+ (combo1 - combo4 和 SFP1 - SFP20)
- LHG XL 52 ac
- RBD22/D23/mANTBox 52 15s/NetMetal ac²

## SFP+ 接口与 1G 光收发器的兼容性 {#sfp-interface-compatibility-with-1g-optical-transceivers}

对于带有同时支持 10G 和 1G 链路速率的 SFP+ 接口的 MikroTik 设备，必须在链路两端设备的相关接口上设置以下参数。这些设置仅在使用光 SFP 收发器时适用。为使它们以 1G 链路速率工作，请使用以下配置：

```ros
# 自 RouterOS v7.12 起
/interface/ethernet/set sfp-sfpplus1 auto-negotiation=no speed=1G-baseX

# 较早版本的 RouterOS
/interface/ethernet/set sfp-sfpplus1 auto-negotiation=no speed=1Gbps full-duplex=yes 
```

- 禁用自动协商。
- 端口速度为 1G。
- 全双工。

### SFP+ 端口支持 1G 链路的设备 {#devices-which-sfp-ports-support-1g-links}

- CCR2004-1G-12S+2XS - 如有需要，所有 SFP+ 接口均可用于 1G 模式。
- CCR2004-16G-2S+ - 如有需要，所有 SFP+ 接口均可用于 1G 模式。
- CCR1072-1G-8S+ - 如有需要，所有 SFP+ 接口均可用于 1G 模式。
- CCR1036-8G-2S+ - 如有需要，所有 SFP+ 接口均可用于 1G 模式。
- CCR1009-8G-1S-1S+ - 如有需要，所有 SFP+ 接口均可用于 1G 模式。
- CCR1009-7G-1C-1S+ - 如有需要，所有 SFP+ 接口均可用于 1G 模式。
- CSS3xx 系列交换机 - 如有需要，所有 SFP+ 接口均可用于 1G 模式。
- CRS3xx 系列交换机 - 如有需要，所有 SFP+ 接口均可用于 1G 模式。
- RB5009 系列 - 如有需要，SFP+1 接口可用于 1G 模式。
- RB4011 系列 - 如有需要，SFP+1 接口可用于 1G 模式。
- CRS226-24G-2S+ - 仅 SFP+1 支持 1G 链路速度，SFP+2 仅用于 10G 链路。
- CRS210-8G-2S+ - 仅 SFP+1 支持 1G 链路速度，SFP+2 仅用于 10G 链路。
- CSS610 系列交换机 - 如有需要，所有 SFP+ 接口均可用于 1G 模式。
- FTC11XG - 如有需要，SFP+1 接口可用于 1G 模式。

### SFP+ 接口仅可用于 10G 链路的设备 {#devices-which-sfp-interfaces-can-be-used-only-for-10g-links}

- CCR1016-12S-1S+
- CRS212-1G-10S-1S+

## SFP+ 接口与 10G/25G 光收发器的兼容性 {#sfp-interface-compatibility-with-10g25g-optical-transceivers}

带有 SFP+ 端口的 MikroTik 设备可使用 10G/25G 光纤收发器建立 10G 链路；但是，必须配置额外的 SFP Rate Select 设置，以避免传输过程中发生数据损坏。SFP+ 接口上需要以下设置：

```ros
# 自 RouterOS v7.12 起
/interface/ethernet/set sfp-sfpplus1 auto-negotiation=no speed=10G-baseSR-LR sfp-rate-select=low

# 较早版本的 RouterOS
/interface/ethernet/set sfp-sfpplus1 auto-negotiation=no speed=10Gbps full-duplex=yes sfp-rate-select=low
```

此要求适用于以下 MikroTik 10G/25G 模块：

- XS+31LC10D
- XS+2733LC15D

## SFP+/SFP28 接口与 2.5G 收发器的兼容性 {#sfpsfp28-interface-compatibility-with-25g-transceivers}

自 RouterOS v7.3 起已支持 2.5G 链路速率。支持 2.5G 链路速率的、带有 SFP+ 和 SFP28 接口的 MikroTik 设备需要在链路两端的设备接口上设置以下配置。

```ros
# 自 RouterOS v7.12 起
/interface/ethernet/set sfp-sfpplus1 auto-negotiation=no speed=2.5G-baseX

# 较早版本的 RouterOS
/interface/ethernet/set sfp-sfpplus1 auto-negotiation=no speed=2.5Gbps full-duplex=yes
```

- 禁用自动协商。
- 端口速度为 2.5G。
- 全双工。

### 在 SFP/SFP+/SFP28 端口上支持 2.5G 链路的设备 {#devices-which-support-25g-links-in-sfpsfpsfp28-ports}

- CRS3xx 系列交换机 - 如有需要，所有 SFP+ 接口均可用于 2.5G 模式。
- CCR2004-1G-12S+2XS - 如有需要，所有 SFP+ 和 SFP28 接口均可用于 2.5G 模式。
- CCR2116-12G-4S+ - 如有需要，所有 SFP+ 接口均可用于 2.5G 模式。
- CRS5xx 系列 - 如有需要，所有 SFP28 接口均可用于 2.5G 模式。
- CCR2216-1G-12XS-2XQ - 如有需要，所有 SFP28 接口均可用于 2.5G 模式。
- RB5009 系列 - 如有需要，SFP+ 接口可用于 2.5G 模式。
- L009 系列 - 如有需要，SFP 接口可用于 2.5G 模式。
- L23 系列 - 如有需要，SFP 接口可用于 2.5G 模式。
- CSS610 系列交换机 - 如有需要，所有 SFP+ 接口均可用于 2.5G 模式。
- FTC11XG - 如有需要，SFP+1 接口可用于 2.5G 模式。
- E60/E62 - 如有需要，SFP 接口可用于 2.5G 模式。

## QSFP+/QSFP28/QSFP56/QSFP56-DD 接口支持的链路速率 {#qsfpqsfp28qsfp56qsfp56-dd-interface-supported-link-rates}

在 RouterOS 中，QSFP+、QSFP28、QSFP56 和 QSFP56-DD 接口旨在通过利用多个通道来处理高速数据传输。每个 QSFP+、QSFP28 或 QSFP56 接口分为四个子接口，QSFP56-DD 分为八个子接口，每个子接口对应正常运行所需的一个传输通道。

:::info
QSFP+、QSFP28、QSFP56 和 QSFP56-DD 子接口的命名约定包括两部分：

- “qsfpplus”、“qsfp28-”、“qsfp56-”或“qsfp56-dd-”后面的第一位数字表示 QSFP+、QSFP28、QSFP56 或 QSFP56-DD 物理端口。
- 第二位数字表示各个独立通道：对于 QSFP+、QSFP28、QSFP56，范围为 1 到 4；对于 QSFP56-DD，范围为 1 到 8。

:::

以下示例展示了 QSFP+、QSFP28、QSFP56 和 QSFP56-DD 接口在 RouterOS 中的显示方式：

```ros
# QSFP+
/interface/ethernet/print
Flags: R - RUNNING
Columns: NAME, MTU, MAC-ADDRESS, ARP, SWITCH
 #   NAME            MTU  MAC-ADDRESS        ARP      SWITCH 
 1   qsfpplus1-1    1500  48:8F:5A:B6:09:8C  enabled  switch1
 2   qsfpplus1-2    1500  48:8F:5A:B6:09:8D  enabled  switch1
 3   qsfpplus1-3    1500  48:8F:5A:B6:09:8E  enabled  switch1
 4   qsfpplus1-4    1500  48:8F:5A:B6:09:8F  enabled  switch1

# QSFP28
/interface/ethernet/print
Flags: R - RUNNING
Columns: NAME, MTU, MAC-ADDRESS, ARP, SWITCH
 #   NAME         MTU  MAC-ADDRESS        ARP      SWITCH 
 1   qsfp28-1-1  1500  DC:2C:6E:9E:11:14  enabled  switch1
 2   qsfp28-1-2  1500  DC:2C:6E:9E:11:15  enabled  switch1
 3   qsfp28-1-3  1500  DC:2C:6E:9E:11:16  enabled  switch1
 4   qsfp28-1-4  1500  DC:2C:6E:9E:11:17  enabled  switch1

# QSFP56
/interface/ethernet/print
Flags: R - RUNNING; S - SLAVE
Columns: NAME, MTU, MAC-ADDRESS, ARP, SWITCH
 #   NAME            MTU  MAC-ADDRESS        ARP      SWITCH 
 2   qsfp56-1-1     1500  04:F4:1C:1A:82:A1  enabled  switch1
 3   qsfp56-1-2     1500  04:F4:1C:1A:82:A2  enabled  switch1
 4   qsfp56-1-3     1500  04:F4:1C:1A:82:A3  enabled  switch1
 5   qsfp56-1-4     1500  04:F4:1C:1A:82:A4  enabled  switch1

# QSFP56-DD
/interface/ethernet/print
Flags: R - RUNNING; S - SLAVE
Columns: NAME, MTU, MAC-ADDRESS, ARP, SWITCH
 #    NAME            MTU  MAC-ADDRESS        ARP      SWITCH
 10   qsfp56-dd-1-1  1500  04:F4:1C:1A:82:91  enabled  switch1
 11   qsfp56-dd-1-2  1500  04:F4:1C:1A:82:92  enabled  switch1
 12   qsfp56-dd-1-3  1500  04:F4:1C:1A:82:93  enabled  switch1
 13   qsfp56-dd-1-4  1500  04:F4:1C:1A:82:94  enabled  switch1
 14   qsfp56-dd-1-5  1500  04:F4:1C:1A:82:95  enabled  switch1
 15   qsfp56-dd-1-6  1500  04:F4:1C:1A:82:96  enabled  switch1
 16   qsfp56-dd-1-7  1500  04:F4:1C:1A:82:97  enabled  switch1
 17   qsfp56-dd-1-8  1500  04:F4:1C:1A:82:98  enabled  switch1
```

这些子接口的配置和监控可能因自动协商、通告速度以及收发器类型（例如分支线缆或单纤）等因素而异。以下各节将针对每种使用场景提供所需配置的指导。

:::warning
禁用或启用任一物理端口子接口都会触发整个端口组重新配置，并重启所有通道。
:::

### QSFP+ {#qsfp}

对于 MikroTik CRS3xx 系列设备，QSFP+ 接口支持以下链路速度：

- 1x 40G
- 4x 10G
- 4x 1G

#### 链路配置 {#link-configuration}

- **40G**：可使用自动协商或强制 40G 速度进行配置。
- **4x10G 和 4x1G**：必须设置为强制速度模式并禁用自动协商。

从 RouterOS 7.12 版本开始，除了选择正确的传输速率外，还必须指定正确的链路模式。例如，DAC（Direct Attach Copper，直连铜缆）可使用 **CR4**，光纤可使用 **SR4-LR4**。

#### 配置示例 {#configuration-examples}

*适用于 RouterOS v7.12 及更高版本：*

```ros
# 1x40G - DAC
/interface/ethernet/set qsfpplus1-1 auto-negotiation=no speed=40G-baseCR4

# 1x40G - Optical
/interface/ethernet/set qsfpplus1-1 auto-negotiation=no speed=40G-baseSR4-LR4

# 4x10G - DAC
/interface/ethernet/set qsfpplus1-1 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfpplus1-2 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfpplus1-3 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfpplus1-4 auto-negotiation=no speed=10G-baseCR  

# 4x10G - Optical
/interface/ethernet/set qsfpplus1-1 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfpplus1-2 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfpplus1-3 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfpplus1-4 auto-negotiation=no speed=10G-baseSR-LR  
```

:::warning
在单链路模式下，只需配置第一个 QSFP+ 子接口，其余子接口应保持启用。
:::

*适用于低于 v7.12 的 RouterOS 版本：*

```routeros
# 1x40G - DAC/Optical
/interface/ethernet/set qsfpplus1-1 auto-negotiation=no speed=40Gbps full-duplex=yes

# 4x10G - DAC/Optical
/interface/ethernet/set qsfpplus1-1 auto-negotiation=no speed=10Gbps full-duplex=yes
/interface/ethernet/set qsfpplus1-2 auto-negotiation=no speed=10Gbps full-duplex=yes
/interface/ethernet/set qsfpplus1-3 auto-negotiation=no speed=10Gbps full-duplex=yes
/interface/ethernet/set qsfpplus1-4 auto-negotiation=no speed=10Gbps full-duplex=yes 
```

### QSFP28 {#qsfp28}

对于 MikroTik CRS5xx 系列和 CCR2216 设备，QSFP28 接口支持以下链路速度：

- 1x 100G。
- 2x 50G（自 RouterOS v7.12 起可用）。
- 1x 40G。
- 4x 25G。
- 4x 10G。
- 4x 1G。

:::warning
不支持：单通道 50G、2x 40G
:::

#### 链路配置 {#link-configuration-1}

- **100G**：可使用自动协商或强制 100G 速度进行配置。
- **2x50G、1x40G、4x25G、4x10G 和 4x1G**：必须设置为强制速度模式并禁用自动协商。

从 RouterOS 7.12 版本开始，除了选择正确的传输速率外，还必须指定正确的链路模式。例如，DAC（Direct Attach Copper，直连铜缆）可使用 **CR4**，光纤可使用 **SR4-LR4**。

#### 配置示例 {#configuration-examples-1}

*适用于 RouterOS v7.12 及更高版本：*

```ros
# 1x100G - DAC
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=100G-baseCR4

# 1x100G - Optical
/interface/ethernet/set qsfp28-2-1 auto-negotiation=no speed=100G-baseSR4-LR4

# 2x50G - DAC
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=50G-baseCR2
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=50G-baseCR2

# 2x50G - Optical
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=50G-baseSR2-LR2
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=50G-baseSR2-LR2

# 4x25G - DAC
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp28-1-2 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp28-1-4 auto-negotiation=no speed=25G-baseCR

# 4x25G - Optical
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp28-1-2 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp28-1-4 auto-negotiation=no speed=25G-baseSR-LR
```

:::warning
在单链路模式下，只需配置第一个 QSFP28 子接口，其余子接口应保持启用。同样，对于 2x50G 链路模式，只需配置主接口（例如 qsfp28-1-1 和 qsfp28-1-3），但其他子接口必须保持启用。
:::

*适用于低于 v7.12 的 RouterOS 版本：*

```ros
# 1x100G - DAC/Optical
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=100Gbps full-duplex=yes

# 4x25G - DAC/Optical
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=25Gbps full-duplex=yes
/interface/ethernet/set qsfp28-1-2 auto-negotiation=no speed=25Gbps full-duplex=yes
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=25Gbps full-duplex=yes
/interface/ethernet/set qsfp28-1-4 auto-negotiation=no speed=25Gbps full-duplex=yes
```

### QSFP56 {#qsfp56}

对于 MikroTik CRS812 设备，QSFP56 接口支持以下链路速度：

- 1x 200G
- 2x 100G
- 4x 50G
- 2x 50G
- 1x 40G
- 4x 25G
- 4x 10G
- 4x 1G

#### 链路配置 {#link-configuration-2}

- **2x100G、4x50G、1x100G、2x50G、1x40G、4x25G、4x10G 和 4x1G**：必须设置为强制速度模式并禁用自动协商。

必须指定正确的链路模式。例如，DAC（Direct Attach Copper，直连铜缆）可使用 **CR4**，光纤可使用 **SR4-LR4**。

#### 配置示例 {#configuration-examples-2}

```ros
# 1x200G - DAC
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=200G-baseCR4

# 1x200G - Optical
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=200G-baseSR4-LR4

# 2x100G - DAC
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=100G-baseCR2
/interface/ethernet/set qsfp56-1-3 auto-negotiation=no speed=100G-baseCR2

# 2x100G - Optical
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=100G-baseSR2-LR2
/interface/ethernet/set qsfp56-1-3 auto-negotiation=no speed=100G-baseSR2-LR2

# 4x50G - DAC
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=50G-baseCR
/interface/ethernet/set qsfp56-1-2 auto-negotiation=no speed=50G-baseCR
/interface/ethernet/set qsfp56-1-3 auto-negotiation=no speed=50G-baseCR
/interface/ethernet/set qsfp56-1-4 auto-negotiation=no speed=50G-baseCR

# 4x50G - Optical
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=50G-baseSR-LR
/interface/ethernet/set qsfp56-1-2 auto-negotiation=no speed=50G-baseSR-LR
/interface/ethernet/set qsfp56-1-3 auto-negotiation=no speed=50G-baseSR-LR
/interface/ethernet/set qsfp56-1-4 auto-negotiation=no speed=50G-baseSR-LR

# 1x100G - DAC
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=100G-baseCR4

# 1x100G - Optical
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=100G-baseSR4-LR4

# 2x50G - DAC
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=50G-baseCR2
/interface/ethernet/set qsfp56-1-3 auto-negotiation=no speed=50G-baseCR2

# 2x50G - Optical
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=50G-baseSR2-LR2
/interface/ethernet/set qsfp56-1-3 auto-negotiation=no speed=50G-baseSR2-LR2

# 4x25G - DAC
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp56-1-2 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp56-1-3 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp56-1-4 auto-negotiation=no speed=25G-baseCR

# 4x25G - Optical
/interface/ethernet/set qsfp56-1-1 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp56-1-2 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp56-1-3 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp56-1-4 auto-negotiation=no speed=25G-baseSR-LR
```

### QSFP56-DD {#qsfp56-dd}

对于 MikroTik CRS812 和 CRS804 设备，QSFP56-DD 接口支持以下链路速度：

- 1x 400G
- 2x 200G
- 4x 100G
- 8x 50G
- 8x 25G
- 2x 40G
- 8x 10G
- 8x 1G

#### 链路配置 {#link-configuration-3}

- **400G**：可使用自动协商或强制 400G 速度进行配置。
- **2x200G、4x100G、8x50G、8x25G、2x40G、8x10G 和 8x1G**：必须设置为强制速度模式并禁用自动协商。

必须指定正确的链路模式。例如，DAC（Direct Attach Copper，直连铜缆）可使用 **CR8**，光纤可使用 **SR8-LR8**。

#### 配置示例 {#configuration-examples-3}

```ros
# 1x400G - DAC
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=400G-baseCR8

# 1x400G - Optical
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=400G-baseSR8-LR8

# 2x200G - DAC
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=200G-baseCR4
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=200G-baseCR4

# 2x200G - Optical
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=200G-baseSR4-LR4
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=200G-baseSR4-LR4

# 4x100G - DAC
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=100G-baseCR2
/interface/ethernet/set qsfp56-dd-1-3 auto-negotiation=no speed=100G-baseCR2
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=100G-baseCR2
/interface/ethernet/set qsfp56-dd-1-7 auto-negotiation=no speed=100G-baseCR2

# 4x100G - Optical
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=100G-baseSR2-LR2
/interface/ethernet/set qsfp56-dd-1-3 auto-negotiation=no speed=100G-baseSR2-LR2
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=100G-baseSR2-LR2
/interface/ethernet/set qsfp56-dd-1-7 auto-negotiation=no speed=100G-baseSR2-LR2

# 8x50G - DAC
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=50G-baseCR
/interface/ethernet/set qsfp56-dd-1-2 auto-negotiation=no speed=50G-baseCR
/interface/ethernet/set qsfp56-dd-1-3 auto-negotiation=no speed=50G-baseCR
/interface/ethernet/set qsfp56-dd-1-4 auto-negotiation=no speed=50G-baseCR
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=50G-baseCR
/interface/ethernet/set qsfp56-dd-1-6 auto-negotiation=no speed=50G-baseCR
/interface/ethernet/set qsfp56-dd-1-7 auto-negotiation=no speed=50G-baseCR
/interface/ethernet/set qsfp56-dd-1-8 auto-negotiation=no speed=50G-baseCR

# 8x50G - Optical
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=50G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-2 auto-negotiation=no speed=50G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-3 auto-negotiation=no speed=50G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-4 auto-negotiation=no speed=50G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=50G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-6 auto-negotiation=no speed=50G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-7 auto-negotiation=no speed=50G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-8 auto-negotiation=no speed=50G-baseSR-LR

# 8x25G - DAC
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp56-dd-1-2 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp56-dd-1-3 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp56-dd-1-4 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp56-dd-1-6 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp56-dd-1-7 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp56-dd-1-8 auto-negotiation=no speed=25G-baseCR

# 8x25G - Optical
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-2 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-3 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-4 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-6 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-7 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-8 auto-negotiation=no speed=25G-baseSR-LR

# 2x40G - DAC
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=40G-baseCR4
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=40G-baseCR4

# 2x40G  - Optical
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=40G-baseSR4-LR4
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=40G-baseSR4-LR4

# 8x10G - DAC
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfp56-dd-1-2 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfp56-dd-1-3 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfp56-dd-1-4 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfp56-dd-1-6 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfp56-dd-1-7 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfp56-dd-1-8 auto-negotiation=no speed=10G-baseCR

# 8x10G - Optical
/interface/ethernet/set qsfp56-dd-1-1 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-2 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-3 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-4 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-5 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-6 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-7 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfp56-dd-1-8 auto-negotiation=no speed=10G-baseSR-LR
```

## QSFP+/QSFP28 接口与 breakout 线缆的兼容性 {#qsfpqsfp28-interface-compatibility-with-breakout-cables}

MikroTik 设备可以使用 breakout 线缆在 QSFP+/QSFP28 与 SFP+/SFP28 端口之间建立链路。

### 配置示例 {#configuration-examples-4}

*适用于 RouterOS v7.12 及更高版本：*

```ros
# QSFP+ - DAC
/interface/ethernet/set qsfpplus1-1 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfpplus1-2 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfpplus1-3 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfpplus1-4 auto-negotiation=no speed=10G-baseCR

# QSFP+ - Optical
/interface/ethernet/set qsfpplus1-1 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfpplus1-2 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfpplus1-3 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfpplus1-4 auto-negotiation=no speed=10G-baseSR-LR

# QSFP28 - DAC
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp28-1-2 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp28-1-4 auto-negotiation=no speed=25G-baseCR

# QSFP28 - Optical
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp28-1-2 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp28-1-4 auto-negotiation=no speed=25G-baseSR-LR

```

也可以使用 QSFP28 转 2x50G QSFP28 Breakout 线缆：

```routeros
# 2x50G - DAC
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=50G-baseCR2
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=50G-baseCR2

# 2x50G - Optical
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=50G-baseSR2-LR2
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=50G-baseSR2-LR2
```

或者为每个 QSFP+/QSFP28 子接口配置不同的速率：

```routeros
# QSFP28 - DAC
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp28-1-2 auto-negotiation=no speed=25G-baseCR
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=10G-baseCR
/interface/ethernet/set qsfp28-1-4 auto-negotiation=no speed=10G-baseCR

# QSFP28 - Optical
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp28-1-2 auto-negotiation=no speed=25G-baseSR-LR
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=10G-baseSR-LR
/interface/ethernet/set qsfp28-1-4 auto-negotiation=no speed=10G-baseSR-LR
```

*适用于低于 v7.12 的 RouterOS 版本：*

```routeros
# QSFP+ - DAC/Optical
/interface/ethernet/set qsfpplus1-1 auto-negotiation=no speed=10Gbps full-duplex=yes
/interface/ethernet/set qsfpplus1-2 auto-negotiation=no speed=10Gbps full-duplex=yes
/interface/ethernet/set qsfpplus1-3 auto-negotiation=no speed=10Gbps full-duplex=yes
/interface/ethernet/set qsfpplus1-4 auto-negotiation=no speed=10Gbps full-duplex=yes

# QSFP28 - DAC/Optical
/interface/ethernet/set qsfp28-1-1 auto-negotiation=no speed=25Gbps full-duplex=yes
/interface/ethernet/set qsfp28-1-2 auto-negotiation=no speed=25Gbps full-duplex=yes
/interface/ethernet/set qsfp28-1-3 auto-negotiation=no speed=25Gbps full-duplex=yes
/interface/ethernet/set qsfp28-1-4 auto-negotiation=no speed=25Gbps full-duplex=yes
```
