---
title: "L009UiGS-RM"
slug: /l009uigs-rm
source: https://manual.mikrotik.com/hardware/l009uigs-rm
captured_at: '2026-11-04T05:59:31+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/829210e28aa7893b.jpg" alt="" width={799} height={296} /></p>

## [L009UiGS-RM](https://mikrotik.com/product/l009uigs_rm) {#l009uigs-rm}

L009 不仅仅是一台路由器。该产品线比 RB2011 快达 4 倍，配备支持容器的现代 ARM CPU、创新的外壳设计，可在单个 1U 空间内安装多达四台路由器，并拥有更大的 RAM、PoE 和 2.5G SFP 支持。此版本附带 1U 机架安装配件。完整规格和手册请参见 [L009UiGS-RM 产品页面](https://mikrotik.com/product/l009uigs_rm)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应依照所有国家法律法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 确保您的 ISP 允许硬件变更，并会自动分配 IP 地址；
- 将 ISP 线缆连接到第一个以太网端口；
- 将您的 PC 连接到任意一个以太网端口；
- 将设备连接到电源；
- 将网卡设置为使用 DHCP 自动获取 IP 地址；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 完成。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 以开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中，选择您所在的国家以应用国家法规设置；
- 设置路由器密码。

## 供电 {#powering}

最大负载下的功耗可达 40 W。设备可从电源插孔或第一个以太网端口获取电源：

- 直流输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 24-56 V DC。
- 第一个以太网端口支持 Power over Ethernet 802.3af/at。
- 侧面的 2 引脚端子接受 24-56 V DC。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 PoE 适配器的 PoE 端口；
- 将来自您 LAN 的以太网线缆连接到 PoE 适配器的 LAN 端口，注意数据和电力流向的箭头；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help) 开始，以熟悉各种可能性。如果无法建立 IP 连接，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问都会被阻止）。为便于恢复，可以从网络引导设备，请参阅复位按钮部分。

## 安装 {#mounting}

本设备设计用于室内使用，可以安装在墙上，也可以放置在桌面上。

<p><Img src="/img/c9aa03e44924a564.webp" alt="" width={1600} height={828} /></p>

- 如图所示，在设备两侧找到设计的安装孔；
- 使用随附的螺丝将设备固定到墙上；
- 根据墙体材料，您可以使用钻头和随附的膨胀管。

本设备没有防水保护，请确保将设备放置在干燥通风的环境中。我们建议为我们的设备使用 Cat6 线缆。*本设备的安装和配置应由合格人员完成。*

## 机架安装 {#rackmount}

如果需要采用机架安装方式，可另行购买额外的支架：

### RB5009/L009 机架安装套件 K-79 {#rb5009l009-rackmount-kit-k-79}

<p><Img src="/img/d12c6eeeff2b274e.webp" alt="" width={475} height={164} /></p>

## 扩展插槽和端口 {#extension-slots-and-ports}

- 八个 10/100/1000 千兆以太网端口。
- 一个 2.5G SFP 端口。
- 一个 USB 3.0 type-A 端口。
- RJ45 串口控制台端口。
- Ether1 上的 PoE-in 和 Ether8 上的 PoE-out。

## 复位按钮 {#reset-button}

RouterBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置复位为默认值。
- 在 LED 熄灭后（约 20 秒）松开按钮，可让设备查找 Netinstall 服务器（通过 Ether1 从网络重新安装 RouterOS 时需要）。

无论使用上述哪种方式，如果在设备接通电源之前按住按钮，系统都将加载备用 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## LED {#led}

- 复位按钮后面的隐藏绿色 LED 是 USER LED
- 蓝色 LED 1 是 DC1 电源 LED
- 蓝色 LED 2 是 DC2 电源 LED
- 绿色 SFP LED 是 SFP 端口链路和活动 LED
- 以太网 RJ45 绿色 LED 是以太网端口 1Gbps 链路和活动 LED
- 以太网 RJ45 端口 1 的橙色 LED 是 PoE-in 状态 LED
- 以太网 RJ45 端口 2-8 的橙色 LED 仅表示 100Mbps

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

- ADAPT1_EU/US 开关电源 24V 1.5A 36W
- SET1_ K-55 固定套件
- PAD1_ 4 个垫片 D=7；H=1.5 mm，单面胶 3M988T

请参见 [MikroTik SFP 模块兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。

## 规格 {#specifications}

- CPU：IPQ-5018 800 MHz。
- CPU 架构：ARM。
- CPU 核心数：2。
- RAM 容量：512 MB。
- RAM 类型：DDR3L。
- 存储：128 MB，NAND。
- 1G 以太网端口数量：8。
- 2.5G SFP 端口数量：1。
- USB 端口：1（3.0 type A）。
- PoE-in：Ether1。
- PoE-out：Ether8。
- 串口控制台端口：RJ45。
- 操作系统：RouterOS（License level 5）。
- 交换芯片型号：88E6190。
- 尺寸：220 x 125 x 22 mm。
- 工作温度：-40°C 至 +70°C。
- IP 防护等级：IP20。

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/l009uigs_rm](https://mikrotik.com/product/l009uigs_rm)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 安全提示 {#safety-notice}

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处理，例如送至指定的废弃物处理场所。请了解您所在地区将设备正确运送至指定处理场所的相关程序。
