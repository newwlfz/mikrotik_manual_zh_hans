---
sidebar_key: "cli-reference/routing/pimsm/igmp-interface-template"
sidebar_position: 2
title: "igmp-interface-template"
sidebar_label: 'igmp-interface-template'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/pimsm/igmp-interface-template
captured_at: '2026-11-01T21:25:16+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/pimsm/igmp-interface-template {#routingpimsmigmp-interface-template}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该模板已禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum" mandatory="1">此模板所属的 PIM 实例。</ArgTableRow>
<ArgTableRow arg="interfaces" typ="object { interface: iface_enum
 }" unset="1">遵循此模板并运行 IGMP/MLD 的接口。</ArgTableRow>
<ArgTableRow arg="robustness" typ="num">此模板的接口上 IGMP/MLD 查询器的稳健性值。</ArgTableRow>
<ArgTableRow arg="query-interval" typ="time">在此模板的接口上发送 IGMP/MLD 通用查询的频率。</ArgTableRow>
<ArgTableRow arg="query-response-interval" typ="time">在此模板的接口上，IGMP/MLD 通用查询中通告的最大响应时间。</ArgTableRow>
<ArgTableRow arg="last-member-query-interval" typ="time">在此模板的接口上，IGMP/MLD 组特定查询中通告的响应时间。</ArgTableRow>
</ArgTable>
