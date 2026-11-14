---
sidebar_key: "cli-reference/routing/ospf/lsa"
sidebar_position: 5
title: "lsa"
sidebar_label: 'lsa'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/ospf/lsa
captured_at: '2026-11-01T21:25:13+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/ospf/lsa {#routingospflsa}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="S" typ="self-originated">该 LSA 是否由路由器自身发起。</ArgTableRow>
<ArgTableRow arg="F" typ="flushing">flushing</ArgTableRow>
<ArgTableRow arg="W" typ="wraparound">wraparound</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum"></ArgTableRow>
<ArgTableRow arg="area" typ="enum">此 LSA 所属的区域。</ArgTableRow>
<ArgTableRow arg="link" typ="address (flags=4i)"></ArgTableRow>
<ArgTableRow arg="link-instance-id" typ="num"></ArgTableRow>
<ArgTableRow arg="type" typ="string"></ArgTableRow>
<ArgTableRow arg="originator" typ="ipAddr">LSA 记录的发起者。</ArgTableRow>
<ArgTableRow arg="id" typ="ipAddr">LSA 记录 ID</ArgTableRow>
<ArgTableRow arg="sequence" typ="num">某条链路的 LSA 已更新次数。</ArgTableRow>
<ArgTableRow arg="age" typ="num">上次更新发生在多久以前（以秒为单位）。</ArgTableRow>
<ArgTableRow arg="checksum" typ="num"></ArgTableRow>
<ArgTableRow arg="body" typ="string"></ArgTableRow>
</ArgTable>
