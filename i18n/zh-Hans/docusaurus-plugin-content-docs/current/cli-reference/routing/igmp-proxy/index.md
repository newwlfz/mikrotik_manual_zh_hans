---
sidebar_key: "cli-reference/routing/igmp-proxy"
title: "igmp-proxy"
sidebar_label: 'igmp-proxy'
source: https://manual.mikrotik.com/docs/cli-reference/routing/igmp-proxy
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/igmp-proxy {#routingigmp-proxy}
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="robustness" typ="num">IGMP 代理的 robustness 值，用作查询的重传次数以及丢包容忍度。没有自己的 robustness 设置的接口会继承该值。</ArgTableRow>
<ArgTableRow arg="query-interval" typ="time">通过下游接口发送 IGMP Query 消息的频率。</ArgTableRow>
<ArgTableRow arg="query-response-interval" typ="time">等待对 IGMP Query 消息的响应的时间。</ArgTableRow>
<ArgTableRow arg="last-member-query-interval" typ="time">在 Leave 消息之后为验证没有组成员残留而发送的组特定查询的超时时间。</ArgTableRow>
</ArgTable>
