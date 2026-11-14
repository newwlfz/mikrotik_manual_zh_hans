---
title: "NetBox 5"
slug: /netbox-5
source: https://manual.mikrotik.com/hardware/netbox-5
captured_at: '2026-11-04T09:56:39+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## [NetBox 5](https://mikrotik.com/product/RB911G-5HPacD-NB)（RB911G-5HPacD-NB） {#netbox-5-rb911g-5hpacd-nb}

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 在任意墙面上安装接入点的所有安装方式均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计为安装在户外的立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 请仅使用制造商批准的电源和附件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用本设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。
- 这是 A 类设备。在居住环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 取下上盖（参见取下上盖）；
- 将外置天线连接到 SMA 连接器（参见天线使用）；
- 打开底盖（参见打开底盖）；
- 使用以太网线将设备连接到附带的 PoE 供电器（注入器）的数据+电源端；
- 将 PoE 供电器的数据端连接到计算机；
- 将电源适配器连接到 PoE 供电器；
- 使用从 DHCP 服务器获得的 IP 地址连接到设备。用户名为 "**admin**"，无密码（某些型号请查看贴纸上的用户和无线密码），通过 **WebFig** 或 **WinBox** 工具连接；
- 配置设备，使其具有可用的互联网连接 [https://mt.lv/configuration](https://mt.lv/configuration)；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将您的 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet, PTP Bridge AP" 菜单中进行以下设置：选择您的国家/地区，以应用国家法规设置；
- 根据所使用的天线设置天线增益；
- 在底部字段中设置您的路由器密码。

## 供电 {#powering}

本设备可通过以下方式接受供电：

-

以太网端口接受 Passive PoE 8-30 V DC ⎓。最大负载下的功耗可达 11.5 W。连接到 PoE 适配器：

-

将以太网线从设备连接到 PoE 适配器的 PoE+DATA 端口。

-

将以太网线从您的本地网络（LAN）连接到 PoE 适配器。

-

将电源线连接到适配器，然后将电源线插入电源插座。

## 取下上盖 {#removing-upper-cover}

![](/img/337855e5187dd025.webp)

- 要取下上盖，请按下两侧的卡扣。
- 握住机身，将盖子向侧面拉开。组装时请勿在上盖上留下痕迹或参考标记。

## 打开底盖 {#opening-bottom-cover}

- 要打开底盖，请向上按压卡扣以松开。
- 将盖子从设备机身稍微拉开。

![](/img/6d2916bd171187aa.webp)

- 将其抬起，但不要完全取下。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。可使用直通线或交叉线连接到其他网络设备。
- 外部 SMA 天线连接器。
- 集成无线模块，工作在 5 GHz，802.11a/n/ac 协议。

## 安装 {#mounting}

Netbox 5 设计用于户外，可安装在立杆或 DIN 导轨上。安装时，请确保线缆馈出方向朝下。本设备的 IP 防护等级为 IP54。我们建议使用 Cat6 屏蔽线缆。警告！本设备的安装和运行位置与您的身体之间应保持至少 240 cm 的距离。在居住环境中操作本设备可能造成无线电干扰。*本设备的安装和配置应由合格人员完成。*

### 安装在立杆上 {#mounting-on-the-pole}

包装中附带安装用软管卡箍。

- 将软管卡箍穿过设备背面的开口，并将其固定在立柱上。
- 使用 PH2 螺丝刀，对齐并用软管卡箍螺丝固定。
- 设备应始终保持顶盖朝上。
- 连接您的天线。

![](/img/906ecf02037cf996.webp)

- 天线不随设备提供，仅用于图示说明。

## 接地 {#grounding}

安装基础设施（塔和立柱）必须正确接地。请将所有松散的以太网线和天线线缆固定在距设备约 30cm 处的立杆或立柱上，以免线缆重量拉扯端口和连接器。

### 使用 DIN 导轨安装 {#mounting-using-din-rail}

![](/img/fe5138b7c8bd03de.webp)

在 DIN 导轨上安装时，请在包装中找到专用支架，并用四颗螺丝将其固定到设备背面。装好安装支架后，您就可以将设备滑入 DIN 导轨。

## 前面板状态 LED 行为 {#front-status-led-behavior}

RouterOS 允许按用户意愿配置每个 LED 的活动。可以配置 LED 显示无线信号强度、随接口流量活动闪烁 LED 以及许多其他选项。更多信息请访问 [LEDs](/docs/hardware/leds) 手册页面。本设备的出厂默认配置：

![](/img/7c85a8cc68fc9a22.webp)

- 常亮蓝灯 – 设备已通电。
- 常亮绿灯 – 用户自定义 LED。
- 常亮绿灯 – 活动以太网端口。
-

- 常亮绿灯 – 五个绿色 LED 的组合显示信号强度。

## 配置 {#configuration}

我们建议在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。请确保您已选择设备将要使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包括许多配置选项。我们建议从这里开始了解各种可能性：[https://mt.lv/help](https://mt.lv/help)。如果没有可用的 IP 连接，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。请向您当地的培训师寻求更多帮助，或自己成为培训师。[https://mikrotik.com/training/about](https://mikrotik.com/training/about) 出于恢复目的，可以让设备引导以进行重新安装，请参阅 部分。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（总计 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（总计 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总计 15 秒）。无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都将加载备份的 RouterBOOT 引导程序。这对 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含随设备提供的以下附件：

- 欧盟/美国开关电源 24 V DC ⎓，0.8 A，19.2 W。
- 软管卡箍 40/60 w2 A2 9 mm。
- 2 个 - 塑料扎带紧固件（300 mm（长）7.6 mm（宽））。
- 带屏蔽连接器的千兆 POE 供电器线缆（RBGPOE）。
- K-27 DIN 导轨支架安装套件。

## 天线使用 {#antenna-usage}

![](/img/55046c863770027a.webp)

要连接到外置天线，请使用 "Flex-guide" —— 可单独购买。这是一条超低损耗 50cm 长的 RPSMA 线缆，可实现卓越的连接质量，适用于室内和室外使用，该线缆提供出色的匹配和损耗值。[https://mikrotik.com/product/ACRPSMA](https://mikrotik.com/product/ACRPSMA) SMA 连接器位于上盖下方（参见取下上盖），以便检修。

请在设备关闭时连接和断开天线！

有关配置信息，请参阅 [Wireless Interface](/docs/wireless/abgn/wireless-interface)。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/RB911G-5HPacD-NB](https://mikrotik.com/product/RB911G-5HPacD-NB)

[https://i.mt.lv/cdn/product_files/NetBox_190842.pdf](https://i.mt.lv/cdn/product_files/NetBox_190842.pdf)

- RB911G-5HPacD-NB-US（美国）出厂锁定在 5170-5250MHz 和 5725-5835MHz 频率。此锁定无法解除。
- RB911G-5HPacD-NB（国际版）支持 5150MHz-5875MHz 范围（具体频率范围可能受国家法规限制）。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及更高版本。出厂安装的具体版本列于 /system resource 中。其他操作系统未经测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如送往指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBDisc-5nD</td><td>TV7RB922-5HPACTM</td></tr></tbody></table>

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制要求。这些限制旨在为商业安装环境中的有害干扰提供合理防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在居住区操作本设备很可能造成有害干扰，此时用户需自费纠正干扰。

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分的要求。其操作须满足以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共址或联合运行。

**重要提示：射频辐射暴露。**

本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备的安装和运行位置与辐射体及您身体任何部位之间的距离应至少为 20 cm。

**天线安装。警告：** 安装者有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用经产品认证的天线。根据 FCC 规则 CRF47 第 15.204 部分，明确禁止使用任何未经产品认证的天线。安装者应根据国家法规和天线类型，配置天线的输出功率水平。*带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。*

**经批准的 5GHz 天线列表：**

- 8.5 dBi 全向天线（型号：MT-482016/N/A）
- 24 dBi 面板天线（型号：PA58-24-ANT）
- 32 dBi 碟形天线（型号：HDDA5W-32-DP2）根据认证，也可使用与上述类型相同且增益更低的天线。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBDisc-5nD</td><td>7442A-9225HPACT</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。其操作须满足以下两个条件：(1) 本设备不得造成干扰，并且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

工作在 5150–5250 MHz 频段的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

天线安装警告：安装者有责任确保在加拿大（或适用 IC 规则的地区）使用授权天线时，仅使用经产品认证的天线。安装者应根据国家法规和天线类型，配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

**重要提示：射频辐射暴露。**

本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行位置与辐射体及您身体任何部位之间的距离应至少为 20 cm。

**经批准的 5GHz 天线列表：**

- 8.5 dBi 全向天线（型号：MT-482016/N/A）
- 24 dBi 面板天线（型号：PA58-24-ANT）
- 32 dBi 碟形天线（型号：HDDA5W-32-DP2）根据认证，也可使用与上述类型相同且增益更低的天线。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而有所不同。

有关设备生产日期的信息标注在其标签上序列号的末尾部分，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

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

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5470-5725 МГц（27 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 NKРЗІ 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 在此声明，无线电设备类型 RB911G-5HPacD-NB 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相应型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 最大发射功率限值。更多详细信息请参见上文的符合性声明。
