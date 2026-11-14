---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/map/ip"
sidebar_position: 1
title: "ip"
sidebar_label: 'ip'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/qos/map/ip
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/map/ip {#interfaceethernetswitchqosmapip}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 目录

将 DSCP 值匹配到 QoS 配置文件。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="map" typ="enum">映射表的名称。如果未设置，则会修改标准（内置）映射表。</ArgTableRow>
<ArgTableRow arg="dscp" typ="multi { dscp-range: range [0 .. 63]
 }" mandatory="1">用于查找的 DSCP 值。</ArgTableRow>
<ArgTableRow arg="profile" typ="enum" mandatory="1">要分配给匹配数据包的 QoS 配置文件的名称。</ArgTableRow>
</ArgTable>
