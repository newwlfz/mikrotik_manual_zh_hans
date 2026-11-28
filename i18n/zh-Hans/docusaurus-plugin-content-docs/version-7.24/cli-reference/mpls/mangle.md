---
title: "mangle"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/mpls/mangle
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## mpls/mangle
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="chain" typ="ubit (forward, output)" unset="1"></ArgTableRow>
<ArgTableRow arg="exp" typ="ubit (0, 1, 2, 3, 4, 5, 6, 7)" unset="1"></ArgTableRow>
<ArgTableRow arg="set-exp" typ="enum (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) { 0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7 }" unset="1"></ArgTableRow>
<ArgTableRow arg="set-mark" typ="enum" unset="1"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="packets" typ="num"></ArgTableRow>
</ArgTable>
