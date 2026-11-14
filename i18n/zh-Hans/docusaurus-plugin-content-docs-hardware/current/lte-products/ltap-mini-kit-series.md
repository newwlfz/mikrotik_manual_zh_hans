---
title: "LtAP mini kit 系列"
slug: /ltap-mini-kit-series
source: https://manual.mikrotik.com/hardware/ltap-mini-kit-series
captured_at: '2026-11-04T09:55:55+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **[LtAP mini LTE kit](https://mikrotik.com/product/ltap_mini_lte_kit_2024)**（RB912R-2nD-LTm&R11e-LTE）
- **LtAP mini LTE kit-US**（RB912R-2nD-LTm&R11e-LTE-US）
- **LtAP mini 4G kit**（RB912R-2nD-LTm&R11e-4G）
:::

LtAP mini LTE kit 是一款带两个 SIM 卡槽的无线接入点。LtAP mini LTE、4G kit 出厂时已预装一张卡。

## 安全警告 {#safety-warnings}

-

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。

-

本产品的最终处置应依照所有国家法律和法规进行。

-

将接入点安装于任何墙面上的所有安装方法均须获得当地管辖部门的认可。

-

设备的安装必须符合当地和国家的电气规范。

-

本产品设计为安装在户外的抱杆上，但也可在室内安装。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能导致人员处于危险境地并损坏系统。

-

请仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。

-

在将系统连接到电源之前，请阅读安装说明。

-

我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！

-

如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。

-

客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

-

