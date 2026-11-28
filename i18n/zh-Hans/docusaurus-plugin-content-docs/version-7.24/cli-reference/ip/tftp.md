---
title: "tftp"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/tftp
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/tftp 
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="ip-addresses" typ="object { ip-addresses: alt { ip6: ip6Prefix
, ip: ipRange
 }
 }"></ArgTableRow>
<ArgTableRow arg="req-filename" typ="string"></ArgTableRow>
<ArgTableRow arg="real-filename" typ="string"></ArgTableRow>
<ArgTableRow arg="allow" typ="bool"></ArgTableRow>
<ArgTableRow arg="read-only" typ="bool"></ArgTableRow>
<ArgTableRow arg="allow-rollover" typ="bool"></ArgTableRow>
<ArgTableRow arg="allow-overwrite" typ="bool"></ArgTableRow>
<ArgTableRow arg="reading-window-size" typ="alt { window-size: enum (none | pipelining) { none:0 }
 }"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="hits" typ="num"></ArgTableRow>
</ArgTable>
