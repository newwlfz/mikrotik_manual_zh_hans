---
sidebar_key: "cli-reference/interface/ethernet/switch/shaper"
sidebar_position: 23
title: "shaper"
sidebar_label: 'shaper'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/shaper
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/shaper {#interfaceethernetswitchshaper}
**系统能力：** musicswitch
**类型：** 目录

流量整形限制从接口传输的流的速率和突发大小。整形器通过令牌桶实现。如果数据包超过最大速率或突发大小，这意味着没有足够的数据包令牌，则该数据包会存储在缓冲区中，直到有足够的令牌传输它。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="port" typ="enum" mandatory="1">用于流量整形的物理端口。</ArgTableRow>
<ArgTableRow arg="target" typ="enum (queue0 | queue1 | queue2 | queue3 | queue4 | queue5 | queue6 | queue7 | wrr-group0 | wrr-group1 | port) { queue0:0, queue1:1, queue2:2, queue3:3, queue4:4, queue5:5, queue6:6, queue7:7, wrr-group0:8, wrr-group1:9, port:10 }">
每个端口（包括 CPU 端口）支持三个层级的整形器。
- `port` - 条目应用于交换芯片的端口。
- `wrr-group0` 或 `wrr-group1` - 条目应用于端口上 2 个加权轮询队列组之一。
- `queue0`-`queue7` - 条目应用于端口上 8 个队列之一。
</ArgTableRow>
<ArgTableRow arg="meter-unit" typ="enum (bit | packet) { bit:0, packet:1 }">流量整形速率的计量单位。</ArgTableRow>
<ArgTableRow arg="rate" typ="num">最大数据速率限制。</ArgTableRow>
<ArgTableRow arg="burst" typ="num">在允许突发期间可传输的最大数据速率。</ArgTableRow>
</ArgTable>
