---
title: "wAP ac"
slug: /wap-ac
source: https://manual.mikrotik.com/hardware/wap-ac
captured_at: '2026-11-04T06:05:16+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/0f0957b07a6b9a42.webp" alt="" width={363} height={800} /></p>

<p><Img src="/img/12efca6087d36bfe.webp" alt="" width={144} height={160} /></p>

## [wAP ac](https://mikrotik.com/product/wap_ac) (RBwAPG-5HacD2HnD) {#wap-ac-rbwapg-5hacd2hnd}

wAP ac 是一款小型双频户外防水无线接入点，可安装在立杆、墙壁或天花板上。新版本配备 2 个千兆以太网端口、更强的无线天线性能、更大的内存以及强劲的四核 CPU。完整规格与产品手册请参见 [wAP ac 产品页面](https://mikrotik.com/product/wap_ac)。

:::info 本文涵盖

- **wAP ac** (RBwAPG-5HacD2HnD)
- **wAP ac BE** (RBwAPG-5HacD2HnD-BE)
:::

## 安全警告 {#safety-warnings}

- 本设备设计用于安装在立杆、墙壁或桅杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 在将系统连接到电源之前，请阅读安装说明。
- 遵循当地国家法规是客户的责任，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装与运行位置与您的身体、职业使用者或普通公众的距离不得小于 20 厘米。

## 设置 {#setup}

- 确保您的互联网服务提供商（ISP）允许更换硬件并自动分配 IP 地址；
- 打开底部盖板；
- 将设备连接到电源；
- 通过除 Ethernet1 以外的任意端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者使用网页浏览器中的 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 "WinBox" 配置工具。**提供多种配置方式以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新至最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，并重启设备；
- 将 RouterOS 软件升级到最新版本，可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中进行以下设置：选择您的国家，以应用该国的法规设置；
- 根据使用类型，将 *Installation* 设置为室内或室外；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 安装 {#mounting}

本设备有多种安装方式：墙面、天花板、立杆，也可以放置在包装内附带的 MikroTik 专用支架中。包装内包含带有说明的钻孔模板，可帮助您完成以太网线缆的安装并将其固定到天花板或墙壁上。包装内还包含一个用于安装在天花板吊顶板另一侧的钢制支架、两颗螺丝和墙锚。可使用扎带或钢卡箍将设备固定到立杆上。为防止底部盖板被打开，可使用不同的螺丝。包装内附带一颗 Torx T20 安全螺丝供选用。配合附带的 L 形扳手将其拧入底部盖板。更换螺丝的详细说明见包装。

使用和安装本设备时，请注意最大允许暴露（MPE）安全距离，辐射体与您身体之间的距离至少为 31 厘米。

**安装在桅杆或立杆上：**

<p><Img src="/img/b21639053eb61552.webp" alt="" width={455} height={595} /></p>

** 建议使用电工胶带以增加材料之间的摩擦力。*

- 将塑料扎带穿过孔洞安装到钢制支架上。
- 将支架安装到设备上。
- 用螺丝将其固定。
- 将设备安装到立杆或桅杆上并对齐。
- 将以太网线缆穿过开口并连接到以太网端口。
- 关闭底部卡扣并用螺丝固定。建议使用扎带将以太网线缆固定到立杆上，与设备的距离约为 30 厘米。

<p><Img src="/img/42ebcb18fdb0e686.webp" alt="" width={462} height={650} /></p>

**将设备安装在墙上：**

- 使用附带的模板标记钻孔位置，如有需要也标记以太网线缆的位置。请相应地对齐，这取决于设备最终将如何安装。
- 如有需要，插入膨胀管，具体取决于墙体结构和材质。
- 将附带的钢制支架放置在墙上。
- 用螺丝将其固定到位。
- 将以太网线缆穿过开口并连接到以太网端口。
- 将设备安装到钢制支架上
- 用螺丝将其固定到位。
- 关闭底部卡扣。

避免将设备安装在低洼地面上，否则您将无法安装并关闭底部卡扣。**安装在天花板上：**

<p><Img src="/img/35cd19164cabfd89.webp" alt="" width={459} height={532} /></p>

包装内附带一个专用支架，用于安装在天花板吊顶上。它由两部分组成，分别固定在天花板吊顶板的两侧。

-

使用模板标记钻孔位置。

-

将两个安装支架放置在标记位置。

-

用螺丝将它们固定在一起。如果安装在墙上，请以相同方式继续组装。

-

将以太网线缆穿过开口并连接到以太网端口。

-

将设备安装到钢制支架上。

-

用螺丝将其固定到位。

-

关闭底部卡扣。

## 底部盖板 {#bottom-lid}

- 底部盖板由防脱螺丝固定到位。
- 使用 Philips PH2 螺丝刀将其拧松，但不要完全拧下螺丝。

<p><Img src="/img/b67c9df3c35b1165.webp" alt="" width={194} height={118} /></p>

- 朝远离设备的方向拉动盖板即可将其取下。

<p><Img src="/img/23a475b4789e443e.webp" alt="" width={314} height={145} /></p>

- 重新组装。

## 供电 {#powering}

设备可从电源插孔或以太网端口获得供电，两者均在包装中提供：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 10-57 V ⎓ DC；
- 以太网端口接受 802.3af/at PoE 18-57 V ⎓ DC。最大负载下的功耗可达 10 W。请将接地（地线）线连接到下部盖板下方的螺丝上。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自本地网络（LAN）的以太网线缆连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。接地螺丝位于下部盖板下方：

<p><Img src="/img/e459e23d5228cdb3.webp" alt="" width={174} height={213} /></p>

## 扩展插槽和端口 {#extension-slots-and-ports}

<p><Img src="/img/315d6f9c6929731a.webp" alt="" width={613} height={462} /></p>

- 集成两个无线模块，分别工作在 2.4 GHz 和 5 GHz，支持 AP/CPE/P2P/repeater 模式。
- 两个 10/100/1000 以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X）。可使用直通线或交叉线连接到其他网络设备。

## 配置 {#configuration}

我们建议点击 "Check for updates" 按钮，并将您的 RouterOS 软件更新到最新版本，以确保获得最佳性能和稳定性。

- 互联网连接配置 [https://mt.lv/configuration](https://mt.lv/configuration)；
- RouterOS 软件的升级选项 [https://mt.lv/upgrade](https://mt.lv/upgrade)；除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议您访问 RouterOS 文档页面以熟悉这些功能：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问均被阻止）。可以从网络引导设备，以便在恢复场景下重新安装 RouterOS。这可以通过第一个以太网端口完成，请参见按钮与跳线。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请将设备进入 BOOTP 模式。有两种引导程序选项可用：**Regular Booter** 和 **Backup Booter**。建议在其中一个无法工作时验证另一个选项。

- **Regular Booter：** 要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将引导进入 **BOOTP** 模式，准备好通过 **Netinstall** 重新安装 RouterOS。根据型号不同，这可能由 **USR、USER、System** 或 **ACT** LED，或 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备上电之前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这适用于 RouterBOOT 调试和恢复。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统未经测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备的工作范围与上述规定不同，则需要由制造商/供应商提供定制固件版本并应用到最终用户设备，同时防止最终用户重新配置。
- 户外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据手册均可在制造商官方网站上获取。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，发射功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，发射功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，发射功率限制为 20dBm（EIRP）。

请确保设备带有 lock 软件包（来自制造商的固件版本），该软件包需要应用到最终用户设备，以防止最终用户重新配置。产品将标注国家代码 "-EG"。本设备需要升级到最新版本，以确保符合当地主管机构法规！遵循当地国家法规是最终用户的责任，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。

## 配件 {#accessories}

<p><Img src="/img/6cfe871694361319.webp" alt="" width={713} height={154} /></p>

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废弃物处置场所。请了解您所在地区将设备正确运送到指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBwAPG-5HacD2HnD-US</td><td>TV7WAPGR5AC2D</td></tr><tr><td>RBwAPG-5HacD2HnD-BE-US</td><td>TV7WAPGR5AC2D</td></tr></tbody></table>

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装环境中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来判断），建议用户尝试通过以下一种或多种措施来消除干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。FCC 警告：任何未经负责合规一方明确批准的更改或修改，可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受收到的任何干扰，包括可能导致意外运行的干扰。

注意：本设备在测试时对外围设备使用了屏蔽线缆。为确保合规，必须使用屏蔽线缆与本品配合。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境所规定的射频辐射暴露限值。本设备的安装与运行位置与您身体任何部位之间的距离至少为 20 厘米。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBwAPG-5HacD2HnD-US</td><td>7442A-WAPGR5AC2D</td></tr><tr><td>RBwAPG-5HacD2HnD-BE-US</td><td>7442A-WAPGR5AC2D</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 规定的免许可发射器/接收器。其运行须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

在 5150–5250 MHz 频段工作的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境所规定的辐射暴露限值。本设备的安装与运行位置与您身体任何部位之间的距离至少为 20 厘米。Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé à une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射机功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证情况而异。

设备制造日期信息以斜杠形式标注在其标签上的序列号末尾。第一位数字表示年份编号（年份的最后一位），其后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准（Norma Oficial Mexicana） {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 МГц (20 дБм), 5150-5250 МГц (23 дБм), 5250-5350 МГц (20 дБм), 5470-5725 МГц (27 дБм).

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，登记号 57/22589）所批准的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相关型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr></tbody></table>

** 遵循当地国家法规是客户的责任，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多详细信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多详细信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多详细信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多详细信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多详细信息请参见上方的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多详细信息请参见上方的符合性声明。

<p><Img src="/img/0561b3ba8c95a35c.webp" alt="" width={146} height={135} /></p>

在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。/ 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。/ 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。/ 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。/ 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。/ 在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。
