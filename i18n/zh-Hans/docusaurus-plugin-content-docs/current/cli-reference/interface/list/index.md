---
sidebar_key: "cli-reference/interface/list"
title: "list"
sidebar_label: 'list'
source: https://manual.mikrotik.com/docs/cli-reference/interface/list
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/list {#interfacelist}
**类型：**目录

接口列表允许定义一组接口，以便在基于接口的不同配置部分（如 Neighbour Discovery、Firewall、Bridge 和 Internet Detect）中更轻松地管理接口。

共有四个预定义列表：`all`（包含所有接口）、`none`（不包含任何接口）、`dynamic`（包含动态接口）和 `static`（包含静态接口）。你还可以创建其他接口列表。

:::info
动态接口是带有 "dynamic" 标志的接口。任何没有 dynamic 标志的接口都将属于 `static` 接口列表。
:::

成员按以下顺序添加到接口列表中：

1. 将 Include 成员添加到接口列表。
2. 从列表中移除 Exclude 成员。
3. 将静态配置的成员添加到列表中。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="builtin">内置系统列表。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态创建的列表。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">接口列表的名称。预定义列表包括 "all"、"none"、"dynamic" 和 "static"。</ArgTableRow>
<ArgTableRow arg="include" typ="multi { include-list: enum
 }">其成员会包含在此列表中的接口列表。可以指定多个列表，用逗号分隔。</ArgTableRow>
<ArgTableRow arg="exclude" typ="multi { exclude-list: enum
 }">其成员会从此列表中排除的接口列表。可以指定多个列表，用逗号分隔。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="dynamic" typ="bool">接口列表是否为动态创建。</ArgTableRow>
</ArgTable>
