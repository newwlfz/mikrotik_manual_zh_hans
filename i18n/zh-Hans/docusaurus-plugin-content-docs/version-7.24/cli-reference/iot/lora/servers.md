---
title: "servers"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/iot/lora/servers
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## iot/lora/servers 
**包：** iot
**类型：** 目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="address" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="up-port" typ="num"></ArgTableRow>
<ArgTableRow arg="down-port" typ="num"></ArgTableRow>
<ArgTableRow arg="key" typ="string"></ArgTableRow>
<ArgTableRow arg="port" typ="num"></ArgTableRow>
<ArgTableRow arg="interval" typ="num"></ArgTableRow>
<ArgTableRow arg="ssl" typ="bool"></ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none)"></ArgTableRow>
<ArgTableRow arg="protocol" typ="enum (UDP | LNS | CUPS)" mandatory="1"></ArgTableRow>
<ArgTableRow arg="netid" typ="multi { netid: enum
 }"></ArgTableRow>
<ArgTableRow arg="joineui" typ="multi { joineui: enum
 }"></ArgTableRow>
</ArgTable>
