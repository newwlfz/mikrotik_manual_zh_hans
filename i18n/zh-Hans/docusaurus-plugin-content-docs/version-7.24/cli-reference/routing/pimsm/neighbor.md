---
sidebar_key: "cli-reference/routing/pimsm/neighbor"
sidebar_position: 6
title: "neighbor"
sidebar_label: "neighbor"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/pimsm/neighbor
captured_at: '2026-11-01T21:29:37+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/pimsm/neighbor {#routingpimsmneighbor}
**条件：** !smips
**类型：** 目录

neighbor 菜单显示所有检测到的、正在运行 PIM 的邻居及其状态。此菜单包含动态和只读条目。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="R" typ="designated-router">designated-router</ArgTableRow>
<ArgTableRow arg="J" typ="join-tracking">join-tracking</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum">检测到该邻居的 PIM 实例名称。</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46i)">显示邻居的 IP 地址以及检测到该邻居的本地接口。</ArgTableRow>
<ArgTableRow arg="priority" typ="num">表示邻居的优先级值。</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">显示在未收到新的 Hello 消息时，邻居从列表中被移除之前的剩余时间。保持时间等于邻居的 `hello-period * 3.5`。</ArgTableRow>
<ArgTableRow arg="designated-router" typ="bool">显示该邻居是否被选举为指定路由器（DR）。</ArgTableRow>
<ArgTableRow arg="propagation-delay" typ="time">表示邻居在 Hello 消息中 LAN Prune Delay 选项里的传播延迟值。</ArgTableRow>
<ArgTableRow arg="override-interval" typ="time">表示邻居在 Hello 消息中 LAN Prune Delay 选项里的 override interval 值。</ArgTableRow>
<ArgTableRow arg="join-tracking" typ="bool">表示邻居在 Hello 消息中 LAN Prune Delay 选项里的 Tracking (T) 位的值。</ArgTableRow>
</ArgTable>
