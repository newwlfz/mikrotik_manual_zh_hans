---
title: "CRS804-4DDQ-hRM"
slug: /crs804-4ddq-hrm
source: https://manual.mikrotik.com/hardware/crs804-4ddq-hrm
captured_at: '2026-11-04T09:47:26+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![CRS804 DDQ](/img/061c0cdafc4d6be6.jpg)

这是一款紧凑的 1U 400G 交换机，专为 AI 集群、存储网络和高速汇聚而打造，配备四个 400G QSFP56-DD 端口、双 10 Gigabit Ethernet 端口以及 RouterOS v7。完整规格和手册请参见 [CRS804-4DDQ-hRM 产品页面](https://mikrotik.com/product/crs804_ddq)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应按照所有国家和地区的法律法规执行。设备的安装必须符合当地和国家的电气规范。本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤可能对人员造成危险并损坏系统。本产品设计用于室内安装。请使本产品远离水、火、潮湿或高温环境。仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。电源插座应安装在设备附近且易于插拔。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！如果设备出现故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。客户有责任遵守当地国家的法规。所有 MikroTik 设备必须由专业人员安装。本产品为 A 类产品。在家庭环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施

## 快速开始 {#quickstart}

- 将您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。接着使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单并重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码：**CRS804-4DDQ-hRM**。
- CPU：四核 AL52400 2000 MHz。
- CPU：架构 ARM 64bit。
- RAM 容量：4 GB。
- RAM 类型：DDR4。
- 存储：512 MB，NAND。
- 10M/100M/1G/10G 以太网端口数量：2 个。标记为 **MGMT/BOOT**。可以在 System → RouterBOARD → Settings → Etherboot Port 中将 **Ether1** 或 **Ether2** 设置为 **Etherboot port**。
- 400G QSFP56-DD 端口数量：4 个。
- PoE-out 端口：Ether9-Ether16，802.3af/at，总输出功率 150 W。
- 1x RJ45 控制台端口（设置为 115200bits/s，8 数据位，1 停止位，无奇偶校验）。
- 交换芯片型号：98DX7335。
- 尺寸：387 x 218 x 44 mm。
- 操作系统 RouterOS：v7，许可证级别 6。
- 工作温度：-10°C 至 +60°C。
- IP：20 支持的 SFP 模块请参见 [MikroTik 有线接口兼容性](/docs/wired-connections/mikrotik-wired-interface-compatibility)表。

## LED 指示灯 {#led-indicators}

- 当路由器由使用中的 PSU 供电时，PWR1、PWR2 LED 会点亮。
- USER LED 指示设备在以上电方式进入不同模式时的状态，例如重置配置或为 Netinstall 工具启动设备。
- FAULT LED 指示任何散热风扇出现问题。

## 安装 {#mounting}

本设备设计用于室内使用，可使用随附的机架安装配件安装在 1U 机架式机箱中，或放置在平坦表面上。对于桌面安装，请将随附的橡胶脚垫安装到设备底部。对于机架安装，请按下文所述，使用十字螺丝刀将机架安装耳片安装到设备上。

### 在 1U 机架式机箱中安装单台设备 {#single-device-installation-in-a-1u-rackmount-enclosure}

![](/img/b3a5c211837424ae.webp)

- 将前部机架安装支架安装到设备的一侧。
- 将长机架安装支架安装到相对的一侧。
- 将后部支撑耳片安装到设备上。
- 如图所示，使用四颗螺丝固定所有支架。
- 将设备放入机架式机箱，并对齐安装孔。
- 拧紧机架螺丝，将设备固定到位。

![](/img/792dc366979acbe7.webp)

#### 使用 RMK-2x10/19 安装两台 CRS804-4DDQ-hRM 设备 {#installing-two-crs804-4ddq-hrm-devices-using-rmk-2x1019}

使用 RMK-2x10/19 套件（包装内含），可以在单个 1U 机架单元内并排安装两台 CRS804-4DDQ-hRM 设备。

![](/img/dd4da1d5c0ab0cc9.webp)

- 将前部机架安装支架和后部支撑耳片安装到每台设备的同一（相对）侧。
- 如图所示，使用四颗螺丝固定每个支架。
- 将 RMK-2x10/19 安装部件安装到两台设备的其余两侧。
- 如图所示，使用四颗螺丝固定 RMK-2x10/19 部件。
- 按照安装指南将两台设备对齐并卡合在一起。
- 将组装好的单元放入机架式机箱，并对齐安装孔。
- 拧紧机架螺丝，将组件固定到位。

![](/img/ed96d20dcf59d102.webp)

本设备不具备防水保护；请将其安装在干燥、通风良好的位置。我们建议在我们的设备上使用 Cat 6 网线。本设备的安装和配置应由专业人员完成。

## 供电 {#powering}

本设备配备两个支持热插拔的 IEC 类型 AC 电源 G1394-0350WNA。AC 输入 100-240 V ⏦（~ 50/60 Hz 8 A 最大）。DC 输入 240V，27,5A MAX +5VSB，4A。不含附加组件时的最大功耗为 92 W，在最大负载下可达 123W。

## 配置 {#configuration}

RouterOS 的完整文档可在以下地址获取：[https://mt.lv/help](https://mt.lv/help) 您可以使用网页浏览器中的 WebFig 或 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方式以确保可访问性。** **要开始设置，请在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。接着使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。设备配备 RJ45 串行端口，默认设置为 115200 bit/s、8 数据位、1 停止位、无奇偶校验。出于恢复目的，可以从网络重新安装设备，请参见 Reset 按钮。

Marvell Prestera 交换芯片功能用户手册

## 散热 {#cooling}

本设备配备两个 New MT-HotSwapFan-V2 单元。

## 按钮 {#buttons}

**Reset 按钮**：

- 在启动期间按住此按钮，直到 USR LED 开始闪烁，再松开按钮即可重置 RouterOS 配置。
- 按住 Reset 按钮并给设备上电（等待 "USR" LED 闪烁后变为稳定的 "On"，当 "USR" LED 变为 "Off" 时松开 Reset 按钮）——设备将以 bootp 模式启动，使用 Netinstall 重新安装 RouterOS。**MGMT/BOOT 以太网端口（Ether1 或 Ether2）用于 Netinstall 过程。** 关于使用 Netinstall 恢复工具的说明，请参见 RouterOS 文档。无论使用上述哪种方式，如果在设备上电之前按钮已被按下，系统都会加载备份的 RouterBOOT 引导程序。在 LED 开始闪烁之前松开按钮，则仅加载备份 RouterBOOT 而不进行重置。这对于 RouterBOOT 调试和恢复非常有用。

## 配件 {#accessories}

包装内包含以下随设备提供的配件：

![](/img/c863b0f847cac7c0.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列在 /system resource 中。其他操作系统尚未经过测试。
