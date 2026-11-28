---
title: "HWMPplus 网状网络"
description: "本页介绍 MikroTik RouterOS 中的 HWMP+ mesh 协议，这是一种使用 Hybrid Wireless Mesh Protocol 的无线 mesh 网络二层路由解决方案。内容涵盖接口属性、端口配置、FDB 状态，并包含动态 WDS 链路集成示例。"
tags:
  - 'mesh'
  - 'hwmpplus'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/hwmpplus-mesh
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/interface/mesh`

HWMP+ 是 MikroTik 专有的二层路由协议，用于无线网状网络。它基于 IEEE 802.11s 草案标准中的 Hybrid Wireless Mesh Protocol（HWMP）。在网状网络环境中，可用它替代（Rapid）Spanning Tree 协议，以确保无环路的最优路由。

但是，HWMP+ 协议与 IEEE 802.11s 草案标准中的 HWMP 不兼容。

请注意，网络中使用的分发系统不必是 Wireless Distribution System（WDS）。HWMP+ 网状路由不仅支持 WDS 接口，也支持网状网络中的以太网接口。因此，可以使用简单的基于以太网的分发系统，也可以组合使用 WDS 和以太网链路！

:::warning
HWMPplus 不支持 [Wifi](/docs/wireless/wifi) 接口，但可用于 [Wireless](/docs/wireless/abgn) 接口。
:::

## 属性 {#properties}

### Mesh

| 属性 | 说明 |
| :-- | :-- |
| **admin-mac** (*MAC address*; **Default: 00:00:00:00:00:00)** | 管理分配的 MAC 地址，在 **auto-mac** 设置禁用时使用 |
| **arp** (*disabled \| enabled \| proxy-arp \| reply-only*; Default: **enabled**) | 地址解析协议设置 |
| **auto-mac** (*boolean*; Default: **no**) | 禁用时，来自 **admin-mac** 的值将用作 mesh 接口的 MAC 地址；否则，如果存在端口，将使用某个端口的地址 |
| **hwmp-default-hoplimit** (*integer: 1..255*; Default: ) | 生成的路由协议数据包的最大跳数；HWMP+ 数据包被转发 "hoplimit" 次后将被丢弃 |
| **hwmp-prep-lifetime** (*time*; Default: **5m**) | 根据收到的 PREP 或 PREQ 消息创建的路由的生存时间 |
| **hwmp-preq-destination-only** (*boolean*; Default: **yes**) | 是否仅允许目标响应 HWMP+ PREQ 消息 |
| **hwmp-preq-reply-and-forward** (*boolean*; Default: **yes**) | 中间节点在响应 HWMP+ PREQ 消息后是否应转发该消息。仅在 **hwmp-preq-destination-only** 禁用时有用 |
| **hwmp-preq-retries** (*integer*; Default: **2**) | 在将某个 MAC 地址视为不可达之前，针对该地址重试路由发现的次数 |
| **hwmp-preq-waiting-time** (*time*; Default: **4s**) | 等待第一条 PREQ 消息响应的时间。请注意，后续 PREQ 的等待时间会按指数增加 |
| **hwmp-rann-interval** (*time*; Default: **10s**) | 发送 HWMP+ RANN 消息的频率 |
| **hwmp-rann-lifetime** (*time*; Default: **1s**) | 根据收到的 RANN 消息创建的路由的生存时间 |
| **hwmp-rann-propagation-delay** (*time*; Default: **0.5s**) | 传播 RANN 消息前的等待时间。值以秒为单位 |
| **mesh-portal** (*boolean*; Default: **no**) | 该接口是否为 mesh 网络中的门户 |
| **mtu** (*number*; Default: **1500**) | 最大传输单元大小 |
| **name** (*string*; Default: ) | 接口名称 |
| **reoptimize-paths** (*boolean*; Default: **no**) | 是否定期发送 PREQ 消息，询问已知的 MAC 地址。如果网络拓扑经常变化，启用该设置很有用。请注意，如果重新优化 PREQ 未收到响应，现有路径仍会保留，直到超时 |

### Port

| 属性 | 说明 |
| :-- | :-- |
| **active-port-type** (*read-only: wireless \| WDS \| ethernet-mesh \| ethernet-bridge \| ethernet-mixed*; Default: ) | 实际使用的端口类型和状态 |
| **hello-interval** (*time*; Default: **10s**) | 发送 HWMP+ Hello 消息之间的最大间隔。仅用于以太网类型端口 |
| **interface** (*interface name*; Default: ) | 要加入 mesh 的接口名称 |
| **mesh** (*interface name*; Default: ) | 该端口所属的 mesh 接口 |
| **path-cost** (*integer: 0..65535*; Default: **10**) | 到接口的路径开销，路由协议用它来确定“最佳”路径 |
| **port-type** (*WDS \| auto \| ethernet \| wireless*; Default: ) | 要使用的端口类型<ul><li>auto - 根据底层接口的类型自动确定端口类型</li><li>WDS - 无线分布式系统接口。远端 MAC 地址从无线连接数据中学习</li><li>ethernet - 远端 MAC 地址从 HWMP+ Hello 消息或收到和转发的流量中的源 MAC 地址学习</li><li>wireless - 远端 MAC 地址从无线连接数据中学习</li></ul> |

### FDB 状态 {#fdb-status}

| 属性 | 说明 |
| :-- | :-- |
| **mac-address** (*MAC address*) | 与该 FDB 条目对应的 MAC 地址 |
| **seq-number** (*integer*) | 路由协议中用于避免环路的序列号 |
| **type** (*local \| outsider \| direct \| mesh \| neighbor \| larval \| unknown*) | 该 FDB 条目的类型<ul><li>local -- MAC 地址属于本地路由器自身</li><li>outsider -- MAC 地址属于 mesh 网络外部的设备</li><li>direct -- MAC 地址属于 mesh 网络中接口上的无线客户端</li><li>mesh -- MAC 地址属于可通过 mesh 网络访问的设备；该设备可以在 mesh 网络内部或外部</li><li>neighbor -- MAC 地址属于与该路由器直接相邻的 mesh 路由器</li><li>larval -- MAC 地址属于可通过 mesh 网络访问的未知设备</li><li>unknown -- MAC 地址属于未知设备</li></ul> |
| **mesh** (*interface name*) | 该 FDB 条目所属的 mesh 接口 |
| **on-interface** (*interface name*) | 用于转发流量的 mesh 端口，类似于下一跳值 |
| **lifetime** (*time*) | 如果该条目不用于转发流量，剩余的生存时间 |
| **age** (*time*) | 该 FDB 条目的存在时间 |
| **metric** (*integer*) | 路由协议用于确定“最佳”路径的度量值 |

## 示例 {#example}

![](/img/1760ef1412bdd0ee.webp)

此示例使用静态 WDS 链路，这些链路在变为活动状态时会动态添加为 mesh 端口。使用了两个不同的频率：一个用于 AP 间互连，另一个用于客户端连接到 AP，因此 AP 必须至少有两个无线接口。当然，也可以对所有连接使用相同频率，但由于可能存在干扰问题，效果可能不佳。

在所有 AP 上重复此配置：

```ros
/interface/mesh/add disabled=no
/interface/mesh/port/add interface=wlan1 mesh=mesh1
/interface/mesh/port/add interface=wlan2 mesh=mesh1

 # interface used for AP interconnections 
