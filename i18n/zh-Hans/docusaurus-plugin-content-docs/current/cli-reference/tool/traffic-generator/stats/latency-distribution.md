---
sidebar_key: "cli-reference/tool/traffic-generator/stats/latency-distribution"
sidebar_position: 1
title: "latency-distribution"
sidebar_label: 'latency-distribution'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-generator/stats/latency-distribution
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-generator/stats/latency-distribution {#tooltraffic-generatorstatslatency-distribution}
**类型：** 目录
按流或按测量序列显示落入每个延迟范围的接收数据包数量。请参阅 [流量生成器](../../../../diagnostics-monitoring-and-troubleshooting/traffic-generator.md) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="stream-id" typ="num">将输出过滤为单个 stream ID。</ArgTableRow>
<ArgTableRow arg="port" typ="enum">将输出过滤为单个端口。</ArgTableRow>
<ArgTableRow arg="seq" typ="range">将输出过滤为单个测量序列号。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="latency" typ="string">此分桶的延迟范围，例如 0-15.5us。</ArgTableRow>
<ArgTableRow arg="count" typ="num">此延迟范围内收到的数据包数量。</ArgTableRow>
<ArgTableRow arg="share" typ="num">落入此延迟范围的已接收数据包占比，以百分比表示。</ArgTableRow>
<ArgTableRow arg="graph" typ="meter">占比的图形化表示。</ArgTableRow>
</ArgTable>
