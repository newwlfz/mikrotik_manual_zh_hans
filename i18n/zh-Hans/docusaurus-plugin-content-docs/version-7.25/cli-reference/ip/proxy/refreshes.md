---
title: "refreshes"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/refreshes
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/proxy/refreshes 
**类型：** 设置目录

代理在响应客户端之前向服务器重新验证缓存对象的计数器。为重新验证对象，代理会发送带有 `If-Modified-Since` 或 `If-None-Match` 的条件请求。每个计数器对应一种原因。有关缓存概述，请参阅 [Web Proxy](/docs/network-management/proxy/web-proxy)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="url-requests" typ="num">Objects whose URL has a query string. The proxy revalidates them on every request.</ArgTableRow>
<ArgTableRow arg="request-max-age" typ="num"></ArgTableRow>
<ArgTableRow arg="expired" typ="num"></ArgTableRow>
<ArgTableRow arg="response-max-age" typ="num"></ArgTableRow>
<ArgTableRow arg="config-max-fresh" typ="num"></ArgTableRow>
<ArgTableRow arg="heuristic" typ="num"></ArgTableRow>
<ArgTableRow arg="other" typ="num">Other reasons, for example an object that has an `ETag` header but no `Last-Modified` header.</ArgTableRow>
</ArgTable>
