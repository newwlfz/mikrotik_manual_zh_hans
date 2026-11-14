---
title: "CRS310-1G-5S-4S+IN"
slug: /crs310-1g-5s-4s-plus-in
source: https://manual.mikrotik.com/hardware/crs310-1g-5s-4s-plus-in
captured_at: '2026-11-04T09:46:06+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/c2ccbbb17e2abdb5.jpg)

## [CRS310-1G-5S-4S+IN](https://mikrotik.com/product/crs310_1g_5s_4s_in) {#crs310-1g-5s-4sin}

10 千兆光纤连接距离远超 100 米——适用于小型办公室或 ISP。以经济实惠的成本实现硬件卸载的 VLAN 过滤，甚至还能进行部分 L3 路由！有关完整规格和产品手册，请参见 [CRS310-1G-5S-4S+IN 产品页面](https://mikrotik.com/product/crs310_1g_5s_4s_in)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备应安装在机架中。请在开始安装前仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品适合在室内安装。请使本产品远离水、火、潮湿或高温环境。
- 请仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 将您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保最佳性能、稳定性和安全更新；
- 设置路由器密码。

## 安装 {#mounting}

![](/img/27bf22aa32ecbced.webp)

本设备设计用于室内，可使用随附的机架耳安装在机架机箱中，也可以放置在桌面上。如果希望放置在平整表面上，请在路由器底部贴上橡胶脚垫；如果指定用于机架机箱，请使用十字螺丝刀将机架耳安装在设备两侧。

- 将机架耳安装到设备两侧，并拧紧四颗螺丝将其固定到位，如右图所示。
- 将设备放入机架机箱并对准孔位，使设备能够方便地安装。
- 拧紧螺丝将其固定到位。本设备的 IP 防护等级为 IPX0。本设备没有防水污染保护，请确保将设备放置在干燥通风的环境中。我们建议为我们的设备使用屏蔽 Cat5/6 线缆。*本设备的安装和配置应由有资质的人员完成。*

## 供电 {#powering}

本设备可通过直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，正极针式插头）接受 18-57 V DC ⎓ 输入。管理端口支持 802.3af/at 和被动 PoE 电源输入（18-57 V DC）。本设备在最大负载下的功耗最高为 20 W。

## 规格 {#specifications}

<table><thead><tr><th>**产品代码**</th><th>CRS310‑1G‑5S‑4S+IN</th></tr></thead><tbody><tr><td>**CPU**</td><td>98DX226S, 800 MHz</td></tr><tr><td>**CPU 架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU 核心数**</td><td>2</td></tr><tr><td>**交换芯片型号**</td><td>98DX226S</td></tr><tr><td>**RAM**</td><td>256 MB DDR3</td></tr><tr><td>**存储**</td><td>16 MB Flash</td></tr><tr><td>**10/100/1000 Mbps 以太网 (RJ45)**</td><td>1</td></tr><tr><td>**1G SFP 端口**</td><td>5</td></tr><tr><td>**10G SFP+ 端口**</td><td>4</td></tr><tr><td>**操作系统**</td><td>RouterOS v7 (License Level 5)</td></tr><tr><td>**工作温度**</td><td>‑40 °C 至 +70 °C</td></tr><tr><td>**外壳尺寸**</td><td>200 × 166 × 44.5 mm</td></tr></tbody></table>

## 配置 {#configuration}

RouterOS 的完整文档可在 [https://mt.lv/help](https://mt.lv/help) 获取。可以使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置本设备。**提供多种配置方式以确保可访问性。**

在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。

本设备配备一个 RJ45 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无奇偶校验。出于恢复目的，可以从网络重新安装设备，请参见复位按钮。

Marvell Prestera 交换芯片的功能在 [Marvell Prestera 交换芯片功能](/docs/bridging-and-switching/marvell-prestera-switch-chip-features)手册中有描述。

## 复位按钮 {#reset-button}

- 要复位配置，请断开设备电源，按住复位按钮，并在 USER (USR) LED 开始闪烁时松开。
- 要加载备份引导程序，请在通电前按住复位按钮，三秒后松开。
- 要启动 Netinstall 过程（以 BOOTP 模式引导设备以重新安装 RouterOS），请按住复位按钮，给设备通电，等待 USER (USR) LED 闪烁后变为常亮。当 USR LED 熄灭时，松开复位按钮。

无论使用上述哪种方式，如果在设备通电前按下按钮，系统将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## LED 指示灯 {#led-indicators}

- 当路由器由 DC 插孔或 PoE 供电时，电源 LED 点亮。
- 用户 LED 可以在 RouterOS 中配置。
- 端口 LED 指示各个以太网和 SFP 端口的状态。

## 配件 {#accessories}

包装内含以下随设备附带的配件：

![](/img/8c36c3fbb0b4f6fe.webp)

请访问 wiki 页面查看 MikroTik SFP 模块兼容性表：MikroTik 有线接口兼容性。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。
