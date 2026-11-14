---
title: "Chateau LTE12"
slug: /chateau-lte12
source: https://manual.mikrotik.com/hardware/chateau-lte12
captured_at: '2026-11-04T09:45:19+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/917e5b584a337097.jpg)

## [Chateau LTE12](https://mikrotik.com/product/chateau_lte12) (RBD53G-5HacD2HnD-TC&EG12-EA) {#chateau-lte12-rbd53g-5hacd2hnd-tceg12-ea}

Chateau 是一款家用路由器，需配合蜂窝网络运营商的 SIM 卡使用。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家电气规范。
- 本产品适合室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因设备使用不当而不会发生事故或损坏。请小心使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

按照以下快速步骤设置您的设备：

![](/img/cbc5361d4144eab4.webp)

- 将计算机连接到其中一个以太网端口；
- 可选——将外部天线连接到 SMA 连接器（包装中不提供天线，有关 Micro SIM 卡，请参见 "(link)。
- 模式按钮。
- 外部 (link) 盖板。
- WPS (link)
- 集成无线模块，工作于 2.4 GHz，802.11b/g/n 协议。
- 集成无线模块，工作于 5 GHz，802.11a/n/ac 协议。

## 安装 {#mounting}

该设备设计用于室内，可放置在桌面上使用。

应使用 CAT5 屏蔽电缆。使用和安装此设备时，请注意最大允许暴露量（MPE）安全距离，辐射体与身体之间至少保持 20 cm。

## 供电 {#powering}

设备通过适配器供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）12-28 V DC⎓。最大负载下的功耗可达 17 W，带附件时为 23 W。

## 配置 {#configuration}

