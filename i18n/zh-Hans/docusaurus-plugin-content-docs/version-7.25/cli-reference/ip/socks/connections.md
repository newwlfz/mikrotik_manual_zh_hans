---
title: "connections"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/socks/connections
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/socks/connections 
**类型：** 目录

活动代理连接的只读列表。代理连接打开时，对应条目存在。详情请参阅 [SOCKS](/docs/network-management/socks)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="src-address" typ="composite { address: alt { addr-ipv4: ipAddr
, addr-ipv6: ip6Addr
 }
, port: num
 }">Address and port of the SOCKS client.</ArgTableRow>
<ArgTableRow arg="dst-address" typ="composite { address: alt { addr-ipv4: ipAddr
, addr-ipv6: ip6Addr
, addr-domain: string
 }
, port: num
 }">The requested destination address and port.</ArgTableRow>
<ArgTableRow arg="type" typ="enum (unknown | out | in) { unknown:0, out:1, in:2 }">
Type of the connection.
- `unknown` - The connection was just initiated.
- `out` - The connection is being relayed to the requested destination.
- `in` - The connection is incoming.
</ArgTableRow>
<ArgTableRow arg="tx" typ="num">Bytes relayed to the destination on this connection.</ArgTableRow>
<ArgTableRow arg="rx" typ="num">Bytes received from the destination on this connection.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="user" typ="enum">Username from [`users`](/docs/cli-reference/ip/socks/users) the client authenticated with. Empty when `auth-method=none`.</ArgTableRow>
</ArgTable>
