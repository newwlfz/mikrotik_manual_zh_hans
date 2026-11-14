---
sidebar_key: "cli-reference/ip/proxy/refreshes"
sidebar_position: 10
title: "refreshes"
sidebar_label: 'refreshes'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/refreshes
captured_at: '2026-11-01T21:24:25+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/proxy/refreshes {#ipproxyrefreshes}
**类型：** 设置目录

代理在响应客户端之前与服务器重新验证过的缓存对象的计数器。为了重新验证对象，代理会发送带有 `If-Modified-Since` 或 `If-None-Match` 的条件请求。每个计数器统计一种原因。有关缓存的概述，请参见 [Web 代理](../../../network-management/proxy/web-proxy.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="url-requests" typ="num">URL 包含查询字符串的对象。代理会在每次请求时重新验证它们。</ArgTableRow>
<ArgTableRow arg="request-max-age" typ="num"></ArgTableRow>
<ArgTableRow arg="expired" typ="num"></ArgTableRow>
<ArgTableRow arg="response-max-age" typ="num"></ArgTableRow>
<ArgTableRow arg="config-max-fresh" typ="num"></ArgTableRow>
<ArgTableRow arg="heuristic" typ="num"></ArgTableRow>
<ArgTableRow arg="other" typ="num">其他原因，例如对象具有 `ETag` 标头但没有 `Last-Modified` 标头。</ArgTableRow>
</ArgTable>
