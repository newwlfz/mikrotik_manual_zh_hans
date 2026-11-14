---
title: "hAP ac3 LTE6 套件"
slug: /hap-ac3-lte6-kit
source: https://manual.mikrotik.com/hardware/hap-ac3-lte6-kit
captured_at: '2026-11-04T09:49:48+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/83624341ad069f13.webp)

## [hAP ac3 LTE6 kit](https://mikrotik.com/product/hap_ac3_lte6_kit) (RBD53GR-5HacD2HnD&R11e-LTE6) {#hap-ac3-lte6-kit-rbd53gr-5hacd2hndr11e-lte6}

hAP ac3 LTE6 kit 是一款简单的家用无线路由器。它开箱即可使用，您只需插入 SIM 卡即可开始使用无线互联网。完整规格和手册请参见 [hAP ac3 LTE6 kit 产品页面](https://mikrotik.com/product/hap_ac3_lte6_kit)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤可能会对人员造成危险并损坏系统。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置应距您的身体、职业用户或公众不少于 20 厘米。

- 客户有责任遵守当地国家法规，包括在合法频段内运行、发射功率、布线要求以及 Dynamic Frequency Selection (DFS) 要求。所有 MikroTik 无线电设备必须由专业人员安装。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 将 micro SIM 卡插入卡槽；
- 插入 SIM 卡后合上 SIM 端口盖，在设备通电时请勿取出卡片。

![](/img/21a144aae1e355f0.webp)

- 将设备连接到电源（参见 ""）；
- 在您的 PC、手机或其他设备上打开网络连接，搜索 MikroTik 无线网络并连接到它；
- 配置必须通过无线网络使用网页浏览器或移动应用完成 -（参见 ""）。或者，您可以使用 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。连接到无线网络后，在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始配置，用户名为 a*dmin*，默认没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 使用移动应用时，请选择 Quick setup，它将通过六个简单步骤引导您完成所有必要的配置；
- 点击右侧的 "Check for updates" 按钮，将您的 RouterOS 软件更新到最新版本，必须插入有效的 SIM 卡；
- 要个性化您的无线网络，可在 "Network Name" 字段中更改 SSID；
- 在屏幕左侧的 "Country" 字段中选择您所在的国家，以应用国家法规设置；
- 在 "WiFi Password" 字段中设置您的无线网络密码，密码必须至少为八个字符；
- 在右侧底部的 "Password" 字段中设置您的路由器密码，并在 "Confirm Password" 字段中重复输入，它将在下次登录时使用；
- 选择 "Apply Configuration" 保存更改。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您首选的 OS。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将已预先填入。
- 选择 Connect 以通过无线网络建立与设备的连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 供电 {#powering}

设备可通过适配器供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，正极针式插头）12-28 V DC⎓。最大负载下的功耗可达 16 W，连接附件时可达 22 W。

## 底板安装说明 {#base-plate-mounting-instruction}

- 底板随包装附带，组装请遵循以下说明。
- 将底板的尖端放入设备底部的壳体中，然后向下折。

![](/img/b08358f3fffd9cc3.webp)

- 用双手握住时，用手指轻轻按压并向下推，直到其锁定，请按照图示中的顺序操作。

![](/img/59f1995ab09b5790.webp)

## 配置 {#configuration}

登录后，您应在 QuickSet 菜单中选择 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将要使用的国家，以符合当地法规。除了本文档中描述的内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help)。如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下所有来自 Internet 端口的访问均被阻止）。为了恢复目的，可以让设备启动以进行重新安装，请参见相应章节。

## 安装 {#mounting}

本设备设计用于室内使用，可放置在平坦的表面上，所有需要的线缆均连接到设备的背面。

可以使用随附的螺丝将安装底座固定到墙上：

- 使用随附的螺丝将底座固定到墙上；

![](/img/e50527a302675fcd.webp)

- 按照前面底板章节中的说明将设备安装到安装底座上。*为获得最佳性能，请确保良好的空气流通，并将设备放置在开阔空间的支架上。* 警告！本设备的安装和运行应确保设备与您的身体之间的最小距离为 20 厘米。在居住环境中操作本设备可能会引起无线电干扰。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个千兆以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。
- 集成的 5GHz 无线，802.11a/n/ac 和 2.4 GHz b/g/n。
- SIM 卡槽。

## 按钮和跳线 {#buttons-and-jumpers}

**reset 按钮** 具有以下默认功能，也可以修改为运行脚本：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在将寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电之前按下按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

**Mode 按钮** 可执行用户添加的自定义脚本。

**前面的蓝色 LED 按钮** 可启用 WPS 模式。

## 状态 LED {#status-leds}

前面的 LED 灯条显示蜂窝调制解调器的接收信号强度。

当蜂窝调制解调器接口启用时，系统 LED 具有替代的调制解调器模式指示：

闪烁 - 连接建立中，调制解调器已在蜂窝网络中注册，APN 尚未激活

红色 - 已在 2G 模式下建立连接

黄色 - 已在 3G 模式下建立连接

蓝色 - 已在 LTE 模式下建立连接

红色闪烁 - 未插入 SIM 卡

## 配件 {#accessories}

包装中包含以下随设备附带的附件：

![](/img/4352729225bace24.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及更高版本。具体的出厂安装版本列在 /system resource 中。其他操作系统未经测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备的工作频段与上述规定不同，则需要由制造商/供应商提供定制固件版本并应用到最终用户设备，同时防止最终用户重新配置。
- 对于室外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据表均可在制造商官方网站上获取。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制在 2.400 – 2.4835 GHz，TX 功率限制为 20dBm (EIRP)。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制在 5.150 – 5.250 GHz，TX 功率限制为 23dBm (EIRP)。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制在 5.250 – 5.350 GHz，TX 功率限制为 20dBm (EIRP)。

请确保设备具有锁定包（来自制造商的固件版本），必须将其应用到最终用户设备以防止最终用户重新配置。产品将标有国家代码 "-EG"。本设备需要升级到最新版本以确保符合当地主管机构法规！最终用户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备必须由专业人员安装。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场所。请了解您所在地区将设备正确运输到指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th><th>包含 FCC ID</th></tr></thead><tbody><tr><td>RBD53GR-5HacD2HnD-US&R11e-LTE6</td><td>TV7RBD53-5ACD2ND</td><td>TV7R11ELTE6</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的有害干扰保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整或重新放置接收天线。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。**FCC 警告：** 未经合规负责方明确批准的任何更改或修改，都可能导致用户操作本设备的权限失效。

本设备符合 FCC 规则第 15 部分。操作需满足以下两个条件：(1) 本设备不得造成有害干扰，(2) 本设备必须接受收到的任何干扰，包括可能导致非预期操作的干扰。

注意：本设备已在外围设备上使用屏蔽线缆进行测试。必须使用屏蔽线缆连接本设备以确保合规。

**重要：射频辐射暴露。**

本设备符合 FCC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行应确保辐射体与您身体的任何部位之间的最小距离为 20 厘米。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th><th>包含 IC</th></tr></thead><tbody><tr><td>RBD53GR-5HacD2HnD-US&R11e-LTE6</td><td>7442A-D53AC</td><td>7442A-R11ELTE6</td></tr></tbody></table>

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。操作需满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

用于 5150–5250 MHz 频段运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行应确保辐射体与您身体的任何部位之间的最小距离为 20 厘米。Cet equipement est conforme aux limites d'exposition au rayonnement IC definies pour un environnement non controle. Cet equipement doit etre installe et utilise a une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный диапазон</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*Доступные частотные каналы могут различаться в зависимости от модели продукта и сертификации.

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

Робоча частота (Максимальна вихідна потужність): 2480-2483.5 МГц (20 дБм), 5150-5250 МГц (23 дБм), 5250-5350 МГц (20 дБм), 5470-5725 МГц (27 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

Mikrotīkls SIA 特此声明，无线电设备类型 RBD53GR-5HacD2HnD&R11e-LTE6 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WLAN / 2G / 3G / LTE {#wlan--2g--3g--lte}

<table><thead><tr><th>Operating Frequency / Maximum output power Betriebsfrequenz / maximale Ausgangsleistung Fréquence de fonctionnement / puissance de sortie maximale Frequenza operativa / massima potenza di uscita Frecuencia de funcionamiento / potencia de salida máxima Рабочая частота / максимальная выходная мощность</th><th>WLAN</th><th>2400-2483.5 MHz / 20 dBm</th></tr></thead><tbody><tr><td>WLAN</td><td>5150-5250 MHz / 23 dBm</td><td></td></tr><tr><td>WLAN</td><td>5250-5350 MHz / 20 dBm</td><td></td></tr><tr><td>WLAN</td><td>5470-5725 MHz / 27 dBm</td><td></td></tr><tr><td>E-GSM-900</td><td>900 MHz / 33dB</td><td></td></tr><tr><td>DCS-1800</td><td>1800 MHz / 30dB</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 24dB ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 24dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1700 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dB ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。有关更详细的信息，请参见上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen WLAN- und LTE-Sendeleistung Grenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben unter Konformitätserklärung / Cet appareil MikroTik respecte les limites maximales de puissance de transmission WLAN et LTE conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti massimi di potenza di trasmissione WLAN e LTE in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia de transmisión WLAN y LTE de acuerdo con las regulaciones ETSI. Para obtener más información, consulte la declaración de conformidad anterior / Это устройство MikroTik соответствует максимальным пределам мощности передачи WLAN и LTE в соответствии с правилами ETSI. Для получения дополнительной информации см. Декларацию соответствия выше.

![](/img/0561b3ba8c95a35c.webp)

当在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。 / Die WLAN-Funktion dieses Geräts ist nur für die Verwendung in Innenräumen im Frequenzbereich 5150 bis 5350 MHz beschränkt. / La fonction WLAN de cet appareil est limitée à une utilisation en intérieur uniquement lorsqu'il fonctionne dans la gamme de fréquences 5150 à 5350 MHz. / La funzione WLAN per questo dispositivo è limitata all'uso interno solo quando si opera nella gamma di frequenza da 5150 a 5350 MHz. / La función WLAN para este dispositivo está restringida al uso en interiores solo cuando se opera en el rango de frecuencia de 5150 a 5350 MHz. / Функция WLAN для этого устройства ограничена использованием внутри помещения только при работе в диапазоне частот от 5150 до 5350 МГц.
