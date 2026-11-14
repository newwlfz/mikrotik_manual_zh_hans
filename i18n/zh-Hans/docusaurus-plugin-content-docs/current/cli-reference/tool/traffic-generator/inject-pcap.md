---
sidebar_key: "cli-reference/tool/traffic-generator/inject-pcap"
sidebar_position: 1
title: "inject-pcap"
sidebar_label: 'inject-pcap'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-generator/inject-pcap
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-generator/inject-pcap {#tooltraffic-generatorinject-pcap}
**类型：** 命令
在接口上从 PCAP 或 PCAPNG 文件重放数据包。PCAPNG 是 [嗅探工具](../../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md) 保存捕获数据时使用的格式。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum">重放捕获数据包的接口。</ArgTableRow>
<ArgTableRow arg="pcap-file" typ="file">存储在路由器上的 PCAP 或 PCAPNG 文件的名称。</ArgTableRow>
<ArgTableRow arg="speed-multiplier" typ="num">相对于捕获速率的重放速度倍数（1 表示按实时速度重放）。</ArgTableRow>
<ArgTableRow arg="loop" typ="bool">是否循环重放捕获内容。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="iteration" typ="num">当前重放迭代编号（在循环模式下）。</ArgTableRow>
<ArgTableRow arg="tx-packets" typ="num">目前已重放的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-bytes" typ="num">目前已重放的字节数。</ArgTableRow>
</ArgTable>
