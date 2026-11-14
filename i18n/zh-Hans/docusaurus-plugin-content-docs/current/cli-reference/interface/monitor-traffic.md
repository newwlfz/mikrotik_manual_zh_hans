---
sidebar_key: "cli-reference/interface/monitor-traffic"
sidebar_position: 22
title: "monitor-traffic"
sidebar_label: 'monitor-traffic'
source: https://manual.mikrotik.com/docs/cli-reference/interface/monitor-traffic
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/monitor-traffic {#interfacemonitor-traffic}
**类型：** 命令
实时显示每个接口的吞吐量（每秒速率）。多个接口会并排打印为多列；表格会持续刷新。使用 `duration` 限制其运行时长。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="multi { array-id, interface: iface_enum { aggregate:0 }
 }">要监视的接口（或使用 `aggregate` 表示合并视图）</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口名称</ArgTableRow>
<ArgTableRow arg="rx-packets-per-second" typ="num">每秒接收数据包数</ArgTableRow>
<ArgTableRow arg="rx-bits-per-second" typ="num">每秒接收比特数</ArgTableRow>
<ArgTableRow arg="fp-rx-packets-per-second" typ="num">Fast Path 每秒接收数据包数</ArgTableRow>
<ArgTableRow arg="fp-rx-bits-per-second" typ="num">Fast Path 每秒接收比特数</ArgTableRow>
<ArgTableRow arg="rx-drops-per-second" typ="num">每秒接收丢弃数</ArgTableRow>
<ArgTableRow arg="rx-errors-per-second" typ="num">每秒接收错误数</ArgTableRow>
<ArgTableRow arg="tx-packets-per-second" typ="num">每秒发送的数据包数</ArgTableRow>
<ArgTableRow arg="tx-bits-per-second" typ="num">每秒发送的比特数</ArgTableRow>
<ArgTableRow arg="fp-tx-packets-per-second" typ="num">Fast Path 每秒发送的数据包数</ArgTableRow>
<ArgTableRow arg="fp-tx-bits-per-second" typ="num">Fast Path 每秒发送的比特数</ArgTableRow>
<ArgTableRow arg="tx-drops-per-second" typ="num">每秒发送丢弃数</ArgTableRow>
<ArgTableRow arg="tx-queue-drops-per-second" typ="num">接口队列每秒丢弃数</ArgTableRow>
<ArgTableRow arg="tx-errors-per-second" typ="num">每秒发送错误数</ArgTableRow>
</ArgTable>
