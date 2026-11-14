---
title: "文档更新 - 2026年6月10日"
date: 2026-06-10
slug: /changelog-2026-06-10
source: https://manual.mikrotik.com/changelog/changelog-2026-06-10
captured_at: '2026-11-04T06:07:57+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 6 月 10 日文档变更汇总。

## 硬件 {#hardware}

- **[硬件指南](/docs/hardware)**：在 73 个硬件页面上补录了 MikroTik 官方产品简短描述，内容取自公开的 products API 并按产品代码匹配。已在描述中添加指向对应 mikrotik.com 产品页面的链接。
- **[硬件指南](/docs/hardware)**：为多型号产品页面添加了 covers-box 与 photo-row 布局，并为每个型号提供产品代码链接。统一了 18 个多产品页面上 "This article covers" 开头提示框的写法。
- **[硬件指南](/docs/hardware)**：为步骤照片序列添加了并排的可点击缩略图画廊 —— 章节内连续的图片现在会以带灯箱缩放的小缩略图呈现。
- **[硬件指南](/docs/hardware)**：大规模布局清理：修复主图，规范章节标题层级，将误作标题的零散引导句降级，移除 Confluence 遗留标记（裸露星号、宏垃圾、损坏的目录），并为未加围栏的代码块重新加上围栏。删除了已移至 IoT 章节的过时 KNOT 子页面。
- 重新从 Confluence 导入了 TG-LR 硬件页面，并修复了导出工具的问题。
- **[硬件指南](/docs/hardware)**：又用来自 products API 的 MikroTik 官方产品照片（WebP）替换了约 80 个页面的首图，包括在所有指南页面中统一 LtAP 与 LtAP mini 的图片。
- **[硬件指南](/docs/hardware)**：为另外 70 个页面补上了缺失的 mikrotik.com 产品页面链接，并将 wAP ax LTE7 kit 页面移入 LTE Products 分类。
- **[硬件指南](/docs/hardware)**：第二轮 Confluence 清理：从 120 个页面移除了外链图标残留，修复了 83 个页面上破坏项目符号列表的孤立标题文本，移除了不换行空格和 WinBox URL 残留，修复了拼接错误的 URL、损坏的产品代码以及合规性表格中语言相关帮助 URL 末尾多余的 +，并修复了 hAP ax lite LTE6 与 hAP lite TC 页面的结构。
- **[硬件指南](/docs/hardware)**：将全部 46 个失效的 wiki.mikrotik.com 链接替换为手册内部页面（SFP/有线接口兼容性、LED、GPS、W60G、LTE/5G、LoRa、Serial Console、S+RJ10 指南）或 help.mikrotik.com 上现行的 SwOS 手册。一次全站链接检查还修复了其他章节中已迁移或失效的外部链接（ZeroTier、kernel NAPI、RFC 8092、Vultr、ThingsBoard、wi-fi.org），并取消了那些从未是网页的占位主机名的链接。

## 物联网 {#internet-of-things}

- **[Modbus](/docs/internet-of-things/modbus)**：移除了页面 slug（此前错误地指向某条硬件专用路径）。添加了 KNOT 兼容性警告，列出带 RS-485 端口的受支持型号。修复了属性表格格式，并重新整理了降级/取消章节。
- **[Bluetooth](/docs/internet-of-things/bluetooth)**：修复了 BLE 标签邮件通知指南中的失效链接和图片引用，添加了指向 MikroTik 标签广播格式页面以及 iOS/Android beacon manager 指南的链接，并将旧式 &lt;note&gt; HTML 替换为规范的 Docusaurus :::info 提示框。
- **[Bluetooth](/docs/internet-of-things/bluetooth)**：补全并修复了 beacon manager 指南（索引、Android、iOS）。移除了 IoT Bluetooth 页面中自定义的 /slug frontmatter 覆盖项，使 URL 结构与文件系统布局保持一致。
- **[GPIO](/docs/internet-of-things/gpio)**：修复了 pulse-input 指南中一处损坏的图片引用。
- **[Lora](/docs/internet-of-things/lora)**：将 "Setup" 章节重命名为 "User Guides"，并把 TG-LR 设备文档作为 [TG-LR 设置指南](/docs/internet-of-things/lora/user-guides/tg-lr-setup-guide) 移入其中，同时恢复了警告提示框和文档风格元数据。
- **[Bluetooth](/docs/internet-of-things/bluetooth)**：补全并修复了 BLE 标签通知与遥测指南（MQTT 与 Azure、HTTPS POST 与 Azure、MQTT/HTTPS 与 AWS、IFTTT 应用通知、ThingsBoard 温度读数）：用可用的 Microsoft Learn 和厂商链接恢复了失效的 "follow this link" 引用，更新了截图，并补充了缺失的配置步骤。

## CLI 参考 {#cli-reference}

- **[IP 设置](/docs/cli-reference/ip/settings)**：为 ipv4-high-fragment-thresh 参数（分片重组队列的内存上限，并提供按 RAM 容量区分的默认值）和 ipv4-fragment-time 参数（分片生存时间，单位为秒）添加了说明。

## 入门 {#getting-started}

- **[软件包](/docs/getting-started/installation-and-upgrade/packages)**：将 wifi-qcom-be 的架构支持列表由 arm、arm64 更正为仅 arm64，与实际 WiFi-7 802.11be 驱动的要求一致。
