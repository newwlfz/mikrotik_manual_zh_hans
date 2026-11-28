---
title: "VLAN"
description: "本页介绍 MikroTik RouterOS 中的 VLAN 功能，说明如何基于 IEEE 802.1Q 标准创建和管理 Virtual LAN，以实现高效的网络分段，并详细介绍 VLAN 接口、trunking、Q-in-Q 标记和接口属性。"
tags:
  - 'vlan'
  - 'ieee-802-1q'
  - 'arp'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/vlan
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "bridging-and-switching/swos"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/interface/vlan`

**标准：** `IEEE 802.1Q, IEEE 802.1ad`

虚拟局域网（VLAN）是一种第 2 层方法，允许在单个物理接口（以太网、无线等）上运行多个虚拟 LAN，从而高效隔离 LAN。

可以使用 MikroTik RouterOS（以及 Cisco IOS、Linux 和其他路由器系统）标记这些数据包，并接受和路由已标记的数据包。

由于 VLAN 工作在 OSI 第 2 层，因此可以像其他网络接口一样使用，没有任何限制。VLAN 可以正常通过普通以太网网桥。

也可以通过无线链路传输 VLAN，并在单个无线接口上放置多个 VLAN 接口。请注意，由于 VLAN 不是完整的隧道协议（即，它没有额外字段来传输发送方和接收方的 MAC 地址），因此通过 VLAN 进行桥接的限制与桥接普通无线接口的限制相同。换句话说，虽然无线客户端可以参与放置在无线接口上的 VLAN，但无法将处于 station 模式的无线接口上的 VLAN 与任何其他接口桥接。

## 802.1Q

虚拟局域网（VLAN）最常用的协议是 IEEE 802.1Q。它是一种标准化封装协议，定义了如何将四字节 VLAN 标识符插入以太网报头。

每个 VLAN 都被视为独立的子网。这意味着默认情况下，特定 VLAN 中的主机无法与另一个 VLAN 中的主机通信，即使它们连接到同一交换机。因此，如果需要 VLAN 间通信，则需要使用路由器。RouterOS 每个接口最多支持 4094 个 VLAN 接口，每个接口都有唯一的 VLAN ID。也可以使用和操作 VLAN 优先级。

当 VLAN 跨越多个交换机时，交换机间链路必须成为“trunk”，数据包会被打上标签，以指示其所属 VLAN。trunk 承载多个 VLAN 的流量；它类似于点到点链路，在交换机之间或交换机与路由器之间承载带标签的数据包。

:::info
IEEE 802.1Q 标准保留了具有特殊用途的 VLAN ID；在通用 VLAN 配置中不应使用以下 VLAN ID：0、1、4095
:::

## Q-in-Q

原始 802.1Q 仅允许一个 VLAN 头；而 Q-in-Q 允许两个或更多 VLAN 头。在 RouterOS 中，可以通过在一个 VLAN 接口之上添加另一个 VLAN 接口来配置 Q-in-Q。示例：

```ros
/interface/vlan
add name=vlan1 vlan-id=11 interface=ether1
add name=vlan2 vlan-id=12 interface=vlan1
```

如果通过“vlan2”接口发送任何数据包，则会在 Ethernet 头中添加两个 VLAN 标签：“11”和“12”。

## 属性 {#properties}

**子菜单：** `/interface/vlan`

| 属性 | 说明 |
| :-- | :-- |
| **arp** (*disabled \| enabled \| local-proxy-arp \| proxy-arp \| reply-only*；默认值：**enabled**) | 地址解析协议设置<ul><li><span className="ros-icon-success"><code>disabled</code></span> - 接口不使用 ARP</li><li><span className="ros-icon-success"><code>enabled</code></span> - 接口使用 ARP</li><li><span className="ros-icon-success"><code>local-proxy-arp</code></span> - 路由器在该接口上执行代理 ARP，并将回复发送到同一接口</li><li><span className="ros-icon-success"><code>proxy-arp</code></span> - 路由器在该接口上执行代理 ARP，并将回复发送到其他接口</li><li><span className="ros-icon-success"><code>reply-only</code></span> - 接口仅回复来自 IP 地址/MAC 地址组合匹配的请求，这些组合需作为静态条目输入到 IP/ARP 表中。IP/ARP 表中不会自动存储动态条目。因此，要使通信成功，必须已存在有效的静态条目。</li></ul> |
| **arp-timeout** (*auto \| integer*；默认值：**auto**) | 在不再从 IP 收到数据包后，ARP 记录在 ARP 表中保留的时间。值 `auto` 等于 IP/Settings 中的 `arp-timeout` 值，默认值为 30s。 |
| **arp-accept** (*yes \| no*；默认值：**no**) | 定义接受来自尚未存在于 ARP 表中的设备的无偿 ARP（GARP）帧的行为：<ul><li><span className="ros-icon-success"><code>no</code></span> - 不在 ARP 表中创建新条目</li><li><span className="ros-icon-success"><code>yes</code></span> - 在 ARP 表中创建新条目</li></ul> 该设置自 RouterOS 7.25.1 版本起可用。 |
| **disabled** (*yes \| no*；默认值：**no**) | 更改接口是否禁用。 |
| **interface** (*name*；默认值： ) | VLAN 运行所基于的接口名称。 <br/><br/><strong>重要：</strong>将 VLAN 接口添加到启用了 vlan-filtering 的 <a href="/docs/bridging-and-switching#bridge-vlan-filtering">网桥</a> 会自动将该网桥接口标记为成员端口。带有注释 "added by vlan on bridge" 的动态条目将出现在 <code>/interface/bridge/vlan</code> 菜单下。 <br/> |
| **l3-hw-offloading** (*yes \| no*；默认值：**yes**) | 按 VLAN 接口启用或禁用 [L3HW](/docs/bridging-and-switching/l3-hardware-offloading)。该设置仅适用于支持 L3HW 卸载的设备，并自 RouterOS v7.21 起可用。详情请参阅 [Per-VLAN offloading](/docs/bridging-and-switching/l3-hardware-offloading#per-vlan-offloading)。 |
| **mvrp** (*yes \| no*；默认值：**no**) | 指定该 VLAN 是否应通过多 VLAN 注册协议（MVRP）作为申请者声明其属性。其主要用途是用于在以太网接口上创建的 VLAN（例如“router on a stick”设置），该接口连接到支持 [MVRP](/docs/bridging-and-switching/vlan#mvrp) 的网桥。在已属于启用 MVRP 的网桥的 VLAN 接口上启用此选项无效，因为此时由网桥管理 MVRP。该属性仅在 `use-service-tag` 禁用时生效。 |
| **mtu** (*integer: 68..65535*；默认值：**1500**) | 第 3 层最大传输单元 |
| **name** (*string*；默认值： ) | 接口名称 |
| **use-service-tag** (*yes \| no*；默认值： ) | 兼容 IEEE 802.1ad 的 Service Tag |
| **vlan-id** (*integer: 1..4094*；默认值：**1**) | 用于区分 VLAN 的虚拟 LAN 标识符或标签。属于同一 VLAN 的所有计算机必须设置相同的值。 |

:::info
MTU 应设置为 1500 字节，与 Ethernet 接口相同。但对于某些不支持接收/发送带有 VLAN 头（1500 字节数据 + 4 字节 VLAN 头 + 14 字节 Ethernet 头）的完整 Ethernet 数据包的 Ethernet 网卡，这可能不起作用。在这种情况下，可以使用 MTU 1496，但请注意，如果必须通过接口发送更大的数据包，这将导致数据包分片。同时，请记住，如果源端和目的端之间的路径 MTU 发现无法正常工作，MTU 1496 可能会导致问题。
:::

## 配置示例 {#setup-examples}

---

### 视频示例 {#video-examples}

[VLANs pt1](http://youtube.com/watch?v=US2EU6cgHQU), [VLANs pt2](http://youtube.com/watch?v=YMwOrc0LDP8), [VLANs pt3](http://youtube.com/watch?v=7a_z1jAdIME)

### Layer2 VLAN 示例 {#layer2-vlan-examples}

可以使用多种配置，但每种配置类型都针对特定设备集设计，因为某些配置方法可让你利用内置交换芯片的优势，并获得更高的吞吐量。请查看 [Basic VLAN switching](/docs/7.24/bridging-and-switching/user-guides/basic-vlan-switching) 指南，了解每种设备类型应使用哪种配置，以获得尽可能高的吞吐量和兼容性。该指南展示了如何设置非常基础的 VLAN trunk/access 端口配置。

设置 VLAN 标记或 VLAN 交换还有其他方法，但推荐使用 [Bridge VLAN Filtering](/docs/7.24/bridging-and-switching/vlan#bridge-vlan-filtering)。请确保未使用任何 [known Layer2 misconfigurations](/docs/7.24/bridging-and-switching/user-guides/layer2-misconfiguration)。

### Layer3 VLAN 示例 {#layer3-vlan-examples}

#### 简单 VLAN 路由 {#simple-vlan-routing}

假设有几台 MikroTik 路由器连接到一个集线器。请记住，集线器是 OSI 物理层设备（如果路由器之间有集线器，那么从 L3 的角度来看，它与它们之间的以太网线缆连接相同）。为简化说明，假设所有路由器都通过 ether1 接口连接到集线器，并已按下图所示分配 IP 地址。然后在每台路由器上创建 VLAN 接口。

下面显示了 R2 和 R4 的配置：

R2:

```ros
[admin@MikroTik] /interface/vlan> add name=VLAN2 vlan-id=2 interface=ether1 disabled=no

