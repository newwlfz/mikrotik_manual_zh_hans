---
sidebar_key: "routing-and-networking-protocols/unicast/ospf/faq"
sidebar_position: 5
title: "常见问题"
sidebar_label: "常见问题"
description: "常见问题。"
tags:
  - 'routing'
  - 'ospf'
slug: /user-guides/routing-and-networking-protocols/unicast/ospf/faq
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/ospf/faq
captured_at: '2026-11-04T11:34:12+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 邻居卡在 Init 状态或频繁振荡 {#neighbors-stuck-in-init-state-or-frequently-flapping}

最常见的配置错误原因：

- [`router-id`](../../../../cli-reference/routing/ospf/instance.md#router-id) 不唯一。
- 防火墙阻止了 OSPF 协议或 OSPF 使用的组播地址。
- 配置了 NAT，并且 NAT 正在修改 OSPF 数据包。

最常见的网络问题：

- 邻居通过会阻止或修改组播数据包的 L2 设备连接。
- 邻居通过无线链路连接，而无线链路无法可靠地传递组播数据包。
这两种情况的解决方案都是配置 NBMA。
