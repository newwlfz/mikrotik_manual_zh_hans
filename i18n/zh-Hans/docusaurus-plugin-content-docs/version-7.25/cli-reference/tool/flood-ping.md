---
title: "flood-ping"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/flood-ping
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/tool/graphing"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/flood-ping 
**条件：** !smips
**类型：** Command

向一台主机发送一系列 ICMP echo 请求，仅显示汇总结果。SMIPS 设备不支持该功能。需要 `traffic-gen` device-mode 功能；否则命令将失败并返回 `failure: not allowed by device-mode`。示例请参阅 [Flood Ping](/docs/diagnostics-monitoring-and-troubleshooting/flood-ping)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">IPv4 or IPv6 address of the host to ping.</ArgTableRow>
<ArgTableRow arg="count" typ="num">Number of requests to send, `0..1000`.</ArgTableRow>
<ArgTableRow arg="size" typ="num">Size of each request, `10..1500`.</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">How long to wait for each reply, `00:00:00.010..00:00:05` (10 ms to 5 s).</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="sent" typ="num">Number of requests sent.</ArgTableRow>
<ArgTableRow arg="received" typ="num">Number of replies received. The difference from `sent` is the packet loss.</ArgTableRow>
<ArgTableRow arg="min-rtt" typ="time">Shortest round-trip time of the run.</ArgTableRow>
<ArgTableRow arg="avg-rtt" typ="time">Average round-trip time of the run.</ArgTableRow>
<ArgTableRow arg="max-rtt" typ="time">Longest round-trip time of the run.</ArgTableRow>
</ArgTable>
