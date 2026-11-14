---
title: "hEX"
slug: /hex
source: https://manual.mikrotik.com/hardware/hex
captured_at: '2026-11-04T05:58:35+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/186198cd3481b9f9.jpg" alt="" width={800} height={509} /></p>

## [hEX](https://mikrotik.com/product/RB750Gr3) (RB750Gr3) {#hex-rb750gr3}

5 个千兆以太网端口、双核 880MHz CPU、256MB RAM、USB、microSD、RouterOS L4。完整规格和产品手册请参阅 [hEX 产品页面](https://mikrotik.com/product/RB750Gr3)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备仅供室内使用，可放置在平坦表面上或安装于墙上。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的步骤可能会导致人员面临危险以及系统损坏。
- 请使本产品远离水、火、潮湿或高温环境。
- 请仅使用制造商认可且可在本产品原包装中找到的电源和附件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

- 选择您的供电方案，请参阅“供电”部分了解可行的方案；
- 确保您的 ISP 接受硬件变更并将自动分配 IP 地址；
- 将 ISP 线缆连接到 Ethernet1 端口；
- 将设备连接到电源；
- 将您的网卡设置为使用 DHCP 自动获取 IP 地址；
- 将 PC 连接到除 Ethernet1 以外的任意端口；
- 应使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方法以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将您的 RouterOS 软件更新到最新版本将确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 安装 {#mounting}

本设备设计用于室内，可放置在平坦表面上或安装于墙上，安装点如下图所示，包装中不包含螺丝。尺寸为 4x25 mm 的螺丝较为合适，视墙面结构而定，如有需要可使用 6x30 mm 的膨胀螺栓和 6 mm 钻头。安装在墙上时，请确保线缆出口朝下。我们建议为我们的设备使用 Cat6 线缆。本设备的 IP 防护等级为 IPX0。

<p><Img src="/img/e8c99734ffbc0e6b.webp" alt="" width={592} height={504} /></p>

## 供电 {#powering}

本设备可通过电源插孔或第一个以太网端口（无源 PoE）接受供电：

- 直接输入电源插孔（外径 5.5mm、内径 2mm，母头，正极针）可接受 8-30 V ⎓DC。
- 第一个以太网端口可接受无源 PoE 8-30 V ⎓DC。建议使用 12 V 或更高电压以补偿线缆损耗。

本设备在带附件满载情况下的功耗为 10 W。不带附件时为 5 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 PoE 适配器的 PoE 端口；
- 将来自您局域网的以太网线缆连接到 PoE 适配器的 LAN 端口，注意数据与功率流向的箭头；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help) 开始了解各种可能性。如果无法建立 IP 连接，可使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参阅“复位按钮”。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 本设备有五个独立的以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。
- MicroSD 卡槽。
- USB type-A 插槽。

## 复位按钮 {#reset-button}

RouterBOOT 复位按钮具有以下功能。按下按钮并通电，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置并将所有接口桥接。
- 在 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统将加载备用 RouterBOOT 加载器。这对 RouterBOOT 调试和恢复很有用。

## 模式按钮 {#mode-button}

可通过 RouterOS 软件配置模式按钮的动作，以执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 配件 {#accessories}

包装中包含随设备提供的以下附件：

- DC ⎓ 欧盟/美国开关电源 24 V，0.38 A，9 W，Level VI，线缆：1.5 m。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/RB750Gr3](https://mikrotik.com/product/RB750Gr3)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 安全提示 {#safety-notice}

为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如送往指定的废物处置场所。请熟悉您所在地区将设备正确运送到指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的有害干扰防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一项或多项措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。FCC 警告：未经合规责任方明确批准的任何更改或修改都可能使用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰，(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

注意：本设备在外围设备上使用屏蔽线缆进行了测试。必须使用屏蔽线缆配合本设备，以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须符合以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
