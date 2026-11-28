---
title: "VRRP"
description: "本页介绍 MikroTik RouterOS 中的 Virtual Router Redundancy Protocol（VRRP），说明其如何通过 IPv4/IPv6 组播通信和路由器之间的优先级选举提供路由器冗余。内容涵盖 VRRP 配置、虚拟 MAC 地址分配、owner/master/backup 角色，并强调版本兼容性以及 VRRPv 中已弃用认证的警告。"
tags:
  - 'vrrp'
  - 'routing-redundancy'
source: https://manual.mikrotik.com/docs/7.25/high-availability-solutions/vrrp
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "internet-of-things"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

本章介绍 RouterOS 对虚拟路由器冗余协议（VRRP）的支持。

通常在大型 LAN 中使用动态路由协议（OSPF 或 RIP）；但是，多种因素可能导致不适合使用动态路由协议。一种替代方案是使用静态路由，但如果静态配置的下一跳发生故障，主机将无法与其他主机通信。

在 IPv6 网络中，主机通过接收邻居发现（ND）协议使用的路由器通告来了解路由器。ND 已内置用于确定不可达路由器的机制。但是，检测不可达路由器可能需要长达 38 秒。可以更改参数以加快检测速度，但这会增加 ND 流量的开销，尤其是在主机数量较多时。VRRP 可在 3 秒内检测不可达路由器，且不会增加额外的流量开销。

虚拟路由器冗余协议（VRRP）通过将多台路由器组合成一个称为 *Virtual Router*（VR）的逻辑组来提供解决方案。RouterOS 中的 VRRP 实现基于 VRRPv2 RFC 3768 和 VRRPv3 RFC 5798。

建议对用于实现 VRRP 且使用相同 VRID 的所有设备使用相同版本的 RouterOS。

:::warning
根据 RFC，VRRP v3 已弃用认证。
:::

## 协议概述 {#protocol-overview}

![](/img/0340e63898c1565e.webp)

VRRP 的目的是与所有关联到 Virtual Router ID 的 VRRP 路由器通信，并通过它们之间的优先级选举过程支持路由器冗余。

所有消息均通过 IPv4 或 IPv6 组播数据包发送，使用协议 112（VRRP）。IPv4 数据包的目的地址为 *224.0.0.18*，IPv6 数据包的目的地址为 *FF02:0:0:0:0:0:0:12*。数据包的源地址始终为发送数据包的接口的主 IP 地址。在 IPv6 网络中，源地址为接口的链路本地地址。

这些数据包始终以 TTL=255 发送，不会被路由器转发。如果路由器因任何原因收到 TTL 较低的数据包，则会丢弃该数据包。

每个 VR 节点都有一个分配的 MAC 地址。该 MAC 地址用作 Master 发送的所有周期性消息的源地址。

Virtual Router 由 VRID 和一组映射的 IPv4 或 IPv6 地址定义。master 路由器称为映射的 IPv4/IPv6 地址的 **owner**。IPv4 和 IPv6 使用相同 VRID 没有限制；但是，它们将是两个不同的 Virtual Router。

只有 Master 路由器发送周期性 Advertisement 消息，以尽量减少流量。backup 只有在优先级更高且未禁止抢占时才会尝试抢占 Master。

:::tip
属于同一 VR 的所有 VRRP 路由器必须配置相同的 advertisement interval。如果 interval 不匹配，路由器将丢弃收到的 advertisement 数据包。
:::

## 虚拟路由器（VR） {#virtual-router-vr}

Virtual Router（VR）由一个 Owner 路由器和一个或多个属于同一网络的 backup 路由器组成。

VR 包括：

- 每台 VRRP 路由器上都配置 VRID。
- 每台路由器上都配置相同的虚拟 IP。
- 每台路由器上都配置 Owner 和 Backup。在给定 VR 上只能有一个 Owner。

### 虚拟 MAC 地址 {#virtual-mac-address}

VRRP 会根据 VRRP 数据包的标准 MAC 前缀和 VRID 编号，自动为 VRRP 接口分配 MAC 地址。前五个八位组为 00:00:5E:00:01，最后一个八位组为配置的 VRID。例如，如果 Virtual Router 的 VRID 为 49，则虚拟 MAC 地址为 *00:00:5E:00:01:31*。

:::warning
虚拟 MAC 地址无法手动设置或编辑。
:::

### Owner

VR 的 Owner 路由器是默认 Master 路由器，并作为 VR 中所有包含子网的 Owner。Owner 路由器上的 Priority 必须为最高值（255），并且虚拟 IP 与真实 IP 相同（拥有虚拟 IP 地址）。

