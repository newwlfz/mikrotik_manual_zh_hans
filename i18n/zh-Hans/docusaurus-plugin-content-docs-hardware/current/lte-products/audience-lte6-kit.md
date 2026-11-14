---
title: "Audience LTE6 kit"
slug: /audience-lte6-kit
source: https://manual.mikrotik.com/hardware/audience-lte6-kit
captured_at: '2026-11-04T09:43:11+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/3a70e73b88a06312.webp)

## [Audience LTE6 kit](https://mikrotik.com/product/audience_lte6_kit)（RBD25GR-5HPacQD2HPnD&R11e-LTE6） {#audience-lte6-kit-rbd25gr-5hpacqd2hpndr11e-lte6}

Audience LTE6 kit 是一款内置 LTE 调制解调器的家庭接入点。你可以通过向网络中添加更多 Audience 设备来扩展无线覆盖范围——这些设备会组成一个使用相同 SSID 的单一网络，因此你的设备可以在其覆盖范围内自由漫游。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家和地区的法律与法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备预期安装在机架中。开始安装之前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能导致对人员造成危险的情况并损坏系统。
- 本产品预期在室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。
- 这是 A 类设备。在居住环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的射频辐射暴露限值。本 MikroTik 设备安装和运行时，应与你的身体、职业用户或普通公众保持不小于 20 厘米的距离。

## 连接 {#connecting}

- 插入 Micro SIM 卡，参见（SIM 卡槽使用）。
- 将随附的电源适配器插入以启动设备（见 ""）。
- 设备将启动，前面板 LED 指示灯将常亮蓝色，无线网络将可供连接。
- 在你的 PC、手机或其他设备上打开网络连接，搜索 MikroTik 无线网络并连接到它。
- 连接到无线网络后，在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始配置，由于默认没有密码，你将自动登录（或者，对于某些型号，请查看贴纸上的用户名和无线密码）。手机请使用该应用程序（见 ""）。
- 选择 "Check for updates" 按钮并将你的 RouterOS 软件更新到最新版本，需要有效的 SIM 卡。
- 选择 WebFig 选项卡，在左侧菜单中选择 CAPsMAN。
- 选择 Security Cfg。
- 选择添加新的：选择 Authentication Type：WPA PSK、WPA2 PSK；Encryption：aes ccm；Passphrase：strongwirelesspassword；

![](/img/447b6a0d58621531.webp)

- 选择 OK。
- 选择 Configurations 选项卡。
- 选择一个接口示例：cfg-2ghz。
- 找到 Security 并选择之前创建的配置文件：security1。
- 找到 Country 并设置你所在的国家。
- 选择 OK。
- 对 cfg-5ghz-ac 接口执行相同的操作。
- 在左侧菜单中选择 System&gt;Password。
- 为设备输入密码并选择 Change。要向网络中添加另一台 Audience 设备（见 ""）。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择你偏好的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名将已预先填写。
- 选择 Connect 以通过无线网络与你的设备建立连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导你完成所有基本配置设置。
- 还提供了高级菜单，可完整配置所有必要的设置。

## 供电 {#powering}

设备可通过电源插孔或以太网端口供电：

-

所提供的直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 12-57 V DC ⎓。

-

以太网 1 端口接受 Passive PoE 24-57 V DC ⎓。最大负载下的功耗可达 30 W。**连接到 POE 适配器。** 包装中不包含 POE 适配器，如果你考虑使用它，请按以下步骤操作：

-

将以太网线从 Audience 连接到 POE 适配器的 POE 端口。

-

将以太网线从你的 LAN 连接到 POE 适配器的 LAN 端口，注意数据与电源流向的箭头。

-

将电源线连接到适配器，然后将电源线插入电源插座。

## 安装 {#mounting}

