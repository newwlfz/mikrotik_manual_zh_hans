---
title: "qkd-get-key-with-ids"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/keymat-provider/qkd-get-key-with-ids
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "cli-reference/system/keymat-provider"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/keymat-provider/qkd-get-key-with-ids 
**类型：** Command

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="key-ids" typ="multi { array-id, key-id: string
 }"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="keys" typ="object { qkd-key: super { key-id: string
, [key] : string
 }
 }"></ArgTableRow>
</ArgTable>
