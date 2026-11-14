---
sidebar_key: "user-guides/routing-and-networking-protocols/mpls/vpls"
title: "VPLS"
sidebar_label: "VPLS"
description: "VPLS 页面介绍 MikroTik RouterOS 的虚拟专用局域网服务（VPLS）接口，详细说明其作为使用 LDP 或 MP-BGP 协议的透明以太网隧道的用途。它涵盖 VPLS 功能，如伪线信令、分片和基于 BGP 的自动发现，以及 MPLS 标签分发的前提条件和 i"
tags:
  - 'vpls'
  - 'ldp'
  - 'bgp'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/mpls/vpls
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

虚拟专用局域网服务 (VPLS) 接口可以像 [EoIP](../../../../virtual-private-networks/eoip.md) 接口一样被视为隧道接口，以在客户站点之间实现透明以太网段转发。

VPLS 隧道的协商可以通过 LDP 协议或 MP-BGP 完成——隧道两端交换它们将用于隧道的标签。

隧道中的数据转发通过在数据包上压入 2 个标签来实现：隧道标签和传输标签——确保流量送达隧道另一端的标签。

MikroTik RouterOS 实现以下 VPLS 功能：

- VPLS LDP 信令 (RFC 4762)。
- Cisco 风格的静态 VPLS 伪线 (RFC 4447 FEC 类型 0x80)。
- VPLS 伪线分片和重组 (RFC 4623)。
- 基于 VPLS MP-BGP 的自动发现和信令 (RFC 4761)。
- Cisco VPLS 基于 BGP 的自动发现 (draft-ietf-l2vpn-signaling-08)。
- 支持用于基于 BGP 的 VPLS 的多个导入/导出路由目标扩展团体（RFC 4761 和 draft-ietf-l2vpn-signaling-08 均支持）。

## VPLS 先决条件 {#vpls-prerequisites}

为了使 VPLS 能够传输 MPLS 数据包，骨干网上应已运行一种标签分发协议；它可以是 LDP、RSVP-TE 或静态绑定。

在继续之前，请熟悉 [LDP 所需的先决条件](../ldp.md#prerequisites-for-mpls) 和 RSVP-TE 的先决条件。

如果应将 BGP 用作 VPLS 发现和信令协议，则骨干网应运行 iBGP，最好使用路由反射器。

## 示例设置 {#example-setup}

假设我们已经有一个来自 [LDP 配置示例](../ldp.md#example-setup) 的可正常工作的 LDP 设置。

路由器 R1、R3 和 R4 连接到客户 A 站点，路由器 R1 和 R3 连接到客户 B 站点。客户需要站点之间的透明 L2 连接。
