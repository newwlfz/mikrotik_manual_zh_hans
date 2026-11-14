---
title: "Chateau LTE6"
slug: /chateau-lte6
source: https://manual.mikrotik.com/hardware/chateau-lte6
captured_at: '2026-11-04T09:45:29+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/da26ad150e7e6e72.jpg)

## [Chateau LTE6](https://mikrotik.com/product/chateau_lte6) (D53G-5HacD2HnD-TC&FG621-EA) {#chateau-lte6-d53g-5hacd2hnd-tcfg621-ea}

Chateau 是一款家用路由器，用于配合蜂窝网络运营商的 SIM 卡使用。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座中拔出电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

![](/img/cbc5361d4144eab4.webp)

- 将您的计算机连接到其中一个以太网端口；
- 可选 - 将外接天线连接到 SMA 连接器（包装中不提供天线，请参阅 "(链接) 了解 Micro SIM 卡。
- 模式按钮。
- 外接（链接）的盖板
- WPS（链接）
- 集成无线模块，工作在 2.4 GHz，802.11b/g/n 协议。
- 集成无线模块，工作在 5 GHz，802.11a/n/ac 协议。

## 安装 {#mounting}

本设备设计用于室内，可放置在桌面上使用。

应使用 CAT5 屏蔽网线。使用和安装本设备时，请注意最大允许暴露量（MPE）安全距离，辐射体与人体之间至少保持 20 cm 的距离。

## 供电 {#powering}

本设备通过适配器供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）12-28 V DC⎓。最大负载下的功耗可达 15 W，带附件时 21 W。

## 配置 {#configuration}

您应经常检查更新，以获取 RouterOS 软件的最新更新，从而确保最佳性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉这些功能：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以让设备进入引导以进行重新安装，请参阅相应章节。

## 模式按钮 {#mode-button}

模式按钮位于设备背面右侧（见 ""）。模式按钮的默认配置为暗色模式 - 关闭所有 LED。该按钮可在 RouterOS 中配置为运行任意用户指定的脚本。

## 同步按钮 {#sync-button}

同步按钮位于设备顶部。如果在无线接口上配置了 WPS 同步按钮，则可用于连接新客户端。

![](/img/c76f6511aa4e14f0.webp)

- 按住 WPS 按钮 1 – 5 秒，为无线接口启用 WPS。

## 前面板 LED 状态 {#front-led-status}

![](/img/9ba5b3e5c27a0830.webp)

- 无线网络活动。
- 以太网端口活动。
- 系统 LED，具有用于指示蜂窝调制解调器状态的替代模式。
- 信号强度。

## 系统 LED 替代调制解调器模式指示 {#system-led-alternate-modem-mode-indications}

启用蜂窝调制解调器接口后，系统 LED 具有替代指示：

红色闪烁 - 未插入 SIM 卡

黄色 - 在 3G 模式下已建立连接

蓝色 - 在 LTE 模式下已建立连接

闪烁 - 正在建立连接，调制解调器已注册到蜂窝网络，APN 尚未激活

## SIM 卡槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议配合转接卡使用。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在会寻找 CAPsMAN 服务器（共 10 秒）。
- 要使用 Netinstall 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。可用的引导器有两种：常规引导器和备用引导器。常规引导器 - 给设备上电，等待 1-2 秒，然后按住复位按钮。等待系统 LED 绿色闪烁，然后变为常亮 "On"。当绿色 LED 变为 "Off" 时，松开复位按钮 - 设备将进入 BOOTP 模式。
- 备用引导器 – 关闭设备电源，按住复位按钮，然后给设备上电。等待系统 LED 绿色闪烁，然后常亮 "On"。当绿色 LED 变为 "Off" 时，松开复位按钮 - 设备将使用备用引导器进入 BOOTP 模式。无论使用上述哪种选项，如果在给设备上电之前按下按钮，系统都将加载备用 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复非常有用。

Netinstall执行 Netinstall 时，请确保 ROS 文件和 Netinstall 软件均使用最新的 v7 版本。

## 配件 {#accessories}

包装中随设备附带以下附件：

- 欧盟/美国开关电源 24 V ⎓，1.2 A，28.8 W，86.8 %，VI，线缆：150 cm。
- CAT5E UTP 扁平网线，8P8C，AWG32，1.5 m。

## LTE 天线使用 {#lte-antenna-usage}

SMA 连接器用于 LTE 天线。

设备背面门盖后方有两个外接天线连接器。

- 向上拉动门盖将其打开。
- 将 LTE 天线拧到左侧的 SMA 连接器上。天线连接器或所用其他转接头的最大直径为 13 mm。

![](/img/b70ac6f60339b714.webp)

使用一根天线时，请连接到左侧的 SMA 连接器（ANT1）。仅在使用两根天线时，才可以连接到右侧的 SMA 连接器（ANT4）。

![](/img/d3359d36ecb577c0.webp)

请在设备关闭时连接和断开天线！设备上的 SMA 连接器为母头。

您应使用我们的天线 [https://mikrotik.com/product/mant_lte_5o](https://mikrotik.com/product/mant_lte_5o)

## 拆下前盖以接触 PCB {#removing-front-cover-to-access-pcb}

如果需要接触 PCB，可以拆下前盖。

- 取下中央螺丝；

![](/img/3c40f644b6453592.webp)

- 用小螺丝刀在标记位置撬开盖子；
- 继续向上撬开；

![](/img/ef5c2817560d190a.webp)

- 最后将整个盖子取下。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废弃物处置场。请了解将设备正确运送至您所在地区指定处置场的相关程序。
