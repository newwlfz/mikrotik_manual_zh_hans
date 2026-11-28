---
title: "table"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/table
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## routing/table 
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="D" typ="dynamic">dynamic</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">invalid</ArgTableRow>
<ArgTableRow arg="U" typ="used">used</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the routing table.</ArgTableRow>
<ArgTableRow arg="fib" typ="switch" unset="1">Flag indicating whether routes in this table will be installed in the [FIB](/docs/user-guides/routing-and-networking-protocols/routing-decision#forwarding-information-base).</ArgTableRow>
</ArgTable>
