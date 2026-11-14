---
title: "KNOT LR8 kit"
slug: /knot-lr8-kit
source: https://manual.mikrotik.com/hardware/knot-lr8-kit
captured_at: '2026-11-04T09:52:08+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可以下载为 <a href="/assets/files/knot-lr8-kit-14575ab2838632fcb5f7fa7175683a56.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/7955d232dcd19d10.webp)

### [KNOT LR8 kit](https://mikrotik.com/product/knot_lr8) (RB924iR-2nD-BT5&BG77&R11e-LR8) {#knot-lr8-kit-rb924ir-2nd-bt5bg77r11e-lr8}

适用于最灵活多样且经济高效的部署的 IoT 网关。有关完整规格和宣传册，请参阅 [KNOT LR8 kit 产品页面](https://mikrotik.com/product/knot_lr8)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本产品设计为安装在 35 mm DIN 导轨上或壁挂安装。开始安装前请仔细阅读安装说明。使用不正确的硬件或不遵循正确的操作流程，可能会对人员造成危险并损坏系统。
- 本产品仅适合室内安装。请使本产品远离水、火、潮湿或高温环境。
- 只能使用制造商认可的电源和配件，这些可在本产品的原包装中找到。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是将电源插头从电源插座中拔出。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择（DFS）要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境所规定的辐射暴露限值。本 MikroTik 设备的安装和操作应与您的身体、职业使用者或普通公众保持不少于 20 厘米的距离。

## 快速开始 {#quickstart}

- 确保您的互联网服务提供商允许更换硬件，并会自动分配 IP 地址；
- 将 ISP 线缆连接到第一个以太网端口；
- 将设备连接到电源；
- 打开计算机上的网络连接部分，找到名为 "MikroTik-…" 的无线网络。连接到它（请查看贴纸上的无线密码）；
- 使用移动应用程序建立连接。或者，在网页浏览器中使用 WebFig，或使用 WinBox 配置工具：[https://mt.lv/winbox](https://mt.lv/winbox)。**提供多种配置方法以确保可访问性；**
- 使用默认 IP 地址 192.168.88.1，用所选工具开始配置。如果该 IP 地址不可用，请使用 WinBox 并选择 Neighbors 选项卡来查找设备；
- 使用 MAC 地址进行连接。用户名为 "admin"，没有密码（或者，对于某些型号，请查看贴纸上的用户密码和无线密码）；
- 单击 Check for updates 按钮，将 RouterOS 更新到最新版本。
- 如需手动更新，请访问 mikrotik.com，选择您的型号，并从 Downloads 部分下载所需的软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 Files 菜单，然后重启设备；
- 通过将 RouterOS 升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 Quick Set → WISP AP 菜单中，选择您所在的国家/地区以应用相应的法规设置；
- 设置您的无线网络密码；
- 设置您的路由器密码。

*包装中不包含 U.FL 转 SMA 馈线和外置蓝牙天线。*

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>**产品代码**</td><td>RB924iR-2nD-BT5&BG77&R11e-LR8</td></tr><tr><td>**架构**</td><td>MIPSBE</td></tr><tr><td>**CPU**</td><td>QCA9531，1 核，650 MHz</td></tr><tr><td>**RAM**</td><td>64 MB</td></tr><tr><td>**存储**</td><td>128 MB NAND</td></tr><tr><td>**RouterOS 许可证**</td><td>4</td></tr><tr><td>**操作系统**</td><td>RouterOS v7</td></tr><tr><td>**以太网**</td><td>2 × 10/100 (Auto MDI/X)</td></tr><tr><td>**PoE 输入**</td><td>802.3af/at, 12–57 V DC</td></tr><tr><td>**PoE 输出**</td><td>Ether2，无源 PoE 最高 57 V</td></tr><tr><td>**最大功耗**</td><td>20 W</td></tr><tr><td>**无线 2.4 GHz**</td><td>802.11b/g/n, 2×2, 1.5 dBi</td></tr><tr><td>**蓝牙**</td><td>5.2</td></tr><tr><td>**USB**</td><td>1 × microUSB (type AB)</td></tr><tr><td>**SIM**</td><td>1 × nano-SIM</td></tr><tr><td>**串行**</td><td>RS485</td></tr><tr><td>**LoRa 卡**</td><td>R11e-LR8, 863–870 MHz (EU), 14 dBm, Class A/C</td></tr><tr><td>**尺寸**</td><td>122 × 87 × 26 mm</td></tr><tr><td>**工作温度**</td><td>−40 °C … +70 °C</td></tr><tr><td>**IP 防护等级**</td><td>IP20</td></tr><tr><td>**MTBF**</td><td>≈ 100 000 h @ 25 °C</td></tr><tr><td>**认证**</td><td>CE, FCC, IC, EAC, RoHS</td></tr></tbody></table>

## 安装 {#mounting}

![](/img/60a25f0b55a2a55d.webp)

- 可使用随附的 DIN 导轨安装套件安装本设备。设计适配标准 35 mm x 7.5 mm DIN 导轨。使用随附的两颗螺丝将其固定到设备上，然后将设备安装到 DIN 导轨上。包装中不包含 DIN 导轨。
- 或者，可使用设备背面的螺孔将设备安装到墙上。设备的安装方式应使线缆开口朝下，如图所示。**警告：** 本设备的安装和操作应与身体保持至少 20 厘米的距离。在住宅环境中操作本设备可能会造成无线电干扰。本设备的安装和配置应由合格人员完成。

## 供电 {#powering}

- 直接输入电源插孔（外径 5.5 mm、内径 2.1 mm，母头，中心正极插头）可接受 12-57 V DC。
- microUSB 端口接受 5 V 供电。
- 以太网端口接受 802.3af/at 以太网供电 12-57 V DC。
- 在带附件的情况下，最大负载下的功耗可达 20 W。
- 连接到 PoE 适配器：

- 将设备上的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将以太网线缆从您的本地网络（LAN）连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/46b18e887e695663.webp)

- 2.4 GHz，802.11b/g/n，天线增益 1.5 dBi。
- 内置 GPS 模块（GPS、GLONASS、BeiDou、Galileo），适用于 KNOT、KNOT LR8 和 KNOT LR9。KNOT LR8G/9G 的 LR 卡内部带有 GPS 模块（不支持 GLONASS、BeiDou、Galileo）。
- 两个 10/100 以太网端口，支持自动交叉/直通线缆纠正（Auto MDI/X）。连接其他网络设备时可以使用直通或交叉线缆。以太网端口可通过 802.3af/at PoE 注入器接受 12-57 V DC 电源。
- 一个 microUSB 2.0 端口用于供电（对于 KNOT LR8/LR8G 和 KNOT LR9/LR9G 套件，该端口也可用于外设）。
- 一个 nano SIM 插槽。
- 蓝牙版本 5.2，天线增益 2 dBi。

**KNOT LR8 kit：**

- LR8 卡。

## Modbus {#modbus}

KNOT 的 Modbus 配置指南。

## Bluetooth 天线 {#bluetooth-antenna}

默认情况下，KNOT 具有可使用的内置天线，但也可以改为连接外置天线以增加蓝牙工作范围。这适用于 KNOT RB924i-2nD-BT5&BG77 设备。

对于 KNOT LR8 kit、KNOT LR8G kit、KNOT LR9 kit 和 KNOT LR9G kit，蓝牙外置天线馈线预留位**不可用**（此处已有一个由 LoRa 使用的 SMA 插槽）。

要使用外置天线，您需要一个 U.FL (female) 转 SMA 连接器（pigtail）以及一个 Bluetooth 天线（可连接到 SMA）。

![](/img/fdb0c8a7e4b9a21f.webp)

- 拧下 CAT-M/NB 和 GNSS 两个 SMA 插槽之间的螺丝，并取下外壳。
- 将 U.FL（母头）馈线连接到板上的 BT 插槽（如上图所示）。
- 按图示在外壳的特定位置（外壳内侧的圆形轮廓）钻孔，并将 SMA 固定到外壳上（钻孔处）。
- 将蓝牙天线连接到 SMA 插槽。您需要在 RouterOS 设置中更改要使用的天线（新连接的"外置"或内置的"内置"）（位于 IoT→ Bluetooth→Devices→双击蓝牙接口→ 在 Antenna 字段中）：

![](/img/0b9b0fd9fbf0ff90.webp)

包装中不包含 U.FL 转 SMA 馈线和外置蓝牙天线。

## GPS 与 NB/CAT-M {#gps-and-nbcat-m}

将您的天线连接到 SMA 连接器：

![](/img/fa4fa700c587500b.webp)

BG77 支持 NB 和 GNSS。对于 KNOT、KNOT LR8 和 KNOT LR9 kit，两者（NB+GNSS）不能同时使用。

下面在**蜂窝与 GNSS 优先级切换自动化**一节中给出了自动切换蜂窝和 GNSS 优先级配置的示例。另请查看 [WWAN 和 GNSS 优先级自动化](/docs/mobile-networking/bg77-modem-at-commands/wwan-and-gnss-priority-automatization) 指南。

必须连接外部天线才能使用窄带调制解调器和 GPS。包装中不提供。

名为 "modem" 的端口用于蜂窝连接（串行/PPP 连接）和 GNSS NMEA 数据：

```
/port print
Flags: I - INACTIVE
Columns: DEVICE, NAME, CHANNELS, USED-BY, BAUD-RATE
#   DEVICE  NAME    CHANNELS  USED-BY  BAUD-RATE
0           modbus         1                9600
1   1-1.4   modem          5              115200

```

默认调制解调器端口通道分配：

1 - GNSS NMEA 输出端口；

2 - AT/modem 端口；

4 - AUX AT/modem 端口 - 最大带宽 115200bps，仅适用于 KNOT LoRa 套件和带内部 USB 集线器的 KNOT。

### 蜂窝调制解调器配置 {#cellular-modem-configuration}

与 LTE 设备不同，KNOT BG77 默认不提供直接的 IP 调制解调器接口（LTE 接口），而是提供用于串行/PPP 连接的 AT/modem 串行端口。

BG77 调制解调器 AT 命令可在 [BG77 AT 命令手册](https://mikrotik.com/product/knot#tab0) 中找到。

KNOT 默认具有 serial/PPP 连接预设：

```
/interface ppp-client print
Flags: X - disabled; R - running
 0 R  name="ppp-out1" max-mtu=1500 max-mru=1500 mrru=disabled port=modem data-channel=2 info-channel=4 apn="internet"
      pin="" user="" password="" profile=default phone="" dial-command="ATDT" modem-init="AT+QGPSCFG="priority",1"
      null-modem=no dial-on-demand=yes add-default-route=yes default-route-distance=1 use-peer-dns=yes keepalive-timeout=30
      allow=pap,chap,mschap1,mschap2

```

有关调制解调器端口配置的更多详细信息，请参阅上面的 KNOT 端口配置/映射。

有关 serial/PPP 连接的更多详细信息，请查看 [PPP Client](/docs/mobile-networking/ppp) 文档。

### GNSS 配置 {#gnss-configuration}

您可以查看 GNSS 配置指南以获取更多信息。

BG77 调制解调器为 IoT 蜂窝连接和 GNSS 信号接收共用同一个接收器。可以通过 **modem-init** 字符串（在 /interface ppp-client 下配置）和 GNSS 服务的 **init-string**（在 /system gps 下配置）来设置优先使用的服务。

AT 命令为：

AT+QGPSCFG="priority",0 → 优先使用 GNSS；AT+QGPSCFG="priority",1 → 优先使用蜂窝 IoT 连接；

AT+QGPSEND → 停止 GNSS 接收；AT+QGPS=1 → 启动 GNSS 接收。

此外，还可以借助 AT 命令配置支持的 GNSS 星座：

AT+QGPSCFG="gnssconfig"[,&lt;GNSS_config&gt;]

，该命令仅在模块重启后生效，其中 &lt;GNSS_config&gt; 代表星座本身（可为 "1" 到 "5"）：

- 1 → GPS + GLONASS
- 2 → GPS + BeiDou
- 3 → GPS + Galileo
- 4 → GPS + QZSS
- 5 → 可变 - 根据所驻留网络的 MCC 从选项（1–4）中选择一个

### 蜂窝调制解调器固件升级 {#cellular-modem-firmware-upgrade}

请注意：

- 可以使用任何互联网连接（包括 Wi-Fi 和以太网上行链路）进行 DFOTA 固件检查/升级。因此，即使 BG77 没有蜂窝连接（例如仅用作 GPS 接收器），也可以升级其调制解调器固件。
- 当 BG77 调制解调器的串行/PPP 接口使用主 AT/modem 通道（data-channel=2）时，支持固件升级。要查看当前安装的 BG77 固件版本，请使用以下命令指定 "upgrade=no" 参数：

```
/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=no
  installed: BG77LAR02A04_01.001.01.001
     latest: BG77LAR02A04_01.009.01.009

```

要更新 BG77 调制解调器固件，请设置参数 "upgrade=yes"：

```
/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=yes

```

### 蜂窝与 GNSS 优先级切换自动化 {#cellular-and-gnss-priority-switch-automation}

可以使用 ppp 配置文件的 **on-down** 脚本、**idle-timeout** 功能以及 PPP 接口的 **dial on demand** 设置来实现自动化。

实施后，当存在互联网流量时，BG77 调制解调器将使用蜂窝数据（在此期间不会收到 GNSS 坐标），而当未检测到互联网流量时，将自动启用 GPS 接收。

**Idle-timeout** 参数指定在没有活动的情况下，链路将在多长时间后终止。

**On-down** 脚本字段允许你配置一个脚本，该脚本将在每次 PPP 接口关闭时运行（包括在 **idle-timeout** 不活动之后）。该脚本会将调制解调器的优先级设置为 GNSS 接收。

**Dial-on-demand** 将确保 PPP 接口仅在存在出站流量时尝试建立连接（此外，调制解调器将自动设置 WWAN/蜂窝连接优先级）。这将确保在发生 **idle-timeout** 后，除非检测到出站数据包，否则连接不会自动重新建立。

通过组合这三个功能，你可以实现以下场景：

- 如果有出站流量，PPP 接口将处于运行状态（由于 **dial on demand**），并且优先级将设置为蜂窝连接。此时会发送 PPP 接口用于 WWAN 优先级的调制解调器初始化 AT 命令（该命令配置在 PPP 接口的 modem-init="AT+QGPSCFG=\"priority\",1" 设置中）。在此期间，不会接收 GPS 坐标。
- 如果在 **idle-timeout** 无活动窗口之后检测不到流量，PPP 接口将断开，并且由于 **dial on demand** 设置，在检测到出站数据包之前不会建立连接。此时会运行 **on-down** 脚本，将 WWAN 优先级切换为 GNSS 优先级。要实现这一点，只需添加一个新的 PPP 配置文件：

```
/ppp profile add idle-timeout=30s name=BG77 on-down="/interface ppp-client at-chat [find where modem-init=\"AT+QGPSCFG=\\\"priority\\\",1\"] input=\"AT+QGPSCFG=\\\"priority\\\",0\""

```

上面的示例创建了一个名为 "BG77" 的新配置文件，将 **idle-timeout** 设置为 30 秒，并启用 **on-down** 脚本，该脚本将发送 GNSS 优先级 AT 命令。

之后，请确保将此新创建的配置文件应用到 PPP 接口：

```
/interface ppp-client set [find] profile=BG77

```

并确认它已应用（profile=BG77）：

```
/interface ppp-client print
Flags: X - disabled; R - running
0 R name="ppp-out1" max-mtu=1500 max-mru=1500 mrru=disabled port=modem data-channel=2 info-channel=2
apn="internet" pin="" user="" password="" profile=BG77 phone="" dial-command="ATDT"
modem-init="AT+QGPSCFG="priority",1" null-modem=no dial-on-demand=yes add-default-route=yes
default-route-distance=1 use-peer-dns=yes keepalive-timeout=30 allow=pap,chap,mschap1,mschap2

```

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮具有三种功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮即可重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用程序重新安装 RouterOS，请将设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议在其中一个不起作用时验证两个选项。

- **Regular Booter:** 要进入 etherboot 模式，请在给设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter:** 关闭设备。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，可通过 Netinstall 重新安装 RouterOS。视型号而定，这可能由 **USR, USER, System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪种选项，如果在设备通电之前按下按钮，系统将加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## GPIO 引脚排列 {#gpio-pinout}

GPIO 引脚位于外壳下方的电路板上，如图所示：

![](/img/aa56f6a091950f7a.webp)

ADC 输入/模拟输入（pin2 或 pin3）：

![](/img/0201b8beb9b054ef.webp)

**注意：** *模拟输入电压为 0-60 V。理论分辨率为 4 mV（14 位 ADC）。模拟输入阻抗约为 72K 欧姆。*

已连接的继电器（pin4 或 pin6）：

![](/img/4b8f177a2150596d.webp)

*注意：最大功耗（对于数字输出开漏晶体管）为 0.48 W。建议在持续运行期间不要超过 24V 或 0.5A。绝对最大漏源电压为 30V，最大电流为 2.8A。*

![](/img/4c01507e5fd17337.webp)

*GPIO 输出为开漏配置。**逻辑状态 "0"**（晶体管开路状态）使输出晶体管处于低阻状态，输出约为 0V。**逻辑状态 "1"**（晶体管闭合状态）使输出晶体管处于高阻状态，输出电压取决于外部电路。*

防拆开关（pin5）：

![](/img/597abb74d2c7dc9c.webp)

**注意：** *数字输入电压最大为 0-2.5 V。*

*无 PCB 上拉电阻：*

-

*要在引脚上获得逻辑 "0"，电压应在 0-1.47 V 之间；*

-

*要在引脚上收到逻辑 "1"，电压应在 1.48-2.5 V 之间。* *使用 PCB 上拉电阻时：*

-

*要在引脚上收到逻辑 "0"，电压应在 0-1.34 V 之间；*

-

*要在引脚上收到逻辑 "1"，电压应在 1.35-2.5 V 之间。* *较新的 routerboard 将在 PCB（板上）上带有 10k ohm 上拉电阻。较旧的板（首批发布批次）可能需要外部上拉电阻。*

## 配件 {#accessories}

包装中包含以下随设备附带的配件：

- ADAPT1_ 欧盟/美国开关电源 24V，1.2A，28.8W，86.8%，VI。
- CAB1_ USB A 母头转 Micro B 线缆。
- SET1_ K-47 壁挂安装套件、两颗螺丝和膨胀螺栓。
- SET2_ K-74 DIN 导轨安装套件。
- Modbus 连接器，A+、B-。

HGO-LTE-W 天线可单独购买。

![](/img/90314e3eea2eb9bb.webp)

## 操作系统支持 {#operating-system-support}

本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

## 配置 {#configuration}

除了本文档中所述的内容之外，RouterOS 还包含许多配置选项。我们建议从这里开始，以熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help)。如果无法建立 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下会阻止来自互联网端口的所有访问）。出于恢复目的，可以从网络引导设备，请参阅 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 文档。

**注意：** 请确保事先安装了 **iot** 软件包。

如果您拥有 LR8 或 LR9 KNOT 变体，并且有兴趣使用 LoRa 协议，请点击我们的 LoRa 指南。

要查看其他 IoT 功能，请访问 IoT 页面。

## 概述 {#overview}

MQTT 和 HTTP 等协议被广泛用于在 M2M 网络内推送数据。M2M 拓扑可以使用不同的技术（例如 Wi-Fi 或蓝牙）在网络内发送数据。

KNOT 是我们 IoT 解决方案系列中的新成员。KNOT 充当 IoT 网关（使用窄带和 CAT-M 技术），并使用蓝牙扫描广播信息。借助蓝牙接口，您可以将 KNOT 用于基于蓝牙广播数据包的资产跟踪和遥测。KNOT 支持任何发送广播数据的 BLE 标签。iBeacon、Eddystone 或任何其他格式。它具有强大的过滤器，仅转发相关数据包而忽略其他数据包。网关处理收到的数据后，可以使用 ISP 连接将数据进一步发布到任何已相应配置的订阅者或服务器。

您需要做的只是配置一个脚本。该脚本可以过滤广播信息并将其推送到互联网。

本文介绍如何配置 KNOT 以使用 MQTT 或 http 协议发布数据。

必须连接外部天线才能使用窄带调制解调器和 GPS。包装中不提供。

## 报告 {#reports}

导航到 IoT &gt; Bluetooth。

您可以在 Advertising reports 选项卡中找到所有广播设备。

![](/img/4ee647301a86eb0c.webp)

在此菜单中，您可以按下 Filter 图标来设置过滤器。例如，如果知道设备的 MAC 地址，您可以设置过滤器以仅显示特定的报告。

![](/img/bf2032dfd2080349.webp)

您可以使用 + 图标添加更多过滤器选项。

您可以使用 - 图标移除筛选选项。

## MQTT Broker 配置 {#mqtt-broker-configuration}

导航到 IoT &gt; MQTT。

您可以通过 + 按钮添加新的 broker。

![](/img/1a3a89d9fc694e82.webp)

<table><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td>Name</td><td>标识。broker 的名称。</td></tr><tr><td>Address</td><td>MQTT broker 的 IP 地址或 FQDN 名称，不带 ssl:// 或 tcp:// 前缀。</td></tr><tr><td>Port</td><td>broker 的网络端口。通常为 1883 或 8883（用于 SSL）。</td></tr><tr><td>SSL</td><td>启用/禁用 Secure Socket Layer。如果服务器使用自签名证书或由不受信任的 CA 签名的证书，您必须将服务器的证书 &lt;crt&gt; 文件上传到 RouterOS。将 .cer 文件上传到 Files 菜单，并将该文件导入到 System&gt;Certificates 选项卡中的证书中。</td></tr><tr><td>Username</td><td>MQTT broker 的用户名。</td></tr><tr><td>Password</td><td>MQTT broker 的密码。</td></tr><tr><td>Client Id</td><td>用于连接的唯一 ID。broker 使用此 ID 来识别客户端。</td></tr><tr><td>Certificate</td><td>如果双向认证需要，请选择证书。</td></tr></tbody></table>

**注意：** 您不必在 MQTT broker 设置中指定服务器证书（.cer 文件）。Certificate 字段用于客户端证书。

**注意：** Name、Address 和 Port 字段配置是必需的。其他参数可以是可选的或必需的 - 取决于服务器/broker 的设置方式。

## 发布 {#publish}

创建 broker 后，单击 Publish 按钮。此框允许您选择 broker 并指定消息信息。

![](/img/d3b62757ecbe08c5.webp)

在 Broker 字段（下拉菜单）中选择已配置的 broker。

然后您可以指定 Topic（broker 用于过滤消息的字符串）、Message（消息本身）、QoS（指示消息的服务质量级别）和 Retain（是保留还是丢弃消息）参数。

**注意：** Broker 和 Topic 字段配置是必需的。Message、QoS 和 Retain 可以是可选的或必需的 - 取决于服务器/broker 的设置方式。

## MQTT 与脚本场景 {#mqtt-with-script-scenario}

可以使用脚本配置 MQTT broker。

创建一个新脚本，以模板作为参考，相应地更改参数并运行脚本。

每一行以符号 "**#**" 开头的都是说明性内容，它描述将在该行下方配置的参数。请更改引号 "" 内适用于您具体情况的参数。

脚本示例：

```
## Required packages: iot

################################ Configuration ################################
## Name of an existing MQTT broker that should be used for publishing
:local broker "Demo Device"

## MQTT topic where the message should be published
:local topic "v1/devices/me/telemetry"

## Interface whose MAC should be used as 'Locator ID'
:local locatorIface "ether1"

## POSIX regex for filtering advertisement Bluetooth addresses. E.g. "^BC:33:AC"
## would only include addresses which start with those 3 octets.
## To disable this filter, set it to ""
:local addressRegex ""

## POSIX regex for filtering Bluetooth advertisements based on their data. Same
## usage as with 'addressRegex'.
:local advertisingDataRegex ""

## Signal strength filter. E.g. -40 would only include Bluetooth advertisements
## whose signal strength is stronger than -40dBm.
## To disable this filter, set it to ""
:local rssiThreshold ""

#################################### System ###################################
:put ("[*] Gathering system info...")
:local ifaceMac [/interface get [/interface find name=$locatorIface] mac-address]
:local cpuLoad [/system resource get cpu-load]
:local freeMemory [/system resource get free-memory]
:local usedMemory ([/system resource get total-memory] - $freeMemory)
:local rosVersion [/system package get value-name=version \
    [/system package find where name ~ "^routeros"]]
:local model [/system routerboard get value-name=model]
:local serialNumber [/system routerboard get value-name=serial-number]
## Health is a bit iffy since '/system health' does not have 'find' in ROS6
:local health [/system health print as-value]
:local supplyVoltage 0
:local boardTemp 0
:foreach entry in=$health do={
    :if ($entry->"name" = "voltage") do={:set $supplyVoltage ($entry->"value")}
    :if ($entry->"name" = "board-temperature1") do={:set $boardTemp ($entry->"value")}
}

################################## Bluetooth ##################################
:put ("[*] Gathering Bluetooth info...")
:global btOldestAdvertisementTimestamp
:if ([:typeof $btOldestAdvertisementTimestamp] = "nothing") do={
    # First time this script has been run since booting, need to initialize
    # persistent variables
    :set $btOldestAdvertisementTimestamp 0
}
:local btProcessingStart [/system clock get time]
:local advertisements [/iot bluetooth scanners advertisements print detail \
    as-value where \
        epoch > $btOldestAdvertisementTimestamp and \
        address ~ $addressRegex and \
        data ~ $advertisingDataRegex and \
        rssi > $rssiThreshold]
:local advJson ""
:local advCount 0
:local advSeparator ""
:local lastAdvTimestamp 0
## Remove semicolons from MAC/Bluetooth addresses
:local minimizeMac do={
    :local minimized
    :local lastIdx ([:len $address] - 1)
    :for idx from=0 to=$lastIdx step=1 do={
        :local char [:pick $address $idx]
        :if ($char != ":") do={
            :set $minimized "$minimized$char"
        }
    }
    :return $minimized
}

:foreach adv in=$advertisements do={
    :local address ($adv->"address")
    :local ts ($adv->"epoch")
    :local rssi ($adv->"rssi")
    :local ad ($adv->"data")
    :local obj "\
        {\
            \"id\":\"$[$minimizeMac address=$address]\",\
            \"ts\":$ts,\
            \"rssi\":$rssi,\
            \"ed\":{\
                \"ad\":\"$ad\"\
            }\
        }"
    :set $advCount ($advCount + 1)
    :set $lastAdvTimestamp $ts
    # Ensure that the last object is not terminated by a comma
    :set $advJson "$advJson$advSeparator$obj"
    :if ($advSeparator = "") do={
        :set $advSeparator ","
    }
}

:if ($advCount > 0) do={

    :set $btOldestAdvertisementTimestamp $lastAdvTimestamp

}

:put ("[*] Found $advCount new advertisements \
    (processing time: $[([/system clock get time] - $btProcessingStart)])")

#################################### MQTT #####################################
:local message \
    "{\
        \"clientId\":\"$[/iot mqtt brokers get value-name=client-id \
            [/iot mqtt brokers find name=$broker]]\",\
        \"t\":0,\
        \"v\":1,\
        \"OldestAdvertisementTimestamp\":$btOldestAdvertisementTimestamp,\
        \"locs\":[{\
            \"id\":\"$[$minimizeMac address=$ifaceMac]\",\
            \"tags\":[$advJson],\
            \"ed\":{\
                \"model\":\"$model\",\
                \"sn\":\"$serialNumber\",\
                \"ros\":\"$rosVersion\",\
                \"cpu\":$cpuLoad,\
                \"umem\":$usedMemory,\
                \"fmem\":$freeMemory,\
                \"psu\":$supplyVoltage,\
                \"temp\":$boardTemp\
            }\
        }]\
    }"
:log info "$message";
:put ("[*] Total message size: $[:len $message] bytes")
:put ("[*] Sending message to MQTT broker...")
/iot mqtt publish broker=$broker topic=$topic message=$message
:put ("[*] Done")

```

要运行此脚本，Broker 应预先配置：

![](/img/ce0edf2496617c43.webp)

例如，thingsboard 只需要上面截图中显示的设置。成功配置 broker 后，脚本中唯一需要更改的是：

```
:local broker "Demo Device"

```

行，你应在引号 "" 内指定 broker 的名称。

另一个需要考虑的行是：

```
:local topic "v1/devices/me/telemetry"

```

，您应在其中指定 topic。

脚本配置的其余部分取决于整体需求。脚本中说明了配置了哪些确切参数用于发布。

导航到 System &gt; Scripts，并在那里添加新脚本（为其命名，例如 script1）。

要运行脚本，您可以使用命令行：

/system script run script1

## HTTP fetch 与脚本场景 {#http-fetch-with-script-scenario}

发布数据的另一种方式是使用 HTTP（而不是 MQTT）。这可以使用 fetch 工具实现。

同样的原则适用：

创建一个新脚本，以模板作为参考，相应地更改参数并运行脚本。

每一行以符号 "**#**" 开头的都是说明性内容，它描述将在该行下方配置的参数。请更改引号 "" 内适用于您具体情况的参数。

脚本示例：

```
## Required packages: iot

################################ Configuration ################################
## Interface whose MAC should be used as 'Locator ID'
:local locatorIface "ether1"

## POSIX regex for filtering advertisement Bluetooth addresses. E.g. "^BC:33:AC"
## would only include addresses which start with those 3 octets.
## To disable this filter, set it to ""
:local addressRegex ""

## POSIX regex for filtering Bluetooth advertisements based on their data. Same
## usage as with 'addressRegex'.
:local advertisingDataRegex ""

## Signal strength filter. E.g. -40 would only include Bluetooth advertisements
## whose signal strength is stronger than -40dBm.
## To disable this filter, set it to ""
:local rssiThreshold ""

#################################### System ###################################
:put ("[*] Gathering system info...")
:local ifaceMac [/interface get [/interface find name=$locatorIface] mac-address]
:local cpuLoad [/system resource get cpu-load]
:local freeMemory [/system resource get free-memory]
:local usedMemory ([/system resource get total-memory] - $freeMemory)
:local rosVersion [/system package get value-name=version \
    [/system package find where name ~ "^routeros"]]
:local model [/system routerboard get value-name=model]
:local serialNumber [/system routerboard get value-name=serial-number]
## Health is a bit iffy since '/system health' does not have 'find' in ROS6
:local health [/system health print as-value]
:local supplyVoltage 0
:local boardTemp 0
:foreach entry in=$health do={
    :if ($entry->"name" = "voltage") do={:set $supplyVoltage ($entry->"value")}
    :if ($entry->"name" = "board-temperature1") do={:set $boardTemp ($entry->"value")}
}

################################## Bluetooth ##################################
:put ("[*] Gathering Bluetooth info...")
:global btOldestAdvertisementTimestamp
:if ([:typeof $btOldestAdvertisementTimestamp] = "nothing") do={
    # First time this script has been run since booting, need to initialize
    # persistent variables
    :set $btOldestAdvertisementTimestamp 0
}
:local btProcessingStart [/system clock get time]
:local advertisements [/iot bluetooth scanners advertisements print detail \
    as-value where \
        epoch > $btOldestAdvertisementTimestamp and \
        address ~ $addressRegex and \
        data ~ $advertisingDataRegex and \
        rssi > $rssiThreshold]
:local advJson ""
:local advCount 0
:local advSeparator ""
:local lastAdvTimestamp 0
## Remove semicolons from MAC/Bluetooth addresses
:local minimizeMac do={
    :local minimized
    :local lastIdx ([:len $address] - 1)
    :for idx from=0 to=$lastIdx step=1 do={
        :local char [:pick $address $idx]
        :if ($char != ":") do={
            :set $minimized "$minimized$char"
        }
    }
    :return $minimized
}

:foreach adv in=$advertisements do={
    :local address ($adv->"address")
    :local ts ($adv->"epoch")
    :local rssi ($adv->"rssi")
    :local ad ($adv->"data")
    :local obj "\
        {\
            \"id\":\"$[$minimizeMac address=$address]\",\
            \"ts\":$ts,\
            \"rssi\":$rssi,\
            \"ed\":{\
                \"ad\":\"$ad\"\
            }\
        }"
    :set $advCount ($advCount + 1)
    :set $lastAdvTimestamp $ts
    # Ensure that the last object is not terminated by a comma
    :set $advJson "$advJson$advSeparator$obj"
    :if ($advSeparator = "") do={
        :set $advSeparator ","
    }
}

:if ($advCount > 0) do={

    :set $btOldestAdvertisementTimestamp $lastAdvTimestamp

}

:put ("[*] Found $advCount new advertisements \
    (processing time: $[([/system clock get time] - $btProcessingStart)])")

#################################### MQTT #####################################
:local message \
    "{\
        \"t\":0,\
        \"v\":1,\
        \"OldestAdvertisementTimestamp\":$btOldestAdvertisementTimestamp,\
        \"locs\":[{\
            \"id\":\"$[$minimizeMac address=$ifaceMac]\",\
            \"tags\":[$advJson],\
            \"ed\":{\
                \"model\":\"$model\",\
                \"sn\":\"$serialNumber\",\
                \"ros\":\"$rosVersion\",\
                \"cpu\":$cpuLoad,\
                \"umem\":$usedMemory,\
                \"fmem\":$freeMemory,\
                \"psu\":$supplyVoltage,\
                \"temp\":$boardTemp\
            }\
        }]\
    }"
:log info "$message";
:put ("[*] Total message size: $[:len $message] bytes")
/tool fetch http-method=post http-header-field="Content-Type:application/json" http-data=$message url="https://demo.thingsboard.io/api/v1/Q99YlBqv59NdzOel6tyP/telemetry"
:put ("[*] Done")

```

相应地更改 URL（取决于服务器配置）。

```
/tool fetch http-method=post http-header-field="Content-Type:application/json" http-data=$message url="https://demo.thingsboard.io/api/v1/Q99YlBqv59NdzOel6tyP/telemetry"

```

导航到 System &gt; Scripts，并在那里添加新脚本（为其命名，例如 script1）。

要运行脚本，您可以使用命令行：

/system script run script1

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择您偏好的操作系统。
- 安装并打开该应用程序。
- 默认情况下，IP 地址和用户名将已预先填入。
- 单击 Connect 以通过无线网络建立与设备的连接。
- 选择 Quick setup，该应用程序将通过几个简单步骤引导您完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要的设置。

为避免污染环境，请将本设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场处置。请了解将设备正确运输到您所在地区指定处置场的相关程序。

**Bluetooth 合格产品**

![](/img/cf3c8d2919f980e2.webp)

本产品已成功完成蓝牙认证流程。有关 Bluetooth 认证产品的更多信息，请使用以下链接：[https://launchstudio.bluetooth.com/Listings/Search](https://launchstudio.bluetooth.com/Listings/Search)