本设备未经 UL 的户外使用测试。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟为不受控环境规定的辐射暴露限值。本 MikroTik 设备安装和运行时，与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 连接 {#connecting}

- 将以太网线连接到以太网端口（如果使用 LTE 作为主要连接，则此步骤可选）；
- 使用 miniPCIe 插槽安装您的调制解调器（可选）；
- 将 SIM 卡插入 SIM 卡槽；
- 连接 GPS 天线（参见 ""，可选）；
- 选择您的供电方案（参见 ""）；
- 在计算机上进入网络连接部分，找到名为 "*MikroTik-....*" 的无线网络。然后连接到它；
- 配置应通过无线网络使用 Web 浏览器或移动应用程序进行。或者，您可以使用 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1)；
- 用户名：**admin**，没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 选择 "Check for updates" 按钮，将 RouterOS 更新到最新版本。设备需要有效的互联网连接；
- 如需手动更新设备，请访问产品页面 [https://mikrotik.com/products](https://mikrotik.com/products) 查找您的产品。所需的软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 **WinBox** 的 **Files** 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 **QuickSet** 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 安装 {#mounting}

![](/img/ef26d7a069bd38f5.jpg)

- 可以使用设备两侧提供的螺丝孔将设备固定在墙上。设备的安装方式应使线缆开口朝下，如图所示。
- 端口由一个小门保护，小门用一颗螺丝固定。请使用 Philips PH2 螺丝刀打开以接触端口。
- 小门上为所有可用端口预留了可掰开的开口，但请只掰开您要使用的开口。本设备可在室内和室外使用。本设备的 IP 防护等级为 IP54。
- 设备外壳上有可为外置 LTE 和 GPS 天线钻孔的位置。请使用钻头钻出适合所用天线线缆的孔。或者，您可以选购 "DINrail Pro" 安装支架，适用于标准 35 mm x 7.5 mm 的 DIN 导轨。[https://mikrotik.com/product/dinrail_pro](https://mikrotik.com/product/dinrail_pro)

在户外安装时，请确保所有线缆开口朝下。请使用 PoE 注入器和正确的接地。建议使用 Cat6 线缆。*警告！本设备的安装和运行时，设备与您的身体之间应保持至少 20 厘米的距离。在住宅环境中使用本设备可能会造成无线电干扰。* *本设备的安装和配置应由具备资质的人员完成。*

## 供电 {#powering}

- 直流输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）可接受 8-30 V DC。
- micro USB 端口可接受 5 V 供电。
- 以太网端口支持无源和 802.3af/at 以太网供电，8-57 V DC（需补偿线缆损耗，因此建议高于 12 V）。在最大负载并连接外设时，功耗可达 9 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/8cb2973499cab5a9.webp)

- 内置 2 GHz 无线接入点模块，支持 AP/station/bridge/p2p 模式。板载内置 PIF 天线。天线增益 1.5 dBi。
- miniPCIe 插槽和两个 SIM 卡槽（未安装调制解调器时无法使用，且不能同时使用）可与 3G/4G/LTE 调制解调器配合使用。设备提供板载天线，但外壳上提供了外置天线的开口。
- 内置 GPS 模块 - 提供 uFL 连接器用于外置天线。要启用，请将端口设置为 serial0（这将禁用设备上的 DB9 端口）。支持（GPS、GLONASS、BeiDou、Galileo）。
- 一个 10/100 以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。直通线或交叉线均可用于连接其他网络设备。以太网端口可接受来自无源 PoE 注入器的 12-57 V DC 供电。
- 一个 DB9 RS232 串口，用于串行控制台访问。配置为 115200 bit/s，8 个数据位，1 个停止位，无校验。如果在 serial0 上启用了内置 GPS，则无法使用。
- 一个仅用于供电的 micro USB 2.0 端口。

## 配置 {#configuration}

RouterOS 除了本文档所述内容外，还包含许多配置选项。建议从这里开始熟悉各项功能：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧通过设备的 MAC 地址进行连接（默认情况下，来自互联网端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，参见章节 。

## miniPCIe 插槽使用 {#minipcie-slot-usage}

本设备配备一个 miniPCIe 插槽和出厂预装的 LTE 调制解调器。提供两个 SIM 卡槽，供与 miniPCIe 调制解调器配合使用。SIM 卡槽不能单独使用。

在这种情况下，内置天线连接到调制解调器。更换 miniPCIe 模块应由具备资质的人员完成，处理电气设备时请遵循安全预防措施：- 在拆包和处理电气组件时使用腕带接地，以避免静电放电（ESD）损坏。

- 用 Philips PH2 螺丝刀拧下一颗螺丝，打开前盖。
- 拆下机箱底部的四颗螺丝，取下图中的机箱顶部。您会看到连接在其上的天线。
- 在 PCB 上找到 miniPCIe 卡，并拆下两颗螺丝。
- 将随附的厚导热垫贴到卡上，然后将卡安装到 miniPCIe 插槽中，使导热垫位于 PCB 和卡之间。
- 使用之前拆下的两颗螺丝将卡固定到位。
- 将灰色 uFL 连接器连接到调制解调器的 MAIN 天线连接器，将黑色线缆连接到次级（或 AUX）连接器。
- 要使用外置天线（不包含），请安装天线连接器，并使用 6.5 mm 钻头在设备侧面钻孔。（参见 ""）说明 4。
- 参见下图了解如何放置橡胶密封圈以获得最佳防水效果。

![](/img/57f7ee8c33feb316.webp)

- 将天线连接器安装到已安装的卡上以及 PCB 上的 GPS 连接器上，可额外使用橡胶硅胶将连接器固定在卡和 PCB 板上。

![](/img/45f214e7c671f1bf.webp)

将较薄的导热垫贴到卡的顶部。

- 重新组装。将设备重新装入机箱并用之前拆下的螺丝固定后，将移动运营商的 SIM 卡滑入 SIM 卡槽，芯片朝向如端口标签所示。卡槽接受 miniSIM（2FF）。合上 SIM 卡的黑色卡扣，将其固定在卡槽中。

## GPS 使用 {#gps-usage}

要使用 GPS，需要连接外置天线。使用 "ACGPSA" - 可单独购买。ACGPSA 是一款独立的有源 GPS 天线，工作在 1575.4 MHz 频段。天线尺寸为 46.5 mm x 26.5 mm x 12.5 mm，防护等级为 IP67，内置磁铁和双面胶，因此可以轻松固定在各种表面上。它配有一根 5m 长的线缆，带有 SMA 连接器，可通过 ACSMAUFL 尾纤（不包含，产品代码 ACSMAUFL）连接到 LtAP mini [https://mikrotik.com/product/acgpsa](https://mikrotik.com/product/acgpsa) [https://mikrotik.com/product/acsmaufl](https://mikrotik.com/product/acsmaufl) 要连接 GPS 天线，请参见 "miniPCIe 插槽使用" 第 10 步。**支持 - GPS、GLONASS、BeiDou、Galileo）。**

配置信息：[GPS 基本示例](/docs/mobile-networking/gps#basic-examples)。

GPS 使用有源天线，请仅在断电时连接。

## 按钮和跳线 {#buttons-and-jumpers}

### 复位按钮 {#reset-button}

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 将常亮，此时松开可开启 CAP 模式。设备现在将寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统都会加载备用 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

### 模式按钮 {#mode-button}

模式按钮的动作可以通过 RouterOS 软件配置为执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 配件 {#accessories}

包装内含随设备提供的以下配件：

- DC ⎓ 开关电源 24 V，1.2 A，28.8 W，86.8 %，VI，线缆：220 cm RA DC。
- 线缆 DC ⎓ 插头 RA 5.5x2.1x10.5 转镀锡 2*24 AWG 8 mm，长度 0.35 m。
- 带屏蔽以太网线缆/连接器的 PoE 注入器（RBPoE）。
- DC ⎓ 24 V 1.2 A 电源适配器。
- 安装套件 K-55 VMS。
- 弹性导热垫，25x40x3.5 mm。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：\{+\}[https://mikrotik.com/product/ltap_mini_lte_kit](https://mikrotik.com/product/ltap_mini_lte_kit)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及更高版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您首选的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名将已填写。
- 选择 Connect 以通过无线网络建立与设备的连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCCID</th><th>包含 FCCID</th></tr></thead><tbody><tr><td>RB912R-2nD-LTm&R11e-LTE</td><td>TV7RB912R-2NDLTM</td><td></td></tr><tr><td>RB912R-2nD-LTm&R11e-LTE-US</td><td>TV7RB912R-2NDLTM</td><td>TV7R11ELTE</td></tr><tr><td>RB912R-2nD-LTm&R11e-4G</td><td>TV7RB912R-2NDLTM</td><td>TV7R11E4G</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供针对有害干扰的合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。**FCC 警告：** 未经合规负责方明确批准的任何更改或修改，都可能使用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

注意：本设备在测试时外围设备使用了屏蔽线缆。为确保合规，必须使用屏蔽线缆连接本设备。

**重要：射频辐射暴露。**

本设备符合 FCC 为不受控环境规定的辐射暴露限值。本设备的安装和运行时，辐射体与您身体的任何部位之间应保持至少 20 厘米的距离。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th><th>包含 IC</th></tr></thead><tbody><tr><td>RB912R-2nD-LTm&R11e-LTE</td><td>TV7RB912R-2NDLTM</td><td>无</td></tr><tr><td>RB912R-2nD-LTm&R11e-LTE-US</td><td>7442A-912R2NDLTM</td><td>7442A-R11ELTE</td></tr><tr><td>RB912R-2nD-LTm&R11e-4G</td><td>7442A-912R2NDLTM</td><td>7442A-R11E4G</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须符合以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 为不受控环境规定的辐射暴露限值。本设备的安装和运行时，辐射体与您身体的任何部位之间应保持至少 20 厘米的距离。Cet equipement est conforme aux limites d'exposition au rayonnement IC definies pour un environnement non controle. Cet equipement doit etre installe et utilise a une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный диапазон</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>2400-2483.5 МГц</td><td>≤100 мВт</td></tr></tbody></table>

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

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

Робоча частота (Максимальна вихідна потужність): 2480-2483.5 МГц (20 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WLAN / 2G / 3G / LTE {#wlan--2g--3g--lte}

<table><thead><tr><th>工作频率 / 最大输出功率 Betriebsfrequenz / maximale Ausgangsleistung Fréquence de fonctionnement / puissance de sortie maximale Frequenza operativa / massima potenza di uscita Frecuencia de funcionamiento / potencia de salida máxima Рабочая частота / максимальная выходная мощность</th><th>WLAN</th><th>2400-2483.5 MHz / 20 dBm</th></tr></thead><tbody><tr><td>E-GSM-900</td><td>900 MHz / 33dB</td><td></td></tr><tr><td>DCS-1800</td><td>1800 MHz / 30dB</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 24dB ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 24dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1700 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dB ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 规定的最大 WLAN 和 LTE 发射功率限值。有关更多详细信息，请参见上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen WLAN- und LTE-Sendeleistung Grenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben unter Konformitätserklärung / Cet appareil MikroTik respecte les limites maximales de puissance de transmission WLAN et LTE conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti massimi di potenza di trasmissione WLAN e LTE in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia de transmisión WLAN y LTE de acuerdo con las regulaciones ETSI. Para obtener más información, consulte la declaración de conformidad anterior / Это устройство MikroTik соответствует максимальным пределам мощности передачи WLAN и LTE в соответствии с правилами ETSI. Для получения дополнительной информации см. Декларацию соответствия выше.
