---
title: "cAP LTE12 ax"
slug: /cap-lte12-ax
source: https://manual.mikrotik.com/hardware/cap-lte12-ax
captured_at: '2026-11-04T09:41:03+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/af6e9153d09f5342.jpg)

## [cAP LTE12 ax](https://mikrotik.com/product/cap_lte12_ax)（cAPGi-5HaxD2HaxD&EG12-EA） {#cap-lte12-ax-capgi-5haxd2haxdeg12-ea}

一款功能强大的吸顶式接入点，可为您的临时业务提供真正的 Wi-Fi 6 移动性 —— 现在配备 CAT12 LTE 调制解调器！完整规格和宣传册请参见 [cAP LTE12 ax 产品页面](https://mikrotik.com/product/cap_lte12_ax)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终废弃处理应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品仅供室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，它们可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行时应与您的身体、职业使用者或公众保持不少于 30 厘米的距离。

## 快速开始 {#quickstart}

按照以下快速步骤设置您的设备：

- 将 micro SIM 卡插入卡槽；
- IMEI 号可在机壳和包装标签上找到；
- 用以太网线将设备连接到随附的 PoE 注入器的 *"data+power"* 端；
- 通过任一以太网端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 "WinBox" 配置工具。在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 选择 "Check for updates" 按钮，将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡并具有可用的 Internet 连接；
- 如需手动更新设备，请访问 [https://mikrotik.com/products](https://mikrotik.com/products) 的产品页面找到您的产品。所需的软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您所在的国家/地区，以应用该国家/地区的法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 供电 {#powering}

- DC 输入数量：2（DC 插孔、PoE-IN）；
- 支持的输入电压 18-57 V（DC 插孔）18-57（PoE-In）
- PoE-in 802.3af/at：Ether1；
- PoE-Out 无源 PoE 最高 57V（&lt;30v DC 插孔必须使用，&gt;30V 可使用 PoE-In 和 DC 插孔）
- PoE-Out 端口：Ether2，每端口最大输出（输入 &lt; 30 V）：0.6 A，每端口最大输出（输入 &gt; 30 V）：0.4 A。电流超过 0.3 A 时，请使用 DC 插孔为设备供电。
- 最大功耗（不含配件）13 W
- 最大功耗 34 W

## 安装 {#mounting}

可以使用设备背部的随附安装支架将设备安装到墙壁或天花板上：

- 用随附的螺丝将安装支架固定到墙壁或天花板上；
- 如有必要，使用随附的膨胀螺柱配合钻头；
- 将所需的线缆连接到设备；
- 通过滑动将设备安装到安装支架上。

![](/img/26dbe3bbb765ae0b.webp)

*本设备的安装和配置应由合格人员完成。* 警告！本设备的安装和运行时应与您的身体保持至少 30 厘米的距离。在住宅环境中运行本设备可能会造成无线电干扰。

## 配置 {#configuration}

默认情况下，设备被配置为无线接入点，LTE 接口作为 WAN，Ether1、Ether2 接口与无线接口桥接在一起。桥接接口上配置了 DHCP 服务器。登录后，您应在 QuickSet 菜单中选择 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将要使用的国家/地区，以符合当地法规。必须插入有效的 SIM 卡并具有可用的 Internet 连接。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下所有来自 Internet 端口的访问均被阻止）。出于恢复目的，可以从网络引导设备，请参阅相关章节。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码：cAPGi-5HaxD2HaxD&EG12-EA
- CPU：四核 IPQ-6010 1.8 GHz
- RAM 大小：1 GB
- RAM 类型：DDR3L
- 存储：128 MB，NAND
- 1G 以太网端口数量：2
- 交换芯片型号：IPQ-6010
- 无线接口型号：QCN-5022（2.4 GHz）、QCN-5052（5 GHz）
- 无线 2.4 GHz 802.11b/g/n/ax 双链，5 GHz 802.11a/n/ac/ax 双链
- 天线增益：5.5 dBi
- 3G 类别：R8（下行 42.2Mbps，上行 11.2Mbps）
- 3G 频段：1（2100MHz）/ 3（1800MHz）/ 5（850MHz）/ 8（900MHz）
- LTE 类别：12（下行 600Mbps，上行 150Mbps）
- LTE 调制解调器：EG12-EA
- LTE FDD 频段：1（2100MHz）/ 3（1800MHz）/ 5（850MHz）/ 7（2600MHz）/ 8（900 MHz）/ 20（800MHz）/ 28（700MHz）
- LTE TDD 频段：38（2600MHz）/ 40（2300MHz）/ 41（2500MHz）
- TAC：86056104
- SIM 卡槽数量：1 个调制解调器（Micro SIM）
- 操作系统：RouterOS v7，License level 4
- 尺寸：228 x 48 mm
- IP：20
- 工作温度：经过测试 -40°C 至 +70°C

## 按钮和跳线 {#buttons-and-jumpers}

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在会寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电之前按住按钮，系统都会加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 模式按钮 {#mode-button}

![](/img/bd56fb1f06904d9a.webp)

模式按钮的动作可以在 RouterOS 软件中配置，以执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。默认情况下，该按钮会启用 "dark mode"，即关闭 LED 灯。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列在 /system resource 中。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您首选的操作系统。
- 安装并打开该应用程序。
- 默认情况下，IP 地址和用户名已经填好。
- 选择 Connect，通过无线网络与您的设备建立连接。
- 选择 Quick Setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 还提供高级菜单，可用于完整配置所有必需的设置。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

![](/img/5e8f40bb7700ca6e.webp)

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的相关程序。
