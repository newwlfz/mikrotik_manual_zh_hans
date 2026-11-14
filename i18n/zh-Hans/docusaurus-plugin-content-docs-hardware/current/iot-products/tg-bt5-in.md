---
title: "TG-BT5-IN"
slug: /tg-bt5-in
source: https://manual.mikrotik.com/hardware/tg-bt5-in
captured_at: '2026-11-04T10:05:47+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可作为 <a href="/assets/files/tg-bt5-in-c808773bd63bcc571c9cefe268e5bc79.pdf" target="_blank" rel="noopener">PDF 文件</a> 下载。

![](/img/36aaff792f3485db.jpg)

TG-BT5-IN 是一款即用型蓝牙标签，预装了电池。您可以在 [https://mikrotik.com/products](https://mikrotik.com/products) 的“支持”和“下载”部分中各产品页面下找到软件手册。完整规格和宣传册请参见 [TG-BT5-IN 产品页面](https://mikrotik.com/product/tg_bt5_in)。

## 软件相关链接 {#software-related-links}

您可以通过以下链接找到使用 Android 应用程序配置该标签的指南：

适用于 Android 设备的 MikroTik Beacon Manager

您可以通过以下链接找到使用 iOS 应用程序配置该标签的指南：

适用于 iOS 设备的 MikroTik Beacon Manager

您可以通过以下链接找到有关该标签广播格式的更多信息：

MikroTik 标签广播格式

## 室内细长矩形外形 - TG-BT5-IN {#indoor-slim-rectangular-shape---tg-bt5-in}

![](/img/e6632e6a533f4d0f.webp)

- 温度范围 -20..+60°C。
- 内置加速度计。
- 磁铁激活。
- 尺寸 35x22x7mm。
- BLE 5.2，采用 Silabs BG22。
- 防风雨（密封）版本，内置不可更换的 LiMnO2 CR2032（220mAh）电池。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商认可的电源和附件，这些电源和附件可在本产品的原始包装中找到。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备安装和运行时，应与您的身体、职业使用者或公众保持不少于 20 厘米的距离。

## 概述 {#overview}

TG-BT5-IN 是我们 MikroTik 设备系列的新成员。它是一款蓝牙标签（一个非常小的装置），可以附着在其他设备或其他物品上。蓝牙标签在 IoT 拓扑中发挥着重要作用，其中蓝牙用于在短距离内广播数据。安装并配置完成后，标签会以 iBeacon、Eddystone 或 MikroTik 遥测（默认数据包格式）向网关（例如 KNOT）广播 advertising 数据包。而网关则利用 MQTT 或 HTTP 协议将 advertising 数据包的有效载荷推送到远程服务器。

## 标签模式 {#tag-modes}

产品出厂时处于工厂睡眠模式。在此模式下，所有组件尽可能关闭，MCU 进入最深度的睡眠状态。电流消耗降至最低，因此这是在标签存放和/或不使用时首选使用的模式。要退出此模式，请将磁铁放在标签边缘（即“磁性开关”所在位置），并保持 3-10 秒，直到 LED 熄灭。之后，标签退出睡眠模式并进入广播模式。

在广播模式下，标签会广播蓝牙 advertising 数据包。默认情况下，MikroTik 的 advertising 数据包每 5 秒发送一次。这可以在配置模式下更改。

配置模式只能从广播模式进入，方法是像退出工厂睡眠流程那样，将磁铁施加到磁性开关上。施加磁铁 5-10 秒后，LED 将熄灭，标签进入配置模式。如果您施加磁铁的时间超过 15 秒，或者未使用配置应用程序连接到标签，它将返回广播模式。

当设备首次从工厂睡眠中唤醒时，具有以下默认配置：

<table><thead><tr><th>配置参数</th><th>设置/值</th></tr></thead><tbody><tr><td>Advertising 数据包格式</td><td>MikroTik</td></tr><tr><td>Advertising 间隔</td><td>5.0 秒</td></tr><tr><td>角度阈值/倾斜触发</td><td>60°</td></tr><tr><td>自由落体阈值/加速度计触发</td><td>156.25 mg</td></tr><tr><td>唤醒阈值/唤醒触发</td><td>1.0 mg</td></tr><tr><td>带宽滤波器</td><td>0.8 Hz</td></tr><tr><td>低噪声滤波器</td><td>disabled</td></tr><tr><td>Tx 功率</td><td>0 dBm</td></tr></tbody></table>

磁铁用于干簧管，以如上所述更改标签的工作模式。一旦检测到磁铁（干簧管被激活），LED 将在接下来的 5 秒内（前 5 秒）开始闪烁，然后停止。这可以帮助您确认 5 秒已经过去，您可以移除磁铁以进入配置模式。

![](/img/ce5411a28493da0a.webp)

## 初始步骤 {#initial-steps}

安装“MikroTik Beacon Manager”应用程序并运行该应用。

对于 Android 设备，您可以通过链接找到它。

- 首次登录时，您将看到附近设备列表（处于广播模式或配置模式的设备）：

![](/img/75cd45d644b39f1a.webp)

要将标签从工厂睡眠模式“唤醒”，应激活干簧管 3-10 秒。

- 设备一旦“唤醒”，就会显示在“MikroTik Beacon Manager”列表中。选择该标签，然后按“CONFIG ONLY”按钮即可开始配置：

![](/img/ced59977c5443fe5.webp)

![](/img/46257b517e9bdd48.webp)

- 紧接着，您需要将磁铁放在设备上方 10 秒（此步骤会将设备设置为配置模式）：

![](/img/9e85d34e72af9de5.webp)

- 经过短暂准备时间后，设备应已准备好进行配置：

![](/img/4c13d17f4a24770a.webp)

应用程序将在“Status”选项卡中显示有关该标签的常规信息，并允许您使用“Settings”选项卡更改标签的设置（如上图所示）。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCC ID</th></tr></thead><tbody><tr><td>TG-BT5-IN</td><td>TV7-TB5I</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的保护，防止有害干扰。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不能保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整或重新放置接收天线。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以获取帮助。 **FCC 警告：** 任何未经合规责任方明确批准的更改或修改，都可能导致用户操作本设备的权限失效。

本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外操作的干扰。

注意：本设备在测试时，外围设备使用了屏蔽电缆。必须使用屏蔽电缆连接本设备以确保合规。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>TG-BT5-IN</td><td>7442A-TB5I</td></tr></tbody></table>

本设备包含符合加拿大创新、科学与经济发展部免许可 RSS 的免许可发射器/接收器。操作须符合以下两个条件：(1) 本设备不得造成干扰。(2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。

本设备内含的免许可证发射器/接收器符合加拿大创新、科学与经济发展部（ISED）针对免许可证无线电设备适用的 CNR 标准。允许在以下两个条件下运行：1）设备不得产生干扰；2）设备必须接受任何接收到的无线电干扰，即使该干扰可能导致设备运行异常。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

Информация о дате изготовления устройства указана в конце серийного номера на его наклейке через дробь. Первая цифра означает номер года (последняя цифра года), две последующие означают номер недели.

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

## 乌克兰国家通信和信息监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

Для експлуатації в Україні необхідно отримати дозвіл на експлуатацію у порядку, затвердженому рішенням НКРЗІ від 01.11.2012 № 559, зареєстрованому в Міністерстві юстиції України 03.01.2013 за № 57/22589.

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

Mikrotīkls SIA 在此声明，无线电设备类型 TG-BT5-IN 符合指令 2014/53/EU。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 蓝牙 {#bluetooth}

<table><thead><tr><th>(EN) Operating Frequency / Maximum output power (DE) Betriebsfrequenz / maximale Ausgangsleistung (FR) Fréquence de fonctionnement / puissance de sortie maximale (IT) Frequenza operativa / massima potenza di uscita (ES) Frecuencia de funcionamiento / potencia de salida máxima (RU) Рабочая частота / максимальная выходная мощность</th><th>Bluetooth</th><th>2400-2483.5 MHz / 3.5 dBm</th></tr></thead></table>

**Bluetooth 认证产品

![](/img/cf3c8d2919f980e2.webp)

本产品已成功完成蓝牙认证流程。有关蓝牙认证产品的更多信息，请使用以下链接：[https://launchstudio.bluetooth.com/Listings/Search](https://launchstudio.bluetooth.com/Listings/Search)
