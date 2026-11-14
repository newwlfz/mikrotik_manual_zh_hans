---
title: "NetMetal ac²"
slug: /netmetal-ac
source: https://manual.mikrotik.com/hardware/netmetal-ac
captured_at: '2026-11-04T09:57:16+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/0d9b97cbb07a1832.webp)

## [NetMetal ac²](https://mikrotik.com/product/netmetal_ac2) (RBD23UGS-5HPacD2HnD-NM) {#netmetal-ac-rbd23ugs-5hpacd2hnd-nm}

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行处理。
- 将接入点安装在任何墙面上的所有安装方法均须获得当地管辖部门的认可。
- 设备安装必须符合当地和国家电气规范。
- 本产品用于安装在室外立柱上。开始安装前，请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确程序，可能会对人员造成危险并损坏系统。
- 仅使用制造商批准且可在本产品原始包装中找到的电源和附件。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能会造成无线电干扰，在此情况下，用户可能需要采取适当措施。

**射频辐射暴露：** 此 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。此 MikroTik 设备安装和操作时，应与您的身体、职业用户或公众保持不小于 20 厘米的距离。

## 快速开始 {#quickstart}

该配置与 AP 模式下的 PTP Bridge 相同，不同之处在于 PTMP 设置中无线模式设置为 ap_bridge。可通过该地址直接访问路由器。如果设备连接到启用了 DHCP 服务器的网络，网桥接口上配置的 DHCP 客户端将获取 IP 地址，该地址可用于访问路由器。

请按照以下快速步骤设置设备：

