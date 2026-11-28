---
title: "产品命名"
description: "MikroTik 产品命名遵循 RouterBOARD 型号的结构化规则，详细说明板卡系列、有线/无线接口、CPU 核心数以及频段和功率等级等无线特性，帮助用户快速识别硬件规格。"
tags:
  - 'routerboard'
  - 'product-naming'
  - 'board-features'
source: https://manual.mikrotik.com/docs/7.24/hardware/product-naming
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

MikroTik 产品命名乍看可能令人困惑，但所有产品代码都遵循逻辑命名规则。理解这一命名结构有助于用户快速识别产品的关键特性和规格。本文档说明 MikroTik 产品代码各部分的含义，并提供示例，帮助你解读任何型号编号。

### RouterBOARD（简称 RB） {#routerboard-short-version-rb}

`<board name> <board features>-<built-in wireless> <wireless card features>-<connector type>-<enclosure type>`

### 板卡名称 {#board-name}

目前，板卡名称有三种类型：

- **3 字符名称**：
  - 第 1 个字符表示系列（可以是数字或字母）；新增：D - Dakota；C - Cypress；S - Chateau；L - Maple；E - Econet；MA - Miami。
  - 第 2 位数字表示可能的 wired 接口数量（Ethernet、SFP、SFP+）。
  - 第 3 位数字表示可能的无线接口数量（内置接口以及 mPCI 和 mPCIe 插槽）。

- **单词** - 当前使用的名称有：**OmniTIK、Groove、SXT、SEXTANT、Metal、LHG、DynaDish、cAP、wAP、LDF、DISC、mANTBox、QRT、hAP、hEX**。如果板卡硬件发生根本性变化（例如采用完全不同的 CPU），将在末尾添加修订版本。

- **特殊命名** - 600、800、1000、1100、1200、2011、3011、4011 板卡是各系列的独立代表，或具有超过 9 个有线接口，因此名称简化为完整的百位数或开发年份。

### 主板特性 {#board-features}

主板特性紧跟在主板名称之后，不使用空格或连字符分隔。例外情况是主板名称为单词；此时，主板特性之间使用空格分隔。

使用以下特性，按出现顺序列出：

- **U** – USB 端口。
- **P** – 带控制器的供电注入。
- **i** – 不带控制器的单端口供电注入器。
- **A** – 额外内存和/或更高许可级别。
- **H** – 性能更强的 CPU。
- **G** – 千兆以太网（可与 U、A 或 H 组合；不与 L 一起使用）。
- **L** – Lite 版本。
- **D** – 额外存储磁盘（SSD 或 M.2）。
- **S** – SFP 端口（用于 SwitchOS 设备的旧用法）。
- **e** – PCIe 接口扩展卡。
- **xN** – CPU 核心数（例如 x2、x16、x36）。
- **R** – 同时具有 USB 和 PCIe 线路的 MiniPCIe 插槽。
- **M** – 同时具有 USB 和 PCIe 线路的 M.2 插槽。

### 内置无线详情 {#built-in-wireless-details}

如果主板具有内置无线功能，则其所有特性均采用以下格式表示：

`<band><power_per_chain><protocol><number_of_chains>`

- **band**：
  - **6** - 6GHz。
  - **5** - 5GHz。
  - **2** - 2.4GHz。
  - **52** - 双频 5GHz 和 2.4GHz。

- **power per chain**：
  - (Not used) - “Normal” - 6Mbps 802.11a 下 &lt;23dBm。6Mbps 802.11g 下 &lt;24dBm。
  - **H** - “High” - 6Mbps 802.11a 下 23-24dBm。6Mbps 802.11g 下 24-27dBm。
  - **HP** - “High Power” - 6Mbps 802.11a 下 25-26dBm。6Mbps 802.11g 下 28-29dBm。
  - **SHP** - “Super High Power” - 6Mbps 802.11a 下 27+dBm。6Mbps 802.11g 下 30+dBm。

