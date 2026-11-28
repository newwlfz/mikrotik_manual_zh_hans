---
title: "快速设置"
description: "Quickset 是 MikroTik 路由器的简化配置向导，提供 HomeAP、CPE、CAP 等模式，用于家庭或企业环境的快速设置。它将无线网络、互联网连接、本地网络设置、VPN 选项和系统管理集中在一个界面中。"
tags:
  - 'homeap'
  - 'quickset'
  - 'wireless'
source: https://manual.mikrotik.com/docs/7.24/management-tools/quick-set
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 摘要 {#summary}

**Quickset** 是一个简单的配置向导页面，可通过几次点击准备好路由器。在 Web 浏览器中打开默认 IP 地址 192.168.88.1 时，用户看到的第一个界面就是它。

Quickset 适用于所有出厂时带有某种默认配置的设备。没有配置的设备必须手动配置。最常用且推荐的模式是 HomeAP（或 HomeAP dual，取决于设备）。该 Quickset 模式为家庭用户提供最简单的术语和最常见的选项。

### Modes

根据路由器型号，Quickset 下拉菜单中可能提供不同的 Quickset 模式：

- **CAP**：Controlled Access Point，即由集中式 CAPsMAN 服务器管理的 AP 设备。仅在已设置 CAPsMAN 服务器时使用。
- **CPE**：客户端设备，将连接到 Access Point（AP）设备。提供扫描所在区域 AP 设备的选项。
- **HomeAP**：适合大多数家庭用户的默认 Access Point 配置页面。提供更少的选项和简化的术语。
- **HomeAP dual**：双频设备（2GHz/5GHz）。适合大多数家庭用户的默认 Access Point 配置页面。提供更少的选项和简化的术语。
- **Home Mesh**：用于构建更大的 WiFi 网络。启用路由器中的 CAPsMAN 服务器，并将本地 WiFi 接口置于 CAPsMAN 控制之下。只需按住重置按钮启动其他 MikroTik WiFi AP，它们就会加入此 HomeMesh 网络（详情请参阅其快速指南）。
- **PTP Bridge AP**：当需要在同一网络中透明互连两个远程位置时，将一台设备设置为此模式，另一台设备设置为下一种（PTP Bridge CPE）模式。
- **PTP Bridge CPE**：当需要在同一网络中透明互连两个远程位置时，将一台设备设置为此模式，另一台设备设置为上一种（PTP Bridge AP）模式。
- **WISP AP**：类似于 HomeAP 模式，但提供更多高级选项，并使用行业标准术语，例如 SSID 和 WPA。

### HomeAP

如果要快速配置家庭接入点，应使用此模式。

#### 无线 {#wireless}

在此部分设置无线网络：

- **Network Name**：你的智能手机将如何识别你的网络？在此设置任意名称。在 HomeAP dual 中，可以将 2GHz（legacy）和 5GHz（modern）网络设置为相同名称或不同名称（请参阅 FAQ）。可使用任意名称，格式不限。
- **Frequency**：通常可以保留“Auto”，这样路由器会扫描环境并选择占用最少的频率信道（仅执行一次）。如需试验，可使用自定义选择。
- **Band**：通常保留默认值（2GHz b/g/n 和 5GHz A/N/AC）。
- **Use Access List (ACL)**：如果要根据用户 MAC（硬件）地址限制谁可以连接到 AP，请启用此选项。要使用此选项，首先需要允许这些客户端连接，然后使用“Copy to ACL”下方的按钮。这会将所选客户端复制到访问列表。建立 Access list (ACL) 后，可以启用此选项以禁止其他任何设备尝试连接到你的设备。通常可以保持原样，因为 Wireless password 已提供所需限制。
- **WiFi Password**：此处最重要的选项。设置安全密码，同时加密无线通信，连接无线网络时需要该密码。
- **WPS accept**：使用此按钮向支持 WPS 连接模式的特定设备授予访问权限。适用于打印机和其他难以输入密码的外设。先在客户端设备中启动 WPS 模式，然后在此处单击一次 WPS 按钮以允许该设备。该按钮仅工作数秒，并按客户端逐一生效。
- **Guest network**：适用于无需知道主 WiFi 密码的家庭访客。在此选项中为他们设置单独的密码。重要！访客用户将无法访问 LAN 中的其他设备和其他访客设备。此模式会启用 Bridge filters 来阻止此类访问。
- **Wireless clients**：此表显示当前已连接的客户端设备（其 MAC 地址、是否在 Access List 中、上次使用的 IP 地址、连接时长、以 dBm 表示的信号强度以及条形图）。

#### Internet

- **Port**：选择连接到 ISP（互联网）调制解调器的端口。通常为 Eth1。
- **Address Acquisition**：选择 ISP 分配 IP 地址的方式。请向服务提供商咨询此项及其他选项（IP address、Netmask、Gateway）。
- **MAC address**：通常不应更改，除非 ISP 将你锁定到特定 MAC 地址，并且你已将路由器更换为新设备。
- **Firewall router**：为路由器和网络启用安全防火墙。始终确保选中此框，以防止从互联网端口访问你的设备。
- **MAC server / MAC Winbox**：允许从 LAN 端口侧使用 [Winbox utility](https://mt.lv/winbox) 以 MAC 地址模式连接。适用于 IP 模式不可用时的调试和恢复。仅限高级用途。
- **Discovery**：允许其他 RouterOS 设备按型号名称识别该设备。

#### 本地网络 {#local-network}

- **IP address**：通常可保留默认值 192.168.88.1，除非你的路由器位于另一台路由器之后。为避免 IP 冲突，请更改为 192.168.89.1 或类似地址。
- **Netmask**：大多数情况下可以保留 255.255.255.0。
- **Bridge all LAN ports**：允许设备相互通信，即使例如电视通过以太网 LAN 线缆连接，而 PC 通过 WiFi 连接。
- **DHCP server**：通常，你希望家庭网络自动配置 IP 地址，因此请保持 DHCP 设置为 ON 并使用默认值。
- **NAT**：仅当 ISP 为路由器和本地网络都提供了公共 IP 地址时才关闭此选项。否则，保持 NAT 开启。
- **UPnP**：此选项为受支持的程序和设备（如 NAS 磁盘和对等网络工具）启用自动端口转发（“向本地网络开放端口”，部分用户这样称呼）。请谨慎使用，因为此选项有时会在你不知情的情况下将内部设备暴露到互联网。仅在明确需要时启用。

#### VPN

如果要从互联网访问本地网络（和路由器），请使用安全的 VPN 隧道。此选项提供一个可连接的域名，并启用 PPTP 和 L2TP/IPsec（推荐后者）。用户名为“vpn”，你可以指定自己的密码。只需在此处启用它，然后在笔记本电脑或手机上提供地址、用户名和密码；连接到 VPN 后，你将获得通往家庭网络的安全加密连接。出行时也很有用——你将能够通过安全线路浏览互联网，就像从家中连接一样。这也有助于规避某些国家设置的地域限制。

#### 系统 {#system}

- **Check for updates**：始终使用此按钮确保设备为最新版本。它会检查是否有更新的 RouterOS 版本可用，并进行安装。
- **Password**：设置设备配置页面本身的密码。确保无人可以访问你的路由器配置页面并更改设置。

### FAQ

#### Q：Quickset 与 Webfig 选项卡有何不同，为什么会显示一批新菜单？ {#q-how-is-quickset-different-from-the-webfig-tab-where-a-bunch-of-new-menus-appear}

A：QuickSet 面向只需快速让设备正常运行的新用户。它将最常用的选项集中在一个位置。如果需要更多选项，请完全不要使用任何 QuickSet 设置；点击“Webfig”打开高级配置界面。完整功能将被解锁。

#### Q：可以同时使用 Quickset 和 Webfig 吗？ {#q-can-i-use-quickset-and-webfig-together}

A：如果打算使用 Quickset，请只使用 Quickset，反之亦然。虽然不冲突的设置可以通过这种方式配置，但不建议混用这些菜单。Router 和 Bridge 模式有什么区别？Bridge 模式会将所有接口添加到网桥，允许转发 Layer2 数据包（充当集线器/交换机）。在 Router 模式下，数据包通过使用 IP 地址和 IP 路由在 Layer3 转发（充当路由器）。

#### Q：在 HomeAP 模式下，2GHz 和 5GHz 网络名称应相同还是不同？ {#q-in-homeap-mode-should-the-2ghz-and-5ghz-network-names-be-the-same-or-different}

A：如果希望所有客户端设备（如电视、手机、游戏机）自动选择最佳的首选网络，请将名称设置为相同。如果希望强制客户端设备使用更快的 5GHz 802.11ac 连接，请将名称设置为不同。

#### Q：使用 QuickSet 时，是否可以创建没有安全设置的 AP（无密码），或连接到此类 AP？ {#q-can-i-create-an-ap-without-security-settings---no-password-or-connect-to-such-ap-while-using-quickset}

A：QuickSet 默认使用 WPA2 预共享密钥。这意味着最小密码长度为 8 个字符，并且设备只能连接到受 WPA2 保护的 AP，或自身作为 AP 运行。对于没有安全设置的配置，需要使用 WinBox、Webfig 或控制台手动配置。

#### QuickSet 界面 {#quickset-interface}

![Screenshot from 2026-04-28 11-14-11.png](/img/5211b87ad786380b.webp)
