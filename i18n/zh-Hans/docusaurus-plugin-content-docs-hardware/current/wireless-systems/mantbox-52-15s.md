---
title: "MANTBox 52 15s"
slug: /mantbox-52-15s
source: https://manual.mikrotik.com/hardware/mantbox-52-15s
captured_at: '2026-11-04T09:56:02+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/21d1564b6a37c38a.webp)

## [mANTBox 52 15s](https://mikrotik.com/product/mantbox_52_15s) (RBD22UGS-5HPacD2HnD-15S) {#mantbox-52-15s-rbd22ugs-5hpacd2hnd-15s}

mANTBox 52 15s。有关完整规格和宣传册，请参阅 [MANTBox 52 15s 产品页面](https://mikrotik.com/product/mantbox_52_15s)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 在将系统连接到电源之前，请阅读安装说明。
- 本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责就安装的结构完整性向当地主管部门/检验部门取得任何所需的当地或国家安全检查。
- 将接入点安装在任何墙面上的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计为安装在户外的立柱上。开始安装前请仔细阅读安装说明。
- 未使用正确的硬件和配置，或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险。
- 本设备需要升级到 RouterOS v6.46 或最新版本，以确保符合当地主管部门的规定。

**射频辐射暴露：**本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境设定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业用户或普通公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

- 打开盖子；
- 使用以太网线将设备连接到随附 PoE 注入器的 data+power 端；
- 将 PoE 注入器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 通过 Web 浏览器使用 **WebFig** 或位于 [https://mt.lv/WinBox](https://mt.lv/WinBox) 的 **WinBox** 工具来配置您的设备；**提供多种配置方法以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 即可访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后点击 MAC 地址。用户名为“**admin**”，密码为空（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击“Check for updates”按钮，将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡并具有活动的 Internet 连接；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在“Downloads”部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的“**Files**”菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

设备可通过以下方式供电：

- 以太网端口支持 802.3af/at PoE 12-57 V DC ⎓。
- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）支持 12-57 V DC⎓。最大负载下的功耗可达 21 W。

## 安装 {#mounting}

mANTbox 随附一个 QuickMount 适配器，可使用随附的螺丝将其固定到墙上，或使用随附的金属安装环将其固定到立柱上。QuickMount 允许对设备进行水平和垂直调节。

- 将快速安装支架固定到设备背面。

![](/img/6d8362fa9f81276e.webp)

- 将设备固定到立柱上，并用随附的钢制卡箍将其固定。卡箍直径 35 – 70 mm。

![](/img/006d6b97c4c91436.webp)

- 请避免将松动的以太网线连接到以太网端口，应将线缆固定在墙上或立柱上，以免线缆的重量拉扯端口。建议在距设备 2m 以内固定以太网线。这是为了确保线缆不会因其重量损坏端口，也不会脱落。我们建议使用 Cat6 屏蔽线缆。警告！本设备的安装和运行应保持设备与人体之间的最小距离为 25 cm。在住宅环境中使用本设备可能会造成无线电干扰。

## 配置 {#configuration}

我们建议点击“Check for updates”按钮，并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议访问 RouterOS 文档页面以熟悉各种可能：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 internet 端口的所有访问均被阻止）。

首次配置 [https://mt.lv/configuration](https://mt.lv/configuration)；

设备升级 [https://mt.lv/upgrade](https://mt.lv/upgrade)；

## 接地 {#grounding}

安装基础设施（塔架和桅杆）以及路由器本身必须正确接地。设备在机壳门后有一个接地线连接螺丝。将接地线连接到接地螺丝，然后将接地线的另一端连接到已接地的桅杆。这可大幅降低静电放电和雷击损坏的风险。

![](/img/9d368495fcc09e4b.webp)

设备包含一个接地连接（标记为 ⏚）。

## 打开盖子 {#opening-cover}

要打开盖子，请用手逆时针转动松不脱螺丝并将其提起。

![](/img/c9aa40a174a2b89d.webp)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 内置 5 GHz 和 2.4 GHz 无线接口。
- 一个 SFP 端口，用于 1.25GBit 模块，支持 DDMI。
- 千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有以下功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备将开始寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，让 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电前按住按钮，系统将加载备份 RouterBOOT 引导程序。这对 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含以下随设备附带的配件：

- 开关电源 DC ⎓ 24 V；
- 卡箍，35-70 mm；
- 紧固套件 K-41；
- 带屏蔽接头的千兆 POE 注入器线缆；
- 安装支架。请参阅 [MikroTik SFP 模块兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处理，例如送到指定的废物处置场。请了解您所在地区将设备正确运送到指定处置场的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBD22UGS-5HPacD2HnD-15S</td><td>TV7D2352AC</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在住宅区域运行本设备很可能会造成有害干扰，在这种情况下，用户将需要自费纠正这种干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。其运行受以下两个条件的约束：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。

注意：本设备在测试时外围设备使用了屏蔽线缆。为确保合规，必须使用屏蔽线缆与本设备配合。

**天线安装警告**：安装人员有责任确保在美国（或适用 FCC 规则的地区）使用经授权的天线时，仅使用经本产品认证的天线。安装人员应根据国家法规和天线类型配置天线的输出功率水平。带接头的设备需要由专业人员安装，以确保符合健康和安全要求。

**经批准的 2.4 GHz 天线列表：**

3.6 dBi 偶极天线（型号：HGO-antenna-OUT）

5 dBi 偶极天线 HP（型号：DA-2450-05RP-SMA-01 (ACOMNIRPSMA)）

**经批准的 5 GHz 天线列表：**

6.68 dBi 偶极天线（型号：HGO-antenna-OUT）

19 dBi 扇区天线（型号：MTAS-5G-19D120）

30 dBi 抛物面天线（型号：MTAS-5G-30D3）

在符合认证的前提下，也可以使用与上述相同类型且增益更低的天线。

**重要：射频辐射暴露。**本设备符合 FCC 针对非受控环境设定的辐射暴露限值。本设备的安装和运行应保持辐射体与身体任何部位之间的最小距离为 20 cm。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBD22UGS-5HPacD2HnD-15S</td><td>7442A-D2352AC</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。其运行受以下两个条件的约束：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

在 5150–5250 MHz 频段运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

**天线安装警告：**安装人员有责任确保在加拿大（或适用 IC 规则的地区）使用经授权的天线时，仅使用经本产品认证的天线。安装人员应根据国家法规和天线类型配置天线的输出功率水平。带接头的设备需要由专业人员安装，以确保符合健康和安全要求。

**经批准的 2.4 GHz 天线列表：**

3.6 dBi 偶极天线（型号：HGO-antenna-OUT）

5 dBi 偶极天线 HP（型号：DA-2450-05RP-SMA-01(ACOMNIRPSMA)）

**经批准的 5 GHz 天线列表：**

6.68 dBi 偶极天线（型号：HGO-antenna-OUT）

19 dBi 扇区天线（型号：MTAS-5G-19D120）

30 dBi 抛物面天线（型号：MTAS-5G-30D3）

在符合认证的前提下，也可以使用与上述相同类型且增益更低的天线

**重要：射频辐射暴露。**本设备符合 IC 针对非受控环境设定的辐射暴露限值。本设备的安装和运行应保持辐射体与身体任何部位之间的最小距离为 20 cm。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный каналы</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*Доступные частотные каналы могут различаться в зависимости от модели продукта и сертификации.

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

Робоча частота (Максимальна вихідна потужність): 2400-2483.5 МГц (20 дБм), 5150-5250 МГц (23 дБм), 5250-5350 МГц (20 дБм), 5470-5725 МГц (27 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBD22UGS-5HPacD2HnD-15S 符合 2014/53/EU 指令。EU 符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均不受任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参阅上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen WLAN Sendeleistung Grenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben unter Konformitätserklärung / Cet appareil MikroTik respecte les limites maximales de puissance de transmission WLAN conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti massimi di potenza di trasmissione WLAN in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia de transmisión WLAN de acuerdo con las regulaciones ETSI. Para obtener más información, consulte la declaración de conformidad anterior / Это устройство MikroTik соответствует максимальным пределам мощности передачи WLAN в соответствии с правилами ETSI. Для получения дополнительной информации см. Декларацию соответствия выше.

![](/img/0561b3ba8c95a35c.webp)

在 5150 至 5350 MHz 频率范围内运行时，本设备的 WLAN 功能仅限室内使用。 / Die WLAN-Funktion dieses Geräts ist nur für die Verwendung in Innenräumen im Frequenzbereich 5150 bis 5350 MHz beschränkt. / La fonction WLAN de cet appareil est limitée à une utilisation en intérieur uniquement lorsqu'il fonctionne dans la gamme de fréquences 5150 à 5350 MHz. / La funzione WLAN per questo dispositivo è limitata all'uso interno solo quando si opera nella gamma di frequenza da 5150 a 5350 MHz. / La función WLAN para este dispositivo está restringida al uso en interiores solo cuando se opera en el rango de frecuencia de 5150 a 5350 MHz. / Функция WLAN для этого устройства ограничена использованием внутри помещения только при работе в диапазоне частот от 5150 до 5350 МГц.
