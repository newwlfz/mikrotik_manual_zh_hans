---
sidebar_key: "cli-reference/interface/ethernet/switch/unicast-fdb"
title: "unicast-fdb"
sidebar_label: 'unicast-fdb'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/unicast-fdb
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/unicast-fdb {#interfaceethernetswitchunicast-fdb}
**系统能力：** musicswitch
**类型：** 目录

单播转发表数据库最多支持 16K 个 MAC 条目。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
<ArgTableRow arg="A" typ="active"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="mac-address" typ="macAddr" mandatory="1">当目标 MAC 或源 MAC 与该条目匹配时，action 命令会作用于数据包。</ArgTableRow>
<ArgTableRow arg="port" typ="alt { port: enum
, trunk: enum
 }" mandatory="1">单播 FDB 条目的匹配端口。</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num">单播 FDB 查找/学习的 VLAN ID。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (forward | src-drop | dst-drop | src-and-dst-drop | ingress-port-policing-bypass | src-redirect-to-cpu | dst-redirect-to-cpu | src-and-dst-redirect-to-cpu) { forward:0, src-drop:1, dst-drop:2, src-and-dst-drop:3, ingress-port-policing-bypass:4, src-redirect-to-cpu:5, dst-redirect-to-cpu:6, src-and-dst-redirect-to-cpu:7 }">
UFDB 条目的动作。
- `dst-drop` - 当目标 MAC 与该条目匹配时，数据包会被丢弃。
- `dst-redirect-to-cpu` - 当目标 MAC 与该条目匹配时，数据包会被重定向到 CPU。
- `forward` - 数据包会被转发。
- `src-and-dst-drop` - 当源 MAC 或目标 MAC 与该条目匹配时，数据包会被丢弃。
- `src-and-dst-redirect-to-cpu` - 当源 MAC 或目标 MAC 与该条目匹配时，数据包会被重定向到 CPU。
- `src-drop` - 当源 MAC 与该条目匹配时，数据包会被丢弃。
- `src-redirect-to-cpu` - 当源 MAC 与该条目匹配时，数据包会被重定向到 CPU。
</ArgTableRow>
<ArgTableRow arg="mirror" typ="bool">启用或禁用基于源 MAC 或目标 MAC 的镜像。</ArgTableRow>
<ArgTableRow arg="isolation-profile" typ="enum (promiscuous | isolated | community1 | community2) { promiscuous:0, isolated:1, community1:2, community2:3 }">MAC 级别隔离配置文件。</ArgTableRow>
<ArgTableRow arg="svl" typ="bool">
单播 FDB 学习模式。
- `svl` - 共享 VLAN 学习，学习/查找基于 MAC 地址，而不是 VLAN ID。
- `ivl` - 独立 VLAN 学习，学习/查找同时基于 MAC 地址和 VLAN ID。
</ArgTableRow>
<ArgTableRow arg="qos-group" typ="enum (none) { none:0xffffffff }">来自 QoS 组菜单的已定义 QoS 组。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="age" typ="num"></ArgTableRow>
</ArgTable>
