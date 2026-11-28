---
title: "servers"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/ntp/client/servers
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/ntp/client/servers 
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="address (flags=46D)" mandatory="1"></ArgTableRow>
<ArgTableRow arg="min-poll" typ="num"></ArgTableRow>
<ArgTableRow arg="max-poll" typ="num"></ArgTableRow>
<ArgTableRow arg="iburst" typ="bool"></ArgTableRow>
<ArgTableRow arg="auth-key" typ="enum (none) { none:0 }"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="resolved-address" typ="address (flags=46)"></ArgTableRow>
</ArgTable>
