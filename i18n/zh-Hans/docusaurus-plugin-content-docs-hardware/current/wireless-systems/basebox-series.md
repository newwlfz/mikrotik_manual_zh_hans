---
title: "BaseBox 系列"
slug: /basebox-series
source: https://manual.mikrotik.com/hardware/basebox-series
captured_at: '2026-11-04T09:43:23+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/715fc30cd77673f2.jpg)

## [BaseBox 5](https://mikrotik.com/product/RB912UAG-5HPnD-OUT) (RB912UAG-5HPnD-OUT) {#basebox-5-rb912uag-5hpnd-out}

:::info 本文涵盖

- **[BaseBox 2](https://mikrotik.com/product/RB912UAG-2HPnD-OUT)** (RB912UAG-2HPnD-OUT)
- **[BaseBox 5](https://mikrotik.com/product/RB912UAG-5HPnD-OUT)** (RB912UAG-5HPnD-OUT)
- **[BaseBox 6](https://mikrotik.com/product/basebox_6)** (RB912UAG-6HPnD-OUT)

:::

Basebox 是一款坚固且防风雨的户外设备，基于 RB912 无线路由器型号。它具备高功率无线和 一个支持 MDI-X 自动检测的千兆以太网接口。该设备有两个 RPSMA 接口，用于连接外置天线。设备包装内附带电源适配器、PoE 注入器和两个安装环。在这种情况下，设备上还提供了更多 RP-SMA 接口的备用位置。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准操作规范。
- 本产品的最终处置应遵守所有国家法律法规。
- 设备的安装必须符合当地和国家电气规范。
- 本产品拟安装在户外立杆上。开始安装前，请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能对人员造成危险情况并损坏系统。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。

## 首次使用 {#first-use}

- 请选择您的供电解决方案，请参阅复位按钮。

## 扩展插槽和端口 {#extension-slots-and-ports}

BaseBox 2 型号 - 2.4 GHz，802.11b/g/n。

- BaseBox 5 型号 - 5 GHz，802.11a/n。
- BaseBox 6 型号 - 6 GHz，802.11a/n。
- 一个 10/100/1000 千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通线或交叉线连接其他网络设备。
- USB type-A 插槽。
- 一个 miniPCIe 插槽。*本设备可能与 R11e-LTE 国际版调制解调器不兼容。*

## miniPCI-e 插槽的使用 {#the-minipci-e-slot-usage}

- 取下顶盖；
- 拧下设备背面的两颗螺丝；

![](/img/e274298dd19ae257.webp)

- 打开以太网端口盖，并将其从设备底座中拔出；

![](/img/010c63866323c8b6.webp)

- 拧下天线接口；

![](/img/d01c9eb3d3c98f7f.webp)

- 将 PCB 板从底盖中取出；

![](/img/fa3c45a2c403db34.webp)

- 安装您的调制解调器并重新组装。

## 复位按钮 {#reset-button}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在会查找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都将加载备份 RouterBOOT 加载程序。这对 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未测试。

## 随附部件 {#included-parts}

![](/img/dec8180f44424e05.webp)

*DIN 安装件包含四颗螺丝，用于将其固定到设备背面。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备正确运输至指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装环境中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在住宅区域操作本设备可能会造成有害干扰，此时用户需自行承担费用来纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。本设备及其天线不得与其他任何天线或发射器位于同一位置或协同工作。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备安装和操作时，辐射体与您身体的任何部位之间应保持最小距离，请参阅下表。

<table><thead><tr><th>**型号**</th><th>**FCC ID**</th><th>**射频暴露最小安全距离**</th></tr></thead><tbody><tr><td>BaseBox 2</td><td>TV7RB912G-2HPND</td><td>142 cm</td></tr><tr><td>BaseBox 5</td><td>TV7RB912G-5HPNDM</td><td>375 cm</td></tr><tr><td>BaseBox 6</td><td>TV7RB912G-6HPND</td><td>375 cm</td></tr></tbody></table>

**天线安装警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地方）使用经授权的天线时，只能使用经本产品认证的天线。安装人员应根据国家法规和天线类型配置天线的输出功率水平。带有接口的设备需要由专业人员安装，以确保符合健康与安全要求。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可证 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-3 (A)/NMB-3(A)

在 5150–5250 MHz 频段内操作的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和操作时，辐射体与您身体的任何部位之间应保持最小距离，请参阅下表。Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé avec une distance minimale entre le radiateur et toute partie de votre corps, voir le tableau ci-dessous.

<table><thead><tr><th>**型号**</th><th>**IC**</th><th>**射频暴露最小安全距离**</th></tr></thead><tbody><tr><td>BaseBox 2</td><td>7442A-912G2HPND</td><td>142 cm</td></tr><tr><td>BaseBox 5</td><td>7442A-912G5HPNDM</td><td>378 cm</td></tr><tr><td>BaseBox 6</td><td>7442A-912G6HPNDM</td><td>378 cm</td></tr></tbody></table>

**天线安装警告：** 安装人员有责任确保在加拿大（或适用 IC 规则的地方）使用经授权的天线时，只能使用经本产品认证的天线。安装人员应根据国家法规和天线类型配置天线的输出功率水平。带有接口的设备需要由专业人员安装，以确保符合健康与安全要求。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный диапазон</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц, 6425-7100 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*Доступные частотные каналы могут различаться в зависимости от модели продукта и сертификации.

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

Для получения подробных сведений о гарантийном обслуживании обратитесь к продавцу.

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，且。
- 本设备必须接受任何干扰，包括可能导致其非预期运行的干扰。制造商：MikroTikls SIA, Unijas 2, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA, Вулиця Уніяс 2, Рига, Латвія, LV1039。

Робоча частота (Максимальна вихідна потужність): 2400-2483.5 МГц (20 дБм)5150-5250 МГц (23 дБм), 5250-5350 МГц (20 дБм), 5470-5725 МГц (27 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

![](/img/7182f05dc1a2f3bc.webp)

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Unijas iela 2, Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均不受任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参阅上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen WLAN- Sendeleistung Grenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben unter Konformitätserklärung / Cet appareil MikroTik respecte les limites maximales de puissance de transmission WLAN conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti massimi di potenza di trasmissione WLAN in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia de transmisión WLAN de acuerdo con las regulaciones ETSI. Para obtener más información, consulte la declaración de conformidad anterior / Это устройство MikroTik соответствует максимальным пределам мощности передачи WLAN в соответствии с правилами ETSI. Для получения дополнительной информации см. Декларацию соответствия выше.请在认证实验室中使用我们的设备测试您的天线，以符合欧盟规则。
