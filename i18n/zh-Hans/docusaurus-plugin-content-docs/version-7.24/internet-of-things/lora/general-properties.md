---
title: "常规属性"
description: "本页介绍在 MikroTik RouterOS 上配置 LoRaWAN 网关的设置项，包括天线增益、信道计划、服务器连接和流量转发规则。文中说明如何启用网关、选择频段、配置 LBT 协议，以及通过 `/iot/lora` 和 `/iot/lora/channels` 等子菜单管理信道。"
tags:
  - 'lora'
  - 'iot-package'
  - 'sub-menu'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/lora/general-properties
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "internet-of-things/lora"
pagination_next: "internet-of-things/lora/user-guides"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

每个带 miniPCI-e 插槽且支持 LTE 调制解调器的 RouterBOARD，也可以通过安装 **R11e-LR8** 或 **R11e-LR9** 卡用作 LoRaWAN 网关。支持 UDP 和 LNS 协议（从 **v7.12rc1** 测试版开始）。

:::info
要使用 LoRa，应安装 IoT 软件包。可在 [download](https://mikrotik.com/download) 页面的额外软件包存档中找到适用于设备架构的软件包。

**重要：** 从 v**7.11**（稳定版）开始，LoRa 功能已移至 **IoT package**，该软件包可在 [download](https://mikrotik.com/download) 页面的额外软件包下获取。单独的 Lora 软件包仍可下载。

使用 IoT 软件包时，LoRa 功能将移至 `/iot/lora` 子菜单。使用 LoRa 软件包时，可通过 `/lora` 子菜单使用 LoRa 功能。

LoRa 软件包不再是必需的，仅为兼容性而保留。

**注意：** ***注**：* RouterOS 不支持第三方 LoRaWAN 网关卡。
:::

## 属性 {#properties}

此菜单用于向 LoRa 接口应用设置。

**子菜单：** `/iot/lora`

| 属性 | 说明 |
| :-- | :-- |
| **antenna-gain** (*integer [-128..127]*；默认值：**0**) | 天线增益，单位为 dBi。该值应等于 <code>setup-antenna-gain</code> 减去 <code>cable-loss</code>。使用 6.5 dBi 天线时，应配置值 6.5（不考虑线缆损耗）。<br/> 网关的输出功率由服务器决定。网关会通过从 <code>server_value</code>（下行消息中接收到的值）中减去 <code>antenna-gain</code> 设置来计算其实际输出功率。 |
| **channel-plan** (*2.4-ghz \| as-923 \| as-923-2 \| as-923-3 \| as-923-4 \| au-915 \| au-915-1 \| au-915-2 \| custom \| eu-868 \| in-865 \| kr-920 \| ru-864 \| ru-864-mid \| us-915 \| us-915-1 \| us-915-2 \| us-915-3 \| us-915-4 \| us-915-5 \| us-915-6 \| us-915-7 \| us-915-8*；默认值：**eu-868**) | 适用于不同区域的频率计划。 |
| **disabled** (*yes \| no*；默认值：**yes**) | LoRaWAN 网关是否禁用。 |
| **forward** (*crc-validation \| dev-addr-validation \| proprietary-traffic*；默认值：**crc-validation**) | 定义应向网络服务器转发哪些类型的数据包：<ul><li>crc-validation - 转发 CRC 正确且有效的数据包。</li><li>dev-addr-validation - 检查数据包的 DevAddr 是否与 NetID 对应，如果不对应，则丢弃该数据包。会发生以下顺序：1）从接收到的 LoRa 数据包中“获取”Dev. Addr 值；2）将 Dev. Addr 与 <a href="https://www.thethingsnetwork.org/docs/lorawan/prefix-assignments/" rel="nofollow">“有效”Net ID</a> 列表进行“比较”；3）如果 Dev. Addr 没有对应的 Net ID，则不转发该数据包；4）如果 Net ID 有效且 Dev. Addr 范围有效，则转发该数据包。</li><li>proprietary-traffic - 检查 LoRa 数据包的内容，如果帧的“类型”为“proprietary”，则不转发该数据包。</li></ul> |
| **gateway-id**(string) | 向服务器注册网关时使用的 Gateway ID 或 Gateway EUI。 |
| **lbt-enabled** (*yes \| no*；默认值：**no**) | 网关是否应使用 LBT（Listen Before Talk）协议。 |
| **listen-time** (*integer [0us..4294967295us]*；默认值：**5000us**) | 在 TX 前跟踪 RSSI 的时间，单位为微秒（在 **lbt-enabled=yes** 时使用）。 |
| **name** (*string*；默认值：) | LoRaWAN 网关的名称。 |
| **network** (*private \| public*；默认值：**public**) | 通信时是否使用同步字（network=private）或不使用同步字（network=public）。 |
| **rssi-threshold** (*integer [-32,768 .. 32,767]*；默认值：**-65dBm**) | 用于确定转发器是否可以使用特定信道进行通信的 RSSI 值。如果 RSSI 值低于 **rssi-threshold**，则可以使用该信道（在 **lbt-enabled=yes** 时使用）。 |
| **servers** (*list of string*；默认值：) | `/iot/lora/servers` 部分中的服务器名称。 |
| **src-address** (*IP*；默认值：) | 必要时指定上行数据包的源地址（该地址应与 RB 上配置的某个地址匹配）。 |
| **spoof-gps** (*bool \| lat \| long \| alt*；默认值：) | 设置自定义 GPS 位置。使用 `lat`、`long`、`alt` 指定纬度、经度和海拔值。 |

:::info
选择服务器并使用 `/iot/lora/enable [find]` 命令启用 LoRa 接口后，设备将开始作为 LoRaWAN 网关运行。它将开始把 [`/iot/lora/traffic`](/docs/internet-of-things/lora/general-properties#traffic) 选项卡中的 LoRa 载荷转发到配置的服务器。
:::

## Channels

此部分用于更改信道/频率相关设置。

**子菜单：** `/iot/lora/channels`

| 属性 | 说明 |
| :-- | :-- |
| **bandwidth** (*200\_kHz \| 400\_kHz \| 62.5\_kHz \| 125\_kHz \| 250\_kHz \| 500\_kHz*；默认值：**125\_kHz**) | 特定信道的带宽，使用任一 channel-plan 预设时预定义，但当 channel-plan 设置为 custom 时可以手动更改。 |
| **disabled** (*yes \| no*；默认值：**no**) | 禁用或启用该信道。 |
| **freq-off** (*integer* [-400000..400000]；默认值：) | 信道频率相对于无线电中心频率的偏移，可用于调整信道频率，使信道不重叠。 |
| **radio** (*radio0 \| radio1*；默认值：) | 定义哪个无线电使用所选信道。 |
| **spread-factor** (*SF5 \| SF6 \| SF7 \| SF8 \| SF9 \| SF10 \| SF11 \| SF12*；默认值：) | 为 type=LoRa 的信道定义扩频因子。较低的扩频因子意味着较高的数据速率。 |

要查看当前信道，请执行命令 `/iot/lora/channels/print`：

```ros
/iot/lora/channels/print
Columns: NAME, TYPE, RADIO, FREQ-OFF, BANDWIDTH, FREQ, SPREAD-FACTOR, DATARATE
# NAME       TYPE  RADIO   FREQ-OFF  BANDWIDTH  FREQ   SPREAD-FACTOR  DATARATE
0 gateway-0  MSF   radio1  -400000   125_kHz    868.1                         
1 gateway-0  MSF   radio1  -200000   125_kHz    868.3                         
2 gateway-0  MSF   radio1  0         125_kHz    868.5                         
3 gateway-0  MSF   radio0  -400000   125_kHz    867.1                         
4 gateway-0  MSF   radio0  -200000   125_kHz    867.3                         
5 gateway-0  MSF   radio0  0         125_kHz    867.5                         
6 gateway-0  MSF   radio0  200000    125_kHz    867.7                         
7 gateway-0  MSF   radio0  400000    125_kHz    867.9                         
8 gateway-0  LoRa  radio1  -200000   250_kHz    868.3  SF7                    
9 gateway-0  FSK   radio1  300000    125_kHz    868.8                    50000
```

信道使用 `freq-off` 和 radio 的 `center-freq` 频率创建。要查看 **radios'** 中心频率，请使用命令 `/iot/lora/radios/print`。

要了解每个信道的频率如何计算，请查看以下示例：

```ros
# NAME       TYPE  RADIO   FREQ-OFF  BANDWIDTH  FREQ   SPREAD-FACTOR  DATARATE
0 gateway-0  MSF   radio1  -400000   125_kHz    868.1                         
```

选择 `radio1` 用于信道 #0，并配置 `center-freq=868500000`（868500000 Hz 或 868.5 MHz）。

通过使用频率偏移 `freq-off=-400000`（-400000 Hz 或 -0.4 MHz），我们将信道 #0 定义为 `868500000-400000=868100000` Hz 或 868.1 MHz。

:::info
要配置自定义信道，请使用以下命令选择“custom”信道配置文件：

```ros
/iot/lora/set [find] channel-plan=custom
```
:::

## Join EUI

网关会将接收到的每个 LoRaWAN 载荷转发到服务器，其中也包括邻近 LoRaWAN 节点的载荷。转发所有内容可能并不理想，例如，这会增加使用的数据量，并直接影响 ISP 套餐费用。

通过 Join EUI 菜单，可以指定网关应转发（“白名单”）或应阻止（“黑名单”）的 JOIN EUI 范围。添加范围后，请确保将其应用到 [server](/docs/internet-of-things/lora/general-properties#servers) 设置。

过滤器按以下原则工作：

1) 默认情况下，允许所有内容（除非添加了白名单/黑名单过滤器）；

2) **如果添加了“黑名单”过滤范围**，随后附近出现与黑名单范围匹配的 JOIN EUI 数据包 → **该数据包将被丢弃**；

3) **如果添加了“白名单”过滤范围，则其优先级高于“黑名单”过滤器**。也就是说，如果“黑名单”和“白名单”都匹配同一个 JOIN EUI，则“白名单”优先，数据包会被转发。

可以借助 RouterOS GUI 查找节点使用的 Join EUI。进入“LoRa”部分的“Traffic”子菜单（该子菜单仅可通过图形界面使用）。为 LoRaWAN 节点供电后，节点应发送“Join-request”数据包。双击该数据包以进行检查：

![](/img/66e2220bdef5fcad.webp)

**子菜单：** `/iot/lora/joineui`

| 属性 | 说明 |
| :-- | :-- |
| **joineuis** (*string*; Default: ) | 定义 Join EUI 的范围。 |
| **logging**(*yes \| no*; Default: no) | 为过滤功能启用额外日志。 |
| **name** (*string*; Default: ) | 定义该范围的名称。 |
| **type** (blacklist \| whitelist; Default: whitelist) | 定义过滤类型：<br/><ul><li>blacklist（如果范围匹配，则阻止或丢弃数据包）</li><li>whitelist（如果范围匹配，则转发数据包）</li></ul> |

Join EUI 示例如下：**E0 E1 E2 01 02 03 04 05**。它由 8 个 HEX 格式的八位字节组成。

要添加**阻止所有内容**的范围，请添加如下过滤器：

```ros
/iot/lora/joineui/add name=block_all joineuis=0000000000000000-ffffffffffffffff type=blacklist logging=yes
```

要允许特定的单个 Join EUI，请添加如下过滤器：

```ros
/iot/lora/joineui/add name=allow_my_node joineuis=E0E1E20102030405-E0E1E20102030405 type=whitelist logging=yes
```

禁用 LoRa 接口：

```ros
/iot/lora/disable [find where ]
```

将这两个范围应用到正在使用的 LoRa 服务器，并再次启用接口：

```ros
/iot/lora/servers/set joineui=block_all,allow_my_node [find where address ~ "eu1.cloud.thethings.network"]
/iot/lora/enable [find where ]
```

结果是，仅允许“JOIN EUI=**E0 E1 E2 01 02 03 04 05**”的节点负载被转发，而其他所有可能的 JOIN EUI 都将被 blacklist 规则丢弃。

## 网络 ID {#network-id}

网关会将接收到的每个 LoRaWAN 载荷转发到服务器，包括相邻 LoRaWAN 节点的载荷。转发所有内容可能并不理想，例如，这会增加使用的数据量，并直接影响 ISP 套餐费用。

NetID 菜单允许指定 NetID 的黑名单或白名单范围，网关应转发这些范围（如果为“白名单”）或应阻止这些范围（如果为“黑名单”）。添加列表后，请确保将其应用到 [server](/docs/internet-of-things/lora/general-properties#servers) 设置。

过滤器按以下原则工作：

1) 默认情况下，允许所有内容（除非添加了白名单/黑名单过滤器）；

2) **如果添加了“黑名单”过滤范围**，并且数据包的 NetID 与黑名单范围匹配 → **则丢弃该数据包**；

