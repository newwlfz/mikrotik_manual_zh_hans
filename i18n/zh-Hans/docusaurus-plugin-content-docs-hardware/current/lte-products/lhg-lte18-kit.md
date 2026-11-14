---
title: "LHG LTE18 kit"
slug: /lhg-lte18-kit
source: https://manual.mikrotik.com/hardware/lhg-lte18-kit
captured_at: '2026-11-04T09:54:04+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/65fdb883a6f0b498.jpg)

## [LHG LTE18 套件](https://mikrotik.com/product/lhg_lte18)（LHGGM&EG18-EA） {#lhg-lte18-kit-lhggmeg18-ea}

超远距离，更快速度——借助超高速 LTE Category 18 调制解调器的强大性能。速度最高可达 1 Gbps！这是面向最偏远地区的最后一公里互联网解决方案。完整规格和宣传册请参阅 [LHG LTE18 kit 产品页面](https://mikrotik.com/product/lhg_lte18)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 将接入点安装在任何墙面上的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于安装在室外的立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和附件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证由于设备的不当使用而不会发生事故或损坏。请谨慎使用本产品，并自行承担风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。
- 本设备为 A 类设备。在住宅环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业使用者或公众的距离不得小于 56.5 厘米。

## 快速开始 {#quickstart}

- 握住设备的中心立柱，向卡扣施加力，直到卡扣弹开。
- 将 SIM 卡插入卡槽，芯片朝上。
- 将支脚安装到设备底部以组装外壳，参见（链接）段落。
- 将设备安装到所需位置，参见（链接）段落。
- 将 LAN 计算机的 IP 配置设置为*自动*（DHCP）。
- 在网页浏览器中打开 [https://192.168.188.1](https://192.168.188.1) 开始配置。
- 用户名：admin，密码见标签（或者，对于某些型号，请查看贴纸上的用户名和无线密码）。
- 通过点击右侧的 "Check for updates" 按钮并更新您的 RouterOS 软件至最新版本以更新设备，从而确保最佳性能和稳定性。必须插入有效的 SIM 卡。
- 要手动更新设备，请访问 [https://mikrotik.com/download](https://mikrotik.com/download)
- 为此设备选择 ARM64 软件包并下载到您的 PC。
- 将下载的软件包上传到 WebFig 的 "Files" 菜单并重启设备。
- 将 RouterOS 软件更新至最新版本可确保最佳性能、稳定性和安全更新。
- 在右侧底部的 "Password" 字段中设置路由器密码，并在 "Confirm Password" 字段中重复输入，下次登录时将使用该密码。
- 选择 "Apply Configuration" 保存更改。

![](/img/0f854fe8f1239bea.webp)

## 外壳组装 {#case-assembly}

- 将两个支脚分别滑入 LHG 外壳的相应两侧，两个支脚不同且不可互换（观察产品时，使以太网端口盖板朝向您，标记为 R 的支脚用于右侧，标记为 L 的支脚用于左侧）。
- 将组装好的 LHG 设备卡入网格中合适的中央位置。
- 使用随附的两颗自攻螺丝（十字螺丝刀 PH2）将两个支脚固定到位。包装中还包含接地线连接器和 5 度角度适配器，便于向上或向下调整倾斜角度。参见段落。

## 供电 {#powering}

设备可通过以下方式供电：

PoE in 802.3af/at 支持的输入电压 12-57 V 电源适配器标称电压 24 V 电源适配器标称电流 0.8 A 最大功耗 8 W

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口；
- 使用标有 DATA 的适配器以太网线将 PoE 适配器连接到 PC 或其他网络设备；
- 将电源线连接到适配器，然后将电源线插入电源插座。

![](/img/18a01bb861c1bf89.webp)

## 安装 {#mounting}

![](/img/819eccc51163cf32.webp)

- 将随附的金属安装环滑入天线碟背面的两个槽中。
- 将设备安装到立杆上，使以太网端口朝下。
- 使用 PH2 螺丝刀拧紧安装环。
- 使用扎带将以太网线固定在立杆上，距设备不超过一米，以免线缆被拉出端口。
- 检查安装角度和位置。
- 可选：如有需要，在安装设备之前，可将随附的 5 度调节适配器插入安装环所在的顶部或底部槽中。这样在将设备拧紧到垂直立杆上时，就会额外形成向上或向下的角度。
- 将 5 度角度适配器插入其中一个槽并重新安装设备。在户外安装时，请确保所有线缆开口朝下。请使用 POE 注入器和正确的接地，本设备在端口盖下方设有专门设计的接地连接器。建议使用屏蔽 Cat5/6 线缆。本设备的 IP 防护等级为 IP54。*警告！本设备的安装和操作位置与身体之间应保持至少 120 cm 的距离。在住宅环境中操作本设备可能会造成无线电干扰。*

## 配置 {#configuration}

登录后，您应在 QuickSet 菜单中选择 "Check for updates" 按钮，因为将 RouterOS 软件更新至最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将使用的国家/地区，以符合当地法规。RouterOS 除本文档所述内容外还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果没有可用的 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。为便于恢复，可以让设备引导以进行重新安装，参见某章节。

## 配件 {#accessories}

包装中包含以下随设备提供的配件：

![](/img/2a7e7a38b3223b81.webp)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码 LHGGM&EG18-EA
- CPU 88F3720 800 MHz
- CPU 架构 ARM 64bit
- RAM 容量 256 MB
- 存储 16 MB flash
- 1G 以太网端口数量 1
- LTE 调制解调器 R11mL-EG18-EA
- TAC 86981604
- LTE 类别 18（下行 1.2Gbps，上行 150Mbps）
- LTE FDD 频段 1 (2100MHz) / 3 (1800MHz) / 7 (2600MHz) / 8 (900 MHz) / 20 (800MHz) / 28 (700MHz) / 38 (2600MHz) / 40 (2300MHz)
- 3G 类别 R8（下行 42.2Mbps，上行 11.2Mbps）
- 3G 频段 1 (2100MHz) / 3 (1800MHz) / 5 (850MHz) / 8 (900MHz)
- Micro SIM 插槽 1
- 尺寸 391 x 391 x 227 mm
- 操作系统 RouterOS v7，许可证级别 3
- 工作温度 -40°C 至 +70°C

## SIM 插槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议配合适配器使用。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）；
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备将开始寻找 CAPsMAN 服务器（共 10 秒）；
- 或者继续按住按钮 5 秒直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）；无论使用上述哪种方式，如果在设备通电前按住按钮，系统将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统未经测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送往指定的废物处置场所。请熟悉您所在地区将设备正确运送到指定处置场所的程序。

### UKCA 标志 {#ukca-marking}

![](/img/387853c20d5a4c82.gif)

### 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备制造日期的信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

### 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

### 乌克兰国家通信与信息化国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰境内使用须按照 NKРЗІ 2012 年 11 月 1 日第 559 号决议批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的决定所规定的程序取得使用许可。

### CE 符合性声明 {#ce-declaration-of-conformity}

Mikrotīkls SIA 特此声明，无线电设备类型 LHGGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>WCDMA Band I</th><th>2100 MHz / 24dBm ± 2.7 dB</th></tr></thead><tbody><tr><td>WCDMA Band III</td><td>1800 MHz / 24dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>900 MHz / 24dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1700 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 28</td><td>700 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dBm ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。有关更详细的信息，请参阅上文的符合性声明。本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。有关更多信息，请参阅上文的符合性声明。有关更多信息，请参阅上文的符合性声明。本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。有关更详细的信息，请参阅上文的符合性声明。本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。有关更详细的信息，请参阅上文的符合性声明。本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。有关更详细的信息，请参阅上文的符合性声明。本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。有关更详细的信息，请参阅上文的符合性声明。
