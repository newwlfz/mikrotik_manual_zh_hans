---
title: "neighbor"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/rip/neighbor
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## routing/rip/neighbor 
**类型：** 目录

此子菜单用于定义要与其交换路由信息的相邻路由器。通常，如果网络内组播正常工作，则无需添加邻居。如果交换路由信息出现问题，可以将相邻路由器添加到列表中。这将强制路由器使用普通单播数据包与邻居交换路由信息。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="D" typ="dynamic">dynamic</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="instance" typ="enum"></ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46i)"></ArgTableRow>
<ArgTableRow arg="routes" typ="num"></ArgTableRow>
<ArgTableRow arg="packets-total" typ="num"></ArgTableRow>
<ArgTableRow arg="packets-bad" typ="num"></ArgTableRow>
<ArgTableRow arg="entries-bad" typ="num"></ArgTableRow>
<ArgTableRow arg="last-update" typ="time">Time from last update.</ArgTableRow>
</ArgTable>
