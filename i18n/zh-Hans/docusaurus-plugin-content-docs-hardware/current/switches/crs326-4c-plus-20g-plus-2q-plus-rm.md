---
title: "CRS326-4C+20G+2Q+RM"
slug: /crs326-4c-plus-20g-plus-2q-plus-rm
source: https://manual.mikrotik.com/hardware/crs326-4c-plus-20g-plus-2q-plus-rm
captured_at: '2026-11-04T09:46:35+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/5bbe728d7bb856ed.jpg)

CRS326-4C+20G+2Q+RM 是一款网络交换机，具有二十个 2.5G 以太网端口、四个 2.5/10G SFP+ 端口以及一个 100M 端口和两个 40G QSFP+ 端口。该设备可直接作为交换机使用。完整规格和宣传册请参见 [CRS326-4C+20G+2Q+RM 产品页面](https://mikrotik.com/product/crs326_4c_20g_2q_rm)。

## 安全警告 {#safety-warnings}

在操作任何 MikroTik 设备之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。请仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。本设备须由经过培训的合格人员按照这些安装说明进行安装。安装人员负责确保设备的安装符合当地和国家电气规范。请勿尝试拆卸、修理或改装该设备。本设备适合安装在机架中。开始安装前，请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能会给人员带来危险并损坏系统。本产品适合在室内安装。请将本产品远离水、火、潮湿或高温环境。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！插座应安装在设备附近且便于触及的位置。若设备发生故障，请断开其电源。最快的做法是将电源适配器从电源插座中拔出。为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如置于指定区域。请熟悉将设备妥善运送至您所在地区指定收集点的相关流程。

![](/img/ee40bff277b50ded.webp)

触电危险。本设备仅可由经过培训的人员进行维修

## 快速开始 {#quickstart}

- 将您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 标签页查找设备。然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，并重启设备；
- 通过将 RouterOS 软件升级到最新版本，可以确保最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

该设备专为室内使用而设计，可使用随附的机架安装件安装在机架机箱中，也可以放置在桌面上。如果希望放置在平坦表面上，请在路由器底部贴上橡胶垫脚；如果指定用途是机架机箱，请使用十字螺丝刀将机架挂耳安装到设备两侧：

- 如图所示，将机架挂耳安装到设备两侧，并拧紧四颗螺丝将其固定到位。
- 将设备放入机架机箱，并对齐孔位，使设备能够顺利安装。
- 拧紧螺丝将其固定到位。

![](/img/837a6d2bb5f312fe.webp)

本设备的 IP 防护等级为 IP20。该设备没有防水保护，请确保将设备放置在干燥通风的环境中。本设备的安装和配置应由合格人员完成。

## 供电 {#powering}

该设备可由两个 100 – 240 V AC ⏦ 输入供电。无外接附件时功耗为 51 W。接有附件时最高可达 70 W。

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档请见：[https://mt.lv/help](https://mt.lv/help) 您可以在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 配置设备。**提供多种配置方式以确保可访问性。** **要开始设置，请在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1)。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 标签页查找设备。然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者对于某些型号，请查看贴纸上的用户和无线密码）。该设备配备一个 RJ45 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无奇偶校验。为便于恢复，可以从网络重新安装设备，请参见复位按钮。****

Marvell Prestera 交换芯片功能用户手册

该设备支持启动 RouterOS（用于完整的路由和交换功能）或 SwOS（仅用于交换操作）。默认情况下，设备启动进入 RouterOS，但您可以按以下方式切换到另一个操作系统：

- 从 SwOS 中：进入 System 菜单，点击页面底部的 Boot RouterOS 按钮。
- 从 RouterOS 中：打开 System → RouterBOARD → Settings 并选择 Boot OS。也可以通过串口控制台菜单选择操作系统并配置其他启动选项。

## 扩展插槽和端口 {#extension-slots-and-ports}

<table><thead><tr><th>**产品代码**</th><th>CRS326‑4C+20G+2Q+RM</th></tr></thead><tbody><tr><td>**CPU**</td><td>QCA9531, 650 MHz</td></tr><tr><td>**CPU 架构**</td><td>MIPSBE</td></tr><tr><td>**CPU 核心数**</td><td>1</td></tr><tr><td>**交换芯片型号**</td><td>98DX8332</td></tr><tr><td>**RAM**</td><td>128 MB</td></tr><tr><td>**存储**</td><td>32 MB Flash</td></tr><tr><td>**100 Mbps 以太网 (RJ45)**</td><td>1</td></tr><tr><td>**2.5G 以太网 (RJ45)**</td><td>20</td></tr><tr><td>**组合 10G (2.5G ETH / SFP+) 端口**</td><td>4</td></tr><tr><td>**40G QSFP+ 端口**</td><td>2</td></tr><tr><td>**串口控制台 (RJ45)**</td><td>1</td></tr><tr><td>**操作系统**</td><td>RouterOS v7 (License 6)</td></tr><tr><td>**工作温度**</td><td>‑20 °C 至 +60 °C</td></tr><tr><td>**外壳尺寸**</td><td>443 × 258 × 44 mm</td></tr></tbody></table>

请访问帮助页面查看 MikroTik SFP 模块兼容性表：MikroTik 有线接口兼容性

## 复位按钮 {#reset-button}

RouterBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，即可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，以清除所有配置并恢复默认值。
- 按住复位按钮并给设备上电（等待 "USR" 指示灯闪烁后变为稳定的 "On"，当 "USR" 指示灯变为 "Off" 时松开复位按钮）——设备将以 bootp 模式启动，从而使用 Netinstall 重新安装 RouterOS。**MGMT/BOOT 以太网端口用于 Netinstall 过程。** 有关使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都会加载备份的 RouterBOOT 加载程序。这适用于 RouterBOOT 调试和恢复。

## 配件 {#accessories}

包装内包含以下随设备提供的配件：

![](/img/a00204c74fd80c9c.webp)

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。
