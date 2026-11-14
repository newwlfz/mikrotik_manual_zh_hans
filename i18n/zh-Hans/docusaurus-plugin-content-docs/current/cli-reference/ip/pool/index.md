---
sidebar_key: "cli-reference/ip/pool"
title: "pool"
sidebar_label: 'pool'
source: https://manual.mikrotik.com/docs/cli-reference/ip/pool
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/pool {#ippool}
**类型：** 目录

IP 池用于定义可供各种 RouterOS 工具使用的 IP 地址范围，例如 DHCP 服务器、Point-to-Point 服务器等。提供独立的 IPv4 和 IPv6 列表。只要有可能，就会向每个客户端（OWNER/INFO 对）分配相同的 IP 地址。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">池的名称。</ArgTableRow>
<ArgTableRow arg="ranges" typ="multi { range: ipRange
 }" mandatory="1">由不重叠 IP 地址范围组成的 IP 地址列表，格式为：`from1-to1,from2-to2,...,fromN-toN`。例如，`10.0.0.1-10.0.0.27,10.0.0.32-10.0.0.47`。</ArgTableRow>
<ArgTableRow arg="next-pool" typ="enum (none) { none:0 }">当从一个没有空闲地址的池中执行 IP 地址获取，并且已设置 next-pool 属性时，将从下一个池获取 IP 地址。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="total" typ="num"></ArgTableRow>
<ArgTableRow arg="used" typ="num"></ArgTableRow>
<ArgTableRow arg="available" typ="num"></ArgTableRow>
</ArgTable>
