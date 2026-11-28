---
title: "Bluetooth"
description: "本页介绍 MikroTik RouterOS 的 Bluetooth IoT 功能，涵盖 Bluetooth 信道结构、广播数据包格式以及通过 `/iot/bluetooth` 子菜单进行的配置。文中说明 PDU 类型、天线选择和用于 Bluetooth 芯片管理的设备命名，并介绍对 iot 软件包或 USB-Bluetooth dongle 支持的要求。"
tags:
  - 'bluetooth'
  - 'iot'
  - 'packet-structure'
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/bluetooth
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "memory"
---

本节介绍基于 Bluetooth 的 IoT 示例。使用它配置 Bluetooth 标签跟踪，并将采集到的数据与 MQTT 和 ThingsBoard 集成。

<DocCardList />

Bluetooth 是一种短距离无线技术，可通过特定 Bluetooth 信道广播数据。

共有 40 个唯一频段（信道），每个频段间隔 2 MHz。信道 37、38 和 39 用于主广播，0-36 用于数据传输。

在广播过程中，会广播 BLE 广播数据包。该数据包包含 Preamble、Access Address、PDU 和 CRC 字段。

Preamble 和 Access Address 字段帮助接收方检测帧。CRC 字段用于检查错误。PDU 由 PDU Header 和 PDU Payload 组成。PDU 定义数据包本身。

PDU Header 包含有关 PDU 类型的信息。根据类型不同，payload 字段可能有所不同。

例如，当 PDU 类型为 ADV\_NOCONN\_IND 时 → PDU Payload 由“AdvA”（包含广播者地址信息的字段）和“AdvData”（包含数据信息的字段）组成：

1 个八位组 = 1 个字节 = 8 位

| 名称 | 长度 |
| :-- | :-- |
| Preamble | 1 octet |
| Access-Address | 4 octets |
| PDU | <ul><li>PDU Header = 2 octets</li><li>PDU Payload = AdvA (6 octets)+AdvData (0...31 octets)</li></ul> |
| CRC | 3 octets |

有不同的 PDU 类型：

- ADV\_IND（payload 由 AdvA [6octets] + AdvData [0-31 octets] 组成，用于可连接、可扫描的非定向广播）。
- ADV\_NOCONN\_IND（payload 由 AdvA [6octets] + AdvData [0-31 octets] 组成，用于不可连接、不可扫描的非定向广播）。
- ADV\_SCAN\_IND（payload 由 AdvA [6octets] + AdvData [0-31 octets] 组成，用于可扫描的非定向广播）。
- SCAN\_REQ（payload 由 ScanA [6octets] + AdvA [6octets] 组成，其中 ScanA 字段包含扫描器的地址，AdvA 包含广播设备的地址，用于请求 SCAN\_RSP 响应）。
- SCAN\_RSP（payload 由 AdvA [6octets] + ScanRspData [0-31 octets] 组成，其中 ScanRspData 可以包含来自广播设备主机的任意数据，用于响应 SCAN\_REQ 请求）。
- ADV\_DIRECT\_IND（payload 由 AdvA [6octets] + TargetA [6octets] 组成，其中 TargetA 是 PDU 所指向的设备地址字段，用于可连接的定向广播）。
- 等。

