---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/tx-manager/queue"
sidebar_position: 1
title: "queue"
sidebar_label: 'queue'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/qos/tx-manager/queue
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/tx-manager/queue {#interfaceethernetswitchqostx-managerqueue}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 目录

每个端口有八个 Tx 队列。分配的 Tx 管理器控制数据包入队并调度传输顺序。每个队列可以具有严格优先级（其中具有最高流量类别的数据包始终优先传输），也可以分组在一起进行加权轮询 tx 调度。

创建 Tx 管理器会自动创建所有八个相应的队列调度器。

:::danger
更改 Tx 管理器或队列的任何属性都会在卸载过程中完全停止流量入队和传输。设备转发流量时预计会出现临时丢包。
:::

:::danger
在某些设备型号上，由于硬件限制，在一个队列上启用 ECN 会为所有队列上支持 ECN 的数据包开启 CE 标记。在这种情况下，尽管 `ecn=no`，但 `ecn-actual=yes`。
:::

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="schedule" typ="enum (strict-priority | low-priority-group | high-priority-group) { strict-priority:0, low-priority-group:1, high-priority-group:2 }">
根据流量类别的严格优先级或组内轮询来调度 Tx。
- strict-priority - 相应队列中的数据包总是先被调度，然后才转到较低流量类别。在当前队列清空之前，不会发送具有较低流量类别的数据包。
- high-priority-group - 组内所有队列通过加权轮询原则一起调度。例如，如果 TC5 的权重为 4，TC4 为 3，TC3 为 2，则调度器在一轮中从 queue5 发送 4 个数据包、从 Q4 发送 3 个数据包、从 Q3 发送 2 个数据包。为降低延迟，每一轮会在组内所有队列之间进行“切片”。换言之，上述示例每一轮的数据包顺序为 “Q5, Q4, Q3, Q5, Q4, Q3, Q5, Q4, Q5”。
- low-priority-group - 逻辑与 high-priority-group 类似，但仅当 high-priority-group 中的所有队列为空时，才会调度 low-priority-group。
</ArgTableRow>
<ArgTableRow arg="weight" typ="num">如果流量类别是调度组的成员，则为该流量类别的权重值。在严格优先级调度的情况下不使用此字段。</ArgTableRow>
<ArgTableRow arg="queue-buffers" typ="alt { queue-buffers-pct: num [ .. 100]
, queue-buffers-byte: num [1536 .. 67108864]
 }" syscap="!prestera-cpss">分配给此队列的硬件 Tx 缓冲区数量。除 **auto** 外的任何值都不会按端口数量缩放，即该值会在连接到该 Tx Manager 的端口之间拆分。当以百分比给出时，它表示 tx-manager 的 queue-buffers 值的百分比。</ArgTableRow>
<ArgTableRow arg="use-shared-buffers" typ="bool" syscap="!prestera-cpss">允许队列在 **queue-buffers** 已满时使用共享缓冲区池。如果队列已满且共享缓冲区已禁用，则数据包会被丢弃。如果共享缓冲区已启用，队列最多可从共享池使用 **shared-packet-cap** 或 **shared-poolX-packet-cap** 个数据包（详见 [QoS 设置](../settings.md)）。</ArgTableRow>
<ArgTableRow arg="wred" typ="bool" syscap="!prestera-ac3">为给定队列启用/禁用[加权随机早期检测](../../../../../../bridging-and-switching/quality-of-service.md#weighted-random-early-detection-wred)。</ArgTableRow>
<ArgTableRow arg="ecn" typ="bool" syscap="!prestera-ac3">启用/禁用所发送数据包的 ECN 标记。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="tx-manager" typ="enum">关联的 Tx Manager</ArgTableRow>
<ArgTableRow arg="traffic-class" typ="num">调度器控制的流量类别（tc0..tc7）及相应的端口队列（queue0..queue7）。</ArgTableRow>
<ArgTableRow arg="wred-actual" typ="bool" syscap="!prestera-ac3">实际 WRED 值</ArgTableRow>
<ArgTableRow arg="ecn-actual" typ="bool" syscap="!prestera-ac3">实际 ECN 值</ArgTableRow>
</ArgTable>
