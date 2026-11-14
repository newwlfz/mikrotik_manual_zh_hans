---
sidebar_key: "bridging-and-switching/vlan"
sidebar_position: 8
title: "VLAN"
sidebar_label: "VLAN"
description: "本页面介绍 MikroTik RouterOS 中的 VLAN 功能，说明如何使用 IEEE 802.1Q 标准创建和管理虚拟局域网以实现高效的网络分段，并详细讲解 VLAN 接口、trunking、Q-in-Q 标记以及接口属性。"
tags:
  - 'vlan'
  - 'ieee-802-1q'
  - 'arp'
source: https://manual.mikrotik.com/docs/bridging-and-switching/vlan
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/interface/vlan`

**标准：** `IEEE 802.1Q, IEEE 802.1ad`

虚拟局域网（VLAN）是一种二层方法，允许在单个物理接口（以太网、无线等）上创建多个虚拟 LAN，从而能够高效地隔离各局域网。

您可以使用 MikroTik RouterOS（以及 Cisco IOS、Linux 和其他路由系统）为这些数据包打上标记，并接收和路由带标记的数据包。

由于 VLAN 工作在 OSI 第二层，因此它可以像任何其他网络接口一样使用，不受任何限制。VLAN 可以成功通过普通以太网网桥。

您还可以通过无线链路传输 VLAN，并在单个无线接口上放置多个 VLAN 接口。请注意，由于 VLAN 并非完整的隧道协议（即它没有用于传输发送方和接收方 MAC 地址的额外字段），因此通过 VLAN 进行桥接时，会存在与桥接普通无线接口相同的限制。换句话说，虽然无线客户端可以加入放置在无线接口上的 VLAN，但无法将放置在 station 模式无线接口上的 VLAN 与任何其他接口进行桥接。

## 802.1Q {#8021q}

虚拟局域网（VLAN）最常用的协议是 IEEE 802.1Q。它是一种标准化的封装协议，定义了如何将四字节的 VLAN 标识符插入以太网头中。

每个 VLAN 都被视为一个单独的子网。这意味着默认情况下，特定 VLAN 中的主机无法与属于另一个 VLAN 的主机通信，即使它们连接到同一台交换机。因此，如果您需要 VLAN 间通信，就需要一台路由器。RouterOS 每个接口最多支持 4094 个 VLAN 接口，每个接口都有唯一的 VLAN ID。VLAN 优先级也可以使用和调整。

当 VLAN 跨越一台以上交换机时，交换机之间的链路必须成为 'trunk'，此时数据包会被打上标签以指示其所属的 VLAN。trunk 承载多个 VLAN 的流量；它就像一条点对点链路，在交换机之间或交换机与路由器之间传输带标签的数据包。

:::info
IEEE 802.1Q 标准保留了一些具有特殊用途的 VLAN ID；以下 VLAN ID 不应在常规 VLAN 配置中使用：0、1、4095
:::

## Q-in-Q {#q-in-q}

原始的 802.1Q 仅允许一个 VLAN 头；而 Q-in-Q 则允许两个或更多 VLAN 头。在 RouterOS 中，可以通过在一个 VLAN 接口之上再添加一个 VLAN 接口来配置 Q-in-Q。例如：

```ros
/interface/vlan
add name=vlan1 vlan-id=11 interface=ether1
add name=vlan2 vlan-id=12 interface=vlan1
```

如果有任何数据包通过 'vlan2' 接口发送，则会在以太网头中添加两个 VLAN 标签 - '11' 和 '12'。

## 属性 {#properties}

**子菜单：** `/interface/vlan`

| 属性 | 描述 |
| :-- | :-- |
| **arp** (*disabled \| enabled \| local-proxy-arp \| proxy-arp \| reply-only*; 默认：**enabled**) | ARP 设置<ul><li><span className="ros-icon-success"><code>disabled</code></span> - 接口将不使用 ARP</li><li><span className="ros-icon-success"><code>enabled</code></span> - 接口将使用 ARP</li><li><span className="ros-icon-success"><code>local-proxy-arp</code></span> - 路由器在接口上执行代理 ARP，并向同一接口发送回复</li><li><span className="ros-icon-success"><code>proxy-arp</code></span> - 路由器在接口上执行代理 ARP，并向其他接口发送回复</li><li><span className="ros-icon-success"><code>reply-only</code></span> - 接口仅回复来自与 IP/ARP 表中静态条目匹配的 IP 地址/MAC 地址组合的请求。不会自动将动态条目存储到 IP/ARP 表中。因此，为使通信成功，必须已存在有效的静态条目。</li></ul> |
| **arp-timeout**（*auto \| integer*；默认值：**auto**） | 在未从该 IP 收到数据包后，ARP 记录在 ARP 表中保有的时长。值 `auto` 等同于 IP/Settings 中的 `arp-timeout` 值，默认为 30s。 |
| **arp-accept** (*yes \| no*; 默认值: **no**) | 定义对于来自尚未存在于 ARP 表中的设备所发送的免费 ARP（GARP）帧的接受行为：<ul><li><span className="ros-icon-success"><code>no</code></span> - 不在 ARP 表中创建新条目</li><li><span className="ros-icon-success"><code>yes</code></span> - 在 ARP 表中创建新条目</li></ul> 该设置自 RouterOS 7.25.1 版本起可用。 |
| **disabled** (*yes \| no*; 默认值: **no**) | 更改接口是否被禁用。 |
| **interface** (*name*; 默认：) | VLAN 将在其上工作的接口名称。 <br/><br/><strong>重要:</strong> 将 VLAN 接口添加到启用了 [vlan-filtering 的网桥](./index.md#bridge-vlan-filtering) 时，会自动将网桥接口标记为成员端口。带有注释 "added by vlan on bridge" 的动态条目将出现在 <code>/interface/bridge/vlan</code> 菜单下。 <br/> |
| **l3-hw-offloading** (*yes \| no*; 默认：**yes**) | 启用或禁用每个 VLAN 接口上的 [L3HW](./l3-hardware-offloading.md)。此设置仅适用于支持 L3HW 卸载的设备，并自 RouterOS v7.21 起可用。更多详情 - [按 VLAN 卸载](./l3-hardware-offloading.md#per-vlan-offloading)。 |
| **mvrp** (*yes \| no*; 默认：**no**) | 指定此 VLAN 是否应作为申请者通过 Multiple VLAN Registration Protocol (MVRP) 声明其属性。其主要用例是创建在 Ethernet 接口上（例如 "router on a stick" 设置）并连接到支持 [MVRP](./index.md#mvrp) 的网桥的 VLAN。在已属于启用 MVRP 的网桥的 VLAN 接口上启用此选项没有效果，因为在这种情况下由网桥管理 MVRP。仅当 `use-service-tag` 被禁用时，此属性才有效。 |
| **mtu** (*integer: 68..65535*; 默认：**1500**) | Layer3 最大传输单元 |
| **name** (*string*；默认：) | 接口名称 |
| **use-service-tag** (*yes \| no*; 默认：) | IEEE 802.1ad 兼容的 Service Tag |
| **vlan-id** (*integer: 1..4094*; 默认：**1**) | 用于区分 VLAN 的虚拟 LAN 标识符或标签。属于同一 VLAN 的所有计算机必须相同。 |

:::info
MTU 应设置为 1500 字节，与以太网接口上相同。但这可能不适用于某些以太网卡，它们不支持接收/发送添加了 VLAN 头的全尺寸以太网数据包（1500 字节数据 + 4 字节 VLAN 头 + 14 字节以太网头）。在这种情况下，可以使用 MTU 1496，但请注意，如果必须通过接口发送更大的数据包，这将导致数据包分片。同时请记住，如果源和目标之间的路径 MTU 发现工作不正常，MTU 1496 可能会导致问题。
:::

## 配置示例 {#setup-examples}

---

### 视频示例 {#video-examples}

[VLAN 第 1 部分](http://youtube.com/watch?v=US2EU6cgHQU)、[VLAN 第 2 部分](http://youtube.com/watch?v=YMwOrc0LDP8)、[VLAN 第 3 部分](http://youtube.com/watch?v=7a_z1jAdIME)

### 二层 VLAN 示例 {#layer2-vlan-examples}

有多种可能的配置可供使用，但每种配置类型都是为特定的设备集合而设计的，因为某些配置方法可以让您获得内置交换芯片的优势，并取得更大的吞吐量。请查看 [基础 VLAN 交换](./user-guides/basic-vlan-switching.md) 指南，了解每种类型的设备应使用哪种配置，以获得最大的可能吞吐量和兼容性。该指南展示了如何设置非常基本的 VLAN trunk/access 端口配置。

还有其他一些方式可以设置 VLAN 标记或 VLAN 交换，但推荐的方式是使用 [Bridge VLAN Filtering](./index.md#bridge-vlan-filtering)。请确保您没有使用任何[已知的二层错误配置](./user-guides/layer2-misconfiguration.md)。

### 三层 VLAN 示例 {#layer3-vlan-examples}

#### 简单的 VLAN 路由 {#simple-vlan-routing}

假设我们有多台 MikroTik 路由器连接到一个集线器。请记住，集线器是 OSI 物理层设备（如果路由器之间有一个集线器，那么从 L3 的角度来看，它与在它们之间用以太网线连接是一样的）。为简化起见，假设所有路由器都通过 ether1 接口连接到集线器，并且已按下图所示分配了 IP 地址。然后在每台路由器上创建 VLAN 接口。

R2 和 R4 的配置如下所示：

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

此时，应该可以从路由器 R2 ping 通路由器 R4，反之亦然：

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

为确保 VLAN 配置正常工作，请尝试从 R2 ping R1。如果 ping 超时，则说明 VLAN 已成功隔离。

```ros
 "From R2 to R1:"

 [admin@MikroTik] /ip/address> /ping 10.10.10.2
 10.10.10.2 ping timeout
 10.10.10.2 ping timeout
 3 packets transmitted, 0 packets received, 100% packet loss 
