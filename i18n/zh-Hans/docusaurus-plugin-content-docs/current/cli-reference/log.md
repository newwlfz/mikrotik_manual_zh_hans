---
sidebar_key: "cli-reference/log"
sidebar_position: 20
title: "log"
sidebar_label: 'log'
source: https://manual.mikrotik.com/docs/cli-reference/log
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## log {#log}
**类型：** 目录

路由器保存在内存中的日志条目：默认的 `memory` 缓冲区、其他 memory 动作的缓冲区以及 disk 动作的最新条目。`/log/print` 会列出每个缓冲区的条目；`where buffer=<action name>` 将输出限制为其中一个，`follow` 持续打印新条目，`follow-only` 仅打印新条目，`with-extra-info` 追加额外字段，而 `file=<name>` 将输出保存到 `<name>.txt`。`/log/info`、`/log/warning`、`/log/error` 和 `/log/debug` 命令会添加一条带有 `script` 主题和相应级别的消息，与脚本中的 `:log` 相同。保留哪些消息由 [`/system/logging`](./system/logging/index.md) 中的规则设置。参见 [日志](../diagnostics-monitoring-and-troubleshooting/log/index.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="buffer" typ="enum">条目所属的缓冲区：默认缓冲区为 `memory`，也可以是另一个 memory 动作或某个 disk 动作的名称。disk 动作的最新条目会显示在这里，重启后则显示其活动文件的条目。不带过滤器的 `/log/print` 会列出每个缓冲区，因此传递给多个动作的消息会按动作各显示一次。</ArgTableRow>
<ArgTableRow arg="time" typ="date">添加条目的日期和时间。</ArgTableRow>
<ArgTableRow arg="topics" typ="multi { array-id, topic: enum
 }">条目的主题，例如 `system,info,account`。 [`/system/logging`](./system/logging/index.md) 中的规则会根据这些主题选择消息。</ArgTableRow>
<ArgTableRow arg="message" typ="string">条目文本；当规则有 `prefix` 时，将其放在前面。</ArgTableRow>
<ArgTableRow arg="extra-info" typ="string">某些消息携带的额外 `key=value` 字段，例如一次登录：`app=ssh duser=admin outcome=success src=192.0.2.1`。 `print with-extra-info` 会将它们追加到消息中，而 `cef` 远程日志格式会在 `msg=` 之后发送它们。</ArgTableRow>
</ArgTable>
