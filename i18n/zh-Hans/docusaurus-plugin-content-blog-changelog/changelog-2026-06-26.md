---
title: "文档更新 - 2026年6月26日"
date: 2026-06-26
slug: /changelog-2026-06-26
source: https://manual.mikrotik.com/changelog/changelog-2026-06-26
captured_at: '2026-11-04T06:08:02+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 6 月 26 日文档变更摘要。

## 移动网络 {#mobile-networking}

- **[LTE/5G Interface](/docs/mobile-networking/lte-5g)**：新增 show-capabilities 命令文档，该命令用于显示调制解调器的功能，例如支持的频段、RAT 模式、APN 上限以及 passthrough 支持。
- **[LTE/5G Interface](/docs/mobile-networking/lte-5g)**：澄清了 network-mode 参数需要同时选中 lte 和 5g 才能使用 5G NSA；仅选择 5g 只会连接到 5G SA。
- **[LTE/5G Interface](/docs/mobile-networking/lte-5g)**：重写了监控部分，并更新了 /interface/lte/monitor 输出示例，展示小区级数据和调制解调器元数据。
