---
title: "CRS312-4C+8XG-RM"
slug: /crs312-4c-plus-8xg-rm
source: https://manual.mikrotik.com/hardware/crs312-4c-plus-8xg-rm
captured_at: '2026-11-04T09:46:13+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/10bf7e61d4f4f7e5.jpg)

## [CRS312-4C+8XG-RM](https://mikrotik.com/product/crs312_4c_8xg_rm) {#crs312-4c8xg-rm}

CRS312-4C+8XG 是一款 8 端口千兆以太网交换机，带有四个 10g Ethernet / SFP+ 组合端口。它具备受管交换机所需的全部基本功能以及更多特性。有关完整规格和手册，请参阅 [CRS312-4C+8XG-RM 产品页面](https://mikrotik.com/product/crs312_4c_8xg_rm)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家和地区的法律法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品仅适合室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些均可在本产品的原包装中找到。
- 在将系统连接到电源之前，请先阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备出现故障，请断开其电源。最快的做法是将电源插头从电源插座上拔出。
- 客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 设备都必须由专业人员进行安装。

## 快速开始 {#quickstart}

- 用您的 PC 连接到任意 Ethernet 端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后通过 MAC 地址进行连接。用户名为 "**admin**"，没有密码（某些型号请查看标签上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置路由器密码。

## 安装 {#mounting}

本设备设计用于室内，可使用随附的机架配件安装在机架机箱中，也可以放置在桌面上。如果希望放置在平面上，请在路由器底部贴上橡胶脚垫；如果指定用于机架机箱，请使用十字螺丝刀将机架耳片安装到设备两侧：

- 如图所示，将机架耳片安装到设备两侧，并拧紧四颗螺丝将其固定到位。
- 将设备放入机架机箱，对准孔位，使设备顺利装入。
- 拧紧螺丝将其固定到位。

![](/img/27bf22aa32ecbced.webp)

本设备的 IP 防护等级为 IPX0。设备不具备防水污染保护，请确保将设备放置在干燥通风的环境中。我们建议为我们的设备使用屏蔽 Cat5/6 网线。*本设备的安装和配置应由具备资质的人员完成。*

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档可在 [https://mt.lv/help](https://mt.lv/help) 获取。设备可通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性。**

在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后通过 MAC 地址进行连接。用户名为 "**admin**"，没有密码（某些型号请查看标签上的用户和无线密码）。

设备配备一个 RJ45 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。为便于恢复，可以从网络重新安装设备，请参阅 Reset 按钮。

Marvell Prestera 交换芯片的特性在 [Marvell Prestera 交换芯片特性](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册中进行了说明。

设备支持启动 RouterOS（获得完整的路由和交换功能）或 SwOS（仅进行交换操作）。默认情况下，设备启动进入 RouterOS，但您可以按以下方式切换到另一个操作系统：

- 从 SwOS：转到 **System** 菜单，点击页面底部的 "**Boot RouterOS**" 按钮。
- 从 RouterOS：打开 **System → RouterBOARD → Settings** 并选择 **Boot OS**。

也可以使用串口控制台菜单选择操作系统并配置其他启动选项。

## 供电 {#powering}

设备可通过两个交流输入供电，电压范围为 AC ⏦ 100-240 V。两路电源为 IEC 电源接口，可实现冗余。最大负载下的功耗可达 60 W。

## 规格 {#specifications}

<table><thead><tr><th>**产品代码**</th><th>CRS312‑4C+8XG‑RM</th></tr></thead><tbody><tr><td>**CPU**</td><td>QCA9531, 650 MHz</td></tr><tr><td>**CPU 架构**</td><td>MIPSBE</td></tr><tr><td>**CPU 核心数**</td><td>1</td></tr><tr><td>**交换芯片型号**</td><td>98DX8212</td></tr><tr><td>**RAM**</td><td>64 MB</td></tr><tr><td>**存储**</td><td>16 MB Flash</td></tr><tr><td>**10/100 Ethernet (RJ45)**</td><td>1</td></tr><tr><td>**1G/2.5G/5G/10G Ethernet (RJ45)**</td><td>8</td></tr><tr><td>**10G Combo (RJ45/SFP+) 端口**</td><td>4</td></tr><tr><td>**USB Type‑A 端口**</td><td>1</td></tr><tr><td>**串口控制台 (RJ45)**</td><td>1</td></tr><tr><td>**操作系统**</td><td>RouterOS v7 / SwOS (License 5)</td></tr><tr><td>**工作温度**</td><td>‑30 °C 至 +70 °C</td></tr><tr><td>**外壳尺寸**</td><td>443 × 183 × 44 mm</td></tr></tbody></table>

## Combo 接口 {#combo-interface}

四个 combo 接口各自有两个物理连接器，同一时间只能使用其中一个。在 RouterOS 中，这些端口会自动表示为 combo 1-4。可以在 RouterOS 软件的 ethernet 菜单中选择使用哪个物理端口。如果保持默认的 "auto"，并且 F/T 两端都插入了线缆，则 SFP 优先。例如，如果您将网线插入 1T 端口并在 1F 端口插入 SFP 模块，则必须在 RouterOS 中选择要使用哪一个。在 RouterOS GUI 中双击相应的 combo 接口即可查看使用的是哪个插口。

## Reset 按钮 {#reset-button}

- 要重置配置，请断开设备电源，按住 Reset 按钮，然后在 USER (USR) LED 开始闪烁时松开。
- 要加载备份引导程序，请在通电前按住 Reset 按钮，三秒后松开。
- 要启动 Netinstall 过程（让设备以 BOOTP 模式启动以重新安装 RouterOS），请按住 Reset 按钮，给设备通电，等待 USER (USR) LED 闪烁后变为常亮。当 USR LED 熄灭时，松开 Reset 按钮。

无论使用上述哪种方式，如果在设备通电前就已按下该按钮，系统都会加载备份 RouterBOOT 引导程序。这适用于 RouterBOOT 调试和恢复。

## 配件 {#accessories}

包装中包含随设备提供的以下配件：

- 用于机架机箱的固定套件 K-57。
- AC ⏦ EU/US 电源线，D03+QT3 H05VV-F 3x0.75 mm2 1.83 m RoHS。
- 安装套件 1U 机架支架（白色），2 个。请访问 wiki 页面查看 MikroTik SFP 模块兼容性表：MikroTik wired interface compatibility。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。