有关数据包结构的更多信息，请参阅[此处](https://www.bluetooth.com/specifications/specs/core-specification/)（Bluetooth specifications）。

RouterOS 中 Bluetooth 接口的主要应用是监控其他设备（例如 [Bluetooth tags](https://help.mikrotik.com/docs/display/UM/TG-BT5-IN)）广播的 Bluetooth 广播数据包（scanner 功能），或广播广播数据包（advertiser 功能）。

## 配置 {#configuration}

**子菜单：** `/iot/bluetooth`

:::info
内置 Bluetooth 芯片的设备（如 [KNOT](https://mikrotik.com/product/knot) 或 [KNOT Embedded LTE](https://mikrotik.com/product/knot_embedded_lte4)）需要 **iot** 软件包。

如果设备为 ARM、ARM64 架构且具有 USB 插槽，则 **iot-bt-extra** 软件包可通过 USB-Bluetooth dongle 启用 Bluetooth 功能。并非所有 Bluetooth 适配器都经过测试。适配器必须支持 **LE 4.0+**。目前尚无“peripheral”列表。

**Iot** 软件包从 RouterOS 6.48.3 开始提供。**Iot-bt-extra package** 从 RouterOS 7.18 开始提供。可从[下载页面](https://mikrotik.com/download)中的“Extra packages”获取。
:::

### 设备 {#devices}

在此菜单中，可查看和设置 Bluetooth 芯片的常规参数：

```ros
/iot/bluetooth/print
Columns: NAME, PUBLIC-ADDRESS, RANDOM-STATIC-ADDRESS, ANTENNA
  #  NAM  PUBLIC-ADDRESS     RANDOM-STATIC-ADD  ANTENNA 
  0  bt1  00:00:00:00:00:00  F4:4E:E8:04:77:3A  internal
/iot/bluetooth/set
```

***note**：* 公共地址是 IEEE 注册的永久地址，无法更改。在上述“print”示例中，设备未分配公共地址（所有八位字节均设置为 0）。

可配置项如下所示：

| 属性 | 描述 |
| :-- | :-- |
| **antenna** (*string*；默认：internal) | 选择使用内部或外部 Bluetooth 天线 |
| **name** (*string*；默认：) | Bluetooth 芯片/接口的描述性名称 |
| **random-static-address** (*MAC address*；默认：) | Bluetooth 芯片的用户可配置地址 |

可使用以下命令监控芯片统计信息：

```ros
/iot/bluetooth/print stats
Columns: NAME, RX-BYTES, TX-BYTES, RX-ERRORS, TX-ERRORS, RX-EVT, TX-CMD, RX-ACL, TX-ACL
  #  NAM  RX-BYTE  TX-  R  T  RX-EV  TX  R  T
  0  bt1  1857835  235  0  0  46677  45  0  0
```

### Advertisers

在此菜单中，可以设置 Bluetooth 芯片广播广告数据包。可以使用以下命令检查和设置 advertiser 设置：

```ros
/iot/bluetooth/advertisers/print
Flags: X - DISABLED
Columns: DEVICE, MIN-INTERVAL, MAX-INTERVAL, OWN-ADDRESS-TYPE, CHANNEL-MAP, AD-SIZE
#   DEVICE  MIN-INTERVAL  MAX-INTERVAL  OWN-ADDRESS-TYPE  CHANNEL-MAP  AD-SIZE
0 X bt1     1280ms        2560ms        random-static              37        0
                                                                   38         
                                                                   39         
/iot/bluetooth/advertisers/set
```

可配置项如下所示：

| Property | Description |
| :-- | :-- |
| **ad-structures** (*string*; Default: ) | 为广告数据包选择预配置结构。详情请参阅“AD structures”部分。 |
| **channel-map** (*37 \| 38 \| 39*; Default: 37, 38, 39) | 用于广播的信道。 |
| **disabled** (*yes \| no*; Default: **yes**) | 用于禁用或启用 Bluetooth 芯片广播广告数据包的选项。 |
| **max-interval** (*integer:*20..10240;** Default: **2560** **ms**) | 广播广告数据包的最大间隔。 |
| **min-interval** (*integer:*20..10240;** Default: **1280 ms**) | 广播广告数据包的最小间隔。 |
| **own-address-type** (*public \| random-static \| rpa-fallback-to-public \| rpa-fallback-to-random*; Default: **random-static**) | 广告数据包有效载荷中使用的 MAC 地址：<br/><ul><li>public → 使用 IEEE 注册的永久地址。</li><li>random-static → 使用用户可配置的地址（将在下次断电重启后更改）。</li><li>rpa-fallback-to-public → 使用 Resolvable Random Private Address（RPA），只有当接收方拥有我们的 Identity Resolving Key（IRK）时才能解析该地址。如果无法生成 RPA，则改用 public 地址。</li><li>rpa-fallback-to-random → 与“rpa-fallback-to-public”相同，但如果无法生成 RPA，则改用 random-static 地址。</li></ul> |
| **phy** (*1M \| 2M \| CODED*; default: **1M**) | 设置设备在广播时使用的“physical layer”：<br/><ul><li>CODED → 最低速率 125 kbps = 更远覆盖范围；</li><li>1M → 标准速率 1 Mbps = 平均覆盖范围；</li><li>2M → 最高速率 2 Mbps = 较短覆盖范围；</li></ul><br/><strong>重要：</strong> CODED 仅受 <a href="https://mikrotik.com/product/knot_embedded_lte4" target="_blank" rel="noopener noreferrer">KNOT Embedded LTE</a> 支持。 <br/> |
| **legacy** (*yes \| no*) | 设置广告类型 → extended 或 legacy。<br/> 使用 <code>legacy=no</code> 时，AD structure 长度可扩展至 191 字节。使用 <code>legacy=yes</code> 时，AD structure 长度限制为 31 字节。<br/> Legacy advertising 仅使用“primary” Bluetooth 信道广播有效载荷。Extended advertising 同时使用“primary”和“secondary”信道。<br/> |

***note**：* 广告数据包将按 *min-interval* \<= **X** \<= *max-interval* 毫秒的间隔广播。

### AD 结构 {#ad-structures}

此部分允许定义将由 Bluetooth 芯片广播的广告数据包的有效载荷。

目前仅支持 4 种类型：0x08 “Shortened Local Name”；0x09 “Complete Local Name”；0xFF “Manufacturer Specific Data”；“Service Data”

可以使用以下命令检查和设置“AD structures”设置：

```ros
/iot/bluetooth/advertisers/ad-structures/print
Columns: NAME, TYPE, DATA
#  NAME  TYPE              DATA
0  test  short-local-name  TEST
/iot/bluetooth/advertisers/ad-structures/set 
```

可配置属性如下所示：

| 属性 | 说明 |
| :-- | :-- |
| **data** (*string*；默认值：) | 定义广播数据包中有效载荷的 AdvData 部分 |
| **name**(*string*；默认值：) | AD 结构的描述性名称 |
| **type** (complete-local-name \| manufacturer-data \| short-local-name \| service-data；默认值：) | 用于设置 AD 结构类型的选项：<br/><ul><li>0x08 “Shortened Local Name”（采用“text”格式）</li><li>0x09 “Complete Local Name”（采用“text”格式）</li><li>0xFF “Manufacturer Specific Data”（采用“hex”格式）</li><li>0x20 “Service Data 32-bit”（采用“hex”格式）</li></ul> |

例如，如果选择“Shortened Local Name”类型，并将“data”字段配置为“TEST”，则有效载荷的 AdvData 部分将如下所示：

05 08 54 45 53 54（十六进制格式）

其中，第一个八位字节（05）表示后续字节数（5 字节），第二个八位字节（08）表示类型（Shortened Local Name）。第 3、4、5、6 个（等）八位字节为“data”[54（hex）=**T**（ASCII），45（hex）=**E**（ASCII），53（hex）=**S**（ASCII），54（hex）=**T**（ASCII）]。

“Complete Local Name”类型同理。仅 AdvData 有效载荷中的第二个八位字节不同，将设置为 09。

对于“Manufacturer Specific Data”类型，需要以十六进制格式配置“data”字段。该类型的第二个八位字节将设置为 FF。

### Connections

:::info
从 v**7.12beta9** 开始可用。
:::

目前仅支持 `central` 角色。不支持 `Peripheral device` 角色、`pairing` 和 `encryption` 选项。

可用分区如下：

| Section | Description |
| :-- | :-- |
| async-data | 用于查看已订阅的数据。 |
| characteristics | 用于查看设备支持的所有特征。 |
| connect | 用于连接处于 `connactable` 状态的设备。 |
| disconnect | 用于断开与设备的连接。 |
| read | 用于读取特征值。 |
| write | 用于写入特征值。 |
| subscribe | 用于订阅特征值。 |
| unsubscribe | 用于取消订阅特征值。 |

要连接处于 `connectable` 状态的 Bluetooth 设备，请使用以下命令（其中 `pdev` 是设备地址）：

```ros
/iot/bluetooth/connections/connect pdev=DC:2C:6E:0F:C0:3D
```

:::info
要连接 TG-BT5-IN/OUT 标签，请通过将磁铁靠近磁性开关，使其进入 `connectable` 状态。
:::

查看已建立的连接：

```ros
/iot/bluetooth/connections/print
```

查看设备特征：

```ros
/iot/bluetooth/connections/characteristics/print
Columns: PDEV, NAME, UUID
 #  PDEV               NAME                              UUID                            
 0  DC:2C:6E:0F:C0:3D  Service Changed                   2a05                            
 1  DC:2C:6E:0F:C0:3D  Database Hash                     2b2a                            
 2  DC:2C:6E:0F:C0:3D  Client Supported Features         2b29                            
 3  DC:2C:6E:0F:C0:3D  Device Name                       2a00                            
 4  DC:2C:6E:0F:C0:3D  Appearance                        2a01                            
...
...
...
```

要读取特定特征，请指定 `pdev` 地址和 `uuid`：

```ros
/iot/bluetooth/connections/read pdev=DC:2C:6E:0F:C0:3D uuid=2a00
```

### Scanners

在此菜单中，可以设置 Bluetooth 芯片的扫描器设置。禁用时，设备将无法再接收 advertising reports。启用时，可以在“Advertising reports”选项卡中监控 advertising reports（本指南稍后将进行说明）。可以使用以下命令检查和设置扫描器设置：

```ros
/iot/bluetooth/scanners/print
Flags: X - DISABLED
Columns: DEVICE, TYPE, INTERVAL, WINDOW, OWN-ADDRESS-TYPE, FILTER-POLICY, FILTER-DUPL
ICATES
#   DEVICE  TYPE     INTERVAL  WINDOW  OWN-ADDRESS-TYPE  FILTER-POLICY  FIL
0 X bt1     passive  10ms      10ms    random-static     default        off
/iot/bluetooth/scanners/set
```

可配置属性如下所示：

| Property | Description |
| :-- | :-- |
| **disabled** (*yes \| no*；默认：**no**) | 用于禁用或启用 Bluetooth 芯片接收 advertising reports 的选项。 |
| **filter-duplicates** (keep-newest \| keep-oldest \| keep-unique \| off；默认：**off**) | 用于丢弃来自同一 advertiser 的重复广播的选项：<br/><ul><li>keep-newest → 保留最新的报告（丢弃最旧的报告）。仅保留来自单个 AdvA 的最新 PDU。</li><li>keep-oldest → 保留最旧的报告（丢弃最新的报告）。仅保留来自单个 AdvA 的最旧 PDU。此类 PDU 过滤发生在控制器级别，因此在能耗和带宽方面是最有效的重复过滤方法。</li><li>keep-unique → 仅显示具有唯一 payload 的广播。也就是说，如果找到 1 个或多个相同的 payload（AdvData），仅显示第一个 payload，“clones”将被丢弃或忽略。</li><li>off → 不丢弃重复项。保留具有相同 AdvA 的所有 PDU。</li></ul><br/><strong>重要：</strong>重复 advertising report 是从同一设备地址发送的 advertising report。实际数据（payload 的“AdvData”部分）可能发生变化或不同，在判断重复 advertising report 时不视为重要因素。也就是说，例如，如果 Bluetooth 接口从同一标签接收到 10 个 payload（每隔 1 秒接收一个 payload）：<br/><ul><li>如果使用“keep-oldest”设置 → Bluetooth 接口将仅显示从该标签接收到的第一个 payload（后续 9 个 payload 将被过滤掉）。<br/></li><li>如果使用“keep-newest”设置 → Bluetooth 接口将仅显示从该标签接收到的最后一个 payload（每个后续 payload 都会覆盖前一个 payload）。</li></ul> |
| **filter-policy** (default \| whitelist *\| no*；默认：**default**) | 用于设置过滤策略的选项（控制器级别的广播过滤）：<br/><ul><li>default → 启用此策略时，扫描器仅接受 ADV_IND、ADV_NOCONN_IND、ADV_SCAN_IND、SCAN_RSP 和 ADV_DIRECT_IND（其中 TargetA 是扫描器自身的 Bluetooth 地址）PDU 类型。</li><li>whitelist → 启用此策略时，扫描器仅接受由 advertiser 广播的 ADV_IND、ADV_NOCONN_IND、ADV_SCAN_IND、SCAN_RSP PDU 类型，该 advertiser 的地址在“Whitelist”部分中配置；同时接受 ADV_DIRECT_IND 类型的 PDU（其中 TargetA 是扫描器自身的 Bluetooth 地址）。</li></ul> |
| **interval** (*integer:3..10240*；**默认：** **10 ms**) | 扫描器开始扫描下一个 advertising channel 之前等待的时间。 |
| **own-address-type** (*public \| random-static \| rpa-fallback-to-public \| rpa-fallback-to-random*；默认：**random-static**) | 扫描请求中使用的地址类型（如果使用主动扫描类型）：<br/><ul><li>public → 使用 IEEE 注册的永久地址。</li><li>random-static → 使用用户可配置的地址（将在下次断电重启后更改）。</li><li>rpa-fallback-to-public → 使用 Resolvable Random Private Address（RPA），该地址只能通过我们的 Identity Resolving Key（IRK）解析。如果无法生成 RPA，则改用 public 地址。</li><li>rpa-fallback-to-random → 与“rpa-fallback-to-public”相同，但如果无法生成 RPA，则改用 random-static 地址。</li></ul> |
| **type** (*active \| passive;*；默认：**passive**) | 定义扫描器的类型：<br/><ul><li>active → 扫描器在接收到可扫描广播时可以发送扫描请求。扫描器可以发送 SCAN_REQ 以获取 SCAN_RSP 响应。</li><li>passive → 扫描器仅监听广播，不发送任何数据（例如扫描请求）。</li></ul> |
| **window** (*integer:3..10240;*；默认：**10 ms**) | 扫描器扫描单个 advertising channel 所花费的时间。 |
| **phy** (*1M \| 2M \| CODED*；默认：**1M**) | 设置设备在扫描期间使用的“physical layer”：<br/><ul><li>CODED → 最低速率 125 kbps，覆盖范围更长；</li><li>1M → 标准速率 1 Mbps，覆盖范围一般；</li><li>2M → 最高速率 2 Mbps，覆盖范围较短；</li></ul><br/><strong>重要：</strong>CODED 仅受 <a href="https://mikrotik.com/product/knot_embedded_lte4" target="_blank" rel="noopener noreferrer">KNOT Embedded LTE</a> 支持。<br/><br/> |

例如，如果扫描器 interval 设置为 20ms，则表示仅在 20ms 后，设备才会开始扫描序列中的下一个 channel。如果扫描器 window 设置为 10ms，则表示设备仅在该 10ms 窗口内扫描每个 channel。这意味着它将扫描 channel 37 共 10ms（window 时间），并在再过 10ms 后开始扫描下一个 channel（20ms[interval]-10ms[window]）。扫描 channel 38 需要 10ms，再过 10ms 后，设备将开始扫描 channel 39。

扫描器将能够同时捕获“extended”和“legacy”广播类型。

### 广告报告 {#advertising-reports}

在此部分中，可以监控 Bluetooth advertising reports（来自附近的 broadcasters）。列表限制为 1024 个条目（如果列表已满 1024 个条目，则接收到的每个新 payload 都会覆盖“最旧的”条目）。可以使用以下命令监控 advertising reports：

```ros
/iot/bluetooth/scanners/advertisements/print      
Columns: DEVICE, PDU-TYPE, TIME, ADDRESS-TYPE, ADDRESS, RSSI
 #  DEV  PDU-TYPE        TIME                  ADDRES  ADDRESS            RSSI  
 0  bt1  adv-noconn-ind  2021-07-28 09:30:56  public  2C:C8:1B:93:16:49  -24dBm
 1  bt1  adv-noconn-ind  2021-07-28 09:30:56  random  0B:16:17:9E:7B:EF  -60dBm
```

可以使用以下命令为报告设置过滤器：

```ros
/iot/bluetooth/scanners/advertisements/print where  
```

例如，要打印由指定 Bluetooth 地址广播的报告，请使用以下命令：

```ros
/iot/bluetooth/scanners/advertisements/print where address=XX:XX:XX:XX:XX:XX
 # DEVICE    PDU-TYPE       TIME                 ADD... ADDRESS                    RSSI     LENGTH DATA    
79 bt1       adv-noconn-ind 2021-07-28 09:46:38 public XX:XX:XX:XX:XX:XX        -70dBm         30 02010...
80 bt1       adv-noconn-ind 2021-07-28 09:46:43 public XX:XX:XX:XX:XX:XX        -67dBm         30 02010...
81 bt1       adv-noconn-ind 2021-07-28 09:46:44 public XX:XX:XX:XX:XX:XX        -70dBm         28 1bff0...
82 bt1       adv-noconn-ind 2021-07-28 09:46:48 public XX:XX:XX:XX:XX:XX        -75dBm         30 02010...
```

要仅显示 RSSI 强于 -30 dBm 的广播报告，请使用以下命令：

```ros
/iot/bluetooth/scanners/advertisements/print where rssi > -30
 # DEVICE         PDU-TYPE       TIME                 ADDRESS-TYPE ADDRESS                    RSSI     LENGTH DATA       
307 bt1            adv-noconn-ind 2021-07-29 10:11:31 public       2C:C8:1B:93:16:49        -24dBm         22 15ff4f09.>
308 bt1            adv-noconn-ind 2021-07-29 10:11:31 public       2C:C8:1B:93:16:49        -26dBm         22 15ff4f09.>
```

可能的过滤条件（可以使用以下参数过滤广播报告列表）：

| Filter | Description |
| :-- | :-- |
| **address** | Bluetooth 广播设备的地址 |
| **address-type** | 广播设备的地址类型（例如 public 或 random） |
| **data** | 十六进制格式的广播数据（AdvData 载荷） |
| **device** | Bluetooth 芯片/接口名称 |
| **epoch** | 自 Unix Epoch 起的毫秒数 |
| **filter-comment** | 匹配白名单过滤条件的注释 |
| **length** | 广播数据长度 |
| **pdu-type** | 广播 PDU 类型 |
| **rssi** | 信号强度 |
| **time** | 广播数据包接收时间 |

### Whitelist

在此选项卡中，可以配置将用于“Scanners”部分过滤策略的白名单。换句话说，该选项用于指定要扫描哪些 Bluetooth 地址（显示在“Advertising reports”中）。

可以使用以下命令查看白名单条目：

```ros
/iot/bluetooth/whitelist/print
Columns: DEVICE, ADDRESS-TYPE, ADDRESS
# DEVICE  ADDRESS-TYPE  ADDRESS    
0 bt1     any           *:*:*:*:*:*
```

可以使用以下命令添加新的白名单条目：

```ros
/iot/bluetooth/whitelist/add
```

### 可配置属性 {#configurable-properties}

| 属性 | 说明 |
| :-- | :-- |
| **address**（*MAC address*；Default: ） | 广播者的地址 |
| **address-type**（*any \| public \| random*；Default:） | 广播者的地址类型 |
| **comment**（*string*；Default: ） | 白名单条目的简短描述 |
| **copy-from** | 复制条目的选项 - 详情请参阅[控制台命令](/docs/developer-guides/scripting#common-commands) |
| **device**（*bt1*；Default: ） | 选择 Bluetooth 接口/芯片名称 |
| **disabled**（*yes \| no*；Default: ） | 禁用或启用该条目的选项 |

:::info
在 **7.14beta8** 版本之前，最多只能添加 8 个白名单条目。  
从 **7.14beta8** 版本开始，白名单不再限制为 8 个条目，并且 address 字段支持星号通配符。
:::

例如，如果要将所有以“DC:2C:...”八位组开头的 MAC 地址加入白名单，请使用星号通配符添加条目：

```ros
/iot/bluetooth/whitelist/add address=DC:2C:*:*:*:*
```

星号通配符不能用于特定八位组之间，例如 `AA:*:*:BB:*:*`（这是无效条目）。

有效条目如下：

- `AA:BB:CC:DD:*:*`
- `AA:BB:CC:DD:EE:*`
- `AA:*:*:*:*:*`

### 外围设备 {#peripheral-devices}

本节显示解码后的 Eddystone TLM、Eddystone UID、iBeacon 和 MikroTik Bluetooth 载荷。如果“Peripheral Devices”捕获其他信标类型，则不会对其进行解码。

可以使用 `print detail` 命令查看解码后的列表：

```ros
/iot/bluetooth/peripheral-devices/print detail 
 0 address-type=public address=60:C0:BF:87:E2:1C name="60:C0:BF:87:E2:1C" persist=no 
   mtik-key="" rssi=-64 
   last-data="0201041BFFCD0960C0BF87E21C025B1F198B21AC62CDAE0045FAFEFE057D7B" 
   last-seen=2023-08-22 11:20:09 beacon-types="" 

 1 address-type=public address=DC:2C:6E:0F:C0:3D name="DC:2C:6E:0F:C0:3D" persist=no 
   mtik-key="" rssi=-47 
   last-data="0303AAFE1716AAFE00E5B2B98DE4C81C47C2B14E7500000000000000" 
   last-seen=2023-08-22 11:20:05 beacon-types=mikrotik,ibeacon,eddystone-uid 
   mtik-version=1 mtik-encrypted=no mtik-acc-x=-0.007G mtik-acc-y=-0.015G 
   mtik-acc-z=-0.007G mtik-temperature=23.808C mtik-battery=100% 
   mtik-uptime=14342160s mtik-flags="" 
   ibeacon-uuid="55555555-5555-5555-5555-222222222222" ibeacon-major=1280 
   ibeacon-minor=512 ibeacon-rssi-at-1m=-68dBm eddy-rssi-at-1m=-27dBm 
   eddy-namespace="b2b98de4c81c47c2b14e" eddy-instance="750000000000" 

 2 address-type=public address=DC:2C:6E:F6:54:7D name="DC:2C:6E:F6:54:7D" persist=no 
   mtik-key="" rssi=-74 
   last-data="0201060303AAFE1116AAFE20000B701549023532D802384F46" 
   last-seen=2023-08-22 11:20:13 beacon-types=eddystone-tlm eddy-version=0 
   eddy-battery-voltage=2.928V eddy-temperature=21.285C eddy-packet-count=37040856 
   eddy-uptime=3724474.2s 

 3 address-type=public address=DC:2C:6E:0F:C0:3E name="DC:2C:6E:0F:C0:3E" persist=no 
   mtik-key="" rssi=-72 last-data="15FF4F0901000214FFFF0200FDFF4F1774E00F000064" 
   last-seen=2023-08-22 11:20:06 beacon-types=mikrotik mtik-version=1 
   mtik-encrypted=no mtik-acc-x=-0.003G mtik-acc-y=0.007G mtik-acc-z=-0.011G 
   mtik-temperature=23.308C mtik-battery=100% mtik-uptime=1040500s mtik-flags="" 

 4 address-type=public address=60:C0:BF:20:9A:50 name="60:C0:BF:20:9A:50" persist=no 
   mtik-key="" rssi=-66 
   last-data="0201041BFF4160C0BF209A50FFA4CA8906E48C0377DCFDD2DF7AF02FFC6AC5" 
   last-seen=2023-08-22 11:20:11 beacon-types="" 
```

可以过滤列表，例如根据设备的“address”进行过滤（已知标签的 MAC 地址）：

```ros
/iot/bluetooth/peripheral-devices/print detail where address="DC:2C:6E:0F:C0:3E"
 0 address-type=public address=DC:2C:6E:0F:C0:3E name="my_tag" persist=yes 
   mtik-key="" rssi=-60 last-data="15FF4F090100669DFCFF0600FCFF6117F1E50F000064" 
   last-seen=2023-08-22 11:43:31 beacon-types=mikrotik mtik-version=1 
   mtik-encrypted=no mtik-acc-x=-0.015G mtik-acc-y=0.023G mtik-acc-z=-0.015G 
   mtik-temperature=23.378C mtik-battery=100% mtik-uptime=1041905s mtik-flags=""

/iot/bluetooth/peripheral-devices/print value-list where address="DC:2C:6E:0F:C0:3E"
      address-type: public
           address: DC:2C:6E:0F:C0:3E
              name: my_tag
           persist: yes
          mtik-key: 
              rssi: -71
         last-data: 15FF4F0901002AC60400000004004F17D4E90F000064
         last-seen: 2023-08-22 12:00:06
      beacon-types: mikrotik
      mtik-version: 1
    mtik-encrypted: no
        mtik-acc-x: 0.015G
        mtik-acc-y: 0G
        mtik-acc-z: 0.015G
  mtik-temperature: 23.308C
      mtik-battery: 100%
       mtik-uptime: 1042900s
        mtik-flags: 
```

或者，例如根据信标类型过滤列表：

```ros
/iot/bluetooth/peripheral-devices/print detail where beacon-types=mikrotik 
 0 address-type=public address=DC:2C:6E:0F:C0:3E name="my_tag" persist=yes 
   mtik-key="" rssi=-69 last-data="15FF4F0901000747020002000100611778E60F000064" 
   last-seen=2023-08-22 11:45:46 beacon-types=mikrotik mtik-version=1 
   mtik-encrypted=no mtik-acc-x=0.007G mtik-acc-y=0.007G mtik-acc-z=0.003G 
   mtik-temperature=23.378C mtik-battery=100% mtik-uptime=1042040s mtik-flags="" 

 7 address-type=public address=2C:C8:1B:4B:BB:0A name="2C:C8:1B:4B:BB:0A" persist=no 
   mtik-key="" rssi=-44 last-data="15FF4F09010077090000FCFFFDFFD519BF9EFF00005B" 
   last-seen=2023-08-22 11:45:53 beacon-types=mikrotik mtik-version=1 
   mtik-encrypted=no mtik-acc-x=0G mtik-acc-y=-0.015G mtik-acc-z=-0.011G 
   mtik-temperature=25.832C mtik-battery=91% mtik-uptime=16752319s mtik-flags="" 
```

此外，还可以设置 `persist=yes`，确保设备或标签始终保留在列表中（因为停止广播 payload 的设备会在一分钟后超时，并从列表中移除，直到空中再次出现新的 payload）：

```ros
/iot/bluetooth/peripheral-devices/set persist=yes address="DC:2C:6E:0F:C0:3E"
```

还可以为设备设置名称，以便更轻松地在列表中查找，命令如下：

```ros
/iot/bluetooth/peripheral-devices/set name="my_tag" address="DC:2C:6E:0F:C0:3E"
```

### Decode-ad

在此菜单中，可以解码静态 MikroTik、Eddystone TLM、Eddystone UID 和 iBeacon payload。

要解码 payload，只需将其输入“data”字段：

```ros
/iot/bluetooth/decode-ad data=0201060303AAFE1116AAFE20000B6E158402353AF20238576B 
             type: eddystone-tlm
          version: 0
  battery-voltage: 2.926V
      temperature: 21.515C
     packet-count: 37042930
           uptime: 3724682.7s

/iot/bluetooth/decode-ad data=15FF4F090100032E0100FFFF00004F17C1E80F000064      
         type: mikrotik
      version: 1
    encrypted: no
        acc-x: 0.003G
        acc-y: -0.003G
        acc-z: 0G
  temperature: 23.308C
       uptime: 1042625s
        flags: 
      battery: 100%
```
