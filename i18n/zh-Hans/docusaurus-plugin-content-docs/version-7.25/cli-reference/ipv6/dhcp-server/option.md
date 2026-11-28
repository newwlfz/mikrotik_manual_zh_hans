---
title: "option"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/dhcp-server/option
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ipv6/dhcp-server/option 
**类型：** 目录

DHCPv6 服务器可以发送的其他选项，可通过 `dhcp-option` 分配给服务器或绑定，也可以分组到选项集中。详情请参阅 [DHCPv6 Server](/docs/network-management/dhcp/dhcpv6-server)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Name of the option, used where options are assigned.</ArgTableRow>
<ArgTableRow arg="code" typ="num" mandatory="1">DHCPv6 option code, for example 23 for DNS servers.</ArgTableRow>
<ArgTableRow arg="value" typ="string">Value of the option, in the same syntax as DHCP server option values. An IPv6 address in quotes is sent as 16 bytes, for example `'2001:db8::53'`.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="raw-value" typ="string">The option value as it is sent, in hex.</ArgTableRow>
</ArgTable>
