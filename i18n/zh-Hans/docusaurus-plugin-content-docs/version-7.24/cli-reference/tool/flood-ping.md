---
title: "flood-ping"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/tool/flood-ping
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "cli-reference/tool/graphing"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/flood-ping 
**条件：** !smips
**类型：** Command

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }"></ArgTableRow>
<ArgTableRow arg="count" typ="num"></ArgTableRow>
<ArgTableRow arg="size" typ="num"></ArgTableRow>
<ArgTableRow arg="timeout" typ="time"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="sent" typ="num"></ArgTableRow>
<ArgTableRow arg="received" typ="num"></ArgTableRow>
<ArgTableRow arg="min-rtt" typ="time"></ArgTableRow>
<ArgTableRow arg="avg-rtt" typ="time"></ArgTableRow>
<ArgTableRow arg="max-rtt" typ="time"></ArgTableRow>
</ArgTable>
