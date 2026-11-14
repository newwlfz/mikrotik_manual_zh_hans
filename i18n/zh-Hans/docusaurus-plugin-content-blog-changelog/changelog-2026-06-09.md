---
title: "文档更新 - 2026年6月9日"
date: 2026-06-09
slug: /changelog-2026-06-09
source: https://manual.mikrotik.com/changelog/changelog-2026-06-09
captured_at: '2026-11-04T06:07:53+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 6 月 9 日文档变更摘要。

## 硬件 {#hardware}

- **[硬件指南](/docs/hardware)**：新增了从 Confluence 导入的硬件指南章节，涵盖 60 GHz 产品、配件、室内无线、IoT 产品、LTE 产品、RouterBoard、交换机以及无线系统，所有页面均采用统一的页面结构并带有认证徽章。

## 物联网 {#internet-of-things}

- **[Bluetooth](/docs/internet-of-things/bluetooth)**：将 KNOT 和 Bluetooth 指南（通知指南、信标管理器应用、GPIO 脉冲输入）从硬件章节移至 IoT，并删除了由此产生的重复页面。

## 移动网络 {#mobile-networking}

- **[BG77 Modem AT Commands](/docs/mobile-networking/bg77-modem-at-commands)**：将 BG77 调制解调器 AT 命令指南从硬件移至移动网络章节。

## CLI 参考 {#cli-reference}

- **[Netwatch](/docs/cli-reference/tool/netwatch)**：为所有 netwatch 探测参数添加了说明。
- 将原本单一的 MPLS 和队列 CLI 参考页面拆分为按子菜单划分的独立页面，并将连接跟踪参数移至[专属页面](/docs/cli-reference/ip/firewall/connection/tracking)。

## 容器 {#containers}

- **[容器](/docs/containers)**：新增了一条警告：容器需要配置 DNS，否则容器将无法启动。

## 诊断与监控 {#diagnostics--monitoring}

- **[Packet Sniffer](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer)**：更正了流量生成器 PCAPNG 的信息 —— 该格式从 RouterOS 7.21 开始支持。

## 入门 {#getting-started}

- **[软件包](/docs/getting-started/installation-and-upgrade/packages)**：更新了软件包列表 —— 新增 wifi-mediatek 和 wifi-qcom-be 驱动软件包，并整理了架构列表和格式。同时更新了架构参考名称，并修正了相关页面上的拼写错误。
