---
title: "ingress-vlan-translation"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/ingress-vlan-translation
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/interface/ethernet/switch/l3hw-settings"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/ethernet/switch/ingress-vlan-translation 
**Syscap：** musicswitch
**类型：** Directory

Ingress VLAN Translation 表允许每个端口最多配置 15 条条目。可以从数据包报头中选择一个或多个字段，用于在 Ingress VLAN Translation 表中查找。第一个匹配条目中配置的 S-VLAN 或 C-VLAN，或两者，将分配给该数据包。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="protocol" typ="alt { protocol-name: enum (length | llc-bpdu) { length:1, llc-bpdu:0x4242 }
, protocol-number: num [ .. 65535]
 }">Matching Ethernet protocol. (only for Ingress VLAN Translation)</ArgTableRow>
<ArgTableRow arg="sa-learning" typ="bool">Enables or disables source MAC learning after VLAN translation. (only for Ingress VLAN Translation)</ArgTableRow>
<ArgTableRow arg="ports" typ="multi { array-id }" mandatory="1">Matching switch ports for VLAN translation rule.</ArgTableRow>
<ArgTableRow arg="service-vlan-format" typ="enum (untagged-or-tagged | priority-tagged-or-tagged | tagged | any) { untagged-or-tagged:0, priority-tagged-or-tagged:1, tagged:2, any:3 }">Type of frames with service tag for which VLAN translation rule is valid.</ArgTableRow>
<ArgTableRow arg="service-vid" typ="num">Matching VLAN ID of the service tag.</ArgTableRow>
<ArgTableRow arg="service-pcp" typ="num">Matching PCP of the service tag.</ArgTableRow>
<ArgTableRow arg="service-dei" typ="num">Matching DEI of the service tag.</ArgTableRow>
<ArgTableRow arg="customer-vlan-format" typ="enum (untagged-or-tagged | priority-tagged-or-tagged | tagged | any) { untagged-or-tagged:0, priority-tagged-or-tagged:1, tagged:2, any:3 }">Type of frames with customer tag for which VLAN translation rule is valid.</ArgTableRow>
<ArgTableRow arg="customer-vid" typ="num">Matching the VLAN ID of the customer tag.</ArgTableRow>
<ArgTableRow arg="customer-pcp" typ="num">Matching PCP of the customer tag.</ArgTableRow>
<ArgTableRow arg="customer-dei" typ="num">Matching DEI of the customer tag.</ArgTableRow>
<ArgTableRow arg="new-service-vid" typ="alt { special-vid: enum (customer-vid) { customer-vid:4096 }
, vid: num [ .. 4095]
 }">The new service VLAN ID replaces the matching service VLAN ID.</ArgTableRow>
<ArgTableRow arg="new-customer-vid" typ="alt { special-vid: enum (service-vid) { service-vid:4096 }
, vid: num [ .. 4095]
 }">The new customer VLAN ID replaces the matching customer VLAN ID. If set to 4095 and ingress VLAN translation is used, then traffic is dropped.</ArgTableRow>
<ArgTableRow arg="pcp-propagation" typ="bool">
Enables or disables PCP propagation.
- If the port type is Edge, the customer PCP is copied from the service PCP.
- If the port type is Network, the service PCP is copied from the customer PCP.
</ArgTableRow>
<ArgTableRow arg="swap-vids" typ="enum (no | assign-cvid-to-svid) { no:0, assign-cvid-to-svid:0 }"></ArgTableRow>
</ArgTable>
Below is a table of traffic that triggers a rule that has a certain VLAN format set; note that traffic that is tagged with VLAN ID 0 is a special case that is also taken into account.

| 属性 | 描述 |
| :-- | :-- |
| **any** | 接受：未标记流量；带标记流量；带优先级标记的流量；VLAN 0 流量；带优先级标记的 VLAN 0 流量 |
| **priority-tagged-or-tagged** | 接受：带标记流量；带优先级标记的流量；VLAN 0 流量；带优先级标记的 VLAN 0 流量 |
| **tagged** | 接受：带标记流量；带优先级标记的流量 |
| **untagged-or-tagged** | 接受：未标记流量；带标记流量；带优先级标记的流量 |

:::danger
如果 `VLAN-format` 设置为 `any`，则设置为 `0` 的 `customer-vid``/``service-vid` 将使用 VLAN 0 流量触发交换机规则。在这种情况下，交换机规则将查找未带标签的流量或带有 VLAN 0 标签的流量，并且只有 `untagged-or-tagged` 会过滤掉 VLAN 0 流量。
:::
