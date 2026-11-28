---
title: "static-rp"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/pimsm/static-rp
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## routing/pimsm/static-rp 
**条件：** !smips
**类型：** 目录

static-rp 菜单用于手动定义组播组到 RP 的映射。该机制对故障不具备鲁棒性，但至少提供了一种基本的互操作机制。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">inactive</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="instance" typ="enum" mandatory="1">The name of the PIM instance this static RP belongs to.</ArgTableRow>
<ArgTableRow arg="group" typ="address (flags=46/)">The multicast group that belongs to a specific RP.</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46)">The IP address of the static RP.</ArgTableRow>
</ArgTable>
