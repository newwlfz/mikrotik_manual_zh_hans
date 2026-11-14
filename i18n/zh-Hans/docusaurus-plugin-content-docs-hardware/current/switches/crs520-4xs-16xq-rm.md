---
title: "CRS520-4XS-16XQ-RM"
slug: /crs520-4xs-16xq-rm
source: https://manual.mikrotik.com/hardware/crs520-4xs-16xq-rm
captured_at: '2026-11-04T09:47:02+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/3c0b35575e792c18.jpg)

这是一款超高速企业级交换机，借助 CCR 系列 CPU 提供额外的处理能力，并拥有市场上每 100 Gigabit 端口的最佳价格！完整规格与产品手册请参见 [CRS520-4XS-16XQ-RM 产品页面](https://mikrotik.com/product/crs520_4xs_16xq_rm)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵守所有国家法律法规。设备的安装必须符合当地和国家的电气规范。本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用不正确的硬件或不遵循正确的操作流程可能导致人员危险和系统损坏。本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。仅使用制造商认可且可在本产品原包装中找到的电源和配件。插座应安装在设备附近并便于插拔。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。客户有责任遵守当地国家法规。所有 MikroTik 设备必须由专业人员安装。本产品为 Class A 产品。在住宅环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施

## 快速开始 {#quickstart}

- 使用您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡查找设备。然后通过 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，某些型号请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备设计用于室内使用，可使用随附的机架安装耳件安装在机架机箱中，也可以放置在桌面上。如果希望放置在平坦表面上，请在路由器底部贴上橡胶脚垫；如果指定用于机架机箱，请使用十字螺丝刀在设备两侧安装机架耳件：

- 将机架耳件和后部支撑耳件安装到设备两侧，并拧紧四颗螺丝将其固定到位，如图所示。

![](/img/837a6d2bb5f312fe.webp)

- 将设备放入机架机箱并对齐孔位，使设备方便就位。
- 拧紧螺丝将其固定到位。本设备不具备防水污染保护，请确保将设备放置在干燥通风的环境中。我们建议为我们的设备使用 Cat6 网线。本设备的安装和配置应由具备资质的人员完成。

## 供电 {#powering}

本设备配备两个热插拔 IEC 型 AC 电源，150W，支持 100-240 V ⏦（~ 50/60 Hz，最大 12.5 A）。不带附件时的最大功耗为 123 W，在最大负载下可达 150W。

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档可在以下地址获取：[https://mt.lv/help](https://mt.lv/help) 您可以在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方式以确保可访问性。** **要开始设置，请在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡查找设备。然后通过 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，某些型号请查看贴纸上的用户和无线密码）。本设备配备 RS-232 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。出于恢复目的，可以从网络重新安装设备，请参见 Reset 按钮。

Marvell Prestera 交换芯片功能用户手册

本设备支持启动 RouterOS（以获得完整的路由和交换功能）或 SwOS（仅用于交换操作）。默认情况下，设备启动进入 RouterOS，但您可以按如下方式切换到其他操作系统：

- 从 SwOS：进入 System 菜单，点击页面底部的 Boot RouterOS 按钮。
- 从 RouterOS：打开 System → RouterBOARD → Settings 并选择 Boot OS。也可以通过串口控制台菜单选择操作系统并配置其他启动选项。

## 散热 {#cooling}

本设备配备四个 MT-HotSwapFan 单元。

## 按钮 {#buttons}

**Reset 按钮**：

- 在启动过程中按住此按钮，直到 USR LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 按住 Reset 按钮并给设备上电（等待 "USR" LED 闪烁后变为稳定 "On"，当 "USR" LED 变为 "Off" 时——松开 Reset 按钮）——设备将以 bootp 模式启动，以便使用 Netinstall 重新安装 RouterOS。**MGMT/BOOT 以太网端口用于 Netinstall 过程。** 有关使用 Netinstall 恢复工具的说明，请参见 RouterOS 文档。无论使用上述哪种方式，如果在设备上电前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。请在 LED 开始闪烁之前松开按钮，以便仅加载备份 RouterBOOT 而不进行重置。这对于 RouterBOOT 调试和恢复很有用。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 十六个 100G QSFP28 端口。
- 四个 25G SFP28 端口。
- 两个用于管理访问的 1G/10G 以太网端口。
- 1x RJ45 控制台端口（设置为 115200bits/s、8 个数据位、1 个停止位、无校验）。有关 MikroTik SFP 模块兼容性和配置表的说明，请访问帮助页面：MikroTik 有线接口兼容性

## LED 指示灯 {#led-indicators}

- PWR1、PWR2 LED 在使用中的 PSU 为路由器供电时点亮。
- USER LED 指示设备在启动进入不同模式（例如重置配置或为 Netinstall 工具启动设备）时的状态。
- FAULT LED 指示任一散热风扇出现问题。

## 配件 {#accessories}

包装中随附以下配件：

![](/img/e3bdbf6673924349.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。
