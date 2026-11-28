---
title: "PtP GUI 故障转移示例"
description: "本指南演示如何使用 MikroTik RouterOS GUI 配置 60GHz 无线网桥和绑定 5GHz 接口之间的自动故障切换，包括网桥设置、无线模式选择以及用于无缝冗余的安全配置文件创建。"
tags:
  - 'bonding'
  - 'wireless'
  - 'winbox'
source: https://manual.mikrotik.com/docs/7.24/wireless/w60g/fail-over-ptp-gui-example
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 概述 {#summary}

此示例说明如何在 GUI 中配置自动故障切换（bonding）5Ghz 链路，并与 60Ghz 设备配合使用。  
当 60Ghz 无线连接丢失时，将自动使用 bonded 接口。  
该示例从空配置状态开始，使用 [[WinBox](https://mikrotik.com/download)] 工具完成。

### 连接到设备 {#connect-to-the-device}

配置重置后，只能使用 mac-telnet。在 WinBox 主界面中点击 Neighbours，选择设备的 MAC 地址并点击 Connect：

1. 选择正确的设备 **MAC Address**。
2. 默认登录名为“**admin**”，且未设置密码。
3. 点击 **Connect**。

![](/img/fa8bab19f7283e15.webp)

### 配置网桥 {#configure-bridge}

添加新网桥：

1. 打开 Bridge 子菜单；
2. 点击“+”添加新网桥；
3. 应用更改。

![](/img/c99185067ee63bea.webp)

*后续说明中需要为其分配网桥成员。这样可以在不路由的情况下，将流量从 Ethernet 传递到 W60G 接口。*

### 设置 60Ghz 无线连接 {#set-up-60ghz-wireless-connection}

前面介绍的所有步骤对于 **bridge** 和 **station** 设备均相同。配置无线接口时需要使用不同的模式。

按如下方式配置 **bridge** 设备：

1. 打开 Interface 菜单；
2. 双击 wlan60-1 接口；
3. 点击 Wireless 子菜单，并将 mode 设置为 **bridge**（对于 PtmP 则设置为 **ap-bridge**）；
4. 设置 SSID、密码和 region；
5. 在“Put Stations In Bridge”下选择之前创建的网桥；
6. 应用更改；
7. 按 Enable 开始发送信号。

![](/img/d697b1afd1973489.webp)

按如下方式配置 **station** 设备：

1. 打开 Interface 菜单；
2. 双击 wlan60-1 接口；
3. 点击 Wireless 子菜单，并将 mode 设置为 **station bridge**；
4. 设置 SSID 和密码；
5. 应用更改；
6. 按 enable 开始发送信号。

![](/img/b95c7f99cf4ba6e1.webp)

### 设置 5Ghz 无线连接 {#set-up-5ghz-wireless-connection}

#### 为设备选择 Security Profile {#choose-security-profile-for-your-devices}

1. 选择 **Wireless** 菜单；
2. 选择 **Security Profiles** 子菜单；
3. 使用“**+**”号添加新配置文件；
4. 选择 **a name**、**mode**、**authentication type** 和安全的密码；
5. **Apply** 配置。

**![](/img/152343ce0e0acf7d.webp)**

#### 对于网桥设备 {#for-bridge-device}

1. 打开 **Interfaces** 菜单；
2. 双击 **wlan1** 接口；
3. 进入 **Wireless** 子菜单，并将 mode 设置为 **bridge**（对于 PtmP 设置为 **ap-bridge**）；
4. 设置 **SSID**、**password** 和 **country**；
5. 点击 **Advanced Mode**；

![](/img/b548cbf46135d6c8.webp)

1. 选择 **Security Profile**；
2. **Apply** 更改；
3. 点击 **enable** 开始发射信号。

![](/img/111658df04501ba6.webp)

#### 对于站点设备 {#for-station-device}

1. 打开 **Interfaces** 菜单；
2. 双击 **wlan1** 接口；
3. 打开 **Wireless** 子菜单，并将 mode 设置为 **station-bridge**；
4. 设置 **SSID**、**password** 和 **country**；
5. 打开 **advanced** 模式（类似于网桥设备\*）；
6. 选择 **Security Profile**；
7. **Apply** 更改；
8. 点击 **enable** 开始发射信号。

![](/img/ccd706458bd9b7df.webp)

*如果所有操作均正确完成，应显示 running (R) 标志，如截图所示：*  
![](/img/6c356acee6743a8a.webp)

### 配置 bonding {#configure-bonding}

*在此设置中配置 bonding 并指定从属接口，此处选择内置 wlan1 接口，但在其他类型的设置中也可以是 ether 接口。*

#### 对于网桥设备 {#for-bridge-device-1}

1. 打开 **Bonding** 子菜单；
2. 使用“**+**”添加新成员；
3. 将接口成员（**wlan1** 和 **wlan60-station-1**）添加到 **bonding** 接口并作为 **Slaves**；
4. 将接口成员 **wlan60-station-1** 添加为 **Primary** 接口；
5. 选择 Mode 为 **active backup**；
6. **Apply** 配置。

![](/img/5dcc3469009f324b.webp)

#### 对于 station 设备 {#for-station-device-1}

1. 打开 **Bonding** 子菜单；
2. 使用“**+**”添加新成员；
3. 将接口成员（**wlan1** 和 **wlan60-1**）添加到 **bonding** 接口并作为 **Slaves**；
4. 将接口成员 **wlan60-1** 添加为 **Primary** 接口；
5. 选择 Mode 为 **active backup**；
6. **Apply** 配置。

![](/img/d305d625521b39c0.webp)

### 配置网桥 {#configure-bridge-1}

*要使 active-backup 在所使用设备上工作，必须配置包含 bonding 接口的网桥设置（本例中网桥设备和 station 设备的设置相同）：*

1. 打开 **Bridge** 子菜单；
2. 使用“**+**”添加新成员；
3. 将接口成员添加为 **ether1**，将 Bridge 成员添加为 **bridge1**；
4. **Apply** 配置；

*![](/img/e4b242fa377fc206.webp)*

1. 按 **Bridge** 子菜单；
2. 使用“**+**”添加新成员；
3. 将接口成员添加为 **bonding1**，将网桥成员添加为 **bridge1**；
4. **Apply** 配置。

*![](/img/3efb230842ca5e1b.webp)*

### 其他配置 {#additional-configuration}

接口从灰显状态启用后，将变为活动状态。

完成上述所有步骤后，应建立链路。建议在两台设备上设置管理员密码。
