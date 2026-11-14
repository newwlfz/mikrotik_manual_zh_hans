---
title: "Chateau PRO ax"
slug: /chateau-pro-ax
source: https://manual.mikrotik.com/hardware/chateau-pro-ax
captured_at: '2026-11-04T05:56:13+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/138d6597d14f1806.jpg" alt="" width={603} height={799} /></p>

## [Chateau PRO ax](https://mikrotik.com/product/chateau_pro_ax) (H53UiG-5HaxQ2HaxQ) {#chateau-pro-ax-h53uig-5haxq2haxq}

一款面向高级用户的 Wi-Fi 6 家庭接入点——它配备了性能卓越的无线系统以及与之匹配的 CPU。完整规格和宣传册请参见 [Chateau PRO ax 产品页面](https://mikrotik.com/product/chateau_pro_ax)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适合在室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 插座应安装在设备附近，并且便于插拔。
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频段内工作、输出功率、布綫要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定区域处置。请熟悉将设备正确运送到您所在地区指定收集点的程序。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 设置 {#setup}

- 确保您的互联网服务提供商 (ISP) 允许更换硬件并自动分配 IP 地址；
- 将 ISP 网线连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 以外的任意端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，使用网页浏览器中的 WebFig 或 "WinBox" 配置工具，地址为 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 使用默认 IP 地址 192.168.88.1，在所选工具中开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中进行以下设置：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 使用移动应用程序连接 {#connecting-with-a-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开该应用程序。
- 点击 Connect，通过无线网络建立与设备的连接（请查看贴纸上的无线密码）。
- 用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。
- 选择 Quick Setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码：H53UiG-5HaxQ2HaxQ
- CPU：四核 IPQ-8072A 2208 MHz
- CPU 架构：ARM 64bit
- RAM 容量：1 GB
- RAM 类型：DDR3
- 存储：128 MB，NAND。
- 1G 以太网端口数量：5
- 带 Passive PoE 输出（高达 57V，最大 0.6A）的 1G 以太网端口数量：1 个，Ether5
- USB 端口数量：1 个，USB 3.0 type A
- 交换机芯片型号：IPQ-8072
- 无线接口型号：QCN-5024 (2.4 GHz)、QCN-5054 (5 GHz)
- 无线：2.4 GHz 802.11b/g/n/ax 4x4 MIMO，5 GHz 802.11a/n/ac/ax 4x4 MIMO
- WiFi 速率：AX3600
- 尺寸 240 x 156 x 44 mm
- 操作系统 RouterOS v7，许可证级别 6
- 工作温度 -40°C 至 +70°C
- IP 20

## 安装 {#mounting}

本设备设计用于室内使用，可放置在桌面上。

我们建议使用 CAT5 屏蔽网线。使用和安装本设备时，请注意最大允许暴露 (MPE) 安全距离，辐射体与您的身体之间至少保持 20 厘米的距离。

## 供电 {#powering}

- DC 输入数量 1。
- DC 插孔输入电压 18-57 V。
- 电源适配器标称电压 48 V。
- 电源适配器标称电流 1.35 A。
- 无附加设备时的最大功耗为 18 W。
- 最大功耗 55 W。
- 网络待机 (HiNA) ≤ 8 W。

## 配置 {#configuration}

我们建议经常检查更新，以获取 RouterOS 软件的最新更新，从而确保最佳的性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具 ([https://mt.lv/winbox](https://mt.lv/winbox)) 从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以启动设备进行重新安装，请参见 Reset 按钮。

## Mode 按钮 {#mode-button}

Mode 按钮位于设备背面右侧。Mode 按钮的默认配置为深色模式 - 关闭所有 LED。该按钮可在 RouterOS 中配置为运行任何用户指定的脚本。

## Sync 按钮 {#sync-button}

Sync 按钮位于设备顶部。如果已在无线接口上配置 WPS Sync 按钮，则可用于连接新客户端。

<p><Img src="/img/c76f6511aa4e14f0.webp" alt="" width={383} height={206} /></p>

- 按住 WPS 按钮 1 – 5 秒，可为无线接口启用 WPS。

## 正面 LED 状态 {#front-led-status}

<p><Img src="/img/9ba5b3e5c27a0830.webp" alt="" width={1174} height={120} /></p>

- 无线网络活动。
- 以太网端口活动。
- 系统 LED。
- 信号强度。

## Reset 按钮 {#reset-button}

Reset 按钮有三项功能：

- 在启动过程中按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 持续按住 Reset 按钮，直到 LED 变为常亮，然后松开即可启用 CAP 模式。随后设备将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请使设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议对两种选项都进行验证，以防其中一种无法使用。

- **Regular Booter：** 要进入 etherboot 模式，请在设备上电后等待 1–2 秒，然后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。取决于型号，这可能由 **USR、USER、System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统将加载备份的 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

- ADAPT1_ EU/US 开关电源 48 V，1.35 A。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。