可以使用 Web 浏览器通过 WebFig、WinBox 工具 [https://mt.lv/winbox](https://mt.lv/winbox) 或 (link) 进行配置。提供多种方法以确保可访问性。

- 要访问 WebFig，请在浏览器中打开 [https://192.168.88.1](https://192.168.88.1)。
- 对于 WinBox，请下载该工具，转到 Neighbors 选项卡，然后选择 MAC 地址。默认用户名是 "admin"，**在设备贴纸上查找密码**。您应经常检查更新，以确保 RouterOS 软件保持最新，从而获得最佳性能和稳定性。在 WinBox 或 WebFig 中选择“Check for updates”按钮以更新到最新版本。

必须插入有效的 SIM 卡或设置 eSIM，并且具有活动的 Internet 连接，更新才能正常工作。

本文档所述内容之外，RouterOS 还提供广泛的配置选项。我们建议访问 [https://mt.lv/help](https://mt.lv/help) 了解这些功能。

出于恢复目的，可以启动设备以重新安装，参见 部分。

## 模式按钮 {#mode-button}

模式按钮位于设备背面右侧（见 ""）。模式按钮的默认配置是暗色模式——关闭所有 LED。该按钮可在 RouterOS 中配置为运行任何用户指定的脚本。

## 同步按钮 {#sync-button}

同步按钮位于设备顶部。WPS 同步按钮如果在无线接口上配置，可用于连接新客户端。

![](/img/c76f6511aa4e14f0.webp)

- 按住 WPS 按钮 1 – 5 秒，以启用无线接口的 WPS。

## 前面板 LED 状态 {#front-led-status}

![](/img/9ba5b3e5c27a0830.webp)

- 无线网络活动。
- 以太网端口活动。
- 系统 LED，具有用于指示蜂窝调制解调器状态的替代模式。
- 调制解调器信号强度指示器。

### 系统 LED 替代调制解调器模式指示 {#system-led-alternate-modem-mode-indications}

红色闪烁：未插入 SIM 卡

黄色：3G

蓝色：LTE

闪烁：正在建立连接，调制解调器已注册到蜂窝网络，APN 尚未激活

当 LTE 未连接到网络时，系统 LED 将红色闪烁，表示 LTE 连接存在一些问题。如果 LTE 接口被有意禁用（未使用），系统 LED 将亮蓝色。

## SIM 卡槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议与转接器一起使用。

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 在启动期间按住此按钮，直到绿色 LED 开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开以开启 CAP 模式。设备现在将寻找 CAPsMAN 服务器（共 10 秒）。
- 要使用 Netinstall 实用程序重新安装 RouterOS，请使设备进入 BOOTP 模式。可用的引导程序有两种：常规引导程序和备份引导程序。常规引导程序——打开设备电源，等待 1-2 秒，然后按住复位按钮。等待系统 LED 呈绿色闪烁，然后变为常亮“On”。当绿色 LED 变为“Off”时，松开复位按钮——设备将进入 BOOTP 模式。
- 备份引导程序——关闭设备电源，按住复位按钮，然后打开电源。等待系统 LED 呈绿色闪烁，然后变为常亮“On”。当绿色 LED 变为“Off”时，松开复位按钮——设备将使用备份引导程序进入 BOOTP 模式。无论使用上述哪种选项，如果在给设备供电之前按下按钮，系统将加载备份 RouterBOOT 加载程序。适用于 RouterBOOT 调试和恢复。

Netinstall 执行 Netinstall 时，请确保 ROS 文件和 Netinstall 软件均使用最新的 v7 版本。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

- 欧盟/美国开关电源 24 V ⎓，1.2 A，28.8 W，86.8 %，VI，线缆：150 cm。
- CAT5E UTP 扁平线缆，8P8C，AWG32，1.5 m，白色。

## LTE 天线使用 {#lte-antenna-usage}

SMA 连接器用于 LTE 天线。

设备背面门后有两个外部天线连接器。

- 向上拉开门。
- 将 LTE 天线拧到左侧的 SMA 连接器上。所用天线连接器或任何其他适配器的最大直径为 13 mm。

![](/img/b70ac6f60339b714.webp)

使用一根天线时，连接到左侧的 SMA 连接器（ANT1）。仅当使用两根天线时，才可以连接到右侧的 SMA 连接器（ANT4）。

![](/img/d3359d36ecb577c0.webp)

在设备关闭时连接和断开天线！设备上的 SMA 连接器为母头。

您应使用我们的天线 [https://mikrotik.com/product/mant_lte_5o](https://mikrotik.com/product/mant_lte_5o)

## 拆下前盖以接触 PCB {#removing-front-cover-to-access-pcb}

如果需要接触 PCB，可以拆下前盖。

- 拆下中心螺丝；

![](/img/3c40f644b6453592.webp)

- 使用小螺丝刀在标记位置撬开盖子；
- 继续向上撬开；

![](/img/ef5c2817560d190a.webp)

- 最后取下整个盖子。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备正确运输至指定处置场所的程序。

## UKCA 标识 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息在其标签上的序列号末尾以斜杠分隔表示。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

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

## 乌克兰国家通信和信息领域国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2480-2483.5 МГц（20 дБм），5150-5250 МГц（23 дБм），5250-5350 МГц（20 дБм），5470-5725 МГц（27 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序取得使用许可。

### CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i, 里加, 拉脱维亚, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBD53G-5HacD2HnD-TC&EG12-EA 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

#### WLAN / WCDMA / LTE {#wlan--wcdma--lte}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th></th></tr></thead><tbody><tr><td>WLAN 2.4 Ghz</td><td>2400-2483.5 MHz / 20 dBm</td></tr><tr><td>WLAN 5Ghz</td><td>5150-5250 MHz / 23 dBm</td></tr><tr><td>WLAN 5Ghz</td><td>5250-5350 MHz / 20 dBm</td></tr><tr><td>WLAN 5Ghz</td><td>5470-5725 MHz / 27 dBm</td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 24dB ± 2.7 dB</td></tr><tr><td>WCDMA Band III</td><td>1712.4 MHz / 24dB ± 2.7 dB</td></tr><tr><td>WCDMA Band V</td><td>826.4 MHz / 24dB ± 2.7 dB</td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 24dB ± 2.7 dB</td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dB ± 2.7 dB</td></tr><tr><td>LTE Band 3</td><td>1700 MHz / 23dB ± 2.7 dB</td></tr><tr><td>LTE Band 5</td><td>850 MHz / 23dB ± 2.7 dB</td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dB ± 2.7 dB</td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dB ± 2.7 dB</td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dB ± 2.7 dB</td></tr><tr><td>LTE Band 28</td><td>700 MHz / 23dB ± 2.7 dB</td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dB ± 2.7 dB</td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dB ± 2.7 dB</td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限制。有关更多详细信息，请参阅上文的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限制。有关更多详细信息，请参阅上文的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限制。有关更多详细信息，请参阅上文的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限制。有关更多详细信息，请参阅上文的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限制。有关更多详细信息，请参阅上文的符合性声明。 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 和 LTE 最大发射功率限制。有关更多详细信息，请参阅上文的符合性声明。

![](/img/0561b3ba8c95a35c.webp)

本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限于室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限于室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限于室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限于室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限于室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限于室内使用。
