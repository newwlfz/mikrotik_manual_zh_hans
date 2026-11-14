---
sidebar_key: "cli-reference/routing/rip/neighbor"
sidebar_position: 5
title: "neighbor"
sidebar_label: "neighbor"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/rip/neighbor
captured_at: '2026-11-01T21:29:39+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/rip/neighbor {#routingripneighbor}
**类型：** 目录

此子菜单用于定义要与其交换路由信息的相邻路由器。通常，如果网络内组播工作正常，则无需添加邻居。如果交换路由信息时出现问题，可以将邻居路由器添加到列表中。这将强制路由器使用常规单播数据包与邻居交换路由信息。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum"></ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46i)"></ArgTableRow>
<ArgTableRow arg="routes" typ="num"></ArgTableRow>
<ArgTableRow arg="packets-total" typ="num"></ArgTableRow>
<ArgTableRow arg="packets-bad" typ="num"></ArgTableRow>
<ArgTableRow arg="entries-bad" typ="num"></ArgTableRow>
<ArgTableRow arg="last-update" typ="time">自上次更新以来的时间。</ArgTableRow>
</ArgTable>
