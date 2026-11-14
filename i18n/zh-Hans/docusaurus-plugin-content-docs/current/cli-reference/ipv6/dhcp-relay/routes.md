---
sidebar_key: "cli-reference/ipv6/dhcp-relay/routes"
sidebar_position: 4
title: "routes"
sidebar_label: 'routes'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/dhcp-relay/routes
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-relay/routes {#ipv6dhcp-relayroutes}
**类型：** 目录

DHCPv6 中继在 `store-relayed-bindings=yes` 时于服务器回复中找到的绑定。中继会为每个委派的前缀添加一条经由客户端的路由。有关详细信息，请参阅 [DHCP 中继](../../../network-management/dhcp/relay.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="relay" typ="enum">看到该绑定的 DHCPv6 中继。</ArgTableRow>
<ArgTableRow arg="prefix" typ="ip6Prefix">委派前缀或分配的地址。</ArgTableRow>
<ArgTableRow arg="peer-address" typ="ip6Addr">客户端的地址，通常是其链路本地地址，用作该路由的网关。</ArgTableRow>
<ArgTableRow arg="life-time" typ="time">绑定的生命周期。</ArgTableRow>
<ArgTableRow arg="last-seen" typ="time">自中继上次在应答中看到该绑定以来经过的时间。</ArgTableRow>
</ArgTable>