:::warning
RouterOS 无法配置为 Owner。除非将非 RouterOS 设备设置为 owner，否则 Pure 虚拟 IP 配置是唯一有效的配置。
:::

### Master

VR 中的 master 路由器作为其所配置网络的物理网关运行。Master 的选择由 Priority 值控制。Master 状态描述 Master 路由器的行为。在示例网络中，**R1** 是 Master 路由器。当 R1 不再可用时，R2 将成为 master。

### 备份 {#backup}

VR 必须至少包含一台 Backup 路由器。Backup 路由器必须配置与该 VR 的 Master 相同的虚拟 IP。Backup 路由器的默认优先级为 100。当当前 master 路由器不可用时，优先级最高的 backup 路由器将成为当前 master。每当优先级更高的路由器变为可用时，它都会切换为 master。有时不需要这种行为。要覆盖该行为，应禁用抢占模式。

### 虚拟地址 {#virtual-address}

![](/img/8599472e34cd8357.webp)

与 VR 关联的虚拟 IP 必须在所有 VR 节点上相同并进行设置。所有虚拟地址和真实地址都应来自同一网络。

:::warning
RouterOS 不能配置为 Owner。VRRP 地址和真实 IP 地址不应相同。
:::

如果 VR 的 Master 关联了多个 IP 地址，则属于同一 VR 的 Backup 路由器也必须关联相同的虚拟 IP 地址集合。如果 Master 上的虚拟地址未同时配置在 Backup 上，则存在配置错误，VRRP 通告数据包将被丢弃。

所有 Virtual Router 成员都可以配置为虚拟 IP 与物理 IP 不同。此类虚拟地址可称为浮动 IP 地址或纯虚拟 IP 地址。这种设置的优点是管理员具有更大的灵活性。由于虚拟 IP 地址不是任何参与路由器的真实地址，管理员可以更改这些物理路由器或其地址，而无需重新配置虚拟路由器本身。

在 IPv6 网络中，第一个地址始终是与 VR 关联的链路本地地址。如果配置了多个 IPv6 地址，则这些地址会在链路本地地址之后添加到通告数据包中。

### IPv4 ARP

对于给定 VR，Master 使用 VR 分配的 MAC 地址响应 ARP 请求。虚拟 MAC 地址也用作 Master 发送的通告数据包中的源 MAC 地址。对于非虚拟 IP 地址的 ARP 请求，路由器使用系统 MAC 地址响应。Backup 路由器不响应虚拟 IP 的 ARP 请求。

### IPv6 ND

如你所知，在 IPv6 网络中，使用邻居发现协议代替 ARP。当路由器成为 Master 时，会为与虚拟路由器关联的每个 IPv6 地址发送带有 Router Flag 的主动 ND Neighbor Advertisement。

## VRRP 状态机 {#vrrp-state-machine}

![](/img/2ab58b3889e511d8.webp)

如你从图中所见，每个 VRRP 节点可以处于以下三种状态之一：

- 初始状态
- 备份状态
- 主状态

### 初始状态 {#init-state}

该状态用于等待 Startup 事件。收到该事件后，将执行以下操作：

- 如果 priority 为 255：
- \* 对于 IPv4，发送 advertisement 数据包并广播 ARP 请求。
- \* 对于 IPv6，为与虚拟路由器关联的每个 IPv6 地址发送未经请求的 ND Neighbor Advertisement，并将 target address 设置为与 VR 关联的 link-local 地址。
- \* 转换到 MASTER 状态。
- 否则转换到 BACKUP 状态。

### 备份状态 {#backup-state}

处于 backup 状态时：

- 在 IPv4 网络中，节点不响应 ARP 请求，也不转发与 VR 关联的 IP 的流量。
- 在 IPv6 网络中，节点不响应 ND Neighbor Solicitation 消息，也不为与 VR 关联的 IPv6 地址发送 ND Router Advertisement 消息。

路由器的主要任务是接收 advertisement 数据包并检查 master 节点是否可用。

备份路由器将在两种情况下转换为 master 状态：

- 如果 advertisement 数据包中的 priority 为 0。
- 当 Preemption\_Mode 设置为 yes 且 ADVERTISEMENT 中的 Priority 低于本地 Priority 时。

切换到 Master 状态后，节点将：

- 在 IPv4 中广播 gratuitous ARP 请求。
- 在 IPv6 中为每个关联的 IPv6 地址发送未经请求的 ND Neighbor Advertisement。

在其他情况下，通告数据包将被丢弃。收到 shutdown 事件时，切换到 Init 状态。

:::warning
如果 Owner 路由器变为可用，将忽略抢占模式。
:::

### Master 状态 {#master-state}

设置为 MASTER 状态后，节点将作为 VR 关联 IPv4/IPv6 地址的转发路由器。

