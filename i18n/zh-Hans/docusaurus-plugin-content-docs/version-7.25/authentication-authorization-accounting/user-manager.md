---
title: "用户管理器"
description: "RouterOS 中的 User Manager 为 DHCP、Hotspot 和 PPP 等服务提供集中式 RADIUS 认证和授权，并支持多种认证方法。它包含用于隧道配置和会话管理的可自定义 RADIUS 属性，许可会影响活动会话。"
tags:
  - 'radius'
  - 'authentication'
  - 'authorization'
source: https://manual.mikrotik.com/docs/7.25/authentication-authorization-accounting/user-manager
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 概述 {#overview}

User Manager 是 RouterOS 中的 RADIUS 服务器实现，可为特定服务提供集中式用户身份验证和授权。集中式用户数据库有助于更好地跟踪系统用户和客户。作为独立软件包，User Manager 可用于除 SMIPS 之外的所有架构；但由于可用空闲空间有限，需要谨慎使用。它支持多种身份验证方法，包括 PAP、CHAP、MS-CHAP、MS-CHAPv2、EAP-TLS、EAP-TTLS 和 EAP-PEAP。在 RouterOS 中，DHCP、Dot1x、Hotspot、IPsec、PPP 和 Wireless 是最能从 User Manager 中受益的功能。每个用户都可以通过 WEB 接口查看账户统计信息并管理可用配置文件。此外，用户可以使用最流行的支付网关 PayPal 购买自己的数据套餐（配置文件），这使其成为服务提供商的理想系统。可以生成定制报告，以简化计费部门的处理工作。User Manager 按照 [RFC2865](https://tools.ietf.org/html/rfc2865) 和 [RFC3579](https://tools.ietf.org/html/rfc3579) 中定义的 RADIUS 标准工作。

User Manager 是受 RouterOS 许可证级别限制的功能之一。根据 [许可证级别](/docs/7.24/getting-started/routeros-licensing/x86#routeros-license-key-levels)，活动会话数量将受到限制，包括每个用户的多个连接（而非唯一账户）。

![](/img/074aaadffaa40983.webp)

## Attributes

**子菜单：** `/user-manager/attribute`

RADIUS 属性定义了在 RADIUS 服务器和客户端之间传递的授权、信息和配置参数。User Manager 允许发送在“attributes”菜单中定义的自定义属性。RouterOS 已有一组预定义属性，但必要时也可以添加其他属性。预定义属性：

| 属性 | 厂商 ID | 类型 ID | 值类型 | 数据包类型 | 描述 |
| :-- | :-- | :-- | :-- | :-- | :-- |
| Framed-IP-Address | 0（标准） | 8 | ip address | Access-Accept | <a href="https://tools.ietf.org/html/rfc2865#section-5.8" target="_blank" rel="noopener noreferrer">RFC2865 section 5.8</a> |
| Framed-IP-Netmask | 0（标准） | 9 | <code>/ip/address</code> | Access-Accept | <a href="https://tools.ietf.org/html/rfc2865#section-5.9" target="_blank" rel="noopener noreferrer">RFC2865 section 5.9</a> |
| Session-Timeout | 0（标准） | 27 | integer（最大值：21474720） | Access-Accept、Access-Challenge | <a href="https://tools.ietf.org/html/rfc2865#section-5.27" target="_blank" rel="noopener noreferrer">RFC2865 section 5.27</a> |
| Idle-Timeout | 0（标准） | 28 | integer | Access-Accept、Access-Challenge | <a href="https://tools.ietf.org/html/rfc2865#section-5.28" target="_blank" rel="noopener noreferrer">RFC2865 section 5.28</a> |
| Tunnel-Type | 0（标准） | 64 |  | 值 | 描述 |
| 值 | 描述 |  |  |  |  |
| 1 | Point-to-Point Tunneling Protocol（PPTP） |  |  |  |  |
| 2 | Layer Two Forwarding（L2F） |  |  |  |  |
| 3 | Layer Two Tunneling Protocol（L2TP） |  |  |  |  |
| 4 | Ascend Tunnel Management Protocol（ATMP） |  |  |  |  |
| 5 | Virtual Tunneling Protocol（VTP） |  |  |  |  |
| 6 | IP Authentication Header in the Tunnel-mode（AH） |  |  |  |  |
| 7 | IP-in-IP Encapsulation（IP-IP） |  |  |  |  |
| 8 | Minimal IP-in-IP Encapsulation（MIN-IP-IP） |  |  |  |  |
| 9 | IP Encapsulating Security Payload in the Tunnel-mode（ESP） |  |  |  |  |
| 10 | Generic Route Encapsulation（GRE） |  |  |  |  |
| 11 | Bay Dial Virtual Services（DVS） |  |  |  |  |
| 12 | IP-in-IP Tunneling |  |  |  |  |
| 13 | Virtual LAN |  |  |  |  |
| Tunnel-Medium-Type | 0（标准） | 65 |  | 值 | 描述 |
| 值 | 描述 |  |  |  |  |
| 1 | IPv4（IP version 4） |  |  |  |  |
| 2 | IPv6（IP version 6） |  |  |  |  |
| 3 | NSAP |  |  |  |  |
| 4 | HDLC（8-bit multidrop） |  |  |  |  |
| 5 | BBN 1822 |  |  |  |  |
| 6 | 802（包括所有 802 介质以及以太网“canonical format”） |  |  |  |  |
| 7 | E.163（POTS） |  |  |  |  |
| 8 | E.164（SMDS、Frame Relay、ATM） |  |  |  |  |
| 9 | F.69（Telex） |  |  |  |  |
| 10 | X.121（X.25、Frame Relay） |  |  |  |  |
| 11 | IPX |  |  |  |  |
| 12 | Appletalk |  |  |  |  |
| 13 | Decnet IV |  |  |  |  |
| 14 | Banyan Vines |  |  |  |  |
| 15 | E.164 with NSAP format subaddress |  |  |  |  |
| Tunnel-Private-Group-ID | 0（标准） | 81 | string | Access-Accept | <a href="https://tools.ietf.org/html/rfc2868#section-3.6" target="_blank" rel="noopener noreferrer">RFC2868 section 3.6</a> |
| Framed-Pool | 0（标准） | 88 | string | Access-Accept | <a href="https://tools.ietf.org/html/rfc2869#section-5.18" target="_blank" rel="noopener noreferrer">RFC2869 section 5.18</a> |
| Framed-IPv6-Prefix | 0（标准） | 97 | ipv6 prefix | Access-Accept | <a href="https://tools.ietf.org/html/rfc3162#section-2.3" target="_blank" rel="noopener noreferrer">RFC3162 section 2.3</a> |
| Framed-IPv6-Pool | 0（标准） | 100 | string | Access-Accept | <a href="https://tools.ietf.org/html/rfc3162#section-2.6" target="_blank" rel="noopener noreferrer">RFC3162 section 2.6</a> |
| Delegated-IPv6-Prefix | 0（标准） | 123 | ipv6 prefix | Access-Accept | <a href="https://tools.ietf.org/html/rfc4818" target="_blank" rel="noopener noreferrer">RFC4818</a> |
| Framed-IPv6-Address | 0（标准） | 168 | ip address | Access-Accept | <a href="https://tools.ietf.org/html/rfc6911#section-3.1" target="_blank" rel="noopener noreferrer">RFC6911 section 3.1</a> |
| Mikrotik-Recv-Limit | 14988（Mikrotik） | 1 | integer | Access-Accept | 客户端的总接收限制，单位为字节。 |
| Mikrotik-Xmit-Limit | 14988（Mikrotik） | 2 | integer | Access-Accept | 客户端的总发送限制，单位为字节。 |
| Mikrotik-Group | 14988（Mikrotik） | 3 | string | Access-Accept | 本地用户的用户组。<br/> HotSpot 用户的 HotSpot 配置文件。<br/> PPP 用户的 PPP 配置文件。 |
| Mikrotik-Wireless-Forward | 14988（Mikrotik） | 4 | integer | Access-Accept | 如果该属性设置为“0”，则不将客户端的数据帧转发回无线基础设施（仅限无线）。 |
| Mikrotik-Wireless-Skip-Dot1x | 14988（Mikrotik） | 5 | integer | Access-Accept | 如果设置为非零值，则为特定无线客户端禁用 802.1x 身份验证（仅限无线）。 |
| Mikrotik-Wireless-Enc-Algo | 14988（Mikrotik） | 6 |  | 值 | 描述 |
| 值 | 描述 |  |  |  |  |
| 0 | No-encryption |  |  |  |  |
| 1 | 40-bit-WEP |  |  |  |  |
| 2 | 104-bit-WEP |  |  |  |  |
| 3 | AES-CCM |  |  |  |  |
| 4 | TKIP |  |  |  |  |
| Mikrotik-Wireless-Enc-Key | 14988（Mikrotik） | 7 | string | Access-Accept | 客户端的 WEP 加密密钥（仅限无线）。 |
| Mikrotik-Rate-Limit | 14988（Mikrotik） | 8 | string | Access-Accept | 客户端的数据速率限制。格式为：rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time] [priority] [rx-rate-min[/tx-rate-min]]]]，从路由器的角度来看（因此“rx”是客户端上传，“tx”是客户端下载）。所有速率都应为数字，并可带可选的 'k'（1,000 倍）或 'M'（1,000,000 倍）。如果未指定 tx-rate，则 rx-rate 也用作 tx-rate。tx-burst-rate、tx-burst-threshold 和 tx-burst-time 也是如此。如果未指定 rx-burst-threshold 和 tx-burst-threshold（但指定了 burst-rate），则 rx-rate 和 tx-rate 用作突发阈值。如果未指定 rx-burst-time 和 tx-burst-time，则默认使用 1s。Priority 取值为 1..8，其中 1 表示最高优先级，8 表示最低优先级。如果未指定 rx-rate-min 和 tx-rate-min，则使用 rx-rate 和 tx-rate 值。rx-rate-min 和 tx-rate-min 值不能超过 rx-rate 和 tx-rate 值。 |
| Mikrotik-Realm | 14988（Mikrotik） | 9 | string | Access-Request | 如果在 /radius 菜单中设置，则会作为 Mikrotik-Realm 属性包含在每个 RADIUS 请求中。如果未设置，则发送与 MS-CHAP-Domain 属性相同的值（如果缺少 MS-CHAP-Domain，也不会包含 Realm）。 |
| Mikrotik-Host-IP | 14988（Mikrotik） | 10 | ip address | Access-Request | Universal Client 转换前 HotSpot 客户端的 IP 地址（客户端的原始 IP 地址）。 |
| Mikrotik-Mark-Id | 14988（Mikrotik） | 11 | string | Access-Accept | 防火墙 mangle 链名称（仅限 HotSpot）。MikroTik RADIUS 客户端收到该属性后，会创建一条动态防火墙 mangle 规则，动作为 action=jump、链为 chain=hotspot，jump-target 等于属性值。Mangle 链名称可以带有后缀 .in 或 .out，这会仅为入站或出站流量安装规则。可以提供多个 Mark-id 属性，但只使用最后一个入站和出站属性。 |
| Mikrotik-Advertise-URL | 14988（Mikrotik） | 12 | string | Access-Accept | 应向客户端显示的广告页面的 URL。如果指定了该属性，则会自动启用广告，包括透明代理，即使在相应用户配置文件中已明确禁用广告也是如此。RADIUS 服务器可以发送多个属性实例，以指定按轮询方式选择的其他 URL。 |
| Mikrotik-Advertise-Interval | 14988（Mikrotik） | 13 | integer | Access-Accept | 两条相邻广告之间的时间间隔。RADIUS 服务器可以发送多个属性实例，以指定其他间隔。所有间隔值都作为列表处理，并在每次成功展示广告时逐一取值。如果到达列表末尾，则继续使用最后一个值。 |
| Mikrotik-Recv-Limit-Gigawords | 14988（Mikrotik） | 14 | integer | Access-Accept | 总接收限制的 4G（2^32）字节部分（位 32..63，位 0..31 在 Mikrotik-Recv-Limit 中传递）。 |
| Mikrotik-Xmit-Limit-Gigawords | 14988（Mikrotik） | 15 | integer | Access-Accept | 总发送限制的 4G（2^32）字节部分（位 32..63，位 0..31 在 Mikrotik-Xmit-Limit 中传递）。 |
| Mikrotik-Wireless-PSK | 14988（Mikrotik） | 16 | string | Access-Accept |  |
| Mikrotik-Total-Limit | 14988（Mikrotik） | 17 | integer | Access-Accept |  |
| Mikrotik-Total-Limit-Gigawords | 14988（Mikrotik） | 18 | integer | Access-Accept |  |
| Mikrotik-Address-List | 14988（Mikrotik） | 19 | string | Access-Accept |  |
| Mikrotik-Wireless-MPKey | 14988（Mikrotik） | 20 | string | Access-Accept |  |
| Mikrotik-Wireless-Comment | 14988（Mikrotik） | 21 | string | Access-Accept |  |
| Mikrotik-Delegated-IPv6-Pool | 14988（Mikrotik） | 22 | string | Access-Accept | 用于 Prefix Delegation 的 IPv6 地址池。 |
| Mikrotik-DHCP-Option-Set | 14988（Mikrotik） | 23 | string | Access-Accept |  |
| Mikrotik-DHCP-Option-Param-STR1 | 14988（Mikrotik） | 24 | string | Access-Accept |  |
| Mikrotik-DHCP-Option-Param-STR2 | 14988（Mikrotik） | 25 | string | Access-Accept |  |
| Mikrotik-Wireless-VLANID | 14988（Mikrotik） | 26 | integer | Access-Accept | 客户端的 VLAN ID（仅限 Wireless）。 |
| Mikrotik-Wireless-VLANIDtype | 14988（Mikrotik） | 27 |  | 值 | 描述 |
| 值 | 描述 |  |  |  |  |
| 0 | 802.1q |  |  |  |  |
| 1 | 802.1ad |  |  |  |  |
| Mikrotik-Wireless-Minsignal | 14988（Mikrotik） | 28 | string | Access-Accept |  |
| Mikrotik-Wireless-Maxsignal | 14988（Mikrotik） | 29 | string | Access-Accept |  |
| Mikrotik-Switching-Filter | 14988（Mikrotik） | 30 | string | Access-Accept | 使用 dot1x 服务器对客户端进行身份验证时，允许创建动态交换规则。 |

