---
sidebar_key: "getting-started/installation-and-upgrade/install/chr-installation/virtualbox"
sidebar_position: 7
title: "CHR：VirtualBox 安装"
sidebar_label: "CHR：VirtualBox 安装"
description: "本页提供在 VirtualBox 中安装 MikroTik RouterOS Cloud Hosted Router (CHR) 的分步指南，涵盖虚拟机创建、配置以及包含登录说明的初始设置。"
tags:
  - 'virtualbox'
  - 'routeros-configuration'
  - 'network-adapters'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/install/chr-installation/virtualbox
captured_at: '2026-11-04T11:32:04+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## CHR VirtualBox 安装视频 {#chr-virtualbox-installation-video}

**[![](/img/b1b6f1c2752c2ba1.png))](https://www.youtube.com/watch?v=oHXkaHkSVVo)**

1. **下载 VirtualBox**  
   从官方网站安装最新版本的 VirtualBox。

2. **下载 CHR 磁盘镜像**  
   从 [MikroTik 下载页面](https://mikrotik.com/download) 下载并解压最新 Long-Term、Stable 或 Testing 版本的 Cloud Hosted Router (CHR) VDI 镜像。

![](/img/b8bbe080282650df.png)

## 步骤 1：创建新虚拟机 {#step-1-create-a-new-virtual-machine}

- 启动 VirtualBox。
- 点击 **New** 创建新虚拟机。

![](/img/72af47c1e8a1a068.png)

### 名称和操作系统 {#name-and-operating-system}

- **Name**：输入虚拟机名称（例如 MikroTik_CHR）
- **Type**：Linux
- **Version**：Other Linux (64-bit)

![](/img/093f05cdebabf23f.png)

## 步骤 2：配置内存大小 {#step-2-configure-memory-size}

- 至少分配 **512 MB RAM**（RouterOS 7 的最低要求）
- 分配所需的 CPU 数量

![](/img/4e95cf301fba533d.png)

## 步骤 3：添加虚拟硬盘 {#step-3-add-a-virtual-hard-disk}

- 选择 **Use an Existing Virtual Hard Disk File**
- 选择已下载的 `.vdi` 镜像

![](/img/dd215579bb02c177.png)

点击 **Finish** 创建虚拟机。

## 步骤 4：配置虚拟机设置 {#step-4-configure-virtual-machine-settings}

选择虚拟机 → 点击 **Settings**

![](/img/0fc6a478e46dae13.png)

### 系统 {#system}

- 在启动顺序中禁用 **Floppy** 和 **Optical**

![](/img/10efb5ed4436b0bf.png)

### 处理器 {#processor}

- 设置所需的 CPU 数量

### 网络 {#network}

- 网卡 1：
  - 启用网络适配器
  - 连接到 **Bridged Adapter** 或 **NAT**（取决于你的环境）

![](/img/a9efaeab9a73ba15.png)

## 步骤 5：启动虚拟机 {#step-5-start-the-virtual-machine}

- 点击 **Start** 启动虚拟机

![](/img/38b5dcfb21bfadc3.png)

- 登录凭据：
  - 用户名：`admin`
  - 密码：*(空，请在首次登录后立即设置)*

![](/img/c90c90493a21cb3c.png)

## 恭喜 {#congratulations}

你已成功在 VirtualBox 上安装 MikroTik CHR。

现在你可以使用控制台、WinBox 或 WebFig 继续进行 RouterOS 的初始配置。

## 支持的网络和磁盘接口 {#supported-network-and-disk-interfaces}

### 网络适配器 {#network-adapters}

- E1000
- RTL8139
- Virtio（半虚拟化）

### 磁盘控制器 {#disk-controllers}

- IDE

> **警告：** 除非没有更好的半虚拟化或合成选项可用，否则请避免使用 E1000 网络适配器。在 VirtualBox 上，Virtio 能提供更好的性能。
