---
sidebar_key: "routing-and-networking-protocols/unicast/bgp/faq"
sidebar_position: 4
title: "常见问题"
sidebar_label: "常见问题"
description: "常见问题。"
tags:
  - 'routing'
  - 'bgp'
slug: /user-guides/routing-and-networking-protocols/unicast/bgp/faq
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/bgp/faq
captured_at: '2026-11-04T11:34:04+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 为什么 eBGP 无法连接到环回地址？ {#why-ebgp-does-not-connect-to-loopback-address}

eBGP 默认只能建立一跳范围内的连接。环回地址会再多一跳，因为它是通过直连网络路由的。对于多跳会话，请设置 [`multihop`](../../../../cli-reference/routing/bgp/connection.md#multihop)`=yes`。

## BGP 网络同步到底是什么意思？ {#what-does-bgp-network-synchronization-exactly-mean}

除非路由表中存在匹配的活动 IGP 或直连路由（前缀完全匹配），否则 BGP 不会通告该网络。同步的主要原因是避免路由环路。如果 IGP 不可靠，或者必须始终通告该网络，那么可以为每个要通告的网络前缀添加静态 blackhole 路由，或者在 [`/routing/bgp/connection`](../../../../cli-reference/routing/bgp/connection.md) 配置中设置 [`output.network-blackhole=yes`](../../../../cli-reference/routing/bgp/connection.md#output.network)，以便为每个 BGP 网络自动添加活动的 blackhole 路由。

## 如何隐藏我自己的 AS？ {#how-to-hide-my-own-as}

如果 [`/routing/bgp/connection`](../../../../cli-reference/routing/bgp/connection.md) 配置中的 [`output.default-prepend`](../../../../cli-reference/routing/bgp/connection.md#output.default-prepend) 设置为 0，或者在输出[路由过滤器](../../../../cli-reference/routing/filter/rule.md)中将 `bgp-path-prepend` 设置为 0，则对端自己的 AS 会从 **AS_PATH** 中移除。

## 远端对端多次前置其 AS。如何覆盖该前置操作？ {#remote-peer-prepends-its-as-several-times-how-to-override-the-prepend}

在 BGP 输入[路由过滤器](../../../../cli-reference/routing/filter/rule.md)中设置 `bgp-path-peer-prepend 1`，即可移除远端对端的前置操作。

## BGP 不选择 AS 路径最短的路由，或其他度量被忽略 {#bgp-does-not-pick-route-with-shortest-as-path-or-other-metrics-are-ignored}

BGP 最佳路径选择仅对由同一 [BGP 实例](../../../../cli-reference/routing/bgp/instance.md) 接收的路由生效。

## 从某个对端接收的 BGP 路由未通告给另一个对端 {#bgp-routes-received-from-one-peer-are-not-advertised-to-another-peer}

最常见的配置错误：

- 输出[过滤器](../../../../cli-reference/routing/filter/rule.md)阻止了重分发。
- 两个对端未运行在同一个 [BGP 实例](../../../../cli-reference/routing/bgp/instance.md) 上。
