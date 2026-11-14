---
title: "Chateau LTE18 ax"
slug: /chateau-lte18-ax
source: https://manual.mikrotik.com/hardware/chateau-lte18-ax
captured_at: '2026-11-04T09:45:21+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/38e74cc92402c55b.jpg)

## [Chateau LTE18 ax](https://mikrotik.com/product/chateaulte18_ax) (S53UG+5HaxD2HaxD-TC&EG18-EA) {#chateau-lte18-ax-s53ug5haxd2haxd-tceg18-ea}

最好的家用 AP 变得更好了。这是 Chateau LTE18 的第 6 代版本。无线速度更快、CPU 更强，而且现在还配备了 2.5 千兆以太网！完整规格和宣传手册请参见 [Chateau LTE18 ax 产品页面](https://mikrotik.com/product/chateaulte18_ax)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 未使用正确的硬件或未遵循正确的操作步骤，可能会给人员带来危险处境并损坏系统。
- 本产品仅供室内安装使用。请让本产品远离水、火、潮湿或高温环境。
- 请仅使用制造商认可的电源和配件，可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

请按照以下简要步骤设置您的设备：

![](/img/cbc5361d4144eab4.webp)

- 将外置天线连接到 SMA 接头（天线随包装提供，请参见“天线使用”）；
- 将 micro SIM 卡插入设备下方的卡槽，SIM 卡不随包装提供；

![](/img/9619076cdc698366.webp)

- 将设备连接到电源；
- 通过任意一个以太网端口或无线网络“MikroTik-...”连接到设备（请务必在标签上核对无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用 [https://mt.lv/winbox](https://mt.lv/winbox) 上的“WinBox”配置工具。**提供多种配置方式以确保可访问性；**
- 使用默认 IP 地址 192.168.88.1 在所选的工具中开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择“Neighbors”选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为“admin”，没有密码（或者，对于某些型号，请在标签上核对用户密码和无线密码）；
- 选择“Check for updates”按钮，将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡或设置 eSIM，并且具备有效的互联网连接，更新才能正常工作；
- 如需手动更新设备，请访问 [https://mikrotik.com/products](https://mikrotik.com/products) 上的产品页面找到您的产品。所需的软件包可在“Support&Downloads”菜单下获取；
- 将下载的软件包上传到 WebFig 或 WinBox 的“Files”菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在“QuickSet”菜单中进行以下设置：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 使用移动应用程序连接 {#connecting-with-a-mobile-app}

使用您的智能手机通过 WiFi 访问路由器。

![](/img/9bcba09a7b6a0d53.webp)

- 插入 SIM 卡并为设备通电。
- 用智能手机扫描二维码，并选择您首选的操作系统。
- 连接到无线网络。SSID 以 MikroTik 开头，并带有设备 MAC 地址的最后几位数字。
- 打开应用程序。
- 默认情况下，IP 地址和用户名将已预先填入。
- 选择 Connect，通过无线网络建立到设备的连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/448fe884f3fe7820.webp)

- 复位按钮。
- DC 电源插孔 2.0 mm。
- 五个千兆端口，支持自动交叉/直通线缆校正（Auto MDI/X）。连接其他网络设备时，直通线或交叉线均可使用。
- USB type-A。
- Micro SIM 卡插槽。
- Mode 按钮。
- 对于带天线的型号，不提供外置 SMA 天线接头的盖板。
- WPS Sync 按钮。
- 产品代码 S53UG+5HaxD2HaxD-TC&EG18-EA。
- CPU 四核 IPQ-6010 1.8 GHz。
- CPU 架构 ARM 64bit。
- RAM 大小 1 GB。
- RAM 类型 DDR3L。
- 存储 128 MB，NAND。
- 1G 以太网端口数量 4。
- 2.5G 以太网端口数量 1。
- Micro SIM 插槽 1。
- USB 1 个 USB 3.0 type A。
- 交换芯片型号 IPQ-6010。
- 无线接口型号 QCN-5022（2.4 GHz）、QCN-5052（5 GHz）。
- 无线 2.4 GHz 802.11ax 双链、5 GHz 802.11ax 双链。
- 无线天线最大增益 2.4 GHz（3 dBi）、5 GHz（6 dBi）。
- LTE 类别 18（下行 1.2Gbps，上行 150Mbps）。
- LTE 调制解调器 EG18-EA。
- TAC 86981604。
- LTE 天线增益 4 dBi。
- LTE FDD 频段 1（2100MHz）/ 3（1800MHz）/ 5（850MHz）/ 7（2600MHz）/ 8（900 MHz）/ 20（800MHz）/ 28（700MHz）。
- LTE TDD 频段 38（2600MHz）/ 40（2300MHz）/ 41（2500MHz）。
- 3G 类别 R8（下行 42.2Mbps，上行 11.2Mbps）。
- 3G 频段 1（2100MHz）/ 3（1800MHz）/ 5（850MHz）/ 8（900MHz）。
- 尺寸 240 x 156 x 44 mm。
- 操作系统 RouterOS v7，许可证级别 4。
- 工作温度 -40°C 至 +65°C。

## 安装 {#mounting}

本设备设计用于室内，可放置在桌面上使用。

您应使用 CAT5 屏蔽电缆。在使用和安装本设备时，请注意最大允许暴露量（MPE）安全距离，即辐射体与您的身体之间至少保持 20 厘米的距离。

## 供电 {#powering}

- DC 输入数量 1。
- DC 插孔输入电压 12-28 V。
- 电源适配器标称电压 24 V。
- 电源适配器标称电流 1.2 A。
- 无附加设备时最大功耗 16 W。
- 最大功耗 19 W。

## 配置 {#configuration}

可通过网页浏览器使用 WebFig、WinBox 工具 [https://mt.lv/winbox](https://mt.lv/winbox) 或移动应用程序完成配置。提供多种方式以确保可访问性。

- 要访问 WebFig，请在浏览器中打开 [https://192.168.88.1](https://192.168.88.1)。
- 对于 WinBox，请下载该工具，进入 Neighbors 选项卡，然后选择 MAC 地址。默认用户名为“admin”，**密码在设备标签上查找**。您应经常检查更新，以确保 RouterOS 软件保持最新，从而获得最佳性能和稳定性。在 WinBox 或 WebFig 中选择“Check for updates”按钮即可更新到最新版本。

必须插入有效的 SIM 卡或设置 eSIM，并且具备有效的互联网连接，更新才能正常工作。

RouterOS 提供了本文档所述内容之外的广泛配置选项。我们建议访问 [https://mt.lv/help](https://mt.lv/help) 探索这些功能。

出于恢复目的，可以引导设备进行重新安装，请参见章节（链接）。

## Mode 按钮 {#mode-button}

Mode 按钮位于设备背面右侧。Mode 按钮的默认配置为 dark mode —— 关闭所有 LED。可在 RouterOS 中配置该按钮以运行任何用户指定的脚本。

## Sync 按钮 {#sync-button}

Sync 按钮位于设备顶部。如果无线接口上已配置 WPS Sync 按钮，则可用于连接新的客户端。

![](/img/c76f6511aa4e14f0.webp)

- 按住 WPS 按钮 1 – 5 秒，以为无线接口启用 WPS。

## 前面板 LED 状态 {#front-led-status}

![](/img/9ba5b3e5c27a0830.webp)

- 无线网络活动。
- 以太网端口活动。
- 系统 LED。
- 信号强度。蜂窝连接技术取决于系统 LED 颜色：红色：GSM 黄色：3G 蓝色：LTE 绿色：5G NSA 紫色：5G SA

当 LTE 未连接到网络时，系统 LED 会闪烁红光，表示 LTE 连接存在某些问题。如果 LTE 接口被有意禁用（未使用），系统 LED 将发出蓝光。

## SIM 卡槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议使用转接器。

## 复位按钮 {#reset-button}

复位按钮有三项功能：

- 在启动过程中按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在将寻找 CAPsMAN 服务器（共 10 秒）。
- 要使用 Netinstall 实用程序重新安装 RouterOS，请使设备进入 BOOTP 模式。有两种引导器可用：常规引导器和备用引导器。常规引导器 —— 为设备通电，等待 1-2 秒，然后按下并按住复位按钮。等待直到系统 LED 闪烁绿光，然后变为常亮“On”。当绿色 LED 变为“Off”时，松开复位按钮 —— 设备将进入 BOOTP 模式。
- 备用引导器 —— 关闭设备电源，按下并按住复位按钮，然后为其通电。等待直到系统 LED 闪烁绿光，然后变为常亮“On”。当绿色 LED 变为“Off”时，松开复位按钮 —— 设备将使用备用引导器进入 BOOTP 模式。无论使用上述哪种方式，如果在设备通电之前就按下了按钮，系统将加载备用 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

Netinstall 执行 Netinstall 时，请确保两个 RouterOS 都使用最新的 v7 版本。将您的 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

- ADAPT1_ EU/US 开关电源 24V，1.2A。
- CAB3_ CAT5E UTP 扁平电缆，8P8C，AWG32，1.5m。

## 天线使用 {#antenna-usage}

SMA 接头用于 LTE 天线。

外置天线插座位于设备背面。设备随附已连接的无线天线，LTE 天线不随包装提供。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。
