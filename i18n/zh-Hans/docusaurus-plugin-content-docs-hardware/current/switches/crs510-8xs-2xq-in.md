---
title: "CRS510-8XS-2XQ-IN"
slug: /crs510-8xs-2xq-in
source: https://manual.mikrotik.com/hardware/crs510-8xs-2xq-in
captured_at: '2026-11-04T09:46:59+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/da327122ff8856a5.jpg)

一台用途广泛的 100 Gigabit 交换机，兼具速度、性价比与多样化的连接选项。2 个 100 Gigabit QSFP28 端口、8 个 25 Gigabit SFP28 端口、双热插拔电源。完整规格与产品手册请参阅 [CRS510-8XS-2XQ-IN 产品页面](https://mikrotik.com/product/crs510_8xs_2xq_in)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵守所有国家法律和法规。设备的安装必须符合当地和国家的电气规范。本设备设计用于机架安装。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能会给人员带来危险并损坏系统。本产品仅供室内安装使用。请让本产品远离水、火、潮湿或高温环境。仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

- 将您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法，以确保可访问性；**
- 在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户密码和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置路由器密码。

## 安装 {#mounting}

本设备设计用于室内使用，可使用随附的机架安装件安装在机架机箱中，也可以放置在桌面上。如果希望放置在平坦表面上，请在路由器底部贴上橡胶脚垫；如果指定用于机架机箱，请使用十字螺丝刀在设备两侧安装机架耳件：

- 如图所示，将机架耳件安装到设备两侧，并拧紧四颗螺丝将其固定到位。
- 将设备放入机架机箱并对准孔位，使设备顺利安装。
- 拧紧螺丝将其固定到位。

![](/img/27bf22aa32ecbced.webp)

本设备的 IP 防护等级为 IPX0。该设备不具备防水污染保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用屏蔽 Cat5/6 网线。本设备的安装*与配置应由合格人员进行。*

## 配置 {#configuration}

RouterOS 的完整文档可在以下地址获取：[https://mt.lv/help](https://mt.lv/help) 您可以使用网页浏览器中的 WebFig 或 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方法，以确保可访问性。** **要开始设置，请在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户密码和无线密码）。本设备配备一个 RJ45 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无奇偶校验。出于恢复目的，可以从网络重新安装设备，请参见 Reset 按钮。

Marvell Prestera 交换芯片功能用户手册

## 供电 {#powering}

- DC 输入数量 3（PoE-in、DC 插孔、2 针端子）
- PoE-in 输入电压 43-57 V Passive PoE 或 802.3bt Class 6
- DC 插孔输入电压 36-57 V
- 2 针端子输入电压 36-57 V
- AC 输入数量 2
- AC 输入范围 100-240 V
- 频率 47-63 Hz
- 无附件时最大功耗 27 W
- 最大功耗 45 W

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代号 CRS510-8XS-2XQ-IN
- CPU QCA9531 650 MHz
- CPU 架构 MIPSBE
- CPU 核心数 1
- RAM 容量 128 MB
- 存储 32 MB，Flash
- 100M 以太网端口数量 1
- 25G SFP28 端口数量 8
- 100G QSFP28 端口数量 2
- 交换芯片型号 98DX4310
- 尺寸 320 x 185 x 44 mm
- 操作系统 RouterOS v7，许可证级别 5
- 工作温度 -40°C 至 +70°C

## Reset 按钮 {#reset-button}

RouterBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置并恢复默认值。
- 当 LED 熄灭后（约 20 秒）松开按钮，可使设备搜索 Netinstall 服务器（通过网络安全重装 RouterOS 时需要）。无论使用上述哪种方式，如果在设备接通电源之前就按住了按钮，系统将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含随设备提供的以下附件：

![](/img/ef3af0d9213c99f8.webp)

有关 MikroTik SFP 模块兼容性和配置表，请访问帮助页面：MikroTik 有线接口兼容性

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。
