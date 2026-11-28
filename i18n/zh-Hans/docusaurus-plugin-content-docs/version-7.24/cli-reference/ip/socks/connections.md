---
title: "connections"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/socks/connections
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/socks/connections 
**类型：** 目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="src-address" typ="composite { address: alt { addr-ipv4: ipAddr
, addr-ipv6: ip6Addr
 }
, port: num
 }"></ArgTableRow>
<ArgTableRow arg="dst-address" typ="composite { address: alt { addr-ipv4: ipAddr
, addr-ipv6: ip6Addr
, addr-domain: string
 }
, port: num
 }"></ArgTableRow>
<ArgTableRow arg="type" typ="enum (unknown | out | in) { unknown:0, out:1, in:2 }"></ArgTableRow>
<ArgTableRow arg="tx" typ="num"></ArgTableRow>
<ArgTableRow arg="rx" typ="num"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="user" typ="enum"></ArgTableRow>
</ArgTable>
