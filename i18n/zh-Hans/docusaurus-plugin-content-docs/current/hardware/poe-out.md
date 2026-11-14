---
sidebar_key: "hardware/poe-out"
sidebar_position: 7
title: "PoE"
sidebar_label: "PoE"
description: "本页介绍 MikroTik 设备上的 PoE（以太网供电）：支持的标准和功率等级，在 RouterOS 和 SwOS 中配置和监控 PoE out（PSE）与 PoE in（PD）端口，以及日志记录、警告、示例和故障排除。"
tags:
  - 'poe'
  - 'power-over-ethernet'
source: https://manual.mikrotik.com/docs/hardware/poe-out
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

本页介绍 MikroTik 设备上的 PoE(以太网供电):使用 **PoE out** 端口为其他设备供电(此时设备作为 PSE,即供电设备),以及在某些型号上通过 **PoE in** 端口被供电(此时设备作为 PD,即受电设备)。MikroTik 设备使用 RJ45 Mode B 引脚定义进行供电,PoE 通过引脚 4 和 5(+)以及引脚 7 和 8(-)提供。

## MikroTik 支持的 PoE 标准 {#mikrotik-supported-poe-standards}

MikroTik 设备可以支持以下部分或全部 PoE 标准——既用于为其他设备供电(PoE out,设备作为 PSE),在某些型号上也用于自身被供电(PoE in,设备作为 PD):

