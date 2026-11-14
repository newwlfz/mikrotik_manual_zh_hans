---
sidebar_key: "cli-reference/interface/list/member"
sidebar_position: 1
title: "member"
sidebar_label: 'member'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/list/member
captured_at: '2026-11-01T21:22:48+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/list/member {#interfacelistmember}
**类型：** 目录

静态接口成员列表。通过 `include` 和 `exclude` 语句动态添加的接口不会出现在此子菜单中。

:::info
使用网桥和列表时需谨慎。将网桥添加为成员与添加其所有端口并不相同。将所有从端口添加为成员与添加网桥本身并不相同。这可能影响 Neighbour Discovery 的功能。
:::

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">成员条目已禁用。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态添加的成员。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="list" typ="enum" mandatory="1">成员所属接口列表的名称。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">作为列表成员的接口名称。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="dynamic" typ="bool">该成员是否为动态添加。</ArgTableRow>
</ArgTable>
