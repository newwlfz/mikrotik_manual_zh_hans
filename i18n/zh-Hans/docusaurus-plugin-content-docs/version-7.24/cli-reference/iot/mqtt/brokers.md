---
title: "brokers"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/iot/mqtt/brokers
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "cli-reference/iot/mqtt"
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## iot/mqtt/brokers 
**包：** iot
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="W" typ="Will message enabled"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="address" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="port" typ="num"></ArgTableRow>
<ArgTableRow arg="ssl" typ="bool"></ArgTableRow>
<ArgTableRow arg="client-id" typ="string"></ArgTableRow>
<ArgTableRow arg="username" typ="string"></ArgTableRow>
<ArgTableRow arg="password" typ="string"></ArgTableRow>
<ArgTableRow arg="will-topic" typ="string"></ArgTableRow>
<ArgTableRow arg="will-message" typ="string"></ArgTableRow>
<ArgTableRow arg="will-qos" typ="num"></ArgTableRow>
<ArgTableRow arg="will-retain" typ="bool"></ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none)"></ArgTableRow>
<ArgTableRow arg="auto-connect" typ="bool"></ArgTableRow>
<ArgTableRow arg="keep-alive" typ="num"></ArgTableRow>
<ArgTableRow arg="parallel-scripts-limit" typ="num"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="connected" typ="bool"></ArgTableRow>
</ArgTable>
