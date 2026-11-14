---
sidebar_key: "cli-reference/interface/ethernet/switch/egress-vlan-tag"
sidebar_position: 4
title: "egress-vlan-tag"
sidebar_label: 'egress-vlan-tag'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/egress-vlan-tag
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/egress-vlan-tag {#interfaceethernetswitchegress-vlan-tag}
**系统能力：** musicswitch
**类型：** 目录

出站数据包可被分配不同的 VLAN 标签格式。当数据包发送到出站端口（目标端口）时，可以移除 VLAN 标签、添加 VLAN 标签或保持原样。每个端口都独立控制出站 VLAN 标签格式。标签格式包括：
- 无标签
- 带标签
- 未修改

出站 VLAN 标签表包含 4096 个条目，用于选择 VLAN 标记。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="vlan-id" typ="num" mandatory="1">在出站时带有标签的 VLAN ID。</ArgTableRow>
<ArgTableRow arg="tagged-ports" typ="multi { array-id }">在出站时带有标签的端口。</ArgTableRow>
</ArgTable>
