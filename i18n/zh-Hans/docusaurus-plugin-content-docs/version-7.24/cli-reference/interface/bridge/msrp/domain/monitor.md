---
title: "monitor"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/bridge/msrp/domain/monitor
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "cli-reference/interface/bridge/msti"
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/bridge/msrp/domain/monitor 
**条件：** MSRP_ENABLE
**类型：** Command

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="bridge" typ="iface_enum"></ArgTableRow>
<ArgTableRow arg="id" typ="num"></ArgTableRow>
<ArgTableRow arg="priority" typ="num"></ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num"></ArgTableRow>
<ArgTableRow arg="core-ports" typ="multi { array-id, interface: iface_enum
 }"></ArgTableRow>
<ArgTableRow arg="boundary-ports" typ="multi { array-id, interface: iface_enum
 }"></ArgTableRow>
</ArgTable>
