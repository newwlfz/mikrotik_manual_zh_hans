---
title: "LHG XL 2"
slug: /lhg-xl-2
source: https://manual.mikrotik.com/hardware/lhg-xl-2
captured_at: '2026-11-04T09:54:41+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/6a907bf16ba327f1.webp)

## [LHG XL 2](https://mikrotik.com/product/lhg_xl_2) (RBLHG-2nD-XL) {#lhg-xl-2-rblhg-2nd-xl}

双链 21dBi 2.4GHz CPE/点对点一体化天线，适用于更远距离。完整规格和宣传册请参见 [LHG XL 2 产品页面](https://mikrotik.com/product/lhg_xl_2)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应依照所有国家法律和法规进行处理。
- 在任何墙面上安装接入点的所有安装方式均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于在室外安装在立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和附件，这些均可在本产品的原包装中找到。
- 在将系统连接到电源之前，请先阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座上拔下。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行时，与您的身体、职业用户或公众的距离不得小于 40 厘米。

## 组装 {#assembly}

将两条支脚安装到 LHG 外壳上，然后将组装好的 LHG 单元在相应位置卡入网格。用两颗自攻螺钉固定支脚（随附，请使用 PH2 十字螺丝刀）。使用随附的螺钉将 L 形支架安装到碟形天线上。使用 U 型螺栓将单元固定到立杆/桅杆上。

## 安装 {#mounting}

为符合健康法规，请将本设备安装在距离您的身体至少 20 cm 的位置。

## 快速开始 {#quickstart}

- 打开以太网舱门，将以太网线缆连接到以太网端口，并将以太网线缆的另一端连接到随附的 PoE 注入器。
- 使用以太网线缆将设备连接到随附 PoE 注入器的数据+电源端；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 通过 **WebFig** 或 **WinBox** 工具使用网页浏览器配置您的设备，地址为 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后点击 MAC 地址。用户名为 "**admin**"，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将您的 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中进行以下设置：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。
- 一个 SFP 端口。
- 一个带有内置栅格天线的一体化无线设备。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置（总共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAPs 模式（总共 10 秒）。
- 或者继续按住按钮 5 秒直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总共 15 秒）。无论使用上述哪种方式，如果在设备通电前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这对 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

本设备支持版本号等于或高于 RouterOS 菜单 /system resource 中所指示版本的 RouterOS 软件。其他操作系统尚未经过测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废弃物处置场。请了解您所在地区将设备正确运送到指定处置场的相关流程。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>LHG XL 2</td><td>TV7LHG2ND</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装环境中的有害干扰提供合理保护。本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再开启设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所在电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以获取帮助。FCC 警告：任何未经负责合规的一方明确批准的更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分的要求。其运行受以下两个条件的约束：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。本设备及其天线不得与任何其他天线或发射器同址放置或联合运行。**重要提示：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备安装和运行时，辐射体与您身体的任何部位之间的最小距离应为 40 cm。本封闭式设备符合 FCC 规则与法规 47CFR 第 15 C 段的要求。其运行受以下两个条件的约束：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>LHG XL 2</td><td>7442A-LHG2ND</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。其运行受以下两个条件的约束：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备运行异常的干扰。本设备符合加拿大工业部对免许可无线电设备适用的 CNR 标准。其使用须满足以下两个条件：(1) 设备不得产生干扰；(2) 用户必须接受设备受到的任何无线电干扰，即使该干扰可能影响设备的正常运行。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要提示：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和运行时，辐射体与您身体的任何部位之间的最小距离应为 40 cm。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频段信道</th><th>发射机功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*可用频段信道可能因产品型号和认证而异。

有关设备生产日期的信息标示在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后面两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

![](/img/984ad54320693690.webp)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

## Norma Oficial Mexicana {#norma-oficial-mexicana}

集成无线模块，工作在 2,4 GHz，采用 802.11 b/g/n 协议并配备内置天线，最大增益为 +21 dBi。

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息学监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2412-2472 MHz（20dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备必须按照 NCRSI 2012 年 11 月 1 日第 559 号决定（该决定于 2013 年 1 月 3 日在乌克兰司法部登记，编号为 57/22589）所批准的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV-1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（**适用于相关型号**）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家的法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！** *根据欧盟委员会 2000/299/EC 决定（2000 年 4 月 6 日），本产品属于第 2 类范围。*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。如需更多详细信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。如需了解更多信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规所规定的 WLAN 最大发射功率限值。如需更多信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则所规定的 WLAN 最大发射功率限值。如需了解更多信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所规定的 WLAN 最大发射功率限值。如需更多信息，请参见上文的符合性声明。
