---
sidebar_key: "authentication-authorization-accounting/radius"
sidebar_position: 5
title: "RADIUS"
sidebar_label: "RADIUS"
description: "RADIUS 通过 UDP 或 RadSec 协议连接到 RADIUS 服务器，为 MikroTik RouterOS 中的 PPP、HotSpot 及其他服务提供集中式认证和计费，并支持可配置的端口、共享密钥以及针对具体服务的设置。"
tags:
  - 'radius'
  - 'authentication'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.24/authentication-authorization-accounting/radius
captured_at: '2026-11-04T11:27:01+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RADIUS（Remote Authentication Dial-In User Service 的缩写）是一种远程服务器，可为各种网络设备提供认证和计费功能。RADIUS 认证和计费使 ISP 或网络管理员能够通过一台服务器在整个大型网络中管理 PPP 用户访问和计费。MikroTik RouterOS 具有 RADIUS 客户端，可对[路由器的本地](./user.md) [用户](./user.md)、[HotSpot](./hotspot-captive-portal/index.md)、[PPP](../mobile-networking/ppp.md) 和 ISDN 连接进行认证。从 RADIUS 服务器收到的属性会覆盖默认配置文件中设置的属性，但如果未收到某些参数，则会从相应的默认配置文件中获取。

仅当在路由器本地数据库中未找到匹配的用户访问记录时，才会查询 RADIUS 服务器数据库。

如果启用了 RADIUS 计费，计费信息还会发送到该服务的默认 RADIUS 服务器。

## RADIUS 客户端 {#radius-client}

**子菜单：** `/radius`

此子菜单允许添加和删除 RADIUS 客户端。

:::warning
此列表中已添加项的顺序很重要。

:::

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **accounting-backup** (*yes \| no*; Default: **no**) | 配置是否用于备份 RADIUS 服务器 |
| **accounting-port** (*integer [1..65535]*; Default: **1813**) | 用于计费的 RADIUS 服务器端口 |
| **address** (*IPv4/IPv6 address*; Default: **0.0.0.0**) | RADIUS 服务器的 IPv4 或 IPv6 地址。<br/> 接受以下格式：<br/> - <em>ipv4</em> - <em>ipv4</em><code>@</code><em>vrf</em> - <em>ipv6</em> - <em>ipv6</em><code>@</code><em>vrf</em> |
| **authentication-port** (*integer [1..65535]*; Default: **1812**) | 用于认证的 RADIUS 服务器端口。 |
| **called-id** (*string*; Default: ) | 值取决于 Point-to-Point 协议：PPPoE - 服务名称，PPTP - 服务器 IP 地址，L2TP - 服务器 IP 地址。 |
| **certificate** (*string*; 默认： ) | 启用 RadSec 时用于与 RADIUS 服务器通信的证书文件。 |
| **comment** (*string*; 默认值： ) |  |
| **disabled** (*yes \| no*; 默认值：**no**) |  |
| **domain** (*string*; Default: ) | 传递给需要域验证的 RADIUS 服务器的客户端 Microsoft Windows 域。 |
| **protocol** (*radsec \| udp*; Default: **udp**) | 指定与 RADIUS 服务器通信时要使用的协议。 |
| **radsec-timeout**(*time,* Default: **3300ms**) | 超时时间，超过后应通过 RadSec 协议重新发送请求。 |
| **require-message-auth** (*no \| yes-for-request-resp* Default: **yes-for-request-resp**) | 指定是否需要 Message-Authenticator 属性。 |
| **realm** (*string*; Default: ) | 显式声明的 realm（用户域），因此用户无需在用户名中提供正确的 ISP 域名。 |
| **secret** (*string*; Default: ) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于访问 RADIUS 服务器的共享密钥。 |
| **service** (*ppp\|login\|hotspot\|wireless\|dhcp\|ipsec\|dot1x*; Default: ) | 将使用此 RADIUS 服务器的路由器服务：<ul><li>hotspot - HotSpot 认证服务</li><li>login - 路由器本地用户认证</li><li>ppp - Point-to-Point 客户端认证</li><li>wireless - 无线客户端认证</li><li>dhcp - DHCP 协议客户端认证（客户端的 MAC 地址作为 User-Name 发送）</li><li>ipsec - ipsec 客户端认证</li><li>dot1x - dot1x 认证</li></ul> |
| **src-address** (*ipv4/ipv6 address*; Default: **0.0.0.0**) | 发送到 RADIUS 服务器的数据包的源 IP/IPv6 地址 |
| **timeout** (*time*; Default: **1100ms**) | 超时时间，超过后应重新发送请求。 |

