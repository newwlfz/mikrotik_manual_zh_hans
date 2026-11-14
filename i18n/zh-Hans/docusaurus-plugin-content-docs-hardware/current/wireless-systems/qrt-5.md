---
title: "QRT 5"
slug: /qrt-5
source: https://manual.mikrotik.com/hardware/qrt-5
captured_at: '2026-11-04T09:58:41+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

5GHz AP/Backbone/CPE，双链，千兆以太网。完整规格和手册请参见 [QRT 5 产品页面](https://mikrotik.com/product/RB911G-5HPnD-QRT)。

型号：RB911G-5HPnD-QRT

![](/img/d1903c5423db6850.jpg)

## [QRT 5](https://mikrotik.com/product/RB911G-5HPnD-QRT) (RB911G-5HPnD-QRT) {#qrt-5-rb911g-5hpnd-qrt}

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 在任何墙面安装接入点的所有安装方法均须获得当地主管部门认可。
- 设备安装必须符合当地和国家电气规范。
- 本产品 intended for outdoor pole mount. 请仔细阅读安装说明后再开始安装。使用不正确的硬件和配置或未遵循正确程序，可能导致人员危险和系统损坏。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座拔下电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 本设备为 A 类设备。在家庭环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和运行时，应与您的身体、职业用户或公众保持不少于 20 厘米的距离。

## 快速开始 {#quickstart}

- 使用以太网线将设备连接到随附 PoE 注入器的数据+电源端；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 使用 Web 浏览器通过 **WebFig** 或 **WinBox** 工具配置您的设备，地址为 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 即可访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，并单击 MAC 地址。用户名为 "**admin**"，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 要手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，并重启设备；
- 将您的 RouterOS 软件更新到最新版本可确保最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。
- 将本机安装到您所需的位置，请参见（链接）

## 扩展插槽和端口 {#extension-slots-and-ports}

千兆以太网端口，以太网端口支持被动 PoE。

- 5 GHz 无线，支持的协议 802.11a/n，天线增益 24 (dBi)。

## 打开卡扣 {#opening-latch}

要接触以太网端口和复位按钮，请打开卡扣：

![](/img/1cc7a712a6a341f7.webp)

- 将卡扣向下从设备中拉出。
- 抬起卡扣，但不要将其完全拆下。

![](/img/bfaed7cbeee8d4a5.webp)

## 前面板状态 LED 行为 {#front-status-led-behavior}

RouterOS 允许按用户意愿配置每个 LED 的活动。可以将 LED 配置为显示无线信号强度、在接口流量活动时闪烁以及许多其他选项。更多信息请访问 [LEDs](/docs/hardware/leds) 手册页。本设备的默认出厂配置：

![](/img/3b568ebffbd94538.webp)

- 常亮蓝色 – 设备已通电。
- 常亮绿色 – 已连接以太网端口。
- 常亮绿色 – 用户自定义 LED。
- 常亮绿色 – 五个绿色 LED 组成的指示灯组，显示信号强度。

## 安装 {#mounting}

本设备设计用于户外，安装在桅杆上，所有所需线缆通过本机卡扣接入。

*本设备的安装和配置应由合格人员完成。*

安装在桅杆上时，请确保线缆引入口朝下。本设备的 IP 防护等级为 IP54。我们建议使用 Cat5/6 屏蔽线缆。警告！本设备安装和运行时，设备与您的身体之间应保持至少 30 厘米的距离。在住宅环境中操作本设备可能造成无线电干扰。QRT 包装箱包含若干需要组装的部件。请按以下步骤操作：

- 使用随附的四颗螺钉（使用 PH1 螺丝刀）将两个支架 (A) 安装到旋转调节器 (B) 上。

![](/img/f2a401efc69d5463.webp)

- 将两个 U 型螺栓 (C) 套在桅杆或立柱上，并将它们穿过旋转调节器 (D) 上的孔。然后，如右图所示，每个 U 型螺栓各用一个平垫圈、一个弹簧垫圈和一个螺母拧紧。所有螺母都需要使用 10 号（3/8 in）扳手拧紧。立柱的最大直径可达 70 mm。

![](/img/566b4a72f051a36b.webp)

- 使用安装支架 (E)，将其放到天线背面。对每个内置螺栓，按此顺序使用一个橡胶圈、一个垫圈和一个螺母进行安装。

![](/img/2b7396442b92f286.webp)

- 将旋转调节器安装到安装支架上。在位置 (F) 使用长螺栓。将一个平垫圈和一个弹簧垫圈装到较短的螺钉上，然后将它们放入位置 (G)。不要拧得太紧，因为您现在需要调节天线。

![](/img/a6a3b8817862ac1b.webp)

- 根据软件中的无线信号调整好天线水平和角度后，拧紧所有螺母。记录角度度数以供日后参考。风载荷 16 kg @ 40 m/s，9 kg @ 30 m/s；

## 接地 {#grounding}

安装基础设施（塔和桅杆）以及路由器本身必须正确接地。本设备在本机背面包含一个接地线连接螺钉。将接地线连接到接地螺钉，然后将接地线的另一端连接到已接地的桅杆，请参见图片：

![](/img/f54eca22e5502899.webp)

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（总计 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（总计 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总计 15 秒）。无论使用上述哪种选项，如果在设备通电之前按下按钮，系统将加载备份 RouterBOOT 加载器。这可用于 RouterBOOT 调试和恢复。

## 配件 {#accessories}

包装内包含随设备附带的附件：

- 安装元件：QRT U 型螺栓，钢 - 镀锌，直径 6 mm，U 型桅杆夹，天线安装座。
- EU/US 开关电源 24 V，0.8 A，19.2 W，DC ⎓，85.3 %，VI，线缆：150 cm Hor CMC。
- 用于 QRT 的 K-QRT_Fastening 紧固套件。
- ZCPOEC006-R2_Gigabit POE injector cable，带屏蔽连接器。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource。其他操作系统未经测试。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/RB911G-5HPnD-QRT](https://mikrotik.com/product/RB911G-5HPnD-QRT)

## MikroTik 移动应用 {#mikrotik-mobile-app}

![](/img/b0984aa3ad3c6d58.webp)

![](/img/25f50553ffd86eaf.webp)

![](/img/8d294e5cd375c591.webp)

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

为避免环境污染，请将本设备与生活垃圾分开，并以安全方式处置，例如送至指定废物处置场所。请了解将设备妥善运输至您所在地区指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装环境提供合理的有害干扰防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区域操作本设备很可能造成有害干扰，在这种情况下，用户将被要求自费纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户无权操作本设备。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

注意：本机已使用外围设备的屏蔽线缆进行测试。必须使用屏蔽线缆与本机配合，以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

在 5150–5250 MHz 频段运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射器功率</th></tr></thead><tbody><tr><td>5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备生产日期信息标在其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息领域监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5470-5725 МГц (27 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用设备，必须按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RB911G-5HPnD-QRT 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率 (EIRP)**</th><th>**限制**</th></tr></thead><tbody><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定中的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的最大 WLAN 发射功率限值。更多详细信息请参见上文的符合性声明。
