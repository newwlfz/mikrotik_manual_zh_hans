---
title: "TG-LR92"
slug: /tg-lr92
source: https://manual.mikrotik.com/hardware/tg-lr92
captured_at: '2026-11-04T10:06:11+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/tg-lr92-8a6d0117f62f9c262e34369cb2d654fe.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/e353c3e4f15fd23d.jpg)

双频（915MHz 和 2.4GHz），专为美国使用而设计。完整规格和产品手册请参见 [TG-LR92 产品页面](https://mikrotik.com/product/tg_lr92)。LoRa® 高精度、可溯源至 NIST 的温度传感器节点

您可以在每个产品下的支持与下载部分找到软件手册 [https://mikrotik.com/products](https://mikrotik.com/products)

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 在任意墙面安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 未使用正确的硬件和配置，或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 我们无法保证因不当使用本设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备都必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 针对非受控环境制定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 概述 {#overview}

<table><thead><tr><th></th><th>TG-LR92</th></tr></thead><tbody><tr><td>温度范围</td><td>-20°C 至 +70°C</td></tr><tr><td>IP 等级</td><td>IP67</td></tr><tr><td>电池</td><td>1000mAh LiMn02</td></tr><tr><td>安装方式</td><td>绑带固定、M4 螺钉安装</td></tr><tr><td>温度传感器精度</td><td>在 -20°C 至 +70°C 范围内为 +/-0.3°C（最大值），可溯源至 NIST</td></tr><tr><td>内置加速度计</td><td>否</td></tr><tr><td>磁铁激活</td><td>是</td></tr><tr><td>可选配 Crypto Authentication</td><td>是</td></tr><tr><td>尺寸</td><td>74 x 45 x 19mm</td></tr><tr><td>GNSS 扫描器</td><td>否</td></tr><tr><td>Wi-Fi 扫描器</td><td>否</td></tr><tr><td>LoRa® 915MHz</td><td>是</td></tr><tr><td>LoRa® 2.4GHz</td><td>是</td></tr></tbody></table>

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处理场所。请了解将设备正确运送到您所在地区指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>TG-LR92</td><td>TV7-TGLR92</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装环境中的有害干扰提供合理防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），则鼓励用户尝试通过以下一项或多项措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或经验丰富的无线电/电视技术人员以获取帮助。**FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能使用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分的要求。其操作须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受所接收到的任何干扰，包括可能导致意外操作的干扰。

*注：本机的外围设备使用屏蔽电缆进行了测试。必须使用屏蔽电缆与本机配合，以确保合规。*

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>TG-LR92</td><td>7442A-TGLR92</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 标准的免许可发射器/接收器。其操作须满足以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备内含的免许可证发射器/接收器符合加拿大创新、科学与经济发展部（ISED）针对免许可证无线电设备适用的 CNR 标准。允许在以下两个条件下运行：1）设备不得产生干扰；2）设备必须接受任何接收到的无线电干扰，即使该干扰可能导致设备运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)