在 IPv4 网络中，Master 节点会响应针对 VR 关联 IPv4 地址的 ARP 请求。在 IPv6 网络中，Master 节点：

- 响应针对关联 IPv6 地址的 ND Neighbor Solicitation 消息。
- 为关联的 IPv6 地址发送 ND Router Advertisements。

如果 master 节点收到通告数据包：

- 如果 priority 为 0，则立即发送通告。
- 如果通告数据包中的 priority 大于节点的 priority，则切换到 backup 状态。
- 如果通告数据包中的 priority 等于节点的 priority，并且发送方的主 IP 地址大于本地主 IP 地址，则切换到 backup 状态。
- 其他情况下忽略通告。

收到 shutdown 事件时，发送 priority=0 的通告数据包并切换到 Init 状态。

### 连接跟踪同步 {#connection-tracking-synchronization}

与不同的高可用性功能类似，RouterOS v7 支持 VRRP 连接跟踪同步。

VRRP 连接跟踪同步要求 RouterOS [连接跟踪](/docs/7.24/firewall-and-quality-of-service/connection-tracking)正在运行。默认情况下，连接跟踪工作在 `auto` 模式。如果 VRRP 设备不包含任何防火墙规则，则需要手动启用连接跟踪：

```ros
/ip/firewall/connection/tracking/set enabled=yes
```

要同步连接跟踪条目，请按如下方式配置设备：

```ros
/interface/vrrp/set vrrp1 sync-connection-tracking=yes
```

在 logging 部分验证配置：

```ros
16:14:06 vrrp,info vrrp1 now MASTER, master down timer
16:14:06 vrrp,info vrrp1 stop CONNTRACK
16:14:06 vrrp,info vrrp1 starting CONNTRACK MASTER
```

连接跟踪条目仅从 Master 设备同步到 Backup 设备。

当同时启用 `sync-connection-tracking` 和 `preemption-mode`，并且具有更高 VRRP 优先级的路由器上线时，会先同步连接，之后该具有更高优先级的路由器才会成为 VRRP master。

:::tip
如果在两台设备之间配置了多个 VRRP 接口，并且需要 `sync-connection-tracking=yes`，则只能在一个 VRRP 接口上启用该功能，建议选择指定为 `group-authority` 的接口。
:::

`connection-tracking-mode` 配置示例：
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

VRRP 实例运行在 LAN 和 WAN 网络上，二者之间通过 NAT 连接。如果同一台设备上的一个 VRRP 实例为 Master，而另一个为 Backup，则会因 NAT 故障导致整个网络异常。将 LAN 和 WAN 的 VRRP 接口分组，可确保二者同时为 VRRP Master 或 Backup。在 VRRP 组中，只有组权威发送 VRRP 通告。在典型的 WAN+LAN 设置中，应将 LAN 网络用作组权威，以将 VRRP 控制流量保持在内部网络中。
```
/interface/vrrp
add name=vrrp-wan interface=sfp-sfpplus1 vrid=1 priority=100
add name=vrrp-lan interface=bridge1 vrid=2 priority=100
set [find] group-authority=vrrp-lan
```

## 配置 VRRP {#configuring-vrrp}

### IPv4

设置虚拟路由器非常简单，只需执行两个操作：创建 VRRP 接口并设置虚拟路由器的 IP 地址。

例如，将 VRRP 添加到 ether1，并将 VR 的地址设置为 192.168.1.1

```ros
/interface/vrrp/add name=vrrp1 interface=ether1
/ip/address/add address=192.168.1.2/24 interface=ether1
/ip/address/add address=192.168.1.1/32 interface=vrrp1
```

请注意，添加 VRRP 时仅指定了“interface”参数。这是唯一需要手动设置的参数。其他参数如果未指定，将采用默认值：`vrid=1, priority=100` 和 `authentication=none`。

:::warning
如果 VRRP 上配置的地址与路由器任何其他接口上的地址位于同一子网，则 VRRP 接口上的地址必须使用 /32 网络掩码。
:::

VRRP 要正常运行，ether1 上必须配置正确的 IP 地址。在本例中，该地址为 192.168.1.2/24。

### IPv6

要使 VRRP 在 IPv6 网络中工作，必须启用几个附加选项：需要启用 v3 支持，并将协议类型设置为 IPv6：

```ros
/interface/vrrp/add name=vrrp1 interface=ether1 version=3 v3-protocol=ipv6
```

设置 VRRP 接口后，可以添加全局地址并启用 ND 通告：

```ros
/ipv6/address/add address=FEC0:0:0:FFFF::1/64 advertise=yes interface=vrrp1
```

与 IPv4 情况不同，无需额外配置地址。IPv6 使用链路本地地址在节点之间通信。
