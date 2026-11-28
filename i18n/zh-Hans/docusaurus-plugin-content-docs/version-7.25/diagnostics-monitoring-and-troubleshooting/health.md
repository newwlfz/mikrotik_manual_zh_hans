---
title: "健康状态"
description: "本页介绍 MikroTik RouterOS 的硬件健康监测功能，详细说明受支持设备的温度、电压、风扇转速和 CPU 状态等指标。页面包含 CLI 示例、设备限制相关警告，以及基于 PoE-out 负载或温度阈值的风扇控制参数。"
tags:
  - 'system-health'
  - 'fan-control'
  - 'temperature'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/health
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

支持监控的硬件会显示不同的硬件状态信息，例如温度、电压、电流、风扇转速等。

CCR1072-1G-8S+ 设备示例：

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

:::info
有关 RouterBOARD 产品上的功能可用性，请查看 [mikrotik.com](https://mikrotik.com/products)
:::

在 [CCR2004-16G-2S+PC](https://mikrotik.com/product/ccr2004_16g_2s_pc) 设备上进行高强度 health 监控（通过控制台、winbox 或 SNMP）会导致显著的 CPU 负载。

### Voltage

支持电压监控的路由器会显示供电电压值。在 CLI/Winbox 中，该值以伏特显示。在 scripts/API/SNMP 中，该值为 dV 或 CLI/Winbox 中显示的值。

**注意：** 具有 PEXT 和 PoE 电源输入的路由器使用 PEXT 校准，因此，由于额外的以太网保护链路，通过 PoE 显示的值可能低于输入电压。

```ros
[admin@MikroTik] > /system/health/print 
Columns: NAME, VALUE, TYPE
#  NAME         VALUE  TYPE
0  voltage      23.8   V   
1  temperature  39     C 
```

:::warning
如果旧版本的 CRS112、CRS210 和 CRS109 设备通过 PoE 供电，Health 仅在不超过 26.7V 时显示正确电压。如果使用更高电压，Health 将显示固定 16V。
:::

### Temperature

支持温度监控的路由器会显示温度读数。在 CLI/Winbox 中，该值以摄氏度显示。使用 scripts/API/SNMP 时，该值为 CLI/Winbox 中显示的值乘以 10。根据设备不同，存在多种温度传感器。这些传感器可能对应：cpu-temperature、pcb-temperature、sfp-temperature。你可以在 [mikrotik.com](https://mikrotik.com/products) 的规格说明中查找设备经过测试的环境温度范围。经过测试的环境温度范围是设备可以实际放置的温度。它与系统 health 监控报告的温度**不**相同！

### 风扇控制和行为 {#fan-control-and-behavior}

**子菜单：** `/system/health`

使用该菜单可以控制 TILE 架构[设备](https://mikrotik.com/download)的风扇行为。

:::info
从 6.45.5 版本开始，提升了 FAN 稳定性。
:::

有三个参数可能会影响风扇行为：PoE-out 功耗、SFP 温度和 CPU 温度。只要其中一个参数超过最佳值，风扇就会启动。

#### PoE-out 功耗 {#poe-out-consumption}

如果设备具有 PoE-out，则风扇 RPM 将按如下所述变化：

| PoE-out 负载 | RPM 占最大 FAN 速度的百分比 |
| :-- | :-- |
| 0%..24% | FAN 速度 0% |
| 25%..46% | FAN 速度 25% |
| 47%..70% | FAN 速度 50% |
| 71%..92% | FAN 速度 75% |
| 93%.. | FAN 速度 100% |

对于配备 **PWM** 风扇的设备，速度会在 9..88% 范围内线性增加或降低（注意：低于 100W 时风扇 RPM=0）

#### 受限的手动风扇控制选项 {#limited-manual-fan-control-option}

:::info
从 RouterOS 7.9 版本开始，CRS3xx、CRS5xx 和 CCR2xxx 设备增加了受限的手动风扇控制选项。

从 RouterOS 7.14 版本开始，CCR1036-8G-2S+-r2、CCR1036-12G-4S-r2 和 CCR1016-12S-1S+-r2 设备提供受限的手动风扇控制。
:::

可以通过 system health 的 settings 部分调整风扇行为：

```
/system/health/settings/set 
```

可用属性如下所述：

| 属性 | 描述 |
| :-- | :-- |
| **fan-full-speed-temp** (*integer* *[-273..65];* 默认：**65**) | 设置风扇速度提升至最大可能 rpm 的温度值。<br/> 从 CPU、PHY、SWITCH 和 SFP 读取温度，并根据温度最高的组件调整风扇速度。 |
| **fan-target-temp** (*integer* *[-273..65];* 默认：**58**) | 设置最热组件的目标温度。根据该设置调整风扇行为，使温度保持在目标范围内。 |
| **fan-min-speed-percent** (*integer* *[0..100];* 默认：**取决于 FAN 控制器**) | 设置风扇速度的最小百分比，使风扇 rpm 不低于该值。**\*注意：** 默认值可能因 FAN 控制芯片和/或特定型号要求而异。从 RouterOS 7.14 版本开始，默认值为 **12**，所有早期版本为 **0。** |
| **fan-control-interval** (*integer* *[5..30];* 默认：**30**) | 设置读取 CPU、PHY、SWITCH 和 SFP 温度值的实际温度数据读取间隔。<br/><strong>*注意：</strong> 此设置直接影响 CPU 使用率 |
| **cpu-overtemp-check** *(yes \| no; 默认：no)* | 启用/禁用 CPU 过温监控。<br/><em>（适用于 ARM/ARM64 设备）</em> |
| **cpu-overtemp-threshold** *(integer [0..105]; 默认：105)* | 触发过温保护前的最高温度。 |
| **cpu-overtemp-startup-delay** *(time; 默认：1m)* | 启动后启用过温监控前的延迟。 |

#### 风扇控制简介 {#brief-description-of-the-fan-control}

如果至少一个内部测量温度（CPU、SFP、Switch、Board 等）超过 **fan-target-temp**，风扇将开始旋转。温度越高，风扇旋转越快。对于配备 PWM 风扇的设备，当内部测量温度超过 **fan-target-temp** 时，风扇将线性提高 RPM，以尽可能将温度保持在 **fan-target-temp**，当温度等于或超过 **fan-full-speed-temp** 时，风扇将达到最大 RPM。对于配备 DC 风扇的设备，当内部测量温度超过 **fan-target-temp** 时，风扇将开始旋转，但默认情况下以较高的最低 RPM 旋转。如果 **fan-min-speed-percent** 设置为 **0%**，这可能导致设备冷却到风扇完全停止的程度；而使用默认值 **12%** 时，风扇不会完全停止，从而降低噪音和可能出现的开/关峰值。随后温度可能缓慢升高至 **fan-target-temp**，风扇将再次开启。目前有一个例外。S+RJ10 模块在触发风扇前的温度阈值为 65C。由于该温度阈值较高，风扇将以较高的初始速度开始旋转，以冷却设备。上述所有功能都与 **fan-control-interval** 参数值直接相关，因为该值决定 FAN 控制器监控所有传感器数据并触发风扇控制变化的频率。

:::warning
PWM 和 DC 风扇对风扇控制的响应不同。PWM 风扇会以线性方式提高或降低 RPM，而 DC 风扇只有少数几个可能运行的速度档位。
所有读数均为近似值，可能并非 100% 精确。其作用是 ~告知用户可能发生的或即将发生的故障。
:::
