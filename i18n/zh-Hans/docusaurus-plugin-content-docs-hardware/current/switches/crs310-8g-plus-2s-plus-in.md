---
title: "CRS310-8G+2S+IN"
slug: /crs310-8g-plus-2s-plus-in
source: https://manual.mikrotik.com/hardware/crs310-8g-plus-2s-plus-in
captured_at: '2026-11-04T09:46:14+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/610602c12baf973a.jpg)

## [CRS310-8G+2S+IN](https://mikrotik.com/product/crs310_8g_2s_in) {#crs310-8g2sin}

充分利用超快的 2.5/10 Gigabit 组合，升级你的工作空间！此交换机可以发挥 RouterOS v7 的全部潜力：运行 VLAN、Jumbo frames、链路聚合、ACL 规则等等！完整的规格和产品手册请见 [CRS310-8G+2S+IN 产品页面](https://mikrotik.com/product/crs310_8g_2s_in)。

## 安全警告 {#safety-warnings}

- 在操作任何设备之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规执行。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品适合室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

- 将您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，即可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

![](/img/27bf22aa32ecbced.webp)

本设备设计用于室内使用，可使用随附的机架安装件安装在机架机箱中，也可以放置在桌面上。如果希望放置在平面上，请在路由器底部安装橡胶脚垫；如果指定用于机架机箱，请使用十字螺丝刀将机架耳片安装到设备两侧。

- 如右图所示，将机架耳片安装到设备两侧，并拧紧四颗螺丝将其固定到位。
- 将设备放入机架机箱，并使其与孔位对齐，以便设备方便地安装。
- 拧紧螺丝将其固定到位。本设备的 IP 防护等级为 IP20。本设备没有防水保护，请确保将设备放置在干燥通风的环境中。我们建议为我们的设备使用屏蔽 Cat5/6 网线。*本设备的安装和配置应由合格人员完成。*

## 供电 {#powering}

本设备可通过直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心针为正极插头）接受 18-57 V DC ⎓ 供电。本设备在最大负载下的功耗最高可达 34 W。

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>规格</th></tr></thead><tbody><tr><td>**产品代码**</td><td>CRS310-8G+2S+IN</td></tr><tr><td>**CPU**</td><td>98DX226S, 800 MHz</td></tr><tr><td>**CPU 架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU 核心数**</td><td>2</td></tr><tr><td>**交换芯片型号**</td><td>98DX226S</td></tr><tr><td>**RAM**</td><td>256 MB DDR3</td></tr><tr><td>**存储**</td><td>32 MB Flash</td></tr><tr><td>**2.5G 以太网 (RJ45)**</td><td>8</td></tr><tr><td>**10G SFP+**</td><td>2</td></tr><tr><td>**操作系统**</td><td>RouterOS v7 (License Level 5)</td></tr><tr><td>**工作温度**</td><td>-40°C 至 +60°C</td></tr><tr><td>**外壳尺寸**</td><td>200 × 206.1 × 44 mm</td></tr></tbody></table>

## 配置 {#configuration}

RouterOS 的完整文档可在 [https://mt.lv/help](https://mt.lv/help) 获取。可以通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 来配置设备。**提供多种配置方法以确保可访问性。**

在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。出于恢复目的，可以从网络重新安装设备，请参阅复位按钮。

Marvell Prestera 交换芯片的功能在 [Marvell Prestera switch chip features](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册中有描述。

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 要重置配置，请断开设备电源，按住 Reset 按钮，再次接通电源，并在 PWR LED 开始闪烁时松开按钮。
- 要加载备份引导程序，请在通电前按住 Reset 按钮，三秒后松开。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种引导程序选项可用：**Regular Booter** 和 **Backup Booter**。建议对两个选项都进行验证，以防其中一个无法使用。

- **Regular Booter:** 要进入 etherboot 模式，请在给设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter:** 关闭设备。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，可通过 Netinstall 重新安装 RouterOS。视型号而定，这可能由 **USR, USER, System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪个选项，如果在设备通电之前按下按钮，系统都会加载备份 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复很有用。

## LED 指示灯 {#led-indicators}

- 当路由器通过 DC 插孔或 PoE 供电时，电源 LED 点亮。
- 用户 LED 可在 RouterOS 中配置。
- 端口 LED 指示各个以太网和 SFP 端口的活动状态。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

![](/img/8c36c3fbb0b4f6fe.webp)

请访问 wiki 页面查看 MikroTik SFP 模块兼容性表：MikroTik wired interface compatibility。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列在 /system resource 中。其他操作系统尚未经过测试。
