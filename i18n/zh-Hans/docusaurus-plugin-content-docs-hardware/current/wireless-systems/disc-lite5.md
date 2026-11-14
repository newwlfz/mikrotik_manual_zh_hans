---
title: "Disc Lite5"
slug: /disc-lite5
source: https://manual.mikrotik.com/hardware/disc-lite5
captured_at: '2026-11-04T09:47:47+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/65562c26cccc0768.webp)

## [DISC Lite5](https://mikrotik.com/product/rbdisc_5nd) (RBDisc-5nD) {#disc-lite5-rbdisc-5nd}

DISC 是一款内置定向天线的室外无线系统。它可以用作 CPE，也可用于点对点链路。完整的规格参数和宣传资料请参阅 [Disc Lite5 产品页面](https://mikrotik.com/product/rbdisc_5nd)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适合安装在室外的立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 只能使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装与运行应使其与您的身体、职业使用者或公众的距离不小于 45 厘米。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 使用以太网线将设备连接到随附的 PoE 注入器的 data+power 端；
- 将 PoE 注入器的 data 端连接到电脑；
- 将电源适配器连接到 PoE 注入器；
- 使用网页浏览器通过 **WebFig** 或 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）配置您的设备。**提供多种配置方式以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 即可访问 **WebFig**；若使用 **WinBox**，请下载该工具，切换到 **Neighbors** 标签页，然后点击 MAC 地址。用户名为 "**admin**"，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将您的 RouterOS 软件更新到最新版本可确保获得最佳的性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家，以应用该国家的法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 供电 {#powering}

本设备仅接受来自 Passive PoE 注入器的 10-30 V 供电（随附一个电源和一个 PoE 注入器）。

## 启动过程 {#booting-process}

本设备被配置为无线客户端。配置必须通过以太网端口完成。除本文档所述内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问都会被阻止）。出于恢复目的，可以从网络启动设备，请参阅相关章节。

## 组装与安装 {#assembly-and-mounting}

本设备随附一个金属安装环，可用于产品的任一侧（有两个安装槽）。第三个中央安装点与 quickMount Pro（不包含）兼容。

![](/img/0f4a04fecd600831.webp)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个 10/100 以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。
- 一个集成无线 5GHz 802.11a/n 或 ac（取决于型号），2x2 MIMO，内置定向天线，最大增益 21 dBi。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备将开始寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒直到 LED 熄灭，然后松开，使 RBDisc-5nD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电之前按下该按钮，系统都会加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复非常有用。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列在 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废弃物处置场所。请了解您所在地区将设备正确运送到指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBDisc-5nD</td><td>TV7LHG5NDM</td></tr></tbody></table>

本设备已经过测试，并确认符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装中的有害干扰提供合理防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来判断），建议用户尝试通过以下措施之一来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户无权操作本设备。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，(2) 本设备必须接受任何接收到的干扰，包括可能导致非预期操作的干扰。本设备及其天线不得与任何其他天线或发射器处于同一位置，也不得与其共同工作。**重要：射频辐射暴露。** 天线与职业使用者之间必须保持至少 13 厘米的距离，与公众之间必须保持至少 28 厘米的距离。在此配置下，即可满足 FCC 针对人群/非受控环境所规定的辐射暴露限值。**天线安装。警告：** 安装者有责任确保在美国（或适用 FCC 规则的地区）使用经授权的天线时，仅使用经过产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，严禁使用任何未经产品认证的天线。安装者应根据国家法规和天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBDisc-5nD</td><td>7442A-LHG5NDM</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，(2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。其使用须满足以下两个条件：(1) 设备不得产生干扰，(2) 用户必须接受设备所受到的任何无线电干扰，即使该干扰可能影响其正常运行。

在 5150–5250 MHz 频段内工作的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>5650-5850 MHz</td><td>≤100 mW</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证情况而有所不同。

设备的制造日期信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），随后的两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 (Norma Oficial Mexicana) {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议规定的程序取得使用许可，该决议已于 2013 年 1 月 3 日在乌克兰司法部登记，编号为 57/22589。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBDisc-5nD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

**频段使用条款**

<table><thead><tr><th>频率范围（适用于相应型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家的法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设定的最大 WLAN 发射功率限值。更多信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上方的符合性声明。
