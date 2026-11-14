---
sidebar_key: "cli-reference/interface/ethernet/switch/dscp-qos-map"
sidebar_position: 2
title: "dscp-qos-map"
sidebar_label: 'dscp-qos-map'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/dscp-qos-map
captured_at: '2026-11-01T21:22:33+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/dscp-qos-map {#interfaceethernetswitchdscp-qos-map}
**系统能力：** musicswitch
**类型：** 目录

全局 DSCP 到 QoS 映射表用于将数据包的 DSCP 映射到表中配置的新 QoS 属性。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="drop-precedence" typ="enum (green | yellow | red | drop)">该 DSCP 到 QoS 映射条目的新 Drop precedence 值。</ArgTableRow>
<ArgTableRow arg="dei" typ="num">该 DSCP 到 QoS 映射条目的新 DEI 值。</ArgTableRow>
<ArgTableRow arg="pcp" typ="num">该 DSCP 到 QoS 映射条目的新 PCP 值。</ArgTableRow>
<ArgTableRow arg="priority" typ="num">该 DSCP 到 QoS 映射条目的新内部优先级值。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="dscp" typ="num"></ArgTableRow>
<ArgTableRow arg="hex" typ="num"></ArgTableRow>
</ArgTable>
