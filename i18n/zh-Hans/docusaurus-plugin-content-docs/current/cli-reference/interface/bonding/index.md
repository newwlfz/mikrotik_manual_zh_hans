---
sidebar_key: "cli-reference/interface/bonding"
title: "bonding"
sidebar_label: 'bonding'
source: https://manual.mikrotik.com/docs/cli-reference/interface/bonding
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/bonding {#interfacebonding}
**类型：** 目录

[绑定](../../../high-availability-solutions/bonding.md) 用于高可用性解决方案。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">disabled.</ArgTableRow>
<ArgTableRow arg="R" typ="running">running.</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">Bonding 接口的名称。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">最大传输单元，单位为字节。必须小于或等于 bonding 从接口中最小的 L2MTU 值。</ArgTableRow>
<ArgTableRow arg="forced-mac-address" typ="macAddr">默认情况下，bonding 接口将使用第一个选定的从接口的 MAC 地址。此属性允许为 bond 接口配置静态 MAC 地址（全零、广播或组播地址将不会生效）。RouterOS 会自动更改从接口的 MAC 地址，并且它将在 [`/interface/ethernet`](../ethernet/index.md) 配置导出中可见</ArgTableRow>
<ArgTableRow arg="arp" typ="enum (disabled | enabled | proxy-arp | reply-only | local-proxy-arp) { disabled:0, enabled:1, proxy-arp:2, reply-only:3, local-proxy-arp:4 }">[地址解析协议](../../../getting-started/networking-fundamentals/index.md#arp-and-tying-it-all-together) 模式。</ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="alt { arp-timeout: enum (auto) { auto:0 }
, arp-timeout: time
 }">在未收到来自 IP 的数据包后，ARP 记录在 ARP 表中保留多长时间。值 auto 等于 IP/Settings 中 arp-timeout 的值，默认为 30s。</ArgTableRow>
<ArgTableRow arg="slaves" typ="multi { array-id, slave: iface_enum
 }">至少两个用逗号分隔的、类似以太网的接口，将用于 bonding。</ArgTableRow>
<ArgTableRow arg="mode" typ="enum (balance-rr | active-backup | balance-xor | broadcast | 802.3ad | balance-tlb | balance-alb) { balance-rr:0, active-backup:1, balance-xor:2, broadcast:3, 802.3ad:4, balance-tlb:5, balance-alb:6 }">
指定一种 bonding 策略。
- `802.3ad` - LACP，IEEE 802.3ad 动态链路聚合。在此模式下，接口会聚合到一个组中，其中每个从接口具有相同的速率。它提供容错和负载均衡。传出流量的从接口选择根据 `transmit-hash-policy` 进行。
- `active-backup` - 提供链路备份，同一时间只有一个从接口处于活动状态。
- `balance-alb` - 自适应负载均衡，传出和传入流量均得到均衡。设备驱动程序应支持更改其 MAC 地址。
- `balance-rr` - 轮询负载均衡。bonding 接口中的从接口将按顺序发送和接收数据。它提供负载均衡和容错。
- `balance-tlb` - 传出流量根据当前负载进行分配。传入流量不进行均衡，由当前从接口接收。如果接收从接口发生故障，则另一个从接口会接管故障从接口的 MAC 地址。
- `balance-xor` - 静态 LAG，基于 `transmit-hash-policy` 进行传输。此模式提供负载均衡和容错。
- `broadcast` - 在所有接口上广播相同的数据。这提供容错，但会在一些较慢的机器上降低流量吞吐量。

搭载 Marvell Prestera 交换芯片以及 88E6393X、88E6191X、88E6190 交换机芯片的 MikroTik 设备支持 bonding 接口的网桥硬件卸载。
只有 `802.3ad`（LACP）、`balance-xor`（静态 LAG）和 `active-backup` bonding 模式支持硬件卸载，其他 bonding 模式将使用 CPU 的资源。
</ArgTableRow>
<ArgTableRow arg="primary" typ="iface_enum { none:0 }">控制活动从接口之间的主接口，仅对 `active-backup`、`balance-tlb` 和 `balance-alb` 模式有效。对于 `active-backup` 模式，它控制由哪个正在运行的接口负责发送和接收流量。对于 `balance-tlb` 模式，它控制由哪个正在运行的接口负责接收所有流量，而对于 `balance-alb` 模式，它控制由哪个接口负责接收不均衡流量（非 IPv4 流量）。当没有接口被选为主接口时，设备将自动选择配置为第一个的接口。</ArgTableRow>
<ArgTableRow arg="link-monitoring" typ="enum (none | arp | mii) { none:0, arp:1, mii:2 }">
用于监控链路的方法。某些 bonding 模式需要特定的链路监控才能正常工作。
- `arp` - 使用 ARP 确定远程接口是否可达。
- `mii` - 使用媒体独立接口确定链路状态。链路状态判定依赖于设备驱动程序。
- `none` - 不进行链路监控。
</ArgTableRow>
<ArgTableRow arg="arp-interval" typ="time">以毫秒为单位的时间，定义监控 ARP 请求的频率。</ArgTableRow>
<ArgTableRow arg="arp-ip-targets" typ="multi { array-id, arp-target: ipAddr
 }">当 link-monitoring 设置为 arp 时，将监控的 IP 目标地址。可以指定多个 IP 地址，用逗号分隔。</ArgTableRow>
