---
title: "CRS812-8DS-2DQ-2DDQ-RM"
slug: /crs812-8ds-2dq-2ddq-rm
source: https://manual.mikrotik.com/hardware/crs812-8ds-2dq-2ddq-rm
captured_at: '2026-11-04T09:47:38+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/0336e04dd1dd22e2.jpg)

这款交换机是您的下一次飞跃——一种强大、高效且经济的方式，可将 50G、200G 和 400G 引入您的机架。四核 2 GHz ARM CPU、双冗余电源和 4 个热插拔散热风扇、2 个 10G 以太网口、8 个 50G SFP56、2 个 200G QSFP56 和 2 个 400G QSFP56-DD 端口。完整规格和宣传册请参见 [CRS812 DDQ 产品页面](https://mikrotik.com/product/crs812_ddq)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵守所有国家法律法规。设备的安装必须符合当地和国家的电气规范。本设备旨在安装于机架中。请在开始安装前仔细阅读安装说明。使用错误的硬件或未遵循正确的操作流程可能导致人员危险和系统损坏。本产品仅供室内安装。请让本产品远离水、火、潮湿或高温环境。仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。插座应安装在设备附近且便于插拔。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。客户有责任遵守当地国家的法规。所有 MikroTik 设备必须由专业人员安装。本产品为 A 类产品。在家庭环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施

## 快速开始 {#quickstart}

- 将您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig 或 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。使用 MAC 地址继续连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单并重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备专为室内使用而设计，可使用随附的机架安装支架安装在机柜中，也可以直接放置在桌面上。如果希望放置在平坦表面上，请在路由器底部安装橡胶脚垫；如果指定用途为机柜安装，请使用十字螺丝刀将机架安装耳片安装到设备两侧：

- 将机架安装耳片安装到设备的前侧。

![](/img/2008a038f299bd3d.webp)

![](/img/665133e76c421621.webp)

![](/img/a48997ad98824cd2.webp)

![](/img/777e94adf9e9ec0f.webp)

- 将小型后部机架安装支撑耳片安装到设备两侧。

![](/img/ca7257427d7f1f08.webp)

![](/img/0433ddb68eb49ec3.webp)

- 将长型后部机架安装支撑耳片安装到机架的后侧。

![](/img/3a9329eb2e283df6.webp)

- 将设备安装到机架中，确保机箱支撑耳片牢固地固定在长型支撑耳片上。

本设备没有防水保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 网线。本设备的安装和配置应由合格人员完成。

## 供电 {#powering}

本设备配备两个热插拔 IEC 型 AC 电源，功率 250 W，支持 100-240 V ⏦（约 50/60 Hz，最大 7 A）。未接附件时的最大功耗为 81 W，在最大负载下可达 134 W。

## 配置 {#configuration}

RouterOS 的完整文档可在以下地址获取：[https://mt.lv/help](https://mt.lv/help) 您可以使用网页浏览器中的 WebFig 或 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方法以确保可访问性。** **要开始设置，请在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。使用 MAC 地址继续连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。本设备配备 RJ45 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无奇偶校验。出于恢复目的，可以从网络重新安装设备，请参见 Reset 按钮。

Marvell Prestera 交换芯片功能用户手册

## 按钮 {#buttons}

**Reset 按钮**：

- 在启动期间按住此按钮，直到 USER LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 按住 Reset 按钮并给设备上电（等待 "USER" LED 闪烁后变为稳定 "On"，当 "USER" LED 变为 "Off" 时松开 Reset 按钮）——设备将以 BOOTP 模式启动，使用 Netinstall 重新安装 RouterOS。**MGMT/BOOT 以太网端口用于 Netinstall 过程。** 有关使用 Netinstall 恢复实用程序的信息，请参见 RouterOS 文档。无论使用上述哪种方式，如果在设备上电前按下按钮，系统都将加载备份 RouterBOOT 引导程序。请在 LED 开始闪烁前松开按钮，以便仅加载备份 RouterBOOT 而不进行重置。这对于 RouterBOOT 调试和恢复非常有用。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码：**CRS812-8DS-2DQ-2DDQ-RM**。
- CPU：四核 AL52400 2000 MHz。
- CPU 架构：ARM 64bit。
- RAM 容量：4 GB。
- RAM 类型：DDR4。
- 存储：512 MB，NAND。
- 1G/2.5G/5G/10G 以太网端口数量：2（支持：10M/100M/1G/10G）。
- 50G SFP56 端口数量：8。
- 200G QSFP56 端口数量：2。
- 400G QSFP56-DD 端口数量：2。
- 1 个 RJ45 控制台端口（设置为 115200bits/s、8 个数据位、1 个停止位、无奇偶校验）。
- 交换芯片型号：98DX7335。
- 尺寸：443 x 156 x 44 mm。
- 操作系统 RouterOS：v7，许可证等级 6。
- 热插拔散热风扇：四个。
- 工作温度：-10°C 至 +50°C。
- IP：20。支持的 SFP 模块请参见 [MikroTik 有线接口兼容性](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。

## LED 指示灯 {#led-indicators}

- 当路由器使用合适的电源开启时，POWER1 和 POWER2 LED 会亮起。
- USER LED 指示设备在启动进入不同模式时的状态，例如重置配置或为 Netinstall 实用程序启动设备。
- FAULT LED 指示任何散热风扇出现问题。
- 50G SFP56 笼外侧 LED 箭头指示链路活动，内侧指示 50G 链路速度。
- 200G QSFP56 端口 LED 指示每个接口四个通道的活动。
- 400G QSFP56-DD 端口 LED 指示每个接口前四个通道的活动。

## 配件 {#accessories}

包装内含以下随设备提供的附件：

![](/img/aaebbf84c9e794ac.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。
