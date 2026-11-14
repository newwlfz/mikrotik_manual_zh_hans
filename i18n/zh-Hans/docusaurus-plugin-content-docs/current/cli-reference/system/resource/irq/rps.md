---
sidebar_key: "cli-reference/system/resource/irq/rps"
sidebar_position: 1
title: "rps"
sidebar_label: 'rps'
source: https://manual.mikrotik.com/docs/cli-reference/system/resource/irq/rps
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/resource/irq/rps {#systemresourceirqrps}
**系统能力：** rps
**类型：** Directory
接收数据包引导（RPS）条目：每个条目为其接口启用 RPS（该接口接收路径的数据包处理工作通过软件分散到各个 CPU 核心上）。有关 RPS 何时能带来收益，请参阅[资源指南](../../../../diagnostics-monitoring-and-troubleshooting/resource.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用的条目（此接口的 RPS steering 已关闭）</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">接收路径被引导的接口</ArgTableRow>
</ArgTable>
