---
title: "CCR1036-8G-2S+ 系列"
slug: /ccr1036-8g-2s-plus-series
source: https://manual.mikrotik.com/hardware/ccr1036-8g-2s-plus-series
captured_at: '2026-11-04T05:55:41+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/44eeac550f5f7853.webp" alt="" width={799} height={506} /></p>

<p><Img src="/img/c0a2a206816d5024.webp" alt="" width={169} height={82} /></p>

:::info 本文涵盖

- **[CCR1036-8G-2S+](https://mikrotik.com/product/CCR1036-8G-2Splus)**
- **[CCR1036-8G-2S+EM](https://mikrotik.com/product/CCR1036-8G-2SplusEM)**
:::

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。若未使用正确的硬件或未遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 本产品仅限室内安装。请使本产品远离水、火、潮湿或高温环境。
- 只能使用制造商认可的电源和附件，它们可在本产品的原包装中找到。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 若设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座上拔下。
- 遵守当地国家法规是客户的责任。所有 MikroTik 设备必须由专业人员安装。
- 本产品为 Class A 产品。在住宅环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

## 快速开始 {#quickstart}

- 将您的 PC 连接到标有 **MGMT/BOOT** 的端口或第一个以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置为 192.168.88.2/24；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保最佳性能、稳定性和安全更新；
- 设置路由器密码。

## 供电 {#powering}

本设备配有两个可拆卸（支持热插拔）的 AC **⏦** 110-240V 电源单元，采用标准 IEC 兼容插座。最大功耗为 73 W。

## 复位按钮 {#reset-button}

**复位按钮**：

- 在启动过程中按住此按钮，直到 USER LED 灯开始闪烁，松开按钮即可复位 RouterOS 配置。
- 按住复位按钮并给设备上电（等待 "USER" LED 闪烁后变为稳定的 "On"，当 "USER" LED 变为 "Off" 时 — 松开复位按钮）— 设备将以 BOOTP 模式启动，使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 重新安装 RouterOS。**MGMT/BOOT 以太网端口用于 Netinstall 过程。** 有关使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。

无论使用上述哪种方式，如果在设备通电前按下按钮，系统都将加载备份 RouterBOOT 引导程序。若只想加载备份 RouterBOOT 而不进行复位，请在 LED 开始闪烁前松开按钮。这对于 RouterBOOT 调试和恢复非常有用。

## 安装 {#mounting}

本设备设计用于室内使用，可使用随附的机架安装件安装在机架机箱中，也可放置在桌面上。如果指定用途为机架机箱，请使用十字螺丝刀将机架耳固定在设备两侧：

<p><Img src="/img/27bf22aa32ecbced.webp" alt="" width={610} height={543} /></p>

- 如右图所示，将机架耳固定到设备两侧并用四颗螺钉拧紧；
- 将设备放入机架机箱，对准孔位，使设备方便安装；
- 拧紧螺钉将其固定到位。

本设备无防水保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 网线。

## LED 指示灯 {#leds}

本设备有四个 LED 指示灯。PWR1/2 指示当前正在使用的电源。FAULT 指示散热风扇出现问题。USER 可在软件中进行配置。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体出厂预装版本列于 /system resource 中。其他操作系统未经测试。

## PCIe 使用 {#pcie-usage}

M.2 插槽 PCIe 4x，安装 SSD 请遵循以下说明：

- 关闭设备（拔下电源线）；2. 拧下固定 CCR 上盖的 6 颗螺钉；
- 打开上盖；
- 拧下固定 SSD 的螺钉；
- 将 SSD 插入 m.2 插槽；
- 接上电源线并检查 SSD 是否正确初始化；
- 拧回 6 颗上盖螺钉。另外请注意，默认情况下您应使用 m.2 2280 规格的 SSD。

CCR1036 型号的 M.2 插槽采用 PCIe Gen 2.0 x4 连接。推荐使用容量最高 1TB 的 NVMe M.2 2280mm M key SSD 硬盘。

<p><Img src="/img/9451b2eb2e7bf01c.webp" alt="" width={576} height={521} /></p>

安全提示 触电危险。本设备只能由受过培训的人员维护。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备经测试，符合 FCC 规则第 15 部分对 Class A 数字设备的限制要求。这些限制旨在为商业安装环境中的有害干扰提供合理防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区域操作本设备很可能造成有害干扰，此时用户将需要自费纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其操作须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。注意：本设备在测试时对周边设备使用了屏蔽电缆。为确保合规，必须在本设备上使用屏蔽电缆。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。其操作须满足以下两个条件：(1) 本设备不得产生干扰；(2) 本设备必须接受任何干扰，包括可能导致设备运行异常的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。其操作须满足以下两个条件：(1) 本设备不得产生干扰；(2) 本设备必须接受任何无线电干扰，即使该干扰可能导致设备运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备制造日期信息以斜杠分隔的形式标示在其标签上序列号的末尾。第一位数字表示年份（年份的最后一位数字），随后的两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的销售商。

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## Norma Oficial Mexicana（墨西哥官方标准） {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其非预期运行的干扰。制造商：MikroTikls SIA, Unijas iela 2, Riga, LV-1039, 拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Unijas iela 2, Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
