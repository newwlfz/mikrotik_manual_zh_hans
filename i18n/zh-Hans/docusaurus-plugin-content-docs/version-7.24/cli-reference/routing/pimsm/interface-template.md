---
sidebar_key: "cli-reference/routing/pimsm/interface-template"
sidebar_position: 4
title: "interface-template"
sidebar_label: "interface-template"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/pimsm/interface-template
captured_at: '2026-11-01T21:29:37+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/pimsm/interface-template {#routingpimsminterface-template}
**条件：** !smips
**类型：** 目录

接口模板菜单定义哪些接口将参与 PIM，以及将使用什么逐接口配置。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum" mandatory="1">此接口模板所属的 PIM 实例名称。</ArgTableRow>
<ArgTableRow arg="interfaces" typ="object { interface: iface_enum
 }" unset="1">将参与 PIM 的接口列表。</ArgTableRow>
<ArgTableRow arg="hello-period" typ="time">Hello 消息的周期间隔。</ArgTableRow>
<ArgTableRow arg="hello-delay" typ="time">接口启动或检测到新邻居时，初始 Hello 消息的随机间隔。</ArgTableRow>
<ArgTableRow arg="priority" typ="num">指定路由器（DR）优先级。每个网络选举一个指定路由器。仅当所有邻居都通告了优先级选项时才使用优先级。数值最大的优先级优先。如果出现平局或未使用优先级，则数值最大的 IP 地址优先。</ArgTableRow>
<ArgTableRow arg="join-prune-period" typ="time"></ArgTableRow>
<ArgTableRow arg="propagation-delay" typ="time">设置 prune pending 计时器的值。上游路由器用它来确定在修剪启用了 Join 抑制的接口之前，应等待 Join 覆盖消息多长时间。</ArgTableRow>
<ArgTableRow arg="override-interval" typ="time">设置最大时间段，用于在启用了 Join 抑制的网络上调度延迟的 Join 覆盖消息时进行随机化。</ArgTableRow>
<ArgTableRow arg="join-tracking-support" typ="bool">设置 Hello 消息中 LAN Prune Delay 选项的 Tracking (T) 位的值。启用后，路由器会通告其禁用 Join 抑制的意愿。如果禁用了 Join 抑制，上游路由器可以显式跟踪各个下游路由器的加入成员关系。除非链路中的所有 PIM 路由器都协商此能力，否则无法进行显式跟踪，也无法禁用 Join 抑制机制。</ArgTableRow>
<ArgTableRow arg="source-addresses" typ="object { address: address (flags=46)
 }" unset="1"></ArgTableRow>
</ArgTable>
