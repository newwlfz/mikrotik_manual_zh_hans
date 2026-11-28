---
title: "队列"
description: "本页介绍 MikroTik RouterOS 的队列和带宽管理，涵盖 HTB、PCQ、突发行为以及用于流量整形的队列类型。文中说明如何使用 `/queue/simple` 和 `/queue/tree` 配置简单队列和高级队列，并详细介绍速率限制原则、CIR/MIR 定义，以及有关队列顺序和目标匹配的警告。"
tags:
  - 'queues'
  - 'htb'
  - 'qos'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/queues
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍 RouterOS 队列和带宽管理。可使用它配置 HTB、PCQ、突发行为、队列大小和队列类型，以进行流量整形。

<DocCardList />

## 概述 {#overview}

队列是网络设备按照预定义的结构方法，统一等待传输的一组数据包。排队的工作方式与银行或超市中使用的方法几乎相同，即根据用户到达顺序进行处理。

队列用于：

- 限制特定 IP 地址、子网、协议、端口等的数据速率。
- 限制对等网络流量。
- 数据包优先级划分。
- 配置流量突发以加速流量。
- 应用不同的基于时间的限制。
- 在用户之间平均共享可用流量，或根据信道负载共享可用流量。

MikroTik RouterOS 中的队列实现基于 Hierarchical Token Bucket（HTB）。HTB 允许创建分层队列结构，并确定队列之间的关系。这些分层结构可以附加在两个不同位置。[Packet Flow diagram](/docs/7.24/firewall-and-quality-of-service/packet-flow-in-routeros) 展示了 *input* 和 *postrouting* 链。

在 RouterOS 中，有两种不同的配置队列的方法：

- `/queue/simple` 菜单 - 用于简化日常简单排队任务的配置（例如单个客户端上传/下载限制、p2p 流量限制等）。
- `/queue/tree` 菜单 - 用于实现高级排队任务（例如全局优先级策略和 `/user/group` 限制）。需要使用来自 [`/ip/firewall/mangle`](/docs/7.24/firewall-and-quality-of-service/firewall/mangle) 功能的已标记数据包流。

RouterOS 支持配置 8 个级别的队列 - 第一级是来自 `/queue/interface` 菜单的接口队列，其余 7 级是可在 Queue Simple 和/或 Queue Tree 中创建的较低级别队列。

### 速率限制原理 {#rate-limitation-principles}

速率限制用于控制网络接口发送或接收的流量速率。速率小于或等于指定速率的流量会被发送，而超过该速率的流量会被丢弃或延迟。

速率限制可以通过两种方式实现：

1. 丢弃所有超过速率限制的数据包 – ***速率限制（dropper 或 shaper）*** *（当 queue-size=0 时为 100% 速率限制）*。
2. 将超过指定速率限制的数据包延迟放入队列，并在可能时发送它们 – ***速率均衡（scheduler）***（当 *queue-size=unlimited* 时为 100% 速率均衡）。

下图说明了 *速率限制* 与速率 *均衡* 之间的区别：

![](/img/d27732f6214ea1c4.webp)

如第一种情况所示，所有超过特定速率的流量都会被丢弃。另一种情况下，超过特定速率的流量会在队列中延迟，并在可能时稍后发送，但请注意，只有在队列未满时，数据包才会被延迟。如果队列缓冲区没有更多空间，数据包会被丢弃。

对于每个队列，可以定义两个速率限制：

- **CIR**（Committed Information Rate）–（RouterOS 中的 **limit-at**）在最坏情况下，无论其他流量如何，该流都会获得此流量速率。在任何给定时间，带宽都不应低于此承诺速率。
- **MIR**（Maximum Information Rate）–（RouterOS 中的 **max-limit**）在最佳情况下，如果带宽有空闲部分，该流可获得的最大可用数据速率。

## 简单队列 {#simple-queue}

**子菜单：** `/queue/simple`

