---
sidebar_key: "cli-reference/system/routerboard/mode-button"
sidebar_position: 1
title: "mode-button"
sidebar_label: "mode-button"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/routerboard/mode-button
captured_at: '2026-11-01T21:30:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/routerboard/mode-button {#systemrouterboardmode-button}
**条件：** !i386
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool"></ArgTableRow>
<ArgTableRow arg="hold-time" typ="composite { min: time [0 .. 60]
, max: time [0 .. 60]
 }"></ArgTableRow>
<ArgTableRow arg="on-event" typ="alt { script: string
 }"></ArgTableRow>
</ArgTable>
