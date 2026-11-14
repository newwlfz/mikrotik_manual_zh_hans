---
sidebar_key: "user-guides/routing-and-networking-protocols/unicast/bgp/understanding-bgp"
sidebar_position: 1
title: "理解 BGP"
sidebar_label: "理解 BGP"
description: "BGP 协议基础概述。"
tags:
  - 'routing'
  - 'bgp'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/unicast/bgp/understanding-bgp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**边界网关协议**（**BGP**）是一种外部网关协议（**EGP**）。它可用于建立域间动态路由系统。当网络拓扑发生变化时，该系统会自动更新 BGP 路由器上的路由表。

BGP 是一种基于**路径矢量**算法的自治系统间路由协议。它在整个互联网范围内交换路由信息，是唯一为在互联网规模下运行并处理与不相关路由域之间的多条连接而设计的协议。

BGP 的设计目标是让管理员能够实施精细的路由策略。它交换的不是网络拓扑信息，而是可达性信息。因此，BGP 更适合 **inter-AS** 环境以及信息馈送之类的特殊场景。如果需要在网络中启用动态路由，请改用 OSPF。

:::info
SMIPS 设备（hAP lite、hAP lite TC 和 hAP mini）不支持 BGP。
:::

## 术语 {#terminology}

- **AS** - 自治系统（Autonomous System），指由单一技术管理机构管理、具有共同度量集合的一组路由器。
- **ASN** - 自治系统号（Autonomous System Number），是自治系统的唯一标识符。ASN 可以是私有或公有的。公有 ASN 在全球范围内唯一，由 RIPE 等监管机构分配。
- **AS Path** - 路由所经过的自治系统序列。
- **Path Attributes** - 包含有关 AS 路径的附加信息，用于路由策略。
- **Routing policy** - 一组规则，用于控制路由信息的重分发，并在多条可用路径中选择最佳路径。
- **NLRI** - 网络层可达性信息（Network Layer Reachability Information），是在 BGP 对等体之间交换的内容，表示如何到达各个前缀。
- **IGP** - 内部网关协议，例如 OSPF 或 ISIS。
- **EGP** - 外部网关协议，例如 BGP。
- **RR** - 路由反射器（route reflector），是一种在 **iBGP** 发言者之间反射路由信息的 BGP 路由器，可免除全互联连接的需求。
- **Route server** - 不参与流量转发的 BGP 路由器。此类路由通常甚至不会被安装到 FIB 中。
- **Loopback address** - 配置在可作为环回接口的 dummy bridge 接口上的 /32（IPv4）或 /128（IPv6）地址。

BGP 连接有两种类型：

- **iBGP** - 连接同一 AS 中对等体的“内部”链路。
- **eBGP** - 连接属于两个不同 AS 的对等体的“外部”链路。

## 协议基础 {#protocol-basics}

BGP 路由器借助传输协议交换可达性信息；就 BGP 而言，该协议是 TCP（端口 179）。在建立 TCP 连接后，这些路由器交换 **OPEN** 消息，以协商并确认双方支持的能力。

在就能使用的功能达成一致后，会话即被视为**已建立**，对等体可以开始通过 **UPDATE** 消息交换 NLRI。这些消息指明了路由到达目标网络（NLRI 前缀）所应经过的 AS 序列（AS Path）。

对等体最初会交换各自完整的路由表，在初始交换之后，随着路由表变化，会发送增量更新。因此，BGP 不需要对整个 BGP 路由表进行周期性刷新。

BGP 维护路由表版本号，在连接存续期间，任意两个给定对等体之间的该版本号必须相同。

**KEEPALIVE** 消息会被定期发送，以确保连接处于正常运行状态。如果在 **Hold Time** 间隔内未收到这些消息，连接将关闭。

为响应错误或特殊情况，可以生成 **NOTIFICATION** 消息并发送给远端对等体；该消息类型同时也指示连接是否应立即关闭。

一个 AS 可能拥有多个 BGP 发言者，并为其 AS 提供中转服务。这意味着 BGP 发言者必须在 AS 内部保持一致的路由视图。为保证 AS 外部路由视图的一致性，AS 内的所有 BGP 路由器彼此之间建立直接的 **iBGP** 连接（全互联），或者采用**路由反射器**方案。

