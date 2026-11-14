---
sidebar_key: "cli-reference/routing/filter/community-ext-list"
sidebar_position: 2
title: "community-ext-list"
sidebar_label: 'community-ext-list'
source: https://manual.mikrotik.com/docs/cli-reference/routing/filter/community-ext-list
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/filter/community-ext-list {#routingfiltercommunity-ext-list}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="list" typ="enum" mandatory="1">引用名称。</ArgTableRow>
<ArgTableRow arg="communities" typ="object">
扩展 community 列表，以 **raw** 整数值或类型化格式 `type:value` 表示，其中 type 可以是：
- `rt` - route-target
- `soo` -  起源站点

值取决于类型。
</ArgTableRow>
<ArgTableRow arg="regexp" typ="string">用于匹配 community 的正则表达式匹配器。正则表达式条目用于匹配，并由 `delete`/`filter` 使用。只有具体的 community 值会被 `append`/`set` 使用。</ArgTableRow>
</ArgTable>