:::warning
当 RADIUS 服务器使用 CHAP、MS-CHAPv1、MS-CHAPv2 对用户进行认证时，它不使用共享密钥；该密钥仅用于认证回复中，并由路由器（RADIUS 客户端）进行验证。因此，如果共享密钥错误，RADIUS 服务器会接受请求，但路由器不会接受回复。可通过 “*`/radius/monitor`*” 命令观察到这一点，每当有人尝试连接时，“bad-replies” 数值都应增加。

:::

:::danger
如果启用了 RadSec，请确保您的 RADIUS 服务器使用 “**radsec**” 作为共享密钥，否则 RADIUS 服务器将无法正确解密数据（会出现不可打印字符）。使用 RadSec 时，RouterOS 会强制将共享密钥设为 “radsec”，无论手动设置的是什么。有关详细信息，请参阅 RFC6614。

:::

:::info
如果使用 RadSec，RouterOS 将覆盖为使用 TCP 端口 2083
:::

### 示例 {#example}

要设置一个用于 HotSpot 和 PPP 服务并对 RADIUS 服务器（10.0.0.3）进行认证的 RADIUS 客户端，需要执行以下操作：

```ros
[admin@MikroTik] > /radius/add service=hotspot,ppp address=10.0.0.3 secret=ex
[admin@MikroTik] > /radius/print
Flags: X - disabled
# SERVICE CALLED-ID DOMAIN ADDRESS SECRET
0 ppp,hotspot 
```

要设置使用 RadSec 的 RADIUS 客户端，需要执行以下操作：

```ros
[admin@MikroTik] > /radius/add service=hotspot,ppp address=10.0.0.3 secret=radsec protocol=radsec certificate=client.crt
[admin@MikroTik] > /radius/print
Flags: X - disabled
# SERVICE CALLED-ID DOMAIN ADDRESS SECRET
0 ppp,hotspot 10.0.0.3 radsec
```

:::warning
请确保指定的证书受信任，并且两端的 common-name 验证都能正常工作。

:::

以下是一个可用于 RADIUS RadSec 配置的证书简单示例：

```ros
On server:

#CN 应为 RADIUS 服务器 IP
/certificate/add name=radsec_server common-name=10.155.114.91
/certificate/sign radsec_server

#CN 应为 RADIUS 客户端 IP
/certificate/add name=radsec_client1 common-name=10.155.114.92
/certificate/sign radsec_client1
/user-manager/set radsec-certificate=radsec_server

#在服务器上导出证书，以便在客户端上应用它们
/certificate/export-certificate type=pkcs12 export-passphrase=verystrongpassword radsec_client1
/certificate/export-certificate type=pkcs12 radsec_server

On client:

#下载这两个文件并将它们上传到客户端
/certificate/import file-name=cert_export_radsec_client1.p12 passphrase=verystrongpassword
/certificate/import file-name=cert_export_radsec_server.p12
/radius/set <radius_client_id_in_list> certificate=cert_export_radsec_client1.p12_0

#之后，当 RADIUS 客户端尝试连接到服务器时，你应该在 status 字段中看到：status="TLS connected"。
```

要查看 RADIUS 客户端统计信息，需要执行以下操作：

```ros
[admin@MikroTik] > /radius/monitor 0
pending: 0
requests: 10
accepts: 4
rejects: 1
resends: 15
timeouts: 5
bad-replies: 0
last-request-rtt: 0s
```

请确保为所需服务启用 RADIUS 认证：

```ros
/ppp/aaa/set use-radius=yes
/ip/hotspot/profile/set default use-radius=yes
```

## 从 RADIUS 终止连接 {#connection-terminating-from-radius}

**子菜单：** `/radius/incoming`

此功能支持从 RADIUS 服务器发送的非请求消息。非请求消息扩展了 RADIUS 协议命令，允许终止已从 RADIUS 服务器连接的会话。为此，使用 DM（Disconnect-Messages）。断开消息会立即终止用户会话。

:::warning
RouterOS 不支持 POD（Packet of Disconnect），这是另一种执行与 Disconnect Messages 类似功能的 RADIUS 访问请求数据包

:::

### 属性 {#properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **accept** (*yes \| no*; 默认：**no**) | 是否接受非请求消息 |
| **port** (*integer*; 默认：**1700**) | 用于监听请求的端口号 |
| **vrf** (*VRF name*; 默认值：**main**) | 设置服务监听传入连接所在的 VRF |

