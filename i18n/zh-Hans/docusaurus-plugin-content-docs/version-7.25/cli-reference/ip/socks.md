---
title: "socks"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/socks
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/socks 
**类型：** 设置目录

SOCKS 代理服务器在其 TCP 端口上接受 SOCKS 客户端连接，并将其转发到请求的目的地，同时应用 [`access`](/docs/cli-reference/ip/access) 规则，并可选择启用 [`users`](/docs/cli-reference/ip/users) 认证。详情请参阅 [SOCKS](/docs/network-management/socks)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool">Whether the SOCKS proxy server runs. Default: `no`.</ArgTableRow>
<ArgTableRow arg="port" typ="num">TCP port the proxy listens on. Default: `1080`.</ArgTableRow>
<ArgTableRow arg="connection-idle-timeout" typ="time">Time after which an idle proxied connection is terminated. Default: `2m`.</ArgTableRow>
<ArgTableRow arg="max-connections" typ="num">Maximum number of simultaneous proxied connections, `1` to `500`. Default: `200`.</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">VRF the proxy listens in. With a VRF other than `main`, the port is reachable only inside that VRF. Default: `main`.</ArgTableRow>
<ArgTableRow arg="version" typ="enum (4 | 5)">
SOCKS protocol version the server accepts.
- `4` (default) - Accept only SOCKS4 clients.
- `5` - Accept only SOCKS5 clients. Required for password authentication and for the [`socksify`](/docs/cli-reference/ip/socksify) service, which always speaks SOCKS5.
</ArgTableRow>
<ArgTableRow arg="auth-method" typ="enum (none | password)">
Authentication the server requires from clients.
- `none` (default) - No authentication.
- `password` - Clients must authenticate with a username and password from [`users`](/docs/cli-reference/ip/users). If no users exist, every connection is rejected.
</ArgTableRow>
</ArgTable>
