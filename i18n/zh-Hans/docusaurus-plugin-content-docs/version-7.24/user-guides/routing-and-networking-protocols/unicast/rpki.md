---
title: "RPKI"
description: "RouterOS 支持使用 Resource Public Key Infrastructure 进行 BGP 前缀验证，通过 RTR 协议实现安全的路由起源验证。配置包括设置 RTR 服务器，以及基于 RPKI 有效性状态应用过滤器，以接受或拒绝路由。"
tags:
  - 'rpki'
  - 'bgp'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/rpki
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "user-guides/routing-and-networking-protocols/mpls"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 实现了 [`RFC 8210`](https://tools.ietf.org/html/rfc8210) 定义的 Resource Public Key Infrastructure（RPKI）to Router Protocol。RTR 是一种轻量级、低内存占用的协议，用于从 RPKI 验证器检索前缀验证数据。有关验证器设置示例，请参阅 [RIPE blog](https://blog.apnic.net/2019/10/28/how-to-installing-an-rpki-validator/)。

配置位于 [`/routing/rpki`](/docs/user-guides/routing-and-networking-protocols/unicast/rpki) 下。

## 基本示例 {#basic-example}

假设网络中的 RTR 服务器 IP 地址为 `192.168.1.1`：

```ros
/routing/rpki
add group=myRpkiGroup address=192.168.1.1 port=8282 refresh-interval=20
```

[`group`](/docs/user-guides/routing-and-networking-protocols/unicast/rpki#group)、[`address`](/docs/user-guides/routing-and-networking-protocols/unicast/rpki#address)、[`port`](/docs/user-guides/routing-and-networking-protocols/unicast/rpki#port) 和 [`refresh-interval`](/docs/user-guides/routing-and-networking-protocols/unicast/rpki#refresh-interval) 参数用于配置 RTR 连接。其他参数包括 [`vrf`](/docs/user-guides/routing-and-networking-protocols/unicast/rpki#vrf)、[`preference`](/docs/user-guides/routing-and-networking-protocols/unicast/rpki#preference)、[`retry-interval`](/docs/user-guides/routing-and-networking-protocols/unicast/rpki#retry-interval) 和 [`expire-interval`](/docs/user-guides/routing-and-networking-protocols/unicast/rpki#expire-interval)。

建立连接并接收验证器数据库后，使用 [`rpki-check`](/docs/cli-reference/routing/rpki/rpki-check) 检查前缀有效性：

```text
[admin@rack1_b33_CCR1036] /routing/rpki> rpki-check group=myRpkiGroup prfx=70.132.18.0/24 origin-as=16509
    valid
```

在 [routing filters](/docs/user-guides/routing-and-networking-protocols/route-selection-and-filtering) 中使用缓存数据库，根据 RPKI 有效性接受或拒绝前缀。首先设置 [`/routing/filter/rule`](/docs/cli-reference/routing/filter/rule)，定义由哪个 RPKI 组执行验证。之后，过滤器可以匹配 RPKI 数据库中的状态。状态可以是以下四个值之一：

- **valid** - 数据库中有记录，且 origin AS 有效。
- **invalid** - 数据库中有记录，且 origin AS 无效。
- **unknown** - 数据库中没有关于该前缀和 origin AS 的信息。
- **unverified** - 当 RPKI 组的所有会话都未同步数据库时设置。使用该值处理 RPKI 完全故障。

```ros
/routing/filter/rule
add chain=bgp_in rule="rpki-verify myRpkiGroup"
add chain=bgp_in rule="if (rpki invalid) { reject } else { accept }"
```
