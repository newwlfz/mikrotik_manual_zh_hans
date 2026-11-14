---
sidebar_key: "cli-reference/ip/reverse-proxy"
sidebar_position: 18
title: "reverse-proxy"
sidebar_label: 'reverse-proxy'
source: https://manual.mikrotik.com/docs/cli-reference/ip/reverse-proxy
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/reverse-proxy {#ipreverse-proxy}
**条件：** !smips
**类型：** 目录

每条规则会把一个主机名的 HTTPS 请求转发到 HTTP 服务器。反向代理在 [`/ip/service`](./service/index.md) 中 `reverse-proxy` 服务的端口上接受 HTTPS 连接，选择 `sni` 与客户端发送的服务器名称相匹配的规则，使用该规则的证书终止 TLS，并将请求以 HTTP 转发到 `ip-address` 和 `port`。仅当至少存在一条已启用的规则时，该服务端口才会开放。有关概览和示例，请参见 [反向代理](../../network-management/proxy/reverse-proxy.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该规则已禁用。新建规则创建时即为启用状态。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">该规则由 RouterOS 为具有 `use-https=yes` 和 Web 界面的容器应用创建（参见 [`/app`](../app/index.md)）。其 `sni` 是应用 URL 的主机名，其证书是在 `/app/settings` 中设置的证书。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="sni" typ="string" mandatory="1">该规则所服务的主机名。它会与客户端在 TLS 握手期间发送的服务器名称（SNI）进行比较，并且必须完全匹配；诸如 `*.example.com` 之类的通配符不会匹配任何内容。路由器会关闭服务器名称不匹配任何规则的连接，并且 `rproxy` 日志会显示 `no matching rule for <name>`。</ArgTableRow>
<ArgTableRow arg="ip-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }" mandatory="1">请求所转发到的服务器的 IPv4 或 IPv6 地址。路由器会从自身地址发起连接，并将每个请求作为 HTTP/1.1 转发。它会保留 `Host` 标头，并添加包含客户端地址的 `X-Forwarded-For` 和 `X-Real-Ip`，以及 `X-Forwarded-Proto: https`、`X-Forwarded-Host` 和 `Forwarded`。</ArgTableRow>
<ArgTableRow arg="port" typ="num" mandatory="1">服务器的 TCP 端口。路由器始终使用纯 HTTP 进行连接，即使端口为 443 也是如此，因此服务器必须在此端口上接受 HTTP。</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none)">此规则向客户端出示的证书，例如为 `sni` 主机名签发的证书。当为 `none` 时，将使用 [`/ip/service`](./service/index.md) 中 `reverse-proxy` 服务的证书。当该证书也为 `none` 时，TLS 握手会失败，并且 `rproxy` 日志会显示 `certificate missing for rule <sni>`。默认值：none.</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum"></ArgTableRow>
</ArgTable>
