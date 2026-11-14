---
title: "hAP ac²"
slug: /hap-ac-2
source: https://manual.mikrotik.com/hardware/hap-ac-2
captured_at: '2026-11-04T05:58:09+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/02e78c0981f20c86.jpg" alt="" width={637} height={799} /></p>

## [hAP ac²](https://mikrotik.com/product/hap_ac2) (RBd52G-5HacD2HnD-TC) {#hap-ac-rbd52g-5hacd2hnd-tc}

hAP ac² 是一款简单的家庭无线接入点。它已完成预配置，您只需插入 ISP 网线即可开始使用无线上网。我们建议您设置密码来保护设备安全。完整规格和产品手册请参见 [hAP ac² 产品页面](https://mikrotik.com/product/hap_ac2)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于机架安装。开始安装前请仔细阅读安装说明。使用不正确的硬件或不遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，它们可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内工作、输出功率、布缆要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 供电 {#powering}

设备可从电源插孔或第一个以太网端口（无源 PoE）获取电源：

- 直接输入电源插孔（外径 5.5mm、内径 2mm，母头，中心正极插头）接受 12-30 V DC
- 第一个以太网端口接受无源 Power over Ethernet，接受 18-28 V DC（用于补偿线缆上的损耗，因此建议高于 12V）最大负载下的功耗可达 15 W。

## 设置 {#setup}

- 将 ISP 网线连接到 Ethernet1 端口；如果您有有线设备，请将它们连接到其他端口；
- 将计算机的 IP 配置设置为*自动*(DHCP)；
- 从您的 PC 或智能手机连接到以 "MikroTik" 开头的无线网络名称；
- 连接到无线网络后，在 Web 浏览器中打开 192.168.88.1 开始配置，由于默认没有密码，您将自动登录（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 在加载的界面中设置您的密码。还请指定您所在的国家/地区，以确保遵守当地法规。

## 配置 {#configuration}

我们建议点击 "Check for updates" 按钮，将 RouterOS 软件更新到最新版本，以确保获得最佳性能和稳定性。除本文档所述内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始了解各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下来自 Internet 端口的所有访问均被阻止）。为便于恢复，可以从网络引导设备，请参见按钮和跳线一节。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 以太网端口通过交换芯片连接，可单独配置，并支持自动交叉/直通线缆校正 (Auto MDI/X)，因此您可以使用直通线或交叉线连接到其他网络设备。
- 集成的无线模块支持 AP/CPE/P2P/Repeater 模式。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开即可启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议对两个选项都进行验证，以防其中一个无法使用。

- **Regular Booter：**要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：**关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将引导进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。取决于型号，这可能会通过 **USR、USER、System** 或 **ACT** LED 指示，或通过 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列在 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废弃物处置场所。请了解您所在地区将设备正确运输至指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

FCC ID：TV7RBD52-5ACD2ND 本设备经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限值旨在为住宅安装环境提供合理的有害干扰防护。本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装环境中不会产生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），建议用户尝试通过以下措施之一来消除干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收机之间的距离。
- 将设备连接到与接收机所连电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。 **FCC 警告：** 任何未经负责合规方明确批准的改变或修改，都可能导致用户失去操作本设备的权利。本设备符合 FCC 规则第 15 部分的规定。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受任何接收到的干扰，包括可能导致非预期操作的干扰。本设备及其天线不得与任何其他天线或发射器同处一地或一起运行。**重要提示：射频辐射暴露。** 本设备符合 FCC 针对非受控环境所规定的射频辐射暴露限值。本设备在安装和运行时，辐射体与您身体任何部位之间的最小距离应为 20 cm。

**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用经本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 节，明确禁止使用任何未经本产品认证的天线。安装人员应根据国家法规并针对各天线类型配置天线的输出功率等级。带有连接器的设备需要由专业人员进行安装，以确保符合健康与安全要求。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC：7442A-D52AC

本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，并且 (2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。本设备符合适用于免许可无线电设备的加拿大工业部 CNR 标准。使用须满足以下两个条件：(1) 设备不得产生干扰，并且 (2) 设备用户必须接受所收到的任何无线电干扰，即使该干扰可能影响设备的正常运行。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

在 5150–5250 MHz 频段工作的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

**重要提示：射频辐射暴露。** 本设备符合 IC 针对非受控环境所规定的辐射暴露限值。本设备在安装和运行时，辐射体与您身体任何部位之间的最小距离应为 20 cm。本设备符合 IC 针对非受控环境所规定的辐射暴露限值。本设备在安装和运行时，辐射体与您身体任何部位之间的最小距离应为 20 cm。

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证情况而有所不同。

有关设备制造日期的信息标示在其标签上的序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），随后的两位数字表示周数。

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

工作频率（最大输出功率）：2400-2483.5 МГц (20 дБм)、5150-5250 МГц (23 дБм)、5250-5350 МГц (20 дБм)、5470-5725 МГц (27 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用须按照 2012 年 11 月 1 日 NKРЗІ 第 559 号决议批准、并于 2013 年 1 月 3 日在乌克兰司法部登记（编号 57/22589）的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBD52G-5HacD2HnD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率 (EIRP)**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法频率信道内工作、输出功率、布缆要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定中最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定中最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明。

<p><Img src="/img/0561b3ba8c95a35c.webp" alt="" width={146} height={135} /></p>

在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。/ 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。/ 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。/ 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。/ 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。/ 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。
