---
title: "LHG Lite60"
slug: /lhg-lite60
source: https://manual.mikrotik.com/hardware/lhg-lite60
captured_at: '2026-11-04T09:53:41+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/lhg-lite60-78d98dce5497554c58a20e9c0f69791e.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/c0b45e24aa858424.webp)

## [LHG Lite60](https://mikrotik.com/product/lhg_lite60) (RBLHG-60ad) {#lhg-lite60-rblhg-60ad}

LHG Lite 60 是一款室外无线路由器，内置定向天线，工作于 60GHz 频段。它可用作 CPE，连接到工作在 60GHz 接入点模式下的 MikroTik 设备。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 在任何墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计为室外抱杆安装。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 请仅使用制造商认可的电源和配件，这些均可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在法律允许的频段内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。
- 本设备为 A 类设备。在居住环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

## 组装 {#assembly}

将两条支脚安装到 LHG 外壳上，然后将组装好的 LHG 单元对准相应位置卡入网格中。用两颗自攻螺钉（随附，请使用 PH2 十字螺丝刀）将支脚固定到位。包装中还包含一个接地线连接器和一个精密对准支架。对准说明可在产品页面上查阅：[https://mikrotik.com/products/](https://mikrotik.com/products/)。

## 连接 {#connecting}

- 打开以太网舱门，将以太网线连接到以太网端口，并将网线的另一端连接到随附的 PoE 供电器（LHG Lite60），或连接到 802.3af/at 电源（仅 LHG 60G 型号支持）。
- 将 PoE 供电器插入您的网络交换机或 ISP 互联网接口。
- 将随附的电源插入 PoE 供电器，为设备启动供电。
- 为便于配置，请将您计算机的 IP 配置设为静态，地址范围 192.168.88.0-254（/24 或 255.255.255.0）。
- 设备的默认 IP 地址为 192.168.88.1/24，请在网页浏览器中打开该地址以开始配置。用户名为 admin，没有密码（某些型号请查看贴纸上的用户名和无线密码）。设备已预配置为 w60g station，您只需选择要连接的 AP 并设置设备密码即可。可在默认加载的 quickSET 标签页中完成此操作。如果无法通过 IP 连接，可以使用 WinBox 通过设备的 MAC 地址进行连接。我们建议点击 "Check for updates" 按钮并将 RouterOS 软件更新到最新版本，以确保最佳的性能和稳定性。有关使用 RouterOS 和连接此设备的更多信息，请参阅我们的文档：[https://mt.lv/help](https://mt.lv/help)

## 供电 {#powering}

LHG Lite60 仅接受来自无源 PoE 供电器的 12-30 V 供电（随附一个电源和一个 PoE 供电器）。LHG 60G 接受 12-57 V 的 802.3af/at 供电，同时也支持无源 PoE。两种型号在最大负载下的功耗均可达到 5 W。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个以太网口（10/100 Mbit 或千兆，取决于型号），支持自动交叉/直通线缆纠正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。
- 一个集成的 w60g 接口，带内置天线。

## 按钮和跳线 {#buttons-and-jumpers}

routerBOOT 复位按钮具有以下功能。按住按钮并通电，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置并恢复默认值。
- 当 LED 熄灭（约 20 秒）后松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时所需）。无论使用上述哪种方式，如果在给设备通电之前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。设备包含一个接地连接（标记为 ⏚），您应将其连接到设备使用地点所在塔架或建筑物的接地装置。这可大幅降低静电放电和雷击损坏的风险。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列于 /system resource 中。其他操作系统未经测试。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBLHG-60ad</td><td>TV7LHG60AD</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制要求。这些限制旨在为商业安装环境中的有害干扰提供合理防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在居住区域操作本设备很可能造成有害干扰，此时用户需要自费纠正该干扰。

**FCC 警告：** 未经负责合规的一方明确批准的任何更改或修改，可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分的规定。其操作须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何收到的干扰，包括可能导致意外操作的干扰。本设备及其天线不得与其他任何天线或发射器放置在一起或联合运行。

除 FCC CFR §15.255 (b) 所列条件外，本设备不得在飞机上使用。

**重要提示：射频辐射暴露。** 天线与用户之间必须保持至少 20 cm 的距离。在此配置下，可满足 FCC 针对人群/非受控环境所规定的射频暴露限值。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>RBLHG-60ad</td><td>7442A-LHG60AD</td></tr></tbody></table>

本设备符合加拿大工业部免许可证 RSS 标准。其操作须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备操作异常的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

**重要说明！IC 辐射暴露声明：** 本设备符合 IC RSS-102 针对非受控环境所规定的辐射暴露限值。本设备安装和运行时，辐射源与您身体之间的最小距离应为 20cm。Cet équipement est conforme aux limites d'exposition aux rayonnements IC établies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé avec un minimum de 20 cm de distance entre la source de rayonnement et votre corps.

除 ISED RSS-210 Annex J.1 所列条件外，本设备不得在飞机上使用。Cet appareil ne doit pas être utilisé sur un avion, sauf dans les conditions énumérées ISED RSS-210 Annex J.1.
