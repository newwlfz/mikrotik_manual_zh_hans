---
title: "mANT 系列"
slug: /mant-series
source: https://manual.mikrotik.com/hardware/mant-series
captured_at: '2026-11-04T06:01:36+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **mANT 19S** (MTAS-5G-19D120)
- **mANT 15s** (MTAS-5G-15D120)

:::

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。在将系统连接到电源之前，请阅读安装说明。本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责就安装结构的完整性取得当地主管部门/检验部门要求的任何当地或国家安全检查。在任何墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。设备的安装必须符合当地和国家的电气规范。本设备设计为安装在室外的立杆上。开始安装之前，请仔细阅读安装说明。**未使用正确的硬件和配置或未遵循正确的操作步骤，可能对人员造成危险情况并对系统造成损坏。** 我们无法保证因不当使用天线而不会发生事故或损坏。请小心使用本产品，风险自负。**当使用连接到 MikroTik 设备的天线时，为确保符合当地法规，设备需要升级到 RouterOS v6.48.3 或最新版本。**

客户有责任遵守当地国家的法规，包括在合法的频段内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电天线必须由专业人员安装。

mANT 是一款带有两个 RP-SMA 连接器的双极化天线，有两种尺寸：15dBi 型号和 19dBi 型号。两款天线的波束宽度均为 120 度

## 首次使用 {#first-use}

- 用手拧下盖板螺丝；
- 打开盖子；
- 将线缆连接到天线的 RP-SMA 连接器；
- 确保设备已断电，然后将线缆连接到设备；
- 安装并固定组件。

## 安装 {#mounting}

**mANT 15s** 配备 QuickMount 转接件，可使用随附的螺丝将其固定在墙上，或使用随附的金属安装环将其固定在立杆上。通过 QuickMount 可以对天线进行水平和垂直调节。

- 将快装支架安装到天线背面。

<p><Img src="/img/45d623b2886f4717.webp" alt="" width={592} height={798} /></p>

<p><Img src="/img/f1b9c851a1837362.webp" alt="" width={560} height={786} /></p>

- 将天线安装到立杆上。
- 使用随附的钢制卡箍将其固定。夹紧直径 35 – 70 mm。

<p><Img src="/img/006d6b97c4c91436.webp" alt="" width={389} height={330} /></p>

- 请避免将松动的以太网线缆连接到以太网端口，请将线缆固定在墙壁或立杆上，以免线缆的重量拉扯端口。建议将以太网线缆固定在天线 2m 以内的位置。这样可以确保线缆不会因其重量而损坏端口，也不会脱落。我们建议使用 Cat6 屏蔽线缆。

**mANT 19s** 配备金属立杆支架，可夹紧在金属立杆上。

- 将安装底座安装到天线背面。
- 使用安装支架将天线安装到立杆上。
- 用支架和螺丝固定天线。

<p><Img src="/img/605f9373d3b55718.webp" alt="" width={610} height={828} /></p>

- 调整所需的方位。

请避免将松动的线缆连接到连接器，请将线缆固定在墙壁或立杆上，以免线缆的重量拉扯端口。建议将线缆固定在天线 2m 以内的位置。这样可以确保线缆不会因其重量而损坏连接器，也不会脱落。

配件可单独购买：

Flex-guide

<p><Img src="/img/beb93a76913dfa9e.webp" alt="" width={139} height={111} /></p>

## 接地 {#grounding}

安装基础设施（塔架和桅杆）以及路由器本身都必须妥善接地。天线在机壳门后设有一个接地线连接螺丝。将接地线连接到接地螺丝，然后将接地线的另一端连接到已接地的桅杆上。这可大幅降低静电（ESD）和雷击损坏的风险。

<p><Img src="/img/f5b76b224e6106fb.webp" alt="" width={414} height={320} /></p>

天线带有一个接地连接点（标记为 ⏚）。

## 打开盖子 {#opening-cover}

要打开盖子，请用手逆时针旋转松不脱螺丝并将其掀起。

<p><Img src="/img/c9aa40a174a2b89d.webp" alt="" width={310} height={220} /></p>

## 随附部件 {#included-parts}

<p><Img src="/img/2da781ba7a16e5d7.webp" alt="" width={540} height={215} /></p>

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备制造日期的信息，以斜杠分隔的形式标示在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），后面两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## Norma Oficial Mexicana {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：Mikrotīkls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
