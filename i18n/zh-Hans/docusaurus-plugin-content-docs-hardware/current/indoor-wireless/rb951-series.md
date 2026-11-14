---
title: "RB951 系列"
slug: /rb951-series
source: https://manual.mikrotik.com/hardware/rb951-series
captured_at: '2026-11-04T06:04:15+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **[RB951Ui-2HnD](https://mikrotik.com/product/RB951Ui-2HnD)**
- **RB951G-2HnD**
:::

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气线路相关危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家电气规范。
- 本设备拟安装在机架中。开始安装前，请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作程序，可能会对人员造成危险并损坏系统。
- 本产品拟在室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家/地区法规，包括在法律频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 设置 {#setup}

本设备是一个简单的家庭无线接入点。它已完成开箱配置，您只需插上互联网线缆即可开始使用无线互联网。我们建议您设置密码来保护设备。

- 确保您的互联网服务提供商（ISP）允许硬件更换并自动分配 IP 地址；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 之外的任意端口，或无线网络“MikroTik-...”连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用 “WinBox” 配置工具，网址为 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 “Neighbors” 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 “admin”，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 单击 “Check for updates” 按钮，并将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 “Downloads” 部分找到所需软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 “Files” 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 “QuickSet” 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## 供电 {#powering}

设备可通过电源插孔或第一个以太网端口（Passive PoE）接受供电。RB951G-2HnD 在最大负载下的功耗可达 7 W，RB951Ui-2HnD 可达 24 W。

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，正极插针）接受 8-30 V DC。
- 第一个以太网端口支持 Passive PoE（无源以太网供电），接受 8-30 V DC。在 RB951Ui 型号上，Ether5 端口支持 PoE 输出，可为其他 RouterBOARD 设备供电。该端口具有自动检测功能，因此您可以连接笔记本电脑和其他非 PoE 设备而不会损坏它们。Ether5 上的 PoE 输出约比输入电压低 2V，最高支持 0.58A（因此，随附的 24V PSU 将向 Ether5 PoE 端口提供 22V/0.58 A 输出）。

## 配置 {#configuration}

RouterOS 除了本文档所述内容外，还包括许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help)。如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，从互联网端口进行的所有访问均被阻止）。出于恢复目的，可以从网络启动设备，请参见按钮和跳线。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个独立以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通或交叉线缆连接到其他网络设备。
- 集成无线 2.4 GHz 射频，配有板载 PIF 天线，最大增益 2.5 dBi

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三种功能：

- 在启动过程中按住此按钮，直到绿色 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议验证这两个选项，以防其中一个无法使用。

- **Regular Booter：** 要进入 etherboot 模式，请在给设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。取决于型号，这可能由 **USR、USER、System** 或 **ACT** LED 指示，也可能由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及更高版本。具体出厂安装版本列于 /system resource。其他操作系统尚未测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备使用的范围与上述法规不同，则必须向最终用户设备应用来自制造商/供应商的定制固件版本，并防止最终用户重新配置。
- 户外使用：最终用户需要获得 NTRA 的批准/许可证。
- 任何设备的数据表均可在制造商官方网站上获取。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，TX 功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限制为 5.150 – 5.250 GHz，TX 功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限制为 5.250 – 5.350 GHz，TX 功率限制为 20dBm（EIRP）。

请确保设备具有锁定软件包（制造商的固件版本），必须将该软件包应用到最终用户设备，以防止最终用户重新配置。产品将标注国家/地区代码“-EG”。本设备需要升级到最新版本，以确保符合当地主管部门法规！最终用户有责任遵守当地国家/地区法规，包括在法律频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装。

为避免污染环境，请将设备与家庭垃圾分开，并以安全方式处置，例如送往指定的废物处置场所。请熟悉您所在地区将设备正确运送到指定处置场所的程序。

## 型号：RB951G-2HnD {#model-rb951g-2hnd}

### 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/b977cf7f64ea36aa.jpg" alt="" width={799} height={744} /></p>

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RB951G-2HnD</td><td>TV7RB951G-2HND</td></tr></tbody></table>

根据 FCC 规则第 15 部分，本设备已经过测试，符合 B 类数字设备的限值。这些限值旨在为住宅安装提供合理保护，防止有害干扰。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致不期望运行的干扰。本设备及其天线不得与任何其他天线或发射器共址或协同运行。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备安装和运行时，辐射体与您身体任何部位之间的最小距离应为 20 cm。

### 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可证 RSS 标准。其运行须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备不期望运行的干扰。本设备符合加拿大工业部适用于免许可证无线电设备的 CNR 标准。其运行须满足以下两个条件：(1) 设备不得产生干扰；(2) 设备用户必须接受所受到的任何无线电干扰，即使该干扰可能影响设备正常运行。

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和运行时，辐射体与您身体任何部位之间的最小距离应为 20 cm。本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和运行时，辐射体与您身体任何部位之间的最小距离应为 20 cm。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## 型号：RB951Ui-2HnDr2 {#model-rb951ui-2hndr2}

### 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement-1}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RB951Ui-2HnD</td><td>TV7RB951U-2HND</td></tr></tbody></table>

根据 FCC 规则第 15 部分，本设备已经过测试，符合 A 类数字设备的限值。这些限值旨在为商业安装提供合理保护，防止有害干扰。

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备可能会造成有害干扰，在这种情况下，用户将需要自费纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致不期望运行的干扰。本设备及其天线不得与任何其他天线或发射器共址或协同运行。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备安装和运行时，辐射体与您身体任何部位之间的最小距离应为 20 cm。

### 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada-1}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RB951Ui-2HnD</td><td>7442A-951U2HND</td></tr></tbody></table>

本设备符合加拿大工业部免许可证 RSS 标准。其运行须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备不期望运行的干扰。本设备符合加拿大工业部适用于免许可证无线电设备的 CNR 标准。其运行须满足以下两个条件：(1) 设备不得产生干扰；(2) 设备用户必须接受所受到的任何无线电干扰，即使该干扰可能影响设备正常运行。

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和运行时，辐射体与您身体任何部位之间的最小距离应为 20 cm。本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和运行时，辐射体与您身体任何部位之间的最小距离应为 20 cm。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射机功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而有所不同。

设备制造日期信息以斜杠分隔标注在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周编号。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 МГц（20 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需要按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, 拉脱维亚, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RB951G-2HnD、RB951Ui-2HnD 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家/地区法规，包括在法律频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。有关更多详细信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。如需更多信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。如需更多信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。如需更多信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 最大发射功率限值。如需更多信息，请参见上文的符合性声明。
