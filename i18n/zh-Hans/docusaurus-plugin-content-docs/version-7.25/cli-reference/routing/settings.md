---
sidebar_key: "cli-reference/routing/settings"
sidebar_position: 17
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/settings
captured_at: '2026-11-01T21:25:22+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/settings {#routingsettings}
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="single-process" typ="bool">启用后，所有与路由相关的进程会合并为一个路由进程，以减少 RAM 使用量。禁用后，与路由相关的进程会分别运行，在某些设置中可以提高性能和稳定性。默认情况下，仅对 RAM 为 64 MB 或更少的设备启用 single-process。需要重启才能使此更改生效。</ArgTableRow>
<ArgTableRow arg="dynamic-in-chain" typ="enum" unset="1">用于处理所有动态添加路由的链的名称。</ArgTableRow>
<ArgTableRow arg="connected-in-chain" typ="enum" unset="1">用于处理 `connected` 路由的链的名称。</ArgTableRow>
<ArgTableRow arg="check-gateway-ping-interval" typ="time"></ArgTableRow>
<ArgTableRow arg="check-gateway-ping-timeout" typ="time"></ArgTableRow>
<ArgTableRow arg="check-gateway-ping-count" typ="num"></ArgTableRow>
<ArgTableRow arg="policy-rules" typ="object { chain: enum
 }">定义路由决策规则的顺序。默认情况下，`user` 是添加用户定义 `/routing/rule` 条目的链。你可以在列表中的任意位置添加自定义链。</ArgTableRow>
</ArgTable>
