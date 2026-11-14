---
title: "RB5009UPr+S+OUT"
slug: /rb5009upr-plus-s-plus-out
source: https://manual.mikrotik.com/hardware/rb5009upr-plus-s-plus-out
captured_at: '2026-11-04T06:04:08+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/011a389be62b7e0a.jpg" alt="" width={589} height={799} /></p>

## [RB5009UPr+S+OUT](https://mikrotik.com/product/rb5009_out) {#rb5009uprsout}

我们最畅销的重载 PoE 路由器的户外版本。以最优价格提供充分的电源冗余！7 个千兆以太网端口、1 个 2.5 千兆以太网端口、10G SFP+、1GB 内存、1GB NAND、现代四核 CPU、9（！）种供电选项、耐用的 IP66 防水外壳。完整规格和宣传册请参见 [RB5009UPr+S+OUT 产品页面](https://mikrotik.com/product/rb5009_out)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备为户外使用而设计。开始安装前请仔细阅读安装说明。使用不正确的硬件或不遵循正确的操作步骤，可能会对人员造成危险情况并对系统造成损坏。
- 只能使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备出现故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员进行安装。

## 快速开始 {#quickstart}

- 确保您的 ISP 允许硬件变更并会自动分配 IP 地址；
- 将您的 ISP 网线连接到第一个以太网端口；
- 将您的 PC 连接到任意一个以太网端口；
- 将设备连接到电源；
- 将您的网卡设置为使用 DHCP 自动获取 IP 地址；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行。**提供多种配置方法以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

- PoE-in：802.3af/at。
- PoE-out：802.3af/at，与通过 2-pin 端子提供的电压相同（被动 PoE）；如果使用 44-57 V 电源，则为兼容 802.3af/at。
- PoE-out 端口：Ether1 - Ether8。当输入低于 30 V 时，每端口最大输出为 620 mA；当输入高于 30 V 时，为 420 mA。
- 最大总输出：2.59 A。
- 总输出功率：130 W。
- 总输出电流：2.28 A。
- 直流输入数量：2。
- 支持的输入电压：24-57 V（PoE-in）和 24-57 V（2-pin 端子）。
- 无附加设备时的最大功耗：15 W。
- 最大功耗：150 W。
- 2-pin 端子：Connector Plug P=5.08 mm 1x2pin RA TH，镀锡，300 V 10 A。

## 配置 {#configuration}

除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help) 开始，以熟悉这些功能。如果 IP 连接不可用，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参见复位按钮。

## 安装 {#mounting}

本设备为户外使用而设计，可安装在墙壁或立杆上。请确保以太网端口朝下。

我们建议为我们的设备使用 Cat6 网线。

*本设备的安装和配置应由合格人员完成。为符合 **IP66** 等级，请严格遵守安装说明中的规程。*

## 扩展插槽和端口 {#extension-slots-and-ports}

- 七个 10/100/1000 千兆以太网端口，支持 PoE-in 和 PoE-out。
- 一个 2.5G 以太网端口。
- 一个 10G SFP+ 端口。
- 一个 USB 3.0 type-A 端口。

## 复位按钮 {#reset-button}

RouterBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 熄灭后（约 20 秒）松开按钮，可让设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。

无论使用上述哪种方式，如果在设备通电前按下按钮，系统都会加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## LED {#led}

- 复位按钮后面的隐藏绿色 LED 是 USER LED
- 蓝色 LED 1 是 DC1 电源 LED
- 蓝色 LED 2 是 DC2 电源 LED
- 绿色 SFP+ LED 是 SFP+ 端口的链路和活动 LED
- 以太网 RJ45 绿色 LED 是以太网端口的链路和活动 LED
- 以太网 RJ45 端口 1 的橙色 LED 是 PoE-in 状态 LED
- 以太网 RJ45 端口 2-8 的橙色 LED 在此型号上未使用

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

<p><Img src="/img/ca4b47fd9b0e4896.webp" alt="" width={553} height={236} /></p>

支持的 SFP 模块请参见 [MikroTik 有线接口兼容性](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。

## 规格 {#specifications}

- CPU：四核 88F7040 1.4 GHz。
- CPU 架构：ARM 64 位。
- 内存大小：1 GB。
- 内存类型：DDR4。
- 存储：1 GB，NAND。
- 1G 以太网端口数量：7。
- 2.5G 以太网端口数量：1。
- 10G SFP+ 端口数量：1。
- USB 端口：1 个（USB 3 type A）。
- 操作系统：RouterOS v7（License level 5）。
- 交换芯片型号：88E6393。
- 尺寸：222 x 239 x 57 mm。
- 工作温度：-40°C 至 +70°C。

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/rb5009_out](https://mikrotik.com/product/rb5009_out)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及更高版本。出厂预装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

## 安全提示 {#safety-notice}

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请了解您所在地区将设备妥善运输至指定处置场所的相关规程。
