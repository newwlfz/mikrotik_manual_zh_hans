---
title: "适用于 iOS 设备的 MikroTik Beacon Manager"
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-beacon-manager-for-ios-devices
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

##

## 概述 {#overview}

MikroTik Beacon Manager 应用用于配置 Bluetooth 标签（TG-BT5-XX）。由于标签是基于 Bluetooth 的设备，因此在继续配置之前，必须在手机上启用 Bluetooth。

对于 iOS 设备，可以通过以下[链接](https://apps.apple.com/id/app/mikrotik-beacon-manager/id1561796698)找到该应用。

![](/img/6f29fdbe1437d3b0.png)

## 我的设备 {#my-devices}

启动应用后看到的第一个屏幕是“My devices”屏幕，其中显示附近的所有 Bluetooth 标签。

![](/img/3bbbbe7dcb472252.webp)

如果列表为空，则表示附近所有标签均处于出厂休眠模式。标签进入广播模式或配置模式后，将显示在列表中。要将标签从出厂休眠模式唤醒，请将磁铁放在标签上方（激活 reed-switch）3-10 秒。

屏幕底部有 2 个选项：停留在“My devices”选项卡，或在“Settings”选项卡下更改应用设置。

## 设置 {#settings}

如果更改应用的“Settings”，将显示以下界面：

![](/img/8c97c345ed56c27b.webp)

“Settings”选项卡分为“Discovery”、“Miscellaneous”和“About”部分。

在“Discovery”部分，可以启用“MirkoTik packets only”复选框，以确保“My device”列表中仅显示 MikroTik 设备。禁用时，所有 Bluetooth 设备都会显示在“My device”列表中。

在“Miscellaneous”部分，可以更改应用语言（English、Russian、Latvian 和 Portuguese）和外观（System、Dark 和 Light）。

“About”部分仅显示应用版本。

## 标签管理 {#tag-management}

当标签位于列表中时，可以点击它进入该标签的单独概览页面：

![](/img/c5f4359cd479fc0d.webp)

![](/img/b40760171e0f24ca.webp)

首先应注意信号强度指示（标签的 RSSI 信号，即标签的距离）。当所有圆圈均已填充时，表示信号强度约为 -60 RSSI。当仅填充 2 个圆圈时，表示信号强度约为 -70 RSSI。当仅填充一个圆圈时，表示信号强度为 -80 RSSI。当没有圆圈被填充时，表示信号强度为 -90 RSSI 或更低。

在信号强度指示下方，可以查看标签的电池电量、温度和加速度。

:::info
TG-BT5-IN 型号没有温度传感器！
:::

在“Sensor Triggers”字段中，可以查看标签上报的触发器（设备是否被倾斜、抛掷或跌落）：

![](/img/2e91939c91ff19ed.webp)

在“Display Name”字段中，可以更改标签名称。

在“Device icon”字段中，可以为标签分配图标。

如果选择“Remove device”按钮 → 可以取消设备配对并将其从设备列表中移除。

## 标签配置 {#tag-configuration}

要访问标签的配置菜单，需要将标签置于“Configuration mode”：

![](/img/c0dbe0bff6b22fe4.webp)

要进入设备配置，请将磁铁保持在 reed switch 上方，直到其 LED 停止闪烁。

成功进入配置模式后，“settings/gear”图标（右上角）将变为橙色，并且屏幕底部会显示消息“Configuration mode enabled”，如下面的屏幕截图所示：

![](/img/ad498dd9c76fce4e.webp)

点击屏幕右上角的橙色“settings/gear”图标，进入标签的配置页面：

![](/img/cdc8d3a19ccce0a0.webp)

此页面会要求你同步标签的时间和日期。

![](/img/76671aace50d8565.webp)

应用会在“Device status”选项卡下显示标签的常规信息（如上面的屏幕截图所示）。

:::info
TG-BT5-IN 型号没有温度传感器！
:::

可以在“Configuration”选项卡中修改设置：

![](/img/a239c9e844cb153f.webp)

![](/img/ef18782a567b4bf3.webp)

### “Accelerometer”设置 {#accelerometer-settings}

本节可修改“Power mode”“Measurements”“Wakeup Threshold and Duration”“Free Fall Threshold and Duration”“Angle Threshold”和“Low noise filter”设置。

#### 电源模式 {#power-mode}

![](/img/6dc6d8f52961c489.webp)

此菜单允许你在 2 种模式之间选择：“Low power” 和 “High power”。在 “Low power” 模式下，精度较低，但功耗也较低。在 “High power” 模式下，精度较高，但功耗也较高。

“scale factor”是测量范围（scale factor 越低，精度越高，但请注意，无法测量较大的加速度峰值）。

#### Measurements

![](/img/6b42f60ad0eeb4ac.webp)

“Data Rate”设置表示 1 秒窗口内的加速度测量次数（测量频率）。每秒发送的数据包越少 → 功耗越低。

“Bandwith filter”是数字滤波截止频率（高通滤波器带宽）。

如果带宽为“x”Hz，则标签会滤除每秒发生次数少于“x”次的加速度变化。

例如，如果设备平放在桌面上，加速度将显示为 0g（而不是 1g），即使存在地球重力 →（因为地球重力是恒定的，其变化频率为 0 Hz，小于“x”Hz）它会被滤除。

#### 唤醒阈值和持续时间 {#wakeup-threshold-and-duration}

![](/img/be5cdce0ca290fb7.webp)

“Wakeup Threshold”定义唤醒区域或加速度范围。“Wakeup Duration”定义加速度超过所配置唤醒阈值的持续时间。当任意轴（X、Y 或 Z）上的加速度在配置的唤醒持续时间内超过阈值时，将生成唤醒事件（触发唤醒条件）。为更好理解“任意轴（X、Y 或 Z）上的加速度”的含义，可想象一个三维笛卡尔坐标系，标签的加速度计或标签本身位于原点（公共点）：

![](/img/13cf2251bb92b747.png) ![](/img/03b6ed29411f1e34.png)

例如，唤醒阈值设置为 1.0g（表示 -1.0g 至 +1.0g 之间的任何加速度均处于配置的阈值或加速度范围内），唤醒持续时间设置为 0.12s。因此，当设备沿任意轴被推动或抛掷（设备开始向任意方向移动），且加速度超过配置阈值（acceleration> +1.0g 或 acceleration&lt; -1.0g）并持续超过 0.12s 时，将触发唤醒条件。

#### 自由落体阈值和持续时间 {#free-fall-threshold-and-duration}

![](/img/a1a13c13d5d2af9c.webp)

“Free Fall Threshold”定义自由落体区域或加速度范围。“Free Fall Duration”定义加速度处于所配置自由落体阈值内的持续时间。当所有 3 个轴（X、Y 和 Z）上的加速度在配置的自由落体持续时间内均处于自由落体区域或阈值内时，将生成自由落体事件（触发自由落体条件）。为更好理解“所有轴（X、Y 和 Z）上的加速度”的含义，请查看“Wakeup Threshold and Duration”部分中的设备照片。

例如，freefall 阈值设置为 156.25g（表示 -156.25g 至 +156.25g 之间的任何加速度均处于配置的阈值或加速度范围内），freefall 持续时间设置为 0.2s。因此，当设备处于自由落体状态，且所有轴上的加速度在配置的阈值内（-156.25g&lt;acceleration&lt;+156.25g）持续超过 0.2s 时，将触发自由落体条件。

#### 角度阈值 {#angle-threshold}

![](/img/39fc273ae65491c6.webp)

可在 50°...80° 之间变化。它是倾斜功能的阈值。例如，当触发器设置为 60°，并且设备倾斜该角度时，将触发倾斜动作并发送广播数据包。

#### 低噪声过滤器 {#low-noise-filter}

![](/img/1d1bbb54dc3c889e.webp)

用于启用或禁用低噪声滤波器的选项。低噪声滤波器用于降低测量中的噪声密度。启用此功能会略微增加功耗。

### “Transmission” 设置 {#transmission-settings}

本节用于配置标签的 “Tx power level”。

#### 发射功率等级 {#tx-power-level}

![](/img/0c8f0f4875b2a82e.webp)

发射功率等级，单位为分贝毫瓦。取值范围为 -28dBm...6dBm。Tx Power 用于增大或减小标签的发射功率。

### “Advertismenet” 设置 {#advertismenet-settings}

在广播模式下，标签会通过 Bluetooth 广播数据包广播自身信息。信息内容取决于广播数据包类型（该类型可在设置中更改）。

目前，支持的类型如下：

MikroTik、[Eddystone-TLM](https://play.google.com/store/apps/details?id=com.mikrotik.android.bt5&hl=en_US&gl=US&pli=1)、[Eddystone-UID](https://github.com/google/eddystone/tree/master/eddystone-uid) 和 [iBeacon](https://developer.apple.com/ibeacon/)。

Eddystone-TLM、Eddystone-UID 和 iBeacon 格式可配置 4 个参数。MikroTik 格式可配置一个名为“encrypt packets”的附加参数：

![](/img/331b16485e7ad4b4.webp)

启用复选框“Enable advertising”后，可配置以下参数：

| 属性 | 说明 |
| --- | --- |
| Advertisement interval（20ms...10s 或 disable） | 标签广播通告数据包的时间间隔，单位为毫秒 |
| Freefall detection（on/off） | 加速度计（标签）检测到自由落体触发时是否发送通告数据包 |
| Tilt detection（on/off） | 加速度计（标签）检测到倾斜触发时是否发送通告 |
| Impact detection（on/off） | 加速度计（标签）检测到撞击/唤醒触发时是否发送通告 |
| Encrypt packets（on/off） - 仅适用于 MikroTik 格式 | 是否在 hex payload 中加密加速度、温度、运行时间、触发动作和电池百分比参数 |

- 仅配置 advertisement interval 且未启用任何触发器时，通告数据包将按设置的时间间隔广播（每 **x** 秒一次）。
- 启用倾斜触发器且设备发生倾斜时，将立即广播通告数据包。
- 启用自由落体触发器并检测到自由落体时，标签一旦检测到自由落体状态，就会发送数据包。
- 启用撞击触发器且设备被推动/移动时，将立即发送通告数据包。
- 启用 encrypt 参数时，hex payload 数据（如加速度、温度、运行时间、触发动作和电池百分比）将使用私钥加密。该密钥只有标签所有者知道（购买时获得）。

### “System” 设置 {#system-settings}

system 部分允许重置标签设置，并使标签进入出厂休眠模式。

#### 重置设备 {#reset-device}

该选项会使标签进入广播模式（以关闭设置）：

![](/img/d1044761869223cf.webp)

#### 出厂休眠 {#factory-sleep}

该选项会使设备进入出厂休眠模式：

![](/img/5931ae603b3e6e17.webp)
