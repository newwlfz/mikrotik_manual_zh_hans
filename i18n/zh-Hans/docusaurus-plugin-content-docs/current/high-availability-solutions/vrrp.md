---
sidebar_key: "high-availability-solutions/vrrp"
sidebar_position: 5
title: "VRRP"
sidebar_label: "VRRP"
description: "本页介绍 MikroTik RouterOS 中的虚拟路由冗余协议（VRRP），说明它如何通过 IPv4/IPv6 组播通信以及路由器之间基于优先级的选举来提供路由器冗余。内容涵盖 VRRP 配置、虚拟 MAC 地址分配、owner/master/backup 角色，并强调版本兼容性以及对 VRRPv 中已弃用认证功能的警告"
tags:
  - 'vrrp'
  - 'routing-redundancy'
source: https://manual.mikrotik.com/docs/high-availability-solutions/vrrp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

本章介绍 RouterOS 中对虚拟路由器冗余协议（VRRP）的支持。

在较大的 LAN 上，通常会使用动态路由协议（OSPF 或 RIP）；然而，有多种因素可能使使用动态路由协议变得不理想。一种替代方案是使用静态路由，但如果静态配置的第一跳发生故障，主机将无法与其他主机通信。

在 IPv6 网络中，主机通过接收邻居发现（ND）协议使用的路由器通告来了解路由器。ND 已经具有确定不可达路由器的内置机制。然而，检测不可达路由器最多可能需要 38 秒。可以更改参数并加快检测速度，但这会增加 ND 流量的开销，尤其是在有大量主机时。VRRP 允许在 3 秒内检测到不可达路由器，且不会带来额外的流量开销。

虚拟路由器冗余协议（VRRP）通过将多台路由器组合成一个称为*虚拟路由器*（VR）的逻辑组来提供解决方案。RouterOS 中的 VRRP 实现基于 VRRPv2 RFC 3768 和 VRRPv3 RFC 5798。

建议所有使用同一 VRID 实现 VRRP 的设备都使用相同版本的 RouterOS。

:::warning
根据 RFC，VRRP v3 的认证已弃用。

:::

## 协议概述 {#protocol-overview}

![](/img/0340e63898c1565e.webp)

VRRP 的目的是与关联到虚拟路由器 ID 的所有 VRRP 路由器通信，并通过它们之间基于优先级的选举过程来支持路由器冗余。

所有消息传递均通过使用协议 112（VRRP）的 IPv4 或 IPv6 组播数据包完成。IPv4 数据包的目标地址是 *224.0.0.18*，IPv6 的目标地址是 *FF02:0:0:0:0:0:0:12*。数据包的源地址始终是发送该数据包的接口的主 IP 地址。在 IPv6 网络中，源地址是接口的链路本地地址。

这些数据包始终以 TTL=255 发送，并且不会由路由器转发。如果由于任何原因，路由器收到 TTL 更低的数据包，该数据包将被丢弃。

每个 VR 节点都有一个分配的 MAC 地址。此 MAC 地址用作 Master 发送的所有周期性消息的源地址。

虚拟路由器由 VRID 和一组映射的 IPv4 或 IPv6 地址定义。Master 路由器被称为所映射 IPv4/IPv6 地址的 **Owner**。在 IPv4 和 IPv6 中使用相同的 VRID 没有限制；不过，它们将是两个不同的虚拟路由器。

只有 Master 路由器会发送周期性 Advertisement 报文，以尽量减少流量。只有当 Backup 具有更高优先级且未禁止抢占时，Backup 才会尝试抢占 Master。

:::tip
属于同一 VR 的所有 VRRP 路由器必须配置相同的 advertisement interval。如果间隔不匹配，路由器将丢弃收到的 advertisement packet。

:::

## 虚拟路由器（VR） {#virtual-router-vr}

虚拟路由器（VR）由一个 Owner 路由器和属于同一网络的一个或多个 backup 路由器组成。

VR 包括：

