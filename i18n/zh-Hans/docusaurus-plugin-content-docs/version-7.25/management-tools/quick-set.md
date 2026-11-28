---
title: "快速设置"
description: "使用 WinBox 中的 Quick Set 配置 MikroTik 家用路由器：选择模式、配置 Wi-Fi、选择互联网连接类型，并通过带注释的截图检查本地网络设置。"
tags:
  - 'homeap'
  - 'quickset'
  - 'wireless'
source: https://manual.mikrotik.com/docs/7.25/management-tools/quick-set
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

**Quick Set** 将家用路由器的主要设置集中在一个页面中。在 WinBox 中，连接到路由器并在左侧菜单选择 **Quick Set**。也可以通过路由器的 Web 界面访问 Quick Set，地址为路由器的 IP 地址，默认配置下通常为 `192.168.88.1`。

Quickset 适用于所有出厂时带有某种默认配置的设备。没有配置的设备必须手动配置。最常用且推荐的模式是 HomeAP（或 HomeAP dual，取决于设备）。该 Quickset 模式为家庭用户提供最简单的术语和最常见的选项。

使用 Quick Set 对采用默认配置的路由器进行初始设置。如果你已经在其他 WinBox 菜单或 WebFig 中修改了配置，请继续在这些菜单中操作：Quick Set 可能会覆盖手动配置的设置。

## 在 WinBox 中查找主要设置 {#find-the-main-settings-in-winbox}

编号标注显示了 **Home AP Dual** 的主要区域：

1. **Mode** - 选择路由器角色对应的预设。Home AP Dual 为 2.4 GHz 和 5 GHz 射频提供独立的网络名称。
2. **Wireless** - 设置网络名称和 Wi-Fi 密码。
3. **Internet** - 选择路由器获取互联网地址的方式。
4. **Local Network** - 检查 LAN 地址、DHCP 服务器和 NAT 设置。
5. **System** - 打开更新或路由器密码对话框。
6. **OK / Apply** - 检查配置后保存。**OK** 还会关闭窗口；**Cancel** 会关闭窗口且不应用未保存的更改。

![WinBox Quick Set overview with numbered callouts for the mode, wireless settings, internet settings, local network, system controls, and save buttons](/img/7517d253ebe57556.webp)

:::note
截图显示的是现有路由器配置，而非出厂默认设置。网络名称、密码、设备标识符和客户端详情均已隐藏。本示例中防火墙、DHCP 服务器和 NAT 已关闭；对于将 LAN 连接到互联网的家庭路由器，请按照 Internet 和 Local Network 部分所述的设置操作。可用模式和字段取决于路由器型号以及已安装的无线软件包。
:::

## Modes

根据路由器型号，Quickset 下拉菜单中提供不同的 Quickset 模式：

- **CAP**：受控接入点，一种由集中式 [CAPsMAN](/docs/wireless/abgn/capsman) 服务器管理的 AP 设备。仅在已设置 CAPsMAN 服务器时使用。
- **CPE**：客户端设备，用于连接到接入点（AP）设备。提供扫描所在区域 AP 设备的选项。
- **HomeAP**：适用于大多数家庭用户的默认接入点配置页面。提供更少的选项和简化的术语。
- **HomeAP dual**：双频设备（2GHz/5GHz）。适用于大多数家庭用户的默认接入点配置页面。提供更少的选项和简化的术语。
- **Home Mesh**：用于构建更大的 WiFi 网络。在路由器中启用 CAPsMAN 服务器，并将本地 WiFi 接口置于 CAPsMAN 管理之下。按住重置按钮启动其他 MikroTik WiFi AP，它们将加入此 HomeMesh 网络（详情请参阅其快速指南）。
- **PTP Bridge AP**：当需要在同一网络中透明互连两个远程位置时，将一台设备设置为此模式，另一台设备设置为下一种（PTP Bridge CPE）模式。
- **PTP Bridge CPE**：当需要在同一网络中透明互连两个远程位置时，将一台设备设置为此模式，另一台设备设置为上一种（PTP Bridge AP）模式。
- **WISP AP**：类似于 HomeAP 模式，但提供更多高级选项，并使用行业标准术语，例如 SSID 和 WPA。

## HomeAP

这是快速配置家庭接入点时应使用的模式。

### 无线 {#wireless}

从截图中标出的两个控件开始：

