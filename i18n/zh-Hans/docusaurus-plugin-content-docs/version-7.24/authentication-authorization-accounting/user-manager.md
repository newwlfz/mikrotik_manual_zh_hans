---
sidebar_key: "authentication-authorization-accounting/user-manager"
sidebar_position: 6
title: "用户管理器"
sidebar_label: "用户管理器"
description: "RouterOS 中的 User Manager 为 DHCP、Hotspot 和 PPP 等服务提供集中式 RADIUS 认证与授权，并支持多种认证方式。它包含可自定义的 RADIUS 属性，用于隧道配置和会话管理，且许可会影响活动会话数量。"
tags:
  - 'radius'
  - 'authentication'
  - 'authorization'
source: https://manual.mikrotik.com/docs/7.24/authentication-authorization-accounting/user-manager
captured_at: '2026-11-04T11:27:17+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#overview}

User Manager 是 RouterOS 中的一种 RADIUS 服务器实现，可为特定服务提供集中的用户认证和授权。拥有中央用户数据库可以更好地跟踪系统用户和客户。作为一个单独的软件包，User Manager 除 SMIPS 外可在所有架构上使用；但是，由于可用空间有限，必须谨慎操作。它支持多种不同的认证方法，包括 PAP、CHAP、MS-CHAP、MS-CHAPv2、EAP-TLS、EAP-TTLS 和 EAP-PEAP。在 RouterOS 中，DHCP、Dot1x、Hotspot、IPsec、PPP 和 Wireless 是从 User Manager 中受益最多的功能。每个用户都可以使用 WEB 界面查看其账户统计信息并管理可用的配置文件。此外，用户可以使用最流行的支付网关 PayPal 购买自己的数据套餐（配置文件），这使其成为服务提供商的理想系统。可以生成自定义报告，以简化计费部门的处理工作。User Manager 按照 [RFC2865](https://tools.ietf.org/html/rfc2865) 和 [RFC3579](https://tools.ietf.org/html/rfc3579) 中定义的 RADIUS 标准工作。

User Manager 是受 RouterOS 许可证级别限制的 RouterOS 功能之一。根据[许可证级别](../getting-started/routeros-licensing/x86/index.md#routeros-license-key-levels)，活动会话的数量将受到限制，包括每个用户的多重连接（而非唯一账户）。

![](/img/074aaadffaa40983.webp)

## 属性 {#attributes}

**子菜单：** `/user-manager/attribute`

RADIUS 属性是定义授权、信息和配置的参数，在 RADIUS 服务器和客户端之间传递。User Manager 允许发送在 "attributes" 菜单中定义的自定义属性。RouterOS 已经提供了一组预定义属性，但如有必要也可以添加其他属性。预定义属性：

| 属性 | 供应商 ID | 类型 ID | 值类型 | 数据包类型 | 描述 |
| :-- | :-- | --: | :-- | :-- | :-- |
| Framed-IP-Address | 0 (标准) | 8 | IP 地址 | Access-Accept | <a href="https://tools.ietf.org/html/rfc2865#section-5.8" target="_blank" rel="noopener noreferrer">RFC2865 第 5.8 节</a> |
| Framed-IP-Netmask | 0 (标准) | 9 | <code>/ip/address</code> | Access-Accept | <a href="https://tools.ietf.org/html/rfc2865#section-5.9" target="_blank" rel="noopener noreferrer">RFC2865 第 5.9 节</a> |
| Session-Timeout | 0 (标准) | 27 | 整数（最大值：21474720） | Access-Accept, Access-Challenge | <a href="https://tools.ietf.org/html/rfc2865#section-5.27" target="_blank" rel="noopener noreferrer">RFC2865 第 5.27 节</a> |
| Idle-Timeout | 0 (标准) | 28 | 整数 | Access-Accept, Access-Challenge | <a href="https://tools.ietf.org/html/rfc2865#section-5.28" target="_blank" rel="noopener noreferrer">RFC2865 第 5.28 节</a> |
| Tunnel-Type | 0 (标准) | 64 |  | 值 | 描述 |
| 值 | 描述 |  |  |  |  |
| 1 | 点对点隧道协议 (PPTP) |  |  |  |  |
| 2 | 第二层转发 (L2F) |  |  |  |  |
| 3 | 第二层隧道协议 (L2TP) |  |  |  |  |
| 4 | Ascend 隧道管理协议 (ATMP) |  |  |  |  |
| 5 | 虚拟隧道协议 (VTP) |  |  |  |  |
| 6 | 隧道模式下的 IP 认证头 (AH) |  |  |  |  |
| 7 | IP-in-IP 封装 (IP-IP) |  |  |  |  |
| 8 | 最小 IP-in-IP 封装 (MIN-IP-IP) |  |  |  |  |
| 9 | 隧道模式下的 IP 封装安全载荷 (ESP) |  |  |  |  |
| 10 | 通用路由封装 (GRE) |  |  |  |  |
| 11 | Bay 拨号虚拟服务 (DVS) |  |  |  |  |
| 12 | IP-in-IP 隧道 |  |  |  |  |
| 13 | 虚拟局域网 |  |  |  |  |
| Tunnel-Medium-Type | 0 (标准) | 65 |  | 值 | 描述 |
| 值 | 描述 |  |  |  |  |
| 1 | IPv4 (IP 版本 4) |  |  |  |  |
| 2 | IPv6 (IP 版本 6) |  |  |  |  |
| 3 | NSAP |  |  |  |  |
| 4 | HDLC (8 位多点) |  |  |  |  |
| 5 | BBN 1822 |  |  |  |  |
| 6 | 802 (包括所有 802 介质以及 Ethernet "canonical format") |  |  |  |  |
| 7 | E.163 (POTS) |  |  |  |  |
| 8 | E.164 (SMDS、帧中继、ATM) |  |  |  |  |
| 9 | F.69 (Telex) |  |  |  |  |
| 10 | X.121 (X.25, Frame Relay) |  |  |  |  |
| 11 | IPX |  |  |  |  |
| 12 | Appletalk |  |  |  |  |
| 13 | Decnet IV |  |  |  |  |
| 14 | Banyan Vines |  |  |  |  |
| 15 | 带 NSAP 格式子地址的 E.164 |  |  |  |  |
| Tunnel-Private-Group-ID | 0 (标准) | 81 | 字符串 | Access-Accept | <a href="https://tools.ietf.org/html/rfc2868#section-3.6" target="_blank" rel="noopener noreferrer">RFC2868 第 3.6 节</a> |
| Framed-Pool | 0 (标准) | 88 | 字符串 | Access-Accept | <a href="https://tools.ietf.org/html/rfc2869#section-5.18" target="_blank" rel="noopener noreferrer">RFC2869 第 5.18 节</a> |
| Framed-IPv6-Prefix | 0 (标准) | 97 | IPv6 前缀 | Access-Accept | <a href="https://tools.ietf.org/html/rfc3162#section-2.3" target="_blank" rel="noopener noreferrer">RFC3162 第 2.3 节</a> |
| Framed-IPv6-Pool | 0 (标准) | 100 | 字符串 | Access-Accept | <a href="https://tools.ietf.org/html/rfc3162#section-2.6" target="_blank" rel="noopener noreferrer">RFC3162 第 2.6 节</a> |
| Delegated-IPv6-Prefix | 0 (标准) | 123 | IPv6 前缀 | Access-Accept | <a href="https://tools.ietf.org/html/rfc4818" target="_blank" rel="noopener noreferrer">RFC4818</a> |
| Framed-IPv6-Address | 0 (标准) | 168 | IP 地址 | Access-Accept | <a href="https://tools.ietf.org/html/rfc6911#section-3.1" target="_blank" rel="noopener noreferrer">RFC6911 第 3.1 节</a> |
| Mikrotik-Recv-Limit | 14988 (Mikrotik) | 1 | 整数 | Access-Accept | 客户端的接收总限制，单位为字节。 |
| Mikrotik-Xmit-Limit | 14988 (Mikrotik) | 2 | 整数 | Access-Accept | 客户端的发送总限制，单位为字节。 |
| Mikrotik-Group | 14988 (Mikrotik) | 3 | 字符串 | Access-Accept | 本地用户的用户组。 <br/> HotSpot 用户的 HotSpot profile。 <br/> PPP 用户的 PPP profile。 |
| Mikrotik-Wireless-Forward | 14988 (Mikrotik) | 4 | 整数 | Access-Accept | 如果此属性设置为 "0"，则不会将客户端的帧转发回无线基础设施（仅限无线）。 |
| Mikrotik-Wireless-Skip-Dot1x | 14988 (Mikrotik) | 5 | 整数 | Access-Accept | 如果设置为非零值，则对特定无线客户端禁用 802.1x 认证（仅限无线）。 |
| Mikrotik-Wireless-Enc-Algo | 14988 (Mikrotik) | 6 |  | 值 | 描述 |
| 值 | 描述 |  |  |  |  |
| 0 | No-encryption |  |  |  |  |
| 1 | 40-bit-WEP |  |  |  |  |
| 2 | 104-bit-WEP |  |  |  |  |
| 3 | AES-CCM |  |  |  |  |
| 4 | TKIP |  |  |  |  |
| Mikrotik-Wireless-Enc-Key | 14988 (Mikrotik) | 7 | 字符串 | Access-Accept | 客户端的 WEP 加密密钥（仅限无线）。 |
| Mikrotik-Rate-Limit | 14988 (Mikrotik) | 8 | 字符串 | Access-Accept | 客户端的速率限制。格式为：rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time] [priority] [rx-rate-min[/tx-rate-min]]]]，从路由器的角度（因此 "rx" 是客户端上传，"tx" 是客户端下载）。所有速率应为数字，可选带 'k'（1,000s）或 'M'（1,000,000s）。如果未指定 tx-rate，则 rx-rate 也用作 tx-rate。tx-burst-rate、tx-burst-threshold 和 tx-burst-time 同理。如果 rx-burst-threshold 和 tx-burst-threshold 均未指定（但指定了 burst-rate），则 rx-rate 和 tx-rate 用作突发阈值。如果 rx-burst-time 和 tx-burst-time 均未指定，则默认使用 1s。Priority 取值为 1..8，其中 1 表示最高优先级，8 表示最低优先级。如果未指定 rx-rate-min 和 tx-rate-min，则使用 rx-rate 和 tx-rate 值。rx-rate-min 和 tx-rate-min 的值不能超过 rx-rate 和 tx-rate 的值。 |
| Mikrotik-Realm | 14988 (Mikrotik) | 9 | 字符串 | Access-Request | 如果在 /radius 菜单中设置，它会作为 Mikrotik-Realm 属性包含在每个 RADIUS 请求中。如果未设置，则发送与 MS-CHAP-Domain 属性相同的值（如果缺少 MS-CHAP-Domain，则也不包含 Realm）。 |
| Mikrotik-Host-IP | 14988 (Mikrotik) | 10 | IP 地址 | Access-Request | Universal Client 转换前 HotSpot 客户端的 IP 地址（客户端的原始 IP 地址）。 |
| Mikrotik-Mark-Id | 14988 (Mikrotik) | 11 | 字符串 | Access-Accept | 防火墙 mangle 链名称（仅限 HotSpot）。MikroTik RADIUS 客户端收到此属性后，会创建一个动态防火墙 mangle 规则，其 action=jump、chain=hotspot，且 jump-target 等于该属性值。Mangle 链名称可以带有后缀 .in 或 .out，这样规则将仅针对传入或传出流量安装。可以提供多个 Mark-id 属性，但仅使用传入和传出的最后一个。 |
| Mikrotik-Advertise-URL | 14988 (Mikrotik) | 12 | 字符串 | Access-Accept | 应向客户端显示的广告页面的 URL。如果指定了此属性，则会自动启用广告，包括透明代理，即使在相应的用户 profile 中已显式禁用。RADIUS 服务器可以发送多个属性实例，以指定额外的 URL，这些 URL 会以轮询方式选择。 |
| Mikrotik-Advertise-Interval | 14988 (Mikrotik) | 13 | 整数 | Access-Accept | 两个相邻广告之间的时间间隔。RADIUS 服务器可以发送多个属性实例，以指定额外的时间间隔。所有间隔值被视为一个列表，并在每次成功广告时逐个取用。如果到达列表末尾，则继续使用最后一个值。 |
| Mikrotik-Recv-Limit-Gigawords | 14988 (Mikrotik) | 14 | 整数 | Access-Accept | 接收总限制的 4G (2^32) 字节部分（位 32..63，其中位 0..31 在 Mikrotik-Recv-Limit 中传递）。 |
| Mikrotik-Xmit-Limit-Gigawords | 14988 (Mikrotik) | 15 | 整数 | Access-Accept | 发送总限制的 4G (2^32) 字节部分（位 32..63，其中位 0..31 在 Mikrotik-Xmit-Limit 中传递）。 |
| Mikrotik-Wireless-PSK | 14988 (Mikrotik) | 16 | 字符串 | Access-Accept |  |
| Mikrotik-Total-Limit | 14988 (Mikrotik) | 17 | 整数 | Access-Accept |  |
| Mikrotik-Total-Limit-Gigawords | 14988 (Mikrotik) | 18 | 整数 | Access-Accept |  |
| Mikrotik-Address-List | 14988 (Mikrotik) | 19 | 字符串 | Access-Accept |  |
| Mikrotik-Wireless-MPKey | 14988 (Mikrotik) | 20 | 字符串 | Access-Accept |  |
| Mikrotik-Wireless-Comment | 14988 (Mikrotik) | 21 | 字符串 | Access-Accept |  |
| Mikrotik-Delegated-IPv6-Pool | 14988 (Mikrotik) | 22 | 字符串 | Access-Accept | 用于前缀委派的 IPv6 池。 |
| Mikrotik-DHCP-Option-Set | 14988 (Mikrotik) | 23 | 字符串 | Access-Accept |  |
| Mikrotik-DHCP-Option-Param-STR1 | 14988 (Mikrotik) | 24 | 字符串 | Access-Accept |  |
| Mikrotik-DHCP-Option-Param-STR2 | 14988 (Mikrotik) | 25 | 字符串 | Access-Accept |  |
| Mikrotik-Wireless-VLANID | 14988 (Mikrotik) | 26 | 整数 | Access-Accept | 客户端的 VLAN ID（仅限无线）。 |
| Mikrotik-Wireless-VLANIDtype | 14988 (Mikrotik) | 27 |  | 值 | 描述 |
| 值 | 描述 |  |  |  |  |
| 0 | 802.1q |  |  |  |  |
| 1 | 802.1ad |  |  |  |  |
| Mikrotik-Wireless-Minsignal | 14988 (Mikrotik) | 28 | 字符串 | Access-Accept |  |
| Mikrotik-Wireless-Maxsignal | 14988 (Mikrotik) | 29 | 字符串 | Access-Accept |  |
| Mikrotik-Switching-Filter | 14988 (Mikrotik) | 30 | 字符串 | Access-Accept | 允许在使用 dot1x 服务器认证客户端时创建动态交换规则。 |

