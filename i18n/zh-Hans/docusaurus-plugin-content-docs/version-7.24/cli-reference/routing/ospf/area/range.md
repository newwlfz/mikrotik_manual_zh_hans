---
sidebar_key: "cli-reference/routing/ospf/area/range"
sidebar_position: 1
title: "range"
sidebar_label: "range"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/ospf/area/range
captured_at: '2026-11-01T21:29:34+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/ospf/area/range {#routingospfarearange}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
<ArgTableRow arg="A" typ="advertise">advertise</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="area" typ="enum" mandatory="1">与该范围关联的 OSPF 区域。</ArgTableRow>
<ArgTableRow arg="prefix" typ="address (flags=46/)" mandatory="1">该范围的网络前缀。</ArgTableRow>
<ArgTableRow arg="advertise" typ="bool">是否创建汇总 LSA 并将其通告到相邻区域。</ArgTableRow>
<ArgTableRow arg="cost" typ="num" unset="1">该范围将创建的汇总 LSA 的开销。默认 - 使用所有已使用路由（即落在该范围内的路由）中的最大开销。</ArgTableRow>
</ArgTable>
