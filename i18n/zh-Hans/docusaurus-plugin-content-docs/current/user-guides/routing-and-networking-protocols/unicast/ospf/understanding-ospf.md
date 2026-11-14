---
sidebar_key: "user-guides/routing-and-networking-protocols/unicast/ospf/understanding-ospf"
sidebar_position: 1
title: "理解 OSPF"
sidebar_label: "理解 OSPF"
description: "OSPF 协议基础知识概述。"
tags:
  - 'routing'
  - 'ospf'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/unicast/ospf/understanding-ospf
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

OSPF 是一种内部网关协议（IGP），用于在同一自治系统（AS）中的路由器之间分发路由信息。

该协议基于链路状态技术，与 RIP 等距离矢量协议相比具有多项优势：

- 不存在跳数限制。
- 使用组播地址发送路由信息更新。
- 仅当网络拓扑发生变化时才发送更新。
- 通过将路由器划分为区域，以逻辑方式定义网络。
- 注入 AS 的外部路由会被传递并标记。

但是，OSPF 也有一些缺点：

- OSPF 对 CPU 和内存消耗较大，因为 SPF 算法必须维护多份路由信息副本。
- 实现起来比 RIP 更复杂。

## 术语 {#terminology}

请查看以下术语以了解 OSPF 的工作方式。你将在整个文档中遇到这些术语。

- **邻居**：运行 OSPF 且相邻接口分配到同一区域的已连接（邻接）路由器。除非手动配置邻居，否则 Hello 数据包会发现邻居。
- **邻接关系**：路由器与其对应 DR 和 BDR 之间的逻辑连接。除非形成邻接关系，否则路由器不会交换路由信息。
- **链路**：分配到任意给定网络的路由器接口或网络。
- **接口**：路由器上的物理接口。当将接口添加到 OSPF 后，它将成为用于构建链路数据库的链路。
- **LSA**：链路状态通告（Link State Advertisement），一种包含链路状态和路由信息的数据包，在 OSPF 邻居之间共享。
- **DR**：指定路由器（Designated Router），为最小化形成的邻接关系数量而选择的路由器。OSPF 在广播网络中使用此选项。
- **BDR**：备用指定路由器（Backup Designated Router），DR 的热备份。BDR 接收来自相邻路由器的所有路由更新，但不泛洪 LSA 更新。
- **[区域](./areas-and-virtual-links.md)**：用于建立分层网络的逻辑分组。
- **ABR**：区域边界路由器（Area Border Router），连接到多个区域的路由器。ABR 负责所连接区域之间的汇总和更新抑制。
- **ASBR**：自治系统边界路由器（Autonomous System Boundary Router），连接到外部网络（位于不同 AS 中）的路由器。当在该路由器上将来自其他协议的路由导入 OSPF 时，该路由器就成为 ASBR。
- **NBMA**：非广播多路访问网络（Non-broadcast multi-access networks）。这些网络允许多路访问，但不具备广播能力。必须在此类网络上手动配置 OSPF 邻居。
- **广播**：具备广播能力的网络。例如，以太网。
- **点对点**：不需要 DR 和 BDR 的网络类型。
- **Router-ID**：用于标识 OSPF 路由器的 IP 地址。如果未手动配置 OSPF [`router-id`](../../../../cli-reference/routing/ospf/instance.md#router-id)，则路由器会使用其已分配的某个 IP 地址作为 Router-ID。
- **链路状态**：两台路由器之间链路的状态。它定义了路由器接口与其相邻路由器之间的关系。
- **开销**：链路状态协议为每条链路分配的值。[`cost`](../../../../cli-reference/routing/ospf/interface-template.md#cost) 值取决于介质速度。每个路由器接口在其输出侧都有一个关联开销，称为接口输出开销。
- **自治系统**：一组使用共同路由协议交换路由信息的路由器。

## 支持的标准 {#supported-standards}

- RFC [2328](https://tools.ietf.org/html/rfc2328) - OSPF 版本 2
- RFC [3101](https://tools.ietf.org/html/rfc3101) - OSPF 非完全末梢区域（NSSA）选项
- RFC [3630](https://tools.ietf.org/html/rfc3630) - OSPF 版本 2 的流量工程（TE）扩展
- RFC [4577](https://tools.ietf.org/html/rfc4577) - OSPF 作为 BGP/MPLS IP 虚拟专用网络（VPN）的提供商/客户边缘协议
- RFC [5329](https://tools.ietf.org/html/rfc5329) - OSPF 版本 3 的流量工程扩展
- RFC [5340](https://tools.ietf.org/html/rfc5340) - 用于 IPv6 的 OSPF
- RFC [5643](https://tools.ietf.org/html/rfc5643) - OSPFv3 管理信息库
- RFC [6549](https://tools.ietf.org/html/rfc6549) - OSPFv2 多实例扩展
- RFC [6565](https://tools.ietf.org/html/rfc6565) - OSPFv3 作为提供商边缘到客户边缘（PE-CE）路由协议
- RFC [6845](https://tools.ietf.org/html/rfc6845) - OSPF 混合广播和点对多点接口类型
- RFC [7471](https://tools.ietf.org/html/rfc7471) - OSPF 流量工程（TE）度量扩展