/interface/wireless/set wlan1 disabled=no ssid=mesh frequency=2437 band=2ghz-b/g/n mode=ap-bridge \
 wds-mode=static-mesh wds-default-bridge=mesh1 

# interface used for client connections
 /interface/wireless/set wlan2 disabled=no ssid=mesh-clients frequency=5180 band=5ghz-a/n/ac mode=ap-bridge 

# a static WDS interface for each AP you want to connect to
/interface/wireless/wds/add disabled=no master-interface=wlan1 name=<descriptive name of remote end> \
 wds-address=<MAC address of remote end> 
```

此处手动添加 WDS 接口，因为使用的是静态 WDS 模式。如果使用 **wds-mode**=**dynamic-mesh**，所有 WDS 接口都会自动创建。此处指定 **frequency** 和 **band** 参数只是为了生成有效的示例配置；mesh 协议运行并不限于这些特定值，也未针对这些值进行优化。

:::warning
可以提高 **disconnect-timeout** 无线接口选项，使协议更加稳定。
:::

在实际环境中，还应注意保护无线连接安全，使用 `/interface/wireless/security-profile`。为简化说明，此处未显示该配置。

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

此时 FDB（Forwarding Database）仅包含有关本地 MAC 地址、通过本地接口可到达的非 mesh 节点以及直接 mesh 邻居的信息：

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

测试 ping 是否正常工作：

```ros
[admin@A] > /ping 00:0C:42:00:00:CC
00:0C:42:00:00:CC 64 byte ping time=108 ms
00:0C:42:00:00:CC 64 byte ping time=51 ms
00:0C:42:00:00:CC 64 byte ping time=39 ms
00:0C:42:00:00:CC 64 byte ping time=43 ms
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 39/60.2/108 ms
```

Router A 必须先发现通往 Router C 的路径，因此第一次 ping 的时间略长。现在 FDB 中也包含一条 00:0C:42:00:00:CC 的条目，类型为“mesh”。

另外，测试 ARP 解析和 IP 层 ping 是否正常工作：

```ros
[admin@A] > /ping 10.4.0.3
10.4.0.3 64 byte ping: ttl=64 time=163 ms
10.4.0.3 64 byte ping: ttl=64 time=46 ms
10.4.0.3 64 byte ping: ttl=64 time=48 ms
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 46/85.6/163 ms
```

#### Mesh traceroute

还有一个 mesh traceroute 命令，可帮助你确定路由使用哪些路径。

例如，对于以下网络：

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

到 00:0C:42:00:00:12 的 Traceroute 显示：

```ros
[admin@1] /interface/mesh/traceroute mesh1 00:0C:42:00:00:12
ADDRESS TIME STATUS
00:0C:42:00:00:16 1ms ttl-exceeded
00:0C:42:00:00:02 2ms ttl-exceeded
00:0C:42:00:00:24 4ms ttl-exceeded
00:0C:42:00:00:13 6ms ttl-exceeded
00:0C:42:00:00:12 6ms success
```

## 协议描述 {#protocol-description}

### 反应模式 {#reactive-mode}

Router A 希望发现到 C 的路径：

![](/img/47c65b5c48bfc40e.webp)  

Router C 向 A 发送单播响应：
![](/img/082c745aa3090e0e.webp)

在反应模式下，HWMP+ 与 AODV（Ad-hoc On-demand Distance Vector）非常相似。所有路径均按需发现，方法是在网络中泛洪 Path Request（PREQ）消息。目标节点或具有到目标路径的某个路由器将使用 Path Response（PREP）进行回复。请注意，如果目标地址属于某个客户端，则该客户端所连接的 AP 将充当其代理（即代表其回复 PREQ）。

该模式最适合移动网络，和/或大多数通信发生在 mesh 内部节点之间的场景。

### 主动模式 {#proactive-mode}

root 通过泛洪 RANN 宣告自身：

![](/img/73dd8c90f0b07352.webp)  

内部节点使用 PREG 响应：
![](/img/7d78350bb549d5cd.webp)  

在主动模式下，会将某些路由器配置为 portal。通常，作为 portal 意味着该路由器具有连接到其他网络的接口，即它是 mesh 网络的入口/出口点。

门户将通过在网络中泛洪 Root Announcement（RANN）消息来宣告其存在。内部节点将使用 Path Registration（PREG）消息进行回复。此过程的结果是以门户为根的路由树。

到门户的路由将充当一种默认路由。如果内部路由器不知道到特定目的地的路径，它会将所有数据转发到最近的门户。然后，门户会在需要时代表该路由器发现路径。随后数据将流经门户。除非数据发往门户本身或门户具有接口连接的某个外部网络，否则这可能导致次优路由。

当大多数流量在内部 mesh 节点和少数门户节点之间传输时，主动模式最为适合。

### 拓扑变化检测 {#topology-change-detection}

数据流路径：
![](/img/9ce080b253f40857.webp)

链路消失后，错误会向上游传播：
![](/img/b221bdf77838181d.webp)  

HWMP+ 使用 Path Error（PERR）消息通知链路已消失。该消息会传播到数据源之前的所有上游节点。源节点收到 PERR 后会重新启动路径发现过程。

## FAQ

**问：这比 RSTP 好在哪里？**

A. 它提供最佳路由。RSTP 仅用于防止环路。

**Q. 如何进行路由选择？**

A. 在发现过程完成后，始终选择度量值最佳的路由。还有一个配置选项，可定期重新优化已知路由。

路由度量值按各链路度量值之和计算。

链路度量值的计算方式与 (R)STP 协议相同：

- 对于 Ethernet 链路，度量值是静态配置的（例如，与 OSPF 相同）。
- 对于 WDS 链路，度量值根据实际链路带宽动态更新，而实际链路带宽又受无线信号强度和所选数据传输速率影响。

目前，该协议不考虑链路上已使用的带宽量，但未来可能会使用该参数。

**Q. 与 OSPF/RIP/一般三层路由相比，这有什么优势？**

A. WDS 网络通常采用网桥，而不是路由。自配置能力对网状网络很重要，而路由通常比网桥需要更多配置。当然，你始终可以在网桥网络上运行任意 L3 路由协议，但对于网状网络而言，这通常意义不大。

:::warning
由于 mesh 协议不包含优化的二层组播转发，因此最好避免通过网状网络转发任何组播流量（包括 OSPF）。如果需要 OSPF，则必须配置使用单播模式的 [OSPF NBMA](/docs/user-guides/routing-and-networking-protocols/unicast/ospf/neighbour-relationship#discovery-on-nbma-subnets) 邻居。
:::

**Q. 性能/CPU 要求如何？**

A. 协议本身在正确配置时，占用的资源会比例如 OSPF 少得多。单台路由器上的数据转发性能应接近网桥的性能。

**Q. 它如何与使用 RSTP 的现有网状配置协同工作？**

A. RSTP 网络的内部结构对 mesh 协议是透明的（因为 mesh hello 数据包会在 RSTP 网络内转发）。mesh 会将 RSTP 网络中两个入口点之间的路径视为单个网段。另一方面，网状网络对 RSTP 并不透明，因为 RSTP hello 数据包不会在网状网络内转发。

:::warning
如果网状网络在两个或更多点连接到 RSTP 网络，则可能出现路由环路！
:::

请注意，如果两个接入点之间存在 WDS 链路，则两端必须具有相同的配置（两端都作为 mesh 中的端口，或两端都作为网桥接口中的端口）。

也可以将网桥接口用作 mesh 端口（例如，以便使用网桥防火墙）。

**问：我可以有多个网络入口/出口点吗？**

答：如果入口/出口点配置为门户（即使用主动模式），mesh 网络中的每台路由器都会选择最近的门户，并将所有数据转发给它。如果需要，门户将代表该路由器发现路径。

**问：如何控制或过滤 mesh 流量？**

答：目前唯一的方法是使用网桥防火墙。创建网桥接口，将 WDS 接口和/或以太网接口加入该网桥，然后将该网桥加入 mesh 接口。随后配置网桥防火墙规则。

要匹配用于 mesh 流量封装的 MAC 协议，请使用 MAC 协议号 0x9AAA；要匹配 mesh 路由流量，请使用 MAC 协议号 0x9AAB。示例：

```ros
/interface/bridge/settings/set use-ip-firewall=yes 
/interface/bridge/filter/add chain=input action=log mac-protocol=0x9aaa 
/interface/bridge/filter/add chain=input action=log mac-protocol=0x9aab
```

:::warning
完全可能创建无法工作的混合 mesh/网桥配置（例如，*问题示例 1* 中使用网桥而不是交换机）。推荐采用始终有效的故障安全方式：为每个物理接口创建单独的网桥接口；然后将所有这些网桥接口添加为 mesh 端口。
:::

## 高级主题 {#advanced-topics}

我们都知道，二层网桥或路由配置容易出现问题，而且排查可能很困难。（与三层路由配置相比。）以下是一些可能导致问题的错误配置示例。请避免这样做！

### 有问题的示例 1：mesh 内的以太网交换机 {#problematic-example-1-ethernet-switch-inside-a-mesh}

*Router A 位于 mesh 外部；其余所有路由器均位于内部。对于路由器 B、C、D，所有接口都添加为 mesh 端口*：
![](/img/92bc53a2f8c65140.webp)

Router A 将无法与 router C 可靠通信。当 D 是以太网的指定路由器时，问题就会显现；如果 B 承担该角色，则一切正常。问题的主要原因是以太网交换机上的 MAC 地址学习。

考虑当 router A 想要向 C 发送内容时会发生什么。假设 router A 知道目标位置，或将数据泛洪到所有接口。无论哪种情况，数据都会到达交换机。交换机不知道目标 MAC 地址的任何信息，因此会将数据转发给 B 和 D。

现在会发生以下情况：

1. B 在 mesh 接口上收到数据包。由于该 MAC 地址不是 B 本地的，并且 B 知道自己不是以太网网络的指定路由器，因此它会直接忽略该数据包。
2. D 在 mesh 接口上收到数据包。由于该 MAC 地址不是 D 本地的，并且 D 是以太网网络的指定路由器，因此它会启动到 C 的路径发现过程。

路径发现完成后，D 获知 C 可经由 B 到达。现在 D 封装该数据包，并将其转发回以太网网络。封装后的数据包由交换机转发，由 B 接收并转发，最终由 C 接收。到目前为止一切正常。

现在 C 很可能会响应该数据包。由于 B 已经知道 A 的位置，他将解封装并转发回复数据包。但此时交换机会学习到 C 的 MAC 地址可通过 B 到达！这意味着，下次当有来自 A、发往 C 的数据到达时，交换机将*只*向 B 转发数据（而 B 当然会静默忽略该数据包）！

相反，如果 B 承担指定路由器的角色，一切都会正常，因为流量不必两次经过以太网交换机。

***故障排除***：避免此类配置，或在交换机上禁用 MAC 地址学习。请注意，在许多交换机上无法这样做。

另请注意，如果满足以下任一条件，则不会出现问题：

- 路由器 A 支持并配置为使用 HWMP+。
- 或者将以太网交换机替换为支持 HWMP+ 且已将以太网接口添加为 mesh 端口的路由器。

### 问题示例 2：无线模式 {#problematic-example-2-wireless-modes}

*考虑以下（无效）配置示例*……*路由器 A 和 B 位于 mesh 内，路由器 C 位于 mesh 外。对于路由器 A 和 B，所有接口均添加为 mesh 端口：*

![](/img/1e417ebd5022491a.webp)

现在无法在路由器 B 上桥接 wlan1 和 wlan2。如果了解 WDS 的工作原理，原因就很明显了。WDS 通信使用四地址帧。这是因为对于无线多跳转发，需要知道中间跳的地址，以及原始发送方和最终接收方的地址。相比之下，非 WDS 802.11 通信在帧中只包含三个 MAC 地址。这就是为什么无法在 station 模式下进行多跳转发。

***故障排除***取决于要实现的目标：

1. 如果希望 router C 作为无线或以太网流量的中继器，请在 router B 和 router C 之间配置 WDS 链路，并在所有节点上运行 mesh 路由协议。
2. 在其他情况下，请将 router B 上的 wlan2 配置为 AP 模式，并将 router C 上的 WLAN 配置为 station 模式。
