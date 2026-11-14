---
sidebar_key: "cli-reference/tool/romon/port"
sidebar_position: 3
title: "port"
sidebar_label: 'port'
source: https://manual.mikrotik.com/docs/cli-reference/tool/romon/port
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/romon/port {#toolromonport}
**类型：** 目录

参与 [RoMON 网络](../../../management-tools/romon.md#choose-ports) 的端口。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">default</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum { all }" mandatory="1">参与 RoMON 的接口；可以是单个接口或内置通配符 `all`。不接受诸如网桥之类的主接口——请指明物理端口。预配置的 `all` 条目不能再次添加、移除、启用或禁用；只能更改其 `cost`、`forbid` 和 `secrets`。</ArgTableRow>
<ArgTableRow arg="forbid" typ="bool">匹配的接口是被允许还是禁止加入 RoMON 网络。</ArgTableRow>
<ArgTableRow arg="cost" typ="num">端口开销。所有特定端口条目的优先级都高于使用 `interface=all` 的通配条目。</ArgTableRow>
<ArgTableRow arg="secrets" typ="multi { array-id, name: string
 }">用于 RoMON 消息哈希的各个端口密钥列表。</ArgTableRow>
</ArgTable>
