---
title: "HTB (Hierarchical Token Bucket)"
description: "HTB（Hierarchical Token Bucket）是 RouterOS 中用于速率限制和突发处理的队列规则，使用令牌桶算法通过可配置的容量和限制来管理数据速率。"
tags:
  - 'htb'
  - 'queues'
  - 'bandwidth-control'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/queues/htb-hierarchical-token-bucket
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "firewall-and-quality-of-service/queues"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

HTB（Hierarchical Token Bucket）是一种有类别队列规则，适用于速率限制和突发处理。本文将仅关注 RouterOS 中的这些 HTB 方面，因为我们使用修改版来提供 Simple Queue 和 Queue Tree 等功能。

## Token Bucket 算法（图中的 Red 部分） {#token-bucket-algorithm-red-part-of-the-diagram}

Token Bucket 算法基于一个桶的类比，其中令牌以字节表示，并按特定速率添加到桶中。桶本身具有指定的容量。

如果桶填满至容量，新到达的令牌将被丢弃。

**桶容量 = bucket-size \* max-limit**

- **bucket size**（0..10，默认：0.1）

在允许任何数据包通过队列之前，会检查队列桶，以确定此时它是否已包含足够的令牌。

如果是，则移除相应数量的令牌（“兑换”），并允许数据包通过队列。

如果不是，则数据包会停留在数据包等待队列的开头，直到有足够数量的令牌可用。

在多级队列结构中，子队列使用的令牌也会“计入”其父队列。换句话说，子队列会从父队列“借用”令牌。

### 数据包队列（图中的蓝色部分） {#packet-queue-blue-part-of-the-diagram}

该数据包队列的大小、顺序、将数据包添加到该队列的方式以及丢弃数据包的时机由以下因素决定：

- **queue-type** - [队列](/docs/firewall-and-quality-of-service/queues/htb-hierarchical-token-bucket)
- **queue-size** - [队列大小](/docs/firewall-and-quality-of-service/queues/queue-size)

### 令牌速率选择（图中的黑色部分） {#token-rate-selection-black-part-of-the-diagram}

任意时刻的最大令牌速率等于这些值中的最高活动值：

- **limit-at**（*NUMBER/NUMBER*）：目标保证的上行/下行数据速率。
- **max-limit**（*NUMBER/NUMBER*）：目标允许的最大上行/下行数据速率。
- **burst-limit**（*NUMBER/NUMBER*）：当“burst”处于活动状态时，目标允许的最大上行/下行数据速率。

**burst-limit** 仅在“burst”处于允许状态时生效，详情请参阅：[Queue Burst](/docs/firewall-and-quality-of-service/queues/queue-burst)

如果 **limit-at** 是最高值，则需要发放额外的令牌，以补偿所有未从其父队列借用的缺失令牌。

### 示意图 {#the-diagram}

![](/img/9a50fc5a9449fae0.webp)

### 存储桶大小的实际作用 {#bucket-size-in-action}

假设有一个简单配置，其中进出某个 IP 地址的所有流量都使用 packet-mark 进行标记：

```ros
/ip/firewall/mangle
add chain=forward action=mark-connection connection-mark=no-mark src-address=192.168.88.101 new-connection-mark=pc1_conn
add chain=forward action=mark-connection connection-mark=no-mark dst-address=192.168.88.101 new-connection-mark=pc1_conn
add chain=forward action=mark-packet connection-mark=pc1_conn new-packet-mark=pc1_traffic
```

#### 默认队列存储桶 {#default-queue-bucket}

```ros
/queue/tree
add name=download parent=Local packet-mark=pc1_traffic max-limit=10M
add name=upload parent=Public packet-mark=pc1_traffic max-limit=10M
```

在本例中，bucket-size=0.1，因此 bucket-capacity= 0.1 x 10M = 1M。

如果桶已满（即客户端一段时间未使用队列的全部容量），接下来的 1Mb 流量可以不受限制地通过队列。

#### 大队列桶 {#large-queue-bucket}

```ros
/queue/tree
add name=download parent=Local packet-mark=pc1_traffic max-limit=10M bucket-size=10
add name=upload parent=Public packet-mark=pc1_traffic max-limit=10M bucket-size=10
```

我们尝试将同样的逻辑应用于桶大小处于最大值的情况：

在这种情况下，bucket-size=10，因此 bucket-capacity= 10 x 10M = 100M。

如果桶已满（即客户端一段时间未使用队列的全部容量），接下来的 100Mb 流量可以不受限制地通过队列。

因此，可以实现：

