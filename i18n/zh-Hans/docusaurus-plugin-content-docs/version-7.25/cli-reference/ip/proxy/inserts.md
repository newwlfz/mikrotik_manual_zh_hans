---
sidebar_key: "cli-reference/ip/proxy/inserts"
sidebar_position: 7
title: "inserts"
sidebar_label: 'inserts'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/inserts
captured_at: '2026-11-01T21:24:21+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/proxy/inserts {#ipproxyinserts}
**类型：** 设置目录

代理写入其缓存的对象计数器。关于缓存的概述，请参阅 [Web 代理](../../../network-management/proxy/web-proxy.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="successes" typ="num">已存储在缓存中的对象。</ArgTableRow>
<ArgTableRow arg="denied" typ="num">未存储响应，因为 [`/ip/proxy/cache`](./cache/index.md) 中 `action=deny` 的规则匹配了该请求。</ArgTableRow>
<ArgTableRow arg="too-large" typ="num"></ArgTableRow>
<ArgTableRow arg="no-memory" typ="num"></ArgTableRow>
<ArgTableRow arg="errors" typ="num"></ArgTableRow>
</ArgTable>
