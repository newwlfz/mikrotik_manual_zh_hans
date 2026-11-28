---
title: "interface"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/lcd/interface
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## lcd/interface 
**Conditions:** !smips
**Syscap:** lcd
**Type:** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="*" typ="default">default</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">inactive</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="D" typ="displayed">displayed</ArgTableRow>
<ArgTableRow arg="W" typ="default-wireless">default-wireless</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="timeout" typ="time"></ArgTableRow>
<ArgTableRow arg="max-speed" typ="num" mandatory="1"></ArgTableRow>
</ArgTable>
