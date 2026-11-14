---
title: "DynaDish 6"
slug: /dynadish-6
source: https://manual.mikrotik.com/hardware/dynadish-6
captured_at: '2026-11-04T09:48:03+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/b28805dc6f440e18.webp)

## [DynaDish 6](https://mikrotik.com/product/dynadish_6)（RBDynaDishG-6HnD） {#dynadish-6-rbdynadishg-6hnd}

DynaDish 6 采用了与我们成功的 5 GHz 型号相同的有效天线设计和外壳，但这款新设备工作在需要许可的 6GHz 频段。这意味着相比经常拥堵的 5 GHz 频段，干扰更少，从而获得更高的速度和更远的覆盖范围。通过工作在主流 WiFi 频段之上，您现在可以从繁忙的基站搭建无线链路，而不必忍受噪声问题。

它是一款简单且完全集成的产品，包含快速安装可靠的点对点链路所需的一切。

本产品不适用于无需许可的 ISM 频段。设备的使用受各国法规约束。可用性可能因经销商库存和国家法规而受到限制。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行处理。
- 设备的安装必须符合地方和国家电气规范。
- 本产品设计为安装在室外的抱杆上。使用错误的硬件和配置或未遵循正确的操作流程，可能会对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 使用以太网线将设备连接到随附 PoE 注入器的数据+电源端；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 通过 **WebFig** 或 **WinBox** 工具在 [https://mt.lv/WinBox](https://mt.lv/WinBox) 使用网页浏览器配置您的设备；提供多种配置方法以确保可访问性；
- 打开 [https://192.168.88.1](https://192.168.88.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后点击 MAC 地址。用户名为 "**admin**"，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保最佳性能、稳定性和安全更新；
- 在 "Quick Set" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 供电 {#powering}

设备接受来自无源 PoE 注入器的 12-30 V DC。功耗最高为 10 W。

## 启动过程 {#booting-process}

设备已预配置为无线客户端（CPE），您只需选择要连接的 AP 并设置设备密码。您可以在默认加载的 quickSET 选项卡中完成此操作。如果 IP 连接不可用，可以使用 WinBox 通过设备的 MAC 地址进行连接。如果您希望从网络启动设备，例如使用 MikroTik Netinstall，请在启动时按住设备的 RESET 按钮，直到 LED 灯熄灭，然后设备将开始寻找 Netinstall 服务器。有关使用 RouterOS 以及连接此设备的更多信息，请参阅我们的文档：+[https://mt.lv/help##](https://mt.lv/help##) 扩展插槽和端口

- 一个 10/100/1000 Gigabit 以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。
- 一个集成的无线 802.11a/n，2x2 MIMO，内置抛物面天线，最大增益 25dBi

## 按钮和跳线 {#buttons-and-jumpers}

RouterBOOT 复位按钮（RESET，前面板）具有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（总计 5 秒）
- 或者继续按住按钮，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（总计 15 秒）

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列在 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场所。请了解您所在地区将设备妥善运送到指定处置场所的相关流程。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID：TV7DYNADISHGAC

本设备经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装中的有害干扰提供合理保护。

本设备产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备可能会造成有害干扰，在这种情况下，用户需自行承担费用纠正干扰。

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

注：本设备在外围设备上使用屏蔽电缆进行了测试。必须使用屏蔽电缆连接本设备以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

IC：7442A-DYNADISHGAC

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 标准的免许可发射器/接收器。操作须符合以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备生产日期的信息在标签上序列号末尾以斜杠分隔的形式标出。第一位数字表示年份编号（年份的最后一位数字），后面两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准（Norma Oficial Mexicana） {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

本设备或装置可能不会造成有害干扰。本设备必须接受任何干扰，包括可能导致其非期望运行的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBDynaDishG-6HnD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
