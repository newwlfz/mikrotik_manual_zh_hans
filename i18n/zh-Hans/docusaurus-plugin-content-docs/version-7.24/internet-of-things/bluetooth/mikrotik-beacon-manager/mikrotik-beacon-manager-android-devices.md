---
sidebar_key: "internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-beacon-manager-android-devices"
sidebar_position: 1
title: "适用于 Android 设备的 MikroTik Beacon Manager"
sidebar_label: "适用于 Android 设备的 MikroTik Beacon Manager"
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-beacon-manager-android-devices
captured_at: '2026-11-04T11:32:35+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

##

## 概述 {#overview}

MikroTik Beacon Manager 应用用于 Bluetooth 标签（TG-BT5-XX）配置。由于这些标签是基于 Bluetooth 的设备，在继续配置之前，你必须在手机上启用 Bluetooth。

对于 Android 设备，你可以通过[链接](https://play.google.com/store/apps/details?id=com.mikrotik.android.bt5&hl=en_US&gl=US&pli=1)找到该应用。

![](/img/6f29fdbe1437d3b0.png)

## Beacon Manager 界面 {#beacon-manager-screen}

启动应用后看到的第一个界面是 "MikroTik Beacon Manager" 界面，其中会显示所有附近的 Bluetooth 标签。

![](/img/f58035e23befaa90.webp)

如果列表为空，表示所有附近的标签都处于出厂睡眠模式。一旦标签进入广播模式或配置模式，它就会显示在列表中。要将标签从出厂睡眠模式唤醒，请将磁铁放在标签上（激活簧片开关）3-10 秒。

:::info
如果你确定标签就在手机范围内，但列表仍未捕获任何标签 → 请尝试在手机的 GPS 设置中开启 "Location=ON"。
:::
在界面的右上角有 3 个按钮：

![](/img/b392db8146318769.webp)

### 二维码读取器 {#or-code-reader}

"QR Code reader" 按钮，可让你通过二维码添加标签（MAC 地址用作标签 ID）：

![](/img/e466c601df2ce7fa.webp)

#### NFC 支持 {#nfc-support}

:::info
本节仅适用于 TG-BT5-OUT 型号
:::

你也可以使用 NFC（类似二维码读取器功能）查找标签（MAC 地址用作标签 ID）。

你只需在手机设置中启用 NFC，并打开 MikroTik Beacon Manager 应用。

当你看到初始界面（标签列表）后，将标签靠近手机的 NFC 天线，系统会提供打开设备设置的选项：

![](/img/4f2a44b0e3b0399f.webp)

如果你按下 "YES"，你将跳转到下方所示的页面。在菜单中，你可以选择从列表中删除设备，或通过 "Configure" 按钮进入配置模式。

![](/img/9588ae77a34e8d75.webp)

### 排序方式 {#order-by}

"Order by" 按钮，可让你更改设备列表的顺序，或通过勾选 "Show only MikroTik beacons" 复选框来筛选列表，仅显示 MikroTik 信标：

![](/img/85e3eca466822a0e.webp)

### 设置与批量配置 {#settings-and-batch-configuration}

"⋮" 标签页分为 2 个子标签页 - "Settings" 和 "Batch Configuration"。

#### 设置 {#settings}

此标签页中的第一个选项是设置 "Discovery refresh interval"，即扫描附近标签的间隔。

![](/img/d014ba1eb333003e.webp)

第二个选项是启用或禁用 "Save triggers" 设置。启用后，应用会将检测到的触发器保存到数据库中。你可以在 "Sensor Triggers" 菜单中查看触发器（"Sensor Triggers" 菜单在本指南的 "**标签管理**" 部分中展示）。如果禁用此选项，应用一关闭，"Sensor Triggers" 数据就会被清除。

最后，"App version" 字段显示当前应用版本/构建。

#### 批量配置 {#batch-configuration}

此选项允许你使用相同设置批量配置多个标签。

为此，你需要从其中一个标签导出配置文件。标签配置的导出和导入在本指南的 "**标签配置**" 部分中展示。

保存配置文件后，只需按下 "Batch Configuration" 按钮，它会带你进入文件菜单，你需要在其中选择文件。选择（你希望应用到多个设备的）配置文件，应用将显示一个包含所有附近检测到的标签的界面：

![](/img/76fec7b838576b5b.webp)

最后一步是将这些标签置于配置模式（将磁铁放在标签上 5-10 秒）。设备进入配置模式后，你将看到 "Uploading configuration" 消息。配置成功应用后，消息将变为 "Configuration updated"。

![](/img/d8b8d8832e0eb2d0.webp)

## 标签管理 {#tag-management}

当标签出现在列表中时，你可以点击其 MAC 地址，然后会看到以下选项：

![](/img/3bdcf336e67b4308.webp)

可以 "SAVE" 标签，或通过 "CONFIG ONLY" 按钮立即进入标签的配置菜单。

首先，我们将更详细地说明 "SAVE" 选项。标签的配置菜单将在后面的 "**标签配置**" 部分中说明。

当你点击先前保存的标签时，你将看到以下菜单：

![](/img/4a21fd05985dd1e2.webp)

你首先会注意到的是信号强度指示（标签的 RSSI 信号 - 即标签距离多远）。当所有圆圈都为绿色时，表示信号强度约为 -60 RSSI。当只有 2 个圆圈为绿色时，表示信号强度约为 -70 RSSI。当只有 1 个圆圈为绿色时，表示信号强度为 -80 RSSI。当没有圆圈为绿色时，表示信号强度为 -90 RSSI 或更弱。

在信号强度指示器下方，你有 2 个选项 - 进入标签的配置菜单（"Configure" 按钮）或删除设备（"Delete" 按钮）。

在 "Name/Display Name" 字段中，你可以更改标签名称：

![](/img/3cc42b102dc2b60d.webp)

在 "Sensors" 字段中，你可以查看标签的电池电量或温度。

:::info
TG-BT5-IN 型号没有温度传感器
:::

在 "Sensor Triggers" 字段中，你可以查看标签上报的触发器：

![](/img/5e1aecb3bba33a48.webp)

## 标签配置 {#tag-configuration}

要访问标签的配置菜单，你需要按下 "CONFIG ONLY" 按钮或 "Configure" 按钮，如下所示：

![](/img/d4ba1819e5f99163.webp)

![](/img/a1fcdbe850a16ab4.webp)

紧接着，你需要将磁铁放在簧片开关上 5-10 秒：

![](/img/7ed4d27347a1a08e.webp)

经过短暂的启动时间后，设备应进入配置模式：

![](/img/9a63e10fcf7d8ca4.webp)

应用将在 "Status" 标签页中显示标签的常规信息（如上方截图所示）。

可以在 "Settings" 标签页中更改配置：

![](/img/55935bfe7099a80f.webp)

![](/img/b8dae72f15a18872.webp)

![](/img/23344769cc22ccd2.webp)

### 写保护 {#write-protection}

此菜单允许你使用 6 个字符长的密码锁定标签的设置：

![](/img/15657717c80f4f1f.webp)

设置密码后，无法移除密码保护（只能编辑密码）。

下次你尝试配置标签时，系统会通知你标签处于 "write protected" 状态，你可以选择停留在 "READ-ONLY" 模式（该模式允许你浏览/读取设置，并限制进行配置更改），或通过输入已配置的密码来 "UNLOCK" 设置：

![](/img/6b272eaa0494ef13.webp)

### Beacon 设置 {#beacon-settings}

在广播模式下，标签通过 Bluetooth 广播数据包广播自身信息。信息取决于广播数据包类型（该类型可在设置中更改）。

目前，支持的类型如下：

DeviceName、MikroTik、[Eddystone-TLM](https://play.google.com/store/apps/details?id=com.mikrotik.android.bt5&hl=en_US&gl=US&pli=1)、[Eddystone-UID](https://github.com/google/eddystone/tree/master/eddystone-uid) 和 [iBeacon](https://developer.apple.com/ibeacon/)。

![](/img/8a4ae96eb079e028.webp)

![](/img/30ae17907a6d9e72.webp)

![](/img/9bcaf537ad2f7fcd.webp)

![](/img/52d8f01aa1ffdb6e.webp)

| 属性 | 描述 |
| --- | --- |
| **Advertisement interval** (20ms...24h or disable) | 以毫秒为单位的间隔，经过该间隔后标签将广播一个广播数据包。当你仅配置了 advertisement interval 而未启用任何触发器时 → 广播数据包将根据设置的间隔时间广播（每 **x** 秒）。 |
| **Freefall detect** (on/off) | 当标签检测到自由落体触发器时是否发送广播数据包。当启用自由落体触发器并检测到自由落体状态时 → 将发送数据包。 |
| **Tilt detect** (on/off) | 当标签检测到倾斜触发器时是否发送广播。当启用倾斜触发器且设备发生倾斜时 → 将立即广播广播数据包。 |
| **Impact detec**t (on/off) | 当标签检测到撞击/唤醒触发器时是否发送广播。当启用撞击触发器且设备被推动/移动时 → 将发送广播数据包。 |
| **Encrypt** (on/off) - 仅适用于 MikroTik 格式  | 是否使用 "AES" 密钥加密广播的十六进制有效载荷。启用 "Encrypt" 参数后，十六进制有效载荷数据（加速度、温度、运行时间、触发动作和电池百分比）将使用私钥加密。此密钥只有标签所有者知道（随购买获得）。 |
| **Namespace** - 仅适用于 Eddystone-UID 格式  | 设置一个唯一的 10 字节长信标 Namespace ID。 |
| **Instance** - 仅适用于 Eddystone-UID 格式  | 设置一个唯一的 6 字节长信标 Instance ID。 |
| **UUID** - 仅适用于 iBeacon 格式  | 按以下格式设置通用唯一标识符（UUID）：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| **Major** - 仅适用于 iBeacon 格式  | 设置一个 16 位整数次级标识符，使用十六进制格式或十进制数字（从 0 到 65 535）。 |
| **Minor** - 仅适用于 iBeacon 格式  | 设置一个 16 位整数次级标识符，使用十六进制格式或十进制数字（从 0 到 65 535）。 |

### 广播属性 {#advertisment-properties}

| 属性 | 描述 |
| --- | --- |
| **Connectable advertisements** (on/off) | 启用可连接广播。 |
| **Channel 37** (on/off) | 用于启用在特定信道上的广播。 |
| **Channel 38**(on/off) | 用于启用在特定信道上的广播。 |
| **Channel 39** (on/off) | 用于启用在特定信道上的广播。 |

### 预计电池寿命 {#estimated-battery-life}

本节显示预计电池寿命：

![](/img/05ff3932b3c4fbe8.webp)

预计电池寿命在很大程度上取决于发送（配置为发送）的广播数据包数量。应用会计算预计每天广播多少个数据包、标签将活跃多长时间，以及平均每日功耗的估计值。

### 加速度计设置 {#accelerometer-settings}

加速度计可以完全关闭，并可通过 "Use Accelerometer" 切换按钮重新开启。

本节允许你更改下方截图中显示的参数：

![](/img/fa46dd072ad19a43.webp)

#### 模式与数据速率 {#mode-and-data-rate}

![](/img/7117984b7a85b0cd.webp)

此菜单允许你在 2 种模式之间选择："Low power" 和 "High power"。在 "Low power" 模式下，你将获得较低精度，但功耗也更低。在 "High power" 模式下，你将获得较高精度，但功耗也更高。

"Data Rate" 设置表示 1 秒窗口内的加速度测量次数（测量频率）。每秒发送的数据包越少 → 功耗越低。

#### 满量程 {#full-scale}

![](/img/8a82bf78367c9341.webp)

可在 (2g...16g) 之间变化。它是用于计算唤醒阈值的测量范围。满量程定义加速度计能够测量的加速度范围（范围越大，测得加速度的精度越低）。

#### 带宽滤波器 {#bandwith-filter}

![](/img/5d4bc1fdc9a6be12.webp)

是数字滤波截止值（高通滤波器带宽）。

如果带宽 = "x" Hz，则标签会过滤掉每秒发生次数少于 "x" 次的加速度变化。

例如，如果设备平放在桌面上，即使存在地球重力，加速度也会显示为 0g（而不是 1g）→（因为地球重力是恒定的 - 其变化频率为 0 Hz，即 &lt; "x" Hz）它会被过滤掉。

#### 唤醒阈值与持续时间 {#wakeup-threshold-and-duration}

![](/img/1f8377968b5b1f1d.webp)

"Wakeup Threshold" 定义唤醒区域/加速度范围。"Wakeup Duration" 定义加速度超过所配置唤醒阈值的时间。当任一轴（X、Y 或 Z）上的加速度在配置的唤醒持续时间内超过阈值时，将生成唤醒事件（触发唤醒条件）。要更好地理解“任一轴（X、Y 或 Z）上的加速度”的含义，请想象一个三维笛卡尔坐标系，并在原点（公共点）放置标签的加速度计或标签本身：

![](/img/13cf2251bb92b747.png) ![](/img/03b6ed29411f1e34.png)

例如，唤醒阈值设置为 1.0g（表示 -1.0g 到 +1.0g 之间的任何加速度都属于配置的阈值/加速度范围），唤醒持续时间设置为 0.12s。因此，一旦设备被推动/抛向任一轴方向（设备开始向任意方向移动），且加速度超过配置阈值（acceleration> +1.0g 或 acceleration&lt; -1.0g）的时间长于 0.12s → 就会触发唤醒条件。

#### 自由落体阈值与持续时间 {#free-fall-threshold-and-duration}

![](/img/1b4f6496b95e6782.webp)

"Free Fall Threshold" 定义自由落体区域/加速度范围。"Free Fall Duration" 定义加速度处于所配置自由落体阈值内的时间。当所有 3 个轴（X、Y 和 Z）上的加速度在配置的自由落体持续时间内都处于自由落体区域/阈值内时，将生成自由落体事件（触发自由落体条件）。要更好地理解“所有轴（X、Y 和 Z）上的加速度”的含义，请查看上方“唤醒阈值与持续时间”部分中的设备照片。

例如，自由落体阈值设置为 156.25g（表示 -156.25g 到 +156.25g 之间的任何加速度都属于配置的阈值/加速度范围），自由落体持续时间设置为 0.2s。因此，一旦设备处于自由落体状态，且所有轴上的加速度在配置阈值内（-156.25g&lt;acceleration&lt;+156.25g）的时间长于 0.2s → 就会触发自由落体条件。

#### 角度阈值 {#angle-threshold}

![](/img/24b22a76d2d2e7e8.webp)

可在 50°...80° 之间变化。它是倾斜功能的阈值。例如，当阈值设置为 60° 且设备倾斜到该角度时 - 将触发倾斜动作并发送广播数据包。

#### 低噪声滤波器 {#low-noise-filter}

![](/img/a00ac2855c2db0e7.webp)

用于启用或禁用低噪声滤波器的选项。低噪声滤波器用于降低测量中的噪声密度。启用此功能会略微增加功耗。

#### 温度偏移 {#temperature-offset}

:::info
TG-BT5-IN 型号没有温度传感器！
:::

![](/img/1cc4ecf08cb17427.webp)

可在 -10°C...+10°C 之间变化。以百分之一摄氏度为单位，应用于原始温度测量的偏移量。

#### 发射功率 {#tx-power}

![](/img/f41c183a7fd2b7d4.webp)

以分贝毫瓦为单位的发射功率级别。可在 -28dBm...6dBm 之间变化。Tx Power 仅用于增大/减小标签的发射功率。

### 数据日志 {#data-logs}

:::info
本节仅适用于 TG-BT5-OUT 型号。
:::

本节允许你配置/查看日志（这些日志只能通过应用访问）：

![](/img/6ce97a2795400a43.webp)

#### 配置日志记录 {#configure-logging}

在 "Configure logging" 菜单中，你可以设置日志记录设置：

![](/img/fa4784b5151a54cd.webp)

你可以设置 "Periodic logging interval (s)"（也可以禁用它）。启用后，数据日志将每隔 "x" 秒自动保存：

![](/img/5b7488c3eb97c510.webp)

另一个选项是启用 "Log Triggers"（周期性日志记录和触发器日志记录可以一起使用）。使用日志触发器时 - 每当检测到倾斜、自由落体和/或撞击动作时，都会保存日志。

例如，当启用倾斜触发器且标签检测到该触发器时 - 将记录消息。

你可以在 "Field config" 部分设置要记录哪些参数：

![](/img/254acf4fa68bf455.webp)

![](/img/366c81f7cd5d818a.webp)

![](/img/7452cf1b74ee0cd9.webp)

你可以记录 3 个参数：1) 电池电量；2) 温度；3) 加速度。

