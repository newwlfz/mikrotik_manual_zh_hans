---
title: "Socksify"
description: 'Socksify forwards traffic chosen by firewall NAT rules through an upstream SOCKS5 server, so applications without SOCKS support can use a SOCKS proxy. Includes a Tor proxy example.'
tags:
  - 'socksify'
  - 'firewall'
  - 'nat'
source: https://manual.mikrotik.com/docs/7.25/network-management/socks/socksify
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "network-management/socks"
pagination_next: "user-guides/routing-and-networking-protocols"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Socksify 会将防火墙规则选择的流量转发到上游 SOCKS5 服务器，适用于自身不支持 SOCKS 的应用。目标 NAT 规则使用 `action=socksify` 将匹配的连接重定向到该服务，服务随后请求 SOCKS 服务器连接到连接的原始目标。

可以同时配置多个 socksify 服务，每个服务转发到各自的上游服务器，因此不同流量类别可以使用不同的代理。

Prerequisites:

- 上游服务器必须支持 SOCKS5。RouterOS SOCKS 服务器设置为 `version=5` 时可用；使用默认的 `version=4` 时，SOCKS5 客户端会被拒绝。
- `socks5-server` 仅接受 IPv4 地址。
- 新记录创建后处于禁用状态。对记录设置的更改需要在禁用并重新启用该记录后生效，运行时不会生效。
- 上游凭据在 `print detail` 输出中以明文显示。

该服务拒绝代理到 LAN 目标的连接（RFC 1918 私有地址）；日志中会在 `socksify` 主题下显示 `cannot socksify LAN destination`。

:::warning
使用 NAT 规则匹配条件谨慎选择要重定向的流量。始终使用 `dst-address-type=!local` 排除路由器自身地址：否则，匹配范围过大的规则会将路由器自身服务（例如 SSH 或 WebFig）重定向到代理，并中断管理访问。
:::

## 与 Tor 代理配合使用 {#use-in-combination-with-a-tor-proxy}

Socksify 可以通过 Tor 转发流量以保护隐私。该配置将 HTTP 和 HTTPS 流量转发到 Tor SOCKS5 代理服务器。

首先创建 socksify 服务：

```ros
/ip/socksify
add connection-timeout=10 disabled=no name=Tor_socksify socks5-port=9050 socks5-server=<TOR_SOCKS_PROXY_IP>
```

然后配置防火墙，将选定流量 socksify 并允许其访问服务：

```ros
/ip/firewall/filter
add action=accept chain=input dst-port=952 protocol=tcp src-address=<SOCKS_CLIENT_IP>
/ip/firewall/nat
add action=socksify chain=dstnat dst-address-type=!local dst-port=80,443 protocol=tcp socksify-service=Tor_socksify src-address=<SOCKS_CLIENT_IP>
```

需要 input accept 规则，因为重定向的连接会到达路由器本身（socksify 服务的端口 952）；当 input 过滤器丢弃来自客户端的流量时，服务将看不到这些流量。`dst-address-type=!local` 匹配器可避免将发往路由器自身地址的流量送入代理。

## Tor 容器和安全 DNS 教程 {#tor-container-and-secure-dns-tutorial}

RouterOS 也可以在容器中运行 Tor 代理。使用 Tor 浏览网页时，请考虑同时保护 DNS 请求。

有关详细的分步说明，请观看 [Tor container and secure DNS tutorial video](https://www.youtube.com/watch?v=ECRjxpb5IgE&lc=Ugy6V6EEAwyu2UC8ZJB4AaABAg)。
