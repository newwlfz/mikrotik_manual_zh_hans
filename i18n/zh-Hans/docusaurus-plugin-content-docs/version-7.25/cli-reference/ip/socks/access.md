---
title: "access"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/socks/access
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/socks"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/socks/access 
**类型：** 目录

服务器在拨号到请求的目标地址之前评估的访问控制列表。规则按顺序检查，第一条匹配的规则决定结果。未匹配任何规则的请求将被允许，因此空列表允许所有流量，而限制性列表需要末尾添加 `deny` 规则。详情请参阅 [SOCKS](/docs/network-management/socks)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled. The rule is not used.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="src-address" typ="super { !
, alt-address: alt { range: ipRange
, src-ipv6: ip6Prefix
 }
 }">Address or subnet of the SOCKS client, the requester. Unset matches any.</ArgTableRow>
<ArgTableRow arg="src-port" typ="super { !
, min: num [0 .. 65535]
, [max] -num [0 .. 65535]
 }">Source TCP port of the client's connection. Unset matches any.</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, alt-address: alt { range: ipRange
, dst-ipv6: ip6Prefix
, dst-domain: string
 }
 }">Destination requested by the client: an IP address, a range or a domain name. A domain name matches only clients that request the destination by name (the SOCKS5 domain address type). The [`socksify`](/docs/cli-reference/ip/socksify) client always requests by IP address, so a domain-name rule does not match socksified traffic.</ArgTableRow>
<ArgTableRow arg="dst-port" typ="super { !
, min: num [0 .. 65535]
, [max] -num [0 .. 65535]
 }">Requested destination port or range, for example `21` or `1024-65535`. Unset matches any.</ArgTableRow>
<ArgTableRow arg="action" typ="enum (deny | allow) { deny:0, allow:1 }">
What the server does with a matching request.
- `allow` (default) - Forward the connection to the destination.
- `deny` - Reject the connection.
</ArgTableRow>
</ArgTable>
