---
sidebar_key: "cli-reference/tool/flood-ping"
sidebar_position: 8
title: "flood-ping"
sidebar_label: 'flood-ping'
source: https://manual.mikrotik.com/docs/cli-reference/tool/flood-ping
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/flood-ping {#toolflood-ping}
**条件：** !smips
**类型：** 命令

向一台主机发送一系列 ICMP echo 请求，并且只显示总计。在 SMIPS 设备上不可用。需要 `traffic-gen` 设备模式功能；如果没有该功能，命令会失败并显示 `failure: not allowed by device-mode`。有关示例，请参阅 [泛洪 Ping](../../diagnostics-monitoring-and-troubleshooting/flood-ping.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">要 ping 的主机的 IPv4 或 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="count" typ="num">要发送的请求数，`0..1000`。</ArgTableRow>
<ArgTableRow arg="size" typ="num">每个请求的大小，`10..1500`。</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">等待每个回复的时长，`00:00:00.010..00:00:05`（10 ms 到 5 s）。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="sent" typ="num">已发送的请求数。</ArgTableRow>
<ArgTableRow arg="received" typ="num">已接收的回复数。与 `sent` 的差值即为丢包数。</ArgTableRow>
<ArgTableRow arg="min-rtt" typ="time">本次运行的最短往返时间。</ArgTableRow>
<ArgTableRow arg="avg-rtt" typ="time">本次运行的平均往返时间。</ArgTableRow>
<ArgTableRow arg="max-rtt" typ="time">本次运行的最长往返时间。</ArgTableRow>
</ArgTable>
