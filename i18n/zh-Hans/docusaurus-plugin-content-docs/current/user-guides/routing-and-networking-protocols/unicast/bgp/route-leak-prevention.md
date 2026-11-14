---
sidebar_key: "user-guides/routing-and-networking-protocols/unicast/bgp/route-leak-prevention"
sidebar_position: 4
title: "路由泄露防护"
sidebar_label: "路由泄露防护"
description: "使用 RFC 9234 中定义的 BGP 角色来防止并检测路由泄漏。"
tags:
  - 'routing'
  - 'bgp'
  - 'rfc-9234'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/unicast/bgp/route-leak-prevention
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

当 BGP 发言人向对等体通告路由，而根据配置的业务关系该对等体本不应收到这些路由时，就会发生路由泄漏。例如，中转客户将从某个提供商学习到的路由重新通告给另一个提供商，可能导致流量经过该客户的网络进行路由，从而可能绕过预期路径，并造成路由环路或流量拦截。

[RFC 9234](https://datatracker.ietf.org/doc/rfc9234/) — *使用 UPDATE 和 OPEN 消息中的角色预防和检测路由泄漏* — 定义了一种机制：为每个 eBGP 会话分配一个描述两个对等体之间关系的角色，以此来预防和检测路由泄漏。RouterOS 通过 `local.role` 参数实现该机制，该参数对每个 BGP 连接都是必需的，并定义本地路由器在 BGP 会话中的角色。

`ibgp`、`ibgp-rr` 和 `ebgp` 角色不参与 RFC 9234 角色协商。会话将作为传统 BGP 会话建立，不交换 Role 能力。

其余五个角色参与 RFC 9234 角色协商：

| 角色 | 描述 |
| :-- | :-- |
| `ebgp-provider` | 中转提供商。 |
| `ebgp-rs` | 路由服务器。 |
| `ebgp-rs-client` | 路由服务器客户端。 |
| `ebgp-customer` | 中转客户。 |
| `ebgp-peer` | 横向对等体（对等关系）。 |

### 关系类型 {#relationship-types}

这些角色描述两个 eBGP 对等体之间的业务关系：

- **中转提供商—客户**：提供商向客户出售中转服务，使客户能够访问提供商的完整路由表（通常是整个互联网）。客户将其自有前缀及其下游客户的前缀通告给提供商。提供商将其学习到的所有路由（包括来自其他客户和对等体的路由）通告给客户。在此关系中，提供商是上游，客户是下游。
- **路由服务器—客户端**：路由服务器是一种中立的 BGP 发言人，通常部署在互联网交换点（IXP）。它本身不转发流量——它只在客户端之间反射路由信息。路由服务器客户端连接到路由服务器，以便与其他客户端交换路由，而无需与每个客户端建立直接对等会话。路由服务器不修改 AS_PATH 或 NEXT_HOP，也不出现在数据路径中。
- **横向对等体**：两个具有对等关系的网络仅交换各自的路由及各自客户的路由。双方都不通告从其他对等体或提供商学习到的路由。对等通常是无结算的，即两个网络之间不进行金钱交换。

两个对等体必须配置为匹配的角色，会话才能成功建立。

## 角色协商 {#role-negotiation}

当 BGP 会话配置了 RFC 9234 角色时，路由器会在 OPEN 消息中发送 BGP Role 能力（能力代码 9）。当本地路由器收到远程对等体的 OPEN 消息时，它会根据本地配置的 `local.role` 检查收到的角色是否符合预期角色：

| 本地角色 | 预期的远程角色 |
| :-- | :-- |
| `ebgp-provider` | `ebgp-customer` |
| `ebgp-customer` | `ebgp-provider` |
| `ebgp-rs` | `ebgp-rs-client` |
| `ebgp-rs-client` | `ebgp-rs` |
| `ebgp-peer` | `ebgp-peer` |

如果远端对等体不发送 Role 能力，或者接收到的角色与预期角色不匹配，则路由器发送带有 Error Code 2（OPEN Message Error）、Error Subcode 11（Role Mismatch）的 NOTIFICATION 消息，并终止会话。

协商后的角色可在会话监控输出中查看：

- `remote.role` — 在 OPEN 消息中从远程对等体收到的角色。
- `local.role` — 本地配置的角色。

## 配置 {#configuration}

`local.role` 参数在 [`/routing/bgp/connection`](../../../../cli-reference/routing/bgp/connection.md) 菜单中配置。

如果会话建立成功，可以在 [`/rouring/bgp/session`](../../../../cli-reference/routing/bgp/session/index.md) 菜单中监控协商后的能力和选定的角色。

当远程对等体支持 BGP Role 能力时，`remote.capabilities` 字段会包含 `role`。`remote.role` 字段显示从远程对等体收到的实际角色。

如果会话因角色不匹配而未能建立，`input.last-notification` 字段会包含从对等体收到的十六进制编码的 NOTIFICATION 消息。

### 示例：中转提供商到客户 {#example-transit-provider-to-customer}

连接到下游客户的中转提供商：

```ros
# 提供商侧（AS 64500）
/routing/bgp/instance
add name=instance1 as=64500
/routing/bgp/connection
add name=to-customer remote.address=198.51.100.1 instance=instance1 local.role=ebgp-provider

# 客户侧（AS 64501）
/routing/bgp/instance
add name=instance1 as=64501
/routing/bgp/connection
add name=to-provider remote.address=192.0.2.1 instance=instance1 local.role=ebgp-customer
```

两个对等体必须配置为匹配的角色。配置为 `ebgp-provider` 的对等体预期远程为 `ebgp-customer`，反之亦然。

### 示例：带多个客户端的路由服务器 {#example-route-server-with-multiple-clients}

连接到多个客户端的 IXP 路由服务器：

```ros
# 路由服务器侧（AS 65500）
/routing/bgp/instance
add name=instance1 as=65500
/routing/bgp/connection
add name=rs-client1 remote.address=203.0.113.1 instance=instance1 local.role=ebgp-rs
add name=rs-client2 remote.address=203.0.113.2 instance=instance1 local.role=ebgp-rs

# 路由服务器客户端侧（AS 64601）
/routing/bgp/instance
add name=instance1 as=64601
/routing/bgp/connection
add name=to-rs remote.address=203.0.113.254 instance=instance1 local.role=ebgp-rs-client
```

### 示例：两个网络之间的对等 {#example-peering-between-two-networks}

两个具有对等关系的网络：

```ros
# Network A (AS 64500)
/routing/bgp/instance
add name=instance1 as=64500
/routing/bgp/connection
add name=to-peer-b remote.address=192.0.2.2 instance=instance1 local.role=ebgp-peer

# Network B (AS 64700)
/routing/bgp/instance
add name=instance1 as=64700
/routing/bgp/connection
add name=to-peer-a remote.address=192.0.2.1 instance=instance1 local.role=ebgp-peer
```

### 示例：iBGP 和路由反射器 {#example-ibgp-and-route-reflector}

内部 BGP 会话不使用 RFC 9234 角色协商：

```ros
# iBGP peer
/routing/bgp/instance
add name=instance1 as=64500
/routing/bgp/connection
add name=ibgp-peer1 remote.address=10.0.0.2 instance=instance1 local.role=ibgp

# iBGP 路由反射器客户端
/routing/bgp/connection
add name=rr-client1 remote.address=10.0.0.3 instance=instance1 local.role=ibgp-rr
```