本设备设计用于室内，可放置在平整表面上，所有需要的线缆都连接到设备的背面。IPX 防护等级为 IPX0。Audience 设备应使用 Cat6 屏蔽电缆。*警告！本设备安装和运行时，设备与你的身体之间应保持至少 50 厘米的距离。本设备在居住环境中运行可能造成无线电干扰。*

## 配置 {#configuration}

登录后，你应在 QuickSet 菜单中选择 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳的性能和稳定性。对于无线型号，请确保已选择设备将要使用的国家，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问都被阻止）。出于恢复目的，可以启动设备以进行重新安装，参见章节 。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 两个千兆以太网端口。
- 集成无线 2.4 GHz 802.11b/g/n，天线增益 3.5 dBi。
- 集成无线 5.0 GHz 802.11a/n/ac，天线增益 4.5 dBi。5180 – 5320 MHz。
- 集成无线 5.0 GHz 802.11a/n/ac，天线增益 4.5 dBi。5500 – 5825 MHz。
- Audience LTE6 kit - MiniPCIe 插槽，出厂预装 R11e-LTE6 卡和 SIM 卡槽。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮的功能如下所述：

- 在接通电源之前按住此按钮，通电三秒后松开，以加载备份 boot loader。如果设备因 RouterBOOT 升级失败而无法运行，这可能是有必要的。在使用备份 loader 启动设备后，你可以设置 RouterOS 在 RouterBOARD 设置中强制使用备份 loader，或者有机会从 fwf 文件重新安装失败的 RouterBOOT（共 3 秒）。
- 如果你继续按住此按钮 2 秒直到绿色 LED 灯开始闪烁，松开按钮即可将 RouterOS 配置重置为默认值（共 5 秒）。
- 要将此设备连接到由 CAPsMAN 管理的无线网络，请继续按住按钮 5 秒，LED 变为常亮绿色，此时松开即可开启 CAPs 模式（共 10 秒）。
- 或者继续按住按钮 5 秒直到绿色 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器。你也可以一直按住按钮，直到设备出现在 Windows 上的 Netinstall 程序中（共 15 秒）。无论使用上述哪种方式，如果在设备通电之前按钮已被按下，系统将加载备份 RouterBOOT loader。这对 RouterBOOT 调试和恢复很有用。

### WPS 同步按钮 {#wps-sync-button}

使用 WPS 同步按钮，通过向网络中添加多台 Audience 设备来扩展你的无线中继网络覆盖范围。

- 在选定的 Audience AP 上，按一次 "WPS-Sync" 按钮，即可开启 WPS 模式两分钟，使其等待 Audience 中继设备。状态 LED 将闪烁绿色。
- Audience 中继设备需要在按住 "WPS-Sync" 按钮的情况下启动，以便设备根据 "WPS-Sync" 模式自行配置并连接到 Audience AP。当状态 LED 闪烁琥珀色时，松开 "WPS-Sync" 按钮。
- 如果 Audience 中继设备无法连接到 Audience AP，则可以通过 RouterOS 重试连接，或按下 "WPS-Sync" 按钮并在 5 秒后松开，设备将开启 "WPS-Sync" 模式两分钟并搜索 Audience AP。状态 LED 将闪烁琥珀色。
- 要向网络中添加第三台 Audience 中继设备，请在你的网络中第二台 Audience 上按下 "WPS-Sync" 按钮，然后在按住 "WPS-Sync" 按钮的情况下启动第三台设备。根据需要添加更多设备，重复此操作。

## 前面板状态 LED 行为 {#front-status-led-behavior}

- 常亮蓝色 – 设备已通电。
- 闪烁绿色 – 设备处于 Access Point 模式，正在等待另一台 Audience 设备连接。
- 闪烁琥珀色（红色 + 绿色）– 设备正在搜索并尝试连接到另一台 Audience 设备。
- 常亮绿色 – 设备已在 Audience 网络中建立连接。
- 闪烁红色 – 设备正在执行用于动态频率选择（DFS）的雷达检测。

