---
sidebar_key: "cli-reference/routing/pimsm/static-rp"
sidebar_position: 7
title: "static-rp"
sidebar_label: "static-rp"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/pimsm/static-rp
captured_at: '2026-11-01T21:29:38+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/pimsm/static-rp {#routingpimsmstatic-rp}
**条件：** !smips
**类型：** 目录

static-rp 菜单允许手动定义多播组到 RP 的映射。此类机制对故障并不具备鲁棒性，但至少提供了一种基本的互操作机制。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum" mandatory="1">此静态 RP 所属的 PIM 实例的名称。</ArgTableRow>
<ArgTableRow arg="group" typ="address (flags=46/)">属于特定 RP 的多播组。</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46)">静态 RP 的 IP 地址。</ArgTableRow>
</ArgTable>
