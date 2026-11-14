---
sidebar_key: "cli-reference/interface/ethernet/switch/one2one-vlan-switching"
sidebar_position: 12
title: "one2one-vlan-switching"
sidebar_label: 'one2one-vlan-switching'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/one2one-vlan-switching
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/one2one-vlan-switching {#interfaceethernetswitchone2one-vlan-switching}
**系统能力：** musicswitch
**类型：** 目录

1:1 VLAN 交换可用于替换匹配数据包的常规 L2 桥接。当数据包命中 1:1 VLAN 交换表条目时，该条目中的目标端口信息会分配给该数据包。UFDB 和 MFDB 条目中匹配的目标信息不再适用于该数据包。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="dst-port" typ="alt { port: enum
, trunk: enum
 }" mandatory="1">匹配的 1:1 VLAN 交换数据包的目标端口。</ArgTableRow>
<ArgTableRow arg="service-vid" typ="num">用于 1:1 VLAN 交换的匹配服务 VLAN ID。</ArgTableRow>
<ArgTableRow arg="customer-vid" typ="num">用于 1:1 VLAN 交换的匹配客户 VLAN ID。</ArgTableRow>
</ArgTable>
