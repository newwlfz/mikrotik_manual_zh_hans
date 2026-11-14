---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/watchdog"
sidebar_position: 19
title: "看门狗"
sidebar_label: "看门狗"
description: "RouterOS 配置中的 Watchdog 页面允许设置由无响应的 IP 地址或软件卡死触发的系统重启，并提供 ping 监控和通过电子邮件自动生成支持输出文件的选项。"
tags:
  - 'watchdog'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/watchdog
captured_at: '2026-11-04T11:28:06+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/system/watchdog`

此菜单允许将系统配置为在特定 IP 地址无响应时，或在检测到软件卡死时进行重启。检测通过两种方式完成：

- 软件看门狗定时器（通常由硬件故障引起）：设备可以通过重启自行恢复。
- Ping 看门狗可以监视与特定 IP 地址的连通性，并触发重启功能。

:::info
**注意：** 这是两种不同的看门狗功能，各自拥有独立的设置。默认情况下软件看门狗已启用，而 ping 看门狗已禁用。你可以通过指定 IP 地址来启用 ping 看门狗，也可以通过取消 Watchdog Timer 选项来禁用软件看门狗。

**重要：** **注意：** 看门狗重启并非系统故障。此类重启也不会生成 autosupout 文件。看门狗重启是由操作系统在某些服务未能按其应有速度响应时自动触发的 `/system/reboot`。其原因可能多种多样，包括硬件损坏、某些服务的软件实现缓慢、DDoS 攻击、配置错误等。
:::

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **auto-send-supout** (*yes \| no*；默认值：**no**) | 支持输出文件自动生成后，可通过电子邮件发送。 |
| **automatic-supout** (*yes \| no*；默认值：**yes**) | 当发生软件故障时，会自动生成名为 "autosupout.rif" 的文件。先前的 "autosupout.rif" 文件会被重命名为 "autosupout.old.rif"。 |
| **no-ping-delay** (*time*；默认值：5m) | 指定在尝试访问 watch-address 之前等待多长时间。 |
| **ping-timeout** (*time*；默认值：60s) | 指定在该时间间隔内设备将被 ping 6 次（在 "no-ping-delay" 之后）。 |
| **send-email-from** (*string*；默认值：) | 用于发送支持输出文件的电子邮件地址。如果未设置，则使用 `/tool/e-mail` 中设置的值。 |
| **send-email-to** (*string*；默认值：) | 接收支持输出文件的电子邮件地址。 |
| **send-smtp-server** (*string*；默认值：) | 用于发送支持输出文件的 SMTP 服务器地址。如果未设置，则使用 `/tool/e-mail` 中设置的值。 |
| **watch-address** (*IP*；默认值：) | 如果连续 6 次 ping 给定 IP 地址均失败，系统将重启。如果设置为 none，则此功能被禁用。默认情况下，如果设置了 watch-address 且其不可达，路由器将每 6 分钟重启一次。 |
| **watchdog-timer** (*yes \| no*；默认值：**yes**) | 系统在一分钟内无响应时是否重启。 |

## 快速示例 {#quick-example}

要让系统在发生软件崩溃时生成支持输出文件，并通过 192.0.2.1 自动发送到 support@example.com：

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
