---
sidebar_key: "cli-reference/interface/ethernet/switch/ingress-vlan-translation"
sidebar_position: 8
title: "ingress-vlan-translation"
sidebar_label: 'ingress-vlan-translation'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/ingress-vlan-translation
captured_at: '2026-11-01T21:22:34+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/ingress-vlan-translation {#interfaceethernetswitchingress-vlan-translation}
**系统能力：** musicswitch
**类型：** 目录

入站 VLAN 转换表允许每个端口最多 15 个条目。可以从数据包头中选择一个或多个字段，以便在入站 VLAN 转换表中查找。第一个匹配条目中配置的 S-VLAN 或 C-VLAN 或两者都会分配给该数据包。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="protocol" typ="alt { protocol-name: enum (length | llc-bpdu) { length:1, llc-bpdu:0x4242 }
, protocol-number: num [ .. 65535]
 }">匹配以太网协议。（仅用于入站 VLAN 转换）</ArgTableRow>
<ArgTableRow arg="sa-learning" typ="bool">启用或禁用 VLAN 转换后的源 MAC 学习。（仅用于入站 VLAN 转换）</ArgTableRow>
<ArgTableRow arg="ports" typ="multi { array-id }" mandatory="1">匹配 VLAN 转换规则的交换机端口。</ArgTableRow>
<ArgTableRow arg="service-vlan-format" typ="enum (untagged-or-tagged | priority-tagged-or-tagged | tagged | any) { untagged-or-tagged:0, priority-tagged-or-tagged:1, tagged:2, any:3 }">带有服务标签的帧类型，VLAN 转换规则对其有效。</ArgTableRow>
<ArgTableRow arg="service-vid" typ="num">匹配服务标签的 VLAN ID。</ArgTableRow>
<ArgTableRow arg="service-pcp" typ="num">匹配服务标签的 PCP。</ArgTableRow>
<ArgTableRow arg="service-dei" typ="num">匹配服务标签的 DEI。</ArgTableRow>
<ArgTableRow arg="customer-vlan-format" typ="enum (untagged-or-tagged | priority-tagged-or-tagged | tagged | any) { untagged-or-tagged:0, priority-tagged-or-tagged:1, tagged:2, any:3 }">带有客户标签的帧类型，VLAN 转换规则对其有效。</ArgTableRow>
<ArgTableRow arg="customer-vid" typ="num">匹配客户标签的 VLAN ID。</ArgTableRow>
<ArgTableRow arg="customer-pcp" typ="num">匹配客户标签的 PCP。</ArgTableRow>
<ArgTableRow arg="customer-dei" typ="num">匹配客户标签的 DEI。</ArgTableRow>
<ArgTableRow arg="new-service-vid" typ="alt { special-vid: enum (customer-vid) { customer-vid:4096 }
, vid: num [ .. 4095]
 }">新的服务 VLAN ID 会替换匹配的服务 VLAN ID。</ArgTableRow>
<ArgTableRow arg="new-customer-vid" typ="alt { special-vid: enum (service-vid) { service-vid:4096 }
, vid: num [ .. 4095]
 }">新的客户 VLAN ID 会替换匹配的客户 VLAN ID。如果设置为 4095 且使用入站 VLAN 转换，则流量会被丢弃。</ArgTableRow>
<ArgTableRow arg="pcp-propagation" typ="bool">
启用或禁用 PCP 传播。
- 如果端口类型为 Edge，则客户 PCP 从服务 PCP 复制。
- 如果端口类型为 Network，则服务 PCP 从客户 PCP 复制。
</ArgTableRow>
<ArgTableRow arg="swap-vids" typ="enum (no | assign-cvid-to-svid) { no:0, assign-cvid-to-svid:0 }"></ArgTableRow>
</ArgTable>
下表列出了会触发具有特定 VLAN 格式设置的规则的流量；请注意，带有 VLAN ID 0 标签的流量是一种特殊情况，也会被考虑在内。

| 属性 | 描述 |
| :-- | :-- |
| **any** | 接受：未标记流量标记流量带优先级设置的标记流量VLAN 0 流量带优先级设置的 VLAN 0 流量 |
| **priority-tagged-or-tagged** | 接受：标记流量带优先级设置的标记流量VLAN 0 流量带优先级设置的 VLAN 0 流量 |
| **tagged** | 接受：标记流量带优先级设置的标记流量 |
| **untagged-or-tagged** | 接受：未标记流量标记流量带优先级设置的标记流量 |

:::danger
如果 `VLAN-format` 设置为 `any`，那么将 `customer-vid``/``service-vid` 设置为 `0` 会触发针对 VLAN 0 流量的交换机规则。在这种情况下，交换机规则会查找未标记流量或带有 VLAN 0 标签的流量，只有 `untagged-or-tagged` 会过滤掉 VLAN 0 流量。
:::
