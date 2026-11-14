---
title: "CRS317-1G-16S+RM"
slug: /crs317-1g-16s-plus-rm
source: https://manual.mikrotik.com/hardware/crs317-1g-16s-plus-rm
captured_at: '2026-11-04T09:46:24+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/84737252c152a168.jpg)

## [CRS317-1G-16S+RM](https://mikrotik.com/product/crs317_1g_16s_rm) {#crs317-1g-16srm}

智能交换机，1 个千兆 LAN 口，16 个 SFP+ 笼，双核 800MHz CPU，1GB 内存，1U 机架式被动散热机箱，双电源。完整规格与宣传册请参阅 [CRS317-1G-16S+RM 产品页面](https://mikrotik.com/product/crs317_1g_16s_rm)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终废弃处理应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤可能导致对人员的危险情况以及对系统的损坏。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

- 用您的 PC 连接到任意以太网口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备设计用于室内使用，可使用随附的机架安装件安装在机架机箱中，也可以放置在桌面上。如果希望放置在平整表面上，请在路由器底部贴上橡胶脚垫；如果指定用于机架机箱，请使用十字螺丝刀在设备两侧安装机架挂耳：

- 将机架挂耳安装到设备两侧，并拧紧四颗螺丝将其固定到位，如图所示。
- 将设备放入机架机箱并对齐孔位，使设备安装顺畅。

![](/img/837a6d2bb5f312fe.webp)

- 拧紧螺丝将其固定到位。

本设备的 IP 防护等级为 IP0。设备没有防水污染保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 网线。本设备的安装和配置应由具备资质的人员完成。

## 供电 {#powering}

本设备可通过两个 IEC C14 标准接口供电，支持 AC 110/240 V ⏦。同一时间只有一个 PSU 处于工作状态，第二个用于冗余。不含 PoE 注入器。本设备在最大负载下的功耗最高为 44W。

本设备配有被动散热器，正常负载下将静音运行，但在紧急情况下，如果环境温度高于正常水平，两个冗余风扇会自动开启以保持设备冷却。本设备已通过测试，可在 -20 ℃ 至 +60 ℃ 的环境温度下工作。

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档可在 [https://mt.lv/help](https://mt.lv/help) 获取。本设备可使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性。**

在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。

本设备配备一个 RJ45 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。出于恢复目的，可以从网络重新安装设备，请参阅复位按钮。

Marvell Prestera 交换芯片的特性在 [Marvell Prestera switch chip features](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册中有描述。

本设备支持启动 RouterOS（用于完整的路由和交换功能）或 SwOS（仅用于交换操作）。默认情况下，设备启动进入 RouterOS，但您也可以按如下方式切换到另一个操作系统：

- 从 SwOS：进入 **System** 菜单，然后单击页面底部的 "**Boot RouterOS**" 按钮。
- 从 RouterOS：打开 **System → RouterBOARD → Settings** 并选择 **Boot OS**。

也可以使用串口控制台菜单来选择操作系统并配置其他启动选项。

## 规格 {#specifications}

<table><thead><tr><th>**产品代码**</th><th>CRS317‑1G‑16S+RM</th></tr></thead><tbody><tr><td>**CPU**</td><td>98DX8216, 800 MHz</td></tr><tr><td>**CPU 架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU 核心数**</td><td>2</td></tr><tr><td>**交换芯片型号**</td><td>98DX8216</td></tr><tr><td>**内存**</td><td>1 GB</td></tr><tr><td>**存储**</td><td>16 MB Flash</td></tr><tr><td>**1G 以太网 (RJ45)**</td><td>1</td></tr><tr><td>**10G SFP+ 端口**</td><td>16</td></tr><tr><td>**串口控制台 (RJ45)**</td><td>1</td></tr><tr><td>**操作系统**</td><td>RouterOS（license level 6）/ SwOS（双启动）</td></tr><tr><td>**工作温度**</td><td>‑20 °C 至 +60 °C</td></tr><tr><td>**机箱尺寸**</td><td>443 × 224 × 44 mm</td></tr></tbody></table>

## 复位按钮 {#reset-button}

- 要复位配置，请断开设备电源，按住复位按钮，并在 USER (USR) LED 开始闪烁时松开。
- 要加载备份引导程序，请在通电前按住复位按钮，三秒后松开。
- 要启动 Netinstall 过程（以 BOOTP 模式启动设备以重新安装 RouterOS），请按住复位按钮，给设备通电，等待 USER (USR) LED 闪烁后变为常亮。当 USR LED 熄灭时，松开复位按钮。

无论使用上述哪种方式，如果在设备通电前按住按钮，系统都会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## SwOS 复位与重装 {#swos-reset-and-reinstall}

CRS317-1G-16S+ 内置备份 SwOS 固件，可在标准固件损坏或升级失败时加载：

- 在 CRS317-1G-16S+ 启动时按住复位按钮几秒钟，会复位配置并加载备份 SwOS 固件。
- 加载备份 SwOS 固件后，可以使用网页浏览器连接到 192.168.88.1 并安装新的 SwOS 固件。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

![](/img/521a0300a1918465.webp)

请访问 wiki 页面查看 MikroTik SFP 模块兼容性表：MikroTik 有线接口兼容性。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统未经过测试。
