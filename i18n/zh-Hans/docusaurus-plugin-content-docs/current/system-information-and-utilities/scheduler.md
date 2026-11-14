---
sidebar_key: "system-information-and-utilities/scheduler"
sidebar_position: 13
title: "调度器"
sidebar_label: "调度器"
description: "RouterOS 调度器可在设定时间、按间隔、在启动时或在选定的工作日运行命令或脚本：夜间备份、按时间段进行的更改、更新检查以及通知。"
tags:
  - 'scheduling'
  - 'script-execution'
  - 'time-interval'
source: https://manual.mikrotik.com/docs/system-information-and-utilities/scheduler
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

调度器会在设定时间、按间隔重复、路由器每次启动时，或在选定的星期几运行 RouterOS 命令或来自 `/system/script` 的脚本。可用于夜间备份、按时段切换接口或带宽限制、通知等任务。`/system/scheduler` 中的每个条目都在 `on-event` 中保存计划和要运行的命令。

当[设备模式](./device-mode.md)为 `home` 时，调度器不可用；当设备被标记时，无法创建或启用条目。

## 每天运行脚本 {#run-a-script-every-day}

将命令保存为脚本，然后添加一个每天 03:00 运行该脚本的条目。以下脚本会保存二进制备份和配置导出，并覆盖前一晚的文件：

```ros
/system/script/add name=nightly-backup source={
    /system/backup/save name=nightly
    /export file=nightly
}
/system/scheduler/add name=nightly-backup start-time=03:00:00 interval=1d \
    on-event=nightly-backup
```

创建 `nightly-backup` 脚本后，在 WinBox 的 **System > Scheduler > New** 下配置其计划：

1. 将 **Name** 设为 `nightly-backup`，选择 **Start Date**，将 **Start Time** 设为 `03:00:00`，并将 **Interval** 设为 `1d` 以每天运行。保持 **Days** 未设置，以允许每天运行。
2. 检查 **Policy**，并选择任务所需的权限。截图显示的是新建条目的默认值；请使用权限部分为你的脚本选择合适的权限。
3. 在 **On Event** 中输入 `nightly-backup`，保持选中 **Enabled**，然后选择 **OK**。**On Event** 也可以直接保存命令。

![WinBox new Scheduler entry with schedule fields, Policy permissions, and On Event commands](/img/f8081f122b7f6ded.webp)

保存后，在 Scheduler 列表中检查 **Next Run**，并使用 **Run Count** 查看该条目是否已运行。截图显示的是输入示例值之前的新建条目。

未指定 `start-date` 时，条目会在添加当天开始。`next-run` 显示下次运行时间，`run-count` 统计自上次启动以来的运行次数：

```ros
[admin@MikroTik] > /system/scheduler/print detail
0  name="nightly-backup" start-date=2026-09-25 start-time=03:00:00 interval=1d
   on-event=nightly-backup owner="admin"
   policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon
   run-count=0 next-run=2026-09-26 03:00:00
```

要暂停某个条目而不删除它，可使用 `/system/scheduler/disable nightly-backup` 将其禁用。要加密备份文件，请在 `/system/backup/save` 中添加 `password=`。有关恢复文件的信息，请参阅[备份](../getting-started/configuration-management/backup.md)。

## 不通过脚本运行命令 {#run-commands-without-a-script}

`on-event` 可以直接保存命令。以下条目会在夜间关闭设备的所有 LED，并在早晨重新打开：

```ros
/system/scheduler/add name=leds-off start-time=22:00:00 interval=1d \
    on-event="/system/leds/settings/set all-leds-off=immediate"
/system/scheduler/add name=leds-on start-time=07:00:00 interval=1d \
    on-event="/system/leds/settings/set all-leds-off=never"
```

短命令适合放在 `on-event` 中。较长的任务作为脚本更易于阅读和修改。

## 在启动时运行脚本 {#run-a-script-at-startup}

带有 `start-time=startup` 的条目会在路由器每次启动时运行。它在启动早期运行，此时接口尚未启用，DHCP 客户端也还没有地址，因此需要网络的脚本必须等待网络就绪。以下脚本会等待默认路由变为活动状态（最多五分钟），然后发送电子邮件：

```ros
/system/script/add name=boot-notify source={
    :local tries 0
    :while (([:len [/ip/route/find where dst-address=0.0.0.0/0 active]] = 0) \
            && ($tries < 60)) do={
        :delay 5s
        :set tries ($tries + 1)
    }
    :local name [/system/identity/get name]
    :local version [/system/resource/get version]
    :local uptime [/system/resource/get uptime]
    /tool/e-mail/send to=admin@example.com subject=($name . " restarted") \
        body=("RouterOS " . $version . " started, uptime " . $uptime)
}
/system/scheduler/add name=boot-notify start-time=startup on-event=boot-notify
```

