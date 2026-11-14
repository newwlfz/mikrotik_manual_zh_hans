---
title: "wAP R ac"
slug: /wap-r-ac
source: https://manual.mikrotik.com/hardware/wap-r-ac
captured_at: '2026-11-04T10:07:45+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/ba0590deb856bc57.webp)

## [wAP R ac](https://mikrotik.com/product/wap_r_ac) (RBwAPGR-5HacD2HnD) {#wap-r-ac-rbwapgr-5hacd2hnd}

wAP R ac 是一款小型防风雨设备，配有集成天线和用于调制解调器的 miniPCIe 插槽。有关完整规格和宣传册，请参见 [wAP R ac 产品页面](https://mikrotik.com/product/wap_r_ac)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 将接入点安装在任何墙面上的所有安装方法均须获得当地管辖部门的认可。
- 设备安装必须符合当地和国家电气规范。
- 本产品设计为安装在户外立柱上，但也可在室内安装。开始安装前，请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确程序，可能导致人员危险和系统损坏。
- 仅使用制造商批准且可在本产品原包装中找到的电源和配件。
- 将系统连接到电源之前，请阅读安装说明。
- 我们不能保证因设备使用不当而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座中拔下电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。安装和操作本 MikroTik 设备时，应与您的身体、职业用户或公众保持不少于 20 厘米的距离。

## 快速开始 {#quickstart}

- 使用十字螺丝刀拧松固定底盖的螺钉（参见（链接）。
- SIM 卡槽。
- 指示设备电源状态的 LED。
- LED - 用户自定义。
- 指示 LTE 网络活动的 LED。
- 用于 SMA 线缆的塑料门。
- MiniPCIe 插槽。
- 集成无线模块，工作于 2.4 GHz、802.11b/g/n 和 5 GHz、802.11a/n/ac 协议。

## 配置 {#configuration}

设备配置为 AP 路由器。Eth1 被防火墙阻止，您可以通过无线接口访问路由器进行配置。您应在 QuickSet 菜单中选择 “Check for updates” 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能： [https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址。登录 WinBox 时，将显示默认配置设置。为恢复目的，可以启动设备进行重新安装，请参见相应章节。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三项功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（总计 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开以开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（总计 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总计 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 加载器。这对 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内包含以下随设备附带的配件：

![](/img/86132bf85da243d5.webp)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS 软件版本 v6。具体的出厂安装版本号显示在 RouterOS 菜单 /system resource 中。其他操作系统尚未经过测试。

为避免环境污染，请将设备与家庭垃圾分开，并以安全方式处置，例如送往指定的废物处置场。请熟悉您所在地区将设备正确运输到指定处置场的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBwAPGR-5HacD2HnD</td><td>TV7WAPGR5AC2D</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 请咨询经销商或有经验的无线电/电视技术人员以寻求帮助。 **FCC 警告：** 任何未经合规负责方明确批准的更改或修改都可能使用户操作本设备的权限失效。本设备符合 FCC 规则第 15 部分。操作需满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共址或协同运行。 **重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的 RF 辐射暴露限值。安装和操作本设备时，辐射体与您身体任何部位之间的最小距离应为 20 cm。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBwAPGR-5HacD2HnD</td><td>7442A-WAPGR5AC2D</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。操作需满足以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备非预期运行的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。操作需满足以下两个条件：(1) 设备不得产生干扰，且 (2) 用户必须接受所受到的任何无线电干扰，即使该干扰可能影响设备的正常运行。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。安装和操作本设备时，辐射体与您身体任何部位之间的最小距离应为 20 cm。本设备符合 IC 针对非受控环境规定的辐射暴露限值。安装和使用本设备时，辐射体与您身体任何部位之间的最小距离应为 20 cm。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射机功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz, 5150-5350 MHz, 5650-5850 MHz</td><td>≤10 W</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息位于其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

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

## 乌克兰国家通信和信息领域监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2480-2483.5 MHz（20 dBm），5150-5250 MHz（23 dBm），5250-5350 MHz（20 dBm），5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议（2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA，Brivibas gatve 214i，Riga，Latvia，LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBwAPGR-5HacD2HnD 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相应型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的最大 WLAN 发射功率限值。有关更多信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的最大 WLAN 传输功率限值。有关更多信息，请参见上文的符合性声明。

![](/img/0561b3ba8c95a35c.webp)

本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。
