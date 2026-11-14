---
sidebar_key: "wireless/abgn/hwmpplus-mesh"
sidebar_position: 2
title: "HWMPplus 网状网"
sidebar_label: "HWMPplus 网状网"
description: "本页介绍 MikroTik RouterOS 中的 HWMP+ 网状协议，这是一种使用 Hybrid Wireless Mesh Protocol 的无线网状网络二层路由解决方案。内容涵盖接口属性、端口配置、FDB 状态，并包含一个动态 WDS 链路集成的示例。"
tags:
  - 'mesh'
  - 'hwmpplus'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/hwmpplus-mesh
captured_at: '2026-11-04T11:35:34+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/interface/mesh`

HWMP+ 是 MikroTik 专用的二层路由协议，用于无线 Mesh 网络。它基于 IEEE 802.11s 草案标准中的 Hybrid Wireless Mesh Protocol (HWMP)。在 Mesh 环境中，可用它代替（Rapid）Spanning Tree 协议，以确保无环的最优路由。

但是，HWMP+ 协议与 IEEE 802.11s 草案标准中的 HWMP 不兼容。

请注意，为网络使用的分发系统不必是 Wireless Distribution System (WDS)。HWMP+ Mesh 路由不仅支持 WDS 接口，还支持 Mesh 内部的以太网接口。因此，你可以使用简单的基于以太网的分发系统，也可以同时组合 WDS 和以太网链路！

:::warning
HWMPplus 在  [Wifi](../wifi/index.md) 接口上不受支持，但可在 [Wireless](./index.md) 接口上使用。
:::

## 属性 {#properties}

### Mesh {#mesh}

| 属性 | 描述 |
| :-- | :-- |
| **admin-mac** (*MAC 地址*；**默认：00:00:00:00:00:00)** | 管理分配的 MAC 地址，在 **auto-mac** 设置禁用时使用 |
| **arp** (*disabled \| enabled \| proxy-arp \| reply-only*；默认：**enabled**) | Address Resolution Protocol 设置 |
| **auto-mac** (*boolean*；默认：**no**) | 如果禁用，则 **admin-mac** 的值将用作 Mesh 接口的 MAC 地址；否则，如果存在端口，将使用某个端口的地址 |
| **hwmp-default-hoplimit** (*integer: 1..255*；默认：) | 生成的路由协议数据包的最大跳数；HWMP+ 数据包被转发 "hoplimit" 次后将被丢弃 |
| **hwmp-prep-lifetime** (*time*；默认：**5m**) | 由收到的 PREP 或 PREQ 消息创建的路由的生存时间 |
| **hwmp-preq-destination-only** (*boolean*；默认：**yes**) | 是否只有目的节点可以响应 HWMP+ PREQ 消息 |
| **hwmp-preq-reply-and-forward** (*boolean*；默认：**yes**) | 中间节点在响应 HWMP+ PREQ 消息后是否应转发该消息。仅在 **hwmp-preq-destination-only** 禁用时有用 |
| **hwmp-preq-retries** (*integer*；默认：**2**) | 在认为某个地址不可达之前，重试到该特定 MAC 地址的路由发现的次数 |
| **hwmp-preq-waiting-time** (*time*；默认：**4s**) | 等待对第一个 PREQ 消息响应的时长。请注意，对于后续 PREQ，等待时间会按指数增加 |
| **hwmp-rann-interval** (*time*；默认：**10s**) | 发送 HWMP+ RANN 消息的频率 |
| **hwmp-rann-lifetime** (*time*；默认：**1s**) | 由收到的 RANN 消息创建的路由的生存时间 |
| **hwmp-rann-propagation-delay** (*time*；默认：**0.5s**) | 传播 RANN 消息前等待的时长。单位为秒 |
| **mesh-portal** (*boolean*；默认：**no**) | 此接口是否为 Mesh 网络中的门户 |
| **mtu** (*number*；默认：**1500**) | 最大传输单元大小 |
| **name** (*string*；默认：) | 接口名称 |
| **reoptimize-paths** (*boolean*；默认：**no**) | 是否定期发送 PREQ 消息以查询已知的 MAC 地址。如果网络拓扑经常变化，启用此设置会很有用。请注意，如果没有收到对重新优化 PREQ 的回复，现有路径仍会保留（直到超时） |

