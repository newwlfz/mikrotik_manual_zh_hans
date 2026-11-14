---
title: "文档更新 - 2026年9月22日"
date: 2026-09-22
slug: /changelog-2026-09-22
source: https://manual.mikrotik.com/changelog/changelog-2026-09-22
captured_at: '2026-11-04T06:08:49+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026年9月22日的文档变更摘要。

## 容器 {#containers}

- **[Apps](/docs/containers/apps#yaml-field-reference)**：新增了用于编写自定义应用的 YAML 字段参考。其中涵盖应用级和服务级字段、健康检查、运行时占位符、卷、密钥、配置和网络，每一项都附有示例。此外还修正了拼写错误和示例格式。
- **[Apps](/docs/containers/apps#custom-app-store)**：新增了关于自定义应用商店的章节：在路由器可访问的服务器上托管一份应用定义的 YAML 列表，并给出了包含两个应用的示例。

## 网桥与交换 {#bridging--switching}

- **[网桥与交换](/docs/bridging-and-switching#create-edge-ports-and-enable-bpdu-guard)**：将边缘端口和 BPDU Guard 的示例合并为一个。新示例展示了端口收到 BPDU 时的日志条目和非活动端口标志，以及如何重新启用该端口。删除了使用交换机 ACL 规则丢弃 BPDU 的章节。