借助一组管理策略（路由策略），AS 内的 BGP 发言者就特定目的地应使用哪个入口或出口点达成一致。该信息通过内部路由协议（**IGP**，例如 OSPF、RIP 或静态路由）传达给 AS 的内部路由器。在某些部署中，iBGP 也可以承担 IGP 协议的角色。

对于某些 BGP 属性，其处理行为可能因连接类型而异；例如，**LOCAL-PREF** 属性不会通告给 **eBGP** 对等体。

RouterOS 将配置和会话监控划分为四个菜单：

- instance 菜单（[`/routing/bgp/instance`](../../../../cli-reference/routing/bgp/instance.md)）
- connection 菜单（[`/routing/bgp/connection`](../../../../cli-reference/routing/bgp/connection.md)）
- sessions 菜单（[`/routing/bgp/session`](../../../../cli-reference/routing/bgp/session/index.md)）
- template 菜单（[`/routing/bgp/template`](../../../../cli-reference/routing/bgp/template.md)）

## 路由来源 {#route-origin}

首先通告某条路由的 BGP 路由器会为其指定来源，并将其写入 **ORIGIN** 属性。  
共有三种来源类型：

- 0 - 路由器最初是通过 **IGP** 学到该路由的。如果路由是通过 BGP [`output.network`](../../../../cli-reference/routing/bgp/connection.md#output.network) 学到的，RouterOS 会赋予该值。
- 1 - 路由器最初是通过 **EGP** 学到该路由的。
- 2 - 来源未知/不完整。如果路由是通过 BGP [`output.redistribute`](../../../../cli-reference/routing/bgp/connection.md#output.redistribute) 学到的，RouterOS 会赋予该值。

## 最佳路径选择 {#best-path-selection}

BGP 路由器可以从多个提供商处收到全局路由表的多份副本，但默认情况下 BGP 只能有一条最佳路径。为选出最佳路由，BGP 使用**最佳路径选择算法**。

仅当路由有效时，算法才会对其进行评估。一般来说，满足以下条件时路由被视为有效：

- 路由的 **NEXT_HOP** 有效且可达
- 从外部对等体收到的 **AS_PATH** 不包含本地 AS
- 路由未被[路由过滤器](../../../../cli-reference/routing/filter/rule.md)拒绝

更多信息请参阅[下一跳选择与验证](./nexthop-selection.md)。

最佳路径算法比较的也只是由**单个 BGP 实例**收到的路由。由不同 BGP 实例安装的路由则由通用算法比较；即比较路由距离，距离较小的路由优先。

如果满足所有条件，则执行以下操作：

1. 收到的第一条路径会被自动视为“最佳路径”。之后收到的任何路径都会与第一条收到的路径比较，以确定新路径是否更优。
2. 优先选择 **WEIGHT** 最高的路径。
   该参数不属于 BGP 标准，它是为了在本地快速选择最佳路由而引入的。该参数是路由器本地参数（在 BGP 输入中通过路由过滤器赋值），无法被通告。未分配 WEIGHT 的路由默认值为 0。
3. 优先选择 **LOCAL_PREF** 最高的路径。
   该属性仅在 AS 内部使用。没有 LOCAL_PREF 属性的路径默认值为 100。
4. 优先选择 **AS_PATH** 最短的路径（若 [`ignore-as-path-len`](../../../../cli-reference/routing/bgp/instance.md#ignore-as-path-len) 设置为 **yes**，则跳过此项）。  
   每个 **AS_SET** 无论其集合大小均计为 1。**AS_CONFED_SEQUENCE** 和 **AS_CONFED_SET** 不计入 **AS_PATH** 长度。
5. ~~优先选择通过 aggregate 或 BGP network 本地产生的路径~~
6. 优先选择 [**ORIGIN** 类型](#route-origin)最低的路径。

   内部网关协议（IGP）低于外部网关协议（EGP），EGP 低于 INCOMPLETE。

   换言之，**IGP < EGP < INCOMPLETE**。
7. 优先选择**多出口鉴别器**（MED）最低的路径。

   路由器仅对具有相同邻居（最左侧）AS 的路径比较 MED 属性。确定邻居 AS 时不考虑联盟。  
   没有明确 MED 值的路径按 MED 为 0 处理。
8. 优先选择 **eBGP** 路径而非 **iBGP** 路径。
9. 如果启用了 `multipath`，则在此处中断并将各路径视为等价。这将安装 BGP [ECMP](../../routing-decision.md#multipath-ecmp-routes) 路由。
10. 优先选择 **IGP 度量**最低的路径。
11. 优先选择来自 [**router ID**](../../../../cli-reference/routing/bgp/instance.md#router-id) 最低的 BGP 路由器的路由。如果路由携带 **ORIGINATOR_ID** 属性，则使用 **ORIGINATOR_ID** 代替 router ID。
12. 优先选择**路由反射簇列表**最短的路径。没有簇列表的路由视为簇列表长度为 0。
13. 优先选择来自最低邻居地址的路径。

## 多实例 {#multiple-instances}

有时可能需要运行多个 BGP 实例，以支持依赖实例的功能，例如 Layer3 VPN 和 [EVPN](../evpn.md)。RouterOS 允许在 [`/routing/bgp/instance`](../../../../cli-reference/routing/bgp/instance.md) 菜单中添加多个实例。

请注意，[最佳路径选择](#best-path-selection)不适用于来自不同实例的路由。此外，默认的重分发策略不会重分发从不属于同一实例的会话收到的 BGP 路由。在此类情况下，如果需要此类重分发，请设置 [`output.redistribute`](../../../../cli-reference/routing/bgp/connection.md#output.redistribute)`=bgp`。

## 支持的标准 {#supported-standards}

- [RFC 4271](https://tools.ietf.org/html/rfc4271) Border Gateway Protocol 4
- [RFC 4456](https://tools.ietf.org/html/rfc4456) BGP Route Reflection
- [RFC 5065](https://tools.ietf.org/html/rfc5065) Autonomous System Confederations for BGP
- [RFC 1997](https://tools.ietf.org/html/rfc1997) BGP Communities Attribute
- [RFC 8092](https://tools.ietf.org/html/rfc8092) BGP Large Communities
- [RFC 4360](https://tools.ietf.org/html/rfc4360)、[5668](https://tools.ietf.org/html/rfc5668) BGP Extended Communities
- [RFC 2385](https://tools.ietf.org/html/rfc2385) TCP MD5 Authentication for BGPv4
- [RFC 5492](https://tools.ietf.org/html/rfc5492) Capabilities Advertisement with BGP-4
- [RFC 2918](https://tools.ietf.org/html/rfc2918) Route Refresh Capability
- [RFC 4760](https://tools.ietf.org/html/rfc4760) Multiprotocol Extensions for BGP-4
- [RFC 2545](https://tools.ietf.org/html/rfc2545) Use of BGP-4 Multiprotocol Extensions for IPv6 Inter-Domain Routing
- [RFC 4893](https://tools.ietf.org/html/rfc4893) BGP Support for Four-octet AS Number Space
- [RFC 4364](https://tools.ietf.org/html/rfc4364) BGP/MPLS IP Virtual Private Networks (VPNs)
- [RFC 4761](https://tools.ietf.org/html/rfc4761) Virtual Private LAN Service (VPLS) Using BGP for Auto-Discovery and Signalling
- draft-ietf-l2vpn-signaling-08 Cisco VPLS BGP-based auto-discovery
- [RFC 6286](https://tools.ietf.org/html/rfc6286) AS-wide Unique BGP Identifier for BGP-4
- [RFC 4273](https://tools.ietf.org/html/rfc4273) SNMP peer table monitoring (OID 1.3.6.1.2.1.15.3.1)（仅 IPv4）
- [RFC 6793](https://www.rfc-editor.org/rfc/rfc6793) 4 字节 ASN 支持与 Aggregator 属性。
- [RFC 4486](https://datatracker.ietf.org/doc/html/rfc4486) Subcodes for BGP Cease Notification Message
- [RFC 4659](https://datatracker.ietf.org/doc/html/rfc4659) MPLS VPN Extension for IPv6
- [RFC 8950](https://datatracker.ietf.org/doc/html/rfc8950) Advertising IPv4 Network Layer Reachability Information (NLRI) with an IPv6 Next Hop
- [RFC 6811](https://datatracker.ietf.org/doc/html/rfc6811) BGP Prefix Origin Validation
- [RFC 6996](https://www.rfc-editor.org/rfc/rfc6996.html) Autonomous System (AS) Reservation for Private Use
- [RFC 9234](https://datatracker.ietf.org/doc/rfc9234/) Route Leak Prevention and Detection Using Roles in UPDATE and OPEN Messages
- [RFC 5549](https://datatracker.ietf.org/doc/html/rfc5549) Advertising IPv4 Network Layer Reachability Information with an IPv6 Next Hop
