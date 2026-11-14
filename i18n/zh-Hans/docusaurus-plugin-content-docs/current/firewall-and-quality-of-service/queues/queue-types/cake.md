---
sidebar_key: "firewall-and-quality-of-service/queues/queue-types/cake"
sidebar_position: 1
title: "CAKE"
sidebar_label: "CAKE"
description: "CAKE（Common Applications Kept Enhanced）是 RouterOS 的一种高级队列管理算法，它通过带宽整形、流隔离和基于 RTT 的拥塞控制来优化网络流量处理。它支持 Diffserv 优先级、ACK 过滤、NAT 处理，以及针对不同链路技术的多种开销补偿方案。"
tags:
  - 'cake'
  - 'diffserv'
  - 'flow-isolation'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/queues/queue-types/cake
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

CAKE（Common Applications Kept Enhanced）是一种具备整形能力的队列规则，它结合了 COBALT 主动队列管理、deficit 模式整形器、DRR++ 流隔离、简化的 DiffServ 处理以及链路层开销补偿。

CAKE 旨在通过实用的默认值和极少的调优来保持公平性并将缓冲膨胀降到最低。

## 何时使用 CAKE {#when-to-use-cake}

在共享瓶颈上，当大流量传输会增加延迟，或某台主机可能独占可用容量时，请使用 CAKE。典型示例包括由多个客户端共享的互联网连接、较慢的上行链路或非对称连接。

CAKE 可以：

- 在链路繁忙时保持低延迟。
- 在主机之间以及它们各自的连接之间共享容量。
- 针对链路层开销进行整形。
- 应用简单的 DiffServ 策略。
- 在高度非对称链路上过滤冗余的 TCP 确认。

CAKE 只能控制经过其队列的流量。它无法纠正 Wi-Fi 干扰、路由器 CPU 不足或网络中其他位置的队列，除非其整形器配置为低于该瓶颈的速率。

当你需要每流公平性和主动队列管理且希望 CPU 占用更低时，请使用 FQ-CoDel。当你还需要每主机公平性、带链路层补偿的集成整形器、DiffServ 处理或 ACK 过滤时，请使用 CAKE。

## 基本配置 {#basic-configuration}

CAKE 是一种队列类型，而不是完整的流量匹配规则。在 `/queue/type` 下创建 CAKE 条目会定义一个可复用的队列配置文件，但它本身不处理任何流量。请将该配置文件分配给 Simple Queue、Queue Tree 或 Interface Queue。有关完整的属性列表和可接受值，请参阅生成的 [`/queue/type` CLI 参考](../../../cli-reference/queue/type.md)。

以下示例将相同的 CAKE 配置文件应用于 Simple Queue 的两个方向。HTB 提供上传和下载限制，因此 CAKE 的内部整形器保持不限速：

```ros
/queue/type
add name=cake-default kind=cake cake-bandwidth=0 cake-nat=yes

/queue/simple
add name=internet-cake target=192.168.88.0/24 max-limit=20M/100M queue=cake-default/cake-default
```

在 `max-limit=20M/100M` 和 `queue=cake-default/cake-default` 中，第一个值是上传，第二个是下载。请将 target 和速率替换为适合该网络的值。被 FastTrack 处理的流量会绕过此 Simple Queue，因此对于该队列必须处理的流量，请禁用 FastTrack。

:::note
仅在 `kind=cake` 的队列类型上设置 `cake-bandwidth`。它控制 CAKE qdisc 内置的整形器。

Simple Queue 和 Queue Tree 条目使用 HTB。它们的 `limit-at` (CIR) 和 `max-limit` (MIR) 参数在 HTB 层面控制速率。当你将 CAKE 队列类型分配给这些条目之一时，CAKE 作为 HTB 下的叶子 qdisc 运行。

当 HTB 应控制流量速率时，保留 `cake-bandwidth=0`。此值使 CAKE 的整形器不受限制，但 CAKE 继续提供主动队列管理、流隔离和 DiffServ 处理。当 CAKE 也应进行流量整形时，设置 `cake-bandwidth`。如果同时配置 `cake-bandwidth` 和 HTB 速率限制，流量将通过两个整形器。
:::

## 推荐的起始配置 {#recommended-starting-points}