- **protocol**：
  - （未使用）- 适用于仅支持 802.11a/b/g 的网卡。
  - **n** - 适用于支持 802.11n 的网卡。
  - **ac** - 适用于支持 802.11ac 的网卡。
  - **ax** - 适用于支持 802.11ax 的网卡。
  - **be** - 适用于支持 802.11be 的网卡。
  - **bn** - 适用于支持 802.11bn 的接口。

- **number\_of\_chains**：
  - （未使用）- 单链。
  - **D** - 双（2）链。
  - **T** - 三（3）链。
  - **Q** - 四（4）链。
  - **P** - 五（5）链。
  - **H** - 六（6）链。
  - **S** - 七（7）链。
  - **O** - 八（8）链。
  - **N** - 九（9）链。
  - **E** - “Ene”（10）链（因为 D 已用于 "deca"）。

- **connector type**：
  - （未使用）- 该型号只有一个连接器选项。
  - **MMCX** - MMCX 连接器类型。
  - **u.FL** - u.FL 连接器类型。

### 外壳类型 {#enclosure-type}

- （未使用）- 产品的主要外壳类型。
- **BU** - 板级单元（无外壳）- 适用于需要仅提供板卡选项，但主产品已带外壳的情况。
- **RM** - 机架式外壳。
- **IN** - 室内外壳。
- **EM** - 扩展内存。
- **LM** - 精简内存。
- **BE** - 黑色版本外壳。
- **TC** - 塔式（立式）外壳（适用于 hEX、hAP 和其他家用路由器）。
- **OUT** - 室外外壳。

## 更具体的 OUT 外壳类型 {#more-specific-types-out-enclosures-are}

- **SA** - 扇区天线外壳（适用于 SXT）。
- **HG** - 高增益天线外壳（适用于 SXT）。
- **BB** - Basebox 外壳（适用于 RB911）。
- **NB** - NetBox 外壳（适用于 RB911）。
- **NM** - NetMetal 外壳（适用于 RB911）。
- **QRT** - QRT 外壳（适用于 RB911）。
- **SX** - Sextant 外壳（适用于 RB911、RB711）。
- **SXTsq -**SXTsq 外壳。
- **PB** - PowerBOX 外壳（适用于 RB750P、RB950P）。
- **XL** - 超大外壳（例如比 LHG 尺寸更大）。
- **LTm** - LtAP mini 外壳。
- **LT** - LtAP 外壳。
- **KN**- KNOT 外壳。

### 示例 {#example}

- RB（RouterBOARD）。
- 912 - 第 9 系列板卡，带 1 个有线（以太网）接口和 2 个无线接口（内置和 mini PCIe）。
- UAG - 带 USB 端口、更大内存和千兆以太网端口。
- 5HPnD - 带内置 5GHz 高功率双链无线网卡，支持 802.11n。

## 2 解码 [RBD52G-5HacD2HnD-TC](https://mikrotik.com/product/hap_ac2) 命名 {#2-decode-rbd52g-5hacd2hnd-tc-naming}

- RouterBOARD（新产品中已弃用）
- D - Dakota 系列 CPU
- 5 - 有线接口
- 2 - 无线接口
- G - 千兆
- 5HacD - 带内置 5GHz 高功率双链无线网卡，支持 802.11ac。
- 2HnD  - 带内置 2.4GHz 高功率双链无线网卡，支持 802.11n。
- TC - 塔式机箱

## 示例 {#example-1}

# 3 解读 [C52iG-5HaxD2HaxD-TC](https://mikrotik.com/product/hap_ax2) 命名 {#3-decode-c52ig-5haxd2haxd-tc-naming}

- C - Cypress 系列 CPU。
- 5 - 有线接口数量。
- 2 - 无线接口数量。
- i - 无控制器的单端口供电注入器。
- G - 千兆。
- 5HaxD - 内置支持 802.11ax 的 5GHz 高功率双链无线网卡。
- 2HaxD - 内置支持 802.11ax 的 2.4GHz 高功率双链无线网卡。
- TC - 塔式机箱。

