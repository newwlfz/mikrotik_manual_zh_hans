---
title: "SXT R"
slug: /sxt-r
source: https://manual.mikrotik.com/hardware/sxt-r
captured_at: '2026-11-04T10:05:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/c940bb43baa154ad.webp)

## [SXT R](https://mikrotik.com/product/sxt_r) (RBSXTR) {#sxt-r-rbsxtr}

SXT R 出厂时不带模块，内置 LTE 天线，具有两个支持 MDI-X 自动检测的 10/100 以太网接口。设备提供两个 micro SIM 卡槽，用于在不同运营商之间切换。完整规格和宣传册请参见 [SXT R 产品页面](https://mikrotik.com/product/sxt_r)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 在任何墙面安装接入点的所有安装方式均须获得当地主管机构的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于户外安装在立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能对人员造成危险并损坏系统。
- 仅使用制造商认可且可在本产品原包装中找到的电源和配件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 若设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座上拔下。
- 客户有责任遵守当地国家法规，包括在合法频段内工作、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和运行时，与您的身体、职业用户或公众的距离不得小于 45 厘米。

## 首次使用 {#first-use}

- 打开底部盖板。
- 将所需的卡安装到 miniPCIe 插槽中，请参阅相关段落（链接）。
- 将 micro-SIM 卡插入 micro-SIM 卡槽（默认使用 SIM A 卡槽）。
- 将设备连接到电源（参见 "SXT kit-series#Powering"）。
- 设备上电且 PC 连接到设备后，请在 Web 浏览器或 WinBox 中打开 [https://192.168.88.1](https://192.168.88.1)

以开始配置（或者，对于某些型号，请查看贴纸上的用户名和无线密码）。

- 用户名为 a*dmin*，默认没有密码，您将自动登录到 Quick Set 界面。
- 您应点击右侧的 "Check for updates" 按钮，并将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。必须具有互联网连接和有效的 SIM 卡。
- 如需手动更新设备，请访问我们的网页，并将最新的（MIPSBE）软件包下载到您的 PC。
- 打开 Web 浏览器或 WinBox，将软件包上传到 Files 菜单，然后重启设备。
- 在右侧底部的 "Password" 字段中设置路由器密码，并在 "Confirm Password" 字段中重复输入，该密码将在下次登录时使用。
- 选择 "Apply Configuration" 保存更改。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 两个 10/100 以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。连接其他网络设备时，可使用直通线或交叉线。
- MiniPCIe 插槽和两个 SIM 卡槽（不能单独使用），用于 3G/4G/LTE 模块。
- 按下 Mode 按钮时，可运行任意脚本。

## 供电 {#powering}

设备可通过以太网端口 ETH1 接受 18-57 V DC 无源供电和 802.3af/at PoE 供电。包装内包含一个 24 V 适配器和一个无源 PoE 注入器。无外接附件时功耗最高为 6 W。

### 连接 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将以太网线缆从设备连接到 POE 适配器的 POE 端口。
- 将来自您局域网的以太网线缆连接到 POE 适配器的 LAN 端口，注意数据和电力流向的箭头。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 配置 {#configuration}

登录后，您应在 Quick Set 菜单中选择 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备将要使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧通过设备的 MAC 地址进行连接（默认情况下来自 Internet 端口的所有访问均被阻止）。出于恢复目的，可以从网络引导设备，请参见相关章节。

## MiniPCIe 插槽的使用 {#minipcie-slot-usage}

此 SXT 版本未预装出厂模块。要安装模块，您需要取下塑料顶盖，并将 PCB 板从底壳中取出。安装 miniPCIe 模块应由具备资质的人员完成，处理电气设备时请遵循安全预防措施：

![](/img/c8f7fd233b164227.webp)

- 在拆包和处理电气组件时请使用腕部接地带，以避免静电放电（ESD）损坏。
- 取下顶盖时，将塑料工具插入六个孔中的一个，稍微向侧面转动并轻轻扭动，使盖子略微脱离其固定位置。
- 继续沿周边操作，直到所有卡扣都松开。
- 向上提起以取下顶盖。
- 您将接触到 PCB 的上表面和天线，取下两个黑色软垫以接触 PCB 固定件。
- 将两个塑料固定件向相反方向推，使 PCB 板脱离其位置。
- 取出 PCB 板，小心地向上提起并放置在防静电垫上。
- 在 PCB 底部找到 mini PCIe 插槽，并取下两颗出厂固定的螺丝。
- 在卡上粘贴随附的厚导热垫。
- 将卡安装到 miniPCIe 插槽中，使导热垫位于 PCB 和卡之间。
- 使用之前取下的两颗螺丝将卡固定到位。
- 将灰色 uFL 接头连接到模块的 MAIN 天线接头，将黑色线缆连接到辅助（或 AUX）接头。使用硅胶型橡胶将线缆固定到位。
- 在卡的顶部粘贴较薄的导热垫。
- 按相反顺序重新组装。将设备重新装入外壳后，将移动运营商的 SIM 卡芯片朝下插入 SIM 卡槽。

## 安装 {#mounting}

SXT 设计用于安装在立杆上，包装内包含安装支架和钢制卡箍。

![](/img/6a16db5b9e901d59.webp)

- 使卡扣朝前，将安装支架滑入外壳底部的导轨，直到卡扣咔嗒一声卡入到位。
- 将卡箍穿过支架上的开口。
- 将设备安装到立杆上，使以太网端口朝下。
- 对齐完成后，使用 PH2 螺丝刀拧紧卡箍。
- 使用扎带将以太网线缆固定在立杆上，距离设备不超过一米，以免线缆被从端口中拉出。
- 检查安装角度和位置。在户外安装时，确保所有线缆开口朝下。使用 POE 注入器和适当的接地，本设备在端口盖下方设有专门设计的接地连接器。建议使用 Cat5/6 线缆。本设备的 IP 防护等级为 IP54。SXT 设备有一个滑动门，以太网端口和复位按钮位于其后。也可以用螺丝将门锁紧在所提供的螺丝孔中。使用两个以太网端口时，请务必在塑料门上切出更宽的线缆开口。您可以使用钳子撕掉保护线缆开口的塑料片。关闭塑料门时，请务必施加压力，直到它"咔嗒"一声卡入到位。*本设备的安装和配置应由具备资质的人员完成。*

## 接地 {#grounding}

安装基础设施（塔架和桅杆）以及路由器本身必须正确接地。设备在机壳门后方设有接地线连接螺丝。将接地线连接到接地螺丝上，然后将接地线的另一端连接到已接地的桅杆上。这可以大幅降低 ESD 和雷击损坏的风险。

## LED 指示灯 {#led-indicators}

- 电源 LED 表示设备正通过 ETH1 端口接收电力。
- LTE LED 表示设备当前已连接到蜂窝基站。
- LTE 信号 LED 显示蜂窝信号的强度。
- PoE LED 表示 ETH2 端口当前正在通过 PoE 为另一台设备供电。

## 复位按钮 {#reset-button}

routerBOOT 复位按钮具有以下功能。按住按钮并接通电源，然后：

- 当绿色 LED 开始闪烁时松开按钮，可将 RouterOS 配置复位为默认值。
- 当 LED 变为常亮绿色时松开按钮，可清除所有配置并恢复默认值。
- 当 LED 熄灭后（约 20 秒）松开按钮，可使设备查找 Netinstall 服务器（通过网络重新安装 RouterOS 时需要）。无论使用上述哪种方式，如果在设备接通电源之前就按下按钮，系统将加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 模式按钮 {#mode-button}

可通过 RouterOS 软件配置模式按钮的动作，以执行任何用户提供的 RouterOS 脚本。您也可以禁用此按钮。模式按钮可在 RouterOS 菜单 /system routerboard mode-button 中配置。

## 配件 {#accessories}

包装内包含以下随设备提供的配件：

![](/img/cf6d48ddc802bec5.webp)

## 规格 {#specifications}

有关本产品的更多信息、规格和图片，请访问我们的网页：[https://mikrotik.com/product/sxt_r](https://mikrotik.com/product/sxt_r)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及更高版本。具体的出厂预装版本列于 /system resource 中。其他操作系统尚未经过测试。

## SIM 卡槽的使用 {#sim-slot-usage}

![](/img/a0db691ac4861274.webp)

SIM 卡槽设计用于 Micro SIM 卡。

Nano SIM 卡的厚度不同，不建议配合转接卡使用。

250

为避免污染环境，请将本设备与生活垃圾分开，并以安全方式处置，例如送至指定的废弃物处置场。请了解您所在地区将设备妥善运送至指定处置场的相关程序。

## 美国联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限值要求。这些限值旨在为住宅安装提供合理的有害干扰防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭和打开设备来确定），则鼓励用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员以寻求帮助。**FCC 警告：** 未经合规责任方明确批准的任何更改或修改，都可能导致用户操作本设备的权限失效。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，并且 (2) 本设备必须接受收到的任何干扰，包括可能导致意外操作的干扰。本设备及其天线不得与任何其他天线或发射机共置或协同工作。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，并且 (2) 本设备必须接受任何干扰，包括可能导致设备意外操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes : (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备制造日期的信息，以斜杠分隔标注在其标签上序列号的末尾。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

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

要在乌克兰使用，必须按照 NCCIR 2012 年 11 月 1 日第 559 号决议批准并在乌克兰司法部 2013 年 1 月 3 日以第 57/22589 号登记的程序取得使用许可。

### CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039.

Mikrotīkls SIA 特此声明，无线电设备类型 RBSXTR 符合 2014/53/EU 指令。欧盟符合性声明的全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
