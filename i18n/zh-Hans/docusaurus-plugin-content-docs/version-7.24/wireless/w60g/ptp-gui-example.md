---
sidebar_key: "wireless/w60g/ptp-gui-example"
sidebar_position: 6
title: "点对点图形界面示例"
sidebar_label: "点对点图形界面示例"
description: "本指南演示如何使用 WinBox 在两台 MikroTik W60G 设备之间配置透明无线桥接，内容涵盖接口设置、创建网桥、为 bridge 和 station 两种角色配置无线模式，以及额外的安全建议。"
tags:
  - 'bridging'
  - 'wireless'
  - 'winbox'
source: https://manual.mikrotik.com/docs/7.24/wireless/w60g/ptp-gui-example
captured_at: '2026-11-04T11:35:58+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 概述 {#summary}

本示例展示如何在 GUI 中配置从一台 W60G 设备到另一台 W60G 设备的透明无线桥接。

示例是在空配置状态下使用 [[WinBox](https://mikrotik.com/download)] 实用程序完成的

### 连接到设备 {#connect-to-the-device}

配置重置后，只能使用 mac-telnet。在 WinBox 主界面中点击 Neighbours，选择设备的 MAC 地址，然后点击 Connect：

![](/img/35b82e384ea98fed.webp)

### 配置 bridge {#configure-bridge}

添加一个新网桥并为其分配网桥成员。这样无需路由即可将流量从以太网传递到 W60G 接口：

1. 打开 Bridge 子菜单；
2. 点击 “+” 添加新的 bridge；
3. 应用更改。

![](/img/c99185067ee63bea.webp)

将接口成员（ether1 和 wlan60-1）添加到新建的网桥：

1. 点击 Ports 子菜单；
2. 使用“+”添加新成员；
3. 选择正确的接口；
4. 应用设置。

![](/img/d0275e2820cf50b4.webp)

![](/img/2d6695312a5e1d14.webp)

### 设置无线连接 {#set-up-wireless-connection}

之前说明的所有步骤对于 **bridge** 和 **station** 设备都是相同的。配置无线接口时需要使用不同的模式。

按如下方式配置 **bridge** 设备：

1. 打开 Interface 菜单；
2. 双击 wlan60-1 接口；
3. 点击 Wireless 子菜单并将模式设置为 **bridge**；
4. 设置 SSID、密码和区域；
5. 在“Put Stations In Bridge”下选择之前创建的网桥；
6. 应用更改；
7. 点击 enable 开始传输。

![](/img/7d465133495ed1ce.webp)

按如下方式配置 **station** 设备：

1. 打开 Interface 菜单；
2. 双击 wlan60-1 接口；
3. 点击 Wireless 子菜单并将模式设置为 **station bridge**；
4. 设置 SSID 和密码；
5. 应用更改；
6. 点击 enable 开始传输。

![](/img/a09cd3c87e452fe7.webp)

### 其他配置 {#additional-configuration}

接口从灰色状态启用后，将变为活动状态。

完成前面说明的所有步骤后，链路应已建立。建议在两台设备上设置管理员密码。

要创建点对多点设置：在 bridge 设备上必须设置 ap-bridge，在 station 设备上必须设置 station-bridge。
