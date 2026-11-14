---
title: "LHG kit 系列"
slug: /lhg-kit-series
source: https://manual.mikrotik.com/hardware/lhg-kit-series
captured_at: '2026-11-04T09:53:54+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/7c2295886e9fa394.webp)

:::info 本文涵盖

- **LHG LTE6 kit** (RBLHGR&R11e-LTE6)
- **LHG LTE kit** (RBLHGR&R11e-LTE)
- **LHG LTE kit-US** (RBLHGR&R11e-LTE-US)
:::

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规执行。
- 在任何墙面上安装接入点的所有安装方法均须获得当地主管部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于在户外立杆上安装。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能会对人员造成危险情况并对系统造成损坏。
- 仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。
- 这是 A 类设备。在居住环境中，本产品可能会引起无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或普通公众的距离不得小于 130 厘米。

## 快速开始 {#quickstart}

默认配置 CPE RouterMode：

- *WAN 端口受防火墙保护并启用了 DHCP 客户端。
- LAN 配置：
- 在 ether1（LAN 端口）上设置了 IP 地址 192.168.188.1/24；
- 已启用 DHCP 服务器；
- 已启用 DNS；
- WAN（网关）配置：
- 网关：lte1；
- ip4 防火墙：已启用；
- NAT：已启用。
- 握住设备的中央立柱，同时用力按压保持锁扣闭合的卡舌，直到锁扣弹开。
- 将 SIM 卡插入卡槽，芯片朝上。
- 通过将支脚安装到设备底座来组装外壳，参见（链接）段落。
- 将设备安装到所需位置，参见（链接）段落。
- 将 LAN 计算机的 IP 配置设置为*自动*（DHCP）。
- 在网页浏览器中打开 [https://192.168.188.1](https://192.168.188.1) 以开始配置。
- 用户名：a*dmin*，默认没有密码，您将自动登录到 Quick Set 界面（或者，对于某些型号，请查看贴纸上的用户和无线密码）。
- 通过点击右侧的 "Check for updates" 按钮并更新您的 RouterOS 软件至最新版本来更新设备，以确保最佳性能和稳定性。必须插入有效的 SIM 卡。
- 要手动更新设备，请访问 [https://mikrotik.com/download](https://mikrotik.com/download)
- 为该设备选择 MIPSBE 软件包并将其下载到您的 PC。
- 将下载的软件包上传到 WebFig 的 "Files" 菜单并重启设备。
- 将 RouterOS 软件更新至最新版本可确保最佳性能、稳定性和安全更新。
- 在右侧底部的 "Password" 字段中设置路由器密码，并在 "Confirm Password" 字段中重复输入，该密码将在下次登录时使用。
- 选择 "Apply Configuration" 以保存更改。所有 7.1.4 之前的 ROS 版本默认 IP 均设置为 192.168.88.1，升级到 7.1.4 之后默认 IP 设置为 192.168.188.1。

## 外壳组装 {#case-assembly}

- 通过将两个支脚滑到各自的一侧，将它们安装到 LHG 外壳上，这两个支脚是不同的，不能互换（观察产品时，请将其摆放为以太网端口盖朝向您，标记为 R 的支脚用于右侧，标记为 L 的支脚用于左侧）。
- 将组装好的 LHG 设备卡入网格的相应中央位置。
- 使用随附的两颗自攻螺钉（十字螺丝刀 PH2）将两个支脚固定到位。包装中还包含一个接地线连接器和一个 5 度角适配器，便于进行向上或向下的倾斜调节。参见段落。

## 打开外壳盖 {#opening-the-case-cover}

可选——如需接触 miniPCIe 插槽，需要打开设备顶盖。作为开启工具，您可以使用大号一字螺丝刀或一枚小硬币。打开时请格外小心，因为不正确的开启方式可能会将卡扣折断！*本设备的安装和配置应由合格人员完成。* 请按照以下步骤操作：

![](/img/82b7fa2a4a679f2f.webp)

掀起盖子时还需额外注意，请勿使用尖锐物体强行撬动。

## miniPCIe 插槽使用 {#minipcie-slot-usage}

本设备配备一个 miniPCIe 插槽，并已根据您所拥有的型号预装了调制解调器。提供一个 SIM 卡槽，与 miniPCIe 调制解调器配合使用。SIM 卡槽不可单独使用。更换 miniPCIe 模块应由合格人员完成，处理电气设备时请遵循安全预防措施：

- 拆包和处理电子元件时，请使用腕部接地带以避免静电放电（ESD）损坏；
- 按照前面的说明打开上盖；
- 天线位于 PCB 下方；
- 在 PCB 上找到 miniPCIe 插槽，并卸下两颗出厂安装的螺钉；

![](/img/3ce4a8956b2c2a41.webp)

- 将随机提供的厚导热垫贴到卡上，并将卡安装到 miniPCIe 插槽中，使导热垫位于 PCB 与卡之间；
- 插入您需要的卡；
- 使用先前卸下的两颗螺钉将卡固定到位；
- 将灰色 uFL 连接器连接到调制解调器的 MAIN 天线连接器，将黑色线缆连接到辅助（或 AUX）连接器；
- 在卡的顶部贴上一片较薄的导热垫；
- 重新组装。重新组装后，将您的移动运营商的 SIM 卡滑入 SIM 卡槽，芯片朝上，如端口标签所示。该卡槽支持 MicroSIM（3FF）。

## 供电 {#powering}

本设备可由 12-57 V 802.3af/at 电源以及无源 PoE 注入器供电（随附一个电源和一个 PoE 注入器）。最大功耗为 6 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自您本地网络（LAN）的以太网线缆连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 安装 {#mounting}

![](/img/819eccc51163cf32.webp)

- 将随附的金属安装环滑入天线盘背面的两个槽中。
- 将设备安装到立杆上，以太网端口朝下。
- 使用 PH2 螺丝刀拧紧安装环。
- 使用扎带将以太网线缆固定到立杆上，距离设备不超过一米，以避免线缆从端口中被拉出。
- 检查安装角度和位置。
- 可选：如有需要，在安装设备之前，您可以将随附的 5 度调节适配器插入安装环所插入的顶部或底部槽中。这样当设备拧紧到垂直立杆上时，会产生额外的向上或向下角度。
- 将 5 度角适配器插入其中一个槽中，然后重新安装设备。在户外安装时，请确保所有线缆开口朝下。使用 POE 注入器并进行正确接地，本设备在端口盖下方设有专门设计的接地连接器。建议使用屏蔽 Cat5/6 线缆。本设备的 IP 防护等级为 IP54。*警告！本设备的安装和运行位置与您身体之间的距离应至少为 120 厘米。在居住环境中运行本设备可能会引起无线电干扰。*

## 配置 {#configuration}

登录后，您应在 QuickSet 菜单中选择 "Check for updates" 按钮，因为将 RouterOS 软件更新至最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以引导设备进行重新安装，请参见相关章节。

## 配件 {#accessories}

包装中包含以下随附配件：

![](/img/a62040f544ef34ab.webp)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个 10/100 以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。直通线或交叉线均可用于连接到其他网络设备。该以太网端口可接受来自无源 PoE 注入器的 9-30 V DC 电源。
- MiniPCIe 插槽和 SIM 卡槽（不可单独使用），用于配合 3G/4G/LTE 调制解调器使用。

## 复位按钮 {#reset-button}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）；
- 继续按住 5 秒，LED 常亮，此时松开可开启 CAP 模式。设备将开始查找 CAPsMAN 服务器（共 10 秒）；
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）；无论使用上述哪种方式，如果在设备通电之前按下按钮，系统将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 模式按钮 {#mode-button}

模式按钮的动作可通过 RouterOS 软件进行配置，以执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/lhg_lte6_kit](https://mikrotik.com/product/lhg_lte6_kit)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统未经测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场处置。请熟悉您所在地区将设备正确运输到指定处置场的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>包含的 FCCID</th></tr></thead><tbody><tr><td>RBLHGR&R11e-LTE6</td><td>TV7R11ELTE6</td></tr><tr><td>RBLHGR&R11e-LTE-US</td><td>TV7R11ELTE</td></tr></tbody></table>

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装提供合理的保护，防止有害干扰。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在住宅区运行本设备可能会造成有害干扰，此时用户将被要求自费纠正干扰

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，(2) 本设备必须接受任何收到的干扰，包括可能导致非预期操作的干扰。本设备及其天线不得与任何其他天线或发射器位于同一位置或一起运行。**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备的安装和运行位置与辐射体与您身体任何部位之间的距离应至少为 130 厘米。使用 CBRS 频段时，最终主机设备的 CBSD 类别取决于所使用的功率设置和天线增益。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>包含的 FCCID</th></tr></thead><tbody><tr><td>RBLHGR&R11e-LTE6</td><td>7442A-R11ELTE6</td></tr><tr><td>RBLHGR&R11e-LTE-US</td><td>7442A-R11ELTE</td></tr></tbody></table>

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：

-

本设备不得造成干扰；

-

本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。本设备中包含的免许可发射器/接收器符合加拿大创新、科学和经济发展部适用于免许可无线电设备的 CNR。操作须满足以下两个条件：

-

本设备不得产生干扰；

-

本设备必须接受任何无线电干扰，即使该干扰可能导致非预期操作。本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行位置与辐射体与您身体任何部位之间的距离应至少为 130 厘米。本设备符合针对非受控环境规定的 IC 辐射暴露限值。本设备应安装并使用，且辐射体与您身体任何部位之间的距离至少为 130 厘米。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备生产日期的信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），接下来的两位数字表示周数。

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

## 乌克兰国家通信和信息领域监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰运行须按照 NKRZI 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）所规定的程序取得运行许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 类型的无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/product/lhg_lte_kit](https://mikrotik.com/product/lhg_lte_kit)

### WCDMA / LTE / 5G {#wcdma--lte--5g}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>E-GSM-900</th><th>900 MHz / 33 dBm</th></tr></thead><tbody><tr><td>DCS-1800</td><td>1800 MHz / 30 dBm</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dBm ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 和 LTE 发射功率限值。有关更详细的信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设定的最大 WLAN 和 LTE 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备遵守 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 和 LTE 最大发射功率限值。更多信息请参见上文的符合性声明。
