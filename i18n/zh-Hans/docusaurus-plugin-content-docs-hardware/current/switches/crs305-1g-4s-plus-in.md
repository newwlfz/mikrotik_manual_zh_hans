---
title: "CRS305-1G-4S+IN"
slug: /crs305-1g-4s-plus-in
source: https://manual.mikrotik.com/hardware/crs305-1g-4s-plus-in
captured_at: '2026-11-04T09:46:07+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/7ff531321da06c88.jpg)

## [CRS305-1G-4S+IN](https://mikrotik.com/product/crs305_1g_4s_in) {#crs305-1g-4sin}

本设备是一台由 RouterOS 驱动的 10 Gigabit SFP+ 交换机。它具有两路冗余 DC 输入。设备带有四个 SFP+ 插槽（模块不包含在内），用于高性能 10GbE 连接（也支持 1.25 Gbit 模块），另有 1GbE 铜缆端口用于管理。设备开箱即可作为交换机使用。完整规格和产品手册请参见 [CRS305-1G-4S+IN 产品页面](https://mikrotik.com/product/crs305_1g_4s_in)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准操作规范。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备适合安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品适合室内安装。请让本产品远离水、火、潮湿或高温环境。
- 请仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，操作风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员进行安装。

## 快速开始 {#quickstart}

- 将您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备设计用于室内使用，可放置在平整表面上，或安装在墙上；安装在墙上时，请确保线缆入口朝下。对于我们的设备，我们建议使用 Cat5/6 屏蔽电缆。距离以 mm 为单位。

![](/img/33a15afc2ea65ae1.webp)

## 供电 {#powering}

设备可通过两个 DC 电源插孔（冗余故障转移）或第一个以太网端口供电：

- 直接输入电源插孔 DC1、DC2（外径 5.5 mm、内径 2 mm，母头，中心正极）接受 DC ⎓ 12-57 V 直流电。
- 第一个以太网端口接受 DC ⎓ 12-57 V 范围内的无源或 802.3af/at Power over Ethernet 供电。在使用全部 RJ10 铜缆模块的情况下，本设备在最大负载下配合光纤 SFP 模块的功耗为 10 W，最高可达 18 W。使用 802.3af/at 为本设备供电时，为获得最佳兼容性，我们建议不要接地。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将一根以太网电缆从设备连接到 PoE 适配器的 **PoE+DATA** **（PoE-out）** 端口。
- 将一根来自本地网络（LAN）的以太网电缆连接到 PoE 适配器的 **DATA** 端口。
- 将电源线连接到适配器，然后插入电源插座。

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档可在 [https://mt.lv/help](https://mt.lv/help) 获取。设备可使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性。**

在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。

设备配备一个 RS-232 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。为便于恢复，可以从网络重新安装设备，请参见 Reset 按钮。

Marvell Prestera 交换芯片的功能在 [Marvell Prestera switch chip features](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册中有相关说明。

设备支持启动 RouterOS（提供完整的路由和交换功能）或 SwOS（仅提供交换功能）。默认情况下，设备启动进入 RouterOS，但您可以按如下方式切换到另一个操作系统：

- 从 SwOS：进入 **System** 菜单，点击页面底部的 "**Boot RouterOS**" 按钮。
- 从 RouterOS：打开 **System → RouterBOARD → Settings** 并选择 **Boot OS**。

也可以使用串口控制台菜单选择操作系统并配置其他启动选项。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 四个 SFP+ 插槽，同时支持 1.25 Gb SFP 和 10 Gb SFP+ 模块。
- 一个千兆以太网端口，建议用于管理（支持 Auto MDI/X，因此您可以使用直通或交叉电缆连接其他网络设备）。以太网端口（ETH/BOOT）也可用于通过 Netinstall 进行网络启动和恢复。

## Reset 按钮 {#reset-button}

- 如需重置配置，请断开设备电源，按住 Reset 按钮，当 USER (USR) LED 开始闪烁时松开。
- 如需加载备份引导程序，请在通电前按住 Reset 按钮，三秒后松开。
- 如需启动 Netinstall 过程（以 BOOTP 模式启动设备以重新安装 RouterOS），请按住 Reset 按钮，给设备通电，等待 USER (USR) LED 闪烁后变为常亮。当 USR LED 熄灭时，松开 Reset 按钮。

无论使用上述哪种方式，如果在设备通电前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>**产品代码**</td><td>CRS305-1G-4S+IN</td></tr><tr><td>**架构**</td><td>ARM 32-bit</td></tr><tr><td>**CPU**</td><td>98DX3236, 2 core, 800 MHz</td></tr><tr><td>**交换芯片型号**</td><td>98DX3236</td></tr><tr><td>**RAM**</td><td>512 MB</td></tr><tr><td>**存储**</td><td>16 MB, Flash</td></tr><tr><td>**10/100/1000 以太网端口**</td><td>1</td></tr><tr><td>**SFP+ 端口**</td><td>4（每端口最高 10 Gbit）</td></tr><tr><td>**PoE-in**</td><td>802.3af/at, 12-57 V</td></tr><tr><td>**DC 插孔输入电压**</td><td>12-57 V</td></tr><tr><td>**最大功耗**</td><td>18 W</td></tr><tr><td>**不含附加模块时的最大功耗**</td><td>10 W</td></tr><tr><td>**尺寸**</td><td>141 × 115 × 28 mm</td></tr><tr><td>**工作温度**</td><td>-40 °C 至 +70 °C</td></tr><tr><td>**操作系统**</td><td>RouterOS / SwOS（双启动）</td></tr><tr><td>**认证**</td><td>CE, EAC, ROHS</td></tr><tr><td>**IP 防护等级**</td><td>IP20</td></tr></tbody></table>

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/crs305_1g_4s_in](https://mikrotik.com/product/crs305_1g_4s_in)

## 配件 {#accessories}

包装中包含随设备提供的以下配件：

![](/img/501df1fa4bf174b9.webp)

受支持的 SFP 模块请参见 [MikroTik wired interface compatibility](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及更高版本。具体的出厂预装版本列在 /system resource 中。其他操作系统尚未经过测试。
