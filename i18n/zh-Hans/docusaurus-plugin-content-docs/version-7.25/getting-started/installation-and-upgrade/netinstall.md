---
title: "Netinstall"
description: "本页介绍 Netinstall，即用于安装和重新安装 RouterOS 的 MikroTik 工具，帮助在 Windows、Linux 和 Netinstall 软件包方法之间进行选择，并说明使用 Etherboot 模式进行设备安装的通用流程。"
tags:
  - 'netinstall'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/netinstall
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "memory"
---

Netinstall 是用于在 MikroTik 设备上安装和重新安装 RouterOS 的工具。它可用于恢复无法访问的设备、执行干净安装，或在系统损坏或配置错误时重新安装 RouterOS。

该工具提供 Windows 版本（图形界面）和 Linux 版本（命令行）。从 RouterOS 7.24beta1 开始，**Netinstall package** 可用于除 SMIPS 设备之外的所有 MikroTik 架构。

## 选择 Netinstall 方法 {#choose-a-netinstall-method}

选择与你的环境相匹配的安装方法：

- [**Windows Netinstall**](/docs/7.24/getting-started/installation-and-upgrade/netinstall/netinstall-windows) - Windows 系统的图形界面。
- [**Linux Netinstall**](/docs/7.24/getting-started/installation-and-upgrade/netinstall/netinstall-linux) - Linux 系统的命令行工具。
- [**Netinstall Package**](/docs/7.24/getting-started/installation-and-upgrade/netinstall/netinstall-package) - 可在受支持的 MikroTik 设备上直接启用 Netinstall 功能的 RouterOS 软件包。

你可以从 [MikroTik Downloads](https://mikrotik.com/download) 页面下载 Netinstall 工具和 RouterOS 软件包。

:::danger
Netinstall 会重新格式化系统盘，这将清除所有配置数据和用户文件。

Netinstall 不会移除 RouterOS 许可证密钥，也不会重置 RouterBOOT 设置。例如，重新安装期间 CPU 频率保持不变。
:::

## 使用 Netinstall 安装设备的流程 {#device-installation-workflow-using-netinstall}

以下流程适用于所有 Netinstall 方法。

### 准备 Netinstall 主机 {#prepare-the-netinstall-host}

在与待重装设备相同的 Layer 2（L2）网络段中的计算机或 MikroTik 路由器上启动 Netinstall。为获得最佳效果，请使用专用网络接口和简单交换机或集线器，以避免 IP、DHCP 或 BOOTP 冲突。

### 将设备引导至 Etherboot 模式 {#boot-the-device-into-etherboot-mode}

Etherboot 模式是 MikroTik 设备上的一种特殊启动状态，允许你使用 Netinstall 重装 RouterOS。

有两种 booter 选项：**Regular Booter** 和 **Backup Booter**。建议验证这两个选项，以防其中一个不起作用。

- **Regular Booter：** 要使用串行控制台进入 etherboot 模式，请按住 <kbd>Control</kbd>+<kbd>E</kbd>。或者，在设备通电并等待 1–2 秒后，按下 **Reset** 按钮。

- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后打开设备电源。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将引导进入 **BOOTP** 模式，准备通过 Netinstall 重装 RouterOS。根据型号不同，这可能由 **USR、USER、System** 或 **ACT** LED 指示，也可能由 SFP 端口 LED 指示。

### 安装设备 {#install-the-device}

使用 Netinstall 安装包含所需软件包、参数和配置脚本的 RouterOS。

## 其他参考 {#additional-references}

- [RouterOS configuration management](/docs/getting-started/configuration-management)
- [RouterOS packages](/docs/getting-started/installation-and-upgrade/packages)
- [RouterBOOT configuration](/docs/getting-started/installation-and-upgrade/routerboot)
- [MikroTik downloads](https://mikrotik.com/download)
