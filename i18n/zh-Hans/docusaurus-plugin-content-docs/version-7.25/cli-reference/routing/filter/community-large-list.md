---
sidebar_key: "cli-reference/routing/filter/community-large-list"
sidebar_position: 3
title: "community-large-list"
sidebar_label: 'community-large-list'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/filter/community-large-list
captured_at: '2026-11-01T21:25:08+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/filter/community-large-list {#routingfiltercommunity-large-list}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="list" typ="enum" mandatory="1">引用名称。</ArgTableRow>
<ArgTableRow arg="communities" typ="object">以如下格式表示的大型社区列表：`admin:value1:value2`，其中每个部分可以是 [0..4294967295] 范围内的整数。</ArgTableRow>
<ArgTableRow arg="regexp" typ="string">用于匹配社区的正则表达式匹配器。仅使用 regexp 参数设置的社区集合不能用于追加/删除社区。</ArgTableRow>
</ArgTable>
