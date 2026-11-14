---
title: "CRS328-4C-20S-4S+RM"
slug: /crs328-4c-20s-4s-plus-rm
source: https://manual.mikrotik.com/hardware/crs328-4c-20s-4s-plus-rm
captured_at: '2026-11-04T09:46:38+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/9b881b49523c4a97.jpg)

智能交换机，20 个 SFP 笼、4 个 SFP+ 笼、4 个 Combo 端口（千兆以太网或 SFP）、800MHz CPU、512MB RAM、1U 机架式机箱、双电源、RouterOS L5 或 SwitchOS（双启动）。完整规格和产品手册请参见 [CRS328-4C-20S-4S+RM 产品页面](https://mikrotik.com/product/crs328_4c_20s_4s_rm)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵守所有国家法律和法规。设备的安装必须符合当地和国家的电气规范。本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能会给人员带来危险情况并损坏系统。本产品适合在室内安装。请让本产品远离水、火、潮湿或高温环境。请仅使用制造商认可的电源和附件，这些可在本产品的原始包装中找到。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！如果设备发生故障，请断开其电源。最快的做法是将电源插头从电源插座中拔出。客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 用您的 PC 连接到任意一个以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，即可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

- 设备可通过两个 IEC 接口供电。交流输入范围 100-240 V ⏦。最大负载下的功耗可达 43 W。

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档请参见：[https://mt.lv/help](https://mt.lv/help) 您可以使用网页浏览器中的 WebFig 或 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方式以确保可访问性。** **要开始设置，请在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）。设备配备 RJ45 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。出于恢复目的，可以从网络重新安装设备，请参见 Reset 按钮。

Marvell Prestera 交换芯片功能用户手册

设备支持启动 RouterOS（用于完整的路由和交换功能）或 SwOS（仅用于交换运行）。默认情况下，设备启动进入 RouterOS，但您也可以按以下方式切换到另一个操作系统：

- 从 SwOS：进入 System 菜单，点击页面底部的 Boot RouterOS 按钮。
- 从 RouterOS：打开 System → RouterBOARD → Settings 并选择 Boot OS。也可以通过串口控制台菜单选择操作系统并配置其他启动选项。

## 扩展插槽和端口 {#extension-slots-and-ports}

<table><thead><tr><th>**产品代码**</th><th>CRS328-4C-20S-4S+RM</th></tr></thead><tbody><tr><td>**CPU**</td><td>98DX3236, 800 MHz</td></tr><tr><td>**CPU 架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU 核心数**</td><td>2</td></tr><tr><td>**交换芯片型号**</td><td>98DX3236</td></tr><tr><td>**RAM**</td><td>512 MB</td></tr><tr><td>**存储**</td><td>16 MB Flash</td></tr><tr><td>**Combo 以太网/SFP 端口**</td><td>4</td></tr><tr><td>**SFP 端口**</td><td>20</td></tr><tr><td>**SFP+ 端口**</td><td>4</td></tr><tr><td>**串口控制台 (RJ45)**</td><td>1</td></tr><tr><td>**操作系统**</td><td>RouterOS（许可证等级 5）/ SwitchOS（双启动）</td></tr><tr><td>**工作温度**</td><td>-20 °C 至 +60 °C</td></tr><tr><td>**机箱尺寸**</td><td>443 × 194 × 44 mm</td></tr></tbody></table>

请访问帮助页面查看 MikroTik SFP 模块兼容性表：MikroTik 有线接口兼容性

## Combo 端口 {#combo-ports}

四个 combo 接口各有两个物理连接器，同一时间只能使用其中一个。在 RouterOS 中，这些端口会自动表示为 combo1-4。可以在 RouterOS 软件的 Ethernet 菜单中选择使用哪个物理端口。如果保持默认的 "auto"，并且 F/T 两端都插了线缆，则 SFP 优先。例如，如果您在 1T 端口插入了以太网线，并在 1F 端口插入了 SFP 模块，则必须在 RouterOS 中选择使用哪一个。在 RouterOS GUI 中双击相应的 combo 接口即可查看使用的是哪个插槽。

## 安装 {#mounting}

本设备设计用于室内使用，可以使用随附的机架安装件安装在机架式机箱中，也可以放置在桌面上。如果希望放置在平面上，请在路由器底部贴上橡胶脚垫；如果指定用于机架式机箱，请使用十字螺丝刀将机架耳安装在设备两侧：

- 将机架耳安装到设备两侧，并拧紧四颗螺丝将其固定到位，如图所示。
- 将设备放入机架式机箱，并对齐孔位，使设备能够方便地装入。

![](/img/837a6d2bb5f312fe.webp)

- 拧紧螺丝将其固定到位。本设备的 IP 防护等级为 IPX0。设备没有防水污染保护，请确保将设备放置在干燥通风的环境中。*本设备的安装和配置应由合格人员完成。* *我们建议为我们的设备使用 Cat6 网线。*

## 按钮和跳线 {#buttons-and-jumpers}

### Reset 按钮 {#reset-button}

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 搜索 Netinstall 服务器（共 15 秒）。**Netinstall 过程使用第一个以太网端口（combo-ether1）。** 关于使用 Netinstall 恢复工具的说明，请参见 RouterOS 文档。无论使用上述哪种方式，如果在设备通电前按下该按钮，系统都会加载备份的 RouterBOOT 引导程序。用于 RouterBOOT 调试和恢复。

### Mode 按钮 {#mode-button}

可以通过 RouterOS 软件配置 mode 按钮的动作，以执行任何用户提供的 RouterOS 脚本。配置时请使用菜单 /system routerboard mode-button

![](/img/ea2449a97b0b8831.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。
