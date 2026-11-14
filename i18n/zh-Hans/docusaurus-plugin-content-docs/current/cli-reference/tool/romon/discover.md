---
sidebar_key: "cli-reference/tool/romon/discover"
sidebar_position: 1
title: "discover"
sidebar_label: 'discover'
source: https://manual.mikrotik.com/docs/cli-reference/tool/romon/discover
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/romon/discover {#toolromondiscover}
**类型：** 命令

发现通过 [RoMON](../../../management-tools/romon.md) 覆盖网络可访问的路由器。表格会持续刷新（按 `q` 停止）；`duration` 会在给定时间后停止。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="A" typ="active">已启用</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="macAddr">发现的路由器的 RoMON ID（MAC 地址）</ArgTableRow>
<ArgTableRow arg="cost" typ="num">到该路由器的 RoMON 路径累计开销（由 `/tool/romon/port` 配置的各端口开销之和）</ArgTableRow>
<ArgTableRow arg="hops" typ="num">本路由器与发现的路由器之间的 RoMON 跳数</ArgTableRow>
<ArgTableRow arg="path" typ="multi { array-id, path-hop: macAddr
 }">发现应答所经过的 RoMON ID（MAC 地址）路径</ArgTableRow>
<ArgTableRow arg="l2mtu" typ="num">RoMON 路径上最小的 L2 MTU</ArgTableRow>
<ArgTableRow arg="identity" typ="string">发现的路由器的 RouterOS 系统标识</ArgTableRow>
<ArgTableRow arg="version" typ="string">发现的路由器的 RouterOS 版本</ArgTableRow>
<ArgTableRow arg="board" typ="string">发现的路由器的板卡名称</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">发现的路由器的运行时间</ArgTableRow>
</ArgTable>
