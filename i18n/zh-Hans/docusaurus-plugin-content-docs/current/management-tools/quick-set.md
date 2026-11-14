---
sidebar_key: "management-tools/quick-set"
sidebar_position: 8
title: "快速设置"
sidebar_label: "快速设置"
description: "在 WinBox 中使用 Quick Set 设置 MikroTik 家用路由器：选择模式、配置 Wi-Fi、选择互联网连接类型，并通过带注释的截图查看本地网络设置。"
tags:
  - 'homeap'
  - 'quickset'
  - 'wireless'
source: https://manual.mikrotik.com/docs/management-tools/quick-set
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

**Quick Set** 将家用路由器的主要设置集中在一个页面上。在 WinBox 中，连接到路由器并选择左侧菜单中的 **Quick Set**。也可以通过路由器的 IP 地址在其 Web 界面中使用 Quick Set，在默认配置中通常是 `192.168.88.1`。

Quickset 适用于所有具有某种出厂默认配置的设备。没有配置的设备必须手动配置。最受欢迎且推荐的模式是 HomeAP（或 HomeAP dual，具体取决于设备）。此 Quickset 模式为家庭用户提供最简单的术语和最常用的选项。

使用 Quick Set 对具有默认配置的路由器进行初始设置。如果你已经在其他 WinBox 菜单或 WebFig 中更改了配置，请继续使用那些菜单：Quick Set 可能会覆盖手动配置的设置。

## 在 WinBox 中查找主要设置 {#find-the-main-settings-in-winbox}

编号标注显示了 **Home AP Dual** 的主要区域：

1. **模式** - 选择路由器的角色预设。Home AP Dual 为 2.4 GHz 和 5 GHz 无线电提供单独的网络名称。
2. **无线** - 设置网络名称和 Wi-Fi 密码。
3. **互联网** - 选择路由器如何获取其互联网地址。
4. **本地网络** - 查看 LAN 地址、DHCP 服务器和 NAT 设置。
5. **系统** - 打开更新或路由器密码对话框。
6. **确定 / 应用** - 查看后保存配置。**确定** 还会关闭窗口；**取消** 会在不应用未保存更改的情况下关闭窗口。

![WinBox Quick Set overview with numbered callouts for the mode, wireless settings, internet settings, local network, system controls, and save buttons](/img/7517d253ebe57556.webp)

:::note
截图显示的是现有路由器配置，而不是出厂默认值。网络名称、密码、设备标识符和客户端详细信息均已隐藏。此示例中防火墙、DHCP 服务器和 NAT 处于关闭状态；对于将 LAN 连接到互联网的家用路由器，请遵循互联网和本地网络部分中描述的设置。可用模式和字段取决于路由器型号和已安装的无线软件包。
:::

## 模式 {#modes}

根据路由器型号，Quickset 下拉菜单中提供不同的 Quickset 模式：

- **CAP**：受控接入点，一种由集中式 [CAPsMAN](../wireless/abgn/capsman/index.md) 服务器管理的 AP 设备。仅在你已经设置好 CAPsMAN 服务器时使用。
- **CPE**：客户端设备，用于连接到接入点 (AP) 设备。提供扫描所在区域 AP 设备的选项。
- **HomeAP**：大多数家庭用户默认的接入点配置页面。提供更少的选项和简化的术语。
- **HomeAP dual**：双频设备（2GHz/5GHz）。大多数家庭用户默认的接入点配置页面。提供更少的选项和简化的术语。
- **Home Mesh**：用于组建更大的 WiFi 网络。在路由器中启用 CAPsMAN 服务器，并将本地 WiFi 接口置于 CAPsMAN 控制之下。按住复位按钮启动其他 MikroTik WiFi AP，它们会加入此 HomeMesh 网络（详情请参阅其快速指南）。
- **PTP Bridge AP**：当你需要将两个远程位置透明互联到同一网络时，将一台设备设为此模式，并将另一台设备设为下一个（PTP Bridge CPE）模式。
- **PTP Bridge CPE**：当你需要将两个远程位置透明互联到同一网络时，将一台设备设为此模式，并将另一台设备设为上一个（PTP Bridge AP）模式。
- **WISP AP**：类似于 HomeAP 模式，但提供更高级的选项，并使用行业标准术语，例如 SSID 和 WPA。

## HomeAP {#homeap}

这是你应使用来快速配置家庭接入点的模式。

### 无线 {#wireless}

从截图中标记的两个控件开始：

