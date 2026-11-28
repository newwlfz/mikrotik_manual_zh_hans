---
title: "neighbor"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/pimsm/neighbor
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## routing/pimsm/neighbor 
**条件：** !smips
**类型：** 目录

neighbor 菜单显示所有检测到的、运行 PIM 的邻居及其状态。该菜单包含动态且只读的条目。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="R" typ="designated-router">designated-router</ArgTableRow>
<ArgTableRow arg="J" typ="join-tracking">join-tracking</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="instance" typ="enum">Name of the PIM instance this neighbor is detected on.</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46i)">Shows the neighbor's IP address and local interface the neighbor is detected on.</ArgTableRow>
<ArgTableRow arg="priority" typ="num">Indicates the neighbor's priority value.</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">Shows the remaining time after the neighbor is removed from the list if no new Hello message is received. The hold time equals neighbor's `hello-period * 3.5`.</ArgTableRow>
<ArgTableRow arg="designated-router" typ="bool">Shows whether the neighbor is elected as Designated Router (DR).</ArgTableRow>
<ArgTableRow arg="propagation-delay" typ="time">Indicates the neighbor's value of the propagation delay in the LAN Prune Delay option in the Hello message.</ArgTableRow>
<ArgTableRow arg="override-interval" typ="time">Indicates the neighbor's value of the override interval in the LAN Prune Delay option in the Hello message.</ArgTableRow>
<ArgTableRow arg="join-tracking" typ="bool">Indicates the neighbor's value of a Tracking (T) bit in the LAN Prune Delay option in the Hello message.</ArgTableRow>
</ArgTable>
