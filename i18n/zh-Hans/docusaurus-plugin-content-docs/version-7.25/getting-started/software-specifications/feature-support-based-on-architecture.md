---
title: "基于架构的功能支持"
description: "本页概述 MikroTik RouterOS 各架构之间的功能支持差异，列出 ARM、MIPS 和 PPC 等平台不支持或独有的功能。还提供了有关 WiFi、L3 卸载、PTP 和交换芯片能力的其他资源参考。"
tags:
  - 'arm'
  - 'mips'
  - 'x86'
source: https://manual.mikrotik.com/docs/7.25/getting-started/software-specifications/feature-support-based-on-architecture
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "getting-started/software-specifications"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 各架构的功能支持 {#feature-support-by-architecture}

大多数功能支持在所有设备架构中保持一致，仅有少数例外。下表列出了各架构不支持或仅支持的功能：

| 架构 | 不支持 | 仅支持 |
| :-- | :-- | :-- |
| **ARM (ARM32)** | — | ZeroTier、Container、BTH |
| **ARM64** | — | ZeroTier、Container、BTH |
| **MIPSBE** | ZeroTier、Dude Server | — |
| **MMIPS** | ZeroTier | — |
| **SMIPS** | ZeroTier、DOT1X、BGP、MPLS、PIMSM、Dude Server、User Manager、Reverse Proxy | — |
| **TILE** | ZeroTier | BTH |
| **PPC** | ZeroTier、Dude Server | — |
| **x86 PC** | ZeroTier、Cloud | Container |
| **CHR (Cloud Hosted Router)** | — | Container |

除功能差异外，硬件能力也因设备型号而异。详情请参阅以下资源：

- **WiFi** — 802.11ax 设备及受支持旧设备的新驱动实现
- **L3 Hardware Offloading** — 设备支持详情
- **PTP (Precision Time Protocol)** — 概述和配置
- **Switch Chip Features** — 能力和限制
