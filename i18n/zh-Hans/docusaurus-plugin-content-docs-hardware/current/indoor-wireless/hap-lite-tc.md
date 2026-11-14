---
title: "hAP lite TC"
slug: /hap-lite-tc
source: https://manual.mikrotik.com/hardware/hap-lite-tc
captured_at: '2026-11-04T05:58:30+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/774474343643aa41.jpg" alt="" width={487} height={800} /></p>

## [hAP lite TC](https://mikrotik.com/product/RB941-2nD-TC) (RB941-2nD-TC) {#hap-lite-tc-rb941-2nd-tc}

hAP lite TC 是一款简单的家用无线接入点。它出厂即已配置完成，您只需插上网线即可开始使用无线网络。我们建议您设置密码以保护设备安全，请按以下步骤操作。完整规格和产品手册请参见 [hAP lite TC 产品页面](https://mikrotik.com/product/RB941-2nD-TC)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家和地方法律法规。
- 设备安装必须符合当地和国家电气规范。
- 本设备设计用于机架安装。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能对人员造成危险情况并对系统造成损坏。
- 本产品设计用于室内安装。请远离水、火、潮湿或高温环境。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因设备使用不当而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备出现故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境设定的辐射暴露限值。本 MikroTik 设备的安装和操作位置应与您的身体、职业用户或公众保持不少于 20 厘米的距离。

## 设置 {#setup}

- 确保您的互联网服务提供商（ISP）允许更换硬件并自动分配 IP 地址；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源；
- 通过除 Ethernet1 以外的任意端口，或通过无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者使用网页浏览器中的 WebFig，或使用 [https://mt.lv/winbox](https://mt.lv/winbox) 上的 "WinBox" 配置工具。**提供多种配置方式以确保可访问性；**
- 使用默认 IP 地址 192.168.88.1 在所选工具中开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您所在的国家，以应用该国的法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码并选择您使用的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名将已自动填入。
- 点击 Connect，通过无线网络与设备建立连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 还提供高级菜单，可完整配置所有必要的设置。

## 供电 {#powering}

本设备可通过 microUSB 端口供电：

- 该端口本身并不作为标准 microUSB 数据端口使用，仅用于供电。您可以选用通常随智能手机附带的任意标准 0.5-2 A USB 适配器。包装内附有一个 5 V ⎓ 0.7 A USB 充电器。最大负载下的功耗可达 3.5 W。

## 配置 {#configuration}

登录后，我们建议您点击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳的性能和稳定性。对于无线型号，请确保已选择设备将使用的国家，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以让设备引导以进行重新安装，请参见“按钮和跳线”。

## 安装 {#mounting}

本设备设计用于室内使用，可放置在平坦表面上，所有需要的线缆连接到设备正面。

<p><Img src="/img/89a51fc3d8a42270.webp" alt="" width={50} height={81} /></p>

本设备的 IP 防护等级为 IPX0。我们建议使用 Cat6 屏蔽线缆。警告！本设备的安装和操作应确保设备与您的身体之间保持至少 20 厘米的距离。在住宅环境中操作本设备可能会造成无线电干扰。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 四个独立的 10/100 以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。
- 集成无线 2.4 GHz b/g/n，板载 PIF 天线，最大增益 1.5 dBi。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 常亮，然后松开即可启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，需将设备进入 BOOTP 模式。有两种 booter 选项可用：**常规 Booter** 和 **备份 Booter**。建议对两种选项都进行验证，以防其中一种不可用。

- **常规 Booter：** 要进入 etherboot 模式，请在设备上电后等待 1–2 秒，然后按下 **Reset** 按钮。
- **备份 Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将引导进入 **BOOTP** 模式，准备好通过 **Netinstall** 重新安装 RouterOS。根据型号不同，这可能由 **USR、USER、System** 或 **ACT** LED，或 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统将加载备份 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含以下随设备提供的附件：

- 欧盟电源适配器 5 V DC 0.7 A。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统未经测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许商用。
- 如果 WLAN 设备的工作范围与上述法规不同，则需要将制造商/供应商提供的定制固件版本应用到最终用户设备上，并防止最终用户重新配置。
- 户外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据手册均可在制造商官方网站上获取。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，TX 功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，TX 功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，TX 功率限制为 20dBm（EIRP）。

请确保设备具有锁定软件包（来自制造商的固件版本），该软件包需要应用到最终用户设备上，以防止最终用户重新配置。产品将标注国家代码 "-EG"。本设备需要升级到最新版本，以确保符合当地主管部门的法规！最终用户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID:TV7RB941-2ND

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装环境提供合理的保护，防止有害干扰。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭并重新开启设备来确定），建议用户尝试通过以下措施之一来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的间距。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户无权操作本设备。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致不良操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或联合运行。**重要提示：射频辐射暴露。** 本设备符合 FCC 针对非受控环境设定的射频辐射暴露限值。本设备的安装和操作应确保辐射体与您身体的任何部位之间保持至少 20 厘米的距离。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC:7442A-9412ND 本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备不良操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要提示：射频辐射暴露。** 本设备符合 IC 针对非受控环境设定的辐射暴露限值。本设备的安装和操作应确保辐射体与您身体的任何部位之间保持至少 20 厘米的距离。Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé à une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

有关设备生产日期的信息标注在其标签上的序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），其后两位数字表示周数。

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

工作频率（最大输出功率）：2400-2483.5 МГц（20 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用该设备，必须按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定（于 2013 年 1 月 3 日在乌克兰司法部登记，登记号 № 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RB941-2nD-TC 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400 - 2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明。
