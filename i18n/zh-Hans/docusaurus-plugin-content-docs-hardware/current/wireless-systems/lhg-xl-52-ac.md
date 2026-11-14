---
title: "LHG XL 52 ac"
slug: /lhg-xl-52-ac
source: https://manual.mikrotik.com/hardware/lhg-xl-52-ac
captured_at: '2026-11-04T09:55:01+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/d0a3ba8554b1fc5b.webp)

## [LHG XL 52 ac](https://mikrotik.com/product/lhg_xl_52_ac) (RBLHGG-5HPacD2HPnD-XL) {#lhg-xl-52-ac-rblhgg-5hpacd2hpnd-xl}

极其强大的双频骨干 / CPE，适用于无中断的长距离连接。完整规格和宣传册请参阅 [LHG XL 52 ac 产品页面](https://mikrotik.com/product/lhg_xl_52_ac)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气线路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 在任何墙面上安装接入点的所有安装方法均需获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计为安装在室外的立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 仅使用制造商批准的电源和配件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的做法是从电源插座上拔出电源插头。
- 客户有责任遵守当地国家/地区的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 组装设备（参见“组装”）。
- 打开以太网盖板。
- 将设备连接到 PoE（参见“连接到 PoE 适配器”）。
- 安装设备（参见“安装”）。
- 在您的 PC、手机或其他设备上打开网络连接，搜索 MikroTik 无线网络并连接。
- 可以通过 Web 浏览器或移动应用经由无线网络完成配置 -（参见“配置”）。或者，您也可以使用 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。
- 连接到无线网络后，在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始配置，用户名为 **admin**，默认没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）。
- 使用移动应用时请选择 Quick setup，它将通过六个简单步骤引导您完成所有必要的配置。
- 我们建议点击 "Check for updates" 按钮，将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。
- 在加载出的屏幕上选择您所在的国家/地区，以应用相应国家/地区的法规设置，并设置您的密码。

## 供电 {#powering}

该设备通过以太网端口接受供电：

- PoE 802.3af/at 12-57 V DC ⎓。最大负载下的功耗可达 18 W。不含附件时为 16 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备上的以太网线连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自您本地网络（LAN）的以太网线连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

- 扫描二维码并选择您喜欢的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名已自动填入。
- 点击 Connect，通过无线网络与您的设备建立连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 还有一个高级菜单，可用于完整配置所有必要的设置。

## 组装 {#assembling}

该设备需要由四个部件组装而成：LHG 天线盘、两条支腿和主体。

- 将两条支腿安装到主体上，两条支腿不同，并标有 L 和 R。
- 将组装好的部件安装到天线盘上。
- 使用 PH2 螺丝刀以随附的螺钉固定。

![](/img/bce1ac9b11d00ada.webp)

## 安装 {#mounting}

LHG XL ac 设计用于室外，安装在立杆或桅杆上。包装内含一个可调节的安装组件。

安装时，请确保线缆出口朝下。该设备的 IP 防护等级为 IP54。我们建议使用 Cat6 屏蔽网线。警告！本设备的安装和操作应保持设备与人体之间至少 20 cm 的距离。在居住环境中操作本设备可能会造成无线电干扰。本设备的安装和配置应由具备资质的人员完成。

包装中随附安装组件。

![](/img/6099d00a8f5d161e.webp)

- 使用四颗螺钉将安装组件固定到天线盘背面。
- 使用 U 型卡箍将设备固定到立杆上，按图示顺序放置垫圈和螺母。
- 根据信号调整设备方向，并拧紧螺母。
- 设备应始终以 UP 箭头朝上的方式放置。

![](/img/646de475ba3c9d96.webp)

## 接地 {#grounding}

安装基础设施（塔和桅杆）以及路由器本身都必须正确接地。该设备在以太网盖板后方设有一个接地线连接器。将接地线连接到接地连接器，然后将接地线的另一端连接到已接地的桅杆上。请将所有松散的以太网线和天线线缆固定在距离设备约 30cm 处的立杆或桅杆上，以免线缆重量拉扯端口和连接器。

## 前面板状态 LED 行为 {#front-status-led-behavior}

RouterOS 允许按用户意愿配置每个 LED 的活动。可以将 LED 配置为显示无线信号强度、在接口流量活动时闪烁以及许多其他选项。更多信息请访问 [LEDs](/docs/hardware/leds) 手册页面。此设备的出厂默认配置：

![](/img/64256ab08972f54c.webp)

- 绿色 LED 第四个信号强度等级。
- 绿色 LED 第三个信号强度等级。
- 绿色 LED 第二个信号强度等级。
- 绿色 LED 第一个信号强度等级。
- 常亮绿色 – SFP 端口活动。
- 常亮绿色 – 以太网端口活动。
- 常亮绿色 – 用户自定义 LED。
- 常亮蓝色 – 设备已通电。

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 配置 {#configuration}

该设备被配置为无线客户端，您需要选择要连接的 AP 并设置密码。我们建议在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。请确保您已选择设备将使用的国家/地区，以符合当地法规。除了本文档所述内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始了解各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问都被阻止）。出于恢复目的，可以让设备引导以进行重新安装，请参见“Reset 按钮”一节。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。可以使用直通线或交叉线连接到其他网络设备。
- SFP 端口。
- 集成无线模块，工作在 2.4 GHz，802.11b/g/n 协议。
- 集成无线模块，工作在 5 GHz，802.11a/n/ac 协议。

## Reset 按钮 {#reset-button}

Reset 按钮有三个功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在将搜索 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RBLHGG-5HPacD2HPnD-XL 搜索 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电之前按住按钮，系统都会加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含随设备提供的以下配件：

- 欧盟开关电源 24 V ⎓ 1.2 A 28.8 W 86.8 % VI 220 cm RA DC 插头，横向短插头型。
- 千兆 PoE 注入器。
- LHG 外壳
- LHG 支腿 L、R。
- LHG XL 550mm 天线盘
- 安装组件
- LHG 2 紧固件套装。
- LHG 60 紧固件套装。请参阅 [MikroTik SFP 模块兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/lhg_xl_52_ac](https://mikrotik.com/product/lhg_xl_52_ac)

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请了解您所在地区将设备妥善运送至指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBLHGG-5HPacD2HPnD-XL</td><td>TV7LHG5HPACD2HPD</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装环境中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再开启设备来判断），建议用户尝试通过以下措施之一来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 向经销商或有经验的无线电/电视技术人员寻求帮助。FCC 警告：任何未经负责合规的一方明确批准的更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受收到的任何干扰，包括可能导致非预期操作的干扰。本设备及其天线不得与任何其他天线或发射器共址或协同工作。使用 CBRS 频段时，最终主机设备的 CBSD 类别将取决于所用的功率设置和天线增益。**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境所规定的射频辐射暴露限值。本设备的安装和操作应保持辐射体与您身体任何部位之间的最小距离为 20 cm。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBLHGG-5HPacD2HPnD-XL</td><td>7442A-LHG5ACD2HPD</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。操作须符合以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。本设备符合加拿大工业部针对免许可无线电设备适用的 CNR 标准。允许在以下两个条件下运行：(1) 设备不得产生干扰；(2) 用户必须接受设备所受到的任何无线电干扰，即使该干扰可能影响其正常运行。

在 5150–5250 MHz 频段工作的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境所规定的辐射暴露限值。本设备的安装和操作应保持辐射体与您身体任何部位之间的最小距离为 20 cm。本设备符合 IC 针对非受控环境所定义的辐射暴露限值。本设备的安装和使用应保持辐射体与您身体任何部位之间的最小距离为 20 cm。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而异。

设备生产日期信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

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

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 МГц (30 дБм)、5150-5250 МГц (23 дБм)、5250-5350 МГц (20 дБм)、5470-5725 МГц (27 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBLHGG-5HPacD2HPnD-XL 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相应型号）</th><th>使用的信道</th><th>最大输出功率 (EIRP)</th><th>限制</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家/地区的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更详细的信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备遵守 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限制。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明。

***BG. 说明***
