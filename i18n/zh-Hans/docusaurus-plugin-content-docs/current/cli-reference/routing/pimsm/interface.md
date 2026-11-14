---
sidebar_key: "cli-reference/routing/pimsm/interface"
sidebar_position: 5
title: "interface"
sidebar_label: 'interface'
source: https://manual.mikrotik.com/docs/cli-reference/routing/pimsm/interface
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/pimsm/interface {#routingpimsminterface}
**条件：** !smips
**类型：** 目录

interface 菜单显示当前参与 PIM 的所有接口及其状态。此菜单包含由已定义的接口模板创建的动态和只读条目。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="P" typ="pim-enabled">该接口已启用 PIM。</ArgTableRow>
<ArgTableRow arg="G" typ="gmp-enabled">该接口已配置为进行 GMP（IGMP/MLD）操作。</ArgTableRow>
<ArgTableRow arg="R" typ="designated-router">该路由器是该接口网络上的指定路由器（DR）。</ArgTableRow>
<ArgTableRow arg="J" typ="join-tracking">该接口已启用加入跟踪。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum">该接口所属的 PIM 实例。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">接口的名称。</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46)">该接口上 PIM 使用的 IP 地址。</ArgTableRow>
<ArgTableRow arg="pim.priority" typ="num">该路由器在接口网络上的 DR 优先级。DR 优先级最高的路由器会被选举为指定路由器。</ArgTableRow>
<ArgTableRow arg="pim.propagation-delay" typ="time">该接口网络上 DR 使用的传播延迟，会在 PIM hello 消息中通告。</ArgTableRow>
<ArgTableRow arg="pim.override-interval" typ="time">该接口网络上 DR 使用的覆盖间隔，会在 PIM hello 消息中通告。</ArgTableRow>
<ArgTableRow arg="gmp.robustness" typ="num">该接口上 IGMP/MLD 查询器配置的健壮性值。</ArgTableRow>
<ArgTableRow arg="gmp.query-interval" typ="time">该接口上发送 IGMP/MLD 通用查询的配置间隔。</ArgTableRow>
<ArgTableRow arg="gmp.query-response-interval" typ="time">该接口上 IGMP/MLD 通用查询中通告的已配置最大响应时间。</ArgTableRow>
<ArgTableRow arg="gmp.last-member-query-interval" typ="time">该接口上 IGMP/MLD 组特定查询中通告的已配置响应时间。</ArgTableRow>
<ArgTableRow arg="gmp.querier" typ="bool">该路由器当前是否是该接口上选举出的 IGMP/MLD 查询器。</ArgTableRow>
<ArgTableRow arg="gmp.state.robustness" typ="num">该接口上实际使用的有效健壮性值。当路由器不是选举出的查询器时，它会采用选举出的查询器在其查询中通告的健壮性值。</ArgTableRow>
<ArgTableRow arg="gmp.state.query-interval" typ="time">该接口上实际使用的有效查询间隔。当路由器不是选举出的查询器时，它会采用选举出的查询器在其查询中通告的查询间隔。</ArgTableRow>
</ArgTable>
