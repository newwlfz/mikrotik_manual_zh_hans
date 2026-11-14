---
sidebar_key: "cli-reference/ipv6/dhcp-server/option/index"
sidebar_position: 1
title: "option"
sidebar_label: 'option'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/dhcp-server/option
captured_at: '2026-11-01T21:24:34+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-server/option {#ipv6dhcp-serveroption}
**类型：** 目录

DHCPv6 服务器可以发送的附加选项，通过 `dhcp-option` 分配给服务器或绑定，或分组到选项集中。详情请参阅 [DHCPv6 服务器](../../../../network-management/dhcp/dhcpv6-server.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">选项的名称，在分配选项时使用。</ArgTableRow>
<ArgTableRow arg="code" typ="num" mandatory="1">DHCPv6 选项代码，例如 23 表示 DNS 服务器。</ArgTableRow>
<ArgTableRow arg="value" typ="string">选项的值，语法与 DHCP 服务器选项值相同。带引号的 IPv6 地址会以 16 字节发送，例如 `'2001:db8::53'`。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="raw-value" typ="string">发送时的选项值，以十六进制表示。</ArgTableRow>
</ArgTable>
