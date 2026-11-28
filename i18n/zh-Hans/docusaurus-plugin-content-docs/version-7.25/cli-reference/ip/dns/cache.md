---
title: "cache"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dns/cache
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dns/cache 
**类型：** 目录

路由器可以从其缓存中给出的应答：上游应答和静态条目。完整列表（包括为静态条目生成的 PTR 记录）请参阅 [`all`](/docs/cli-reference/ip/dns/cache/all)。概览请参阅 [DNS](/docs/network-management/dns)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="S" typ="static">The record comes from a static entry in [`/ip/dns/static`](/docs/cli-reference/ip/dns/static). Static records show a TTL of 0s here.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="type" typ="enum (A | NS | CNAME | MX | TXT | AAAA | SRV) { A:1, NS:2, CNAME:5, MX:15, TXT:16, AAAA:28, SRV:33 }">Record type.</ArgTableRow>
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
 }">Data of the record, for example the address of an `A` record.</ArgTableRow>
<ArgTableRow arg="name" typ="string">Domain name of the record.</ArgTableRow>
<ArgTableRow arg="ttl" typ="time">Remaining time before the record expires from the cache. It counts down, and it is never longer than `cache-max-ttl` in [`/ip/dns`](/docs/cli-reference/ip).</ArgTableRow>
</ArgTable>
