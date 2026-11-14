---
sidebar_key: "getting-started/routeros-licensing/index"
sidebar_position: 2
title: "RouterOS 许可证密钥"
sidebar_label: "RouterOS 许可证密钥"
description: "RouterOS 授权说明了 MikroTik 硬件、CHR 和 x86 系统的 Software ID 与 System ID 详细信息。单独的指南涵盖各平台的授权具体内容以及安装说明。"
tags:
  - 'licensing'
  - 'mikrotik-hardware'
  - 'chr'
source: https://manual.mikrotik.com/docs/7.24/getting-started/routeros-licensing
captured_at: '2026-11-04T11:28:53+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#overview}

RouterOS 许可基于两个标识符：**Software ID** 和 **System ID**。这些标识符决定了许可证在不同平台上如何分配和管理。

- **Software ID** 用于 MikroTik 产品（RouterBOARD）和 x86 系统。
- **System ID** 用于 Cloud Hosted Router (CHR)。

由于不同平台的许可行为有所不同，因此针对每种情况分别提供了指南。

## 许可指南 {#licensing-guides}

### MikroTik 硬件许可 {#mikrotik-hardware-licensing}

说明许可证级别、Software ID 行为以及 MikroTik 硬件设备的许可。

[MikroTik 硬件许可指南](./mikrotik-hardware/index.md)

### CHR 许可 {#chr-licensing}

说明基于 System ID 的许可、CHR 激活以及虚拟环境的许可选项。

[CHR 许可指南](./chr/chr-licensing.md)

### x86 许可 {#x86-licensing}

涵盖许可证获取、Software ID 行为以及基于 x86 的 RouterOS 安装的许可证级别。

[x86 许可指南](./x86/index.md)

## 安装指南 {#installation-guides}

### MikroTik 硬件重新安装 {#mikrotik-hardware-reinstallation}

涵盖使用 Netinstall 进行 RouterOS 重新安装和恢复。

[Netinstall 指南](../installation-and-upgrade/netinstall/index.md)

### x86 安装 {#x86-installation}

涵盖 x86 系统要求和安装方法，包括 USB 和 Netinstall 部署。

[x86 安装指南](../installation-and-upgrade/install/x86-installation.md)

### CHR 安装 {#chr-installation}

涵盖在受支持的虚拟化平台上部署和安装 CHR。

[CHR 安装指南](../installation-and-upgrade/install/chr-installation/index.md)
