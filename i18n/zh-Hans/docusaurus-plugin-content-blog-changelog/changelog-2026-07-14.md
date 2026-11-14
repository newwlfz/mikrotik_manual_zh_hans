---
title: "文档更新 - 2026年7月14日"
date: 2026-07-14
slug: /changelog-2026-07-14
source: https://manual.mikrotik.com/changelog/changelog-2026-07-14
captured_at: '2026-11-04T06:08:13+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 7 月 14 日文档变更摘要。

## 桥接与交换 {#bridging--switching}

- **[L3 硬件卸载](/docs/bridging-and-switching/l3-hardware-offloading)**：记录了硬件卸载的 VRF 支持。新增的 “Hardware-Offloaded VRF” 章节列出了哪些交换芯片支持该功能（98DX8xxx、98DX4xxx、98DX325x、98CX8410、98DX7xxx），哪些不支持（98DX3xxx、98DX2xxx），每颗芯片的 VRF 表数量上限（512 或 1024），接口关联规则，以及通过 /interface/ethernet/switch/rule 中的 new-vrf 选项对入向流量进行 VRF 分配。Marvell Prestera 交换芯片功能页面新增了与之对应的 VRF 条目。
- **[网桥](/docs/bridging-and-switching)**：新增了 “DHCP Snooping 绑定表” 章节，描述构建在 /interface/bridge/host 之上的 DHCPv4 snooping 绑定数据库，包括 dhcpv4-status、dhcpv4-ip、dhcpv4-server-id 和 dhcpv4-expires-after 字段，VLAN filtering 下基于 MAC–VLAN 的识别，以及 WinBox/控制台截图。

## 容器 {#containers}

- **[容器](/docs/containers)**：统一了属性表中类型/默认值的格式，修复了渲染不正确的有序列表缩进，并修正了细微的语法问题。
