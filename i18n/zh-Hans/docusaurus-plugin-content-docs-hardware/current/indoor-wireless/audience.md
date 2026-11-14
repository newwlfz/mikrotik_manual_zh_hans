---
title: "受众"
slug: /audience
source: https://manual.mikrotik.com/hardware/audience
captured_at: '2026-11-04T05:55:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/e6d36a61a309ffd5.jpg" alt="" width={416} height={799} /></p>

## [Audience](https://mikrotik.com/product/RBD25G-5HPacQD2HPnD) (RBD25G-5HPacQD2HPnD) {#audience-rbd25g-5hpacqd2hpnd}

Audience - 用于构建可靠网络的家庭接入点。通过向其中添加更多 Audience 设备，可轻松扩展无线网络覆盖范围。您可以在网络范围内携带无线设备移动，Audience 设备将与其绑定相同的 (SSID)。有关完整规格和宣传册，请参阅 [Audience 产品页面](https://mikrotik.com/product/RBD25G-5HPacQD2HPnD)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家和地方法律法规。
- 设备的安装必须符合当地和国家电气规范。
- 本设备旨在安装于机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确程序可能会对人员造成危险情况，并损坏系统。
- 本产品适合室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座上拔下电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备都必须由专业人员安装。
- 这是 A 类设备。在居住环境中，本产品可能会造成无线电干扰，在这种情况下，用户可能需要采取适当措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置应距离您的身体、职业用户或公众不少于 20 厘米。

## 设置 {#setup}

Audience 默认配置为 Home AP，以便在家庭或办公室中简单、可管理地使用。请按照以下步骤设置您的无线网络：

- 确保您的互联网服务提供商 (ISP) 允许硬件更改并自动分配 IP 地址；
- 将 ISP 线缆连接到 ETH1 端口；
- 将设备连接到电源；
- 通过任意以太网端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在 Web 浏览器中使用 WebFig，或使用位于 https://mt.lv/winbox 的 "WinBox" 配置工具。**提供多种配置方法以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 标签页来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者对于某些型号，请查看贴纸上的用户和无线密码）；
- 单击 "Check for updates" 按钮，并将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

要将另一台 Audience 设备添加到网络，请参阅 WPS Sync 按钮。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码并选择您首选的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将已输入。
- 单击 Connect 建立通过无线网络与设备的连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可全面配置所有必要设置。

## 供电 {#powering}

设备可从电源插孔或以太网端口接受供电：

-

所提供的直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）可接受 12-57 V DC ⎓。

-

以太网 1 端口可接受 Passive PoE 24-57 V DC ⎓。最大负载下的功耗可达 30 W。**连接到 POE 适配器。** POE 适配器不包含在包装中，如果您考虑使用它，请按照以下步骤操作：

-

将来自 Audience 的以太网线缆连接到 POE 适配器的 POE 端口。

-

将以太网线缆从您的 LAN 连接到 POE 适配器的 LAN 端口，请注意数据和电源流向箭头。

-

将电源线连接到适配器，然后将电源线插入电源插座。

## 安装 {#mounting}

本设备设计用于室内，放置在平坦表面上，所有所需线缆连接到设备背面。IPX 防护等级为 IPX0。我们建议为 Audience 设备使用 Cat6 屏蔽线缆。*警告！本设备的安装和操作应确保设备与您的身体之间至少保持 20 cm 的距离。在居住环境中操作本设备可能会造成无线电干扰。*

## 配置 {#configuration}

登录后，我们建议单击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将使用的国家/地区，以符合当地法规。RouterOS 除了本文档所述内容外，还包含许多配置选项。我们建议从这里开始，以熟悉各种可能性：https://mt.lv/help 如果 IP 连接不可用，可以使用 WinBox 工具（https://mt.lv/winbox）从 LAN 侧连接到设备的 MAC 地址（默认情况下，所有来自 Internet 端口的访问都会被阻止）。出于恢复目的，可以启动设备进行重新安装，请参阅按钮和跳线。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 两个千兆以太网端口。
- 集成无线 2.4 GHz 802.11b/g/n，天线增益 3.5 dBi。
- 集成无线 5.0 GHz 802.11a/n/ac，天线增益 4.5 dBi。5180 – 5320 MHz。
- 集成无线 5.0 GHz 802.11a/n/ac，天线增益 4.5 dBi。5500 – 5825 MHz。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。随后设备将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请使设备进入 BOOTP 模式。有两个 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议验证两个选项，以防其中一个无法工作。

- **Regular Booter：** 要进入 etherboot 模式，请在给设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备通电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。取决于型号，这可能由 **USR, USER, System**，或由 **ACT** LED 指示，也可能由 SFP 端口 LED 指示。

无论使用上述哪个选项，如果在设备通电前按下按钮，系统都将加载备份 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复很有用。

### WPS Sync 按钮 {#wps-sync-button}

使用 WPS Sync 按钮，通过向其中添加多台 Audience 设备来扩展无线中继网络覆盖范围。

- 在选定的 Audience AP 上，按一次 "WPS-Sync" 按钮，以开启 WPS 模式两分钟，并使其等待 Audience 中继器。状态 LED 将闪烁绿色。
- 需要按住 "WPS-Sync" 按钮启动 Audience 中继器，以便设备根据 "WPS-Sync" 模式自行配置并连接到 Audience AP。当状态 LED 闪烁琥珀色时，松开 "WPS-Sync" 按钮。
- 如果 Audience 中继器无法连接到 Audience AP，则可以通过 RouterOS 重复连接，或者按下 "WPS-Sync" 按钮并在 5 秒后松开，设备将开启 "WPS-Sync" 模式两分钟并搜索 Audience AP。状态 LED 将闪烁琥珀色。
- 要将第三台 Audience 中继器添加到网络，请在网络中的第二台 Audience 上按下 "WPS-Sync" 按钮，然后在按住 "WPS-Sync" 按钮的情况下启动第三台设备。根据需要重复此操作，以向您的网络中添加更多设备。

## 正面状态 LED 行为 {#front-status-led-behavior}

- 常亮蓝色 – 设备已通电。
- 闪烁绿色 – 设备处于 Access Point 模式，并等待另一台 Audience 设备连接。
- 闪烁琥珀色（红色 + 绿色）– 设备搜索并尝试连接到另一台 Audience 设备。
- 常亮绿色 – 设备已在 Audience 网络中建立连接。
- 闪烁红色 – 设备运行 DFS 雷达检测。

## 配件 {#accessories}

<p><Img src="/img/39548a32b05e93fa.webp" alt="" width={448} height={237} /></p>

## 规格 {#specifications}

有关本产品、规格和图片的更多信息，请访问我们的网页：https://mikrotik.com/product/audience

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 注意事项 {#notice}

- 频段 5.470-5.725 GHz 不允许用于商业用途。
- 如果 WLAN 设备的工作范围与上述法规不同，则需要将来自制造商/供应商的定制固件版本应用到最终用户设备，并且还要防止最终用户重新配置。
- 户外使用：最终用户需要获得 NTRA 的批准/许可证。
- 任何设备的数据表可在制造商官方网站上获取。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，TX 功率限制为 20dBm (EIRP)。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，TX 功率限制为 23dBm (EIRP)。
- 序列号末尾带有字母 “EG” 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，TX 功率限制为 20dBm (EIRP)。

请确保设备具有锁定包（来自制造商的固件版本），需要将其应用到最终用户设备，以防止最终用户重新配置。产品将标有国家/地区代码 “-EG”。本设备需要升级到最新版本，以确保符合当地主管机构法规！最终用户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及 DFS 要求。所有 MikroTik 无线电设备都必须由专业人员安装。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如在指定的废物处置场所处置。请了解您所在地区将设备正确运输到指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBD25G-5HPacQD2HPnD-US</td><td>TV7D25-5HPQ2HP</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射无线电频率能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户操作本设备的权限失效。

本设备符合 FCC 规则第 15 部分。操作需满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。

注意：本设备在周边设备上使用屏蔽线缆进行了测试。必须在本设备上使用屏蔽线缆以确保合规。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBD25G-5HPacQD2HPnD-US</td><td>7442A-D255HPQ2HP</td></tr></tbody></table>

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。操作需满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备内含的免许可证发射器/接收器符合加拿大创新、科学与经济发展部（ISED）针对免许可证无线电设备适用的 CNR 标准。允许在以下两个条件下运行：1）设备不得产生干扰；2）设备必须接受任何接收到的无线电干扰，即使该干扰可能导致设备运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

在 5150–5250 MHz 频段运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息位于其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周编号。

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

工作频率（最大输出功率）：2400-2483.5 МГц (20 дБм), 5150-5250 МГц (23 дБм), 5250-5350 МГц (20 дБм), 5470-5725 МГц (27 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需要按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定（该决定已于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号）批准的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBD25GR-5HPacQD2HPnD 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下互联网地址获取：https://mikrotik.com/products

### WLAN / WCDMA / LTE / 5G {#wlan--wcdma--lte--5g}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>WLAN</th><th>2400-2483.5 MHz / 20 dBm</th></tr></thead><tbody><tr><td>5150-5250 MHz / 23 dBm</td><td></td><td></td></tr><tr><td>5250-5350 MHz / 20 dBm</td><td></td><td></td></tr><tr><td>5470-5725 MHz / 27 dBm</td><td></td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更详细信息，请参阅上文的符合性声明。

<p><Img src="/img/0561b3ba8c95a35c.webp" alt="" width={146} height={135} /></p>

本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。
