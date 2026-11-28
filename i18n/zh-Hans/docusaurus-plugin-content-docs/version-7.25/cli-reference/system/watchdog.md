---
title: "watchdog"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/watchdog
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/task"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/watchdog 
**类型：** 设置目录

当系统停止响应（软件看门狗定时器）或某个 IP 地址停止响应 ping（ping 看门狗）时重启路由器，并在软件故障后写入 support 输出文件。请参阅 [Watchdog](/docs/diagnostics-monitoring-and-troubleshooting/watchdog)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="watch-address" typ="alt { ip: ipAddr
, ipv6: composite { address: ip6Addr
, interface: [ iface_enum]
 }
 }">Address the ping watchdog pings. The router sends six pings over `ping-timeout` and reboots when all six fail. `none` turns the ping watchdog off. Use an address that is reliably up and reached through the link to watch, such as the gateway or, for a VPN, the tunnel address of the far end. If it stays unreachable, the router reboots again after every boot, about every `ping-start-after-boot` plus `ping-timeout`. Default: none.</ArgTableRow>
<ArgTableRow arg="watchdog-timer" typ="bool">Whether the router reboots when the system is unresponsive for a minute. Default: yes.</ArgTableRow>
<ArgTableRow arg="ping-start-after-boot" typ="time">Time after a boot before the ping watchdog sends its first ping to `watch-address`. On a router that has been up longer than this time, setting `watch-address` starts the pings at once. Set it longer than the watched link needs to come up after a boot. Older exports call it `no-ping-delay`. Default: 5m.</ArgTableRow>
<ArgTableRow arg="ping-timeout" typ="time">Time over which the ping watchdog sends six pings to `watch-address`, one every `ping-timeout` divided by six. The router reboots when all six fail. Default: 1m.</ArgTableRow>
<ArgTableRow arg="automatic-supout" typ="bool">Whether the router writes `autosupout.rif` when the software fails. The previous file is renamed to `autosupout.old.rif`. A ping watchdog reboot does not write the file. Default: yes.</ArgTableRow>
<ArgTableRow arg="auto-send-supout" typ="bool">Whether the router sends the automatic support output file by email to `send-email-to`. Default: no.</ArgTableRow>
<ArgTableRow arg="send-email-to" typ="string">Email address the automatic support output file is sent to, with `auto-send-supout=yes`.</ArgTableRow>
<ArgTableRow arg="send-email-from" typ="string">Sender address of the email with the automatic support output file. When not set, the value from `/tool/e-mail` is used.</ArgTableRow>
<ArgTableRow arg="send-smtp-server" typ="alt { ipv4: ipAddr
, fqdn: string
 }">SMTP server, as an IPv4 address or a name, that sends the email with the automatic support output file. When not set, the value from `/tool/e-mail` is used.</ArgTableRow>
</ArgTable>
