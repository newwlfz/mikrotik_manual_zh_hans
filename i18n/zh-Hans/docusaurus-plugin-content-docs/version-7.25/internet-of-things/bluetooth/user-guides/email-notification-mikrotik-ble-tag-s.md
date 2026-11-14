---
sidebar_key: "internet-of-things/bluetooth/user-guides/email-notification-mikrotik-ble-tag-s"
sidebar_position: 2
title: "MikroTik BLE 标签加速度计触发时的电子邮件通知"
sidebar_label: "MikroTik BLE 标签加速度计触发时的电子邮件通知"
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/bluetooth/user-guides/email-notification-mikrotik-ble-tag-s
captured_at: '2026-11-04T11:18:07+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 简介 {#introduction}

在本指南中，我们将展示一个快速的分步流程，说明如何设置 KNOT，使其在检测到由 [TG-BT5-IN](https://mikrotik.com/product/tg_bt5_in) 或 [TG-BT5-OUT](https://mikrotik.com/product/tg_bt5_out) 标签上报的“已触发”条件时发送电子邮件通知。

两个标签都内置加速度计，能够检测自由落体、唤醒/移动和倾斜状态。当标签设置为广播 [MikroTik 格式](../mikrotik-beacon-manager/mikrotik-tag-advertisement-formats.md)载荷，并且启用了加速度计触发器（使用 MikroTik Beacon Manager 应用程序）→ 每当将要检测到触发器时，标签就会立即广播一个广播载荷/报告。

对于 [iOS](../mikrotik-beacon-manager/mikrotik-beacon-manager-for-ios-devices.md)，触发器设置如下所示（处于禁用状态/默认设置）：

![](/img/bc61dd8531591e00.webp)

对于 [Android](../mikrotik-beacon-manager/mikrotik-beacon-manager-android-devices.md)，触发器设置如下所示（处于禁用状态/默认设置）：

![](/img/afeda0f2e01597f6.webp)

要启用触发器检测，只需勾选相应的“复选框”。

标签广播 Bluetooth 载荷后 → 载荷的第 21 个八位组将指示检测到的确切触发器。你可以在 **IoT>Bluetooth>Advertisng reports** 选项卡下查看这些载荷：

![](/img/5e0d840a80057596.webp)

如上图所示，第 21 个八位组是“04”，这表示该载荷是在标签检测到自由落体条件时发送的（这些载荷是在我们“不小心”掉落或扔出标签时广播的）。

完成所有配置后，将发生以下情况：

- KNOT 将按计划运行脚本。
- 脚本将“读取/扫描”**IoT>Bluetooth>Advertising reports** 选项卡中显示的载荷。
- 如果存储/捕获的载荷的第 21 个八位组值等于任何“已触发”值 → 将发送电子邮件通知。

换句话说，当 KNOT 扫描这些载荷并找到一个第 21 个八位组指示触发器已激活的载荷时 → 你将收到一封检测到触发器的电子邮件通知。

### TG-BT5 标签配置 {#tg-bt5-tag-configuration}

在这个具体示例中，我们需要将标签设置为在 **MikroTik 格式**下工作。在 MikroTik 格式中，每个载荷的第 21 个八位组将指示其被触发的原因。

你可以按照 [iOS](../mikrotik-beacon-manager/mikrotik-beacon-manager-for-ios-devices.md) 和/或 [Android](../mikrotik-beacon-manager/mikrotik-beacon-manager-android-devices.md) 指南（**"Advertisement"/Beacon settings** 部分）找到有关如何启用触发器的说明。

为了更轻松地“激活”触发器，我们还可以按照 iOS 和/或 Android 指南（**Free Fall Threshold and Duration** 部分）更改触发器设置。为了测试目的，并且基本上只是让检测更快地被“触发”，我们可以将“**Free Fall Duration**”参数改为“0”秒（这将确保所有轴上处于阈值范围内的任何加速度都会被立即检测为“自由落体”事件）。

### RouterOS 配置 {#routeros-configuration}

:::info
**iot** 软件包是必需的。你可以从我们的下载页面获取它——在 "Extra packages" 下。
:::
配置可以通过 4 个步骤完成：

- 启用扫描器（并且最好确认当检测到触发器时标签正在广播载荷）；
- 设置电子邮件服务器；
- 导入脚本（并根据需求修改少量脚本行）；
- 设置调度器。

#### Bluetooth 扫描器 {#bluetooth-scanner}

转到 [IoT>Bluetooth>Scanners](../index.md) 选项卡，并确保它已启用：

![](/img/0f166b184bb52a00.webp)

转到 **Advertising reports** 选项卡，并使用 MAC 地址过滤选项过滤列表（你可以在标签本身的标签纸上找到 MikroTik 标签的 MAC 地址）。

尝试“触发”已配置的检测，并通过检查第 21 个八位组的值来确认。

在我们的示例中，我们为标签配置了“自由落体”检测，并且**将其掉落**。我们收到了来自标签的报告，指示“下落”状态（第 21 个八位组 = **04**）：

![](/img/d60ecc0f246ac416.webp)

我们已经确认，标签正在正确上报触发器。

#### 电子邮件 {#email}

转到 [电子邮件](../../../system-information-and-utilities/e-mail.md) 部分，并设置你选择的电子邮件服务器。

本指南中我们将使用所示的 **GMAIL** 示例。

![](/img/b0b11d0862735ec3.webp)

尝试发送一封测试电子邮件，以确保设置正确。

#### 脚本 {#scripts}

##### 选项 (a) {#option-a}

转到 [System>Scripts](../../../developer-guides/scripting/index.md) 菜单，并在其中添加一个新脚本。

你可以复制下面的脚本。将下面的脚本复制到“记事本”中，然后再次将其复制到脚本的“**Source:**”字段中。

```ros
## 在 "" 内输入标签的 MAC 地址
:local addressRegex "2C:C8:1B:E2:15:29"

#在 "" 内输入电子邮件主题
:local emailsubject "RouterOS report!"

#在 "" 内输入电子邮件地址
:local emailaddress "YOUR_EMAIL@gmail.com"

#Script:
################################## Bluetooth ##################################
:local flagStr do={
    :local str ""

    :if ($1 & 0x01) do={ :set $str " switch" }
    :if ($1 & 0x02) do={ :set $str "$str tilt" }
    :if ($1 & 0x04) do={ :set $str "$str free_fall" }
    :if ($1 & 0x08) do={ :set $str "$str impact_x" }
    :if ($1 & 0x10) do={ :set $str "$str impact_y" }
    :if ($1 & 0x20) do={ :set $str "$str impact_z" }

    :if ([:len $str] = 0) do={ :return "" }

    :return [:pick $str 1 [:len $str]]
}

:local triggernameF "free_fall"
:local triggernameT "tilt"
:local triggernameX "impact_x"
:local triggernameY "impact_y"
:local triggernameZ "impact_z"
:local triggernameS "switch"

## 查找新的蓝牙广播
:global btOldestAdvertisementTimestamp
:if ([:typeof $btOldestAdvertisementTimestamp] = "nothing") do={
    # First time this script has been run since booting, need to initialize
    # persistent variables
    :set $btOldestAdvertisementTimestamp 0
}
:local advertisements [/iot bluetooth scanners advertisements print detail \
    as-value where \
        epoch > $btOldestAdvertisementTimestamp and \
        address ~ $addressRegex
]
:local advCount 0
:local lastAdvTimestamp 0
:local triggerlist ""

:local triggerF
:local triggerT
:local triggerX
:local triggerY
:local triggerZ
:local triggerS

:local messageF ""
:local messageT ""
:local messageX ""
:local messageY ""
:local messageZ ""
:local messageS ""

:local 21st ""

:foreach adv in=$advertisements do={
    :local address ($adv->"address")
    :local rssi ($adv->"rssi")
    :local epoch ($adv->"epoch")
    :local rtime ($adv->"time")
    :local ad ($adv->"data")
    :local flags [:tonum "0x$[:pick $ad 40 42]"]
    :local obj "$[$flagStr $flags]"

    :set $advCount ($advCount + 1)
    :set $lastAdvTimestamp $epoch
    :set $triggerlist "$triggerlist$obj"

:set triggerF [:pick $triggerlist ([find $triggerlist "free_fall"]-0) ([find $triggerlist "free_fall"]+9)]
:if ($triggerF=$triggernameF) do={:set messageF "$triggernameF";:set 21st "not00";}
:set triggerT [:pick $triggerlist ([find $triggerlist "tilt"]-0) ([find $triggerlist "tilt"]+4)]
:if ($triggerT=$triggernameT) do={:set messageT "$triggernameT";:set 21st "not00";}
:set triggerX [:pick $triggerlist ([find $triggerlist "impact_x"]-0) ([find $triggerlist "impact_x"]+8)]
:if ($triggerX=$triggernameX) do={:set messageX "$triggernameX";:set 21st "not00";}
:set triggerY [:pick $triggerlist ([find $triggerlist "impact_y"]-0) ([find $triggerlist "impact_y"]+8)]
:if ($triggerY=$triggernameY) do={:set messageY "$triggernameY";:set 21st "not00";}
:set triggerZ [:pick $triggerlist ([find $triggerlist "impact_z"]-0) ([find $triggerlist "impact_z"]+8)]
:if ($triggerZ=$triggernameZ) do={:set messageZ "$triggernameZ";:set 21st "not00";}
:set triggerS [:pick $triggerlist ([find $triggerlist "switch"]-0) ([find $triggerlist "switch"]+6)]
:if ($triggerS=$triggernameS) do={:set messageS "$triggernameS";:set 21st "not00";}

}
:if ($advCount > 0) do={
    :set $btOldestAdvertisementTimestamp $lastAdvTimestamp
}

#消息结构：
:local message "$messageF
$messageT
$messageX
$messageY
$messageZ
$messageS
--trigger(s) reported by the tag!"

:if ($21st="not00") do={/tool e-mail send to=$emailaddress subject="$emailsubject" body="$message"} else={:put "21st octet does not have triggers detected!"}
```

以下 3 行需要留意：

```
:local addressRegex "2C:C8:1B:E2:15:29"
```

这一行，我们在此输入要监视的标签的 MAC 地址；

```
:local emailsubject "RouterOS report!"
```

这一行，你可以在此修改电子邮件的主题；

```
:local emailaddress "YOUR_EMAIL@gmail.com"
```

电子邮件地址行，你需要在此输入电子邮件地址。即你希望将报告发送到哪里。

你还可以使用以下行更改电子邮件消息的结构：

```ros
#消息结构：
:local message "$messageF
$messageT
$messageX
$messageY
$messageZ
$messageS
--trigger(s) reported by the tag!"
```

你可以随意命名脚本，例如 **triggernotification**。点击 **Apply** 和 **OK**。

:::info
此外，在本示例中，我们专门展示了一个电子邮件通知场景。**但是！** 如果您想使用其他方法发送通知，只需修改下面这一行：

```
:if ($21st="not00") do={/tool e-mail send to=$emailaddress subject="$emailsubject" body="$message"}
```

你可以将该行中的 `do={/tool e-mail...` 部分改为，例如 `do={/tool fetch...` 或 `do={/iot mqtt publish...`。这样，你就可以改为发送 HTTP POST 或 MQTT 发布消息。

如果你希望在检测到触发器时收到手机通知，也可以使用 IFTTT 服务（向 IFTTT webhook 发送 HTTP post），正如我们在[此处](./ifttt-app-notifications-ble-tag.md)的另一篇指南中所述。
:::
你可以通过命令“**/system script run triggernotification**”手动运行脚本，或点击 **Script List** 部分下的“**Run Script**”按钮。

手动启动脚本后，你应确认已收到电子邮件通知。

当脚本 **(a)** 启动时，RouterOS 将检查每个已接收/存储的 Bluetooth 载荷，如果在载荷列表中找到任何触发器 → 就会构造并发送一封电子邮件消息。这封电子邮件消息只会指示列表中检测到了哪些触发器，不包含额外信息。

##### 选项 (b) {#option-b}

```ros
## 在 "" 内输入标签的 MAC 地址
:local addressRegex "2C:C8:1B:E2:15:29"

## 用于根据蓝牙广播数据过滤蓝牙广播的 POSIX 正则表达式。与
## 使用 'addressRegex' 时的用法相同。
:local advertisingDataRegex ""

## 信号强度过滤器。例如，-40 将只包括蓝牙广播
## 其信号强度强于 -40dBm。
## 要禁用此过滤器，请将其设置为 ""
:local rssiThreshold ""

#在 "" 内输入电子邮件主题
:local emailsubject "RouterOS report!"

#在 "" 内输入电子邮件地址
:local emailaddress "YOUR_GMAIL@gmail.com"

#Script:
################################## Bluetooth ##################################
:local flagStr do={
    :local str ""

    :if ($1 & 0x01) do={ :set $str " switch" }
    :if ($1 & 0x02) do={ :set $str "$str tilt" }
    :if ($1 & 0x04) do={ :set $str "$str free_fall" }
    :if ($1 & 0x08) do={ :set $str "$str impact_x" }
    :if ($1 & 0x10) do={ :set $str "$str impact_y" }
    :if ($1 & 0x20) do={ :set $str "$str impact_z" }

    :if ([:len $str] = 0) do={ :return "" }

    :return [:pick $str 1 [:len $str]]
}

:local triggernameF "free_fall"
:local triggernameT "tilt"
:local triggernameX "impact_x"
:local triggernameY "impact_y"
:local triggernameZ "impact_z"
:local triggernameS "switch"

## 查找新的蓝牙广播
:global btOldestAdvertisementTimestamp
:if ([:typeof $btOldestAdvertisementTimestamp] = "nothing") do={
    # First time this script has been run since booting, need to initialize
    # persistent variables
    :set $btOldestAdvertisementTimestamp 0
}
:local advertisements [/iot bluetooth scanners advertisements print detail \
    as-value where \
        epoch > $btOldestAdvertisementTimestamp and \
        address ~ $addressRegex and \
        data ~ $advertisingDataRegex and \
        rssi > $rssiThreshold
]
:local advCount 0
:local lastAdvTimestamp 0
:local triggerlist ""

:local triggerF
:local triggerT
:local triggerX
:local triggerY
:local triggerZ
:local triggerS

:local messageF ""
:local messageT ""
:local messageX ""
:local messageY ""
:local messageZ ""
:local messageS ""

:local 21st ""

:foreach adv in=$advertisements do={
    :local address ($adv->"address")
    :local rssi ($adv->"rssi")
    :local epoch ($adv->"epoch")
    :local rtime ($adv->"time")
    :local ad ($adv->"data")
    :local flags [:tonum "0x$[:pick $ad 40 42]"]
    :local fflags "$[$flagStr $flags]"
    :if ($fflags="") do={:set $fflags "none - periodically broadcasted payload"}

    :local obj "# $advCount:
                             time: $rtime
                             trigger: $fflags

"
    :set $advCount ($advCount + 1)
    :set $lastAdvTimestamp $epoch
    :set $triggerlist "$triggerlist$obj"

:set triggerF [:pick $triggerlist ([find $triggerlist "free_fall"]-0) ([find $triggerlist "free_fall"]+9)]
:if ($triggerF=$triggernameF) do={:set messageF "$triggernameF";:set 21st "not00";}
:set triggerT [:pick $triggerlist ([find $triggerlist "tilt"]-0) ([find $triggerlist "tilt"]+4)]
:if ($triggerT=$triggernameT) do={:set messageT "$triggernameT";:set 21st "not00";}
:set triggerX [:pick $triggerlist ([find $triggerlist "impact_x"]-0) ([find $triggerlist "impact_x"]+8)]
:if ($triggerX=$triggernameX) do={:set messageX "$triggernameX";:set 21st "not00";}
:set triggerY [:pick $triggerlist ([find $triggerlist "impact_y"]-0) ([find $triggerlist "impact_y"]+8)]
:if ($triggerY=$triggernameY) do={:set messageY "$triggernameY";:set 21st "not00";}
:set triggerZ [:pick $triggerlist ([find $triggerlist "impact_z"]-0) ([find $triggerlist "impact_z"]+8)]
:if ($triggerZ=$triggernameZ) do={:set messageZ "$triggernameZ";:set 21st "not00";}
:set triggerS [:pick $triggerlist ([find $triggerlist "switch"]-0) ([find $triggerlist "switch"]+6)]
:if ($triggerS=$triggernameS) do={:set messageS "$triggernameS";:set 21st "not00";}

}
:if ($advCount > 0) do={
    :set $btOldestAdvertisementTimestamp $lastAdvTimestamp
}

:if ($21st="not00") do={/tool e-mail send to=$emailaddress subject="$emailsubject" body="$triggerlist"} else={:put "21st octet does not have triggers detected!"}
```

当脚本 **(b)** 启动时，RouterOS 将检查每个已接收/存储的 Bluetooth 载荷，如果在载荷列表中找到任何触发器 → 就会构造并发送一封电子邮件消息。与脚本 **(a)** 相比，这封电子邮件消息包含更详细一些的信息。在这种情况下，消息将指示每个载荷的接收时间。

#### 调度器 {#scheduler}

要自动化此过程，请在 **System>Scheduler** 选项卡下添加一个新调度器：

![](/img/46ba140217f063f1.webp)

在“**On Event:**”字段下输入“**/system script run triggernotification**”，并设置你希望运行脚本以检查/扫描广播报告的 **interval**（例如，10 秒）。

点击 **Apply** 和 **OK**。

#### 结果验证 {#result-verification}

1) 确认标签广播广告报告，并且标签的触发器被检测到：

![](/img/d60ecc0f246ac416.webp)

1) 确认你的电子邮件服务器设置正确，并且你能够从 KNOT（RouterOS）发送电子邮件。

2) 在你手动运行脚本或为脚本应用调度器后，电子邮件通知应该会成功发送，如下所示：

     脚本 **(a)**：

![](/img/50b59795a8f27586.webp)

     脚本 **(b)**：

![](/img/9e3705cb3b496f35.webp)
