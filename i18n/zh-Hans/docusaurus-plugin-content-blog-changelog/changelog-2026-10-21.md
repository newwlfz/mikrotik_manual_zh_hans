---
title: "文档更新 - 2026年10月21日"
date: 2026-10-21
slug: /changelog-2026-10-21
source: https://manual.mikrotik.com/changelog/changelog-2026-10-21
captured_at: '2026-11-04T06:09:04+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 10 月 21 日所做的文档变更摘要。

## 管理工具 {#management-tools}

- **[CMR](/docs/management-tools/cmr)**：新增了当前 CMR 版本中的控制台选项，每个选项都已对照 CMR 服务器的控制台进行核验：客户端与服务器一样接受 pairing-requirement=confirm，auto-labels 接受 ssid，port-labels 用一个端口的标签之间用 / 分隔、各端口之间用 , 分隔，并且 /cmr/device/export 和 /cmr/device/add 会打印并创建设备条目。[CMR-Client](/docs/management-tools/cmr/client) 页面和 [/cmr/client](/docs/cli-reference/cmr/client) CLI 参考文档描述了客户端侧的 confirm。
