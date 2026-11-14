---
sidebar_key: "cli-reference/ip/proxy/lookups"
sidebar_position: 8
title: "lookups"
sidebar_label: 'lookups'
source: https://manual.mikrotik.com/docs/cli-reference/ip/proxy/lookups
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/proxy/lookups {#ipproxylookups}
**类型：** 设置目录

代理在其缓存中查找的请求计数。有关缓存的概述，请参阅 [Web 代理](../../../network-management/proxy/web-proxy.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="successes" typ="num">从缓存中应答的请求数。</ArgTableRow>
<ArgTableRow arg="not-found" typ="num">针对不在缓存中的对象的请求数。</ArgTableRow>
<ArgTableRow arg="non-cacheable" typ="num">由于其方法（例如 `POST` 和 `HEAD`）而不会被代理在缓存中查找的请求数。</ArgTableRow>
<ArgTableRow arg="denied" typ="num">匹配 [`/ip/proxy/cache`](./cache/index.md) 中 `action=deny` 规则的请求数。</ArgTableRow>
<ArgTableRow arg="expired" typ="num">在缓存中找到对象、但代理又从服务器重新获取该对象的请求数。</ArgTableRow>
<ArgTableRow arg="no-expiration-info" typ="num"></ArgTableRow>
</ArgTable>