1. 在 **Network Name** 中输入设备应看到的网络名称。例如，两个射频均使用 `Home`，或使用 `Home` 和 `Home-5GHz` 加以区分。
2. 在 **WiFi Password** 中输入 Wi-Fi 密码。手机和计算机使用该密码加入网络；它不同于 **System** 中的路由器管理员密码。

![WinBox Quick Set wireless settings with arrows to the network name fields and WiFi Password; the existing names and password are hidden](/img/65b5f53b28ef0314.webp)

更改网络名称或密码后，应用配置时会断开 Wi-Fi 客户端。首次设置时，请用以太网线将计算机连接到 LAN 端口，以便在不丢失 Wi-Fi 连接的情况下完成配置。

在此部分设置无线网络：

- **Network Name**：智能手机如何查看你的网络。在此设置任意名称。在 HomeAP dual 中，可以将 2GHz（legacy）和 5GHz（modern）网络设置为相同名称或不同名称（请参阅 FAQ）。可使用任意名称，格式不限。
- **Frequency**：通常可保留“Auto”。这样路由器会扫描环境，并选择占用最少的频率信道（仅执行一次）。如需试验，可使用自定义选择。
- **Band**：通常保留默认值（2GHz b/g/n 和 5GHz A/N/AC）。
- **Use Access List (ACL)**：如果要根据用户 MAC（硬件）地址限制哪些设备可以连接到 AP，请启用此选项。要使用此选项，请先允许这些客户端连接，然后点击“Copy to ACL”按钮。这会将所选客户端复制到访问列表。建立 Access list (ACL) 后，可以启用此选项，禁止其他任何设备尝试连接到你的设备。通常无需更改此选项，因为 Wireless password 已提供所需限制。
- **WiFi Password**：此处最重要的选项。设置一个安全密码，该密码还会加密无线通信，连接无线网络时需要此密码。
- **WPS accept**：使用此按钮向支持 WPS 连接模式的特定设备授予访问权限。适用于打印机和其他难以输入密码的外设。先在客户端设备中启动 WPS 模式，然后在此处点击一次 WPS 按钮以允许该设备。该按钮仅在几秒内有效，并按客户端逐一操作。
- **Guest network**：适用于无需知道主 WiFi 密码的家庭访客。在此选项中为他们设置单独的密码。访客用户无法访问 LAN 中的其他设备和其他访客设备。此模式会启用 Bridge filters 来阻止此类访问。
- **Wireless clients**：此表显示已连接的客户端设备（其 MAC 地址、是否在你的 Access List 中、上次使用的 IP 地址、连接时长、以 dBm 和条形图表示的信号强度）。

### Internet

使用标注区分互联网连接和本地网络：

1. **Address Acquisition** - 如果运营商通过 DHCP 提供地址，请选择 **Automatic**；如果提供固定地址信息，请选择 **Static**；如果提供 PPPoE 用户名和密码，请选择 **PPPoE**。输入运营商提供的信息；不要复制截图中的地址。
2. **Firewall Router** - 对于将家庭网络连接到互联网的路由器，请启用此选项。
3. **Local Network > IP Address** - 这是路由器在 LAN 中的地址，与 **Internet** 部分中的地址不同。
4. **DHCP Server / NAT** - 对于典型家庭路由器，启用 DHCP server 以向 LAN 客户端分配地址，并启用 NAT 使其共享互联网连接。

![WinBox Quick Set Internet and Local Network settings with arrows to Address Acquisition, Firewall Router, the LAN IP address, and DHCP Server and NAT](/img/ac3ae884f0c552e9.webp)

截图中选择了 **Automatic**，因此互联网 IP 地址、netmask 和 gateway 由上游 DHCP server 提供。未勾选的选项属于该现有配置，并非家庭路由器的建议设置。

