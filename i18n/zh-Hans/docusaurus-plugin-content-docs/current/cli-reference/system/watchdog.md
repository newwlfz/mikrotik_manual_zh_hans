---
sidebar_key: "cli-reference/system/watchdog"
sidebar_position: 37
title: "watchdog"
sidebar_label: 'watchdog'
source: https://manual.mikrotik.com/docs/cli-reference/system/watchdog
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/watchdog {#systemwatchdog}
**类型:** 设置目录

当系统停止响应（软件 watchdog 定时器）或某个 IP 地址停止响应 ping（ping watchdog）时重启路由器，并在软件故障后写入支持输出文件。参见 [看门狗](../../diagnostics-monitoring-and-troubleshooting/watchdog.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="watch-address" typ="alt { ip: ipAddr
, ipv6: composite { address: ip6Addr
, interface: [ iface_enum]
 }
 }">ping 看门狗所 ping 的地址。路由器在 `ping-timeout` 时间内发送六次 ping，当六次全部失败时重启。`none` 会关闭 ping 看门狗。请使用一个可靠在线、并能通过要监视的链路访问到的地址，例如网关；对于 VPN，则使用远端的隧道地址。如果该地址一直不可达，路由器会在每次启动后再次重启，大约每隔 `ping-start-after-boot` 加上 `ping-timeout` 的时间。默认值：none。</ArgTableRow>
<ArgTableRow arg="watchdog-timer" typ="bool">系统无响应达一分钟时，路由器是否重启。默认值：yes。</ArgTableRow>
<ArgTableRow arg="ping-start-after-boot" typ="time">启动后到 ping 看门狗向 `watch-address` 发送第一次 ping 之前的时间。在已运行超过该时间的路由器上，设置 `watch-address` 会立即开始发送 ping。请将其设置得比被监视链路在启动后建立连接所需的时间更长。较旧的导出中称其为 `no-ping-delay`。默认值：5m。</ArgTableRow>
<ArgTableRow arg="ping-timeout" typ="time">ping 看门狗向 `watch-address` 发送六次 ping 所使用的时间，即每隔 `ping-timeout` 的六分之一发送一次。当六次全部失败时，路由器会重启。默认值：1m。</ArgTableRow>
<ArgTableRow arg="automatic-supout" typ="bool">软件发生故障时，路由器是否写入 `autosupout.rif`。先前的文件会被重命名为 `autosupout.old.rif`。ping 看门狗触发的重启不会写入该文件。默认值：yes。</ArgTableRow>
<ArgTableRow arg="auto-send-supout" typ="bool">路由器是否将自动支持输出文件通过电子邮件发送到 `send-email-to`。默认值：no。</ArgTableRow>
<ArgTableRow arg="send-email-to" typ="string">当 `auto-send-supout=yes` 时，自动支持输出文件发送到的电子邮件地址。</ArgTableRow>
<ArgTableRow arg="send-email-from" typ="string">包含自动支持输出文件的电子邮件的发件人地址。未设置时，使用 `/tool/e-mail` 中的值。</ArgTableRow>
<ArgTableRow arg="send-smtp-server" typ="alt { ipv4: ipAddr
, fqdn: string
 }">用于发送包含自动支持输出文件的电子邮件的 SMTP 服务器，可为 IPv4 地址或名称。未设置时，使用 `/tool/e-mail` 中的值。</ArgTableRow>
</ArgTable>
