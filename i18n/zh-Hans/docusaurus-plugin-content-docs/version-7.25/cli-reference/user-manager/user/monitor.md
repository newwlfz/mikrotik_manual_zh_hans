---
title: "monitor"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/user-manager/user/monitor
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/user-manager/user-profile"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## user-manager/user/monitor
**包：** userman-5
**类型：** 命令

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="total-uptime" typ="time"></ArgTableRow>
<ArgTableRow arg="total-download" typ="num"></ArgTableRow>
<ArgTableRow arg="total-upload" typ="num"></ArgTableRow>
<ArgTableRow arg="active-sessions" typ="num"></ArgTableRow>
<ArgTableRow arg="active-sub-sessions" typ="num"></ArgTableRow>
<ArgTableRow arg="actual-profile" typ="enum"></ArgTableRow>
<ArgTableRow arg="attributes-details" typ="object { attribute-value: super { attribute: enum
, [value] :string
, [value-type] :enum (ip-address | string | uint32 | hex | ip6-prefix | macro)
, [raw-value] :0xstring
 }
 }"></ArgTableRow>
</ArgTable>
