---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/health"
sidebar_position: 13
title: "健康"
sidebar_label: "健康"
description: "本页介绍 MikroTik RouterOS 硬件健康监控，涵盖温度、电压、电流、电源和功耗读数、风扇控制设置、SNMP OID，以及用于告警的 REST API 和脚本示例。"
tags:
  - 'system-health'
  - 'fan-control'
  - 'temperature'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/health
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

支持监控的硬件会报告硬件状态信息，例如温度、电压、电流、风扇转速、电源状态和功耗。相同的读数也可在 Winbox 的 **System → Health** 选项卡中查看。没有硬件传感器的设备不会输出任何内容：这包括 CHR 和虚拟机，以及根本没有传感器的板卡（例如 hAP ax²）。

CCR1072-1G-8S+ 设备上的示例：

```ros
[admin@MikroTik] > /system/health/print 
Columns: NAME, VALUE, TYPE
 #  NAME                VALUE  TYPE
 0  power-consumption   50.8   W   
 1  cpu-temperature     43     C   
 2  fan1-speed          5654   RPM 
 3  fan2-speed          5825   RPM 
 4  fan3-speed          5800   RPM 
 5  fan4-speed          5750   RPM 
 6  board-temperature1  29     C   
 7  board-temperature2  28     C   
 8  psu1-voltage        0      V   
 9  psu2-voltage        12.1   V   
10  psu1-current        0      A   
11  psu2-current        4.2    A
```

`TYPE` 列显示读数的单位：`C` 为摄氏度，`RPM` 为风扇转速，`V` 为电压，`A` 为电流，`W` 为功耗。脚本看到的值与 CLI 显示的值相同。SNMP 对温度、电压和功率使用十分之一单位（23.8 V → 238），电流在旧版 OID 中以 mA 为单位，或在动态仪表表中以 dA 为单位（参见下面的 SNMP 部分）。

要打印单个读数，请按名称过滤：

```ros
[admin@MikroTik] > /system/health/print where name="cpu-temperature"
Columns: NAME, VALUE, TYPE
 #  NAME             VALUE  TYPE
 0  cpu-temperature  43     C   
```

