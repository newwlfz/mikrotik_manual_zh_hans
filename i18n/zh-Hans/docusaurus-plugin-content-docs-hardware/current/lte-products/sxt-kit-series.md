---
title: "SXT kit 系列"
slug: /sxt-kit-series
source: https://manual.mikrotik.com/hardware/sxt-kit-series
captured_at: '2026-11-04T10:04:42+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/7b4d436fcd14582c.webp)

:::info 本文涵盖

- **SXT 4G kit**
- **SXT LTE6 kit**
- **SXT LTE kit-US**
- **SXT LTE kit**
- **SXT LTE6 kit**（2023）

:::

SXT kit 作为完整套件提供，包含内置调制解调器，并连接到内置天线。它具有两个支持 MDI-X 自动检测的 10/100 以太网接口。有两个 micro SIM 卡槽可用，以便在蜂窝网络运营商之间切换。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家和地方法律法规。
- 在任意墙面安装接入点的所有安装方法均需获得当地管辖部门的认可。
- 设备安装必须符合当地和国家电气规范。
- 本产品设计为安装在户外立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确程序，可能导致人员危险和系统损坏。
- 仅使用制造商批准的电源和配件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和操作时，应与您的身体、职业用户或公众保持至少 45 厘米的距离。

## 首次使用 {#first-use}

