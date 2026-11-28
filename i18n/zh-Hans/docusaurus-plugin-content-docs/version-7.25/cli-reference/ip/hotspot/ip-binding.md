---
title: "ip-binding"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/hotspot/ip-binding
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## ip/hotspot/ip-binding 
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="P" typ="bypassed">bypassed</ArgTableRow>
<ArgTableRow arg="B" typ="blocked">blocked</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="mac-address" typ="macAddr"></ArgTableRow>
<ArgTableRow arg="address" typ="ipRange"></ArgTableRow>
<ArgTableRow arg="to-address" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="server" typ="enum (all) { all:0 }"></ArgTableRow>
<ArgTableRow arg="type" typ="enum (regular | bypassed | blocked) { regular:0, bypassed:1, blocked:2 }"></ArgTableRow>
</ArgTable>
