---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/profile"
sidebar_position: 5
title: "profile"
sidebar_label: 'profile'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos/profile
captured_at: '2026-11-01T21:22:39+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/profile {#interfaceethernetswitchqosprofile}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 目录

QoS 配置文件决定转发/路由数据包的优先级字段值（PCP、DSCP）。拥塞避免/解决基于 QoS 配置文件。每个数据包会根据入站交换机端口 QoS 设置获得一个 QoS 配置文件分配（参见 `/in/eth/sw/port`）。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">用户定义的 QoS 配置文件名称。</ArgTableRow>
<ArgTableRow arg="pcp" typ="num">VLAN 优先级值（IEEE 802.1q PCP - 优先级代码点）。仅当分配给该 QoS 配置文件的出站数据包带有 VLAN 标签（具有 802.1q 报头）时使用。该值可通过 QoS Egress Map 进一步修改。</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">分配给该 QoS 配置文件的出站数据包的 IPv4/IPv6 DSCP 字段值。</ArgTableRow>
<ArgTableRow arg="traffic-class" typ="num">流量类别决定数据包优先级和出站队列。队列编号通常与流量类别相同（tc0 的数据包进入 queue0，tc1 - queue1，... tc7 - queue7）。TC0 始终选择最低优先级。</ArgTableRow>
<ArgTableRow arg="automap" typ="bool">自动将 PCP 或 DSCP 值匹配的数据包映射到该 QoS 配置文件。仅适用于 **trusted** 端口。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="hw-id" typ="num"></ArgTableRow>
</ArgTable>
