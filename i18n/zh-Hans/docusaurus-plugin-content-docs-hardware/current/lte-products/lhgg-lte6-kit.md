---
title: "LHGG LTE6 套件"
slug: /lhgg-lte6-kit
source: https://manual.mikrotik.com/hardware/lhgg-lte6-kit
captured_at: '2026-11-04T09:55:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/9214d5a2d4899217.jpg)

## [LHGG LTE6 kit](https://mikrotik.com/product/lhgg_lte6_kit) (RBLHGGR&R11e-LTE6) {#lhgg-lte6-kit-rblhggrr11e-lte6}

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。完整规格和手册请参阅 [LHGG LTE6 kit 产品页面](https://mikrotik.com/product/lhgg_lte6_kit)。
- 本产品的最终处置应遵守所有国家法律和法规。
- 在任何墙面上安装接入点的所有安装方式均须获得当地管辖部门的认可。
- 设备安装必须符合当地和国家电气规范。
- 本产品设计用于在户外立杆上安装。开始安装前请仔细阅读安装说明。使用错误的硬件和配置或未遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，操作风险自负！
- 若设备发生故障，请断开其电源。最快的方法是从电源插座上拔下电源插头。
- 客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。
- 这是 A 类设备。在居住环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或公众的距离不得小于 130 厘米。

## 快速开始 {#quickstart}

- 打开以太网端口盖板；
- 将 SIM 卡插入插槽，芯片朝上；
- 用以太网线将设备连接到随附 PoE 注入器的 data+power 端；
- 将 PoE 注入器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 在网页浏览器中打开 [https://192.168.188.1](https://192.168.188.1)；
- 用户名：**admin**，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如果您的移动网络运营商要求，请输入 PIN 码；
- 使用检查更新选项将设备升级到最新版本。您必须有一张已激活且还有可用流量的 SIM 卡；
- 设备将重启；
- 再次连接，并在 **QuickSet** 菜单中设置一个强密码。

## 外壳组装 {#case-assembly}

- 将两条支腿分别滑入相应的一侧，以安装到 LHG 外壳上。两条支腿不同且不可互换（面对产品时，使以太网端口盖板朝向您，标有 R 的支腿用于右侧，标有 L 的支腿用于左侧）。
- 将组装好的 LHG 单元卡入网格的适当中心位置。
- 用随附的两颗自攻螺钉（十字螺丝刀 PH2）将两条支腿固定到位。包装中还包含一个接地线连接器和一个 5 度角适配器，便于向上或向下倾斜调节。

## 打开外壳盖 {#opening-the-case-cover}

可选 — 如需接触 miniPCIe 插槽，需要打开设备顶盖。作为开启工具，可以使用大号一字螺丝刀或一枚小硬币。打开时务必格外小心，因为不正确地打开卡扣可能会将其折断！*本设备的安装和配置应由合格人员完成。* 请按以下步骤操作：

![](/img/82b7fa2a4a679f2f.webp)

抬起盖子时的额外注意事项：不要用尖锐物体强行撬动。

## miniPCIe 插槽使用 {#minipcie-slot-usage}

本设备配备一个 miniPCIe 插槽，并已安装 LTE6 调制解调器。提供一个 SIM 插槽，用于与 miniPCIe 调制解调器配合使用。SIM 插槽不能单独使用。更换 miniPCIe 模块应由合格人员完成，处理电气设备时请遵守安全注意事项：

- 在拆包和处理电子元件时使用腕部接地带，以避免静电放电（ESD）损坏；
- 按前面说明所示打开上盖；

![](/img/3ce4a8956b2c2a41.webp)

- 天线位于 PCB 下方；
- 找到 PCB 上的 miniPCIe 插槽，并卸下两颗出厂时安装的螺钉；
- 将随附的厚导热垫贴到卡上，然后将卡安装到 miniPCIe 插槽中，使导热垫位于 PCB 与卡之间；
- 插入您需要的卡；
- 用之前卸下的两颗螺钉将卡固定到位；
- 将灰色 uFL 连接器连接到调制解调器的 MAIN 天线连接器，将黑色线缆连接到辅助（或 AUX）连接器；
- 在卡的顶部贴上一块较薄的导热垫；
- 重新组装。组装完成后，将移动运营商的 SIM 卡滑入 SIM 插槽，芯片朝上，如端口标签所示。该插槽支持 MicroSIM（3FF）。

## 供电 {#powering}

本设备可由 12-57 V 的 802.3af/at 电源以及无源 PoE 注入器供电（随附一个电源和一个 PoE 注入器）。最大功耗 6 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 安装 {#mounting}

![](/img/819eccc51163cf32.webp)

- 将随附的金属安装环滑入天线反射盘背面的两个槽中。
- 将设备固定到立杆上，以太网端口朝下。
- 使用 PH2 螺丝刀拧紧安装环。
- 使用扎带将以太网线固定在立杆上，距设备不超过一米，以免线缆被拉出端口。
- 检查安装角度和位置。
- 可选：如有需要，在安装设备之前，可将随附的 5 度调节适配器插入安装环所在的顶部或底部槽中。当设备紧固到垂直立杆上时，这会产生额外的向上或向下角度。
- 将 5 度角适配器插入其中一个槽中，然后重新安装设备。在户外安装时，请确保所有线缆开口朝下。使用 POE 注入器和正确的接地，本设备在端口盖下方设有专门设计的接地连接器。建议使用屏蔽 Cat5/6 线缆。本设备的 IP 防护等级为 IP54。*警告！本设备的安装和运行应与您的身体保持至少 120 厘米的距离。在居住环境中运行本设备可能会造成无线电干扰。*

## 配置 {#configuration}

登录后，您应在 QuickSet 菜单中选择 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将使用的国家，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，以熟悉各种可能的功能：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。

## 配件 {#accessories}

包装包含以下随设备提供的配件和零件：

- ADAPT1_ EU/US 开关电源 24V, 0.8A；
- CLAMP1,2_ SUS304 软管卡箍（philips 型；9mm；夹紧直径范围 25-70mm），带 EPE 袋；
- POE1_ 千兆 POE 注入器；
- K-SET_K_Set 用于 LHGGR&R11e-LTE6；
- CASE1_ LHG-LTE-RHLEG-R0；
- CASE2_ LHG-LTE-LHLEG-R0；
- CASE10_ LHG-5G-390mm 碟形天线 3,0x2.5x0,5mm；
- 已组装的 LHGGR 主支腿。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/67b78179c3a03815.webp)

- 一个千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。连接其他网络设备时可以使用直通线或交叉线。该以太网端口可接受来自无源 PoE 注入器的 9-30 V DC 供电。
- 带 LTE6 调制解调器的 MiniPCIe 插槽。
- SIM 插槽（不能单独使用）。

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）；
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在会搜索 CAPsMAN 服务器（共 10 秒）；
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 搜索 Netinstall 服务器（共 15 秒）；无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 模式按钮 {#mode-button}

模式按钮的动作可以通过 RouterOS 软件进行配置，以执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备妥善运送到指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>包含 FCC ID</th></tr></thead><tbody><tr><td>RBLHGGR&R11e-LTE6</td><td>TV7R11ELTE6</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装提供合理的有害干扰保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在居住区域运行本设备很可能会造成有害干扰，此时用户需要自行承担费用来纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

注意：本机在测试时外围设备使用了屏蔽线缆。为确保合规，必须使用屏蔽线缆与本机配合。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>包含 IC</th></tr></thead><tbody><tr><td>RBLHGGR&R11e-LTE6</td><td>7442A-R11ELTE6</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备生产日期信息以斜杠分隔的形式标注在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息领域监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）批准的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBLHGGR&R11e-LTE6 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### GSM / WCDMA / LTE {#gsm--wcdma--lte}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>E-GSM-900</th><th>900 MHz / 33dBm</th></tr></thead><tbody><tr><td>DCS-1800</td><td>1800 MHz / 30dBm</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 24dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 24dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1700 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dBm ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。有关更多详细信息，请参阅上文的符合性声明。

![](/img/0561b3ba8c95a35c.webp)

当在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限于室内使用。