- VRID 配置在每台 VRRP 路由器上。
- 每台路由器上都配置相同的虚拟 IP。
- 每台路由器上都配置 Owner 和 Backup。对于给定的 VR，只能有一个 Owner。

### 虚拟 MAC 地址 {#virtual-mac-address}

VRRP 会根据 VRRP 数据包的标准 MAC 前缀和 VRID 编号，自动为 VRRP 接口分配 MAC 地址。前五个八位组为 00:00:5E:00:01，最后一个八位组为配置的 VRID。例如，如果虚拟路由器的 VRID 为 49，则虚拟 MAC 地址将为 *00:00:5E:00:01:31*。

:::warning
虚拟 MAC 地址不能手动设置或编辑。

:::

### 硬件卸载 {#hardware-offloading}

当 VRRP 实例处于 master 状态且 L3 硬件卸载已启用时，该实例会被硬件卸载。交换机使用虚拟 MAC 地址作为路由流量的源 MAC 地址。发往虚拟 MAC 地址的帧由交换机路由。该实例会报告只读的 `hw-offloaded` 属性，在 `/interface/vrrp/print` 中显示为 `H` 标志。

当实例未处于 master 状态或 L3 硬件卸载被禁用时，卸载会被移除。VRRP 硬件卸载并非在所有支持 L3 硬件卸载的交换机上都可用。有关配置和支持的设备列表，请参阅 [L3 硬件卸载](../bridging-and-switching/l3-hardware-offloading.md)。

### 所有者 {#owner}

VR 的 Owner 路由器是默认的 Master 路由器，并作为该 VR 中所有子网的 Owner 运行。Owner 路由器上的优先级必须为最高值（255），且虚拟 IP 与真实 IP 相同（拥有该虚拟 IP 地址）。

:::warning
RouterOS 不能配置为 Owner。除非将非 RouterOS 设备设置为 owner，否则纯虚拟 IP 配置是唯一有效的配置。

:::

### 主 {#master}

VR 中的 Master 路由器充当其配置所在网络的物理网关。Master 的选择由优先级值控制。Master 状态描述 Master 路由器的行为。在示例网络中，**R1** 是 Master 路由器。当 R1 不再可用时，R2 成为 Master。

### 备份 {#backup}

VR 必须至少包含一个 Backup 路由器。Backup 路由器必须配置与该 VR 的 Master 相同的虚拟 IP。Backup 路由器的默认优先级为 100。当前 Master 路由器不再可用时，优先级最高的 Backup 路由器将成为当前 Master。每当具有更高优先级的路由器变为可用时，它就会切换为 Master。有时不需要此行为。要覆盖此行为，应禁用抢占模式。

### 虚拟地址 {#virtual-address}

![](/img/8599472e34cd8357.webp)

与 VR 关联的虚拟 IP 必须相同，并在所有 VR 节点上设置。所有虚拟地址和真实地址都应来自同一网络。

:::warning
RouterOS 不能配置为 Owner。VRRP 地址和真实 IP 地址不应相同。

:::

如果 VR 的 Master 关联了多个 IP 地址，则属于同一 VR 的 Backup 路由器也必须关联相同的虚拟 IP 地址集合。如果 Master 上的虚拟地址不在 Backup 上，则存在配置错误，VRRP 通告报文将被丢弃。

所有虚拟路由器成员都可以配置为虚拟 IP 与物理 IP 不同。这种虚拟地址可以称为浮动或纯虚拟 IP 地址。此设置的优点是为管理员提供了灵活性。由于虚拟 IP 地址不是任何参与路由器的真实地址，管理员可以更改这些物理路由器或其地址，而无需重新配置虚拟路由器本身。

在 IPv6 网络中，第一个地址始终是与 VR 关联的链路本地地址。如果配置了多个 IPv6 地址，则它们会在链路本地地址之后添加到通告报文中。

### IPv4 ARP {#ipv4-arp}

