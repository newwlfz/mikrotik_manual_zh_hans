---
sidebar_key: "getting-started/software-specifications/feature-support-based-on-architecture"
sidebar_position: 1
title: "基于架构的功能支持"
sidebar_label: "基于架构的功能支持"
description: "本页面概述了 MikroTik RouterOS 各架构之间在功能支持上的差异，列出了对于 ARM、MIPS 和 PPC 等每个平台，哪些功能不受支持或为独占可用。页面还提供了有关 WiFi、L3 offloading、PTP 以及交换芯片能力的其他资源参考。"
tags:
  - 'arm'
  - 'mips'
  - 'x86'
source: https://manual.mikrotik.com/docs/7.25/getting-started/software-specifications/feature-support-based-on-architecture
captured_at: '2026-11-04T11:17:06+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 按架构划分的功能支持 {#feature-support-by-architecture}

大多数功能支持在所有设备架构上保持一致，仅有少数例外。下表显示了各架构不支持或独占支持的功能：

| 架构 | 不支持 | 专属支持 |
| :-- | :-- | :-- |
| **ARM (ARM32)** | — | ZeroTier, Container, BTH |
| **ARM64** | — | ZeroTier, Container, BTH |
| **MIPSBE** | ZeroTier, Dude Server | — |
| **MMIPS** | ZeroTier | — |
| **SMIPS** | ZeroTier, DOT1X, BGP, MPLS, PIMSM, Dude Server, User Manager, Reverse Proxy | — |
| **TILE** | ZeroTier | BTH |
| **PPC** | ZeroTier, Dude Server | — |
| **x86 PC** | ZeroTier, Cloud | Container |
| **CHR（云托管路由器）** | — | 容器 |

除功能差异外，硬件能力也因设备型号而异。有关更多信息，请参阅以下资源：

- **WiFi** — 面向 802.11ax 设备及受支持的旧设备的新驱动实现
- **L3 硬件卸载** — 设备支持详情
- **PTP (Precision Time Protocol)** — 概述与配置
- **交换芯片功能** — 能力与限制
