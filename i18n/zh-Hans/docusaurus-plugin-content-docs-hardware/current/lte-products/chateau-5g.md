---
title: "Chateau 5G"
slug: /chateau-5g
source: https://manual.mikrotik.com/hardware/chateau-5g
captured_at: '2026-11-04T09:44:54+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/58927a682e31d536.jpg)

## [Chateau 5G](https://mikrotik.com/product/chateau_5g) (D53G-5HacD2HnD-TC&RG502Q-EA) {#chateau-5g-d53g-5hacd2hnd-tcrg502q-ea}

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关危险，并熟悉防止事故的标准做法。有关完整规格和手册，请参阅 [Chateau 5G 产品页面](https://mikrotik.com/product/chateau_5g)。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适合室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，操作风险由您自行承担！
- 如果设备故障，请断开电源。最快的方法是从电源插座中拔出电源插头。
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和操作时，应与您的身体、职业用户或公众保持不小于 20 厘米的距离。

## 快速开始 {#quickstart}

按照以下快速步骤设置您的设备：

![](/img/cbc5361d4144eab4.webp)

- 将外部天线连接到 SMA 接口（天线随包装提供，请参阅“(link)”）；
- 将 micro SIM 卡插入设备下方的插槽；

![](/img/9619076cdc698366.webp)

- 将计算机连接到其中一个以太网端口；
- 将电源适配器连接到 DC 插孔；
- 设备通电且 PC 已连接到设备后，在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始配置（或者，对于某些型号，请查看贴纸上的用户密码和无线密码）；
- 用户名：a*dmin*，默认没有密码，您将自动登录到 Quick Set 界面；
- 您应选择右侧的“Check for updates”按钮，并将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性；必须插入有效的 SIM 卡；
- 要手动更新设备，请访问 [https://mikrotik.com/download](https://mikrotik.com/download)
- 为此设备选择 ARM 软件包，并将其下载到您的 PC。
- 将下载的软件包上传到 WebFig 的“Files”菜单，然后重启设备。
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新。
- 要个性化您的无线网络，可以在“Network Name”字段中更改 SSID；
- 在屏幕左侧的“Country”字段中选择您的国家/地区，以应用国家/地区法规设置；
- 在“WiFi Password”字段中设置无线网络密码，密码必须至少包含八个字符；
- 在右下方的“Password”字段中设置路由器密码，并在“Confirm Password”字段中重复输入，该密码将用于下次登录；
- 选择“Apply Configuration”以保存更改。

## 使用移动应用连接 {#connecting-with-a-mobile-app}

使用智能手机通过 WiFi 访问路由器。

![](/img/9bcba09a7b6a0d53.webp)

- 插入 SIM 卡并开启设备。
- 用智能手机扫描二维码并选择您首选的操作系统。
- 连接到无线网络。SSID 以 MikroTik 开头，并包含设备 MAC 地址的最后几位数字。
- 打开应用程序。
- 默认情况下，IP 地址和用户名已预先填写。
- 选择 Connect 以通过无线网络建立与设备的连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 高级菜单可用于完整配置所有必要设置。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/448fe884f3fe7820.webp)

- （link）。
- （link）DC 插孔 2.0 mm。
- 五个千兆端口，支持自动交叉/直通线缆校正（Auto MDI/X）。可使用直通或交叉线缆连接其他网络设备。
- USB type-A。
- 用于 Micro SIM 卡的（link）。
- 模式按钮。
- 带天线的型号不提供外部（link）的盖子。
- WPS（link）
- 集成无线模块工作在 2.4 GHz，802.11b/g/n 协议。天线增益 3 (dBi)。
- 集成无线模块工作在 5 GHz，802.11a/n/ac 协议。天线增益 4 (dBi)。

## 安装 {#mounting}

本设备设计用于室内，可放置在桌面上使用。

应使用 Cat5 屏蔽线缆。使用和安装本设备时，请注意最大允许暴露（MPE）安全距离，辐射器与身体之间至少保持 20 cm。

## 供电 {#powering}

设备通过适配器供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）12-28 V DC⎓。最大负载下的功耗可达 17 W，连接附件时为 23 W。

## 配置 {#configuration}

您应经常检查更新，以获取 RouterOS 软件的最新更新，从而确保最佳性能和稳定性。除了本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能的功能：[https://mt.lv/help](https://mt.lv/help)。如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。为恢复目的，可以让设备进入重新安装启动模式，请参阅（link）部分。

## 模式按钮 {#mode-button}

模式按钮位于设备背面右侧。模式按钮的默认配置为暗色模式 - 关闭所有 LED。可以在 RouterOS 中配置该按钮以运行任何用户指定的脚本。

## 同步按钮 {#sync-button}

同步按钮位于设备顶部。如果在无线接口上配置了 WPS Sync 按钮，则可用于连接新客户端。

![](/img/c76f6511aa4e14f0.webp)

- 按住 WPS 按钮 1 – 5 秒，以为无线接口启用 WPS。

## 前面板 LED 状态 {#front-led-status}

![](/img/9ba5b3e5c27a0830.webp)

- 无线网络活动。
- 以太网端口活动。
- 系统 LED 具有用于指示蜂窝调制解调器状态的交替模式。
- 信号强度。

### 系统 LED 交替调制解调器模式指示 {#system-led-alternate-modem-mode-indications}

启用蜂窝调制解调器接口后，系统 LED 将具有交替指示：

红色闪烁 - 未插入 SIM 卡

黄色 - 已建立 3G 模式连接

蓝色 - 已建立 LTE 模式连接

绿色 - 已建立 5G NSA 模式连接

紫色 - 已建立 5G SA 模式连接

闪烁 - 正在建立连接，调制解调器已注册到蜂窝网络，APN 尚未激活

## SIM 插槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡插槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议配合转接器使用。

## 复位按钮 {#reset-button}

复位按钮具有三项功能：

- 在启动期间按住此按钮，直到绿色 LED 开始闪烁，松开按钮以重置 RouterOS 配置（总计 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开以开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（总计 10 秒）。
- 要使用 Netinstall 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种可用的引导程序：常规引导程序和备用引导程序。常规引导程序 - 开启设备，等待 1-2 秒，然后按住 Reset 按钮。等待系统 LED 绿色闪烁，然后变为常亮“On”。当绿色 LED 变为“Off”时，松开 Reset 按钮 - 设备将进入 BOOTP 模式。
- 备用引导程序 – 关闭设备，按住 Reset 按钮，然后开启设备。等待系统 LED 绿色闪烁，然后变为常亮“On”。当绿色 LED 变为“Off”时，松开 Reset 按钮 - 设备将使用备用引导程序进入 BOOTP 模式。无论使用上述哪种选项，如果在设备通电前按下按钮，系统都将加载备用 RouterBOOT 加载程序。这可用于 RouterBOOT 调试和恢复。

执行 Netinstall 时，请确保 ROS 文件和 Netinstall 软件均使用最新的 v7 版本。

## 配件 {#accessories}

包装内包含以下随设备提供的附件：

- ADAPT1_ EU/US 开关电源 24V，1.2A。
- CAB3_ CAT5E UTP 扁平线缆，8P8C，AWG32，1.5m。
- ANT8-9_ 外部 LTE 天线。

## 天线使用 {#antenna-usage}

SMA 接口用于随附的 LTE 天线。

连接或断开外部天线时，设备必须断电，否则设备可能损坏！

外部天线插孔位于设备背面。

- 将两根天线拧到 SMA 插孔上（请按照图示中的说明操作）。

![](/img/b135503a374e2302.webp)

## 拆卸后盖以接触 PCB {#removing-back-cover-to-access-pcb}

如果需要接触 PCB，可以拆下后盖。

- 拆下中心螺丝；

![](/img/3c40f644b6453592.webp)

- 使用小螺丝刀在标记位置撬开后盖板；
- 继续向上撬开；

![](/img/ef5c2817560d190a.webp)

- 最后整个后盖板取下。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未测试。

为避免环境污染，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请熟悉您所在地区将设备正确运输至指定处置场所的程序。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。*

设备制造日期信息位于其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2480-2483.5 МГц (20 дБм)，5150-5250 МГц (23 дБм)，5250-5350 МГц (20 дБм)，5470-5725 МГц (27 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备，必须按照乌克兰国家通信和信息监管委员会（НКРЗІ）2012 年 11 月 1 日第 559 号决定批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, 拉脱维亚, LV1039。

Mikrotīkls SIA 特此声明，型号为 D53G-5HacD2HnD-TC&RG502Q-EA 的无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WLAN / WCDMA / LTE / 5G {#wlan--wcdma--lte--5g}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>WLAN 2.4 Ghz</th><th>2400-2483.5 MHz / 20 dBm</th></tr></thead><tbody><tr><td>WLAN 5Ghz</td><td>5150-5250 MHz / 23 dBm</td><td></td></tr><tr><td>WLAN 5Ghz</td><td>5250-5350 MHz / 20 dBm</td><td></td></tr><tr><td>WLAN 5Ghz</td><td>5470-5725 MHz / 27 dBm</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band III</td><td>1712.4 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band V</td><td>826.4 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1700 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 5</td><td>850 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 28</td><td>700 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 32</td><td>1500 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 34</td><td>2000 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23, 26dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23, 26dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 41</td><td>2500 MHz / 23, 26dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 42</td><td>3500 MHz / 23, 26dBm ± 3 dB</td><td></td></tr><tr><td>LTE Band 43</td><td>3700 MHz / 23dBm ± 3 dB</td><td></td></tr><tr><td>5G NR Band n1</td><td>2100 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n3</td><td>1800 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n7</td><td>2600 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n8</td><td>900 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n20</td><td>800 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n28</td><td>700 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n38</td><td>2600 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n40</td><td>2300 MHz / 23dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n41</td><td>2500 MHz / 26dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n77</td><td>3700 MHz / 26dBm ± 2 dB</td><td></td></tr><tr><td>5G NR Band n78</td><td>3500 MHz / 26dBm ± 2 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。有关更多详细信息，请参阅上方的符合性声明。

![](/img/0561b3ba8c95a35c.webp)

在 5150 至 5350 MHz 频率范围内工作时，本设备的 WLAN 功能仅限于室内使用。
