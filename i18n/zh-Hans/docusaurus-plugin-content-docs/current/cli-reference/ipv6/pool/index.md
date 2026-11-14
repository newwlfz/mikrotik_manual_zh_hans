---
sidebar_key: "cli-reference/ipv6/pool"
title: "pool"
sidebar_label: 'pool'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/pool
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/pool {#ipv6pool}
**类型：** 目录

IP 池用于定义可供各种 RouterOS 工具（例如 DHCP 服务器、Point-to-Point 服务器等）使用的 IPv6 前缀。在可能的情况下，会向每个客户端（OWNER/INFO 对）分配相同的 IPv6 前缀。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">池的名称。</ArgTableRow>
<ArgTableRow arg="prefix" typ="ip6Prefix"></ArgTableRow>
<ArgTableRow arg="from-pool" typ="enum">另一个池的名称，用于从中动态获取前缀。</ArgTableRow>
<ArgTableRow arg="prefix-length" typ="num" mandatory="1">该选项表示将分配给客户端的前缀大小。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="actual-prefix" typ="ip6Prefix"></ArgTableRow>
<ArgTableRow arg="valid-lifetime" typ="time"></ArgTableRow>
<ArgTableRow arg="preferred-lifetime" typ="time"></ArgTableRow>
</ArgTable>
