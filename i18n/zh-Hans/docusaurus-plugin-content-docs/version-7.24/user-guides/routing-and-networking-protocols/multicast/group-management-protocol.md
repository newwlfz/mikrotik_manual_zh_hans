---
sidebar_key: "routing-and-networking-protocols/multicast/group-management-protocol"
sidebar_position: 1
title: "组管理协议"
sidebar_label: "组管理协议"
description: "组管理协议使接口能够在没有专用客户端的情况下接收组播流，支持 IGMP 和 MLD 协议。它允许通过发送成员报告和响应查询来测试组播路由，并在禁用时自动清理。"
tags:
  - 'igmp'
  - 'mld'
  - 'multicast'
slug: /user-guides/routing-and-networking-protocols/multicast/group-management-protocol
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/multicast/group-management-protocol
captured_at: '2026-11-04T11:33:57+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Group Management Protocol 允许任意接口成为组播流的接收者。它允许在不使用专用 IGMP 或 MLD 客户端的情况下测试组播路由和交换配置。该选项自 RouterOS v7.4 起可用，支持 IGMP v1、v2、v3 和 MLD v1、v2 协议。

默认情况下，接口使用 IGMP v3 和 MLD v2。如果收到 IGMP v1、v2 或 MLD v1 查询，接口将回退到相应版本。在接口上创建 Group Management Protocol 后，它会发送未经请求的成员报告（加入）数据包，并响应查询消息。如果配置被删除或禁用，接口将发送离开消息。

## 示例 {#examples}

---

此示例展示如何在接口上配置一个简单的组播监听器。

首先，在接口上添加 IP 地址：

```ros
/ip/address
add address=192.168.10.10/24 interface=ether1 network=192.168.10.0
```

然后在同一接口上配置 Group Management Protocol：

```ros
/routing/gmp
add groups=229.1.1.1 interfaces=ether1
```

现在可以检查你的组播网络，查看路由器或交换机是否已创建适当的组播转发条目，以及接口上是否正在接收组播数据（参见接口统计信息，或使用 [数据包嗅探器](../../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md) 和 [Torch](../../../diagnostics-monitoring-and-troubleshooting/torch.md)）。
