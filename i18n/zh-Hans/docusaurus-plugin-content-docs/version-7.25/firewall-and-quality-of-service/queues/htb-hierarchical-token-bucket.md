---
sidebar_key: "firewall-and-quality-of-service/queues/htb-hierarchical-token-bucket"
sidebar_position: 1
title: "HTB（分层令牌桶）"
sidebar_label: "HTB"
description: "HTB（Hierarchical Token Bucket）是 RouterOS 中的一种队列规则，用于速率限制和突发处理，使用令牌桶算法通过可配置的容量和限制来管理数据速率。"
tags:
  - 'htb'
  - 'queues'
  - 'bandwidth-control'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/queues/htb-hierarchical-token-bucket
captured_at: '2026-11-04T11:16:25+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 简介 {#introduction}

HTB（Hierarchical Token Bucket）是一种分类排队规则，适用于速率限制和突发处理。本文将专门聚焦 RouterOS 中的这些 HTB 方面，因为我们使用修改版本来实现 Simple Queue 和 Queue Tree 等功能。

## 令牌桶算法（图中红色部分） {#token-bucket-algorithm-red-part-of-the-diagram}

令牌桶算法基于一个类比：令牌以字节表示，并以特定速率添加到桶中。桶本身具有指定容量。

如果桶已满，新到达的令牌会被丢弃。

**桶容量 = bucket-size \* max-limit**

- **bucket size**（0..10，默认值：0.1）

在允许任何数据包通过队列之前，会检查队列桶，以确定它在那一刻是否已经包含足够的令牌。

如果是，则移除（“兑现”）相应数量的令牌，并允许该数据包通过队列。

如果否，则数据包会停留在数据包等待队列的开头，直到有足够数量的令牌可用。

在多级队列结构的情况下，子队列中使用的令牌也会被“计入”其父队列。换句话说——子队列从其父队列“借用”令牌。

### 数据包队列（图中蓝色部分） {#packet-queue-blue-part-of-the-diagram}

此数据包队列的大小、顺序、数据包如何加入此队列以及何时丢弃数据包，由以下各项决定：

- **queue-type** - [队列](./index.md)
- **queue-size** - [队列大小](./queue-size.md)

### 令牌速率选择（图中黑色部分） {#token-rate-selection-black-part-of-the-diagram}

任意给定时间的最大令牌速率等于这些值中的最高活动值：

- **limit-at**（*NUMBER/NUMBER*）：到目标的保证上传/下载数据速率。
- **max-limit**（*NUMBER/NUMBER*）：允许到目标的最大上传/下载数据速率。
- **burst-limit**（*NUMBER/NUMBER*）：当 'burst' 处于活动状态时，允许到目标的最大上传/下载数据速率。

**burst-limit** 仅在 'burst' 处于允许状态时生效——更多信息见：[队列突发](./queue-burst.md)

当 **limit-at** 为最高值时，需要发放额外令牌，以补偿所有未从其父队列借用的缺失令牌。

### 示意图 {#the-diagram}

![](/img/9a50fc5a9449fae0.webp)

### Bucket Size 实际应用 {#bucket-size-in-action}

让我们进行一个简单设置：发往和来自一个 IP 地址的所有流量都用 packet-mark 标记：

```ros
/ip/firewall/mangle
add chain=forward action=mark-connection connection-mark=no-mark src-address=192.168.88.101 new-connection-mark=pc1_conn
add chain=forward action=mark-connection connection-mark=no-mark dst-address=192.168.88.101 new-connection-mark=pc1_conn
add chain=forward action=mark-packet connection-mark=pc1_conn new-packet-mark=pc1_traffic
```

#### 默认队列桶 {#default-queue-bucket}

```ros
/queue/tree
add name=download parent=Local packet-mark=pc1_traffic max-limit=10M
add name=upload parent=Public packet-mark=pc1_traffic max-limit=10M
```

在这种情况下，bucket-size=0.1，因此 bucket-capacity= 0.1 x 10M = 1M。

如果桶已满（也就是说，客户端有一段时间没有使用队列的全部容量），接下来的 1Mb 流量就可以不受限制地通过队列。

#### 大队列桶 {#large-queue-bucket}

```ros
/queue/tree
add name=download parent=Local packet-mark=pc1_traffic max-limit=10M bucket-size=10
add name=upload parent=Public packet-mark=pc1_traffic max-limit=10M bucket-size=10
```

让我们尝试将同样的逻辑应用于 bucket size 处于最大值的情况：

在这种情况下，bucket-size=10，因此 bucket-capacity= 10 x 10M = 100M。

如果桶已满（也就是说，客户端有一段时间没有使用队列的全部容量），接下来的 100Mb 流量就可以不受限制地通过队列。

因此你可以获得：

- 10 秒的 20Mbps 传输速度。
- 2 秒的 60Mbps 传输突发。
- 约 100ms 的 1Gbps 传输突发。

因此可以看到，桶允许通过队列的流量具有一定类型的“突发性”。该行为类似于普通 burst 功能，但没有突发的上限。如果在队列结构中利用 bucket size，就可以避免这个缺陷：

#### 大子队列桶，小父队列桶 {#large-child-queue-bucket-small-parent-queue-bucket}

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

