---
sidebar_key: "cli-reference/ip/proxy/cache/index"
sidebar_position: 1
title: "cache"
sidebar_label: 'cache'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/cache
captured_at: '2026-11-01T21:24:21+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/proxy/cache {#ipproxycache}
**类型：** 目录

决定代理将哪些响应存储到缓存中的规则。代理会从上到下检查规则，并由第一条匹配的规则决定。不匹配任何规则的请求，在其响应可缓存时会被缓存。匹配器的工作方式与 [`/ip/proxy/access`](../access/index.md) 中相同。在匹配器值前加上 `!` 可对其取反，例如 `src-address=!192.168.88.0/24`。有关缓存的概述，请参阅 [Web 代理](../../../../network-management/proxy/web-proxy.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">disabled。该规则不被使用。新建的规则创建时为启用状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="src-address" typ="super { !
, range: alt { ip4: ipRange
, ip6: ip6Prefix
 }
 }">客户端地址：IPv4 地址、范围或前缀，或 IPv6 前缀。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, range: alt { ip4: ipRange
, ip6: ip6Prefix
 }
 }">服务器地址，即代理连接到的服务器地址，也就是请求中主机名解析后的地址。格式与 `src-address` 相同。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="super { !
, ports: multi { ports: range [ .. 65535]
 }
 }">服务器的端口，对于 HTTPS 请求，是 `CONNECT` 隧道的端口。可为一个端口、一个范围或逗号分隔的列表，例如 `dst-port=!443`。</ArgTableRow>
<ArgTableRow arg="local-port" typ="super { !
, port: num [0 .. 65535]
 }">请求到达时所使用的代理端口。当 [`/ip/proxy`](../index.md) 中的 `port` 列出多个端口时使用。</ArgTableRow>
<ArgTableRow arg="dst-host" typ="super { !
, host: string
 }">
请求的主机名；对于 HTTPS 请求，是 `CONNECT` 隧道的主机。该值必须匹配完整名称，并且不区分大小写，因此 `example.com` 不会匹配 `www.example.com`。
- 通配符：`*` 匹配任意字符，`?` 匹配一个字符，例如 `*.example.com`。
- 以 `:` 开头的值是正则表达式，可以匹配名称的任意部分：`:mail` 匹配 `mail.example.com`。可用 `^` 和 `$` 锚定，例如 `:^www`。
</ArgTableRow>
<ArgTableRow arg="path" typ="super { !
, path: string
 }">
所请求 URL 的路径，包括查询字符串，例如 `/music/a.mp3?x=1`。通配符和正则表达式的工作方式与 `dst-host` 中相同。
- 通配符必须匹配包括查询字符串在内的整个路径，因此 `*.mp3` 匹配 `/music/a.mp3`，但不匹配 `/music/a.mp3?x=1`。
- 路径始终以 `/` 开头，因此路由器会拒绝诸如 `music/*` 这样的值，因为它永远无法匹配。
- HTTPS 请求没有路径，因此带有 `path` 的规则永远不会匹配它们。
</ArgTableRow>
<ArgTableRow arg="method" typ="super { !
, method: enum (GET | HEAD | POST | PUT | CONNECT | OPTIONS | DELETE | TRACE)
 }">请求的 HTTP 方法：`GET`、`HEAD`、`POST`、`PUT`、`CONNECT`、`OPTIONS`、`DELETE` 或 `TRACE`。代理客户端使用 `CONNECT` 请求 HTTPS 页面。这些方法定义于 [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#name-methods)。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (allow | deny)">
代理对匹配请求的响应执行的操作。
- `allow`（默认）- 当响应可缓存时存储该响应。
- `deny` - 不存储该响应。[`/ip/proxy/inserts`](../inserts.md) 和 [`/ip/proxy/lookups`](../lookups.md) 会将此类请求计为 `denied`。
</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="hits" typ="num">该规则匹配的请求数。可使用 [`reset-counters`](../direct/reset-counters.md) 或 [`reset-counters-all`](../direct/reset-counters-all.md) 重置。</ArgTableRow>
</ArgTable>
