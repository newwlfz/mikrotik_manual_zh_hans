---
title: "NetMetal 系列"
slug: /netmetal-series
source: https://manual.mikrotik.com/hardware/netmetal-series
captured_at: '2026-11-04T09:57:21+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/3904c50029506789.jpg)

## [NetMetal 5](https://mikrotik.com/product/RB922UAGS-5HPacD-NM) (RB922UAGS-5HPacD-NM) {#netmetal-5-rb922uags-5hpacd-nm}

:::info 本文涵盖

- **[NetMetal 5](https://mikrotik.com/product/RB922UAGS-5HPacD-NM)**
- **[NetMetal 5SHP](https://mikrotik.com/product/RB921UAGS-5SHPacD-NM)**
- **[NetMetal 5 triple](https://mikrotik.com/product/RB922UAGS-5HPacT-NM)**
- **[NetMetal 5SHP triple](https://mikrotik.com/product/RB921UAGS-5SHPacT-NM)**
:::

NetMetal 是一款坚固的防水户外设备。它配备高功率无线接口和一个千兆以太网接口，支持 MDI-X 自动检测。设备具有两个或三个 RP-SMA 接头，用于连接外置天线（取决于型号）。设备包装内附有 24 V 电源适配器、PoE 供电器和两个安装环。共有四种型号可供选择——两款三链设备（带 miniPCIe 插槽和不带），以及两款双链型号（带 miniPCIe 插槽和不带）。在这种情况下，设备上还留有额外的位置用于安装更多 RP-SMA 接头。

## 快速开始 {#quickstart}

- 使用以太网线将设备连接到随附 PoE 供电器的 data+power 端；
- 将 PoE 供电器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 供电器；
- 通过 Web 浏览器使用 **WebFig** 或 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）配置设备。**提供多种配置方法以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后点击 MAC 地址。用户名为 "**admin**"，无密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 网桥上已启用 DHCP Client；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet, CPE" 菜单中设置以下内容：选择您所在的国家/地区，以应用国家/地区法规设置；
- 根据所使用的天线设置天线增益；
- 在底部字段中设置路由器密码。

## 安装 {#mounting}

NetMetal 设计用于户外使用，可安装在立柱或 DIN 导轨上。

安装时，请确保线缆进线口朝下。本设备的 IP 防护等级为 IP66。我们建议使用 Cat6 屏蔽网线。警告！本设备安装和运行时，设备与身体之间应保持至少 20 cm 的距离。在住宅环境中运行本设备可能导致无线电干扰。本设备的安装和配置应由合格人员完成。包装内附有安装软管卡箍。

![](/img/888d0d7f203dd8db.webp)

- 将软管卡箍穿过设备背面的开口。
- 固定到立柱或桅杆上。
- 使用 HEX3 螺丝刀通过软管卡箍螺丝对齐并固定。
- 设备应始终以 TOP 盖朝上的方式放置。

![](/img/f15a01cb176e5195.webp)

- 安装在 DIN 导轨上时，请在包装中找到专用支架，并用四颗螺丝将其固定到设备背面。

![](/img/40aa019a9c63ef9b.webp)

- 装上安装支架后，即可将设备滑入 DIN 导轨。

## 供电 {#powering}

以太网端口接受 8-30 V DC 的无源 Power over Ethernet 供电。包装内包含一个 24 V 适配器和一台 PoE 供电器。设备在 24 V 下的最大功耗为 21 W。

## 配置 {#configuration}

设备已配置为网桥模式，所有接口均已加入网桥并启用了 DHCP Client。RouterOS 除本文档所述内容外还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问均被阻止）。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 内置 5GHz 802.11ac/a/n 无线，支持 AP/station/bridge 模式（用于 CPE、AP、PtP 模式）
- 一个 10/100/1000 千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通线或交叉线连接其他网络设备。以太网端口接受来自无源 PoE 供电器的 8-30 V DC 供电。
- 一个 USB 2.0 或 3.0 端口（取决于型号），用于额外存储或 3G/4G 调制解调器

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAPs 模式，以便通过 CAPsMAN 服务器管理该设备（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列在 /system resource 中。其他操作系统尚未经过测试。我们建议点击 "Check for updates" 按钮，将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处理，例如送至指定的废弃物处理场所。请了解您所在地区将设备正确运送至指定处理场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制要求。这些限制旨在为商业安装环境提供合理的有害干扰防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在住宅区域运行本设备很可能造成有害干扰，此时用户需要自行承担费用来纠正干扰。

FCC 警告：未经负责合规方明确批准的任何更改或修改，可能会导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。其运行需满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。

注意：本设备在外围设备上使用屏蔽线缆进行了测试。为确保合规，必须使用屏蔽线缆连接本设备。

天线安装警告：安装人员有责任确保在美国（或适用 FCC 规则的地区）使用经授权的天线时，仅使用经产品认证的天线。安装人员应根据国家/地区法规和天线类型配置天线的输出功率水平。带接头的设备需要由专业人员安装，以确保符合健康与安全要求。

认可天线表：

<table><thead><tr><th>天线型号</th><th>类型</th><th>天线增益，dBi</th></tr></thead><tbody><tr><td>**UNII-1 (5150-5250 MHz) 和 UNII-3 (5725-5850MHz)**</td><td></td><td></td></tr><tr><td>MT-482016/N/A</td><td>全向</td><td>8.5</td></tr><tr><td>PA58-24-ANT</td><td>面板</td><td>24</td></tr><tr><td>HDDA5W-32-DP2</td><td>碟形</td><td>32</td></tr><tr><td>**UNII-2A (5250-5350 MHz) 和 UNII-2C (5470-5725MHz)**</td><td></td><td></td></tr><tr><td>HGO-antenna-OUT</td><td>全向</td><td>7</td></tr><tr><td>MTAS-5G-19D120</td><td>扇形</td><td>19</td></tr></tbody></table>

**与上表所列天线相同类型且增益更低的天线也可根据认证使用。*

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学与经济发展部豁免许可 RSS 的豁免许可发射器/接收器。其运行需满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

在 5150–5250 MHz 频段运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

天线安装警告：安装人员有责任确保在加拿大（或适用 IC 规则的地区）使用经授权的天线时，仅使用经产品认证的天线。安装人员应根据国家/地区法规和天线类型配置天线的输出功率水平。带接头的设备需要由专业人员安装，以确保符合健康与安全要求。

认可天线表：

<table><thead><tr><th>天线型号</th><th>类型</th><th>天线增益，dBi</th></tr></thead><tbody><tr><td>**UNII-1 (5150-5250 MHz) 和 UNII-3 (5725-5850MHz)**</td><td></td><td></td></tr><tr><td>MT-482016/N/A</td><td>全向</td><td>8.5</td></tr><tr><td>PA58-24-ANT</td><td>面板</td><td>24</td></tr><tr><td>HDDA5W-32-DP2</td><td>碟形</td><td>32</td></tr><tr><td>**UNII-2 (5250-5350 MHz) 和 UNII-2-Extended (5490-5600 MHz, 5650-5730 MHz)**</td><td></td><td></td></tr><tr><td>HGO-antenna-OUT</td><td>全向</td><td>7</td></tr><tr><td>MTAS-5G-19D120</td><td>扇形</td><td>19</td></tr></tbody></table>

**与上表所列天线相同类型且增益更低的天线也可根据认证使用。*

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный диапазон</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*Доступные частотные каналы могут различаться в зависимости от модели продукта и сертификации.

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

Робоча частота (Максимальна вихідна потужність): 5150-5250 МГц (23 дБм), 5250-5350 МГц (20 дБм), 5470-5725 МГц (27 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WLAN {#wlan}

<table><thead><tr><th>Operating Frequency / Maximum output power Betriebsfrequenz / maximale Ausgangsleistung Fréquence de fonctionnement / puissance de sortie maximale Frequenza operativa / massima potenza di uscita Frecuencia de funcionamiento / potencia de salida máxima Рабочая частота / максимальная выходная мощность</th><th>5470-5725 MHz / 27 dBm</th></tr></thead></table>

本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限制。有关更多详细信息，请参阅上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen Sendeleistungsgrenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben in der Konformitätserklärung. Nähere Informationen finden Sie oben in der Konformitätserklärung / Cet appareil MikroTik respecte les limites de puissance TX maximale via les réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik soddisfa i limiti di potenza massima TX tramite le normative ETSI. Per informazioni più dettagliate consultare la Dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia TX a través de las normas ETSI. Para obtener información más detallada, consulte la Declaración de conformidad anterior / Это устройство MikroTik соответствует ограничениям максимальной мощности передачи согласно правилам ETSI. Для получения более подробной информации см. Декларацию соответствия выше.
