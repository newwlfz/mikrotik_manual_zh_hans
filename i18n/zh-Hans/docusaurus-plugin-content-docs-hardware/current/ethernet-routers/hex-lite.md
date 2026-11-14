---
title: "hEX lite"
slug: /hex-lite
source: https://manual.mikrotik.com/hardware/hex-lite
captured_at: '2026-11-04T05:58:38+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/82be4fc253534ed3.jpg" alt="" width={799} height={799} /></p>

## [hEX lite](https://mikrotik.com/product/RB750r2) (RB750r2) {#hex-lite-rb750r2}

5 个以太网口，小型塑料外壳，850MHz CPU，64MB RAM，最经济实惠的 MPLS 路由器，RouterOS L4。完整规格与宣传册请参阅 [hEX lite 产品页面](https://mikrotik.com/product/RB750r2)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应依照所有国家法律和法规执行。
- 设备的安装必须符合当地及国家的电气规范。
- 本设备仅供室内使用，可放置在平坦表面上或安装在墙上。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请先阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的做法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 选择您的供电方案，请参阅“供电”章节了解可能的方案；
- 将以太网线连接到端口 1（标记为 "Internet"），并将本地网络计算机连接到端口 2-5；
- 如果不使用 PoE，请连接直流输入电源插孔以启动设备；
- 设备将启动，在短暂的蜂鸣声后，网络即可连接；
- 将计算机的 IP 配置设置为自动（DHCP）；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行。**提供多种配置方法以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单并重启设备；
- 将 RouterOS 软件更新到最新版本可确保最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备设计用于室内使用，可放置在平坦表面上或安装在墙上，安装孔位如下图所示，包装中不包含螺丝。尺寸为 4x25 mm 的螺丝很合适，根据墙体结构，如有需要可使用 6x30 mm 的膨胀螺栓和 6 mm 钻头。

<p><Img src="/img/e8c99734ffbc0e6b.webp" alt="" width={592} height={504} /></p>

安装在墙上时，请确保线缆进线口朝下。我们建议为我们的设备使用 Cat5/6 线缆。本设备的 IP 防护等级为 IPX0。

## 供电 {#powering}

主板可通过电源插孔或第一个以太网端口（被动 PoE）供电：

- 直流输入电源插孔（外径 5.5 mm、内径 2 mm，母头，正极插针）接受 6-30 V DC；
- 第一个以太网端口接受被动以太网供电，接受 6-30 V DC。通常本设备的功耗为 2 W。

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将要使用的国家，以符合当地法规。

除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help) 开始，以熟悉各种可能。如果 IP 连接不可用，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参阅复位按钮。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个独立的以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通或交叉线缆连接其他网络设备。以太网端口接受来自被动 PoE 注入器的 6-30 V DC 电源，建议使用 12 V 或更高电压以补偿线缆损耗。

## 复位按钮 {#reset-button}

RouterBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置并桥接所有接口。
- 当 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 所需）。

无论使用上述哪种选项，如果在设备接通电源之前按下按钮，系统都将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/RB750r2](https://mikrotik.com/product/RB750r2)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列在 /system resource 中。其他操作系统未经测试。

## 安全提示 {#safety-notice}

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废物处置场所。请熟悉将设备正确运送到您所在地区指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装提供合理的有害干扰防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备可能会造成有害干扰，此时用户需自费纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得产生有害干扰，(2) 本设备必须接受任何接收到的干扰，包括可能导致非预期运行的干扰。

注意：本设备已使用外围设备上的屏蔽电缆进行测试。必须使用屏蔽电缆以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：(1) 本设备不得产生干扰。(2) 本设备必须接受任何干扰，包括可能导致设备非预期运行的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
