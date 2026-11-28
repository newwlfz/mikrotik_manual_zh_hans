---
title: "pool"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/pool
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/pool 
**类型：** 目录

IP 地址池用于定义可供各种 RouterOS 功能使用的 IP 地址范围，例如 DHCP 服务器、Point-to-Point 服务器等。IPv4 和 IPv6 分别提供独立的列表。只要可能，同一 IP 地址会分配给每个客户端（OWNER/INFO 对）。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the pool.</ArgTableRow>
<ArgTableRow arg="ranges" typ="multi { range: ipRange
 }" mandatory="1">IP address list of non-overlapping IP address ranges in the form of: `from1-to1,from2-to2,...,fromN-toN`. For example, `10.0.0.1-10.0.0.27,10.0.0.32-10.0.0.47`.</ArgTableRow>
<ArgTableRow arg="next-pool" typ="enum (none) { none:0 }">When IP address acquisition is performed from a pool that has no free addresses, and the next-pool property is set, then an IP address will be acquired from the next pool.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="total" typ="num"></ArgTableRow>
<ArgTableRow arg="used" typ="num"></ArgTableRow>
<ArgTableRow arg="available" typ="num"></ArgTableRow>
</ArgTable>
