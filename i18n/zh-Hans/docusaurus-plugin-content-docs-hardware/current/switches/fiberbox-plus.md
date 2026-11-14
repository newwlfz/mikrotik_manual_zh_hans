---
title: "FiberBox Plus"
slug: /fiberbox-plus
source: https://manual.mikrotik.com/hardware/fiberbox-plus
captured_at: '2026-11-04T09:48:15+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/9bbf101a7bc9df03.jpg)

万兆室外网络的极致性价比之选。高杆、立杆或铁塔——您的连接安全无虞！netFiber 9 的高性能经济版本。请参阅 [FiberBox Plus 产品页面](https://mikrotik.com/product/fiberboxplus) 了解完整规格和宣传册。

### FiberBox Plus (CRS305-1G-4S+OUT) {#fiberbox-plus-crs305-1g-4sout}

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵守所有国家法律法规。设备的安装必须符合当地和国家的电气规范。本设备设计为安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤可能导致人身危险和系统损坏。本产品适合室内安装。请让本产品远离水、火、潮湿或高温环境。请仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 用您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（某些型号请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

250

## 供电 {#powering}

- DC 输入数量 3（PoE-in、DC 插孔、2 针端子）
- PoE-in 输入电压 42-57 V 802.3af/at
- DC 插孔输入电压 24-57 V
- 2 针端子输入电压 24-57 V
- 电源适配器额定电压 48 V
- 电源适配器额定电流 1.2 A
- 最大功耗（不含附加模块）7 W
- 最大功耗 17 W
- -48V 供电与 PoE-in 和 +24V（或任何其他负极接地的 PSU）不兼容！我们强烈建议使用随附的电源。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 POE 适配器的 POE 端口。
- 将来自您局域网的以太网线连接到 POE 适配器的 LAN 端口，请注意数据和电力流向的箭头。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

RouterOS 的完整文档可在以下地址获取：[https://mt.lv/help](https://mt.lv/help) 您可以使用网页浏览器中的 WebFig 或 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方式以确保可访问性。** **要开始设置，请在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（某些型号请查看贴纸上的用户和无线密码）。该设备配备一个 RJ45 串行端口，默认为 115200 bit/s，8 个数据位，1 个停止位，无奇偶校验。出于恢复目的，可以从网络重新安装设备，请参见复位按钮。

Marvell Prestera 交换芯片功能用户手册

## 扩展插槽和端口 {#extension-slots-and-ports}

<table><thead><tr><th>**产品代码**</th><th>CRS305‑1G‑4S+OUT (FiberBox Plus)</th></tr></thead><tbody><tr><td>**CPU**</td><td>98DX226S, 800 MHz</td></tr><tr><td>**CPU 架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU 核心数量**</td><td>2</td></tr><tr><td>**交换芯片型号**</td><td>98DX226S</td></tr><tr><td>**RAM**</td><td>256 MB</td></tr><tr><td>**存储**</td><td>16 MB Flash</td></tr><tr><td>**1G 以太网 (RJ45)**</td><td>1</td></tr><tr><td>**10G SFP+ 端口**</td><td>4</td></tr><tr><td>**串行控制台 (RJ45)**</td><td>1</td></tr><tr><td>**操作系统**</td><td>RouterOS v7（license level 5）/ SwOS（双启动）</td></tr><tr><td>**工作温度**</td><td>‑40 °C 至 +70 °C</td></tr><tr><td>**外壳尺寸**</td><td>330 × 200 × 70 mm</td></tr><tr><td>**防护等级**</td><td>IP66</td></tr></tbody></table>

## 复位按钮 {#reset-button}

要使用复位按钮，请按住它，然后在仍按住按钮的情况下开启设备。

- 当绿色 LED 开始闪烁时松开按钮，以重置 RouterOS 配置。如果不想加载备份引导程序，可以在已通电后再开始按住按钮。
- 在 LED 不再闪烁（约 20 秒）后松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。您也可以在设备出现在 Netinstall 实用程序设备列表时松开按钮。无论采用上述哪种方式，如果在设备通电前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这对 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

![](/img/24bdf7855d251582.webp)

有关 MikroTik SFP 模块兼容性和配置表，请访问帮助页面：MikroTik 有线接口兼容性

## 操作系统支持 {#operating-system-support}

该设备支持与 SwOS 2.9 及更高版本以及 RouterOS 7 或更高版本的双启动。出厂安装的具体 RouterOS 版本可在 RouterOS 的 /system resource 菜单中查看。其他操作系统未经测试，也不受官方支持。
