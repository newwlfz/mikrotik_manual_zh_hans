---
title: "vlan"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos/map/vlan
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/qos/map/vlan 
**Syscap：** rbswitch 和 crs_prestera
**Type：** 目录

将 VLAN 优先级（802.1p PCP/DEI 字段）匹配到 QoS 配置文件。默认情况下，所有值都会匹配到默认 QoS 配置文件。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="map" typ="enum">The name of the mapping table.</ArgTableRow>
<ArgTableRow arg="pcp" typ="multi { pcp-range: range [0 .. 7]
 }" mandatory="1">VLAN priority (PCP) value(-s) for the lookup.</ArgTableRow>
<ArgTableRow arg="dei-only" typ="bool">Maps only packets with DEI (formerly CFI) bit set in the VLAN header.</ArgTableRow>
<ArgTableRow arg="profile" typ="enum" mandatory="1">The name of the QoS profile to assign to the matched packets.</ArgTableRow>
</ArgTable>
