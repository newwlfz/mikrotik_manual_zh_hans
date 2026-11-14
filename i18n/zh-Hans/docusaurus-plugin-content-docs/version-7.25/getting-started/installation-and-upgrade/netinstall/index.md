---
sidebar_key: "getting-started/installation-and-upgrade/netinstall/index"
sidebar_position: 2
title: "网络安装"
sidebar_label: "网络安装"
description: "本页介绍 Netinstall——用于安装和重新安装 RouterOS 的 MikroTik 工具，帮助在 Windows、Linux 和 Netinstall 软件包方法之间进行选择，并描述使用 Etherboot 模式的常见设备安装工作流程。"
tags:
  - 'netinstall'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/netinstall
captured_at: '2026-11-04T11:16:33+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Netinstall 是一个用于在 MikroTik 设备上安装和重新安装 RouterOS 的实用工具。它可用于恢复无法访问的设备、执行全新安装，或在系统损坏或配置错误时重新安装 RouterOS。

该工具提供 Windows 版本（图形界面）和 Linux 版本（命令行）。从 RouterOS 7.24beta1 开始，除 SMIPS 设备外，所有 MikroTik 架构均提供 **Netinstall 软件包**。

## 选择 Netinstall 方法 {#choose-a-netinstall-method}

选择与你的环境相匹配的安装方法：

- [Windows 版 Netinstall](./netinstall-windows.md) - 适用于 Windows 系统的图形界面。
- [Linux 版 Netinstall](./netinstall-linux.md) - 适用于 Linux 系统的命令行工具。
- [**Netinstall 软件包**](./netinstall-package.md) - 可直接在受支持的 MikroTik 设备上启用 Netinstall 功能的 RouterOS 软件包。

你可以从 [MikroTik 下载](https://mikrotik.com/download)页面下载 Netinstall 工具和 RouterOS 软件包。

:::danger
Netinstall 会重新格式化系统驱动器，这会清除所有配置数据和用户文件。

Netinstall 不会移除 RouterOS 许可证密钥，也不会重置 RouterBOOT 设置。例如，重新安装期间 CPU 频率保持不变。
:::

## 使用 Netinstall 的设备安装工作流程 {#device-installation-workflow-using-netinstall}

以下工作流程适用于所有 Netinstall 方法。

### 准备 Netinstall 主机 {#prepare-the-netinstall-host}

在与待重装设备连接到同一二层（L2）网段的计算机或 MikroTik 路由器上启动 Netinstall。为获得最佳效果，请使用专用网络接口以及简单的交换机或集线器，以避免 IP、DHCP 或 BOOTP 冲突。

### 将设备启动到 Etherboot 模式 {#boot-the-device-into-etherboot-mode}

Etherboot 模式是 MikroTik 设备上的一种特殊启动状态，允许你使用 Netinstall 重新安装 RouterOS。

有两种 booter 选项可用：**常规 Booter** 和**备份 Booter**。建议同时验证这两种选项，以防其中一种无法使用。

- **常规 Booter：** 要通过串行控制台进入 etherboot 模式，请按住 <kbd>Control</kbd>+<kbd>E</kbd>。或者，在设备通电后等待 1–2 秒再按下 **Reset** 按钮。

- **Backup Booter:** 关闭设备。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，可通过 Netinstall 重新安装 RouterOS。视型号而定，这可能由 **USR, USER, System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

### 安装设备 {#install-the-device}

使用 Netinstall 安装 RouterOS，并配置所需的软件包、参数和配置脚本。

## 其他参考 {#additional-references}

- [RouterOS 配置管理](../../configuration-management/index.md)
- [RouterOS 软件包](../packages.md)
- [RouterBOOT 配置](../routerboot.md)
- [MikroTik 下载](https://mikrotik.com/download)
