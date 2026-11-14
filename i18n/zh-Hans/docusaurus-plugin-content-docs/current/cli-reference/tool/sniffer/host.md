---
sidebar_key: "cli-reference/tool/sniffer/host"
sidebar_position: 2
title: "host"
sidebar_label: 'host'
source: https://manual.mikrotik.com/docs/cli-reference/tool/sniffer/host
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/sniffer/host {#toolsnifferhost}
**类型：** 目录

上次捕获流量中涉及的地址，及其速率和字节数。请参阅 [数据包嗅探器](../../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="ipAddr">在捕获的数据包中看到的地址。</ArgTableRow>
<ArgTableRow arg="rate" typ="composite { in: num
, out: num
 }">捕获到的该地址流量的速率，以比特每秒为单位，包含两个值：in（到该地址）和 out（从该地址）。这些速率在捕获停止时计算；在 sniffer 运行期间，它们显示为 0。</ArgTableRow>
<ArgTableRow arg="peak-rate" typ="composite { in: num
, out: num
 }">捕获期间捕获到的该地址流量的最高速率，以比特每秒为单位（in/out），在捕获停止时计算。</ArgTableRow>
<ArgTableRow arg="total" typ="composite { in: num
, out: num
 }">捕获到的该地址流量字节数：in（到该地址）和 out（从该地址）。</ArgTableRow>
</ArgTable>
