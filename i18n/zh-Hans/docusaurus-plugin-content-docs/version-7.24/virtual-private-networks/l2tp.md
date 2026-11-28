---
title: "L2TP"
description: "本页介绍 MikroTik RouterOS L2TP 配置，涵盖客户端和服务器设置，包括 authentication methods、MTU/MRRU 设置、IPsec 集成，以及 Layer Two Tunneling Protocol 场景中的动态接口管理。"
tags:
  - 'l2tp'
  - 'ppp'
  - 'ipsec'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/l2tp
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍 L2TP 示例。使用它配置 LAC 和 LNS 场景以及相关的 L2TP 互操作案例。

<DocCardList />

二层隧道协议“L2TP”通过允许 L2 和 PPP 端点位于由分组交换网络互连的不同设备上，扩展了 PPP 模型。L2TP 包含每个 L2TP 连接的 PPP 认证和计费。每个连接的完整认证和计费可以通过 RADIUS 客户端或本地完成。L2TP 流量对控制数据包和数据包均使用 UDP 协议。UDP 端口 1701 仅用于链路建立，后续流量使用任意可用的 UDP 端口（可能是 1701，也可能不是）。这意味着通过允许 UDP 流量经防火墙或路由器路由，L2TP 可用于大多数防火墙和路由器（即使存在 NAT）。L2TP 标准定义于 [RFC 2661](https://tools.ietf.org/html/rfc2661)。L2TPv3 支持在版本 7.1 中添加。它支持 IPv4 和 IPv6。

## 简介 {#introduction}

可以将 L2TP 用作普通隧道协议，无论是否启用加密。L2TP 标准指出，加密数据最安全的方式是使用 L2TP over IPsec（请注意，这是 Microsoft L2TP 客户端的默认模式），因为特定隧道的所有 L2TP 控制和数据数据包对 IPsec 系统而言都表现为同类的 UDP/IP 数据包。

支持 Multilink PPP（MP），以提供 MRRU（传输完整大小的 1500 及更大数据包的能力）以及 PPP 链路上的桥接（使用 Bridge Control Protocol（BCP），允许通过 PPP 链路发送原始以太网帧）。这样可以在不使用 EoIP 的情况下建立桥接。网桥应具有手动设置的 MAC 地址，或包含类似以太网接口，因为 PPP 链路没有 MAC 地址。

:::warning
L2TP 不为隧道流量提供加密机制。IPsec 可用于提供额外的安全层。
:::

## L2TP 客户端 {#l2tp-client}

### 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **add-default-route** (*yes \| no*；默认：**no**) | 是否将 L2TP 远端地址添加为默认路由。 |
| **allow** (*mschap2 \| mschap1 \| chap \| pap*；默认：**mschap2, mschap1, chap, pap**) | 允许的认证方法。 |
| **connect-to** (*IP\|IPv6*；默认：) | L2TP 服务器的远端地址（如果地址位于 VRF 表中，则应指定 VRF）<br/><code>/interface/l2tp-client</code><br/><code>add connect-to=192.168.88.1@vrf1 name=l2tp-out1 user=l2tp-client)</code><br/> |
| **comment** (*string*；默认：) | 隧道的简短描述。 |
| **default-route-distance** (*byte*；默认：) | 自 v6.2 起，当同时选择 add-default-route 时，设置应用于自动创建的默认路由的 distance 值。 |
| **dial-on-demand** (*yes \| no*；默认：**no**) | 仅在产生出站流量时连接。如果选中，则在连接未建立时添加一条网关地址来自 10.112.112.0/24 网络的路由。 |
| **disabled** (*yes \| no*；默认：**yes**) | 启用或禁用隧道。 |
| **keepalive-timeout** (*integer [1..4294967295]*；默认：**60s**) | 自 v6.0rc13 起，设置隧道 keepalive 超时时间，单位为秒。 |
| **max-mru** (*integer*；默认：**1450**) | 最大接收单元。L2TP 接口在不进行数据包分片的情况下能够接收的最大数据包大小。 |
| **max-mtu** (*integer*；默认：**1450**) | 最大传输单元。L2TP 接口在不进行数据包分片的情况下能够发送的最大数据包大小。 |
| **mrru** (*disabled \| integer*；默认：**disabled**) | 链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，将被拆分为多个数据包，从而允许完整大小的 IP 或 Ethernet 数据包通过隧道发送。 |
| **name** (*string*；默认：) | 接口的描述性名称。 |
| **password** (*string*；默认：**""**) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于认证的密码。 |
| **profile** (*name*；默认：**default-encryption**) | 指定建立隧道时使用的 PPP profile 配置。 |
| **user** (*string*；默认：) | 用于认证的用户名。 |
| **use-ipsec** (*yes \| no*；默认：**no**) | 启用该选项时，会添加动态 IPSec peer 配置和策略（传输模式），以将 L2TP 连接封装到 IPSec 隧道中。<br/><br/><strong>注意：</strong>位于同一 NAT 后的多个 L2tp/ipsec 客户端在此模式下无法工作。要实现这种场景，请禁用 use-ipsec，并为客户端设置静态策略，启用 tunnel=yes、level=unique 设置。<br/><br/> |
| **allow-fast-path** (*yes \| no*；默认：) | 允许在 Linux 内核中不进行额外处理而转发数据包。 |
| **l2tp-proto-version** ( l2tpv2 *\| l2tpv3-ip \| l2tpv3-udp \| l2tpv3*；默认：**l2tpv2** ) | 指定协议版本。 |
| **l2tpv3-cookie-length** ( 0 *\| 4-bytes \| 8-bytes*；默认：**0** ) | 配置 L2TPv3 pseudowire 静态会话 cookie。 |
| **l2tpv3-digest-hash** (*md5 \| none \| sha1*；默认：**md5** ) | 指定要使用的哈希函数。 |
| **use-peer-dns** (*yes \| no \| exclusively*；默认：**no** ) | 使用对端 DNS。 |
| **copy-from** | 复制已创建的 peer。 |
| **src-address** | 指定源地址。 |
| **l2tpv3-circuit-id** | 设置虚拟电路标识符，以绑定 L2TPv3 控制通道的一端。 |
| **ipsec-secret** (*string*；默认：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 启用 use-ipsec 时使用的预共享密钥。 |

## L2TP 服务器 {#l2tp-server}

系统会为连接到指定服务器的每个隧道创建一个接口。L2TP 服务器配置中有两种接口类型：

- 静态接口由管理员添加，用于需要引用为特定用户创建的特定接口名称的场景（例如防火墙规则或其他位置）。
- 当用户连接且其用户名不匹配任何现有静态条目时，动态接口会自动添加到此列表中（或者在该条目已处于活动状态时，因为不能有两个由同一名称引用的独立隧道接口）。

动态接口在用户连接时出现，并在用户断开连接后消失，因此无法在路由器配置中引用为该用户创建的隧道（例如，在防火墙中）。如果需要针对该用户的持久规则，请为其创建静态条目。否则，使用动态配置即可。

:::warning
在这两种情况下，PPP 用户都必须正确配置——静态条目不能替代 PPP 配置。
:::

### 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **authentication** (*pap \| chap \| mschap1 \| mschap2*；默认值：**mschap1,mschap2**) | 服务器接受的认证方法。 |
| **default-profile** (*name*；默认值：**default-encryption**) | 要使用的默认 profile。 |
| **enabled** (*yes \| no*；默认值：**no**) | 指定是否启用 L2TP 服务器。 |
| **max-mru** (*integer*；默认值：**1450**) | 最大接收单元。L2TP 接口在不进行数据包分片的情况下能够接收的最大数据包大小。 |
| **keepalive-timeout** (*integer*；默认值：**30**) | 如果服务器在 keepalive-timeout 期间未收到任何数据包，它将每秒发送一次 keepalive 数据包，共五次。如果服务器仍未收到客户端的任何响应，则客户端将在 5 秒后断开连接。日志将显示 5 次“LCP missed echo reply”消息，然后断开连接。 |
| **max-mtu** (*integer*；默认值：**1450**) | 最大传输单元。L2TP 接口在不进行数据包分片的情况下能够发送的最大数据包大小。 |
| **use-ipsec** (*no \| yes \| require*；默认值：**no**) | 启用此选项时，将添加动态 IPSec peer 配置，以适配大多数 L2TP road-warrior 设置。选择 require 时，服务器将仅接受封装在 IPSec 隧道中的 L2TP 连接尝试。 |
| **ipsec-secret** (*string*；默认值：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 启用 use-ipsec 时使用的预共享密钥 |
| **accept-proto-version** ( all *\|* l2tpv2 *\|* l2tpv3；默认值：**all** ) cli-only | 指定协议版本。 |
| **accept-pseudowire-type** ( all *\|* ether *\|* ppp；默认值：**all** ) | 为特定 pseudowire 类型设置 pseudowire 信令协议。 |
| **allow-fast-path** (*no \| yes*；默认值：**no** ) | 在 Linux 内核中不进行额外处理而直接转发数据包。 |
| **caller-id-type** ( ip-address *\|* number；默认值：**ip-address**) | 如果多个客户端使用相同的源 IP 地址，请将 id 类型设置为 number。 |
| **max-sessions** ( unlimited / number；默认值：**unlimited** ) | 设置所需会话数。 |
| **one-session-per-host**( *no \| yes*；默认值：**no** ) | 允许每台主机一个会话。 |
| **l2tpv3-circuit-id** (默认值：) | 设置虚拟电路标识符，以绑定 L2TPv3 控制通道的一端。 |
| **l2tpv3-cookie-length** (0 *\|* 4-bytes *\|* 8-bytes；默认值：**0** ) | 配置 L2TP pseudowire 静态会话 cookie。 |
| **l2tpv3-digest-hash** ( md5 *\|* none *\|* sha1；默认值：**md5** ) | 指定要使用的哈希函数。 |
| **l2tpv3-ether-interface-list** (默认值：) | 设置接口列表，例如默认列表：all、dynamic、none、static。 |
| **mrru** (*disabled \| integer*；默认值：**disabled**) | 链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，它将被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或 Ethernet 数据包。 |

## 快速示例 {#quick-example}

![](/img/f2cf148d94cfeff8.webp)

### L2TP 服务器 {#l2tp-server-1}

在服务器端，启用 L2TP-server 并为特定用户创建 PPP profile：

```ros
[admin@MikroTik] > /interface/l2tp-server/server/set enabled=yes
[admin@MikroTik] > /ppp/secret/add local-address=10.0.0.2 name=MT-User password=StrongPass profile=default-encryption remote-address=10.0.0.1 service=l2tp
```

### L2TP 客户端 {#l2tp-client-1}

RouterOS 中的 L2TP 客户端设置非常简单。在以下示例中，已有预配置的 3 unit setup。下面将详细介绍如何使用用户名“MT-User”、密码“StrongPass”和服务器 192.168.51.3 设置 L2TP 客户端：

```ros
[admin@MikroTik] > /interface/l2tp-client \
add connect-to=192.168.51.3 disabled=no name=MT-User password=StrongPass user=MT-User
[admin@MikroTik] > /interface/l2tp-client/print 
Flags: X - disabled, R - running 
0 R name="MT-User" max-mtu=1450 max-mru=1450 mrru=disabled connect-to=192.168.51.3 user="MT-User" 
password="StrongPass" profile=default-encryption keepalive-timeout=60 use-ipsec=no ipsec-secret="" 
allow-fast-path=no add-default-route=no dial-on-demand=no allow=pap,chap,mschap1,mschap2
```

## L2TP 以太 {#l2tp-ether}

## 概述 {#overview}

Layer 2 Tunnel Protocol Version 3（L2TPv3）由互联网工程任务组（IETF）的 [RFC 3931](https://tools.ietf.org/html/rfc3931) 定义。它对原始 L2TP 引入了多项改进，允许在 L2TP 中封装 Layer 2（L2）载荷。更准确地说，L2TPv3 规定了使用 L2 虚拟专用网络（VPN）通过 IP 核心网络隧道传输 Layer 2 载荷的协议。

要建立 **L2TP Ether** 隧道，必须在 **客户端侧** 创建 **L2TP Ether 接口**，同时在 **远程（服务器）侧** 启用 **L2TP 服务器**。两端正确配置后，系统会自动在它们之间创建一个 **动态接口**，从而形成跨 IP 网络的透明 Layer 2 连接。

---

##### **服务器端（L2TP 服务器）** {#server-side-l2tp-server}

`/interface/l2tp-server/server/set enabled=yes`

##### **客户端侧（L2TP Ether 接口）** {#client-side-l2tp-ether-interface}

`/interface/l2tp-ether/add` connect-to=1.1.1.1 disabled=no

## 属性 {#properties-2}

| 属性 | 说明 |
| :-- | :-- |
| **connect-to** ( *IP*; Default: ) | L2TP 服务器的远程地址。 <br/> |
| **comment** ( *string*; Default: ) | 隧道的简短描述。 |
| **disabled** ( *yes \| no*; Default: **yes**) | 启用或禁用隧道。 |
| **mac-address** ( string; Default: **auto**) | 设置接口的 MAC 地址。 |
| **unmanaged-mode** ( *yes \| no*; Default: **no**) | 启用非托管模式。将可以配置其他设置，例如：**peer-cookie、send-cookie、local-tunnel-id、local-session-id、remote-tunnel-id、remote-session-id、local-address。** |
| **local-tunnel-id ( string; Default: disabled)** | 设置 local-tunnel-id 的值；需要整数。 |
| **local-session-id ( string; Default: disabled)** | 设置 local-session-id 的值；需要整数。 |
| **remote-tunnel-id (** string; Default: **disabled)** | 设置 remote-tunnel-id 的值；需要整数。 |
| **remote-session-id (** string; Default: **disabled)** | 设置 remote-session-id 的值；需要整数。 |
| **peer-cookie (** string; Default: **disabled)** | 设置可选的 peer cookie。要启用 cookie，请输入远程 cookie 值（应为 8 或 16 个字符的十六进制字符串值）；要禁用，请留空。 |
| **send-cookie (** string; Default: **disabled)** | 设置可选的 cookie。要启用 cookie，请输入远程 cookie 值（应为 8 或 16 个字符的十六进制字符串值）；要禁用，请留空。 |
| **mtu** (*auto*; Default: **1420**) | 最大传输单元。L2TP 接口无需数据包分片即可发送的最大数据包大小。 |
| **name** (*string*; Default: ) | 接口的描述性名称。 |
| **local-address** (*IP address*; Default: ) | 为 **unmanaged** 模式设置本地地址。 |
| **use-ipsec** (*yes \| no*; Default: **no**) | 启用此选项时，会添加动态 IPSec peer 配置和策略，以将 L2TP 连接封装到 IPSec 隧道中。 |
| **allow-fast-path** (*yes \| no*; Default: **no** ) | 允许在 Linux 内核中不经过额外处理直接转发数据包。 |
| **l2tp-proto-version** ( *l2tpv3-ip \| l2tpv3-udp* ; Default: ***l2tpv3-udp***) | 指定协议版本。 |
| **cookie-length** ( 0 *\| 4-bytes \| 8-bytes* ; Default:  **0** ) | 配置 L2TPv3 伪线静态会话 cookie。 |
| **digest-hash** (*md5 \| none \| sha1* ; Default: **md5** ) | 指定要使用的哈希函数。 |
| **use-l2-specific-sublayer** ( *yes \| no*; Default: **no**) | 启用 L2TPv3 以太网伪线的第 2 层默认子层。 |
| **circuit-id** | 设置虚拟电路标识符，以绑定 L2TPv3 控制通道的一端。该值用作每条冗余伪线的标识符。 |
| **ipsec-secret** (*string*; Default: ) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 启用 use-ipsec 时使用的预共享密钥。 |
