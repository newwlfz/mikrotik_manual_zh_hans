---
title: "one2one-vlan-switching"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/one2one-vlan-switching
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/one2one-vlan-switching 
**Syscap：** musicswitch
**类型：** Directory

1:1 VLAN switching 可用于替代匹配数据包的常规 L2 网桥。当数据包命中 1:1 VLAN switching 表项时，表项中的目的端口信息会分配给该数据包。UFDB 和 MFDB 表项中匹配的目的信息不再适用于该数据包。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="dst-port" typ="alt { port: enum
, trunk: enum
 }" mandatory="1">Destination port for matched 1:1 VLAN switching packets.</ArgTableRow>
<ArgTableRow arg="service-vid" typ="num">Matching service VLAN id for 1:1 VLAN switching.</ArgTableRow>
<ArgTableRow arg="customer-vid" typ="num">Matching customer VLAN id for 1:1 VLAN switching.</ArgTableRow>
</ArgTable>
