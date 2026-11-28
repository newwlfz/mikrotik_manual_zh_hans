---
title: "option"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/dhcp-server/option
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/option 
**类型：** 目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="code" typ="alt { number: num [1 .. 254]
, option: enum (vendor-specific) { vendor-specific:43 }
 }" mandatory="1"></ArgTableRow>
<ArgTableRow arg="value" typ="string">0x - exact hex value, '' - string or IP address value</ArgTableRow>
<ArgTableRow arg="force" typ="bool">always include this option in reply</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="raw-value" typ="string"></ArgTableRow>
</ArgTable>
