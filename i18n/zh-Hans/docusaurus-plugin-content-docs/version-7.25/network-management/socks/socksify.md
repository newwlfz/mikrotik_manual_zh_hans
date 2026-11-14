---
sidebar_key: "network-management/socks/socksify"
sidebar_position: 1
title: "Socksify"
sidebar_label: "Socksify"
description: "Socksify 将通过防火墙 NAT 规则选定的流量通过上游 SOCKS5 服务器转发，因此不支持 SOCKS 的应用程序也可以使用 SOCKS 代理。包含一个 Tor 代理示例。"
tags:
  - 'socksify'
  - 'firewall'
  - 'nat'
source: https://manual.mikrotik.com/docs/7.25/network-management/socks/socksify
captured_at: '2026-11-04T11:21:23+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Socksify 会通过上游 SOCKS5 服务器转发由防火墙规则选中的流量，适用于自身不支持 SOCKS 的应用程序。带有 `action=socksify` 的目标 NAT 规则会把匹配的连接重定向到该服务，服务再请求 SOCKS 服务器连接到该连接的原始目标地址。

可以同时配置多个 socksify 服务，每个服务转发到各自的上游服务器，因此不同的流量类别可以使用不同的代理。

前置条件：

- 上游服务器必须支持 SOCKS5。RouterOS 的 SOCKS 服务器在设置为 `version=5` 时可以正常工作；在默认的 `version=4` 下，SOCKS5 客户端会被拒绝。
- `socks5-server` 仅接受 IPv4 地址。
- 新记录创建时处于禁用状态。对记录设置的更改需要先禁用再重新启用该记录后才会生效，在运行期间不会生效。
- 上游凭据在 `print detail` 输出中以明文可见。

该服务拒绝对 LAN 目标（RFC 1918 私有地址）的代理连接；日志会在 `socksify` 主题下显示 `cannot socksify LAN destination`。

:::warning
请使用 NAT 规则匹配条件谨慎选择需要重定向的流量。务必使用 `dst-address-type=!local` 排除路由器自身的地址：否则，匹配范围过大的规则会把路由器自身的服务（例如 SSH 或 WebFig）重定向到代理，从而切断管理访问。
:::

## 与 Tor 代理组合使用 {#use-in-combination-with-a-tor-proxy}

Socksify 可以通过 Tor 转发流量以保护隐私。该配置会通过 Tor SOCKS5 代理服务器转发 HTTP 和 HTTPS 流量。

首先创建 socksify 服务：

```ros
/ip/socksify
add connection-timeout=10 disabled=no name=Tor_socksify socks5-port=9050 socks5-server=<TOR_SOCKS_PROXY_IP>
```

然后配置防火墙，对选中的流量执行 socksify，并允许其访问该服务：

```ros
/ip/firewall/filter
add action=accept chain=input dst-port=952 protocol=tcp src-address=<SOCKS_CLIENT_IP>
/ip/firewall/nat
add action=socksify chain=dstnat dst-address-type=!local dst-port=80,443 protocol=tcp socksify-service=Tor_socksify src-address=<SOCKS_CLIENT_IP>
```

需要这条 input 接受规则，是因为被重定向的连接会到达路由器本身（socksify 服务的 952 端口）；当 input 过滤器丢弃来自客户端的流量时，服务就永远看不到这些流量。`dst-address-type=!local` 匹配条件会把发往路由器自身地址的流量排除在代理之外。

## Tor 容器与安全 DNS 教程 {#tor-container-and-secure-dns-tutorial}

RouterOS 还可以在容器中运行 Tor 代理。当你使用 Tor 浏览网页时，请考虑同时保护你的 DNS 请求。

有关详细的分步说明，请观看 [Tor 容器与安全 DNS 教程视频](https://www.youtube.com/watch?v=ECRjxpb5IgE&lc=Ugy6V6EEAwyu2UC8ZJB4AaABAg)。
