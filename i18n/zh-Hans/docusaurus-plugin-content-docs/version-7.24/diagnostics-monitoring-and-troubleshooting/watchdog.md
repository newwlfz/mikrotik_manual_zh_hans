---
title: "看门狗"
description: "RouterOS 配置中的 Watchdog 页面用于设置由无响应 IP 地址或软件卡死触发的系统重启，并提供 ping 监控和通过电子邮件自动生成支持输出文件的选项。"
tags:
  - 'watchdog'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/watchdog
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/system/watchdog`

此菜单用于配置系统在特定 IP 地址无响应或检测到软件锁死时重启。检测通过两种方式进行：

- 软件 watchdog 定时器（主要由硬件故障引起）：设备可通过重启自行恢复。
- Ping watchdog 可监控到特定 IP 地址的连通性，并触发重启功能。

:::info
**注意：** 这是两种不同的 Watchdog 功能，各自拥有独立设置。默认情况下，软件 Watchdog 已启用，ping Watchdog 已禁用。可通过指定 IP 地址启用 ping Watchdog，也可通过取消设置 Watchdog Timer 选项禁用软件 Watchdog。

**重要：** **注意：** Watchdog 重启不是系统故障。此类重启也不会生成 autosupout 文件。Watchdog 重启是当某个服务响应速度未达到预期时，由操作系统自动触发的 `/system/reboot`。原因可能包括硬件损坏、某些服务的软件实现过慢、DDoS 攻击、错误配置等。
:::

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **auto-send-supout** (*yes \| no*；默认：**no**) | 自动生成 support output 文件后，可以通过电子邮件发送该文件。 |
| **automatic-supout** (*yes \| no*；默认：**yes**) | 发生软件故障时，会自动生成名为“autosupout.rif”的文件。先前的“autosupout.rif”文件会重命名为“autosupout.old.rif”。 |
| **no-ping-delay** (*time*；默认：5m) | 指定在尝试访问 watch-address 之前等待的时间。 |
| **no-ping-delay** (*time*；默认：5m) | 指定在尝试访问 watch-address 之前等待的时间。 |
| **ping-timeout** (*time*；默认：60s) | 指定设备被 ping 6 次的时间间隔（在“no-ping-delay”之后）。 |
| **send-email-from** (*string*；默认：) | 发送 support output 文件时使用的发件人电子邮件地址。如果未设置，则使用 `/tool/e-mail` 中设置的值。 |
| **send-email-to** (*string*；默认：) | 发送 support output 文件的目标电子邮件地址。 |
| **send-smtp-server** (*string*；默认：) | 用于发送 support output 文件的 SMTP 服务器地址。如果未设置，则使用 `/tool/e-mail` 中设置的值。 |
| **watch-address** (*IP*；默认：) | 如果对指定 IP 地址的 6 次连续 ping 均失败，系统将重启。如果设置为 none，则禁用该功能。默认情况下，如果设置了 watch-address 且无法访问，路由器将每 6 分钟重启一次。 |
| **watchdog-timer** (*yes \| no*；默认：**yes**) | 系统一分钟无响应时是否重启。 |

## 快速示例 {#quick-example}

要使系统在软件崩溃时生成 support output 文件，并通过 192.0.2.1 自动发送至 support@example.com：

```ros
[admin@MikroTik] /system/watchdog/set auto-send-supout=yes \
\... send-email-to=support@example.com send-smtp-server=192.0.2.1
[admin@MikroTik] /system/watchdog> print
      watch-address: none
     watchdog-timer: yes
      no-ping-delay: 5m
   automatic-supout: yes
   auto-send-supout: yes
   send-smtp-server: 192.0.2.1
      send-email-to: support@example.com
```