[admin@MikroTik] /interface/vlan> print 
Flags: X - disabled, R - running, S - slave 
 #    NAME                  MTU   ARP        VLAN-ID INTERFACE                
0 R  VLAN2                 1500  enabled    2       ether1
```

R4:

```ros
[admin@MikroTik] /interface/vlan> add name=VLAN2 vlan-id=2 interface=ether1 disabled=no

[admin@MikroTik] /interface/vlan> print 
Flags: X - disabled, R - running, S - slave 
 #    NAME                  MTU   ARP        VLAN-ID INTERFACE                
0 R  VLAN2                 1500  enabled    2       ether1
```

下一步是为 VLAN 接口分配 IP 地址。

R2:

```ros
 [admin@MikroTik] /ip/address> add address=10.10.10.3/24 interface=VLAN2
 [admin@MikroTik] /ip/address> print
 Flags: X - disabled, I - invalid, D - dynamic
   #   ADDRESS            NETWORK         BROADCAST       INTERFACE
   0   10.0.1.4/24        10.0.1.0        10.0.1.255      ether1
   1   10.20.0.1/24       10.20.0.0       10.20.0.255     pc1
   2   10.10.10.3/24      10.10.10.0      10.10.10.255    vlan2

 [admin@MikroTik] /ip/address> 
