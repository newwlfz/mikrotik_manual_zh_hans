---
title: "看门狗"
description: "Watchdog 在系统停止响应或某个 IP 地址停止响应 ping 时重启路由器，并在软件故障后写入 support output 文件。"
tags:
  - 'watchdog'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/watchdog
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

watchdog 会在两种情况下自行重启路由器，每种情况在 `/system/watchdog` 中都有对应设置：

- 软件 watchdog 定时器会在系统停止响应时重启路由器。这通常由硬件故障引起，重启可让设备自行恢复。该选项默认启用（`watchdog-timer=yes`）。
- ping watchdog 会在某个 IP 地址停止响应 ping 时重启路由器。该选项默认关闭（`watch-address=none`）。

watchdog 重启是自动执行的 `/system/reboot`，不是软件故障。watchdog 定时器会在服务响应速度低于预期时重启路由器。原因可能包括硬件损坏、服务的软件实现过慢、DDoS 攻击、错误配置等。

## 地址停止响应时重启 {#reboot-when-an-address-stops-answering}

远程路由器可能失去上行链路或 VPN，并在有人重启前一直无法访问，例如安装在桅杆上的路由器，其无线链路发生挂起。当链路另一端的地址停止响应时，ping watchdog 会重启此类路由器：

```ros
/system/watchdog/set watch-address=192.0.2.1
```

使用一个稳定在线、且路由器通过所关注的链路可达的地址，例如上行链路的网关。对于 VPN，应监控隧道内部的地址，例如远端的隧道地址，而不是其公网地址：隧道断开时，公网地址仍可能响应。因自身原因宕机的地址会导致正常工作的路由器重启。

路由器会向该地址发送 6 次 ping，分布在 `ping-timeout` 期间（默认 1 分钟，即每 10 秒一次），当 6 次 ping 全部失败时重启。启动后，路由器会等待 `ping-start-after-boot`（默认 5 分钟）再发送第一次 ping。对于运行时间已超过 `ping-start-after-boot` 的路由器，设置 `watch-address` 后会立即开始 ping。

将 `ping-start-after-boot` 设置为长于链路在启动后建立所需的时间，例如 VPN 或 LTE 连接。否则路由器会在链路建立前重启。每次重启后，这段时间也是你登录并设置 `watch-address=none` 的窗口。

:::warning
如果该地址始终不可达，路由器会在每次启动后再次重启，间隔为每个 `ping-start-after-boot` 加 `ping-timeout`：使用默认设置时约为每 6 分钟一次。请谨慎选择该地址，并保留另一种访问方式，例如控制台访问或从相邻设备使用 MAC Telnet。
:::

要关闭 ping watchdog：

```ros
/system/watchdog/set watch-address=none
```

只要该地址不响应，ping watchdog 就会重启。如果需要限制重启次数，或在地址停止响应时执行其他操作，请使用 [Netwatch](/docs/diagnostics-monitoring-and-troubleshooting/netwatch) 配合脚本。

## 查看路由器重启原因 {#see-why-the-router-rebooted}

`ping` watchdog 重启后，日志会显示以下条目（第一条的主题为 `system,error,critical`）：

```text
System rebooted because of ping watchdog timeout
router rebooted
```

`ping` watchdog 重启不会写入 support output 文件（`autosupout.rif`）。

## 崩溃后的 support output {#support-output-after-a-crash}

当软件发生故障时，路由器会自动写入 `autosupout.rif`（`automatic-supout=yes`，默认启用），并将之前的文件重命名为 `autosupout.old.rif`。请将这些文件连同问题描述一起发送给 MikroTik 支持。有关 support output 文件的更多信息，请参阅 [Supout.rif](/docs/getting-started/supout-rif)。

路由器也可以通过电子邮件发送文件。例如，通过 SMTP 服务器 `192.0.2.1` 将其发送至 `support@example.com`：

```ros
/system/watchdog/set auto-send-supout=yes \
    send-email-to=support@example.com send-smtp-server=192.0.2.1
```

当未设置 `send-email-from` 或 `send-smtp-server` 时，路由器使用 [`/tool/e-mail`](/docs/system-information-and-utilities/e-mail) 中的值。当 `auto-send-supout=no` 时，`print` 不显示电子邮件设置。

## 技术细节 {#technical-details}

### Ping 间隔 {#ping-interval}

Ping 之间的间隔为 `ping-timeout` 除以六：默认 `1m` 时为 10 秒，`2m` 时为 20 秒。第六次 Ping 失败后数秒会重启，因此重启时间约为第一次 Ping 失败后的 `ping-timeout`。

较旧的导出将 `ping-start-after-boot` 称为 `no-ping-delay`。

### 软件看门狗定时器 {#software-watchdog-timer}

使用 `watchdog-timer=yes` 时，如果系统一分钟无响应，路由器将重启。设置 `watchdog-timer=no` 可将其关闭。

有关所有参数，请参阅 [`/system/watchdog`](/docs/cli-reference/system/watchdog) CLI 参考。
