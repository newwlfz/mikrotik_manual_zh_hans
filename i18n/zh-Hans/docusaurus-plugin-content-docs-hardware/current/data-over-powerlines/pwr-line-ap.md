---
title: "PWR-LINE AP"
slug: /pwr-line-ap
source: https://manual.mikrotik.com/hardware/pwr-line-ap
captured_at: '2026-11-04T06:02:52+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/ed0b0664d647ce4c.webp" alt="" width={751} height={768} /></p>

PWR-LINE 系列设备允许受支持的设备之间通过普通电力线实现类似以太网的连接。当插入同一个电路时，PWR 设备将使用 HomePlug AV 标准建立以太网连接。PWR-LINE AP 是一款无线接入点，具有一个以太网端口、内置 802.11b/g/n WiFi 接入点以及集成的 PWR-LINE 支持。只需将此设备直接插入 MikroTik 路由器的其中一个 LAN 端口，并在您场所中的更远处再添加一台，即可扩展无线网络覆盖范围，而无需安装任何 LAN 线缆。您可以安装更多 PWR-LINE 设备来进一步构建网络，最多支持八台设备。

## 连接 {#connecting}

- 将一台 PWR-LINE AP 设备插入电源插座。
- 主设备应插入路由器的其中一个 LAN 端口。
- 其他 PWR-LINE AP 设备可以放置在同一电力电路中的任意插座上的任意位置。
- 使用 WinBox 的 "Neighbors" 选项卡来发现 PWR LINE 单元的地址。
- 由于默认没有密码，您将自动登录（或者，对于某些型号，请查看贴纸上的用户和无线密码）。请设置您的 wifi 密码和您所在的国家/地区，以确保遵守当地法规。
- 要添加更多通过电力线连接的设备，请在同一电力电路中的某处添加兼容设备。有关如何配对单个 PWR-LINE 设备的信息，请参见“按钮和跳线”一节。重要提示！该设备被配置为网桥，用于扩展您的 LAN 网络。默认情况下，它没有密码或防火墙，在未进行相应配置的情况下不应直接连接到互联网。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下来自互联网端口的所有访问均被阻止）。出于恢复目的，可以从网络启动设备，请参见章节（链接）。

## 供电 {#powering}

该设备可直接由其插入的 100-240 V ~50/60Hz 墙壁插座供电。最大负载下的功耗可达 7 W。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个 10/100 以太网端口，支持自动交叉/直通线缆修正（Auto MDI/X），因此您可以使用直通或交叉线缆连接其他网络设备。
- 集成 2.4 GHz 802.11b/g/n 无线，带板载 PIF 天线，最大增益 1.5 dBi。

## 按钮和跳线 {#buttons-and-jumpers}

PWR-LINE AP 具有以下按钮：

### 复位按钮 {#reset-button}

- 在设备上电前按住按钮，上电时该按钮将强制加载备份引导加载程序。继续按住该按钮以使用此按钮的另外两项功能。
- 当绿色 LED 开始闪烁时松开按钮，以重置 RouterOS 配置。若不想加载备份引导加载程序，您可以在已经通电后再开始按住按钮。
- 在 LED 不再闪烁后（约 20 秒）松开按钮，使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 所需）。无论使用上述哪种方式，如果在设备通电前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

### Sync 按钮 {#sync-button}

- 按住 0.5 – 3 秒。设备将在 120 秒内尝试与另一台 PWR-LINE 设备通信。橙色 LED 闪烁表示它处于搜索模式。您还必须对另一台 PWR 设备执行相同操作，以便它们能够同步。再次按按钮可取消搜索。您也可以在 RouterOS 设置中手动设置安全密钥。
- 按住 5 – 8 秒。将生成新的安全密钥。这用于将 PWR-LINE 设备从现有 PWR 网络中移除。
- 按住 10 – 15 秒。重置所有与 PWR 相关的设置。

### Mode 按钮 {#mode-button}

可以通过 RouterOS 软件配置此按钮来执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。

## 注意事项 {#notice}

- 5.470-5.725 GHz 频段不允许用于商业用途。
- 如果 WLAN 设备的工作范围与上述规定不同，则必须对终端用户设备应用来自制造商/供应商的定制固件版本，并防止终端用户重新配置。
- 户外使用：终端用户需要获得 NTRA 的批准/许可。
- 任何设备的数据表均可在制造商官方网站上获取。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限于 2.400 – 2.4835 GHz，发射功率限于 20dBm（EIRP）。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限于 5.150 – 5.250 GHz，发射功率限于 23dBm（EIRP）。
- 序列号末尾带有字母“EG”的产品，其无线频率范围限于 5.250 – 5.350 GHz，发射功率限于 20dBm（EIRP）。

请确保设备具有锁定包（来自制造商的固件版本），必须将其应用于终端用户设备，以防止终端用户重新配置。产品将标记国家代码“-EG”。本设备需要升级到最新版本，以确保符合当地主管机构的规定！终端用户有责任遵守当地国家/地区法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。

## 操作系统支持 {#operating-system-support}

该设备支持版本号等于或高于 RouterOS 菜单 /system resource 中所指示版本的 RouterOS 软件。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场所处置。请熟悉您所在地区将设备正确运输到指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID: TV7PL64112ND 本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的有害干扰防护。

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再开启设备来确定），则建议用户尝试通过以下一项或多项措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。**FCC 警告：** 任何未经合规责任方明确批准的更改或修改都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分的规定。其操作须符合以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射器同地放置或共同操作。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

IC: 7442A-PL64112ND 本设备符合加拿大工业部免许可 RSS 标准。其操作须符合以下两个条件：(1) 本设备不得造成干扰，并且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射机功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频率信道可能因产品型号和认证而异。

有关设备制造日期的信息，以其标签上序列号末尾、用斜杠分隔的数字表示。第一位数字表示年份编号（年份的最后一位数字），随后两位数字表示周编号。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准（Norma Oficial Mexicana） {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信和信息领域国家监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2480-2483.5 МГц（20 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需要按照 NCRFI 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 PWR-LINE AP 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家/地区法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装！*
