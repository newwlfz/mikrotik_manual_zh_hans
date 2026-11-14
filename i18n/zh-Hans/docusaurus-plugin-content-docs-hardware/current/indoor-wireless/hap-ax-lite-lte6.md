---
title: "hAP ax lite LTE6"
slug: /hap-ax-lite-lte6
source: https://manual.mikrotik.com/hardware/hap-ax-lite-lte6
captured_at: '2026-11-04T05:58:23+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/570befc167b9f654.jpg" alt="" width={503} height={799} /></p>

:::info 本文涵盖

- hAP ax lite LTE6
- L41G-2axD&FG621-EA

:::

## 安全警告 {#safety-warnings}

- 在操作任何 MikroTik 设备之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。完整规格和宣传资料请参阅 [hAP ax lite LTE6 产品页面](https://mikrotik.com/product/hap_ax_lite_lte6)。
- 仅使用制造商认可的电源和配件，这些均可在本产品的原包装中找到。
- 本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责确保设备的安装符合当地和国家的电气规范。请勿尝试拆卸、修理或改装本设备。
- 本产品适合在室内安装。请让本产品远离水、火、潮湿或高温环境。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源适配器从电源插座中拔出。
- 适配器应安装在设备附近，并应便于接触。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置应与您的身体、职业使用者或公众保持不小于 20 厘米的距离。

## 设置 {#setup}

- 确保您的互联网服务提供商 (ISP) 允许硬件更改并自动分配 IP 地址；
- 将您的计算机连接到其中一个以太网端口；
- 配置您的计算机通过 DHCP 自动获取 IP 地址；
- 将 micro SIM 卡插入卡槽；

<p><Img src="/img/ff6ca66ab0388496.webp" alt="" width={1375} height={1383} /></p>

- IMEI 号可在机壳和包装标签上找到；
- 将电源适配器连接到 DC 插孔；
- 通过任一端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具：[https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 使用默认 IP 地址 192.168.88.1，在所选工具中开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 并将您的 RouterOS 软件更新到最新版本，以更新设备。必须插入有效的 SIM 卡；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单并重启设备。通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您所在的国家/地区，以应用该国家/地区的法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码并选择您首选的操作系统。
- 安装并打开该应用程序。
- 默认情况下，IP 地址和用户名已预先填入。
- 单击 Connect，通过无线网络与您的设备建立连接。
- 选择 Quick Setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要设置。

## 供电 {#powering}

设备可通过以下方式接受供电：

- USB type C 接受 5 V DC⎓。最大负载下的功耗可达 12 W。

## 配置 {#configuration}

登录后，我们建议在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将您的 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将要使用所在的国家/地区，以符合当地法规。除本文档所述内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始，以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以让设备引导以进行重新安装，请参阅按钮与跳线部分。

## 按钮和跳线 {#buttons-and-jumpers}

reset 按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 持续按住 reset 按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请使设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议同时验证这两个选项，以防其中一个无法使用。

- **Regular Booter：** 要进入 etherboot 模式，请在设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备通电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。视型号而定，这可能由 **USR、USER、System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统将加载备份的 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复非常有用。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。
