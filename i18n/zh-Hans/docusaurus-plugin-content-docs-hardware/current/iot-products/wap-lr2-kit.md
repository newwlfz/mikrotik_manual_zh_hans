---
title: "wAP LR2 套件"
slug: /wap-lr2-kit
source: https://manual.mikrotik.com/hardware/wap-lr2-kit
captured_at: '2026-11-04T10:07:34+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可以下载为 <a href="/assets/files/wap-lr2-kit-0ff0e8046d9b3541dfdd77380b8cc0f3.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/579445f9629a4c7e.jpg)

### [wAP LR2 kit](https://mikrotik.com/product/wap_lr2)（RBwAPR-2nD&R11e-LR2） {#wap-lr2-kit-rbwapr-2ndr11e-lr2}

wAP 是一款小型防风雨设备，内置 LR2 卡。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律法规进行处理。
- 在任意墙面安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于户外立杆安装，但也可以安装在室内。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险并导致系统损坏。
- 请仅使用制造商批准的电源和配件，它们可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备出现故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 这是 A 类设备。在住宅环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

- 请确保您的 ISP 允许更换硬件，并且会自动分配 IP 地址。
- 打开底部盖板（参见 ""）。
- 将外置天线连接到 SMA 连接器（参见 ""）。
- 将设备连接到电源（参见 ""）。
- 使用您的设备连接到 MikroTik 无线网络
- 配置必须通过无线网络使用网页浏览器或移动应用完成 -（参见 ""）。或者，您可以使用 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。默认情况下，以太网端口访问被防火墙阻止。
- 连接到无线网络后，请在网页浏览器中打开 192.168.88.1 以开始配置。
- 用户名：a*dmin*，默认没有密码（或者，对于某些型号，请在贴纸上查看用户名和无线密码）。
- 使用移动应用时，请选择 Quick setup，它会以六个简单步骤引导您完成所有必要的配置。
- 在产品内的标签上找到您的 LR Gateway ID，并将其注册到您的网络服务器中。
- 要使设备连接到 LR 网络服务器，请参见 ""。
- 点击 "Check for updates" 按钮并将您的 RouterOS 软件更新到最新版本，设备需要有可用的互联网连接。
- 更新后请设置您的国家/地区，以应用国家法规设置。
- 设置您的 WiFi 密码。
- 设置路由器密码。
- 产品的核心功能需要以下 RouterOS "npk" 软件包：lora、system。

![](/img/8a33ad1fe4c43635.webp)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 10/100 以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。连接其他网络设备时可以使用直通线或交叉线。
- 外部 SMA 天线连接器已连接到 LR 卡。
- 汽车连接器。引脚定义：A - 保留供将来使用（橙色），B - 保留供将来使用（蓝色），C - 接地（黑色），D – 电源输入（红色）。
- MiniPCIe 插槽，内置 LR2 卡。
- 内置无线模块，工作于 2.4 GHz，802.11b/g/n 协议。
- Mini-SIM 插槽。

## 供电 {#powering}

设备可通过以下方式供电：

