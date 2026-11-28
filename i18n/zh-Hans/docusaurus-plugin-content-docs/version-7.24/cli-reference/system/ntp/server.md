---
title: "server"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/ntp/server
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "cli-reference/system/package"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/ntp/server 
**类型：** 设置目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool"></ArgTableRow>
<ArgTableRow arg="broadcast" typ="bool"></ArgTableRow>
<ArgTableRow arg="multicast" typ="bool"></ArgTableRow>
<ArgTableRow arg="manycast" typ="bool"></ArgTableRow>
<ArgTableRow arg="broadcast-addresses" typ="multi { broadcast-address: ipAddr
 }"></ArgTableRow>
<ArgTableRow arg="vrf" typ="enum"></ArgTableRow>
<ArgTableRow arg="use-local-clock" typ="bool"></ArgTableRow>
<ArgTableRow arg="local-clock-stratum" typ="num"></ArgTableRow>
<ArgTableRow arg="auth-key" typ="enum (none) { none:0 }"></ArgTableRow>
</ArgTable>
