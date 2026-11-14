---
title: "RB911 系列"
slug: /rb911-series
source: https://manual.mikrotik.com/hardware/rb911-series
captured_at: '2026-11-04T10:00:14+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **911 Lite5**
- **911 Lite5 Dual**
- **911 Lite5 ac**
- **RB911G-2HPnD**
- **[RB911G-5HPnD](https://mikrotik.com/product/RB911G-5HPnD)**
- **RB911G-5HPacD**
:::

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的常规做法。本产品的最终处置应按照所有国家法律法规进行处理。设备的安装必须符合当地和国家的电气规范。本产品可以安装在室外的立柱上。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能导致人员处于危险境地并对系统造成损坏。请仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用本设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

这是 A 类设备。在居住环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

## 首次使用 {#first-use}

- （可选）将设备安装到外壳中。
- 将以太网线连接到以太网端口。
- 插上电源线以开启设备。
- 在您的 PC、手机或其他设备上打开网络连接，搜索 MikroTik 无线网络并连接到它。
- 配置必须通过无线网络、使用网页浏览器或移动应用程序完成 -（参见 ""）。或者，您也可以使用 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。
- 连接到无线网络后，在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始配置，用户名为 a*dmin*，默认没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）。
- 我们建议点击 "Check for updates" 按钮，并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。
- 选择您的国家/地区，以应用国家法规设置，并在加载的界面上设置您的密码。

## 组装 {#assembly}

911 系列路由器供专业使用。每台设备均采用防静电包装。在处理电子设备时，请遵守以下安全注意事项：

- 在拆包和处理电子元件时，请使用腕部接地带，以避免静电放电（ESD）损坏；
- 拆包后，请将路由器放置在防静电垫上；
- 安装设备时，请确保没有可能损坏或接触 PCB 板的物体。可使用设备两侧 PCB 板上的四个出厂预留孔，将设备安装到您想要的位置。

本设备的 IPX 等级为 IPX0。在户外应用中安装时，请确保设备具备防水保护。我们建议使用 Cat6 屏蔽网线。安装基础设施（塔架和桅杆）以及路由器本身必须正确接地。

## 供电 {#powering}

本设备接受以下方式的供电：

- 通过以太网端口进行无源 10-30 V DC ⎓ PoE 供电。电缆越长，为补偿线路损耗所需的电压就越高。建议至少使用 18 V。
- 直接输入到电源插孔 10-30 V DC ⎓。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 启动过程 {#booting-process}

RouterOS 是所有 RouterBOARD 路由器的操作系统。请在此处查看文档：[https://mt.lv/help](https://mt.lv/help) 除以太网端口上的 IP 地址外，本设备未进行预配置。另一套配置必须根据上文链接的文档手册进行应用。初始连接必须通过以太网线完成，并使用 MikroTik WinBox 实用程序。应使用 WinBox 连接到默认 IP 地址 192.168.88.1，用户名为 admin，密码为空。如果您希望从网络启动设备，例如使用 MikroTik Netinstall，请在启动设备时按住复位按钮，直到 LED 灯熄灭，设备便会开始寻找 Netinstall 服务器。如果 IP 连接不可用，也可以使用 WinBox 实用程序连接到设备的 MAC 地址。更多信息请参阅文档。

## 扩展插槽和端口 {#extension-slots-and-ports}

- RB911-5HnD – 5 GHz，802.11a/n，功耗 7 W。
- RB911-5Hn – 5 GHz，802.11a/n，功耗 5 W。
- RB911G-5HPacD – 5 GHz，802.11a/n/ac，功耗 12 W，千兆以太网。
- RB911G-2HPnD – 2.4 GHz，802.11b/g/n，功耗 10 W，千兆以太网。
- RB911-5HacD - 5 GHz，802.11a/n/ac，功耗 7 W。
- RB911G-5HPnD – 5 GHz，802.11a/n，功耗 11 W，千兆以太网。

## 按钮和跳线 {#buttons-and-jumpers}

RouterBOOT 复位按钮具有以下功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAPs 模式（共 10 秒）。* 继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 去寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都将加载备份的 RouterBOOT 加载器。这适用于 RouterBOOT 调试和恢复。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/7e333f989e2f2ffe.jpg)

- 扫描二维码并选择您首选的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名已预先填入。
- 点击 Connect，通过无线网络建立与设备的连接。
- 选择 Quick setup，应用将通过几个简单的步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列在 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID：TV7RB911-5HNDM

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装提供合理的保护，防止有害干扰。

本设备会产生、使用并可能辐射射频能量，如果未按说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能会造成有害干扰，此时用户需自费纠正该干扰。

FCC 警告：任何未经负责合规的一方明确批准的更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作受以下两个条件约束：(1) 本设备不得造成有害干扰，以及 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与其他任何天线或发射器共置或协同工作。重要：射频辐射暴露。天线与用户之间必须保持至少 20 厘米的距离。在此配置下，可满足 FCC 针对人群/非受控环境规定的射频暴露限值。天线安装。警告：安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用经产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，严禁使用未经产品认证的任何其他天线。安装人员应根据国家法规和每种天线类型配置天线的输出功率水平。带有连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC:7442A-9115HND 本设备符合加拿大工业部免许可 RSS 标准。操作受以下两个条件约束：(1) 本设备不得造成干扰，以及 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。本设备符合加拿大工业部适用于免许可无线电设备的相关 CNR 标准。其运行须满足以下两个条件：(1) 设备不得产生干扰，并且 (2) 设备用户必须接受任何接收到的无线电干扰，即使该干扰可能影响其正常运行。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

工作在 5150–5250 MHz 频段的设备仅供室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, , 5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息位于其标签上序列号末尾，以斜杠分隔。第一位数字表示年份（年份的最后一位数字），其后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用频率信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 МГц (20 дБм), 5150-5250 МГц (23 дБм), 5250-5350 МГц (20 дБм), 5470-5725 МГц (27 дБм)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用该设备，必须按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）所批准的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相应型号）</th><th>使用信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限于室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限于室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限值。更详细的信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定所设定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备遵守 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的 WLAN 最大发射功率限值。更多信息请参见上文的符合性声明。

![](/img/0561b3ba8c95a35c.webp)

本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。 / 本设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内工作时仅限室内使用。

**BG. Инструкци**
