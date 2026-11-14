---
title: "mAP"
slug: /map
source: https://manual.mikrotik.com/hardware/map
captured_at: '2026-11-04T06:01:37+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/45438bca6a658278.jpg" alt="" width={800} height={800} /></p>

## [mAP](https://mikrotik.com/product/RBmAP2nD)（RBmAP2nD） {#map-rbmap2nd}

mAP 2nD 是一款小型无线 AP 设备，带有 2 个以太网端口，Ether1 支持通过 PoE 受电，Ether2 支持 PoE 输出，可为另一台设备供电。根据软件配置的不同，它可以作为无线客户端、接入点或中继器使用。完整规格和宣传册请参阅 [mAP 产品页面](https://mikrotik.com/product/RBmAP2nD)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备拟安装于机架中。开始安装前请仔细阅读安装说明。使用不正确的硬件或不遵循正确的操作步骤，可能会对人员造成危险情况并对系统造成损坏。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用本设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所制定的辐射暴露限值。本 MikroTik 设备的安装和使用位置与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 设置 {#setup}

- 确保您的互联网服务提供商（ISP）允许更换硬件并自动分配 IP 地址；
- 将 ISP 网线连接到 Ether1 端口；
- 将设备连接到电源；
- 通过 Ether2 端口或无线网络 "MikroTik-..."（请务必查看贴纸上的无线密码）连接到设备；
- 使用移动应用程序建立连接。或者，使用网页浏览器中的 WebFig，或使用 [https://mt.lv/winbox](https://mt.lv/winbox) 上的 "WinBox" 配置工具。**提供多种配置方法以确保可访问性；**
- 使用默认 IP 地址 192.168.88.1 在所选工具中开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

Ether2 端口支持 PoE 输出，具备自动检测功能。这意味着您可以连接笔记本电脑和其他非 PoE 设备而不会损坏它们。Ether2 上的 PoE 输出约比输入电压低 2 V，最大支持 0.5 A（因此随附的 24 V 电源将为 Ether2 PoE 端口提供 22 V / 0.5 A 的输出）。

## 供电 {#powering}

本设备可从电源插孔或第一个以太网端口（无源 PoE）接受供电：

- DC 电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 8-57 V DC ⎓。
- 第一个以太网端口接受无源以太网供电 11-57 V DC ⎓。
- mAP 也可以通过内置的 micro USB 端口供电，使用 USB 5 V ⎓ 电源。在最大负载下，本设备的功耗为 4W（不使用 PoE 输出时）。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名已经填入。
- 点击 Connect，通过无线网络建立与设备的连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 可使用高级菜单来完整配置所有必要的设置。

## 启动过程 {#booting-process}

除本文档中所述内容外，RouterOS 还包含许多配置选项。我们建议您从这里开始，熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问均被阻止）。出于恢复目的，可以让设备进入引导状态以便重新安装，请参阅按钮和跳线部分。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 两个 10/100 以太网端口，支持自动交叉/直通线缆连接（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。
- 一个集成无线 2.4GHz 802.11b/g/n 2x2 双链路 MIMO，板载 PIF 天线，最大增益 1.2dBi。
- 一个 micro USB 2.0 端口。

## 安装 {#mounting}

本设备设计用于室内使用，可放置在平坦表面上，所有需要的线缆都连接到设备的前部。我们建议使用 Cat6 屏蔽线缆。警告！本设备的安装和操作时，设备与您身体之间应保持至少 20 cm 的距离。在住宅环境中操作本设备可能会造成无线电干扰。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 常亮，然后松开即可启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种引导程序选项可用：**Regular Booter** 和 **Backup Booter**。建议对两种选项都进行验证，以防其中一个无法使用。

- **Regular Booter：** 要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将引导进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。取决于型号，这可能由 **USR、USER、System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备上电之前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。这对 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备的工作范围与上述规定不同，则须向终端用户设备应用来自制造商/供应商的定制固件版本，并防止终端用户重新配置。
- 户外使用：终端用户需要获得 NTRA 的批准/许可。
- 任何设备的数据表均可在制造商官方网站上获取。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，发射功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，发射功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，发射功率限制为 20dBm（EIRP）。

请确保设备具有锁定软件包（来自制造商的固件版本），该软件包需要应用于终端用户设备，以防止终端用户重新配置。产品将标有国家代码 "-EG"。本设备需要升级到最新版本，以确保符合当地主管部门的法规！终端用户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID：TV7RBMAP2ND

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，证明符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的保护，防止有害干扰。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或经验丰富的无线电/电视技术人员以获取帮助。FCC 警告：未经合规负责方明确批准的任何更改或修改，都可能导致用户无权操作本设备。本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不会造成有害干扰；(2) 本设备必须接受任何收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射机处于同一位置或联合运行。

**重要提示：射频辐射暴露。** 本设备符合 FCC 针对非受控环境所制定的射频辐射暴露限值。本设备的安装和操作时，辐射体与您身体任何部位之间应保持至少 20 cm 的距离。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC: 7442A-MAP2ND 本设备符合加拿大工业部免许可 RSS 标准。操作须符合以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

**重要提示：射频辐射暴露。** 本设备符合 IC 针对非受控环境所制定的辐射暴露限值。本设备的安装和操作时，辐射体与您身体任何部位之间应保持至少 20 cm 的距离。Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé à une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>≤100 mW</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而异。

有关设备制造日期的信息，标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## Norma Oficial Mexicana {#norma-oficial-mexicana}

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

在乌克兰使用需按照 NKРЗІ 2012 年 11 月 1 日第 559 号决议批准、并于 2013 年 1 月 3 日在乌克兰司法部登记（编号 57/22589）的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBmAP2nD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 规定所设定的 WLAN 最大发射功率限值。更多详细信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设定的 WLAN 最大发射功率限值。更多信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设定的 WLAN 最大发射功率限值。更多信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设定的 WLAN 最大发射功率限值。更多信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设定的 WLAN 最大发射功率限值。更多信息请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设定的 WLAN 最大发射功率限值。更多详细信息请参阅上文的符合性声明。
