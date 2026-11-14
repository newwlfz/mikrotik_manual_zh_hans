---
sidebar_key: "containers/user-guides/claire-homeassistant"
sidebar_position: 1
title: "将 Claire 与 hAP be³ Media 上的 Home Assistant 配对"
sidebar_label: "将 Claire 与 hAP be³ Media 上的 Home Assistant 配对"
description: "在 hAP be³ Media 上安装支持 Thread 的 Home Assistant 应用，并使用 Home Assistant Companion 应用配对一个 Claire 空气质量传感器。"
tags:
  - 'container'
  - 'homeassistant'
  - 'matter'
  - 'thread'
source: https://manual.mikrotik.com/docs/7.25/containers/user-guides/claire-homeassistant
captured_at: '2026-11-04T11:14:54+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

将您的 Claire 或 Claire Lite 空气质量传感器与 **hAP be³ Media** 上的 Home Assistant 配对，以便在手机或网页浏览器中查看传感器读数，并在自动化和提醒中使用这些读数。

Claire 通过 **Matter over Thread** 连接。路由器内置的 Thread 无线模块提供无线连接，而 **`homeassistant-thread`** 应用包含 Home Assistant、OpenThread Border Router 和 Matter server。

:::note
在较早的 RouterOS 版本中，此应用名为 **`ha-otbr-matter`**。请选择路由器应用目录中可用的、支持 Thread 的应用。
:::

## 开始之前 {#before-you-begin}

开箱即用时，hAP be³ Media 已配置 Apps，已安装所需软件包，并在 device-mode 中启用了容器支持。您可以直接继续进行 Home Assistant 应用安装。

请准备以下内容：

- 一台可访问互联网的 hAP be³ Media。
- 一个连接到路由器、用于应用存储的 USB 驱动器。如果该驱动器尚未在 RouterOS 中准备好使用，请遵循[磁盘设置说明](../../storage/index.md)。
- 已通电且位于路由器范围内的 Claire 或 Claire Lite。
- 一部已安装 Home Assistant Companion 应用、已启用蓝牙并可访问路由器 Wi-Fi 网络的手机。

将您的计算机和手机连接到路由器的本地网络，以便进行设置和配对。

如果您重新安装了 RouterOS 或重置了设备，请检查是否已安装 `container` 软件包，并且已在 [device-mode](../../system-information-and-utilities/device-mode.md) 中启用容器支持。如有必要，请恢复这些设置。确认 device-mode 更改需要物理接触路由器。如果缺少应用配置，请运行 Apps 设置向导。

## 安装 Home Assistant 应用 {#install-the-home-assistant-app}

