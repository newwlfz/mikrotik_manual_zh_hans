---
title: "文档更新 - 2026 年 7 月 8 日"
date: 2026-07-08
slug: /changelog-2026-07-08
source: https://manual.mikrotik.com/changelog/changelog-2026-07-08
captured_at: '2026-11-04T06:08:09+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 7 月 8 日文档变更摘要。

## 管理工具 {#management-tools}

- **[Console](/docs/management-tools/console)**：将单独的 "Command Line Interface" 页面合并到 Console 页面，使所有 CLI/console 相关内容集中在一处，并相应更新了 Scripting、Bluetooth 和 MQTT 页面中的交叉引用，同时修复了 Quick Typing 部分的一个小格式问题。

## 开发者指南 {#developer-guides}

- **[Scripting](/docs/developer-guides/scripting)**：为 print 命令记录了 order-by 参数，该参数最多可按三个属性对输出进行排序（在属性前加 - 表示降序），并附有示例。

## 高可用性解决方案 {#high-availability-solutions}

- **[VRRP](/docs/high-availability-solutions/vrrp)**：新增了 v3-checksum-as-v2 设置，用于控制 VRRPv3 IPv4 校验和是否包含 IPv4 伪首部。默认值（no）与 FRR 等基于 Linux 的实现一致；将其设为 yes 可兼容 Cisco 及其他厂商。该设置仅适用于 VRRPv3 IPv4，且 Virtual Router 中的所有路由器必须使用相同的值，以避免 "bad checksum" 错误。
