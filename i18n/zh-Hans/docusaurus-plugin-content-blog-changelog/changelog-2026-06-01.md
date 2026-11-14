---
title: "文档更新 - 2026年6月1日"
date: 2026-06-01
slug: /changelog-2026-06-01
source: https://manual.mikrotik.com/changelog/changelog-2026-06-01
captured_at: '2026-11-04T06:07:49+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 6 月 1 日所做的文档变更摘要。

## 网络管理 {#network-management}

- **[反向代理](/docs/network-management/proxy/reverse-proxy)**：新增 `vrf` 参数，用于选择反向代理记录所使用的虚拟路由转发实例。更新了 `ip-address` 属性，说明现在同时支持 IPv4 和 IPv6 服务器地址（此前仅支持 IPv4）。
- 将侧边栏分类 **IP Services** 重命名为 **Network Services**。

## 桥接与交换 {#bridging--switching}

- **[L3 硬件卸载](/docs/bridging-and-switching/l3-hardware-offloading)**：从 Marvell 交换芯片能力表中删除了重复的 **98DX8525** 行。

## CLI 参考 {#cli-reference}

- **[CLI 参考](/docs/cli-reference)**：在起始页新增了参数类型参考。其中记录了该参考使用的每一种参数类型，包括 address、enum、num、time、iface_enum 和 ipPrefix，以便你理解每个命令属性所显示的类型。
- **[CLI 参考](/docs/cli-reference)**：修复了该章节在文件夹结构调整后出现的失效交叉引用链接，包括 BGP 页面上的桥接链接。
