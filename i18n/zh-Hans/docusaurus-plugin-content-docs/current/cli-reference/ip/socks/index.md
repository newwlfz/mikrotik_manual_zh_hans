---
sidebar_key: "cli-reference/ip/socks"
title: "socks"
sidebar_label: 'socks'
source: https://manual.mikrotik.com/docs/cli-reference/ip/socks
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/socks {#ipsocks}
**类型：** 设置目录

SOCKS 代理服务器在其 TCP 端口上接受 SOCKS 客户端连接，并将其转发到请求的目标，同时应用 [`access`](./access.md) 规则，并可选择使用 [`users`](./users.md) 身份验证。更多信息，请参见 [SOCKS](../../../network-management/socks/index.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">SOCKS 代理服务器是否运行。默认值：`no`。</ArgTableRow>
<ArgTableRow arg="port" typ="num">代理监听的 TCP 端口。默认值：`1080`。</ArgTableRow>
<ArgTableRow arg="connection-idle-timeout" typ="time">空闲代理连接在被终止前等待的时间。默认值：`2m`。</ArgTableRow>
<ArgTableRow arg="max-connections" typ="num">同时代理连接的最大数量，`1` 到 `500`。默认值：`200`。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">代理监听的 VRF。如果使用 `main` 以外的 VRF，则该端口只能在该 VRF 内部访问。默认值：`main`。</ArgTableRow>
<ArgTableRow arg="version" typ="enum (4 | 5)">
服务器接受的 SOCKS 协议版本。
- `4`（默认）- 仅接受 SOCKS4 客户端。
- `5` - 仅接受 SOCKS5 客户端。密码身份验证以及 [`socksify`](../socksify.md) 服务需要此版本，该服务始终使用 SOCKS5。
</ArgTableRow>
<ArgTableRow arg="auth-method" typ="enum (none | password)">
服务器要求客户端使用的身份验证方式。
- `none`（默认）- 无身份验证。
- `password` - 客户端必须使用 [`users`](./users.md) 中的用户名和密码进行身份验证。如果不存在任何用户，则拒绝所有连接。
</ArgTableRow>
</ArgTable>
