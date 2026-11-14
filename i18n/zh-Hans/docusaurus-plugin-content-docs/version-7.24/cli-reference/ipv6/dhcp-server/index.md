---
sidebar_key: "cli-reference/ipv6/dhcp-server/index"
sidebar_position: 2
title: "dhcp-server"
sidebar_label: "dhcp-server"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ipv6/dhcp-server
captured_at: '2026-11-01T21:29:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-server {#ipv6dhcp-server}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="prefix-pool" typ="alt { prefix-pool-static: enum (static-only) { static-only:0xffffffff }
, prefix-pool-name: enum
 }">动态前缀绑定将从中获取前缀的地址池</ArgTableRow>
<ArgTableRow arg="address-pool" typ="alt { address-pool-static: enum (static-only) { static-only:0xffffffff }
, address-pool-name: enum
 }">动态地址绑定将从中获取地址的地址池（池前缀长度必须为 128）</ArgTableRow>
<ArgTableRow arg="lease-time" typ="time">新建和延长绑定的持续时间</ArgTableRow>
<ArgTableRow arg="rapid-commit" typ="bool">附加 Rapid Commit 选项，以使用两包 Solicit-Reply 交换</ArgTableRow>
<ArgTableRow arg="use-radius" typ="enum (no | yes | accounting)">使用 RADIUS 服务器进行认证</ArgTableRow>
<ArgTableRow arg="preference" typ="num">通告消息优先级，服务器优先级值最高者优先于其他所有服务器</ArgTableRow>
<ArgTableRow arg="binding-script" typ="alt { script: string
 }"></ArgTableRow>
<ArgTableRow arg="dhcp-option" typ="multi { array-id, option: alt { option: enum
, option-set: enum
 }
 }"></ArgTableRow>
<ArgTableRow arg="insert-queue-before" typ="enum (first | bottom) { first:0, bottom:0xffffffff }"></ArgTableRow>
<ArgTableRow arg="parent-queue" typ="enum (none) { none:0 }"></ArgTableRow>
<ArgTableRow arg="route-distance" typ="num">路由表中下发的客户端绑定的距离</ArgTableRow>
<ArgTableRow arg="allow-dual-stack-queue" typ="bool"></ArgTableRow>
<ArgTableRow arg="use-reconfigure" typ="bool"></ArgTableRow>
<ArgTableRow arg="address-lists" typ="multi { array-id, address-list: string
 }">绑定前缀/地址将被添加到的地址列表（可由绑定 address-lists 参数覆盖）</ArgTableRow>
<ArgTableRow arg="ignore-ia-na-bindings" typ="bool">服务器将忽略客户端发送的消息中的 IA_NA 选项，并视该消息不包含这些选项</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="duid" typ="string"></ArgTableRow>
</ArgTable>
