---
title: "hAP ac3"
slug: /hap-ac3
source: https://manual.mikrotik.com/hardware/hap-ac3
captured_at: '2026-11-04T05:58:20+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/a1300d1f5847a368.jpg" alt="" width={799} height={571} /></p>

## [hAP ac³](https://mikrotik.com/product/hap_ac3) (RBd53iG-5HacD2HnD) {#hap-ac-rbd53ig-5hacd2hnd}

一款无线双频路由器，具有 5 个千兆以太网端口和外部高增益天线，可提供更广覆盖。请参阅 [hAP ac³ 产品页面](https://mikrotik.com/product/hap_ac3) 以获取完整规格和宣传册。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家电气规范。
- 本设备拟安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确程序可能会对人员造成危险情况，并损坏系统。
- 本产品拟在室内安装。请将本产品远离水、火、潮湿或高温环境。
- 仅使用制造商批准的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证不会因设备使用不当而发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- **未连接天线时请勿通电！**
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装。

## 设置 {#setup}

- 确保您的互联网服务提供商（ISP）允许硬件更改并自动分配 IP 地址；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源，并在通电前将随附天线连接到设备；
- 通过除 Ethernet1 以外的任意端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在 Web 浏览器中使用 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 "WinBox" 配置工具。**提供多种配置方法以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 单击 "Check for updates" 按钮并将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，并重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码并选择您首选的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名将已输入。
- 单击 Connect 通过无线网络与您的设备建立连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完全配置所有必要设置。

## 供电 {#powering}

设备可通过适配器和 PoE 供电：

- 直流输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）12-28 V DC⎓。
- **Ethernet 1 上的 PoE 输入 18-28 V DC⎓**。最大负载下的功耗可达 12 W，带附件时为 30 W。

## 底板安装说明 {#base-plate-mounting-instruction}

- 底板随包装附带，如需组装，请遵循以下说明。
- 将底板的小尖端插入设备底部的壳体中，然后向下折叠。

<p><Img src="/img/b08358f3fffd9cc3.webp" alt="" width={900} height={286} /></p>

- 双手握住时，用手指轻轻按压并向下推，直到锁定，按照图示顺序操作。

<p><Img src="/img/59f1995ab09b5790.webp" alt="" width={900} height={295} /></p>

## 配置 {#configuration}

登录后，我们建议单击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。请确保您已选择设备将使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以将设备引导以进行重新安装，请参阅按钮和跳线。

首次配置 [https://mt.lv/configuration](https://mt.lv/configuration)；

设备升级 [https://mt.lv/upgrade](https://mt.lv/upgrade)；

## 安装 {#mounting}

本设备设计用于室内，放置在平坦表面上，所有所需线缆连接到设备背面。

可使用随附螺钉将安装底座固定到墙上：

- 使用随附螺钉将底座固定到墙上；

<p><Img src="/img/e50527a302675fcd.webp" alt="" width={170} height={200} /></p>

- 按照底板部分的前述说明，将设备安装到安装底座上。*为确保最佳性能，请确保良好的空气流通，并将设备放置在开阔空间的支架上。* 警告！本设备应在设备与身体之间至少保持 20 cm 距离的情况下安装和操作。在住宅环境中操作本设备可能会造成无线电干扰。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通或交叉线缆连接到其他网络设备。
- 集成无线 5GHz、802.11a/n/ac 和 2.4 GHz b/g/n。
- USB 端口。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三项功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请让设备进入 BOOTP 模式。提供两种启动器选项：**Regular Booter** 和 **Backup Booter**。建议验证两个选项，以防其中一个无法工作。

- **Regular Booter：** 要进入 etherboot 模式，请在给设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备通电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。根据型号不同，这可能会由 **USR, USER, System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪个选项，如果在设备通电前按下按钮，系统都将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

**模式按钮** 可执行用户添加的自定义脚本。

**前部蓝色 LED 按钮** 可启用 WPS 模式。

## 配件 {#accessories}

包装内包含以下随设备附带的配件：

<p><Img src="/img/577b29c31902f682.webp" alt="" width={917} height={230} /></p>

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列在 /system resource 中。其他操作系统尚未测试。

## 注意 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备使用的范围与上述法规不同，则需要向最终用户设备应用来自制造商/供应商的自定义固件版本，并防止最终用户重新配置。
- 户外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据表可在制造商官方网站上获取。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，TX 功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，TX 功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，TX 功率限制为 20dBm（EIRP）。

请确保设备具有锁定软件包（来自制造商的固件版本），需要将其应用到最终用户设备，以防止最终用户重新配置。产品将标有国家/地区代码 “-EG”。本设备需要升级到最新版本，以确保符合当地主管部门法规！最终用户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBD53iG-5HacD2HnD-US</td><td>TV7D53I-5ACD2ND</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理保护，防止有害干扰。

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一项或多项措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所在电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：任何未经合规责任方明确批准的更改或修改都可能使用户操作本设备的权限失效。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：（1）本设备不得造成有害干扰，并且（2）本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。

注意：本设备在测试时使用了屏蔽电缆连接外围设备。为确保合规，必须使用屏蔽电缆连接本设备。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的辐射暴露限制。安装和操作本设备时，辐射体与身体任何部位之间应至少保持 20 cm 的距离。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBD53iG-5HacD2HnD-US</td><td>7442A-D53IAC</td></tr></tbody></table>

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：（1）本设备不得造成干扰。（2）本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

在 5150–5250 MHz 频段运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限制。安装和操作本设备时，辐射体与身体任何部位之间应至少保持 20 cm 的距离。

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射器功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz，5150-5350 MHz，5650-5850 MHz</td><td>≤10 W</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息位于其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 MHz（20 dBm），5150-5250 MHz（23 dBm），5250-5350 MHz（20 dBm），5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBD53iG-5HacD2HnD 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均不受任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均不受任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更详细的信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参阅上文的符合性声明。

<p><Img src="/img/0561b3ba8c95a35c.webp" alt="" width={146} height={135} /></p>

本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。
