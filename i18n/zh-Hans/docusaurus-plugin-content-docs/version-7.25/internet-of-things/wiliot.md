---
sidebar_key: "internet-of-things/wiliot"
sidebar_position: 6
title: "威利奥特"
sidebar_label: "威利奥特"
description: "Wiliot 是一家物联网公司，提供无电池蓝牙标签，用于广播遥测数据，需要具备蓝牙支持的 MikroTik RouterOS 设备来实现网关和桥接模式。该文档指导用户将 MikroTik 板卡注册为 Wiliot 网关，包括 API token 设置和 MQTT 连接的建立。"
tags:
  - 'wiliot'
  - 'mqtt'
  - 'bluetooth'
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/wiliot
captured_at: '2026-11-04T11:19:17+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**[Wiliot](https://www.wiliot.com/company)** 是一家 **物联网** 公司，以其 [IoT Pixels](https://www.wiliot.com/product/iot-pixels)（标签）等解决方案而闻名。Pixel 的一大优势在于它是一种无需电池、标签大小（紧凑）的蓝牙“标签”（会广播带有遥测数据的蓝牙信标）。

- 要为 IoT Pixel 供电，你需要一个 bridge（“energizer”）设备。它通过无线电波提供“能量”，并从远处为 IoT Pixel 供电。
- 要将 IoT Pixel 的数据转发到服务器（“dashboard”），你需要一个 gateway 设备。它使用 TCP/IP 连接与服务器建立连接，并转发包含传感器数据（例如温度）的标签负载。

这两种运行模式可以由单个设备执行，也可以由不同设备执行。

RouterOS 允许在支持蓝牙的设备上使用 Wiliot 的 `gateway` 和 `bridge` 模式。

Wiliot `gateway` 模式负责与 MQTT 服务器建立连接（通过 API 注册网关、获取所需的令牌和凭据，并对设备进行授权）。它还负责通过已建立的 MQTT 连接转发其无线捕获的 Pixel 蓝牙负载，并负责通过蓝牙广播中继它可能从已订阅的 MQTT 主题收到的附加命令。

Wiliot `bridge` 模式负责通过该频率提供能量，并保持 IoT Pixel 供电。

:::warning
`bridge` 模式尚未实现。
:::

## 分步操作 {#step-by-step}

分步操作需要两个快速步骤：

1. 注册设备并激活 MikroTik 板；
2. 设置 IoT Pixel。

### 步骤 #1，网关注册 {#step-1-gateway-registration}

#### 在 Wiliot 门户上 {#on-the-wiliot-portal}

