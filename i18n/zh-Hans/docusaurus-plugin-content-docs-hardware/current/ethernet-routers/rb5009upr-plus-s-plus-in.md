---
title: "RB5009UPr+S+IN"
slug: /rb5009upr-plus-s-plus-in
source: https://manual.mikrotik.com/hardware/rb5009upr-plus-s-plus-in
captured_at: '2026-11-04T06:04:04+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/9719c9879f45eaa4.jpg" alt="" width={799} height={471} /></p>

## [RB5009UPr+S+IN](https://mikrotik.com/product/rb5009upr_s_in) {#rb5009uprsin}

这是我们广受欢迎的高负载 RB5009 路由器的新版本，所有端口均支持 PoE-in 和 PoE-out。非常适合中小型 ISP。2.5 Gigabit Ethernet 与 10 Gigabit SFP+，多种供电方式。完整规格和产品手册请参见 [RB5009UPr+S+IN 产品页面](https://mikrotik.com/product/rb5009upr_s_in)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家和地方法律法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 确保您的 ISP 允许硬件变更并会自动分配 IP 地址；
- 将您的 ISP 网线连接到第一个 Ethernet 端口；
- 将您的 PC 连接到任意 Ethernet 端口；
- 将设备连接到电源；
- 将您的网卡设置为使用 DHCP 自动获取 IP 地址；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单中，然后重启设备；
- 将您的 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

最大负载下的功耗可达 150 W。设备可从电源插孔、2 针端子或任意 Ethernet 端口取电：

- 直流输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 24-57 V DC。
- PoE-in：Ether1 上为 802.3af/at，Ether2-Ether8 上为 Mode B。
- 2 针端子输入电压：24-57 V DC。
- PoE-out 端口：Ether1 - Ether8。当输入低于 30 V 时每端口最大输出为 640 mA，当输入高于 30 V 时为 440 mA。
- 最大总输出：2.59 A。
- 总输出功率：130 W。
- 总输出电流：2.28 A。
- 2 针端子：Connector Plug P=5.08 mm 1x2pin RA TH，镀锡，300 V 10 A。

Mode B：**Ethernet 端口 2 - 8**。引脚 4 和 5 = DC+，引脚 7 和 8 = DC-。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的 Ethernet 网线连接到 PoE 适配器的 PoE 端口；
- 将来自您 LAN 的 Ethernet 网线连接到 PoE 适配器的 LAN 端口，注意数据和电流流向的箭头；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help)开始，以熟悉各种可能性。如果无法建立 IP 连接，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧通过设备的 MAC 地址进行连接（默认情况下，来自 Internet 端口的所有访问均被阻止）。为便于恢复，可以从网络启动设备，请参见 Reset 按钮。

## 安装 {#mounting}

本设备设计用于室内使用，可安装在墙上，也可以放置在桌面上。

<p><Img src="/img/8a5382c1f81612f6.webp" alt="" width={556} height={298} /></p>

- 如附图所示，在设备两侧找到预留的安装孔；
- 使用随附的螺丝将设备固定到墙上；
- 根据墙面材质，您可以使用钻头和随附的膨胀螺栓。

本设备不具备防水污染保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 网线。*本设备的安装和配置应由合格人员进行。*

## 机架安装 {#rackmount}

如果期望的安装位置是机架，可单独购买额外的支架：

### RB5009 机架安装套件 K-79 {#rb5009-rackmount-kit-k-79}

<p><Img src="/img/d12c6eeeff2b274e.webp" alt="" width={475} height={164} /></p>

## 扩展插槽和端口 {#extension-slots-and-ports}

- 七个 10/100/1000 Gigabit Ethernet 端口，支持 PoE-in 和 PoE-out。
- 一个 2.5G Ethernet 端口。
- 一个 10G SFP+ 端口。
- 一个 USB 3.0 type-A 端口。

## Reset 按钮 {#reset-button}

RouterBOOT reset 按钮具有以下功能。按下按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，即可将 RouterOS 配置重置为默认值。
- 当 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络安全重装 RouterOS 时需要）。

无论使用上述哪种选项，如果在设备接通电源之前就按下按钮，系统将加载备份的 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## LED {#led}

- Reset 按钮后面的隐藏绿色 LED 是 USER LED
- 蓝色 LED 1 是 DC1 电源 LED
- 蓝色 LED 2 是 DC2 电源 LED
- 绿色 SFP+ LED 是 SFP+ 端口链路和活动 LED
- Ethernet RJ45 绿色 LED 是 Ethernet 端口链路和活动 LED
- Ethernet RJ45 端口 1 的橙色 LED 是 PoE-in 状态 LED
- Ethernet RJ45 端口 2-8 的橙色 LED 在此型号上未使用

## 配件 {#accessories}

包装中包含随设备提供的以下配件：

- ADAPT1_EU/US 开关电源 48V 2A。
- SET1_ K-55 紧固套件。
- PAD1_ 4 个垫片 D=7；H=1.5 mm，黑色，单面 3M988T 胶粘

支持的 SFP 模块请参见 [MikroTik 有线接口兼容性](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。

## 规格 {#specifications}

- CPU：88F7040 1.4 GHz。
- CPU 架构：ARM 64-bit。
- CPU 核心数：4。
- RAM 容量：1 GB。
- RAM 类型：DDR4。
- 存储：1 GB，NAND。
- 1G Ethernet 端口数量：7。
- 2.5G Ethernet 端口数量：1。
- 10G SFP+ 端口数量：1。
- USB 端口：1（3.0 type A）。
- 操作系统：RouterOS（License level 5）。
- Switch 芯片型号：88E6393。
- 尺寸：220 x 125 x 22 mm。
- 工作温度：-40°C 至 +60°C。

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/rb5009upr_s_in](https://mikrotik.com/product/rb5009upr_s_in)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 安全提示 {#safety-notice}

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备妥善运送至指定处置场所的相关程序。
