---
sidebar_key: "firewall-and-quality-of-service/queues/queue-size"
sidebar_position: 4
title: "队列大小"
sidebar_label: "队列大小"
description: "本页面介绍如何在 MikroTik RouterOS 中配置队列大小限制，详细说明设置最大数据包数量对流量整形和调度的影响。其中包含比较 100% 整形器、调度器和默认队列类型的示例，以说明丢包率和延迟。"
tags:
  - 'queues'
  - 'packet-scheduling'
  - 'traffic-shaping'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/queues/queue-size
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

最大允许队列大小可以指定为最大内存限制，但许多算法将其简化为最大数据包数量，因此实际使用的内存会随数据包大小而变化。

本页其余部分将演示这对于 PFIFO、BFIFO、PCQ 和 RED 等按数据包数量处理的队列类型是如何工作的。

## 示例 {#example}

此示例旨在突出队列大小对由特定队列排队的流量的影响。

为简化可视化，假设我们按步骤处理数据，并且确切知道每个步骤将接收/传输多少数据包，且不会发生丢弃数据包的重传。

![](/img/9846215d6f509cc9.webp)

如上图所示，在此时间范围内共有 **25 个步骤**，总共有 **1610 个传入数据包**。

### 100% 整形器 {#100-shaper}

当每个超过允许限制的数据包都会被立即丢弃时，队列就是 100% 整形器。这样，所有未被丢弃的数据包都将无任何延迟地发送出去。

让我们对示例应用 **max-limit=100 packets per step** 限制：

![](/img/e7180e5e00f19dc5.webp)

使用这种限制时，1610 个数据包中只有 1250 个能够通过队列（**22,4% 丢包率**），但所有数据包均无延迟到达。

### 100% 调度器 {#100-scheduler}

当完全没有丢包时，队列就是 100% 调度器，所有数据包都会排队，并会在最早可能的时刻发送出去。

在每个步骤中，队列必须先发送来自之前步骤的已排队数据包，然后才能发送本步骤的数据包；这样就能保持正确的数据包顺序。

我们将再次使用相同的限制（**每步 100 个数据包**）。

![](/img/602cb27b0fe527ac.webp)

没有数据包丢失，但有 630 个 **（39,1%）数据包延迟 1 步**，另外 170 个 **（10,6%）数据包延迟 2 步**。（延迟 = 时延）

### Default-small 队列类型 {#default-small-queue-type}

也可以选择折中方式，即队列同时使用这两种排队机制（整形和调度）。默认情况下，RouterOS 中大多数队列的队列大小为 10。

![](/img/c34b3e99ab24c759.webp)

有 320 个 **（19,9%）数据包被丢弃**，80 个 **（5,0%）数据包延迟 1 步**。

### 默认队列类型 {#default-queue-type}

RouterOS 中另一个常用的队列大小是 50。

![](/img/d032181d3683de9a.webp)

有 190 个 **（11.8%）数据包被丢弃**，400 个 **（24.8%）数据包延迟 1 步**。