**Properties**

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string*；默认值：) | 属性名称。 |
| **packet-types** (*string*；默认值：**access-accept**) | <ul><li>access-accept - 在 RADIUS Access-Accept 消息中使用该属性</li><li>access-challenge - 在 RADIUS Access-Challenge 消息中使用该属性</li></ul> |
| **type-id** (*integer:1..255*；默认值：) | 来自特定厂商属性数据库的属性标识号。 |
| **value-type** (*string*；默认值：) | <ul><li>hex</li><li>ip-address - IPv4 或 IPv6 IP 地址</li><li>ip6-prefix - IPv6 前缀</li><li>macro</li><li>string</li><li>uint32</li></ul> |
| **vendor-id** (*integer*；默认值：**0**) | IANA 分配的特定企业标识号。 |

## Database

**子菜单：** `/user-manager/database`

所有与 RADIUS 相关的信息都存储在 User Manager 的独立数据库中，可在“database”子菜单下配置。“Enabled”和“db-path”是唯一不存储在 User Manager 数据库中，而是存储在 RouterOS 主配置表中的参数，这意味着这些参数会受到 RouterOS 配置重置的影响。其余配置、会话和支付数据存储在设备 FLASH 存储上的独立 SQLite 数据库中。对数据库执行任何操作时，建议在任何活动前后都进行备份。

