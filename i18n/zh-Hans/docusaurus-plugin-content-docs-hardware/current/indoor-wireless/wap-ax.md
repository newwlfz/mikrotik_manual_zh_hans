---
title: "wAP ax"
slug: /wap-ax
source: https://manual.mikrotik.com/hardware/wap-ax
captured_at: '2026-11-04T06:05:23+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## [wAP ax](https://mikrotik.com/product/wap_ax) (wAPG-5HaxD2HaxD) {#wap-ax-wapg-5haxd2haxd}

wAP ax 能为您的乡间度假屋或其他任何严苛环境——比如乡村加油站或公交车站——带来快速可靠的 Wi-Fi 6。完整规格和产品手册请参见 [wAP ax 产品页面](https://mikrotik.com/product/wap_ax)。

<p><Img src="/img/54d372412bde265a.jpg" alt="" width={438} height={800} /></p>

## 安全警告 {#safety-warnings}

- 在接触任何 MikroTik 设备之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。
- 仅使用制造商批准的电源和附件，这些均可在本产品的原包装中找到。
- 本设备应由受过培训的合格人员按照本安装说明进行安装。安装人员有责任确保设备的安装符合当地和国家的电气规范。请勿尝试拆卸、修理或改装设备。
- 本产品设计用于安装在室外的立柱上，但也可在室内安装。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的步骤，可能导致人员处于危险境地并造成系统损坏。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 插座应安装在设备附近并便于插拔。
- 若设备发生故障，请断开其电源。最快的方法是将电源适配器从电源插座中拔出。
- 为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定区域。请熟悉将设备妥善运送至您所在地区指定收集点的相关程序。
- 本产品为 A 类产品。在居住环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备的安装和操作位置与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

- 确保您的 ISP 允许更换硬件，并会分配自动 IP 地址；
- 打开底部盖板；
- 用以太网线将设备连接到随附的 PoE 供电器的 *"data+power"* 端；
- 将 PoE 供电器的数据端连接到计算机；
- 将电源适配器连接到 PoE 供电器；
- 在计算机上进入网络连接部分，找到名为 "*MikroTik-...*" 的无线网络。然后连接它（无线密码请查看标签）；
- 配置应通过无线网络使用移动应用程序完成，也可以使用 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。下载并打开 **WinBox**，选择 **Neighbors** 选项卡以查找设备；
- 点击 MAC 地址。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看标签上的用户和无线密码）；
- 如需手动更新设备，请访问产品页面 [https://mikrotik.com/products](https://mikrotik.com/products) 查找您的产品。所需的软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 **WinBox** 的 **Files** 菜单并重启设备。将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 **QuickSet** 菜单中进行以下设置：选择您的国家，以应用该国的法规设置；
- 在左侧字段中设置您的无线网络密码；
- 在底部字段中设置您的路由器密码。

## 安装 {#mounting}

本设备有多种安装方式：墙壁、天花板、立柱，也可以放置在随包装提供的 MikroTik 专用支架中。包装内附有带说明的钻孔模板，帮助您完成以太网线的安装以及在天花板或墙壁上的固定。包装内还附有一个钢制支架，用于放置在天花板吊顶板的另一侧，以及两颗螺钉和墙塞。设备可用扎带或钢卡箍固定在立柱上。为防止底部盖板被打开，可使用不同的螺钉。包装内附有一颗 Torx T20 安全螺钉供选用。请配合附带的 L 形扳手将其固定到底部盖板中。更换螺钉的详细说明见包装内。

使用和安装本设备时，请注意最大允许暴露（MPE）安全距离，辐射体与您身体之间至少保持 31 厘米。

**安装在桅杆或立柱上：**

<p><Img src="/img/b21639053eb61552.webp" alt="" width={455} height={595} /></p>

**建议使用电工胶带以增加材料之间的摩擦力。**

- 将塑料扎带穿过孔洞安装到钢制支架上。
- 将支架安装到设备上。
- 用螺钉将其固定。
- 将设备安装并调整对齐到立柱或桅杆上。
- 将以太网线穿过开口并连接到以太网端口。
- 闭合底部卡扣并用螺钉固定。
- 建议使用扎带将以太网线固定在立柱上，与设备的距离约为 30 厘米。

<p><Img src="/img/42ebcb18fdb0e686.webp" alt="" width={462} height={650} /></p>

**将设备安装在墙上：**

- 使用附带的模板标记钻孔位置，如有需要也标记以太网线孔位。请相应地调整对齐，这取决于设备最终将如何安装。
- 如有需要，插入膨胀螺栓，具体取决于墙体结构和材质。
- 将附带的钢制支架放置在墙上。
- 用螺钉将其固定到位。
- 将您的以太网线穿过开口并连接到以太网端口。
- 将设备安装到钢制支架上
- 用螺钉将其固定到位。
- 闭合底部卡扣。

## 安装在天花板上 {#mounting-on-the-ceiling}

<p><Img src="/img/35cd19164cabfd89.webp" alt="" width={459} height={532} /></p>

包装内附有一个专用支架，用于安装在天花板吊顶板上。它由两部分组成，分别固定在天花板吊顶板的两侧。

-

使用模板标记钻孔位置。

-

将两个安装支架放置在标记位置。

-

用螺钉将它们固定在一起。

-

如果安装在墙上，请以同样的方式继续组装。

-

将您的以太网线穿过开口并连接到以太网端口。

-

将设备安装到钢制支架上。

-

用螺钉将其固定到位。

-

闭合底部卡扣。

## 底部盖板 {#bottom-lid}

- 底部盖板由固定螺钉固定到位。
- 使用 Philips PH2 螺丝刀将其拧松，但不要完全取下螺钉。

<p><Img src="/img/b67c9df3c35b1165.webp" alt="" width={194} height={118} /></p>

- 沿与设备相反的方向拉动盖板以将其取下。

<p><Img src="/img/23a475b4789e443e.webp" alt="" width={314} height={145} /></p>

- 重新装回。

## 供电 {#powering}

设备可通过电源插孔或以太网端口供电，两者均随包装提供：

- 直流直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心针正极插头）支持 12-57 V ⎓ DC；
- 以太网端口支持 802.3af/at PoE 18-57 V ⎓ DC。

最大负载下的功耗可达 9 W。请将接地线连接到 底部盖板下方的螺钉上。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自本地网络（LAN）的以太网线连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。接地螺钉位于底部盖板下方：

<p><Img src="/img/e459e23d5228cdb3.webp" alt="" width={174} height={213} /></p>

## 扩展插槽和端口 {#extension-slots-and-ports}

<p><Img src="/img/315d6f9c6929731a.webp" alt="" width={613} height={462} /></p>

- 产品代码：wAPG-5HaxD2HaxD
- CPU：IPQ-5010 800 MHz
- CPU 架构：ARM
- CPU 核心数：2
- 内存容量：256 MB
- 内存类型：DDR3L
- 存储：128 MB，NAND
- 1G 以太网端口数量：2
- PoE 输入：Ether1
- 操作系统：RouterOS（许可证级别 4）
- 无线接口型号：IPQ-5010（2.4 GHz）、QCN-6102（5 GHz）
- 无线：2.4 GHz 802.11b/g/n/ax 双链；5 GHz 802.11a/n/ac/ax 双链
- 天线增益 2.4 GHz：7 dBi
- 天线增益 5 GHz：7 dBi
- 5 GHz 无线代数：Wi-Fi 6
- WiFi 速率：AX3000
- 尺寸 220 x 125 x 22 mm
- 工作温度 -40°C 至 +70°C
- IP 54

## 配置 {#configuration}

我们建议点击 "Check for updates" 按钮并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。

- 互联网连接配置 [https://mt.lv/configuration](https://mt.lv/configuration)；
- RouterOS 软件升级选项 [https://mt.lv/upgrade](https://mt.lv/upgrade)；除本文档所述内容之外，RouterOS 还包含许多配置选项。建议您访问 RouterOS 文档页面以熟悉这些可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问均被阻止）。可以从网络引导设备，使用 Netinstall 实用程序重装 RouterOS 以进行恢复。此操作可通过第一个以太网端口完成。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 开始闪烁，然后松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮直到 LED 常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议在其中一个不起作用时对两个选项都进行验证。

- **Regular Booter：** 要进入 etherboot 模式，请在设备上电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter：** 关闭设备电源。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，准备通过 **Netinstall** 重新安装 RouterOS。具体型号可能通过 **USR、USER、System** 或 **ACT** LED，或通过 SFP 端口 LED 来指示。

无论使用上述哪个选项，只要在设备通电前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

<p><Img src="/img/9bcba09a7b6a0d53.webp" alt="" width={249} height={246} /></p>

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开该应用程序。
- 点击 Connect 通过无线网络与您的设备建立连接（无线密码请查看标签）。
- 用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看标签上的用户和无线密码）。
- 选择 Quick Setup，应用程序将通过几个简单的步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

## 配件 {#accessories}

<p><Img src="/img/a4537cde5d551f97.webp" alt="" width={971} height={157} /></p>
