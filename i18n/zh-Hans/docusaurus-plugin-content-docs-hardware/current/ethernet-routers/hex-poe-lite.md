---
title: "hEX PoE lite"
slug: /hex-poe-lite
source: https://manual.mikrotik.com/hardware/hex-poe-lite
captured_at: '2026-11-04T05:58:37+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/b88c127b18e5110e.jpg" alt="" width={799} height={505} /></p>

## [hEX PoE lite](https://mikrotik.com/product/RB750UPr2)（RB750UPr2） {#hex-poe-lite-rb750upr2}

hEX PoE lite 是一款配备五个以太网端口的路由器。它有一个 USB 2.0 端口，并支持向端口 2-5 输出 PoE 供电（每端口最大 500 mA）。完整规格和宣传册请参见 [hEX PoE lite 产品页面](https://mikrotik.com/product/RB750UPr2)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，这些电源和附件可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

- 将 WAN 线缆连接到端口 1，将 LAN 计算机连接到端口 2-5；
- 将设备连接到电源；
- 将 LAN 计算机的 IP 配置设为自动（DHCP）；
- 配置应使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 完成。**提供多种配置方法以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

该板卡可通过电源插孔或第一个以太网端口（无源 PoE）接受供电：

- 直连输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 8-28 V DC；
- 第一个以太网端口接受无源 Power over Ethernet 8-28 V DC。

正常情况下本设备的功耗为 2.4 W，最大负载下为 3.6 W。

## 电源输出 {#power-output}

本设备可以通过其以太网端口为外部设备提供 PoE 供电。这很方便，因为您无需任何额外的 PoE 注入器即可为其他设备供电。该功能由设备型号名称中的字母 "P" 表示。输出电压将与输入电压相同，并且需要在 RouterOS 软件中在特定端口上启用此功能。默认情况下它是禁用的。在此模式下，每个以太网端口的最大输出功率为 500mA。在 RouterOS 中启用 Power Output 后，以太网 LED 灯会由绿色变为红色。红色 LED 表示该端口当前正在提供 PoE 供电。

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将要使用的国家/地区，以符合当地法规。

除了本文档所述内容之外，RouterOS 还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help) 开始，以熟悉各种可能性。如果无法建立 IP 连接，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问都被阻止）。出于恢复目的，可以从网络引导设备，请参见复位按钮。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个独立以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X），因此您可以使用直通或交叉线缆连接到其他网络设备。以太网端口接受来自无源 PoE 注入器的 8-28 V DC 供电，建议使用 12 V 或更高电压以补偿线缆损耗。
- 一个 USB type A。

## 复位按钮 {#reset-button}

复位按钮有三个功能：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置和默认值。
- 当 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。

无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 规格 {#specifications}

如需了解有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/RB750UPr2](https://mikrotik.com/product/RB750UPr2)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体出厂安装的版本列于 /system resource 中。其他操作系统尚未经过测试。

## 安全提示 {#safety-notice}

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装提供合理的有害干扰防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能造成有害干扰，在这种情况下，用户需要自费纠正干扰。

FCC 警告：未经合规责任方明确批准的任何更改或修改都可能使用户丧失操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须遵守以下两个条件：(1) 本设备不得造成有害干扰，(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。注意：本设备在测试时外围设备使用了屏蔽线缆。必须使用屏蔽线缆与本设备配合，以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可证 RSS 标准。操作须遵守以下两个条件：(1) 本设备不得造成干扰，(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes: (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备制造日期的信息标示在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），接下来的两位数字表示周数。

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

欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
