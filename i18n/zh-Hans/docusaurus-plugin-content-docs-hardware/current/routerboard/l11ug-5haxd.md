---
title: "L11UG-5HaxD"
slug: /l11ug-5haxd
source: https://manual.mikrotik.com/hardware/l11ug-5haxd
captured_at: '2026-11-04T09:52:38+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/ec8ebacd87b1d206.jpg)

![](/img/00e8935b6a55ef3c.webp)

使用 Wi-Fi 6、双核 ARM CPU、PoE-in、千兆以太网和 RouterOS v7 构建您自己的定制室外 5 GHz CPE 或 AP！MMCX 连接器可让您打造多功能的全向接入点和强大的点对点链路。完整规格和宣传册请参见 [L11UG-5HaxD 产品页面](https://mikrotik.com/product/l11ug_5haxd)。

## 安全警告 {#safety-warnings}

在操作任何 MikroTik 设备之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。本产品的最终处置应遵守所有国家法律和法规。本产品出厂时不带外壳，需由经过培训的合格人员安装到外壳中。安装人员负责确保设备的安装符合当地和国家的电气规范。请勿尝试拆卸、修理或改装设备。开始安装前，请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的步骤，可能会对人员造成危险情况并损坏系统。请让本设备远离水、火、潮湿或高温环境。在开箱和处理电子元件时，请使用腕部接地带，以避免静电放电（ESD）损坏。开箱后，请将路由器放置在防静电垫上。安装设备时，请确保没有可能损坏或触碰 PCB 板的物体。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定区域。请熟悉将设备正确运送至您所在地区指定收集点的程序。本产品为 A 类产品。在居住环境中，本产品可能会引起无线电干扰，此时用户可能需要采取适当的措施。

**暴露于射频辐射**：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置应与您的身体、职业用户或普通公众保持不少于 20 厘米的距离。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 本产品出厂时不带外壳，设计用于安装到用户的最终产品或外壳中。兼容 CA411-711 和 CA433U MikroTik 外壳。
- 设备采用 ESD 防护包装。处理电气设备时，请遵守以下安全预防措施：在开箱和处理电子元件时，请使用腕部接地带，以避免静电放电（ESD）损坏；
- 开箱后，请将路由器放置在防静电垫上；
- 安装设备时，请确保没有可能损坏或触碰 PCB 板的物体；
- 可使用 PCB 板上出厂预留的孔位将设备安装到所需位置，这些孔位位于设备两侧；
- 使用以太网线将设备连接到随附的 PoE 注入器的数据+电源端；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 应使用 WinBox 配置工具进行配置 [https://mt.lv/winbox](https://mt.lv/winbox) 下载并打开 **WinBox**，选择 "**Neighbors**" 选项卡以查找设备；
- 点击 MAC 地址。用户名为 "**admin**"，没有密码（或者，某些型号请查看贴纸上的用户名和无线密码）；
- 如需手动更新设备，请访问产品页面 [https://mikrotik.com/products](https://mikrotik.com/products) 查找您的产品。所需软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 **WinBox** 的 **Files** 菜单并重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 "*QuickSet"* 菜单中设置 *"PTP Bridge AP"* 模式并选择您的国家，以应用国家法规设置；
- 根据所用天线设置天线增益；
- 在底部字段中设置路由器密码。

## 供电 {#powering}

设备可通过以下方式接受供电：

- 直接输入电源插孔（外径 5.5mm、内径 2mm，母头，中心正极插头）接受 12-28 V DC。
- 以太网端口接受 Passive PoE 18-28 V DC ⎓。最大负载下的功耗可达 15 W。

## 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 使用以太网线将设备连接到随附的 PoE 注入器的数据+电源端；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个千兆以太网端口；通过 passive PoE 注入器支持 18-28 V DC 输入。
- 一个 USB 端口。
- 2 个外部 MMCX 天线连接器。
- 集成无线模块，工作在 5 GHz，支持 802.11a/n/ac/ax 协议。

## 安装 {#mounting}

您可以将 L11UG-5HaxD 集成到各种场景中，例如自动售货机、ATM、售票站等；但如果是独立安装，您可能需要订购我们的铝制室内外壳。这些外壳与 RB411、911、912 和 922 所使用的相同，因此可重复使用。

## 配置 {#configuration}

我们建议点击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。请确保您已选择设备将要使用的国家，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。请向您当地的培训师寻求更多帮助，或自己成为培训师 [https://mikrotik.com/training/about](https://mikrotik.com/training/about)

## 复位按钮 {#reset-button}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（总共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备随后将查找 CAPsMAN 服务器（总共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总共 15 秒）。无论使用上述哪种方式，如果在对设备通电之前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这有助于 RouterBOOT 调试和恢复。

## 配件 {#accessories}

包装中包含以下随设备提供的附件：

- 欧盟开关电源 24 V DC ⎓，1.2 A，28.8 W。
- 带屏蔽连接器的千兆 POE 注入器线缆（RBGPOE）。

## 天线使用 {#antenna-usage}

请在设备关闭时连接和断开天线！

配置信息请参见 [Wireless Interface](/docs/wireless/abgn/wireless-interface)。

## 兼容外壳 {#compatible-enclosures}

兼容 CA411-711 和 CA433U MikroTik 外壳。

## 规格 {#specifications}

有关本产品的更多信息、规格、图片和下载内容，请访问我们的网页：[https://mikrotik.com/product/l11ug_5haxd](https://mikrotik.com/product/l11ug_5haxd)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及更高版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。
