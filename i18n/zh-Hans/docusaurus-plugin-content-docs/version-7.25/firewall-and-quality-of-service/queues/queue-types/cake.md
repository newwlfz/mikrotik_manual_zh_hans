---
title: "CAKE"
description: "CAKE（Common Applications Kept Enhanced）是 RouterOS 中的一种高级队列管理算法，通过带宽整形、流隔离和基于 RTT 的拥塞控制优化网络流量处理。它支持 Diffserv 优先级、ACK 过滤、NAT 处理，以及针对不同链路技术的多种开销补偿方案。"
tags:
  - 'cake'
  - 'diffserv'
  - 'flow-isolation'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/queues/queue-types/cake
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "firewall-and-quality-of-service/queues/queue-types"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

CAKE（Common Applications Kept Enhanced）是一种具备整形能力的队列规程，结合了 COBALT 主动队列管理、赤字模式整形器、DRR++ 流隔离、简化的 DiffServ 处理以及链路层开销补偿。

CAKE 旨在通过使用实用默认值和少量调优来保持公平性并尽量减少 bufferbloat。

## 何时使用 CAKE {#when-to-use-cake}

在共享瓶颈上使用 CAKE，适用于大流量传输会增加延迟或某一主机可能占用全部可用容量的场景。典型示例包括多个客户端共享的互联网连接、较慢的上行链路或非对称连接。

CAKE 可以：

- 在链路繁忙时保持低延迟。
- 在主机之间以及各自主机的单个连接之间共享容量。
- 针对链路层开销进行整形。
- 应用简单的 DiffServ 策略。
- 在高度非对称链路上过滤冗余 TCP 确认。

CAKE 只能控制经过其队列的流量。它无法修正 Wi-Fi 干扰、路由器 CPU 性能不足或网络中其他位置的队列，除非将其整形器配置为低于该瓶颈的速率。

如果需要每流公平性和主动队列管理，并且 CPU 占用更低，请使用 FQ-CoDel。如果还需要每主机公平性、带链路层补偿的集成整形器、DiffServ 处理或 ACK 过滤，请使用 CAKE。

## 基本配置 {#basic-configuration}

CAKE 是一种队列类型，不是完整的流量匹配规则。在 `/queue/type` 下创建 CAKE 条目只会定义一个可复用的队列配置，不会自行处理任何流量。将该配置分配给 Simple Queue、Queue Tree 或 Interface Queue。完整的属性列表和可用值请参阅生成的 [`/queue/type` CLI 参考](/docs/cli-reference/queue/type)。

以下示例将相同的 CAKE 配置应用于 Simple Queue 的两个方向。HTB 提供上传和下载限制，因此 CAKE 内部整形器保持不受限制：

```ros
/queue/type
add name=cake-default kind=cake cake-bandwidth=0 cake-nat=yes

/queue/simple
add name=internet-cake target=192.168.88.0/24 max-limit=20M/100M queue=cake-default/cake-default
```

在 `max-limit=20M/100M` 和 `queue=cake-default/cake-default` 中，第一个值为上传，第二个值为下载。请将目标和速率替换为适合网络的数值。FastTracked 流量会绕过该 Simple Queue，因此请对队列必须处理的流量禁用 FastTrack。

:::note
仅在 `kind=cake` 的队列类型上设置 `cake-bandwidth`。它控制 CAKE qdisc 内置的整形器。

Simple Queue 和 Queue Tree 条目使用 HTB。它们的 `limit-at`（CIR）和 `max-limit`（MIR）参数控制 HTB 层级的速率。将 CAKE 队列类型分配给这些条目之一时，CAKE 会作为 HTB 下的叶子 qdisc 运行。

当 HTB 应控制流量速率时，保持 `cake-bandwidth=0`。该值使 CAKE 的整形器不受限制，但 CAKE 仍会提供主动队列管理、流隔离和 DiffServ 处理。当 CAKE 也应整形流量时，设置 `cake-bandwidth`。如果同时配置 `cake-bandwidth` 和 HTB 速率限制，流量会经过两个整形器。
:::

## 推荐起点 {#recommended-starting-points}

