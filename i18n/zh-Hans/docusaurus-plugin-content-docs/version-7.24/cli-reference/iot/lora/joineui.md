---
title: "joineui"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/iot/lora/joineui
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## iot/lora/joineui 
**包：** iot
**类型：** 目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="logging" typ="bool"></ArgTableRow>
<ArgTableRow arg="type" typ="enum (whitelist | blacklist) { whitelist:1, blacklist:2 }"></ArgTableRow>
<ArgTableRow arg="joineuis" typ="object { range: composite { min: string
, max: string
 }
 }"></ArgTableRow>
</ArgTable>
