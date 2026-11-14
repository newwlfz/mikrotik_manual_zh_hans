---
sidebar_key: "internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-beacon-manager-for-ios-devices"
sidebar_position: 2
title: "适用于 iOS 设备的 MikroTik Beacon Manager"
sidebar_label: "适用于 iOS 设备的 MikroTik Beacon Manager"
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-beacon-manager-for-ios-devices
captured_at: '2026-11-04T11:19:40+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

##

## 概述 {#overview}

MikroTik Beacon Manager 应用用于 Bluetooth 标签（TG-BT5-XX）配置。由于这些标签是基于 Bluetooth 的设备，在继续配置之前，你必须在手机上启用 Bluetooth。

对于 iOS 设备，您可以通过[链接](https://apps.apple.com/id/app/mikrotik-beacon-manager/id1561796698)找到该应用。

![](/img/6f29fdbe1437d3b0.png)

## 我的设备 {#my-devices}

启动应用后看到的第一个屏幕是“我的设备”屏幕，其中会显示所有附近的蓝牙标签。

![](/img/3bbbbe7dcb472252.webp)

如果列表为空，表示所有附近的标签都处于出厂睡眠模式。一旦标签进入广播模式或配置模式，它就会显示在列表中。要将标签从出厂睡眠模式唤醒，请将磁铁放在标签上（激活簧片开关）3-10 秒。

屏幕底部有 2 个选项——留在“我的设备”标签页，或在“设置”标签页下更改应用设置。

## 设置 {#settings}

如果您选择更改应用程序的“设置”，您将看到以下屏幕：

![](/img/8c97c345ed56c27b.webp)

“设置”标签页分为“发现”、“其他”和“关于”部分。

在“发现”部分，您可以启用“仅 MirkoTik 数据包”复选框，这将确保“我的设备”列表中只显示 MikroTik 设备。禁用后，所有蓝牙设备都会显示在“我的设备”列表中。

在“其他”部分，可以更改应用的语言（英语、俄语、拉脱维亚语和葡萄牙语）以及外观（系统、深色和浅色）。

“关于”部分仅显示应用的版本。

## 标签管理 {#tag-management}

当标签在列表中时，您可以点击它，然后进入该标签的单独概览页面：

![](/img/c5f4359cd479fc0d.webp)

![](/img/b40760171e0f24ca.webp)

您首先应该注意的是信号强度指示（标签的 RSSI 信号——表示标签距离有多远）。当所有圆圈都填充/完成时，表示信号强度约为 -60 RSSI。当仅填充 2 个圆圈时，表示信号强度约为 -70 RSSI。当仅填充一个圆圈时，表示信号强度为 -80 RSSI。当没有圆圈填充时，表示信号强度为 -90 RSSI 或更低。

在信号强度指示下方，您可以查看标签的电池电量、温度和加速度。

:::info
TG-BT5-IN 型号没有温度传感器！
:::

在“传感器触发”字段中，您可以查看标签报告的触发事件（设备是否被倾斜、抛掷或跌落）：

![](/img/2e91939c91ff19ed.webp)

在“显示名称”字段中，您可以更改标签的名称。

在“设备图标”字段中，您可以为标签分配图标。

如果您选择“移除设备”按钮 → 您可以取消配对该设备并将其从设备列表中移除。

## 标签配置 {#tag-configuration}

要访问标签的配置菜单，您需要将标签置于“配置模式”：

![](/img/c0dbe0bff6b22fe4.webp)

要进入设备配置，请将磁铁保持在簧片开关上方，直到其 LED 停止闪烁。

成功进入配置模式后，“设置/齿轮”图标（位于右上角）会变成橙色，并且您应该在屏幕底部看到“配置模式已启用”消息，如下图所示：

![](/img/ad498dd9c76fce4e.webp)

点击屏幕右上角的橙色“设置/齿轮”图标，您将进入标签的配置页面：

![](/img/cdc8d3a19ccce0a0.webp)

此页面会要求您为标签同步时间和日期。

![](/img/76671aace50d8565.webp)

应用会在“设备状态”标签页下显示有关标签的常规信息（如上方截图所示）。

:::info
TG-BT5-IN 型号没有温度传感器！
:::

可以在“配置”标签页中更改设置：

![](/img/a239c9e844cb153f.webp)

![](/img/ef18782a567b4bf3.webp)

### “加速度计”设置 {#accelerometer-settings}

此部分允许您更改“电源模式”、“测量”、“唤醒阈值和持续时间”、“自由落体阈值和持续时间”、“角度阈值”和“低噪声滤波器”设置。

#### 电源模式 {#power-mode}

![](/img/6dc6d8f52961c489.webp)

此菜单允许你在 2 种模式之间选择："Low power" 和 "High power"。在 "Low power" 模式下，你将获得较低精度，但功耗也更低。在 "High power" 模式下，你将获得较高精度，但功耗也更高。

“scale factor”是测量范围（scale factor 越低，精度越好，但请记住，无法测量更大的加速度峰值）。

#### 测量 {#measurements}

![](/img/6b42f60ad0eeb4ac.webp)

"Data Rate" 设置表示 1 秒窗口内的加速度测量次数（测量频率）。每秒发送的数据包越少 → 功耗越低。

“Bandwith filter”是数字滤波截止频率（高通滤波器带宽）。

如果带宽 = "x" Hz，则标签会过滤掉每秒发生次数少于 "x" 次的加速度变化。

例如，如果设备平放在桌面上，即使存在地球重力，加速度也会显示为 0g（而不是 1g）→（因为地球重力是恒定的 - 其变化频率为 0 Hz，即 &lt; "x" Hz）它会被过滤掉。

#### 唤醒阈值与持续时间 {#wakeup-threshold-and-duration}

![](/img/be5cdce0ca290fb7.webp)

"Wakeup Threshold" 定义唤醒区域/加速度范围。"Wakeup Duration" 定义加速度超过所配置唤醒阈值的时间。当任一轴（X、Y 或 Z）上的加速度在配置的唤醒持续时间内超过阈值时，将生成唤醒事件（触发唤醒条件）。要更好地理解“任一轴（X、Y 或 Z）上的加速度”的含义，请想象一个三维笛卡尔坐标系，并在原点（公共点）放置标签的加速度计或标签本身：

![](/img/13cf2251bb92b747.png) ![](/img/03b6ed29411f1e34.png)

例如，唤醒阈值设置为 1.0g（表示 -1.0g 到 +1.0g 之间的任何加速度都属于配置的阈值/加速度范围），唤醒持续时间设置为 0.12s。因此，一旦设备被推动/抛向任一轴方向（设备开始向任意方向移动），且加速度超过配置阈值（acceleration> +1.0g 或 acceleration&lt; -1.0g）的时间长于 0.12s → 就会触发唤醒条件。

#### 自由落体阈值与持续时间 {#free-fall-threshold-and-duration}

![](/img/a1a13c13d5d2af9c.webp)

“自由落体阈值”定义自由落体区域/加速度范围。“自由落体持续时间”定义加速度将处于所配置自由落体阈值内的时间。当所有 3 个轴（X、Y 和 Z）上的加速度在自由落体区域/阈值内持续所配置的自由落体持续时间时，将生成自由落体事件（触发自由落体条件）。要更好地理解“所有轴（X、Y 和 Z）上的加速度”是什么意思，请查看上方“唤醒阈值和持续时间”部分中的设备照片。

例如，自由落体阈值设置为 156.25g（表示 -156.25g 到 +156.25g 之间的任何加速度都属于配置的阈值/加速度范围），自由落体持续时间设置为 0.2s。因此，一旦设备处于自由落体状态，且所有轴上的加速度在配置阈值内（-156.25g&lt;acceleration&lt;+156.25g）的时间长于 0.2s → 就会触发自由落体条件。

#### 角度阈值 {#angle-threshold}

![](/img/39fc273ae65491c6.webp)

可在 50°...80° 之间变化。它是倾斜功能的阈值。例如，当触发器设置为 60°，且设备倾斜到该角度时——就会触发倾斜动作并发送广播数据包。

#### 低噪声滤波器 {#low-noise-filter}

![](/img/1d1bbb54dc3c889e.webp)

用于启用或禁用低噪声滤波器的选项。低噪声滤波器用于降低测量中的噪声密度。启用此功能会略微增加功耗。

### “传输”设置 {#transmission-settings}

此部分允许您配置标签的“Tx power level”。

#### 发射功率级别 {#tx-power-level}

![](/img/0c8f0f4875b2a82e.webp)

以分贝毫瓦为单位的发射功率级别。可在 -28dBm...6dBm 之间变化。Tx Power 仅用于增大/减小标签的发射功率。

### “广播”设置 {#advertismenet-settings}

在广播模式下，标签通过 Bluetooth 广播数据包广播自身信息。信息取决于广播数据包类型（该类型可在设置中更改）。

目前，支持的类型如下：

MikroTik、[Eddystone-TLM](https://play.google.com/store/apps/details?id=com.mikrotik.android.bt5&hl=en_US&gl=US&pli=1)、[Eddystone-UID](https://github.com/google/eddystone/tree/master/eddystone-uid) 和 [iBeacon](https://developer.apple.com/ibeacon/)。

Eddystone-TLM、Eddystone-UID 和 iBeacon 格式有一个用于配置 4 个参数的选项。MikroTik 格式有一个用于配置名为“encrypt packets”的附加参数的选项：

![](/img/331b16485e7ad4b4.webp)

一旦启用“启用广播”复选框，您将能够配置以下参数：

| 属性 | 描述 |
| --- | --- |
| 广播间隔（20ms...10s 或禁用） | 标签广播广播数据包的时间间隔（毫秒） |
| 自由落体检测（开/关） | 当加速度计（标签）检测到自由落体触发时，是否发送广播数据包 |
| 倾斜检测（开/关） | 当加速度计（标签）检测到倾斜触发时，是否发送广播 |
| 冲击检测（开/关） | 当加速度计（标签）检测到冲击/唤醒触发时，是否发送广播 |
| 加密数据包（开/关）——仅适用于 MikroTik 格式 | 是否在十六进制有效载荷中加密加速度、温度、运行时间、触发动作和电池百分比参数 |

- 当您仅配置了广播间隔而未启用任何触发时——广播数据包将根据设置的间隔时间进行广播（每 **x** 秒）。
- 当倾斜触发已启用且设备发生倾斜时——广播数据包将立即广播。
- 当自由落体触发已启用并检测到自由落体时，标签一旦检测到自由落体条件——就会发送数据包。
- 当冲击触发已启用且设备被推动/移动时——会立即发送广播数据包。
- 当启用加密参数时，十六进制有效载荷数据（如加速度、温度、运行时间、触发动作和电池百分比）会使用私钥加密。此密钥只有标签所有者知道（在购买时获得）。

### “系统”设置 {#system-settings}

系统部分允许您重置标签设置并将标签置于工厂睡眠模式。

#### 重置设备 {#reset-device}

此选项将标签置于广播模式（以关闭设置）：

![](/img/d1044761869223cf.webp)

#### 出厂睡眠 {#factory-sleep}

此选项将设备设置为工厂睡眠模式：

![](/img/5931ae603b3e6e17.webp)