## CloudCoreRouter 命名详情 {#cloudcorerouter-naming-details}

CloudCoreRouter（简称：CCR）命名由以下部分组成：

`<4 digit number>-<list of ports>-<enclosure type>`

- **4 位数字**：
  - 第 1 位表示系列。
  - 第 2 位（保留）。
  - 第 3-4 位表示设备上的 CPU 核心总数。

- **端口列表**：
  - -n**G** 1G 以太网端口数量。
  - -n**P** 带 PoE-out 的 1G 以太网端口数量。
  - -n**C** combo 1G 以太网/SFP 端口数量。
  - -n**S** 1G SFP 端口数量。
  - -n**G+** 2.5G 以太网端口数量。
  - -n**P+** 带 PoE-out 的 2.5G 以太网端口数量。
  - -n**C+** combo 10G 以太网/SFP+ 端口数量。
  - -n**S+** 10G SFP+ 端口数量。
  - -n**XG** 5G/10G 以太网端口数量。
  - -n**XP** 带 PoE-out 的 5G/10G 以太网端口数量。
  - -n**XC** combo 10G/25G SFP+ 端口数量。
  - -n**XS** 25G SFP+ 端口数量。
  - -n**Q+** 40G QSFP+ 端口数量。
  - -n**XQ** 100G QSFP+ 端口数量。
  - -n**DQ** 200G QSFP56 端口数量。
  - -n**DDQ** 400G QSFP-DD 端口数量。

- **机箱类型** - 与 RouterBOARD 产品相同。

## CloudRouterSwitch 和 CloudSmartSwitch 命名详情 {#cloudrouterswitch-and-cloudsmartswitch-naming-details}

CloudRouterSwitch（简称 CRS，RouterOS 设备）和 CloudSmartSwitch（简称 CSS，SwOS 设备）的命名由以下部分组成：

`<3 digit number>-<list of ports>-<built-in wireless card>-<enclosure type>`

- **3 位数字**：
  - 第 1 位表示系列。
  - 第 2-3 位表示有线接口总数（Ethernet、SFP、SFP+）。

- **端口列表**：
  - -n**F** 100M Ethernet 端口数量。
  - -n**Fi** 带 PoE-out 注入器的 100M Ethernet 端口数量。
  - -n**Fp** 带受控 PoE-out 的 100M Ethernet 端口数量。
  - -n**Fr** 带 Reverse PoE（PoE-in）的 100M Ethernet 端口数量。
  - -n**G** 1G Ethernet 端口数量。
  - -n**P** 带 PoE-out 的 1G Ethernet 端口数量。
  - -n**C** combo 1G Ethernet/SFP 端口数量。
  - -n**S** 1G SFP 端口数量。
  - -n**G+** 2.5G Ethernet 端口数量。
  - -n**P+** 带 PoE-out 的 2.5G Ethernet 端口数量。
  - -n**C+** combo 10G Ethernet/SFP 端口数量。
  - -n**S+** 10G SFP+ 端口数量。
  - -n**XG** 5G/10G Ethernet 端口数量。
  - -n**XP** 带 PoE-out 的 5G/10G Ethernet 端口数量。
  - -n**XC** combo 10G/25G SFP+ 端口数量。
  - -n**XS** 25G SFP+ 端口数量。
  - -n**Q+** 40G QSFP+ 端口数量。
  - -n**XQ** 100G QSFP+ 端口数量。
  - n**DQ** 200G QSFP56 端口数量。
  - -n**DDQ** 400G QSFP-DD 端口数量。
  - `-nP` 表示支持 IEEE 802.3af/at（PoE / PoE+）的 PoE-out 端口。
  - -`<n>B` 表示支持 IEEE 802.3af/at/bt 的 PoE-out 端口（包括 PoE++ / 802.3bt 大功率 PoE）。

- **内置无线网卡** - 与 RouterBOARD 产品相同。

- **机箱类型** - 与 RouterBOARD 产品相同。
