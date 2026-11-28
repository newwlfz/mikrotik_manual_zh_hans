---
title: "dscp-qos-map"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/dscp-qos-map
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/dscp-qos-map 
**Syscap：** musicswitch
**类型：** Directory

全局 DSCP 到 QOS 映射表用于将数据包的 DSCP 映射到表中配置的新 QoS 属性。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="drop-precedence" typ="enum (green | yellow | red | drop)">The new value of Drop precedence for the DSCP to QoS mapping entry.</ArgTableRow>
<ArgTableRow arg="dei" typ="num">The new value of DEI for the DSCP to QoS mapping entry.</ArgTableRow>
<ArgTableRow arg="pcp" typ="num">The new value of PCP for the DSCP to QoS mapping entry.</ArgTableRow>
<ArgTableRow arg="priority" typ="num">The new value of internal priority for the DSCP to QoS mapping entry.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="dscp" typ="num"></ArgTableRow>
<ArgTableRow arg="hex" typ="num"></ArgTableRow>
</ArgTable>