### 属性 {#properties}

| Property | Description |
| :-- | :-- |
| **db-path** (*string*; Default: ) | 数据库文件的存储路径。 |

### 只读属性 {#read-only-properties}

| Property | Description |
| :-- | :-- |
| **db-size** | 数据库的当前大小。 |
| **free-disk-space** | 存储数据库的磁盘上的剩余可用空间。 |

### 命令 {#commands}

| Property | Description |
| :-- | :-- |
| **load** (*name*) | 恢复以前创建的 .umb 格式备份文件。 |
| **migrate-legacy-db** (*database-path; overwrite*) | 将旧版 User Manager（来自 RouterOS v6 或更早版本）转换为新标准。可以覆盖当前数据库。 |
| **optimize-db** () |  |
| **save** (name; overwrite) | 保存 User Manager 数据库的当前状态。 |

## Limitations

**子菜单：** `/user-manager/limitation`

限制由 Profiles 使用，并通过 Profile-Limitations 关联在一起。要无缝切换多个限制，或在达到 *download-limit*、*upload-limit* 或 *uptime-limit* 时断开活动会话，必须启用 RADIUS 计费和 Interim 更新。

要从 User Manager 断开已活动的会话，必须在 RADIUS 客户端侧将 *accept* 设置为 *yes*。如果并发会话限制不是无限制的（shared-users），并且已达到允许的最大数量，则路由器会先尝试断开较旧的用户会话。

