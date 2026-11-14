---
sidebar_key: "cli-reference/system/resource/cpu"
sidebar_position: 1
title: "cpu"
sidebar_label: 'cpu'
source: https://manual.mikrotik.com/docs/cli-reference/system/resource/cpu
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/resource/cpu {#systemresourcecpu}
**类型：** Directory
系统资源计数器的每 CPU 使用率明细。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="cpu" typ="string">显示其使用率的 CPU 的标识号</ArgTableRow>
<ArgTableRow arg="load" typ="num">CPU 使用率，以百分比表示</ArgTableRow>
<ArgTableRow arg="irq" typ="num">IRQ 使用率，以百分比表示</ArgTableRow>
<ArgTableRow arg="disk" typ="num">磁盘使用率，以百分比表示</ArgTableRow>
</ArgTable>
