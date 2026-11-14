---
title: "OmniTIK 系列"
slug: /omnitik-series
source: https://manual.mikrotik.com/hardware/omnitik-series
captured_at: '2026-11-04T09:57:49+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **[OmniTIK 5 ac](https://mikrotik.com/product/rbomnitikg_5hacd)** (RBOmniTikG-5HacD)
- **[OmniTIK 5 PoE ac](https://mikrotik.com/product/rbomnitikpg_5hacd)** (RBOmniTikPG-5HacD)
- **[OmniTIK 5 PoE](https://mikrotik.com/product/RBOmniTikUPA-5HnDr2)** (RBOmniTikUPA-5HnD)
- **[OmniTIK 5](https://mikrotik.com/product/RBOmniTikU-5HnDr2)** (RBOmniTikU-5HnD)

:::

本设备需要升级到 RouterOS v7.11.2 或最新版本，以确保符合当地监管机构的规定。最终用户有责任遵守所在国家/地区的规定，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。

*技术规格、宣传册以及有关产品的更多信息，请访问 [https://mikrotik.com/products](https://mikrotik.com/products)* *包含更多信息的软件配置手册可在 [https://mt.lv/help](https://mt.lv/help) 找到*

*MikroTik 设备仅供专业使用；如果您不具备相应资质，请咨询顾问 [https://mikrotik.com/consultants](https://mikrotik.com/consultants)*

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 将接入点安装在任何墙面上的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家电气规范。
- 本产品旨在安装于室外立杆上。开始安装前，请仔细阅读安装说明。未能使用正确的硬件和配置或遵循正确的操作程序，可能会对人员造成危险并损坏系统。
- 仅使用制造商认可且可在本产品原包装中找到的电源和附件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座中拔下电源插头。
- 客户有责任遵守所在国家/地区的规定，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。
- 这是 A 类设备。在住宅环境中，本产品可能会造成无线电干扰，在这种情况下，用户可能需要采取适当措施。

**重要：射频辐射暴露。**

- 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和操作时，辐射体与人体任何部位之间的最小距离应为 30 厘米。

## 首次使用 {#first-use}

首个以太网端口始终配置为 WAN 端口（受防火墙保护、启用 DHCP 客户端，并禁用 MAC 连接/发现）。其他以太网端口和无线接口会加入本地 LAN 网桥，并设置 192.168.88.1/24 地址和配置 DHCP 服务器。

- 打开底部盖板。
- 将您的 PC 或 LAN 网线连接到以太网端口。
- 按照“供电”部分所述连接电源。
- 将 LAN 计算机的 IP 配置设置为自动（DHCP）。
- 设备的默认 IP 地址是 192.168.88.1，请在 Web 浏览器中打开此地址以开始配置。用户名为 admin，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。
- 我们建议点击“检查更新”按钮并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。
- 在加载的屏幕上选择您的国家/地区，应用国家/地区法规设置并设置密码。我们建议点击“检查更新”按钮并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。RouterOS 除了本文档所述内容外还包含许多配置选项。我们建议访问 RouterOS 文档页面以熟悉这些可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。

## 供电 {#powering}

设备可通过以下方式接受供电：

- 以太网端口接受无源 PoE 12-57 V DC ⎓。对于 Omnitik 5 型号，为 11-30 V。最大负载下的功耗可达 14 W。PoE 版本接受 12-57 V DC，最大功耗为 18W，带附件时为 66 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备上的以太网电缆连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自本地网络（LAN）的以太网电缆连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 电源输出 {#power-output}

*仅适用于 OmniTik 5 PoE ac：* 本设备可以通过其以太网端口向外部设备提供 PoE 供电。这很方便，因为您不需要任何额外的 PoE 注入器来为其他设备供电。输出电压将与输入电压相同。此模式下每个以太网端口的最大输出功率为 1A（所有端口的总最大值为 2A）。要达到最大输出功率，建议使用高压适配器以及随附的 PoE 注入器为 OmniTik 设备供电（48/56V），因为 802.3af/at 输入限制为 30W，而 OmniTik 自身将消耗高达 15W。在 RouterOS 中启用 Power Output 后，以太网 LED 会增加红色（绿色表示已建立以太网链路，红色表示有电源但无链路，红色和绿色均表示有链路且有电源）。

## 安装 {#mounting}

在设备背面，将随附的立杆安装适配器滑动安装，使卡扣朝前，直到卡扣咔嗒一声到位。

![](/img/8d05977a197feefd.jpg)

## [OmniTIK 5 PoE ac](https://mikrotik.com/product/rbomnitikpg_5hacd) (RBOmniTikPG-5HacD) {#omnitik-5-poe-ac-rbomnitikpg-5hacd}

使用随附的软管卡箍将设备固定到立杆或桅杆上。可调节的 QuickMount 适配器可单独购买。

![](/img/02ac439176662f7a.webp)

OmniTik 有一个用于固定端口门的锁定螺钉，可使用 5mm 内六角螺丝刀将其关闭。

## 接地 {#grounding}

安装基础设施（塔和桅杆）必须正确接地。请将所有松散的以太网电缆和天线电缆固定在距设备约 30cm 的立杆或桅杆上，以免电缆重量拉扯端口和连接器。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个千兆以太网端口，支持自动交叉/直通电缆校正（Auto MDI/X），因此您可以使用直通或交叉电缆连接到其他网络设备。
- 一个集成无线 5GHz 802.11a/n/ac，2x2 MIMO，内置栅格天线，最大增益 7.5dBi。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有以下功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（总共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（总共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统都将加载备份 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如在指定的废物处置场所处置。请熟悉将设备正确运输到您所在地区指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBOmniTikG-5HacD</td><td>TV7OMNITIKPG5HACD</td></tr><tr><td>RBOmniTikPG-5HacD</td><td>TV7OMNITIKPG5HACD</td></tr><tr><td>RBOmniTikUPA-5HnD</td><td>TV7RBOMNITIK5HND</td></tr><tr><td>RBOmniTikU-5HnD</td><td>TV7RBOMNITIK5HND</td></tr></tbody></table>

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区域操作本设备可能会造成有害干扰，在这种情况下，用户将被要求自行承担费用纠正干扰。

**FCC 警告：** 任何未经合规负责方明确批准的更改或修改都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作受以下两个条件约束：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或协同操作。

**重要：射频辐射暴露。**

本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和操作时，辐射体与人体任何部位之间的最小距离应为 20 厘米。

**天线安装。警告：** 安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用已通过本产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，明确禁止使用任何未经本产品认证的天线。安装人员应根据国家/地区法规和每种天线类型配置天线的输出功率水平。带连接器的设备需要专业安装，以确保符合健康和安全要求。

**经批准的 5 GHz 天线列表：**

- 8.5 dBi 全向天线（型号：MT-482016/N/A）；
- 24 dBi 平板天线（型号：PA58-24-ANT）；
- 32 dBi 碟形天线（型号：HDDA5W-32-DP2）；根据认证，也可以使用与上述所列天线相同类型且增益更低的天线。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBOmniTikG-5HacD</td><td>7442A-OMNTKPG5AC</td></tr><tr><td>RBOmniTikPG-5HacD</td><td>7442A-OMNTKPG5AC</td></tr><tr><td>RBOmniTikUPA-5HnD</td><td>7442A-OMNTK5HND</td></tr><tr><td>RBOmniTikU-5HnD</td><td>7442A-OMNTK5HND</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。操作受以下两个条件约束：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。其操作获准满足以下两个条件：(1) 设备不得产生干扰，且 (2) 设备用户必须接受所受到的任何无线电干扰，即使该干扰可能影响设备的正常运行。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

在 5150–5250 MHz 频段运行的设备仅限室内使用，以减少对同信道移动卫星系统造成有害干扰的可能性。

在 5 150 至 5 250 MHz 频段内工作的设备仅限室内使用，以减少对使用相同信道的移动卫星系统造成有害干扰的风险。

**重要：射频辐射暴露。**

本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备安装和操作时，辐射体与人体任何部位之间的最小距离应为 20 厘米。

**天线安装警告：** 安装人员有责任确保在加拿大（或适用 IC 规则的地区）使用授权天线时，仅使用已通过本产品认证的天线。安装人员应根据国家/地区法规和每种天线类型配置天线的输出功率水平。带连接器的设备需要专业安装，以确保符合健康和安全要求。

**经批准的 5 GHz 天线列表：**

- 8.5 dBi 全向天线（型号：MT-482016/N/A）
- 24 dBi 平板天线（型号：PA58-24-ANT）
- 32 dBi 碟形天线（型号：HDDA5W-32-DP2）根据认证，也可以使用与上述所列天线相同类型且增益更低的天线。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射器功率</th></tr></thead><tbody><tr><td>5150-5350 MHz, 5650-5850 MHz</td><td>≤100 mW</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

设备制造日期信息位于其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

频率范围（最大输出功率）：5725-5850 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其非预期运行的干扰。制造商：MikroTikls SIA, Unijas iela 2, Riga, LV-1039, 拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息领域国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA, Unijas iela 2, 里加, 拉脱维亚, LV1039.

工作频率（最大输出功率）：5470-5725 MHz（27 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备，必须按照 НКРЗІ 2012 年 11 月 1 日第 559 号决定批准并在乌克兰司法部 2013 年 1 月 3 日第 57/22589 号登记的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Unijas iela 2. 里加，拉脱维亚，LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>5470-5725 MHz</td><td>100 - 140</td><td>27 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

**客户有责任遵守所在国家/地区的规定，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装！**

本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限制。有关更多详细信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定，满足最大 WLAN 发射功率限制。有关更多详细信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规，满足最大 WLAN 发射功率限制。有关更多详细信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限制。有关更多详细信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 法规规定的最大 WLAN 发射功率限制。有关更多详细信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规则，满足最大 WLAN 发射功率限制。有关更多详细信息，请参阅上文的符合性声明。
