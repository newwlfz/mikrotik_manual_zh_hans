---
title: "CRS304-4XG-IN"
slug: /crs304-4xg-in
source: https://manual.mikrotik.com/hardware/crs304-4xg-in
captured_at: '2026-11-04T09:45:58+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/def6acc060d0060a.jpg)

## [CRS304-4XG-IN](https://mikrotik.com/product/crs304_4xg_in) {#crs304-4xg-in}

这是一款紧凑而强大的设备，旨在简化您的 10 千兆网络部署。它配备 4 个 10G 以太网端口，开箱即可使用。完整规格与产品手册请参见 [CRS304-4XG-IN 产品页面](https://mikrotik.com/product/crs304_4xg_in)。

## 安全警告 {#safety-warnings}

- 在对任何 MikroTik 设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。
- 仅使用制造商认可的电源和附件，这些电源和附件可在本产品的原始包装中找到。
- 本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责确保设备的安装符合当地和国家的电气规范。
- 请勿尝试拆卸、修理或改装本设备。如需维修，请联系 MikroTik 支持。
- 本产品适合在室内安装。请让本产品远离水、火、潮湿或高温环境。
- 我们无法保证因不当使用本设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 插座应安装在设备附近，并且应便于插拔。
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源适配器。
- 为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如在指定区域处置。请熟悉将设备妥善运送到您所在地区指定收集点的相关流程。

## 快速开始 {#quickstart}

- 将您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 使用网页浏览器中的 WebFig 或 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡以查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

这款室内交换机提供多种安装方式，包括侧面的 DIN 导轨安装和背面的标准螺丝孔位，便于轻松集成。DIN 导轨安装支架还可以重新定位到背面。

![](/img/3ca16901a7457a74.webp)

![](/img/0a49dcd4680dbe4d.webp)

## 供电 {#powering}

本设备可通过两个 DC 电源插孔（用于冗余故障切换）、一个 2 针端子或 MGMT/BOOT 以太网 PoE-in 端口供电：

- 直接输入电源插孔 DC1、DC2（外径 5.5 mm、内径 2 mm，母头，中心正极）可接受 DC ⎓ 12-57 V DC。
- MGMT/BOOT 以太网 PoE-in 端口可接受 DC ⎓ 36-57 V 范围内的无源或 802.3af/at 以太网供电。
- 2 针端子可接受 DC ⎓ 12-57 V DC。本设备在最大负载下的功耗为 21 W，最小负载下为 15 W。使用 802.3af/at 为本设备供电时，建议不要接地以获得最佳兼容性。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 使用以太网线将设备连接到随附的 PoE 注入器，将其插入 data+power 或 PoE-out 端口；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器。

## 配置 {#configuration}

RouterOS 的完整文档可在 [https://mt.lv/help](https://mt.lv/help) 获取。本设备可使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性。**

在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡以查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。

本设备配备一个 RS-232 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。出于恢复目的，可以从网络重新安装设备，请参阅复位按钮部分。

Marvell Prestera 交换芯片的特性在 [Marvell Prestera switch chip features](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册中有详细说明。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 四个 1G/2.5G/5G/10G 以太网端口。
- 一个千兆以太网端口，建议用于管理（支持 Auto MDI/X，因此您可以使用直通线或交叉线连接到其他网络设备）。MGMT/BOOT 以太网端口还可用于通过网络启动以及使用 Netinstall 进行恢复。

## 复位按钮 {#reset-button}

- 要重置配置，请断开设备电源，按住复位按钮，并在 USER (USR) LED 开始闪烁时松开。
- 要加载备份引导程序，请在通电前按住复位按钮，三秒后松开。
- 要启动 Netinstall 过程（以 BOOTP 模式启动设备以重新安装 RouterOS），请按住复位按钮，给设备通电，等待 USER (USR) LED 闪烁，然后变为常亮。当 USR LED 熄灭时，松开复位按钮。

无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>**产品代码**</td><td>CRS304-4XG-IN</td></tr><tr><td>**架构**</td><td>ARM 64 位</td></tr><tr><td>**CPU**</td><td>98DX2528，2 核，1200 MHz</td></tr><tr><td>**交换芯片型号**</td><td>98DX2528</td></tr><tr><td>**内存**</td><td>512 MB</td></tr><tr><td>**存储**</td><td>32 MB，闪存</td></tr><tr><td>**以太网端口**</td><td>4 × 1G/2.5G/5G/10G 以太网</td></tr><tr><td>**管理端口**</td><td>1 × 10/100/1000 以太网</td></tr><tr><td>**PoE-in**</td><td>802.3af/at，36-57 V</td></tr><tr><td>**DC 插孔输入电压**</td><td>12-57 V</td></tr><tr><td>**2 针端子输入电压**</td><td>12-57 V</td></tr><tr><td>**最大功耗**</td><td>21 W</td></tr><tr><td>**无附加设备时的最大功耗**</td><td>15 W</td></tr><tr><td>**工作温度**</td><td>-40 °C 至 +70 °C</td></tr><tr><td>**认证**</td><td>CE、EAC、ROHS</td></tr><tr><td>**IP 防护等级**</td><td>IP20</td></tr></tbody></table>

有关本产品、规格和图片的更多信息，请访问我们的网页：[https://mikrotik.com/product/crs304_4xg_in](https://mikrotik.com/product/crs304_4xg_in)

## 配件 {#accessories}

包装中包含随设备提供的以下附件：

![](/img/d2b681a3d51228f9.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。
