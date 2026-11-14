---
title: "NetMetal ax"
slug: /netmetal-ax
source: https://manual.mikrotik.com/hardware/netmetal-ax
captured_at: '2026-11-04T09:57:16+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/968aa8d79379672b.jpg)

## [NetMetal ax](https://mikrotik.com/product/netmetal_ax)（L23UGSR-5HaxD2HaxD-NM） {#netmetal-ax-l23ugsr-5haxd2haxd-nm}

网络世界中的火星探测车。我们最坚固的远距离室外接入点 —— 现在支持 Wi-Fi 6！完整规格和宣传册请参见 [NetMetal ax 产品页面](https://mikrotik.com/product/netmetal_ax)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行。
- 在任何墙面上安装接入点的所有安装方法均须获得当地管辖部门的认可。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计用于安装在室外的立杆上。开始安装前请仔细阅读安装说明。未使用正确的硬件和配置或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 仅使用制造商认可的电源和附件，它们可在本产品的原厂包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备出现故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家的法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。
- 这是 A 类设备。在家庭环境中，本产品可能造成无线电干扰，此时用户可能需要采取适当的措施。

**暴露于射频辐射：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和运行距离您的身体、职业使用者或公众不得小于 20 厘米。

## 快速开始 {#quickstart}

配置与 AP 模式下的 PTP Bridge 相同，对于 PTMP 设置，无线模式也设为 AP。可以直接使用该地址访问路由器。如果设备连接到启用了 DHCP 服务器的网络，则 bridge 接口上配置的 DHCP 客户端将获取 IP 地址，可用于访问路由器。

请按照以下快速步骤设置您的设备：

- 打开上盖（参见拆卸上盖和下盖）；
- 将外置天线连接到 SMA 接头（参见天线的使用）；
- 打开下盖（参见拆卸上盖和下盖）；
- 将您的 ISP 线缆连接到设备，确保 ISP 允许硬件变更并会自动分配 IP 地址；
- 将设备连接到电源（参见供电）；
- 在计算机上进入网络连接部分，找到名为 "*MikroTik-...*" 的无线网络。然后连接到它（无线密码请查看贴纸）；
- 配置应通过无线网络使用移动应用程序进行，也可以使用 **WinBox** 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)；
- 下载并打开 **WinBox**，选择 **Neighbors** 选项卡以查找设备；
- 点击 MAC 地址。用户名为 "**admin**"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 如需手动更新设备，请访问产品页面 [https://mikrotik.com/products](https://mikrotik.com/products) 找到您的产品。所需的软件包可在 "Support&Downloads" 菜单下获取；
- 将下载的软件包上传到 **WinBox** 的 "**Files**" 菜单并重启设备。将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 wifi-interface 菜单中设置以下内容：选择您的国家/地区，以应用该国家/地区的法规设置；SSID；模式；参见手册页面：[WiFi](/docs/wireless/wifi)
- 设置您的无线网络安全配置文件；
- 如果需要使用 SIM 卡，请打开机壳并将所需的调制解调器装入 miniPCIe 插槽；
- 将 Nano SIM 卡插入插槽。

## 供电 {#powering}

设备可通过以下方式供电：

- 以太网端口支持无源 PoE，输入电压 18-28 V DC；
- 直接输入电源插孔（外径 5.5 mm、内径 2 mm，母头，中心正极插头）支持 12-28 V DC。

无附加设备时的最大功耗为 12 W，在最大负载下可达 25 W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口；
- 将来自您本地网络（LAN）的以太网线缆连接到 PoE 适配器；
- 将电源线连接到适配器，然后将电源线插入电源插座。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开应用程序。
- 默认情况下，IP 地址和用户名已预先填入。
- 点击 Connect 通过无线网络与您的设备建立连接。
- 选择 Quick setup，应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 还提供高级菜单，可完整配置所有必要的设置。

## 拆卸上盖和下盖 {#removing-upper-and-bottom-covers}

- 要拆下上盖，请拧松两颗防脱螺钉并将其从主体上滑下。不要完全取下螺钉，组装时拧紧扭矩为 0.2 Nm。
- 要拆下下盖，请松开两个固定件的卡扣，盖子即可打开。

![](/img/26178b9c61788031.webp)

## 安装 {#mounting}

NetMetal ax 设计用于户外使用，可安装在立杆或 DIN 导轨上。

安装时，请确保线缆出口朝下。本设备的 IP 防护等级为 IP66。我们建议使用 Cat6 屏蔽线缆。警告！本设备的安装和运行应使设备与您的身体之间保持至少 20 cm 的距离。在居住环境中操作本设备可能造成无线电干扰。本设备的安装和配置应由合格人员完成。包装中附带安装用软管卡箍。

![](/img/888d0d7f203dd8db.webp)

- 将软管卡箍穿过设备背面的开口。
- 将其固定到立杆或桅杆上。
- 使用 PH2 螺丝刀对齐并拧紧软管卡箍螺钉。
- 设备应始终以上盖朝上的方式放置。

![](/img/f15a01cb176e5195.webp)

- 安装在 DIN 导轨上时，请在包装中找到专用支架，并用四颗螺钉将其固定到设备背面。

![](/img/40aa019a9c63ef9b.webp)

- 装上安装支架后，您就可以将设备滑入 DIN 导轨。

## 接地 {#grounding}

安装基础设施（塔和桅杆）以及路由器本身都必须正确接地。设备配有接地线固定螺钉。将接地线连接到接地螺钉，然后将接地线的另一端连接到已接地的桅杆。

![](/img/b3a6ace755736ed2.webp)

请将所有松散的以太网线和天线线缆固定在距设备约 30cm 处的立杆或桅杆上，以免线缆重量拉扯端口和接头。

## 前面板状态 LED 行为 {#front-status-led-behavior}

RouterOS 允许按用户的意愿配置每个 LED 的活动。可以配置 LED 显示无线信号强度、在接口流量活动时闪烁以及许多其他选项。更多信息请参见 [LEDs](/docs/hardware/leds) 页面。本设备的出厂默认配置：

![](/img/526195de166b417d.webp)

- 常亮蓝色 —— 设备已通电。
- 常亮绿色 —— SFP 端口活动。
- 常亮绿色 —— 以太网端口活动。
- 常亮绿色 —— 五个绿色 LED 的组合，显示信号强度。

## 配置 {#configuration}

设备被配置为无线接入点，以太网端口被配置为 DHCP 客户端，用于连接到您的 ISP 路由器或交换机。无线接口上配置了 DHCP 服务器。我们建议点击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳的性能和稳定性。对于无线型号，请确保您已选择设备将使用的国家/地区，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问都被阻止）。出于恢复目的，可以引导设备进行重新安装，请参见 Reset 按钮一节。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 千兆以太网端口，支持自动交叉/直通线缆校正（Auto MDI/X）。直通线或交叉线均可用于连接其他网络设备。
- SFP 端口（支持 2.5G）。
- 外置 SMA 天线接头。
- MiniPCIe 插槽。
- 集成无线模块，工作于 2.4 GHz，802.11b/g/n/ax 协议。
- 集成无线模块，工作于 5 GHz，802.11a/n/ac/ax 协议。
- USB type-A。
- Nano SIM 插槽。

## Reset 按钮 {#reset-button}

Reset 按钮有三种功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备此时将查找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 查找 Netinstall 服务器（共 15 秒）。

无论使用上述哪种方式，如果在设备上电前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。这对 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含随设备提供的以下附件：

- EU 开关电源 24 V ⎓ 1,2 A。
- 千兆 PoE 注入器。
- K-27 DIN 导轨支架安装套件。
- 软管卡箍 40/60 w2 A2 9 mm。受支持的 SFP 模块请参见 [MikroTik wired interface compatibility](/docs/wired-connections/mikrotik-wired-interface-compatibility) 表。

## MiniPCIe 插槽的使用 {#minipcie-slot-usage}

此 NetMetal ax 版本未安装调制解调器。要安装模块，您需要拆下上盖并打开下盖（参见拆卸上盖和下盖）。安装 miniPCIe 模块应由合格人员完成，处理电气设备时请遵循安全预防措施：

- 在拆包和处理电气组件时，请使用腕带接地，以避免静电放电（ESD）损坏。
- 使用螺丝刀拆下四颗螺钉。

![](/img/3d63a4287bb06b8b.webp)

- 向上抬起以拆下顶盖。
- 在 PCB 上找到 miniPCIe 插槽，并拆下出厂时安装的两颗螺钉。

![](/img/d6c2929801f06cb6.webp)

- 将随附的厚导热垫贴到卡上，并将卡装入 miniPCIe 插槽，使导热垫位于 PCB 与卡之间。
- 使用先前拆下的两颗螺钉将卡固定到位。
- 将灰色 uFL 接头连接到调制解调器的 MAIN 天线接头，将黑色线缆连接到辅助（或 AUX）接头。
- 在卡的顶部贴上较薄的导热垫。

![](/img/5c2c2beff2ec1921.webp)

- 为 SMA 接头钻孔。
- 引导卡上的线缆穿过。
- 重新组装。

组装时，请确保橡胶密封件牢固地环绕在机壳周围并均匀分布，以防止进水污染。机壳螺钉扭矩为 2,5 Nm。为已安装的卡安装天线时，请确保将它们与无线天线分开并保持足够的距离。

## 天线的使用 {#antenna-usage}

天线安装。警告：安装人员有责任确保在美国（或适用 FCC 规则的地区）使用授权天线时，仅使用经产品认证的天线。根据 FCC 规则 CFR47 第 15.204 部分，明确禁止使用未经产品认证的任何其他天线。安装人员应根据国家/地区法规和天线类型配置天线的输出功率水平。带接头的设备需要专业安装，以确保符合健康与安全要求。已批准的 2GHz 天线列表：

-

5 dBi Dipole ACOMNIRPSMA 已批准的 5GHz 天线列表：

-

30 dBi 抛物面天线 MTAD-5G-30D3

-

19 dBi 扇区天线 MTAS-5G-19D120 在符合认证要求的情况下，可以使用与上述天线类型相同且增益更低的天线。有关 WiFi 接口的更多信息：[WiFi](/docs/wireless/wifi)

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>**产品代码**</td><td>L23UGSR-5HaxD2HaxD-NM</td></tr><tr><td>**架构**</td><td>ARM 32-bit</td></tr><tr><td>**CPU**</td><td>IPQ-5010, 2 core, 800 MHz</td></tr><tr><td>**RAM**</td><td>256 MB</td></tr><tr><td>**存储**</td><td>128 MB, NAND</td></tr><tr><td>**操作系统**</td><td>RouterOS v7（许可证级别 4）</td></tr><tr><td>**无线 2.4 GHz**</td><td>802.11b/g/n/ax, 2 chains, 574 Mbit/s</td></tr><tr><td>**无线 5 GHz**</td><td>802.11a/n/ac/ax, 2 chains, 2400 Mbit/s</td></tr><tr><td>**天线**</td><td>2 × RP-SMA 母头，不含天线</td></tr><tr><td>**10/100/1000 以太网端口**</td><td>1</td></tr><tr><td>**SFP 端口**</td><td>1（支持 2.5G）</td></tr><tr><td>**USB 端口**</td><td>1 × USB type-A</td></tr><tr><td>**SIM 插槽**</td><td>1 × Nano SIM</td></tr><tr><td>**miniPCIe 插槽**</td><td>1</td></tr><tr><td>**DC 输入数量**</td><td>2（DC 插孔、PoE-in）</td></tr><tr><td>**PoE-in**</td><td>无源 PoE，18-28 V</td></tr><tr><td>**DC 插孔输入电压**</td><td>12-28 V</td></tr><tr><td>**最大功耗**</td><td>25 W</td></tr><tr><td>**无附加设备时的最大功耗**</td><td>12 W</td></tr><tr><td>**散热方式**</td><td>被动散热</td></tr><tr><td>**尺寸**</td><td>143 × 247 × 48 mm</td></tr><tr><td>**工作温度**</td><td>-40 °C 至 +70 °C</td></tr><tr><td>**MTBF**</td><td>25 °C 下约 200,000 小时</td></tr><tr><td>**认证**</td><td>CE, FCC, IC, EAC, ROHS</td></tr><tr><td>**IP 等级**</td><td>IP66</td></tr></tbody></table>

有关本产品的更多信息、规格、图片、下载和测试结果，请访问我们的网页：[https://mikrotik.com/product/netmetal_ax](https://mikrotik.com/product/netmetal_ax)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。出厂预装的具体版本列于 /system resource。其他操作系统尚未经过测试。
