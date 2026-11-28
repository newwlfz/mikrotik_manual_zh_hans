---
title: "在 hAP be³ Media 上将 Claire 与 Home Assistant 配对"
description: "在 hAP be³ Media 上安装支持 Thread 的 Home Assistant app，并使用 Home Assistant Companion app 配对 Claire 空气质量传感器。"
tags:
  - 'container'
  - 'homeassistant'
  - 'matter'
  - 'thread'
source: https://manual.mikrotik.com/docs/7.25/containers/user-guides/claire-homeassistant
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

将 Claire 或 Claire Lite 空气质量传感器与 **hAP be³ Media** 上的 Home Assistant 配对，以便在手机或 Web 浏览器中查看传感器读数，并将其用于自动化和告警。

Claire 通过 **Matter over Thread** 连接。路由器内置的 Thread 无线电提供无线连接，**`homeassistant-thread`** 应用包含 Home Assistant、OpenThread Border Router 和 Matter 服务器。

:::note
在较早的 RouterOS 版本中，该应用名为 **`ha-otbr-matter`**。请选择路由器目录中可用的支持 Thread 的应用。
:::

## 开始之前 {#before-you-begin}

开箱即用时，hAP be³ Media 已配置 Apps，已安装所需软件包，并已在 device-mode 中启用容器支持。你可以直接进行 Home Assistant 应用安装。

准备以下内容：

- 一台可访问互联网的 hAP be³ Media。
- 一个连接到路由器用于应用存储的 USB 驱动器。如果该驱动器尚未在 RouterOS 中准备好使用，请按照[磁盘设置说明](/docs/storage)操作。
- 一个已通电且位于路由器覆盖范围内的 Claire 或 Claire Lite。
- 一部已安装 Home Assistant Companion 应用、已启用蓝牙并可访问路由器 Wi-Fi 网络的手机。

将计算机和手机连接到路由器的本地网络，以进行设置和配对。

如果已重新安装 RouterOS 或重置设备，请检查是否已安装 `container` 软件包，并确认已在 [device-mode](/docs/system-information-and-utilities/device-mode) 中启用容器支持。必要时恢复这些设置。确认 device-mode 变更需要对路由器进行物理访问。如果应用配置缺失，请运行 Apps 设置向导。

## 安装 Home Assistant 应用 {#install-the-home-assistant-app}