- 10s 内 20Mbps 的传输速度。
- 2s 内 60Mbps 的传输突发。
- 约 100ms 内 1Gbps 的传输突发。

因此可以看出，桶允许通过队列的流量具有某种“突发性”。其行为类似于普通突发功能，但没有突发上限。如果在队列结构中使用桶大小，可以避免这一缺陷：

#### 子队列桶大、父队列桶小 {#large-child-queue-bucket-small-parent-queue-bucket}

```ros
/queue/tree
add name=download_parent parent=Local max-limit=20M
add name=download parent=download_parent packet-mark=pc1_traffic max-limit=10M bucket-size=10
add name=upload_parent parent=Public max-limit=20M
add name=upload parent=upload_parent packet-mark=pc1_traffic max-limit=10M bucket-size=10
```

在这种情况下：

- 父队列 bucket-size=0.1，bucket-capacity= 0.1 x 20M = 2M
- 子队列 bucket-size=10，bucket-capacity= 10 x 10M = 100M

父队列的令牌会比子队列更快耗尽，由于其子队列始终从父队列借用令牌，整个系统会受限于父队列的令牌速率——在本例中为 max-limit=20M。该速率会持续到子队列令牌耗尽，随后将受限于其 10Mbps 的令牌速率。

通过这种方式，可以在最长 10 秒内实现 20Mbps 的突发。

## 配置 {#configuration}

创建 HTB 必须遵循三个基本步骤：

- **匹配并标记流量** – 对流量进行分类，以供后续使用。它包含一个或多个匹配参数，用于为特定类选择数据包。
- **创建规则（策略）以标记流量** – 将特定流量类放入特定队列，并定义对每个类执行的操作。
- **为特定接口附加策略** – 为所有接口（global-in、global-out 或 global-total）、特定接口或特定父队列追加策略。

HTB 允许创建分层队列结构，并确定队列之间的关系，例如“parent-child”或“child-child”。

一旦队列至少有一个子队列，它就会成为 **inner** 队列。所有没有子队列的队列都是 **leaf** 队列。**leaf** 队列实际消耗流量，**inner** 队列只负责流量分配。所有 **leaf** 队列都被平等对待。

在 RouterOS 中，必须指定 **parent** 选项，才能将一个队列分配为另一个队列的子队列。

### 双重限制 {#dual-limitation}

HTB 中的每个队列都有两个速率限制：

- **CIR**（Committed Information Rate）–（RouterOS 中的 **limit-at**）最坏情况下的速率，无论发生什么情况，流都会获得该流量（假设实际上可以发送这么多数据）。
- **MIR**（Maximal Information Rate）–（RouterOS 中的 **max-limit**）最佳情况下的速率，如果队列的父队列有空闲带宽，流最高可以获得该速率。

换句话说，首先会满足所有队列的 **limit-at**（**CIR**），之后子队列才会尝试从其父队列借用所需的数据速率，以达到其 **max-limit**（**MIR**）。

:::warning
无论何种情况，**CIR** 都会分配给相应的队列（即使父队列的 max-limit 已被超出）。
:::

因此，为确保双限制功能按设计实现最佳使用，建议遵循以下规则：

- 所有子队列的承诺速率之和必须小于或等于父队列可用的流量；

CIR(parent)\* ≥ CIR(child1) +...+ CIR(childN)\* 如果父队列是主父队列，则 CIR(parent)=MIR(parent)

- 任何子队列的最大速率必须小于或等于父队列的最大速率。

MIR（parent）≥ MIR（child1）& MIR（parent）≥ MIR（child2）& ... & MIR（parent）≥ MIR（childN）

# Winbox 中的队列颜色 {#queue-colors-in-winbox}

- 已使用 0% - 50% 的可用流量 - 绿色
- 已使用 50% - 75% 的可用流量 - 黄色
- 已使用 75% - 100% 的可用流量 - 红色

#### Priority

我们已经知道，所有队列的 **limit-at**（**CIR**）无论如何都会得到保证。

Priority 负责将父队列的剩余流量分配给子队列，使其能够达到 **max-limit**

优先级较高的队列将比优先级较低的队列先达到其 **max-limit**。8 是最低优先级，1 是最高优先级。

请注意，priority 仅在以下情况下生效：

- 对于 **leaf** 队列 - **inner** 队列中的 priority 没有意义。
- 指定了 **max-limit**（不为 0）。

### 示例 {#examples}

本节将分析 HTB 的实际运行方式。为此，我们将采用一个 HTB 结构，并通过改变 HTB 需要回收的传入流量大小以及调整部分选项，尽量覆盖所有可能的情况和功能。