### 端口 {#port}

| 属性 | 描述 |
| :-- | :-- |
| **active-port-type** (*read-only: wireless \| WDS \| ethernet-mesh \| ethernet-bridge \| ethernet-mixed*；默认：) | 实际使用的端口类型和状态 |
| **hello-interval** (*time*；默认：**10s**) | 发送 HWMP+ Hello 消息之间的最大间隔。仅用于以太网类型端口 |
| **interface** (*interface name*；默认：) | 要加入 Mesh 的接口名称 |
| **mesh** (*interface name*；默认：) | 此端口所属的 Mesh 接口 |
| **path-cost** (*integer: 0..65535*；默认：**10**) | 到接口的路径开销，路由协议用它来确定“最佳”路径 |
| **port-type** (*WDS \| auto \| ethernet \| wireless*；默认：) | 要使用的端口类型 auto - 端口类型根据底层接口的类型自动确定 WDS - 一个 Wireless Distribution System 接口。远端 MAC 地址从无线连接数据中学习 ethernet - 远端 MAC 地址从 HWMP+ Hello 消息中学习，或从接收或转发的流量中的源 MAC 地址学习 wireless - 远端 MAC 地址从无线连接数据中学习 |

### FDB 状态 {#fdb-status}

| 属性 | 描述 |
| :-- | :-- |
| **mac-address** (*MAC address*) | 此 FDB 条目对应的 MAC 地址 |
| **seq-number** (*integer*) | 路由协议中用于避免环路的序列号 |
| **type** (*local \| outsider \| direct \| mesh \| neighbor \| larval \| unknown*) | 此 FDB 条目的类型 local -- MAC 地址属于本地路由器本身 outsider -- MAC 地址属于 Mesh 网络外部的设备 direct -- MAC 地址属于位于 Mesh 网络中某个接口上的无线客户端 mesh -- MAC 地址属于可通过 Mesh 网络访问的设备；它可以是 Mesh 网络的内部或外部设备 neighbor -- MAC 地址属于与本路由器直接相邻的 Mesh 路由器 larval -- MAC 地址属于可通过 Mesh 网络访问的未知设备 unknown -- MAC 地址属于未知设备 |
| **mesh** (*interface name*) | 此 FDB 条目所属的 Mesh 接口 |
| **on-interface** (*interface name*) | 用于流量转发的 Mesh 端口，类似于下一跳值 |
| **lifetime** (*time*) | 如果此条目未用于流量转发，则剩余生存时间 |
| **age** (*time*) | 此 FDB 条目的存在时间 |
| **metric** (*integer*) | 路由协议用于确定“最佳”路径的度量值 |

## 示例 {#example}

![](/img/1760ef1412bdd0ee.webp)

此示例使用静态 WDS 链路，这些链路在变为活动状态时会动态添加为 Mesh 端口。使用两个不同频率：一个用于 AP 互连，另一个用于客户端连接到 AP，因此 AP 必须至少有两个无线接口。当然，所有连接也可以使用同一频率，但由于潜在的干扰问题，效果可能不佳。

在所有 AP 上重复此配置：

```ros
/interface/mesh/add disabled=no
/interface/mesh/port/add interface=wlan1 mesh=mesh1
/interface/mesh/port/add interface=wlan2 mesh=mesh1

 # 用于 AP 互连的接口
/interface/wireless/set wlan1 disabled=no ssid=mesh frequency=2437 band=2ghz-b/g/n mode=ap-bridge \
 wds-mode=static-mesh wds-default-bridge=mesh1 

# 用于客户端连接的接口
 /interface/wireless/set wlan2 disabled=no ssid=mesh-clients frequency=5180 band=5ghz-a/n/ac mode=ap-bridge 

# 为每个要连接的 AP 创建一个静态 WDS 接口
/interface/wireless/wds/add disabled=no master-interface=wlan1 name=<descriptive name of remote end> \
 wds-address=<MAC address of remote end> 
```