1. 使用 WinBox 或 WebFig 连接到 hAP be³ Media，并打开 **App** 菜单。
2. 如果您尚未配置应用存储和网络，请选择 **Setup**。选择 USB 驱动器、您的 LAN 网桥以及路由器的 LAN IP 地址。详情请参阅 [Apps 设置向导](../apps/index.md#setup-wizard)。

   ![WinBox App setup wizard with usb1 selected as the Apps Disk.](/img/5a42992dfe165dd4.webp)

3. 选择 **`homeassistant-thread`**，或在较早的 RouterOS 版本中选择 **`ha-otbr-matter`**，然后选择 **Enable**。

   ![WinBox app catalog showing homeassistant-thread with Home Assistant, OpenThread Border Router, and Matter server.](/img/b37796d295e13187.webp)

4. 等待应用下载、解压并启动。该应用包含多个容器镜像，因此安装可能需要几分钟。
5. 打开应用的 **UI URL** 链接以访问 Home Assistant。

Apps 系统会自动配置容器及其网络。

## 在手机上设置 Home Assistant {#set-up-home-assistant-on-your-phone}

1. 在 Home Assistant 欢迎页面上，创建您的管理员账户并完成初始设置。
2. 在手机上打开 Home Assistant Companion 应用。
3. 选择您的 Home Assistant 实例。如果未自动发现，请输入您从 **UI URL** 打开的相同 URL。
4. 使用您在 Home Assistant 中创建的用户名和密码登录。
5. 允许配对请求的权限，包括蓝牙和相机访问权限。

使用手机上的 Companion 应用配对 Claire。配对后，您可以从 Companion 应用或 Home Assistant 网页界面查看其读数。

## 配对 Claire {#pair-claire}

1. 在 Home Assistant Companion 应用中，打开 **Settings → Devices & services** 并选择 **Matter**。
2. 选择 **Add device**。如果询问该设备是否已在使用，对于未配对的 Claire，请选择 **No, it's new**。按照提示打开二维码扫描器。
3. 在 Claire 上，按住侧边按钮 **3 秒** 以打开设置菜单。
4. 使用短按按钮在 **Pairing code** 上高亮。
5. 按住按钮 **1 秒** 以显示 Matter 配对二维码。
6. 使用 Companion 应用扫描 Claire 屏幕上的二维码，并等待配对完成。设置期间请将手机靠近 Claire。
7. 为设备命名并将其分配到一个区域，例如 **客厅**。

在没有按钮输入 30 秒后，Claire 会返回主屏幕。如果二维码在您扫描前消失，请再次打开 **Pairing code**。

## 查看传感器读数 {#view-sensor-readings}

在 Home Assistant 中，打开 **Settings → Devices & services → Matter** 并选择 Claire。其设备页面会显示可用的传感器读数。显示的传感器取决于您的 Claire 型号。

您可以将读数添加到仪表板，或创建自动化，例如当 CO₂ 超过您选择的阈值时发送通知。请保持 Claire 通电并处于 Thread 覆盖范围内，以便 Home Assistant 能够接收更新。

## 如果配对未完成 {#if-pairing-does-not-finish}

### 手机和二维码 {#phone-and-qr-code}

- 请通过手机上的 **Home Assistant Companion 应用** 进行配对。配对后使用网页界面查看读数。
- 启用蓝牙，并在系统请求时允许应用的相机、蓝牙或附近设备以及本地网络权限。配对期间请将手机靠近 Claire。
- 如果 iPhone 反复拒绝配对，请重启 iPhone，重新打开 Companion 应用，然后重试。
- 如果二维码消失，请再次在 Claire 上打开 **Pairing code**。在没有按钮输入 30 秒后，其屏幕会返回主视图。

### Home Assistant 和 Thread {#home-assistant-and-thread}

- 确认 **`homeassistant-thread`** 应用（或在较早的 RouterOS 版本中为 **`ha-otbr-matter`**）已完成启动，并且其 **UI URL** 可以打开。
- 让手机保持在路由器的本地 Wi-Fi 网络上。启用了客户端隔离的访客网络或手机上的 VPN 可能会阻止本地发现和通信，即使 Home Assistant 网页可以打开也是如此。请断开手机的 VPN，并使用主 LAN 进行配对。
- Matter 使用本地 IPv6 和组播发现。如果您自定义了路由器的网络或防火墙配置，请检查是否允许 IPv6 以及 Home Assistant、手机和 Thread 边界路由器之间所需的本地通信。
- 在 Home Assistant 中检查 **Settings → Devices & services** 里的 **Matter**、**Thread** 和 **OpenThread Border Router** 集成。在重试之前，请解决任何报告的设置错误。
- 如果手机提示需要 Thread 边界路由器，请检查 Thread 集成，并确认 hAP be³ Media 的 Thread 网络可用。如果您有多个 Thread 网络，请检查首选的是哪一个。在重试之前，请完成 Home Assistant 和 Companion 应用中的任何 Thread 凭据传输或同步提示。
- 设置期间，请将 Claire 移近 hAP be³ Media。配对后，请使其保持在 Thread 覆盖范围内，以便读数持续可用。

### 现有配对和传感器更新 {#existing-pairing-and-sensor-updates}

- 如果 Claire 已配对到另一个家庭，而您想替换该配对，请先使用 Claire 设置菜单中的 **Unpairing**，然后重复这些步骤。这会移除其现有配对。
- 通电后，请留出最多 10 分钟让 Claire 的传感器稳定。读数以不同间隔更新：CO₂ 每 30 秒更新一次，颗粒物每 5 分钟更新一次。读数在短时间内保持不变不一定表示存在连接问题。

有关按钮控制和取消配对说明，请参阅 [Claire 硬件手册](/hardware/iaqm-thc2pv-w-and-iaqm-thc2pv-g)。
