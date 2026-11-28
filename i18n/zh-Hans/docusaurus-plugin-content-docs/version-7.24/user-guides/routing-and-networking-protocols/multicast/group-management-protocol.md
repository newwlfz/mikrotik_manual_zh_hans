---
title: "组管理协议"
description: "组管理协议使接口无需专用客户端即可接收组播流，支持 IGMP 和 MLD 协议。它可通过发送成员报告并响应查询来测试组播路由，禁用时会自动清理。"
tags:
  - 'igmp'
  - 'mld'
  - 'multicast'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/multicast/group-management-protocol
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "user-guides/routing-and-networking-protocols/multicast"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

组管理协议允许任意接口成为组播流的接收者。它可用于在不使用专用 IGMP 或 MLD 客户端的情况下测试组播路由和交换配置。该选项自 RouterOS v7.4 起可用，支持 IGMP v1、v2、v3 和 MLD v1、v2 协议。

接口默认使用 IGMP v3 和 MLD v2。如果收到 IGMP v1、v2 或 MLD v1 查询，接口将回退到相应版本。在接口上创建组管理协议后，它会发送主动成员报告（join）数据包并响应查询消息。如果配置被删除或禁用，接口将发送离开消息。

## 示例 {#examples}

---

此示例说明如何在接口上配置简单的组播侦听器。

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

现在可以检查组播网络，确认路由器或交换机是否已创建相应的组播转发表项，以及接口是否正在接收组播数据（查看接口统计信息，或使用 [Packet Sniffer](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer) 和 [Torch](/docs/diagnostics-monitoring-and-troubleshooting/torch)）。
