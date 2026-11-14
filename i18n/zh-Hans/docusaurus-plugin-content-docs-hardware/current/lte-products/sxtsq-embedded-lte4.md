---
title: "SXTsq Embedded LTE4"
slug: /sxtsq-embedded-lte4
source: https://manual.mikrotik.com/hardware/sxtsq-embedded-lte4
captured_at: '2026-11-04T10:05:20+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/8cf0beb24d86b5a7.jpg)

## [SXTsq 嵌入式 LTE4](https://mikrotik.com/product/sxtsq_emb_lte4)（EC25-EU&SXTsq） {#sxtsq-embedded-lte4-ec25-eusxtsq}

一款经济高效的室外 LTE 设备，集成 2×2 MIMO 定向天线、Cat4 LTE 调制解调器和 RouterOS v7，专为可靠的远程连接而设计。提供支持 eSIM 的欧盟版（EC25-EU）和全球版（EG25-G），具备 PoE-in 以及坚固的 IP 防护等级 SXTsq 室外外壳，最大功耗仅 5 W 即可提供稳定的 LTE 连接。这是常规版或欧盟版。完整规格和宣传册请参见 [SXTsq Embedded LTE4 产品页面](https://mikrotik.com/product/sxtsq_emb_lte4)。

## 安全警告 {#safety-warnings}

- 在对任何 MikroTik 设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。
- 仅使用制造商认可的电源和配件，这些电源和配件可在本产品的原包装中找到。
- 本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责确保设备的安装符合当地和国家的电气规范。
- 请勿尝试拆卸、修理或改装设备。如需服务，请联系 MikroTik 支持。
- 本产品适合安装在室外的立杆上。开始安装前请仔细阅读安装说明。使用错误的硬件和配置或未遵循正确的步骤，可能会对人员造成危险情况并损坏系统。
- 我们无法保证因不当使用本设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 插座应安装在设备附近，且应易于触及。
- 如果设备发生故障，请断开其电源。最快的方法是将电源适配器从电源插座上拔下。
- 为避免污染环境，请将设备与生活垃圾分开，并以安全方式处理，例如在指定区域处理。请熟悉将设备正确运送至您所在地区指定收集点的流程。

## 快速开始 {#quickstart}

- 按照指示将 Nano SIM 卡插入卡槽；
- 将设备连接到随附的电源适配器；
- 使用以太网线将设备连接到计算机；
- 通过 **WebFig** 使用 Web 浏览器，或使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）来配置设备。**提供了多种配置方法以确保可访问性；**
- 打开 [https://192.168.188.1](https://192.168.188.1) 即可访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后选择 MAC 地址。用户名为 "**admin**"，无密码（或者对于某些型号，请查看贴纸上的用户和无线密码）；
- 如果您的移动网络运营商要求，请输入 PIN 码；
- 选择 "Check for updates" 按钮并将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡或已设置 [eSIM](/docs/mobile-networking/lte-5g#lte-esim)，并且需要有效的互联网连接；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您首选的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将已填写。
- 选择 Connect 以通过无线网络建立与设备的连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 配置 {#configuration}

可以通过 Web 浏览器使用 WebFig 进行配置，WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）等方法可确保可访问性。

- 如需访问 WebFig，请在浏览器中打开 [https://192.168.188.1](https://192.168.188.1)。
- 对于 WinBox，请下载该工具，进入 Neighbors 选项卡，然后选择 MAC 地址。默认用户名为 "admin"，**请在设备贴纸上查找密码**。您应经常检查更新，以确保 RouterOS 软件保持最新，从而获得最佳性能和稳定性。在 WinBox 或 WebFig 中选择 "Check for updates" 按钮即可更新到最新版本。

必须插入有效的 SIM 卡或设置 eSIM，并具备有效的互联网连接，更新才能正常工作。

RouterOS 提供了本文档所述之外的广泛配置选项。建议访问 [https://mt.lv/help](https://mt.lv/help) 了解这些功能。

出于恢复目的，可以让设备引导以进行重新安装，请参见相应章节。

## 安装 {#mounting}

本设备的 IP 防护等级为 IP67。在室外安装时，请确保任何电缆开口朝下。您应使用 POE 供电器并进行正确接地。使用和安装本设备时，请注意最大允许暴露量（MPE）安全距离，辐射体与您身体之间至少保持 20 cm。

![](/img/03f503e6f8717d99.webp)

本设备随附一个金属安装环，可用于设备背面的安装槽。

- 使用十字螺丝刀松开金属环。
- 将其一端穿过三个安装槽中最方便的一个。
- 将设备放置在将要安装的立杆上。
- 将安装环的松端滑回其闭合卡扣，并用螺丝刀将其拧紧。
- 随附的环形支架可安装在直径 3-7 cm 的立杆上。建议使用扎带将以太网线固定在立杆上，与设备的距离约为 30 cm。

![](/img/7f35ee2b81792bc8.webp)

![](/img/cfba0947d7d0fe38.webp)

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>产品型号</td><td>EC25-EU&SXTsq</td></tr><tr><td>**架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU**</td><td>Cortex A7</td></tr><tr><td>**CPU 核心数**</td><td>1</td></tr><tr><td>**CPU 标称频率**</td><td>800 MHz</td></tr><tr><td>**RouterOS 许可证**</td><td>Level 3</td></tr><tr><td>**操作系统**</td><td>RouterOS v7</td></tr><tr><td>**内存**</td><td>256 MB</td></tr><tr><td>**存储**</td><td>512 MB NAND</td></tr><tr><td>**MTBF**</td><td>25°C 下约 100'000 小时</td></tr><tr><td>**工作温度**</td><td>-40°C 至 +70°C</td></tr><tr><td>**最大功耗**</td><td>5 W</td></tr><tr><td>**供电**</td><td>PoE-IN（被动），12–28 V</td></tr><tr><td>**散热**</td><td>被动散热</td></tr><tr><td>**以太网**</td><td>1 × 10/100/1000 Mbps</td></tr><tr><td>**SIM**</td><td>2 个调制解调器：Nano SIM + eSIM</td></tr><tr><td>**移动网络：2G**</td><td>Class 33</td></tr><tr><td>**2G 频段**</td><td>3 (1800 MHz), 8 (900 MHz)</td></tr><tr><td>**移动网络：3G**</td><td>Category R8（下行 42.2 Mbps / 上行 5.76 Mbps）</td></tr><tr><td>**3G 频段**</td><td>1 (2100 MHz), 8 (900 MHz)</td></tr><tr><td>**移动网络：LTE**</td><td>Category 4（下行 150 Mbps / 上行 50 Mbps）</td></tr><tr><td>**MIMO**</td><td>下行 2×2</td></tr><tr><td>**LTE FDD 频段**</td><td>1 (2100 MHz), 3 (1800 MHz), 7 (2600 MHz), 8 (900 MHz), 20 (800 MHz), 28A (700 MHz)</td></tr><tr><td>**LTE TDD 频段**</td><td>38 (2600 MHz), 40 (2300 MHz), 41 (2500 MHz)</td></tr><tr><td>**TAC**</td><td>86554604</td></tr><tr><td>**监控**</td><td>CPU 温度监控</td></tr><tr><td>**eSIM**</td><td>是</td></tr><tr><td>**认证**</td><td>CE, EAC, ROHS</td></tr><tr><td>**IP 防护等级**</td><td>IP67</td></tr></tbody></table>

## 供电 {#powering}

本设备通过 PoE 802.3af/at 接受 **12–28 V DC ⎓**。随附电源和 PoE 供电器。

**连接电源：**

- 将设备的以太网线连接到 PoE 供电器的 **PoE+DATA** 端口。
- 将您的 LAN 线缆连接到供电器。
- 连接电源并将其插入插座。

## eSIM 设置 {#esim-settings}

默认情况下，设备配置为使用 SIM 卡槽。如需使用板载 eSIM，请使用以下命令切换卡槽：**/interface/lte/settings/set sim-slot=esim**

单个 eSIM 芯片可以存储多个 eSIM 配置文件，最大配置文件数量取决于所使用的 eSIM 芯片。

详情请参见 [LTE eSIM](/docs/mobile-networking/lte-5g#lte-esim) 页面。

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 在启动过程中按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（共 10 秒）。
- 使用 Netinstall 重新安装 RouterOS。如需使用 Netinstall 实用工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种可用的引导程序：常规引导程序和备用引导程序。常规引导程序 - 打开设备电源，等待 1-2 秒，然后按下并按住复位按钮。等待直到 "USR" LED 闪烁，然后变为常亮 "On"。当 "USR" LED 变为 "Off" 时，松开复位按钮 - 设备将进入 BOOTP 模式。
- 备用引导程序 – 关闭设备电源，按下并按住复位按钮，然后开启电源。等待直到 "USR" LED 闪烁，然后变为常亮 "On"。当 "USR" LED 变为 "Off" 时，松开复位按钮 - 设备将使用备用引导程序进入 BOOTP 模式。无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都将加载备用 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

Netinstall执行 Netinstall 时，请确保 ROS 文件和 Netinstall 软件均使用最新的 v7 版本。

## 接地 {#grounding}

本设备包含一个接地连接（标记为 ⏚），您应将其连接到使用该设备的铁塔或建筑物的接地装置。这可以大幅降低静电放电和雷击损坏的风险。

## 配件 {#accessories}

包装中包含以下随设备附带的配件：

- EU/US 开关电源 24V DC ⎓，0.38 A，9 W
- 带屏蔽接头的 POE 供电器/千兆 POE 供电器。
- 软管卡箍 SUS304（十字型；夹紧直径范围 30-70 mm）。

![](/img/3bbd38be7147e5cf.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。
