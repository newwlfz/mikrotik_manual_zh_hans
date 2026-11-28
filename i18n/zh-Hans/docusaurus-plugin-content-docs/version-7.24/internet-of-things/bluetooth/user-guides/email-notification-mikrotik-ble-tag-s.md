---
title: "MikroTik BLE tag 加速度计触发的电子邮件通知"
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/bluetooth/user-guides/email-notification-mikrotik-ble-tag-s
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 简介 {#introduction}

本指南介绍如何快速配置 KNOT，使其在检测到 [TG-BT5-IN](https://mikrotik.com/product/tg_bt5_in) 或 [TG-BT5-OUT](https://mikrotik.com/product/tg_bt5_out) 标签报告的“触发”状态时发送电子邮件通知。

两款标签均内置加速度计，可检测自由落体、唤醒 / 移动和倾斜状态。当标签设置为广播 [MikroTik format](/docs/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-tag-advertisement-formats) 负载，并且已启用加速度计触发（使用 MikroTik Beacon Manager app）时，标签将在检测到触发时立即广播广告负载 / 报告。

对于 [iOS](/docs/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-beacon-manager-for-ios-devices)，触发设置如下所示（处于禁用状态 / 默认设置）：

![](/img/bc61dd8531591e00.webp)

对于 [Android](/docs/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-beacon-manager-android-devices)，触发设置如下所示（处于禁用状态 / 默认设置）：

![](/img/afeda0f2e01597f6.webp)

要激活触发检测，只需启用相应的“复选框”。

标签广播 Bluetooth 负载后，负载的第 21 个八位字节将指示检测到的具体触发。你可以在 **IoT>Bluetooth>Advertisng reports** 选项卡下查看负载：

![](/img/5e0d840a80057596.webp)

如上方截图所示，第 21 个八位字节为“04”，表示标签检测到自由落体状态时发送了该负载（这些负载是在我们“意外”掉落或扔出标签时广播的）。

完成所有配置后，将发生以下情况：

- KNOT 将按计划运行脚本。
- 脚本将“读取/扫描”显示在 **IoT>Bluetooth>Advertising reports** 选项卡中的有效载荷。
- 如果存储/捕获的有效载荷的第 21 个八位字节值等于任意“已触发”值 → 将发送电子邮件通知。

换句话说，当 KNOT 扫描有效载荷并发现第 21 个八位字节指示触发器已激活时 → 你将收到一封电子邮件通知，指示已检测到触发器。

### TG-BT5 标签配置 {#tg-bt5-tag-configuration}

在此特定示例中，需要将标签设置为以 **MikroTik 格式**工作。在 MikroTik 格式中，每个有效载荷的第 21 个八位字节将指示其触发原因。

可以按照 [iOS](/docs/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-beacon-manager-for-ios-devices) 和/或 [Android](/docs/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-beacon-manager-android-devices) 指南中的说明启用触发器（**“Advertisement”/Beacon settings** 部分）。

为了更轻松地“激活”触发器，还可以按照 iOS 和/或 Android 指南修改触发器设置（**Free Fall Threshold and Duration** 部分）。为了进行测试，并基本上更快地“触发”检测，可以将“**Free Fall Duration**”参数更改为“0”秒（这将确保任何轴上处于阈值范围内的加速度都会立即被检测为“freefalling”事件）。

### RouterOS 配置 {#routeros-configuration}

:::info
需要 **iot** 软件包。你可以从我们的下载页面获取 - 位于“Extra packages”下。
:::
配置可通过 4 个步骤完成：

- 启用扫描器（并且最好确认在检测到触发器时标签正在广播有效载荷）；
- 设置邮件服务器；
- 导入脚本（并根据需求修改几行脚本）；
- 设置计划任务。

#### 蓝牙扫描器 {#bluetooth-scanner}

进入 [IoT>Bluetooth>Scanners](/docs/internet-of-things/bluetooth) 选项卡，并确保其已启用：

![](/img/0f166b184bb52a00.webp)

进入 **Advertising reports** 选项卡，并使用 MAC 地址过滤选项筛选列表（MikroTik 标签的 MAC 地址可在标签本身的标签纸上找到）。

尝试“触发”已配置的检测，并通过检查第 21 个八位字节的值来确认。

在我们的示例中，我们为标签配置了“freefalling”检测，并将其**掉落**。我们收到了来自标签的报告，指示“falling”状态（第 21 个八位字节 = **04**）：

![](/img/d60ecc0f246ac416.webp)

已确认该标签会正确报告触发器。

#### Email

导航到 [Tools>Email](/docs/system-information-and-utilities/e-mail) 部分，并设置你选择的邮件服务器。

本指南将使用所示的 **GMAIL** 示例。

![](/img/b0b11d0862735ec3.webp)

尝试发送测试邮件，以确保配置正确。

#### Scripts

##### 选项（a） {#option-a}

导航到 [System>Scripts](/docs/developer-guides/scripting) 菜单，并在其中添加新脚本。

你可以复制下面的脚本。将下面的脚本复制到“notepad”中，然后再次复制到脚本“**Source:**”字段中。

```ros
## Input MAC address of the tag within ""
:local addressRegex "2C:C8:1B:E2:15:29"

#enter the subject for the email within the ""
:local emailsubject "RouterOS report!"

#enter the email address wthin the ""
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

## Find fresh Bluetooth advertisements
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

#Message structure:
:local message "$messageF
$messageT
$messageX
$messageY
$messageZ
$messageS
--trigger(s) reported by the tag!"

:if ($21st="not00") do={/tool e-mail send to=$emailaddress subject="$emailsubject" body="$message"} else={:put "21st octet does not have triggers detected!"}
```

需要注意以下 3 行：

```
:local addressRegex "2C:C8:1B:E2:15:29"
```

用于输入要监控的标签的 MAC 地址的行；

```
:local emailsubject "RouterOS report!"
```

用于更改电子邮件主题的行；

```
:local emailaddress "YOUR_EMAIL@gmail.com"
```

电子邮件地址行，需要在其中输入接收报告的电子邮件地址。

还可以使用以下行更改电子邮件内容的结构：

```ros
#Message structure:
:local message "$messageF
$messageT
$messageX
$messageY
$messageZ
$messageS
--trigger(s) reported by the tag!"
```

可随意命名脚本，例如 **triggernotification**。单击 **Apply** 和 **OK**。

:::info
此外在此示例中，专门展示电子邮件通知场景。**但！**如果要使用其他方法发送通知，只需修改以下行：

```
:if ($21st="not00") do={/tool e-mail send to=$emailaddress subject="$emailsubject" body="$message"}
```

例如，可以将该行中的 `do={/tool e-mail...` 部分改为 `do={/tool fetch...` 或 `do={/iot mqtt publish...`。这样，就可以改为发送 HTTP post 或 MQTT publish 消息。

如果希望在检测到触发器时收到手机通知，还可以使用 IFTTT 服务（HTTP post 到 IFTTT webhook），详情请参阅另一篇指南：[此处](/docs/internet-of-things/bluetooth/user-guides/ifttt-app-notifications-ble-tag)。
:::
可以通过命令“**/system script run triggernotification**”手动运行脚本，也可以点击 **Script List** 部分下的“**Run Script**”按钮。

手动启动脚本后，应确认已收到电子邮件通知。

当脚本 **(a)** 启动时，RouterOS 将检查每个已接收或已存储的 Bluetooth payload，如果在 payload 的列表中发现任何 trigger，则会构建并发送一封电子邮件。该电子邮件仅指出在列表中检测到哪些 trigger，不包含其他信息。

##### 选项 (b) {#option-b}

```ros
## Input MAC address of the tag within ""
:local addressRegex "2C:C8:1B:E2:15:29"

## POSIX regex for filtering Bluetooth advertisements based on their data. Same
## usage as with 'addressRegex'.
:local advertisingDataRegex ""

## Signal strength filter. E.g. -40 would only include Bluetooth advertisements
## whose signal strength is stronger than -40dBm.
## To disable this filter, set it to ""
:local rssiThreshold ""

#enter the subject for the email within the ""
:local emailsubject "RouterOS report!"

#enter the email address wthin the ""
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

## Find fresh Bluetooth advertisements
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

当脚本 **(b)** 启动时，RouterOS 将检查每个已接收或已存储的 Bluetooth payload，如果在 payload 的列表中发现任何 trigger，则会构建并发送一封电子邮件。与脚本 **(a)** 相比，该电子邮件包含更详细的信息。在这种情况下，邮件将指出每个 payload 的接收时间。

#### 计划任务 {#scheduler}

要自动执行该过程，请在 **System>Scheduler** 选项卡下添加新的计划任务：

![](/img/46ba140217f063f1.webp)

在“**On Event:**”字段中输入“**/system script run triggernotification**”，并设置运行脚本以检查或扫描 advertising report 的 **interval**（例如设置为 10 秒）。

单击 **Apply** 和 **OK**。

#### 结果验证 {#result-verification}

1) 确认标签广播广告报告，并检测到标签的触发器：

![](/img/d60ecc0f246ac416.webp)

1) 确认电子邮件服务器设置正确，并且可以从 KNOT（RouterOS）发送电子邮件。

2) 手动运行脚本或对脚本应用计划任务后，应发送电子邮件通知，如下所示：

     Script **(a)**:

![](/img/50b59795a8f27586.webp)

     Script **(b)**:

![](/img/9e3705cb3b496f35.webp)
