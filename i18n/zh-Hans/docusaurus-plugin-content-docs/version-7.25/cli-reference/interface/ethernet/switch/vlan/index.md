---
sidebar_key: "cli-reference/interface/ethernet/switch/vlan/index"
sidebar_position: 27
title: "vlan"
sidebar_label: 'vlan'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/vlan
captured_at: '2026-11-01T21:22:45+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/vlan {#interfaceethernetswitchvlan}
**系统能力：** musicswitch
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="vlan-id" typ="num" mandatory="1">VLAN 成员条目的 VLAN ID。</ArgTableRow>
<ArgTableRow arg="ports" typ="multi { array-id }" mandatory="1">VLAN 的成员端口。</ArgTableRow>
<ArgTableRow arg="svl" typ="bool">
用于在 UFDB 和 MFDB 中查找的 FDB 查找模式。
- `svl` - 共享 VLAN 学习，学习和查找基于 MAC 地址，而不是 VLAN ID。
- `ivl` - 独立 VLAN 学习，学习和查找同时基于 MAC 地址和 VLAN ID。
</ArgTableRow>
<ArgTableRow arg="learn" typ="bool">启用或禁用 VLAN 的源 MAC 学习。</ArgTableRow>
<ArgTableRow arg="flood" typ="bool">启用或禁用按 VLAN 的强制 VLAN 泛洪。如果启用，将忽略在 UFDB 或 MFDB 中进行的目标 MAC 查找结果，并强制数据包在该 VLAN 中泛洪。</ArgTableRow>
<ArgTableRow arg="ingress-mirror" typ="bool">启用按 VLAN 的入方向镜像，以支持基于 VLAN 的镜像功能。</ArgTableRow>
<ArgTableRow arg="qos-group" typ="enum (none) { none:0xffffffff }">QoS 组菜单中定义的 QoS 组。</ArgTableRow>
</ArgTable>

## interface/ethernet/switch/vlan {#interfaceethernetswitchvlan-1}
**系统能力：** rbswitch 和 oldswitch
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="switch" typ="enum" mandatory="1">相应 VLAN 条目所针对的交换机名称。</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num" mandatory="1">VLAN 成员条目的 VLAN ID。</ArgTableRow>
<ArgTableRow arg="ports" typ="multi { array-id, port: enum
 }" mandatory="1">VLAN 的成员端口。</ArgTableRow>
<ArgTableRow arg="independent-learning" typ="bool">是否使用 shared-VLAN-learning (SVL) 或 independent-VLAN-learning (IVL)。</ArgTableRow>
</ArgTable>
