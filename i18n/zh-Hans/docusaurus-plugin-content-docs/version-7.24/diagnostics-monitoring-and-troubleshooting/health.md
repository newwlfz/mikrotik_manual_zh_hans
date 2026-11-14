---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/health"
sidebar_position: 13
title: "健康"
sidebar_label: "健康"
description: "本页面介绍 MikroTik RouterOS 的硬件健康监控功能，详细说明受支持设备上的温度、电压、风扇转速和 CPU 状态等指标。内容包括 CLI 示例、关于设备限制的警告，以及基于 PoE-out 负载或温度阈值的风扇控制参数。"
tags:
  - 'system-health'
  - 'fan-control'
  - 'temperature'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/health
captured_at: '2026-11-04T11:27:55+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

支持监控的硬件会显示不同的硬件状态信息，例如温度、电压、电流、风扇转速等。

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

:::info
有关 RouterBOARD 产品的功能可用性，请查看 [mikrotik.com](https://mikrotik.com/products)
:::

在 [CCR2004-16G-2S+PC](https://mikrotik.com/product/ccr2004_16g_2s_pc) 设备上进行密集的健康状态监控（通过控制台、winbox 或 SNMP）会导致显著的 CPU 负载。

### 电压 {#voltage}

支持电压监控的路由器会显示供电电压值。在 CLI/Winbox 中会以伏特为单位显示。在 scripts/API/SNMP 中，该值为 dV 或 CLI/Winbox 中显示的值

**注意：** 具有 PEXT 和 PoE 电源输入的路由器使用 PEXT 进行校准，因此，由于额外的以太网保护电路，通过 PoE 显示的值可能低于输入电压。

```ros
[admin@MikroTik] > /system/health/print 
Columns: NAME, VALUE, TYPE
#  NAME         VALUE  TYPE
0  voltage      23.8   V   
1  temperature  39     C 
```

:::warning
如果旧版 CRS112、CRS210 和 CRS109 设备通过 PoE 供电，健康状态将仅在最高 26.7V 时显示正确电压。如果使用更高电压，健康状态将显示恒定的 16V。
:::

### 温度 {#temperature}

支持温度监控的路由器会显示温度读数。在 CLI/Winbox 中会以摄氏度为单位显示。使用 scripts/API/SNMP 时，此值将在 CLI/Winbox 中显示为乘以 10 后的值。根据设备不同，有多种温度传感器。这些传感器可能指：cpu-temperature、pcb-temperature、sfp-temperature。您可以在 [mikrotik.com](https://mikrotik.com/products) 的规格说明中找到设备经过测试的环境温度范围。经过测试的环境温度范围是设备可以实际放置的温度范围。它**并不**等同于系统健康监控报告的温度！

### 风扇控制与行为 {#fan-control-and-behavior}

**子菜单：** `/system/health`

使用此菜单，用户可以控制 TILE 架构[设备](https://mikrotik.com/download)上的风扇行为。

:::info
从 6.45.5 版本开始，风扇稳定性得到改进。
:::

有三个参数可能影响风扇行为：PoE-out 功耗、SFP 温度和 CPU 温度。一旦其中一个参数超过最佳值，风扇就会启动。

#### PoE-out 功耗 {#poe-out-consumption}

如果设备具有 PoE-out，则风扇 RPM 将如下所述变化：

| PoE-out 负载 | 最大风扇转速的 RPM 百分比 |
| :-- | :-- |
| 0%..24% | 风扇转速 0% |
| 25%..46% | 风扇转速 25% |
| 47%..70% | 风扇转速 50% |
| 71%..92% | 风扇转速 75% |
| 93%.. | 风扇转速 100% |

对于配备 **PWM** 风扇的设备，转速将在 9..88% 范围内线性增加或降低（注意：低于 100W 时风扇 RPM=0）

#### 有限的手动风扇控制选项 {#limited-manual-fan-control-option}

:::info
从 RouterOS 7.9 版本开始，为 CRS3xx、CRS5xx 和 CCR2xxx 设备添加了有限的手动风扇控制选项。

从 RouterOS 7.14 版本开始，CCR1036-8G-2S+-r2、CCR1036-12G-4S-r2 和 CCR1016-12S-1S+-r2 设备可用的有限手动风扇控制已提供。
:::

可以使用系统健康状态的设置部分来调整风扇行为：

```
/system/health/settings/set 
```

可用属性如下所述：

| 属性 | 描述 |
| :-- | :-- |
| **fan-full-speed-temp** (*整数* *[-273..65];* 默认值：**65**) | 设置温度值，达到该值后风扇转速将提高到最大可能 RPM。  从 CPU、PHY、SWITCH 和 SFP 读取温度，并根据温度最高的组件调整风扇转速。 |
| **fan-target-temp** (*整数* *[-273..65];* 默认值：**58**) | 设置最热组件的目标温度。基于此设置，它会调整风扇行为，以将温度保持在目标范围内。 |
| **fan-min-speed-percent** (*整数* *[0..100];* 默认值：**取决于风扇控制器**) | 设置风扇转速的最低百分比，从而不允许风扇的 RPM 低于此值。**\*注意：** 默认值可能因风扇控制器芯片和/或特定型号要求而异。从 RouterOS 7.14 版本开始，默认值设为 **12**，所有先前版本均为 **0.** |
| **fan-control-interval** (*整数* *[5..30];* 默认值：**30**) | 设置实际温度数据读取间隔，以从 CPU、PHY、SWITCH 和 SFP 获取温度值。  **\*注意：** 此设置会直接影响 CPU 使用率 |
| **cpu-overtemp-check** *(yes \| no; 默认值：no)* | 启用/禁用 CPU 过温监控。  *(适用于 ARM/ARM64 设备)* |
| **cpu-overtemp-threshold** *(整数 [0..105]; 默认值：105)* | 触发过温保护前的最高温度。 |
| **cpu-overtemp-startup-delay** *(时间; 默认值：1m)* | 启动后启用过温监控之前的延迟时间。 |

#### 风扇控制简要说明 {#brief-description-of-the-fan-control}

如果至少有一个内部测量温度（CPU、SFP、Switch、Board 等）超过 **fan-target-temp**，风扇就会开始旋转。温度越高，风扇旋转得越快。对于配备 PWM 风扇的设备，当内部测量温度超过 **fan-target-temp** 时，风扇会线性提高其 RPM，以尽可能将温度保持在 **fan-target-temp**；当温度等于或超过 **fan-full-speed-temp** 时，风扇将达到其最大 RPM。  对于配备 DC 风扇的设备，当内部测量温度超过 **fan-target-temp** 时，风扇会开始旋转，但默认情况下会以更高的最低 RPM 运行。如果 **fan-min-speed-percent** 设为 **0%**，这可能会导致设备冷却到风扇完全关闭的程度；而在默认值为 **12%** 的情况下，风扇永远不会完全停止，从而减少可能出现的噪声和启停峰值。随后温度可能缓慢升高到 **fan-target-temp**，风扇会再次开启。目前有一个例外。S+RJ10 模块在触发风扇之前具有 65C 的温度阈值。由于这是更高的温度阈值，风扇会以更高的初始转速启动来冷却设备。上述所有功能都直接与 **fan-control-interval** 参数值相关，因为它决定了风扇控制器监控所有传感器数据并触发风扇控制更改的频率。

:::warning
PWM 和 DC 风扇对风扇控制的反应方式不同。PWM 风扇会以线性方式提高/降低其 RPM，而 DC 风扇只有少数几个可能的工作转速等级。
所有读数均为近似值，可能并非 100% 精确。其目的是~告知用户可能/即将发生的故障。
:::
