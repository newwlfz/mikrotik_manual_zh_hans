---
title: "CCR2004-1G-12S+2XS"
slug: /ccr2004-1g-12s-plus-2xs
source: https://manual.mikrotik.com/hardware/ccr2004-1g-12s-plus-2xs
captured_at: '2026-11-04T05:55:49+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/bead24a85a32f96a.jpg" alt="" width={799} height={460} /></p>

## [CCR2004-1G-12S+2XS](https://mikrotik.com/product/ccr2004_1g_12s_2xs) {#ccr2004-1g-12s2xs}

CCR2004-1G-12S+2XS 是一款高性能多核路由器，配备十二个 10G SFP+ 端口和两个 25G SFP28 端口。有关完整规格和宣传册，请参阅 [CCR2004-1G-12S+2XS 产品页面](https://mikrotik.com/product/ccr2004_1g_12s_2xs)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装到机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤，可能导致人员处于危险境地并对系统造成损坏。
- 本产品设计用于室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因设备使用不当而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

- 将您的 PC 连接到标有 **MGMT/BOOT** 的端口或第一个以太网端口；
- 将设备连接到电源；
- 将您网卡的 IP 设置配置为 192.168.88.2/24；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

该设备具有两个集成电源单元，交流 **⏦** 110-240V（5 A），配有标准 IEC 兼容插座，最大功耗为 32 W，带附件时为 49 W。

## 配置 {#configuration}

以太网端口 1 具有用于连接的默认 IP 地址：192.168.88.1。用户名为 admin，没有密码。设备默认不应用任何其他配置，请设置 WAN IP 地址、用户密码并更新设备。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址。出于恢复目的，可以引导设备进行重新安装，请参阅 Reset 按钮。

## 规格 {#specifications}

RAM 容量说明 - RouterOS v6 将支持 1792MB ECC / 如需充分利用，请使用 RouterOS v7 4GB ECC。

## Reset 按钮 {#reset-button}

**Reset 按钮**：

- 在启动期间按住此按钮，直到 USER LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 按住 Reset 按钮并给设备上电（等待 "USER" LED 闪烁，然后稳定为 "On"，当 "USER" LED 变为 "Off" 时松开 Reset 按钮）- 设备将以 BOOTP 模式启动，以便使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 重新安装 RouterOS。**Netinstall 过程使用 MGMT/BOOT 以太网端口。** 有关使用 Netinstall 恢复实用程序的信息，请参阅 RouterOS 文档。

无论使用上述哪种方式，如果在设备通电之前按下按钮，系统将加载备份的 RouterBOOT 加载器。在 LED 开始闪烁之前松开按钮，则仅加载备份 RouterBOOT 而不进行重置。这对于 RouterBOOT 调试和恢复很有用。

## 安装 {#mounting}

该设备设计用于室内，可以使用随附的机架安装件安装到机架机箱中，也可以放置在桌面上。如果指定用途为机架机箱，请使用十字螺丝刀将机架耳片安装到设备两侧：

<p><Img src="/img/27bf22aa32ecbced.webp" alt="" width={610} height={543} /></p>

- 将机架耳片安装到设备两侧，并拧紧四颗螺丝将其固定到位，如右图所示；
- 将设备放入机架机箱，并使其与孔位对齐，以便设备方便地安装；
- 拧紧螺丝将其固定到位。该设备没有防水保护，请确保将设备放置在干燥且通风的环境中。我们建议我们的设备使用 Cat6 线缆。

## 随附部件 {#included-parts}

<p><Img src="/img/aafebedcbac062e8.webp" alt="" width={559} height={205} /></p>

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

<p><Img src="/img/9451b2eb2e7bf01c.webp" alt="" width={576} height={521} /></p>

安全提示 触电危险。本设备只能由经过培训的人员进行维修。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场所处置。请了解将设备正确运输到您所在地区指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的保护，防止有害干扰。

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整或重新放置接收天线。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能使用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得产生有害干扰，并且 (2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。注意：本设备已在外围设备上使用屏蔽线缆进行了测试。本设备必须使用屏蔽线缆以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可证 RSS 标准。操作须满足以下两个条件：(1) 本设备不得产生干扰，并且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes: (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

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

欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
