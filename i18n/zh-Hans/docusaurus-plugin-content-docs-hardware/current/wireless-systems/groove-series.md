---
title: "Groove 系列"
slug: /groove-series
source: https://manual.mikrotik.com/hardware/groove-series
captured_at: '2026-11-04T09:48:58+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **[Groove 52](https://mikrotik.com/product/RBGroove52HPnr2)**
- **[GrooveA 52](https://mikrotik.com/product/RBGrooveA-52HPnr2)** (RBGrooveA-52HPn)
- **[GrooveA 52 ac](https://mikrotik.com/product/RBGrooveGA-52HPacn)** (RBGrooveGA-52HPacn)
:::

![](/img/dd1382a945374619.jpg)

RouterBOARD Groove 预装在室外机壳中，内置无线接口、一个 N-Male 天线接头，以及一个支持 MDI-X 自动检测的 10/100 以太网接口。设备包装内附带 24 V 电源适配器、一个 PoE 注入器和两个安装环。有多种型号可供选择（双频、单频、AP 和 CPE 版本）。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计为安装在室外的立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和配件，这些均可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行应与您的身体、职业用户或公众保持不少于 20 厘米的距离。

## 快速开始 {#quickstart}

Groove 接受来自 PoE 注入器的 8-30 V 无源 PoE。随附的注入器应将 "Data" 端连接到交换机或其他路由器，"Data + Power" 端口则应通过所需长度（不随附）的以太网线缆连接到 Groove。

请按照以下快速步骤设置您的设备：

- 在连接电源之前，将随附的天线安装到设备上；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 之外的任意端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；有多种配置方式可确保可访问性；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 **WebFig**，或使用位于 [https://mt.lv/WinBox](https://mt.lv/WinBox) 的 "**WinBox**" 配置工具；
- 使用默认 IP 地址 192.168.88.1 在所选的工具中开始配置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 单击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您所在的国家/地区，以应用该国家/地区的法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 供电 {#powering}

设备可通过以太网端口（无源 PoE）供电。在最大负载下，本设备的功耗为 4 W。

## 安装 {#mounting}

设备应垂直安装，使以太网线缆朝下。如果您希望将 Groove 固定在立杆上，可以使用随附的安装环。Groove 随附两个安装环——将安装环穿过所提供的边缘标记绕过 Groove，并绕过将要安装的立杆。应避免将松弛的以太网线缆连接到以太网端口，并应将线缆固定在墙壁或立杆上，以免线缆的重量拉扯端口。建议在距 Groove 设备小于 2m 的位置固定以太网线缆。这是为了确保线缆不会因自身重量损坏端口，也不会脱落。

## 配置 {#configuration}

AP 型号的 Groove (A) 配置为无线接入点，以太网端口配置为 DHCP 客户端，用于连接到您的 ISP 路由器或交换机。无线接口上配置了 DHCP 服务器。CPE 型号的 Groove 配置为客户端，以太网端口配置为 DHCP 服务器。除本文档所述内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问均被阻止）。

## 重置按钮 {#reset-button}

重置按钮有三项功能：• 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（总计 5 秒）。• 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAPs 模式，以便通过 CAPsMAN 服务器管理该设备（总计 10 秒）。• 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总计 15 秒）。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处理，例如送至指定的废弃物处理场所。请了解您所在地区将设备正确运送到指定处理场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>Groove 52</td><td>TV7GRV-A52HPN</td></tr><tr><td>GrooveA 52</td><td>TV7GRV-A52HPN</td></tr><tr><td>GrooveA 52 ac</td><td>TV7GRV-A52HPC</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装环境中的有害干扰提供合理的防护。

但是，并不保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来判断），则建议用户尝试通过以下一种或多种措施来消除干扰：

- 调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助 **FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。其操作须满足以下两个条件：(1) 本设备不得造成有害干扰，(2) 本设备必须接受任何接收到的干扰，包括可能导致非预期操作的干扰。

注意：本设备已使用外围设备的屏蔽线缆进行了测试。为确保合规，本设备必须使用屏蔽线缆。

**天线安装警告**：安装者有责任确保在美国（或适用 FCC 规则的地区）使用经认可的天线时，仅使用经该产品认证的天线。安装者应根据国家法规并按天线类型配置天线的输出功率水平。带有接头的设备需要由专业人员安装，以确保符合健康与安全要求。

**认可的 2.4 GHz 天线清单：**

-

15 dBi 全向天线（型号：WLO-2450-15）

-

13 dBi 全向 HP 天线（型号：ODH 24-13）

-

20 dBi 平板天线（型号：WLP-2450-20）

-

17 dBi 扇区天线（型号：SA 24-90-17-WB）

-

24 dBi 碟形天线（型号：DC 24-HD-PFIP）**认可的 5 GHz 天线清单：**

-

8.5 dBi 全向天线（型号：MT-482016/N/A）

-

24 dBi 平板天线（型号：PA58-24-ANT）

-

32 dBi 碟形天线（型号：HDDA5W-32-DP2）在获得认证的前提下，也可以使用与上述型号相同类型且增益更低的天线。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>Groove 52</td><td>7442A-GRVA52HPN</td></tr><tr><td>GrooveA 52</td><td>7442A-GRVA52HPN</td></tr><tr><td>GrooveA 52 ac</td><td>7442A-GRVA52HPC</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 标准的免许可发射器/接收器。其操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

工作在 5150–5250 MHz 频段的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

天线安装警告：安装者有责任确保在加拿大（或适用 IC 规则的地区）使用经认可的天线时，仅使用经该产品认证的天线。安装者应根据国家法规并按天线类型配置天线的输出功率水平。带有接头的设备需要由专业人员安装，以确保符合健康与安全要求。

**认可的 2.4 GHz 天线清单：**

-

15 dBi 全向天线（型号：WLO-2450-15）

-

13 dBi 全向 HP 天线（型号：ODH 24-13）

-

20 dBi 平板天线（型号：WLP-2450-20）

-

17 dBi 扇区天线（型号：SA 24-90-17-WB）

-

24 dBi 碟形天线（型号：DC 24-HD-PFIP）**认可的 5 GHz 天线清单：**

-

8.5 dBi 全向天线（型号：MT-482016/N/A）

-

24 dBi 平板天线（型号：PA58-24-ANT）

-

32 dBi 碟形天线（型号：HDDA5W-32-DP2）在获得认证的前提下，也可以使用与上述型号相同类型且增益更低的天线。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный диапазон</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*Доступные частотные каналы могут различаться в зависимости от модели продукта и сертификации.

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用信道可能因型号和产品认证而异。

认证证书编号 (IFT)：请参阅产品标签。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

Робоча частота (Максимальна вихідна потужність): 2400-2483.5 МГц (20 дБм), 5150-5250 МГц (23 дБм), 5250-5350 МГц (20 дБм), 5470-5725 МГц (27 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相应型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。如需更详细的信息，请参见上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen Sendeleistungsgrenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben in der Konformitätserklärung. Nähere Informationen finden Sie oben in der Konformitätserklärung / Cet appareil MikroTik respecte les limites de puissance TX maximale via les réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik soddisfa i limiti di potenza massima TX tramite le normative ETSI. Per informazioni più dettagliate consultare la Dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia TX a través de las normas ETSI. Para obtener información más detallada, consulte la Declaración de conformidad anterior / Это устройство MikroTik соответствует ограничениям максимальной мощности передачи согласно правилам ETSI. Для получения более подробной информации см. Декларацию соответствия выше.

![](/img/0561b3ba8c95a35c.webp)

在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。 / Die WLAN-Funktion dieses Geräts ist nur für die Verwendung in Innenräumen im Frequenzbereich 5150 bis 5350 MHz beschränkt. / La fonction WLAN de cet appareil est limitée à une utilisation en intérieur uniquement lorsqu'il fonctionne dans la gamme de fréquences 5150 à 5350 MHz. / La funzione WLAN per questo dispositivo è limitata all'uso interno solo quando si opera nella gamma di frequenza da 5150 a 5350 MHz. / La función WLAN para este dispositivo está restringida al uso en interiores solo cuando se opera en el rango de frecuencia de 5150 a 5350 MHz. / Функция WLAN для этого устройства ограничена использованием внутри помещения только при работе в диапазоне частот от 5150 до 5350 МГц.
