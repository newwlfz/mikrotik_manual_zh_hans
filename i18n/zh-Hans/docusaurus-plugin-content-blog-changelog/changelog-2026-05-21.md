---
title: "文档更新 - 2026年5月21日"
date: 2026-05-21
slug: /changelog-2026-05-21
source: https://manual.mikrotik.com/changelog/changelog-2026-05-21
captured_at: '2026-11-04T06:07:44+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 5 月 21 日文档变更摘要。

## 桥接与交换 {#bridging--switching}

- **[桥接与交换](/docs/bridging-and-switching)**：恢复了整个 Bridge 主题中的插图 —— 交换机芯片特性、VLAN、QoS、CRS1xx/2xx 示例、二层错误配置、生成树以及无线 VLAN 干道页面上的示意图现在均可正常显示。
- **[交换机芯片特性](/docs/bridging-and-switching/switch-chip-features)**：修复了此前无法正常显示的特性对比表脚注。关于 RouterOS v7 中的带宽限制、2048 条目主机表上的共享 VLAN 学习（Shared VLAN Learning）以及 Switch 菜单中受限的 VLAN 支持的注释，现在会显示在表格下方。若干内联的 "Caution"/"Important" 段落已转换为规范的提示块。
- **[服务质量](/docs/bridging-and-switching/quality-of-service)**：修复了交换机芯片 QoS 表格中损坏的脚注标记，涉及 max-fill 统计、当前值报告以及 98CX8410 上不可用的统计信息。
- **[Marvell Prestera 交换机芯片特性](/docs/bridging-and-switching/marvell-prestera-switch-chip-features)**：修正了若干格式错误的提示块，使 L3 硬件卸载说明、10Gbps 端口上 egress-rate/storm-rate 的硬件限制以及交换机 ACL 修改警告能够正确显示。同时还改写了 VLAN 间路由和 DHCP 服务器的相关说明。

## 容器 {#containers}

- **[容器](/docs/containers)**：扩充了 stop-signal 的说明，解释不同的 Linux 信号可实现优雅关闭、立即终止或应用特定的操作，并整理了 memory-max 条目。
