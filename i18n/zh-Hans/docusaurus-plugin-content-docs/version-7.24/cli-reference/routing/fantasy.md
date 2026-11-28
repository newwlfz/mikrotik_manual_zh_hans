---
title: "fantasy"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/fantasy
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## routing/fantasy 
**类型：** 目录

Fantasy 菜单是一种用于生成大量路由以进行测试的便捷方式。与脚本相比，该方法的主要优点是生成速度快且简单。只需禁用 fantasy 规则，即可轻松删除所有由 fantasy 生成的路由。

Fantasy 使用基于哈希路由序列号、种子和其他参数的随机生成器。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">invalid</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="dst-address" typ="address (flags=46it/)">Prefix from which route will be generated.</ArgTableRow>
<ArgTableRow arg="prefix-length" typ="range">Prefix length for generated route (can be specified as integer range). For example `dst-address=192.168.0.0/16` and `prefix-length=24` will generate /24 routes from `192.168.0.0/16` subnet.</ArgTableRow>
<ArgTableRow arg="gateway" typ="address (flags=46iv/)"></ArgTableRow>
<ArgTableRow arg="scope" typ="range">Scope to be set; can be set as range.</ArgTableRow>
<ArgTableRow arg="target-scope" typ="range">Target scope to be set; can be set as range.</ArgTableRow>
<ArgTableRow arg="instance-id" typ="range"></ArgTableRow>
<ArgTableRow arg="dealer-id" typ="range"></ArgTableRow>
<ArgTableRow arg="seed" typ="string">Random generator seed.</ArgTableRow>
<ArgTableRow arg="count" typ="num"></ArgTableRow>
<ArgTableRow arg="offset" typ="num">Route sequence number offset.</ArgTableRow>
<ArgTableRow arg="priv-offs" typ="range"></ArgTableRow>
<ArgTableRow arg="priv-size" typ="range"></ArgTableRow>
<ArgTableRow arg="use-hold" typ="bool"></ArgTableRow>
</ArgTable>
