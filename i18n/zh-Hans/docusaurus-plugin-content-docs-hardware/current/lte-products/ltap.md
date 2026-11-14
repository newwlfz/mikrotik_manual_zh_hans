---
title: "LtAP"
slug: /ltap
source: https://manual.mikrotik.com/hardware/ltap
captured_at: '2026-11-04T09:55:19+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## [LtAP](https://mikrotik.com/product/ltap)（RBLtAP-2HnD） {#ltap-rbltap-2hnd}

LtAP 是一款无线接入点，带有三个用于蜂窝数据调制解调器的 SIM 卡槽。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 在将系统连接到电源之前，请阅读安装说明。
- 本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责取得当地主管机构/检验部门对安装结构完整性所需的任何地方或国家安全检查。
- 在任何墙面上安装接入点的所有安装方法均需获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品 intended to be mounted outdoors on a pole but can also be installed indoors. 在开始安装之前，请仔细阅读安装说明。使用错误的硬件和配置，或未遵循正确的操作步骤，可能导致人员危险和系统损坏。
- 我们无法保证因不当使用本设备而不会发生事故或损坏。请谨慎使用本产品，风险自负。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行时，与您的身体、职业使用者或公众的距离不得小于 120 厘米。

## 快速开始 {#quickstart}

按照以下快速步骤设置您的设备：

- 拧下两颗螺丝并取下舱门，以便接触所有端口。参见（链接）插槽用法（可选）。
- 将 SIM 卡插入卡槽（可选）（参见（链接））。
- 连接 GPS 天线（可选）。
- 将设备安装到您想要的位置，参见相关段落。
- 选择合适的供电方案，参见相关章节了解可能的方案。
- 下载 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。没有设置默认 IP 地址，用户名为 **admin**，且没有密码（或者，某些型号请在贴纸上查看用户名和无线密码），使用 Neighbors 选项卡并通过 MAC 地址连接；
- 您应当点击 "Check for updates" 按钮，并将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。
- 选择您的国家，以应用国家法规设置，并在加载的屏幕上设置您的密码。
- 根据使用类型，将 *Installation* 设置为 indoors 或 outdoors。
- *产品的核心功能需要以下 RouterOS "npk" 软件包：gps、system。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/30e4f8523c74a8b6.jpg)

- 内置 2 GHz 无线接入点模块，支持 AP/station/bridge/p2p 模式。板载内置 PIF 天线，以及用于外置天线的 MMCX 连接器（可通过软件选择）。
- 两个 miniPCIe 插槽和三个 SIM 插槽。
- 内置 GPS 模块，带外部 SMA 连接器。支持 - GPS、GLONASS、北斗、Galileo）。
- 千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。直通线或交叉线均可用于连接其他网络设备。以太网端口可通过无源 PoE 注入器接受 12-30 V DC 供电。
- 一个 DB9 RS232 串口，用于串行控制台访问。配置为 115200 bit/s、8 个数据位、1 个停止位、无奇偶校验。
- 一个 USB 2.0 端口，用于存储设备或蜂窝调制解调器。

## 安装 {#mounting}

- 可以使用提供的四颗螺丝和设备上设计的四个孔，将设备固定到墙上。
- 端口由一个小舱门保护，舱门由两颗螺丝固定。取下后可接触以太网端口、天线连接器、SIM 卡槽等。
- 舱门为所有可用端口留有开口位置，因此您可以穿过所有必要的线缆，但只需敲开您要使用的开口。
- 机壳上提供了多个用于外置天线的位置，请使用合适尺寸的钻头将其开出。请小心并测量所选天线，以免安装时碰到内部 PCB 板。

![](/img/dc0a3d4ff60b80cb.webp)

设备可在室内和室外使用。防护等级为 IP54。如果您打算在室外安装，请确保所有线缆开口朝下。安装方向由设备上指向上的箭头标示。使用 POE 注入器并做好正确接地。建议使用 Cat6 屏蔽线缆。警告！本设备的安装和运行时，设备与身体之间的最小距离为 30 厘米。在住宅环境中操作本设备可能造成无线电干扰。

## 配置 {#configuration}

您应当点击 "Check for updates" 按钮，并将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下从互联网端口的所有访问均被阻止）。出于恢复目的，可以从网络启动设备，参见相关章节。

## GPS {#gps}

内置 GPS 模块需要使用外置天线（SMA 连接器已安装在设备舱门后方）。请参见相关章节了解如何取下舱门。**注意** GPS 使用有源天线，请仅在设备关闭时连接和断开天线！

