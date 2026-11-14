---
sidebar_key: "cli-reference/mpls/ldp/remote-mapping"
sidebar_position: 6
title: "remote-mapping"
sidebar_label: 'remote-mapping'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/mpls/ldp/remote-mapping
captured_at: '2026-11-01T21:24:48+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## mpls/ldp/remote-mapping {#mplsldpremote-mapping}
**条件：** !smips
**类型：** 目录

子菜单显示从其他路由器接收的路由的标签绑定。如果无意动态使用 LDP，可以配置静态映射。此表用于构建转发表。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">绑定是否处于活动状态并可被选为转发候选。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">条目是否为动态添加。</ArgTableRow>
<ArgTableRow arg="V" typ="vpls">vpls</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="vrf" typ="enum" unset="1">此映射所属的 VRF 表名称。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="address (flags=46/)" mandatory="1">标签分配到的目标前缀。</ArgTableRow>
<ArgTableRow arg="label" typ="alt { label-enum: enum (expl-null | alert | expl-null6 | impl-null) { expl-null:0, alert:1, expl-null6:2, impl-null:3 }
, label-num: num [16 .. 1048576]
 }" mandatory="1">分配给目标的标签编号。</ArgTableRow>
<ArgTableRow arg="nexthop" typ="address (flags=46i)" mandatory="1"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="peer" typ="object { peer-id: composite { id: ipAddr
, namespace: num
 }
 }"></ArgTableRow>
<ArgTableRow arg="path" typ="string"></ArgTableRow>
<ArgTableRow arg="pw-fec" typ="string"></ArgTableRow>
</ArgTable>
