---
title: "inserts"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/inserts
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/proxy/inserts 
**类型：** 设置目录

代理写入其缓存的对象计数器。有关缓存的概述，请参阅 [Web Proxy](/docs/network-management/proxy/web-proxy)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="successes" typ="num">Objects stored in the cache.</ArgTableRow>
<ArgTableRow arg="denied" typ="num">Responses not stored because a [`/ip/proxy/cache`](/docs/cli-reference/ip/proxy/cache) rule with `action=deny` matched the request.</ArgTableRow>
<ArgTableRow arg="too-large" typ="num"></ArgTableRow>
<ArgTableRow arg="no-memory" typ="num"></ArgTableRow>
<ArgTableRow arg="errors" typ="num"></ArgTableRow>
</ArgTable>
