---
title: "hAP ax³"
slug: /hap-ax-3
source: https://manual.mikrotik.com/hardware/hap-ax-3
captured_at: '2026-11-04T05:58:22+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/561579768b8027f5.jpg" alt="" width={799} height={646} /></p>

## [hAP ax³](https://mikrotik.com/product/hap_ax3) (C53UiG+5HPaxD2HPaxD) {#hap-ax-c53uig5hpaxd2hpaxd}

我们顶级的 AX 家用接入点。拥有您的家庭可能需要的全部处理能力和速度。第 6 代无线、2.5 千兆以太网、PoE、WPA3 等！完整规格和宣传册请参阅 [hAP ax³ 产品页面](https://mikrotik.com/product/hap_ax3)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品仅供室内安装。请将本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证不会因不当使用设备而发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座上拔下电源插头。
- 客户有责任遵守当地国家/地区法规，包括在法律允许的频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业用户或公众的距离不得小于 37 厘米。

## 设置 {#setup}

- 在将设备连接到电源之前，请先将随机提供的天线安装到设备上；
- 确保您的互联网服务提供商（ISP）允许硬件变更并自动分配 IP 地址；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 以外的任意端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，使用网页浏览器中的 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 "WinBox" 配置工具。**提供多种配置方法以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，并且没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，并将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性以及安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您的国家/地区，以应用该国家/地区的法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

要获取**密码**，请拉出产品信息附近的卡片占位符。

<p><Img src="/img/6e51537220ef1d68.webp" alt="" width={471} height={254} /></p>

## 供电 {#powering}

- DC 输入数量 2（PoE-in、DC 插孔）
- PoE-in 输入电压 18-28 V
- DC 插孔输入电压 12-28 V
- PoE-out 被动 PoE Ether1，每端口最大输出（输入 &lt; 30 V）：0.625 A
- PoE-out 总输出功率 15 W
- 电源适配器标称电压 24 V
- 电源适配器标称电流 1.5 A
- 最大功耗（不含附件）15 W
- 最大功耗 38 W

## 配置 {#configuration}

我们建议点击 "Check for updates" 按钮，并将您的 RouterOS 软件更新到最新版本，以确保获得最佳性能和稳定性。除了本文档所述内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参见按钮和跳线。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码 C53UiG+5HPaxD2HPaxD
- CPU 四核 IPQ-6010 1.8 GHz
- CPU 架构 ARM 64bit
- 内存大小 1 GB
- 存储 128 MB，NAND
- 1G 以太网端口数量 4
- 2.5G 以太网端口数量 1（支持 PoE-in/out）
- USB 1 个 USB 3 type A
- 交换芯片型号 IPQ-6010
- 无线接口型号 QCN-5022（2.4 GHz）、QCN-5052（5 GHz）
- 无线 2.4 GHz 802.11b/g/n/ax 双链，5 GHz 802.11a/n/ac/ax 双链
- 无线天线最大增益 2.4 GHz（3.3 dBi）、5 GHz（5.5 dBi）
- 尺寸 251 x 130 x 39 mm
- 操作系统 RouterOS，许可级别 6
- 工作温度 -40°C 至 +70°C

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三个功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请使设备进入 BOOTP 模式。有两种引导程序选项可用：**Regular Booter** 和 **Backup Booter**。建议对这两个选项都进行验证，以防其中一个无法工作。

- **Regular Booter：** 要进入 etherboot 模式，请在给设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将引导进入 **BOOTP** 模式，准备好通过 **Netinstall** 重新安装 RouterOS。根据型号的不同，这可能会通过 **USR、USER、System** 或 **ACT** LED，或通过 SFP 端口 LED 来指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都将加载备份 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 配件 {#accessories}

<p><Img src="/img/8bd7e2036792b537.webp" alt="" width={886} height={290} /></p>

## 注意事项 {#notice}

- 任何设备的数据表均可在制造商官方网站上获取。
- 5.470-5.725 GHz 频段不允许用于商业用途。
- 请确保设备带有锁定软件包（来自制造商的固件版本），需要将其应用到最终用户设备上，以防止最终用户重新配置。产品将标有国家代码 "-EG" - C53UiG+5HPaxD2HPaxD-EG。
- 户外使用：最终用户需要获得 NTRA 的批准/许可。
- 埃及法规固件的无线频率范围限制为 2.400 – 2.4835 GHz，TX 功率限制为 20dBm（EIRP）。
- 埃及法规固件的无线频率范围限制为 5.150 – 5.250 GHz，TX 功率限制为 23dBm（EIRP）。
- 埃及法规固件的无线频率范围限制为 5.250 – 5.350 GHz，TX 功率限制为 20dBm（EIRP）。本设备需要升级到最新版本，以确保符合当地主管部门的法规！最终用户有责任遵守当地国家/地区法规，包括在法律允许的频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废弃物处置场所。请熟悉您所在地区将设备正确运送到指定处置场所的相关程序。

### 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>C53UiG+5HPaxD2HPaxD-US</td><td>TV7C53-5AXD2AXD</td></tr></tbody></table>

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装中的有害干扰提供合理的防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再打开设备来确定），则建议用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 请咨询经销商或有经验的无线电/电视技术人员以获取帮助。FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。其运行需满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。

注意：本机在测试时对外围设备使用了屏蔽电缆。为确保合规，必须使用屏蔽电缆连接本机。

批准的 2.4 GHz 天线：

-

3.36 dBi 全向（HGO-antenna-IN）批准的 5 GHz 天线：

-

6.01 dBi 全向（HGO-antenna-IN）**射频辐射暴露：** 本 MikroTik 设备符合 FCC 针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业用户或公众的距离不得小于 37 厘米。

### 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>C53UiG+5HPaxD2HPaxD-US</td><td>7442A-C53AX</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。其运行需满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。

本设备内含的免许可证发射器/接收器符合加拿大创新、科学与经济发展部（ISED）针对免许可证无线电设备适用的 CNR 标准。允许在以下两个条件下运行：1）设备不得产生干扰；2）设备必须接受任何接收到的无线电干扰，即使该干扰可能导致设备运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

在 5150–5250 MHz 频段内运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

批准的 2.4 GHz 天线：

-

3.36 dBi 全向（HGO-antenna-IN）批准的 5 GHz 天线：

-

6.01 dBi 全向（HGO-antenna-IN）**射频辐射暴露：** 本 MikroTik 设备符合 IC 针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业用户或公众的距离不得小于 37 厘米。

本设备符合 IC 针对非受控环境所规定的辐射暴露限值。本设备安装和使用时，辐射源与您身体之间应保持至少 37cm 的距离。

### UKCA 标志 {#ukca-marking}

<p><Img src="/img/387853c20d5a4c82.gif" alt="" width={2115} height={2113} /></p>

### CE 符合性声明 {#ce-declaration-of-conformity}

<table><thead><tr><th>*BG*</th><th>Mikrotīkls SIA 特此声明，此型号无线电设备 C53UiG+5HPaxD2HPaxD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</th></tr></thead><tbody><tr><td>CS</td><td>Mikrotīkls SIA 特此声明，无线电设备型号 C53UiG+5HPaxD2HPaxD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DA</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DE</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EL</td><td>Mikrotīkls SIA 特此声明，无线电设备 C53UiG+5HPaxD2HPaxD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EN</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ES</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ET</td><td>Mikrotīkls SIA 特此声明，此无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/EL 指令的要求。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FI</td><td>Mikrotīkls SIA 声明，无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FR</td><td>签署方 Mikrotīkls SIA 声明，C53UiG+5HPaxD2HPaxD 型无线电设备符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HR</td><td>Mikrotīkls SIA 特此声明，C53UiG+5HPaxD2HPaxD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HU</td><td>Mikrotīkls SIA 证明，C53UiG+5HPaxD2HPaxD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IT</td><td>制造商 Mikrotīkls SIA 声明，C53UiG+5HPaxD2HPaxD 型无线电设备符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IS</td><td>Mikrotīkls SIA 特此声明，C53UiG+5HPaxD2HPaxD 符合 2014/53/EU 指令中规定的基本要求和其他要求。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LT</td><td>本人 Mikrotīkls SIA 确认，无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/ES 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LV</td><td>Mikrotīkls SIA 特此声明，无线电设备 C53UiG+5HPaxD2HPaxD 符合 2014/53/ES 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>MT</td><td>Mikrotīkls SIA 特此声明，此无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NL</td><td>本人 Mikrotīkls SIA 特此声明，C53UiG+5HPaxD2HPaxD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NO</td><td>Mikrotīkls SIA 特此声明，C53UiG+5HPaxD2HPaxD 设备符合 2014/53/EU 指令中的基本要求和其他相关要求。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PL</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PT</td><td>签署方 Mikrotīkls SIA 声明，本无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/UE 指令。符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>RO</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/UE 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SK</td><td>Mikrotīkls SIA 特此声明，C53UiG+5HPaxD2HPaxD 型无线电设备符合 2014/53/EÚ 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SL</td><td>Mikrotīkls SIA 确认，C53UiG+5HPaxD2HPaxD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SV</td><td>Mikrotīkls SIA 特此保证，此无线电设备类型 C53UiG+5HPaxD2HPaxD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr></tbody></table>

***WLAN***

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>WLAN 2.4 GHz</th><th>2400-2483.5 MHz / 20 dBm</th></tr></thead><tbody><tr><td>WLAN 5 GHz</td><td>5150-5250 MHz / 23 dBm</td><td></td></tr><tr><td>WLAN 5 GHz</td><td>5250-5350 MHz / 20 dBm</td><td></td></tr><tr><td>WLAN 5 GHz</td><td>5470-5725 MHz / 27 dBm</td><td></td></tr><tr><td>WLAN 5 GHz</td><td>5725-5850 MHz / 14 dBm</td><td></td></tr><tr><td>WLAN 5 GHz</td><td>5850-5895 MHz / 14 dBm</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。更多详细信息请参见上文的符合性声明。

本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。

<p><Img src="/img/33ffcd4c629d94d3.webp" alt="" width={1600} height={435} /></p>

<table><thead><tr><th>**技术规格：**</th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>产品电源输入选项</td><td>DC 适配器输出规格</td><td>外壳的 IP 等级</td><td>工作温度</td><td></td></tr><tr><td>电压，V</td><td>电流，A</td><td></td><td></td><td></td></tr><tr><td>DC 插孔（12 - 28 V DC）PoE 输入以太网端口（18 - 28 V DC）</td><td>24</td><td>1.5</td><td>IP20</td><td>±0° .. +70°C</td></tr></tbody></table>
