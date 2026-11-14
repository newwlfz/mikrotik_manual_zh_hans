---
title: "文档更新 - 2026年5月27日"
date: 2026-05-27
slug: /changelog-2026-05-27
source: https://manual.mikrotik.com/changelog/changelog-2026-05-27
captured_at: '2026-11-04T06:07:46+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026年5月27日文档变更摘要。

## 扩展功能 {#extended-features}

- **[Container Apps](/docs/containers/apps)**：新增 network-outgoing-access 参数，用于控制容器应用是否具有出站网络访问权限。当该参数设置为 no 时，系统会自动创建一条 mangle drop 规则，以阻止该特定容器的出站流量。

## 入门 {#getting-started}

- **[Backup](/docs/getting-started/configuration-management/backup)**：澄清了引言部分的描述——备份功能会将路由器配置保存到二进制文件中（此前描述为“克隆”），使措辞更加准确。
