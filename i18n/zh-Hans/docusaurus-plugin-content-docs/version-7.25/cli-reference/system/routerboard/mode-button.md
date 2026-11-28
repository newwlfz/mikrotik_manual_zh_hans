---
title: "mode-button"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/routerboard/mode-button
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/system/routerboard"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## system/routerboard/mode-button 
**条件：** !i386
**类型：** 设置目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool">Enables or disables the button.</ArgTableRow>
<ArgTableRow arg="hold-time" typ="composite { min: time [0 .. 60]
, max: time [0 .. 60]
 }">Triggers the button action only when the button is held for a duration within the specified range.</ArgTableRow>
<ArgTableRow arg="on-event" typ="alt { script: string
 }">The name of the script to run when the button is pressed. You must create and name the script in the [Script](/docs/developer-guides/scripting) menu.</ArgTableRow>
</ArgTable>
