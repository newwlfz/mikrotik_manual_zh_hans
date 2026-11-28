---
title: "CAKE"
description: "CAKE（Common Applications Kept Enhanced）是 RouterOS 中的一种高级队列管理算法，通过带宽整形、流隔离和基于 RTT 的拥塞控制优化网络流量处理。它支持 Diffserv 优先级、ACK 过滤、NAT 处理，以及针对不同链路技术的多种开销补偿方案。"
tags:
  - 'cake'
  - 'diffserv'
  - 'flow-isolation'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/queues/queue-types/cake
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "firewall-and-quality-of-service/queues/queue-types"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## CAKE（Common Applications Kept Enhanced） {#cake-common-applications-kept-enhanced}

### 描述 {#description}

CAKE（Common Applications Kept Enhanced）是一种现代的高级队列管理算法，旨在应对不断变化的网络条件和不同类型的流量。它用于解决旧算法的局限，并为多种常见网络问题提供一体化解决方案。

CAKE 的方法是在尽可能减少配置和调整的情况下保持公平性、最小化缓冲区膨胀，并管理不同类型的流量。这通过多种技术实现，包括流隔离、带宽整形和小数据包优先处理。

| 属性 | 描述 |
| :-- | :-- |
| Bandwidth Limit： | 允许你手动设置 CAKE shaper 的带宽限制。例如，如果你知道 ISP 提供 100Mbps 连接，可以将速率设置为 100Mbps，以防止 CAKE 尝试使用超过可用带宽的带宽。 |
| Autorate Ingress | 适用于连接质量变化的情况。例如，如果使用蜂窝数据连接，其质量可能因信号强度而剧烈波动，该选项允许 CAKE 动态调整 shaper 带宽，以匹配链路的估计容量。 |
| Overhead | CAKE 队列规则中的 overhead 参数允许你指定每数据包开销（以字节为单位），以便在整形流量时计入该开销。这在处理 DSL 等技术时尤其重要，因为协议封装会为每个数据包增加额外字节。准确计入这些开销可更精确地控制实际使用的带宽。 |
| MPU | Minimum Packet Unit（MPU）参数允许你将每个数据包的大小向上取整到指定的最小值。这适用于具有最小数据包大小的链路层技术。例如，如果链路层技术的最小数据包大小为 64 字节，可以使用 `mpu 64` 配置 CAKE。 |
| ATM | 该选项用于 Asynchronous Transfer Mode，这是一种常用于 DSL 宽带连接的网络技术。ATM 使用固定的 53 字节信元，每个信元可承载 48 字节有效载荷。`atm` 关键字用于补偿此开销。 |
| Overhead Scheme | CAKE 中的开销补偿功能使其能够计入各种链路层技术增加的额外字节，在某些情况下这些字节可能很多。这一点很重要，因为 CAKE 基于 Linux 内核报告的数据包大小运行，而这些大小不包含这些额外字节。如果不计入开销，CAKE 的 shaper 可能允许更多数据进入链路，超过链路实际处理能力，从而导致意外的数据包丢失。 |
| RTT | 手动指定 RTT。适用于知道要使用的确切 RTT 的高级用户。 |
| RTT Scheme | CAKE 队列规则允许你指定管理流量时应考虑的 Round Trip Time（RTT）。这一点很重要，因为数据包从源端传输到目的端再返回所需的时间会影响 CAKE 管理网络拥塞的方式。如果网络的实际 RTT 接近你指定的值，则网络的吞吐量和延迟都应得到良好管理。 |
| Diffserv | Diffserv（Differentiated Services）是一种机制，用于根据 IP 数据包头中的 Diffserv 字段对网络流量进行优先级划分和分类。CAKE（Common Applications Kept Enhanced）提供 Diffserv 支持，允许将流量划分为“tins”（流量类别），并对每个 tin 应用不同的处理方式。 |
| Flow Mode | 启用流隔离后，CAKE 会将不同流的数据包放入不同队列。每个队列维护自己的 Active Queue Management（AQM）状态，并使用 DRR++（Deficit Round Robin++）算法公平地从每个队列传送数据包。该算法用于最小化“稀疏”流（即包含较少数据包的流）的延迟。 |
| ACK Filter | ACK 或确认过滤是 Cake 算法的一项功能，用于处理 TCP ACK（确认）数据包。TCP ACK 数据包对 TCP 协议的功能至关重要；它们确认 TCP 段的接收，提供一种流控形式。但是，这些数据包可能占用大量上传带宽，尤其是在下载大文件时。通过实施 ACK 过滤，Cake 可以压缩这些 ACK，减少其对上传带宽的影响。 |
| NAT | 这些选项控制 CAKE 在使用 Network Address Translation（NAT）时如何处理流量。`nat` 使 CAKE 在隔离流时考虑 NAT 后的地址和端口，当你在同时为连接设备执行 NAT 的路由器上整形流量时，这很有用。 |
| Wash | CAKE 队列规则中的“wash”选项用于解决频繁错误标记的流量进入或离开 DiffServ（Differentiated Services）域的问题。当流量经过网络或提供商时，DSCP（Differentiated Services Code Point）标记可能被修改或错误分配。 |

