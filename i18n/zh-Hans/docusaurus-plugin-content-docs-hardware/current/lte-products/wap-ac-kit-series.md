---
title: "wAP ac kit 系列"
slug: /wap-ac-kit-series
source: https://manual.mikrotik.com/hardware/wap-ac-kit-series
captured_at: '2026-11-04T10:06:45+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **wAP ac LTE kit**
- **wAP ac 4G kit**
- **wAP ac LTE6 kit**

:::

本设备需要升级到 RouterOS v6.46 或最新版本，以确保符合当地主管部门的规定。

客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

![](/img/6ee4c755ff10151e.webp)

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 在任意墙面安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家电气规范。
- 本产品设计用于室外立杆安装，但也可以室内安装。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的程序，可能会给人员带来危险并损坏系统。
- 仅使用制造商认可的电源和附件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用本设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或普通公众的距离不得小于 45 厘米。

## 快速开始 {#quickstart}

- 使用十字螺丝刀拧松固定底盖的螺丝（参见 ）。
- 将 micro SIM 卡插入卡槽；
- 选择合适的供电方式，有关可能性请参阅相关章节。
- 在您的 PC 上打开网络连接，搜索以 "MikroTik" 开头的 SSID。
- 在计算机上进入网络连接部分，找到名为 "*MikroTik-...*" 的无线网络。继续连接它（请查看贴纸上的无线密码）；
- 配置应通过无线网络使用移动应用程序完成，或者您也可以使用 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 下载并打开 **WinBox**，选择 **Neighbors** 选项卡以查找设备；
- 选择 MAC 地址。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问产品页面 [https://mikrotik.com/products](https://mikrotik.com/products) 查找您的产品。所需的软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 **WinBox** 的 **Files** 菜单，然后重启设备。通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 **QuickSet** 菜单中设置以下内容：选择您的国家，以应用国家法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开该应用程序。
- 默认情况下，IP 地址和用户名已预先填入。
- 选择 Connect 以通过无线网络与您的设备建立连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 还提供高级菜单，可完整配置所有必要设置。

## 供电 {#powering}

本设备可通过电源插孔或以太网端口供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）支持 12-57 V ⎓ DC；
- 以太网端口支持 802.3af/at PoE 18-57 V ⎓ DC。最大负载下的功耗可达 16 W。将接地线连接到固定底盖的螺丝上。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将以太网线从设备连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 安装 {#mounting}

本设备可通过多种方式安装：立杆、墙壁、天花板，或者可以放置在包装内附带的设计专用 MikroTik 支架中。包装中还包含带有详细安装说明的钻孔模板，帮助您完成以太网线安装以及固定到天花板或墙壁上。用于放置在天花板吊顶板另一侧的钢制支架，以及两颗螺丝和墙塞。用于立杆安装的扎带或钢制卡箍。本设备的 IP 等级为 IP54。在室外安装时，请确保所有线缆开口朝下。您应使用 POE 注入器和带有 Cat6 屏蔽线缆的适当接地。使用和安装本设备时，请注意最大允许暴露量（MPE）安全距离，辐射体与身体之间至少保持 35 cm。**安装在桅杆或立杆上：**

![](/img/b21639053eb61552.webp)

** 建议使用电工胶带以增加材料之间的摩擦力。*

- 将塑料扎带穿过孔洞固定到钢制支架上。
- 将支架安装到设备上。
- 用螺丝将其固定。
- 将设备安装并对准到立杆或桅杆上。
- 将以太网线穿过开口并连接到以太网端口。
- 合上底部卡扣并用螺丝固定。建议使用扎带将以太网线固定到立杆上，与设备的距离约为 30 cm。

![](/img/42ebcb18fdb0e686.webp)

**将设备安装到墙壁上：**

- 使用随附的模板标记钻孔位置。如需要，也可标记以太网线的位置。请相应地对齐，这取决于设备最终将如何安装。
- 如有需要，插入膨胀螺栓，这取决于墙体结构和材质。
- 将随附的钢制支架放置在墙上。
- 用螺丝将其固定到位。
- 将您的以太网线穿过开口并连接到以太网端口。
- 将设备安装到钢制支架上
- 用螺丝将其固定到位。
- 合上底部卡扣。

避免将设备安装在低洼位置，否则您将无法安装并合上底部卡扣。**安装到天花板上：**

![](/img/35cd19164cabfd89.webp)

包装中附带一个专用支架，用于安装在吊顶上。由于它由两部分组成，需要固定在天花板吊顶板的两侧。

-

使用模板标记孔洞位置。

-

将两个安装支架放置到位。

-

用螺丝将它们固定在一起。如果安装到墙壁上，请以相同方式继续组装。

-

将您的以太网线穿过开口并连接到以太网端口。

-

将设备安装到钢制支架上。

-

用螺丝将其固定到位。

-

合上底部卡扣。

## 底盖 {#bottom-lid}

- 底盖通过防脱螺丝固定到位。
- 使用 Philips PH2 螺丝刀将其拧松，但不要完全卸下螺丝。

![](/img/b67c9df3c35b1165.webp)

- 将盖板朝背离设备的方向拉动以将其拆下。

![](/img/0430222d528f3356.webp)

- 重新组装。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 集成两个无线模块，分别工作在 2.4 GHz 和 5 GHz，支持 AP/CPE/P2P/中继模式。
- 两个千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。直通线或交叉线均可用于连接到其他网络设备。
- miniPCIe 插槽和 SIM 插槽（不能单独使用），用于配合调制解调器使用。

## MiniPCIe 插槽使用 {#minipcie-slot-usage}

本设备配备 miniPCIe 插槽，出厂已预装 LTE6、LTE 或 4G 卡。还提供 SIM 插槽，用于配合 miniPCIe 调制解调器使用。SIM 插槽不能单独使用。此外，您可以安装自己选择的外置天线，这应由具备资质的人员完成，操作电气设备时请遵循安全预防措施，拆封和处理电气部件时请佩戴腕部接地带，以避免静电放电（ESD）损坏。安装外置天线：

-

使用 Philips PH2 螺丝刀卸下螺丝，并向下滑动底盖将其拆下；

-

卸下电源插孔下方的两颗螺丝，并滑出 wAP PCB 板；

![](/img/84e975dda87c27e6.webp)

-

从调制解调器的 MAIN 天线接口上断开灰色 uFL 接头，从另一个（或 AUX）接口上断开黑色线缆；

-

使用一字螺丝刀或类似工具拆下两个塑料盖，将天线线缆穿过孔洞并连接到已安装的 LTE6 卡上；

-

之后将 wAP 板重新插回外壳，并用之前卸下的螺丝固定；

-

将移动运营商的 SIM 卡插入 SIM 插槽，芯片朝上。

-

SIM 插槽通过塑料卡扣防止 SIM 卡掉出。您可以将卡扣按向左侧以解锁，然后插入或更换 SIM 卡，可使用镊子或类似工具。使用外置天线时，将接头安装到外壳上：

-

开孔并使用 6.5 mm 钻头，在四个预设位置中的任意一个钻孔；

![](/img/87aafcea8aa9d40e.webp)

-

引导您的 ACSMAUFL 接头并将其固定到位，有关如何放置橡胶密封圈以获得最佳防水保护的参考，请见下图：

![](/img/03bc306812c7acce.webp)

## SIM 插槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议配合转接卡使用。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备随后将查找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电前按下按钮，系统将加载备用的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复非常有用。

## 配置 {#configuration}

您应点击 "Check for updates" 按钮，并将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议您访问 RouterOS 文档页面，熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧通过设备的 MAC 地址进行连接（默认情况下，来自互联网端口的所有访问均被阻止）。可以从网络引导设备，以便为恢复目的重新安装 RouterOS。这可以通过第一个以太网端口完成。具体方法请见上文。

## 配件 {#accessories}

包装中包括以下随设备附带的附件：

![](/img/3ce6215e631f2406.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS 6 和 7 版本。具体的出厂预装版本号显示在 RouterOS 的 `/system resource` 菜单中。其他操作系统未经测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备工作的频段与上述规定不同，则需要对最终用户设备应用来自制造商/供应商的定制固件版本，并且还要防止最终用户重新配置。
- 室外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据手册均可在制造商官方网站上获取。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，发射功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，发射功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，发射功率限制为 20dBm（EIRP）。

确保设备具有锁定软件包（来自制造商的固件版本），需要将其应用到最终用户设备上，以防止最终用户重新配置。产品将标有国家代码 "-EG"。本设备需要升级到最新版本，以确保符合当地主管部门的规定！最终用户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>**型号**</th><th>**FCC ID**</th><th>**包含 FCC ID**</th></tr></thead><tbody><tr><td>wAP ac LTE6 kit</td><td>TV7WAPGR5AC2D</td><td>TV7R11ELTE6</td></tr><tr><td>wAP ac LTE kit</td><td>TV7WAPGR5AC2D</td><td>TV7R11ELTE</td></tr><tr><td>wAP ac 4G kit</td><td>TV7WAPGR5AC2D</td><td>TV7R11E4G</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装提供合理的保护，防止有害干扰。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），建议用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。**FCC 警告：** 未经合规负责方明确批准的任何更改或修改，都可能导致用户无权操作本设备。本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共址或协同运行。**重要：** 射频辐射暴露。本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备的安装和运行位置与您身体任何部位之间的距离应至少为 45 cm。

*使用 CBRS 频段时，最终主设备的 CBSD 类别将取决于所使用的功率设置和天线增益。*

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>**型号**</th><th>**IC**</th><th>**包含 IC**</th></tr></thead><tbody><tr><td>wAP ac LTE6 kit</td><td>7442A-WAPGR5AC2D</td><td>7442A-R11ELTE6</td></tr><tr><td>wAP ac LTE kit</td><td>7442A-WAPGR5AC2D</td><td>7442A-R11ELTE</td></tr><tr><td>wAP ac 4G kit</td><td>TV7WAPGR5AC2D</td><td>TV7R11E4G</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 标准的免许可发射器/接收器。操作须符合以下两个条件：

-

本设备不得造成干扰；

-

本设备必须接受任何干扰，包括可能导致设备运行异常的干扰。L'émetteur/récepteur exempt de licence contenu dans le présent appareil est conforme aux CNR d'Innovation, Sciences et Développement économique Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes:

-

本设备不得产生干扰；

-

L'appareil doit accepter tout brouillage radioélectrique subi, mźme si le brouillage est. 本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行位置与您身体任何部位之间的距离应至少为 45 cm。Cet equipement est conforme aux limites d'exposition au rayonnement IC definies pour un environnement non controle. Cet equipement doit etre installe et utilise a une distance minimale de 45 cm entre le radiateur et toute partie de votre corps.

在 5150–5250 MHz 频段内运行的设备仅限室内使用，以减少对同频道移动卫星系统造成有害干扰的可能性。les dispositifs fonctionnant dans la bande de 5150 ą 5250 MHz sont réservés uniquement pour une utilisation ą l'intérieur afin de réduire les risques de brouillage préjudiciable aux systčmes de satellites mobiles utilisant les mźmes canaux.

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而异。

有关设备制造日期的信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 МГц (20 дБм)、5150-5250 МГц (23 дБм)、5250-5350 МГц (20 дБм)、5470-5725 МГц (27 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用须按照 NKРЗІ 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

Mikrotīkls SIA 特此声明，无线电设备类型 RouterBOARD 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/product/wap_ac_lte_kit](https://mikrotik.com/product/wap_ac_lte_kit)

### WLAN / WCDMA / LTE / 5G {#wlan--wcdma--lte--5g}

<table><thead><tr><th>工作频率 / 最大输出功率 Betriebsfrequenz / maximale Ausgangsleistung Fréquence de fonctionnement / puissance de sortie maximale Frequenza operativa / massima potenza di uscita Frecuencia de funcionamiento / potencia de salida máxima Рабочая частота / максимальная выходная мощность</th><th>WLAN</th><th>2400-2483.5 MHz / 20 dBm</th></tr></thead><tbody><tr><td>5150-5250 MHz / 23 dBm</td><td></td><td></td></tr><tr><td>5250-5350 MHz / 20 dBm</td><td></td><td></td></tr><tr><td>5470-5725 MHz / 27 dBm</td><td></td><td></td></tr><tr><td>E-GSM-900（4G kit 除外）</td><td>900 MHz / 33 dBm ± 3 dB</td><td></td></tr><tr><td>DCS-1800（4G kit 除外）</td><td>1800 MHz 30 dBm ± 3 dB</td><td></td></tr><tr><td>WCDMA Band I（4G kit 除外）</td><td>1922.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII（4G kit 除外）</td><td>882.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1（4G kit 除外）</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8（4G kit 除外）</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 31（仅 4G kit）</td><td>450 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38（4G kit 除外）</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40（4G kit 除外）</td><td>2300 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 41（仅 4G kit）</td><td>2500 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 42（仅 4G kit）</td><td>3500 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 43（仅 4G kit）</td><td>3700 MHz / 23dBm ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。更多详细信息请参见上方的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen WLAN- und LTE-Sendeleistung Grenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben unter Konformitätserklärung / Cet appareil MikroTik respecte les limites maximales de puissance de transmission WLAN et LTE conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti massimi di potenza di trasmissione WLAN e LTE in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia de transmisión WLAN y LTE de acuerdo con las regulaciones ETSI. Para obtener más información, consulte la declaración de conformidad anterior / Это устройство MikroTik соответствует максимальным пределам мощности передачи WLAN и LTE в соответствии с правилами ETSI. Для получения дополнительной информации см. Декларацию соответствия выше.

![](/img/0561b3ba8c95a35c.webp)

本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。/ Die WLAN-Funktion dieses Geräts ist nur für die Verwendung in Innenräumen im Frequenzbereich 5150 bis 5350 MHz beschränkt. / La fonction WLAN de cet appareil est limitée à une utilisation en intérieur uniquement lorsqu'il fonctionne dans la gamme de fréquences 5150 à 5350 MHz. / La funzione WLAN per questo dispositivo è limitata all'uso interno solo quando si opera nella gamma di frequenza da 5150 a 5350 MHz. / La función WLAN para este dispositivo está restringida al uso en interiores solo cuando se opera en el rango de frecuencia de 5150 a 5350 MHz. / Функция WLAN для этого устройства ограничена использованием внутри помещения только при работе в диапазоне частот от 5150 до 5350 МГц.