- 登录 Wiliot 注册页面 →  [https://deployment-tool.wiliot.com](https://deployment-tool.wiliot.com)

![](/img/b2a9c9652ca2bb5d.webp)

- 选择“Gateway Registration”。
- 选择“Manual input”（屏幕右上角）。
- 输入“Gateway ID”。

你可以从 RouterOS 设置（`gateway-id` 字段）中复制“Gateway ID”：

```routeros
[admin@MikroTik] > /iot wiliot configuration print
                  status: inactive                
              gateway-id: XXXXXXXXX          
                    type: mikrotik-knot-embedded
                   owner: xxxx              
               spoof-gps: xx                   
                     lat: xx                    
                    long: xx                    
  token-refresh-handicap: 3600                  
                  server: Wiliot US East        
                 scanner: bt1                   
              advertiser: bt1                   
                   wi-fi: none                  
                features: gateway  
```

- 新网关应在平台上以“pre-registered”状态出现 → [https://platform.wiliot.com/edge/gateways](https://platform.wiliot.com/edge/gateways)

#### 在 RouterOS 中 {#in-the-routeros}

:::info
你可以使用不同的工具来浏览设置。建议的管理方式是使用 [Winbox](../management-tools/winbox.md) 软件。[使用此链接下载该工具](https://mikrotik.com/download/winbox)并运行它。用以太网线将你的 PC 连接到任何以 ether2+ 开头的端口（避免使用 ether1，因为在大多数情况下它被配置为 WAN 端口并受防火墙限制，而其余端口是开放访问且启用了 DHCP-server 的 LAN 端口），或者使用 Wi-Fi 连接（如果板上有 Wi-Fi 芯片）。

在 Winbox 中，导航到“Neighbors”选项卡（Select from: Neighbors），找到你的 MikroTik 板的 MAC 地址（它印在设备标签上），点击该 MAC 地址，输入登录凭据（也印在标签上）并“connect”到它。

从这里，你可以使用“GUI”或“CLI”命令。**本指南展示“CLI”命令示例**，你可以通过从 Winbox 选项中打开“New Terminal”来运行这些示例。但是，GUI 中也提供完全相同的部分和选项卡。例如，如果命令显示为“**`/iot/wiliot/enable`**”，请转到 **IoT→ Wiliot** 选项卡，并点击“**enable**”按钮。
:::

- 启用“wiliot”功能。

```routeros
[admin@MikroTik] > /iot/wiliot/enable
```

- 确认设备已成功获取令牌、获得授权，并以“**active**”状态（`status: active`）连接到 MQTT 服务器。

```routeros
[admin@MikroTik] > /iot/wiliot/configuration/print
                  status: active                  
              gateway-id: XXXXXXXXX           
                    type: mikrotik-knot-embedded
                   owner: xxxx              
  token-refresh-handicap: 3600                  
                  server: Wiliot US East        
                 scanner: bt1                   
              advertiser: bt1                   
                   wi-fi: none                  
                features: gateway               
```

 Gateway 状态应在 Wiliot 平台上从“pre-registered”变为“approved”（和/或变为“online”）→ [https://platform.wiliot.com/edge/gateways](https://platform.wiliot.com/edge/gateways)

### 步骤 #2，添加 IoT Pixel（标签） {#step-2-adding-iot-pixel-label}

#### 在 Wiliot 门户上 {#on-the-wiliot-portal-1}

- 登录 Wiliot 平台并导航到“Category”选项卡 → [https://platform.wiliot.com/categories](https://platform.wiliot.com/categories)。添加新的“Category”（“Add new”）。为其命名并选择所需的类别类型。
- 导航到“Pixels”选项卡 → [https://platform.wiliot.com/edge/pixels](https://platform.wiliot.com/edge/pixels)。检查标签的“ID”。标签应已分配给你的账户。
- 转到“Assets”选项卡 → [https://platform.wiliot.com/assets](https://platform.wiliot.com/assets)。创建新资产（“Add New”）。将该资产选择/链接到之前创建的“Category”，输入“Asset ID”（或生成一个随机 ID），并从列表中选择 Pixel 的 ID。
- 通过点击已创建的“asset”条目（一旦标签被供能且网关就绪），你将能够看到标签的读数（温度等）。

## RouterOS 设置 {#routeros-settings}

**子菜单：** `/iot/wiliot`

***注意**：* 需要 **iot** 软件包。

| 属性 | 描述 |
| :-- | :-- |
| **configuration** | 常规 Wiliot gateway/bridge 设置。 |
| **servers** | MQTT 服务器配置。 |
| **bluetooth traffic** | 蓝牙流量菜单。 |
| **mqtt traffic** | MQTT 流量菜单。 |

### 配置（常规选项） {#configuration-general-options}

要启用配置，请使用命令：

```routeros
/iot/wiliot/enable
```

要禁用配置：

```routeros
/iot/wiliot/disable
```

要清除（purge）MQTT 连接/认证数据（仅在“disabled”状态下可用）：

```routeros
/iot/wiliot/disable
/iot/wiliot/clear
```

:::info
“清除”配置后，你将必须删除网关（[https://platform.wiliot.com/edge/gateways](https://platform.wiliot.com/edge/gateways)），并重新注册网关（[https://deployment-tool.wiliot.com/](https://deployment-tool.wiliot.com/)）。
:::

配置属性可以使用“set”命令应用（仅在“disabled”状态下可用）：

```routeros
/iot/wiliot/set
```

示例：

```routeros
/iot/wiliot/set features=gateway
```

| 属性 | 描述 |
| :-- | :-- |
| **advertiser** (默认：bt1) | 选择将用于广播（中继从 MQTT 服务器获取的命令）的蓝牙接口。 |
| **scanner** (默认：bt1) | 选择将用于扫描（捕获 Pixel 的负载）的蓝牙接口。 |
| **spoof-gps** (*yes \| no*; 默认：no) | 选择是否使用将发送到服务器的手动 GPS 坐标。 |
| **lat** (默认：) | 设置在使用“spoof-gps”时与服务器连接期间要包含的 GPS 纬度值。 |
| **long** (默认：) | 设置在使用“spoof-gps”时与服务器连接期间要包含的 GPS 经度值。 |
| **features** (*gateway \| bridge* ; 默认：) | 选择设备的角色：gateway。在此模式下，设备与服务器建立 MQTT 连接，并将其捕获的 IoT Pixel 信标转发给服务器。它还会向附近的 bridge 广播从已订阅主题收到的命令。bridge。在此模式下，设备为周围的 IoT Pixel 供能（为其供电）。**注意：** `bridge` 模式尚未实现。  |
| **server**(默认：) | 设置用于 MQTT 连接的服务器。 |

### 服务器 {#servers}

要更改 MQTT 服务器的设置：

| 属性 | 描述 |
| :-- | :-- |
| **address** (默认：) | MQTT 服务器的 IP/域名地址。 |
| **certificate** (默认：) | 指定用于 SSL MQTT 连接的[证书存储中的证书](../authentication-authorization-accounting/certificates.md)，如果服务器要求的话。 |
| **name** (默认：) | 服务器名称。 |
| **port** (默认：) | MQTT 服务器使用的 TCP 端口。 |
| **ssl** (yes \| no; 默认：) | 启用与服务器的 SSL 通信。 |

### 蓝牙流量 {#bluetooth-traffic}

显示附近 IoT Pixel 的原始数据：

```routeros
/iot/wiliot/bluetooth-traffic/print 
Columns: TIME, ADDRESS, RSSI, PAYLOAD
 #  TIME        ADDRESS            RSSI    PAYLOAD                                                                                     
 0  2026-01-07  E9:B7:32:XX:XX:XX  -34dBm  1E 16 C6 FC 03 00 7C 7B 3C 22 0E D8 54 38 B0 03 E0 DA 8C 06 36 B4 CF AC 8A D6 76 54 BD FC B9
    14:23:26                                                                                                                           
 1  2026-01-07  E9:B7:32:XX:XX:XX  -41dBm  1E 16 C6 FC 03 00 3C DB 7D 72 BF A0 C1 62 9C 5F B6 D5 90 00 C1 62 BF 68 EC E5 64 02 63 F9 C3
    14:23:26                                                                                                                           
 2  2026-01-07  E9:B7:32:XX:XX:XX  -42dBm  1E 16 C6 FC 03 00 3C A8 3B 27 17 25 BC 6D 01 F5 49 E1 98 03 CA 3C 64 04 30 B2 E1 86 FC 80 CB
    14:23:28                                                                                                                           
 3  2026-01-07  E9:B7:32:XX:XX:XX  -33dBm  1E 16 C6 FC 03 00 3C F5 AF 22 CC E2 60 FA BC 4E 57 F7 8C 01 80 6A 21 EF 82 CB 62 2A 16 5A 3F
    14:23:29                                                                                                                           
 4  2026-01-07  E9:B7:32:XX:XX:XX  -33dBm  1E 16 C6 FC 03 00 3C FC AC 9A 1B 9A BD 2C DE B7 02 FF 7C 03 C7 28 BD AB 20 1B 91 89 B9 ED 88
```

### MQTT 流量 {#mqtt-traffic}

显示 MQTT 流量：

```routeros
/iot/wiliot/mqtt-traffic/print
   time: 2026-03-02                                                                                                                      >
         07:37:43                                                                                                                        >
  topic: update/mikrotik/XXXXXXXXXXX                                                                                                     >
   data: {"txPacket":"1E16C6FC0000ED070C3443B7D39DE2CE08993D7F40B2F56B822096AA19CD00","txMaxRetries":8,"txMaxDurationMs":700,"action":0} >
```

### 调试 {#debugging}

你可以使用以下命令启用“wiliot”调试日志：

```routeros
/system/logging
add topics=wiliot
```

结果，你应该会在日志中看到更详细的条目（`/log/print` 命令）：

```routeros
 2026-02-12 12:04:54 wiliot,debug [CFG] authorizing...
 2026-02-12 12:04:54 wiliot,debug [CFG] authorization complete
 2026-02-12 12:04:54 wiliot,debug [CFG] registering...
 2026-02-12 12:04:55 wiliot,debug [CFG] registration complete
 2026-02-12 12:04:55 wiliot,debug [CFG] polling for token...
 2026-02-12 12:04:55 wiliot,debug [CFG] token obtained
 2026-02-12 12:04:55 wiliot,debug [CFG] ownerId
 2026-02-12 12:04:55 wiliot,debug [CFG] authorization complete
 2026-02-12 12:04:55 wiliot,debug [CFG] updating MQTT credentials
 2026-02-12 12:04:56 wiliot,debug [CFG] MQTT credentials updated
 2026-02-12 12:04:56 wiliot,debug [CFG] connecting to MQTT server
  2026-02-12 12:04:56 wiliot,debug [CFG] subscribing to BLE advertisements
 2026-02-12 12:04:56 wiliot,debug [CFG] active
```

### 证书 {#certificates}

Wiliot 功能使用 [/tool/fetch](../system-information-and-utilities/fetch.md) 发起 HTTP POST，并使用 [/mqtt](./mqtt/index.md) 建立 MQTT 连接。HTTP 和 MQTT 都需要 SSL 证书。RouterOS 有一个“builtin trust store”，其中从一开始就包含所有必需的证书。

**[默认情况下](../authentication-authorization-accounting/certificates.md#settings)，** “**all**” **服务应被允许使用内置证书存储**，因此你无需执行任何操作。但是，如果你决定限制此行为（如果你决定不允许“all”服务访问“store”），为了让“wiliot”正常工作，你需要启用“wiliot”、“mqtt”和“fetch”服务（或禁用 builtin-trust-store 并手动上传证书）：

```routeros
[admin@MikroTik] > /certificate/settings/print
  builtin-trust-store: fetch                    
                       mqtt                      
                       wiliot                     
         crl-download: no    
              crl-use: no    
            crl-store: ram 
```
