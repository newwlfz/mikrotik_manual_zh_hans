---
title: "RouterOS 许可证密钥"
description: "本文详细说明 RouterOS 授权，包括 MikroTik 硬件、CHR 和 x86 系统的 Software ID 和 System ID。另有独立指南介绍各平台的授权细节和安装说明。"
tags:
  - 'licensing'
  - 'mikrotik-hardware'
  - 'chr'
source: https://manual.mikrotik.com/docs/7.25/getting-started/routeros-licensing
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 概述 {#overview}

RouterOS 许可基于两个标识符：**Software ID** 和 **System ID**。这些标识符决定许可在不同平台上的分配和管理方式。

- **Software ID** 用于 MikroTik 产品（RouterBOARD）和 x86 系统。
- **System ID** 用于 Cloud Hosted Router（CHR）。

由于许可行为因平台而异，因此针对每种情况提供了单独的指南。

## 许可指南 {#licensing-guides}

### MikroTik 硬件许可 {#mikrotik-hardware-licensing}

说明许可级别、Software ID 行为以及 MikroTik 硬件设备的许可。

[MikroTik Hardware Licensing Guide](/docs/getting-started/routeros-licensing/mikrotik-hardware)

### CHR 许可 {#chr-licensing}

说明基于 System ID 的许可、CHR 激活以及虚拟环境中的许可选项。

[CHR Licensing Guide](/docs/getting-started/routeros-licensing/chr/chr-licensing)

### x86 许可 {#x86-licensing}

介绍基于 x86 的 RouterOS 安装的许可获取、Software ID 行为和许可级别。

[x86 Licensing Guide](/docs/getting-started/routeros-licensing/x86)

## 安装指南 {#installation-guides}

### MikroTik 硬件重新安装 {#mikrotik-hardware-reinstallation}

介绍如何使用 Netinstall 重新安装和恢复 RouterOS。

[Netinstall Guide](/docs/getting-started/installation-and-upgrade/netinstall)

### x86 安装 {#x86-installation}

介绍 x86 系统要求和安装方法，包括 USB 和 Netinstall 部署。

[x86 Installation Guide](/docs/getting-started/installation-and-upgrade/install/x86-installation)

### CHR 安装 {#chr-installation}

介绍 CHR 在受支持的虚拟化平台上的部署和安装。

[CHR Installation Guide](/docs/getting-started/installation-and-upgrade/install/chr-installation)
