---
title: "CRS112-8G-4S-IN"
slug: /crs112-8g-4s-in
source: https://manual.mikrotik.com/hardware/crs112-8g-4s-in
captured_at: '2026-11-04T09:45:59+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/4a31c677eec08155.webp)

## [CRS112-8G-4S-IN](https://mikrotik.com/product/CRS112-8G-4S-IN) {#crs112-8g-4s-in}

本设备是一台带有 8 个千兆以太网端口和 4 个 SFP 端口的网络交换机。它已经完成配置，所有端口都已交换在一起。该机型兼容 1.25G SFP 模块。完整规格和宣传册请参见 [CRS112-8G-4S-IN 产品页面](https://mikrotik.com/product/CRS112-8G-4S-IN)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 设备的安装必须符合当地和国家的电气规范。
- 本机型用于安装在机架中。开始安装前请仔细阅读安装说明。使用不正确的硬件或不遵循正确的操作步骤，可能会给人员带来危险并损坏系统。
- 本产品适合在室内安装。请让本产品远离水、火、潮湿或高温环境。
- 请仅使用制造商认可的电源和附件，这些可在本产品的原始包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证不会因不当使用设备而发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、线缆要求以及动态频率选择（DFS）要求。所有 MikroTik 设备都必须由专业人员安装。

## 快速开始 {#quickstart}

默认情况下，所有接口都已交换在一起，并且网桥接口具有 IP 192.168.88.1/24。

- 将设备放置在平整的表面上；
- 将您的 PC 连接到任意以太网端口；
- 将电源适配器连接到 DC 插孔；
- 将您的 PC IP 地址设置为 192.168.88.2/24；
- 配置应通过网页浏览器中的 **WebFig** 或 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox) 完成。**我们提供多种配置方法以确保可访问性；**
- 在网页浏览器中打开 https://192.168.88.1 开始设置。如果该 IP 地址不可用，请使用 **WinBox** 并选择 "**Neighbors**" 选项卡来查找设备。然后使用 MAC 地址进行连接。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 若要手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单中，并重启设备；
- 将您的 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 设置您的路由器密码。

## 供电 {#powering}

该板卡可从直流输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）取电，支持 10-57 V ⎓ DC。以太网端口 1 也支持无源 PoE 电源输入。本设备在最大负载下的功耗最高为 11 W。可以同时连接两路电源输入，它们将以故障切换模式工作（电压较高的输入将作为主电源）。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络（LAN）的以太网线缆连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

该设备被设置为交换机，以 192.168.88.1 作为网桥接口的管理 IP。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）通过设备的 MAC 地址进行连接。该设备配有一个 RJ45 串口，默认设置为 115200 bit/s、8 个数据位、1 个停止位、无奇偶校验。可使用标准 RJ45 转 COM 线缆，引脚定义可在文档中找到（参见上方链接）。出于恢复目的，可以引导设备进行重装，请参见下一节。

## 复位按钮 {#reset-button}

复位按钮具有以下功能：

- 在启动期间按住此按钮，直到用户 LED 灯开始闪烁，然后松开按钮以重置 RouterOS 配置。
- 继续按住按钮 5 秒钟以上，或直到用户 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器。第一个以太网端口用于 Netinstall 过程。

无论使用上述哪种方式，如果在设备通电之前按下按钮，系统将加载备份 RouterBOOT 加载器。在 LED 开始闪烁之前松开按钮，即可仅加载备份 RouterBOOT 而不进行重置。这对于 RouterBOOT 调试和恢复很有用。

## LED 指示灯 {#led-indicators}

- 当路由器通过 DC 插孔或 PoE 供电时，电源 LED 点亮。
- 用户 LED 可以从 RouterOS 进行配置。
- 端口 LED 指示各个以太网和 SFP 端口的活动状态。

## 安装 {#mounting}

本设备设计用于室内使用，可使用随附的机架挂耳安装在机架机箱中，也可以放置在桌面上。如果指定用途为机架机箱，请使用十字螺丝刀将机架挂耳固定到设备两侧：

- 将机架挂耳安装到设备两侧，并拧紧四颗螺丝将其固定到位，如照片所示。

![](/img/837a6d2bb5f312fe.webp)

- 将设备放入机架机箱，并使其与孔位对齐，以便设备顺利安装。
- 拧紧螺丝将其固定到位。

本设备没有防水污染保护，请确保将设备放置在干燥且通风的环境中。我们建议为我们的设备使用 Cat6 线缆。本设备的安装和配置应由合格人员完成。

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>**产品代码**</td><td>CRS112-8G-4S-IN</td></tr><tr><td>**架构**</td><td>MIPSBE</td></tr><tr><td>**CPU**</td><td>QCA8511，1 核，400 MHz</td></tr><tr><td>**交换芯片型号**</td><td>QCA8511-AL1C</td></tr><tr><td>**RAM**</td><td>128 MB</td></tr><tr><td>**存储**</td><td>16 MB，Flash</td></tr><tr><td>**10/100/1000 以太网端口**</td><td>8</td></tr><tr><td>**SFP 端口**</td><td>4</td></tr><tr><td>**PoE 输入**</td><td>无源 PoE，10-57 V</td></tr><tr><td>**DC 插孔输入电压**</td><td>10-57 V</td></tr><tr><td>**最大功耗**</td><td>10 W</td></tr><tr><td>**尺寸**</td><td>200 × 143 × 44 mm</td></tr><tr><td>**工作温度**</td><td>-40 °C 至 +70 °C</td></tr></tbody></table>

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/CRS112-8G-4S-IN](https://mikrotik.com/product/CRS112-8G-4S-IN)

## 配件 {#accessories}

![](/img/e06749365ce09789.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS。具体的出厂预装版本列在 /system resource 中。其他操作系统尚未经过测试。

## 安全提示 {#safety-notice}

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置点处置。请了解将设备妥善运送到您所在地区指定处置点的相关程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

![](/img/ce6fc3eb10b9a1e6.webp)

本设备已经过测试，符合 FCC 规则第 15 部分对 A 类数字设备的限制。这些限制旨在为商业安装环境提供合理的有害干扰防护。

本设备会产生、使用并可能辐射射频能量，如果未按照说明手册安装和使用，可能会对无线电通信造成有害干扰。在住宅区域操作本设备很可能造成有害干扰，在此情况下，用户需要自行承担费用来纠正干扰。

FCC 警告：任何未经合规责任方明确批准的更改或修改，都可能使用户操作本设备的权限失效。本设备符合 FCC 规则第 15 部分。操作须遵守以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。注意：本机型在测试时外围设备使用了屏蔽线缆。为确保合规，本设备必须使用屏蔽线缆。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。操作须遵守以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备意外运行的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。其运行须遵守以下两个条件：(1) 设备不得产生干扰；(2) 用户必须接受设备所承受的任何无线电干扰，即使该干扰可能影响其正常运行。

本 A 类数字设备符合加拿大 ICES-003。

此 [A] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (A) / NMB-003 (A)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

设备生产日期的信息标注在其标签上序列号的末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位），后面两位表示周数。

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

欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
