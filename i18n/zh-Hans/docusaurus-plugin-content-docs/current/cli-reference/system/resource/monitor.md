---
sidebar_key: "cli-reference/system/resource/monitor"
sidebar_position: 4
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/system/resource/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/resource/monitor {#systemresourcemonitor}
**类型：** 命令
实时系统资源监控输出（表格持续刷新；在 `duration` 后停止）。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="cpu-used" typ="num">所有核心的总 CPU 使用率</ArgTableRow>
<ArgTableRow arg="cpu-used-per-core" typ="multi { cpu-used: num
 }" syscap="smp">每个核心一行，显示其百分比使用率</ArgTableRow>
<ArgTableRow arg="free-memory" typ="num">空闲内存，单位 KiB</ArgTableRow>
</ArgTable>
