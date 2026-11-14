---
sidebar_key: "cli-reference/ipv6/dhcp-relay/index"
sidebar_position: 1
title: "dhcp-relay"
sidebar_label: "dhcp-relay"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ipv6/dhcp-relay
captured_at: '2026-11-01T21:29:03+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-relay {#ipv6dhcp-relay}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">中继将监听来自此接口上客户端的消息</ArgTableRow>
<ArgTableRow arg="dhcp-server" typ="object { server: alt { interface-address: composite { address6: ip6Addr
, interface: iface_enum
 }
, address6: ip6Addr
 }
 }" mandatory="1">中继消息将被转发到的服务器</ArgTableRow>
<ArgTableRow arg="dhcp-options" typ="multi { array-id, option: enum
 }">添加到 Relay-Forward 消息中的选项。注意，option 18 (interface-id) 会自动添加，以便中继能够正确中继回复消息。</ArgTableRow>
<ArgTableRow arg="link-address" typ="ip6Addr"></ArgTableRow>
<ArgTableRow arg="delay-threshold" typ="alt { const: enum (none) { none:0 }
, time: time
 }">如果 DHCP 数据包中的 secs 字段小于 delay-threshold，则忽略此数据包</ArgTableRow>
<ArgTableRow arg="store-relayed-bindings" typ="bool">将路由添加到回复消息中找到的有效绑定</ArgTableRow>
</ArgTable>
