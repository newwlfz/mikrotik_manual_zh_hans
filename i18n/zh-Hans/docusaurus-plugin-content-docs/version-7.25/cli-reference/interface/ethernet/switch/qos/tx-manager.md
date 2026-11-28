---
title: "tx-manager"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos/tx-manager
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/qos/tx-manager 
**Syscap：** rbswitch 和 crs_prestera
**Type：** Directory

Transmission（Tx）Manager 控制数据包的发送入队和数据包发送顺序。不同的交换机端口可以分配到不同的 Tx Manager。硬件 Tx Manager 的最大数量取决于交换芯片型号。

:::info
端口状态不影响已分配的资源。如果所有端口都分配到同一个 Tx Manager，则运行中的端口与未连接或禁用的端口获得相同数量的队列缓冲区。
:::

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Tx Manager name.</ArgTableRow>
<ArgTableRow arg="queue-buffers" typ="alt { queue-buffers-pct: num [ .. 100]
, queue-buffers-byte: num [1536 .. 67108864]
 }">The total number of hardware Tx buffers allocated to all ports linked to this Tx Manager. Any value but **auto** is NOT scaled by the number of ports. For example, if queue-buffers=30%, and there are 3 ports using this Tx Manager, each respective port receives 10% of the total available resources. Adding two more ports to the Tx Manager drops per-port buffers down to 6% (30/5).</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="hw-id" typ="num"></ArgTableRow>
</ArgTable>
