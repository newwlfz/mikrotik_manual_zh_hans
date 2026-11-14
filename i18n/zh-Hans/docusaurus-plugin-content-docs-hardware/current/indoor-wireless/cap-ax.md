---
title: "cAP ax"
slug: /cap-ax
source: https://manual.mikrotik.com/hardware/cap-ax
captured_at: '2026-11-04T05:55:24+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/7d30af5b2a7eada0.jpg" alt="" width={799} height={800} /></p>

## [cAP ax](https://mikrotik.com/product/cap_ax) (cAPGi-5HaxD2HaxD) {#cap-ax-capgi-5haxd2haxd}

最畅销的吸顶式接入点回来了——比以往更强大！为您的办公室、酒店、商场或任何拥挤区域的其他部署带来新一代的无线性能。现代四核 CPU、1GB 内存、2 个千兆以太网端口、PoE、Gen 6 802.11ax 无线、随附电源！有关完整规格和宣传册，请参阅 [cAP ax 产品页面](https://mikrotik.com/product/cap_ax)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律法规。
- 设备的安装必须符合当地和国家电气规范。
- 本产品设计为室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，这些电源和附件可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置应距离您的身体、职业使用者或公众不少于 30 厘米。

## 设置 {#setup}

- 确保您的互联网服务提供商（ISP）允许硬件变更并自动分配 IP 地址；
- 将 ISP 网线连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 之外的任意端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具：[https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您所在的国家/地区，以应用该国家/地区的法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 供电 {#powering}

- PoE 输入 802.3af/at
- PoE 输出 无源 PoE 最高 57V（必须使用 &lt;30v DC 插孔，&gt;30V 时可使用 PoE 输入和
- DC 插孔）
- PoE 输出端口
- Ether2，每端口最大输出（输入 &lt; 30 V）：600 mA，每端口最大输出（输入 &gt; 30 V）：400 mA。电流超过 300 mA 时，请使用 DC 插孔为设备供电。
- DC 输入数量 2
- 支持的输入电压 18-57 V（DC 插孔）18-57（PoE 输入）
- 最大功耗（不含附件）11 W
- 最大功耗 36 W

## 安装 {#mounting}

可以使用设备背部的随附安装支架将设备固定到墙壁或天花板上：

- 使用随附的螺丝将安装支架固定到墙壁或天花板上；
- 如有必要，配合随附的膨胀螺栓使用钻头；
- 将所需的线缆连接到设备；
- 通过滑动将设备安装到安装支架上。

<p><Img src="/img/8c8986d6ce278ebe.webp" alt="" width={1167} height={557} /></p>

*本设备的安装和配置应由合格人员完成。* 警告！本设备的安装和运行应确保设备与身体之间至少保持 30 厘米的距离。在住宅环境中操作本设备可能会造成无线电干扰。

工作湿度可为 5% 至 95%，无冷凝。

## 配置 {#configuration}

默认情况下，设备被配置为无线接入点，第一个以太网端口（Eth1）配置为 DHCP 客户端，第二个接口与无线接口桥接在一起。桥接接口上配置了 DHCP 服务器。登录后，我们建议在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将使用的国家/地区，以符合当地法规。除了本文档中描述的内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。为便于恢复，可以从网络启动设备，请参阅复位按钮。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码 cAPGi-5HaxD2HaxD
- CPU 四核 IPQ-6010 1.8 GHz
- 内存大小 1 GB
- 内存类型 DDR3L
- 存储 128 MB，NAND
- 1G 以太网端口数量 2
- 无线接口型号 QCN-5022（2.4 GHz）、QCN-5052（5 GHz）
- 无线 2.4 GHz 802.11b/g/n/ax 双链，5 GHz 802.11a/n/ac/ax 双链
- 天线增益 5.5 dBi
- 操作系统 RouterOS v7，许可证级别 4
- 交换芯片型号 IPQ-6010
- 尺寸 228 x 48 mm
- 工作温度 -40°C 至 +70°C（已测试）

## 复位按钮 {#reset-button}

复位按钮具有三项功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。随后设备将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请将设备进入 BOOTP 模式。有两种引导程序选项可用：**Regular Booter** 和 **Backup Booter**。建议对两种选项都进行验证，以防其中一种无法使用。

- **Regular Booter：** 要进入 etherboot 模式，请在给设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备通电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。根据型号不同，这可能会通过 **USR、USER、System** 或 **ACT** LED，或 SFP 端口 LED 来指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都会加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复非常有用。

## 模式按钮 {#mode-button}

<p><Img src="/img/bd56fb1f06904d9a.webp" alt="" width={327} height={228} /></p>

模式按钮的动作可以在 RouterOS 软件中配置，以执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。默认情况下，该按钮将启用 "dark mode"（深色模式），即禁用 LED 灯。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 配件 {#accessories}

包装内含以下随设备附带的附件：

<p><Img src="/img/1e4022e0e0b1ada1.webp" alt="" width={859} height={236} /></p>

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码并选择您首选的操作系统。
- 安装并打开该应用。
- 点击 Connect，通过无线网络建立与设备的连接（请查看贴纸上的无线密码）。
- 用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。
- 选择 Quick Setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备的工作范围与上述规定不同，则需要将制造商/供应商定制的固件版本应用到最终用户设备，并防止最终用户重新配置。
- 户外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据表均可在制造商官方网站上获取。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，TX 功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，TX 功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，TX 功率限制为 20dBm（EIRP）。

请确保设备具有锁定包（来自制造商的固件版本），需要将其应用到最终用户设备以防止最终用户重新配置。产品将标有国家代码 "-EG"。本设备需要升级到最新版本，以确保符合当地权威机构的规定！最终用户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解将设备妥善运输到您所在地区指定处置场所的相关程序。

### 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>cAPGi-5HaxD2HaxD</th><th>TV7CPG52X</th></tr></thead></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装提供合理的有害干扰防护。

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭并重新开启设备来判定），则鼓励用户尝试通过以下一项或多项措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以获取帮助。FCC 警告：未经合规责任方明确批准的任何更改或修改，可能会使用户操作本设备的权限失效。

本设备符合 FCC 规则第 15 部分。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。

注意：本设备在使用外围设备屏蔽线缆的情况下进行了测试。为确保合规，必须使用屏蔽线缆与本设备配合使用。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC 和 IC 针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置应距离您的身体、职业使用者或公众不少于 30 厘米。

**FCC 法规限制仅限室内使用。**

### 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>cAPGi-5HaxD2HaxD</th><th>7442A-CAPAX</th></tr></thead></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 标准的免许可发射器/接收器。其运行须满足以下两个条件：(1) 本设备不得产生干扰。(2) 本设备必须接受任何干扰，包括可能导致设备运行异常的干扰。

本设备内含的免许可证发射器/接收器符合加拿大创新、科学与经济发展部（ISED）针对免许可证无线电设备适用的 CNR 标准。允许在以下两个条件下运行：1）设备不得产生干扰；2）设备必须接受任何接收到的无线电干扰，即使该干扰可能导致设备运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

在 5150–5250 MHz 频段工作的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC 和 IC 针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置应距离您的身体、职业使用者或公众不少于 30 厘米。

### UKCA 标志 {#ukca-marking}

<p><Img src="/img/387853c20d5a4c82.gif" alt="" width={2115} height={2113} /></p>

### CE 符合性声明 {#ce-declaration-of-conformity}

<table><thead><tr><th>*BG*</th><th>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</th></tr></thead><tbody><tr><td>CS</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DA</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DE</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EN</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ES</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ET</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FI</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FR</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HR</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HU</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IS</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LV</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>MT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NO</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PT</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>RO</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SK</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SL</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SV</td><td>Mikrotīkls SIA 特此声明，此类型无线电设备 cAPGi-5HaxD2HaxD 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址查阅：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr></tbody></table>

#### WLAN {#wlan}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>2400-2483.5 MHz / 20 dBm</th></tr></thead><tbody><tr><td>5150-5250 MHz / 23 dBm</td><td></td></tr><tr><td>5250-5350 MHz / 20 dBm</td><td></td></tr><tr><td>5470-5725 MHz / 30 dBm</td><td></td></tr><tr><td>5725-5850 MHz / 14 dBm</td><td></td></tr><tr><td>5850-5895 MHz / 14 dBm</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。有关更多详细信息，请参阅上文的符合性声明。

当本设备在 5150 至 5350 MHz 频率范围内工作时，其 WLAN 功能仅限室内使用。

<p><Img src="/img/6250b391e18aff84.webp" alt="" width={1600} height={334} /></p>

仅限 5 GHz 的限制。

<table><thead><tr><th>**技术规格：**</th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>产品电源输入选项</td><td>DC 适配器输出规格</td><td>外壳 IP 等级</td><td>工作温度</td><td></td></tr><tr><td>**电压，V**</td><td>**电流，A**</td><td></td><td></td><td></td></tr><tr><td>DC 插孔（18 - 57 V DC） PoE 输入以太网（18 - 57 V DC）</td><td>24</td><td>1.5</td><td>IP20</td><td>±0°..+40°C</td></tr></tbody></table>