1. 在 **网络名称** 中输入你的设备应看到的名称。例如，为两个无线电使用 `Home`，或使用 `Home` 和 `Home-5GHz` 来区分它们。
2. 在 **WiFi 密码** 中输入你的 Wi-Fi 密码。这是手机和计算机用来加入网络的密码；它与 **系统** 中的路由器管理员密码不同。

![WinBox Quick Set wireless settings with arrows to the network name fields and WiFi Password; the existing names and password are hidden](/img/65b5f53b28ef0314.webp)

应用配置时，更改网络名称或密码会断开 Wi-Fi 客户端。初次设置时，请用以太网线将计算机连接到 LAN 端口，以便在不丢失 Wi-Fi 连接的情况下完成配置。

在此部分设置您的无线网络：

- **网络名称**：你的智能手机如何看到你的网络？在此设置任意你喜欢的名称。在 HomeAP dual 中，你可以将 2GHz（传统）和 5GHz（现代）网络设为相同或不同的名称（见常见问题）。使用任意你喜欢的名称和格式。
- **频率**：通常可以保留 "Auto"，这样路由器会扫描环境，并选择占用最少的频率信道（仅执行一次）。如果需要进行实验，请使用自定义选择。
- **频段**：通常保留默认值（2GHz b/g/n 和 5GHz A/N/AC）。
- **使用访问列表 (ACL)**：如果你想根据用户的 MAC（硬件）地址限制谁可以连接到你的 AP，请启用此选项。要使用此选项，请先允许这些客户端连接，然后使用 "Copy to ACL" 按钮。这会将所选客户端复制到访问列表。构建访问列表 (ACL) 后，你可以启用此选项来禁止其他任何人尝试连接到你的设备。通常可以保持不动，因为无线密码已经提供了所需的限制。
- **WiFi 密码**：此处最重要的选项。设置一个安全密码，同时也会加密你的无线通信，这是连接到无线网络所必需的。
- **WPS accept**：使用此按钮向支持 WPS 连接模式的特定设备授予访问权限。对于打印机和其他难以输入密码的外设很有用。先在客户端设备中启动 WPS 模式，然后在此处选择一次 WPS 按钮以允许该设备。该按钮会工作几秒钟，并且按客户端逐一操作。
- **访客网络**：适用于不需要知道你主 WiFi 密码的家中访客。在此选项中为他们设置单独的密码。访客用户无法访问你 LAN 中的其他设备和其他访客设备。此模式会启用 Bridge 过滤器来阻止这种情况。
- **无线客户端**：此表格显示已连接的客户端设备（它们的 MAC 地址、是否在你的访问列表中、最后使用的 IP 地址、连接时长、以 dBm 和条形图表示的信号水平）。

### 互联网 {#internet}

使用标注来区分互联网连接和你的本地网络：

1. **地址获取** - 如果提供商通过 DHCP 提供地址，请选择 **Automatic**；如果提供固定地址详细信息，请选择 **Static**；如果提供 PPPoE 用户名和密码，请选择 **PPPoE**。输入提供商提供给你的详细信息；不要复制截图中的地址。
2. **防火墙路由器** - 对于将家庭网络连接到互联网的路由器，请启用此项。
3. **本地网络 > IP 地址** - 这是路由器在你 LAN 上的地址，与 **互联网** 部分中的地址不同。
4. **DHCP 服务器 / NAT** - 对于典型的家用路由器，启用 DHCP 服务器以为 LAN 客户端分配地址，并启用 NAT 以让它们共享互联网连接。

![WinBox Quick Set Internet and Local Network settings with arrows to Address Acquisition, Firewall Router, the LAN IP address, and DHCP Server and NAT](/img/ac3ae884f0c552e9.webp)

截图选中了 **Automatic**，因此互联网 IP 地址、子网掩码和网关由上游 DHCP 服务器提供。未勾选的选项属于此现有配置，而不是针对家用路由器的建议设置。