## 支持的 RADIUS 属性 {#supported-radius-attributes}

您可以在此处下载 [RADIUS reference dictionary.txt](pathname:///assets/319783010_RADIUS_reference_dictionary.txt)，其中包含 MikroTik 设备支持的所有 RADIUS 属性。此文件专为 FreeRADIUS 设计，但也可供其他 RADIUS 服务器使用。请注意，它可能与您的 RADIUS 服务器的默认配置文件冲突。请修正配置，而不是字典，因为 MikroTik RouterOS 不支持其他属性。还有 [MikroTik Vendor attributes.txt](pathname:///assets/319783011_MikroTik_Vendor_attributes.txt)，可将其包含在现有字典中，以支持 MikroTik 厂商特定属性。

下面将介绍属性以及在 MikroTik 设备与 RADIUS 通信期间如何使用这些属性。

### 定义 {#definitions}

- **PPPs** - PPP、PPTP、PPPoE
- **默认配置** - 默认配置文件中的设置（适用于 PPPs）或 HotSpot 服务器设置（适用于 HotSpot）

### Access-Request 数据包 {#access-request-packet}

- **Service-Type** - 始终为 “Framed”（仅适用于 PPPs）。
- **Framed-Protocol** - 始终为 “PPP”（仅适用于 PPPs）。
- **NAS-Identifier** - 路由器的 identity 名称。
- **NAS-IP-Address** - 路由器自身的 IP 地址。
- **NAS-Port** - 此属性表示正在对用户进行认证的 NAS 的物理端口号。
- **Acct-Session-Id** - 唯一会话 ID。会话 ID 的前两个符号表示服务（PPP、Hotspot 等）。下一个符号在每次重启时递增。最后一组符号在每次新会话时递增。这意味着，在同一次启动中，对于同一 RADIUS 类型服务的 100 万次重连，您无法获得相同的 ID。如果您丢失了会话停止消息，而 RADIUS 服务器仍保持该会话打开，但随后收到另一条会话启动消息，那么它必须意识到停止消息已丢失，关闭旧会话并启动新会话。
- **NAS-Port-Type** - Async PPP - “Async”；PPTP 和 L2TP - “Virtual”；PPPoE - “Ethernet”；ISDN - “ISDN Sync”；HotSpot - “Ethernet | Cable | Wireless-802.11”（取决于 `/ip/hotspot/profile` 中 nas-port-type 参数的值）。
- **Calling-Station-Id** - PPPoE 和 HotSpot - 大写字母表示的客户端 MAC 地址；PPTP 和 L2TP - 客户端公网 IP 地址。
- **Called-Station-Id** - PPPoE - 服务名；PPTP 和 L2TP - 服务器 IP 地址；HotSpot - HotSpot 服务器名称。
- **NAS-Port-Id** - Async PPP - 串口名称；PPPoE - 服务器运行所在的以太网接口名称；HotSpot - 物理 HotSpot 接口的名称（如果已桥接，此处显示桥接端口名称）；ISDN、PPTP 和 L2TP 不存在此属性。
- **Framed-IP-Address** - Universal Client 转换后 HotSpot 客户端的 IP 地址。
- **Mikrotik-Host-IP** - Universal Client 转换前 HotSpot 客户端的 IP 地址（客户端的原始 IP 地址）。
- **User-Name** - 客户端登录名。
- **MS-CHAP-Domain** - 用户域（如果存在）。
- **Mikrotik-Realm** - 如果在 /radius 菜单中设置了它，则它会作为 Mikrotik-Realm 属性包含在每个 RADIUS 请求中。如果未设置，则发送与 MS-CHAP-Domain 属性相同的值（如果缺少 MS-CHAP-Domain，则也不包含 Realm）。
- **WISPr-Location-ID** - 在 HotSpot 服务器的 radius-location-id 属性中指定的文本字符串。
- **WISPr-Location-Name** - 在 HotSpot 服务器的 radius-location-name 属性中指定的文本字符串。
- **WISPr-Logoff-URL** - 注销页面的完整链接（例如，**[](http://10.48.0.1/lv/logout)**）。

取决于认证方法（注意：HotSpot 默认使用 CHAP，如果启用了未加密密码，也可能使用 PAP；它不能使用 MSCHAP）：

- **User-Password** - 加密密码（与 PAP 认证一起使用）。
- **CHAP-Password**、**CHAP-Challenge** - 加密密码和挑战（与 CHAP 认证一起使用）。
- **MS-CHAP-Response**, MS-CHAP-Challenge - 加密密码和挑战（与 MS-CHAPv1 认证一起使用）。
- **MS-CHAP2-Response**、**MS-CHAP-Challenge** - 加密密码和挑战（与 MS-CHAPv2 认证一起使用）。

### Access-Accepts 数据包 {#access-accepts-packet}

- **Framed-IP-Address** - 分配给客户端的 IP 地址。如果该地址属于 127.0.0.0/8 或 224.0.0.0/3 网络，则使用默认配置文件中的 IP 池来分配客户端 IP 地址。如果指定了 Framed-IP-Address，则忽略 Framed-Pool。
- **Framed-IP-Netmask** - 客户端子网掩码。PPPs - 如果指定，将通过 Framed-IP-Address 网关创建到 Framed-IP-Address 所属网络的路由；HotSpot - 被 HotSpot 忽略。
- **Framed-Pool** - 用于为客户端获取 IP 地址的（路由器上的）IP 池名称。如果指定了 Framed-IP-Address，则忽略此属性。
- **Framed-IPv6-Prefix** - 分配给客户端的 IPv6 前缀。
- **Mikrotik-Delegated-IPv6-Pool** - 用于前缀委派的 IPv6 池。
- **Delegated-IPv6-Prefix** - IPv6 前缀。
- **Delegated-IPv6-Prefix-Pool** - 用于前缀委派的 IPv6 前缀池。

注意：如果指定了 Framed-IP-Address 或 Framed-Pool，则它会覆盖默认配置中的 remote-address。

- **Idle-Timeout** - 覆盖默认配置中的 idle-timeout。
- **Session-Timeout** - 覆盖默认配置中的 session-timeout。
- **Port-Limit** - 使用同一用户名的最大并发连接数（覆盖 HotSpot 用户配置文件的 shared-users 属性）。
- **Class** - Cookie。将原样包含在 Accounting-Request 中。
- **Framed-Route** - 要在服务器上添加的路由。格式在 RFC 2865（第 5.22 章）中指定。可根据需要指定多次。
- **Filter-Id** - 防火墙过滤链名称。它用于创建动态防火墙规则。防火墙链名称可以带有 .in 或 .out 后缀，这样规则只会对传入或传出流量安装。可以提供多个 Filter-id，但只会使用传入和传出的最后一个。对于 PPPs - ppp 链中的过滤规则，如果数据包来自/发往客户端，则会跳转到指定链（这意味着您应首先创建 ppp 链，并创建将实际流量放入此链的跳转规则）。HotSpot 同理，但规则将在 hotspot 链中创建。
- **Mikrotik-Mark-Id** - 防火墙 mangle 链名称（仅 HotSpot）。MikroTik RADIUS 客户端在收到此属性后，会创建一条动态防火墙 mangle 规则，其中 action=jump chain=hotspot，jump-target 等于该属性值。Mangle 链名称可以带有 .in 或 .out 后缀，这样规则只会对传入或传出流量安装。可以提供多个 Mark-id 属性，但只会使用传入和传出的最后一个。
- **Acct-Interim-Interval** - RADIUS 客户端的临时更新。PPP - 如果为 0，则使用 RADIUS 客户端中指定的值。HotSpot - 仅当 HotSpot 服务器配置文件中的 radius-interim-update=received 时才会生效。
- **MS-MPPE-Encryption-Policy** - Require-encryption 属性（仅 PPPs）。
- **MS-MPPE-Encryption-Types** - Use-encryption 属性。非零值表示使用加密（仅 PPPs）。
- **Ascend-Data-Rate** - Tx/rx 数据速率限制；如果提供多个属性，第一个限制 tx 数据速率，第二个限制 rx 数据速率。如果与 Ascend-Xmit-Rate 一起使用，则指定 rx 速率。0 表示不限速。如果存在 Rate-Limit 属性，则忽略此项。
- **Ascend-Xmit-Rate** - Tx 数据速率限制。它可用于仅指定 tx 限制，而不发送两个连续的 Ascend-Data-Rate 属性（在这种情况下，Ascend-Data-Rate 将指定接收速率）。0 表示不限速。如果存在 Rate-Limit 属性，则忽略此项。
- **MS-CHAP2-Success** - 如果使用了 MS-CHAPv2，则为认证响应（仅适用于 PPPs）。
- **MS-MPPE-Send-Key, MS-MPPE-Recv-Key** - 仅当使用 MS-CHAPv2 作为认证时，由 RADIUS 服务器提供的加密 PPP 的加密密钥（仅适用于 PPPs）。
- **Ascend-Client-Gateway** - 用于 DHCP-pool HotSpot 登录方法的客户端网关（仅 HotSpot）。
- **Mikrotik-Recv-Limit** - 客户端的总接收限制，以字节为单位。
- **Mikrotik-Recv-Limit-Gigawords** - 总接收限制的 4G（2^32）字节部分（位 32..63，其中位 0..31 在 Mikrotik-Recv-Limit 中传递）。
- **Mikrotik-Xmit-Limit** - 客户端的总发送限制，以字节为单位。
- **Mikrotik-Xmit-Limit-Gigawords** - 总发送限制的 4G（2^32）字节部分（位 32..63，其中位 0..31 在 Mikrotik-Xmit-Limit 中传递）。
- **Mikrotik-Wireless-Forward** - 如果此属性设置为 “0”，则不将客户端帧转发回无线基础设施（仅 Wireless）。
- **Mikrotik-Wireless-Skip-Dot1x** - 如果设置为非零值，则禁用特定无线客户端的 802.1x 认证（仅 Wireless）。
- **Mikrotik-Wireless-Enc-Algo** - WEP 加密算法：0 - 不加密，1 - 40 位 WEP，2 - 104 位 WEP（仅 Wireless）。
- **Mikrotik-Wireless-Enc-Key** - 客户端的 WEP 加密密钥（仅 Wireless）。
- **Mikrotik-Wireless-VLANID** - 客户端的 VLAN ID（仅 Wireless）。
- **Mikrotik-Wireless-VLANID-type** - 客户端的 VLAN ID 类型。0 - 802.1q 标签，1 - 802.1ad 标签（仅 Wireless）。
- **Mikrotik-Switching-Filter** - 允许在使用 dot1x 服务器对客户端进行认证时创建动态交换规则。
- **Mikrotik-Rate-Limit** - 客户端的数据速率限制。格式为：rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time] [priority] [rx-rate-min[/tx-rate-min]]]]（从路由器角度而言，因此 “rx” 是客户端上传，“tx” 是客户端下载）。所有速率都应为数字，并可带有可选的 'k'（1,000s）或 'M'（1,000,000s）。如果未指定 tx-rate，则 rx-rate 也作为 tx-rate。tx-burst-rate、tx-burst-threshold 和 tx-burst-time 同理。如果同时未指定 rx-burst-threshold 和 tx-burst-threshold（但指定了 burst-rate），则使用 rx-rate 和 tx-rate 作为突发阈值。如果同时未指定 rx-burst-time 和 tx-burst-time，则默认使用 1s。Priority 取值为 1..8，其中 1 表示最高优先级，8 表示最低优先级。如果未指定 rx-rate-min 和 tx-rate-min，则使用 rx-rate 和 tx-rate 值。rx-rate-min 和 tx-rate-min 的值不能超过 rx-rate 和 tx-rate 的值。
- **Mikrotik-Group** - 本地用户的路由器本地用户组名称（在 `/user/group` 中定义）；HotSpot 用户的 HotSpot 默认配置文件；PPP 用户的 PPP 默认配置文件名称。
- **Mikrotik-Advertise-URL** - 应向客户端显示的广告页面 URL。如果指定了此属性，则会自动启用广告（包括透明代理），即使在相应用户配置文件中已显式禁用广告也是如此。RADIUS 服务器可以发送多个属性实例来指定其他 URL，这些 URL 会以轮询方式选择。
- **Mikrotik-Advertise-Interval** - 两个相邻广告之间的时间间隔。RADIUS 服务器可以发送多个属性实例来指定其他间隔。所有间隔值都视为一个列表，并在每次成功广告时逐个取用。如果到达列表末尾，则继续使用最后一个值。
- **WISPr-Redirection-URL** - 客户端在成功登录后将重定向到的 URL。
- **WISPr-Bandwidth-Min-Up** - 为客户端上传提供的最小数据速率（CIR）。
- **WISPr-Bandwidth-Min-Down** - 为客户端下载提供的最小数据速率（CIR）。
- **WISPr-Bandwidth-Max-Up** - 为客户端上传提供的最大数据速率（MIR）。
- **WISPr-Bandwidth-Max-Down** - 为客户端下载提供的最大数据速率（MIR）。
- **WISPr-Session-Terminate-Time** - 应断开用户的时间；格式为 “YYYY-MM-DDThh:mm:ssTZD”，其中 Y - 年；M - 月；D - 日；T - 分隔符（必须写在日期和时间之间）；h - 小时（24 小时制）；m - 分钟；s - 秒；TZD - 时区，采用以下形式之一：“+hh:mm”、“+hhmm”、“-hh:mm”、“-hhmm”。