简单队列是限制特定目标流量的直接方式。此外，你可以使用简单队列构建高级 QoS 应用。它们具有实用的集成功能：

- 对等网络流量排队。
- 在指定时间间隔应用队列规则。
- 优先级。
- 使用来自 *`/ip/firewall/mangle`* 的多个数据包标记。
- 双向流量的流量整形（调度）（上传 + 下载总量使用一个限制）。

:::warning
简单队列具有严格顺序——每个数据包都必须经过每个队列，直到到达一个条件与数据包参数匹配的队列，或到达队列列表末尾。例如，在有 1000 个队列的情况下，发往最后一个队列的数据包需要先经过 999 个队列，才能到达目的地。
:::

:::warning
简单队列目标基于 src 和 dst 地址匹配数据包。如果 src 地址与目标匹配，则为上传；如果 dst 与目标匹配，则为下载。但是，如果某个连接的 src 和 dst 都与目标匹配，则此类数据包将始终计为下载，因为二者都匹配 dst（对于两个方向中的每个单独数据包），而在 RouterOS 中，dst 只是首先与目标进行比较的对象。简单队列应以流量仅匹配 src 或 dst 地址、而不同时匹配二者方式配置。
:::

#### 流标识符 {#flow-identifiers}

- **target**（多选：IP 地址/网络掩码或接口）：**Target** 应从目标的角度查看。如果要限制用户的上传能力，请设置“target upload”。

这两个属性均可用于确定哪个方向是目标上传、哪个方向是下载。请谨慎为同一队列配置这两个选项——如果它们指向相反方向，队列将无法工作。如果未指定 **target** 或 **interface** 的值，队列将无法区分上传和下载，并会将所有流量限制两次。

#### 其他属性 {#other-properties}

- **name**（Text）：唯一队列标识符，可用作其他队列的 **parent** 选项值。
- **direction**（*both* | *upload* | *download*）：指定限制哪个方向：
  - *both* - 同时限制下载和上传流量。
  - *upload* - 仅限制发往目标的流量。
  - *download* - 仅限制来自目标的流量。
- **time**（*TIME-TIME,sun,mon,tue,wed,thu,fri,sat* - *TIME* 为本地时间，所有星期名称均为可选；默认：未设置）：用于指定特定队列处于活动状态的时间。路由器必须具有正确的时间设置。
- **dst-address**（IP address/netmask）：用于仅选择特定流（从目标地址到该目标地址）进行限制，并说明什么是目标、什么是 dst、什么是 upload，以及什么不是。
- **packet-marks**（Comma separated list of packet mark names）：允许使用来自 `/ip/firewall/mangle` 的已标记数据包。请查看 RouterOS [数据包流示意图](/docs/7.24/firewall-and-quality-of-service/packet-flow-in-routeros)。必须在简单队列之前（在 *global-in* HTB 队列之前）标记数据包，否则目标的下载限制将不起作用。*global-in* 之前唯一的 mangle 链是 *prerouting*。

#### HTB 属性 {#htb-properties}

