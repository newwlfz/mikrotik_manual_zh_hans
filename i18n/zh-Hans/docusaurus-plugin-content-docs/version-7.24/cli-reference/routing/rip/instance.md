---
sidebar_key: "cli-reference/routing/rip/instance"
sidebar_position: 1
title: "instance"
sidebar_label: "instance"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/rip/instance
captured_at: '2026-11-01T21:29:38+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/rip/instance {#routingripinstance}
**类型：** 目录

RIP 路由的最大度量值为 15。高于 15 的度量值会被视为 'infinity'，具有此类度量值的路由会被视为不可达。因此，RIP 不能用于任意两台路由器之间跳数超过 15 的网络，而使用大于 1 的 redistribute 度量值会进一步降低这一最大跳数。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">实例的名称。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">用于连接的 VRF 名称。</ArgTableRow>
<ArgTableRow arg="afi" typ="enum (ip | ipv6)"></ArgTableRow>
<ArgTableRow arg="in-filter-chain" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="out-filter-select" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="out-filter-chain" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="redistribute" typ="ubit (connected, static, rip, ospf, isis, bgp, vpn, dhcp, fantasy, modem, bgp-mpls-vpn, slaac)" unset="1"></ArgTableRow>
<ArgTableRow arg="originate-default" typ="enum (never | always | if-installed)" unset="1">是否生成默认路由。</ArgTableRow>
<ArgTableRow arg="route-timeout" typ="num">指定路由被视为无效之前的时间间隔。</ArgTableRow>
<ArgTableRow arg="route-gc-timeout" typ="num"></ArgTableRow>
<ArgTableRow arg="update-interval" typ="num"></ArgTableRow>
<ArgTableRow arg="routing-table" typ="enum" unset="1">将安装路由的路由表名称。</ArgTableRow>
</ArgTable>
