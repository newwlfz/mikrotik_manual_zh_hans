---
sidebar_key: "virtual-private-networks/pppoe"
title: "PPPoE"
sidebar_label: "PPPoE"
description: "PPPoE 支持通过 PPP 和 MLPPP 跨以太网链路进行 IPv6 前缀委派，同时支持客户端到服务器和服务器到客户端两种配置。它分发现阶段和会话阶段运行，使用 LCP/CHAP 身份验证，并通过 IPCP 分配 IP 地址。MTU 相关考量可确保正确封装，而身份验证方法和按需拨号等客户端属性则增强了灵活性。"
tags:
  - 'pppoe'
  - 'discovery-phase'
  - 'mtu'
source: https://manual.mikrotik.com/docs/virtual-private-networks/pppoe
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 PPPoE 示例。可使用这些示例通过 PPP 配置 IPv6 前缀委派，以及通过一条或多条链路配置 MLPPP。

以太网上的点对点协议（PPPoE）是一种将 PPP 数据包封装到以太网帧中的方法。PPPoE 是标准点对点协议（PPP）的扩展，也是 PPPoA 的后继者。PPPoE 标准定义在 [RFC 2516](https://tools.ietf.org/html/rfc2516) 中。PPPoE 客户端和服务器可在路由器的任何二层以太网级接口上工作——例如 Wireless、Ethernet、EoIP 等。PPPoE 用于根据用户名认证（以及在需要时根据工作站认证）向客户端分配 IP 地址，而不是使用仅工作站认证（其中使用静态 IP 地址或 DHCP）。出于安全原因，不要在 PPPoE 所在的同一接口上使用静态 IP 地址或 DHCP。

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

发现阶段有四步。完成时，双方都知道 PPPoE *SESSION\_ID* 和对端的以太网地址，这两者共同唯一标识 PPPoE 会话：

1. **PPPoE 主动发现初始化（PADI）——** PPPoE 客户端向广播地址发送 *PADI* 数据包。如果已在 PPPoE 客户端的拨号网络属性中输入服务名，此数据包也可以填充 "service-name" 字段。如果未输入服务名，则不填充此字段。
2. **PPPoE 主动发现提供（PADO）——** 如果访问集中器能够服务于 *PADI* 数据包中列出的 "service-name" 字段，则 PPPoE 服务器（即访问集中器）应使用 *PADO* 响应 *PADI*。如果未列出 "service-name" 字段，访问集中器会响应一个 *PADO* 数据包，其中 "service-name" 字段填充该访问集中器可提供的服务名。*PADO* 数据包发送到 PPPoE 客户端的单播地址。
3. **PPPoE 主动发现请求（PADR）——** 收到 *PADO* 数据包后，PPPoE 客户端使用 *PADR* 数据包响应。此数据包发送到访问集中器的单播地址。客户端可能收到多个 *PADO* 数据包，但客户端会响应其收到的第一个有效 *PADO*。如果初始 *PADI* 数据包的 "service-name" 字段为空，则客户端会用 *PADO* 数据包中返回的第一个服务名填充 *PADR* 数据包的 "service-name" 字段。
4. **PPPoE 主动发现会话确认（PADS）——** 收到 *PADR* 后，访问集中器为点对点协议（PPP）会话生成唯一的会话标识（ID），并在 *PADS* 数据包中将此 ID 返回给 PPPoE 客户端。此数据包发送到客户端的单播地址。

### PPPoE 会话终止 {#pppoe-session-termination}

- **PPPoE 主动发现终止（PADT）——** 可在会话建立后的任何时间发送，以指示 PPPoE 会话已终止。服务器或客户端均可发送。

### 会话阶段 {#session-phase}

发现阶段完成后，双方都知道 *PPPoE Session ID* 和对端的 *Ethernet（MAC）地址*，这两者共同定义 PPPoE 会话。PPP 帧封装在 PPPoE 会话帧中，这些帧的以太网帧类型为 **0x8864**。
当服务器发送确认且客户端收到后，PPP 会话按以下阶段启动：

1. **LCP 协商**阶段。
2. **认证（CHAP/PAP）**阶段。
3. **IPCP 协商**阶段——在此阶段为客户端分配 IP 地址。

:::warning
如果任一过程失败，将重新开始 LCP 协商建立阶段。
:::

PPPoE 服务器向客户端发送 *Echo-Request* 数据包以确定会话状态。否则，如果客户端在不发送 *Terminate-Request* 数据包的情况下终止会话，服务器无法确定会话已终止。

## MTU {#mtu}

通常，可在不分片的情况下传输的最大以太网帧为 1500 字节。PPPoE 增加 6 字节开销，PPP 字段再增加 2 字节，留给 IP 数据报的为 1492 字节。因此，PPPoE 的最大 MRU 和 MTU 值不得大于 1492。

TCP 栈会尽量避免分片，因此使用 MSS（最大段大小）。默认情况下，MSS 选择为出接口的 MTU 减去 TCP 和 IP 报头的通常大小（40 字节），对于以太网接口，结果为 1460 字节。MTU 较低的中间链路可能导致分片。在这种情况下，TCP 栈会执行路径 MTU 发现。无法在不分片的情况下转发数据报的路由器应丢弃该数据包，并向源主机发送 *ICMP-Fragmentation-Required*。当主机收到此类 ICMP 数据包时，会尝试降低 MTU。这在理想情况下应该可行；然而，在现实世界中，许多路由器不生成需要分片的数据报，并且许多防火墙会丢弃所有 ICMP 数据报。

解决此问题的方法是在 MSS 过大时[调整 MSS](../../firewall-and-quality-of-service/firewall/mangle.md#change-mss)。

## MRRU {#mrru}

指定 MRRU 意味着在单条链路上启用 MP（多链路 PPP）。此协议用于将大数据包拆分为较小的数据包。MRRU 硬编码为 1614。此设置有助于克服 PathMTU 发现失败。MP 设置应在两个对等方上启用。  
在 Windows 上，可以在“网络”选项卡的“设置”按钮中启用“为单链路连接协商多链路”。

## 访问集中器 {#access-concentrator}

PPPoE 服务器（访问集中器）支持每个接口有多个服务器——使用不同的服务名。客户端使用访问集中器名称和 PPPoE 服务名来标识要注册的访问集中器。访问集中器名称与命令提示符前显示的路由器身份相同。身份在 *`/system/identity`* 子菜单中设置。

访问集中器在 [`/interface/pppoe-server/server`](../../cli-reference/interface/pppoe-server/server.md) 菜单中配置。

:::tip
不要为接收 PPPoE 请求的接口分配 IP 地址。
:::

:::warning
默认的 `keepalive-timeout` 值 10s 在大多数情况下没问题。如果将其设置为 0，路由器不会断开客户端，直到客户端显式注销或路由器重启。要解决此问题，可以使用 `one-session-per-host` 属性。
:::

## 快速示例 {#quick-example}

![](/img/a34ca577e7a80a70.jpg)

### PPPoE 客户端 {#pppoe-client}

要将 MikroTik RouterOS 配置为 PPPoE 客户端，请使用以下参数添加 PPPoE 客户端：

```ros
[admin@MikroTik] > interface pppoe-client add interface=ether2 password=StrongPass service-name=pppoeservice name=PPPoE-Out disabled=no user=MT-User
[admin@MikroTik] > interface pppoe-client print
Flags: X - disabled, I - invalid, R - running 
 0  R name="PPPoE-Out" max-mtu=auto max-mru=auto mrru=disabled interface=ether2 user="MT-User" 
      password="StrongPass" profile=default keepalive-timeout=10 service-name="pppoeservice" ac-name="" 
      add-default-route=no dial-on-demand=no use-peer-dns=no allow=pap,chap,mschap1,mschap2
```

### PPPoE 服务器 {#pppoe-server}

要将 MikroTik RouterOS 配置为接入集中器（PPPoE 服务器）：

- 为客户端添加 IP 地址池，范围为 10.0.0.2-10.0.0.5。
- 添加 PPP 配置文件。
- 添加 PPP secret（用户名/密码）。
- 添加 PPPoE 服务器本身。

:::warning
对于 Windows，某些连接说明可能使用这样的形式：指定“电话号码”，例如 "MikroTik\_AC\mt1"，以表示 "MikroTik\_AC" 是访问集中器名称，而 "mt1" 是服务名。
:::

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

## PPPoE 跨 VLAN 范围 {#pppoe-over-vlan-range}

避免在接口上配置带有 `pppoe-over-vlan-range` 的服务器，同时还创建使用落入该范围内 VLAN ID 的 VLAN 接口。  
例如：
```
/interface/vlan
add interface=ether2 name=vlan15 vlan-id=15
/interface/pppoe-server/server
add disabled=no interface=ether2 pppoe-over-vlan-range=10-20
```
如果你需要这种设置，请从 `pppoe-over-vlan-range` 中移除重叠的 VLAN ID，并直接在 VLAN 接口上创建单独的 PPPoE 服务器实例，如下所示：
```
/interface/vlan
add interface=ether2 name=vlan15 vlan-id=15
/interface/pppoe-server/server
add disabled=no interface=ether2 pppoe-over-vlan-range=10-14,16-20
add disabled=no interface=vlan15
```

## 说明 {#notes}

不要在一台设备上使用大量 PPPoE 客户端。
