---
title: "CCR2004-16G-2S+"
slug: /ccr2004-16g-2s-plus
source: https://manual.mikrotik.com/hardware/ccr2004-16g-2s-plus
captured_at: '2026-11-04T05:55:48+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/f7b1b7928d52fd10.jpg" alt="" width={800} height={228} /></p>

## [CCR2004-16G-2S+](https://mikrotik.com/product/ccr2004_16g_2splus) {#ccr2004-16g-2s}

这款强大且价格实惠的路由器在单核性能上全面超越了以往所有 CCR 型号。16 个千兆以太网端口、USB、2 个 10G SFP+ 笼、主动散热，并且在所有 CCR 设备中拥有最佳的单核性能功耗比和最佳的整体性能功耗比。完整规格与产品手册请参见 [CCR2004-16G-2S+ 产品页面](https://mikrotik.com/product/ccr2004_16g_2splus)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电路相关的危险，并熟悉防止事故的标准操作规范。
- 本产品的最终处置应按照所有国家和地区的法律法规执行。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备预期安装在机架中。开始安装之前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的步骤，可能导致人员处于危险状况并对系统造成损坏。
- 本产品预期在室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可且可在本产品原包装中找到的电源和配件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 若设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家/地区的规定，包括在法律许可的频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 将您的 PC 连接到标有 **MGMT/BOOT** 的端口或第一个以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

<p><Img src="/img/f8d0b2c8b9e368d0.webp" alt="" width={963} height={216} /></p>

本设备配备双路集成电源单元，交流电 **⏦** 100-240V，采用标准 IEC 兼容插座，最大功耗为 48 W。

## 规格 {#specifications}

- 产品代码 CCR2004-16G-2S+
- CPU AL32400 1.7 GHz
- CPU 架构 ARM 64bit
- CPU 核心数 4
- 内存大小 4 GB
- 内存类型 DDR4
- 存储 128 MB，NAND
- 1G 以太网端口数量 16
- 10G SFP+ 端口数量 2
- 操作系统 RouterOS（许可级别 6）
- 交换芯片型号 88E6191X、88E619X
- 尺寸 443 x 210 x 44 mm
- 工作温度 -20°C 至 +60°C

## 复位按钮 {#reset-button}

**复位按钮**：

- 在启动期间按住此按钮，直到 USER LED 灯开始闪烁，松开按钮即可复位 RouterOS 配置。
- 按住复位按钮并为设备上电（等待 "USER" LED 闪烁后稳定为 "On"，当 "USER" LED 变为 "Off" 时松开复位按钮）——设备将以 BOOTP 模式启动，从而使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 重新安装 RouterOS。**MGMT/BOOT 以太网端口用于 Netinstall 过程。** 有关使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。

无论使用上述哪种方式，如果在设备通电之前按下按钮，系统都会加载备份 RouterBOOT 引导程序。若只想加载备份 RouterBOOT 而不复位，请在 LED 开始闪烁之前松开按钮。这对于 RouterBOOT 调试和恢复很有用。

## 安装 {#mounting}

本设备设计用于室内，可使用随附的机架安装件安装在机架式机箱中，也可放置在桌面上。如果指定用途为机架式机箱，请使用十字螺丝刀将机架安装耳片安装到设备两侧：

<p><Img src="/img/27bf22aa32ecbced.webp" alt="" width={610} height={543} /></p>

- 将机架耳片安装到设备两侧，并拧紧四颗螺丝将其固定到位，如右图所示；
- 将设备放入机架式机箱并对准孔位，使设备能够顺利装入；
- 拧紧螺丝将其固定到位。本设备不具备防水保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 网线。

## 随附部件 {#included-parts}

<p><Img src="/img/7f015b1e7f1ade2d.webp" alt="" width={807} height={281} /></p>

- PLUG1-2_ EU/US 电源线，JL3-JL38C (D03+QT3) H05VV-F 3x0.75mm2 1.83m
- SET1_ 固定套件 K-57
- CASE3-4_ 1U 机架安装支架（白色）

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。
