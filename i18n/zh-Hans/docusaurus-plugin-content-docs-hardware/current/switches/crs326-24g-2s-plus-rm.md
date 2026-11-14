---
title: "CRS326-24G-2S+RM"
slug: /crs326-24g-2s-plus-rm
source: https://manual.mikrotik.com/hardware/crs326-24g-2s-plus-rm
captured_at: '2026-11-04T09:46:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/27adf03c426b9867.jpg)

## [CRS326-24G-2S+RM](https://mikrotik.com/product/CRS326-24G-2SplusRM) {#crs326-24g-2srm}

24 个千兆端口交换机，配备 2 个 SFP+ 光笼，采用 1U 机架式外壳，支持双启动（RouterOS 或 SwOS）。完整规格和宣传资料请参见 [CRS326-24G-2S+RM 产品页面](https://mikrotik.com/product/CRS326-24G-2SplusRM)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备适合安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品适合在室内安装。请让本产品远离水、火、潮湿或高温环境。
- 只能使用制造商认可的电源和配件，这些均可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

- 将您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，即可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备设计用于室内，可使用随附的机架安装件安装在机架式机箱中，也可以放置在桌面上。如果指定用途为机架式机箱，请使用十字螺丝刀将机架安装耳片固定到设备两侧：

- 将机架耳片安装到设备两侧，并拧紧四颗螺丝将其固定到位，如图所示。

![](/img/837a6d2bb5f312fe.webp)

- 将设备放入机架式机箱，并对齐孔位，使设备能够方便地装入。
- 拧紧螺丝将其固定到位。本设备不具备防水保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 网线。本设备的安装和配置应由具备资质的人员完成。

## 供电 {#powering}

本设备可通过以下方式供电：

- 以太网端口接受无源 PoE 10-30 V DC ⎓。
- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，正极针式插头）接受 10-30 V DC⎓。当两个输入电源同时供电时，设备也能正常工作。它将使用电压最高的电源，如果该电源被移除，则会切换到另一个电源。您可以将其用于电源冗余。两个电源都必须处于支持的电压范围内。

最大负载下的功耗可达 24 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自您本地网络（LAN）的以太网线连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

RouterOS 和 SwOS 的完整文档可在 [https://mt.lv/help](https://mt.lv/help) 获取。可使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方式以确保可访问性。**

在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。

本设备配备一个 RJ45 串行端口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。出于恢复目的，可以从网络重新安装设备，请参见复位按钮。

Marvell Prestera 交换芯片的功能在 [Marvell Prestera switch chip features](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册中进行了说明。

本设备支持启动 RouterOS（提供完整路由和交换功能）或 SwOS（仅用于交换运行）。默认情况下，设备启动进入 RouterOS，但您可以按如下方式切换到另一个操作系统：

- 从 SwOS 中：转到 **System** 菜单，然后点击页面底部的 "**Boot RouterOS**" 按钮。
- 从 RouterOS 中：打开 **System → RouterBOARD → Settings** 并选择 **Boot OS**。

也可以使用串行控制台菜单选择操作系统并配置其他启动选项。

## 规格 {#specifications}

<table><thead><tr><th>**产品代码**</th><th>CRS326-24G-2S+RM</th></tr></thead><tbody><tr><td>**CPU**</td><td>98DX3236, 800 MHz</td></tr><tr><td>**CPU 架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU 核心数**</td><td>2</td></tr><tr><td>**交换芯片型号**</td><td>98DX3236</td></tr><tr><td>**RAM**</td><td>512 MB</td></tr><tr><td>**存储**</td><td>16 MB Flash</td></tr><tr><td>**1G 以太网 (RJ45)**</td><td>24</td></tr><tr><td>**10G SFP+ 端口**</td><td>2</td></tr><tr><td>**串行控制台 (RJ45)**</td><td>1</td></tr><tr><td>**操作系统**</td><td>RouterOS / SwOS（双启动）</td></tr><tr><td>**工作温度**</td><td>-40 °C 至 +60 °C</td></tr><tr><td>**外壳尺寸**</td><td>443 × 144 × 44 mm</td></tr></tbody></table>

有关 MikroTik SFP 模块兼容性表，请访问 wiki 页面：MikroTik wired interface compatibility

## 复位按钮 {#reset-button}

RouterBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置复位为默认值。
- 当 LED 变为绿色常亮时松开按钮，可清除所有配置并恢复默认值。
- 当 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。

无论使用上述哪种选项，如果在设备接通电源之前按钮已被按下，系统都将加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

连接到 **Netinstall** 时，请使用 Ethernet 1 端口。

![](/img/731f17d53e8dbc53.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。
