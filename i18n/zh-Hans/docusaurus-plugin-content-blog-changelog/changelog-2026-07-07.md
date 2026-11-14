---
title: "文档更新 - 2026年7月7日"
date: 2026-07-07
slug: /changelog-2026-07-07
source: https://manual.mikrotik.com/changelog/changelog-2026-07-07
captured_at: '2026-11-04T06:08:08+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 7 月 7 日文档变更摘要。

## 入门 {#getting-started}

- **[默认配置密码](/docs/getting-started/configuration-management/default-configuration-passwords)**：新增页面，说明在哪里可以找到设备唯一的出厂默认密码（序列号贴纸、包装、快速指南、部分室内无线设备上的产品信息仓），以及找不到密码时该怎么办。
- **[RouterOS 配置重置](/docs/getting-started/configuration-management/routeros-configuration-reset)**：使用抢救出的知识库资料进行了扩充。
- **[升级服务器](/docs/getting-started/installation-and-upgrade/upgrade#standard-upgrade)** 和 **[AWS 上的 CHR](/docs/getting-started/installation-and-upgrade/install/chr-installation/aws)**：新增页面。

## 诊断与监控 {#diagnostics--monitoring}

- **[降级 RouterOS](/docs/diagnostics-monitoring-and-troubleshooting/downgrading-routeros)**：新增页面，涵盖出厂软件版本下限、降级前检查清单（二进制备份加导出），以及使用 /system/package/downgrade 的分步降级流程。

## 硬件 {#hardware}

- **[RMA 之前先尝试](/docs/hardware/try-before-rma)**：从知识库抢救资料中新增的页面。

## 无线 {#wireless}

- **[WiFi](/docs/wireless/wifi)**：新增 "Network" 章节，记录了 /interface/wifi/network 菜单，该菜单将 SSID、安全、数据路径和无线参数捆绑为单一配置实体，并应用于匹配其标签的接口，配置示例中包含多链路操作（MLO）。

## 全站 {#site-wide}

- **属性表**：修复了在 11 个页面中被 Confluence→Docusaurus 迁移压平成单个表格单元格的围栏代码块（原本显示为原始的 ```ros&lt;br/&gt; 文本），涉及 Disks、Scripting、Log、LTE/5G、NTP、L2TP、PPPoE 和 WiFi interworking。现在它们会正常渲染为行内代码。
