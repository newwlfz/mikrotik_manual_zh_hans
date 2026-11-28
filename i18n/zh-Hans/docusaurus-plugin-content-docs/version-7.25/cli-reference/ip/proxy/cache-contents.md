---
title: "cache-contents"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/cache-contents
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/proxy/cache-contents 
**类型：** 目录

Web Proxy 缓存中的对象。删除某个条目后，代理会在下一次请求时从服务器获取该对象。要清空整个缓存，请使用 [`clear-cache`](/docs/cli-reference/ip/proxy/clear-cache)。有关缓存的概述，请参阅 [Web Proxy](/docs/network-management/proxy/web-proxy)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="uri" typ="string">URL of the object.</ArgTableRow>
<ArgTableRow arg="file-size" typ="num">Size of the object, in KiB.</ArgTableRow>
<ArgTableRow arg="last-modified" typ="date">Date the proxy stored the object. It is not the `Last-Modified` header of the response.</ArgTableRow>
<ArgTableRow arg="last-modified-time" typ="date">Time the proxy stored the object.</ArgTableRow>
<ArgTableRow arg="last-accessed" typ="date"></ArgTableRow>
<ArgTableRow arg="last-accessed-time" typ="date"></ArgTableRow>
</ArgTable>
