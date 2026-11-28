---
title: "head"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/file/head
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## file/head
**类型：** 命令

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="n" typ="num" unset="1">number of lines</ArgTableRow>
<ArgTableRow arg="numbered" typ="switch">show line numbers</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="lines" typ="object { line: string
 }"></ArgTableRow>
</ArgTable>
