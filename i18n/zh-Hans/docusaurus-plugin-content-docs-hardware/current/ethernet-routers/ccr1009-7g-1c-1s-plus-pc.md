---
title: "CCR1009-7G-1C-1S+PC"
slug: /ccr1009-7g-1c-1s-plus-pc
source: https://manual.mikrotik.com/hardware/ccr1009-7g-1c-1s-plus-pc
captured_at: '2026-11-04T05:55:32+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/e9685d2eef55d87f.webp" alt="" width={799} height={377} /></p>

## [CCR1009-7G-1C-1S+PC](https://mikrotik.com/product/CCR1009-7G-1C-1SplusPC) {#ccr1009-7g-1c-1spc}

Cloud Core Router —— 每个完全独立的以太网端口都直接连接到 CPU。完整规格和宣传册请参见 [CCR1009-7G-1C-1S+PC 产品页面](https://mikrotik.com/product/CCR1009-7G-1C-1SplusPC)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律法规进行处理。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计为安装在机架中。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品适合室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些均可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规。所有 MikroTik 设备都必须由专业人员安装。
- 本产品属于 A 类产品。在居住环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施。

## 快速开始 {#quickstart}

- 将您的 PC 连接到标有 **MGMT/BOOT** 的端口或第一个以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 应使用 Web 浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性；**
- 在 Web 浏览器中打开 192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 复位按钮 {#reset-button}

**复位按钮**：

- 在启动期间按住此按钮，直到 USER LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 按住复位按钮并为设备通电（等待 "USER" LED 闪烁后变为稳定的 "On"，当 "USER" LED 变为 "Off" 时松开复位按钮）——设备将以 BOOTP 模式启动，以便使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 重新安装 RouterOS。**MGMT/BOOT 以太网端口用于 Netinstall 过程。** 有关使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。

无论使用上述哪种方式，如果在设备通电前按下按钮，系统将加载备份的 RouterBOOT 引导程序。若只想加载备份 RouterBOOT 而不执行重置，请在 LED 开始闪烁之前松开按钮。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内含以下随设备提供的配件：

- 欧盟/美国电源线，D03+QT3 H05VV-F 3x0.75 mm2 1.83 m RoHS。
- 电源适配器 24VDC **⎓** 2.5 A 60 W 80% VI 121x54x33 线缆 1.2 m 插头 2.1 mm。
- USB A 母头转 Micro B 线缆
- 用于 CRS110 机箱的机架安装套件。请参阅 [MikroTik SFP 模块兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。

SFP 模块在使用时可能会变得非常热，拔出时请格外小心，请参阅 SFP 模块通用使用指南：

[S+RJ10 通用指南](/docs/hardware/s-plus-rj10-general-guidance)

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/CCR1009-7G-1C-1SplusPC](https://mikrotik.com/product/CCR1009-7G-1C-1SplusPC)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未经过测试。

<p><Img src="/img/9451b2eb2e7bf01c.webp" alt="" width={576} height={521} /></p>

安全提示 触电危险。本设备只能由经过培训的人员进行维修。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请熟悉在您所在地区将设备正确运送到指定处置场所的相关流程。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制要求。这些限制旨在为商业安装环境中的有害干扰提供合理防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在居住区运行本设备很可能造成有害干扰，此时用户需要自行承担费用来纠正干扰。

FCC 警告：任何未经合规负责方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其运行须符合以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受任何接收到的干扰，包括可能导致非预期运行的干扰。注意：本设备已使用外围设备上的屏蔽电缆进行测试。为确保合规，必须在本设备上使用屏蔽电缆。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。其运行须符合以下两个条件：(1) 本设备不得造成干扰，并且 (2) 本设备必须接受任何干扰，包括可能导致本设备非预期运行的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。允许在以下两个条件下运行：(1) 设备不得产生干扰，并且 (2) 用户必须接受设备所受到的任何无线电干扰，即使该干扰可能影响其正常运行。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备制造日期信息以斜杠分隔的形式标注在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），后面两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

有关保修服务的详细信息，请联系您的经销商。

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其非预期运行的干扰。制造商：MikroTikls SIA, Unijas iela 2, Riga, LV-1039, 拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Unijas iela 2, Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
