---
title: "stop"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/sniffer/stop
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/sniffer/stop 
**类型：** 命令

停止 sniffer。捕获的数据包会在内存中保留 10 分钟，或保留到下一次 [`start`](/docs/cli-reference/tool/sniffer/start)：使用 [`packet`](/docs/cli-reference/tool/sniffer/packet)、[`protocol`](/docs/cli-reference/tool/sniffer/protocol)、[`host`](/docs/cli-reference/tool/sniffer/host) 和 [`connection`](/docs/cli-reference/tool/sniffer/connection) 列出这些数据包，或使用 [`save`](/docs/cli-reference/tool/sniffer/save) 将其写入文件。
