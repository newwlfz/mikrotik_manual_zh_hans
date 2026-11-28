---
title: "理解 BGP"
description: "BGP 协议基础概述。"
tags:
  - 'routing'
  - 'bgp'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/bgp/understanding-bgp
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "user-guides/routing-and-networking-protocols/unicast/bgp"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**边界网关协议**（**BGP**）是一种外部网关协议（**EGP**）。它可用于建立域间动态路由系统。当网络拓扑发生变化时，该系统会自动更新 BGP 路由器上的路由表。

BGP 是一种基于 **path-vector** 算法的自治系统间路由协议。它跨 Internet 交换路由信息，是唯一一种设计用于在 Internet 规模下运行并处理到无关路由域的多个连接的协议。

BGP 旨在允许管理员实施复杂的路由策略。它不交换有关网络拓扑的信息，而是交换可达性信息。因此，BGP 更适合 **inter-AS** 环境以及信息馈送等特殊场景。如果需要在网络中启用动态路由，请改用 OSPF。

:::info
SMIPS 设备（hAP lite、hAP lite TC 和 hAP mini）不支持 BGP。
:::

## Terminology

- **AS** - 自治系统是在单一技术管理下、具有一组通用度量值的一组路由器。
- **ASN** - 自治系统号是自治系统的唯一标识符。ASN 可以是私有或公有。公有 ASN 在全球范围内唯一，并由 RIPE 等监管机构分配。
- **AS Path** - 路由经过的自治系统序列。
- **Path Attributes** - 包含有关 AS path 的附加信息，并用于路由策略。
- **Routing policy** - 一组规则，用于控制路由信息的重分发，并从多个可用路径中选择最佳路径。
- **NLRI** - 网络层可达性信息，是 BGP 对等体之间交换的内容，表示如何到达前缀。
- **IGP** - 内部网关协议，例如 OSPF 或 ISIS。
- **EGP** - 外部网关协议，例如 BGP。
- **RR** - 路由反射器是一种 BGP 路由器，它在 **iBGP** 发言方之间反射路由信息，从而无需全互联连接。
- **Route server** - 不参与流量转发的 BGP 路由器。路由通常甚至不会安装到 FIB 中。
- **Loopback address** - 配置在 dummy bridge 接口上的 /32（IPv4）或 /128（IPv6）地址，可用作 loopback。

BGP 连接分为两种类型：

- **iBGP** - 连接同一 AS 中对等体的“内部”链路。
- **eBGP** - 连接属于两个不同 AS 的对等体的“外部”链路。

## 协议基础 {#protocol-basics}

BGP 路由器通过传输协议交换可达性信息；在 BGP 中，该协议是 TCP（端口 179）。建立 TCP 连接后，这些路由器交换 **OPEN** 消息，以协商并确认支持的能力。

就使用的能力达成一致后，会话被视为 **established**，对等体可以开始通过 **UPDATE** 消息交换 NLRI。这些消息指示路由到达目标网络（NLRI 前缀）应经过的 AS 序列（AS Path）。

对等体最初交换完整的路由表，初始交换之后，随着路由表变化发送增量更新。因此，BGP 不需要定期刷新整个 BGP 路由表。

BGP 维护路由表版本号，在连接持续期间，任意两个给定对等体之间的该版本号必须相同。

定期发送 **KEEPALIVE** 消息，以确保连接正常运行。如果在 **Hold Time** 间隔内未收到消息，连接将关闭。

为响应错误或特殊情况，可以生成 **NOTIFICATION** 消息并发送给远端对等体；该消息类型还指示连接是否应立即关闭。

一个 AS 可能有多个 BGP 发言方，并为其他 AS 提供转接服务。这意味着 BGP 发言方必须在 AS 内维护一致的路由视图。通过让 AS 内所有 BGP 路由器彼此建立直接 **iBGP** 连接（full mesh），或使用 **route reflector** 配置，可以提供 AS 外部路由的一致视图。

通过使用一组管理策略（路由策略），AS 内的 BGP 发言方就会针对特定目的地使用哪个入口或出口点达成一致。该信息通过内部路由协议（**IGP**）传递给 AS 内的内部路由器，例如 OSPF、RIP 或静态路由。在某些配置中，iBGP 也可以承担 IGP 协议的角色。