- **端口**：选择哪个端口连接到 ISP（互联网）调制解调器。通常是 Eth1。
- **地址获取**：选择 ISP 如何向您提供 IP 地址。请向您的服务提供商咨询此选项以及其他选项（IP 地址、子网掩码、网关）。
- **MAC 地址**：通常不应更改，除非您的 ISP 已将您绑定到特定 MAC 地址，并且您已将路由器更换为新路由器。
- **路由器防火墙**：这会为您的路由器和网络启用安全防火墙。请始终确保选中此复选框，以免从互联网端口访问您的设备。
- **MAC 服务器 / MAC Winbox**：允许从 LAN 端口侧以 MAC 地址模式使用 [Winbox 实用工具](https://mt.lv/winbox) 进行连接。当 IP 模式不可用时，可用于调试和恢复。仅供高级用户使用。
- **发现**：允许其他 RouterOS 设备通过型号名称识别此设备。

### 本地网络 {#local-network}

- **IP 地址**：大多数情况下可以保留默认值 192.168.88.1，除非你的路由器位于另一台路由器之后。为避免 IP 冲突，请更改为 192.168.89.1 或类似地址。
- **子网掩码**：大多数情况下可以保留 255.255.255.0。
- **桥接所有 LAN 端口**：允许你的设备相互通信，即使例如你的电视通过以太网 LAN 线缆连接，而你的 PC 通过 WiFi 连接。
- **DHCP 服务器**：通常，你希望家庭网络中使用自动 IP 地址配置，因此请将 DHCP 设置保持为 ON 并保留其默认值。
- **NAT**：仅当你的 ISP 为路由器和本地网络都提供了公网 IP 地址时，才将其关闭。否则，请保持 NAT 开启。
- **UPnP**：此选项会为受支持的程序和设备（例如你的 NAS 磁盘和点对点实用程序）启用自动端口转发（有些人称之为“向本地网络开放端口”）。请谨慎使用，因为此选项有时会在你不知情的情况下将内部设备暴露到互联网。仅在特别需要时启用。

### VPN {#vpn}

如果你想从互联网访问你的本地网络（以及你的路由器），请使用安全的 VPN 隧道。此选项会为你提供一个用于连接的域名，并启用 [PPTP](../virtual-private-networks/pptp.md) 和 [L2TP/IPsec](../virtual-private-networks/l2tp/index.md)（推荐后者）。用户名是 'vpn'，你可以指定自己的密码。你只需在此处启用它，然后在笔记本电脑或手机上提供地址、用户名和密码；连接到 VPN 后，你就能与家庭网络建立安全加密的连接。旅行时也很有用——你可以像从家中连接一样，通过安全线路浏览互联网。这也有助于避开某些国家/地区设置的地理限制。

### 系统 {#system}

- **检查更新**：打开 RouterOS 更新对话框以检查是否有更新的版本，并选择何时安装。
- **密码...**：设置路由器的管理员密码。这会保护对路由器配置的访问，并且与 **WiFi 密码** 不同。

查看无线、互联网和 LAN 设置后，选择 **确定** 保存并关闭 Quick Set，或选择 **应用** 保存并保持窗口打开。更改 LAN IP 地址可能会断开基于 IP 的 WinBox 会话；请使用新地址重新连接到路由器。更改 Wi-Fi 后，请使用新的网络名称和密码重新连接无线设备。

普通设置期间不要动 **重置配置**：它会重置路由器配置，而不是保存你的编辑。

## 常见问题 {#faq}

### 问：Quickset 与 Webfig 选项卡有何不同？在 Webfig 选项卡中会出现许多新菜单。 {#q-how-is-quickset-different-from-the-webfig-tab-where-a-bunch-of-new-menus-appear}

答：QuickSet 适合只需要让设备快速启动并运行的新用户。它在一个地方提供最常用的选项。如果你需要更多选项，请完全不要使用任何 QuickSet 设置；选择 "Webfig" 打开高级配置界面。完整功能将解锁。

### 问：我可以同时使用 Quickset 和 Webfig 吗？ {#q-can-i-use-quickset-and-webfig-together}

答：如果您打算使用 Quickset，就只使用 Quickset，反之亦然。虽然可以通过这种方式配置不冲突的设置，但不建议混用这些菜单。Router 模式和 Bridge 模式有什么区别？Bridge 模式会将所有接口加入网桥，允许转发二层数据包（充当集线器/交换机）。在 Router 模式下，数据包通过使用 IP 地址和 IP 路由在三层转发（充当路由器）。

### 问：在 HomeAP 模式下，2GHz 和 5GHz 网络名称应该相同还是不同？ {#q-in-homeap-mode-should-the-2ghz-and-5ghz-network-names-be-the-same-or-different}

答：如果你希望所有客户端设备（如电视、手机、游戏主机）自动选择最合适的网络，请将名称设为相同。如果你想强制客户端设备使用更快的 5GHz 802.11ac 连接，请将名称设为唯一。

### 问：我可以创建无安全设置的 AP（无密码），或在使用 QuickSet 时连接到这样的 AP 吗？ {#q-can-i-create-an-ap-without-security-settings---no-password-or-connect-to-such-ap-while-using-quickset}

答：QuickSet 默认使用 WPA2 预共享密钥。这意味着最小密码长度为 8 个字符，并且设备只能连接到受 WPA2 保护的 AP，或本身作为 AP 使用。对于无安全设置的配置，你需要使用 WinBox、Webfig 或控制台手动配置。
