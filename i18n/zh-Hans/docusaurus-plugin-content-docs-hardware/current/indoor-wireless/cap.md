---
title: "cAP"
slug: /cap
source: https://manual.mikrotik.com/hardware/cap
captured_at: '2026-11-04T05:55:15+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/64fa735a50b61e30.jpg" alt="" width={800} height={776} /></p>

## [cAP](https://mikrotik.com/product/RBcAP2nD) (RBcAP2nD) {#cap-rbcap2nd}

cAP 是一款小型 AP 设备，带有一个以太网端口，支持通过 PoE 供电，并且可选地由 CAPsMAN 管理服务器进行管理。完整规格和宣传册请参见 [cAP 产品页面](https://mikrotik.com/product/RBcAP2nD)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能给人员带来危险并损坏系统。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境设定的辐射暴露限值。本 MikroTik 设备的安装和运行，与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 设置 {#setup}

- 确保您的互联网服务提供商（ISP）允许更改硬件并自动分配 IP 地址；
- 将 ISP 网线连接到以太网端口；
- 将设备连接到电源；
- 通过无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具，地址为 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 使用默认 IP 地址 192.168.88.1 在所选工具中开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您的国家/地区，以应用国家法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 供电 {#powering}

设备从以太网端口接受供电：

- 以太网端口接受 12-57 V DC **⎓**（802.3af/at 或被动 PoE）。最大负载下的功耗可达 4 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 POE 适配器的 POE 端口。
- 将来自 WAN 的以太网线连接到 POE 适配器的 LAN 端口，请注意数据和电源流向的箭头。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 安装 {#mounting}

可以使用设备背面的随附安装支架，将设备固定到墙壁或天花板上。

<p><Img src="/img/4f5fb86cf27278d8.webp" alt="" width={451} height={365} /></p>

- 使用随附的三颗螺丝将安装支架固定到墙壁或天花板上。
- 如有必要，使用 5 mm 钻头配合随附的膨胀螺栓。
- 将所需线缆连接到设备。
- 如有需要，在薄天花板或墙壁上作业时，可使用第二个安装支架提供额外支撑，随附螺丝长度为 20 mm。
- 将第二个支架固定到天花板的另一侧，并用螺丝穿过第一个支架固定。
- 将设备安装到安装支架上，顺时针旋转直到设备固定到位。我们建议为我们的设备使用 Cat5/6 网线。本设备的 IP 防护等级为 IPX0。*本设备的安装和配置应由具备资质的人员完成。* 警告！本设备的安装和运行，设备与身体之间的最小距离应为 20 cm。在住宅环境中运行本设备可能造成无线电干扰。

## 配置 {#configuration}

登录后，我们建议在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备使用所在的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下所有来自 Internet 端口的访问都被阻止）。出于恢复目的，可以从网络引导设备，请参见 Reset 按钮。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个 10/100 以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X）。直通线或交叉线均可用于连接其他网络设备。
- 一个集成无线 2.4 GHz 802.11b/g/n。

## 复位按钮 {#reset-button}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议同时验证这两个选项，以防其中一个无法使用。

- **Regular Booter：** 要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。根据型号不同，这可能由 **USR、USER、System** 或 **ACT** LED，或 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备上电之前按下按钮，系统将加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 模式按钮 {#mode-button}

模式按钮的动作可以在 RouterOS 软件中配置，以执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 配件 {#accessories}

包装中包含随设备提供的以下附件：

- K-46 安装套件。
- DC ⎓ EU/US 开关电源 24 V，0.2 A，4.8 W，Level VI，线缆：1.5 m。
- 带屏蔽以太网线/连接器的 POE 注入器（RBPOE）。
- cAP_2nD 天花板安装附件。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/RBcAP2nD](https://mikrotik.com/product/RBcAP2nD)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许商业使用。
- 如果 WLAN 设备的工作范围与上述法规不同，则需要向最终用户设备应用来自制造商/供应商的定制固件版本，并防止最终用户重新配置。
- 户外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据表可在制造商官方网站上获取。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制在 2.400 – 2.4835 GHz，TX 功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制在 5.150 – 5.250 GHz，TX 功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制在 5.250 – 5.350 GHz，TX 功率限制为 20dBm（EIRP）。

请确保设备具有锁定软件包（来自制造商的固件版本），该软件包必须应用到最终用户设备以防止最终用户重新配置。产品将标有国家代码 "-EG"。本设备需要升级到最新版本以确保符合当地主管机构的法规！最终用户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如在指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID: TV7RBCM2ND 本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的有害干扰防护。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。然而，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），建议用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。FCC 警告：未经合规责任方明确批准的任何更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或协同运行。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境设定的 RF 辐射暴露限值。本设备的安装和运行，辐射体与您身体任何部位之间的最小距离应为 20 cm。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC:7442A-CM2ND 本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。

本设备符合加拿大工业部适用于免许可无线电设备的 CNR。允许在以下两个条件下操作：(1) 设备不得产生干扰，且 (2) 设备用户必须接受所受到的任何无线电干扰，即使该干扰可能影响其运行。

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境设定的辐射暴露限值。本设备的安装和运行，辐射体与您身体任何部位之间的最小距离应为 20 cm。本设备符合针对非受控环境定义的 IC 辐射暴露限值。本设备必须安装和使用，辐射体与您身体任何部位之间的最小距离为 20 cm。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射器功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>≤100 mW</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而有所不同。

有关设备制造日期的信息位于其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），随后的两位数字表示周数。

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

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 MHz（20 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用，需按照乌克兰国家通信与信息化监管委员会 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 规定中 WLAN 最大发射功率限值。更多信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。有关更多信息，请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 最大发射功率限值。更多信息请参见上方的符合性声明。
