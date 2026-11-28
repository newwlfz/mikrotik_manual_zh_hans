---
title: "CHR：安装"
description: "本页概述在虚拟环境中安装和配置 Cloud Hosted Router（CHR）的方法，涵盖系统要求、RAM 计算、磁盘镜像格式、下载说明、VM 设置和访问信息。"
tags:
  - 'chr'
  - 'virtualization'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/install/chr-installation
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 概述和系统要求 {#overview-and-system-requirements}

Cloud Hosted Router（CHR）是 RouterOS 的虚拟化版本，专为在 x86_64 虚拟环境中运行而设计。它提供与 MikroTik 硬件设备相同的核心路由、防火墙、VPN 和管理功能。

## 主机系统要求 {#host-system-requirements}

- **CPU**：支持虚拟化的 64 位处理器
- **RAM**：256 MB 或更多
- **磁盘**：128 MB 或更多

## 容量限制 {#capacity-limits}

### RouterOS 版本 6 {#routeros-version-6}

- CHR 虚拟硬盘最大大小：16 GB

### RouterOS 版本 7 {#routeros-version-7}

- 最大 RAM 和磁盘空间受 Linux kernel 5.6.3 限制，并取决于具体硬件。

## 计算最低 RAM 要求 {#calculating-minimum-ram-requirements}

最低 RAM 要求取决于 CPU 数量和接口数量。使用下面的相应公式计算近似值：

- **RouterOS v6**:
  
  `RAM = 128 + [ 8 × (CPU_COUNT) × (INTERFACE_COUNT - 1) ]`

- **RouterOS v7**:
  
  `RAM = 512 + [ 8 × (CPU_COUNT) × (INTERFACE_COUNT - 1) ]`

**建议**：对于 CHR 实例，至少分配 1024 MiB RAM。

## 软件要求 {#software-requirements}

- **软件包版本**：RouterOS v6.34 或更高版本

## 可用的磁盘镜像格式 {#available-disk-image-formats}

- **RAW 磁盘镜像**：`.img` 文件
- **VirtualBox 磁盘镜像**：`.vdi` 文件
- **VMware 磁盘镜像**：`.vmdk` 文件
- **Hyper-V 磁盘镜像**：`.vhdx` 文件
- **OVA 设备**：`.ova` 文件

:::warning
这些仅为磁盘镜像，必须附加到虚拟机。
:::

## 下载 CHR 镜像 {#download-the-chr-image}

1. 前往 [MikroTik 下载页面](https://mikrotik.com/download/chr) 的 Cloud Hosted Router 部分。
2. 选择适用于你平台的镜像格式。
3. 下载文件。

## 创建并配置虚拟机 {#create-and-configure-a-virtual-machine}

1. 在你的虚拟机管理程序中创建新的 VM。
2. 将 CHR 磁盘镜像作为系统磁盘附加。
3. 启动 VM。

### 虚拟网络适配器 {#virtual-network-adapters}

:::info
**Fast Path 支持**

- RouterOS v7：**vmxnet3** 和 **virtio-net** 接口支持 Fast Path。
- RouterOS v6：不支持 Fast Path。
:::

## 访问 CHR {#access-chr}

- 用户名：`admin`
- 密码：无（首次登录后应立即设置强密码）

首次启动后，CHR 默认使用 Free 许可证。要激活试用版或升级，请使用 `/system/license/renew`。

## 特定平台指南 {#platform-specific-guides}

### 支持的虚拟化平台 {#supported-virtualization-platforms}

- [VMware ESXi](/docs/getting-started/installation-and-upgrade/install/chr-installation/esxi)
- VMware Fusion
- [Proxmox VE (KVM/QEMU)](/docs/getting-started/installation-and-upgrade/install/chr-installation/proxmox)
- [Hyper-V](/docs/getting-started/installation-and-upgrade/install/chr-installation/hyperv)
- [VirtualBox](/docs/getting-started/installation-and-upgrade/install/chr-installation/virtualbox)
- Xen Server

:::warning
CHR 无法在 **bhyve** hypervisor 上运行。CHR 不支持半虚拟化平台。
:::

> **注意：** 使用 Hyper-V 时，仅支持第 1 代虚拟机。

> **重要：** 任何 hypervisor 均不支持半虚拟化。

### 支持的云平台 {#supported-cloud-platforms}

- Amazon Web Services（AWS）
- Google Cloud Platform（GCP）
- [Hetzner Cloud](/docs/getting-started/installation-and-upgrade/install/chr-installation/hetzner)
- Linode
- Microsoft Azure
- [Vultr](/docs/getting-started/installation-and-upgrade/install/chr-installation/vultr)
