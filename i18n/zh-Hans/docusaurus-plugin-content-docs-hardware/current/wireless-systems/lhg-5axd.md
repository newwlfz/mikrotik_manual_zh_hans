---
title: "LHG-5axD"
slug: /lhg-5axd
source: https://manual.mikrotik.com/hardware/lhg-5axd
captured_at: '2026-11-04T09:55:08+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/2703f96e0e805ba3.jpg)

## [LHG 5 ax](https://mikrotik.com/product/lhg_5_ax) (LHG-5axD) {#lhg-5-ax-lhg-5axd}

具有现代 Wi-Fi 6 性能、坚固设计和无与伦比价格的长距离室外 CPE。请参阅 [LHG-5axD 产品页面](https://mikrotik.com/product/lhg_5_ax) 了解完整规格和宣传册。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家电气规范。
- 本产品 intended to be mounted outdoors on a pole. 请阅读安装说明 carefully before beginning installation. 未使用正确的硬件和配置或未遵循正确的程序可能会导致人员危险和系统损坏。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家/地区法规，包括在合法频率信道内运行、输出功率、布缆要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 此 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。此 MikroTik 设备的安装和运行位置应距离您的身体、职业用户或公众不少于 20 厘米。

- 为避免环境污染，请将设备与生活垃圾分开，并以安全方式处置，例如送至指定的废物处置场所。请熟悉将设备正确运输到您所在地区指定处置场所的程序。

## 组装与安装 {#assembly-and-mounting}

- 将两条支腿安装到 LHG 外壳上。

![](/img/d58c3d73abedbf96.webp)

- 将组装好的 LHG 设备卡入网格的适当位置。
- 用两颗自攻螺钉固定支腿（使用 PH2 十字螺丝刀）。

![](/img/4333f6bb76f982d7.webp)

该设备设计为使用扎带或钢制卡箍安装在立杆上，如图所示。随附钢制卡箍的夹持直径为 35 – 70 mm。

![](/img/e29801f908debc24.webp)

- 将随附的钢制卡箍穿过设备。
- 将设备固定到立杆上。
- 对齐并拧紧卡箍以固定设备。可选：如有需要，在安装设备前，您可以将随附的 5 度调节转接头插入顶部或底部插槽（安装环插入的位置）。当设备紧固到垂直立杆上时，这将产生额外的向上或向下角度。

![](/img/0aaffeda7585ef66.webp)

设备包含一个接地连接（标记为 ⏚），您应将其连接到设备使用所在塔架或建筑的接地装置。这是为了大幅降低 ESD 和雷击损坏的风险。警告！此设备的安装和运行应与身体保持至少 40 厘米的距离。在住宅环境中操作此设备可能会导致无线电干扰。

将以太网电缆连接到门下方的以太网端口，并如图所示穿过支腿：

![](/img/6a72f386ce5fdaa5.webp)

其他安装支架可单独购买：

LHG 安装支架

![](/img/89ac01f14397f7f4.webp)

solidMOUNT

![](/img/5b3e2f6bc7ad89e2.webp)

## 快速开始 {#quickstart}

- 用以太网电缆将设备连接到随附 PoE 注入器的 data+power 端；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 通过 Web 浏览器使用 **WebFig** 或 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）配置设备。**有多种配置方法可用，以确保可访问性；**
- 打开 [https://192.168.88.1](https://192.168.88.1) 即可访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 选项卡，然后单击 MAC 地址。用户名为 “**admin**”，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 “Downloads” 部分找到所需的软件包；
- 将下载的软件包上传到 **WebFig** 或 **WinBox** 的 “**Files**” 菜单，然后重启设备；
- 将 RouterOS 软件更新到最新版本可确保获得最佳性能、稳定性和安全更新；
- 在 “Quick Set” 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。该设备已预配置为无线客户端，您只需选择要连接的 AP 并设置设备密码。您可以在默认打开的 Quick Set 选项卡中执行此操作。我们建议单击 “Check for updates” 按钮，并将您的 RouterOS 软件更新到最新版本，以确保最佳性能和稳定性。如果 IP 连接不可用，可以使用 WinBox 连接到设备的 MAC 地址。如果您希望从网络启动设备，例如使用 MikroTik Netinstall，请在启动设备时按住设备的 RESET 按钮，直到 LED 灯熄灭，然后设备将开始查找 Netinstall 服务器。有关使用 RouterOS 和连接此设备的更多信息，请参阅我们的文档：[https://mt.lv/help##](https://mt.lv/help##) 供电：该设备仅接受来自 Passive PoE 注入器的供电。PoE 输入电压：12-28 V。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 一个以太网端口，支持自动交叉/直通电缆校正（Auto MDI/X），因此您可以使用直通或交叉电缆连接其他网络设备。
- 一个集成无线设备，带有内置网格天线。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三项功能：

- 重置 RouterOS 配置 - 在启动期间按住按钮，直到 USR LED 灯开始闪烁，然后松开以重置配置（约 5 秒）。
- 启用 CAP 模式。继续按住 5 秒（总共 10 秒），直到 USR LED 变为常亮，然后松开以开启 CAP 模式。设备现在将搜索 CAPsMAN 服务器。
- 使用 Netinstall 重新安装 RouterOS（BOOTP 模式）。有两种引导程序可用：常规引导程序 - 打开设备电源，等待 1-2 秒，然后按住 Reset 按钮。等待 USR LED 闪烁，然后变为常亮。当 USR LED 熄灭时，松开 Reset 按钮 - 设备将进入 BOOTP 模式。
- 备份引导程序 - 关闭设备电源，按住 Reset 按钮，然后打开电源。等待 USR LED 闪烁，然后变为常亮。当 USR LED 熄灭时，松开 Reset 按钮 - 设备将使用备份引导程序进入 BOOTP 模式。无论使用上述哪个选项，如果在设备通电前按下按钮，系统都将加载备份 RouterBOOT 加载程序。用于 RouterBOOT 调试和恢复。

## 操作系统支持 {#operating-system-support}

该设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未测试。
