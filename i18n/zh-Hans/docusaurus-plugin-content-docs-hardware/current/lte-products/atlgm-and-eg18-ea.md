---
title: "ATLGM&EG18-EA"
slug: /atlgm-and-eg18-ea
source: https://manual.mikrotik.com/hardware/atlgm-and-eg18-ea
captured_at: '2026-11-04T09:40:32+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/f01d893fcf663533.jpg)

## [ATL LTE18 kit](https://mikrotik.com/product/atl18) (ATLGM&EG18-EA) {#atl-lte18-kit-atlgmeg18-ea}

先进技术水平（ATL）LTE 解决方案，配备宽范围 MIMO 4x4 天线，可在农村和城市地区实现快速稳定的连接。充分利用您的移动覆盖范围！有关完整规格和宣传册，请参阅 [ATL LTE18 kit 产品页面](https://mikrotik.com/product/atl18)。

## 安全警告 {#safety-warnings}

- 在操作任何设备之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵循所有国家法律和法规。
- 将接入点安装在任何墙面上的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家电气规范。
- 本产品拟安装在户外立杆上。开始安装前，请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确程序，可能会对人员造成危险并损坏系统。
- 请仅使用制造商认可的电源和配件，这些可在本产品的原始包装中找到。
- 将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请小心使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座中拔下电源插头。
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道、输出功率、布线要求以及动态频率选择 (DFS) 要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能会造成无线电干扰，在这种情况下，用户可能需要采取适当措施。

**射频辐射暴露：** 本 MikroTik 设备符合欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置应距离您的身体、职业用户或公众不少于 20 厘米。

## 快速开始 {#quickstart}

- 打开以太网端口盖板；
- 将 SIM 卡插入卡槽，芯片朝上；
- 使用以太网线将设备连接到随附 PoE 注入器的 data+power 端；
- 将 PoE 注入器的 data 端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 使用 **WebFig** 或 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）通过 Web 浏览器配置设备。打开 [https://192.168.188.1](https://192.168.188.1) 访问 **WebFig**；对于 **WinBox**，请下载该工具，转到 **Neighbors** 选项卡，然后选择 MAC 地址。用户名为 "**admin**"，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如果移动网络运营商要求，请输入 PIN 码；
- 选择 "Check for updates" 按钮，并将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡并具有活动的 Internet 连接；
- 要手动更新设备，请访问产品页面 [https://mikrotik.com/products](https://mikrotik.com/products) 找到您的产品。所需软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设备将重启；
- 再次连接，并在 **QuickSet** 菜单中设置强密码。

![](/img/4297e175c7b298d3.webp)

## 供电 {#powering}

- DC 输入数量 1
- DC 输入类型 PoE-in (12-57)
- 电源适配器标称电压 24 V
- 电源适配器标称电流 0.8 A
- 无附件时的最大功耗 8 W
- 最大功耗 8 W

## 安装 {#mounting}

- 将随附的金属安装环滑入天线碟背面的两个槽中。
- 将设备固定到立杆上，使以太网端口朝下。
- 使用 PH2 螺丝刀拧紧安装环。
- 使用扎带将以太网线固定到立杆上，距设备小于一米，以避免线缆从端口中被拉出。
- 检查安装角度和位置。在户外安装时，确保所有线缆开口朝下。使用 POE 注入器和正确接地，本设备在端口盖下方有专门设计的接地连接器。建议使用屏蔽 Cat5/6 电缆。本设备的 IP 防护等级为 IP54。

## 配置 {#configuration}

登录后，您应在 QuickSet 菜单中选择 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以启动设备进行重新安装，请参阅相应章节。

## 配件 {#accessories}

包装内包含以下随设备提供的配件：

![](/img/f302bf1cf0939e79.webp)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码 ATLGM&EG18-EA
- CPU 双核 88F3720 1.2 GHz
- CPU 架构 ARM 64bit
- RAM 大小 256 MB
- RAM 类型 DDR3L
- 存储 16 MB，Flash
- 1G 以太网端口数量 1
- LTE 调制解调器 R11mL-EG18-EA
- TAC 86981604
- LTE 类别 18（下行 1.2Gbps，上行 150Mbps）
- LTE 频段 1 (2100MHz) / 3 (1800MHz) / 5 (850MHz) / 7 (2600MHz) / 8 (900 MHz) / 20 (800MHz) / 28 (700MHz) / 38 (2600MHz) / 40 (2300MHz) / 41 (2500MHz)
- 3G 类别 R8（下行 42.2Mbps，上行 11.2Mbps）
- 3G 频段 1 (2100MHz) / 3 (1800MHz) / 5 (850MHz) / 8 (900MHz)
- 尺寸 直径 315 mm x 深度 170 mm
- 操作系统 RouterOS，许可证级别 3
- 工作温度 -40°C 至 +70°C

## SIM 卡槽使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。Nano SIM 卡厚度不同，不建议与适配器一起使用。

## 复位按钮 {#reset-button}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（总计 5 秒）；
- 继续按住 5 秒，LED 常亮，此时松开即可开启 CAP 模式。设备现在将查找 CAPsMAN 服务器（总计 10 秒）；
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（总计 15 秒）；无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请熟悉将设备正确运输到您所在地区指定处置场所的程序。

### CE 符合性声明 {#ce-declaration-of-conformity}

<table><thead><tr><th>*BG*</th><th>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</th></tr></thead><tbody><tr><td>CS</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DA</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>DE</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EL</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>EN</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ES</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>ET</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FI</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>FR</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HR</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>HU</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IT</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>IS</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LT</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>LV</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>MT</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NL</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>NO</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PL</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>PT</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>RO</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SK</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SL</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr><tr><td>SV</td><td>Mikrotīkls SIA 特此声明，无线电设备类型 ATLGM&EG18-EA 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下互联网地址获取：[https://mikrotik.com/products](https://mikrotik.com/products)</td></tr></tbody></table>

### WLAN/LTE {#wlanlte}

<table><thead><tr><th>工作频率 / 最大输出功率</th><th>WCDMA Band I</th><th>2100 MHz / 24dBm ± 2.7 dB</th></tr></thead><tbody><tr><td>WCDMA Band III</td><td>1800 MHz / 24dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band V</td><td>850 MHz / 24dBm ± 2.7 dB</td><td></td></tr><tr><td>WCDMA Band VIII</td><td>900 MHz / 24dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 1</td><td>2100 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 3</td><td>1700 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 5</td><td>850 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 7</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 8</td><td>900 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 20</td><td>800 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 28</td><td>700 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 38</td><td>2600 MHz / 23dBm ± 2.7 dB</td><td></td></tr><tr><td>LTE Band 40</td><td>2300 MHz / 23dBm ± 2.7 dB</td><td></td></tr></tbody></table>

本 MikroTik 设备符合 ETSI 法规规定的最大 TX 功率限值。有关更多详细信息，请参阅上文的符合性声明。

<table><thead><tr><th>**(EN) 技术规格 / (DE) 技术规格 / (FR) 技术规格 / (IT) 技术规格 / (ES) 技术规格 / (RU) 技术规格：**</th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>(EN) 产品电源输入选项(DE) 产品电源输入选项(FR) 产品电源输入选项(IT) 产品电源输入选项(ES) 产品电源输入选项(RU) 产品输入功率参数</td><td>(EN) DC 适配器输出规格(DE) 直流适配器输出规格(FR) 直流适配器输出规格(IT) 直流适配器输出规格(ES) 直流适配器输出规格(RU) 直流适配器输出特性</td><td>(EN) 外壳 IP 等级(DE) 外壳 IP 等级(FR) 机壳 IP 等级(IT) 外壳 IP 等级(ES) 外壳 IP 等级(RU) 外壳 IP 防护等级</td><td>(EN) 工作温度(DE) 工作温度(FR) 工作温度(IT) 工作温度(ES) 工作温度(RU) 工作温度</td><td></td></tr><tr><td>电压，V</td><td>电流，A</td><td></td><td></td><td></td></tr><tr><td>PoE 输入以太网端口 (12 - 57 V DC)</td><td>24</td><td>0.8</td><td>IP54</td><td>-33°..+70°C</td></tr></tbody></table>
