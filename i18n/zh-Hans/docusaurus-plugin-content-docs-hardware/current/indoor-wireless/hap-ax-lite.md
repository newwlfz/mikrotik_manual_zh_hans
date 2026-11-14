---
title: "hAP ax lite"
slug: /hap-ax-lite
source: https://manual.mikrotik.com/hardware/hap-ax-lite
captured_at: '2026-11-04T05:58:18+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/570befc167b9f654.jpg" alt="" width={503} height={799} /></p>

## [hAP ax lite](https://mikrotik.com/product/hap_ax_lite) (L41G-2axD) {#hap-ax-lite-l41g-2axd}

经济实惠的 Gen6 无线 —— 小巧、快速，强大到足以发挥 RouterOS v7 的威力！完整规格和宣传册请参阅 [hAP ax lite 产品页面](https://mikrotik.com/product/hap_ax_lite)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家和地区的法律法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于机架安装。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能导致人员危险和系统损坏。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些电源和配件可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和操作时，与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 设置 {#setup}

- 确保您的互联网服务提供商（ISP）允许更换硬件并自动分配 IP 地址；
- 将 ISP 网线连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 之外的任意端口，或通过无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 "WinBox" 配置工具。**提供多种配置方式以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户密码和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中进行以下设置：选择您的国家，以应用该国家的法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名已预先填入。
- 单击 Connect，通过无线网络建立与设备的连接。
- 选择 Quick setup，应用程序将通过几个简单的步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要设置。

## 供电 {#powering}

设备可通过以下方式供电：

- USB Type-C 接受 5 V DC⎓。最大负载下的功耗可达 8 W。

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将要使用的国家，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，以便熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。为便于恢复，可以引导设备进行重装，请参阅复位按钮。

## 安装 {#mounting}

本设备设计用于室内，放置在平坦表面上，所有需要的线缆连接到设备的前部。本设备的 IP 防护等级为 IPX0。我们建议使用 Cat6 屏蔽网线。警告！本设备的安装和操作应与您的身体保持至少 20 厘米的距离。在住宅环境中操作本设备可能会造成无线电干扰。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码：L41G-2axD。
- CPU：双核 IPQ-5010 1 GHz。
- CPU 架构：ARM。
- 内存大小：256 MB。
- 存储：128 MB，NAND。
- 1G 以太网端口数量：4。
- 交换芯片型号：MT7531BE。
- 无线频段：2.4 GHz。
- 无线接口型号：IPQ-5010。
- 无线 802.11b/g/n/ax：双链。
- 无线天线最大增益：4.3 dBi。
- 尺寸：124 x 100 x 54 mm。
- 操作系统：RouterOS v7，许可证级别 4。
- 工作温度：-40°C 至 +70°C。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开即可启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两个引导选项可用：**Regular Booter** 和 **Backup Booter**。建议对两个选项都进行验证，以防其中一个无法使用。

- **Regular Booter：** 要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，可通过 **Netinstall** 重新安装 RouterOS。视型号不同，这可能由 **USR、USER、System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复非常有用。

## 配件 {#accessories}

产品包装中包含以下随设备提供的配件：

- 5V 2.4A 12W USB 电源适配器

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及更高版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如在指定的废弃物处置场所处置。请了解您所在地区将设备妥善运送到指定处置场所的相关程序。
