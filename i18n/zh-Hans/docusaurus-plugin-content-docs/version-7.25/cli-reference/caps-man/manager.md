---
title: "manager"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/caps-man/manager
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## caps-man/manager 
**包：** wireless-rep
**类型：** 设置目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool"></ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none | auto) { auto:0 }"></ArgTableRow>
<ArgTableRow arg="ca-certificate" typ="enum (none | auto) { auto:0 }"></ArgTableRow>
<ArgTableRow arg="package-path" typ="string"></ArgTableRow>
<ArgTableRow arg="upgrade-policy" typ="enum (none | suggest-same-version | require-same-version)"></ArgTableRow>
<ArgTableRow arg="require-peer-certificate" typ="bool"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="generated-certificate" typ="enum (none)"></ArgTableRow>
<ArgTableRow arg="generated-ca-certificate" typ="enum (none)"></ArgTableRow>
</ArgTable>