收到的属性会覆盖默认属性（在默认配置文件中设置），但如果未从 RADIUS 服务器收到某个属性，则使用默认属性。Rate-Limit 优先于为客户端指定数据速率的所有其他方式。Ascend 数据速率属性次之；WISPr 属性优先级最低。

以下是一些 Rate-Limit 示例：

- **128k** - rx-rate=128000，tx-rate=128000（无突发）。
- **64k/128M** - rx-rate=64000，tx-rate=128000000。
- **64k 256k** - rx/tx-rate=64000，rx/tx-burst-rate=256000，rx/tx-burst-threshold=64000，rx/tx-burst-time=1s。
- **64k/64k 256k/256k 128k/128k 10/10** - rx/tx-rate=64000，rx/tx-burst-rate=256000，rx/tx-burst-threshold=128000，rx/tx-burst-time=10s。

### Accounting-Request 数据包 {#accounting-request-packet}

计费请求携带与 Access Request 相同的属性，另加以下属性：

- **Acct-Status-Type** - Start、Stop 或 Interim-Update。
- **Acct-Authentic** - 由 RADIUS 或本地授权方认证（仅 PPPs）。
- **Class** - RADIUS 服务器 cookie，如在 Access-Accept 中收到的那样。
- **Acct-Delay-Time** - 路由器尝试发送此 Accounting-Request 数据包的时长。

