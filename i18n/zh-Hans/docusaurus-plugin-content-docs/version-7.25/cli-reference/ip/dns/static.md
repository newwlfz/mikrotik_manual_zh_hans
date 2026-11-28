---
title: "static"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dns/static
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dns/static 
**类型：** 目录

静态 DNS 条目。路由器会自行应答这些名称的查询，不询问上游服务器，并且也会将这些条目应用于上游 CNAME 应答的目标。对于具有静态条目的名称，其他记录类型的查询会发送到上游服务器，路由器会转发应答；当上游服务器没有此类记录时，路由器会应答 NOERROR 且不携带任何记录。对于给定名称和记录类型，仅创建一个匹配的条目：当多个条目匹配时，列表顺序不会决定由哪个条目应答。示例请参阅 [DNS](/docs/network-management/dns)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="D" typ="dynamic">The entry was added by another service, not by a user.</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">The entry is disabled and the router ignores it. New entries are enabled.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Domain name of the entry. The router converts query names to lower case before matching, so the match is case-insensitive.</ArgTableRow>
<ArgTableRow arg="regexp" typ="string">Regular expression the query name is matched against, instead of `name`. The router matches it against the name in lower case, so write the expression in lower case: an expression with capital letters never matches. The router creates no PTR record for regular expression entries. Do not let a regular expression overlap with other entries for the same names: the list order does not decide which of several matching entries answers. On the command line, write a backslash as `\\` and a `$` as `\$`; for example, `regexp="^host[0-9]+\\.example\\.com\$"` is stored as `^host[0-9]+\.example\.com$`. Check the stored value with `print`.</ArgTableRow>
<ArgTableRow arg="type" typ="enum (NXDOMAIN | A | NS | CNAME | MX | TXT | AAAA | SRV | FWD) { NXDOMAIN:65281, A:1, NS:2, CNAME:5, MX:15, TXT:16, AAAA:28, SRV:33, FWD:65280 }">
Type of the entry.
- `A` (default) - IPv4 address in `address`.
- `AAAA` - IPv6 address in `address`.
- `CNAME` - Alias of the name in `cname`. The router answers with the CNAME record and the records of the target, from static entries or from upstream.
- `FWD` - Forward queries for the name to the server in `forward-to` instead of the upstream servers.
- `MX` - Mail server in `mx-exchange` with `mx-preference`.
- `NS` - Name server in `ns`.
- `NXDOMAIN` - Answer NXDOMAIN (the name does not exist) for every record type.
- `SRV` - Service location in `srv-target`, `srv-port`, `srv-priority` and `srv-weight`.
- `TXT` - Text in `text`.
</ArgTableRow>
<ArgTableRow arg="forward-to" typ="alt { forwarder: enum
, ip: ipAddr
, ipv6: ip6Addr
, host: string
 }">Where the router forwards queries of a `FWD` entry: an IPv4 or IPv6 address or a DNS name of a server, or the name of a forwarder in [`/ip/dns/forwarders`](/docs/cli-reference/ip/dns/forwarders). Without `forward-to`, the query goes to the normal servers (`servers`, `dynamic-servers` or the DoH server), and the name is exempt from adlists. When the server does not answer within `query-total-timeout`, the client gets a SERVFAIL answer.</ArgTableRow>
<ArgTableRow arg="address" typ="alt { ip: ipAddr
, ipv6: ip6Addr
 }">IPv4 address of an `A` entry or IPv6 address of an `AAAA` entry. For entries with `name`, the router also answers reverse (PTR) queries for the address.</ArgTableRow>
<ArgTableRow arg="mx-preference" typ="num">Preference of the mail server of an `MX` entry; lower values are preferred.</ArgTableRow>
<ArgTableRow arg="mx-exchange" typ="string">Host name of the mail server of an `MX` entry.</ArgTableRow>
<ArgTableRow arg="cname" typ="string">Target name of a `CNAME` entry.</ArgTableRow>
<ArgTableRow arg="text" typ="string">Text of a `TXT` entry.</ArgTableRow>
<ArgTableRow arg="ns" typ="string">Host name of the name server of an `NS` entry.</ArgTableRow>
<ArgTableRow arg="srv-priority" typ="num">Priority of an `SRV` entry; lower values are preferred.</ArgTableRow>
<ArgTableRow arg="srv-weight" typ="num">Weight of an `SRV` entry among entries with the same priority.</ArgTableRow>
<ArgTableRow arg="srv-port" typ="num">TCP or UDP port of the service of an `SRV` entry.</ArgTableRow>
<ArgTableRow arg="srv-target" typ="string">Host name that provides the service of an `SRV` entry.</ArgTableRow>
<ArgTableRow arg="ttl" typ="time">Time to live in the answers for this entry. `cache-max-ttl` in [`/ip/dns`](/docs/cli-reference/ip/dns) does not shorten it. Default: 1d.</ArgTableRow>
<ArgTableRow arg="match-subdomain" typ="bool">Whether the entry also matches every name below `name`, at any depth. With `yes`, an entry for `example.com` also answers `www.example.com` and `a.b.example.com`. Default: no.</ArgTableRow>
<ArgTableRow arg="address-list" typ="string">Firewall address list the router adds the answered addresses to, as dynamic entries with the comment `created for <name>.`. For a `FWD` entry, these are the addresses in the upstream answer. The router removes an entry when the TTL of the answer and `address-list-extra-time` in [`/ip/dns`](/docs/cli-reference/ip/dns) have passed.</ArgTableRow>
</ArgTable>
