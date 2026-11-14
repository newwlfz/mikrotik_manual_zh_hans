---
sidebar_key: "cli-reference/ip/service"
title: "service"
sidebar_label: 'service'
source: https://manual.mikrotik.com/docs/cli-reference/ip/service
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/service {#ipservice}
**类型：** 目录

路由器的管理和服务监听器：WinBox、SSH、Telnet、FTP、Web 服务器（HTTP 使用 `www`，HTTPS 使用 `www-ssl`）、API（`api`、`api-ssl`）以及反向代理。每个条目设置服务接受客户端连接的端口、地址和 VRF，以及 TLS 服务的证书。不能添加服务，只能更改和禁用现有服务。列表还会显示动态条目：其他功能和容器监听的端口，以及到服务的已建立连接。关于 Web 服务器部分（WebFig、REST API、图表），请参阅 [`/ip/service/webserver`](./webserver.md)。有关概述和 RouterOS 使用的端口列表，请参阅 [服务](../../../system-information-and-utilities/services.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">由 RouterOS 创建的动态条目：其他功能或容器监听的端口（例如 `btest`、`discover`、`resolver`、`dhcp`、`upnp`），或者与 `c` 标志一起，表示到服务的已建立连接。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">服务已禁用，不在其端口上监听。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">服务无法使用其设置运行，例如因为另一个服务已使用该端口。原因以注释形式显示，例如 `cannot bind to port 80: Address in use (12)`。</ArgTableRow>
<ArgTableRow arg="c" typ="connection">该条目是到服务的已建立连接。`local` 和 `remote` 显示连接的地址。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="port" typ="num">服务监听的 TCP 端口，`1..65535`。当另一个服务已在该端口上监听时，该条目会变为无效（`I`）。默认值取决于服务：`ftp` 21、`ssh` 22、`telnet` 23、`www` 80、`www-ssl` 443、`winbox` 8291、`api` 8728、`api-ssl` 8729、`reverse-proxy` 443。</ArgTableRow>
<ArgTableRow arg="address" typ="object { address: alt { address: ipPrefix
, address: ip6Prefix
 }
 }" deprecated="1">`available-from` 的已弃用名称。使用 `address` 设置的值会写入 `available-from`。</ArgTableRow>
<ArgTableRow arg="available-from" typ="object { address: alt { address: ipPrefix
, address: ip6Prefix
 }
 }">允许使用该服务的客户端的 IPv4 和 IPv6 前缀。来自其他地址的客户端仍可打开 TCP 连接，随后路由器会在不服务该客户端的情况下关闭连接，因此端口仍然可见。要从未信任网络隐藏服务，还应在防火墙 input 链中丢弃流量。空表示任意地址。默认值：空。</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none) { none:0 }">服务向 TLS 客户端出示的证书。适用于 `www-ssl`、`api-ssl` 和 `reverse-proxy`。使用 `none` 时，`www-ssl` 和 `api-ssl` 仅接受匿名 Diffie-Hellman 密码套件：连接会加密，但路由器不证明其身份，并且浏览器和 cURL 等工具无法连接。为 HTTPS 设置证书。对于 `reverse-proxy`，该证书由自身没有证书的规则使用（参见 [`/ip/reverse-proxy`](../reverse-proxy.md)）。默认值：none。</ArgTableRow>
<ArgTableRow arg="tls-version" typ="enum (any | only-1.2) { any:0, only-1.2:2 }">
服务接受的 TLS 版本。适用于 TLS 服务。
- `any`（默认）- TLS 1.0、1.1 和 1.2。
- `only-1.2` - 仅 TLS 1.2。
</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">服务监听的 VRF。默认值：main。</ArgTableRow>
<ArgTableRow arg="max-sessions" typ="num">服务的最大同时会话数，`1..1000`。默认值：20。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="container" typ="enum () { :0 }">监听该端口的容器名称，适用于由容器创建的动态条目。</ArgTableRow>
<ArgTableRow arg="netns" typ="num">监听该端口的容器的网络命名空间编号，适用于由容器创建的动态条目。</ArgTableRow>
<ArgTableRow arg="name" typ="string">服务名称。对于动态条目，为监听该端口或持有连接的功能或程序。</ArgTableRow>
<ArgTableRow arg="proto" typ="enum ()">端口的传输协议：`tcp` 或 `udp`。</ArgTableRow>
<ArgTableRow arg="local" typ="ip6Addr">已建立连接的路由器地址（带有 `c` 标志的条目）。</ArgTableRow>
<ArgTableRow arg="remote" typ="composite { ip: ip6Addr
, port: num
 }">已建立连接的客户端地址和端口（带有 `c` 标志的条目）。</ArgTableRow>
</ArgTable>
