---
title: "计划任务"
description: "MikroTik RouterOS 调度器支持定时执行脚本，可精确控制任务运行的时间和频率。它支持基于间隔的执行或一次性执行，并提供开始时间、间隔时长和脚本事件名称等属性。"
tags:
  - 'scheduling'
  - 'script-execution'
  - 'time-interval'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/scheduler
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 概述 {#summary}

调度器可以在指定时刻、指定时间间隔之后，或同时满足两者时触发脚本执行。

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **days** (*always* \| *sun* \| *mon* \| *tue* \| *wed* \| *thu* \| *fri* \| *sat*；默认：**always**) | 任务可以运行的星期几。用逗号分隔多天（例如，`mon,wed,fri`）。使用 `always` 每天运行。 |
| **interval** (*time*；默认：**0s**) | 两次脚本执行之间的间隔。设置为零时，脚本仅在开始时间运行一次。 |
| **name** (*string*；默认： ) | 任务名称。 |
| **on-event** (*string*；默认： ) | 要执行的脚本。 |
| **policy** (*ftp \| reboot \| read \| write \| policy \| test \| password \| sniff \| sensitive \| romon*；默认： ) | 应用于计划脚本的策略，用于控制执行期间的权限。 |
| **start-date** (*date*；默认： ) | 首次执行脚本的日期。 |
| **start-time** (*time \| startup*；默认： ) | 首次执行脚本的时间。使用 `startup` 在系统启动后 3 秒执行。 |
| **run-count** (*read-only: integer*) | 每次脚本运行时递增的计数器。重启后重置。 |

## 说明 {#notes}

重启路由器会重置 run-count 计数器。

如果需要同时执行多个脚本，它们会按照在 scheduler 配置中出现的顺序执行。如果一个计划脚本用于禁用另一个脚本，这一点可能很重要。

如果需要更复杂的执行模式，通常可以通过调度多个脚本，并让它们相互启用和禁用来实现。

当同时设置 `days`、指定的 `start-time` 和 `interval` 时，任务将在匹配日期的指定开始时间启动，并按照给定间隔重复执行，直到当天结束。

:::note
如果 scheduler 条目的 start-time 设置为 startup，则其行为等同于将 start-time 和 start-date 设置为控制台启动后 3 秒的时间。具有 `start-time=startup` 和 `interval=0` 的脚本会在路由器每次启动时执行一次。如果 interval 设置为非 0 值，scheduler 将**不会**在启动时运行。
:::

### 示例 {#examples}

我们将添加一个每小时执行 `log-test` 脚本的任务：

```ros
[admin@MikroTik] /system/script> add name=log-test source=":log info message=test" 
[admin@MikroTik] /system/script> print 
Flags: I - invalid 
0 name="log-test" owner="admin" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon dont-require-permissions=no run-count=0 
source=:log info message=test 
[admin@MikroTik] /system/script> .. /scheduler 
[admin@MikroTik] /system/scheduler> add name=run-1h interval=1h 
on-event=log-test 
[admin@MikroTik] /system/scheduler> print 
Flags: X - disabled 
# NAME ON-EVENT START-DATE START-TIME INTERVAL RUN-COUNT 
0 run-1h log-test 2004-03-30 06:11:35 1h 0 
[admin@MikroTik] /system/scheduler>
```

以下示例仅在工作日运行任务：

```ros
[admin@MikroTik] /system/script> add name=business-log source=":log info message=workday"
[admin@MikroTik] /system/script> .. scheduler
[admin@MikroTik] /system/scheduler> add name=workday-task interval=1d on-event=business-log days=mon,tue,wed,thu,fri start-time=8:00:00
[admin@MikroTik] /system/scheduler> print
Flags: X - disabled
# NAME ON-EVENT START-DATE START-TIME INTERVAL DAYS RUN-COUNT
0 workday-task business-log 2026-07-16 08:00:00 1d mon,tue,wed,thu,fri 0
[admin@MikroTik] /system/scheduler>
```

在另一个示例中，将添加两个脚本，用于更改队列规则“Cust0”的带宽设置。每天上午 9 点将队列设置为 64Kb/s，下午 5 点将队列设置为 128Kb/s。队列规则、脚本和调度任务如下：

```ros
[admin@MikroTik] /queue/simple> add name=Cust0 interface=ether1 \ 
\... dst-address=192.168.0.0/24 limit-at=64000
 [admin@MikroTik] /queue/simple> print
 Flags: X - disabled, I - invalid 0 name="Cust0" target-address=0.0.0.0/0 dst-address=192.168.0.0/24
 interface=ether1 limit-at=64000 queue=default priority=8 bounded=yes 
[admin@MikroTik] /queue/simple> /system/script 
[admin@MikroTik] /system/script> add name=start_limit source={/queue/simple/set \
 \... Cust0 limit-at=64000} 
[admin@MikroTik] /system/script> add name=stop_limit source={/queue/simple/set \ 
\... Cust0 limit-at=128000} 
[admin@MikroTik] /system/script> print 
0 name="start_limit" source="/queue/simple/set Cust0 limit-at=64000" 
owner=admin run-count=0 
1 name="stop_limit" source="/queue/simple/set Cust0 limit-at=128000" 
owner=admin run-count=0 
[admin@MikroTik] /system/script> .. scheduler 
[admin@MikroTik] /system/scheduler> add interval=24h name="set-64k" \ 
\... start-time=9:00:00 on-event=start_limit 
[admin@MikroTik] /system/scheduler> add interval=24h name="set-128k" \
 \... start-time=17:00:00 on-event=stop_limit 
[admin@MikroTik] /system/scheduler> print
 Flags: X - disabled 
# NAME ON-EVENT START-DATE START-TIME INTERVAL RUN-COUNT
 0 set-64k start... 2008-10-30 09:00:00 1d 0 
1 set-128k stop_... 2008-10-30 17:00:00 1d 0 
[admin@MikroTik] /system/scheduler>
```

以下示例调度一个脚本，该脚本每周通过电子邮件发送一次路由器配置备份。

```ros
[admin@MikroTik] /system/script> add name=e-backup source={/system/backup 
{... save name=email; /tool/e-mail/send to="root@host.com" subject=([/system 
{... /identity/get name] . " Backup") file=email.backup} 
[admin@MikroTik] /system/script> print 
0 name="e-backup" source="/system/backup/save name=ema... owner=admin run-count=0 

[admin@MikroTik] /system/script> ../scheduler 
[admin@MikroTik] /system/scheduler> add interval=7d name="email-backup" \
 \... on-event=e-backup 
[admin@MikroTik] /system/scheduler> print
 Flags: X - disabled
 # NAME ON-EVENT START-DATE START-TIME INTERVAL RUN-COUNT 
0 email-... e-backup 2008-10-30 15:19:28 7d 1 
[admin@MikroTik] /system/scheduler>
```

不要忘记设置电子邮件设置，即 `/tool/e-mail` 下的 SMTP 服务器和 From: 地址。例如：

```ros
[admin@MikroTik] /tool/e-mail> set server=159.148.147.198 from=SysAdmin@host.com 
[admin@MikroTik] /tool/e-mail> print
 server: 159.148.147.198 
from: SysAdmin@host.com 
[admin@MikroTik] /tool/e-mail>
```

以下示例将从午夜到中午每小时在日志中写入“x”：

```ros
[admin@MikroTik] /system/script> add name=enable-x source={/system/scheduler 
{... enable x} 
[admin@MikroTik] /system/script> add name=disable-x source={/system/scheduler 
{... disable x} 
[admin@MikroTik] /system/script> add name=log-x source={:log info message=x} 
[admin@MikroTik] /system/script> .. scheduler 
[admin@MikroTik] /system/scheduler> add name=x-up start-time=00:00:00 \ 
\... interval=24h on-event=enable-x 
[admin@MikroTik] /system/scheduler> add name=x-down start-time=12:00:00
 \... interval=24h on-event=disable-x 
[admin@MikroTik] /system/scheduler> add name=x start-time=00:00:00 interval=1h \ 
\... on-event=log-x 
[admin@MikroTik] /system/scheduler> print 
Flags: X - disabled
 # NAME ON-EVENT START-DATE START-TIME INTERVAL RUN-COUNT 
0 x-up enable-x 2008-10-30 00:00:00 1d 0 
1 x-down disab... 2008-10-30 12:00:00 1d 0 
2 x log-x 2008-10-30 00:00:00 1h 0 
[admin@MikroTik] /system/scheduler>
```
