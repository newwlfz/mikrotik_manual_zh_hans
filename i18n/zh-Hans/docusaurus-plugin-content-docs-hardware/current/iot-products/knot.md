---
title: "KNOT"
slug: /knot
source: https://manual.mikrotik.com/hardware/knot
captured_at: '2026-11-04T09:51:39+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可下载为 <a href="/assets/files/knot-946091ad4c47a2e8a1e7e73892c75438.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/56973336fdab43a5.webp)

### [KNOT](https://mikrotik.com/product/knot) (RB924i-2nD-BT5&BG77) {#knot-rb924i-2nd-bt5bg77}

适用于最通用且高性价比部署的 IoT 网关。有关完整规格和宣传册，请参阅 [KNOT 产品页面](https://mikrotik.com/product/knot)。

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解电气电路相关危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应按照所有国家法律和法规进行处理。
- 设备安装必须符合当地和国家电气规范。
- 本产品设计为安装在 35 mm DIN 导轨上或壁挂安装。开始安装前请仔细阅读安装说明。未使用正确的硬件或未遵循正确的操作步骤，可能导致人员危险和系统损坏。
- 本产品适合室内安装。请使本产品远离水、火、潮湿或高温环境。
- 仅使用制造商批准且可在本产品原包装中找到的电源和附件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，并自行承担操作风险！
- 如果设备发生故障，请断开其电源。最快的方法是从电源插座拔下电源插头。
- 客户有责任遵守当地国家法规，包括在合法频率信道内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线电设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和运行时，应与身体、职业使用者或公众保持不小于 20 厘米的距离。

## 快速开始 {#quickstart}

- 确保你的互联网服务提供商允许更换硬件，并会分配自动 IP 地址；
- 将你的 ISP 线缆连接到第一个 Ethernet 端口；
- 将设备连接到电源；
- 在计算机上打开网络连接部分，找到名为 "MikroTik-…" 的无线网络。连接到它（在标签上查看无线密码）；
- 使用移动应用建立连接。或者，在网页浏览器中使用 WebFig，或使用位于 [https://mt.lv/winbox](https://mt.lv/winbox) 的 WinBox 配置工具。**提供多种配置方法以确保可访问性；**
- 使用默认 IP 地址 192.168.88.1，用所选工具开始配置。如果 IP 地址不可用，请使用 WinBox 并选择 Neighbors 选项卡来查找设备；
- 使用 MAC 地址连接。用户名为 “admin”，没有密码（或者，对于某些型号，请查看标签上的用户密码和无线密码）；
- 点击 Check for updates 按钮，并将 RouterOS 更新到最新版本。
- 如需手动更新，请访问 mikrotik.com，选择你的型号，并从 Downloads 部分下载所需软件包；
- 将下载的软件包上传到 WebFig 或 WinBox 的 Files 菜单，并重启设备；
- 通过将 RouterOS 升级到最新版本，可确保获得最佳性能、稳定性和安全更新；
- 在 Quick Set → WISP AP 菜单中，选择你所在的国家/地区以应用相应的法规设置；
- 设置你的无线网络密码；
- 设置你的路由器密码。

*包装内不包含 U.FL 转 SMA 尾纤和外部 Bluetooth 天线。*

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>**产品代码**</td><td>RB924i-2nD-BT5&BG77</td></tr><tr><td>**架构**</td><td>MIPSBE</td></tr><tr><td>**CPU**</td><td>QCA9531，1 核，650 MHz</td></tr><tr><td>**RAM**</td><td>64 MB</td></tr><tr><td>**存储**</td><td>128 MB NAND</td></tr><tr><td>**RouterOS 许可证**</td><td>4</td></tr><tr><td>**操作系统**</td><td>RouterOS v7</td></tr><tr><td>**Ethernet**</td><td>2 × 10/100 (Auto MDI/X)</td></tr><tr><td>**PoE 输入**</td><td>802.3af/at, 12–57 V DC</td></tr><tr><td>**PoE 输出**</td><td>Ether2，被动 PoE，最高 57 V</td></tr><tr><td>**最大功耗**</td><td>18 W</td></tr><tr><td>**无线 2.4 GHz**</td><td>802.11b/g/n，2×2，1.5 dBi</td></tr><tr><td>**Bluetooth**</td><td>5.2</td></tr><tr><td>**USB**</td><td>1 × microUSB (type AB)</td></tr><tr><td>**SIM**</td><td>1 × nano-SIM</td></tr><tr><td>**串口**</td><td>RS485</td></tr><tr><td>**尺寸**</td><td>122 × 87 × 26 mm</td></tr><tr><td>**工作温度**</td><td>−40 °C … +70 °C</td></tr><tr><td>**IP 等级**</td><td>IP20</td></tr><tr><td>**MTBF**</td><td>≈ 100 000 h @ 25 °C</td></tr><tr><td>**认证**</td><td>CE, FCC, IC, EAC, RoHS</td></tr></tbody></table>

## 安装 {#mounting}

![](/img/60a25f0b55a2a55d.webp)

- 可使用随附的 DIN 导轨安装套件安装设备。该套件设计用于适配标准 35 mm x 7.5 mm DIN 导轨。使用随附的两颗螺丝将其固定到设备上，然后将设备安装到 DIN 导轨。包装内不包含 DIN 导轨。
- 或者，也可以使用设备背面的随附螺丝孔将设备安装到墙上。设备应以线缆开口朝下的方式安装，如图所示。**警告：** 本设备安装和运行时，应与身体保持至少 20 cm 的距离。在住宅环境中操作本设备可能导致无线电干扰。本设备的安装和配置应由合格人员完成。

## 供电 {#powering}

- 直接输入电源插孔（外径 5.5 mm、内径 2.1 mm，母头，中心针为正极）接受 12-57 V DC。
- microUSB 端口接受 5 V 供电。
- Ethernet 端口接受 802.3af/at Power over Ethernet 12-57 V DC。
- 在带附件且最大负载时，功耗可达 18 W。
- 连接到 PoE 适配器：

- 将来自设备的 Ethernet 线缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将来自本地网络 (LAN) 的 Ethernet 线缆连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/46b18e887e695663.webp)

- 2.4 GHz，802.11b/g/n，天线增益 1.5 dBi。
- 适用于 KNOT、KNOT LR8 和 KNOT LR9 的内置 GPS 模块（GPS、GLONASS、BeiDou、Galileo）。KNOT LR8G/9G 的 GPS 模块位于 LR 卡内（不支持 GLONASS、BeiDou、Galileo）。
- 两个 10/100 Ethernet 端口，支持自动交叉/直连线缆校正 (Auto MDI/X)。连接其他网络设备时可以使用直通线或交叉线。Ethernet 端口接受来自 802.3af/at PoE 注入器的 12-57 V DC 电源。
- 一个 microUSB 2.0 端口用于供电（对于 KNOT LR8/LR8G 和 KNOT LR9/LR9G 套件，该端口也可用于外设）。
- 一个 nano SIM 插槽。
- Bluetooth 版本 5.2，天线增益 2 dBi。

## Modbus {#modbus}

KNOT 的 Modbus 配置指南。

## Bluetooth 天线 {#bluetooth-antenna}

默认情况下，KNOT 带有内置内部天线可供使用，但也可以改为连接外部天线，以增大 Bluetooth 工作范围。这适用于 KNOT RB924i-2nD-BT5&BG77 设备。

对于 KNOT LR8 套件、KNOT LR8G 套件、KNOT LR9 套件和 KNOT LR9G 套件，Bluetooth 外置天线尾纤预留位 **不可用**（已有由 LoRa 使用的 SMA 插槽）。

要使用外置天线，您需要一个 U.FL (female) 转 SMA 连接器（pigtail）以及一个 Bluetooth 天线（可连接到 SMA）。

![](/img/fdb0c8a7e4b9a21f.webp)

- 拧下 CAT-M/NB 和 GNSS 两个 SMA 插槽之间的螺丝，并取下外壳。
- 将 U.FL（母头）尾纤连接到板上的 BT 插槽（如上图所示）。
- 按照图片在外壳的特定位置（外壳内侧的圆形轮廓）钻孔，并将 SMA 固定到外壳上（钻孔处）。
- 将 Bluetooth 天线连接到 SMA 插槽。你需要在 RouterOS 设置中更改要使用的天线（新连接的 "external" 或内置的 "internal"）（在 IoT→ Bluetooth→Devices→双击 Bluetooth 接口→在 Antenna 字段下）：

![](/img/0b9b0fd9fbf0ff90.webp)

包装内不包含 U.FL 转 SMA 尾纤和外部 Bluetooth 天线。

## GPS 与 NB/CAT-M {#gps-and-nbcat-m}

将你的天线连接到 SMA 连接器：

![](/img/fa4fa700c587500b.webp)

BG77 支持 NB 和 GNSS。对于 KNOT、KNOT LR8 和 KNOT LR9 套件，二者（NB+GNSS）不能同时使用。

在下面的 **蜂窝和 GNSS 优先级切换自动化** 部分给出了自动切换蜂窝和 GNSS 优先级的配置示例。另请查看 [WWAN 和 GNSS 优先级自动化](/docs/mobile-networking/bg77-modem-at-commands/wwan-and-gnss-priority-automatization) 指南。

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

BG77 调制解调器 AT 命令可在 [BG77 AT Commands Manual](https://mikrotik.com/product/knot#tab0) 中找到。

KNOT 默认具有 serial/PPP 连接预设：

```
/interface ppp-client print
Flags: X - disabled; R - running
 0 R  name="ppp-out1" max-mtu=1500 max-mru=1500 mrru=disabled port=modem data-channel=2 info-channel=4 apn="internet"
      pin="" user="" password="" profile=default phone="" dial-command="ATDT" modem-init="AT+QGPSCFG="priority",1"
      null-modem=no dial-on-demand=yes add-default-route=yes default-route-distance=1 use-peer-dns=yes keepalive-timeout=30
      allow=pap,chap,mschap1,mschap2

```

有关调制解调器端口配置的更多详细信息，请参见上文的 KNOT 端口配置/映射。

有关 serial/PPP 连接的更多详细信息，请查看 [PPP Client](/docs/mobile-networking/ppp) 文档。

### GNSS 配置 {#gnss-configuration}

你可以查看 GNSS 配置指南以获取更多信息。

BG77 调制解调器为 IoT 蜂窝连接和 GNSS 信号接收共用同一接收器。可通过 **modem-init** 字符串（在 /interface ppp-client 下配置）和 GNSS 服务的 **init-string**（在 /system gps 下配置）来优先选择所需服务。

AT 命令如下：

AT+QGPSCFG="priority",0 → 优先使用 GNSS；AT+QGPSCFG="priority",1 → 优先使用蜂窝 IoT 连接；

AT+QGPSEND → 停止 GNSS 接收；AT+QGPS=1 → 启动 GNSS 接收。

此外，你可以借助以下 AT 命令配置支持的 GNSS 星座：

AT+QGPSCFG="gnssconfig"[,&lt;GNSS_config&gt;]

，该命令仅在模块重启后生效，其中 &lt;GNSS_config&gt; 表示星座本身（可取 "1" 到 "5"）：

- 1 → GPS + GLONASS
- 2 → GPS + BeiDou
- 3 → GPS + Galileo
- 4 → GPS + QZSS
- 5 → 可变 - 根据驻留网络的 MCC 选择选项 (1–4) 之一

### 蜂窝调制解调器固件升级 {#cellular-modem-firmware-upgrade}

请注意：

- DFOTA 固件检查/升级可以使用任何互联网连接完成（包括 Wi-Fi 和 Ethernet 上行链路）。因此，对于 BG77 没有蜂窝连接的设备（例如仅将其用作 GPS 接收器时），也可以升级调制解调器固件。
- 当 BG77 调制解调器串行/PPP 接口使用主 AT/modem 通道（data-channel=2）时支持固件升级。要检查当前安装的 BG77 固件版本，请使用以下命令指定 "upgrade=no" 参数：

```
/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=no
  installed: BG77LAR02A04_01.001.01.001
     latest: BG77LAR02A04_01.009.01.009

```

要更新 BG77 调制解调器固件，请设置参数 "upgrade=yes"：

```
/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=yes

```

### 蜂窝和 GNSS 优先级切换自动化 {#cellular-and-gnss-priority-switch-automation}

可以通过 ppp 配置文件的 **on-down** 脚本、**idle-timeout** 功能和 PPP 接口的 **dial on demand** 设置来实现自动化。

实施后，当存在互联网流量时，BG77 调制解调器将使用蜂窝数据（在此期间不会收到 GNSS 坐标），而当未检测到互联网流量时，将自动启用 GPS 接收。

**Idle-timeout** 参数指定在没有活动的情况下，链路将在多长时间后终止。

**On-down** 脚本字段允许你配置一个脚本，该脚本将在每次 PPP 接口关闭时运行（包括在 **idle-timeout** 不活动之后）。该脚本会将调制解调器的优先级设置为 GNSS 接收。

**Dial-on-demand** 将确保 PPP 接口仅在存在出站流量时尝试建立连接（此外，调制解调器将自动设置 WWAN/蜂窝连接优先级）。这将确保在发生 **idle-timeout** 后，除非检测到出站数据包，否则连接不会自动重新建立。

通过组合这三个功能，你可以实现以下场景：

- 如果存在出站流量，PPP 接口将处于 up 状态（因为 **dial on demand**），并且优先级将设置为蜂窝连接。会发送 PPP 接口的调制解调器初始化 AT 命令（配置在 PPP 接口的 modem-init="AT+QGPSCFG=\"priority\",1" 设置下）以设置 WWAN 优先级。在此期间，不会接收 GPS 坐标。
- 如果在 **idle-timeout** 无活动窗口后未检测到流量，PPP 接口将断开，并且由于 **dial on demand** 设置，在检测到出站数据包之前不会建立连接。此时会运行 **on-down** 脚本，将 WWAN 优先级切换为 GNSS 优先级。为实现这一点，只需添加一个新的 PPP 配置文件：

```
/ppp profile add idle-timeout=30s name=BG77 on-down="/interface ppp-client at-chat [find where modem-init=\"AT+QGPSCFG=\\\"priority\\\",1\"] input=\"AT+QGPSCFG=\\\"priority\\\",0\""

```

上面的示例创建了一个名为 "BG77" 的新配置文件，将 **idle-timeout** 设置为 30 秒，并启用 **on-down** 脚本，该脚本将发送 GNSS 优先级 AT 命令。

之后，请确保将此新创建的配置文件应用到 PPP 接口：

```
/interface ppp-client set [find] profile=BG77

```

并确认已应用（profile=BG77）：

```
/interface ppp-client print
Flags: X - disabled; R - running
0 R name="ppp-out1" max-mtu=1500 max-mru=1500 mrru=disabled port=modem data-channel=2 info-channel=2
apn="internet" pin="" user="" password="" profile=BG77 phone="" dial-command="ATDT"
modem-init="AT+QGPSCFG="priority",1" null-modem=no dial-on-demand=yes add-default-route=yes
default-route-distance=1 use-peer-dns=yes keepalive-timeout=30 allow=pap,chap,mschap1,mschap2

```

## 按钮和跳线 {#buttons-and-jumpers}

复位按钮有三个功能：

- 在启动期间按住此按钮，直到绿色 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置。
- 继续按住复位按钮，直到 LED 变为常亮，然后松开以启用 CAP 模式。设备随后将开始搜索 CAPsMAN 服务器。
- 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 工具重新安装 RouterOS，请使设备进入 BOOTP 模式。有两个 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议验证这两个选项，以防其中一个不起作用。

- **Regular Booter:** 要进入 etherboot 模式，请在给设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter:** 关闭设备。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，可通过 Netinstall 重新安装 RouterOS。视型号而定，这可能由 **USR, USER, System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

无论使用上述哪个选项，如果在设备上电前按下按钮，系统都会加载备份 RouterBOOT loader。这对 RouterBOOT 调试和恢复很有用。

## GPIO 引脚排列 {#gpio-pinout}

GPIO 引脚位于外壳下方的板上，如图所示：

![](/img/aa56f6a091950f7a.webp)

ADC 输入/模拟输入（pin2 或 pin3）：

![](/img/0201b8beb9b054ef.webp)

**注意：** *模拟输入电压为 0-60 V。理论分辨率为 4 mV（14bit ADC）。模拟输入阻抗约为 72K 欧姆。*

已连接的继电器（pin4 或 pin6）：

![](/img/4b8f177a2150596d.webp)

*注意：最大功耗（对于数字输出开漏晶体管）为 0.48 W。建议在连续运行期间不要超过 24V 或 0.5A。漏源绝对最大电压为 30V，最大电流为 2.8A。*

![](/img/4c01507e5fd17337.webp)

*GPIO 输出采用开漏配置。**逻辑状态 "0"**（晶体管断开状态）使输出晶体管处于低阻态，输出约为 0V。**逻辑状态 "1"**（晶体管闭合状态）使输出晶体管处于高阻态，输出电压取决于外部电路。*

防拆开关（pin5）：

![](/img/597abb74d2c7dc9c.webp)

**注意：** *数字输入电压最大为 0-2.5 V。*

*无 PCB 上拉电阻时：*

-

*要在引脚上获得逻辑 "0"，电压应在 0-1.47 V 之间；*

-

*要在引脚上收到逻辑 "1"，电压应在 1.48-2.5 V 之间。* *使用 PCB 上拉电阻时：*

-

*要在引脚上收到逻辑 "0"，电压应在 0-1.34 V 之间；*

-

*要在引脚上收到逻辑 "1"，电压应在 1.35-2.5 V 之间。* *较新的 routerboard 将在 PCB（板上）上带有 10k ohm 上拉电阻。较旧的板（首批发布批次）可能需要外部上拉电阻。*

## 配件 {#accessories}

包装内包含以下随设备提供的配件：

- ADAPT1_ EU/US 开关电源 24V、1.2A、28.8W、86.8%、VI。
- CAB1_ USB A 母头转 Micro B 线缆。
- SET1_ K-47 壁挂安装套件、两颗螺丝和胀塞。
- SET2_ K-74 DIN 导轨安装套件。
- Modbus 连接器，A+、B-。

HGO-LTE-W 天线可单独购买。

![](/img/90314e3eea2eb9bb.webp)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及更高版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未测试。

## 配置 {#configuration}

RouterOS 除本文档所述内容外还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help)。如果无法使用 IP 连接，可以使用 WinBox 工具（[https://mt.lv/winbox](https://mt.lv/winbox)）从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自互联网端口的所有访问都会被阻止）。为恢复目的，可以从网络引导设备，请参见 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 文档。

**注意：** 请确保事先已安装 **iot** 软件包。

如果您拥有 LR8 或 LR9 KNOT 变体，并且有兴趣使用 LoRa 协议，请点击我们的 LoRa 指南。

要查看其他 IoT 功能，请访问 IoT 页面。

## 概述 {#overview}

MQTT 和 HTTP 等协议广泛用于在 M2M 网络内推送数据。M2M 拓扑可以使用不同技术（例如 Wi-Fi 或 Bluetooth）在网络内发送数据。

KNOT 是我们 IoT 解决方案之一的新成员。KNOT 充当 IoT 网关（使用窄带和 CAT-M 技术），并使用 Bluetooth 扫描广播信息。借助 Bluetooth 接口，你可以将 KNOT 用于基于 Bluetooth 广告数据包的资产跟踪和遥测。KNOT 支持任何发送广告数据的 BLE 标签。iBeacon、Eddystone 或任何其他格式。它具有强大的过滤器，仅转发相关数据包并忽略其他数据包。网关处理接收到的数据后，可以使用 ISP 连接将数据进一步发布到任何相应配置的订阅者或服务器。

你只需配置一个脚本。该脚本可以筛选广播信息并将其推送到互联网。

本文介绍如何配置 KNOT 以使用 MQTT 或 http 协议发布数据。

必须连接外部天线才能使用窄带调制解调器和 GPS。包装中不提供。

## 报告 {#reports}

导航到 IoT &gt; Bluetooth。

您可以在 Advertising reports 选项卡中找到所有广播设备。

![](/img/4ee647301a86eb0c.webp)

在此菜单中，你可以通过按 Filter 图标来设置过滤器。例如，已知设备的 MAC 地址时，可以设置过滤器以仅显示特定报告。

![](/img/bf2032dfd2080349.webp)

你可以使用 + 图标添加更多筛选选项。

您可以使用 - 图标移除筛选选项。

## MQTT Broker 配置 {#mqtt-broker-configuration}

导航到 IoT &gt; MQTT。

您可以通过 + 按钮添加新的 broker。

![](/img/1a3a89d9fc694e82.webp)

<table><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td>Name</td><td>标识。Broker 名称。</td></tr><tr><td>Address</td><td>MQTT broker 的 IP 地址或 FQDN 名称，不带 ssl:// 或 tcp:// 前缀。</td></tr><tr><td>Port</td><td>Broker 的网络端口。通常为 1883 或 8883（用于 SSL）。</td></tr><tr><td>SSL</td><td>启用/禁用 Secure Socket Layer。如果服务器使用自签名证书或由非受信任 CA 签名的证书，你必须将服务器的证书 &lt;crt&gt; 文件上传到 RouterOS。将 .cer 文件上传到 Files 菜单，并将文件导入到 System&gt;Certificates 选项卡中的证书。</td></tr><tr><td>Username</td><td>MQTT broker 的用户名。</td></tr><tr><td>Password</td><td>MQTT broker 的密码。</td></tr><tr><td>Client Id</td><td>用于连接的唯一 ID。Broker 使用此 ID 识别客户端。</td></tr><tr><td>Certificate</td><td>如果双向认证需要，请选择证书。</td></tr></tbody></table>

**注意：** 你不必在 MQTT broker 设置中指定服务器证书（.cer 文件）。Certificate 字段用于客户端证书。

**注意：** Name、Address 和 Port 字段配置是必需的。其他参数可以是可选的或必需的 - 取决于服务器/broker 的设置方式。

## 发布 {#publish}

创建 broker 后，点击 Publish 按钮。此框允许你选择 broker 并指定消息信息。

![](/img/d3b62757ecbe08c5.webp)

在 Broker 字段（下拉菜单）中选择已配置的 broker。

然后你可以指定 Topic（broker 用于筛选消息的字符串）、Message（消息本身）、QoS（指示消息的服务质量级别）和 Retain（是保留还是丢弃消息）参数。

**注意：** Broker 和 Topic 字段配置是必需的。Message、QoS 和 Retain 可以是可选的或必需的 - 取决于服务器/broker 的设置方式。

## MQTT 与脚本场景 {#mqtt-with-script-scenario}

MQTT broker 可以通过脚本进行配置。

创建一个新脚本，以模板为参考，相应更改参数并运行脚本。

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

要运行此脚本，应预先配置 Broker：

![](/img/ce0edf2496617c43.webp)

例如，thingsboard 只需要上方截图中显示的设置。成功配置 broker 后，脚本中唯一需要更改的是：

```
:local broker "Demo Device"

```

行，你应在引号 "" 内指定 broker 的名称。

另一个需要考虑的行是：

```
:local topic "v1/devices/me/telemetry"

```

，你应在其中指定 topic。

脚本配置的其余部分取决于整体需求。脚本中说明了配置了哪些确切参数用于发布。

导航到 System &gt; Scripts，并在那里添加新脚本（为其命名，例如 script1）。

要运行脚本，您可以使用命令行：

/system script run script1

## HTTP fetch 与脚本场景 {#http-fetch-with-script-scenario}

发布数据的另一种方式是使用 HTTP（而不是 MQTT）。这可以通过 fetch 工具实现。

同样的原则适用：

创建一个新脚本，以模板为参考，相应更改参数并运行脚本。

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

相应更改 URL（取决于服务器配置）。

```
/tool fetch http-method=post http-header-field="Content-Type:application/json" http-data=$message url="https://demo.thingsboard.io/api/v1/Q99YlBqv59NdzOel6tyP/telemetry"

```

导航到 System &gt; Scripts，并在那里添加新脚本（为其命名，例如 script1）。

要运行脚本，您可以使用命令行：

/system script run script1

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 扫描二维码并选择你偏好的操作系统。
- 安装并打开应用。
- 默认情况下，IP 地址和用户名将已填入。
- 点击 Connect 通过无线网络建立到设备的连接。
- 选择 Quick setup，应用将通过几个简单步骤引导你完成所有基本配置设置。
- 提供高级菜单，可完整配置所有必要设置。

为避免污染环境，请将设备与生活垃圾分开，并以安全方式处置，例如放入指定的废物处置场所。请了解将设备正确运输到你所在地区指定处置场所的程序。

**Bluetooth 合格产品**

![](/img/cf3c8d2919f980e2.webp)

本产品已成功完成 Bluetooth 认证流程。有关 Bluetooth 认证产品的更多信息，请使用以下链接：[https://launchstudio.bluetooth.com/Listings/Search](https://launchstudio.bluetooth.com/Listings/Search)
