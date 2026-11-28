---
title: "CHR：Hetzner Cloud 安装"
description: "本页概述如何在 Hetzner Cloud 上部署 MikroTik RouterOS Cloud Hosted Router（CHR），详细介绍安装过程，包括创建服务器、启用救援系统、通过 SSH 部署 CHR 镜像以及重启说明，同时强调安全最佳实践。"
tags:
  - 'chr'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/install/chr-installation/hetzner
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 概述 {#overview}

**[Hetzner Cloud](https://www.hetzner.com/cloud)** 是一个云计算平台，提供可扩展的虚拟机基础设施和多种预配置的 Linux 发行版。对于需要高级网络功能的用户，Hetzner Cloud 也是部署 **RouterOS Cloud Hosted Router (CHR)** 的合适平台。

Cloud Hosted Router (CHR) 是专为 x86_64 虚拟化环境运行的 MikroTik RouterOS 版本。它提供与 MikroTik 硬件设备相同的核心路由、防火墙、VPN 和管理功能，适用于基于云的网络、VPN 服务和通用网络管理。

在 Hetzner Cloud 上部署时，CHR 可受益于可扩展的虚拟基础设施，同时保持完整的 RouterOS 功能，使用户能够构建灵活且强大的网络解决方案。

## 创建 CHR 虚拟机 {#create-a-chr-virtual-machine}

1. **创建 Hetzner Cloud 服务器**  
   开始在 Hetzner Cloud 上创建新服务器。任何可用的服务器选项均可使用。
2. **启用 Rescue System**
   - 在 Hetzner Cloud 管理界面中，选择 **ENABLE RESCUE & POWER CYCLE** 以启用 **Enable Rescue** 系统。
   - 选择 `linux64` 作为 Rescue OS。
   - 系统将显示用户名和密码。使用这些凭据通过 SSH 登录 rescue 系统。
3. **安装 Cloud Hosted Router (CHR)**
   - 登录 rescue 系统后，下载 CHR **RAW** 磁盘镜像，并使用以下命令将其写入云服务器的系统磁盘：

   ```bash
   curl -L https://download.mikrotik.com/routeros/7.21.4/chr-7.21.4.img.zip | funzip | dd of=/dev/sda bs=1M
   ```

   >`/dev/sda` 设备名称可能因云服务商配置而异。

:::warning
请将 URL 替换为 MikroTik [下载页面](https://mikrotik.com/download) 上提供的最新 CHR 版本链接。
:::

## 重启服务器 {#reboot-the-server}

安装完成后，执行 `reboot` 命令重启服务器。
:::warning
立即保护 [RouterOS 安装](/docs/7.24/getting-started/securing-your-router) 至关重要！
:::

请确保保持 RouterOS 更新，并遵循最佳安全实践，以维护服务器的安全性和性能。
