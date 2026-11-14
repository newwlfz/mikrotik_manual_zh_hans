---
sidebar_key: "cli-reference/interface/ethernet/switch/protocol-based-vlan"
sidebar_position: 17
title: "protocol-based-vlan"
sidebar_label: 'protocol-based-vlan'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/protocol-based-vlan
captured_at: '2026-11-01T21:22:38+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/protocol-based-vlan {#interfaceethernetswitchprotocol-based-vlan}
**系统能力：** musicswitch
**类型：**目录

基于协议的 VLAN 表用于按端口为相关协议数据包分配 VID 和 QoS 属性。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="frame-type" typ="enum (ethernet | rfc-1042 | llc) { ethernet:0, rfc-1042:1, llc:2 }">匹配帧的封装类型。</ArgTableRow>
<ArgTableRow arg="protocol" typ="alt { protocol: enum ()
, protocol-number: num [ .. 65535]
 }">基于协议的 VLAN 规则所匹配的协议。</ArgTableRow>
<ArgTableRow arg="ports" typ="multi { array-id }" mandatory="1">基于协议的 VLAN 规则所匹配的交换机端口。</ArgTableRow>
<ArgTableRow arg="set-service-vid-for" typ="enum (none | untagged-or-priority-tagged | tagged | all) { none:0, untagged-or-priority-tagged:1, tagged:2, all:3 }">针对不同数据包类型的服务 VLAN ID 分配命令。</ArgTableRow>
<ArgTableRow arg="new-service-vid" typ="num">新的服务 VLAN ID 会替换指定协议的原始服务 VLAN ID。</ArgTableRow>
<ArgTableRow arg="set-customer-vid-for" typ="enum (none | untagged-or-priority-tagged | tagged | all) { none:0, untagged-or-priority-tagged:1, tagged:2, all:3 }">针对不同数据包类型的客户 VLAN ID 分配命令。</ArgTableRow>
<ArgTableRow arg="new-customer-vid" typ="num">新的客户 VLAN ID 会替换指定协议的原始客户 VLAN ID。如果设置为 4095，则流量会被丢弃。</ArgTableRow>
<ArgTableRow arg="set-qos-for" typ="enum (none | untagged-or-priority-tagged | tagged | all) { none:0, untagged-or-priority-tagged:1, tagged:2, all:3 }">QoS 分配命令适用的帧类型。</ArgTableRow>
<ArgTableRow arg="qos-group" typ="enum (none) { none:0xffffffff }">从 QoS 组菜单中定义的 QoS 组。</ArgTableRow>
</ArgTable>
