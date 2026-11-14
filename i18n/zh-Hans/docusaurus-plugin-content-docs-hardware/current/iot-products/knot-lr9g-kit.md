---
title: "KNOT LR9G kit"
slug: /knot-lr9g-kit
source: https://manual.mikrotik.com/hardware/knot-lr9g-kit
captured_at: '2026-11-04T09:53:20+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

→ 本指南可以下载为 <a href="/assets/files/knot-lr9g-kit-b74fa0b50265ed036c2a40802b068492.pdf" target="_blank" rel="noopener">PDF 文件</a>。

![](/img/d2de7c6aedce0031.webp)

### [KNOT LR9G kit](https://mikrotik.com/product/knot_lr9g_kit)（RB924iR-2nD-BT5&BG770A&R11e-LR9G） {#knot-lr9g-kit-rb924ir-2nd-bt5bg770ar11e-lr9g}

→ 适用于最具多样性和成本效益的部署环境的 IoT 网关。完整规格和产品宣传册请参见 [KNOT LR9G kit 产品页面](https://mikrotik.com/product/knot_lr9g_kit)。

## 安全警告 {#safety-warnings}

- 客户有责任遵守当地国家法规，包括在合法频段内运行、发射功率、布线要求以及 Dynamic Frequency Selection (DFS) 要求。所有 MikroTik 无线电设备必须由专业人员安装。

→ **射频辐射暴露：** 本 MikroTik 设备符合 FCC、IC 和欧盟针对非受控环境规定的辐射暴露限值。安装和操作本 MikroTik 设备时，设备与您的身体、职业使用者或公众之间的距离不得小于 20 厘米。

## 快速开始 {#quickstart}

- 设置路由器密码。

→ *U.FL 转 SMA 转接线和外部蓝牙天线不随包装提供。*

## 主要特性 {#key-features}

![](/img/b1e92974169eba45.webp)

![](/img/7e01ab6b4a4d437f.webp)

![](/img/944d0bd720be0572.webp)

![](/img/865c394907132195.webp)

## 规格 {#specifications}

<table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>**产品代码**</td><td>RB924iR-2nD-BT5&BG770A&R11e-LR9G</td></tr><tr><td>**架构**</td><td>MIPSBE</td></tr><tr><td>**CPU**</td><td>QCA9531，1 核，650 MHz</td></tr><tr><td>**RAM**</td><td>64 MB</td></tr><tr><td>**存储**</td><td>128 MB NAND</td></tr><tr><td>**RouterOS 许可证**</td><td>4</td></tr><tr><td>**操作系统**</td><td>RouterOS v7</td></tr><tr><td>**以太网**</td><td>2 × 10/100 (Auto MDI/X)</td></tr><tr><td>**PoE 输入**</td><td>802.3af/at，12–57 V DC</td></tr><tr><td>**PoE 输出**</td><td>Ether2，被动 PoE，最高 57 V</td></tr><tr><td>**最大功耗**</td><td>20 W</td></tr><tr><td>**无线 2.4 GHz**</td><td>802.11b/g/n，2×2，1.5 dBi</td></tr><tr><td>**蓝牙**</td><td>5.2</td></tr><tr><td>**USB**</td><td>1 × microUSB（AB 型）</td></tr><tr><td>**SIM**</td><td>1 × nano-SIM</td></tr><tr><td>**串口**</td><td>RS485</td></tr><tr><td>**LoRa 卡**</td><td>R11e-LR9G，902–928 MHz (US)，最高 27 dBm，Class A/C，GPS 通过 U.FL</td></tr><tr><td>**尺寸**</td><td>122 × 87 × 26 mm</td></tr><tr><td>**工作温度**</td><td>−40 °C … +70 °C</td></tr><tr><td>**防护等级**</td><td>IP20</td></tr><tr><td>**MTBF**</td><td>≈ 100 000 h @ 25 °C</td></tr><tr><td>**认证**</td><td>CE、FCC、IC、EAC、RoHS</td></tr></tbody></table>

## 安装 {#mounting}

![](/img/60a25f0b55a2a55d.webp)

- 或者，也可以使用设备背面的螺钉孔将设备固定到墙上。设备应以线缆开口朝下的方式安装，如图所示。**警告：** 本设备应在与身体保持至少 20 cm 距离的情况下安装和操作。本设备在住宅环境中运行可能会导致无线电干扰。本设备的安装和配置应由合格人员完成。

## 供电 {#powering}

- 将以太网线从本地网络 (LAN) 连接到 PoE 适配器。

- 将电源线连接到适配器，然后将电源线插入电源插座。

## 扩展插槽和端口 {#extension-slots-and-ports}

![](/img/46b18e887e695663.webp)

- Bluetooth 版本 5.2，天线增益 2 dBi。

→ **KNOT LR9G kit：**

- LR9G 卡。

## Modbus {#modbus}

→ KNOT 的 Modbus [配置指南](/docs/internet-of-things/modbus)。

## Bluetooth 天线 {#bluetooth-antenna}

→ 对于 KNOT LR8 kit、KNOT LR8G kit、KNOT LR9 kit 和 KNOT LR9G kit，蓝牙外接天线转接线的预留位置**不可用**（此处已有一个由 LoRa 使用的 SMA 插槽）。

要使用外置天线，您需要一个 U.FL (female) 转 SMA 连接器（pigtail）以及一个 Bluetooth 天线（可连接到 SMA）。

要使用外置天线，您需要一个 U.FL (female) 转 SMA 连接器（pigtail）以及一个 Bluetooth 天线（可连接到 SMA）。

![](/img/fdb0c8a7e4b9a21f.webp)

- 将 Bluetooth 天线连接到 SMA 插槽。您需要在 RouterOS 设置中更改您希望使用的天线（新连接的 "external" 或内置的 "internal"）（在 IoT→ Bluetooth→Devices→双击 Bluetooth 接口→ 在 Antenna 字段中）：

![](/img/0b9b0fd9fbf0ff90.webp)

→ U.FL 转 SMA 转接线和外部蓝牙天线不随包装提供。

## GPS 与 NB/CAT-M {#gps-and-nbcat-m}

→ 将您的天线连接到 SMA 连接器：

![](/img/fa4fa700c587500b.webp)

→ 使用窄带调制解调器和 GPS 时必须连接外部天线。不随包装提供。

必须连接外部天线才能使用窄带调制解调器和 GPS。包装中不提供。

名为 "modem" 的端口用于蜂窝连接（serial/PPP 连接）和 GPS 接收：

```
/port print
Flags: I - INACTIVE
Columns: DEVICE, NAME, CHANNELS, USED-BY, BAUD-RATE
#   DEVICE  NAME    CHANNELS  USED-BY  BAUD-RATE
0           modbus         1                9600
1   1-1.4   modem          5              115200

```

2 - AT/modem 端口；

→ 2 - AT/modem 端口；

2 - AT/modem 端口；

4 - AUX AT/modem 端口 - 最大带宽 115200bps，仅适用于 KNOT LoRa 套件和带内部 USB 集线器的 KNOT。

### 蜂窝调制解调器配置 {#cellular-modem-configuration}

→ BG77 调制解调器的 AT 命令可在 [BG77 AT Commands Manual](https://mikrotik.com/product/knot#tab0) 中找到。

KNOT 默认具有 serial/PPP 连接预设：

KNOT 默认具有 serial/PPP 连接预设：

```
/interface ppp-client print
Flags: X - disabled; R - running
 0 R  name="ppp-out1" max-mtu=1500 max-mru=1500 mrru=disabled port=modem data-channel=2 info-channel=4 apn="internet"
      pin="" user="" password="" profile=default phone="" dial-command="ATDT" modem-init="AT+QGPSCFG="priority",1"
      null-modem=no dial-on-demand=yes add-default-route=yes default-route-distance=1 use-peer-dns=yes keepalive-timeout=30
      allow=pap,chap,mschap1,mschap2

```

有关 serial/PPP 连接的更多详细信息，请查看 [PPP Client](/docs/mobile-networking/ppp) 文档。

有关 serial/PPP 连接的更多详细信息，请查看 [PPP Client](/docs/mobile-networking/ppp) 文档。

### GPS 配置 {#gps-configuration}

→ 如果遇到 GPS 接收问题：

→ - 取下 KNOT 的外壳，确认 U.FL 转接线已从 LoRa 卡连接到 SMA 端口。

- 确保外部 GPS 天线已正确连接到标有 GNSS 的 SMA 端口。

### 蜂窝调制解调器固件升级 {#cellular-modem-firmware-upgrade}

→ - DFOTA 固件检查/升级可以使用任何互联网连接完成（包括 wi-fi 和以太网上行链路）。因此，即使 BG77 没有蜂窝连接（例如仅用作 GPS 接收器）的设备也可以升级调制解调器固件。

- 当 BG77 调制解调器的 serial/PPP 接口使用主 AT/modem 通道（data-channel=2）时，支持固件升级。要检查当前安装的 BG77 固件版本，请使用以下命令指定 "upgrade=no" 参数：

```
/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=no
  installed: BG77LAR02A04_01.001.01.001
     latest: BG77LAR02A04_01.009.01.009

```

→ 要更新 BG77 调制解调器固件，请将参数设置为 "upgrade=yes"：

```
/interface/ppp-client/firmware-upgrade ppp-out1 upgrade=yes

```

## 按钮和跳线 {#buttons-and-jumpers}

→ - 要使用 [Netinstall](/docs/getting-started/installation-and-upgrade/netinstall) 实用工具重新安装 RouterOS，请让设备进入 BOOTP 模式。有两种 booter 选项可用：**Regular Booter** 和 **Backup Booter**。建议在其中一个不起作用时对两种选项都进行验证。

- **Regular Booter:** 要进入 etherboot 模式，请在给设备通电并等待 1–2 秒后按下 **Reset** 按钮。

- **Regular Booter:** 要进入 etherboot 模式，请在给设备通电并等待 1–2 秒后按下 **Reset** 按钮。
- **Backup Booter:** 关闭设备。按住 **Reset** 按钮，然后给设备上电。等待 **LED** 序列（闪烁 → 常亮 → 熄灭），然后松开按钮。设备将启动进入 **BOOTP** 模式，可通过 Netinstall 重新安装 RouterOS。视型号而定，这可能由 **USR, USER, System** 或 **ACT** LED 指示，或由 SFP 端口 LED 指示。

→ 无论使用上述哪种选项，如果在设备通电之前按下按钮，系统都将加载备份 RouterBOOT 引导程序。这对于 RouterBOOT 调试和恢复很有用。

## GPIO 引脚排列 {#gpio-pinout}

→ GPIO 引脚位于外壳下方的电路板上，如图所示：

![](/img/aa56f6a091950f7a.webp)

→ ADC 输入/模拟输入（pin2 或 pin3）：

![](/img/0201b8beb9b054ef.webp)

已连接的继电器（pin4 或 pin6）：

已连接的继电器（pin4 或 pin6）：

![](/img/4b8f177a2150596d.webp)

→ *注意：最大功耗（数字输出开漏晶体管）为 0.48 W。建议在连续工作时不要超过 24V 或 0.5A。绝对最大漏源电压为 30V，最大电流为 2.8A。*

![](/img/4c01507e5fd17337.webp)

防拆开关（pin5）：

防拆开关（pin5）：

![](/img/597abb74d2c7dc9c.webp)

→ *要在引脚上获得逻辑 "0"，电压应在 0-1.47 V 之间；*

-

*要在引脚上收到逻辑 "1"，电压应在 1.48-2.5 V 之间。* *使用 PCB 上拉电阻时：*

→ *要在引脚上获得逻辑 "1"，电压应在 1.48-2.5 V 之间。* *有 PCB 上拉电阻时：*

-

*要在引脚上收到逻辑 "1"，电压应在 1.48-2.5 V 之间。* *使用 PCB 上拉电阻时：*

→ *要在引脚上获得逻辑 "0"，电压应在 0-1.34 V 之间；*

*要在引脚上收到逻辑 "0"，电压应在 0-1.34 V 之间；*

*要在引脚上收到逻辑 "1"，电压应在 1.35-2.5 V 之间。* *较新的 routerboard 将在 PCB（板上）上带有 10k ohm 上拉电阻。较旧的板（首批发布批次）可能需要外部上拉电阻。*

*要在引脚上收到逻辑 "1"，电压应在 1.35-2.5 V 之间。* *较新的 routerboard 将在 PCB（板上）上带有 10k ohm 上拉电阻。较旧的板（首批发布批次）可能需要外部上拉电阻。*

## 配件 {#accessories}

→ - SET2_ K-74 DIN 导轨安装套装。

- Modbus 连接器，A+，B-。

→ HGO-LTE-W 天线可单独购买。

![](/img/90314e3eea2eb9bb.webp)

## 操作系统支持 {#operating-system-support}

→ 本设备支持 RouterOS v7 及以上版本。出厂安装的具体版本列于 /system resource 中。其他操作系统尚未经过测试。

## 配置 {#configuration}

如果您拥有 LR8 或 LR9 KNOT 变体，并且有兴趣使用 LoRa 协议，请点击我们的 LoRa 指南。

→ 如果您使用的是 LR8 或 LR9 KNOT 版本，并且希望使用 LoRa 协议，请点击我们的 LoRa 指南。

如果您拥有 LR8 或 LR9 KNOT 变体，并且有兴趣使用 LoRa 协议，请点击我们的 LoRa 指南。

要查看其他 IoT 功能，请访问 IoT 页面。

## 概述 {#overview}

→ 您需要做的只是配置一个脚本。该脚本可以过滤广播信息并将其推送到互联网。

本文介绍如何配置 KNOT 以使用 MQTT 或 http 协议发布数据。

→ 本文介绍如何配置 KNOT 以使用 MQTT 或 http 协议发布数据。

本文介绍如何配置 KNOT 以使用 MQTT 或 http 协议发布数据。

必须连接外部天线才能使用窄带调制解调器和 GPS。包装中不提供。

## 报告 {#reports}

您可以在 Advertising reports 选项卡中找到所有广播设备。

您可以在 Advertising reports 选项卡中找到所有广播设备。

![](/img/4ee647301a86eb0c.webp)

→ 在此菜单中，您可以按下 Filter 图标来设置过滤器。例如，在知道设备 MAC 地址的情况下，您可以设置过滤器以仅显示特定的报告。

![](/img/bf2032dfd2080349.webp)

您可以使用 - 图标移除筛选选项。

您可以使用 - 图标移除筛选选项。

## MQTT Broker 配置 {#mqtt-broker-configuration}

您可以通过 + 按钮添加新的 broker。

您可以通过 + 按钮添加新的 broker。

![](/img/1a3a89d9fc694e82.webp)

<table><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td>名称</td><td>标识。Broker 的名称。</td></tr><tr><td>地址</td><td>MQTT broker 的 IP 地址或 FQDN 名称，不带 ssl:// 或 tcp:// 前缀。</td></tr><tr><td>端口</td><td>broker 的网络端口。通常为 1883 或 8883（用于 SSL）。</td></tr><tr><td>SSL</td><td>启用/禁用 Secure Socket Layer。如果服务器使用自签名证书或由不受信任的 CA 签发的证书，您必须将服务器的证书 &lt;crt&gt; 文件上传到 RouterOS。将 .cer 文件上传到 Files 菜单，并在 System&gt;Certificates 选项卡中将该文件导入到 certificates。</td></tr><tr><td>用户名</td><td>MQTT broker 的用户名。</td></tr><tr><td>密码</td><td>MQTT broker 的密码。</td></tr><tr><td>Client Id</td><td>用于连接的唯一 ID。broker 使用此 ID 来识别客户端。</td></tr><tr><td>证书</td><td>如果双向认证需要，请选择证书。</td></tr></tbody></table>

**注意：** Name、Address 和 Port 字段配置是必需的。其他参数可以是可选的或必需的 - 取决于服务器/broker 的设置方式。

**注意：** Name、Address 和 Port 字段配置是必需的。其他参数可以是可选的或必需的 - 取决于服务器/broker 的设置方式。

## 发布 {#publish}

→ 创建 broker 后，单击 Publish 按钮。此对话框允许您选择 broker 并指定消息信息。

![](/img/d3b62757ecbe08c5.webp)

→ 然后您可以指定 Topic（broker 用于过滤消息的字符串）、Message（消息本身）、QoS（指示消息的服务质量等级）和 Retain（是保留消息还是丢弃消息）参数。

**注意：** Broker 和 Topic 字段配置是必需的。Message、QoS 和 Retain 可以是可选的或必需的 - 取决于服务器/broker 的设置方式。

**注意：** Broker 和 Topic 字段配置是必需的。Message、QoS 和 Retain 可以是可选的或必需的 - 取决于服务器/broker 的设置方式。

## MQTT 与脚本场景 {#mqtt-with-script-scenario}

每一行以符号 "**#**" 开头的都是说明性内容，它描述将在该行下方配置的参数。请更改引号 "" 内适用于您具体情况的参数。

→ 每一行以符号 "**#**" 开头的都是说明性内容，描述该行下方将要配置的参数。请修改引号 "" 内适用于您具体情况的参数。

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

→ 要运行此脚本，Broker 应已预先配置：

![](/img/ce0edf2496617c43.webp)

→ 例如，thingsboard 只需要上图所示的设置。成功配置 broker 后，脚本中唯一需要更改的是：

```
:local broker "Demo Device"

```

行，你应在引号 "" 内指定 broker 的名称。

另一个需要考虑的行是：

```
:local topic "v1/devices/me/telemetry"

```

导航到 System &gt; Scripts，并在那里添加新脚本（为其命名，例如 script1）。

脚本配置的其余部分取决于整体需求。脚本中说明了配置了哪些确切参数用于发布。

导航到 System &gt; Scripts，并在那里添加新脚本（为其命名，例如 script1）。

要运行脚本，您可以使用命令行：

/system script run script1

## HTTP fetch 与脚本场景 {#http-fetch-with-script-scenario}

→ 创建一个新脚本，以该模板作为参考，相应修改参数并运行脚本。

每一行以符号 "**#**" 开头的都是说明性内容，它描述将在该行下方配置的参数。请更改引号 "" 内适用于您具体情况的参数。

→ 每一行以符号 "**#**" 开头的都是说明性内容，描述该行下方将要配置的参数。请修改引号 "" 内适用于您具体情况的参数。

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

→ 请相应更改 URL（取决于服务器配置）。

```
/tool fetch http-method=post http-header-field="Content-Type:application/json" http-data=$message url="https://demo.thingsboard.io/api/v1/Q99YlBqv59NdzOel6tyP/telemetry"

```

导航到 System &gt; Scripts，并在那里添加新脚本（为其命名，例如 script1）。

要运行脚本，您可以使用命令行：

/system script run script1

## MikroTik 移动应用 {#mikrotik-mobile-app}

使用 MikroTik 智能手机应用可在现场配置路由器，或为您的 MikroTik 家用接入点应用最基本的初始设置。

![](/img/9bcba09a7b6a0d53.webp)

- 可以使用高级菜单来完整配置所有必要设置。

**Bluetooth 合格产品**

**Bluetooth 合格产品**

![](/img/cf3c8d2919f980e2.webp)

→ 本产品已成功完成蓝牙认证流程。有关蓝牙认证产品的更多信息，请使用以下链接：[https://launchstudio.bluetooth.com/Listings/Search](https://launchstudio.bluetooth.com/Listings/Search)
