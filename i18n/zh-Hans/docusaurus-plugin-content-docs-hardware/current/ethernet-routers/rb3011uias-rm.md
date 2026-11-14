---
title: "RB3011UiAS-RM"
slug: /rb3011uias-rm
source: https://manual.mikrotik.com/hardware/rb3011uias-rm
captured_at: '2026-11-04T06:03:53+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/47e62aa56e12a2f1.webp" alt="" width={798} height={232} /></p>

## [RB3011UiAS-RM](https://mikrotik.com/product/RB3011UiAS-RM) {#rb3011uias-rm}

RB3011UiAS-RM 是一款机架式有线路由器，配备十个千兆以太网端口、一个 SFP 笼、USB 3.0、一个 LCD 面板以及在 Ether10 上的 PoE-out。完整规格和宣传手册请参阅 [RB3011UiAS-RM 产品页面](https://mikrotik.com/product/RB3011UiAS-RM)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律法规进行处理。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备适用于安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤可能会给人员带来危险并损坏系统。
- 本产品适用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证不会因不当使用设备而发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请将其与电源断开。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

- 将您的互联网网线连接到端口 1，将局域网计算机连接到端口 2-10；
- 选择您的供电方案，请参阅供电部分；
- 将设备连接到电源；
- 配置您的网卡设置，以使用 DHCP 自动获取 IP 地址；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 完成。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将您的 RouterOS 软件更新到最新版本，以确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

本设备可从电源插孔或 LAN1 以太网端口获取供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）可接受 10-30 V DC ⎓（过压保护从 30 V 开始）。
- Eth1 端口可接受来自非标准（无源）Power over Ethernet 注入器的 10-30 V DC ⎓ 输入（在板上；长电缆上需要更高电压以补偿功率损耗）。本板不支持符合 IEEE802.3af 的 48 V 电源注入器。

最大负载下的功耗可达 30 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网电缆连接到 PoE 适配器的 PoE 端口；
- 将来自您局域网的以太网电缆连接到 PoE 适配器的 LAN 端口，注意数据与功率流向的箭头；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 十个 10/100/1000（千兆）以太网端口（Auto MDI/X）。
- USB 3.0 type A。
- LCD 面板。
- 用于 SFP 模块的 SFP 端口。
- Ether10 端口支持带自动检测的 PoE 输出，因此可以连接非 PoE 设备而不会造成损坏。Ether10 上的 PoE-out 输出比输入电压低约 2 V，最高支持 0.7 A，因此随附的 24 V 电源将在 Ether10 PoE 端口上提供 22 V、0.7 A 的输出。

## 安装 {#mounting}

<p><Img src="/img/27bf22aa32ecbced.webp" alt="" width={610} height={543} /></p>

本设备专为室内使用而设计，可使用随附的机架安装件安装在机架式机箱中，也可以放置在桌面上。如果希望放置在平面上，请在路由器底部贴上橡胶脚垫；如果指定用于机架式机箱，请使用十字螺丝刀将机架耳固定在设备两侧：

- 将机架耳安装到设备两侧，并拧紧四颗螺丝将其固定到位，如右图所示；
- 将设备放入机架式机箱并对准孔位，使设备方便地安装到位；
- 拧紧螺丝将其固定到位。

本设备的 IP 防护等级为 IPX0。该设备没有防水污染保护，请确保将设备放置在干燥通风的环境中。我们建议为我们的设备使用 Cat5/6 网线。*本设备的安装和配置应由具备资质的人员完成。*

工作湿度可为 5% 到 95%，无冷凝。

## 配置 {#configuration}

RouterOS 除本文档所述内容外还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help) 开始，以熟悉各种可能性。如果无法建立 IP 连接，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧通过设备的 MAC 地址进行连接（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参阅复位按钮。

## 复位按钮 {#reset-button}

要使用复位按钮，请按住它，然后在不松开按钮的情况下打开设备。

- 当绿色 LED 开始闪烁时松开按钮，即可复位 RouterOS 配置。为了不加载备用引导程序，您可以在已通电后再开始按住按钮。
- 在 LED 不再闪烁后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 所必需）。您也可以在设备出现在 Netinstall 实用程序的设备列表中时松开按钮。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都会加载备用 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含随设备提供的以下配件：

- EU/US 开关电源 DC ⎓ 24 V, 1.2 A, 28.8 W, 86.8%, VI, 线缆：220 cm。
- 1U 机架安装支架，黑色。
- 用于 RB2011 机架式机箱的固定套件 K-19 v3。

<p><Img src="/img/2ca97fab837580cb.webp" alt="" width={176} height={196} /></p>

请参阅 [MikroTik SFP 模块兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/RB3011UiAS-RM](https://mikrotik.com/product/RB3011UiAS-RM)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

## 安全提示 {#safety-notice}

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废弃物处置场所。请熟悉您所在地区将设备正确运送到指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的保护，防止有害干扰。

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），建议用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整或重新放置接收天线。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 向经销商或有经验的无线电/电视技术人员咨询以获得帮助。

FCC 警告：任何未经合规负责方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其运行须符合以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受接收到的任何干扰，包括可能导致意外运行的干扰。注：本设备在测试时对外围设备使用了屏蔽电缆。必须使用屏蔽电缆与本设备配合，以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。其运行须符合以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes: (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备制造日期的信息标注在其标签上序列号的末尾，以斜线分隔。第一位数字表示年份编号（年份的最后一位数字），随后的两位数字表示周编号。

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

欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