### Stop 和 Interim-Update Accounting-Request 数据包 {#stop-and-interim-update-accounting-request-packet}

除计费开始请求外，以下消息还将包含以下属性：

- **Acct-Session-Time** - 连接正常运行时间，以秒为单位。
- **Acct-Input-Octets** - 从客户端接收的字节数。
- **Acct-Input-Gigawords** - 从客户端接收的 4G（2^32）字节部分（位 32..63，其中位 0..31 在 Acct-Input-Octets 中传递）。
- **Acct-Input-Packets** - 从客户端接收的数据包数量。
- **Acct-Output-Octets** - 发送到客户端的字节数。
- **Acct-Output-Gigawords** - 发送到客户端的 4G（2^32）字节部分（位 32..63，其中位 0..31 在 Acct-Output-Octets 中传递）。
- **Acct-Output-Packets** - 发送到客户端的数据包数量。

:::warning
RouterOS 中的 RADIUS 计费消息从客户端角度将 output 表示为流量，例如，对于 VPN 用户 “test”，output 是用户上传。

:::

### **Stop Accounting-Request 数据包** {#stop-accounting-request-packet}

这些数据包除 Interim Update 数据包外，还将包含：

- **Acct-Terminate-Cause** - 会话终止原因（参见 RFC 2866 第 5.10 章）
  
  ### **授权变更**

