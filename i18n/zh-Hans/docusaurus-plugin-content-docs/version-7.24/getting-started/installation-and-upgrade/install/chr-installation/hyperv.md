---
title: "CHR：Hyper-V 安装"
description: "本页介绍在 Microsoft Hyper-V 上安装 MikroTik RouterOS CHR，详细说明支持的网卡（synthetic 和 legacy）以及磁盘控制器（系统磁盘使用 IDE，辅助磁盘使用 SCSI），并提供 Hyper-V 文档链接。"
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/install/chr-installation/hyperv
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 支持的网络和磁盘接口 {#supported-network-and-disk-interfaces}

### Microsoft Hyper-V

**网络适配器：**

- 网络适配器（合成）
- 旧版网络适配器

**磁盘控制器：**

- IDE
- SCSI

> **注意：** 在 Hyper-V 上，SCSI 控制器类型仅支持辅助磁盘。系统磁盘镜像必须连接到 IDE 控制器。

#### Hyper-V

**Hyper-V 文档：**

- https://technet.microsoft.com/en-us/library/cc816585(v=ws.10).aspx#Anchor_2
