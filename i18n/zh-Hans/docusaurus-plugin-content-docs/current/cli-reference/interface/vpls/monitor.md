---
sidebar_key: "cli-reference/interface/vpls/monitor"
sidebar_position: 1
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/interface/vpls/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/vpls/monitor {#interfacevplsmonitor}
**条件：** !smips
**类型：** 命令

该命令显示当前的 VPLS 接口状态。

例如：

```ros
[admin@10.0.11.23] /interface/vpls> monitor vpls2
remote-label: 800000
local-label: 43
remote-status: 
transport: 10.255.11.201/32
transport-nexthop: 10.0.11.201
imposed-labels: 800000
```

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="remote-label" typ="num">由远端对等体为此伪线分配的 MPLS 标签（RFC 4447 第 5.1 节）。</ArgTableRow>
<ArgTableRow arg="local-label" typ="num">为此伪线在本地分配的 MPLS 标签（RFC 4447 第 5.1 节）。</ArgTableRow>
<ArgTableRow arg="remote-status" typ="ubit (not-forwarding, attachment-circuit-rx-fault, attachment-circuit-tx-fault, pw-rx-fault, pw-tx-fault)">通过 LDP 状态信令从远端对等体接收到的伪线状态（RFC 4447 第 5.4 节）。</ArgTableRow>
<ArgTableRow arg="remote-group" typ="num">远端对等体的组 ID，用于 LDP 状态撤销聚合（RFC 4447 第 5.3 节）。</ArgTableRow>
<ArgTableRow arg="te-tunnel" typ="enum">传输接口的名称。当 VPLS 运行在 [流量工程](../../../user-guides/routing-and-networking-protocols/mpls/traffic-eng.md) 隧道上时显示。</ArgTableRow>
<ArgTableRow arg="nexthops" typ="object { label: enum (expl-null | alert | expl-null6 | impl-null) { expl-null:0, alert:1, expl-null6:2, impl-null:3 }
, nh: address
, interface: iface_enum
 }">正在使用的传输下一跳。</ArgTableRow>
</ArgTable>