要查看特定 RouterBOARD 产品支持哪些健康数据，请查看 [mikrotik.com](https://mikrotik.com/products) 上的产品规格。

## 读数 {#readings}

| 读数 | 单位 | 描述 |
| :-- | :-- | :-- |
| `voltage` | V | 具有单个电源输入的设备上的供电电压 |
| `psuN-voltage` | V | 电源 N 的电压 |
| `psuN-input-voltage` | V | 电源 N 的输入（市电）电压 |
| `jack-voltage`, `2pin-voltage`, `poe-in-voltage` | V | 特定电源输入的电压（在无 PSU 的设备上） |
| `poe-outN-voltage` | V | PoE-out 端口 N 上的电压 |
| `psuN-current` | A | 电源 N 消耗的电流 |
| `power-consumption` | W | 总功耗 |
| `poe-out-consumption` | W | 当前 PoE-out 功耗 |
| `psuN-power` | W | 电源 N 的功率 |
| `temperature` | C | 具有单个传感器的设备上的设备温度 |
| `cpu-temperature` | C | CPU 温度 |
| `board-temperatureN` | C | 板卡温度传感器 N |
| `phy-temperature` | C | PHY 温度 |
| `sfp-temperature` | C | SFP 模块温度 |
| `switch-temperature` | C | 交换芯片温度 |
| `pcie-switch-temperature` | C | PCIe 交换芯片温度 |
| `psuN-temperature` | C | 电源 N 的温度 |
| `fan-state` | — | 风扇状态：`ok` 或 `fail` |
| `fanN-speed` | RPM | 风扇 N 的转速 |
| `psuN-fan-speed` | RPM | 电源 N 内部风扇的转速 |
| `psuN-state` | — | 电源 N 状态（参见下文的状态表） |

带编号的名称（`psuN`、`fanN`、`board-temperatureN`、`poe-outN`）使用从 1 开始的索引，数量取决于设备。具体存在哪些读数取决于设备的硬件传感器。

当设备温度较高时，风扇转速读数为 0 RPM 可能意味着风扇已停止或发生故障。

### 电压 {#voltage}

支持电压监控的路由器会显示供电电压值。在 CLI、Winbox 和脚本中，它以伏特为单位报告；通过 SNMP 时，它以 dV 为单位（CLI 值乘以 10）。

具有 PEXT 和 PoE 电源输入的路由器使用 PEXT 进行校准。因此，由于额外的以太网保护链路，通过 PoE 显示的值可能低于输入电压。

```ros
[admin@MikroTik] > /system/health/print 
Columns: NAME, VALUE, TYPE
#  NAME         VALUE  TYPE
0  voltage      23.8   V   
1  temperature  39     C 
```

### 温度 {#temperature}

支持温度监控的路由器会显示温度读数。在 CLI、Winbox 和脚本中，它以摄氏度报告；通过 SNMP 时，该值会乘以 10。不同设备使用不同的温度传感器，例如 `cpu-temperature`、`board-temperature1`、`sfp-temperature`、`phy-temperature` 或 `switch-temperature`。某些读数仅在相应组件存在时才会出现，例如 `sfp-temperature` 仅在安装了 SFP 模块时才会显示。您可以在 [mikrotik.com](https://mikrotik.com/products) 的规格说明中找到设备经过测试的环境温度范围。经过测试的环境温度范围是设备可实际放置的温度。它**不**等同于系统健康监视器报告的温度。

### 电源状态 {#power-supply-states}

具有冗余电源的设备会报告每个电源的状态。对于带电池备用的设备，请参阅 [UPS](../system-information-and-utilities/ups.md) 页面。可能的值为：

| 值 | 描述 |
| :-- | :-- |
| `ok` | 电源正常工作。 |
| `fail` | 电源发生故障。 |
| `not-present` | 此插槽中未检测到电源。 |
| `idle` | 电源存在但处于空闲状态。 |
| `no-input` | 电源没有输入电力。 |

值为 `fail` 或 `no-input` 表示电源或其供电来源存在问题。

### 旧版设备 {#legacy-devices}

如果旧版 CRS112、CRS210 和 CRS109 设备通过 PoE 供电，Health 仅在最高 26.7 V 时显示正确电压。如果使用更高电压，Health 将显示恒定的 16 V。

基于 x86（旧式 PC 硬件）的设备使用另一组读数名称，例如 `core`、`3.3v`、`5v`、`12v`、`lm87-temp`、`cpu-temp`、`board-temp`、`voltageN`、`tempN` 和 `fanN`。

## 风扇控制与行为 {#fan-control-and-behavior}

[/system/health/settings](../cli-reference/system/health/settings/index.md) 菜单控制带有风扇设备上的风扇行为。

有三个参数可以启动风扇：PoE-out 功耗、SFP 温度和 CPU 温度。当其中一个参数超过最佳值时，风扇启动。

### PoE-out 功耗 {#poe-out-consumption}

如果设备具有 PoE-out，则风扇 RPM 将如下所述变化：

| PoE-out 负载 | 最大风扇转速的 RPM % |
| :-- | :-- |
| 0%..24% | 风扇转速 0% |
| 25%..46% | 风扇转速 25% |
| 47%..70% | 风扇转速 50% |
| 71%..92% | 风扇转速 75% |
| 93%.. | 风扇转速 100% |

对于配备 **PWM** 风扇的设备，转速将从 9..88% 线性增加或降低（低于 100 W 时风扇 RPM 为 0）。

### 手动风扇控制选项 {#manual-fan-control-option}

手动风扇控制适用于 CRS3xx、CRS5xx 和 CCR2xxx 设备，以及修订版 CCR1036-8G-2S+-r2、CCR1036-12G-4S-r2 和 CCR1016-12S-1S+-r2 设备。

在 [`/system/health/settings`](../cli-reference/system/health/settings/index.md) 中设置它们——每个参数，包括手动风扇控制选项 `fan-mode`、`use-fan`、`use-fan2`、`fan-switch` 和 `fan-on-threshold`，以及只读的 `active-fan`/`active-fan2` 状态，都在 CLI 参考中描述。带有主风扇和辅助风扇的设备，例如 RB1100、CCR1016 和 CCR1036 设备，也支持手动风扇控制。

例如，要让风扇至少以其最大转速的四分之一运行：

```ros
/system/health/settings/set fan-min-speed-percent=25
```

当主风扇发生故障时，设备会自动切换到辅助风扇，并且 `active-fan`（或 `active-fan2`）会变为 `auxiliary`。在 CRS3xx、CRS5xx、CCR2xxx、CCR1016r2 和 CCR1036r2 设备上，风扇状态变化也会写入日志。

使用 `/system/health/settings/detect-fans` 命令检测连接到设备的风扇，例如在安装或更换风扇之后。

### 风扇控制详解 {#fan-control-in-detail}

如果内部测得温度（CPU、SFP、交换机、主板）中至少有一项超过 **fan-target-temp**，风扇就会开始转动。温度越高，风扇转速越快。

- 配备 PWM 风扇的设备：风扇会线性提高其 RPM，以尽可能将温度保持在 **fan-target-temp**；当温度达到或超过 **fan-full-speed-temp** 时，风扇会达到最大 RPM。
- 配备 DC 风扇的设备：默认情况下，风扇会以较高的最低 RPM 开始转动。这可能会使设备降温过多，以至于如果 **fan-min-speed-percent** 为 **0%**，风扇会完全关闭；而在默认 **12%** 下，风扇永远不会完全停止，这可以减少噪声和启停峰值。当温度回升到 **fan-target-temp** 时，风扇会再次开启。

一个例外：S+RJ10 模块在触发风扇之前具有 65 C 的温度阈值，因此风扇会以较高的初始转速开始转动以冷却设备。前面提到的所有功能都与 **fan-control-interval** 参数值直接相关，因为它决定了风扇控制器监控所有传感器数据并应用风扇控制更改的频率。

PWM 和 DC 风扇对风扇控制的反应不同。PWM 风扇会以线性方式提高或降低其 RPM。然而，DC 风扇只有少数几种可运行的速度档位。

所有读数均为近似值。其目的是告知用户可能发生或即将发生的故障。

## 监控健康状况并获取警报 {#monitor-health-and-get-alerts}

### SNMP trap {#snmp-trap}

对于基于 SNMP 的监控，请启用 `temp-exception` trap 生成器。当温度达到 100 C 或达到由 `cpu-overtemp-threshold` 设置的值时，路由器会发送 SNMP trap。有关详细信息，请参见 [SNMP](./snmp.md) 页面。

### SNMP OID {#snmp-oids}

所有健康读数都在 [MIKROTIK-MIB](https://mikrotik.com/download) 的 `1.3.6.1.4.1.14988.1.1.3` 子树下公开，格式为 `.1.3.6.1.4.1.14988.1.1.3.<index>.0`：

| 索引 | 对象名称 | 读数 |
| :-- | :-- | :-- |
| 1 | `mtxrHlCoreVoltage` | 核心电压（V） |
| 2 | `mtxrHlThreeDotThreeVoltage` | 3.3 V 供电轨电压 |
| 3 | `mtxrHlFiveVoltage` | 5 V 供电轨电压 |
| 4 | `mtxrHlTwelveVoltage` | 12 V 供电轨电压 |
| 5 | `mtxrHlSensorTemperature` | 传感器芯片温度（C） |
| 6 | `mtxrHlCpuTemperature` | CPU 温度 |
| 7 | `mtxrHlBoardTemperature` | 板卡温度 |
| 8 | `mtxrHlVoltage` | 主电压 |
| 9 | `mtxrHlActiveFan` | 活动风扇的名称 |
| 10 | `mtxrHlTemperature` | 温度 |
| 11 | `mtxrHlProcessorTemperature` | 处理器温度 |
| 12 | `mtxrHlPower` | 功耗（W） |
| 13 | `mtxrHlCurrent` | 电流（mA） |
| 14 | `mtxrHlProcessorFrequency` | CPU 频率（MHz） |
| 15 | `mtxrHlPowerSupplyState` | 电源状态（0 = 不正常，1 = 正常） |
| 16 | `mtxrHlBackupPowerSupplyState` | 备用电源状态（0 = 不正常，1 = 正常） |
| 17 | `mtxrHlFanSpeed1` | 风扇 1 转速（RPM） |
| 18 | `mtxrHlFanSpeed2` | 风扇 2 转速（RPM） |
| 19 | `mtxrAlarmSocketStatus` | 告警插座状态（0 = 未激活，1 = 激活） |

温度、电压和功率值会乘以 10（要得到该值请除以 10）。电流以 mA 为单位报告，频率以 MHz 为单位，风扇转速以 RPM 为单位。哪些索引会返回值取决于设备的硬件传感器；在设备上运行 `/system/health/print oid` 可查看其实际的 OID 映射。

表中的静态 OID 是固定的旧版集合。较新的读数——例如风扇 2 以上的风扇转速、每路电源的读数（`psuN-*`）、`pcie-switch-temperature` 和 PoE-out 电压——可在位于 `.1.3.6.1.4.1.14988.1.1.3.100` 的动态 gauge 表中获取。该表的每一行都按名称（`mtxrGaugeName`）列出一项读数，并列出其原始值（`mtxrGaugeValue`）和单位（`mtxrGaugeUnit`：`celsius(1)`、`rpm(2)`、`dV(3)`、`dA(4)`、`dW(5)` 或 `status(6)`）。`dV`、`dA` 和 `dW` 单位分别是分伏、分安和分瓦，因此请将原始值除以 10。

### REST API {#rest-api}

使用 REST API，你可以以 JSON 读取相同的读数：

```bash
curl -k -u admin https://192.168.88.1/rest/system/health
```

有关详细信息，请参阅 [REST API](../developer-guides/rest-api.md) 页面。

### 发送电子邮件警报 {#send-an-email-alert}

通过脚本，你可以使用 scheduler 定期检查读数，并在超出限制时发送电子邮件。首先配置 [E-mail](../system-information-and-utilities/e-mail.md) 设置，然后添加脚本和 scheduler 条目：

```ros
/system/script/add name=temp-alert source={
    :local t [/system/health/get [find name="cpu-temperature"] value]
    :if ($t > 65) do={/tool/e-mail/send to="admin@example.com"
        subject="Router overheating" body=("CPU temperature: " . $t)}
}
/system/scheduler/add name=temp-alert start-time=startup interval=5m on-event=temp-alert
```

在脚本中，这些值是由 CLI 打印的纯数字（54 表示 54 C），因此示例是与 65 进行比较。

有关所有参数，请参阅 [`/system/health`](../cli-reference/system/health/index.md) 和 [`/system/health/settings`](../cli-reference/system/health/settings/index.md) CLI 参考页面。
