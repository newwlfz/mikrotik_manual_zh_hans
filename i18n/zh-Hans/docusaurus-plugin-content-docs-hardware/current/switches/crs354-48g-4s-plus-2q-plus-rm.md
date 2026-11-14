---
title: "CRS354-48G-4S+2Q+RM"
slug: /crs354-48g-4s-plus-2q-plus-rm
source: https://manual.mikrotik.com/hardware/crs354-48g-4s-plus-2q-plus-rm
captured_at: '2026-11-04T09:46:43+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/5575241f758f436d.jpg)

CRS354-48G-4S+2Q+RM 是一款网络交换机，具有 48 个千兆端口、四个 10G SFP+ 端口和两个 40G QSFP+ 端口。该设备可直接作为交换机使用。有关完整规格和宣传册，请参阅 [CRS354-48G-4S+2Q+RM 产品页面](https://mikrotik.com/product/crs354_48g_4splus2qplusrm)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵守所有国家法律和法规。设备的安装必须符合当地和国家电气规范。本机适用于安装在机架中。开始安装前，请仔细阅读安装说明。使用不正确的硬件或不遵循正确的操作步骤，可能会对人员造成危险并损坏系统。本产品适合室内安装。请让本产品远离水、火、潮湿或高温环境。请仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。连接系统电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！如果设备出现故障，请断开其电源。最快的方法是从电源插座中拔出电源插头。客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 使用您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备设计用于室内，可使用随附的机架安装耳安装在机架式机箱中，也可以放置在桌面上。使用十字螺丝刀将机架安装耳固定在设备两侧：

- 将机架安装耳固定到右前侧。
- 将机架安装耳固定到左前侧。
- 如有需要，安装理线支架。

![](/img/b33c6771cd429919.webp)

本设备没有防水污染保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 网线。本设备的安装和配置应由合格人员完成。

## 扩展插槽和端口 {#extension-slots-and-ports}

<table><thead><tr><th>**产品代码**</th><th>CRS354-48G-4S+2Q+RM</th></tr></thead><tbody><tr><td>**CPU**</td><td>QCA9531，650 MHz</td></tr><tr><td>**CPU 架构**</td><td>MIPSBE</td></tr><tr><td>**CPU 核心数**</td><td>1</td></tr><tr><td>**交换芯片型号**</td><td>98DX3257</td></tr><tr><td>**RAM**</td><td>128 MB</td></tr><tr><td>**存储**</td><td>32 MB Flash</td></tr><tr><td>**1G 以太网 (RJ45)**</td><td>48</td></tr><tr><td>**10G SFP+ 端口**</td><td>4</td></tr><tr><td>**40G QSFP+ 端口**</td><td>2</td></tr><tr><td>**串行控制台 (RJ45)**</td><td>1</td></tr><tr><td>**操作系统**</td><td>RouterOS v7（许可证级别 5）/ SwitchOS（双启动）</td></tr><tr><td>**工作温度**</td><td>-20 °C 至 +60 °C</td></tr><tr><td>**机箱尺寸**</td><td>297 × 443 × 44 mm</td></tr></tbody></table>

有关 MikroTik SFP 模块兼容性和配置表，请访问帮助页面：MikroTik 有线接口兼容性

## 供电 {#powering}

本设备可通过两路 100 – 240 V AC ⏦ 输入供电。本设备在最大负载下的功耗最高为 50 W。含附件时为 60 W。

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档可在以下地址获取：[https://mt.lv/help](https://mt.lv/help) 您可以使用网页浏览器中的 WebFig 或 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方式以确保可访问性。** **要开始设置，请在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。该设备配备一个 RJ45 串行端口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无奇偶校验。出于恢复目的，可以从网络重新安装设备，请参阅 Reset 按钮。

Marvell Prestera 交换芯片功能用户手册

该设备支持启动 RouterOS（用于完整的路由和交换功能）或 SwOS（仅用于交换操作）。默认情况下，设备启动进入 RouterOS，但您可以按如下方式切换到另一个操作系统：

- 从 SwOS：转到 System 菜单，点击页面底部的 Boot RouterOS 按钮。
- 从 RouterOS：打开 System → RouterBOARD → Settings 并选择 Boot OS。也可以使用串行控制台菜单选择操作系统并配置其他启动选项。

## Reset 按钮 {#reset-button}

- 在启动期间按住此按钮，直到 USR LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 按住 Reset 按钮并给设备上电（等待 "USR" LED 闪烁后稳定为 "On"，当 "USR" LED 变为 "Off" 时松开 Reset 按钮）——设备将以 bootp 模式启动，以使用 Netinstall 重新安装 RouterOS。**MGMT 以太网端口用于 Netinstall 过程。** 有关使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。无论使用上述哪种方式，如果在设备上电之前按下该按钮，系统都将加载备份 RouterBOOT 加载程序。在 LED 开始闪烁之前松开按钮，即可仅加载备份 RouterBOOT 而不进行重置。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

产品包装内含以下随设备提供的配件：

![](/img/30cbe5f56587a6cf.webp)

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及更高版本。出厂预装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。
