---
title: "wAP LR9 套件"
slug: /wap-lr9-kit
source: https://manual.mikrotik.com/hardware/wap-lr9-kit
captured_at: '2026-11-04T10:07:31+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/wap-lr9-kit-122ca84be22e5dcfa960c751ce766fdb.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/bb08cf678e80bbc2.webp)

### [wAP LR9 kit](https://mikrotik.com/product/wap_lr9_kit) (RBwAPR-2nD&R11e-LR9) {#wap-lr9-kit-rbwapr-2ndr11e-lr9}

wAP 是一款小型防风雨设备，内置 LR9 卡，可将 UDP 数据包转发到所选服务器。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 在任意墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品预期安装在室外的立柱上，但也可在室内安装。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确步骤，可能导致人员处于危险境地并对系统造成损坏。
- 仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。
- 这是 A 类设备。在居住环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。安装和操作本 MikroTik 设备时，其与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

- 请确保您的 ISP 允许更换硬件，并会自动分配 IP 地址。
- 打开底部盖子。
- 将外部天线连接到 SMA 接头。
- 将设备连接到电源。
- 使用您的设备连接到 MikroTik 无线网络
- 配置必须通过无线网络使用 Web 浏览器或移动应用完成。或者，您可以使用 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。默认情况下，以太网端口访问被防火墙阻止。
- 连接到无线网络后，在 Web 浏览器中打开 192.168.88.1 以开始配置。
- 用户名：a*dmin*，默认没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）。
- 使用移动应用时，请选择 Quick setup，它将在六个简单步骤中引导您完成所有必要的配置。
- 在产品内部的标签上找到您的 LR 网关 ID，并将其注册到您的 Network Server 中。
- 使设备连接到 LR Network Server。
- 点击 "Check for updates" 按钮并将您的 RouterOS 软件更新到最新版本，设备需要有可用的互联网连接。
- 更新后设置您的国家/地区，以应用国家/地区法规设置。
- 设置您的 WiFi 密码。
- 设置路由器密码。
- 产品的核心功能需要以下 RouterOS "npk" 软件包：lora、system。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/bb08cf678e80bbc2.webp)

- 10/100 以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X）。可使用直通线或交叉线连接到其他网络设备。
- 外部 SMA 天线接头，已连接到 LR 卡。
- 指示设备电源状态的 LED。
- 指示无线网络活动的 LED。
- 汽车连接器。引脚定义：A - 保留供将来使用（橙色），B - 保留供将来使用（蓝色），C - 接地（黑色），D – 电源输入（红色）。
- 带集成 LR9 卡的 MiniPCIe 插槽。
- 集成无线模块，工作于 2.4 GHz，802.11b/g/n 协议。
- SIM 插槽。

## 供电 {#powering}

本设备可通过以下方式供电：