<ArgTableRow arg="mii-interval" typ="time">监控链路故障的频率（仅在 link-monitoring 为 mii 时使用）。</ArgTableRow>
<ArgTableRow arg="down-delay" typ="time">如果检测到链路故障，bonding 接口会在 down-delay 时间内被禁用。仅在 link-monitoring 设置为 mii 时生效。</ArgTableRow>
<ArgTableRow arg="up-delay" typ="time">如果链路已恢复，bonding 接口会在 up-delay 时间内被禁用。仅在 link-monitoring 设置为 mii 时生效。</ArgTableRow>
<ArgTableRow arg="lacp-rate" typ="enum (30secs | 1sec) { 30secs:0, 1sec:1 }">LACP 速率指定 bonding 对等体之间交换 LACPDU 的频率。`1sec` - 短超时。`30secs` - 长超时。</ArgTableRow>
<ArgTableRow arg="transmit-hash-policy" typ="enum (layer-2 | layer-3-and-4 | layer-2-and-3 | encap-2-and-3 | encap-3-and-4) { layer-2:0, layer-3-and-4:1, layer-2-and-3:2, encap-2-and-3:3, encap-3-and-4:4 }">
选择 balance-xor 和 802.3ad 模式下用于从接口选择的发送哈希策略。
- `layer-2` - 使用硬件 MAC 地址的 XOR 生成哈希。该算法会将发往特定网络对端的所有流量放在同一个从接口上。该算法符合 802.3ad。
- `layer-2-and-3` - 该策略结合二层和三层协议信息生成哈希。使用硬件 MAC 地址和 IP 地址的 XOR 生成哈希。该算法会将发往特定网络对端的所有流量放在同一个从接口上。对于非 IP 流量，其公式与 layer2 发送哈希策略相同。该策略旨在提供比仅使用 layer2 更均衡的流量分布，尤其是在需要三层网关设备才能到达大多数目标的环境中。该算法符合 802.3ad。
- `layer-3-and-4` - 该策略在可用时使用上层协议信息生成哈希。这使得发往特定网络对端的流量可以跨多个从接口，尽管单个连接不会跨多个从接口。对于分片的 TCP 或 UDP 数据包以及所有其他 IP 协议流量，将省略源端口和目的端口信息。对于非 IP 流量，其公式与 layer2 发送哈希策略相同。该算法不完全符合 802.3ad。
- `encap-2-and-3` - 该策略在分发流量时与 layer-2-and-3 方法类似，但还会使用一个过程来分析封装的数据包头。如果使用了封装协议（如隧道），它可能会选择内层包头而不是外层包头。当 6to4、GRE、GRE6、IPIP、IPIP6、PPPoE 或 PPTP 等隧道运行在 bonding 接口之上时，RouterOS 可以使用此功能。
- `encap-3-and-4` - 该策略在分发流量时与 layer-3-and-4 方法类似，但还会使用一个过程来分析封装的数据包头。如果使用了封装协议（如隧道），它可能会选择内层包头而不是外层包头。当 6to4、GRE、GRE6、IPIP、IPIP6、PPPoE 或 PPTP 等隧道运行在 bonding 接口之上时，RouterOS 可以使用此功能。
</ArgTableRow>
<ArgTableRow arg="min-links" typ="num">需要多少个活动从链路才能使 bonding 变为活动状态。</ArgTableRow>
<ArgTableRow arg="mlag-id" typ="num">更改 bonding 接口的 [MLAG](../../../high-availability-solutions/multi-chassis-link-aggregation-group.md) ID。两个对等设备上应使用相同的 MLAG ID 才能成功创建单个 MLAG。 不应将 [`mlag-peer-port`](../bridge/index.md#mlag-peer-port) 与 MLAG ID 一起配置。</ArgTableRow>
<ArgTableRow arg="lacp-user-key" typ="num">指定端口键的高 10 位。低 6 位根据各个端口的链路速率和双工模式自动分配。</ArgTableRow>
<ArgTableRow arg="lacp-mode" typ="enum (passive | active) { passive:0, active:1 }">
指定端口是主动还是被动参与 LACP。
- `active` - 端口主动发起 LACP 通信。
- `passive` - 端口仅响应 LACP 消息。
</ArgTableRow>
<ArgTableRow arg="lacp-strict" typ="bool"></ArgTableRow>
<ArgTableRow arg="lacp-system-id" typ="macAddr">指定用于 LACP 协商的 LACP 系统 ID。</ArgTableRow>
<ArgTableRow arg="lacp-system-priority" typ="num">指定用于 LACP 协商的 LACP 系统优先级。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mac-address" typ="macAddr">bonding 接口的 MAC 地址。</ArgTableRow>
</ArgTable>
