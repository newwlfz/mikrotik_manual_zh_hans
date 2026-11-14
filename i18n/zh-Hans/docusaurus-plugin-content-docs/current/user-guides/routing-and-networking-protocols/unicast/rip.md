---
sidebar_key: "user-guides/routing-and-networking-protocols/unicast/rip"
sidebar_position: 6
title: "RIP"
sidebar_label: "RIP"
description: "MikroTik RouterOS 支持 RIP 版本 2，用于在自治系统内交换路由信息，并基于跳数选择最优路径。可在 `/routing/rip` 下进行配置。"
tags:
  - 'routing'
  - 'rip'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/unicast/rip
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MikroTik RouterOS 实现了 RIP 版本 2（RFC 2453）。不支持版本 1（RFC 1058）。

RIP 使自治系统中的路由器能够交换路由信息。它始终使用可用的最佳路径（即跳数（也就是路由器数量）最少的路径）。配置位于 [`/routing/rip`](../../../cli-reference/routing/rip/instance.md) 下。
