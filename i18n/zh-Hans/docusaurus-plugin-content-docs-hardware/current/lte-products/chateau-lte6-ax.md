---
title: "Chateau LTE6 ax"
slug: /chateau-lte6-ax
source: https://manual.mikrotik.com/hardware/chateau-lte6-ax
captured_at: '2026-11-04T09:45:30+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/a5d7e76735358694.webp)

## [Chateau LTE6 ax](https://mikrotik.com/product/chateau_lte6_ax) (S53UG+5HaxD2HaxD-TC&FG621-EA) {#chateau-lte6-ax-s53ug5haxd2haxd-tcfg621-ea}

Chateau 是一款家用路由器，用于配合蜂窝网络运营商的 SIM 卡使用。完整规格和宣传手册请参见 [Chateau LTE6 ax 产品页面](https://mikrotik.com/product/chateau_lte6_ax)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请先了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因设备的不当使用而不会发生事故或损坏。请谨慎使用本产品，操作风险自负！
- 如果设备发生故障，请将其断电。最快的方法是拔下电源插头，从电源插座中断开。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

按照以下快速步骤设置您的设备：

![](/img/cbc5361d4144eab4.webp)

- 将您的计算机连接到其中一个以太网端口；
- 可选——将外接天线连接到 SMA 接头（包装中不提供天线，参见 ""）；
- 将 micro SIM 卡插入设备底部的卡槽；

![](/img/9619076cdc698366.webp)

- 将电源适配器连接到 DC 插孔；
- 设备通电且 PC 已连接到设备后，在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始配置；
- 用户名：a*dmin*，默认没有密码，您将被自动登录到 Quick Set 界面（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 通过点击右侧的 (*Check_for_updates*) 并将您的 RouterOS 软件更新到最新版本来更新设备。必须插入有效的 SIM 卡；
- 如需手动更新设备，请访问 [https://mikrotik.com/products](https://mikrotik.com/products) 产品页面查找您的产品。所需的软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 (**WebFig**) 的 (**Files**) 菜单，然后重启设备；
- 将您的 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 要个性化您的无线网络，可在 "Network Name" 字段中更改 SSID；
- 在 (**QuickSet**) 菜单中进行以下设置：选择您的国家/地区，以应用国家法规设置；
- 在 "WiFi Password" 字段中设置您的无线网络密码，密码必须至少为八个字符；
- 在右下方的 "Password" 字段中设置路由器密码，并在 "Confirm Password" 字段中重复输入，该密码将在下次登录时使用；
- 选择 "Apply Configuration" 保存更改。

## 使用移动应用连接 {#connecting-with-a-mobile-app}

使用您的智能手机通过 WiFi 访问路由器。

![](/img/9bcba09a7b6a0d53.webp)

- 插入 SIM 卡并为设备通电。
- 用智能手机扫描二维码，并选择您偏好的操作系统。
- 连接到无线网络。SSID 以 MikroTik 开头，并包含设备 MAC 地址的最后几位数字。
- 打开应用程序。
- 默认情况下，IP 地址和用户名将已自动填写。
- 选择 Connect 以通过无线网络建立与设备的连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 还提供高级菜单，可完整配置所有必要的设置。

## 规格 {#specifications}

- 产品代码 S53UG+5HaxD2HaxD-TC&FG621-EA
- CPU 四核 IPQ-6010 1.8 GHz
- CPU 架构 ARM 64bit
- CPU 核心数 4
- RAM 容量 1 GB
- RAM 类型 DDR3L
- 存储 128 MB，NAND
- 1G 以太网端口数量 4
- 2.5G 以太网端口数量 1
- USB 1 个 USB 2.0 A 型端口
- 交换芯片型号 IPQ-6010
- 无线 2.4 GHz 802.11b/g/n/ax 双链，5 GHz 802.11a/n/ac/ax 双链
- 无线天线最大增益 2.4 GHz - 2 dBi，5 GHz - 4 dBi
- 天线波束宽度 360°
- LTE 类别 6（300Mbit/s 下行，50Mbit/s 上行）
- LTE 调制解调器 FG621-EA
- TAC 86335904
- MIMO DL 2x2
- MIMO UL 1x1
- LTE FDD 频段 1（2100MHz）/ 3（1800MHz）/ 5（850MHz）/ 7（2600MHz）/ 8（900 MHz）/ 20（800MHz）/ 28（700MHz）
- 3G 类别 R8（42.2Mbps 下行，11.2Mbps 上行）
- 3G 频段 1（2100MHz）/ 3（1800MHz）/ 5（850MHz）/ 8（900MHz）
- 尺寸 240 x 156 x 44 mm
- 操作系统 RouterOS v7，许可证级别 4
- 工作温度 -40°C 至 +70°C

## 安装 {#mounting}

本设备设计用于室内使用，可放置在桌面上。

您应使用 CAT5 屏蔽网线。使用和安装本设备时，请注意最大允许暴露（MPE）安全距离，辐射体与您身体之间的最小距离为 20 厘米。

## 供电 {#powering}

本设备通过适配器供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）12-28 V DC⎓。最大负载下的功耗可达 13 W，带附加设备时为 17 W。

## 配置 {#configuration}

您应经常检查更新，以获取 RouterOS 软件的最新更新，从而确保最佳性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，熟悉各种可能的功能：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧通过设备的 MAC 地址进行连接（默认情况下，来自 Internet 端口的所有访问都会被阻止）。出于恢复目的，可以让设备引导以进行重新安装，请参阅该章节。

## Mode 按钮 {#mode-button}

Mode 按钮位于设备背面右侧（参见 ""）。Mode 按钮的默认配置为深色模式——关闭所有 LED。该按钮可在 RouterOS 中配置为运行任何用户指定的脚本。

## Sync 按钮 {#sync-button}

Sync 按钮位于设备顶部。如果在无线接口上进行了配置，WPS Sync 按钮可用于连接新客户端。

![](/img/c76f6511aa4e14f0.webp)

- 按住 WPS 按钮 1 – 5 秒，即可为无线接口启用 WPS。

## 前面板 LED 状态 {#front-led-status}

![](/img/9ba5b3e5c27a0830.webp)

- 无线网络活动。
- 以太网端口活动。
- 系统 LED。
- 信号强度。蜂窝连接技术取决于系统 LED 的颜色：红色：GSM 黄色：3G 蓝色：LTE 绿色：5G NSA 紫色：5G SA

当 LTE 未连接到网络时，系统 LED 将闪烁红色，表示 LTE 连接存在问题。如果 LTE 接口被有意禁用（未使用），系统 LED 将呈蓝色常亮。

## SIM 卡槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议配合转接卡使用。

## Reset 按钮 {#reset-button}

Reset 按钮有三种功能：

- 在启动过程中按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（总共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备随后将查找 CAPsMAN 服务器（总共 10 秒）。
- 要使用 Netinstall 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种引导程序可用：常规引导程序和备份引导程序。常规引导程序——为设备通电，等待 1-2 秒，然后按下并按住 Reset 按钮。等待系统 LED 闪烁绿色，然后变为常亮 "On"。当绿色 LED 变为 "Off" 时，松开 Reset 按钮——设备将进入 BOOTP 模式。
- 备份引导程序——关闭设备电源，按下并按住 Reset 按钮，然后为设备通电。等待系统 LED 闪烁绿色，然后变为常亮 "On"。当绿色 LED 变为 "Off" 时，松开 Reset 按钮——设备将使用备份引导程序进入 BOOTP 模式。无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都将加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

Netinstall执行 Netinstall 时，请确保 RouterOS 使用最新的 v7 版本。将您的 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

- 欧盟/美国开关电源 24 V ⎓，1.2 A。
- CAT5E UTP 扁平网线，8P8C，AWG32，1.5m，黑色

## 天线使用 {#antenna-usage}

SMA 接头用于 LTE 天线。

外接天线插孔位于设备背面。设备附带已连接的无线天线，包装中不提供 LTE 天线。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置点。请了解您所在地区将设备妥善运输至指定处置点的相关程序。