给定 VR 的 Master 使用该 VR 分配的 MAC 地址响应 ARP 请求。虚拟 MAC 地址还用作 Master 发送的通告报文的源 MAC 地址。对于非虚拟 IP 地址的 ARP 请求，路由器使用系统 MAC 地址进行响应。Backup 路由器不响应虚拟 IP 的 ARP 请求。

### IPv6 ND {#ipv6-nd}

您可能知道，在 IPv6 网络中，使用邻居发现协议而不是 ARP。当路由器成为 Master 时，会针对与虚拟路由器关联的每个 IPv6 地址发送带有 Router Flag 的非请求 ND 邻居通告。

## VRRP 状态机 {#vrrp-state-machine}

![](/img/2ab58b3889e511d8.webp)

从图中可以看到，每个 VRRP 节点可以处于以下三种状态之一：

- Init 状态
- Backup 状态
- Master 状态

### Init 状态 {#init-state}

此状态的目的是等待 Startup 事件。收到此事件后，将执行以下操作：

- 如果优先级为 255：
- \* 对于 IPv4，发送通告报文并广播 ARP 请求。
- \* 对于 IPv6，针对与虚拟路由器关联的每个 IPv6 地址发送非请求 ND 邻居通告，并将目标地址设置为与 VR 关联的链路本地地址。
- \* 转换到 MASTER 状态。
- 否则转换到 BACKUP 状态。

### Backup 状态 {#backup-state}

处于 Backup 状态时：

- 在 IPv4 网络中，节点不响应 ARP 请求，也不转发与 VR 关联的 IP 的流量。
- 在 IPv6 网络中，节点不响应 ND 邻居请求消息，也不为 VR 关联的 IPv6 地址发送 ND 路由器通告。

路由器的主要任务是接收通告报文并检查 Master 节点是否可用。

Backup 路由器会在以下两种情况下自行转换到 Master 状态：

- 如果通告报文中的优先级为 0。
- 当 Preemption\_Mode 设置为 yes，且 ADVERTISEMENT 中的优先级低于本地优先级时。

转换到 Master 状态后，节点会：

- 在 IPv4 中广播免费 ARP 请求。
- 在 IPv6 中针对每个关联的 IPv6 地址发送非请求 ND 邻居通告。

在其他情况下，通告报文将被丢弃。收到 shutdown 事件后，转换到 Init 状态。

:::warning
如果 Owner 路由器变为可用，则忽略抢占模式。

:::

### Master 状态 {#master-state}

当设置为 MASTER 状态时，节点会作为与 VR 关联的 IPv4/IPv6 地址的转发路由器运行。

在 IPv4 网络中，Master 节点响应针对与 VR 关联的 IPv4 地址的 ARP 请求。在 IPv6 网络中，Master 节点会：

- 响应针对关联 IPv6 地址的 ND 邻居请求消息。
- 针对关联的 IPv6 地址发送 ND 路由器通告。

如果 Master 节点收到通告报文：

- 如果优先级为 0，立即发送通告。
- 如果通告报文中的优先级大于节点优先级，则转换到 Backup 状态。
- 如果通告报文中的优先级等于节点优先级，且发送方的主 IP 地址大于本地主 IP 地址，则转换到 Backup 状态。
- 在其他情况下忽略通告。

收到 shutdown 事件时，发送 priority=0 的通告报文并转换到 Init 状态。

### 连接跟踪同步 {#connection-tracking-synchronization}

与不同的高可用性功能类似，RouterOS v7 支持 VRRP 连接跟踪同步。

VRRP 连接跟踪同步要求 RouterOS [连接跟踪](../firewall-and-quality-of-service/connection-tracking.md) 正在运行。默认情况下，连接跟踪以 `auto` 模式工作。如果 VRRP 设备不包含任何防火墙规则，则需要手动启用连接跟踪：

```ros
/ip/firewall/connection/tracking/set enabled=yes
```

要同步连接跟踪条目，请按如下方式配置设备：

```ros
/interface/vrrp/set vrrp1 sync-connection-tracking=yes
```

在日志部分验证配置：

