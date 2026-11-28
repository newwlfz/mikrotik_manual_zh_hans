---
title: "队列大小"
description: "本页说明如何在 MikroTik RouterOS 中配置队列大小限制，详细介绍设置最大数据包数量对流量整形和调度的影响。其中包含比较 100% shapers、schedulers 和默认队列类型的示例，用于说明数据包丢弃率和延迟。"
tags:
  - 'queues'
  - 'packet-scheduling'
  - 'traffic-shaping'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/queues/queue-size
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "firewall-and-quality-of-service/queues/queue-types"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

最大允许的队列大小可以指定为最大内存限制，但许多算法将其简化为最大数据包数量，因此实际使用的内存会因数据包大小而异。

本页其余部分演示了这一机制如何作用于处理数据包数量的队列类型，例如 PFIFO、BFIFO、PCQ 和 RED。

## 示例 {#example}

本示例用于说明队列大小对由特定队列排队的数据流的影响。

为了简化可视化，假设我们按步骤处理数据，并且确切知道每个步骤将接收/转发多少个数据包，同时不会发生丢弃数据包的重传。

![](/img/9846215d6f509cc9.webp)

如上图所示，共有 **25 个步骤**，在此时间范围内共有 **1610 个传入数据包**。

### 100% 整形器 {#100-shaper}

当超过允许限制的每个数据包都会立即被丢弃时，队列就是 100% shaper。这样，所有未被丢弃的数据包都会立即发送，不会产生任何延迟。

让我们对示例应用 **max-limit=100 packets per step** 限制：

![](/img/e7180e5e00f19dc5.webp)

在这种限制下，1610 个数据包中只有 1250 个能够通过队列（**22,4% packet drop**），但所有数据包都没有延迟地到达。

### 100% 调度器 {#100-scheduler}

队列在没有丢包时为 100% Scheduler，所有数据包都会进入队列，并在第一个可能时刻发送出去。

在每一步中，队列必须先发送前几步遗留的排队数据包，然后才发送本步的数据包；这样可以保持数据包的正确顺序。

我们将再次使用相同的限制（**每步 100 个数据包**）。

![](/img/602cb27b0fe527ac.webp)

没有发生丢包，但有 630 个**（39,1%）数据包延迟 1 步**，另外 170 个**（10,6%）数据包延迟 2 步**。（延迟 = 时延）

### Default-small 队列类型 {#default-small-queue-type}

也可以选择中间方式，让队列同时使用这两种排队机制（整形和调度）。默认情况下，RouterOS 中大多数队列的队列大小为 10。

![](/img/c34b3e99ab24c759.webp)

有 320 个**（19,9%）数据包被丢弃**，80 个**（5,0%）数据包延迟 1 步**。

### Default 队列类型 {#default-queue-type}

RouterOS 中另一个常用的队列大小是 50。

![](/img/d032181d3683de9a.webp)

有 190 个**（11.8%）数据包被丢弃**，400 个**（24.8%）数据包出现了 1 步延迟**。
