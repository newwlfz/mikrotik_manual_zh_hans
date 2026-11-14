---
title: "LAMP 5G R16"
slug: /lamp-5g-r16
source: https://manual.mikrotik.com/hardware/lamp-5g-r16
captured_at: '2026-11-04T09:53:09+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/861b3d16ec018683.webp)

## [LAMP 5G R16](https://mikrotik.com/product/lamp_5g_r16)（LAMPGM&RG520F-EU） {#lamp-5g-r16-lampgmrg520f-eu}

这是一款坚固的户外 5G 设备，使用全向天线和内置 eSIM 支持，可自动连接到可用的最佳基站——无需调整天线方向，也无需更换物理 SIM 卡。IP67 防护等级、海洋级耐用性、GNSS、PoE 输入。完整规格和产品手册请参见 [LAMP 5G R16 产品页面](https://mikrotik.com/product/lamp_5g_r16)。

## 安全警告 {#safety-warnings}

- 在对任何 MikroTik 设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。
- 仅使用制造商批准的电源和配件，这些可在本产品的原包装中找到。
- 本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责确保设备安装符合当地和国家的电气规范。
- 请勿尝试拆卸、修理或改装设备。如需服务，请联系 MikroTik 支持。
- 本产品设计为安装在户外的立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险情况并对系统造成损坏。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 插座应安装在设备附近且易于触及的位置。
- 如果设备出现故障，请断开其电源。最快的方法是将电源适配器从电源插座上拔下。
- 本产品为 A 类产品。在居住环境中，本产品可能引起无线电干扰，此时用户可能需要采取适当的措施。
- 为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如在指定区域处置。请熟悉将设备正确运送到您所在地区指定收集点的流程

## 快速开始 {#quickstart}

- 打开以太网端口盖；
- 按照设备上的指示将 SIM 卡插入卡槽；
- 使用以太网线将设备连接到随附 PoE 注入器的数据+电源端；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 使用 Web 浏览器通过 WebFig 或 WinBox 工具 [https://mt.lv/WinBox](https://mt.lv/WinBox) 配置您的设备；提供多种配置方法以确保可访问性；
- 打开 [https://192.168.188.1](https://192.168.188.1) 访问 WebFig，对于 WinBox，请下载该工具，导航到 Neighbors 选项卡，然后选择 MAC 地址。用户名为 "admin"，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 选择"Check for updates"按钮，将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡并具有活动的 Internet 连接；
- 要手动更新设备，请访问 mikrotik.com，选择您的型号，并在"Downloads"部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的"Files"菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

- 直流输入数量：1（PoE-IN）。
- PoE 输入：802.3 af/at。
- PoE 输入电压：12-56 V。
- 电源适配器额定电流：0.5 A。
- 无配件时最大功耗：10 W。
- 最大功耗：10 W。

## 安装 {#mounting}

![](/img/f97edacf013f52ed.png)

### 立杆安装 {#pole-mounting}

- 使用随附的螺钉将安装支架固定到设备上。

![](/img/034bfc999d870964.png)

- 使用 U 型螺栓以及随附的垫圈和螺母将支架固定到立杆上。

![](/img/f170f1179619f879.png)

- 将设备安装到立杆上，使以太网端口朝下。
- 使用 PH2 螺丝刀拧紧环扣。
- 支持的立杆直径为 Ø 25–60 mm。

### 壁挂安装 {#wall-mounting}

- 使用随附的螺钉将安装支架固定到设备上。

![](/img/034bfc999d870964.png)

- 钻 Ø 6 mm 的孔用于安装墙塞。

![](/img/f910583dba897c50.png)

- 插入墙塞，并使用随附的螺钉将安装支架固定到墙上。

![](/img/86704f48d278dcd5.png)

:::warning 警告

请按照图示垂直安装本产品。

:::

- 使用扎带将以太网线固定到立杆上，距设备不超过一米，以免线缆被从端口中拉出。若要使用预制的以太网线，必须先切开橡胶密封件。或者，在连接 RJ45 接头之前先将线缆穿过橡胶密封件。
- 请勿使用不带橡胶密封件的线缆，否则将影响 IP67 防护等级。
- 检查安装角度和位置。
- 在户外安装时，确保所有线缆开口朝下。使用 PoE 注入器并正确接地，本设备在端口盖下方设有专门设计的接地连接器。建议使用屏蔽 Cat5/6 线缆。本设备的 IP 防护等级为 IP67。

## 配置 {#configuration}

可以通过 Web 浏览器使用 WebFig 进行配置，也可使用 WinBox 工具 [https://mt.lv/winbox](https://mt.lv/winbox)，多种方法可确保可访问性。

- 要访问 WebFig，请在浏览器中打开 [https://192.168.188.1](https://192.168.188.1)。
- 对于 WinBox，请下载该工具，转到 Neighbors 选项卡，然后选择 MAC 地址。默认用户名为 "admin"，**请在设备贴纸上查找密码**。
- 您应经常检查更新，以确保您的 RouterOS 软件保持最新，从而获得最佳性能和稳定性。在 WinBox 或 WebFig 中选择"Check for updates"按钮以更新到最新版本。

必须插入有效的 SIM 卡或设置 eSIM，并具有活动的 Internet 连接，更新才能正常工作。

RouterOS 提供的配置选项远不止本文档所述。我们建议访问 [https://mt.lv/help](https://mt.lv/help) 了解这些功能。

出于恢复目的，可以引导设备进行重新安装，请参见相应章节。

## eSIM 设置 {#esim-settings}

默认情况下，设备配置为使用 SIM 卡槽。要使用板载 eSIM，请使用以下命令切换卡槽：**/interface/lte/settings/set sim-slot=esim**

单个 eSIM 芯片可以存储多个 eSIM 配置文件，最大配置文件数量取决于所使用的 eSIM 芯片。

详情请参见 [LTE eSIM](/docs/mobile-networking/lte-5g#lte-esim) 页面。

## Reset 按钮 {#reset-button}

Reset 按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备将开始查找 CAPsMAN 服务器（共 10 秒）。
- 使用 Netinstall 重新安装 RouterOS。要使用 Netinstall 实用程序重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种可用的引导程序：常规引导程序和备用引导程序。常规引导程序——给设备上电，等待 1-2 秒，然后按住 Reset 按钮。等待直到 "USR" LED 闪烁，然后变为常亮"On"。当 "USR" LED 变为"Off"时，松开 Reset 按钮——设备将进入 BOOTP 模式。
- 备用引导程序——关闭设备电源，按住 Reset 按钮，然后给设备上电。等待直到 "USR" LED 闪烁，然后变为常亮"On"。当 "USR" LED 变为"Off"时，松开 Reset 按钮——设备将使用备用引导程序进入 BOOTP 模式。

无论使用上述哪种方式，如果在设备通电前按下按钮，系统将加载备用 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

Netinstall：执行 Netinstall 时，请确保 ROS 文件和 Netinstall 软件均使用最新的 v7 版本。

## 接地 {#grounding}

本设备包含一个接地连接（标记为 ⏚），您应将其连接到设备使用所在地的塔架或建筑物的接地装置。这可大幅降低静电放电和雷击损坏的风险。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

- 24 V 0.5 A 电源适配器
- LAMP 安装支架
- 千兆 PoE 注入器

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码：**LAMPGM&RG520F-EU.**
- CPU 双核：88F3720 800 MHz
- CPU 架构：ARM 64bit
- RAM 容量：512 MB
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
- 5G NSA TDD 频段：38 (2600 MHz) / 40 (2300 MHz) / 41 (2500 MHz) / 75 (1500 MHz) / 76 (1500 MHz) / 77 (3700 MHz) / 78 (3500 MHz)。
- LTE FDD 频段：1 (2100 MHz) / 3 (1800 MHz) / 5 (850 MHz) / 7 (2600 MHz) / 8 (900 MHz) / 20 (800 MHz) / 28 (700 MHz) / 32 (1500 MHz)。
- LTE TDD 频段：38 (2600 MHz) / 40 (2300 MHz) / 41 (2500 MHz) / 42 (3500 MHz) / 43 (3700 MHz)。
- 3G 频段：1 (2100 MHz) / 5 (850 MHz) / 8 (900 MHz)。
- 尺寸：311 x 311 x 179 mm。
- 操作系统：RouterOS 版本 7，许可证级别 3
- 工作温度 -40°C 至 +70°C

## SIM 卡槽使用 {#sim-slot-usage}

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡的厚度不同，不建议配合转接器使用。

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>产品代码</td><td>LAMPGM&RG520F-EU</td></tr><tr><td>**架构**</td><td>ARM 64bit</td></tr><tr><td>**CPU**</td><td>88F3720</td></tr><tr><td>**CPU 核心数**</td><td>2</td></tr><tr><td>**CPU 标称频率**</td><td>800 MHz</td></tr><tr><td>**CPU 线程数**</td><td>2</td></tr><tr><td>**RouterOS 许可证**</td><td>Level 3</td></tr><tr><td>**操作系统**</td><td>RouterOS v7</td></tr><tr><td>**RAM**</td><td>512 MB</td></tr><tr><td>**存储**</td><td>32 MB FLASH</td></tr><tr><td>**MTBF**</td><td>25°C 下约 200'000 小时</td></tr><tr><td>**工作温度**</td><td>-40°C 至 +70°C</td></tr><tr><td>**最大功耗**</td><td>10 W</td></tr><tr><td>**无附件时最大功耗**</td><td>10 W</td></tr><tr><td>**电源**</td><td>PoE-IN，12–56 V</td></tr><tr><td>**PoE 输入**</td><td>802.3af/at</td></tr><tr><td>**散热**</td><td>被动散热</td></tr><tr><td>**以太网**</td><td>1 × 10/100/1000 Mbps</td></tr><tr><td>**带反向 PoE (PoE-in) 的 1G 以太网端口数量**</td><td>1</td></tr><tr><td>**SIM**</td><td>1 个调制解调器（Micro SIM）</td></tr><tr><td>**eSIM**</td><td>是</td></tr><tr><td>**M.2 插槽**</td><td>1</td></tr><tr><td>**移动网络：3G**</td><td>Category R8（下行：42.2 Mbps；上行：5.76 Mbps）</td></tr><tr><td>**3G 频段**</td><td>1 (2100 MHz)、5 (850 MHz)、8 (900 MHz)</td></tr><tr><td>**移动网络：LTE**</td><td>Category 20（下行：2.0 Gbps；上行：200 Mbps）</td></tr><tr><td>**MIMO**</td><td>下行 4×4，上行 2×2</td></tr><tr><td>**LTE FDD 频段**</td><td>1 (2100 MHz)、3 (1800 MHz)、5 (850 MHz)、7 (2600 MHz)、8 (900 MHz)、20 (800 MHz)、28 (700 MHz)、32 (1500 MHz)</td></tr><tr><td>**LTE TDD 频段**</td><td>38 (2600 MHz)、40 (2300 MHz)、41 (2500 MHz)、42 (3500 MHz)、43 (3700 MHz)</td></tr><tr><td>**5G NSA FDD 频段**</td><td>1 (2100 MHz)、3 (1800 MHz)、5 (850 MHz)、7 (2600 MHz)、8 (900 MHz)、20 (800 MHz)、28 (700 MHz)</td></tr><tr><td>**5G NSA TDD 频段**</td><td>38 (2600 MHz)、40 (2300 MHz)、41 (2500 MHz)、75 (1500 MHz)、76 (1500 MHz)、77 (3700 MHz)、78 (3500 MHz)</td></tr><tr><td>**5G SA FDD 频段**</td><td>1 (2100 MHz)、3 (1800 MHz)、5 (850 MHz)、7 (2600 MHz)、8 (900 MHz)、20 (800 MHz)、28 (700 MHz)</td></tr><tr><td>**5G SA TDD 频段**</td><td>38 (2600 MHz)、40 (2300 MHz)、41 (2500 MHz)、75 (1500 MHz)、76 (1500 MHz)、77 (3700 MHz)、78 (3500 MHz)</td></tr><tr><td>**TAC**</td><td>86945405</td></tr><tr><td>**IP 防护等级**</td><td>IP67</td></tr><tr><td>**认证**</td><td>CE、EAC、ROHS</td></tr></tbody></table>

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

有关重要的安全说明和法规认证，请参阅 [https://mikrotik.com/products](https://mikrotik.com/products) 上提供的 Safety and Regulatory Information 文档。导航至：Support & Downloads → Safety and Regulatory Information
