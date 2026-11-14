---
sidebar_key: "cli-reference/system/ups/index"
sidebar_position: 2
title: "ups"
sidebar_label: "ups"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/ups
captured_at: '2026-11-01T21:30:11+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ups {#systemups}
**包：** ups
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="port" typ="enum ()"></ArgTableRow>
<ArgTableRow arg="offline-time" typ="time"></ArgTableRow>
<ArgTableRow arg="min-runtime" typ="alt { never: enum (never) { never:0xffffffff }
, min-runtime: time
 }"></ArgTableRow>
<ArgTableRow arg="alarm-setting" typ="enum (immediate | delayed | low-battery | none) { immediate:0, delayed:1, low-battery:2, none:3 }"></ArgTableRow>
<ArgTableRow arg="check-capabilities" typ="bool"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="model" typ="string"></ArgTableRow>
<ArgTableRow arg="version" typ="string"></ArgTableRow>
<ArgTableRow arg="serial" typ="string"></ArgTableRow>
<ArgTableRow arg="manufacture-date" typ="string"></ArgTableRow>
<ArgTableRow arg="load" typ="num"></ArgTableRow>
<ArgTableRow arg="on-line" typ="bool"></ArgTableRow>
<ArgTableRow arg="nominal-battery-voltage" typ="num"></ArgTableRow>
<ArgTableRow arg="offline-after" typ="time"></ArgTableRow>
</ArgTable>