User-Manager 会在接受新用户之前尝试断开活动会话（当设置了相应限制时）。因此，在此类配置中，建议为 `/radius/client/timeout` 使用 1s。

:::danger
RouterOS 中的 IPsec 服务不支持速率限制。
:::

## 属性 {#properties-1}

| Property | Description |
| :-- | :-- |
| **comment** (*string*; Default: ) | 限制的简短描述。 |
| **download-limit** (*integer*; Default: **0**) | 用户可下载的总流量，单位为字节。 |
| **name** (*string*; Default: ) | 限制的唯一名称。 |
| **rate-limit-burst-rx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](/docs/7.24/firewall-and-quality-of-service/queues)。 |
| **rate-limit-burst-threshold-rx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](/docs/7.24/firewall-and-quality-of-service/queues)。 |
| **rate-limit-burst-threshold-tx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](/docs/7.24/firewall-and-quality-of-service/queues)。 |
| **rate-limit-burst-time-rx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](/docs/7.24/firewall-and-quality-of-service/queues)。 |
| **rate-limit-burst-time-tx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](/docs/7.24/firewall-and-quality-of-service/queues)。 |
| **rate-limit-burst-tx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](/docs/7.24/firewall-and-quality-of-service/queues)。 |
| **rate-limit-min-rx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](/docs/7.24/firewall-and-quality-of-service/queues)。 |
| **rate-limit-min-tx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](/docs/7.24/firewall-and-quality-of-service/queues)。 |
| **rate-limit-priority** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](/docs/7.24/firewall-and-quality-of-service/queues)。 |
| **rate-limit-rx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](/docs/7.24/firewall-and-quality-of-service/queues)。 |
| **rate-limit-tx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](/docs/7.24/firewall-and-quality-of-service/queues)。 |
| **reset-counters-interval** (*hourly* \| *daily* \| *weekly* \| *monthly* \| *disabled*); Default: **disabled**) | 从 *reset-counters-start-time* 开始计算的间隔，到期后清除所有关联的用户统计信息。 |
| **reset-counters-start-time** (*datetime*; Default: ) | 用于计算 *reset-counters-interval* 的固定日期和时间值。 |
| **transfer-limit** (*integer*; Default: **0**) | 聚合流量（下载+上传）的总量，单位为字节。 |
| **upload-limit** (*integer*; Default: **0**) | 用户可上传的总流量，单位为字节。 |
| **uptime-limit** (*time*; Default: **00:00:00**) | 用户可保持活动状态的总在线时长。 |

## Payments

**子菜单：** `/user-manager/payment`

此部分提供有关所有已收到付款的信息。

**只读属性**

| 属性 | 说明 |
| :-- | :-- |
| **currency** (*string*) | 交易中使用的货币。 |
| **method** (*string*) | 用于交易的服务（目前仅 PayPal）。 |
| **price** (*decimal*) | 用户支付的金额。 |
| **profile** (*profile*) | 用户购买的 profile 名称。 |
| **trans-end** (*datetime*) | 交易结束的日期和时间。 |
| **trans-start** (*datetime*) | 交易开始的日期和时间。 |
| **trans-status** (*string*) | 交易状态。可能的状态包括 *started*、*pending*、*approved*、*declined*、*error*、*timeout*、*aborted*、*user approved*。仅 *approved* 应视为完整交易。 |
| **user** (*string*; Default: ) | 执行交易的用户名称。 |
| **user-message** (*string*; Default: ) |  |

## Profiles

**子菜单：** `/user-manager/profile`

### 属性 {#properties-2}

| 属性 | 说明 |
| :-- | :-- |
| **comment** (*string*; Default: ) | 条目的简短说明。 |
| **name** (*string*; Default: ) | profile 的唯一名称。 |
| **name-for-users** (*string*; Default: ) | 在 Web 页面上向用户显示的 profile 名称。 |
| **override-shared-users** (*decimal \| off \| unlimited*; Default: **off**) | 是否允许使用相同用户名建立多个会话。该设置会覆盖 *shared-users* 设置。 |
| **price** (*decimal*; Default: **0.00**) |  |
| **starts-when** (*assigned* \| *first-auth*; Default: **assigned**) | profile 变为活动状态的时间。*Assigned* - 创建 User Profile 条目后立即生效。*First-auth* - 在用户首次认证请求时生效。 |
| **validity** (*time \| unlimited*; Default: **unlimited**) | 用户可以使用该 profile 的总时长。 |

## Profile 限制 {#profile-limitations}

**子菜单：** `/user-manager/profile-limitation`

Profile-Limitations 表将 Limitations 和 Profiles 关联在一起，并定义其有效期。当多个 Limitations 分配给同一个 Profile 时，用户必须满足所有 Limitations 才能建立会话。这可用于创建更复杂的配置，例如分别设置月度带宽限制和每日带宽限制。

### 属性 {#properties-3}

