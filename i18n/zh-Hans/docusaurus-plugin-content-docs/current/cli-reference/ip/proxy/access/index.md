---
sidebar_key: "cli-reference/ip/proxy/access"
title: "access"
sidebar_label: 'access'
source: https://manual.mikrotik.com/docs/cli-reference/ip/proxy/access
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/proxy/access {#ipproxyaccess}
**类型：** 目录

用于允许、拒绝、重定向或修改代理客户端请求的规则，HTTP 和 HTTPS（`CONNECT`）请求均适用。代理会从上到下依次检查规则，由第一条匹配的规则做出决定。不匹配任何规则的请求将被允许。没有匹配条件的规则会匹配所有请求。在匹配条件的值前加上 `!` 可对其取反，例如 `src-address=!192.168.88.0/24`。有关示例，请参见 [Web 代理](../../../../network-management/proxy/web-proxy.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">disabled。该规则不被使用。新建的规则创建时为启用状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="src-address" typ="super { !
, range: alt { ip4: ipRange
, ip6: ip6Prefix
 }
 }">客户端的地址：IPv4 地址、范围或前缀，或 IPv6 前缀。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, range: alt { ip4: ipRange
, ip6: ip6Prefix
 }
 }">代理连接到的服务器地址，即请求中主机名解析后的地址。格式与 `src-address` 相同。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="super { !
, ports: multi { ports: range [ .. 65535]
 }
 }">服务器的端口；对于 HTTPS 请求，是 `CONNECT` 隧道的端口。可以是单个端口、范围或用逗号分隔的列表，例如 `dst-port=!443`。</ArgTableRow>
<ArgTableRow arg="local-port" typ="super { !
, port: num [0 .. 65535]
 }">请求到达时所使用的代理端口。当 [`/ip/proxy`](../index.md) 中的 `port` 列出多个端口时使用。</ArgTableRow>
<ArgTableRow arg="dst-host" typ="super { !
, host: string
 }">
请求的主机名；对于 HTTPS 请求，是 `CONNECT` 隧道的主机。该值必须匹配完整名称，且不区分大小写，因此 `example.com` 不匹配 `www.example.com`。
- 通配符：`*` 匹配任意字符，`?` 匹配一个字符，例如 `*.example.com`。
- 以 `:` 开头的值是正则表达式，可以匹配名称的任意部分：`:mail` 匹配 `mail.example.com`。使用 `^` 和 `$` 将其锚定，例如 `:^www`。
</ArgTableRow>
<ArgTableRow arg="path" typ="super { !
, path: string
 }">
所请求 URL 的路径，包括查询字符串，例如 `/music/a.mp3?x=1`。通配符和正则表达式的用法与 `dst-host` 中相同。
- 通配符必须匹配包括查询字符串在内的整个路径，因此 `*.mp3` 匹配 `/music/a.mp3`，但不匹配 `/music/a.mp3?x=1`。
- 路径始终以 `/` 开头，因此路由器会拒绝 `music/*` 这样的值，因为它永远无法匹配。
- HTTPS 请求没有路径，因此带有 `path` 的规则永远不会匹配它们。
</ArgTableRow>
<ArgTableRow arg="method" typ="super { !
, method: enum (GET | HEAD | POST | PUT | CONNECT | OPTIONS | DELETE | TRACE)
 }">请求的 HTTP 方法：`GET`、`HEAD`、`POST`、`PUT`、`CONNECT`、`OPTIONS`、`DELETE` 或 `TRACE`。代理客户端使用 `CONNECT` 请求 HTTPS 页面。这些方法定义于 [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#name-methods)。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (allow | deny | redirect | url-append)">
代理对匹配请求执行的操作。
- `allow`（默认） - 将请求继续传递。
- `deny` - 返回 HTTP 403 错误页面。
- `redirect` - 返回 HTTP 307，并将 `action-data` 中的 URL 作为新位置。
- `url-append` - 将 `action-data` 中的文本添加到所请求 URL 的末尾（位于路径和查询字符串之后），并继续传递请求。
</ArgTableRow>
<ArgTableRow arg="action-data" typ="string">重定向 URL/追加 URL。当 `action=redirect` 时，是客户端被发送到的 URL，例如 `http://intranet.example.com/blocked.html`。当 `action=url-append` 时，是添加到所请求 URL 末尾的文本，按原样添加，不带分隔符。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="hits" typ="num">该规则匹配的请求数。可使用 [`reset-counters`](../direct/reset-counters.md) 或 [`reset-counters-all`](../direct/reset-counters-all.md) 重置。</ArgTableRow>
</ArgTable>
