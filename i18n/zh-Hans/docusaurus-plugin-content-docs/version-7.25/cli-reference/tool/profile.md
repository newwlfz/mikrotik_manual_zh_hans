---
title: "profile"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/profile
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/tool/romon"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## tool/profile
**类型：** 命令

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="cpu" typ="enum (all | total) { all:0xfffffffe, total:0xfffffffd }" syscap="smp"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="cpu" typ="num" syscap="smp"></ArgTableRow>
<ArgTableRow arg="usage" typ="num"></ArgTableRow>
</ArgTable>
