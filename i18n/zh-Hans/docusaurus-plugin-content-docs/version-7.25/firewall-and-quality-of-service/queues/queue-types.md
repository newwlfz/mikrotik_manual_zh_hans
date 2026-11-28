---
title: "队列类型"
description: "MikroTik RouterOS 中的队列类型定义了用于管理数据包流的排队规则，BFIFO 和 PFIFO 等选项提供基本的 FIFO 行为，而 CAKE 和 FQ_CoDel 等高级类型提供延迟控制和公平带宽分配。选择取决于网络优先级，例如简单性、公平性或拥塞管理。"
tags:
  - 'queue-types'
  - 'pfifo'
  - 'caffe'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/queues/queue-types
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 概述 {#overview}

队列类型类似于无类别排队规则的模板，这类算法控制数据包在进一步传输前如何被丢弃或在内存缓冲区中排队。它们对于确保良好的 Quality of Service 至关重要，因为队列类型不仅有助于应对带宽限制被超出的情况，还会影响延迟等其他方面。

它们的复杂度和属性差异很大。例如，First-In-First-Out（FIFO）队列很简单，可确保数据包按处理顺序保持公平，但可能导致队头阻塞等问题。更复杂的队列类型，例如实现公平排队或拥塞避免的队列类型，可以更有效地管理网络性能，但可能需要更多资源和配置。

因此，队列类型的选择取决于网络的具体需求和特性。

## 队列类型概览 {#queue-types-at-a-glance}

1. **BFIFO（Byte First-In, First-Out）：**

    - **特性：** BFIFO 是一种简单的面向字节的排队规则，按数据包到达顺序和大小发送数据。
    - **优点：** 数据包管理简单且公平。
    - **缺点：** BFIFO 可能导致队头阻塞，即一个大数据包会延迟其后的所有较小数据包。此外，没有机制防止拥塞或优先处理数据包。
2. **PFIFO（Packet First-In, First-Out）：**

    - **特性：** 与 BFIFO 类似，但基于数据包而不是字节运行。
    - **优点：** 易于实现和理解。在数据包数量方面是公平的。
    - **缺点：** 与 BFIFO 一样，存在队头阻塞问题，并且没有任何拥塞管理机制。
3. **CAKE（Common Applications Kept Enhanced）：**

   - **特性：** 一种全面的队列管理系统，旨在应对 bufferbloat 并确保公平排队。它结合了 CoDel、FQ 和其他技术。
   - **优点：** 在任何网络条件下都能出色地管理延迟。它尤其适用于消费者宽带连接。
   - **缺点：** 与更简单的排队规则相比，配置更复杂。并非适用于所有使用场景，特别是需要精细控制的情况。
4. **CoDel（Controlled Delay）：**

   - **特性：** CoDel 旨在通过丢弃数据包来控制队列延迟，从而改善缓冲区膨胀。
   - **优点：** 擅长管理延迟并避免缓冲区膨胀。
   - **缺点：** CoDel 本身不提供公平排队。
5. **FQ\_CoDel（Fair Queuing Controlled Delay）：**

   - **特性：** 将 CoDel 的延迟管理与公平排队相结合。
   - **优点：** 延迟管理出色，并可在各流之间公平分配带宽。通常被认为是较好的默认选择。
   - **缺点：** 比简单的队列规则更复杂，可能增加配置难度。
6. **MQ\_PFIFO（Multiqueue Packet First In, First Out）：**

   - **特性：** MQ\_PFIFO 是 PFIFO 的扩展，支持多个队列。
   - **优点：** 允许为不同类型或优先级的流量使用不同队列。
   - **缺点：** 仍存在队头阻塞问题，并且缺少内置拥塞管理机制。
7. **RED（Random Early Detection）：**

   - **特性：** RED 旨在通过在队列满之前随机丢弃数据包来预测并防止拥塞。
   - **优点：** 有助于防止拥塞，并可提升整体网络性能。
   - **缺点：** 配置可能较复杂，需要根据网络的具体特征进行调整。配置不当可能导致性能下降。
8. **SFQ（Stochastic Fairness Queuing）：**

   - **特性：** SFQ 旨在通过将流分配到不同的动态队列，确保各流之间公平分配资源。
   - **优点：** 有助于防止单个流占用全部连接资源。
   - **缺点：** SFQ 不管理延迟或拥塞。队列数量也可能增加内存占用。

选择队列规则时，需要考虑网络特征以及最优先关注的事项，例如延迟、公平性、简洁性或拥塞管理。

## 相关主题 {#related-topics}

<DocCardList />
