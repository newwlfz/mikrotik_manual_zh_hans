---
sidebar_key: "routing-and-networking-protocols/unicast/bgp/nexthop-selection"
sidebar_position: 3
title: "下一跳选择"
sidebar_label: "下一跳选择"
description: "输入和输出时的 BGP 下一跳选择过程。"
tags:
  - 'routing'
  - 'bgp'
slug: /user-guides/routing-and-networking-protocols/unicast/bgp/nexthop-selection
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/bgp/nexthop-selection
captured_at: '2026-11-04T11:34:07+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 不会在 BGP 输入上执行严格的下一跳检查；而是依赖用户创建的[过滤规则](../../../../cli-reference/routing/filter/rule.md)。

对输入执行的操作：

- 从 BGP **NEXT_HOP** 属性读取下一跳。
- 对于多协议 NLRI，检查下一跳是否具有有效长度：
  - 如果长度无效，则发送 Update 错误通知并退出。
  - 存储下一跳值。
  - 如果更新消息中出现链路本地下一跳：
    - 确定连接接口。
    - 存储链路本地地址和接口。
- 应用来自输入过滤规则的下一跳动作。
- 将路由发送到主 calc 进程，在该进程中确定下一跳可达性。

## BGP 输出 {#bgp-output}

- 如果 [`nexthop-choice`](../../../../cli-reference/routing/bgp/connection.md#nexthop-choice) 不是 `force-self`，或者路由 AFI 不是 IPv4 或 IPv6：
  - 如果对端是路由反射器，或者 [`nexthop-choice`](../../../../cli-reference/routing/bgp/connection.md#nexthop-choice) 是 `propagate`，或者对端不是 eBGP：
    - 检查下一跳 AFI，并尝试设置出站链路本地下一跳。
    - 检查下一跳 AFI，并尝试设置出站下一跳。
  - 如果出站下一跳仍未设置，且 BGP 对端不是 multihop：
    - 遍历可用的直连下一跳，并尝试设置出站下一跳和 LL 下一跳。
  - 如果出站下一跳等于远端 [`router-id`](../../../../cli-reference/routing/bgp/instance.md#router-id)，则取消设置出站下一跳。
  - 如果出站下一跳等于远端对端地址，则取消设置出站下一跳。
  - 如果对端地址的接口不等于 LL 下一跳的接口，则取消设置出站 LL 下一跳。
  - 如果出站 LL 下一跳等于远端对端地址，则取消设置出站 LL 下一跳。
- 如果出站下一跳仍未设置，则检查 AFI 并设置对端的 local-address。
- 如果出站下一跳仍未设置，且路由 AFI 是 IPv6 或 L2VPN：
  - 如果对端的本地地址是 IPv4，则将出站下一跳设置为 IPv6 映射的对端本地地址。
