---
title: "hAP be lite"
slug: /hap-be-lite
source: https://manual.mikrotik.com/hardware/hap-be-lite
captured_at: '2026-11-04T05:58:24+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/3da852f0ffb505c8.jpg" alt="" width={458} height={800} /></p>

## [hAP be lite](https://mikrotik.com/product/hap_be_lite) (A42G-HbeP) {#hap-be-lite-a42g-hbep}

对于需要 RouterOS 的灵活性与强大功能的网络来说，这是最经济实惠的 Wi-Fi 7 路由器与接入点。USB-C 供电、2.5 千兆与千兆以太网、Wi-Fi 7 多链路操作、BE3600。完整规格与宣传资料请参见 [hAP be lite 产品页面](https://mikrotik.com/product/hap_be_lite)。

hAP be lite 将现代 Wi-Fi 7 性能与 RouterOS 灵活性融入一个紧凑、实惠的平台，专为空间、外观、速度和预算同样重要的场景而打造。紧凑的设计、低功耗（最高 12 W）以及 USB-C 供电，让几乎任何位置都能轻松部署。

### 性能更强、成本更低的 Wi-Fi 7 {#wi-fi-7-built-to-deliver-more--cost-less}

强大的双频 Wi-Fi 7 天线与 Wi-Fi 7 多链路操作（MLO）为笔记本电脑、手机、平板电脑及其他日常设备带来 BE3600 级别的无线性能。

我们的 Wi-Fi 7 产品专为当今极度拥挤的无线环境而设计，在此环境中，比以往更多的设备在争夺同一片空域。即使在繁忙区域，Wi-Fi 7 也有助于保持连接顺畅、响应迅速。hAP be lite 结合了双链 2.4 GHz 与三链 5 GHz 射频，在现代设备最需要的地方提供额外的无线容量。

在有线方面，我们提供三个千兆以太网端口和一个 2.5 千兆以太网端口，可用于高速上行链路、工作站、NAS 设备或其他高要求场景。

在内部，hAP be lite 采用主频 950 MHz 的现代双核 ARM CPU 和 512 MB RAM，为高级网络任务和繁重流量提供可靠性能。

但硬件只是故事的一部分。借助 RouterOS，你获得的远不止基本的无线连接。你可以构建 VLAN、配置 VPN、进行流量整形、应用高级防火墙规则、通过脚本实现任务自动化，并完全自定义你的设置以满足确切需求。

没有人为限制。没有订阅、付费墙或锁定功能。无论你管理的是单个紧凑部署还是大得多的网络，RouterOS 都能让你完全掌控。

你还可以使用更新后的 CAPsMAN，通过单一界面集中管理多个 MikroTik 接入点。

## 供电 {#powering}

- DC 输入数量：1（USB-C）。
- USB-C 输入电压：5 V。
- 最大功耗 12 W。

## 设置 {#setup}

- 确保你的互联网服务提供商（ISP）允许更换硬件并自动分配 IP 地址；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 以外的任意端口，或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者使用网页浏览器中的 WebFig，或 [https://mt.lv/winbox](https://mt.lv/winbox) 上的 "WinBox" 配置工具。**提供多种配置方式以确保可访问性；**
- 在所选工具中开始配置，使用默认 IP 地址 192.168.88.1。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，并且没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择你的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，你可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择你的国家/地区，以应用该国家/地区的法规设置；
- 在左侧字段中设置你的无线网络密码；
- 在底部字段中设置你的路由器密码。

## 配置 {#configuration}

完整的 RouterOS 文档位于此处：[https://mt.lv/help](https://mt.lv/help) 设备出厂时已预配置为路由器：WAN 端口（Ethernet1）受防火墙保护并运行 DHCP，而所有其他以太网端口和无线接口都是 LAN 网桥的一部分。要设置设备，请将 ISP 线缆连接到 Ethernet1 端口，并将设备插入电源。然后使用除 Ethernet1 以外的任意以太网端口访问设备，或加入名为 “MikroTik‑…” 的默认 Wi‑Fi 网络。Wi‑Fi 密码印在设备所贴的标签上。你可以通过移动应用、网页浏览器中的 WebFig 或 WinBox 工具（从 [https://mt.lv/winbox](https://mt.lv/winbox) 下载）进行连接。使用默认 IP 地址 192.168.88.1 进行配置；如果该地址无法访问，请打开 WinBox，转到 “Neighbors” 选项卡，发现该设备。如需恢复，可使用 Reset 按钮通过网络重新安装固件。

## 扩展插槽和端口 {#extension-slots-and-ports}

<table><thead><tr><th>**参数**</th><th>**值**</th></tr></thead><tbody><tr><td>**产品代码**</td><td>A42G-HbeP</td></tr><tr><td>**架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU**</td><td>AN7563PT</td></tr><tr><td>**CPU 核心数**</td><td>2</td></tr><tr><td>**CPU 线程数**</td><td>2</td></tr><tr><td>**CPU 频率**</td><td>950 MHz</td></tr><tr><td>**交换芯片型号**</td><td>AN7563PT</td></tr><tr><td>**RAM**</td><td>512 MB</td></tr><tr><td>**存储**</td><td>128 MB NAND</td></tr><tr><td>**2.5G 以太网端口**</td><td>1</td></tr><tr><td>**1G 以太网端口**</td><td>3</td></tr><tr><td>**无线 2.4 GHz**</td><td>688 Mbit/s，2 条链，802.11b/g/n/ax/be，4.4 dBi，MT7991，Wi-Fi 7</td></tr><tr><td>**无线 5 GHz**</td><td>2882 Mbit/s，3 条链，802.11a/n/ac/ax/be，7 dBi，MT7991，Wi-Fi 7</td></tr><tr><td>**WiFi 速率**</td><td>BE3600</td></tr><tr><td>**操作系统**</td><td>RouterOS v7</td></tr><tr><td>**RouterOS 许可证**</td><td>Level 4</td></tr><tr><td>**工作温度**</td><td>-40 °C 至 +50 °C</td></tr><tr><td>**散热**</td><td>被动</td></tr><tr><td>**DC 输入**</td><td>1（USB-C）</td></tr><tr><td>**DC 插孔电压**</td><td>5 V</td></tr><tr><td>**最大功耗**</td><td>12 W</td></tr><tr><td>**认证**</td><td>CE, FCC, IC, EAC, RoHS</td></tr><tr><td>**防护等级**</td><td>IP20</td></tr><tr><td>**CPU 温度监控**</td><td>是</td></tr></tbody></table>

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三种功能：

- 在启动过程中按住此按钮，直到绿色 LED 开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种引导程序选项可用：**Regular Booter** 和 **Backup Booter**。建议两种选项都验证一下，以防其中一种无法使用。

- **Regular Booter：** 要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备好通过 **Netinstall** 重新安装 RouterOS。根据型号不同，这可能会由 **USR、USER、System** 或 **ACT** LED 指示，也可能由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 **/system resource** 中。其他操作系统尚未测试。
