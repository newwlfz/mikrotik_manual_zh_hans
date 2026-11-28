---
title: "save"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/sniffer/save
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/sniffer/save 
**类型：** 命令

将内存中的数据包写入文件。自 RouterOS 7.20 起，文件始终采用 pcapng 格式，即使扩展名为 `.pcap`；其中包含接口名称、方向以及每个数据包的纳秒时间戳。请参阅 [Packet sniffer](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="file-name" typ="file">Name of the file to write, for example `capture.pcap`.</ArgTableRow>
</ArgTable>
