---
title: "hAP ac lite TC"
slug: /hap-ac-lite-tc
source: https://manual.mikrotik.com/hardware/hap-ac-lite-tc
captured_at: '2026-11-04T05:58:11+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/ae778f17923632db.jpg" alt="" width={800} height={800} /></p>

## [hAP ac lite TC](https://mikrotik.com/product/RB952Ui-5ac2nD-TC) (RB952Ui-5ac2nD-TC) {#hap-ac-lite-tc-rb952ui-5ac2nd-tc}

hAP ac lite TC 是一款简单的家庭无线接入点。它开箱即已配置好，您只需插入互联网线缆即可开始使用无线互联网。我们建议您设置密码以保护设备，请按照以下步骤操作。有关完整规格和宣传册，请参阅 [hAP ac lite TC 产品页面](https://mikrotik.com/product/RB952Ui-5ac2nD-TC)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家和地方法律法规处理。
- 设备的安装必须符合当地和国家电气规范。
- 本设备用于安装在机架中。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的程序，可能导致人员危险和系统损坏。
- 本产品适合室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商批准且可在本产品原包装中找到的电源和配件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座上拔下电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对不受控环境规定的射频辐射暴露限值。本 MikroTik 设备安装和操作时，与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 设置 {#setup}

确保您的 ISP 允许硬件更改，请按照以下快速步骤设置设备：

- 确保您的互联网服务提供商（ISP）允许硬件更改并自动分配 IP 地址；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 之外的任一端口，或无线网络“MikroTik-...”连接到设备（请务必查看标签上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用 [https://mt.lv/winbox](https://mt.lv/winbox) 上的“WinBox”配置工具。**提供多种配置方法以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择“Neighbors”选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为“admin”，没有密码（或者，对于某些型号，请查看标签上的用户和无线密码）；
- 点击“Check for updates”按钮，并将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在“Downloads”部分找到所需软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的“Files”菜单，并重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在“QuickSet”菜单中设置以下内容：选择您所在的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用在现场配置路由器，或为您的 MikroTik 家庭接入点应用最基本的初始设置。

- 扫描二维码并选择您首选的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名将已填写。
- 点击 Connect 以通过无线网络建立到设备的连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 高级菜单可用于完整配置所有必要设置。

## 供电 {#powering}

设备可通过电源插孔或第一个以太网端口（Passive PoE）供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 10-30 V DC。
- 第一个以太网端口接受被动 Power over Ethernet，接受 12-30 V DC。最大负载下的功耗可达 5 W。Ether5 端口支持 PoE 输出，可为其他 RouterBOARD 设备供电。该端口具有自动检测功能，因此您可以连接笔记本电脑和其他非 PoE 设备而不会损坏它们。Ether5 上的 PoE 输出约比输入电压低 2 V，并支持最高 0.58A（因此，随附的 24 V PSU 将为 Ether5 PoE 端口提供 22 V/0.58 A 输出）。

## 配置 {#configuration}

登录后，我们建议您点击 QuickSet 菜单中的“Check for updates”按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将使用的国家/地区，以符合当地法规。RouterOS 除了本文档所述内容外，还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以将设备启动以重新安装，请参阅“按钮和跳线”。

## 安装 {#mounting}

本设备设计用于室内，可放置在平坦表面上，所有所需线缆连接到设备前部。或者，也可将设备安装在墙上，安装点位于设备底部，包装中不包含螺钉。4x25 mm 规格的螺钉非常合适；根据墙体结构，如有需要，可使用 6x30 mm 的膨胀螺栓和 6 mm 钻头。安装在墙上时，请确保线缆走向朝下。我们建议使用 Cat6 屏蔽线缆。警告！本设备安装和操作时，设备与身体之间应保持至少 20 cm 的距离。在住宅环境中操作本设备可能会造成无线电干扰。

## 扩展槽和端口 {#extension-slots-and-ports}

- 五个独立的 10/100 以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通或交叉线缆连接到其他网络设备。
- 集成 2.4 GHz 和 5 GHz 802.11 a/b/g/n/ac 无线，双频同时工作的射频模块，配有板载 PIF 天线，最大增益 1.5 dBi。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三个功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。随后设备将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/tags/netinstall) 实用程序重新安装 RouterOS，请将设备进入 BOOTP 模式。有两个引导器选项可用：**Regular Booter** 和 **Backup Booter**。建议验证这两个选项，以防其中一个无法工作。

- **Regular Booter：** 要进入 etherboot 模式，请在设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备通电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备好通过 **Netinstall** 重新安装 RouterOS。根据型号不同，这可能由 **USR、USER、System** 或 **ACT** LED，或 SFP 端口 LED 指示。

无论使用上述哪个选项，如果在设备通电前按下按钮，系统都将加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内包含以下随设备提供的配件：

- 欧盟开关电源 24 V。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/RB952Ui-5ac2nD](https://mikrotik.com/product/RB952Ui-5ac2nD)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备的工作范围与上述法规不同，则最终用户设备需要应用来自制造商/供应商的定制固件版本，并且还要防止最终用户重新配置。
- 户外使用：最终用户需要获得 NTRA 的批准/许可证。
- 任何设备的数据表均可在制造商官方网站上获取。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，发射功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限制为 5.150 – 5.250 GHz，发射功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限制为 5.250 – 5.350 GHz，发射功率限制为 20dBm（EIRP）。

请确保设备具有锁定软件包（来自制造商的固件版本），该软件包需要应用到最终用户设备，以防止最终用户重新配置。产品将标有国家/地区代码“-EG”。本设备需要升级到最新版本，以确保符合当地主管部门法规！最终用户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC 标识符：TV7RB952-5AC2ND 本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理保护，防止有害干扰。

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：（1）本设备不得造成有害干扰；（2）本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与其他任何天线或发射器共置或协同操作。

**重要：射频辐射暴露。** 本设备符合 FCC 针对不受控环境规定的射频辐射暴露限值。本设备安装和操作时，辐射器与身体任何部位之间应保持至少 20 cm 的距离。

**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用经产品认证的天线。根据 FCC 规则 CFR47 part 15.204，明确禁止使用除经产品认证的天线以外的任何天线。安装人员应根据国家/地区法规和天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康和安全要求。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

IC：7442A-9525AC

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

-

本设备不得产生干扰；

-

本设备必须接受任何干扰，包括可能导致设备运行不正常的干扰。本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：

-

本设备不得产生干扰；

-

本设备必须接受所接收到的任何无线电干扰，即使该干扰可能导致设备运行不正常。此 B 类数字设备符合加拿大 ICES-003。

此 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)
<p><Img src="/img/0561b3ba8c95a35c.webp" alt="" width={146} height={135} /></p>

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

工作在 5150–5250 MHz 频段的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。工作在 5150–5250 MHz 频段的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

**重要：射频辐射暴露。** 本设备符合 IC 针对不受控环境规定的射频辐射暴露限值。本设备安装和操作时，辐射器与身体任何部位之间应保持至少 20 cm 的距离。本设备符合 IC 针对不受控环境规定的暴露限值。本设备安装和操作时，辐射器与身体任何部位之间应保持至少 20 cm 的距离。

## UKCA 标志 {#ukca-marking}

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz、5150-5350 MHz、5650-5850 MHz</td><td>≤10 W</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息位于其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位），后面两位表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23，Riga，LV-1006，拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

如需了解保修服务的详细信息，请联系销售商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品已根据相关要求进行评估，并带有如下所示的 EAC 标志：

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz（30 dBm）、5725-5850 MHz（30 dBm）。可用频率信道可能因产品型号和认证而异。

能效符合 NOM-029-ENER-2017。

本设备的操作须满足以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非预期操作的干扰。

制造商：MikroTikls SIA，Brivibas gatve 214i，Riga，LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区问题，请联系当地经销商。进口商名单可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息基础设施监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i，里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 MHz（20 dBm）、5150-5250 MHz（23 dBm）、5250-5350 MHz（20 dBm）、5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求和其他相关规定，也符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA，Brivibas gatve 214i，Riga，拉脱维亚，LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RB952Ui-5ac2nD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相关型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定中的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的最大 WLAN 传输功率限值。有关更多信息，请参阅上文的符合性声明。

本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。
