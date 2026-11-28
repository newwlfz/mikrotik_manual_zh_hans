---
title: "RIP"
description: "MikroTik RouterOS 支持 RIP version 2，用于在自治系统内交换路由信息，并根据跳数选择最佳路径。可在 `/routing/rip` 下进行配置。"
tags:
  - 'routing'
  - 'rip'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/rip
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MikroTik RouterOS 实现 RIP version 2（RFC 2453）。不支持 Version 1（RFC 1058）。

RIP 使自治系统中的路由器能够交换路由信息。它始终使用可用的最佳路径（跳数（即路由器数量）最少的路径）。可在 [`/routing/rip`](/docs/cli-reference/routing/rip/instance) 下进行配置。
