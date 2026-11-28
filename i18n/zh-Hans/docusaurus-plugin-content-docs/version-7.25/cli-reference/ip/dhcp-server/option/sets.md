---
title: "sets"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/option/sets
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/dhcp-server/option"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/option/sets 
**类型：** 目录

可通过 `dhcp-option-set` 将 DHCP 服务器选项组分配给网络、服务器、租约或匹配器。详情请参阅 [DHCP Server](/docs/network-management/dhcp/server)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Name of the option set.</ArgTableRow>
<ArgTableRow arg="options" typ="multi { array-id, option: enum
 }" mandatory="1">Options (`/ip/dhcp-server/option`) in the set.</ArgTableRow>
</ArgTable>