## SIM 卡槽使用 {#sim-slot-usage}

SIM 卡槽设计用于 Micro SIM 卡。

- Nano SIM 卡厚度不同，不建议配合转接卡使用。

![](/img/a0db691ac4861274.webp)

## 配件 {#accessories}

![](/img/39548a32b05e93fa.webp)

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/audience_lte6_kit](https://mikrotik.com/product/audience_lte6_kit)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未经过测试。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备的工作范围与上述规定不同，则需要将由制造商/供应商提供的定制固件版本应用于终端用户设备，并同时防止终端用户重新配置。
- 户外使用：终端用户需要获得 NTRA 的批准/许可。
- 任何设备的数据手册均可在制造商官方网站上获取。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，发射功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，发射功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，发射功率限制为 20dBm（EIRP）。

请确保设备具有锁包（来自制造商的固件版本），该固件需要应用于终端用户设备，以防止终端用户重新配置。产品将标注国家代码 "-EG"。本设备需要升级到最新版本以确保符合当地主管部门的法规！终端用户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如送往指定的废物处置场所。请了解你所在地区将设备妥善运送到指定处置场所的相关流程。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th><th>包含 FCC ID</th></tr></thead><tbody><tr><td>RBD25GR-5HPacQD2HPnD-US&R11e-LTE6</td><td>TV7D25-5HPQ2HP</td><td>TV7R11ELTE6</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为居住环境中的安装提供合理的有害干扰防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。然而，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再打开设备来确定），则鼓励用户尝试通过以下一项或多项措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。FCC 注意：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的授权。

本设备符合 FCC 规则第 15 部分。其运行受以下两个条件约束：(1) 本设备不得造成有害干扰；(2) 本设备必须接受收到的任何干扰，包括可能导致意外运行的干扰。

注：本设备已使用屏蔽电缆与外围设备一起进行测试。为确保合规，必须使用屏蔽电缆与设备配合。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th><th>包含 IC</th></tr></thead><tbody><tr><td>RBD25GR-5HPacQD2HPnD-US&R11e-LTE6</td><td>7442A-D255HPQ2HP</td><td>7442A-R11ELTE6</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 标准的免许可发射器/接收器。其运行受以下两个条件约束：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。

本设备内含的免许可证发射器/接收器符合加拿大创新、科学与经济发展部（ISED）针对免许可证无线电设备适用的 CNR 标准。允许在以下两个条件下运行：1）设备不得产生干扰；2）设备必须接受任何接收到的无线电干扰，即使该干扰可能导致设备运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

工作在 5150–5250 MHz 频段的设备仅限室内使用，以减少对同频道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射机功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而异。

关于设备制造日期的信息，标注在其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息领域监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 МГц (20 дБм)、5150-5250 МГц (23 дБм)、5250-5350 МГц (20 дБм)、5470-5725 МГц (27 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 NCCIR 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）所批准的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBD25GR-5HPacQD2HPnD&R11e-LTE6 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/product/audience_lte6_kit](https://mikrotik.com/product/audience_lte6_kit)

### WLAN / WCDMA / LTE / 5G {#wlan--wcdma--lte--5g}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>WLAN</th><th>2400-2483.5 MHz / 20 dBm</th></tr></thead><tbody><tr><td>5150-5250 MHz / 23 dBm</td><td></td><td></td></tr><tr><td>5250-5350 MHz / 20 dBm</td><td></td><td></td></tr><tr><td>5470-5725 MHz / 27 dBm</td><td></td><td></td></tr><tr><td>E-GSM-900</td><td>900 MHz / 33 dBm</td><td></td></tr><tr><td>DCS-1800</td><td>1800 MHz 30 dBm</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dBm ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 规定对 WLAN 和 LTE 最大发射功率的限值。更多详细信息请参见上文的符合性声明。

![](/img/0561b3ba8c95a35c.webp)

在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限于室内使用。