| 使用场景 | 推荐起始配置 |
| :-- | :-- |
| Simple Queue 或 Queue Tree 提供速率限制 | 保持 `cake-bandwidth=0` 并设置 HTB `max-limit`。CAKE 提供主动队列管理和公平性，不会增加第二个整形器。 |
| CAKE 提供速率限制 | 将 `cake-bandwidth` 设置为低于实际瓶颈速率的值，并配置正确的链路层开销。除非有意使用两层整形，否则避免设置第二个 HTB 速率限制。 |
| 路由器执行 NAT | 设置 `cake-nat=yes` 并保持默认的 `triple-isolate` 流模式。这使一个 CAKE 实例能够在内部主机之间以及它们的流之间平衡流量。 |
| 下载/上传比率大于约 10:1 | 仅在较慢方向的发送队列上设置 `cake-ack-filter=filter`。 |
| 入站 DSCP 标记不受信任 | 设置 `cake-diffserv=besteffort` 以忽略这些标记，或设置 `cake-wash=yes` 在 CAKE 应用优先级判定后清除这些标记。 |

### 方向和队列位置 {#direction-and-queue-placement}

CAKE 实例仅处理通过其所属队列的数据包。它不会自动处理反向流量。

- **接口队列：** 接口队列处理由该接口发送的数据包。对于转发的客户端流量，WAN 侧发送接口上的 CAKE 处理上传，LAN 侧发送接口上的 CAKE 处理下载。它们是两个独立的 CAKE 实例。接口队列不处理该接口接收的数据包。
- **简单队列：** RouterOS 根据配置的目标确定上传和下载。`queue` 属性按该顺序选择上传和下载队列类型。为两个位置都指定 CAKE 队列类型，以处理两个方向。
- **队列树：** 每个 Queue Tree 都是单向的。其父级和数据包选择决定哪些流量通过其 CAKE 叶子队列。

当上传和下载速率或选项不同时，为每个方向配置独立的 CAKE 队列类型。如果 LAN 使用多个出接口，则仅附加到其中一个接口的接口队列不会处理其他接口发送的流量。单个 CAKE 实例可以平衡通过它的许多主机和流。仅在需要明确的每客户端速率限制或 HTB 保证时，才创建每客户端队列。

`cake-autorate-ingress` 名称指的是 CAKE 的容量估算模式。它不会使接口队列处理接口接收的数据包，也不会创建反向队列。将 WAN 入站流量重定向到 Intermediate Functional Block（IFB）的 Linux 示例会创建一个独立的发送排队点；它们不是 RouterOS 接口队列的配置说明。

### 选择整形速率 {#select-the-shaping-rate}

整形器必须成为瓶颈，才能控制队列延迟。从低于稳定测得吞吐量的值开始，而不是从标称服务速率开始。入站整形通常需要更多余量，因为上游发送方和 ISP 队列不在路由器控制范围内。正确补偿开销后，出站整形可以更接近测得的链路速率。

在同时施加上传和下载负载时验证速率，并测量延迟。仅测试吞吐量的测速无法说明交互式流量、语音或其他主机是否仍保持响应。当 CAKE 在主机和流之间共享容量时，单个流的吞吐量降低可能是预期结果。

:::warning
经过整形的 CAKE 实例不会将其数据包处理分散到多个 CPU 核心。即使其他核心空闲，CPU 耗尽也可能降低吞吐量并增加延迟。在目标设备上测试所需的整形速率。不受限的 CAKE 所需的处理量远低于经过整形的 CAKE。
:::

