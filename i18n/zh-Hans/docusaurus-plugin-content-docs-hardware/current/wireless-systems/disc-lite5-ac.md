---
title: "Disc Lite5 ac"
slug: /disc-lite5-ac
source: https://manual.mikrotik.com/hardware/disc-lite5-ac
captured_at: '2026-11-04T09:47:55+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/f42faeb29b5f71d4.webp)

## [DISC Lite5 ac](https://mikrotik.com/product/disc_lite5_ac) (RBDiscG-5acD) {#disc-lite5-ac-rbdiscg-5acd}

DISC 是一款内置定向天线的室外无线系统。它可用作 CPE，也可用于点对点链路。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于安装在室外的立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会给人员带来危险并损坏系统。
- 请仅使用制造商认可的电源和附件，这些电源和附件可在本产品的原包装中找到。
- 在将系统连接到电源之前，请先阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频段内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 本设备为 A 类设备。在住宅环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 以及欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 使用以太网线将设备连接到随附 PoE 供电器的 data+power 端；
- 将 PoE 供电器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 供电器；
- 通过 **WebFig** 或 **WinBox** 工具使用网页浏览器配置您的设备，地址为 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 可访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 标签页，然后点击 MAC 地址。用户名为 "**admin**"，无密码（某些型号的用户名和无线密码请查看标签贴纸）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## 供电 {#powering}

本设备仅接受来自无源 PoE 供电器的 10-30 V 电源（随附一个电源和一个 PoE 供电器）。

## 启动过程 {#booting-process}

本设备配置为无线客户端。配置必须通过以太网端口完成。除本文档所述内容外，RouterOS 还包含许多配置选项。建议从这里开始了解各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问均被阻止）。出于恢复目的，可以从网络启动设备，请参阅相关章节。

## 组装与安装 {#assembly-and-mounting}

本设备随附一个金属安装环，可安装在产品的任一侧（有两个安装槽位）。第三个中央安装点与 quickMount Pro 兼容（不含在内）。

![](/img/0f4a04fecd600831.webp)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个 10/100 以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。
- 一个集成 5GHz 802.11a/n 或 ac 无线（取决于型号），2x2 MIMO，内置定向天线，最大增益 21 dBi。

## 复位按钮 {#reset-button}

复位按钮具有三种功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备将开始寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都将加载备份的 RouterBOOT 加载器。这对 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中随设备附带以下配件：

- DC ⎓ EU/US 开关电源 24 V，0.38 A，9 W，Level VI，线缆：1.5 m。
- POE 供电器线缆（POE）/ 千兆 POE 供电器（GPOE）。
- 软管卡箍 40/60 w2 A2 9 mm。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/disc_lite5_ac](https://mikrotik.com/product/disc_lite5_ac)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

![](/img/8d294e5cd375c591.webp)

![](/img/25f50553ffd86eaf.webp)

![](/img/b0984aa3ad3c6d58.webp)

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备妥善运送至指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

![](/img/ce6fc3eb10b9a1e6.webp)

<table><thead><tr><th>型号</th><th>FCCID</th></tr></thead><tbody><tr><td>RBDiscG-5acD</td><td>TV7LHG5ACD</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装环境中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能造成有害干扰，此时用户需自费纠正干扰。

FCC 警告：未经合规负责方明确批准的任何更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其操作须遵循以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受所收到的任何干扰，包括可能导致意外操作的干扰。注：本设备在测试时对外围设备使用了屏蔽线缆。为确保合规，必须使用屏蔽线缆与本设备配合使用。

本设备及其天线不得与任何其他天线或发射器处于同一位置或联合工作。重要提示：射频辐射暴露。本 MikroTik 设备符合 FCC、IC 以及欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业用户或公众的距离不得小于 20 厘米。

**天线安装。警告：** 安装者有责任确保在美国（或适用 FCC 规则的地区）使用经授权的天线时，仅使用经本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分的规定，严禁使用任何未经本产品认证的天线。安装者应根据国家法规和天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBDiscG-5acD</td><td>7442A-LHG5ACD</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。其操作须遵循以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 要求。其使用须满足以下两个条件：(1) 设备不得产生干扰；(2) 用户必须接受所受到的任何无线电干扰，即使该干扰可能影响设备的正常运行。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而有所不同。

有关设备生产日期的信息标注在设备标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用须按照 NKRZI 2012 年 11 月 1 日第 559 号决议（已于 2013 年 1 月 3 日在乌克兰司法部登记，登记号 57/22589）规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBDiscG-5acD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相关型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家法规，包括在合法频段内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。欲了解更多详细信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明。
