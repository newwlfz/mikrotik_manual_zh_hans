---
sidebar_key: "cli-reference/routing/rule"
sidebar_position: 16
title: "rule"
sidebar_label: "rule"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/rule
captured_at: '2026-11-01T21:29:40+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/rule {#routingrule}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
<ArgTableRow arg="*" typ="default">default</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="src-address" typ="address (flags=64iv/)" unset="1">要匹配的源地址。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="address (flags=64iv/)" unset="1">要匹配的目标地址。</ArgTableRow>
<ArgTableRow arg="routing-mark" typ="enum" unset="1">匹配特定的路由标记。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" unset="1">要匹配的入接口。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (lookup | lookup-only-in-table | unreachable | drop | mangle)">
对匹配数据包执行的操作：
- drop - 静默丢弃数据包。
- lookup - 在路由表中执行查找。
- lookup-only-in-table - 仅在指定的路由表中执行查找（参见 `table` 参数）。
- unreachable - 生成 ICMP 不可达消息并发送给源。
- mangle - 按防火墙 mangle 规则执行操作。
</ArgTableRow>
<ArgTableRow arg="table" typ="enum (local) { local:4095 }">用于查找的路由表名称。</ArgTableRow>
<ArgTableRow arg="min-prefix" typ="num" unset="1">隐藏路由表中具有指定前缀长度的路由，使其不用于此路由规则处理的数据包。这等同于 Linux IP 规则 `suppress_prefixlength`。例如，将值设置为 0 以在路由决策中抑制默认路由。</ArgTableRow>
<ArgTableRow arg="vrf" typ="switch"></ArgTableRow>
<ArgTableRow arg="realm" typ="num" unset="1"></ArgTableRow>
<ArgTableRow arg="chain" typ="enum" unset="1">路由决策规则使用的链名称。默认情况下，未指定链时使用 `user`。如果链名称与内置路由决策名称匹配，则用户创建的规则会添加到该决策之后。例如，如果 `chain=mangle`，则此链中用户创建的规则位于 `mangle` 决策之后。</ArgTableRow>
</ArgTable>
