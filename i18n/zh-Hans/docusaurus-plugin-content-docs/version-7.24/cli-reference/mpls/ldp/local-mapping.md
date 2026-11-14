---
sidebar_key: "cli-reference/mpls/ldp/local-mapping"
sidebar_position: 4
title: "local-mapping"
sidebar_label: "local-mapping"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/mpls/ldp/local-mapping
captured_at: '2026-11-01T21:29:15+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## mpls/ldp/local-mapping {#mplsldplocal-mapping}
**条件：** !smips
**类型：**目录

此子菜单显示路由器本地绑定到各路由的标签。如果不需要动态使用 LDP，也可以在此菜单中配置静态映射。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">绑定是否处于活动状态，以及能否被选为转发的候选项。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">该条目是否为动态添加。</ArgTableRow>
<ArgTableRow arg="E" typ="egress">egress</ArgTableRow>
<ArgTableRow arg="G" typ="gateway">目标是否可通过网关到达。</ArgTableRow>
<ArgTableRow arg="L" typ="local">目标在路由器上是否本地可达。</ArgTableRow>
<ArgTableRow arg="V" typ="vpls">vpls</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="vrf" typ="enum" unset="1">此映射所属的 VRF 表的名称。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="address (flags=46/)" unset="1" mandatory="1">标签所分配到的目标前缀。</ArgTableRow>
<ArgTableRow arg="label" typ="alt { label-enum: enum (expl-null | alert | expl-null6 | impl-null) { expl-null:0, alert:1, expl-null6:2, impl-null:3 }
, label-num: num [16 .. 1048576]
 }" mandatory="1">分配给目标的标签号。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="adv-path" typ="string"></ArgTableRow>
<ArgTableRow arg="peers" typ="object { peer-id: composite { id: ipAddr
, namespace: num
 }
 }">此条目被通告到的对等体的 IP 地址和标签空间。</ArgTableRow>
<ArgTableRow arg="pw-fec" typ="string"></ArgTableRow>
</ArgTable>
