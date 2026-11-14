---
title: "FiberBox"
slug: /fiberbox
source: https://manual.mikrotik.com/hardware/fiberbox
captured_at: '2026-11-04T09:48:13+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### FiberBox (CRS105-5S-FB) {#fiberbox-crs105-5s-fb}

![](/img/9bbf101a7bc9df03.jpg)

Fiberbox 是一款带五个 SFP 端口的室外交换机，非常适合因距离限制而无法使用普通以太网线的场所。该设备具备防风雨能力，随附不锈钢卡箍和扎带，可直接安装在高桅杆和塔上。完整规格和宣传册请参见 [FiberBox 产品页面](https://mikrotik.com/product/fiberbox)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。本产品的最终处置应遵循所有国家和地方的法律法规。设备的安装必须符合当地和国家的电气规范。本产品设计为室外安装在立杆上。开始安装前请仔细阅读安装说明。使用错误的硬件和配置或未遵循正确的操作流程，可能对人员造成危险并损坏系统。仅使用制造商认可的电源和附件，这些可在本产品的原包装中找到。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！如果设备出现故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

![](/img/0a5239f68824311b.webp)

默认配置利用交换芯片功能来配置非管理型交换机。所有以太网端口都被加入交换机组，默认 IP 地址为 192.168.88.1/24。

- 初始连接必须通过以太网线，使用 MikroTik WinBox 工具完成。
- 使用 WinBox 从任意端口连接到默认 IP 地址 192.168.88.1，用户名为 admin，密码为空，设备已设置为交换机（或对于某些型号，请查看贴纸上的用户和无线密码）。
- 我们建议点击 "Check for updates" 按钮，并将系统软件更新到最新版本，以确保最佳性能和稳定性。
- 设置您的密码以保护设备。

## 安装 {#mounting}

我们建议为我们的设备使用 Cat6 屏蔽网线。

使用钢制卡箍从设备背面穿过。

![](/img/034816fd335cc080.webp)

固定到立杆上，并拧紧使其牢固。

![](/img/9db87c984f147b03.webp)

## 供电 {#powering}

设备支持以下供电方式：

- 直接输入电源（外径 5.5 mm、内径 2 mm，母头，中心针为正极）接受 DC ⎓ 9-30 V DC；该设备在最大负载下的功耗最高为 11 W。

## 配置 {#configuration}

除了本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：CRS3xx 和 CSS3xx 系列手册。初始连接必须通过以太网线，使用 MikroTik WinBox 工具完成。应使用 WinBox 从任意端口连接到默认 IP 地址 192.168.88.1，用户名为 admin，密码为空。出于恢复目的，可以从网络重新安装设备，请参见 MikroTik 有线接口兼容性。使用带有分离式 SFP+ 笼的设备时，仍不建议将 S+RJ10 收发器彼此相邻部署。请每隔一个接口使用 S+RJ10，以避免收发器过热而导致不可预测的行为。操作系统支持

设备支持 RouterOS v6。出厂预装的具体版本号显示在 RouterOS 菜单 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送往指定的废弃物处置场所。请了解您所在地区将设备正确运送到指定处置场所的相关流程。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制要求。这些限制旨在为商业安装环境中的有害干扰提供合理防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区操作本设备很可能造成有害干扰，此时用户需自费纠正干扰

FCC 警告：任何未经负责合规的一方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受收到的任何干扰，包括可能导致非预期运行的干扰。

注意：本设备已在周边设备使用屏蔽线缆的情况下进行测试。为确保合规，必须在本设备上使用屏蔽线缆。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备非预期运行的干扰。

本设备所含的免许可发射机/接收机符合加拿大创新、科学和经济发展部针对免许可无线电设备适用的 CNR 规定。允许在以下两个条件下运行：1) 本设备不得产生干扰；2) 本设备必须承受所收到的任何无线电干扰，即使该干扰可能导致其运行异常。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备生产日期信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），随后的两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
