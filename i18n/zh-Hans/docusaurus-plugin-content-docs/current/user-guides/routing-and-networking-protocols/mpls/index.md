---
sidebar_key: "user-guides/routing-and-networking-protocols/mpls"
title: "MPLS"
sidebar_label: "MPLS"
description: "MPLS 是一种使用标签而非 IP 报头分析来实现更快数据包转发的路由技术，RouterOS 支持 MPLS 交换、LDP/RSVP-TE 协议、VPLS 和 MP-BGP VPN，但不包括某些 LDP/TE 功能。"
tags:
  - 'mpls'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/mpls
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MPLS 代表多协议标签交换（MultiProtocol Label Switching）。MPLS 不采用 IP 路由，而是根据附加到数据包上的标签，而非 IP 报头中的字段（例如目标地址）和路由表，来决定数据包转发（出接口和下一跳路由器）。这种方法加快了转发过程，因为下一跳查找比路由查找（查找最长匹配前缀）更简单。

转发过程的效率是 MPLS 的主要优势。但是请记住，MPLS 转发会禁用对网络层（例如 IP）报头的处理。因此，无法对 MPLS 转发的数据包应用诸如 NAT 和过滤等基于网络层的操作。请在 MPLS 云的入口或出口处应用任何基于网络层的操作，其中入口是首选方法。这样，你打算丢弃的流量就不会经过 MPLS 骨干网。

MPLS 通过使用 LDP 协议为活动路由分发标签来运作，带标签的数据包会沿与不带标签的数据包相同的路径传输。当路由器沿某条路由转发不带标签的数据包，并且已从该路由的下一跳收到标签时，它会为该数据包压入标签并将其发送到下一跳，在那里由 MPLS 沿路径进一步交换。当路由器收到一个带有其已分配给特定路由的标签的数据包时，它会将该数据包标签替换为从该路由的下一跳收到的标签，并将数据包发送到下一跳。标签交换路径可确保将数据送达 MPLS 云出口点。MPLS 应用基于标签交换路径这一概念。

建立标签交换路径的另一种方式是使用 RSVP-TE 协议的流量工程隧道（TE 隧道）。流量工程隧道允许显式路由的 LSP 和基于约束的路径选择（其中约束是接口属性和可用带宽）。

由于 MPLS 引入了复杂性和新协议，并为路由网络和桥接网络增加了不同的概念，因此在生产网络中实施 MPLS 之前，你应深入理解 MPLS 概念。一些建议阅读材料：

- 多协议标签交换 [http://en.wikipedia.org/wiki/Multiprotocol_Label_Switching](http://en.wikipedia.org/wiki/Multiprotocol_Label_Switching)
- RFC3031 多协议标签交换架构 [http://www.ietf.org/rfc/rfc3031.txt](http://www.ietf.org/rfc/rfc3031.txt)
- 《MPLS 基础》，Luc De Ghein 著 [http://www.amazon.com/MPLS-Fundamentals-Luc-Ghein/dp/1587051974](http://www.amazon.com/MPLS-Fundamentals-Luc-Ghein/dp/1587051974)

:::info
此功能在 SMIPS 设备上不受支持（hAP lite、hAP lite TC 和 hAP mini）。
:::

## 支持的功能 {#supported-features}

RouterOS 支持以下与 MPLS 相关的功能：

- 支持倒数第二跳弹出的 MPLS 交换。
- IPv4 和 IPv6 的静态本地标签绑定。
- IPv4 和 IPv6 的静态远程标签绑定。
- 适用于 IPv4 和 IPv6 的 Label Distribution Protocol（[RFC 3036](https://tools.ietf.org/html/rfc3036)、[RFC 5036](https://tools.ietf.org/html/rfc5036) 和 [RFC 7552](https://tools.ietf.org/html/rfc7552)）：
  - 下游非请求标签通告。
  - 独立标签分发控制。
  - 宽松标签保留。
  - 定向会话建立。
  - 可选环路检测。
  - 支持 ECMP。
- Virtual Private LAN Service (VPLS)：
  - VPLS LDP 信令（[RFC 4762](https://tools.ietf.org/html/rfc4762)）。
  - Cisco 风格的静态 VPLS 伪线（[RFC 4447](https://tools.ietf.org/html/rfc4447) FEC 类型 0x80）。
  - VPLS 伪线分片和重组（[RFC 4623](https://tools.ietf.org/html/rfc4623)）。
  - 基于 VPLS MP-BGP 的自动发现和信令（[RFC 4761](https://tools.ietf.org/html/rfc4761)）。
  - Cisco VPLS 基于 BGP 的自动发现（[draft-ietf-l2vpn-signaling-08](https://tools.ietf.org/html/draft-ietf-l2vpn-signaling-08)）。
  - 支持基于 BGP 的 VPLS 的多个导入/导出 route-target 扩展团体（同时支持 [RFC 4761](https://tools.ietf.org/html/rfc4761) 和 [draft-ietf-l2vpn-signaling-08](https://tools.ietf.org/html/draft-ietf-l2vpn-signaling-08)）。
- RSVP-TE 隧道：
  - 隧道头端。
  - 显式路径。
  - 用于 TE 隧道的 OSPF 扩展。
  - CSPF 路径选择。
  - 在 TE 隧道上转发 VPLS 和 MPLS IP VPN 流量。
  - 入口 TE 隧道速率限制和自动预留带宽调整。有关更多信息，请参阅 [流量工程](./traffic-eng.md)。
  - 所有隧道带宽设置均以比特/秒为单位指定和显示。
- 基于 MP-BGP 的 MPLS IP VPN。
- 基于 MP-BGP 的 MPLS VPN 的按前缀和按 VRF 标签分发策略。
- 用于 MPLS TE 的 OSPF 扩展。
- 支持将 OSPF 作为 CE-PE 协议。
- 针对指定 VRF 的 ping 和 traceroute。
- 控制 MPLS 中网络层 TTL 的传播。
- 将 RIP 作为 CE-PE 协议。
- 按 VRF 的 BGP 实例重分发设置。

## RouterOS 尚不具备的 MPLS 功能 {#mpls-features-that-routeros-does-not-have-yet}

- LDP 功能：
  - 下游按需标签通告。
  - 有序标签分发控制。
  - 保守标签保留。
- TE 功能：
  - 快速重路由。
  - 链路/节点保护。
- 支持将 BGP 作为标签分发协议。

<DocCardList />