```ros
16:14:06 vrrp,info vrrp1 now MASTER, master down timer
16:14:06 vrrp,info vrrp1 stop CONNTRACK
16:14:06 vrrp,info vrrp1 starting CONNTRACK MASTER
```

连接跟踪条目仅从 Master 同步到 Backup 设备。

当同时启用 `sync-connection-tracking` 和 `preemption-mode`，且具有更高 VRRP 优先级的路由器上线时，连接会先同步，然后具有更高优先级的路由器才会成为 VRRP Master。

:::tip
如果在两台设备之间配置了多个 VRRP 接口并且需要 `sync-connection-tracking=yes`，则只能在一个 VRRP 接口上启用它，最好是指定为 `group-authority` 的那个接口。

:::

示例 `connection-tracking-mode` 配置：

```
R1
/interface/vrrp
add connection-tracking-mode=active-active connection-tracking-port=8275 interface=ether1 name=vrrp30 priority=100 sync-connection-tracking=yes vrid=1
add connection-tracking-mode=active-active connection-tracking-port=8276 interface=ether1 name=vrrp40 priority=100 sync-connection-tracking=yes vrid=2

R2
/interface/vrrp
add connection-tracking-mode=active-active connection-tracking-port=8275 interface=ether1 name=vrrp30 priority=55 sync-connection-tracking=yes vrid=1
add connection-tracking-mode=active-active connection-tracking-port=8276 interface=ether1 name=vrrp40 priority=155 sync-connection-tracking=yes vrid=2
```

`group-authority` 配置示例：

VRRP 实例运行在 LAN 和 WAN 网络上，二者之间使用 NAT。如果同一设备上的一个 VRRP 实例为 Master，另一个为 Backup，则由于 NAT 故障，整个网络会无法正常工作。将 LAN 和 WAN VRRP 接口分组可确保二者要么都是 VRRP Master，要么都是 Backup。在 VRRP 组中，VRRP 通告仅由组权威发送。在典型的 WAN+LAN 设置中，应将 LAN 网络用作组权威，以将 VRRP 控制流量保留在内部网络中。

```
/interface/vrrp
add name=vrrp-wan interface=sfp-sfpplus1 vrid=1 priority=100
add name=vrrp-lan interface=bridge1 vrid=2 priority=100
set [find] group-authority=vrrp-lan
```

## 配置 VRRP {#configuring-vrrp}

### IPv4 {#ipv4}

设置虚拟路由器非常简单，只需执行两个操作——创建 VRRP 接口并设置虚拟路由器的 IP 地址。

例如，将 VRRP 添加到 ether1，并将 VR 的地址设置为 192.168.1.1

```ros
/interface/vrrp/add name=vrrp1 interface=ether1
/ip/address/add address=192.168.1.2/24 interface=ether1
/ip/address/add address=192.168.1.1/32 interface=vrrp1
```

请注意，添加 VRRP 时只指定了 'interface' 参数。它是唯一需要手动设置的参数。其他参数如果未指定，将设置为其默认值：`vrid=1, priority=100` 和 `authentication=none`。

:::warning
如果 VRRP 上配置的地址与路由器任何其他接口上的地址属于同一子网，则 VRRP 接口上的地址必须使用 /32 子网掩码。

:::

在 VRRP 能够正确运行之前，ether1 上需要有一个正确的 IP 地址。在此示例中，它是 192.168.1.2/24。

### IPv6 {#ipv6}

要使 VRRP 在 IPv6 网络中工作，必须启用几个附加选项——需要 v3 支持，并且协议类型应设置为 IPv6：

```ros
/interface/vrrp/add name=vrrp1 interface=ether1 version=3 v3-protocol=ipv6
```

现在 VRRP 接口已设置好，我们可以添加全局地址并启用 ND 通告：

```ros
/ipv6/address/add address=FEC0:0:0:FFFF::1/64 advertise=yes interface=vrrp1
```

不需要像 IPv4 情况那样进行额外的地址配置。IPv6 使用链路本地地址在节点之间通信。
