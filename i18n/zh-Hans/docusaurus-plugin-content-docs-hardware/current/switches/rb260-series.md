---
title: "RB260 系列"
slug: /rb260-series
source: https://manual.mikrotik.com/hardware/rb260-series
captured_at: '2026-11-04T09:59:38+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/fe10609610848792.jpg)

![](/img/bef265ac73043df8.webp)

:::info 本文涵盖

- **[RB260GS](https://mikrotik.com/product/RB260GS)**
- **[RB260GSP](https://mikrotik.com/product/RB260GSP)**

:::

CSS106 是一款带有五个以太网端口和一个 SFP 端口的网络交换机，由 SwOS 操作系统驱动。设备已完成配置，所有端口均已相互交换连接。我们建议您设置密码以保护您的设备。CSS106-1G-4P-1S 的四个以太网端口具备 PoE 输出能力。

已测试并建议与以下 MikroTik SFP 模块搭配使用：S-85DLC05D、S-31DLC20D 和 S-35/53LC20D（不随附）

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵循所有国家法律和法规。设备的安装必须符合当地和国家的电气规范。本产品适合室内安装。请让本产品远离水、火、潮湿或高温环境。请仅使用制造商认可且可在本产品原始包装中找到的电源和附件。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。客户有责任遵守当地国家的法规，包括在法定频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 供电 {#powering}

本设备在最大负载下的功耗最高为 11 W。设备可通过以下方式供电：

- 直流输入电源插孔（外径 5.5mm、内径 2mm，母头，中心正极插头）接受 11-30 V DC。
- 组合以太网端口接受无源 Power over Ethernet 11-30 V DC，不随附 PoE 注入器。

## 首次使用 {#first-use}

请参阅 SwOS 手册中的[连接到交换机](/docs/bridging-and-switching/swos/css106#connecting-to-the-switch)一节。

- 通过电源插孔（接受 11-30 V，设备随附电源适配器）或通过第一个端口的无源 PoE（11-30 V）为设备供电。
- 从 [https://mikrotik.com/download](https://mikrotik.com/download) 下载最新版本的 SwitchOS 软件；
- 将您的计算机连接到其中一个以太网端口；
- 将设备连接到电源；
- 将您计算机的 IP 地址设置为 192.168.88.2；
- 打开您的网页浏览器，默认 IP 管理地址为 192.168.88.1，用户名为 **admin** 且无密码（部分型号请查看贴纸上的用户和无线密码）；
- 在 Upgrade 选项卡中通过网页浏览器上传文件，升级完成后设备将重启；
- 设置您的密码以保护设备。

## 配置 {#configuration}

设备已设置为交换机模式，以 192.168.88.1 作为主接口的管理 IP。

SwOS 是一款专为管理 MikroTik 交换机产品而设计的操作系统。

SwOS 可通过您的网页浏览器进行配置。它为您提供受管交换机所需的所有基本功能以及更多功能：允许您管理端口到端口的转发、广播风暴控制、应用 MAC 过滤、配置 VLAN、镜像流量、应用带宽限制，甚至调整部分 MAC 和 IP 头字段。

配置详情请参阅 [CSS106 (RB260) 系列 SwOS 手册](/docs/bridging-and-switching/swos/css106)。

## 电源输出 {#power-output}

CSS106-1G-4P-1S 型号可通过其以太网端口为外部设备提供 PoE 供电。这非常方便，因为您无需任何额外的 PoE 注入器即可为其他设备供电。输出电压将与输入电压相同。默认情况下设置为 "auto"，因此将任何设备插入供电端口都是安全的。在此模式下，每个以太网端口的最大输出功率为 1 A，所有端口总计 2 A。一旦在 RouterOS 中启用 Power Output，以太网 LED 灯会从绿色变为红色。红色 LED 表示该端口当前正在提供 PoE 供电。为获得最佳的 PoE 输出性能，请使用电源插孔为 CSS 设备供电。

## 按钮和跳线 {#buttons-and-jumpers}

在启动期间按住此按钮，并在 LED 灯停止闪烁后松开，即可重置 SwOS 配置并加载主备份固件。访问主固件可重新安装主固件。

请参阅 SwOS 手册中的[重置](/docs/bridging-and-switching/swos/css106#reset)一节。

## 操作系统支持 {#operating-system-support}

CSS 运行 SwOS，这是此设备唯一支持的操作系统。更多信息请参阅 [SwOS 手册](/docs/bridging-and-switching/swos)。

![](/img/8d9ce79c77ac5eb2.webp)

### GSP 型号 {#gsp-models}

![](/img/8a35955d5856e1f3.webp)

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的有害干扰防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新定向或重新安置接收天线。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 注意：未经合规责任方明确批准的任何更改或修改都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其运行须符合以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受所收到的任何干扰，包括可能导致运行异常的干扰。注意：本设备已使用外围设备上的屏蔽电缆进行测试。必须使用屏蔽电缆与本设备配合，以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。其运行须符合以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备运行异常的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes: (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备生产日期信息以斜杠分隔的形式标示在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），其后两位数字表示周数。

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

欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
