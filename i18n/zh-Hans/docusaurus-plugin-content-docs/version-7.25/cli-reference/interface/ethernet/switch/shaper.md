---
title: "shaper"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/shaper
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/shaper 
**Syscap：** musicswitch
**类型：** Directory

流量整形限制从接口发出的流的速率和突发大小。整形器通过令牌桶实现。如果数据包超过最大速率或突发大小，即没有足够的令牌供该数据包使用，则该数据包会存储在缓冲区中，直到有足够的令牌将其发出。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="port" typ="enum" mandatory="1">Physical port for traffic shaper.</ArgTableRow>
<ArgTableRow arg="target" typ="enum (queue0 | queue1 | queue2 | queue3 | queue4 | queue5 | queue6 | queue7 | wrr-group0 | wrr-group1 | port) { queue0:0, queue1:1, queue2:2, queue3:3, queue4:4, queue5:5, queue6:6, queue7:7, wrr-group0:8, wrr-group1:9, port:10 }">
Three levels of shapers are supported on each port (including CPU port).
- `port` - entry applies to the port of the switch-chip.
- `wrr-group0` or `wrr-group1` - entry applies to one of the 2 Weighted Round Robin queue groups on the port.
- `queue0`-`queue7` - entry applies to one of the 8 queues on the port.
</ArgTableRow>
<ArgTableRow arg="meter-unit" typ="enum (bit | packet) { bit:0, packet:1 }">Measuring units for traffic shaper rate.</ArgTableRow>
<ArgTableRow arg="rate" typ="num">Maximum data rate limit.</ArgTableRow>
<ArgTableRow arg="burst" typ="num">Maximum data rate which can be transmitted while the burst is allowed.</ArgTableRow>
</ArgTable>
