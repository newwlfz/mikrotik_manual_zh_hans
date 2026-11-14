---
title: "TG-BT5-OUT"
slug: /tg-bt5-out
source: https://manual.mikrotik.com/hardware/tg-bt5-out
captured_at: '2026-11-04T10:06:07+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/tg-bt5-out-6701945c9c74459ee406756e165fb981.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/92ad3dbf8b19a420.jpg)

TG-BT5-OUT 是预装电池、开箱即用的蓝牙标签。软件手册可在 [https://mikrotik.com/products](https://mikrotik.com/products) 各产品页面的“支持与下载”部分找到。完整规格和宣传册请参阅 [TG-BT5-OUT 产品页面](https://mikrotik.com/product/tg_bt5_out)。

## 软件相关链接 {#software-related-links}

通过以下链接可以找到使用 Android 应用配置该标签的指南：

适用于 Android 设备的 MikroTik Beacon Manager

通过以下链接可以找到使用 iOS 应用配置该标签的指南：

适用于 iOS 设备的 MikroTik Beacon Manager

通过以下链接可以找到有关该标签广播格式的更多信息：

MikroTik 标签广播格式

## 户外防水 IP69k - TG-BT5-OUT {#outdoor-water-proof-ip69k---tg-bt5-out}

![](/img/ad1ba1134725ff37.webp)

- 完全密封并灌封，防护等级 IP69k。
- 温度范围 -20..+85°C。
- 减震外壳。
- 内置 550mAh LiMnO2 电池。
- 适合绑扎固定。
- 内置温度传感器。
- 内置加速度计。
- 磁铁激活。
- NFC [序列号]。
- CryptoAuthentication [ATECC608A]。
- 尺寸 38x32x15mm。
- BLE 5.2，采用 Silabs BG22。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 在任何墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于安装在户外的立杆上。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 请仅使用制造商认可的电源和配件，这些电源和配件可在本产品的原始包装中找到。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法的频段内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备都必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备安装和操作时，与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 概述 {#overview}

TG-BT5-OUT 是我们 MikroTik 设备中的新成员。它是一个蓝牙标签（一个非常小的装置），可以附着在其他设备或其他物品上。蓝牙标签在 IoT 拓扑中扮演着重要角色，其中蓝牙用于在短距离内广播数据。安装并配置完成后，该标签会以 iBeacon、Eddystone 或 MikroTik 遥测（默认数据包格式）向网关（例如 KNOT）广播广播数据包。而网关则利用 MQTT 或 HTTP 协议将广播数据包的负载推送到远程服务器。

## 标签模式 {#tag-modes}

产品出厂时处于工厂休眠模式。在此模式下，所有组件尽可能关闭，MCU 进入最深度的休眠状态。电流消耗被降至最低，因此这是标签存放和/或不使用时首选的工作模式。要退出此模式，请将磁铁放在标签的边缘（即开关图标所在处），并保持 3-10 秒，直到 LED 熄灭。之后，标签退出休眠模式并进入广播模式。

在广播模式下，标签会广播蓝牙广播数据包。默认情况下，MikroTik 的广播数据包每 5 秒发送一次。这可以在配置模式下更改。

配置模式只能从广播模式进入，方法是将磁铁放在与退出工厂休眠流程相同的开关图标上。将磁铁保持 5-10 秒后，LED 会熄灭，标签进入配置模式。如果保持磁铁超过 15 秒，或者未使用配置应用连接到标签，它将会返回广播模式。

当设备第一次从工厂休眠状态唤醒时，它具有以下默认配置：

<table><thead><tr><th>配置参数</th><th>设置/值</th></tr></thead><tbody><tr><td>广播数据包格式</td><td>MikroTik</td></tr><tr><td>广播间隔</td><td>5.0 seconds</td></tr><tr><td>角度阈值/倾斜触发</td><td>60°</td></tr><tr><td>自由落体阈值/加速度计触发</td><td>156.25 mg</td></tr><tr><td>唤醒阈值/唤醒触发</td><td>1.0 mg</td></tr><tr><td>带宽滤波器</td><td>0.8 Hz</td></tr><tr><td>低噪声滤波器</td><td>disabled</td></tr><tr><td>发射功率</td><td>4 dBm</td></tr></tbody></table>

磁铁用于触发簧片开关，以如上所述更改标签的工作模式。一旦检测到磁铁（簧片开关被激活），LED 将在接下来的 5 秒内（前 5 秒）开始闪烁，然后停止。它可以帮助您确认 5 秒已经过去，此时您可以移开磁铁以进入配置模式。

![](/img/e71c2361c897d91f.webp)

![](/img/82b5a659ee237862.webp)

![](/img/317ecb51aa2c59ad.webp)

## 初始步骤 {#initial-steps}

安装“MikroTik Beacon Manager”应用并运行它。

对于 Android 设备，可通过以下链接找到它。

- 首次登录时，您会看到附近设备的列表（处于广播模式或配置模式的设备）：

![](/img/75cd45d644b39f1a.webp)

要将标签从工厂休眠模式“唤醒”，应激活簧片开关 3-10 秒。

- 设备一旦“唤醒”，就会出现在“MikroTik Beacon Manager”列表中。选择该标签，然后按下“CONFIG ONLY”按钮即可开始配置：

![](/img/ced59977c5443fe5.webp)

![](/img/46257b517e9bdd48.webp)

- 紧接着，您需要将磁铁放在设备上方 10 秒（此步骤会将设备设置为配置模式）：

![](/img/9e85d34e72af9de5.webp)

- 经过短暂的启动时间后，设备应已准备好进行配置：

![](/img/4c13d17f4a24770a.webp)

应用会在“Status”选项卡中显示关于该标签的常规信息，并允许您使用“Settings”选项卡更改标签的设置（如上图所示）。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送至指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>TG-BT5-OUT</td><td>TV7-TB5O</td></tr></tbody></table>

本设备经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的有害干扰防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭并重新开启设备来确定），则建议用户尝试通过以下一项或多项措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 向经销商或有经验的无线电/电视技术人员寻求帮助。 **FCC 警告：** 任何未经合规负责方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。

本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

*注意：本机使用带屏蔽线缆的外围设备进行了测试。必须使用屏蔽线缆连接本机以确保合规。*

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>TG-BT5-OUT</td><td>7442A-TB5O</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须符合以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备内含的免许可证发射器/接收器符合加拿大创新、科学与经济发展部（ISED）针对免许可证无线电设备适用的 CNR 标准。允许在以下两个条件下运行：1）设备不得产生干扰；2）设备必须接受任何接收到的无线电干扰，即使该干扰可能导致设备运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备制造日期信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后面两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 {#norma-oficial-mexicana}

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照乌克兰国家通信与信息化监管委员会 2012 年 11 月 1 日第 559 号决议（于 2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）规定的程序获得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 TG-BT5-OUT 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### WLAN / Bluetooth / LTE {#wlan--bluetooth--lte}

<table><thead><tr><th>(EN) 工作频率 / 最大输出功率 (DE) 工作频率 / 最大输出功率 (FR) 工作频率 / 最大输出功率 (IT) 工作频率 / 最大输出功率 (ES) 工作频率 / 最大输出功率 (RU) 工作频率 / 最大输出功率</th><th>Bluetooth</th><th>2400-2483.5 MHz / 3.5 dBm</th></tr></thead></table>

**Bluetooth 认证产品

![](/img/cf3c8d2919f980e2.webp)

本产品已成功完成 Bluetooth 认证流程。有关 Bluetooth 认证产品的更多信息，请使用以下链接：[https://launchstudio.bluetooth.com/Listings/Search](https://launchstudio.bluetooth.com/Listings/Search)
