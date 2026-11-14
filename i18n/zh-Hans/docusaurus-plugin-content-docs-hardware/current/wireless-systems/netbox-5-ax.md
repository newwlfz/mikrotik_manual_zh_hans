---
title: "NetBox 5 ax"
slug: /netbox-5-ax
source: https://manual.mikrotik.com/hardware/netbox-5-ax
captured_at: '2026-11-04T09:57:00+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/e1dfd2faec31c861.jpg)

## [NetBox 5 ax](https://mikrotik.com/product/netbox_5_ax)（L11UG-5HaxD-NB） {#netbox-5-ax-l11ug-5haxd-nb}

广受欢迎的 NetBox 5 的 Wi-Fi 6 升级版。AP/CPE/点对点——它样样都能胜任！PoE-in、DC 插孔、千兆以太网、耐用的室外机壳、现代双核 ARM CPU、Wi-Fi-6 5GHz 无线。完整规格和手册请参见 [NetBox 5 ax 产品页面](https://mikrotik.com/product/netbox_5_ax)。

## 安全警告 {#safety-warnings}

- 在对任何 MikroTik 设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。
- 请只使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 本设备应由经过培训的合格人员按照本安装说明进行安装。安装人员负责确保设备的安装符合当地和国家的电气规范。请勿尝试拆卸、修理或改装设备。
- 本产品设计用于在室外安装于立杆上。开始安装前请仔细阅读安装说明。使用错误的硬件和配置或不遵循正确的步骤，可能对人员造成危险并损坏系统。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如设备发生故障，请断开其电源。最快的方法是将电源适配器从电源插座上拔下。
- 为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的区域。请熟悉将设备正确运送到您所在地区指定收集点的程序。
- 本产品为 A 类产品。在住宅环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 取下上盖（参见"取下上盖"）；
- 在连接电源之前，请先将天线连接到 SMA 接口（参见"天线使用"）；
- 打开底盖（参见"打开底盖"）；
- 使用以太网线将设备连接到随附的 PoE 注入器的 data+power 端；
- 将 PoE 注入器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 通过网页浏览器使用 **WebFig** 或 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）配置您的设备。**提供多种配置方法以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 即可访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后点击 MAC 地址。用户名为 "**admin**"，无密码（或对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将您的 RouterOS 软件更新到最新版本可确保最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家/地区，以应用该国家/地区的法规设置；
- 在左侧字段设置您的无线网络密码；
- 在底部字段设置您的路由器密码。

## 供电 {#powering}

设备可通过以下方式供电：

- 以太网端口支持 Passive PoE 18-28 V DC ⎓。无外接附件时，设备最大功耗为 6W。在最大负载下，其功耗可达 15W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 使用以太网线将设备连接到随附的 PoE 注入器，插入 data+power 或 PoE-out 端口；
- 将 PoE 注入器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 注入器。

## 取下上盖 {#removing-upper-cover}

![](/img/2eda41655896d023.webp)

- 要取下上盖，请按下两侧的卡扣。
- 握住机身，将盖子向侧面拉出。组装时请勿在上盖上留下痕迹或标记。

## 打开底盖 {#opening-bottom-cover}

- 要打开底盖，请拧下锁定螺钉。
- 将盖子稍微从设备机身拉开。

![](/img/f16854c33d3acfab.webp)

![](/img/11ca542b5f33e0e8.webp)

- 将其提起，但不要完全取下。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。连接其他网络设备时，可使用直通线或交叉线。
- USB Type-A 端口。
- 2 个外部 SMA 天线接口。
- 内置无线模块，工作于 5 GHz，采用 802.11a/n/ac/ax 协议。

## 安装 {#mounting}

NetBox 5 ax 设计用于室外使用，可安装在立杆或 DIN 导轨上。安装时，请确保线缆入口朝下。本设备的 IP 防护等级为 IP54。我们建议使用 Cat6 屏蔽网线。警告！本设备的安装和操作应确保设备与人体之间的最小距离为 240 cm。本设备在住宅环境中运行可能造成无线电干扰。*本设备的安装和配置应由合格人员完成。*

### 安装在立杆上 {#mounting-on-the-pole}

包装中随附安装用喉箍。

- 将喉箍穿过设备背面的开口，并将其固定到立杆上。
- 使用 PH2 螺丝刀对齐并用喉箍螺钉固定。
- 设备应始终保持 TOP 盖朝上放置。

![](/img/165c32108e3b52e8.webp)

-

连接您的天线。

![](/img/906ecf02037cf996.webp)

-

天线不随设备提供，仅用于示意。

## 接地 {#grounding}

安装基础设施（塔和立杆）必须正确接地。请将所有松散的以太网线和天线线缆固定在距设备约 30cm 的立杆或桅杆上，以免线缆重量拉扯端口和接头。

### 使用 DIN 导轨安装 {#mounting-using-din-rail}

![](/img/9557df4fd23ac02e.webp)

在 DIN 导轨上安装时，请在包装中找到专用的支架，并用四颗螺钉将其固定到设备的背面。装上安装支架后，您就可以将设备滑入 DIN 导轨。

## 前面板状态 LED 行为 {#front-status-led-behavior}

LED 位于底盖下方。

![](/img/ecec391ed34e87dd.webp)

RouterOS 允许用户按自己的意愿配置每个 LED 的活动。可以将 LED 配置为显示无线信号强度、随接口流量活动闪烁以及许多其他选项。更多信息请参见 [LEDs](/docs/hardware/leds) 页面。本设备的出厂默认配置：

![](/img/7c85a8cc68fc9a22.webp)

- 常亮蓝色 – 设备已通电。
- 常亮绿色 – 表示设备在启动进入不同模式（例如重置配置或为 Netinstall 工具引导设备）时的状态。
- 常亮绿色 – 以太网端口活动。
- 4-8 常亮绿色 – 这组五个绿色 LED 显示信号强度。

## 配置 {#configuration}

我们建议在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将您的 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。请确保您已选择设备将要使用的国家/地区，以符合当地法规。除了本文档所述内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始，让您熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。请向您当地的培训师寻求更多帮助，或自己成为培训师。[https://mikrotik.com/training/about](https://mikrotik.com/training/about) 出于恢复目的，可以引导设备以进行重新安装，请参见章节 。

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

- EU/US 开关电源 24 V DC ⎓，1.2 A，28.8 W。
- 喉箍 35/70 w4 A2 9 mm。
- 带屏蔽接头的千兆 POE 注入器线缆（RBGPOE）。
- K-27 DIN 导轨支架安装套件。

## 天线使用 {#antenna-usage}

![](/img/55046c863770027a.webp)

要连接外部天线，请使用 "Flex-guide"——可单独购买。这是一根超低损耗的 50cm 长 RPSMA 线缆，可实现卓越的连接质量，适用于室内和室外使用，该线缆具有出色的匹配和损耗值。[https://mikrotik.com/product/ACRPSMA](https://mikrotik.com/product/ACRPSMA) SMA 接口位于上盖下方（参见"取下上盖"）以便接入。

请在设备关闭时连接和断开天线！

配置信息请参见 [无线接口](/docs/wireless/abgn/wireless-interface)。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/netbox_5_ax#fndtn-specifications](https://mikrotik.com/product/netbox_5_ax#fndtn-specifications)

[https://i.mt.lv/cdn/product_files/NetBox5ax_240425.pdf](https://i.mt.lv/cdn/product_files/NetBox5ax_240425.pdf)

L11UG-5HaxD-NB-US（美国）在出厂时锁定为 5170-5330MHz、5490-5730MHz 和 5735-5835MHz 频段。此锁定无法解除。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及更高版本。具体的出厂预装版本列于 /system resource 中。其他操作系统未经测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场。请熟悉将设备正确运送到您所在地区指定处置场的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBDisc-5nD</td><td>TV7RB922-5HPACTM</td></tr></tbody></table>

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能造成有害干扰，此时用户将被要求自行承担费用纠正干扰。

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，(2) 本设备必须接受任何收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或联合运行。

**重要：射频辐射暴露。**

本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备的安装和操作应确保辐射体与您身体任何部位之间的最小距离为 20 cm。

**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地方）使用授权天线时，仅使用经本产品认证的天线。根据 FCC 规则 CRF47 第 15.204 部分，明确禁止使用任何未经本产品认证的天线。安装人员应根据国家/地区法规并按照天线类型配置天线的输出功率水平。*带接头的设备需要专业安装，以确保符合健康和安全要求。*

**认可的 5GHz 天线列表：**

- 8.5 dBi 全向天线（型号：MT-482016/N/A）
- 24 dBi 平板天线（型号：PA58-24-ANT）
- 32 dBi 碟形天线（型号：HDDA5W-32-DP2）根据认证，也可使用与上述类型相同且增益更低的天线。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBDisc-5nD</td><td>7442A-9225HPACT</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

工作在 5150–5250 MHz 频段的设备仅供室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

天线安装警告：安装人员有责任确保在加拿大（或适用 IC 规则的地方）使用授权天线时，仅使用经本产品认证的天线。安装人员应根据国家/地区法规并按照天线类型配置天线的输出功率水平。带接头的设备需要专业安装，以确保符合健康和安全要求。

**重要：射频辐射暴露。**

本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和操作应确保辐射体与您身体任何部位之间的最小距离为 20 cm。

**认可的 5GHz 天线列表：**

- 8.5 dBi 全向天线（型号：MT-482016/N/A）
- 24 dBi 平板天线（型号：PA58-24-ANT）
- 32 dBi 碟形天线（型号：HDDA5W-32-DP2）根据认证，也可使用与上述类型相同且增益更低的天线。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>5650-5850 MHz</td><td>≤100 mW</td></tr></tbody></table>

*可用频段可能因产品型号和认证而异。

设备生产日期信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备，须按 NKРЗІ 2012 年 11 月 1 日第 559 号决定（于 2013 年 1 月 3 日在乌克兰司法部登记，登记号 № 57/22589）规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 在此声明，无线电设备类型 RB911G-5HPacD-NB 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相关型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家/地区法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限制。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明。
