---
title: "文档更新 - 2026 年 7 月 9 日"
date: 2026-07-09
slug: /changelog-2026-07-09
source: https://manual.mikrotik.com/changelog/changelog-2026-07-09
captured_at: '2026-11-04T06:08:11+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 7 月 9 日文档变更摘要。

## 桥接与交换 {#bridging--switching}

- **[Bridge IGMP/MLD 监听](/docs/bridging-and-switching/user-guides/bridge-igmp-mld-snooping)**：新增 querier-uses-bridge-address 桥接设置（默认 yes），该设置使桥接 IGMP 查询器使用桥接口自身的 IPv4 地址作为查询报文的源地址，而不是 0.0.0.0。某些组播客户端会拒绝来自 0.0.0.0 的查询，当监听条目超时时，这可能会中断组播流。它仅在启用 igmp-snooping 和 multicast-querier 且桥接具有 IPv4 地址时适用于 IPv4 (IGMP)；MLD 查询始终使用桥接的 IPv6 链路本地地址。
