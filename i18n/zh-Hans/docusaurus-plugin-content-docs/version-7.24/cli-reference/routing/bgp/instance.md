---
sidebar_key: "cli-reference/routing/bgp/instance"
sidebar_position: 4
title: "instance"
sidebar_label: "instance"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/bgp/instance
captured_at: '2026-11-01T21:29:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/bgp/instance {#routingbgpinstance}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="routing-table" typ="enum" unset="1">路由表的名称，用于安装路由。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum" unset="1">BGP 连接所使用的 VRF 名称。默认始终使用 "main" 路由表。</ArgTableRow>
<ArgTableRow arg="router-id" typ="alt { ip: ipAddr
, name: enum
 }" unset="1">要使用的 BGP Router ID。通过指定引用名称来使用 `/routing/router-id` 配置中的 ID，或通过指定 IP 直接设置 ID。相同的 router-id 也用于将邻居分组到一个实例中。</ArgTableRow>
<ArgTableRow arg="as" typ="super { as: as
, [sub-as] [ /as]
 }" unset="1">32 位 BGP 自治系统号。以 AS-Plain 或 AS-Dot 格式输入该值。使用以下格式配置 BGP 联盟：_`confederation_as/as`_。例如，如果你的 AS 是 34，联盟 AS 是 43，则设置 `as=43/34`。</ArgTableRow>
<ArgTableRow arg="cluster-id" typ="ipAddr" unset="1">对于路由反射器实例，请指定路由反射器集群的集群 ID。此属性用于标识来自集群中其他路由反射器的路由更新，以避免路由信息环路。通常每个集群只有一个路由反射器；在这种情况下，不要配置 'cluster-id'，而改用 BGP router ID。</ArgTableRow>
<ArgTableRow arg="ignore-as-path-len" typ="bool" unset="1">在 BGP 路由选择算法中忽略 **AS_PATH** 属性。适用于输入。</ArgTableRow>
<ArgTableRow arg="multipath" typ="num" unset="1">安装指定数量的 ECMP 路由，这些路由由 add-path 接收或由[最佳路径选择](../../../user-guides/routing-and-networking-protocols/unicast/bgp/understanding-bgp.md#best-path-selection)选出。</ArgTableRow>
</ArgTable>
