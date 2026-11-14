---
title: "Cube Lite60"
slug: /cube-lite60
source: https://manual.mikrotik.com/hardware/cube-lite60
captured_at: '2026-11-04T09:48:02+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/cube-lite60-4d7ed9c7f2202d7a7a4f5a01d2a625ea.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/e1fbe52194fa5d7e.webp)

## [Cube Lite60](https://mikrotik.com/product/cube_lite60) (RBCube-60ad) {#cube-lite60-rbcube-60ad}

Cube Lite60 是一款室外无线路由器，内置定向天线，工作在 60 GHz 频段。为确保符合当地监管机构的规定，此设备需要升级到 RouterOS v6.46 或最新版本。

客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备都必须由专业人员安装。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律法规进行处理。
- 在任何墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品旨在室外安装在立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险情况并损坏系统。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备出现故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备都必须由专业人员安装。
- 这是 A 类设备。在居住环境中，本产品可能会造成无线电干扰，在这种情况下，用户可能需要采取适当的措施。

## 快速开始 {#quickstart}

- 打开以太网舱门，将以太网线缆连接到以太网端口，将以太网线缆的另一端连接到随附的 PoE 供电器；
- 将 PoE 供电器插入您的网络交换机或计算机；
- 将随附的电源插入 PoE 供电器以启动设备；
- 将 LAN 计算机的 IP 配置设置为自动 (DHCP)；
- 设备的默认 IP 地址为 192.168.88.1，在网页浏览器中打开该地址即可开始配置；
- 用户名：admin，默认没有密码，您将自动登录到 Quick Set 界面（对于某些型号，请查看贴纸上的用户名和无线密码）；
- 我们建议点击右侧的 "Check for updates" 按钮，并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性；
- 要个性化您的无线网络，可以在 "Network Name" 字段中更改 SSID；
- 在屏幕左侧的 "Country" 字段中选择您所在的国家/地区，以应用国家/地区法规设置；
- 在 "WiFi Password" 字段中设置您的无线网络密码，密码必须至少包含八个字符；
- 在右侧底部的 "Password" 字段中设置路由器密码，并在 "Confirm Password" 字段中重复输入，该密码将在下次登录时使用；
- 点击 "Apply Configuration" 保存更改。*如果设备发生了 RX 阻塞情况，设备将在几秒钟后恢复信号。*

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

