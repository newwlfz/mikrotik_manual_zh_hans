---
title: "lookups"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/lookups
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/proxy/lookups 
**类型：** 设置目录

代理在其缓存中查找的请求计数器。有关缓存概述，请参阅 [Web Proxy](/docs/network-management/proxy/web-proxy)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="successes" typ="num">Requests answered from the cache.</ArgTableRow>
<ArgTableRow arg="not-found" typ="num">Requests for objects that are not in the cache.</ArgTableRow>
<ArgTableRow arg="non-cacheable" typ="num">Requests the proxy does not look up in the cache because of their method, for example `POST` and `HEAD`.</ArgTableRow>
<ArgTableRow arg="denied" typ="num">Requests matched by a [`/ip/proxy/cache`](/docs/cli-reference/ip/proxy/cache) rule with `action=deny`.</ArgTableRow>
<ArgTableRow arg="expired" typ="num">Requests for an object found in the cache that the proxy fetched from the server again.</ArgTableRow>
<ArgTableRow arg="no-expiration-info" typ="num"></ArgTableRow>
</ArgTable>
