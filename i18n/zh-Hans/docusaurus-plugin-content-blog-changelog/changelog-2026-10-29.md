---
title: "文档更新 - 2026年10月29日"
date: 2026-10-29T00:00:00.000Z
slug: /changelog-2026-10-29
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

# 文档更新 - 2026年10月29日 {#documentation-updates---october-29-2026}

October 29, 2026

2026年10月29日所做文档变更的摘要。

## 桥接与交换[​](#bridging--switching "Direct link to Bridging & Switching") {#bridging--switching}

-   **[其他交换芯片功能](/docs/bridging-and-switching/switch-chip-features#port-isolation)**: 端口隔离 `forwarding-override` 可以引用接口列表。其端口会被添加到显式列出的端口，结果集合显示在只读的 `current-forwarding-override` 中，并且接口列表不能排除端口。该 [`/interface/ethernet/switch/port-isolation`](/docs/cli-reference/interface/ethernet/switch/port-isolation) 参考文档描述了其所有参数。

## 高可用性解决方案[​](#high-availability-solutions "Direct link to High Availability Solutions") {#high-availability-solutions}

-   **[多机箱链路聚合组](/docs/high-availability-solutions/multi-chassis-link-aggregation-group)**: 必须在整个交换机上禁用 L3 硬件卸载（`/interface/ethernet/switch/set 0 l3-hw-offloading=no`）；仅在各个交换机端口上禁用它是不够的。

**Tags:**

-   [文档变更日志](/changelog/tags/changelog "文档更新的每日摘要")
