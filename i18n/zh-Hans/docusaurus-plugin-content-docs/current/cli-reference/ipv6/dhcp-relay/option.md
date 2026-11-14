---
sidebar_key: "cli-reference/ipv6/dhcp-relay/option"
sidebar_position: 2
title: "option"
sidebar_label: 'option'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/dhcp-relay/option
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-relay/option {#ipv6dhcp-relayoption}
**类型：** 目录

DHCPv6 中继可以添加到其发送的 Relay-Forward 消息中的选项。中继会添加其 `dhcp-options` 属性中列出的选项。有关详细信息，请参阅 [DHCP 中继](../../../network-management/dhcp/relay.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">预定义选项。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">选项名称，用于中继的 `dhcp-options` 属性。</ArgTableRow>
<ArgTableRow arg="code" typ="num" mandatory="1">DHCPv6 选项代码。</ArgTableRow>
<ArgTableRow arg="value" typ="string">选项的值，语法与 DHCP 服务器选项值相同。预定义的 `client_mac` 选项（代码 79）使用 `0x0001$(CLIENT_MAC)`，即链路层类型 Ethernet 后跟客户端的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="only-if-mac-available" typ="bool">是否仅当消息直接来自客户端（而非来自另一个中继）且客户端的 MAC 地址已知时，才添加该选项。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="raw-value" typ="string">发送时的选项值，以十六进制表示。</ArgTableRow>
</ArgTable>
