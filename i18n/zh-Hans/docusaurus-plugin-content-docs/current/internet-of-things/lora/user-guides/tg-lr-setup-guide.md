---
sidebar_key: "internet-of-things/lora/user-guides/tg-lr-setup-guide"
sidebar_position: 4
title: "TG-LR 设置"
sidebar_label: "TG-LR 设置"
description: "本页是 MikroTik TG-LR82 和 TG-LR92 LoRaWAN 传感器标签的设置指南，涵盖激活、入网、遥测与传感器配置、磁开关命令、下行链路命令编码、数据帧以及已知问题。"
tags:
  - 'lora'
  - 'lorawan'
  - 'iot'
source: https://manual.mikrotik.com/docs/internet-of-things/lora/user-guides/tg-lr-setup-guide
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<span id="tg-lr"></span>

## 快速入门指南 {#quickstart-guide}

- 在 LoRaWAN 网络服务器上注册设备。如果设备型号不受支持，请使用 [`tg-lrx2-2.0-ul-dec.js`](pathname:///assets/tg-lrx2-2.0-ul-dec.js) 载荷解码脚本。

- 可选择部署 Grafana + Influx（[`telemetry_hub.zip`](pathname:///assets/telemetry_hub.zip)）docker 服务，用于设备能力评估。

- 将磁铁靠近簧片开关以激活设备，并等待 LED 闪烁 2 次（约 1.5 秒）。

## 功能 {#functionality}

:::note

新设备处于 [SHUTDOWN](#shutdown) 模式。要激活，请使用[磁铁开关命令](#mag-sw-cmd)。
:::

<span id="id42"></span>

**Models**

| <span id="model"></span>型号 | 描述 | 传感器 |
| --- | --- | --- |
| <span id="tg-lr82"></span>TG-LR82 | LoRaWAN 1.0.4 Class A, B，863.0 - 869.0 MHz 频段。 | TMP116N, HDC2010, LIS2DW12 |
| <span id="tg-lr92"></span>TG-LR92 | LoRaWAN 1.0.4 Class A, B，900.0 - 928.0 MHz 频段。 | TMP116N, HDC2010, LIS2DW12 |

<span id="id43"></span>

**Bands**

| 数字代码 | 名称 | 描述 |
| --- | --- | --- |
| 1 | <span id="band-1ghz"></span>BAND_1GHz | 亚 GHz 工作频段。频率范围取决于设备 [型号](#model)。 |
| 2 | <span id="band-2ghz"></span>BAND_2GHz | 2.4GHz ISM 频段。 |

<span id="id44"></span>

**运行模式**

| 数字代码 | 模式 | 描述 |
| --- | --- | --- |
| 0 | <span id="shutdown"></span>SHUTDOWN | 设备处于低功耗模式，所有功能已禁用。 |
| 1 | <span id="run"></span>RUN | 设备加入网络，并根据当前配置文件与配置发送上行链路。 |

<span id="id45"></span>

**<span id="supported-regions"></span>支持的区域**

| [X-Y 代码](#x-y) | [下行链路](#lora-set-region) | 通用名称 | [TG-LR82](#tg-lr82) | [TG-LR92](#tg-lr92) |
| --- | --- | --- | --- | --- |
| 1-1 | 1 | <span id="eu868"></span>EU868 | yes |  |
| 2-1 | 2 | <span id="as923-grp1"></span>AS923_GRP1 |  | Yes |
| 3-1 | 3 | <span id="us915"></span>US915 |  | yes |
| 4-1 | 4 | <span id="au915"></span>AU915 |  | yes |
|  |  | <span id="ww2g4"></span>WW2G4 | Yes | Yes |
| 6-1 | 7 | <span id="as923-grp2"></span>AS923_GRP2 |  | Yes |
| 7-1 | 8 | <span id="as923-grp3"></span>AS923_GRP3 |  | Yes |
| 8-1 | 9 | <span id="in865"></span>IN865 | yes |  |
| 9-1 | 10 | <span id="kr920"></span>KR920 |  | yes |

### LoRaWAN {#lorawan}

设备支持 Class A 和 B，并且可以在两个频段中工作：[BAND_1GHz](#band-1ghz) 和 [BAND_2GHz](#band-2ghz)。
用户可以配置周期性链路检查、MAC 时间同步（DeviceTimeReq）和网络 ADR。

#### 入网过程 {#join-procedure}

激活后（[RUN](#run)），设备将尝试加入网络。设备在主频段发送 Join-Request，
如果未收到 Join-Accept，它将等待退避间隔，然后在启用的情况下于次频段发送下一个 Join-Request，否则再次在 primary-band 发送。

:::note

加入尝试间隔取决于上一次 Join-Request 的空中时间和总加入时间。
参见 [1](#id40) 第 7 节。如果上一次加入请求使用了较慢的数据速率，则预期间隔会更长。
:::

加入配置命令：[lora primary-band](#lora-primary-band)、[lora second-band](#lora-second-band)、[lora join-cfg](#lora-join-cfg)。
关于如何将文本命令转换为用于下行的二进制编码，请参阅 [命令编码](#command-encoding)。

#### 链路检查 {#link-check}

设备加入网络后，可以执行可选的周期性链路检查。可以使用 [lora link-chk](#lora-link-chk) 针对每个频段单独配置链路检查。如果链路检查失败，设备会离开网络并重新启动加入流程。

:::note

任何网络下行链路都会重启链路检查计时器，以防止不必要的 LinkCheckReq。
:::

#### 时间同步 {#time-synchronization}

设备支持使用 DeviceTimeReq MAC 命令进行可选的时间同步。有关配置参数或请求立即同步，请参阅命令 [lora clk-sync](#lora-clk-sync)。

#### Class B {#class-b}

设备支持 Class B 操作。Class B 操作可以通过
[lora class](#lora-class) 手动请求，或者设备可以配置为在加入网络时使用
[lora cfg-class-b](#lora-cfg-class-b) 自动切换到 class B。

#### ADR 配置 {#adr-configuration}

可以使用 [lora adr-cfg](#lora-adr-cfg) 禁用 network ADR 并设置固定数据速率。

#### 离开网络 {#leaving-network}

当出现 [Link Check](#link-check) 或确认的上行链路故障时，设备会离开网络并重新启动加入流程。

#### 凭证 {#credentials}

设备具有随每台设备提供的出厂配置默认凭据：[DevEUI](#deveui)、[JoinEUI](#joineui)、[AppKey](#appkey)。

<span id="deveui"></span>DevEUI and <span id="joineui"></span>JoinEUI are IEEE 64-bit EUI ([2](#id41)) written MSB first.
On air byte order is LSB first. See [1](#id40) section 6.2.5.

<span id="appkey"></span>AppKey is 16 byte AES128 encryption key and is written as stored in device memory. AppKey must be kept secret!

要更改 [JoinEUI](#joineui) 和 [AppKey](#appkey)，请使用命令：[lora join-eui](#lora-join-eui)、[lora net-key](#lora-net-key) 和 [lora cred](#lora-cred)。
命令 [lora join-eui](#lora-join-eui) 和 [lora net-key](#lora-net-key) 可按任意顺序执行，并可多次执行，以写入新的待处理
加入凭据。

一旦写入新的待处理凭据，就可以执行“[lora cred](#lora-cred) 600,1”或“[app reset](#app-reset) 0”以尝试使用新凭据加入。
如果新凭据未通过 join accept 确认，设备将恢复到之前的凭据。
有关已知问题，请参见 [LORA-275](#lora-275)、[LORA-276](#lora-276)！

下面示例写入 JoinEUI 和 AppKey 并尝试入网：

```none
lora join-eui 87904163,0x00,0x16,0xC0,0x01,0xFF,0xFE,0x00,0x00
lora net-key 87904163,0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0A,0x0B,0x0C,0x0D,0x0E,0x0F
lora cred 600
app reset 0
// device reboots and attempts join using new credentials with 600s timeout
```

JoinEUI 可从前面的示例中原样复制/粘贴为 00 16 C0 01 FF FE 00 00，以注册新设备。
[lora join-eui](#lora-join-eui) 参数为 MSB 在前。

:::warning

执行 *lora cred &lt;confirm-timeout-s&gt;,87904163* 将在不验证加入尝试的情况下强制确认凭据！你可能会失去对设备的访问权限！
:::

### 上行链路消息 {#uplink-messages}

每个 LoRaWAN 上行消息通过将待处理的 [数据帧](#data-frames) ID 及其内容放入 FPort 和
FRMPayload 字段来形成。所有待处理帧按升序打包，并且对 ID 使用差分编码。

:::note

有关帧编码详细信息，请参阅 [`tg-lrx2-2.0-ul-dec.js`](pathname:///assets/tg-lrx2-2.0-ul-dec.js) 脚本。此脚本可按原样用于应用服务器载荷解码器。
:::

### 遥测 {#telemetry}

#### 设备配置文件 {#device-profiles}

设备有 6 个可配置配置文件。每个配置文件独立存储传感器和上行发送配置。
这允许设备快速更改运行特性，而无需代价高昂的下行配置消息。
可使用 [设备命令](#device-commands)、[磁铁](#mag-sw-cmd)，甚至基于评估后的 [数据规则](#data-rules) 来切换配置文件。
例如，在每天仅数次上行的周期性 keepalive 模式与每几分钟更快速的遥测之间切换。

:::note

MikroTik 可以支持你的特定用例，提供具有自定义默认配置的新设备。
:::

设备预配置了评估配置，以展示一些可能的用例：

<span id="id46"></span>

**默认配置文件配置**

| <span id="profile-number"></span>配置文件编号 | 名称 | 描述 |
| --- | --- | --- |
| 0 | Sensor Telemetry | 每 5 分钟发送 [current-state](#current-state)、[device-orientation](#device-orientation)。每 60 分钟发送其余遥测数据。 |
| 1 | 活动监测 | 每 60 分钟发送 [activity](#activity)、[full-activity](#full-activity)、[current-state](#current-state)，并在活动空闲转换时发送 [activity_state](#activity-state) 事件。 |
| 2 | 磁力开关 | 每 60 分钟发送 [mag-switch](#mag-switch)、[current-state](#current-state)、[device-events](#device-events)，并在磁铁被移除至少 15 秒时发送 [mag_sw_cnt](#mag-sw-cnt) 事件。最多保存 10 个事件。 |
| 3 | 方向 | 每 60 分钟发送 [current-state](#current-state)、[device-events](#device-events)、[device-orientation](#device-orientation)。在空闲约 30 秒后快速旋转 30 度时发送 [device-orientation](#device-orientation) 帧。在特定方向时发送 [angle_1](#angle-1) 事件：V=(0,1,1)。最多保存 3 个事件。 |
| 4 | 资产监测 | 每 3 小时根据事件发送包含不同帧的资产健康信息。 |
| 5 | 空 | |

请参阅 [`default-cfg.txt`](pathname:///assets/tg-lrx2-default-cfg.txt)，以获取确切的出厂默认配置命令。

#### 配置传感器 {#configuring-sensors}

##### 采样间隔 {#sampling-intervals}

可以针对特定用例使用 [data poll-cfg](#data-poll-cfg) 命令配置周期性温度、湿度和电池电压采样。
设备可以以高于上行帧发送速率的速率对数据进行采样。这为发送平均值或执行基于规则的决策提供了机会。由于采样间隔会影响设备功耗，因此可以利用这一点来延长使用寿命。

##### 平均 {#averaging}

设备还会跟踪以下采样值的平均值：[temperature_ema](#temperature-ema)、[humidity_ema](#humidity-ema)、[battery_mv_ema](#battery-mv-ema)、[angle_ema](#angle-ema)。命令
[data ema-cfg](#data-ema-cfg) 配置指数移动平均 (<span id="ema"></span>EMA) 周期，并且如果启用了 *send-ema-**，可选择将 [EMA](#ema) 值发送到 [current-state](#current-state)、
[dev-health](#dev-health)、[device-orientation](#device-orientation) 中。

[data ema-cfg](#data-ema-cfg) 中的计数参数 *temp-cnt*、*humid-cnt*、*bat-cnt*、*orient-cnt* 决定用于移动
平均计算的系数 *a*。移动 EMA 根据前一个值 *ema* 和新值 *sample* 计算如下：

```none
ema(t) = sample(t) * a + ema(t-1) * (1 - a)
```

要获得 EMA 的近似时间常数 *t*，你需要使用由 [data poll-cfg](#data-poll-cfg) 和 [data orient-cfg](#data-orient-cfg) 配置的采样间隔
(*interval*) 以及相应的计数参数 (*N*)：

```none
t ~ (N + 1) * interval / 2
```

要获取 [data ema-cfg](#data-ema-cfg) 所需的 `count` 参数值：

```none
N ~ 2 * t / interval - 1
```

示例：

温度采样间隔 *th-poll-int* 使用 [data poll-cfg](#data-poll-cfg) 配置为 30s。要将 EMA 配置为时间常数 t ~ 60 分钟：

```none
temp-cnt = 2 * 3600 / 30 - 1 = 239
```

假设使用配置文件 #0，并且我们不想更改其他参数，则需要发送命令：

```none
data ema-cfg 1,239
```

##### 直方图 {#histogram}

所有周期性采样都会添加到温度和湿度直方图中。直方图除常规遥测外还可使用，
也可单独用于监测温度和湿度分布。使用 [data temp-histo-cfg](#data-temp-histo-cfg)、
[data humid-histo-cfg](#data-humid-histo-cfg) 命令配置 bin 和 epoch 间隔，和/或启用 [temp-histogram](#temp-histogram)、[humid-histogram](#humid-histogram) 帧。所有直方图帧都包含 epoch
编号，以检测直方图计数器重置。由于每个 bin 的帧大小限制为 1B，如果内部 bin 计数器值高于 255，直方图
将针对上行链路进行归一化（概率类型）。

示例配置：

```none
data temp-histo-cfg 1,86400,0,0,1,1,-10,0,10,15,17.5,20,22.5,25.0,30
data humid-histo-cfg 1,86400,0,0,1,1,10,20,30,40,50,60,70,80,90
```

##### 朝向 {#orientation}

![Device accelerometer axis.](/img/f1253ed3d2e4366d.png)

*设备加速度计轴。*

相对于地球的周期性设备三维姿态采样可通过以下命令配置： [data orient-cfg](#data-orient-cfg)。此外，可配置 3 个用户
方向向量 ref-1、ref-2、ref-3，以检测特定的设备姿态。用户变量 [angle_1](#angle-1)、[angle_2](#angle-2)、
[angle_3](#angle-3) 包含设备上次采样姿态与用户定义向量之间的当前角度。这些变量可用于
Data Rules 中，以在特定姿态时触发。[angle_ema](#data-rules) 是设备上次采样姿态与 [EMA](#angle-ema) 值之间的
角度。此外，还可通过 [major_axis_orientation](#ema) 变量获取粗略姿态。

<span id="id48"></span>

**[major_axis_orientation](#major-axis-orientation) 描述**

| 值 | 数字代码 | 描述 |
| --- | --- | --- |
| XH | 0 | X 向上 |
| HL | 1 | X 向下 |
| YH | 2 | Y 向上 |
| YL | 3 | Y 向下 |
| ZH | 4 | Z 向上 |
| ZL | 5 | Z 向下 |
| DISABLED | 7 | 传感器已禁用 |

粗定向的优点是它会在 [current-state](#current-state) 帧中发送。

##### 活动监测 {#activity-monitor}

设备具有基于加速度计的活动监控服务。该服务将自动管理一个确定移动/活动的简单状态机。[activity_s](#activity-s)、[high_activity_s](#high-activity-s)、[total_activity_s](#total-activity-s) 统计每个状态中累积的时间，[activity_state](#activity-state)、[activity_state_etm](#activity-state-etm) 保存状态信息。

命令 [data activity-cfg](#data-activity-cfg) 可用于配置活动监控的模式和阈值。[data activity-cal](#data-activity-cal) 可用于
自动执行特定模式的校准。

*level1-th* 和 *level2-th* 的单位是 *1/64 * 2G*，与其他加速度计设置无关（如 *data acc-cfg* 中）。*level2-cnt* 在内部计算，用户不可配置。*level2-cnt* 始终在 7..15 范围内，计算如下：

```none
level2-cnt = 7 + round((1 - ((level2-th - level1-th - 1) / 61)) * 8)
```

<span id="id49"></span>

**[activity_state](#activity-state) 描述**

| 数字代码 | 值 |
| --- | --- |
| 0 | IDLE |
| 1 | LOW |
| 2 | HIGH |
| 3 | DISABLED |

###### 单模式 {#single-mode}

在 [data activity-cfg](#data-activity-cfg) 中，Mode 设置为 single。

- 如果任一轴上的加速度计采样值高于 *level1-th*，设备会从 IDLE 状态转换到 LOW 状态。

- 如果所有采样值在至少 1.3s 内低于 *level1-th*，设备会从 LOW 状态转换到 IDLE 状态。

示例：将配置文件 #0 设置为单模式，阈值为 0.25G：

```none
data activity-cfg 1,1,8,63
```

###### 双模式 {#dual-mode}

Mode 在 [data activity-cfg](#data-activity-cfg) 中设置为 dual。

在双模式下，LOW 状态有两个子状态：LOW1 和 LOW2，两者都表示 LOW。设备在这两个状态期间都会报告 LOW 状态，并且活动计数器值会像处于 LOW 状态一样递增。唯一的区别是这些状态之间的转换逻辑。

<span id="id50"></span>

**[activity_state](#activity-state) 双模式状态转换**

| 当前 | 下一个 | 条件 |
| --- | --- | --- |
| IDLE | LOW2 | sample &gt; *level1-th* |
| LOW2 | LOW1 | sample &lt; *level2-th* 至少 5 秒 |
| LOW1 | LOW2 | sample &gt; *level1-th* |
| LOW2 | HIGH | 采样值 &gt; *level2-th* 至少 *level2-cnt* 次 |
| LOW1 | IDLE | 采样值 &lt; *level1-th* 至少 5 秒 |
| HIGH | LOW1 | 采样值 &lt; *level2-th* 至少 5 秒 |

示例：将配置文件 #0 设置为双模式，阈值为 0.25G 和 0.5G：

```none
data activity-cfg 1,2,8,16
```

###### 校准 {#calibration}

除了手动配置 *level1-th* 和 *level2-th* 之外，还有活动校准功能。
执行命令 [data activity-cal](#data-activity-cal) 将对 *cal-level* 执行自动校准。*level-one* 将为 *profile-mask* 中选定的所有配置文件校准 *level1-th*，
而 *level-two* 将校准 *level2-th*。对于双模式，您可以依次运行 *level-one* 和
*level-two*。校准时间为 15 秒。此功能最适用于周期性运动/振动。

:::note

在校准过程或活动监视器测试期间启用 LED 可能有助于确保正确运行。
:::

示例：使用单级活动监测校准配置文件 #0：

:::warning

在启用方向的情况下进行活动校准会导致故障和设备重启。
校准前使用 [data orient-cfg](#data-orient-cfg) 禁用，完成后重新启用。参见 [LORA-279](#lora-279)。
:::

- 将设备放置在具有周期性运动/活动的环境中进行校准。

- 发送命令：

  ```none
  data activity-cfg 1,1,,,1
  data activity-cal 1,1,1
  ```

- 观察 LED 周期性闪烁 2 次/1.5s，持续约 15s。

- 测试运动检测。在 LOW 活动期间，设备将闪烁 LED 3 次/1s。

- 如果校准结果可接受，发送命令以禁用 LED：

  ```none
  data activity-cfg 1,,,,0
  ```

示例：使用双级活动监测校准配置文件 #0：

- 将设备放置在具有周期性运动/活动的环境中进行级别 1 校准。

- 发送命令：

  ```none
  data activity-cfg 1,2,,,1
  data activity-cal 1,1,1
  ```

- 观察 LED 周期性闪烁 2 次/1.5s，持续约 15s。

- 将设备放置在用于级别 2 校准的环境中。

- 发送命令以校准级别 2：

  ```none
  data activity-cal 1,2,1
  ```

- 观察 LED 周期性闪烁 2 次/1.5s，持续约 15s。

- 测试运动检测。在 HIGH 活动期间，设备将闪烁 LED 6 次/1s。

- 如果校准结果可接受，发送命令以禁用 LED：

  ```none
  data activity-cfg 1,,,,0
  ```

:::note

校准后，可以使用命令 [data activity-cfg](#data-activity-cfg) 手动更改 *level1-th* 和 *level2-th*。
:::

##### 冲击与自由落体 {#impact-and-free-fall}

命令 [data acc-cfg](#data-acc-cfg) 可用于配置设备加速度计，以实现基本的撞击和自由落体检测。
帧：[motion-events](#motion-events)、[impact-count](#impact-count) 包含相关数据字段。[current-state](#current-state) 包含 [impact_evnt](#impact-evnt)、
[free_fall_evnt](#free-fall-evnt) 标志，用于指示新事件。如果更倾向于显式读取，可以使用这些标志。

变量 [impact_cnt](#impact-cnt)、[impact_cnt_x](#impact-cnt-x)、[impact_cnt_y](#impact-cnt-y)、[impact_cnt_z](#impact-cnt-z)、[impact_etm](#impact-etm)、[free_fall_cnt](#free-fall-cnt)、
[free_fall_etm](#free-fall-etm) 允许基于规则的逻辑。

:::warning

如果启用了 [Activity Monitor](#activity-monitor)，则无法使用冲击和自由落体检测，它们将被忽略。
:::

#### 数据规则 {#data-rules}

通过命令可配置最多 32 条自定义用户规则：[data set-rule](#data-set-rule)、[data del-rule](#data-del-rule)。规则具有测试表达式、可选的输入规则以及要执行的操作。

添加或覆盖规则的命令语法：

```none
data set-rule [<rule-num>],<test-expr>,[<input-expr>],[<switch-profile>],[<make-event-0>],[<make-event-1>], [<make-event-2>],[<make-event-3>],[<send-frame-0>],[<send-frame-1>],[<send-frame-2>],[<send-frame-3>],[<clr-timer-mask>]
```

##### 测试表达式 {#test-expression}

&lt;test-expr&gt;: [^] [variable-type](#variable-type) &lt;operator&gt; &lt;argument&gt;

| [^] | 在表达式中使用变量的绝对值 |
| --- | --- |
| [variable-type](#variable-type) | 变量名或 ID |
| &lt;运算符&gt; | &gt;, &gt;=, &lt;, &lt;=, ==, !=, % |
| &lt;参数&gt; | 数值 |

示例：

```none
data set-rule 0,profile == 0
data set-rule 1,^temperature > 30.55
data set-rule 2,impact_etm < 60
```

相同的规则可以使用 [用户变量](#user-variables) 数字 ID 来给出：

```none
data set-rule 0,0 == 0
data set-rule 1,^8 > 30.55
data set-rule 2,24 < 60
```

##### 输入表达式 {#input-expression}

如果规则需要依赖其他规则的结果，则使用输入表达式。这允许基于多个测试表达式构造复杂逻辑。

`<input-expr>: [&][|][!]<input-rule>[<]`

| [&] | &lt;rule-num&gt; 和 &lt;input-rule&gt; 的逻辑与 |
| --- | --- |
| [\|] | &lt;rule-num&gt; 和 &lt;input-rule&gt; 的逻辑或 |
| [!] | 输入值的逻辑非 |
| &lt;input-rule&gt; | 要作为输入添加的规则编号 |
| [&lt;] | 使用规则的[组合状态](#combined-state)作为输入值，否则使用[本地状态](#local-state)。 |

以下配置将在磁性开关状态改变发生在不到 15 秒前，且 [temperature](#current-state) 或 [humidity](#temperature) 超出范围（-5..55 和 10..90%）时，发送 [current-state](#humidity) 数据帧：

```none
data del-rule
data set-rule 0,temperature < -5
data set-rule 1,temperature > 55
data set-rule 2,humidity < 10
data set-rule 3,humidity > 90,|0|1|2
data set-rule 4,mag_sw_etm < 15,&3<,,,,,,current-state
```

:::warning

输入规则按数字顺序评估，与 set-rule 命令中的顺序无关。
:::

##### 动作 {#actions}

规则 [测试表达式](#test-expression) 的求值结果表示数据规则的 <span id="local-state"></span>本地状态。本地状态与可选输入规则一起求值后表示 <span id="combined-state"></span>组合状态。

如果 [组合状态](#combined-state) 变为 TRUE 状态，则执行可选规则操作：配置文件切换、事件生成、帧调度、用户计时器重置。

如果给出了 &lt;switch-profile&gt; 参数，当前配置文件将被更改。例如，如果温度
降至 15 C 以下，设备将切换到配置文件 5（[设备配置文件](#device-profiles)）：

```none
data set-rule 1,temperature < 15,,5
```

每条规则最多可以调度 4 种不同的 [数据帧](#data-frames)：

```none
data set-rule 0,impact_cnt % 10,,,,,,,current-state,device-orientation,dev-health,ema-temp
```

:::note

如果需要发送超过 4 个帧，可以使用规则链。
:::

每条规则最多可生成 4 个不同事件：

```none
data set-rule 0,impact_cnt % 10,,,temperature_ema,humidity_ema,activity_state,timer_1
```

##### 事件 {#events}

[操作](#actions) 可以选择性地生成事件。事件是带时间戳的[用户变量](#user-variables)，会通过 [device-events](#device-events) 帧发送。事件存储可以使用 [data event-cfg](#data-event-cfg) 命令配置。如果设备已使用[时间同步](#time-synchronization)接收到绝对时间，事件将带有 POSIX 时间戳。这样可以收集特定的历史数据以便稍后报告。事件上行链路可以定期触发、基于某些规则触发，或使用下行命令手动触发。

### 磁开关 {#magnet-switch}

设备带有磁开关，可用于命令输入或作为磁场传感器。如果不使用，可通过 [mag svc](#pin) 命令完全禁用命令输入，或使用 [PIN](#mag-svc) 对其进行保护。

:::note

每个设备都附带唯一的 <span id="pin"></span>PIN 码。
:::

#### 命令输入 {#command-input}

用户必须输入 1 到 4 位数字的命令序列。每位数字连续输入。空闲 2.5s 后，有效输入命令将被执行，设备使用 LED 指示结果。成功执行的命令以 3 次 0.2s LED 闪烁指示，失败则以 1s 长 LED 脉冲指示。无效命令会被忽略。

当对设备施加磁场时，LED 开始以 500ms ON、500ms OFF 的间隔闪烁
（或根据 [mag cfg](#mag-cfg) 配置的 blink-mode）。当 LED 点亮时，内部计数器从 0 开始递增。
当移除磁场时，计数器值被锁存为用户输入数字。如果再次施加磁场，则开始输入序列中的下一位数字。
如果输入数字后的间隔大于 2.5s，则对序列进行求值。

:::note

当基于时间应用输入码时，请确保遵循以下公式：T = N - 0.5，其中
N 是从 1 到 9 的输入数字，T 是施加磁场的时间（秒）。数字之间的间隔
必须小于 2.5s，但大于 200ms。
:::

某些命令需要进入 [PIN](#pin) 模式，而某些命令可以选择性地受 [PIN](#pin) 模式保护。参见表
[磁开关命令](#mag-sw-cmd)。要进入 [PIN](#pin) 模式，用户必须输入设备随附的 [PIN](#pin) 数字
序列。进入 [PIN](#pin) 模式后，它将在可配置时间后过期，设备将返回
正常模式。

:::warning

也可以完全禁用 magnet 命令。重新启用的唯一方法是使用
LoRaWAN 下行命令。如果磁传感器仅用于检测外部信号
且不希望或不允许用户命令，这会很有用。
:::

<span id="mag-sw-cmd"></span>

**磁力开关命令**

| 序号 | PIN 模式 | 命令说明 |
| --- | --- | --- |
| 2 | 可选 | 激活 - 启用 [RUN](#run) 模式。 |
| 3-1 | 可选 | 触发 [current-state](#current-state) 帧上行链路。 |
| 4-1-X | 可选 | 切换设备配置文件，其中 X 为 [配置文件编号](#profile-number) + 1 [1..6]。 |
| 4-2-1 | 可选 | 将主频段设置为 [BAND_1GHz](#band-1ghz)。 |
| 4-2-2 | 可选 | 将主频段设置为 [BAND_2GHz](#band-2ghz)。 |
| 4-3-1 | 可选 | 启用辅助频段。 |
| 4-3-9 | 可选 | 禁用辅助频段。 |
| 6-1 | 可选 | 设备重启。 |
| 6-2-9 | 可选 | 停用设备 - [SHUTDOWN](#shutdown) 模式。 |
| 9-<span id="x-y"></span>X-Y | 可选 | 按 [支持的频段区域](#supported-regions) 设置 sub GHz 频段区域。 |
| 6-9-9 | 必需 | 设备恢复出厂设置。 |
| 3-1-5 | mandatory | 退出 PIN 模式。 |
| A-B-C-D | – | 进入 PIN 模式。A-B-C-D 是设备出厂 [PIN](#pin) 码的数字。 |
| 5-3-1 | 可选 | 保留。 |

:::note

数字输入期间的 LED 指示可以根据设备配置进行更改。可以使用 [mag cfg](#mag-cfg) 更改或完全禁用 LED 指示。
:::

#### 磁传感器 {#magnet-sensor}

磁性传感器始终处于运行状态（即使在应用命令时也是如此）。该传感器可用于检测切换事件 [mag_sw_flag](#mag-sw-flag)，或统计这些事件的数量 [mag_sw_cnt](#mag-sw-cnt)。设备可以报告当前开关状态、状态变化次数以及最后一次的时间戳（UNIX/uptime）[mag_switch_ts](#mag-switch-ts)。此外，你还可以基于这些属性创建规则。

### 命令编码 {#command-encoding}

设备命令采用二进制编码，以减小下行链路消息大小。我们提供 Python 工具来验证、编码并将命令发布为 LoRaWAN 二进制下行链路消息。

使用 *pip install tg-lrx2-utils* 从 [PyPI](https://pypi.org/project/tg-lrx2-utils/) 安装。

用于将 [current-state](#current-state) 和 [activity](#activity) 帧上行链路设置为每 600 秒、将 [mag-switch](#mag-switch) 设置为每 43200 秒作为确认消息的示例配置：

```none
# lora-script.txt
frame set-cfg 1,601,0,0,current-state,activity
frame set-cfg 1,43200,1,0,mag-switch
```

我们可以使用 *tg-lrx2-encode* 将文本命令转换为用于下行链路的二进制消息：

```none
tg-lrx2-encode --script ./lora-script.txt --dev-desc ./tg-lrx2-2.0-desc.yml --max-len=50 --out ./lora-pub.yml
```

:::note

[`tg-lrx2-2.0-desc.yml`](pathname:///assets/tg-lrx2-2.0-desc.yml) 包含完整的设备特性描述，并被其他工具使用。
请确保为特定设备和 FW 版本使用正确的文件！
:::

*lora-pub.yml* 将包含用于下行链路的序列化二进制载荷。你可以使用可用的 Web 工具手动调度它们，或使用 *tg-lrx2-pub* 在 The Things Network 上调度它们：

```none
tg-lrx2-pub --host ./ttn-app.yml --dl-msg ./lora-pub.yml device-id
```

示例 TTN 凭证文件：

```none
# ttn-app.yml
app-id: "ttn-tag-demo@ttn"
host: "eu1.cloud.thethings.industries"
port: 1883
user: "ttn-tag-demo@ttn"
password: "NNSXS.5G..."
```

*tg-lrx2-encode* 也接受 CLI 上的命令字符串。这可用于单行或少数几行命令：

```none
tg-lrx2-encode --cmd $'frame send device-orientation\napp profile 1,0' --dev-desc ./tg-lrx2-2.0-desc.yml --max-len=50 --out ./lora-pub.yml
tg-lrx2-pub --host ./ttn-app.yml --dl-msg ./lora-pub.yml device-id
```

### 设备命令 {#device-commands}

所有设备命令由 *group-name* 和 *cmd-name* 组成。可选参数在方括号中给出。对于 *tg-lrx2-encode* 脚本，参数必须用逗号分隔。*group-name* 和 *cmd-name* 也可以用逗号分隔，但也接受空格。

示例：

```none
app factory-reset <key>,[<fw-def>],<delay-ms>
```

参数 &lt;key&gt; 和 &lt;delay-ms&gt; 是必填项，而 &lt;fw-def&gt; 是可选的，可以省略：

```none
app factory-reset 984651411,,2500
```

每个参数都有有效的输入范围和格式。某些参数只允许在参数之间进行特定选择，或在范围之间进行选择。

大多数参数接受整数值。*%f* 表示该参数接受小数值。使用这些值
会导致更大的下行有效载荷，因此如果可能，应优先使用整数值。[variable-type](#variable-type) 表示
该参数接受用户变量名或相应的整数 ID。[frame-type](#frame-type) 表示该参数
接受数据帧名或整数 ID。*tg-lrx2-encode* 会自动将这些名称转换为数字 ID。

#### app set-mode {#app-set-mode}

<strong>app set-mode &lt;mode&gt;</strong>

设置设备运行模式

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| mode | 0 | <a href="#shutdown">SHUTDOWN</a> |
|  | 1 | <a href="#run">RUN</a> |

  

#### app profile {#app-profile}

<strong>app profile &lt;profile-num&gt;,&lt;make-default&gt;</strong>

切换活动配置文件，并可选地将其设为默认

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-num | 0..5 | |
| make-default | 0 | no |
|  | 1 | yes |

  

#### app reset {#app-reset}

<strong>app reset &lt;type&gt;</strong>

系统重置

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| type | 0 | 主板 |
| | 1 | 仅应用 |

  

#### app factory-reset {#app-factory-reset}

<strong>app factory-reset &lt;key&gt;,[&lt;fw-def&gt;],&lt;delay-ms&gt;</strong>

重启设备，清除已保存的配置并恢复为默认设置（可选）

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| key | 984651411 | |
| fw-def | 784565141 | 不应用默认配置 |
| delay-ms | 0..65535 | |

    
  

#### app led {#app-led}

<strong>app led [&lt;enable&gt;]</strong>

配置应用程序 LED 信号

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| enable | 0 | no |
|  | 1 | yes |

  

#### app set-time {#app-set-time}

<strong>app set-time [&lt;unix-time-s&gt;],&lt;uptime-s&gt;</strong>

设置相对于设备运行时间的 UNIX 时间

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| unix-time-s | 0..4294967295 | |
| uptime-s | 0..4294967295 | |

    
  

#### lora set-region {#lora-set-region}

<strong>lora set-region &lt;region-code&gt;</strong>

设置 sub GHz 频段的 LoRaWAN 区域

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| region-code | 1 | EU868 |
| | 2 | AS923-1 |
| | 3 | US915 |
| | 4 | AU915 |
| | 7 | AS923-2 |
| | 8 | AS923-3 |
| | 9 | IN868 |
| | 10 | KR920 |

  

#### lora primary-band {#lora-primary-band}

<strong>lora primary-band &lt;band&gt;</strong>

选择主频段

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| band | 1 | &lt;1GHz |
| | 2 | 2.45GHz |

  

#### lora second-band {#lora-second-band}

<strong>lora second-band &lt;mode&gt;</strong>

启用或禁用辅助频段

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| mode | 0 | 关 |
| | 1 | 开 |

  

#### lora join-cfg {#lora-join-cfg}

<strong>lora join-cfg &lt;band&gt;,&lt;duty&gt;</strong>

为频段配置加入占空比

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| band | 1 | &lt;1GHz |
| | 2 | 2.45GHz |
| duty | 0 | 0.1% |
| | 1..254 | |
| | 255 | 1% |

  

#### lora link-chk {#lora-link-chk}

<strong>lora link-chk &lt;band&gt;,&lt;int-minutes&gt;</strong>

设置特定频段的链路检查间隔和超时

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| band | 1 | &lt;1GHz |
| | 2 | 2.45GHz |
| int-minutes | 0 | 关 |
| | 5..500000 | |

    
  

#### lora adr-cfg {#lora-adr-cfg}

<strong>lora adr-cfg &lt;en-netw-adr&gt;,[&lt;fixed-data-rate&gt;]</strong>

启用网络 ADR 或配置固定数据速率

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| en-netw-adr | 0 | 关 |
| | 1 | 开 |
| fixed-data-rate | 0..6 | |

    
  

#### lora clk-sync {#lora-clk-sync}

<strong>lora clk-sync [&lt;int-minutes&gt;],[&lt;leap-sec&gt;],&lt;sync-now&gt;,[&lt;retry-s&gt;],[&lt;retry-cnt&gt;]</strong>

绝对时间同步

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| int-minutes | 0 | 关 |
| | 1..65535 | |
| leap-sec | -128..127 | |
| sync-now | 0 | no |
|  | 1 | yes |
| retry-s | 0..255 | |
| retry-cnt | 0..255 | |

    
  

#### lora cfg-class-b {#lora-cfg-class-b}

<strong>lora cfg-class-b [&lt;auto-en&gt;],[&lt;ping-slot-int-s&gt;]</strong>

配置 LoRaWAN Class B

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| auto-en | 0 | 关 |
| | 1 | 开 |
| ping-slot-int-s | 1 | |
| | 2 | |
| | 4 | |
| | 8 | |
| | 16 | |
| | 32 | |
| | 64 | |
| | 128 | |

    
  

#### lora class {#lora-class}

<strong>lora class &lt;class&gt;</strong>

切换 LoRaWAN class

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| class | 0 | A |
| | 1 | B |

  

#### lora join-eui {#lora-join-eui}

<strong>lora join-eui &lt;cred-ch-key&gt;,&lt;eui-0&gt;,&lt;eui-1&gt;,&lt;eui-2&gt;,&lt;eui-3&gt;,&lt;eui-4&gt;,&lt;eui-5&gt;,&lt;eui-6&gt;,&lt;eui-7&gt;</strong>

覆盖网络 JoinEUI

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| cred-ch-key | 87904163 | |
| eui-0 | 0..255 | |
| eui-1 | 0..255 | |
| eui-2 | 0..255 | |
| eui-3 | 0..255 | |
| eui-4 | 0..255 | |
| eui-5 | 0..255 | |
| eui-6 | 0..255 | |
| eui-7 | 0..255 | |

    
  

#### lora net-key {#lora-net-key}

<strong>lora net-key &lt;cred-ch-key&gt;,&lt;key-0&gt;,&lt;key-1&gt;,&lt;key-2&gt;,&lt;key-3&gt;,&lt;key-4&gt;,&lt;key-5&gt;,&lt;key-6&gt;,&lt;key-7&gt;,&lt;key-8&gt;,&lt;key-9&gt;,&lt;key-10&gt;, &lt;key-11&gt;,&lt;key-12&gt;,&lt;key-13&gt;,&lt;key-14&gt;,&lt;key-15&gt;</strong>

覆盖网络 AppKey

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| cred-ch-key | 87904163 | |
| key-0 | 0..255 | |
| key-1 | 0..255 | |
| key-2 | 0..255 | |
| key-3 | 0..255 | |
| key-4 | 0..255 | |
| key-5 | 0..255 | |
| key-6 | 0..255 | |
| key-7 | 0..255 | |
| key-8 | 0..255 | |
| key-9 | 0..255 | |
| key-10 | 0..255 | |
| key-11 | 0..255 | |
| key-12 | 0..255 | |
| key-13 | 0..255 | |
| key-14 | 0..255 | |
| key-15 | 0..255 | |

    
  

#### lora cred {#lora-cred}

<strong>lora cred [&lt;confirm-timeout-s&gt;],[&lt;action&gt;]</strong>

用户网络凭据管理

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| confirm-timeout-s | 60..65535 | 如果未入网则回退 |
| action | 0 | 清除待处理 |
| | 1 | 立即尝试 |
| | 87904163 | 强制确认 |

  

#### frame send {#frame-send}

<strong>frame send &lt;frame-id&gt;,…</strong>

调度上行帧

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| frame-id | <a href="#frame-type">frame-type</a> |  |

    
  

#### frame set-cfg {#frame-set-cfg}

<strong>frame set-cfg &lt;profile-mask&gt;,[&lt;ul-period-s&gt;],[&lt;confirmed&gt;],[&lt;on-join&gt;],&lt;frame-id&gt;,…</strong>

设置上行链路帧配置

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-mask | 1..63 | 位域 |
| ul-period-s | 0 | 关 |
| | 1..65535 | |
| confirmed | 0 | no |
|  | 1 | yes |
| on-join | 0 | no |
|  | 1 | yes |
| frame-id | <a href="#frame-type">frame-type</a> |  |

    
  

#### frame clear-cfg {#frame-clear-cfg}

<strong>frame clear-cfg &lt;profile-mask&gt;</strong>

清除指定配置文件的所有帧配置（等同于 ‘set-cfg profile-mask,0,0,0,…’）

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-mask | 1..63 | 位域 |

  

#### mag cfg {#mag-cfg}

<strong>mag cfg [&lt;pin-timeout&gt;],[&lt;pin-protect&gt;],[&lt;blink-mode&gt;]</strong>

设置配置

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| pin-timeout | 0..65535 | |
| pin-protect | 0 | 关 |
| | 1 | 开 |
| blink-mode | 0 | 半占空比 |
| | 1 | 脉冲 |
| | 2 | 关 |

  

#### mag svc {#mag-svc}

<strong>mag svc &lt;new-state&gt;,&lt;key&gt;</strong>

启用或禁用 magnet 命令接口

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| new-state | 0 | 关 |
| | 1 | 开 |
| key | 649864801 | |

    
  

#### data sample {#data-sample}

| <strong>data sample</strong> |
| :-- |
| 强制传感器轮询 |

  

#### data next-epoch {#data-next-epoch}

<strong>data next-epoch &lt;type&gt;</strong>

手动开始下一个直方图周期

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| type | | |

    
    
  

#### data poll-cfg {#data-poll-cfg}

<strong>data poll-cfg &lt;profile-mask&gt;,[&lt;th-poll-int&gt;],[&lt;sync-period&gt;],[&lt;on-mag-switch&gt;],[&lt;on-activity-change&gt;],[&lt;on-impact&gt;], [&lt;on-free-fall&gt;],[&lt;on-ul-stale&gt;],[&lt;bat-poll-int&gt;]</strong>

设置数据轮询配置

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-mask | 1..63 | 位域 |
| th-poll-int | 1..4294967295 | 温度和湿度 |
| sync-period | 0 | no |
|  | 1 | yes |
| on-mag-switch | 0 | no |
|  | 1 | yes |
| on-activity-change | 0 | no |
|  | 1 | yes |
| on-impact | 0 | no |
|  | 1 | yes |
| on-free-fall | 0 | no |
|  | 1 | yes |
| on-ul-stale | 0 | no |
|  | 1 | yes |
| bat-poll-int | 1..4294967295 | 电池电压 |

  

#### data temp-histo-cfg {#data-temp-histo-cfg}

<strong>data temp-histo-cfg &lt;profile-mask&gt;,[&lt;epoch-interval-s&gt;],[&lt;epoch-interval-cnt&gt;],[&lt;epoch-max-bin-cnt&gt;], [&lt;frame-on-new-epoch&gt;],[&lt;lim-divider&gt;],[&lt;bin-limit-0&gt;],[&lt;bin-limit-1&gt;],[&lt;bin-limit-2&gt;],[&lt;bin-limit-3&gt;],[&lt;bin-limit-4&gt;], [&lt;bin-limit-5&gt;],[&lt;bin-limit-6&gt;],[&lt;bin-limit-7&gt;],[&lt;bin-limit-8&gt;]</strong>

设置温度直方图配置

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-mask | 1..63 | 位域 |
| epoch-interval-s | 0 | 关 |
| | 1..4294967295 | |
| epoch-interval-cnt | 0 | 关 |
| | 1..4294967295 | |
| epoch-max-bin-cnt | 0 | 关 |
| | 1..4294967295 | |
| frame-on-new-epoch | 0 | no |
|  | 1 | yes |
| lim-divider | 1..4294967295 | |
| bin-limit-0 | -128..127 | °C |
| | %f | |
| bin-limit-1 | -128..127 | °C |
| | %f | |
| bin-limit-2 | -128..127 | °C |
| | %f | |
| bin-limit-3 | -128..127 | °C |
| | %f | |
| bin-limit-4 | -128..127 | °C |
| | %f | |
| bin-limit-5 | -128..127 | °C |
| | %f | |
| bin-limit-6 | -128..127 | °C |
| | %f | |
| bin-limit-7 | -128..127 | °C |
| | %f | |
| bin-limit-8 | -128..127 | °C |
| | %f | |

    
  

#### data humid-histo-cfg {#data-humid-histo-cfg}

<strong>data humid-histo-cfg &lt;profile-mask&gt;,[&lt;epoch-interval-s&gt;],[&lt;epoch-interval-cnt&gt;],[&lt;epoch-max-bin-cnt&gt;], [&lt;frame-on-new-epoch&gt;],[&lt;lim-divider&gt;],[&lt;bin-limit-0&gt;],[&lt;bin-limit-1&gt;],[&lt;bin-limit-2&gt;],[&lt;bin-limit-3&gt;],[&lt;bin-limit-4&gt;], [&lt;bin-limit-5&gt;],[&lt;bin-limit-6&gt;],[&lt;bin-limit-7&gt;],[&lt;bin-limit-8&gt;]</strong>

设置湿度直方图配置

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-mask | 1..63 | 位域 |
| epoch-interval-s | 0 | 关 |
| | 1..4294967295 | |
| epoch-interval-cnt | 0 | 关 |
| | 1..4294967295 | |
| epoch-max-bin-cnt | 0 | 关 |
| | 1..4294967295 | |
| frame-on-new-epoch | 0 | no |
|  | 1 | yes |
| lim-divider | 1..4294967295 | |
| bin-limit-0 | 0..99 | RH% |
| | %f | |
| bin-limit-1 | 0..99 | RH% |
| | %f | |
| bin-limit-2 | 0..99 | RH% |
| | %f | |
| bin-limit-3 | 0..99 | RH% |
| | %f | |
| bin-limit-4 | 0..99 | RH% |
| | %f | |
| bin-limit-5 | 0..99 | RH% |
| | %f | |
| bin-limit-6 | 0..99 | RH% |
| | %f | |
| bin-limit-7 | 0..99 | RH% |
| | %f | |
| bin-limit-8 | 0..99 | RH% |
| | %f | |

    
  

#### data ema-cfg {#data-ema-cfg}

<strong>data ema-cfg &lt;profile-mask&gt;,[&lt;temp-cnt&gt;],[&lt;humid-cnt&gt;],[&lt;bat-cnt&gt;],[&lt;orient-cnt&gt;],[&lt;send-ema-temp&gt;],[&lt;send-ema-humid&gt;], [&lt;send-ema-bat&gt;],[&lt;send-ema-orient&gt;]</strong>

设置指数移动平均 (EMA) 配置

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-mask | 1..63 | 位域 |
| temp-cnt | 1..32766 | a = 2 / (temp-cnt + 1) |
| humid-cnt | 1..32766 | a = 2 / (humid-cnt + 1) |
| bat-cnt | 1..32766 | a = 2 / (bat-cnt + 1) |
| orient-cnt | 1..32766 | a = 2 / (orient-cnt + 1) |
| send-ema-temp | 0 | no |
|  | 1 | yes |
| send-ema-humid | 0 | no |
|  | 1 | yes |
| send-ema-bat | 0 | no |
|  | 1 | yes |
| send-ema-orient | 0 | no |
|  | 1 | yes |

  

#### data activity-cfg {#data-activity-cfg}

<strong>data activity-cfg &lt;profile-mask&gt;,[&lt;mode&gt;],[&lt;level1-th&gt;],[&lt;level2-th&gt;],[&lt;en-led&gt;]</strong>

设置活动监视器配置

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-mask | 1..63 | 位域 |
| mode | 0 | 关 |
| | 1 | single |
| | 2 | dual |
| level1-th | 1..63 | |
| level2-th | 1..63 | |
| en-led | 0 | 关 |
| | 1 | 开 |

  

#### data acc-cfg {#data-acc-cfg}

<strong>data acc-cfg &lt;profile-mask&gt;,[&lt;full-scale&gt;],[&lt;en-impact-x&gt;],[&lt;en-impact-y&gt;],[&lt;en-impact-z&gt;],[&lt;impact-th&gt;],[&lt;impact-dur&gt;], [&lt;en-ff&gt;],[&lt;ff-th&gt;],[&lt;ff-dur&gt;],[&lt;data-rate&gt;],[&lt;filter&gt;],[&lt;lp-mode&gt;],[&lt;low-noise&gt;]</strong>

设置加速度计配置

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-mask | 1..63 | 位域 |
| full-scale | 0 | 2G |
| | 1 | 4G |
| | 2 | 8G |
| | 3 | 16G |
| en-impact-x | 0 | 关 |
| | 1 | 开 |
| en-impact-y | 0 | 关 |
| | 1 | 开 |
| en-impact-z | 0 | 关 |
| | 1 | 开 |
| impact-th | 1..63 | impact-th * full-scale / 64 |
| impact-dur | 0..3 | |
| en-ff | 0 | 关 |
| | 1 | 开 |
| ff-th | 0..7 | |
| ff-dur | 0..63 | |
| data-rate | 2 | Hz |
| | 13 | |
| | 25 | |
| | 500 | |
| | 100 | |
| | 200 | |
| filter | 2 | cutoff = data-rate/filter |
| | 4 | |
| | 10 | |
| | 20 | |
| lp-mode | 0..3 | |
| low-noise | 0 | no |
|  | 1 | yes |

  

#### data orient-cfg {#data-orient-cfg}

<strong>data orient-cfg &lt;profile-mask&gt;,[&lt;enable&gt;],[&lt;max-1G-offset&gt;],[&lt;poll-interval-s&gt;],[&lt;ref-1-x&gt;],[&lt;ref-1-y&gt;],[&lt;ref-1-z&gt;], [&lt;ref-2-x&gt;],[&lt;ref-2-y&gt;],[&lt;ref-2-z&gt;],[&lt;ref-3-x&gt;],[&lt;ref-3-y&gt;],[&lt;ref-3-z&gt;]</strong>

设置方向感知配置

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-mask | 1..63 | 位域 |
| enable | 0 | 关 |
| | 1 | 开 |
| max-1G-offset | 1..20 | |
| poll-interval-s | 1..4294967295 | |
| ref-1-x | -32768..32767 | |
| ref-1-y | -32768..32767 | |
| ref-1-z | -32768..32767 | |
| ref-2-x | -32768..32767 | |
| ref-2-y | -32768..32767 | |
| ref-2-z | -32768..32767 | |
| ref-3-x | -32768..32767 | |
| ref-3-y | -32768..32767 | |
| ref-3-z | -32768..32767 | |

    
  

#### data event-cfg {#data-event-cfg}

<strong>data event-cfg &lt;profile-mask&gt;,[&lt;max-count&gt;],[&lt;send-th&gt;],[&lt;discard&gt;],[&lt;send-all&gt;]</strong>

设置事件存储配置

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-mask | 1..63 | 位域 |
| max-count | 0 | disabled |
|  | 1..100 |  |
| send-th | 0..65535 | if count &gt;= send-th: send(device-events) |
| discard | 0 | 最旧 | 如果没有可用空间 |
|  | 1 | newest |
| send-all | 0 | off |
| | 1 | 开 |

  

#### data erase-events {#data-erase-events}

<strong>data erase-events [&lt;num-oldest&gt;]</strong>

擦除最旧的 &lt;num-oldest&gt; 个事件（如已指定），否则擦除全部

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| num-oldest | 0..65535 | |

    
  

#### data del-rule {#data-del-rule}

<strong>data del-rule [&lt;rule-num&gt;]</strong>

如果提供了 &lt;rule-num&gt;，则删除相应数量的规则，否则删除全部规则

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| rule-num | 0..31 | |

    
  

#### data set-rule {#data-set-rule}

<strong>data set-rule [&lt;rule-num&gt;],&lt;test-expr&gt;,[&lt;input-expr&gt;],[&lt;switch-profile&gt;],[&lt;make-event-0&gt;],[&lt;make-event-1&gt;], [&lt;make-event-2&gt;],[&lt;make-event-3&gt;],[&lt;send-frame-0&gt;],[&lt;send-frame-1&gt;],[&lt;send-frame-2&gt;],[&lt;send-frame-3&gt;],[&lt;clr-timer-mask&gt;]</strong>

设置数据规则 &lt;rule-num&gt;

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| rule-num | 0..31 | |
| test-expr | | |
| input-expr | | |
| switch-profile | 0..5 | |
| make-event-0 | <a href="#variable-type">variable-type</a> |  |
| make-event-1 | <a href="#variable-type">variable-type</a> |  |
| make-event-2 | <a href="#variable-type">variable-type</a> |  |
| make-event-3 | <a href="#variable-type">variable-type</a> |  |
| send-frame-0 | <a href="#frame-type">frame-type</a> |  |
| send-frame-1 | <a href="#frame-type">frame-type</a> |  |
| send-frame-2 | <a href="#frame-type">frame-type</a> |  |
| send-frame-3 | <a href="#frame-type">frame-type</a> |  |
| clr-timer-mask | 0..15 | |

    
  

#### data timer {#data-timer}

<strong>data timer [&lt;timer_1&gt;],[&lt;timer_2&gt;],[&lt;timer_3&gt;],[&lt;timer_4&gt;]</strong>

设置用户计时器值

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| timer_1 | 0..4294967295 | <a href="#timer-1">timer_1</a> |
| timer_2 | 0..4294967295 | <a href="#timer-2">timer_2</a> |
| timer_3 | 0..4294967295 | <a href="#timer-3">timer_3</a> |
| timer_4 | 0..4294967295 | <a href="#timer-4">timer_4</a> |

  

#### data activity-cal {#data-activity-cal}

<strong>data activity-cal &lt;profile-mask&gt;,&lt;cal-level&gt;,&lt;cal-led&gt;</strong>

运行活动监视器校准并将结果应用到 profiles

| 参数 | 范围 | 描述 |
| :-- | :-- | :-- |
| profile-mask | 1..63 | 位域 |
| cal-level | 1 | level-one |
| | 2 | level-two |
| cal-led | 0 | no |
|  | 1 | yes |

  

### 数据帧 {#data-frames}

<span id="frame-type"></span>

| ID | 大小 [B] | 名称 | 数据字段 |
| --- | --- | --- | --- |
| 1 | 5 | <span id="current-state"></span>current-state | [temperature](#temperature), [humidity](#humidity), [mag_sw_cnt_u8](#mag-sw-cnt-u8), [major_axis_orientation](#major-axis-orientation), [activity_state](#activity-state), [free_fall_evnt](#free-fall-evnt), [impact_evnt](#impact-evnt), [pending_evnt](#pending-evnt) |
| 2 | variable | <span id="device-events"></span>device-events | [event-list](#event-list) |
| 3 | 11 | <span id="temp-histogram"></span>temp-histogram | [temp_histo_epoch](#temp-histo-epoch), [temp_histo_bin[10]](#temp-histo-bin-10) |
| 4 | 11 | <span id="humid-histogram"></span>humid-histogram | [humid_histo_epoch](#humid-histo-epoch), [humid_histo_bin[10]](#humid-histo-bin-10) |
| 5 | 3 | <span id="device-orientation"></span>device-orientation | [orientation_x](#orientation-x), [orientation_y](#orientation-y), [orientation_z](#orientation-z) |
| 6 | 9 | <span id="full-activity"></span>full-activity | [activity_state](#activity-state), [activity_s](#activity-s), [high_activity_s](#high-activity-s) |
| 7 | 8 | <span id="motion-events"></span>motion-events | [impact_cnt](#impact-cnt), [free_fall_cnt](#free-fall-cnt) |
| 8 | 8 | <span id="mag-switch"></span>mag-switch | [mag_sw_cnt](#mag-sw-cnt), [mag_switch_ts](#mag-switch-ts) |
| 9 | 8 | <span id="impact-count"></span>impact-count | [impact_cnt_u16](#impact-cnt-u16), [impact_cnt_x_u16](#impact-cnt-x-u16), [impact_cnt_y_u16](#impact-cnt-y-u16), [impact_cnt_z_u16](#impact-cnt-z-u16) |
| 10 | 2 | <span id="last-temp"></span>last-temp | [temperature](#temperature) |
| 11 | 2 | <span id="ema-temp"></span>ema-temp | [temperature_ema](#temperature-ema) |
| 12 | 1 | <span id="last-humid"></span>last-humid | [humidity](#humidity) |
| 13 | 1 | <span id="ema-humid"></span>ema-humid | [humidity_ema](#humidity-ema) |
| 14 | 5 | <span id="activity"></span>activity | [activity_state](#activity-state), [total_activity_s](#total-activity-s) |
| 20 | 8 | <span id="dev-time"></span>dev-time | [uptime_s](#uptime-s), [unix_time](#unix-time) |
| 21 | 2 | <span id="dev-health"></span>dev-health | [battery_mv](#battery-mv) |
| 22 | 11 | <span id="version"></span>version | [version_pid](#version-pid), [version_maj](#version-maj), [version_min](#version-min), [version_rev](#version-rev), [version_hash[6]](#version-hash-6) |
| 23 | 11 | <span id="serial-number"></span>serial-number | [serial_number[11]](#serial-number-11) |
| 24 | 10 | <span id="cfg-state"></span>cfg-state | [cfg_app_crc](#cfg-app-crc), [cfg_net_crc](#cfg-net-crc), [cfg_frames_crc](#cfg-frames-crc), [cfg_data_crc](#cfg-data-crc), [cfg_rules_crc](#cfg-rules-crc) |
| 25 | variable | <span id="full-cfg"></span>full-cfg | [content-offset](#content-offset), [content-final](#content-final), [content-len](#content-len), [content-binary-blob](#content-binary-blob) |
| 26 | variable | <span id="app-cfg"></span>app-cfg | [content-offset](#content-offset), [content-final](#content-final), [content-len](#content-len), [content-binary-blob](#content-binary-blob) |
| 27 | variable | <span id="net-cfg"></span>net-cfg | [content-offset](#content-offset), [content-final](#content-final), [content-len](#content-len), [content-binary-blob](#content-binary-blob) |
| 28 | variable | <span id="frame-cfg"></span>frame-cfg | [content-offset](#content-offset), [content-final](#content-final), [content-len](#content-len), [content-binary-blob](#content-binary-blob) |
| 29 | variable | <span id="data-cfg"></span>data-cfg | [content-offset](#content-offset), [content-final](#content-final), [content-len](#content-len), [content-binary-blob](#content-binary-blob) |
| 30 | variable | <span id="rules-cfg"></span>rules-cfg | [content-offset](#content-offset), [content-final](#content-final), [content-len](#content-len), [content-binary-blob](#content-binary-blob) |

### 用户变量 {#user-variables}

<span id="variable-type"></span>

| ID | 大小 [B] | 编码 | 名称 | 描述 |
| --- | --- | --- | --- | --- |
| 0 | 1 | u8 | <span id="profile"></span>profile | 当前数据配置 (0..5) |
| 1 | 4 | u32 | <span id="profile-etm"></span>profile_etm | 自上次配置切换以来经过的时间 [s] |
| 2 | 4 | u32 | <span id="daytime-tm"></span>daytime_tm | 自午夜 00:00 GMT 起的秒数，未知时为 0 |
| 3 | 4 | u32 | <span id="unix-time"></span>unix_time | 当前 UNIX 时间，未知时为设备运行时间 |
| 4 | 4 | u32 | <span id="net-frame-etm"></span>net_frame_etm | 自上次网络上行以来经过的时间 |
| 5 | 1 | bool | <span id="net-joined-flag"></span>net_joined_flag | 网络加入状态 |
| 6 | 1 | u8 | <span id="net-class"></span>net_class | 当前选定的 LoRaWAN [class](#lora-class) |
| 7 | 1 | u8 | <span id="net-region"></span>net_region | 当前使用的 LoRaWAN [区域代码](#lora-set-region) |
| 8 | 2 | f8.8 | <span id="temperature"></span>temperature | 上次测量的温度 |
| 9 | 2 | f8.8 | <span id="temperature-ema"></span>temperature_ema | 测量温度的 EMA |
| 10 | 1 | u8 | <span id="humidity"></span>humidity | 上次测量的湿度 |
| 11 | 1 | u8 | <span id="humidity-ema"></span>humidity_ema | 测量湿度的 EMA |
| 12 | 4 | u32 | <span id="mag-sw-cnt"></span>mag_sw_cnt | 磁性开关状态变化计数器 |
| 13 | 4 | u32 | <span id="mag-sw-etm"></span>mag_sw_etm | 自上次磁性开关变化以来经过的时间 [s] |
| 14 | 1 | bool | <span id="mag-sw-flag"></span>mag_sw_flag | 磁性开关的当前状态 |
| 15 | 1 | activity | <span id="activity-state"></span>activity_state | 设备当前活动状态 |
| 16 | 4 | u32 | <span id="activity-s"></span>activity_s | 低活动（级别 1）状态计数器 [s] |
| 17 | 4 | u32 | <span id="high-activity-s"></span>high_activity_s | 高活动（级别 2）状态计数器 [s] |
| 18 | 1 | orient | <span id="major-axis-orientation"></span>major_axis_orientation | 设备的粗略方向 |
| 19 | 4 | u32 | <span id="impact-cnt-x"></span>impact_cnt_x | X 轴冲击事件计数器 |
| 20 | 4 | u32 | <span id="impact-cnt-y"></span>impact_cnt_y | Y 轴冲击事件计数器 |
| 21 | 4 | u32 | <span id="impact-cnt-z"></span>impact_cnt_z | Z 轴冲击事件计数器 |
| 22 | 4 | u32 | <span id="impact-cnt"></span>impact_cnt | 冲击事件计数器 |
| 23 | 1 | bool | <span id="impact-evnt"></span>impact_evnt | 冲击事件标志，由 [current-state](#current-state)、[motion-events](#motion-events)、[impact-count](#impact-count) 帧清除 |
| 24 | 4 | u32 | <span id="impact-etm"></span>impact_etm | 自上次冲击事件以来经过的时间 [s] |
| 25 | 4 | u32 | <span id="free-fall-cnt"></span>free_fall_cnt | 自由落体事件计数器 |
| 26 | 1 | bool | <span id="free-fall-evnt"></span>free_fall_evnt | 自由落体事件标志，由 [current-state](#current-state)、[motion-events](#motion-events) 帧清除 |
| 27 | 4 | u32 | <span id="free-fall-etm"></span>free_fall_etm | 自上次 free-fall 事件以来经过的时间 [s] |
| 28 | 1 | u8 | <span id="angle-1"></span>angle_1 | 当前朝向与用户 ref-1 向量之间的角度，参见 [数据 orient-cfg](#data-orient-cfg) |
| 29 | 1 | u8 | <span id="angle-2"></span>angle_2 | 当前朝向与用户 ref-2 向量之间的角度，参见 [数据 orient-cfg](#data-orient-cfg) |
| 30 | 1 | u8 | <span id="angle-3"></span>angle_3 | 当前朝向与用户 ref-3 向量之间的角度，参见 [数据 orient-cfg](#data-orient-cfg) |
| 31 | 1 | u8 | <span id="angle-ema"></span>angle_ema | 当前朝向与设备朝向的 EMA 之间的角度 |
| 32 | 2 | u16 | <span id="battery-mv"></span>battery_mv | 最近测量的电池电压 [mV] |
| 33 | 2 | u16 | <span id="battery-mv-ema"></span>battery_mv_ema | 电池电压的 EMA [mV] |
| 34 | 2 | u16 | <span id="meta-rule-id"></span>meta_rule_id | 用于发送带有规则编号的生成事件的 meta 变量 |
| 35 | 4 | u32 | <span id="timer-1"></span>timer_1 | 可复位、持续向上计数的定时器 [s] |
| 36 | 4 | u32 | <span id="timer-2"></span>timer_2 | 可复位、持续向上计数的定时器 [s] |
| 37 | 4 | u32 | <span id="timer-3"></span>timer_3 | 可复位、持续向上计数的定时器 [s] |
| 38 | 4 | u32 | <span id="timer-4"></span>timer_4 | 可复位、持续向上计数的定时器 [s] |
| 39 | 4 | u32 | <span id="activity-state-etm"></span>activity_state_etm | 自 [activity_state](#activity-state) 状态变化以来的时间 [s] |

### 帧数据字段 {#frame-data-fields}

| 大小 [B] | 编码 | 名称 | 描述 |
| --- | --- | --- | --- |
| 1 | u8 | <span id="mag-sw-cnt-u8"></span>mag_sw_cnt_u8 | 内部磁开关计数器的 LSB [mag_sw_cnt](#mag-sw-cnt) |
| 1/8 | bool | <span id="pending-evnt"></span>pending_evnt | 指示设备已存储事件 |
| 0 |  | <span id="event-list"></span>event-list | 可变长度列表，包含：事件时间戳、代码和可选值 |
| 1 | u8 | <span id="temp-histo-epoch"></span>temp_histo_epoch | 温度直方图纪元编号 |
| 10 | u8[10] | <span id="temp-histo-bin-10"></span>temp_histo_bin[10] | 温度直方图区间计数器值 |
| 1 | u8 | <span id="humid-histo-epoch"></span>humid_histo_epoch | 湿度直方图纪元编号 |
| 10 | u8[10] | <span id="humid-histo-bin-10"></span>humid_histo_bin[10] | 湿度直方图区间计数器值 |
| 1 | i8 | <span id="orientation-x"></span>orientation_x | 设备方向法向量 X 轴 |
| 1 | i8 | <span id="orientation-y"></span>orientation_y | 设备方向法向量 Y 轴 |
| 1 | i8 | <span id="orientation-z"></span>orientation_z | 设备方向法向量 Z 轴 |
| 4 | u32 | <span id="mag-switch-ts"></span>mag_switch_ts | 磁开关状态上次变化的时间戳 |
| 2 | u16 | <span id="impact-cnt-u16"></span>impact_cnt_u16 | 冲击事件计数器 |
| 2 | u16 | <span id="impact-cnt-x-u16"></span>impact_cnt_x_u16 | X 轴冲击事件计数器 |
| 2 | u16 | <span id="impact-cnt-y-u16"></span>impact_cnt_y_u16 | Y 轴冲击事件计数器 |
| 2 | u16 | <span id="impact-cnt-z-u16"></span>impact_cnt_z_u16 | Z 轴冲击事件计数器 |
| 4 | u32 | <span id="total-activity-s"></span>total_activity_s | 总活动状态时间（level 1 + level 2） |
| 4 | u32 | <span id="uptime-s"></span>uptime_s | 设备 FW 运行时间 |
| 2 | u16 | <span id="version-pid"></span>version_pid | TG-LR82:0x0000, TG-LR92:0x0001 |
| 1 | u8 | <span id="version-maj"></span>version_maj | FW 版本主版本号 |
| 1 | u8 | <span id="version-min"></span>version_min | FW 版本次版本号 |
| 1 | u8 | <span id="version-rev"></span>version_rev | FW 版本补丁号 |
| 6 | u8[6] | <span id="version-hash-6"></span>version_hash[6] | FW 版本哈希 |
| 11 | u8[11] | <span id="serial-number-11"></span>serial_number[11] | 设备序列号的最后 11 个字符 |
| 2 | u16 | <span id="cfg-app-crc"></span>cfg_app_crc | app 和 mag 配置组的 16 位校验和 |
| 2 | u16 | <span id="cfg-net-crc"></span>cfg_net_crc | net 配置组的 16 位校验和 |
| 2 | u16 | <span id="cfg-frames-crc"></span>cfg_frames_crc | frame 配置组的 16 位校验和 |
| 2 | u16 | <span id="cfg-data-crc"></span>cfg_data_crc | 数据配置组 16 位校验和 |
| 2 | u16 | <span id="cfg-rules-crc"></span>cfg_rules_crc | 数据规则配置 16 位校验和 |
| 1/8 | bool | <span id="content-final"></span>content-final | 指示内容最后一块的标志 |
| 15/8 | u15 | <span id="content-offset"></span>content-offset | 内容数据的字节偏移 |
| 1 | u8 | <span id="content-len"></span>content-len | 内容长度 |
| 0 |  | <span id="content-binary-blob"></span>content-binary-blob | 内容块的二进制数据 |

### 已知问题 {#known-issues}

| ID | FW | 描述 |
| --- | --- | --- |
| [LORA-275](#lora-275) | 2.0.0 | 在辅助频段禁用时更改凭据不会超时。 |
| [LORA-276](#lora-276) | 2.0.0 | 凭据更改命令超时时间不正确。 |
| [LORA-279](#lora-279) | 2.0.0 | 启用方向检测时进行活动校准会导致故障。 |
| [LORA-281](#lora-281) | 2.0.0 - 2.0.1 | 新的 ADR 配置在设备重新加入或重启之前不会生效。 |
| [LORA-282](#lora-282) | 2.0.0 - 2.0.1 | 只有 DR0 可作为配置的固定数据速率使用。 |

#### LORA-275 {#lora-275}

**描述：** 如果在禁用辅助频段的情况下发起凭证更改，设备将不会在入网时超时。设备将一直尝试入网，直到成功或重启。

**解决方法：** 如果新凭据无效，请使用[磁铁开关命令](#mag-sw-cmd)物理重启设备。

#### LORA-276 {#lora-276}

**描述：** 当执行 [lora cred](#lora-cred) 后，设备在下次加入尝试时将基于总运行时间而非命令执行时间来超时加入过程。如果运行时间长于 *confirm-timeout-s* 参数，设备将恰好在一次失败的加入尝试后超时。

**解决方法：** 在尝试更改凭据之前，先执行设备重置命令 [app reset](#app-reset)。或者手动多次重试更改凭据。

#### LORA-279 {#lora-279}

**描述：** 如果在启用朝向检测时执行活动校准，设备可能发生故障并重启。

**解决方法：** 在执行活动校准之前，使用 [data orient-cfg](#data-orient-cfg) 禁用方向检测，之后再重新启用。

#### LORA-281 {#lora-281}

**描述：** 当设备已加入时，使用 [lora adr-cfg](#lora-adr-cfg) 更改 ADR 设置可能不会生效，直到设备重新加入或重启。上行链路可能继续使用之前的 ADR 模式和数据速率。

**解决方法：** 更改 ADR 设置后，使用 [app reset](#app-reset) 重置设备。

#### LORA-282 {#lora-282}

**描述：** 当 network ADR 被禁用时，只有 DR0 可作为已配置的固定数据速率工作。配置任何其他固定数据速率可能不会生效。

**变通方法：** 使用 [lora adr-cfg](#lora-adr-cfg) 启用网络 ADR。

## 相关文档 {#related-documents}

| 序号 | 名称 |
| --- | --- |
| <span id="id40"></span>1 | TS001-1.0.4 LoRaWAN® L2 1.0.4 规范 |
| <span id="id41"></span>2 | 64 位全局标识符 (EUI-64) 指南 |

export const Anchor = ({id}) => {
  useBrokenLinks().collectAnchor(id);
  return ;
};