```

#### VLAN 间路由 {#intervlan-routing}

如果在交换机上实现了相互独立的 VLAN，则需要一台路由器来提供 VLAN 之间的通信。交换机工作在 OSI 第二层，因此它仅使用以太网头进行转发，而不检查 IP 头。因此，我们必须使用为每个 VLAN 充当网关的路由器。没有路由器，主机无法与自身 VLAN 之外通信。上述 VLAN 之间的路由过程称为 VLAN 间通信。

为了说明 VLAN 间通信，我们将创建一个 trunk，它会在一条连接 MikroTik 路由器和一台支持 VLAN trunk 的可管理交换机的链路上承载三个 VLAN（VLAN2、VLAN3 和 VLAN4）的流量。

如上图所示，每个 VLAN 都有自己独立的子网（广播域）：

- VLAN 2 – 10.10.20.0/24。
- VLAN 3 – 10.10.30.0/24。
- VLAN 4 – 10.10.40.0/24。

在大多数交换机上配置 VLAN 都很简单。我们需要定义哪些端口是 VLAN 的成员，并定义一个能在交换机和路由器之间承载带标签帧的 'trunk' 端口。

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

#### RouterOS /32 与 IP unnumbered 地址 {#routeros-32-and-ip-unnumbered-addresses}

在 RouterOS 中，要使用地址创建点到点隧道，您必须使用网络掩码为 '/32' 的地址，这实际上为您提供了与某些厂商的 unnumbered IP 地址相同的功能。

有两台路由器 RouterA 和 RouterB，它们分别属于网络 10.22.0.0/24 和 10.23.0.0/24，要使用 VLAN 作为承载连接这些路由器，配置如下：

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
