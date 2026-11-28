---
title: "proxy"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ipv6/nd/proxy
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ipv6/nd/proxy 
**类型：** 目录

IPv6 邻居发现代理允许路由器或主机代表其他节点响应邻居发现（[RFC 4861](https://tools.ietf.org/html/rfc4861)）消息。这使不同网段之间的通信如同位于同一链路上。在 RouterOS 中，可以为单个 IPv6 地址启用代理，并按接口工作。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="ip6Addr">IPv6 address the proxy takes ownership of.</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">Interface on which the proxy operates for this IPv6 address.</ArgTableRow>
</ArgTable>
