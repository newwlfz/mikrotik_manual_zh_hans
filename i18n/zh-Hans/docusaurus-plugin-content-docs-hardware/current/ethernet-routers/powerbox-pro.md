---
title: "PowerBox Pro"
slug: /powerbox-pro
source: https://manual.mikrotik.com/hardware/powerbox-pro
captured_at: '2026-11-04T06:02:47+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/33cb1622c05d1793.jpg" alt="" width={799} height={617} /></p>

## [PowerBox Pro](https://mikrotik.com/product/RB960PGS-PB) (RB960PGS-PB) {#powerbox-pro-rb960pgs-pb}

PowerBox Pro 是一款室外设备，具有五个千兆以太网端口，并在端口 2-5 上提供 PoE 电源输出（每端口最大 1 A，总计最大 2 A）。完整规格和宣传册请参见 [PowerBox Pro 产品页面](https://mikrotik.com/product/RB960PGS-PB)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计为在户外立杆上安装。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险情况并损坏系统。
- 请仅使用制造商认可的电源和附件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 将 WAN 线缆连接到端口 1，并将其他设备连接到端口 2-5；
- 将设备连接到电源；
- 将网卡设置为通过 DHCP 自动获取 IP 地址；
- 应使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 设置路由器密码。

## 供电 {#powering}

本设备在不连接附件时的功耗为 6 W，最大功耗为 54 W。设备可通过电源插孔或第一个以太网端口（被动 PoE）供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 12-57 V DC。
- ether1 端口接受 12-57 V DC 的被动 PoE 输入。

## 安装 {#mounting}

可以使用随附的 DIN 导轨支架和螺钉将设备安装到 DIN 导轨上。由于设备具有防风雨的户外外壳，您可以使用随附的两根扎带或钢制卡箍将其安装在立杆上。接地线需要连接到设备背面专门设计的螺钉上。

<p><Img src="/img/6e287d9e7e2efacf.webp" alt="" width={300} height={488} /></p>

请确保安装设备时以太网端口朝下。

## 配置 {#configuration}

除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议先阅读 [RouterOS 文档](https://mt.lv/help) 以熟悉各项功能。如果无法建立 IP 连接，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的访问均被阻止）。出于恢复目的，可以从网络引导设备，请参见复位按钮。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个 10/100/1000 千兆以太网端口。
- 一个 SFP 端口。

## 电源输出 {#power-output}

设备支持被动或标准 802.3at/af PoE 输入/输出。以太网端口 2-5 可以使用与设备相同的电压为其他支持 PoE 的设备供电。需要操心的电源适配器和线缆更少！如果使用 48-57 V 输入电压，它可以为兼容 af/at mode B (4,5+)(7,8-) 的设备供电。每端口最大输出为 1 A，使用 12-30 V 输入电压时总计 2 A。使用 31-57 V 输入电压时，每端口功率限制为 450 mA。在 RouterOS 中启用电源输出后，以太网 LED 会额外显示红色（绿色表示以太网链路已建立，红色表示有电源但无链路，红色和绿色同时亮表示既有链路又有电源）。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 或者继续按住按钮 5 秒以上，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器。

无论使用上述哪种方式，如果在设备加电前按下按钮，系统将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 规格 {#specifications}

- CPU 标称频率：800 MHz。
- RAM 容量：128 MB。
- 存储：16 MB。
- 10/100/1000 以太网端口：5。
- SFP 端口：1。
- 交换芯片型号：QCA8337。
- 尺寸：125 x 52 x 225 mm。
- 工作温度：经测试为 -40°C 至 +70°C。

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/RB960PGS-PB](https://mikrotik.com/product/RB960PGS-PB)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

<p><Img src="/img/1891b912b88a23b9.webp" alt="" width={720} height={201} /></p>

## 安全提示 {#safety-notice}

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场所。请了解将设备正确运送到您所在地区指定处置场所的相关程序。

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备生产日期的信息以斜杠分隔的形式标注在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），后面两位数字表示周数。

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