1. 使用 WinBox 或 WebFig 连接到 hAP be³ Media，并打开 **App** 菜单。
2. 如果尚未配置应用存储和网络，请选择 **Setup**。选择 USB 驱动器、LAN 网桥和路由器的 LAN IP 地址。详情请参阅 [Apps setup wizard](/docs/containers/apps#setup-wizard)。

   ![WinBox App setup wizard with usb1 selected as the Apps Disk.](/img/5a42992dfe165dd4.webp)

3. 选择 **`homeassistant-thread`**，或在较早的 RouterOS 版本中选择 **`ha-otbr-matter`**，然后选择 **Enable**。

   ![WinBox app catalog showing homeassistant-thread with Home Assistant, OpenThread Border Router, and Matter server.](/img/b37796d295e13187.webp)

4. 等待应用下载、解压并启动。该应用包含多个容器镜像，因此安装可能需要几分钟。
5. 打开应用的 **UI URL** 链接以访问 Home Assistant。

Apps 系统会自动配置容器及其网络。

## 在手机上设置 Home Assistant {#set-up-home-assistant-on-your-phone}

1. 在 Home Assistant 欢迎页面上，创建管理员账户并完成初始设置。
2. 在手机上打开 Home Assistant Companion 应用。
3. 选择你的 Home Assistant 实例。如果未自动发现，请输入从 **UI URL** 打开的同一 URL。
4. 使用你在 Home Assistant 中创建的用户名和密码登录。
5. 允许配对所需的权限，包括蓝牙和相机访问权限。

使用手机上的 Companion app 配对 Claire。配对后，可以从 Companion app 或 Home Assistant Web 界面查看其读数。

## 配对 Claire {#pair-claire}

1. 在 Home Assistant Companion app 中，打开 **Settings → Devices & services** 并选择 **Matter**。
2. 选择 **Add device**。如果系统询问设备是否已被使用，对于未配对的 Claire，请选择 **No, it's new**。按照提示打开二维码扫描器。
3. 在 Claire 上，按住侧边按钮 **3 秒**以打开设置菜单。
4. 短按按钮，高亮显示 **Pairing code**。
5. 按住按钮 **1 秒**，显示 Matter 配对二维码。
6. 使用 Companion app 扫描 Claire 屏幕上的二维码，并等待配对完成。设置期间请让手机靠近 Claire。
7. 为设备指定名称，并将其分配到某个区域，例如 **Living room**。

如果 30 秒内没有按钮输入，Claire 会返回主屏幕。如果二维码在扫描前消失，请再次打开 **Pairing code**。

## 查看传感器读数 {#view-sensor-readings}

在 Home Assistant 中，打开 **Settings → Devices & services → Matter** 并选择 Claire。其设备页面会显示可用的传感器读数。显示的传感器取决于你的 Claire 型号。

可以将读数添加到仪表板，或创建自动化，例如当 CO₂ 超过你选择的阈值时发送通知。保持 Claire 通电并处于 Thread 覆盖范围内，以便 Home Assistant 接收更新。

## 如果配对未完成 {#if-pairing-does-not-finish}

### 手机和二维码 {#phone-and-qr-code}

- 使用手机上的 **Home Assistant Companion app** 配对。配对后，使用 Web 界面查看读数。
- 启用蓝牙，并在应用请求时允许其相机、蓝牙或附近设备以及本地网络权限。配对期间，让手机靠近 Claire。
- 如果 iPhone 反复无法配对，请重启 iPhone，重新打开 Companion app，然后重试。
- 如果二维码消失，请在 Claire 上再次打开 **Pairing code**。如果 30 秒内没有按钮输入，其屏幕会返回主视图。

### Home Assistant 和 Thread {#home-assistant-and-thread}

- 确认 **`homeassistant-thread`** 应用，或早期 RouterOS 版本中的 **`ha-otbr-matter`** 应用，已完成启动，并且其 **UI URL** 可以打开。
- 让手机连接到路由器的本地 Wi-Fi 网络。启用客户端隔离的访客网络或手机上的 VPN 可能会阻止本地发现和通信，即使 Home Assistant 网页可以打开也是如此。请断开手机的 VPN，并使用主 LAN 进行配对。
- Matter 使用本地 IPv6 和多播发现。如果自定义过路由器的网络或防火墙配置，请检查是否允许 IPv6 以及 Home Assistant、手机和 Thread 边界路由器之间所需的本地通信。
- 在 Home Assistant 中检查 **Settings → Devices & services**，查看 **Matter**、**Thread** 和 **OpenThread Border Router** 集成。重试前，请解决报告的任何设置错误。
- 如果手机报告需要 Thread 边界路由器，请检查 Thread 集成，并确认 hAP be³ Media Thread 网络可用。如果有多个 Thread 网络，请检查首选的是哪一个。重试前，请在 Home Assistant 和 Companion app 中完成所有 Thread 凭据传输或同步提示。
- 设置期间，将 Claire 移近 hAP be³ Media。配对后，让其保持在 Thread 覆盖范围内，以确保读数持续可用。

### 现有配对和传感器更新 {#existing-pairing-and-sensor-updates}

- 如果 Claire 已配对到其他家庭，并且你想替换该配对，请在重复这些步骤之前，使用 Claire 设置菜单中的 **Unpairing**。此操作会移除其现有配对。
- 上电后，最多等待 10 分钟，让 Claire 的传感器稳定。读数按不同间隔更新：CO₂ 每 30 秒更新一次，颗粒物每 5 分钟更新一次。读数在短时间内保持不变，不一定表示连接存在问题。

有关按钮控制和取消配对说明，请参阅 [Claire hardware manual](/hardware/iaqm-thc2pv-w-and-iaqm-thc2pv-g)。
