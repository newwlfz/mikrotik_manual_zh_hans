---
sidebar_key: "getting-started/installation-and-upgrade/install/chr-installation/proxmox"
sidebar_position: 5
title: "CHR：Proxmox VE 安装"
sidebar_label: "CHR：Proxmox VE 安装"
description: "本页提供了在 Proxmox VE 虚拟环境中部署 MikroTik Cloud Hosted Router (CHR) 的概述和详细安装步骤，涵盖虚拟机创建、镜像处理和配置方法。"
tags:
  - 'proxmox'
  - 'chr'
  - 'kvm'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/install/chr-installation/proxmox
captured_at: '2026-11-04T11:28:44+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#overview}

Cloud Hosted Router（CHR）是专为在 x86_64 虚拟化环境中运行而设计的 MikroTik RouterOS 版本。它提供完整的路由、防火墙、VPN 和管理功能，适用于本地和基于云的虚拟基础设施，例如 Proxmox VE。

Proxmox VE（KVM/QEMU）允许使用 raw 或 qcow2 磁盘镜像灵活部署 CHR，并提供多种存储后端和网络适配器选项。

## 安装步骤 {#installation-steps}

### 步骤 1：创建虚拟机 {#step-1-create-a-virtual-machine}

- 在 Proxmox VE 中使用 Web 界面创建新 VM。
- 根据需要分配 CPU、内存和网络接口。
- 不要安装操作系统（CHR 磁盘将手动挂载）。

### 步骤 2：下载并解压 CHR 镜像 {#step-2-download-and-extract-chr-image}

从 MikroTik 下载页面 https://mikrotik.com/download 下载最新 CHR 镜像到 Proxmox 主机：

```bash
wget https://download.mikrotik.com/routeros/7.21.4/chr-7.21.4.img.zip
```

:::warning
请将 URL 替换为 MikroTik [下载页面](https://mikrotik.com/download) 上可用的最新 CHR 版本。
:::

解压镜像：

```bash
unzip chr-7.21.4.img.zip
```

这将生成一个用于安装的 `.img` 文件。

### 步骤 3：将镜像移动到 VM 存储 {#step-3-move-the-image-to-vm-storage}

Proxmox 默认本地存储位置：

```bash
/var/lib/vz/images/<VM_ID>/
```

如有需要，创建目录：

```bash
mkdir -p /var/lib/vz/images/<VM_ID>
```

移动镜像：

```bash
mv chr-7.21.4.img /var/lib/vz/images/<VM_ID>/
```

### 步骤 4：将镜像转换为 QCOW2 {#step-4-convert-image-to-qcow2}

将 raw CHR 镜像转换为 qcow2 格式：

```bash
qemu-img convert -f raw -O qcow2 /var/lib/vz/images/<VM_ID>/chr-7.21.4.img /var/lib/vz/images/<VM_ID>/vm-<VM_ID>-disk-1.qcow2
```

### 步骤 5：将磁盘挂载到 VM {#step-5-attach-disk-to-vm}

VM 配置文件位置：

```bash
/etc/pve/qemu-server/<VM_ID>.conf
```

通过 VM 配置文件或 Proxmox Web 界面手动挂载磁盘。

:::tip
请先使用测试 VM 验证配置语法是否正确。
:::

## 基于 GUI 的替代方法 {#alternative-gui-based-method}

1. 通过 Proxmox Web 界面创建基础 VM。
2. 确保存储设置为本地存储。
3. 将 CHR 镜像上传到：`/var/lib/vz/images/<VM_ID>/`
4. 将镜像转换为 qcow2：

```bash
qemu-img convert -f raw -O qcow2 chr.img vm-<VM_ID>-disk-1.qcow2
```

1. 通过 Proxmox GUI 或 `.conf` 文件挂载磁盘。

## 自动化安装脚本 {#automated-installation-script}

也可以在 Proxmox 主机上使用 Bash 脚本部署 CHR。

**脚本执行的操作：**

- 创建临时目录（/root/temp）。
- 下载 CHR 镜像。
- 解压并转换该镜像。
- 创建 VM 并挂载磁盘。

```bash
#!/bin/bash

version="nil"
vmID="nil"

echo "############## Start of Script ##############"

if [ ! -d /root/temp ]; then
    mkdir /root/temp
fi

read -p "Enter CHR version (e.g. 7.21.4): " version

cd /root/temp

wget https://download.mikrotik.com/routeros/$version/chr-$version.img.zip
unzip chr-$version.img.zip

read -p "Enter VM ID: " vmID

mkdir -p /var/lib/vz/images/$vmID

qemu-img convert -f raw -O qcow2 \
chr-$version.img \
/var/lib/vz/images/$vmID/vm-$vmID-disk-1.qcow2

qm create $vmID \
  --name chr-$version \
  --net0 virtio,bridge=vmbr0 \
  --bootdisk virtio0 \
  --ostype l26 \
  --memory 512 \
  --sockets 1 \
  --cores 1 \
  --virtio0 local:$vmID/vm-$vmID-disk-1.qcow2

echo "############## End of Script ##############"
```

### 实用提示 {#utility-tip}

修复脚本中的 Windows 行尾符：

```bash
sed -i -e 's/\r$//' *.sh
```

## 支持的网络和磁盘接口 {#supported-network-and-disk-interfaces}

### Proxmox VE (KVM/QEMU) {#proxmox-ve-kvmqemu}

**网络适配器：**

- Virtio（半虚拟化）
- E1000

**磁盘控制器：**

- IDE
- SATA
- Virtio（半虚拟化）
