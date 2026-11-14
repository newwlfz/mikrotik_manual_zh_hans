---
sidebar_key: "cli-reference/tool/ping-speed"
sidebar_position: 14
title: "ping-speed"
sidebar_label: "ping-speed"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/tool/ping-speed
captured_at: '2026-11-01T21:30:18+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/ping-speed {#toolping-speed}
**条件：** !smips
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="first-ping-size" typ="num"></ArgTableRow>
<ArgTableRow arg="second-ping-size" typ="num"></ArgTableRow>
<ArgTableRow arg="time-between-pings" typ="time"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="current" typ="num"></ArgTableRow>
<ArgTableRow arg="average" typ="num"></ArgTableRow>
</ArgTable>
