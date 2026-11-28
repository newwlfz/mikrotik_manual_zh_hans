---
title: "qkd-get-key"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/keymat-provider/qkd-get-key
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/keymat-provider/qkd-get-key 
**类型：** 命令

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="additional-sae-ids" typ="multi { array-id, sae-id: string
 }">additional SAEs which will also get the generated key</ArgTableRow>
<ArgTableRow arg="number" typ="num">number of keys to generate</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="keys" typ="object { qkd-key: super { key-id: string
, [key] : string
 }
 }"></ArgTableRow>
</ArgTable>
