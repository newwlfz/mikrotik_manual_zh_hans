---
title: "dscp-to-dscp"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/dscp-to-dscp
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/dscp-to-dscp 
**Syscap：** musicswitch
**类型：** Directory

全局 DSCP 到 DSCP 映射表用于将数据包的原始 DSCP 映射为表中配置的新 DSCP 值。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="new-dscp" typ="num">The new value of DSCP for the DSCP to DSCP mapping entry.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="original-dscp" typ="num"></ArgTableRow>
<ArgTableRow arg="hex" typ="num"></ArgTableRow>
</ArgTable>