这里手动添加 WDS 接口，因为使用的是静态 WDS 模式。如果使用 **wds-mode**=**dynamic-mesh**，所有 WDS 接口都会自动创建。此处指定 **frequency** 和 **band** 参数只是为了生成有效的示例配置；Mesh 协议运行绝不限于这些特定值，也不是针对它们优化的。

:::warning
你可能需要增大无线接口的 **disconnect-timeout** 选项，以使协议更稳定。
:::

在实际部署中，你还应使用 `/interface/wireless/security-profile` 来确保无线连接的安全。为简单起见，这里不展示该配置。

路由器 A 上的结果（有一个客户端连接到 wlan2）：

```ros
[admin@A] > /interface/mesh/print
Flags: X - disabled, R - running
0 R name="mesh1" mtu=1500 arp=enabled mac-address=00:0C:42:0C:B5:A4 auto-mac=yes
admin-mac=00:00:00:00:00:00 mesh-portal=no hwmp-default-hoplimit=32
hwmp-preq-waiting-time=4s hwmp-preq-retries=2 hwmp-preq-destination-only=yes
hwmp-preq-reply-and-forward=yes hwmp-prep-lifetime=5m hwmp-rann-interval=10s
hwmp-rann-propagation-delay=1s hwmp-rann-lifetime=22s

[admin@A] > /interface/mesh/port/print detail
Flags: X - disabled, I - inactive, D - dynamic
0 interface=wlan1 mesh=mesh1 path-cost=10 hello-interval=10s port-type=auto port-type-used=wireless
1 interface=wlan2 mesh=mesh1 path-cost=10 hello-interval=10s port-type=auto port-type-used=wireless
2 D interface=router_B mesh=mesh1 path-cost=105 hello-interval=10s port-type=auto port-type-used=WDS
3 D interface=router_D mesh=mesh1 path-cost=76 hello-interval=10s port-type=auto port-type-used=WDS
```

此时 FDB（转发数据库）仅包含本地 MAC 地址、可通过本地接口访问的非 Mesh 节点以及直接 Mesh 邻居的信息：

```ros
[admin@A] /interface/mesh/fdb/print
Flags: A - active, R - root
MESH TYPE MAC-ADDRESS ON-INTERFACE LIFETIME AGE
A mesh1 local 00:0C:42:00:00:AA 3m17s
A mesh1 neighbor 00:0C:42:00:00:BB router_B 1m2s
A mesh1 neighbor 00:0C:42:00:00:DD router_D 3m16s
A mesh1 direct 00:0C:42:0C:7A:2B wlan2 2m56s
A mesh1 local 00:0C:42:0C:B5:A4 2m56s

[admin@A] /interface/mesh/fdb/print detail
Flags: A - active, R - root
A mac-address=00:0C:42:00:00:AA type=local age=3m21s mesh=mesh1 metric=0 seqnum=4294967196
A mac-address=00:0C:42:00:00:BB type=neighbor on-interface=router_B age=1m6s mesh=mesh1 metric=132 seqnum=4294967196
A mac-address=00:0C:42:00:00:DD type=neighbor on-interface=router_D age=3m20s mesh=mesh1 metric=79 seqnum=4294967196
A mac-address=00:0C:42:0C:7A:2B type=direct on-interface=wlan2 age=3m mesh=mesh1 metric=10 seqnum=0
A mac-address=00:0C:42:0C:B5:A4 type=local age=3m mesh=mesh1 metric=0 seqnum=0
```

测试 ping 是否正常：

