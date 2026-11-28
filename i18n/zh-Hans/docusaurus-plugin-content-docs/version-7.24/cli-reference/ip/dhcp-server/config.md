---
title: "config"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/dhcp-server/config
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "cli-reference/ip/dhcp-server/lease"
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/config 
**类型：** 设置目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="store-leases-disk" typ="alt { symbolic-names: enum (immediately | never) { immediately:0, never:0xffffffff }
, time-interval: time
 }"></ArgTableRow>
<ArgTableRow arg="accounting" typ="bool"></ArgTableRow>
<ArgTableRow arg="interim-update" typ="time"></ArgTableRow>
<ArgTableRow arg="radius-password" typ="alt { user: enum (empty | same-as-user)
, password: string
 }"></ArgTableRow>
</ArgTable>
