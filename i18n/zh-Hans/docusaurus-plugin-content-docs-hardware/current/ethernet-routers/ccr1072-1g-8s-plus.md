---
title: "CCR1072-1G-8S+"
slug: /ccr1072-1g-8s-plus
source: https://manual.mikrotik.com/hardware/ccr1072-1g-8s-plus
captured_at: '2026-11-04T05:55:42+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/ddd559ea1f682111.webp" alt="" width={799} height={450} /></p>

## [CCR1072-1G-8S+](https://mikrotik.com/product/CCR1072-1G-8Splus) {#ccr1072-1g-8s}

CCR1072-1G-8S+ 是一款配备八个 SFP+ 笼口的高性能多核路由器。端口直接连接到 Tilera 72 核 CPU，并由 16 GB 内置 ECC RAM 辅助。请参阅 [CCR1072-1G-8S+ 产品页面](https://mikrotik.com/product/CCR1072-1G-8Splus) 获取完整规格和宣传册。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备拟安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤可能会对人员造成危险情况并损坏系统。
- 本产品拟在室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规。所有 MikroTik 设备必须由专业人员安装。
- 这是 A 类产品。在家庭环境中，本产品可能会造成无线电干扰，在这种情况下，用户可能需要采取适当的措施。

## 快速开始 {#quickstart}

- 将您的 PC 连接到标有 **MGMT/BOOT** 的端口或第一个以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 应使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 192.168.88.1 开始设置。如果 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可以确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备设计用于室内，可使用随附的机架安装件安装在机架式机箱中，也可以放置在桌面上。如果指定用于机架式机箱，请使用十字螺丝刀将机架耳片安装到设备两侧：

- 将机架耳片安装到设备两侧，并拧紧四颗螺丝将其固定到位，如右图所示；
- 将设备放入机架式机箱并对齐孔位，使设备能够方便地安装；
- 拧紧螺丝将其固定到位。

<p><Img src="/img/27bf22aa32ecbced.webp" alt="" width={610} height={543} /></p>

本设备没有防水污染保护，请确保将设备放置在干燥通风的环境中。我们建议为我们的设备使用 Cat6 网线。*本设备的安装和配置应由合格人员完成。*

## 供电 {#powering}

本设备配备两个可拆卸（支持热插拔）的 AC **⏦** 110-240V (2.5 A) 电源单元，采用标准 IEC 兼容插座，最大功耗为 125 W。

## 配置 {#configuration}

登录后，我们建议点击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保您已选择设备将使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，让自己熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问都被阻止）。出于恢复目的，可以启动设备进行重新安装，请参阅 Reset 按钮。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 2 个 M.2 插槽，可接受 80mm Key-M x4 PCIe 2.0 模块。M.2 插槽位于设备内部的 PCB 板上。要接触它们，请拆下路由器背面用于固定上盖的螺丝，然后向上抬起并向盖子方向拉动即可滑出。
- microSD 卡插槽。
- 用于存储私钥的 Smart Card 插槽。
- 1 个千兆以太网端口。
- 8 个 SFP+ 端口，用于 10 Gb 连接。
- A 型 USB 插槽。
- AB 型 microUSB 插槽。
- 自动风扇转速控制。CCR1072 具有连接到两个 M.2 插槽的 PCIe Gen 2.0 x4 连接。建议使用容量最高 1TB 的 NVMe M.2 2280mm M key SSD 磁盘。

## Reset 按钮 {#reset-button}

**Reset 按钮**：

- 在启动期间按住此按钮，直到 USER LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 按住 Reset 按钮并给设备上电（等待 "USER" LED 闪烁后稳定为 "On"，当 "USER" LED 为 "Off" 时松开 Reset 按钮）——设备将以 BOOTP 模式启动，使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 重新安装 RouterOS。**MGMT/BOOT 以太网端口用于 Netinstall 过程。** 有关使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。

无论使用上述哪种方式，如果在设备通电前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。在 LED 开始闪烁前松开按钮，即可仅加载备份 RouterBOOT 而不进行重置。这对 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内包含以下随设备提供的配件：

- EU/US AC **⏦** 电源线，D03+QT3 H05VV-F 3x0.75 mm 2 1.83 m RoHS。
- 用于机架式机箱 K-10 R2 的固定套件。
- Rackmount Case x72 侧支架。请参阅 [MikroTik SFP 模块兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/CCR1072-1G-8Splus](https://mikrotik.com/product/CCR1072-1G-8Splus)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未经过测试。

<p><Img src="/img/7ef0e65b341a324c.webp" alt="" width={574} height={494} /></p>

安全提示 电击危险。本设备只能由受过培训的人员进行维修。这是 A 类设备，在住宅无线电设备附近操作可能会造成无线电干扰。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请了解将设备正确运送到您所在地区指定处置场所的相关程序。

<p><Img src="/img/b412fabac7661e64.webp" alt="" width={591} height={196} /></p>

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备生产日期的信息以斜杠分隔的形式标注在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），接下来的两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的销售商。

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## Norma Oficial Mexicana {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其非预期运行的干扰。制造商：MikroTikls SIA, Unijas iela 2, Riga, LV-1039, 拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Unijas iela 2, Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
