---
title: "LHG XL HP5"
slug: /lhg-xl-hp5
source: https://manual.mikrotik.com/hardware/lhg-xl-hp5
captured_at: '2026-11-04T09:55:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/1907cf7e6bbe76a0.jpg)

## [LHG XL HP5](https://mikrotik.com/product/RBLHG-5HPnD-XL)（RBLHG-5HPnD-XL） {#lhg-xl-hp5-rblhg-5hpnd-xl}

双链 eXtra Large 高功率 27dBi 5GHz CPE/点对点一体化天线。完整规格和宣传册请参见 [LHG XL HP5 产品页面](https://mikrotik.com/product/RBLHG-5HPnD-XL)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家和地区的法律法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适合安装在室外的立杆上。使用错误的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和配件，这些电源和配件可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境设定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 组装 {#assembly}

将两条支腿安装到 LHG 外壳上，然后将组装好的 LHG 单元卡入网格上的相应位置。用两颗自攻螺钉（已随附，使用 PH2 十字螺丝刀）将支腿固定到位。使用随附的螺钉将 L 形支架安装到碟形天线上。使用 U 型螺栓将设备固定到立杆/桅杆上。

## 快速开始 {#quickstart}

- 打开以太网门，将您的 PC 或 LAN 网线连接到以太网端口，将以太网网线的另一端连接到 PoE 注入器；
- 使用以太网网线将设备连接到随附 PoE 注入器的 data+power 端；
- 将 PoE 注入器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 通过 **WebFig** 或 **WinBox** 工具，使用 Web 浏览器配置您的设备，工具地址为 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后单击 MAC 地址。用户名为 "**admin**"，密码为空（某些型号的用户名和无线密码请查看标签）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中进行以下设置：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 供电 {#powering}

设备仅支持通过 Passive PoE 注入器供电。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个以太网端口，支持自动交叉/直通网线纠正（Auto MDI/X），因此您可以使用直通或交叉网线连接其他网络设备。
- 一个集成无线设备，内置网格天线。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三种功能：• 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。• 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAPs 模式（共 10 秒）。• 或者继续按住按钮 5 秒直到 LED 熄灭，然后松开，使 RBLHG-5HPnD-XL 查找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，只要在设备通电之前按下按钮，系统就会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复非常有用。

## 操作系统支持 {#operating-system-support}

设备支持版本号等于或高于 RouterOS 菜单 /system resource 中所指示版本的 RouterOS 软件。

其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备正确运输至指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBLHG-5HPnD-XL</td><td>TV7LHG5HPND</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的保护，防止有害干扰。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），建议用户尝试通过以下一种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备插入与接收器所连接电路不同的插座。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：未经合规负责方明确批准的任何更改或修改，可能会使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分的规定。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。本设备及其天线不得与其他任何天线或发射器同址放置或联合运行。

**重要：射频辐射暴露。**

天线与用户之间必须保持至少 20 厘米的距离。在此配置下，可满足 FCC 针对人群/非受控环境设定的辐射暴露限值。

天线安装。警告：安装人员有责任确保在美国（或适用 FCC 规则的地区）使用经授权的天线时，仅使用已通过本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，明确禁止使用除本产品认证天线之外的任何天线。安装人员应根据国家/地区法规和天线类型配置天线的输出功率等级。带有连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBLHG-5HPnD-XL</td><td>7442A-LHG5ACD2HPD</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。其运行须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备运行异常的干扰。

本设备符合加拿大工业部适用于免许可无线电设备的 CNR。允许在以下两个条件下操作：(1) 设备不得产生干扰，且 (2) 设备用户必须接受所受到的任何无线电干扰，即使该干扰可能影响其运行。

在 5150–5250 MHz 频段内工作的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射功率</th></tr></thead><tbody><tr><td>5150-5350 MHz, 5650-5850 MHz</td><td>≤10 W</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而异。

设备生产日期信息以斜杠分隔的形式标注在标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

![](/img/984ad54320693690.webp)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Unijas iela 2, Riga, LV-1039, Latvia.

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA, Unijas 2, Рига, Латвія, LV1039。

工作频率（最大输出功率）：5150-5250 MHz（23 dBm）、5250-5350 MHz（20 dBm）、5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定（2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Unijas iela 2, Riga, Latvia, LV-1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBLHG-5HPnD-XL 符合 2014/53/EU 指令。EU 符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（**适用于相应型号**）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用不受限制</td></tr></tbody></table>

**客户有责任遵守当地国家的法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！** *根据欧盟委员会 2000/299/EC 决定（2000 年 4 月 6 日），本产品属于第 2 类。*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明。
