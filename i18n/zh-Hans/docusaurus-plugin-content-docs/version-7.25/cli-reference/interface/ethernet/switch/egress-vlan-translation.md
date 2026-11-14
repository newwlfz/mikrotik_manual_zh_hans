---
sidebar_key: "cli-reference/interface/ethernet/switch/egress-vlan-translation"
sidebar_position: 5
title: "egress-vlan-translation"
sidebar_label: 'egress-vlan-translation'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/egress-vlan-translation
captured_at: '2026-11-01T21:22:34+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/egress-vlan-translation {#interfaceethernetswitchegress-vlan-translation}
**系统能力：** musicswitch
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ports" typ="multi { array-id }" mandatory="1">与 VLAN 转换规则匹配的交换机端口。</ArgTableRow>
<ArgTableRow arg="service-vlan-format" typ="enum (untagged-or-tagged | priority-tagged-or-tagged | tagged | any) { untagged-or-tagged:0, priority-tagged-or-tagged:1, tagged:2, any:3 }">VLAN 转换规则适用的带服务标签的帧类型。</ArgTableRow>
<ArgTableRow arg="service-vid" typ="num">匹配服务标签的 VLAN ID。</ArgTableRow>
<ArgTableRow arg="service-pcp" typ="num">匹配服务标签的 PCP。</ArgTableRow>
<ArgTableRow arg="service-dei" typ="num">匹配服务标签的 DEI。</ArgTableRow>
<ArgTableRow arg="customer-vlan-format" typ="enum (untagged-or-tagged | priority-tagged-or-tagged | tagged | any) { untagged-or-tagged:0, priority-tagged-or-tagged:1, tagged:2, any:3 }">VLAN 转换规则适用的带客户标签的帧类型。</ArgTableRow>
<ArgTableRow arg="customer-vid" typ="num">匹配客户标签的 VLAN ID。</ArgTableRow>
<ArgTableRow arg="customer-pcp" typ="num">匹配客户标签的 PCP。</ArgTableRow>
<ArgTableRow arg="customer-dei" typ="num">匹配客户标签的 DEI。</ArgTableRow>
<ArgTableRow arg="new-service-vid" typ="alt { special-vid: enum (customer-vid) { customer-vid:4096 }
, vid: num [ .. 4095]
 }">新的服务 VLAN ID 会替换匹配的服务 VLAN ID。</ArgTableRow>
<ArgTableRow arg="new-customer-vid" typ="alt { special-vid: enum (service-vid) { service-vid:4096 }
, vid: num [ .. 4095]
 }">新的客户 VLAN ID 会替换匹配的客户 VLAN ID。</ArgTableRow>
<ArgTableRow arg="pcp-propagation" typ="bool">
启用或禁用 PCP 传播。
- 如果端口类型为 Edge，则客户 PCP 会从服务 PCP 复制。
- 如果端口类型为 Network，则服务 PCP 会从客户 PCP 复制。
</ArgTableRow>
<ArgTableRow arg="swap-vids" typ="enum (no | assign-cvid-to-svid) { no:0, assign-cvid-to-svid:0 }"></ArgTableRow>
</ArgTable>
