---
title: "hAP ax S"
slug: /hap-ax-s
source: https://manual.mikrotik.com/hardware/hap-ax-s
captured_at: '2026-11-04T05:58:24+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/15dd9306a8f3327b.jpg" alt="" width={799} height={370} /></p>

## [hAP ax S](https://mikrotik.com/product/hap_ax_s) (E62iUGS-2axD5axT) {#hap-ax-s-e62iugs-2axd5axt}

这是我们目前最具性价比的 Wi-Fi 6 接入点。三链 5 GHz 射频（吞吐量最高 900 Mbit/s）、双频 Wi-Fi 6、5 个千兆以太网端口以及一个 2.5G SFP。搭载双核 ARM CPU，具备 PoE-in/PoE-out 灵活性、标准 DC 插孔、USB，以及可壁挂安装的坚固高端外壳。完整规格和宣传册请参见 [hAP ax S 产品页面](https://mikrotik.com/product/hap_ax_s)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备拟安装于机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或未遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 本产品拟在室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，操作风险自负！
- 如果设备出现故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：**本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和运行时，与身体、职业使用者或公众的距离不得小于 20 厘米。

## 供电 {#powering}

- DC 输入数量：2（DC 插孔、PoE-IN）。
- PoE-in 输入电压：18-28 V。
- DC 插孔输入电压：12-28 V。
- PoE-out 端口：Ether5。
- 最大总输出：0.6 A。
- 总输出功率：16.8 W。
- 电源适配器标称电压 24 V。
- 电源适配器标称电流 1.5 A。
- 最大功耗（不含附件）11 W。
- 最大功耗 34 W。

## 设置 {#setup}

- 确保你的互联网服务提供商（ISP）允许更换硬件并自动分配 IP 地址；
- 将 ISP 网线连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 之外的任意端口，或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者使用网页浏览器中的 WebFig，或 "WinBox" 配置工具：[https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择你的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择你的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## 配置 {#configuration}

完整的 RouterOS 文档位于此处：[https://mt.lv/help](https://mt.lv/help) 设备出厂时已预配置为路由器：WAN 端口（Ethernet1）受防火墙保护并运行 DHCP，而所有其他以太网端口和无线接口都属于 LAN 网桥。要设置设备，请将 ISP 网线连接到 Ethernet1 端口，并将设备接入电源。然后使用除 Ethernet1 之外的任意以太网端口访问设备，或加入名为“MikroTik‑…”的默认 Wi‑Fi 网络。Wi‑Fi 密码印在设备附带的贴纸上。你可以通过移动应用程序、网页浏览器中的 WebFig 或 WinBox 工具（从 [https://mt.lv/winbox](https://mt.lv/winbox) 下载）进行连接。使用默认 IP 地址 192.168.88.1 进行配置；如果该地址无法访问，请打开 WinBox，转到“Neighbors”选项卡，发现设备。如需恢复，可以使用 Reset 按钮通过网络重新安装固件。

## 扩展插槽和端口 {#extension-slots-and-ports}

<table><thead><tr><th>**参数**</th><th>**值**</th></tr></thead><tbody><tr><td>**产品代码**</td><td>E62iUGS-2axD5axT</td></tr><tr><td>**架构**</td><td>ARM 32bit</td></tr><tr><td>**CPU**</td><td>EN7562CT，双核，950 MHz</td></tr><tr><td>**CPU 核心数**</td><td>2</td></tr><tr><td>**CPU 线程数**</td><td>2</td></tr><tr><td>**交换芯片型号**</td><td>EN7523</td></tr><tr><td>**RouterOS 许可证**</td><td>Level 4</td></tr><tr><td>**操作系统**</td><td>RouterOS v7</td></tr><tr><td>**RAM 容量**</td><td>512 MB</td></tr><tr><td>**存储容量**</td><td>128 MB NAND</td></tr><tr><td>**测试环境温度**</td><td>-40 °C 至 +70 °C</td></tr><tr><td>**无线 2.4 GHz 最大数据速率**</td><td>574 Mbit/s</td></tr><tr><td>**无线 2.4 GHz 链数**</td><td>2</td></tr><tr><td>**无线 2.4 GHz 标准**</td><td>802.11b/g/n/ax</td></tr><tr><td>**天线增益（2.4 GHz）**</td><td>5.5 dBi</td></tr><tr><td>**无线 2.4 GHz 芯片型号**</td><td>MT7916</td></tr><tr><td>**无线 2.4 GHz 代际**</td><td>Wi-Fi 6</td></tr><tr><td>**无线 5 GHz 最大数据速率**</td><td>2400 Mbit/s</td></tr><tr><td>**无线 5 GHz 链数**</td><td>3</td></tr><tr><td>**无线 5 GHz 标准**</td><td>802.11a/n/ac/ax</td></tr><tr><td>**天线增益（5 GHz）**</td><td>6.5 dBi</td></tr><tr><td>**无线 5 GHz 芯片型号**</td><td>MT7976</td></tr><tr><td>**无线 5 GHz 代际**</td><td>Wi-Fi 6</td></tr><tr><td>**Wi-Fi 速率**</td><td>AX3000</td></tr><tr><td>**10/100/1000 以太网端口（RJ45）**</td><td>5</td></tr><tr><td>**带 PoE-Out 的 1G 以太网端口**</td><td>1（Ether5）</td></tr><tr><td>**光纤（SFP）**</td><td>1 × SFP（支持 2.5G）</td></tr><tr><td>**USB 端口**</td><td>1 × USB Type-A</td></tr><tr><td>**USB 电源重置**</td><td>是</td></tr><tr><td>**最大 USB 电流（A）**</td><td>1 A</td></tr><tr><td>**DC 输入数量**</td><td>2（DC 插孔、PoE-IN）</td></tr><tr><td>**DC 插孔输入电压**</td><td>12–28 V</td></tr><tr><td>**PoE-IN 类型**</td><td>被动 PoE</td></tr><tr><td>**PoE-IN 电压**</td><td>18–28 V</td></tr><tr><td>**PoE-Out 端口**</td><td>Ether5（被动 PoE）</td></tr><tr><td>**PoE-Out 最大电流**</td><td>0.6 A</td></tr><tr><td>**PoE-Out 总功率**</td><td>16.8 W</td></tr><tr><td>**最大功耗**</td><td>34 W</td></tr><tr><td>**最大功率（不含附件）**</td><td>11 W</td></tr><tr><td>**IP 防护等级**</td><td>IP20</td></tr><tr><td>**其他**</td><td>CPU 温度监控</td></tr></tbody></table>

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议在其中一个无法工作时对两个选项都进行验证。

- **Regular Booter：**要进入 etherboot 模式，请在给设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：**关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备好通过 **Netinstall** 重新安装 RouterOS。根据型号的不同，这可能会由 **USR、USER、System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪种选项，只要在设备通电之前按下按钮，系统就会加载备份 RouterBOOT 加载器。这可用于 RouterBOOT 调试和恢复。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。
