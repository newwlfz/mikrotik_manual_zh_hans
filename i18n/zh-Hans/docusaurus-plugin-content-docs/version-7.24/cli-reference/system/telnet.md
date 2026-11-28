---
title: "telnet"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/telnet
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "cli-reference/system/ups"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/telnet
**类型：** Command

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="alt { ip-address: ipAddr
, ipv6-address: composite { addr: ip6Addr
, interface: [ iface_enum]
 }
 }"></ArgTableRow>
<ArgTableRow arg="port" typ="num"></ArgTableRow>
<ArgTableRow arg="vrf" typ="enum"></ArgTableRow>
</ArgTable>
