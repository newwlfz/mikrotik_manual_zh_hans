---
title: "手动网络设置（无默认配置）"
description: "如何手动设置没有默认配置的 MikroTik 路由器：重置为干净状态，创建网桥，分配 LAN IP 地址，并使用 CLI 或 WinBox/WebFig 配置 DHCP 服务器。"
tags:
  - 'dhcp'
source: https://manual.mikrotik.com/docs/7.25/getting-started/manual-network-setup
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

大多数 MikroTik 路由器出厂时带有[默认配置](/docs/7.24/getting-started/configuration-management/default-configurations)，其中已提供网桥、LAN IP 地址、DHCP 服务器和基本防火墙。如果保留默认配置，可以跳过本页。

仅在设备**没有默认配置**，或已将其重置为干净状态时，才执行以下步骤。

## 从干净配置开始 {#start-from-a-clean-configuration}

1. 将 Internet 网线连接到路由器的 **ether1** 端口。
2. 将计算机连接到任意其他 **Ethernet** 端口。
3. 打开 WinBox，并使用 Neighbor Discovery 查找路由器。详细操作请参阅 [WinBox 文章](/docs/7.24/management-tools/winbox)。
4. 选择路由器的 MAC 地址，然后点击 **Connect**。

要从完全干净的配置开始，请运行以下命令：

```ros
/system/reset-configuration no-defaults=yes skip-backup=yes
```

路由器将重启，且不会配置任何默认设置、防火墙规则或服务。

也可以从 WinBox 执行：

![](/img/36c689cf791cbd73.png)

## 创建网桥并分配 IP 地址 {#create-a-bridge-and-assign-an-ip-address}

由于 MAC 连接有时可能不可靠，第一步是启用 IP 连通性。这包括三个主要任务：

- 创建网桥接口并分配网桥端口
- 为网桥接口分配 IP 地址
- 配置 DHCP 服务器

<Tabs>
<TabItem value="cli" label="CLI" default>

创建网桥接口，将所需的以太网端口添加为网桥端口，并为网桥分配 IP 地址：

```ros
/interface/bridge/add name=bridge1
/interface/bridge/port/add interface=ether2 bridge=bridge1
/ip/address/add address=192.168.88.1/24 interface=bridge1
```

</TabItem>
<TabItem value="winbox" label="WinBox / WebFig">

1. 打开 **Bridge** 窗口，确保选中 **Bridge** 选项卡。
   - 点击 <kbd>**New**</kbd> 或 <kbd>**+**</kbd> 按钮以打开新对话框。可以输入自定义网桥名称，或保留默认 **bridge1**，然后点击 <kbd>**OK**</kbd> 继续。

     ![](/img/5e212f2237271f88.png)
2. Switch to the **Ports** tab and click the <kbd>**New**</kbd> or <kbd>**+**</kbd> button to open another dialog box.
   - Select **ether2** as the interface and **bridge1** as the bridge, then click <kbd>**OK**</kbd>. Repeat this step for each additional port that you want to add to the bridge.

     ![](/img/a838eb33fc38a49c.png)
   - You may close the bridge dialog.
3. Access the **IP** menu and navigate to the **Address** dialog.
   - Click the <kbd>**New**</kbd> or <kbd>**+**</kbd> button to open a new dialog box.
   - Enter IP address **`192.168.88.1/24`** and select interface **bridge1** from the dropdown list.

     ![](/img/895805f4eba17159.png)
   - Click <kbd>**OK**</kbd> to confirm the settings.

</TabItem>
</Tabs>

## 设置 DHCP 服务器 {#set-up-a-dhcp-server}

<Tabs>
<TabItem value="cli" label="CLI" default>

为简化并加快此过程，请运行 setup 命令。大多数配置选项会自动确定，因此只需按 <kbd>Enter</kbd> 接受每个值：

```ros
[admin@MikroTik] > ip dhcp-server/ setup [enter]
Select interface to run DHCP server on 

dhcp server interface: bridge1 [enter]
Select network for DHCP addresses 

dhcp address space: 192.168.88.0/24 [enter]
Select gateway for given network 

gateway for dhcp network: 192.168.88.1 [enter]
Select pool of ip addresses given out by DHCP server 

addresses to give out: 192.168.88.2-192.168.88.254 [enter]
Select DNS servers 

dns servers: 192.168.88.1 [enter]               
Select lease time 

lease time: 1800 [enter]
```

</TabItem>
<TabItem value="winbox" label="WinBox / WebFig">

DHCP Server Setup 向导也可在 [WinBox](/docs/7.24/management-tools/winbox) 和 [WebFig](/docs/7.24/management-tools/webfig) 中使用：

- 导航到 **IP → DHCP Server** 窗口，确保选中 **DHCP** 选项卡。
- 点击 <kbd>**DHCP Setup**</kbd> 按钮以打开新对话框。

  ![](/img/bc007e09d5e538fa.png)

- 选择 **bridge1** 作为 **DHCP Server Interface**，然后单击 <kbd>**Next**</kbd>。
- 按照向导完成设置。

</TabItem>
</Tabs>

按照这些步骤操作后，连接的 PC 应自动获取动态 IP 地址。然后可以关闭 WinBox，并使用 IP 地址 **`192.168.88.1`** 重新连接到路由器。

IP 连通正常后，继续阅读 [配置互联网连接](/docs/7.24/getting-started/first-time-configuration#configuring-the-internet-connection-wan) 以及首次配置指南的其余部分。
