---
sidebar_key: "cli-reference/ipv6/dhcp-client/option"
sidebar_position: 1
title: "option"
sidebar_label: 'option'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/dhcp-client/option
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-client/option {#ipv6dhcp-clientoption}
**类型：** 目录

DHCPv6 客户端可发送给 DHCPv6 服务器的选项。客户端会发送其 `dhcp-options` 属性中列出的选项。详情请参见 [DHCPv6 客户端](../../../network-management/dhcp/dhcpv6-client.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">预定义选项。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">选项的名称，用于客户端的 `dhcp-options` 属性。</ArgTableRow>
<ArgTableRow arg="code" typ="num" mandatory="1">DHCPv6 选项代码。</ArgTableRow>
<ArgTableRow arg="value" typ="string">选项的值，语法与 DHCP 服务器选项值相同。预定义的 `fqdn` 选项使用变量 `$(HOSTNAME)`（路由器的身份）和 `$(HOSTNAME_LEN)`（其长度）：`0x00$(HOSTNAME_LEN)$(HOSTNAME)`。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="raw-value" typ="string">发送时的选项值，以十六进制表示。</ArgTableRow>
</ArgTable>
