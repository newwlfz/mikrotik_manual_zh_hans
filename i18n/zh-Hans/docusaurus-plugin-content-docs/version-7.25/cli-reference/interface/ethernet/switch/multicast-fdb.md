---
title: "multicast-fdb"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/multicast-fdb
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/multicast-fdb 
**Syscap：** musicswitch
**Type：** Directory

CRS125 交换芯片在 MFDB 中最多支持 1024 个用于组播转发的条目。对于每个组播数据包，会在 MFDB 中执行目的 MAC 或目的 IP 查找。MFDB 条目不会自动学习，只能手动配置。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="alt { mac-address: macAddr
, ip-address: ipAddr
 }" mandatory="1">Matching IP address or MAC address for multicast packets.</ArgTableRow>
<ArgTableRow arg="ports" typ="multi { array-id }" mandatory="1">Member ports for multicast traffic.</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num">Multicast FDB lookup VLAN ID. If the VLAN learning mode is IVL, VLAN id is lookup id, otherwise VLAN id = 0.</ArgTableRow>
<ArgTableRow arg="svl" typ="bool">
Multicast FDB learning mode.
- `svl` - Shared VLAN Learning, learning/lookup is based on MAC addresses - not on VLAN IDs.
- `ivl` - Independent VLAN Learning, learning/lookup is based on both MAC addresses and VLAN IDs.
</ArgTableRow>
<ArgTableRow arg="bypass-vlan-filter" typ="bool">Allows bypassing VLAN filtering for matching multicast packets.</ArgTableRow>
<ArgTableRow arg="qos-group" typ="enum (none) { none:0xffffffff }">Defined QoS group from QoS group menu.</ArgTableRow>
</ArgTable>
