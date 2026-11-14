---
title: "CRS320-8P-8B-4S+RM"
slug: /crs320-8p-8b-4s-plus-rm
source: https://manual.mikrotik.com/hardware/crs320-8p-8b-4s-plus-rm
captured_at: '2026-11-04T09:46:33+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/a9bb18c725c83d36.jpg)

## [CRS320-8P-8B-4S+RM](https://mikrotik.com/product/crs320_8p_8b_4s_rm) {#crs320-8p-8b-4srm}

首款 MikroTik 大功率 PoE++ 交换机 —— 可轻松且经济高效地为符合行业标准的 802.3af/at/bt 设备供电。告别数不清的电源线 —— 用 PoE++ 打造更整洁的空间！完整规格和宣传手册请参见 [CRS320-8P-8B-4S+RM 产品页面](https://mikrotik.com/product/crs320_8p_8b_4s_rm)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装在机架中。开始安装前请仔细阅读安装说明。使用不正确的硬件或不遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 本产品适用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 插座应安装在设备附近且便于插拔。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备出现故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规。所有 MikroTik 设备必须由专业人员进行安装。
- 本产品为 A 类产品。在居住环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施

## 快速开始 {#quickstart}

- 用您的 PC 连接到任意以太网端口；
- 将设备连接到电源；
- 将网卡的 IP 设置配置为 192.168.88.2/24；
- 在网页浏览器中使用 WebFig，或使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，然后在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备设计用于室内使用，可使用随附的机架安装耳将其安装在机架机箱中，也可以放置在桌面上。如果希望放置在平坦表面上，请在路由器底部贴上橡胶脚垫；如果指定用于机架机箱，请使用十字螺丝刀在设备两侧安装机架安装耳：

- 将机架安装耳安装到设备两侧，并拧紧四颗螺丝将其固定到位，如图所示。

![](/img/837a6d2bb5f312fe.webp)

- 将设备放入机架机箱并对齐孔位，使设备能够方便地装入。
- 拧紧螺丝将其固定到位。设备没有防水保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 网线。本设备的安装和配置应由合格的人员完成。

## 供电 {#powering}

本设备配备一个热插拔 IEC 型交流电源，636 W，支持 100-240 V AC（~50/60 Hz，最大 11 A）。

第二个 PSU 插槽用于安装相同的热插拔 IEC 型交流电源，636 W，支持 100-240 V AC（~50/60 Hz，最大 11 A）。

无附件时的最大功耗为 36 W。在最大负载下使用两个电源时，功耗可达 1150 W。

## 配置 {#configuration}

完整的 RouterOS 和 SwOS 文档可在 [https://mt.lv/help](https://mt.lv/help) 获取。除主以太网端口上的 IP 地址外，本设备未进行其他预配置。您可以从任意端口连接，因为默认情况下所有端口都交换在一起。其他配置必须按照上面链接的文档手册进行。

初始连接必须通过以太网线完成，可使用网页浏览器中的 **WebFig** 或 **WinBox** 工具。使用 **WinBox** 从任意端口连接到默认 IP 地址 192.168.88.1，用户名为 "**admin**"，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。

如果无法使用 IP 连接，也可以使用 **WinBox** 工具连接到设备的 MAC 地址。这仅适用于设备已启动 RouterOS 的情况。

出于恢复目的，可以从网络启动设备，请参阅 Reset 按钮。

本设备配备一个 RJ45 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无校验。可以使用标准的 RJ45 转 COM 线缆；引脚定义可在 [RouterOS 文档](https://mt.lv/help) 中找到。Marvell Prestera 交换芯片功能在 [Marvell Prestera 交换芯片功能](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册中有描述。

## 电源输出 {#power-output}

本设备可通过其以太网端口为外部设备提供 PoE 供电。所有端口均提供约 54V 电压。

**以太网端口 1 至 8** 可为 802.3 af/at 设备供电。默认情况下，PoE 模式设置为 auto，确保不会损坏设备。它会自动检测支持 PoE 的设备并提供供电。一旦检测到 PoE 设备，就会为其供电，PoE LED 会点亮。**以太网端口 9 至 16** 可为 802.3 af/at/bt 设备供电，支持 "Type 3"（Class 5-6）和 "Type 4"（Class 7-8）。每个 802.3 af/at 端口可在高电压下提供高达 30W 的功率。每个 802.3 bt 端口可提供高达 90W 的功率。

仅支持完全符合 802.3 at/af/bt 标准的 PD 设备：mAP-lite、RB1100AHx4、CRS510-8XS-2XQ、CRS504-4XQ-OUT、CRS504-4XQ-IN

像 NetMetal ax 这样的非隔离设备，如果 PSU 或接地线形成了接地路径，可能会引起接地环路问题。如果需要此类设备，应使用 RBGPOE-CON-HP 提供电气隔离

## 使用场景方案 {#use-case-schemes}

### 推荐连接方案中所用术语的说明 {#description-of-terminology-used-in-the-recommended-connection-schemes}

与之前的 802.3 af/at 供电设备不同，这是我们首款完整实现 802.3 af/at/bt 标准的 PoE 交换机。它仅支持完全符合 802.3 af/at/bt 标准的受电设备，例如 CRS510-8XS-2XQ-IN、CRS504-4XQ-IN、CRS504-4XQ-OUT、FTC11XG、mAP lite、RB1100AHx4 以及未来的型号。

**PSE** —— 供电设备。**PD** —— 受电设备。**PSU** —— 电源单元。**AF/AT** —— IEEE 802.3af 和 802.3at 是以太网供电（PoE）标准，允许以太网线缆在传输数据的同时传输电力，为 IP 摄像头、无线接入点和 VoIP 电话等设备供电。**8P** —— 八个 IEEE 802.3 af/at 端口。**8B** —— 八个 IEEE 802.3 bt 端口。

#### 使用场景 1 {#use-case-1}

**802.3 af/at/bt** 设备（例如 CRS504-4XQ-OUT、CRS510-8XS-2XQ-IN 或 CRS504-4XQ-IN）可连接到某个 **8B** 端口，但不应再额外连接接地的 **PSU**。

![](/img/7ba88acb3f5466e1.webp)

#### 使用场景 2 {#use-case-2}

要为 Passive PoE 设备供电，应使用 RBGPOE-CON-HP。可使用接地或浮地的 **PSU** 实现冗余。

![](/img/4fe5847c663f97ad.webp)

#### 使用场景 3 —— 802.3 af/at 受电设备使用非隔离 PoE 的特殊情况 {#use-case-3---special-cases-for-8023-afat-powered-device-with-non-isolated-poe}

- 应避免任何接地连接。
- 如果需要接地连接，对于使用非隔离 PoE 的受电设备，应使用 RBGPOE-CON-HP。
- 不能同时为受电设备使用接地的 PSU。
- SFP 笼、USB 和 RS232 端口不应与地相连。

![](/img/26252a58bcdf000a.webp)

## Reset 按钮 {#reset-button}

Reset 按钮具有以下功能：

- 在启动过程中按住此按钮，直到 USR LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 按住 Reset 按钮并给设备上电（等待 "USR" 灯闪烁后变为稳定 "On"，当 "USR" 灯 "Off" 时——松开 Reset 按钮）——设备将以 bootp 模式启动，使用 Netinstall 重新安装 RouterOS。**Netinstall 过程使用 MGMT/BOOT 以太网端口。** 有关使用 Netinstall 恢复工具的说明，请参阅 RouterOS 文档。

无论使用上述哪种方式，如果在设备通电前按下按钮，系统将加载备份的 RouterBOOT 引导程序。在 LED 开始闪烁之前松开按钮，则仅加载备份 RouterBOOT 而不进行重置。这对于 RouterBOOT 调试和恢复很有用。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 16 个千兆以太网端口（支持 Auto MDI/X，因此您可以使用直通线或交叉线连接其他网络设备）。
- 4 个 10G SFP 端口。
- 标记为 MGMT/BOOT 的端口。
- RJ45 串口。

## LED 指示灯 {#led-indicators}

- 路由器通电时 PWR LED 点亮。
- USER LED 指示设备在进入不同模式（例如重置配置或为使用 Netinstall 工具而启动设备）时的状态。
- PoE FAULT LED 指示超出了整体最大 PoE 输出限制。
- FAN FAULT LED 指示任一散热风扇出现问题。
- 三角形 LED（上排）指示 PoE-Out 状态：**红色 LED：** 表示相应端口使用 PoE 802.3af/at。
- **单个红色 LED 闪烁：** 表示启动低压或高压（802.3af/at）设备时出现问题。
- **紫色 LED：** 表示相应端口使用 PoE 802.3bt。
- **单个紫色 LED 闪烁：** 表示启动高压（802.3bt）设备时出现问题。
- 方形橙色和绿色以太网端口 LED 指示各个以太网端口的活动。
- 三角形 SFP+ 端口绿色 LED 指示各个 SFP+ 端口的活动。

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>**产品代码**</td><td>CRS320-8P-8B-4S+RM</td></tr><tr><td>**架构**</td><td>ARM 32 位</td></tr><tr><td>**CPU**</td><td>98DX226S，2 核，800 MHz</td></tr><tr><td>**交换芯片型号**</td><td>98DX226S</td></tr><tr><td>**RAM**</td><td>256 MB</td></tr><tr><td>**存储**</td><td>32 MB，Flash</td></tr><tr><td>**10/100/1000 以太网端口**</td><td>17（16 个带 PoE-out）</td></tr><tr><td>**SFP+ 端口**</td><td>4</td></tr><tr><td>**PoE-out**</td><td>802.3af/at/bt</td></tr><tr><td>**PoE-out 端口**</td><td>Ether1-Ether8（802.3af/at），Ether9-Ether16（802.3bt）</td></tr><tr><td>**每端口最大输出**</td><td>高达 90 W（802.3bt）</td></tr><tr><td>**交流输入**</td><td>100-240 V，50/60 Hz</td></tr><tr><td>**PSU 插槽数量**</td><td>2</td></tr><tr><td>**最大功耗**</td><td>600 W（使用第二个 PSU 时为 1150 W）</td></tr><tr><td>**无附件时的最大功耗**</td><td>36 W</td></tr><tr><td>**散热**</td><td>3 个风扇</td></tr><tr><td>**工作温度**</td><td>-10 °C 至 +50 °C</td></tr><tr><td>**操作系统**</td><td>RouterOS v7 / SwOS（双启动）</td></tr><tr><td>**MTBF**</td><td>25 °C 下约 200,000 小时</td></tr><tr><td>**认证**</td><td>CE、EAC、ROHS</td></tr><tr><td>**IP 防护等级**</td><td>IP20</td></tr></tbody></table>

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/crs320_8p_8b_4s_rm](https://mikrotik.com/product/crs320_8p_8b_4s_rm)

## 配件 {#accessories}

包装内包含随设备提供的以下配件：

![](/img/185d3677850674bc.webp)

支持的 SFP 模块请参见 [MikroTik 有线接口兼容性](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本和 SwOS。出厂预装的具体 RouterOS 版本列在 /system resource 中。其他操作系统尚未经过测试。
