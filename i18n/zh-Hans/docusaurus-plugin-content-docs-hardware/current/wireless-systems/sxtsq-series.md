---
title: "SXTsq 系列"
slug: /sxtsq-series
source: https://manual.mikrotik.com/hardware/sxtsq-series
captured_at: '2026-11-04T10:06:02+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![SXTsq Lite5](/img/cc76e9d8f812a4f3.webp)

## [SXTsq 5 High Power](https://mikrotik.com/product/sxtsq_5_high_power) (RBSXTsq5HPnD) {#sxtsq-5-high-power-rbsxtsq5hpnd}

SXTsq 是一款内置定向天线的室外无线路由器。它可以用作 CPE，也可以用于点对点链路（在点对点场景下，使用 RouterOS 无线模式 "bridge" 即可作为单客户端 AP 工作）。该系列产品列表：**SXTsq Lite2** **SXTsq Lite5** **SXTsq 5 ac** **SXTsq 5 High Power**

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行处理。
- 在任何墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计为安装在室外的立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会给人员带来危险并损坏系统。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备出现故障，请将其断电。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所设定的辐射暴露限值。本 MikroTik 设备的安装和运行位置距离您的身体、职业用户或公众不得小于 20 厘米。

## 快速开始 {#quickstart}

- 打开以太网舱门。
- 用以太网线将设备连接到随附 PoE 供电器的 data+power 端；
- 将 PoE 供电器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 供电器；
- 使用 Web 浏览器通过 **WebFig** 或 **WinBox** 工具在 [https://mt.lv/winbox](https://mt.lv/winbox) 配置您的设备。**提供多种配置方式以确保可访问性；**
- 通过打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后单击 MAC 地址。用户名为 "**admin**"，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，然后在 "Downloads" 部分找到所需的安装包；
- 将下载的安装包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中进行以下设置：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![MikroTik mobile app](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名已自动填入。
- 单击 Connect，通过无线网络与您的设备建立连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 配置 {#configuration}

设备已预配置为无线客户端（CPE），您只需选择要连接的 AP 并设置设备密码。您可以在默认加载的 quickSET 选项卡中完成此操作。如果 IP 连接不可用，可以使用 WinBox 通过设备的 MAC 地址进行连接。如果您希望从网络启动设备，例如使用 MikroTik Netinstall，请在启动设备时按住 RESET 按钮，直到 LED 灯熄灭，然后设备将开始查找 Netinstall 服务器。有关使用 RouterOS 以及连接此设备的更多信息，请参阅我们的文档：[https://mt.lv/help##](https://mt.lv/help##) 安装

本设备的 IP 防护等级为 IP54。在室外安装时，请确保所有线缆开口朝下。我们建议使用 POE 供电器并做好正确接地。使用和安装本设备时，请注意最大允许暴露量（MPE）安全距离，辐射体与您身体之间至少保持 20 厘米。

设备随附一个金属安装环，可用于设备背面的三个安装槽之一。

- 使用十字螺丝刀松开金属环。
- 将其一端穿过三个安装槽中最方便的一个。
- 将设备放置到将要安装的立杆上。
- 将安装环的松脱端滑回其闭合卡扣，并用螺丝刀拧紧。
- 随附的环形支架可安装于直径 3-7 厘米的立杆上。

建议使用扎带将以太网线固定在立杆上。与设备的距离约为 30 厘米。作为额外选项，您可以使用 "quickMOUNT-X"——便于调节的安装支架，可单独购买。产品网页：[https://mikrotik.com/product/qm_x](https://mikrotik.com/product/qm_x)

![Mounting bracket](/img/8f9318498c6d2b23.webp)

![Mounting bracket adjustment](/img/ea498c8ab83d7423.webp)

专为 SQ 系列设计，可在立杆上进行垂直和水平调节。

## 供电 {#powering}

SQ 系列仅接受来自无源 PoE 供电器的 DC ⎓ 供电（随附一个电源和一个 PoE 供电器）**SXTsq Lite2** 接受 10-30 V DC ⎓，最大负载功耗 5 W。**SXTsq Lite5** 接受 10-30 V DC ⎓，最大负载功耗 6 W。**SXTsq 5 ac** 接受 10-28 V DC ⎓，最大负载功耗 7 W。**SXTsq 5 High Power** 接受 10-28 V DC ⎓，最大负载功耗 7 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个以太网 10/100 Mbit（**SXTsq 5 ac –** 千兆以太网），支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通或交叉线缆连接到其他网络设备。
- 一个集成无线接口：
- **SXTsq Lite22.4 GHz, 802.11b/g/n, antenna gain 10 dBi.**
- **SXTsq Lite55 GHz, 802.11a/n, antenna gain 16 dBi.**
- **SXTsq 5 ac5 GHz, 802.11a/n/ac, antenna gain 16 dBi.**
- **SXTsq 5 High Power5 GHz, 802.11a/n, antenna gain 16 dBi.**

## 按钮和跳线 {#buttons-and-jumpers}

routerBOOT 复位按钮具有以下功能。按住按钮并通电，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置并恢复默认值。
- 当 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。无论使用上述哪种选项，如果在设备通电前按住按钮，系统都会加载备份 RouterBOOT 引导程序。这有助于 RouterBOOT 调试和恢复。

## 接地 {#grounding}

设备包含一个接地连接（标记为 ⏚），您应将其连接到设备使用地点所在塔架或建筑物的接地装置。这可以大幅降低静电放电（ESD）和雷电损坏的风险。

## 配件 {#accessories}

包装中包含随设备提供的以下附件：

- 欧盟/美国开关电源 24V DC ⎓，0.38 A，9 W，线缆：1.5 m。
- 软管卡箍 SUS304（十字型；夹紧直径范围 30-70 mm）。
- 带屏蔽连接器的 POE 供电器/千兆 POE 供电器。

## 规格 {#specifications}

有关 SQ 系列产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：**SXTsq Lite2** [https://mikrotik.com/product/sxtsq_lite2](https://mikrotik.com/product/sxtsq_lite2) **SXTsq Lite5** [https://mikrotik.com/product/RBSXTsq5nD](https://mikrotik.com/product/RBSXTsq5nD) **SXTsq 5 ac** [https://mikrotik.com/product/sxtsq_5_ac](https://mikrotik.com/product/sxtsq_5_ac) **SXTsq 5 High Power** [https://mikrotik.com/product/sxtsq_5_high_power](https://mikrotik.com/product/sxtsq_5_high_power)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请了解您所在地区将设备正确运送到指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>SXTsq Lite5</td><td>TV7LHG5NDM</td></tr><tr><td>SXTsq 5</td><td>TV7LHG5HPND</td></tr><tr><td>SXTsq 5 ac</td><td>TV7LHG5ACD</td></tr><tr><td>SXTsq Lite2</td><td>TV7SXTSQ-2ND</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制要求。这些限制旨在为住宅安装环境提供合理的有害干扰防护。

![FCC compliance badge](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），建议用户尝试通过以下措施之一来纠正干扰：

- 重新调整或重新放置接收天线。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得产生有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器同址放置或协同运行。**重要提示：射频辐射暴露。** 本设备符合 FCC 针对非受控环境所设定的射频辐射暴露限值。本设备的安装和运行应使辐射体与您身体的任何部位之间保持至少 20 厘米的距离。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>SXTsq Lite5</td><td>7442A-LHG5NDM</td></tr><tr><td>SXTsq 5</td><td>7442A-LHG5HPND</td></tr><tr><td>SXTsq 5 ac</td><td>7442A-LHG5ACD</td></tr><tr><td>SXTsq Lite2</td><td>7442A-SXTSQ2ND</td></tr></tbody></table>

本设备符合加拿大工业部免许可证 RSS 标准。操作须满足以下两个条件：(1) 本设备不得产生干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

**重要提示：射频辐射暴露。** 本设备符合 IC 针对非受控环境所设定的辐射暴露限值。本设备的安装和运行应使辐射体与您身体的任何部位之间保持至少 20 厘米的距离。Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé à une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

![UKCA compliance badge](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный диапазон</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证情况而有所不同。

有关设备制造日期的信息，在其标签上的序列号末尾以斜杠分隔的形式标明。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税联盟的 MikroTik 产品均按照相关要求进行评估，并按如下所示标记 EAC 标志：

![EAC compliance badge](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (20 dBm)、5725-5850 MHz (30 dBm)。可用频率信道可能因产品型号和认证情况而有所不同。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置不得造成有害干扰；且
- 本设备必须接受任何干扰，包括可能导致其非预期操作的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息领域国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

Робоча частота (Максимальна вихідна потужність): 2400-2485.3 МГц (20 дБм), 5150-5250 МГц (23 дБм), 5250-5350 МГц (20 дБм), 5470-5725 МГц (27 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相关型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限于室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限于室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更详细的信息，请参见上方的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen WLAN- Sendeleistung Grenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben unter Konformitätserklärung / Cet appareil MikroTik respecte les limites maximales de puissance de transmission WLAN conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti massimi di potenza di trasmissione WLAN in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia de transmisión WLAN de acuerdo con las regulaciones ETSI. Para obtener más información, consulte la declaración de conformidad anterior / Это устройство MikroTik соответствует максимальным пределам мощности передачи WLAN в соответствии с правилами ETSI. Для получения дополнительной информации см. Декларацию соответствия выше.
