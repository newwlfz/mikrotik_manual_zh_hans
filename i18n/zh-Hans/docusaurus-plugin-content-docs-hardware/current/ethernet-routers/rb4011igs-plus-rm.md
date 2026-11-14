---
title: "RB4011iGS+RM"
slug: /rb4011igs-plus-rm
source: https://manual.mikrotik.com/hardware/rb4011igs-plus-rm
captured_at: '2026-11-04T06:04:00+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

<p><Img src="/img/ed0c534e70eccc5f.jpg" alt="" width={799} height={497} /></p>

## [RB4011iGS+RM](https://mikrotik.com/product/rb4011igs_rm) {#rb4011igsrm}

设备已预配置基本设置，您只需插入 ISP 线缆即可开始使用互联网。我们建议您设置密码以保护设备。完整规格和宣传册请参见 [RB4011iGS+RM 产品页面](https://mikrotik.com/product/rb4011igs_rm)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家和地区的法律法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于安装于机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作步骤可能会对人员造成危险并损坏系统。
- 本产品设计用于室内安装。请将本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备必须由专业人员进行安装。

## 快速开始 {#quickstart}

- 将您的互联网线缆连接到第一个端口，将局域网计算机连接到其他端口；
- 选择您的供电方案，请参见供电部分；
- 将设备连接到电源；
- 配置您的网卡设置，使用 DHCP 自动获取 IP 地址；
- 应使用网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 进行配置。**提供多种配置方式以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 标签页查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，且没有密码（对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，并重启设备；
- 将您的 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

最大负载下的功耗可达 33 W。设备可通过电源插孔或第一个以太网端口供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2.1 mm，母头，正极插针插头）接受 12-57 V DC。
- 第一个以太网端口接受 18-57 V DC 的 PoE 供电。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 PoE 适配器的 PoE 端口；
- 将来自局域网的以太网线缆连接到 PoE 适配器的 LAN 端口，注意数据和电力流向的箭头；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从 [RouterOS 文档](https://mt.lv/help) 开始，以熟悉各种可能性。如果无法建立 IP 连接，可以使用 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从局域网侧通过设备的 MAC 地址进行连接（默认情况下，来自互联网端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参见复位按钮。

## 安装 {#mounting}

本设备设计用于室内使用，可使用随附的机架安装件安装在机架机箱中，也可以放置在桌面上。如果希望放置在平面上，请在路由器底部粘贴橡胶垫脚；如果指定用于机架机箱，请使用十字螺丝刀在设备两侧安装机架耳：

<p><Img src="/img/eb1f9b6b39ade041.webp" alt="" width={627} height={558} /></p>

- 将机架耳安装到设备两侧，并拧紧四颗螺丝将其固定到位；
- 将设备放入机架机箱并对齐孔位，使设备能够方便地安装到位；
- 拧紧螺丝将其固定到位。

本设备没有防水污染保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 线缆。*本设备的安装和配置应由合格人员完成。*

工作湿度可为 5% 至 95%，无冷凝。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 以太网端口分为两组，每组五个，每组通过一个交换芯片连接。端口可单独配置，并支持自动交叉/直通线缆校正（Auto MDI/X），因此您可以使用直通线或交叉线连接到其他网络设备。
- SFP+ 端口接受 SFP 和 SFP+ 模块。请参阅 [MikroTik 有线接口兼容性](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。
- RJ45 控制台端口用于串行控制台访问，默认设置为 115200 bit/s，8 个数据位，1 个停止位，无校验。

## 复位按钮 {#reset-button}

RouterBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置恢复为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置并桥接所有接口。
- 当 LED 熄灭后（约 20 秒）松开按钮，可使设备寻找 Netinstall 服务器（通过网络安全重装 RouterOS 时需要）。

无论使用上述哪种选项，如果在设备通电前按住按钮，系统将加载备份 RouterBOOT 加载器。这对于 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含随设备提供的以下附件：

- EU/US 开关电源 DC ⎓ 24 V 1.5 A 36 W 87.4% VI 150 cm RA DC 插头。
- K-60 紧固套件。DIN965，M3x6。
- 安装套件 4011 rm 支架。

支持的 SFP 模块请参见 [MikroTik 有线接口兼容性](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/rb4011igs_rm](https://mikrotik.com/product/rb4011igs_rm)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## 安全提示 {#safety-notice}

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废弃物处置场所。请了解您所在地区将设备正确运送到指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装环境中的有害干扰提供合理保护。

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能会导致有害干扰，在这种情况下，用户需要自费纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改都可能使用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何接收到的干扰，包括可能导致不良操作的干扰。

注意：本设备在外围设备上使用屏蔽线缆进行了测试。必须使用屏蔽线缆与本设备配合，以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备不良操作的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## Norma Oficial Mexicana {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置不得造成有害干扰；且
- 本设备必须接受任何干扰，包括可能导致其非预期操作的干扰。

制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039，拉脱维亚。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
