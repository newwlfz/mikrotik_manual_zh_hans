---
title: "wAP ax LTE7 套件"
slug: /wap-ax-lte7-kit
source: https://manual.mikrotik.com/hardware/wap-ax-lte7-kit
captured_at: '2026-11-04T10:07:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![](/img/ab28db28cb8aebf8.webp)

![](/img/3f5b27411dbd2efd.webp)

## [wAP ax LTE7 kit](https://mikrotik.com/product/wap_ax_lte7) (wAPGR-5HaxD2HaxD&R11e-LTE7) {#wap-ax-lte7-kit-wapgr-5haxd2haxdr11e-lte7}

全新的 wAP LTE7 kit 是广受欢迎的 wAP ac LTE6 的升级版本。现在——配备 Wi-Fi 6、CAT7 LTE、更强大的 ARM 平台以及更高的天线增益。该设备采用我们改进的新一代 IP66 防水外壳。

## 安全警告 {#safety-warnings}

- 在对任何 MikroTik 设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。安装人员应熟悉网络结构、术语和概念。
- 仅使用制造商认可的电源和附件，这些电源和附件可在本产品的原始包装中找到。
- 本设备应由经过培训的合格人员按照这些安装说明进行安装。安装人员负责确保设备的安装符合当地和国家的电气规范。
- 请勿尝试拆卸、维修或改装设备。如需维修服务，请联系 MikroTik 支持。
- 本产品可在室内和室外使用。在开始安装之前，请仔细阅读安装说明。未使用正确的硬件和配置，或未遵循正确的操作步骤，可能会对人员造成危险并损坏系统。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，操作风险自负！
- 插座应安装在设备附近，并且应易于接近。
- 设备发生故障时，请断开其电源。最快的方法是将电源适配器从电源插座上拔下。
- 这是 A 类产品。在居住环境中，本产品可能会造成无线电干扰，此时用户可能需要采取适当的措施。
- 为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定区域处置。请熟悉将设备正确运送到您所在地区指定收集点的程序

## 快速开始 {#quickstart}

