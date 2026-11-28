---
title: "egress-vlan-tag"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/egress-vlan-tag
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/ethernet/switch/egress-vlan-tag 
**Syscap：** musicswitch
**类型：** Directory

出站数据包可以分配不同的 VLAN 标签格式。当数据包发送到出站端口（目的端口）时，VLAN 标签可以被移除、添加或保持原样。每个端口都有独立的出站 VLAN 标签格式控制。标签格式包括：
- Untagged
- Tagged
- Unmodified

Egress VLAN Tag 表包含 4096 个条目，用于 VLAN tag 选择。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="vlan-id" typ="num" mandatory="1">VLAN ID which is tagged in egress.</ArgTableRow>
<ArgTableRow arg="tagged-ports" typ="multi { array-id }">Ports that are tagged in egress.</ArgTableRow>
</ArgTable>