## 开销方案 {#overhead-schemes}

CAKE 中的开销补偿功能使其能够计入各种链路层技术增加的额外字节，在某些情况下这些字节可能很多。这一点很重要，因为 CAKE 基于 Linux 内核报告的数据包大小运行，而这些大小不包含这些额外字节。如果不计入开销，CAKE 的 shaper 可能允许更多数据进入链路，超过链路实际处理能力，从而导致意外的数据包丢失。

1. **手动指定开销**：你可以手动指定以字节为单位的开销。例如，如果知道链路层为每个数据包增加 18 字节开销，可以使用 `overhead 18` 配置 CAKE。也接受负值，范围为 -64 到 256 字节。
2. **MPU**：Minimum Packet Unit（MPU）参数允许你将每个数据包的大小向上取整到指定的最小值。这适用于具有最小数据包大小的链路层技术。例如，如果链路层技术的最小数据包大小为 64 字节，可以使用 `mpu 64` 配置 CAKE。
3. **ATM**：该选项用于 Asynchronous Transfer Mode，这是一种常用于 DSL 宽带连接的网络技术。ATM 使用固定的 53 字节信元，每个信元可承载 48 字节有效载荷。`atm` 关键字用于补偿此开销。
4. **PTM**：该选项用于 Packet Transfer Mode，这是另一种常用于 VDSL2 连接的网络技术。PTM 使用 64b/65b 编码方案，实际上会少量降低可用带宽。`ptm` 关键字用于补偿此开销。
5. **故障保护开销关键字**：提供 `raw` 和 `conservative` 关键字用于快速简易设置。`raw` 关闭 CAKE 中的所有开销补偿，`conservative` 补偿的开销多于任何广泛部署的链路技术可能产生的开销。
6. **ADSL 开销关键字**：大多数 ADSL 调制解调器使用 ATM 信元封装，并且由于使用 PPPoA 或 PPPoE 协议而产生额外开销。提供 `pppoa-vcmux`、`pppoe-llc` 等关键字以计入这些开销。
7. **VDSL2 开销关键字**：VDSL2 使用 PTM 而不是 ATM，也可能使用 PPPoE。提供 `pppoe-ptm` 和 `bridged-ptm` 等关键字以计入这些开销。
8. **DOCSIS 电缆开销关键字**：DOCSIS 是通过有线电视基础设施提供互联网服务的标准。提供 `docsis` 关键字以计入 DOCSIS 的开销。
9. **以太网开销关键字**：这些关键字计入以太网帧的开销，包括前导码、帧间隔和 Frame Check Sequence。分别提供 `ethernet` 和 `ether-vlan` 用于以太网和带 VLAN 的以太网[[^1]:](https://www.man7.org/linux/man-pages/man8/tc-cake.8.html)。

## RTT 方案 {#rtt-schemes}

CAKE 队列规则允许指定管理流量时应考虑的往返时间（RTT）。这一点很重要，因为数据包从源端传输到目的端再返回所需的时间会影响 CAKE 管理网络拥塞的方式。如果网络的实际 RTT 接近指定的值，则网络的吞吐量和时延都能得到良好管理。

以下是可以使用的 RTT 设置、它们的含义以及适用场景：

1. `rtt TIME`：手动指定 RTT。适用于知道要使用的确切 RTT 的高级用户。
2. `datacentre`：适用于极高性能网络，例如数据中心中的 10 Gigabit Ethernet（10GigE）网络。假定 RTT 为 100 微秒。示例：如果管理高容量数据中心中的网络流量，请使用此设置。
3. `lan`：适用于纯以太网网络，例如家庭或办公室环境中的网络。假定 RTT 为 1 毫秒。示例：如果管理有线家庭或办公室网络上的流量，请使用此设置，但不适用于 Internet 接入链路的限速。
4. `metro`：适用于主要位于单个城市内的流量。假定 RTT 为 10 毫秒。示例：如果管理单个城市内网络的流量，例如全市范围的企业网络，请使用此设置。
5. `regional`：适用于主要位于欧洲大小国家范围内的流量。假定 RTT 为 30 毫秒。示例：如果管理覆盖一个国家的网络流量，请使用此设置。
6. `internet`：适用于大多数 Internet 流量。假定 RTT 为 100 毫秒。示例：如果在典型宽带连接上管理一般 Internet 流量，请使用此设置。
7. `oceanic`：适用于通常高于平均时延的 Internet 流量，例如澳大拉西亚居民所经历的流量。假定 RTT 为 300 毫秒。示例：如果管理高时延位置的流量，例如澳大利亚或新西兰，请使用此设置。
8. `satellite`：适用于经由地球同步卫星的流量。假定 RTT 为 1000 毫秒（1 秒）。示例：如果管理使用卫星 Internet 连接的网络流量，请使用此设置。
9. `interplanetary`：此设置会禁用主动队列管理（AQM）操作，因为 RTT 非常长（3600 秒）。它之所以命名为“interplanetary”，是因为从地球到木星的单程信号传输时间约为 33 至 53 分钟（平均约 43 分钟），往返时间约为 66 至 106 分钟。示例：此设置通常不用于标准网络场景，但在极高时延场景中可能有用，例如实验性远距离通信场景。

请记住，这些只是指导原则，最佳设置取决于网络的具体特性和要求。如果不确定，对于大多数场景，`internet` 设置是一个良好的起点[[^1]:](https://www.man7.org/linux/man-pages/man8/tc-cake.8.html)。

## 流隔离参数 {#flow-isolation-parameter}

启用流隔离后，CAKE 会将不同流的数据包放入不同队列。每个队列维护自己的主动队列管理（AQM）状态，并使用 DRR++（Deficit Round Robin++）算法公平地从每个队列传送数据包。该算法用于最小化“稀疏”流或包含较少数据包流的时延。

这里的关键方面是 CAKE 确定不同流的方法，称为“流隔离”。CAKE 使用集合关联哈希算法来减少流冲突。

1. **flowblind** - 该参数禁用流隔离，所有流量对每个“tin”或流量类别都通过单个队列。*适用于不需要或不希望进行特定流隔离的场景，例如你希望以相同方式处理所有流量，而不区分来源或目的地。*
2. **srchost -** 此处仅根据源地址确定流。这对 Internet Service Provider（ISP）回程链路的出站方向可能有益。*电信公司可能会使用它，以确保不同地区或客户公平使用其骨干网络。*
3. **dsthost -** 使用该参数时，仅根据目的地址表征流。这对 ISP 回程链路的入站方向可能有益。*企业可以使用它来平衡发往不同服务器的入站流量。*
4. **hosts -** 在这种情况下，流由源-目的主机对定义。这是主机隔离，而不是流隔离。*这可能适用于数据中心网络，你希望确保特定服务器对之间的通信是公平的。*
5. **flows** - 流由完整的 5-tuple 表征：源地址、目的地址、传输协议、源端口和目的端口。这是 SFQ 和 fq\_codel 执行的流隔离类型。*云提供商可以使用它来确保通过不同协议和端口通信的不同虚拟机之间保持公平。*
6. **dual-srchost** - 此处，流由 5-tuple 定义，并先基于源地址应用公平性，再基于各个流应用公平性。这是从 Local Area Network（LAN）到 Internet 的出站流量的理想选择。*大学可能会使用它来防止任何单个用户或设备占用互联网连接，无论其使用多少个不同连接。*
7. **dual-dsthost** - 在这种情况下，流由 5-tuple 定义，并先基于目的地址应用公平性，再基于各个流应用公平性。这适用于从 internet 到 LAN 的入站流量。*大型公司可以使用它来防止任何单个服务器或系统占满网络的入站带宽。*
8. **triple-isolate** - 这是默认设置，其中流由 5-tuple 定义。公平性会智能地基于源地址和目的地址应用，也会基于各个流应用。这可以防止链路任一侧的单个主机通过大量流独占链路。*Internet Service Provider（ISP）可能会使用它来确保所有客户获得公平服务，无论其有多少连接，也无论其是否。*

## Ack Filter

ACK 或确认过滤是 Cake 算法的一项功能，用于处理 TCP ACK（确认）数据包。TCP ACK 数据包对 TCP 协议的运行至关重要；它们确认 TCP 段的接收，提供一种流控机制。但是，这些数据包可能会占用大量上传带宽，尤其是在下载大文件时。通过实施 ACK 过滤，Cake 可以压缩这些 ACK，减少其对上传带宽的影响。

1. **ack-filter** - 该选项启用 ACK 过滤功能。使用此选项时，Cake 将尝试识别并过滤掉不传达重要新信息或无需立即发送的 ACK 数据包，从而帮助提高上传带宽利用率。
2. **ack-filter-aggressive** - 这是 ack-filter 选项的更激进版本。它将导致更多 ACK 数据包被压缩或过滤掉，从而进一步提高上传带宽利用率，但可能会影响 TCP 性能。使用 ack-filter 或 ack-filter-aggressive 选项取决于你的具体网络条件和需求。例如，如果你发现 ACK 数据包占用了大量可用上传带宽，则启用 ACK 过滤可能会有帮助。另一方面，如果你遇到 TCP 性能问题，并怀疑 ACK 过滤可能是原因，可以尝试禁用它或使用较不激进的选项。

## Wash

CAKE 队列规则中的“wash”选项用于解决进入或离开 DiffServ（Differentiated Services）域的流量经常被错误标记的问题。当流量经过网络或提供商时，DSCP（Differentiated Services Code Point）标记可能会被修改或错误分配。

用一个真实示例和类比来说明：

假设你正在运营一个繁忙的机场。不同航空公司根据乘客的机票等级（经济舱、商务舱、头等舱）为其分配不同的优先级。这些优先级类似于网络中的 DSCP 标记。

但是，当乘客经过不同的中转机场时，由于航空公司的政策不同或中转机场的不一致，分配的优先级可能会被更改或错误标记。这类似于流量在传输网络中被错误标记。

现在，在机场场景中，假设乘客到达你的机场后，会根据其优先级被划分到不同队列。这种划分确保高优先级类别的乘客能够更快完成处理并获得更好的服务。

但是，由于先前机场分配的优先级可能不可靠，因此有必要在乘客进入你机场的队列之前“清洗”或清除已分配的优先级。这类似于 CAKE 中的“wash”选项，它会在优先级排队完成后清除额外的 DSCP 标记。

当入站流量的 DSCP 标记不可信时（类似于 Comcast Cable 等情况），建议使用带“wash”选项的单队列“besteffort”模式。这意味着所有入站流量都被视为默认的“best effort”类别，并且任何可能不可信或错误标记的 DSCP 值都会在进一步处理前被清除。

在我们的机场类比中，使用带“wash”的单队列“besteffort”模式意味着，无论先前机场分配的优先级如何，所有乘客最初都会被视为普通乘客（best effort 类别），直到其优先级能够在你的机场被准确确定和分配。

这种方法确保即使入站流量的 DSCP 标记在传输过程中被错误标记或修改，流量也会在你的网络内得到公平且一致的处理，而不依赖来自外部来源的潜在不可靠标记。

通过在 CAKE 中应用“wash”选项，网络管理员可以减轻错误标记或被修改的 DSCP 标记带来的影响，在其网络域内提供更一致、更可靠的服务质量（QoS）处理。

## Diffserv RFC2474 和 RFC2475 {#diffserv-rfc2474-and-rfc2475}

Diffserv（Differentiated Services）是一种基于 IP 数据包头中的 Diffserv 字段对网络流量进行优先级划分和分类的机制。CAKE（Common Applications Kept Enhanced）提供 Diffserv 支持，允许将流量划分到“tins”（流量类别），并对每个 tin 应用不同的处理方式。以下是 CAKE 中的 Diffserv 预设以及实际示例：

**besteffort** - CAKE 中的“besteffort”预设会禁用优先级队列，并将所有流量放入单个 tin。这意味着所有流量都被同等对待，不进行任何特定优先级划分。*该预设适用于非关键或低优先级流量，例如一般网页浏览或后台文件下载，在这些场景中，同等对待即可满足需求。*

**precedence** - “precedence”预设启用 TOS（Type of Service）“Precedence”字段的传统解释。不过，不建议在现代互联网中使用该方式，因为它是一种过时的机制。*过去，该字段用于表示不同优先级，例如高、中或低，但如今已不再广泛使用或推荐。*

**diffserv4** - “diffserv4”预设提供通用 Diffserv 实现，包含四个 tin：

1. **Bulk**：该 tin 对应 CS1（Class Selector 1）或 LE（Lower Effort），阈值为 6.25%。该 tin 中的流量通常具有低优先级。
2. **Best Effort**：该 tin 用于不属于任何特定 Diffserv 类别的一般流量。其阈值为 100%，这意味着它会获得所有剩余带宽。
3. **Video**：该 tin 包含 AF4x、AF3x、CS3、AF2x、CS2、TOS4 和 TOS1。其阈值为 50%，为视频流量提供中等优先级。
4. **Voice**：该 tin 覆盖 CS7、CS6、EF（Expedited Forwarding）、VA（Voice Admit）、CS5 和 CS4。其阈值为 25%，为语音流量提供高优先级。

*在网络中同时存在视频流、网络电话（VoIP）和一般互联网流量时，该预设可以确保视频和语音流量获得适当优先级，同时相应处理 bulk 和 best-effort 流量。*

**diffserv3**(default) - “diffserv3”预设是 CAKE 中的默认 Diffserv 实现，提供三个 tin：

1. **Bulk**：与“diffserv4”预设类似，该 tin 表示 CS1 或 LE，阈值为 6.25%，作为低优先级流量类别。
2. **Best Effort:** 该 tin 用于一般流量，阈值为 100%，同等对待所有剩余流量。
3. **Voice**：该 tin 覆盖 CS7、CS6、EF、VA 和 TOS4。其阈值为 25%，并应用缩短的 CoDel（Controlled Delay）间隔，为语音流量提供高优先级。

*在网络中语音流量需要高优先级（例如 VoIP 系统），而其他流量属于一般类别时，“diffserv3”预设可以确保语音数据包获得适当优先级，同时保持其他流量的公平性。*

**diffserv8**- 是一种更高级的 diffserv，包含 8 个层级：

DiffServ8 中的 8 个类别根据网络流量的重要性映射到不同类型，使用 Differentiated Services Code Point（DSCP）的十进制值：

1. **Network Control**（48-63）：最高优先级，通常用于路由信息等关键网络流量。
2. **Telephony**（46）：对延迟敏感的流量，例如 VoIP。
3. **Signaling**（32-39）：实时应用的控制信号。
4. **Multimedia Conferencing**（24-31）：视频会议流量。
5. **Real-time Interactive**（40-45）：交互式应用，例如游戏。
6. **Multimedia Streaming**（16-23）：流媒体视频和音频。
7. **Low Latency Data**（8-15）：需要低延迟的流量，例如金融交易。
8. **Best Effort**（0-7）：默认流量类别，没有特殊优先级。

## Autorate Ingress

在 CAKE 队列规则中使用 `cake-autorate-ingress` 选项时，CAKE 会根据观察到的数据包到达时间自动确定下载速度。其工作方式如下：

1. **Monitoring Packet Arrival Times**：CAKE 持续监控传入数据包的到达时间。它记录连续数据包之间的时间间隔，以估算数据包的接收速率。
2. **Calculating Average Packet Arrival Rate**：CAKE 根据观察到的到达时间计算平均数据包到达速率。它用接收到的数据包数量除以经过的总时间，确定数据包的平均到达速率。
3. **Deriving Download Speed**：CAKE 根据平均数据包到达速率推断网络连接的下载速度或吞吐量。由于每个数据包代表一定数据量，它假定数据包到达速率对应下载速度。
4. **Dynamic Adjustment**：CAKE 持续监控数据包到达时间时，会动态调整下载速度估算。如果到达速率增加，CAKE 会更新下载速度估算以反映更高的吞吐量。相反，如果到达速率降低，CAKE 会相应调整估算值。

通过自动确定下载速度，CAKE 可以适应网络条件的变化，并调整流量整形和队列算法，以优化可用带宽的利用率。

需要注意的是，尽管 CAKE 可以根据数据包到达时间估算下载速度，但它并不直接知道链路容量或网络设备、服务提供商报告的真实下载速度。相反，它依赖观察到的数据包到达速率来近似估算下载速度，以用于流量整形。
