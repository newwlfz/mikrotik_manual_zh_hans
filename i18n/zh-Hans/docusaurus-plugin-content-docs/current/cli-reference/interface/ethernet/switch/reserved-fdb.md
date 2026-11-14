---
sidebar_key: "cli-reference/interface/ethernet/switch/reserved-fdb"
sidebar_position: 20
title: "reserved-fdb"
sidebar_label: 'reserved-fdb'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/reserved-fdb
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/reserved-fdb {#interfaceethernetswitchreserved-fdb}
**系统能力：** musicswitch
**类型：** 目录

Cloud Router Switch 支持 256 个 RFDB 条目。每个 RFDB 条目可以存储具有特定命令的二层单播或组播 MAC 地址。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="mac-address" typ="macAddr" mandatory="1">用于 Reserved FDB 条目的匹配 MAC 地址。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (forward | redirect-to-cpu | copy-to-cpu | drop) { forward:0, redirect-to-cpu:1, copy-to-cpu:2, drop:3 }">
RFDB 条目的动作。
- `copy-to-cpu` - 当数据包的目标 MAC 地址与该条目匹配时，数据包会被复制到 CPU。
- `drop` - 当数据包的目标 MAC 地址与该条目匹配时，数据包会被丢弃。
- `forward` - 当数据包的目标 MAC 地址与该条目匹配时，数据包会被转发。
- `redirect-to-cpu` - 当数据包的目标 MAC 地址与该条目匹配时，数据包会被重定向到 CPU。
</ArgTableRow>
<ArgTableRow arg="bypass-ingress-vlan-filter" typ="bool">允许对匹配的数据包绕过 VLAN 过滤。</ArgTableRow>
<ArgTableRow arg="bypass-ingress-port-policing" typ="bool">允许对匹配的数据包绕过 Ingress Port Policer。</ArgTableRow>
<ArgTableRow arg="qos-group" typ="enum (none) { none:0xffffffff }">在 QoS group 菜单中定义的 QoS 组。</ArgTableRow>
</ArgTable>
