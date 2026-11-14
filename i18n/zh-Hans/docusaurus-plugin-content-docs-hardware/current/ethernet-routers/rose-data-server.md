---
title: "ROSE Data Server"
slug: /rose-data-server
source: https://manual.mikrotik.com/hardware/rose-data-server
captured_at: '2026-11-04T06:05:18+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### RDS2216-2XG-4S+4XS-2XQ {#rds2216-2xg-4s4xs-2xq}

<p><Img src="/img/4a48a7823e0bdec2.jpg" alt="" width={799} height={559} /></p>

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。完整规格和产品手册请参阅 [ROSE Data Server 产品页面](https://mikrotik.com/product/rds2216)。本产品的最终处置应遵守所有国家和地区的法律法规。设备的安装必须符合当地和国家的电气规范。本设备设计为安装在机架中。开始安装前，请仔细阅读安装说明。使用错误的硬件或不遵循正确的步骤，可能会对人员造成危险并损坏系统。在将系统连接到电源之前，请阅读安装说明。客户有责任遵守当地国家的法规，包括在合法的频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 产品规格 {#product-specifications}

- 产品型号：RDS2216-2XG-4S+4XS-2XQ。
- CPU 架构：ARM 64bit。
- CPU 核心数：16。
- CPU：AL73400 2000 MHz。
- RAM 容量：32 GB。
- RAM 类型：DDR4。
- 存储（FLASH）：32 MB。
- 存储（NAND）：128 MB。
- 1G 以太网端口数量：1。
- 1G/2.5G/5G/10G 以太网端口数量：2。
- 10G SFP+ 端口数量：4。
- 25G SFP28 端口数量：4。
- 100G QSFP28 端口数量：2。
- 交换芯片型号：98DX4310。
- 交换芯片与 CPU 的连接：4x25 Gbps。
- 操作系统：仅 RouterOS v7，License level 6。
- 尺寸：476 x 443 x 29 mm。
- 工作温度：-20°C 至 +50°C。

## 扩展插槽和端口 {#extension-slots-and-ports}

- M.2 SATA 插槽数量：2
- 2.5" 硬盘托架数量：20（仅限最大高度为 7mm 的 U.2 格式 SSD 硬盘）
- USB 插槽：2（USB 3.0 Type A 和 USB 2.0 Type A）
- 串行控制台端口：RJ45 RDS2216-2XG-4S+4XS-2XQ 具有连接到两个 M.2 插槽的 SATA3 连接。推荐使用无容量限制的 SATA3 M.2 2280mm B+M key SSD 硬盘。

## 供电 {#powering}

本设备配备两个热插拔 IEC 型交流电源，功率 550W，支持 100-240 V ⏦（~ 50/60 Hz，最大 7 A）。

不安装任何附加组件时的最大功耗为 105 W，在最大负载下可达到 286W。

- 100G QSFP28 支持的速度：1x 100G；1x 40G；4x 25G；4x 10G；4x 1G。不支持：2x 50G；1x 50G；2x 40G
- 25G SFP28 支持的速度：1x 25G；1x 10G；1x 2.5G；1x 1G。不支持：1x 5G

## 首次使用 - 连接磁盘前先设置 RouterOS {#first-use---routeros-set-up-before-connecting-disks}

- 将您的 PC 连接到标有 MGMT/BOOT 的端口或第一个以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 配置应通过网页浏览器中的 WebFig 或 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 完成。在网页浏览器中打开 [https://192.168.88.1](https://192.168.88.1) 开始设置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡查找设备。然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者对于某些型号，请查看贴纸上的用户密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装磁盘 {#install-disks}

安装磁盘的步骤：

- 按下右侧的按钮并拉出，即可打开托架。

<p><Img src="/img/5942c386e0f114fa.webp" alt="" width={1600} height={907} /></p>

<p><Img src="/img/c24aa95e89381370.webp" alt="" width={1600} height={860} /></p>

<p><Img src="/img/5788fbf93491c39c.webp" alt="" width={1600} height={859} /></p>

<p><Img src="/img/177647d5a315990c.webp" alt="" width={1600} height={859} /></p>

- 将硬盘安装到支架内（可选择用螺丝固定）。

<p><Img src="/img/cec144967554097a.webp" alt="" width={1600} height={858} /></p>

<p><Img src="/img/45259a11722d915a.webp" alt="" width={1600} height={858} /></p>

- 将托架插回其插槽，向前推直至锁定。

<p><Img src="/img/d5be365114c14410.webp" alt="" width={1600} height={860} /></p>

<p><Img src="/img/70f1a7994236ffbd.webp" alt="" width={1600} height={860} /></p>

<p><Img src="/img/06c0b59247132436.webp" alt="" width={1600} height={860} /></p>

<p><Img src="/img/7ce7288d39e29b15.webp" alt="" width={1600} height={860} /></p>

- 硬盘托架从左上角开始编号（从 1 开始），直到右下角的最后一个托架。

<p><Img src="/img/9e9966bf4ad57dbe.webp" alt="" width={1600} height={318} /></p>

(链接)

**在从 RouterOS 设备上物理移除任何硬盘之前，请务必使用 /disk eject-drive。**

**不支持强制移除，可能导致数据丢失。**

## 安装 {#mounting}

本设备设计为室内使用，既可使用随附的机架安装耳将其安装在机架中，也可放置在桌面上。随附的机架安装耳套件推荐用于深度不超过 600 mm 的机架。进行机架安装时，请使用十字螺丝刀按以下步骤操作：

- 将机架安装耳安装到设备的前部两侧。

<p><Img src="/img/01b95e385da33957.webp" alt="" width={1600} height={912} /></p>

<p><Img src="/img/0c98569ecf489ff4.webp" alt="" width={1600} height={912} /></p>

<p><Img src="/img/f19297cc6ede514e.webp" alt="" width={1600} height={912} /></p>

<p><Img src="/img/571df449ab14d41d.webp" alt="" width={1600} height={912} /></p>

- 将后部的小型机架支撑耳安装到设备的两侧。

<p><Img src="/img/ca7257427d7f1f08.webp" alt="" width={1600} height={912} /></p>

<p><Img src="/img/0433ddb68eb49ec3.webp" alt="" width={1600} height={912} /></p>

<p><Img src="/img/88d7f2f1a14254a8.webp" alt="" width={1600} height={912} /></p>

<p><Img src="/img/6c1ec1a2a2359b7c.webp" alt="" width={1600} height={912} /></p>

- 将后部的长型机架支撑耳安装到机架后侧。

<p><Img src="/img/3a9329eb2e283df6.webp" alt="" width={1600} height={888} /></p>

- 将设备安装到机架中，确保机箱支撑耳牢固地固定在长型支撑耳上。

<p><Img src="/img/a82d115e33a103d9.webp" alt="" width={1600} height={912} /></p>

<p><Img src="/img/f1cd28713f6c7c0e.webp" alt="" width={1600} height={912} /></p>

<p><Img src="/img/c375f0a6b473b9b6.webp" alt="" width={1600} height={912} /></p>

<p><Img src="/img/1aa585e79fd5ec17.webp" alt="" width={1600} height={912} /></p>

<p><Img src="/img/044508c5715427b5.webp" alt="" width={1600} height={888} /></p>

<p><Img src="/img/ad6d89e48e090b66.webp" alt="" width={1600} height={888} /></p>

## 按钮 {#buttons}

**Reset 按钮**：

- 在启动过程中按住此按钮，直到 USR LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 按住 Reset 按钮并给设备上电（等待 "USR" 灯闪烁后变为稳定 "On"，当 "USR" 灯变为 "Off" 时松开 Reset 按钮）——设备将以 bootp 模式启动，以便使用 Netinstall 重新安装 RouterOS。**Netinstall 过程使用 MANAGEMENT/BOOT 以太网端口。** 有关使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。无论采用上述哪种方式，如果在设备上电之前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。若只想加载备份 RouterBOOT 而不进行重置，请在 LED 开始闪烁之前松开按钮。这对于 RouterBOOT 调试和恢复很有用。

## LED 指示灯 {#led-indicators}

### 背面板 {#back-panel}

-

当路由器已通电并连接到合适的电源时，PWR1/2 LED 会亮起。

-

USER LED 指示设备在不同启动模式下的状态，例如重置配置或为 Netinstall 工具启动设备时。

-

如果任何散热风扇出现问题，FAULT LED 会亮起。

-

方形的橙色和绿色以太网端口 LED 指示各个 10G 以太网端口的活动状态。

-

三角形的 25G SFP28 和 SFP+ 端口绿色 LED 指示各个 25G SFP28 和 SFP+ 端口的活动状态。

-

圆形的 100G QSFP28 端口绿色 LED 指示 100G QSFP28 端口各个通道的活动状态。前面板：

-

USER LED 指示设备在不同启动模式下的状态，例如重置配置或为 Netinstall 工具启动设备时。

-

如果任何散热风扇出现问题，FAULT LED 会亮起。

-

路由器通电时 POWER LED 会亮起。

-

2.5" 硬盘托架 LED（绿色和蓝色）指示相应托架中是否安装了硬盘。

## 配件 {#accessories}

- IEC 电源线 2 条；
- 机架安装耳（ROSE）；
- 后部小型支撑耳（ROSE）；
- 后部长型机架支撑耳（ROSE）；
- K-90 紧固套件。随附的机架安装耳套件推荐用于深度不超过 600 mm 的机架。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及更高版本。出厂预装的具体版本可在 /system resource 中查看。其他操作系统尚未经过测试。
