---
title: "CRS504-4XQ-OUT"
slug: /crs504-4xq-out
source: https://manual.mikrotik.com/hardware/crs504-4xq-out
captured_at: '2026-11-04T09:47:01+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/88498ad0f5a4d896.jpg)

价格实惠、结构紧凑、节能高效的 100 Gbps 网络，随时随地（ANYWHERE）！IP66 防护外壳，4 个 100 Gigabit 端口，多种供电方式。完整规格和宣传册请参见 [CRS504-4XQ-OUT 产品页面](https://mikrotik.com/product/crs504_4xq_out)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵循所有国家法律和法规。设备的安装必须符合当地和国家电气规范。本设备适用于机架安装。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能对人员造成危险并损坏系统。本产品适用于室内安装。请使本产品远离水、火、潮湿或高温环境。仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！如果设备发生故障，请断开其电源。最快的做法是将电源插头从电源插座上拔下。客户有责任遵守所在国家/地区的规定，包括在合法频段内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 用您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在 Web 浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保最佳性能、稳定性和安全更新；
- 设置您的路由器密码。该设备应用于光纤场景，线缆可穿过电缆密封接头后连接到 QSFP 模块。它还支持带不可分离连接器的 DAC、AOC 和 Breakout 线缆，但在某些端口上使用时，必须拆下电缆密封接头。请注意，在不使用电缆密封接头的情况下使用本设备，其 IP 等级将从 IP66 降至 IP54。

## 安装 {#mounting}

## 250 {#250}

## 供电 {#powering}

- DC 输入数量 3（PoE-in、DC 插孔、2 针端子）
- PoE-in 输入电压 43-57 V 802.3bt
- DC 插孔输入电压 36-57 V
- 2 针端子输入电压 36-57 V
- 电源适配器标称电压 48 V
- 电源适配器标称电流 0.95 A
- 最大功耗（不含附件）25 W
- 最大功耗 38 W

## 配置 {#configuration}

RouterOS 的完整文档参见：[https://mt.lv/help](https://mt.lv/help) 您可以在 Web 浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方式以确保可访问性。** **要开始设置，请在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。设备配有 RJ45 串行端口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。出于恢复目的，可以从网络重新安装设备，请参阅 Reset 按钮。

Marvell Prestera 交换芯片功能用户手册

## 扩展插槽和端口 {#extension-slots-and-ports}

- 4CRS504-4XQ-OUT
- 产品代码 CRS504-4XQ-OUT
- CPU QCA9531 650 MHz
- CPU 架构 MIPSBE
- CPU 核心数 1
- RAM 容量 128 MB
- 存储 32 MB，Flash
- 100M 以太网端口数量 1
- 100G QSFP28 端口数量 4
- 交换芯片型号 98DX4310
- IP 等级 IP66
- 尺寸 330 x 200 x 70 mm
- 操作系统 RouterOS v7，许可级别 5
- 工作温度 -40°C 至 +70°C

## Reset 按钮 {#reset-button}

- 要重置配置，请断开设备电源，按住 Reset 按钮，当 USER（USR）LED 开始闪烁时松开。
- 要加载备份引导程序，请在通电前按住 Reset 按钮，然后三秒后松开。
- 要启动 Netinstall 过程（以 BOOTP 模式启动设备以重新安装 RouterOS），请按住 Reset 按钮，给设备通电，等待 USER（USR）LED 闪烁后变为常亮。当 USR LED 熄灭时，松开 Reset 按钮。无论使用上述哪种方式，只要在设备通电前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内含以下随设备提供的附件：

![](/img/da4a2e2f6fc0b0d2.webp)

有关 MikroTik SFP 模块兼容性和配置表，请访问帮助页面：MikroTik wired interface compatibility

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。
