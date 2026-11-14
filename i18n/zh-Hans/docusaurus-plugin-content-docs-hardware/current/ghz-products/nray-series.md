---
title: "nRAY 系列"
slug: /nray-series
source: https://manual.mikrotik.com/hardware/nray-series
captured_at: '2026-11-04T09:58:06+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可作为 <a href="/assets/files/nray-series-8b1c8f47fdd8ce1e1b232581c0108acf.pdf" target="_blank" rel="noopener">PDF 文件</a> 下载。

## [Wireless Wire nRAY](https://mikrotik.com/product/wireless_wire_nray) (nRAYG-60adpair) {#wireless-wire-nray-nrayg-60adpair}

![](/img/13fadc3ec23f304e.jpg)

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关危险，并熟悉防止事故的标准做法。完整规格和宣传册请参见 [nRAY 系列产品页面](https://mikrotik.com/product/wireless_wire_nray)。
- 本产品的最终处置应按照所有国家法律和法规处理。
- 在任何墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备安装必须符合当地和国家电气规范。
- 本产品设计用于室外立杆安装，但也可在室内安装。开始安装前，请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确的操作程序，可能导致人员危险和系统损坏。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证不会因不当使用设备而发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择 (DFS) 要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能会造成无线电干扰，在这种情况下，用户可能需要采取适当措施。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 拧下盖子以接触以太网端口；
- 将以太网电缆穿过开口；
- 插入以太网端口并顺时针拧紧，以确保防水；
- 将 PoE 注入器连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 下载 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)，或使用 Web 浏览器；
- 默认 IP：192.168.88.2 和 192.168.88.3，用户名：**admin**，密码请见设备标签；
- 默认情况下，设备配置为 W60G Bridge；
- 连接后，配置设备使其具有可用的 Internet 连接 [https://mt.lv/configuration](https://mt.lv/configuration)，或继续下一步手动升级软件；
- 将 RouterOS 软件升级到最新版本 [https://mt.lv/upgrade](https://mt.lv/upgrade)；
- 再次连接并选择您的区域，可在 Wireless 菜单的 W60G 选项卡中完成；
- 双击 W60G 接口，转到 Wireless 选项卡并选择您的区域；

## 供电 {#powering}

设备支持 802.3af/at PoE 供电，12 – 57 V DC ⎓。最大负载下的功耗可达 6 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网电缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络 (LAN) 的以太网电缆连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 安装 {#mounting}

本设备设计用于室外并安装在立杆上。安装时，请确保排水孔朝下。本设备的 IP 防护等级为 IP54。我们建议使用 Cat6 屏蔽电缆。警告！本设备安装和操作时，设备与人体之间应保持至少 60 cm 的距离。本设备在住宅环境中使用可能会造成无线电干扰。*本设备的安装和配置应由具备资质的人员完成。*

- 使用安装支架组装设备。

![](/img/4d07761fb35c6ef7.webp)

- 使用 M5 螺钉固定安装支架，并用 HEX3 工具拧紧——该工具不随包装提供。
- 插入 U 型螺栓。按照图片所示的顺序进行。

![](/img/ad91bad55da92d23.webp)

- 将组件固定到立杆上。

![](/img/11b701c0c3d9bdda.webp)

- 安装安装支架，并使用两个 13 mm 螺母固定设备。

![](/img/64d3710a74ea5103.webp)

## 对准工具使用 {#aim-tool-usage}

![](/img/733707fa84b1658d.webp)

设备背面带有 LED 箭头。使用这些箭头可实现精确对准。

![](/img/b9d380f70a9cb9a7.webp)

箭头会亮起并指示应转动设备的方向。目标是达到 0.4 - 0.8 度范围，此时信号最强。

## 接地 {#grounding}

安装基础设施（塔架和桅杆）必须正确接地。请将所有松散的以太网电缆和天线电缆固定在距设备约 30cm 的立杆或桅杆上，以免电缆重量拉扯端口和连接器。

## 配置 {#configuration}

我们建议在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。请确保已选择设备将使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。请向当地培训师寻求更多帮助，或自己成为培训师。[https://mikrotik.com/training/about](https://mikrotik.com/training/about) 为恢复目的，可以启动设备进行重新安装，请参阅 节。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（总计 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开以开启 CAP 模式。设备现在将寻找 CAPsMAN 服务器（总计 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（总计 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体出厂安装版本列在 /system resource 中。其他操作系统尚未经过测试。

## 说明 {#notes}

本设备符合 ETSI 法规规定的最大 TX 功率限制。60 GHz 频段的工作模式：58.32 GHz、60.48 GHz、62.64 GHz、64.80 GHz。本设备已获认证，可用于点对多点应用的室外使用。在以下国家/地区，本设备不能用于固定点对点应用：

![](/img/01438e2d9209ce7d.webp)

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID: TV7RAY60

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装提供合理保护，防止有害干扰。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区域操作本设备很可能造成有害干扰，在这种情况下，用户需要自费纠正干扰。

**FCC 警告：** 未经合规负责方明确批准的任何更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或协同操作。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的 RF 辐射暴露限值。本设备安装和操作时，辐射体与身体任何部位之间应保持至少 60 cm 的距离。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

IC: 7442A-RAY60

本设备包含符合加拿大创新、科学和经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：

-

本设备不得造成干扰；

-

本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。本设备中包含的免许可发射器/接收器符合加拿大创新、科学和经济发展部适用于免许可无线电设备的 CNR。允许在以下两个条件下运行：

-

本设备不得产生干扰；

-

本设备必须接受其受到的任何无线电干扰，即使该干扰存在。**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和操作时，辐射体与身体任何部位之间应保持至少 60 cm 的距离。本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和操作时，辐射体与身体任何部位之间应保持至少 60 cm 的距离。

除 ISED RSS-210 附录 J.1 中列出的条件外，本设备不得在飞机上操作。除 ISED RSS-210 附录 J.1 中列出的条件外，本设备不得在飞机上使用。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备制造日期信息位于其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位表示周数。

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

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备，必须按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议批准并在乌克兰司法部于 2013 年 1 月 3 日以第 57/22589 号登记的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 nRAYG-60adpair 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WiGig {#wigig}

<table><thead><tr><th>工作信道 / 最大输出功率</th><th>58.32 GHz / &lt;40 dBm</th></tr></thead><tbody><tr><td>60.48 GHz / &lt;40 dBm</td><td></td></tr><tr><td>62.64 GHz / &lt;40 dBm</td><td></td></tr></tbody></table>