**支持 - GPS、GLONASS、北斗、Galileo）。** 请确保您的设备上已安装 GPS 软件包。可通过以下命令检查 /system package print。如果未安装，请根据您的 RouterOS 版本从我们的下载页面下载额外软件包，并将 GPS 软件包拖到 Files 菜单中进行安装。启用 GPS 并开始工作：

- 启用 - /system gps set enable=yes；
- 将天线设置为外置 - /system gps set gps-antenna-select=external；
- 检查配置 - /system gps print。配置信息 - [GPS 手册，基本示例](/docs/mobile-networking/gps#basic-examples)

## 供电 {#powering}

- 直流输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）可通过随附的 24 V、1.2 A 适配器接受 12-30 V DC ⎓。
- 以太网端口接受无源以太网供电 12-30 V DC ⎓（补偿线缆上的损耗，因此建议高于 12 V）。
- 汽车连接器可用于从汽车和公交车中常见的 12/24 V ⎓ 连接为设备供电。插头有四个引脚：左下（黑色）为接地，右下为电源输入（红色）。上方两个（AUX）保留供将来使用。无附件时最大负载下的功耗可达 12 W。将接地（地线）线连接到舱门下方的螺丝上。

### 连接到 PoE 适配器：（不包含） {#connecting-to-a-poe-adapter-not-included}

- 将设备上的以太网线连接到 POE 适配器的 POE out 端口。
- 将来自 LAN 的以太网线连接到 POE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 前面板状态 LED 行为 {#front-status-led-behavior}

- 常亮蓝色 – 设备已通电。
- 常亮绿色 – 用户自定义 LED，可在系统设置中配置。
- 常亮绿色 – GPS 模块状态。
- 常亮绿色– 五个绿色 LED 的组合，显示蜂窝网络的信号强度。

![](/img/1015646a55daf823.webp)

## miniPCIe 插槽 {#minipcie-slot}

### SIM 卡连接 {#sim-card-connectivity}

- MiniPCIe 1（上方插槽）支持 PCIe 和 USB 2.0 卡，但与 USB 2.0 type A 端口共用（不能同时使用 USB 端口和 miniPCIe 插槽）。它只能用于 SIM 插槽 #1。
- MiniPCIe 2（下方插槽）仅支持 USB（2.0 和 3.0）miniPCIe 调制解调器（不支持 PCIe）。使用 SIM 插槽 #2 和 SIM 插槽 #3。默认使用 SIM 插槽 #2。
- USB 2.0 type A 端口（仅在未使用 miniPCIe 1 时可用）。
- 要在上方 miniPCIe 插槽中使用 USB 类型的 miniPCIe 卡，请将 USB 连接切换到 miniPCIe 插槽：/system routerboard usb set type=mini-PCIe 这将禁用设备前面的 USB 2.0 端口。
- 将 SIM 卡插入上方插槽时，SIM 卡芯片朝下。下方插槽 – 芯片朝上。请检查您使用的是正确的 SIM 插槽。对于插入下方 mini-pcie 插槽的调制解调器，您需要使用 SIM 插槽 2 或 SIM 插槽 3。并且需要在 RouterOS 中选择所使用的 SIM 插槽。选择 SIM 插槽的 CLI 命令：*/system routerboard modem set sim-slot=2*

### 调制解调器安装 {#modem-installation}

本 LtAP 版本未安装调制解调器。在这种情况下，内部天线未连接。安装 miniPCIe 模块应由合格人员进行，处理电气设备时请遵循安全预防措施，本设备支持两张 LR 卡：

- 拆包和处理电子元件时，请使用腕带接地，以避免静电放电（ESD）损坏；
- 取下机壳底部的六颗螺丝，并掀起机壳顶部；
- 找到 miniPCIe 插槽并取下出厂时安装的两颗螺丝；
- 将随附的厚导热垫贴到卡上，并将卡安装到 miniPCIe 插槽中，使导热垫位于 PCB 和卡之间；
- 使用先前取下的两颗螺丝将卡固定到位；
- 将内部天线线缆连接到您的调制解调器。或者将天线线缆穿过 GPS 连接器附近的开口并连接到调制解调器。建议使用硅橡胶将连接器固定到位。
- 在卡的顶部贴上较薄的导热垫；
- 使用外置天线时，可将连接器安装在机壳侧面，开孔请使用 6.5 mm 钻头，参见第 4 部分；
- 参见下图，了解如何放置橡胶密封件以获得最佳防水保护；

![](/img/03bc306812c7acce.webp)

- 按相反顺序重新组装。PCB 螺丝的拧紧力矩为 0.3 Nm，机壳盖/外壳螺丝为 0.5 Nm。将设备重新装入机壳并用先前取下的螺丝固定后，将移动运营商的 SIM 卡滑入 SIM 卡槽，芯片朝向如端口标签所示。该卡槽接受 miniSIM（2FF）。SIM 插槽 2 和 3 适用于下方 miniPCIe 插槽，可在 RouterOS 的 "/system routerboard sim" 菜单中切换。

## 复位按钮 {#reset-button}

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在将寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 引导程序。适用于 RouterBOOT 调试和恢复。

## 配件 {#accessories}

包装中包括随设备提供的附件：

- K-67 紧固套件。包括四颗 4x25 mm 螺丝、四个 6x30 mm 膨胀螺栓。
- 线缆 DC ⎓（H4130-04PDB000R 3 mm 2x2P Housing）到（StripJacket 5 cm+WireEnd Strip/Tin 1 cm）24 AWG（黑/红/蓝/橙）0.35 m。
- 欧盟/美国开关电源 24 V、1.2 A、28.8 W、86.8%、VI，DC ⎓ 线缆：220 cm RA DC 插头 mod Hor CMC 较短插头。
- 弹性导热垫 - 25x40x3.5mm +30x45x1mm，装在自封袋中。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统未经测试。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/ltap](https://mikrotik.com/product/ltap)

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描 QR 码并选择您偏好的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将被自动填入。
- 选择 Connect，通过无线网络与您的设备建立连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要设置。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许商业使用。
- 如果 WLAN 设备的工作范围与上述法规不同，则需要将制造商/供应商提供的定制固件版本应用到最终用户设备上，并防止最终用户重新配置。
- 室外使用：最终用户需要获得 NTRA 的批准/许可。
- 任何设备的数据手册可在制造商官方网站上获取。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 2.400 – 2.4835 GHz，TX 功率限制为 20dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.150 – 5.250 GHz，TX 功率限制为 23dBm（EIRP）。
- 序列号末尾带有字母 "EG" 的产品，其无线频率范围限制为 5.250 – 5.350 GHz，TX 功率限制为 20dBm（EIRP）。

请确保设备具有 lock 软件包（来自制造商的固件版本），需要将其应用到最终用户设备上，以防止最终用户重新配置。产品将标注国家代码 "-EG"。本设备需要升级到最新版本，以确保符合当地主管机构的规定！最终用户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

为避免环境污染，请将设备与生活垃圾分开，并以安全方式处置，例如送往指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>Model</th><th>FCCID</th></tr></thead><tbody><tr><td>RBLtAP-2HnD</td><td>TV7LTAP2HND</td></tr></tbody></table>

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的有害干扰防护。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。然而，不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），建议用户尝试通过以下措施之一来纠正干扰：

- 重新调整或放置接收天线。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。**FCC 警告：** 未经负责合规的一方明确批准的任何更改或修改，可能会使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作需满足以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受所接收的任何干扰，包括可能导致意外操作的干扰。本设备及其天线不得与其他任何天线或发射器共址或一起使用。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备的安装和运行时，辐射体与您身体任何部位之间的最小距离为 30 厘米。本封闭式设备符合 FCC 规则和法规 47CFR 第 15 C 段。操作需满足以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受所接收的任何干扰，包括可能导致意外操作的干扰。

*使用 CBRS 频段时，最终主机设备的 CBSD 类别将取决于所使用的功率设置和天线增益。*

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>Model</th><th>FCCID</th></tr></thead><tbody><tr><td>RBLtAP-2HnD</td><td>7442A-LTAP2HND</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。操作需满足以下两个条件：(1) 本设备不得造成干扰，并且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。本设备符合适用于免许可无线电设备的加拿大工业部 CNR 标准。其运行须满足以下两个条件：(1) 设备不得产生干扰，并且 (2) 设备用户必须接受任何无线电干扰，即使该干扰可能损害其运行。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行时，辐射体与您身体任何部位之间的最小距离为 20 厘米。

## UKCA 标识 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>≤100 mW</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息标注在其标签上序列号末尾的小数点后。第一位数字表示年份编号（年份的最后一位数字），其后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2412-2472 MHz（30 dBm）。可用频率信道可能因产品型号和认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息领域监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2412-2472 MHz（20 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 NCCIR 2012 年 11 月 1 日第 559 号决定（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBLtAP-2HnD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相关型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在欧盟所有成员国使用无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装！*
