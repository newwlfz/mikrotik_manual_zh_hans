---
title: "L14G-2ax-BT5-HL9&EG800Q（KNOT Gateway HL9）"
slug: /l14g-2ax-bt5-hl9-and-eg800q
source: https://manual.mikrotik.com/hardware/l14g-2ax-bt5-hl9-and-eg800q
captured_at: '2026-11-04T09:53:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可以下载为 <a href="/assets/files/l14g-2ax-bt5-hl9-and-eg800q-87762c8938cbe57a3dcfaa63cee67b53.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/f9479f22ec666562.webp)

![](/img/cb9a99a1b9413676.webp)

## [KNOT Gateway HL9](https://mikrotik.com/product/knot_gateway_hl)（L14G-2ax-BT5-HL9&EG800Q） {#knot-gateway-hl9-l14g-2ax-bt5-hl9eg800q}

一款坚固耐用的 IP66 IoT 网关，集成了 BLE 5.1、915 MHz Wi-Fi HaLow、Wi-Fi、千兆以太网、LTE Cat 1 bis 和 GNSS。完整规格和宣传册请参见 [KNOT Gateway HL9 产品页面](https://mikrotik.com/product/knot_gateway_hl)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于户外安装，可安装在墙壁或立杆上。开始安装之前，请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能会对人员造成危险情况并损坏系统。
- 仅使用制造商认可的电源和配件，这些电源和配件可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和运行时，与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>**产品代码**</td><td>L14G-2ax-BT5-HL9&EG800Q</td></tr><tr><td>**架构**</td><td>ARM 64 位</td></tr><tr><td>**CPU**</td><td>IPQ-5010，2 核，800 MHz</td></tr><tr><td>**RAM / 存储**</td><td>256 MB RAM / 128 MB NAND</td></tr><tr><td>**操作系统**</td><td>RouterOS v7，许可证级别 4</td></tr><tr><td>**移动网络：LTE**</td><td>Category 1 bis（10 Mbps ↓ / 5 Mbps ↑）</td></tr><tr><td>**MIMO**</td><td>DL 1×1，UL 1×1</td></tr><tr><td>**LTE FDD 频段**</td><td>2（1900 MHz）、4（1700 MHz）、5（850 MHz）、12（700 MHz）、13（700 MHz）、66（1700 MHz）</td></tr><tr><td>**TAC**</td><td>01688100</td></tr><tr><td>**无线**</td><td>2.4 GHz 802.11b/g/n/ax，Wi-Fi 6，1 条链路，287 Mbit/s，3.9 dBi</td></tr><tr><td>**Wi-Fi HaLow**</td><td>915 MHz</td></tr><tr><td>**蓝牙**</td><td>5.1</td></tr><tr><td>**以太网**</td><td>1 × 1 GbE RJ45（PoE-in 802.3af/at，18-57 V）</td></tr><tr><td>**SIM**</td><td>1 × Nano-SIM 和 eSIM</td></tr><tr><td>**电源**</td><td>PoE-in（18-57 V）或 2 针端子（12-57 V），最大 7 W</td></tr><tr><td>**散热**</td><td>被动散热</td></tr><tr><td>**尺寸**</td><td>254 × 88 × 57 mm</td></tr><tr><td>**工作温度**</td><td>–40 °C … +50 °C</td></tr><tr><td>**MTBF**</td><td>25 °C 下约 200,000 小时</td></tr><tr><td>**认证**</td><td>FCC、IC、EAC</td></tr><tr><td>**IP**</td><td>IP66</td></tr></tbody></table>

## 快速开始 {#quickstart}

- 确保您的互联网服务提供商（ISP）允许硬件更换并自动分配 IP 地址；
- 将 ISP 网线连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 之外的任意端口，或无线网络 "MikroTik-..." 连接到设备（在标签上查看无线密码）；
- 使用移动应用程序建立连接。或者，使用网页浏览器中的 **WebFig**，或使用 **WinBox** 配置工具，地址为 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在所选的工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备；
- 继续使用 MAC 地址连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请在标签上查看用户名和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 Quick Set 的 WISP AP 菜单中，选择您所在的国家/地区以应用国家法规设置；
- 设置您的无线网络密码；
- 设置您的路由器密码。

## 安装 {#mounting}

该设备专为户外使用而设计，可安装在墙壁或立杆上。

### 将设备安装到墙壁上 {#to-mount-the-device-on-the-wall}

- 在设备背面与安装点对应的位置钻 6 mm 的孔，包括用于安全/锁定点的额外孔；
- 将螺丝插入膨胀螺栓中，使螺帽露出约 10 mm；

![](/img/f6d85d25026306b6.png)

- 放置设备并将其与安装点对齐；

![](/img/b60aa64414031dce.png)

- 拧紧螺丝，将设备固定到墙上。

![](/img/553b3983a5a2daf1.png)

![](/img/88b12c8ab64bceb3.png)

### 将设备安装到立杆上 {#to-mount-the-device-on-a-pole}

- 将软管卡箍穿过安装支架上的孔；
- 将设备靠在立杆上，并把卡箍绕在立杆上；
- 拧紧卡箍，将设备牢固地固定到位。

![](/img/1090de71679314c2.png)

:::warning warning

本设备安装和运行时，设备与人体之间应保持至少 20 cm 的最小距离。在住宅环境中操作本设备可能会造成无线电干扰。

本设备的安装和配置应由合格人员进行。

:::

## 供电 {#powering}

- 2 针端子支持 12-57 V DC⎓；
- 以太网端口支持 802.3af/at Power over Ethernet 18-57 V DC。

最大功耗可达 7 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将一根以太网线从设备连接到 PoE 适配器的 **PoE + DATA** 端口；
- 将一根以太网线从您的本地网络（LAN）连接到 PoE 适配器的 **DATA** 端口；
- 将电源线连接到适配器，然后将其插入电源插座。

## 蜂窝调制解调器配置 {#cellular-modem-configuration}

子菜单：/interface lte

有关频段选择、漫游或高级选项，请参阅 [LTE/5G 手册](/docs/mobile-networking/lte-5g)。

## 重置按钮 {#reset-button}

重置按钮有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住重置按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS 时，需使设备进入 BOOTP 模式。有两个 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议对这两个选项都进行验证，以防其中一个无法使用。

- **Regular Booter:** 要进入 etherboot 模式，请在给设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter:** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备好通过 **Netinstall** 重新安装 RouterOS。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。这对 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内包含以下随设备提供的配件：

- KNOT Gateway HL9。
- 24 V、0.5 A 电源适配器。
- 千兆 PoE 注入器。
- K-66 紧固套件。
- 软管卡箍（2 个）。

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。
