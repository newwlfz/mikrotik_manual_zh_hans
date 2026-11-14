---
sidebar_key: "internet-of-things/bluetooth/user-guides/ifttt-app-notifications-ble-tag"
sidebar_position: 4
title: "当 BLE 标签出现在 KNOT 范围内时通过 IFTTT 应用发送通知"
sidebar_label: "当 BLE 标签出现在 KNOT 范围内时通过 IFTTT 应用发送通知"
source: https://manual.mikrotik.com/docs/internet-of-things/bluetooth/user-guides/ifttt-app-notifications-ble-tag
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 简介 {#introduction}

我们的 Bluetooth 标签和 KNOT 可用于 IoT 资产跟踪的不同场景。

本指南将展示的场景是：一旦标签进入 KNOT 的 Bluetooth 范围，以及一旦标签离开 Bluetooth 工作范围，你的手机就会收到通知。

该场景可以借助 [IFTTT](https://ifttt.com/explore) 服务实现。IFTTT 会为你生成一个 URL。然后，你可以从 RouterOS 使用 [获取](../../../system-information-and-utilities/fetch.md)，向 IFTTT 生成的 URL 发送 HTTP/Web 请求，这将触发向你的手机发送 APP 通知。

一旦 IFTTT 服务设置完成且 KNOT 已相应配置，你就可以将 Bluetooth 标签（[TG-BT5-IN](https://mikrotik.com/product/tg_bt5_in) 或 [OUT](https://mikrotik.com/product/tg_bt5_out) 型号）安装到你想要跟踪的任何设备上。

假设你将标签安装在一台昂贵的机器上，或者只是……你的钥匙上。然后，你安装并放置 KNOT，使标签处于 KNOT 的 Bluetooth 范围内。接下来会发生什么，它又将如何工作？

KNOT 将按计划（使用你选择的间隔）运行脚本。根据脚本中配置的标签 MAC 地址 → 脚本将检查最近收到的 Bluetooth 数据包的时间（即最近一次收到数据包的时间）。如果：

- 数据包的接收时间与 **/system clock** 时间相差在 1 分钟以内（例如，**/system clock** 时间为 **16:02:00**，而标签的 payload 在 **16:01:50** 收到）→ 将触发一条“标签在范围内”通知，并发送到你的手机。
- 数据包的接收时间比 **/system clock** 时间早 1 分钟以上（例如，**/system clock** 时间为 **16:02:00**，而标签的 payload 在 **16:00:50** 收到）→ 将触发一条“标签不在范围内”通知并发送到你的手机。

由于没有其他方法可以知道标签实际上是在工作范围内还是范围外，脚本使用 "time" 参数来确认。因此，当 payload 的接收时间不断刷新 → 这意味着标签存在，并且 KNOT 成功接收数据包。当 KNOT 自上次收到数据包起已过去 1 分钟 → 这意味着 KNOT 整整一分钟都没有收到标签的任何更新，这确认标签不在范围内。

### IFTTT 设置 {#ifttt-setup}

第一步是注册 IFTTT 账户，或通过[链接](https://ifttt.com/join)登录现有账户。

为你的手机下载 IFTTT 应用，你可以通过 APP 或浏览器配置后续步骤。

登录后，点击右上角的 "Create" 按钮：

![](/img/8718c2b859fc9059.webp)

这将带你进入 Applet 创建界面：

![](/img/e7da398226841fc0.webp)

在 "**If This**" 字段中选择 "**Add**" 按钮。选择名为 "**Webhooks**" 的服务。然后，选择名为 "**Receive a web request**" 的选项。

输入 "**Event Name**"，例如 `**{The_tag_IS_within_range}**`，然后选择 "**Create trigger**"。这将带你返回：

![](/img/8a2ccef59e60aa1f.webp)

在 "**Then That**" 字段中选择 "**Add**" 按钮，并找到名为 "**Notifications**" 的操作。选择名为 "**Send a notification from the IFTTT app**" 的选项，然后点击 "**Create Action**" 确认。

点击 "**Continue**" 并检查 Applet。点击 "**Finish**"。

现在，再次执行相同步骤以创建第二个 Applet，但对于第二个 Applet，输入另一个 "**Event Name**"，例如 `**{The_tag_is_NOT_in_range}**`。

创建两个 Applet 后 → 检查为你生成的 Web 请求 URL。前往[链接](https://ifttt.com/maker_webhooks)并点击 "**Documentation**" 按钮：

![](/img/e2277dbb2090d7d3.webp)

页面将显示你需要使用的 URL：

![](/img/b3c3c04ebaffc7cb.webp)

复制此 URL——稍后你需要在脚本中使用它。

### Bluetooth 标签配置 {#bluetooth-tag-configuration}

通过[链接](../mikrotik-beacon-manager/index.md)查看我们的标签配置指南（iOS 和 Android）。

在此特定用例中，KNOT 将检查收到的 Bluetooth payload 的时间，因此标签配置为哪种数据包类型并不重要。

唯一重要的设置是 "Advertisement interval"。确保已配置此参数。

或者你可以**直接让标签保持默认设置**，不做任何更改。

### RouterOS 配置 {#routeros-configuration}

:::info
请注意，需要 **iot** 软件包。你可以从我们的[下载页面](https://mikrotik.com/download)获取。
:::
确保已配置互联网访问，以便 KNOT 能够访问 IFTTT webhooks。

#### Bluetooth 扫描器 {#bluetooth-scanner}

导航到 **IoT>Bluetooth>Scanners**。如果扫描器已禁用，请确保将其启用，然后编辑扫描器设置：

![](/img/6ee0035443c5a8b8.webp)

选择 **Filter duplicates**=**keep-newest**。

**keep-newest** 设置将确保仅在 "Advertising reports" 部分保留最新报告。扫描器捕获的新数据包（针对每个单独的 MAC 地址）将覆盖较旧的数据包。

#### 脚本 {#script}

导航到 **System>Scripts** 菜单，并在其中添加新脚本。

你可以复制下面的脚本。将下面的脚本复制到“记事本”中，然后再次将其复制到脚本的“**Source:**”字段中。

```ros
#### User params
:local addressRegex    "DC:2C:6E:91:D6:F3"
:local urlNotInRange   "https://maker.ifttt.com/trigger/{The_tag_is_NOT_in_range}/json/with/key/-xxxx"
:local urlInRange      "https://maker.ifttt.com/trigger/{The_tag_IS_within_range}/json/with/key/-xxxx"
:local missingInterval 60000

###Time

:local realtime [/system clock get time]
:local realdate [/system clock get date]
:local tonumtime [:tonum [:totime "$realdate $realtime"]];
:local gmt ([system/clock/print as-value]->"gmt-offset")

###to offset epoch with curretn GMT
:global tonumtimeoffset ($tonumtime-$gmt)

:global Epomili
:set Epomili ([$tonumtimeoffset]."000")

###Bluetooth
:local adver
:local adver2
:local ts
:local clockmin

:set adver [/iot bluetooth scanners advertisements print detail as-value where address ~ $addressRegex]
:set adver2 ($adver->0)
:set ts ($adver2 -> "epoch")
:set clockmin ($Epomili-$missingInterval)

:local counterIN
:local counterOUT

:if ($ts&lt;=$clockmin) do={
    :set $counterIN 0;
    :if ($counterOUT=0 or $counterOUT=null) do={
        :set $counterOUT 0;
        /tool fetch http-method=get output=user url=$urlNotInRange;
        :set counterOUT ($counterOUT+1);
        :log info "IFTTT notification - the tag is OUT OF range!"
    } else={
        :log info "Tag is OUT of range! Notification was already sent before!"
    }
} else={
    :set $counterOUT 0;
    :if ($counterIN=0 or $counterIN=null) do={
        :set $counterIN 0;
        /tool fetch http-method=get output=user url=$urlInRange;
        :set $counterIN ($counterIN+1);
        :log info "IFTTT notification - tag IS WITHIN range!"
    } else={
        :log info "Tag is WITHIN the range! Notification was already sent before!"
    }
}
```

有 3 行需要留意（位于脚本的 **### User parameters** 部分）。

1) MAC 地址行：

```
:local addressRegex "DC:2C:6E:91:D6:F3"
```

上面这一行，你需要输入标签的 MAC 地址（标签的 MAC 地址印在标签贴纸上）。

1) 不在范围内通知 URL 行：

```
:local urlNotInRange "https://maker.ifttt.com/trigger/{The_tag_is_NOT_in_range}/json/with/key/-xxxx"
```

这一行，你需要输入 IFTTT 服务为你生成的 URL。该 URL 应如下所示 → `https://maker.ifttt.com/trigger/{event}/json/with/key/-xxxxx`。将 URL 中的 `{event}` 部分更改为创建 Applet 时在 IFTTT 门户中选择的 `Event Name`，并将 URL 中的 -**xxxxx** 部分更改为 IFTTT 门户为你生成的密钥。

1) 在范围内通知 URL 行：

```
:local urlInRange "https://maker.ifttt.com/trigger/{The_tag_IS_within_range}/json/with/key/-xxxx"
```

这一行，你需要输入 IFTTT 服务为你生成的 URL。该 URL 应如下所示 → `https://maker.ifttt.com/trigger/{event}/json/with/key/-xxxxx`。将 URL 中的 `{event}` 部分更改为创建第二个 Applet 时在 IFTTT 门户中选择的第二个 `Event Name`，并将 URL 中的 -**xxxxx** 部分更改为 IFTTT 门户为你生成的密钥。

为脚本命名，例如 **ifttt**，然后保存（"Apply" 和 "OK"）。

**脚本将如何工作？**

我们将一个计划任务应用到脚本，脚本将按设定的间隔运行。计划任务设置将在本指南后面展示。

脚本的 **###Time** 部分会获取 **/system clock** 时间并计算 "**epoch**" 时间。当我们获得当前 **/system clock** 时间的 "**epoch**" 值后，就可以从中减去 1 分钟。得到“减去一分钟”后的 epoch 时间值，将帮助脚本将数据包的接收时间与之比较，以判断数据包是延迟 1 分钟以上，还是处于当前时间的 1 分钟区间内。

如果标签移出范围（数据包早于 1 分钟）→ KNOT 将向 IFTTT webhook 发送 HTTP post（使用表示其超出范围的 "**Event Name**"），并将该事件记录到 **System>Log**。

如果收到标签的 payload 且其不早于 1 分钟 → KNOT 将向 IFTTT webhook 发送 HTTP post（使用表示其处于范围内的 "**Event Name**"），并将其记录到 **System>Log**。

“counter”参数将确保脚本每次由计划任务运行时不会向你发送大量通知，并确保当标签进入范围时你只收到 1 次通知，当标签离开范围时也只收到 1 次通知。

#### 调度器 {#scheduler}

导航到 **System>Scheduler**，并在其中添加新的计划任务。

为其命名，例如 **scheduler1**，并设置你希望 KNOT 检查数据包的间隔。

![](/img/d6caa5f3fcc3d481.webp)

在 "**On Event:**" 字段中添加一行 "/system script run **ifttt**"（其中 **ifttt** 是所创建脚本的名称），然后点击 "**Apply**" 和 "**OK**"。

### 结果验证 {#result-verification}

确保你已在手机上登录 IFTTT 应用。

将标签放置在 KNOT 的 Bluetooth 范围内，一旦计划任务运行脚本，你应该会收到通知，如下所示：

![](/img/8d9d97307880d8f5.webp)

将标签移出 KNOT 的范围（等待 1 分钟），你将收到另一条通知：

![](/img/2e5a381d4487a412.webp)