:::note
FastTracked 流量会绕过 Simple Queues 和 `parent=global` 的 Queue Trees。直接以接口为父级的 Queue Trees 可以处理 FastTracked 流量。请参阅 [FastTrack](/docs/firewall-and-quality-of-service/connection-tracking#fasttrack)。
:::

## 开销补偿 {#overhead-compensation}

CAKE 必须知道每个数据包在瓶颈链路上占用的时间。CAKE 可见的数据包大小可能不包含成帧、封装或数据包间开销。如果不进行补偿，配置的整形器发送速率可能略高于真实链路，并导致队列在其他位置堆积。

优先选择与瓶颈技术匹配的 `cake-overhead-scheme`。方案会设置相关开销、最小数据包单元（MPU）以及 ATM 或 PTM 补偿。仅在封装已知且没有预设匹配时使用手动值。

| Scheme | Behavior |
| :-- | :-- |
| `raw` | 禁用开销补偿。当 CAKE 可见的数据包大小已经表示瓶颈使用的单元时使用。 |
| `convervative` | 有意高估未知开销。它等效于 48 字节开销并启用 ATM 补偿。RouterOS 对该值使用拼写 `convervative`。 |
| `ethernet` | 计入以太网前导码、帧间隔和帧校验序列。它等效于 38 字节开销、84 字节的 MPU，并且不进行 ATM 或 PTM 补偿。 |
| `via-ethernet` | 当 CAKE 接收完整以太网帧而不是原始 IP 数据包时，调整另一个方案。仅将其作为修饰符与适用的基础方案一起使用。 |
| `ether-vlan` | 为 IEEE 802.1Q VLAN 头增加 4 字节。将其与适用的基础方案组合使用。 |
| `docsis` | 匹配 DOCSIS 头端整形和计量使用的以太网帧大小。它等效于 18 字节开销、64 字节的 MPU，并且不进行 ATM 或 PTM 补偿。 |
| ADSL schemes | 选择 `ipoa-vcmux`、`ipoa-llcsnap`、`bridged-vcmux`、`bridged-llcsnap`、`pppoa-vcmux`、`pppoa-llc`、`pppoe-vcmux` 或 `pppoe-llcsnap` 以匹配封装。这些方案包含 ATM 信元补偿。 |
| `pppoe-ptm` 或 `bridged-ptm` | 选择匹配的 VDSL2 封装。这些方案包含 PTM 补偿。 |

对于手动配置，`cake-overhead` 接受 -64 到 256 字节的值。`cake-mpu` 接受 0 到 256 字节的值，并且不能为负数。对于 ATM 信元成帧，设置 `cake-atm=atm`；对于 PTM 编码，设置 `cake-atm=ptm`。

## RTT 方案 {#rtt-schemes}

CAKE 队列规则使用往返时间（RTT）调整其主动队列管理参数。除非已知典型流量的 RTT，否则保留默认 `internet` 方案。较短的方案反应更快，但低于实际路径 RTT 的值可能会降低长连接的吞吐量，尤其是在低速率链路上。该设置不需要与每个流精确匹配；实际 RTT 在大约一个数量级范围内通常都能良好工作。

对于大多数本地网络，使用 `metro` 而不是 `lan`。`lan` 的激进时间常数可能过早发出拥塞信号、降低吞吐量，并使排队流量过少，导致公平性逻辑无法正常工作。仅将其保留用于控制严格的纯以太网网络；在对 Internet 接入链路进行限速时不要使用它。

以下是可以使用的 RTT 设置、它们的含义以及适用场景：

1. `cake-rtt`：手动指定 RTT，例如 `cake-rtt=100ms`。
2. `cake-rtt-scheme=datacentre`：假定 RTT 为 100 微秒。仅将其用于性能极高的数据中心网络。
3. `cake-rtt-scheme=lan`：假定 RTT 为 1 毫秒。仅将其用于受控的纯以太网网络，不用于 Internet 接入链路。
4. `cake-rtt-scheme=metro`：假定 RTT 为 10 毫秒。将其用于大多数本地网络或单个城市内的流量。
5. `cake-rtt-scheme=regional`：假定 RTT 为 30 毫秒。将其用于某个区域或国家内的流量。
6. `cake-rtt-scheme=internet`：假定 RTT 为 100 毫秒。这适用于典型 Internet 流量。
7. `cake-rtt-scheme=oceanic`：假定 RTT 为 300 毫秒。将其用于延迟持续高于平均水平的 Internet 流量。
8. `cake-rtt-scheme=satellite`：假定 RTT 为 1000 毫秒。将其用于地球同步卫星路径。
9. `cake-rtt-scheme=interplanetary`：假定 RTT 为 3600 秒，并几乎完全禁用主动队列管理（AQM）操作。它不适用于普通网络配置。

对于卫星和其他高延迟链路，当预设与路径不匹配时，请设置测得的 RTT。预设只是起点，而不是测量结果。

## 流隔离 {#flow-isolation}

CAKE 通过源地址、目的地址、传输协议以及源端口和目的端口识别流。它将流放入独立队列并进行公平调度。当大流量流使用同一链路时，稀疏的低速率流仍可保持响应能力。

- `cake-flowmode=triple-isolate`：在源主机、目的主机和单个流之间应用公平性。这是默认设置，也是典型网关的推荐起点。
- `cake-flowmode=dual-srchost`：先在源主机之间应用公平性，然后在每个主机的流之间应用公平性。当源地址标识需要平衡的订阅用户或设备时使用。
- `cake-flowmode=dual-dsthost`：先在目的主机之间应用公平性，然后在每个主机的流之间应用公平性。当目的地址标识需要平衡的订阅用户或设备时使用。
- `cake-flowmode=srchost`：仅在源地址之间应用公平性。
- `cake-flowmode=dsthost`：仅在目的地址之间应用公平性。
- `cake-flowmode=hosts`：在源主机和目的主机对之间应用公平性。
- `cake-flowmode=flows`：仅在完整的五元组流之间应用公平性。
- `cake-flowmode=flowblind`：禁用流隔离，并将每个 tin 的所有流量放入一个队列。

当路由器执行 NAT 时，请设置 `cake-nat=yes`，以便 CAKE 隔离内部地址和端口。除非拓扑需要特定的方向模式，否则请保留 `triple-isolate`。常见的上传使用 `dual-srchost`、下载使用 `dual-dsthost` 的组合，主要在 CAKE 无需 NAT 查询即可看到所需主机地址时有用。当 NAT 由另一台设备执行，或硬件卸载流量绕过 CAKE 时，NAT 查询不起作用。

## ACK 过滤 {#ack-filter}

ACK 过滤会在冗余 TCP 确认数据包占用窄带发送链路的容量之前将其移除。请先使用 `cake-ack-filter=filter`；仅在测试表明额外过滤不会降低 TCP 性能后，再使用 `cake-ack-filter=aggressive`。设置 `cake-ack-filter=none` 可禁用该功能。

仅在高度非对称连接中较慢一侧的发送队列上启用 ACK 过滤。当下行/上行比例超过约 10:1 时，该功能才有意义。不要在接收队列上启用它：ACK 数据包通常不会在那里堆积，而过滤器会消耗额外的 CPU。

ACK 过滤无法检查加密流量中的 ACK 数据包，例如 WireGuard 或 IPsec 隧道。请在可见明文 TCP ACK 数据包的位置应用它。

## DiffServ

Differentiated Services（DiffServ）根据 Differentiated Services Code Point（DSCP）对数据包进行分类，并将其放入称为 tins 的 CAKE 流量类别中。CAKE 在 tins 之间应用软优先级：每个 tin 都会获得服务，并可以借用未使用的容量。百分比阈值不是固定的带宽限制。例如，当其他 tins 空闲时，Best Effort 可以使用 100% 的链路。

- `cake-diffserv=diffserv3`（默认）：提供 Bulk（CS1 和 LE）、Best Effort（一般流量）和 Voice（CS7、CS6、EF、VA 和 TOS4）tins。它们的阈值分别为 6.25%、100% 和 25%。Voice 使用更短的 CoDel 间隔。
- `cake-diffserv=diffserv4`：提供 Bulk（CS1 和 LE）、Best Effort（一般流量）、Video（AF4x、AF3x、CS3、AF2x、CS2、TOS4 和 TOS1）和 Voice（CS7、CS6、EF、VA、CS5 和 CS4）tins。它们的阈值分别为 6.25%、100%、50% 和 25%。
- `cake-diffserv=diffserv8`：为具有明确、详细 DSCP 策略的网络提供八个 tins。
- `cake-diffserv=besteffort`：禁用优先级队列，并将所有流量放入一个 tin。当不存在 DSCP 标记或这些标记不得影响调度时，请使用此选项。
- `cake-diffserv=precedence`：使用旧版 IP precedence 解释。避免在新配置中使用此模式。

CAKE 本身不会创建可信的分类。仅在信任收到的 DSCP 标记，或使用一致的本地策略设置这些标记时，才使用 DiffServ 模式。错误的高优先级标记可能使流量获得非预期的服务。

## Wash

`cake-wash=yes` 选项会在 CAKE 使用 DSCP 标记进行优先级决策后清除这些标记。它不会清除 Explicit Congestion Notification（ECN）位。

当下一网络不得继承现有 DSCP 策略时，请在 DiffServ 域边界启用 `cake-wash=yes`。如果入站标记不受信任且不应影响调度，请使用 `cake-diffserv=besteffort`；添加 `cake-wash=yes` 还会在转发数据包前清除这些标记。

## Autorate ingress

`cake-autorate-ingress` 选项根据入站数据包的到达时间估算容量，并调整 CAKE 的内部整形器。可选的 `cake-bandwidth` 值用于提供初始估算值。

该估算器仅观察到达此 CAKE 实例的流量。它无法测量更下游的瓶颈，并且必须接收到足够的流量后才能提高估算值。因此，容量变化较大或较快的链路（例如 LTE 和 5G）可能产生不稳定或异常低的速率。

:::warning
在生产环境使用前，请在实际链路上测试 `cake-autorate-ingress`。它是 CAKE 内置的估算器，不同于持续测量时延并更新整形器的外部自适应速率实现。当可预测的时延和吞吐量比跟随每一次容量变化更重要时，请使用低于链路可靠容量的固定速率。
:::

当 HTB 用于控制速率时，请勿启用 `cake-autorate-ingress`。该选项更改的是 CAKE 的整形器，而不是 HTB 的 `max-limit`。
