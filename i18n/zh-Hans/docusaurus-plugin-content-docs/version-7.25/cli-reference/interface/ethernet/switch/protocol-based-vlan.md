---
title: "protocol-based-vlan"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/protocol-based-vlan
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/interface/ethernet/switch/qos"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/protocol-based-vlan 
**Syscap：** musicswitch
**Type：** Directory

Protocol Based VLAN 表用于按端口为相关协议数据包分配 VID 和 QoS 属性。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="frame-type" typ="enum (ethernet | rfc-1042 | llc) { ethernet:0, rfc-1042:1, llc:2 }">Encapsulation type of the matching frames.</ArgTableRow>
<ArgTableRow arg="protocol" typ="alt { protocol: enum ()
, protocol-number: num [ .. 65535]
 }">Matching protocol for Protocol-based VLAN rule.</ArgTableRow>
<ArgTableRow arg="ports" typ="multi { array-id }" mandatory="1">Matching switch ports for Protocol-based VLAN rule.</ArgTableRow>
<ArgTableRow arg="set-service-vid-for" typ="enum (none | untagged-or-priority-tagged | tagged | all) { none:0, untagged-or-priority-tagged:1, tagged:2, all:3 }">Service VLAN ID assignment command for different packet types.</ArgTableRow>
<ArgTableRow arg="new-service-vid" typ="num">The new service VLAN ID replaces the original service VLAN ID for the specified protocol.</ArgTableRow>
<ArgTableRow arg="set-customer-vid-for" typ="enum (none | untagged-or-priority-tagged | tagged | all) { none:0, untagged-or-priority-tagged:1, tagged:2, all:3 }">Customer VLAN ID assignment command for different packet types.</ArgTableRow>
<ArgTableRow arg="new-customer-vid" typ="num">The new customer VLAN ID replaces the original customer VLAN ID for the specified protocol. If set to 4095, then traffic is dropped.</ArgTableRow>
<ArgTableRow arg="set-qos-for" typ="enum (none | untagged-or-priority-tagged | tagged | all) { none:0, untagged-or-priority-tagged:1, tagged:2, all:3 }">Frame type for which QoS assignment command applies.</ArgTableRow>
<ArgTableRow arg="qos-group" typ="enum (none) { none:0xffffffff }">Defined QoS group from the QoS group menu.</ArgTableRow>
</ArgTable>
