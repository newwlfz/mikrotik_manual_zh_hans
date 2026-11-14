---
title: "文档更新 - 2026 年 5 月 20 日"
date: 2026-05-20
slug: /changelog-2026-05-20
source: https://manual.mikrotik.com/changelog/changelog-2026-05-20
captured_at: '2026-11-04T06:07:44+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026年5月20日文档变更摘要。

## 入门 {#getting-started}

- **[RouterOS 授权](/docs/getting-started/routeros-licensing)**：重组了授权文档。x86 授权内容已合并到单个 [x86 授权](/docs/getting-started/routeros-licensing/x86) 页面中，而不是单独的子页面，并且随附的截图已重新整理。

## 容器 {#containers}

- **[容器](/docs/containers)**：记录了使用 devices=serial0:"" 将串行终端透传到容器，包括一条说明：必须先释放 /system/console 下的 RouterOS 串行控制台。

## 无线 {#wireless}

- **[Nv2](/docs/wireless/abgn/nv2)**：通过移除冗余的子标题，将协议概述重组为连续的行文，并整理了同步和配置示例部分。
- **[频谱扫描](/docs/wireless/abgn/spectral-scan)**：更正了范围选项列表的格式，并将不受支持的芯片组提示框从 danger 降级为 warning 提示框。
