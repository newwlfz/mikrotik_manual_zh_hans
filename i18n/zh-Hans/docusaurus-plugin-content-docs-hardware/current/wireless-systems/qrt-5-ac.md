---
title: "QRT 5 ac"
slug: /qrt-5-ac
source: https://manual.mikrotik.com/hardware/qrt-5-ac
captured_at: '2026-11-04T09:58:31+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律法规进行处理。
- 将接入点安装在任何墙面上的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适用于安装在户外的立杆上。开始安装前请仔细阅读安装说明。使用错误的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的做法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 使用以太网线将设备连接到随附的 PoE 供电器，接入数据+电源端；
- 将 PoE 供电器的数据端连接到计算机；
- 将电源适配器连接到 PoE 供电器；
- 通过网页浏览器使用 **WebFig** 或 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）配置设备。**提供多种配置方法以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 即可访问 **WebFig**；对于 **WinBox**，请下载该工具，转到 **Neighbors** 选项卡，然后点击 MAC 地址。用户名为 "**admin**"，密码为空（或者，对于某些型号，请在贴纸上查看用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您所在的国家，以应用该国家的法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。
- 将设备安装到所需位置，请参阅（链接）

## 扩展插槽和端口 {#extension-slots-and-ports}

千兆以太网端口，以太网端口上支持被动 PoE。

- 5 GHz 无线，支持的协议 802.11a/n/ac，天线增益 24 (dBi)。

## 打开卡扣 {#opening-latch}

要接触以太网端口和复位按钮，请打开卡扣：

![](/img/f3781190be56c137.webp)

## [QRT 5 ac](https://mikrotik.com/product/RB911G-5HPacD-QRT) (RB911G-5HPacD-QRT) {#qrt-5-ac-rb911g-5hpacd-qrt}

- 将卡扣从设备上向下拉出。
- 抬起卡扣，但不要将它们完全取下。

![](/img/bfaed7cbeee8d4a5.webp)

## 前面板状态 LED 行为 {#front-status-led-behavior}

RouterOS 允许按用户意愿配置每个 LED 的活动方式。可以配置 LED 显示无线信号强度、在接口有流量活动时闪烁以及许多其他选项。如需了解更多信息，请访问 [LEDs](/docs/hardware/leds) 手册页面。本设备的默认出厂配置：

![](/img/3b568ebffbd94538.webp)

- 常亮蓝色 – 设备已通电。
- 常亮绿色 – 以太网端口已连接。
- 常亮绿色 – 用户自定义 LED。
- 常亮绿色 – 五个绿色 LED 的组合，显示信号强度。

## 安装 {#mounting}

本设备设计用于户外，安装在桅杆上，所有需要的线缆都通过设备的卡扣穿入。

*本设备的安装和配置应由具备资质的人员完成。*

在桅杆上安装时，请确保线缆入口朝下。本设备的 IP 防护等级为 IP54。我们建议使用 Cat5/6 屏蔽线缆。警告！安装和操作本设备时，设备与人体之间应保持至少 30 cm 的距离。在住宅环境中操作本设备可能会造成无线电干扰。QRT 包装箱内有多个部件需要组装。请按以下步骤操作：

![](/img/f2a401efc69d5463.webp)

- 使用随附的四颗螺钉将两个支架 (A) 安装到旋转调节器 (B) 上（使用 PH1 螺丝刀）。
- 将两个 U 型螺栓 (C) 环绕在桅杆或立杆上，并让它们穿过旋转调节器 (D) 上的孔。然后拧紧 U 型螺栓，每个配一个平垫圈、一个弹簧垫圈和一个螺母，如右图所示。所有螺母需使用 10 号（3/8 in）扳手拧紧。立杆的最大直径可达 70 mm。

![](/img/566b4a72f051a36b.webp)

- 使用安装支架 (E)，将其装到天线背面。对每个内置螺栓按此顺序各安装一个橡胶圈、一个垫圈和一个螺母。

![](/img/2b7396442b92f286.webp)

