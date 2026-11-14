---
title: "LtAP mini"
slug: /ltap-mini
source: https://manual.mikrotik.com/hardware/ltap-mini
captured_at: '2026-11-04T09:55:55+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/ef26d7a069bd38f5.jpg)

## [LtAP mini](https://mikrotik.com/product/ltap_mini) (RB912R-2nD-LTm) {#ltap-mini-rb912r-2nd-ltm}

LtAP mini 是一款带有两个用于 3G/LTE 数据的 SIM 卡槽的无线接入点。LtAP mini 设计用于搭配您自己的调制解调器使用。

## 安全警告 {#safety-warnings}

-

在操作任何设备之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。

-

本产品的最终处置应按照所有国家法律和法规进行。

-

将接入点安装到任何墙面上的所有安装方法均须获得当地管辖部门的认可。

-

设备的安装必须符合当地和国家电气规范。

-

本产品拟安装在室外杆上，但也可安装在室内。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确步骤，可能会对人员造成危险并损坏系统。

-

仅使用制造商认可的电源和配件，这些物品可在本产品的原包装中找到。

-

将系统连接到电源之前，请阅读安装说明。

-

我们无法保证因设备使用不当而不会发生事故或损坏。请谨慎使用本产品，操作风险自负！

-

如果设备发生故障，请断开其电源。最快的做法是将电源插头从电源插座中拔出。

-

客户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备都必须由专业人员安装。

-

该设备未经过 UL 的室外使用测试。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟为不受控环境设定的辐射暴露限值。本 MikroTik 设备安装和操作时，应与您的身体、职业用户或公众保持不少于 20 厘米的距离。

## 连接 {#connecting}

- 安装所需的调制解调器（参见 ""）。
- 如果打算使用 GPS，则需要外置天线（参见 ""）。
- 选择您的供电方案（参见 ""）。
- 将您的 Internet 电缆连接到以太网端口。
- 将计算机的 IP 配置设置为 *自动*（DHCP）。
- 如果不使用 PoE，请连接您的直接输入电源插孔以启动设备。
- 设备将启动，无线网络将可供连接。
- 在您的 PC、手机或其他设备上打开网络连接，搜索 MikroTik 无线网络并连接到它。
- 连接到无线网络后，在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始配置；由于默认没有密码，您将自动登录（或者，对于某些型号，请查看贴纸上的用户和无线密码）。也可以使用移动应用（参见 ""）和 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 完成配置。
- 您应选择“检查更新”按钮，并将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。
- 选择您的国家/地区，以应用国家/地区法规设置，并在加载的屏幕上设置密码。
- *本产品的核心功能需要以下 RouterOS "npk" 软件包：gps、system。

## 安装 {#mounting}

![](/img/68d9301126412ebe.webp)