- **parent**（Name of parent simple queue, or *none*）：将该队列分配为所选目标的子队列。目标队列可以是 HTB 队列或任何其他先前创建的简单队列。要使流量到达子队列，父队列必须捕获所有必要的流量。
- **priority**（1..8）：相对于另一个子队列，优先处理某个子队列。对父队列不起作用（如果队列至少有一个子队列）。1 为最高优先级，8 为最低优先级。优先级较高的子队列将有机会在优先级较低的子队列之前达到其 **max-limit**。优先级与突发无关。
- **queue**（*SOMETHING/SOMETHING*）：选择上传/下载队列的类型。队列类型可在 [`/queue/type`](#queue-types) 中创建。
- **limit-at**（*NUMBER/NUMBER*）：保证目标的正常上传/下载数据速率。
- **max-limit**（*NUMBER/NUMBER*）：允许目标达到的最大上传/下载数据速率。
- **burst-limit**（*NUMBER/NUMBER*）：突发处于活动状态时可达到的最大上传/下载数据速率。
- **burst-time**（*TIME/TIME*）：计算平均上传/下载数据速率的时间段，单位为秒。（这不是实际突发持续时间）。
- **burst-threshold**（*NUMBER/NUMBER*）：当平均数据速率低于此值时，允许突发；一旦平均数据速率达到此值，则拒绝突发。（基本上这是突发的开/关开关）。为获得最佳突发行为，该值应高于 **limit-at** 值且低于 **max-limit** 值。

以及 *global-total* HTB 队列的对应选项：

- **total-queue**（*SOMETHING/SOMETHING*）：对应于 **queue**。
- **total-limit-at**（*NUMBER/NUMBER*）：对应于 **limit-at**。
- **total-max-limit**（*NUMBER/NUMBER*）：对应于 **max-limit**。
- **total-burst-limit**（*NUMBER/NUMBER*）：对应于 **burst-limit**。
- **total-burst-time**（*TIME/TIME*）：对应于 **burst-time**。
- **total-burst-threshold**（*NUMBER/NUMBER*）：对应于 **burst-threshold**。

良好实践建议：

所有子队列的 limit-at 值之和必须小于或等于父队列的 max-limit。每个子队列的 max-limit 必须小于父队列的 max-limit。这样可以为其他子队列留出一些流量，使它们能够获得流量，而无需与其他子队列争用。

#### 统计 {#statistics}

- **rate** (read-only/read-only) ：队列通过的平均数据速率，单位为字节每秒。
- **packet-rate** (read-only/read-only) ：队列通过的平均数据速率，单位为数据包每秒。
- **bytes** (read-only/read-only) ：该队列处理的字节数。
- **packets** (read-only/read-only) ：该队列处理的数据包数。
- **queued-bytes** (read-only/read-only) ：队列中等待的字节数。
- **queued-packets** (read-only/read-only) ：队列中等待的数据包数。
- **dropped** (read-only/read-only) ：丢弃的数据包数。
- **borrows** (read-only/read-only) ：超过其 "limit-at" 值通过队列的数据包（这些数据包未被使用，并从其他队列借用）。
- **lends** (read-only/read-only) ：低于其 "limit-at" 值通过队列的数据包；如果队列是父队列，则为所有子队列借用的数据包总和。
- **pcq-queues** (read-only/read-only) ：PCQ 子流数量，仅当队列类型为 PCQ 时适用。

以及 *global-total* HTB 队列的对应选项：

- **total-rate** (read-only)：对应于 *rate*。
- **total-packet-rate** (read-only)：对应于 *packet-rate*。
- **total-bytes** (read-only)：对应于 *bytes*。
- **total-packets** (read-only)：对应于 *packets*。
- **total-queued-bytes** (read-only)：对应于 *queued-bytes*。
- **total-queued-packets** (read-only)：对应于 *queued-packets*。
- **total-dropped** (read-only)：对应于 *dropped*。
- **total-lends** (read-only)：对应于 *lends*。
- **total-borrows** (read-only)：对应于 *borrows*。
- **total-pcq-queues** (read-only)：对应于 *pcq-queues*。

### 配置示例 {#configuration-example}

在以下示例中，有一台 SOHO 设备，连接了两台设备：PC 和 Server。

![](/img/df7f01e5e41c5241.jpg)

本例中，ISP 提供 15 Mbps 的可用连接。我们希望确保服务器获得足够的流量，因此将配置一个简单队列，并使用 *limit-at* 参数保证服务器获得 5Mbps：

```ros
/queue/simple
add limit-at=5M/5M max-limit=15M/15M name=queue1 target=192.168.88.251/32
```

到此即可。无论其他流量如何，服务器都将获得 5 Mbps 的流量速率。如果使用默认配置，请确保针对该特定流量禁用 FastTrack 规则，否则流量将绕过 Simple Queues，导致其无法生效。

## 队列树 {#queue-tree}

**子菜单：** `/queue/tree`

队列树只会在其中一个 HTB 中创建单向队列。它也是在单独接口上添加队列的唯一方式。这样可以简化 mangle 配置：无需为下载和上传分别设置标记，因为只有上传流量会进入 Public 接口，只有下载流量会进入 Private 接口。与 Simple Queues 的主要区别在于，Queue tree 不排序，所有流量都会一起通过它。

### 配置示例 {#configuration-example-1}

在以下示例中，将标记来自预先配置的 *in-interface-list=LAN* 的所有数据包，并基于这些数据包标记使用队列树限制流量。

创建防火墙地址列表：

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

基于之前标记的数据包配置队列树：

```ros
[admin@MikroTik] /queue/tree
add max-limit=5M name=Limiting-Youtube packet-mark=pmark-Youtube parent=global
```

检查 Queue tree 统计信息，确认流量已匹配：

```ros
[admin@MikroTik] > queue tree print stats
Flags: X - disabled, I - invalid 
 0   name="Limiting-Youtube" parent=global packet-mark=pmark-Youtube rate=0 packet-rate=0 queued-bytes=0 queued-packets=0 bytes=67887 packets=355 dropped=0 
```

## 队列类型 {#queue-types}

**子菜单：** `/queue/type`

该子菜单列出默认创建的队列类型，并允许添加新的用户自定义队列类型。

默认情况下，RouterOS 会创建以下预定义队列类型：

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

所有 MikroTik 产品都具有默认队列类型“**only-hardware-queue**”，其“kind=none”。“only-hardware-queue”使接口仅保留硬件发送描述符环形缓冲区，该缓冲区本身充当队列。通常，发送描述符环形缓冲区中至少可以排队 100 个数据包。发送描述符环形缓冲区的大小以及其中可排队的数据包数量因以太网 MAC 类型而异。没有软件队列在 SMP 系统上尤其有利，因为它消除了从不同 CPU／核心同步访问软件队列的需求，这种同步会消耗大量资源。能够设置“only-hardware-queue”需要以太网驱动程序支持，因此它仅适用于部分以太网接口，这些接口主要见于 RouterBOARD。

**“multi-queue-ethernet-default”** 在 SMP 系统上可能有益，前提是以太网接口支持多个发送队列，并且 Linux 驱动程序支持多个发送队列。通过为每个硬件队列设置一个软件队列，可以减少同步访问这些队列所花费的时间。

:::warning
只有当没有以特定接口作为 parent 的 `/queue/tree` 条目时，only-hardware-queue 和 multi-queue-ethernet-default 的改进才会生效。
:::

### Kinds

队列类型是数据包处理算法。Kind 描述队列中下一个将发送的数据包。RouterOS 支持以下队列类型：

- FIFO（BFIFO、PFIFO、MQ PFIFO）
- RED
- SFQ
- PCQ

#### FIFO

这些类型基于 FIFO 算法（First-In-First-Out）。**PFIFO** 和 **BFIFO** 的区别在于，一个以数据包为单位计量，另一个以字节为单位计量。这些队列使用 **pfifo-limit** 和 **bfifo-limit** 参数。

无法入队的数据包（队列已满时）会被丢弃。较大的队列大小可以增加延迟，但能更好地利用信道。

**MQ-PFIFO** 是支持多个发送队列的 *pfifo*。该队列适用于 SMP 系统，其中以太网接口支持多个发送队列，并且 Linux 驱动支持多个发送队列（主要在 x86 平台上）。该类型使用 **mq-pfifo-limit** 参数。

#### RED

Random Early Drop 是一种排队机制，尝试通过控制平均队列大小来避免网络拥塞。平均队列大小会与两个阈值进行比较：最小阈值（min<sub>th</sub>）和最大阈值（max<sub>th</sub>）。如果平均队列大小（avg<sub>q</sub>）小于最小阈值，则不会丢弃数据包。当平均队列大小大于最大阈值时，所有进入的数据包都会被丢弃。但如果平均队列大小介于最小阈值和最大阈值之间，则会以概率 P<sub>d</sub> 随机丢弃数据包，其中该概率正是平均队列大小的函数：P<sub>d</sub> = P<sub>max</sub>(avg<sub>q</sub> – min<sub>th</sub>)/ (max<sub>th</sub> - min<sub>th</sub>)。如果平均队列增长，丢弃进入数据包的概率也会增加。P<sub>max</sub> 是一个比率，可调整数据包丢弃概率的突变程度（最简单的情况下，P<sub>max</sub> 可以等于 1）。8.2 图展示了 RED 算法中的数据包丢弃概率。

![](/img/70b89eafe9395bb5.webp)

#### SFQ

Stochastic Fairness Queuing（SFQ）通过哈希和轮询算法实现。SFQ 之所以称为“Stochastic”，是因为它并不真正为每个流分配一个队列；它使用一种算法，通过哈希算法将流量分配到有限数量的队列（1024）中。

流量流可以通过 4 个选项唯一标识（*src-address、dst-address、src-port* 和 *dst-port*），因此 SFQ 哈希算法使用这些参数将数据包分类到 1024 个可能的子流之一。然后轮询算法开始将可用带宽分配给所有子流，每轮分配 **sfq-allot** 字节的流量。整个 SFQ 队列可以包含 128 个数据包，并且有 1024 个子流可用。8.3 图展示了 SFQ 的工作方式：

![](/img/d7a57b8def263041.webp)

#### PCQ

PCQ 算法非常简单：首先，它使用选定的分类器区分不同的子流，然后对每个子流应用单独的 FIFO 队列大小和限制，接着将所有子流组合在一起，并应用全局队列大小和限制。

PCQ 参数：

- **pcq-classifier** (dst-address | dst-port | src-address | src-port; default: "") ：选择子流标识符。
- **pcq-rate** (number)：每个子流的最大可用数据速率。
- **pcq-limit** (number)：单个子流的队列大小（以 KiB 为单位）。
- **pcq-total-limit** (number)：所有子流中排队数据的最大总量（以 KiB 为单位）。

 可以使用 **pcq-rate** 选项为子流分配速度限制。如果为“pcq-rate=0”，子流将平均分配可用流量。

![](/img/9063cae055390196.webp)

例如，可以不使用 100 个限制为 1000kbps 的下载队列，而是使用一个包含 100 个子流的 PCQ 队列。

PCQ 具有与 Simple Queues 和 Queue Tree 相同的突发实现：

- **pcq-burst-rate** (number)：允许子流突发时可以达到的最大上传/下载数据速率。
- **pcq-burst-threshold** (number)：突发开启/关闭开关的值。
- **pcq-burst-time** (time)：计算平均数据速率的时间段（以秒为单位）。（这不是实际突发的时间）。

PCQ 还允许使用不同大小的 IPv4 和 IPv6 网络作为子流标识符。以前它仅限于单个 IP 地址。这主要用于 IPv6，因为从 ISP 的角度来看，客户由 /64 网络表示，而客户网络中的设备为 /128。PCQ 可用于这两种场景以及更多场景。PCQ 参数：

- **pcq-dst-address-mask**（number）：用作 dst-address 子流标识符的 IPv4 网络大小。
- **pcq-src-address-mask**（number）：用作 src-address 子流标识符的 IPv4 网络大小。
- **pcq-dst-address6-mask**（number）：用作 dst-address 子流标识符的 IPv6 网络大小。
- **pcq-src-address6-mask**（number）：用作 src-address 子流标识符的 IPv6 网络大小。

:::info
以下队列类型 CoDel、FQ-Codel 和 CAKE 自 RouterOS 7.1beta3 版本起可用。
:::

#### CoDel

CoDel（Controlled-Delay Active Queue Management）算法使用本地最小队列作为持续队列的度量；类似地，它使用最小延迟参数作为常驻队列延迟的度量。队列大小使用数据包在队列中的驻留时间计算。

**Properties**

| **属性** | **说明** |
| :-- | :-- |
| **codel-ce-threshold**（*default*：） | 使用 ECN 标记超过配置阈值的数据包。 |
| **codel-ecn**（*default*：**no**） | 用于标记数据包而不是丢弃它们的选项。 |
| **codel-interval**（*default*：**100ms**） | 间隔应按瓶颈链路最坏情况下的 RTT 数量级设置，使端点有足够时间作出反应。 |
| **codel-limit**（*default*：**1000**） | 队列限制。达到限制时，将丢弃传入的数据包。 |
| **codel-target**（*default*：**5ms**） | 表示可接受的最小持续队列延迟。 |

#### FQ-Codel

CoDel - Fair Queuing（FQ）with Controlled Delay（CoDel）使用随机确定的模型将传入数据包分类到不同流中，并为使用该队列的所有流提供公平的带宽份额。每个流使用 CoDel 队列规则管理，其内部使用 FIFO 算法。

**Properties**

| **属性** | **说明** |
| :-- | :-- |
| **fq-codel-ce-threshold**（*default*：） | 使用 ECN 标记超过配置阈值的数据包。 |
| **fq-codel-ecn**（*default*：**yes**） | 用于标记数据包而不是丢弃它们的选项。 |
| **fq-codel-flows**（default：**1024**） | 传入数据包被分类到的流数量。 |
| **fq-codel-interval**（*default*：**100ms**） | 间隔应按瓶颈链路最坏情况下的 RTT 数量级设置，使端点有足够时间作出反应。 |
| **fq-codel-limit**（*default*：**10240**） | 队列限制。达到限制时，将丢弃传入的数据包。 |
| **fq-codel-memlimit**（default：**32.0MiB**） | 此 FQ-CoDel 实例中可排队的总字节数。将通过 *fq-codel-limit* 参数强制执行。 |
| **fq-codel-quantum**（*default*：**1514**） | 在公平队列算法中用作“deficit”的字节数。默认值（1514 字节）对应 Ethernet MTU 加上 14 字节的硬件报头长度。 |
| **fq-codel-target**（*default*：**5ms**） | 表示可接受的最小持续队列延迟。 |

#### CAKE

CAKE（Common Applications Kept Enhanced）结合了主动队列管理、流和主机公平性、可选整形器、DiffServ 处理以及链路层开销补偿。

有关配置指导、推荐默认值、方向和队列放置以及各项功能说明，请参阅 [CAKE](/docs/firewall-and-quality-of-service/queues/queue-types/cake)。有关 RouterOS 属性和可接受值的完整源代码生成列表，请参阅 [`/queue/type` CLI 参考](/docs/cli-reference/queue/type)。

## 接口队列 {#interface-queue}

**子菜单：** `/queue/interface`

在通过接口发送数据之前，数据会由队列处理。接口队列是发送（出口）队列；它不处理该接口接收到的数据包。

对于转发的客户端流量，面向 WAN 的接口队列处理上传，面向 LAN 的接口队列处理下载。每个方向使用独立的队列实例。如果流量可以通过多个 LAN 接口离开，请配置每个所需的发送路径，或使用在公共点匹配流量的 Simple Queue 或 Queue Tree。

此子菜单列出 RouterOS 中所有可用接口，并允许更改特定接口的队列类型。该列表会自动生成。

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

在 Winbox 和 Webfig 中，绿色、黄色或红色图标基于 max-limit 可视化每个 Simple 和 Tree 队列的使用情况。

|  |  |
| :-- | :-- |
| ![](/img/1f52670cd4d93071.png)  | 已使用 max-limit 的 0% - 50% |
| ![](/img/f8e7c3da41d98ac0.png)  | 已使用 max-limit 的 >50% - 75% |
| ![](/img/30756a75a5193bf3.png)  | 已使用 max-limit 的 >75% - 100% |
