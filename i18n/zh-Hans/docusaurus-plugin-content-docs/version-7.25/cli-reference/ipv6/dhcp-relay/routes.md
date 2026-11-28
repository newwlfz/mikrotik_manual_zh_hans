---
title: "routes"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/dhcp-relay/routes
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ipv6/dhcp-server"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ipv6/dhcp-relay/routes 
**类型：** 目录

DHCPv6 中继在启用 `store-relayed-bindings=yes` 时，会在服务器的响应中找到绑定。中继会为通过客户端到达的每个委派前缀添加路由。详情请参阅 [DHCP Relay](/docs/network-management/dhcp/relay)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="relay" typ="enum">DHCPv6 relay that saw the binding.</ArgTableRow>
<ArgTableRow arg="prefix" typ="ip6Prefix">Delegated prefix or assigned address.</ArgTableRow>
<ArgTableRow arg="peer-address" typ="ip6Addr">Address of the client, usually its link-local address, used as the gateway of the route.</ArgTableRow>
<ArgTableRow arg="life-time" typ="time">Lifetime of the binding.</ArgTableRow>
<ArgTableRow arg="last-seen" typ="time">Time since the relay last saw the binding in a reply.</ArgTableRow>
</ArgTable>
