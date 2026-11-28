---
title: "list"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/list
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/list 
**类型：** 目录

接口列表允许定义一组接口，以便在基于接口的不同配置部分（例如 Neighbour Discovery、Firewall、Bridge 和 Internet Detect）中更轻松地管理接口。

有四个预定义列表：`all`（包含所有接口）、`none`（不包含任何接口）、`dynamic`（包含动态接口）和 `static`（包含静态接口）。你还可以创建其他接口列表。

:::info
动态接口是具有“dynamic”标志的接口。任何不具有 dynamic 标志的接口都属于 `static` 接口列表。
:::

成员按以下顺序添加到接口列表：

1. 将 include 成员添加到接口列表。
2. 从列表中移除 exclude 成员。
3. 将静态配置的成员添加到列表。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="*" typ="builtin">Built-in system list.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">Dynamically created list.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Name of the interface list. Predefined lists include "all", "none", "dynamic", and "static".</ArgTableRow>
<ArgTableRow arg="include" typ="multi { include-list: enum
 }">Interface list whose members are included in this list. Multiple lists can be specified, separated by commas.</ArgTableRow>
<ArgTableRow arg="exclude" typ="multi { exclude-list: enum
 }">Interface list whose members are excluded from this list. Multiple lists can be specified, separated by commas.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="dynamic" typ="bool">Whether the interface list was created dynamically.</ArgTableRow>
</ArgTable>
