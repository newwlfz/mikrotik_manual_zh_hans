---
sidebar_key: "cli-reference/routing/filter/community-list"
sidebar_position: 4
title: "community-list"
sidebar_label: 'community-list'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/filter/community-list
captured_at: '2026-11-01T21:25:08+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/filter/community-list {#routingfiltercommunity-list}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="list" typ="enum" mandatory="1">引用名称。</ArgTableRow>
<ArgTableRow arg="communities" typ="object">
以 **公认** 名称或以下格式表示的 community 列表：`as:number`，其中每一段可以是 [0..65535] 范围内的整数。
接受的 **公认** 名称：
- `accept-own`
- `graceful-shutdown`
- `no-advertise`
- `no-llgr`
- `route-filter-6`
- `accept-own-nh`
- `internet`
- `no-export`
- `no-peer`
- `route-filter-xlate-4`
- `blackhole`
- `llgr-stale`
- `local-as`
- `route-filter-4`
- `route-filter-xlate-6`
</ArgTableRow>
<ArgTableRow arg="regexp" typ="string">用于匹配 community 的正则表达式匹配器。仅包含 regexp 参数的 community 集合不能用于追加/删除 community。</ArgTableRow>
</ArgTable>
