---
title: "RB2011UiAS-IN"
slug: /rb2011uias-in
source: https://manual.mikrotik.com/hardware/rb2011uias-in
captured_at: '2026-11-04T06:03:51+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/f41cf8bc26552406.webp" alt="" width={798} height={275} /></p>

## [RB2011UiAS-IN](https://mikrotik.com/product/RB2011UiAS-IN) {#rb2011uias-in}

RB2011UiAS-IN 是一款室内有线路由器，配备五个千兆以太网端口和五个百兆以太网端口、一个 SFP 插槽、USB 接口、LCD 面板，以及 Ether10 上的 PoE-out。完整规格和宣传册请参见 [RB2011UiAS-IN 产品页面](https://mikrotik.com/product/RB2011UiAS-IN)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备供室内使用，可放置在平坦表面上或安装在墙上。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 本产品设计用于室内安装。请让本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些电源和配件可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备出现故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员安装。

## 快速开始 {#quickstart}

- 将您的互联网网线连接到端口 1，将本地网络计算机连接到端口 2-10；
- 选择您的供电方案，请参见“供电”部分；
- 将设备连接到电源；
- 配置您的网卡设置，以便通过 DHCP 自动获取 IP 地址；
- 应使用 Web 浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性；**
- 在 Web 浏览器中打开 https://192.168.88.1 以开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 标签页来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

设备可通过电源插孔或 LAN1 以太网端口供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心针为正极）接受 8-30 V DC（过压保护从 30 V 开始）。
- Eth1 端口可接受来自非标准（无源）以太网供电注入器的 8-30 V DC 输入（在板端；长线缆上需要更高电压以补偿功率损耗）。该板不支持符合 IEEE802.3af 的 48 V 电源注入器。

最大功耗 6 W，带附加设备时为 18 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将来自设备的以太网线连接到 PoE 适配器的 PoE 端口；
- 将以太网线从您的 LAN 连接到 PoE 适配器的 LAN 端口，注意数据和电源流向的箭头；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 电源输出 {#power-output}

Ether10 上的 PoE-out 输出电压约比输入电压低 2 V，并最高支持 0.58 A，因此随附的 24 V PSU 将在 Ether10 PoE 端口上提供 22 V、0.58 A 的输出。

## 配置 {#configuration}

除了本文档中描述的内容之外，RouterOS 还包含许多配置选项。我们建议先从 [RouterOS 文档](https://mt.lv/help) 开始，以熟悉各种可能性。如果无法使用 IP 连接，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参见“复位按钮”部分。

## 安装 {#mounting}

本设备设计用于室内使用，可放置在平坦表面上，所有需要的线缆都连接到设备前面。或者，本设备也可以安装在墙上，安装套件需单独获取，详细信息请访问我们的产品页面：[https://mikrotik.com/product/RBWMK](https://mikrotik.com/product/RBWMK) 接地螺丝位于设备外壳背面，请相应地将其连接到有效接地。

<p><Img src="/img/89a51fc3d8a42270.webp" alt="" width={50} height={81} /></p>

在墙上安装时，请确保线缆进线方向朝下。本设备的 IPX 防护等级为 IPX0。我们建议使用 Cat6 屏蔽线缆。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 五个 10/100/1000（千兆）以太网端口（Auto MDI/X）
- 五个 10/100（百兆）以太网端口（Auto MDI/X）
- Ether10 支持 500 mA 输出功率，约比输入电压低 2 V。Power-out 支持自动检测以保护非 PoE 设备。
- 1G SFP 端口。
- MicroUSB 插槽，AB 型。
- 串行端口。
- 用于配置的 LCD。

请参见 [MikroTik SFP 模块兼容性表](/docs/wired-connections/mikrotik-wired-interface-compatibility)。

## 复位按钮 {#reset-button}

RouterBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置重置为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置并桥接所有接口。
- 当 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 所必需）。

无论使用上述哪种选项，如果在设备接通电源之前按下按钮，系统将加载备份的 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/RB2011UiAS-IN](https://mikrotik.com/product/RB2011UiAS-IN)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

## 安全声明 {#safety-notice}

为避免环境污染，请将本设备与生活垃圾分开，并以安全的方式处置，例如送到指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装中的有害干扰提供合理保护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册进行安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备可能会造成有害干扰，在这种情况下，用户需要自费纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不会造成有害干扰，(2) 本设备必须接受所收到的任何干扰，包括可能导致非预期运行的干扰。注意：本设备已使用屏蔽线缆连接外围设备进行测试。必须使用屏蔽线缆连接本设备以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，(2) 本设备必须接受任何干扰，包括可能导致设备非预期运行的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。其操作获准在以下两个条件下进行：(1) 设备不得产生干扰，(2) 设备用户必须接受所受到的任何无线电干扰，即使该干扰可能影响其正常运行。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备制造日期信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置不得造成有害干扰；且
- 本设备必须接受任何干扰，包括可能导致其非预期操作的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
