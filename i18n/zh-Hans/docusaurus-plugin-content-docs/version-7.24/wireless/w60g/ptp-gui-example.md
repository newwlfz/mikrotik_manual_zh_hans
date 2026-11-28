---
title: "PtP GUI 示例"
description: "本指南演示如何使用 WinBox 在两台 MikroTik W60G 设备之间配置透明无线网桥，涵盖接口设置、网桥创建、网桥和 station 角色的无线模式配置，以及额外的安全建议。"
tags:
  - 'bridging'
  - 'wireless'
  - 'winbox'
source: https://manual.mikrotik.com/docs/7.24/wireless/w60g/ptp-gui-example
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "wireless/user-guides"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 概述 {#summary}

本示例说明如何在 GUI 中将一台 W60G 设备配置为到另一台 W60G 设备的透明无线网桥。

示例从空配置状态开始，使用 [[WinBox](https://mikrotik.com/download)] 工具完成。

### 连接到设备 {#connect-to-the-device}

重置配置后，只能使用 mac-telnet。在 WinBox 主界面中点击 Neighbours，选择设备的 MAC 地址，然后点击 Connect：

![](/img/35b82e384ea98fed.webp)

### 配置网桥 {#configure-bridge}

添加新网桥并为其指定网桥成员。这样可以在不路由的情况下，将流量从 Ethernet 传递到 W60G 接口：

1. 打开 Bridge 子菜单；
2. 点击“+”添加新网桥；
3. 应用更改。

![](/img/c99185067ee63bea.webp)

将接口成员（ether1 和 wlan60-1）添加到新建的网桥中：

1. 按 Ports 子菜单；
2. 使用“+”添加新成员；
3. 选择正确的接口；
4. 应用设置。

![](/img/d0275e2820cf50b4.webp)

![](/img/2d6695312a5e1d14.webp)

### 设置无线连接 {#set-up-wireless-connection}

前面说明的所有步骤对 **bridge** 和 **station** 设备相同。配置无线接口时需要使用不同的模式。

按如下方式配置 **bridge** 设备：

1. 打开 Interface 菜单；
2. 双击 wlan60-1 接口；
3. 按 Wireless 子菜单，并将 mode 设置为 **bridge**；
4. 设置 SSID、密码和 region；
5. 在“Put Stations In Bridge”下选择之前创建的网桥；
6. 应用更改；
7. 按 enable 开始发送。

![](/img/7d465133495ed1ce.webp)

按如下方式配置 **station** 设备：

1. 打开 Interface 菜单；
2. 双击 wlan60-1 接口；
3. 按 Wireless 子菜单，并将 mode 设置为 **station bridge**；
4. 设置 SSID 和密码；
5. 应用更改；
6. 按 enable 开始发送。

![](/img/a09cd3c87e452fe7.webp)

### 其他配置 {#additional-configuration}

接口从灰显状态启用后，将变为活动状态。

完成上述所有步骤后，应建立链路。建议在两台设备上设置管理员密码。

要创建点对多点配置：在网桥设备上必须设置 ap-bridge，在站点上设置 station-bridge。
