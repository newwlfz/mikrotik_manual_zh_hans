---
sidebar_key: "cli-reference/mpls/ldp/accept-filter"
sidebar_position: 1
title: "accept-filter"
sidebar_label: "accept-filter"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/mpls/ldp/accept-filter
captured_at: '2026-11-01T21:29:15+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## mpls/ldp/accept-filter {#mplsldpaccept-filter}
**条件：** !smips
**类型：** 目录

应从 LDP 邻居接受的标签绑定列表。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="vrf" typ="enum (any) { any:0xffffffff }" unset="1"></ArgTableRow>
<ArgTableRow arg="prefix" typ="address (flags=46/)" unset="1">要匹配的前缀。</ArgTableRow>
<ArgTableRow arg="neighbor" typ="address (flags=46/)" unset="1">此过滤器适用的邻居。</ArgTableRow>
<ArgTableRow arg="accept" typ="bool" unset="1">是否接受来自邻居的、针对指定前缀的标签绑定。如果参数未设置，则不会接受匹配的前缀。</ArgTableRow>
</ArgTable>
