---
title: "LDF 5 系列"
slug: /ldf-5-series
source: https://manual.mikrotik.com/hardware/ldf-5-series
captured_at: '2026-11-04T09:53:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/83cf6b346ad1683b.webp)

## [LDF 5 ac](https://mikrotik.com/product/ldf_5_ac) (RBLDFG-5acD) {#ldf-5-ac-rbldfg-5acd}

LDF（Lite dish feed，轻量型天线馈源）是一种内置天线的室外无线系统，设计用于安装在卫星偏馈天线上。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适用于安装在室外的立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和附件，这些均可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。
- 本设备为 A 类设备。在居住环境中，本产品可能会造成无线电干扰，此时用户可能需要采取相应的措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备安装和操作时，与您的身体、职业使用者或普通公众的距离不得小于 20 厘米。

## 组装 {#assembly}

本设备兼容卫星电视常用的标准偏馈天线。偏馈安装座为通用型，直径 40 mm，LDF 可以轻松装入其中。要将以太网线连接到 LDF 单元，请按以下步骤操作：

- 按图示组装所有部件。如果使用成品网线，请在一侧切开橡胶密封圈，以便将其套到网线上。自制压接的网线应在密封圈套到网线上之后再压接；
- 将以太网线连接到 LDF 上的以太网接口；
- 顺时针旋转，将外壳螺母安装到 LDF 本体上；
- 将橡胶密封圈推入外壳螺母，然后顺时针转动压紧螺母，密封防水接头。

![](/img/4697c94b5539fc15.webp)

## 在天线上组装 {#assembling-on-dish}

请确保将 LDF 单元按右图所示的正确定位安装到偏馈安装座上。单元朝上对准天线。

![](/img/1a2a13170697f321.webp)

![](/img/28d101453837d87d.webp)

天线将作为反射器，放大信号。组装完成后，应如左图所示放置并安装到立杆或墙壁上。

## 安装 {#mounting}

本设备的 IP 防护等级为 IP54。本设备设计用于室外，请确保所有线缆开口朝下。请使用 Cat6 网线配合 PoE 供电器。安装基础设施（塔架和桅杆）以及路由器本身都必须正确接地。

*本设备的安装和配置应由具备资质的人员完成。* *警告！本设备的安装和操作时，设备与身体之间的最小距离应为 28 厘米。在居住环境中操作本设备可能会造成无线电干扰。*

## 供电 {#powering}

本设备接受来自无源 PoE 供电器（Passive PoE injector）的 10-28 V ⎓ 直流输入。本设备不能与符合 IEEE802.3af 的 48 V 供电设备配合使用。包装内附带一个 PoE 供电器。最大功耗：