```ros
[admin@A] > /ping 00:0C:42:00:00:CC
00:0C:42:00:00:CC 64 byte ping time=108 ms
00:0C:42:00:00:CC 64 byte ping time=51 ms
00:0C:42:00:00:CC 64 byte ping time=39 ms
00:0C:42:00:00:CC 64 byte ping time=43 ms
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 39/60.2/108 ms
```

路由器 A 必须先发现到路由器 C 的路径，因此第一次 ping 的时间略长。现在 FDB 还包含 00:0C:42:00:00:CC 的条目，类型为 "mesh"。

另外，测试 ARP 解析是否正常，以及 IP 层 ping 是否正常：

```ros
[admin@A] > /ping 10.4.0.3
10.4.0.3 64 byte ping: ttl=64 time=163 ms
10.4.0.3 64 byte ping: ttl=64 time=46 ms
10.4.0.3 64 byte ping: ttl=64 time=48 ms
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 46/85.6/163 ms
```

#### Mesh 路由跟踪 {#mesh-traceroute}

还有一个 mesh traceroute 命令，可帮助你确定路由使用了哪些路径。

例如，对于此网络：

```ros
[admin@1] /interface/mesh/fdb/print
Flags: A - active, R - root
MESH TYPE MAC-ADDRESS ON-INTERFACE LIFETIME AGE
A mesh1 local 00:0C:42:00:00:01 7m1s
A mesh1 mesh 00:0C:42:00:00:02 wds4 17s 4s
A mesh1 mesh 00:0C:42:00:00:12 wds4 4m58s 1s
A mesh1 mesh 00:0C:42:00:00:13 wds4 19s 2s
A mesh1 neighbor 00:0C:42:00:00:16 wds4 7m1s
A mesh1 mesh 00:0C:42:00:00:24 wds4 18s 3s
```

到 00:0C:42:00:00:12 的 traceroute 显示：

```ros
[admin@1] /interface/mesh/traceroute mesh1 00:0C:42:00:00:12
ADDRESS TIME STATUS
00:0C:42:00:00:16 1ms ttl-exceeded
00:0C:42:00:00:02 2ms ttl-exceeded
00:0C:42:00:00:24 4ms ttl-exceeded
00:0C:42:00:00:13 6ms ttl-exceeded
00:0C:42:00:00:12 6ms success
```

## 协议说明 {#protocol-description}

### 按需模式 {#reactive-mode}

路由器 A 想要发现到 C 的路径：

![](/img/47c65b5c48bfc40e.webp)  

路由器 C 向 A 发送单播响应：
![](/img/082c745aa3090e0e.webp)

在按需模式下，HWMP+ 非常类似于 AODV（Ad-hoc On-demand Distance Vector）。所有路径都按需发现，方式是在网络中泛洪 Path Request (PREQ) 消息。目的节点或某个拥有到目的地的路径的路由器会用 Path Response (PREP) 回复。请注意，如果目的地址属于某个客户端，则该客户端连接的 AP 将作为其代理（即代表它回复 PREQ）。

此模式最适合移动网络，和/或大部分通信发生在 Mesh 内部节点之间的情况。

### 主动模式 {#proactive-mode}

根节点通过泛洪 RANN 来宣告自身：

![](/img/73dd8c90f0b07352.webp)  

内部节点用 PREG 响应：
![](/img/7d78350bb549d5cd.webp)  

在主动模式下，会有一些路由器配置为门户。通常，作为门户意味着该路由器具有连接到其他网络的接口，即它是 Mesh 网络的入口/出口点。

门户会通过在网络中泛洪 Root Announcement (RANN) 消息来宣告自己的存在。内部节点会用 Path Registration (PREG) 消息回复。此过程的结果是以门户为根的路由树。

到门户的路由将充当一种默认路由。如果内部路由器不知道到特定目的地的路径，它会将所有数据转发到最近的门户。然后，门户会在需要时代表该路由器发现路径。之后数据将流经门户。除非数据是发往门户本身或门户具有接口的某个外部网络，否则这可能导致次优路由。

当大部分流量在内部 Mesh 节点和少数门户节点之间传输时，主动模式最适合。

