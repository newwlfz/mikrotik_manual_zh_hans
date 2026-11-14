---
title: "Metal 52 ac"
slug: /metal-52-ac
source: https://manual.mikrotik.com/hardware/metal-52-ac
captured_at: '2026-11-04T09:56:37+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/fa3177f820e53e92.jpg)

## [Metal 52 ac](https://mikrotik.com/product/RBMetalG-52SHPacn) (RBMetalG-52SHPacn) {#metal-52-ac-rbmetalg-52shpacn}

RBMetalG-52SHPacn Metal 出厂时预装在室外机壳中，内置无线接口、一个 N-Male 天线接头，以及一个支持 MDI-X 自动检测的 10/100/1000 以太网接口。该设备包装内附带 24 V 电源适配器、PoE 注入器和两个安装环。提供多种型号（双频、单频、AP 和 CPE 变体）。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家电气规范。
- 本产品适合安装在室外立杆上。开始安装前，请仔细阅读安装说明。使用错误的硬件和配置或未遵循正确程序，可能导致人员处于危险境地并对系统造成损坏。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座拔下电源插头。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和操作时，应与您的身体、职业用户或公众保持至少 20 厘米的距离。

## 快速开始 {#quickstart}

- 将天线连接到 N-Male 接头（参见天线使用）；
- 打开以太网端口盖（参见打开以太网盖）；
- 将线缆穿过盖子并连接到以太网端口（参见打开以太网盖）；
- 设备接受来自 PoE 注入器的 10-30 V Passive PoE。随附的注入器应将 "Data" 端连接到 PC，"Data + Power" 端口应使用所需长度的以太网线缆（未附带）连接到设备；
- 使用随附的橡胶绝缘件套在以太网线缆上，并将其推入外壳开口，使开口紧密封闭；
- 使用以太网线缆将设备连接到随附 PoE 注入器的 data+power 端；
- 将 PoE 注入器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 通过 **WebFig** 或 **WinBox** 工具在 [https://mt.lv/winbox](https://mt.lv/winbox) 使用 Web 浏览器配置设备。**提供多种配置方法以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，导航到 **Neighbors** 选项卡，然后单击 MAC 地址。用户名为 "**admin**"，密码为空（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描 QR 码并选择您首选的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将已输入。
- 单击 Connect，通过无线网络与您的设备建立连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要设置。

## 供电 {#powering}

设备可通过以太网端口（Passive PoE）供电。在最大负载下，本设备的功耗为 11 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备上的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络 (LAN) 的以太网线缆连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

RouterOS 除本文档所述内容外，还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help)。如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 internet 端口的所有访问均被阻止）。

## 安装 {#mounting}

设备应垂直安装，使以太网线缆朝下。

*本设备的安装和配置应由合格人员完成。*

如果要将设备紧固到立杆上，可以使用随附的安装环。设备附带两个安装环——将安装环穿过提供的边缘标记并绕过设备，再绕过将要安装的立杆。

可使用电工胶带增加材料之间的摩擦力，将其用在卡箍与安装表面之间。这有助于将设备固定到位。包装中提供安装软管卡箍。

![](/img/a6b1a7f28ce9b084.webp)

- 将软管卡箍穿过设备背面的开口。
- 固定到立杆或桅杆上。
- 使用 PH2 螺丝刀通过软管卡箍螺丝对齐并固定。设备放置时应使天线朝上。应避免将松散的以太网线缆连接到以太网端口，请将线缆固定到墙壁或立杆上，以免线缆重量拉扯端口。建议在距设备小于 2m 处固定以太网线缆。这是为了确保线缆不会因其重量损坏端口，也不会脱落。

安装时，请确保电缆入口朝下。本设备的 IP 防护等级为 IP54。我们建议使用 Cat6 屏蔽线缆。警告！本设备安装和操作时，设备与身体之间应保持至少 20 cm 的距离。在住宅环境中操作本设备可能会造成无线电干扰。

## 打开以太网盖 {#opening-ethernet-cover}

![](/img/3e5c964590f9b4e3.webp)

- 要打开盖子，请松开两个紧固件的卡扣，盖子即可打开。
- 将以太网线缆穿过盖子开口中的橡胶密封件。
- 在电缆上压接 RJ-45 接头，并连接到以太网端口。

## 天线使用 {#antenna-usage}

将天线拧到设备上的接头上以连接天线。

![](/img/27e497f2e7a39c3c.webp)

请在设备关闭时连接和断开天线！

## 复位按钮 {#reset-button}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RBMetalG-52SHPacn 查找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 规格 {#specifications}

