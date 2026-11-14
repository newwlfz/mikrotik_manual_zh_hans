---
title: "GPeRx4"
slug: /gperx4
source: https://manual.mikrotik.com/hardware/gperx4
captured_at: '2026-11-04T09:49:07+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/9723c1c72c350da8.jpg)

使用紧凑耐用的 GPeR14i，轻松将单个高功率 PoE 端口拆分为多个标准 PoE 连接。轻松扩展、延伸并为您的网络供电！

## 安全警告 {#safety-warnings}

在操作任何 MikroTik 设备之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。仅使用制造商批准且可在本产品原包装中找到的电源和配件。本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责确保设备安装符合当地和国家电气规范。请勿尝试拆卸、维修或改装设备。本产品适用于户外。开始安装前，请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的程序，可能会对人员造成危险情况并损坏系统。我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！如果设备发生故障，请将其断电。最快的方法是将电源适配器从电源插座中拔出。

## 连接 {#connecting}

- 同时按下下壳体两侧的按钮以解锁外壳，然后取下设备盖板；
- 将线缆穿过壳体底部的橡胶密封圈；
- 将带有供电的所需网线连接到 PoE in 以太网端口，并通过 PoE out 端口延伸；
- 将线缆连接到下一台设备或另一台 GPER14i 设备；

## 供电 {#powering}

本设备提供两种不同的供电选项：

- 第一个以太网端口是 PoE-in，支持 802.3bt，并接受 48 至 57V⎓ 范围内的直流电压。
- 两针连接器兼容 24 至 57V⎓ 范围内的直流电压。
- 您可以使用两针连接器为另一台 GPER14i 设备供电。为此，请将本设备连接到另一台 GPER14i 设备的两针连接器，并确保 SwOS Lite 系统的 "Power I/O" 选项配置为 "Output"。要启用此操作，本设备本身必须通过 PoE-in 供电。输出功率警告：请确保设备的功耗不超过供电设备的输入功率容量，并考虑其当前负载。

最大功耗：115W。需要注意的是，所有其他端口的功耗限制为 30W

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

-

将设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口。

-

将以太网线从本地网络（LAN）连接到 PoE 适配器。

-

将电源线连接到适配器，然后将电源线插入电源插座。连接两针连接器：

-

将正极线连接到 + 插槽。

-

将负极线连接到 - 插槽。

## 接地 {#grounding}

接地线应连接到 RouterBOARD 接地线连接点。然后，该线应连接到安装位置的基座，确保连接符合接地标准。不包含 M4 接地螺丝。

## 安装 {#mounting}

本设备专为户外使用而设计，其 IP 防护等级为 IP68。可使用设备安装支架上提供的螺孔将设备固定在立柱上。

建议使用 Cat5/6 线缆。*本设备的安装和配置应由合格人员完成。*

## 扩展插槽和端口 {#extension-slots-and-ports}

- 1 个 PoE-in 802.3bt 千兆以太网端口。
- 3 个 PoE-out 802.3af/at 千兆以太网端口。
- 1 个两针连接器直流电源电压插槽，范围为 24 至 57V⎓。

## LED 状态 {#led-status}

只有在打开壳体时才能看到设备的 LED 指示。

- DC-in 状态 LED。
- DC-out 状态 LED。
- 以太网端口活动状态 LED。
- PoE-out 状态 LED

## 复位按钮 {#the-reset-button}

复位按钮位于面板上，可在打开壳体的情况下使用。按住此按钮，直到 DC-in LED 灯开始闪烁，松开按钮即可将配置重置为默认值。

## 配件 {#accessories}

包装内包含以下随设备提供的配件：

- 带螺丝和膨胀管的安装支架。

## 规格 {#specifications}

尺寸：高 x 宽 x 深，mm：280 x 75 x 70 mm

![](/img/38e5784c8f7d0478.webp)

![](/img/e45facbeb60bb470.webp)

![](/img/7b92052359fcdf3b.webp)

有关本产品、规格和图片的更多信息，请访问我们的网页：[https://mikrotik.com/product/gper](https://mikrotik.com/product/gper)

## 配置 {#configuration}

本设备运行 SwOS Lite 操作系统。

- 将 PC 的 IP 设置为 192.168.88.2/24；
- 将 PC 连接到任意未使用的以太网端口；
- 打开 Web 浏览器，默认 IP 管理地址为 192.168.88.1，用户名为 **admin**，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 从 [https://mikrotik.com/download](https://mikrotik.com/download) 下载最新版本的 SwitchOS Lite 软件；
- 在 Web 浏览器的 Upgrade 选项卡中上传文件，升级后设备将重启；
- 设置密码以保护设备。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装环境中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，不能保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一项或多项措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。

注意：本设备已使用外围设备上的屏蔽电缆进行测试。必须将屏蔽电缆与本设备一起使用以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：(1) 本设备不得产生干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备内含的免许可证发射器/接收器符合加拿大创新、科学与经济发展部（ISED）针对免许可证无线电设备适用的 CNR 标准。允许在以下两个条件下运行：1）设备不得产生干扰；2）设备必须接受任何接收到的无线电干扰，即使该干扰可能导致设备运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备制造日期信息以其标签上序列号末尾的斜杠后数字表示。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系卖家。

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其非预期运行的干扰。制造商：MikroTikls SIA, Unijas iela 2, Riga, LV-1039, 拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Unijas iela 2, Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
