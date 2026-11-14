---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/watchdog"
sidebar_position: 19
title: "看门狗"
sidebar_label: "看门狗"
description: "Watchdog 会在系统停止响应或某个 IP 地址停止响应 ping 时重启路由器，并在软件故障后写入支持输出文件。"
tags:
  - 'watchdog'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/watchdog
captured_at: '2026-11-04T11:15:33+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

当系统停止响应时，watchdog 会自行重启路由器，共分两种情况，每种情况在 `/system/watchdog` 中都有各自的设置：

- 当系统停止响应时，软件看门狗定时器（software watchdog timer）会重启路由器。这通常由硬件故障引起，重启可让设备自行恢复。该功能默认开启（`watchdog-timer=yes`）。
- 当某个 IP 地址停止响应 ping 时，ping 看门狗会重启路由器。该功能默认关闭（`watch-address=none`）。

看门狗重启是一次自动的 `/system/reboot`，并非软件故障。看门狗定时器之所以重启路由器，是因为某项服务没有按其应有的速度响应。原因可能是硬件损坏、服务的软件实现缓慢、DDoS 攻击、配置错误等。

## 当某个地址停止响应时重启 {#reboot-when-an-address-stops-answering}

远程路由器可能失去其上行链路或 VPN，并在有人重启它之前一直处于不可达状态，例如安装在桅杆上的路由器其无线链路挂起。当链路另一端的某个地址停止响应时，ping 看门狗会重启这样的路由器：

```ros
/system/watchdog/set watch-address=192.0.2.1
```

请使用一个稳定在线、且路由器能通过你所关注的链路到达的地址，例如上行的网关。对于 VPN，请监视隧道内部的地址，例如远端的隧道地址，而不是其公网地址：隧道断开时公网地址仍可能响应。一个因自身原因而下线的地址，会重启一台本来正常工作的路由器。

路由器会 ping 该地址六次，分布在 `ping-timeout` 时间内（默认 1 分钟，即每 10 秒一次 ping），当六次 ping 全部失败时重启。启动后，它会等待 `ping-start-after-boot`（默认 5 分钟）才发出第一次 ping。在已运行时间超过 `ping-start-after-boot` 的路由器上，设置 `watch-address` 会立即开始 ping。

请将 `ping-start-after-boot` 设置得比链路在启动后建立连接所需的时间更长，例如 VPN 或 LTE 连接。否则路由器会在链路建立之前就重启。每次重启后，这段时间也是你登录并设置 `watch-address=none` 的窗口。

:::warning
如果该地址一直不可达，路由器会在每次启动后再次重启，间隔为 `ping-start-after-boot` 加 `ping-timeout`：使用默认值大约每 6 分钟一次。请谨慎选择地址，并保留另一条进入途径，例如控制台访问或从邻居处使用 MAC Telnet。
:::

要关闭 ping 看门狗：

```ros
/system/watchdog/set watch-address=none
```

只要该地址不响应，ping 看门狗就会一直重启。若想限制重启次数，或在地址停止响应时执行其他操作，请使用带脚本的 [网络监控](./netwatch.md)。

## 查明路由器重启的原因 {#see-why-the-router-rebooted}

在 ping 看门狗重启之后，日志会显示以下条目（第一条的主题为 `system,error,critical`）：

```text
System rebooted because of ping watchdog timeout
router rebooted
```

ping 看门狗重启不会写入支持输出文件（`autosupout.rif`）。

## 崩溃后的支持输出 {#support-output-after-a-crash}

当软件发生故障时，路由器会自行写入 `autosupout.rif`（`automatic-supout=yes`，默认开启），并将上一个文件重命名为 `autosupout.old.rif`。请将这些文件连同问题描述一起发送给 MikroTik 支持。有关支持输出文件的更多信息，请参阅 [Supout.rif](../getting-started/supout-rif.md)。

路由器也可以通过电子邮件发送该文件。例如，通过 SMTP 服务器 `192.0.2.1` 将其发送到 `support@example.com`：

```ros
/system/watchdog/set auto-send-supout=yes \
    send-email-to=support@example.com send-smtp-server=192.0.2.1
```

当 `send-email-from` 或 `send-smtp-server` 未设置时，路由器会使用 [`/tool/e-mail`](../system-information-and-utilities/e-mail.md) 中的值。当 `auto-send-supout=no` 时，`print` 不会显示电子邮件设置。

## 技术细节 {#technical-details}

### Ping 间隔 {#ping-interval}

两次 ping 之间的间隔为 `ping-timeout` 除以六：默认 `1m` 时为 10 秒，`2m` 时为 20 秒。重启会在第六次 ping 失败后几秒钟发生，因此大约在第一次 ping 失败后 `ping-timeout` 时间发生。

较旧的导出配置将 `ping-start-after-boot` 称为 `no-ping-delay`。

### 软件看门狗定时器 {#software-watchdog-timer}

当 `watchdog-timer=yes` 时，如果系统一分钟内无响应，路由器就会重启。设置 `watchdog-timer=no` 可将其关闭。

有关所有参数，请参阅 [`/system/watchdog`](../cli-reference/system/watchdog.md) CLI 参考。
