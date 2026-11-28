---
title: "async-data"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/iot/bluetooth/connections/async-data
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## iot/bluetooth/connections/async-data 
**包：** iot
**类型：** 目录

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="pdev" typ="string"></ArgTableRow>
<ArgTableRow arg="uuid" typ="string"></ArgTableRow>
<ArgTableRow arg="data-text" typ="string"></ArgTableRow>
<ArgTableRow arg="data-hex" typ="string"></ArgTableRow>
<ArgTableRow arg="data-bytes" typ="multi { array-id, value: num
 }"></ArgTableRow>
<ArgTableRow arg="type" typ="enum (notification | indication) { notification:0x01, indication:0x02 }"></ArgTableRow>
<ArgTableRow arg="time" typ="date"></ArgTableRow>
</ArgTable>
