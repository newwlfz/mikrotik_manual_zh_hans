---
title: "monitor"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/monitor
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/proxy/monitor
**类型：** 命令

显示 web proxy 的状态和计数器。添加 `once` 可进行单次读取，例如 `/ip/proxy/monitor once`。有关概览，请参阅 [Web Proxy](/docs/network-management/proxy/web-proxy)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="status" typ="enum (stopped | running | invalid-address | building-cache | passthrough) { stopped:0, running:1, invalid-address:4, building-cache:5 }">
State of the proxy, for example:
- `running` - The proxy is enabled and serves requests.
- `stopped` - The proxy is disabled.
</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">Time since the proxy started.</ArgTableRow>
<ArgTableRow arg="client-connections" typ="num">Open connections from clients.</ArgTableRow>
<ArgTableRow arg="server-connections" typ="num">Open connections to servers.</ArgTableRow>
<ArgTableRow arg="requests" typ="num">Number of requests the proxy received.</ArgTableRow>
<ArgTableRow arg="hits" typ="num">Number of requests answered from the cache.</ArgTableRow>
<ArgTableRow arg="cache-used" typ="num">Size of the objects in the cache, in KiB.</ArgTableRow>
<ArgTableRow arg="total-ram-used" typ="num"></ArgTableRow>
<ArgTableRow arg="received-from-servers" typ="num">Data received from servers, in KiB.</ArgTableRow>
<ArgTableRow arg="sent-to-clients" typ="num">Data sent to clients, in KiB.</ArgTableRow>
<ArgTableRow arg="hits-sent-to-clients" typ="num">Data sent to clients from the cache, in KiB.</ArgTableRow>
</ArgTable>
