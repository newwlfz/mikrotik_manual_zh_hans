---
title: "hEX 升级版"
slug: /hex-refresh
source: https://manual.mikrotik.com/hardware/hex-refresh
captured_at: '2026-11-04T05:58:40+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/8eba059757e4b7d0.jpg" alt="" width={799} height={523} /></p>

## [hEX refresh](https://mikrotik.com/product/hex_2024) (E50UG) {#hex-refresh-e50ug}

经典的 hEX refresh：同样的价格，两倍的性能！这款每个家庭都负担得起的路由器回归了——凭借现代 ARM CPU 和更大的内存，它比以往更强大。完整规格和宣传册请参见 [hEX refresh 产品页面](https://mikrotik.com/product/hex_2024)。

## 安全警告 {#safety-warnings}

- 在对任何 MikroTik 设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。
- 仅使用制造商认可的电源和配件，这些电源和配件可在本产品的原始包装中找到。
- 本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责确保设备的安装符合当地和国家的电气规范。请勿尝试拆卸、维修或改装设备。
- 本产品仅供室内安装。请让本产品远离水、火、潮湿或高温环境。
- 我们无法保证因设备使用不当而不会发生事故或损坏。请小心使用本产品，风险自负！
- 电源插座应安装在设备附近，并应便于插拔。
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源适配器与电源插座的连接。

## 快速开始 {#quickstart}

- 将 ISP 网线连接到 Ethernet1 端口，并将本地网络计算机连接到 2-5 端口；
- 将设备连接到电源；
- 配置网卡设置，使其通过 DHCP 自动获取 IP 地址；
- 应使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具进行配置 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 以开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 标签页来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户密码和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性以及安全更新；
- 设置您的路由器密码。

## 配置 {#configuration}

除了本文档中描述的内容之外，RouterOS 还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help) 开始，以熟悉各种可能性。如果无法建立 IP 连接，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参阅复位按钮。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个 10/100/1000 千兆以太网端口。
- 一个 USB 2.0 type-A 端口。
- Ether1 上的 PoE 输入。

## 复位按钮 {#reset-button}

RouterBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，即可将 RouterOS 配置恢复为默认值。
- 在 LED 熄灭后松开按钮，可使设备查找 Netinstall 服务器（通过网络安全重装 RouterOS 时需要）。

无论使用上述哪种方式，如果在设备接通电源之前按住按钮，系统都会加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 模式按钮 {#mode-button}

可以通过 RouterOS 软件配置模式按钮的动作，以执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 配件 {#accessories}

包装内含以下随设备提供的配件：

- DC ⎓ EU/US 开关电源 24 V，0.38 A，9 W，Level VI，线缆：1.5 m。

## 规格 {#specifications}

- CPU：EN7562CT 950 MHz。
- CPU 架构：ARM。
- CPU 核心数：2。
- 内存大小：512 MB。
- RAM 类型：DDR3L。
- 存储：128 MB，NAND。
- 1G 以太网端口数量：5。
- USB 端口：1 个（2.0 type A）。
- PoE 输入：Ether1。
- 操作系统：RouterOS（许可证级别 4）。
- 交换芯片型号：EN7562CT。
- 工作温度：-40°C 至 +70°C。
- 尺寸：113 x 89 x 28 mm。
- IP20。

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/hex_2024](https://mikrotik.com/product/hex_2024)

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。
