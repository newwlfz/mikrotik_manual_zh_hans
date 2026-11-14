---
sidebar_key: "cli-reference/interface/bonding/monitor"
sidebar_position: 2
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/interface/bonding/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/bonding/monitor {#interfacebondingmonitor}
**类型：** 命令

该命令用于监控 bonding 接口和 bonding 端口。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mode" typ="enum (balance-rr | active-backup | balance-xor | broadcast | 802.3ad | balance-tlb | balance-alb) { balance-rr:0, active-backup:1, balance-xor:2, broadcast:3, 802.3ad:4, balance-tlb:5, balance-alb:6 }">使用的 bonding 模式。</ArgTableRow>
<ArgTableRow arg="active-ports" typ="multi { array-id, port: iface_enum
 }">显示活动的 bonding 端口。</ArgTableRow>
<ArgTableRow arg="inactive-ports" typ="multi { array-id, port: iface_enum
 }">显示非活动的 bonding 端口（例如已禁用或备份接口）。</ArgTableRow>
<ArgTableRow arg="lacp-system-id" typ="macAddr">显示本地 LACP 系统 ID。</ArgTableRow>
<ArgTableRow arg="lacp-system-priority" typ="num">显示本地 LACP 优先级。</ArgTableRow>
<ArgTableRow arg="lacp-partner-system-id" typ="macAddr">显示对端 LACP 系统 ID。</ArgTableRow>
</ArgTable>
