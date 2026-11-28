---
title: "mac-based-vlan"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/mac-based-vlan
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/ethernet/switch/mac-based-vlan 
**Syscap：** musicswitch
**Type：** Directory

MAC Based VLAN 表用于根据源 MAC 分配 VLAN。

所有 CRS1xx/2xx 系列交换机支持最多 1024 条基于 MAC 的 VLAN 表项。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="src-mac-address" typ="macAddr" mandatory="1">Matching source MAC address for MAC based VLAN rule.</ArgTableRow>
<ArgTableRow arg="new-service-vid" typ="num">The new service VLAN ID replaces the original service VLAN ID for matched packets.</ArgTableRow>
<ArgTableRow arg="new-customer-vid" typ="num">The new customer VLAN ID replaces the original service VLAN ID for matched packets. If set to 4095, then traffic is dropped.</ArgTableRow>
</ArgTable>