如果你对某个参数不感兴趣，可以禁用该参数，也可以为它们设置阈值。

如果你只希望在电池电量低于 40% 时记录电池电量，可以设置从 minimum=0% 到 maximum=40% 的阈值，这样一来，只有当电池电量（电池电量百分比）处于所配置范围内时，才会显示在日志中。同样的原则适用于其他 2 个参数。

#### 数据日志 {#data-logs-1}

已记录的消息将显示在 "Data Logs" 标签页中：

![](/img/236d8ff71c774a82.webp)

你可以通过 "Export as .csv" 按钮将日志导出为 .csv 文件：

![](/img/0fbcd98eaa207fb4.webp)

### 系统 {#system}

在 "System" 标签页中，你可以同步时间、查看系统日志、将标签置于出厂睡眠模式，并升级固件：

![](/img/868402679294ec95.webp)

#### Unix 时间 {#unix-time}

使用此设置，你可以为标签同步当前时间和日期：

![](/img/049ff4f3464d32b7.webp)

#### 日志 {#logs}

可查看系统日志的菜单：

![](/img/8c9c6e6aba6f4ac5.webp)

#### 出厂睡眠 {#factory-sleep}

此选项可以为标签启动出厂睡眠模式：

![](/img/09bb3ed977d0102d.webp)

