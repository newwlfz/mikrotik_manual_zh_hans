---
title: "read-holding-registers"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/iot/modbus/read-holding-registers
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/iot/modbus"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## iot/modbus/read-holding-registers 
**包：** iot
**类型：** Command

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="ip" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="port" typ="num"></ArgTableRow>
<ArgTableRow arg="timeout" typ="num"></ArgTableRow>
<ArgTableRow arg="slave-id" typ="num"></ArgTableRow>
<ArgTableRow arg="reg-addr" typ="num"></ArgTableRow>
<ArgTableRow arg="num-regs" typ="num"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="values" typ="multi { array-id, value: num
 }"></ArgTableRow>
</ArgTable>