RADIUS 断开和 Change of Authorization（根据 RFC3576）也受支持。以下属性可以通过来自 RADIUS 服务器的 CoA 请求进行更改：

- **Mikrotik-Group**
- **Mikrotik-Recv-Limit**
- **Mikrotik-Xmit-Limit**
- **Mikrotik-Rate-Limit**
- **Ascend-Data-Rate**（仅当不存在 Mikrotik-Rate-Limit 时）
- **Ascend-XMit-Rate**（仅当不存在 Mikrotik-Rate-Limit 时）
- **Mikrotik-Mark-Id**
- **Filter-Id**
- **Mikrotik-Advertise-Url**
- **Mikrotik-Advertise-Interval**
- **Session-Timeout**
- **Idle-Timeout**
- **Port-Limit**

请注意，无法通过这种方式更改 IP 地址、池或路由——要进行此类更改，必须先断开用户连接。

## MikroTik 特定 RADIUS 属性数值 {#mikrotik-specific-radius-attribute-numeric-values}

| 名称                                   | VendorID | 值 | RFC                           |
|:-- | --:| --:|:-- |
| <strong>MIKROTIK_RECV_LIMIT</strong> | 14988 | 1 |  |
| <strong>MIKROTIK_XMIT_LIMIT</strong> | 14988 | 2 |  |
| <strong>MIKROTIK_GROUP</strong> | 14988 | 3 |  |
| <strong>MIKROTIK_WIRELESS_FORWARD</strong> | 14988 | 4 |  |
| <strong>MIKROTIK_WIRELESS_SKIPDOT1X</strong> | 14988 | 5 |  |
| <strong>MIKROTIK_WIRELESS_ENCALGO</strong> | 14988 | 6 |  |
| <strong>MIKROTIK_WIRELESS_ENCKEY</strong> | 14988 | 7 |  |
| <strong>MIKROTIK_RATE_LIMIT</strong> | 14988 | 8 |  |
| <strong>MIKROTIK_REALM</strong> | 14988 | 9 |  |
| <strong>MIKROTIK_HOST_IP</strong> | 14988 | 10 |  |
| <strong>MIKROTIK_MARK_ID</strong> | 14988 | 11 |  |
| <strong>MIKROTIK_ADVERTISE_URL</strong> | 14988 | 12 |  |
| <strong>MIKROTIK_ADVERTISE_INTERVAL</strong> | 14988 | 13 |  |
| <strong>MIKROTIK_RECV_LIMIT_GIGAWORDS</strong> | 14988 | 14 |  |
| <strong>MIKROTIK_XMIT_LIMIT_GIGAWORDS</strong> | 14988 | 15 |  |
| <strong>MIKROTIK_WIRELESS_PSK</strong> | 14988 | 16 |  |
| <strong>MIKROTIK_TOTAL_LIMIT</strong> | 14988 | 17 |  |
| <strong>MIKROTIK_TOTAL_LIMIT_GIGAWORDS</strong> | 14988 | 18 |  |
| <strong>MIKROTIK_ADDRESS_LIST</strong> | 14988 | 19 |  |
| <strong>MIKROTIK_WIRELESS_MPKEY</strong> | 14988 | 20 |  |
| <strong>MIKROTIK_WIRELESS_COMMENT</strong> | 14988 | 21 |  |
| <strong>MIKROTIK_DELEGATED_IPV6_POOL</strong> | 14988 | 22 |  |
| <strong>MIKROTIK_DHCP_OPTION_SET</strong> | 14988 | 23 |  |
| <strong>MIKROTIK_DHCP_OPTION_PARAM_STR1</strong> | 14988 | 24 |  |
| <strong>MIKROTIK_DHCP_OPTION_PARAM_STR2</strong> | 14988 | 25 |  |
| <strong>MIKROTIK_WIRELESS_VLANID</strong> | 14988 | 26 |  |
| <strong>MIKROTIK_WIRELESS_VLANIDTYPE</strong> | 14988 | 27 |  |
| <strong>MIKROTIK_WIRELESS_MINSIGNAL</strong> | 14988 | 28 |  |
| <strong>MIKROTIK_WIRELESS_MAXSIGNAL</strong> | 14988 | 29 |  |
| <strong>Mikrotik-Switching-Filter</strong> | 14988 | 30 |  |

