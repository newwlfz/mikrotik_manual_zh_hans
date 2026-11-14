---
title: "GPeR"
slug: /gper
source: https://manual.mikrotik.com/hardware/gper
captured_at: '2026-11-04T09:49:32+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/e8f113e9ffa4a9cf.jpg)

千兆无源以太网中继器。完整规格和宣传册请参见 [GPeR 产品页面](https://mikrotik.com/product/gper)。

## 连接 {#connecting}

- 将带有供电的所需网线连接到 PoE in 以太网端口，并通过 PoE out 延伸出去。
- 将网线连接到下一台 GPeR 设备或其他设备。
- 检查线路上的最终设备，确认 PoE 兼容性；如不需要，可使用跳线手动禁用 PoE out，参见章节（链接）

## 供电 {#powering}

设备需要通过以太网端口供电：

- 以太网端口接受无源 PoE 或 802.3af/at DC 24 - 57 V**⎓**。最大负载下的功耗可达 2 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网电缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的以太网电缆连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

### 跳线用法 {#jumper-usage}

如果目标设备不支持 PoE 供电，可以通过拔掉 "PoE out" 一侧的两个跳线来手动禁用功率直通。只有当 "PoE in" 由无源 PoE 电源供电时，此方法才有效，因为 802.3af/at 交换机无法为 GPeR 本身供电。

![](/img/40a38cccc4464fb0.webp)

- 重新安装跳线时，请注意如下图所示的水平位置：当四个跳线全部连接时，GPeR 可在两个方向上工作。

## 安装 {#mounting}

本设备设计为室内使用，本设备的 IP 防护等级为 IPX0。可以使用设备安装支架上提供的螺丝孔将设备固定在墙上。

在户外使用时请使用防水外壳。[https://mikrotik.com/product/gper_ip67_case](https://mikrotik.com/product/gper_ip67_case)

![](/img/b5d6e1d2bbe79b6f.webp)

建议使用 Cat5/6 电缆。*本设备的安装和配置应由具备资质的人员完成。*

## 扩展插槽和端口 {#extension-slots-and-ports}

- 两个千兆以太网端口。

## LED 状态 {#led-status}

设备具有两个 LED，用于指示每个已连接以太网端口的工作状态。

## 配件 {#accessories}

包装中包含随设备提供的以下附件：

- 带螺丝和膨胀螺栓的安装支架。

## 规格 {#specifications}

尺寸单位为毫米。

![](/img/8cd493f0b55ddbba.webp)

IP68 外壳可单独购买，[https://mikrotik.com/product/gper_ip67_case](https://mikrotik.com/product/gper_ip67_case)

![](/img/5bef20a42d5210de.webp)

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/gper](https://mikrotik.com/product/gper)

## MikroTik 移动应用 {#mikrotik-mobile-app}

![](/img/8d294e5cd375c591.webp)

![](/img/9bcba09a7b6a0d53.webp)

使用 MikroTik 智能手机应用，可通过 GPeR 在现场配置您的路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。扫描二维码并选择您首选的操作系统。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供针对有害干扰的合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：未经合规负责方明确批准的任何更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得产生有害干扰，且 (2) 本设备必须接受接收到的任何干扰，包括可能导致意外操作的干扰。注意：本设备使用屏蔽电缆与外围设备进行了测试。必须使用屏蔽电缆与本设备配合使用以确保合规。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可证 RSS 标准。操作须满足以下两个条件：(1) 本设备不得产生干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes: (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备制造日期的信息以斜杠分隔的形式标在其标签序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），其后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。

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

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