| 使用场景 | 推荐的起始配置 |
| :-- | :-- |
| 由 Simple Queue 或 Queue Tree 提供速率限制 | 保持 `cake-bandwidth=0` 并设置 HTB 的 `max-limit`。CAKE 提供主动队列管理和公平性，而不会增加第二个整形器。 |
| 由 CAKE 提供速率限制 | 将 `cake-bandwidth` 设置为低于真实瓶颈速率，并配置正确的链路层开销。除非两个整形层都是有意为之，否则应避免再设置 HTB 速率限制。 |
| 路由器执行 NAT | 设置 `cake-nat=yes` 并保留默认的 `triple-isolate` 流模式。这样单个 CAKE 实例就能在内部主机之间以及它们的流之间平衡流量。 |
| 下载/上传比率大于约 10:1 | 仅在较慢方向上的发送队列设置 `cake-ack-filter=filter`。 |
| 不信任入口 DSCP 标记 | 设置 `cake-diffserv=besteffort` 以忽略它们，或设置 `cake-wash=yes` 以便在 CAKE 应用其优先级决策后清除它们。 |

### 方向与队列位置 {#direction-and-queue-placement}

CAKE 实例只处理经过其挂接队列的数据包。它不会自动处理反方向的流量。

- **Interface Queue：** 接口队列处理由该接口发送的数据包。对于转发的客户端流量，面向 WAN 的发送接口上的 CAKE 处理上传，而面向 LAN 的发送接口上的 CAKE 处理下载。这是两个独立的 CAKE 实例。接口队列不处理该接口接收的数据包。
- **Simple Queue：** RouterOS 相对于配置的 target 确定上传和下载。`queue` 属性按该顺序选择上传和下载队列类型。将 CAKE 队列类型分配到这两个位置即可处理两个方向。
- **Queue Tree：** 每个 Queue Tree 都是单向的。其父级和数据包选择决定了哪些流量经过它的 CAKE 叶子队列。

当上传和下载速率或选项不同时，请为每个方向配置单独的 CAKE 队列类型。如果 LAN 使用多个出接口，仅挂接到其中一个接口的 Interface Queue 不会处理其他接口发送的流量。单个 CAKE 实例可以在经过它的许多主机和流之间实现平衡。仅当你需要明确的每客户端速率限制或 HTB 保证时，才创建单独的每客户端队列。

`cake-autorate-ingress` 名称指的是 CAKE 的容量估算模式。它不会让 Interface Queue 处理接口接收的数据包，也不会创建反方向队列。将 WAN 入口重定向到 Intermediate Functional Block（IFB）的 Linux 示例会创建单独的发送排队点；它们不是 RouterOS Interface Queue 的配置说明。

### 选择整形速率 {#select-the-shaping-rate}

整形器必须成为瓶颈，才能控制队列延迟。请从低于稳定实测吞吐量的值开始，而不是从服务标称速率开始。入口整形通常需要更多余量，因为上游发送方和 ISP 队列不在路由器的控制范围内。在开销补偿正确的情况下，出口整形可以更接近实测链路速率运行。

在同时进行上传和下载负载的情况下验证该速率，同时测量延迟。仅测试吞吐量的速度测试无法说明交互式流量、语音或其他主机是否仍保持响应。当 CAKE 在主机和流之间共享容量时，单个流的吞吐量下降可能是预期结果。

:::warning
执行整形的 CAKE 实例不会将其数据包处理分配到多个 CPU 核心。即使其他核心空闲，CPU 耗尽也可能降低吞吐量并增加延迟。请在目标设备上测试所需的整形速率。不限速的 CAKE 所需处理量远低于执行整形的 CAKE。
:::