有关本产品、规格和图片的更多信息，请访问我们的网页：[https://mikrotik.com/product/RBMetalG-52SHPacn](https://mikrotik.com/product/RBMetalG-52SHPacn)。RBMetalG-52SHPacn-US（美国）在出厂时锁定 2412-2462MHz、5170-5250MHz 和 5725-5835MHz 频率。此锁定无法移除。RBMetalG-52SHPacn（国际版）支持 2412-2484MHz 和 5150MHz-5875MHz 范围（具体频率范围可能受国家/地区法规限制）。

## 配件 {#accessories}

包装内包含以下随设备附带的附件：

- 欧盟/美国开关电源 24 V ⎓ 0.8A，19.2 W。
- 用于 N FEMALE 的 2.4Ghz/5Ghz 双频全向天线，6 dBi，灰色，PVC 外壳，长度 285 mm。
- 千兆 POE 注入器。
- 塑料扎带紧固件 2 件。
- 软管卡箍 50 / 70 2 件。
- N-Male 转 N-Female 直角转接头。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场。请熟悉您所在地区将设备正确运输至指定处置场的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBMetalG-52SHPacn</td><td>TV7MTLG52SHPN</td></tr></tbody></table>

本设备已经过测试，符合

![](/img/ce6fc3eb10b9a1e6.webp)

Class B 数字设备的限值，依据 FCC 规则第 15 部分。这些限值旨在为住宅安装中的有害干扰提供合理保护。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下措施之一来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的间隔。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。**FCC 警告：** 未经合规责任方明确批准的任何更改或修改，都可能导致用户操作本设备的权限失效。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受接收到的任何干扰，包括可能导致不良操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或协同操作。

**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用经本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，明确禁止使用任何未经本产品认证的天线。安装人员应根据国家/地区法规和每种天线类型配置天线的输出功率水平。带有接头的设备需要由专业人员安装，以确保符合健康与安全要求。**获准的 2.4 GHz 天线列表：** • 24 dBi 碟形天线 DC 24-HD-PFIP • 20 dBi 平板天线 WLP-2450-20 • 17 dBi 扇区天线 SA 24-90-17-WB • 15 dBi 全向天线（立杆）WL0-2450-15 • 13 dBi 全向天线（水平极化）HP, 0DH 24-13 **获准的 5GHz 天线列表：** • 8.5 dBi 全向天线 MTI Wireless MT-482016NA • 24 dBi 平板天线 Pacific Wireless PA58-24 • 32 dBi 碟形天线 Pacific Wireless HDDA5W-32-DP 在符合认证要求的情况下，可使用与上述类型相同且增益更低的天线。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBMetalG-52SHPacn</td><td>7442A-MG52SHPAC</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，并且 (2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。允许在以下两个条件下操作：(1) 设备不得产生干扰，并且 (2) 用户必须接受设备受到的任何无线电干扰，即使该干扰可能影响设备的正常运行。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

在 5150–5250 MHz 频段运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射器功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz、5150-5350 MHz、5650-5850 MHz</td><td>≤100 mW</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息以斜杠分隔的形式标注在其标签上的序列号末尾。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

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

工作频率（最大输出功率）：2400-2483.5 MHz（30 dBm）、5150-5250 MHz（23 dBm）、5250-5350 MHz（20 dBm）、5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用设备，必须按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定批准、并在乌克兰司法部 2013 年 1 月 3 日第 57/22589 号登记的秩序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBMetalG-52SHPacn 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相应型号）</th><th>使用的信道</th><th>最大输出功率 (EIRP)</th><th>限制</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布线要求和动态频率选择 (DFS) 要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更详细信息，请参见上文的符合性声明。 / 本 MikroTik 设备符合 ETSI 规定所规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。有关更多信息，请参见上文的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。有关更多信息，请参见上文的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。有关更多信息，请参见上文的符合性声明。 / 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 最大发射功率限值。有关更多信息，请参见上文的符合性声明。

![](/img/0561b3ba8c95a35c.webp)

本设备在 5150 至 5350 MHz 频率范围内工作时，其 WLAN 功能仅限室内使用。 / 本设备在 5150 至 5350 MHz 频率范围内工作时，其 WLAN 功能仅限室内使用。 / 本设备在 5150 至 5350 MHz 频率范围内工作时，其 WLAN 功能仅限室内使用。 / 本设备在 5150 至 5350 MHz 频率范围内工作时，其 WLAN 功能仅限室内使用。 / 本设备在 5150 至 5350 MHz 频率范围内工作时，其 WLAN 功能仅限室内使用。 / 本设备在 5150 至 5350 MHz 频率范围内工作时，其 WLAN 功能仅限室内使用。
