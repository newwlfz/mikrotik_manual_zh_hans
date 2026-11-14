---
sidebar_key: "wireless/w60g/fail-over-ptp-gui-example"
sidebar_position: 4
title: "故障转移 PtP GUI 示例"
sidebar_label: "故障转移 PtP GUI 示例"
description: "本指南演示如何使用 MikroTik RouterOS GUI 在 60GHz 无线网桥与绑定 5GHz 接口之间配置自动故障切换，包括网桥设置、无线模式选择以及用于实现无缝冗余的安全配置文件创建。"
tags:
  - 'bonding'
  - 'wireless'
  - 'winbox'
source: https://manual.mikrotik.com/docs/7.24/wireless/w60g/fail-over-ptp-gui-example
captured_at: '2026-11-04T11:36:18+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 概述 {#summary}

本示例展示如何在 GUI 中配置与 60Ghz 设备结合使用的自动故障转移（bonding）5Ghz 链路。  
当 60Ghz 无线连接丢失时，它将自动使用 bonding 接口。  
本示例在空配置状态下使用 [[WinBox](https://mikrotik.com/download)] 实用工具完成。

### 连接到设备 {#connect-to-the-device}

配置重置后，只能使用 mac-telnet。在 WinBox 主界面中点击 Neighbours，选择设备的 MAC 地址，然后点击 Connect：

1. 选择正确的设备 **MAC 地址**。
2. 默认登录名为 “**admin**”，未设置密码。
3. 点击 **Connect**。

![](/img/fa8bab19f7283e15.webp)

### 配置 bridge {#configure-bridge}

添加新 bridge：

1. 打开 Bridge 子菜单；
2. 点击 “+” 添加新的 bridge；
3. 应用更改。

![](/img/c99185067ee63bea.webp)

*后续说明中需要为其分配 bridge 成员。这将允许流量从 Ethernet 传递到 W60G 接口而无需路由。*

### 设置 60GHz 无线连接 {#set-up-60ghz-wireless-connection}

之前说明的所有步骤对于 **bridge** 和 **station** 设备都是相同的。配置无线接口时需要使用不同的模式。

按如下方式配置 **bridge** 设备：

1. 打开 Interface 菜单；
2. 双击 wlan60-1 接口；
3. 点击 Wireless 子菜单并将模式设置为 **bridge**（对于 PtmP，使用 **ap-bridge**）；
4. 设置 SSID、密码和区域；
5. 在 “Put Stations In Bridge” 下选择之前创建的 bridge；
6. 应用更改；
7. 点击 Enable 开始传输。

![](/img/d697b1afd1973489.webp)

按如下方式配置 **station** 设备：

1. 打开 Interface 菜单；
2. 双击 wlan60-1 接口；
3. 点击 Wireless 子菜单并将模式设置为 **station bridge**；
4. 设置 SSID 和密码；
5. 应用更改；
6. 点击 enable 开始传输。

![](/img/b95c7f99cf4ba6e1.webp)

### 设置 5GHz 无线连接 {#set-up-5ghz-wireless-connection}

#### 为设备选择 Security Profile {#choose-security-profile-for-your-devices}

1. 选择 **Wireless** 菜单；
2. 选择 **Security Profiles** 子菜单；
3. 使用 “**+**” 符号添加新配置文件；
4. 选择 **名称**、**模式**、**身份验证类型** 和安全密码；
5. **Apply** 配置。

**![](/img/152343ce0e0acf7d.webp)**

#### 对于网桥设备 {#for-bridge-device}

1. 打开 **Interfaces** 菜单；
2. 双击 **wlan1** 接口；
3. 点击 **Wireless** 子菜单并将模式设置为 **bridge**（对于 PtmP，使用 **ap-bridge**）；
4. 设置 **SSID**、**密码** 和 **国家/地区**；
5. 点击 **Advanced Mode**；

![](/img/b548cbf46135d6c8.webp)

1. 选择您的 **Security Profile**；
2. **Apply** 更改；
3. 点击 **enable** 开始传输。

![](/img/111658df04501ba6.webp)

#### 对于站点设备 {#for-station-device}

1. 打开 **Interfaces** 菜单；
2. 双击 **wlan1** 接口；
3. 打开 **Wireless** 子菜单并将模式设置为 **station-bridge**；
4. 设置 **SSID**、**密码** 和 **国家/地区**；
5. 打开 **advanced** 模式（与 bridge 设备类似\*）；
6. 选择 **Security Profile**；
7. **Apply** 更改；
8. 点击 **enable** 开始传输。

![](/img/ccd706458bd9b7df.webp)

*如果一切操作正确，应出现 running (R) 标志，如截图所示：*  
![](/img/6c356acee6743a8a.webp)

### 配置 bonding {#configure-bonding}

*配置 bonding 并分配从接口；在本设置中，选择内置 wlan1 接口，但在其他类型的设置中，它也可以是 ether 接口。*

#### 对于网桥设备 {#for-bridge-device-1}

1. 点击 **Bonding** 子菜单；
2. 使用 “**+**” 添加新成员；
3. 将接口成员（**wlan1** 和 **wlan60-station-1**）作为 **Slaves** 添加到 **bonding** 接口；
4. 将接口成员 **wlan60-station-1** 添加为 **Primary** 接口；
5. 将 Mode 选择为 **active backup**；
6. **Apply** 配置。

![](/img/5dcc3469009f324b.webp)

#### 对于站点设备 {#for-station-device-1}

1. 点击 **Bonding** 子菜单；
2. 使用 “**+**” 添加新成员；
3. 将接口成员（**wlan1** 和 **wlan60-1**）作为 **Slaves** 添加到 **bonding** 接口；
4. 将接口成员 **wlan60-1** 添加为 **Primary** 接口；
5. 将 Mode 选择为 **active backup**；
6. **Apply** 配置。

![](/img/d305d625521b39c0.webp)

### 配置 bridge {#configure-bridge-1}

*配置 bridge 设置（包括 bonding 接口）对于 active-backup 在所用设备上生效是必需的（在本例中，bridge 和 station 设备的设置相同）：*

1. 点击 **Bridge** 子菜单；
2. 使用 “**+**” 添加新成员；
3. 将接口成员添加为 **ether1**，将 Bridge 成员添加为 **bridge1**；
4. **Apply** 配置；

*![](/img/e4b242fa377fc206.webp)*

1. 点击 **Bridge** 子菜单；
2. 使用 “**+**” 添加新成员；
3. 将接口成员添加为 **bonding1**，将 Bridge 成员添加为 **bridge1**；
4. **Apply** 配置。

*![](/img/3efb230842ca5e1b.webp)*

### 其他配置 {#additional-configuration}

接口从灰色状态启用后，将变为活动状态。

完成之前说明的所有步骤后，应建立链路。建议在两台设备上设置管理员密码。
