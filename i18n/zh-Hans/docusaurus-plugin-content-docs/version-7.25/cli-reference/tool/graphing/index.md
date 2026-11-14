---
sidebar_key: "cli-reference/tool/graphing/index"
sidebar_position: 1
title: "graphing"
sidebar_label: 'graphing'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/graphing
captured_at: '2026-11-01T21:25:53+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/graphing {#toolgraphing}
**类型：** 设置目录

常规 graphing 设置：收集的数据写入系统存储的频率，以及 graph 网页重新加载的频率。绘制哪些内容以及谁可以查看，由 [`interface`](./interface.md)、[`queue`](./queue.md) 和 [`resource`](./resource.md) 中的规则决定；路由器默认没有任何规则。参见 [图表](../../../diagnostics-monitoring-and-troubleshooting/graphing.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="store-every" typ="enum (5min | hour | 24hours) { 5min:1, hour:2, 24hours:3 }">
路由器将 `store-on-disk=yes` 的规则所收集的数据写入系统存储的频率。间隔越长，写入存储的次数越少。从 RouterOS 重启会保留自上次写入以来收集的数据。
- `5min`（默认）- 每 5 分钟。
- `hour` - 每小时。
- `24hours` - 每天一次。
</ArgTableRow>
<ArgTableRow arg="page-refresh" typ="enum (never) { never:0x0 }">HTML 页面的刷新频率（以秒为单位）。Web 服务器将该值作为 graph 页面的 HTTP `refresh` 头发送，因此浏览器会重新加载这些页面。`never` 会省略该头，页面不会自行重新加载。默认值：300。</ArgTableRow>
</ArgTable>
