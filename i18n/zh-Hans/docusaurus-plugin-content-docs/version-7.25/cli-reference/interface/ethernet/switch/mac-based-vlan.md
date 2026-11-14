---
sidebar_key: "cli-reference/interface/ethernet/switch/mac-based-vlan"
sidebar_position: 10
title: "mac-based-vlan"
sidebar_label: 'mac-based-vlan'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/mac-based-vlan
captured_at: '2026-11-01T21:22:35+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/mac-based-vlan {#interfaceethernetswitchmac-based-vlan}
**系统能力：** musicswitch
**类型：** 目录

基于 MAC 的 VLAN 表用于根据源 MAC 分配 VLAN。

所有 CRS1xx/2xx 系列交换机最多支持 1024 条基于 MAC 的 VLAN 表项。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="src-mac-address" typ="macAddr" mandatory="1">用于基于 MAC 的 VLAN 规则的匹配源 MAC 地址。</ArgTableRow>
<ArgTableRow arg="new-service-vid" typ="num">新的服务 VLAN ID 会替换匹配数据包的原始服务 VLAN ID。</ArgTableRow>
<ArgTableRow arg="new-customer-vid" typ="num">新的客户 VLAN ID 会替换匹配数据包的原始服务 VLAN ID。如果设置为 4095，则丢弃流量。</ArgTableRow>
</ArgTable>
