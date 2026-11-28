---
title: "community-ext-list"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/filter/community-ext-list
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## routing/filter/community-ext-list 
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="list" typ="enum" mandatory="1">Reference name.</ArgTableRow>
<ArgTableRow arg="communities" typ="object">
List of extended communities expressed as a **raw** integer value or in the typed format: `type:value`, where type can be:
- `rt` - route-target
- `soo` -  site of origin.

该值取决于类型。
</ArgTableRow>
<ArgTableRow arg="regexp" typ="string">用于匹配 community 的 Regexp 匹配器。仅包含 regexp 参数的 community 集不能用于追加或删除 community。</ArgTableRow>
</ArgTable>
