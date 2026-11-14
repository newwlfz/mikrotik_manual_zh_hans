---
sidebar_key: "cli-reference/routing/filter/community-ext-list"
sidebar_position: 2
title: "community-ext-list"
sidebar_label: "community-ext-list"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/filter/community-ext-list
captured_at: '2026-11-01T21:29:30+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/filter/community-ext-list {#routingfiltercommunity-ext-list}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="list" typ="enum" mandatory="1">引用名称。</ArgTableRow>
<ArgTableRow arg="communities" typ="object">
扩展 community 列表，以 **raw** 整数值或类型化格式 `type:value` 表示，其中 type 可以是：
- `rt` - route-target
- `soo` -  起源站点

该值取决于 type。
</ArgTableRow>
<ArgTableRow arg="regexp" typ="string">用于匹配 community 的正则表达式匹配器。仅包含 regexp 参数的 community 集合不能用于追加/删除 community。</ArgTableRow>
</ArgTable>
