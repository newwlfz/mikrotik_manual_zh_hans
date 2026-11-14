---
title: "Wireless Wire Dish"
slug: /wireless-wire-dish
source: https://manual.mikrotik.com/hardware/wireless-wire-dish
captured_at: '2026-11-04T10:44:33+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/wireless-wire-dish-0b7f9054624012522cbc79e78af307a1.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/3d74a0afd5ea4ad8.jpg)

## [Wireless Wire Dish](https://mikrotik.com/product/wireless_wire_dish) (RBLHGG-60adkit) {#wireless-wire-dish-rblhgg-60adkit}

Wireless Wire Dish 是一套两个 LHG 60G 设备，工作在 60 GHz 无线频谱中。出厂时已成对配置，便于首次轻松启动。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作程序，可能导致人员处于危险情况并对系统造成损坏。
- 本产品设计用于室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商批准的电源和配件，这些可在本产品的原包装中找到。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座中拔下电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能造成无线电干扰，在这种情况下，用户可能需要采取适当措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟为不受控环境设定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业用户或公众的距离不得小于 51 厘米。

## 快速开始 {#quickstart}

- 组装设备；
- 打开以太网门，将以太网线连接到以太网端口，将以太网线的另一端连接到随附的 PoE 注入器；
- 将 PoE 注入器插入您的网络交换机；
- 将随附的电源插入 PoE 注入器以启动设备；
- 将设备安装到桅杆或立柱上；
- 对准两个单元；
- 下载 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。主设备默认 IP：192.168.88.2，从设备：192.168.88.3，用户名：**admin**，密码印在设备盖内侧的标签上；
- 如果无法通过 IP 连接，请使用 Neighbors 选项卡并通过 MAC 地址连接；
- 对于 LHG 60G 型号，默认 IP 为 192.168.88.1，且没有密码；
- 连接后配置设备，使其具有活动的 Internet 连接 [https://mt.lv/configuration](https://mt.lv/configuration)；
- 将 RouterOS 软件升级到最新版本 [https://mt.lv/upgrade](https://mt.lv/upgrade)；
- 选择您的国家/地区，以应用国家/地区法规设置。

## 组装 {#assembly}

- 将两条支腿安装到 LHG 外壳上。
- 将组装好的 LHG 单元卡入网格的适当位置。
- 用两颗自攻螺钉固定支腿（使用 Phillips PH2 螺丝刀）。

![](/img/13ed4322cde89e25.webp)

## 安装 {#mounting}

![](/img/2996df0a42666294.webp)

- 用四颗随附螺钉将安装组件固定到设备背面。
- 使用随附的 U 型螺栓卡箍将组装好的单元安装到立柱上。随附钢制卡箍的夹持直径为 35 – 70 mm。

![](/img/c76fdbedc9f84ace.webp)

- 使用 Aim 工具调整您的设备。有关安装说明，请参见 [Wireless Wire Dish 产品页面](https://mikrotik.com/product/wireless_wire_dish)。

![](/img/d81e925bdab602bf.webp)

设备包含一个接地连接（标记为 ⏚），您应将其连接到设备使用地点所在塔架或建筑物的接地装置。这是为了大幅降低 ESD 和雷击损坏的风险。包装中包含接地连接器。

警告！本设备的安装和操作位置与您的身体之间应保持至少 95 cm 的距离。在住宅环境中操作本设备可能会造成无线电干扰。本设备的 IP 防护等级为 IP54。*本设备的安装和配置应由合格人员完成。*

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通或交叉线缆连接其他网络设备。
- WiGig, 802.11ad.

## 供电 {#powering}

设备通过以太网端口供电。以太网端口接受 12-57 V DC 的 PoE 输入（无源和 802.3af/at）。包装盒内包含一个电源适配器和无源 PoE 注入器。使用 PoE 注入器时，请确保使用 "Power + Data" 连接器连接设备，使用 "Data" 连接器连接您的 PC、路由器或交换机。**连接到 POE 适配器：**

- 将来自设备的以太网线连接到 POE 适配器的 POE+DATA 端口。
- 将来自本地网络（LAN）的以太网线连接到 POE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。最大功耗 5 W。

## 配置 {#configuration}

完整的 RouterOS 文档位于此处：[https://mt.lv/help](https://mt.lv/help)。Wireless Wire dish 套件中包含的设备已预配置为桥接模式下的 60GHz 和以太网接口。必须根据上方链接的文档手册应用其他配置。使用以太网线将每台 Wireless Wire dish 设备连接到您的网络。为了使这些网络之间能够通信，设备必须彼此对准并保持直接视距。连接后，设备将自动桥接两个网络。请熟悉有关 [W60G 接口](/docs/wireless/w60g) 的附加信息。使用 MikroTik WinBox 工具通过以太网线访问设备。应使用 WinBox 连接到主设备的默认 IP 地址 192.168.88.2 和从设备的默认 IP 地址 192.168.88.3。登录用户名为 admin，密码印在设备盖内侧的标签上。为便于恢复，可以启动设备以进行重新安装，请参见相应章节。

## 按钮和跳线 {#buttons-and-jumpers}

routerBOOT 复位按钮具有以下功能。按下按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，复位到受密码保护状态（约 5 秒）
- 当 LED 变为常亮绿色时松开按钮以清除所有配置（约 10 秒）
- 当 LED 不再点亮后松开按钮（约 20 秒），使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。无论使用上述哪个选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## LED 状态 {#led-status}

设备包含使用 LED 的精确对准引导。如果从天线盘后方看向链路另一端，指示灯会用箭头指示转动天线盘的方向。当对准 LED 熄灭，仅保留 "link established" LED 时，表示对准完成。LED 指示灯包括：

![](/img/81b844d3fdf5b5cd.webp)

- 向上倾斜。
- 向下倾斜。
- 向右旋转。
- 向左旋转。
- 链路建立时 LED 点亮。
- 以太网连接时 LED 点亮。
- 用户可配置 LED。
- 电源状态开启。

## 配件 {#accessories}

包装内包含以下随设备附带的配件：

- K-LHG 螺丝套装/固定套装。
- 千兆 POE 注入器。
- LHG-5G-390 mm Dish（网孔尺寸 0.5 t x1.0 wx1.4 mm）。
- EU/US 开关电源 24 V ⎓，0.38 A，9 W，Level VI，线缆：1.5 m。
- 软管卡箍 SUS304（Philips 型；夹持直径范围 35-70 mm）。
- BRAC1_ LHG 安装组件。
- DynaDish U 型螺栓 M8（A2 不锈钢）。
- QuickMount AIM.

## 规格 {#specifications}

有关 LHG 产品、规格和图片的更多信息，请访问我们的网页：[https://mikrotik.com/product/wireless_wire_dish](https://mikrotik.com/product/wireless_wire_dish)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用在现场配置路由器，或为您的 MikroTik 家庭接入点应用最基本的初始设置。扫描二维码并选择您首选的操作系统。

![](/img/9bcba09a7b6a0d53.webp)

![](/img/8d294e5cd375c591.webp)

本设备符合 ETSI 法规规定的最大 TX 功率限制。60 GHz 频段中的工作模式：58.32 GHz、60.48 GHz、62.64 GHz。本设备已获认证，可用于点对多点应用的室外使用。在以下国家/地区，固定业务仅允许在部分频段内使用：

![](/img/01438e2d9209ce7d.webp)

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID: TV7LHGG60AD

本设备已通过测试，符合 FCC Rules 第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装环境中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区域操作本设备可能会造成有害干扰，在这种情况下，用户将需要自费纠正干扰。

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户丧失操作本设备的权限。

本设备符合 FCC Rules 第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致非预期操作的干扰。

注意：本单元已在连接外围设备时使用屏蔽线缆进行测试。必须使用屏蔽线缆与本单元配合，以确保合规。

除 FCC CFR §15.255 (b) 中列出的条件外，本设备不得在飞机上操作。

**重要说明。FCC 辐射暴露声明：** 本设备符合 FCC 为不受控环境设定的辐射暴露限值。本设备安装和操作时，辐射器与您的身体之间应保持至少 51cm 的距离。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC: 7442A-LHGG60AD

本设备包含免许可发射器/接收器，符合加拿大创新、科学与经济发展部的免许可 RSS。操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

除 ISED RSS-210 附录 J.1 中列出的条件外，本设备不得在飞机上操作。

本设备不得在飞机上使用，除非符合 ISED RSS-210 附录 J.1 中所列的条件。

**重要说明。IC 辐射暴露声明：** 本设备符合 IC 为不受控环境设定的 RSS-102 辐射暴露限值。本设备安装和操作时，辐射器与您的身体之间应保持至少 51cm 的距离。本设备符合针对非受控环境制定的 IC 辐射暴露限值。本设备安装和使用时，辐射源与您的身体之间应保持至少 51cm 的距离。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备生产日期信息以斜杠分隔标示在其标签上的序列号末尾。第一位数字表示年份编号（年份的最后一位），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备，必须按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBLHGG-60adkit 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WiGig {#wigig}

<table><thead><tr><th>工作信道 / 最大输出功率</th><th>58.32 GHz / 40 dBm</th></tr></thead><tbody><tr><td>60.48 GHz / 40 dBm</td><td></td></tr><tr><td>62.64 GHz / 40 dBm</td><td></td></tr></tbody></table>
