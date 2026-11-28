---
title: "option"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-client/option
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/dhcp-client"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-client/option 
**类型：** 目录

DHCP 客户端可以发送给 DHCP 服务器的选项。客户端会发送其 `dhcp-options` 属性中列出的选项。详情请参阅 [DHCP Client](/docs/network-management/dhcp/client)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="*" typ="default">Predefined option.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Name of the option, used in the `dhcp-options` property of the client.</ArgTableRow>
<ArgTableRow arg="code" typ="alt { number: num [1 .. 254]
, option: enum (hostname | vendor-specific | vendor-class-id | client-id) { hostname:12, vendor-specific:43, vendor-class-id:60, client-id:61 }
 }" mandatory="1">DHCP option code (1-254), or one of the names `hostname` (12), `vendor-specific` (43), `vendor-class-id` (60) or `client-id` (61).</ArgTableRow>
<ArgTableRow arg="value" typ="string">
Value of the option, in the same syntax as DHCP server option values. The value can contain these variables:
- `$(HOSTNAME)` - The router's identity.
- `$(CLIENT_MAC)` - MAC address of the client interface.
- `$(CLIENT_DUID)` - The router's DUID, the same DUID the DHCPv6 client uses.
</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="raw-value" typ="string">The option value as it is sent, in hex.</ArgTableRow>
</ArgTable>
