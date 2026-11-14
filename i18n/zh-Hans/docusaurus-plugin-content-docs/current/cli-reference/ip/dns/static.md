---
sidebar_key: "cli-reference/ip/dns/static"
sidebar_position: 4
title: "static"
sidebar_label: 'static'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dns/static
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dns/static {#ipdnsstatic}
**类型：** 目录

静态 DNS 条目。路由器会自行应答针对这些名称的查询，而不会询问上游服务器，并且还会将其应用到来自上游的 CNAME 应答的目标上。对于具有静态条目的名称，针对其他记录类型的查询会发往上游服务器，路由器会转发该应答；当上游服务器没有此类记录时，路由器会以无记录的 NOERROR 应答。对于给定的名称和记录类型，只创建一个匹配条目：当多个条目匹配时，列表顺序并不决定由哪一个条目进行应答。有关示例，请参阅 [DNS](../../../network-management/dns.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">该条目由其他服务添加，而非由用户添加。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">该条目已禁用，路由器会忽略它。新建条目默认启用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">条目的域名。路由器在匹配前会将查询名称转换为小写，因此匹配不区分大小写。</ArgTableRow>
<ArgTableRow arg="regexp" typ="string">用于匹配查询名称的正则表达式，而不是 `name`。路由器会将其与小写形式的名称进行匹配，因此请使用小写编写该表达式：包含大写字母的表达式永远不会匹配。路由器不会为正则表达式条目创建 PTR 记录。不要让正则表达式与同一名称的其他条目重叠：列表顺序并不决定多个匹配条目中由哪一个进行应答。在命令行中，将反斜杠写作 `\\`，将 `$` 写作 `\$`；例如，`regexp="^host[0-9]+\\.example\\.com\$"` 会存储为 `^host[0-9]+\.example\.com$`。使用 `print` 检查存储的值。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (NXDOMAIN | A | NS | CNAME | MX | TXT | AAAA | SRV | FWD) { NXDOMAIN:65281, A:1, NS:2, CNAME:5, MX:15, TXT:16, AAAA:28, SRV:33, FWD:65280 }">
条目的类型。
- `A`（默认）- `address` 中的 IPv4 地址。
- `AAAA` - `address` 中的 IPv6 地址。
- `CNAME` - `cname` 中名称的别名。路由器会使用 CNAME 记录以及目标的记录进行应答，这些记录来自静态条目或上游。
- `FWD` - 将该名称的查询转发到 `forward-to` 中的服务器，而不是上游服务器。
- `MX` - `mx-exchange` 中的邮件服务器，使用 `mx-preference`。
- `NS` - `ns` 中的名称服务器。
- `NXDOMAIN` - 对每种记录类型都应答 NXDOMAIN（名称不存在）。
- `SRV` - `srv-target`、`srv-port`、`srv-priority` 和 `srv-weight` 中的服务位置。
- `TXT` - `text` 中的文本。
</ArgTableRow>
<ArgTableRow arg="forward-to" typ="alt { forwarder: enum
, ip: ipAddr
, ipv6: ip6Addr
, host: string
 }">路由器将 `FWD` 条目的查询转发到哪里：服务器的 IPv4 或 IPv6 地址或 DNS 名称，或 [`/ip/dns/forwarders`](./forwarders.md) 中的转发器名称。没有 `forward-to` 时，查询会发往常规服务器（`servers`、`dynamic-servers` 或 DoH 服务器），并且该名称不受 adlists 约束。当服务器未在 `query-total-timeout` 内应答时，客户端会收到 SERVFAIL 应答。</ArgTableRow>
<ArgTableRow arg="address" typ="alt { ip: ipAddr
, ipv6: ip6Addr
 }">`A` 条目的 IPv4 地址，或 `AAAA` 条目的 IPv6 地址。对于具有 `name` 的条目，路由器还会应答该地址的反向（PTR）查询。</ArgTableRow>
<ArgTableRow arg="mx-preference" typ="num">`MX` 条目邮件服务器的优先级；值越低越优先。</ArgTableRow>
<ArgTableRow arg="mx-exchange" typ="string">`MX` 条目邮件服务器的主机名。</ArgTableRow>
<ArgTableRow arg="cname" typ="string">`CNAME` 条目的目标名称。</ArgTableRow>
<ArgTableRow arg="text" typ="string">`TXT` 条目的文本。</ArgTableRow>
<ArgTableRow arg="ns" typ="string">`NS` 条目名称服务器的主机名。</ArgTableRow>
<ArgTableRow arg="srv-priority" typ="num">`SRV` 条目的优先级；值越低越优先。</ArgTableRow>
<ArgTableRow arg="srv-weight" typ="num">`SRV` 条目在具有相同优先级的条目中的权重。</ArgTableRow>
<ArgTableRow arg="srv-port" typ="num">`SRV` 条目服务的 TCP 或 UDP 端口。</ArgTableRow>
<ArgTableRow arg="srv-target" typ="string">提供 `SRV` 条目服务的主机名。</ArgTableRow>
<ArgTableRow arg="ttl" typ="time">此条目应答中的生存时间。 [`/ip/dns`](./index.md) 中的 `cache-max-ttl` 不会缩短它。默认值：1d。</ArgTableRow>
<ArgTableRow arg="match-subdomain" typ="bool">该条目是否也匹配 `name` 下的任意深度的所有名称。使用 `yes` 时，`example.com` 的条目也会应答 `www.example.com` 和 `a.b.example.com`。默认值：no。</ArgTableRow>
<ArgTableRow arg="address-list" typ="string">路由器将应答中的地址添加到的防火墙地址列表，作为动态条目，注释为 `created for <name>.`。对于 `FWD` 条目，这些是上游应答中的地址。当应答的 TTL 和 [`/ip/dns`](./index.md) 中的 `address-list-extra-time` 已过时，路由器会移除该条目。</ArgTableRow>
</ArgTable>
