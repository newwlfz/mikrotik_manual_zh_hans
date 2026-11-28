---
title: "sets"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/dhcp-server/option/sets
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ipv6/dhcp-server/option"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ipv6/dhcp-server/option/sets 
**类型：** 目录

可一起分配的 DHCPv6 服务器选项组。详情请参阅 [DHCPv6 Server](/docs/network-management/dhcp/dhcpv6-server)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Name of the option set.</ArgTableRow>
<ArgTableRow arg="options" typ="multi { array-id, option: enum
 }" mandatory="1">Options (`/ipv6/dhcp-server/option`) in the set.</ArgTableRow>
</ArgTable>
