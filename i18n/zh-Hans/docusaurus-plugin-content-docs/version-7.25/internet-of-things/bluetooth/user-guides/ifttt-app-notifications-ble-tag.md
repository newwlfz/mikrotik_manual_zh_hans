---
title: "当 BLE tag 出现在 KNOT 范围内时 IFTTT app 发送通知"
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/bluetooth/user-guides/ifttt-app-notifications-ble-tag
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 简介 {#introduction}

我们的 Bluetooth 标签和 KNOT 可用于物联网资产跟踪的不同场景。

本指南介绍的场景是：当标签进入 KNOT 的 Bluetooth 范围时，以及标签离开 Bluetooth 工作范围时，立即在手机上接收通知。

该场景可借助 [IFTTT](https://ifttt.com/explore) 服务实现。IFTTT 会生成 URL。然后，可以使用 RouterOS 中的 [/tool fetch](/docs/7.24/system-information-and-utilities/fetch) 向 IFTTT 生成的 URL 发送 HTTP/Web 请求，从而触发手机上的 APP 通知。

完成 IFTTT 服务设置并相应配置 KNOT 后，可以将 Bluetooth 标签（[TG-BT5-IN](https://mikrotik.com/product/tg_bt5_in) 或 [OUT](https://mikrotik.com/product/tg_bt5_out) 型号）附着到任何希望跟踪的设备上。

假设将标签附着到一台昂贵设备上，或者只是……钥匙上。然后安装并放置 KNOT，使标签位于 KNOT 的 Bluetooth 范围内。接下来会发生什么，以及它如何工作？

KNOT 将按计划运行脚本（间隔由你选择）。根据脚本中配置的标签 MAC 地址 → 脚本将检查最近收到的 Bluetooth 数据包的时间（收到最新数据包的时间）。如果：

- 数据包的接收时间在 **/system clock** 时间的 1 分钟以内（例如，**/system clock** 时间为 **16:02:00**，标签的 payload 接收时间为 **16:01:50**）→ 将触发“TAG IS WITHIN RANGE”通知，并发送到你的手机。
- 数据包的接收时间比 **/system clock** 时间早超过 1 分钟（例如，**/system clock** 时间为 **16:02:00**，标签的 payload 接收时间为 **16:00:50**）→ 将触发“TAG IS NOT IN RANGE”通知，并发送到你的手机。

由于无法通过其他方式判断标签实际处于工作范围内还是范围外，脚本使用“time”参数进行确认。当 payload 的接收时间持续刷新时，表示标签存在，并且 KNOT 成功接收数据包。当 KNOT 自上次接收数据包起已过去 1 分钟时，表示 KNOT 整整一分钟未收到来自标签的更新，从而确认标签不在范围内。

### IFTTT 设置 {#ifttt-setup}

第一步是按照[链接](https://ifttt.com/join)注册 IFTTT 账户或登录现有账户。

下载适用于手机的 IFTTT 应用，可以通过 APP 或浏览器配置后续步骤。

登录后，按右上角的“Create”按钮：

![](/img/8718c2b859fc9059.webp)

这将进入小程序创建界面：

![](/img/e7da398226841fc0.webp)

在“If This”字段中选择“**Add**”按钮。选择名为“**Webhooks**”的服务。然后，选择名为“**Receive a web request**”的选项。

输入“**Event Name**”，例如 `**{The_tag_IS_within_range}**`，然后选择“**Create trigger**”。这将返回到：

![](/img/8a2ccef59e60aa1f.webp)

在“**Then That**”字段中选择“**Add**”按钮，并找到名为“**Notifications**”的操作。选择名为“**Send a notification from the IFTTT app**”的选项，然后点击“**Create Action**”确认该决定。

点击“**Continue**”并检查 applet。点击“**Finish**”。

现在，重复相同步骤创建第二个 applet，但对于第二个 applet，输入另一个“**Event Name**”，例如 `**{The_tag_is_NOT_in_range}**`。

创建两个 applet 后 → 检查为你生成的 Web 请求 URL。前往 [link](https://ifttt.com/maker_webhooks) 并点击“**Documentation**”按钮：

![](/img/e2277dbb2090d7d3.webp)

该页面会显示你需要使用的 URL：

![](/img/b3c3c04ebaffc7cb.webp)

复制此 URL - 稍后你需要在脚本中使用它。

### 蓝牙标签配置 {#bluetooth-tag-configuration}

通过以下 [link](/docs/7.24/internet-of-things/bluetooth/mikrotik-beacon-manager) 查看我们的标签配置指南（iOS 和 Android）。

在此特定用例中，KNOT 会检查接收到的 Bluetooth 载荷的时间，因此为标签配置哪种数据包类型并不重要。

唯一重要的设置是“Advertisement interval”。确保已配置该参数。

也可以**保持标签使用默认设置**，不做任何更改。

### RouterOS 配置 {#routeros-configuration}

:::info
请注意，需要 **iot** 软件包。可以从我们的[下载页面](https://mikrotik.com/download)获取。
:::
确保已配置互联网访问，使 KNOT 能够访问 IFTTT webhooks。

#### Bluetooth Scanner

导航到 **IoT>Bluetooth>Scanners**。确保启用扫描器（如果其处于禁用状态），然后编辑扫描器设置：

![](/img/6ee0035443c5a8b8.webp)

选择 **Filter duplicates**=**keep-newest**。

**keep-newest** 设置可确保“Advertising reports”部分仅保留最新报告。扫描器捕获的新数据包（针对每个单独的 MAC 地址）将覆盖较旧的数据包。

#### 脚本 {#script}

导航到 **System>Scripts** 菜单，并在其中添加新脚本。

可以复制下面的脚本。将下面的脚本复制到“notepad”中，然后再次复制到脚本的“**Source:**”字段中。

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

有 3 行需要特别注意（位于脚本的 **### User parameters** 部分）。

1) MAC 地址行：

```
:local addressRegex "DC:2C:6E:91:D6:F3"
```

上面的行，需要在其中输入标签的 MAC 地址（可以在标签的标签纸上找到标签的 MAC 地址）。

1) 不在范围内的通知 URL 行：

```
:local urlNotInRange "https://maker.ifttt.com/trigger/{The_tag_is_NOT_in_range}/json/with/key/-xxxx"
```

在此行中输入 IFTTT 服务为你生成的 URL。URL 应类似 → `https://maker.ifttt.com/trigger/{event}/json/with/key/-xxxxx`。将 URL 中的 `{event}` 部分更改为在 IFTTT 门户中创建 applet 时选择的 `Event Name`，并将 URL 中的 -**xxxxx** 部分更改为 IFTTT 门户为你生成的密钥。

1) 在 range notification URL 行中：

```
:local urlInRange "https://maker.ifttt.com/trigger/{The_tag_IS_within_range}/json/with/key/-xxxx"
```

在此行中输入 IFTTT 服务为你生成的 URL。URL 应类似 → `https://maker.ifttt.com/trigger/{event}/json/with/key/-xxxxx`。将 URL 中的 `{event}` 部分更改为在创建第二个 applet 时在 IFTTT 门户中选择的第二个 `Event Name`，并将 URL 中的 -**xxxxx** 部分更改为 IFTTT 门户为你生成的密钥。

将脚本命名为例如 **ifttt**，并保存（点击“Apply”和“OK”）。

**脚本将如何工作？**

我们为脚本应用调度器，脚本将按设定的间隔运行。调度器设置将在本指南后面显示。

脚本中的 **###Time** 部分获取 **/system clock** 时间并计算“**epoch**”时间。获得当前 **/system clock** 时间的“**epoch**”值后，可以从中减去 1 分钟。得到“减去一分钟”的 epoch 时间值后，脚本可以将数据包的接收时间与它进行比较，以判断数据包是否延迟 1 分钟或更久，或者是否在当前时间的 1 分钟间隔内。

如果标签移出范围（数据包早于 1 分钟），KNOT 将向 IFTTT webhook 发送 HTTP post（使用表示超出范围的“**Event Name**”），并在 **System>Log** 中记录该事件。

如果收到标签的 payload 且其时间不超过 1 分钟，KNOT 将向 IFTTT webhook 发送 HTTP post（使用表示在范围内的“**Event Name**”），并在 **System>Log** 中记录该事件。

“counter”参数可确保不会在调度程序每次运行脚本时都向你发送大量通知，并确保标签移入范围时仅收到 x1 条通知，标签移出范围时仅收到 x1 条通知。

#### 计划任务 {#scheduler}

导航到 **System>Scheduler** 并在其中添加新的调度程序。

例如，将其命名为 **scheduler1**，并设置希望 KNOT 检查数据包的间隔。

![](/img/d6caa5f3fcc3d481.webp)

在“**On Event:**”字段中添加一行“/system script run **ifttt**”（其中 **ifttt** 是所创建脚本的名称），点击“**Apply**”和“**OK**”。

### 结果验证 {#result-verification}

确保你已在手机上的 IFTTT 应用中登录。

将标签放置在 KNOTs 的蓝牙范围内，调度程序运行脚本后，你应收到如下通知：

![](/img/8d9d97307880d8f5.webp)

将标签移出 KNOTs 范围（等待 1 分钟），你将收到另一条通知：

![](/img/2e5a381d4487a412.webp)
