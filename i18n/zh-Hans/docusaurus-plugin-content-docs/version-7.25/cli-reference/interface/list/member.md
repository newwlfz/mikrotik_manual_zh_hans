---
title: "member"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/list/member
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/interface/list"
pagination_next: "cli-reference/interface/lte"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/list/member 
**类型：** 目录

静态接口成员列表。通过 `include` 和 `exclude` 语句动态添加的接口不会显示在该子菜单中。

:::info
处理网桥和列表时必须谨慎。将网桥添加为成员与添加其所有端口并不相同。将所有从属端口添加为成员与添加网桥本身也不相同。这可能会影响 Neighbour Discovery 的功能。
:::

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Member entry is disabled.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">Dynamically added member.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="list" typ="enum" mandatory="1">Name of the interface list to which the member belongs.</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">Name of the interface that is a member of the list.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="dynamic" typ="bool">Whether the member was added dynamically.</ArgTableRow>
</ArgTable>
