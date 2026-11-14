---
sidebar_key: "cli-reference/routing/table"
sidebar_position: 19
title: "table"
sidebar_label: 'table'
source: https://manual.mikrotik.com/docs/cli-reference/routing/table
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/table {#routingtable}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
<ArgTableRow arg="U" typ="used">已使用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">路由表的名称。</ArgTableRow>
<ArgTableRow arg="fib" typ="switch" unset="1">标志，指示此表中的路由是否会被安装到 [FIB](../../user-guides/routing-and-networking-protocols/routing-decision.md#forwarding-information-base) 中。</ArgTableRow>
</ArgTable>
