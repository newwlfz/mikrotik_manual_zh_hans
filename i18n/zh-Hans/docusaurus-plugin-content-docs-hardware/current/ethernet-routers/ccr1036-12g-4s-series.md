---
title: "CCR1036-12G-4S 系列"
slug: /ccr1036-12g-4s-series
source: https://manual.mikrotik.com/hardware/ccr1036-12g-4s-series
captured_at: '2026-11-04T05:55:37+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/c32ff1f634231ccf.webp" alt="" width={800} height={320} /></p>

<p><Img src="/img/482edcd169674774.webp" alt="" width={178} height={71} /></p>

:::info 本文涵盖

- **[CCR1036-12G-4S-EM](https://mikrotik.com/product/CCR1036-12G-4S-EM)**
- **[CCR1036-12G-4S](https://mikrotik.com/product/CCR1036-12G-4S-149)**
:::

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤可能会导致人员处于危险之中并损坏系统。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规。所有 MikroTik 设备必须由专业人员安装。
- 这是 A 类产品。在居住环境中，本产品可能会引起无线电干扰，在这种情况下，用户可能需要采取适当的措施。

## 快速开始 {#quickstart}

- 将您的 PC 连接到标有 **MGMT/BOOT** 的端口或第一个以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 应使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 192.168.88.1 以开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡以查找设备。接着使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保最佳性能、稳定性和安全更新；
- 设置路由器的密码。

## 供电 {#powering}

本设备可由两个冗余电源供电，每个电源均接受 100-240 V AC 电源。您可以单独使用其中任何一个，也可以同时使用两者。功耗最高为 60 W。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 12 个 10/100/1000 以太网端口。
- 4 个 SFP 笼
- USB 2.0 type A
- 一个 M.2 插槽，类型 PCIe x4
- RJ45 控制台端口；ETH12 端口上提供 Etherboot / Netinstall。

推荐使用容量最高为 1TB 的 M.2 PCIe NVMe 2280mm M key SSD 磁盘。

## 安装 {#mounting}

本设备设计用于室内，可使用随附的机架安装件安装在机架机箱中，也可以放置在桌面上。如果指定用途为机架机箱，请使用十字螺丝刀将机架安装耳固定在设备两侧：

<p><Img src="/img/27bf22aa32ecbced.webp" alt="" width={610} height={543} /></p>

- 如图所示，将机架耳固定在设备两侧，并拧紧四颗螺丝将其固定到位。
- 将设备放入机架机箱并对齐孔位，使设备能够方便地安装。
- 拧紧螺丝将其固定到位。*本设备没有任何防水保护，请确保将设备放置在干燥且通风的环境中。* *我们建议为我们的设备使用屏蔽 Cat5/6 线缆。* *本设备的安装和配置应由合格人员完成。*

## 按钮和跳线 {#buttons-and-jumpers}

**Reset 按钮**：

- 在启动期间按住此按钮，直到 USER LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 按住 Reset 按钮并给设备上电（等待 "USER" LED 闪烁然后稳定为 "On"，当 "USER" LED 为 "Off" 时 - 松开 Reset 按钮）- 设备将以 BOOTP 模式启动，以使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 重新安装 RouterOS。**MGMT/BOOT 以太网端口用于 Netinstall 过程。** 有关如何使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。

无论使用上述哪种方式，如果在设备上电之前按下按钮，系统将加载备用 RouterBOOT 引导程序。请在 LED 开始闪烁之前松开按钮，以便仅加载备用 RouterBOOT 而不进行重置。这适用于 RouterBOOT 调试和恢复。

Mode 按钮默认不启用，但可以在菜单 /system routerboard mode-button 中为其分配任意脚本。

## LED {#leds}

本设备有四个 LED 灯。PWR1/2 指示当前使用的是哪个电源。FAULT 指示散热风扇存在问题。USER 可以在软件中配置。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列在 /system resource 中。其他操作系统尚未经过测试。

<p><Img src="/img/7ef0e65b341a324c.webp" alt="" width={574} height={494} /></p>

安全提示 触电危险。本设备只能由受过培训的人员进行维修。这是 A 类设备，在住宅无线电设备附近操作可能会引起无线电干扰。

为避免污染环境，请将本设备与家庭垃圾分开，并以安全的方式处置，例如送往指定的废物处置场所。请熟悉您所在地区将设备正确运输到指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装环境中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在居民区操作本设备可能会造成有害干扰，在这种情况下，用户将被要求自费纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。注意：本设备已使用外围设备上的屏蔽电缆进行测试。必须使用屏蔽电缆与本设备配合，以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可证 RSS 标准。操作须符合以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes: (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

Для получения подробных сведений о гарантийном обслуживании обратитесь к продавцу.

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其非预期运行的干扰。制造商：MikroTikls SIA, Unijas iela 2, Riga, LV-1039, 拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Unijas iela 2, Riga, Latvia, LV1039.

欧盟符合性声明全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
