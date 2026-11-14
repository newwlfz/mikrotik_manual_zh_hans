---
sidebar_key: "firewall-and-quality-of-service/queues/index"
sidebar_position: 3
title: "队列"
sidebar_label: "队列"
description: "本页介绍 MikroTik RouterOS 的队列与带宽管理，涵盖 HTB、PCQ、burst 行为以及用于流量整形的队列类型。文中说明了如何使用 `/queue/simple` 和 `/queue/tree` 配置简单队列与高级队列，并详细介绍了速率限制原理、CIR/MIR 的定义，以及有关队列顺序和目标匹配的注意事项。"
tags:
  - 'queues'
  - 'htb'
  - 'qos'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/queues
captured_at: '2026-11-04T11:15:53+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 RouterOS 的队列和带宽管理。使用它来配置 HTB、PCQ、突发行为、队列大小以及用于流量整形的队列类型。

<DocCardList />

## 概述 {#overview}

队列是一组数据包，它们按照预定义的结构方法共同等待由网络设备传输。排队的工作方式几乎与银行或超市采用的方法相同，客户根据到达顺序接受服务。

队列用于：

- 限制特定 IP 地址、子网、协议、端口等的数据速率。
- 限制点对点流量。
- 数据包优先级划分。
- 配置流量突发以加速流量。
- 应用不同的基于时间的限制。
- 在用户之间平均共享可用流量，或根据信道负载共享。

MikroTik RouterOS 中的队列实现基于分层令牌桶（HTB）。HTB 允许创建分层队列结构，并确定队列之间的关系。这些分层结构可以附加在两个不同位置。[数据包流示意图](../packet-flow-in-routeros.md) 说明了 *input* 和 *postrouting* 链。

在 RouterOS 中配置队列有两种不同方式：

- `/queue/simple` 菜单 - 旨在简化简单的日常队列任务（例如单个客户端上传/下载限制、p2p 流量限制等）的配置。
- `/queue/tree` 菜单 - 用于实现高级队列任务（例如全局优先级策略和 `/user/group` 限制）。需要来自 [`/ip/firewall/mangle`](../firewall/mangle.md) 功能的已标记数据包流。

RouterOS 提供了在 8 个级别配置队列的可能性 - 第一级是来自 `/queue/interface` 菜单的接口队列，其他 7 级是可在简单队列和/或队列树中创建的低级别队列。

### 速率限制原则 {#rate-limitation-principles}

速率限制用于控制网络接口上发送或接收的流量速率。速率小于或等于指定速率的流量会被发送，而超过该速率的流量会被丢弃或延迟。

速率限制可以通过两种方式执行：

1. 丢弃所有超过速率限制的数据包 – ***速率限制（丢弃器或整形器）*** *（当 queue-size=0 时为 100% 速率限制器）*。
2. 将超过特定速率限制的数据包在队列中延迟，并在可能时传输它们 – ***速率均衡（调度器）***（当 *queue-size=unlimited* 时为 100% 速率均衡）。

下图说明了*速率限制*和速率*均衡*之间的区别：

![](/img/d27732f6214ea1c4.webp)

如你所见，在第一种情况下，所有流量都超过特定速率并被丢弃。在另一种情况下，流量超过特定速率，在队列中被延迟，并在可能时稍后传输，但请注意，只有在队列未满时数据包才能被延迟。如果队列缓冲区中没有更多空间，数据包将被丢弃。

对于每个队列，我们可以定义两个速率限制：

- **CIR**（承诺信息速率）–（RouterOS 中的 **limit-at**）在最坏情况下，该流将获得此数量的流量速率，而不管其他流量流如何。在任何给定时间，带宽都不应低于此承诺速率。
- **MIR**（最大信息速率）–（RouterOS 中的 **max-limit**）在最佳情况下，如果带宽有任何空闲部分，该流可获得的最大可用数据速率。

## 简单队列 {#simple-queue}

**子菜单：** `/queue/simple`

