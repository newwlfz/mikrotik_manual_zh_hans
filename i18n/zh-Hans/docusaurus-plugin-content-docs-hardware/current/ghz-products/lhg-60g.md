---
title: "LHG 60G"
slug: /lhg-60g
source: https://manual.mikrotik.com/hardware/lhg-60g
captured_at: '2026-11-04T09:54:12+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可以下载为 <a href="/assets/files/lhg-60g-d834c6f77e358b33f6d3fd47663765b4.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/bec66097fc732862.jpg)

## [LHG 60G](https://mikrotik.com/product/lhg_60g) (RBLHGG-60ad) {#lhg-60g-rblhgg-60ad}

LHG 60G 设备工作在 60 GHz 无线频段，这些设备的工作温度范围为 -40°C 至 +70°C。每台设备具有一个千兆以太网端口，可通过 PoE 供电。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律法规。
- 在任意墙面上安装接入点的所有安装方法均须获得当地主管部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于户外安装在立柱上。开始安装前，请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因设备使用不当而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座上拔下。
- 客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线设备必须由专业人员进行安装。
- 这是 A 类设备。在居住环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

## 快速开始 {#quickstart}

- 组装设备。有关安装说明，请参阅 [LHG 60G 产品页面](https://mikrotik.com/product/lhg_60g)；设备包含一个接地连接（标记为 ⏚），应将其连接到设备使用所在塔架或建筑的接地装置。这可大幅降低静电放电和雷击损坏的风险。包装内含接地连接器。

警告！本设备的安装和操作应确保设备与人体之间保持至少 95 cm 的距离。在居住环境中操作本设备可能造成无线电干扰。本设备的 IP 防护等级为 IP54。*本设备的安装和配置应由合格人员完成。*

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个以太网端口，支持自动交叉/直通线缆校正 (Auto MDI/X)，因此您可以使用直通线或交叉线连接到其他网络设备。
- WiGig, 802.11ad.

## 供电 {#powering}

设备可通过以太网端口供电。以太网端口接受 12-57 V DC 的 PoE 输入（无源和 802.3af/at）。包装盒内包含电源适配器和无源 PoE 注入器。使用 PoE 注入器时，请务必使用 "Power + Data" 连接器连接设备，使用 "Data" 连接器连接您的 PC、路由器或交换机。**连接到 POE 适配器：**

- 将来自设备的以太网电缆连接到 POE 适配器的 POE+DATA 端口。
- 将来自本地网络 (LAN) 的以太网电缆连接到 POE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。最大功耗 5 W。

## 配置 {#configuration}

我们建议点击 "Check for updates" 按钮，并将您的 RouterOS 软件更新到最新版本，以确保最佳的性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法通过 IP 连接，可以使用 WinBox 工具 ([https://mt.lv/winbox](https://mt.lv/winbox)) 从 LAN 侧连接到设备的 MAC 地址。请熟悉 [W60G 接口](/docs/wireless/w60g) 的附加信息。出于恢复目的，可以引导设备进行重新安装，请参阅 章节 。

## 按钮和跳线 {#buttons-and-jumpers}

routerBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，以将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，以清除所有配置并恢复默认值。
- 当 LED 熄灭后（约 20 秒）松开按钮，使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。无论使用上述哪种选项，如果在设备接通电源之前按下按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## LED 状态 {#led-status}

设备包含使用 LED 的精确对准引导。如果从天线后方朝链路另一端看去，灯光会用箭头指示转动天线的方向。当对准 LED 熄灭，仅保留 "link established" LED 时，表示对准完成。各 LED 灯为：

![](/img/81b844d3fdf5b5cd.webp)

- 向上倾斜。
- 向下倾斜。
- 向右旋转。
- 向左旋转。
- 链路建立时 LED 亮起。
- 以太网连接时 LED 亮起。
- 用户可配置 LED。
- 电源状态开启。

## 配件 {#accessories}

包装内包含以下随设备提供的附件：

- K-LHG 螺丝套装/紧固套装。
- 千兆 POE 注入器。
- LHG-5G-390 mm 天线盘（网孔尺寸 0.5 t x1.0 wx1.4 mm ）。
- 欧盟/美国开关电源 24 V ⎓，0.38 A，9 W，Level VI，线缆：1.5 m。
- 软管卡箍 SUS304（十字型；夹紧直径范围 35-70 mm）。
- BRAC1_ LHG 安装元件。
- DynaDish U 型螺栓 M8（A2 不锈钢）。
- QuickMount AIM。

## 规格 {#specifications}

有关 LHG 产品、规格和图片的更多信息，请访问我们的网页：[https://mikrotik.com/product/lhg_60g](https://mikrotik.com/product/lhg_60g)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列在 /system resource 中。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用在现场配置您的路由器，或为您的 MikroTik 家庭接入点应用最基本的初始设置。扫描二维码并选择您首选的操作系统。

![](/img/9bcba09a7b6a0d53.webp)

![](/img/8d294e5cd375c591.webp)

本设备符合 ETSI 法规规定的最大发射功率限制。欧盟的频率和最大发射功率如下：57-66GHz：34.92 dBm。60 GHz 频段的工作模式：58.32 GHz、60.48 GHz、62.64 GHz。本设备已获认证可用于点对多点应用的户外使用。在以下国家，本设备不能用于固定点对点应用：

![](/img/01438e2d9209ce7d.webp)

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCCID</th></tr></thead><tbody><tr><td>RBLHGG-60ad</td><td>TV7LHGG60AD</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装环境提供合理的有害干扰保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在居住区域操作本设备很可能造成有害干扰，此时用户需要自行承担费用来纠正干扰。

![](/img/ce6fc3eb10b9a1e6.webp)

**FCC 警告：** 任何未经负责合规的一方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共址或联合运行。

**重要：射频辐射暴露。** 天线与职业用户/公众之间必须保持至少 95 cm 的距离。在此配置下，可满足 FCC 针对一般人群/非受控环境规定的辐射暴露限值。

**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用经本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，明确禁止使用任何未经本产品认证的天线。安装人员应根据国家法规和天线类型配置天线的输出功率水平。带连接器的设备需要专业安装，以确保符合健康与安全要求。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBLHGG-60ad</td><td>7442A-LHGG60AD</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，并且 (2) 本设备必须接受任何干扰，包括可能导致设备运行不正常的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

本设备不得在飞机上操作，ISED RSS-210 附录 J.1 所列条件除外。Cet appareil ne doit pas être utilisé sur un avion, sauf dans les conditions énumérées ISED RSS-210 Annex J.1.

**重要说明：IC 辐射暴露声明：** 本设备符合 IC RSS-102 针对非受控环境规定的辐射暴露限值。本设备的安装和操作应确保辐射体与人体之间保持至少 95 cm 的距离。Cet équipement est conforme aux limites d'exposition aux rayonnements IC établies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé avec un minimum de 95 cm de distance entre la source de rayonnement et votre corps.

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备生产日期信息标注在其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备，须按照乌克兰国家通信与信息化监管委员会 2012 年 11 月 1 日第 559 号决定（2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBLHGG-60ad 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WiGig {#wigig}

<table><thead><tr><th>工作信道 / 最大输出功率 Betriebskanäle / maximale Ausgangsleistung Canaux opérationnels / puissance de sortie maximale Canali operativi / massima potenza di uscita Canales operacionales / potencia de salida máxima Операционные каналы / максимальная выходная мощность</th><th>58.32 GHz / &lt;40 dBm</th></tr></thead><tbody><tr><td>60.48 GHz / &lt;40 dBm</td><td></td></tr><tr><td>62.64 GHz / &lt;40 dBm</td><td></td></tr></tbody></table>
