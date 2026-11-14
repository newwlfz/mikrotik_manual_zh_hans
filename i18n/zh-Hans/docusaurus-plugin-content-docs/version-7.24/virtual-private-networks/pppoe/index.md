---
sidebar_key: "virtual-private-networks/pppoe/index"
sidebar_position: 2
title: "PPPoE"
sidebar_label: "PPPoE"
description: "PPPoE 支持通过 PPP 和 MLPPP 跨以太网链路进行 IPv6 前缀委派，同时支持客户端到服务器和服务器到客户端两种配置。它分发现阶段和会话阶段运行，使用 LCP/CHAP 身份验证，并通过 IPCP 分配 IP 地址。MTU 相关考量可确保正确封装，而身份验证方法和按需拨号等客户端属性则增强了灵活性。"
tags:
  - 'pppoe'
  - 'discovery-phase'
  - 'mtu'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/pppoe
captured_at: '2026-11-04T11:34:45+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 PPPoE 示例。可使用这些示例通过 PPP 配置 IPv6 前缀委派，以及通过一条或多条链路配置 MLPPP。

<DocCardList />

以太网点对点（PPPoE）只是一种将 PPP 报文封装到以太网帧中的方法。PPPoE 是标准点对点协议（PPP）的扩展，也是 PPPoA 的后续协议。PPPoE 标准定义于 [RFC 2516](https://tools.ietf.org/html/rfc2516)。PPPoE 客户端和服务器可在路由器上的任意 Layer2 Ethernet 层接口上工作，例如 Wireless、Ethernet、EoIP 等。一般来说，PPPoE 用于根据用户名（以及如果需要，根据工作站）认证向客户端分配 IP 地址，而不是仅使用工作站认证并使用静态 IP 地址或 DHCP。出于显而易见的安全原因，建议不要在与 PPPoE 相同的接口上使用静态 IP 地址或 DHCP。

## 简介 {#introduction}

PPPoE 能够通过简单的桥接接入设备将一组主机连接到远程接入集中器。

支持的连接：

- MikroTik RouterOS PPPoE 客户端连接到任意 PPPoE 服务器。
- MikroTik RouterOS 服务器（接入集中器）连接到多个 PPPoE 客户端（客户端几乎适用于所有操作系统和大多数路由器）。

## PPPoE 工作过程 {#pppoe-operation}

PPPoE 有两个不同的阶段：

1. 发现阶段。
2. 会话阶段。

### 发现阶段 {#discovery-phase}

发现阶段有四个步骤。当该阶段完成时，双方都知道 PPPoE *SESSION\_ID* 和对端的 Ethernet 地址，这两者共同唯一标识该 PPPoE 会话：

1. **PPPoE Active Discovery Initialization (PADI) -** PPPoE 客户端向广播地址发送 *PADI* 报文。如果在 PPPoE 客户端的拨号网络属性中输入了服务名称，此报文还可以填充 "service-name" 字段。如果未输入服务名称，则不会填充此字段。
2. **PPPoE Active Discovery Offer (PADO) -** 如果接入集中器能够处理 *PADI* 报文中列出的 "service-name" 字段，则 PPPoE 服务器或接入集中器应使用 *PADO* 响应 *PADI*。如果未列出 "service-name" 字段，接入集中器将使用 *PADO* 报文进行响应，并将 "service-name" 字段填充为接入集中器可提供的服务名称。*PADO* 报文会发送到 PPPoE 客户端的单播地址。
3. **PPPoE Active Discovery Request (PADR) -** 当收到 *PADO* 报文时，PPPoE 客户端使用 *PADR* 报文进行响应。此报文会发送到接入集中器的单播地址。客户端可能收到多个 *PADO* 报文，但客户端会响应其收到的第一个有效 *PADO*。如果初始 *PADI* 报文的 "service-name" 字段为空，客户端会用 *PADO* 报文中返回的第一个服务名称填充 *PADR* 报文的 "service-name" 字段。
4. **PPPoE Active Discovery Session Confirmation (PADS) -** 当收到 *PADR* 时，接入集中器会为点对点协议（PPP）会话生成唯一的会话标识（ID），并在 *PADS* 报文中将此 ID 返回给 PPPoE 客户端。此报文会发送到客户端的单播地址。

### PPPoE 会话终止 {#pppoe-session-termination}

- **PPPoE Active Discovery Terminate (PADT) -** 可在会话建立后的任意时间发送，以表示 PPPoE 会话已终止。服务器或客户端均可发送。

### 会话阶段 {#session-phase}

当发现阶段完成后，双方都知道 *PPPoE Session ID* 和对端的 *Ethernet（MAC）地址*，这两者共同定义该 PPPoE 会话。PPP 帧被封装在 PPPoE 会话帧中，这些帧的 Ethernet 帧类型为 **0x8864**。
当服务器发送确认且客户端收到确认后，PPP 会话启动，包括以下阶段：

1. **LCP 协商**阶段。
2. **认证（CHAP/PAP）**阶段。
3. **IPCP 协商**阶段 - 在此阶段为客户端分配 IP 地址。

:::warning
如果任一过程失败，将重新开始 LCP 协商建立阶段。
:::

PPPoE 服务器向客户端发送 *Echo-Request* 报文以确定会话状态，否则，在客户端未发送 *Terminate-Request* 报文就终止会话的情况下，服务器将无法确定会话已终止。

## MTU {#mtu}

通常，可在不分片的情况下传输的最大 Ethernet 帧为 1500 字节。PPPoE 又增加了 6 字节开销，PPP 字段再增加两字节，因此为 IP 数据报留下 1492 字节。因此，PPPoE 的最大 MRU 和 MTU 值不得大于 1492。

TCP 栈会尽量避免分片，因此使用 MSS（最大报文段大小）。默认情况下，MSS 取为出接口的 MTU 减去 TCP 和 IP 头部的通常大小（40 字节），对于 Ethernet 接口，结果为 1460 字节。不幸的是，可能存在 MTU 较低的中间链路，这会导致分片。在这种情况下，TCP 栈会执行路径 MTU 发现。无法在不分片的情况下转发数据报的路由器应丢弃该报文，并向源主机发送 *ICMP-Fragmentation-Required*。当主机收到这样的 ICMP 报文时，会尝试降低 MTU。这在理想情况下应该可行；然而在现实环境中，许多路由器不会生成要求分片的数据报；此外，许多防火墙会丢弃所有 ICMP 数据报。

解决此问题的方法是在 MSS 过大时[调整 MSS](../../firewall-and-quality-of-service/firewall/mangle.md#change-mss)。

## PPPoE 客户端 {#pppoe-client}

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **ac-name** (*string*; Default: **""**) | 接入集中器名称；可留空，此时客户端将连接到广播域中的任意接入集中器 |
| **add-default-route** (*yes\|no*; Default: **no**) | 启用/禁用是否自动添加默认路由 |
| **allow** (*mschap2\|mschap1\|chap\|pap*; Default: **mschap2,mschap1,chap,pap**) | 允许的认证方法，默认允许所有方法 |
| **default-route-distance** (*byte [0..255]*; Default:**1**) | 设置应用于自动创建默认路由的 distance 值，前提是同时选择了 add-default-route |
| **dial-on-demand** (*yes\|no*; Default: **no**) | 仅在有出站流量时连接到 AC。如果选中，则在连接尚未建立时，将添加网关地址来自 10.112.112.0/24 网络的路由。 |
| **interface** (*string*; Default: ) | 客户端将在其上运行的接口名称 |
| **keepalive-timeout** (*integer*; Default:**10**) | 设置 keepalive 超时时间（秒）。 |
| **max-mru** (*integer*; Default: **1492**) | 最大接收单元 |
| **max-mtu** (*integer*; Default: **1492**) | 最大传输单元 |
| **mrru** (*integer: 512..65535\|disabled*; Default: **disabled**) | 链路上可接收的最大报文大小。如果报文大于隧道 MTU，它将被拆分为多个报文，从而允许通过隧道发送完整大小的 IP 或 Ethernet 报文。 |
| **name** (*string*; Default: **pppoe-out[i]**) | PPPoE 接口名称；如果未指定，则由 RouterOS 生成 |
| **password** (*string*; Default: ) *[sensitive](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于认证的密码 |
| **profile** (*string*; Default: **default**) | 指定建立隧道时将使用的 PPP 配置文件。 |
| **service-name** (*string*; Default: **""**) | 指定接入集中器上设置的服务名称；可留空以连接到任意 PPPoE 服务器 |
| **use-peer-dns** (*yes\|no*; Default: **no**) | 启用/禁用从对端获取 DNS 设置 |
| **user** (*string*; Default: **""**) | 用于认证的用户名 |

### 状态 {#status}

命令 `/interface/pppoe-client/monitor` 将显示当前 PPPoE 状态。

可用的只读属性：

| 属性 | 描述 |
| :-- | :-- |
| **ac-mac** (*MAC address*) | 客户端所连接接入集中器（AC）的 MAC 地址 |
| **ac-name** (*string*) | 接入集中器的名称 |
| **active-links** (*integer*) | 绑定的 MLPPP 连接数（未使用 MLPPP 时为 '1'） |
| **encoding** (*string*) | 此连接使用的加密和编码（如果不对称，则用 '/' 分隔） |
| **local-address** (*IP Address*) | 分配给客户端的 IP 地址 |
| **remote-address** (*IP Address*) | 分配给服务器的远程 IP 地址（即网关地址） |
| **mru** (*integer*) | 链路的有效 MRU |
| **mtu** (*integer*) | 链路的有效 MTU |
| **service-name** (*string*) | 使用的服务名称 |
| **status** (*string*) | 当前链路状态。可用值包括：dialing、verifying password...、connected、disconnected。 |
| **uptime** (*time*) | 连接时间，以天、小时、分钟和秒显示 |

### 扫描器 {#scanner}

PPPoE 扫描器允许扫描 layer2 广播域中的所有活动 PPPoE 服务器。运行扫描器的命令如下：

```ros
/interface/pppoe-client/scan [interface]
```

#### 可用的只读属性 {#available-read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **service** (*string*) | 服务器上配置的服务名称 |
| **mac-address** (*MAC*) | 检测到的服务器的 MAC 地址 |
| **ac-name** (*string*) | 接入集中器的名称 |

:::warning
对于 Windows，某些连接说明可能使用这样的形式：指定“电话号码”，例如 "MikroTik\_AC\mt1"，以表示 "MikroTik\_AC" 是接入集中器名称，"mt1" 是服务名称。

**警告：** 指定 MRRU 意味着在单条链路上启用 MP（Multilink PPP）。此协议用于将大报文拆分为较小报文。在 Windows 中，可在网络选项卡的设置按钮中启用“为单链路连接协商多链路”。在 Windows 上，MRRU 硬编码为 1614。此设置有助于克服 PathMTU 发现失败。应在双方对端上都启用 MP 设置。
:::

## PPPoE 服务器 {#pppoe-server}

PPPoE 服务器配置中有两类接口（隧道）项——静态用户和动态连接。为每个建立到给定服务器的隧道创建一个接口。如果需要引用为特定用户创建的特定接口名称（在防火墙规则或其他位置），则会以管理方式添加静态接口。每当用户连接且其用户名不匹配任何现有静态条目时，动态接口会自动添加到此列表（或者如果该条目已处于活动状态，因为不能有两个单独的隧道接口使用同一名称引用——如果这是个问题，请设置 *one-session-per-host* 值）。动态接口在用户连接时出现，并在用户断开后消失，因此无法在路由器配置中（例如在防火墙中）引用为该用户创建的隧道，所以如果你需要为该用户设置持久规则，请为其创建静态条目。否则，使用动态配置是安全的。

:::warning
无论哪种情况，都必须正确配置 PPP 用户——静态条目不能替代 PPP 配置。
:::

### 接入集中器 {#access-concentrator}

**子菜单：** `/interface/pppoe-server/server`

#### 属性 {#properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **accept-untagged** (*yes \| no*; Default: **yes**) | 当指定了 `pppoe-over-vlan-range` 时，此设置控制 PPPoE 服务器是否会在其接口上接受未打标签（非 VLAN）的 PPPoE 报文。默认情况下，未打标签的 PPPoE 报文会被接受。如果你使用 `pppoe-over-vlan-range` 属性（该属性启用基于 802.1Q VLAN 的 PPPoE），此选项可让你决定是否仍允许同一接口上的未打标签客户端。如果你不使用 `pppoe-over-vlan-range`，此设置没有任何效果。 |
| **authentication** ( *mschap2 \| mschap1 \| chap \| pap*; Default: **"mschap2, mschap1, chap, pap"**) | 认证算法。 |
| **default-profile** (*string*; 默认值： **"default"**) |  |
| **interface** (*string*; Default: **""**) | 客户端所连接的接口。 |
| **keepalive-timeout** (*time*; Default: **"10", or disabled**) | 定义时间段（以秒为单位），超过该时间后，路由器开始每秒发送 keepalive 报文。如果在该时间段内（即 2 \* keepalive-timeout）没有流量且未收到 keepalive 响应，则无响应的客户端被判定为断开。**重要：** 在 LCP 握手成功后，客户端会发送 LCP echo 报文以验证 MTU 转发；如果未收到回复，则回退到备用 MTU 1480。新选项 `keepalive-timeout=disabled` 会禁用发送 echo 报文，从而有效关闭 MTU 测试。     |
| **max-mru** (*integer*; Default: **1480**) | 最大接收单元。最佳值是隧道所运行接口的 MTU 减去 20（因此，对于 1500 字节的 Ethernet 链路，将 MTU 设置为 1480 以避免报文分片） |
| **max-mtu** (*integer*; Default: **1480**) | 最大传输单元。最佳值是隧道所运行接口的 MTU 减去 20（因此，对于 1500 字节的 Ethernet 链路，将 MTU 设置为 1480 以避免报文分片） |
| **max-sessions** (*integer*; Default: **"0"**) | AC 可服务的最大客户端数。'0' = 无限制。 |
| **mrru** (*integer: 512..65535 \| disabled*; Default: **"disabled"**) | 链路上可接收的最大报文大小。如果报文大于隧道 MTU，它将被拆分为多个报文，从而允许通过隧道发送完整大小的 IP 或 Ethernet 报文。 |
| **one-session-per-host** (*yes \| no*; Default: **"no"**) | 每个主机仅允许一个会话（由 MAC 地址确定）。如果主机尝试建立新会话，旧会话将被关闭。 |
| **pppoe-over-vlan-range** (*integer 1..4094*; Default: "") | 此设置允许 PPPoE 服务器在 802.1Q VLAN 上运行。默认情况下，PPPoE 服务器只接受其接口上的未打标签报文。但是，在客户端位于不同 VLAN 的场景中，无需创建多个 802.1Q VLAN 接口并将它们桥接在一起，也无需为每个 VLAN 配置单独的 PPPoE 服务器，你可以直接在 PPPoE 服务器设置中指定所需的 VLAN。指定 VLAN ID 后，PPPoE 服务器将接受来自客户端的 802.1Q 带标签报文，并使用同一 VLAN 进行回复。然后，你可以使用 `accept-untagged` 属性选择在同一接口上接受还是丢弃未打标签的 PPPoE 客户端。你甚至可以在 [VLAN 接口](../../bridging-and-switching/vlan.md) 上使用 `pppoe-over-vlan-range` 设置配置 PPPoE 服务器，从而也支持 QinQ 部署。但请记住，内层 VLAN 标签应为 802.1Q。该设置支持 VLAN ID 范围，也支持使用逗号分隔值指定的单个 VLAN。例如：pppoe-over-vlan-range=100-115,120,122,128-130。**注意：** 避免在接口上配置带有 `pppoe-over-vlan-range` 的服务器，同时又创建 VLAN ID 落在该范围内的 VLAN 接口。例如：  `/interface/vlan``add interface=ether2 name=vlan15 vlan-id=15``/interface/pppoe-server/server``add disabled=no interface=ether2 pppoe-over-vlan-range=10-20`  如果你需要这种设置，请从 `pppoe-over-vlan-range` 中移除重叠的 VLAN ID，并直接在 VLAN 接口上创建单独的 PPPoE 服务器实例，如下所示：  `/interface/vlan``add interface=ether2 name=vlan15 vlan-id=15``/interface/pppoe-server/server``add disabled=no interface=ether2 pppoe-over-vlan-range=10-14,16-20``add disabled=no interface=vlan15`    |
| **service-name** (*string*; Default: **""**) | PPPoE 服务名称。服务器将接受发送的 PADI 报文中服务名称与此设置匹配的客户端，或者 PADI 报文中的 service-name 字段未设置的客户端。 |

PPPoE 服务器（接入集中器）支持为每个接口配置多个服务器——使用不同的服务名称。客户端使用接入集中器名称和 PPPoE 服务名称来标识要注册的接入集中器。接入集中器名称与命令提示符前显示的路由器身份相同。身份可以在 *`/system/identity`* 子菜单中设置。

:::danger
不要为接收 PPPoE 请求的接口分配 IP 地址。
:::

指定 MRRU 意味着在单条链路上启用 MP（Multilink PPP）。此协议用于将大报文拆分为较小报文。MRRU 硬编码为 1614。此设置有助于克服 PathMTU 发现失败。应在双方对端上都启用 MP 设置。

:::warning
默认的 *keepalive-timeout* 值 10s 在大多数情况下没问题。如果将其设置为 0，路由器将不会断开客户端，直到客户端显式注销或路由器重启。要解决此问题，可以使用 one-session-per-host 属性。
:::

## 快速示例 {#quick-example}

![](/img/a34ca577e7a80a70.jpg)

### PPPoE 客户端 {#pppoe-client-1}

要将 MikroTik RouterOS 配置为 PPPoE 客户端，只需按示例添加一个 PPPoE 客户端并设置以下参数：

```ros
[admin@MikroTik] > interface pppoe-client add interface=ether2 password=StrongPass service-name=pppoeservice name=PPPoE-Out disabled=no user=MT-User
[admin@MikroTik] > interface pppoe-client print
Flags: X - disabled, I - invalid, R - running 
 0  R name="PPPoE-Out" max-mtu=auto max-mru=auto mrru=disabled interface=ether2 user="MT-User" 
      password="StrongPass" profile=default keepalive-timeout=10 service-name="pppoeservice" ac-name="" 
      add-default-route=no dial-on-demand=no use-peer-dns=no allow=pap,chap,mschap1,mschap2
```

### PPPoE 服务器 {#pppoe-server-1}

要将 MikroTik RouterOS 配置为接入集中器（PPPoE 服务器）：

- 为客户端添加 IP 地址池，范围为 10.0.0.2-10.0.0.5。
- 添加 PPP 配置文件。
- 添加 PPP secret（用户名/密码）。
- 添加 PPPoE 服务器本身。

```ros
[admin@MikroTik] > /ip/pool
add name=pppoe-pool ranges=10.0.0.2-10.0.0.5
[admin@MikroTik] > /ppp/profile
add local-address=10.0.0.1 name=for-pppoe remote-address=pppoe-pool
[admin@MikroTik] > /ppp/secret
add name=MT-User password=StrongPass profile=for-pppoe service=pppoe
[admin@MikroTik] > /interface/pppoe-server/server
add default-profile=for-pppoe disabled=no interface=ether3 service-name=pppoeservice
```

## 说明 {#notes}

不建议在一台设备上使用大量 PPPoE 客户端。