### 拓扑变化检测 {#topology-change-detection}

数据流路径：
![](/img/9ce080b253f40857.webp)

链路消失后，错误会向上游传播：
![](/img/b221bdf77838181d.webp)  

HWMP+ 使用 Path Error (PERR) 消息通知链路已消失。该消息会传播到数据源为止的所有上游节点。源节点在收到 PERR 后会重新启动路径发现过程。

## 常见问题 {#faq}

**问：与 RSTP 相比，这有什么优势？**

答：它提供最优路由。RSTP 仅用于防止环路。

**问：路由选择是如何进行的？**

答：发现过程结束后，始终选择度量值最佳的路由。还有一个配置选项可定期重新优化已知路由。

路由度量按各链路度量之和计算。

链路度量的计算方式与 (R)STP 协议相同：

- 对于以太网链路，度量是静态配置的（例如，与 OSPF 相同）。
- 对于 WDS 链路，度量会根据实际链路带宽动态更新，而带宽又受无线信号强度和所选数据传输速率影响。

目前，该协议不考虑链路上正在使用的带宽量，但将来也可能会使用这一信息。

**问：与 OSPF/RIP/三层路由（总体而言）相比，这有什么优势？**

答：WDS 网络通常是桥接的，而不是路由的。自配置能力对 Mesh 网络很重要，而路由通常比桥接需要多得多的配置。当然，你始终可以在桥接网络上运行任何 L3 路由协议，但对于 Mesh 网络来说，这通常没有什么意义。

