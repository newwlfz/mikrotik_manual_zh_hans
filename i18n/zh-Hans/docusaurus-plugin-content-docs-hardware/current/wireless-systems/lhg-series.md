---
title: "LHG 系列"
slug: /lhg-series
source: https://manual.mikrotik.com/hardware/lhg-series
captured_at: '2026-11-04T09:54:48+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **[LHG 2](https://mikrotik.com/product/lhg_2)** (RBLHG-2nD)
- **[LHG 5](https://mikrotik.com/product/RBLHG-5nD)** (RBLHG-5nD)
- **[LHG HP5](https://mikrotik.com/product/RBLHG-5HPnD)** (RBLHG-5HPnD)
- **[LHG 5 ac](https://mikrotik.com/product/lhg_5_ac)** (RBLHGG-5acD)
:::

## 安全警告 {#safety-warnings}

-

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。

-

本产品的最终处置应遵守所有国家法律和法规。

-

在任何墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。

-

设备的安装必须符合当地和国家的电气规范。

-

本产品设计用于在室外安装在立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险情况并对系统造成损坏。

-

请仅使用制造商批准并可在本产品原包装中找到的电源和附件。

-

在将系统连接到电源之前，请阅读安装说明。

-

我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！

-

如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。

-

客户有责任遵守当地国家/地区的法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

-

LHG 是一款内置定向天线的室外无线路由器。它可用作 CPE，或用于点对点链路（使用 RouterOS 无线模式 "bridge" 作为单客户端 AP 用于点对点场景）。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业使用者或普通公众的距离不得小于 40 厘米。

## 快速开始 {#quickstart}

- 打开以太网舱门，将以太网线缆连接到以太网端口，并将以太网线缆的另一端连接到随附的 PoE 供电模块。
- 使用以太网线缆将设备连接到随附 PoE 供电模块的数据+电源端；
- 将 PoE 供电模块的数据端连接到计算机；
- 将电源适配器连接到 PoE 供电模块；
- 使用网页浏览器通过 **WebFig** 或 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）配置您的设备。**提供多种配置方法以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后单击 MAC 地址。用户名为 "**admin**"，无密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单中，然后重启设备；
- 将您的 RouterOS 软件更新到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中进行以下设置：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 组装与安装 {#assembly-and-mounting}

- 将两条支腿安装到 LHG 外壳上。

![](/img/4b843b31ec032a91.jpg)

## [LHG 5](https://mikrotik.com/product/RBLHG-5nD) (RBLHG-5nD) {#lhg-5-rblhg-5nd}

- 将组装好的 LHG 单元在相应位置卡入网格。
- 用两颗自攻螺钉将支腿固定到位（使用 PH2 十字螺丝刀）。

![](/img/4333f6bb76f982d7.webp)

本设备设计为使用扎带或钢制卡箍安装在立杆上，如图所示。随附钢制卡箍的夹紧直径为 35 – 70 mm。

![](/img/e29801f908debc24.webp)

- 将随附的钢制卡箍穿过设备。
- 将设备固定到立杆上。
- 对齐并拧紧卡箍以固定设备。可选：如有需要，在安装设备之前，您可以将随附的 5 度调节适配器插入安装环所插入的顶部或底部槽口中。当设备拧紧到垂直立杆上时，这将产生额外的向上或向下角度。

![](/img/0aaffeda7585ef66.webp)

本设备包含一个接地连接（标记为 ⏚），您应将其连接到设备使用所在塔架或建筑物的接地装置。这可大幅降低静电放电和雷击损坏的风险。警告！本设备的安装和操作位置与您的身体之间应保持至少 40 cm 的距离。在住宅环境中操作本设备可能会导致无线电干扰。

将以太网线缆连接到舱门下方的以太网端口，并如图所示从支腿中穿过：

![](/img/6a72f386ce5fdaa5.webp)

可另行购买额外的安装支架：

LHG 安装支架

![](/img/bb1a08169dd25567.webp)

solidMOUNT

![](/img/bb890f595de6c700.webp)

## 供电 {#powering}

本设备仅接受来自无源 PoE 供电模块的供电。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 POE 适配器的 POE 端口。
- 将来自您局域网的以太网线缆连接到 POE 适配器的 LAN 端口，请注意数据与电源流向的箭头。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

登录后，我们建议单击 QuickSet 菜单中的 "Check for updates" 按钮，因为将您的 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备使用所在的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，让您熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参阅相关章节。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通或交叉线缆连接到其他网络设备。
- 一个集成的 2x2 MIMO 无线设备，内置栅格天线。LHG 2 双链 18 dBi，2.4GHz，802.11b/g/n。最大功耗 5 W。LHG 5 双链 24.5 dBi，5GHz，802.11 a/n。最大功耗 6 W。LHG HP5 双链 24dBi，5GHz，802.11 a/n。最大功耗 7 W。LHG 5 ac 双链 24.5dBi，5GHz，802.11 a/n/ac。最大功耗 8 W。

## Reset 按钮 {#reset-button}

Reset 按钮有三个功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAPs 模式（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）。无论采用上述哪种方式，如果在设备通电前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含以下随设备提供的附件：

- LHG-5 安装套件。
- POE 供电模块/千兆 POE 供电模块（适用于 LHGG-5acD）。
- LHG-5G-390 mm 碟形天线 3,0x2.5x0,5 mm。
- DC ⎓ EU/US 开关电源 24 V，0.38 A，9 W，Level VI，线缆：1.5 m）。
- 软管卡箍 SUS304（philips 型；夹紧直径范围 35-70 mm）。

## 规格 {#specifications}

有关 LHG 产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/lhg_2](https://mikrotik.com/product/lhg_2) [https://mikrotik.com/product/RBLHG-5nD](https://mikrotik.com/product/RBLHG-5nD) [https://mikrotik.com/product/RBLHG-5HPnD](https://mikrotik.com/product/RBLHG-5HPnD) [https://mikrotik.com/product/lhg_5_ac](https://mikrotik.com/product/lhg_5_ac)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

![](/img/8d294e5cd375c591.webp)

![](/img/25f50553ffd86eaf.webp)

![](/img/b0984aa3ad3c6d58.webp)

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备正确运输至指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>LHG 2</td><td>TV7LHG2ND</td></tr><tr><td>LHG 5</td><td>TV7LHG5NDM</td></tr><tr><td>LHG 5 ac</td><td>TV7LHG5ACD</td></tr><tr><td>LHG HP5</td><td>TV7LHG5HPND</td></tr></tbody></table>

![](/img/ce6fc3eb10b9a1e6.webp)

**LHG 5** 和 **LHG 5 ac** 已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区域操作本设备很可能会造成有害干扰，此时用户需要自费纠正干扰。

**LHG 2** 和 **LHG HP5** 已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装中的有害干扰提供合理保护。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。然而，无法保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来判断），建议用户尝试通过以下措施之一来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以获得帮助。FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与其他任何天线或发射器共址或联合运行。**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备的安装和操作位置与辐射体及您身体任何部位之间的距离应至少为 40 cm。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>LHG 2</td><td>7442A-LHG2ND</td></tr><tr><td>LHG 5</td><td>7442A-LHG5NDM</td></tr><tr><td>LHG 5 ac</td><td>7442A-LHG5ACD</td></tr><tr><td>LHG HP5</td><td>7442A-LHG5HPND</td></tr></tbody></table>

本设备符合加拿大工业部免许可证 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement. **重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和操作位置与辐射体及您身体任何部位之间的距离应至少为 40 cm。**IMPORTANTE:** Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé à une distance minimale de 40 cm entre le radiateur et toute partie de votre corps.

**LHG 5** 和 **LHG 5 ac**。此 A 类数字设备符合加拿大 ICES-003 标准。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

**LHG 2** 和 **LHG HP5**。此 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

在 5150–5250 MHz 频段运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。Les dispositifs fonctionnant dans la bande de 5 150 a 5 250 MHz sont reserves uniquement pour une utilisation a l'interieur afin de reduire les risques de brouillage prejudiciable aux systemes de satellites mobiles utilisant les memes canaux.

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный каналы</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*Доступные частотные каналы могут различаться в зависимости от модели продукта и сертификации.

有关设备制造日期的信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

如需了解保修服务的详细信息，请联系您的销售商。

![](/img/984ad54320693690.webp)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Unijas iela 2, Riga, LV-1039, Latvia.

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化管理委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA, Unijas iela 2, 里加, 拉脱维亚, LV1039.

Робоча частота (Максимальна вихідна потужність): 2400-2483.5 МГц (30 дБм), 5150-5250 МГц (23 дБм), 5250-5350 МГц (20 дБм), 5470-5725 МГц (27 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Unijas iela 2, Riga, Latvia, LV1039.

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz（仅 LHG 2）</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用无任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用无任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家/地区的法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 TX 功率限值。有关更多详细信息，请参阅上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen Sendeleistungsgrenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben in der Konformitätserklärung. Nähere Informationen finden Sie oben in der Konformitätserklärung / Cet appareil MikroTik respecte les limites de puissance TX maximale via les réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik soddisfa i limiti di potenza massima TX tramite le normative ETSI. Per informazioni più dettagliate consultare la Dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia TX a través de las normas ETSI. Para obtener información más detallada, consulte la Declaración de conformidad anterior / Это устройство MikroTik соответствует ограничениям максимальной мощности передачи согласно правилам ETSI. Для получения более подробной информации см. Декларацию соответствия выше.

![](/img/0561b3ba8c95a35c.webp)

在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。/ Die WLAN-Funktion dieses Geräts ist nur für die Verwendung in Innenräumen im Frequenzbereich 5150 bis 5350 MHz beschränkt. / La fonction WLAN de cet appareil est limitée à une utilisation en intérieur uniquement lorsqu'il fonctionne dans la gamme de fréquences 5150 à 5350 MHz. / La funzione WLAN per questo dispositivo è limitata all'uso interno solo quando si opera nella gamma di frequenza da 5150 a 5350 MHz. / La función WLAN para este dispositivo está restringida al uso en interiores solo cuando se opera en el rango de frecuencia de 5150 a 5350 MHz. / Функция WLAN для этого устройства ограничена использованием внутри помещения только при работе в диапазоне частот от 5150 до 5350 МГц.
