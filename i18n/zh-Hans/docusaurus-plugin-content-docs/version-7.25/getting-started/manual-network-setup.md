---
sidebar_key: "getting-started/manual-network-setup"
sidebar_position: 2
title: "手动网络设置（无默认配置）"
sidebar_label: "手动网络设置"
description: "如何手动设置没有默认配置的 MikroTik 路由器：重置为干净状态、创建 bridge、分配 LAN IP 地址，并使用 CLI 或 WinBox/WebFig 配置 DHCP 服务器。"
tags:
  - 'dhcp'
source: https://manual.mikrotik.com/docs/7.25/getting-started/manual-network-setup
captured_at: '2026-11-04T11:17:03+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

大多数 MikroTik 路由器都自带[默认配置](./configuration-management/default-configurations.md)，其中已经提供了网桥、LAN IP 地址、DHCP 服务器和基础防火墙。如果你保留默认配置，可以跳过本页。

仅当你的设备**没有默认配置**，或者你已将其重置为干净状态时，才需要按照以下步骤操作。

## 从干净配置开始 {#start-from-a-clean-configuration}

1. 将网线连接到路由器的 **ether1** 端口。
2. 将你的计算机连接到任意其他 **以太网** 端口。
3. 打开 WinBox，使用邻居发现（Neighbor Discovery）定位路由器。详细说明请参阅 [WinBox 文章](../management-tools/winbox.md)。
4. 选择路由器的 MAC 地址并点击 **Connect**。

要从完全干净的配置开始，请运行以下命令：

```ros
/system/reset-configuration no-defaults=yes skip-backup=yes
```

路由器将重启，且不包含任何默认设置、防火墙规则或已配置的服务。

或者在 WinBox 中操作：

![](/img/36c689cf791cbd73.png)

## 创建网桥并分配 IP 地址 {#create-a-bridge-and-assign-an-ip-address}

由于 MAC 连接有时可能不可靠，第一步是启用 IP 连通性。这涉及三个主要任务：

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
   - 点击 <kbd>**New**</kbd> 或 <kbd>**+**</kbd> 按钮以打开新对话框。你可以输入自定义网桥名称，或保留默认的 **bridge1**，然后点击 <kbd>**OK**</kbd> 继续。

     ![](/img/5e212f2237271f88.png)
2. 切换到 **Ports** 选项卡，点击 <kbd>**New**</kbd> 或 <kbd>**+**</kbd> 按钮以打开另一个对话框。
   - 选择 **ether2** 作为接口、**bridge1** 作为网桥，然后点击 <kbd>**OK**</kbd>。对于要添加到网桥的每个额外端口，重复此步骤。

     ![](/img/a838eb33fc38a49c.png)
   - 你可以关闭网桥对话框。
3. 进入 **IP** 菜单并导航到 **Address** 对话框。
   - 点击 <kbd>**New**</kbd> 或 <kbd>**+**</kbd> 按钮以打开新对话框。
   - 输入 IP 地址 **`192.168.88.1/24`**，并从下拉列表中选择接口 **bridge1**。

     ![](/img/895805f4eba17159.png)
   - 点击 <kbd>**OK**</kbd> 确认设置。

</TabItem>
</Tabs>

## 设置 DHCP 服务器 {#set-up-a-dhcp-server}

<Tabs>
<TabItem value="cli" label="CLI" default>

为了简化和加快此过程，请运行设置命令。大多数配置选项会自动确定，因此你只需按 <kbd>Enter</kbd> 接受每个值：

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

DHCP Server Setup 向导也可在 [WinBox](../management-tools/winbox.md) 和 [WebFig](../management-tools/webfig.md) 中使用：

- 导航到 **IP → DHCP Server** 窗口，确保选中 **DHCP** 选项卡。
- 点击 <kbd>**DHCP Setup**</kbd> 按钮以打开新对话框。

  ![](/img/bc007e09d5e538fa.png)

- 选择 **bridge1** 作为 **DHCP Server Interface**，然后点击 <kbd>**Next**</kbd>。
- 按照向导完成设置。

</TabItem>
</Tabs>

按照这些步骤操作后，已连接的 PC 应能自动获取动态 IP 地址。然后你可以关闭 WinBox，并使用 IP 地址 **`192.168.88.1`** 重新连接到路由器。

当 IP 连通性正常后，请继续阅读[配置互联网连接](./first-time-configuration.md#configuring-the-internet-connection-wan)以及首次配置指南的其余部分。
