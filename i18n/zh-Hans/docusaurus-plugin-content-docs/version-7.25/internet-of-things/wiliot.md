---
title: "Wiliot"
description: "Wiliot 是一家 IoT 公司，提供无电池 Bluetooth 标签，用于广播遥测数据，需要支持 Bluetooth 的 MikroTik RouterOS 设备以使用网关和网桥模式。本文档指导用户将 MikroTik 板卡注册为 Wiliot 网关，包括 API token 设置和 MQTT 连接建立。"
tags:
  - 'wiliot'
  - 'mqtt'
  - 'bluetooth'
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/wiliot
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "storage"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**[Wiliot](https://www.wiliot.com/company)** 是一家 **物联网** 公司，以其 [IoT Pixels](https://www.wiliot.com/product/iot-pixels)（标签）及其他解决方案而闻名。Pixel 的主要优势在于它无需电池，尺寸如标签般小巧（紧凑），是一种蓝牙“标签”，可广播包含遥测数据的蓝牙信标。

- 要为 IoT Pixel 供电，需要使用网桥（“energizer”）设备。它通过无线电波提供“能量”，并从远处为 IoT Pixel 供电。
- 要将 IoT Pixel 的数据转发到服务器（“dashboard”），需要使用网关设备。它使用 TCP/IP 连接与服务器建立连接，并转发包含传感器数据（如温度）的标签载荷。

这两种操作模式可以由单台设备执行，也可以由不同设备分别执行。

RouterOS 允许在支持蓝牙的设备上使用 Wiliot `gateway` 和 `bridge` 模式。

Wiliot `gateway` 模式负责与 MQTT 服务器建立连接（通过 API 注册网关，获取所需的令牌和凭据，并授权设备）。它还负责通过已建立的 MQTT 连接转发其从空中捕获的 Pixel 蓝牙载荷，并通过蓝牙广播中继它可能从已订阅 MQTT 主题收到的其他命令。

Wiliot `bridge` 模式负责通过频率提供能量，并保持 IoT Pixel 供电。

:::warning
`bridge` 模式尚未实现。
:::

## 分步操作 {#step-by-step}

分步操作需要两个快速步骤：

1. 注册设备并激活 MikroTik 板卡；
2. 设置 IoT Pixels。

### 步骤 #1，网关注册 {#step-1-gateway-registration}

#### 在 Wiliot 门户中 {#on-the-wiliot-portal}

- 登录 Wiliot 注册页面 → [https://deployment-tool.wiliot.com](https://deployment-tool.wiliot.com)

![](/img/b2a9c9652ca2bb5d.webp)

- 选择“Gateway Registration”。
- 选择“Manual input”（屏幕右上角）。
- 输入“Gateway ID”。

可以从 RouterOS 设置中的 `gateway-id` 字段复制“Gateway ID”：

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

- 新网关应显示在平台上，状态为“pre-registered” → [https://platform.wiliot.com/edge/gateways](https://platform.wiliot.com/edge/gateways)

#### 在 RouterOS 中 {#in-the-routeros}

:::info
可以使用不同工具浏览设置。建议通过 [Winbox](/docs/7.24/management-tools/winbox) 软件进行管理。[通过此链接下载工具](https://mikrotik.com/download/winbox)并运行它。用“ethernet”线缆将 PC 连接到任意以 ether2+ 开头的端口（避免使用 ether1，因为在大多数情况下，它被配置为 WAN 端口并受防火墙限制，而其余端口是 LAN 端口，具有开放访问权限并启用了 DHCP-server），或者使用 Wi-Fi 连接（如果设备板载 Wi-Fi 芯片）。

在 Winbox 中，进入“Neighbors”选项卡（选择：Neighbors），找到 MikroTik 设备的 MAC 地址（该地址印在设备标签上），点击 MAC 地址，输入登录凭据（也印在标签上）并“connect”到它。

从这里开始，可以使用“GUI”或“CLI”命令。**本指南展示“CLI”命令示例**，可以通过在 Winbox 选项中打开“New Terminal”来运行这些命令。GUI 中也提供完全相同的部分和选项卡。例如，如果命令显示为“**`/iot/wiliot/enable`**”，请进入 **IoT→ Wiliot** 选项卡并点击“**enable**”按钮。
:::

- 启用“wiliot”功能。

```routeros
[admin@MikroTik] > /iot/wiliot/enable
```

- 确认设备成功获取 token、获得授权，并以“**active**”状态连接到 MQTT 服务器（`status: active`）。

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

 网关状态应在 Wiliot 平台上从“pre-registered”变为“approved”（或/和变为“online”）→ [https://platform.wiliot.com/edge/gateways](https://platform.wiliot.com/edge/gateways)

### 第 #2 步，添加 IoT Pixel（标签） {#step-2-adding-iot-pixel-label}

#### 在 Wiliot 门户中 {#on-the-wiliot-portal-1}

- 登录 Wiliot 平台并进入“Category”选项卡 → [https://platform.wiliot.com/categories](https://platform.wiliot.com/categories)。添加新的“Category”（“Add new”）。为其命名并选择所需的类别类型。
- 进入“Pixels”选项卡 → [https://platform.wiliot.com/edge/pixels](https://platform.wiliot.com/edge/pixels)。检查标签的“ID”。标签应已分配到你的账户。
- 进入“Assets”选项卡 → [https://platform.wiliot.com/assets](https://platform.wiliot.com/assets)。创建新资产（“Add New”）。选择/链接该资产到之前创建的“Category”，输入“Asset ID”（或生成一个随机 ID），并从列表中选择 pixel 的 ID。
- 点击创建的“asset”条目后（当标签已通电且网关准备就绪时），将能够查看标签的读数（温度等）。

## RouterOS 设置 {#routeros-settings}

**子菜单：** `/iot/wiliot`

***说明**：* 需要 **iot** 软件包。

| 属性 | 说明 |
| :-- | :-- |
| **configuration** | 常规 Wiliot 网关/网桥设置。 |
| **servers** | MQTT 服务器配置。 |
| **bluetooth traffic** | 蓝牙流量菜单。 |
| **mqtt traffic** | MQTT 流量菜单。 |

### 配置（常规选项） {#configuration-general-options}

要启用配置，请使用以下命令：

```routeros
/iot/wiliot/enable
```

要禁用配置：

```routeros
/iot/wiliot/disable
```

要清除（清除）MQTT 连接/认证数据（仅在“disabled”时可用）：

```routeros
/iot/wiliot/disable
/iot/wiliot/clear
```

:::info
“清除”配置后，必须删除网关（[https://platform.wiliot.com/edge/gateways](https://platform.wiliot.com/edge/gateways)）并重新注册网关（[https://deployment-tool.wiliot.com/](https://deployment-tool.wiliot.com/)）。
:::

可以使用“set”命令应用配置属性（仅在“disabled”时可用）：

```routeros
/iot/wiliot/set
```

Example:

```routeros
/iot/wiliot/set features=gateway
```

| 属性 | 描述 |
| :-- | :-- |
| **advertiser**（默认：bt1） | 选择用于广播的 Bluetooth 接口（转发从 MQTT 服务器获取的命令）。 |
| **scanner**（默认：bt1） | 选择用于扫描的 Bluetooth 接口（捕获 Pixel 的 payload）。 |
| **spoof-gps**（*yes \| no*；默认：no） | 选择是否使用将发送到服务器的手动 GPS 坐标。 |
| **lat**（默认：） | 设置使用“spoof-gps”时在与服务器连接期间包含的 GPS 纬度值。 |
| **long**（默认：） | 设置使用“spoof-gps”时在与服务器连接期间包含的 GPS 经度值。 |
| **features**（*gateway \| bridge*；默认：） | 选择设备角色：<br/><ul><li><strong>gateway</strong>。在此模式下，设备与服务器建立 MQTT 连接，并将 scanner 捕获的 IoT Pixel beacon 转发到服务器。它还会向附近的 bridge 广播从订阅主题收到的命令。</li><li><strong>bridge</strong>。在此模式下，设备为周围的 IoT Pixel 供电。</li></ul><br/><strong>注意：</strong><code>bridge</code> 模式尚未实现。<br/> |
| **server**（默认：） | 设置用于 MQTT 连接的服务器。 |

### Servers

要更改 MQTT 服务器设置：

| 属性 | 说明 |
| :-- | :-- |
| **address**（默认：） | MQTT 服务器的 IP/域名地址。 |
| **certificate**（默认：） | 如果服务器要求，指定用于 SSL MQTT 连接的[证书存储中的证书](/docs/authentication-authorization-accounting/certificates)。 |
| **name**（默认：） | 服务器名称。 |
| **port**（默认：） | MQTT 服务器使用的 TCP 端口。 |
| **ssl**（yes \| no；默认：） | 启用与服务器的 SSL 通信。 |

### Bluetooth 流量 {#bluetooth-traffic}

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

### Debugging

可以使用以下命令启用“wiliot”调试日志：

```routeros
/system/logging
add topics=wiliot
```

因此，你会在日志中看到更详细的条目（`/log/print` 命令）：

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

Wiliot 功能使用 [/tool/fetch](/docs/7.24/system-information-and-utilities/fetch) 发起 HTTP 请求，并使用 [/mqtt](/docs/7.24/internet-of-things/mqtt) 建立 MQTT 连接。HTTP 和 MQTT 都需要 SSL 证书。RouterOS 具有“builtin trust store”，从一开始就包含所有必需的证书。

**[默认情况下](/docs/7.24/authentication-authorization-accounting/certificates#settings)，**“**all**”**服务应被允许使用内置证书存储**，因此无需执行任何操作。但是，如果你决定限制该权限（不允许“all”服务访问“store”），要使“wiliot”正常工作，需要启用“wiliot”、“mqtt”和“fetch”服务（或禁用 builtin-trust-store 并手动上传证书）：

```routeros
[admin@MikroTik] > /certificate/settings/print
  builtin-trust-store: fetch                    
                       mqtt                      
                       wiliot                     
         crl-download: no    
              crl-use: no    
            crl-store: ram 
```
