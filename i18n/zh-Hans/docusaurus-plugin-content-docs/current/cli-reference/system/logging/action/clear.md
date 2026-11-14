---
sidebar_key: "cli-reference/system/logging/action/clear"
sidebar_position: 1
title: "clear"
sidebar_label: 'clear'
source: https://manual.mikrotik.com/docs/cli-reference/system/logging/action/clear
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/logging/action/clear {#systemloggingactionclear}
**类型：** 命令

清空 memory 动作的缓冲区，例如对默认缓冲区执行 `/system/logging/action/clear action=memory`。具有 `memory-stop-on-full=yes` 的缓冲区在清空后会再次接受新条目。disk 动作会拒绝，并提示 `cleanup not supported on this target`。请参阅 [`/system/logging/action`](./index.md) 和 [日志](../../../../diagnostics-monitoring-and-troubleshooting/log/index.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="action" typ="enum">要清空其缓冲区的 memory 动作的名称。</ArgTableRow>
</ArgTable>