```

R4:

```ros
 [admin@MikroTik] /ip/address> add address=10.10.10.5/24 interface=VLAN2
 [admin@MikroTik] /ip/address> print
 Flags: X - disabled, I - invalid, D - dynamic
   #   ADDRESS            NETWORK         BROADCAST       INTERFACE
   0   10.0.1.5/24        10.0.1.0        10.0.1.255      ether1
   1   10.30.0.1/24       10.30.0.0       10.30.0.255     pc2
   2   10.10.10.5/24      10.10.10.0      10.10.10.255    vlan2

[admin@MikroTik] /ip/address> 
```

此时，应当可以从路由器 R2 ping 通路由器 R4，反之亦然：

```ros
 "Ping from R2 to R4:"

 [admin@MikroTik] /ip/address> /ping 10.10.10.5

 10.10.10.5 64 byte ping: ttl=255 time=4 ms

 10.10.10.5 64 byte ping: ttl=255 time=1 ms

 2 packets transmitted, 2 packets received, 0% packet loss

 round-trip min/avg/max = 1/2.5/4 ms

 "From R4 to R2:"
 
 [admin@MikroTik] /ip/address> /ping 10.10.10.3
 10.10.10.3 64 byte ping: ttl=255 time=6 ms
 10.10.10.3 64 byte ping: ttl=255 time=1 ms
 2 packets transmitted, 2 packets received, 0% packet loss
 round-trip min/avg/max = 1/3.5/6 ms 