父队列会比子队列更快耗尽令牌；由于子队列始终从父队列借用令牌，整个系统将受限于父队列的令牌速率——在本例中为 max-limit=20M。该速率将一直维持，直到子队列耗尽令牌，然后受限于其 10Mbps 的令牌速率。

通过这种方式，我们可以获得最高持续 10 秒的 20Mbps 突发。

## 配置 {#configuration}

创建 HTB 需要遵循三个基本步骤：

- **匹配并标记流量**——对流进行分类以便后续使用。它由一个或多个匹配参数组成，用于为特定类别选择数据包。
- **创建用于标记流量的规则（策略）**——将特定流量类别放入特定队列，并定义对每个类别采取的操作。
- **为特定接口附加策略**——为所有接口（global-in、global-out 或 global-total）、特定接口或特定父队列追加策略。

HTB 允许创建分层队列结构，并确定队列之间的关系，例如“父-子”或“子-子”。

一旦队列至少有一个子队列，它就会成为**内部**队列。所有没有子队列的队列都是**叶子**队列。**叶子**队列实际消耗流量，**内部**队列只负责流量分配。所有**叶子**队列都按同等基础处理。

在 RouterOS 中，必须指定 **parent** 选项，才能将一个队列作为子队列分配给另一个队列。

### 双重限制 {#dual-limitation}

HTB 中的每个队列都有两个速率限制：

- **CIR**（Committed Information Rate）——（RouterOS 中的 **limit-at**）最坏情况，即无论发生什么，该流都将获得此流量（假设我们确实能发送这么多数据）。
- **MIR**（Maximal Information Rate）——（RouterOS 中的 **max-limit**）最好情况，即如果其队列的父队列有剩余带宽，该流可达到的速率。

换句话说，首先会满足所有队列的 **limit-at**（**CIR**），只有之后子队列才会尝试从父队列借用必要的数据速率，以达到其 **max-limit**（**MIR**）。

:::warning
无论发生什么，**CIR** 都会分配给对应队列（即使超过父队列的 max-limit）。

:::

因此，为确保按设计最优地使用双重限制功能，我们建议遵守以下规则：

- 所有子队列的承诺速率之和必须小于或等于父队列可用的流量总量；

CIR(parent)\* ≥ CIR(child1) +...+ CIR(childN)\* 如果父队列是主父队列 CIR(parent)=MIR(parent)

- 任何子队列的最大速率必须小于或等于父队列的最大速率。

MIR（父级）≥ MIR(child1) & MIR（父级）≥ MIR(child2) & ... & MIR（父级）≥ MIR(childN)

# Winbox 中的队列颜色 {#queue-colors-in-winbox}

- 已使用 0% - 50% 可用流量 - 绿色
- 已使用 50% - 75% 可用流量 - 黄色
- 已使用 75% - 100% 可用流量 - 红色

#### 优先级 {#priority}

我们已经知道，无论发生什么，所有队列的 **limit-at**（**CIR**）都会被分配。

优先级负责将父队列的剩余流量分配给子队列，以便它们能够达到 **max-limit**

优先级较高的队列会比优先级较低的队列先达到其 **max-limit**。8 是最低优先级，1 是最高优先级。

请注意，优先级仅在以下情况下生效：

- 对于**叶子**队列——**内部**队列中的优先级没有意义。
- 如果指定了 **max-limit**（不为 0）。

### 示例 {#examples}

在本节中，我们将分析 HTB 的实际应用。为此，我们将采用一个 HTB 结构，并通过改变 HTB 需要回收的传入流量以及更改一些选项，尝试涵盖所有可能的情况和功能。

#### 结构 {#structure}

我们的 HTB 结构将包含 5 个队列：

- **Queue01** 内部队列，有两个子队列——**Queue02** 和 **Queue03**
- **Queue02** 内部队列，有两个子队列——**Queue04** 和 **Queue05**
- **Queue03** 叶子队列
- **Queue04** 叶子队列
- **Queue05** 叶子队列

**Queue03**、**Queue04** 和 **Queue05** 是始终需要 10Mbps 的客户端。出接口能够处理 10Mbps 的流量。

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
- **说明：** HTB 的构建方式使得在满足所有 **limit-at** 后，主队列不再有可分配的吞吐量。

#### 示例 2：带 max-limit 的常见情况 {#example-2-usual-case-with-max-limit}

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
- **说明：** 在满足所有 **limit-at** 后，HTB 会将吞吐量分配给优先级最高的队列。但在本例中，**内部**队列 **Queue02** 指定了 **limit-at**，因此它为队列 **Queue04** 和 **Queue05** 预留了 8Mbps 的吞吐量。在这两者中，**Queue04** 的优先级最高，因此它获得了额外吞吐量。

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
- **说明：** 仅在满足所有 **limit-at** 时，HTB 就被迫分配 20Mbps——6Mbps 给 **Queue03**、2Mbps 给 **Queue04**、12Mbps 给 **Queue05**，但我们的出接口只能处理 10Mbps。由于出接口队列通常是 FIFO，吞吐量分配将保持 6:2:12 或 3:1:6 的比例。
