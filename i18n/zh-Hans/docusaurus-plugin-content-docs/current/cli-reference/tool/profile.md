---
sidebar_key: "cli-reference/tool/profile"
sidebar_position: 17
title: "profile"
sidebar_label: 'profile'
source: https://manual.mikrotik.com/docs/cli-reference/tool/profile
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/profile {#toolprofile}
**类型：**命令

按 RouterOS 进程类型显示 CPU 使用率，可对所有核心汇总统计，也可按核心分别统计。请参阅 [分析器](../../diagnostics-monitoring-and-troubleshooting/profiler.md) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="cpu" typ="enum (all | total) { all:0xfffffffe, total:0xfffffffd }" syscap="smp">在多核系统上选择 CPU 视图：`total`（默认值）汇总所有核心的使用率，`all` 为每个核心显示单独的行，而整数（`0` .. 核心数减一）则只显示该核心。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">进程分类名称（例如 `wireless`、`console`）。每个核心的汇总行命名为 `cpu0`、`cpu1`、...，汇总视图会额外添加一行 `total`。</ArgTableRow>
<ArgTableRow arg="cpu" typ="num" syscap="smp">该行使用率所属的 CPU 核心（仅限按核心视图）。</ArgTableRow>
<ArgTableRow arg="usage" typ="num">CPU 的使用份额，以百分比表示，自上一输出帧以来测量。</ArgTableRow>
</ArgTable>
