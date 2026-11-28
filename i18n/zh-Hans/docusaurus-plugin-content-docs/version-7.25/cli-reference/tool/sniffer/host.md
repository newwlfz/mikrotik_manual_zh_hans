---
title: "host"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/sniffer/host
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/sniffer/host 
**类型：** 目录

参与最近一次抓包流量的地址，以及它们的速率和字节计数。请参阅 [Packet sniffer](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="ipAddr">Address seen in the captured packets.</ArgTableRow>
<ArgTableRow arg="rate" typ="composite { in: num
, out: num
 }">Rate of the address's captured traffic, in bits per second, as two values: in (to the address) and out (from the address). The rates are calculated when the capture stops; while the sniffer runs, they show 0.</ArgTableRow>
<ArgTableRow arg="peak-rate" typ="composite { in: num
, out: num
 }">Highest rate of the address's captured traffic during the capture, in bits per second (in/out), calculated when the capture stops.</ArgTableRow>
<ArgTableRow arg="total" typ="composite { in: num
, out: num
 }">Captured bytes of the address's traffic: in (to the address) and out (from the address).</ArgTableRow>
</ArgTable>
