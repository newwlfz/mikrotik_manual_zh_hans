---
sidebar_key: "cli-reference/ipv6/nd/proxy"
sidebar_position: 2
title: "proxy"
sidebar_label: 'proxy'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/nd/proxy
captured_at: '2026-11-01T21:24:40+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/nd/proxy {#ipv6ndproxy}
**类型：** 目录

IPv6 Neighbor Discovery 代理允许路由器或主机代表另一个节点响应 Neighbor Discovery（[RFC 4861](https://tools.ietf.org/html/rfc4861)）消息。这使得不同网段之间的通信就像它们位于同一链路上一样。在 RouterOS 中，该代理可以针对单个 IPv6 地址启用，并按接口生效。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="ip6Addr">代理接管的 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">代理针对该 IPv6 地址运行所在的接口。</ArgTableRow>
</ArgTable>
