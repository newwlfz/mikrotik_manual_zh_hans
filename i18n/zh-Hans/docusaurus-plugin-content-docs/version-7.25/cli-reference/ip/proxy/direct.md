---
title: "direct"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/proxy/direct
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/proxy/direct 
**类型：** 目录

当在 [`/ip/proxy`](/docs/cli-reference/ip) 中通过 `parent-proxy` 和 `parent-proxy-port` 设置父代理时，这些规则决定哪些请求直接发送到服务器。代理从上到下检查规则，第一条匹配的规则生效。未匹配任何规则的请求将通过父代理。未设置父代理时，所有请求都直接发送到服务器，该列表不起作用。匹配器的工作方式与 [`/ip/proxy/access`](/docs/cli-reference/ip/proxy/access) 中相同。在匹配器值前加 `!` 可对其取反，例如 `src-address=!192.168.88.0/24`。示例请参阅 [Web Proxy](/docs/network-management/proxy/web-proxy)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled. The rule is not used. New rules are created enabled.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="src-address" typ="super { !
, range: alt { ip4: ipRange
, ip6: ip6Prefix
 }
 }">Address of the client: an IPv4 address, range or prefix, or an IPv6 prefix.</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, range: alt { ip4: ipRange
, ip6: ip6Prefix
 }
 }">Address of the server the proxy connects to, which is the resolved address of the host name in the request. Same format as `src-address`.</ArgTableRow>
<ArgTableRow arg="dst-port" typ="super { !
, ports: multi { ports: range [ .. 65535]
 }
 }">Port of the server, for HTTPS requests the port of the `CONNECT` tunnel. A port, a range or a comma-separated list, for example `dst-port=!443`.</ArgTableRow>
<ArgTableRow arg="local-port" typ="super { !
, port: num [0 .. 65535]
 }">Port of the proxy the request arrived on. Use it when `port` in [`/ip/proxy`](/docs/cli-reference/ip) lists several ports.</ArgTableRow>
<ArgTableRow arg="dst-host" typ="super { !
, host: string
 }">
Host name of the request, for HTTPS requests the host of the `CONNECT` tunnel. The value must match the whole name and is not case-sensitive, so `example.com` does not match `www.example.com`.
- Wildcards: `*` matches any characters and `?` one character, for example `*.example.com`.
- A value that starts with `:` is a regular expression, which can match any part of the name: `:mail` matches `mail.example.com`. Anchor it with `^` and `$`, for example `:^www`.
</ArgTableRow>
<ArgTableRow arg="path" typ="super { !
, path: string
 }">
Path of the requested URL, including the query string, for example `/music/a.mp3?x=1`. Wildcards and regular expressions work as in `dst-host`.
- Wildcards must match the whole path including the query string, so `*.mp3` matches `/music/a.mp3` but not `/music/a.mp3?x=1`.
- The path always starts with `/`, so the router refuses a value such as `music/*`, which could never match.
- HTTPS requests have no path, so a rule with `path` never matches them.
</ArgTableRow>
<ArgTableRow arg="method" typ="super { !
, method: enum (GET | HEAD | POST | PUT | CONNECT | OPTIONS | DELETE | TRACE)
 }">HTTP method of the request: `GET`, `HEAD`, `POST`, `PUT`, `CONNECT`, `OPTIONS`, `DELETE` or `TRACE`. Clients of the proxy request HTTPS pages with `CONNECT`. The methods are defined in [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#name-methods).</ArgTableRow>
<ArgTableRow arg="action" typ="enum (allow | deny)">
How the proxy sends a matching request.
- `allow` (default) - Connect directly to the server.
- `deny` - Send the request through the parent proxy.
</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="hits" typ="num">Number of requests the rule matched. Reset it with [`reset-counters`](/docs/cli-reference/ip/proxy/reset-counters) or [`reset-counters-all`](/docs/cli-reference/ip/proxy/reset-counters-all).</ArgTableRow>
</ArgTable>
