---
title: "hAP be³ Media"
slug: /hap-be-media
source: https://manual.mikrotik.com/hardware/hap-be-media
captured_at: '2026-11-04T05:58:28+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/8d968a1e825ffb76.webp" alt="" width={1500} height={1200} /></p>

## [hAP be³ Media](https://mikrotik.com/product/hap_be3_media) (MA53UG+HbeH) {#hap-be-media-ma53ughbeh}

面向路由、服务、容器与现代网络工作负载的专业一体化平台。这是一款功能强大的 Wi-Fi 7 混合路由器与媒体中心，集三频无线、五个 2.5G 以太网端口、内置 Matter/Thread 智能自动化/IoT 支持，以及用于容器、存储和高级网络的四核 ARM CPU 于一身。完整规格与宣传手册请参见 [hAP be³ Media 产品页面](https://mikrotik.com/product/hap_be3_media)。

### 三频 2x2 MIMO Wi-Fi 7 {#triple-band-2x2-mimo-wi-fi-7}

hAP be³ Media 在 2.4、5 和 6 GHz 频段上提供真正的 Wi-Fi 7 性能。你将获得更高的吞吐量、更低的延迟、更强的安全性以及更好的频谱效率。宽广的 6 GHz 频段提供更多干净频谱，有助于减少繁忙环境中的拥塞。

此外，hAP be³ Media 在 TR-MLMR（AP 模式）下支持 Wi-Fi 7 多链路操作（MLO）。

无论你是在运行多设备环境、网络实验室、工作站、VR 头显、NAS 备份、云同步还是高分辨率媒体流，一切都能同时运行，而无需争抢空口时间。更多频段意味着更大容量、更流畅的性能，以及终于能跟上现代工作负载的无线体验。

- 2.4 GHz 天线增益：4 dBi
- 5 GHz 天线增益：7.5 dBi
- 6 GHz 天线增益：8 dBi

### 所有端口均为 2.5 Gigabit 以太网 {#25-gigabit-ethernet-on-all-ports}

没错——不再有瓶颈！超高速 ISP 上行链路、NAS 服务器、工作站——你全都可以拥有！

### 现代化的混合媒体中心 {#a-modern-hybrid-media-center}

凭借 USB-C、两个 USB-A 端口和一个 microSD 卡槽，hAP be³ Media 成为你本地媒体存储的核心。使用闪存进行备份、存放照片、视频监控录像或搭建私有家庭云。

自托管的密码管理器、文档和服务——如果你在意隐私与安全，这就是 2026 年的做法。无需依赖外部服务器即可存储自动化数据和容器工作负载。一切都保持快速、本地，并且**完全由你掌控**。此外，借助 MikroTik BTH 应用和 WinBox 中改进的 File share 功能，你可以共享大文件，而无需担心链接过期、延迟或隐私问题。

### Matter 很重要：智能物联网集成从未如此简单 {#matter-matters-smart-internet-of-things-integration-has-never-been-easier}

凭借 Wi-Fi 7、Bluetooth 5.4 和 RouterOS v7，hAP be³ Media 为现代 IoT 部署提供了坚实的基础。内置的 Thread 无线电和完整的容器支持让用户能够部署 Thread IoT 自动化方案，这些方案保持本地化、私密且完全可自定义。

### 令人印象深刻的四核性能，胜任容器密集型与创意工作流 {#impressive-quad-core-performance-for-container-heavy-creative-workflows}

hAP be³ Media 搭载现代 1.5 GHz 四核 CPU，基于高效的 ARM64 架构，其能力远超传统网络用途。容器、本地仪表板、脚本、复杂防火墙规则、加密、多个 VPN、BGP 和高级路由都能在一台紧凑的设备上流畅运行。这是你今天可以信赖的性能，也是在未来数年内始终领先于你日常需求的容量。

如果你认为容器很复杂——再想想！我们在 WinBox 中提供了一个简单的一键设置页面，你可以在其中启用所需的容器应用。

从可视化网络拓扑、托管轻量级网站，到运行自定义仪表板、安全工具，甚至实验性的本地 AI 助手，容器为你打开了全新可能性的大门。

一如既往，hAP be³ Media 的全部功能都对你开放，没有任何订阅或付费墙。你买了它——你就拥有它，这是 MikroTik 的保证！

## 供电 {#powering}

- DC 输入数量：2（DC 插孔、PoE-IN）。
- PoE-in 输入电压：24-57 V。
- DC 插孔输入电压：24-57 V。
- 电源适配器标称电压 24 V。
- 电源适配器标称电流 1.5 A。
- 最大功耗（不含外接设备）20 W。
- 最大功耗 29 W。

## 设置 {#setup}

- 确保你的互联网服务提供商（ISP）允许更换硬件并自动分配 IP 地址；
- 将 ISP 网线连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 以外的任意端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用建立连接。或者，在网页浏览器中使用 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 "WinBox" 配置工具。**提供多种配置方式以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 标签页来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择你的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，你可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择你的国家/地区，以应用该国家/地区的法规设置；
- 在左侧字段中设置你的无线网络密码；
- 在底部字段中设置你的路由器密码。

## 配置 {#configuration}

完整的 RouterOS 文档位于此处：[https://mt.lv/help](https://mt.lv/help) 设备出厂时已预配置为路由器：WAN 端口（Ethernet1）受防火墙保护并运行 DHCP，而其他所有以太网端口和无线接口都属于 LAN 网桥。要设置设备，请将 ISP 网线连接到 Ethernet1 端口，并将设备插入电源。然后使用除 Ethernet1 以外的任意以太网端口，或加入名为 "MikroTik‑…" 的默认 Wi‑Fi 网络来访问设备。Wi‑Fi 密码印在设备附带的贴纸上。你可以通过移动应用、网页浏览器中的 WebFig 或 WinBox 工具（从 [https://mt.lv/winbox](https://mt.lv/winbox) 下载）进行连接。使用默认 IP 地址 192.168.88.1 进行配置；如果该地址无法访问，请打开 WinBox，进入 "Neighbors" 标签页并发现设备。如需恢复，可以通过网络使用 Reset 按钮重新安装固件。

## 扩展插槽和端口 {#extension-slots-and-ports}

<table><thead><tr><th>**参数**</th><th>**值**</th></tr></thead><tbody><tr><td>**产品代码**</td><td>MA53UG+HbeH</td></tr><tr><td>**架构**</td><td>ARM 64bit</td></tr><tr><td>**CPU**</td><td>IPQ-5322</td></tr><tr><td>**CPU 核心数**</td><td>4</td></tr><tr><td>**CPU 线程数**</td><td>4</td></tr><tr><td>**CPU 频率**</td><td>最高 1.5 GHz（自动）</td></tr><tr><td>**交换芯片型号**</td><td>QCA8386</td></tr><tr><td>**RAM**</td><td>2 GB</td></tr><tr><td>**存储**</td><td>512 MB NAND</td></tr><tr><td>**2.5G 以太网端口**</td><td>5</td></tr><tr><td>**USB 端口**</td><td>3 × USB 3.0 Type-A（最大 1.5 A）</td></tr><tr><td>**无线 2.4 GHz**</td><td>688 Mbit/s，2 条链，802.11b/g/n/ax/be，4 dBi，IPQ-5322，Wi-Fi 7</td></tr><tr><td>**无线 5 GHz**</td><td>2882 Mbit/s，2 条链，802.11a/n/ac/ax/be，7.5 dBi，QCM-8083，Wi-Fi 7</td></tr><tr><td>**无线 6 GHz**</td><td>5764 Mbit/s，2 条链，802.11ax/be，8 dBi，QXM-8086，Wi-Fi 7</td></tr><tr><td>**WiFi 速率**</td><td>BE9300</td></tr><tr><td>**操作系统**</td><td>RouterOS v7</td></tr><tr><td>**RouterOS 许可**</td><td>Level 6</td></tr><tr><td>**工作温度**</td><td>-30 °C 至 +50 °C</td></tr><tr><td>**散热**</td><td>被动散热</td></tr><tr><td>**DC 输入**</td><td>2（DC 插孔、PoE-in）</td></tr><tr><td>**DC 插孔电压**</td><td>24–57 V</td></tr><tr><td>**PoE-in 标准**</td><td>802.3af/at</td></tr><tr><td>**PoE-in 电压**</td><td>24–57 V</td></tr><tr><td>**最大功耗**</td><td>29 W</td></tr><tr><td>**最大功耗（不含外接设备）**</td><td>20 W</td></tr><tr><td>**认证**</td><td>CE, FCC, IC, EAC, RoHS</td></tr><tr><td>**防护等级**</td><td>IP20</td></tr><tr><td>**CPU 温度监控**</td><td>是</td></tr><tr><td>**蓝牙**</td><td>5.4</td></tr></tbody></table>

## 按钮和跳线 {#buttons-and-jumpers}

Reset 按钮有三个功能：

- 在启动过程中按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住 Reset 按钮，直到 LED 变为常亮，然后松开即可启用 CAP 模式。设备随后会开始搜索 CAPsMAN 服务器。
- 如需使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议对两种选项都进行验证，以防其中一种无法使用。

- **Regular Booter：** 要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。取决于型号，这可能通过 **USR、USER、System** 或 **ACT** LED 指示，或通过 SFP 端口 LED 指示。

无论使用上述哪种选项，只要在设备通电之前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及更高版本。具体的出厂预装版本列于 **/system resource** 中。其他操作系统尚未经过测试。
