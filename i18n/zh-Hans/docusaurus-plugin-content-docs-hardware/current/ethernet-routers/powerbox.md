---
title: "PowerBox"
slug: /powerbox
source: https://manual.mikrotik.com/hardware/powerbox
captured_at: '2026-11-04T06:02:41+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/cb28f515f533d0a4.webp" alt="" width={800} height={729} /></p>

## [PowerBox](https://mikrotik.com/product/RB750P-PBr2) (RB750P-PBr2) {#powerbox-rb750p-pbr2}

PowerBox 是一款带五个以太网端口的室外设备。包装内包含 IEC 电源线、钢制卡箍、PoE 注入器、24 V 电源适配器和 DIN 安装架。完整规格和宣传册请参见 [PowerBox 产品页面](https://mikrotik.com/product/RB750P-PBr2)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于在室外安装在立柱上。开始安装前请仔细阅读安装说明。使用错误的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险情况并对系统造成损坏。
- 仅使用制造商认可的电源和附件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

- 将 WAN 网线连接到端口 1，将其他设备连接到端口 2-5；
- 将设备连接到电源；
- 将网卡设置为使用 DHCP 自动获取 IP 地址；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 完成。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保最佳性能、稳定性和安全更新；
- 设置路由器密码。

## 安装 {#mounting}

可以使用随附的 DIN 导轨支架和螺丝将设备安装到 DIN 导轨上。由于设备具有防风雨的室外外壳，您也可以使用随附的钢制卡箍将其安装在立柱上。

<p><Img src="/img/acc7dbfd27d05576.webp" alt="" width={274} height={312} /></p>

请确保安装时以太网端口朝下。

## 供电 {#powering}

该板可通过电源插孔或第一个以太网端口（被动 PoE）供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母座，中心正极插头）接受 8-30 V DC，
- 第一个以太网端口接受被动 Power over Ethernet，接受 8-30 V DC。

该设备的功耗为 2 W。

## 电源输出 {#power-output}

该设备可以通过其以太网端口为外部设备提供 PoE 供电。这很方便，因为您无需任何额外的 PoE 注入器就能为其他设备供电。此功能由设备型号名称中的字母 "P" 表示。输出电压将与输入电压相同，并且需要在 RouterOS 软件中为特定端口启用此功能。默认情况下它是禁用的。此模式下每个以太网端口的最大输出功率为 1 A（所有端口总计 2 A）。在 RouterOS 中启用 Power Output 后，以太网 LED 灯也会以红色亮起。红色 LED 表示该端口当前正在提供 PoE 供电，绿色表示以太网已建立链路，两者同时亮起表示以太网已建立链路且正在输出电源。

## 配置 {#configuration}

除了本文档中描述的内容之外，RouterOS 还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help) 开始，以熟悉各种可能性。如果无法建立 IP 连接，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问都会被阻止）。为便于恢复，可以从网络引导设备，请参见复位按钮。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个独立的以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 或者继续按住按钮 5 秒钟，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器。

无论使用上述哪种方式，如果在设备通电之前按下按钮，系统将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复非常有用。

## 配件 {#accessories}

包装内包含以下随设备提供的附件：

- IEC 电源线。
- 钢制卡箍。
- PoE 注入器。
- 24 V 电源适配器。
- DIN 安装架。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/RB750P-PBr2](https://mikrotik.com/product/RB750P-PBr2)

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

<p><Img src="/img/c7c684760aa47212.webp" alt="" width={723} height={212} /></p>

## 安全须知 {#safety-notice}

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废弃物处置场。请熟悉您所在地区将设备正确运送到指定处置场的相关程序。

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备生产日期的信息以斜杠分隔的形式标注在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），随后的两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## Norma Oficial Mexicana {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置不得造成有害干扰；且
- 本设备必须接受任何干扰，包括可能导致其非预期操作的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
