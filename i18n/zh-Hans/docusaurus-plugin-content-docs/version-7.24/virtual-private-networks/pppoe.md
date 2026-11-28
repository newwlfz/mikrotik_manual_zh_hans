---
title: "PPPoE"
description: "PPPoE 支持通过 PPP 和 MLPPP 在以太网链路上进行 IPv6 前缀委派，支持客户端到服务器和服务器到客户端的配置。它在发现阶段和会话阶段运行，使用 LCP/CHAP 进行身份验证，并使用 IPCP 分配 IP 地址。MTU 相关注意事项可确保正确封装，而身份验证方法和按需拨号等客户端属性则提高了灵活性。"
tags:
  - 'pppoe'
  - 'discovery-phase'
  - 'mtu'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/pppoe
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍 PPPoE 示例。可使用它配置通过 PPP 实现的 IPv6 前缀委派，以及通过一条或多条链路实现的 MLPPP。

<DocCardList />

Point to Point over Ethernet（PPPoE）是一种将 PPP 数据包封装到以太网帧中的方法。PPPoE 是标准 Point to Point Protocol（PPP）的扩展，也是 PPPoA 的后继协议。PPPoE 标准定义于 [RFC 2516](https://tools.ietf.org/html/rfc2516)。PPPoE 客户端和服务器可在路由器上的任意 Layer2 以太网级接口上运行，例如 Wireless、Ethernet、EoIP 等。一般而言，PPPoE 用于基于用户名认证（如果需要，也可基于工作站认证）向客户端分配 IP 地址，而不是在使用静态 IP 地址或 DHCP 时仅基于工作站认证。出于明显的安全原因，建议不要在与 PPPoE 相同的接口上使用静态 IP 地址或 DHCP。

## 简介 {#introduction}

PPPoE 支持通过简单的桥接接入设备将主机网络连接至远程接入集中器。

支持的连接：

- MikroTik RouterOS PPPoE 客户端连接任意 PPPoE 服务器。
- MikroTik RouterOS 服务器（接入集中器）连接多个 PPPoE 客户端（客户端几乎适用于所有操作系统和大多数路由器）。

## PPPoE 工作原理 {#pppoe-operation}

PPPoE 有两个不同的阶段（phase）：

1. Discovery 阶段。
2. Session 阶段。

### Discovery 阶段 {#discovery-phase}

Discovery 阶段包含四个步骤。完成后，双方均已知晓 PPPoE *SESSION\_ID* 和对端的以太网地址，二者共同唯一标识 PPPoE 会话：

1. **PPPoE Active Discovery Initialization (PADI) -**PPPoE 客户端向广播地址发送 *PADI* 数据包。如果在 PPPoE 客户端的拨号网络属性中输入了服务名称，该数据包也可以填充“service-name”字段。如果未输入服务名称，则该字段不填充。
2. **PPPoE Active Discovery Offer (PADO) -**如果 Access Concentrator 能够处理 *PADI* 数据包中列出的“service-name”字段，PPPoE 服务器或 Access Concentrator 应使用 *PADO* 响应 *PADI*。如果未列出“service-name”字段，Access Concentrator 将使用 *PADO* 数据包响应，并在“service-name”字段中填充 Access Concentrator 可以处理的服务名称。*PADO* 数据包发送到 PPPoE 客户端的单播地址。
3. **PPPoE Active Discovery Request (PADR) -**收到 *PADO* 数据包后，PPPoE 客户端使用 *PADR* 数据包响应。该数据包发送到 Access Concentrator 的单播地址。客户端可能收到多个 *PADO* 数据包，但客户端会响应其收到的第一个有效 *PADO*。如果初始 *PADI* 数据包的“service-name”字段为空，客户端会使用 *PADO* 数据包中返回的第一个服务名称填充 *PADR* 数据包的“service-name”字段。
4. **PPPoE Active Discovery Session Confirmation (PADS) -**收到 *PADR* 后，Access Concentrator 为 Point-to-Point Protocol (PPP) 会话生成唯一的会话标识 (ID)，并在 *PADS* 数据包中将该 ID 返回给 PPPoE 客户端。该数据包发送到客户端的单播地址。

### PPPoE 会话终止 {#pppoe-session-termination}

- **PPPoE Active Discovery Terminate (PADT) -** 可在会话建立后的任意时间发送，用于指示 PPPoE 会话已终止。服务器或客户端均可发送该数据包。

### 会话阶段 {#session-phase}

发现阶段完成后，双方均已知晓 *PPPoE Session ID* 和对端的 *Ethernet (MAC) address*，二者共同定义 PPPoE 会话。PPP 帧封装在 PPPoE 会话帧中，此类帧的 Ethernet 帧类型为 **0x8864**。
当服务器发送确认且客户端收到确认后，PPP 会话启动，该会话包含以下阶段：

1. **LCP negotiation** 阶段。
2. **Authentication (CHAP/PAP)** 阶段。
3. **IPCP negotiation** 阶段 - 在该阶段为客户端分配 IP 地址。

:::warning
如果任一过程失败，将重新开始 LCP negotiation 建立阶段。
:::

PPPoE 服务器向客户端发送 *Echo-Request* 数据包以确定会话状态，否则，当客户端未发送 *Terminate-Request* 数据包而终止会话时，服务器将无法确定会话已终止。

## MTU

通常，无需分片即可传输的最大以太网帧为 1500 字节。PPPoE 增加 6 字节开销，PPP 字段再增加 2 字节，因此 IP 数据报剩余 1492 字节。所以 PPPoE 的最大 MRU 和 MTU 值不得大于 1492。

TCP 协议栈会尽量避免分片，因此使用 MSS（Maximum Segment Size）。默认情况下，MSS 选择为出站接口的 MTU 减去 TCP 和 IP 头的常见大小（40 字节），对于以太网接口结果为 1460 字节。遗憾的是，中间链路的 MTU 可能更小，从而导致分片。在这种情况下，TCP 协议栈会执行路径 MTU 发现。无法在不分片的情况下转发数据报的路由器应丢弃数据包，并向源主机发送 *ICMP-Fragmentation-Required*。当主机收到此类 ICMP 数据包时，会尝试降低 MTU。这在理想情况下应当有效；然而，在现实环境中，许多路由器不会生成要求分片的数据报；此外，许多防火墙会丢弃所有 ICMP 数据报。

此问题的解决方法是，当 MSS 过大时[调整 MSS](/docs/firewall-and-quality-of-service/firewall/mangle#change-mss)。

## PPPoE 客户端 {#pppoe-client}

### 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **ac-name** (*string*; Default: **""**) | Access Concentrator 名称，可以留空，客户端将连接到广播域中的任意 access concentrator |
| **add-default-route** (*yes\|no*; Default: **no**) | 启用或禁用自动添加默认路由 |
| **allow** (*mschap2\|mschap1\|chap\|pap*; Default: **mschap2,mschap1,chap,pap**) | 允许的认证方法，默认允许所有方法 |
| **default-route-distance** (*byte [0..255]*; Default:**1**) | 设置自动创建的默认路由所使用的 distance 值，前提是同时选择了 add-default-route |
| **dial-on-demand** (*yes\|no*; Default: **no**) | 仅在产生出站流量时连接到 AC。如果选择该项，则在连接未建立期间添加网关地址来自 10.112.112.0/24 网络的路由。 |
| **interface** (*string*; Default: ) | 客户端运行所在的接口名称 |
| **keepalive-timeout** (*integer*; Default:**10**) | 设置 keepalive 超时时间，单位为秒。 |
| **max-mru** (*integer*; Default: **1492**) | 最大接收单元 |
| **max-mtu** (*integer*; Default: **1492**) | 最大传输单元 |
| **mrru** (*integer: 512..65535\|disabled*; Default: **disabled**) | 链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，将被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或 Ethernet 数据包。 |
| **name** (*string*; Default: **pppoe-out[i]**) | PPPoE 接口名称，如果未指定，则由 RouterOS 生成 |
| **password** (*string*; Default: ) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于认证的密码 |
| **profile** (*string*; Default: **default**) | 指定建立隧道时使用的 PPP profile 配置。 |
| **service-name** (*string*; Default: **""**) | 指定 access concentrator 上设置的 service name，可以留空以连接到任意 PPPoE 服务器 |
| **use-peer-dns** (*yes\|no*; Default: **no**) | 启用或禁用从对端获取 DNS 设置 |
| **user** (*string*; Default: **""**) | 用于认证的用户名 |

### 状态 {#status}

命令 `/interface/pppoe-client/monitor` 将显示当前 PPPoE 状态。

可用的只读属性：

| 属性 | 说明 |
| :-- | :-- |
| **ac-mac** (*MAC address*) | 客户端所连接的 access concentrator（AC）的 MAC 地址 |
| **ac-name** (*string*) | Access Concentrator 的名称 |
| **active-links** (*integer*) | 绑定的 MLPPP 连接数（未使用 MLPPP 时为“1”） |
| **encoding** (*string*) | 此连接使用的加密和编码方式（如果不对称，则以“/”分隔） |
| **local-address** (*IP Address*) | 分配给客户端的 IP 地址 |
| **remote-address** (*IP Address*) | 分配给服务器的远端 IP 地址（即网关地址） |
| **mru** (*integer*) | 链路的有效 MRU |
| **mtu** (*integer*) | 链路的有效 MTU |
| **service-name** (*string*) | 使用的 service name |
| **status** (*string*) | 当前链路状态。可用值为：<ul class="bullets"><li>dialing，</li><li>verifying password...，</li><li>connected，</li><li>disconnected。</li></ul> |
| **uptime** (*time*) | 连接时间，以天、小时、分钟和秒显示 |

### Scanner

PPPoE Scanner 可扫描 layer2 广播域中所有活动的 PPPoE 服务器。运行扫描器的命令如下：

```ros
/interface/pppoe-client/scan [interface]
```

#### 可用的只读属性 {#available-read-only-properties}

| 属性 | 说明 |
| :-- | :-- |
| **service** (*string*) | 服务器上配置的 service name |
| **mac-address** (*MAC*) | 检测到的服务器的 MAC 地址 |
| **ac-name** (*string*) | Access Concentrator 的名称 |

:::warning
对于 Windows，某些连接说明可能使用如下形式：指定“电话号码”，例如“MikroTik\_AC\mt1”，以表示“MikroTik\_AC”是接入集中器名称，“mt1”是服务名称。

**警告：** 指定 MRRU 表示在单条链路上启用 MP（Multilink PPP）。该协议用于将大数据包拆分为较小的数据包。在 Windows 下，可在“网络”选项卡的“设置”按钮中启用“Negotiate multi-link for single link connections”。Windows 中 MRRU 硬编码为 1614。该设置有助于克服 PathMTU 发现失败的问题。MP 设置应在两端对等体上启用。
:::

## PPPoE 服务器 {#pppoe-server}

PPPoE server 配置中有两类接口（隧道）项 - 静态用户和动态连接。每当与指定服务器建立隧道时，都会创建一个接口。如果需要引用为特定用户创建的特定接口名称（在防火墙规则或其他位置），则以管理方式添加静态接口。每当用户连接且用户名不匹配任何现有静态条目时，动态接口会自动添加到此列表中（或者在该条目已处于活动状态时也会添加，因为不能存在两个同名引用的独立隧道接口 - 如果这会造成问题，请设置 *one-session-per-host* 值）。动态接口在用户连接时出现，并在用户断开连接后消失，因此无法在路由器配置中引用为该用户创建的隧道（例如，在防火墙中）。如果需要针对该用户的持久规则，请为其创建静态条目。否则，使用动态配置是安全的。

:::warning
在这两种情况下，都必须正确配置 PPP 用户 - 静态条目不能替代 PPP 配置。
:::

### 接入集中器 {#access-concentrator}

**子菜单：** `/interface/pppoe-server/server`

#### 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **accept-untagged** (*yes \| no*；默认值：**yes**) | 该设置控制当指定 <code>pppoe-over-vlan-range</code> 时，PPPoE 服务器是否在其接口上接受未标记（非 VLAN）的 PPPoE 数据包。<br/> 默认情况下，接受未标记的 PPPoE 数据包。如果使用 <code>pppoe-over-vlan-range</code> 属性（该属性启用基于 802.1Q VLAN 的 PPPoE），此选项可决定是否仍允许同一接口上的未标记客户端。如果不使用 <code>pppoe-over-vlan-range</code>，该设置不起作用。 |
| **authentication** ( *mschap2 \| mschap1 \| chap \| pap*；默认值：**"mschap2, mschap1, chap, pap"**) | 认证算法。 |
| **default-profile** (*string*；默认值：**"default"**) |  |
| **interface** (*string*；默认值：**""**) | 客户端连接的接口。 |
| **keepalive-timeout** (*time*；默认值：**"10"**，或 disabled) | 定义路由器开始每秒发送 keepalive 数据包之前的时间段（以秒为单位）。如果在该时间段内没有流量且未收到 keepalive 响应（即 2 * keepalive-timeout），则将无响应的客户端判定为已断开连接。<br/><br/><strong>重要：</strong>LCP 握手成功后，客户端会发送 LCP echo 数据包以验证 MTU 转发；如果未收到回复，则会回退到 1480 的备用 MTU。新选项 <code>keepalive-timeout=disabled</code> 可禁用发送 echo 数据包，从而关闭 MTU 测试。<br/><br/> |
| **max-mru** (*integer*；默认值：**1480**) | 最大接收单元。最佳值为隧道所运行接口的 MTU 减去 20（因此，对于 1500 字节的以太网链路，请将 MTU 设置为 1480，以避免数据包分片） |
| **max-mtu** (*integer*；默认值：**1480**) | 最大传输单元。最佳值为隧道所运行接口的 MTU 减去 20（因此，对于 1500 字节的以太网链路，请将 MTU 设置为 1480，以避免数据包分片） |
| **max-sessions** (*integer*；默认值：**"0"**) | AC 可服务的最大客户端数量。'0' = 无限制。 |
| **mrru** (*integer: 512..65535 \| disabled*；默认值：**"disabled"**) | 链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，则会将其拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或以太网数据包。 |
| **one-session-per-host** (*yes \| no*；默认值：**"no"**) | 每台主机只允许一个会话（由 MAC 地址确定）。如果主机尝试建立新会话，旧会话将被关闭。 |
| **pppoe-over-vlan-range** (*integer 1..4094*；默认值："") | 该设置允许 PPPoE 服务器基于 802.1Q VLAN 运行。默认情况下，PPPoE 服务器仅在其接口上接受未标记的数据包。但是，在客户端位于不同 VLAN 的场景中，无需创建多个 802.1Q VLAN 接口并将它们桥接在一起，也无需为每个 VLAN 配置单独的 PPPoE 服务器，可以直接在 PPPoE 服务器设置中指定所需的 VLAN。<br/> 指定 VLAN ID 后，PPPoE 服务器将接受来自客户端的 802.1Q 标记数据包，并使用相同的 VLAN 进行回复。随后，可以使用 <code>accept-untagged</code> 属性选择接受或丢弃同一接口上的未标记 PPPoE 客户端。<br/> 即使在 <a href="/docs/bridging-and-switching/vlan">VLAN 接口</a>上，也可以使用 <code>pppoe-over-vlan-range</code> 设置配置 PPPoE 服务器，从而支持 QinQ 配置。但请注意，内层 VLAN 标记应为 802.1Q。<br/> 该设置支持 VLAN ID 范围，也支持使用逗号分隔值指定的单个 VLAN。例如：pppoe-over-vlan-range=100-115,120,122,128-130。<br/><br/><strong>注意：</strong>避免在接口上配置带有 <code>pppoe-over-vlan-range</code> 的服务器，同时创建使用该范围内 VLAN ID 的 VLAN 接口。例如： <br/><code>/interface/vlan</code><br/><code>add interface=ether2 name=vlan15 vlan-id=15</code><br/><code>/interface/pppoe-server/server</code><br/><code>add disabled=no interface=ether2 pppoe-over-vlan-range=10-20</code> 如果需要此类配置，请从 <code>pppoe-over-vlan-range</code> 中移除重叠的 VLAN ID，并直接在 VLAN 接口上创建单独的 PPPoE 服务器实例，如下所示： <br/><code>/interface/vlan</code><br/><code>add interface=ether2 name=vlan15 vlan-id=15</code><br/><code>/interface/pppoe-server/server</code><br/><code>add disabled=no interface=ether2 pppoe-over-vlan-range=10-14,16-20</code><br/><code>add disabled=no interface=vlan15</code><br/> |
| **service-name** (*string*；默认值：**""**) | PPPoE 服务名称。服务器将接受发送 PADI 消息且其中 service-name 与该设置匹配的客户端，或 PADI 消息中未设置 service-name 字段的客户端。 |

PPPoE 服务器（接入集中器）支持每个接口配置多个服务器，并使用不同的服务名称。客户端使用接入集中器名称和 PPPoE 服务名称来标识要注册的接入集中器。接入集中器名称与命令提示符前显示的路由器 identity 相同。可在 *`/system/identity`* 子菜单中设置该 identity。

:::danger
不要为接收 PPPoE 请求的接口分配 IP 地址。
:::

指定 MRRU 表示在单条链路上启用 MP（Multilink PPP）。该协议用于将大数据包拆分为较小的数据包。MRRU 硬编码为 1614。该设置有助于克服 PathMTU 发现失败的问题。MP 设置应在两端对等体上启用。

:::warning
默认的 *keepalive-timeout* 值 10s 在大多数情况下均可使用。如果将其设置为 0，路由器将不会断开客户端连接，除非客户端显式注销或路由器重启。要解决此问题，可以使用 one-session-per-host 属性。
:::

## 快速示例 {#quick-example}

### PPPoE 客户端 {#pppoe-client-1}

要将 MikroTik RouterOS 配置为 PPPoE 客户端，请添加具有以下参数的 PPPoE-client，如示例所示：

```ros
[admin@MikroTik] > interface pppoe-client add interface=ether2 password=StrongPass service-name=pppoeservice name=PPPoE-Out disabled=no user=MT-User
[admin@MikroTik] > interface pppoe-client print
Flags: X - disabled, I - invalid, R - running 
 0  R name="PPPoE-Out" max-mtu=auto max-mru=auto mrru=disabled interface=ether2 user="MT-User" 
      password="StrongPass" profile=default keepalive-timeout=10 service-name="pppoeservice" ac-name="" 
      add-default-route=no dial-on-demand=no use-peer-dns=no allow=pap,chap,mschap1,mschap2
```

### PPPoE 服务器 {#pppoe-server-1}

要将 MikroTik RouterOS 配置为接入集中器（PPPoE Server）：

- 为客户端添加 10.0.0.2-10.0.0.5 的 IP 地址池。
- 添加 PPP profile。
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

不建议在一台设备上使用大量 pppoe-clients。
