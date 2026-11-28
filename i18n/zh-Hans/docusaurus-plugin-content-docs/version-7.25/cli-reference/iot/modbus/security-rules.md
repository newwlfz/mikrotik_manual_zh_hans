---
title: "security-rules"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/iot/modbus/security-rules
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## iot/modbus/security-rules
**包：** iot
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="ip-range" typ="ipRange" mandatory="1"></ArgTableRow>
<ArgTableRow arg="allowed-function-codes" typ="multi { array-id, value: num
 }" mandatory="1"></ArgTableRow>
</ArgTable>