本页的电子邮件示例需要在 `/tool/e-mail` 中配置好可用的电子邮件服务器。请参阅[电子邮件](./e-mail.md)。

当 `interval` 非零时，`startup` 条目本身不会在启动时运行：首次运行会在启动后经过一个间隔时发生，之后条目会按每个间隔运行。要在启动时以及按固定间隔运行同一脚本，请创建两个条目。

## 在选定的星期几运行 {#run-on-selected-weekdays}

`days` 可将条目限制在选定的星期几。以下条目会在周一至周五 08:00 启用访客 Wi-Fi 接口，并在 18:00 将其关闭。周末期间它保持关闭：

```ros
/system/scheduler/add name=guest-wifi-on days=mon,tue,wed,thu,fri \
    start-time=08:00:00 on-event="/interface/enable guest-wifi"
/system/scheduler/add name=guest-wifi-off days=mon,tue,wed,thu,fri \
    start-time=18:00:00 on-event="/interface/disable guest-wifi"
```

在周五晚上，接下来的运行时间是周五 18:00 和周一 08:00：

```ros
[admin@MikroTik] > /system/scheduler/print detail where name~"^guest-wifi"
3  name="guest-wifi-on" start-date=2026-09-25 start-time=08:00:00
   days=mon,tue,wed,thu,fri interval=0s on-event=/interface/enable guest-wifi
   owner="admin"
   policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon
   run-count=0 next-run=2026-09-28 08:00:00

4  name="guest-wifi-off" start-date=2026-09-25 start-time=18:00:00
   days=mon,tue,wed,thu,fri interval=0s on-event=/interface/disable guest-wifi
   owner="admin"
   policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon
   run-count=0 next-run=2026-09-25 18:00:00
```

:::tip
要按时段允许或阻止流量，请使用[防火墙过滤器](../cli-reference/ip/firewall/filter/index.md)的 `time` 匹配器，而不是通过调度器启用和禁用规则，例如 `time=08:00:00-18:00:00,mon,tue,wed,thu,fri`。这样规则会自动生效，无需调度器条目。
:::

## 计划如何计算 {#how-the-schedule-is-calculated}

### 开始时间和间隔 {#start-time-and-interval}

首次运行在 `start-date` 和 `start-time` 进行，它们默认为添加条目的时刻。之后，条目每隔 `interval` 运行一次。运行时间始终与开始时间加整数个间隔对齐，因此过去的开始时间会设定节奏：无论条目何时添加，`start-time=00:00:00 interval=1h` 都会在每个整点运行。

使用默认值 `interval=0s` 时，条目只运行一次。它会保留在列表中，`run-count=1` 且没有 `next-run`。

### 星期几 {#weekdays}

未设置 `days` 时，不考虑星期几，间隔会跨午夜继续：带有 `start-time=00:00:00 interval=17h` 的条目会在第一天 00:00 和 17:00 运行，并在第二天 10:00 运行。

设置 `days` 后，每个列出的日期都会再次从 `start-time` 开始，条目会每隔 `interval` 重复运行，直到当天结束。下一次运行是在下一个列出日期的 `start-time`。使用 `interval=0s` 时，条目在每个列出的日期运行一次。`days=always` 会将这些规则应用于每一天，`days=never` 会阻止条目运行。

`1d` 或更长的间隔不支持与 `days` 一起使用。此类条目会显示提示 `multi-day intervals are not supported with active day scheduling`。若要每天运行一次，请使用 `interval=0s`。

### 同一时间到期的条目 {#entries-due-at-the-same-time}

同一时刻到期的条目会一起启动，顺序不固定。当任务必须以特定顺序运行时，请从单个脚本中依次调用它们。

### 重启和时钟 {#reboots-and-the-clock}

重启会将 `run-count` 重置为 0。计划遵循路由器的本地时间和时区，请参阅[时钟](./clock.md)。请保持时钟同步，例如使用 [NTP](./ntp.md)；启动后，在时钟同步之前，它可能与实际时间不一致。

## 权限 {#permissions}

每个条目使用 `policy` 中的策略运行其命令。默认情况下，这些是添加条目的用户的策略，并限于适用于脚本的策略。`owner` 显示该用户。需要条目不具备的策略的命令会失败，日志会显示 `not enough permissions (9)` 以及条目名称。

