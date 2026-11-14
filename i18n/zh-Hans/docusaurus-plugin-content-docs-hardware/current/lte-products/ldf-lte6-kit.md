---
title: "LDF LTE6 套件"
slug: /ldf-lte6-kit
source: https://manual.mikrotik.com/hardware/ldf-lte6-kit
captured_at: '2026-11-04T09:53:34+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## [LDF LTE6 kit](https://mikrotik.com/product/ldf_lte6_kit)（RBLDFR&R11e-LTE6） {#ldf-lte6-kit-rbldfrr11e-lte6}

![](/img/9e37859fd85e768a.webp)

LDF（Lite dish feed）是一款室外 LTE 系统，设计用于安装在偏置天线上。该设备内置调制解调器，开箱即可使用。完整规格与宣传册请参阅 [LDF LTE6 kit 产品页面](https://mikrotik.com/product/ldf_lte6_kit)。

## 安全警告 {#safety-warnings}

-

在进行任何设备作业之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。

-

本产品的最终处置应依照所有国家法律法规进行。

-

在任何墙面上安装接入点的所有安装方法，均须获得当地主管部门的认可。

-

设备的安装必须符合当地和国家的电气规范。

-

本产品设计用于室外安装在立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能对人员造成危险情况并损坏系统。

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

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

- 打开以太网端口盖板；
- 将 SIM 卡插入卡槽，芯片朝上；
- 用以太网线将设备连接到随附 PoE 注入器的 data+power 端；
- 将 PoE 注入器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1)；
- 用户名为 **admin**，没有密码（部分型号请在贴纸上查看用户名和无线密码）；
- 使用 check for update 选项将设备升级到最新版本。您必须有一张可用且有数据流量的 SIM 卡；
- 设备将会重启；
- 再次连接，并在 **QuickSet** 菜单中设置您所在的国家/地区，以应用该国的法规设置；
- 保护您的设备并设置强密码。

## 供电 {#powering}

本设备支持 PoE 802.3af/at 12-57 V DC ⎓。包装内包含一个 PoE 注入器。最大功耗 6 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 组装与安装 {#assembly-and-mounting}

本设备兼容标准偏置天线。按图示组装带盖板的以太网线：

- 橡胶密封圈侧面已切开，以便将其套到以太网线上。组装时它必须位于外壳螺母内部，拧紧压紧螺母会将其压紧在以太网线上。

![](/img/51f7d72bc1477a77.webp)

![](/img/01ee54020effb25c.webp)

- 将设备安装到天线上，LDF 的安装直径为 40 mm。请确保安装时箭头朝上。

![](/img/795edcfad2cc778d.webp)

- 插上以太网线，并顺时针旋紧盖板。本设备设计用于室外安装在天线上，以太网线连接到设备背面。请确保将 LDF 单元以正确的位置安装在偏置支架上——单元朝上正对天线。天线将充当反射器，放大信号。组装体的最终位置应放置在立杆上并固定。立杆安装说明请参阅您的天线安装说明。确保线缆引出口朝下。本设备的 IPX 防护等级为 IP54。

警告！本设备的安装和操作应保持设备与人体之间至少 20 cm 的距离。在住宅环境中操作本设备可能造成无线电干扰。

*本设备的安装与配置应由具备资质的人员完成。*

## SIM 卡槽的使用 {#sim-slot-usage}

![](/img/135e991cc189ac69.webp)

SIM 卡槽位于盖板下方，请按图片所示方向插入 micro-SIM 卡。芯片朝上！

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通线或交叉线连接其他网络设备。
- MiniPCIe 插槽，集成调制解调器。
- 模式按钮。

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备将开始查找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 包装清单 {#included-parts}

![](/img/a5c4f3acae885ab5.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列在 /system resource 中。其他操作系统未经测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请了解您所在地区将设备妥善运送到指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>包含的 FCCID</th></tr></thead><tbody><tr><td>RBLDFR&R11e-LTE6</td><td>TV7R11ELTE6</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装提供合理的有害干扰防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），建议用户尝试通过以下一种或多种措施来消除干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所接电路不同的插座上。
- 向经销商或有经验的无线电/电视技术人员寻求帮助。**FCC 警示：** 任何未经负责合规的一方明确批准的更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其操作须符合以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致运行异常的干扰。本设备及其天线不得与任何其他天线或发射器共址或联合运行。**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备的安装和操作应保持辐射体与您身体任何部位之间至少 20 cm 的距离。*使用 CBRS 频段时，最终主机设备的 CBSD 类别将取决于所用的功率设置和天线增益。*

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>包含的 IC</th></tr></thead><tbody><tr><td>RBLDFR&R11e-LTE6</td><td>7442A-R11ELTE6</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 标准的免许可发射器/接收器。其操作须符合以下两个条件：

-

本设备不得造成干扰；

-

本设备必须接受任何干扰，包括可能导致设备运行异常的干扰。本设备中包含的免许可发射器/接收器符合加拿大创新、科学与经济发展部针对免许可无线电设备适用的 CNR 标准。其操作须符合以下两个条件：

-

本设备不得产生干扰；

-

本设备必须接受任何接收到的无线电干扰，即使该干扰可能影响其正常运行。此 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和操作应保持辐射体与您身体任何部位之间至少 20 cm 的距离。Cet equipement est conforme aux limites d'exposition au rayonnement IC definies pour un environnement non controle. Cet equipement doit etre installe et utilise a une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备生产日期的信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份（年份的最后一位数字），后两位数字表示周数。

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

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备，须按照乌克兰国家通信与信息化监管委员会（НКРЗІ）2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，登记号 57/22589）规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBLDFR&R11e-LTE6 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>E-GSM-900</th><th>900 MHz / 33 dBm</th></tr></thead><tbody><tr><td>DCS-1800</td><td>1800 MHz / 30 dBm</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 24dB ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 24dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1700 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dB ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。更多详细信息请参见上文的符合性声明。

- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！
