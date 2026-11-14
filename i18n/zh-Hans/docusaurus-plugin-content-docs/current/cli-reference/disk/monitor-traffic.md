---
sidebar_key: "cli-reference/disk/monitor-traffic"
sidebar_position: 7
title: "monitor-traffic"
sidebar_label: 'monitor-traffic'
source: https://manual.mikrotik.com/docs/cli-reference/disk/monitor-traffic
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/monitor-traffic {#diskmonitor-traffic}
**条件：** !smips
**类型：** 命令

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="io-ops" typ="num">自上次 `reset-counters` 以来的 I/O 操作总数。</ArgTableRow>
<ArgTableRow arg="io-errors" typ="num">I/O 错误总数。</ArgTableRow>
<ArgTableRow arg="slot" typ="string">正在监控的磁盘。</ArgTableRow>
<ArgTableRow arg="read-ops" typ="num">读取操作总数。</ArgTableRow>
<ArgTableRow arg="read-ops-per-second" typ="num">每秒读取操作数。</ArgTableRow>
<ArgTableRow arg="read-bytes" typ="num">读取总字节数。</ArgTableRow>
<ArgTableRow arg="read-rate" typ="num">当前读取速度。</ArgTableRow>
<ArgTableRow arg="read-merges" typ="num">合并读取操作总数（驱动程序合并的相邻请求）。</ArgTableRow>
<ArgTableRow arg="read-time" typ="time">读取所花费的总时间。</ArgTableRow>
<ArgTableRow arg="write-ops" typ="num">写入操作总数。</ArgTableRow>
<ArgTableRow arg="write-ops-per-second" typ="num">每秒写入操作数。</ArgTableRow>
<ArgTableRow arg="write-bytes" typ="num">写入总字节数。</ArgTableRow>
<ArgTableRow arg="write-rate" typ="num">当前写入速度。</ArgTableRow>
<ArgTableRow arg="write-merges" typ="num">合并写入操作总数。</ArgTableRow>
<ArgTableRow arg="write-time" typ="time">写入所花费的总时间。</ArgTableRow>
<ArgTableRow arg="in-flight-ops" typ="num">当前在磁盘上排队的操作数。</ArgTableRow>
<ArgTableRow arg="active-time" typ="time">磁盘忙于处理请求的总时间。</ArgTableRow>
<ArgTableRow arg="wait-time" typ="time">请求在被处理前在队列中等待的总时间。</ArgTableRow>
<ArgTableRow arg="discard-ops" typ="num">discard（TRIM）操作总数。</ArgTableRow>
<ArgTableRow arg="discard-bytes" typ="num">已丢弃的总字节数。</ArgTableRow>
<ArgTableRow arg="discard-merges" typ="num">合并 discard 操作总数。</ArgTableRow>
<ArgTableRow arg="discard-time" typ="time">执行丢弃所花费的总时间。</ArgTableRow>
<ArgTableRow arg="flush-ops" typ="num">flush 操作总数。</ArgTableRow>
<ArgTableRow arg="flush-time" typ="time">执行 flush 所花费的总时间。</ArgTableRow>
</ArgTable>
