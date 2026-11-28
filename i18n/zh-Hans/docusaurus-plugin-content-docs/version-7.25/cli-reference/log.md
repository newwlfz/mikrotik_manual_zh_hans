---
title: "log"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/log
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## log 
**类型：** 目录

路由器保存在内存中的日志条目：默认 `memory` 缓冲区、其他 memory action 的缓冲区以及 disk action 的最新条目。`/log/print` 列出每个缓冲区的条目；`where buffer=<action name>` 将输出限制为其中一个缓冲区，`follow` 持续打印新条目，`follow-only` 仅打印新条目，`with-extra-info` 追加额外字段，`file=<name>` 将输出保存到 `<name>.txt`。`/log/info`、`/log/warning`、`/log/error` 和 `/log/debug` 命令会添加一条主题为 `script`、级别与命令对应的消息，与脚本中的 `:log` 相同。保留哪些消息由 [`/system/logging`](/docs/cli-reference/system/logging) 中的规则设置。请参阅 [Log](/docs/diagnostics-monitoring-and-troubleshooting/log)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="buffer" typ="enum">Buffer the entry belongs to: `memory` for the default buffer, or the name of another memory action or of a disk action. A disk action's newest entries show here, and after a reboot the entries of its active file. `/log/print` without a filter lists every buffer, so a message passed to several actions shows once per action.</ArgTableRow>
<ArgTableRow arg="time" typ="date">Date and time the entry was added.</ArgTableRow>
<ArgTableRow arg="topics" typ="multi { array-id, topic: enum
 }">Topics of the entry, for example `system,info,account`. The rules in [`/system/logging`](/docs/cli-reference/system/logging) select messages by these topics.</ArgTableRow>
<ArgTableRow arg="message" typ="string">Text of the entry, with the rule's `prefix` in front when the rule has one.</ArgTableRow>
<ArgTableRow arg="extra-info" typ="string">Extra `key=value` fields that some messages carry, for example a login: `app=ssh duser=admin outcome=success src=192.0.2.1`. `print with-extra-info` appends them to the message, and the `cef` remote log format sends them after `msg=`.</ArgTableRow>
</ArgTable>
