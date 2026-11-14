---
title: "L23UGSR-5HaxD2HaxD"
slug: /l23ugsr-5haxd2haxd
source: https://manual.mikrotik.com/hardware/l23ugsr-5haxd2haxd
captured_at: '2026-11-04T09:52:48+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/f76c8433138ca7f1.jpg)

打造属于你自己的定制户外 Wi-Fi 6 接入点或 CPE！这款模块化无线路由器配备便捷的 MMCX 连接器，让你能够构建多功能的​​全向接入点和强大的点对点链路。完整规格和宣传册请参见 [L23UGSR-5HaxD2HaxD 产品页面](https://mikrotik.com/product/l23ugsr_5haxd2haxd)。

## 安全警告 {#safety-warnings}

在操作任何 MikroTik 设备之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。本产品的最终处置应按照所有国家法律和法规进行。本产品出厂时不带外壳，须由经过培训的合格人员安装到外壳中。安装人员负责确保设备安装符合当地和国家的电气规范。请勿尝试拆卸、修理或改装设备。开始安装前请仔细阅读安装说明。使用错误的硬件和配置或未遵循正确的操作步骤，可能对人员造成危险情况并对系统造成损坏。请使本设备远离水、火、潮湿或高温环境。拆包和处理电气元件时，请使用腕带接地，以避免静电放电（ESD）损坏。拆包后，请将路由器放置在防静电垫上。安装本机时，请确保没有可能损坏或接触 PCB 板的物体。我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，风险自负！为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定区域。请熟悉将设备正确运送到您所在地区指定收集点的程序。本产品为 A 类产品。在住宅环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露**：** 本 MikroTik 设备符合针对非受控环境制定的欧盟辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或普通公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 本产品出厂时不带外壳，设计为安装到用户的最终产品或外壳中。兼容 CA411-711 和 CA433U MikroTik 外壳。
- 设备采用防静电保护包装。处理电气设备时，请遵守以下安全预防措施：拆包和处理电气元件时，请使用腕带接地，以避免静电放电（ESD）损坏；
- 拆包后，请将路由器放置在防静电垫上；
- 安装本机时，请确保没有可能损坏或接触 PCB 板的物体；
- 可使用 PCB 板上出厂预留的孔位（位于设备两侧）将设备安装到您想要的位置；
- 连接外部天线（必需）；
- 将设备连接到电源；
- 在计算机上进入网络连接部分，找到名为“*MikroTik-...*”的无线网络。然后连接到它（请查看贴纸上的无线密码）；
- 应通过移动应用程序使用无线网络进行配置，也可以使用 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。下载并打开 **WinBox**，然后选择 **Neighbors** 选项卡找到设备；
- 点击 MAC 地址。用户名为“**admin**”，没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 如需手动更新设备，请访问 [https://mikrotik.com/products](https://mikrotik.com/products) 的产品页面找到您的产品。所需软件包可在“Support&Downloads”菜单下获取；
- 将下载的软件包上传到 **WinBox** 的 **Files** 菜单并重启设备。将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 **QuickSet** 菜单中设置以下内容：选择您所在的国家/地区，以应用国家/地区法规设置；
- 在左侧字段设置无线网络密码；
- 在底部字段设置路由器密码；
- 如果需要使用 SIM 卡，请将所需的调制解调器安装到 miniPCIe 插槽中；
- 将 Nano SIM 卡插入插槽。

## 供电 {#powering}

本设备可通过以下方式供电：

- 直接输入电源插孔（外径 5.5mm、内径 2mm，母头，正极针式插头）接受 12-28 V DC。
- 以太网端口接受 Passive PoE 18-28 V DC ⎓。最大负载下的功耗可达 25 W。

## 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 使用以太网线将设备连接到随附的 PoE 供电器的数据+电源端；
- 将 PoE 供电器的数据端连接到计算机；
- 将电源适配器连接到 PoE 供电器。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个千兆以太网端口；支持通过 Passive PoE 供电器输入 18-28 V DC。
- 一个 SFP 端口（支持 2.5G）。
- 一个 USB type A 端口。
- 一个 MiniPCI-e 插槽。
- 一个 SIM 插槽（Nano SIM）。
- 2 个外部 MMCX 天线连接器。
- 工作于 5 GHz 的集成无线模块，802.11a/n/ac/ax 协议。

## 安装 {#mounting}

您可以将 L23UGSR-5HaxD2HaxD 集成到各种场景中，例如自动售货机、ATM、售票站等，但如果是独立搭建，您可能需要订购我们的某款铝制室内机箱。与 RB411、911、912 和 922 所使用的机箱相同，因此可以重复使用。

## 配置 {#configuration}

我们建议点击 QuickSet 菜单中的“Check for updates”按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。请确保您已选择设备将要使用的国家/地区，以符合当地法规。RouterOS 除本文档所述之外还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问都会被阻止）。请向当地的培训师寻求更多帮助，或自己成为培训师 [https://mikrotik.com/training/about](https://mikrotik.com/training/about)

## Reset 按钮 {#reset-button}

Reset 按钮有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备此时将寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电之前按下按钮，系统将加载备份的 RouterBOOT 加载程序。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内含以下随设备提供的配件：

- 欧盟开关电源 24 V DC ⎓，1.2 A，28.8 W。
- 带屏蔽连接器的千兆 POE 供电器线缆（RBGPOE）。

## 天线使用 {#antenna-usage}

请在设备关闭时连接和断开天线！

有关配置信息，请参见[无线接口](/docs/wireless/abgn/wireless-interface)。

## 兼容外壳 {#compatible-enclosures}

兼容 CA411-711 和 CA433U MikroTik 外壳。

## 规格 {#specifications}

如需了解有关本产品的更多信息、规格、图片和下载内容，请访问我们的网页：[https://mikrotik.com/product/l23ugsr_5haxd2haxd#fndtn-specifications](https://mikrotik.com/product/l23ugsr_5haxd2haxd#fndtn-specifications)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。
