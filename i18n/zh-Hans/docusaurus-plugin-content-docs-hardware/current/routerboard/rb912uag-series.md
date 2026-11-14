---
title: "RB912UAG 系列"
slug: /rb912uag-series
source: https://manual.mikrotik.com/hardware/rb912uag-series
captured_at: '2026-11-04T10:00:18+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **[RB912UAG-5HPnD](https://mikrotik.com/product/RB912UAG-5HPnD)**
- **[RB912UAG-2HPnD](https://mikrotik.com/product/RB912UAG-2HPnD)**

:::

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。在将系统连接到电源之前，请阅读安装说明。本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责就安装的结构完整性取得当地主管部门/检查部门要求的任何地方或国家安全检查。将接入点安装到任何墙面上的所有安装方法均须获得当地管辖部门的认可。设备安装必须符合当地和国家电气规范。请在开始安装前仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的程序，可能会对人员造成危险情况并损坏系统。我们无法保证因设备使用不当而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险。

这是 A 类设备。在家庭环境中，本产品可能造成无线电干扰，在这种情况下，用户可能需要采取适当的措施。

## 安装 {#mounting}

912UAG 系列路由器供专业使用。每台设备均采用 ESD 防护包装。处理电气设备时，请遵守以下安全预防措施：

- 在拆包和处理电气组件时使用腕部接地带，以避免静电放电（ESD）损坏，
- 拆包后，请将路由器放在防静电垫上，
- 安装设备时，请确保没有可能损坏或接触 PCB 板的物体，
- 请注意，ETH、USB 端口和 DC 插孔伸出 PCB 板的边缘。可使用 PCB 板上出厂提供的四个孔（位于设备每侧）将设备安装到您想要的位置。*警告！本设备安装和操作时，设备与人体之间应保持至少 380 cm 的距离。在住宅环境中操作本设备可能造成无线电干扰。*

## 连接 {#connecting}

- 选择您的供电方案，请参阅“供电”部分了解可能的方案。
- 如有需要，将配件连接到 miniPCIe 插槽，将天线线缆连接到 miniPCIe 卡，并插入 SIM 卡。
- 将以太网线缆连接到千兆以太网端口。
- 如果不使用 POE，请连接直接输入电源插孔以启动设备。
- 设备将启动，短鸣一声后，无线网络将可供连接。
- 在您的 PC、手机或其他设备上打开网络连接，搜索 MikroTik 无线网络并连接到它。
- 连接到无线网络后，在 Web 浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始配置；由于默认没有密码，您将自动登录（或者，对于某些型号，请查看贴纸上的用户和无线密码）。
- 我们建议单击“Check for updates”按钮并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。
- 在加载的屏幕中选择您的国家/地区，以应用国家/地区法规设置并设置您的密码。

## 供电 {#powering}

本设备支持以下供电模式：

- 通过以太网端口提供无源 10-30 V PoE。长线缆上需要更高电压来补偿功率损耗。建议至少 18 V。
- 电源插孔直接输入 10-30 V。最大功耗 14 W。

## 配置 {#configuration}

除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络启动设备，参见相关章节。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个千兆以太网端口（支持 Auto MDI/X，因此您可以使用直通或交叉线缆连接到其他网络设备）。该以太网端口可接受来自无源 PoE 注入器的 10-30 V DC 供电。
- 一个 miniPCIe 插槽。*本设备可能与 R11e-LTE 国际调制解调器不兼容。*
- A 型 USB 插槽。
- SIM 卡插槽。
- RB912UAG-5HPnD 支持 5 GHz、802.11a/n。
- RB912UAG-2HPnD 支持 2.4 GHz、802.11b/g/n。

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（总共 5 秒）。
- 再按住 5 秒，LED 变为常亮，此时松开以开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（总共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总共 15 秒）。无论使用上述哪种选项，如果在设备通电之前按下按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请熟悉您所在地区将设备正确运输至指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RB912UAG-5HPnD</td><td>TV7RB912G-5HPNDM</td></tr><tr><td>RB912UAG-2HPnD</td><td>TV7RB912G-2HPND</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装中的有害干扰提供合理保护。

![](/img/0a33cf47745dd39e.jpg)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能造成有害干扰，在这种情况下，用户将被要求自费纠正干扰。

**FCC 警告：** 未经合规负责方明确批准的任何更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作需满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或协同操作。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限制。本设备安装和操作时，辐射体与您身体任何部位之间应保持至少 167 cm 的距离。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

IC:7442A-912G2HPND, 7442A-912G5HPNDM 本设备符合加拿大工业部免许可证 RSS 标准。操作需满足以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。本设备符合加拿大工业部适用于免许可证无线电设备的 CNR 要求。允许在以下两个条件下操作：(1) 设备不得产生干扰，且 (2) 用户必须接受设备受到的任何无线电干扰，即使该干扰可能影响设备运行。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

在 5150–5250 MHz 频段内运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以降低对使用相同信道的移动卫星系统造成有害干扰的风险。

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限制。本设备安装和操作时，辐射体与您身体任何部位之间应保持至少 168 cm 的距离。本设备符合 IC 针对非受控环境规定的辐射暴露限制。本设备安装和使用时，辐射体与您身体任何部位之间应保持至少 168 cm 的距离。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率信道</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц, 5650-5850 МГц</td><td>≤10 Вт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息标在其标签上序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)，5725-5850 MHz (30 dBm)。可用信道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息领域国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 МГц（20 дБм），5470-5725 МГц（27 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定（该决定已于 2013 年 1 月 3 日在乌克兰司法部登记，登记号为 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限制。本 MikroTik 设备安装和操作时，与您的身体、职业用户或公众的距离不得小于 20 厘米。本设备符合欧盟针对非受控环境规定的辐射暴露限制。除非本文档第 1 页另有明确说明，本设备安装和操作时，辐射体与您身体之间应保持至少 20 cm 的距离。在 RouterOS 中，您必须指定您的国家/地区，以确保遵守当地无线法规。

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相应型号）</th><th>使用信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2412-2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限制。有关更多详细信息，请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的 WLAN 最大发射功率限制。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限制。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限制。更多信息请参见上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则规定的最大 WLAN 发射功率限值。更多信息请参见上文的符合性声明。
