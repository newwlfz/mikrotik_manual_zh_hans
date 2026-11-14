---
title: "CRS326-24S+2Q+RM"
slug: /crs326-24s-plus-2q-plus-rm
source: https://manual.mikrotik.com/hardware/crs326-24s-plus-2q-plus-rm
captured_at: '2026-11-04T09:46:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/9ab3febba35a1f79.webp)

## [CRS326-24S+2Q+RM](https://mikrotik.com/product/crs326_24s_2q_rm) {#crs326-24s2qrm}

CRS326 是一款带有 24 个 10G SFP+ 端口和两个 QSFP+ 40G 端口的网络交换机。该设备可直接作为交换机使用。完整规格和产品手册请参见 [CRS326-24S+2Q+RM 产品页面](https://mikrotik.com/product/crs326_24s_2q_rm)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于机架安装。开始安装前请仔细阅读安装说明。使用错误的硬件或未遵循正确的步骤可能导致人员危险和系统损坏。
- 本产品适合室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 若设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 将您的 PC 连接到以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 配置应使用 Web 浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行。**提供多种配置方式以确保可访问性；**
- 在 Web 浏览器中打开 https://192.168.88.1 以开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后通过 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，然后在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保最佳的性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备设计用于室内使用。可使用随附的机架支架将其安装在机架机箱中，或放置在桌面上。桌面使用时，请将橡胶脚垫安装到设备底部；机架安装时，请使用十字螺丝刀将机架耳片安装到两侧：

- 将机架耳片安装到设备两侧，并拧紧四颗螺丝将其固定到位，如图所示；
- 将设备放入机架机箱并对齐螺孔，使其安装顺畅；
- 拧紧螺丝将其固定到位。

![](/img/837a6d2bb5f312fe.webp)

本设备的 IP 防护等级为 IPX0。设备没有防水保护，请确保将设备放置在干燥通风的环境中。

本设备的安装和配置应由合格人员进行。我们建议为我们的设备使用 Cat5/6 网线。

## 供电 {#powering}

本设备由两个 100-240 V AC 输入供电。

本设备在最大负载下的功耗最高为 42 W。带附加设备时最高为 69 W。

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档可在 [https://mt.lv/help](https://mt.lv/help) 获取。设备可使用 Web 浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性。**

在 Web 浏览器中打开 https://192.168.88.1 以开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后通过 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。

本设备配备一个 RJ45 串口控制台端口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。为便于恢复，可以通过网络重新安装设备，请参阅复位按钮。

Marvell Prestera 交换芯片的功能在 [Marvell Prestera switch chip features](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册中有描述。

设备支持启动 RouterOS 或 SwOS。默认情况下，设备启动进入 RouterOS。要切换到另一个操作系统：

- 从 SwOS 中：进入 **System** 菜单，点击页面底部的 "**Boot RouterOS**" 按钮；
- 从 RouterOS 中：打开 **System → RouterBOARD → Settings** 并选择 **Boot OS**。

也可以使用串口控制台菜单选择操作系统并配置其他启动选项。

## 规格 {#specifications}

<table><thead><tr><th>**产品代码**</th><th>CRS326-24S+2Q+RM</th></tr></thead><tbody><tr><td>**CPU**</td><td>QCA9531, 650 MHz</td></tr><tr><td>**CPU 架构**</td><td>MIPSBE</td></tr><tr><td>**CPU 核心数**</td><td>1</td></tr><tr><td>**交换芯片型号**</td><td>98DX8332</td></tr><tr><td>**RAM**</td><td>128 MB（早期硬件版本为 64 MB）</td></tr><tr><td>**存储**</td><td>16 MB Flash</td></tr><tr><td>**10/100 以太网 (RJ45)**</td><td>1</td></tr><tr><td>**10G SFP+ 端口**</td><td>24</td></tr><tr><td>**40G QSFP+ 端口**</td><td>2</td></tr><tr><td>**USB Type-A 端口**</td><td>1</td></tr><tr><td>**串口控制台 (RJ45)**</td><td>1</td></tr><tr><td>**操作系统**</td><td>RouterOS v7（许可证级别 5）/ SwOS（双启动）</td></tr><tr><td>**工作温度**</td><td>-20 °C 至 +60 °C</td></tr><tr><td>**机壳尺寸**</td><td>443 × 200 × 44 mm</td></tr></tbody></table>

支持的 SFP 模块请参见 [MikroTik wired interface compatibility](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。

## 复位按钮 {#reset-button}

- 要重置配置，请断开设备电源，按住复位按钮，并在 USER (USR) LED 开始闪烁时松开；
- 要加载备份引导程序，请在接通电源之前按住复位按钮，三秒后松开；
- 要启动 Netinstall 流程（以 BOOTP 模式启动设备以重新安装 RouterOS），请按住复位按钮，给设备上电，等待 USER (USR) LED 闪烁后变为常亮。当 USR LED 熄灭时，松开复位按钮。

无论使用上述哪种方式，如果在设备接通电源之前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含随设备提供的以下配件：

![](/img/10495ba102c10e83.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本以及 SwOS。具体的出厂预装 RouterOS 版本列在 /system resource 中。其他操作系统尚未经过测试。
