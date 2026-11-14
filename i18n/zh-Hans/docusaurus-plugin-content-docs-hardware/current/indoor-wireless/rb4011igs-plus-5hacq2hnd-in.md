---
title: "RB4011iGS+5HacQ2HnD-IN"
slug: /rb4011igs-plus-5hacq2hnd-in
source: https://manual.mikrotik.com/hardware/rb4011igs-plus-5hacq2hnd-in
captured_at: '2026-11-04T06:03:57+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/de2251b3df2b7d46.jpg" alt="" width={799} height={497} /></p>

## [RB4011iGS+5HacQ2HnD-IN](https://mikrotik.com/product/rb4011igs_5hacq2hnd_in) (RB4011iGS+5HacQ2HnD-IN) {#rb4011igs5hacq2hnd-in-rb4011igs5hacq2hnd-in}

设备已预配置基本设置，您只需插入 ISP 网线即可开始使用互联网。我们建议您设置密码以保护设备安全。完整规格和宣传册请参见 [RB4011iGS+5HacQ2HnD-IN 产品页面](https://mikrotik.com/product/rb4011igs_5hacq2hnd_in)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于机架安装。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的步骤可能会导致人员危险和系统损坏。
- 本产品仅适合室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境设定的辐射暴露限值。本 MikroTik 设备安装和操作时，应与您的身体、职业用户或公众保持不少于 20 厘米的距离。

## 设置 {#setup}

- 确保您的互联网服务提供商（ISP）允许硬件更换并自动分配 IP 地址；
- 将 ISP 网线连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 以外的任意端口或无线网络“MikroTik-...”（请务必查看贴纸上的无线密码）连接到设备；
- 使用移动应用程序建立连接。或者使用网页浏览器中的 WebFig 或 [https://mt.lv/winbox](https://mt.lv/winbox) 上的“WinBox”配置工具。**提供多种配置方式以确保可访问性；**
- 使用默认 IP 地址 192.168.88.1 在所选的工具中开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择“Neighbors”选项卡以查找设备；
- 继续使用 MAC 地址进行连接。用户名为“admin”，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击“Check for updates”按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在“Downloads”部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的“Files”菜单，并重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保最佳性能、稳定性和安全更新；
- 在“QuickSet”菜单中进行以下设置：选择您的国家，以应用国家法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 供电 {#powering}

最大负载下的功耗可达 44 W。设备可通过电源插孔或第一个以太网端口供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 12-57 V DC。
- 第一个以太网端口接受 18-57 V DC 的 Power over Ethernet 供电。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备上的以太网线连接到 POE 适配器的 POE 端口。
- 将来自您局域网的以太网线连接到 POE 适配器的 LAN 端口，请注意数据和电力流向的箭头。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的“Check for updates”按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将要使用的国家，以符合当地法规。RouterOS 除本文档所述内容外，还包含许多配置选项。我们建议从此处开始了解各种可能性：[https://mt.lv/help](https://mt.lv/help)。如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从局域网侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以启动设备进行重新安装，请参见按钮和跳线。

## 安装 {#mounting}

可以使用设备背面的螺钉孔将设备固定到墙上。设备应以线缆开口朝下的方式安装。设备没有防水保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat5/6 屏蔽电缆。本设备的安装和配置应由合格人员完成。*外壳包含一个 M4 螺纹的接地螺钉孔（不含螺钉）。在存在 ESD 放电风险的场所，建议您将接地螺钉连接到经过验证的接地设施。* 本设备安装和操作时，设备与您身体之间的最小距离应为 20 厘米。在住宅环境中操作本设备可能会导致无线电干扰。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 以太网端口分为两组，每组五个，每组通过一个交换芯片连接。这些端口可以单独配置，并支持自动交叉/直通电缆校正（Auto MDI/X），因此您可以使用直通或交叉电缆连接到其他网络设备。
- SFP+ 端口接受 SFP 和 SFP+ 模块。请参阅 [MikroTik SFP 模块兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。
- RJ45 控制台端口用于串行控制台访问，默认为 115200 bit/s、8 个数据位、1 个停止位、无校验。
- 集成 QCA9984 双频 4x4，支持 4 个 SS MIMO，5 GHz 802.11a/n/ac。
- 一个 MiniPCIe 插槽，已安装 MiniPCIe 卡 R11e-2HnD，2.4 GHz 802.11b/g/n。仅支持 Mini PCIe 卡。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请使设备进入 BOOTP 模式。有两种引导选项可用：**常规引导程序**和**备份引导程序**。建议在其中一个无法工作时验证这两个选项。

- **常规引导程序：** 要进入 etherboot 模式，请在设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **备份引导程序：** 关闭设备电源。按下并按住 **Reset** 按钮，然后给设备通电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。根据型号不同，这可能会通过 **USR、USER、System** 或 **ACT** LED 或 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都将加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统未经测试。

## 配件 {#accessories}

包装包含以下随附配件：

- 电源适配器 24 V DC ⎓ 2.5 A 60 W 80 % VI 121x54x33 线缆 2 m 插头 RA 2.1 mm。
- EU/US 电源线，D03+QT3 H05VV-F 3x0.75mm2 1.83m RoHS。
- 安装套件 K-59 紧固套装。请参阅 [MikroTik SFP 模块兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。

## MikroTik 移动应用 {#mikrotik-mobile-app}

<p><Img src="/img/8d294e5cd375c591.webp" alt="" width={247} height={244} /></p>

<p><Img src="/img/25f50553ffd86eaf.webp" alt="" width={241} height={80} /></p>

<p><Img src="/img/b0984aa3ad3c6d58.webp" alt="" width={239} height={81} /></p>

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

## 注意 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备的工作范围与上述规定不同，则需要将制造商/供应商提供的定制固件版本应用到最终用户设备上，并防止最终用户重新配置。
- 室外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据表均可在制造商官方网站上获取。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，发射功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限制为 5.150 – 5.250 GHz，发射功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限制为 5.250 – 5.350 GHz，发射功率限制为 20dBm（EIRP）。

请确保设备具有锁定软件包（来自制造商的固件版本），该软件包需要应用到最终用户设备上，以防止最终用户重新配置。产品将标有国家代码“-EG”。本设备需要升级到最新版本，以确保符合当地主管部门的法规！最终用户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如在指定的废物处置场所处置。请了解将设备妥善运输到您所在地区指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th><th>包含 FCCID</th></tr></thead><tbody><tr><td>RB4011iGS+5HacQ2HnD-IN</td><td>TV74011GS-5HQ2HD</td><td>TV7R11E2HPND</td></tr></tbody></table>

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的有害干扰防护。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整或重新放置接收天线。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。**FCC 警告：** 任何未经合规责任方明确批准的更改或修改都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰，(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或协同操作。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境设定的射频辐射暴露限值。本设备安装和操作时，辐射体与您身体任何部位之间的最小距离应为 20 厘米。

**天线安装。警告：** 安装者有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用与本产品一起认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，明确禁止使用未经本产品认证的任何其他天线。安装者应根据国家法规和天线类型配置天线的输出功率水平。带有连接器的设备需要专业安装，以确保符合健康和安全要求。包含 FCC ID TV7R11E2HPND。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th><th>包含 IC</th></tr></thead><tbody><tr><td>RB4011iGS+5HacQ2HnD-IN</td><td>7442A-4011G5Q2</td><td>7442A-R11E2HPND</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。操作须符合以下两个条件：(1) 本设备不得造成干扰，(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境设定的辐射暴露限值。本设备安装和操作时，辐射体与您身体任何部位之间的最小距离应为 20 厘米。Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé à une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный диапазон</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, , 5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*Доступные частотные каналы могут различаться в зависимости от модели продукта и сертификации.

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用频率信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

Робоча частота (Максимальна вихідна потужність): 2400-2483.5 МГц (20 дБм), 5150-5250 МГц (23 дБм), 5250-5350 МГц (20 дБм), 5470-5725 МГц (27 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RB4011iGS+5HacQ2HnD-IN 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参见上方的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen WLAN- Sendeleistung Grenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben unter Konformitätserklärung / Cet appareil MikroTik respecte les limites maximales de puissance de transmission WLAN conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti massimi di potenza di trasmissione WLAN in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia de transmisión WLAN de acuerdo con las regulaciones ETSI. Para obtener más información, consulte la declaración de conformidad anterior / Это устройство MikroTik соответствует максимальным пределам мощности передачи WLAN в соответствии с правилами ETSI. Для получения дополнительной информации см. Декларацию соответствия выше.

<p><Img src="/img/0561b3ba8c95a35c.webp" alt="" width={146} height={135} /></p>

本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。 / Die WLAN-Funktion dieses Geräts ist nur für die Verwendung in Innenräumen im Frequenzbereich 5150 bis 5350 MHz beschränkt. / La fonction WLAN de cet appareil est limitée à une utilisation en intérieur uniquement lorsqu'il fonctionne dans la gamme de fréquences 5150 à 5350 MHz. / La funzione WLAN per questo dispositivo è limitata all'uso interno solo quando si opera nella gamma di frequenza da 5150 a 5350 MHz. / La función WLAN para este dispositivo está restringida al uso en interiores solo cuando se opera en el rango de frecuencia de 5150 a 5350 MHz. / Функция WLAN для этого устройства ограничена использованием внутри помещения только при работе в диапазоне частот от 5150 до 5350 МГц.
