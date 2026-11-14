---
title: "Wireless Wire Cube Pro, Cube 60Pro ac"
slug: /wireless-wire-cube-pro-cube-60pro-ac
source: https://manual.mikrotik.com/hardware/wireless-wire-cube-pro-cube-60pro-ac
captured_at: '2026-11-04T10:08:19+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/tg-lr92-8a6d0117f62f9c262e34369cb2d654fe.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/2a56acfbac220108.jpg)

![](/img/854233100a314cf7.webp)

:::info 本文涵盖

- **[Wireless Wire Cube Pro](https://mikrotik.com/product/wireless_wire_cube_pro)** (CubeG-5ac60aypair)
- **[Cube 60Pro ac](https://mikrotik.com/product/cube_60pro_ac)** (CubeG-5ac60ay)

:::

客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线设备都必须由专业人员安装。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 请仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线设备都必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备与您的身体、职业用户或公众之间的距离不得小于 21 厘米。

## 快速开始 {#quickstart}

- 使用以太网线将设备连接到随附的 PoE 注入器；
- 将 PoE 注入器连接到 PC 或网络交换机；
- 将电源适配器连接到 PoE 注入器；
- 下载 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)，打开 WinBox 并连接到设备；
- 默认 IP：192.168.88.2/192.168.88.3，用户名：**admin**，请在标签上查找密码；
- 从 [https://mikrotik.com/download](https://mikrotik.com/download) 下载最新的 RouterOS 软件；
- 选择 ARM 软件包，并将其保存到您的 PC；
- 打开 WinBox 并上传下载的软件包，拖放到任意窗口中；
- 重启设备；
- 再次连接，并在 Wireless 菜单的 W60G 选项卡中选择您的区域，在 **QuickSet** 菜单中设置您的国家/地区，以应用国家法规设置。*如果设备发生了 RX 阻塞情况，设备将在几秒后恢复其信号。*

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将要使用的国家/地区，以符合当地法规。除了本文档所述内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始，以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具 ([https://mt.lv/winbox](https://mt.lv/winbox)) 从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备 (参见 )。如果设备失去连接，请等待几秒钟，设备将自动恢复连接。

## 组装与安装 {#assembly-and-mounting}

本设备可以安装在垂直或水平的立柱上。最大立柱直径为 51 mm。

本设备的安装和配置应由经过认证的人员完成。

选择您想要的位置，设备需要进行精确调整以获得最佳性能。

- 将随附的支架固定到立柱上，并用螺丝刀拧紧。
- 将设备装到安装支架上，并使用随附的工具固定。

![](/img/d8bcf5eb7f7a756c.webp)

尽管本设备的 IP 防护等级为 IP66，但在户外安装时，请确保任何线缆开口都朝下。我们建议使用 POE 注入器，并使用 Cat6 屏蔽线缆进行正确接地。使用和安装本设备时，请注意最大允许暴露 (MPE) 安全距离，辐射体与您的身体之间至少保持 20 cm 的距离。

## 供电 {#powering}

本设备接受来自无源 PoE 注入器的 DC ⎓ 电源（随附一个电源和一个 PoE 注入器），并接受 18-48 V DC ⎓，最大负载功耗为 13 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备上的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自您本地网络 (LAN) 的以太网线缆连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码 CubeG-5ac60ay / CubeG-5ac60ay-SA
- CPU 4 核 IPQ-4019 716 MHz
- RAM 大小 256 MB
- 存储 64 MB 闪存
- 1G 以太网端口数量 1
- 无线 5 GHz 802.11a/n/ac
- 无线链路数 1
- 天线增益 (dBi) 11.5 5 GHz
- 天线波束宽度 35° 5 GHz
- 60 GHz 天线波束宽度 11° (CubeG-5ac60ay)；60° (CubeG-5ac60ay-SA)
- GPS MT3337V
- WiGig 芯片组 QCA6438
- WiGig 天线模块 SWL-QD46
- 支持的协议 MikroTik 802.11ad / 802.11ay
- 最大 EIRP (dBm) 40
- 尺寸 115 x 95 x 82 mm (CubeG-5ac60ay) 115 x 211 x 90 mm (Cube G-5ac60ay-SA)
- 工作温度 -40°C 至 +70°C
- 操作系统 RouterOS，许可证级别 4

## 复位按钮 {#reset-button}

![](/img/391fce45bfed655b.webp)

routerBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置和默认值。
- 在 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统都将加载备用 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含本设备随附的以下配件：

![](/img/5ba5d44e172ad3af.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS 软件版本 *v6.49.5.*。具体的出厂安装版本号显示在 RouterOS 菜单 /system resource 中。其他操作系统尚未经过测试。

### 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

![](/img/ce6fc3eb10b9a1e6.webp)

FCC ID：TV7CB5A60Y

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装环境提供合理的保护，防止有害干扰。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备可能会造成有害干扰，此时用户将被要求自费纠正干扰。

FCC 警告：任何未经负责合规的一方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得产生有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

除 FCC CFR §15.255 (b) 中列出的条件外，不得在飞机上操作本设备。

重要提示：FCC 辐射暴露声明：本设备符合 FCC 针对非受控环境规定的辐射暴露限值。本设备安装和运行时，辐射体与您的身体之间的最小距离应为 20cm。用于连接外围设备的所有线缆都必须为屏蔽并接地。使用未屏蔽和未接地的线缆连接外围设备运行，可能会对无线电和电视接收造成干扰。

### 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC：7442A-CB5A60Y

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：(1) 本设备不得产生干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

在 5150–5250 MHz 频段内运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

除 ISED RSS-210 附录 J.1 中列出的条件外，不得在飞机上操作本设备。

本设备不得在飞机上使用，除非符合 ISED RSS-210 附录 J.1 中所列的条件。

重要提示：IC 辐射暴露声明：本设备符合 IC RSS-102 针对非受控环境规定的辐射暴露限值。本设备安装和运行时，辐射体与您的身体之间的最小距离应为 20cm。本设备符合针对非受控环境制定的 IC 辐射暴露限值。本设备安装和运行时，辐射源与您的身体之间的最小距离应为 20cm。

### UKCA 标识 {#ukca-marking}

![](/img/387853c20d5a4c82.gif)

### CE 符合性声明 {#ce-declaration-of-conformity}

<table><thead><tr><th>*BG*</th><th>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</th></tr></thead><tbody><tr><td>CS</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DA</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DE</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EL</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EN</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ES</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ET</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FI</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FR</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HR</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HU</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IT</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IS</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令的基本要求及其他相关规定。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LT</td><td>Mikrotīkls SIA 特此确认，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LV</td><td>Mikrotīkls SIA 特此声明，该无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>MT</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NL</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NO</td><td>Mikrotīkls SIA 特此声明，该设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令的基本要求及其他相关要求。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PL</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PT</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>RO</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SK</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SL</td><td>Mikrotīkls SIA 特此确认，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SV</td><td>Mikrotīkls SIA 特此声明，该类型无线电设备 CubeG-5ac60ay、CubeG-5ac60ay-SA 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr></tbody></table>

本设备符合 ETSI 法规规定的最大发射功率限制。频率为 5470-5725MHz，最大发射功率小于 27dBm。欧盟内的频率和最大发射功率列举如下：57 - 66 GHz：34.02 dBm。60 GHz 频段的工作模式：58.32 GHz、60.48 GHz、62.64 GHz。本设备已通过认证，可用于点到多点应用的室外使用。在以下国家，本设备不能用于固定点到点应用：

![](/img/01438e2d9209ce7d.webp)

### WiGig {#wigig}

<table><thead><tr><th>工作信道 / 最大输出功率</th><th>58.32 GHz / &lt;40 dBm</th></tr></thead><tbody><tr><td>60.48 GHz / &lt;40 dBm</td><td></td></tr><tr><td>62.64 GHz / &lt;40 dBm</td><td></td></tr></tbody></table>

### WLAN {#wlan}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>5470-5725 MHz / 27 dBm</th></tr></thead></table>

<table><thead><tr><th>**技术规格：**</th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>产品电源输入选项</td><td>DC 适配器输出规格</td><td>外壳防护等级 (IP 等级)</td><td>工作温度</td><td></td></tr><tr><td>电压，V</td><td>电流，A</td><td></td><td></td><td></td></tr><tr><td>PoE 输入以太网端口 (18 - 48 V DC)</td><td>24</td><td>0.8</td><td>IP54</td><td>-33°..+70°C</td></tr></tbody></table>