**属性**

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string*; 默认： ) | 属性的名称。 |
| **packet-types** (*string*; 默认：**access-accept**) | access-accept - 在 RADIUS Access-Accept 消息中使用此属性；access-challenge - 在 RADIUS Access-Challenge 消息中使用此属性 |
| **type-id** (*integer:1..255*; 默认： ) | 来自特定厂商属性数据库的属性标识号。 |
| **value-type** (*string*; 默认： ) | hexip-address - IPv4 或 IPv6 IP 地址；ip6-prefix - IPv6 前缀；macro；string；uint32 |
| **vendor-id** (*integer*; 默认：**0**) | IANA 分配的特定企业标识号。 |

## 数据库 {#database}

**子菜单：** `/user-manager/database`

所有与 RADIUS 相关的信息都存储在单独的 User Manager 数据库中，可在 "database" 子菜单下配置。"Enabled" 和 "db-path" 是唯一不存储在 User Manager 数据库中，而是存储在 RouterOS 主配置表中的参数，这意味着这些参数会受到 RouterOS 配置重置的影响。其余配置、会话和支付数据存储在设备 FLASH 存储上的单独 SQLite 数据库中。对数据库执行任何操作时，建议在操作前后进行备份。

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **db-path** (*string*; 默认： ) | 存储数据库文件的位置路径。 |