- **最高 30 V 的无源 PoE** - 无源 PoE,PSE(供电设备)与 PD(受电设备)之间没有协商。PoE out 端口输出的电压与提供给 PSE 本身的电压相同。适用于支持最高 30 V 输入电压的设备。(例如 [hEX PoE lite](https://mikrotik.com/product/RB750UPr2)、[RB3011UiAS-RM](https://mikrotik.com/product/RB3011UiAS-RM)、[RB2011iL-IN](https://mikrotik.com/product/RB2011iL-IN)。)

- **最高 57 V 的无源 PoE** - 工作原理与低压(最高 30 V)无源 PoE 相同,但可以通过 PoE 端口提供或接受更高的电压。对于 PoE out,输出电压取决于连接到 PSE 的电源。它也可以为兼容 af/at、通过 4,5(+) 和 7,8(-) 线对接受供电且不需要 PoE 协商的 PD 供电。(例如 [cAP ac](https://mikrotik.com/product/cap_ac)、[hAP ac](https://mikrotik.com/product/RB962UiGS-5HacT2HnT)、[wsAP ac lite](https://mikrotik.com/product/wsap_ac_lite)。)

- **IEEE 802.3af/at 标准** - 也称为 PoE(802.3af,Type 1)和 PoE+(802.3at,Type 2),这些 IEEE 标准确保不同厂商之间的兼容性。支持这些标准的 PSE 可以为 Type 1 和 Type 2 PD 供电,支持这些标准的 PD 可以由任何符合标准的 PSE 供电。(例如 [CRS112-8P-4S-IN](https://mikrotik.com/product/crs112_8p_4s_in)、[CRS328-24P-4S+RM](https://mikrotik.com/product/crs328_24p_4s_rm)、[CRS354-48P-4S+2Q+RM](https://mikrotik.com/product/crs354_48p_4s_2q_rm)。)

- **IEEE 802.3bt 标准** - 802.3bt 标准也称为 PoE++,它扩展了早期的 PoE 标准,并引入了 "Type 3"(Class 5-6)和 "Type 4"(Class 7-8)。该标准使用千兆以太网电缆中的全部四对线来传输电力,因此得名 4PPoE/802.3bt("4-pair Power over Ethernet")。视型号而定,802.3bt 用于 PoE out、PoE in 或两者兼有。(例如 [CRS320-8P-8B-4S+RM](https://mikrotik.com/product/crs320_8p_8b_4s_rm))

每个 PoE out 实现都支持过载和短路检测。

### 功率等级 {#power-classes}

802.3 PoE 标准定义了功率等级,用于描述 PSE 向 PD 提供的最大功率:

| 等级 | 标准 | PSE 输出功率 | PD 可用功率 |
| :-- | :-- | :-- | :-- |
| 0-3 | 802.3af(Type 1) | 15.4 W | 12.95 W |
| 4 | 802.3at(Type 2) | 30 W | 25.5 W |
| 5 | 802.3bt(Type 3) | 45 W | 40 W |
| 6 | 802.3bt(Type 3) | 60 W | 51 W |
| 7 | 802.3bt(Type 4) | 75 W | 62 W |
| 8 | 802.3bt(Type 4) | 90 W | 71.3 W |

PSE 和 PD 使用功率等级来商定可以传输多少功率:PD 发出其等级信号,PSE 随后分配相应的功率预算。

您可以从设备的规格页面判断它支持哪种无源 PoE 标准:"PoE-OUT" 部分下的 **`Low voltage PoE-Out current limit`** 条目表示该设备支持**最高 30 V 的无源 PoE**,如果还有 **`High voltage PoE-Out current limit`** 条目,则表示它同时支持**最高 57 V 的无源 PoE**。支持的 IEEE 标准会直接列在规格页面上,如 `PoE out`(例如 802.3af/at 或 802.3bt)。

如上面的列表所述,**最高 57 V 的无源 PoE** 也可以为兼容 802.3af/at、不需要 PoE 协商的设备(PD)供电——对于 MikroTik PD,这可以可靠工作。但是,第三方 PD 在没有协商时可能会将自己归入较低的 PoE 等级,并请求比其本来可以使用的更少的功率——这可能表现为射频输出功率降低、外设被禁用等类似症状。不同 PD 的行为有所不同。

## 配置 {#configuration}

所有带 PoE 接口的 MikroTik 设备都支持 PoE 配置。可以在 RouterOS 和 SwOS 界面中进行编辑。

### RouterOS {#routeros}

**子菜单：** `/interface/ethernet/poe`

#### 用法 {#usage}

RouterOS 提供了通过 Winbox、Webfig 和 CLI 配置和监控 PoE 的选项。使用 CLI 的基本命令如下

| 属性 | 描述 |
| :-- | :-- |
| **print** () | 打印与 PoE 相关的设置。 |
| **export** () | PoE 配置导出在 `/interface/ethernet` 菜单下。 |
| **monitor** (*string\| interface*) | 监控指定端口的 PoE 状态——PoE out 端口上的 `poe-out-status`、电压、电流和功率,PoE in 端口上协商得到的功率相关信息。可以用 `/interface/ethernet/poe/monitor [find]` 监控所有端口。 |
| **power-cycle** (*duration: 0..1m*; 默认值：**5s**) | 在指定时间段内关闭 PoE out 端口的 PoE 输出供电。 |

### SwOS {#swos}

SwOS 界面提供基本的 PoE out 配置和监控选项,更多详情请参见 [SwOS 手册](../bridging-and-switching/swos/index.md)。

## 监控 {#monitoring}

**子菜单：** `/interface/ethernet/poe/monitor`

| 属性 | 描述 |
| :-- | :-- |
| **name** () | 接口名称。 |
| **port-type** () | 显示该接口是否支持 PoE out、PoE in 或两者(**poe-out**、**poe-in**、**poe-in/poe-out**)。 |
| **poe-out** () | 显示 PoE out 状态。 |
| **poe-voltage** () | 显示 PoE out 电压选择(**auto**、**low**、**high**)。 |
| **poe-out-status** () | 显示端口上当前的 PoE out 状态(参见下方的[状态列表](#poe-out-statuses))。 |
| **poe-out-voltage** () | 显示施加到 PD 的电压。 |
| **poe-out-current** () | 显示 PD 拉取的端口电流(mA)。 |
| **poe-out-power** () | 显示 PD 功耗。 |
| **poe-out-power-pair()** | 显示 PSE 在哪些电源线对上向 PD 供电:**a** - 1,2 (+) 3,6 (-);**b** - 4,5 (+) 7,8 (-);**bt** - 全部 4 对线。 |
| **power-cycle-host-alive** (*yes \| no*) | 显示被监控的主机是否可达(在启用 [power-cycle-ping](#power-cycle-settings) 功能时显示)。只读。 |
| **power-cycle-after** (*time*) | 显示端口将在多久之后进行电源循环(在启用 [power-cycle-ping](#power-cycle-settings) 功能时显示)。只读。 |

#### PoE out 状态 {#poe-out-statuses}

- **powered-on** - 端口已施加电源，PoE out 正常工作。
- **waiting-for-load** - PSE 尝试检测是否可以向端口施加电源。为了供电，电阻应在 3kΩ 到 26.5kΩ 范围内。
- **short-circuit** - 在 PoE out 端口上检测到短路；电源被关闭，仅进行低电压检测。这也可能意味着连接的设备不支持 PoE。
- **overload** - 超过 PoE out 电流限制，端口电源被关闭。有关端口限制，请参阅各型号的规格。
- **voltage-too-low** - PD 无法使用 PSE 提供的电压供电（例如，Vmin =>30V，但仅提供 24V）。
- **voltage-too-high** - 连接的设备被检测为 PoE in 设备，但 PSE 的输出电压高于 PD 支持的范围。
- **current-too-low** - PD 抽取的电流（低于 10 mA）低于正常 PoE out 设备应有的电流。
- **no-valid-PSU** - 未检测到有效的电源单元：PSE 没有足够或具备相应功率能力的电源来为该端口提供 PoE out，因此不施加电源。支持的电源组合见[供电要求](#powering-requirements)。
- **lldp-power-off** - 板卡通过 PoE in 受电，且从上游 PSE 收到的 LLDP 批准功率预算不足以给板卡自身的 PoE out 端口供电。
- **low-voltage-pd-detected** - 连接的 PD 仅支持低电压，无法使用当前选择的电压从此 PSE 受电。为避免损坏 PD，不施加电源。请使用低压 PSE 为该 PD 供电，或在具有可切换电压模式的 PSE 上将端口切换为低电压（`poe-voltage=low`）。
- **voltage-on-poe-in** - 意外在 PoE out 端口上检测到电压，这可能发生在两种情况下：
  - **外部电源** - 另一台设备正在向该端口供电（PoE in 电压）。
  - **内部故障** - 该端口上的 PoE out 电路可能已损坏。
- **low-voltage-too-low** - PSE 上的低输入电压过低，无法为 PD 供电；不施加电源。
- **disabled** - 该端口的所有检测和电源均已关闭（`poe-out=off`）。
- **power_reset** - PSE 控制器正在复位电源，例如在 PoE 控制器升级期间、执行电源循环命令时或 ping 失败时（power-cycle-ping）。
- **controller-init** - PSE 控制器初始化。
- **controller-upgrade** - PSE 控制器正在升级。
- **controller-error** - PSE 控制器无响应。

### PoE in 端口 {#poe-in-ports}

:::note
PoE in 监控仅在支持带 LLDP 的 PoE in 的设备上可用。较旧的设备不会在监控中显示 PoE in 端口。
:::

监控 **PoE in** 端口(`port-type: poe-in`)时,监控会显示设备通过 PoE 接收的电力的信息,例如在支持 802.3bt PoE in 的板卡上:

```ros
/interface/ethernet/poe/monitor ether1
```

```
              name: ether1
         port-type: poe-in
```

监控还可能显示 `power-limiting port` 消息。这表示 PD(本设备)在受限功率下供电,因为 LLDP 协商批准的功率低于 PD 请求的功率。

### SNMP {#snmp}

可以使用 SNMP 协议监控 PoE out 数值。必须在 PSE 上启用 [SNMP](../diagnostics-monitoring-and-troubleshooting/snmp.md)。

可用的 SNMP OID:

| OID | 值 |
| :-- | :-- |
| 1.3.6.1.4.1.14988.1.1.15.1.1.1 | 接口 ID |
| 1.3.6.1.4.1.14988.1.1.15.1.1.2 | 接口名称 |
| 1.3.6.1.4.1.14988.1.1.15.1.1.3 | PoE out 状态(与 [monitor](#monitoring) `poe-out-status` 显示的值相同) |
| 1.3.6.1.4.1.14988.1.1.15.1.1.4 | 电压,单位 dV(分伏) |
| 1.3.6.1.4.1.14988.1.1.15.1.1.5 | 电流,单位 mA |
| 1.3.6.1.4.1.14988.1.1.15.1.1.6 | 功耗,单位 dW(分瓦) |

也可以从 RouterOS 请求 SNMP 数值,例如 `snmp-walk` 会打印所有可用 PoE out 端口的当前电流 mA:

```ros
/tool/snmp-walk address=10.155.149.252 oid=1.3.6.1.4.1.14988.1.1.15.1.1.5
```

要获取非常具体的 OID 值,请使用 `snmp-get` 工具(显示 ether3 接口上的当前 mA):

```ros
/tool/snmp-get address=10.155.149.252 oid=1.3.6.1.4.1.14988.1.1.15.1.1.5.3
```

## 日志与通知 {#logging-and-notifications}

### 日志 {#logging}

PoE 事件默认会被[记录](../diagnostics-monitoring-and-troubleshooting/log/index.md)。PoE out 状态变化使用 `poe-out` 主题,PoE in 事件(例如通过 PoE 供电的板卡上的 LLDP 功率协商)使用 `poe-in` 主题。重要事件(例如过载或短路)以 "warning" 主题记录,信息性状态变化以 "info" 主题记录,例如:

```
2026-10-08 11:42:45 poe-out,info ether16 detected poe-out status: on
```

为避免在 PD 因 current-too-low 而未供电时产生不必要的日志,RouterOS 会过滤此类事件,每 512 次 current-too-low 事件才记录一条日志。

`poe-out` 和 `poe-in` 主题遵循标准[日志](../diagnostics-monitoring-and-troubleshooting/log/index.md)机制——它们可以像其他任何主题一样被排除、按严重程度过滤,或发送到单独的日志目标。

详细的 LLDP 功率协商消息使用 "debug" 主题,例如:

```
06:56:50 poe-out,debug ether4 LLDP TLV 25.0W request denied : hw-limit
```

可能的 LLDP 功率请求被拒绝的原因:

| 原因 | 描述 |
| :-- | :-- |
| **budget** | 请求的功率超过 PSE 的总预算。 |
| **hw-limit** | 请求的功率超过硬件支持的上限(受 PSU 影响)。 |
| **low-voltage** | 向低压端口发起 LLDP 请求。 |
| **off** | 端口已关闭。 |
| **class-limit** | LLDP 请求的功率超过该等级所能提供的功率。 |
| **cmd-failed** | RouterOS 无法向控制器发出请求。 |

### GUI/CLI 警告 {#guicli-warnings}

重要的 PoE 相关问题会以警告形式显示:在 Winbox / WebFig 的接口列表(Interfaces 下)、CLI 接口打印输出中的标志注释、[monitor](#monitoring) 中的端口状态,以及[日志](#logging-and-notifications)中。

触发警告的 PoE out 状态:

| 状态 | 描述 |
| :-- | :-- |
| **overload** | 超过 PoE out 电流限制。 |
| **short-circuit** | 在端口上检测到短路。 |
| **current-too-low** | 所连接的 PD 拉取的电流低于应有值。 |
| **voltage-on-poe-in** | 在端口上检测到意外电压(例如另一台设备正在向它供电)。 |

## PoE 输出 {#poe-out}

### 如何选择 PoE PSE {#how-to-choose-your-poe-pse}

此表可帮助您选择最适合需求的 PSE 设备。

<WideTable>

| 设备名称 | 软件 | PoE out 端口数 | PoE 类型 | 电源输入 | 低压 PoE out 电流限制,A | 高压 PoE out 电流限制,A | 最大总输出功率,W |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **OmniTIK 5 PoE** | RouterOS | 4 | 无源 | 仅 PoE in(11-30 V) | 1 |  | 60 |
| **RB260GSP** | SwOS | 4 | 无源 | DC 插孔 / PoE in(11-30 V) | 1 |  | 60 |
| **hEX PoE lite / PowerBox** | RouterOS | 4 | 无源 | DC 插孔 / PoE in(8-30 V) | 1 | - | 60 |
| **OmniTIK 5 PoE ac** | RouterOS | 4 | 无源、af/at | 仅 PoE in(12-57 V) | 1 | 0.45 | 102 |
| **hEX PoE / PowerBox Pro** | RouterOS | 4 | 无源、af/at | DC 插孔 / PoE in(12-57 V) | 1 | 0.45 | 102 |
| **RB5009UPr+S+** | RouterOS | 8 | 无源、af/at | DC 插孔 / 2 针 / PoE in(24-57 V) | 0.9 | 0.44 | 130 |
| **netPower Lite 8P** | SwOS | 8 | 无源、af/at | 3× 2 针端子(24-57 V) | 1 | 0.64 | 120 |
| **CRS112-8P-4S-IN** | RouterOS | 8 | 无源、af/at | 2× DC 插孔(18-28 V / 48-57 V) | 1 | 0.45 | 150 |
| **CRS418-8P-8G-2S+RM** | RouterOS | 8 | 无源、af/at | AC(2 个 PSU 插槽) | 1.1 | 0.56 | 150 |
| **CSS610-8P-2S+IN** | SwOS | 8 | 无源、af/at | AC &amp; DC 48-57 V | 1 | 0.625 | 140 |
| **CRS320-8P-8B-4S+RM** | RouterOS / SwOS | 16 | 无源、af/at、bt | AC(2 个 PSU 插槽) | - | 0.56 (af/at) / 1.67 (bt) | 963 |
| **netPower 16P** | RouterOS / SwOS | 16 | 无源、af/at | 2× DC 插孔(18-30 V / 48-57 V) | 1.1 | 0.6 | 160 |
| **CRS328-24P-4S+RM** | RouterOS / SwOS | 24 | 无源、af/at | AC | 1 | 0.45 | 450 |
| **CRS354-48P-4S+2Q+RM** | RouterOS / SwOS | 48 | 无源、af/at | AC | 1 | 0.57 | 700 |

</WideTable>

:::tip
使用 PoE out 为其他设备供电时,请使用至少 18V 的输入电压。
:::

### 设置 {#settings}

#### 全局设置 {#global-settings}

**子菜单：** `/interface/ethernet/poe/settings`

某些 MikroTik PoE out 设备支持全局 PoE 设置

| 属性 | 说明 |
| :-- | :-- |
| **ether1-poe-in-long-cable** (*yes \| no*) | 当设备自身通过长线缆以 PoE in 供电时，将其设置为 "yes"。它会禁用严格的输入电流监测（短路检测），以免长线缆被错误地检测为短路。**这是一项潜在危险的设置，应谨慎使用。** 它还可能影响由 DC 接头供电的 PSE 的 PoE out 行为 |
| <strong>psuX-max-power</strong><br/><strong>jack-max-power</strong><br/><strong>2pin-max-power</strong> | 指定可从给定电源（PSU、DC 插孔或 2 针端子）获取的最大功率（瓦特）。默认值：**96W** |
| **poe-in-max-power** | 指定当设备（PSE）自身通过 PoE in 供电时，PoE 注入器（例如 802.3bt）可提供的最大功率（瓦特） |
| **routerboard-max-self-power** | 指定设备为自身供电预留的功率。只读。 |
| **routerboard-max-total-power** | 板卡自身的最大功耗，不含 PoE out。它用于在 PoE 预算由 PSU 功率决定的设备上计算 PoE out 预算（PoE 预算 = PSU 功率 − 板卡功率）。只读。 |
| **poe-out-limit-power** | PoE out 总预算上限。只读。 |
| <strong>psuX-poe-out-max-power</strong><br/><strong>jack-poe-out-max-power</strong><br/><strong>2pin-poe-out-max-power</strong><br/><strong>poe-in-poe-out-max-power</strong> | 每个电源（PSU、DC 插孔、2 针端子或 PoE in 注入器）的 PoE out 限制（瓦特）。只读。 |
| **version** | PoE 控制器（ATtiny）固件版本。只读。 |

#### 端口设置 {#port-settings}

**子菜单：** `/interface/ethernet/poe`

可以在此菜单中按端口配置 PoE out。每个端口都可以独立控制。

| 属性 | 描述 |
| :-- | :-- |
| **name** () | 接口名称。 |
| **port-type** () | 显示该端口是否支持 PoE out、PoE in 或两者(poe-out、poe-in、poe-in/poe-out)。只读。 |
| **poe-out** (*auto-on \| forced-on \| forced-on-a \| forced-on-bt \| off*; 默认值：**auto-on**) | 指定 PoE out 状态。auto-on - 首先检查端口上的电阻,仅当电阻在 3kΩ 到 26.5kΩ 范围内时才施加电源。forced-on - 禁用电阻检测,并始终在 B 对(alt)上提供电源。off - 该端口的所有检测和供电均被关闭。在支持 802.3bt PoE out 的 PSE 上的附加状态:forced-on-a - 与 forced-on 相同,但在 A 对(main)上提供电源。forced-on-bt - 与 forced-on 相同,但在全部 4 对线上提供电源(仅可从 CLI 使用,无法在 Winbox/WebFig 中选择此状态)。**注意:** 无论选择哪种 PoE out 状态,短路和过载保护始终开启。 |
| **poe-priority** (*integer: 0..99*; 默认值：**10**) | poe-priority 指定 PoE out 端口的重要性,当达到 PoE out 总限制时,端口优先级最低的接口将首先被断电。最高优先级为 0,最低优先级为 99。如果有 2 个或更多端口具有相同优先级,则端口号最小的端口优先级更高。每 6 秒会检查一次因端口优先级而被关闭的端口是否可以提供 PoE out。 |
| **poe-voltage** (*auto \| low \| high*; 默认值：**auto**) | 此功能允许在 PoE out 端口上手动切换两种电压输出。它仅对具有可切换电压模式的 PSE 生效([CRS112-8P-4S-IN](https://mikrotik.com/product/crs112_8p_4s_in)、[CRS328-24P-4S+RM](https://mikrotik.com/product/crs328_24p_4s_rm)、[netPower 16P](https://mikrotik.com/product/netpower_16p)、[CRS354-48P-4S+2Q+RM](https://mikrotik.com/product/crs354_48p_4s_2q_rm))。 |

从 RouterOS 7.15 开始,旧的 **poe-lldp-enabled** 端口属性已被移除。PSE 与 PD 之间的 LLDP 功率协商通过[邻居发现](../cli-reference/ip/neighbor/discovery-settings.md)的 `lldp-poe-power` 属性进行配置。

#### 电源循环设置 {#power-cycle-settings}

RouterOS 提供了使用 ping 监控 PD,并在主机无响应时对 PoE out 端口进行电源循环的功能。power-cycle-ping 功能可以在 `/interface/ethernet/poe` 菜单下启用。

| 属性 | 描述 |
| :-- | :-- |
| **power-cycle-ping-enabled** (*yes \| no*; 默认值：**no**) | 启用 ping 看门狗,如果主机不响应 ICMP 或 MAC-Telnet 数据包,则对端口进行电源循环。 |
| **power-cycle-ping-address** (*IPv4 \| IPv6 \| MAC*) | 将被监控的地址。从 RouterOS 6.46beta16 开始,如果配置了 IP 地址,则需要有一条通往 PD 的活动路由,因此请确保 PSE 可以访问 PD。如果指定的是 MAC 地址,PSE 将仅从指定的以太网接口发送 MAC-Telnet ping 请求。在配置 [bridge vlan-filtering](../bridging-and-switching/index.md#bridge-vlan-filtering) 或某种 [VLAN 交换](../bridging-and-switching/user-guides/basic-vlan-switching.md)时,建议使用 IP 地址来监控您的 PD。 |
| **power-cycle-ping-timeout** (*time: 0..1h*; 默认值：**5s**) | 如果主机在超过该超时时间后仍无响应,则 PoE out 端口会关闭 5s。 |
| **power-cycle-interval** (*time \| none*; 默认值：**none**) | 每隔指定间隔定期对 PoE out 端口进行电源循环(关闭电源 5s 后再开启)。与 power-cycle-ping 功能无关。 |

如果启用了 power-cycle-ping 功能,[监控](#monitoring)还会显示被监控主机的状态以及距离下次电源循环的时间。

### LEDs {#leds}

大多数设备为每个端口用一个 LED 指示 PoE out 状态——同一个 LED 可以以不同颜色亮起:

| LED | PoE out 状态 |
| :-- | :-- |
| 红色 | **Powered-on** - 在不支持电压选择的型号上无论电压如何都显示红色;在支持电压选择的型号和 802.3bt 型号上,表示 PD 由高压(802.3af/at)供电 |
| 绿色 | **Powered-on**,PD 使用低压(具有可选电压输出的型号) |
| 紫色 | **Powered-on**,PD 通过全部 4 对线供电(802.3bt) |
| 闪烁(任意颜色) | **Short-circuit** 或 **overload** |

#### 特定型号的 LED 行为 {#model-specific-led-behavior}

- [CRS112-8P-4S-IN](https://mikrotik.com/product/crs112_8p_4s_in)、[netPower 16P](https://mikrotik.com/product/netpower_16p) - 所有 PoE LED 闪烁:其中一个端口插入了电压不正确的 PSU。

### 工作原理 {#how-it-works}

#### PoE out 模式 {#poe-out-modes}

- **auto-on** - 板卡检查所连接端口上的电阻,仅当电阻在 3kΩ 到 26.5kΩ 范围内时才施加电源:
  - 施加电源后,PSE 会持续检查过载和短路;
  - 如果电缆被拔出,端口会返回检测状态并保持关闭,直到再次检测到合适的 PD。
- **forced-on** - 禁用电阻检测,即使没有连接电缆也会施加电源:
  - 根据配置的 `poe-out` 状态(`forced-on`、`forced-on-a` 或 `forced-on-bt`)在线对上施加电源;
  - PSE 仍会持续检查过载和短路;
  - 电缆拔出后,端口仍保持供电。
- **off** - 端口上的 PoE out 被关闭,不进行检测,该接口的行为类似于普通以太网端口。

#### PoE out 限制 {#poe-out-limits}

以下 PoE out 特性因 PSE 型号而异——请查看设备的规格页面:

- **端口限制** - PoE out 端口受特定电压下支持的最大电流限制。低压设备(最高 30 V)和高压设备的最大电流通常不同。
- **总限制** - PSE 还有 PoE out 总电流限制,即使单个端口限制允许,也不能超过该总限制。总限制的范围因型号而异:在限制按端口组(例如每 8 端口段)计算的板卡上,功率优先级也在该端口组内生效。
- **极性** - 大多数 MikroTik PSE 使用相同的 PoE out 引脚极性,[Mode B](https://en.wikipedia.org/wiki/Power_over_Ethernet#Pinouts) - 4,5 (+) 和 7,8 (-)。具有 802.3bt 端口的 PSE 使用两种极性:1,2 (+) 和 3,6 (-) 作为 Mode A,4,5 (+) 和 7,8 (-) 作为 Mode B。

#### 安全性 {#safety}

PSE 具有以下安全特性:

- **兼容性检测** - 在 auto-on 模式下,首先检查端口上的电阻,仅当电阻在 3kΩ 到 26.5kΩ 的允许范围内时才施加电源。超出此范围的非标准 PD 不会获得供电。
- **过载保护** - 当 PoE out 端口通电时,会持续检查是否过载。如果检测到过载,会关闭该端口的 PoE out 以避免损坏 PD 或 PSE,并在几秒后再次开启以检查情况是否发生变化。
- **短路检测** - 当 PoE out 端口施加电源时,PSE 会持续检查是否短路。如果检测到短路,会关闭该端口的电源以避免对 PD 和 PSE 造成进一步损坏,并持续检查该端口,直到环境恢复正常。

#### 特定型号的功能 {#model-specific-features}

某些 PSE 具有独立的 8 端口段。在此类设备上,PoE out 独立于 RouterOS 运行:您可以重启或升级 RouterOS,而受电设备不会断电。例外情况是 PoE 控制器固件升级,在此期间电源会中断——此类升级总会在 RouterOS 变更日志中提及。

PoE 预算的定义方式也因型号而异:在某些设备上,预算限制针对整个板卡设置,在另一些设备上则按 8 端口段设置。同样,PoE out 优先级在预算范围内生效:在按段设置预算的板卡上,优先级按段应用;在按整板设置预算的板卡上,优先级全局应用。

## PoE 输入 {#poe-in}

MikroTik 设备也可以自身通过以太网供电,充当 PD(受电设备)。PoE in 端口在同一个 `/interface/ethernet/poe` 菜单中管理,可以在监控输出中通过 `port-type: poe-in` 识别。

### 配置 {#configuration-1}

PoE in 相关选项是[全局设置](#global-settings)的一部分,例如:

- **poe-in-max-power** - 告知设备为其供电的 PoE 注入器(例如 802.3bt)的最大功率,以便正确计算 PoE out 预算;
- **ether1-poe-in-long-cable** - 当设备通过长电缆供电时,禁用严格的输入/输出电流监控。

### 供电要求 {#powering-requirements}

通过 PoE in 为设备供电时,电源必须与设备的输入相匹配。请查看设备规格页面以了解支持的 PoE in 电压范围和标准:

- PSU 或 PoE 注入器的输出电压必须在设备的输入电压范围内(例如无源 PoE 型号上的 8-30 V 或 12-57 V)。电压过低可能导致设备无法启动或在负载下重启,电压过高则可能损坏设备。
- 电源必须提供足够的功率供设备自身使用,如果设备还为其他设备供电,还要满足 PoE out 预算——请参见 [PoE out 限制](#poe-out-limits)和[设置](#global-settings)了解预算的计算方式。
- MikroTik 设备上的无源 PoE in 使用 Mode B 极性(引脚 4,5 (+) 和 7,8 (-)),但具有 802.3bt PoE in 的设备除外,它们接受全部四对线的供电。
- 使用 802.3af/at PSE 或无源 2 对线注入器为支持 PoE out 和 802.3bt(PoE++)PoE in 的设备供电不被视为有效电源:PoE out 将无法工作,监控会在 PoE out 端口上显示 `no-valid-PSU` 状态。请改用 802.3bt PSE 或 4 对线无源注入器。

当设备本身通过 PoE 供电并使用 LLDP 功率协商时(参见[邻居发现](../cli-reference/ip/neighbor/discovery-settings.md)的 `lldp-poe-power`),设备会将其请求的功率告知上游 PSE,由上游 PSE 相应地批准功率。如果批准的功率低于请求的功率,监控会显示 `power-limiting port` 消息(参见 [PoE in 端口](#poe-in-ports)),并且某些 PoE out 端口可能不会供电。

## 示例 {#examples}

### PoE 输出 {#poe-out-1}

#### 为非标准 PD 供电(forced-on) {#powering-non-standard-pds-forced-on}

在 `auto-on` 模式下,不呈现所需电阻(3kΩ 到 26.5kΩ)的 PD 不会获得供电。请改用 `forced-on` 为其供电:

```ros
/interface/ethernet/poe set ether5 poe-out=forced-on
```

在支持 802.3bt 的 PSE 上,`forced-on-a` 和 `forced-on-bt` 通过 A 对或全部四对线为 PD 供电(仅限 CLI,参见[端口设置](#port-settings))。为节省电力并提高安全性,请使用 `poe-out=off` 关闭未使用端口上的 PoE out。

#### 端口优先级 {#port-priorities}

PoE out 优先级定义了达到 PoE out 总限制时哪些端口会首先断电。优先级 *0* 最高,*99* 最低:

```ros
/interface/ethernet/poe set ether2 poe-priority=10
/interface/ethernet/poe set ether3 poe-priority=13
/interface/ethernet/poe set ether4 poe-priority=11
/interface/ethernet/poe set ether5 poe-priority=14
```

如果超出总限制,优先级最低的端口会首先被禁用(ether5,然后是 ether3)。被禁用的端口每隔几秒会重新检查,一旦预算允许,会按相反顺序重新供电。

当多个端口具有相同优先级时,端口号最小的端口优先:在所有端口优先级相同的情况下,ether5 首先被禁用,然后是 ether4,然后是 ether3。

#### 定时电源循环 {#scheduled-power-cycle}

使用 [power-cycle-interval](#power-cycle-settings) 定期对 PoE out 端口进行电源循环,例如每天重启一次所连接的设备:

```ros
/interface/ethernet/poe set ether5 power-cycle-interval=1d
```

#### 电源循环看门狗(power-cycle-ping) {#power-cycle-watchdog-power-cycle-ping}

监控所连接的 PD,并在主机无响应时对该端口进行电源循环:

```ros
/interface/ethernet/poe set ether1 power-cycle-ping-enabled=yes power-cycle-ping-address=192.168.88.10 power-cycle-ping-timeout=30s
```

ether1 上的 PD 通过 ICMP ping 进行监控。如果 192.168.88.10 上的主机在超过 30s 内无响应,该端口的 PoE out 会关闭 5s。

#### 监控 PoE out {#monitoring-poe-out}

```ros
/interface/ethernet/poe/monitor ether9
```

```
                name: ether9
             poe-out: auto-on
      poe-out-status: powered-on
     poe-out-voltage: 54.2V
     poe-out-current: 449mA
       poe-out-power: 24.3W
  poe-out-power-pair: b
```

#### 检查功率限制 {#checking-the-power-limits}

使用全局设置查看 PoE out 预算和设备的只读功率限制:

```ros
/interface/ethernet/poe settings print
```

```
               jack-max-power: 96W
               2pin-max-power: 150W
   routerboard-max-self-power: 20W
  routerboard-max-total-power: 30W
          poe-out-limit-power: 240W
       jack-poe-out-max-power: 66W
       2pin-poe-out-max-power: 120W
```

在本示例中,板卡自身预留 20 W,PoE out 的总预算为 240 W,其中通过 DC 插孔供电时可使用 66 W,或通过 2 针端子供电时可使用 120 W。

### PoE 输入 {#poe-in-1}

当设备本身由 PoE 注入器(例如 802.3bt)供电时,请使用 [poe-in-max-power](#global-settings) 全局设置声明注入器的功率,以便正确计算 PoE out 预算:

```ros
/interface/ethernet/poe settings set poe-in-max-power=144
```

## 故障排除 {#troubleshooting}

如果 PD 在使用 PoE out 供电时无法启动或意外重启,请按以下检查清单逐项排查:

1. **首先检查端口状态。** 在该端口上运行 `/interface/ethernet/poe/monitor`——`poe-out-status` 的值通常直接指出问题所在,例如 `overload`、`short-circuit`、`voltage-too-low` 或 `no-valid-PSU`。参见完整的[状态列表](#poe-out-statuses)。
2. **检查日志。** PoE 状态变化以 `poe-out` 主题记录,参见[日志](#logging)。
3. **尝试更换电缆。** 直接在 PSE 上使用短的高质量跳线,以排除布线问题。
4. **检查 PSE 的电源。** 使用 `/interface/ethernet/poe settings print` 查看限制:
   - PSU 必须覆盖 PSE 自身的功耗、所有受电 PD 的功耗,并留出约 10% 的余量。
   - 输入电压过低可能导致 PD 出现 `voltage-too-low` 状态(例如 DC 电缆过长或 PSU 负载过大)。
   - 在具有 802.3bt PoE in 的板卡上,请确保设备由有效电源供电,否则会出现 `no-valid-PSU` 状态且 PoE out 保持关闭——参见[供电要求](#powering-requirements)。
5. **对照 PD 的数据手册检查兼容性:**
   - 同时检查 PSE 和 PD 的规格:无源 PoE in 设备(例如输入最高 30 V)不能由更高电压的电源供电。在无源 PSE 上,PoE out 电压与 PSE 输入电压相同,因此使用 48 V PSU 供电的 PSE 也会在其 PoE out 端口上输出 48 V——对于低压 PD,请使用低压 PSU 或具有可选电压输出的 PSE。
   - PD 支持的输入电压必须与 PSE 输出电压相匹配。
   - PSE 与 PD 之间的引脚极性差异(Mode A 或反接)。
6. **对非标准 PD 尝试 `forced-on`**,在此之前请确认 PD 支持 PSE 的电压和极性(参见[示例](#powering-non-standard-pds-forced-on))。
7. **更新 RouterOS。** PoE 功能会定期获得修复和更新,请确保运行最新的 [RouterOS 版本](https://mikrotik.com/download)。
8. **隔离 PD。** 用匹配的无源 PoE 注入器为其供电。如果通过注入器可以工作,但通过 PSE 端口不能,则问题出在该端口或其配置上。

如果以上步骤均无法解决问题,请收集监控输出和日志,生成 [supout.rif 文件](../cli-reference/system/sup-output.md),并联系 MikroTik 支持。
