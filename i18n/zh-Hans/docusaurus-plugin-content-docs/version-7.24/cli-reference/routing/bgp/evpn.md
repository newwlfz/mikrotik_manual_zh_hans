---
sidebar_key: "cli-reference/routing/bgp/evpn"
sidebar_position: 3
title: "evpn"
sidebar_label: "evpn"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/bgp/evpn
captured_at: '2026-11-01T21:29:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/bgp/evpn {#routingbgpevpn}
**条件：** !smips
**类型：** 目录

请参阅 EVPN 文档。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" unset="1"></ArgTableRow>
<ArgTableRow arg="instance" typ="enum" mandatory="1">此 EVPN 分配到的 BGP 实例。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum" unset="1">此 EVPN 实例将使用的 VRF 表的名称。</ArgTableRow>
<ArgTableRow arg="rd" typ="address (flags=R)" unset="1">指定附加到路由的值，以便接收路由器能够区分在其他情况下可能看起来相同的通告。用于区分使用重叠 IP 范围的租户。还可用于简化虚拟网络内的收敛和冗余。来自 MLAG 对的 RD 也必须唯一。</ArgTableRow>
<ArgTableRow arg="vni" typ="object { range: range
 }" unset="1">虚拟网络标识符的范围。</ArgTableRow>
<ArgTableRow arg="import.route-targets" typ="object { route-target: address (flags=R)
 }" unset="1">将用于导入 EVPN 路由的路由目标列表。</ArgTableRow>
<ArgTableRow arg="export.route-targets" typ="object { route-target: address (flags=R)
 }" unset="1">导出时将添加到 EVPN 路由的路由目标列表。</ArgTableRow>
</ArgTable>
