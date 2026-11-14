---
title: "RB2011UiAS-2HnD-IN"
slug: /rb2011uias-2hnd-in
source: https://manual.mikrotik.com/hardware/rb2011uias-2hnd-in
captured_at: '2026-11-04T06:03:47+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/82343a7161286309.webp" alt="" width={800} height={519} /></p>

## [RB2011UiAS-2HnD-IN](https://mikrotik.com/product/RB2011UiAS-2HnD-IN)（RB2011UiAS-2HnD-IN） {#rb2011uias-2hnd-in-rb2011uias-2hnd-in}

RouterBOARD 2011UiAS-2HnD 具备我们所有无线路由器的大部分功能和接口。它由新的 Atheros 600MHz 74K MIPS 网络处理器驱动，具有 128MB RAM、五个 Gigabit LAN 端口、五个 Fast Ethernet LAN 端口和 SFP 笼（不含 SFP 模块！）。此外，它还配备强大的（最高 1W！）双链 2.4Ghz 802.11bgn 无线、RJ45 串口、全尺寸 USB 端口和 RouterOS L5 许可证。有关完整规格和宣传册，请参见 [RB2011UiAS-2HnD-IN 产品页面](https://mikrotik.com/product/RB2011UiAS-2HnD-IN)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家电气规范。
- 本设备设计用于机架安装。开始安装前，请仔细阅读安装说明。使用错误的硬件或不遵循正确的程序，可能会对人员造成危险情况并损坏系统。
- 本产品适合室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座上拔下电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能造成无线电干扰，在这种情况下，用户可能需要采取适当措施。

**射频辐射暴露：** 此 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。此 MikroTik 设备的安装和运行应距离您的身体、职业用户或公众不少于 20 centimeters。

## 设置 {#setup}

请按照以下快速步骤设置您的设备：

- 确保您的互联网服务提供商 (ISP) 允许硬件更改并自动分配 IP 地址；
- 将 ISP 电缆连接到 ETH1 端口；
- 将您的其他本地计算机连接到其他以太网端口；
- 通过随附的电源或 PoE 将设备连接到电源；
- 通过任意以太网端口或无线网络 “MikroTik-...” 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用建立连接。或者，在网页浏览器中使用 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 “WinBox” 配置工具。**提供多种配置方法以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 “Neighbors” 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 “admin”，没有密码（或者，对于某些型号，请查看贴纸上的用户密码和无线密码）；
- 单击 “Check for updates” 按钮，并将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 “Downloads” 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 “Files” 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 “QuickSet” 菜单中设置以下内容：选择您所在的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## 供电 {#powering}

该设备可通过电源插孔或 LAN1 以太网端口供电：

-

直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 8-30 V DC（过压保护从 30 V 开始）。

-

Eth1 端口接受来自非标准（无源）Power over Ethernet 注入器的 8-30 V DC 输入（在板端；长电缆上需更高电压以补偿功率损耗）。该板卡不能与符合 IEEE802.3af 的 48 V 电源注入器配合工作。最大功耗 11 W。**连接到 POE 适配器：**

-

将设备上的以太网线连接到 POE 适配器的 POE 端口。

-

将来自局域网的以太网线连接到 POE 适配器的 LAN 端口，请注意数据和电源流向箭头。

-

将电源线连接到适配器，然后将电源线插入电源插座。

## 电源输出 {#power-output}

该设备支持从 Ethernet 10 端口输出 PoE，您可以为支持通过以太网供电的 MikroTik 设备供电。Ether10 上的 PoE 输出电压约比输入电压低 2 V，并支持最高 0.58 A（因此，所提供的 24 V PSU 将在 Ether10 PoE 端口以 0.58 A 输出时提供 22 V）。

## 安装 {#mounting}

该设备设计用于室内，并可放置在平坦表面上，所有所需电缆均连接到设备前部。或者，本设备也可以安装在墙上，安装点位于设备底部，包装中不含螺丝。4x25 mm 的螺丝可很好地适配，根据墙体结构，如有需要，您可以使用 6x30 mm 的膨胀管和 6 mm 钻头。接地螺丝位于设备外壳背面，请将其相应地连接到有效接地。安装在墙上时，请确保电缆引入方向朝下。我们建议使用 Cat5/6 屏蔽电缆。*警告！本设备应在设备与您的身体之间保持至少 20 cm 的最小距离进行安装和操作。在住宅环境中操作本设备可能造成无线电干扰。*

## 配置 {#configuration}

登录后，我们建议单击 QuickSet 菜单中的 “Check for updates” 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法进行 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。为进行恢复，可以将设备引导以重新安装，请参见“按钮和跳线”。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个 10/100/1000 (Gigabit) 以太网端口（Auto MDI/X）。
- 五个 10/100 (Fast) 以太网端口（Auto MDI/X）。
- Ether10 支持 500 mA 输出功率，约比输入电压低 2 V。电源输出支持自动检测以保护设备。
- 一个 8-30 V DC 电源插孔。
- 用于 SFP 模块的 SFP 端口（不含模块，仅可与 Gigabit 模块配合使用）。
- 内置无线 AP（2GHz，802.11b/g/n），带外置天线。
- 一个 USB 2.0 A 型端口。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮位于设备背面，您需要至少 6mm 长的工具才能正确触及。复位按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请使设备进入 BOOTP 模式。有两个引导器选项可用：**Regular Booter** 和 **Backup Booter**。建议验证这两个选项，以防其中一个无法工作。

- **Regular Booter：** 要进入 etherboot 模式，请在设备上电并等待 1–2 seconds 后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将引导进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。取决于型号，这可能会由 **USR、USER、System** 或 **ACT** LED，或由 SFP 端口 LED 指示。

无论使用上述哪个选项，如果在设备通电前按下按钮，系统都会加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内含用于为设备供电的电源：

- EU/US 开关电源 24 V，DC ⎓，1.2 A，28.8 W，86.8%，VI，线缆：220 cm RA。
- 设备出厂时已安装两根天线。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/RB2011UiAS-2HnD-IN](https://mikrotik.com/product/RB2011UiAS-2HnD-IN)

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

<p><Img src="/img/b0984aa3ad3c6d58.webp" alt="" width={239} height={81} /></p>

<p><Img src="/img/25f50553ffd86eaf.webp" alt="" width={241} height={80} /></p>

<p><Img src="/img/8d294e5cd375c591.webp" alt="" width={247} height={244} /></p>

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

## 注意 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备使用的工作范围与上述法规不同，则需要由制造商/供应商向最终用户设备应用定制固件版本，并防止最终用户重新配置。
- 户外使用：最终用户需要获得 NTRA 的批准/许可证。
- 任何设备的数据表可在制造商官方网站上获取。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，TX 功率限制为 20dBm (EIRP)。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，TX 功率限制为 23dBm (EIRP)。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，TX 功率限制为 20dBm (EIRP)。

请确保设备具有 lock package（来自制造商的固件版本），该 lock package 必须应用到最终用户设备，以防止最终用户重新配置。产品将标有国家代码 “-EG”。为确保符合当地主管部门法规，需要将此设备升级到最新版本！最终用户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备必须由专业人员安装。

为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备妥善运输至指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID: TV7RB2011-2HND

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装环境中的有害干扰提供合理防护。

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区域操作本设备很可能造成有害干扰，在这种情况下，用户将被要求自行承担费用纠正干扰。

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户无权操作本设备。本设备符合 FCC 规则第 15 部分。运行需满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致非预期运行的干扰。本设备及其天线不得与任何其他天线或发射器共址或联合运行。**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的 RF 辐射暴露限值。本设备的安装和运行应使辐射体与您身体的任何部位之间保持至少 20 cm 的最小距离。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

IC: 7442A-RB20112HND

本设备符合加拿大工业部免许可证 RSS 标准。运行需满足以下两个条件：(1) 本设备不得产生干扰；(2) 本设备必须接受任何干扰，包括可能导致设备非预期运行的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行应使辐射体与您身体的任何部位之间保持至少 20 cm 的最小距离。Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé à une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息位于其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 МГц (20 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定（该决定于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）所规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RB2011UiAS-2HnD-IN 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用信道**</th><th>**最大输出功率 (EIRP)**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备必须由专业人员安装！*

此 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参阅上文的符合性声明 / 此 MikroTik 设备符合 ETSI 规定所设定的最大 WLAN 发射功率限值。更多信息请参阅上文的符合性声明 / 此 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参阅上文的符合性声明 / 此 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参阅上文的符合性声明 / 此 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参阅上文的符合性声明 / 此 MikroTik 设备符合 ETSI 规则规定的最大 WLAN 发射功率限值。有关更多信息，请参阅上文的符合性声明。
