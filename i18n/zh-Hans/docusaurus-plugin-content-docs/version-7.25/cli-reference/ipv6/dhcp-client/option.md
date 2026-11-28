---
title: "option"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/dhcp-client/option
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ipv6/dhcp-client"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ipv6/dhcp-client/option 
**类型：** 目录

DHCPv6 客户端可以发送给 DHCPv6 服务器的选项。客户端会发送其 `dhcp-options` 属性中列出的选项。详情请参阅 [DHCPv6 Client](/docs/network-management/dhcp/dhcpv6-client)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="*" typ="default">Predefined option.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Name of the option, used in the `dhcp-options` property of the client.</ArgTableRow>
<ArgTableRow arg="code" typ="num" mandatory="1">DHCPv6 option code.</ArgTableRow>
<ArgTableRow arg="value" typ="string">Value of the option, in the same syntax as DHCP server option values. The predefined `fqdn` option uses the variables `$(HOSTNAME)` (the router's identity) and `$(HOSTNAME_LEN)` (its length): `0x00$(HOSTNAME_LEN)$(HOSTNAME)`.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="raw-value" typ="string">The option value as it is sent, in hex.</ArgTableRow>
</ArgTable>
