---
title: "target"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/traffic-flow/target
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ip/upnp"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## ip/traffic-flow/target 
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="src-address" typ="alt { ip: ipAddr
, ipv6: ip6Addr
 }"></ArgTableRow>
<ArgTableRow arg="dst-address" typ="alt { ip: ipAddr
, ipv6: ip6Addr
 }" mandatory="1"></ArgTableRow>
<ArgTableRow arg="port" typ="num"></ArgTableRow>
<ArgTableRow arg="version" typ="enum (1 | 5 | 9 | ipfix) { 1:1, 5:5, 9:9, ipfix:10 }"></ArgTableRow>
<ArgTableRow arg="v9-template-refresh" typ="num"></ArgTableRow>
<ArgTableRow arg="v9-template-timeout" typ="time"></ArgTableRow>
</ArgTable>
