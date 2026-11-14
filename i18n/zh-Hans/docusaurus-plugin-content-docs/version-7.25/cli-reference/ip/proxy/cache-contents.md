---
sidebar_key: "cli-reference/ip/proxy/cache-contents"
sidebar_position: 3
title: "cache-contents"
sidebar_label: 'cache-contents'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/cache-contents
captured_at: '2026-11-01T21:24:20+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/proxy/cache-contents {#ipproxycache-contents}
**类型：** 目录

Web 代理缓存中的对象。删除条目可使代理在下次请求时从服务器获取该对象。要清空整个缓存，请使用 [`clear-cache`](./clear-cache.md)。有关缓存的概述，请参阅 [Web 代理](../../../network-management/proxy/web-proxy.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="uri" typ="string">对象的 URL。</ArgTableRow>
<ArgTableRow arg="file-size" typ="num">对象的大小，单位为 KiB。</ArgTableRow>
<ArgTableRow arg="last-modified" typ="date">代理存储对象的日期。它不是响应的 `Last-Modified` 标头。</ArgTableRow>
<ArgTableRow arg="last-modified-time" typ="date">代理存储对象的时间。</ArgTableRow>
<ArgTableRow arg="last-accessed" typ="date"></ArgTableRow>
<ArgTableRow arg="last-accessed-time" typ="date"></ArgTableRow>
</ArgTable>
