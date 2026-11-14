---
title: "CSS610-8G-2S+IN"
slug: /css610-8g-2s-plus-in
source: https://manual.mikrotik.com/hardware/css610-8g-2s-plus-in
captured_at: '2026-11-04T09:47:29+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/76ea017a3909dedc.jpg)

八个 1G 以太网端口和两个用于 10G 光纤连接的 SFP+ 端口。便携、强大且极具性价比——这款交换机堪称经典！完整规格和宣传册请参见 [CSS610-8G-2S+IN 产品页面](https://mikrotik.com/product/css610_8g_2s_in)。

CSS610-8G-2S+IN

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵守所有国家法律和法规。设备的安装必须符合当地和国家的电气规范。本设备设计用于安装在机架中。请在开始安装前仔细阅读安装说明。使用不正确的硬件或不遵循正确的操作步骤可能会导致对人员造成危险的情况以及对系统造成损坏。本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。请仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员进行安装。

## 快速开始 {#quickstart}

- 从 [https://mikrotik.com/download](https://mikrotik.com/download) 下载最新的 SwitchOS 软件版本；
- 将您的计算机连接到任意一个以太网端口；
- 将设备连接到电源；
- 将您计算机的 IP 地址设置为 192.168.88.3；
- 打开您的 Web 浏览器，默认管理 IP 地址为 192.168.88.1 / 192.168.88.2，用户名为 **admin**，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 通过 Web 浏览器将文件上传到 Upgrade 选项卡，升级后设备将重启；
- 设置您的密码以保护设备。

## 供电 {#powering}

设备可从电源插孔或从第一个以太网端口（Passive PoE）接受供电。

- 直接输入电源插孔（外径 5.5mm、内径 2mm，母头，中心正极插头）可接受 12-57V DC。
- 第一个以太网端口可接受 12-57V DC 的 passive PoE 输入。
- 功耗 5 W，带附件时为 11 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网电缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自您本地网络（LAN）的以太网电缆连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

除了本文档中所述的内容之外，SwOS 还包含许多配置选项。我们建议从这里开始，以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 出于恢复目的，可以引导设备进行重新安装，请参阅“按钮和跳线”一节。

首次配置：[CSS610 系列 SwOS 手册](/docs/bridging-and-switching/swos/css610)；

设备升级 [https://mt.lv/upgrade](https://mt.lv/upgrade)；

## 扩展插槽和端口 {#extension-slots-and-ports}

- 八个独立的千兆以太网端口，支持自动交叉/直通线缆连接（Auto MDI/X），因此您可以使用直通或交叉线缆连接到其他网络设备；
- 2 个 SFP+ 端口，用于使用 10G SFP+；

## 规格 {#specifications}

请参见 [MikroTik SFP 模块兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。

## 安装 {#mounting}

本设备设计用于室内使用，可使用随附的机架安装件安装在机架机箱中，也可以放置在桌面上。如果指定用途为机架机箱，请使用十字螺丝刀将机架挂耳安装在设备两侧：

- 将机架挂耳安装到设备两侧，并拧紧四颗螺丝将其固定到位，如图所示。

![](/img/837a6d2bb5f312fe.webp)

- 将设备放入机架机箱，并对齐孔位，以便设备方便地安装到位。
- 拧紧螺丝将其固定到位。本设备不具备防水污染保护，请确保将设备放置在干燥且通风的环境中。*本设备的安装和配置应由合格人员完成。* *我们建议为我们的设备使用 Cat6 线缆。*

## 按钮和跳线 {#buttons-and-jumpers}

在启动期间按住此按钮，直到 LED 灯开始闪烁。松开按钮以重置 SwOS 配置并加载用于重新安装和升级的备份软件。

## 操作系统支持 {#operating-system-support}

本设备运行 SwOS，这是本设备唯一支持的操作系统。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场所处置。请熟悉将设备正确运输到您所在地区指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装提供合理的保护，防止有害干扰。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能造成有害干扰，在这种情况下，用户将被要求自行承担费用来纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致不良操作的干扰。

注意：本机在测试时外围设备使用了屏蔽电缆。本机必须使用屏蔽电缆以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备不良操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

EU 符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
