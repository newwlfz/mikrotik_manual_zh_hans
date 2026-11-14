---
sidebar_key: "cli-reference/ip/proxy/monitor"
sidebar_position: 9
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/monitor
captured_at: '2026-11-01T21:24:22+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/proxy/monitor {#ipproxymonitor}
**类型：** 命令

显示 Web 代理的状态和计数器。添加 `once` 以进行单次读取，例如 `/ip/proxy/monitor once`。有关概述，请参阅 [Web 代理](../../../network-management/proxy/web-proxy.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="enum (stopped | running | invalid-address | building-cache | passthrough) { stopped:0, running:1, invalid-address:4, building-cache:5 }">
代理的状态，例如：
- `running` - 代理已启用并处理请求。
- `stopped` - 代理已禁用。
</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">自代理启动以来经过的时间。</ArgTableRow>
<ArgTableRow arg="client-connections" typ="num">来自客户端的已打开连接数。</ArgTableRow>
<ArgTableRow arg="server-connections" typ="num">到服务器的已打开连接数。</ArgTableRow>
<ArgTableRow arg="requests" typ="num">代理收到的请求数。</ArgTableRow>
<ArgTableRow arg="hits" typ="num">由缓存应答的请求数。</ArgTableRow>
<ArgTableRow arg="cache-used" typ="num">缓存中对象的大小，单位为 KiB。</ArgTableRow>
<ArgTableRow arg="total-ram-used" typ="num"></ArgTableRow>
<ArgTableRow arg="received-from-servers" typ="num">从服务器接收的数据量，单位为 KiB。</ArgTableRow>
<ArgTableRow arg="sent-to-clients" typ="num">发送到客户端的数据量，单位为 KiB。</ArgTableRow>
<ArgTableRow arg="hits-sent-to-clients" typ="num">从缓存发送到客户端的数据量，单位为 KiB。</ArgTableRow>
</ArgTable>
