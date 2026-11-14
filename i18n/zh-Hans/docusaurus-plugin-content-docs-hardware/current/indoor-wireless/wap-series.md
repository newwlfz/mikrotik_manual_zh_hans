---
title: "wAP 系列"
slug: /wap-series
source: https://manual.mikrotik.com/hardware/wap-series
captured_at: '2026-11-04T06:05:47+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info 本文涵盖

- **wAP**
- **wAP BE**

:::

<p><Img src="/img/6ee4c755ff10151e.webp" alt="" width={500} height={768} /></p>

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 在任意墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品适合安装在室外的立杆上，但也可以安装在室内。开始安装前请仔细阅读安装说明。使用错误的硬件和配置或不遵循正确的操作步骤，可能导致人员处于危险境地并损坏系统。
- 仅使用制造商认可且可在本产品原包装中找到的电源和附件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备发生故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和运行位置与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 设置 {#setup}

- 使用十字螺丝刀拧松固定底盖的螺丝；
- 确保您的互联网服务提供商（ISP）允许更换硬件并自动分配 IP 地址；
- 将设备连接到电源；
- 通过以太网端口或无线网络 "MikroTik-..." 连接到设备（请务必查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 "WinBox" 配置工具。**提供多种配置方法以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 继续使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 单击 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 根据使用类型将 *Installation* 设置为室内或室外；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名已预先填入。
- 点击 Connect，通过无线网络与您的设备建立连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 还提供高级菜单，可完整配置所有必要的设置。

## 安装 {#mounting}

本设备可通过多种方式安装：墙面、天花板、立杆，也可以放置在随包装提供的专用 MikroTik 支架中。包装内含带说明的钻孔模板，可帮助您安装以太网线缆并将其固定到天花板或墙壁上。包装内还包含一块用于放置在吊顶板另一侧的钢制支架，以及两颗螺丝和墙锚。本机可使用扎带或钢制卡箍固定到立杆上。为防止底盖被打开，可以使用另一种螺丝。随附一颗 Torx T20 安全螺丝供选用。使用随附的 L 形扳手将其固定到底盖上。更换螺丝的详细说明在包装中。本设备的 IP 防护等级为 IP54。室外安装时，请确保所有线缆开口朝下。使用 POE 注入器和正确的接地。建议使用 Cat5/6 线缆。使用和安装本设备时，请注意最大允许暴露（MPE）安全距离，辐射体与您的身体之间至少保持 35 厘米。

**安装在立杆或桅杆上：**

<p><Img src="/img/b21639053eb61552.webp" alt="" width={455} height={595} /></p>

** 建议使用电工胶带以增加各材料之间的摩擦力。*

- 将塑料扎带穿过孔安装到钢制支架上。
- 将支架安装到设备上。
- 用螺丝将其固定。
- 将设备安装并校准到立杆或桅杆上。
- 将以太网线缆穿过开口并连接到以太网端口。
- 关闭底部卡扣并用螺丝固定。建议使用扎带将以太网线缆固定到立杆上，与设备的距离约为 30 cm。

<p><Img src="/img/42ebcb18fdb0e686.webp" alt="" width={462} height={650} /></p>

**将设备安装在墙上：**

- 使用随附的模板标记钻孔位置。如有需要，也标记以太网线缆的位置。据此对齐，具体取决于设备的最终安装方式。
- 如有需要，根据墙体结构和材质插入膨胀管。
- 将随附的钢制支架放置在墙上。
- 使用螺丝将其固定到位。
- 将您的以太网线缆穿过开口并连接到以太网端口。
- 将设备安装到钢制支架上
- 用螺丝将其固定到位。
- 关闭底部卡扣。避免将设备安装在低洼地面处，否则您将无法安装并关闭底部卡扣。

**安装到天花板上：**

<p><Img src="/img/35cd19164cabfd89.webp" alt="" width={459} height={532} /></p>

包装内含一个专用支架，用于安装在吊顶上。由于它由两部分组成，需要分别固定在天花板板的两侧。

-

使用模板标记孔的位置。

-

将两个安装支架放置在标记位置。

-

使用螺丝将它们固定在一起。如果安装到墙上，请以相同方式继续组装。

-

将您的以太网线缆穿过开口并连接到以太网端口。

-

将设备安装到钢制支架上。

-

用螺丝将其固定到位。

-

关闭底部卡扣。150

## 底盖 {#bottom-lid}

- 底盖通过防脱螺丝固定到位。
- 使用 Philips PH2 螺丝刀将其拧松，但不要完全取下螺丝。

<p><Img src="/img/b67c9df3c35b1165.webp" alt="" width={194} height={118} /></p>

- 朝与设备相反的方向拉拽盖板以将其取下。

<p><Img src="/img/0430222d528f3356.webp" alt="" width={562} height={407} /></p>

- 重新组装。

## 供电 {#powering}

本设备可通过电源插孔或以太网端口供电：

- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）接受 11-57 V ⎓ DC；
- 以太网端口接受 802.3af/at PoE 11-57 V ⎓ DC。最大负载下的功耗可达 4 W。请将接地线连接到设备底盖下方的螺丝上。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自本地网络（LAN）的以太网线缆连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 2.4 GHz 802.11b/g/n 无线模块。
- 一个 10/100 以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X）。连接其他网络设备时，直通线或交叉线均可使用。

## 配置 {#configuration}

我们建议单击 "Check for updates" 按钮，并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。建议访问 RouterOS 文档页面以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果 IP 连接不可用，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问均被阻止）。可以从网络引导设备，以便出于恢复目的重新安装 RouterOS。这可以从第一个以太网端口完成，请参阅按钮和跳线。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三个功能：

- 在启动过程中按住此按钮，直到绿色 LED 开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议在其中一个不起作用时对两个选项都进行验证。

- **Regular Booter：**要进入 etherboot 模式，请在设备通电后等待 1–2 秒，然后按下 **Reset** 按钮。
- **Backup Booter：**关闭设备电源。按住 **Reset** 按钮，然后打开设备电源。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。取决于型号，这可能由 **USR、USER、System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都将加载备份 RouterBOOT 加载器。这对 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如送往指定的废物处理场所。请熟悉在您所在地区将设备正确运送到指定处置场所的程序。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

FCC ID: TV7RBWAP5AC2D

<p><Img src="/img/ce6fc3eb10b9a1e6.webp" alt="" width={558} height={406} /></p>

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装提供合理的有害干扰防护。本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和开启设备来确定），则建议用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增加设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。FCC 警告：未经合规负责方明确批准的任何更改或修改，可能导致用户丧失操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须符合以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受任何收到的干扰，包括可能导致不良操作的干扰。本设备及其天线不得与任何其他天线或发射器共置或联合运行。

**重要：射频辐射暴露。** 本设备符合 FCC 针对非受控环境规定的 RF 辐射暴露限值。本设备的安装和运行应在辐射体与您身体任何部位之间保持至少 20 cm 的距离。

## 加拿大创新、科学和经济发展部 {#innovation-science-and-economic-development-canada}

IC:7442A-WAP5AC2D 本设备符合加拿大工业部免许可 RSS 标准。操作须符合以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备不良操作的干扰。本设备符合加拿大工业部适用于免许可无线电设备的 CNR 标准。允许在以下两个条件下运行：(1) 设备不得产生干扰，且 (2) 用户必须接受设备所受的任何无线电干扰，即使该干扰可能影响其正常运行。

**重要：射频辐射暴露。** 本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行应在辐射体与您身体任何部位之间保持至少 20 cm 的距离。本设备符合 IC 针对非受控环境规定的辐射暴露限值。本设备的安装和运行应在辐射体与您身体任何部位之间保持至少 20 cm 的距离。

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

<p><Img src="/img/5d0fc80f851cbbdf.webp" alt="" width={1600} height={1598} /></p>

## 欧亚符合性标志 {#eurasian-conformity-mark}

<table><thead><tr><th>频率范围</th><th>发射机功率</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>≤100 mW</td></tr></tbody></table>

*可用的频率信道可能因产品型号和认证而异。

有关设备生产日期的信息以其标签上序列号末尾以斜杠分隔的形式标注。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

制造商：MikroTikls SIA，Aizkraukles iela 23, Riga, LV-1006, 拉脱维亚，[support@mikrotik.com](mailto:support@mikrotik.com)。中国、拉脱维亚或立陶宛制造。请见包装。

有关保修服务的详细信息，请联系您的经销商。MikroTik 产品在俄罗斯联邦的进口商信息：[https://mikrotik.com/buy/europe/russia](https://mikrotik.com/buy/europe/russia)

供应到欧亚关税同盟的 MikroTik 产品，会根据相关要求进行评估，并按如下所示标有 EAC 标志：

<p><Img src="/img/984ad54320693690.webp" alt="" width={240} height={240} /></p>

## Norma Oficial Mexicana {#norma-oficial-mexicana}

频率范围（最大输出功率）：2400-2483.5 MHz (30 dBm)。可用频道可能因型号和产品认证而异。

能源效率符合 NOM-029-ENER-2017。

本设备的运行须符合以下两个条件：

- 本设备或装置可能不会造成有害干扰，并且。
- 本设备必须接受任何干扰，包括可能导致其运行不正常的干扰。制造商：MikroTikls SIA, Brivibas gatve 214i, Riga, LV-1039, Latvia。

原产国：拉脱维亚；立陶宛；中国（人民共和国）；美国；墨西哥。

如有特定地区的问题，请联系当地经销商。进口商列表可在我们的主页上找到 – [https://mikrotik.com/buy/latinamerica/mexico](https://mikrotik.com/buy/latinamerica/mexico)。

## 乌克兰国家通信与信息化监管委员会 {#the-national-commission-for-the-state-regulation-of-communications-and-informatization-by-ukraine}

制造商：MikroTikls SIA，Brivibas gatve 214i 里加，拉脱维亚，LV1039。

工作频率（最大输出功率）：2400-2483.5 MHz（20 dBm）。

MikroTikls SIA 特此声明，该路由器符合 2014/53/EC 指令的基本要求及其他相关规定，并且符合乌克兰内阁 2017 年 5 月 24 日第 355 号决议批准的无线电设备技术法规的实质性要求。

在乌克兰使用需按照 НКРЗІ 2012 年 11 月 1 日第 559 号决议（2013 年 1 月 3 日在乌克兰司法部登记，编号 57/22589）批准的程序取得使用许可。

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

Mikrotīkls SIA 特此声明，无线电设备类型 RBcAPL-2nD 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)

### 频率波段使用条款 {#frequency-bands-terms-of-use}

<table><thead><tr><th>**频率范围（适用于相应型号）**</th><th>**使用的信道**</th><th>**最大输出功率（EIRP）**</th><th>**限制**</th></tr></thead><tbody><tr><td>2400-2483.5 MHz</td><td>1 - 13</td><td>20 dBm</td><td>在所有欧盟成员国使用均无任何限制</td></tr></tbody></table>

** 客户有责任遵守当地国家/地区法规，包括在合法频率信道内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装！*

本 MikroTik 设备符合 ETSI 规定的最大 WLAN 发射功率限值。有关更详细的信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定的最大 WLAN 发射功率限值。有关更详细的信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定的最大 WLAN 发射功率限值。有关更详细的信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定的最大 WLAN 发射功率限值。有关更详细的信息，请参阅上文的符合性声明 / 本 MikroTik 设备符合 ETSI 规定的最大 WLAN 发射功率限值。有关更详细的信息，请参阅上文的符合性声明。
