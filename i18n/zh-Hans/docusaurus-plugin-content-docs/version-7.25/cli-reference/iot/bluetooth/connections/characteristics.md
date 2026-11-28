---
title: "characteristics"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/iot/bluetooth/connections/characteristics
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## iot/bluetooth/connections/characteristics 
**包：** iot
**类型：** 目录

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="uuid" typ="string"></ArgTableRow>
<ArgTableRow arg="handle" typ="num"></ArgTableRow>
<ArgTableRow arg="service-name" typ="string"></ArgTableRow>
<ArgTableRow arg="service-uuid" typ="string"></ArgTableRow>
<ArgTableRow arg="props" typ="multi { array-id, props: enum (bcast | read | write-no-resp | write | notify | indicate | write-signed | ext) { bcast:0x01, read:0x02, write-no-resp:0x04, write:0x08, notify:0x10, indicate:0x20, write-signed:0x40, ext:0x80 }
 }"></ArgTableRow>
<ArgTableRow arg="pdev" typ="enum"></ArgTableRow>
</ArgTable>
