---
sidebar_key: "cli-reference/tool/sniffer/save"
sidebar_position: 6
title: "save"
sidebar_label: 'save'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/sniffer/save
captured_at: '2026-11-01T21:25:59+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/sniffer/save {#toolsniffersave}
**类型：** 命令

将内存中的数据包写入文件。从 RouterOS 7.20 起，文件始终为 pcapng 格式，即使扩展名为 `.pcap`；它会包含每个数据包的接口名称、方向以及纳秒级时间戳。请参阅[数据包嗅探器](../../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="file-name" typ="file">要写入的文件名，例如 `capture.pcap`。</ArgTableRow>
</ArgTable>
