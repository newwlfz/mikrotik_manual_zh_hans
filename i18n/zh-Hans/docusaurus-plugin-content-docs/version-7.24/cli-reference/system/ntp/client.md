---
title: "client"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/ntp/client
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/ntp/client 
**类型：** 设置目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool"></ArgTableRow>
<ArgTableRow arg="mode" typ="enum (unicast | broadcast | multicast | manycast)"></ArgTableRow>
<ArgTableRow arg="servers" typ="multi { server-list: address (flags=46D)
 }"></ArgTableRow>
<ArgTableRow arg="vrf" typ="enum"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="freq-drift" typ="num"></ArgTableRow>
<ArgTableRow arg="status" typ="enum (stopped | waiting | synchronized | using-local-clock)"></ArgTableRow>
<ArgTableRow arg="synced-server" typ="address (flags=46D)"></ArgTableRow>
<ArgTableRow arg="synced-stratum" typ="num"></ArgTableRow>
<ArgTableRow arg="system-offset" typ="num"></ArgTableRow>
</ArgTable>
