---
title: "常见问题"
description: "常见问题。"
tags:
  - 'routing'
  - 'ospf'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/ospf/faq
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 邻居卡在 Init 状态或频繁抖动 {#neighbors-stuck-in-init-state-or-frequently-flapping}

最常见的配置错误原因：

- [`router-id`](/docs/cli-reference/routing/ospf/instance#router-id) 不唯一。
- 防火墙正在阻止 OSPF 协议或 OSPF 使用的组播地址。
- 已配置 NAT，并且正在更改 OSPF 数据包。

最常见的网络问题：

- 邻居通过会阻止或修改组播数据包的 L2 设备连接。
- 邻居通过无法可靠传送组播数据包的无线链路连接。
这两种情况的解决方案是配置 NBMA。