简单队列是为特定目标限制流量的一种简单方法。此外，你可以使用简单队列来构建高级 QoS 应用。它们具有有用的集成功能：

- 点对点流量排队。
- 在选定的时间间隔应用队列规则。
- 优先级划分。
- 使用来自 *`/ip/firewall/mangle`* 的多个数据包标记。
- 双向流量的流量整形（调度）（对上传 + 下载总量使用一个限制）。

:::warning
简单队列具有严格的顺序 - 每个数据包都必须经过每个队列，直到到达某个条件符合数据包参数的队列，或者直到到达队列列表末尾。例如，在有 1000 个队列的情况下，发往最后一个队列的数据包需要经过 999 个队列才能到达目的地。

:::

:::warning
简单队列目标基于 src 和 dst 地址匹配数据包。如果 src 地址匹配目标，则为上传；如果 dst 匹配目标，则为下载。但是，如果你的连接中 src 和 dst 都匹配目标，那么此类数据包将始终被计为下载，因为两者都匹配 dst（对于两个方向上的每个单独数据包），而在 RouterOS 中，这只是与目标比较的第一项。简单队列应配置为流量只能匹配 src 或 dst 地址，而不能同时匹配两者。

:::

#### 流标识符 {#flow-identifiers}

- **target**（多选：IP 地址/掩码或接口）：**Target** 应从目标的角度来看待。如果你想限制用户的上传能力，请设置 "target upload"。

这两个属性中的每一个都可用于确定哪个方向是目标上传，哪个是下载。请小心为同一个队列配置这两个选项 - 如果它们指向相反方向，队列将无法工作。如果既未指定 **target** 的值，也未指定 **interface** 的值，队列将无法区分上传和下载，并且会对所有流量限制两次。

#### 其他属性 {#other-properties}

- **name**（文本）：唯一队列标识符，可用作其他队列的 **parent** 选项值。
- **direction**（*both* | *upload* | *download*）：指定要限制的方向：
  - *both* - 限制下载和上传流量。
  - *upload* - 仅限制发往目标的流量。
  - *download* - 仅限制来自目标的流量。
- **time**（*TIME-TIME,sun,mon,tue,wed,thu,fri,sat* - *TIME* 为本地时间，所有星期名称都是可选的；默认：未设置）：允许你指定特定队列处于活动状态的时间。路由器必须具有正确的时间设置。
- **dst-address**（IP 地址/掩码）：允许你仅选择特定流（从目标地址到该目标地址）进行限制，说明什么是 target、什么是 dst、什么是上传、什么不是。
- **packet-marks**（以逗号分隔的数据包标记名称列表）：允许使用来自 `/ip/firewall/mangle` 的已标记数据包。请查看 RouterOS [数据包流示意图](../packet-flow-in-routeros.md)。必须在简单队列之前（在 *global-in* HTB 队列之前）标记数据包，否则目标的下载限制将无法工作。*global-in* 之前唯一的 mangle 链是 *prerouting*。

#### HTB 属性 {#htb-properties}

