---
title: "文档更新 - 2026年7月21日"
date: 2026-07-21
slug: /changelog-2026-07-21
source: https://manual.mikrotik.com/changelog/changelog-2026-07-21
captured_at: '2026-11-04T06:08:16+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 7 月 21 日文档变更摘要。

## 入门 {#getting-started}

- **[CHR 和 x86 许可](/docs/getting-started/routeros-licensing/chr/chr-licensing)**：记录了 CHR 和 x86 许可证的账户绑定、试用到期以及许可证转移行为。

## 硬件 {#hardware}

- **[磁盘](/docs/hardware/disks)**：记录了 USB 连接驱动器上 SED 与 FSTRIM 的限制，澄清了基于容器的 swap 行为，更正了磁盘 trim 的描述，并新增了 swap 最大大小限制。
- **[RouterBOARD](/docs/hardware/routerboard)**：交叉引用了 resource print 所显示的新的 minimum-firmware 和 minimum-version 字段。

## 诊断与监控 {#diagnostics--monitoring}

- **[Resource](/docs/diagnostics-monitoring-and-troubleshooting/resource)**：记录了 resource print 所显示的 minimum-firmware 和 minimum-version 字段。

## 存储 {#storage}

- **[自加密驱动器](/docs/storage/self-encrypting-drives)**：说明了当 SED 位于 USB 桥接器之后时的一项 FSTRIM 限制。
- **[RAID](/docs/storage/raid)**：记录了 /disk raid-scrub-cancel 命令。

## 容器 {#containers}

- **[容器应用](/docs/containers/apps)**：记录了如何选择容器应用所使用的 Web 端口。
