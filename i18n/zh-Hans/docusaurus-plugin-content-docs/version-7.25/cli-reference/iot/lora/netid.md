---
title: "netid"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/iot/lora/netid
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## iot/lora/netid 
**包：** iot
**类型：** 目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="logging" typ="bool"></ArgTableRow>
<ArgTableRow arg="type" typ="enum (whitelist | blacklist) { whitelist:1, blacklist:2 }"></ArgTableRow>
<ArgTableRow arg="netids" typ="object { range: composite { min: string
, max: string
 }
 }"></ArgTableRow>
</ArgTable>
