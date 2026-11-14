---
title: "Cube 60G ac"
slug: /cube-60g-ac
source: https://manual.mikrotik.com/hardware/cube-60g-ac
captured_at: '2026-11-04T09:48:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可以下载为 <a href="/assets/files/cube-60g-ac-0575326476d89f7f1ddf08a17bccceb7.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/e1fbe52194fa5d7e.webp)

## [Cube 60G ac](https://mikrotik.com/product/cube_60g_ac)（CubeG-5ac60ad） {#cube-60g-ac-cubeg-5ac60ad}

客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

## 安全警告 {#safety-warnings}

- 在操作任何设备之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 在任何墙面上安装接入点的所有安装方法均须获得当地主管部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适合安装在户外的杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险情况并损坏系统。
- 仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 这是 A 类设备。在居住环境中，本产品可能会造成无线电干扰，在这种情况下，用户可能需要采取适当的措施。

## 快速开始 {#quickstart}

- 使用以太网线将设备连接到随附的 PoE 注入器；
- 将 PoE 注入器连接到 PC 或网络交换机；
- 将电源适配器连接到 PoE 注入器；
- 下载 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)，打开 WinBox 并连接到设备；
- 默认 IP：192.168.88.1，用户名：**admin**，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 从 [https://mikrotik.com/download](https://mikrotik.com/download) 下载最新的 RouterOS 软件；
- 选择 ARM 软件包，并将其保存到您的 PC；
- 打开 WinBox 并上传已下载的软件包，将其拖放到任意窗口中；
- 重启设备；
- 再次连接，在 Wireless 菜单的 W60G 标签页中选择您所在的地区，并在 **QuickSet** 菜单中设置您所在的国家/地区，以应用国家/地区法规设置。*如果设备发生了 RX 阻塞情况，设备将在几秒钟后恢复其信号。*

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描 QR 码并选择您偏好的操作系统。
- 安装并打开该应用。
- 默认情况下，IP 地址和用户名将已自动填入。
- 单击 Connect，通过无线网络建立与设备的连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 还提供高级菜单，可完整配置所有必要的设置。

## 配置 {#configuration}

登录后，我们建议在 QuickSet 菜单中单击 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将要使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，熟悉各种可能的功能：[https://mt.lv/help](https://mt.lv/help)。如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备（参见 ）。如果设备失去连接，请等待几秒钟，设备将自动恢复连接。

## 组装与安装 {#assembly-and-mounting}

该设备可以安装在垂直或水平杆上，如图 A 和 B 所示。请注意，安装设备时底部卡扣必须朝下。最大杆直径是 51 mm。

本设备的安装和配置应由经过认证的人员完成。

选择您想要的位置，设备需要精确调整才能获得最佳性能。

- 使用 ph0 螺丝刀，用随附的螺丝将随附的支架固定到设备背面。
- 使用 8 mm 棘轮，用 U 型螺栓支架安装到杆上。
- 将螺栓放在三个位置之一，它们可以实现微调；当放在中间位置时，您可以在 23 度范围内进行调整，如果调整需要更大的范围，请将螺丝更换到其他位置。

![](/img/acd1ca316e8c01cd.webp)

本设备的 IP 防护等级为 IP54。在户外安装时，请确保所有线缆开口朝下。我们建议使用 POE 注入器，并使用 Cat6 屏蔽线缆进行正确接地。使用和安装本设备时，请注意最大允许暴露（MPE）安全距离，辐射体与您身体之间的最小距离为 20 cm。

此外，也可以将设备安装在设备背面的三个安装槽之一上。

![](/img/c5e03fa807689f16.webp)

![](/img/be7006c56abe1792.webp)

- 例如，您可以使用金属环。
- 使用十字螺丝刀松开金属环。
- 将金属环的一端穿过三个安装槽中最方便的一个。
- 将设备放置在将要安装的杆上。
- 将安装环的活动端滑回其闭合卡扣处，并使用螺丝刀将其拧紧。

建议使用扎带将以太网线缆固定在杆上。与设备的距离约为 30 cm。

作为额外选项，您可以使用 "quickMOUNT-X" —— 一个便于调节的安装支架，可单独购买。产品网页：[https://mikrotik.com/product/qm_x](https://mikrotik.com/product/qm_x)

![](/img/8f9318498c6d2b23.webp)

经过专门设计，可在杆上进行垂直和水平调节。

## 接地 {#grounding}

本设备包含一个接地连接（标记为 ⏚），您应将其连接到设备使用所在塔架或建筑物的接地装置。这可大幅降低 ESD 和雷击损坏的风险。

## 供电 {#powering}

该设备由 Passive PoE 注入器（随附一个电源和 PoE 注入器）提供 DC ⎓ 电源，支持 12-28 V DC ⎓，最大负载功耗为 4 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的以太网线缆连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 10/100 以太网端口。
- 集成 5 GHz 802.11a/n/ac 接口，带内置天线。
- WiGig 芯片组 QCA6335。

## 复位按钮 {#reset-button}

routerBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置复位为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置和默认值。
- 当 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。无论使用上述哪种方式，如果在设备通电前按下按钮，系统将加载备份的 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

- 欧规/美规开关电源 24V DC ⎓，0.8 A，9 W，Level VI，线缆：1.5 m。
- 带屏蔽以太网线缆/连接器的 POE 注入器（RBPOE）。
- Cube 支架。
- 用于 Cube 支架的 K-70 紧固套件。

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS 软件版本 *v6.47.2*。具体的出厂安装版本号显示在 RouterOS 菜单 /system resource 中。其他操作系统尚未经过测试。

本设备符合 ETSI 法规规定的最大 TX 功率限值。在欧盟的频率和最大发射功率如下：57-66GHz：34.92 dBm。60 GHz 频段的工作模式：58.32 GHz、60.48 GHz、62.64 GHz、64.80 GHz。本设备已通过认证，可在点对多点应用中用于户外。在以下国家/地区，本设备不能用于固定点对点应用：

![](/img/01438e2d9209ce7d.webp)

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCCID</th></tr></thead><tbody><tr><td>CubeG-5ac60ad</td><td>TV7CB5A60</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装环境中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在居住区操作本设备可能会造成有害干扰，在这种情况下，用户将被要求自费纠正干扰。

**FCC 注意：** 任何未经合规负责方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。其操作须符合以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

除 FCC CFR §15.255 (b) 中列出的条件外，本设备不得在飞机上操作。

**重要：FCC 辐射暴露声明：** 本设备符合 FCC 针对不受控环境设定的辐射暴露限值。安装和操作本设备时，辐射体与您身体之间的最小距离应为 21cm。用于连接外围设备的所有线缆必须屏蔽并接地。使用未屏蔽且未接地的线缆连接外围设备进行操作，可能会对无线电和电视接收造成干扰。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>CubeG-5ac60ad</td><td>7442A-CB5A60</td></tr></tbody></table>

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。其操作须符合以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

除 ISED RSS-210 附录 J.1 中列出的条件外，本设备不得在飞机上操作。

本设备不得在飞机上使用，除非符合 ISED RSS-210 附录 J.1 中所列的条件。

在 5150–5250 MHz 频段内工作的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

**重要：IC 辐射暴露声明：** 本设备符合 IC RSS-102 针对不受控环境设定的辐射暴露限值。安装和操作本设备时，辐射体与您身体之间的最小距离应为 21cm。本设备符合 IC 针对不受控环境设定的辐射暴露限值。安装和使用本设备时，辐射源与您身体之间的最小距离应为 21cm。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射机功率</th></tr></thead><tbody><tr><td>5650-5850 MHz</td><td>≤10 W</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证情况而有所不同。

设备制造日期信息标注在其标签上序列号的末尾，用斜线分隔。第一位数字表示年份编号（年份的最后一位数字），后两位表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需要按照 NCCIR 2012 年 11 月 1 日第 559 号决定（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 CubeG-5ac60ad 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WiGig {#wigig}

<table><thead><tr><th>工作信道 / 最大输出功率</th><th>58.32 GHz / &lt;40 dBm</th></tr></thead><tbody><tr><td>60.48 GHz / &lt;40 dBm</td><td></td></tr><tr><td>62.64 GHz / &lt;40 dBm</td><td></td></tr></tbody></table>

### WLAN {#wlan}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>5470-5725 MHz / 27 dBm</th></tr></thead></table>