:::note
被 FastTrack 处理的流量会绕过 `parent=global` 的 Simple Queue 和 Queue Tree。直接以接口为父级的 Queue Tree 可以处理被 FastTrack 处理的流量。请参阅 [FastTrack](../../connection-tracking.md#fasttrack)。
:::

## 开销补偿 {#overhead-compensation}

CAKE 必须知道每个数据包在瓶颈链路上占用多少时间。CAKE 可见的数据包大小可能不包含成帧、封装或包间开销。如果没有补偿，配置的整形器可能发送得略快于真实链路，从而导致队列在其他位置堆积。

优先选择与瓶颈技术匹配的 `cake-overhead-scheme`。方案会设置相关开销、最小数据包单元（MPU）以及 ATM 或 PTM 补偿。仅当封装已知且没有匹配的预设时，才使用手动值。

| 方案 | 行为 |
| :-- | :-- |
| `raw` | 禁用开销补偿。当 CAKE 可见的数据包大小已经代表瓶颈所使用的单位时使用。 |
| `convervative` | 有意高估未知开销。它等效于 48 字节开销并带 ATM 补偿。RouterOS 对此值使用拼写 `convervative`。 |
| `ethernet` | 计入以太网前导码、帧间隔和帧校验序列。它等效于 38 字节开销、84 字节的 MPU，且无 ATM 或 PTM 补偿。 |
| `via-ethernet` | 当 CAKE 收到完整以太网帧而不是原始 IP 数据包时，对另一个方案进行调整。仅将其作为修饰符与适用的基础方案一起使用。 |
| `ether-vlan` | 为 IEEE 802.1Q VLAN 头增加 4 字节。将其与适用的基础方案组合使用。 |
| `docsis` | 匹配 DOCSIS 头端整形和计量所使用的以太网帧大小。它等效于 18 字节开销、64 字节的 MPU，且无 ATM 或 PTM 补偿。 |
| ADSL 方案 | 选择 `ipoa-vcmux`、`ipoa-llcsnap`、`bridged-vcmux`、`bridged-llcsnap`、`pppoa-vcmux`、`pppoa-llc`、`pppoe-vcmux` 或 `pppoe-llcsnap` 以匹配封装。这些方案包含 ATM 信元补偿。 |
| `pppoe-ptm` 或 `bridged-ptm` | 选择匹配的 VDSL2 封装。这些方案包含 PTM 补偿。 |

对于手动配置，`cake-overhead` 接受 -64 到 256 字节的值。`cake-mpu` 接受 0 到 256 字节的值，且不能为负数。对于 ATM 信元成帧，请设置 `cake-atm=atm`；对于 PTM 编码，请设置 `cake-atm=ptm`。

## RTT 方案 {#rtt-schemes}

CAKE 队列规则使用往返时间（RTT）来调整其主动队列管理参数。除非已知典型流量的 RTT，否则请保留默认的 `internet` 方案。较短的方案反应更快，但低于实际路径 RTT 的值可能会降低长寿命流的吞吐量，尤其是在低速率链路上。该设置不需要与每个流精确匹配；实际 RTT 在大致一个数量级以内通常都能很好地工作。

对于大多数本地网络，请使用 `metro` 而不是 `lan`。`lan` 的激进时间常数可能过早发出拥塞信号、降低吞吐量，并留下过少的排队流量供公平性逻辑使用。请仅将其保留用于受控的纯以太网网络；在对互联网接入链路进行整形时不要使用它。

以下是你可以使用的 RTT 设置、它们的含义以及可能使用它们的场景：

1. `cake-rtt`：手动指定 RTT，例如 `cake-rtt=100ms`。
2. `cake-rtt-scheme=datacentre`：假定 RTT 为 100 微秒。仅用于性能极高的数据中心网络。
3. `cake-rtt-scheme=lan`：假定 RTT 为 1 毫秒。仅用于受控的纯以太网网络，不用于互联网接入链路。
4. `cake-rtt-scheme=metro`：假定 RTT 为 10 毫秒。用于大多数本地网络或同一城市内的流量。
5. `cake-rtt-scheme=regional`：假定 RTT 为 30 毫秒。用于区域内或国家内的流量。
6. `cake-rtt-scheme=internet`：假定 RTT 为 100 毫秒。适用于典型的互联网流量。
7. `cake-rtt-scheme=oceanic`：假定 RTT 为 300 毫秒。用于延迟持续高于平均水平的互联网流量。
8. `cake-rtt-scheme=satellite`：假定 RTT 为 1000 毫秒。用于地球同步卫星路径。
9. `cake-rtt-scheme=interplanetary`：假定 RTT 为 3600 秒，并且几乎完全禁用主动队列管理（AQM）操作。它不适用于普通网络配置。

对于卫星和其他高延迟链路，当预设与路径不匹配时，请设置实测 RTT。预设是起点，而不是测量值。

## 流隔离 {#flow-isolation}

CAKE 通过源地址和目的地址、传输协议以及源端口和目的端口来识别流。它将流放入单独的队列并公平地调度它们。这样，当大流量使用同一链路时，稀疏的低速率流仍能保持响应。

- `cake-flowmode=triple-isolate`：在源主机、目的主机和各个流之间应用公平性。这是默认值，也是典型网关的推荐起点。
- `cake-flowmode=dual-srchost`：先在源主机之间应用公平性，再在各主机的流之间应用公平性。当源地址标识需要平衡的订阅者或设备时使用。
- `cake-flowmode=dual-dsthost`：先在目的主机之间应用公平性，再在各主机的流之间应用公平性。当目的地址标识需要平衡的订阅者或设备时使用。
- `cake-flowmode=srchost`：仅在源地址之间应用公平性。
- `cake-flowmode=dsthost`：仅在目的地址之间应用公平性。
- `cake-flowmode=hosts`：在源主机和目的主机对之间应用公平性。
- `cake-flowmode=flows`：仅在完整的五元组流之间应用公平性。
- `cake-flowmode=flowblind`：禁用流隔离，并将每个 tin 的所有流量放入一个队列。

当路由器执行 NAT 时，请设置 `cake-nat=yes`，以便 CAKE 能够隔离内部地址和端口。除非拓扑需要特定的方向模式，否则请保留 `triple-isolate`。常被复制的组合——上传使用 `dual-srchost`、下载使用 `dual-dsthost`——主要适用于 CAKE 已经能够看到所需主机地址而无需 NAT 查找的情况。当另一台设备执行 NAT，或硬件卸载的流量绕过 CAKE 时，NAT 查找不会生效。

## ACK 过滤器 {#ack-filter}

ACK 过滤会在冗余 TCP 确认数据包占用狭窄发送链路的容量之前将其移除。请从 `cake-ack-filter=filter` 开始；仅在测试表明额外过滤不会降低 TCP 性能后，才使用 `cake-ack-filter=aggressive`。设置 `cake-ack-filter=none` 可禁用它。

仅在高度非对称连接的较慢一侧的发送队列上启用 ACK 过滤。当下载/上传比率超过约 10:1 时，它才会变得相关。不要在接收队列上启用它：ACK 数据包通常不会在那里堆积，而且过滤器会消耗额外的 CPU。

ACK 过滤无法检查加密流量（例如 WireGuard 或 IPsec 隧道）内部的 ACK 数据包。请在明文 TCP ACK 数据包可见的位置应用它。

## DiffServ {#diffserv}

差分服务（DiffServ）根据数据包的差分服务代码点（DSCP）对其进行分类，并将它们放入称为 tin 的 CAKE 流量类别中。CAKE 在 tin 之间应用软优先级：每个 tin 都会获得服务，并且可以借用未使用的容量。百分比阈值不是固定带宽限制。例如，当其他 tin 空闲时，Best Effort 可以使用链路的 100%。

- `cake-diffserv=diffserv3`（默认）：提供 Bulk（CS1 和 LE）、Best Effort（一般流量）和 Voice（CS7、CS6、EF、VA 和 TOS4）tin。它们的阈值分别为 6.25%、100% 和 25%。Voice 使用更短的 CoDel 间隔。
- `cake-diffserv=diffserv4`：提供 Bulk（CS1 和 LE）、Best Effort（一般流量）、Video（AF4x、AF3x、CS3、AF2x、CS2、TOS4 和 TOS1）和 Voice（CS7、CS6、EF、VA、CS5 和 CS4）tin。它们的阈值分别为 6.25%、100%、50% 和 25%。
- `cake-diffserv=diffserv8`：为具有精心设计且详细的 DSCP 策略的网络提供八个 tin。
- `cake-diffserv=besteffort`：禁用优先级排队，并将所有流量放入一个 tin。当 DSCP 标记不存在或不应影响调度时使用。
- `cake-diffserv=precedence`：使用旧式 IP 优先级解释。在新配置中应避免使用此模式。

CAKE 本身不会创建可信的分类。仅当你信任接收到的 DSCP 标记，或通过一致的本地策略设置它们时，才使用 DiffServ 模式。错误的高优先级标记可能会使流量获得非预期的服务。

## Wash {#wash}

`cake-wash=yes` 选项会在 CAKE 使用 DSCP 标记做出优先级决策后清除这些标记。它不会清除显式拥塞通知（ECN）位。

当下一跳网络不得继承现有 DSCP 策略时，请在 DiffServ 域边界启用 `cake-wash=yes`。如果不信任入站标记且这些标记不应影响调度，请使用 `cake-diffserv=besteffort`；再加上 `cake-wash=yes` 还会在转发数据包之前清除这些标记。

## Autorate 入口 {#autorate-ingress}

`cake-autorate-ingress` 选项根据入口数据包的到达时间估算容量，并调整 CAKE 的内部整形器。可选的 `cake-bandwidth` 值提供其初始估算值。

该估算器仅观察到达此 CAKE 实例的流量。它无法测量更下游的瓶颈，并且必须接收到足够的流量后才能提高其估算值。因此，容量变化大或变化快的链路（例如 LTE 和 5G）可能产生不稳定或意外偏低的速率。

:::warning
在生产使用之前，请在实际链路上测试 `cake-autorate-ingress`。它是 CAKE 的内置估算器，与持续测量延迟并更新整形器的外部自适应速率实现不同。当可预测的延迟和吞吐量比跟随每一次容量变化更重要时，请使用低于可靠链路容量的固定速率。
:::

当打算由 HTB 控制速率时，请不要启用 `cake-autorate-ingress`。该选项改变的是 CAKE 的整形器，而不是 HTB 的 `max-limit`。
