---
title: "TG-LR82"
slug: /tg-lr82
source: https://manual.mikrotik.com/hardware/tg-lr82
captured_at: '2026-11-04T10:05:59+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/tg-lr82-69720aecca1b4446c1872862e03183cb.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/644b30fc44ce8252.jpg)

双频（868MHz 和 2.4GHz）。完整规格和宣传册请参见 [TG-LR82 产品页面](https://mikrotik.com/product/tg_lr82)。LoRa® 高精度、可溯源至 NIST 的温度传感器节点

软件手册可在各产品页面的“支持”与“下载”部分找到 [https://mikrotik.com/products](https://mikrotik.com/products)

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的常规做法。
- 本产品的最终处置应依照所有国家法律和法规进行。
- 在任何墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 未使用正确的硬件和配置，或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 我们无法保证因不当使用本设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 客户有责任遵守当地国家/地区的法规，包括在合法的频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业用户或公众的距离不得小于 20 厘米。

## 概述 {#overview}

<table><thead><tr><th></th><th>TG-LR82</th></tr></thead><tbody><tr><td>温度范围</td><td>-10°C 至 +70°C</td></tr><tr><td>IP 等级</td><td>IP65</td></tr><tr><td>电池</td><td>1100mAh LiMn02</td></tr><tr><td>安装方式</td><td>绑带固定、M4 螺钉固定</td></tr><tr><td>温度传感器精度</td><td>-20°C 至 +70°C 范围内为 +/-0.3°C（最大），可溯源至 NIST</td></tr><tr><td>内置加速度计</td><td>是</td></tr><tr><td>磁铁激活</td><td>是</td></tr><tr><td>尺寸</td><td>74 x 45 x 19mm</td></tr><tr><td>LoRa® 868MHz/915MHz</td><td>是</td></tr><tr><td>LoRa® 2.4GHz</td><td>是</td></tr></tbody></table>

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废弃物处置场。请了解将设备正确运送到您所在地区指定处置场的相关程序。

## UKCA 标识 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备制造日期的信息，以斜杠分隔的形式标注在设备标签序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），其后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

如需了解保修服务的详细信息，请联系您的经销商。

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## Norma Oficial Mexicana {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，且。
- 本设备必须接受任何干扰，包括可能导致其非预期运行的干扰。制造商：MikroTikls SIA, Unijas 2, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

![](/img/7182f05dc1a2f3bc.webp)

乌克兰国家通信和信息国家监管委员会 制造商：MikroTikls SIA，Unijas 2, Рига, Латвія, LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰境内使用须按照 2012 年 11 月 1 日第 559 号 NKРЗІ 决议（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）所规定的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA，Unijas 2, Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 TG-LR82 符合 2014/53/EU 指令。欧盟符合性声明的完整文本可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

<table><thead><tr><th>（EN）工作频率 / 最大输出功率（DE）工作频率 / 最大输出功率（FR）工作频率 / 最大输出功率（IT）工作频率 / 最大输出功率（ES）工作频率 / 最大输出功率（RU）工作频率 / 最大输出功率</th><th>LoRa</th><th>2400-2483.5 MHz / 14 dBm</th></tr></thead><tbody><tr><td>LoRa</td><td>863-870 MHz / 14 dBm</td><td></td></tr></tbody></table>
