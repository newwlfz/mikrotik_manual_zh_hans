---
title: "renew"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/license/renew
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/system/logging"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## system/license/renew 
**Syscap：** chr
**类型：** Command

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="account" typ="string">MikroTik.com account username.</ArgTableRow>
<ArgTableRow arg="password" typ="string">MikroTik.com account password.</ArgTableRow>
<ArgTableRow arg="level" typ="enum (p1 | p10 | p-unlimited) { p1:1, p10:2, p-unlimited:3 }">The desired CHR license level.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="status" typ="string">Status of the renewal operation.</ArgTableRow>
</ArgTable>
