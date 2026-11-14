---
title: "Woobm-USB"
slug: /woobm-usb
source: https://manual.mikrotik.com/hardware/woobm-usb
captured_at: '2026-11-04T10:08:39+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/9d412487000cb428.webp)

Woobm 是一款 WiFi 转串口桥接器。该设备可为具备 USB 端口但没有无线接口的 RouterBOARD 设备提供无线访问能力。该设备工作在 2GHz 802.11b/g/n 无线模式，支持客户端模式和接入点模式，并可使用 WPA 无线密码进行保护（某些型号的账号和无线密码请查看贴纸）。完整规格和宣传册请参见 [Woobm-USB 产品页面](https://mikrotik.com/product/woobm)。

## 供电 {#powering}

该设备通过 RouterBOARD 设备的 USB 端口供电。

## 首次启动 {#first-startup}

将 Woobm-USB 连接到 USB 端口，将会创建一个 SSID 为 WoobmAP 的无线网络。连接到该设备，并在网页浏览器中打开设备 IP 地址。

Woobm-USB 的默认 IP 是 **192.168.4.1**

运行 RouterOS 的设备会自动挂载为串行 USB 设备，并在成功登录后提供访问。

## WEB 接口 {#web-interface}

WEB 接口允许配备了 802.11b/g/n 2.4GHz 无线模块的设备访问串口。

![](/img/1e9d33617debe666.webp)

Web 界面默认页面为 "Home"。在主页上，可以连接并配置 RouterOS 邻居设备（同一网络中的 MikroTik 设备）。点击设备 IP 地址即可建立连接：

![](/img/44a89aaf00392ae9.webp)

打开 Terminal 标签页后，Woobm-USB 将尝试模拟 USB 串行接口。若尝试成功，终端窗口上方将显示 "Connection successful! " 消息。你可以通过键盘输入命令，或使用按键按钮通过 USB 串行接口发送命令。

Show keyboard 会在移动设备上调出键盘。额外按钮为移动设备提供缺失的键盘按键。

打开 Terminal 标签页后，Woobm-USB 将尝试模拟 USB 串行接口。若尝试成功，终端窗口上方将显示 "Connection successful! " 消息。你可以通过键盘输入命令，或使用按键按钮通过 USB 串行接口发送命令。

Show keyboard 会在移动设备上调出键盘。额外按钮为移动设备提供缺失的键盘按键。

## 设置 {#settings}

Settings 标签页提供 Woobm-USB 设备的基本配置。**basic settings** 部分提供串口、按钮、LED 和无线常规设置

![](/img/348d8ba4b59b29df.webp)

### 属性 {#properties}

<table><thead><tr><th>属性</th><th>说明</th></tr></thead><tbody><tr><td>**Identity** (*string*; 默认：**MikroTik**)</td><td>设备标识用作 DHCP 客户端向 DHCP 服务器上报时的 'hostname' 参数，同时也用于邻居发现。</td></tr><tr><td>**Telnet port** (*integer*; 默认：**23**)</td><td>用于接收传入 telnet 请求的端口</td></tr><tr><td>**Baud-rate** (*integer*; 默认：**115200**)</td><td>用于串行通信的波特率。应与主机设备匹配。</td></tr><tr><td>**Data bits** (; 默认：**8**)</td><td></td></tr><tr><td>**Parity** (; 默认：**None bits**)</td><td></td></tr><tr><td>**Stopbits** (*integer*; 默认：**1**)</td><td></td></tr><tr><td>**Web conn. timeout** (*integer*; 默认：**2400**)</td><td></td></tr><tr><td>**WPS enabled** (*On/off*; 默认：**On**)</td><td></td></tr><tr><td>**Set the default settings with a button** (*On/off*; 默认：**On**)</td><td></td></tr><tr><td>**Device greeting** (*On/off*; 默认：**On**)</td><td></td></tr><tr><td>**Force echo** (*On/off*; 默认：**On**)</td><td></td></tr><tr><td>**Ignore telnet commands** (*On/off*; 默认：**On**)</td><td></td></tr><tr><td>**Status LEDs enabled** (*On/off*; 默认：**On**)</td><td></td></tr><tr><td>**802.11 mode** (; 默认：**default**)</td><td></td></tr></tbody></table>

**WiFi Station** 设置部分提供 Woobm-USB 在客户端模式下的无线设置。

![](/img/0ead108ed2f2a68b.webp)

<table><thead><tr><th>属性</th><th>说明</th></tr></thead><tbody><tr><td>**SSID** (*string*; 默认：)</td><td>提供附近接入点的 SSID，或使用扫描功能。</td></tr><tr><td>**Password** (*string*; 默认：)</td><td>WPA-PSK 和 WPA2-PSK</td></tr><tr><td>**SSID MAC** (*MAC*; 默认：)</td><td></td></tr><tr><td>**Station MAC** (*MAC*; 默认：)</td><td></td></tr><tr><td>**IP address** (*IP*; 默认：)</td><td></td></tr><tr><td>**Gateway** (*IP*; 默认：)</td><td></td></tr><tr><td>**Netmask** (*IP*; 默认：)</td><td></td></tr></tbody></table>

**WiFi AP** 设置部分提供 Woobm-USB 在接入点模式下的无线设置。

![](/img/07ca22adb2460ee2.webp)

<table><thead><tr><th>属性</th><th>说明</th></tr></thead><tbody><tr><td>**SSID** (*string*; 默认：)</td><td>Woobm-USB 接入点的 SSID</td></tr><tr><td>**Password** (*string*; 默认：)</td><td>WPA-PSK 和 WPA2-PSK</td></tr><tr><td>**Channel** (; 默认：**6**)</td><td>接入点使用的无线信道</td></tr><tr><td>**Auth. mode** (; 默认：)</td><td></td></tr><tr><td>**Hidden** (*On/Off*; 默认：**Off**)</td><td></td></tr><tr><td>**Max conn** (*1 to 4*; 默认：**4**)</td><td>接入点允许的最大客户端数量。</td></tr><tr><td>**Beacon interval** (*100 to 60000*; 默认：**100**)</td><td>接入点广播 AP 信息的频率。</td></tr><tr><td>**IP address** (*IP*; 默认：**192.168.4.1**)</td><td></td></tr><tr><td>**Gateway** (*IP*; 默认：)</td><td></td></tr><tr><td>**Netmask** (*IP*; 默认：)</td><td></td></tr><tr><td>**AP MAC** (*MAC*; 默认：)</td><td></td></tr><tr><td>**DHCP Enabled** (*On/Off*; 默认：**On**)</td><td>启用/禁用 DHCP 服务器</td></tr><tr><td>**IP range start** (*IP*; 默认：**192.168.4.2**)</td><td></td></tr><tr><td>**IP range end** (*IP*; 默认：**192.168.4.5**)</td><td></td></tr><tr><td>**IP lease time** (; 默认：**120**)</td><td></td></tr></tbody></table>

## 升级固件 {#upgrade-firmware}

使用 upgrade firmware 标签页进行手动固件升级。固件可在我们网页的 Product Support & Download 部分获取。

## Telnet 访问 {#telnet-access}

可以使用 Telnet 客户端访问串口。要进行 Telnet 访问，请在 telnet 客户端中打开 Woobm-USB 地址。Woobm-USB 会将串口转发给 telnet 客户端。

只能模拟一个串口桥实例。

## 按钮功能 {#button-functionality}

按钮提供启用 WPS、重置配置和发送邻居消息 (MNDP) 的功能。

### WPS 模式 {#wps-mode}

如果按钮按下时间少于 5 秒，则会启用 WPS 模式。如果与接入点建立了连接，则会保存 Woobm 站点配置并覆盖旧数据。

### 重置配置 {#reset-configuration}

要重置配置：

-

应当拔下 Woobm（从 USB 端口移除）；

-

按住按钮；

-

在按住按钮的同时将 Woobm 连接到 USB 端口；

-

等待红色 LED 灯开始闪烁；

-

松开按钮；

设备将被重置为默认配置。

#### 邻居消息 {#neighbor-message}

邻居消息每分钟自动发送一次。要手动发送消息，请按住按钮至少 5 秒，直到 LED 灯停止闪烁。

## 操作系统支持 {#operating-system-support}

该设备仅支持 Woobm 软件。可通过网页配置页面上传更新的 .BIN 文件来进行更新。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

<table><thead><tr><th>型号</th><th>FCCID</th></tr></thead><tbody><tr><td>Woobm-USB</td><td>TV7WBM</td></tr></tbody></table>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装环境中的有害干扰提供合理保护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不能保证在特定安装环境中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 向经销商或有经验的无线电/电视技术人员寻求帮助。**FCC 警告：** 任何未经合规责任方明确批准的更改或修改都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。其运行须满足以下两个条件：(1) 本设备不得造成有害干扰；(2) 本设备必须接受任何接收到的干扰，包括可能导致意外运行的干扰。本设备及其天线不得与任何其他天线或发射器共置或联合运行。本设备作为从设备/主设备 (slave/MASTER) 运行，工作于 2.4 GHz（2412 ~2472 MHz）频段。**射频暴露信息：** 该受测设备 (EUT) 符合 IC RSS-102 中针对一般人群/非受控暴露限值的 SAR 要求，并已按照 IEEE 1528 规定的测量方法和程序进行测试。安装和操作本设备时，辐射体与人体之间的距离至少应保持 20 cm。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

<table><thead><tr><th>型号</th><th>IC</th></tr></thead><tbody><tr><td>Woobm-USB</td><td>7442A-WBM</td></tr></tbody></table>

本设备符合加拿大工业部免许可 RSS 标准。其运行须满足以下两个条件：(1) 本设备不得造成干扰；(2) 本设备必须接受任何干扰，包括可能导致设备运行异常的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。其使用须满足以下两个条件：(1) 设备不得产生干扰；(2) 用户必须接受设备所受到的任何无线电干扰，即使该干扰可能影响设备的正常运行。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

**重要：射频辐射暴露。** 本设备符合针对非受控环境规定的 IC 辐射暴露限值。安装和操作本设备时，辐射体与身体任何部位之间的距离至少应保持 20 cm。Cet équipement est conforme aux limites d'exposition au rayonnement IC définies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé à une distance minimale de 20 cm entre le radiateur et toute partie de votre corps.

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>Частотный диапазон</th><th>Мощность передатчика</th></tr></thead><tbody><tr><td>2412-2472 МГц</td><td>≤100 мВт</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证情况而有所不同。

有关设备制造日期的信息，标注在其贴纸上的序列号末尾，以斜杠分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

![](/img/984ad54320693690.webp)

## 墨西哥官方标准 (Norma Oficial Mexicana) {#norma-oficial-mexicana}

频率范围（最大输出功率）：2412-2472 MHz (30 dBm)。可用频率信道可能因产品型号和认证情况而有所不同。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化管理委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2412-2472 MHz (20 dBm)。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用本设备，须按照 NKRZI 2012 年 11 月 1 日第 559 号决议批准、并于 2013 年 1 月 3 日在乌克兰司法部登记（编号 57/22589）的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

![](/img/9239d51861d9ff00.webp)

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，Woobm-USB 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相关型号）**</th><th>**使用的信道**</th><th>**最大输出功率 (EIRP)**</th><th>**限制**</th></tr></thead><tbody><tr><td>2412 - 2472 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家法规，包括在合法的频率信道、输出功率、布线要求以及动态频率选择 (DFS) 要求范围内运行。所有 MikroTik 无线电设备必须由专业人员安装！*
