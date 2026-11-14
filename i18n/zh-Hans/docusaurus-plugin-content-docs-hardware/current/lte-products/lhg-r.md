---
title: "LHG R"
slug: /lhg-r
source: https://manual.mikrotik.com/hardware/lhg-r
captured_at: '2026-11-04T09:54:23+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## [LHG R](https://mikrotik.com/product/rblhgr) (RBLHGR) {#lhg-r-rblhgr}

![](/img/7c2295886e9fa394.webp)

LHG R 不带工厂安装的调制解调器，您可以选择自己的解决方案。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 将接入点安装到任何墙面上的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家电气规范。
- 本产品 intended to be mounted outdoors on a pole. 开始安装前请仔细阅读安装说明。未能使用正确的硬件和配置，或未遵循正确程序，可能对人员造成危险情况并损坏系统。
- 仅使用制造商批准且可在本产品原包装中找到的电源和配件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境设定的辐射暴露限值。本 MikroTik 设备安装和操作时，应与您的身体、职业用户或公众保持不少于 120 厘米的距离。

## 快速开始 {#quickstart}

- 握住设备的中央立柱，同时用力按压使卡扣保持闭合的卡舌，直到卡扣弹开。
- 将 SIM 卡插入卡槽，芯片朝上。
- 安装您所需的调制解调器。
- 将支脚安装到设备底部以组装外壳，参见外壳组装段落。
- 将设备安装到您所需的位置，参见“安装”段落。
- 将以太网线连接到以太网端口，将以太网线的另一端连接到随附的 PoE 注入器。
- 将 PoE 注入器插入您的 PC。
- 将随附的电源插入 PoE 注入器以启动设备。参见“供电”段落。
- 将 LAN 计算机的 IP 配置设置为*自动*（DHCP）。
- 在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 以开始配置。
- 用户名：a*dmin*，默认无密码，您将自动登录到 Quick Set 屏幕（或者，对于某些型号，请查看贴纸上的用户和无线密码）。
- 通过选择右侧的“Check for updates”按钮并更新您的 RouterOS 软件到最新版本，以更新设备，确保最佳性能和稳定性。必须插入有效的 SIM 卡。
- 要手动更新设备，请访问 [https://mikrotik.com/download](https://mikrotik.com/download)
- 为此设备选择 MIPSBE 软件包并下载到您的 PC。
- 将下载的软件包上传到 WebFig 的“Files”菜单并重启设备。将 RouterOS 软件更新到最新版本可确保最佳性能、稳定性和安全更新。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个 10/100 以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。可使用直通或交叉线缆连接其他网络设备。该以太网端口接受来自无源 PoE 注入器的 9-30 V DC 供电。
- MiniPCIe 插槽和 SIM 插槽（不能单独使用），用于 3G/4G/LTE 调制解调器。

## 供电 {#powering}

该设备可由 12-57 V 802.3af/at 电源和无源 PoE 注入器供电（随附一个电源和 PoE 注入器）。最大功耗 6 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网线连接到 POE 适配器的 POE 端口。
- 将来自 LAN 的以太网线连接到 POE 适配器的 LAN 端口，注意数据和电源流向箭头。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 打开外壳盖 {#opening-the-case-cover}

要访问 MiniPCIe 插槽，需要打开设备的顶盖。作为开启工具，您可以使用大号一字螺丝刀或小硬币。打开时务必极其小心，因为不正确地打开卡扣可能会将其折断！*本设备的安装和配置应由合格人员完成。* 请按照以下步骤操作：

![](/img/82b7fa2a4a679f2f.webp)

额外注意：掀起盖子时，不要用尖锐物体强行撬开。

## miniPCIe 插槽使用 {#minipcie-slot-usage}

该设备配备一个 miniPCIe 插槽，用于 3G/4G/LTE 调制解调器。提供一个 SIM 插槽，与 miniPCIe 调制解调器一起使用。SIM 插槽不能单独使用。在这种情况下，内部天线未连接（位于外壳内部）。安装 miniPCIe 模块应由合格人员完成，处理电气设备时请遵循安全预防措施：

- 拆包和处理电气组件时，请使用腕部接地带，以避免静电放电（ESD）损坏。
- 按照前面的说明打开上盖。
- 天线位于 PCB 下方。
- 找到 PCB 上的 miniPCIe 插槽，并拆下两个出厂安装的螺丝。
- 将随附的厚导热垫贴到卡上，然后将卡安装到 miniPCIe 插槽中，使导热垫位于 PCB 和卡之间。

![](/img/3ce4a8956b2c2a41.webp)

- 插入您所需的卡。
- 使用之前拆下的两个螺丝将卡固定到位。
- 将黑色 uFL 连接器连接到调制解调器的 MAIN 天线连接器，将灰色线缆连接到 DIV 连接器。
- 将较薄的导热垫贴到卡的顶部。
- 按相反顺序重新组装。重新组装后，将移动运营商的 SIM 卡滑入 SIM 插槽，芯片朝上，如端口标签所示。该插槽接受 MicroSIM（3FF）。

## 组装 {#assembly}

- 将两个支脚滑入各自一侧，以安装到 LHG 外壳上，支脚有所不同且不能互换（查看产品时，使以太网端口盖位于您前方，标有 R 的支脚用于右侧，标有 L 的支脚用于左侧）。
- 将组装好的 LHG 设备卡入网格的适当中央位置。
- 使用随附的两个自攻螺丝（PH2 十字螺丝刀）将两个支脚固定到位。包装中还包含一个接地线连接器和一个 5 度角适配器，便于向上或向下倾斜调整。

## 安装 {#mounting}

![](/img/819eccc51163cf32.webp)

- 将随附的金属安装环滑入天线碟背面的两个槽中。
- 将设备安装到立杆上，使以太网端口朝下。
- 使用 PH2 螺丝刀拧紧安装环。
- 使用扎带将以太网线固定到立杆上，距离设备小于一米，以避免线缆从端口被拉出。
- 检查安装角度和位置。
- 可选：如有需要，在安装设备之前，您可以将随附的 5 度调整适配器插入安装环所插入的顶部或底部槽中。当设备紧固到垂直立杆上时，这将产生额外的向上或向下角度。
- 将 5 度角适配器插入其中一个槽并重新安装设备。户外安装时，确保所有线缆开口朝下。使用 POE 注入器和正确接地，本设备在端口盖下方有专门设计的接地连接器。建议使用屏蔽 Cat5/6 线缆。本设备的 IP 防护等级为 IP54。

## 配置 {#configuration}

登录后，您应选择 QuickSet 菜单中的“Check for updates”按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将使用的国家/地区，以符合当地法规。RouterOS 除本文档所述内容外，还包含许多配置选项。我们建议从这里开始了解各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络启动设备，参见相关章节。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 当绿色 LED 开始闪烁时松开按钮，以将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，以清除所有配置和默认值。
- 当 LED 不再点亮（约 20 秒）后松开按钮，使设备寻找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。无论使用上述哪种选项，如果在给设备通电前按下按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。该设备在以太网端口门后包含一个接地连接，您应将其连接到设备使用地点所在塔架或建筑的接地装置。这可以大幅降低 ESD 和雷击损坏的风险。

## 模式按钮 {#mode-button}

可以从 RouterOS 软件配置模式按钮的操作，以执行用户提供的任意 RouterOS 脚本。您也可以禁用此按钮。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 规格 {#specifications}

有关本产品、规格和图片的更多信息，请访问我们的网页：[https://mikrotik.com/product/rblhgr](https://mikrotik.com/product/rblhgr)

## 配件 {#accessories}

![](/img/a62040f544ef34ab.webp)

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

![](/img/8d294e5cd375c591.webp)

![](/img/25f50553ffd86eaf.webp)

![](/img/b0984aa3ad3c6d58.webp)

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

为避免环境污染，请将设备与生活垃圾分开，并以安全方式处置，例如在指定的废物处置场所处置。请熟悉您所在地区将设备正确运输到指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装中的有害干扰提供合理保护。

本设备产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区域操作本设备可能会造成有害干扰，在这种情况下，用户需要自行承担费用来纠正干扰

**FCC 警告：** 未经合规负责方明确批准的任何更改或修改，都可能导致用户失去操作本设备的权利。本设备符合 FCC 规则第 15 部分。操作受以下两个条件约束：(1) 本设备不得造成有害干扰，以及 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或联合操作。注意：本单元在外围设备上使用屏蔽线缆进行了测试。为确保合规，必须在本单元上使用屏蔽线缆。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。操作受以下两个条件约束：

-

本设备不得造成干扰；

-

本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。本设备包含的免许可发射器/接收器符合加拿大创新、科学和经济发展部适用于免许可无线电设备的免许可 RSS。操作须满足以下两个条件：

-

本设备不得产生干扰；

-

本设备必须接受任何无线电干扰，即使该干扰可能影响其正常操作。此 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境设定的辐射暴露限值。本设备安装和操作时，辐射体与您身体任何部位之间的最小距离应为 120 厘米。本设备符合 IC 针对非受控环境定义的辐射暴露限值。本设备安装和使用时，辐射体与您身体任何部位之间的最小距离应为 120 厘米。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备制造日期信息位于其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后续两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息领域国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBLHGR 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WCDMA / LTE / 5G {#wcdma--lte--5g}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>E-GSM-900</th><th>900 MHz / 33 dBm</th></tr></thead><tbody><tr><td>DCS-1800</td><td>1800 MHz / 30 dBm</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dBm ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。有关更详细的信息，请参阅上方的符合性声明。 / 本 MikroTik 设备符合 ETSI 规定中的 WLAN 和 LTE 最大发射功率限值。更多信息请参阅上方的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大传输功率限值。有关更多信息，请参阅上方的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。有关更多信息，请参阅上方的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。有关更多信息，请参阅上方的符合性声明。 / 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 和 LTE 最大发射功率限值。有关更多信息，请参阅上方的符合性声明。
