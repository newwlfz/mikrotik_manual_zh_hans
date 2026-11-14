---
sidebar_key: "cli-reference/routing/ospf/instance"
sidebar_position: 2
title: "instance"
sidebar_label: "instance"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/ospf/instance
captured_at: '2026-11-01T21:29:35+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/ospf/instance {#routingospfinstance}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="version" typ="enum (2 | 3)">此实例将运行的 OSPF 版本（IPv4 使用 v2，IPv6 使用 v3）。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">此 OSPF 实例所运作的 VRF 表。</ArgTableRow>
<ArgTableRow arg="router-id" typ="alt { ip: ipAddr
, id: enum
 }">OSPF Router ID。可以显式设置为 IP 地址，或设置为 router-id 实例的名称。</ArgTableRow>
<ArgTableRow arg="out-filter-select" typ="enum" unset="1">路由过滤器 select 链的名称，用于输出选择。输出仅作用于**外部**路由。</ArgTableRow>
<ArgTableRow arg="out-filter-chain" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="originate-default" typ="enum (never | always | if-installed)" unset="1">指定默认路由（`0.0.0.0/0`）的分发方式。</ArgTableRow>
<ArgTableRow arg="in-filter-chain" typ="enum" unset="1">用于传入前缀的 [路由过滤器](../../../user-guides/routing-and-networking-protocols/route-selection-and-filtering.md#route-filtering) 链的名称。</ArgTableRow>
<ArgTableRow arg="routing-table" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="mpls-te-address" typ="address (flags=64)" unset="1"></ArgTableRow>
<ArgTableRow arg="mpls-te-area" typ="ipAddr" unset="1">用于 MPLS 流量工程的区域。TE Opaque LSA 会在此区域中生成。最多只能有一个 OSPF 实例配置 `mpls-te-area`。</ArgTableRow>
<ArgTableRow arg="domain-id" typ="address (flags=R)" unset="1">MPLS 相关参数。用于标识该实例的 OSPF 域。此值会作为 BGP 扩展团体属性附加到在 BGP 中作为 VPNv4 路由重新分发的 OSPF 路由上，并在 BGP VPNv4 路由重新分发回 OSPF 时使用，以确定是为该路由生成 `inter-area` LSA 还是 `AS-external` LSA。默认使用 Null domain-id，如 [RFC 4577](https://tools.ietf.org/html/rfc4577) 所述。</ArgTableRow>
<ArgTableRow arg="domain-tag" typ="num" unset="1">如果设置，则在路由重新分发中使用（作为此路由器生成的所有外部 LSA 中的 route-tag），并在路由计算中使用（所有带有此路由标签的外部 LSA 都会被忽略）。与较旧的 Cisco 系统互操作时需要此项。默认不设置。</ArgTableRow>
<ArgTableRow arg="use-dn" typ="bool" unset="1">强制使用或忽略 DN 位。在某些 CE-PE 场景中，可用于将 `intra-area` 路由注入 VRF。如果参数未设置，则按 RFC 规定使用 DN 位。</ArgTableRow>
<ArgTableRow arg="redistribute" typ="ubit (connected, static, rip, ospf, isis, bgp, vpn, dhcp, fantasy, modem, bgp-mpls-vpn, slaac)" unset="1">启用特定路由类型的重新分发。</ArgTableRow>
</ArgTable>
