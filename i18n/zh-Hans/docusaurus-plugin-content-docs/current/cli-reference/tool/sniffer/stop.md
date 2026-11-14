---
sidebar_key: "cli-reference/tool/sniffer/stop"
sidebar_position: 8
title: "stop"
sidebar_label: 'stop'
source: https://manual.mikrotik.com/docs/cli-reference/tool/sniffer/stop
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/sniffer/stop {#toolsnifferstop}
**类型：** 命令

停止嗅探器。捕获的数据包会在内存中保留 10 分钟，或直到下一次 [`start`](./start.md)：可在 [`packet`](./packet.md)、[`protocol`](./protocol.md)、[`host`](./host.md) 和 [`connection`](./connection.md) 中列出它们，或使用 [`save`](./save.md) 将它们写入文件。
