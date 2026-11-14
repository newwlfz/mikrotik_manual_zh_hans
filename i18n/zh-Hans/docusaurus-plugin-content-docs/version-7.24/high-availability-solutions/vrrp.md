---
sidebar_key: "high-availability-solutions/vrrp"
sidebar_position: 5
title: "VRRP"
sidebar_label: "VRRP"
description: "本页介绍 MikroTik RouterOS 中的虚拟路由冗余协议（VRRP），说明它如何通过 IPv4/IPv6 组播通信以及路由器之间基于优先级的选举来提供路由器冗余。内容涵盖 VRRP 配置、虚拟 MAC 地址分配、owner/master/backup 角色，并强调版本兼容性以及对 VRRPv 中已弃用认证功能的警告"
tags:
  - 'vrrp'
  - 'routing-redundancy'
source: https://manual.mikrotik.com/docs/7.24/high-availability-solutions/vrrp
captured_at: '2026-11-04T11:29:58+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
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

## 参数 {#parameters}

VRRP 接口参数。

**子菜单：** `/interface/vrrp`

##### 可写设置 {#writable-settings}

| 属性 | 描述 |
| :-- | :-- |
| **arp** (*disabled \| enabled \| proxy-arp \| reply-only*; 默认值：**enabled**) | ARP 解析协议模式。 |
| **arp-timeout**(*integer;* 默认值：**auto**) | 在未从 IP 收到任何数据包后，ARP 记录在 ARP 表中保留多长时间。值 `auto` 等于 IP/Settings 中的 `arp-timeout` 值，默认为 3。 |
| **authentication** (*ah \| none \| simple*; 默认值：**none**) | 用于 VRRP 通告报文的认证方法。- `none` - 仅用于低安全性网络，例如 LAN 上的两个 VRRP 节点。- `ah` - IP Authentication Header。此算法可针对配置错误、重放攻击以及报文损坏或修改提供强保护。当您对 LAN 上节点的管理控制有限时，应使用它。使用 HMAC-MD5。- `simple` - 使用明文密码。可防止本地网络上路由器意外配置错误。 |
| **comment** (*string*; 默认值: ) | 接口的简短描述。 |
| **connection-tracking-mode** (*active-active \| passive-active*; 默认值：**passive-active**) | 指定连接跟踪同步的模式。此设置仅在启用 `sync-connection-tracking=yes` 时相关。- `passive-active` - 将此模式用于传统 VRRP 设置，即一个 Master 和一个或多个 Backup 路由器。在此模式下，只有 Master 设备通过向 Backup 设备发送更新来执行连接跟踪同步。Backup 设备不发送连接跟踪数据。- `active-active` - 将此模式用于具有多个 VRRP 组以实现负载均衡的设置。每个 VRRP 组都有自己的 Master，这些 Master 可以位于不同的物理设备上。在 `active-active` 模式下，所有活动 Master 可以相互同步连接跟踪数据。active-active 模式下的每个 VRRP 组必须使用**唯一的** `connection-tracking-port` 值。在多个组之间复用相同端口可能导致连接跟踪表不同步。**重要：** 将多个 VRRP 组与 `passive-active` 模式一起使用可能导致连接跟踪表不同步，因为只有一个 Master 处理同步，其他 Master 不交换跟踪数据。示例配置：<pre><code>R1`/interface/vrrp`add connection-tracking-mode=active-active connection-tracking-port=8275 interface=ether1 name=vrrp30 priority=100 sync-connection-tracking=yes vrid=1add connection-tracking-mode=active-active connection-tracking-port=8276 interface=ether1 name=vrrp40 priority=100 sync-connection-tracking=yes vrid=2R2`/interface/vrrp`add connection-tracking-mode=active-active connection-tracking-port=8275 interface=ether1 name=vrrp30 priority=55 sync-connection-tracking=yes vrid=1add connection-tracking-mode=active-active connection-tracking-port=8276 interface=ether1 name=vrrp40 priority=155 sync-connection-tracking=yes vrid=2</code></pre> |
| **connection-tracking-port** (*integer;* 默认值：**8275**) | 指定用于连接跟踪同步的 UDP 端口。此设置仅在启用 `sync-connection-tracking=yes` 时相关。 |
| **group-authority** (*none \| self \| vrrp-interface;* 默认值：**none**) | 允许将多个 VRRP 接口分组，使它们共享相同的 VRRP 状态。在一个组内，会选择一个 group authority 接口。它控制其他组成员的状态，并且是唯一发送 VRRP 通告的接口。当 group-authority VRRP 接口转换到 Backup 状态时，所有组成员也会转换到 Backup 状态。如果检测到任何组成员发生故障，例如由于其父接口链路断开，则所有组成员都会转换到 failure 状态。- `none` - VRRP 接口不分组，独立运行，并具有自己的 VRRP 状态机。- `self` - VRRP 接口充当 group authority。它控制其他分组的 VRRP 接口的状态机，并负责发送和接收 VRRP 通告。- `vrrp-interface` - VRRP 接口是组成员。其状态机跟随指定 VRRP 接口的状态。例如，VRRP 实例运行在 LAN 和 WAN 网络上，且它们之间有 NAT。如果同一设备上的一个 VRRP 实例是 Master，另一个是 Backup，则由于 NAT 故障，整个网络会出现故障。将 LAN 和 WAN VRRP 接口分组可确保二者要么都是 VRRP Master，要么都是 Backup。在 VRRP 组中，VRRP 通告仅由 group authority 发送。在典型的 WAN+LAN 设置中，应使用 LAN 网络作为 group authority，以将 VRRP 控制流量保留在内部网络中。<pre><code>`/interface/vrrp`add name=vrrp-wan interface=sfp-sfpplus1 vrid=1 priority=100add name=vrrp-lan interface=bridge1 vrid=2 priority=100set [find] group-authority=vrrp-lan</code></pre> |
| **interface** (*string;* 默认值： ) | 将在其上运行 VRRP 实例的接口名称。 |
| **interval** (*time [10ms..4m15s]*; 默认值：**1s**) | VRRP interval 定义 VRRP Master 路由器向 Backup 路由器发送 Advertisement 报文的频率。此间隔直接决定 Backup 接收 keepalive 信息的频率，该信息确认 Master 正在运行。较短的间隔会提高 Advertisement 报文的发送速率，从而可以更快检测到 Master 故障，但也会增加对丢包、处理延迟和定时器不准确的敏感性。较长的间隔可减少控制流量并提高稳定性，但代价是故障切换检测更慢。Master Down 间隔由配置的 VRRP interval 和路由器优先级推导得出，其计算会允许在触发故障切换前错过多个 Advertisement。**警告：** 配置低于 1 秒的 VRRP interval 可能导致不可预测的行为和意外的 Master 角色变更。 |
| **mtu** (*只读*; 默认值： ) | 三层 MTU 大小。自 RouterOS v7.7 起，VRRP 接口始终使用 slave 接口 MTU。 |
| **name** (*string;* 默认值： ) | VRRP 接口名称。 |
| **on-backup** (*string;* 默认值： ) | 当节点切换到 Backup 状态时执行的脚本。 |
| **on-master** (*string;* 默认值： ) | 当节点切换到 Master 状态时执行的脚本。 |
| **on-fail** (*string;* 默认值： ) | 当节点失败时执行的脚本。 |
| **password** (*string;* 默认值： ) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 认证所需的密码。如果不使用认证，可以忽略。 |
| **preemption-mode** (*yes \| no*; 默认值：**yes**) | Master 节点是否始终拥有优先级。设置为 'no' 时，即使 Backup 节点具有比当前 Master 更高的优先级，Backup 节点也不会被选举为 Master，直到当前 Master 失败。如果 Owner 路由器变为可用，则忽略此设置。 |
| **priority** (*integer: 1..254*; 默认值：**100**) | 用于 Master 选举算法的 VRRP 节点优先级。数字越大表示优先级越高。'255' 保留给拥有 VR IP 的路由器，'0' 保留给 Master 路由器以表示它正在释放职责。 |
| **remote-address** (*IPv4;* 默认值： ) | 指定用于连接跟踪同步的另一个 VRRP 路由器的远程地址。如果未设置，系统会通过 VRRP 自动检测远程地址。仅当 `sync-connection-tracking=yes` 时使用远程地址。显式设置远程地址有以下好处：- 连接跟踪同步启动更快，因为无需等待 VRRP 的初始消息交换来检测远程地址。- VRRP Master 选举更快。- 连接跟踪数据可以通过不同的网络接口发送，例如两台路由器之间的专用安全线路。同步连接跟踪使用 UDP 端口 8275。 |
| **v3-checksum-as-v2** (*yes \| no*; 默认值：**no**) | 控制 VRRPv3 IPv4 校验和是在包含还是不包含 IPv4 伪首部的情况下计算。不同厂商对 RFC 5798 第 5.2.8 节中 IPv4 校验和计算里的伪首部有不同解释。基于 Linux 的实现（包括 FRR）会为 IPv4 和 IPv6 都包含伪首部，而 Cisco 仅为 IPv6 包含伪首部。- `no`（默认值）- 在校验和计算中包含 IPv4 伪首部。与其他基于 Linux 的 VRRPv3 实现兼容。- `yes` - 在校验和计算中排除 IPv4 伪首部。将此设置用于与 Cisco 及其他不为 IPv4 包含伪首部的厂商兼容。此设置仅适用于使用 IPv4 的 VRRPv3。它对 VRRPv3 IPv6 或 VRRPv2 没有影响。**重要：** 同一虚拟路由器中的所有 VRRP 路由器必须对此设置使用相同的值。值不匹配会导致 "bad checksum" 错误，并且 VRRP 通告报文将被丢弃。 |
| **v3-protocol** (*ipv4 \| ipv6*; 默认值：**ipv4**) | VRRPv3 将使用的协议。仅在 **version** 为 3 时有效。 |
| **version** (*integer [2, 3]*; 默认值：**3**) | 要使用的 VRRP 版本。 |
| **vrid** (*integer: 1..255*; 默认值：**1**) | 虚拟路由器标识符。每个虚拟路由器必须具有唯一的 ID 编号。 |
| **sync-connection-tracking**(*string;* 默认值：**no**) | 将连接跟踪条目从 Master 同步到 Backup 设备。VRRP 连接跟踪同步要求 RouterOS [连接跟踪](../firewall-and-quality-of-service/connection-tracking.md) 正在运行。 |

##### 只读标志 {#read-only-flags}

| 属性 | 描述 |
| :-- | :-- |
| **backup** | VRRP 接口处于 Backup 状态。 |
| **disabled** | VRRP 接口已被用户禁用。 |
| **failure** | VRRP 接口处于 failure 状态，例如由于其父接口链路断开。 |
| **grp-authority** | VRRP 接口为 `group-authority`。它控制其他组成员的状态，并且是唯一发送 VRRP 通告的接口。 |
| **grp-member** | VRRP 接口是组成员。其状态机跟随指定的 `group-authority` 接口的状态。 |
| **invalid** | VRRP 接口处于 invalid 状态，例如由于配置错误。 |
| **master** | VRRP 接口处于 Master 状态。 |
