---
title: "wAP 60G 系列"
slug: /wap-60g-series
source: https://manual.mikrotik.com/hardware/wap-60g-series
captured_at: '2026-11-04T10:06:34+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可以下载为 <a href="/assets/files/wap-60g-series-9b51ea18dc11beafdef583ebaff01300.pdf" target="_blank" rel="noopener">PDF 文件</a>。

:::info 本文涵盖

- **[Wireless Wire](https://mikrotik.com/product/wireless_wire)** (RBwAPG-60adkit)
- **[wAP 60G](https://mikrotik.com/product/wap_60g)** (RBwAPG-60ad)
- **[wAP 60G AP](https://mikrotik.com/product/wap_60g_ap)** (RBwAPG-60ad-A)
- **wAP 60Gx3 AP** (RBwAPG-60ad-SA)

:::

wAP60G 设备工作在 60GHz 无线频段，这些设备的工作温度范围为 -40°C 至 +70°C。设备配有千兆以太网端口，可通过电源插孔或以太网供电。设备可以安全地安装在墙壁、天花板或立柱/桅杆上。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 在任意墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适合安装在户外立柱上，但也可以在室内安装。开始安装前请仔细阅读安装说明。使用错误的硬件和配置或未遵循正确的操作步骤，可能会导致人员危险和系统损坏。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因设备使用不当而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座上拔下电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备都必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能会造成无线电干扰，在这种情况下，用户可能需要采取适当的措施。

## 快速开始 {#quickstart}

- 使用以太网线将设备连接到随附的 PoE 注入器的数据+电源端；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 下载 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 默认 IP：192.168.88.1，用户名：**admin**，没有密码，请在标签上查找密码；
- 将您计算机的 IP 地址设置为 192.168.88.2；
- 如果 IP 连接不可用，请使用 Neighbors 选项卡并通过 MAC 地址连接；
- 连接后配置设备，使其具有有效的互联网连接 [https://mt.lv/configuration](https://mt.lv/configuration)；
- 将 RouterOS 软件升级到最新版本 [https://mt.lv/upgrade](https://mt.lv/upgrade)；
- 选择您所在的国家，以应用国家法规设置；
- 根据使用类型将 *Installation* 设置为室内或室外；
- 保护您的设备并设置强密码；
- 有关更多配置信息，请访问 [W60G 接口手册](/docs/wireless/w60g)；
- wAP60G AP 设备预配置为 WISP Bridge 默认配置；
- Wireless Wire 和 wAP60G 设备预配置为 PTP Bridge 默认配置；
- Wireless Wire 设备已随机生成匹配的 SSID 和无线密码。

## 供电 {#powering}

这些设备既可以通过电源适配器供电，也可以通过以太网端口供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，正极插针）接受 12-57 V DC。
- 以太网端口接受 PoE 输入 12-57 V DC（无源和 802.3af/at）。包装盒内包含电源适配器和无源 PoE 注入器。如果使用 PoE 注入器，请确保使用 "Power + Data" 连接器连接 wAP60G 设备，使用 "Data" 连接器连接路由器或交换机。

## 配置与连接 {#configuration-and-connecting}

完整的 RouterOS 文档位于此处：[https://mt.lv/help](https://mt.lv/help) 具体的 wAP 60G 配置可在 [W60G 接口手册](/docs/wireless/w60g) 中找到。通过连接以太网端口访问设备，然后使用 MikroTik WinBox 实用程序进行连接。出于恢复目的，可以从网络引导设备，请参阅相应章节。如果 IP 连接不可用，也可以使用 WinBox 实用程序连接到设备的 MAC 地址。

## 安装 {#mounting}

**安装在桅杆或立柱上：**

![](/img/cbb89d9ff7c5f201.jpg)

**建议使用电工胶带以增加材料之间的摩擦力。**

- 将塑料扎带穿过孔洞固定到钢制支架上。
- 将支架安装到设备上。
- 用螺丝固定。
- 将设备安装并校准到立柱或桅杆上。
- 将以太网线穿过开口并连接到以太网端口。
- 关闭底部锁扣并用螺丝固定。建议使用扎带将以太网线固定到立柱上。与设备的距离约为 30 cm。

![](/img/42ebcb18fdb0e686.webp)

**将设备安装在墙上：**

- 使用随附的模板标记钻孔位置。如有需要，也标记以太网线孔位。请相应校准，这将取决于设备最终如何安装。
- 如有需要，插入膨胀螺栓，这取决于墙体结构和材质。
- 将随附的钢制支架放置在墙上。
- 使用螺丝将其固定到位。
- 将您的以太网线穿过开口并连接到以太网端口。
- 将设备安装到钢制支架上
- 用螺丝将其固定到位。
- 关闭底部锁扣。

避免将设备安装在低洼处，因为您将无法安装和关闭底部锁扣。

**安装在天花板上：**

![](/img/35cd19164cabfd89.webp)

包装中包含一个专用支架，用于安装在天花板上。由于它由两部分组成，需要固定在天花板吊顶板的两侧。

-

使用模板标记孔位。

-

将两个安装支架放置在标记位置。

-

使用螺丝将它们固定在一起。如果安装在墙上，请以相同方式继续组装。

-

将您的以太网线穿过开口并连接到以太网端口。

-

将设备安装到钢制支架上。

-

用螺丝将其固定到位。

-

关闭底部锁扣。

## 底盖 {#bottom-lid}

- 底盖由防脱落螺丝固定到位。
- 使用 Philips PH2 螺丝刀将其拧松，但不要完全拧下螺丝。

![](/img/b67c9df3c35b1165.webp)

- 朝远离设备的方向拉动盖子以将其取下。

![](/img/0430222d528f3356.webp)

- 重新组装。

## 按钮和跳线 {#buttons-and-jumpers}

routerBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，以将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，以清除所有配置并恢复默认值。
- 当 LED 不再亮起（约 20 秒）后松开按钮，使设备查找 Netinstall 服务器（通过网络安全重装 RouterOS 所需）。无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都会加载备用 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 随附物品 {#included-items}

![](/img/fea8eac2c986b2cc.webp)

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列在 /system resource 中。其他操作系统尚未经过测试。

## 说明 {#notes}

本设备符合 ETSI 法规规定的最大发射功率限制。60 GHz 频段的工作模式：58.32 GHz、60.48 GHz、62.64 GHz。本设备已通过认证，可用于户外的点对多点应用。在以下国家/地区，本设备不能用于固定点对点应用：

![](/img/01438e2d9209ce7d.webp)

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBwAPG-60adkit</td><td>TV7WAPG60AD</td></tr><tr><td>RBwAPG-60ad</td><td>TV7WAPG60AD</td></tr><tr><td>RBwAPG-60ad-A</td><td>TV7WAPG60AD</td></tr><tr><td>RBwAPG-60ad-SA</td><td>TV7WAPG60ADM</td></tr></tbody></table>

根据 FCC 规则第 15 部分，本设备已经过测试，符合 A 类数字设备的限制。这些限制旨在为商业安装中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备可能会造成有害干扰，在这种情况下，用户需要自费纠正干扰。

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能使用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不会造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

注意：本设备在外围设备上使用屏蔽电缆进行了测试。必须使用屏蔽电缆与本设备配合以确保合规。

除 FCC CFR §15.255 (b) 中列出的情况外，本设备不得在飞机上操作。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限制。本设备安装和操作时，辐射体与您身体的任何部位之间的最小距离应为 20 cm。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBwAPG-60adkit</td><td>7442A-WAPG60AD</td></tr><tr><td>RBwAPG-60ad</td><td>7442A-WAPG60AD</td></tr><tr><td>RBwAPG-60ad-A</td><td>7442A-WAPG60AD</td></tr><tr><td>RBwAPG-60ad-SA</td><td>7442A-WAPG60ADM</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限制。本设备安装和操作时，辐射体与您身体的任何部位之间的最小距离应为 20 cm。Cet equipement est conforme aux limites d'exposition au rayonnement IC definies pour un environnement non controle. Cet equipement doit etre installe et utilise a une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

除 ISED RSS-210 附录 J.1 中列出的情况外，本设备不得在飞机上操作。

本设备不得在飞机上使用，除非符合 ISED RSS-210 附录 J.1 中所列的条件。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

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

## 乌克兰国家通信和信息国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WiGig {#wigig}

<table><thead><tr><th>Operational channels / Maximum output power Betriebskanäle / maximale Ausgangsleistung Canaux opérationnels / puissance de sortie maximale Canali operativi / massima potenza di uscita Canales operacionales / potencia de salida máxima Операционные каналы / максимальная выходная мощность</th><th>58.32 GHz / 40 dBm</th></tr></thead><tbody><tr><td>60.48 GHz / 40 dBm</td><td></td></tr><tr><td>62.64 GHz / 40 dBm</td><td></td></tr></tbody></table>
