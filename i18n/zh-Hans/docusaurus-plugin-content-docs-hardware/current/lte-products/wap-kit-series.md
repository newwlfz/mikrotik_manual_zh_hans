---
title: "wAP kit 系列"
slug: /wap-kit-series
source: https://manual.mikrotik.com/hardware/wap-kit-series
captured_at: '2026-11-04T10:06:54+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **[wAP LTE kit](https://mikrotik.com/product/wap_lte_kit_2024)**
- **wAP LTE kit US**
- **wAP 4G kit**

:::

本设备需要升级至 RouterOS v6.44.6 或最新版本，以确保符合当地主管部门的法规要求。

客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员进行安装。

![](/img/5e39899dfd23337d.webp)

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气线路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 将接入点安装在任何墙面上的所有安装方式均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于室外安装在立杆上，但也可在室内安装。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的步骤，可能会对人员造成危险情况并对系统造成损坏。
- 请仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员进行安装。
- 这是 A 类设备。在住宅环境中，本产品可能会造成无线电干扰，在这种情况下，用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或公众的距离不得小于 38 厘米。

## 快速开始 {#quickstart}

- 使用十字螺丝刀拧松固定底部盖板的螺丝（见 ）。
- 插入 SIM 卡。
- 选择您的供电方案，可用的方案请参见相关章节。
- 将以太网电缆连接到 PoE，并将以太网电缆的另一端连接到本 MikroTik 路由器。将随附的电源连接到 PoE 供电器。
- 无线 AP 模式默认已启用，您可以从计算机连接到以 "MikroTik" 开头的 SSID。可通过 Web 浏览器访问配置界面。地址为 [https://192.168.88.1](https://192.168.88.1)。
- 连接到无线网络，在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 以开始配置。
- 用户名：a*dmin*，默认没有密码，您将自动登录到 Quick Set 界面（或者，对于某些型号，请在贴纸上查看用户名和无线密码）。
- 选择右侧的 "Check for updates" 按钮，并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。必须插入有效的 SIM 卡。
- 要个性化您的无线网络，可在 "Network Name" 字段中更改 SSID；
- 在屏幕左侧的 "Country" 字段中选择您所在的国家/地区，以应用国家/地区法规设置。
- 在 "WiFi Password" 字段中设置您的无线网络密码，密码长度必须至少为八个字符。
- 在右侧底部的 "Password" 字段中设置您的路由器密码，并在 "Confirm Password" 字段中重复输入，该密码将在下次登录时使用。
- 选择 "Apply Configuration" 以保存更改。
- 如果没有可用的互联网连接，可手动更新设备。
- 从 [https://mikrotik.com/download](https://mikrotik.com/download) 下载最新的 RouterOS 软件。
- 选择 MIPSBE 软件包，并将其保存到您的 PC。
- 再次连接，并在 **Files** 菜单中上传已下载的软件包。
- 重启设备。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描 QR 码并选择您首选的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名将已填写。
- 选择 Connect，通过无线网络与您的设备建立连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 供电 {#powering}

**PoE 输入**

以太网端口接受 9-30 V 无源 PoE 供电。包装盒内包含一个 24 V 适配器和一个 PoE 供电器。将随附的 PoE 供电器插入您将在 LAN 中使用的路由器的第一个端口或 internet 端口（或直接插入您的笔记本电脑），并将以太网电缆连接到 PoE 供电器。将此以太网电缆的另一端连接到 wAP LTE 设备。将电源连接到 PoE 供电器

**电源插孔**

DC 插孔（外径 5.5 mm，内径 2 mm，母头，中心正极插头）支持 9-30 V 供电，设备随附一个 24 V 1.2 A 电源适配器

**汽车连接器**

汽车连接器可用于从汽车和公交车中常见的 12/24 V 连接为设备供电。该插头有四个引脚：左下（黑色）为接地，右下为电源输入（红色）。上面两个引脚保留供将来使用。24 V 时的最大功耗在无 miniPCIe 时为 6 W，在 miniPCIe 卡满载时为 8 W。

## 安装 {#mounting}

本设备可以通过多种方式安装：立杆、墙壁、天花板，或者可以放置在包装内随附的专门设计的 MikroTik 支架中。包装内还包含一个钻孔模板和详细的安装说明，以帮助您安装以太网电缆并将其固定到天花板或墙壁上。用于放置在吊顶板另一侧的钢制支架以及两颗螺丝和墙锚。用于安装在立杆上的扎带或钢制卡箍。本设备的 IP 防护等级为 IP54。在室外安装时，请确保任何电缆开口朝下。您应使用 POE 供电器和带有 Cat6 屏蔽电缆的正确接地。使用和安装本设备时，请注意最大允许暴露量（MPE）安全距离，辐射体与您身体之间的距离至少为 35 cm。**安装在立柱或立杆上：**

![](/img/b21639053eb61552.webp)

**建议使用电工胶带以增加材料之间的摩擦力。*

- 将塑料扎带穿过孔洞安装到钢制支架上。
- 将支架安装到设备上。
- 用螺丝固定。
- 将设备安装到立杆或立柱上并对齐。
- 将以太网电缆穿过开口并连接到以太网端口。
- 关闭底部锁扣并用螺丝固定。

建议使用扎带将以太网电缆固定到立杆上。与设备的距离约为 38 cm。

![](/img/42ebcb18fdb0e686.webp)

**将设备安装在墙上：**

- 使用随附的模板标记钻孔位置。如有需要，也标记以太网电缆的位置。请相应地对齐，这将取决于设备最终安装的方式。
- 如有需要，插入膨胀管，这取决于墙体结构和材料。
- 将随附的钢制支架放在墙上。
- 使用螺丝将其固定在相应位置。
- 将您的以太网电缆从开口处伸出并连接到以太网端口。
- 将设备安装到钢制支架上
- 用螺丝将其固定到位。
- 关闭底部锁扣。

避免将设备安装在低洼位置，否则您将无法安装并关闭底部锁扣。**安装在天花板上：**

![](/img/35cd19164cabfd89.webp)

包装内随附一个专用支架，用于安装在吊顶上。由于它由两部分组成，需要固定在天花板板的两侧。

-

使用模板标记孔的位置。

-

将两个安装支架放在相应位置。

-

使用螺丝将它们固定在一起。如果安装在墙上，请以相同方式继续组装。

-

将您的以太网电缆从开口处伸出并连接到以太网端口。

-

将设备安装到钢制支架上。

-

用螺丝将其固定到位。

-

关闭底部锁扣。150

## 底部盖板 {#bottom-lid}

- 底部盖板通过松不脱螺丝固定到位。
- 使用 Philips PH2 螺丝刀将其拧松，但不要完全拆下螺丝。

![](/img/b67c9df3c35b1165.webp)

- 朝与设备相反的方向拉动盖板以将其取下。

![](/img/0430222d528f3356.webp)

- 重新组装。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 内置 2 GHz 无线接入点模块，支持 AP/station/bridge/p2p 模式。
- 一个 10/100 以太网端口，支持自动交叉/直通电缆纠正（Auto MDI/X）。直通或交叉电缆均可用于连接其他网络设备。以太网端口接受来自无源 PoE 供电器的 9-30 VDC 供电。
- miniPCIe 插槽和 SIM 插槽（不能单独使用），用于配合 3G/4G/LTE 调制解调器使用（某些套件已包含）。

## miniPCIe 插槽的使用 {#minipcie-slot-usage}

本设备配备一个 miniPCIe 插槽（也提供预装调制解调器的套件），用于配合 3G/4G/LTE 调制解调器使用。提供一个 SIM 插槽，与 miniPCIe 调制解调器配合使用。SIM 插槽不能单独使用。要安装 miniPCIe 模块，请拆下电源插孔下方的两颗螺丝，并将 wAP PCB 板滑出。插入 miniPCIe 调制解调器，并用已就位的两颗 Philips 螺丝固定。将灰色 uFL 连接器连接到调制解调器的 MAIN 天线连接器，将黑色电缆连接到另一个（或 AUX）连接器。可以为调制解调器使用外置天线，复位按钮旁边提供了两个 SMA 安装孔；或者如果您希望将天线直接安装到外壳上，可先拆下两个塑料孔盖，然后将 SMA 天线安装在外壳底部。在将 wAP 板重新插入外壳并用之前拆下的螺丝固定后，将移动运营商的 SIM 卡芯片朝上滑入 SIM 插槽。该插槽接受 miniSIM（2FF）。SIM 插槽通过塑料卡扣防止 SIM 卡掉落。您可以按下卡扣，然后使用镊子或类似工具将 SIM 卡拔出。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复很有用。

## 配置 {#configuration}

您应选择 "Check for updates" 按钮并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议您访问 RouterOS 文档页面以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧通过设备的 MAC 地址进行连接（默认情况下，来自 internet 端口的所有访问均被阻止）。可以从网络引导设备，以便出于恢复目的重新安装 RouterOS。这可以通过第一个以太网端口完成。请参阅上文了解如何操作。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及更高版本。具体的出厂预装版本列在 /system resource 中。其他操作系统尚未经过测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备工作在高于上述法规的频率范围，则需要将制造商/供应商提供的定制固件版本应用于最终用户设备，并防止最终用户重新配置。
- 室外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据表均可在制造商官方网站上获取。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，发射功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，发射功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，发射功率限制为 20dBm（EIRP）。

请确保设备具有锁定包（来自制造商的固件版本），需要将其应用于最终用户设备以防止最终用户重新配置。产品将标有国家/地区代码 "-EG"。本设备需要升级到最新版本，以确保符合当地主管部门的法规要求！最终用户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员进行安装。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置点处置。请熟悉您所在地区将设备正确运输到指定处置点的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装环境中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备可能会造成有害干扰，在这种情况下，用户将需要自费纠正干扰

FCC 警告：任何未经负责合规的一方明确批准的更改或修改，都可能导致用户操作本设备的权限失效。本设备符合 FCC 规则第 15 部分。其操作须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受所接收的任何干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或协同操作。

**重要提示：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备的安装和运行位置与辐射体到您身体任何部位的距离至少为 38 cm。

<table><thead><tr><th>**型号**</th><th>**FCC ID**</th><th>**包含 FCC ID**</th></tr></thead><tbody><tr><td>wAP LTE kit</td><td>TV7WAPR2ND</td><td>TV7R11ELTE</td></tr><tr><td>wAP 4G kit</td><td>TV7WAPR2ND</td><td>TV7R11E4G</td></tr></tbody></table>

*使用 CBRS 频段时，最终主机设备的 CBSD 类别将取决于所使用的功率设置和天线增益。*

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。其操作须满足以下两个条件：

-

本设备不得造成干扰；

-

本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。L'émetteur/récepteur exempt de licence contenu dans le présent appareil est conforme aux CNR d'Innovation, Sciences et Développement économique Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes:

-

本设备不得产生干扰；

-

L'appareil doit accepter tout brouillage radioélectrique subi, mźme si le brouillage est. 本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

**重要提示：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行位置与辐射体到您身体任何部位的距离至少为 38 cm。Cet equipement est conforme aux limites d'exposition au rayonnement IC definies pour un environnement non controle. Cet equipement doit etre installe et utilise a une distance minimale de 38 cm entre le radiateur et toute partie de votre corps.

<table><thead><tr><th>**型号**</th><th>**IC**</th><th>**包含 IC**</th></tr></thead><tbody><tr><td>wAP LTE kit</td><td>7442A-WAPR2ND</td><td>TV7R11ELTE</td></tr><tr><td>wAP 4G kit</td><td>7442A-WAPR2ND</td><td>7442A-R11E4G</td></tr></tbody></table>

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный каналы</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>2400-2483.5 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备生产日期信息标注在其标签上的序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后面两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 МГц（20 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需要按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WLAN/ GSM / WCDMA / LTE / {#wlan-gsm--wcdma--lte-}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>WLAN</th><th>2400-2483.5 MHz / / 20 dBm</th></tr></thead><tbody><tr><td>E-GSM-900</td><td>900 MHz / 33 dBm</td><td></td></tr><tr><td>DCS-1800</td><td>1800 MHz / 30 dBm</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1（4G kit 除外）</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8（4G kit 除外）</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 31（仅 4G kit）</td><td>450 MHz / 23 dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 42（仅 4G kit）</td><td>3500 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 43（仅 4G kit）</td><td>3700 MHz / 23dBm ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。更多详细信息请参阅上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。更多详细信息请参阅上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。更多详细信息请参阅上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。更多详细信息请参阅上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。更多详细信息请参阅上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。更多详细信息请参阅上方的符合性声明。
