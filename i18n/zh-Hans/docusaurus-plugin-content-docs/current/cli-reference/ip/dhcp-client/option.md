---
sidebar_key: "cli-reference/ip/dhcp-client/option"
sidebar_position: 1
title: "option"
sidebar_label: 'option'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dhcp-client/option
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-client/option {#ipdhcp-clientoption}
**类型：** 目录

DHCP 客户端可以发送给 DHCP 服务器的选项。客户端会发送其 `dhcp-options` 属性中列出的选项。详情请参阅 [DHCP 客户端](../../../network-management/dhcp/client.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">预定义选项。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">选项的名称，用于客户端的 `dhcp-options` 属性。</ArgTableRow>
<ArgTableRow arg="code" typ="alt { number: num [1 .. 254]
, option: enum (hostname | vendor-specific | vendor-class-id | client-id) { hostname:12, vendor-specific:43, vendor-class-id:60, client-id:61 }
 }" mandatory="1">DHCP 选项代码（1-254），或以下名称之一：`hostname` (12)、`vendor-specific` (43)、`vendor-class-id` (60) 或 `client-id` (61)。</ArgTableRow>
<ArgTableRow arg="value" typ="string">
选项的值，语法与 DHCP 服务器选项值相同。该值可以包含这些变量：
- `$(HOSTNAME)` - 路由器的标识。
- `$(CLIENT_MAC)` - 客户端接口的 MAC 地址。
- `$(CLIENT_DUID)` - 路由器的 DUID，与 DHCPv6 客户端使用的 DUID 相同。
</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="raw-value" typ="string">发送时的选项值，以十六进制表示。</ArgTableRow>
</ArgTable>
