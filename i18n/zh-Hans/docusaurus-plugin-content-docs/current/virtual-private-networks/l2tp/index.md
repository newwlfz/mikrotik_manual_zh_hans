---
sidebar_key: "virtual-private-networks/l2tp"
title: "L2TP"
sidebar_label: "L2TP"
description: "本页面介绍 MikroTik RouterOS 的 L2TP 配置,涵盖客户端与服务器的设置,包括 authentication methods、MTU/MRRU 设置、IPsec 集成,以及在 Layer Two Tunneling Protocol 场景下的动态接口管理。"
tags:
  - 'l2tp'
  - 'ppp'
  - 'ipsec'
source: https://manual.mikrotik.com/docs/virtual-private-networks/l2tp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节涵盖 L2TP 示例。可用于配置 LAC 和 LNS 场景以及相关的 L2TP 互操作案例。

Layer Two Tunneling Protocol "L2TP" 扩展了 PPP 模型，允许 L2 和 PPP 端点位于由分组交换网络互连的不同设备上。L2TP 为每个 L2TP 连接包含 PPP 认证和计费。每个连接的完整认证和计费可以通过 RADIUS 客户端或本地完成。L2TP 流量对控制包和数据包都使用 UDP 协议。UDP 端口 1701 仅用于链路建立，后续流量使用任意可用的 UDP 端口（可以与 1701 不同）。这意味着，只要允许 UDP 流量通过防火墙或路由器，L2TP 就能与大多数防火墙和路由器（即使存在 NAT）配合使用。L2TP 标准定义于 [RFC 2661](https://tools.ietf.org/html/rfc2661)。L2TPv3 支持在 7.1 版本中添加，它支持 IPv4 和 IPv6。

## 简介 {#introduction}

L2TP 可以像任何其他隧道协议一样使用，无论是否加密。L2TP 标准指出，加密数据最安全的方式是 L2TP over IPsec（这是 Microsoft L2TP 客户端的默认模式），因为特定隧道的所有 L2TP 控制包和数据包在 IPsec 系统看来都是同质的 UDP/IP 数据包。

支持 Multilink PPP (MP)，以提供 MRRU（能够传输全长 1500 及更大数据包的能力），并通过 Bridge Control Protocol (BCP) 在 PPP 链路上进行桥接，BCP 允许通过 PPP 链路发送原始以太网帧。这样就可以在没有 EoIP 的情况下建立桥接。网桥中应当有一个管理上设置的 MAC 地址，或者包含一个类似以太网的接口，因为 PPP 链路没有 MAC 地址。

:::warning
L2TP 不为隧道流量提供加密机制。可使用 IPsec 提供额外的安全层。
:::

## 快速示例 {#quick-example}

![](/img/f2cf148d94cfeff8.webp)

### L2TP 服务器 {#l2tp-server}

在服务器端，启用 L2TP 服务器并为特定用户创建 PPP 配置文件：

```ros
[admin@MikroTik] > /interface/l2tp-server/server/set enabled=yes
[admin@MikroTik] > /ppp/secret/add local-address=10.0.0.2 name=MT-User password=StrongPass profile=default-encryption remote-address=10.0.0.1 service=l2tp
```

### L2TP 客户端 {#l2tp-client}

本示例配置一个 L2TP 客户端，用户名为 "MT-User"，密码为 "StrongPass"，服务器为 192.168.51.3：

```ros
[admin@MikroTik] > /interface/l2tp-client \
add connect-to=192.168.51.3 disabled=no name=MT-User password=StrongPass user=MT-User
[admin@MikroTik] > /interface/l2tp-client/print 
Flags: X - disabled, R - running 
0 R name="MT-User" max-mtu=1450 max-mru=1450 mrru=disabled connect-to=192.168.51.3 user="MT-User" 
password="StrongPass" profile=default-encryption keepalive-timeout=60 use-ipsec=no ipsec-secret="" 
allow-fast-path=no add-default-route=no dial-on-demand=no allow=pap,chap,mschap1,mschap2
```

## L2TP Ether {#l2tp-ether}

### 概述 {#overview}

Layer 2 Tunnel Protocol Version 3 (L2TPv3) 由 Internet Engineering Task Force (IETF) 的 [RFC 3931](https://tools.ietf.org/html/rfc3931) 定义。它对原始 L2TP 引入了多项改进，允许在 L2TP 内封装二层（L2）载荷，以用于二层虚拟专用网络（VPN）。L2TP Ether 隧道在两个端点之间传输原始以太网帧（以太网伪线，Pseudowire-Type 5）。

要建立 L2TP Ether 隧道，必须在客户端侧创建 L2TP Ether 接口，而在远端（服务器）侧必须启用 L2TP 服务器。两侧配置正确后，它们之间会自动创建一个动态接口，从而跨越 IP 网络形成透明的二层连接。

L2TP Ether 可以封装在 UDP 之上（`l2tp-proto-version=l2tpv3-udp`，默认值），也可以直接封装在 IP 之上（`l2tp-proto-version=l2tpv3-ip`）。支持 IPv4 和 IPv6 覆盖网络；`connect-to` 可接受 IPv4 或 IPv6 地址。

### 拓扑与角色 {#topology-and-roles}

L2TP Ether 隧道有两种不同的角色：

- **主动（客户端）侧** — 创建一个 `/interface/l2tp-ether` 条目，将 `connect-to=` 指向服务器。该侧发起 L2TPv3 控制连接和以太网会话。
- **被动（服务器）侧** — 只需启用 L2TP 服务器（`/interface/l2tp-server/server`）。当主动侧连接时，RouterOS 会在服务器上**自动创建一个动态的** `l2tp-ether` 接口（标志 `D`）；无需在此手动配置。

通常将两个接口都加入同一个网桥，使两个站点共享一个二层域。

### 配置示例 {#configuration-example}

本示例在两台路由器之间建立 L2TP Ether 隧道。

#### 服务器侧（L2TP 服务器） {#server-side-l2tp-server}

```ros
/interface/l2tp-server/server/set enabled=yes
```

#### 客户端侧（L2TP Ether 接口） {#client-side-l2tp-ether-interface}

```ros
/interface/l2tp-ether/add connect-to=1.1.1.1 disabled=no
```

在主动侧验证会话（示例输出）：

```ros
[admin@MikroTik] > /interface/l2tp-ether/print
Flags: X - disabled, R - running, D - dynamic, u - unmanaged 
 0 R name="l2tp-ether1" mac-address=02:3D:2B:00:00:00 connect-to=1.1.1.1 ...
```

在被动侧，隧道建立后会自动出现一个**动态**接口（标志 `D`）（示例输出）：

```ros
[admin@MikroTik] > /interface/l2tp-ether/print
Flags: X - disabled, R - running, D - dynamic, u - unmanaged 
 0 DR name="l2tp-ether1" mac-address=02:3D:2B:00:00:01 connect-to=0.0.0.0 ...
```

### 服务器侧的会话接受 {#server-side-session-acceptance}

服务器是否接受传入的以太网会话由 `/interface/l2tp-server/server` 中的 L2TP 服务器设置控制。完整属性列表请参阅 [CLI 参考](../../cli-reference/interface/l2tp-server/server.md)。

| 设置 | 控制内容 |
|---|---|
| `max-sessions` | 服务器上并发 L2TP 会话的最大数量。达到限制后，服务器将拒绝新会话。 |
| `accept-proto-version` | 接受哪些 L2TP 协议版本（`all`、`l2tpv2`、`l2tpv3`）。 |
| `accept-pseudowire-type` | 接受哪些伪线类型（`all`、`ether`、`ppp`）。对于 L2TP Ether 隧道，必须允许 `ether`。 |
| `l2tpv3-ether-interface-list` | 动态以太网伪线端点所附着的接口列表。 |
| `l2tpv3-circuit-id` | 服务器为传入会话使用的 L2TPv3 电路标识符。 |
| `l2tpv3-cookie-length` | 服务器通告的 L2TPv3 cookie 长度。 |
| `l2tpv3-digest-hash` | 服务器使用的 L2TPv3 摘要哈希算法。 |

### 匹配 circuit-id 和 cookie {#matching-circuit-id-and-cookies}

当服务器设置 `l2tpv3-circuit-id`、`l2tpv3-cookie-length` 或 `l2tpv3-digest-hash` 时，客户端侧的 `l2tp-ether` 条目中需要有对应的值（`circuit-id`、`cookie-length`、`digest-hash`）。如果这些值不一致，即使控制连接已经建立，会话也可能失败 — 请检查两端是否一致。客户端侧属性请参阅 [L2TP Ether CLI 参考](../../cli-reference/interface/l2tp-ether/index.md)。

### 验证与故障排查 {#verify-and-troubleshoot}

如果 L2TP 控制连接已经建立，但以太网会话立即被拆除，那么即使传输层看起来正常，隧道也无法工作。

| 现象 | 可能原因 | 检查方法 |
|---|---|---|
| 日志显示 `maximum session count reached`，随后出现 CDN（`Result-Code=4`）且隧道断开 | 达到服务器会话限制时会话被拒绝 — 这是值得检查的常见原因，并非确定的诊断 | 确认 `/interface/l2tp-server/server` 上的 `max-sessions` 没有限制新会话 |
| 会话被拒绝，服务器上没有动态接口 | 伪线或协议类型未被接受 | `accept-pseudowire-type` 应允许 `ether`；`accept-proto-version` 应允许 `l2tpv3` |
| 被动侧没有动态接口 | 接口列表未涵盖隧道端点 | 检查 `l2tpv3-ether-interface-list` |
| 会话建立但没有流量通过 | 客户端与服务器之间的 `circuit-id` / `cookie-length` / `digest-hash` 不一致 | 比较 `l2tp-ether` 和 `l2tp-server` 的设置 |

可随时使用 [monitor](../../cli-reference/interface/l2tp-ether/monitor.md) 命令查看活动会话：

```ros
/interface/l2tp-ether/monitor l2tp-ether1
```
