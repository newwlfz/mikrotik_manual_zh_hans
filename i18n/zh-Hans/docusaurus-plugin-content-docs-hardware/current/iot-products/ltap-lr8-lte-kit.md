---
title: "LtAP LR8 LTE kit"
slug: /ltap-lr8-lte-kit
source: https://manual.mikrotik.com/hardware/ltap-lr8-lte-kit
captured_at: '2026-11-04T09:55:47+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可以下载为 <a href="/assets/files/ltap-lr8-lte-kit-eeb73bd200953b5a8ca3fc070627ae4b.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/30e4f8523c74a8b6.jpg)

### [LtAP LR8 LTE kit](https://mikrotik.com/product/ltap_lr8_lte_kit) (RBLtAP-2HnD&R11e-LTE&LR8) {#ltap-lr8-lte-kit-rbltap-2hndr11e-ltelr8}

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 在任何墙面上安装接入点的所有安装方法均须获得当地主管部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于在室外抱杆安装，但也可以安装在室内。开始安装前请仔细阅读安装说明。使用错误的硬件和配置或未遵循正确的步骤，可能会对人员造成危险情况并损坏系统。
- 请仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 这是 A 类设备。在居住环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业用户或公众的距离不得小于 30 厘米。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 打开底部盖板；
- 将 SIM 卡插入 SIM 2 插槽（中间）；
- 将设备连接到电源；
- 用您的电脑连接到 MikroTik 无线网络；
- 在网页浏览器中打开 https://192.168.88.1 以开始配置；
- 用户名：**admin**，默认未设置密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 连接后，在 QuickSet LTE AP 菜单中输入您的 PIN 码 [https://mt.lv/configuration](https://mt.lv/configuration)；
- 将 RouterOS 软件升级到最新版本 [https://mt.lv/upgrade](https://mt.lv/upgrade)；
- 再次连接，并在 *QuickSet LTE AP* 菜单中设置您的无线网络密码；
- 在屏幕左侧选择您所在的国家，以应用国家法规设置；
- 保护您的设备并设置强密码。
- 在产品标签上找到您的 *LR Gateway ID*，并将其注册到您的网络服务器中。
- *本产品的核心功能需要以下 RouterOS "npk" 软件包：gps、lora、system。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/7b3321c1cbf665d8.webp)

- 内置 2 GHz 无线接入点模块，支持 AP/station/bridge/p2p 模式。板载 PIF 内置天线，以及用于外置天线的 MMCX 连接器（可通过软件选择）。
- 两个 miniPCIe 插槽和三个 SIM 插槽。
- 内置 GPS 模块，配有外部 SMA 连接器。
- 千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。直通线或交叉线均可用于连接其他网络设备。以太网端口接受来自无源 PoE 注入器的 12-30 V DC 供电。
- 一个 DB9 RS232 串口，用于串口控制台访问。配置为 115200 bit/s、8 个数据位、1 个停止位、无校验。
- 一个 USB 2.0 端口。
- R11e-LR8，带外部 SMA 连接器的 miniPCIe 卡。

## 安装 {#mounting}

- 可以使用随附的四颗螺钉和机身上的四个预留孔将设备固定到墙上。
- 端口由一个小门保护，该门用两颗螺钉固定。取下后可访问以太网端口、天线连接器、SIM 插槽等。
- 该门为所有可用端口预留了开口位置，因此您可以引导所有必要的线缆穿过，但请只打开您将要使用的开口。
- 机壳上提供了多处用于外置天线的位置，请使用合适尺寸的钻头将其打开。请小心并测量所选天线，以确保安装后不会触碰内部 PCB 板。

![](/img/dc0a3d4ff60b80cb.webp)

该设备可在室内和室外使用。防护等级为 IP54。

如果您打算在室外安装，请确保任何线缆开口都朝下。安装方向由设备上的向上箭头指示。请使用 POE 注入器并正确接地。建议使用 Cat6 屏蔽线缆。警告！本设备的安装和操作应保持设备与您的身体之间至少 30 厘米的距离。在居住环境中操作本设备可能会造成无线电干扰。设备外壳上设有可钻孔的位置，用于安装外部 LTE 和 GPS 天线。请使用钻头钻出适合所用天线线缆的孔。

## 配置 {#configuration}

我们建议点击 "Check for updates" 按钮并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法进行 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧通过设备的 MAC 地址进行连接（默认情况下，来自互联网端口的所有访问都被阻止）。出于恢复目的，可以从网络引导设备，请参阅（链接）部分。

## GPS {#gps}

内置 GPS 模块需要使用外部天线（SMA 连接器已安装在设备舱门后方）。有关如何取下舱门，请参阅（链接）部分。**注意** GPS 使用有源天线，请仅在设备关机时连接和断开天线！

**支持 - GPS、GLONASS、BeiDou、Galileo）。** 请确保您的设备上已安装 GPS 软件包。可通过以下命令检查 /system package print。如果未安装，请根据您的 RouterOS 版本从我们的下载页面下载额外软件包，并将 GPS 软件包拖到 Files 菜单中进行安装。启用 GPS 并开始工作：

- 启用 - /system gps set enable=yes;
- 将天线设置为外部 - /system gps set gps-antenna-select=external;
- 检查配置 - /system gps print。有关更多详细信息，请参阅 [GPS 手册](/docs/mobile-networking/gps)。

## LR 使用 {#lr-usage}

有关接口配置，请访问 [LoRa 手册](/docs/internet-of-things/lora)。

我们建议使用我们的天线套件，[https://mikrotik.com/product/lora_antenna_kit](https://mikrotik.com/product/lora_antenna_kit)

## USB 使用 {#usb-usage}

使用 LR 卡时，USB 端口的电源将由 CPU 关闭。因此它不能与 LR 卡一起使用。

## 汽车连接器使用 {#automotive-connector-usage}

![](/img/b82bafca5c454664.webp)

## 供电 {#powering}

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，正极针式插头）接受 12-30 V DC ⎓，随附 24 V、1.2 A 适配器。
- 以太网端口接受无源 PoE 12-30 V DC ⎓（需补偿线缆上的损耗，因此建议高于 12 V）。
- 汽车连接器可用于从汽车和公交车上的常规 12/24 V ⎓ 连接为设备供电。该插头有四个引脚：左下方（黑色）为接地，右下方为电源输入（红色）。上方两个（AUX）保留供将来使用。无附加设备时，最大负载下的功耗可达 12 W。请将接地（地线）线连接到舱门下方的螺钉上。

### 连接到 PoE 适配器：（不包含） {#connecting-to-a-poe-adapter-not-included}

- 将设备上的以太网线连接到 POE 适配器的 POE out 端口。
- 将来自您 LAN 的以太网线连接到 POE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 前面板状态 LED 行为 {#front-status-led-behavior}

- 常亮蓝色 – 设备已通电。
- 常亮绿色 – 用户自定义 LED，可在系统设置中配置。
- 常亮绿色 – GPS 模块状态。
- 常亮绿色– 五个绿色 LED 组成的指示灯组，显示蜂窝网络的信号强度。

![](/img/1015646a55daf823.webp)

## miniPCIe 插槽 {#minipcie-slot}

### SIM 卡连接 {#sim-card-connectivity}

- MiniPCIe 1 **LR**（顶部插槽）支持 PCIe 和 USB 2.0 卡，但与 USB 2.0 type A 端口共用（USB 端口或 miniPCIe 插槽只能同时使用其中一个）。它只能用于 SIM 插槽 #1。
- MiniPCIe 2 **LTE**（底部插槽）仅支持 USB（2.0 和 3.0）miniPCIe 调制解调器（不支持 PCIe）。使用 SIM 插槽 #2 和 SIM 插槽 #3。默认使用 SIM 插槽 #2。SIM 卡可在 ROS 中切换。
- USB 2.0 type A 端口（仅在未使用 miniPCIe 1 时可用）。如果使用 LR，USB 将被关闭。
- 要在顶部 miniPCIe 插槽中使用 USB 类型的 miniPCIe 卡，请将 USB 连接切换到 miniPCIe 插槽：/system routerboard usb set type=mini-PCIe 这将禁用设备前面的 USB 2.0 端口。**将 SIM 卡插入顶部插槽时，SIM 卡芯片朝下。底部插槽 – 芯片朝上。**

**默认情况下，LR 卡连接至 SIM 插槽 #1，该插槽不能用于其他用途。**

请检查您是否使用了正确的 SIM 插槽。对于插入底部 mini-pcie 插槽的调制解调器，您需要使用 SIM 插槽 2 或 SIM 插槽 3。并且需要在 RouterOS 中选择所使用的 SIM 插槽。用于选择 SIM 插槽的 CLI 命令：*/system routerboard modem set sim-slot=2*

### 调制解调器安装 {#modem-installation}

此 LtAP 版本的调制解调器已安装在底部插槽中。安装额外的调制解调器时，请使用上方插槽。在这种情况下，内部天线连接到底部调制解调器。安装 miniPCIe 模块应由合格人员完成，处理电气设备时请遵循安全预防措施：

- 拆包和处理电气组件时请使用腕部接地带，以避免静电放电（ESD）损坏；
- 拆下机壳底部的六颗螺钉，然后取下机壳顶部。请注意天线线缆连接到底部调制解调器；
- 找到 miniPCIe 插槽并拆下两颗出厂固定的螺钉；
- 在卡上贴上随附的厚导热垫，然后将卡安装到 miniPCIe 插槽中，使导热垫位于 PCB 和卡之间；
- 使用之前拆下的两颗螺钉将卡固定到位；
- 将天线线缆穿过 GPS 连接器附近的开口，并连接到您的调制解调器。建议使用硅橡胶固定连接器。
- 在卡的上方贴上较薄的导热垫；
- 使用外部天线时，可将连接器安装在机壳侧面，使用 6.5 mm 钻头钻孔，请参阅（链接）部分第 4 点；
- 有关如何放置橡胶密封圈以获得最佳防水效果，请参阅下图；
- 按相反顺序重新组装。PCB 螺钉的拧紧力矩为 0.3 Nm，机壳盖/外壳螺钉的拧紧力矩为 0.5 Nm。

![](/img/03bc306812c7acce.webp)

在您将设备重新装回机壳并用之前拆下的螺钉固定后，请将移动运营商的 SIM 卡滑入 SIM 插槽，芯片朝向如端口标签所示。该插槽接受 miniSIM（2FF）。SIM 插槽 2 和 3 适用于底部 miniPCIe 插槽，可在 RouterOS 的 "/system routerboard sim" 菜单中切换。

## 复位按钮 {#reset-button}

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备用 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含随设备提供的附件：

- K-67 紧固套件。包括四颗 4x25 mm 螺钉、四个 6x30 mm 膨胀螺栓。
- 直流 ⎓ 线缆（H4130-04PDB000R 3 mm 2x2P 外壳）至（StripJacket 5 cm+WireEnd Strip/Tin 1 cm）24 AWG（黑/红/蓝/橙）0.35 m。
- 欧盟/美国开关电源 24 V、1.2 A、28.8 W、86.8%、VI 级，DC ⎓ 线缆：220 cm RA DC 插头 mod Hor CMC 短插头。

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您首选的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将已自动填入。
- 点击 Connect，通过无线网络建立与您设备的连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备使用的频段与上述规定不同，则需向终端用户设备应用来自制造商/供应商的定制固件版本，并防止终端用户重新配置。
- 室外使用：终端用户需要获得 NTRA 的批准/许可。
- 任何设备的数据手册均可在制造商官方网站上获取。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，TX 功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，TX 功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，TX 功率限制为 20dBm（EIRP）。

请确保设备具有锁定软件包（来自制造商的固件版本），需要将其应用到终端用户设备以防止终端用户重新配置。该产品将标有国家代码 "-EG"。本设备需要升级到最新版本，以确保符合当地主管部门的法规！终端用户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备妥善运输至指定处置场所的程序。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>≤100 mW</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而有所不同。

有关设备制造日期的信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

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

## 乌克兰国家通信和信息领域国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2480-2483.5 MHz（20 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用须按照 NKRZI 2012 年 11 月 1 日第 559 号决定批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 在此声明，无线电设备类型 RBLtAP-2HnD&R11e-LTE&LR8 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### GSM / WCDMA / LTE / WLAN / LR {#gsm--wcdma--lte--wlan--lr}

<table><thead><tr><th>E-GSM-900</th><th>工作频率 / 最大输出功率 Betriebsfrequenz / maximale Ausgangsleistung Fréquence de fonctionnement / puissance de sortie maximale Frequenza operativa / massima potenza di uscita Frecuencia de funcionamiento / potencia de salida máxima Рабочая частота / максимальная выходная мощность</th><th>900 MHz /33 dBm</th></tr></thead><tbody><tr><td>DCS-1800</td><td>1800 MHz / 300 dBm</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 2.4 dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 2.4 dBm ± 2.7 dB</td><td></td></tr><tr><td>WLAN</td><td>2400-2483.5 MHz / 20 dBm</td><td></td></tr><tr><td>LTE BAND 1</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE BAND 3</td><td>1800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE BAND 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE BAND 8</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE BAND 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE BAND 38</td><td>3600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE BAND 40</td><td>2300 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LR (SRD)</td><td>863-870 MHz / 14 dBm</td><td></td></tr></tbody></table>

*客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 和 LTE 发射功率限值。有关更多详细信息，请参阅上文的符合性声明 / Dieses MikroTik-Gerät erfüllt die maximalen WLAN- und LTE-Sendeleistung Grenzwerte gemäß ETSI-Bestimmungen. Weitere Informationen finden Sie oben unter Konformitätserklärung / Cet appareil MikroTik respecte les limites maximales de puissance de transmission WLAN et LTE conformément aux réglementations ETSI. Pour plus d'informations, voir la déclaration de conformité ci-dessus / Questo dispositivo MikroTik è conforme ai limiti massimi di potenza di trasmissione WLAN e LTE in conformità con le normative ETSI. Per ulteriori informazioni, consultare la dichiarazione di conformità sopra / Este dispositivo MikroTik cumple con los límites máximos de potencia de transmisión WLAN y LTE de acuerdo con las regulaciones ETSI. Para obtener más información, consulte la declaración de conformidad anterior / Это устройство MikroTik соответствует максимальным пределам мощности передачи WLAN и LTE в соответствии с правилами ETSI. Для получения дополнительной информации см. Декларацию соответствия выше.
