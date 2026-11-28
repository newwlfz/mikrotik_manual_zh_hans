---
title: "MikroTik Tag 广告格式"
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-tag-advertisement-formats
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

##

## 简介 {#introduction}

TG-BT5-XX 标签可在 4 种不同模式下工作：

- 出厂休眠模式
- 配置模式
- 广播模式
- 升级模式

在 Advertising mode 下，标签会在 Bluetooth 广播数据包中广播自身信息。信息内容取决于广播数据包类型。

目前，可通过 MikroTik Beacon Manager app 配置的支持类型如下：

DeviceName、MikroTik、[Eddystone-TLM](https://play.google.com/store/apps/details?id=com.mikrotik.android.bt5&hl=en_US&gl=US&pli=1)、[Eddystone-UID](https://github.com/google/eddystone/tree/master/eddystone-uid) 和 [iBeacon](https://developer.apple.com/ibeacon/)。

Bluetooth 技术在数据交换过程中使用 2 种类型的信道（各自使用不同频率）：

- 专用于数据传输的 Data channels；
- 专用于广播的 Advertise channels。

共有 40 个唯一频段（信道），每个频段间隔 2 MHz。37、38 和 39 信道用于广播，0-36 用于数据传输。

在广播过程中，会广播 BLE 广播数据包。该数据包包含 Preamble、Access Address、PDU 和 CRS 字段。

Preamble 和 Access Address 字段帮助接收端检测帧。CRS 字段用于检查错误。PDU 定义数据包本身。

MikroTik 标签支持传统 Non-Connectable Non-Scannable Undirected 广播（`ADV_NOCONN_IND`）。在这种情况下，Payload 由“AdvA”（包含广播者地址信息的字段）和“AdvData”（包含数据信息的字段）组成。

1 个八位组 = 1 个字节 = 8 位

| 属性 | 说明 |
| --- | --- |
| Preamble | 1 octet |
| Access-Address | 4 octets |
| PDU | <ul><li>PDU Header = 2 octets </li><li>PDU Payload = AdvA (6 octets)+AdvData (0...31 octets)</li></ul> |
| CRS | 3 octets |

## MikroTik 数据包结构 {#mikrotik-packet-structure}

“AdvData”字段结构（最大 31 octets/bytes）：

| 属性 | 描述 | |
| --- | --- | --- |
| Flags | Flags 字段的长度、类型和数据的字段。用于“告知”周围扫描器设备所处的状态。 | 3 个八位字节（<code>020106</code>）：<br/><ul><li> 第 1 个八位字节 - 长度 </li><li> 第 2 个八位字节 - 类型</li><li> 第 3 个八位字节 - 数据</li></ul> |
| Length | 有效载荷的长度。 | 1 个八位字节（`15`） |
| Type | 制造商特定数据。 | 1 个八位字节（`ff`） |
| ManufacturerData | 公司标识符。 | 2 个八位字节（`4F09`） |
| Version | 此广播结构的版本。 | 1 个八位字节（uint） |
| UserData | 用户配置的有效载荷部分。 | 1 个八位字节（uint） |
| Secret | 可选加密（AES-ECB）的有效载荷部分。 | <ul><li> secret：salt（用于加密）= 2 个八位字节（uint） </li><li> secret：acceleration（采用有符号 8.8 定点格式的加速度） </li><li> 全部 3 个轴的加速度（0=x，1=y，2=z）= 6 个八位字节（uint） </li><li> secret：temperature（采用有符号 8.8 定点格式的摄氏环境温度）= 2 个八位字节（int） </li><li> secret：uptime（以秒为单位的运行时间）= 4 个八位字节（uint） </li><li> secret：flags（flags 的位掩码）= 1 个八位字节（uint） </li><li> secret：batteryPercentage（以百分比表示的电池电量）= 1 个八位字节（uint） </li></ul> |

:::info
请注意，所有多字节值均采用小端序。也就是说，例如，如果要获取温度值，并且第 #14 和 #15 个八位字节将温度表示为“a1 19”（“正”温度）→ 则实际温度值为 (0x19a1)/256 = 25.6 C。
:::
稍后将在 **PDU payload structure** 部分展示一个详细示例，说明如何将 **十六进制** 有效载荷值转换为 **十进制** 值。

UserData 和 Secret 字段通过 `flags` 配置。在“UserData”部分，控制“Secret”是否加密的参数称为 `FLAG_ENCRYPTED`。当 `FLAG_ENCRYPTED=0` 时，表示 secret 未加密（第 6 个八位字节中的第 1 位将设置为 0）；当 `FLAG_ENCRYPTED=1` 时，表示 secret 已加密（第 6 个八位字节中的第 1 位将设置为 1）。

在“Secret”部分，有 7 个 `flags`（第 24 个八位字节）：

- `FLAG_REED_SWITCH`（第 1 位 - 如果设置为 1，表示广播时干簧管处于闭合状态）
- `FLAG_ACCEL_TILT`（第 2 位 - 如果设置为 1，表示广播是通过倾斜设备发送的）
- `FLAG_ACCEL_FREE_FALL`（第 3 位 - 如果设置为 1，表示广播是通过掉落设备发送的）
- `FLAG_IMPACT_X`（第 4 位 - 如果设置为 1，表示广播时 x 轴上发生了撞击）
- `FLAG_IMPACT_Y`（第 5 位 - 如果设置为 1，表示广播时 y 轴上发生了撞击）
- `FLAG_IMPACT_Z`（第 6 位 - 如果设置为 1，表示广播时 z 轴上发生了撞击）
- `FLAG_ACCEL_DISABLED`（第 7 位 - 如果设置为 1，表示加速度计已禁用）
例如，如果看到十六进制消息的第 24 个八位字节为“02”（将值“02”从 **十六进制** 转换为 **二进制** 时为“0010”→ 第 2 位设置为 1）→ 表示设备被倾斜。如果看到“04”（**十六进制**“04”转换为 **二进制** 为“0100”→ 第 3 位设置为 1）→ 表示设备被掉落（触发自由落体）。如果看到“38”（**十六进制** 转换为 **二进制** 为“00111000”→ 第 4、5 和 6 位设置为 1）→ 表示发送广播时，加速度计检测到所有 3 个 x/y/z 轴上发生撞击或唤醒。

更多示例（针对第 24 个八位字节的值）：

- “08”表示仅在 x 轴上发生撞击；
- “18”表示在 x 和 y 轴上发生撞击；
- “28”表示在 x 和 z 轴上发生撞击；
- “10”表示仅在 y 轴上发生撞击；
- “30”表示在 y 和 z 轴上发生撞击；
- “20”表示仅在 z 轴上发生撞击。
- “40”表示加速度计已禁用。

### MikroTik PDU Payload 结构 {#mikrotik-pdu-payload-structure}

| Octet | Value | | |
| --- | --- | --- | --- |
| 0 | 02 | Flags | 标志字段的长度 |
| 1 | 01 | Flags | 标志字段的类型 |
| 2 | 06 | Flags | 标志字段的数据 |
| 3 | 15 | Length | 有效载荷的长度 |
| 4 | FF | Type | 制造商特定数据 |
| 5 | 4F | Company identifier | MikroTik |
| 6 | 09 | Company identifier | MikroTik |
| 7 | 01 | Version | 该广播结构的版本 |
| 8 | 00 | UserData | 用户配置的有效载荷部分 |
| 9 | xx* | Secret | secret：salt |
| 10 | xx* | Secret | secret：X 轴加速度 |
| 11 | xx* | Secret | secret：X 轴加速度 |
| 12 | xx* | Secret | secret：Y 轴加速度 |
| 13 | xx* | Secret | secret：Y 轴加速度 |
| 14 | xx* | Secret | secret：Z 轴加速度 |
| 15 | xx* | Secret | secret：Z 轴加速度 |
| 16 | xx* | Secret | secret：温度 |
| 17 | xx* | Secret | secret：温度 |
| 18 | xx* | Secret | secret：运行时间 |
| 19 | xx* | Secret | secret：运行时间 |
| 20 | xx* | Secret | secret：运行时间 |
| 21 | xx* | Secret | secret：运行时间 |
| 22 | xx* | Secret | secret：运行时间 |
| 23 | 00 | Secret | secret：标志 |
| 24 | xx* | Secret | secret：batteryPercentage |

\* - 可能变化

#### 示例 {#example}

下面是按 MikroTik 格式配置的 payload 示例（未加密）：

| 02010615ff4f090100cea6000000000200a01c91085700005f |
| --- |

**020106**（前 3 个八位字节）→ Flags 字段的长度、类型和数值。

**15ff4f09**（第 4、5、6 和 7 个八位字节）→ 长度（0x15 **hex-to-dec** 为 21）。类型（0xff）。公司标识符（0x4f09）。

**01**（第 8 个八位字节） → payload 结构的当前版本。每个 payload 都应相同（常量数据）。

**00**（第 9 个八位字节）→ 表示 payload 未加密。“01”表示已加密。

**cea6**（第 10 和第 11 个八位字节）→ Salt。每个新 payload 都应生成不同的 salt 值。可以使用该值检查相同的 payload 是否以不同方式加密。**该值本身不包含任何有用信息**。如果发现两个在不同时间间隔收到的 payload 的 salt 值相同，则表示收到的两个 payload 完全相同。可以使用与 uptime 计算相同的原理计算 salt 值——见下文。

**0000**（第 12 和第 13 个八位字节）→ 广播时刻 X 轴的加速度 = **0 m/s<sup>2</sup>**。请查看下文中的 Z 轴加速度计算。

**0000**（第 14 和第 15 个八位字节）→ 广播时刻 Y 轴加速度 = **0 m/s<sup>2</sup>**。请查看下方 Z 轴加速度计算。

**0200**（第 16 和第 17 个八位字节）→ 广播时刻 Z 轴加速度 = **0.0078 m/s<sup>2</sup>**。要从十六进制格式得到十进制值，需要执行以下步骤：

- 如前所述，多字节值采用 little-endian，这意味着要计算实际值，需要交换八位字节的位置（交换八位字节顺序）。因此第一步是将 0x**0200** 中的值交换为 0x**0002**。0x**0002** 从**十六进制**转换为**十进制**为 **02**。
- 请记住，加速度采用有符号 8.8 定点格式（二进制补码），这意味着基本上需要将结果除以“256”。第二步是将该值除以 256 → (0x**0002** **hex** 或 **02** **dec**)/256 = 0.0078 m/s<sup>2</sup>。
- 相同的计算原理适用于 X 轴和 Y 轴加速度。在我们的示例中，它们恰好为 0 → 0x0000/256=0。

**a01c**（第 18 和第 19 个八位字节）→ 标签检测到的温度（摄氏度）= **28.625 C**。温度采用 little-endian（因为它是多字节值），并且采用**有符号 16 位整数 [二进制补码] 8.8 定点格式**，因此此处也适用相同的“公式”：
0x1ca0/256=28.625 C。

**91085700**（第 20、21、22、23 个八位字节）→ 标签运行时间（秒）= **5703825 s**。0x91085700 采用 little-endian，因此只需将八位字节交换为 0x00570891，十进制结果为 5703825。即 1584.395833 小时，或 66 天运行时间。

**00**（第 24 个八位字节）→ 发送 payload 的触发器（标志）。如果为“**00**”，表示未检测到触发器，这只是周期性广播的 payload（基于为标签配置的广播间隔）。如果值为“**04**”，表示设备被掉落（触发自由落体）。有关“flags”和“Secret”的更多信息，请参阅上文 **packet structure** 部分。

**5f**（第 25 个八位字节）→ 标签电池百分比 = **95 %**。0x**5f** 从十六进制转换为十进制为 95。

:::info
从 v**7.11** 开始，你可以使用 Peripheral Device 部分或/和 Decode-ad 功能查看解码后的值！
:::

```
#### Script for decoding
Add a new script under the "**System>Scripts**" tab and import the script there (for non-encrypted payloads).

# POSIX regex for filtering advertisement Bluetooth addresses. E.g. "^BC:33:AC"
# would only include addresses which start with those 3 octets.
# To disable this filter, set it to ""
:local addressRegex "2C:C8:1B:4B:BB:0A"

# POSIX regex for filtering Bluetooth advertisements based on their data. Same
# usage as with 'addressRegex'.
:local advertisingDataRegex ""

# Signal strength filter. E.g. -40 would only include Bluetooth advertisements
# whose signal strength is stronger than -40dBm.
# To disable this filter, set it to ""
:local rssiThreshold ""

################################## Bluetooth ##################################
:global invertU16 do={
    :local inverted 0
    :for idx from=0 to=15 step=1 do={
        :local mask (1 &lt;&lt; $idx)
        :if ($1 & $mask = 0) do={
            :set $inverted ($inverted | $mask)
        }
    }
    return $inverted
}
:global le16ToHost do={
    :local lsb [:pick $1 0 2]
    :local msb [:pick $1 2 4]
    :return [:tonum "0x$msb$lsb"]
}
:local le32ToHost do={
    :local lsb [:pick $1 0 2]
    :local midL [:pick $1 2 4]
    :local midH [:pick $1 4 6]
    :local msb [:pick $1 6 8]
    :return [:tonum "0x$msb$midH$midL$lsb"]
}
:local from88 do={
    :global invertU16
    :global le16ToHost
    :local num [$le16ToHost $1]
    # Handle negative numbers
    :if ($num & 0x8000) do={
        :set num (-1 * ([$invertU16 $num] + 1))
    }
    # Convert from 8.8. Scale by 1000 since floating point is not supported
    :return (($num * 125) / 32)
}
:local flagStr do={
    :local str ""
    :if ($1 & 0x01) do={ :set $str " switch" }
    :if ($1 & 0x02) do={ :set $str "$str tilt" }
    :if ($1 & 0x04) do={ :set $str "$str free_fall" }
    :if ($1 & 0x08) do={ :set $str "$str impact_x" }
    :if ($1 & 0x10) do={ :set $str "$str impact_y" }
    :if ($1 & 0x20) do={ :set $str "$str impact_z" }
    :if ([:len $str] = 0) do={ :return "" }
    :return [:pick $str 1 [:len $str]]
}
# Find fresh Bluetooth advertisements
:global btOldestAdvertisementTimestamp
:if ([:typeof $btOldestAdvertisementTimestamp] = "nothing") do={
    # First time this script has been run since booting, need to initialize
    # persistent variables
    :set $btOldestAdvertisementTimestamp 0
}
:local advertisements [/iot bluetooth scanners advertisements print detail \
    as-value where \
        epoch > $btOldestAdvertisementTimestamp and \
        address ~ $addressRegex and \
        data ~ $advertisingDataRegex and \
        rssi > $rssiThreshold
]
:local advCount 0
:local lastAdvTimestamp 0
:local advJson ""
:local advSeparator ""
# Remove semicolons from MAC/Bluetooth addresses
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
    :local rssi ($adv->"rssi")
    :local epoch ($adv->"epoch")
    :local ad ($adv->"data")
    :local version [:tonum "0x$[:pick $ad 14 16]"]
    :local encrypted [:tonum "0x$[:pick $ad 16 18]"]
    :local salt [$le16ToHost [:pick $ad 18 22]]
    :local accelX [$from88 [:pick $ad 22 26]]
    :local accelY [$from88 [:pick $ad 26 30]]
    :local accelZ [$from88 [:pick $ad 30 34]]
    :local temp [$from88 [:pick $ad 34 38]]
    :local uptime [$le32ToHost [:pick $ad 38 46]]
    :local flags [:tonum "0x$[:pick $ad 46 48]"]
    :local bat [:tonum "0x$[:pick $ad 48 50]"]
    :put ("$advCount: \
        address=$address \
        ts=$epoch \
        rssi=$rssi \
        version=$version \
        encrypted=$encrypted \
        salt=$salt \
        accelX=$accelX \
        accelY=$accelY \
        accelZ=$accelZ \
        temp=$temp \
        uptime=$uptime \
        flags=\"$[$flagStr $flags]\" \
        bat=$bat" \
    )
    :set $advCount ($advCount + 1)
    :set $lastAdvTimestamp $epoch
}
:if ($advCount > 0) do={
    :set $btOldestAdvertisementTimestamp $lastAdvTimestamp
}
```

你只需修改以下行：

```
:local addressRegex "2C:C8:1B:4B:BB:0A"
```

line，在该行中输入标签的 MAC 地址。

使用任意名称保存脚本，例如 **decode**。

通过命令行界面运行脚本（Winbox/Webfig 中的“**New Terminal**”按钮）：

```ros
[admin@MikroTik] > system script run decode
0: address=2C:C8:1B:4B:BB:0A ts=1662553431348 rssi=-45 version=1 encrypted=0 salt=57919 accelX=3 accelY=-35 accelZ=-70 temp=25535 uptime=1046174 flags="" bat=99
1: address=2C:C8:1B:4B:BB:0A ts=1662553436349 rssi=-40 version=1 encrypted=0 salt=24154 accelX=-19 accelY=-23 accelZ=0 temp=25546 uptime=1046179 flags="" bat=99
2: address=2C:C8:1B:4B:BB:0A ts=1662553446351 rssi=-37 version=1 encrypted=0 salt=37822 accelX=-15 accelY=35 accelZ=15 temp=25550 uptime=1046189 flags="" bat=99
```

如上面的示例所示，脚本会将所有有效载荷从**十六进制**格式“转换”为**十进制**格式，并打印到终端中。

你还可以进一步修改脚本，使用“已解码”的值构造消息，并将其发布到你选择的 EMAIL、MQTT 或 HTTP 服务器，**但！**请注意，这可能会增加设备负载。因此，你需要测试运行脚本时的性能。在服务器端完成解码对 RouterOS 资源的占用更小。
:::info
由于不支持浮点数 → 小数点后的每次计算都会“向上取整”为整数。因此，脚本会按 **1000 倍缩放**计算温度和加速度值（乘以 **1000**）。
所以，如果你看到温度为 **temp=25546**，实际温度为 **25.546 C**（25546/1000）；如果你看到 **accelZ=15**，沿 z 轴的实际加速度为 **0.015 m/s<sup>2</sup>**（15/1000）。
:::

## iBeacon 数据包结构 {#ibeacon-packet-structure}

iBeacon 是受支持的广播数据包类型之一。有关该协议的更多信息，请参阅以下[链接](https://en.wikipedia.org/wiki/IBeacon)。

在这种情况下，PDU Payload 由 "AdvA"（长度为 6 个八位字节）和 "AdvData"（包含数据信息的字段）字段组成。传统 Bluetooth 设备仅支持 31 字节长的 beacon 消息。UUID 长度为 16 字节（MikroTik 默认 UID=b2b98de4-c81c-47c2-b14e-791b3e5587ec）。

"AdvData" 字段结构：

| 属性 | 描述 | |
| --- | --- | --- |
| Flags | Flags 字段的长度、类型和数据的字段。用于“告知”周围扫描器设备所处的状态。 | 3 个八位字节（<code>020106</code>）：<br/><ul><li> 第 1 个八位字节 - 长度 </li><li> 第 2 个八位字节 - 类型 </li><li> 第 3 个八位字节 - 数据 </li></ul> |
| ManufacturerData | 公司标识符 | 4 个八位字节（`1aff4c00`） |
| BeaconType | 辅助标识符 | 1 个八位字节（常量） |
| RemainingDataLength | 定义 Payload 的剩余长度（以字节为单位） | 1 个八位字节（常量） |
| UserData | Payload 中用户配置的部分 | <ul><li> Proximity UUID（通用唯一标识符）= 16 个八位字节（uint） </li><li> Major Number（特定组标识符）= 2 个八位字节（uint） </li><li> Minor Number（特定 beacon 标识符）= 2 个八位字节（uint） </li></ul> |
| TxPower | 表示距设备一米处的信号强度 | 1 个八位字节（int） |

### iBeacon PDU Payload 结构 {#ibeacon-pdu-payload-structure}

| 八位字节 | 值 | | |
| --- | --- | --- | --- |
| 0 | 02 | Flags | Flags 字段的长度 |
| 1 | 01 | Flags | Flags 字段的类型 |
| 2 | 06 | Flags | Flags 字段的数据 |
| 3 | 1a | ManufacturerData | 公司标识符 |
| 4 | ff | ManufacturerData | 公司标识符 |
| 5 | 4c | ManufacturerData | 公司标识符 |
| 6 | 00 | ManufacturerData | 公司标识符 |
| 7 | 02 | BeaconType | 辅助标识符 |
| 8 | 15 | RemainingDataLength | 定义 Payload 的剩余长度（以字节为单位） |
| 9 | xx* | UserData | Proximity UUID |
| 10 | xx* | UserData | Proximity UUID |
| 11 | xx* | UserData | Proximity UUID |
| 12 | xx* | UserData | Proximity UUID |
| 13 | xx* | UserData | Proximity UUID |
| 14 | xx* | UserData | Proximity UUID |
| 15 | xx* | UserData | Proximity UUID |
| 16 | xx* | UserData | Proximity UUID |
| 17 | xx* | UserData | Proximity UUID |
| 18 | xx* | UserData | Proximity UUID |
| 19 | xx* | UserData | Proximity UUID |
| 20 | xx* | UserData | Proximity UUID |
| 21 | xx* | UserData | Proximity UUID |
| 22 | xx* | UserData | Proximity UUID |
| 23 | xx* | UserData | Proximity UUID |
| 24 | xx* | UserData | Proximity UUID |
| 25 | xx* | UserData | Major Number |
| 26 | xx* | UserData | Major Number |
| 27 | xx* | UserData | Minor Number |
| 28 | xx* | UserData | Minor Number |
| 29 | xx* | TxPower | 表示距设备一米处的信号强度 |

\* - 可以变化

## Eddystone-TLM 数据包结构 {#eddystone-tlm-packet-structure}

Eddystone-TLM 是支持的广播数据包类型之一。有关该协议的更多信息，请参阅以下[链接](https://github.com/google/eddystone/blob/master/eddystone-tlm/tlm-plain.md)。

在这种情况下，PDU Payload 由“AdvA”（长度为 6 个八位字节）和“AdvData”（包含数据信息的字段）字段组成。MikroTik 默认 CompleteUUID=03 03 aa fe；ServiceData=11 16 aa fe。

“AdvData”字段结构：

| 属性 | 描述 | |
| --- | --- | --- |
| Flags | Flags 字段的长度、类型和数据的字段。用于“告知”周围的扫描器设备所处的状态。 | 3 个八位字节（<code>020106</code>）： <br/><ul><li> 第 1 个八位字节 - 长度 </li><li> 第 2 个八位字节 - 类型 </li><li> 第 3 个八位字节 - 数据 </li></ul> |
| CommonPayload | 所有 Eddystone 帧类型共有的广播 payload 部分 | <ul><li> CompleteUUID（通用唯一标识符）= 4 个八位字节（常量） </li><li> ServiceData（<em>16 bit UUID</em> 数据类型）= 4 个八位字节（常量） </li><li> FrameType（值 = <code>0x20</code>）= 1 个八位字节（常量） </li></ul> |
| TlmPayload | Eddystone-TLM 帧 payload | <ul><li> Version（TLM 版本）= 1 个八位字节（常量） </li><li> BatteryVoltageMv（电池电压，1 mV/bit）= 2 个八位字节（uint） </li><li> TemperatureC（Beacon 温度，单位为摄氏度）= 2 个八位字节（int） </li><li> AdvertisementCount（广播 PDU 计数）= 4 个八位字节（uint） </li><li> UptimeCounter（自开机或重启以来的时间）= 4 个八位字节（uint） </li></ul> |

### Eddystone-TLM PDU Payload 结构 {#eddystone-tlm-pdu-payload-structure}

| 八位字节 | 值 | | |
| --- | --- | --- | --- |
| 0 | 02 | Flags | Flags 字段的长度 |
| 1 | 01 | Flags | Flags 字段的类型 |
| 2 | 06 | Flags | Flags 字段的数据 |
| 3 | 03 | CommonPayload | CompleteUUID |
| 4 | 03 | CommonPayload | CompleteUUID |
| 5 | aa | CommonPayload | CompleteUUID |
| 6 | fe | CommonPayload | CompleteUUID |
| 7 | 11 | CommonPayload | ServiceData |
| 8 | 16 | CommonPayload | ServiceData |
| 9 | aa | CommonPayload | ServiceData |
| 10 | fe | CommonPayload | ServiceData |
| 11 | 20 | CommonPayload | FrameType |
| 12 | 00 | TlmPayload | Version |
| 13 | xx* | TlmPayload | BatteryVoltageMv |
| 14 | xx* | TlmPayload | BatteryVoltageMv |
| 15 | xx* | TlmPayload | TemperatureC |
| 16 | xx* | TlmPayload | TemperatureC |
| 17 | xx* | TlmPayload | AdvertisementCount |
| 18 | xx* | TlmPayload | AdvertisementCount |
| 19 | xx* | TlmPayload | AdvertisementCount |
| 20 | xx* | TlmPayload | AdvertisementCount |
| 21 | xx* | TlmPayload | UptimeCounter |
| 22 | xx* | TlmPayload | UptimeCounter |
| 23 | xx* | TlmPayload | UptimeCounter |
| 24 | xx* | TlmPayload | UptimeCounter |

\* - 可能变化

## Eddystone-UID 数据包结构 {#eddystone-uid-packet-structure}

Eddystone-UID 是支持的广播数据包类型之一。有关该协议的更多信息，请参阅以下[链接](https://github.com/google/eddystone/blob/master/eddystone-uid/README.md)。

在这种情况下，PDU Payload 由 "AdvA"（长度为 6 个八位字节）和 "AdvData"（包含数据信息的字段）字段组成。MikroTik 默认 CompleteUUID=03 03 aa fe；ServiceData=17 16 aa fe。

"AdvData" 字段结构：

| Property | Description | |
| --- | --- | --- |
| Flags | Flags 字段的长度、类型和数据的字段。用于“告知”周围扫描器设备所处的状态。 | 3 个八位字节（<code>020106</code>）：<ul><li> 第 1 个八位字节 - 长度 </li><li> 第 2 个八位字节 - 类型 </li><li> 第 3 个八位字节 - 数据 </li></ul> |
| CommonPayload | 所有 Eddystone 帧类型共有的广播 payload 部分 | <ul><li> CompleteUUID（通用唯一标识符）= 4 个八位字节（const） </li><li> ServiceData（<em>16 bit UUID</em> 数据类型）= 4 个八位字节（const） </li><li> FrameType（值 = <code>0x00</code>）= 1 个八位字节（const） </li></ul> |
| UidPayload | Eddystone-UID 帧 payload | <ul><li> Ranging Data（0 m 处校准的 Tx 功率）= 1 个八位字节（int） </li><li> Nspace（唯一自分配的 beacon ID 命名空间）= 10 个八位字节（uint） </li><li> Instance（命名空间内的唯一 ID）= 6 个八位字节（uint） </li><li> RFU1（保留供将来使用，value=<code>0x00</code>）= 1 个八位字节（const） </li><li> RFU2（保留供将来使用，value=<code>0x00</code>）= 1 个八位字节（const） </li></ul> |

### Eddystone-UID PDU Payload 结构 {#eddystone-uid-pdu-payload-structure}

| Octet | Value | | |
| --- | --- | --- | --- |
| 0 | 02 | Flags | Flags 字段的长度 |
| 1 | 01 | Flags | Flags 字段的类型 |
| 2 | 06 | Flags | Flags 字段的数据 |
| 3 | 03 | CommonPayload | CompleteUUID |
| 4 | 03 | CommonPayload | CompleteUUID |
| 5 | aa | CommonPayload | CompleteUUID |
| 6 | fe | CommonPayload | CompleteUUID |
| 7 | 17 | CommonPayload | ServiceData |
| 8 | 16 | CommonPayload | ServiceData |
| 9 | aa | CommonPayload | ServiceData |
| 10 | fe | CommonPayload | ServiceData |
| 11 | 00 | CommonPayload | FrameType |
| 12 | xx* | UidPayload | Ranging Data |
| 13 | xx* | UidPayload | Nspace |
| 14 | xx* | UidPayload | Nspace |
| 15 | xx* | UidPayload | Nspace |
| 16 | xx* | UidPayload | Nspace |
| 17 | xx* | UidPayload | Nspace |
| 18 | xx* | UidPayload | Nspace |
| 19 | xx* | UidPayload | Nspace |
| 20 | xx* | UidPayload | Nspace |
| 21 | xx* | UidPayload | Nspace |
| 22 | xx* | UidPayload | Nspace |
| 23 | xx* | UidPayload | Instance |
| 24 | xx* | UidPayload | Instance |
| 25 | xx* | UidPayload | Instance |
| 26 | xx* | UidPayload | Instance |
| 27 | xx* | UidPayload | Instance |
| 28 | xx* | UidPayload | Instance |
| 29 | 00 | UidPayload | RFU1 |
| 30 | 00 | UidPayload | RFU2 |

\* - 可以变化

## 设备名称 {#device-name}

启用后，tag 将广播一个短载荷，其中包含配置的“Device Name”。

| Property | Description | |
| --- | --- | --- |
| Flags | Flags 字段的长度、类型和 data。用于“告知”周围扫描器设备当前所处的状态。 | 3 octets（<code>020106</code>）：<ul><li> 第 1 个 octet - length </li><li> 第 2 个 octet - type </li><li> 第 3 个 octet - data </li></ul> |
| Complette Local Name | advertisement payload 的一部分，包含 Local Name 信息。 | <ul><li> Length = 1 octet </li><li> AD type = 1 octet </li><li> Name bytes = x octets。 </li></ul> |

### Device Name PDU Payload 结构 {#device-name-pdu-payload-structure}

如果将“Device Name”配置为“TG-BT5-OUT”：

| Octet | Value | | |
| --- | --- | --- | --- |
| 0 | 02 | Flags | Flags 字段的 length |
| 1 | 01 | Flags | Flags 字段的 type |
| 2 | 06 | Flags | Flags 字段的 data |
| 3 | 0b | Length | Length byte |
| 4 | 09 | AD Type | Complete Local Name type byte |
| 5 | 54 | Name byte #1 | ASCII "T" |
| 6 | 47 | Name byte #2 | ASCII "G" |
| 7 | 2d | Name byte #3 | ASCII "-" |
| 8 | 42 | Name byte #4 | ASCII "B" |
| 9 | 54 | Name byte #5 | ASCII "T" |
| 10 | 35 | Name byte #6 | ASCII "5" |
| 11 | 2d | Name byte #7 | ASCII "-" |
| 12 | 4f | Name byte #8 | ASCII "O" |
| 13 | 55 | Name byte #9 | ASCII "U" |
| 14 | 54 | Name byte #10 | ASCII "T" |
