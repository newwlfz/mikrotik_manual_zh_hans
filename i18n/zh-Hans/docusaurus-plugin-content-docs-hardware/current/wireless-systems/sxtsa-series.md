---
title: "SXTSA 系列"
slug: /sxtsa-series
source: https://manual.mikrotik.com/hardware/sxtsa-series
captured_at: '2026-11-04T10:04:58+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/c1df2084a462a484.webp)

## [SXTsq 5 ac](https://mikrotik.com/product/sxtsq_5_ac) (RBSXTsqG-5acD) {#sxtsq-5-ac-rbsxtsqg-5acd}

**SXT 系列：SXT SA5、SXT SA5 ac** SXT 是一款室外无线路由器，可在 PtM 部署中作为 CPE 使用，也可用于点对点链路。请确保设备安装正确，线缆应垂直朝下。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 在任意墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于安装在室外的立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和配件，这些电源和配件可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请将其断电。最快的断电方式是从电源插座上拔下电源插头。
- 客户有责任遵守当地国家法规，包括在合法频段内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。
- 本设备为 A 类设备。在居住环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施。

## 组装与安装 {#assembly-and-mounting}

将卡扣朝前，把安装支架滑入机壳底部的导轨中，直到卡扣咔哒一声卡入到位。SXT 随附喉箍，将喉箍穿过支架上的开口并环绕将安装的立杆。对准完成后拧紧喉箍螺钉。另有两个螺孔，用于额外防止支架意外移动。SXT 设备有一个滑动门，以太网端口和复位跳线位于门后。该门也可以用螺钉拧入预留的螺孔中固定关闭。

## 快速开始 {#quickstart}

- 打开以太网门，将以太网线连接到以太网端口，再将以太网线的另一端连接到随附的 PoE 供电器。
- 用以太网线将设备连接到随附 PoE 供电器的数据+电源端；
- 将 PoE 供电器的数据端连接到计算机；
- 将电源适配器连接到 PoE 供电器；
- 通过 **WebFig** 或 **WinBox** 工具使用网页浏览器配置您的设备，地址为 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 即可访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后点击 MAC 地址。用户名为 "**admin**"，无密码（或者，对于某些型号，请在标签上查看用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 供电 {#powering}

本设备仅接受来自无源 PoE 供电器的 8-32 V 电源（随附一个电源和一个 PoE 供电器）。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个以太网口（10/100 Mbit 或千兆，取决于型号），支持自动交叉/直通线缆纠正（Auto MDI/X），因此您可以使用直通线或交叉线连接其他网络设备。
- 一个集成无线模块，配备内置定向天线，最大增益 16 dBi。

## 按钮和跳线 {#buttons-and-jumpers}

routerBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置并恢复默认值。
- 当 LED 熄灭（约 20 秒）后松开按钮，可使设备查找 Netinstall 服务器（通过网重新安装 RouterOS 时必需）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。设备在以太网端口门后有一个接地连接（根据型号不同，为螺钉或金属环），您应将其连接到设备使用所在塔架或建筑的接地装置。这可以大幅降低 ESD 和雷击损坏的风险。

## 操作系统支持 {#operating-system-support}

本设备仅支持版本号等于或高于 RouterOS 菜单 /system resource 中所标示版本的 RouterOS 软件。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废弃物处置场所。请了解您所在地区将设备正确运送到指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBSXTG-5HPnD-SAr2</td><td>TV7SXTG-5HPND</td></tr><tr><td>RBSXTG-5HPacD-SAr2</td><td>TV7SXTG-5HACD</td></tr></tbody></table>

***型号 RBSXTG-5HPnD-SAr2（SXT SA5）：***

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则建议用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。**重要：射频辐射暴露。** 天线与用户之间必须保持至少 75 cm 的距离。在此配置下，可满足 FCC 针对人群/非受控环境规定的辐射暴露限值。

***型号 RBSXTG-5HPacD-SAr2（SXT SA5 ac）：***

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在居住区操作本设备很可能造成有害干扰，此时用户将被要求自费纠正干扰。

**重要：射频辐射暴露。** 天线与用户之间必须保持至少 20 cm 的距离。在此配置下，可满足 FCC 针对人群/非受控环境规定的辐射暴露限值。

**FCC 警告：** 任何未经合规负责方明确批准的更改或修改，都可能导致用户操作本设备的权限失效。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受所接收到的任何干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共址放置或协同工作。

**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地方）使用授权天线时，仅使用经本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，明确禁止使用任何未随本产品认证的天线。安装人员应根据国家法规并按照天线类型配置天线的输出功率级别。带连接器的设备必须由专业人员安装，以确保符合健康和安全要求。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBSXTG-5HPnD-SAr2</td><td>7442A-SXTG5HPND</td></tr><tr><td>RBSXTG-5HPacD-SAr2</td><td>7442A-SXTG5HACD</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，并且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

***型号 RBSXTG-5HPnD-SAr2（SXT SA5）：***

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露**。天线与用户之间必须保持至少 33 cm 的距离。在此配置下，可满足 FCC 针对人群/非受控环境规定的辐射暴露限值。

***型号 RBSXTG-5HPacD-SAr2（SXT SA5 ac）：***

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

**重要：射频辐射暴露。** 天线与用户之间必须保持至少 22 cm 的距离。在此配置下，可满足 FCC 针对人群/非受控环境规定的辐射暴露限值。

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

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

Робоча частота (Максимальна вихідна потужність): 5470-5725 МГц (27 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用无任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家法规，包括在合法频段内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。如需更详细的信息，请参阅上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen WLAN- Sendeleistung Grenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben unter Konformitätserklärung / Cet appareil MikroTik respecte les limites maximales de puissance de transmission WLAN conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti massimi di potenza di trasmissione WLAN in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia de transmisión WLAN de acuerdo con las regulaciones ETSI. Para obtener más información, consulte la declaración de conformidad anterior / Это устройство MikroTik соответствует максимальным пределам мощности передачи WLAN в соответствии с правилами ETSI. Для получения дополнительной информации см. Декларацию соответствия выше.
