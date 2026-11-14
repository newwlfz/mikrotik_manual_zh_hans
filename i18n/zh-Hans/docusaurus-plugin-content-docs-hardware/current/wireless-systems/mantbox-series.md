---
title: "mANTBox 系列"
slug: /mantbox-series
source: https://manual.mikrotik.com/hardware/mantbox-series
captured_at: '2026-11-04T09:56:12+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **[mANTBox 15s](https://mikrotik.com/product/RB921GS-5HPacD-15S)** (RB921GS-5HPacD-15S)
- **[mANTBox 2 12s](https://mikrotik.com/product/mantbox_2_12s)** (RB911G-2HPnD-12S)
- **[mANTBox 19s](https://mikrotik.com/product/RB921GS-5HPacD-19S)** (RB921GS-5HPacD-19S)

:::

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 在将系统连接到电源之前，请阅读安装说明。
- 本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责取得当地主管部门/检验部门对安装结构完整性要求的任何当地或国家安全检查。
- 将接入点安装在任何墙面上的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家电气规范。
- 本设备设计用于安装在户外立杆上。开始安装前请仔细阅读安装说明。
- 未使用正确的硬件和配置或未遵循正确的操作程序，可能会对人员造成危险情况并损坏系统。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负。
- 本设备需要升级到 RouterOS v6.48.3 或最新版本，以确保符合当地主管部门法规。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。安装和操作本 MikroTik 设备时，应与您的身体、职业使用者或公众保持不少于 20 厘米的距离。

## 快速开始 {#quickstart}

- 打开盖子；
- 用以太网电缆将设备连接到随附 PoE 注入器的 data+power 端；
- 将 PoE 注入器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 使用 Web 浏览器通过 **WebFig** 或 [https://mt.lv/WinBox](https://mt.lv/WinBox) 中的 **WinBox** 工具配置设备；**提供多种配置方法以确保可访问性；**
- 通过打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，导航到 **Neighbors** 选项卡，然后单击 MAC 地址。用户名为“**admin**”，无密码（或者，对于某些型号，请查看贴纸上的用户密码和无线密码）；
- 点击“Check for updates”按钮，并将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡并具有活动的互联网连接；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在“Downloads”部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的“**Files**”菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置路由器密码。

## 供电 {#powering}

设备附带 24 V 0.8 A 电源适配器。它可与随附的 PoE 注入器或电源插孔配合使用。设备在两种方式下均接受 8-30 V。设备在 24 V 时的最大功耗为 11 W，具体型号的功耗如下所示。

mANTBox 15s (RB921GS-5HPacD-15S)- 13 W

mANTBox 2 12s (RB911G-2HPnD-12S)- 11 W

mANTBox 19s (RB921GS-5HPacD-19S)- 13 W

## 配置 {#configuration}

我们建议点击“Check for updates”按钮，并将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。RouterOS 除了本文档所述内容外还包含许多配置选项。我们建议访问 RouterOS 文档页面以熟悉这些功能：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的访问全部被阻止）。

## 安装 {#mounting}

mANTbox 12s 和 15s 配备 QuickMount 适配器，可使用随附的螺丝将其固定到墙上，或使用随附的金属安装环将其固定到立杆上。QuickMount 允许在水平和垂直方向调整设备。

- 将快装支架安装到设备背面。

![](/img/c2aeb3d4527b034d.jpg)

## [mANTBox 2 12s](https://mikrotik.com/product/mantbox_2_12s) (RB911G-2HPnD-12S) {#mantbox-2-12s-rb911g-2hpnd-12s}

![](/img/f1b9c851a1837362.webp)

- 将设备固定到立杆上。
- 使用随附的钢制卡箍将其固定。夹紧直径 35 – 70 mm。

![](/img/006d6b97c4c91436.webp)

- 请避免将松动的以太网电缆连接到以太网端口，应将电缆固定到墙面或立杆上，以免电缆重量拉扯端口。建议在距设备小于 2m 处固定以太网电缆。这是为了确保电缆不会因其重量损坏端口，也不会脱落。我们建议使用 Cat6 屏蔽电缆。警告！安装和操作本设备时，设备与身体之间应保持至少 25 cm 的距离。在住宅环境中操作本设备可能会造成无线电干扰。

mANTbox 19s 配备金属立杆支架，可夹紧在金属立杆上。

- 将安装底座固定到设备背面。
- 使用安装支架将设备固定到立杆上。
- 用支架和螺丝固定设备。

![](/img/605f9373d3b55718.webp)

- 调整所需的对准方向。

请避免将松动的以太网电缆连接到以太网端口，应将电缆固定到墙面或立杆上，以免电缆重量拉扯端口。建议在距设备小于 2m 处固定以太网电缆。这是为了确保电缆不会因其重量损坏端口，也不会脱落。打开盖子后，可在其中找到接地螺丝，因此可以将接地线连接到设备。

## 接地 {#grounding}

安装基础设施（塔架和桅杆）以及路由器本身必须正确接地。设备在机壳门后配有接地线连接螺丝。将接地线连接到接地螺丝，然后将接地线的另一端连接到已接地的桅杆。这可大幅降低 ESD 和雷击损坏的风险。

![](/img/9d368495fcc09e4b.webp)

设备包含接地连接（标记为 ⏚）。

## 打开盖子 {#opening-cover}

要打开盖子，请用手逆时针旋转松不脱螺丝，然后将其抬起。

![](/img/c9aa40a174a2b89d.webp)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 内置无线接口，2x2 MIMO，支持 AP/station/bridge 模式。
- 一个 10/100/1000 千兆以太网端口，支持自动交叉/直通电缆校正（Auto MDI/X），因此您可以使用直通或交叉电缆连接到其他网络设备。以太网端口接受来自无源 PoE 注入器的 8-30V DC 供电。
- 一个用于 1.25GBit 模块的 SFP 端口，支持 DDMI。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有以下功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在会寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复非常有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送到指定的废物处置场所。请熟悉您所在地区将设备正确运输到指定处置场所的程序。

## 型号：RB921GS-5HPacD-15S (mANTBox 15s), RB921GS-5HPacD-19S (mANTBox 19s) {#models-rb921gs-5hpacd-15s-mantbox-15s-rb921gs-5hpacd-19s-mantbox-19s}

### 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RB921GS-5HPacD-15S</td><td>TV7RB921G-5HPACD</td></tr><tr><td>RB921GS-5HPacD-19S</td><td>TV7RB921G-5HPACD</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装环境中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在居民区操作本设备很可能造成有害干扰，在这种情况下，用户需要自费纠正干扰。

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受收到的任何干扰，包括可能导致非预期操作的干扰。

注意：本设备已使用外围设备上的屏蔽电缆进行测试。必须使用屏蔽电缆与本设备配合，以确保合规。

**天线安装警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，只能使用已通过本产品认证的天线。安装人员应根据国家/地区法规和天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

**重要：射频辐射暴露。** 天线与职业使用者之间必须保持至少 20 cm 的距离。在此配置下，可满足 FCC 针对一般人群/非受控环境规定的辐射暴露限值。

### 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RB921GS-5HPacD-15S</td><td>7442A-921G5HPACD</td></tr><tr><td>RB921GS-5HPacD-19S</td><td>7442A-921G5HPACD</td></tr></tbody></table>

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。操作须符合以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

在 5150–5250 MHz 频段工作的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

**天线安装警告：** 安装人员有责任确保在加拿大（或适用 IC 规则的地区）使用授权天线时，只能使用已通过本产品认证的天线。安装人员应根据国家/地区法规和天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

**重要：射频辐射暴露。** 天线与职业使用者之间必须保持至少 20 cm 的距离。在此配置下，可满足 FCC 针对一般人群/非受控环境规定的辐射暴露限值。

### UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

### 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射功率</th></tr></thead><tbody><tr><td>5150-5350 MHz, 5650-5850 MHz</td><td>≤10 W</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息以斜杠分隔标注在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

### 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

### 乌克兰国家通信和信息学监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5150-5250 MHz（23 dBm），5250-5350 MHz（20 dBm），5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定（该决定于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序取得使用许可。

### CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i，里加，拉脱维亚，LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

#### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相应型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定规定的最大 WLAN 发射功率限值。更多信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的最大 WLAN 发射功率限值。有关更多信息，请参阅上文的符合性声明。

## 型号：RB911G-2HPnD-12S (mANTBox 2 12s) {#models-rb911g-2hpnd-12s-mantbox-2-12s}

### 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement-1}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RB911G-2HPnD-12S</td><td>TV7RB911G2HPND</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装环境中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在居民区操作本设备很可能造成有害干扰，在这种情况下，用户需要自费纠正干扰

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受收到的任何干扰，包括可能导致非预期操作的干扰。

注意：本设备已使用外围设备上的屏蔽电缆进行测试。必须使用屏蔽电缆与本设备配合，以确保合规。

**天线安装警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，只能使用已通过本产品认证的天线。安装人员应根据国家/地区法规和天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。安装和操作本设备时，辐射器与身体任何部位之间应保持至少 20 cm 的距离。

### 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada-1}

IC: 7442A-911G2HPND

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。操作须符合以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

**天线安装警告：** 安装人员有责任确保在加拿大（或适用 IC 规则的地区）使用授权天线时，只能使用已通过本产品认证的天线。安装人员应根据国家/地区法规和天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。安装和操作本设备时，辐射器与身体任何部位之间应保持至少 20 cm 的距离。

### UKCA 标志 {#ukca-marking-1}

![](/img/5d0fc80f851cbbdf.webp)

### 欧亚符合性标志 {#eurasian-conformity-mark-1}

<table><thead><tr><th>频率信道</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>≤10 W</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息以斜杠分隔标注在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

### 墨西哥官方标准 {#norma-oficial-mexicana-1}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

### 乌克兰国家通信和信息学监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine-1}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 MHz（30 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定（该决定于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序取得使用许可。

### CE 符合性声明 {#ce-declaration-of-conformity-1}

制造商：MikroTikls SIA, Brivibas gatve 214i，里加，拉脱维亚，LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RB911G-2HPnD-12S 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

#### 频段使用条款 {#frequency-bands-terms-of-use-1}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 TX 功率限值。有关更详细的信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定规定的最大发射功率限值。更多信息请参阅上文的符合性声明。更多信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 TX 功率限值。有关更多信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 TX 功率限值。有关更多详细信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 TX 功率限值。有关更多详细信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的最大 TX 功率限制。有关更多详细信息，请参阅上文的符合性声明。
