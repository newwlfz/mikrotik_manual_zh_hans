---
title: "VPLS"
description: "“VPLS”页面介绍 MikroTik RouterOS 的 Virtual Private LAN Service（VPLS）接口，详细说明其作为使用 LDP 或 MP-BGP 协议的透明以太网隧道的用法。该页面涵盖 VPLS 功能，例如伪线信令、分片和基于 BGP 的自动发现，以及 MPLS 标签分发和 i 的前提条件。"
tags:
  - 'vpls'
  - 'ldp'
  - 'bgp'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/mpls/vpls
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

虚拟专用局域网服务（VPLS）接口可视为一种隧道接口，类似于 [EoIP](/docs/virtual-private-networks/eoip) 接口，用于在客户站点之间实现透明的以太网段转发。

VPLS 隧道的协商可通过 LDP 协议或 MP-BGP 完成：隧道两端会交换将用于该隧道的标签。

隧道中的数据转发通过为数据包添加 2 个标签实现：隧道标签和传输标签，其中传输标签用于确保流量送达隧道的另一端。

MikroTik RouterOS 实现以下 VPLS 功能：

- VPLS LDP 信令（RFC 4762）。
- Cisco 风格的静态 VPLS 伪线（RFC 4447 FEC type 0x80）。
- VPLS 伪线分片和重组（RFC 4623）。
- 基于 VPLS MP-BGP 的自动发现和信令（RFC 4761）。
- Cisco 基于 VPLS BGP 的自动发现（draft-ietf-l2vpn-signaling-08）。
- 支持基于 BGP 的 VPLS 使用多个 import/export route-target 扩展团体属性（RFC 4761 和 draft-ietf-l2vpn-signaling-08）。

## VPLS 前提条件 {#vpls-prerequisites}

要使 VPLS 能够传输 MPLS 数据包，骨干网上应已运行其中一种标签分发协议；可以是 LDP、RSVP-TE 或静态绑定。

在继续之前，请先熟悉 [LDP 所需的前提条件](/docs/user-guides/routing-and-networking-protocols/mpls/ldp#prerequisites-for-mpls) 和 RSVP-TE 的前提条件。

如果将 BGP 用作 VPLS 发现 and 信令协议，骨干网应运行 iBGP，最好使用 route reflector。

## 示例设置 {#example-setup}

假设我们已经有一个可正常工作的 LDP 设置，来自 [LDP 配置示例](/docs/user-guides/routing-and-networking-protocols/mpls/ldp#example-setup)。

路由器 R1、R3 和 R4 连接到 Customer A 站点，路由器 R1 和 R3 连接到 Customer B 站点。客户要求站点之间具备透明的 L2 连接。
