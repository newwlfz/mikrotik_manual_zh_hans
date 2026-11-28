---
title: "protocol"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/sniffer/protocol
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/sniffer/protocol 
**类型：** 目录

按 MAC 协议、IP 协议和端口统计最近一次捕获的数据包和字节数，并显示每行占所有捕获字节数的比例。数据包会计入其所属的所有行：对于 TCP 数据包，会计入 `ip` 行、`ip`/`tcp` 行以及其每个端口对应的行。请参阅 [Packet sniffer](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="protocol" typ="enum ()">MAC (L2) protocol, for example `ip`, `arp`, `ipv6` or `802.2`.</ArgTableRow>
<ArgTableRow arg="ip-protocol" typ="enum (ip) { ip:0 }">IP protocol, for example `icmp`, `tcp` or `udp`. Empty on the row that counts a whole MAC protocol.</ArgTableRow>
<ArgTableRow arg="port" typ="enum ()">Port, with its service name where known, for example `80 (http)`. Empty on the rows that count a whole protocol.</ArgTableRow>
<ArgTableRow arg="packets" typ="num">Number of captured packets in this row.</ArgTableRow>
<ArgTableRow arg="bytes" typ="num">Number of captured bytes in this row.</ArgTableRow>
<ArgTableRow arg="share" typ="num">Share of this row's bytes in all captured bytes, in percent.</ArgTableRow>
</ArgTable>
