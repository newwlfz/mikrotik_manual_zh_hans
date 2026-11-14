---
sidebar_key: "cli-reference/system/history"
sidebar_position: 10
title: "history"
sidebar_label: "history"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/history
captured_at: '2026-11-01T21:29:50+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/history {#systemhistory}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="U" typ="undoable"></ArgTableRow>
<ArgTableRow arg="R" typ="redoable"></ArgTableRow>
<ArgTableRow arg="F" typ="floating-undo"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="redo" typ="cfg"></ArgTableRow>
<ArgTableRow arg="undo" typ="cfg"></ArgTableRow>
<ArgTableRow arg="action" typ="string"></ArgTableRow>
<ArgTableRow arg="by" typ="string"></ArgTableRow>
<ArgTableRow arg="policy" typ="multi { array-id, policy: enum
 }"></ArgTableRow>
<ArgTableRow arg="time" typ="date"></ArgTableRow>
<ArgTableRow arg="trace" typ="string"></ArgTableRow>
</ArgTable>
