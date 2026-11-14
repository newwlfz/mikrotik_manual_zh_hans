---
sidebar_key: "cli-reference/mpls/ldp/advertise-filter"
sidebar_position: 2
title: "advertise-filter"
sidebar_label: 'advertise-filter'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/mpls/ldp/advertise-filter
captured_at: '2026-11-01T21:24:47+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## mpls/ldp/advertise-filter {#mplsldpadvertise-filter}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="vrf" typ="enum (any) { any:0xffffffff }" unset="1"></ArgTableRow>
<ArgTableRow arg="prefix" typ="address (flags=46/)" unset="1">要匹配的前缀。</ArgTableRow>
<ArgTableRow arg="neighbor" typ="address (flags=46/)" unset="1">此过滤器适用的邻居。</ArgTableRow>
<ArgTableRow arg="advertise" typ="bool" unset="1">是否向邻居通告指定前缀的标签绑定。如果参数为 unset，则不会通告匹配的前缀。</ArgTableRow>
</ArgTable>