:::warning
由于 Mesh 协议不包含优化的二层组播转发，最好避免在 Mesh 网络上转发任何组播流量（包括 OSPF）。如果需要 OSPF，则必须改为配置使用单播模式的 [OSPF NBMA](../../user-guides/routing-and-networking-protocols/unicast/ospf/neighbour-relationship.md#discovery-on-nbma-subnets) 邻居。
:::

**问：性能/CPU 要求如何？**

答：如果配置得当，协议本身占用的资源将远少于（例如）OSPF。单个路由器上的数据转发性能应接近桥接的性能。

**问：它如何与使用 RSTP 的现有 Mesh 部署协同工作？**

答：RSTP 网络的内部结构对 Mesh 协议是透明的（因为 Mesh hello 数据包会在 RSTP 网络内部转发）。Mesh 会将 RSTP 网络中两个入口点之间的路径视为单个段。另一方面，Mesh 网络对 RSTP 不是透明的，因为 RSTP hello 数据包不会在 Mesh 网络内部转发。

:::warning
如果 Mesh 网络在两个或多个点连接到 RSTP 网络，则可能出现路由环路！
:::

请注意，如果两个接入点之间有 WDS 链路，则两端必须具有相同的配置（两端都作为 Mesh 中的端口，或两端都作为桥接接口中的端口）。

你也可以将桥接接口作为 Mesh 端口（例如，以便使用桥接防火墙）。

**问：可以有多个网络入口/出口点吗？**

答：如果入口/出口点配置为门户（即使用主动模式），Mesh 网络内的每个路由器都会选择最近的门户并将所有数据转发到该门户。然后，门户会在需要时代表该路由器发现路径。

**问：如何控制或过滤 Mesh 流量？**

答：目前唯一的方法是使用桥接防火墙。创建一个桥接接口，将 WDS 接口和/或以太网接口放入该桥接，然后将该桥接放入 Mesh 接口。接着配置桥接防火墙规则。

要匹配用于 Mesh 流量封装的 MAC 协议，请使用 MAC 协议号 0x9AAA；要匹配 Mesh 路由流量，请使用 MAC 协议号 0x9AAB。例如：

```ros
/interface/bridge/settings/set use-ip-firewall=yes 
/interface/bridge/filter/add chain=input action=log mac-protocol=0x9aaa 
/interface/bridge/filter/add chain=input action=log mac-protocol=0x9aab
```

:::warning
完全可能创建无法工作的混合 Mesh/桥接部署（例如，将 *问题示例 1* 中的交换机替换为桥接）。推荐的始终有效的故障安全方法是：为每个物理接口创建一个单独的桥接接口；然后将所有这些桥接接口添加为 Mesh 端口。
:::

## 高级主题 {#advanced-topics}

我们都知道，容易做出有问题的二层桥接或路由配置，并且可能很难调试（与三层路由配置相比）。因此，这里给出几个可能会给你带来问题的错误配置示例。请避免它们！

### 问题示例 1：Mesh 内部的以太网交换机 {#problematic-example-1-ethernet-switch-inside-a-mesh}

*路由器 A 在 Mesh 外部；其余所有路由器都在内部。对于路由器 B、C、D，所有接口都添加为 Mesh 端口*：
![](/img/92bc53a2f8c65140.webp)

路由器 A 将无法与路由器 C 可靠通信。当 D 是以太网的指定路由器时，问题就会显现；如果 B 承担此角色，则一切正常。问题的主要原因是以太网交换机上的 MAC 地址学习。

考虑一下当路由器 A 想向 C 发送数据时会发生什么。我们假设路由器 A 要么知道路径，要么将数据泛洪到所有接口。无论哪种方式，数据都会到达交换机。交换机对目的 MAC 地址一无所知，因此会将数据转发给 B 和 D。

现在会发生什么：

1. B 在 Mesh 接口上收到该数据包。由于该 MAC 地址不是 B 本地的，并且 B 知道自己不是以太网网络的指定路由器，因此它直接忽略该数据包。
2. D 在 Mesh 接口上收到该数据包。由于该 MAC 地址不是 D 本地的，并且 D 是以太网网络的指定路由器，因此它启动到 C 的路径发现过程。

路径发现完成后，D 得知可通过 B 到达 C。现在 D 封装该数据包并将其转发回以太网网络。封装后的数据包由交换机转发，由 B 接收并转发，然后由 C 接收。到目前为止一切正常。

现在 C 很可能会响应该数据包。由于 B 已经知道 A 在哪里，它会解封装并转发回复数据包。但现在交换机会学习到：可通过 B 到达 C 的 MAC 地址！这意味着，下次从 A 发往 C 的数据到达时，交换机将*仅*把数据转发给 B（而 B 当然会静默忽略该数据包）！

相反，如果 B 承担指定路由器的角色，则一切正常，因为流量不必两次经过以太网交换机。

***故障排除***：要么避免这种部署，要么在交换机上禁用 MAC 地址学习。请注意，在许多交换机上这是不可能的。

另请注意，如果满足以下任一条件，就不会有问题：

- 路由器 A 支持 HWMP+，并已配置使用 HWMP+。
- 或者将以太网交换机替换为支持 HWMP+ 且已将以太网接口添加为 Mesh 端口的路由器。

### 问题示例 2：无线模式 {#problematic-example-2-wireless-modes}

*考虑这个（无效的）配置示例*...*路由器 A 和 B 在 Mesh 内部，路由器 C 在外部。对于路由器 A 和 B，所有接口都添加为 Mesh 端口：*

![](/img/1e417ebd5022491a.webp)

现在无法在路由器 B 上桥接 wlan1 和 wlan2。如果你了解 WDS 的工作原理，原因就相当明显。WDS 通信使用四地址帧。这是因为对于无线多跳转发，你需要知道中间跳的地址，以及原始发送方和最终接收方的地址。相比之下，非 WDS 的 802.11 通信在一帧中仅包含三个 MAC 地址。这就是为什么在 station 模式下无法进行多跳转发。

***故障排除***取决于你想实现什么：

1. 如果你希望路由器 C 充当中继器（用于无线或以太网流量），请配置路由器 B 和路由器 C 之间的 WDS 链路，并在所有节点上运行 Mesh 路由协议。
2. 在其他情况下，将路由器 B 上的 wlan2 配置为 AP 模式，并将路由器 C 上的 WLAN 配置为 station 模式。
