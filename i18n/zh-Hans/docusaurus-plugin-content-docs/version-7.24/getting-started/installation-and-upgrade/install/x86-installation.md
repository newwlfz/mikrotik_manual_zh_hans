---
title: "x86 安装"
description: "本页提供在 x86 硬件上通过 USB 或 Netinstall 安装 RouterOS 的分步指南，涵盖 Windows/Linux/macOS 方法、BIOS 设置调整以及启动优先级配置，以确保安装成功。"
tags:
  - 'usb'
  - 'installation'
  - 'boot-priority'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/install/x86-installation
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## USB

### 分步指南 {#step-by-step-guide}

1. 从下载页面下载 x86 CD 镜像文件：https://mikrotik.com/download

    - 在 Windows 系统上：

        - 下载 Rufus：https://github.com/pbatard/rufus/releases（使用最新版本）
        - 连接 USB 驱动器并打开 Rufus
        - 选择下载的 ISO 镜像并点击 **START**

    - 在 Linux、FreeBSD 或 macOS 系统上：

        :::danger
        警告！请仔细确认设备地址 — `dd` 可能会不可逆地破坏数据。
        :::

        - 连接 USB 驱动器并识别其设备地址

            macOS:

            ```text
            diskutil list
            ```

            Linux / FreeBSD：

            ```text
            fdisk -l
            ```

        - 在使用 `dd` 命令之前，确保 USB 驱动器已格式化，并且所有旧数据均已清除

    使用 `dd` 将镜像写入磁盘：

    ```bash
    dd if=<your_downloaded_routeros_ISO> of=<disk_address> bs=1M status=progress
    ```

    macOS:

    ```bash
    dd if=<your_downloaded_routeros_ISO> of=<disk_address> bs=1m status=progress
    ```

    过程完成后，将 USB 驱动器连接到 x86 系统并从中启动。

    按键盘上的 **“i”** 继续安装。

    重启后，将安装 RouterOS。

应在 BIOS 设置中调整启动优先级。如果 RouterOS 安装在 NVMe 驱动器上，则 USB 必须以 UEFI 模式启动。

确保 BIOS 启动设置中禁用了 CSM（Compatibility Support Module）。

## 使用 Netinstall 安装 x86 系统 {#install-the-x86-system-using-netinstall}

1. 下载适用于你系统的 Netinstall 工具，并在 PC 上运行
2. 从下载页面下载 x86 CD 镜像文件：https://mikrotik.com/download
3. 将 PC BIOS 启动选项设置为 PXE
4. 保存更改并重启
5. 按照 Netinstall 工具的步骤继续操作
