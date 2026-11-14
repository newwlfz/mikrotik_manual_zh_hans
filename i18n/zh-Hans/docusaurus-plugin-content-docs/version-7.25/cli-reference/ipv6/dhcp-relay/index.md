---
sidebar_key: "cli-reference/ipv6/dhcp-relay/index"
sidebar_position: 1
title: "dhcp-relay"
sidebar_label: 'dhcp-relay'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/dhcp-relay
captured_at: '2026-11-01T21:24:32+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-relay {#ipv6dhcp-relay}
**类型：** 目录

DHCPv6 中继会将其接口上来自客户端的 DHCPv6 消息封装在 Relay-Forward 消息中转发给 DHCPv6 服务器，并将服务器的 Relay-Reply 消息传回客户端。有关概述，请参阅 [DHCP 中继](../../../network-management/dhcp/relay.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">中继已禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">中继配置无效。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">中继的名称。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">中继用于侦听客户端消息的接口。</ArgTableRow>
<ArgTableRow arg="dhcp-server" typ="object { server: alt { interface-address: composite { address6: ip6Addr
, interface: iface_enum
 }
, address6: ip6Addr
 }
 }" mandatory="1">要将 Relay-Forward 消息转发到的 DHCPv6 服务器。链路本地地址需与其接口一起指定，例如 `fe80::1%ether1`。</ArgTableRow>
<ArgTableRow arg="dhcp-options" typ="multi { array-id, option: enum
 }">添加到 Relay-Forward 消息的选项（`/ipv6/dhcp-relay/option`）。始终会添加 Interface-ID 选项 (18)。默认值：client_mac，即客户端链路层地址（选项 79）。</ArgTableRow>
<ArgTableRow arg="link-address" typ="ip6Addr">在 Relay-Forward 消息的 link-address 字段中发送的地址，服务器可用它来识别客户端所在的链路。使用 `::` 时不发送地址。默认值：::。</ArgTableRow>
<ArgTableRow arg="delay-threshold" typ="alt { const: enum (none) { none:0 }
, time: time
 }">消息要被转发所必须具有的 elapsed-time 字段最小值。使用 `none` 时，所有消息都会被转发。默认值：none。</ArgTableRow>
<ArgTableRow arg="store-relayed-bindings" typ="bool">是否保留服务器回复中找到的绑定，并通过客户端为其添加路由，以便发往中继后面委派前缀的流量能够被路由。这些绑定列在 `/ipv6/dhcp-relay/routes` 中。默认值：no。</ArgTableRow>
</ArgTable>
