---
title: "advertise-filter"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/mpls/ldp/advertise-filter
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## mpls/ldp/advertise-filter 
**条件：** !smips
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="vrf" typ="enum (any) { any:0xffffffff }" unset="1"></ArgTableRow>
<ArgTableRow arg="prefix" typ="address (flags=46/)" unset="1">Prefix to match.</ArgTableRow>
<ArgTableRow arg="neighbor" typ="address (flags=46/)" unset="1">Neighbor to which this filter applies.</ArgTableRow>
<ArgTableRow arg="advertise" typ="bool" unset="1">Whether to advertise label bindings to the neighbors for the specified prefix. If parameter is unset then matching prefix is not advertised.</ArgTableRow>
</ArgTable>
