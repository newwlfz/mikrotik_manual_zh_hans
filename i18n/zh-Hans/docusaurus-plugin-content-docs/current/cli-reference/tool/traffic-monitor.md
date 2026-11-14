---
sidebar_key: "cli-reference/tool/traffic-monitor"
sidebar_position: 27
title: "traffic-monitor"
sidebar_label: 'traffic-monitor'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-monitor {#tooltraffic-monitor}
**类型：** 目录

阈值触发器：当接口的发送或接收速率越过阈值时，运行一个[脚本](../../developer-guides/scripting/index.md)（`on-event`）。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">流量监控条目的名称</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">监控其速率的接口</ArgTableRow>
<ArgTableRow arg="traffic" typ="enum (transmitted | received) { transmitted:1, received:2 }">要监控的方向：`transmitted` 或 `received`</ArgTableRow>
<ArgTableRow arg="trigger" typ="enum (above | below | always) { above:1, below:2, always:3 }">`on-event` 的运行时机：速率超过 `above` 阈值时、低于 `below` 阈值时，或 `always`（每次轮询时）。</ArgTableRow>
<ArgTableRow arg="threshold" typ="num">触发器用于比较的流量速率，单位为比特每秒</ArgTableRow>
<ArgTableRow arg="on-event" typ="alt { script: string
 }">触发条件满足时运行的脚本</ArgTableRow>
</ArgTable>
