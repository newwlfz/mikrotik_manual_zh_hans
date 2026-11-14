---
sidebar_key: "cli-reference/tool/traffic-generator/stream"
sidebar_position: 10
title: "stream"
sidebar_label: 'stream'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-generator/stream
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-generator/stream {#tooltraffic-generatorstream}
**类型：** 目录
定义生成的流量流：速率、数据包大小、数据包模板和 CPU 核心绑定。请参阅[流量生成器](../../../diagnostics-monitoring-and-troubleshooting/traffic-generator.md)指南。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">流的描述性名称。</ArgTableRow>
<ArgTableRow arg="port" typ="enum">流所经过的端口名称（来自 port 菜单）。通常取自数据包模板；可在此处覆盖。</ArgTableRow>
<ArgTableRow arg="id" typ="num">用于在统计信息以及 start/quick 命令中标识该流的流 ID。值 TOT 保留用于总计。</ArgTableRow>
<ArgTableRow arg="packet-size" typ="range">所生成数据包的 L2 大小（以字节为单位）；使用范围（例如 64-1518）可生成随机数据包大小。</ArgTableRow>
<ArgTableRow arg="pps" typ="num">该流尝试生成的每秒数据包数。</ArgTableRow>
<ArgTableRow arg="mbps" typ="num">该流尝试生成的每秒兆比特数。</ArgTableRow>
<ArgTableRow arg="packet-count" typ="num">要发送的数据包数量；`unlimited` 表示持续发送，直到该流被停止。</ArgTableRow>
<ArgTableRow arg="cpu-core" typ="range">该流所绑定的 CPU 核心（0-255），或用于多核流的核心范围。</ArgTableRow>
<ArgTableRow arg="tx-template" typ="enum" mandatory="1">用作数据包内容来源的数据包模板（来自 packet-template 或 raw-packet-template）的名称。必填。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="default-port" typ="enum">此数据流发送所使用的端口，取自数据包模板。</ArgTableRow>
</ArgTable>
