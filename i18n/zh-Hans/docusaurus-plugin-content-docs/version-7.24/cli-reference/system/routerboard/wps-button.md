---
title: "wps-button"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/routerboard/wps-button
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "cli-reference/system/rtrace"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/routerboard/wps-button 
**条件：** !i386
**类型：** 设置目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool"></ArgTableRow>
<ArgTableRow arg="hold-time" typ="composite { min: time [0 .. 60]
, max: time [0 .. 60]
 }"></ArgTableRow>
<ArgTableRow arg="on-event" typ="alt { script: string
 }"></ArgTableRow>
</ArgTable>
