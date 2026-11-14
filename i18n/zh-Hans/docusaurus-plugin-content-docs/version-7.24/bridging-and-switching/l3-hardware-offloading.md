---
sidebar_key: "bridging-and-switching/l3-hardware-offloading"
sidebar_position: 2
title: "L3 硬件卸载"
sidebar_label: "L3 硬件卸载"
description: "L3 Hardware Offloading 通过将 CPU 密集型任务卸载到交换芯片，实现线速路由。本页详细介绍如何为整个交换机、单个端口配置 L3HW，以及如何配置 IPv6 支持和 FastTrack 卸载等全局设置，并给出关于可能影响现有连接的警告。"
tags:
  - 'l3hw'
  - 'switching'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/l3-hardware-offloading
captured_at: '2026-11-04T11:27:10+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**三层硬件卸载**（**L3HW**，也称为 IP 交换或 HW 路由）允许将部分路由器功能卸载到交换芯片上。这使得路由数据包时能够达到线速，而仅靠 CPU 根本无法做到。

## 交换机配置 {#switch-configuration}

要启用三层硬件卸载，请为交换机设置 `l3-hw-offloading=yes`：

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
```

### 交换机端口配置 {#switch-port-configuration}

可以为每个物理交换机端口配置三层硬件卸载。例如：

```ros
/interface/ethernet/switch/port/set sfp-sfpplus1 l3-hw-offloading=yes
```

请注意，交换机和端口的 l3hw 设置不同：

- 为交换机设置 `l3-hw-offloading``=no` 会完全禁用卸载——所有数据包都将由 CPU 路由。
- 但是，为交换机端口设置 `l3-hw-offloading``=no` 仅会禁用往返该特定端口的硬件路由。此外，该端口仍可参与 Fasttrack 连接卸载。

要启用完整的硬件路由，请在所有交换机端口上启用 l3hw：

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
/interface/ethernet/switch/port/set [find] l3-hw-offloading=yes
```

要使所有数据包先经过 CPU，并仅卸载 Fasttrack 连接，请在所有端口上禁用 l3hw，但在交换芯片本身上保持启用：

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
/interface/ethernet/switch/port/set [find] l3-hw-offloading=no
```

:::info
**当入端口和出端口都设置了 `l3-hw-offloading=yes` 时，数据包由硬件路由。**

如果入端口和出端口都设置了 `l3-hw-offloading=no`，数据包将经过 CPU/防火墙，同时仅卸载 Fasttrack 连接。

可以通过仅在出端口上设置 `l3-hw-offloading=no` 来让数据包经过 CPU/防火墙。然而，仅在入端口上设置 `l3-hw-offloading=no` 可能导致不可预测的行为，例如数据包仍可能由硬件路由并完全绕过 CPU/防火墙。
:::

下一个示例在所有端口上启用硬件路由，但上行端口（sfp-sfpplus16）除外。往返 sfp-sfpplus16 的数据包将进入 CPU，因此会接受防火墙/NAT 处理。

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
/interface/ethernet/switch/port/set [find] l3-hw-offloading=yes
/interface/ethernet/switch/port/set sfp-sfpplus16 l3-hw-offloading=no
```

:::warning
现有连接可能不受 `l3-hw-offloading` 设置更改的影响。
:::

### L3HW 设置 {#l3hw-settings}

#### 基本设置 {#basic-settings}

L3HW 设置菜单允许为三层硬件卸载驱动程序配置全局参数。

**子菜单：** `/interface/ethernet/switch/l3hw-settings`