- **parent**（父简单队列的名称，或 *none*）：将此队列指定为所选目标的子队列。目标队列可以是 HTB 队列或任何其他先前创建的简单队列。为了让流量到达子队列，父队列必须捕获所有必要的流量。
- **priority**（1..8）：将一个子队列优先于另一个子队列。在父队列上不起作用（如果队列至少有一个子队列）。1 是最高优先级，8 是最低优先级。具有较高优先级的子队列将有机会比具有较低优先级的子队列先达到其 **max-limit**。优先级与突发无关。
- **queue**（*SOMETHING/SOMETHING*）：选择上传/下载队列的类型。队列类型可以在 [`/queue/type`](#queue-types) 中创建。
- **limit-at**（*NUMBER/NUMBER*）：为目标保证的正常上传/下载数据速率。
- **max-limit**（*NUMBER/NUMBER*）：允许目标达到的最大上传/下载数据速率。
- **burst-limit**（*NUMBER/NUMBER*）：突发活动时可达到的最大上传/下载数据速率。
- **burst-time**（*TIME/TIME*）：计算平均上传/下载数据速率的时间段，以秒为单位。（这不是实际突发的时间）。
- **burst-threshold**（*NUMBER/NUMBER*）：当平均数据速率低于此值时 - 允许突发；一旦平均数据速率达到此值 - 拒绝突发。（基本上这是突发开/关开关）。为了获得最佳突发行为，此值应高于 **limit-at** 值并低于 **max-limit** 值。

以及 *global-total* HTB 队列的对应选项：

- **total-queue**（*SOMETHING/SOMETHING*）：对应于 **queue**。
- **total-limit-at**（*NUMBER/NUMBER*）：对应于 **limit-at**。
- **total-max-limit**（*NUMBER/NUMBER*）：对应于 **max-limit**。
- **total-burst-limit**（*NUMBER/NUMBER*）：对应于 **burst-limit**。
- **total-burst-time**（*TIME/TIME*）：对应于 **burst-time**。
- **total-burst-threshold**（*NUMBER/NUMBER*）：对应于 **burst-threshold**。

良好实践建议：

子队列的 limit-at 值之和必须小于或等于父队列的 max-limit。每个子队列的 max-limit 必须小于父队列的 max-limit。这样，你将把一些流量留给其他子队列，它们将能够获得流量，而无需与其他子队列争夺。

#### 统计信息 {#statistics}

- **rate**（只读/只读）：队列平均通过数据速率，单位为字节每秒。
- **packet-rate**（只读/只读）：队列平均通过数据速率，单位为数据包每秒。
- **bytes**（只读/只读）：此队列处理的字节数。
- **packets**（只读/只读）：此队列处理的数据包数。
- **queued-bytes**（只读/只读）：队列中等待的字节数。
- **queued-packets**（只读/只读）：队列中等待的数据包数。
- **dropped**（只读/只读）：丢弃的数据包数。
- **borrows**（只读/只读）：超过其 "limit-at" 值通过队列的数据包（并且未被使用并从其他队列取走）。
- **lends**（只读/只读）：低于其 "limit-at" 值通过队列的数据包，或者如果队列是父队列 - 所有子队列借用数据包的总和。
- **pcq-queues**（只读/只读）：如果队列类型为 PCQ，则为 PCQ 子流的数量。

以及 *global-total* HTB 队列的对应选项：

- **total-rate**（只读）：对应于 *rate*。
- **total-packet-rate**（只读）：对应于 *packet-rate*。
- **total-bytes**（只读）：对应于 *bytes*。
- **total-packets**（只读）：对应于 *packets*。
- **total-queued-bytes**（只读）：对应于 *queued-bytes*。
- **total-queued-packets**（只读）：对应于 *queued-packets*。
- **total-dropped**（只读）：对应于 *dropped*。
- **total-lends**（只读）：对应于 *lends*。
- **total-borrows**（只读）：对应于 *borrows*。
- **total-pcq-queues**（只读）：对应于 *pcq-queues*。

### 配置示例 {#configuration-example}

在以下示例中，我们有一台 SOHO 设备，连接了两台设备：PC 和服务器。

![](/img/df7f01e5e41c5241.jpg)

在此情况下，我们有一条来自 ISP 的 15 Mbps 连接可用。我们希望确保服务器收到足够的流量，因此我们将配置一个带有 *limit-at* 参数的简单队列，以保证服务器获得 5Mbps：

```ros
/queue/simple
add limit-at=5M/5M max-limit=15M/15M name=queue1 target=192.168.88.251/32
```

就是这样。无论其他流量流如何，服务器都将获得 5 Mbps 的流量速率。如果你使用的是默认配置，请确保针对此特定流量禁用了 FastTrack 规则，否则它将绕过简单队列，简单队列将无法工作。

## 队列树 {#queue-tree}

**子菜单：** `/queue/tree`

队列树仅在其中一个 HTB 中创建单向队列。它也是在单独接口上添加队列的唯一方法。这样可以简化 mangle 配置 - 你不需要为下载和上传分别设置标记 - 只有上传流量会到达 Public 接口，只有下载流量会到达 Private 接口。与简单队列的主要区别在于，队列树不是有序的 - 所有流量一起通过它。

### 配置示例 {#configuration-example-1}

在以下示例中，我们将标记来自预配置的 *in-interface-list=LAN* 的所有数据包，并基于这些数据包标记使用队列树限制流量。

让我们创建防火墙地址列表：

```ros
[admin@MikroTik] > /ip/firewall/address-list
add address=www.youtube.com list=Youtube
[admin@MikroTik] > ip firewall address-list print
Flags: X - disabled, D - dynamic 
 #   LIST                                                       ADDRESS                                                                        CREATION-TIME        TIMEOUT             
 0   Youtube                                                    www.youtube.com                                                                2019-10-17 14:47:11
 1 D ;;; www.youtube.com
     Youtube                                                    216.58.211.14                                                                  2019-10-17 14:47:11
 2 D ;;; www.youtube.com
     Youtube                                                    216.58.207.238                                                                 2019-10-17 14:47:11
 3 D ;;; www.youtube.com
     Youtube                                                    216.58.207.206                                                                 2019-10-17 14:47:11
 4 D ;;; www.youtube.com
     Youtube                                                    172.217.21.174                                                                 2019-10-17 14:47:11
 5 D ;;; www.youtube.com
     Youtube                                                    216.58.211.142                                                                 2019-10-17 14:47:11
 6 D ;;; www.youtube.com
     Youtube                                                    172.217.22.174                                                                 2019-10-17 14:47:21
 7 D ;;; www.youtube.com
     Youtube                                                    172.217.21.142                                                                 2019-10-17 14:52:21

```

使用防火墙 mangle 功能标记数据包：

```ros
[admin@MikroTik] > /ip/firewall/mangle
add action=mark-packet chain=forward dst-address-list=Youtube in-interface-list=LAN new-packet-mark=pmark-Youtube passthrough=yes
```

基于先前标记的数据包配置队列树：

```ros
[admin@MikroTik] /queue/tree
add max-limit=5M name=Limiting-Youtube packet-mark=pmark-Youtube parent=global
```

检查队列树统计信息以确保流量已匹配：

```ros
[admin@MikroTik] > queue tree print stats
Flags: X - disabled, I - invalid 
 0   name="Limiting-Youtube" parent=global packet-mark=pmark-Youtube rate=0 packet-rate=0 queued-bytes=0 queued-packets=0 bytes=67887 packets=355 dropped=0 
```

## 队列类型 {#queue-types}

**子菜单：** `/queue/type`

此子菜单列出默认创建的队列类型，并允许添加新的用户特定类型。

默认情况下，RouterOS 创建以下预定义队列类型：

```ros
[admin@MikroTik] > /queue/type/print
Flags: * - default 
 0 * name="default" kind=pfifo pfifo-limit=50 

 1 * name="ethernet-default" kind=pfifo pfifo-limit=50 

 2 * name="wireless-default" kind=sfq sfq-perturb=5 sfq-allot=1514 

 3 * name="synchronous-default" kind=red red-limit=60 red-min-threshold=10 red-max-threshold=50 red-burst=20 red-avg-packet=1000 

 4 * name="hotspot-default" kind=sfq sfq-perturb=5 sfq-allot=1514 

 5 * name="pcq-upload-default" kind=pcq pcq-rate=0 pcq-limit=50KiB pcq-classifier=src-address pcq-total-limit=2000KiB pcq-burst-rate=0 pcq-burst-threshold=0 pcq-burst-time=10s pcq-src-address-mask=32 
     pcq-dst-address-mask=32 pcq-src-address6-mask=128 pcq-dst-address6-mask=128 

 6 * name="pcq-download-default" kind=pcq pcq-rate=0 pcq-limit=50KiB pcq-classifier=dst-address pcq-total-limit=2000KiB pcq-burst-rate=0 pcq-burst-threshold=0 pcq-burst-time=10s pcq-src-address-mask=32 
     pcq-dst-address-mask=32 pcq-src-address6-mask=128 pcq-dst-address6-mask=128 

 7 * name="only-hardware-queue" kind=none 

 8 * name="multi-queue-ethernet-default" kind=mq-pfifo mq-pfifo-limit=50 

 9 * name="default-small" kind=pfifo pfifo-limit=10
```

所有 MikroTik 产品都有默认队列类型 "**only-hardware-queue"**，其 "kind=none"。 "only-hardware-queue" 使接口仅保留一个硬件发送描述符环形缓冲区，该缓冲区本身充当队列。通常，发送描述符环形缓冲区中至少可以排队 100 个数据包用于发送。发送描述符环形缓冲区的大小以及其中可排队的数据包数量因不同类型的以太网 MAC 而异。没有软件队列在 SMP 系统上尤其有益，因为它消除了从不同 CPU/核心同步访问它的需求，而这是资源密集型的。能够设置 "only-hardware-queue" 需要以太网驱动程序的支持，因此仅适用于某些以太网接口，这些接口主要见于 RouterBOARD。

**"multi-queue-ethernet-default"** 在具有支持多个发送队列的以太网接口并且具有 Linux 驱动程序对多个发送队列支持的 SMP 系统上可能是有益的。通过为每个硬件队列设置一个软件队列，花在同步访问它们上的时间可能会更少。

:::warning
仅当没有以特定接口作为父级的 `/queue/tree` 条目时，only-hardware-queue 和 multi-queue-ethernet-default 带来的改进才会存在。

:::

### 种类 {#kinds}

队列种类是数据包处理算法。种类描述接下来将按顺序传输哪一个数据包。RouterOS 支持以下排队种类：

- FIFO（BFIFO、PFIFO、MQ PFIFO）
- RED
- SFQ
- PCQ

#### FIFO {#fifo}

这些种类基于 FIFO 算法（先进先出）。**PFIFO** 和 **BFIFO** 的区别在于一个以数据包为单位衡量，另一个以字节为单位衡量。这些队列使用 **pfifo-limit** 和 **bfifo-limit** 参数。

每个无法入队的数据包（如果队列已满）都会被丢弃。较大的队列大小会增加延迟，但能更好地利用信道。

**MQ-PFIFO** 是支持多个发送队列的 *pfifo*。此队列在具有支持多个发送队列的以太网接口并且具有 Linux 驱动程序对多个发送队列支持（主要是在 x86 平台上）的 SMP 系统上是有益的。此种类使用 **mq-pfifo-limit** 参数。

#### RED {#red}

随机早期丢弃是一种排队机制，它通过控制平均队列大小来尝试避免网络拥塞。平均队列大小与两个阈值进行比较：最小阈值（min<sub>th</sub>）和最大阈值（max<sub>th</sub>）。如果平均队列大小（avg<sub>q</sub>）小于最小阈值，则不丢弃任何数据包。当平均队列大小大于最大阈值时，所有传入数据包都会被丢弃。但如果平均队列大小介于最小阈值和最大阈值之间，数据包将以概率 P<sub>d</sub> 被随机丢弃，其中概率恰好是平均队列大小的函数：P<sub>d</sub> = P<sub>max</sub>(avg<sub>q</sub> – min<sub>th</sub>)/ (max<sub>th</sub> - min<sub>th</sub>)。如果平均队列增长，丢弃传入数据包的概率也会增长。P<sub>max</sub> 是一个比率，可以调整数据包丢弃概率的突变程度（最简单的情况下 P<sub>max</sub> 可以等于 1）。8.2 图显示了 RED 算法中的数据包丢弃概率。

![](/img/9063cae055390196.webp)

#### SFQ {#sfq}

随机公平排队（SFQ）通过哈希和轮询算法来保证。SFQ 之所以称为 "Stochastic"，是因为它实际上并不为每个流分配队列；它有一个算法，使用哈希算法将流量分配到有限数量的队列（1024）上。

流量流可以通过 4 个选项（*src-address、dst-address、src-port* 和 *dst-port*）唯一标识，因此 SFQ 哈希算法使用这些参数将数据包分类到 1024 个可能子流之一。然后，轮询算法将开始向所有子流分配可用带宽，每轮给予 **sfq-allot** 字节的流量。整个 SFQ 队列可以包含 128 个数据包，并且有 1024 个子流可用。8.3 图显示了 SFQ 操作：

![](/img/d7a57b8def263041.webp)

#### PCQ {#pcq}

PCQ 算法非常简单 - 首先，它使用选定的分类器将一个子流与另一个子流区分开，然后对每个子流应用单独的 FIFO 队列大小和限制，然后将所有子流组合在一起，并应用全局队列大小和限制。

PCQ 参数：

- **pcq-classifier**（dst-address | dst-port | src-address | src-port；默认：""）：子流标识符的选择。
- **pcq-rate**（数字）：每个子流的最大可用数据速率。
- **pcq-limit**（数字）：单个子流的队列大小（以 KiB 为单位）。
- **pcq-total-limit**（数字）：所有子流中排队数据的最大量（以 KiB 为单位）。

 可以通过 **pcq-rate** 选项为子流分配速度限制。如果 "pcq-rate=0"，子流将平均分配可用流量。

![](/img/30756a75a5193bf3.webp)

例如，与其有 100 个下载限制为 1000kbps 的队列，我们可以有一个包含 100 个子流的 PCQ 队列。

PCQ 具有与简单队列和队列树相同的突发实现：

- **pcq-burst-rate**（数字）：当允许子流突发时可达到的最大上传/下载数据速率。
- **pcq-burst-threshold**（数字）：这是突发开/关开关的值。
- **pcq-burst-time**（时间）：计算平均数据速率的时间段（以秒为单位）。（这不是实际突发的时间）。

PCQ 还允许使用不同大小的 IPv4 和 IPv6 网络作为子流标识符。以前它被锁定为单个 IP 地址。这样做主要是为了 IPv6，因为从 ISP 的角度来看，客户将由 /64 网络表示，但客户网络中的设备将是 /128。PCQ 可用于这两种场景以及更多场景。PCQ 参数：

- **pcq-dst-address-mask**（数字）：将用作 dst-address 子流标识符的 IPv4 网络大小。
- **pcq-src-address-mask**（数字）：将用作 src-address 子流标识符的 IPv4 网络大小。
- **pcq-dst-address6-mask**（数字）：将用作 dst-address 子流标识符的 IPv6 网络大小。
- **pcq-src-address6-mask**（数字）：将用作 src-address 子流标识符的 IPv6 网络大小。

:::info
以下队列种类 CoDel、FQ-Codel 和 CAKE 自 RouterOS 版本 7.1beta3 起可用。

:::

#### CoDel {#codel}

CoDel（受控延迟主动队列管理）算法使用本地最小队列作为持久队列的度量；类似地，它使用最小延迟参数作为常驻队列延迟的度量。队列大小使用数据包在队列中的驻留时间计算。

**属性**

| **属性** | **描述** |
| :-- | :-- |
| **codel-ce-threshold** (*默认*: ) | 使用 ECN 标记超过配置阈值的数据包。 |
| **codel-ecn** (*默认*: **no**) | 该选项用于标记数据包而不是丢弃它们。 |
| **codel-interval** (*默认*: **100ms**) | 间隔应设置为通过瓶颈的最坏情况 RTT 的数量级，以便端点有足够的时间做出反应。 |
| **codel-limit** (*默认*: **1000**) | 队列限制。达到限制时，传入数据包会被丢弃。 |
| **codel-target** (*默认*: **5ms**) | 表示可接受的最小持久队列延迟。 |

#### FQ-Codel {#fq-codel}

CoDel - 带受控延迟（CoDel）的公平排队（FQ）使用随机确定的模型将传入数据包分类到不同流中，并用于为使用该队列的所有流提供公平的带宽份额。每个流都使用 CoDel 排队规则进行管理，该规则内部使用 FIFO 算法。

**属性**

| **属性** | **描述** |
| :-- | :-- |
| **fq-codel-ce-threshold** (*默认*: ) | 使用 ECN 标记超过配置阈值的数据包。 |
| **fq-codel-ecn** (*默认*: **yes**) | 该选项用于标记数据包而不是丢弃它们。 |
| **fq-codel-flows** (默认: **1024**) | 传入数据包被分类到的流数量。 |
| **fq-codel-interval** (*默认*: **100ms**) | 间隔应设置为通过瓶颈的最坏情况 RTT 的数量级，以便端点有足够的时间做出反应。 |
| **fq-codel-limit** (*默认*: **10240**) | 队列限制。达到限制时，传入数据包会被丢弃。 |
| **fq-codel-memlimit** (默认: **32.0MiB**) | 可在此 FQ-CoDel 实例中排队的总字节数。将从 *fq-codel-limit* 参数强制执行。 |
| **fq-codel-quantum** (*默认*: **1514**) | 公平排队算法中用作“赤字”的字节数。默认值（1514 字节）对应于以太网 MTU 加上 14 字节的硬件头长度。 |
| **fq-codel-target** (*默认*: **5ms**) | 表示可接受的最小持久队列延迟。 |

#### CAKE {#cake}

CAKE（Common Applications Kept Enhanced）结合了主动队列管理、流与主机公平性、可选的整形器、DiffServ 处理以及链路层开销补偿。

有关配置指导、推荐默认值、方向与队列放置位置以及各项功能的说明，请参阅 [CAKE](./queue-types/cake.md)。有关 RouterOS 属性及可接受值的完整源生成列表，请参阅 [`/queue/type` CLI 参考](../../cli-reference/queue/type.md)。

## 接口队列 {#interface-queue}

**子菜单：** `/queue/interface`

在通过接口发送数据之前，数据会先被队列处理。接口队列是发送（出方向）队列；它不处理该接口接收到的数据包。

对于转发的客户端流量，面向 WAN 的接口队列处理上传，面向 LAN 的接口队列处理下载。每个方向使用单独的队列实例。如果流量可以通过多个 LAN 接口离开，请配置每个所需的发送路径，或在共同点上使用可匹配该流量的简单队列或队列树。

此子菜单列出 RouterOS 中所有可用的接口，并允许更改特定接口的队列类型。该列表是自动生成的。

```ros
[admin@MikroTik] > /queue/interface/print
Columns: INTERFACE, QUEUE, ACTIVE-QUEUE
# INTERFACE QUEUE ACTIVE-QUEUE
0 ether1 only-hardware-queue only-hardware-queue
1 ether2 only-hardware-queue only-hardware-queue
2 ether3 only-hardware-queue only-hardware-queue
3 ether4 only-hardware-queue only-hardware-queue
4 ether5 only-hardware-queue only-hardware-queue
5 ether6 only-hardware-queue only-hardware-queue
6 ether7 only-hardware-queue only-hardware-queue
7 ether8 only-hardware-queue only-hardware-queue
8 ether9 only-hardware-queue only-hardware-queue
9 ether10 only-hardware-queue only-hardware-queue
10 sfp-sfpplus1 only-hardware-queue only-hardware-queue
11 wlan1 wireless-default wireless-default
12 wlan2 wireless-default wireless-default 
```

## GUI 中的队列负载可视化 {#queue-load-visualization-in-gui}

在 Winbox 和 Webfig 中，绿色、黄色或红色图标会根据 max-limit 可视化每个简单队列和队列树的使用情况。

|  |  |
| :-- | :-- |
| ![](/img/1f52670cd4d93071.png)  | 已使用 max-limit 的 0% - 50% |
| ![](/img/f8e7c3da41d98ac0.png)  | 已使用 max-limit 的 >50% - 75% |
| ![](/img/30756a75a5193bf3.png)  | 已使用 max-limit 的 >75% - 100% |
