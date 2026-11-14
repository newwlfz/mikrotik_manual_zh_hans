---
sidebar_key: "cli-reference/disk/test"
sidebar_position: 16
title: "test"
sidebar_label: 'test'
source: https://manual.mikrotik.com/docs/cli-reference/disk/test
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/test {#disktest}
**条件：** !smips
**类型：** Command

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="N" typ="initializing">测试正在初始化（进行准备、清除缓存），尚未开始读取或写入。</ArgTableRow>
<ArgTableRow arg="R" typ="running">测试正在运行。</ArgTableRow>
<ArgTableRow arg="F" typ="failed">测试失败。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="disk" typ="multi { array-id, disk: enum
 }">要测试的磁盘或分区。</ArgTableRow>
<ArgTableRow arg="block-size" typ="num">单个读取或写入块的大小。默认值：64 KiB。</ArgTableRow>
<ArgTableRow arg="thread-count" typ="num">并行测试线程数。默认值：1。</ArgTableRow>
<ArgTableRow arg="direction" typ="enum (read | write)">
测试对数据的处理方式。
- `read`（默认）- 读取磁盘；不改变其内容。
- `write` - 写入磁盘；会销毁磁盘上的所有数据。
</ArgTableRow>
<ArgTableRow arg="type" typ="enum (device | filesystem)">测试目标：`device` 直接读写原始块设备，`filesystem` 通过已挂载的文件系统进行。默认值：device。</ArgTableRow>
<ArgTableRow arg="pattern" typ="enum (sequential | random)">
访问模式。
- `sequential`（默认）- 读取或写入连续的块。
- `random` - 在随机位置读取或写入块。
</ArgTableRow>
<ArgTableRow arg="entries-to-show" typ="num">保留并显示多少条最近的结果行。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="seq" typ="enum (TOT) { TOT:0xffffffff }">结果行的序号；`TOT` 行汇总所有线程。</ArgTableRow>
<ArgTableRow arg="rate" typ="num">此行的当前吞吐量。</ArgTableRow>
<ArgTableRow arg="iops" typ="num">每秒输入/输出操作数。</ArgTableRow>
<ArgTableRow arg="bytes" typ="num">此行到目前为止已传输的字节数。</ArgTableRow>
<ArgTableRow arg="disk" typ="enum (TOT) { TOT:0xffffffff }">被测试的磁盘。</ArgTableRow>
<ArgTableRow arg="thread" typ="enum (TOT) { TOT:0xffffffff }">此行所属的线程；`TOT` 汇总所有线程。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (device | filesystem)">启动测试时指定的测试类型。</ArgTableRow>
<ArgTableRow arg="pattern" typ="enum (sequential | random)">启动测试时指定的访问模式。</ArgTableRow>
<ArgTableRow arg="dir" typ="enum (read | write)">启动测试时指定的方向（`read` 或 `write`）。</ArgTableRow>
<ArgTableRow arg="bsize" typ="num">启动测试时指定的块大小。</ArgTableRow>
<ArgTableRow arg="state" typ="string">运行中测试的状态，例如准备阶段为 `clear caches`，工作阶段为 `run`。</ArgTableRow>
</ArgTable>