```

要确认 VLAN 设置正常工作，请尝试从 R2 ping R1。如果 ping 超时，则说明 VLAN 已成功隔离。

```ros
 "From R2 to R1:"

 [admin@MikroTik] /ip/address> /ping 10.10.10.2
 10.10.10.2 ping timeout
 10.10.10.2 ping timeout
 3 packets transmitted, 0 packets received, 100% packet loss 
```

#### VLAN 间路由 {#intervlan-routing}

如果在交换机上实现了相互独立的 VLAN，则需要路由器来提供 VLAN 之间的通信。交换机工作在 OSI 第 2 层，因此它仅使用以太网报头进行转发，不会检查 IP 报头。因此，必须使用作为每个 VLAN 网关的路由器。没有路由器时，主机无法与其自身 VLAN 之外的网络通信。上述 VLAN 之间的路由过程称为 VLAN 间通信。

为说明 VLAN 间通信，我们将创建一条 trunk，用于在 Mikrotik 路由器和支持 VLAN trunking 的可管理交换机之间的单条链路上承载来自三个 VLAN（VLAN2、VLAN3 和 VLAN4）的流量：

如上图所示，每个 VLAN 都有各自独立的子网（广播域）：

- VLAN 2 – 10.10.20.0/24。
- VLAN 3 – 10.10.30.0/24。
- VLAN 4 – 10.10.40.0/24。

大多数交换机上的 VLAN 配置都很直接。需要定义哪些端口属于 VLAN，并定义一个“trunk”端口，用于在交换机和路由器之间承载带标签的帧。

创建 VLAN 接口：

```ros
/interface/vlan
add name=VLAN2 vlan-id=2 interface=ether1 disabled=no
add name=VLAN3 vlan-id=3 interface=ether1 disabled=no
add name=VLAN4 vlan-id=4 interface=ether1 disabled=no
```

为 VLAN 添加 IP 地址：

```ros
/ip/address 
add address=10.10.20.1/24 interface=VLAN2
add address=10.10.30.1/24 interface=VLAN3
add address=10.10.40.1/24 interface=VLAN4
```

#### RouterOS /32 和 IP unnumbered 地址 {#routeros-32-and-ip-unnumbered-addresses}

在 RouterOS 中，要使用地址创建点对点隧道，必须使用网络掩码为“/32”的地址，它实际上提供与某些厂商的 unnumbered IP 地址相同的功能。

有 2 台路由器 RouterA 和 RouterB，它们分别属于网络 10.22.0.0/24 和 10.23.0.0/24，要使用 VLAN 作为承载连接这些路由器，配置如下：

RouterA:

```ros
 /ip/address/add address=10.22.0.1/24 interface=ether1
 /interface/vlan/add interface=ether2 vlan-id=1 name=vlan1
 /ip/address/add address=10.22.0.1/32 interface=vlan1 network=10.23.0.1
 /ip/route/add gateway=10.23.0.1 dst-address=10.23.0.0/24 
```

RouterB:

```ros
 /ip/address/add address=10.23.0.1/24 interface=ether1
 /interface/vlan/add interface=ether2 vlan-id=1 name=vlan1
 /ip/address/add address=10.23.0.1/32 interface=vlan1 network=10.22.0.1
 /ip/route/add gateway=10.22.0.1 dst-address=10.22.0.0/24 
```