- LDF 5，6 W；
- LDF 5 ac，8 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 使用以太网线将设备连接到随附的 PoE 供电器的 data+power 端；
- 将 PoE 供电器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 供电器；
- 通过 **WebFig** 或 **WinBox** 工具，使用网页浏览器在 [https://mt.lv/WinBox](https://mt.lv/WinBox) 配置您的设备；提供多种配置方法以确保可访问性；
- 打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后点击 MAC 地址。用户名为 "**admin**"，没有密码（某些型号请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家/地区，以应用国家法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳的性能和稳定性。对于无线型号，请确保您已选择设备将要使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，熟悉各种可能的功能：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以引导设备进行重新安装，请参见相关章节。

## 扩展插槽和端口 {#extension-slots-and-ports}

-

集成无线：LDF 5，5 GHz，802.11a/n；LDF 5 ac，5 GHz，802.11a/n/ac。

-

一个以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X），因此您可以使用直通线或交叉线连接其他网络设备。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三种功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）；
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备此时将寻找 CAPsMAN 服务器（共 10 秒）；
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）；无论采用上述哪种方式，如果在设备通电之前就按下按钮，系统都将加载备份的 RouterBOOT 引导程序。这对 RouterBOOT 调试和恢复非常有用。

## 规格 {#specifications}

如需了解有关本产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：

- LDF 5 - [https://mikrotik.com/product/rbldf_5nd](https://mikrotik.com/product/rbldf_5nd)
- LDF 5 ac - [https://mikrotik.com/product/ldf_5_ac](https://mikrotik.com/product/ldf_5_ac)

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可以在现场配置您的路由器，或为您的 MikroTik 家庭接入点应用最基本的初始设置：

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开该应用。
- 点击 Connect，通过无线网络与您的设备建立连接（请查看贴纸上的无线密码）。
- 用户名为 "**admin**"，没有密码（某些型号请查看贴纸上的用户和无线密码）。
- 选择 Quick Setup，该应用将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及更高版本。出厂预装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备运送到指定处置场所的正确程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>LDF 5</td><td>TV7LHG5NDM</td></tr><tr><td>LDF 5 ac</td><td>TV7LHG5ACD</td></tr></tbody></table>

本设备已经过测试，

![](/img/ce6fc3eb10b9a1e6.webp)

并认定符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装环境中的有害干扰提供合理防护。

本设备会产生、使用并可能辐射射频能量，如果未按说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在居民区操作本设备很可能会造成有害干扰，此时用户将需要自费纠正这种干扰。

FCC 警告：未经合规负责方明确批准的任何更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。本设备及其天线不得与任何其他天线或发射器共置或联合运行。**重要提示：射频辐射暴露。** 天线与职业使用者之间必须保持至少 20 厘米的距离，与普通公众之间必须保持 28 厘米的距离。在此配置下，可满足 FCC 针对人群/非受控环境规定的辐射暴露限值。**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用经本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 条，明确禁止使用未经本产品认证的任何其他天线。安装人员应根据国家法规和天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。经批准的天线：

- MikroTik 双极化定向天线（9.0 dBi 和 16.0）；
- 短背射定向天线（21 dBi）；
- 抛物面天线（24.5 dBi 和 27.0 dBi）。

## OEM 声明 {#oem-statement}

本模块仅供 OEM 安装使用。因此，OEM 集成商有责任确保最终用户没有可自行拆卸、安装或修改模块的手动说明。本模块仅限于在移动或固定应用场景中安装。OEM 集成商可使用增益等于或低于本文档列表中所示增益的天线（更多信息请参考 47 CFR 第 15.204(c)(4) 段。MikroTik OEM 射频模块符合 FCC 规则和法规第 15 部分。OEM 模块已获得 FCC 认证，可与其他产品配合使用而无需进一步认证（依据 FCC 第 2.1091 节）。其他工作配置（包括涉及 47CFR 第 2.1093 段的便携式配置）以及不同的天线配置需要另行审批。OEM 必须遵守针对成品的所有 47CFR 标签说明和要求。未经 MikroTik 明确批准的更改或修改可能会使 OEM 安装或操作设备的权限失效。OEM 必须对其最终产品进行测试，以符合非故意辐射体要求（FCC 第 15.107 和 15.109 节），然后才能声明其最终产品符合 FCC 规则第 15 部分。**警告**：OEM 必须确保满足 FCC 标签要求。这包括在 OEM 外壳外部加贴可见标签，标明本产品适用的 MikroTik OEM 射频模块 FCC 标识符，以及上文所述任何其他必需的 FCC 声明。本内嵌设备符合 FCC 规则和法规 47CFR 第 15 C 段。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。标签和文字信息的字号应足够大，以便于清晰辨认，并与设备和标签的尺寸相称。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>LDF 5</td><td>7442A-LHG5NDM</td></tr><tr><td>LDF 5 ac</td><td>7442A-LHG5ACD</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。其运行须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

在 5150–5250 MHz 频段内运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。还应告知用户，高功率雷达被指定为 5250-5350 MHz 和 5650-5850 MHz 频段的主要用户（即优先用户），这些雷达可能会对 LE-LAN 设备造成干扰和/或损坏。Les dispositifs fonctionnant dans la bande de 5 150 a 5 250 MHz sont reserves uniquement pour une utilisation a l'interieur afin de reduire les risques de brouillage prejudiciable aux systemes de satellites mobiles utilisant les memes canaux. Les utilisateurs devraient aussi etre avises, d'une part, que les utilisateurs de radars de haute puissance sont designes utilisateurs principaux (c.-a-d., qu'ils ont la priorite) des bandes de 5 250 a 5 350 MHz et de 5 650 a 5 850 MHz et, d'autre part, que ces radars pourraient causer du brouillage et/ou des dommages aux dispositifs de RL-EL.

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射机功率</th></tr></thead><tbody><tr><td>5150-5350 МГц，5650-5850 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而有所不同。

有关设备制造日期的信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），其后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5150-5250 МГц（23 дБм）、5250-5350 МГц（20 дБм）、5470-5725 МГц（27 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰境内使用需要按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议（该决议于 2013 年 1 月 3 日在乌克兰司法部登记，登记号为 № 57/22589）规定的程序获得使用许可。

### CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相应型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。详情请参见上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen WLAN- Sendeleistung Grenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben unter Konformitätserklärung / Cet appareil MikroTik respecte les limites maximales de puissance de transmission WLAN conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti massimi di potenza di trasmissione WLAN in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia de transmisión WLAN de acuerdo con las regulaciones ETSI. Para obtener más información, consulte la declaración de conformidad anterior / Это устройство MikroTik соответствует максимальным пределам мощности передачи WLAN в соответствии с правилами ETSI. Для получения дополнительной информации см. Декларацию соответствия выше.