#### 升级固件 {#upgrade-firmware}

此菜单允许你升级标签的固件版本：

![](/img/df88c003a9455902.webp)

##### 自动升级 {#automatic-upgrade}

点击 "Download and install" 并等待设备重启。

##### 手动升级 {#manual-upgrade}

要手动下载标签的固件文件，请访问 https://download.mikrotik.com/firmware/bt-tag/latest。你将能够下载 "latest" 文件，该文件可在记事本或任何其他文本编辑器中打开。文件内容将指示最新的可用 TG-BT5-XX 版本：

```
2.3.1 1638358509
1326c554c18340a41e79fd88abbea193dc53b99931eddecd018e33cff577f6d3 bt-tag_HT_app_2.3.1-0rr.gbl
9dc21eb980e8bd36732ec4db8e4b03a8177885fccdbbd87122f7d9bf76410b8b bt-tag_HT_apploader_3.2.3-0rr.gbl
9e4f30d9006f24063ac96d0fb1181d135929d86d0e243d3b3985cc5e43d6b448 bt-tag_IN_app_2.3.1-0rr.gbl
e03fa2987b874463e9a5c686303f4d75fef0c0f8d89dde14f8c4b04be4838a93 bt-tag_IN_apploader_3.2.3-0rr.gbl
54e959dd9cc1da3a5408b5dc7c797c52ae1a1685122e14d966cbe433ec1d1b3c bt-tag_OUT_app_2.3.1-0rr.gbl
e0bc2e8a1a9de6a1974c201a48cfea2276465414e07efc07816400abca91aa14 bt-tag_OUT_apploader_3.2.3-0rr.gbl
5257a1b06cb8d57d06ae10ef2c87abf0df0a3ab8a9ac7f9229a9a421b8a0c0fc bt-tag_HT_app_2.3.1-000.gbl
caf3e333721852077945c8a766db32ee5e478f1e7844dcb3e0e3d700dbab009f bt-tag_HT_apploader_3.2.3-000.gbl
0f6603d97df5fc4b3f260b410628b3c62fb2562f26e85e44b6cdfdf1b58d04f8 bt-tag_IN_app_2.3.1-000.gbl
caf3e333721852077945c8a766db32ee5e478f1e7844dcb3e0e3d700dbab009f bt-tag_IN_apploader_3.2.3-000.gbl
3235db7bb9a9cca0d5e59ae774c3cd004be4e58b44c1ae40e6e3bb84feb077a6 bt-tag_OUT_app_2.3.1-000.gbl
caf3e333721852077945c8a766db32ee5e478f1e7844dcb3e0e3d700dbab009f bt-tag_OUT_apploader_3.2.3-000.gbl
```

