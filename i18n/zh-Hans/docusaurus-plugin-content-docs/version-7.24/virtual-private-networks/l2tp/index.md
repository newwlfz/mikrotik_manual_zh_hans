---
sidebar_key: "virtual-private-networks/l2tp/index"
sidebar_position: 2
title: "L2TP"
sidebar_label: "L2TP"
description: "本页面介绍 MikroTik RouterOS 的 L2TP 配置,涵盖客户端与服务器的设置,包括 authentication methods、MTU/MRRU 设置、IPsec 集成,以及在 Layer Two Tunneling Protocol 场景下的动态接口管理。"
tags:
  - 'l2tp'
  - 'ppp'
  - 'ipsec'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/l2tp
captured_at: '2026-11-04T11:34:37+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节涵盖 L2TP 示例。可用于配置 LAC 和 LNS 场景以及相关的 L2TP 互操作案例。

<DocCardList />

二层隧道协议 "L2TP" 通过允许 L2 和 PPP 端点位于由分组交换网络互连的不同设备上，扩展了 PPP 模型。L2TP 为每个 L2TP 连接包含 PPP 认证和计费。每个连接的完整认证和计费可以通过 RADIUS 客户端或本地完成。L2TP 流量对控制包和数据包均使用 UDP 协议。UDP 端口 1701 仅用于链路建立，后续流量使用任意可用的 UDP 端口（可能是也可能不是 1701）。这意味着，通过允许 UDP 流量路由通过防火墙或路由器，L2TP 可与大多数防火墙和路由器（即使使用 NAT）一起使用。L2TP 标准定义于 [RFC 2661](https://tools.ietf.org/html/rfc2661)。L2TPv3 支持在 7.1 版本中添加。它支持 IPv4 和 IPv6。

## 简介 {#introduction}

将 L2TP 像任何其他隧道协议一样使用（无论是否加密）可能很有用。L2TP 标准指出，加密数据最安全的方式是使用 L2TP over IPsec（请注意，这是 Microsoft L2TP 客户端的默认模式），因为特定隧道的所有 L2TP 控制包和数据包在 IPsec 系统看来都是同质的 UDP/IP 数据包。

支持 Multilink PPP (MP)，以提供 MRRU（传输完整大小 1500 及更大数据包的能力）以及通过 PPP 链路的桥接（使用 Bridge Control Protocol (BCP)，它允许通过 PPP 链路发送原始以太网帧）。通过这种方式，可以在没有 EoIP 的情况下设置桥接。网桥中应具有管理性设置的 MAC 地址或类似以太网的接口，因为 PPP 链路没有 MAC 地址。

:::warning
L2TP 不为隧道流量提供加密机制。可使用 IPsec 提供额外的安全层。
:::

## L2TP 客户端 {#l2tp-client}

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **add-default-route** (*yes \| no*; 默认：**no**) | 是否将 L2TP 远端地址添加为默认路由。 |
| **allow** (*mschap2 \| mschap1 \| chap \| pap*；默认：**mschap2, mschap1, chap, pap**) | 允许的身份验证方法。 |
| **connect-to** (*IP\|IPv6*; 默认： ) | L2TP 服务器的远端地址（如果该地址位于 VRF 表中，则应指定 VRF）  `/interface/l2tp-client``add connect-to=192.168.88.1@vrf1 name=l2tp-out1 user=l2tp-client)`    |
| **comment** (*string*; Default: ) | 隧道的简短描述。 |
| **default-route-distance** (*byte*; 默认： ) | 自 v6.2 起，如果还选择了 add-default-route，则设置应用于自动创建默认路由的距离值 |
| **dial-on-demand** (*yes \| no*; 默认：**no**) | 仅在生成出站流量时才连接。如果选择，则在连接尚未建立时会添加一条网关地址来自 10.112.112.0/24 网络的路由。 |
| **disabled** (*yes \| no*; 默认：**yes**) | 启用/禁用隧道。 |
| **keepalive-timeout** (*integer [1..4294967295]*; 默认：**60s**) | 自 v6.0rc13 起，隧道保活超时时间（秒）。 |
| **max-mru** (*integer*; 默认：**1450**) | 最大接收单元。L2TP 接口能够在无数据包分片的情况下接收的最大数据包大小。 |
| **max-mtu** (*integer*; 默认：**1450**) | 最大传输单元。L2TP 接口能够在无数据包分片的情况下发送的最大数据包大小。 |
| **mrru** (*disabled \| integer*；默认：**disabled**) | 链路上能够接收的最大数据包大小。如果数据包大于隧道 MTU，它将被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或以太网数据包。 |
| **name** (*string*; 默认： ) | 接口的描述性名称。 |
| **password** (*string*; 默认： **""**) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于认证的密码。 |
| **profile** (*name*; 默认：**default-encryption**) | 指定建立隧道时将使用哪个 PPP 配置文件配置。 |
| **user** (*string*; 默认： ) | 用于认证的用户名。 |
| **use-ipsec** (*yes \| no*; 默认：**no**) | 当启用此选项时，会添加动态 IPSec 对等体配置和策略（传输模式），以将 L2TP 连接封装到 IPSec 隧道中。**警告：** 同一 NAT 后的多个 L2tp/ipsec 客户端在此模式下将无法工作。要实现此类场景，请禁用 use-ipsec，并为客户端设置静态策略，同时启用 tunnel=yes、level=unique 设置。     |
| **allow-fast-path** (*yes \| no*; 默认： ) | 允许在 Linux 内核中不经额外处理转发数据包。 |
| **l2tp-proto-version** ( l2tpv2 *\| l2tpv3-ip \| l2tpv3-udp \| l2tpv3*; 默认： **l2tpv2** ) | 指定协议版本。 |
| **l2tpv3-cookie-length** ( 0 *\| 4-bytes \| 8-bytes* ; 默认： **0** ) | 配置 L2TPv3 伪线静态会话 cookie。 |
| **l2tpv3-digest-hash** (*md5 \| none \| sha1* ; 默认：**md5** ) | 指定要使用的哈希函数。 |
| **use-peer-dns** (*yes \| no \| exclusively*; 默认： **no**  ) | 使用对端 DNS。 |
| **copy-from** | 复制已创建的对等体。 |
| **src-address** | 指定源地址。 |
| **l2tpv3-circuit-id** | 设置虚拟电路标识符，以绑定 L2TPv3 控制通道的一端。 |
| **ipsec-secret** (*string*; 默认： ) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 启用 use-ipsec 时使用的预共享密钥。 |

## L2TP 服务器 {#l2tp-server}

对于建立到给定服务器的每个隧道，都会创建一个接口。L2TP 服务器配置中有两种类型的接口：

- 如果需要引用为特定用户创建的特定接口名称（在防火墙规则或其他位置），则会以管理方式添加静态接口。
- 每当用户连接且其用户名不匹配任何现有静态条目时（或者在该条目已处于活动状态的情况下，因为不能有两个单独的隧道接口以相同名称引用），动态接口会自动添加到此列表。

动态接口在用户连接时出现，并在用户断开连接后消失，因此无法在路由器配置中（例如在防火墙中）引用为该用户创建的隧道，所以如果需要为该用户设置持久规则，请为其创建静态条目。否则，使用动态配置是安全的。

:::warning
无论哪种情况，都必须正确配置 PPP 用户——静态条目不能替代 PPP 配置。
:::

### 属性 {#properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **authentication** (*pap \| chap \| mschap1 \| mschap2*; 默认：**mschap1,mschap2**) | 服务器将接受的认证方法。 |
| **default-profile** (*name*; 默认：**default-encryption**) | 要使用的默认配置文件 |
| **enabled** (*yes \| no*; 默认：**no**) | 定义是否启用 L2TP 服务器。 |
| **max-mru** (*integer*; 默认：**1450**) | 最大接收单元。L2TP 接口能够在无数据包分片的情况下接收的最大数据包大小。 |
| **keepalive-timeout** (*integer*; 默认：**30**) | 如果服务器在 keepalive-timeout 期间未收到任何数据包，它将每秒发送保活数据包，共五次。如果服务器仍未收到客户端的任何响应，则客户端将在 5 秒后断开连接。日志将显示 5 条 "LCP missed echo reply" 消息，然后断开连接。 |
| **max-mtu** (*integer*; 默认：**1450**) | 最大传输单元。L2TP 接口能够在无数据包分片的情况下发送的最大数据包大小。 |
| **use-ipsec** (*no \| yes \| require*; 默认：**no**) | 当启用此选项时，会添加动态 IPSec 对等体配置，以适应大多数 L2TP 远程接入（road-warrior）设置。当选择 require 时，服务器将仅接受那些封装在 IPSec 隧道中的 L2TP 连接尝试。 |
| **ipsec-secret** (*string*; 默认： ) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 启用 use-ipsec 时使用的预共享密钥 |
| **accept-proto-version** ( all *\|* l2tpv2 *\|* l2tpv3; 默认：**all** ) cli-only | 指定协议版本。 |
| **accept-pseudowire-type** ( all *\|* ether *\|* ppp; 默认：**all** ) | 为特定伪线类型设置伪线信令协议。 |
| **allow-fast-path** (*no \| yes*; 默认：**no** ) | 在 Linux 内核中不经额外处理转发数据包。 |
| **caller-id-type** ( ip-address *\|* number; 默认：**ip-address**) | 如果多个客户端使用相同的源 IP 地址，请将 id 类型设置为 number。 |
| **max-sessions** ( unlimited / number; 默认：**unlimited** ) | 设置所需会话数。 |
| **one-session-per-host**( *no \| yes*; 默认：**no** ) | 允许每个主机一个会话。 |
| **l2tpv3-circuit-id** (默认： ) | 设置虚拟电路标识符，以绑定 L2TPv3 控制通道的一端。 |
| **l2tpv3-cookie-length** (0 *\|* 4-bytes *\|* 8-bytes; 默认：**0** ) | 配置 L2TP 伪线静态会话 cookie。 |
| **l2tpv3-digest-hash** ( md5 *\|* none *\|* sha1; 默认：**md5** ) | 指定要使用的哈希函数。 |
| **l2tpv3-ether-interface-list** (默认： ) | 设置接口列表，例如默认的 all、dynamic、none、static。 |
| **mrru** (*disabled \| integer*; 默认：**disabled**) | 链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，它将被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或以太网数据包。 |

## 快速示例 {#quick-example}

![](/img/f2cf148d94cfeff8.webp)

### L2TP 服务器 {#l2tp-server-1}

在服务器端，我们将启用 L2TP-server 并为特定用户创建 PPP 配置文件：

```ros
[admin@MikroTik] > /interface/l2tp-server/server/set enabled=yes
[admin@MikroTik] > /ppp/secret/add local-address=10.0.0.2 name=MT-User password=StrongPass profile=default-encryption remote-address=10.0.0.1 service=l2tp
```

### L2TP 客户端 {#l2tp-client-1}

RouterOS 中的 L2TP 客户端设置非常简单。在以下示例中，我们已经有一个预配置的 3 台设备设置。我们将更详细地了解如何使用用户名 "MT-User"、密码 "StrongPass" 和服务器 192.168.51.3 设置 L2TP 客户端：

```ros
[admin@MikroTik] > /interface/l2tp-client \
add connect-to=192.168.51.3 disabled=no name=MT-User password=StrongPass user=MT-User
[admin@MikroTik] > /interface/l2tp-client/print 
Flags: X - disabled, R - running 
0 R name="MT-User" max-mtu=1450 max-mru=1450 mrru=disabled connect-to=192.168.51.3 user="MT-User" 
password="StrongPass" profile=default-encryption keepalive-timeout=60 use-ipsec=no ipsec-secret="" 
allow-fast-path=no add-default-route=no dial-on-demand=no allow=pap,chap,mschap1,mschap2
```

## L2TP Ether {#l2tp-ether}

## 概述 {#overview}

二层隧道协议版本 3（L2TPv3）由互联网工程任务组（IETF）的 [RFC 3931](https://tools.ietf.org/html/rfc3931) 定义。它对原始 L2TP 引入了各种改进，允许在 L2TP 内封装二层（L2）有效载荷。更准确地说，L2TPv3 概述了使用 L2 虚拟专用网络（VPN）跨越 IP 核心网络隧道传输二层有效载荷的协议。

要建立 **L2TP Ether** 隧道，必须在 **客户端侧** 创建 **L2TP Ether 接口**，同时必须在 **远端（服务器）侧** 启用 **L2TP 服务器**。一旦两侧配置正确，它们之间会自动创建一个 **动态接口**，形成跨越 IP 网络的透明二层连接。

---

##### **服务器侧（L2TP 服务器）** {#server-side-l2tp-server}

`/interface/l2tp-server/server/set enabled=yes`

##### **客户端侧（L2TP Ether 接口）** {#client-side-l2tp-ether-interface}

`/interface/l2tp-ether/add` connect-to=1.1.1.1 disabled=no

## 属性 {#properties-2}

| 属性 | 描述 |
| :-- | :-- |
| **connect-to** ( *IP*; 默认： ) | L2TP 服务器的远端地址。  |
| **comment** ( *string*; 默认： ) | 隧道的简短描述。 |
| **disabled** ( *yes \| no*; 默认：**yes**) | 启用/禁用隧道。 |
| **mac-address** ( string; 默认：**auto**) | 设置接口所需的 MAC 地址。 |
| **unmanaged-mode** ( *yes \| no*; 默认：**no**) | 将非托管模式设置为活动状态。将可以进行附加设置的配置，例如：**peer-cookie, send-cookie, local-tunnel-id, local-session-id, remote-tunnel-id, remote-session-id, local-address.** |
| **local-tunnel-id ( string; 默认：disabled)** | 设置 local-tunnel-id 的值；需要整数。 |
| **local-session-id ( string; 默认：disabled)** | 设置 local-session-id 的值；需要整数。 |
| **remote-tunnel-id (** string; 默认：**disabled)** | 设置 remote-tunnel-id 的值；需要整数。 |
| **remote-session-id (** string; 默认：**disabled)** | 设置 remote-session-id 的值；需要整数。 |
| **peer-cookie (** string; 默认：**disabled)** | 设置可选的对端 cookie。要启用 cookie，请输入远端 cookie 值（应为 8 或 16 个字符的十六进制字符串值）；要禁用，请留空。 |
| **send-cookie (** string; 默认：**disabled)** | 设置可选 cookie。要启用 cookie，请输入远端 cookie 值（应为 8 或 16 个字符的十六进制字符串值）；要禁用，请留空。 |
| **mtu** (*auto*; 默认：**1420**) | 最大传输单元。L2TP 接口能够在无数据包分片的情况下发送的最大数据包大小。 |
| **name** (*string*; 默认： ) | 接口的描述性名称。 |
| **local-address** (*IP address*; 默认： ) | 为 **非托管** 模式设置本地地址。 |
| **use-ipsec** (*yes \| no*; 默认：**no**) | 当启用此选项时，会添加动态 IPSec 对等体配置和策略，以将 L2TP 连接封装到 IPSec 隧道中。 |
| **allow-fast-path** (*yes \| no*; 默认：**no** ) | 允许在 Linux 内核中不经额外处理转发数据包。 |
| **l2tp-proto-version** ( *l2tpv3-ip \| l2tpv3-udp* ; 默认：***l2tpv3-udp***) | 指定协议版本。 |
| **cookie-length** ( 0 *\| 4-bytes \| 8-bytes* ; 默认： **0** ) | 配置 L2TPv3 伪线静态会话 cookie。 |
| **digest-hash** (*md5 \| none \| sha1* ; 默认：**md5** ) | 指定要使用的哈希函数。 |
| **use-l2-specific-sublayer** ( *yes \| no*; 默认：**no**) | 启用 L2TPv3 以太网伪线二层默认子层。 |
| **circuit-id** | 设置虚拟电路标识符，以绑定 L2TPv3 控制通道的一端。这用作每个冗余伪线的标识符。 |
| **ipsec-secret** (*string*; 默认： ) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 启用 use-ipsec 时使用的预共享密钥。 |
