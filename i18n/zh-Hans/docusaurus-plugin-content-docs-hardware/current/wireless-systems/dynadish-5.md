---
title: "DynaDish 5"
slug: /dynadish-5
source: https://manual.mikrotik.com/hardware/dynadish-5
captured_at: '2026-11-04T09:48:10+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### DynaDish 5 (RBDynaDishG-5HacDr3) {#dynadish-5-rbdynadishg-5hacdr3}

![](/img/b28805dc6f440e18.webp)

## [DynaDish 5](https://mikrotik.com/product/RBDynaDishG-5HacDr3) (RBDynaDishG-5HacD) {#dynadish-5-rbdynadishg-5hacd}

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关危险，并熟悉防止事故的标准做法。有关完整规格和宣传册，请参阅 [DynaDish 5 产品页面](https://mikrotik.com/product/RBDynaDishG-5HacDr3)。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备安装必须符合当地和国家电气规范。
- 本产品设计用于户外安装在杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确程序，可能对人员造成危险并损坏系统。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和操作时，应与您的身体、职业用户或公众保持不少于 20 厘米的距离。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 使用以太网电缆将设备连接到随附 PoE 注入器的 data+power 端；
- 将 PoE 注入器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 通过 Web 浏览器使用 **WebFig** 或 **WinBox** 工具（[https://mt.lv/WinBox](https://mt.lv/WinBox)）配置设备；提供多种配置方法以确保可访问性；
- 打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后单击 MAC 地址。用户名为 "**admin**"，密码为空（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，并重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## 供电 {#powering}

设备通过以太网端口接受供电 - PoE 802.3af/at 24-57 V DC ⎓。最大功耗 9 W。

## 配置 {#configuration}

我们建议单击 "Check for updates" 按钮，并将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。RouterOS 除本文档所述内容外还包含许多配置选项。我们建议访问 RouterOS 文档页面以熟悉这些可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问均被阻止）。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个 10/100/1000 千兆以太网端口，支持自动交叉/直通电缆纠正（Auto MDI/X），因此您可以使用直通或交叉电缆连接到其他网络设备。
- 一个集成无线 5 GHz 802.11a/n/ac，2x2 MIMO，带内置抛物面天线，最大增益 24 dBi。

## 安装 {#mounting}

本设备设计用于户外并安装在杆上。

安装时，请确保电缆馈线朝下。本设备的 IP 等级为 IP54。我们建议使用 Cat6 屏蔽电缆。本设备的安装和配置应由合格人员完成。

- 用四颗螺钉将随附的安装支架固定到设备上；

![](/img/a6f1b404988a0199.webp)

- 固定到杆或桅杆上；
- 用两颗螺钉固定位置；
- 根据需要调整对齐，并拧紧第 3 步中的螺钉。

![](/img/8a21ada73667b37c.webp)

- 注意，以太网电缆的位置必须朝下。请将所有松动的以太网电缆和天线电缆固定在距设备约 30cm 的杆或桅杆上，以免电缆重量拉扯端口和连接器。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有以下功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（总计 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（总计 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总计 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 随附部件 {#included-parts}

![](/img/c2c7336d67d4a0c0.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 `/system resource` 中。其他操作系统尚未测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请熟悉您所在地区将设备正确运输至指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID：TV7DYNADISHGAC

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能造成有害干扰，此时用户需要自费纠正干扰。

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能使用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何收到的干扰，包括可能导致意外操作的干扰。

注意：本机在周边设备上使用屏蔽电缆进行了测试。必须使用屏蔽电缆搭配本机以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC：7442A-DYNADISHGAC

本设备包含符合加拿大创新、科学与经济发展部免许可证 RSS 的免许可证发射器/接收器。操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

设备制造日期信息标示在其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后面两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

集成无线模块，工作于 5 GHz，协议 802.11a/n/ac，配有外部定向 PCB 天线，最大增益 24 dBi。

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息领域国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5150-5250 МГц（23 дБм），5250-5350 МГц（20 дБм），5470-5725 МГц（27 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

要在乌克兰使用，必须按照乌克兰国家通信和信息领域国家监管委员会 2012 年 11 月 1 日第 559 号决议规定的程序获得使用许可，该决议于 2013 年 1 月 3 日在乌克兰司法部登记，编号为 57/22589。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, 拉脱维亚, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBDynaDishG-5HacDr3 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 TX 功率限制。有关更多详细信息，请参阅上方的符合性声明。

![](/img/0561b3ba8c95a35c.webp)

在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限室内使用。
