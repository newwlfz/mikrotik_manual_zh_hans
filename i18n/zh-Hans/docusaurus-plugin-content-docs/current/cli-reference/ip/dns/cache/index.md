---
sidebar_key: "cli-reference/ip/dns/cache"
title: "cache"
sidebar_label: 'cache'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dns/cache
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dns/cache {#ipdnscache}
**类型：** 目录

路由器可以从其缓存中给出的应答：上游应答和静态条目。要查看完整列表（包括为静态条目生成的 PTR 记录），请参见 [`all`](./all.md)。有关概述，请参见 [DNS](../../../../network-management/dns.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="S" typ="static">该记录来自 [`/ip/dns/static`](../static.md) 中的静态条目。静态记录在此处显示的 TTL 为 0s。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="type" typ="enum (A | NS | CNAME | MX | TXT | AAAA | SRV) { A:1, NS:2, CNAME:5, MX:15, TXT:16, AAAA:28, SRV:33 }">记录类型。</ArgTableRow>
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
 }">记录的数据，例如 `A` 记录的地址。</ArgTableRow>
<ArgTableRow arg="name" typ="string">记录的域名。</ArgTableRow>
<ArgTableRow arg="ttl" typ="time">记录从缓存中过期前的剩余时间。该时间会倒计时，并且永远不会超过 [`/ip/dns`](../index.md) 中的 `cache-max-ttl`。</ArgTableRow>
</ArgTable>
