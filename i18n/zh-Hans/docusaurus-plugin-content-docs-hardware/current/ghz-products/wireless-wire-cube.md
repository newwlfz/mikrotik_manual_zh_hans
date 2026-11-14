---
title: "Wireless Wire Cube"
slug: /wireless-wire-cube
source: https://manual.mikrotik.com/hardware/wireless-wire-cube
captured_at: '2026-11-04T10:08:49+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可以下载为 <a href="/assets/files/wireless-wire-cube-341547731816889727201641e27bbc3a.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/2a56acfbac220108.jpg)

## [Wireless Wire Cube](https://mikrotik.com/product/wireless_wire_cube) (CubeG-5ac60adpair) {#wireless-wire-cube-cubeg-5ac60adpair}

客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布缆要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备拟安装于机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能会对人员造成危险情况并对系统造成损坏。
- 本产品仅供室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座上拔下电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布缆要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 本设备为 A 类设备。在住宅环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置应与您的身体、职业使用者或普通公众保持不少于 21 厘米的距离。

## 快速开始 {#quickstart}

- 用网线将设备连接到随附的 PoE 注入器；
- 将 PoE 注入器连接到 PC 或网络交换机；
- 将电源适配器连接到 PoE 注入器；
- 下载 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)，打开 WinBox 并连接到设备；
- 默认 IP：192.168.88.2/192.168.88.3，用户名：**admin**，密码请见设备标签；
- 从 [https://mikrotik.com/download](https://mikrotik.com/download) 下载最新的 RouterOS 软件；
- 选择 ARM 软件包，并将其保存到您的 PC；
- 打开 WinBox 并上传已下载的软件包，将其拖放到任意窗口中；
- 重启设备；
- 再次连接，并在 Wireless 菜单的 W60G 选项卡中选择您的区域，在 **QuickSet** 菜单中设置您的国家/地区，以应用国家法规设置。*如果设备发生 RX 阻塞情况，设备将在几秒后恢复其信号。*

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将已自动填入。
- 点击 Connect 通过无线网络与您的设备建立连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 还提供高级菜单，可完整配置所有必要的设置。

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的 "Check for updates" 按钮，因为将您的 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将要使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备（参见 ）。如果设备失去连接，请等待几秒钟，然后设备将自动恢复连接。

## 组装与安装 {#assembly-and-mounting}

该设备可以如图片 A 和 B 所示安装在垂直或水平抱杆上。请注意，设备安装时底部卡扣必须朝下。最大抱杆直径为 51 mm。

本设备的安装和配置应由经过认证的人员完成。

选择您想要的位置，设备需要精确调整才能获得最佳性能。

- 使用 ph0 螺丝刀，用随附的螺丝将随附的安装支架固定到设备背面。
- 使用 8 mm 棘轮，用 U 型螺栓支架安装到抱杆上。
- 将螺栓放入三个位置之一，它们可以实现精细调节；放在中间位置时，您可以在 23 度范围内调节，如果需要进一步调节，请将螺丝换到其他位置。

![](/img/acd1ca316e8c01cd.webp)

本设备的 IP 防护等级为 IP54。在户外安装时，请确保所有线缆开口朝下。我们建议使用 POE 注入器并采用 Cat6 屏蔽线缆进行正确接地。使用和安装本设备时，请注意最大允许暴露（MPE）安全距离，辐射体与您的身体之间至少保持 20 cm。

此外，设备也可以安装在设备背面的三个安装槽之一上。

![](/img/c5e03fa807689f16.webp)

![](/img/be7006c56abe1792.webp)

- 例如，您可以使用金属环。
- 使用十字螺丝刀松开金属环。
- 将其一端穿过三个安装槽中最方便的一个。
- 将设备放置在其将要安装的抱杆上。
- 将安装环的松端滑回其闭合卡扣，并用螺丝刀拧紧。

建议使用扎带将网线固定在抱杆上，与设备的距离约为 30 cm。

作为附加选项，您可以使用 "quickMOUNT-X" —— 一种可单独购买的、便于调节的安装支架。产品网页：[https://mikrotik.com/product/qm_x](https://mikrotik.com/product/qm_x)

![](/img/8f9318498c6d2b23.webp)

其特殊设计可在抱杆上实现垂直和水平调节。

## 接地 {#grounding}

设备包含一个接地连接（标记为 ⏚），您应将其连接到设备使用所在地的塔架或建筑物的接地装置上。这可大幅降低静电放电和雷击损坏的风险。

## 供电 {#powering}

Cube Lite60 接受来自无源 PoE 注入器的 DC ⎓ 电源（随附一个电源和一个 PoE 注入器），支持 12-28 V DC ⎓，最大负载功耗为 4 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备上的网线连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的网线连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 10/100 以太网端口。
- 集成 5 GHz 802.11a/n/ac 接口，带内置天线。
- WiGig 芯片组 QCA6335。

## 复位按钮 {#reset-button}

routerBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置和默认值。
- 当 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络安全重装 RouterOS 所需）。无论使用上述哪种选项，如果在设备接通电源之前按下按钮，系统将加载备份的 RouterBOOT 引导程序。这对 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内含以下随设备提供的附件：

- EU/US 开关电源 24V DC ⎓、0.8 A、9 W、Level VI、线缆：1.5 m。
- 带屏蔽以太网线缆/连接器的 POE 注入器（RBPOE）。
- Cube 安装支架。
- 用于 Cube 安装支架的 K-70 紧固套件。

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS 软件版本 *v6.47.2.*。具体的出厂预装版本号显示在 RouterOS 菜单 /system resource 中。其他操作系统尚未经过测试。

## 说明 {#notes}

本设备符合 ETSI 法规规定的最大发射功率限值。欧盟境内的频率和最大发射功率列出如下：57-66GHz：34.92 dBm。60 GHz 频段的工作模式：58.32 GHz、60.48 GHz、62.64 GHz。本设备已通过认证，可用于户外的点对多点应用。在以下国家/地区，本设备不能用于固定点对点应用：

![](/img/01438e2d9209ce7d.webp)

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCCID</th></tr></thead><tbody><tr><td>CubeG-5ac60adpair</td><td>TV7CB5A60</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装环境中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能造成有害干扰，此时用户需要自费纠正这种干扰。

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权利。

本设备符合 FCC 规则第 15 部分。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。

除 FCC CFR §15.255 (b) 中所列条件外，本设备不得在飞机上运行。

**重要提示。FCC 辐射暴露声明：** 本设备符合 FCC 针对非受控环境所规定的辐射暴露限值。本设备的安装和运行应使辐射体与您的身体之间保持至少 21cm 的最小距离。用于连接外围设备的所有线缆必须屏蔽并接地。使用未屏蔽且未接地的线缆连接外围设备运行，可能会对无线电和电视接收造成干扰。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>CubeG-5ac60adpair</td><td>7442A-CB5A60</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 标准的免许可发射器/接收器。其运行须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

除 ISED RSS-210 附录 J.1 中所列条件外，本设备不得在飞机上运行。

本设备不得在飞机上使用，除非符合 ISED RSS-210 附录 J.1 中所列的条件。

**重要提示。IC 辐射暴露声明：** 本设备符合 IC RSS-102 针对非受控环境所规定的辐射暴露限值。本设备的安装和运行应使辐射体与您的身体之间保持至少 21cm 的最小距离。Cet équipement est conforme aux limites d'exposition aux rayonnements IC établies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé avec un minimum de 21cm de distance entre la source de rayonnement et votre corps.

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный каналы</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>5650-5850 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

有关设备制造日期的信息以斜杠分隔的形式标明在其标签上的序列号末尾。第一位数字表示年份编号（年份的最后一位数字），其后两位表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 (Norma Oficial Mexicana) {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5470-5725 МГц (27 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰境内使用，须按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议（2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）所批准的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

Mikrotīkls SIA 特此声明，无线电设备类型 CubeG-5ac60adpair 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WiGig {#wigig}

<table><thead><tr><th>工作信道 / 最大输出功率</th><th>58.32 GHz / &lt;40 dBm</th></tr></thead><tbody><tr><td>60.48 GHz / &lt;40 dBm</td><td></td></tr><tr><td>62.64 GHz / &lt;40 dBm</td><td></td></tr></tbody></table>

### WLAN {#wlan}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>5470-5725 MHz / 27 dBm</th></tr></thead></table>
