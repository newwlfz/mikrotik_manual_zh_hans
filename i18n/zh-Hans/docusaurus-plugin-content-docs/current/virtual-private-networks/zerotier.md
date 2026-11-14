---
sidebar_key: "virtual-private-networks/zerotier"
sidebar_position: 12
title: "ZeroTier"
sidebar_label: "ZeroTier"
description: "ZeroTier 是适用于 MikroTik RouterOS 的网络虚拟化引擎，它通过以太网虚拟化和加密的点对点网络实现安全的跨网络设备连接。它支持游戏、LAN 访问、NAT 穿透和远程 Pi-Hole 管理，同时需要正确配置 UDP 端口、选择 NAT 类型并尽量减少 NAT 层数以获得可靠的连接。"
tags:
  - 'zerotier'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/virtual-private-networks/zerotier
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

[ZeroTier](https://docs.zerotier.com/) 网络虚拟机监控器是一个自包含的网络虚拟化引擎，它实现了类似于 VXLAN 的以太网虚拟化层，构建在加密安全的全球点对点网络之上。它提供与企业级 SDN 交换机相当的高级网络虚拟化和管理能力，但可跨局域网和广域网，并连接几乎任何类型的应用或设备。

MikroTik 已将 ZeroTier 添加到 RouterOS v7.1rc2，作为面向 **ARM/ARM64** 架构的独立软件包。

### 使用场景 {#use-cases}

- 在家中托管游戏服务器（适合仅限 LAN 的游戏），或与朋友举办 LAN 聚会。
- 直接访问 NAT 后面的 LAN 设备。
- 无需向互联网开放端口，即可通过 SSH 访问 LAN 设备。
- 通过互联网从任何地方使用你本地的 Pi-Hole 设置。

:::info
ZeroTier 功能可能会被 `device-mode` 阻止。配置 ZeroTier 之前，请确保已在 `system/device-mode` 中启用该功能。（[更多信息](../system-information-and-utilities/device-mode.md)）
:::

### 视频教程 {#video-tutorial}

- [ZeroTier](https://youtu.be/60uIlyF8Z5s)

## 所需网络配置 {#required-network-configuration}

### ZeroTier 使用哪些端口？ {#what-ports-does-zerotier-use}

它监听 3 个 UDP 端口：

- 9993 - 默认
- 一个由你的 ZeroTier 地址派生出的随机高位端口
- 一个用于 UPnP/NAT-PMP 映射的随机高位端口

这意味着你的 *对等节点* 可能监听任意端口。要直接与它们通信，你需要能够向它们的任意端口发送数据。

### 推荐的本地网络和互联网网关配置 {#recommended-local-network-and-internet-gateway-configuration}

这些 ZeroTier 推荐准则与绝大多数使用通用网关和接入点的典型部署一致：

- 不要限制出站 UDP 流量。
- 在网络中支持 UPnP 或 NAT-PMP 可以显著提升性能，因为它允许 ZeroTier 端点映射外部端口并完全避免 NAT 穿透。
- 建议使用 IPv6；如果直连链路两端都支持 IPv6，它可以显著提高直接连接的可靠性。若存在 IPv6，请在不使用 NAT 的情况下实施（IPv6 无需 NAT，且 NAT 会增加复杂性），并使用允许双向 UDP 会话的状态化防火墙。
- 不要使用“对称”NAT。请使用“完全锥形”或“端口受限锥形”NAT。对称 NAT 对点对点流量极其不友好，并且会降低 VoIP、视频聊天、游戏、WebRTC 以及 ZeroTier 等许多其他协议的表现。
- ZeroTier 端点与互联网之间不应存在超过一层 NAT。多层 NAT 会因不同层级的状态和行为之间混乱的交互而引入连接不稳定性。不要使用双重 NAT。
- NAT 设备的端口映射或连接超时时间不应短于 60 秒。
- 每个由 NAT 管理的外部 IP 地址后放置的设备不应超过 16,000 台，以确保每台设备都能映射足够数量的端口。
- 交换机和无线接入点应允许本地设备之间的直接本地流量。关闭任何“本地隔离”功能。如果交换机允许更细粒度的控制，请允许进出端口 9993 的本地 UDP 流量。

## 配置示例 {#configuration-example}

![](/img/973091414929cb14.webp)

ZeroTier 被设计为零配置——你无需编写配置文件或提供其他节点的 IP 地址即可启动新节点。世界上任意两台设备都能几乎即时地相互定位并通信。以下示例在 RouterOS 设备上启用 ZeroTier，并使用 ZeroTier 应用程序连接一部手机。

1. 在 [my.zerotier.com](https://my.zerotier.com/) 上注册并**创建网络**，获取*网络 ID*，本示例中为：*1d71939404912b40*。  
   ![](/img/8a1dad2da1ff845b.webp)
2. [下载](https://mikrotik.com/download)并安装 ZeroTier NPK 包。你可以在“Extra packages”下找到它。将包上传到设备并重启。
3. 启用默认（官方）ZeroTier 实例：

   ```ros
   [admin@MikroTik] > /zerotier/enable zt1
   ```

4. 添加一个新网络，指定你在 ZeroTier 云控制台中创建的网络 ID：

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

6. 你可能需要允许从 ZeroTier 接口到路由器的连接，以及可选的到其他 LAN 接口的连接：

   ```ros
   /ip/firewall/filter/add action=accept chain=forward in-interface=zerotier1 place-before=0
   /ip/firewall/filter/add action=accept chain=input in-interface=zerotier1 place-before=0
   ```

7. 在你的智能手机或计算机上安装 ZeroTier 客户端。按照 ZeroTier 手册连接到同一网络。
8. 如果 **"Access Control"** 设置为 **"Private"**，则必须先授权节点，节点才能成为成员：  
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
你应在 [ZeroTier 云控制台](https://my.zerotier.com/) 中为特定内部子网指定路由，以确保从其他设备连接时能够访问这些网络。
:::

# 控制器 {#controller}

RouterOS 以节点角色实现 ZeroTier 功能，其中大部分网络配置必须在 ZeroTier 网页仪表板上完成。但是，在你希望在自己的设备上完成所有配置的情况下，RouterOS 提供托管自己的控制器的功能。

一个常见的误解是将网络控制器与根服务器（planet 和 moons）混为一谈。根服务器是在 **[VL1 层](https://docs.zerotier.com/zerotier/manual/#2networkhypervisoroverviewaname2a)** 运行的连接促进器。网络控制器是配置管理器和证书颁发机构，属于 **[VL2 层](https://docs.zerotier.com/zerotier/manual/#22vl2theethernetvirtualizationlayeraname2_2a)。** 通常，根服务器不加入或控制虚拟网络，网络控制器也不是根服务器，不过一个节点可以同时承担两者。

每个 ZeroTier 实例都有一个可用于托管虚拟网络的自托管网络控制器。控制器负责允许成员加入网络，并颁发包括证书在内的默认配置信息。理论上，控制器最多可托管 2^24 个网络并服务数百万台设备，但你应将大量网络分散到多个控制器上，以实现负载均衡和容错。

控制器在 [`/zerotier/controller`](../cli-reference/zerotier/controller/index.md) 菜单中配置。

## 配置示例 {#configuration-example-1}

本示例使用 RouterOS 内置的 ZeroTier 控制器向新网络主机发送适当的证书、凭据和配置信息。控制器运行在“RouterOS Home”设备上，并将 3 台设备加入网络：一部手机、一台笔记本电脑和一台 RouterOS Office 设备。一个网络最多可加入 100 台设备。

![](/img/a615ed03be4e8fb8.webp)

### RouterOS 家庭 {#routeros-home}

首先，启用运行在 **VL1** 层级的默认实例：

```ros
[admin@Home] /zerotier> print
Columns: NAME, PORT, IDENTITY.PUBLIC
# NAME  PORT  IDENTITY.PUBLIC
;;; ZeroTier Central controller - https://my.zerotier.com/
0 zt1   9993  879c0b5265:0:d5fd2d17805e011d9b93ce8779385e427c8f405e520eea9284809d8444de0335a817xxb21aa4ba153bfbc229ca34d94e08de96d925a4aaa19b252da546693a28
```

现在，通过控制器部分创建一个新网络，该部分运行在 **VL2** 层级。每个网络都有自己的控制器，每个网络 ID 都由控制器地址和控制器 ID 组合生成。

使用 ***private=yes*** 选项以获得更安全的网络：

```ros
[admin@Home] /zerotier> controller/add name=ZT-private instance=zt1 ip-range=172.27.27.10-172.27.27.20 private=yes routes=172.27.27.0/24
[admin@Home] /zerotier> controller/print
Columns: INSTANCE, NAME, NETWORK, PRIVATE
# INSTANCE  NAME        NETWORK           PRIVATE
0 zt1       ZT-private  879c0b5265a99e4b  yes
```

在接口部分下添加新网络：

```ros
[admin@Home] /zerotier> interface/add network=879c0b5265a99e4b name=myZeroTier instance=zt1 
[admin@Home] /zerotier> interface/print interval=1
Columns: NAME, MAC-ADDRESS, NETWORK, STATUS
# NAME        MAC-ADDRESS        NETWORK           STATUS
0 myZeroTier  4A:19:35:6E:00:6E  879c0b5265a99e4b  ACCESS_DENIED
```

每个新对等节点都会向控制器请求加入网络。在这种情况下，状态为 *ACCESS\_DENIED*，并且必须授权该对等节点，因为使用了 **private=yes** 选项。

授权后，网络中的每个成员都会从控制器收到有关新对等节点的信息，以及与其交换数据包的批准：

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

### RouterOS 办公 {#routeros-office}

在 Office 设备上进行配置。启用默认实例，并请求控制器加入 *879c0b5265a99e4b* 网络：

```ros
[admin@office] /zerotier> interface/add network=879c0b5265a99e4b instance=zt1 name=ZT-interface 
[admin@office] /zerotier> interface/print interval=1
Columns: NAME, MAC-ADDRESS, NETWORK, STATUS
# NAME          MAC-ADDRESS        NETWORK           STATUS
0 ZT-interface  4A:40:1C:38:97:BA  879c0b5265a99e4b  ACCESS_DENIED
```

如前所述，由于网络是私有的，新对等节点必须在“RouterOS Home”设备上获得授权。之后，验证从控制器收到的 IP 地址和路由：

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

[下载 ZeroTier 应用](https://www.zerotier.com/download/)到你的手机或计算机，并加入你新创建的网络：

1. 在笔记本电脑上的 ZeroTier 应用中，加入 *879c0b5265a99e4b* 网络。
2. 使用 ZeroTier 移动应用加入 *879c0b5265a99e4b* 网络。

:::warning
所有其他新主机也必须在 `/zerotier/controller/member/` 部分中获得授权。
:::

![](/img/3028aaa4ec6e1981.webp)

![](/img/9c8d77f1a4790aaf.png)
