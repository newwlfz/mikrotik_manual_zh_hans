---
sidebar_key: "cli-reference/system/resource/irq"
title: "irq"
sidebar_label: 'irq'
source: https://manual.mikrotik.com/docs/cli-reference/system/resource/irq
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/resource/irq {#systemresourceirq}
**类型：** Directory
每个中断源的 IRQ 计数器。使用 `cpu=auto` 时，IRQ 处理按中断计数进行均衡（NAPI 辅助）；仅在需要时将 IRQ 固定到特定核心。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="o" typ="read-only">只读（CPU 分配由硬件固定）</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="cpu" typ="num">IRQ 所绑定到的 CPU；`auto` 表示由调度器根据中断计数进行均衡</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="irq" typ="num">IRQ 标识号</ArgTableRow>
<ArgTableRow arg="users" typ="object { user: alt { interface: iface_enum
, other: string
 }
 }">绑定到该 IRQ 的进程/驱动</ArgTableRow>
<ArgTableRow arg="active-cpu" typ="num">在多核系统上当前正在处理该 IRQ 的 CPU</ArgTableRow>
<ArgTableRow arg="count" typ="num">已处理的中断数量（在以太网接口上，中断 = 数据包）</ArgTableRow>
<ArgTableRow arg="per-cpu-count" typ="multi { count: num
 }">以列表形式给出的每 CPU 中断计数</ArgTableRow>
</ArgTable>
