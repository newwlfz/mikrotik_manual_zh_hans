---
title: "hAP ax²"
slug: /hap-ax-2
source: https://manual.mikrotik.com/hardware/hap-ax-2
captured_at: '2026-11-04T05:58:13+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/039ae3f4916c9df7.jpg" alt="" width={601} height={799} /></p>

## [hAP ax²](https://mikrotik.com/product/hap_ax2) (C52iG-5HaxD2HaxD-TC) {#hap-ax-c52ig-5haxd2haxd-tc}

传奇 hAP ac² 的第六代版本。支持 PoE 输入和 PoE 输出，无线速度更快，内存更大，并采用现代 CPU。市面上最小巧的全功能 AX 路由器！完整规格和宣传册请参见 [hAP ax² 产品页面](https://mikrotik.com/product/hap_ax2)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架上。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能会对人员造成危险并对系统造成损坏。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 请仅使用制造商认可的电源和附件，这些均可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备出现故障，请将其与电源断开。最快的断开方式是将电源插头从电源插座中拔出。
- 客户有责任遵守当地的国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装。

**暴露于射频辐射：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 供电 {#powering}

- 直流输入数量 2（PoE-in、DC 插孔）
- PoE-in 输入电压 18-28 V
- DC 插孔输入电压 12-28 V
- PoE-out 被动 PoE Ether1，每端口最大输出（输入 &lt; 30 V）：600mA
- 最大总输出 0.6 A
- 总输出功率 16.8 W
- 电源适配器标称电压 24 V
- 电源适配器标称电流 1.2 A
- 最大功耗（不含附加设备）12 W
- 最大功耗 27 W

## 设置 {#setup}

- 确保您的互联网服务提供商（ISP）允许硬件变更并自动分配 IP 地址；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 之外的任意端口，或通过无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者使用网页浏览器中的 WebFig，或 "WinBox" 配置工具：[https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 使用默认 IP 地址 192.168.88.1，在所选工具中开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性以及安全更新；
- 在 "QuickSet" 菜单中进行以下设置：选择您的国家/地区，以应用该国法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 配置 {#configuration}

我们建议点击 "Check for updates" 按钮，并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从此处开始熟悉这些可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问都会被阻止）。为便于恢复，可以从网络启动设备，请参见"按钮和跳线"。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码 C52iG-5HaxD2HaxD-TC。
- CPU 四核 IPQ-6010 864 MHz。
- CPU 架构 ARM 64bit。
- 内存大小 1 GB。
- 存储 128 MB，NAND。
- 1G 以太网端口数量 5。
- 带 PoE-out 的 1G 以太网端口数量 1。
- 交换芯片型号 IPQ-6010。
- 无线接口型号 QCN-5052（2.4 GHz）、QCN-5052（5 GHz）。
- 无线 2.4 GHz 802.11ax 双链、5 GHz 802.11 802.11ax 双链。
- 无线天线最大增益 2.4 GHz（4.5 dBi）、5 GHz（4 dBi）。
- 尺寸 120 x 101 x 37 mm。
- 操作系统 RouterOS，许可证级别 4。
- 工作温度 -40°C 至 +50°C。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三种功能：

- 在启动过程中按住此按钮，直到绿色 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种 booter 选项可用：**常规 Booter（Regular Booter）** 和 **备份 Booter（Backup Booter）**。如果其中一个选项不起作用，建议对两个选项都进行验证。

- **常规 Booter：** 要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **备份 Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。根据型号不同，这可能会通过 **USR、USER、System** 或 **ACT** LED，或 SFP 端口 LED 来指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都将加载备份的 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复非常有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 注意事项 {#notice}

- 任何设备的数据手册均可在制造商官方网站上获取。
- 对于某些型号，请查看贴纸上的用户和无线密码。
- 5.470-5.725 GHz 频段不允许用于商业用途。
- 请确保设备具有锁定软件包（制造商提供的固件版本），该软件包必须应用到最终用户设备，以防止最终用户重新配置。产品将标有国家代码 "-EG" - C52iG-5HaxD2HaxD-TC-EG。
- 户外使用：最终用户需要获得 NTRA 的批准/许可。
- 埃及法规固件的无线频率范围限制在 2.400 – 2.4835 GHz，TX 功率限制为 20dBm（EIRP）。
- 埃及法规固件的无线频率范围限制在 5.150 – 5.250 GHz，TX 功率限制为 23dBm（EIRP）。
- 埃及法规固件的无线频率范围限制在 5.250 – 5.350 GHz，TX 功率限制为 20dBm（EIRP）。本设备需要升级到最新版本，以确保符合当地主管部门的法规！最终用户有责任遵守当地的国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请了解您所在地区将设备妥善运送到指定处置场所的程序。

### 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>C52iG-5HaxD2HaxD-TC-US</td><td>TV7C52-5AXD2AXD</td></tr></tbody></table>

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业环境安装提供合理的有害干扰防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能导致有害干扰，此时用户需自费消除干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能使用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不会造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

注意：本设备的外围设备使用屏蔽电缆进行测试。必须使用屏蔽电缆以确保合规。

**暴露于射频辐射：** 本 MikroTik 设备符合 FCC 针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或公众的距离不得小于 38 厘米。

**FCC 法规限制仅可在室内使用。**

### 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>C52iG-5HaxD2HaxD-TC-US</td><td>7442A-C52AX</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可证 RSS 的免许可证发射器/接收器。操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备内含的免许可证发射器/接收器符合加拿大创新、科学与经济发展部（ISED）针对免许可证无线电设备适用的 CNR 标准。允许在以下两个条件下运行：1）设备不得产生干扰；2）设备必须接受任何接收到的无线电干扰，即使该干扰可能导致设备运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

在 5150–5250 MHz 频段运行的设备仅限室内使用，以减少对同信道移动卫星系统的潜在有害干扰。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

**暴露于射频辐射：** 本 MikroTik 设备符合 IC 针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或公众的距离不得小于 38 厘米。

**暴露于射频辐射：** 本 MikroTik 设备符合 IC 针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或公众的距离不得小于 38 厘米。

### UKCA 标志 {#ukca-marking}

<p><Img src="/img/387853c20d5a4c82.gif" alt="" width={2115} height={2113} /></p>

### CE 符合性声明 {#ce-declaration-of-conformity}

<table><thead><tr><th>BG</th><th>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</th></tr></thead><tbody><tr><td>CS</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DA</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DE</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EN</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ES</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ET</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FI</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FR</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HR</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HU</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IS</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LV</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>MT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NO</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>RO</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SK</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SV</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 C52iG-5HaxD2HaxD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr></tbody></table>

### WLAN {#wlan}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>WLAN</th><th>2400-2483.5 MHz / 20dBm</th></tr></thead><tbody><tr><td>WLAN</td><td>5150-5250 MHz / 23 dBm</td><td></td></tr><tr><td>WLAN</td><td>5250-5350 MHz / 20 dBm</td><td></td></tr><tr><td>WLAN</td><td>5470-5725 MHz / 27 dBm</td><td></td></tr><tr><td>WLAN</td><td>5725-5850 MHz / 14 dBm</td><td></td></tr><tr><td>WLAN</td><td>5850-5895 MHz / 14 dBm</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大 TX 功率限值。更多详细信息请参见上文的符合性声明。

当在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限于室内使用。

<p><Img src="/img/6250b391e18aff84.webp" alt="" width={1600} height={334} /></p>

仅限 5GHz 的相关限制

<table><thead><tr><th>**（EN）技术规格 /（DE）技术规格 /（FR）技术规格 /（IT）技术规格 /（ES）技术规格 /（RU）技术规格：**</th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>（EN）产品电源输入选项（DE）产品电源输入选项（FR）产品电源输入选项（IT）产品电源输入选项（ES）产品电源输入选项（RU）产品电源输入选项</td><td>（EN）直流适配器输出规格（DE）直流适配器输出规格（FR）直流适配器输出规格（IT）直流适配器输出规格（ES）直流适配器输出规格（RU）直流适配器输出规格</td><td>（EN）外壳 IP 等级（DE）外壳 IP 等级（FR）外壳 IP 等级（IT）外壳 IP 等级（ES）外壳 IP 等级（RU）外壳 IP 等级</td><td>（EN）工作温度（DE）工作温度（FR）工作温度（IT）工作温度（ES）工作温度（RU）工作温度</td><td></td></tr><tr><td>电压，V</td><td>电流，A</td><td></td><td></td><td></td></tr><tr><td>DC 插孔（12 - 28 V DC）PoE in Ethernet（18 - 28 V DC）</td><td>24</td><td>1.2</td><td>IP20</td><td>±0°..+50°C</td></tr></tbody></table>