3) **如果添加了“白名单”过滤范围，则它优先于“黑名单”过滤器**。这意味着，如果“黑名单”和“白名单”都匹配同一个 NetID，则“白名单”优先，并转发该数据包。

NetID 定义由 LoRaWAN Alliance 分配给不同运营商/服务器的设备地址（DevAddr）范围。包含大多数范围的列表可在 [TTN guide](https://www.thethingsnetwork.org/docs/lorawan/prefix-assignments/) 中找到。

DevAddr 由 LoRaWAN 服务器在与服务器通信完成后分配给 LoRaWAN 节点。例如，[TTN](https://www.thethingsnetwork.org/) 会从 26000000 - 27FFFFFF 范围内为你的节点分配一个地址。你可以在 LoRaWAN 服务器仪表板中查看，也可以在 RouterOS GUI 的“Traffic”子菜单中查看（“join-request”和“join-accept”通信完成后），位置为 Dev Addr 列或字段。

假设 TTN 为你的节点分配了 **26 1B D8 D1** Dev Addr。根据 [TTN guide](https://www.thethingsnetwork.org/docs/lorawan/prefix-assignments/)，它属于 26000000 - 27FFFFFF DevAddr 范围，并属于 **000013 NetID**。

**子菜单：** `/iot/lora/netid`

| 属性 | 说明 |
| :-- | :-- |
| **netids** (*string*；默认值：) | 定义 NetID。 |
| **logging**(*yes \| no*；默认值：no) | 为过滤功能启用额外日志。 |
| **name** (*string*；默认值：) | 为该 ID 定义名称。 |
| **type** (blacklist \| whitelist；默认值：whitelist) | 定义过滤类型：<br/><ul><li>blacklist（如果范围匹配，则阻止或丢弃数据包）</li><li>whitelist（如果范围匹配，则转发数据包）</li></ul> |

要添加允许特定 NetID 的过滤器（本例中为属于 TTN 的 **000013** NetID），请使用以下命令：

```ros
/iot/lora/netid/add name=allow_TTN netids=000013-000013 type=whitelist
```

要阻止所有其他 NetID，请使用 `type=blacklist`：

```ros
/iot/lora/netid/add name=block_all netids=000000-ffffff type=blacklist
```

禁用 LoRa 接口：

```ros
/iot/lora/disable [find where ]
```

将这两个范围应用到正在使用的 LoRa 服务器，并再次启用接口：

```ros
/iot/lora/servers/set netid=block_all,allow_TTN [find where address ~ "eu1.cloud.thethings.network"]
/iot/lora/enable [find where ]
```

## Servers

本节用于添加新服务器设置或修改当前服务器设置。

**子菜单：** `/iot/lora/servers`

可以使用一些预定义服务器（使用它们需要注册 [The Things Network](https://thethingsnetwork.org) 账户）：

```ros
[admin@MikroTik] /iot/lora/servers/print
Columns: NAME, UP-PORT, DOWN-PORT, ADDRESS
#  NAME              UP-PORT  DOWN-PORT  ADDRESS                                     
0  TTS Cloud (eu1)      1700       1700  eu1.cloud.thethings.industries         
1  TTS Cloud (nam1)     1700       1700  nam1.cloud.thethings.industries        
2  TTS Cloud (au1)      1700       1700  au1.cloud.thethings.industries         
3  TTN V3 (eu1)         1700       1700  eu1.cloud.thethings.network            
4  TTN V3 (nam1)        1700       1700  nam1.cloud.thethings.network           
5  TTN V3 (au1)         1700       1700  au1.cloud.thethings.network          
```

也可以添加自定义服务器。如果第一个服务器不更改数据包中的 "DevAddress" 部分，并且所有服务器都能够解码该数据包，则可以同时向多个服务器转发数据。

| 属性 | 说明 |
| :-- | :-- |
| **address** (*域名或 IP 地址*；默认值：) | 定义 LoRaWAN 网络服务器地址。 |
| **name** (*字符串*；默认值：) | 定义服务器名称。 |
| **protocol** (*UDP \| LNS \| CUPS*；默认值：**UDP**) | 指定与 LoRaWAN 服务器通信时使用 UDP、LNS 还是 CUPS 协议。 |
| **down-port** (*整数 [0..65535]*；默认值：**1700**) | 选择 UDP 协议时使用的参数。定义与 LoRaWAN 网络服务器进行下行通信（从服务器到节点）的端口。大多数已知开源服务器默认使用端口 1700，但如果在同一台机器上配置了多个服务器，端口可能会变化。 |
| **up-port** (*整数 [0..65535]*；默认值：**1700**) | 选择 UDP 协议时使用的参数。定义与 LoRaWAN 网络服务器进行上行通信（从节点到服务器）的端口。大多数已知开源服务器默认使用端口 1700，但如果在同一台机器上配置了多个服务器，端口可能会变化。 |
| **netid**(*字符串列表*；默认值：) | 选择 UDP 协议时使用的参数。应用过滤，仅发送与配置的 Network ID（Net ID）过滤条件匹配的 LoRaWAN 载荷。 |
| **joineui** (*字符串列表*；默认值：) | 选择 UDP 协议时使用的参数。应用过滤，仅发送与配置的 Join EUI 过滤条件匹配的 LoRaWAN 载荷。 |
| **port** (*整数 [0..65535]*；默认值：**8887**) | 选择 LNS 或 CUPS 协议时使用的参数。对于 LNS，定义 WSS（WebSocket）端口；对于 CUPS，定义 HTTPS 端口。 |
| **key** (*字符串*；默认值：) *[敏感参数](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 选择 LNS 或 CUPS 协议时使用的参数。指定 LoRa Basics Station LNS Authentication Key 或 CUPS API KEY（两者均在服务器上生成）。 |
| **ssl** (*是或否*；默认值：否) | 选择 LNS 或 CUPS 协议时使用的参数。指定是否使用 SSL（如果服务器支持 TLS 服务器身份验证）。选择该选项时，必须在 [certificates](/docs/authentication-authorization-accounting/certificates) 菜单下上传根 SSL 证书。 |
| **certificate** (*字符串列表*；默认值：**none**) | 选择 LNS 或 CUPS 协议时使用的参数。选择已上传的客户端证书（如果服务器要求 TLS 客户端身份验证）。如果服务器不要求 TLS 客户端身份验证，请使用默认设置 "**none**"。 |
| **interval**(*整数 [0..65535]*；默认值：) | 选择 CUPS 协议时使用的参数。指定 LoRa Basics Station 向 CUPS 服务器查询配置更新或变更的间隔。 |

有一些预配置的 The Things 默认服务器。如果删除了其中一个并希望恢复默认服务器，可以使用以下命令：

```ros
/iot/lora/servers/reset-servers
```

:::warning
请注意，重置服务器也会删除所有此前已配置的服务器，因此请务必事先“保存”它们。
:::

## Traffic

本节显示周围节点广播的 LoRa 载荷。

**子菜单：** `/iot/lora/traffic`

| 属性 | 说明 |
| :-- | :-- |
| **options** | 用于配置 traffic 选项卡的其他选项：<br/><ul><li>crc-errors（yes &#124; no）→ 设置为“no”，可丢弃状态为“crc error”的数据包，使其不显示在 traffic 选项卡中；</li><li>pckt-limit（10...1024）→ 限制 traffic 选项卡的日志列表。</li></ul> |
| **clear** | 清空列表（删除所有条目）。 |

要查看列表，请使用 `print` 命令：

```ros
[admin@MikroTik] /iot/lora/traffic/print
Columns: TIME, GWID, MSGTYPE, DEVADDR, MVER, FCNT, CRC, TYPE, JOINEUI, DEVEUI
 #  TIME                             GWID  MSGTYPE                DEVADDR      MVER         FCNT  CRC    TY  JOINEUI                  DEVEUI                 
 0  2024-11-08 13:33:28  xxxxxxxxxxxxxxxx  Unconfirmed Data Up    6C B9 XX XX  LoRaWAN R1  59434  Error  Rx                                                  
 1  2024-11-08 13:33:50  xxxxxxxxxxxxxxxx  Rejoin-request                      LoRaWAN R1         Error  Rx                           50 62 9F FE XX XX XX XX
 2  2024-11-08 13:34:09  xxxxxxxxxxxxxxxx  Unconfirmed Data Down  5E 00 XX XX  RFU         41736  Error  Rx                                                  
 3  2024-11-08 13:34:15  xxxxxxxxxxxxxxxx  Rejoin-request                      RFU                Error  Rx                           D9 C2 BD 4B XX XX XX XX
 4  2024-11-08 13:34:55  xxxxxxxxxxxxxxxx  Join-request                        LoRaWAN R1         Error  Rx  A1 AE B1 8A XX XX XX XX  F4 62 81 BE XX XX XX XX
```

要清空列表（删除所有条目），请执行 `clear` 命令：

```ros
[admin@MikroTik] /iot/lora/traffic/clear
```

Traffic 选项卡显示“LoRa”有效载荷。使用 `/iot/lora/enable [find]` 命令启用 LoRa 接口后，列表中的所有有效载荷都将转换为 TCP/UDP 数据包（取决于使用 UDP 1700 还是 LNS/CUPS 协议），并转发到配置的服务器。

如果不想使用 LoRaWAN 拓扑，并且希望将“原始”LoRa 有效载荷转发到自己的服务器，可以使用 [MQTT](/docs/internet-of-things/mqtt) 或 [Fetch](/docs/system-information-and-utilities/fetch) 按指定间隔运行脚本，以持续发送数据。

以下基本示例（脚本中的第一步）说明如何将 traffic 有效载荷转换为名为“traffic”的变量：

```ros
[admin@MikroTik] > :global traffic;:set traffic [/iot/lora/traffic/print as-value ];put $traffic 
.id=*4f;band=125 kHz;coderate=?/?;counter=890652548;crc=Error;datarate=SF 7;freqhz=868300;gwid=50313xxxxxx;ifcha
in=1;mod=LoRa;msgtype=Proprietary;mver=RFU;rfchain=1;rssi=-116.00;rxcrc=3809;size=213;snr=-12.00;snrmax=-8.25;snrmin=
-14.25;time=2024-11-08 14:39:45;type=Rx
```

## Debugging

如果遇到连接问题，请确保启用日志：

```ros
/system/logging/add topics=debug,lora
```

这将启用调试日志，并帮助你定位潜在问题所在。可使用以下命令查看日志：

```ros
/log/print
```

成功连接如下所示：

```ros
 13:50:33 lora,info gateway-0 forwarder started
 13:50:38 lora,info [LNS] connecting to wss://eu1.cloud.thethings.network:8887/router-info
 13:50:39 lora,info [LNS] eu1.cloud.thethings.network discovered
 13:50:39 lora,info [LNS] eu1.cloud.thethings.network disconnected
 13:50:39 lora,info [LNS] connecting to wss://eu1.cloud.thethings.network:8887/traffic/eui-xxxx
 13:50:39 lora,info [LNS] eu1.cloud.thethings.network configured
 13:50:52 lora,info gateway-0 forwarder is ready
```

更多日志信息请参阅 [Log](/docs/diagnostics-monitoring-and-troubleshooting/log) 指南。