- 扫描二维码并选择您喜欢的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将会自动填入。
- 点击 Connect 通过无线网络与您的设备建立连接。
- 选择 Quick setup，应用将通过几个简单的步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 配置 {#configuration}

登录后，我们建议在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将要使用的国家/地区，以符合当地法规。除本文档所述内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法进行 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备（参见 ）。如果设备失去连接，请等待几秒钟，设备将自动恢复连接。

## 组装与安装 {#assembly-and-mounting}

该设备可以安装在垂直或水平立杆上，如图 A 和图 B 所示。请注意，设备安装时底部卡扣必须朝下。立杆最大直径为 51 mm。

本设备的安装和配置应由经过认证的人员完成。

选择您想要的位置，设备需要进行精确调整以获得最佳性能。

- 使用 ph0 螺丝刀和随附的螺丝将随附的支架固定到设备背面。
- 使用 8 mm 棘轮扳手，通过 U 型螺栓支架安装到立杆上。
- 将螺栓放入三个位置之一，它们可实现微调，放在中间位置时可在 23 度范围内调节，如果调节需要超出该范围，请将螺丝更换到其他位置。

![](/img/acd1ca316e8c01cd.webp)

本设备的防护等级为 IP54。在室外安装时，请确保所有线缆开口朝下。我们建议使用 PoE 供电器以及具有正确接地的 Cat6 屏蔽线缆。使用和安装本设备时，请注意最大允许暴露量 (MPE) 安全距离，辐射器与您身体之间至少保持 20 cm 的距离。

或者，也可以将设备安装在设备背面的三个安装槽之一上。

![](/img/c5e03fa807689f16.webp)

![](/img/be7006c56abe1792.webp)

- 例如，您可以使用金属环。
- 使用十字螺丝刀松开金属环。
- 将其一端穿过三个安装槽中最方便的一个。
- 将设备放在将要安装的立杆上。
- 将安装环松脱的一端滑回其闭合卡扣，并使用螺丝刀拧紧。

建议使用扎带将以太网线缆固定到立杆上，与设备的距离约为 30 cm。

作为附加选项，您可以使用 "quickMOUNT-X"——可单独购买的便于调节的安装支架。产品网页：[https://mikrotik.com/product/qm_x](https://mikrotik.com/product/qm_x)

![](/img/8f9318498c6d2b23.webp)

专门设计，可在立杆上进行垂直和水平调节。

## 接地 {#grounding}

本设备包含一个接地连接（标记为 ⏚），您应将其连接到设备使用地所在塔架或建筑物的接地装置。这可大幅降低静电放电和雷击损坏的风险。

## 供电 {#powering}

Cube Lite60 接受来自无源 PoE 供电器的 DC ⎓ 电源（随附一个电源和一个 PoE 供电器），接受 12-28 V DC ⎓，最大负载功耗为 4 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自您本地网络 (LAN) 的以太网线缆连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 10/100 以太网端口。
- 集成的 w60g 接口，带有内置天线。

## 复位按钮 {#reset-button}

routerBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置复位为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置并恢复默认值。
- 当 LED 不再亮起（约 20 秒）后松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。无论使用上述哪种选项，如果在设备接通电源之前按下按钮，系统将加载备份的 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含以下随设备提供的附件：

- EU/US 开关电源 24V DC ⎓，0.38 A，9 W，Level VI，线缆：1.5 m。
- 带屏蔽以太网线缆/连接器的 POE 供电器 (RBPOE)。
- SXT_SQ_Mountv1。
- K-70 紧固套件。

## 规格 {#specifications}

有关 SQ 系列产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/cube_lite60](https://mikrotik.com/product/cube_lite60)

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及更高版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

本设备符合 ETSI 法规规定的最大 TX 功率限制。在欧盟，频率和最大发射功率如下所示：57-66GHz：34.92 dBm。60 GHz 频段的工作模式：58.32 GHz、60.48 GHz、62.64 GHz、64.80 GHz。本设备已通过认证，可用于室外的点对多点应用。在以下国家/地区，本设备不能用于固定点对点应用：

![](/img/01438e2d9209ce7d.webp)

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCCID</th></tr></thead><tbody><tr><td>RBCube-60ad</td><td>TV7CUBE60</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装环境中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在住宅区运行本设备很可能会造成有害干扰，在这种情况下，用户将需要自费纠正干扰。

**FCC 警告：** 未经合规责任方明确批准的任何更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不会造成有害干扰，并且 (2) 本设备必须接受接收到的任何干扰，包括可能导致非预期操作的干扰。本设备及其天线不得与其他任何天线或发射器处于同一位置或联合运行。

除 FCC CFR §15.255 (b) 中列出的条件外，本设备不得在飞机上使用。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备的安装和操作应使辐射器与您身体的任何部位之间保持至少 20 cm 的最小距离。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBCube-60ad</td><td>7442A-CUBE60</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和操作应使辐射器与您身体的任何部位之间保持至少 20 cm 的最小距离。Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé à une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

除 ISED RSS-210 附录 J.1 中列出的条件外，本设备不得在飞机上使用。Cet appareil ne doit pas être utilisé sur un avion, sauf dans les conditions énumérées ISED RSS-210 Annex J.1.

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBCube-60ad 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WiGig {#wigig}

<table><thead><tr><th>工作信道 / 最大输出功率 Betriebskanäle / maximale Ausgangsleistung Canaux opérationnels / puissance de sortie maximale Canali operativi / massima potenza di uscita Canales operacionales / potencia de salida máxima Операционные каналы / максимальная выходная мощность</th><th>58.32 GHz / &lt;40 dBm</th></tr></thead><tbody><tr><td>60.48 GHz / &lt;40 dBm</td><td></td></tr><tr><td>62.64 GHz / &lt;40 dBm</td><td></td></tr><tr><td>64.80 GHz / &lt;40 dBm</td><td></td></tr></tbody></table>
