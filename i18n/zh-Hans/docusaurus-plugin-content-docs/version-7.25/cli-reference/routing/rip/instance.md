---
title: "instance"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/rip/instance
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## routing/rip/instance 
**类型：** 目录

RIP 路由的最大 metric 为 15。大于 15 的 metric 被视为“infinity”，具有该 metric 的路由被视为不可达。因此，RIP 不能用于任意两台路由器之间超过 15 跳的网络，使用大于 1 的 redistribute metric 会进一步减少该最大跳数。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the instance.</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">Name of the VRF to be used for connections.</ArgTableRow>
<ArgTableRow arg="afi" typ="enum (ip | ipv6)"></ArgTableRow>
<ArgTableRow arg="in-filter-chain" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="out-filter-select" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="out-filter-chain" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="redistribute" typ="ubit (connected, static, rip, ospf, isis, bgp, vpn, dhcp, fantasy, modem, bgp-mpls-vpn, slaac)" unset="1"></ArgTableRow>
<ArgTableRow arg="originate-default" typ="enum (never | always | if-installed)" unset="1">Whether to originate default route.</ArgTableRow>
<ArgTableRow arg="route-timeout" typ="num">Specifies the time interval after which the route is considered invalid.</ArgTableRow>
<ArgTableRow arg="route-gc-timeout" typ="num"></ArgTableRow>
<ArgTableRow arg="update-interval" typ="num"></ArgTableRow>
<ArgTableRow arg="routing-table" typ="enum" unset="1">Routing table name where routes will be installed.</ArgTableRow>
</ArgTable>
