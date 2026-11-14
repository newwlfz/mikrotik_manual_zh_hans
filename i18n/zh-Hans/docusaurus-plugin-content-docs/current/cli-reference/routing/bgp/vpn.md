---
sidebar_key: "cli-reference/routing/bgp/vpn"
sidebar_position: 8
title: "vpn"
sidebar_label: 'vpn'
source: https://manual.mikrotik.com/docs/cli-reference/routing/bgp/vpn
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/bgp/vpn {#routingbgpvpn}
**条件：** !smips
**类型：** 目录

L3VPN VPNv4/VPNv6 实例配置

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" unset="1"></ArgTableRow>
<ArgTableRow arg="instance" typ="enum" mandatory="1">此 VPN 分配到的实例名称。</ArgTableRow>
<ArgTableRow arg="route-distinguisher" typ="string" mandatory="1">指定附加到路由的值，以便接收路由器能够区分否则可能看起来相同的通告。用于区分使用重叠 IP 范围的租户。还可用于简化 Virtual Network 内的收敛和冗余。来自 MLAG 对的 RD 也应唯一。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum" mandatory="1">此 VPN 实例将使用的 VRF 表名称。</ArgTableRow>
<ArgTableRow arg="label-allocation-policy" typ="enum (per-vrf | per-prefix)" mandatory="1"></ArgTableRow>
<ArgTableRow arg="import.route-targets" typ="object { route-target: address (flags=R)
 }" unset="1">将用于导入 VPNv4 路由的路由目标列表。接受的 RT 格式与路由区分符的格式类似。</ArgTableRow>
<ArgTableRow arg="export.route-targets" typ="object { route-target: address (flags=R)
 }" unset="1">导出 VPNv4 路由时添加的路由目标列表。接受的 RT 格式与路由区分符的格式类似。</ArgTableRow>
<ArgTableRow arg="import.filter-chain" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="export.filter-select" typ="enum" unset="1">用于选择要导出的前缀的 `routing/filter/select-chain` 名称。</ArgTableRow>
<ArgTableRow arg="export.filter-chain" typ="enum" unset="1">用于在导出前过滤前缀的 `routing/filter/chain` 名称。</ArgTableRow>
<ArgTableRow arg="export.redistribute" typ="ubit (connected, static, rip, ospf, isis, bgp, vpn, dhcp, fantasy, modem, slaac)" unset="1">启用将指定路由类型从 VRF 重分发到 VPNv4。</ArgTableRow>
</ArgTable>
