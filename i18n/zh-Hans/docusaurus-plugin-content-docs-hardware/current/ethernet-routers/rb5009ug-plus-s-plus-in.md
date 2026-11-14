---
title: "RB5009UG+S+IN"
slug: /rb5009ug-plus-s-plus-in
source: https://manual.mikrotik.com/hardware/rb5009ug-plus-s-plus-in
captured_at: '2026-11-04T06:04:00+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/de416873eea75cb9.jpg" alt="" width={799} height={502} /></p>

## [RB5009UG+S+IN](https://mikrotik.com/product/rb5009ug_s_in) {#rb5009ugsin}

这是一款终极重载型家庭实验室路由器，配备 USB 3.0、1G 与 2.5G 以太网以及一个 10G SFP+ 网笼。您可以在单个 1U 机架空间中安装四台这样的新型路由器！在如此小巧的尺寸下实现了前所未有的处理能力。完整规格与产品手册请参见 [RB5009UG+S+IN 产品页面](https://mikrotik.com/product/rb5009ug_s_in)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于机架安装。开始安装前请仔细阅读安装说明。使用不正确的硬件或不遵循正确的操作步骤，可能给人员带来危险并损坏系统。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 请确认您的 ISP 接受硬件变更并会自动分配 IP 地址；
- 将 ISP 网线连接到 Ethernet1 端口；
- 将 PC 连接到除 Ethernet1 以外的任意端口；
- 将设备连接到电源；
- 将网卡设置配置为使用 DHCP 自动获取 IP 地址；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

最大负载下的功耗可达 20 W。设备可通过电源插孔或第一个以太网端口接受供电：

- 直流输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 24-57 V DC。
- 第一个以太网端口接受 Power over Ethernet 24-57 V DC。
- 侧面的 2 针端子接受 24-57 V DC。
- 2 针端子：连接器插头 P=5.08 mm 1x2pin RA TH，镀锡，300 V 10 A。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 PoE 适配器的 PoE 端口；
- 将来自您 LAN 的以太网线缆连接到 PoE 适配器的 LAN 端口，注意数据和电流流向的箭头；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help)开始，以便熟悉各种可能性。如果无法建立 IP 连接，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。为了恢复目的，可以从网络引导设备，请参见 Reset 按钮。

## 安装 {#mounting}

本设备设计用于室内使用，可以安装在墙上，也可以放置在桌面上。

<p><Img src="/img/8a5382c1f81612f6.webp" alt="" width={556} height={298} /></p>

- 如示意图所示，找到设备两侧预留的安装孔；
- 使用随附的螺钉将设备固定到墙上；
- 根据墙体材料，您可以使用钻头和随附的定位销。

本设备没有防水污染保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 线缆。*本设备的安装和配置应由合格人员完成。*

## 机架安装 {#rackmount}

如果希望安装在机架上，可单独购买额外的支架：

### RB5009 机架安装套件 K-79 {#rb5009-rackmount-kit-k-79}

<p><Img src="/img/d12c6eeeff2b274e.webp" alt="" width={475} height={164} /></p>

## 扩展插槽和端口 {#extension-slots-and-ports}

- 七个 10/100/1000 千兆以太网端口。
- 一个 2.5G 以太网端口。
- 一个 10G SFP+ 端口。
- 一个 USB 3.0 type-A 端口。

## Reset 按钮 {#reset-button}

RouterBOOT 重置按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 在 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。

无论使用上述哪种方式，如果在设备接通电源之前就按住按钮，系统将加载备用的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## LED {#led}

- Reset 按钮后面的隐藏绿色 LED 是 USER LED
- 蓝色 LED 1 是 DC1 电源 LED
- 蓝色 LED 2 是 DC2 电源 LED
- 绿色 SFP+ LED 是 SFP+ 端口的连接和活动 LED
- 以太网 RJ45 绿色 LED 是以太网端口的连接和活动 LED
- 以太网 RJ45 端口 1 的橙色 LED 是 PoE-in 状态 LED
- 以太网 RJ45 端口 2-8 的橙色 LED 在此型号上未使用

## 配件 {#accessories}

包装中包含随设备提供的以下附件：

- ADAPT1_EU/US 开关电源 24V 1.5A 36W
- SET1_ K-55 紧固套装
- PAD1_ 4 个垫片 D=7；H=1.5 mm，黑色，单面 3M988T 胶粘剂

受支持的 SFP 模块请参见 [MikroTik 有线接口兼容性](/docs/wired-connections/mikrotik-wired-interface-compatibility)表。

## 规格 {#specifications}

- CPU：88F7040 1.4 GHz。
- CPU 架构：ARM 64-bit。
- CPU 核心数：4。
- RAM 容量：1 GB。
- RAM 类型：DDR4。
- 存储：1 GB，NAND。
- 1G 以太网端口数量：7。
- 2.5G 以太网端口数量：1。
- 10G SFP+ 端口数量：1。
- USB 端口：1（3.0 type A）。
- 操作系统：RouterOS（License level 5）。
- 交换芯片型号：88E6393。
- 尺寸：220 x 125 x 22 mm。
- 工作温度：-40°C 至 +60°C。

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/rb5009ug_s_in](https://mikrotik.com/product/rb5009ug_s_in)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 安全提示 {#safety-notice}

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置点。请了解您所在地区将设备妥善运输至指定处置点的相关程序。
