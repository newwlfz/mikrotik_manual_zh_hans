---
title: "RB1100 系列"
slug: /rb1100-series
source: https://manual.mikrotik.com/hardware/rb1100-series
captured_at: '2026-11-04T06:03:36+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **[RB1100AHx4](https://mikrotik.com/product/rb1100ahx4)**
- **[RB1100AHx4 Dude Edition](https://mikrotik.com/product/RB1100Dx4)**
:::

<p><Img src="/img/4053195db135534a.jpg" alt="" width={799} height={551} /></p>

<p><Img src="/img/efb7383277cd62f2.webp" alt="" width={161} height={72} /></p>

RB1100 是一款可安装于机架的以太网路由器，具有 13 个千兆以太网端口。其中两个端口提供 bypass 功能。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品仅供室内安装使用。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，这些电源和附件可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员进行安装。

## 快速开始 {#quickstart}

- 将您的 ISP 线缆连接到 Ethernet1 端口，并将本地网络中的计算机连接到其他端口；
- 将设备连接到电源；
- 将您的网卡配置为 192.168.88.0/24 网段中的地址，因为设备默认未启用 DHCP 服务器；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行。**提供多种配置方法以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 以开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户密码和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

设备可通过机箱背面的双路/故障切换 IEC 电源接口供电。您可以单独使用其中任意一个接口，也可以同时使用两个接口以实现故障切换。设备还支持在以太网端口 13 上使用 12-57V 无源 PoE 或 802.3af/at PoE。设备还有一个接线端子，可用于 Telecom -48V DC 供电或 24-57 V 范围内的任何其他 DC 供电。

## 配置 {#configuration}

除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help) 开始，以熟悉各种可能性。如果无法建立 IP 连接，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问都会被阻止）。为便于恢复，可以从网络引导设备，请参阅复位按钮。

## 启动过程 {#booting-process}

首先启动 RouterBOOT 加载程序。它会在板载 RS232C 异步串行端口上显示启动信息。串行端口默认设置为 115200 bit/s、8 个数据位、1 个停止位、无奇偶校验。

随后 RouterOS 系统会加载。这也会由两声蜂鸣声指示。

您可以将计算机插入 Ether1 端口，并使用用户名 "**admin**" 和无密码（或者，对于某些型号，请查看贴纸上的用户密码和无线密码）连接到 192.168.88.1，从而通过 SSH、**WinBox** 或 Web 界面连接到设备。设备默认未启用 DHCP 服务器，您的 PC 应配置为该网段中的地址。

有关连接设备的更多信息：[https://mt.lv/help](https://mt.lv/help)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 13 个千兆以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X），因此您可以使用直通线或交叉线连接其他网络设备。ETH13 端口支持 PoE 供电，并可用于从网络引导设备，以便通过 Netinstall 工具重新安装（参见文档）
- DB9 RS232C 异步串行端口
- microSD 插槽
- 2 个 M.2 插槽，可接受 2280 外形尺寸的 SATA 类型 M.2 SSD 磁盘（仅限 Dx4 型号）
- 2 个 2.5 英寸 SATA 接口，可接受标准 2.5" SATA HDD 磁盘（仅限 Dx4 型号）

推荐使用无容量限制的 SATA3 M.2 2242mm/2260mm/2280mm B+M key SSD 磁盘。

## 复位按钮 {#reset-button}

复位按钮具有以下功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置。
- 或者继续按住按钮 5 秒钟，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器。

bypass 开关可将端口 11 和 12 以 bypass 模式绑定在一起，这意味着如果设备断电，这两个端口将被连接在一起，数据可以从一个端口传到另一个端口，就好像设备不存在一样。

无论使用上述哪种选项，如果在设备上电之前按下按钮，系统都会加载备份 RouterBOOT 加载程序。这对 RouterBOOT 调试和恢复很有用。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/rb1100ahx4](https://mikrotik.com/product/rb1100ahx4)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列在 /system resource 中。其他操作系统尚未经过测试。

<p><Img src="/img/9451b2eb2e7bf01c.webp" alt="" width={576} height={521} /></p>

## 安全提示 {#safety-notice}

触电危险。本设备只能由经过培训的人员进行维护。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废物处置场所。请了解将设备正确运送到您所在地区指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装环境提供合理的保护，防止有害干扰。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备可能会导致有害干扰，在这种情况下，用户将被要求自费纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不会造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。注意：本设备在测试时外围设备使用了屏蔽电缆。为确保合规，必须使用屏蔽电缆连接本设备。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可证 RSS 标准。操作须符合以下两个条件：(1) 本设备不得产生干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。本设备符合适用于免许可证无线电设备的加拿大工业部 CNR 标准。其运行须满足以下两个条件：(1) 设备不得产生干扰，且 (2) 用户必须接受设备所受到的任何无线电干扰，即使该干扰可能影响其正常运行。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备制造日期信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后面两位数字表示周编号。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准 {#norma-oficial-mexicana}

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