## 所有支持的属性数值 {#all-supported-attribute-numeric-values}

| 名称                                   | VendorID | 值 | RFC                           |
|:-- |:-- | --:|:-- |
| **Acct-Authentic**                     |          | 45    | RFC 2866                      |
| **Acct-Delay-Time**                    |          | 41    | RFC 2866                      |
| **Acct-Input-Gigawords**               |          | 52    | RFC 2869                      |
| **Acct-Input-Octets**                  |          | 42    | RFC 2866                      |
| **Acct-Input-Packets**                 |          | 47    | RFC 2866                      |
| **Acct-Interim-Interval**              |          | 85    | RFC 2869                      |
| **Acct-Output-Gigawords**              |          | 53    | RFC 2869                      |
| **Acct-Output-Octets**                 |          | 43    | RFC 2866                      |
| **Acct-Output-Packets**                |          | 48    | RFC 2866                      |
| **Acct-Session-Id**                    |          | 44    | RFC 2866                      |
| **Acct-Session-Time**                  |          | 46    | RFC 2866                      |
| **Acct-Status-Type**                   |          | 40    | RFC 2866                      |
| **Acct-Terminate-Cause**               |          | 49    | RFC 2866                      |
| **Ascend-Client-Gateway**              | 529      | 132   |                               |
| **Ascend-Data-Rate**                   | 529      | 197   |                               |
| **Ascend-Xmit-Rate**                   | 529      | 255   |                               |
| **Called-Station-Id**                  |          | 30    | RFC 2865                      |
| **Calling-Station-Id**                 |          | 31    | RFC 2865                      |
| **CHAP-Challenge**                     |          | 60    | RFC 2866                      |
| **CHAP-Password**                      |          | 3     | RFC 2865                      |
| **Class**                              |          | 25    | RFC 2865                      |
| **Filter-Id**                          |          | 11    | RFC 2865                      |
| **Framed-Compression**                 |          | 13    | RFC 2865                      |
| **Framed-IP-Address**                  |          | 8     | RFC 2865                      |
| **Framed-IP-Netmask**                  |          | 9     | RFC 2865                      |
| **Framed-IPv6-Prefix**                 |          | 97    | RFC 3162                      |
| **Framed-Mtu**                         |          | 12    | RFC 2865                      |
| **Framed-Pool**                        |          | 88    | RFC 2869                      |
| **Framed-Protocol**                    |          | 7     | RFC 2865                      |
| **Framed-Route**                       |          | 22    | RFC 2865                      |
| **Framed-Routing**                     |          | 10    | RFC 2865                      |
| **Idle-Timeout**                       |          | 28    | RFC 2865                      |
| **MS-CHAP-Challenge**                  | 311      | 11    | RFC 2548                      |
| **MS-CHAP-Domain**                     | 311      | 10    | RFC 2548                      |
| **MS-CHAP-Response**                   | 311      | 1     | RFC 2548                      |
| **MS-CHAP2-Response**                  | 311      | 25    | RFC 2548                      |
| **MS-CHAP2-Success**                   | 311      | 26    | RFC 2548                      |
| **MS-MPPE-Encryption-Policy**          | 311      | 7     | RFC 2548                      |
| **MS-MPPE-Encryption-Types**           | 311      | 8     | RFC 2548                      |
| **MS-MPPE-Recv-Key**                   | 311      | 17    | RFC 2548                      |
| **MS-MPPE-Send-Key**                   | 311      | 16    | RFC 2548                      |
| **NAS-Identifier**                     |          | 32    | RFC 2865                      |
| **NAS-Port**                           |          | 5     | RFC 2865                      |
| **NAS-IP-Address**                     |          | 4     | RFC 2865                      |
| **NAS-Port-Id**                        |          | 87    | RFC 2869                      |
| **NAS-Port-Type**                      |          | 61    | RFC 2865                      |
| **Port-Limit**                         |          | 62    | RFC 2865                      |
| **Redback-Agent-Remote-Id**            | 2352     | 96    |                               |
| **Redback-Agent-Circuit-Id**           | 2352     | 97    |                               |
| **Service-Type**                       |          | 6     | RFC 2865                      |
| **Session-Timeout**                    |          | 27    | RFC 2865                      |
| **User-Name**                          |          | 1     | RFC 2865                      |
| **User-Password**                      |          | 2     | RFC 2865                      |
| **WISPr-Bandwidth-Max-Down**           | 14122    | 8     | [wi-fi.org](https://www.wi-fi.org/) |
| **WISPr-Bandwidth-Max-Up**             | 14122    | 7     | [wi-fi.org](https://www.wi-fi.org/) |
| **WISPr-Bandwidth-Min-Down**           | 14122    | 6     | [wi-fi.org](https://www.wi-fi.org/) |
| **WISPr-Bandwidth-Min-Up**             | 14122    | 5     | [wi-fi.org](https://www.wi-fi.org/) |
| **WISPr-Location-Id**                  | 14122    | 1     | [wi-fi.org](https://www.wi-fi.org/) |
| **WISPr-Location-Name**                | 14122    | 2     | [wi-fi.org](https://www.wi-fi.org/) |
| **WISPr-Logoff-URL**                   | 14122    | 3     | [wi-fi.org](https://www.wi-fi.org/) |
| **WISPr-Redirection-URL**              | 14122    | 4     | [wi-fi.org](https://www.wi-fi.org/) |
| **WISPr-Session-Terminate-Time**       | 14122    | 9     | [wi-fi.org](https://www.wi-fi.org/) |
| **WISPr-Session-Terminate-End-Of-Day** | 14122    | 10    | [wi-fi.org](https://www.wi-fi.org/) |
| **WISPr-Billing-Class-Of-Service**     | 14122    | 11    | [wi-fi.org](https://www.wi-fi.org/) |
|  |  |  |  |
