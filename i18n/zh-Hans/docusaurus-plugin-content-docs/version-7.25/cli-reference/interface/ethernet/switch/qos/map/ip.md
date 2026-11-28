---
title: "ip"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos/map/ip
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/interface/ethernet/switch/qos/map"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/qos/map/ip 
**Syscap：** rbswitch 和 crs_prestera
**Type：** Directory

将 DSCP 值匹配到 QoS 配置文件。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="map" typ="enum">The name of the mapping table. If not set, the standard (built-in) mapping table gets altered.</ArgTableRow>
<ArgTableRow arg="dscp" typ="multi { dscp-range: range [0 .. 63]
 }" mandatory="1">DSCP value(-s) for the lookup.</ArgTableRow>
<ArgTableRow arg="profile" typ="enum" mandatory="1">The name of the QoS profile to assign to the matched packets.</ArgTableRow>
</ArgTable>
