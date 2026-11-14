---
sidebar_key: "cli-reference/ip/proxy/connections"
sidebar_position: 5
title: "connections"
sidebar_label: 'connections'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/connections
captured_at: '2026-11-01T21:24:20+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/proxy/connections {#ipproxyconnections}
**类型：** 目录

Web Proxy 的已打开连接。来自客户端的每个连接和到服务器的每个连接各占一行。代理在收到响应后会保持到服务器的连接打开，并将其用于后续请求。有关概述，请参阅 [Web 代理](../../../network-management/proxy/web-proxy.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="S" typ="server">server。从代理到服务器的连接。</ArgTableRow>
<ArgTableRow arg="C" typ="client">client。从客户端到代理的连接。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="src-address" typ="alt { ip4: ipAddr
, ip6: ip6Addr
 }">该连接所服务的客户端地址。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="alt { ip4: ipAddr
, ip6: ip6Addr
 }">服务器的地址。</ArgTableRow>
<ArgTableRow arg="last-protocol" typ="enum (HTTP/1.0 | HTTP/1.1 | FTP) { HTTP/1.0:1, HTTP/1.1:2, FTP:3 }">连接上最后一个请求的协议：`HTTP/1.0`、`HTTP/1.1` 或 `FTP`。</ArgTableRow>
<ArgTableRow arg="state" typ="enum (rx-header | resolving | connecting | waiting | rx-body | tx-header | tx-body | idle) { rx-header:0, resolving:1, connecting:2, waiting:3, rx-body:4, tx-header:5, tx-body:6, idle:7 }">
连接的状态，例如：
- `waiting` - 客户端连接等待来自服务器的响应。
- `rx-header` - 服务器连接接收响应的头部。
- `idle` - 服务器连接已打开且没有请求。
</ArgTableRow>
<ArgTableRow arg="tx-bytes" typ="num">路由器在此连接上发送的字节数。</ArgTableRow>
<ArgTableRow arg="rx-bytes" typ="num">路由器在此连接上接收的字节数。</ArgTableRow>
</ArgTable>
