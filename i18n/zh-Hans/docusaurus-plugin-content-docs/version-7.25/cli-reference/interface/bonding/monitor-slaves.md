---
sidebar_key: "cli-reference/interface/bonding/monitor-slaves"
sidebar_position: 1
title: "monitor-slaves"
sidebar_label: 'monitor-slaves'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/bonding/monitor-slaves
captured_at: '2026-11-01T21:22:20+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/bonding/monitor-slaves {#interfacebondingmonitor-slaves}
**类型：** 命令

该命令用于监控单个 bonding 端口。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="A" typ="active">已启用</ArgTableRow>
<ArgTableRow arg="P" typ="partner">partner</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="bond" typ="iface_enum">要监控的 bonding 接口。</ArgTableRow>
<ArgTableRow arg="once" typ="bool">仅显示一次监控输出，而不是持续显示。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="port" typ="iface_enum">使用的 bonding 端口。</ArgTableRow>
<ArgTableRow arg="key" typ="num">显示本地 LACP 聚合键。低 6 位会根据各个端口的链路速率和双工模式自动分配。高 10 位可以使用 lacp-user-key 设置手动指定。</ArgTableRow>
<ArgTableRow arg="flags" typ="string">
显示本地 LACP 标志。
- A - activity（链路处于活动状态）。
- T - timeout（链路正在使用短超时）。
- G - aggregation（链路可聚合）。
- S - synchronization（链路已同步）。
- C - collecting（链路能够收集传入帧）。
- D - distributing（链路能够分发传出帧）。
- F - defaulted（链路正在使用默认的对端信息）。
- E - expired（链路处于过期状态）。
</ArgTableRow>
<ArgTableRow arg="partner-sys-id" typ="macAddr">显示对端 LACP 系统 ID。</ArgTableRow>
<ArgTableRow arg="partner-sys-priority" typ="num">显示对端 LACP 优先级。</ArgTableRow>
<ArgTableRow arg="partner-key" typ="num">显示对端 LACP 聚合键。</ArgTableRow>
<ArgTableRow arg="partner-flags" typ="string">显示对端 LACP 标志。</ArgTableRow>
</ArgTable>
