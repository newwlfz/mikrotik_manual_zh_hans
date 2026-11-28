---
title: "graphing"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/graphing
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/graphing 
**类型：** 设置目录

常规图表设置：收集的数据写入系统存储的频率，以及图表网页重新加载的频率。绘制哪些数据以及谁可以查看，由 [`interface`](/docs/cli-reference/tool/graphing/interface)、[`queue`](/docs/cli-reference/tool/graphing/queue) 和 [`resource`](/docs/cli-reference/tool/graphing/resource) 中的规则设置；路由器默认没有规则。请参阅 [Graphing](/docs/diagnostics-monitoring-and-troubleshooting/graphing)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="store-every" typ="enum (5min | hour | 24hours) { 5min:1, hour:2, 24hours:3 }">
How often the router writes the collected data of the rules with `store-on-disk=yes` to the system storage. A longer interval writes to the storage less often. A reboot from RouterOS keeps the data collected since the last write.
- `5min` (default) - Every 5 minutes.
- `hour` - Every hour.
- `24hours` - Once a day.
</ArgTableRow>
<ArgTableRow arg="page-refresh" typ="enum (never) { never:0x0 }">How often to refresh HTML pages (in seconds). The web server sends the value as the HTTP `refresh` header of the graph pages, so the browser reloads them. `never` leaves the header out, and the pages do not reload by themselves. Default: 300.</ArgTableRow>
</ArgTable>
