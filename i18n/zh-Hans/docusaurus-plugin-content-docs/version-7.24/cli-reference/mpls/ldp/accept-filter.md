---
title: "accept-filter"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/mpls/ldp/accept-filter
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "cli-reference/mpls/ldp"
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## mpls/ldp/accept-filter 
**条件：** !smips
**类型：** 目录

应从 LDP 邻居接受的标签绑定列表。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="vrf" typ="enum (any) { any:0xffffffff }" unset="1"></ArgTableRow>
<ArgTableRow arg="prefix" typ="address (flags=46/)" unset="1">Prefix to match.</ArgTableRow>
<ArgTableRow arg="neighbor" typ="address (flags=46/)" unset="1">Neighbor to which this filter applies.</ArgTableRow>
<ArgTableRow arg="accept" typ="bool" unset="1">Whether to accept label bindings from the neighbors for the specified prefix. If parameter is unset then matching prefix is not accepted.</ArgTableRow>
</ArgTable>
