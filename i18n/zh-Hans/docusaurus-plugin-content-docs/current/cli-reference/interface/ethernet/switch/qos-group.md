---
sidebar_key: "cli-reference/interface/ethernet/switch/qos-group"
sidebar_position: 19
title: "qos-group"
sidebar_label: 'qos-group'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/qos-group
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos-group {#interfaceethernetswitchqos-group}
**系统能力：** musicswitch
**类型：** 目录

全局 QoS 组表用于基于 VLAN、基于协议和基于 MAC 的 QoS 组分配配置。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">QoS 组的名称。</ArgTableRow>
<ArgTableRow arg="pcp" typ="num">QoS 组的 PCP 新值。</ArgTableRow>
<ArgTableRow arg="dei" typ="num">QoS 组的 DEI 新值。</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">QoS 组的 DSCP 新值。</ArgTableRow>
<ArgTableRow arg="priority" typ="num">内部优先级具有本地意义，用于将流量分类到端口上的不同出口队列（1 最高，15 最低）。</ArgTableRow>
<ArgTableRow arg="drop-precedence" typ="enum (green | yellow | red | drop)">丢弃优先级是用于数据包入队或丢弃的内部 QoS 属性。</ArgTableRow>
</ArgTable>
