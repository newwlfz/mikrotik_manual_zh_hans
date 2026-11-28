---
title: "neighbor"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/pimsm/neighbor
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## routing/pimsm/neighbor 
**条件：** !smips
**类型：** 目录

neighbor 菜单显示所有检测到的、运行 PIM 的邻居及其状态。该菜单包含动态且只读的条目。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="R" typ="designated-router">The neighbor is the elected Designated Router (DR) on the network segment.</ArgTableRow>
<ArgTableRow arg="J" typ="join-tracking">The neighbor supports join tracking. It sets the Tracking (T) bit in the LAN Prune Delay option of its Hello messages.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="instance" typ="enum">Name of the PIM instance this neighbor is detected on.</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46i)">Shows the neighbor's IP address and local interface the neighbor is detected on.</ArgTableRow>
<ArgTableRow arg="priority" typ="num">Indicates the neighbor's priority value.</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">Shows the remaining time after the neighbor is removed from the list if no new Hello message is received. The hold time equals neighbor's `hello-period * 3.5`.</ArgTableRow>
<ArgTableRow arg="propagation-delay" typ="time">Indicates the neighbor's value of the propagation delay in the LAN Prune Delay option in the Hello message.</ArgTableRow>
<ArgTableRow arg="override-interval" typ="time">Indicates the neighbor's value of the override interval in the LAN Prune Delay option in the Hello message.</ArgTableRow>
</ArgTable>
