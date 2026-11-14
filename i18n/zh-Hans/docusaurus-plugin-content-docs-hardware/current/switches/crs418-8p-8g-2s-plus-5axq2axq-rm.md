---
title: "CRS418-8P-8G-2S+5axQ2axQ-RM"
slug: /crs418-8p-8g-2s-plus-5axq2axq-rm
source: https://manual.mikrotik.com/hardware/crs418-8p-8g-2s-plus-5axq2axq-rm
captured_at: '2026-11-04T09:46:51+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/965ab29068a47f6e.jpg)

CRS418 的 Wi-Fi 版本……搭载我们最强的 4x4 MIMO Wi-Fi 6！L3 硬件卸载、四核 2.2 GHz ARM CPU、16 个千兆以太网端口 + 1 个带直连 CPU 线路的千兆管理端口、2 个 10G SFP+ 端口、PoE-out。有关完整规格和宣传册，请参见 [CRS418-8P-8G-2S+5axQ2axQ-RM 产品页面](https://mikrotik.com/product/crs418_8p_8g_2s_wifi)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应按照所有国家法律和法规进行处理。设备的安装必须符合当地和国家的电气规范。本设备拟安装在机架中。开始安装前，请仔细阅读安装说明。未使用正确的硬件或未遵循正确的程序，可能会对人员造成危险并损坏系统。本产品拟在室内安装。请使本产品远离水、火、潮湿或高温环境。仅使用制造商批准且可在本产品原包装中找到的电源和配件。插座应安装在设备附近，并且应易于触及。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！如果设备发生故障，请断开其电源。最快的方法是从电源插座上拔下电源插头。客户有责任遵守当地国家/地区的法规。所有 MikroTik 设备必须由专业人员安装。本产品为 A 类产品。在家庭环境中，本产品可能会造成无线电干扰，在这种情况下，用户可能需要采取适当的措施。

## 快速开始 {#quickstart}

- 确保您的互联网服务提供商（ISP）允许硬件更换并自动分配 IP 地址；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 之外的任一端口，或无线网络 “MikroTik-...” 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在 Web 浏览器中使用 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 “WinBox” 配置工具。**提供多种配置方法以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 “Neighbors” 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 “admin”，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 “Check for updates” 按钮，并将 RouterOS 更新到最新版本；
- 要手动更新设备，请访问 mikrotik.com，选择您的型号，并在 “Downloads” 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 “Files” 菜单，并重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 “QuickSet” 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## 安装 {#mounting}

本设备设计用于室内，可使用随附的机架安装支架安装在机架机箱中，或放置在桌面上。

如果将设备安装在机架中，请确保天线有足够空间，并且可以不受阻碍地自由摆放。对于桌面放置，请将橡胶脚垫安装到路由器底部。

进行机架安装时，请使用十字螺丝刀将机架安装耳安装到设备两侧：

- 如图所示，将机架安装耳和后部支撑耳安装到设备两侧，并拧紧四颗螺丝将其固定。

![](/img/837a6d2bb5f312fe.webp)

- 将设备放入机架式机箱，并对齐安装孔。
- 拧紧螺丝将设备固定到位。本设备没有防水污染保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 线缆。本设备的安装和配置应由合格人员完成。

## 供电 {#powering}

本设备配备两个 250 W 电源，支持 100-240 V ⏦（~ 50/60 Hz，最大 4.5 A）。未连接附件时最大功耗为 43 W，最大负载下可达 227 W。

## 配置 {#configuration}

RouterOS 的完整文档可在以下地址获取：[https://mt.lv/help](https://mt.lv/help) 您可以使用 Web 浏览器中的 WebFig 或 “WinBox” 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方法以确保可访问性。** **要开始设置，请在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果 IP 地址不可用，请使用 WinBox 并选择 “Neighbors” 选项卡来查找设备。继续使用 MAC 地址进行连接。用户名为 “admin”，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。本设备配备一个 RJ45 串行端口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无奇偶校验。为恢复目的，可以从网络重新安装设备，请参见 Reset 按钮。**

Marvell Prestera 交换芯片功能用户手册

## 按钮 {#buttons}

**Reset 按钮**：

- 在启动期间按住此按钮，直到 USER LED 灯开始闪烁，松开按钮以重置 RouterOS 配置。
- 按住 Reset 按钮并给设备通电（等待 “USER” LED 闪烁，然后稳定为 “On”，当 “USER” LED 为 “Off” 时——松开 Reset 按钮）——设备将以 BOOTP 模式启动，以使用 Netinstall 重新安装 RouterOS。**MGMT/BOOT 以太网端口用于 Netinstall 过程。** 请参阅 RouterOS 文档中关于使用 Netinstall 恢复实用程序的内容。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备用 RouterBOOT 加载程序。在 LED 开始闪烁前松开按钮，以仅加载备用 RouterBOOT 而不进行重置。这对于 RouterBOOT 调试和恢复很有用。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码：**CRS418-8P-8G-2S+RM**。
- RAM 大小：1 GB。
- RAM 类型：DDR3。
- 存储：128 MB，NAND。
- 1G 以太网端口数量：17。
- 10G SFP+ 以太网端口数量：2。
- 带 PoE-out 的 1G 以太网端口数量：8。
- PoE-out 端口：Ether9-Ether16，802.3af/at，总输出功率 150 W。
- 1x RJ45 控制台端口（设置为 115200bits/s、8 个数据位、1 个停止位、无奇偶校验）。
- USB：1 个 USB 3.0 type A。
- 交换芯片型号：98DX226S。
- 无线接口型号：QCN-5024（2.4 GHz）、QCN-5054（5 GHz）、Wi-Fi 6。
- 无线：2.4 GHz 802.11b/g/n/ax 四链，5 GHz 802.11a/n/ac/ax 四链。
- MIMO DL：4x4。
- MIMO UL：1x1（5G SA MIMO UL 2x2）。
- 尺寸：443 x 156 x 44 mm。
- 操作系统 RouterOS：v7，许可证级别 5。
- 工作温度：-20°C 至 +70°C。请访问帮助页面以了解 MikroTik SFP 模块兼容性和配置表：MikroTik 有线接口兼容性

## LED 指示灯 {#led-indicators}

- 路由器通电时 PWR LED 点亮。
- USER LED 指示设备在启动进入不同模式时的状态，例如重置配置或启动设备以使用 Netinstall 实用程序。
- FAULT LED 表示任一冷却风扇出现问题。
- 三角形 LED（顶行）指示 PoE 输出状态。绿色 LED 表示相应端口使用低电压，红色 LED 表示高电压。单个绿色 LED 闪烁：启动低电压设备时出现问题。单个红色 LED 闪烁：高电压设备出现问题。
- SFP+ 端口的绿色 LED 指示各个 SFP+ 端口活动。

## 配件 {#accessories}

包装内含以下随设备提供的配件：

![](/img/9f561f728fa8bbfa.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。
