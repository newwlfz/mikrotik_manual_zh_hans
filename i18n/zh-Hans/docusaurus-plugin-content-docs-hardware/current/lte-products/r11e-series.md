---
title: "R11e 系列"
slug: /r11e-series
source: https://manual.mikrotik.com/hardware/r11e-series
captured_at: '2026-11-04T09:59:11+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/12c9810b3d1b4f4a.webp)

![](/img/87aa80d03beafd23.webp)

 R11e-LTE-US 是一款 Cat-4 调制解调器。它可以集成到任何带有 miniPCI-e 插槽的 MikroTik 产品中。

:::info 本文涵盖

- **R11e-LTE-US**
- **R11e-LTE**
- **R11e-4G**
- **R11e-LTE6**

:::

## 规格 {#specifications}

- 接口 – Mini-PCIe；
- 工作温度 -30°C .. +70°C
- LTE 信道带宽：1.4/3/5/10/15/20 MHz
- LTE 类别：4（150Mbps 下行，50Mbps 上行）
- 3G 类别：R7（Cat14 - 21.1Mbps 下行）
- LTE (FDD) 频段：2/4/5/12 (1900/1700/850/700)
- 3G 频段：2/5 (1900/850)

## 在设备中安装模块 {#installing-the-module-in-your-device}

R11e-TE-US 供专业使用。每张卡均采用 ESD 保护包装。处理电气设备时，请遵守以下安全预防措施：

- 在拆包和处理电气组件时使用腕部接地带，以避免静电放电（ESD）损坏；
- 拆包后，将卡放在防静电垫上；
- 安装时，确保没有可能损坏或接触 PCB 板的物体；
- 可以使用 PCB 板上出厂提供的螺丝孔将卡安装到所需设备中；
- 在设备上找到 miniPCIe 插槽；
- 拧下两个出厂附带的螺丝；
- 可选地，您可以将导热垫放在卡下方使用，包装中不包含导热垫；
- 将模块安装到 miniPCIe 插槽，并用之前拆下的螺丝固定。拧紧扭矩 0,3 Nm；
- 将天线线缆连接到模块上的接头：

![](/img/9130264c604e84bd.webp)

在户外安装时，请确保设备外壳防水且专为户外使用设计。*本设备的安装和配置应由合格人员完成。*

## 配置 {#configuration}

在由 MikroTik RouterOS 驱动的设备中使用时，该设备会被自动识别。配置可以在“Wireless”菜单中设置。有关 LTE 配置的更多信息，请参阅我们的文档：[LTE/5G 手册](/docs/mobile-networking/lte-5g)

该设备已使用 RouterOS v6 及以上版本进行测试。它可能与其他操作系统兼容，但卡中不包含驱动程序。

## 操作系统支持 {#operating-system-support}

该模块支持 RouterOS。其他操作系统尚未测试。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>R11e-LTE-US</td><td>TV7R11ELTE</td></tr><tr><td>R11e-LTE</td><td>无</td></tr><tr><td>R11e-4G</td><td>TV7R11E4G</td></tr><tr><td>R11e-LTE6</td><td>TV7R11ELTE6</td></tr></tbody></table>

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装中的有害干扰提供合理保护。本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，不能保证特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一种措施来纠正干扰：

- 重新调整或移动接收天线。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：未经合规责任方明确批准的任何更改或修改都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。运行须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。本设备及其天线不得与任何其他天线或发射器共置或协同运行。

**重要：射频辐射暴露。**

天线与职业用户之间必须保持至少 0,29m 的距离，与公众之间必须保持 0,64m 的距离。在此配置下，可满足 FCC 针对普通人群/非受控环境规定的辐射暴露限值。

**天线安装警告**

安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用经产品认证的天线。根据 FCC 规则 CFR47 part 15.204，明确禁止使用任何未经产品认证的天线。安装人员应根据国家法规和天线类型配置天线的输出功率水平。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>R11e-LTE-US</td><td>7442A-R11ELTE</td></tr><tr><td>R11e-LTE</td><td>无</td></tr><tr><td>R11e-4G</td><td>7442A-R11E4G</td></tr><tr><td>R11e-LTE6</td><td>7442A-R11ELTE6</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。运行须满足以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。其运行获准须满足以下两个条件：(1) 设备不得产生干扰，且 (2) 用户必须接受设备受到的任何无线电干扰，即使该干扰可能影响其正常运行。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## 致 OEM 集成商的重要通知 {#important-notice-to-oem-integrators}

-

本模块仅限 OEM 安装。

-

根据 Part 2.1091(b)，本模块仅限安装于移动或固定应用。

-

所有其他运行配置均需要单独批准，包括就 Part 2.1093 而言的便携式配置以及不同的天线配置

## UKCA 标记 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，RouterBOARD 型无线电设备符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>E-GSM-900</th><th>900 MHz / 33dB</th></tr></thead><tbody><tr><td>DCS-1800</td><td>1800 MHz / 30dB</td><td></td></tr><tr><td>WCDMA Band I</td><td>1922.4 MHz / 24dB ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>882.4 MHz / 24dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1700 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dB ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dB ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大 LTE 发射功率限值。有关更详细的信息，请参阅上文的符合性声明。
