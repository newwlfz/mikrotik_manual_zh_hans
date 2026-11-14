---
sidebar_key: "routing-and-networking-protocols/unicast/rpki"
sidebar_position: 7
title: "RPKI"
sidebar_label: "RPKI"
description: "RouterOS 支持使用 Resource Public Key Infrastructure 通过 RPKI 进行 BGP 前缀验证，并通过 RTR 协议实现安全的路由源验证。配置包括设置 RTR 服务器，以及根据 RPKI 有效性状态应用过滤器来接受或拒绝路由。"
tags:
  - 'rpki'
  - 'bgp'
slug: /user-guides/routing-and-networking-protocols/unicast/rpki
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/rpki
captured_at: '2026-11-04T11:34:17+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 实现了 [`RFC 8210`](https://tools.ietf.org/html/rfc8210) 中定义的 Resource Public Key Infrastructure (RPKI) to Router Protocol。RTR 是一种轻量级、低内存占用的协议，用于从 RPKI 验证器获取前缀验证数据。可在 [RIPE 博客](https://blog.apnic.net/2019/10/28/how-to-installing-an-rpki-validator/) 上查看验证器设置示例。

配置位于 [`/routing/rpki`](./rpki.md) 下。

## 基本示例 {#basic-example}

假设你的网络在 IP 地址 `192.168.1.1` 上有一个 RTR 服务器：

```ros
/routing/rpki
add group=myRpkiGroup address=192.168.1.1 port=8282 refresh-interval=20
```

[`group`](./rpki.md#group)、[`address`](./rpki.md#address)、[`port`](./rpki.md#port) 和 [`refresh-interval`](./rpki.md#refresh-interval) 参数用于配置 RTR 连接。其他参数包括 [`vrf`](./rpki.md#vrf)、[`preference`](./rpki.md#preference)、[`retry-interval`](./rpki.md#retry-interval) 和 [`expire-interval`](./rpki.md#expire-interval)。

连接建立并收到验证器数据库后，使用 [`rpki-check`](../../../cli-reference/routing/rpki/rpki-check.md) 检查前缀有效性：

```text
[admin@rack1_b33_CCR1036] /routing/rpki> rpki-check group=myRpkiGroup prfx=70.132.18.0/24 origin-as=16509
    valid
```

在[路由过滤器](../route-selection-and-filtering.md)中使用缓存的数据库，根据 RPKI 有效性接受或拒绝前缀。首先设置一个 [`/routing/filter/rule`](../../../cli-reference/routing/filter/rule.md)，用于定义哪个 RPKI 组执行验证。之后，过滤器可以匹配 RPKI 数据库中的状态。状态可以是以下四个值之一：

- **valid** - 数据库中有记录且源 AS 有效。
- **invalid** - 数据库中有记录且源 AS 无效。
- **unknown** - 数据库中没有关于该前缀和源 AS 的信息。
- **unverified** - 当该 RPKI 组的任何会话都未同步数据库时设置。使用此值来处理 RPKI 完全故障。

```ros
/routing/filter/rule
add chain=bgp_in rule="rpki-verify myRpkiGroup"
add chain=bgp_in rule="if (rpki invalid) { reject } else { accept }"
```