- 将旋转调节器安装到安装支架上。在位置 (F) 使用长螺栓。在较短的螺钉上各放一个平垫圈和一个弹簧垫圈，然后将它们装入位置 (G)。不要拧得太紧，因为此时需要调整天线。

![](/img/a6a3b8817862ac1b.webp)

- 根据软件中的无线信号调整好天线的水平和角度后，拧紧所有螺母。请记录角度数值以备日后参考。风载荷 16 kg @ 40m/s，9kg @ 30 m/s；

## 接地 {#grounding}

安装基础设施（塔和桅杆）以及路由器本身必须正确接地。设备背面有一个接地线固定螺钉。将接地线连接到接地螺钉上，然后将接地线的另一端连接到已接地的桅杆上，请参见图片：

![](/img/f54eca22e5502899.webp)

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备将开始寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RB911G-5HPacD-QRT 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这可用于 RouterBOOT 调试和恢复。

## 配件 {#accessories}

包装内含随设备提供的附件：

- 安装部件：QRT U 型螺栓，钢制 - 镀锌，直径 6 mm，U 型桅杆卡箍，天线支架。
- 欧规/美规开关电源 24 V，1.2 A，30 W DC ⎓ 线缆：220 cm 直角 DC 插头。
- K-QRT_Fastening set for QRT。
- ZCPOEC006-R2_Gigabit POE 供电器线缆，带屏蔽接头。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统未经测试。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片、下载内容和测试结果，请访问我们的网页：[https://mikrotik.com/product/RB911G-5HPacD-QRT](https://mikrotik.com/product/RB911G-5HPacD-QRT)

## 国家列表 {#country-list}

<table><thead><tr><th></th><th>**AT**</th><th>**BE**</th><th>**BG**</th><th>**CY**</th><th>**CZ**</th><th>DE</th><th>DK</th><th>EE</th><th>EL</th><th>ES</th><th>FI</th><th>**FR**</th><th>**HR**</th><th>![](/img/bc5e2b50bec98c52.webp) HU</th></tr></thead><tbody><tr><td></td><td>**IE**</td><td>**IT**</td><td>LV</td><td>LT</td><td>**LU**</td><td>**MT**</td><td>**NL**</td><td>**PL**</td><td>PT</td><td>RO</td><td>**SE**</td><td>SI</td><td>**SK**</td><td>UK</td></tr></tbody></table>

加粗标注的为 BFWA（宽带固定无线接入）成员。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请了解将设备正确运送到您所在地区指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID:TV7RB922-5HPACTM

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制要求。这些限制旨在为住宅安装环境中的有害干扰提供合理保护。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则建议用户尝试通过以下措施之一来消除干扰：

- 调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以获取帮助。FCC 注意：任何未经合规责任方明确批准的更改或修改都可能导致用户丧失操作本设备的权限。本设备符合 FCC 规则第 15 部分的要求。其操作须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致非预期操作的干扰。本设备及其天线不得与任何其他天线或发射器共址或协同工作。**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。安装和操作本设备时，辐射体与身体任何部位之间应保持至少 20 cm 的距离。**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用经授权的天线时，仅使用经本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，明确禁止使用任何未经本产品认证的天线。安装人员应根据国家法规和天线类型配置天线的输出功率水平。带接头的设备需要由专业人员安装，以确保符合健康与安全要求。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC:7442A-9225HPACT 本设备符合加拿大工业部免许可证 RSS 标准。其操作须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。安装和操作本设备时，辐射体与身体任何部位之间应保持至少 20 cm 的距离。Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé à une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而异。

有关设备生产日期的信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），其后的两位数字表示周编号。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准（Norma Oficial Mexicana） {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5150-5250 МГц (23 дБм)，5250-5350 МГц (20 дБм)，5470-5725 МГц (27 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备需按照 NKRZI 2012 年 11 月 1 日第 559 号决定（该决定于 2013 年 1 月 3 日在乌克兰司法部登记，登记号为 57/22589）所规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

Mikrotīkls SIA 特此声明，无线电设备类型 RB911G-5HPacD-QRT 符合 2014/53/EU 指令的要求。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家的法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！**