| 属性 | 描述 |
| :-- | :-- |
| **autorestart** (*yes \| no*; 默认值：**no**) | 自动在发生错误时重启 l3hw 驱动程序。否则，如果发生错误，`l3-hw-offloading` 会被禁用，并且错误代码会显示在交换机设置和 [#monitor](./l3-hardware-offloading.md#monitor) 中。Autorestart 不适用于系统故障，例如 OOM（Out Of Memory）。 |
| **fasttrack-hw** (*yes \| no*; 默认值：**yes**(if supported)) | 启用或禁用 FastTrack 硬件卸载。除非需要预留硬件 TCAM 内存（例如用于动态创建交换机 ACL 规则），否则请保持启用。并非所有交换芯片都支持 FastTrack 硬件卸载（请参阅 **hw-supports-fasttrack**）。 |
| **ipv6-hw** (*yes \| no*; 默认值：**no**) | 启用或禁用 IPv6 硬件卸载。由于 IPv6 路由占用大量硬件内存，只有在 IPv6 流量速度足够高且能从硬件路由中受益时才启用它。 |
| **icmp-reply-on-error** (*yes \| no*; 默认值：**yes**) | 由于硬件无法发送 ICMP 消息，发生错误（例如“Time Exceeded”、“Fragmentation required”等）时，必须将数据包重定向到 CPU 才能发送 ICMP 回复。启用 icmp-reply-on-error 有助于网络诊断，但可能为 DDoS 攻击带来潜在漏洞。禁用 icmp-reply-on-error 后，发生错误时会在硬件层面静默丢弃数据包。 |

**只读属性**

| 属性 | 描述 |
| :-- | :-- |
| **hw-supports-fasttrack** (**yes \| no**) | 指示硬件（交换芯片）是否支持 FastTrack 硬件卸载。 |

#### 高级设置 {#advanced-settings}

此菜单允许针对特定使用场景调整 l3hw 设置。

:::danger
除非得到 MikroTik 支持团队或 MikroTik 认证路由工程师的指示，否则不建议更改高级 L3HW 设置。应用不正确的设置可能会破坏 L3HW 的运行。
:::

**子菜单：** `/interface/ethernet/switch/l3hw-settings`

| 属性 | 描述 |
| :-- | :-- |
| **route-queue-limit-high** (*number*; 默认值：**256**) | 当 <strong>route-queue-size</strong>（参见 [#monitor](./l3-hardware-offloading.md#monitor)）超过此值时，交换机驱动程序会停止路由索引。降低此值会加快路由处理，但会增加路由出现在 RouterOS 中与进入硬件内存之间的延迟。 <br/> 设置 <strong>route-queue-limit-high=0</strong> 会在处理队列中存在任何路由时禁用路由索引——CPU 使用效率最高，但硬件卸载前的延迟最长。适用于只有静态路由的情况。当路由表频繁变化时，不建议与路由协议（如 BGP 或 OSPF）一起使用。 |
| **route-queue-limit-low** (*number*; 默认值：**0**) | 当 <strong>route-queue-size</strong> 降至该值时，重新启用路由索引。不得超过高限值。 <br/> 设置 <strong>route-queue-limit-low=0</strong> 会告知交换机驱动程序在下一次硬件卸载尝试之前处理所有待处理路由。虽然这是期望的行为，但在持续 BGP 路由供给下可能会完全阻塞硬件卸载。 |
| **shwp-reset-counter** (*number*; 默认值：**128**) | 重置最短硬件前缀（参见 [#monitor](./l3-hardware-offloading.md#monitor) 中的 <strong>ipv4-shortest-hw-prefix</strong> / <strong>ipv6-shortest-hw-prefix</strong>），并在路由表发生此数量次更改后尝试进行全路由表卸载。在部分卸载时，当整个路由表无法装入硬件内存且较短前缀被重定向到 CPU 时，理论上无需尝试卸载比 SHWP 更短的路由前缀，因为这些前缀无论如何都会被重定向到 CPU。然而，路由表的重大变化可能导致不同的索引布局，因此可硬件卸载的路由数量也会不同。这就是建议偶尔进行全表重新索引的原因。 <br/> 降低此值可能允许更多路由被硬件卸载，但会增加 CPU 使用率，反之亦然。设置 <strong>shwp-reset-counter=0</strong> 会在每次路由表更改后始终执行全量重新索引。 <br/> 此设置仅在部分卸载期间使用，当 <strong>ipv4-shortest-hw-prefix=0</strong>（以及对应的 IPv6）时无效。 |
| **partial-offload-chunk** (*number*; 默认值：**1024**，最小值：16) | 部分卸载时增量添加的最小路由数。取决于交换芯片型号，路由会按原样卸载（RouterOS 中的每个路由条目对应硬件内存中的一个条目），或者会被索引，然后写入硬件内存的是索引条目。此设置仅在部分卸载期间用于后者。 <br/> 由于索引碎片化，添加单条 IPv4 路由可能占用 -3 到 +6 个 LPM 硬件内存块（某些路由添加可能因索引碎片整理而降低所需硬件内存量）。因此，无法预测可装入硬件内存的确切路由数量。交换机驱动程序使用二分拆分算法来查找可装入硬件的最大路由数。 <br/> 假设有 128k 条路由，且它们都无法装入硬件内存。算法将数量减半并尝试卸载 64k 条路由。假设卸载成功。在下一次迭代中，算法选择 96k，假设失败；然后 80k——再次失败，72k——成功，76k，依此类推，直到成功和失败数量之间的差值低于 <strong>partial-offload-chunk</strong> 值。 <br/> 降低 <strong>partial-offload-chunk</strong> 值会增加硬件卸载的路由数量，但也会提高 CPU 使用率，反之亦然。 |
| **route-index-delay-min** (*time*; 默认值：**1s**) | 路由处理与其卸载之间的最小延迟。该延迟允许一起处理更多路由并一次性卸载它们，从而节省 CPU 使用率。它还通过减少每条路由的处理工作来加快整个路由表的卸载。另一方面，它会减慢单条路由的卸载速度。 <br/> 如果在延迟期间收到额外路由，则延迟会重置为 <strong>route-index-delay-min</strong> 值。在延迟期间添加越来越多路由会不断重置计时器，直到达到 <strong>route-index-delay-max</strong>。 |
| **route-index-delay-max** (*time*; 默认值：**10s**) | 路由处理与其卸载之间的最大延迟。达到最大延迟时，即使还有更多待处理路由，已处理的路由也会被卸载。但是，**route-queue-limit-high** 的优先级高于此设置，这意味着达到某个队列大小时，索引/卸载无论如何都会暂停。 |
| **neigh-keepalive-interval** (*time*; 默认值：**15s**，最小值：5s) | 邻居（主机）保活间隔。当主机（IP 邻居）被硬件卸载后，往返它的所有流量都由交换芯片路由，RouterOS 可能会认为该邻居不活跃并将其删除。为防止这种情况，交换机驱动程序必须通过定期向 RouterOS 发送刷新来保持已卸载邻居存活。 |
| **neigh-discovery-interval** (*time*; 默认值：**1m37s**，最小值：30s) | 遗憾的是，交换芯片不提供按邻居统计的信息。因此，检查已卸载主机是否仍活跃的唯一方法是偶尔向所连接网络发送 ARP（IPv4）/ 邻居发现（IPv6）请求。增大该值会降低广播流量，但可能会让不活跃主机在硬件内存中保留更长时间。 <br/> 邻居发现会在邻居保活工作中触发。因此，发现时间会向上取整到下一个保活会话。请为 <strong>neigh-discovery-interval</strong> 选择一个不能被 <strong>neigh-keepalive-interval</strong> 整除的值，以便在不同会话中发送 ARP/ND 请求，防止广播突发。 |
| **neigh-discovery-burst-limit**(*number*; 默认值：**64**) | 一次可发送的 ARP/ND 请求最大数量。 |
| **neigh-discovery-burst-delay** (*time*; 默认值：**300ms**，最小值：10ms) | 如果请求数量超过 **neigh-discovery-burst-limit**，则为 ARP/ND 后续突发之间的延迟。 |

:::info
某些设置仅适用于特定交换机型号。
:::

#### 监控 {#monitor}

L3HW Monitor 功能已在 RouterOS 7.10 版本中引入。它允许监控与 L3HW 相关的交换芯片和驱动程序统计信息。

```ros
/interface/ethernet/switch/l3hw-settings/monitor
        ipv4-routes-total: 99363
           ipv4-routes-hw: 61250
          ipv4-routes-cpu: 38112
  ipv4-shortest-hw-prefix: 24
               ipv4-hosts: 87
        ipv6-routes-total: 15
           ipv6-routes-hw: 11
          ipv6-routes-cpu: 4
  ipv6-shortest-hw-prefix: 0
               ipv6-hosts: 7
         route-queue-size: 118
     fasttrack-ipv4-conns: 2031
   fasttrack-hw-min-speed: 0
              nexthop-cap: 8192
            nexthop-usage: 93
    vxlan-mtu-packet-drop: 0
```

**统计信息**

| 属性 | 描述 |
| :-- | :-- |
| **ipv4-routes-total** | 由交换机驱动程序处理的 IPv4 路由总数。 |
| **ipv4-routes-hw** | 硬件卸载的 IPv4 路由数量（又称硬件路由） |
| **ipv4-routes-cpu** | 重定向到 CPU 的 IPv4 路由数量（又称软件路由） |
| **ipv4-shortest-hw-prefix** | IPv4 的*最短硬件前缀 (SHWP)*。如果整个 IPv4 路由表无法装入硬件内存，则应用*部分卸载*，其中最长前缀被硬件卸载，而较短前缀被重定向到 CPU。此字段显示卸载到硬件内存的最短路由前缀（/x）。所有比该前缀更短的前缀均由 CPU 处理。`ipv4-shortest-hw-prefix=0` 表示整个 IPv4 路由表都卸载到硬件内存。 |
| **ipv4-hosts** | 硬件卸载的 IPv4 主机（/32 路由）数量 |
| **ipv6-routes-total** <sup>1</sup> | 由交换机驱动程序处理的 IPv6 路由总数。 |
| **ipv6-routes-hw** <sup>1</sup> | 硬件卸载的 IPv6 路由数量（又称硬件路由） |
| **ipv6-routes-cpu** <sup>1</sup> | 重定向到 CPU 的 IPv6 路由数量（又称软件路由） |
| **ipv6-shortest-hw-prefix** <sup>1</sup> | IPv6 的*最短硬件前缀 (SHWP)*。如果整个 IPv6 路由表无法装入硬件内存，则应用*部分卸载*，其中最长前缀被硬件卸载，而较短前缀被重定向到 CPU。此字段显示卸载到硬件内存的最短路由前缀（/x）。所有比该前缀更短的前缀均由 CPU 处理。`ipv6-shortest-hw-prefix=0` 表示整个 IPv6 路由表都卸载到硬件内存。 |
| **ipv6-hosts** <sup>1</sup> | 硬件卸载的 IPv6 主机（/128 路由）数量 |
| **route-queue-size** | 队列中等待交换机芯片驱动程序处理的路由数量。正常工作条件下，此字段为 0，表示所有路由均由驱动程序处理。 |
| **nexthop-cap** | 下一跳容量。 |
| **nexthop-usage** | 当前使用的下一跳数量。 |
| **vxlan-mtu-packet-drop** | 由于超出接口 MTU 设置而丢弃的 VXLAN 数据包数量。 |
| **fasttrack-ipv4-conns** <sup>2</sup> | 硬件卸载的 FastTrack 连接数量。 |
| **fasttrack-hw-min-speed** <sup>2</sup> | 当用于存储 FastTrack 的硬件内存已满时，此字段显示硬件卸载的 FastTrack 连接的最低速度（字节/秒）。较慢的连接由 CPU 路由。 |

---

<sup>1</sup> IPv6 统计信息仅在启用 IPv6 硬件路由（`ipv6-hw=yes`）时出现  
<sup>2</sup> FastTrack 统计信息仅在启用 FastTrack 连接硬件卸载（`fasttrack-hw=yes`）时出现

#### 高级监控 {#advanced-monitor}

Monitor 的增强版本，为高级用户提供额外遥测数据。高级监控包含基本监控中的所有数据，以及下面列出的字段。

```ros
/interface/ethernet/switch/l3hw-settings/advanced> monitor once
        ipv4-routes-total: 29968
           ipv4-routes-hw: 29957
          ipv4-routes-cpu: 11
  ipv4-shortest-hw-prefix: 0
               ipv4-hosts: 3
        ipv6-routes-total: 4
           ipv6-routes-hw: 0
          ipv6-routes-cpu: 4
  ipv6-shortest-hw-prefix: 0
               ipv6-hosts: 0
         route-queue-size: 0
         route-queue-rate: 0
       route-process-rate: 0
     fasttrack-ipv4-conns: 0
     fasttrack-queue-size: 0
     fasttrack-queue-rate: 0
   fasttrack-process-rate: 0
   fasttrack-hw-min-speed: 0
   fasttrack-hw-offloaded: 0
    fasttrack-hw-unloaded: 0
                  lpm-cap: 54560
                lpm-usage: 31931
             lpm-bank-cap: 2728
           lpm-bank-usage: 46,0,0,0,2589,2591,1983,0,2728,2728,2728,2728,2728,2728,2728,2728,2728,170,0,0
                  pbr-cap: 8192
                pbr-usage: 0
             pbr-lpm-bank: 3
                nat-usage: 0
              nexthop-cap: 8192
            nexthop-usage: 85
```

**统计信息**

| 属性 | 描述 |
| :-- | :-- |
| **route-queue-rate** | 路由被添加到队列中等待交换机驱动程序处理的速率。换言之，即 **route-queue-size** 的增长速率（路由/秒） |
| **route-process-rate** | 交换机驱动程序处理先前排队路由的速率。换言之，即 **route-queue-size** 的缩减速率（路由/秒） |
| **fasttrack-queue-size** | 队列中等待交换机芯片驱动程序处理的 FastTrack 连接数量。 |
| **fasttrack-queue-rate** | FastTrack 连接被添加到队列中等待交换机驱动程序处理的速率。换言之，即 **fasttrack-queue-size** 的增长速率（连接/秒） |
| **fasttrack-process-rate** | 交换机驱动程序处理先前排队的 FastTrack 连接的速率。换言之，即 **fasttrack-queue-size** 的缩减速率（连接/秒） |
| **fasttrack-hw-offloaded** | 卸载到硬件的 FastTrack 连接数量。计数器每秒（或每个监控间隔）重置。 |
| **fasttrack-hw-unloaded** | 从硬件卸载（重定向到软件路由）的 FastTrack 连接数量。计数器每秒（或每个监控间隔）重置。 |
| **lpm-cap** | LPM 硬件表的大小（LPM = Longest Prefix Match）。LPM 存储用于硬件路由的路由索引。并非每个交换芯片型号都使用 LPM。其他型号使用 TCAM。 |
| **lpm-usage** | 已使用的 LPM 块数量。**lpm-usage**/ **lpm-cap** = 使用百分比。 |
| **lpm-bank-cap** | LPM 内存按 bank（特殊内存单元）组织。bank 大小取决于交换芯片型号。此值显示单个 bank 的大小（以 LPM 块为单位）。**lpm-cap** / **lpm-bank-cap** = bank 数量（通常为 20）。 |
| **lpm-bank-usage** | 每个 bank 的 LPM 使用量（以 LPM 块为单位） |
| **pbr-cap** | 策略路由（PBR）硬件表的大小。PBR 用于 FastTrack 连接的 NAT 卸载。 |
| **pbr-usage** | 已使用的 PBR 条目数量。**pbr-usage**/ **pbr-cap** = 使用百分比。 |
| **pbr-lpm-bank** | PBR 与路由表共享 LPM 内存 bank。此值显示与 PBR 共享的 LPM bank 索引（0 = 第一个 bank）。 |
| **nat-usage** | 已使用的 NAT 硬件条目数量（用于 FastTrack 连接）。 |

### 接口列表 {#interface-lists}

无法直接使用接口列表来控制 `l3-hw-offloading`，因为接口列表可能包含虚拟接口（例如 VLAN），而 `l3-hw-offloading` 设置只能应用于物理交换机端口。例如，如果同一个交换机端口（trunk 端口）上运行着两个 VLAN 接口（vlan20 和 vlan30），则无法在 vlan20 上启用硬件路由而同时在 vlan30 上保持禁用。

但是，接口列表可以用作端口选择器。以下示例演示如何在 LAN 端口（属于 "LAN" 接口列表的端口）上启用硬件路由，并在 WAN 端口上禁用它：

```ros
:foreach i in=[/interface/list/member/find where list=LAN] do={
    /interface/ethernet/switch/port/set [/interface/list/member/get $i interface] l3-hw-offloading=yes
}

:foreach i in=[/interface/list/member/find where list=WAN] do={
    /interface/ethernet/switch/port/set [/interface/list/member/get $i interface] l3-hw-offloading=no
}
```

请注意，由于接口列表不直接用于硬件路由控制，**修改接口列表也不会自动反映到 l3hw 更改中**。例如，将交换机端口添加到 "LAN" 接口列表并不会自动在其上启用 `l3-hw-offloading`。用户必须重新运行上述脚本才能应用更改。

### MTU {#mtu}

硬件最多支持 8 个 MTU 配置文件，这意味着用户最多可为接口设置 8 个不同的 MTU 值：默认值 1500 + 七个自定义值。

:::tip
建议在更改接口上的 MTU/L2MTU 值时禁用 `l3-hw-offloading`。
:::

**MTU 更改示例**

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=no
/interface/set sfp-sfpplus1 mtu=9000 l2mtu=9022
/interface/set sfp-sfpplus2 mtu=9000 l2mtu=9022
/interface/set sfp-sfpplus3 mtu=10000 l2mtu=10022
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
```

### 二层依赖 {#layer-2-dependency}

三层硬件处理位于二层硬件处理之上。因此，L3HW 卸载要求底层接口启用 L2HW 卸载。后者默认启用，但有一些例外。例如，带有 Marvell Prestera 交换机的 MikroTik 设备仅支持一个硬件网桥。如果有多个网桥，其他网桥由 CPU 处理，并且不受 L3HW 影响。

另一个例子是 ACL 规则。如果规则将流量重定向到 CPU 进行软件处理，则不会触发硬件路由（L3HW）：

#### 用于禁用特定端口硬件处理的 ACL 规则 {#acl-rule-to-disable-hardware-processing-on-a-specific-port}

```ros
/interface/ethernet/switch/rule/add switch=switch1 ports=ether1 redirect-to-cpu=yes
```

:::tip
建议在配置二层时关闭 L3HW 卸载。
:::

为确保三层在软件和硬件两方面都与二层保持同步，我们建议在配置二层功能时禁用 L3HW。该建议适用于以下配置：

- 添加/移除/启用/禁用网桥。
- 向网桥添加/从网桥移除交换机端口。
- 绑定交换机端口 / 移除绑定。
- 更改 VLAN 设置。
- 更改交换机端口上的 MTU/L2MTU。
- 更改以太网（MAC）地址。

简而言之，在 `/interface/bridge/` 和 `/interface/vlan/` 下进行更改时，请禁用 `l3-hw-offloading`：

#### 二层配置模板 {#layer-2-configuration-template}

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=no

/interface/bridge
# 在此处放置 bridge 配置更改

/interface/vlan
# 定义/更改 VLAN 接口
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
```

### MAC telnet {#mac-telnet}

当在 **98DX8xxx**、**98DX4xxx,** 或 **98DX325x** 交换芯片上启用 L3HW 卸载时，MAC telnet 存在限制。来自 MAC Telnet 的数据包会被丢弃且不会到达 CPU，因此对设备的访问将失败。

如果希望将 MAC telnet 与 L3HW 结合使用，可以创建特定的 ACL 规则来强制这些数据包进入 CPU。

例如，如果需要在 sfp-sfpplus1 和 sfp-sfpplus2 上使用 MAC telnet 访问，则需要添加此 ACL 规则。使用 `ports` 设置还可以选择更多接口。

```ros
/interface/ethernet/switch/rule
add dst-port=20561 ports=sfp-sfpplus1,sfp-sfpplus2 protocol=udp redirect-to-cpu=yes switch=switch1
```

### VLAN 间路由 {#inter-vlan-routing}

由于 L3HW 依赖 L2HW，而 L2HW 负责 VLAN 处理，因此 VLAN 间*硬件*路由需要底层有硬件网桥。即使某个 VLAN 只有一个标记端口成员，该端口也必须是网桥成员。不要将 VLAN 接口直接分配给交换机端口！否则 L3HW 卸载会失败，流量将由 CPU 处理：

`/interface/vlan/add interface=ether2 name=vlan20 vlan-id=20`

改为将 VLAN 接口分配给网桥。这样，VLAN 配置会被卸载到硬件，并且在启用 L3HW 后，流量将接受 VLAN 间硬件路由处理。

#### VLAN 配置示例 {#vlan-configuration-example}

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=no
/interface/bridge/port/add bridge=bridge interface=ether2
/interface/bridge/vlan/add bridge=bridge tagged=bridge,ether2 vlan-ids=20
/interface/vlan/add interface=bridge name=vlan20 vlan-id=20
/ip/address/add address=192.0.2.1/24 interface=vlan20
/interface/bridge/set bridge vlan-filtering=yes
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
```

:::info
对于 VLAN 间路由，网桥接口必须是每个可路由的 `/interface/bridge/vlan/` 条目的带标签成员。
:::

### 按 VLAN 卸载 {#per-vlan-offloading}

自 RouterOS 7.21 起，可以使用 `/interface/vlan` 菜单中的 `l3-hw-offloading=yes|no` 设置为各个 VLAN 接口配置 L3HW 卸载。这样可以更精细地控制哪些 VLAN（及其相关路由）卸载到交换芯片，哪些由 CPU 处理。不再需要为了禁用特定 VLAN 的 L3HW 路由而在交换机端口上禁用 L3HW。

仅当满足以下所有条件时，VLAN 接口才会被卸载（获得 H 标记）：

- VLAN 接口具有 `l3-hw-offloading=yes`。
- VLAN 接口创建在硬件卸载的 vlan-filtering 网桥上。
- 作为该 VLAN 成员的所有交换机端口都具有 l3-hw-offloading=yes。

对于 VLAN 间路由，入站和出站 VLAN 都必须被硬件卸载，否则数据包会被发送到 CPU。

:::info
如果某个交换机端口承载多个具有不同 L3HW 设置的 VLAN，请保持该端口的 `l3-hw-enabled=yes`。
:::

### L3HW MAC 地址范围限制（仅限 DX2000/DX3000 系列） {#l3hw-mac-address-range-limitation-dx2000dx3000-series-only}

Marvell Prestera DX2000 和 DX3000 交换芯片存在硬件限制，对于每个接口，只能配置 MAC 地址的最后一个（最低有效）字节。其他五个（最高有效）字节是全局配置的，因此对于所有接口（交换机端口、网桥、VLAN）必须相同。换句话说，MAC 地址必须采用 "**XX:XX:XX:XX:XX:??**" 格式，其中：

- "**XX:XX:XX:XX:XX**" 部分对所有接口都是通用的。
- "**??**" 是可变部分。

**此要求仅适用于三层（路由）。** 二层（桥接）不使用交换机的以太网地址。此外，它不适用于网桥端口，因为网桥端口使用网桥的 MAC 地址。

五个字节必须相同的要求适用于：

- 启用了硬件路由的独立交换机端口（不是网桥成员）（`l3-hw-offloading=yes`）。
- 网桥本身。
- VLAN 接口（默认使用网桥 MAC 地址的接口）。

## 路由配置 {#route-configuration}

---

### 抑制硬件卸载 {#suppressing-hw-offload}

默认情况下，所有路由都是硬件候选路由。为了进一步微调要卸载的流量，每条路由都有一个选项可以禁用/启用 **`suppress-hw-offload`**。

例如，如果我们知道大部分流量流向服务器所在的网络，我们可以仅对该特定目的地启用卸载：

```ros
/ip/route/set [find where static && dst-address!="192.168.3.0/24"] suppress-hw-offload=yes
```

现在只有到 192.168.3.0/24 的路由具有 H 标记，表明它将是唯一有资格被选择进行硬件卸载的路由：

```ros
[admin@MikroTik] > /ip/route/print where static
Flags: A - ACTIVE; s - STATIC, y - COPY; H - HW-OFFLOADED
Columns: DST-ADDRESS, GATEWAY, DISTANCE
#     DST-ADDRESS       GATEWAY         D
0 As  0.0.0.0/0         172.16.2.1      1
1 As  10.0.0.0/8        10.155.121.254  1
2 AsH 192.168.3.0/24    172.16.2.1      1
```

:::danger
H 标志并不表示该路由实际上已被硬件卸载；它仅表示该路由可以被选中进行硬件卸载。
:::

### 路由过滤器 {#routing-filters}

对于 OSPF 和 BGP 等动态路由协议，可以使用[路由过滤器](../user-guides/routing-and-networking-protocols/route-selection-and-filtering.md)来抑制硬件卸载。例如，要抑制所有 OSPF 实例路由的硬件卸载，请使用 "**`suppress-hw-offload yes`**" 属性：

```ros
/routing/ospf/instance
set [find name=instance1] in-filter-chain=ospf-input
/routing/filter/rule
add chain="ospf-input" rule="set suppress-hw-offload yes; accept"
```

### 卸载 Fasttrack 连接 {#offloading-fasttrack-connections}

防火墙过滤规则具有用于 Fasttrack 的 **`hw-offload`** 选项，允许微调连接卸载。由于用于 Fasttrack 连接的硬件内存非常有限，我们可以选择要卸载的连接类型，从而受益于接近线速的流量。下一个示例仅卸载 TCP 连接，而 UDP 数据包通过 CPU 路由，不占用硬件内存：

```ros
/ip/firewall/filter
add action=fasttrack-connection chain=forward connection-state=established,related hw-offload=yes protocol=tcp
add action=fasttrack-connection chain=forward connection-state=established,related hw-offload=no
add action=accept chain=forward connection-state=established,related
```

### 无状态硬件防火墙 {#stateless-hardware-firewall}

虽然连接跟踪和有状态防火墙只能由 CPU 执行，但硬件可以通过[交换机规则 (ACL)](./marvell-prestera-switch-chip-features.md#switch-rules-acl)执行无状态防火墙。下一个示例阻止（在硬件层面）从 ether1 访问 MySQL 服务器，并将来自 ether2 和 ether3 的数据包重定向到 CPU/防火墙：

```ros
/interface/ethernet/switch/rule
add switch=switch1 dst-address=10.0.1.2/32 dst-port=3306 ports=ether1 new-dst-ports=""
add switch=switch1 dst-address=10.0.1.2/32 dst-port=3306 ports=ether2,ether3 redirect-to-cpu=yes
```

### 交换机规则 (ACL) 与 Fasttrack 硬件卸载 {#switch-rules-acl-vs-fasttrack-hw-offloading}

某些防火墙规则既可以通过[交换机规则 (ACL)](./marvell-prestera-switch-chip-features.md#switch-rules-acl)实现，也可以通过 CPU [防火墙过滤器](../firewall-and-quality-of-service/firewall/filter.md) + Fasttrack 硬件卸载实现。两种选项都能提供接近线速的性能。那么问题是要使用哪一种？

首先，[并非所有设备都支持 Fasttrack 硬件卸载](./l3-hardware-offloading.md#l3hw-device-support)，并且在没有硬件卸载的情况下，防火墙过滤器仅使用软件路由，这比其硬件对应方案慢得多。其次，即使 Fasttrack 硬件卸载是一个选项，经验法则是：

:::tip
只要有可能，就始终使用交换机规则（ACL）。
:::

交换机规则与 Fasttrack 连接共享硬件内存。但是，会为每个 Fasttrack 连接分配硬件资源，而单条 ACL 规则可以匹配多个连接。例如，如果有一个访客 WiFi 网络连接到 sfp-sfpplus1 VLAN 10，并且你不希望它访问内部网络，只需创建一条 ACL 规则：

```ros
/interface/ethernet/switch/rule
add switch=switch1 ports=sfp-sfpplus1 vlan-id=10 dst-address=10.0.0.0/8 new-dst-ports=""
```

匹配的数据包将在硬件层面被丢弃。这比让*所有*访客数据包进入 CPU 进行防火墙过滤要好得多。

当然，ACL 规则无法匹配所有内容。例如，ACL 规则无法过滤连接状态：接受已建立连接，丢弃其他连接。这时 Fasttrack 硬件卸载就派上用场——默认将数据包重定向到 CPU 进行防火墙过滤，然后卸载已建立的 Fasttrack 连接。但是，为整个交换机或端口禁用 `l3-hw-offloading` 并不是唯一的选择。

:::info
使用 `redirect-to-cpu=yes` 定义 ACL 规则，而不是在交换机端口上设置 `l3-hw-offloading=no`，以缩小进入 CPU 的流量范围。
:::

### 硬件卸载的 VRF {#hardware-offloaded-vrf}

[98DX8xxx、98DX4xxx、98DX325x、98CX8410](#ccr2xxx-crs3xx-crs5xx-switch-98dx8xxx-and-98dx4xxx-series) 和 [98DX7xxx](#crs8xx-switch-98dx7xxx-series) 交换芯片支持硬件卸载的 VRF。 [98DX3xxx 和 98DX2xxx](#crs3xx-switch-98dx3xxx-and-98dx2xxx-series) 系列不支持。

如果路由位于 VRF 中且出接口支持 L3HW，交换芯片将路由该数据包。你可以将任何支持 L3HW 的接口（以太网、绑定、网桥、VLAN）与 VRF 关联。始终将主接口与 VRF 关联，而不是与标记了 `S`（从属）标志的接口关联，例如网桥端口或绑定端口。Fasttrack、NAT 和 VXLAN 卸载仅限于 `main` 路由表。

VRF 在 `/ip/vrf` 下配置。有关更多详细信息，请参阅 [VRF](../user-guides/routing-and-networking-protocols/vrf.md) 手册。

98DX8208、98DX8212、98DX8332、98DX3257、98DX3255 最多支持 512 个 VRF 表。所有其他受支持的交换芯片最多支持 1024 个。

#### 通过 ACL 分配 VRF {#vrf-assignment-via-acl}

L3HW 支持使用 ACL 交换机规则为入站流量分配 VRF。`/interface/ethernet/switch/rule` 中的 `new-vrf` 选项允许将匹配的数据包定向到特定 VRF 表。

在不支持 VRF 的交换机（98DX3xxx 和 98DX2xxx 系列）上，将 `new-vrf` 设置为 `main` 以外的任何值都会导致 `redirect-to-cpu=yes`。

有关 ACL 规则的更多详细信息，请参阅[交换机规则 (ACL)](./marvell-prestera-switch-chip-features.md#switch-rules-acl)。

## 配置示例 {#configuration-examples}

---

### 上行端口位于防火墙/NAT 之后的 VLAN 间路由 {#inter-vlan-routing-with-upstream-port-behind-firewallnat}

此示例演示如何在保持防火墙和 NAT 在上行端口上运行的同时，受益于接近线速的 VLAN 间路由。此外，到上行端口的 Fasttrack 连接也会被卸载到硬件，从而将流量速度提升到接近线速水平。VLAN 间流量完全由硬件路由，不进入 CPU/防火墙，因此不会占用 Fasttrack 连接的硬件内存。

我们使用 **CRS317-1G-16S+** 型号，设置如下：

- sfp1-sfp4 - 桥接端口，VLAN ID 20，未标记。
- sfp5-sfp8 - 桥接端口，VLAN ID 30，未标记。
- sfp16 - 上行端口。
- ether1 - 管理端口。

设置接口列表以便于访问：

### 接口列表 {#interface-lists-1}

```ros
/interface/list
add name=LAN
add name=WAN
add name=MGMT 

/interface/list/member
add interface=sfp-sfpplus1 list=LAN
add interface=sfp-sfpplus2 list=LAN
add interface=sfp-sfpplus3 list=LAN
add interface=sfp-sfpplus4 list=LAN
add interface=sfp-sfpplus5 list=LAN
add interface=sfp-sfpplus6 list=LAN
add interface=sfp-sfpplus7 list=LAN
add interface=sfp-sfpplus8 list=LAN
add interface=sfp-sfpplus16 list=WAN
add interface=ether1 list=MGMT 
```

### 网桥设置 {#bridge-setup}

```ros
/interface/bridge
add name=bridge vlan-filtering=yes

/interface/bridge/port
add bridge=bridge interface=sfp-sfpplus1 pvid=20
add bridge=bridge interface=sfp-sfpplus2 pvid=20
add bridge=bridge interface=sfp-sfpplus3 pvid=20
add bridge=bridge interface=sfp-sfpplus4 pvid=20
add bridge=bridge interface=sfp-sfpplus5 pvid=30
add bridge=bridge interface=sfp-sfpplus6 pvid=30
add bridge=bridge interface=sfp-sfpplus7 pvid=30
add bridge=bridge interface=sfp-sfpplus8 pvid=30

/interface/bridge/vlan
add bridge=bridge tagged=bridge untagged=sfp-sfpplus1,sfp-sfpplus2,sfp-sfpplus3,sfp-sfpplus4 vlan-ids=20
add bridge=bridge tagged=bridge untagged=sfp-sfpplus5,sfp-sfpplus6,sfp-sfpplus7,sfp-sfpplus8 vlan-ids=30
```

路由需要专用 VLAN 接口。对于标准二层 VLAN 桥接（不使用 VLAN 间路由），可以省略下一步。

#### 用于路由的 VLAN 接口设置 {#vlan-interface-setup-for-routing}

```ros
/interface/vlan
add interface=bridge name=vlan20 vlan-id=20
add interface=bridge name=vlan30 vlan-id=30

/ip/address
add address=192.168.20.17/24 interface=vlan20 network=192.168.20.0
add address=192.168.30.17/24 interface=vlan30 network=192.168.30.0
```

配置管理端口和上行端口、基本防火墙、NAT，并启用 Fasttrack 连接的硬件卸载：

#### 防火墙设置 {#firewall-setup}

```ros
/ip/address
add address=192.168.88.1/24 interface=ether1
add address=10.0.0.17/24 interface=sfp-sfpplus16

/ip/route
add gateway=10.0.0.1

/ip/firewall/filter
add action=fasttrack-connection chain=forward connection-state=established,related hw-offload=yes
add action=accept chain=forward connection-state=established,related

/ip/firewall/nat
add action=masquerade chain=srcnat out-interface-list=WAN
```

此时，所有路由仍由 CPU 执行。在交换芯片上启用硬件路由：

#### 启用三层硬件卸载 {#enable-layer-3-hardware-offloading}

```ros
# 在 LAN 端口上启用完全硬件路由
:foreach i in=[/interface/list/member/find where list=LAN] do={ 
    /interface/ethernet/switch/port/set [/interface/list/member/get $i interface] l3-hw-offloading=yes 
} 

# 在 WAN 或 Management 端口上禁用完全硬件路由
:foreach i in=[/interface/list/member/find where list=WAN or list=MGMT] do={ 
    /interface/ethernet/switch/port/set [/interface/list/member/get $i interface] l3-hw-offloading=no 
}

# 在交换芯片上激活三层硬件卸载
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
```

结果：

- 在同一 VLAN 内（例如 sfp1-sfp4），流量由硬件在二层转发 *(L2HW)*。
- VLAN 间流量（例如 sfp1-sfp5）由硬件在三层路由 *(L3HW).*
- 往返 WAN 端口的流量首先由 CPU/防火墙处理。然后 Fasttrack 连接被卸载到硬件 *(硬件加速的 L4 有状态防火墙).* NAT 同时应用于 CPU 和硬件处理的数据包。
- 到管理端口的流量受防火墙保护。

## 典型错误配置 {#typical-misconfiguration}

---
以下是配置三层硬件卸载时常见的用户错误。

### 交换机端口或绑定上的 VLAN 接口 {#vlan-interface-on-a-switch-port-or-bond}

```ros
/interface/vlan
add name=vlan10 vlan-id=10 interface=sfp-sfpplus1
add name=vlan20 vlan-id=20 interface=bond1
```

由于二层依赖关系，只有在硬件卸载的 vlan-filtering 网桥上创建的 VLAN 接口才能进行 L3HW 卸载。正确的配置是：

```ros
/interface/bridge/port
add bridge=bridge1 interface=sfp-sfpplus1 frame-types=admit-only-vlan-tagged
add bridge=bridge1 interface=bond1 frame-types=admit-only-vlan-tagged
 
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,sfp-sfpplus1 vlan-ids=10
add bridge=bridge1 tagged=bridge1,bond1 vlan-ids=20
 
/interface/vlan
add name=vlan10 vlan-id=10 interface=bridge1
add name=vlan20 vlan-id=20 interface=bridge1
```

:::warning
如果直接在以太网或 bonding 接口上创建 VLAN 接口，数据包可能会被错误地卸载——绕过 CPU 处理（如防火墙和 NAT），导致未定义的行为。

如果需要这种类型的配置，必须在 `/interface/ethernet/switch/port` 菜单下对相关交换机端口设置 `l3-hw-offloading=no` 以禁用 L3HW 卸载。
:::

### 未将网桥接口添加到 /interface/bridge/vlan/ {#not-adding-the-bridge-interface-to-interfacebridgevlan}

对于 VLAN 间路由，网桥接口本身需要添加到给定 VLAN 的标记成员中。在下一个示例中，VLAN 间路由在 VLAN 10 和 11 之间正常工作，但数据包不会路由到 VLAN 20。

```ros
/interface/bridge/vlan
add bridge=bridge1 vlan-ids=10 tagged=bridge1,sfp-sfpplus1
add bridge=bridge1 vlan-ids=11 tagged=bridge1 untagged=sfp-sfpplus2,sfp-sfpplus3 
add bridge=bridge1 vlan-ids=20 tagged=sfp-sfpplus1 untagged=sfp-sfpplus4,sfp-sfpplus5
```

上述示例并不总是意味着错误。有时，你可能希望设备在某些/所有 VLAN 中充当简单的二层交换机。只需确保你是有意设置这种行为，而不是由于错误。

### 创建多个网桥 {#creating-multiple-bridges}

设备仅支持一个硬件网桥。如果创建了多个网桥，只有一个网桥获得硬件卸载。对于二层来说，这意味着其他网桥采用软件转发；而在 L3HW 的情况下，多个网桥可能导致未定义行为。

:::tip
与其创建多个桥接，不如创建一个桥接，并通过 VLAN filtering 隔离 L2 网络。
:::

### 使用不属于该交换机的端口 {#using-ports-that-do-not-belong-to-the-switch}

某些设备有两个交换芯片，或者管理端口直接连接到 CPU。例如，**CRS312-4C+8XG** 有一个 **ether9** 端口连接到单独的交换芯片。尝试将此端口添加到网桥或让其参与 L3HW 设置会导致意外结果。把管理端口留给管理用途！

```ros
[admin@crs312] /interface/ethernet/switch> print
Columns: NAME, TYPE, L3-HW-OFFLOADING
# NAME     TYPE              L3-HW-OFFLOADING
0 switch1  Marvell-98DX8212  yes            
1 switch2  Atheros-8227      no   
           
[admin@crs312] /interface/ethernet/switch> port print
Columns: NAME, SWITCH, L3-HW-OFFLOADING, STORM-RATE
 # NAME         SWITCH   L3-HW-OFFLOADING  STORM-RATE
 0 ether9       switch2                             
 1 ether1       switch1  yes                      100
 2 ether2       switch1  yes                      100
 3 ether3       switch1  yes                      100
 4 ether4       switch1  yes                      100
 5 ether5       switch1  yes                      100
 6 ether6       switch1  yes                      100
 7 ether7       switch1  yes                      100
 8 ether8       switch1  yes                      100
 9 combo1       switch1  yes                      100
10 combo2       switch1  yes                      100
11 combo3       switch1  yes                      100
12 combo4       switch1  yes                      100
13 switch1-cpu  switch1                           100
14 switch2-cpu  switch2
```

### 过度依赖 Fasttrack 硬件卸载 {#relying-on-fasttrack-hw-offloading-too-much}

由于 Fasttrack 硬件卸载以零配置开销提供接近线速的性能，用户倾向于将其用作默认解决方案。但是，硬件 Fasttrack 连接数量非常有限，其他流量只能留给 CPU。请尝试尽可能使用硬件路由，通过交换机 ACL 规则将 CPU 流量降至最低，然后使用防火墙过滤规则微调要卸载哪些 Fasttrack 连接。

### 尝试卸载慢路径连接 {#trying-to-offload-slow-path-connections}

使用某些配置（例如启用网桥 "**use-ip-firewall**" 设置、创建网桥 nat/filter 规则）或运行 sniffer 或 torch 等特定功能，可能会禁用 RouterOS [FastPath](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path)，从而影响正确进行 FastTrack 和硬件卸载连接的能力。如果需要硬件卸载的 Fasttrack，请确保没有禁用 FastPath 的设置，并验证连接是否获得 "H" 标记，或使用 L3HW [monitor](./l3-hardware-offloading.md#monitor) 命令查看硬件卸载连接数量。

## L3HW 功能支持 {#l3hw-feature-support}

- **HW** - 该功能受支持并卸载到硬件。
- **CPU** - 该功能受支持，但由软件（CPU）执行。
- **N/A** - 该功能无法与 L3HW 一起使用。必须完全禁用三层硬件卸载（**switch** `l3-hw-offloading=no`）才能让该功能工作。
- **FW** - 该功能要求给定 **switch port** 使用 `l3-hw-offloading=no`。在 **switch** 级别，使用 `l3-hw-offloading=yes`。

| 功能 | 支持 | 备注 | 版本 |
| :-- | :-- | :-- | :-- |
| IPv4 单播路由 | **HW** |  | 7.1 |
| IPv6 单播路由 | **HW** | <br/><code>/interface/ethernet/switch/l3hw-settings/set ipv6-hw=yes</code><br/> | 7.6 |
| IPv4 组播路由 | **CPU** |  |  |
| IPv6 组播路由 | **CPU** |  |  |
| ECMP | **HW** | 多路径路由。L3HW 使用交换芯片自身的 ECMP 哈希掩码，其中包含 TCP/UDP 的 L4 端口；对于硬件转发的 ECMP，配置的哈希策略会被忽略。FastTrack 卸载的连接遵循内核 FIB 查找，并可能选择不同的下一跳。[FastPath](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path) 按三层缓存路由。 | 7.1 |
| 黑洞路由 | **HW** | <br/><code>/ip/route/add dst-address=10.0.99.0/24 blackhole</code><br/> | 7.1 |
| `gateway=<interface_name>` | **CPU/HW** | <br/><code>/ip/route/add dst-address=10.0.0.0/24 gateway=ether1</code><br/><br/> 这仅适用于直连网络。由于硬件不知道如何发送 ARP 请求，CPU 会发送 ARP 请求并等待回复，以便在连接中第一个匹配目标 IP 地址的已接收数据包上找出 DST MAC 地址。确定 DST MAC 后，会添加硬件条目，所有后续数据包将由交换芯片处理。 | 7.1 |
| 网桥 | **HW** | 往返[硬件卸载网桥](./index.md#bridge-hardware-offloading)接口的路由。 | 7.1 |
| VLAN | **HW** | 在启用了 [vlan-filtering](./index.md#bridge-vlan-filtering) 的硬件卸载网桥接口上创建的 VLAN 接口之间的路由。 <br/><br/><code>/interface/vlan</code><br/> | 7.1 |
| 绑定 | **HW** | 绑定接口之间的路由。 <br/><br/><code>/interface/bonding</code><br/><br/> 仅 <code>802.3ad</code> 和 <code>balance-xor</code> 绑定模式支持硬件卸载。 | 7.1 |
| IPv4 防火墙 | **FW** | 用户必须选择硬件加速路由或防火墙。防火墙规则由 CPU 处理。***Fasttrack*** 连接会卸载到硬件。 | 7.1 |
| IPv4 NAT | **FW** | 应用于已卸载 ***Fasttrack*** 连接的 NAT 规则也会由硬件处理。 | 7.1 |
| MLAG | **N/A** |  |  |
| VRF | **HW** | [硬件卸载的 VRF](#hardware-offloaded-vrf)。 |  |
| VRRP | **N/A** |  |  |
| 控制器桥接和端口扩展器 | **N/A** |  |  |
| Traffic-Flow | **N/A** | L3HW 卸载的流量不会通过 [流量监控](../diagnostics-monitoring-and-troubleshooting/traffic-flow/index.md) 报告。 |  |
| VXLAN | **HW** | 支持硬件卸载的 [VXLAN](./vxlan.md) 数据平面、VXLAN 封装和解封装。这允许在 vlan-filtering 网桥内进行静态一对一 VLAN 到 VXLAN 映射。目前，一些已知功能尚未实现。 <br/><strong>Underlay（路由封装的 VXLAN 数据包）：</strong><br/> 1. 不支持通过 ECMP 使用 VTEP <br/> 2. 不支持通过 bond、bridge、VLAN 接口使用 VTEP（仅支持独立的路由以太网接口） <br/> 3. 不支持通过组播使用 VTEP <br/> 4. VXLAN 硬件卸载仅限于 <code>main</code> 路由表。VTEP 无法在 VRF 内运行。 <br/> 5. 不支持使用 IPv6 的 VTEP <br/><strong>Overlay（以太网与 VXLAN 之间转发）：</strong><br/> 1. 不支持在 VXLAN 上打 VLAN 标记 <br/> 2. 不支持在不同 VXLAN VNI 之间路由 <br/> 3. VTEP 相互隔离，并且没有机制控制它们之间的 "horizon"。 <br/> 4. 桥接的 VXLAN 接口不支持 IGMP snooping。启用 snooping 时，VXLAN 上的 MDB 条目不会被卸载，组播流量会在以太网和 VXLAN 之间受到限制。 <br/> 5. 桥接的 VXLAN 接口不受 MLAG 支持。 <br/><br/><code>/interface/vxlan</code><br/> | 7.18 |
| MTU | **HW** | 硬件最多支持 8 个 MTU 配置文件。 | 7.1 |
| QinQ 路由 | **CPU** | 堆叠的可路由 VLAN 接口将失去 L3HW 卸载，而直接在网桥接口上创建的可路由 VLAN 接口仍可使用硬件卸载。 |  |

:::warning
同一流的硬件转发数据包与 FastTrack/CPU 转发数据包混合时，可能选择不同的 ECMP 下一跳，导致非对称路由和连接重置。
:::

只有下表列出的设备支持三层硬件卸载。

## L3HW 设备支持 {#l3hw-device-support}

只有下表列出的设备支持三层硬件卸载。

### CRS3xx：交换机 98DX3xxx 和 98DX2xxx 系列 {#crs3xx-switch-98dx3xxx-and-98dx2xxx-series}

下列设备基于 **Marvell **98DX224S, 98DX226S****、**98DX2528,** 或 **98DX3236** 交换芯片型号。

:::info
**98DX3255** 和 **98DX3257** 型号是例外，它们具有 98DX8xxx 系列而非 98DX3xxx 系列的功能集。

**注意：** 与其他交换机型号相比，这些设备缺少以下一些重要功能：

- Fasttrack 和 NAT 连接卸载
- 每 VLAN 数据包和字节计数器
- VXLAN 卸载
- 硬件卸载 VRF。

:::

| 交换芯片 | 型号 | IPv4 路由前缀 <sup>1</sup> | IPv6 路由前缀 <sup>2</sup> | 下一跳 | 每个前缀的 ECMP 路径 <sup>3</sup> |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **98DX3236** | CRS305-1G-4S+IN <br/> CRS326-24G-2S+ (RM/IN) <br/> CRS328-24P-4S+RM <br/> CRS328-4C-20S-4S+RM | 13312 | 3328 | 4K | 8 |
| **98DX226S** | CRS305-1G-4S+OUT (FiberBox Plus) <br/> CRS310-1G-5S-4S+ (netFiber 9/IN) <br/> CRS310-8G+2S+IN <br/> CRS318-16P-2S+OUT (netPower 16P) <br/> CRS320-8P-8B-4S+RM <br/> CRS418-8P-8G-2S+RM <br/> CRS418-8P-8G-2S+5axQ2axQ-RM | 13312 | 3328 | 4K | 8 |
| **98DX224S** | CRS318-1Fi-15Fr-2S-OUT (netPower 15FR) | 13312 | 3328 | 4K | 8 |
| **98DX2528** | CRS304-4XG-IN | 13312 | 3328 | 4K | 8 |

---

<sup>1</sup> 由于可卸载的路由总数有限，具有较高网络掩码的前缀优先由硬件转发（例如 /32、/30、/29 等）。任何无法放入硬件表的其他前缀将由 CPU 处理。直连主机以 /32（IPv4）或 /128（IPv6）路由前缀形式卸载。主机数量还受 [IP Settings](../cli-reference/ip/settings.md) / [IPv6 Settings](../cli-reference/ipv6/settings.md) 中 max-neighbor-entries 的限制。  
<sup>2</sup> IPv4 和 IPv6 路由表共享相同的硬件内存。  
<sup>3</sup> 如果一条路由的路径数超过硬件 ECMP 限制（X），则只有前 X 条路径会被卸载。

#### 部分卸载 {#partial-offloading}

对于 **98DX3xxx**、**98DX2xxx** 交换芯片系列，情况相当简单：一个 RouterOS 路由条目（/ip/route/）会映射为一个硬件 IPv4 路由前缀条目。已连接主机（/32 路由）也会占用同一张表。只要路由总数（"/ip/route/print count-only"）加上已连接主机数量（"/ip/arp/print count-only where status=reachable or status=stale"）不超过 **13312 (13k)**，所有内容都会被卸载。超过该数量后，具有*较短*前缀的路由将保留在 CPU 上。

### CCR2xxx、CRS3xx、CRS5xx：交换机 98DX8xxx 和 98DX4xxx 系列 {#ccr2xxx-crs3xx-crs5xx-switch-98dx8xxx-and-98dx4xxx-series}

下列设备基于 **Marvell 98DX8xxx**、**98DX4xxx** 交换芯片，或 **98DX325x** 型号。

<WideTable>

| 交换芯片 | 型号 | IPv4 路由 <sup>1</sup> | IPv4 主机 <sup>5</sup> | IPv6 路由 <sup>1</sup> | IPv6 主机 <sup>5</sup> | 下一跳 | IPv4 Fasttrack 连接 <sup>2, 3, 4</sup> | IPv4 NAT 条目 <sup>2, 4</sup> | IPv4 Fasttrack/NAT、VXLAN 卸载 按 VLAN 的数据包/字节计数器 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **98DX8208** | CRS309-1G-8S+IN | 最高 36K | 最高 16K | 最高 6K | 最高 12K | 8K | 4.5K | 3.9K | + |
| **98DX8212** | CRS312-4C+8XG-RM | 最高 36K | 最高 16K | 最高 6K | 最高 12K | 8K | 2.25K | 2.25K | + |
| **98DX8216** | CRS317-1G-16S+RM | 最高 240K | 最高 64K | 最高 40K | 最高 48K | 8K | 4.5K | 4K | + |
| **98DX8332** | CRS326-24S+2Q+RM <br/> CRS326-4C+20G+2Q+RM | 最高 36K | 最高 16K | 最高 6K | 最高 12K | 8K | 2.25K | 2.25K | + |
| **98DX3257** <sup>6</sup> | CRS354-48G-4S+2Q+RM <br/> CRS354-48P-4S+2Q+RM | 最高 36K | 最高 16K | 最高 6K | 最高 12K | 8K | 2.25K | 2.25K | + |
| **98DX4310** | CRS504-4XQ (IN/OUT) <br/> CRS510-8XS-2XQ-IN <br/> RDS2216-2XG-4S+4XS-2XQ | 最高 120K | 最高 64K | 最高 20K | 最高 48K | 8K | 4.5K | 4K | + |
| **98CX8410** | CRS520-4XS-16XQ-RM | 最高 240K | 最高 64K | 最高 40K | 最高 48K | 8K | 4.5K | 4K | + |
| **98DX3255** <sup>6</sup> | CCR2116-12G-4S+ | 最高 36K | 最高 16K | 最高 6K | 最高 12K | 8K | 2.25K | 2.25K | + |
| **98DX8525** | CCR2216-1G-12XS-2XQ <br/> CRS518-16XS-2XQ-RM | 最高 120K | 最高 64K | 最高 20K | 最高 48K | 8K | 4.5K | 4K | + |

</WideTable>

<sup>1</sup> 取决于路由表的复杂度。整字节 IP 前缀（/8、/16、/24 等）占用的硬件空间比其他前缀（例如 /22）少。当路由硬件表满时，只有具有较长子网前缀的路由会被卸载（/30、/29、/28 等），而 CPU 处理较短的前缀。用户可以通过路由过滤器（针对动态路由）或按交换机端口、静态路由或 VLAN 抑制硬件卸载来微调要卸载的路由。IPv4 和 IPv6 路由表共享相同的硬件内存。  
<sup>2</sup> 当达到 Fasttrack 或 NAT 条目的硬件限制时，其他连接将回退到 CPU。MikroTik 的智能连接卸载算法确保流量最大的连接被卸载到硬件。  
<sup>3</sup> Fasttrack 连接与 ACL 规则共享相同的硬件内存。根据复杂度，一条 ACL 规则可能占用 3-6 个 Fasttrack 连接的内存。  
<sup>4</sup> 如果 Fasttrack 连接需要网络地址转换，则会创建硬件 NAT 条目。硬件同时支持 SRCNAT 和 DSTNAT。  
<sup>5</sup> DX4000/DX8000 交换芯片将直连主机、IPv4 /32 和 IPv6 /128 路由条目存储在 FDB 表中而非路由表中。硬件内存由常规 FDB L2 条目（MAC）、IPv4 和 IPv6 地址共享。主机数量还受 [IP Settings](../cli-reference/ip/settings.md) / [IPv6 Settings](../cli-reference/ipv6/settings.md) 中 max-neighbor-entries 的限制。  
<sup>6</sup> 该交换芯片具有 DX8000 系列的功能集。

#### 部分卸载 {#partial-offloading-1}

**98DX8xxx**、**98DX4xxx** 具有完全不同的路由表。我们不是卸载前缀，而是必须卸载路由索引。整个 IPv4 地址范围（IPv6 同理）都必须被索引，即 0.0.0.0 - 255.255.255.255。添加新路由条目会触发索引重建，根据路由表的复杂程度，硬件内存会增加 0-5 个条目。这就是为什么没有给出确切数字。例如，某些包含 240K 条目的路由表可以完全卸载到 CRS317 硬件，而其他包含 160K 条目的路由表则勉强能装入。不尝试就永远不知道。

当索引整个 IP 地址范围（0.0.0.0 - 255.255.255.255）时，只要还有使用相同下一跳的默认路由（0.0.0.0/0），就可以按需卸载任意数量的路由。

例如，在 CCR2216 路由器上创建了大约 950k 条带 /30 前缀的路由，它们都使用相同的下一跳，并带有一条默认路由。结果，所有路由都被卸载，同时 lpm-usage 保持最小。

```routeros
[admin@MikroTik] > /interface/ethernet/switch/l3hw-settings/advanced/monitor 
        ipv4-routes-total: 942338
           ipv4-routes-hw: 942326
          ipv4-routes-cpu:     11
  ipv4-shortest-hw-prefix:      0
               ipv4-hosts:      1
         route-queue-size:      0
         route-queue-rate:      0
       route-process-rate:      0
              nexthop-cap:   8192
            nexthop-usage:     85
    vxlan-mtu-packet-drop:      0
     fasttrack-ipv4-conns:      0
     fasttrack-queue-size:      0
     fasttrack-queue-rate:      0
   fasttrack-process-rate:      0
   fasttrack-hw-min-speed:      0
   fasttrack-hw-offloaded:      0
    fasttrack-hw-unloaded:      0
                  lpm-cap:  27200
                lpm-usage:     11
             lpm-bank-cap:   1360
           lpm-bank-usage:      1
                                0
                                0
                                0
                                1
                                0
                                0
                                0
                                4
                                0
                                0
                                0
                                5
                                0
                                0
                                0
                                0
                                0
                                0
                                0
                  pbr-cap:   8192
                pbr-usage:      0
             pbr-lpm-bank:      2
                nat-usage:      0
```

但是，如果地址范围中存在 "gaps"，例如不使用默认路由或有多个下一跳，这会消耗硬件表。当路由硬件表满时，只有具有较长子网前缀的路由（/30、/29、/28 等）会被卸载，而 CPU 处理较短前缀。以下是禁用默认路由或使用不同下一跳时发生的情况：硬件表中只能装入 37k 条带 /30 前缀的路由。这是 CCR2216 的最坏情况。

```routeros
[admin@MikroTik] > /interface/ethernet/switch/l3hw-settings/advanced/monitor 
        ipv4-routes-total: 942337
           ipv4-routes-hw:  37729
          ipv4-routes-cpu: 904608
  ipv4-shortest-hw-prefix:     30
               ipv4-hosts:      1
         route-queue-size:      0
         route-queue-rate:      0
       route-process-rate:      0
              nexthop-cap:   8192
            nexthop-usage:     85
    vxlan-mtu-packet-drop:      0
     fasttrack-ipv4-conns:      0
     fasttrack-queue-size:      0
     fasttrack-queue-rate:      0
   fasttrack-process-rate:      0
   fasttrack-hw-min-speed:      0
   fasttrack-hw-offloaded:      0
    fasttrack-hw-unloaded:      0
                  lpm-cap:  27200
                lpm-usage:  22392
             lpm-bank-cap:   1360
           lpm-bank-usage:   1022
                             1033
                             1027
                             1028
                             1221
                             1033
                             1040
                              678
                             1358
                             1245
                             1254
                             1242
                             1246
                             1249
                             1273
                             1260
                             1101
                             1024
                             1031
                             1027
                  pbr-cap:   8192
                pbr-usage:      0
             pbr-lpm-bank:      2
                nat-usage:      0
```

在许多情况下，默认行为 "仅卸载具有较长子网前缀的路由" 并不是最优的，尤其是当 CPU 处理的路由与硬件卸载路由的比例过高时。发生这种情况时，数据包被硬件转发的机会会显著下降。

如果硬件内存不足并发生部分卸载，作为网络管理员，更好的方法是仅卸载承载最多流量的路由，而将需求较低的路由保留在 CPU 上，并且不让部分卸载发生。

幸运的是，有几种方法可以管理这一点。可以按交换机端口和静态路由进行抑制，也可以[使用多种属性过滤动态路由](../user-guides/routing-and-networking-protocols/route-selection-and-filtering.md)。一个示例是使用 as-path 过滤需求最大的前缀（Google、Meta），而所有其他路由则被抑制 L3HW。

### CRS8xx：交换机 98DX7xxx 系列 {#crs8xx-switch-98dx7xxx-series}

下列设备基于 **Marvell 98DX7xxx** 交换芯片型号。

:::danger
以下功能的软件支持仍在开发中，尚不可用：

- FastTrack 和 NAT 连接卸载
- VXLAN 卸载

:::

<WideTable>

| 交换芯片 | 型号 | IPv4 路由 <sup>1</sup> | IPv4 主机 <sup>2</sup> | IPv6 路由 <sup>1</sup> | IPv6 主机 <sup>2</sup> | 下一跳 | IPv4 Fasttrack 连接 | IPv4 NAT 条目 | VXLAN 卸载 | 按 VLAN 的数据包/字节计数器 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **98DX7335** | CRS812-8DS-2DQ-2DDQ-RM | 最高 240K | 最高 64K | 最高 40K | 最高 48K | 16K | 待公布 | 待公布 | 待公布 | + |
| **98DX7335** | CRS804-4DDQ-hRM | 最高 240K | 最高 64K | 最高 40K | 最高 48K | 16K | 待公布 | 待公布 | 待公布 | + |

</WideTable>

---

<sup>1</sup> 取决于路由表的复杂度。整字节 IP 前缀（/8、/16、/24 等）占用的硬件空间比其他前缀（例如 /22）少。当路由硬件表满时，只有具有较长子网前缀的路由会被卸载（/30、/29、/28 等），而 CPU 处理较短的前缀。用户可以通过路由过滤器（针对动态路由）或抑制静态路由的硬件卸载来微调要卸载的路由。IPv4 和 IPv6 路由表共享相同的硬件内存。  
<sup>2</sup> 98DX7xxx 交换芯片将直连主机、IPv4 /32 路由条目和 IPv6 /128 路由条目存储在 FDB 表中而非路由表中。硬件内存由常规 FDB L2 条目（MAC）、IPv4 地址和 IPv6 地址共享。主机数量还受 [IP Settings](../cli-reference/ip/settings.md) / [IPv6 Settings](../cli-reference/ipv6/settings.md) 中 max-neighbor-entries 的限制。
