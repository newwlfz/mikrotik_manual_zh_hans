---
title: "文档更新 - 2026年8月24日"
date: 2026-08-24
slug: /changelog-2026-08-24
source: https://manual.mikrotik.com/changelog/changelog-2026-08-24
captured_at: '2026-11-04T06:08:36+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 8 月 24 日文档变更摘要。

## 入门 {#getting-started}

- **[Upgrade](/docs/getting-started/installation-and-upgrade/upgrade)**：将独立的 Upgrade Server 页面并入本页面的 Standard Upgrade 部分，并将 system/package/update CLI 参数移入 CLI 参考。

## 硬件 {#hardware}

- **[RouterBOARD](/docs/hardware/routerboard)**：将 RouterBOARD 按钮和设置参数移入 CLI 参考，并改写了相关文字（同时相应更新了 [FlashFig](/docs/management-tools/flashfig)）。

## CLI 参考 {#cli-reference}

- **[CLI 参考](/docs/cli-reference)**：删除了若干错误生成的存根页面（例如 Bridge MSRP 子菜单，它们在此处并不适用），并停止显示空菜单目录，修复了由此产生的失效 switch 规则交叉引用。

## 用户指南 {#user-guides}

- **[Route Distinguisher 与 Route Target](/docs/user-guides/routing-and-networking-protocols/route-distinguisher-and-route-target)**：更正了 Route Distinguisher 大小的描述（64-bit → 8-byte），并修复了一个格式错误的表格。