- 可以使用设备侧面提供的螺丝孔将设备固定到墙上。设备安装时应使电缆开口朝下，如图所示。
- 端口由一个小门保护，该门用一颗螺丝固定。使用 Philips PH2 螺丝刀打开以接触端口。
- 该门为所有可用端口留有开口位置，但只应破开您将使用的开口。该设备可在室内和室外使用。该设备的 IP 防护等级为 IP54。
- 设备外壳上有可为外置 LTE 和 GPS 天线钻孔的位置。使用钻头钻出适合所用天线电缆的孔。或者，您可以购买 "DINrail Pro" 安装支架，其设计适用于标准 35 mm x 7.5 mm DIN 导轨。[https://mikrotik.com/product/dinrail_pro](https://mikrotik.com/product/dinrail_pro)

在室外安装时，确保任何电缆开口都朝下。使用 PoE 注入器和正确接地。建议使用 Cat6 电缆。

![](/img/9a7d512c8e08d773.webp)

*警告！本设备安装和操作时，设备与您的身体之间应保持至少 20 厘米的距离。在住宅环境中操作本设备可能会造成无线电干扰。* *本设备的安装和配置应由合格人员完成。*

## 供电 {#powering}

所有电压均符合 ES1，并符合 EN IEC 62368-1 规定的最大 PS2/LPS。

<table><thead><tr><th>**输入电压**</th><th>DC 插头：8-30 VDC ![](/img/f40c45a76b237ba5.webp) USB：5 VDC PoE：8-57 VDC</th></tr></thead><tbody><tr><td>**输入功率**</td><td>9W</td></tr></tbody></table>

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 8-30 V DC。
- microUSB 端口接受 5 V 供电。
- 以太网端口接受无源和 802.3af/at 以太网供电（PoE）8-57 V DC（补偿电缆上的损耗，因此建议高于 12 V）。带附件时最大负载下的功耗可达 9 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网电缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的以太网电缆连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

![](/img/8cb2973499cab5a9.webp)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 内置 2 GHz 无线接入点模块，支持 AP/station/bridge/p2p 模式。板载 PIF 天线为内置。天线增益 1.5 dBi。
- miniPCIe 插槽和两个 SIM 卡槽（未安装调制解调器时无法使用，且不能同时使用）用于搭配 3G/4G/LTE 调制解调器。提供板载天线，但机壳上提供了外置天线开口。
- 内置 GPS 模块 - 提供用于外置天线的 uFL 连接器。要启用，请将端口设置为 serial0（这会禁用设备上的 DB9 端口）。支持 - GPS、GLONASS、BeiDou、Galileo）。
- 一个 10/100 以太网端口，支持自动交叉/直通电缆修正（Auto MDI/X）。可使用直通或交叉电缆连接到其他网络设备。以太网端口接受来自无源 PoE 注入器的 12-57 V DC 供电。
- 一个 DB9 RS232 串口，用于串行控制台访问。配置为 115200 bit/s、8 个数据位、1 个停止位、无校验。如果在 serial0 上启用了内置 GPS，则无法使用。
- 一个仅用于供电的 microUSB 2.0 端口。

## 配置 {#configuration}

RouterOS 除了本文档所述内容外，还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参见章节 。

## miniPCIe 插槽使用 {#minipcie-slot-usage}

该设备配备一个 miniPCIe 插槽，用于搭配 3G/4G/LTE 调制解调器。提供两个 SIM 卡槽，与 miniPCIe 调制解调器一起使用。SIM 卡槽不单独使用。在这种情况下，内部天线不会连接（位于机壳内部）。安装 miniPCIe 模块应由合格人员完成，处理电气设备时请遵循安全预防措施：

- 拆包和处理电气组件时，请使用腕部接地带，以避免静电放电（ESD）损坏。
- 使用 Philips PH2 螺丝刀拧下一颗螺丝，打开前盖。
- 卸下机壳底部的四颗螺丝，并取下机壳顶部。您会看到连接在其上的天线。
- 找到 PCB 上的 mini PCIe 插槽，并卸下两颗出厂时附带的螺丝。
- 将随附的厚导热垫贴到卡上，并将卡安装到 miniPCIe 插槽中，使导热垫位于 PCB 和卡之间。
- 使用之前卸下的两颗螺丝将卡固定到位。
- 将灰色 uFL 连接器连接到调制解调器的 MAIN 天线连接器，将黑色电缆连接到辅助（或 AUX）连接器。
- 要使用外置天线，请连接天线连接器，并使用 6.5 mm 钻头在设备侧面钻孔。（参见 ""）说明 4。
- 请参见下图，了解如何放置橡胶密封圈以获得最佳防水保护。

![](/img/57f7ee8c33feb316.webp)

- 将天线连接器连接到已安装的卡以及 PCB 上的 GPS 连接器，可使用额外的橡胶硅胶将连接器固定在卡和 PCB 板上。

![](/img/45f214e7c671f1bf.webp)

- 将较薄的导热垫贴到卡的顶部。
- 按相反顺序重新组装。将设备重新装入机壳并用之前卸下的螺丝固定后，将移动运营商的 SIM 卡滑入 SIM 卡槽，芯片朝向如端口标签所示。卡槽接受 miniSIM（2FF）。合上 SIM 卡的黑色锁扣，将其固定在卡槽中。

## GPS 使用 {#gps-usage}

为了使用 GPS，需要连接外置天线。使用 "ACGPSA" - 可单独购买。ACGPSA 是一款独立的有源 GPS 天线，工作在 1575.4 MHz 频谱。天线尺寸为 46.5 mm x 26.5 mm x 12.5 mm，防护等级为 IP67，并包含内部磁铁和双面胶，因此可以轻松附着到各种表面。它有一条带 SMA 连接器的 5m 长电缆，可通过 ACSMAUFL 尾纤（未包含，产品代码 ACSMAUFL）连接到 LtAP mini [https://mikrotik.com/product/acgpsa](https://mikrotik.com/product/acgpsa) [https://mikrotik.com/product/acsmaufl](https://mikrotik.com/product/acsmaufl) 要连接 GPS 天线，请参见“miniPCIe 插槽使用”步骤 10。

**支持 - GPS、GLONASS、BeiDou、Galileo）。**

配置信息 - [GPS 手册、基本示例](/docs/mobile-networking/gps#basic-examples)

GPS 使用有源天线，仅在电源关闭时连接。

## 按钮和跳线 {#buttons-and-jumpers}

### 复位按钮 {#reset-button}

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（总计 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开以开启 CAP 模式。设备现在将寻找 CAPsMAN 服务器（总计 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（总计 15 秒）。无论使用上述哪种方式，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

### 模式按钮 {#mode-button}

模式按钮的动作可以通过 RouterOS 软件配置为执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 配件 {#accessories}

包装内含以下随设备提供的配件：

- DC ⎓ 开关电源 24 V、1.2 A、28.8 W、86.8 %、VI，电缆：220 cm RA DC。
- 电缆 DC ⎓ 插头 RA 5.5x2.1x10.5 转 剥皮 2*24 AWG 镀锡 8 mm，长度 0.35 m。
- 带屏蔽以太网电缆/连接器的 PoE 注入器（RBPoE）。
- DC ⎓ 24 V 1.2 A 电源适配器。
- 安装套件 K-55 VMS。
- 弹性导热垫，25x40x3.5 mm。

## 规格 {#specifications}

有关本产品、规格和图片的更多信息，请访问我们的网页：[https://mikrotik.com/product/ltap_mini](https://mikrotik.com/product/ltap_mini)

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描 QR 码并选择您首选的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将已输入。
- 选择“连接”以通过无线网络建立与设备的连接。
- 选择快速设置，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要设置。

为避免环境污染，请将设备与生活垃圾分开，并以安全方式处置，例如在指定的废物处置场所处置。请熟悉您所在地区将设备正确运输到指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCCID</th></tr></thead><tbody><tr><td>RB912R-2nD-LTm</td><td>TV7RB912R-2NDLTM</td></tr></tbody></table>

本设备已通过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的有害干扰防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 请咨询经销商或有经验的无线电/电视技术人员以寻求帮助。**FCC 警告：** 未经合规负责方明确批准的任何更改或修改，可能会使用户操作本设备的权限失效。本设备符合 FCC 规则第 15 部分。操作需满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共址或协同操作。

**重要：射频辐射暴露。** 本设备符合 FCC 为不受控环境设定的射频辐射暴露限值。本设备安装和操作时，辐射体与您身体的任何部位之间应保持至少 20 cm 的距离。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RB912R-2nD-LTm</td><td>7442A-912R2NDLTM</td></tr></tbody></table>

本设备符合加拿大工业部免许可证 RSS 标准。操作需满足以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。本设备符合加拿大工业部适用于免许可证无线电设备的 CNR 标准。操作需满足以下两个条件：(1) 设备不得产生干扰，且 (2) 设备用户必须接受所受到的任何无线电干扰，即使该干扰可能影响设备的正常运行。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 为不受控环境设定的辐射暴露限值。本设备安装和操作时，辐射体与您身体的任何部位之间应保持至少 20 cm 的距离。本设备符合 IC 为不受控环境设定的辐射暴露限值。本设备安装和使用时，辐射体与您身体的任何部位之间应保持至少 20 cm 的最小距离。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射器功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>≤100 mW</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息位于其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位表示周数。

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

## 乌克兰国家通信和信息领域监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2480-2483.5 MHz（20 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备，需按照乌克兰国家通信和信息领域监管委员会（НКРЗІ）2012 年 11 月 1 日第 559 号决议批准、并在乌克兰司法部于 2013 年 1 月 3 日以第 57/22589 号登记的秩序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RB912R-2nD-LTm 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相关型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备都必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明。/ 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。有关更多信息，请参见上文的符合性声明。/ 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。有关更多信息，请参见上文的符合性声明。/ 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。有关更多信息，请参见上文的符合性声明。/ 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 最大发射功率限值。有关更多信息，请参见上文的符合性声明。