使用应用仔细检查标签当前的固件版本：

![](/img/14a184e0b741ea78.webp)

例如，已知标签是 **TG-BT5-IN** 型号，且当前版本是 **1.6.1-000**，我们可以推断最新版本是 "bt-tag_IN_app_2.3.1-000.gbl"。

请注意，对于大多数标签，固件版本将是 1.6.1-**0rr**（而不是 1.6.1-**000**）。你需要改用 x.x.x-**0rr** 文件。

要下载实际的固件文件，请将链接中的 "latest" 部分更改为 "bt-tag_IN_app_2.3.1-000.gbl"。

因此，如果你的当前版本例如是 "1.6.1-000"（TG-BT5-IN 标签），则可以使用以下链接下载固件：

https://download.mikrotik.com/firmware/bt-tag/bt-tag_IN_app_2.3.1-000.gbl

如果你的当前版本例如是 "1.6.1-0rr"（TG-BT5-OUT 标签），则可以使用以下链接下载固件：

https://download.mikrotik.com/firmware/bt-tag/bt-tag_OUT_app_2.3.1-0rr.gbl

##### 升级设置 {#upgrade-settings}

:::warning
**如果你在标签更新时遇到问题，标签一直停留在 OTA/update 模式 → 请尝试启用 "Reliable write"！**

当标签在 OTA/upgrade 模式中“卡住”时，可能会发生两种情况：
a) Beacon Manager 标签列表仍会在列表中显示该标签，但不会有标签可“配置”的指示。你仍然可以在列表中点击该标签（即使没有显示“齿轮”图标），并在不激活磁开关的情况下浏览其设置；

b) 标签可能会从可管理标签列表中消失。在这种情况下，请尝试使用二维码读取器功能手动添加标签，并批准 "configuration"。
:::

要进入额外的升级设置菜单，请点击 "Upgrade settings" 按钮：

![](/img/5932d0f0e68843b5.webp)

这将允许你更改 "Reliable write" 配置：

![](/img/e7f10488893d6926.webp)

启用后，该复选框可让你使 Bluetooth 升级过程“更慢”但更“可靠”（此时手机和标签之间会进行额外的交换和验证步骤）。

### 导入/导出 {#importexport}

在界面右上角，你可以选择导入/导出当前设置：

![](/img/06e3cc23cc4cd1b4.webp)

如果你按下导出按钮，应用将打开手机的文件菜单，你可以在其中命名配置文件并保存。

如果你按下导入按钮，应用将打开手机的文件菜单，你可以在其中选择配置文件并应用它。
