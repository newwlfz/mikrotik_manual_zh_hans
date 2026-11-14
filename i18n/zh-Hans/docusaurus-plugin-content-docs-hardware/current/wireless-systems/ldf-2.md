---
title: "LDF 2"
slug: /ldf-2
source: https://manual.mikrotik.com/hardware/ldf-2
captured_at: '2026-11-04T09:53:28+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/6c7660fdb10c5220.webp)

## [LDF 2](https://mikrotik.com/product/ldf_2) (RBLDF-2nD) {#ldf-2-rbldf-2nd}

LDF（Lite dish feed）是一款带有内置天线的室外无线系统，设计用于安装在卫星偏馈天线上。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行处理。
- 在任意墙面上安装接入点的所有安装方式均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于在室外立杆上安装。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能对人员造成危险情况并损坏系统。
- 仅使用制造商认可并在本产品原包装中提供的电源和配件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备出现故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 遵循当地国家法规是客户的责任，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行距离，与您的身体、职业使用者或公众不得小于 20 厘米。

## 组装 {#assembly}

本设备兼容常用于卫星电视的标准偏馈天线。偏馈支架为通用的 40 mm 直径，LDF 可以轻松放入其中。要将以太网线连接到 LDF 设备，请按以下步骤操作：

- 按图示组装所有组件。如果使用成品线缆，请在一侧切开橡胶密封圈，将其套到线缆上。自行压接的线缆应在密封圈套到线缆上之后再进行压接；
- 将以太网线连接到 LDF 上的以太网接口；
- 顺时针旋转，将外壳螺母安装到 LDF 主体上；
- 将橡胶密封圈滑入外壳螺母，然后顺时针旋转压紧螺母，密封防水接头。

![](/img/4697c94b5539fc15.webp)

## 在天线上组装 {#assembling-on-dish}

请确保按右图所示将 LDF 设备安装在偏馈支架上的正确位置。设备应朝上对着天线。

![](/img/28d101453837d87d.webp)

![](/img/1a2a13170697f321.webp)

天线将作为反射器，放大信号。组件的最终位置应按左图所示放置并安装到立杆或墙壁上。

## 安装 {#mounting}

本设备的 IP 防护等级为 IP54。本设备设计用于室外使用，请确保所有线缆开口朝下。请使用带 Cat6 线缆的 PoE 供电器。安装基础设施（塔架和桅杆）以及路由器本身都必须正确接地。

*本设备的安装和配置应由具备资质的人员完成。* *警告！本设备的安装和运行应保持设备与身体之间的最小距离为 40 厘米。在住宅环境中运行本设备可能造成无线电干扰。*

## 供电 {#powering}

本设备接受来自无源 PoE 供电器的 10-28 V ⎓ DC 输入。本设备不能与符合 IEEE802.3af 的 48 V 供电器配合使用。包装内含一个 PoE 供电器。最大功耗为 7 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 使用以太网线将设备连接到附带的 PoE 供电器的 data+power 端；
- 将 PoE 供电器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 供电器；
- 通过 **WebFig** 或 **WinBox** 工具（[https://mt.lv/WinBox](https://mt.lv/WinBox)）使用网页浏览器配置您的设备；提供多种配置方式以确保可访问性；
- 打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 标签页，然后点击 MAC 地址。用户名为 "**admin**"，密码为空（某些型号请在贴纸上查看用户名和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保最佳的性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳的性能和稳定性。对于无线型号，请确保已选择设备将要使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始了解各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下所有来自 Internet 端口的访问均被阻止）。出于恢复目的，可以启动设备进行重新安装，请参阅相关章节。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 集成 2.4 GHz、802.11b/g/n 无线。
- 一个以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）；
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备将开始查找 CAPsMAN 服务器（共 10 秒）；
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）；无论使用上述哪种方式，如果在设备通电前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。这可用于 RouterBOOT 调试和恢复。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/ldf_2](https://mikrotik.com/product/ldf_2)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废物处置场所。请了解您所在地区将设备正确运输至指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBLDF-2nD</td><td>TV7LDF2ND</td></tr></tbody></table>

本设备经测试，被认定符

![](/img/ce6fc3eb10b9a1e6.webp)

合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装中的有害干扰提供合理防护。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再打开设备来确定），则建议用户尝试通过以下一种或多种措施来消除干扰：

-

重新调整接收天线的方向或位置。

-

增大设备与接收器之间的距离。

-

将设备连接到与接收器所连接电路不同的插座上。

-

咨询经销商或有经验的无线电/电视技术人员以获得帮助。FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分的要求。运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致不良运行的干扰。本设备及其天线不得与其他任何天线或发射器位于同一位置或联合运行。**重要：射频辐射暴露。** 天线与职业使用者之间必须保持至少 20 厘米的距离。在此配置下，可满足 FCC 针对人群/非受控环境规定的辐射暴露限值。**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用通过本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，严禁使用除本产品认证天线以外的任何天线。安装人员应根据国家/地区法规和天线类型配置天线的输出功率水平。带连接器的设备必须由专业人员安装，以确保符合健康与安全要求。认可的天线列表：

-

25 dBi 碟形天线，Winegard 型号：DS2076

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBLDF-2nD</td><td>7442A-LDF2ND</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。运行须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备不良运行的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement. Cet equipement est conforme aux limites d'exposition au rayonnement IC definies pour un environnement non controle. Cet equipement doit etre installe et utilise a une distance minimale de 40 cm entre le radiateur et toute partie de votre corps.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**本无线电发射器 7442A-LDF2ND 已获加拿大创新、科学和经济发展部批准，可与下列天线类型配合使用，并注明了最大允许增益。未列入此清单且增益大于所列任何类型最大增益的天线类型，严禁与本设备配合使用。** 认可的天线列表：

- 25 dBi 碟形天线，Winegard 型号：DS2076 **重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行应保持辐射体与您身体任何部位之间的最小距离为 20 厘米。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный каналы</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>2400-2483.5 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*Доступные частотные каналы могут различаться в зависимости от модели продукта и сертификации.

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息领域监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

Робоча частота (Максимальна вихідна потужність): 2412-2472 МГц (20 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

Mikrotīkls SIA 特此声明，无线电设备类型 RBLDF-2nD 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用型号）**</th><th>**使用的信道**</th><th>**最大输出功率 (EIRP)**</th><th>**限制**</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

**遵循当地国家法规是客户的责任，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参阅上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen WLAN- Sendeleistung Grenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben unter Konformitätserklärung / Cet appareil MikroTik respecte les limites maximales de puissance de transmission WLAN conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti massimi di potenza di trasmissione WLAN in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia de transmisión WLAN de acuerdo con las regulaciones ETSI. Para obtener más información, consulte la declaración de conformidad anterior / Это устройство MikroTik соответствует максимальным пределам мощности передачи WLAN в соответствии с правилами ETSI. Для получения дополнительной информации см. Декларацию соответствия выше.
