---
title: "文档更新 - 2026年6月18日"
date: 2026-06-18
slug: /changelog-2026-06-18
source: https://manual.mikrotik.com/changelog/changelog-2026-06-18
captured_at: '2026-11-04T06:08:01+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 6 月 18 日文档变更摘要。

## 入门 {#getting-started}

- **[首次配置](/docs/getting-started/first-time-configuration)**：对指南进行了大幅精简。整合了 WAN/互联网部分，并加入 CLI 和 WinBox 的标签页示例；明确了运行默认配置的用户在 NAT 与桥接行为上的区别；合并了验证步骤；修正了若干命令错误。无线部分精简至基础内容，并提供了指向无线部分的链接；删除了重复的 CLI 部分；修复了错误的步骤编号以及第 4 步的格式问题（现在已使用正确的标题）。入门侧边栏也已重新排序，以符合新用户流程。
- **[手动网络设置](/docs/getting-started/manual-network-setup)**：新页面。手动（no-default-config）设置流程已从首次配置指南中拆分出来，放入其专属页面。
- **[保护您的路由器](/docs/getting-started/securing-your-router)**：将去重后的安全和防火墙内容从首次配置指南移出，放入此专属页面。

## 桥接与交换 {#bridging--switching}

- **[SwOS 故障排除](/docs/bridging-and-switching/swos/troubleshooting)**：通过移除冗余的“适用于”和“另请参阅”部分以及失效的外部 Confluence 交叉引用，并简化固件下载链接，清理了该页面。[CSS106](/docs/bridging-and-switching/swos/css106) 和 [CSS610](/docs/bridging-and-switching/swos/css610) 页面已更新为链接到内部 Neighbor Discovery 文档，而不是旧的外部帮助站点。
