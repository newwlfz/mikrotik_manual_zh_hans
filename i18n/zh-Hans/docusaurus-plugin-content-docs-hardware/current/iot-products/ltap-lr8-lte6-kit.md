---
title: "LtAP LR8 LTE6 kit"
slug: /ltap-lr8-lte6-kit
source: https://manual.mikrotik.com/hardware/ltap-lr8-lte6-kit
captured_at: '2026-11-04T09:55:43+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/ltap-lr8-lte6-kit-71d41280de7103b44c39d02f829e279a.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/30e4f8523c74a8b6.jpg)

### [LtAP LR8 LTE6 kit](https://mikrotik.com/product/ltap_lr8g_lte6_kit)（LtAP-2HnD&FG621-EA&LR8） {#ltap-lr8-lte6-kit-ltap-2hndfg621-ealr8}

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律法规进行处理。
- 在任何墙面安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于在室外立杆上安装，但也可在室内安装。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险情况并损坏系统。
- 请仅使用制造商认可的电源和配件，这些均可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地的法规，包括在法律允许的频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置应与您的身体、职业使用者或公众保持不小于 30 厘米的距离。

## 快速开始 {#quickstart}

请按照以下快速步骤设置您的设备：

- 打开底部盖板；
- 将 Mini SIM 卡插入卡槽；
- 将设备连接到电源；
- 在您计算机上进入网络连接部分，找到名为 "MikroTik-..." 的无线网络，然后连接到它（请查看贴纸上的无线密码）；
- 应通过移动应用程序经由无线网络进行配置，或者您可以使用 "WinBox" 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。下载并打开 "WinBox"，选择 "Neighbors" 标签页以查找设备；
- 点击 MAC 地址。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问产品页面 [https://mikrotik.com/products](https://mikrotik.com/products) 找到您的产品。所需的软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 "WinBox" 的 "Files" 菜单并重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码；
- 在产品内的标签上找到您的 LR Gateway ID，并在您的网络服务器中注册它。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/7b3321c1cbf665d8.webp)

- 内置 2 GHz 无线接入点模块，支持 AP/station/bridge/p2p 模式。板载内置 PIF 天线，以及用于外接天线的 MMCX 连接器（可通过软件选择）。
- 两个 miniPCIe 插槽和三个 SIM 卡槽。
- 内置 GPS 模块，配有外部 SMA 连接器。
- 千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。直通线或交叉线均可用于连接其他网络设备。以太网端口可通过无源 PoE 注入器接受 12-30 V DC 供电。
- 一个 DB9 RS232 串口，用于串行控制台访问。配置为 115200 bit/s、8 个数据位、1 个停止位、无校验。
- 一个 USB 2.0 端口。
- R11e-LR8，带有外部 SMA 连接器的 miniPCIe 卡。

## 安装 {#mounting}

- 可以使用随附的四颗螺丝和机身上的四个孔将设备固定在墙上。
- 端口由一个小门保护，该门由两颗螺丝固定。取下它即可访问以太网端口、天线连接器、SIM 卡槽等。
- 该门为所有可用端口留有开口，因此您可以引出所有必要的线缆，但请只打开始终要使用的开口。
- 机壳上提供了多个用于外接天线的位置，请使用合适尺寸的钻头将其打开。请小心并测量所选天线，以确保安装后不会碰到内部 PCB 板。

![](/img/dc0a3d4ff60b80cb.webp)

该设备既可在室内也可在室外使用。IP 防护等级为 IP54。

如果您打算在室外安装，请确保任何线缆开口都朝下。安装方向由设备上指向上的箭头指示。请使用 PoE 注入器和正确的接地。建议使用 Cat6 屏蔽电缆。警告！本设备的安装和操作应与您的身体保持至少 30 厘米的距离。在住宅环境中操作本设备可能会造成无线电干扰。设备外壳上留有可钻孔的位置，用于外接 LTE 和 GPS 天线。请使用钻头钻出与所用天线线缆相匹配的孔。

## 配置 {#configuration}

我们建议点击 "Check for updates" 按钮并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始，以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法进行 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下从互联网端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参阅该章节（链接）第 4 部分；- 有关如何放置橡胶密封圈以实现最佳防水保护的参考，请参阅下图；

- 重新装配时请注意顺序。PCB 螺丝的拧紧力矩为 0.3 Nm，机壳盖/外壳螺丝为 0.5 Nm。

![](/img/03bc306812c7acce.webp)

在您将设备重新装入机壳并用先前拆下的螺丝固定之后，请将移动运营商的 SIM 卡滑入 SIM 卡槽，芯片朝向如端口标签所示。该卡槽接受 miniSIM（2FF）。SIM 卡槽 2 和 3 适用于底部 miniPCIe 插槽，可在 RouterOS 的 "/system routerboard sim" 菜单中切换。

## 复位按钮 {#reset-button}

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可复位 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在将寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电前按下按钮，系统将加载备份的 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装内包含随设备提供的配件：

- K-67 紧固件套装。包含四颗 4x25 mm 螺丝、四个 6x30 mm 膨胀螺栓。
- DC ⎓ 电缆（H4130-04PDB000R 3 mm 2x2P Housing）转（StripJacket 5 cm+WireEnd Strip/Tin 1 cm）24 AWG（黑/红/蓝/橙）0.35 m。
- EU/US 开关电源 24 V、1.2 A、28.8 W、86.8%、VI，DC ⎓ 电缆：220 cm RA DC plug mod Hor CMC 短插头。

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名将已填写。
- 点击 Connect 以通过无线网络建立与设备的连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废物处置场所。请了解您所在地区将设备正确运往指定处置场所的相关程序。
