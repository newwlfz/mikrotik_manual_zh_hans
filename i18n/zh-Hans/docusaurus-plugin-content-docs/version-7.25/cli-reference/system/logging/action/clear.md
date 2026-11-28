---
title: "clear"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/logging/action/clear
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/system/logging/action"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/logging/action/clear 
**类型：** 命令

清空 memory action 的缓冲区，例如使用 `/system/logging/action/clear action=memory` 清空默认缓冲区。设置了 `memory-stop-on-full=yes` 的缓冲区在清空后会再次接受新条目。disk action 会返回 `cleanup not supported on this target`。请参阅 [`/system/logging/action`](/docs/cli-reference/system/logging/action) 和 [Log](/docs/diagnostics-monitoring-and-troubleshooting/log)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="action" typ="enum">Name of the memory action whose buffer to empty.</ArgTableRow>
</ArgTable>
