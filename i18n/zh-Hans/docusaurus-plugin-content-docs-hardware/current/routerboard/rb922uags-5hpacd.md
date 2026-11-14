---
title: "RB922UAGS-5HPacD"
slug: /rb922uags-5hpacd
source: https://manual.mikrotik.com/hardware/rb922uags-5hpacd
captured_at: '2026-11-04T10:00:28+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/480374f204f382a6.jpg)

720Mhz CPU、128MB RAM、1xGigabit Ethernet、1xSFP 插槽、1xminiPCI-e、1xSIM、板载 802.11ac 双链 5Ghz 无线、RouterOS L4。有关完整规格和产品手册，请参阅 [RB922UAGS-5HPacD 产品页面](https://mikrotik.com/product/RB922UAGS-5HPacD)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应按照所有国家法律和法规进行。将接入点安装在任何墙面上的所有安装方法均须获得当地管辖部门的认可。设备的安装必须符合当地和国家的电气规范。本产品设计用于在户外立杆上安装，但也可以安装在室内。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。仅使用制造商认可且可在本产品原包装中找到的电源和配件。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！如果设备发生故障，请将其断电。最快的方法是将电源插头从电源插座中拔出。客户有责任遵守当地国家/地区的规定，包括在合法频率信道内工作、输出功率、布缆要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

**暴露于射频辐射：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行应使其与您的身体、职业使用者或公众的距离不小于 20 厘米。

## 首次使用 {#first-use}

-

插入 miniPCIe 卡和 SIM 卡。

-

将天线线缆连接到 miniPCIe 卡。

-

（可选）将设备安装到外壳中。

-

将以太网线缆连接到千兆以太网端口。

-

插上电源线以开启设备。

-

通过 192.168.88.1 访问；

-

用户名为 admin，无密码（或者对于某些型号，请查看贴纸上的用户和无线密码）。

-

选择您所在的国家/地区，以应用该国家/地区的法规设置。

-

设置密码。

## 供电 {#powering}

设备可从电源插孔或以太网端口接受供电：

- 直接输入电源插孔（外径 5.5mm、内径 2mm，母头，中心针为正极）接受 8-30 V DC。
- 以太网端口接受无源以太网供电 8-30 V DC。最大负载下的功耗可达 17 W。

## 配置 {#configuration}

登录后，我们建议在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将使用的国家/地区，以符合当地法规。RouterOS 除本文档所述内容外还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参阅相关章节。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个千兆以太网端口可接受来自无源 PoE 注入器的 10-30 V DC 供电。
- 一个 SFP 插槽。
- 一个 miniPCIe 插槽，用于 3G/4G/LTE 调制解调器或其他无线网卡。
- USB 端口。
- 2x MMCX 连接器，用于内置的强劲 802.11ac 2x2 无线模块。
- SIM 插槽（需要 3g miniPCIe 卡）。

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在会寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## miniPCIe 插槽使用 {#minipcie-slot-usage}

本设备配备一个支持 3G/4G/LTE 调制解调器或 WiFi 模块的 miniPCIe。SIM 插槽用于与 miniPCIe 调制解调器配合使用，不能单独使用。

## 操作系统支持 {#operating-system-support}

本设备支持版本号等于或高于 RouterOS 菜单 /system resource 中所指示版本的 RouterOS 软件。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废弃物处置场所。请了解将设备正确运送到您所在地区指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID: TV7RB922-5HPACTM

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，证明符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装中的有害干扰提供合理防护。本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再打开设备来判定），则建议用户尝试通过以下措施之一来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。 **FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致非预期操作的干扰。本设备及其天线不得与任何其他天线或发射器同址放置或联合操作。

**重要：暴露于射频辐射**。天线与用户之间必须保持至少 20 厘米的距离。在此配置下，可满足 FCC 针对一般人群/非受控环境规定的辐射暴露限值。天线安装。

警告：安装人员有责任确保在美国（或适用 FCC 规则的地方）使用授权天线时，仅使用随产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，明确禁止使用任何非随产品认证的天线。安装人员应根据国家/地区法规和每种天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC: 7442A-9225HPACT 本设备符合加拿大工业部免许可 RSS 标准。操作须符合以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。本设备符合加拿大工业部针对免许可无线电设备适用的 CNR 要求。允许在以下两个条件下操作：(1) 设备不得产生干扰，且 (2) 设备用户必须接受所受到的任何无线电干扰，即使该干扰可能影响其正常运行。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：暴露于射频辐射。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行应使辐射体与您身体的任何部位之间保持至少 20 厘米的距离。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射功率</th></tr></thead><tbody><tr><td>5150-5350 МГц，5650-5850 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而有所不同。

设备生产日期信息以斜杠分隔的形式标注在其标签上的序列号末尾。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准（Norma Oficial Mexicana） {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5470-5725 МГц（27 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用须按照 NKРЗІ 2012 年 11 月 1 日第 559 号决议（2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 在此声明，无线电设备类型 RB922UAGS-5HPacD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家/地区的规定，包括在合法频率信道内工作、输出功率、布缆要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。如需更详细的信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。如需更多信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。如需更多信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。如需更多信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 最大发射功率限值。如需更多信息，请参见上文的符合性声明。
