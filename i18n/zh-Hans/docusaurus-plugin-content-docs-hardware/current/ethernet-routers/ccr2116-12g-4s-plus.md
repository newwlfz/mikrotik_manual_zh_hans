---
title: "CCR2116-12G-4S+"
slug: /ccr2116-12g-4s-plus
source: https://manual.mikrotik.com/hardware/ccr2116-12g-4s-plus
captured_at: '2026-11-04T05:55:52+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/fd56a24a2221eb27.jpg" alt="" width={800} height={366} /></p>

## [CCR2116-12G-4S+](https://mikrotik.com/product/ccr2116_12g_4splus) {#ccr2116-12g-4s}

借助这款基于 16 核 ARM CPU 的强大 CCR，在 10G 环境中无需再担心 CPU 性能限制。性能是我们上一代 36 核 CCR 的两倍，BGP 性能提升 6 倍。包含一个 M.2 PCIe 插槽。完整规格和宣传册请参阅 [CCR2116-12G-4S+ 产品页面](https://mikrotik.com/product/ccr2116_12g_4splus)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律法规进行处理。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于机架安装。开始安装前请仔细阅读安装说明。使用不正确的硬件或不遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品设计用于室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家/地区法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

:::danger 打开机箱前请先断电

在打开机箱或安装/更换任何内部组件（例如 M.2 SSD）之前，请完全关闭系统并断开 AC 电源的电源线。拔下电源后，请至少等待 10 秒，让主板中的残余电量完全释放。

:::

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>值</th></tr></thead><tbody><tr><td>产品代码</td><td>CCR2116-12G-4S+</td></tr><tr><td>架构</td><td>ARM 64bit</td></tr><tr><td>CPU</td><td>AL73400</td></tr><tr><td>CPU 核心数</td><td>16</td></tr><tr><td>CPU 标称频率</td><td>2000 MHz</td></tr><tr><td>CPU 线程数</td><td>16</td></tr><tr><td>交换芯片型号</td><td>98DX3255</td></tr><tr><td>尺寸</td><td>443 x 199 x 44 mm</td></tr><tr><td>RouterOS 许可证</td><td>6</td></tr><tr><td>操作系统</td><td>RouterOS v7</td></tr><tr><td>RAM 容量</td><td>16 GB</td></tr><tr><td>存储容量</td><td>128 MB</td></tr><tr><td>存储类型</td><td>NAND</td></tr><tr><td>MTBF</td><td>25°C 下约 200'000 小时</td></tr><tr><td>测试环境温度</td><td>-20°C 至 60°C</td></tr><tr><td>**供电**</td><td></td></tr><tr><td>AC 输入数量</td><td>2</td></tr><tr><td>AC 输入范围</td><td>100-240</td></tr><tr><td>PSU 插槽数量</td><td>2</td></tr><tr><td>频率 (Hz)</td><td>47-63</td></tr><tr><td>最大功耗</td><td>83 W</td></tr><tr><td>无附加组件时的最大功耗</td><td>60 W</td></tr><tr><td>散热类型</td><td>4 个风扇</td></tr><tr><td>**以太网**</td><td></td></tr><tr><td>10/100/1000 以太网端口</td><td>13</td></tr><tr><td>**光纤**</td><td></td></tr><tr><td>SFP+ 端口</td><td>4</td></tr><tr><td>**外设**</td><td></td></tr><tr><td>串口控制台端口</td><td>RJ45</td></tr><tr><td>M.2 插槽数量</td><td>1</td></tr><tr><td>**其他**</td><td></td></tr><tr><td>CPU 温度监控</td><td>是</td></tr><tr><td>PCB 温度监控</td><td>是</td></tr><tr><td>电压监控</td><td>是</td></tr><tr><td>Mode 按钮</td><td>是</td></tr><tr><td>**认证与批准**</td><td></td></tr><tr><td>认证</td><td>CE, EAC, ROHS</td></tr></tbody></table>

## 快速开始 {#quickstart}

- 将您的 PC 连接到标有 **ETH/BOOT** 的端口或第一个以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 应使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方法以确保可访问性；**
- 在网页浏览器中打开 192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单并重启设备；
- 将 RouterOS 软件升级到最新版本，可确保最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

该设备可由两个冗余电源供电，每个电源均接受 100-240 V AC 电源。您可以单独使用其中一个，或同时使用两个。功耗最高 60 W。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 13x 10/100/1000 以太网端口。
- 4x 10G SFP+ 端口。
- 一个 M.2 插槽，类型 PCIe x4。
- RJ45 控制台端口。CCR2116-12G-4S+ 与 M.2 插槽之间为 PCIe Gen 3.0 x4 连接。推荐使用无容量限制的 NVMe M.2 2280mm M key SSD 硬盘。

## 安装 {#mounting}

该设备设计用于室内使用，可使用随附的机架安装件安装在机架机箱中，也可以放置在桌面上。如果指定用于机架机箱，请使用十字螺丝刀将机架耳片安装到设备两侧：

<p><Img src="/img/27bf22aa32ecbced.webp" alt="" width={610} height={543} /></p>

- 如图所示，将机架耳片安装到设备两侧，并拧紧四颗螺丝将其固定到位。
- 将设备放入机架机箱中，对准孔位，使设备安装合适。
- 拧紧螺丝将其固定到位。*设备无防水保护，请确保将设备放置在干燥且通风的环境中。* *我们建议为我们的设备使用屏蔽 Cat5/6 线缆。* *本设备的安装和配置应由合格人员完成。*

## 配置 {#configuration}

RouterOS 的完整文档可在以下地址获取：[https://mt.lv/help](https://mt.lv/help) 您可以使用网页浏览器中的 **WebFig** 或 "**WinBox**" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 配置设备。**提供多种配置方法以确保可访问性。** 要开始设置，请在网页浏览器中打开 192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者对于某些型号，请查看贴纸上的用户和无线密码）。该设备配有 RS-232 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无奇偶校验。出于恢复目的，可以从网络重新安装设备，请参阅 Reset 按钮。

## 按钮和跳线 {#buttons-and-jumpers}

**Reset 按钮**：

- 在启动过程中按住此按钮，直到 USER LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 按住 Reset 按钮并给设备上电（等待 "USER" LED 闪烁，然后稳定为 "On"，当 "USER" LED 变为 "Off" 时 - 松开 Reset 按钮） - 设备将以 BOOTP 模式启动，以便使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 重新安装 RouterOS。**Netinstall 过程使用 MGMT/BOOT 以太网端口。** 有关使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。

无论使用上述哪种方式，如果在设备上电前按下按钮，系统都将加载备份 RouterBOOT 引导程序。在 LED 开始闪烁之前松开按钮，即可仅加载备份 RouterBOOT 而不进行重置。这对 RouterBOOT 调试和恢复很有用。

Mode 按钮默认不起作用，但可以在菜单 /system routerboard mode-button 中为其分配任意脚本

## LED 指示灯 {#leds}

该设备有四个 LED 灯。PWR1/2 指示当前使用的是哪个电源。FAULT 指示散热风扇出现问题。USER 可在软件中配置。

## 配件 {#accessories}

- PLUG1, PLUG2_EU/US 电源线, D03+QT3 H05VV-F 3x0.75mm2 1.83m RoHS
- CASE3, CASE4_ 1U 机架安装支架 白色
- SET1_Fastening set K-57r1v1

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。
