---
title: "ATLGM&RG520F-EU"
slug: /atlgm-and-rg520f-eu
source: https://manual.mikrotik.com/hardware/atlgm-and-rg520f-eu
captured_at: '2026-11-04T09:40:30+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/d270e1ee055a4eed.jpg)

## [ATL 5G R16](https://mikrotik.com/product/atl_5g_r16)（ATLGM&RG520F-EU） {#atl-5g-r16-atlgmrg520f-eu}

这是我们首款内置 eSIM 支持的室外 5G 设备，配备强劲的定向天线和先进的 Release 16 调制解调器——非常适合农村、城市和 IoT 部署场景。它具备千兆以太网、PoE-in，开箱即可使用 MikroTik 连接功能，是随时随地获得快速、灵活互联网的智能且坚固之选。通过 IP66 认证。完整规格和宣传册请参见 [ATL 5G R16 产品页面](https://mikrotik.com/product/atl_5g_r16)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 在任何墙面安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于在室外安装在立杆上。开始安装前请仔细阅读安装说明。未能使用正确的硬件和配置或遵循正确的操作流程，可能导致人员处于危险境地并对系统造成损坏。
- 只能使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内工作、输出功率和布线要求。所有 MikroTik 无线电设备都必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能会引起无线电干扰，此时用户可能需要采取适当的措施。
- 为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备妥善运送到指定处置场所的相关程序。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和操作时，与您的身体、职业用户或公众的距离不得小于 30 厘米。

## 快速开始 {#quickstart}

- 打开以太网端口盖；
- 将 Micro SIM 卡芯片朝上插入卡槽；如果您想使用 eSIM，请阅读 eSIM 部分；
- 使用以太网线将设备连接到随附的 PoE 供电器上的数据+电源端；
- 将 PoE 供电器的数据端连接到计算机；
- 将电源适配器连接到 PoE 供电器；
- 通过 WebFig 或 WinBox 工具使用 Web 浏览器配置您的设备，地址为 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 打开 [https://192.168.188.1](https://192.168.188.1) 访问 WebFig；对于 WinBox，请下载该工具，转到 Neighbors 选项卡，然后选择 MAC 地址。用户名为 "admin"，无密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 选择 "Check for updates" 按钮，将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡或已设置 eSIM，并且需要有效的互联网连接。
- 如需手动更新设备，请访问产品页面 [https://mikrotik.com/products](https://mikrotik.com/products) 找到您的产品。所需的软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 设置路由器密码。

![](/img/1acbe30d4d490952.webp)

## 供电 {#powering}

- 直流输入数量：1 (PoE-IN)。
- PoE 输入：802.3 af/at。
- PoE 输入电压：12-56 V。
- 电源适配器额定电流：0.8 A。
- 无配件时的最大功耗：10 W。
- 最大功耗：10 W。

## 安装 {#mounting}

- 将随附的金属安装环滑入天线反射盘背面的两个槽中。
- 将设备安装到立杆上，以太网端口朝下。
- 使用 PH2 螺丝刀拧紧安装环。
- 使用扎带将以太网线固定到立杆上，距离设备不超过一米，以免线缆被从端口中拉出。如需使用预制好的以太网线，必须先切开橡胶密封圈。或者，在连接 RJ45 接头之前将线缆穿过橡胶密封圈。请勿在没有橡胶密封圈的情况下使用线缆，否则会破坏 IP66 防护等级。
- 检查安装角度和位置。在室外安装时，请确保所有线缆开口朝下。使用 POE 供电器并正确接地，本设备在端口盖下方设有专门设计的接地连接器。建议使用屏蔽 Cat5/6 线缆。本设备的 IP 防护等级为 IP66。

## 配置 {#configuration}

可以通过 Web 浏览器使用 WebFig 进行配置，也可使用 WinBox 工具 [https://mt.lv/winbox](https://mt.lv/winbox)，提供多种方法以确保可访问性。

- 要访问 WebFig，请在浏览器中打开 [https://192.168.188.1](https://192.168.188.1)。
- 对于 WinBox，请下载该工具，转到 Neighbors 选项卡，然后选择 MAC 地址。默认用户名为 "admin"，**密码请查看设备贴纸**。您应经常检查更新，以确保您的 RouterOS 软件保持最新，获得最佳性能和稳定性。在 WinBox 或 WebFig 中选择 "Check for updates" 按钮以更新到最新版本。

必须插入有效的 SIM 卡或已设置 eSIM，并具备有效的互联网连接，更新才能正常工作。

RouterOS 提供了本文档所述内容之外的广泛配置选项。我们建议访问 [https://mt.lv/help](https://mt.lv/help) 探索这些功能。

为便于恢复，可以引导设备进行重新安装，请参见相关章节。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

![](/img/f302bf1cf0939e79.webp)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码：**ATLGM&RG520F-EU.**
- CPU 双核：88F3720 800 MHz
- CPU 架构：ARM 64bit
- RAM 大小：512 MB
- RAM 类型：DDR3L
- 存储：32 MB，Flash
- 1G 以太网端口数量：1
- LTE 类别：20（下行 2.0 Gbps，上行 200 Mbps）
- LTE 调制解调器：RG520F-EU
- TAC：86945405
- 5G SA 类别：下行 4.2 Gbps，上行 900 Mbps。
- 5G NSA 类别：下行 5.0 Gbps，上行 650 Mbps。
- 3G 类别：R8（下行 42.2Mbps，上行 5.76Mbps）。
- MIMO 下行：4x4。
- 5G SA FDD 频段：1 (2100 MHz) / 3 (1800 MHz) / 5 (850 MHz) / 7 (2600 MHz) / 8 (900 MHz) / 20 (800 MHz) / 28 (700 MHz)。
- 5G SA TDD 频段：38 (2600 MHz) / 40 (2300 MHz) / 41 (2500 MHz) / 75 (1500 MHz) / 76 (1500 MHz) / 77 (3700 MHz) / 78 (3500 MHz)。
- 5G NSA FDD 频段：1 (2100 MHz) / 3 (1800 MHz) / 5 (850 MHz) / 7 (2600 MHz) / 8 (900 MHz) / 20 (800 MHz) / 28 (700 MHz)。
- 5G NSA TDD 频段：40 (2300 MHz) / 41 (2500 MHz) / 77 (3700 MHz) / 78 (3500 MHz) / 76 (1500 MHz) / 38 (2600 MHz) / 75 (1500 MHz)。
- LTE FDD 频段：20 (800MHz) / 28 (700MHz) / 3 (1800MHz) / 5 (850MHz) / 7 (2600MHz) / 8 (900 MHz) / 1 (2100MHz) / 32 (1500 MHz)。
- LTE TDD 频段：40 (2300MHz) / 38 (2600MHz) / 41 (2500MHz) / 42 (3500MHz)。
- 3G 频段：1 (2100MHz) / 5 (850MHz) / 8 (900MHz)。
- 尺寸：311 x 311 x 179 mm。
- 操作系统：RouterOS 版本 7，许可证级别 3
- 工作温度 -40°C 至 +70°C

## SIM 卡槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议使用转接器。

## eSIM 设置 {#esim-settings}

默认情况下，设备配置为使用 SIM 卡槽。要使用板载 eSIM，请使用以下命令切换卡槽：**/interface/lte/settings/set sim-slot=esim**

单个 eSIM 芯片可以存储多个 eSIM 配置文件，最大配置文件数量取决于所使用的 eSIM 芯片。

详情请参见 [LTE eSIM](/docs/mobile-networking/lte-5g#lte-esim) 页面。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备将开始查找 CAPsMAN 服务器（共 10 秒）。
- 使用 Netinstall 重新安装 RouterOS。要使用 Netinstall 实用程序重新安装 RouterOS，请将设备进入 BOOTP 模式。可用的引导程序有两种：常规引导程序和备份引导程序。常规引导程序 - 给设备上电，等待 1-2 秒，然后按住复位按钮。等待直到 "USR" LED 闪烁，随后变为常亮 "On"。当 "USR" LED 变为 "Off" 时，松开复位按钮 - 设备将进入 BOOTP 模式。
- 备份引导程序 – 关闭设备电源，按住复位按钮，然后给设备上电。等待直到 "USR" LED 闪烁，随后变为常亮 "On"。当 "USR" LED 变为 "Off" 时，松开复位按钮 - 设备将使用备份引导程序进入 BOOTP 模式。无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都会加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

Netinstall执行 Netinstall 时，请确保 ROS 文件和 Netinstall 软件都使用最新的 v7 版本。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统未经测试。

有关重要的安全说明和法规认证信息，请参阅 [https://mikrotik.com/products](https://mikrotik.com/products) 上提供的 Safety and Regulatory Information 文档。导航至： Support & Downloads → Safety and Regulatory Information
