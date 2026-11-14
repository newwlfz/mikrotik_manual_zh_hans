---
sidebar_key: "cli-reference/routing/igmp-proxy/index"
sidebar_position: 1
title: "igmp-proxy"
sidebar_label: "igmp-proxy"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/igmp-proxy
captured_at: '2026-11-01T21:29:32+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/igmp-proxy {#routingigmp-proxy}
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="quick-leave" typ="bool">指定收到 IGMP Leave 报文时采取的动作。如果 quick-leave 处于开启状态，那么一旦从下游接口上的第一个客户端收到 Leave 报文，就会立即向上游发送 IGMP Leave 报文。仅当下游代理后面只有一个订阅者时，才使用 `yes`。</ArgTableRow>
<ArgTableRow arg="query-interval" typ="time">通过下游接口发送 IGMP Query 报文的频率。</ArgTableRow>
<ArgTableRow arg="query-response-interval" typ="time">等待 IGMP Query 报文响应的时长。</ArgTableRow>
</ArgTable>
