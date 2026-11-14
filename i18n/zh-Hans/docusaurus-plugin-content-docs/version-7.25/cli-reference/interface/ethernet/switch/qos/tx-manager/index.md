---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/tx-manager/index"
sidebar_position: 1
title: "tx-manager"
sidebar_label: 'tx-manager'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos/tx-manager
captured_at: '2026-11-01T21:22:40+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/tx-manager {#interfaceethernetswitchqostx-manager}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 目录

传输（Tx）管理器控制数据包入队传输和传输顺序。不同的交换机端口可以分配到不同的 Tx 管理器。硬件 Tx 管理器的最大数量取决于交换芯片型号。

:::info
端口状态不会影响已分配的资源。如果运行中的端口与断开或禁用的端口都分配到同一 Tx 管理器，则它们会获得相同数量的队列缓冲区。
:::

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">Tx Manager 名称。</ArgTableRow>
<ArgTableRow arg="queue-buffers" typ="alt { queue-buffers-pct: num [ .. 100]
, queue-buffers-byte: num [1536 .. 67108864]
 }">分配给链接到此 Tx Manager 的所有端口的总硬件 Tx 缓冲区数量。除 **auto** 以外的任何值都不按端口数量进行缩放。例如，如果 queue-buffers=30%，且有 3 个端口使用此 Tx Manager，则每个相应端口获得总可用资源的 10%。再向该 Tx Manager 添加两个端口会使每端口缓冲区降至 6%（30/5）。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="hw-id" typ="num"></ArgTableRow>
</ArgTable>