### 只读属性 {#read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **db-size** | 数据库的当前大小。 |
| **free-disk-space** | 存储数据库所在磁盘上的剩余空间。 |

### 命令 {#commands}

| 属性 | 描述 |
| :-- | :-- |
| **load** (*name*) | 恢复之前创建的 .umb 格式备份文件。 |
| **migrate-legacy-db** (*database-path; overwrite*) | 将旧的 User Manager（来自 RouterOS v6 或更早版本）转换为新标准。可以覆盖当前数据库。 |
| **optimize-db** () |  |
| **save** (name; overwrite) | 保存 User Manager 数据库的当前状态。 |

## 限制 {#limitations}

**子菜单：** `/user-manager/limitation`

Limitations 由 Profiles 使用，并通过 Profile-Limitations 关联在一起。必须启用 RADIUS 计费和 Interim 更新，以便在多个限制项之间无缝切换，或在达到 *download-limit*、*upload-limit* 或 *uptime-limit* 时断开活动会话。

要从 User Manager 断开已经处于活动状态的会话，必须在 RADIUS 客户端一侧将 *accept* 设置为 *yes*。如果并发会话限制并非无限制（shared-users），且已达到允许的最大数量，则路由器将尝试先断开较旧的用户会话。

User-Manager 会尝试在新用户被接受之前断开活动会话（当设置了相应限制时）。因此，在此类设置中，建议将 `/radius/client/timeout` 设置为 1s。

