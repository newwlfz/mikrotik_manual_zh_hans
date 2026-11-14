---
title: "mANTBox ax 15s"
slug: /mantbox-ax-15s
source: https://manual.mikrotik.com/hardware/mantbox-ax-15s
captured_at: '2026-11-04T09:56:12+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/17a344f4f237e22e.jpg)

## [mANTBox ax 15s](https://mikrotik.com/product/mantbox_ax_15s)（L22UGS-5HaxD2HaxD-15S） {#mantbox-ax-15s-l22ugs-5haxd2haxd-15s}

这是对广受欢迎的 mANTBox 双频扇区天线基站的一次 Wi-Fi 6 直接升级。一个功能强大的整包方案即可满足你所有户外网络需求，非常适合营地、体育场和公园使用。完整规格和宣传手册请参见 [mANTBox ax 15s 产品页面](https://mikrotik.com/product/mantbox_ax_15s)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 在将系统连接到电源之前，请阅读安装说明。
- 本设备须由经过培训的合格人员按照这些安装说明进行安装。安装人员负责取得当地主管部门/检验部门对安装结构完整性所要求的任何地方性或国家性安全检查。
- 在任何墙面上安装接入点的所有安装方法均需获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备设计用于在户外立杆上安装。开始安装前请仔细阅读安装说明。
- 未使用正确的硬件和配置或未遵循正确的操作步骤，可能会给人员带来危险状况并损坏系统。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险。
- 本设备需要升级到 RouterOS v7 或最新版本，以确保符合当地法规要求。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备安装和运行时，与你的身体、职业使用者或公众的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

- 打开盖子；
- 用网线将设备的数据+供电端连接到随附的 PoE 注入器；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 通过 **WebFig** 或 **WinBox** 工具，使用网页浏览器配置设备，WinBox 下载地址：[https://mt.lv/WinBox](https://mt.lv/WinBox)；**提供多种配置方式以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 即可访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后点击 MAC 地址。用户名为 "**admin**"，无密码（某些型号的用户名和无线密码请查看贴纸）；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡并拥有可用的互联网连接；
- 如需手动更新设备，请访问 mikrotik.com，选择你的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 "**Files**" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，你可以确保获得最佳性能、稳定性和安全更新；
- 设置路由器密码。

## 供电 {#powering}

设备随附 24 V 1.2 A 电源适配器。它可与随附的 PoE 注入器或电源插孔配合使用。两种方式下设备均接受 12-28 V 电压。设备的最大功耗为 21 W 时的 11 W。

## 配置 {#configuration}

我们建议点击 "Check for updates" 按钮，并将 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议访问 RouterOS 文档页面来熟悉这些可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 internet 端口的所有访问均被阻止）。

## 安装 {#mounting}

mANTbox 12s 和 15s 配有 QuickMount 适配器，可使用随附的螺丝将其固定在墙上，或使用随附的金属安装环固定在立杆上。QuickMount 允许对设备进行水平和垂直调节。

- 将快速安装座安装到设备背面。
-

![](/img/6d8362fa9f81276e.webp)

![](/img/f1b9c851a1837362.webp)

- 将设备安装到立杆上。
- 使用随附的钢制卡箍固定。卡箍直径 35 – 70 mm。
-

![](/img/006d6b97c4c91436.webp)

- 请避免将松散的网线连接到以太网端口，应将线缆固定在墙壁或立杆上，以免线缆的重量拉扯端口。建议将网线固定在距离设备不到 2m 的位置。这是为了确保线缆不会因其重量而损坏端口，也不会脱落。我们建议使用 Cat6 屏蔽网线。警告！本设备的安装和运行时，设备与你的身体之间应保持至少 25 cm 的距离。本设备在住宅环境中运行可能会导致无线电干扰。

请避免将松散的网线连接到以太网端口，应将线缆固定在墙壁或立杆上，以免线缆的重量拉扯端口。建议将网线固定在距离设备不到 2m 的位置。这是为了确保线缆不会因其重量而损坏端口，也不会脱落。可以通过打开盖子连接接地线，那里提供一个接地螺丝。

## 接地 {#grounding}

安装基础设施（塔架和桅杆）以及路由器本身都必须正确接地。设备在机壳门后带有接地线连接螺丝。将接地线连接到接地螺丝，然后将接地线的另一端连接到已接地的桅杆上。这可大幅降低 ESD 和雷击损坏的风险。

![](/img/9d368495fcc09e4b.webp)

设备带有接地连接（标记为 ⏚）。

## 打开盖子 {#opening-cover}

要打开盖子，请用手逆时针拧松 captive screw 并将其提起。

![](/img/c9aa40a174a2b89d.webp)

## 扩展插槽和端口 {#extension-slots-and-ports}

- 产品代码：L22UGS-5HaxD2HaxD-15S
- CPU：IPQ-5010 800 MHz
- CPU 架构：ARM
- CPU 核心数：2
- RAM 容量：256 MB
- RAM 类型：DDR3L
- 存储：128 MB，NAND
- 操作系统：RouterOS（License level 4）
- 一个 10/100/1000 千兆以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X），因此你可以使用直通线或交叉线连接到其他网络设备。该以太网端口可通过无源 PoE 注入器接受 12-28V DC 供电。
- 一个适用于 2.5GBit 模块的 SFP 端口，支持 DDMI。
- 内置无线接口，2x2 MIMO，AP（RouterOS level 4 许可证）
- 无线接口型号：IPQ-5010（2.4 GHz）、QCN-6102（5 GHz）
- 无线：2.4 GHz 802.11b/g/n/ax 双链；5 GHz 802.11a/n/ac/ax 双链
- 天线增益 2.4 GHz：12 dBi
- 天线增益 5 GHz：15 dBi
- 无线 5 GHz 代际：Wi-Fi 6
- 尺寸 349 x 140 x 68 mm
- 工作温度 -40°C 至 +70°C
- IP 55

## 按钮和跳线 {#buttons-and-jumpers}

重置按钮具有以下功能：

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备现在将寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这在 RouterBOOT 调试和恢复时很有用。

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如送往指定的废弃物处置场所。请了解你所在地区将设备妥善运送到指定处置场所的相关程序。
