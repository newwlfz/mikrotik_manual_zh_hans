---
sidebar_key: "cli-reference/interface/ethernet/switch/multicast-fdb"
sidebar_position: 11
title: "multicast-fdb"
sidebar_label: 'multicast-fdb'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/multicast-fdb
captured_at: '2026-11-01T21:22:35+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/multicast-fdb {#interfaceethernetswitchmulticast-fdb}
**系统能力：** musicswitch
**类型：** 目录

CRS125 交换芯片在 MFDB 中最多支持 1024 个条目用于组播转发。对于每个组播数据包，在 MFDB 中执行目标 MAC 或目标 IP 查找。MFDB 条目不会自动学习，只能配置。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="alt { mac-address: macAddr
, ip-address: ipAddr
 }" mandatory="1">用于匹配组播数据包的 IP 地址或 MAC 地址。</ArgTableRow>
<ArgTableRow arg="ports" typ="multi { array-id }" mandatory="1">组播流量的成员端口。</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num">组播 FDB 查找 VLAN ID。如果 VLAN 学习模式为 IVL，则 VLAN ID 为查找 ID，否则 VLAN ID = 0。</ArgTableRow>
<ArgTableRow arg="svl" typ="bool">
组播 FDB 学习模式。
- `svl` - 共享 VLAN 学习，学习/查找基于 MAC 地址，而不是 VLAN ID。
- `ivl` - 独立 VLAN 学习，学习/查找同时基于 MAC 地址和 VLAN ID。
</ArgTableRow>
<ArgTableRow arg="bypass-vlan-filter" typ="bool">允许匹配的组播数据包绕过 VLAN 过滤。</ArgTableRow>
<ArgTableRow arg="qos-group" typ="enum (none) { none:0xffffffff }">从 QoS 组菜单中定义的 QoS 组。</ArgTableRow>
</ArgTable>
