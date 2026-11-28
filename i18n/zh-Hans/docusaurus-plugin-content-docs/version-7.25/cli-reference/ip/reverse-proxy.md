---
title: "reverse-proxy"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/reverse-proxy
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ip/route"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/reverse-proxy 
**条件：** !smips
**类型：** 目录

每条规则将一个主机名的 HTTPS 请求转发到 HTTP 服务器。反向代理在 [`reverse-proxy`](/docs/cli-reference/ip/service) 服务的端口上接受 HTTPS 连接，该服务位于 [`/ip/service`](/docs/cli-reference/ip/service)，选择与客户端发送的服务器名称匹配的 `sni` 规则，使用该规则的证书终止 TLS，并将请求作为 HTTP 转发到 `ip-address` 和 `port`。仅当至少存在一条启用的规则时，服务端口才会打开。有关概述和示例，请参阅 [Reverse Proxy](/docs/network-management/proxy/reverse-proxy)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">The rule is disabled. New rules are created enabled.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">The rule was created by RouterOS for a container app with `use-https=yes` and a web interface (see [`/app`](/docs/cli-reference/app)). Its `sni` is the host name of the app URL, and its certificate is the one set in `/app/settings`.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="sni" typ="string" mandatory="1">Host name the rule serves. It is compared with the server name (SNI) the client sends in the TLS handshake and must match it exactly; a wildcard such as `*.example.com` matches nothing. The router closes a connection whose server name matches no rule, and the `rproxy` log shows `no matching rule for <name>`.</ArgTableRow>
<ArgTableRow arg="ip-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }" mandatory="1">IPv4 or IPv6 address of the server the requests are forwarded to. The router connects from its own address and forwards each request as HTTP/1.1. It keeps the `Host` header and adds `X-Forwarded-For` and `X-Real-Ip` with the address of the client, `X-Forwarded-Proto: https`, `X-Forwarded-Host` and `Forwarded`.</ArgTableRow>
<ArgTableRow arg="port" typ="num" mandatory="1">TCP port of the server. The router always connects with plain HTTP, also when the port is 443, so the server must accept HTTP on this port.</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none)">Certificate the router presents to clients of this rule, for example one issued for the `sni` host name. With `none`, the certificate of the `reverse-proxy` service in [`/ip/service`](/docs/cli-reference/ip/service) is used. When that is also `none`, the TLS handshake fails, and the `rproxy` log shows `certificate missing for rule <sni>`. Default: none.</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum"></ArgTableRow>
</ArgTable>
