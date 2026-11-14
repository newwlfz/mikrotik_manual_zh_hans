---
title: "Chateau 5G R17 ax"
slug: /chateau-5g-r17-ax
source: https://manual.mikrotik.com/hardware/chateau-5g-r17-ax
captured_at: '2026-11-04T09:45:14+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/58927a682e31d536.jpg)

## [Chateau 5G R17 ax](https://mikrotik.com/product/chateau_5g_r17_ax)（S53UG+5HaxD2HaxD-TC&RG650E-EU） {#chateau-5g-r17-ax-s53ug5haxd2haxd-tcrg650e-eu}

即刻上网——即使没有 SIM 卡也能使用。这款标志性的 MikroTik 5G 家用路由器迎来了迄今最智能的一次升级……完整的 eSIM 支持！完整规格与产品手册请参见 [Chateau 5G R17 ax 产品页面](https://mikrotik.com/product/chateau_5g_r17_ax)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品仅供室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废弃物处置点。请了解将设备妥善运输至您所在地区指定处置点的相关程序。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。安装和操作本 MikroTik 设备时，其与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

按照以下快速步骤设置您的设备：

![](/img/cbc5361d4144eab4.webp)

- 按设备上指示的位置将 SIM 卡插入卡槽；如果您想使用 eSIM，请阅读 eSIM 章节；

![](/img/9619076cdc698366.webp)

- 将设备连接到电源；
- 通过任一以太网端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在所选工具中，使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 选择 "Check for updates" 按钮并将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡或设置好 eSIM，并具备有效的互联网连接，更新才能正常工作；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中进行以下设置：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 使用移动应用程序连接 {#connecting-with-a-mobile-app}

使用您的智能手机通过 WiFi 访问路由器。

![](/img/9bcba09a7b6a0d53.webp)

- 按设备上指示的位置将 SIM 卡插入卡槽并开启设备电源；如果您想使用 eSIM，请阅读 eSIM 章节；
- 扫描二维码并选择您首选的操作系统。
- 安装并打开该应用程序。
- 选择 Connect，通过无线网络与您的设备建立连接（请查看贴纸上的无线密码）。
- 用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。
- 选择 Quick Setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要设置。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/448fe884f3fe7820.webp)

- (link)DC 插孔 2.0 mm。
- 四个千兆端口和一个 2.5 千兆端口，支持自动交叉/直通线缆校正（Auto MDI/X）。连接其他网络设备时可以使用直通线或交叉线。
- USB type-A。
- (link) 用于 Micro SIM 卡。
- Mode 按钮。
- 带天线的型号不提供外部 SMA 天线接口盖。
- WPS (link)
- 产品代码：**S53UG+5HaxD2HaxD-TC&RG650E-EU**。
- CPU：四核 IPQ-6010 1.8 GHz。
- CPU：架构 ARM 64bit。
- RAM 容量：1 GB。
- RAM 类型：DDR3L。
- 存储：128 MB，NAND。
- 1G 以太网端口数量：4。
- 2.5G 以太网端口数量：1。
- Micro SIM 插槽：1。
- eSIM。
- USB：1 个 USB 3.0 type A。
- 交换芯片型号：IPQ-6010。
- 无线接口型号：QCN-5022（2.4 GHz）、QCN-5052（5 GHz）。
- 无线：2.4 GHz 802.11b/g/n/ax 双链，5 GHz 802.11a/n/ac/ax 双链。
- LTE 类别：20（下行 2.0 Gbps，上行 211 Mbps）。
- LTE 调制解调器：RG650E-EU。
- TAC：86896506。
- 5G SA 类别：下行 7.01 Gbps，上行 1.25 Gbps。
- 5G NSA 类别：下行 5.47 Gbps，上行 730 Mbps。
- 3G 类别：R8（下行 42.2Mbps，上行 5.76Mbps）。
- MIMO DL：4x4。
- MIMO UL：1x1（5G SA MIMO UL 2x2）。
- 5G SA FDD 频段：1（2100 MHz）/ 3（1800 MHz）/ 5（850 MHz）/ 7（2600 MHz）/ 8（900 MHz）/ 20（800 MHz）/ 26（850 MHz）/ 28（700 MHz）/ 67（700 MHz）/ 75（1500 MHz）/ 76（1500 MHz）。
- 5G SA TDD 频段：38（2600 MHz）/ 40（2300 MHz）/ 41（2500 MHz）/ 77（3700 MHz）/ 78（3500 MHz）。
- 5G NSA FDD 频段：1（2100 MHz）/ 3（1800 MHz）/ 5（850 MHz）/ 7（2600 MHz）/ 8（900 MHz）/ 20（800 MHz）/ 26（850 MHz）/ 28（700 MHz）/ 67（700 MHz）/ 75（1500 MHz）/ 76（1500 MHz）。
- 5G NSA TDD 频段：38（2600 MHz）/ 40（2300 MHz）/ 41（2500 MHz）/ 77（3700 MHz）/ 78（3500 MHz）。
- LTE FDD 频段：1（2100MHz）/ 3（1800MHz）/ 5（850MHz）/ 7（2600MHz）/ 8（900 MHz）/ 20（800MHz）/ 28（700MHz）/ 32（1500 MHz）。
- LTE TDD 频段：38（2600MHz）/ 41（2500MHz）/ 42（3500MHz）/ 40（2300MHz）/ 43（3700MHz）。
- 3G 频段：1（2100MHz）/ 5（850MHz）/ 8（900MHz）。
- 尺寸：240 x 156 x 44 mm。
- 操作系统 RouterOS：v7，许可证级别 4。
- 工作温度：-40°C 至 +70°C。

## 安装 {#mounting}

本设备设计为室内使用，可放置在桌面上。

您应使用 CAT5 屏蔽网线。使用和安装本设备时，请注意最大允许暴露量（MPE）安全距离，辐射体与您身体之间至少保持 20 厘米。

## 供电 {#powering}

- DC 输入数量 1。
- DC 插孔输入电压 12-28 V。
- 电源适配器标称电压 24 V。
- 电源适配器标称电流 1.2 A。
- 不含附件时的最大功耗为 18 W。
- 最大功耗 27 W。

## 配置 {#configuration}

配置可通过网页浏览器使用 WebFig、WinBox 工具 [https://mt.lv/winbox](https://mt.lv/winbox) 或 (link) 完成。提供多种方法以确保可访问性。

- 要访问 WebFig，请在浏览器中打开 [https://192.168.88.1](https://192.168.88.1)。
- 对于 WinBox，请下载该工具，转到 Neighbors 选项卡，然后选择 MAC 地址。默认用户名为 "admin"，**请在设备贴纸上查找密码**。您应经常检查更新，以确保您的 RouterOS 软件保持最新，从而获得最佳性能和稳定性。在 WinBox 或 WebFig 中选择 "Check for updates" 按钮即可更新到最新版本。

必须插入有效的 SIM 卡或设置好 eSIM，并具备有效的互联网连接，更新才能正常工作。

除了本文档所述内容之外，RouterOS 还提供许多其他配置选项。更多详情，请访问 [https://mt.lv/help](https://mt.lv/help)。为便于恢复，设备可引导进入重装模式。有关说明，请参见 (link) 章节。

## Mode 按钮 {#mode-button}

Mode 按钮位于设备背面右侧。默认情况下，Mode 按钮配置为控制深色模式。

要关闭所有 LED，请短按一次 Mode 按钮。要重新开启 LED，请再次按下该按钮。

该按钮也可在 RouterOS 中配置为执行用户自定义脚本。

## Sync 按钮 {#sync-button}

Sync 按钮位于设备顶部。如果在无线接口上配置了 WPS Sync 按钮，则可用其连接新客户端。

![](/img/c76f6511aa4e14f0.webp)

- 按住 WPS 按钮 1 – 5 秒，即可为无线接口启用 WPS。

## 前面板 LED 状态 {#front-led-status}

![](/img/9ba5b3e5c27a0830.webp)

- 无线网络活动。
- 以太网端口活动。
- 系统 LED。
- 信号强度。蜂窝连接技术由系统 LED 颜色表示：红：GSM 黄：3G 蓝：LTE 绿：5G NSA 紫：5G SA

当 LTE 未连接到网络时，系统 LED 将闪红光，表示 LTE 连接存在某种问题。如果 LTE 接口被有意禁用（未使用），系统 LED 将发出蓝光。

## SIM 卡槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议配合转接卡使用。

## eSIM 设置 {#esim-settings}

默认情况下，设备配置为使用 SIM 卡槽。要使用板载 eSIM，请使用以下命令切换卡槽：**/interface/lte/settings/set sim-slot=esim**

单个 eSIM 芯片可以存储多个 eSIM 配置文件，最大配置文件数量取决于所使用的 eSIM 芯片。

详情请参见 [LTE eSIM](/docs/mobile-networking/lte-5g#lte-esim) 页面。

## Reset 按钮 {#reset-button}

Reset 按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备将开始查找 CAPsMAN 服务器（共 10 秒）。
- 要使用 Netinstall 实用程序重新安装 RouterOS，请使设备进入 BOOTP 模式。有两种引导程序可用：常规引导程序和备用引导程序。常规引导程序 - 开启设备电源，等待 1-2 秒，然后按下并按住 Reset 按钮。等待系统 LED 闪烁绿光，然后变为常亮 "On"。当绿色 LED 变为 "Off" 时，松开 Reset 按钮 - 设备将进入 BOOTP 模式。
- 备用引导程序 – 关闭设备电源，按下并按住 Reset 按钮，然后开启电源。等待系统 LED 闪烁绿光，然后变为常亮 "On"。当绿色 LED 变为 "Off" 时，松开 Reset 按钮 - 设备将使用备用引导程序进入 BOOTP 模式。无论使用上述哪种方式，如果在设备通电前按钮已被按下，系统将加载备用 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

Netinstall 执行 Netinstall 时，请确保同时使用最新 v7 版本的 ROS 文件和 Netinstall 软件。

## 配件 {#accessories}

包装内包含随设备提供的以下配件：

- ADAPT1_ EU/US 开关电源 24V，1.2A。
- CAB3_ CAT5E UTP 扁平网线，8P8C，AWG32，1.5m。

## 取下后盖以接触 PCB {#removing-back-cover-to-access-pcb}

如果需要接触 PCB，可以取下后盖。

- 取下中央螺丝；

![](/img/3c40f644b6453592.webp)

- 使用小螺丝刀在标记处撬开后盖板；
- 继续向上撬开；

![](/img/ef5c2817560d190a.webp)

- 最后将整个后盖板取下。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

有关重要的安全说明和法规认证，请参阅每个产品随附的《安全与法规信息》文档：Documents→ Safety and Regulatory Information
