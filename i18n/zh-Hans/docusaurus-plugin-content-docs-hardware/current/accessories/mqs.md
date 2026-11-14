---
title: "MQS"
slug: /mqs
source: https://manual.mikrotik.com/hardware/mqs
captured_at: '2026-11-04T09:56:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

The MQS – Mobile Quick Setup 是一款微型无线设备，旨在简化现场的 MikroTik 设备配置。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵循所有国家法律法规。设备的安装必须符合当地和国家的电气规范。本设备设计用于安装在机架中。开始安装前，请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。本产品仅供室内安装。请使本产品远离水、火、潮湿或高温环境。仅使用制造商认可的电源和附件，它们可在本产品的原包装中找到。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！如果设备发生故障，请断开其电源。最快的方法是拔出电源插座上的电源插头。客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置应与您的身体、职业使用者或公众保持不小于 20 厘米的距离。

## 快速开始 {#quickstart}

- 通过 USB 为设备供电，例如使用笔记本电脑或移动电源。
- 在笔记本电脑或智能手机上，连接到以 "RBMQS" 开头的 MQS 无线网络。
- 默认情况下，MQS 已在无线接口上启用 DHCP 服务器。
- 管理接口的 IP 地址为 192.168.88.3。以避免与其他 MikroTik 设备冲突。
- 在网页浏览器中打开 [https://192.168.88.3](https://192.168.88.3) 开始配置，没有密码，用户名为：admin（或者，对于某些型号，请查看贴纸上的用户和无线密码）。
- MQS 没有 RouterOS 软件，其配置功能有限。

## LED 指示灯 {#led-indicators}

![](/img/bd620b29224a6a8f.webp)

- 该 LED 显示 POE 处于活动状态。
- 显示以太网端口的连接处于活动状态。
- 显示接入点模式。
- 显示 station 模式。
- 用户 LED 表示设备当前处于出厂固件，更新后将不再点亮；若要使设备回到出厂固件，请在启动时按住 reset 按钮，LED 会再次亮起。
- 电源 LED 表示设备正在接收供电。

## 安装 {#mounting}

如有需要，可以使用扎带穿过设备背面的开口进行固定，或使用随附的绑带，或使用壁挂支架。本设备的 IP 防护等级为 IPX0。为符合健康法规，安装和使用本设备时应与身体保持至少 20cm 的距离。

## 供电 {#powering}

- MicroUSB 端口接受 5 V 供电。
- 以太网端口接受无源 PoE 12-28 V DC 供电（需补偿线缆损耗，因此建议高于 12 V）。最大负载下的功耗可达 7 W，无连接附件时为 1 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 POE 适配器的 POE+DATA 端口。
- 将来自本地网络（LAN）的以太网线连接到 POE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

我们建议从这里开始熟悉各项功能：[https://mt.lv/help](https://mt.lv/help) WinBox 和 MikroTik 移动应用可通过 MQS 配置其他设备。MQS 本身只能在网页界面中配置。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 内置 2 GHz 无线接入点模块，支持 AP/station/bridge/p2p 模式。板载内置 PIF 天线。
- 一个 10/100 以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X）。连接其他网络设备时可以使用直通线或交叉线。以太网端口接受 12-28 V DC 供电，并且能够输出 POE。
- 一个 micro-USB 2.0 端口，仅用于供电。

## 按钮和跳线 {#buttons-and-jumpers}

### 复位按钮 {#reset-button}

在启动期间按住此按钮，可将软件和固件恢复为出厂设置。

### 模式按钮 {#mode-button}

默认情况下，MQS 会以 AP 模式启动；如果在启动期间按住此按钮，MQS 将以 station 模式启动。这些模式可通过 quick-set 菜单进行调整。

## 配件 {#accessories}

包装中包含以下随设备提供的附件：

- USB A 公头直头转 Micro USB 公头扁平线缆，L=100 mm，无数据引脚。
- 魔术贴绑带 16x300 mm（带橡胶背衬）。
- 塑料扎带 4.8 mm（宽），157 mm（长），尼龙，黑色。
- K-33 紧固套件。
- MQS 安装支架。

## 规格 {#specifications}

如需了解有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/mqs](https://mikrotik.com/product/mqs)

## 升级 {#upgrading}

为使设备保持最新状态，请访问我们 MQS 产品的支持与下载部分，并检查最新的软件版本：

- 访问 [https://mikrotik.com/product/mqs#fndtn-downloads](https://mikrotik.com/product/mqs#fndtn-downloads)
- 下载固件 "MQS current release"；
- 使用网页浏览器连接到 MQS；
- 选择 Upgrade 选项卡；
- 点击 "Choose File" 按钮并浏览到已下载的文件；
- 点击 Upgrade 按钮并等待设置完成。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCCID</th></tr></thead><tbody><tr><td>RBMQS</td><td>TV7MQS</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装中的有害干扰提供合理防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），则建议用户尝试通过以下一种或多种措施来消除干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其运行需满足以下两个条件：（1）本设备不得造成有害干扰，且（2）本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。本设备及其天线不得与任何其他天线或发射器共址或联合运行。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的射频辐射暴露限值。安装和操作本设备时，辐射体与身体任何部位之间应保持至少 20 cm 的距离。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>RBMQS</td><td>7442A-MQS</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。其运行须满足以下两个条件：（1）本设备不得造成干扰，且（2）本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。其使用须满足以下两个条件：（1）设备不得产生干扰，且（2）用户必须接受设备受到的任何无线电干扰，即使该干扰可能影响其正常运行。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。安装和操作本设备时，辐射体与身体任何部位之间应保持至少 20 cm 的距离。本设备符合 IC 针对非受控环境规定的辐射暴露限值。安装和操作本设备时，辐射体与身体任何部位之间应保持至少 20 cm 的距离。

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射功率</th></tr></thead><tbody><tr><td>2400-2483.5 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用频段可能因产品型号和认证而异。

设备生产日期信息以斜杠分隔的形式标注在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位），随后的两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 МГц（20 дБм）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备，须按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，登记号 57/22589）批准的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RBMQS 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>频率范围（适用于相关型号）</th><th>使用的信道</th><th>最大输出功率（EIRP）</th><th>限制</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！*
