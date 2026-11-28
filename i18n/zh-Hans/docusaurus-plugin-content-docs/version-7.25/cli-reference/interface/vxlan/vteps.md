---
title: "vteps"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/vxlan/vteps
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/interface/w60g"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/vxlan/vteps 
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="D" typ="dynamic">dynamic</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded">hw-offloaded</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="remote-ip" typ="alt { address: ipAddr
, ipv6-address: ip6Addr
 }" mandatory="1"></ArgTableRow>
</ArgTable>
