---
title: "文档更新 - 2026年7月17日"
date: 2026-07-17
slug: /changelog-2026-07-17
source: https://manual.mikrotik.com/changelog/changelog-2026-07-17
captured_at: '2026-11-04T06:08:14+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 7 月 17 日的文档变更摘要。

## 用户指南 {#user-guides}

- **[PIM-SM](/docs/user-guides/routing-and-networking-protocols/multicast/pim-sm)**：重做了配置示例。基础示例现在将 PIM 接口模板与面向客户端接口的独立 igmp-interface-template 分开，这样 PIM 实例就能获知本地组播组成员关系。静态 RP 示例用内置的 lo 接口替换了 loopback 网桥，并为 R2 和 R3 添加了 IGMP 查询器配置。
- **[IGMP proxy](/docs/user-guides/routing-and-networking-protocols/multicast/igmp-proxy)**：移除了 quick-leave 配置示例。

## 硬件指南 {#hardware-guides}

- **[hAP ax 2](/hardware/hap-ax-2) 和 [hAP ax 3](/hardware/hap-ax-3)**：重命名了 hAP ax 页面，使页面名称与产品一致 — 原先的 hap-ax 页面现在是 hap-ax-3，而 hap-ax-2 现在存放 hAP ax 2 的内容。指向旧 hap-ax URL 的现有书签需要更新。
- **[无线系统](/hardware/ldf-5-series)**：为 LDF 5、SXT SA 和 SXT SQ 系列页面以及若干 LTE 套件页面添加了来自 mikrotik.com 的产品图片。
- **[硬件指南](/hardware/)**：176 个设备页面中的 WinBox 下载链接现在都使用 mt.lv/winbox 短链接，默认 IP 地址 192.168.88.1 现在通过显式的 https:// 方案进行链接。
