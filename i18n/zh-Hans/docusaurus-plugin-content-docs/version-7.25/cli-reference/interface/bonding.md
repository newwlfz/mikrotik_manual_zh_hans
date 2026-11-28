---
title: "bonding"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/bonding
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/bonding 
**类型：** 目录

[Bonding](/docs/high-availability-solutions/bonding) 用于高可用性解决方案。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled.</ArgTableRow>
<ArgTableRow arg="R" typ="running">running.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the bonding interface.</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">Maximum Transmit Unit in bytes. Must be smaller or equal to the smallest L2MTU value of a bonding slave.</ArgTableRow>
<ArgTableRow arg="forced-mac-address" typ="macAddr">By default, the bonding interface will use the MAC address of the first selected slave interface. This property allows to configure static MAC address for the bond interface (all zeros, broadcast or multicast addresses will not apply). RouterOS will automatically change the MAC address for slave interfaces and it will be visible in [`/interface/ethernet`](/docs/cli-reference/interface/ethernet) configuration export</ArgTableRow>
<ArgTableRow arg="arp" typ="enum (disabled | enabled | proxy-arp | reply-only | local-proxy-arp) { disabled:0, enabled:1, proxy-arp:2, reply-only:3, local-proxy-arp:4 }">[Address Resolution Protocol](/docs/getting-started/networking-fundamentals#arp-and-tying-it-all-together) mode.</ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="alt { arp-timeout: enum (auto) { auto:0 }
, arp-timeout: time
 }">How long the ARP record is kept in the ARP table after no packets are received from IP. Value auto equals the value of arp-timeout in IP/Settings, default is 30s.</ArgTableRow>
<ArgTableRow arg="slaves" typ="multi { array-id, slave: iface_enum
 }">At least two ethernet-like interfaces separated by a comma, which will be used for bonding.</ArgTableRow>
<ArgTableRow arg="mode" typ="enum (balance-rr | active-backup | balance-xor | broadcast | 802.3ad | balance-tlb | balance-alb) { balance-rr:0, active-backup:1, balance-xor:2, broadcast:3, 802.3ad:4, balance-tlb:5, balance-alb:6 }">
Specifies one of the bonding policies.
- `802.3ad` - LACP, IEEE 802.3ad dynamic link aggregation. In this mode, the interfaces are aggregated in a group where each slave shares the same speed. It provides fault tolerance and load balancing. Slave selection for outgoing traffic is done according to the `transmit-hash-policy`.
- `active-backup` - provides link backup, only one slave active at a time.
- `balance-alb` - adaptive load balancing, both outgoing and incoming traffic balanced. The device driver should have support for changing its MAC address.
- `balance-rr` - round-robin load balancing. Slaves in a bonding interface will transmit and receive data in sequential order. It provides load balancing and fault tolerance.
- `balance-tlb` - outgoing traffic distributed according to current load. Incoming traffic is not balanced and is received by the current slave. If receiving slave fails, then another slave takes the MAC address of the failed slave.
- `balance-xor` - static LAG, transmit based on `transmit-hash-policy`. This mode provides load balancing and fault tolerance.
- `broadcast` - broadcasts the same data on all interfaces. This provides fault tolerance but slows down traffic throughput on some slow machines.

带有 Marvell Prestera 交换机以及 88E6393X、88E6191X、88E6190 交换芯片的 MikroTik 设备支持带 bonding 接口的网桥硬件卸载。  
仅 `802.3ad`（LACP）、`balance-xor`（静态 LAG）和 `active-backup` bonding 模式支持硬件卸载，其他 bonding 模式将使用 CPU 资源。
</ArgTableRow>
<ArgTableRow arg="primary" typ="iface_enum { none:0 }">控制活动 slave 端口之间的主接口，仅适用于 `active-backup`、`balance-tlb` 和 `balance-alb` 模式。对于 `active-backup` 模式，它控制哪个运行中的接口应发送和接收流量。对于 `balance-tlb` 模式，它控制哪个运行中的接口应接收所有流量；对于 `balance-alb` 模式，它控制哪个接口应接收非均衡流量（非 IPv4 流量）。当没有接口被选为主接口时，设备将自动选择配置为第一个的接口。</ArgTableRow>
<ArgTableRow arg="link-monitoring" typ="enum (none | arp | mii) { none:0, arp:1, mii:2 }">
用于监控链路的方法。某些 bonding 模式需要特定的链路监控才能正常工作。
- `arp` - 使用 ARP 判断远端接口是否可达。
- `mii` - 使用 Media Independent Interface 判断链路状态。链路状态判断依赖设备驱动程序。
- `none` - 不进行链路监控。
</ArgTableRow>
<ArgTableRow arg="arp-interval" typ="time">以毫秒为单位的时间，定义监控 ARP 请求的频率。</ArgTableRow>
<ArgTableRow arg="arp-ip-targets" typ="multi { array-id, arp-target: ipAddr
 }">当 link-monitoring 设置为 arp 时，将被监控的 IP 目标地址。可以指定多个 IP 地址，以逗号分隔。</ArgTableRow>
