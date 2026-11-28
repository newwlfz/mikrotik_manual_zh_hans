---
title: "PoE"
description: "本页介绍 MikroTik 设备上的 PoE（Power over Ethernet）：支持的标准和功率等级，在 RouterOS 和 SwOS 中配置与监控 PoE out（PSE）和 PoE in（PD）端口，日志、警告、示例和故障排除。"
tags:
  - 'poe'
  - 'power-over-ethernet'
source: https://manual.mikrotik.com/docs/7.25/hardware/poe-out
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

本页介绍 MikroTik 设备上的 PoE（Power over Ethernet）：通过 **PoE out** 端口为其他设备供电（设备充当 PSE，Power Sourcing Equipment），以及部分型号通过 **PoE in** 端口受电（设备充当 PD，Powered Device）。MikroTik 设备采用 RJ45 mode B 线序进行供电，通过引脚 4 和 5（+）以及引脚 7 和 8（-）提供 PoE。

## MikroTik 支持的 PoE 标准 {#mikrotik-supported-poe-standards}

MikroTik 设备可支持以下部分或全部 PoE 标准，既包括为其他设备供电（PoE out，设备充当 PSE），也包括部分型号自身受电（PoE in，设备充当 PD）：

- **Passive PoE up to 30 V** - PSE（Power Sourcing Equipment）和 PD（Powered Device）之间不进行协商的 PoE。PoE out 端口输出与 PSE 自身输入相同的电压。适用于支持最高 30 V 输入电压的设备。（例如 [hEX PoE lite](https://mikrotik.com/product/RB750UPr2)、[RB3011UiAS-RM](https://mikrotik.com/product/RB3011UiAS-RM)、[RB2011iL-IN](https://mikrotik.com/product/RB2011iL-IN)。）

- **Passive PoE up to 57 V** - 工作方式与低压（最高 30 V）Passive PoE 相同，但也可以通过 PoE 端口输出或接受更高电压。对于 PoE out，输出电压取决于连接到 PSE 的电源。它还可以为接受 4、5（+）和 7、8（-）线对供电且不需要 PoE 协商的 af/at 兼容 PD 供电。（例如 [cAP ac](https://mikrotik.com/product/cap_ac)、[hAP ac](https://mikrotik.com/product/RB962UiGS-5HacT2HnT)、[wsAP ac lite](https://mikrotik.com/product/wsap_ac_lite)。）

- **IEEE Standards 802.3af/at** - 也称为 PoE（802.3af，Type 1）和 PoE+（802.3at，Type 2），这些 IEEE 标准确保不同厂商之间的兼容性。支持这些标准的 PSE 可以为 Type 1 和 Type 2 PD 供电，支持这些标准的 PD 可以从任何兼容的 PSE 受电。（例如 [CRS112-8P-4S-IN](https://mikrotik.com/product/crs112_8p_4s_in)、[CRS328-24P-4S+RM](https://mikrotik.com/product/crs328_24p_4s_rm)、[CRS354-48P-4S+2Q+RM](https://mikrotik.com/product/crs354_48p_4s_2q_rm)。）

- **IEEE Standards 802.3bt** - 802.3bt 标准也称为 PoE++，它扩展了早期的 PoE 标准，并引入了“Type 3”（Classes 5-6）和“Type 4”（Classes 7-8）。该标准使用千兆以太网线缆中的全部四对线供电，因此得名 4PPoE/802.3bt（“4-pair Power over Ethernet”）。根据型号不同，802.3bt 用于 PoE out、PoE in 或两者。（例如 [CRS320-8P-8B-4S+RM](https://mikrotik.com/product/crs320_8p_8b_4s_rm)）

所有 PoE out 实现均支持过载和短路检测。

### 功率等级 {#power-classes}

802.3 PoE 标准定义了功率等级，用于描述 PSE 向 PD 提供的最大功率：

| 类别 | 标准 | PSE 输出功率 | PD 可用功率 |
| :-- | :-- | :-- | :-- |
| 0-3 | 802.3af (Type 1) | 15.4 W | 12.95 W |
| 4 | 802.3at (Type 2) | 30 W | 25.5 W |
| 5 | 802.3bt (Type 3) | 45 W | 40 W |
| 6 | 802.3bt (Type 3) | 60 W | 51 W |
| 7 | 802.3bt (Type 4) | 75 W | 62 W |
| 8 | 802.3bt (Type 4) | 90 W | 71.3 W |

PSE 和 PD 使用该等级协商可提供的功率：PD 发出其等级信号，PSE 随后分配相应的功率预算。

可以通过设备的规格页面判断其支持哪种无源 PoE 标准：“PoE-OUT”部分下的 **`Low voltage PoE-Out current limit`** 条目表示设备支持 **Passive PoE up to 30 V**，额外的 **`High voltage PoE-Out current limit`** 条目表示设备还支持 **Passive PoE up to 57 V**。支持的 IEEE 标准会直接在规格页面上以 `PoE out` 列出（例如 802.3af/at 或 802.3bt）。

如上文所述，**Passive PoE up to 57 V** 也可以为不需要 PoE 协商的 802.3af/at 兼容设备（PD）供电，对于 MikroTik PD，这种方式可可靠工作。不过，第三方 PD 在未进行协商时可能会将自己归类为较低的 PoE 等级，并请求低于其实际可用功率的功率，这可能表现为无线发射功率降低、外设被禁用以及类似症状。不同 PD 的行为有所不同。

## 配置 {#configuration}

所有带 PoE 接口的 MikroTik 设备均支持 PoE 配置。可以通过 RouterOS 和 SwOS 界面进行编辑。

### RouterOS

**子菜单：** `/interface/ethernet/poe`

#### 用法 {#usage}

RouterOS 提供通过 Winbox、Webfig 和 CLI 配置和监控 PoE 的选项。使用 CLI 的基本命令如下：

| 属性 | 描述 |
| :-- | :-- |
| **print** () | 打印 PoE 相关设置。 |
| **export** () | PoE 配置在 `/interface/ethernet` 菜单下导出。 |
| **monitor** (*string\| interface*) | 监控指定端口的 PoE 状态 - `poe-out-status`、PoE out 端口的电压、电流和功率，以及 PoE in 端口协商的功率相关信息。可以使用 `/interface/ethernet/poe/monitor [find]` 监控所有端口。 |
| **power-cycle** (*duration: 0..1m*；默认：**5s**) | 在指定时间段内禁用 PoE out 端口的 PoE 输出电源。 |

### SwOS

SwOS 界面提供基本的 PoE out 配置和监控选项，详情请参阅 [SwOS 手册](/docs/7.24/bridging-and-switching/swos)。

## 监控 {#monitoring}

**子菜单：** `/interface/ethernet/poe/monitor`

| 属性 | 说明 |
| :-- | :-- |
| **name** () | 接口名称。 |
| **port-type** () | 显示接口是否支持 PoE out、PoE in 或两者（**poe-out**、**poe-in**、**poe-in/poe-out**）。 |
| **poe-out** () | 显示 PoE out 状态。 |
| **poe-voltage** () | 显示 PoE out 电压选择（**auto**、**low**、**high**）。 |
| **poe-out-status** () | 显示端口当前的 PoE out 状态（请参阅下方的[状态列表](#poe-out-statuses)）。 |
| **poe-out-voltage** () | 显示施加到 PD 的电压。 |
| **poe-out-current** () | 显示 PD 从端口汲取的电流（mA）。 |
| **poe-out-power** () | 显示 PD 功耗。 |
| **poe-out-power-pair()** | 显示 PSE 通过哪些供电线对向 PD 供电：**a** - 1,2（+）3,6（-）；**b** - 4,5（+）7,8（-）；**bt** - 全部 4 个线对。 |
| **power-cycle-host-alive** (*yes \| no*) | 显示被监控主机是否可达（启用 [power-cycle-ping](#power-cycle-settings) 功能时显示）。只读。 |
| **power-cycle-after** (*time*) | 显示端口将在多长时间后执行断电重启（启用 [power-cycle-ping](#power-cycle-settings) 功能时显示）。只读。 |

#### PoE out 状态 {#poe-out-statuses}

- **powered-on** - 已向端口供电，PoE out 正常运行。
- **waiting-for-load** - PSE 尝试检测是否可以向端口供电。供电时，电阻应在 3kΩ 至 26.5kΩ 范围内。
- **short-circuit** - 在 PoE out 端口检测到短路；电源已关闭，仅进行低电压检测。这也可能表示所连接设备不支持 PoE。
- **overload** - 超过 PoE out 电流限制，端口电源已关闭。有关端口限制，请参阅各型号规格。
- **voltage-too-low** - PSE 提供的电压无法为 PD 供电（例如，Vmin =>30V，但仅提供 24V）。
- **voltage-too-high** - 所连接设备被检测为 PoE in 设备，但 PSE 输出电压高于 PD 支持的范围。
- **current-too-low** - PD 汲取的电流低于正常 PoE out 设备应有的电流（低于 10 mA）。
- **no-valid-PSU** - 未检测到有效电源：PSE 没有足够或具备供电能力的电源来通过该端口提供 PoE out，因此未供电。有关受支持的电源组合，请参阅 [Powering requirements](#powering-requirements)。
- **lldp-power-off** - 主板通过 PoE in 供电，但从上游 PSE 收到的 LLDP 批准功率预算不足以为主板自身的 PoE out 端口供电。
- **low-voltage-pd-detected** - 所连接的 PD 仅支持低电压，无法以当前选定电压从该 PSE 供电。为避免损坏 PD，未供电。请使用低电压 PSE 为 PD 供电，或在支持可切换电压模式的 PSE 上将端口切换为低电压（`poe-voltage=low`）。
- **voltage-on-poe-in** - 在 PoE out 端口意外检测到电压，可能发生在以下两种情况：
  - **External power source** - 另一台设备正在向该端口供电（PoE in 电压）。
  - **Internal fault** - 该端口上的 PoE out 电路可能已损坏。
- **low-voltage-too-low** - PSE 上的输入低电压过低，无法为 PD 供电；未供电。
- **disabled** - 该端口的所有检测和供电均已关闭（`poe-out=off`）。
- **power_reset** - PSE 控制器正在重置电源，例如在 PoE 控制器升级期间、执行 power cycle 命令时或 ping 失败时（power-cycle-ping）。
- **controller-init** - PSE 控制器初始化。
- **controller-upgrade** - 正在升级 PSE 控制器。
- **controller-error** - PSE 控制器无响应。

### PoE in 端口 {#poe-in-ports}

:::note
PoE in 监控仅在支持带 LLDP 的 PoE in 设备上可用。较旧的设备不会在监控中显示 PoE in 端口。
:::

监控 **PoE in** 端口时（`port-type: poe-in`），监控会显示设备通过 PoE 接收的电源信息，例如，在支持 802.3bt PoE in 的主板上：

```ros
/interface/ethernet/poe/monitor ether1
```

```
              name: ether1
         port-type: poe-in
```

监控还可能显示 `power-limiting port` 消息。这表示 PD（本设备）以受限功率供电，因为 LLDP 协商批准的功率低于 PD 请求的功率。

### SNMP

可以使用 SNMP 协议监控 PoE out 值。必须在 PSE 上启用 [SNMP](/docs/7.24/diagnostics-monitoring-and-troubleshooting/snmp)。

可用的 SNMP OID：

| OID | 值 |
| :-- | :-- |
| 1.3.6.1.4.1.14988.1.1.15.1.1.1 | 接口 ID |
| 1.3.6.1.4.1.14988.1.1.15.1.1.2 | 接口名称 |
| 1.3.6.1.4.1.14988.1.1.15.1.1.3 | PoE out 状态（与 [monitor](#monitoring) `poe-out-status` 显示的值相同） |
| 1.3.6.1.4.1.14988.1.1.15.1.1.4 | 电压，单位为 dV（分伏） |
| 1.3.6.1.4.1.14988.1.1.15.1.1.5 | 电流，单位为 mA |
| 1.3.6.1.4.1.14988.1.1.15.1.1.6 | 功耗，单位为 dW（分瓦） |

也可以从 RouterOS 请求 SNMP 值，例如，`snmp-walk` 将打印所有可用 PoE out 端口的当前 mA：

```ros
/tool/snmp-walk address=10.155.149.252 oid=1.3.6.1.4.1.14988.1.1.15.1.1.5
```

要获取特定 OID 值，请使用 `snmp-get` 工具（显示 ether3 接口上的当前 mA）：

```ros
/tool/snmp-get address=10.155.149.252 oid=1.3.6.1.4.1.14988.1.1.15.1.1.5.3
```

## 日志和通知 {#logging-and-notifications}

### Logging

PoE 事件默认会[记录日志](/docs/7.24/diagnostics-monitoring-and-troubleshooting/log)。PoE out 状态变化使用 `poe-out` 主题，PoE in 事件（例如，通过 PoE 供电的板卡上的 LLDP 供电协商）使用 `poe-in` 主题。重要事件（例如过载或短路）使用“warning”主题记录日志，信息性状态变化使用“info”主题，例如：

```
2026-10-08 11:42:45 poe-out,info ether16 detected poe-out status: on
```

为避免 PD 因 current-too-low 未供电时产生不必要的日志，RouterOS 将过滤此类事件，并每 512 个 current-too-low 事件添加一条日志。

`poe-out` 和 `poe-in` 主题遵循标准 [日志](/docs/7.24/diagnostics-monitoring-and-troubleshooting/log)机制，可以像其他主题一样被排除、按严重级别过滤或发送到单独的日志目标。

详细的 LLDP 供电协商消息使用“debug”主题，例如：

```
06:56:50 poe-out,debug ether4 LLDP TLV 25.0W request denied : hw-limit
```

可能的 LLDP 供电请求拒绝原因：

| Reason | Description |
| :-- | :-- |
| **budget** | 请求的功率超过 PSE 总预算。 |
| **hw-limit** | 请求的功率超过硬件支持范围（PSU 会影响该值）。 |
| **low-voltage** | 向低压端口发起了 LLDP 请求。 |
| **off** | 端口已关闭。 |
| **class-limit** | LLDP 请求的功率超过该类别可提供的功率。 |
| **cmd-failed** | RouterOS 无法向控制器发出请求。 |

### GUI/CLI 警告 {#guicli-warnings}

重要的 PoE 相关问题会显示为警告：在 Winbox / WebFig 的接口列表中（位于 Interfaces 下）、在 CLI 接口输出中作为标志注释、在 [monitor](#monitoring) 中作为端口状态，以及在 [日志](#logging-and-notifications)中。

会触发警告的 PoE out 状态：

| Status | Description |
| :-- | :-- |
| **overload** | 超过 PoE out 电流限制。 |
| **short-circuit** | 在端口上检测到短路。 |
| **current-too-low** | 连接的 PD 汲取的电流低于正常值。 |
| **voltage-on-poe-in** | 在端口上检测到意外电压（例如，另一台设备正在向其供电）。 |

## PoE out

### 如何选择 PoE PSE {#how-to-choose-your-poe-pse}

此表可帮助你选择最适合需求的 PSE 设备。

<WideTable>

| 设备名称 | 软件 | PoE out 端口数量 | PoE 类型 | 电源输入 | 低压 PoE out 电流限制，A | 高压 PoE out 电流限制，A | 最大总输出功率，W |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **OmniTIK 5 PoE** | RouterOS | 4 | Passive | 仅 PoE in（11-30 V） | 1 |  | 60 |
| **RB260GSP** | SwOS | 4 | Passive | DC jack / PoE in（11-30 V） | 1 |  | 60 |
| **hEX PoE lite / PowerBox** | RouterOS | 4 | Passive | DC jack / PoE in（8-30 V） | 1 | - | 60 |
| **OmniTIK 5 PoE ac** | RouterOS | 4 | Passive、af/at | 仅 PoE in（12-57 V） | 1 | 0.45 | 102 |
| **hEX PoE / PowerBox Pro** | RouterOS | 4 | Passive、af/at | DC jack / PoE in（12-57 V） | 1 | 0.45 | 102 |
| **RB5009UPr+S+** | RouterOS | 8 | Passive、af/at | DC jack / 2-pin / PoE in（24-57 V） | 0.9 | 0.44 | 130 |
| **netPower Lite 8P** | SwOS | 8 | Passive、af/at | 3× 2-pin terminal（24-57 V） | 1 | 0.64 | 120 |
| **CRS112-8P-4S-IN** | RouterOS | 8 | Passive、af/at | 2× DC jack（18-28 V / 48-57 V） | 1 | 0.45 | 150 |
| **CRS418-8P-8G-2S+RM** | RouterOS | 8 | Passive、af/at | AC（2 PSU slots） | 1.1 | 0.56 | 150 |
| **CSS610-8P-2S+IN** | SwOS | 8 | Passive、af/at | AC &amp; DC 48-57 V | 1 | 0.625 | 140 |
| **CRS320-8P-8B-4S+RM** | RouterOS / SwOS | 16 | Passive、af/at、bt | AC（2 PSU slots） | - | 0.56（af/at）/ 1.67（bt） | 963 |
| **netPower 16P** | RouterOS / SwOS | 16 | Passive、af/at | 2× DC jack（18-30 V / 48-57 V） | 1.1 | 0.6 | 160 |
| **CRS328-24P-4S+RM** | RouterOS / SwOS | 24 | Passive、af/at | AC | 1 | 0.45 | 450 |
| **CRS354-48P-4S+2Q+RM** | RouterOS / SwOS | 48 | Passive、af/at | AC | 1 | 0.57 | 700 |

</WideTable>

:::tip
使用 PoE out 为其他设备供电时，输入电压至少为 18V。
:::

### 设置 {#settings}

#### 全局设置 {#global-settings}

**子菜单：** `/interface/ethernet/poe/settings`

部分 MikroTik PoE 输出设备支持全局 PoE 设置

| 属性 | 说明 |
| :-- | :-- |
| **ether1-poe-in-long-cable** (*yes \| no*) | 当设备本身通过长线缆以 PoE in 供电时，将其设置为“yes”。该设置会禁用严格的输入电流监控（短路检测），以免长线缆被错误识别为短路。**这是一项可能存在危险的设置，应谨慎使用。** 它还可能影响使用 DC 连接器供电的 PSE 上的 PoE out 行为 |
| <strong>psuX-max-power</strong><br/><strong>jack-max-power</strong><br/><strong>2pin-max-power</strong> | 指定可从给定电源（PSU、DC jack 或 2-pin 端子）汲取的最大功率，单位为瓦。默认值：**96W** |
| **poe-in-max-power** | 当设备（PSE）本身通过 PoE in 供电时，指定 PoE 供电器（例如 802.3bt）可提供的最大功率，单位为瓦 |
| **routerboard-max-self-power** | 指定设备为自身供电预留的功率。只读。 |
| **routerboard-max-total-power** | 板卡自身在不使用 PoE out 时的最大功耗。用于在预算由 PSU 功率决定的设备上计算 PoE out 预算（PoE 预算 = PSU 功率 − routerboard 功率）。只读。 |
| **poe-out-limit-power** | PoE out 总预算限制。只读。 |
| <strong>psuX-poe-out-max-power</strong><br/><strong>jack-poe-out-max-power</strong><br/><strong>2pin-poe-out-max-power</strong><br/><strong>poe-in-poe-out-max-power</strong> | 每个电源（PSU、DC jack、2-pin 端子或 PoE in 供电器）的 PoE out 限制，单位为瓦。只读。 |
| **version** | PoE 控制器（ATtiny）固件版本。只读。 |

#### 端口设置 {#port-settings}

**子菜单：** `/interface/ethernet/poe`

可在此菜单中按端口配置 PoE 输出。每个端口均可独立控制。

| 属性 | 说明 |
| :-- | :-- |
| **name** () | 接口名称。 |
| **port-type** () | 显示端口是否支持 PoE 输出、PoE 输入或两者（poe-out、poe-in、poe-in/poe-out）。只读。 |
| **poe-out** (*auto-on \| forced-on \| forced-on-a \| forced-on-bt \| off*；默认值：**auto-on**) | 指定 PoE 输出状态<ul><li>auto-on - 先检查端口电阻，仅当电阻在 3kΩ 至 26.5kΩ 范围内时才供电</li><li>forced-on - 禁用电阻检测，并始终在 pair B（alt）上供电</li><li>off - 关闭该端口的所有检测和供电</li></ul>支持 802.3bt PoE 输出的 PSE 上的其他状态：<ul><li>forced-on-a - 与 forced-on 相同，但在 pair A（main）上供电</li><li>forced-on-bt - 与 forced-on 相同，但在全部 4 对线上供电（仅可通过 CLI 使用，无法在 Winbox/WebFig 中选择该状态）</li></ul>**注意：** 短路和过载保护始终开启，与所选的 PoE 输出状态无关。 |
| **poe-priority** (*integer: 0..99*；默认值：**10**) | poe-priority 指定 PoE 输出端口的重要性；当达到 PoE 输出总限制时，端口优先级最低的接口将首先断电。最高优先级为 0，最低优先级为 99。如果有 2 个或更多端口具有相同优先级，则端口号最小的端口具有更高优先级。<br/>每 6 秒检查一次因端口优先级而关闭的端口是否可以恢复 PoE 输出。 |
| **poe-voltage** (*auto \| low \| high*；默认值：**auto**) | 该功能允许在 PoE 输出端口的两种电压输出之间手动切换。它仅在具有可切换电压模式的 PSE 上生效（[CRS112-8P-4S-IN](https://mikrotik.com/product/crs112_8p_4s_in)、[CRS328-24P-4S+RM](https://mikrotik.com/product/crs328_24p_4s_rm)、[netPower 16P](https://mikrotik.com/product/netpower_16p)、[CRS354-48P-4S+2Q+RM](https://mikrotik.com/product/crs354_48p_4s_2q_rm)）。 |

从 RouterOS 7.15 开始，旧的 **poe-lldp-enabled** 端口属性已移除。PSE 与 PD 之间的 LLDP 供电协商通过 [Neighbor Discovery](/docs/7.24/system-information-and-utilities/neighbor-discovery) 的 `lldp-poe-power` 属性配置。

#### Power-cycle 设置 {#power-cycle-settings}

RouterOS 提供通过 ping 监控 PD 的功能，并在主机无响应时对 PoE out 端口执行 power-cycle。可以在 `/interface/ethernet/poe` 菜单下启用 power-cycle-ping 功能。

| 属性 | 说明 |
| :-- | :-- |
| **power-cycle-ping-enabled** (*yes \| no*；默认：**no**) | 启用 ping watchdog；当主机不响应 ICMP 或 MAC-Telnet 数据包时，对端口执行 power-cycle。 |
| **power-cycle-ping-address** (*IPv4 \| IPv6 \| MAC*) | 要监控的地址。自 RouterOS 6.46beta16 起，如果配置 IP 地址，则需要存在到 PD 的活动路由，因此请确保 PSE 可以访问 PD。如果指定 MAC 地址，PSE 将仅从指定的以太网接口发送 MAC-Telnet ping 请求。配置 [bridge vlan-filtering](/docs/7.24/bridging-and-switching#bridge-vlan-filtering) 或某种 [VLAN switching](/docs/7.24/bridging-and-switching/user-guides/basic-vlan-switching) 时，建议使用 IP 地址监控 PD。 |
| **power-cycle-ping-timeout** (*time: 0..1h*；默认：**5s**) | 如果主机无响应的时间超过超时时间，则 PoE out 端口将关闭 5s。 |
| **power-cycle-interval** (*time \| none*；默认：**none**) | 按指定间隔定期对 PoE out 端口执行 power-cycle（关闭电源 5s，然后重新开启）。与 power-cycle-ping 功能无关。 |

如果启用了 power-cycle-ping 功能，[监控](#monitoring)还会显示被监控主机的状态以及距离下一次 power-cycle 的时间。

### LEDs

大多数设备通过每个端口一个 LED 指示 PoE out 状态，同一 LED 可以显示不同颜色：

| LED | PoE out 状态 |
| :-- | :-- |
| 红色 | **Powered-on** - 对于不支持电压选择的型号，无论电压如何均显示红色；对于支持电压选择的型号和 802.3bt 型号，PD 使用高电压供电（802.3af/at） |
| 绿色 | **Powered-on**，PD 使用低电压（支持可选电压输出的型号） |
| 紫色 | **Powered-on**，PD 使用全部 4 对线供电（802.3bt） |
| 闪烁（任意颜色） | **短路**或**过载** |

#### 特定型号的 LED 行为 {#model-specific-led-behavior}

- [CRS112-8P-4S-IN](https://mikrotik.com/product/crs112_8p_4s_in)、[netPower 16P](https://mikrotik.com/product/netpower_16p) - 所有 PoE LED 闪烁：某个端口接入了电压错误的 PSU。

### 工作原理 {#how-it-works}

#### PoE out 模式 {#poe-out-modes}

- **auto-on** - 主板检查所连接端口的电阻，仅当电阻在 3kΩ 至 26.5kΩ 范围内时供电：
  - 供电后，PSE 持续检查过载和短路；
  - 如果拔下线缆，端口返回检测状态，并在再次检测到合适的 PD 前保持关闭。
- **forced-on** - 禁用电阻检测，即使未连接线缆也会供电：
  - 根据配置的 `poe-out` 状态（`forced-on`、`forced-on-a` 或 `forced-on-bt`）在线对上供电；
  - PSE 仍持续检查过载和短路；
  - 拔下线缆后，端口仍保持供电。
- **off** - 端口上的 PoE out 已关闭，不进行检测，接口表现为普通以太网端口。

#### PoE out 限制 {#poe-out-limits}

以下 PoE out 特性因 PSE 型号而异 - 请查看设备的规格页面：

- **Port limit** - PoE out 端口受特定电压下支持的最大电流限制。低压设备（最高 30 V）和高压设备的最大电流通常不同。
- **Total limit** - PSE 还具有总 PoE out 电流限制，即使单个端口限制允许，也不能超过该限制。总限制的范围因型号而异：在按端口组限制的主板上（例如按 8 端口分区），电源优先级也仅在该端口组内适用。
- **Polarity** - 大多数 MikroTik PSE 使用相同的 PoE out 引脚极性，即 [Mode B](https://en.wikipedia.org/wiki/Power_over_Ethernet#Pinouts) - 4、5（+）和 7、8（-）。具有 802.3bt 端口的 PSE 使用两种极性：1、2（+）和 3、6（-）为 Mode A，4、5（+）和 7、8（-）为 Mode B。

#### 安全 {#safety}

PSE 具有以下安全功能：

- **兼容性检测** - 在 auto-on 模式下，首先检查端口上的电阻，仅当其在 3kΩ 至 26.5kΩ 的允许范围内时才供电。超出该范围的非标准 PD 不会供电。
- **过载保护** - PoE out 端口供电时，会持续检查是否过载。如果检测到过载，将关闭该端口的 PoE out，以避免损坏 PD 或 PSE，并在几秒后再次开启，以检查情况是否发生变化。
- **短路检测** - PoE out 端口供电时，PSE 会持续检查是否短路。如果检测到短路，将关闭该端口的电源，以避免对 PD 和 PSE 造成进一步损坏，并继续检查该端口，直到环境恢复正常。

#### 型号特定功能 {#model-specific-features}

某些 PSE 具有独立的 8 端口分区。在此类设备上，PoE out 独立于 RouterOS 工作：你可以重启或升级 RouterOS，受电设备不会断电。例外情况是 PoE 控制器固件升级，在此期间电源会中断，此类升级始终会在 RouterOS 变更日志中说明。

PoE 预算的定义方式也因型号而异：某些设备为整块板卡设置预算限制，另一些设备则按 8 端口分区设置。同样，PoE out 优先级在预算范围内生效：在按分区设置预算的板卡上，优先级按分区应用；在按整板设置预算的板卡上，优先级全局应用。

## PoE 输入 {#poe-in}

MikroTik 设备也可以通过以太网供电，充当 PD（Powered Device）。PoE in 端口在同一个 `/interface/ethernet/poe` 菜单中管理，并可通过 monitor 输出中的 `port-type: poe-in` 识别。

### 配置 {#configuration-1}

PoE in 相关选项属于 [全局设置](#global-settings)，例如：

- **poe-in-max-power** - 通知设备为其供电的 PoE 注入器的最大功率（例如 802.3bt），以便正确计算 PoE out 预算；
- **ether1-poe-in-long-cable** - 当设备通过长线缆供电时，禁用严格的输入/输出电流监控。

### 供电要求 {#powering-requirements}

使用 PoE in 为设备供电时，电源必须与设备输入匹配。请查看设备规格页面，了解支持的 PoE in 电压范围和标准：

- PSU 或 PoE 注入器的输出电压必须在设备输入电压范围内（例如，无源 PoE 型号为 8-30 V 或 12-57 V）。电压过低可能导致设备无法启动或在负载下重启，电压过高可能损坏设备。
- 电源必须提供足够功率，以满足设备自身需求；如果设备为其他设备供电，还必须满足 PoE out 预算 - 预算计算方式请参阅 [PoE out 限制](#poe-out-limits) 和[设置](#global-settings)。
- MikroTik 设备上的无源 PoE in 使用 Mode B 极性（4、5 针为正极（+），7、8 针为负极（-）），但支持 802.3bt PoE in 的设备除外，此类设备可通过全部四对线受电。
- 使用 802.3af/at PSE 或无源 2 对线注入器为支持 PoE out 和 802.3bt（PoE++）PoE in 的设备供电，不视为有效电源：PoE out 将无法工作，监控会在 PoE out 端口上显示 `no-valid-PSU` 状态。请改用 802.3bt PSE 或 4 对线无源注入器。

当设备自身通过 PoE 供电并使用 LLDP 功率协商时（请参阅 [邻居发现](/docs/7.24/system-information-and-utilities/neighbor-discovery) `lldp-poe-power`），设备会将请求的功率传达给上游 PSE，PSE 会据此批准功率。如果批准的功率低于请求的功率，监控会显示 `power-limiting port` 消息（请参阅 [PoE in 端口](#poe-in-ports)），并且部分 PoE out 端口可能无法供电。

## 示例 {#examples}

### PoE out

#### 为非标准 PD 供电（forced-on） {#powering-non-standard-pds-forced-on}

未呈现所需电阻（3kΩ 至 26.5kΩ）的 PD 不会在 `auto-on` 模式下供电。请改用 `forced-on` 为其供电：

```ros
/interface/ethernet/poe set ether5 poe-out=forced-on
```

在支持 802.3bt 的 PSE 上，`forced-on-a` 和 `forced-on-bt` 可通过 A 线对或全部四个线对为 PD 供电（仅限 CLI，请参阅 [Port Settings](#port-settings)）。为节省电力并提高安全性，请使用 `poe-out=off` 在未使用的端口上禁用 PoE out。

#### 端口优先级 {#port-priorities}

PoE out 优先级定义当达到 PoE out 总功率限制时，哪些端口会先断电。优先级 *0* 最高，*99* 最低：

```ros
/interface/ethernet/poe set ether2 poe-priority=10
/interface/ethernet/poe set ether3 poe-priority=13
/interface/ethernet/poe set ether4 poe-priority=11
/interface/ethernet/poe set ether5 poe-priority=14
```

如果超过总限制，优先级最低的端口会先被禁用（先是 ether5，然后是 ether3）。禁用的端口会每隔几秒重新检查，并在功率预算允许时按相反顺序重新供电。

当多个端口具有相同优先级时，端口编号最小的端口优先：如果所有端口的优先级相同，则先禁用 ether5，然后禁用 ether4，再禁用 ether3。

#### 定时断电重启 {#scheduled-power-cycle}

使用 [power-cycle-interval](#power-cycle-settings) 定期重启 PoE out 端口，例如每天重启一次连接的设备：

```ros
/interface/ethernet/poe set ether5 power-cycle-interval=1d
```

#### 断电重启看门狗（power-cycle-ping） {#power-cycle-watchdog-power-cycle-ping}

监控连接的 PD，并在主机无响应时对端口执行断电重启：

```ros
/interface/ethernet/poe set ether1 power-cycle-ping-enabled=yes power-cycle-ping-address=192.168.88.10 power-cycle-ping-timeout=30s
```

通过 ICMP ping 监控 ether1 上的 PD。如果 192.168.88.10 的主机超过 30s 无响应，则该端口的 PoE out 将关闭 5s。

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

通过全局设置查看设备的 PoE out 预算和只读功率限制：

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

在本示例中，板卡自身保留 20 W，PoE out 的总预算为 240 W，其中通过 DC jack 供电时可用 66 W，通过 2-pin terminal 供电时可用 120 W。

### PoE 输入 {#poe-in-1}

当设备本身使用 PoE 注入器供电时（例如 802.3bt），请使用 [poe-in-max-power](#global-settings) 全局设置声明注入器的功率，以便正确计算 PoE out 预算：

```ros
/interface/ethernet/poe settings set poe-in-max-power=144
```

## 故障排除 {#troubleshooting}

如果 PD 无法通过 PoE out 上电或意外重启，请按以下检查清单排查：

1. **先检查端口状态。** 在该端口上运行 `/interface/ethernet/poe/monitor` — `poe-out-status` 的值通常直接指向问题，例如 `overload`、`short-circuit`、`voltage-too-low` 或 `no-valid-PSU`。请参阅完整的[状态列表](#poe-out-statuses)。
2. **检查日志。** PoE 状态变化会记录到 `poe-out` 主题中，请参阅[日志](#logging)。
3. **尝试更换网线。** 直接在 PSE 上使用一根短的优质跳线，以排除布线问题。
4. **检查 PSE 的电源。** 使用 `/interface/ethernet/poe settings print` 查看限制：
   - PSU 必须覆盖 PSE 自身、所有已供电 PD 的功耗，并保留约 10% 的余量。
   - 输入电压过低可能导致 PD 出现 `voltage-too-low` 状态（例如 DC 线缆过长或 PSU 负载过大）。
   - 在支持 802.3bt PoE in 的板卡上，请确保设备由有效电源供电，否则会出现 `no-valid-PSU` 状态，PoE out 保持关闭 — 请参阅[供电要求](#powering-requirements)。
5. **根据数据手册检查 PD 兼容性：**
   - 同时检查 PSE 和 PD 的规格：无源 PoE in 设备（例如输入最高 30 V）不能由更高电压的电源供电。在无源 PSE 上，PoE out 电压与 PSE 输入电压一致，因此使用 48 V PSU 供电的 PSE，其 PoE out 端口也输出 48 V — 对于低压 PD，请使用低压 PSU 或支持选择输出电压的 PSE。
   - PD 支持的输入电压必须与 PSE 输出电压匹配。
   - PSE 和 PD 之间的引脚极性差异（Mode A 或反接）。
6. 对于非标准 PD，在确认 PD 支持 PSE 电压和极性后，尝试 `forced-on`（请参阅[示例](#powering-non-standard-pds-forced-on)）。
7. **升级 RouterOS。** PoE 功能会定期获得修复和更新，请确保运行最新的 [RouterOS 版本](https://mikrotik.com/download)。
8. **隔离 PD。** 使用匹配的无源 PoE 注入器为其供电。如果通过注入器供电正常，但通过 PSE 端口供电不正常，则问题出在该端口或其配置。

如果以上步骤均未解决问题，请收集 monitor 输出和日志，生成 [supout.rif 文件](/docs/7.24/cli-reference/system/sup-output)，并联系 MikroTik 支持。
