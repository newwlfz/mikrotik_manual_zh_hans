---
title: "bandwidth-server"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/tool/bandwidth-server
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/bandwidth-server 
**类型：** 设置目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool"></ArgTableRow>
<ArgTableRow arg="authenticate" typ="bool"></ArgTableRow>
<ArgTableRow arg="allocate-udp-ports-from" typ="num">Beginning of UDP port range</ArgTableRow>
<ArgTableRow arg="max-sessions" typ="num">Maximal simultaneous test count</ArgTableRow>
<ArgTableRow arg="allowed-addresses4" typ="object { address: ipPrefix
 }"></ArgTableRow>
<ArgTableRow arg="allowed-addresses6" typ="object { address: ip6Prefix
 }"></ArgTableRow>
</ArgTable>
