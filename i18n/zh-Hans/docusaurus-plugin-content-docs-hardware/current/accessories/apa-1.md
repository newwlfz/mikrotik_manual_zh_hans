---
title: "APA-1"
slug: /apa-1
source: https://manual.mikrotik.com/hardware/apa-1
captured_at: '2026-11-04T09:39:52+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/d8c6ffdcc1e351be.jpg)

APA-1 是一款带过压保护及其他安全功能的汽车电源适配器。完整规格和宣传手册请参见 [APA-1 产品页面](https://mikrotik.com/product/apa_1)。这些功能可保护您的 LtAP 及其他设备免受恶劣车载环境的损害。

## 安全警告 {#safety-warnings}

- 在对任何 MikroTik 设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。
- 本设备应由经过培训的合格人员按照本安装说明进行安装。安装人员负责确保设备安装符合当地和国家的电气规范。请勿尝试拆卸、维修或改装设备。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。

## 信息 {#information}

技术规格、宣传手册及更多产品信息请访问，如果您需要配置或安装方面的帮助，请咨询顾问 [https://mikrotik.com/consultants](https://mikrotik.com/consultants)

250

## 供电 {#powering}

- DC 输入数量 1（3 针端子）；
- 最小电压 12 V；
- 最大电压 48 V；
- 带负载时的最大功耗 100 W。

## 安装 {#installation}

输入与输出连接方案：

- GND - DC 负极端子。
- IN - DC 正极端子。
- EN - 使能降压转换器：高电平（9-60VDC）= 开启，低电平（0-1.2VDC）= 关闭，可与车辆点火开关配合以使能电压转换器，默认情况下跳线使能 **降压** 转换器。

![](/img/9f6d9f00f651daba.webp)

- PASS - 直通模式 - 经过保护电路后的输入电压，EN 输入不影响 PASS 输出。OUT 和 PASS 输出可同时使用，但 3A 输入保险丝限制了电流，因此输出功率预算取决于输入电压水平。电压选择跳线方案：

![](/img/bd28cf5cd22c2c38.webp)

*按照图片放置跳线以选择适当的电压。

## 安装 {#mounting}

- 使用随附的钢制支架并用螺丝将其固定到墙上，将设备固定在支架中。

![](/img/a6722750b90f425f.webp)

- 尺寸 86 x 16 x 31 mm。
- 工作温度 -40°C 至 +85°C。

## 配件 {#accessories}

包装内含：

- 紧固件套装。

## 产品上的符号 {#symbols-on-the-product}

![](/img/34b0a3ea7ac8712d.webp)

产品上可能出现以下符号：

- 表面可能变热。
- CE 标志。
- 请勿将电子设备作为未分类的城市垃圾处理。请使用单独的回收设施或联系购买本仪器的供应商。

![](/img/b8ac70bab39acb56.webp)

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装环境中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能造成有害干扰，在这种情况下，用户将被要求自行承担费用来纠正干扰。

**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分的规定。其操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致非期望操作的干扰。本设备及其天线不得与任何其他天线或发射器共址或联合运行。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。其操作须满足以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备非期望操作的干扰。

本设备符合加拿大工业部适用于免许可无线电设备的 CNR。允许在以下两个条件下操作：(1) 设备不得产生干扰，且 (2) 设备用户必须接受所受到的任何无线电干扰，即使该干扰可能影响其运行。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

Для получения подробных сведений о гарантийном обслуживании обратитесь к продавцу.

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

![](/img/6296cd0d81e0e5d3.webp)

制造商：MikroTikls SIA, Unijas iela 2, Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
