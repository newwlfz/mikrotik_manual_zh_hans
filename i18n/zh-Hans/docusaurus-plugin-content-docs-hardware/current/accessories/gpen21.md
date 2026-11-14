---
title: "GPEN21"
slug: /gpen21
source: https://manual.mikrotik.com/hardware/gpen21
captured_at: '2026-11-04T09:48:47+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/9c8119e8b8d823fd.jpg)

GPEN21 可以使用与 DC 输入插孔相同的电压，通过以太网为支持 PoE 的设备供电。完整规格和手册请参见 [GPEN21 产品页面](https://mikrotik.com/product/gpen21)。

## 供电 {#powering}

该设备可通过直流输入电源插孔（外径 5.5 mm、内径 2 mm，母头，正极插头）供电，12-57 V DC⎓。最大功耗 50 W。

## 电源输出 {#power-output}

该设备支持从盖板下方的以太网端口进行 PoE 输出。您可以为支持被动式以太网供电的 MikroTik 设备供电。

GPEN21 具有以太网端口和 SFP 端口，用于光纤连接。客户可以选择使用 GPEN21 为光模块供电，以便通过光纤上行至运营商，**或者提供 PoE** 为以太网上行至运营商（使用我们的 GPeR 和/或 netPower 产品）供电，这两者不能同时使用。

## Mode 按钮 {#mode-button}

保留供将来使用。

## 安装 {#mounting}

**步骤 1：**

-

使用 PH2 螺丝刀卸下盖板螺丝；

-

取下盖板以接触安装点。**步骤 2：**

-

使用钻头钻孔；

-

如有需要，插入膨胀螺管；

-

将设备安装到墙上并用螺丝固定。步骤 1.步骤 2.

![](/img/c0ad2cbfa8e4ae4e.webp)

**步骤 3：**

- 插入连接到待供电设备的以太网线；
- 插入 GPEN 的电源。
- 输出的以太网线可以穿过位置 A 或 B 引入墙内。步骤 4：
- 重新装回盖板；
- 用螺丝固定盖板；
- 使用贴纸遮盖螺丝位置。

![](/img/72395d5cce047981.webp)

步骤 3.步骤 4. 在墙上安装时，请确保线缆出口朝下。

## 重置与重新安装 {#reset-and-reinstall}

GPEN21 内置备份 SwOS 固件，可在标准固件损坏或升级失败时加载：

在设备启动时按住 Reset 按钮几秒钟，将重置配置并加载备份固件。Reset 按钮位于前盖板后面。加载备份固件后，可以使用网页浏览器连接到 192.168.88.1（或从 DHCP 服务器获取的地址）并安装新的 SwOS 固件。

## 配件 {#accessories}

包装内包含以下随设备提供的附件：

- K-62 螺丝套件包含四颗螺丝和用于墙面安装的膨胀螺管。请参见 [MikroTik SFP 模块兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。

## 规格 {#specifications}

[https://i.mt.lv/cdn/product_files/GPEN_concept_200204.pdf](https://i.mt.lv/cdn/product_files/GPEN_concept_200204.pdf)

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供针对有害干扰的合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），建议用户尝试通过以下措施之一来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：未经合规责任方明确批准的任何更改或修改，可能会使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分的规定。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。注意：本设备在外围设备上使用屏蔽线缆进行了测试。必须使用屏蔽线缆连接本设备以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes: (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

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

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
