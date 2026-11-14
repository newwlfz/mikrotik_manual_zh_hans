---
title: "L009UiGS-2HaxD-IN"
slug: /l009uigs-2haxd-in
source: https://manual.mikrotik.com/hardware/l009uigs-2haxd-in
captured_at: '2026-11-04T05:59:31+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/30c72d3372d79f11.jpg" alt="" width={799} height={685} /></p>

## [L009UiGS-2HaxD-IN](https://mikrotik.com/product/l009uigs_2haxd_in)（L009UiGS-2HaxD-IN） {#l009uigs-2haxd-in-l009uigs-2haxd-in}

L009 不仅仅是一台路由器。该产品线比 RB2011 快多达 4 倍，它采用现代 ARM CPU 并支持容器，创新的外壳允许在单个 1U 空间内安装多达四台路由器，拥有更大的 RAM、PoE 以及 2.5G SFP 支持。此版本配备 2.4 GHz ax 双链无线。完整规格和宣传册请参阅 [L009UiGS-2HaxD-IN 产品页面](https://mikrotik.com/product/l009uigs_2haxd_in)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备旨在安装于机架中。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的步骤可能会给人员带来危险情况，并损坏系统。
- 本产品仅供室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。
- 插座应安装在设备附近且易于触及。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座上拔下电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 设置 {#setup}

- 确保您的互联网服务提供商（ISP）允许硬件更改并自动分配 IP 地址；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 以外的任意端口，或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 "WinBox" 配置工具。**提供多种配置方法以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您所在的国家/地区，以应用该国家/地区的法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 供电 {#powering}

最大负载下的功耗可达 47 W。设备可从电源插孔或第一个以太网端口接受供电：

- 直插式电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 24-56 V DC。
- 第一个以太网端口支持 Power over Ethernet 802.3af/at。
- 侧面的 2 针端子接受 24-56 V DC。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网线缆连接到 POE 适配器的 POE 端口。
- 将来自您 LAN 的以太网线缆连接到 POE 适配器的 LAN 端口，请注意数据与电力流向的箭头。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的 "Check for updates" 按钮。将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将要使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以让设备引导以进行重新安装，请参阅按钮和跳线部分。

## 安装 {#mounting}

本设备设计用于室内，可安装在墙上，也可以放置在桌面上。

<p><Img src="/img/6c6197919537348e.webp" alt="" width={1600} height={1801} /></p>

- 如图所示，找到设备两侧设计的安装孔；
- 使用随附的螺钉将设备固定到墙上；
- 根据墙体材质，您可以使用钻头和随附的膨胀螺栓。本设备不具备防水污染保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 线缆。*本设备的安装和配置应由合格人员完成。*

## 机架安装 {#rackmount}

如果希望采用机架安装，可单独购买额外的支架：

### RB5009/L009 机架安装套件 K-79 {#rb5009l009-rackmount-kit-k-79}

<p><Img src="/img/d12c6eeeff2b274e.webp" alt="" width={475} height={164} /></p>

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码 L009UiGS-2HaxD-IN
- CPU IPQ-5018 800 MHz
- CPU 架构 ARM
- CPU 核心数 2
- RAM 大小 512 MB
- RAM 类型 DDR3L
- 存储 128 MB，NAND
- 1G 以太网端口数量 8
- 2.5G SFP 端口数量 1
- USB 端口 1（3.0 type A）
- PoE-in Ether1
- PoE-out Ether8
- 串行控制台端口 RJ45
- 操作系统 RouterOS（License level 5）
- 交换芯片型号 88E6190
- 无线接口型号 IPQ-5018（2.4 GHz）
- 无线 2.4 GHz 802.11b/g/n/ax 双链
- 无线天线最大增益 2.4 GHz（4 dBi）
- 尺寸 220 x 125 x 22 mm
- 工作温度 -40°C 至 +70°C
- IP 20

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开即可启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请让设备进入 BOOTP 模式。提供两种 booter 选项：**Regular Booter** 和 **Backup Booter**。建议在其中一个不起作用时对两个选项都进行验证。

- **Regular Booter：** 要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后为设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将引导进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。视型号而定，这可能由 **USR、USER、System** 或 **ACT** LED，或由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## LED {#led}

- Reset 按钮后面的隐藏绿色 LED 是 USER LED
- 蓝色 LED 1 是 DC1 电源 LED
- 蓝色 LED 2 是 DC2 电源 LED
- 绿色 SFP LED 是 SFP 端口链路和活动 LED
- 以太网 RJ45 绿色 LED 是以太网端口 1Gbps 链路和活动 LED
- 以太网 RJ45 端口 1 的橙色 LED 是 PoE-in 状态 LED
- 以太网 RJ45 端口 2-8 仅橙色 LED - 100Mbps

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

- ADAPT1_EU/US 开关电源 24V 1.5A 36W
- SET1_ K-55 紧固套件
- PAD1_ 4 个垫片 D=7；H=1.5 mm，单面胶 3M988T 有关支持的 SFP 模块，请参阅 [MikroTik 有线接口兼容性](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将本设备与家庭垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请了解将设备正确运输到您所在地区指定处置场所的相关程序。
