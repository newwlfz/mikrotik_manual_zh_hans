---
title: "group"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/policy/group
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/ipsec/policy"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/ipsec/policy/group 
**类型：** 目录

此菜单用于创建供策略模板使用的其他策略组。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="*" typ="default">Whether the item is the default.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Group name.</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">Interface to which policies in this group apply.</ArgTableRow>
</ArgTable>
