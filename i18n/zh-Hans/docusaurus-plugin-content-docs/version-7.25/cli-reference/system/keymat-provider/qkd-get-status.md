---
title: "qkd-get-status"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/keymat-provider/qkd-get-status
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/system/leds"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## system/keymat-provider/qkd-get-status 
**类型：** 命令

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="sae-id" typ="string">if not specified, peer-sae-id will be used</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="source-kme-id" typ="string"></ArgTableRow>
<ArgTableRow arg="target-kme-id" typ="string"></ArgTableRow>
<ArgTableRow arg="master-sae-id" typ="string"></ArgTableRow>
<ArgTableRow arg="slave-sae-id" typ="string"></ArgTableRow>
<ArgTableRow arg="key-size" typ="num"></ArgTableRow>
<ArgTableRow arg="stored-key-count" typ="num"></ArgTableRow>
<ArgTableRow arg="max-key-count" typ="num"></ArgTableRow>
<ArgTableRow arg="max-key-per-request" typ="num"></ArgTableRow>
<ArgTableRow arg="max-key-size" typ="num"></ArgTableRow>
<ArgTableRow arg="min-key-size" typ="num"></ArgTableRow>
<ArgTableRow arg="max-sae-id-count" typ="num"></ArgTableRow>
</ArgTable>
