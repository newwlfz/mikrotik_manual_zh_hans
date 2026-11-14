---
title: "RBM11G"
slug: /rbm11g
source: https://manual.mikrotik.com/hardware/rbm11g
captured_at: '2026-11-04T10:05:00+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危害，并熟悉防止事故的标准做法。本产品的最终处置应按照所有国家和地方的法律法规进行。将接入点安装到任何墙面上的所有安装方法均需获得当地管辖部门的认可。设备的安装必须符合当地和国家的电气规范。本产品设计用于安装在室外的立杆上，但也可以在室内安装。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能导致人员处于危险境地并对系统造成损坏。请仅使用制造商认可的电源和配件，这些均可在本产品的原始包装中找到。在将系统连接到电源之前，请先阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！如果设备出现故障，请将其断电。最快的方法是将电源插头从电源插座中拔出。客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。

## 首次使用 {#first-use}

- 插入 miniPCIe 卡（未随附），请参阅段落 。
- （可选）将设备安装到外壳中。
- 将天线线缆连接到 miniPCIe 卡，并将以太网线缆连接到千兆以太网端口。
- 插入电源线以开启设备。
- 我们建议使用 WinBox 连接到设备，默认 IP 地址为 192.168.88.1，用户名为 admin，无密码（或者对于某些型号，请查看贴纸上的用户名和无线密码）。

## 安装 {#mounting}

M11G 路由器供专业使用。每台设备均采用 ESD 防护包装。处理电气设备时，请遵守以下安全注意事项：

- 在拆包和处理电气组件时，请使用腕部接地带，以避免静电放电（ESD）损坏。
- 拆包后，请将路由器放置在防静电垫上。
- 安装设备时，请确保没有可能损坏或接触 PCB 板的物体。
- 请注意，ETH 和 DC 插孔伸出 PCB 板的边界。可使用 PCB 板上出厂提供的四个孔（位于设备每侧）将设备安装到您想要的位置。

## MiniPCIe 插槽 {#minipcie-slot}

安装 miniPCIe 模块应由具备资质的人员完成，处理电气设备时请遵循安全注意事项：

- 将设备放置在防静电垫上。
- 找到 miniPCIe 插槽并拆下出厂时固定的两颗螺钉。
- 将随附的厚导热垫贴到卡上，然后将卡安装到 miniPCIe 插槽中，使导热垫位于 PCB 和卡之间。
- 使用先前拆下的两颗螺钉将卡固定到位。
- 将灰色 uFL 连接器连接到调制解调器的 MAIN 天线连接器，将黑色线缆连接到辅助（或 AUX）连接器。
- 将较薄的导热垫贴到卡的顶部。
- 将设备安装到您想要的位置。安装好设备后，请将移动运营商的 SIM 卡芯片朝下插入 SIM 插槽。该插槽支持 miniSIM（2FF）。

## 供电 {#powering}

设备支持以下供电方式：

- 通过以太网端口进行无源 10-30 V PoE 供电。长线缆上需要更高的电压来补偿功率损耗。建议至少使用 18 V。
- 通过电源插孔直接输入 10-30 V。最大功耗 11 W。

## 启动过程 {#booting-process}

RouterOS 是所有 RouterBOARD 路由器的操作系统。请参阅文档：[https://mt.lv/help](https://mt.lv/help) 除以太网端口上的 IP 地址外，本设备未进行任何预配置。必须按照上述链接的文档手册应用其他配置。初始连接必须通过以太网线缆，使用 MikroTik WinBox 工具完成。应使用 WinBox 连接到默认 IP 地址 192.168.88.1，用户名为 admin，无密码。如果您希望从网络启动设备，例如使用 MikroTik Netinstall，请在启动时按住设备的复位按钮，直到 LED 灯熄灭，设备将开始寻找 Netinstall 服务器。如果无法使用 IP 连接，WinBox 工具也可用于连接到设备的 MAC 地址。更多信息请参阅文档。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个千兆以太网端口（支持 Auto MDI/X，因此您可以使用直通线或交叉线连接到其他网络设备）。该以太网端口可通过无源 PoE 注入器接受 10-30V DC 供电。
- miniPCIe 插槽，可用于 802.11 无线网卡或 3G/LTE 调制解调器。SIM 插槽适用于 miniPCIe 3G/LTE 调制解调器，未安装调制解调器时不具备任何功能。

## 按钮和跳线 {#buttons-and-jumpers}

RouterBOOT 复位按钮具有以下功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可复位 RouterOS 配置（总共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAPs 模式（总共 10 秒）。* 继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（总共 15 秒）。无论使用上述哪种方式，如果在设备通电前按下按钮，系统都将加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/m11g](https://mikrotik.com/product/m11g)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统未经测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

![](/img/90ba1c400fce0f3e.webp)

![](/img/25f50553ffd86eaf.webp)

![](/img/8d294e5cd375c591.webp)

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请了解您所在地区将设备正确运送到指定处置场所的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的保护，防止有害干扰。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再开启设备来确定），建议用户尝试通过以下一种或多种措施来纠正干扰：

- 调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以获得帮助。 **FCC 警告**：未经合规责任方明确批准的任何更改或改装都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致不良运行的干扰。注：本设备在测试时外围设备使用了屏蔽电缆。必须使用屏蔽电缆以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。其运行须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备运行不正常的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes: (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备的生产日期信息在其标签上序列号的末尾以斜杠分隔表示。第一位数字表示年份编号（年份的最后一位数字），随后的两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV-1039。

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
