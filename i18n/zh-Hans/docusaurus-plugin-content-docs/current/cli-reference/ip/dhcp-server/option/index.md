---
sidebar_key: "cli-reference/ip/dhcp-server/option"
title: "option"
sidebar_label: 'option'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dhcp-server/option
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/option {#ipdhcp-serveroption}
**类型：** 目录

DHCP 服务器可以发送的额外选项。使用 `dhcp-option` 将它们分配给网络、服务器或租约，或将它们分组到选项集中。当在多个层级设置同一选项时，租约优先于服务器，服务器优先于网络。有关示例，请参阅 [DHCP 服务器](../../../../network-management/dhcp/server.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">选项的名称，在分配选项时使用。</ArgTableRow>
<ArgTableRow arg="code" typ="alt { number: num [1 .. 254]
, option: enum (vendor-specific) { vendor-specific:43 }
 }" mandatory="1">DHCP 选项代码（1-254）。</ArgTableRow>
<ArgTableRow arg="value" typ="string">
选项的值。该值会根据其书写方式转换：
- `'test'` - 引号中的文本会作为文本发送（`74657374`）。
- `'10.10.10.10'` - 引号中的 IP 地址会作为四个字节发送（`0a0a0a0a`）。
- `s'10.10.10.10'` - 使用 `s` 前缀时，该值始终作为文本发送（`31302e31302e31302e3130`）。
- `'10'` - 引号中的数字会作为一个字节发送（`0a`）。
- `0x0a0a` - 十六进制值会按原样发送。

各部分可以组合，例如 `0x01'vards'$(HOSTNAME)`。可以使用以下变量：
- `$(HOSTNAME)` - 路由器的标识。
- `$(NETWORK_GATEWAY)` - 匹配网络（`/ip/dhcp-server/network`）的第一个网关，在发送选项时填入。
- `$(RADIUS_MT_STR1)`、`$(RADIUS_MT_STR2)` - MikroTik RADIUS 属性 24 和 25。
- `$(REMOTE_ID)` - 中继代理信息（选项 82）的远程 ID。
</ArgTableRow>
<ArgTableRow arg="force" typ="bool">即使客户端未在其参数请求列表（选项 55）中请求该选项，是否也发送它。如果不启用此项，则仅向请求该选项的客户端发送。默认：否。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="raw-value" typ="string">发送时的选项值（十六进制）。依赖客户端或网络的变量仅在发送该选项时填入。</ArgTableRow>
</ArgTable>