- **Port**：选择连接到 ISP（互联网）调制解调器的端口。通常为 Eth1。
- **Address Acquisition**：选择 ISP 分配 IP 地址的方式。请向服务提供商咨询此项及其他选项（IP address、Netmask、Gateway）。
- **MAC address**：通常不应更改，除非 ISP 将你锁定到特定 MAC 地址，并且你已将路由器更换为新设备。
- **Firewall router**：为路由器和网络启用安全防火墙。始终确保选中此框，以防止从互联网端口访问你的设备。
- **MAC server / MAC Winbox**：允许从 LAN 端口侧使用 [Winbox utility](https://mt.lv/winbox) 以 MAC 地址模式连接。适用于 IP 模式不可用时的调试和恢复。仅限高级用途。
- **Discovery**：允许其他 RouterOS 设备按型号名称识别该设备。

### 本地网络 {#local-network}

- **IP address**：通常可以保留默认值 192.168.88.1，除非你的路由器位于另一台路由器之后。为避免 IP 冲突，请更改为 192.168.89.1 或类似地址。
- **Netmask**：大多数情况下可以保留 255.255.255.0。
- **Bridge all LAN ports**：允许设备之间互相通信，即使例如电视通过以太网 LAN 线缆连接，而 PC 通过 WiFi 连接。
- **DHCP server**：通常，你需要在家庭网络中自动配置 IP 地址，因此请将 DHCP 设置保持为 ON 并使用默认值。
- **NAT**：仅当 ISP 为路由器和本地网络都提供了公网 IP 地址时，才关闭此选项。否则，请保持 NAT 开启。
- **UPnP**：此选项可为受支持的程序和设备启用自动端口转发（有人称之为“向本地网络开放端口”），例如 NAS 磁盘和对等网络工具。请谨慎使用，因为此选项有时会在你不知情的情况下将内部设备暴露到互联网。仅在确有需要时启用。

### VPN

如果你希望从互联网访问本地网络（以及路由器），请使用安全的 VPN 隧道。此选项会提供一个可连接的域名，并启用 [PPTP](/docs/virtual-private-networks/pptp) 和 [L2TP/IPsec](/docs/virtual-private-networks/l2tp)（推荐使用后者）。用户名为“vpn”，你可以指定自己的密码。你只需在此处启用它，然后在笔记本电脑或手机上提供地址、用户名和密码。连接到 VPN 后，你将获得与家庭网络之间的安全加密连接。此功能在旅行时也很有用——你可以通过安全线路浏览互联网，就像从家中连接一样。这也有助于规避某些国家设置的地域限制。

### 系统 {#system}

- **Check For Updates**：打开 RouterOS 更新对话框，检查是否有更新版本，并选择安装时间。
- **Password...**：设置路由器的管理员密码。该密码用于保护对路由器配置的访问，与 **WiFi Password** 分开设置。

检查无线、互联网和 LAN 设置后，选择 **OK** 保存设置并关闭 Quick Set，或选择 **Apply** 保存设置并保持窗口打开。更改 LAN IP 地址可能会断开基于 IP 的 WinBox 会话；请使用新地址重新连接路由器。更改 Wi-Fi 后，请使用新的网络名称和密码重新连接无线设备。

普通设置期间请勿更改 **Reset Configuration**：该选项会重置路由器配置，而不是保存所做的修改。

## FAQ

### Q：Quickset 与 Webfig 选项卡有何不同，为什么会出现许多新菜单？ {#q-how-is-quickset-different-from-the-webfig-tab-where-a-bunch-of-new-menus-appear}

A：QuickSet 面向只需要快速启动并运行设备的新用户。它将最常用的选项集中在一个位置。如果需要更多选项，请完全不要使用任何 QuickSet 设置；选择“Webfig”以打开高级配置界面。完整功能将被解锁。

### Q：可以同时使用 Quickset 和 Webfig 吗？ {#q-can-i-use-quickset-and-webfig-together}

A：如果打算使用 Quickset，请只使用 Quickset，反之亦然。虽然不冲突的设置可以通过这种方式配置，但不建议混用这些菜单。Router 和 Bridge 模式有什么区别？Bridge 模式会将所有接口添加到网桥，允许转发 Layer2 数据包（充当集线器/交换机）。在 Router 模式下，数据包通过使用 IP 地址和 IP 路由在 Layer3 转发（充当路由器）。

### Q：在 HomeAP 模式下，2GHz 和 5GHz 网络名称应相同还是不同？ {#q-in-homeap-mode-should-the-2ghz-and-5ghz-network-names-be-the-same-or-different}

A：如果希望所有客户端设备（如电视、手机、游戏机）自动选择最佳的首选网络，请将名称设置为相同。如果要强制客户端设备使用更快的 5GHz 802.11ac 连接，请将名称设置为不同。

### Q：使用 QuickSet 时，是否可以创建没有安全设置的 AP（无密码），或连接到此类 AP？ {#q-can-i-create-an-ap-without-security-settings---no-password-or-connect-to-such-ap-while-using-quickset}

A：QuickSet 默认使用 WPA2 预共享密钥。这意味着密码长度至少为 8 个字符，并且设备只能连接到受 WPA2 保护的 AP，或自身作为 AP 运行。对于没有安全设置的配置，需要使用 WinBox、Webfig 或控制台手动配置。
