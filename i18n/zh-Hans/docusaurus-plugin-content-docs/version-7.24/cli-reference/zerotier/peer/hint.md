---
title: "hint"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/zerotier/peer/hint
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "cli-reference/zerotier/peer"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## zerotier/peer/hint 
**包：** zerotier
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="instance" typ="enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="identity" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="addresses" typ="multi { array-id, array-id, address: composite { addr: address (flags=46)
, port: num [1 .. 65535]
 }
 }" mandatory="1"></ArgTableRow>
</ArgTable>
