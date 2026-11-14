---
sidebar_key: "cli-reference/routing/bgp/vpls"
sidebar_position: 7
title: "vpls"
sidebar_label: 'vpls'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/bgp/vpls
captured_at: '2026-11-01T21:25:08+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/bgp/vpls {#routingbgpvpls}
**条件：** !smips
**类型：** 目录

此菜单列出所有已配置的基于 BGP 的 VPLS 实例。这些实例允许路由器通告 VPLS BGP NLRI，并表明该路由器属于特定的客户 VPLS 网络。

基于 MP-BGP 的自动发现与信令（RFC 4761）。

Cisco VPLS 基于 BGP 的自动发现（draft-ietf-l2vpn-signaling-08）。

支持基于 BGP 的 VPLS 使用多个导入/导出的 route target 扩展团体（同时支持 RFC 4761 和 draft-ietf-l2vpn-signaling-08）。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" unset="1"></ArgTableRow>
<ArgTableRow arg="vrf" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="rd" typ="address (flags=R)" unset="1">指定附加到 VPLS NLRI 上的值，以便接收路由器能够区分那些原本可能看起来相同的通告。这意味着必须为每个 VPLS 使用唯一的 route-distinguisher。不必为组成同一 VPLS 的所有路由器上的某个 VPLS 使用相同的 route distinguisher，因为 distinguisher 并不用于判断某个 BGP NLRI 是否与特定 VPLS 相关（此用途由 Route Target 属性完成），但必须为不同的 VPLS 使用不同的 distinguisher。接受 3 种格式。[阅读更多>>](../../../user-guides/routing-and-networking-protocols/route-distinguisher-and-route-target.md)</ArgTableRow>
<ArgTableRow arg="site-id" typ="num" unset="1">唯一的站点标识符。每个站点必须具有唯一的 site-id。若使用&nbsp;RFC 4761 风格的 VPLS 信令，则必须设置该参数。</ArgTableRow>
<ArgTableRow arg="cisco-id" typ="address" unset="1">唯一标识符。若使用 Cisco 风格的 VPLS 信令，则必须设置该参数。在大多数情况下不应使用它，因为任何现代软件都支持 RFC 4761 风格的信令（参见 site-id 参数）。该参数是 l2-router-id 与 RD 的合并，例如：10.155.155.1&amp;6550:123</ArgTableRow>
<ArgTableRow arg="import-route-targets" typ="multi { array-id, rt: address (flags=R)
 }" unset="1">该设置用于通过比较从 BGP NLRI 接收到的 route target 来判断某个 BGP NLRI 是否与特定 VPLS 相关。</ArgTableRow>
<ArgTableRow arg="export-route-targets" typ="multi { array-id, rt: address (flags=R)
 }" unset="1">该设置用于为一个或多个 BGP NLRI 标记一个或多个 route target，在远端由 `import-route-targets` 使用。</ArgTableRow>
<ArgTableRow arg="local-pref" typ="num" unset="1"></ArgTableRow>
<ArgTableRow arg="interface-list" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="pw-type" typ="enum (tagged-ethernet | raw-ethernet | vpls)" unset="1">伪线类型（RFC 4447 第 5.2 节）。默认使用 `raw-ethernet`。</ArgTableRow>
<ArgTableRow arg="pw-l2mtu" typ="num" unset="1">向远端对等体通告的 L2MTU 值（RFC 4447 第 5.2 节）。</ArgTableRow>
<ArgTableRow arg="pw-control-word" typ="enum (default | enabled | disabled)" unset="1">启用或禁用 Control Word 的使用（RFC 4623 第 4 节）。常规 VPLS 隧道与 Cisco 风格 VPLS 隧道的默认值不同。Cisco 风格默认禁用 Control Word 的使用。请参阅 [控制字](../../../user-guides/routing-and-networking-protocols/mpls/vpls/control-word.md) 一文了解更多信息。</ArgTableRow>
<ArgTableRow arg="bridge" typ="iface_enum" unset="1">该 VPLS 接口所属的网桥。</ArgTableRow>
<ArgTableRow arg="bridge-cost" typ="num" unset="1">网桥端口的开销。</ArgTableRow>
<ArgTableRow arg="bridge-horizon" typ="num" unset="1">设置为 `none` 时，不使用网桥 `horizon`。</ArgTableRow>
<ArgTableRow arg="bridge-pvid" typ="num" unset="1">分配给动态加入网桥的接口的端口 VLAN ID（pvid）。仅在网桥的 `vlan-filtering` 设置为 `yes` 时生效。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="current-peers" typ="string"></ArgTableRow>
</ArgTable>
