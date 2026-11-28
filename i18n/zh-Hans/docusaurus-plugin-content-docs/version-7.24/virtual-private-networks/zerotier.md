---
title: "ZeroTier"
description: "ZeroTier 是适用于 MikroTik RouterOS 的网络虚拟化引擎，可通过以太网虚拟化和加密对等网络实现安全的跨网络设备连接。它支持游戏、LAN 访问、NAT 穿透和远程 Pi-Hole 管理，同时需要正确配置 UDP 端口、选择 NAT 类型，并尽量减少 NAT 层级，以确保连接可靠。"
tags:
  - 'zerotier'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/zerotier
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "authentication-authorization-accounting"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

[ZeroTier](https://docs.zerotier.com/) 网络虚拟机管理程序是一个自包含的网络虚拟化引擎，实现了类似 VXLAN 的以太网虚拟化层，该层构建在加密安全的全球对等网络之上。它提供与企业级 SDN 交换机相当的高级网络虚拟化和管理能力，但可跨越局域网和广域网，并连接几乎任何类型的应用或设备。

MikroTik 已在 RouterOS v7.1rc2 中将 ZeroTier 作为独立软件包添加到 **ARM/ARM64** 架构中。

### 等等，它有什么用途？ {#wait-so-what-can-i-use-it-for}

- 在家中托管游戏服务器（适用于仅限 LAN 的游戏），或与朋友创建局域网聚会。
- 直接访问 NAT 后面的 LAN 设备。
- 通过 SSH 访问 LAN 设备，无需向 Internet 开放端口。
- 通过 Internet 从任意位置使用本地 Pi-Hole 设置。

:::info
Important

ZeroTier 功能可能会被 device-mode 阻止。在配置 ZeroTier 之前，请确保它已在 system/device-mode 中启用。（[更多信息](/docs/system-information-and-utilities/device-mode)
:::

### 视频教程 {#video-tutorial}

- [ZeroTier](https://youtu.be/60uIlyF8Z5s)

## 所需网络配置 {#required-network-configuration}

### ZeroTier 使用哪些端口？ {#what-ports-does-zerotier-use}

它监听 3 个 UDP 端口：

- 9993 - 默认端口
- 根据 ZeroTier 地址生成的随机高位端口
- 用于 UPnP/NAT-PMP 映射的随机高位端口

这意味着你的 *peers* 可能监听任意端口。要与它们直接通信，你必须能够向任意端口发送数据。

### 推荐的本地网络和互联网网关配置 {#recommended-local-network-and-internet-gateway-configuration}

这些 ZeroTier 推荐指南适用于绝大多数使用普通网关和接入点的典型部署：

- 不要限制出站 UDP 流量。
- 在网络中支持 UPnP 或 NAT-PMP 可显著提升性能，使 ZeroTier 端点能够映射外部端口，并完全避免 NAT 穿越。
- 推荐使用 IPv6。如果直连链路两端都支持 IPv6，则可显著提高直连可靠性。如果存在 IPv6，应以无 NAT 方式实施（IPv6 完全不需要 NAT，只会增加复杂性），并配置允许双向 UDP 通信的有状态防火墙。
- 不要使用“symmetric”NAT。使用“full cone”或“port restricted cone”NAT。Symmetric NAT 对点对点流量极不友好，并会降低 VoIP、视频聊天、游戏、WebRTC 以及许多其他协议和 ZeroTier 的性能。
- ZeroTier 端点与互联网之间不应存在超过一层 NAT。多层 NAT 会因不同层级的状态和行为之间发生混乱交互而导致连接不稳定。**禁止双重 NAT。**
- NAT 的端口映射或连接超时不应短于 60 秒。
- 每个由 NAT 管理的外部 IP 地址后方的设备数量不应超过约 16,000 台，以确保每台设备都能映射足够数量的端口。
- 交换机和无线接入点应允许本地设备之间的直接本地流量。关闭所有“local isolation”功能。某些交换机可能支持更细粒度的控制，在这些设备上，允许本地 UDP 流量进出 9993（或通常允许所有本地 UDP 流量）即可。

## 配置示例 {#configuration-example}

![](/img/973091414929cb14.webp)

默认情况下，ZeroTier 设计为免配置。用户无需编写配置文件或提供其他节点的 IP 地址，即可启动新的 ZeroTier 节点。它还设计为快速连接。世界上任意两台设备都应能几乎即时地相互定位并通信，因此以下示例将在 RouterOS 设备上启用 ZeroTier，并使用 ZeroTier 应用连接一部手机。

1. 在 [my.zerotier.com](https://my.zerotier.com/) 注册并**创建网络**，获取 *Network ID*，本示例中为：*1d71939404912b40*。  
   ![](/img/8a1dad2da1ff845b.webp)
2. [下载](https://mikrotik.com/download)并安装适用于 RouterOS 的 ZeroTier NPK 软件包，可在“Extra packages”下找到该软件包，将软件包上传到设备并重启设备。
3. 启用默认（官方）ZeroTier 实例：

   ```ros
   [admin@MikroTik] > /zerotier/enable zt1
   ```

4. 添加新网络，指定你在 ZeroTier 云控制台中创建的网络 ID：

   ```ros
   [admin@mikrotik] /zerotier/interface/add network=1d71939404912b40 instance=zt1
   ```

5. 验证 ZeroTier 配置：

   ```ros
   [admin@MikroTik] > /zerotier/interface/print
   Flags: R - RUNNING
   Columns: NAME, MAC-ADDRESS, NETWORK, NETWORK-NAME, STATUS
   #   NAME       MAC-ADDRESS        NETWORK           NETWORK-NAME     STATUS
   0 R zerotier1  42:AC:0D:0F:C6:F6  1d71939404912b40  modest_metcalfe  OK   
   ```

6. 现在可能需要允许来自 ZeroTier 接口到路由器的连接，并且**可选地**允许连接到其他 LAN 接口：

   ```ros
   /ip/firewall/filter/add action=accept chain=forward in-interface=zerotier1 place-before=0
   /ip/firewall/filter/add action=accept chain=input in-interface=zerotier1 place-before=0
   ```

7. 在手机或计算机上安装 ZeroTier 客户端，按照 ZeroTier 手册操作，从该设备连接到同一网络。
8. 如果**“Access Control”**设置为**“Private”**，则必须先授权节点，节点才能成为成员：  
   ![](/img/b58464df52d7e227.webp)

9. ```ros
   [admin@MikroTik] > `/ip/address/print` where interface~"zero"
   Flags: D - DYNAMIC
   Columns: ADDRESS, NETWORK, INTERFACE
   #   ADDRESS             NETWORK        INTERFACE
   3 D 192.168.192.105/24  192.168.192.0  zerotier1

   [admin@MikroTik] > ping 192.168.192.252 count=3
   SEQ HOST                                     SIZE TTL TIME       STATUS                                                                                                                                           
   0 192.168.192.252                            56  64 407us     
   1 192.168.192.252                            56  64 452us     
   2 192.168.192.252                            56  64 451us     
   sent=3 received=3 packet-loss=0% min-rtt=407us avg-rtt=436us max-rtt=452us 
   ```

:::tip
你应在 [ZeroTier 云控制台](https://my.zerotier.com/)中指定到特定内部子网的路由，以确保从其他设备连接时可以访问这些网络。
:::

### Peer

**子菜单：** `/zerotier/peer`

ZeroTier 的 peer 是一个信息性部分，列出你的节点已知的节点。节点只有在加入同一网络并获得授权后才能相互通信。

```ros
[admin@Home] > `/zerotier/peer/print` 
Columns: INSTANCE, ZT-ADDRESS, LATENCY, ROLE, PATH
# INSTANCE  ZT-ADDRESS  LATENCY  ROLE    PATH
0 zt1       61d294b9cb  186ms    PLANET  active,preferred,50.7.73.34/9993,recvd:4s526ms                  
1 zt1       62f865ae71  270ms    PLANET  active,preferred,50.7.252.138/9993,recvd:4s440ms,sent:9s766ms   
2 zt1       778cde7190  132ms    PLANET  active,preferred,103.195.103.66/9993,recvd:4s579ms,sent:9s766ms 
3 zt1       992fcf1db7  34ms     PLANET  active,preferred,195.181.173.159/9993,recvd:4s675ms,sent:4s712ms
4 zt1       159924d630  130ms    LEAF    active,preferred,34.121.192.xx/21002,recvd:3s990ms,sent:3s990ms
```

# Parameters

**子菜单：** `/zerotier`

| 属性 | 说明 |
|:--|:--|
| **name**(*string*; default: **zt1**) | 实例名称。 |
| **port** (*number;*default: **9993**) | 实例监听的端口号。 |
| **identity** (*string*; default) *[sensitive](https://help.MikroTik.com/docs/spaces/ROS/pages/380076066/List+of+menus+with+sensitive+parameters)* | 实例的 40 位唯一地址。 |
| **interface** (string; default: **all)** | 用于通过 ARP 和 IP 类型连接发现 ZeroTier peer 的接口列表。 |
| **route-distance** (number; default: **1** ) | 从 planet/moon 服务器获得的路由的路由距离。 |

```ros
[admin@MikroTik] > zerotier/interface/
```

| 属性 | 说明 |
| :-- | :-- |
| <strong>allow-default</strong> (*string; yes | no)* | |
| <strong>allow-global</strong>(*string; yes | no)* | |
| <strong>allow-managed</strong>(*string; yes | no)* | |
| <strong>arp-timeout</strong> ( <em>number</em>; default: <strong>auto</strong>) | ARP 超时值。 |
| <strong>comment</strong> (<em>string</em>; Default: ) | 接口的描述性注释。 |
| <strong>copy-from</strong> | 允许复制现有接口配置。 |
| <strong>disable-running-check</strong>(*string; yes | no)* | |
| <strong>instance</strong>(<em>string</em>; Default:<strong>zt1</strong>) | ZeroTier 实例名称。 |
| <strong>name</strong>(<em>string</em>; default: <strong>zerotier1</strong>) | 简短名称。 |
| <strong>network</strong>(<em>string</em>; Default) | 16 位网络 ID。 |

# Controller

RouterOS 以节点角色实现 ZeroTier 功能，大部分网络配置必须在 ZeroTier 网页控制面板中完成。不过，如果你更希望在自己的设备上完成所有配置，RouterOS 提供托管自有控制器的选项。

一个常见误解是将网络控制器与根服务器（planet 和 moons）混为一谈。根服务器是在 **[VL1 level](https://docs.zerotier.com/zerotier/manual/#2networkhypervisoroverviewaname2a)** 运行的连接促进者。网络控制器是属于 **[VL2 level](https://docs.zerotier.com/zerotier/manual/#22vl2theethernetvirtualizationlayeraname2_2a).** 的配置管理器和证书颁发机构。通常，根服务器不会加入或控制虚拟网络，网络控制器也不是根服务器，尽管一个节点可以同时承担这两种角色。

**子菜单：** `/zerotier/controller`

每个 ZeroTier 实例都有一个自托管网络控制器，可用于托管虚拟网络。控制器负责允许成员加入网络，并颁发默认配置信息，包括证书。理论上，控制器最多可托管 2^24 个网络，并为数百万台设备（或更多）提供服务，但出于负载均衡和容错考虑，建议将大量网络分散到多个控制器上。

## Parameters

| 属性 | 说明 |
| :-- | :-- |
| <strong>broadcast</strong> *( yes | no; Default: <strong>yes</strong>)* |
| <strong>comment</strong> (<em>string</em>; Default: ) | 控制器的描述性注释。 |
| <strong>copy-from</strong> (<em>string</em>; Default: ) <br/> | 复制现有项目。它从另一个项目获取新项目属性的默认值。如果不想创建完全相同的副本，可以为某些属性指定新值。复制具有名称的项目时，通常需要为副本指定新名称。 |
| <strong>instance</strong> (<em>string</em>; Default: <strong>zt1</strong>) | ZeroTier 实例名称。 |
| <strong>ip-range</strong> (<em>IP</em>; Default: ) | IP 范围，<em>例如 172.16.16.1-172.16.16.254。</em> |
| <strong>ip6-6plane</strong> *( yes | no; Default: <strong>no</strong>)* |
| <strong>ip6-rfc4193</strong> *( yes | no; Default: <strong>no</strong>)* |
| <strong>ip6-range</strong> (<em>IPv6</em>; Default: ) | IPv6 范围，<em>例如 fd00:feed:feed:beef::-fd00:feed:feed:beef:ffff:ffff:ffff:ffff。</em> |
| <strong>mtu</strong><em>(integer;</em> Default: <strong>2800</strong>) | 网络 MTU。 |
| <strong>multicast-limit</strong> (<em>integer</em>: Default: <strong>32</strong>) | 组播数据包的最大接收者数量。 |
| <strong>name</strong> (<em>string</em>; Default: ) | 此控制器的简短名称。 |
| <strong>network</strong> (<em>string</em>; Default) | 16 位网络 ID。 |
| <strong>private</strong> *( yes | no; Default: <strong>yes</strong>)* |
| <strong>routes</strong> (<em>IP@GW</em>; Default: ) | 按以下格式推送路由：<em>Routes ::= Route[,Routes]</em><em>Route ::= Dst[@Gw]</em> |

## 配置示例 {#configuration-example-1}

在以下示例中，我们将使用 RouterOS 内置的 ZeroTier 控制器向新的网络主机发送相应的证书、凭据和配置信息。控制器将在“RouterOS Home”设备上运行，并将 3 台设备加入我们的网络：手机、笔记本电脑、RouterOS Office 设备，但理论上，一个网络中最多可以加入 100 台设备。

![](/img/a615ed03be4e8fb8.webp)

### RouterOS 主页 {#routeros-home}

首先，启用运行在 **VL1** 级别的默认实例：

```ros
[admin@Home] /zerotier> print
Columns: NAME, PORT, IDENTITY.PUBLIC
# NAME  PORT  IDENTITY.PUBLIC
;;; ZeroTier Central controller - https://my.zerotier.com/
0 zt1   9993  879c0b5265:0:d5fd2d17805e011d9b93ce8779385e427c8f405e520eea9284809d8444de0335a817xxb21aa4ba153bfbc229ca34d94e08de96d925a4aaa19b252da546693a28
```

现在，通过控制器部分创建一个新网络，该网络将运行在 **VL2** 级别。每个网络都有自己的控制器，每个网络 ID 都由控制器地址和控制器 ID 组合生成。

请注意，我们使用 ***private=yes*** 选项以获得更安全的网络：

```ros
[admin@Home] /zerotier> controller/add name=ZT-private instance=zt1 ip-range=172.27.27.10-172.27.27.20 private=yes routes=172.27.27.0/24
[admin@Home] /zerotier> controller/print
Columns: INSTANCE, NAME, NETWORK, PRIVATE
# INSTANCE  NAME        NETWORK           PRIVATE
0 zt1       ZT-private  879c0b5265a99e4b  yes
```

在接口部分下添加我们的新网络：

```ros
[admin@Home] /zerotier> interface/add network=879c0b5265a99e4b name=myZeroTier instance=zt1 
[admin@Home] /zerotier> interface/print interval=1
Columns: NAME, MAC-ADDRESS, NETWORK, STATUS
# NAME        MAC-ADDRESS        NETWORK           STATUS
0 myZeroTier  4A:19:35:6E:00:6E  879c0b5265a99e4b  ACCESS_DENIED
```

每个新 peer 都会请求控制器加入网络，在这种情况下，状态为 *ACCESS\_DENIED*，我们必须授权新 peer，这是因为我们使用了 **private=yes** 选项。

授权后，网络中的每个成员都会从控制器接收有关新 peer 的信息，并批准它们可以与其交换数据包：

```ros
[admin@Home] /zerotier> controller/member/print
Columns: NETWORK, ZT-ADDRESS
# NETWORK     ZT-ADDRESS
0  ZT-private  879a0b5265
[admin@Home] /zerotier> controller/member/set 0 authorized=yes
```

## 验证新配置的 IP 地址和路由 {#verify-newly-configured-ip-address-and-route}

```ros
[admin@Home] /zerotier> `/ip/address/print` where interface~"Zero"
Flags: D - DYNAMIC
Columns: ADDRESS, NETWORK, INTERFACE
# ADDRESS          NETWORK      INTERFACE
4 D 172.27.27.15/24  172.27.27.0  myZeroTier

[admin@Home] /zerotier> `/ip/route/pr` where gateway~"Zero"
Flags: D - DYNAMIC; A - ACTIVE; c, y - COPY
Columns: DST-ADDRESS, GATEWAY, DISTANCE
    DST-ADDRESS     GATEWAY     DISTANCE
DAc 172.27.27.0/24  myZeroTier         0
```

### RouterOS 办公室 {#routeros-office}

在 Office 设备上进行配置。启用默认实例，并请求控制器加入 *879c0b5265a99e4b* 网络：

```ros
[admin@office] /zerotier> interface/add network=879c0b5265a99e4b instance=zt1 name=ZT-interface 
[admin@office] /zerotier> interface/print interval=1
Columns: NAME, MAC-ADDRESS, NETWORK, STATUS
# NAME          MAC-ADDRESS        NETWORK           STATUS
0 ZT-interface  4A:40:1C:38:97:BA  879c0b5265a99e4b  ACCESS_DENIED
```

与之前一样，由于网络是私有网络，必须通过“RouterOS home device”授权新的对等端。之后验证从控制器收到的 IP 地址和路由：

```ros
[admin@Home] /zerotier> controller/member/print
Flags: A - AUTHORIZED
Columns: NETWORK, ZT-ADDRESS, IP-ADDRESS, LAST-SEEN
# NETWORK     ZT-ADDRESS  IP-ADDRESS    LAST-SEEN
0 A  ZT-private  879a0b5265  172.27.27.15           
1 A  ZT-private  554a914c7f  172.27.27.17           
2 A  ZT-private  a83ac6032a  172.27.27.10           
3    ZT-private  deba5dc5b1  172.27.27.13  3s348ms  
[admin@Home] /zerotier> controller/member/set 3 authorized=yes
[admin@Home] /zerotier> controller/member/print               
Flags: A - AUTHORIZED
Columns: NETWORK, ZT-ADDRESS, IP-ADDRESS, LAST-SEEN
# NETWORK     ZT-ADDRESS  IP-ADDRESS    LAST-SEEN
0 A  ZT-private  879a0b5265  172.27.27.15           
1 A  ZT-private  554a914c7f  172.27.27.17           
2 A  ZT-private  a83ac6032a  172.27.27.10           
3 A  ZT-private  deba5dc5b1  172.27.27.13  4s55ms 
```

验证通过 ZeroTier 获取的 IP 地址和路由：

```ros
[admin@office] /zerotier> `/ip/address/print` where interface~"ZT"
Flags: D - DYNAMIC
Columns: ADDRESS, NETWORK, INTERFACE
# ADDRESS          NETWORK      INTERFACE
0 D 172.27.27.13/24  172.27.27.0  ZT-interface

[admin@office] /zerotier> `/ip/route/print` where gateway~"ZT"
Flags: D - DYNAMIC; A - ACTIVE; c, y - COPY
Columns: DST-ADDRESS, GATEWAY, DISTANCE
    DST-ADDRESS     GATEWAY       DISTANCE
DAc 172.27.27.0/24  ZT-interface         0
```

### 其他设备 {#other-devices}

为手机或计算机[下载 ZeroTier 应用](https://www.zerotier.com/download/)，并加入新创建的网络：

1) 通过 Laptop ZeroTier 应用程序加入 *879c0b5265a99e4b* 网络；

2) 使用 Zerotier 移动应用加入 *879c0b5265a99e4b* 网络；

:::warning
还必须在 */zerotier/controller/member/* 部分授权所有其他新主机。
:::

![](/img/3028aaa4ec6e1981.webp)

![](/img/9c8d77f1a4790aaf.png)
