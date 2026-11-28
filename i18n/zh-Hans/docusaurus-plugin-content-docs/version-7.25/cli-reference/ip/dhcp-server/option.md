---
title: "option"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/option
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/option 
**类型：** 目录

DHCP 服务器可以发送的其他选项。使用 `dhcp-option` 将它们分配给网络、服务器或租约，或将它们分组到选项集中。当同一选项在多个层级设置时，租约优先于服务器，服务器优先于网络。示例请参阅 [DHCP Server](/docs/network-management/dhcp/server)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Name of the option, used where options are assigned.</ArgTableRow>
<ArgTableRow arg="code" typ="alt { number: num [1 .. 254]
, option: enum (vendor-specific) { vendor-specific:43 }
 }" mandatory="1">DHCP option code (1-254).</ArgTableRow>
<ArgTableRow arg="value" typ="string">
Value of the option. The value is converted according to how it is written:
- `'test'` - Text in quotes is sent as text (`74657374`).
- `'10.10.10.10'` - An IP address in quotes is sent as four bytes (`0a0a0a0a`).
- `s'10.10.10.10'` - With the `s` prefix, the value is always sent as text (`31302e31302e31302e3130`).
- `'10'` - A number in quotes is sent as one byte (`0a`).
- `0x0a0a` - A hex value is sent as it is.

各部分可以组合，例如 `0x01'vards'$(HOSTNAME)`。可以使用以下变量：
- `$(HOSTNAME)` - 路由器标识。
- `$(NETWORK_GATEWAY)` - 匹配网络的第一个网关（`/ip/dhcp-server/network`），在发送选项时填充。
- `$(RADIUS_MT_STR1)`、`$(RADIUS_MT_STR2)` - MikroTik RADIUS 属性 24 和 25。
- `$(REMOTE_ID)` - 中继代理信息的 Remote ID（选项 82）。
</ArgTableRow>
<ArgTableRow arg="force" typ="bool">是否即使客户端未在其参数请求列表（选项 55）中请求该选项，也发送该选项。未启用时，仅向请求该选项的客户端发送。默认：否。</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="raw-value" typ="string">The option value as it is sent, in hex. Variables that depend on the client or network are filled in only when the option is sent.</ArgTableRow>
</ArgTable>