| 属性 | 说明 |
| :-- | :-- |
| **comment** (*string*; Default: ) | 条目的简短描述。 |
| **from-time** (*time*; Default: **00:00:00**) | 限制开始的时间。 |
| **limitation** (*limitation*; Default: ) | 已创建的 **Limitation** 的名称。 |
| **profile** (*profile*; Default: ) | 已创建的 **Profile** 的名称。 |
| **till-time** (*time*; Default: **23:59:59**) | 限制结束的时间。 |
| **weekdays** (*day of week*; Default: **Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday**) | 限制生效的星期几。 |

## Routers

**子菜单：** `/user-manager/router`

在此可定义可以将 User Manager 用作 RADIUS 服务器的 NAS 设备。

### 属性 {#properties-4}

| 属性 | 说明 |
| :-- | :-- |
| **coa-port** (*integer:1..65535*; Default: **3799**) | CoA（Change of Authorization）通信的端口号。 |
| **address** (*IP/IPv6***;** Default: ) | RADIUS 客户端的 IP 地址。 |
| **comment** (*string*; Default: ) | NAS 的简短描述。 |
| **disabled** (*yes \| no*; Default: **no**) | 控制该条目当前是否生效。 |
| **name** (*string*; Default: ) | RADIUS 客户端的唯一名称。 |
| **protocol**(*radsec*\| *udp*;Default udp) | 与路由器一起使用的协议。 |
| **shared-secret** (*string*; Default: ) *[敏感参数](/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于保护 RADIUS 服务器和 RADIUS 客户端之间的通信。 |

### 命令 {#commands-1}

| 属性 | 说明 |
| :-- | :-- |
| **reset-counters** () | 清除指定 RADIUS 客户端的所有统计信息。 |

## Sessions

**子菜单：** `/user-manager/session`

仅当 NAS 上启用计费时，才会记录会话。

**只读属性**

| 属性 | 说明 |
| :-- | :-- |
| **acct-session-id** (*string*) | 计费会话的唯一标识。 |
| **active** (*yes \| no*) | 会话当前是否正在使用。 |
| **calling-station-id** (*string*) | 用户标识符，通常为 IP 地址或 MAC 地址。 |
| **download** (*Bytes*) | 下载的流量大小。 |
| **ended** (*datetime*) | 会话关闭的日期和时间。活动会话为空。 |
| **last-accounting-packet** (*datetime*) | 收到最后一次计费更新的日期和时间。 |
| **nas-ip-address** (*IP address*) | NAS 的 IP 地址。 |
| **nas-port-id** (*string*) | 正在对用户进行认证的 NAS 端口标识符。 |
| **nas-port-type** (*string*) | 正在对用户进行认证的端口类型（*physical* 或 *virtual*）。 |
| **started** (*datetime*) | 会话建立的日期和时间。 |
| **status** (*list of statuses*) | 会话的可能状态：*start -* 已收到计费消息 *Start*，*stop -* 已收到计费消息 *Stop*，*interim - Interim update* 已收到，*close-acked* - 会话已成功关闭，*expired.* |
| **terminate-cause** (*string*) | 会话关闭的原因。 |
| **upload** (*Bytes*) | 上传的流量大小。 |
| **uptime** (*time*) | 会话记录的总在线时长。 |
| **user** (*string*) | 用户名。 |
| **user-address** (*IP address*) | 提供给用户的 IP 地址。 |

## 设置 {#settings}

**子菜单：** `/user-manager`

**Properties**

| 属性 | 说明 |
| :-- | :-- |
| **accounting-port** (*integer*；默认：**1813**) | 监听 RADIUS accounting 请求的端口。 |
| **authentication-port**(*integer*；默认：**1812**) | 监听 RADIUS authentication 请求的端口。 |
| ***certificate*** (*certificate*；默认：) | 用于 EAP TLS 类型认证方法的[证书存储中的证书](/docs/authentication-authorization-accounting/certificates)。 |
| ***enabled*** (*yes \| no*；默认：**no**) | 是否启用 User Manager 功能。 |
| **radsec-certificate**(certificate；默认:) | 用于 RadSec 协议的[证书存储中的证书](/docs/authentication-authorization-accounting/certificates)。 |
| **use-profiles**(*yes \| no*；默认：**no**) | 是否使用 **Profiles** 和 **Limitations**。设置为 *no* 时，运行 User Manager 只需配置 **User**。 |

### Advanced

**子菜单：** `/user-manager/advanced`

**Properties**

| 属性 | 说明 |
| :-- | :-- |
| **paypal-allow** (*yes \| no*；默认：**no**) | 是否为 User Manager 启用 PayPal 功能。 |
| **paypal-currency** (*string*；默认：**USD**) | 与 *price* 设置关联的货币，用户将按该货币计费。 |
| **paypal-password** (*string*；默认：) *[sensitive](/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | PayPal API 账户的密码。 |
| **paypal-signature** (*string*；默认：) | PayPal API 账户的签名。 |
| **paypal-use-sandbox** (*yes \| no*；默认：**no**) | 是否使用 PayPal 的 sandbox 环境进行测试。 |
| **paypal-user** (*string*；默认：) | PayPal API 账户的用户名。 |
| **web-private-password** (*string*；默认：) *[sensitive](/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 通过 HTTP 访问 */um/PRIVATE/* 区域所需的密码。 |
| **web-private-username** (*string*；默认：) | 通过 HTTP 访问 */um/PRIVATE/* 区域所需的用户名。 |

## Users

**子菜单：** `/user-manager/user`

### 属性 {#properties-5}

| 属性 | 说明 |
| :-- | :-- |
| **attributes** (*array of attributes*；默认：) | 自定义 **Attributes** 及其值，这些值将额外添加到 Access-Accept 消息中。 |
| **caller-id**(*string*；默认：) | 允许用户使用特定的 *Calling-Station-Id* 值进行身份验证。 |
| **comment** (*string*；默认：) | 用户的简短说明。 |
| **disabled** (*yes \| no*；默认：**no**) | 控制用户是否可用。 |
| **group** (*group*；默认：**default**) | 用户所属 **Group** 的名称。 |
| **name** (*string*；默认：) | 用于会话身份验证的用户名。 |
| **otp-secret** (*string*；默认：) *[sensitive](/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 附加到密码的一次性密码令牌。 |
| **password** (*string*；默认：) *[sensitive](/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用户用于会话身份验证的密码。 |
| **shared-users** (*integer \| unlimited*；默认：**1**) | 用户可同时建立会话的总数。 |

### 命令 {#commands-2}

| 属性 | 说明 |
| :-- | :-- |
| **add-batch-users** () | 该命令可根据各种参数生成多个用户账户。 |
| **generate-voucher** () | 基于 *voucher-template* 生成可提供给最终用户的文件。 |
| **monitor** () | 显示用户的总统计信息。统计信息包括 *total-uptime*、*total-download*、*total-upload*、*active-sessions*、*actual-profile*、*attributes-details*。 |

## 用户组 {#user-groups}

**子菜单：** `/user-manager/user/group`

用户组定义多个用户的共同特征，例如允许的认证方法和 RADIUS 属性。User Manager 中已有两个组，名为 *default* 和 *default-anonymous*。

### 属性 {#properties-6}

| 属性 | 说明 |
| :-- | :-- |
| **attributes**（*array of attributes*；默认：） | 自定义 **Attributes** 及其值，这些属性会额外添加到该组用户的 Access-Accept 消息中。 |
| **comment**（*string*；默认：） | 组的简短说明。 |
| **inner-auths**（*list of auths*；默认：） | 隧道（outer）认证方法允许的内部认证方法列表。支持的内部认证方法包括 *ttls-pap*、*ttls-chap*、*ttls-mschap1*、*ttls-mschap2*、*peap-mschap2*。 |
| **name**（*string*；默认：） | 组的唯一名称。 |
| **outer-auths**（*list of auths*；默认：） | 允许的认证方法列表。支持的外部认证方法包括 *pap*、*chap*、*mschap1*、*mschap2*、*eap-tls*、*eap-ttls*、*eap-peap*、*eap-mschap2*。 |

## 用户配置文件 {#user-profiles}

**子菜单：** `/user-manager/user-profile`

此菜单为用户分配配置文件并跟踪配置文件状态。单个用户可以分配多个配置文件；但是，同一时间只能使用一个。当当前活动的配置文件到期时，用户会无缝切换到下一个配置文件，而不会中断用户会话。

### 属性 {#properties-7}

| 属性 | 说明 |
| :-- | :-- |
| **profile**（*profile*；默认：） | 要分配给用户的配置文件名称。 |
| **user**（*user*；默认：） | 使用特定配置文件的用户名称。 |

### 只读属性 {#read-only-properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **end-time** (*datetime*) | **User Profile** 过期的日期和时间。 |
| **state** (*running active* \| running \| *used*) | **User Profile** 的当前状态。*Running active -* 用户当前正在使用的配置文件。*Running* - 可供使用的配置文件。*Used* - 已过期且无法再激活的配置文件。 |

### 命令 {#commands-3}

| 属性 | 说明 |
| :-- | :-- |
| **activate-user-profile** () | 立即使某个 **User Profile** 条目生效。 |

## WEB 接口 {#web-interface}

每个用户都可以通过 WEB 接口访问其个人配置文件。通过在路由器 IP 或域名后添加“/um/”目录即可访问 WEB 接口，例如 `http://example.com/um/`。请注意，WEB 接口受 IP Services “www” 和 “www-ssl” 影响。可以使用 CSS、JavaScript 和 HTML 自定义 WEB 接口。

### 可自定义文件参考 {#customizable-file-reference}

| 文件 | 说明 |
| :-- | :-- |
| **css/login.css** | 用于登录提示页面的层叠样式表文件。 |
| **css/user.css** | 用于用户配置文件页面的层叠样式表文件。 |
| **img/PayPal\_mark\_37x23.gif** | PayPal 徽标图片。 |
| **img/ajax-loader.gif** | 页面切换处理期间显示的加载 gif。 |
| **img/mikrotik\_logo.png** | 所有页面上显示的 MikroTik 徽标。 |
| **js/generic.js** | 所有页面使用的 Javascript 文件。 |
| **js/login.js** | 登录提示页面使用的 Javascript 文件。 |
| **js/user.js** | 用户配置文件页面使用的 Javascript 文件。 |
| **user/login\_dynamic.html** | 登录提示页面的布局。 |
| **user/user\_dynamic.html** | 用户配置文件页面的布局。 |

## 应用指南 {#application-guides}

### 批量创建用户 {#batch-user-creation}

可以创建多个新用户，并随机生成用户名和密码。例如，以下命令将生成 3 个新用户，用户名由 6 个小写字符组成，密码由 6 个小写字母、大写字母和数字组成。

```ros
/user-manager/user
add-batch-users number-of-users=3 password-characters=lowercase,numbers,uppercase password-length=6 username-characters=lowercase username-length=6
```

可以通过打印 users 表查看命令生成的用户：

```ros
/user-manager/user/print 
Flags: X - disabled 
 0   name="olsgkl" password="86a6zH" otp-secret="" group=default shared-users=1 attributes="" 

 1   name="lkbwss" password="jaKY5V" otp-secret="" group=default shared-users=1 attributes="" 

 2   name="cwxbwu" password="a62yZd" otp-secret="" group=default shared-users=1 attributes="" 

```

### 向 NAS 提供自定义 RADIUS 属性 {#providing-nas-with-custom-radius-attributes}

可以在认证过程中发送额外的 RADIUS 属性，向 NAS 提供有关会话的自定义信息，例如应为 supplicant 分配哪个 IP 地址，或使用哪个地址池进行地址分配。

#### 为用户分配静态 IP 地址 {#static-ip-address-for-a-user}

要为终端用户分配静态 IP 地址，可以使用 *Framed-IP-Address* 属性。使用静态 IP 地址分配时，必须将 *shared-sessions* 设置为 1，以避免用户存在多个并发会话但只有一个 IP 地址的情况。例如：

```ros
/user-manager/user
set [find name=username] shared-users=1 attributes=Framed-IP-Address:192.168.1.4
```

#### 为一组用户指定地址池 {#specifying-address-pool-for-a-group-of-users}

可以将多个相似用户分组，并一次性为所有用户分配 RADIUS 属性。首先，创建一个新组：

```ros
/user-manager/user/group
add name=location1 outer-auths=chap,eap-mschap2,eap-peap,eap-tls,eap-ttls,mschap1,mschap2,pap \
inner-auths=peap-mschap2,ttls-chap,ttls-mschap1,ttls-mschap2,ttls-pap attributes=Framed-Pool:pool1
```

下一步是将用户分配到该组：

```ros
/user-manager/user
 set [find name=username] group=location1
```

在这种情况下，用户通过身份验证后将获得 *pool1* 中的 IP 地址，请确保 *pool1* 已在 NAS 设备上创建。

### 使用 TOTP（基于时间的一次性密码）进行用户身份验证 {#using-totp-time-based-one-time-password-for-user-authentication}

User Manager 支持在用户密码字段中添加基于时间的身份验证令牌，该令牌每 30 秒重新生成一次。

:::danger
OTP 依赖于时钟，请确保时间设置配置正确。
:::

TOTP 通过在请求方（客户端）和身份验证服务器（User Manager）上共享密钥来工作。要在 RouterOS 上配置 TOTP，只需为用户设置 *otp-secret*。例如：

```ros
/user-manager/user
set [find name=username] password=mypass otp-secret=mysecret

```

要在请求方计算 TOTP 令牌，可以使用许多广泛可用的应用程序，例如 Google Authenticator 或 [https://totp.app/](https://totp.app/)。将 mysecret 添加到 TOTP 令牌生成器后，会生成一个新的唯一 6 位代码，必须将该代码添加到用户密码中。

![](/img/41241175d691e7c4.webp)

以下示例将接受用户的身份验证，前提是在公共密码后附加了计算出的 TOTP 令牌，直到生成新的 TOTP 令牌。

```text
User-Name=username
User-Password=mypass620872
```

### 导出用户凭据 {#exporting-user-credentials}

#### **单个用户的可打印登录凭据** {#printable-login-credentials-for-a-single-user}

要生成单个用户的可打印凭证卡，只需使用 *generate-voucher* 命令。指定用户的 RouterOS ID 编号，或使用 *find* 命令指定用户名。User Manager 安装时已包含一个模板，可在设备的 Files 部分中找到。可以根据需要自定义该模板。

```ros
/user-manager/user
generate-voucher voucher-template=printable_vouchers.html [find where name=username]
```

生成的凭证卡可通过使用 WEB 浏览器访问路由器并导航到 */um/PRIVATE/GENERATED/vouchers/gen\_printable\_vouchers.html* 获取。

默认情况下，可打印卡片如下所示：

![](/img/f77afb5d13302de9.webp)

:::warning
要通过 WEB 浏览器访问 /um/ 目录的 PRIVATE 路径，必须配置 *private-username* 和 *private-password*。请参阅 **Settings** 部分。
:::

生成凭据时可以使用不同的变量。当前支持的变量如下：

$(username) - 表示 User Manager 用户名  
$(password) - 该用户的密码  
$(userprofname) - 该用户当前生效的 profile  
$(userprofendtime) - profile 的有效期结束时间（如果已指定）

#### 多个用户凭据导出 {#multiple-user-credential-export}

可以使用 *export.xml* 或 *export.csv* 作为 *voucher-template*，一次生成包含多个或所有用户凭据的 CSV 或 XML 文件。

```ros
/user-manager/user
generate-voucher voucher-template=export.xml [find]
```

该命令会生成 XML 文件 *um5files/PRIVATE/GENERATED/vouchers/gen\_export.xml*，可通过 WEB 浏览器或任何其他文件访问工具访问该文件。

```text
<?xml version="1.0" encoding="UTF-8"?>
<users>
    <user>
        <username>olsgkl</username>
        <password>86a6zH</password>
    </user>
    <user>
        <username>lkbwss</username>
        <password>jaKY5V</password>
    </user>
    <user>
        <username>cwxbwu</username>
        <password>a62yZd</password>
    </user>
    <user>
        <username>username</username>
        <password>secretpassword</password>
    </user>

</users>
```

### 生成使用报告 {#generating-usage-report}

当公司的计费或法务团队需要可展示的网络使用信息时，可以使用 *generate-report* 命令创建自动会话导出。该命令需要输入报告模板，模板示例位于 *um5files/PRIVATE/TEMPLATES/reports/report\_default.html*。报告生成示例：

```ros
/user-manager
generate-report report-template=report_default.html columns=username,uptime,download,upload
```

生成的报告可通过使用 WEB 浏览器访问路由器并导航到 */um/PRIVATE/GENERATED/reports/gen\_report\_default.html* 获取。

*![](/img/1a6f9e70c884c21f.webp)*

### 购买配置文件 {#purchasing-a-profile}

使用 WEB 浏览器访问路由器的 */um/* 目录（例如 http://example.com/um/）并登录用户私人配置文件后，用户可以在相应菜单中查看所有可用的 **Profiles**。指定了 *price* 值的配置文件将提供 *Buy this Profile* 按钮。

![](/img/a947415d24d11d74.webp)

按下 *Buy this Profile* 按钮后，系统会要求用户从可用的交易服务提供商中进行选择（当前仅支持 PayPal），随后将用户重定向到 PayPal 的支付处理页面。

![](/img/368b0af05bc7f389.webp)

支付完成后，User Manager 将请求 PayPal 确认交易。确认后，配置文件将分配给用户并可使用。![](/img/39c330686cc9db0e.webp)

### 从 RouterOS v6 迁移 {#migrating-from-routeros-v6}

将 User Manager 路由器从 RouterOS v6 升级到 v7 时，新的 User Manager 将使用新的数据库文件和配置。要继续使用旧的用户、路由器、配置文件等配置，必须手动执行 migrate 命令。为此，必须存在旧 User Manager 服务器文件夹“user-manager”中的文件。该文件夹可以重命名，但旧安装中的所有内容都必须转移到新的 v7 安装中（可以将旧配置从一台路由器迁移到另一台运行 v7 的路由器，但必须复制“user-manager”文件夹）。之后，只需执行以下命令：`/user-manager/database/migrate-legacy-db database-path=<path_to_old_user_manager_folder>`。

导入过程将尝试转换以下配置：用户、配置文件、user-profiles、限制、profile-limitations、user-counters、路由器和会话。

## 应用示例 {#application-examples}

### 使用 User Manager 认证的基本 L2TP/IPsec 服务器 {#basic-l2tpipsec-server-with-user-manager-authentication}

![](/img/5cb98b1471afb086.webp)

#### User Manager 配置 {#user-manager-configuration}

首先启用 User Manager 功能。

```ros
/user-manager
set enabled=yes
```

允许接收来自 localhost（路由器自身）的 RADIUS 请求。

```ros
/user-manager/router
add address=127.0.0.1 comment=localhost name=local shared-secret=test
```

接下来，添加客户端用于向服务器认证的账户及其凭据。

```ros
/user-manager/user
add name=user1 password=password
```

#### 配置 RADIUS 客户端 {#configuring-radius-client}

要使路由器使用 RADIUS 服务器进行用户认证，需要添加一个新的 RADIUS 客户端，其 shared secret 必须与已在 User Manager 中配置的相同。

```ros
/radius
add address=127.0.0.1 secret=test service=ipsec
```

#### L2TP/IPsec 服务器配置 {#l2tpipsec-server-configuration}

配置 IP 池，用于向用户分配 IP 地址，并将其分配给 PPP Profile。

```ros
/ip/pool
add name=vpn-pool range=192.168.99.2-192.168.99.100

/ppp/profile
set default-encryption local-address=192.168.99.1 remote-address=vpn-pool
```

启用使用 RADIUS 进行 PPP 身份验证。

```ros
/ppp/aaa
set use-radius=yes
```

启用带 IPsec 加密的 L2TP 服务器。

```ros
/interface/l2tp-server/server
set enabled=yes use-ipsec=required ipsec-secret=mySecret
```

至此，路由器已准备好接受 L2TP/IPsec 连接，并通过内部 User Manager 对其进行身份验证。

### RouterOS 用户登录的双因素身份验证（MFA/2FA） {#two-factor-authentication-for-routeros-user-login-mfa2fa}

由于 User-Manager 支持 TOTP（基于时间的一次性密码），因此可以为不同服务设置所谓的 MFA 身份验证。下面将介绍如何通过 User Manager（radius）使用每 30 秒更改一次的时间密码进行 RouterOS 用户身份验证。

**以下是 MikroTik 路由器上的必要配置选项。**

为 /user 菜单启用 RADIUS，并从 `/user/group` 菜单设置 default-group。请注意，系统会先检查本地 /user 数据库，然后联系 RADIUS。

```
/user/aaa/set use-radius=yes default-group=full
```

为 login 服务启用 radius 客户端。由于 User Manager 运行在同一台路由器上，因此使用 127.0.0.1，

```
/radius/add address=127.0.0.1 service=login secret=mystrongsecret
```

**以下是 User Manager 的配置步骤**，

确保已将受管设备添加到“Routers”菜单，

```
/user-manager/router/add name=myrouter address=127.0.0.1 shared-secret=mystrongsecret
```

向 User-Manager 用户表中添加一个带有 OTP secret 参数的用户。正确配置 OTP 还需要几个步骤。  
选择一个 OTP-secret 名称，并将其转换为 base32 格式（有许多在线工具可将 utf-8 转换为 base32 格式）。在我的配置中，我使用“mysupersecret”，其 base32 结果为 NV4XG5LQMVZHGZLDOJSXI===

```
/user-manager/user/add name=mikrotik password=mysuperpassword otp-secret="NV4XG5LQMVZHGZLDOJSXI==="
```

请注意，在常用的身份验证器应用中，添加新的时间密码实例时，需要为用户手动设置此密钥“NV4XG5LQMVZHGZLDOJSXI===”。

要登录 MikroTik 设备，请打开 Winbox/Console 并连接到路由器地址，使用 login:mikrotik 和 password:mysuperpasswordxxxxxx，其中 xxxxxx 是来自常用身份验证器应用的 6 位代码。

密码每 30 秒更改一次，可从常用应用中获取。

![](/img/73454df958b000d2.jpg)
