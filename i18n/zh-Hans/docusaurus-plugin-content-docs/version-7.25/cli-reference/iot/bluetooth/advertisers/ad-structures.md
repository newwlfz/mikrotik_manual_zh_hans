---
title: "ad-structures"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/iot/bluetooth/advertisers/ad-structures
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/iot/bluetooth/advertisers"
pagination_next: "cli-reference/iot/bluetooth/connections"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## iot/bluetooth/advertisers/ad-structures
**包：** iot
**类型：** 目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="type" typ="enum (short-local-name | complete-local-name | service-data | manufacturer-data) { short-local-name:8, complete-local-name:9, service-data:22, manufacturer-data:255 }" mandatory="1"></ArgTableRow>
<ArgTableRow arg="data" typ="string" mandatory="1"></ArgTableRow>
</ArgTable>
