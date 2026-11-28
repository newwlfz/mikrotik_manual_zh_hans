---
title: "queue"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos/tx-manager/queue
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/interface/ethernet/switch/qos/tx-manager"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/qos/tx-manager/queue 
**Syscap：** rbswitch 和 crs_prestera
**类型：** Directory

每个端口有 8 个 Tx 队列。分配的 Tx Manager 控制数据包入队并调度发送顺序。每个队列可以使用严格优先级（始终优先发送流量类别最高的数据包），也可以组合在一起进行加权轮询发送调度。

创建 Tx Manager 会自动创建对应的全部 8 个队列调度器。

:::danger
更改 Tx manager 或队列的任何属性都会在卸载过程中完全停止数据包入队和发送。设备转发流量时会出现短暂丢包。
:::

:::danger
在某些设备型号上，由于硬件限制，在一个队列上启用 ECN 会在所有队列上开启支持 ECN 数据包的 CE 标记。在这种情况下，即使 `ecn=no`，`ecn-actual=yes`。
:::

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="schedule" typ="enum (strict-priority | low-priority-group | high-priority-group) { strict-priority:0, low-priority-group:1, high-priority-group:2 }">
Schedule tx either by strict priority of the traffic class or round-robin within the group.
- strict-priority - packets in the respective queue are always scheduled before moving to lower traffic classes. Packets with lower traffic classes are not transmitted until the current queue is empty.
- high-priority-group - all queues in the group are scheduled together by using a weighted round-robin principle. For example, if TC5 has weight 4, TC4 - 3, and TC3 - 2, then the scheduler transmits 4 packets from queue5, 3 packets from Q4, and 2 packets from Q3 in a single round. To achieve lower latency, each round is "sliced" between all queues in the group. In other words, the packet order in each round of the above example is "Q5, Q4, Q3, Q5, Q4, Q3, Q5, Q4, Q5".
- low-priority-group - similar logic to the high-priority-group, but the low-priority-group is scheduled only when all queues in the high-priority-group are empty.
</ArgTableRow>
<ArgTableRow arg="weight" typ="num">The weight value for the traffic class if it is a member of a schedule group. The field is not used in the case of a strict priority schedule.</ArgTableRow>
<ArgTableRow arg="queue-buffers" typ="alt { queue-buffers-pct: num [ .. 100]
, queue-buffers-byte: num [1536 .. 67108864]
 }" syscap="!prestera-cpss">The number of hardware Tx buffers allocated to this queue. Any value but **auto** is NOT scaled by the number of ports, i.e., the value gets split on ports linked to the Tx Manager. When given in percent, it means percentage of the tx-manager's queue-buffers value.</ArgTableRow>
<ArgTableRow arg="use-shared-buffers" typ="bool" syscap="!prestera-cpss">Allow the queue to use the shared buffer pool when **queue-buffers**are full. If the queue is full and the shared buffers are disabled, the packet gets dropped. If the shared buffers are enabled, the queue may use up to **shared-packet-cap** or **shared-poolX-packet-cap** (see [QoS Settings](/docs/cli-reference/interface/ethernet/switch/qos/settings) for details) packets from the shared pool.</ArgTableRow>
<ArgTableRow arg="wred" typ="bool" syscap="!prestera-ac3">Enables/disables [Weighted Random Early Detection](/docs/bridging-and-switching/quality-of-service#weighted-random-early-detection-wred) for the given queue.</ArgTableRow>
<ArgTableRow arg="ecn" typ="bool" syscap="!prestera-ac3">Enables/disables ECN marking of the transmitted packets.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="tx-manager" typ="enum">The linked Tx Manager</ArgTableRow>
<ArgTableRow arg="traffic-class" typ="num">The traffic class (tc0..tc7) and the respective port queue (queue0..queue7) that the scheduler controls.</ArgTableRow>
<ArgTableRow arg="wred-actual" typ="bool" syscap="!prestera-ac3">Actual WRED value</ArgTableRow>
<ArgTableRow arg="ecn-actual" typ="bool" syscap="!prestera-ac3">Actual ECN value</ArgTableRow>
</ArgTable>
