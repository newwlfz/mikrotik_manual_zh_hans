---
title: "理解 OSPF"
description: "OSPF 协议基础概述。"
tags:
  - 'routing'
  - 'ospf'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/ospf/understanding-ospf
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "user-guides/routing-and-networking-protocols/unicast/ospf"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

OSPF 是一种内部网关协议（IGP），用于在同一自治系统（AS）中的路由器之间分发路由信息。

该协议基于链路状态技术，与 RIP 等距离矢量协议相比具有多个优势：

- 没有跳数限制。
- 通过组播地址发送路由信息更新。
- 仅在拓扑发生变化时发送更新。
- 通过将路由器划分到区域，在逻辑上定义网络。
- 注入 AS 的外部路由会被传输并打上标记。

但是，OSPF 也有一些缺点：

- OSPF 会占用大量 CPU 和内存，因为 SPF 算法必须维护多份路由信息副本。
- 与 RIP 相比，OSPF 的实现更复杂。

## Terminology

请了解以下术语，以理解 OSPF 的工作方式。文档中会反复出现这些术语。

- **Neighbor**：相邻路由器，运行 OSPF，并且相邻接口被分配到同一区域。除非手动配置邻居，否则 Hello 数据包会发现邻居。
- **Adjacency**：路由器与其对应 DR 和 BDR 之间的逻辑连接。只有形成邻接关系后，路由器才会交换路由信息。
- **Link**：分配到任意给定网络的网络或路由器接口。
- **Interface**：路由器上的物理接口。将接口添加到 OSPF 后，它会成为用于构建链路数据库的链路。
- **LSA**：Link State Advertisement，一种包含链路状态和路由信息的数据包，在 OSPF 邻居之间共享。
- **DR**：Designated Router，为减少形成的邻接关系数量而选举出的路由器。OSPF 在广播网络中使用该选项。
- **BDR**：Backup Designated Router，DR 的热备份。BDR 接收来自相邻路由器的所有路由更新，但不会泛洪 LSA 更新。
- **[Area](/docs/user-guides/routing-and-networking-protocols/unicast/ospf/areas-and-virtual-links)**：用于建立分层网络的逻辑分组。
- **ABR**：Area Border Router，连接到多个区域的路由器。ABR 负责在相连区域之间进行路由汇总和更新抑制。
- **ASBR**：Autonomous System Boundary Router，连接到外部网络（位于不同 AS 中）的路由器。当在该路由器上将其他协议的路由导入 OSPF 时，该路由器会成为 ASBR。
- **NBMA**：非广播多路访问网络。此类网络允许多路访问，但不具备广播能力。必须在此类网络上手动配置 OSPF 邻居。
- **Broadcast**：具备广播能力的网络。例如，以太网。
- **Point-to-point**：不需要 DR 和 BDR 的网络类型。
- **Router-ID**：用于标识 OSPF 路由器的 IP 地址。如果未手动配置 OSPF [`router-id`](/docs/cli-reference/routing/ospf/instance#router-id)，路由器会使用其已分配的某个 IP 地址作为 Router-ID。
- **Link State**：两台路由器之间链路的状态。它定义了路由器接口与其相邻路由器之间的关系。
- **Cost**：由链路状态协议为每条链路分配的值。[`cost`](/docs/cli-reference/routing/ospf/interface-template#cost) 值取决于介质速度。每个路由器接口在其输出侧都有一个关联的 cost，称为接口输出 cost。
- **Autonomous System**：使用公共路由协议交换路由信息的一组路由器。

## 支持的标准 {#supported-standards}

- RFC [2328](https://tools.ietf.org/html/rfc2328) - OSPF Version 2
- RFC [3101](https://tools.ietf.org/html/rfc3101) - OSPF 非完全末梢区域（NSSA）选项
- RFC [3630](https://tools.ietf.org/html/rfc3630) - OSPF Version 2 的流量工程（TE）扩展
- RFC [4577](https://tools.ietf.org/html/rfc4577) - OSPF 作为 BGP/MPLS IP 虚拟专用网络（VPN）的提供商/客户边缘协议
- RFC [5329](https://tools.ietf.org/html/rfc5329) - OSPF Version 3 的流量工程扩展
- RFC [5340](https://tools.ietf.org/html/rfc5340) - 用于 IPv6 的 OSPF
- RFC [5643](https://tools.ietf.org/html/rfc5643) - OSPFv3 管理信息库
- RFC [6549](https://tools.ietf.org/html/rfc6549) - OSPFv2 多实例扩展
- RFC [6565](https://tools.ietf.org/html/rfc6565) - OSPFv3 作为提供商边缘到客户边缘（PE-CE）路由协议
- RFC [6845](https://tools.ietf.org/html/rfc6845) - OSPF 混合广播和点到多点接口类型
- RFC [7471](https://tools.ietf.org/html/rfc7471) - OSPF 流量工程（TE）度量扩展