- 打开底部盖板。
- IMEI 号码可在外壳和包装标签上找到。
- 将 SIM 卡插入 micro-SIM 卡槽（默认使用 SIM A 卡槽）。如果使用另一个卡槽，可以在 RouterOS 中通过 CLI 命令更改配置：/system routerboard modem set sim-slot=down。更改 SIM 卡槽后，LTE 调制解调器将重新启动。它可能需要一些时间（取决于调制解调器和板卡，大约 30 秒）才能完全初始化，因此请务必测试调制解调器。有关配置详细信息，请参阅 [双 SIM 卡应用](/docs/mobile-networking/dual-sim-application)。
- 将设备连接到电源（参见“”）。
- 通过 Web 浏览器使用 **WebFig** 或 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）配置设备。打开 [https://192.168.188.1](https://192.168.188.1) 可访问 **WebFig**；对于 **WinBox**，请下载该工具，导航到 **Neighbors** 选项卡，然后选择 MAC 地址。用户名为“**admin**”，无密码（或者对于某些型号，请查看贴纸上的用户和无线密码）；
- 选择“Check for updates”按钮，并将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡并具有活动的 Internet 连接；
- 如需手动更新设备，请访问产品页面 [https://mikrotik.com/products](https://mikrotik.com/products) 查找您的产品。所需软件包可在“Support&Downloads”菜单下获取；
- 将下载的软件包上传到 WebFig 或 WinBox 的“Files”菜单，并重启设备；
- 通过将 RouterOS 软件升级到最新版本，可以确保最佳性能、稳定性和安全更新；
- 设置路由器密码。所有 7.1.4 之前的 ROS 版本默认 IP 都设置为 192.168.88.1，升级到 7.1.4 后默认 IP 设置为 192.168.188.1。

## 安装 {#mounting}

SXT 设计为安装在立杆上，包装内包含安装支架和钢制卡箍。

- 将卡扣朝前，把安装支架滑入外壳底部的导轨，直到卡扣咔嗒一声到位。
- 将卡箍穿过支架上的开口。
- 将设备固定到立杆上，使以太网端口朝下。

![](/img/cb77d7c81af721ab.webp)

- 对齐完成后，使用 PH2 螺丝刀拧紧卡环。
- 使用扎带将以太网线缆固定到立杆上，距离设备小于一米，以避免线缆从端口被拉出。
- 检查安装角度和位置。使用两个以太网端口时，请务必在塑料门板上切出更宽的线缆开口。您可以使用钳子撕掉保护线缆开口的塑料件。关闭塑料门时，请务必施加压力，直到其“咔嗒”一声到位。*本设备的安装和配置应由合格人员完成。*

安装在墙上时，请确保线缆引出方向朝下。本设备的 IPX 防护等级为 IP54。应使用 Cat6 屏蔽线缆。警告！本设备安装和操作时，设备与身体之间应保持至少 20 厘米的距离。

## 接地 {#grounding}

安装基础设施（塔架和桅杆）以及路由器本身必须正确接地。设备在外壳门后包含一个接地线连接螺丝。将接地线连接到接地螺丝，然后将接地线的另一端连接到已接地的桅杆。这可以显著降低 ESD 和雷击损坏的风险。

## 供电 {#powering}

设备通过以太网端口供电：

- 12 - 57 V DC ⎓ 无源供电以及 802.3af/at PoE 供电至 ETH1 端口。最大负载下的功耗可达 5 W，带附件时为 22 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 使用以太网线缆将设备连接到 PoE 适配器的 PoE 输出（PoE+DATA 或 Data+Power）端口。
- 将 PoE 适配器的 RJ45 连接器插入本地路由器、交换机或计算机的以太网端口。
- 将 PSU 直流插头连接到 PoE 适配器，然后将 PSU 连接到交流电源。

## 配置 {#configuration}

登录后，您应选择 QuickSet 菜单中的“Check for updates”按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将使用的国家/地区，以符合当地法规。RouterOS 除了本文档所述内容外还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法进行 IP 连接，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以将设备启动以进行重新安装，请参阅相关章节。

默认配置为 CPE RouterMode：

*LTE 接口连接到运营商网络（WAN 端口）；

*WAN 端口受防火墙保护，并启用了 DHCP 客户端。

LAN 配置：

IP 地址 192.168.88.1/24 设置在网桥（LAN 端口）上

所有 7.1.4 之前的 ROS 版本默认 IP 都设置为 192.168.88.1，升级到 7.1.4 后默认 IP 设置为 192.168.188.1。

DHCP 服务器已启用；

DNS：已启用。

WAN（网关）配置：

gateway：lte1；

ip4 firewall：已启用；

NAT：已启用。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 两个以太网端口支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通或交叉线缆连接到其他网络设备。
- ETH2 端口能够通过无源 PoE 为另一个 RouterBOARD 设备供电（最高 57 V）。使用低于 30 V 为本设备供电时，最大输出电流为 600 mA；使用高于 30 V 时，最大输出电流为 400 mA。
- MiniPSIe 插槽。
- 两个 micro SIM 卡槽。
- 集成 LTE 模块，支持的频段取决于地区（请查看宣传册）。

## SIM 卡槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议与转接器一起使用。

## 复位按钮 {#reset-button}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（总计 5 秒）；
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（总计 10 秒）；
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总计 15 秒）；无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复很有用。

## 模式按钮 {#mode-button}

可以从 RouterOS 软件配置模式按钮的动作，以执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 配件 {#accessories}

包装内包含以下随设备提供的配件：

- ADAPT1_EU/US 开关电源 24 V、0.8 A、19.2 W、85.3%、VI、线缆：150 cm Hor CMC；
- CLAMP1_Hose Clapmp SUS304（十字型；夹持直径范围 35-70 mm）；
- POE1_POE 注入器，带屏蔽连接器；
- BRAC1_SXT5D 安装支架；

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未测试。

**要排查任何问题，请访问提供的页面，并导航到专门的故障排除部分以获取详细指导和解决方案：故障排除文章**

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>包含 FCCID</th></tr></thead><tbody><tr><td>RBSXTR&R11e-4G</td><td>TV7R11E4G</td></tr><tr><td>RBSXTR&R11e-LTE6</td><td>TV7R11ELTE6</td></tr><tr><td>RBSXTR&R11e-LTE-US</td><td>TV7R11ELTE</td></tr><tr><td>RBSXTR&R11e-LTE</td><td>-</td></tr></tbody></table>

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限值。这些限值旨在为商业安装中的有害干扰提供合理保护。

本设备产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备可能会造成有害干扰，此时用户将被要求自行承担费用纠正干扰。

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受收到的任何干扰，包括可能导致非预期操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或一起操作。**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备安装和操作时，辐射器与身体任何部位之间应保持至少 45 厘米的距离。使用 CBRS 频段时，最终主机设备的 CBSD 类别将取决于所使用的功率设置和天线增益。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>包含 IC</th></tr></thead><tbody><tr><td>RBSXTR&R11e-4G</td><td>7442A-R11E4G</td></tr><tr><td>RBSXTR&R11e-LTE6</td><td>7442A-R11ELTE6</td></tr><tr><td>RBSXTR&R11e-LTE-US</td><td>7442A-R11ELTE</td></tr><tr><td>RBSXTR&R11e-LTE</td><td>-</td></tr></tbody></table>

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 标准的免许可发射器/接收器。操作须满足以下两个条件：

-

本设备不得造成干扰；

-

本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。本设备内含的免许可发射器/接收器符合加拿大创新、科学和经济发展部适用于免许可无线电设备的 CNR 标准。允许在以下两个条件下运行：

-

本设备不得产生干扰；

-

本设备必须接受所受到的任何无线电干扰，即使该干扰可能导致非预期操作。此 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和操作时，辐射器与身体任何部位之间应保持至少 45 厘米的距离。本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和操作时，辐射器与身体任何部位之间应保持至少 45 厘米的距离。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备制造日期的信息显示在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

如需保修服务的详细信息，请联系卖家。

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其非预期运行的干扰。制造商：MikroTikls SIA, Unijas iela 2, Riga, LV-1039, 拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA, Unijas iela 2, 里加, 拉脱维亚, LV1039.

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需要按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定（该决定于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Unijas iela 2, Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### GSM / WCDMA / LTE / {#gsm--wcdma--lte-}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>E-GSM-900</th><th>900 MHz / 33 dBm</th></tr></thead><tbody><tr><td>DCS-1800</td><td>1800 MHz 30 dBm</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 24 dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1（SXT 4G kit 除外）</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8（SXT 4G kit 除外）</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 31（仅 SXT 4G kit）</td><td>450 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38（SXT 4G kit 除外）</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 42（仅 SXT 4G kit）</td><td>3500 MHz / 23 dBm ± 3 dB</td><td></td></tr><tr><td>LTE Band 43（仅 SXT 4G kit）</td><td>3700 MHz / 23 dBm ± 3 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大 LTE 发射功率限制。有关更多详细信息，请参阅上文的符合性声明。

-

-
