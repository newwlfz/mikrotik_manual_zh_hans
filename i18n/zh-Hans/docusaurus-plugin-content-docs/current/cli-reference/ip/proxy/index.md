---
sidebar_key: "cli-reference/ip/proxy"
title: "proxy"
sidebar_label: 'proxy'
source: https://manual.mikrotik.com/docs/cli-reference/ip/proxy
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/proxy {#ipproxy}
**类型：** 设置目录

Web 代理的设置。该代理转发其客户端的请求（HTTP、HTTPS（`CONNECT`）和 FTP），以及通过目标 NAT 重定向到它的连接的请求，并缓存 HTTP 响应。更改此菜单中的任何设置都会清除缓存。有关概览和示例，请参见 [Web 代理](../../../network-management/proxy/web-proxy.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">Web 代理是否运行。默认：no。</ArgTableRow>
<ArgTableRow arg="src-address" typ="object { address: alt { address: ipAddr
, address6: ip6Addr
 }
 }">代理向服务器打开的连接的源地址。它必须是路由器的地址；否则，以及当未设置时，路由器使用由路由选择的源地址。默认：`::`（未设置）。</ArgTableRow>
<ArgTableRow arg="port" typ="multi { port: num [1 .. 65535]
 }">代理监听的 TCP 端口，或以逗号分隔列表形式给出的多个端口，例如 `8080,3128`。代理监听路由器的所有 IPv4 和 IPv6 地址，因此请用防火墙规则保护该端口。要在规则中区分这些端口，请在访问列表、缓存列表和直接列表中使用 `local-port`。默认：8080。</ArgTableRow>
<ArgTableRow arg="anonymous" typ="bool">
代理是否向服务器告知客户端信息。
- `no`（默认）- 将 `Via: 1.1 <router address> (Mikrotik HttpProxy)`、`X-Forwarded-For: <client address>` 和 `X-Proxy-ID` 添加到发往服务器的请求中。当请求到达时已设置 `Via` 和 `X-Forwarded-For`，例如来自另一个代理，代理会将自己的条目添加到其中。
- `yes` - 不发送这些标头。
</ArgTableRow>
<ArgTableRow arg="parent-proxy" typ="alt { host: ipAddr
, host6: ip6Addr
 }">另一个代理的 IPv4 或 IPv6 地址，该代理接收请求，包括 HTTPS（`CONNECT`）请求，但 [`/ip/proxy/direct`](./direct/index.md) 直接发送到服务器的请求除外。仅当 `parent-proxy-port` 不为 0 时才使用父代理。当无法访问父代理时，客户端会收到错误页面；路由器不会回退到直接连接。默认：`::`（无）。</ArgTableRow>
<ArgTableRow arg="parent-proxy-port" typ="num">父代理的 TCP 端口。为 0 时不使用父代理，即使已设置 `parent-proxy`。默认：0。</ArgTableRow>
<ArgTableRow arg="cache-administrator" typ="string">在代理的错误页面上作为 `mailto:` 链接显示的名称或电子邮件地址，即错误页面模板的 `$(admin)` 变量（参见 [`reset-html`](./reset-html.md)）。默认：webmaster。</ArgTableRow>
<ArgTableRow arg="max-cache-size" typ="alt { special: enum (none | unlimited) { none:0, unlimited:0xffffffff }
, value: num
 }">
缓存的总大小上限，单位为 KiB。
- `unlimited`（默认）- 无限制。此时 RAM 缓存可能会使用路由器的大部分可用内存，因此请在运行其他服务的路由器上设置限制。
- `none` - 不缓存。
- 数字 - 以 KiB 为单位的限制。
</ArgTableRow>
<ArgTableRow arg="max-cache-object-size" typ="num">代理存储在缓存中的最大响应大小，单位为 KiB。更大的响应会直接到达客户端而不被存储。默认：2048KiB。</ArgTableRow>
<ArgTableRow arg="cache-on-disk" typ="bool">
代理将缓存保存在何处。
- `no`（默认）- 在 RAM 中。
- `yes` - 在路由器的存储上，位于由 `cache-path` 命名的存储中，`/file` 会以 `web-proxy store` 类型显示该存储。
</ArgTableRow>
<ArgTableRow arg="max-client-connections" typ="num">代理同时服务的客户端连接数上限。更多请求会等待直到有连接空闲。默认：600。</ArgTableRow>
<ArgTableRow arg="max-server-connections" typ="num">默认：600。</ArgTableRow>
<ArgTableRow arg="max-fresh-time" typ="time">默认：3d。</ArgTableRow>
<ArgTableRow arg="serialize-connections" typ="bool">默认：no。</ArgTableRow>
<ArgTableRow arg="always-from-cache" typ="bool">默认：no。</ArgTableRow>
<ArgTableRow arg="cache-hit-dscp" typ="num">路由器对从缓存提供的响应数据包设置的 DSCP 值，范围为 0 到 63。可在队列和防火墙规则中用其识别缓存命中。默认：4。</ArgTableRow>
<ArgTableRow arg="cache-path" typ="string">缓存目录的名称。当 `cache-on-disk=yes` 时，路由器会在其存储上将其创建为 `web-proxy store`。路径（例如磁盘上的 `usb1/web-proxy`）需要对应一个已存在的目录；否则路由器会以 `bad cache path` 拒绝它。它不能为空。默认：web-proxy。</ArgTableRow>
</ArgTable>
