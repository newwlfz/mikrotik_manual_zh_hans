---
title: "setup"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/dhcp-server/setup
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "cli-reference/ip/dns"
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/setup 
**类型：** 命令

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum"></ArgTableRow>
<ArgTableRow arg="network" typ="composite { address: ipAddr
, netmask: num [ .. 32]
 }"></ArgTableRow>
<ArgTableRow arg="gateway" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="relay" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="ippool" typ="multi { range: composite { min: ipAddr
, max: ipAddr
 }
 }"></ArgTableRow>
<ArgTableRow arg="send-dns" typ="bool"></ArgTableRow>
<ArgTableRow arg="dns-servers" typ="multi { address: ipAddr
 }"></ArgTableRow>
<ArgTableRow arg="lease-time" typ="time"></ArgTableRow>
</ArgTable>
