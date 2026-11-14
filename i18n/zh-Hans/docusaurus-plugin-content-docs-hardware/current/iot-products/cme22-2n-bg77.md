---
title: "CME22-2n-BG77"
slug: /cme22-2n-bg77
source: https://manual.mikrotik.com/hardware/cme22-2n-bg77
captured_at: '2026-11-04T09:45:45+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本指南可以下载为 <a href="/assets/files/cme22-2n-bg77-d526c6030e99db740f8481f8d47777e7.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/67393146bd5122a7.jpg)

一款坚固耐用、低成本、低带宽的调制解调器，可将以太网设备连接到 CAT-M 移动网络……以史上最紧张的预算！完整规格和宣传册请参见 [CME Gateway 产品页面](https://mikrotik.com/product/cme_gateway)。

### [CME Gateway](https://mikrotik.com/product/cme_gateway) (CME22-2n-BG77) {#cme-gateway-cme22-2n-bg77}

## 安全警告 {#safety-warnings}

- 在对任何设备进行操作之前，请了解与电路相关的危险，并熟悉防止事故的标准做法。
- 本产品的最终处置应遵守所有国家法律和法规。
- 设备的安装必须符合当地和国家的电气规范。
- 本设备适合安装在机架中。开始安装前请仔细阅读安装说明。使用错误的硬件或不遵循正确的操作流程，可能会给人员带来危险并损坏系统。
- 本产品适合室内安装。请让本产品远离水、火、潮湿或高温环境。
- 请仅使用制造商认可并在本产品原包装中提供的电源和附件。
- 在将系统连接到电源之前，请阅读安装说明。
- 我们无法保证因不当使用设备而不会发生事故或损坏。请谨慎使用本产品，风险自负！
- 如果设备出现故障，请断开其电源。最快的方法是拔下电源插座上的电源插头。
- 客户有责任遵守当地国家的法规，包括在合法频段内运行、输出功率、布线要求以及动态频率选择 (DFS) 要求。所有 MikroTik 无线设备必须由专业人员安装。

**射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。本 MikroTik 设备安装和运行时，与您的身体、职业使用者或公众的距离不得小于 20 厘米。

## 连接 {#connecting}

- 确保您的互联网服务提供商允许硬件更换，并将自动分配 IP 地址。
- 将 ISP 线缆连接到第一个以太网端口；如果需要蜂窝 CAT-M 连接，请打开底部区域，将 SIM 卡安装到相应的 SIM 插槽中；
- 将设备连接到电源；
- 在计算机上打开网络连接，搜索 MikroTik 无线网络并连接，或者将您的 PC 连接到第二个以太网端口；
- 可以通过无线网络使用网页浏览器或移动应用完成配置，也可以通过以太网连接使用网页浏览器完成配置。或者，您可以使用 WinBox 配置工具 [https://mt.lv/winbox](https://mt.lv/winbox)。在网页浏览器中打开 192.168.88.1 开始配置，用户名为 admin，默认没有密码（或者，对于某些型号，请查看贴纸上的用户名和无线密码）；
- 单击 Check for updates 按钮，将 RouterOS 软件更新到最新版本，这需要有可用的互联网连接；
- 在 Quick Set 中选择您所在的国家，并应用国家法规和无线设置；
- 设置您的无线网络密码；
- 设置您的路由器密码。

## 安装与底盖 {#mounting-and-bottom-lid}

- 设备背面有 2 个孔，可将金属环穿入其中。
- 拧松金属环，将金属环的一端穿入孔中，把金属环绕在杆或桅杆上，然后拧紧金属环——参见 1。

![](/img/718b6077ac5c5a05.webp)

- 拧下底盖下方的两颗螺丝。螺丝松开后，轻轻向下拉底盖，即可打开以太网端口、SIM 插槽和复位按钮的检修口——参见 2。

## 供电 {#powering}

- 以太网端口支持 802.3af/at 以太网供电 18-57 V DC。
- 2 针端子输入电压 12-57 V DC。带附件的最大负载下功耗可达 31 W。不带附件时的最大功耗为 6W。

### 连接到 PoE 适配器 {#connecting-to-a-poe-adapter}

- 将设备上的以太网线缆连接到 PoE 适配器的 PoE+DATA 端口。
- 将以太网线缆从您的本地网络 (LAN) 连接到 PoE 适配器。
- 将电源线连接到适配器，然后将电源线插入电源插座。

## 接地 {#grounding}

接地线应连接到 RouterBOARD 的接地线连接点。然后该线应连接到安装位置的基座，确保连接符合接地标准。

## 配置 {#configuration}

登录后，我们建议单击 QuickSet 菜单中的 "Check for updates" 按钮，因为将 RouterOS 软件更新到最新版本可确保最佳性能和稳定性。对于无线型号，请确保已选择设备使用所在的国家，以符合当地法规。除本文档所述内容外，RouterOS 还包含许多配置选项。我们建议从这里开始熟悉各种可能性：[https://mt.lv/help](https://mt.lv/help) 如果无法使用 IP 连接，可以使用 WinBox 工具 ([https://mt.lv/winbox](https://mt.lv/winbox)) 从 LAN 侧连接到设备的 MAC 地址（默认情况下，来自 Internet 端口的所有访问都被阻止）。为了恢复目的，可以引导设备进行重新安装，请参见 Buttons and jumpers 章节。

## 扩展插槽和端口 {#extension-slots-and-ports}

- 2.4 GHz，802.11b/g/n，天线增益 2 dBi。
- 内置 GPS 模块（GPS、GLONASS、BeiDou、Galileo）。
- 两个 10/100 以太网端口，支持自动交叉/直通线缆纠正 (Auto MDI/X)。直通或交叉线缆均可用于连接其他网络设备。以太网端口可从 802.3af/at PoE 注入器接受 18-57 V DC 电源。
- 一个 nano SIM 插槽。

## GPS 与 CAT-M {#gps-and-cat-m}

CME22-2n-BG77 支持 CAT-M 和 GNSS。两者不能同时使用。

自动切换蜂窝和 GNSS 优先级的配置示例显示在下面的 **蜂窝与 GNSS 优先级切换自动化** 章节中。另请查看以下指南 - WWAN and GNSS priority automatization。

名为 "modem" 的端口用于蜂窝连接（串行/PPP 连接）和 GNSS NMEA 数据：

```
/port print
Flags: I - INACTIVE
Columns: NAME, CHANNELS, BAUD-RATE
# NAME CHANNELS BAUD-RATE
0 modem 4 115200

```

默认 modem 端口通道分配：

1 - GNSS NMEA 输出端口；

2 - AT/modem 端口；

### 蜂窝调制解调器配置 {#cellular-modem-configuration}

与 LTE 设备不同，BG77 调制解调器默认不提供直接的 IP 调制解调器接口（LTE 接口），而是提供用于串行/PPP 连接的 AT/modem 串行端口。

BG77 调制解调器 AT 命令可通过该链接找到。

设备预设了串行/PPP 连接：

```
/interface ppp-client print
Flags: X - disabled; R - running
 0 R name="ppp-out1" max-mtu=1500 max-mru=1500 mrru=disabled port=modem data-channel=2 info-channel=2 apn="internet"
 pin="" user="" password="" profile=default phone="" dial-command="ATDT" modem-init="AT+QGPSCFG="priority",1"
 null-modem=no dial-on-demand=yes add-default-route=yes default-route-distance=2 use-peer-dns=yes keepalive-timeout=30
 allow=pap,chap,mschap1,mschap2

```

有关串行/PPP 连接的更多详细信息，请查看该链接。

### GNSS 配置 {#gnss-configuration}

您可以查看此处的指南获取更多信息。

BG77 调制解调器为 IoT 蜂窝连接和 GNSS 信号接收共用同一接收器。可通过 **modem-init** 字符串（在 /interface ppp-client 下配置）和 GNSS 服务的 **init-string**（在 /system gps 下配置）来设置优先使用的服务。

AT 命令为：

AT+QGPSCFG="priority",0 → 优先使用 GNSS；AT+QGPSCFG="priority",1 → 优先使用蜂窝 IoT 连接；

AT+QGPSEND → 停止 GNSS 接收；AT+QGPS=1 → 启动 GNSS 接收。

此外，您还可以借助 AT 命令配置支持的 GNSS 星座：

AT+QGPSCFG="gnssconfig"[,&lt;GNSS_config&gt;]

，该命令仅在模块重启后生效，其中 &lt;GNSS_config&gt; 表示星座本身（可为 "1" 到 "5"）：

- 1 → GPS + GLONASS
- 2 → GPS + BeiDou
- 3 → GPS + Galileo
- 4 → GPS + QZSS
- 5 → 可变 - 根据驻留网络的 MCC 选择选项（1–4）之一

### 蜂窝调制解调器固件升级 {#cellular-modem-firmware-upgrade}

请注意：

- DFOTA 固件检查/升级可以使用任何互联网连接进行（包括 wi-fi 和 ethernet 上行链路）。因此，对于 BG77 不具备蜂窝连接的设备（例如仅用作 GPS 接收器时），也可以升级调制解调器固件。
- 当 BG77 调制解调器串行/PPP 接口使用主 AT/modem 通道（data-channel=2）时支持固件升级。要检查当前安装的 BG77 固件版本，请使用以下命令指定 "upgrade=no" 参数：

```
/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=no
 installed: BG77LAR02A04_01.001.01.001
 latest: BG77LAR02A04_01.009.01.009

```

要更新 BG77 调制解调器固件，请将参数设置为 "upgrade=yes"：

```
/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=yes

```

### 蜂窝与 GNSS 优先级切换自动化 {#cellular-and-gnss-priority-switch-automation}

可以通过 ppp 配置文件的 "**on-down**"脚本、"**idle-timeout**" 功能以及 PPP 接口的 "**dial on demand**" 设置来实现自动化。

实施后，当存在互联网流量时，BG77 调制解调器将使用蜂窝数据（在此期间不会收到 GNSS 坐标），而当未检测到互联网流量时，将自动启用 GPS 接收。

**Idle-timeout** 参数指定在没有活动的情况下，链路将在多长时间后终止。

**On-down**脚本字段允许您配置一个脚本，该脚本将在每次 PPP 接口断开时运行（包括在 **idle-timeout**不活动之后）。该脚本会将调制解调器的优先级设置为 GNSS 接收。

**Dial-on-demand**将确保 PPP 接口仅在存在出站流量时才尝试建立连接（此外，调制解调器会自动设置 WWAN/蜂窝连接优先级）。这将确保在 **idle-timeout** 发生后，除非检测到出站数据包，否则连接不会自动重新建立。

通过组合这三个功能，你可以实现以下场景：

- 如果有出站流量，PPP 接口将会处于运行状态（因为 "**dial on demand**"），并且优先级将设置为蜂窝连接。此时会发送 PPP 接口的调制解调器初始化 AT 命令（配置在 PPP 接口的 modem-init="AT+QGPSCFG="priority",1" 设置中）以设置 WWAN 优先级。在此期间，不会接收 GPS 坐标。
- 如果在 "**idle-timeout**" 不活动窗口后未检测到流量，PPP 接口将断开，并且由于 "**dial on demand**" 设置，在检测到出站数据包之前不会建立连接。此时会运行 "**on-down**" 脚本，将 WWAN 优先级切换为 GNSS 优先级。要实现这一点，只需添加一个新的 PPP 配置文件：

```
/ppp profile add idle-timeout=30s name=BG77 on-down="/interface ppp-client at-chat [find where modem-init=\"AT+QGPSCFG=\\\"priority\\\",1\"] input=\"AT+QGPSCFG=\\\"priority\\\",0\""

```

上面的示例创建了一个名为 "BG77" 的新配置文件，将 **idle-timeout** 设置为 30 秒，并启用 **on-down** 脚本，该脚本将发送 GNSS 优先级 AT 命令。

之后，请确保将此新创建的配置文件应用到 PPP 接口：

```
/interface ppp-client set [find] profile=BG77

```

并确认它已被应用（profile=BG77）：

```
/interface ppp-client print
Flags: X - disabled; R - running
0 R name="ppp-out1" max-mtu=1500 max-mru=1500 mrru=disabled port=modem data-channel=2 info-channel=2
apn="internet" pin="" user="" password="" profile=BG77 phone="" dial-command="ATDT"
modem-init="AT+QGPSCFG="priority",1" null-modem=no dial-on-demand=yes add-default-route=yes
default-route-distance=1 use-peer-dns=yes keepalive-timeout=30 allow=pap,chap,mschap1,mschap2

```

## 按钮和跳线 {#buttons-and-jumpers}

### Reset 按钮 {#reset-button}

- 在启动期间按住此按钮，直到 LED 灯开始闪烁，松开按钮以重置 RouterOS 配置（共 5 秒）。
- 继续按住 5 秒，LED 变为常亮，此时松开可开启 CAP 模式。设备现在将寻找 CAPsMAN 服务器（共 10 秒）。
- 或者继续按住按钮 5 秒，直到 LED 熄灭，然后松开，使 RouterBOARD 寻找 Netinstall 服务器（共 15 秒）。无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都将加载备用 RouterBOOT 引导程序。这对 RouterBOOT 调试和恢复很有用。

## 配件 {#accessories}

包装中包含以下随设备提供的附件：

![](/img/59434738aabaa7c4.webp)

## 操作系统支持 {#operating-system-support}

设备支持 RouterOS v7 及以上版本。具体的出厂安装版本列在 /system resource 中。其他操作系统尚未经过测试。

为避免污染环境，请将设备与生活垃圾分开，并以安全的方式处置，例如在指定的废物处置场。请熟悉您所在地区将设备正确运输到指定处置场的程序。