#### 结构 {#structure}

我们的 HTB 结构将由 5 个队列组成：

- **Queue01** 内部队列，包含两个子队列 - **Queue02** 和 **Queue03**
- **Queue02** 内部队列，包含两个子队列 - **Queue04** 和 **Queue05**
- **Queue03** 叶子队列
- **Queue04** 叶子队列
- **Queue05** 叶子队列

**Queue03**、**Queue04** 和 **Queue05** 是始终需要 10Mbps 的客户端。出站接口能够处理 10Mbps 的流量。

#### 示例 1：常见情况 {#example-1-usual-case}

![](/img/6471583db1f39245.webp)

- **Queue01** limit-at=0Mbps max-limit=10Mbps
- **Queue02** limit-at=4Mbps max-limit=10Mbps
- **Queue03** limit-at=6Mbps max-limit=10Mbps priority=1
- **Queue04** limit-at=2Mbps max-limit=10Mbps priority=3
- **Queue05** limit-at=2Mbps max-limit=10Mbps priority=5

#### 示例 1 的结果 {#result-of-example-1}

- **Queue03** 将获得 6Mbps。
- **Queue04** 将获得 2Mbps。
- **Queue05** 将获得 2Mbps。
- **说明：** HTB 的构建方式是，在满足所有 **limit-at** 后，主队列不再有可分配的吞吐量。

#### 示例 2：使用 max-limit 的常见情况 {#example-2-usual-case-with-max-limit}

![](/img/bf53f5b2e1d05693.webp)

- **Queue01** limit-at=0Mbps max-limit=10Mbps
- **Queue02** limit-at=4Mbps max-limit=10Mbps
- **Queue03** limit-at=2Mbps max-limit=10Mbps priority=3
- **Queue04** limit-at=2Mbps max-limit=10Mbps priority=1
- **Queue05** limit-at=2Mbps max-limit=10Mbps priority=5

#### 示例 2 的结果 {#result-of-example-2}

- **Queue03** 将获得 2Mbps。
- **Queue04** 将获得 6Mbps。
- **Queue05** 将获得 2Mbps。
- **说明：** 在满足所有 **limit-at** 后，HTB 会将吞吐量分配给优先级最高的队列。

#### 示例 3：内部队列 limit-at {#example-3-inner-queue-limit-at}

![](/img/676b7895208fbed6.webp)

- **Queue01** limit-at=0Mbps max-limit=10Mbps。
- **Queue02** limit-at=8Mbps max-limit=10Mbps。
- **Queue03** limit-at=2Mbps max-limit=10Mbps priority=1。
- **Queue04** limit-at=2Mbps max-limit=10Mbps priority=3。
- **Queue05** limit-at=2Mbps max-limit=10Mbps priority=5。

#### 示例 3 的结果 {#result-of-example-3}

- **Queue03** 将获得 2Mbps。
- **Queue04** 将获得 6Mbps。
- **Queue05** 将获得 2Mbps。
- **说明：** 在满足所有 **limit-at** 后，HTB 会将吞吐量分配给优先级最高的队列。但在本例中，**内部**队列 **Queue02** 指定了 **limit-at**，因此为队列 **Queue04** 和 **Queue05** 保留了 8Mbps 吞吐量。在这两个队列中，**Queue04** 的优先级最高，因此它获得了额外的吞吐量。

#### 示例 4：叶子队列 limit-at {#example-4-leaf-queue-limit-at}

![](/img/8897e6539e058049.webp)

- **Queue01** limit-at=0Mbps max-limit=10Mbps。
- **Queue02** limit-at=4Mbps max-limit=10Mbps。
- **Queue03** limit-at=6Mbps max-limit=10Mbps priority=1。
- **Queue04** limit-at=2Mbps max-limit=10Mbps priority=3。
- **Queue05** limit-at=12Mbps max-limit=15Mbps priority=5。

#### 示例 4 的结果 {#result-of-example-4}

- **Queue03** 将获得约 3Mbps。
- **Queue04** 将获得约 1Mbps。
- **Queue05** 将获得约 6Mbps。
- **说明：** 为满足所有 **limit-at**，HTB 必须分配 20Mbps：向 **Queue03** 分配 6Mbps，向 **Queue04** 分配 2Mbps，向 **Queue05** 分配 12Mbps，但输出接口只能处理 10Mbps。由于输出接口队列通常是 FIFO，吞吐量分配将保持 6:2:12 或 3:1:6 的比例。