:::danger
RouterOS 中的 IPsec 服务不支持速率限制。

:::

## 属性 {#properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*; 默认： ) | 限制项的简短描述。 |
| **download-limit** (*integer*; 默认：**0**) | 用户可下载的总流量，单位为字节。 |
| **name** (*string*; 默认： ) | 限制项的唯一名称。 |
| **rate-limit-burst-rx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](../firewall-and-quality-of-service/queues/index.md)。 |
| **rate-limit-burst-threshold-rx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](../firewall-and-quality-of-service/queues/index.md)。 |
| **rate-limit-burst-threshold-tx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](../firewall-and-quality-of-service/queues/index.md)。 |
| **rate-limit-burst-time-rx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](../firewall-and-quality-of-service/queues/index.md)。 |
| **rate-limit-burst-time-tx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](../firewall-and-quality-of-service/queues/index.md)。 |
| **rate-limit-burst-tx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](../firewall-and-quality-of-service/queues/index.md)。 |
| **rate-limit-min-rx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](../firewall-and-quality-of-service/queues/index.md)。 |
| **rate-limit-min-tx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](../firewall-and-quality-of-service/queues/index.md)。 |
| **rate-limit-priority** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](../firewall-and-quality-of-service/queues/index.md)。 |
| **rate-limit-rx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](../firewall-and-quality-of-service/queues/index.md)。 |
| **rate-limit-tx** () | *MT-Rate-Limit* RADIUS 属性的一部分。请参阅 [Queues#SimpleQueue](../firewall-and-quality-of-service/queues/index.md)。 |
| **reset-counters-interval** (*hourly* \| *daily* \| *weekly* \| *monthly* \| *disabled*); 默认：**disabled**) | 从 *reset-counters-start-time* 开始计算的时间间隔，到达后清除所有关联的用户统计信息。 |
| **reset-counters-start-time** (*datetime*; 默认： ) | 用于计算 *reset-counters-interval* 的静态日期和时间值。 |
| **transfer-limit** (*integer*; 默认：**0**) | 聚合（下载+上传）的总流量，单位为字节。 |
| **upload-limit** (*integer*; 默认：**0**) | 用户可上传的总流量，单位为字节。 |
| **uptime-limit** (*time*; 默认：**00:00:00**) | 用户可持续活动的总在线时长。 |

## 支付 {#payments}

**子菜单：** `/user-manager/payment`

本节提供所有已收到付款的信息。

**只读属性**

| 属性 | 描述 |
| :-- | :-- |
| **currency** (*string*) | 交易使用的货币。 |
| **method** (*string*) | 交易使用的服务（目前仅支持 PayPal）。 |
| **price** (*decimal*) | 用户支付的金额。 |
| **profile** (*profile*) | 用户购买的配置文件名称。 |
| **trans-end** (*datetime*) | 交易结束的日期和时间。 |
| **trans-start** (*datetime*) | 交易开始的日期和时间。 |
| **trans-status** (*string*) | 交易状态。可能的状态 - *started*、*pending*、*approved*、*declined*、*error*、*timeout*、*aborted*、*user approved*。只有 *approved* 才应被视为完整交易。 |
| **user** (*string*; 默认： ) | 执行交易的用户名。 |
| **user-message** (*string*; 默认： ) |  |

## 配置文件 {#profiles}

**子菜单：** `/user-manager/profile`

### 属性 {#properties-2}

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*; 默认： ) | 条目的简短描述。 |
| **name** (*string*; 默认： ) | 配置文件的唯一名称。 |
| **name-for-users** (*string*; 默认： ) | 在网页上向用户显示的配置文件名称。 |
| **override-shared-users** (*decimal \| off \| unlimited*; 默认：**off**) | 是否允许同一用户名建立多个会话。此项会覆盖 *shared-users* 设置。 |
| **price** (*decimal*; 默认：**0.00**) |  |
| **starts-when** (*assigned* \| *first-auth*; 默认：**assigned**) | 配置文件变为活动状态的时间。*Assigned* - 创建 User Profile 条目时立即生效。*First-auth* - 在用户首次认证请求时生效。 |
| **validity** (*time \| unlimited*; 默认：**unlimited**) | 用户可使用此配置文件的总时长。 |

