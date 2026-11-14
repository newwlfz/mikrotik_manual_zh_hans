---
sidebar_key: "internet-of-things/lora/user-guides/tg-lr-setup-guide"
sidebar_position: 4
title: "TG-LR 设置指南"
sidebar_label: "TG-LR 设置指南"
description: "本页是 MikroTik TG-LR82 和 TG-LR92 LoRaWAN 传感器标签的设置指南，涵盖激活、入网、遥测与传感器配置、磁开关命令、下行链路命令编码、数据帧以及已知问题。"
tags:
  - 'lora'
  - 'lorawan'
  - 'iot'
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/lora/user-guides/tg-lr-setup-guide
captured_at: '2026-11-04T11:18:59+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 快速入门指南 {#quickstart-guide}

- 在 LoRaWAN 网络服务器上注册设备。如果设备型号不受支持，请使用 [tg-lrx2-2.0-ul-dec.js](pathname:///assets/tg-lrx2-2.0-ul-dec.js) 载荷解码脚本。

- 可选：部署 Grafana + Influx（[telemetry_hub.zip](pathname:///assets/telemetry_hub.zip)）Docker 服务，用于评估设备能力。

- 将磁铁靠近簧片开关以激活设备，并等待 LED 闪烁 2 次（约 1.5 秒）。

## 功能 {#functionality}

新设备处于 SHUTDOWN 模式。要激活，请使用磁开关命令。

**表 1 型号**

| 型号 | 描述 | 传感器 |
| --- | --- | --- |
| TG-LR82 | LoRaWAN 1.0.4 Class A、B，863.0 - 869.0 MHz 频段。 | TMP116N、HDC2010、LIS2DW12 |
| TG-LR92 | LoRaWAN 1.0.4 Class A、B，900.0 - 928.0 MHz 频段。 | TMP116N、HDC2010、LIS2DW12 |

**表 2 频段**

| 数字代码 | 名称 | 描述 |
| --- | --- | --- |
| 1 | BAND_1GHz | Sub-GHz 工作频段。频率范围取决于设备型号。 |
| 2 | BAND_2GHz | 2.4GHz ISM 频段。 |

**表 3 运行模式**

| 数字代码 | 模式 | 描述 |
| --- | --- | --- |
| 0 | SHUTDOWN | 设备处于低功耗模式，所有功能已禁用。 |
| 1 | RUN | 设备加入网络，并根据当前配置文件和配置发送上行链路。 |

**表 4 支持的区域**

| X-Y 代码 | 下行 | 通用名称 | TG-LR82 | TG-LR92 |
| --- | --- | --- | --- | --- |
| 1-1 | 1 | EU868 | yes |  |
| 2-1 | 2 | AS923_GRP1 |  | yes |
| 3-1 | 3 | US915 |  | yes |
| 4-1 | 4 | AU915 |  | yes |
|  |  | WW2G4 | yes | yes |
| 6-1 | 7 | AS923_GRP2 |  | yes |
| 7-1 | 8 | AS923_GRP3 |  | yes |
| 8-1 | 9 | IN865 | yes |  |
| 9-1 | 10 | KR920 |  | yes |

### LoRaWAN {#lorawan}

设备支持 Class A 和 B，并且可在两个频段中工作：BAND_1GHz 和 BAND_2GHz。用户可以配置周期性链路检查、MAC 时间同步（DeviceTimeReq）和网络 ADR。

#### 入网过程 {#join-procedure}

一旦激活（RUN），设备将尝试加入网络。设备在主频段上发送 Join-Request；如果未收到 Join-Accept，它将等待退避间隔，并在启用辅助频段时在辅助频段上发送下一个 Join-Request，否则再次在主频段上发送。

入网尝试间隔取决于最后一个 Join-Request 的空中时间以及总入网时间。参见 1 第 7 节。如果最后一个入网请求使用了较慢的数据速率，则预计间隔会更长。

入网配置命令：`lora primary-band`、`lora second-band`、`lora join-cfg`。有关如何将文本命令转换为下行链路二进制编码，请参见命令编码。

#### 链路检查 {#link-check}

设备加入网络后，可以执行可选的周期性链路检查。可以使用 `lora link-chk` 为每个频段单独配置链路检查。如果链路检查失败，设备会离开网络并重新开始入网过程。

任何网络下行链路都会重启链路检查定时器，以防止不必要的 LinkCheckReq。

#### 时间同步 {#time-synchronization}

设备支持使用 DeviceTimeReq MAC 命令进行可选的时间同步。有关配置参数或请求立即同步，请参见命令 `lora clk-sync`。

#### Class B {#class-b}

设备支持 Class B 运行。可以使用 `lora class` 手动请求 Class B 运行，也可以使用 `lora cfg-class-b` 将设备配置为在入网时自动切换到 Class B。

#### ADR 配置 {#adr-configuration}

可以使用 `lora adr-cfg` 禁用网络 ADR 并设置固定数据速率。

#### 离开网络 {#leaving-network}

如果链路检查或确认上行链路失败，设备会离开网络并重新开始入网过程。

#### 凭证 {#credentials}

设备具有出厂配置的默认凭证，随每台设备提供：DevEUI、JoinEUI、AppKey。

DevEUI 和 JoinEUI 是 IEEE 64 位 EUI (2)，按 MSB 优先写入。空中字节顺序为 LSB 优先。参见 1 第 6.2.5 节。

AppKey 是 16 字节 AES128 加密密钥，按设备内存中存储的形式写入。AppKey 必须保密！

要更改 JoinEUI 和 AppKey，请使用命令：`lora join-eui`、`lora net-key` 和 `lora cred`。命令 `lora join-eui` 和 `lora net-key` 可按任意顺序发出，并可多次发出，以写入新的待处理入网凭证。

写入新的待处理凭证后，可以执行“lora cred 600,1”或“app reset 0”，以尝试使用新凭证入网。如果新凭证未通过 Join-Accept 确认，设备将回退到之前的凭证。已知问题请参见 LORA-275、LORA-276！

下面示例写入 JoinEUI 和 AppKey 并尝试入网：

```none
lora join-eui 87904163,0x00,0x16,0xC0,0x01,0xFF,0xFE,0x00,0x00
lora net-key 87904163,0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0A,0x0B,0x0C,0x0D,0x0E,0x0F
lora cred 600
app reset 0
// device reboots and attempts join using new credentials with 600s timeout
```

上一个示例中的 JoinEUI 可按原样 00 16 C0 01 FF FE 00 00 复制/粘贴，用于注册新设备。`lora join-eui` 参数采用 MSB 优先。

:::warning
执行 *lora cred &lt;confirm-timeout-s>,87904163* 将在不验证入网尝试的情况下强制确认凭证！你可能会失去对设备的访问权限！
:::

### 上行链路消息 {#uplink-messages}

每个 LoRaWAN 上行链路消息通过将待处理的 Data Frames ID 及其内容放入 FPort 和 FRMPayload 字段来形成。所有待处理帧按升序打包，并且 ID 使用差分编码。

有关帧编码详情，请参见 `tg-lrx2-2.0-ul-dec.js` 脚本。该脚本可直接用于应用服务器载荷解码器。

### 遥测 {#telemetry}

#### 设备配置文件 {#device-profiles}

设备有 6 个可配置配置文件。每个配置文件存储独立的传感器和上行链路发送配置。这使设备无需昂贵的下行链路配置消息即可快速更改运行特性。配置文件可以使用设备命令、磁铁，甚至基于评估的数据规则进行切换。例如，在每天发送几次上行链路的周期性保活模式与每隔几分钟发送更快速遥测之间切换。

MikroTik 可以支持你的特定用例；可提供具有自定义默认配置的新设备。

设备预配置了评估配置，以展示一些可能的用例：

**表 5 默认配置文件配置**

| 配置文件编号 | 名称 | 描述 |
| --- | --- | --- |
| 0 | 传感器遥测 | 每 5 分钟发送 current-state、device-orientation。每 60 分钟发送其余遥测。 |
| 1 | 活动监测 | 每 60 分钟发送 activity、full-activity、current-state，并在活动进入空闲状态转换时发送 activity_state 事件。 |
| 2 | 磁开关 | 每 60 分钟发送 mag-switch、current-state、device-events，并在磁铁移除至少 15 秒时发送 mag_sw_cnt 事件。最多保存 10 个事件。 |
| 3 | 朝向 | 每 60 分钟发送 current-state、device-events、device-orientation。在空闲约 30 秒后发生 30 度快速旋转时发送 device-orientation 帧。在特定朝向 V=(0,1,1) 时发送 angle_1 事件。最多保存 3 个事件。 |
| 4 | 资产监测 | 每 3 小时根据事件使用不同帧发送资产健康信息。 |
| 5 | 空 | |

有关确切的出厂默认配置命令，请参见 `default-cfg.txt`。

#### 配置传感器 {#configuring-sensors}

##### 采样间隔 {#sampling-intervals}

可以使用 `data poll-cfg` 命令为特定用例配置周期性温度、湿度和电池电压采样。设备可以以高于上行链路帧发送速率的速率采样数据。这提供了发送平均值或执行基于规则的决策的机会。由于采样间隔会影响设备功耗，因此可以利用这一点来延长使用寿命。

##### 平均 {#averaging}

设备还会跟踪采样值的平均值：temperature_ema、humidity_ema、battery_mv_ema、angle_ema。命令 `data ema-cfg` 配置指数移动平均（EMA）周期，并且如果启用了 *send-ema-**，还可选择在 current-state、dev-health、device-orientation 中发送 EMA 值。

`data ema-cfg` 中的计数参数 *temp-cnt*、*humid-cnt*、*bat-cnt*、*orient-cnt* 决定用于移动平均计算的系数 *a*。移动 EMA 根据前一个值 *ema* 和新值 *sample* 计算如下：

```none
ema(t) = sample(t) * a + ema(t-1) * (1 - a)
```

要获得 EMA 的近似时间常数 *t*，需要使用由 `data poll-cfg` 和 `data orient-cfg` 配置的采样间隔（*interval*）以及相应的计数参数（*N*）：

```none
t ~ (N + 1) * interval / 2
```

要获得 `data ema-cfg` 所需的计数参数值：

```none
N ~ 2 * t / interval - 1
```

示例：

温度采样间隔 *th-poll-int* 使用 `data poll-cfg` 配置为 30s。要配置时间常数 t ~ 60 分钟的 EMA：

```none
temp-cnt = 2 * 3600 / 30 - 1 = 239
```

假设使用配置文件 #0，并且我们不想更改其他参数，则需要发送命令：

```none
data ema-cfg 1,239
```

##### 直方图 {#histogram}

所有周期性样本都会添加到温度和湿度直方图中。直方图可与常规遥测一起使用，也可以单独用于监测温度和湿度分布。使用 `data temp-histo-cfg`、`data humid-histo-cfg` 命令配置箱和纪元间隔，和/或启用 temp-histogram、humid-histogram 帧。所有直方图帧都包含纪元编号，以检测直方图计数器重置。由于帧大小限制为每个箱 1B，如果内部箱计数器值高于 255，直方图将在上行链路中归一化（概率类型）。

示例配置：

```none
data temp-histo-cfg 1,86400,0,0,1,1,-10,0,10,15,17.5,20,22.5,25.0,30
data humid-histo-cfg 1,86400,0,0,1,1,10,20,30,40,50,60,70,80,90
```

##### 朝向 {#orientation}

![](/img/829309331472d215.webp)

图 1 设备加速度计轴。

可以使用命令 `data orient-cfg` 配置相对于地球的周期性设备 3D 朝向采样。此外，还可以配置 3 个用户朝向向量 ref-1、ref-2、ref-3，以检测特定的设备朝向。用户变量 angle_1、angle_2、angle_3 包含设备最后采样朝向与用户定义向量之间的当前角度。这些变量可用于数据规则中，以在特定朝向时触发。angle_ema 是最后采样的设备朝向与样本 EMA 值之间的角度。此外，还可以通过 major_axis_orientation 变量获得粗略朝向。

**表 6 major_axis_orientation 描述**

| 值 | 数字代码 | 描述 |
| --- | --- | --- |
| XH | 0 | X 向上 |
| HL | 1 | X 向下 |
| YH | 2 | Y 向上 |
| YL | 3 | Y 向下 |
| ZH | 4 | Z 向上 |
| ZL | 5 | Z 向下 |
| DISABLED | 7 | 传感器已禁用 |

粗略朝向的优点是它会包含在 current-state 帧中发送。

##### 活动监测 {#activity-monitor}

设备具有基于加速度计的活动监测服务。该服务将自动管理一个简单状态机，以确定移动/活动。activity_s、high_activity_s、total_activity_s 统计每个状态中累积的时间，activity_state、activity_state_etm 保存状态信息。

命令 `data activity-cfg` 可用于配置活动监测的模式和阈值。`data activity-cal` 可用于自动执行特定模式的校准。

*level1-th* 和 *level2-th* 的单位是 *1/64 * 2G*，与其他加速度计设置无关（如 *data acc-cfg* 中）。*level2-cnt* 在内部计算，用户不可配置。*level2-cnt* 始终在 7..15 范围内，计算如下：

```none
level2-cnt = 7 + round((1 - ((level2-th - level1-th - 1) / 61)) * 8)
```

**表 7 activity_state 描述**

| 数字代码 | 值 |
| --- | --- |
| 0 | IDLE |
| 1 | LOW |
| 2 | HIGH |
| 3 | DISABLED |

###### 单模式 {#single-mode}

`data activity-cfg` 中的模式设置为 `single`。

- 如果任一轴上的加速度计采样值高于 *level1-th*，设备会从 IDLE 状态转换到 LOW 状态。

- 如果所有采样值在至少 1.3s 内低于 *level1-th*，设备会从 LOW 状态转换到 IDLE 状态。

示例：将配置文件 #0 设置为单模式，阈值为 0.25G：

```none
data activity-cfg 1,1,8,63
```

###### 双模式 {#dual-mode}

`data activity-cfg` 中的模式设置为 `dual`。

在双模式下，LOW 状态有两个子状态：LOW1 和 LOW2，两者都表示 LOW。设备在这两个状态期间都会报告 LOW 状态，并且活动计数器值会像处于 LOW 状态一样递增。唯一的区别是这些状态之间的转换逻辑。

**表 8 activity_state 双模式状态转换**

| 当前 | 下一个 | 条件 |
| --- | --- | --- |
| IDLE | LOW2 | sample > *level1-th* |
| LOW2 | LOW1 | sample &lt; *level2-th* 至少 5s |
| LOW1 | LOW2 | sample > *level1-th* |
| LOW2 | HIGH | sample > *level2-th* 至少 *level2-cnt* 次 |
| LOW1 | IDLE | sample &lt; *level1-th* 至少 5s |
| HIGH | LOW1 | sample &lt; *level2-th* 至少 5s |

示例：将配置文件 #0 设置为双模式，阈值为 0.25G 和 0.5G：

```none
data activity-cfg 1,2,8,16
```

###### 校准 {#calibration}

除了手动配置 *level1-th* 和 *level2-th* 外，还有活动校准功能。执行命令 `data activity-cal` 将执行 *cal-level* 的自动校准。*level-one* 将校准 *level1-th*，*level-two* 将校准 *level2-th*，适用于 *profile-mask* 中选择的所有配置文件。对于双模式，可以依次运行 *level-one* 和 *level-two*。校准时间为 15s。此功能主要适用于周期性运动/振动。

在校准过程或活动监测测试期间启用 LED 可能有助于确保正确运行。

示例：使用单级活动监测校准配置文件 #0：

:::warning
启用朝向时进行活动校准会导致故障和设备重启。校准前使用 `data orient-cfg` 禁用，完成后重新启用。参见 LORA-279。
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

校准后，可以使用命令 `data activity-cfg` 手动更改 *level1-th* 和 *level2-th*。

##### 冲击与自由落体 {#impact-and-free-fall}

命令 `data acc-cfg` 可用于配置设备加速度计以进行基本冲击和自由落体检测。帧：motion-events、impact-count 包含相关数据字段。current-state 包含 impact_evnt、free_fall_evnt 标志，用于指示新事件。如果更倾向于显式读取，可以使用这些标志。

变量 impact_cnt、impact_cnt_x、impact_cnt_y、impact_cnt_z、impact_etm、free_fall_cnt、free_fall_etm 允许基于规则的逻辑。

如果启用了活动监测，则无法使用冲击和自由落体检测，这些检测将被忽略。

#### 数据规则 {#data-rules}

最多可使用命令配置 32 条自定义用户规则：`data set-rule`、`data del-rule`。规则具有测试表达式、可选输入规则和要执行的动作。

添加或覆盖规则的命令语法：

```none
data set-rule [<rule-num>],<test-expr>,[<input-expr>],[<switch-profile>],[<make-event-0>],[<make-event-1>], [<make-event-2>],[<make-event-3>],[<send-frame-0>],[<send-frame-1>],[<send-frame-2>],[<send-frame-3>],[<clr-timer-mask>]
```

##### 测试表达式 {#test-expression}

&lt;test-expr&gt;: [^] variable-type &lt;operator> &lt;argument>

| [^] | 在表达式中使用变量绝对值 |
| --- | --- |
| variable-type | 变量名或 ID |
| &lt;operator> | >, >=, &lt;, &lt;=, ==, !=, % |
| &lt;argument> | 数值 |

示例：

```none
data set-rule 0,profile == 0
data set-rule 1,^temperature > 30.55
data set-rule 2,impact_etm < 60
```

相同的规则可以使用用户变量数字 ID 给出：

```none
data set-rule 0,0 == 0
data set-rule 1,^8 > 30.55
data set-rule 2,24 < 60
```

##### 输入表达式 {#input-expression}

如果规则需要依赖其他规则的结果，则使用输入表达式。这允许基于多个测试表达式构造复杂逻辑。

&lt;input-expr&gt;: [&][|][!]&lt;input-rule>[&lt;]

| [&] | &lt;rule-num> 和 &lt;input-rule> 的逻辑与 |
| --- | --- |
| [\|] | &lt;rule-num> 和 &lt;input-rule> 的逻辑或 |
| [!] | 输入值的逻辑非 |
| &lt;input-rule> | 要作为输入添加的规则编号 |
| [&lt;] | 使用规则组合状态作为输入值，否则使用本地状态。 |

以下配置将在磁开关状态在 15s 内发生变化且温度或湿度超出范围（-5..55 和 10..90%）时发送 current-state 数据帧：

```none
data del-rule
data set-rule 0,temperature < -5
data set-rule 1,temperature > 55
data set-rule 2,humidity < 10
data set-rule 3,humidity > 90,|0|1|2
data set-rule 4,mag_sw_etm < 15,&3<,,,,,,current-state
```

输入规则按数字顺序评估，与 `set-rule` 命令中的顺序无关。

##### 动作 {#actions}

规则测试表达式的评估值表示数据规则本地状态。使用可选输入规则评估的本地状态表示组合状态。

如果组合状态变为 TRUE 状态，则执行可选规则动作：配置文件切换、事件生成、帧调度、用户定时器重置。

如果给出了 &lt;switch-profile> 参数，则将更改当前配置文件。例如，如果温度降到 15 C 以下，设备将切换到配置文件 5（设备配置文件）：

```none
data set-rule 1,temperature < 15,,5
```

每条规则最多可调度 4 个不同的数据帧：

```none
data set-rule 0,impact_cnt % 10,,,,,,,current-state,device-orientation,dev-health,ema-temp
```

如果需要发送超过 4 个帧，可以使用规则链。

每条规则最多可生成 4 个不同事件：

```none
data set-rule 0,impact_cnt % 10,,,temperature_ema,humidity_ema,activity_state,timer_1
```

##### 事件 {#events}

动作可以选择生成事件。事件是带时间戳的用户变量，会在 device-events 帧中发送。可以使用 `data event-cfg` 命令配置事件存储。如果设备已使用时间同步接收到绝对时间，事件将具有 POSIX 时间戳。这允许收集特定历史数据以便稍后报告。事件上行链路可以周期性触发、基于某些规则触发，或使用下行链路命令手动触发。

### 磁开关 {#magnet-switch}

设备具有磁开关，可用于命令输入或作为磁场传感器。如果未使用，可以使用 `mag svc` 命令完全禁用命令输入或对其进行 PIN 保护。

每台设备都带有唯一 PIN 码。

#### 命令输入 {#command-input}

用户必须输入 1 到 4 位数字的命令序列。每位数字连续输入。空闲 2.5s 后，有效输入命令将被执行，设备使用 LED 指示结果。成功执行的命令以 3 次 0.2s LED 闪烁指示，失败则以 1s 长 LED 脉冲指示。无效命令会被忽略。

当向设备施加磁场时，LED 开始以 500ms 亮、500ms 灭的间隔闪烁（或根据 `mag cfg` 配置的 blink-mode）。当 LED 点亮时，内部计数器从 0 开始递增。当移除磁场时，计数器值被锁存为用户输入数字。如果再次施加磁场，则开始输入序列中的下一位数字。如果施加数字后的间隔大于 2.5s，则评估该序列。

基于时间施加输入代码时，请确保遵循以下公式：T = N - 0.5，其中 N 是 1 到 9 的输入数字，T 是施加磁场的秒数。数字之间的间隔必须小于 2.5s，但大于 200ms。

某些命令需要进入 PIN 模式，某些命令可以选择由 PIN 模式保护。参见表 磁开关命令。要进入 PIN 模式，用户必须输入设备随附的 PIN 数字序列。进入 PIN 模式后，它将在可配置时间后过期，设备将返回正常模式。

也可以完全禁用磁命令。重新启用的唯一方法是使用 LoRaWAN 下行链路命令。如果磁传感器仅用于检测外部信号，并且不期望或不允许用户命令，这将很有用。

**表 9 磁开关命令**

| 序列 | PIN 模式 | 命令描述 |
| --- | --- | --- |
| 2 | 可选 | 激活 - 启用 RUN 模式。 |
| 3-1 | 可选 | 触发 current-state 帧上行链路。 |
| 4-1-X | 可选 | 切换设备配置文件，其中 X 为配置文件编号 + 1 [1..6]。 |
| 4-2-1 | 可选 | 将主频段设置为 BAND_1GHz。 |
| 4-2-2 | 可选 | 将主频段设置为 BAND_2GHz。 |
| 4-3-1 | 可选 | 启用辅助频段。 |
| 4-3-9 | 可选 | 禁用辅助频段。 |
| 6-1 | 可选 | 设备重启。 |
| 6-2-9 | 可选 | 停用设备 - SHUTDOWN 模式。 |
| 9-X-Y | 可选 | 按照支持的区域设置 sub GHz 频段的区域。 |
| 6-9-9 | 必需 | 设备恢复出厂设置。 |
| 3-1-5 | 必需 | 退出 PIN 模式。 |
| A-B-C-D | – | 进入 PIN 模式。A-B-C-D 是设备出厂 PIN 码的数字。 |
| 5-3-1 | 可选 | 保留。 |

数字输入期间的 LED 指示可根据设备配置进行更改。可以使用 `mag cfg` 更改或完全禁用 LED 指示。

#### 磁传感器 {#magnet-sensor}

磁传感器始终运行（即使应用了命令）。该传感器可用于检测开关事件 mag_sw_flag 或统计这些事件的数量 mag_sw_cnt。设备可以报告当前开关状态、状态变化次数和最后时间戳（UNIX/uptime）mag_switch_ts。此外，你可以基于这些属性创建规则。

### 命令编码 {#command-encoding}

设备命令采用二进制编码，以减小下行链路消息大小。我们提供 Python 工具来验证、编码并将命令发布为 LoRaWAN 二进制下行链路消息。

[tg-lrx2-utils.zip](pathname:///assets/tg-lrx2-utils.zip) 或使用 *pip install tg-lrx2-utils* 安装

示例配置：每 600 秒发送 current-state 和 activity 帧上行链路，每 43200 秒发送 mag-switch，作为确认消息：

```none
# lora-script.txt
frame set-cfg 1,601,0,0,current-state,activity
frame set-cfg 1,43200,1,0,mag-switch
```

我们可以使用 *tg-lrx2-encode* 将文本命令转换为用于下行链路的二进制消息：

```none
tg-lrx2-encode --script ./lora-script.txt --dev-desc ./tg-lrx2-2.0-desc.yml --max-len=50 --out ./lora-pub.yml
```

[tg-lrx2-2.0-desc.yml](pathname:///assets/tg-lrx2-2.0-desc.yml) 包含完整的设备特性描述，并供其他工具使用。请确保为特定设备和 FW 版本使用正确的文件！

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

参数 &lt;key> 和 &lt;delay-ms> 是必需的，但 &lt;fw-def> 是可选的，可以省略：

```none
app factory-reset 984651411,,2500
```

每个参数都有有效的输入范围和格式。某些参数只允许在参数之间进行特定选择，或在范围之间进行选择。

大多数参数接受整数值。*%f* 表示参数接受小数值。使用这些值会导致更大的下行链路载荷，因此如果可能，应优先使用整数值。variable-type 表示参数接受用户变量名或相应的整数 ID。frame-type 表示参数接受数据帧名或整数 ID。*tg-lrx2-encode* 会自动将这些名称转换为数字 ID。

#### app set-mode {#app-set-mode}

| app set-mode &lt;mode> | | |
| --- | --- | --- |
| 设置设备运行模式 | | |
| 参数 | 范围 | 描述 |
| mode | 0 | SHUTDOWN |
| | 1 | RUN |

#### app profile {#app-profile}

| app profile &lt;profile-num>,&lt;make-default> | | |
| --- | --- | --- |
| 切换活动配置文件，并可选设为默认 | | |
| 参数 | 范围 | 描述 |
| profile-num | 0..5 | |
| make-default | 0 | no |
|  | 1 | yes |

#### app reset {#app-reset}

| app reset &lt;type> | | |
| --- | --- | --- |
| 系统复位 | | |
| 参数 | 范围 | 描述 |
| type | 0 | 主板 |
| | 1 | 仅应用 |

#### app factory-reset {#app-factory-reset}

| app factory-reset &lt;key>,[&lt;fw-def>],&lt;delay-ms> | | |
| --- | --- | --- |
| 重启设备，清除已保存配置并设置为默认值（可选） | | |
| 参数 | 范围 | 描述 |
| key | 984651411 | |
| fw-def | 784565141 | 不应用默认配置 |
| delay-ms | 0..65535 | |

#### app led {#app-led}

| app led [&lt;enable>] | | |
| --- | --- | --- |
| 配置应用 LED 信号 | | |
| 参数 | 范围 | 描述 |
| enable | 0 | no |
|  | 1 | yes |

#### app set-time {#app-set-time}

| app set-time [&lt;unix-time-s>],&lt;uptime-s> | | |
| --- | --- | --- |
| 设置相对于设备运行时间的 UNIX 时间 | | |
| 参数 | 范围 | 描述 |
| unix-time-s | 0..4294967295 | |
| uptime-s | 0..4294967295 | |

#### lora set-region {#lora-set-region}

| lora set-region &lt;region-code> | | |
| --- | --- | --- |
| 设置 sub GHz 频段的 LoRaWAN 区域 | | |
| 参数 | 范围 | 描述 |
| region-code | 1 | EU868 |
| | 2 | AS923-1 |
| | 3 | US915 |
| | 4 | AU915 |
| | 7 | AS923-2 |
| | 8 | AS923-3 |
| | 9 | IN868 |
| | 10 | KR920 |

#### lora primary-band {#lora-primary-band}

| lora primary-band &lt;band> | | |
| --- | --- | --- |
| 选择主频段 | | |
| 参数 | 范围 | 描述 |
| band | 1 | &lt;1GHz |
| | 2 | 2.45GHz |

#### lora second-band {#lora-second-band}

| lora second-band &lt;mode> | | |
| --- | --- | --- |
| 启用或禁用辅助频段 | | |
| 参数 | 范围 | 描述 |
| mode | 0 | 关 |
| | 1 | 开 |

#### lora join-cfg {#lora-join-cfg}

| lora join-cfg &lt;band>,&lt;duty> | | |
| --- | --- | --- |
| 配置频段的入网占空比 | | |
| 参数 | 范围 | 描述 |
| band | 1 | &lt;1GHz |
| | 2 | 2.45GHz |
| duty | 0 | 0.1% |
| | 1..254 | |
| | 255 | 1% |

#### lora link-chk {#lora-link-chk}

| lora link-chk &lt;band>,&lt;int-minutes> | | |
| --- | --- | --- |
| 设置特定频段的链路检查间隔和超时 | | |
| 参数 | 范围 | 描述 |
| band | 1 | &lt;1GHz |
| | 2 | 2.45GHz |
| int-minutes | 0 | 关 |
| | 5..500000 | |

#### lora adr-cfg {#lora-adr-cfg}

| lora adr-cfg &lt;en-netw-adr>,[&lt;fixed-data-rate>] | | |
| --- | --- | --- |
| 启用网络 ADR 或配置固定数据速率 | | |
| 参数 | 范围 | 描述 |
| en-netw-adr | 0 | 关 |
| | 1 | 开 |
| fixed-data-rate | 0..6 | |

#### lora clk-sync {#lora-clk-sync}

| lora clk-sync [&lt;int-minutes>],[&lt;leap-sec>],&lt;sync-now>,[&lt;retry-s>],[&lt;retry-cnt>] | | |
| --- | --- | --- |
| 绝对时间同步 | | |
| 参数 | 范围 | 描述 |
| int-minutes | 0 | 关 |
| | 1..65535 | |
| leap-sec | -128..127 | |
| sync-now | 0 | no |
|  | 1 | yes |
| retry-s | 0..255 | |
| retry-cnt | 0..255 | |

#### lora cfg-class-b {#lora-cfg-class-b}

| lora cfg-class-b [&lt;auto-en>],[&lt;ping-slot-int-s>] | | |
| --- | --- | --- |
| 配置 LoRaWAN Class B | | |
| 参数 | 范围 | 描述 |
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

| lora class &lt;class> | | |
| --- | --- | --- |
| 切换 LoRaWAN class | | |
| 参数 | 范围 | 描述 |
| class | 0 | A |
| | 1 | B |

#### lora join-eui {#lora-join-eui}

| lora join-eui &lt;cred-ch-key>,&lt;eui-0>,&lt;eui-1>,&lt;eui-2>,&lt;eui-3>,&lt;eui-4>,&lt;eui-5>,&lt;eui-6>,&lt;eui-7> | | |
| --- | --- | --- |
| 覆盖网络 JoinEUI | | |
| 参数 | 范围 | 描述 |
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

| lora net-key &lt;cred-ch-key>,&lt;key-0>,&lt;key-1>,&lt;key-2>,&lt;key-3>,&lt;key-4>,&lt;key-5>,&lt;key-6>,&lt;key-7>,&lt;key-8>,&lt;key-9>,&lt;key-10>, &lt;key-11>,&lt;key-12>,&lt;key-13>,&lt;key-14>,&lt;key-15> | | |
| --- | --- | --- |
| 覆盖网络 AppKey | | |
| 参数 | 范围 | 描述 |
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

| lora cred [&lt;confirm-timeout-s>],[&lt;action>] | | |
| --- | --- | --- |
| 用户网络凭证管理 | | |
| 参数 | 范围 | 描述 |
| confirm-timeout-s | 60..65535 | 如果未入网则回退 |
| action | 0 | 清除待处理 |
| | 1 | 立即尝试 |
| | 87904163 | 强制确认 |

#### frame send {#frame-send}

| frame send &lt;frame-id>,… | | |
| --- | --- | --- |
| 调度上行链路帧 | | |
| 参数 | 范围 | 描述 |
| frame-id | frame-type | |

#### frame set-cfg {#frame-set-cfg}

| frame set-cfg &lt;profile-mask>,[&lt;ul-period-s>],[&lt;confirmed>],[&lt;on-join>],&lt;frame-id>,… | | |
| --- | --- | --- |
| 设置上行链路帧配置 | | |
| 参数 | 范围 | 描述 |
| profile-mask | 1..63 | 位域 |
| ul-period-s | 0 | 关 |
| | 1..65535 | |
| confirmed | 0 | no |
|  | 1 | yes |
| on-join | 0 | no |
|  | 1 | yes |
| frame-id | frame-type | |

#### frame clear-cfg {#frame-clear-cfg}

| frame clear-cfg &lt;profile-mask> | | |
| --- | --- | --- |
| 清除指定配置文件的所有帧配置（等同于 ‘set-cfg profile-mask,0,0,0,…’） | | |
| 参数 | 范围 | 描述 |
| profile-mask | 1..63 | 位域 |

#### mag cfg {#mag-cfg}

| mag cfg [&lt;pin-timeout>],[&lt;pin-protect>],[&lt;blink-mode>] | | |
| --- | --- | --- |
| 设置配置 | | |
| 参数 | 范围 | 描述 |
| pin-timeout | 0..65535 | |
| pin-protect | 0 | 关 |
| | 1 | 开 |
| blink-mode | 0 | 半占空比 |
| | 1 | 脉冲 |
| | 2 | 关 |

#### mag svc {#mag-svc}

| mag svc &lt;new-state>,&lt;key> | | |
| --- | --- | --- |
| 启用或禁用磁命令接口 | | |
| 参数 | 范围 | 描述 |
| new-state | 0 | 关 |
| | 1 | 开 |
| key | 649864801 | |

#### data sample {#data-sample}

| 数据示例 |
| --- |
| 强制传感器轮询 |

#### data next-epoch {#data-next-epoch}

| data next-epoch &lt;type> | | |
| --- | --- | --- |
| 手动开始下一个直方图纪元 | | |
| 参数 | 范围 | 描述 |
| type | | |

#### data poll-cfg {#data-poll-cfg}

| data poll-cfg &lt;profile-mask>,[&lt;th-poll-int>],[&lt;sync-period>],[&lt;on-mag-switch>],[&lt;on-activity-change>],[&lt;on-impact>], [&lt;on-free-fall>],[&lt;on-ul-stale>],[&lt;bat-poll-int>] | | |
| --- | --- | --- |
| 设置数据轮询配置 | | |
| 参数 | 范围 | 描述 |
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

| data temp-histo-cfg &lt;profile-mask>,[&lt;epoch-interval-s>],[&lt;epoch-interval-cnt>],[&lt;epoch-max-bin-cnt>], [&lt;frame-on-new-epoch>],[&lt;lim-divider>],[&lt;bin-limit-0>],[&lt;bin-limit-1>],[&lt;bin-limit-2>],[&lt;bin-limit-3>],[&lt;bin-limit-4>], [&lt;bin-limit-5>],[&lt;bin-limit-6>],[&lt;bin-limit-7>],[&lt;bin-limit-8>] | | |
| --- | --- | --- |
| 设置温度直方图配置 | | |
| 参数 | 范围 | 描述 |
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

| data humid-histo-cfg &lt;profile-mask>,[&lt;epoch-interval-s>],[&lt;epoch-interval-cnt>],[&lt;epoch-max-bin-cnt>], [&lt;frame-on-new-epoch>],[&lt;lim-divider>],[&lt;bin-limit-0>],[&lt;bin-limit-1>],[&lt;bin-limit-2>],[&lt;bin-limit-3>],[&lt;bin-limit-4>], [&lt;bin-limit-5>],[&lt;bin-limit-6>],[&lt;bin-limit-7>],[&lt;bin-limit-8>] | | |
| --- | --- | --- |
| 设置湿度直方图配置 | | |
| 参数 | 范围 | 描述 |
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

| data ema-cfg &lt;profile-mask>,[&lt;temp-cnt>],[&lt;humid-cnt>],[&lt;bat-cnt>],[&lt;orient-cnt>],[&lt;send-ema-temp>],[&lt;send-ema-humid>], [&lt;send-ema-bat>],[&lt;send-ema-orient>] | | |
| --- | --- | --- |
| 设置指数移动平均（EMA）配置 | | |
| 参数 | 范围 | 描述 |
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

| data activity-cfg &lt;profile-mask>,[&lt;mode>],[&lt;level1-th>],[&lt;level2-th>],[&lt;en-led>] | | |
| --- | --- | --- |
| 设置活动监测配置 | | |
| 参数 | 范围 | 描述 |
| profile-mask | 1..63 | 位域 |
| mode | 0 | 关 |
| | 1 | single |
| | 2 | dual |
| level1-th | 1..63 | |
| level2-th | 1..63 | |
| en-led | 0 | 关 |
| | 1 | 开 |

#### data acc-cfg {#data-acc-cfg}

| data acc-cfg &lt;profile-mask>,[&lt;full-scale>],[&lt;en-impact-x>],[&lt;en-impact-y>],[&lt;en-impact-z>],[&lt;impact-th>],[&lt;impact-dur>], [&lt;en-ff>],[&lt;ff-th>],[&lt;ff-dur>],[&lt;data-rate>],[&lt;filter>],[&lt;lp-mode>],[&lt;low-noise>] | | |
| --- | --- | --- |
| 设置加速度计配置 | | |
| 参数 | 范围 | 描述 |
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

| data orient-cfg &lt;profile-mask>,[&lt;enable>],[&lt;max-1G-offset>],[&lt;poll-interval-s>],[&lt;ref-1-x>],[&lt;ref-1-y>],[&lt;ref-1-z>], [&lt;ref-2-x>],[&lt;ref-2-y>],[&lt;ref-2-z>],[&lt;ref-3-x>],[&lt;ref-3-y>],[&lt;ref-3-z>] | | |
| --- | --- | --- |
| 设置朝向感测配置 | | |
| 参数 | 范围 | 描述 |
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

| data event-cfg &lt;profile-mask>,[&lt;max-count>],[&lt;send-th>],[&lt;discard>],[&lt;send-all>] | | | |
| --- | --- | --- | --- |
| 设置事件存储配置 | | | |
| 参数 | 范围 | 描述 | |
| profile-mask | 1..63 | 位域 | |
| max-count | 0 | 已禁用 | |
| | 1..100 | | |
| send-th | 0..65535 | 如果 count >= send-th：send(device-events) | |
| discard | 0 | 最旧 | 如果没有可用空间 |
| | 1 | 最新 | |
| send-all | 0 | 关 | |
| | 1 | 开 | |

#### data erase-events {#data-erase-events}

| data erase-events [&lt;num-oldest>] | | |
| --- | --- | --- |
| 如果提供 &lt;num-oldest>，则擦除该数量的事件；否则擦除全部 | | |
| 参数 | 范围 | 描述 |
| num-oldest | 0..65535 | |

#### data del-rule {#data-del-rule}

| data del-rule [&lt;rule-num>] | | |
| --- | --- | --- |
| 如果提供 &lt;rule-num>，则删除该数量的规则；否则删除全部 | | |
| 参数 | 范围 | 描述 |
| rule-num | 0..31 | |

#### data set-rule {#data-set-rule}

| data set-rule [&lt;rule-num>],&lt;test-expr>,[&lt;input-expr>],[&lt;switch-profile>],[&lt;make-event-0>],[&lt;make-event-1>], [&lt;make-event-2>],[&lt;make-event-3>],[&lt;send-frame-0>],[&lt;send-frame-1>],[&lt;send-frame-2>],[&lt;send-frame-3>],[&lt;clr-timer-mask>] | | |
| --- | --- | --- |
| 设置数据规则 &lt;rule-num> | | |
| 参数 | 范围 | 描述 |
| rule-num | 0..31 | |
| test-expr | | |
| input-expr | | |
| switch-profile | 0..5 | |
| make-event-0 | variable-type | |
| make-event-1 | variable-type | |
| make-event-2 | variable-type | |
| make-event-3 | variable-type | |
| send-frame-0 | frame-type | |
| send-frame-1 | frame-type | |
| send-frame-2 | frame-type | |
| send-frame-3 | frame-type | |
| clr-timer-mask | 0..15 | |

#### data timer {#data-timer}

| 数据计时器 [&lt;timer_1>],[&lt;timer_2>],[&lt;timer_3>],[&lt;timer_4>] | | |
| --- | --- | --- |
| 设置用户定时器值 | | |
| 参数 | 范围 | 描述 |
| timer_1 | 0..4294967295 | timer_1 |
| timer_2 | 0..4294967295 | timer_2 |
| timer_3 | 0..4294967295 | timer_3 |
| timer_4 | 0..4294967295 | timer_4 |

#### data activity-cal {#data-activity-cal}

| data activity-cal &lt;profile-mask>,&lt;cal-level>,&lt;cal-led> | | |
| --- | --- | --- |
| 运行活动监测校准并将结果应用到配置文件 | | |
| 参数 | 范围 | 描述 |
| profile-mask | 1..63 | 位域 |
| cal-level | 1 | level-one |
| | 2 | level-two |
| cal-led | 0 | no |
|  | 1 | yes |

### 数据帧 {#data-frames}

| ID | 大小 [B] | 名称 | 数据字段 |
| --- | --- | --- | --- |
| 1 | 5 | current-state | temperature, humidity, mag_sw_cnt_u8, major_axis_orientation, activity_state, free_fall_evnt, impact_evnt, pending_evnt |
| 2 | variable | device-events | event-list |
| 3 | 11 | temp-histogram | temp_histo_epoch, temp_histo_bin[10] |
| 4 | 11 | humid-histogram | humid_histo_epoch, humid_histo_bin[10] |
| 5 | 3 | device-orientation | orientation_x, orientation_y, orientation_z |
| 6 | 9 | full-activity | activity_state, activity_s, high_activity_s |
| 7 | 8 | motion-events | impact_cnt, free_fall_cnt |
| 8 | 8 | mag-switch | mag_sw_cnt, mag_switch_ts |
| 9 | 8 | impact-count | impact_cnt_u16, impact_cnt_x_u16, impact_cnt_y_u16, impact_cnt_z_u16 |
| 10 | 2 | last-temp | temperature |
| 11 | 2 | ema-temp | temperature_ema |
| 12 | 1 | last-humid | humidity |
| 13 | 1 | ema-humid | humidity_ema |
| 14 | 5 | activity | activity_state, total_activity_s |
| 20 | 8 | dev-time | uptime_s, unix_time |
| 21 | 2 | dev-health | battery_mv |
| 22 | 11 | version | version_pid, version_maj, version_min, version_rev, version_hash[6] |
| 23 | 11 | serial-number | serial_number[11] |
| 24 | 10 | cfg-state | cfg_app_crc, cfg_net_crc, cfg_frames_crc, cfg_data_crc, cfg_rules_crc |
| 25 | variable | full-cfg | content-offset, content-final, content-len, content-binary-blob |
| 26 | variable | app-cfg | content-offset, content-final, content-len, content-binary-blob |
| 27 | variable | net-cfg | content-offset, content-final, content-len, content-binary-blob |
| 28 | variable | frame-cfg | content-offset, content-final, content-len, content-binary-blob |
| 29 | variable | data-cfg | content-offset, content-final, content-len, content-binary-blob |
| 30 | variable | rules-cfg | content-offset, content-final, content-len, content-binary-blob |

### 用户变量 {#user-variables}

| ID | 大小 [B] | 编码 | 名称 | 描述 |
| --- | --- | --- | --- | --- |
| 0 | 1 | u8 | profile | 当前数据配置文件（0..5） |
| 1 | 4 | u32 | profile_etm | 自上次配置文件切换以来的经过时间 [s] |
| 2 | 4 | u32 | daytime_tm | 自 00:00 GMT 午夜以来的秒数，未知则为 0 |
| 3 | 4 | u32 | unix_time | 当前 UNIX 时间；如果未知则为设备运行时间 |
| 4 | 4 | u32 | net_frame_etm | 自上次网络上行链路以来的经过时间 |
| 5 | 1 | bool | net_joined_flag | 网络入网状态 |
| 6 | 1 | u8 | net_class | 当前选择的 LoRaWAN class |
| 7 | 1 | u8 | net_region | 当前使用的 LoRaWAN 区域代码 |
| 8 | 2 | f8.8 | temperature | 最后测量的温度 |
| 9 | 2 | f8.8 | temperature_ema | 测量温度的 EMA |
| 10 | 1 | u8 | humidity | 最后测量的湿度 |
| 11 | 1 | u8 | humidity_ema | 测量湿度的 EMA |
| 12 | 4 | u32 | mag_sw_cnt | 磁开关状态变化计数器 |
| 13 | 4 | u32 | mag_sw_etm | 自上次磁开关变化以来的经过时间 [s] |
| 14 | 1 | bool | mag_sw_flag | 磁开关的当前状态 |
| 15 | 1 | activity | activity_state | 当前设备活动状态 |
| 16 | 4 | u32 | activity_s | 低活动（级别 1）状态计数器 [s] |
| 17 | 4 | u32 | high_activity_s | 高活动（级别 2）状态计数器 [s] |
| 18 | 1 | orient | major_axis_orientation | 粗略设备朝向 |
| 19 | 4 | u32 | impact_cnt_x | X 轴冲击事件计数器 |
| 20 | 4 | u32 | impact_cnt_y | Y 轴冲击事件计数器 |
| 21 | 4 | u32 | impact_cnt_z | Z 轴冲击事件计数器 |
| 22 | 4 | u32 | impact_cnt | 冲击事件计数器 |
| 23 | 1 | bool | impact_evnt | 冲击事件标志，由 current-state、motion-events、impact-count 帧清除 |
| 24 | 4 | u32 | impact_etm | 自上次冲击事件以来的经过时间 [s] |
| 25 | 4 | u32 | free_fall_cnt | 自由落体事件计数器 |
| 26 | 1 | bool | free_fall_evnt | 自由落体事件标志，由 current-state、motion-events 帧清除 |
| 27 | 4 | u32 | free_fall_etm | 自上次自由落体事件以来的经过时间 [s] |
| 28 | 1 | u8 | angle_1 | 当前朝向与用户 ref-1 向量之间的角度，参见 data orient-cfg |
| 29 | 1 | u8 | angle_2 | 当前朝向与用户 ref-2 向量之间的角度，参见 data orient-cfg |
| 30 | 1 | u8 | angle_3 | 当前朝向与用户 ref-3 向量之间的角度，参见 data orient-cfg |
| 31 | 1 | u8 | angle_ema | 当前朝向与设备朝向 EMA 之间的角度 |
| 32 | 2 | u16 | battery_mv | 最后测量的电池电压 [mV] |
| 33 | 2 | u16 | battery_mv_ema | 电池电压的 EMA [mV] |
| 34 | 2 | u16 | meta_rule_id | 用于生成带规则编号事件的元变量 |
| 35 | 4 | u32 | timer_1 | 可复位的持续向上计数定时器 [s] |
| 36 | 4 | u32 | timer_2 | 可复位的持续向上计数定时器 [s] |
| 37 | 4 | u32 | timer_3 | 可复位的持续向上计数定时器 [s] |
| 38 | 4 | u32 | timer_4 | 可复位的持续向上计数定时器 [s] |
| 39 | 4 | u32 | activity_state_etm | 自 activity_state 状态变化以来的时间 [s] |

### 帧数据字段 {#frame-data-fields}

| 大小 [B] | 编码 | 名称 | 描述 |
| --- | --- | --- | --- |
| 1 | u8 | mag_sw_cnt_u8 | 内部磁开关计数器 mag_sw_cnt 的 LSB |
| 1/8 | bool | pending_evnt | 表示设备已存储事件 |
| 0 | | event-list | 可变长度列表，包含：事件时间戳、代码和可选值 |
| 1 | u8 | temp_histo_epoch | 温度直方图纪元编号 |
| 10 | u8[10] | temp_histo_bin[10] | 温度直方图箱计数器值 |
| 1 | u8 | humid_histo_epoch | 湿度直方图纪元编号 |
| 10 | u8[10] | humid_histo_bin[10] | 湿度直方图箱计数器值 |
| 1 | i8 | orientation_x | 设备朝向法向量 X 轴 |
| 1 | i8 | orientation_y | 设备朝向法向量 Y 轴 |
| 1 | i8 | orientation_z | 设备朝向法向量 Z 轴 |
| 4 | u32 | mag_switch_ts | 上次磁开关状态变化的时间戳 |
| 2 | u16 | impact_cnt_u16 | 冲击事件计数器 |
| 2 | u16 | impact_cnt_x_u16 | X 轴冲击事件计数器 |
| 2 | u16 | impact_cnt_y_u16 | Y 轴冲击事件计数器 |
| 2 | u16 | impact_cnt_z_u16 | Z 轴冲击事件计数器 |
| 4 | u32 | total_activity_s | 总活动状态时间（级别 1 + 级别 2） |
| 4 | u32 | uptime_s | 设备 FW 运行时间 |
| 2 | u16 | version_pid | TG-LR82:0x0000, TG-LR92:0x0001 |
| 1 | u8 | version_maj | FW 版本主编号 |
| 1 | u8 | version_min | FW 版本次编号 |
| 1 | u8 | version_rev | FW 版本补丁编号 |
| 6 | u8[6] | version_hash[6] | FW 版本哈希 |
| 11 | u8[11] | serial_number[11] | 设备序列号的最后 11 个字符 |
| 2 | u16 | cfg_app_crc | app 和 mag 配置组 16 位校验和 |
| 2 | u16 | cfg_net_crc | net 配置组 16 位校验和 |
| 2 | u16 | cfg_frames_crc | frame 配置组 16 位校验和 |
| 2 | u16 | cfg_data_crc | data 配置组 16 位校验和 |
| 2 | u16 | cfg_rules_crc | 数据规则配置 16 位校验和 |
| 1/8 | bool | content-final | 表示内容最后一块的标志 |
| 15/8 | u15 | content-offset | 内容数据的字节偏移 |
| 1 | u8 | content-len | 内容长度 |
| 0 | | content-binary-blob | 内容块的二进制数据 |

### 已知问题 {#known-issues}

| ID | FW | 描述 |
| --- | --- | --- |
| LORA-275 | 2.0.0 | 禁用辅助频段时更改凭证没有超时。 |
| LORA-276 | 2.0.0 | 凭证更改命令超时不正确。 |
| LORA-279 | 2.0.0 | 启用朝向时进行活动校准会导致故障。 |

#### LORA-275 {#lora-275}

**描述：** 如果在禁用辅助频段的情况下发起凭证更改，设备将不会在入网时超时。设备将一直尝试入网，直到成功或重启。

**解决方法：** 如果新凭证无效，请使用磁开关命令物理重启设备。

#### LORA-276 {#lora-276}

**描述：** 执行 `lora cred` 时，设备将在下一次入网尝试时基于总运行时间而不是命令执行时间使入网过程超时。如果运行时间长于 *confirm-timeout-s* 参数，设备将在单次入网尝试失败后立即超时。

**解决方法：** 在尝试更改凭证之前发出设备复位命令 `app reset`。或者手动多次重试凭证更改。

#### LORA-279 {#lora-279}

**描述：** 如果在启用朝向检测时执行活动校准，设备可能发生故障并重启。

**解决方法：** 在执行活动校准之前使用 `data orient-cfg` 禁用朝向检测，并在完成后重新启用。

## 相关文档 {#related-documents}

| 编号 | 名称 |
| --- | --- |
| 1 | TS001-1.0.4 LoRaWAN® L2 1.0.4 规范 |
| 2 | 64 位全局标识符（EUI-64）指南 |
