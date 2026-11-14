---
title: "KNOT 嵌入式 LTE4 EC25-EU 和 KNe"
slug: /knot-embedded-lte4-ec25-eu-and-kne
source: https://manual.mikrotik.com/hardware/knot-embedded-lte4-ec25-eu-and-kne
captured_at: '2026-11-04T09:51:16+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/knot-embedded-lte4-ec25-eu-and-kne-1113311d8358f69531fb894713b38b2a.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/65d82882e4ff88db.jpg)

### [KNOT Embedded LTE4](https://mikrotik.com/product/knot_embedded_lte4)（EC25-EU&KNe） {#knot-embedded-lte4-ec25-eukne}

KNOT Embedded LTE4 是一款小巧但功能强大的工业级 LTE 网关，专为集成商、自动化专家和 IoT 系统构建者设计。它可安装于狭小空间，可直接固定在 DIN 导轨上，并提供可靠的 LTE Cat4 连接，同时支持 Bluetooth 和 GNSS。完整规格与宣传册请参见 [KNOT Embedded LTE4 EC25-EU&KNe 产品页面](https://mikrotik.com/product/knot_embedded_lte4)。

可将其用作主网关、备份链路或 IoT 数据采集节点——一切都由 RouterOS 驱动，以实现最大的灵活性。

## 快速开始 {#quickstart}

- 按照设备上标示的方向将 SIM 卡插入卡槽；
- 使用随附的电源适配器为设备供电；
- 使用以太网线将设备连接到计算机；
- 通过 **WebFig** 或 **WinBox** 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）在网页浏览器中配置设备。**提供多种配置方式以确保可访问性；**
- 打开 192.168.188.1 即可访问 **WebFig**；对于 **WinBox**，请下载该工具，进入 **Neighbors** 标签页，然后点击 MAC 地址。用户名为 "**admin**"，密码为空（某些型号的用户名和无线密码请查看设备标签）；
- 如果您的移动网络运营商要求，请输入 PIN 码；
- 点击 "Check for updates" 按钮，将 RouterOS 更新到最新版本。必须插入有效的 SIM 卡并具备可用的 Internet 连接；
- 如需手动更新设备，请访问 mikrotik.com，选择您的型号，并在 "Downloads" 部分找到所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 "Files" 菜单，然后重启设备；
- 将 RouterOS 软件升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 设置路由器密码。

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>**产品代码**</td><td>EC25-EU&KNe</td></tr><tr><td>**CPU**</td><td>ARM Cortex‑A7，1 核，800 MHz</td></tr><tr><td>**RAM / 存储**</td><td>256 MB DDR，512 MB NAND</td></tr><tr><td>**操作系统**</td><td>RouterOS v7，License Level 3</td></tr><tr><td>**移动网络：2G**</td><td>Class 12 – 频段：3 (1800 MHz)、8 (900 MHz)</td></tr><tr><td>**移动网络：3G**</td><td>R8（42.2 Mbps ↓ / 5.76 Mbps ↑）– 频段：1 (2100 MHz)、8 (900 MHz)</td></tr><tr><td>**移动网络：LTE**</td><td>Category 4（150 Mbps ↓ / 50 Mbps ↑）</td></tr><tr><td>**MIMO**</td><td>DL 2×2，UL 1×1</td></tr><tr><td>**LTE FDD 频段**</td><td>1 (2100 MHz)、3 (1800 MHz)、7 (2600 MHz)、8 (900 MHz)、20 (800 MHz)、28A (700 MHz)</td></tr><tr><td>**LTE TDD 频段**</td><td>38 (2600 MHz)、40 (2300 MHz)、41 (2500 MHz)</td></tr><tr><td>**TAC**</td><td>86554604</td></tr><tr><td>**GNSS**</td><td>GPS、GLONASS、BeiDou、Galileo（SMA‑female）</td></tr><tr><td>**Bluetooth**</td><td>5.4 (BLE)</td></tr><tr><td>**以太网**</td><td>1 × 1 GbE RJ45（PoE‑in 802.3af/at，12‑57 V）</td></tr><tr><td>**SIM**</td><td>Nano‑SIM 与 eSIM</td></tr><tr><td>**GPIO**</td><td>6‑pin 排针（耐压 24 V，模拟与数字 I/O）</td></tr><tr><td>**电源**</td><td>PoE‑in（12‑57 V）或 USB‑C 5 V / 0.8 A，最大 7 W</td></tr><tr><td>**尺寸**</td><td>90 × 70 × 22 mm</td></tr><tr><td>**工作温度**</td><td>–40 °C … +70 °C</td></tr><tr><td>**MTBF**</td><td>≈ 100 000 h @ 25 °C</td></tr></tbody></table>

## 安装 {#mounting}

![](/img/6571d9174af6bfb6.webp)

![](/img/12860d4466370ab0.webp)

- 使用随附的 K-91 固定套件，可将设备安装在设备的背面或侧面，使用 DIN 导轨安装套件进行固定。它适用于标准的 35 mm × 7.5 mm DIN 导轨。使用随附的两颗螺丝将安装件固定到设备上，然后将设备固定到 DIN 导轨上。DIN 导轨不包含在包装内。
- 或者，可以使用设备背面的螺丝孔将设备固定在墙面上。安装时应使线缆开口朝下，如图所示。*警告！本设备的安装和操作应与身体保持至少 20 cm 的距离。在住宅环境中操作本设备可能会造成无线电干扰。* *本设备的安装和配置应由合格人员完成。*

## 供电 {#powering}

- USB-C 输入电压：5 V，0.8 A。
- 以太网端口支持 802.3af/at Power over Ethernet 12-57 V DC。最大功耗可达 7 W。

**连接到 PoE 适配器：**

- 将以太网线从设备连接到 PoE 适配器的 **PoE + DATA** 端口。
- 将以太网线从您的本地网络（LAN）连接到 PoE 适配器的 **DATA** 端口。
- 将电源线连接到适配器，然后插入电源插座。

## 天线连接 {#antenna-connections}

<table><thead><tr><th>**端口**</th><th>**功能**</th><th>**在连接中的作用**</th><th>**备注**</th></tr></thead><tbody><tr><td>**MAIN**</td><td>主蜂窝发射与接收天线</td><td>所有数据发送与接收所必需</td><td>调制解调器必须连接该天线才能工作</td></tr><tr><td>**DIV (Diversity)**</td><td>辅助蜂窝仅接收天线</td><td>通过从不同的空间路径接收信号，提升信号质量与可靠性</td><td>可选，但在弱信号或移动环境中建议使用</td></tr><tr><td>**GNSS**</td><td>GNSS (GPS) 接收天线</td><td>启用卫星定位（GPS/GNSS）功能</td><td>仅在使用 GNSS/定位服务时需要</td></tr></tbody></table>

### 它们如何协同工作 {#how-they-work-together}

**MAIN** 天线同时负责发送（TX）和接收（RX），是设备运行所必需的。**DIV** 天线提供接收分集，使调制解调器能够从两路接收信号中选择更好的一路，从而提升稳定性和潜在吞吐量。

这种配置构成了设备用于蜂窝连接的 2×2 MIMO 实现。

**GNSS** 天线独立于蜂窝工作，仅用于卫星定位。

### 实际注意事项 {#practical-considerations}

- 如果只使用一根蜂窝天线，必须将其连接到 **MAIN** 端口。
- 在弱信号环境中强烈建议增加一根 **DIV** 天线。
- 为获得最佳性能，请将 MAIN 和 DIV 天线保持一定的物理间距或采用不同的朝向。
- 安装 **GNSS** 天线时应保证天空视野开阔，以获得精确定位。

### 扩展插槽与端口 {#extension-slots--ports}

<table><thead><tr><th>端口</th><th>类型</th><th>功能</th></tr></thead><tbody><tr><td>1 × 1 GbE RJ45</td><td>PoE‑in / 数据</td><td>以太网 + 供电</td></tr><tr><td>1 × USB‑C</td><td>仅供电</td><td>5 V 输入</td></tr><tr><td>1 × SIM 卡槽</td><td>Nano‑SIM / eSIM</td><td>蜂窝网络</td></tr><tr><td>3 × SMA</td><td>DIV / GNSS / MAIN</td><td>LTE 与 GNSS 天线</td></tr><tr><td>1 × Bluetooth 天线（内置）</td><td>2.4 GHz，2 dBi 增益</td><td>BLE</td></tr><tr><td>1 × GPIO 排针</td><td>6‑pin</td><td>数字 I/O，模拟输入</td></tr><tr><td>1 × microUSB 2.0（适用于某些 KNOT 型号）</td><td>供电 / 外设</td><td>–</td></tr></tbody></table>

## 蜂窝调制解调器配置 {#cellular-modem-configuration}

子菜单：/interface lte有关频段选择、漫游或高级选项，请参阅 LTE 指南。

## GNSS 配置 {#gnss-configuration}

更多详细信息请参见此处的指南。

## 按钮和跳线 {#buttons-and-jumpers}

### Reset 按钮 {#reset-button}

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开即可开启 CAP 模式。设备将开始寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种方式，如果在设备通电前按下按钮，系统都会加载备份的 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## GPIO 引脚排列 {#gpio-pinout}

GPIO 引脚位于外壳下方的电路板上，如图所示：

![](/img/a157bbe312aa3131.webp)

### ADC 输入/模拟输入（pin2） {#adc-inputanalog-input-pin2}

![](/img/a1a7751cf9c9c102.webp)

**注意：** *模拟输入电压为 0-24 V。理论分辨率为 1.5 mV（14bit ADC）。模拟输入阻抗约为 72K Ohm。*

#### 连接继电器（pin4） {#connected-relays-pin4}

![](/img/1699bba96b105716.webp)

**注意：**数字输出开漏晶体管的最大功耗为 0.48 W。建议在持续工作时不要超过 24V 或 0.5A。漏源绝对最大电压为 30V，最大电流为 2.8A。*

![](/img/4c01507e5fd17337.webp)

#### 防拆开关（pin6） {#tamper-switch-pin6}

![](/img/07b8e8f51cc022fc.webp)

**注意：** *数字输入电压最大为 0-24 V。*

防拆开关：输入端配有内部上拉电阻。要使引脚上获得逻辑 "0"，电压应在 0-1.2 V 之间；

要使引脚上获得逻辑 "1"，电压应在 1.2-24V 之间。

## 配件 {#accessories}

包装内包含随设备提供的以下配件：

![](/img/08c5b42d7bb22d3a.webp)

### 天线可单独购买 {#antennas-can-be-purchased-separately}

<table><thead><tr><th>**HGO-LTE-W**</th><th>**ACGPSA**</th></tr></thead><tbody><tr><td>![](/img/4b4ec2b339b71935.webp)</td><td>![](/img/d891612d324286e3.webp)</td></tr></tbody></table>

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂预装版本可在 /system resource 中查看。其他操作系统尚未经过测试。