## 配置文件限制 {#profile-limitations}

**子菜单：** `/user-manager/profile-limitation`

Profile-Limitations 表将限制项和配置文件关联在一起，并定义其有效期。当多个限制项分配给同一配置文件时，用户必须遵守所有限制项才能建立会话。这样可以创建更复杂的设置，例如单独的每月和每日带宽限制。

### 属性 {#properties-3}

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*; 默认： ) | 条目的简短描述。 |
| **from-time** (*time*; 默认：**00:00:00**) | 限制项应开始的一天中的时间。 |
| **limitation** (*limitation*; 默认： ) | 已创建的 **Limitation** 的名称。 |
| **profile** (*profile*; 默认： ) | 已创建的 **Profile** 的名称。 |
| **till-time** (*time*; 默认：**23:59:59**) | 限制项应结束的一天中的时间。 |
| **weekdays** (*day of week*; 默认：**Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday**) | 限制项应在一周中生效的日期。 |

## 路由器 {#routers}

**子菜单：** `/user-manager/router`

在此可以定义可将 User Manager 用作 RADIUS 服务器的 NAS 设备。

### 属性 {#properties-4}

| 属性 | 描述 |
| :-- | :-- |
| **coa-port** (*integer:1..65535*; 默认：**3799**) | CoA（授权变更）通信的端口号。 |
| **address** (*IP/IPv6***;** 默认： ) | RADIUS 客户端的 IP 地址。 |
| **comment** (*string*; 默认： ) | NAS 的简短描述。 |
| **disabled** (*yes \| no*; 默认：**no**) | 控制该条目当前是否启用。 |
| **name** (*string*; 默认： ) | RADIUS 客户端的唯一名称。 |
| **protocol**(*radsec*\| *udp*;默认 udp) | 与路由器一起使用的协议。 |
| **shared-secret** (*string*; 默认： ) *[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于保护 RADIUS 服务器与 RADIUS 客户端之间的通信。 |

### 命令 {#commands-1}

| 属性 | 描述 |
| :-- | :-- |
| **reset-counters** () | 清除特定 RADIUS 客户端的所有统计信息。 |

## 会话 {#sessions}

**子菜单：** `/user-manager/session`

仅当 NAS 上启用了计费时，才会记录会话。

**只读属性**

| 属性 | 描述 |
| :-- | :-- |
| **acct-session-id** (*string*) | 计费会话的唯一标识。 |
| **active** (*yes \| no*) | 该会话当前是否正在使用。 |
| **calling-station-id** (*string*) | 用户的标识符，通常是 IP 地址或 MAC 地址。 |
| **download** (*Bytes*) | 已下载的流量。 |
| **ended** (*datetime*) | 会话关闭的日期和时间。活动会话为空。 |
| **last-accounting-packet** (*datetime*) | 收到最后一次计费更新的日期和时间。 |
| **nas-ip-address** (*IP address*) | NAS 的 IP 地址。 |
| **nas-port-id** (*string*) | 正在对用户进行认证的 NAS 端口标识符。 |
| **nas-port-type** (*string*) | 正在对用户进行认证的端口类型（*physical* 或 *virtual*）。 |
| **started** (*datetime*) | 会话建立的日期和时间。 |
| **status** (*list of statuses*) | 会话可能的可用状态：*start -* 已收到计费消息 *Start*，*stop -* 已收到计费消息 *Stop*，*interim - Interim update* 已收到，*close-acked* - 会话已成功关闭，*expired.* |
| **terminate-cause** (*string*) | 会话关闭的原因。 |
| **upload** (*Bytes*) | 已上传的流量。 |
| **uptime** (*time*) | 会话记录的总在线时长。 |
| **user** (*string*) | 用户名。 |
| **user-address** (*IP address*) | 提供给用户的 IP 地址。 |

## 设置 {#settings}

**子菜单：** `/user-manager`

**属性**

| 属性 | 描述 |
| :-- | :-- |
| **accounting-port** (*integer*; 默认：**1813**) | 用于监听 RADIUS 计费请求的端口。 |
| **authentication-port**(*integer*; 默认：**1812**) | 用于监听 RADIUS 认证请求的端口。 |
| ***certificate*** (*certificate*; 默认： ) | 用于 EAP TLS 类型认证方法的证书。 |
| ***enabled*** (*yes \| no*; 默认：**no**) | 是否启用 User Manager 功能。 |
| **radsec-certificate**(certificate; 默认：) | 用于 RadSec 协议的证书。 |
| **use-profiles**(*yes \| no*; 默认：**no**) | 是否使用 **Profiles** 和 **Limitations**。设置为 *no,* 时，仅需 **User** 配置即可运行 User Manager。 |

### 高级 {#advanced}

**子菜单：** `/user-manager/advanced`

**属性**

| 属性 | 描述 |
| :-- | :-- |
| **paypal-allow** (*yes \| no*; 默认：**no**) | 是否为 User Manager 启用 PayPal 功能。 |
| **paypal-currency** (*string*; 默认：**USD**) | 与 *price* 设置相关的货币，用户将按此货币计费。 |
| **paypal-password** (*string*; 默认： ) *[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | PayPal API 账户的密码。 |
| **paypal-signature** (*string*; 默认： ) | PayPal API 账户的签名。 |
| **paypal-use-sandbox** (*yes \| no*; 默认：**no**) | 是否使用 PayPal 的沙箱环境进行测试。 |
| **paypal-user** (*string*; 默认： ) | PayPal API 账户的用户名。 |
| **web-private-password** (*string*; 默认： ) *[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 通过 HTTP 访问 */um/PRIVATE/* 部分的密码。 |
| **web-private-username** (*string*; 默认： ) | 通过 HTTP 访问 */um/PRIVATE/* 部分的用户名。 |

## 用户 {#users}

**子菜单：** `/user-manager/user`

### 属性 {#properties-5}

| 属性 | 描述 |
| :-- | :-- |
| **attributes** (*array of attributes*; 默认： ) | 自定义的一组 **Attributes** 及其值，将额外添加到 Access-Accept 消息中。 |
| **caller-id**(*string*; 默认： ) | 允许用户使用特定的 *Calling-Station-Id* 值进行认证。 |
| **comment** (*string*; 默认： ) | 用户的简短描述。 |
| **disabled** (*yes \| no*; 默认：**no**) | 控制该用户是否可以使用。 |
| **group** (*group*; 默认：**default**) | 用户关联的 **Group** 名称。 |
| **name** (*string*; 默认： ) | 用于会话认证的用户名。 |
| **otp-secret** (*string*; 默认： ) *[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 附加到密码的一次性密码令牌。 |
| **password** (*string*; 默认： ) *[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于会话认证的用户密码。 |
| **shared-users** (*integer \| unlimited*; 默认：**1**) | 该用户可同时建立的会话总数。 |

### 命令 {#commands-2}

| 属性 | 描述 |
| :-- | :-- |
| **add-batch-users** () | 该命令可根据各种参数生成多个用户账户。 |
| **generate-voucher** () | 根据 *voucher-template* 生成可呈现给最终用户的文件。 |
| **monitor** () | 显示用户的总统计信息。统计项包括 *total-uptime*、*total-download*、*total-upload*、*active-sessions*、*actual-profile*、*attributes-details*。 |

## 用户组 {#user-groups}

**子菜单：** `/user-manager/user/group`

用户组定义了多个用户的共同特征，例如允许的认证方法和 RADIUS 属性。User Manager 中已经存在两个组，分别称为 *default* 和 *default-anonymous*。

### 属性 {#properties-6}

| 属性 | 描述 |
| :-- | :-- |
| **attributes** (*array of attributes*; 默认： ) | 自定义的一组 **Attributes** 及其值，将额外添加到该组用户的 Access-Accept 消息中。 |
| **comment** (*string*; 默认： ) | 用户组的简短描述。 |
| **inner-auths** (*list of auths*; 默认： ) | 用于隧道化（外部）认证方法的允许内部认证方法列表。支持的内部认证方法 - *ttls-pap*、*ttls-chap*、*ttls-mschap1*、*ttls-mschap2*、*peap-mschap2*。 |
| **name** (*string*; 默认： ) | 用户组的唯一名称。 |
| **outer-auths** (*list of auths*; 默认： ) | 允许的认证方法列表。支持的外部认证方法 - *pap*、*chap*、*mschap1*、*mschap2*、*eap-tls*、*eap-ttls*、*eap-peap*、*eap-mschap2*。 |

## 用户配置文件 {#user-profiles}

**子菜单：** `/user-manager/user-profile`

此菜单为用户分配配置文件并跟踪配置文件的状态。单个用户可以分配多个配置文件；但是，同一时间只能使用一个。当前活动的配置文件过期时，用户将无缝切换到下一个配置文件，而不会断开用户的会话。

### 属性 {#properties-7}

| 属性 | 描述 |
| :-- | :-- |
| **profile** (*profile*; 默认： ) | 要分配给用户的配置文件名称。 |
| **user**(*user*; 默认： ) | 要使用特定配置文件的用户名。 |

### 只读属性 {#read-only-properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **end-time** (*datetime*) | **User Profile** 将过期的日期和时间。 |
| **state** (*running active* \| running \| *used*) | **User Profile** 的当前状态。*Running active -* 用户当前正在使用的配置文件。*Running* - 配置文件已准备好可使用。*Used* - 已过期且无法再激活的配置文件。 |

### 命令 {#commands-3}

| 属性 | 描述 |
| :-- | :-- |
| **activate-user-profile** () | 使 **User Profile** 条目立即生效。 |

## WEB 界面 {#web-interface}

每个用户都可以使用 WEB 界面访问其个人配置文件。通过将 "/um/" 目录添加到路由器的 IP 或域名，即可访问 WEB 界面，例如 `http://example.com/um/`。请注意，WEB 界面受 IP Services "www" 和 "www-ssl" 影响。WEB 界面可以使用 CSS、JavaScript 和 HTML 进行自定义。

### 可自定义文件参考 {#customizable-file-reference}

| 文件 | 描述 |
| :-- | :-- |
| **css/login.css** | 登录提示页面使用的层叠样式表文件。 |
| **css/user.css** | 用户配置文件页面使用的层叠样式表文件。 |
| **img/PayPal\_mark\_37x23.gif** | PayPal 徽标图像。 |
| **img/ajax-loader.gif** | 处理页面切换时使用的加载 gif。 |
| **img/mikrotik\_logo.png** | 显示在所有页面上的 MikroTik 徽标。 |
| **js/generic.js** | 所有页面使用的 Javascript 文件。 |
| **js/login.js** | 登录提示页面使用的 Javascript 文件。 |
| **js/user.js** | 用户配置文件页面使用的 Javascript 文件。 |
| **user/login\_dynamic.html** | 登录提示页面的布局。 |
| **user/user\_dynamic.html** | 用户配置文件页面的布局。 |

## 应用指南 {#application-guides}

### 批量创建用户 {#batch-user-creation}

可以创建多个具有随机生成用户名和密码的新用户。例如，以下命令将生成 3 个新用户，用户名为 6 个小写符号，密码为 6 个小写字母、大写字母和数字。

```ros
/user-manager/user
add-batch-users number-of-users=3 password-characters=lowercase,numbers,uppercase password-length=6 username-characters=lowercase username-length=6
```

可通过打印用户表查看该命令生成的用户：

```ros
/user-manager/user/print 
Flags: X - disabled 
 0   name="olsgkl" password="86a6zH" otp-secret="" group=default shared-users=1 attributes="" 

 1   name="lkbwss" password="jaKY5V" otp-secret="" group=default shared-users=1 attributes="" 

 2   name="cwxbwu" password="a62yZd" otp-secret="" group=default shared-users=1 attributes="" 

```

### 为 NAS 提供自定义 RADIUS 属性 {#providing-nas-with-custom-radius-attributes}

可以在认证过程中发送额外的 RADIUS 属性，以便向 NAS 提供有关会话的自定义信息，例如应向请求方分配哪个 IP 地址，或应使用哪个地址池进行地址分配。

#### 为用户分配静态 IP 地址 {#static-ip-address-for-a-user}

要为最终用户分配静态 IP 地址，可以使用 *Framed-IP-Address* 属性。使用静态 IP 地址分配时，必须将 *shared-sessions* 设置为 1，以防止出现用户有多个同时会话但只有一个 IP 地址的情况。例如：

```ros
/user-manager/user
set [find name=username] shared-users=1 attributes=Framed-IP-Address:192.168.1.4
```

#### 为一组用户指定地址池 {#specifying-address-pool-for-a-group-of-users}

我们可以将多个相似用户分组，并一次性为所有用户分配 RADIUS 属性。首先，创建一个新组：

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

在这种情况下，认证时将从 *pool1* 向用户分配一个 IP 地址 - 请确保在 NAS 设备上已创建 *pool1*。

### 使用 TOTP（基于时间的一次性密码）进行用户认证 {#using-totp-time-based-one-time-password-for-user-authentication}

User Manager 支持将基于时间的认证令牌附加到用户密码字段，该令牌每 30 秒重新生成。

:::danger
OTP 依赖于时钟，因此请确保已正确配置时间设置。

:::

TOTP 的工作原理是在请求方（客户端）和认证服务器（User Manager）上使用共享密钥。要在 RouterOS 上配置 TOTP，只需为用户设置 *otp-secret*。例如：

```ros
/user-manager/user
set [find name=username] password=mypass otp-secret=mysecret

```

要在请求方一侧计算 TOTP 令牌，可以使用许多广泛可用的应用，例如 Google Authenticator 或 [https://totp.app/](https://totp.app/)。将 mysecret 添加到 TOTP 令牌生成器后将提供一个唯一的新 6 位代码，必须将其添加到用户密码中。

![](/img/41241175d691e7c4.webp)

以下示例将接受用户使用附加到普通密码后的计算所得 TOTP 令牌进行认证，直到生成新的 TOTP 令牌。

```text
User-Name=username
User-Password=mypass620872
```

### 导出用户凭据 {#exporting-user-credentials}

#### **单个用户的可打印登录凭据** {#printable-login-credentials-for-a-single-user}

要生成单个用户的可打印凭据卡，只需使用 *generate-voucher* 命令。指定用户的 RouterOS ID 号，或使用 *find* 命令指定用户名。User Manager 的安装中已经包含一个模板，可在设备的 Files 部分中找到。您可以根据需要自定义模板。

```ros
/user-manager/user
generate-voucher voucher-template=printable_vouchers.html [find where name=username]
```

通过 WEB 浏览器访问路由器并导航到 */um/PRIVATE/GENERATED/vouchers/gen\_printable\_vouchers.html* 即可获取生成的凭据卡。

默认情况下，可打印卡片如下所示：

![](/img/f77afb5d13302de9.webp)

:::warning
要通过 WEB 浏览器访问 /um/ 目录的 PRIVATE 路径，必须配置 *private-username* 和 *private-password*。请参阅 **Settings** 部分。

:::

生成凭据时可以使用不同的变量。当前支持的变量包括：

$(username) - 表示 User Manager 用户名  
$(password) - 该用户名的密码  
$(userprofname) - 该用户当前活动的配置文件  
$(userprofendtime) - 配置文件的失效结束时间（如果指定）

#### 导出多个用户凭据 {#multiple-user-credential-export}

通过将 *export.xml* 或 *export.csv* 用作 *voucher-template*，可以一次生成包含多个或所有用户凭据的 CSV 或 XML 文件。

```ros
/user-manager/user
generate-voucher voucher-template=export.xml [find]
```

该命令会生成 XML 文件 *um5files/PRIVATE/GENERATED/vouchers/gen\_export.xml*，可通过 WEB 浏览器或任何其他文件访问工具访问。

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

### 生成使用情况报告 {#generating-usage-report}

在公司计费或法务团队需要可呈现的网络使用信息时，可以使用 *generate-report* 命令创建自动化的会话导出。该命令需要输入报告模板 - 模板示例位于 *um5files/PRIVATE/TEMPLATES/reports/report\_default.html*。报告生成示例：

```ros
/user-manager
generate-report report-template=report_default.html columns=username,uptime,download,upload
```

通过 WEB 浏览器访问路由器并导航到 */um/PRIVATE/GENERATED/reports/gen\_report\_default.html* 即可获取生成的报告。

*![](/img/347a8e944793bdb6.webp)*

### 购买配置文件 {#purchasing-a-profile}

用户使用 WEB 浏览器访问路由器的 */um/* 目录（例如 http://example.com/um/）登录其私人配置文件后，将能够在相应菜单中看到所有可用的 **Profiles**。指定了 *price* 值的配置文件将提供 *Buy this Profile* 按钮。

![](/img/a947415d24d11d74.webp)

按下 *Buy this Profile* 按钮后，用户将被要求从可用交易服务提供商中选择（目前仅提供 PayPal），随后会重定向到 PayPal 的支付处理页面。

![](/img/368b0af05bc7f389.webp)

付款完成后，User Manager 会请求 PayPal 批准该交易。批准后，配置文件会分配给用户并可供使用。![](/img/39c330686cc9db0e.webp)

### 从 RouterOS v6 迁移 {#migrating-from-routeros-v6}

当您将 User Manager 路由器从 RouterOS v6 升级到 v7 时，新的 User Manager 将使用新的数据库文件和配置。要继续使用旧的用户、路由器、配置文件等配置，必须手动执行 migrate 命令。为此，必须存在旧 User Manager 服务器文件夹 "user-manager" 中的文件。该文件夹可以重命名，但旧安装中的所有内容都必须传输到新的 v7 安装中（您可以将旧配置从一台路由器移动到另一台运行 v7 的路由器，但必须复制 "user-manager" 文件夹）。之后，只需执行以下命令 - `/user-manager/database/migrate-legacy-db database-path=<path_to_old_user_manager_folder>`。

导入过程将尝试转换以下配置 - 用户、配置文件、user-profiles、限制项、profile-limitations、user-counters、路由器和会话。

## 应用示例 {#application-examples}

### 使用 User Manager 认证的基本 L2TP/IPsec 服务器 {#basic-l2tpipsec-server-with-user-manager-authentication}

![](/img/5cb98b1471afb086.webp)

#### User Manager 配置 {#user-manager-configuration}

首先启用 User Manager 功能。

```ros
/user-manager
set enabled=yes
```

允许接收来自 localhost（路由器本身）的 RADIUS 请求。

```ros
/user-manager/router
add address=127.0.0.1 comment=localhost name=local shared-secret=test
```

接下来，添加用户及其凭据，客户端将使用这些凭据向服务器认证。

```ros
/user-manager/user
add name=user1 password=password
```

#### 配置 RADIUS 客户端 {#configuring-radius-client}

为了让路由器使用 RADIUS 服务器进行用户认证，需要添加一个新的 RADIUS 客户端，并为其配置与 User Manager 上已配置的相同共享密钥。

```ros
/radius
add address=127.0.0.1 secret=test service=ipsec
```

#### L2TP/IPsec 服务器配置 {#l2tpipsec-server-configuration}

配置将向用户分配 IP 地址的 IP 地址池，并将其分配给 PPP Profile。

```ros
/ip/pool
add name=vpn-pool range=192.168.99.2-192.168.99.100

/ppp/profile
set default-encryption local-address=192.168.99.1 remote-address=vpn-pool
```

启用 RADIUS 用于 PPP 认证。

```ros
/ppp/aaa
set use-radius=yes
```

启用带 IPsec 加密的 L2TP 服务器。

```ros
/interface/l2tp-server/server
set enabled=yes use-ipsec=required ipsec-secret=mySecret
```

就是这样。您的路由器现在已准备好接受 L2TP/IPsec 连接，并通过内部 User Manager 对其进行认证。

### RouterOS 用户登录的双因素认证（MFA/2FA） {#two-factor-authentication-for-routeros-user-login-mfa2fa}

由于 User-Manager 支持 TOTP（基于时间的一次性密码），因此可以为不同服务设置所谓的 MFA 认证。这里我们将研究通过 User Manager（radius）进行 RouterOS 用户认证，并使用每 30 秒更改一次的基于时间的密码。

**以下是 MikroTik 路由器上必要的配置选项。**

为 /user 菜单启用 RADIUS，并从 `/user/group` 菜单设置 default-group。请注意，系统会先检查本地 /user 数据库，然后再联系 RADIUS。

```
/user/aaa/set use-radius=yes default-group=full
```

为登录服务启用 radius 客户端。由于我们在同一台路由器上运行 User Manager，因此使用 127.0.0.1，

```
/radius/add address=127.0.0.1 service=login secret=mystrongsecret
```

**以下是 User Manager 的配置步骤**，

确保已将受管设备添加到 "Routers" 菜单，

```
/user-manager/router/add name=myrouter address=127.0.0.1 shared-secret=mystrongsecret
```

将用户添加到 User-Manager 用户表，并设置 OTP secret 参数。要正确配置 OTP，还需要几个步骤。  
选择一个 OTP-secret 名称并将其转换为 base32 格式（有许多在线转换器可将 utf-8 转换为 base32 格式）。对于我的配置，我使用 "mysupersecret"，其 base32 形式为 NV4XG5LQMVZHGZLDOJSXI===

```
/user-manager/user/add name=mikrotik password=mysuperpassword otp-secret="NV4XG5LQMVZHGZLDOJSXI==="
```

请注意，在你常用的身份验证器应用中，添加新的时间密码实例时，需要手动为用户设置此密钥 "NV4XG5LQMVZHGZLDOJSXI==="。

要登录 MikroTik 设备，请打开 Winbox/Console 并连接到路由器地址，使用登录名：mikrotik，密码：mysuperpasswordxxxxxx，其中 xxxxxx 是你常用身份验证应用中的 6 位代码。

密码每 30 秒更改一次，可从你常用的应用中获取。

![](/img/73454df958b000d2.jpg)
