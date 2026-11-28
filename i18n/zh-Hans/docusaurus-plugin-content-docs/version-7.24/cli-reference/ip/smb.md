---
title: "smb"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/smb
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/smb 
**条件：** !smips
**类型：** 设置目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="enum (no | auto | yes)"></ArgTableRow>
<ArgTableRow arg="domain" typ="string"></ArgTableRow>
<ArgTableRow arg="comment" typ="string"></ArgTableRow>
<ArgTableRow arg="interfaces" typ="multi { array-id, interface: iface_enum { all:0 }
 }"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="status" typ="string"></ArgTableRow>
</ArgTable>
