---
title: "ping-speed"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/tool/ping-speed
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/ping-speed 
**条件：** !smips
**类型：** Command

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="first-ping-size" typ="num"></ArgTableRow>
<ArgTableRow arg="second-ping-size" typ="num"></ArgTableRow>
<ArgTableRow arg="time-between-pings" typ="time"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="current" typ="num"></ArgTableRow>
<ArgTableRow arg="average" typ="num"></ArgTableRow>
</ArgTable>
