---
title: "CRS309-1G-8S+IN"
slug: /crs309-1g-8s-plus-in
source: https://manual.mikrotik.com/hardware/crs309-1g-8s-plus-in
captured_at: '2026-11-04T09:46:07+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/50559d4a3b03e7db.jpg)

## [CRS309-1G-8S+IN](https://mikrotik.com/product/crs309_1g_8s_in) {#crs309-1g-8sin}

本设备是一台配有八个 SFP+ 端口和一个千兆端口的网络交换机。它已完成配置，所有端口都已交换连通。完整规格和宣传资料请参见 [CRS309-1G-8S+IN 产品页面](https://mikrotik.com/product/crs309_1g_8s_in)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备应安装在机架中。安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品仅供室内安装使用。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快速的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

- 安装本设备或将其放置在平坦表面上，参见安装；
- 选择你的供电方案，参见供电；
- 将你的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 配置应使用 Web 浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 完成。**提供多种配置方式以确保可访问性；**
- 在 Web 浏览器中打开 https://192.168.88.1 以开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看标签上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择你的型号，并在 "Downloads" 部分中找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置你的路由器密码。

## 安装 {#mounting}

![](/img/27bf22aa32ecbced.webp)

本设备设计用于室内，可使用随附的机架安装件安装在机架式机箱中，也可以放置在桌面上。如果希望放置在平坦表面上，请在路由器底部贴上橡胶脚垫；如果指定用于机架式机箱，请使用十字螺丝刀将机架耳固定在设备两侧。

- 将机架耳固定到设备两侧，并拧紧四颗螺丝将其固定到位，如右图所示。
- 将设备放入机架式机箱并对准孔位，使设备能够方便地安装。
- 拧紧螺丝将其固定到位。本设备的 IP 防护等级为 IPX0。本设备不具备防水污染保护，请确保将设备放置在干燥通风的环境中。我们建议为我们的设备使用屏蔽 Cat5/6 网线。*本设备的安装和配置应由具备资质的人员完成。*

## 供电 {#powering}

本设备可通过直插式电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 12-57 V DC ⎓ 输入。以太网端口 1 支持 802.3af/at 和无源 PoE 供电输入（18-57 V DC）。本设备在最大负载下的功耗最高为 23 W。可以同时连接两路电源输入，它们将以故障切换模式工作（电压较高的输入将作为主电源）。使用 802.3af/at 为本设备供电时，为获得最佳兼容性，我们建议不要使用接地。

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档可在 [https://mt.lv/help](https://mt.lv/help) 获取。本设备可使用 Web 浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性。**

在 Web 浏览器中打开 https://192.168.88.1 以开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看标签上的用户和无线密码）。

本设备配备一个 RS-232 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。出于恢复目的，可以从网络重新安装设备，参见复位按钮。

Marvell Prestera 交换芯片的功能在 [Marvell Prestera switch chip features](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册中介绍。

本设备支持启动 RouterOS（用于完整的路由和交换功能）或 SwOS（仅用于交换运行）。默认情况下，设备启动进入 RouterOS，但你可以按如下方式切换到另一个操作系统：

- 从 SwOS：进入 **System** 菜单，点击页面底部的 "**Boot RouterOS**" 按钮。
- 从 RouterOS：打开 **System → RouterBOARD → Settings** 并选择 **Boot OS**。

也可以使用串口控制台菜单选择操作系统并配置其他启动选项。

## 复位按钮 {#reset-button}

- 要重置配置，请断开设备电源，按住复位按钮，并在 USER (USR) LED 开始闪烁时松开。
- 要加载备份引导程序，请在接通电源之前按住复位按钮，然后三秒后松开。
- 要启动 Netinstall 过程（以 BOOTP 模式启动设备以重新安装 RouterOS），请按住复位按钮，给设备上电，并等待 USER (USR) LED 闪烁后变为常亮。当 USR LED 熄灭时，松开复位按钮。

无论使用上述哪种方式，只要在给设备通电之前按下按钮，系统就会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## LED 指示灯 {#led-indicators}

- 当路由器通过 DC 插孔或 PoE 供电时，电源 LED 点亮。
- 用户 LED 可从 RouterOS 进行配置。
- 端口 LED 指示各个以太网和 SFP 端口的活动状态。

## 规格 {#specifications}

<table><thead><tr><th>**产品代码**</th><th>CRS309‑1G‑8S+IN</th></tr></thead><tbody><tr><td>**CPU**</td><td>98DX8208, 800 MHz</td></tr><tr><td>**CPU 架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU 核心数**</td><td>2</td></tr><tr><td>**交换芯片型号**</td><td>98DX8208</td></tr><tr><td>**RAM**</td><td>512 MB</td></tr><tr><td>**存储**</td><td>16 MB Flash</td></tr><tr><td>**1G 以太网 (RJ45)**</td><td>1</td></tr><tr><td>**10G SFP+ 端口**</td><td>8</td></tr><tr><td>**操作系统**</td><td>RouterOS / SwOS (双启动)</td></tr><tr><td>**工作温度**</td><td>‑40 °C 至 +70 °C</td></tr><tr><td>**外壳尺寸**</td><td>272 × 191 × 44 mm</td></tr></tbody></table>

## 配件 {#accessories}

包装内含以下随设备附带的配件：

![](/img/8c36c3fbb0b4f6fe.webp)

受支持的 SFP 模块请参见 [MikroTik wired interface compatibility](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。

## 操作系统支持 {#operating-system-support}

本设备支持与 SwOS 2.9 及更高版本以及 RouterOS 7 或更高版本的双启动。具体的出厂安装 RouterOS 版本可在 RouterOS 菜单的 /system resource 下查看。其他操作系统未经测试，也不受官方支持。
