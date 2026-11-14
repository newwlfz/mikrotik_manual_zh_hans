---
sidebar_key: "internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-tag-advertisement-formats"
sidebar_position: 4
title: "MikroTik 标签通告格式"
sidebar_label: "MikroTik 标签通告格式"
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/bluetooth/mikrotik-beacon-manager/mikrotik-tag-advertisement-formats
captured_at: '2026-11-04T11:17:57+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

##

## 简介 {#introduction}

TG-BT5-XX 标签可以在 4 种不同模式下工作：

- 出厂休眠模式
- 配置模式
- 广播模式
- 升级模式

在广播模式下，标签会通过蓝牙广播数据包广播自身信息。所广播的信息取决于广播数据包的类型。

目前，以下是可通过 MikroTik Beacon Manager 应用配置的所有受支持类型：

DeviceName、MikroTik、[Eddystone-TLM](https://play.google.com/store/apps/details?id=com.mikrotik.android.bt5&hl=en_US&gl=US&pli=1)、[Eddystone-UID](https://github.com/google/eddystone/tree/master/eddystone-uid) 和 [iBeacon](https://developer.apple.com/ibeacon/)。

蓝牙技术在进行数据交换时使用 2 种类型的信道（各自使用不同的频率）：

- 专用于数据传输的数据信道；
- 专用于广播的广播信道。

共有 40 个独立的频段（信道），每个频段间隔 2 MHz。37、38 和 39 号信道用于广播，0-36 号用于数据传输。

在广播过程中，BLE 广播数据包会被广播出去。该数据包包含 Preamble、Access Address、PDU 和 CRS 字段。

Preamble 和 Access Address 字段帮助接收方检测帧。CRS 字段用于检查错误。PDU 定义数据包本身。

MikroTik 标签支持传统（legacy）的不可连接、不可扫描的非定向广播（`ADV_NOCONN_IND`）。在这种情况下，Payload 由 "AdvA"（包含广播方地址信息的字段）和 "AdvData"（包含数据信息的字段）字段组成。

1 个八位组 = 1 个字节 = 8 位

| 属性 | 描述 |
| --- | --- |
| Preamble | 1 个八位组 |
| Access-Address | 4 个八位组 |
| PDU |PDU Header = 2 个八位组 PDU Payload = AdvA（6 个八位组）+AdvData（0...31 个八位组）|
| CRS | 3 个八位组 |

## MikroTik 数据包结构 {#mikrotik-packet-structure}

"AdvData" 字段结构（最多 31 个八位组/字节）：

| 属性 | 描述 | |
| --- | --- | --- |
| Flags | Flags 字段的长度、类型和数据。用于"告知"周围的扫描器设备处于何种状态。 | 3 个八位组（`020106`）：  第 1 个八位组 - 长度  第 2 个八位组 - 类型 第 3 个八位组 - 数据|
| Length | 载荷的长度。 | 1 个八位组（`15`） |
| Type | 厂商特定数据。 | 1 个八位组（`ff`） |
| ManufacturerData | 公司标识符。 | 2 个八位组（`4F09`） |
| Version | 此广播结构的版本。 | 1 个八位组（uint） |
| UserData | 用户配置的载荷部分。 | 1 个八位组（uint） |
| Secret | 载荷中可选加密（AES-ECB）的部分。 |  secret: salt（用于加密的盐值）= 2 个八位组（uint）  secret: acceleration（加速度，采用有符号 8.8 定点格式，三个轴的加速度（0=x，1=y，2=z））= 6 个八位组（uint）  secret: temperature（环境温度，单位为摄氏度，采用有符号 8.8 定点格式）= 2 个八位组（int）  secret: uptime（运行时间，单位为秒）= 4 个八位组（uint）  secret: flags（标志位掩码）= 1 个八位组（uint）  secret: batteryPercentage（电池电量百分比）= 1 个八位组（uint）  |

:::info
请注意，所有多字节数值均为小端序。这意味着，例如，如果你想获取温度值，而第 14 和第 15 个八位组表示的温度为 "a1 19"（"正"温度）→ 实际温度值将是 (0x19a1)/256 = 25.6 C。
:::
关于如何将载荷的**十六进制**值转换为**十进制**值的详细示例，将在后文的 **PDU 载荷结构** 章节中展示。

UserData 和 Secret 字段借助 `flags` 进行配置。在 "UserData" 部分中，控制 "Secret" 是否加密的参数名为 `FLAG_ENCRYPTED`。当 `FLAG_ENCRYPTED=0` 时，表示 secret 未加密（第 6 个八位组中的第 1 位将置为 0）；当 `FLAG_ENCRYPTED=1` 时，表示 secret 已加密（第 6 个八位组中的第 1 位将置为 1）。

在 "Secret" 部分中共有 7 个 `flags`（第 24 个八位组）：

- `FLAG_REED_SWITCH`（第 1 位 - 若置为 1，表示广播时簧片开关处于闭合状态）
- `FLAG_ACCEL_TILT`（第 2 位 - 若置为 1，表示该广播是通过倾斜设备发送的）
- `FLAG_ACCEL_FREE_FALL`（第 3 位 - 若置为 1，表示该广播是通过使设备自由落体发送的）
- `FLAG_IMPACT_X`（第 4 位 - 若置为 1，表示广播时在 x 轴上受到了冲击）
- `FLAG_IMPACT_Y`（第 5 位 - 若置为 1，表示广播时在 y 轴上受到了冲击）
- `FLAG_IMPACT_Z`（第 6 位 - 若置为 1，表示广播时在 z 轴上受到了冲击）
- `FLAG_ACCEL_DISABLED`（第 7 位 - 若置为 1，表示加速度计已被禁用）
例如，如果你看到十六进制消息的第 24 个八位组为 "02"（将 **十六进制** 值 "02" 转换为 **二进制** 即为 "0010" → 第 2 位置为 1）→ 表示设备被倾斜了。如果看到 "04"（**十六进制** "04" 转换为 **二进制** 为 "0100" → 第 3 位置为 1）→ 表示设备被掉落（触发了自由落体）。如果看到 "38"（**十六进制** 转换为 **二进制** 为 "00111000" → 第 4、5、6 位均置为 1）→ 表示在发送广播时，加速度计在 x/y/z 三个轴上都检测到冲击/唤醒。

更多示例（针对第 24 个八位组的值）：

- "08" 表示仅在 x 轴上受到冲击；
- "18" 表示在 x 轴和 y 轴上受到冲击；
- "28" 表示在 x 轴和 z 轴上受到冲击；
- "10" 表示仅在 y 轴上受到冲击；
- "30" 表示在 y 轴和 z 轴上受到冲击；
- "20" 表示仅在 z 轴上受到冲击。
- "40" 表示加速度计已禁用。

### MikroTik PDU 载荷结构 {#mikrotik-pdu-payload-structure}

| 八位组 | 值 | | |
| --- | --- | --- | --- |
| 0 | 02 | Flags | flags 字段的长度 |
| 1 | 01 | Flags | flags 字段的类型 |
| 2 | 06 | Flags | flags 字段的数据 |
| 3 | 15 | Length | 载荷的长度 |
| 4 | FF | Type | 厂商特定数据 |
| 5 | 4F | 公司标识符 | MikroTik |
| 6 | 09 | 公司标识符 | MikroTik |
| 7 | 01 | Version | 此广播结构的版本 |
| 8 | 00 | UserData | 用户配置的载荷部分 |
| 9 | xx* | Secret | secret: 盐值 |
| 10 | xx* | Secret | secret: 盐值 |
| 11 | xx* | Secret | secret: X 轴加速度 |
| 12 | xx* | Secret | secret: X 轴加速度 |
| 13 | xx* | Secret | secret: Y 轴加速度 |
| 14 | xx* | Secret | secret: Y 轴加速度 |
| 15 | xx* | Secret | secret: Z 轴加速度 |
| 16 | xx* | Secret | secret: Z 轴加速度 |
| 17 | xx* | Secret | secret: 温度 |
| 18 | xx* | Secret | secret: 温度 |
| 19 | xx* | Secret | secret: 运行时间 |
| 20 | xx* | Secret | secret: 运行时间 |
| 21 | xx* | Secret | secret: 运行时间 |
| 22 | xx* | Secret | secret: 运行时间 |
| 23 | 00 | Secret | secret: flags |
| 24 | xx* | Secret | secret: batteryPercentage |

\* - 可能有所不同

#### 示例 {#example}

以 MikroTik 格式配置的载荷（非加密）示例如下：

| 02010615ff4f090100cea6000000000200a01c91085700005f |
| --- |

**020106**（前 3 个八位组）→ Flags 字段的长度、类型和数据。

**15ff4f09**（第 4、5、6、7 个八位组）→ Length（0x15 **十六进制转十进制** 为 21）。Type（0xff）。公司标识符（0x4f09）。

**01**（第 8 个八位组）  →  载荷结构的当前版本。每个载荷都应相同（常量数据）。

**00**（第 9 个八位组）→ 表示该载荷未加密。"01" 则表示已加密。

**cea6**（第 10 和第 11 个八位组）→ 盐值。每个新载荷都应生成不同的盐值。你可以使用该值来检查相同的载荷是否被以不同方式加密。**该值本身不包含任何有用的信息**。如果你发现两个在不同时间间隔收到的载荷具有相同的盐值，那就说明收到的这两个载荷完全相同。你可以使用与运行时间计算相同的原理来计算盐值 - 见下文。

**0000**（第 12 和第 13 个八位组）→ 广播时刻 X 轴的加速度 = **0 m/s<sup>2</sup>**。请参阅下文 Z 轴的加速度计算。

**0000**（第 14 和第 15 个八位组）→ 广播时刻 Y 轴的加速度 = **0 m/s<sup>2</sup>**。请参阅下文 Z 轴的加速度计算。

**0200**（第 16 和第 17 个八位组）→ 广播时刻 Z 轴的加速度 = **0.0078 m/s<sup>2</sup>**。要从十六进制格式得到十进制值，需要按以下步骤操作：

- 如前所述，多字节数值为小端序，这意味着要计算真实值，需要交换八位组的位置（交换八位组顺序）。因此第一步是把 0x**0200** 的值交换为 0x**0002**。0x**0002** 从**十六进制**转换为**十进制**是 **02**。
- 请记住，加速度采用有符号 8.8 定点格式（二进制补码），这意味着你基本上需要将结果除以 "256"。第二步是将该值除以 256 → (0x**0002** **十六进制** 或 **02** **十进制**)/256 = 0.0078 m/s<sup>2</sup>。
- 同样的计算原理适用于 X 轴和 Y 轴的加速度。在我们的示例中，它们恰好为 0 → 0x0000/256=0。

**a01c**（第 18 和第 19 个八位组）→ 标签检测到的温度（摄氏度）= **28.625 C**。温度采用小端序（因为它是多字节值），并且采用 **有符号 16 位整数 [二进制补码] 8.8 定点格式**，因此这里同样适用相同的"公式"：
0x1ca0/256=28.625 C。

**91085700**（第 20、21、22、23 个八位组）→ 标签的运行时间（秒）= **5703825 s**。0x91085700 为小端序，因此只需将八位组交换为 0x00570891，结果即为十进制的 5703825。也就是 1584.395833 小时，或 66 天的运行时间。

**00**（第 24 个八位组）→ 发送该载荷的触发器（标志）。如果为 "**00**"，表示未检测到任何触发器，它只是一个周期性广播的载荷（基于为标签配置的广播间隔）。如果该值为 "**04**"，则表示设备被掉落（触发了自由落体）。有关 "flags" 和 "Secret" 的更多信息，可在上文 **数据包结构** 章节中找到。

**5f**（第 25 个八位组）→ 标签的电池电量百分比 = **95 %**。0x**5f** 从十六进制转换为十进制是 95。

:::info
从 v**7.11** 开始，你可以使用 Peripheral Device 部分和/或 Decode-ad 功能来查看解码后的值！
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

你唯一需要修改的行是：

```
:local addressRegex "2C:C8:1B:4B:BB:0A"
```

这一行，你需要在此输入标签的 MAC 地址。

用任意你喜欢的名称保存脚本，例如 **decode**。

通过命令行界面（Winbox/Webfig 中的 "**New Terminal**" 按钮）运行脚本：

```ros
[admin@MikroTik] > system script run decode
0: address=2C:C8:1B:4B:BB:0A ts=1662553431348 rssi=-45 version=1 encrypted=0 salt=57919 accelX=3 accelY=-35 accelZ=-70 temp=25535 uptime=1046174 flags="" bat=99
1: address=2C:C8:1B:4B:BB:0A ts=1662553436349 rssi=-40 version=1 encrypted=0 salt=24154 accelX=-19 accelY=-23 accelZ=0 temp=25546 uptime=1046179 flags="" bat=99
2: address=2C:C8:1B:4B:BB:0A ts=1662553446351 rssi=-37 version=1 encrypted=0 salt=37822 accelX=-15 accelY=35 accelZ=15 temp=25550 uptime=1046189 flags="" bat=99
```

从上面的示例可以看到，脚本会将所有载荷从**十六进制**格式"翻译"为**十进制**格式，并将它们打印到终端中。

你还可以进一步修改脚本，用这些"已解码"的值构造一条消息，并将其发送到你所选择的 EMAIL、MQTT 或 HTTP 服务器，**但是！**请记住，这可能会给设备带来更大的负载。因此你需要测试运行该脚本时的性能。在服务器端进行解码对 RouterOS 资源来说会更轻松。
:::info
由于不支持浮点数 → 小数点之后的每次计算都会"向上取整"为整数。这就是脚本计算温度和加速度值时会**乘以 1000**（放大 **1000** 倍）的原因。
因此，如果你看到温度为 **temp=25546**，则实际温度为 **25.546 C**（25546/1000）；如果你看到 **accelZ=15**，则相对 z 轴的实际加速度为 **0.015 m/s<sup>2</sup>**（15/1000）。
:::

## iBeacon 数据包结构 {#ibeacon-packet-structure}

iBeacon 是受支持的广播数据包类型之一。你可以通过[链接](https://en.wikipedia.org/wiki/IBeacon)了解有关该协议的更多信息。

在这种情况下，PDU Payload 由 "AdvA"（长度为 6 个八位组）和 "AdvData"（包含数据信息的字段）字段组成。传统蓝牙设备只能支持 31 字节长的信标消息。UUID 长度为 16 字节（MikroTik 默认 UID=b2b98de4-c81c-47c2-b14e-791b3e5587ec）。

"AdvData" 字段结构：

| 属性 | 描述 | |
| --- | --- | --- |
| Flags | Flags 字段的长度、类型和数据。用于"告知"周围的扫描器设备处于何种状态。 | 3 个八位组（`020106`）：  第 1 个八位组 - 长度  第 2 个八位组 - 类型  第 3 个八位组 - 数据 |
| ManufacturerData | 公司标识符 | 4 个八位组（`1aff4c00`） |
| BeaconType | 次级标识符 | 1 个八位组（const） |
| RemainingDataLength | 以字节为单位定义载荷的剩余长度 | 1 个八位组（const） |
| UserData | 用户配置的载荷部分 |  Proximity UUID（通用唯一标识符）= 16 个八位组（uint）  Major Number（特定分组标识符）= 2 个八位组（uint）  Minor Number（特定信标标识符）= 2 个八位组（uint） |
| TxPower | 表示距设备一米处的信号强度 | 1 个八位组（int） |

### iBeacon PDU 载荷结构 {#ibeacon-pdu-payload-structure}

| 八位组 | 值 | | |
| --- | --- | --- | --- |
| 0 | 02 | Flags | flags 字段的长度 |
| 1 | 01 | Flags | flags 字段的类型 |
| 2 | 06 | Flags | flags 字段的数据 |
| 3 | 1a | ManufacturerData | 公司标识符 |
| 4 | ff | ManufacturerData | 公司标识符 |
| 5 | 4c | ManufacturerData | 公司标识符 |
| 6 | 00 | ManufacturerData | 公司标识符 |
| 7 | 02 | BeaconType | 次级标识符 |
| 8 | 15 | RemainingDataLength | 以字节为单位定义载荷的剩余长度 |
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
| 25 | xx* | UserData | 主版本号 |
| 26 | xx* | UserData | 主版本号 |
| 27 | xx* | UserData | 次版本号 |
| 28 | xx* | UserData | 次版本号 |
| 29 | xx* | TxPower | 表示距设备一米处的信号强度 |

\* - 可能有所不同

## Eddystone-TLM 数据包结构 {#eddystone-tlm-packet-structure}

Eddystone-TLM 是受支持的广播数据包类型之一。你可以通过[链接](https://github.com/google/eddystone/blob/master/eddystone-tlm/tlm-plain.md)了解有关该协议的更多信息。

在这种情况下，PDU Payload 由 "AdvA"（长度为 6 个八位组）和 "AdvData"（包含数据信息的字段）字段组成。MikroTik 默认 CompleteUUID=03 03 aa fe；ServiceData=11 16 aa fe。

"AdvData" 字段结构：

| 属性 | 描述 | |
| --- | --- | --- |
| Flags | Flags 字段的长度、类型和数据。用于"告知"周围的扫描器设备处于何种状态。 | 3 个八位组（`020106`）：  第 1 个八位组 - 长度  第 2 个八位组 - 类型  第 3 个八位组 - 数据 |
| CommonPayload | 所有 Eddystone 帧类型共有的广播载荷部分 |  CompleteUUID（通用唯一标识符）= 4 个八位组（const）  ServiceData（*16 位 UUID* 数据类型）= 4 个八位组（const）  FrameType（值 = `0x20`）= 1 个八位组（const） |
| TlmPayload | Eddystone-TLM 帧载荷 |  Version（TLM 版本）= 1 个八位组（const）  BatteryVoltageMv（电池电压，1 mV/位）= 2 个八位组（uint）  TemperatureC（信标温度，单位为摄氏度）= 2 个八位组（int）  AdvertisementCount（广播 PDU 计数）= 4 个八位组（uint）  UptimeCounter（自开机或重启以来的时间）= 4 个八位组（uint） |

### Eddystone-TLM PDU 载荷结构 {#eddystone-tlm-pdu-payload-structure}

| 八位组 | 值 | | |
| --- | --- | --- | --- |
| 0 | 02 | Flags | flags 字段的长度 |
| 1 | 01 | Flags | flags 字段的类型 |
| 2 | 06 | Flags | flags 字段的数据 |
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

\* - 可能有所不同

## Eddystone-UID 数据包结构 {#eddystone-uid-packet-structure}

Eddystone-UID 是受支持的广播数据包类型之一。你可以通过[链接](https://github.com/google/eddystone/blob/master/eddystone-uid/README.md)了解有关该协议的更多信息。

在这种情况下，PDU Payload 由 "AdvA"（长度为 6 个八位组）和 "AdvData"（包含数据信息的字段）字段组成。MikroTik 默认 CompleteUUID=03 03 aa fe；ServiceData=17 16 aa fe。

"AdvData" 字段结构：

| 属性 | 描述 | |
| --- | --- | --- |
| Flags | Flags 字段的长度、类型和数据。用于"告知"周围的扫描器设备处于何种状态。 | 3 个八位组（`020106`）：  第 1 个八位组 - 长度  第 2 个八位组 - 类型  第 3 个八位组 - 数据 |
| CommonPayload | 所有 Eddystone 帧类型共有的广播载荷部分 |  CompleteUUID（通用唯一标识符）= 4 个八位组（const）  ServiceData（*16 位 UUID* 数据类型）= 4 个八位组（const）  FrameType（值 = `0x00`）= 1 个八位组（const） |
| UidPayload | Eddystone-UID 帧载荷 |  Ranging Data（0 米处校准的发射功率）= 1 个八位组（int）  Nspace（自行分配的唯一信标 ID 命名空间）= 10 个八位组（uint）  Instance（命名空间内的唯一 ID）= 6 个八位组（uint）  RFU1（保留供将来使用，值=`0x00`）= 1 个八位组（const）  RFU2（保留供将来使用，值=`0x00`）= 1 个八位组（const） |

### Eddystone-UID PDU 载荷结构 {#eddystone-uid-pdu-payload-structure}

| 八位组 | 值 | | |
| --- | --- | --- | --- |
| 0 | 02 | Flags | flags 字段的长度 |
| 1 | 01 | Flags | flags 字段的类型 |
| 2 | 06 | Flags | flags 字段的数据 |
| 3 | 03 | CommonPayload | CompleteUUID |
| 4 | 03 | CommonPayload | CompleteUUID |
| 5 | aa | CommonPayload | CompleteUUID |
| 6 | fe | CommonPayload | CompleteUUID |
| 7 | 17 | CommonPayload | ServiceData |
| 8 | 16 | CommonPayload | ServiceData |
| 9 | aa | CommonPayload | ServiceData |
| 10 | fe | CommonPayload | ServiceData |
| 11 | 00 | CommonPayload | FrameType |
| 12 | xx* | UidPayload | 测距数据 |
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

\* - 可能有所不同

## 设备名称 {#device-name}

启用后，标签将广播一个包含所配置 "Device Name" 的短载荷。

| 属性 | 描述 | |
| --- | --- | --- |
| Flags | Flags 字段的长度、类型和数据。用于"告知"周围的扫描器设备处于何种状态。 | 3 个八位组（`020106`）：  第 1 个八位组 - 长度  第 2 个八位组 - 类型  第 3 个八位组 - 数据 |
| Complette Local Name | 广播载荷中包含本地名称信息的部分。 |  Length = 1 个八位组  AD type = 1 个八位组  Name bytes = x 个八位组。 |

### 设备名称 PDU 载荷结构 {#device-name-pdu-payload-structure}

如果我们将 "Device Name" 配置为 "TG-BT5-OUT"：

| 八位组 | 值 | | |
| --- | --- | --- | --- |
| 0 | 02 | Flags | flags 字段的长度 |
| 1 | 01 | Flags | flags 字段的类型 |
| 2 | 06 | Flags | flags 字段的数据 |
| 3 | 0b | Length | 长度字节 |
| 4 | 09 | AD Type | 完整本地名称的类型字节 |
| 5 | 54 | 名称字节 #1 | ASCII "T" |
| 6 | 47 | 名称字节 #2 | ASCII "G" |
| 7 | 2d | 名称字节 #3 | ASCII "-" |
| 8 | 42 | 名称字节 #4 | ASCII "B" |
| 9 | 54 | 名称字节 #5 | ASCII "T" |
| 10 | 35 | 名称字节 #6 | ASCII "5" |
| 11 | 2d | 名称字节 #7 | ASCII "-" |
| 12 | 4f | 名称字节 #8 | ASCII "O" |
| 13 | 55 | 名称字节 #9 | ASCII "U" |
| 14 | 54 | 名称字节 #10 | ASCII "T" |
