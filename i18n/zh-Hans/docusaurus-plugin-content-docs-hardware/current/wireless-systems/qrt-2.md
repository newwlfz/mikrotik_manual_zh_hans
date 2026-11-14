---
title: "QRT 2"
slug: /qrt-2
source: https://manual.mikrotik.com/hardware/qrt-2
captured_at: '2026-11-04T09:58:33+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

QRT 是一款室外 CPE 设备，具有以下硬件规格：

![](/img/aba055f98926df06.webp)

## [QRT 2](https://mikrotik.com/product/RBQRTG-2SHPnDr2)（RBQRTG-2SHPnD） {#qrt-2-rbqrtg-2shpnd}

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 使用以太网线将设备连接到随附的 PoE 供电器上的数据+电源端；
- 将 PoE 供电器的数据端连接到计算机；
- 将电源适配器连接到 PoE 供电器；
- 通过 **WebFig** 或 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）使用网页浏览器配置您的设备。**提供多种配置方式以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后单击 MAC 地址。用户名为 "**admin**"，密码为空（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将您的 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。
- 将设备安装到您想要的位置，请参见（链接）

## 扩展插槽和端口 {#extension-slots-and-ports}

千兆以太网端口，以太网端口上的被动 PoE。

- 2.4 GHz 无线，支持协议 802.11b/g/n，天线增益 17 (dBi)。

## 打开卡扣 {#opening-latch}

要访问以太网端口和复位按钮，请打开卡扣：

![](/img/1cc7a712a6a341f7.webp)

- 将卡扣从设备上向下拉出。
- 抬起卡扣，但不要将其完全取下。

![](/img/bfaed7cbeee8d4a5.webp)

## 前面板状态 LED 行为 {#front-status-led-behavior}

RouterOS 允许按用户意愿配置每个 LED 的活动。可以将 LED 配置为显示无线信号强度、在接口流量活动时闪烁以及许多其他选项。更多信息请访问 [LEDs](/docs/hardware/leds) 手册页面。本设备的出厂默认配置：

![](/img/3b568ebffbd94538.webp)

- 蓝色常亮 – 设备已通电。
- 绿色常亮 – 以太网端口已连接。
- 绿色常亮 – 用户自定义 LED。
- 绿色常亮 – 由五个绿色 LED 组成的指示灯组，显示信号强度。

## 安装 {#mounting}

本设备设计用于室外使用，安装在桅杆上，所有所需线缆均通过设备的卡扣连接。

*本设备的安装和配置应由合格人员完成。*

安装在桅杆上时，请确保线缆进线口朝下。本设备的 IP 防护等级为 IP54。我们建议使用 Cat5/6 屏蔽线缆。警告！本设备的安装和操作应保持设备与您身体之间的最小距离为 30 cm。在居住环境中操作本设备可能会造成无线电干扰。QRT 包装盒中包含若干需要组装的部件。请按以下流程操作：

- 使用随附的四颗螺丝（使用 PH1 螺丝刀）将两个支架 (A) 安装到旋转调节器 (B) 上。

![](/img/f2a401efc69d5463.webp)

- 将两个 U 型螺栓 (C) 围绕桅杆或立杆放置，并将它们穿过旋转调节器 (D) 上的孔。然后拧紧 U 型螺栓，每个配一个平垫圈、一个弹簧垫圈和一个螺母，如右图所示。所有螺母都需要使用 10 号（3/8 in）扳手拧紧。立杆的最大直径可达 70 mm。

![](/img/566b4a72f051a36b.webp)

- 使用安装支架 (E)，将其放到天线背面。对每个内置螺栓依次用一个橡胶圈、一个垫圈和一个螺母进行安装（按此顺序）。

![](/img/2b7396442b92f286.webp)

- 将旋转调节器安装到安装支架上。在 (F) 位置使用长螺栓。在较短的螺丝上放一个平垫圈和一个弹簧垫圈，然后将它们放入 (G) 位置。不要拧得太紧，因为您现在需要调整天线。

![](/img/a6a3b8817862ac1b.webp)

- 一旦根据软件中的无线信号调整好天线的水平和角度，就拧紧所有螺母。请记录下角度度数以备将来参考。风载荷16 kg @ 40m/s，9kg @ 30 m/s；

## 接地 {#grounding}

安装基础设施（塔和桅杆）以及路由器本身都必须正确接地。本设备在设备背面包含一个接地线连接螺丝。将您的接地线连接到接地螺丝，然后将接地线的另一端连接到已接地的桅杆，请参见图片：

![](/img/f54eca22e5502899.webp)

## 复位按钮 {#reset-button}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备将开始查找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含随设备提供的附件：

- 安装部件：QRT U 型螺栓，钢 - 镀锌，直径 6 mm，U 型桅杆夹，天线支架。
- 欧盟开关电源 24 V、0.8 A、19.2 W、DC ⎓、85.3 %、VI、电缆：150 cm Hor CMC。
- 用于 QRT 的 K-QRT_Fastening 紧固套装。
- ZCPOEC006-R2_Gigabit POE 供电器电缆，带屏蔽连接器。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及更高版本。具体的出厂预装版本列于 /system resource。其他操作系统尚未测试。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片、下载内容和测试结果，请访问我们的网页：[https://mikrotik.com/product/RBQRTG-2SHPnDr2](https://mikrotik.com/product/RBQRTG-2SHPnDr2)

## MikroTik 移动应用 {#mikrotik-mobile-app}

![](/img/b0984aa3ad3c6d58.webp)

![](/img/25f50553ffd86eaf.webp)

![](/img/8d294e5cd375c591.webp)

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID：TV7RBQRTG2SHPND

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的有害干扰防护。本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。然而，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的间距。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。FCC 警告：任何未经合规负责方明确批准的更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰，(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器位于同一位置或配合操作。重要：射频辐射暴露。本设备符合 FCC 针对不受控环境规定的射频辐射暴露限制。本设备的安装和操作应保持辐射体与您身体任何部位之间的最小距离为 30 cm。**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用经授权的天线时，仅使用经本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，明确禁止使用任何未经本产品认证的天线。安装人员应根据国家/地区法规和每种天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC:7442A-QRTG2SHPND 本设备符合加拿大工业部免许可 RSS 标准。操作须符合以下两个条件：(1) 本设备不得造成干扰，(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement. 重要：射频辐射暴露。本设备符合 IC 针对不受控环境规定的辐射暴露限制。本设备的安装和操作应保持辐射体与您身体任何部位之间的最小距离为 30 cm。Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé à une distance minimale de 30 cm entre le radiateur et toute partie de votre corps. CAN ICES-3 (B)/NMB-3(B)FCC

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>≤100 mW</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而异。

设备制造日期信息以斜杠分隔的形式标示在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），后面两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2480-2483.5 MHz（20 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBQRTG-2SHPnD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率 (EIRP)**</th><th>**限制**</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用无任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备必须由专业人员安装！**