- 打开上盖；
- 使用以太网线将设备连接到随附 PoE 注入器的数据+电源端；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 通过 Web 浏览器使用 **WebFig** 或 [https://mt.lv/winbox](https://mt.lv/winbox) 上的 **WinBox** 工具配置设备。**提供多种配置方法以确保可访问性；**
- 通过打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，并单击 MAC 地址。用户名为 "**admin**"，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 要手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，并重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## 扩展插槽和端口 {#extension-slots-and-ports}

千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。直通线或交叉线均可用于连接其他网络设备。

- SFP 端口。
- 外部 SMA 天线连接器。
- MiniPCIe 插槽。
- 工作在 2.4 GHz、802.11b/g/n 协议的集成无线模块。
- 工作在 5 GHz、802.11a/n/ac 协议的集成无线模块。
- USB Type-A。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以复位 RouterOS 配置（总共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开以开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（总共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统都会加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内含以下随设备附带的附件：

- EU 开关电源 48 V ⎓ 0.95 A 45.6 W。
- 千兆 POE 注入器。
- K-27 DIN 导轨支架安装套件。
- 软管卡箍 40/60 w2 A2 9 mm。有关支持的 SFP 模块，请参阅 [MikroTik 有线接口兼容性](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。

## MiniPCIe 插槽使用 {#minipcie-slot-usage}

此 NetMetal 版本未安装调制解调器。要安装模块，需要拆下上盖并打开底盖。安装 miniPCIe 模块应由合格人员完成，处理电气设备时请遵循安全预防措施：

- 拆包和处理电气组件时，请使用腕部接地带，以避免静电放电（ESD）损坏。
- 使用 HEX3 螺丝刀拆下四颗螺丝。

![](/img/3d63a4287bb06b8b.webp)

- 提起并拆下顶盖。
- 找到 PCB 上的 miniPCIe 插槽，并拆下两颗出厂预装螺丝。

![](/img/d6c2929801f06cb6.webp)

- 将随附的厚导热垫贴到卡上，然后将卡安装到 miniPCIe 插槽中，使导热垫位于 PCB 和卡之间。
- 使用之前拆下的两颗螺丝将卡固定到位。
- 将灰色 uFL 连接器连接到调制解调器的 MAIN 天线连接器，将黑色线缆连接到辅助（或 AUX）连接器。
- 将较薄的导热垫贴到卡的顶部。

![](/img/5c2c2beff2ec1921.webp)

- 为 SMA 连接器钻孔。
- 引导卡线缆穿过。
- 重新组装。

组装时，请确保橡胶密封圈牢固地环绕外壳放置并均匀展开，以防止进水污染。外壳螺丝扭矩为 2,5 Nm。安装所装插卡的天线时，请确保将它们与无线天线保持适当距离并分开。

## 天线使用 {#antenna-usage}

天线安装。警告：安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用经产品认证的天线。根据 FCC 规则 CFR47 part 15.204，明确禁止使用任何未经产品认证的天线。安装人员应根据国家/地区法规并按天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。已批准的 2GHz 天线列表：

-

5 dBi 偶极天线 ACOMNIRPSMA 已批准的 5GHz 天线列表：

-

30 dBi 抛物面天线 MTAD-5G-30D3

-

19 dBi 扇区天线 MTAS-5G-19D120 与上述所列天线类型相同且增益更低的天线可在符合认证的情况下使用。有关无线接口的更多信息：[无线接口](/docs/wireless/abgn/wireless-interface)

## 规格 {#specifications}

有关此产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/netmetal_ax](https://mikrotik.com/product/netmetal_ax)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备妥善运输至指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID：TV7RB922-5HPACT、TV7RB921-5SHPACT、TV7A21GS-5HPACD。

本设备已经过测试，发现符合 FCC 规则第 15 部分对 A 类数字设备的限值要求。这些限值旨在为商业安装环境中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备可能会造成有害干扰，在此情况下，用户将需要自费纠正干扰。

FCC 警告：未经合规责任方明确批准的任何更改或修改，可能会使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致非预期运行的干扰。本设备及其天线不得与任何其他天线或发射器共址或联合运行。

**重要：射频辐射暴露。**

本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备安装和操作时，应与辐射器和您身体的任何部位保持至少 20cm 的距离。

**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用经产品认证的天线。根据 FCC 规则 CFR47 part 15.204，明确禁止使用任何未经产品认证的天线。安装人员应根据国家/地区法规并按天线类型配置天线的输出功率水平。带连接器的设备需要由专业人员安装，以确保符合健康与安全要求。

已批准的 2GHz 天线列表：• 24 dBi 抛物面天线 DC 24-HD-PFIP • 20 dBi 平板天线 WLP-2450-20 • 17 dBi 扇区天线 SA 24-90-17-WB • 15 dBi 全向天线（杆装）WL0-2450-15 • 13 dBi 全向天线（水平极化）HP, 0DH 24-13 已批准的 5GHz 天线列表：• 8.5 dBi 全向天线 MTI Wireless MT-482016NA • 24 dBi 平板天线 Pacific Wireless PA58-24 • 32 dBi 抛物面天线 Pacific Wireless HDDA5W-32-DP 与上述所列天线类型相同且增益更低的天线可在符合认证的情况下使用。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC：7442A-D2352AC

本设备符合加拿大工业部适用于免许可无线电设备的 RSS 标准。其运行须满足以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备运行异常的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。其运行须满足以下两个条件：(1) 本设备不得产生干扰，且 (2) 本设备必须接受所收到的任何无线电干扰，即使该干扰可能导致设备运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

在 5150–5250 MHz 频段运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

**重要：射频辐射暴露。**

本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。本设备安装和操作时，应与辐射器和您身体的任何部位保持至少 20 cm 的距离。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>5150-5350 МГц, 5650-5850 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备生产日期信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位表示周数。

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

## 乌克兰国家通信和信息领域国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：5150-5250 МГц（23 дБм），5250-5350 МГц（20 дБм），5470-5725 МГц（27 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需要按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定批准、并于 2013 年 1 月 3 日在乌克兰司法部登记为第 57/22589 号的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i 里加，拉脱维亚，LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr><tr><td>5150-5250 MHz</td><td>26 - 48</td><td>23 dBm</td><td>仅限室内使用*</td></tr><tr><td>5250-5350 MHz</td><td>52 - 64</td><td>20 dBm</td><td>仅限室内使用*</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用不受任何限制</td></tr></tbody></table>

**客户有责任遵守当地国家法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择（DFS）要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装！**

此 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限制。有关更详细的信息，请参阅上方的符合性声明 / 此 MikroTik 设备符合 ETSI 规定所设定的最大 WLAN 发射功率限值。更多信息请参阅上方的符合性声明 / 此 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限制。有关更多信息，请参阅上方的符合性声明 / 此 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限制。有关更多信息，请参阅上方的符合性声明 / 此 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限制。有关更多信息，请参阅上方的符合性声明 / 此 MikroTik 设备符合 ETSI 规定规定的最大 WLAN 发射功率限制。有关更多信息，请参阅上方的符合性声明。

![](/img/0561b3ba8c95a35c.webp)

此设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 此设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 此设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 此设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 此设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。 / 此设备的 WLAN 功能在 5150 至 5350 MHz 频率范围内运行时仅限室内使用。
