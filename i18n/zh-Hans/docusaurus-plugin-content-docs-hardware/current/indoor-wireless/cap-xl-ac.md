---
title: "cAP XL ac"
slug: /cap-xl-ac
source: https://manual.mikrotik.com/hardware/cap-xl-ac
captured_at: '2026-11-04T05:55:30+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/21e1d856fbf13621.jpg" alt="" width={799} height={666} /></p>

## [cAP XL ac](https://mikrotik.com/product/cap_xl_ac)（RBcAPGi-5acD2nD-XL） {#cap-xl-ac-rbcapgi-5acd2nd-xl}

性能强悍的吸顶 AP！我们最畅销的 cAP 回来了——更强劲、更出色。与之前的 cAP 型号相比，改进的高增益天线将覆盖面积提升多达 100%！完整规格和宣传册请参见 [cAP XL ac 产品页面](https://mikrotik.com/product/cap_xl_ac)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气线路相关危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备安装必须符合当地和国家电气规范。
- 本设备适用于机架安装。开始安装前，请仔细阅读安装说明。使用错误的硬件或不遵循正确程序，可能对人员造成危险情况并对系统造成损坏。
- 本产品适用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商批准且可在本产品原包装中找到的电源和配件。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。

**射频辐射暴露：**本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。安装和操作本 MikroTik 设备时，应与身体、职业用户或普通公众保持不少于 20 厘米的距离。

## 设置 {#setup}

- 确保你的互联网服务提供商 (ISP) 允许硬件更换并自动分配 IP 地址；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 以外的任意端口，或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用建立连接。或者，在网页浏览器中使用 WebFig，或使用 [https://mt.lv/winbox](https://mt.lv/winbox) 上的 "WinBox" 配置工具。**提供多种配置方法以确保可连接性；**
- 使用默认 IP 地址 192.168.88.1 在所选的工具中开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户密码和无线密码）；
- 单击 "Check for updates" 按钮，并将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择你的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择你的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## 扩展插槽和端口 {#extension-slots-and-ports}

产品代码 RBcAPGi-5acD2nD-XL

- CPU 四核 IPQ-4018 710 MHz
- RAM 大小 128 MB
- RAM 类型 DDR3L
- 存储 16 MB，Flash
- 1G 以太网端口数量 2
- 无线 2.4 GHz 5 GHz
- 支持的协议 802.11b/g/n 802.11a/n/ac
- 天线增益 6 dBi 5,5 dBi
- 链数量 2
- 操作系统 RouterOS（许可证级别 4）
- 交换芯片型号 IPQ-4018
- 尺寸 191 x 42 mm
- 工作温度 -40°C 至 +70°C

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种启动选项可用：**Regular Booter** 和 **Backup Booter**。建议在其中一个选项不可用时验证两个选项。

- **Regular Booter:** 要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter:** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。取决于型号，这可能由 **USR、USER、System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电前按下按钮，系统都将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 模式按钮 {#mode-button}

本设备上有两个模式按钮，但它们执行相同的动作。可通过 RouterOS 软件配置模式按钮的动作，以执行任何用户提供的 RouterOS 脚本。你也可以禁用此按钮。默认情况下，这些按钮会启用 "dark mode"，从而禁用蜂鸣声和 LED 灯。可在 RouterOS 菜单 /system routerboard mode-button 中配置模式按钮。

## LED 指示灯 {#led-indicators}

<p><Img src="/img/ae0fc84c535b6e65.webp" alt="" width={587} height={649} /></p>

设备上有七个 LED 灯，如有必要可将其全部禁用。

- User – 可由用户配置、用于任意所需脚本的 LED。
- 5G – 5GHz 接口活动。
- 2G – 2.4 GHz 接口活动。
- E2 – Ethernet 2 已连接。
- E1 – Ethernet 1 已连接。
- PoE LED 表示 ETH2 端口当前正在通过 PoE 为另一台设备供电。
- 电源 LED 表示设备正在通过 ETH1 端口接收供电。

## 配件 {#accessories}

包装内包含随设备提供的以下配件：

- ADAPT1_ EU/US 开关电源 24V，1.2A。
- POE1_ 千兆 POE 注入器。
- BRAC1_ CAPGB 安装支架。
- 螺丝套装：2 颗螺丝和安装用膨胀螺栓。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列于 /system resource。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码并选择你偏好的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将已填写。
- 单击 Connect 以通过无线网络建立到设备的连接。
- 选择 Quick setup，应用将通过几个简单步骤引导你完成所有基本配置设置。
- 还提供高级菜单，可完整配置所有必要设置。

## 注意事项 {#notice}

- 任何设备的数据表均可在制造商官方网站上获取。
- 对于某些型号，请查看贴纸上的用户密码和无线密码。
- 5.470-5.725 GHz 频段不允许用于商业用途。
- 请确保设备具有锁定软件包（制造商提供的固件版本），必须将其应用到最终用户设备上，以防止最终用户重新配置。产品将标有国家/地区代码 “-EG” - RBcAPGi-5acD2nD-XL-EG。
- 户外使用：最终用户需要获得 NTRA 的批准/许可。
- 埃及法规固件的无线频率范围限制为 2.400 – 2.4835 GHz，TX 功率限制为 20dBm (EIRP)。
- 埃及法规固件的无线频率范围限制为 5.150 – 5.250 GHz，TX 功率限制为 23dBm (EIRP)。
- 埃及法规固件的无线频率范围限制为 5.250 – 5.350 GHz，TX 功率限制为 20dBm (EIRP)。此设备需要升级到最新版本，以确保符合当地主管部门法规！最终用户有责任遵守当地国家法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择 (DFS) 要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装。

为避免环境污染，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定废物处置场所。请熟悉将设备正确运送到你所在地区指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>*RBcAPGi-5acD2nD-XL*-US</td><td>TV7CPGI52XL</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理保护，防止有害干扰。

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再打开设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：未经合规负责方明确批准的任何更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

注意：本设备已使用外围设备的屏蔽电缆进行测试。必须使用屏蔽电缆连接本设备以确保合规。

**重要：射频辐射暴露。**本设备符合 FCC 针对非受控环境规定的辐射暴露限值。安装和操作本设备时，辐射体与身体任何部位之间应保持至少 20 cm 的距离。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>*RBcAPGi-5acD2nD-XL*-US</td><td>7442A-CPGI52XL</td></tr></tbody></table>

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。操作须符合以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备内含的免许可证发射器/接收器符合加拿大创新、科学与经济发展部（ISED）针对免许可证无线电设备适用的 CNR 标准。允许在以下两个条件下运行：1）设备不得产生干扰；2）设备必须接受任何接收到的无线电干扰，即使该干扰可能导致设备运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

在 5150–5250 MHz 频段中操作的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

**重要：射频辐射暴露。**本设备符合 IC 针对非受控环境规定的辐射暴露限值。安装和操作本设备时，辐射体与身体任何部位之间应保持至少 20 cm 的距离。

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz, 5150-5350 MHz, 5650-5850 MHz</td><td>≤10 W</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息位于其贴纸上的序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

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

## 乌克兰国家通信和信息领域国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 MHz（20 dBm），5150-5250 MHz（23 dBm），5250-5350 MHz（20 dBm），5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBcAPGi-5acD2nD-XL 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率 (EIRP)**</th><th>**限制**</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均不受任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均不受任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择 (DFS) 要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参见上方的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参见上方的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参见上方的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参见上方的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参见上方的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。有关更多详细信息，请参见上方的符合性声明。

<p><Img src="/img/0561b3ba8c95a35c.webp" alt="" width={146} height={135} /></p>

本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。
