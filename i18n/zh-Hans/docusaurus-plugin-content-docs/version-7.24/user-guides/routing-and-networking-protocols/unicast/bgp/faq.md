---
title: "常见问题"
description: "常见问题。"
tags:
  - 'routing'
  - 'bgp'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/bgp/faq
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 为什么 eBGP 无法连接到 loopback 地址？ {#why-ebgp-does-not-connect-to-loopback-address}

eBGP 默认只能连接一跳之外的对等体。loopback 地址会多出一跳，因为它是通过相连网络路由的。对于多跳会话，请设置 [`multihop`](/docs/cli-reference/routing/bgp/connection#multihop)`=yes`。

## BGP network synchronization 具体是什么意思？ {#what-does-bgp-network-synchronization-exactly-mean}

除非路由表中存在匹配的活动 IGP 或直连路由（精确前缀匹配），否则 BGP 不会通告该网络。同步的主要原因是避免路由环路。如果 IGP 不可靠，或者必须始终通告该网络，请为每个要通告的网络前缀添加静态 blackhole 路由，或在 [`/routing/bgp/connection`](/docs/cli-reference/routing/bgp/connection) 配置中设置 [`output.network-blackhole=yes`](/docs/cli-reference/routing/bgp/connection#output.network)，以便为每个 BGP 网络自动添加活动 blackhole 路由。

## 如何隐藏自己的 AS？ {#how-to-hide-my-own-as}

如果在 [`/routing/bgp/connection`](/docs/cli-reference/routing/bgp/connection) 配置中将 [`output.default-prepend`](/docs/cli-reference/routing/bgp/connection#output.default-prepend) 设置为 0，或在 output [routing filters](/docs/cli-reference/routing/filter/rule) 中将 `bgp-path-prepend` 设置为 0，则对等体自身的 AS 会从 **AS_PATH** 中移除。

## 远端对等体多次 prepend 其 AS。如何覆盖该 prepend？ {#remote-peer-prepends-its-as-several-times-how-to-override-the-prepend}

可以通过在 BGP input [routing filter](/docs/cli-reference/routing/filter/rule) 中设置 `bgp-path-peer-prepend 1` 来移除远端对等体的 prepend。

## BGP 未选择 AS path 最短的路由，或其他度量值被忽略 {#bgp-does-not-pick-route-with-shortest-as-path-or-other-metrics-are-ignored}

BGP 最佳路径选择仅对同一 [BGP instance](/docs/cli-reference/routing/bgp/instance) 收到的路由生效。

## 从一个对等体收到的 BGP 路由未通告给另一个对等体 {#bgp-routes-received-from-one-peer-are-not-advertised-to-another-peer}

最常见的配置错误：

- Output [filter](/docs/cli-reference/routing/filter/rule) 阻止了重分发。
- 两个对等体未运行在同一 [BGP instance](/docs/cli-reference/routing/bgp/instance) 上。