当 `on-event` 是脚本名称时，该脚本也会使用条目的策略运行。RouterOS 会拒绝运行自身策略包含条目所没有的权限的脚本。要仅使用脚本自身的策略运行脚本，请在 `on-event` 中使用 `/system/script/run <name> use-script-permissions`。请参阅[脚本权限](../developer-guides/scripting/index.md#script-permissions)。

## 更多示例 {#more-examples}

### 通过电子邮件发送每周备份 {#email-a-weekly-backup}

以下脚本会在每周日 02:00 保存加密备份，并将其作为电子邮件附件发送：

```ros
/system/script/add name=email-backup source={
    :local name [/system/identity/get name]
    /system/backup/save name=weekly password=ChangeThisPassword
    /tool/e-mail/send to=admin@example.com file=weekly.backup \
        subject=($name . " backup " . [/system/clock/get date]) \
        body="Weekly configuration backup."
}
/system/scheduler/add name=email-backup start-time=02:00:00 days=sun \
    on-event=email-backup
```

备份包含密码、密钥和证书。请选择你自己的备份密码，并仅将文件发送到你信任的邮箱。

### 获取新 RouterOS 版本通知 {#get-notified-about-new-routeros-versions}

以下脚本每天早上 09:00 检查是否有新的 RouterOS 版本。当有新版本可用时，它会向日志写入警告并发送电子邮件。检查在后台运行，因此脚本会等待 15 秒后再读取结果：

```ros
/system/script/add name=update-check source={
    /system/package/update/check-for-updates once
    :delay 15s
    :if ([/system/package/update/get status] = "New version is available") do={
        :local name [/system/identity/get name]
        :local latest [/system/package/update/get latest-version]
        :log warning ("RouterOS " . $latest . " is available")
        /tool/e-mail/send to=admin@example.com \
            subject=($name . ": RouterOS " . $latest . " is available") \
            body="Install it with /system/package/update/install."
    }
}
/system/scheduler/add name=update-check start-time=09:00:00 interval=1d \
    on-event=update-check
```

该脚本仅报告新版本；请在你选择的时间安装，请参阅[升级](../getting-started/installation-and-upgrade/upgrade.md)。

### 每周更改访客 Wi-Fi 密码 {#change-the-guest-wi-fi-password-every-week}

以下脚本会在每周一 06:00 为 [WiFi](../wireless/wifi/index.md) 安全配置文件 `guest` 设置新的随机密码，并通过电子邮件发送，例如发送给前台。字符集排除了容易混淆的字符，例如 `0`、`O`、`1` 和 `l`：

```ros
/system/script/add name=guest-password source={
    :local chars "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    :local pass [:rndstr length=12 from=$chars]
    /interface/wifi/security/set [find name=guest] passphrase=$pass
    /tool/e-mail/send to=reception@example.com subject="Guest Wi-Fi password" \
        body=("The guest Wi-Fi password for this week is " . $pass)
}
/system/scheduler/add name=guest-password start-time=06:00:00 days=mon \
    on-event=guest-password
```

更改后，访客需要使用新密码才能连接。

### 在工作时间限制访客带宽 {#limit-guest-bandwidth-during-business-hours}

以下[简单队列](../firewall-and-quality-of-service/queues/index.md)会将访客网络限制为 50 Mbps。在工作日 08:00 到 18:00，限制降至 10 Mbps，这样访客就不会拖慢办公室连接：

```ros
/queue/simple/add name=guest target=10.0.20.0/24 max-limit=50M/50M
/system/scheduler/add name=guest-limit-day days=mon,tue,wed,thu,fri \
    start-time=08:00:00 on-event="/queue/simple/set guest max-limit=10M/10M"
/system/scheduler/add name=guest-limit-evening days=mon,tue,wed,thu,fri \
    start-time=18:00:00 on-event="/queue/simple/set guest max-limit=50M/50M"
```

## 技术细节 {#technical-details}

### 日志消息 {#log-messages}

添加、更改和删除条目会写入 `system,info` 消息，例如 `new script scheduled by ...`、`changed scheduled script settings by ...` 和 `script removed from scheduler by ...`。条目所做的配置更改会指明该条目，例如：

```text
system,info device changed by scheduler:guest-wifi-off/action:8 (/interface set guest-wifi disabled=yes)
```

运行失败会写入 `script,error` 消息，其中包含原因和失败命令所在行：

```text
script,error executing script email-backup
script,error,debug (scheduler:email-backup) failure: error connecting to server (/tool/e-mail/send; line 4)
```

### reset 命令 {#the-reset-command}

`/system/scheduler/reset` 会清除 `on-event` 并将 `interval` 设为 `0s`。它不会重置 `run-count`。

有关所有属性的信息，请参阅 CLI 参考中的 [`/system/scheduler`](../cli-reference/system/scheduler.md)。
