---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/map/vlan"
sidebar_position: 2
title: "vlan"
sidebar_label: 'vlan'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/qos/map/vlan
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/map/vlan {#interfaceethernetswitchqosmapvlan}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 目录

将 VLAN 优先级（802.1p PCP/DEI 字段）匹配到 QoS 配置文件。默认情况下，所有值都匹配到默认 QoS 配置文件。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="map" typ="enum">映射表的名称。</ArgTableRow>
<ArgTableRow arg="pcp" typ="multi { pcp-range: range [0 .. 7]
 }" mandatory="1">用于查找的 VLAN 优先级（PCP）值。</ArgTableRow>
<ArgTableRow arg="dei-only" typ="bool">仅映射 VLAN 头中设置了 DEI（原为 CFI）位的报文。</ArgTableRow>
<ArgTableRow arg="profile" typ="enum" mandatory="1">要分配给匹配报文的 QoS 配置文件的名称。</ArgTableRow>
</ArgTable>