<ArgTableRow arg="mii-interval" typ="time">监控链路故障的频率（仅在 link-monitoring 为 mii 时使用）。</ArgTableRow>
<ArgTableRow arg="down-delay" typ="time">如果检测到链路故障，bonding 接口将在 down-delay 时间内被禁用。仅在 link-monitoring 设置为 mii 时生效。</ArgTableRow>
<ArgTableRow arg="up-delay" typ="time">如果链路已恢复，bonding 接口将在 up-delay 时间内被禁用。仅在 link-monitoring 设置为 mii 时生效。</ArgTableRow>
<ArgTableRow arg="lacp-rate" typ="enum (30secs | 1sec) { 30secs:0, 1sec:1 }">LACP rate 指定 bonding 对等体之间交换 LACPDU 的频率。`1sec` - 短超时。`30secs` - 长超时。</ArgTableRow>
<ArgTableRow arg="transmit-hash-policy" typ="enum (layer-2 | layer-3-and-4 | layer-2-and-3 | encap-2-and-3 | encap-3-and-4) { layer-2:0, layer-3-and-4:1, layer-2-and-3:2, encap-2-and-3:3, encap-3-and-4:4 }">
选择 balance-xor 和 802.3ad 模式下用于 slave 选择的传输哈希策略。
- `layer-2` - 使用硬件 MAC 地址的 XOR 生成哈希。该算法会将发往特定网络对等体的所有流量放到同一个 slave 上。该算法符合 802.3ad。
- `layer-2-and-3` - 该策略使用 layer2 和 layer3 协议信息的组合生成哈希。使用硬件 MAC 地址和 IP 地址的 XOR 生成哈希。该算法会将发往特定网络对等体的所有流量放到同一个 slave 上。对于非 IP 流量，公式与 layer2 传输哈希策略相同。该策略旨在提供比单独使用 layer2 更均衡的流量分布，尤其是在需要 layer3 网关设备才能到达大多数目的地的环境中。该算法符合 802.3ad。
- `layer-3-and-4` - 该策略在可用时使用上层协议信息生成哈希。这允许发往特定网络对等体的流量跨越多个 slave，但单个连接不会跨越多个 slave。对于分片的 TCP 或 UDP 数据包以及所有其他 IP 协议流量，会省略源端口和目的端口信息。对于非 IP 流量，公式与 layer2 传输哈希策略相同。该算法不完全符合 802.3ad。
- `encap-2-and-3` - 该策略的工作方式类似于 layer-2-and-3 流量分发方法，但会使用额外过程分析封装的数据包报头。如果使用封装协议（如隧道），它可能会选择内部报头而不是外部报头。当 6to4、GRE、GRE6、IPIP、IPIP6、PPPoE 或 PPTP 等隧道运行在 bonding 接口上时，RouterOS 可以使用此功能。
- `encap-3-and-4` - 该策略的工作方式类似于 layer-3-and-4 流量分发方法，但会使用额外过程分析封装的数据包报头。如果使用封装协议（如隧道），它可能会选择内部报头而不是外部报头。当 6to4、GRE、GRE6、IPIP、IPIP6、PPPoE 或 PPTP 等隧道运行在 bonding 接口上时，RouterOS 可以使用此功能。
</ArgTableRow>
<ArgTableRow arg="min-links" typ="num">bonding 变为活动状态所需活动 slave 链路的数量。</ArgTableRow>
<ArgTableRow arg="mlag-id" typ="num">更改 bonding 接口的 [MLAG](/docs/high-availability-solutions/multi-chassis-link-aggregation-group) ID。两个对等体设备上应使用相同的 MLAG ID，以成功创建单个 MLAG。[`mlag-peer-port`](/docs/cli-reference/interface/bridge#mlag-peer-port) 不应配置 MLAG ID。</ArgTableRow>
<ArgTableRow arg="lacp-user-key" typ="num">指定端口 key 的高 10 位。低 6 位会根据各端口的链路速度和双工模式自动分配。</ArgTableRow>
<ArgTableRow arg="lacp-mode" typ="enum (passive | active) { passive:0, active:1 }">
指定端口以主动方式还是被动方式参与 LACP。
- `active` - 端口主动发起 LACP 通信。
- `passive` - 端口仅响应 LACP 消息。
</ArgTableRow>
<ArgTableRow arg="lacp-system-id" typ="macAddr">指定用于 LACP 协商的 LACP system ID。</ArgTableRow>
<ArgTableRow arg="lacp-system-priority" typ="num">指定用于 LACP 协商的 LACP system priority。</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="mac-address" typ="macAddr">MAC address of the bonding interface.</ArgTableRow>
</ArgTable>
