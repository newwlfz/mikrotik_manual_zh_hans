---
sidebar_key: "getting-started/installation-and-upgrade/install/chr-installation/hetzner"
sidebar_position: 3
title: "CHR：Hetzner Cloud 安装"
sidebar_label: "CHR：Hetzner Cloud 安装"
description: "本页面概述了如何在 Hetzner Cloud 上部署 MikroTik RouterOS Cloud Hosted Router (CHR)，详细介绍了安装过程，包括创建服务器、启用救援系统、通过 SSH 部署 CHR 镜像以及重启说明，同时强调了安全最佳实践。"
tags:
  - 'chr'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/install/chr-installation/hetzner
captured_at: '2026-11-04T11:28:35+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#overview}

**[Hetzner Cloud](https://www.hetzner.com/cloud)** 是一个云计算平台，提供可扩展的虚拟机基础设施以及一系列预配置的 Linux 发行版。对于需要高级网络功能的用户，Hetzner Cloud 也是部署 **RouterOS Cloud Hosted Router (CHR)** 的合适平台。

Cloud Hosted Router (CHR) 是 MikroTik RouterOS 的一个版本，专为在 x86_64 虚拟化环境中运行而设计。它提供与 MikroTik 硬件设备相同的核心路由、防火墙、VPN 和管理功能，适合基于云的联网、VPN 服务和常规网络管理。

在 Hetzner Cloud 上部署时，CHR 可受益于可扩展的虚拟基础设施，同时保持完整的 RouterOS 功能，使用户能够构建灵活且强大的网络解决方案。

## 创建 CHR 虚拟机 {#create-a-chr-virtual-machine}

1. **创建 Hetzner Cloud 服务器**  
   在 Hetzner Cloud 上开始创建新服务器。所有可用的服务器选项都可以使用。
2. **激活救援系统**
   - 在 Hetzner Cloud 管理界面中，通过选择 **ENABLE RESCUE & POWER CYCLE** 来激活 **Enable Rescue** 系统。
   - 选择 `linux64` 作为救援操作系统。
   - 系统将显示用户名和密码。使用这些凭据通过 SSH 登录救援系统。
3. **安装 Cloud Hosted Router (CHR)**
   - 登录救援系统后，下载 CHR **RAW** 磁盘映像，并使用以下命令将其写入云服务器的系统磁盘：

   ```bash
   curl -L https://download.mikrotik.com/routeros/7.21.4/chr-7.21.4.img.zip | funzip | dd of=/dev/sda bs=1M
   ```

   >`/dev/sda` 设备名称可能因云服务提供商配置而异。

:::warning
   将 URL 替换为 MikroTik [下载页面](https://mikrotik.com/download) 上可用的最新 CHR 版本的链接。
   :::

## 重启服务器 {#reboot-the-server}

安装完成后，通过执行 `reboot` 命令重启服务器。
:::warning
立即[保护你的 RouterOS](../../../securing-your-router.md) 安装至关重要！
:::

请务必保持 RouterOS 更新，并遵循最佳安全实践，以维护服务器的安全性和性能。
