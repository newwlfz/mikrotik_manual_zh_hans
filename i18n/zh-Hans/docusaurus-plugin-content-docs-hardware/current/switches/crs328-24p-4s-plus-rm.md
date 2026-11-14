---
title: "CRS328-24P-4S+RM"
slug: /crs328-24p-4s-plus-rm
source: https://manual.mikrotik.com/hardware/crs328-24p-4s-plus-rm
captured_at: '2026-11-04T09:46:40+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/7e3f0e1ac8101182.jpg)

24 端口千兆以太网路由器/交换机，配四个 10Gbps SFP+ 端口，1U 机架式机箱，双启动与 PoE 输出，500W。完整规格与宣传资料请参见 [CRS328-24P-4S+RM 产品页面](https://mikrotik.com/product/crs328_24p_4s_rm)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵循所有国家法律和法规。设备的安装必须符合当地和国家电气规范。本设备用于安装在机架中。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能导致人员处于危险境地并对系统造成损坏。本产品仅用于室内安装。请让本产品远离水、火、潮湿或高温环境。仅使用制造商认可的电源和配件，它们可在本产品的原包装中找到。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，操作风险自负！如果设备发生故障，请断开其电源。最快的做法是从电源插座上拔下电源插头。客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

- 使用您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在 Web 浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 以开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。然后通过 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分中找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置路由器的密码。

## 安装 {#mounting}

本设备设计用于室内，可使用随附的机架安装件安装在机架式机箱中，也可以放置在桌面上。如果希望放置在平坦表面上，请在路由器底部贴上橡胶脚垫；如果指定用于机架式机箱，请使用十字螺丝刀将机架安装耳片固定到设备两侧：

- 将机架耳片安装到设备两侧，并拧紧四颗螺钉将其固定到位，如图所示。

![](/img/837a6d2bb5f312fe.webp)

- 将设备放入机架式机箱并对齐孔位，使设备能够方便地安装到位。
- 拧紧螺钉将其固定到位。本设备没有防水污染保护，请确保将设备放置在干燥通风的环境中。我们建议为我们的设备使用 Cat6 网线。本设备的安装和配置应由具备资质的人员完成。

## 供电 {#powering}

本设备配备一个 IEC 型交流电源输入，支持 100-240 V **⏦** 供电（~ 50/60 Hz，最大 7 A）。本设备自身在最大负载下的功耗最高为 44 W。

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档可在以下地址获取：[https://mt.lv/help](https://mt.lv/help) 您可以在 Web 浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方式以确保可访问性。** **要开始设置，请在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 以开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。然后通过 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。本设备配备一个 RJ45 串行端口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。出于恢复目的，可以从网络重新安装设备，请参阅 Reset 按钮。

Marvell Prestera 交换芯片功能用户手册

本设备支持引导 RouterOS（用于完整路由和交换功能）或 SwOS（仅用于交换运行）。默认情况下，设备引导进入 RouterOS，但您可以按以下方式切换到另一个操作系统：

- 从 SwOS 中：转到 System 菜单，点击页面底部的 Boot RouterOS 按钮。
- 从 RouterOS 中：打开 System → RouterBOARD → Settings 并选择 Boot OS。也可以使用串行控制台菜单选择操作系统并配置其他引导选项。

## 电源输出 {#power-output}

本设备可以通过其以太网端口向外部设备提供 PoE 供电。输出电压将根据所连接设备所需的电压类型自动选择。本设备既可为 802.3af/at 设备供电，也可为接受被动 PoE 供电的设备供电。如有必要，可以手动切换输出电压。默认情况下，PoE 模式设置为 auto，它不会损坏设备，并会自动检测支持 PoE 且需要相应电压的设备。一旦检测到 PoE 设备，就会为其供电，PoE LED 也会亮起。PoE 输出端口分为三个 PoE 输出组，每组 8 个端口（PSE8）。设备 PoE 总限制 = 450w（每个 PSE8 组 150w）。每个端口在高电压下可提供最高 30 W，在低电压输出下可提供 26,5 W。

## 按钮和跳线 {#buttons-and-jumpers}

**Reset 按钮**：

- 在引导期间按住此按钮，直到 USR LED 指示灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住按钮 5 秒以上，或直到用户 LED 熄灭，然后松开，以让 RouterBOARD 查找 Netinstall 服务器。**第一个以太网端口用于 Netinstall 过程。** 有关使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。无论采用上述哪种方式，如果在设备通电前按下按钮，系统都会加载备份 RouterBOOT 引导程序。请在 LED 开始闪烁之前松开按钮，以仅加载备份 RouterBOOT 而不进行重置。这对 RouterBOOT 的调试和恢复很有用。**Mode 按钮：** Mode 按钮的动作可以通过 RouterOS 软件配置，以执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。Mode 按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置

## 扩展插槽和端口 {#extension-slots-and-ports}

<table><thead><tr><th>**产品代码**</th><th>CRS328-24P-4S+RM</th></tr></thead><tbody><tr><td>**CPU**</td><td>98DX3236, 800 MHz</td></tr><tr><td>**CPU 架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU 核心数**</td><td>1</td></tr><tr><td>**交换芯片型号**</td><td>98DX3236</td></tr><tr><td>**RAM**</td><td>512 MB</td></tr><tr><td>**存储**</td><td>16 MB Flash</td></tr><tr><td>**1G 以太网（RJ45）端口**</td><td>24</td></tr><tr><td>**10G SFP+ 端口**</td><td>4</td></tr><tr><td>**串行控制台（RJ45）**</td><td>1</td></tr><tr><td>**操作系统**</td><td>RouterOS（license level 5）/ SwitchOS（双启动）</td></tr><tr><td>**工作温度**</td><td>-20 °C 至 +60 °C（已测试）</td></tr><tr><td>**机箱尺寸**</td><td>443 × 300 × 44 mm</td></tr><tr><td>**PoE 输出支持**</td><td>802.3af/at，全部 24 个以太网端口支持被动 PoE</td></tr></tbody></table>

有关 MikroTik SFP 模块兼容性表，请访问帮助页面：MikroTik 有线接口兼容性

## LED 指示灯 {#led-indicators}

- 路由器通电时 PWR LED 亮起。
- LED 的使用可通过 RouterOS 配置。
- 三角形 LED（上排）指示 PoE 输出状态。绿色 LED 表示相应端口使用低电压，红色 LED 表示高电压。单个绿色 LED 闪烁：启动低电压设备时出现问题。单个红色 LED 闪烁：高电压设备出现问题。
- 方形端口 LED（下排）指示各以太网、SFP 端口的活动。
- FAN FAULT LED 表示任一散热风扇出现问题。
- PoE FAULT LED 表示超出了整体最大 PoE 输出限制。端口 PoE 输出优先级将在 3 个独立区段（每段 8 个端口）中生效，任何区段超过 150W 消耗时都会发生过载

## 配件 {#accessories}

包装中包含随设备提供的以下配件：

![](/img/185d3677850674bc.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。