对于某些 BGP 属性，处理行为可能会根据连接类型而变化；例如，**LOCAL-PREF** 属性不会通告给 **eBGP** 对等体。

RouterOS 将配置和会话监控分为四个菜单：

- instance 菜单（[`/routing/bgp/instance`](/docs/cli-reference/routing/bgp/instance)）
- connection 菜单（[`/routing/bgp/connection`](/docs/cli-reference/routing/bgp/connection)）
- sessions 菜单（[`/routing/bgp/session`](/docs/cli-reference/routing/bgp/session)）
- template 菜单（[`/routing/bgp/template`](/docs/cli-reference/routing/bgp/template)）

## 路由起源 {#route-origin}

首次通告路由的 BGP 路由器会指定其起源，并将其写入 **ORIGIN** 属性。  
共有三种起源类型：

- 0 - 路由器最初通过 **IGP** 获知该路由。如果通过 BGP [`output.network`](/docs/cli-reference/routing/bgp/connection#output.network) 获知路由，RouterOS 会分配该值。
- 1 - 路由器最初通过 **EGP** 获知该路由。
- 2 - 起源未知或不完整。如果通过 BGP [`output.redistribute`](/docs/cli-reference/routing/bgp/connection#output.redistribute) 获知路由，RouterOS 会分配该值。

## 最佳路径选择 {#best-path-selection}

BGP 路由器可以从多个提供商接收多份全局路由表副本，但默认情况下 BGP 只能有一条最佳路径。为了选择最佳路由，BGP 使用 **Best Path Selection Algorithm**。

仅当路由有效时，算法才会评估该路由。通常，满足以下条件时路由被视为有效：

- 路由的 **NEXT_HOP** 有效且可达
- 从外部对等体收到的 **AS_PATH** 不包含本地 AS
- 路由未被 [routing filters](/docs/cli-reference/routing/filter/rule) 拒绝

详情请参阅 [nexthop selection and validation](/docs/user-guides/routing-and-networking-protocols/unicast/bgp/nexthop-selection)。

最佳路径算法还会仅比较由**单个 BGP 实例**收到的路由。由不同 BGP 实例安装的路由由通用算法比较；即比较路由距离，优先选择距离较低的路由。

如果满足所有条件，则会执行以下操作：

1. 收到的第一条路径会自动被视为“最佳路径”。随后收到的每条路径都会与第一条路径比较，以确定新路径是否更优。
2. 优先选择 **WEIGHT** 最高的路径。
   该参数不属于 BGP 标准，而是为快速在本地选择最佳路由而设计。该参数对路由器本地有效（在 BGP 输入中通过路由过滤器分配），无法通告。未分配 WEIGHT 的路由默认值为 0。
3. 优先选择 **LOCAL_PREF** 最高的路径。
   该属性仅在 AS 内使用。没有 LOCAL_PREF 属性的路径默认值为 100。
4. 优先选择 **AS_PATH** 最短的路径（如果 [`ignore-as-path-len`](/docs/cli-reference/routing/bgp/instance#ignore-as-path-len) 设置为 **yes**，则跳过该步骤）。  
   每个 **AS_SET** 均计为 1，与集合大小无关。**AS_CONFED_SEQUENCE** 和 **AS_CONFED_SET** 不计入 **AS_PATH** 长度。
5. ~~优先选择通过聚合或 BGP network 在本地发起的路径~~
6. 优先选择 [**ORIGIN** 类型](#route-origin)最低的路径。

   Interior Gateway Protocol（IGP）低于 Exterior Gateway Protocol（EGP），EGP 低于 INCOMPLETE。

   换句话说，**IGP < EGP < INCOMPLETE**。
7. 优先选择 **multi-exit discriminator**（MED）最低的路径。

   路由器仅对具有相同相邻（最左侧）AS 的路径比较 MED 属性。确定相邻 AS 时不考虑联盟。  
   没有显式 MED 值的路径被视为 MED 为 0。
8. 优先选择 **eBGP** 路径而不是 **iBGP** 路径。
9. 如果启用了 `multipath`，则在此处停止比较并将路径视为相等。这将安装 BGP [ECMP](/docs/user-guides/routing-and-networking-protocols/routing-decision#multipath-ecmp-routes) 路由。
10. 优先选择最低的 **IGP metric**。
11. 优先选择来自具有最低 [**router ID**](/docs/cli-reference/routing/bgp/instance#router-id) 的 BGP 路由器的路由。如果路由携带 **ORIGINATOR_ID** 属性，则使用 **ORIGINATOR_ID** 代替 router ID。
12. 优先选择 **route reflection cluster list** 最短的路由。没有 cluster list 的路由被视为 cluster list 长度为 0。
13. 优先选择来自最低邻居地址的路径。

## 多个实例 {#multiple-instances}

可能需要运行多个 BGP 实例，以支持依赖实例的功能，例如 Layer3 VPN 和 [EVPN](/docs/user-guides/routing-and-networking-protocols/unicast/evpn)。RouterOS 允许你在 [`/routing/bgp/instance`](/docs/cli-reference/routing/bgp/instance) 菜单中添加多个实例。

请注意，[最佳路径选择](#best-path-selection)不适用于来自不同实例的路由。此外，默认重分发策略不会重分发从不属于同一实例的会话接收到的 BGP 路由。如果需要此类重分发，请设置 [`output.redistribute`](/docs/cli-reference/routing/bgp/connection#output.redistribute)`=bgp`。

## 支持的标准 {#supported-standards}

- [RFC 4271](https://tools.ietf.org/html/rfc4271) Border Gateway Protocol 4
- [RFC 4456](https://tools.ietf.org/html/rfc4456) BGP 路由反射
- [RFC 5065](https://tools.ietf.org/html/rfc5065) BGP 自治系统联盟
- [RFC 1997](https://tools.ietf.org/html/rfc1997) BGP Communities 属性
- [RFC 8092](https://tools.ietf.org/html/rfc8092) BGP Large Communities
- [RFC 4360](https://tools.ietf.org/html/rfc4360), [5668](https://tools.ietf.org/html/rfc5668) BGP Extended Communities
- [RFC 2385](https://tools.ietf.org/html/rfc2385) BGPv4 的 TCP MD5 认证
- [RFC 5492](https://tools.ietf.org/html/rfc5492) BGP-4 的能力通告
- [RFC 2918](https://tools.ietf.org/html/rfc2918) Route Refresh 能力
- [RFC 4760](https://tools.ietf.org/html/rfc4760) BGP-4 的多协议扩展
- [RFC 2545](https://tools.ietf.org/html/rfc2545) 使用 BGP-4 多协议扩展实现 IPv6 域间路由
- [RFC 4893](https://tools.ietf.org/html/rfc4893) BGP 对四字节 AS 编号空间的支持
- [RFC 4364](https://tools.ietf.org/html/rfc4364) BGP/MPLS IP 虚拟专用网络（VPN）
- [RFC 4761](https://tools.ietf.org/html/rfc4761) 使用 BGP 实现自动发现和信令的虚拟专用 LAN 服务（VPLS）
- draft-ietf-l2vpn-signaling-08 基于 BGP 的 Cisco VPLS 自动发现
- [RFC 6286](https://tools.ietf.org/html/rfc6286) BGP-4 的 AS 范围内唯一 BGP 标识符
- [RFC 4273](https://tools.ietf.org/html/rfc4273) SNMP peer table 监控（OID 1.3.6.1.2.1.15.3.1）（仅 IPv4）
- [RFC 6793](https://www.rfc-editor.org/rfc/rfc6793) 4 字节 ASN 支持和 Aggregator 属性。
- [RFC 4486](https://datatracker.ietf.org/doc/html/rfc4486) BGP Cease Notification Message 的子码
- [RFC 4659](https://datatracker.ietf.org/doc/html/rfc4659) IPv6 的 MPLS VPN 扩展
- [RFC 8950](https://datatracker.ietf.org/doc/html/rfc8950) 使用 IPv6 Next Hop 通告 IPv4 Network Layer Reachability Information（NLRI）
- [RFC 6811](https://datatracker.ietf.org/doc/html/rfc6811) BGP 前缀起源验证
- [RFC 6996](https://www.rfc-editor.org/rfc/rfc6996.html) 私有用途的自治系统（AS）保留
- [RFC 9234](https://datatracker.ietf.org/doc/rfc9234/) 使用 UPDATE 和 OPEN 消息中的角色防止和检测路由泄露
- [RFC 5549](https://datatracker.ietf.org/doc/html/rfc5549) 使用 IPv6 Next Hop 通告 IPv4 Network Layer Reachability Information
