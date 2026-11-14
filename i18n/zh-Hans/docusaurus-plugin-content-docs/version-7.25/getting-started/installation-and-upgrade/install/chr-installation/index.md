---
sidebar_key: "getting-started/installation-and-upgrade/install/chr-installation/index"
sidebar_position: 6
title: "CHR：安装"
sidebar_label: "CHR：安装"
description: "本页面概述了在虚拟环境中安装和配置云托管路由器（CHR）的相关内容，涵盖系统要求、RAM 计算、磁盘映像格式、下载说明、虚拟机设置以及访问详情。"
tags:
  - 'chr'
  - 'virtualization'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/install/chr-installation
captured_at: '2026-11-04T11:16:14+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述和系统要求 {#overview-and-system-requirements}

Cloud Hosted Router (CHR) 是 RouterOS 的虚拟化版本，旨在运行于 x86_64 虚拟环境。它提供与 MikroTik 硬件设备相同的核心路由、防火墙、VPN 和管理功能。

## 主机系统要求 {#host-system-requirements}

- **CPU**：支持虚拟化的 64 位处理器
- **RAM**：256 MB 或更多
- **磁盘**：128 MB 或更多

## 容量限制 {#capacity-limits}

### RouterOS 版本 6 {#routeros-version-6}

- CHR 虚拟硬盘最大大小：16 GB

### RouterOS 版本 7 {#routeros-version-7}

- 最大 RAM 和磁盘空间受 Linux 内核 5.6.3 限制，并取决于具体硬件。

## 计算最低 RAM 要求 {#calculating-minimum-ram-requirements}

最低所需 RAM 取决于您的 CPU 数量和接口数量。使用下方适当的公式计算近似值：

- **RouterOS v6**:
  
  `RAM = 128 + [ 8 × (CPU_COUNT) × (INTERFACE_COUNT - 1) ]`

- **RouterOS v7**:
  
  `RAM = 512 + [ 8 × (CPU_COUNT) × (INTERFACE_COUNT - 1) ]`

**建议**：对于 CHR 实例，至少分配 1024 MiB RAM。

## 软件要求 {#software-requirements}

- **软件包版本**：RouterOS v6.34 或更高版本

## 可用的磁盘映像格式 {#available-disk-image-formats}

- **RAW 磁盘映像**：`.img` 文件
- **VirtualBox 磁盘映像**：`.vdi` 文件
- **VMware 磁盘映像**：`.vmdk` 文件
- **Hyper-V 磁盘映像**：`.vhdx` 文件
- **OVA 设备**：`.ova` 文件

:::warning
这些仅是磁盘映像，必须挂载到虚拟机。
:::

## 下载 CHR 映像 {#download-the-chr-image}

1. 前往 [MikroTik 下载页面](https://mikrotik.com/download/chr) 的 Cloud Hosted Router 部分。
2. 选择适用于您平台的映像格式。
3. 下载文件。

## 创建并配置虚拟机 {#create-and-configure-a-virtual-machine}

1. 在您的虚拟机监控程序中创建新虚拟机。
2. 将 CHR 磁盘映像作为系统磁盘挂载。
3. 启动虚拟机。

### 虚拟网络适配器 {#virtual-network-adapters}

:::info
**Fast Path 支持**

- RouterOS v7：**vmxnet3** 和 **virtio-net** 接口支持 Fast Path。
- RouterOS v6：不支持 Fast Path。

:::

## 访问 CHR {#access-chr}

- 用户名：`admin`
- 密码：无（应在首次登录后立即设置强密码）

首次启动后，CHR 默认运行在 Free 许可证下。要激活试用版或升级，请使用 `/system/license/renew`。

## 特定平台指南 {#platform-specific-guides}

### 支持的虚拟化平台 {#supported-virtualization-platforms}

- [CHR：VMware ESXi 安装](./esxi.md)
- VMware Fusion
- [Proxmox VE (KVM/QEMU)](./proxmox.md)
- [CHR：Hyper-V 安装](./hyperv.md)
- [VirtualBox](./virtualbox.md)
- Xen Server

:::warning
CHR 无法在 **bhyve** 虚拟机监控程序上运行。CHR 不支持半虚拟化平台。
:::

> **注意：** 使用 Hyper-V 时仅支持第 1 代虚拟机。

> **重要：** 任何虚拟机监控程序都不支持半虚拟化。

### 支持的云平台 {#supported-cloud-platforms}

- Amazon Web Services (AWS)
- Google Cloud Platform (GCP)
- [CHR：Hetzner Cloud 安装](./hetzner.md)
- Linode
- Microsoft Azure
- [Vultr](./vultr.md)