- 以太网端口支持被动 PoE 9-30 V DC ⎓。
- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）支持 9-30 V DC⎓。
- 汽车连接器 9-30 V DC⎓。最大负载下的功耗可达 8 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的以太网线缆连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 安装 {#mounting}

设备可以通过多种方式安装：立杆、墙面、天花板，也可以放置在随包装附带的专用 MikroTik 支架中。包装中还包含带详细安装说明的钻孔模板，可帮助您完成以太网线缆的安装以及在天花板或墙面上的固定。钢板支架用于放在吊顶天花板板的另一侧，另有两颗螺丝和墙塞。扎带或钢卡箍用于安装在立杆上。

本设备的 IP 防护等级为 IP54。在户外安装时，请确保所有线缆开口朝下。我们建议使用 POE 注入器和 Cat6 屏蔽线缆进行正确接地。使用和安装本设备时，请注意最大允许暴露（MPE）安全距离，辐射器与您的身体之间至少保持 20 厘米。

安装在桅杆或立杆上：

建议使用电工胶带以增加材料之间的摩擦力。

![](/img/b21639053eb61552.webp)

- 将塑料扎带穿过孔洞固定到钢板支架上。
- 将支架安装到设备上。
- 用螺丝固定。
- 将设备安装到立杆或桅杆上并对齐。
- 将以太网线缆穿过开口并连接到以太网端口。
- 关闭底部卡扣并用螺丝固定。建议使用扎带将以太网线缆固定在立杆上，与设备的距离约为 30 cm。

将设备安装在墙上：

![](/img/42ebcb18fdb0e686.webp)

- 使用随附的模板标记钻孔位置。如有需要，也标记以太网线缆的位置。请相应地对齐，这取决于设备最终将如何安装。
- 如有需要，插入墙塞，这取决于墙体结构和材料。
- 将随附的钢板支架放在墙上。
- 用螺丝将其固定到位。
- 将您的以太网线缆穿出开口并连接到以太网端口。
- 将设备安装到钢板支架上
- 用螺丝将其固定到位。
- 关闭底部卡扣。

避免将设备安装在低洼地面处，否则您将无法安装和关闭底部卡扣。

安装在天花板上：

![](/img/35cd19164cabfd89.webp)

包装中包含一个专用支架，用于安装在吊顶上。它由两部分组成，分别安装在天花板板的两侧。

-

使用模板标记钻孔位置。

-

将两个安装支架放在标记处。

-

使用螺丝将它们固定在一起。

-

如果安装在墙上，请以相同方式继续组装。

-

将您的以太网线缆穿出开口并连接到以太网端口。

-

将设备安装到钢板支架上。

-

用螺丝将其固定到位。

-

关闭底部卡扣。

## 底部盖板 {#bottom-lid}

- 底部盖板由防脱落螺丝固定到位。

![](/img/0d1777eb306bd477.webp)

- 使用 Torx T20 螺丝刀将其拧松，但不要完全取下螺丝。

![](/img/fda7738b33a2c690.webp)

- 朝与设备相反的方向拉动盖板以将其取下。

![](/img/be3a042d3ac48e4c.webp)

- 重新装配。

## 配置 {#configuration}

要设置 LR 的配置，请连接到设备并使用网页浏览器登录，或使用移动应用。只需两个简单步骤：**第一步：**

-

登录后，Quick Set 将被选中，请切换到屏幕右侧的 WebFig。如果配置是通过移动应用完成的，请点击屏幕右侧的齿轮图标以打开高级菜单。

-

在左侧菜单中找到并选择 "Lora" 部分。

-

在 newly opened window 中选择 Servers 选项卡。

-

点击 + 添加新的服务器配置。

-

将出现一个新窗口，您需要输入：Name:（服务器名称）Address:（服务器地址）Up port:（通常为 1700）Down port:（通常为 1700）

-

点击 OK 保存。**第二步：**

-

在上一个窗口中选择 Device 选项卡。

-

双击或点按该行进行配置。

-

在下拉菜单中选择先前输入的网络。

-

点击 Enable 按钮以启用网关。

-

点击 OK 保存。

-

配置完成。我们建议在 QuickSet 菜单中点击 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问都被阻止）。出于恢复目的，可以引导设备进行重新安装，请参见相关章节。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您首选的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将已填写。
- 点击 Connect 通过无线网络建立与设备的连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要设置。

## 天线使用 {#antenna-usage}

我们建议使用外置天线 "TOF-2400-8V-4"，可另行购买。该天线带有立杆安装件和可直接用于 LR 卡的线缆。[https://mikrotik.com/product/tof_2400_8v_4](https://mikrotik.com/product/tof_2400_8v_4) 位于底部舱门下方的 SMA 连接器已连接到 LR 卡，随时可用。请参阅有关如何取下舱门的章节。

**无需拆解设备**。已安装的 LR2 mini PCIe 卡有两个可用连接器 - uFL 和 MMCX。内置天线通过 uFL 连接器连接，开箱即可使用。MMCX 连接器已连接到 SMA，如果您希望使用外置天线，只需将其连接到 SMA 即可。设备将根据稍后展示的设置选择使用哪个天线。

**请在设备关闭时连接和断开天线！**

**内置天线** 4.7dBi 可用于节点与设备之间距离不超过 200 米的部署（实际距离需在环境中进行核实）。该天线已连接并随时可用。

要确认天线的连接方式：

- 打开底部舱门（参见 ""）。

![](/img/8c722210ffb66bd7.webp)

- 使用 PH2 螺丝刀取下螺丝。
- 将上盖与底部沿相反方向滑动，从而将其拆开。

![](/img/ce6936f2b0764db6.webp)

- 内置天线将使用 uFL 连接器，而 SMA（用于外置天线）将按下图所示通过 MMCX 连接器连接。

![](/img/66c82c15bafd80f8.webp)

![](/img/ba146620d35704a2.webp)

- 重新装配。**软件负责选择设备所使用的天线。**

请确保在软件设置中模块使用了正确的连接器。

为此，请进入设备的 GUI，查看 **LoRa* → *Devices* → 在网关上"双击" → 在 "**Antenna**" 部分下使用的是哪个连接器：

![](/img/4f432620cfebced0.webp)

如果您希望使用内置天线，请保持选择 uFL。如果您希望使用连接到 SMA 插槽的外置天线，请选择 MMCX。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三个功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在将寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪个选项，如果在设备通电前按下按钮，系统将加载备份的 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含以下随设备附带的配件：

- EU/US 开关电源 24 V ⎓，0.8 A，19.2 W，85.3 %，VI，线缆：150 cm Hor CMC。
- WAP 桌面支架。
- WAP 户外外壳支架 AL，白色。
- POE 注入器线缆。
- 线缆 (H4130-04PDB000R 3 mm 2x2P Housing) 至 (StripJacket 5 cm+WireEnd Strip/Tin 1 cm) 24 AWG。
- 软管卡箍，35-70 mm，W4。
- K-52 紧固套装。
- WAP-drill-template，纸质手册。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统未经测试。RouterOS 的 LR 支持仅限于 MikroTik LR 卡，不支持第三方 Lora 卡。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请了解您所在地区将设备正确运输至指定处置场所的相关程序。

## UKCA 标志 {#ukca-marking}

![](/img/387853c20d5a4c82.gif)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2412 - 2472 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频段信道可能因产品型号和认证而异。

有关设备制造日期的信息以斜杠分隔标注在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），随后的两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

频率范围（最大输出功率）：2412 - 2472 MHz (30 dBm)。可用频道可能因产品型号和认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2412 - 2472 МГц (20 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用须按照 2012 年 11 月 1 日第 559 号国家通信与信息化监管委员会决议（于 2013 年 1 月 3 日在乌克兰司法部注册，编号 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBwAPR-2nD&R11e-LR2 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WLAN / LR {#wlan--lr}

<table><thead><tr><th>***WLAN***</th><th>工作频率 / 最大输出功率</th><th>2412-2472 MHz / 20 dBm</th></tr></thead><tbody><tr><td>**LR**</td><td>2403-2479 MHz / 20 dBm</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大发射功率限值。有关更多详细信息，请参见上文的符合性声明。
