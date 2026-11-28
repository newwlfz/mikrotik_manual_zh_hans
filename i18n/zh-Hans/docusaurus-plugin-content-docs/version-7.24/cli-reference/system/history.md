---
title: "history"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/history
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/history
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="U" typ="undoable"></ArgTableRow>
<ArgTableRow arg="R" typ="redoable"></ArgTableRow>
<ArgTableRow arg="F" typ="floating-undo"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="redo" typ="cfg"></ArgTableRow>
<ArgTableRow arg="undo" typ="cfg"></ArgTableRow>
<ArgTableRow arg="action" typ="string"></ArgTableRow>
<ArgTableRow arg="by" typ="string"></ArgTableRow>
<ArgTableRow arg="policy" typ="multi { array-id, policy: enum
 }"></ArgTableRow>
<ArgTableRow arg="time" typ="date"></ArgTableRow>
<ArgTableRow arg="trace" typ="string"></ArgTableRow>
</ArgTable>
