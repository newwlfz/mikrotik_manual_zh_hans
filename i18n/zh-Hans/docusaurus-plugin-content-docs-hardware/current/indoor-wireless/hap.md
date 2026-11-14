---
title: "hAP"
slug: /hap
source: https://manual.mikrotik.com/hardware/hap
captured_at: '2026-11-04T05:58:08+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/b9c8a6465a667241.jpg" alt="" width={798} height={407} /></p>

## [hAP](https://mikrotik.com/product/RB951Ui-2nD) (RB951Ui-2nD) {#hap-rb951ui-2nd}

hAP 是一款简单的家用无线接入点。它开箱即可使用，您只需插上互联网网线即可开始使用无线互联网。完整规格和产品手册请参见 [hAP 产品页面](https://mikrotik.com/product/RB951Ui-2nD)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家和地方的法律法规进行处理。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 本产品设计用于室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商批准的电源和配件，它们可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作距离应与您的身体、职业使用者或公众保持不少于 20 厘米。

## 设置 {#setup}

- 确保您的互联网服务提供商（ISP）允许更换硬件并自动分配 IP 地址；
- 将 ISP 网线连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 以外的任意端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用建立连接。或者，在网页浏览器中使用 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 "WinBox" 配置工具。**提供多种配置方法以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 单击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您的国家/地区，以应用相应的法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## 供电 {#powering}

该板卡可从电源插孔或第一个以太网端口（Passive PoE）获取电源：

- 直接输入电源插孔（外径 5.5mm、内径 2mm，母头，中心正极插头）接受 10-28 V ⎓ DC；
- 第一个以太网端口接受无源以太网供电（Passive PoE）10-28 V ⎓ DC。最大负载下的功耗可达 5 W。

## 使用移动应用连接 {#connecting-with-a-mobile-app}

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

使用您的智能手机通过 WiFi 访问路由器。

- 插入 SIM 卡并为设备通电。
- 用智能手机扫描二维码，并选择您偏好的操作系统。
- 连接到无线网络。SSID 以 MikroTik 开头，并包含设备 MAC 地址的最后几位数字。
- 打开应用程序。
- 默认情况下，IP 地址和用户名已预先填入。
- 单击 Connect，通过无线网络与设备建立连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 还提供高级菜单，可完整配置所有必要的设置。

## 配置 {#configuration}

登录后，我们建议单击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳的性能和稳定性。对于无线型号，请确保您已选择设备将使用的国家/地区，以符合当地法规。除了本文档中所述的内容外，RouterOS 还包含许多配置选项。我们建议从这里开始了解各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参阅复位按钮。

## 安装 {#mounting}

本设备设计用于室内使用，可放置在桌面上。我们建议使用 Cat5 屏蔽网线。使用和安装本设备时，请注意最大允许暴露（MPE）安全距离，即辐射体与您身体之间至少保持 20 cm。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个独立的 10/100 以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。
- 一个集成的无线 2.4 GHz 802.11b/g/n，2x2 MIMO，配有两个板载 PIF 天线，最大增益 1.5 dBi
- 一个 USB type-A 插槽
- Ether5 端口支持 PoE 输出，可为其他 RouterBOARD 设备供电。该端口具有自动检测功能，因此您可以连接笔记本电脑和其他非 PoE 设备而不会损坏它们。Ether5 上的 PoE 输出电压比输入电压约低 2 V，最大支持 0.58 A（因此，若提供 24 V 电源，Ether5 PoE 端口将输出 22 V/0.58 A）。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请使设备进入 BOOTP 模式。有两种引导程序选项可用：**Regular Booter** 和 **Backup Booter**。建议对两种选项都进行验证，以防其中之一不可用。

- **Regular Booter：** 要进入 etherboot 模式，请在设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备通电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将引导进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。视型号不同，这可能由 **USR、USER、System** 或 **ACT** LED 指示，也可能由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备的工作范围与上述规定不同，则需要将来自制造商/供应商的定制固件版本应用到最终用户设备，并防止最终用户重新配置。
- 室外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据表均可在制造商官方网站上获取。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，发射功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，发射功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，发射功率限制为 20dBm（EIRP）。

请确保设备具有锁定软件包（来自制造商的固件版本），需要将其应用到最终用户设备以防止最终用户重新配置。产品将标注国家代码 “-EG”。本设备需要升级到最新版本，以确保符合当地主管机构的规定！最终用户有责任遵守当地国家法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废物处置场。请了解您所在地区将设备正确运送至指定处置场的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID:TV7RB951Ui-2ND 本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装环境中的有害干扰提供合理防护。

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再打开设备来确定），则建议用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 请咨询经销商或有经验的无线电/电视技术人员寻求帮助。FCC 警告：任何未经负责合规的一方明确批准的更改或修改，都可能导致用户无权操作本设备。本设备符合 FCC 规则第 15 部分的规定。其运行需满足以下两个条件：(1) 本设备不得造成有害干扰，(2) 本设备必须接受任何收到的干扰，包括可能导致意外运行的干扰。本设备及其天线不得与任何其他天线或发射器共置或协同工作。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。安装和操作本设备时，辐射体与您身体任何部位之间应保持至少 20 cm 的距离。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC: 7442A-9512ND 本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。其运行需满足以下两个条件：

-

本设备不得造成干扰；

-

本设备必须接受任何干扰，包括可能导致设备运行不正常的干扰。本设备中包含的免许可发射器/接收器符合加拿大创新、科学与经济发展部适用于免许可无线电设备的 CNR 要求。允许在以下两个条件下运行：

-

本设备不得产生干扰；

-

本设备必须接受所遭受的任何无线电干扰，即使该干扰可能造成影响。本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。安装和操作本设备时，辐射体与您身体任何部位之间应保持至少 20 cm 的距离。本设备符合针对非受控环境规定的 IC 辐射暴露限值。安装和使用本设备时，辐射体与您身体任何部位之间应保持至少 20 cm 的最小距离。

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射机功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

有关设备生产日期的信息，以斜杠分隔标示在设备贴纸序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），其后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2480-2483.5 MHz (30 dBm)。可用频率信道可能因产品型号和认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 МГц (20 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RB951Ui-2nD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 规定的最大的 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定的最大的 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定的最大的 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定的最大的 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定的最大的 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定的最大的 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明。

<p><Img src="/img/0561b3ba8c95a35c.webp" alt="" width={146} height={135} /></p>

在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限于室内使用。 / 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限于室内使用。 / 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限于室内使用。 / 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限于室内使用。 / 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限于室内使用。 / 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限于室内使用。