- 打开底部盖板；
- 按设备上的指示将 SIM 卡插入插槽；
- 使用以太网线将设备连接到随附 PoE 注入器的 *"data+power"* 端；
- 将 PoE 注入器的数据端连接到计算机；
- 将电源适配器连接到 PoE 注入器；
- 在计算机上进入网络连接部分，找到名为 "*MikroTik-...*" 的无线网络。然后连接到它（请查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，使用网页浏览器中的 WebFig，或位于 [https://mt.lv/winbox/](https://mt.lv/winbox/) 的 "WinBox" 配置工具 **提供多种配置方式以确保可访问性；**
- 在所选工具中使用默认 IP 地址 192.168.88.1 开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 "Neighbors" 选项卡来查找设备；
- 然后使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户和无线密码）；
- 选择 "Check for updates" 按钮，将 RouterOS 更新到最新版本；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 通过将 RouterOS 软件升级到最新版本，您可以确保获得最佳性能、稳定性和安全更新；
- 在 "QuickSet" 菜单中设置以下内容：选择您的国家/地区，以应用国家/地区法规设置；
- 在左侧字段中设置无线网络密码；
- 在底部字段中设置路由器密码。

## 安装 {#mounting}

设备可通过多种方式安装：墙壁、天花板、抱杆，或者放置在包装中随附的专用 MikroTik 支架中。包装中包含带有说明的钻孔模板，可帮助您安装以太网线并将其固定到天花板或墙壁上。包装中还包含一个用于安装到活动天花板吊顶板另一侧的钢制支架，以及两颗螺丝和墙塞。设备可使用扎带或钢制卡箍固定到抱杆上。可使用不同的螺丝防止底部盖板被打开。随附一颗 Torx T20 安全螺丝供选配使用。请使用随附的 L 形扳手将其固定到底部盖板。更换螺丝的详细说明在包装中。

在使用和安装本设备时，请注意最大允许暴露量（MPE）安全距离，即辐射体与您身体之间至少保持 31 cm 的距离。

### 抱杆安装 {#pole-mounting}

![](/img/6bf6bbf7b0406e6a.webp)

![](/img/fdfbab7b78baa4b2.webp)

** 建议使用电工胶带以增加材料之间的摩擦力。*

- 将塑料扎带穿过孔洞，安装到钢制支架上。
- 将支架安装到设备上。
- 用螺丝固定。
- 将设备安装到抱杆或桅杆上并对齐。
- 将网线穿过开口并连接到以太网端口。
- 关闭底部卡扣并用螺丝固定。建议使用扎带将网线固定到抱杆上，与设备的距离约为 30 cm。

### 墙壁/天花板安装 {#wallceiling-mounting}

- 将安装模板放在墙壁或天花板上，并标记钻孔位置。

![](/img/35a51811319757d0.webp)

- 安装孔之间的距离：**162.5 mm**
- 钻安装孔：为随附的墙塞钻 **Ø 6 mm** 孔，或
- 如果直接安装到电缆导管中，则钻 **Ø 5 mm** 孔。
- 如有需要，插入随附的墙塞。
- 使用 K-95 套件中随附的螺丝固定安装支架。
- 从设备上取下橡胶密封圈。
- 使用 PH2 螺丝刀松开外壳螺丝。

![](/img/8609dec5cac4198e.webp)

- 打开外壳，将网线穿过电缆入口。

![](/img/8ac132d065ca3e3e.webp)

- 如果要安装 ETH 插口，请使用 **13 mm** 钻头钻孔。
- 如果只是走线，请使用 **8 mm** 钻头钻孔。*（注意：此改装会降低设备的 IP 防护等级。）*

![](/img/f133af5d59e03f30.webp)

- 将设备安装到支架上：

![](/img/45f2457de4a5f3ce.webp)

将上部安装点挂到支架上。

- 向下滑动设备，直到其锁定到位。
- 安装 K-95 套件中的橡胶密封圈，以起到环境保护作用。

![](/img/a1668db5586e2165.webp)

- 连接网线并完成安装。
- 拧紧外壳螺丝并重新装上橡胶密封圈。
- 对于户外安装，请使用防护密封圈以确保环境保护。

:::warning 警告

- 钻孔前，请确保墙内没有隐藏的金属物体或管线。
- 确认安装表面能够承受设备的重量。
- 对于户外安装，请在适用的情况下使用随附的天气防护配件。

这种格式比逐张描述每张图片更简洁、更易遵循。

:::

### 线缆安装 {#cable-installation}

#### 准备电缆入口 {#preparing-the-cable-entry}

- 打开设备外壳。
- 在橡胶密封圈上确定所需的电缆入口位置。
- 使用锋利的刀或手术刀，沿标示的切割槽小心切开橡胶密封圈。
- 仅对要安装的电缆进行必要的切割，以保持尽可能高的防护等级。

![](/img/8fe181a0b4aeb3b0.webp)

#### 安装网线 {#installing-ethernet-cables}

- 将网线穿过橡胶密封圈上准备好的开口。

![](/img/2f48d1f9ed3ba351.webp)

- 网线穿过密封圈后，用合适的接头进行压接。

![](/img/69d804249a2be452.webp)

- 将网线连接到设备内部所需的以太网端口。

### 备选布线方式 {#alternative-cable-routing}

#### 裸线安装 {#bare-cable-installation}

- 如果裸线直接从墙壁引出，请在标示位置钻一个 **Ø 8 mm** 的孔穿过外壳。

![](/img/ddd63d074a6b9255.webp)

- 将电缆穿过该孔，并在设备内部进行端接。

![](/img/52353b9ff4063257.webp)

#### 预端接网线安装 {#pre-terminated-ethernet-cable-installation}

- 如果使用带有预装 RJ45 接头的电缆，请在标示位置钻一个 **Ø 13 mm** 的孔穿过外壳。
- 将接头穿过该孔，并连接到所需的以太网端口。钻额外的孔会降低防护（IP）等级。用合适的硅酮或密封胶密封所有开口。确保钻孔后设备内部没有残留的金属屑。

### 安装 microSIM 卡（如适用） {#installing-a-microsim-card-if-applicable}

- 将 microSIM 卡插入 SIM 卡座。

![](/img/1e958da5a0b0e5d5.webp)

- 用 SIM 卡座的拨杆将卡推到位，直到听到咔哒声。

![](/img/1c6297692e476c24.webp)

- 确认拨杆已完全锁定。

![](/img/e1c548d4aa737f81.webp)

#### 固定安装 {#securing-the-installation}

- 使用扎带整理并固定设备内部的所有线缆。

![](/img/6ced9a6e29c10bed.webp)

- 合上外壳盖。
- 使用 PH2 螺丝刀将外壳螺丝拧紧至 **0.8 Nm**。

![](/img/e413f73ee3e29b9e.webp)

- 重新装上螺丝上的橡胶塞。

### 最终检查 {#final-check}

- 确保所有电缆入口均已正确密封。
- 确认安装时标有 **"This side faces the wall"** 的一面朝向正确。

## 扩展插槽和端口 {#extension-slots-and-ports}

<table><thead><tr><th>**参数**</th><th>值</th></tr></thead><tbody><tr><td>**产品代码**</td><td>wAPGR-5HaxD2HaxD&R11e-LTE7</td></tr><tr><td>**架构**</td><td>ARM 64bit</td></tr><tr><td>**CPU**</td><td>IPQ-5010</td></tr><tr><td>**CPU 核心数**</td><td>2</td></tr><tr><td>**CPU 线程数**</td><td>2</td></tr><tr><td>**CPU 频率**</td><td>800 MHz</td></tr><tr><td>**RAM**</td><td>256 MB</td></tr><tr><td>**存储**</td><td>128 MB NAND</td></tr><tr><td>**1G 以太网端口**</td><td>2</td></tr><tr><td>**SIM 卡槽**</td><td>1 × Micro SIM 卡槽</td></tr><tr><td>**MiniPCIe 插槽**</td><td>1 × MiniPCIe 插槽，由 LTE 调制解调器占用</td></tr><tr><td>**3G 类别**</td><td>R8 (DL 42.2 Mbps / UL 5.76 Mbps)</td></tr><tr><td>**3G 频段**</td><td>1 (2100 MHz) / 3 (1800 MHz) / 5 (850 MHz) / 8 (900 MHz)</td></tr><tr><td>**LTE 类别**</td><td>7 (DL 300 Mbps / UL 100 Mbps)</td></tr><tr><td>**LTE 调制解调器**</td><td>R11e-LTE7</td></tr><tr><td>**TAC**</td><td>35312597</td></tr><tr><td>**MIMO DL**</td><td>2×2</td></tr><tr><td>**MIMO UL**</td><td>1×1</td></tr><tr><td>**LTE 频段（FDD）**</td><td>1 (2100 MHz) / 3 (1800 MHz) / 5 (850 MHz) / 7 (2600 MHz) / 8 (900 MHz) / 20 (800 MHz) / 28 (700 MHz) / 32 (1500 MHz)</td></tr><tr><td>**LTE 频段（TDD）**</td><td>38 (2600 MHz) / 40 (2300 MHz) / 41 (2500 MHz)</td></tr><tr><td>**无线 2.4 GHz**</td><td>574 Mbit/s，2 条链，802.11b/g/n/ax，6.9 dBi，IPQ-5010，Wi-Fi 6</td></tr><tr><td>**无线 5 GHz**</td><td>1200 Mbit/s，2 条链，802.11a/n/ac/ax，7 dBi，QCN-6102，Wi-Fi 6</td></tr><tr><td>**天线（2.4 GHz）**</td><td>内置天线，增益 6.9 dBi</td></tr><tr><td>**天线（5 GHz）**</td><td>内置天线，增益 7 dBi</td></tr><tr><td>**LTE 天线**</td><td>内置定向 LTE 天线</td></tr><tr><td>**复位按钮**</td><td>多功能复位按钮，用于重置配置、CAP 模式和 Netinstall</td></tr><tr><td>**模式按钮**</td><td>可配置的软件控制按钮</td></tr><tr><td>**LED 指示灯**</td><td>用户 LED 和接口状态 LED</td></tr><tr><td>**PoE 输入**</td><td>以太网端口 1 支持 802.3af/at PoE 输入</td></tr><tr><td>**直流电源输入**</td><td>DC 插孔，输入范围 12–57 V</td></tr><tr><td>**防护等级**</td><td>IP66</td></tr></tbody></table>

![](/img/2f2676f1070e6fe5.webp)

## 配置 {#configuration}

完整的 RouterOS 文档位于此处：[https://mt.lv/help](https://mt.lv/help)。设备已预配置为 LTE CPE 路由器：**LTE 接口** 作为受保护的 WAN 并启用 DHCP，而 LAN 网桥 192.168.88.1/24 提供 DHCP 和 DNS 服务。双频户外 Wi-Fi（2.4 GHz 和 5 GHz ax）已启用，采用 WPA2/WPA3 安全机制。

要访问设备，请通过任意以太网端口连接，或加入名为 "MikroTik‑…" 的默认 Wi‑Fi 网络。Wi‑Fi 密码印在设备附带的贴纸上。

您可以通过移动应用程序、网页浏览器中的 WebFig 或 WinBox 工具（可从 [https://mt.lv/winbox/](https://mt.lv/winbox/) 获取）使用默认 IP 地址 **192.168.88.1** 来管理设备。如果该地址不可达，请打开 WinBox，进入 Neighbors 选项卡，发现该设备。

如需恢复，可使用复位按钮通过网络重新安装固件。

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三个功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 持续按住复位按钮，直到 LED 变为常亮，然后松开即可启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议在其中一个无法工作时对两个选项都进行验证。

- **Regular Booter:** 要进入 etherboot 模式，请在给设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter:** 关闭设备。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，可通过 Netinstall 重新安装 RouterOS。视型号而定，这可能由 **USR, USER, System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备上电之前按下按钮，系统都会加载备份 RouterBOOT 引导程序。这可用于 RouterBOOT 调试和恢复。

## 随附部件 {#included-parts}

![](/img/16ac040953ba53be.webp)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 **/system resource** 中。其他操作系统尚未经过测试。
