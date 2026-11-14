---
sidebar_key: "cli-reference/ip/dns/cache/all"
sidebar_position: 1
title: "all"
sidebar_label: 'all'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dns/cache/all
captured_at: '2026-11-01T21:23:55+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dns/cache/all {#ipdnscacheall}
**类型：** 目录

DNS 缓存中的所有记录，包括路由器为静态条目创建的 PTR 记录，以及解析器在内部保留的记录。有关概述，请参阅 [DNS](../../../../network-management/dns.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="S" typ="static">该记录来自 [`/ip/dns/static`](../static.md) 中的静态条目，例如为静态 `A` 或 `AAAA` 条目创建的 PTR 记录。</ArgTableRow>
<ArgTableRow arg="N" typ="negative">缓存的否定应答：名称或记录类型不存在。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">记录的域名。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (A | NS | MD | MF | CNAME | SOA | MB | MG | MR | NULL | WKS | PTR | HINFO | MINFO | MX | TXT | AAAA | SRV) { A:1, NS:2, MD:3, MF:4, CNAME:5, SOA:6, MB:7, MG:8, MR:9, NULL:10, WKS:11, PTR:12, HINFO:13, MINFO:14, MX:15, TXT:16, AAAA:28, SRV:33 }">记录类型。</ArgTableRow>
<ArgTableRow arg="data" typ="alt { address: ipAddr
, name: string
, info: composite { rmail: string
, email: string
 }
, mx: composite { preference: num
, exchange: string
 }
, srv: composite { port: num
, target: string
 }
, soa-mname: string
, address6: ip6Addr
 }">记录的数据，例如 `A` 记录的地址或 `PTR` 记录的目标名称。</ArgTableRow>
<ArgTableRow arg="ttl" typ="time">记录从缓存中过期前的剩余时间。</ArgTableRow>
<ArgTableRow arg="responsible" typ="string">区域管理员的电子邮件地址，来自 `SOA` 记录。</ArgTableRow>
<ArgTableRow arg="serial" typ="num">区域的序列号，来自 `SOA` 记录。</ArgTableRow>
<ArgTableRow arg="refresh" typ="num">区域的刷新间隔（以秒为单位），来自 `SOA` 记录。</ArgTableRow>
<ArgTableRow arg="retry" typ="num">区域的重试间隔（以秒为单位），来自 `SOA` 记录。</ArgTableRow>
<ArgTableRow arg="expire" typ="num">区域的过期时间（以秒为单位），来自 `SOA` 记录。</ArgTableRow>
<ArgTableRow arg="minimum" typ="num">区域的最小 TTL（以秒为单位），来自 `SOA` 记录。</ArgTableRow>
</ArgTable>
