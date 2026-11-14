---
sidebar_key: "cli-reference/tool/romon/port"
sidebar_position: 3
title: "port"
sidebar_label: 'port'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/romon/port
captured_at: '2026-11-01T21:25:57+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/romon/port {#toolromonport}
**类型：** 目录

参与 [RoMON 网络](../../../management-tools/romon.md#configuration) 的端口。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">default</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum { all }" mandatory="1">用于 RoMON 的接口名称或 interface-list。</ArgTableRow>
<ArgTableRow arg="forbid" typ="bool">匹配的接口是被允许还是禁止加入 RoMON 网络。</ArgTableRow>
<ArgTableRow arg="cost" typ="num">端口开销。所有特定端口条目的优先级都高于使用 `interface=all` 的通配条目。</ArgTableRow>
<ArgTableRow arg="secrets" typ="multi { array-id, name: string
 }">用于 RoMON 消息哈希的各个端口密钥列表。</ArgTableRow>
</ArgTable>
