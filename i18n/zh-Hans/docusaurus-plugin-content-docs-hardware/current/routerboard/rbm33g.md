---
title: "RBM33G"
slug: /rbm33g
source: https://manual.mikrotik.com/hardware/rbm33g
captured_at: '2026-11-04T10:03:14+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/c3cd190322c3d0c9.jpg)

功能强大的 OEM 板，配备三个千兆 LAN 口和两个 miniPCIe 插槽。完整规格和宣传册请参见 [RBM33G 产品页面](https://mikrotik.com/product/rbm33g)。

## 安全警告 {#safety-warnings}

在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的通用做法。本产品的最终处置应遵守所有国家法律和法规。在任何墙面上安装接入点的所有安装方法均需获得当地管辖部门的认可。设备的安装必须符合当地和国家的电气规范。本产品设计用于安装在户外立柱上，但也可在室内安装。开始安装前请仔细阅读安装说明。使用错误的硬件和配置或未遵循正确的操作流程，可能给人员带来危险情况并对系统造成损坏。请仅使用制造商认可的电源和附件，这些可在本产品的原始包装中找到。在将系统连接到电源之前，请阅读安装说明。我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！如果设备出现故障，请断开其电源。最快捷的方法是拔下电源插座上的电源插头。客户有责任遵守当地国家法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线电设备必须由专业人员安装。

## 首次使用 {#first-use}

- （可选）将设备安装到外壳中。
- 将线缆连接到无线网卡和以太网端口。
- 插入电源线（直接插入或通过 PoE 注入器）以开启设备，请参见（链接）段落。
- 初始连接必须通过以太网线，使用 MikroTik WinBox 工具完成。应使用 WinBox 连接到默认 IP 地址 192.168.88.1，用户名为 admin，无密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）。
- 我们建议点击 "Check for updates" 按钮并将 RouterOS 软件更新至最新版本，以确保最佳性能和稳定性，
- 选择您所在的国家，以应用国家法规设置（如适用），并在随后加载的界面中设置您的密码。

## 组装 {#assembly}

M33G 供专业用途使用。每台设备均采用 ESD 防护包装。处理电气设备时，请遵守以下安全预防措施：

- 拆包和处理电子元件时，请使用腕部接地带，以避免静电放电（ESD）损坏。
- 拆包后，请将路由器放置在防静电垫上。
- 安装设备时，请确保没有可能损坏或接触 PCB 板的物体。
- 请注意，ETH、USB 及其他端口超出 PCB 板的边缘。可使用 PCB 板上设备两侧预留的四个孔，将设备安装到您期望的位置。

## 安装 {#mounting}

本设备的安装和配置应由具备资质的人员执行。

安装基础设施（塔架和桅杆）以及路由器本身必须正确接地。

## 供电 {#powering}

设备可通过以下方式接受供电：

- 无源 11-28 V DC ⎓ PoE 输入到 J1 以太网端口。为补偿长线缆上的功率损耗，建议至少使用 18 V 的较高电压。
- 直接输入到电源插孔 DC ⎓ 11-28 V。所有接口满载时的最大总功耗为 24 W。每个扩展卡的最大供电为 3 A。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备的以太网线连接到 PoE 适配器的 POE 端口。
- 将来自您 LAN 的以太网线连接到 PoE 适配器的 LAN 端口，请注意数据和电力流向的箭头。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 启动过程 {#booting-process}

RouterOS 是所有 RouterBOARD 路由器的操作系统。请参见文档：[https://mt.lv/help](https://mt.lv/help) 本设备除以太网端口上的 IP 地址外未进行预配置。其他配置必须按照上述链接的文档手册进行。如果您希望从网络启动设备，例如使用 MikroTik Netinstall，请在启动时按住设备的复位按钮，直到 LED 灯熄灭，设备便会开始寻找 Netinstall 服务器。如果 IP 连接不可用，也可以使用 WinBox 工具连接到设备的 MAC 地址。更多信息请参见文档。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 三个千兆以太网端口（支持 Auto MDI/X，因此可使用直通线或交叉线连接到其他网络设备）。J1（最左侧）以太网端口接受来自无源 PoE 注入器的 11-30 V DC 供电。
- 两个 miniPCIe 插槽，可安装 802.11 无线网卡或 3G/LTE 调制解调器。提供用于 miniPCIe 3G/LTE 调制解调器的 Mini-SIM 2FF 插槽，未安装调制解调器时不具备任何功能。
- 一个 M.2（M key）插槽，用于 PCI-e SSD 磁盘。安装孔适用于 2242 尺寸的卡，其他尺寸建议使用延长件。任何速度的 M.2 卡都将以 1x PCIe 速度运行。
- 一个 microSD 插槽，用于存储卡。
- 一个 DB9 RS232 串口，用于串行控制台访问。配置为 115200 bit/s，8 个数据位，1 个停止位，无校验。

## USB 跳线 {#usb-jumper}

位于 USB 3.0 端口右侧。安装跳线后，USB 3.0 端口启用。移除跳线可将 USB 2.0 线路切换到 J10（中央）miniPCIe 插槽（USB 3.0 线路仍保持对 USB 端口启用）。如果您需要在设备中使用两个蜂窝调制解调器，则此项为必需。通常，您可以在 J8（左侧）插槽中使用 LTE 调制解调器，并在 J10 插槽中使用 802.11 无线网卡。这种情况下可以保留跳线，因为大多数无线网卡工作在 PCI express 上。移除跳线可在中央 J10 插槽中使用第二个蜂窝调制解调器，但会禁用 USB 端口的 USB 2.0 功能，而 USB 端口仍可使用 USB 3.0。请参见下图：

![](/img/7de67a6d3dcc15ef.webp)

## 启动配置跳线 {#boot-configuration-jumpers}

MikroTik RouterOS 启动的默认跳线配置：

![](/img/1bd58303e71cd179.webp)

## MiniPCIe、SIM 插槽使用 {#minipcie-sim-slot-usage}

安装 miniPCIe 模块应由具备资质的人员执行，处理电气设备时请遵守安全预防措施：

- 拆包和处理电子元件时，请使用腕部接地带，以避免静电放电（ESD）损坏。
- 将 PCB 板放置在防静电垫上。
- 找到 PCB 上的 miniPCIe 插槽，并卸下两颗出厂固定的螺丝。
- 将卡安装到 miniPCIe 插槽中。
- 使用先前卸下的两颗螺丝将卡固定到位。
- 将灰色 uFL 接头连接到调制解调器的 MAIN 天线接头，将黑色线缆连接到辅助（或 AUX）接头。将移动运营商的 SIM 卡滑入 SIM 插槽。该插槽接受 miniSIM（2FF）。每个 MiniPCIe 插槽对应位于其下方的 SIM 插槽。SIM 插槽无法在 RouterOS 中切换。

## GPIO 引脚排列 {#gpio-pinout}

M33 引脚定义如下所示：

![](/img/5ec065a7d1c7b3ec.webp)

所有输出引脚均为开漏。

数字输入电压最高为 0 至 3.63 V。

要在引脚上获得逻辑 "0"，电压应在 0 至 1.4 V 之间。

要在引脚上获得逻辑 "1"，电压应在 1.41 至 3.63 V 之间。

默认情况下，引脚 12、13、15、16 配置为第二个 "serial1" 端口使用：

```
/system/routerboard/settings/set gpio-function=serial1

```

可以在 /iot/gpio/digital 菜单中通过以下命令将它们重新分配为 GPIO 使用：

```
/system/routerboard/settings/set gpio-function=""
/system/reboot

```

## 按钮和跳线 {#buttons-and-jumpers}

**RouterBOOT 复位按钮。** 该按钮具有以下功能：

- 在启动过程中按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（总计 5 秒）。
- 继续按住 5 秒，LED 常亮，此时松开可开启 CAPs 模式（总计 10 秒）。* 继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（总计 15 秒）。无论使用上述哪种选项，如果在设备通电前按下按钮，系统将加载备份 RouterBOOT 加载器。这对 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包括随设备提供的以下配件：

- K-25 套装。

## 规格 {#specifications}

有关本产品、规格和图片的更多信息，请访问我们的网页：[https://mikrotik.com/product/rbm33g](https://mikrotik.com/product/rbm33g)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本列于 /system resource 中。其他操作系统未经测试。

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将已填入。
- 点击 Connect，通过无线网络建立与设备的连接。
- 选择 Quick setup，应用将通过几个简单步骤引导您完成所有基本配置设置。
- 可使用高级菜单完整配置所有必要设置。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如送往指定的废物处置场所。请了解您所在地区将设备正确运送到指定处置场所的流程。

## 联邦通信委员会干扰声明 {#federal-communication-commission-interference-statement}

本设备已经过测试，符合 FCC 规则第 15 部分对 B 类数字设备的限制。这些限制旨在为住宅安装提供合理的有害干扰防护。

![](/img/ce6fc3eb10b9a1e6.webp)

本设备会产生、使用并可能辐射射频能量，如果未按照说明进行安装和使用，可能会对无线电通信造成有害干扰。但是，并不保证在特定安装中不会发生干扰。如果本设备确实对无线电或电视接收造成有害干扰（可通过关闭再开启设备来确定），建议用户尝试通过以下一种或多种措施来纠正干扰：

- 重新调整接收天线的方向或位置。
- 增大设备与接收器之间的距离。
- 将设备连接到与接收器所连接电路不同的插座上。
- 咨询经销商或有经验的无线电/电视技术人员寻求帮助。FCC 警告：任何未经合规负责方明确批准的更改或修改，都可能导致用户失去操作本设备的权限。本设备符合 FCC 规则第 15 部分。操作须满足以下两个条件：(1) 本设备不得造成有害干扰，且 (2) 本设备必须接受所收到的任何干扰，包括可能导致非预期操作的干扰。注意：本机在外设上使用屏蔽线缆进行了测试。为确保合规，必须在本机上使用屏蔽线缆。

## 加拿大创新、科学与经济发展部 {#innovation-science-and-economic-development-canada}

本设备符合加拿大工业部免许可 RSS 标准。操作须满足以下两个条件：(1) 本设备不得造成干扰，且 (2) 本设备必须接受任何干扰，包括可能导致设备非预期操作的干扰。Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes: (1) l'appareil ne doit pas produire de brouillage, et (2) l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

本 B 类数字设备符合加拿大 ICES-003 标准。

本 [B] 类数字设备符合加拿大 NMB-003 标准。

CAN ICES-003 (B) / NMB-003 (B)

## UKCA 标志 {#ukca-marking}

![](/img/5d0fc80f851cbbdf.webp)

## 欧亚符合性标志 {#eurasian-conformity-mark}

有关设备制造日期的信息，标注在其标签上序列号的末尾，以斜线分隔。第一位数字表示年份编号（年份的最后一位数字），后两位数字表示周数。

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

## CE 符合性声明 {#ce-declaration-of-conformity}

制造商：MikroTikls SIA, Brivibas gatve 214i Riga, Latvia, LV1039。

欧盟符合性声明全文可在以下网址获取：[https://mikrotik.com/products](https://mikrotik.com/products)
