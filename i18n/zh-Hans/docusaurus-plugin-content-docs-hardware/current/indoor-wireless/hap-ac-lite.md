---
title: "hAP ac lite"
slug: /hap-ac-lite
source: https://manual.mikrotik.com/hardware/hap-ac-lite
captured_at: '2026-11-04T05:58:08+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/757b607ba8569550.jpg" alt="" width={800} height={635} /></p>

## [hAP ac lite](https://mikrotik.com/product/RB952Ui-5ac2nD)（RB952Ui-5ac2nD） {#hap-ac-lite-rb952ui-5ac2nd}

hAP ac lite 是一款简单的家用无线接入点。它出厂即已完成配置，您只需插上网线即可开始使用无线网络。我们建议您设置密码以保护设备安全，请按以下步骤操作。有关完整规格和宣传手册，请参阅 [hAP ac lite 产品页面](https://mikrotik.com/product/RB952Ui-5ac2nD)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家和地方的法律法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备用于机架安装。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 本产品适用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，它们可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座上拔下。
- 客户有责任遵守当地国家的法规，包括在合法的频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境制定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业使用者或公众的距离不应小于 20 厘米。

## 设置 {#setup}

请确保您的互联网服务提供商（ISP）允许更换硬件，请按照以下快速步骤设置您的设备：

- 确保您的互联网服务提供商（ISP）允许更换硬件并自动分配 IP 地址；
- 将 ISP 网线连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 以外的任意端口，或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具，地址为 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您所在的国家，以应用该国家的法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码，选择您首选的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名已自动填入。
- 点击 Connect 通过无线网络建立到设备的连接。
- 选择 Quick setup，应用程序将通过几个简单的步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 供电 {#powering}

设备可通过电源插孔或第一个以太网端口（Passive PoE）接受供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 10-28 V DC。
- 第一个以太网端口接受被动式 Power over Ethernet，接受 12-28 V DC。最大负载下的功耗可达 5 W。Ether5 端口支持 PoE 输出，可为其他 RouterBOARD 设备供电。该端口具有自动检测功能，因此您可以连接笔记本电脑和其他非 PoE 设备而不会损坏它们。Ether5 上的 PoE 输出比输入电压低约 2 V，最高支持 0.58A（因此，如果提供 24 V 电源，Ether5 PoE 端口将输出 22V/0.58 A）。

## 配置 {#configuration}

登录后，我们建议您在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将要使用的国家，以符合当地法规。除了本文档中描述的内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法进行 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。为便于恢复，可以让设备引导以进行重新安装，请参阅“按钮和跳线”。

## 安装 {#mounting}

本设备设计用于室内，可放置在平坦表面上，所有需要的线缆连接到设备前方。此外，设备也可以安装在墙上，安装点位于设备底部，包装中不包含螺丝。4x25 mm 的螺丝可以很好地适配，根据您的墙体结构，如有需要可以使用 6x30 mm 的膨胀螺栓和 6 mm 钻头。安装在墙上时，请确保线缆进线方向朝下。警告！本设备的安装和操作应与您的身体保持至少 20 厘米的距离。在居住环境中操作本设备可能会造成无线电干扰。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个独立的 10/100 以太网端口，支持线缆自动交叉/直通校正（Auto MDI/X），因此您可以使用直通线或交叉线连接其他网络设备。
- 集成无线 2.4 GHz 和 5 GHz 802.11 a/b/g/n/ac，配备板载 PIF 天线的同步双频无线电，最大增益 1.5 dBi。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 常亮，然后松手以启用 CAP 模式。随后设备将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请使设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议对两种选项都进行验证，以防其中一种无法使用。

- **Regular Booter：** 要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，可通过 **Netinstall** 重新安装 RouterOS。根据型号不同，这可能会通过 **USR、USER、System** 或 **ACT** LED，或 SFP 端口 LED 来指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统将加载备份的 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含随设备提供的以下配件：

- 欧盟标准 24 V 开关电源。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/RB952Ui-5ac2nD](https://mikrotik.com/product/RB952Ui-5ac2nD)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如在指定的废物处置场。请熟悉您所在地区将设备妥善运输至指定处置场的程序。

## 美国联邦通信委员会（FCC）干扰声明 {#federal-communication-commission-interference-statement}

FCC ID：TV7RB952-5AC2ND

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装环境提供合理的保护，防止有害干扰。本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则建议用户尝试通过以下措施之一来消除干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以获得帮助。**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分的要求。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致非预期运行的干扰。本设备及其天线不得与任何其他天线或发射器共置或协同运行。**重要提示：射频辐射暴露。**

本设备符合 FCC 针对非受控环境制定的辐射暴露限值。本设备的安装和操作应使辐射体与您身体的任何部位之间保持至少 20 厘米的距离。

**天线安装。警告：** 安装者有责任确保在美国（或适用 FCC 规则的地区）使用经授权的天线时，仅使用与产品一同认证的天线。根据 FCC 规则 CFR47 第 15.204 部分的规定，严禁使用任何未经产品认证的天线。安装者应根据国家法规和天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

IC：7442A-9525AC

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。其运行须满足以下两个条件：

-

本设备不得造成干扰；

-

本设备必须接受任何干扰，包括可能导致设备非预期运行的干扰。本设备中包含的免许可发射器/接收器符合加拿大创新、科学和经济发展部适用于免许可无线电设备的 CNR 标准。其运行获准须满足以下两个条件：

-

本设备不得产生干扰；

-

本设备必须接受任何无线电干扰，即使该干扰可能影响其运行。本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要提示：射频辐射暴露。** 本设备符合 IC 针对非受控环境制定的辐射暴露限值。本设备的安装和操作应使辐射体与您身体的任何部位之间保持至少 20 厘米的距离。本设备符合 IC 针对非受控环境制定的辐射暴露限值。本设备的安装和操作应使辐射体与您身体的任何部位之间保持至少 20 厘米的距离。

工作在 5150–5250 MHz 频段的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。工作在 5150 至 5250 MHz 频段的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

有关设备制造日期的信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），其后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

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

工作频率（最大输出功率）：2480-2483.5 МГц (20 дБм)、5150-5250 МГц (23 дБм)、5250-5350 МГц (20 дБм)、5470-5725 МГц (27 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议（2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RB952Ui-5ac2nD 符合 2014/53/EU 指令的要求。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相应型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用无任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家的法规，包括在合法的频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参阅上文的符合性声明。

<p><Img src="/img/0561b3ba8c95a35c.webp" alt="" width={146} height={135} /></p>

在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。 / 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。 / 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。 / 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。 / 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。 / 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。