- 以太网端口接受被动 PoE 9-30 V DC ⎓。
- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心针为正极）接受 9-30 V DC⎓。
- 汽车连接器 9-30 V DC⎓。最大负载下的功耗可达 7 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 安装 {#mounting}

设备可以通过多种方式安装：立柱、墙面、天花板，也可以放置在包装内附带的专用 MikroTik 支架中。包装内还包含带有详细安装说明的钻孔模板，帮助您安装以太网线并将其固定到天花板或墙面上。钢制支架用于放在吊顶板另一侧，另配有两颗螺丝和墙锚。用于立柱安装的扎带或钢卡箍。

本设备的 IP 防护等级为 IP54。在室外安装时，请确保所有线缆开口朝下。我们建议使用 POE 注入器和 Cat6 屏蔽线缆进行正确接地。使用和安装本设备时，请注意最大允许暴露量（MPE）安全距离，辐射体与您的身体之间至少保持 20 cm。

安装在桅杆或立柱上：

建议使用电工胶带以增加材料之间的摩擦力。

![](/img/b21639053eb61552.webp)

- 将塑料扎带穿过孔洞安装到钢制支架上。
- 将支架安装到设备上。
- 用螺丝固定。
- 将设备安装并调整到立柱或桅杆上。
- 将以太网线穿过开口并连接到以太网端口。
- 关闭底部卡扣并用螺丝固定。

建议使用扎带将以太网线固定到立柱上。与设备的距离约为 30 cm。

将设备安装在墙面上：

![](/img/42ebcb18fdb0e686.webp)

- 使用随附的模板标记钻孔位置。如有需要，也标记以太网线的位置。相应地进行对齐，这取决于设备最终如何安装。
- 如有需要，插入膨胀螺栓，这取决于墙体结构和材质。
- 将随附的钢制支架放置在墙面上。
- 用螺丝将其固定到位。
- 将以太网线穿过开口并连接到以太网端口。
- 将设备安装到钢制支架上
- 用螺丝将其固定到位。
- 关闭底部卡扣。

避免将设备安装在低洼处，否则您将无法安装并关闭底部卡扣。

安装到天花板上：

![](/img/35cd19164cabfd89.webp)

包装内附带一个专用支架，用于安装在吊顶上。由于它由两部分组成，需要分别固定在天花板板的两侧。

-

使用模板标记孔位。

-

将两个安装支架放置在标记位置。

-

用螺丝将它们固定在一起。

-

如果安装在墙面上，请按相同方式继续组装。

-

将以太网线穿过开口并连接到以太网端口。

-

将设备安装到钢制支架上。

-

用螺丝将其固定到位。

-

关闭底部卡扣。

## 底盖 {#bottom-lid}

- 底盖由不脱出螺丝固定到位。

![](/img/0d1777eb306bd477.webp)

- 使用 Torx T20 螺丝刀将其拧松，但不要完全取下螺丝。

![](/img/fda7738b33a2c690.webp)

- 朝与设备相反的方向拉动盖板以将其取下。

![](/img/d57e2bacdcc55d28.webp)

- 重新组装。

## 配置 {#configuration}

要设置 LR 的配置，请连接到设备并通过 Web 浏览器登录，或使用移动应用。需遵循两个简单步骤：**第一步：**

-

登录后，将默认选中 Quick Set，请切换到屏幕右侧的 WebFig。如果通过移动应用进行配置，请点击屏幕右侧的齿轮图标以打开高级菜单。

-

在左侧菜单中，找到并选择 "Lora" 部分。

-

在新打开的窗口中选择 Servers 选项卡。

-

点击 + 添加新的服务器配置。

-

将出现一个新窗口，您需要输入：Name：（服务器名称）Address：（服务器地址）Up port：（通常为 1700）Down port：（通常为 1700）

-

点击 OK 保存。**第二步：**

-

在之前的窗口中选择 Device 选项卡。

-

双击或点按该行进行配置。

-

在下拉菜单中选择之前输入的网络。

-

点击 Enable 按钮以启用网关。

-

点击 OK 保存。

-

配置完成。我们建议在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以引导设备进行重新安装，请参阅相关章节。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描 QR 码并选择您偏好的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名已预先填入。
- 点击 Connect 通过无线网络建立到设备的连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 天线使用 {#antenna-usage}

我们建议使用外部天线，即 "LoRa Antenna kit" —— 可单独购买。天线套件带有立柱安装座和可直接与 LR 卡配合使用的线缆。[https://mikrotik.com/product/lora_antenna_kit](https://mikrotik.com/product/lora_antenna_kit) 位于底部舱门下的 SMA 接头已连接到 LR 卡，可直接使用。请参阅有关如何取下舱门的章节。

请在设备关闭时连接和断开天线！

**内部天线** 2 dBi 可用于到网关距离小于 1 km 的部署场景。默认情况下，天线未连接到卡上！要使用内部天线：

- 打开底部舱门（见 ""）。

![](/img/7202d8bf8949c9a8.webp)

- 使用 PH2 螺丝刀取下螺丝。
- 将上壳与底壳向相反方向滑动以将它们分离。

![](/img/a69174da52b6ff73.webp)

- 找到内部天线线缆，并将其替换为 LR 卡上的 SMA 线缆接头。

![](/img/a9ac9728a5604913.webp)

- 重新组装。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三种功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备随后将查找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统都将加载备份 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内包含随设备提供的以下配件：

- EU/US 开关电源 24 V ⎓，0.8 A，19.2 W，85.3 %，VI，线缆：150 cm Hor CMC。
- WAP 桌面支架。
- WAP 室外机壳支架 AL，白色。
- POE 注入器线缆。
- 线缆（H4130-04PDB000R 3 mm 2x2P Housing）转（StripJacket 5 cm+WireEnd Strip/Tin 1 cm）24 AWG。
- 软管卡箍，35-70 mm，W4。
- K-52 紧固套件。
- WAP 钻孔模板，纸质手册。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。RouterOS 的 LR 支持仅限于 MikroTik LR 卡，不支持第三方 Lora 卡。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废弃物处置场所。请了解将设备正确运送到您所在地区指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th><th>包含 FCC ID</th></tr></thead><tbody><tr><td>RBwAPR-2nD&R11e-LoRa9</td><td>TV7WAPR2ND</td><td>TV7LR9</td></tr></tbody></table>

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装环境中的有害干扰提供合理防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在居住区域操作本设备很可能造成有害干扰，此时用户需自费纠正干扰。

**FCC 警告：** 任何未经负责合规的一方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其操作须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或协同工作。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。安装和操作本设备时，辐射体与您身体的任何部位之间应保持至少 20 cm 的距离。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th><th>包含 IC</th></tr></thead><tbody><tr><td>RBwAPR-2nD&R11e-LoRa9</td><td>7442A-WAPR2ND</td><td>7442A-LR9</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。其操作须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。其使用获准须满足以下两个条件：(1) 设备不得产生干扰；(2) 用户必须接受设备所受到的任何无线电干扰，即使该干扰可能影响其正常运行。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。安装和操作本设备时，辐射体与您身体的任何部位之间应保持至少 20 cm 的距离。本设备符合 IC 针对非受控环境规定的辐射暴露限值。安装和操作本设备时，辐射体与您身体的任何部位之间应保持至少 20 cm 的距离。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息标注在其标签上的序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2480-2483.5 МГц（20 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 NKРЗІ 2012 年 11 月 1 日第 559 号决议批准、并于 2013 年 1 月 3 日在乌克兰司法部登记（编号 57/22589）的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RB912R-2nD-LTm 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WLAN / LR {#wlan--lr}

<table><thead><tr><th>**WLAN**</th><th>工作频率 / 最大输出功率</th><th>2400-2483.5 MHz / 20 dBm</th></tr></thead><tbody><tr><td>**LR**</td><td>2403-2479 MHz / 20 dBm</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。更多详细信息请参阅上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen Sendeleistung Grenzwerte gemäß ETSI-Vorschriften. Weitere Informationen finden Sie oben in der Konformitätserklärung / Cet appareil MikroTik respecte les limites de puissance de transmission maximale conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti di potenza massima di trasmissione in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los valores límite de potencia máxima de transmisión de acuerdo con la normativa ETSI. Para obtener información más detallada, consulte la Declaración de conformidad anterior / Это устройство MikroTik соответствует предельным значениям максимальной мощности передачи в соответствии с правилами ETSI. Для получения более подробной информации см. Декларацию соответствия выше.
